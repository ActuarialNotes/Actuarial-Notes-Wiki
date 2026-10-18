import { createContext, useContext } from 'react'
import type { ItemStatus } from '@/data/tracks'
import type { StudyPlan, StudyPlanConfig } from '@/lib/studyPlan'

// The account's exams — status, dates, variants, study plan config and cache —
// as the app reads them. Provided by `ExamProgressProvider`
// (contexts/ExamProgressContext.tsx).

export interface ExamProgressRow {
  exam_id: string
  status: ItemStatus
  target_date: string | null
  study_plan_config?: StudyPlanConfig | null
  study_plan_cache?: StudyPlan | null
}

export interface SectionState {
  saving: boolean
  error: string | null
  success: string | null
}

export interface ExamProgressContextValue {
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
  /** Derived: selected regional variant (e.g. 'US'/'CA'/'INT') keyed by exam_id */
  examVariants: Record<string, string | null>
  /** Persist an updated exam target date */
  updateTargetDate: (examId: string, date: string | null) => Promise<boolean>
  /** Persist an updated study plan config for a given exam */
  updateStudyPlanConfig: (examId: string, config: StudyPlanConfig) => Promise<boolean>
  /** Persist the generated study plan so it syncs across devices */
  updateStudyPlanCache: (examId: string, plan: StudyPlan) => Promise<boolean>
}

export const ExamProgressContext = createContext<ExamProgressContextValue | null>(null)

export function useExamProgress() {
  const ctx = useContext(ExamProgressContext)
  if (!ctx) throw new Error('useExamProgress must be used within ExamProgressProvider')
  return ctx
}
