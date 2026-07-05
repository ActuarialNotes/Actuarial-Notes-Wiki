// Custom Exam Study Plan — pure logic and localStorage persistence.
//
// Plans are generated fresh each day on first load. Within the same calendar
// day, the plan is loaded from cache so it stays stable even if the user
// closes and reopens the app.

import type { WikiExamSyllabus } from '@/lib/wikiParser'
import type { ConceptMasteryRecord, MasteryState } from '@/lib/mastery'
import { DECAY_DAYS_LEVEL3 } from '@/lib/mastery'
import { buildMasteryLookup, lookupConceptRecord, resolveConceptState } from '@/lib/conceptMatch'

// Bump when the generation logic changes in a way that should invalidate
// already-cached plans (local + server), forcing one clean regeneration even
// within the same calendar day. v2: fixed plans generated from empty mastery
// records / aliased-concept lookups that left mastered concepts looking 'new'.
// v3: concept names now use the canonical page name instead of the syllabus
// display alias (e.g. "Callable Bond" not "Callable").
// v4: even daily-load distribution; proactive scheduling for level3 concepts
// approaching the decay threshold.
export const PLAN_CACHE_VERSION = 4

// ── Types ─────────────────────────────────────────────────────────────────────

export type TargetStrengthLevel = 'strong_all' | 'strong_key'

export type QuickSetPreset = '1d' | '1w' | '2w' | '1m' | '2m' | '3m' | '6m' | '8m'

export const QUICK_SET_LABELS: Record<QuickSetPreset, string> = {
  '1d': '1 day before',
  '1w': '1 week before',
  '2w': '2 weeks before',
  '1m': '1 month before',
  '2m': '2 months before',
  '3m': '3 months before',
  '6m': '6 months before',
  '8m': '8 months before',
}

export const QUICK_SET_PRESETS: QuickSetPreset[] = ['1d', '1w', '2w', '1m', '2m', '3m', '6m', '8m']

export interface StudyPlanConfig {
  targetReadyDate: string | null   // YYYY-MM-DD; null = unconfigured
  targetStrengthLevel: TargetStrengthLevel
  planStartDate: string | null     // YYYY-MM-DD; set on first save, used for day numbering
  examVariant?: string | null      // regional variant ID for localized exams (e.g. 'US', 'CA', 'INT')
}

export interface ConceptAssignment {
  conceptName: string
  topicName: string
  topicWeight?: string
  scheduledDate: string  // YYYY-MM-DD
  initialState: MasteryState  // concept's state at scheduling time; used to derive today's target
}

export type PacingStatus = 'on_track' | 'behind' | 'ahead' | 'review_mode' | 'target_passed'

export interface StudyPlan {
  examId: string
  planVersion?: number           // PLAN_CACHE_VERSION at generation; older/absent => invalid
  generatedDate: string          // YYYY-MM-DD — used to detect stale cache
  config: StudyPlanConfig
  todaysConcepts: string[]       // concept names assigned today
  assignments: ConceptAssignment[]  // all upcoming assignments (today + future)
  dayNumber: number              // 1-indexed position in the overall plan
  totalDays: number              // total planned days from planStartDate → targetReadyDate
  daysRemaining: number          // days left from today → effectiveReadyDate
  conceptsPerDay: number         // average new concepts to introduce per day to stay on pace
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
    case '1d':  d.setDate(d.getDate() - 1);    break
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
    if (plan.planVersion !== PLAN_CACHE_VERSION) return null  // generated by outdated logic
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
  target?: string | null   // raw [[target]] base name; mastery may be stored under this
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
  /** Concept slugs levelled up today — used to keep today's plan grounded in actual quiz progress
   *  even when the plan regenerates mid-day (e.g. after a config change). */
  todaysLevelUps?: string[]
}

