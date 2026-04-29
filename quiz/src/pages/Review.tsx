import { useEffect, useState } from 'react'
import { useNavigate, useSearchParams } from 'react-router-dom'
import { Check, X } from 'lucide-react'
import { useQuizStore, readLastSession } from '@/stores/quizStore'
import type { CompletedSession } from '@/stores/quizStore'
import { useAuth } from '@/hooks/useAuth'
import { QuestionCard } from '@/components/QuestionCard'
import { TopicCoverageChart } from '@/components/TopicCoverageChart'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card'
import { Separator } from '@/components/ui/separator'

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

  if (!session) return null

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

      {/* Topic coverage bar graph */}
      <TopicCoverageChart questions={session.questions} responses={session.responses} />

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
