import { useState, useEffect, useCallback, useMemo, useRef, type ReactNode } from 'react'
import { supabase } from '@/lib/supabase'
import { useAuth } from '@/hooks/useAuth'
import type { ItemStatus } from '@/data/tracks'
import type { StudyPlan, StudyPlanConfig } from '@/lib/studyPlan'
import { ExamProgressContext, type ExamProgressRow, type SectionState } from '@/contexts/examProgress'
import {
  BROWSER_EXAMS_KEY, EXAM_FOCUS_KEY, EXAM_FOCUS_METADATA,
  browserExamsToMerge, focusOnLoad, parseBrowserExams, parseStoredFocus,
} from '@/lib/examFocus'
import { isSessionRoute } from '@/lib/mobileNavHost'
import { loadStudyPlanConfig } from '@/lib/studyPlan'

// A visitor's exams live in the browser alone (docs/redesign-spec.md R11):
// the same rows the account keeps, less the cached plan. Signing in adds the
// ones the account doesn't have and clears the list.
function readBrowserExams(): ExamProgressRow[] {
  let raw: string | null = null
  try { raw = localStorage.getItem(BROWSER_EXAMS_KEY) } catch { /* private window */ }
  return parseBrowserExams(raw).map(r => ({
    exam_id: r.exam_id,
    status: r.status,
    target_date: r.target_date,
    ...(r.variant ? { study_plan_config: { ...loadStudyPlanConfig(r.exam_id), examVariant: r.variant } } : {}),
  }))
}

function writeBrowserExams(rows: ExamProgressRow[]) {
  try {
    localStorage.setItem(BROWSER_EXAMS_KEY, JSON.stringify(rows.map(r => ({
      exam_id: r.exam_id,
      status: r.status,
      target_date: r.target_date ?? null,
      variant: r.study_plan_config?.examVariant ?? null,
    }))))
  } catch { /* private window */ }
}

function safeGet(key: string): string | null {
  try { return localStorage.getItem(key) } catch { return null }
}

function readBrowserFocus(): string | null {
  try { return parseStoredFocus(localStorage.getItem(EXAM_FOCUS_KEY)) } catch { return null }
}

