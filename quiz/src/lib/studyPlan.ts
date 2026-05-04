// Custom Exam Study Plan — pure logic and localStorage persistence.
//
// Plans are generated fresh each day on first load. Within the same calendar
// day, the plan is loaded from cache so it stays stable even if the user
// closes and reopens the app.

import type { WikiExamSyllabus } from '@/lib/wikiParser'
import type { ConceptMasteryRecord } from '@/lib/mastery'
import { decayIfStale } from '@/lib/mastery'

// ── Types ─────────────────────────────────────────────────────────────────────

export type TargetStrengthLevel = 'strong_all' | 'strong_key'

export type QuickSetPreset = '1w' | '2w' | '1m' | '2m' | '3m' | '6m' | '8m'

export const QUICK_SET_LABELS: Record<QuickSetPreset, string> = {
  '1w': '1 week before',
  '2w': '2 weeks before',
  '1m': '1 month before',
  '2m': '2 months before',
  '3m': '3 months before',
  '6m': '6 months before',
  '8m': '8 months before',
}

export const QUICK_SET_PRESETS: QuickSetPreset[] = ['1w', '2w', '1m', '2m', '3m', '6m', '8m']

export interface StudyPlanConfig {
  targetReadyDate: string | null   // YYYY-MM-DD; null = unconfigured
  targetStrengthLevel: TargetStrengthLevel
  planStartDate: string | null     // YYYY-MM-DD; set on first save, used for day numbering
}

export interface ConceptAssignment {
  conceptName: string
  topicName: string
  topicWeight?: string
  scheduledDate: string  // YYYY-MM-DD
}

export type PacingStatus = 'on_track' | 'behind' | 'ahead' | 'review_mode' | 'target_passed'

export interface StudyPlan {
  examId: string
  generatedDate: string          // YYYY-MM-DD — used to detect stale cache
  config: StudyPlanConfig
  todaysConcepts: string[]       // concept names assigned today
  assignments: ConceptAssignment[]  // all upcoming assignments (today + future)
  dayNumber: number              // 1-indexed position in the overall plan
  totalDays: number              // total planned days from planStartDate → targetReadyDate
  daysRemaining: number          // days left from today → effectiveReadyDate
  conceptsPerDay: number         // how many concepts are assigned per day
  status: PacingStatus
  reviewConcepts: string[]       // weakest mastered concepts for spaced review
  effectiveReadyDate: string     // may differ from config if target has passed
  targetPassedFallback: boolean  // true when we fell back to exam date
}

// ── Date helpers ──────────────────────────────────────────────────────────────

export function todayISO(): string {
  return new Date().toISOString().slice(0, 10)
}

export function addDays(dateISO: string, days: number): string {
  const d = new Date(dateISO + 'T12:00:00')
  d.setDate(d.getDate() + days)
  return d.toISOString().slice(0, 10)
}

export function daysBetween(from: string, to: string): number {
  const a = new Date(from + 'T12:00:00')
  const b = new Date(to + 'T12:00:00')
  return Math.round((b.getTime() - a.getTime()) / (1000 * 60 * 60 * 24))
}

export function applyPreset(examDate: string, preset: QuickSetPreset): string {
  const d = new Date(examDate + 'T12:00:00')
  switch (preset) {
    case '1w':  d.setDate(d.getDate() - 7);    break
    case '2w':  d.setDate(d.getDate() - 14);   break
    case '1m':  d.setMonth(d.getMonth() - 1);  break
    case '2m':  d.setMonth(d.getMonth() - 2);  break
    case '3m':  d.setMonth(d.getMonth() - 3);  break
    case '6m':  d.setMonth(d.getMonth() - 6);  break
    case '8m':  d.setMonth(d.getMonth() - 8);  break
  }
  return d.toISOString().slice(0, 10)
}

export function formatReadableDate(iso: string): string {
  return new Date(iso + 'T12:00:00').toLocaleDateString(undefined, {
    month: 'short', day: 'numeric', year: 'numeric',
  })
}

// ── localStorage helpers ──────────────────────────────────────────────────────

const CONFIG_KEY = 'actuarial_study_plan_config_v1_'
const PLAN_KEY   = 'actuarial_study_plan_v1_'

export function loadStudyPlanConfig(examId: string): StudyPlanConfig {
  try {
    const raw = localStorage.getItem(CONFIG_KEY + examId)
    if (raw) return JSON.parse(raw) as StudyPlanConfig
  } catch { /* ignore */ }
  return { targetReadyDate: null, targetStrengthLevel: 'strong_all', planStartDate: null }
}

