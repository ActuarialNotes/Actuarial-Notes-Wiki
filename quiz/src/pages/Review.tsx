import { useEffect, useMemo, useRef, useState } from 'react'
import { useNavigate, useSearchParams } from 'react-router-dom'
import { Check, Circle, X } from 'lucide-react'
import { useQuizStore, readLastSession } from '@/stores/quizStore'
import type { CompletedSession, MasteryTransition } from '@/stores/quizStore'
import { useAuth } from '@/hooks/useAuth'
import { loadCachedStudyPlan } from '@/lib/studyPlan'
import { QuestionCard } from '@/components/QuestionCard'
import { ConceptCoverageSection } from '@/components/ConceptCoverageSection'
import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'
import { Separator } from '@/components/ui/separator'
import { Loader2 } from 'lucide-react'

const EXAM_LABEL_TO_ID: Record<string, string> = {
  'Probability': 'P',
  'Financial Mathematics': 'FM',
}

// ─── Level-up badges ──────────────────────────────────────────────────────────

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

function StudyPlanChecklist({ todaysConcepts, completedSlugs }: {
  todaysConcepts: string[]
  completedSlugs: Set<string>
}) {
  if (todaysConcepts.length === 0) return null

  return (
    <div className="mt-4 pt-4 border-t space-y-2">
      <p className="text-xs font-semibold text-muted-foreground uppercase tracking-wide">
        Today's Study Plan
      </p>
      <ul className="space-y-1">
        {todaysConcepts.map((name, idx) => {
          const done = completedSlugs.has(name.toLowerCase())
          return (
            <li key={name} className="flex items-center gap-2.5 px-1 py-1">
              {done ? (
                <span className="study-plan-check-in shrink-0" style={{ animationDelay: `${idx * 120}ms` }}>
                  <Check className="h-4 w-4 text-green-500" />
                </span>
              ) : (
                <Circle className="h-4 w-4 text-muted-foreground shrink-0" />
              )}
              <span className={`text-sm flex-1 min-w-0 truncate ${done ? 'line-through text-muted-foreground' : ''}`}>
                {name}
              </span>
            </li>
          )
        })}
      </ul>
    </div>
  )
}

// ─── Main page ────────────────────────────────────────────────────────────────

export default function Review() {
  const navigate = useNavigate()
  const [searchParams] = useSearchParams()
  const { user } = useAuth()
  const { resetQuiz } = useQuizStore()
  const [session, setSession] = useState<CompletedSession | null>(null)
  const [selectedQuestion, setSelectedQuestion] = useState<number | null>(null)
  const questionReviewRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const last = readLastSession()
    if (last) {
      setSession(last)
    } else {
      console.warn('Review: no completed session in localStorage; redirecting to /')
      navigate('/', { replace: true })
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  const studyPlan = useMemo(() => {
    if (!session) return null
    const examId = EXAM_LABEL_TO_ID[session.questions[0]?.exam ?? ''] ?? null
    return examId ? loadCachedStudyPlan(examId) : null
  }, [session])

  const completedSlugs = useMemo(() => {
    const slugs = new Set<string>()
    for (const t of session?.masteryTransitions ?? []) {
      if (t.to === 'level1' || t.to === 'level2' || t.to === 'level3') {
        slugs.add(t.conceptSlug.toLowerCase())
      }
    }
    return slugs
  }, [session])

  // When user clicks a radial segment, select it and scroll to the question review
  function handleQuestionSelect(idx: number | null) {
    setSelectedQuestion(idx)
    if (idx !== null) {
      // Small delay so React can render before scrolling
      setTimeout(() => {
        questionReviewRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' })
      }, 80)
    }
  }

  if (!session) {
    return (
      <div className="flex items-center justify-center min-h-[60vh]">
        <Loader2 className="h-8 w-8 animate-spin text-primary" />
      </div>
    )
  }

  const { correctCount, totalQuestions, timeTakenSeconds } = session
  const percentage = totalQuestions > 0 ? Math.round((correctCount / totalQuestions) * 100) : 0

  const upwardTransitions = session.masteryTransitions?.filter(
    t => t.to === 'level1' || t.to === 'level2' || t.to === 'level3'
  ) ?? []

  const todaysConcepts = studyPlan?.status === 'review_mode'
    ? studyPlan.reviewConcepts
    : studyPlan?.todaysConcepts ?? []

  // Which questions to show in the review list
  const visibleQuestions = selectedQuestion !== null
    ? session.questions.filter((_, i) => i === selectedQuestion)
    : session.questions

  return (
    <div className="container max-w-2xl mx-auto px-4 py-8 space-y-6">

      {/* ── First card: score header + concept coverage ──────────── */}
      <ConceptCoverageSection
        questions={session.questions}
        responses={session.responses}
        isLoggedIn={!!user}
        score={{
          mode: session.mode,
          percentage,
          correctCount,
          totalQuestions,
          timeTakenSeconds,
          gemsEarned: correctCount,
          isLoggedIn: !!user,
          onSignIn: () => navigate('/auth', { state: { from: '/review' } }),
        }}
        selectedQuestion={selectedQuestion}
        onQuestionSelect={handleQuestionSelect}
      />

      {/* ── Mastery level-up badges + study plan checklist ──────── */}
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

      {/* ── Question review ─────────────────────────────────────── */}
      <div ref={questionReviewRef} className="space-y-2 scroll-mt-6">
        <div className="flex items-center gap-3">
          <h2 className="text-lg font-semibold">Question Review</h2>
          {selectedQuestion !== null && (
            <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-primary text-primary-foreground text-xs font-semibold">
              Q{selectedQuestion + 1}
              <button
                type="button"
                onClick={() => setSelectedQuestion(null)}
                className="hover:opacity-70 transition-opacity"
                aria-label="Clear filter"
              >
                <X className="h-3 w-3" />
              </button>
            </span>
          )}
        </div>
        <Separator />
      </div>

      <div className="space-y-4">
        {visibleQuestions.map((question) => {
          const idx = session.questions.indexOf(question)
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

      {/* ── Actions ─────────────────────────────────────────────── */}
      <div className="flex flex-col sm:flex-row gap-3 pb-8">
        <Button variant="outline" onClick={() => { resetQuiz(); navigate(`/quiz?${searchParams.toString()}`) }} className="flex-1">
          Try Again
        </Button>
        <Button onClick={() => { resetQuiz(); navigate('/') }} className="flex-1">
          New Quiz
        </Button>
      </div>
    </div>
  )
}
