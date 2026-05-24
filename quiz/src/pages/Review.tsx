import { useEffect, useMemo, useState } from 'react'
import { useNavigate, useSearchParams } from 'react-router-dom'
import { Check, Circle, Gem, Loader2, X } from 'lucide-react'
import { useQuizStore, readLastSession } from '@/stores/quizStore'
import type { CompletedSession, MasteryTransition } from '@/stores/quizStore'
import { useAuth } from '@/hooks/useAuth'
import { loadCachedStudyPlan } from '@/lib/studyPlan'
import { QuestionCard } from '@/components/QuestionCard'
import { ConceptCoverageSection } from '@/components/ConceptCoverageSection'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card'
import { Separator } from '@/components/ui/separator'

const EXAM_LABEL_TO_ID: Record<string, string> = {
  'Probability': 'P',
  'Financial Mathematics': 'FM',
}

// Sequentially animate per-question check/cross marks. Pips are rendered with
// opacity:0 and the .score-pip-in keyframe class is added on a stagger so each
// mark pops in 120ms after the previous one.
function ScoreReveal({ outcomes }: { outcomes: boolean[] }) {
  const [visibleCount, setVisibleCount] = useState(0)

  useEffect(() => {
    setVisibleCount(0)
    if (outcomes.length === 0) return
    const timers: ReturnType<typeof setTimeout>[] = []
    for (let i = 0; i < outcomes.length; i++) {
      timers.push(setTimeout(() => setVisibleCount(c => Math.max(c, i + 1)), 120 * i))
    }
    return () => timers.forEach(clearTimeout)
  }, [outcomes])

  if (outcomes.length === 0) return null

  return (
    <div className="flex flex-wrap gap-1.5">
      {outcomes.map((isCorrect, i) => {
        const visible = i < visibleCount
        return (
          <span
            key={i}
            aria-label={isCorrect ? 'Correct' : 'Incorrect'}
            className={
              'inline-flex items-center justify-center h-7 w-7 rounded-md border ' +
              (visible ? 'score-pip-in ' : 'opacity-0 ') +
              (isCorrect
                ? 'bg-green-100 text-green-700 border-green-300 dark:bg-green-950 dark:text-green-300 dark:border-green-800'
                : 'bg-red-100 text-red-700 border-red-300 dark:bg-red-950 dark:text-red-300 dark:border-red-800')
            }
          >
            {isCorrect ? <Check className="h-4 w-4" /> : <X className="h-4 w-4" />}
          </span>
        )
      })}
    </div>
  )
}

function formatTime(seconds: number | null): string {
  if (seconds === null || seconds < 0) return '—'
  const m = Math.floor(seconds / 60)
  const s = seconds % 60
  return m > 0 ? `${m}m ${s}s` : `${s}s`
}

function MasteryLevelUpBadge({ transition, index }: { transition: MasteryTransition; index: number }) {
  const isLevel3 = transition.to === 'level3'
  const isLevel2 = transition.to === 'level2'
  const label =
    transition.to === 'level3' ? `${transition.conceptSlug} → Level 3` :
    transition.to === 'level2' ? `${transition.conceptSlug} → Level 2` :
    `${transition.conceptSlug} → Level 1`

  const badgeClasses = isLevel3
    ? 'bg-amber-100 text-amber-900 border-amber-400 dark:bg-amber-900/40 dark:text-amber-200 dark:border-amber-500 level3-shimmer'
    : isLevel2
    ? 'bg-green-100 text-green-800 border-green-400 dark:bg-green-900/50 dark:text-green-200 dark:border-green-600'
    : 'bg-green-500/20 text-green-800 border-green-300/60 dark:bg-green-500/20 dark:text-green-300 dark:border-green-800/60'

  return (
    <span
      className={`mastery-level-up inline-flex items-center px-4 py-2 rounded-2xl border text-sm font-bold ${badgeClasses}`}
      style={{ animationDelay: `${index * 80}ms` }}
    >
      {label}
    </span>
  )
}