export function saveStudyPlanConfig(examId: string, config: StudyPlanConfig): void {
  try {
    localStorage.setItem(CONFIG_KEY + examId, JSON.stringify(config))
  } catch { /* quota */ }
}

export function loadCachedStudyPlan(examId: string): StudyPlan | null {
  try {
    const raw = localStorage.getItem(PLAN_KEY + examId)
    if (!raw) return null
    const plan = JSON.parse(raw) as StudyPlan
    if (plan.generatedDate === todayISO()) return plan
    return null  // stale
  } catch {
    return null
  }
}

export function saveCachedStudyPlan(plan: StudyPlan): void {
  try {
    localStorage.setItem(PLAN_KEY + plan.examId, JSON.stringify(plan))
  } catch { /* quota */ }
}

// ── Plan generation ───────────────────────────────────────────────────────────

function parseTopicWeight(weight: string): number {
  const rangeMatch = weight.match(/(\d+)\s*[-–]\s*(\d+)%/)
  if (rangeMatch) return (parseInt(rangeMatch[1]) + parseInt(rangeMatch[2])) / 2
  const singleMatch = weight.match(/(\d+)%/)
  if (singleMatch) return parseInt(singleMatch[1])
  return 1
}

interface ConceptEntry {
  name: string
  topicName: string
  topicWeight?: string
  numericWeight: number
}

interface GenerateInput {
  examId: string
  syllabus: WikiExamSyllabus
  masteryRecords: ConceptMasteryRecord[]
  config: StudyPlanConfig
  examDate: string | null
}

