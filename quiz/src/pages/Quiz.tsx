import { useEffect, useMemo, useState } from 'react'
import { useSearchParams, useNavigate } from 'react-router-dom'
import { Loader2, X, ChevronLeft, Bookmark, BookmarkCheck } from 'lucide-react'
import { useQuestions } from '@/hooks/useQuestions'
import { useAuth } from '@/hooks/useAuth'
import { useQuizStore } from '@/stores/quizStore'
import { QuestionCard } from '@/components/QuestionCard'
import { ProgressBar } from '@/components/ProgressBar'
import { QuitQuizDialog } from '@/components/QuitQuizDialog'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import type { QuestionFilter, Difficulty, QuizMode } from '@/lib/parser'
import { setExamAccent } from '@/lib/examColors'

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
    const idsParam = searchParams.get('ids')
    const selection = searchParams.get('selection')

    let ids: string[] | undefined
    if (idsParam) {
      ids = idsParam.split(',').filter(Boolean)
    } else if (selection === 'stored') {
      try {
        const raw = sessionStorage.getItem('actuarial_selected_ids')
        if (raw) ids = JSON.parse(raw) as string[]
      } catch { /* ignore */ }
    }

    return {
      topic: searchParams.get('topic') ?? undefined,
      subtopics: subtopicsParam ? subtopicsParam.split(',') : undefined,
      difficulty: (searchParams.get('difficulty') as Difficulty | null) ?? undefined,
      mode,
      count: countParam ? Number(countParam) : undefined,
      ids,
    }
  }, [searchParams])  // eslint-disable-line react-hooks/exhaustive-deps

  const { questions, loading, error } = useQuestions(filters)

  const {
    questions: storeQuestions,
    currentIndex,
    responses,
    flaggedIds,
    status,
    startQuiz,
    answerQuestion,
    nextQuestion,
    goToPreviousQuestion,
    goToQuestion,
    toggleFlag,
    completeQuiz,
    resetQuiz,
  } = useQuizStore()

  // Reset store on every new quiz navigation so filters always take effect
  useEffect(() => {
    resetQuiz()
  }, [])  // eslint-disable-line react-hooks/exhaustive-deps

  // Start the quiz once questions load — guard prevents re-triggering on re-renders
  useEffect(() => {
    if (!loading && questions.length > 0 && status === 'idle') {
      startQuiz(questions, mode)
    }
  }, [loading, questions, status, mode, startQuiz])

  // Restore exam accent colour (handles direct navigation or hard refresh)
  useEffect(() => {
    if (storeQuestions.length > 0) {
      setExamAccent(storeQuestions[0].topic)
    }
  }, [storeQuestions])

  const [showQuitDialog, setShowQuitDialog] = useState(false)
  // Local pre-confirmation selection — not committed to store until "Confirm Answer"
  const [pendingAnswer, setPendingAnswer] = useState<string | null>(null)

  // Clear pending selection and scroll to top whenever the question changes
  useEffect(() => {
    setPendingAnswer(null)
    window.scrollTo({ top: 0, behavior: 'instant' })
  }, [currentIndex])

  const currentQuestion = storeQuestions[currentIndex]
  const committedAnswer = currentQuestion ? (responses[currentQuestion.id]?.chosen ?? null) : null
  const isLocked = status === 'reviewing'
  // What to visually highlight: committed answer (locked) or pending selection
  const displayAnswer = isLocked ? committedAnswer : pendingAnswer
  const isLastQuestion = currentIndex + 1 >= storeQuestions.length

  function handleQuit() {
    try { sessionStorage.removeItem('actuarial_selected_ids') } catch { /* ignore */ }
    resetQuiz()
    navigate(searchParams.get('from') === 'browse' ? '/browse' : '/')
  }

  function handleSelectAnswer(key: string) {
    setPendingAnswer(key)
  }

  function handleConfirmAnswer() {
    if (pendingAnswer && currentQuestion) {
      answerQuestion(currentQuestion.id, pendingAnswer)
    }
  }

  // Show explanation inline only in quiz mode when user chose to reveal during
  const showExplanation = isLocked && mode === 'quiz' && reveal === 'during'

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

  const isFlagged = flaggedIds.includes(currentQuestion.id)

  return (
    <div className="container max-w-2xl mx-auto px-4 py-8 space-y-6">
      <div className="flex items-center justify-between gap-3">
        <Button
          variant="ghost"
          size="sm"
          onClick={() => setShowQuitDialog(true)}
          className="text-muted-foreground hover:text-foreground"
        >
          <X className="h-4 w-4 mr-1" />
          Quit {mode === 'mock-exam' ? 'exam' : 'quiz'}
        </Button>

        <Button
          variant="ghost"
          size="sm"
          onClick={() => toggleFlag(currentQuestion.id)}
          className={isFlagged ? 'text-primary' : 'text-muted-foreground hover:text-foreground'}
          aria-label={isFlagged ? 'Remove flag' : 'Flag question'}
        >
          {isFlagged
            ? <BookmarkCheck className="h-4 w-4 mr-1" />
            : <Bookmark className="h-4 w-4 mr-1" />}
          {isFlagged ? 'Flagged' : 'Flag'}
        </Button>
      </div>

      <ProgressBar
        current={currentIndex + 1}
        total={storeQuestions.length}
        onNavigate={goToQuestion}
        flaggedIds={flaggedIds}
        questionIds={storeQuestions.map(q => q.id)}
      />

      {showQuitDialog && (
        <QuitQuizDialog
          mode={mode}
          onCancel={() => setShowQuitDialog(false)}
          onConfirm={handleQuit}
        />
      )}

      <QuestionCard
        question={currentQuestion}
        selectedAnswer={displayAnswer}
        onAnswer={handleSelectAnswer}
        showExplanation={showExplanation}
        isLocked={isLocked}
      />

      {(currentIndex > 0 || status === 'reviewing' || pendingAnswer !== null) && (
        <div className="flex justify-between items-center">
          <div>
            {currentIndex > 0 && (
              <Button variant="outline" size="lg" onClick={goToPreviousQuestion}>
                <ChevronLeft className="h-4 w-4 mr-1" />
                Back
              </Button>
            )}
          </div>

          <div className="flex items-center gap-3">
            {!isLocked && pendingAnswer !== null && (
              <Button
                onClick={handleConfirmAnswer}
                size="lg"
                className="bg-foreground text-background hover:bg-foreground/90"
              >
                Confirm Answer
              </Button>
            )}

            {isLocked && (
              isLastQuestion ? (
                <Button
                  onClick={handleFinish}
                  size="lg"
                  className="bg-foreground text-background hover:bg-foreground/90"
                >
                  Finish {mode === 'mock-exam' ? 'Exam' : 'Quiz'}
                </Button>
              ) : (
                <Button
                  onClick={nextQuestion}
                  size="lg"
                  className="bg-foreground text-background hover:bg-foreground/90"
                >
                  Next Question →
                </Button>
              )
            )}
          </div>
        </div>
      )}
    </div>
  )
}
