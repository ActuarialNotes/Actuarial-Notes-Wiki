import { createContext, useContext, useState, useEffect, useCallback, useMemo, type ReactNode } from 'react'
import { supabase } from '@/lib/supabase'
import { useAuth } from '@/hooks/useAuth'
import type { ItemStatus } from '@/data/tracks'
import type { StudyPlanConfig } from '@/lib/studyPlan'

export interface ExamProgressRow {
  exam_id: string
  status: ItemStatus
  target_date: string | null
  study_plan_config?: StudyPlanConfig | null
}

interface SectionState {
  saving: boolean
  error: string | null
  success: string | null
}

interface ExamProgressContextValue {
  examRows: ExamProgressRow[]
  setExamRows: React.Dispatch<React.SetStateAction<ExamProgressRow[]>>
  loadingExams: boolean
  selectedTrack: string
  setSelectedTrack: (track: string) => void
  saveExamRows: (rows: ExamProgressRow[]) => Promise<boolean>
  examsState: SectionState
  /** Derived: status keyed by exam_id, e.g. { FM: 'in_progress' } */
  progress: Record<string, string>
  /** Derived: target date keyed by exam_id */
  targetDates: Record<string, string | null>
  /** Persist an updated exam target date */
  updateTargetDate: (examId: string, date: string | null) => Promise<boolean>
  /** Persist an updated study plan config for a given exam */
  updateStudyPlanConfig: (examId: string, config: StudyPlanConfig) => Promise<boolean>
}

const ExamProgressContext = createContext<ExamProgressContextValue | null>(null)

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

  const fetchExamRows = useCallback(() => {
    if (!userId) return
    supabase
      .from('exam_progress')
      .select('exam_id, status, target_date, study_plan_config')
      .eq('user_id', userId)
      .then(({ data, error }: { data: ExamProgressRow[] | null; error: { message: string } | null }) => {
        if (error) {
          console.warn('ExamProgressContext: failed to load exam_progress:', error.message)
        } else if (data) {
          setExamRows(data)
        }
      })
  }, [userId])

  // Initial load
  useEffect(() => {
    if (!userId) { setLoadingExams(false); return }
    let cancelled = false
    setLoadingExams(true)
    supabase
      .from('exam_progress')
      .select('exam_id, status, target_date, study_plan_config')
      .eq('user_id', userId)
      .then(({ data, error }: { data: ExamProgressRow[] | null; error: { message: string } | null }) => {
        if (cancelled) return
        if (error) {
          console.warn('ExamProgressContext: failed to load exam_progress:', error.message)
        } else if (data) {
          setExamRows(data)
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
    if (!user) return false
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

    setExamRows(rows)
    setExamsState({ saving: false, error: null, success: 'Exam progress saved.' })
    return true
  }, [user])

  const updateTargetDate = useCallback(async (examId: string, date: string | null): Promise<boolean> => {
    if (!userId) return false
    const payload: Record<string, unknown> = {
      user_id: userId,
      exam_id: examId,
      updated_at: new Date().toISOString(),
    }
    payload.target_date = date
    const { error } = await supabase.from('exam_progress').upsert(payload, { onConflict: 'user_id,exam_id' })
    if (error) {
      console.warn('updateTargetDate: failed:', error.message)
      return false
    }
    setExamRows(prev => prev.map(r => r.exam_id === examId ? { ...r, target_date: date } : r))
    return true
  }, [userId])

  const updateStudyPlanConfig = useCallback(async (examId: string, config: StudyPlanConfig): Promise<boolean> => {
    if (!userId) return false
    const { error } = await supabase.from('exam_progress').upsert(
      { user_id: userId, exam_id: examId, study_plan_config: config, updated_at: new Date().toISOString() },
      { onConflict: 'user_id,exam_id' },
    )
    if (error) {
      console.warn('updateStudyPlanConfig: failed:', error.message)
      return false
    }
    setExamRows(prev => prev.map(r => r.exam_id === examId ? { ...r, study_plan_config: config } : r))
    return true
  }, [userId])

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

  return (
    <ExamProgressContext.Provider value={{
      examRows, setExamRows, loadingExams,
      selectedTrack, setSelectedTrack,
      saveExamRows, examsState,
      progress, targetDates, updateTargetDate, updateStudyPlanConfig,
    }}>
      {children}
    </ExamProgressContext.Provider>
  )
}

export function useExamProgress() {
  const ctx = useContext(ExamProgressContext)
  if (!ctx) throw new Error('useExamProgress must be used within ExamProgressProvider')
  return ctx
}
