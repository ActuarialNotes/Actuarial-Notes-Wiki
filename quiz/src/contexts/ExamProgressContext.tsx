import { createContext, useContext, useState, useEffect, useCallback, type ReactNode } from 'react'
import { supabase } from '@/lib/supabase'
import { useAuth } from '@/hooks/useAuth'
import type { ItemStatus } from '@/data/tracks'

export interface ExamProgressRow {
  exam_id: string
  status: ItemStatus
  target_date: string | null
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

  const setSelectedTrack = useCallback((track: string) => {
    setSelectedTrackState(track)
    try {
      const raw = localStorage.getItem('quiz-journey')
      const journey = raw ? JSON.parse(raw) : { selectedTrack: 'DEFAULT', progress: {} }
      journey.selectedTrack = track
      localStorage.setItem('quiz-journey', JSON.stringify(journey))
    } catch { /* ignore */ }
  }, [])

  const userId = user?.id
  useEffect(() => {
    if (!userId) { setLoadingExams(false); return }
    let cancelled = false
    setLoadingExams(true)
    supabase
      .from('exam_progress')
      .select('exam_id, status, target_date')
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
      if (r.target_date != null) row.target_date = r.target_date || null
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

  return (
    <ExamProgressContext.Provider value={{
      examRows, setExamRows, loadingExams,
      selectedTrack, setSelectedTrack,
      saveExamRows, examsState,
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
