// "Today" card — first card on the Dashboard. Shows today's study focus,
// a "Read Today's Concepts" action (opens concept modal), and a "Start Quiz"
// action (navigates to a quiz pre-filtered to today's concepts).

import { useState, useCallback } from 'react'
import { useNavigate } from 'react-router-dom'
import {
  BookOpen,
  Play,
  Settings2,
  AlertTriangle,
  CheckCircle2,
  Loader2,
} from 'lucide-react'
import { Card, CardContent } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { ConceptDetailModal } from '@/components/ConceptDetailModal'
import { StudyPlanConfigModal } from '@/components/StudyPlanConfigModal'
import { fetchAllQuestions } from '@/lib/github'
import { parseAllQuestions } from '@/lib/parser'
import { hrefToEntryRef } from '@/lib/wikiRoutes'
import {
  formatReadableDate,
  type StudyPlan,
  type StudyPlanConfig,
} from '@/lib/studyPlan'
import type { WikiExamSyllabus } from '@/lib/wikiParser'
import type { MasteryState } from '@/lib/mastery'

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

// ── Main component ────────────────────────────────────────────────────────────

interface Props {
  plan: StudyPlan | null
  config: StudyPlanConfig
  loading: boolean
  syllabus: WikiExamSyllabus
  masteryStateByName: Map<string, MasteryState>
  examDate: string | null
  onConfigChange: (next: Partial<StudyPlanConfig>) => void
  onRegenerate: () => void
}

export function TodayCard({
  plan,
  config,
  loading,
  syllabus,
  masteryStateByName,
  examDate,
  onConfigChange,
  onRegenerate,
}: Props) {
  const navigate = useNavigate()
  const [showConfig, setShowConfig] = useState(false)
  const [conceptModalOpen, setConceptModalOpen] = useState(false)
  const [quizLoading, setQuizLoading] = useState(false)

  const todaysConcepts = plan?.todaysConcepts ?? []
  const reviewConcepts = plan?.reviewConcepts ?? []
  const displayConcepts = plan?.status === 'review_mode' ? reviewConcepts : todaysConcepts

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
      let filtered = all.filter(q =>
        q.wiki_link.some(link => {
          const ref = hrefToEntryRef(link)
          const name = ref?.name ?? link.split('/').filter(Boolean).pop() ?? ''
          return todaySet.has(name.replace(/-/g, ' ').toLowerCase())
        })
      )

      filtered.sort((a, b) => {
        const diffOrder: Record<string, number> = { hard: 0, medium: 1, easy: 2 }
        return (diffOrder[a.difficulty] ?? 1) - (diffOrder[b.difficulty] ?? 1)
      })

      if (filtered.length === 0) {
        navigate(`/?topic=${encodeURIComponent(syllabus.examTopic)}`)
        return
      }

      const cap = Math.min(filtered.length, 20)
      const ids = filtered.slice(0, cap).map(q => q.id).join(',')
      navigate(`/quiz?ids=${ids}`)
    } catch {
      navigate(`/?topic=${encodeURIComponent(syllabus.examTopic)}`)
    } finally {
      setQuizLoading(false)
    }
  }, [displayConcepts, navigate, syllabus.examTopic])

  // Unconfigured state — prompt to set up
  if (!loading && !plan?.config.targetReadyDate) {
    return (
      <>
        <Card className="border-dashed">
          <CardContent className="p-5 space-y-3">
            <div className="flex items-start justify-between gap-2">
              <div>
                <p className="text-base font-semibold">{todayLongDate()}</p>
                <h2 className="text-lg font-semibold mt-1">Set up your study plan</h2>
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
          </CardContent>
        </Card>

        {showConfig && (
          <StudyPlanConfigModal
            config={config}
            examDate={examDate}
            examLabel={syllabus.examLabel}
            onSave={onConfigChange}
            onClose={() => setShowConfig(false)}
          />
        )}
      </>
    )
  }

  return (
    <>
      <Card className="border-primary/30 ring-1 ring-primary/10 shadow-sm">
        <CardContent className="p-5 space-y-3">
          {/* Date header — visually prominent */}
          <div className="flex items-start justify-between gap-2">
            <div>
              <p className="text-base font-semibold">{todayLongDate()}</p>
              {!loading && plan && plan.status !== 'review_mode' && plan.daysRemaining > 0 && (
                <p className="text-xs text-muted-foreground mt-0.5">
                  Day {plan.dayNumber} of {plan.totalDays}
                  {' · '}
                  {plan.daysRemaining} day{plan.daysRemaining === 1 ? '' : 's'} until{' '}
                  {formatReadableDate(plan.effectiveReadyDate)}
                </p>
              )}
            </div>
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

          {/* Heading + concept chips */}
          <div>
            <h2 className="text-lg font-semibold">
              {loading
                ? 'Preparing your plan…'
                : plan?.status === 'review_mode'
                ? 'Review day'
                : displayConcepts.length === 0
                ? "You're all caught up!"
                : `${displayConcepts.length} concept${displayConcepts.length === 1 ? '' : 's'} to study`}
            </h2>
            {!loading && displayConcepts.length > 0 && plan?.status !== 'review_mode' && (
              <div className="flex flex-wrap gap-1.5 mt-1.5">
                {displayConcepts.map(name => {
                  const state = masteryStateByName.get(name.toLowerCase()) ?? 'new'
                  const stateColor =
                    state === 'strong'    ? 'border-green-200 bg-green-50 text-green-700 dark:border-green-800 dark:bg-green-950/30 dark:text-green-300' :
                    state === 'learning'  ? 'border-amber-200 bg-amber-50 text-amber-700 dark:border-amber-800 dark:bg-amber-950/30 dark:text-amber-300' :
                    state === 'forgotten' ? 'border-red-200 bg-red-50 text-red-700 dark:border-red-800 dark:bg-red-950/30 dark:text-red-300' :
                                           'border-border bg-muted/40 text-muted-foreground'
                  return (
                    <span
                      key={name}
                      className={`inline-block text-xs px-2 py-0.5 rounded-full border ${stateColor}`}
                    >
                      {name}
                    </span>
                  )
                })}
              </div>
            )}
          </div>

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

      {showConfig && (
        <StudyPlanConfigModal
          config={config}
          examDate={examDate}
          examLabel={syllabus.examLabel}
          onSave={next => {
            onConfigChange(next)
            onRegenerate()
          }}
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
