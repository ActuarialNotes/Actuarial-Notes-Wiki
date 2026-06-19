// "Today" card — first card on the Dashboard. Shows today's study focus,
// a "Read Today's Concepts" action (opens concept modal), and a "Start Quiz"
// action (navigates to a quiz pre-filtered to today's concepts).

import { useState, useEffect, useMemo, useRef } from 'react'
import { Link } from 'react-router-dom'
import {
  Settings2,
  Info,
  AlertTriangle,
  CheckCircle2,
  Check,
  Circle,
  Loader2,
  ChevronDown,
  TrendingUp,
  Lock,
} from 'lucide-react'
import { Card, CardContent } from '@/components/ui/card'
import { Button, buttonVariants } from '@/components/ui/button'
import { ConceptDetailModal } from '@/components/ConceptDetailModal'
import { StudyPlanConfigModal } from '@/components/StudyPlanConfigModal'
import { StudyPlanInfoPanel } from '@/components/StudyPlanInfoPanel'
import { ConceptScheduleBadge } from '@/components/TopicProgressSection'
import {
  todayISO,
  type StudyPlan,
  type StudyPlanConfig,
} from '@/lib/studyPlan'
import type { WikiExamSyllabus } from '@/lib/wikiParser'
import { wikiExamIdToProgressKey } from '@/lib/wikiParser'
import { wikiRoute } from '@/lib/wikiRoutes'
import {
  aggregateForTopic,
  decayIfStale,
  type ConceptMasteryRecord,
  type MasteryState,
} from '@/lib/mastery'
import { normalizeMasteryToDisplayNames } from '@/lib/conceptMatch'
import { readTodayLevelUps, LEVELUP_EVENT, getDailyGems, type DailyLevelUp } from '@/lib/dailyProgressStore'
import { useDailyCompletions } from '@/hooks/useDailyCompletions'
import { StudyPlanCompletionCeremony } from '@/components/StudyPlanCompletionCeremony'

// ── Constants ─────────────────────────────────────────────────────────────────

const STATE_LABEL: Record<MasteryState, string> = {
  new: 'New', level1: 'Level 1', level2: 'Level 2', level3: 'Level 3', forgotten: 'Forgotten',
}

// Maps a concept's initial state to the level it should reach today
const NEXT_STATE: Partial<Record<MasteryState, MasteryState>> = {
  new: 'level1', forgotten: 'level1',
  level1: 'level2', level2: 'level3',
}

const STATE_ORDER: Record<MasteryState, number> = {
  new: 0, forgotten: 0, level1: 1, level2: 2, level3: 3,
}

const STATE_BADGE: Record<MasteryState, string> = {
  new:       'bg-muted text-muted-foreground border-transparent',
  level1:    'bg-amber-500/15 text-amber-700 dark:text-amber-300 border-amber-500/40',
  level2:    'bg-blue-500/15 text-blue-700 dark:text-blue-300 border-blue-500/40',
  level3:    'bg-green-500/15 text-green-700 dark:text-green-300 border-green-500/40',
  forgotten: 'bg-red-500/15 text-red-700 dark:text-red-300 border-red-500/40',
}

// ── Helpers ───────────────────────────────────────────────────────────────────

function todayLongDate(): string {
  return new Date().toLocaleDateString(undefined, {
    weekday: 'long', month: 'long', day: 'numeric',
  })
}

// ── Sub-components ────────────────────────────────────────────────────────────

function BehindWarning({ plan }: { plan: StudyPlan }) {
  return (
    <div className="rounded-lg border border-amber-200 bg-amber-50 dark:border-amber-800 dark:bg-amber-950/30 px-3 py-2.5 text-xs text-amber-800 dark:text-amber-300 space-y-1">
      <div className="flex items-center gap-1.5 font-medium">
        <AlertTriangle className="h-3.5 w-3.5 shrink-0" />
        {plan.status === 'target_passed'
          ? 'Your target ready date has passed. Pacing to exam date instead.'
          : `Behind pace: ${plan.conceptsPerDay} concept${plan.conceptsPerDay === 1 ? '' : 's'} per day needed to catch up.`}
      </div>
      {plan.status === 'behind' && (
        <p>Consider an extended quiz session today to cover more ground.</p>
      )}
    </div>
  )
}