// ─── Study Plan Checklist ─────────────────────────────────────────────────────

interface StudyPlanChecklistProps {
  todaysConcepts: string[]
  completedSlugs: Set<string>
}

function StudyPlanChecklist({ todaysConcepts, completedSlugs }: StudyPlanChecklistProps) {
  if (todaysConcepts.length === 0) return null

  const STATE_LABELS: Record<string, string> = {
    new: 'Level 1', forgotten: 'Level 1',
    level1: 'Level 2', level2: 'Level 3',
  }

  return (
    <div className="mt-4 pt-4 border-t space-y-2">
      <p className="text-xs font-semibold text-muted-foreground uppercase tracking-wide">
        Today's Study Plan
      </p>
      <ul className="space-y-1">
        {todaysConcepts.map((name, idx) => {
          const done = completedSlugs.has(name.toLowerCase())
          return (
            <li
              key={name}
              className="flex items-center gap-2.5 px-1 py-1"
            >
              {done ? (
                <span
                  className="study-plan-check-in shrink-0"
                  style={{ animationDelay: `${idx * 120}ms` }}
                >
                  <Check className="h-4 w-4 text-green-500" />
                </span>
              ) : (
                <Circle className="h-4 w-4 text-muted-foreground shrink-0" />
              )}
              <span className={`text-sm flex-1 min-w-0 truncate ${done ? 'line-through text-muted-foreground' : ''}`}>
                {name}
              </span>
              <span className="text-xs text-muted-foreground shrink-0">
                → {STATE_LABELS['new']}
              </span>
            </li>
          )
        })}
      </ul>
    </div>
  )
}

