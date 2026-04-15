import { useEffect, useState } from 'react'
import { useNavigate, useSearchParams } from 'react-router-dom'
import { useQuizStore, readLastSession } from '@/stores/quizStore'
import type { CompletedSession } from '@/stores/quizStore'
import { useAuth } from '@/hooks/useAuth'
import { QuestionCard } from '@/components/QuestionCard'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card'
import { Separator } from '@/components/ui/separator'

function formatTime(seconds: number | null): string {
  if (seconds === null) return '—'
  const m = Math.floor(seconds / 60)
  const s = seconds % 60
  return m > 0 ? `${m}m ${s}s` : `${s}s`
}

export default function Review() {
  const navigate = useNavigate()
  const [searchParams] = useSearchParams()
  const { user } = useAuth()
  const { questions, responses, mode: storeMode, status, resetQuiz } = useQuizStore()
  const [session, setSession] = useState<CompletedSession | null>(null)

  useEffect(() => {
    if (status === 'complete') {
      // Build session from live store
      const correctCount = questions.filter(q => responses[q.id]?.chosen === q.answer).length
      setSession({
        questions,
        responses,
        mode: storeMode,
        correctCount,
        totalQuestions: questions.length,
        timeTakenSeconds: null,
        completedAt: new Date().toISOString(),
      })
    } else {
      // Fallback: try localStorage (handles hard refresh)
      const last = readLastSession()
      if (last) {
        setSession(last)
      } else {
        navigate('/', { replace: true })
      }
    }
  // Only run on mount
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  if (!session) return null

  const { correctCount, totalQuestions, timeTakenSeconds } = session
  const percentage = totalQuestions > 0 ? Math.round((correctCount / totalQuestions) * 100) : 0

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
          <div className="flex flex-wrap gap-8 mb-6">
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