function ReviewModeNote({ concepts }: { concepts: string[] }) {
  return (
    <div className="rounded-lg border border-purple-200 bg-purple-50 dark:border-purple-800 dark:bg-purple-950/30 px-3 py-2.5 text-xs text-purple-800 dark:text-purple-300 space-y-1">
      <div className="flex items-center gap-1.5 font-medium">
        <CheckCircle2 className="h-3.5 w-3.5 shrink-0" />
        All concepts mastered. Great work!
      </div>
      <p>Today's plan uses spaced repetition to keep your weakest concepts fresh.</p>
      {concepts.length > 0 && (
        <p>Reviewing: {concepts.slice(0, 3).join(', ')}{concepts.length > 3 ? ` +${concepts.length - 3} more` : ''}</p>
      )}
    </div>
  )
}

// ── Inline study plan tracker (topic + concept list) ──────────────────────────

function StudyPlanTracker({
  syllabus,
  masteryRecords,
  studyPlan,
  onConceptSelect,
}: {
  syllabus: WikiExamSyllabus
  masteryRecords: ConceptMasteryRecord[]
  studyPlan?: StudyPlan | null
  onConceptSelect: (concept: { name: string; state: MasteryState; index: number }) => void
}) {
  const [openTopics, setOpenTopics] = useState<Set<string>>(new Set())

  const examKey = wikiExamIdToProgressKey(syllabus.examId)
  const examMastery = masteryRecords.filter(r => r.exam_id === examKey)
  const now = new Date()

  // Handle aliased concepts (display name vs. file target name)
  const normalizedMastery = normalizeMasteryToDisplayNames(examMastery, syllabus)
  const recordsBySlug = new Map(normalizedMastery.map(r => [r.concept_slug.toLowerCase(), r]))

  const allConcepts: { name: string; state: MasteryState }[] = syllabus.topics.flatMap(topic =>
    topic.concepts.map(c => {
      const rec = recordsBySlug.get(c.name.toLowerCase())
      const state: MasteryState = rec ? decayIfStale(rec, now).state : 'new'
      return { name: c.name, state }
    })
  )

  const toggle = (name: string) =>
    setOpenTopics(prev => {
      const next = new Set(prev)
      next.has(name) ? next.delete(name) : next.add(name)
      return next
    })

  return (
    <div className="max-h-96 overflow-y-auto">
    <div className="space-y-1">
      {syllabus.topics.map(topic => {
        const conceptSlugs = topic.concepts.map(c => c.name)
        const agg = aggregateForTopic(normalizedMastery, conceptSlugs, now)
        const isOpen = openTopics.has(topic.name)

        return (
          <div key={topic.name}>
            <button
              className="flex items-center gap-2 w-full py-2 text-left hover:bg-muted/40 rounded-md px-1 -mx-1 transition-colors sticky top-0 z-10 bg-card/95 backdrop-blur-sm"
              onClick={() => toggle(topic.name)}
              aria-expanded={isOpen}
            >
              <ChevronDown
                className={`h-3.5 w-3.5 shrink-0 text-muted-foreground transition-transform duration-200 ${isOpen ? '' : '-rotate-90'}`}
              />
              <span className="text-sm font-semibold min-w-0 truncate">
                {topic.name}
                {topic.weight && (
                  <span className="ml-1.5 text-xs font-normal text-muted-foreground">{topic.weight}</span>
                )}
              </span>
              <div
                className="flex-1 h-1.5 rounded-full bg-secondary overflow-hidden min-w-0"
                role="progressbar"
                aria-valuenow={agg.strongPct}
                aria-valuemin={0}
                aria-valuemax={100}
              >
                <div className="h-full rounded-full bg-green-500 transition-all" style={{ width: `${agg.strongPct}%` }} />
              </div>
              <span className="text-xs font-medium shrink-0 text-right w-12 tabular-nums text-muted-foreground">
                {agg.level3}/{agg.total}
              </span>
            </button>

            {isOpen && topic.concepts.length > 0 && (
              <div className="space-y-1 pl-5 border-l-2 border-border ml-2 mb-2 mt-1">
                {topic.concepts.map(c => {
                  const rec = recordsBySlug.get(c.name.toLowerCase())
                  const state: MasteryState = rec ? decayIfStale(rec, now).state : 'new'
                  const idx = allConcepts.findIndex(ac => ac.name === c.name)
                  return (
                    <button
                      key={c.name}
                      type="button"
                      onClick={() => onConceptSelect({ name: c.name, state, index: idx === -1 ? 0 : idx })}
                      className="flex items-center gap-2 w-full py-1 px-1 -mx-1 rounded hover:bg-muted/40 transition-colors text-left"
                    >
                      <span className="text-xs text-foreground min-w-0 flex-1 truncate">{c.name}</span>
                      {studyPlan && state !== 'level3' && (
                        <ConceptScheduleBadge conceptName={c.name} plan={studyPlan} />
                      )}
                      <span className={`shrink-0 inline-flex items-center px-1.5 py-0.5 rounded text-[10px] font-medium ${STATE_BADGE[state]}`}>
                        {STATE_LABEL[state]}
                      </span>
                    </button>
                  )
                })}
              </div>
            )}
          </div>
        )
      })}

      {syllabus.resources.length > 0 && (
        <div className="pt-2 mt-1 border-t">
          <p className="text-sm font-semibold py-2">Resources</p>
          <ul className="space-y-1 pl-5 border-l-2 border-border ml-2">
            {syllabus.resources.map(r => (
              <li key={r.name}>
                <Link
                  to={wikiRoute({ kind: 'resource', name: r.name })}
                  className="text-xs text-foreground hover:underline block py-1 truncate"
                >
                  {r.name}
                </Link>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
    </div>
  )
}

// ── Main component ────────────────────────────────────────────────────────────

interface Props {
  plan: StudyPlan | null
  config: StudyPlanConfig
  loading: boolean
  syllabus: WikiExamSyllabus
  masteryStateByName: Map<string, MasteryState>
  masteryRecords: ConceptMasteryRecord[]
  examDate: string | null
  onConfigChange: (next: Partial<StudyPlanConfig>) => void
  onRegenerate: () => void
  onExamDateChange?: (date: string | null) => void
  /** When false, the Study Plan card is locked behind a Premium upgrade CTA. Defaults to true. */
  isPremium?: boolean
}

export function TodayCard({
  plan,
  config,
  loading,
  syllabus,
  masteryStateByName,
  masteryRecords,
  examDate,
  onConfigChange,
  onRegenerate,
  onExamDateChange,
  isPremium = true,
}: Props) {
  const [showConfig, setShowConfig] = useState(false)
  const [showInfo, setShowInfo] = useState(false)
  const [selectedStudyPlanIdx, setSelectedStudyPlanIdx] = useState<number | null>(null)
  const [planExpanded, setPlanExpanded] = useState(false)
  const [trackerConcept, setTrackerConcept] = useState<{
    name: string; state: MasteryState; index: number
  } | null>(null)
  const [localCompletedToday, setLocalCompletedToday] = useState<DailyLevelUp[]>([])
  const [showCeremony, setShowCeremony] = useState(false)
  const [ceremonyGems, setCeremonyGems] = useState(0)
  const prevAllOnTarget = useRef(false)

  // Load today's level-ups (this device) and keep in sync with quiz completions
  useEffect(() => {
    setLocalCompletedToday(readTodayLevelUps())
    function handleLevelUp(e: Event) {
      setLocalCompletedToday((e as CustomEvent<DailyLevelUp[]>).detail)
    }
    const levelUpKey = 'actuarial_daily_levelups_' + new Date().toISOString().slice(0, 10)
    function handleStorage(e: StorageEvent) {
      if (e.key === levelUpKey) setLocalCompletedToday(readTodayLevelUps())
    }
    window.addEventListener(LEVELUP_EVENT, handleLevelUp)
    window.addEventListener('storage', handleStorage)
    return () => {
      window.removeEventListener(LEVELUP_EVENT, handleLevelUp)
      window.removeEventListener('storage', handleStorage)
    }
  }, [])

  // Merge this device's level-ups with the cross-device signal from Supabase so
  // a quiz finished on another device still checks the item off here.
  const serverCompletedToday = useDailyCompletions(wikiExamIdToProgressKey(syllabus.examId))
  const completedToday = useMemo(() => {
    const merged: DailyLevelUp[] = []
    const seen = new Set<string>()
    for (const lu of [...localCompletedToday, ...serverCompletedToday]) {
      const key = `${lu.conceptSlug.toLowerCase()}::${lu.to}`
      if (seen.has(key)) continue
      seen.add(key)
      merged.push(lu)
    }
    return merged
  }, [localCompletedToday, serverCompletedToday, syllabus.examId])

  const todaysConcepts = plan?.todaysConcepts ?? []
  const reviewConcepts = plan?.reviewConcepts ?? []
  const displayConcepts = plan?.status === 'review_mode' ? reviewConcepts : todaysConcepts

  // Build a per-concept target map from today's scheduled assignments.
  // Use the current mastery state (not the cached initialState) so the target
  // stays accurate after same-day quiz progress or decay changes.
  // Keep the highest target if a concept somehow has multiple assignments today.
  const targetByName = new Map<string, MasteryState>()
  if (plan) {
    const today = todayISO()
    for (const a of plan.assignments) {
      if (a.scheduledDate === today) {
        const currentState = masteryStateByName.get(a.conceptName.toLowerCase()) ?? a.initialState
        const target: MasteryState = currentState === 'level3' ? 'level3' : (NEXT_STATE[currentState] ?? 'level1')
        const existing = targetByName.get(a.conceptName.toLowerCase())
        if (!existing || STATE_ORDER[target] > STATE_ORDER[existing]) {
          targetByName.set(a.conceptName.toLowerCase(), target)
        }
      }
    }
  }

  // A concept is "on target" for today when it has reached or exceeded its target state,
  // OR when it was advanced at all today. The latter handles the case where reconfiguring
  // the plan regenerates assignments using current mastery, raising the target bar above
  // what the user already achieved in the same day.
  const onTargetCount = displayConcepts.filter(n => {
    const target = targetByName.get(n.toLowerCase()) ?? 'level1'
    const current = masteryStateByName.get(n.toLowerCase()) ?? 'new'
    const advancedToday = completedToday.some(
      lu => lu.conceptSlug.toLowerCase() === n.toLowerCase()
    )
    return STATE_ORDER[current] >= STATE_ORDER[target] || advancedToday
  }).length
  const allOnTarget = displayConcepts.length > 0 && onTargetCount === displayConcepts.length

  const studyPlanConceptsForModal = displayConcepts.map(name => ({
    name,
    state: masteryStateByName.get(name.toLowerCase()) ?? 'new' as MasteryState,
  }))

  const allSyllabusConceptsForModal = useMemo(() =>
    syllabus.topics.flatMap(t =>
      t.concepts.map(c => ({
        name: c.name,
        state: masteryStateByName.get(c.name.toLowerCase()) ?? 'new' as MasteryState,
      }))
    ),
    [syllabus, masteryStateByName]
  )


  // Fire the completion ceremony the first time all today's concepts are on-target.
  // Must come after allOnTarget is computed but before any early returns.
  useEffect(() => {
    if (loading) return
    const alreadyShown = localStorage.getItem(`actuarial_ceremony_shown_${todayISO()}`) === '1'
    if (allOnTarget && !prevAllOnTarget.current && !alreadyShown && completedToday.length > 0) {
      try { localStorage.setItem(`actuarial_ceremony_shown_${todayISO()}`, '1') } catch { /* ignore */ }
      setCeremonyGems(getDailyGems())
      setShowCeremony(true)
    }
    prevAllOnTarget.current = allOnTarget
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [allOnTarget, loading])

  // Locked state — free users see a preview of the card with an upgrade CTA.
  if (!isPremium) {
    const previewConcepts = displayConcepts.length > 0
      ? displayConcepts.slice(0, 3)
      : syllabus.topics[0]?.concepts.slice(0, 3).map(c => c.name) ?? []
    return (
      <Card className="border-primary/30 ring-1 ring-primary/10 shadow-sm relative overflow-hidden">
        <CardContent className="p-5 space-y-3" aria-hidden="true">
          <div className="flex items-start justify-between gap-2">
            <h2 className="text-xl font-semibold">Study Plan</h2>
            <Settings2 className="h-4 w-4 text-muted-foreground" />
          </div>
          <p className="text-base font-semibold">{todayLongDate()}</p>
          <h2 className="text-lg font-semibold">Today's concepts</h2>
          <ul className="space-y-0.5">
            {previewConcepts.map((name, i) => (
              <li key={i} className="flex items-center gap-2.5 px-2 py-1.5">
                <Circle className="h-4 w-4 text-muted-foreground shrink-0" />
                <span className="text-sm flex-1 min-w-0 truncate">{name}</span>
                <span className="text-xs text-muted-foreground shrink-0">→ Level 1</span>
              </li>
            ))}
          </ul>
        </CardContent>
        {/* Lock overlay */}
        <div className="absolute inset-0 backdrop-blur-sm bg-background/70 flex flex-col items-center justify-center gap-3 p-5 text-center">
          <div className="flex items-center justify-center h-10 w-10 rounded-full bg-primary/10 text-primary">
            <Lock className="h-5 w-5" />
          </div>
          <div className="space-y-1">
            <div className="flex items-center gap-1.5">
              <h3 className="text-base font-semibold">Custom Study Plan</h3>
              <button
                type="button"
                onClick={() => setShowInfo(true)}
                className="flex items-center justify-center h-6 w-6 rounded-full bg-primary/10 text-primary ring-1 ring-primary/20 hover:bg-primary/20 transition-colors shrink-0"
                aria-label="How custom study plans work"
                title="How custom study plans work"
              >
                <Info className="h-3.5 w-3.5" />
              </button>
            </div>
            <p className="text-sm text-muted-foreground max-w-xs">
              A daily plan tailored to you
            </p>
          </div>
          <Link to="/upgrade" className={buttonVariants({ size: 'sm' }) + ' gap-1.5'}>
            Upgrade
          </Link>
        </div>
      </Card>
    )
  }

  // Unconfigured state — prompt to set up
  if (!loading && !plan?.config.targetReadyDate) {
    return (
      <>
        <Card className="border-dashed">
          <CardContent className="p-5 space-y-3">
            <h2 className="text-xl font-semibold">Study Plan</h2>
            <div className="flex items-start justify-between gap-2">
              <div>
                <p className="text-base font-semibold">{todayLongDate()}</p>
                <p className="text-sm font-semibold mt-1">Set up your study plan</p>
              </div>
            </div>
            <p className="text-sm text-muted-foreground leading-relaxed">
              Add a target ready date and we'll automatically build a daily study schedule, dividing remaining concepts across your available days.
            </p>
            <Button size="sm" onClick={() => setShowConfig(true)} className="gap-1.5">
              <Settings2 className="h-3.5 w-3.5" />
              Configure study plan
            </Button>
            <div className="border-t pt-2">
              {planExpanded && (
                <div className="pb-2 pt-1">
                  <StudyPlanTracker
                    syllabus={syllabus}
                    masteryRecords={masteryRecords}
                    studyPlan={null}
                    onConceptSelect={setTrackerConcept}
                  />
                </div>
              )}
              <button
                type="button"
                onClick={() => setPlanExpanded(v => !v)}
                className="w-full flex items-center justify-center gap-1 text-xs text-muted-foreground hover:text-foreground transition-colors py-1.5"
              >
                <ChevronDown className={`h-3.5 w-3.5 transition-transform ${planExpanded ? 'rotate-180' : ''}`} />
                {planExpanded ? 'Hide study plan' : 'Show study plan'}
              </button>
            </div>
          </CardContent>
        </Card>

        {trackerConcept && (
          <ConceptDetailModal
            conceptName={trackerConcept.name}
            masteryState={trackerConcept.state}
            onClose={() => setTrackerConcept(null)}
            syllabus={syllabus}
            allConcepts={allSyllabusConceptsForModal}
            initialConceptIndex={trackerConcept.index}
            quizFrom="dashboard"
          />
        )}

        {showConfig && (
          <StudyPlanConfigModal
            config={config}
            examDate={examDate}
            examLabel={syllabus.examLabel}
            examId={wikiExamIdToProgressKey(syllabus.examId)}
            onSave={onConfigChange}
            onExamDateChange={onExamDateChange}
            onClose={() => setShowConfig(false)}
          />
        )}
        <StudyPlanInfoPanel open={showInfo} onClose={() => setShowInfo(false)} />
      </>
    )
  }

  const showConcepts = !loading && plan && displayConcepts.length > 0 && plan.status !== 'review_mode'

  return (
    <>
      <Card className="border-primary/30 ring-1 ring-primary/10 shadow-sm">
        <CardContent className="p-5 space-y-3">
          {/* Title + settings */}
          <div className="flex items-start justify-between gap-2">
            <h2 className="text-xl font-semibold">Study Plan</h2>
            <div className="flex items-center gap-0.5 shrink-0">
              <button
                type="button"
                onClick={() => setShowInfo(true)}
                className="text-muted-foreground hover:text-foreground transition-colors p-1.5"
                aria-label="How custom study plans work"
                title="How custom study plans work"
              >
                <Info className="h-5 w-5" />
              </button>
              <button
                type="button"
                onClick={() => setShowConfig(true)}
                className="text-muted-foreground hover:text-foreground transition-colors p-1"
                aria-label="Study plan settings"
                title="Study plan settings"
              >
                <Settings2 className="h-4 w-4" />
              </button>
            </div>
          </div>
          {/* Date header */}
          <p className="text-base font-semibold">{todayLongDate()}</p>

          {/* Heading */}
          {showConcepts ? (
            <h2 className="text-lg font-semibold">
              {allOnTarget ? 'Done for today ✓' : "Today's concepts"}
            </h2>
          ) : (
            <h2 className="text-lg font-semibold">
              {loading
                ? 'Preparing your plan…'
                : plan?.status === 'review_mode'
                ? 'Review day'
                : "You're all caught up!"}
            </h2>
          )}

          {/* Concept checklist */}
          {showConcepts && (
            <ul className="space-y-0.5">
              {displayConcepts.map((name, idx) => {
                const target = targetByName.get(name.toLowerCase()) ?? 'level1'
                const currentState = masteryStateByName.get(name.toLowerCase()) ?? 'new'
                const isCompleted =
                  completedToday.some(lu => lu.conceptSlug.toLowerCase() === name.toLowerCase()) ||
                  STATE_ORDER[currentState] >= STATE_ORDER[target]
                return (
                  <li key={name}>
                    <button
                      type="button"
                      onClick={() => setSelectedStudyPlanIdx(idx)}
                      className="w-full flex items-center gap-2.5 px-2 py-1.5 rounded-lg hover:bg-muted/50 text-left transition-colors"
                    >
                      {isCompleted
                        ? <Check className="h-4 w-4 text-green-500 shrink-0" />
                        : <Circle className="h-4 w-4 text-muted-foreground shrink-0" />}
                      <span className={`text-sm flex-1 min-w-0 truncate ${isCompleted ? 'text-muted-foreground line-through' : ''}`}>
                        {name}
                      </span>
                      <span className="text-xs text-muted-foreground shrink-0">→ {STATE_LABEL[target]}</span>
                    </button>
                  </li>
                )
              })}
            </ul>
          )}

          {loading && (
            <div className="flex items-center gap-2 text-sm text-muted-foreground py-1">
              <Loader2 className="h-4 w-4 animate-spin" />
              Building your plan…
            </div>
          )}

          {/* Warnings / info panels */}
          {!loading && plan && (plan.status === 'behind' || plan.status === 'target_passed') && (
            <BehindWarning plan={plan} />
          )}
          {!loading && plan?.status === 'review_mode' && (
            <ReviewModeNote concepts={reviewConcepts} />
          )}

          {!loading && plan && displayConcepts.length === 0 && plan.status !== 'review_mode' && (
            <div className="text-sm text-muted-foreground text-center py-2">
              {plan.config.targetReadyDate
                ? 'No new concepts scheduled today. Great job keeping up!'
                : 'Configure a target ready date to get a daily plan.'}
            </div>
          )}

          {/* Completed Today — only show level-ups for concepts in today's plan */}
          {completedToday.filter(lu =>
            displayConcepts.some(n => n.toLowerCase() === lu.conceptSlug.toLowerCase())
          ).length > 0 && (
            <div className="rounded-md border border-green-200 bg-green-50 dark:border-green-800 dark:bg-green-950/20 px-3 py-2.5 space-y-1.5">
              <div className="flex items-center gap-1.5 text-xs font-medium text-green-700 dark:text-green-400">
                <TrendingUp className="h-3.5 w-3.5 shrink-0" />
                Completed today
              </div>
              <ul className="space-y-0.5">
                {completedToday
                  .filter(lu =>
                    displayConcepts.some(n => n.toLowerCase() === lu.conceptSlug.toLowerCase())
                  )
                  .map((lu, i) => (
                    <li key={i} className="flex items-center gap-1.5 text-xs text-green-700 dark:text-green-400">
                      <span className="font-medium">{lu.conceptSlug}</span>
                      <span className="text-green-500/70">→</span>
                      <span>{STATE_LABEL[lu.to]}</span>
                    </li>
                  ))}
              </ul>
            </div>
          )}

          {/* Collapsible study plan */}
          {!loading && plan && (
            <div className="border-t pt-2">
              {planExpanded && (
                <div className="pb-2 pt-1">
                  <StudyPlanTracker
                    syllabus={syllabus}
                    masteryRecords={masteryRecords}
                    studyPlan={plan}
                    onConceptSelect={setTrackerConcept}
                  />
                </div>
              )}
              <button
                type="button"
                onClick={() => setPlanExpanded(v => !v)}
                className="w-full flex items-center justify-center gap-1 text-xs text-muted-foreground hover:text-foreground transition-colors py-1.5"
              >
                <ChevronDown
                  className={`h-3.5 w-3.5 transition-transform ${planExpanded ? 'rotate-180' : ''}`}
                />
                {planExpanded ? 'Hide study plan' : 'Show study plan'}
              </button>
            </div>
          )}
        </CardContent>
      </Card>

      {selectedStudyPlanIdx !== null && studyPlanConceptsForModal.length > 0 && (
        <ConceptDetailModal
          conceptName={studyPlanConceptsForModal[selectedStudyPlanIdx].name}
          masteryState={studyPlanConceptsForModal[selectedStudyPlanIdx].state}
          onClose={() => setSelectedStudyPlanIdx(null)}
          syllabus={syllabus}
          allConcepts={allSyllabusConceptsForModal}
          studyPlanConcepts={studyPlanConceptsForModal}
          initialConceptIndex={selectedStudyPlanIdx}
          initialFilter="study-plan"
          quizFrom="dashboard"
        />
      )}

      {trackerConcept && (
        <ConceptDetailModal
          conceptName={trackerConcept.name}
          masteryState={trackerConcept.state}
          onClose={() => setTrackerConcept(null)}
          syllabus={syllabus}
          allConcepts={allSyllabusConceptsForModal}
          initialConceptIndex={trackerConcept.index}
          quizFrom="dashboard"
        />
      )}

      {showConfig && (
        <StudyPlanConfigModal
          config={config}
          examDate={examDate}
          examLabel={syllabus.examLabel}
          examId={wikiExamIdToProgressKey(syllabus.examId)}
          onSave={next => {
            onConfigChange(next)
            onRegenerate()
          }}
          onExamDateChange={onExamDateChange}
          onClose={() => setShowConfig(false)}
        />
      )}
      <StudyPlanInfoPanel open={showInfo} onClose={() => setShowInfo(false)} />

      {showCeremony && (
        <StudyPlanCompletionCeremony
          concepts={displayConcepts.map(name => ({
            name,
            target: targetByName.get(name.toLowerCase()) ?? 'level1',
          }))}
          gemsEarnedToday={ceremonyGems}
          onClose={() => setShowCeremony(false)}
        />
      )}
    </>
  )
}

// ── Loading placeholder ───────────────────────────────────────────────────────

export function TodayCardLoading() {
  return (
    <Card>
      <CardContent className="p-5 space-y-3">
        <div className="h-5 w-40 rounded bg-muted animate-pulse" />
        <div className="h-6 w-48 rounded bg-muted animate-pulse" />
        <div className="h-9 w-full rounded bg-muted animate-pulse" />
      </CardContent>
    </Card>
  )
}
