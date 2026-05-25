// Hook that owns study plan state: config CRUD, daily regeneration, caching.
//
// Config persistence priority (highest wins):
//   1. Supabase exam_progress.study_plan_config  (cross-device, synced via realtime)
//   2. localStorage actuarial_study_plan_config_v1_{examId}  (anonymous / offline fallback)
//
// Cross-tab sync (same browser, different tabs) happens via:
//   - Supabase realtime updating examRows → effect re-reads config from updated row
//   - localStorage 'storage' event as a fast path when realtime is slow/unavailable

import { useCallback, useEffect, useMemo, useRef, useState } from 'react'
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
import { readTodayLevelUps } from '@/lib/dailyProgressStore'

export interface UseStudyPlanResult {
  plan: StudyPlan | null
  config: StudyPlanConfig
  loading: boolean
  updateConfig: (next: Partial<StudyPlanConfig>) => void
  regenerate: () => void
  replaceTodaysConcepts: (concepts: string[]) => void
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
  masteryLoading: boolean = false,
): UseStudyPlanResult {
  const examId = syllabus ? wikiExamIdToProgressKey(syllabus.examId) : null
  const { examRows, updateStudyPlanConfig, updateStudyPlanCache } = useExamProgress()

  // Server-persisted plan for this exam (authoritative cross-device source).
  const serverPlan = examId
    ? examRows.find(r => r.exam_id === examId)?.study_plan_cache ?? null
    : null
  // Stable identity so the generation effect only re-runs when the server plan
  // meaningfully changes — not on every realtime row refresh.
  // Use optional chaining in case a plan cached before the `config` field existed
  // has config: undefined at runtime — accessing it directly would crash on render.
  const serverPlanKey = serverPlan
    ? `${serverPlan.generatedDate}|${serverPlan.config?.targetReadyDate ?? ''}|${serverPlan.config?.targetStrengthLevel ?? ''}`
    : ''

  const [config, setConfig] = useState<StudyPlanConfig>(() =>
    examId ? loadStudyPlanConfig(examId) : DEFAULT_CONFIG
  )
  const [plan, setPlan] = useState<StudyPlan | null>(null)
  const [loading, setLoading] = useState(true)
  const [tick, setTick] = useState(0)
  // Set by regenerate() so the next run skips all caches and rebuilds the plan.
  const forceRegenRef = useRef(false)

  // Keep a stable ref so plan generation always uses the latest mastery snapshot
  // without masteryRecords being a reactive dependency (plan must stay stable within a day).
  const masteryRef = useRef(masteryRecords)
  useEffect(() => { masteryRef.current = masteryRecords }, [masteryRecords])

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

  // Generate (or load cached) plan whenever inputs change.
  // masteryRecords is intentionally NOT a dependency — the plan is frozen for
  // the day once generated; only config/date changes or a new day re-trigger it.
  // masteryLoading gates generation so we never cache a plan built from
  // partial/empty records (the primary cause of inconsistent daily plans).
  useEffect(() => {
    if (!syllabus || !examId) {
      setPlan(null)
      setLoading(false)
      return
    }

    if (masteryLoading) {
      setLoading(true)
      return
    }

    setLoading(true)

    const today = todayISO()
    const configMatches = (c: StudyPlanConfig) =>
      c.targetReadyDate === config.targetReadyDate &&
      c.targetStrengthLevel === config.targetStrengthLevel

    // Explicit regenerate() bypasses every cache and rebuilds from scratch.
    const force = forceRegenRef.current
    forceRegenRef.current = false

    // 1. Server plan wins — it's the cross-device source of truth. Mirror it to
    //    localStorage so offline refreshes stay consistent with other devices.
    if (!force && serverPlan && serverPlan.generatedDate === today && serverPlan.config && configMatches(serverPlan.config)) {
      saveCachedStudyPlan(serverPlan)
      setPlan(serverPlan)
      setLoading(false)
      return
    }

    // 2. Local cache (same-day stability when the server has no plan yet).
    //    Push it up so other devices converge on this plan.
    const cached = loadCachedStudyPlan(examId)
    if (!force && cached && cached.generatedDate === today && cached.config && configMatches(cached.config)) {
      setPlan(cached)
      setLoading(false)
      updateStudyPlanCache(examId, cached).catch(() => { /* best-effort */ })
      return
    }

    // 3. Generate fresh using the latest mastery snapshot (via ref, not reactive
    //    dep) and persist to both localStorage and the server.
    const todaysLevelUps = readTodayLevelUps().map(lu => lu.conceptSlug)
    const fresh = generateStudyPlan({ examId, syllabus, masteryRecords: masteryRef.current, config, examDate, todaysLevelUps })
    saveCachedStudyPlan(fresh)
    updateStudyPlanCache(examId, fresh).catch(() => { /* best-effort */ })
    setPlan(fresh)
    setLoading(false)
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [examId, syllabus?.examId, masteryLoading, config, examDate, tick, serverPlanKey])

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
    forceRegenRef.current = true
    setTick(t => t + 1)
  }, [])

  const replaceTodaysConcepts = useCallback((newConcepts: string[]) => {
    if (!plan || !examId) return
    const updated: StudyPlan = { ...plan, todaysConcepts: newConcepts }
    setPlan(updated)
    saveCachedStudyPlan(updated)
    updateStudyPlanCache(examId, updated).catch(() => { /* best-effort */ })
  }, [plan, examId, updateStudyPlanCache])

  const stablePlan = useMemo(() => plan, [plan])

  return { plan: stablePlan, config, loading, updateConfig, regenerate, replaceTodaysConcepts }
}