export function generateStudyPlan(input: GenerateInput): StudyPlan {
  const { examId, syllabus, masteryRecords, config, examDate } = input
  const today = todayISO()
  const now = new Date()

  // Build mastery lookup (normalised to lowercase)
  const masteryBySlug = new Map<string, ConceptMasteryRecord>()
  for (const r of masteryRecords.filter(r => r.exam_id === examId)) {
    masteryBySlug.set(r.concept_slug.toLowerCase(), r)
  }

  // Collect all concepts with topic metadata
  const allConcepts: ConceptEntry[] = []
  for (const topic of syllabus.topics) {
    const numericWeight = topic.weight ? parseTopicWeight(topic.weight) : 1
    for (const c of topic.concepts) {
      allConcepts.push({
        name: c.name,
        topicName: topic.name,
        topicWeight: topic.weight,
        numericWeight,
      })
    }
  }

  const getState = (name: string) => {
    const rec = masteryBySlug.get(name.toLowerCase())
    return rec ? decayIfStale(rec, now).state : 'new'
  }

  const mastered   = allConcepts.filter(c => getState(c.name) === 'strong')
  const unmastered = allConcepts.filter(c => getState(c.name) !== 'strong')

  // ── Review mode: every concept already strong ─────────────────────────────
  if (unmastered.length === 0) {
    const reviewConcepts = [...mastered]
      .sort((a, b) => {
        const ra = masteryBySlug.get(a.name.toLowerCase())
        const rb = masteryBySlug.get(b.name.toLowerCase())
        const ta = ra?.last_correct_at ? new Date(ra.last_correct_at).getTime() : 0
        const tb = rb?.last_correct_at ? new Date(rb.last_correct_at).getTime() : 0
        return ta - tb  // oldest first
      })
      .slice(0, Math.min(5, mastered.length))
      .map(c => c.name)

    const effective = examDate ?? addDays(today, 30)
    return {
      examId,
      generatedDate: today,
      config,
      todaysConcepts: reviewConcepts,
      assignments: [],
      dayNumber: 1,
      totalDays: 1,
      daysRemaining: Math.max(0, daysBetween(today, effective)),
      conceptsPerDay: 0,
      status: 'review_mode',
      reviewConcepts,
      effectiveReadyDate: effective,
      targetPassedFallback: false,
    }
  }

  // ── Resolve effective target date ─────────────────────────────────────────
  let effectiveReadyDate = config.targetReadyDate
  let targetPassedFallback = false

  const targetHasPassed = !effectiveReadyDate || daysBetween(today, effectiveReadyDate) <= 0

  if (targetHasPassed) {
    if (examDate && daysBetween(today, examDate) > 0) {
      effectiveReadyDate = examDate
      if (config.targetReadyDate && daysBetween(today, config.targetReadyDate) <= 0) {
        targetPassedFallback = true
      }
    } else {
      effectiveReadyDate = addDays(today, 30)
    }
  }

  const daysRemaining = Math.max(1, daysBetween(today, effectiveReadyDate!))

  // ── Sort unmastered concepts by priority ──────────────────────────────────
  const stateOrder: Record<string, number> = { forgotten: 0, learning: 1, new: 2 }

  const sortedUnmastered = [...unmastered].sort((a, b) => {
    if (config.targetStrengthLevel === 'strong_key') {
      if (b.numericWeight !== a.numericWeight) return b.numericWeight - a.numericWeight
    }
    return (stateOrder[getState(a.name)] ?? 2) - (stateOrder[getState(b.name)] ?? 2)
  })

  // ── Distribute across days ────────────────────────────────────────────────
  const conceptsPerDay = Math.max(1, Math.ceil(sortedUnmastered.length / daysRemaining))

  const assignments: ConceptAssignment[] = []
  let idx = 0
  for (let dayOffset = 0; dayOffset < daysRemaining && idx < sortedUnmastered.length; dayOffset++) {
    const date = addDays(today, dayOffset)
    const batchSize = Math.min(conceptsPerDay, sortedUnmastered.length - idx)
    for (let i = 0; i < batchSize; i++) {
      const c = sortedUnmastered[idx++]
      assignments.push({
        conceptName: c.name,
        topicName: c.topicName,
        topicWeight: c.topicWeight,
        scheduledDate: date,
      })
    }
  }

  const todaysConcepts = assignments
    .filter(a => a.scheduledDate === today)
    .map(a => a.conceptName)

  // ── Pacing status ─────────────────────────────────────────────────────────
  let status: PacingStatus = 'on_track'
  if (targetPassedFallback) {
    status = 'target_passed'
  } else {
    // Compare concepts needed per day vs a comfortable pace (1-2/day)
    const needed = sortedUnmastered.length / daysRemaining
    if (needed > conceptsPerDay * 1.5) {
      status = 'behind'
    } else {
      // ahead if mastered >70% and >40% days remain
      const planStartDate = config.planStartDate ?? today
      const totalDaysFromStart = Math.max(1, daysBetween(planStartDate, effectiveReadyDate!))
      const daysElapsed = totalDaysFromStart - daysRemaining
      const expectedMasteredFraction = daysElapsed / totalDaysFromStart
      const actualMasteredFraction = mastered.length / allConcepts.length
      if (daysElapsed > 2 && actualMasteredFraction > expectedMasteredFraction + 0.15) {
        status = 'ahead'
      }
    }
  }

  // ── Day numbering ─────────────────────────────────────────────────────────
  const planStartDate = config.planStartDate ?? today
  const totalDays = Math.max(1, daysBetween(planStartDate, effectiveReadyDate!))
  const dayNumber = Math.max(1, totalDays - daysRemaining + 1)

  // ── Spaced review suggestions (for concepts marked strong that are getting stale)
  const reviewConcepts = [...mastered]
    .sort((a, b) => {
      const ra = masteryBySlug.get(a.name.toLowerCase())
      const rb = masteryBySlug.get(b.name.toLowerCase())
      const ta = ra?.last_correct_at ? new Date(ra.last_correct_at).getTime() : 0
      const tb = rb?.last_correct_at ? new Date(rb.last_correct_at).getTime() : 0
      return ta - tb
    })
    .slice(0, 3)
    .map(c => c.name)

  return {
    examId,
    generatedDate: today,
    config,
    todaysConcepts,
    assignments,
    dayNumber,
    totalDays,
    daysRemaining,
    conceptsPerDay,
    status,
    reviewConcepts,
    effectiveReadyDate: effectiveReadyDate!,
    targetPassedFallback,
  }
}

// ── Helpers for consumers ─────────────────────────────────────────────────────

export function getScheduledDate(
  conceptName: string,
  plan: StudyPlan | null,
): string | null {
  if (!plan) return null
  const a = plan.assignments.find(
    x => x.conceptName.toLowerCase() === conceptName.toLowerCase(),
  )
  return a?.scheduledDate ?? null
}

export function isScheduledToday(conceptName: string, plan: StudyPlan | null): boolean {
  const today = todayISO()
  const d = getScheduledDate(conceptName, plan)
  return d === today
}

// How many days until a concept is scheduled (negative if overdue/today)
export function daysUntilScheduled(conceptName: string, plan: StudyPlan | null): number | null {
  const d = getScheduledDate(conceptName, plan)
  if (!d) return null
  return daysBetween(todayISO(), d)
}
