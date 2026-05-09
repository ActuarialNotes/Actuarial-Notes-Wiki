// "Today" card — first card on the Dashboard. Shows today's study focus,
// a "Read Today's Concepts" action (opens concept modal), and a "Start Quiz"
// action (navigates to a quiz pre-filtered to today's concepts).

import { useState, useCallback, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import {
  BookOpen,
  Play,
  Settings2,
  AlertTriangle,
  CheckCircle2,
  Check,
  Loader2,
  ChevronDown,
  TrendingUp,
} from 'lucide-react'
import { Card, CardContent } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { ConceptDetailModal } from '@/components/ConceptDetailModal'
import { StudyPlanConfigModal } from '@/components/StudyPlanConfigModal'
import { ConceptScheduleBadge } from '@/components/TopicProgressSection'
import { fetchAllQuestions } from '@/lib/github'
import { parseAllQuestions } from '@/lib/parser'
import { hrefToEntryRef } from '@/lib/wikiRoutes'
import {
  todayISO,
  type StudyPlan,
  type StudyPlanConfig,
} from '@/lib/studyPlan'
import type { WikiExamSyllabus } from '@/lib/wikiParser'
import { wikiExamIdToProgressKey } from '@/lib/wikiParser'
import {
  aggregateForTopic,
  decayIfStale,
  type ConceptMasteryRecord,
  type MasteryState,
} from '@/lib/mastery'
import { readTodayLevelUps, LEVELUP_EVENT, type DailyLevelUp } from '@/lib/dailyProgressStore'

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
  new:      'bg-gray-100 text-gray-600 border-gray-200 dark:bg-gray-900 dark:text-gray-400 dark:border-gray-700',
  level1:   'bg-green-50 text-green-600 border-green-200 dark:bg-green-950/20 dark:text-green-500 dark:border-green-900',
  level2:   'bg-green-100 text-green-700 border-green-200 dark:bg-green-950/40 dark:text-green-400 dark:border-green-800',
  level3:   'bg-green-200 text-green-800 border-green-300 dark:bg-green-950 dark:text-green-300 dark:border-green-700',
  forgotten: 'bg-red-100 text-red-700 border-red-200 dark:bg-red-950 dark:text-red-400 dark:border-red-800',
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
          ? 'Your target ready date has passed — pacing to exam date instead.'
          : `Behind pace — ${plan.conceptsPerDay} concept${plan.conceptsPerDay === 1 ? '' : 's'} per day needed to catch up.`}
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
        All concepts mastered — great work!
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
  const targetToDisplayName = new Map<string, string>()
  for (const topic of syllabus.topics) {
    for (const c of topic.concepts) {
      const tLow = c.target?.toLowerCase() ?? ''
      if (tLow && tLow !== c.name.toLowerCase()) targetToDisplayName.set(tLow, c.name)
    }
  }
  const normalizedMastery = examMastery.map(r => {
    const display = targetToDisplayName.get(r.concept_slug.toLowerCase())
    return display ? { ...r, concept_slug: display } : r
  })
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
    <div className="space-y-1">
      {syllabus.topics.map(topic => {
        const conceptSlugs = topic.concepts.map(c => c.name)
        const agg = aggregateForTopic(normalizedMastery, conceptSlugs, now)
        const isOpen = openTopics.has(topic.name)

        return (
          <div key={topic.name}>
            <button
              className="flex items-center gap-2 w-full py-2 text-left hover:bg-muted/40 rounded-md px-1 -mx-1 transition-colors"
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
                      <span className={`shrink-0 inline-flex items-center px-1.5 py-0.5 rounded border text-[10px] font-medium ${STATE_BADGE[state]}`}>
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
}: Props) {
  const navigate = useNavigate()
  const [showConfig, setShowConfig] = useState(false)
  const [conceptModalOpen, setConceptModalOpen] = useState(false)
  const [quizLoading, setQuizLoading] = useState(false)
  const [planExpanded, setPlanExpanded] = useState(false)
  const [trackerConcept, setTrackerConcept] = useState<{
    name: string; state: MasteryState; index: number
  } | null>(null)
  const [completedToday, setCompletedToday] = useState<DailyLevelUp[]>([])

  // Load today's level-ups and keep in sync with quiz completions
  useEffect(() => {
    setCompletedToday(readTodayLevelUps())
    function handleLevelUp(e: Event) {
      setCompletedToday((e as CustomEvent<DailyLevelUp[]>).detail)
    }
    function handleStorage() {
      setCompletedToday(readTodayLevelUps())
    }
    window.addEventListener(LEVELUP_EVENT, handleLevelUp)
    window.addEventListener('storage', handleStorage)
    return () => {
      window.removeEventListener(LEVELUP_EVENT, handleLevelUp)
      window.removeEventListener('storage', handleStorage)
    }
  }, [])

  const todaysConcepts = plan?.todaysConcepts ?? []
  const reviewConcepts = plan?.reviewConcepts ?? []
  const displayConcepts = plan?.status === 'review_mode' ? reviewConcepts : todaysConcepts

  // Build a per-concept target map from today's scheduled assignments.
  // Each concept's daily goal is one level above its state at scheduling time.
  // Keep the highest target if a concept somehow has multiple assignments today.
  const targetByName = new Map<string, MasteryState>()
  if (plan) {
    const today = todayISO()
    for (const a of plan.assignments) {
      if (a.scheduledDate === today) {
        const target = NEXT_STATE[a.initialState] ?? 'level1'
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

  // Derive a label for the counter ("Level 1", "Level 2", "Level 3", or "target" if mixed)
  const targetLevels = new Set(
    displayConcepts.map(n => targetByName.get(n.toLowerCase()) ?? 'level1')
  )
  const uniformTarget = targetLevels.size === 1 ? [...targetLevels][0] : null
  const targetLabel = uniformTarget ? STATE_LABEL[uniformTarget] : 'target'

  const allConceptsForModal = displayConcepts.map(name => ({
    name,
    state: masteryStateByName.get(name.toLowerCase()) ?? 'new' as MasteryState,
  }))

  const handleStartQuiz = useCallback(async () => {
    if (displayConcepts.length === 0) {
      navigate('/')
      return
    }
    setQuizLoading(true)
    try {
      const raw = await fetchAllQuestions()
      const all = parseAllQuestions(raw)

      const todaySet = new Set(displayConcepts.map(n => n.toLowerCase()))

      function linkToName(link: string): string {
        const ref = hrefToEntryRef(link)
        const r = ref?.name ?? link.split('/').filter(Boolean).pop() ?? ''
        return r.replace(/-/g, ' ').toLowerCase()
      }

      // Include a question only when it has ≥1 today-concept AND every
      // non-today concept is already at level1+ (not new/forgotten).
      const filtered = all.filter(q => {
        const names = q.wiki_link.map(linkToName)
        if (!names.some(n => todaySet.has(n))) return false
        return !names.some(n => {
          if (todaySet.has(n)) return false
          return STATE_ORDER[masteryStateByName.get(n) ?? 'new'] < 1
        })
      })

      if (filtered.length === 0) {
        navigate(`/?topic=${encodeURIComponent(syllabus.examTopic)}`)
        return
      }

      // Sort: forgotten concepts first (attempted/incorrect), then new, then
      // others (already in progress). Within each group: easy → medium → hard.
      const diffOrder: Record<string, number> = { easy: 0, medium: 1, hard: 2 }
      function conceptGroup(q: { wiki_link: string[] }): number {
        for (const link of q.wiki_link) {
          const n = linkToName(link)
          if (!todaySet.has(n)) continue
          const s = masteryStateByName.get(n) ?? 'new'
          if (s === 'forgotten') return 0
          if (s === 'new')       return 1
          return 2
        }
        return 2
      }
      filtered.sort((a, b) => {
        const gd = conceptGroup(a) - conceptGroup(b)
        return gd !== 0 ? gd : (diffOrder[a.difficulty] ?? 1) - (diffOrder[b.difficulty] ?? 1)
      })

      const remaining = displayConcepts.length - onTargetCount
      const cap = Math.min(filtered.length, Math.max(1, remaining))
      const ids = filtered.slice(0, cap).map(q => q.id).join(',')
      navigate(`/quiz?ids=${ids}`)
    } catch {
      navigate(`/?topic=${encodeURIComponent(syllabus.examTopic)}`)
    } finally {
      setQuizLoading(false)
    }
  }, [displayConcepts, navigate, syllabus.examTopic, masteryStateByName])

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
              Add a target ready date and we'll automatically build a daily study schedule
              — dividing remaining concepts across your available days.
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
            allConcepts={syllabus.topics.flatMap(t =>
              t.concepts.map(c => ({
                name: c.name,
                state: masteryStateByName.get(c.name.toLowerCase()) ?? 'new' as MasteryState,
              }))
            )}
            initialConceptIndex={trackerConcept.index}
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
            <button
              type="button"
              onClick={() => setShowConfig(true)}
              className="text-muted-foreground hover:text-foreground transition-colors p-1 shrink-0"
              aria-label="Study plan settings"
              title="Study plan settings"
            >
              <Settings2 className="h-4 w-4" />
            </button>
          </div>
          {/* Date header */}
          <p className="text-base font-semibold">{todayLongDate()}</p>

          {/* Heading + completion indicator + concept chips */}
          {showConcepts ? (
            <div>
              <div className="flex items-baseline justify-between gap-2">
                <h2 className="text-lg font-semibold">
                  {allOnTarget
                    ? 'Done for today ✓'
                    : `${displayConcepts.length} concept${displayConcepts.length === 1 ? '' : 's'} to study`}
                </h2>
                <span className={`text-xs font-medium shrink-0 tabular-nums ${
                  allOnTarget
                    ? 'text-green-600 dark:text-green-400'
                    : 'text-muted-foreground'
                }`}>
                  {onTargetCount} / {displayConcepts.length} {targetLabel}
                </span>
              </div>
              {!allOnTarget && (
                <p className="text-xs text-muted-foreground mt-0.5">
                  {onTargetCount > 0
                    ? `${displayConcepts.length - onTargetCount} remaining — bring each to ${targetLabel} to complete today's session`
                    : `Bring each to ${targetLabel} to complete today's session`}
                </p>
              )}
              <div className="flex flex-wrap gap-1.5 mt-1.5">
                {displayConcepts.map(name => {
                  const state = masteryStateByName.get(name.toLowerCase()) ?? 'new'
                  const stateColor =
                    state === 'level3'    ? 'border-green-300 bg-green-200 text-green-800 dark:border-green-700 dark:bg-green-950 dark:text-green-300' :
                    state === 'level2'    ? 'border-green-200 bg-green-100 text-green-700 dark:border-green-800 dark:bg-green-950/40 dark:text-green-400' :
                    state === 'level1'    ? 'border-green-200 bg-green-50 text-green-600 dark:border-green-900 dark:bg-green-950/20 dark:text-green-500' :
                    state === 'forgotten' ? 'border-red-200 bg-red-50 text-red-700 dark:border-red-800 dark:bg-red-950/30 dark:text-red-300' :
                                           'border-border bg-muted/40 text-muted-foreground'
                  const levelled = completedToday.some(
                    lu => lu.conceptSlug.toLowerCase() === name.toLowerCase()
                  )
                  return (
                    <span
                      key={name}
                      className={`inline-flex items-center gap-0.5 text-xs px-2 py-0.5 rounded-full border ${stateColor}`}
                    >
                      {levelled && <Check className="h-2.5 w-2.5 shrink-0" />}
                      {name}
                    </span>
                  )
                })}
              </div>
            </div>
          ) : (
            <h2 className="text-lg font-semibold">
              {loading
                ? 'Preparing your plan…'
                : plan?.status === 'review_mode'
                ? 'Review day'
                : "You're all caught up!"}
            </h2>
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

          {/* Action buttons */}
          {!loading && (
            <div className="grid grid-cols-2 gap-2 pt-1">
              <Button
                variant="outline"
                onClick={() => setConceptModalOpen(true)}
                disabled={displayConcepts.length === 0}
                className="gap-1.5 text-sm"
              >
                <BookOpen className="h-4 w-4" />
                Read concepts
              </Button>
              <Button
                onClick={handleStartQuiz}
                disabled={quizLoading}
                className="gap-1.5 text-sm"
              >
                {quizLoading ? (
                  <Loader2 className="h-4 w-4 animate-spin" />
                ) : (
                  <Play className="h-4 w-4" />
                )}
                Start Quiz
              </Button>
            </div>
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

      {conceptModalOpen && displayConcepts.length > 0 && (
        <ConceptDetailModal
          conceptName={displayConcepts[0]}
          masteryState={masteryStateByName.get(displayConcepts[0].toLowerCase()) ?? 'new'}
          onClose={() => setConceptModalOpen(false)}
          syllabus={syllabus}
          allConcepts={allConceptsForModal}
          initialConceptIndex={0}
        />
      )}

      {trackerConcept && (
        <ConceptDetailModal
          conceptName={trackerConcept.name}
          masteryState={trackerConcept.state}
          onClose={() => setTrackerConcept(null)}
          syllabus={syllabus}
          allConcepts={syllabus.topics.flatMap(t =>
            t.concepts.map(c => ({
              name: c.name,
              state: masteryStateByName.get(c.name.toLowerCase()) ?? 'new' as MasteryState,
            }))
          )}
          initialConceptIndex={trackerConcept.index}
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
