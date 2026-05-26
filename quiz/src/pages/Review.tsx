import { useEffect, useMemo, useRef, useState } from 'react'
import { useNavigate, useSearchParams } from 'react-router-dom'
import { Check, Circle, X } from 'lucide-react'
import { useQuizStore, readLastSession } from '@/stores/quizStore'
import type { CompletedSession, MasteryTransition } from '@/stores/quizStore'
import { useAuth } from '@/hooks/useAuth'
import { loadCachedStudyPlan, todayISO } from '@/lib/studyPlan'
import { QuestionCard } from '@/components/QuestionCard'
import { ConceptCoverageSection } from '@/components/ConceptCoverageSection'
import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'
import { Separator } from '@/components/ui/separator'
import { Loader2 } from 'lucide-react'
import type { MasteryState } from '@/lib/mastery'

const EXAM_LABEL_TO_ID: Record<string, string> = {
  'Probability': 'P',
  'Financial Mathematics': 'FM',
}

const STATE_LABEL: Record<MasteryState, string> = {
  new: 'New', level1: 'Level 1', level2: 'Level 2', level3: 'Level 3', forgotten: 'Forgotten',
}

const NEXT_STATE: Partial<Record<MasteryState, MasteryState>> = {
  new: 'level1', forgotten: 'level1',
  level1: 'level2', level2: 'level3',
}

// ─── Study Plan Checklist ─────────────────────────────────────────────────────

function StudyPlanChecklist({
  todaysConcepts,
  newlyCompletedSlugs,
  targetByName,
  bonusConcepts,
}: {
  todaysConcepts: string[]
  newlyCompletedSlugs: Set<string>
  targetByName: Map<string, MasteryState>
  bonusConcepts: MasteryTransition[]
}) {
  if (todaysConcepts.length === 0 && bonusConcepts.length === 0) return null

  // Precompute animation delays: only newly-completed items animate, staggered in order
  let animIdx = 0
  const items = todaysConcepts.map(name => {
    const done = newlyCompletedSlugs.has(name.toLowerCase())
    const delay = done ? animIdx++ * 120 : 0
    return { name, done, delay }
  })
  const bonusStartIdx = animIdx

  return (
    <div className="space-y-0.5">
      <p className="text-xs font-semibold text-muted-foreground uppercase tracking-wide mb-3">
        Today's Study Plan
      </p>
      <div className="space-y-0.5">
        {items.map(({ name, done, delay }) => {
          const target = targetByName.get(name.toLowerCase()) ?? 'level1'
          return (
            <div key={name} className="flex items-center gap-2.5 px-2 py-1.5 rounded-lg">
              {done ? (
                <span className="study-plan-check-in shrink-0" style={{ animationDelay: `${delay}ms` }}>
                  <Check className="h-4 w-4 text-green-500" />
                </span>
              ) : (
                <Circle className="h-4 w-4 text-muted-foreground shrink-0" />
              )}
              <span className={`text-sm flex-1 min-w-0 truncate ${done ? 'text-muted-foreground line-through' : ''}`}>
                {name}
              </span>
              <span className="text-xs text-muted-foreground shrink-0">→ {STATE_LABEL[target]}</span>
            </div>
          )
        })}

        {bonusConcepts.length > 0 && (
          <>
            <div className="flex items-center gap-2 pt-1">
              <div className="flex-1 border-t border-dashed border-muted-foreground/30" />
              <span className="text-xs text-muted-foreground shrink-0">Also completed today</span>
              <div className="flex-1 border-t border-dashed border-muted-foreground/30" />
            </div>
            {bonusConcepts.map((t, i) => (
              <div key={t.conceptSlug} className="flex items-center gap-2.5 px-2 py-1.5 rounded-lg">
                <span className="study-plan-check-in shrink-0" style={{ animationDelay: `${(bonusStartIdx + i) * 120}ms` }}>
                  <Check className="h-4 w-4 text-green-500" />
                </span>
                <span className="text-sm flex-1 min-w-0 truncate text-muted-foreground line-through">
                  {t.conceptSlug}
                </span>
                <span className="text-xs text-green-600 dark:text-green-400 shrink-0 font-medium">
                  → {STATE_LABEL[t.to]}
                </span>
              </div>
            ))}
          </>
        )}
      </div>
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

  const newlyCompletedSlugs = useMemo(() => {
    const slugs = new Set<string>()
    for (const t of session?.masteryTransitions ?? []) {
      if (t.to === 'level1' || t.to === 'level2' || t.to === 'level3') {
        slugs.add(t.conceptSlug.toLowerCase())
      }
    }
    return slugs
  }, [session])

  const targetByName = useMemo(() => {
    const map = new Map<string, MasteryState>()
    if (!studyPlan) return map
    const today = todayISO()
    for (const a of studyPlan.assignments) {
      if (a.scheduledDate === today) {
        const target: MasteryState = a.initialState === 'level3' ? 'level3' : (NEXT_STATE[a.initialState] ?? 'level1')
        map.set(a.conceptName.toLowerCase(), target)
      }
    }
    return map
  }, [studyPlan])

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

  const todaysConceptsLower = new Set(todaysConcepts.map(n => n.toLowerCase()))
  const bonusConcepts = upwardTransitions.filter(t => !todaysConceptsLower.has(t.conceptSlug.toLowerCase()))

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

      {/* ── Study plan checklist ─────────────────────────────────── */}
      {user && (todaysConcepts.length > 0 || bonusConcepts.length > 0) && (
        <Card>
          <CardContent className="pt-5">
            <StudyPlanChecklist
              todaysConcepts={todaysConcepts}
              newlyCompletedSlugs={newlyCompletedSlugs}
              targetByName={targetByName}
              bonusConcepts={bonusConcepts}
            />
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