export default function Review() {
  const navigate = useNavigate()
  const [searchParams] = useSearchParams()
  const { user } = useAuth()
  const { resetQuiz } = useQuizStore()
  const [session, setSession] = useState<CompletedSession | null>(null)

  useEffect(() => {
    // completeQuiz always writes the session to localStorage before navigation,
    // so this is the single source of truth — including timeTakenSeconds.
    const last = readLastSession()
    if (last) {
      setSession(last)
    } else {
      console.warn('Review: no completed session in localStorage; redirecting to /')
      navigate('/', { replace: true })
    }
  // Only run on mount
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])


  // Load today's study plan from localStorage cache to show checklist
  const studyPlan = useMemo(() => {
    if (!session) return null
    const examId = EXAM_LABEL_TO_ID[session.questions[0]?.exam ?? ''] ?? null
    return examId ? loadCachedStudyPlan(examId) : null
  }, [session])

  // Build set of completed concept slugs from this quiz's mastery transitions
  const completedSlugs = useMemo(() => {
    const slugs = new Set<string>()
    for (const t of session?.masteryTransitions ?? []) {
      if (t.to === 'level1' || t.to === 'level2' || t.to === 'level3') {
        slugs.add(t.conceptSlug.toLowerCase())
      }
    }
    return slugs
  }, [session])

  if (!session) {
    return (
      <div className="flex items-center justify-center min-h-[60vh]">
        <Loader2 className="h-8 w-8 animate-spin text-primary" />
      </div>
    )
  }

  const { correctCount, totalQuestions, timeTakenSeconds } = session
  const percentage = totalQuestions > 0 ? Math.round((correctCount / totalQuestions) * 100) : 0
  const outcomes = session.questions.map(q => session.responses[q.id]?.chosen === q.answer)

  function handleTryAgain() {
    resetQuiz()
    navigate(`/quiz?${searchParams.toString()}`)
  }

  function handleNewQuiz() {
    resetQuiz()
    navigate('/')
  }

  const upwardTransitions = session.masteryTransitions?.filter(
    t => t.to === 'level1' || t.to === 'level2' || t.to === 'level3'
  ) ?? []

  const todaysConcepts = studyPlan?.status === 'review_mode'
    ? studyPlan.reviewConcepts
    : studyPlan?.todaysConcepts ?? []

  return (
    <div className="container max-w-2xl mx-auto px-4 py-8 space-y-6">
      {/* Score card */}
      <Card>
        <CardHeader>
          <CardTitle className="text-2xl">
            {session.mode === 'mock-exam' ? 'Mock Exam Complete' : 'Quiz Complete'}
          </CardTitle>
          <CardDescription>Here are your results</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-5 mb-6">
            <ScoreReveal outcomes={outcomes} />
            <div className="flex flex-wrap gap-8">
              <div className="text-center">
                <div className="text-4xl font-bold text-primary">{percentage}%</div>
                <div className="text-sm text-muted-foreground mt-1">Score</div>
              </div>
              <div className="text-center">
                <div className="text-4xl font-bold">{correctCount}<span className="text-xl text-muted-foreground">/{totalQuestions}</span></div>
                <div className="text-sm text-muted-foreground mt-1">Correct</div>
              </div>
              <div className="text-center">
                <div className="text-4xl font-bold">{formatTime(timeTakenSeconds)}</div>
                <div className="text-sm text-muted-foreground mt-1">Time</div>
              </div>
              {user && correctCount > 0 && (
                <div className="text-center">
                  <div className="text-4xl font-bold inline-flex items-center gap-1 text-emerald-500">
                    +{correctCount}
                    <Gem className="h-7 w-7" />
                  </div>
                  <div className="text-sm text-muted-foreground mt-1">Gems earned</div>
                </div>
              )}
            </div>
          </div>

          {/* Soft sign-in prompt for unauthenticated users */}
          {!user && (
            <div className="rounded-lg border bg-muted/40 px-4 py-3 text-sm flex flex-col sm:flex-row sm:items-center gap-3 sm:justify-between">
              <span className="text-muted-foreground">Sign in to save your results and track progress</span>
              <Button
                size="sm"
                variant="outline"
                onClick={() => navigate('/auth', { state: { from: '/review' } })}
              >
                Sign In
              </Button>
            </div>
          )}
        </CardContent>
      </Card>

      {/* Mastery level-up badges + study plan checklist */}
      {user && (upwardTransitions.length > 0 || todaysConcepts.length > 0) && (
        <Card>
          <CardContent className="pt-5">
            {upwardTransitions.length > 0 && (
              <>
                <h2 className="text-sm font-semibold mb-4">Concepts Leveled Up</h2>
                <div className="flex flex-wrap gap-3">
                  {upwardTransitions.map((t, i) => (
                    <MasteryLevelUpBadge key={t.conceptSlug} transition={t} index={i} />
                  ))}
                </div>
              </>
            )}

            {todaysConcepts.length > 0 && (
              <StudyPlanChecklist
                todaysConcepts={todaysConcepts}
                completedSlugs={completedSlugs}
              />
            )}
          </CardContent>
        </Card>
      )}

      {/* Concept coverage section */}
      <ConceptCoverageSection
        questions={session.questions}
        responses={session.responses}
        isLoggedIn={!!user}
      />

      {/* Per-question review */}
      <div className="space-y-2">
        <h2 className="text-lg font-semibold">Question Review</h2>
        <Separator />
      </div>

      <div className="space-y-4">
        {session.questions.map((question, idx) => {
          const chosen = session.responses[question.id]?.chosen ?? null
          return (
            <div key={question.id} className="space-y-1">
              <p className="text-xs text-muted-foreground font-medium">Question {idx + 1}</p>
              <QuestionCard
                question={question}
                selectedAnswer={chosen}
                onAnswer={() => {/* read-only in review */}}
                showExplanation={true}
                showMeta={true}
                isLocked={true}
              />
            </div>
          )
        })}
      </div>

      {/* Actions */}
      <div className="flex flex-col sm:flex-row gap-3 pb-8">
        <Button variant="outline" onClick={handleTryAgain} className="flex-1">
          Try Again
        </Button>
        <Button onClick={handleNewQuiz} className="flex-1">
          New Quiz
        </Button>
      </div>
    </div>
  )
}