export function ExamProgressProvider({ children }: { children: ReactNode }) {
  const { user } = useAuth()
  const [examRows, setExamRows] = useState<ExamProgressRow[]>([])
  const [loadingExams, setLoadingExams] = useState(true)
  const [selectedTrack, setSelectedTrackState] = useState('DEFAULT')
  const [examsState, setExamsState] = useState<SectionState>({ saving: false, error: null, success: null })

  useEffect(() => {
    try {
      const raw = localStorage.getItem('quiz-journey')
      if (raw) {
        const j = JSON.parse(raw)
        if (j.selectedTrack) setSelectedTrackState(j.selectedTrack)
      }
    } catch { /* ignore */ }
  }, [])

  // When the user's session loads, override localStorage with the server-stored
  // track so the setting syncs across devices.
  useEffect(() => {
    if (!user) return
    const serverTrack = (user.user_metadata as Record<string, unknown>)?.selected_track as string | undefined
    if (serverTrack) {
      setSelectedTrackState(serverTrack)
      try {
        const raw = localStorage.getItem('quiz-journey')
        const journey = raw ? JSON.parse(raw) : { selectedTrack: serverTrack, progress: {} }
        journey.selectedTrack = serverTrack
        localStorage.setItem('quiz-journey', JSON.stringify(journey))
      } catch { /* ignore */ }
    }
  }, [user])

  const setSelectedTrack = useCallback((track: string) => {
    setSelectedTrackState(track)
    try {
      const raw = localStorage.getItem('quiz-journey')
      const journey = raw ? JSON.parse(raw) : { selectedTrack: 'DEFAULT', progress: {} }
      journey.selectedTrack = track
      localStorage.setItem('quiz-journey', JSON.stringify(journey))
    } catch { /* ignore */ }
    // Persist to Supabase user metadata so the selection syncs across devices
    if (user) {
      supabase.auth.updateUser({ data: { selected_track: track } }).catch(() => { /* best-effort */ })
    }
  }, [user])

  const userId = user?.id

  // ── The exam in focus, as stored ──────────────────────────────────────────
  // Kept with the account (`user_metadata.exam_in_focus`) and mirrored in the
  // browser. The account's value wins when the app loads and when the tab is
  // returned to, so a second device opens on the exam last used anywhere; a
  // quiz or its review is never switched under the reader.
  const [focusId, setFocusIdState] = useState<string | null>(readBrowserFocus)
  const applyAccountFocus = useCallback((metadata: unknown) => {
    const account = (metadata as Record<string, unknown> | null | undefined)?.[EXAM_FOCUS_METADATA]
    const next = focusOnLoad(account, readBrowserFocus())
    if (!next) return
    try { localStorage.setItem(EXAM_FOCUS_KEY, next) } catch { /* private window */ }
    setFocusIdState(next)
  }, [])
  // On sign-in the session's copy of the account is applied at once, then the
  // account is read fresh (a stored session can be an hour behind another
  // device), and again each time the tab is returned to.
  const accountFocusRef = useRef<unknown>(null)
  accountFocusRef.current = (user?.user_metadata as Record<string, unknown> | undefined)?.[EXAM_FOCUS_METADATA]
  useEffect(() => {
    if (!userId) return
    applyAccountFocus({ [EXAM_FOCUS_METADATA]: accountFocusRef.current })
    let cancelled = false
    const refresh = () => {
      if (isSessionRoute(window.location.pathname)) return
      supabase.auth.getUser()
        .then(({ data }) => { if (!cancelled && data.user) applyAccountFocus(data.user.user_metadata) })
        .catch(() => { /* offline: the browser's copy stands */ })
    }
    refresh()
    const onVisible = () => { if (document.visibilityState === 'visible') refresh() }
    document.addEventListener('visibilitychange', onVisible)
    return () => {
      cancelled = true
      document.removeEventListener('visibilitychange', onVisible)
    }
  }, [userId, applyAccountFocus])
  const setFocusId = useCallback((examId: string) => {
    const next = parseStoredFocus(examId)
    if (!next) return
    setFocusIdState(next)
    try { localStorage.setItem(EXAM_FOCUS_KEY, next) } catch { /* private window */ }
    if (userId && accountFocusRef.current !== next) {
      accountFocusRef.current = next
      supabase.auth.updateUser({ data: { [EXAM_FOCUS_METADATA]: next } }).catch(() => { /* best-effort */ })
    }
  }, [userId])

  // A refetch must never undo a local write. Every write below fires a realtime
  // event, and each event refetches the rows — so a refetch that started before
  // a write committed can resolve after it, with the old value. Applied, it put
  // the old study-plan config (or exam date) back for a moment: the plan
  // regenerated from it, was pushed up, fired another event, and the schedule
  // flashed between two versions. So a response is dropped when a newer fetch
  // has started, when a write is in flight, or when one happened since the
  // fetch began; once the last write lands, one fresh fetch makes up for it.
  const fetchSeq = useRef(0)
  const writeSeq = useRef(0)
  const pendingWrites = useRef(0)
  const missedFetch = useRef(false)

  const fetchExamRows = useCallback(() => {
    if (!userId) return
    const seq = ++fetchSeq.current
    const writesAtStart = writeSeq.current
    supabase
      .from('exam_progress')
      .select('*')
      .eq('user_id', userId)
      .then(({ data, error }: { data: ExamProgressRow[] | null; error: { message: string } | null }) => {
        if (seq !== fetchSeq.current) return
        if (pendingWrites.current > 0 || writeSeq.current !== writesAtStart) {
          missedFetch.current = true
          return
        }
        if (error) {
          console.warn('ExamProgressContext: failed to load exam_progress:', error.message)
        } else if (data) {
          setExamRows(data)
        }
      })
  }, [userId])

  // Initial load
  useEffect(() => {
    if (!userId) {
      // Signed out: the browser's own list (empty once it was merged into an account).
      setExamRows(readBrowserExams())
      setLoadingExams(false)
      return
    }
    let cancelled = false
    setLoadingExams(true)
    supabase
      .from('exam_progress')
      .select('*')
      .eq('user_id', userId)
      .then(async ({ data, error }: { data: ExamProgressRow[] | null; error: { message: string } | null }) => {
        if (cancelled) return
        if (error) {
          console.warn('ExamProgressContext: failed to load exam_progress:', error.message)
        } else if (data) {
          // The exams added before signing in join the account, once: the
          // account's own rows win, and the browser's list is then cleared.
          const extra = browserExamsToMerge(parseBrowserExams(safeGet(BROWSER_EXAMS_KEY)), new Set(data.map(r => r.exam_id)))
          let rows = data
          if (extra.length > 0) {
            const { error: mergeError } = await supabase.from('exam_progress').upsert(
              extra.map(r => ({
                user_id: userId, exam_id: r.exam_id, status: r.status, target_date: r.target_date,
                ...(r.variant ? { study_plan_config: { ...loadStudyPlanConfig(r.exam_id), examVariant: r.variant } } : {}),
                updated_at: new Date().toISOString(),
              })),
              { onConflict: 'user_id,exam_id' },
            )
            if (cancelled) return
            if (!mergeError) {
              rows = [...data, ...extra.map(r => ({
                exam_id: r.exam_id, status: r.status, target_date: r.target_date,
                ...(r.variant ? { study_plan_config: { ...loadStudyPlanConfig(r.exam_id), examVariant: r.variant } } : {}),
              }))]
            }
          }
          if (extra.length === 0 || rows !== data) {
            try { localStorage.removeItem(BROWSER_EXAMS_KEY) } catch { /* private window */ }
          }
          setExamRows(rows)
        }
        setLoadingExams(false)
      })
    return () => { cancelled = true }
  }, [userId])

  // Supabase realtime subscription — picks up changes from other devices/browsers
  useEffect(() => {
    if (!userId) return
    const channel = supabase
      .channel(`exam_progress:${userId}`)
      .on(
        'postgres_changes',
        { event: '*', schema: 'public', table: 'exam_progress', filter: `user_id=eq.${userId}` },
        () => { fetchExamRows() },
      )
      .subscribe()
    return () => { supabase.removeChannel(channel) }
  }, [userId, fetchExamRows])

  // Refetch when the tab regains focus (covers cross-browser / mobile ↔ desktop)
  useEffect(() => {
    if (!userId) return
    const handleVisible = () => {
      if (document.visibilityState === 'visible') fetchExamRows()
    }
    document.addEventListener('visibilitychange', handleVisible)
    return () => document.removeEventListener('visibilitychange', handleVisible)
  }, [userId, fetchExamRows])

  // Sync selectedTrack across tabs in the same browser via the storage event
  // (storage events fire in all tabs *except* the one that made the write).
  useEffect(() => {
    const handleStorage = (e: StorageEvent) => {
      if (e.key !== 'quiz-journey' || !e.newValue) return
      try {
        const j = JSON.parse(e.newValue)
        if (j.selectedTrack) setSelectedTrackState(j.selectedTrack)
      } catch { /* ignore */ }
    }
    window.addEventListener('storage', handleStorage)
    return () => window.removeEventListener('storage', handleStorage)
  }, [])

  const saveExamRows = useCallback(async (rows: ExamProgressRow[]) => {
    if (!user) {
      // A visitor's exams are the browser's.
      setExamRows(prev => {
        const merged = prev.map(p => {
          const update = rows.find(r => r.exam_id === p.exam_id)
          return update ? { ...p, ...update } : p
        })
        const next = [...merged, ...rows.filter(r => !prev.some(p => p.exam_id === r.exam_id))]
        writeBrowserExams(next)
        return next
      })
      return true
    }
    setExamsState({ saving: true, error: null, success: null })

    const payloads = rows.map(r => {
      const row: Record<string, unknown> = {
        user_id: user.id,
        exam_id: r.exam_id,
        status: r.status,
        updated_at: new Date().toISOString(),
      }
      row.target_date = r.target_date ?? null
      return row
    })

    const { error } = await supabase.from('exam_progress').upsert(payloads, { onConflict: 'user_id,exam_id' })
    if (error) {
      setExamsState({ saving: false, error: error.message, success: null })
      return false
    }

    try {
      const raw = localStorage.getItem('quiz-journey')
      const journey = raw ? JSON.parse(raw) : { selectedTrack: 'DEFAULT', progress: {} }
      rows.forEach(r => { journey.progress[r.exam_id] = r.status })
      localStorage.setItem('quiz-journey', JSON.stringify(journey))
    } catch { /* ignore */ }

    // Merge, never replace. A caller saves the rows it is looking at — the
    // exams popout sends one track's slice — and the upsert above touches only
    // those, so replacing the state would drop every other track's exams and
    // strip `study_plan_config` / `study_plan_cache` off the rows it kept
    // (the popout's rows carry neither), blanking cached study plans until the
    // next refetch.
    setExamRows(prev => {
      const merged = prev.map(p => {
        const update = rows.find(r => r.exam_id === p.exam_id)
        return update ? { ...p, ...update } : p
      })
      const added = rows.filter(r => !prev.some(p => p.exam_id === r.exam_id))
      return [...merged, ...added]
    })
    setExamsState({ saving: false, error: null, success: 'Exam progress saved.' })
    return true
  }, [user])

  // The three writers below upsert one column onto an exam's row. When the
  // account has no row for that exam yet, the database creates it with its
  // default status, `not_started`, and the local copy must say the same —
  // saving a date or a plan is not adding the exam. Only the exams popout's
  // Add (and a first quiz) marks an exam in progress.
  //
  // Each applies its value locally first, so a change made together with
  // another (the study-plan modal saves the config and the exam date at once)
  // reaches the plan in one render rather than one per round trip.
  const writeColumn = useCallback(async (
    examId: string,
    column: Partial<ExamProgressRow>,
    label: string,
  ): Promise<boolean> => {
    if (!userId) {
      setExamRows(prev => {
        const next = prev.some(r => r.exam_id === examId)
          ? prev.map(r => r.exam_id === examId ? { ...r, ...column } : r)
          : [...prev, { exam_id: examId, status: 'not_started' as ItemStatus, target_date: null, ...column }]
        writeBrowserExams(next)
        return next
      })
      return true
    }
    writeSeq.current++
    pendingWrites.current++
    setExamRows(prev => prev.some(r => r.exam_id === examId)
      ? prev.map(r => r.exam_id === examId ? { ...r, ...column } : r)
      : [...prev, { exam_id: examId, status: 'not_started' as ItemStatus, target_date: null, ...column }])
    const { error } = await supabase.from('exam_progress').upsert(
      { user_id: userId, exam_id: examId, ...column, updated_at: new Date().toISOString() },
      { onConflict: 'user_id,exam_id' },
    )
    writeSeq.current++
    pendingWrites.current--
    if (error) {
      console.warn(`${label}: failed:`, error.message)
      // The local copy is ahead of the server; the refetch below puts it back.
      missedFetch.current = true
    }
    if (pendingWrites.current === 0 && missedFetch.current) {
      missedFetch.current = false
      fetchExamRows()
    }
    return !error
  }, [userId, fetchExamRows])

  const updateTargetDate = useCallback(
    (examId: string, date: string | null) => writeColumn(examId, { target_date: date }, 'updateTargetDate'),
    [writeColumn],
  )

  const updateStudyPlanConfig = useCallback(
    (examId: string, config: StudyPlanConfig) => writeColumn(examId, { study_plan_config: config }, 'updateStudyPlanConfig'),
    [writeColumn],
  )

  const updateStudyPlanCache = useCallback(
    (examId: string, plan: StudyPlan) => writeColumn(examId, { study_plan_cache: plan }, 'updateStudyPlanCache'),
    [writeColumn],
  )

  const progress = useMemo(() => {
    const p: Record<string, string> = {}
    examRows.forEach(r => { p[r.exam_id] = r.status })
    return p
  }, [examRows])

  const targetDates = useMemo(() => {
    const d: Record<string, string | null> = {}
    examRows.forEach(r => { d[r.exam_id] = r.target_date ?? null })
    return d
  }, [examRows])

  const examVariants = useMemo(() => {
    const v: Record<string, string | null> = {}
    examRows.forEach(r => { v[r.exam_id] = r.study_plan_config?.examVariant ?? null })
    return v
  }, [examRows])

  return (
    <ExamProgressContext.Provider value={{
      examRows, setExamRows, loadingExams,
      selectedTrack, setSelectedTrack,
      saveExamRows, examsState,
      progress, targetDates, examVariants, updateTargetDate, updateStudyPlanConfig, updateStudyPlanCache,
      focusId, setFocusId,
    }}>
      {children}
    </ExamProgressContext.Provider>
  )
}
