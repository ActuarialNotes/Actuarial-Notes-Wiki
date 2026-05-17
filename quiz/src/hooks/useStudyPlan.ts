// Hook that owns study plan state: config CRUD, daily regeneration, caching.
//
// Config persistence priority (highest wins):
//   1. Supabase exam_progress.study_plan_config  (cross-device, synced via realtime)
//   2. localStorage actuarial_study_plan_config_v1_{examId}  (anonymous / offline fallback)
//
// Cross-tab sync (same browser, different tabs) happens via:
//   - Supabase realtime updating examRows → effect re-reads config from updated row
//   - localStorage 'storage' event as a fast path when realtime is slow/unavailable

import { useCallback, useEffect, useMemo, useState } from 'react'
import {
  generateStudyPlan,
  loadCachedStudyPlan,
  loadStudyPlanConfig,
  saveCachedStudyPlan,
  saveStudyPlanConfig,
  todayISO,
  type StudyPlan,
  type StudyPlanConfig,
} from '@/lib/studyPlan'
import type { WikiExamSyllabus } from '@/lib/wikiParser'
import type { ConceptMasteryRecord } from '@/lib/mastery'
import { wikiExamIdToProgressKey } from '@/lib/wikiParser'
import { useExamProgress } from '@/contexts/ExamProgressContext'

export interface UseStudyPlanResult {
  plan: StudyPlan | null
  config: StudyPlanConfig
  loading: boolean
  updateConfig: (next: Partial<StudyPlanConfig>) => void
  regenerate: () => void
}

const DEFAULT_CONFIG: StudyPlanConfig = {
  targetReadyDate: null,
  targetStrengthLevel: 'strong_all',
  planStartDate: null,
}

export function useStudyPlan(
  syllabus: WikiExamSyllabus | null,
  masteryRecords: ConceptMasteryRecord[],
  examDate: string | null,
): UseStudyPlanResult {
  const examId = syllabus ? wikiExamIdToProgressKey(syllabus.examId) : null
  const { examRows, updateStudyPlanConfig } = useExamProgress()

  const [config, setConfig] = useState<StudyPlanConfig>(() =>
    examId ? loadStudyPlanConfig(examId) : DEFAULT_CONFIG
  )
  const [plan, setPlan] = useState<StudyPlan | null>(null)
  const [loading, setLoading] = useState(true)
  const [tick, setTick] = useState(0)

  // Sync config from DB whenever exam rows update (realtime or initial fetch).
  // DB config takes precedence over localStorage so changes from other sessions
  // are reflected immediately when the realtime event arrives.
  useEffect(() => {
    if (!examId) return
    const row = examRows.find(r => r.exam_id === examId)
    const dbConfig = row?.study_plan_config ?? null
    if (dbConfig) {
      setConfig(dbConfig)
      // Keep localStorage in sync so offline / anonymous fallback stays fresh
      saveStudyPlanConfig(examId, dbConfig)
    } else {
      // No DB config yet — load from localStorage
      setConfig(loadStudyPlanConfig(examId))
    }
  }, [examId, examRows])

  // Cross-tab fast path: pick up config written by another tab before the
  // realtime event arrives (storage events fire in all tabs except the writer).
  useEffect(() => {
    if (!examId) return
    const key = `actuarial_study_plan_config_v1_${examId}`
    const handleStorage = (e: StorageEvent) => {
      if (e.key !== key || !e.newValue) return
      try {
        setConfig(JSON.parse(e.newValue) as StudyPlanConfig)
      } catch { /* ignore */ }
    }
    window.addEventListener('storage', handleStorage)
    return () => window.removeEventListener('storage', handleStorage)
  }, [examId])

  // Generate (or load cached) plan whenever inputs change
  useEffect(() => {
    if (!syllabus || !examId) {
      setPlan(null)
      setLoading(false)
      return
    }

    setLoading(true)

    // Read config directly from localStorage so a transient DEFAULT_CONFIG in React
    // state (set when examId was null on first render) never causes a false cache miss.
    // The `config` dependency below still triggers re-generation on user config changes.
    const effectiveConfig = loadStudyPlanConfig(examId)

    // Try cache first (same-day stability)
    const cached = loadCachedStudyPlan(examId)
    if (cached && cached.generatedDate === todayISO()) {
      if (
        cached.config.targetReadyDate === effectiveConfig.targetReadyDate &&
        cached.config.targetStrengthLevel === effectiveConfig.targetStrengthLevel
      ) {
        setPlan(cached)
        setLoading(false)
        return
      }
    }

    // Generate fresh
    const fresh = generateStudyPlan({ examId, syllabus, masteryRecords, config: effectiveConfig, examDate })
    saveCachedStudyPlan(fresh)
    setPlan(fresh)
    setLoading(false)
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [examId, syllabus?.examId, masteryRecords, config, examDate, tick])

  const updateConfig = useCallback((next: Partial<StudyPlanConfig>) => {
    if (!examId) return
    setConfig(prev => {
      const merged: StudyPlanConfig = {
        ...prev,
        ...next,
        planStartDate: prev.planStartDate ?? (next.targetReadyDate ? todayISO() : null),
      }
      // Write to localStorage immediately (fast local update + offline fallback)
      saveStudyPlanConfig(examId, merged)
      // Persist to DB asynchronously for cross-device / cross-browser sync.
      // The realtime subscription will propagate the change to other open sessions.
      updateStudyPlanConfig(examId, merged).catch(() => { /* best-effort */ })
      return merged
    })
  }, [examId, updateStudyPlanConfig])

  const regenerate = useCallback(() => {
    setTick(t => t + 1)
  }, [])

  const stablePlan = useMemo(() => plan, [plan])

  return { plan: stablePlan, config, loading, updateConfig, regenerate }
}
