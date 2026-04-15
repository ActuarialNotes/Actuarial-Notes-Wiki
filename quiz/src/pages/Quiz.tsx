import { useEffect, useMemo } from 'react'
import { useSearchParams, useNavigate } from 'react-router-dom'
import { Loader2 } from 'lucide-react'
import { useQuestions } from '@/hooks/useQuestions'
import { useAuth } from '@/hooks/useAuth'
import { useQuizStore } from '@/stores/quizStore'
import { QuestionCard } from '@/components/QuestionCard'
import { ProgressBar } from '@/components/ProgressBar'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import type { QuestionFilter, Difficulty, QuizMode } from '@/lib/parser'

export default function Quiz() {
  const [searchParams] = useSearchParams()
  const navigate = useNavigate()
  const { user } = useAuth()

  const mode = (searchParams.get('mode') as QuizMode | null) ?? 'quiz'
  // reveal='during' shows explanation after each answer; 'end' defers to review
  const reveal = searchParams.get('reveal') ?? 'during'
  const countParam = searchParams.get('count')

  const filters: QuestionFilter = useMemo(() => {
    const subtopicsParam = searchParams.get('subtopics')
    return {
      topic: searchParams.get('topic') ?? undefined,
      subtopics: subtopicsParam ? subtopicsParam.split(',') : undefined,
      difficulty: (searchParams.get('difficulty') as Difficulty | null) ?? undefined,
      mode,
      count: countParam ? Number(countParam) : undefined,
    }
  }, [searchParams])  // eslint-disable-line react-hooks/exhaustive-deps

  const { questions, loading, error } = useQuestions(filters)

  const {
    questions: storeQuestions,
    currentIndex,
    responses,
    status,
    startQuiz,
    answerQuestion,
    nextQuestion,
    completeQuiz,
  } = useQuizStore()

  // Start the quiz once questions load — guard prevents re-triggering on re-renders
  useEffect(() => {
    if (!loading && questions.length > 0 && status === 'idle') {
      startQuiz(questions, mode)
    }
  }, [loading, questions, status, mode, startQuiz])

  const currentQuestion = storeQuestions[currentIndex]
  const selectedAnswer = currentQuestion ? (responses[currentQuestion.id]?.chosen ?? null) : null
  const isLastQuestion = currentIndex + 1 >= storeQuestions.length

  // Show explanation inline only in quiz mode when user chose to reveal during
  const showExplanation = status === 'reviewing' && mode === 'quiz' && reveal === 'during'
  // Show deferred message when answer is locked but explanation is withheld
  const showDeferredMessage = status === 'reviewing' && !showExplanation

  async function handleFinish() {
    await completeQuiz(user?.id ?? null)
    navigate('/review')
  }

  // ── Loading state ────────────────────────────────────────────────────
  if (loading || (status === 'idle' && !error)) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[60vh] gap-4">
        <Loader2 className="h-8 w-8 animate-spin text-primary" />
        <p className="text-muted-foreground">Loading questions…</p>
      </div>
    )
  }

  // ── Error state ──────────────────────────────────────────────────────
  if (error) {
    return (
      <div className="container max-w-md mx-auto px-4 py-12">
        <Card>
          <CardHeader>
            <CardTitle className="text-destructive">Failed to load questions</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <p className="text-sm text-muted-foreground">{error}</p>
            <Button onClick={() => window.location.reload()} variant="outline" className="w-full">
              Try again
            </Button>
          </CardContent>
        </Card>
      </div>
    )
  }

  // ── Empty state ──────────────────────────────────────────────────────
  if (!loading && questions.length === 0) {
    return (
      <div className="container max-w-md mx-auto px-4 py-12">
        <Card>
          <CardHeader>
            <CardTitle>No questions found</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <p className="text-sm text-muted-foreground">
              No questions match your selected filters. Try different topics or difficulty.
            </p>
            <Button onClick={() => navigate('/')} variant="outline" className="w-full">
              Back to Home
            </Button>
          </CardContent>
        </Card>
      </div>
    )
  }

  if (!currentQuestion) return null

  return (
    <div className="container max-w-2xl mx-auto px-4 py-8 space-y-6">
      <ProgressBar current={currentIndex + 1} total={storeQuestions.length} />

      <QuestionCard
        question={currentQuestion}
        selectedAnswer={selectedAnswer}
        onAnswer={key => answerQuestion(currentQuestion.id, key)}
        showExplanation={showExplanation}
      />

      {status === 'reviewing' && (
        <div className="flex justify-end items-center gap-4">
          {showDeferredMessage && (
            <p className="text-xs text-muted-foreground">
              {mode === 'mock-exam' ? 'Mock exam — explanations shown at end' : 'Explanations shown at end'}
            </p>
          )}
          {isLastQuestion ? (
            <Button onClick={handleFinish} size="lg">
              Finish {mode === 'mock-exam' ? 'Exam' : 'Quiz'}
            </Button>
          ) : (
            <Button onClick={nextQuestion} size="lg">
              Next Question →
            </Button>
          )}
        </div>
      )}
    </div>
  )
}