export function generateStudyPlan(input: GenerateInput): StudyPlan {
  const { examId, syllabus, masteryRecords, config, examDate, todaysLevelUps } = input
  const today = todayISO()
  const now = new Date()

  // Build mastery lookup (normalised to lowercase). Stored slugs use the
  // concept's file/base name, so resolveConceptState tries display name then
  // target — keeping aliased concepts (e.g. [[Bond Price|Price]]) in sync.
  const masteryBySlug = buildMasteryLookup(masteryRecords.filter(r => r.exam_id === examId))

  // Collect all concepts with topic metadata
  const allConcepts: ConceptEntry[] = []
  for (const topic of syllabus.topics) {
    const numericWeight = topic.weight ? parseTopicWeight(topic.weight) : 1
    for (const c of topic.concepts) {
      allConcepts.push({
        name: c.name,
        target: c.target,
        topicName: topic.name,
        topicWeight: topic.weight,
        numericWeight,
      })
    }
  }

  const getState = (c: ConceptEntry) => resolveConceptState(masteryBySlug, c, now)

  const mastered   = allConcepts.filter(c => getState(c) === 'level3')
  const unmastered = allConcepts.filter(c => getState(c) !== 'level3')

  // ── Review mode: every concept already level3 ────────────────────────────
  if (unmastered.length === 0) {
    const effective = examDate ?? addDays(today, 30)
    const rmDaysRemaining = Math.max(1, daysBetween(today, effective))

    // Identify level3 concepts that will decay strictly before the target date,
    // sorted by urgency so the soonest-to-decay surface first.
    const rmMaintenance = mastered
      .flatMap(c => {
        const rec = lookupConceptRecord(masteryBySlug, c)
        if (!rec?.last_correct_at) return []
        const daysSinceCorrect = daysBetween(rec.last_correct_at.slice(0, 10), today)
        const daysUntilDecay = DECAY_DAYS_LEVEL3 - daysSinceCorrect
        if (daysUntilDecay <= 0 || daysUntilDecay >= rmDaysRemaining) return []
        return [{ c, daysUntilDecay }]
      })
      .sort((a, b) => a.daysUntilDecay - b.daysUntilDecay)

    const maintenanceAssignments: ConceptAssignment[] = rmMaintenance.map(({ c, daysUntilDecay }) => ({
      conceptName: c.name,
      topicName: c.topicName,
      topicWeight: c.topicWeight,
      // Open the review window 7 days before decay; show it immediately if urgent.
      scheduledDate: addDays(today, Math.max(0, daysUntilDecay - 7)),
      initialState: 'level3' as MasteryState,
    }))

    const reviewConcepts = [...mastered]
      .sort((a, b) => {
        const ra = lookupConceptRecord(masteryBySlug, a)
        const rb = lookupConceptRecord(masteryBySlug, b)
        const ta = ra?.last_correct_at ? new Date(ra.last_correct_at).getTime() : 0
        const tb = rb?.last_correct_at ? new Date(rb.last_correct_at).getTime() : 0
        return ta - tb  // oldest first
      })
      .slice(0, Math.min(5, mastered.length))
      .map(c => c.name)

    // Today: urgent maintenance concepts first, then stalest-review suggestions.
    const urgentToday = rmMaintenance
      .filter(({ daysUntilDecay }) => daysUntilDecay <= 7)
      .map(({ c }) => c.name)
    const todaysConcepts = [...new Set([...urgentToday, ...reviewConcepts])]

    return {
      examId,
      planVersion: PLAN_CACHE_VERSION,
      generatedDate: today,
      config,
      todaysConcepts,
      assignments: maintenanceAssignments,
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
  // forgotten > level1 > level2 > new (partially-learned beats brand-new)
  const stateOrder: Record<string, number> = { forgotten: 0, level1: 1, level2: 2, new: 3 }

  const sortedUnmastered = [...unmastered].sort((a, b) => {
    if (config.targetStrengthLevel === 'strong_key') {
      if (b.numericWeight !== a.numericWeight) return b.numericWeight - a.numericWeight
    }
    const stateDiff = (stateOrder[getState(a)] ?? 3) - (stateOrder[getState(b)] ?? 3)
    if (stateDiff !== 0) return stateDiff
    return a.name.localeCompare(b.name)
  })

  // ── Spacing-aware scheduling ──────────────────────────────────────────────
  // Rules:
  //   - new/forgotten: introduce up to MAX_NEW_PER_DAY per calendar day
  //   - level1 → level2: earliest after 1 day gap from last_correct_at
  //   - level2 → level3: earliest after 2 day gap from last_correct_at
  //   - max 1 level advance per concept per session (enforced by mastery.ts)

  const MAX_NEW_PER_DAY = 5

  // Spread new/forgotten introductions evenly across available days so that
  // a small concept count with a long runway isn't front-loaded onto Day 1.
  const newAndForgottenCount = sortedUnmastered.filter(
    c => { const s = getState(c); return s === 'new' || s === 'forgotten' },
  ).length
  // Reserve 3 days at the end for the last introduced concept to complete its
  // full path (intro→level1 on D, level1→level2 on D+1, level2→level3 on D+3).
  const dailyNewLimit = Math.min(
    MAX_NEW_PER_DAY,
    Math.max(1, Math.ceil(newAndForgottenCount / Math.max(1, daysRemaining - 3))),
  )

  function getEligibleDate(c: ConceptEntry): string {
    const state = getState(c)
    const rec = lookupConceptRecord(masteryBySlug, c)
    if (state === 'level1') {
      if (!rec?.last_correct_at) return today
      const eligible = addDays(rec.last_correct_at.slice(0, 10), 1)
      return eligible > today ? eligible : today
    }
    if (state === 'level2') {
      if (!rec?.last_correct_at) return today
      const eligible = addDays(rec.last_correct_at.slice(0, 10), 2)
      return eligible > today ? eligible : today
    }
    return today  // new / forgotten
  }

  const assignments: ConceptAssignment[] = []
  const newIntrosByDay = new Map<string, number>()  // date → count of new introductions

  // Level3 concepts that will cross the decay threshold before the target date must
  // be scheduled for a refresher before they slip. Sort by urgency so the soonest-
  // to-decay concepts claim the nearest available slots first.
  const maintenanceCandidates = mastered
    .flatMap(c => {
      const rec = lookupConceptRecord(masteryBySlug, c)
      if (!rec?.last_correct_at) return []
      const daysSinceCorrect = daysBetween(rec.last_correct_at.slice(0, 10), today)
      const daysUntilDecay = DECAY_DAYS_LEVEL3 - daysSinceCorrect
      // Only schedule if the concept decays strictly before the target date.
      // A concept that decays on or after the target day doesn't need early intervention.
      if (daysUntilDecay <= 0 || daysUntilDecay >= daysRemaining) return []
      return [{ c, daysUntilDecay }]
    })
    .sort((a, b) => a.daysUntilDecay - b.daysUntilDecay)

  // Compute how many total sessions (intro + each review stage + maintenance) remain,
  // then cap each day at that average to prevent pile-ups when many concepts converge
  // to the same eligible date.
  const totalSessions = sortedUnmastered.reduce((sum, c) => {
    const s = getState(c)
    if (s === 'new' || s === 'forgotten') return sum + 3
    if (s === 'level1') return sum + 2
    if (s === 'level2') return sum + 1
    return sum
  }, maintenanceCandidates.length)
  const targetDailyLoad = Math.ceil(totalSessions / Math.max(1, daysRemaining))
  const sessionsByDay = new Map<string, number>()  // date → total sessions scheduled that day

  // Find the earliest date >= earliestDate that hasn't hit the daily session cap.
  function nextReviewSlot(earliestDate: string): string {
    let d = earliestDate
    while (true) {
      const count = sessionsByDay.get(d) ?? 0
      if (count < targetDailyLoad) {
        sessionsByDay.set(d, count + 1)
        return d
      }
      d = addDays(d, 1)
    }
  }

  // Find the earliest available slot in the window [startFrom, deadline]. Reviews are
  // not shown until they enter their window so concepts with distant deadlines don't
  // crowd today's plan unnecessarily. If every day in the window is at capacity,
  // exceed the cap on the deadline — the review must happen before decay regardless.
  function findMaintenanceSlot(startFrom: string, deadline: string): string {
    let d = startFrom
    while (d <= deadline) {
      const count = sessionsByDay.get(d) ?? 0
      if (count < targetDailyLoad) {
        sessionsByDay.set(d, count + 1)
        return d
      }
      d = addDays(d, 1)
    }
    sessionsByDay.set(deadline, (sessionsByDay.get(deadline) ?? 0) + 1)
    return deadline
  }

  function nextSlotForNewIntro(): string {
    let dayOffset = 0
    while (true) {
      const date = addDays(today, dayOffset)
      const newCount = newIntrosByDay.get(date) ?? 0
      const sessionCount = sessionsByDay.get(date) ?? 0
      if (newCount < dailyNewLimit && sessionCount < targetDailyLoad) {
        newIntrosByDay.set(date, newCount + 1)
        sessionsByDay.set(date, sessionCount + 1)
        return date
      }
      dayOffset++
    }
  }

  // Zero: schedule pre-emptive refreshers for level3 concepts that will decay
  // before the target date, urgency-first so the soonest-to-decay get the
  // nearest open slots.
  for (const { c, daysUntilDecay } of maintenanceCandidates) {
    const deadline = addDays(today, daysUntilDecay - 1)
    const windowStart = addDays(today, Math.max(0, daysUntilDecay - 7))
    const scheduledDate = findMaintenanceSlot(windowStart, deadline)
    assignments.push({
      conceptName: c.name,
      topicName: c.topicName,
      topicWeight: c.topicWeight,
      scheduledDate,
      initialState: 'level3',
    })
  }

  // First: schedule level1/level2 on their earliest available slot (respecting the
  // minimum gap), then pre-schedule the next pipeline stage.
  for (const c of sortedUnmastered) {
    const state = getState(c)
    if (state !== 'level1' && state !== 'level2') continue
    const eligibleDate = getEligibleDate(c)
    const scheduledDate = nextReviewSlot(eligibleDate)
    assignments.push({
      conceptName: c.name,
      topicName: c.topicName,
      topicWeight: c.topicWeight,
      scheduledDate,
      initialState: state,
    })
    if (state === 'level1') {
      // level2→level3 requires a 2-day gap from when level2 is earned
      const l3Date = nextReviewSlot(addDays(scheduledDate, 2))
      assignments.push({
        conceptName: c.name,
        topicName: c.topicName,
        topicWeight: c.topicWeight,
        scheduledDate: l3Date,
        initialState: 'level2',
      })
    }
  }

  // Second: spread new/forgotten introductions evenly, then pre-schedule
  // all three pipeline stages so the true workload is visible from day one.
  for (const c of sortedUnmastered) {
    const state = getState(c)
    if (state !== 'new' && state !== 'forgotten') continue
    const introDate = nextSlotForNewIntro()
    // Stage 1: introduce (new/forgotten → level1)
    assignments.push({
      conceptName: c.name,
      topicName: c.topicName,
      topicWeight: c.topicWeight,
      scheduledDate: introDate,
      initialState: state,
    })
    // Stage 2: level1 → level2 (requires 1-day gap)
    const l2Date = nextReviewSlot(addDays(introDate, 1))
    assignments.push({
      conceptName: c.name,
      topicName: c.topicName,
      topicWeight: c.topicWeight,
      scheduledDate: l2Date,
      initialState: 'level1',
    })
    // Stage 3: level2 → level3 (requires 2-day gap from level2 earn date)
    const l3Date = nextReviewSlot(addDays(l2Date, 2))
    assignments.push({
      conceptName: c.name,
      topicName: c.topicName,
      topicWeight: c.topicWeight,
      scheduledDate: l3Date,
      initialState: 'level2',
    })
  }

  // Deduplicate todaysConcepts — a concept should appear at most once today
  let todaysConcepts = [...new Set(
    assignments
      .filter(a => a.scheduledDate === today)
      .map(a => a.conceptName)
  )]

  // If concepts were already levelled up today, prefer them over fresh unlearned ones.
  // This keeps today's plan grounded in actual quiz progress when the plan regenerates
  // mid-day (e.g. after a config change): the user sees what they actually worked on,
  // not a list of brand-new concepts they haven't touched yet.
  if (todaysLevelUps && todaysLevelUps.length > 0) {
    const leveledUpSet = new Set(todaysLevelUps.map(s => s.toLowerCase()))
    const originalCount = todaysConcepts.length
    if (todaysLevelUps.length >= originalCount) {
      todaysConcepts = todaysLevelUps.slice(0, originalCount)
    } else {
      const fresh = todaysConcepts.filter(n => !leveledUpSet.has(n.toLowerCase()))
      todaysConcepts = [...todaysLevelUps, ...fresh].slice(0, originalCount)
    }
  }

  // conceptsPerDay = average daily new-concept introductions needed to stay on pace.
  // Using neededNewPerDay (uncapped) so the displayed number reflects the true required
  // rate, not the peak pipeline count which inflates due to staged assignments converging.
  const neededNewPerDay = Math.ceil(newAndForgottenCount / Math.max(1, daysRemaining - 3))
  const conceptsPerDay = Math.max(1, neededNewPerDay)

  // ── Pacing status ─────────────────────────────────────────────────────────
  // A schedule is "behind" when unmastered concepts can't fit in the remaining
  // days at a reasonable pace (more than 8 concepts on the busiest day).
  let status: PacingStatus = 'on_track'
  if (targetPassedFallback) {
    status = 'target_passed'
  } else if (neededNewPerDay > MAX_NEW_PER_DAY) {
    status = 'behind'
  } else {
    const planStartDate = config.planStartDate ?? today
    const totalDaysFromStart = Math.max(1, daysBetween(planStartDate, effectiveReadyDate!))
    const daysElapsed = totalDaysFromStart - daysRemaining
    const expectedMasteredFraction = daysElapsed / totalDaysFromStart
    const actualMasteredFraction = mastered.length / allConcepts.length
    if (daysElapsed > 2 && actualMasteredFraction > expectedMasteredFraction + 0.15) {
      status = 'ahead'
    }
  }

  // ── Day numbering ─────────────────────────────────────────────────────────
  const planStartDate = config.planStartDate ?? today
  const totalDays = Math.max(1, daysBetween(planStartDate, effectiveReadyDate!))
  const dayNumber = Math.max(1, totalDays - daysRemaining + 1)

  // ── Spaced review suggestions (for concepts marked strong that are getting stale)
  const reviewConcepts = [...mastered]
    .sort((a, b) => {
      const ra = lookupConceptRecord(masteryBySlug, a)
      const rb = lookupConceptRecord(masteryBySlug, b)
      const ta = ra?.last_correct_at ? new Date(ra.last_correct_at).getTime() : 0
      const tb = rb?.last_correct_at ? new Date(rb.last_correct_at).getTime() : 0
      return ta - tb
    })
    .slice(0, 3)
    .map(c => c.name)

  return {
    examId,
    planVersion: PLAN_CACHE_VERSION,
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
  const today = todayISO()
  const dates = plan.assignments
    .filter(x => x.conceptName.toLowerCase() === conceptName.toLowerCase())
    .map(x => x.scheduledDate)
    .sort()
  // Return the earliest upcoming date (today or future); fall back to the last known date
  return dates.find(d => d >= today) ?? dates[dates.length - 1] ?? null
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

// ── Today's plan question selection ───────────────────────────────────────────

interface CoverageQuestion {
  id: string
  wiki_link: string[]
}

// Resolve a question's wiki_link entries to the lowercased concept names they
// reference, matching the normalization used to build today's concept set.
function linkedConceptNames(wikiLinks: string[]): Set<string> {
  const names = new Set<string>()
  for (const link of wikiLinks) {
    const clean = link.replace(/\+/g, ' ').replace(/\.md$/i, '')
    const name = clean.split('/').filter(Boolean).pop()?.toLowerCase()
    if (name) names.add(name)
  }
  return names
}

/**
 * Pick up to `count` questions from `questions` that cover as many of
 * `concepts` as possible, using the fewest questions necessary.
 *
 * Phase 1 greedily picks the question covering the most not-yet-covered
 * concepts at each step, so a quiz with `count >= concepts.length` covers
 * every concept (at least one question each) and a quiz with
 * `count < concepts.length` still spreads across as many distinct concepts
 * as those questions can reach.
 *
 * Phase 2 fills any remaining slots with the highest-coverage leftover
 * questions, so extra questions still stay on-topic.
 *
 * When `count` is omitted, no cap is applied and phase 2 is skipped: the
 * result is the minimum greedy set that covers every reachable concept —
 * the fewest questions that complete the whole plan.
 */
export function selectQuestionsForCoverage<T extends CoverageQuestion>(
  questions: T[],
  concepts: string[],
  count?: number,
): T[] {
  const conceptSet = new Set(concepts.map(c => c.toLowerCase()))
  const uncovered = new Set(conceptSet)
  const pool = [...questions]
  const selected: T[] = []
  const cap = count ?? Infinity

  while (uncovered.size > 0 && selected.length < cap && pool.length > 0) {
    let bestIdx = -1
    let bestCovered: Set<string> = new Set()
    for (let i = 0; i < pool.length; i++) {
      const covered = new Set([...linkedConceptNames(pool[i].wiki_link)].filter(c => uncovered.has(c)))
      if (covered.size > bestCovered.size) {
        bestCovered = covered
        bestIdx = i
      }
    }
    if (bestIdx === -1) break
    const [chosen] = pool.splice(bestIdx, 1)
    selected.push(chosen)
    for (const c of bestCovered) uncovered.delete(c)
  }

  if (count !== undefined && selected.length < count && pool.length > 0) {
    pool.sort((a, b) => {
      const scoreA = [...linkedConceptNames(a.wiki_link)].filter(c => conceptSet.has(c)).length
      const scoreB = [...linkedConceptNames(b.wiki_link)].filter(c => conceptSet.has(c)).length
      return scoreB - scoreA
    })
    for (const q of pool) {
      if (selected.length >= count) break
      selected.push(q)
    }
  }

  return selected
}

/**
 * The fewest questions needed to cover every reachable concept in `concepts`
 * — i.e. the number of questions a "Today's Quiz" needs to give the user a
 * shot at completing the entire day's plan. Concepts with no matching question
 * simply can't be covered and don't inflate the count.
 */
export function minQuestionsToCoverConcepts<T extends CoverageQuestion>(
  questions: T[],
  concepts: string[],
): number {
  return selectQuestionsForCoverage(questions, concepts).length
}
