// Hook that owns study plan state: config CRUD, daily regeneration, caching.

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

export interface UseStudyPlanResult {
  plan: StudyPlan | null
  config: StudyPlanConfig
  loading: boolean
  updateConfig: (next: Partial<StudyPlanConfig>) => void
  regenerate: () => void
}

export function useStudyPlan(
  syllabus: WikiExamSyllabus | null,
  masteryRecords: ConceptMasteryRecord[],
  examDate: string | null,
): UseStudyPlanResult {
  const examId = syllabus ? wikiExamIdToProgressKey(syllabus.examId) : null

  const [config, setConfig] = useState<StudyPlanConfig>(() =>
    examId ? loadStudyPlanConfig(examId) : { targetReadyDate: null, targetStrengthLevel: 'strong_all', planStartDate: null }
  )
  const [plan, setPlan] = useState<StudyPlan | null>(null)
  const [loading, setLoading] = useState(true)
  const [tick, setTick] = useState(0)

  // Reload config when the active exam changes
  useEffect(() => {
    if (!examId) return
    const saved = loadStudyPlanConfig(examId)
    setConfig(saved)
  }, [examId])

  // Generate (or load cached) plan whenever inputs change
  useEffect(() => {
    if (!syllabus || !examId) {
      setPlan(null)
      setLoading(false)
      return
    }

    // Skip plan generation until mastery data is at least available (may be empty array)
    setLoading(true)

    // Try cache first (same-day stability)
    const cached = loadCachedStudyPlan(examId)
    if (cached && cached.generatedDate === todayISO()) {
      // Use cache, but honour latest config
      if (
        cached.config.targetReadyDate === config.targetReadyDate &&
        cached.config.targetStrengthLevel === config.targetStrengthLevel
      ) {
        setPlan(cached)
        setLoading(false)
        return
      }
    }

    // Generate fresh
    const fresh = generateStudyPlan({ examId, syllabus, masteryRecords, config, examDate })
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
        // Set planStartDate on first real configuration
        planStartDate: prev.planStartDate ?? (next.targetReadyDate ? todayISO() : null),
      }
      saveStudyPlanConfig(examId, merged)
      return merged
    })
  }, [examId])

  const regenerate = useCallback(() => {
    setTick(t => t + 1)
  }, [])

  // useMemo ensures referential stability of the returned plan when nothing changed
  const stablePlan = useMemo(() => plan, [plan])

  return { plan: stablePlan, config, loading, updateConfig, regenerate }
}
