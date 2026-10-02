import { useCallback, useMemo } from 'react'
import { TRACKS } from '@/data/tracks'
import { useExamProgress } from '@/contexts/ExamProgressContext'
import { useAuth } from '@/hooks/useAuth'
import { useConceptMastery } from '@/hooks/useConceptMastery'
import { useWikiSyllabus } from '@/hooks/useWikiSyllabus'
import { buildSectors, type Sector } from '@/lib/actuaria/sectors'
import { computeExamReadiness, type ExamReadinessAssessment } from '@/lib/readiness'
import type { ConceptMasteryRecord } from '@/lib/mastery'

/** The Dashboard's choice of active exam — read, never written, from here. */
const ACTIVE_EXAM_KEY = 'quiz.dashboard.activeExamId'

export interface ActuariaWorld {
  sectors: Sector[]
  /** Each sector's readiness — `computeExamReadiness`, the one number (G2). */
  readiness: Map<string, ExamReadinessAssessment>
  /** Every mastery row the player has. */
  records: ConceptMasteryRecord[]
  /** A sector's rows (filtered by `exam_id`, as every readiness surface does). */
  recordsFor: (key: string) => ConceptMasteryRecord[]
  /** The sector the Dashboard has up, else the first one being studied. */
  activeSector: Sector | null
  loading: boolean
  signedIn: boolean
  /** Chart a sector: the exams panel's Add — mark the exam in progress. */
  chart: (key: string) => Promise<boolean>
}

/**
 * Actuaria's world, from state the app already keeps: the exams as sectors,
 * each with its readiness, off the bundled syllabi, the player's mastery rows
 * and their exam progress (docs/actuaria-online.md §3, §6.3).
 */
export function useActuariaWorld(): ActuariaWorld {
  const { user } = useAuth()
  const { syllabi, loading: syllabiLoading } = useWikiSyllabus()
  const { records, loading: masteryLoading } = useConceptMastery()
  const { progress, examVariants, selectedTrack, saveExamRows, loadingExams } = useExamProgress()

  const track = TRACKS.find(t => t.key === selectedTrack) ?? TRACKS[0]
  const sectors = useMemo(
    () => buildSectors({ syllabi, track, progress, variants: examVariants }),
    [syllabi, track, progress, examVariants],
  )

  const readiness = useMemo(() => {
    const now = new Date()
    return new Map(
      sectors.map(s => [s.key, computeExamReadiness(s.syllabus, records.filter(r => r.exam_id === s.key), now)]),
    )
  }, [sectors, records])

  const recordsFor = useCallback((key: string) => records.filter(r => r.exam_id === key), [records])

  const activeSector = useMemo(() => {
    const studying = sectors.filter(s => s.status === 'in_progress')
    let saved: string | null = null
    try { saved = localStorage.getItem(ACTIVE_EXAM_KEY) } catch { /* private mode */ }
    return (
      studying.find(s => s.key === saved || s.syllabus.examId === saved) ??
      studying[0] ??
      sectors.find(s => s.charted) ??
      null
    )
  }, [sectors])

  const chart = useCallback(
    (key: string) => saveExamRows([{ exam_id: key, status: 'in_progress', target_date: null }]),
    [saveExamRows],
  )

  return {
    sectors,
    readiness,
    records,
    recordsFor,
    activeSector,
    loading: syllabiLoading || (!!user && (masteryLoading || loadingExams)),
    signedIn: !!user,
    chart,
  }
}
