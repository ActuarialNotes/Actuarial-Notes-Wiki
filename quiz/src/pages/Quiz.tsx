import { useEffect, useMemo, useState } from 'react'
import { useSearchParams, useNavigate } from 'react-router-dom'
import { Loader2, X, ChevronLeft, Volume2, VolumeX, AlertCircle, Keyboard } from 'lucide-react'
import { useQuestions } from '@/hooks/useQuestions'
import { useAuth } from '@/hooks/useAuth'
import { useQuizStore } from '@/stores/quizStore'
import { useConceptMastery } from '@/hooks/useConceptMastery'
import { QuestionCard } from '@/components/QuestionCard'
import type { SelfGrade } from '@/components/QuestionCard'
import { ProgressBar } from '@/components/ProgressBar'
import { QuitQuizDialog } from '@/components/QuitQuizDialog'
import { IncompletePartsDialog } from '@/components/IncompletePartsDialog'
import { KeyboardShortcutsHelp } from '@/components/KeyboardShortcutsHelp'
import { PreQuizCollectGate } from '@/components/collect/PreQuizCollectGate'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { isAnswerCorrect, isMultiPartAnswerComplete } from '@/lib/parser'
import type { QuestionFilter, Difficulty, QuizMode } from '@/lib/parser'
import { decayIfStale } from '@/lib/mastery'
import { useCollectedCards } from '@/hooks/useCollectedCards'
import type { ConceptMasteryRecord } from '@/lib/mastery'
import { slugForLink } from '@/lib/conceptMatch'
import { useSoundEffects } from '@/hooks/useSoundEffects'
import { usePageKeyboard } from '@/hooks/useKeyboard'
import { trackQuizStarted, trackQuestionAnswered, trackQuizCompleted, trackFirstQuiz, trackFirstCorrect } from '@/lib/analytics'

export default function Quiz() {
  const [searchParams] = useSearchParams()
  const navigate = useNavigate()
  const { user } = useAuth()
  const { records: masteryRecords, loading: masteryLoading } = useConceptMastery()

  const mode = (searchParams.get('mode') as QuizMode | null) ?? 'quiz'
  // reveal='during' shows explanation after each answer; 'end' defers to review
  const reveal = searchParams.get('reveal') ?? 'during'
  const countParam = searchParams.get('count')

  const filters: QuestionFilter = useMemo(() => {
    const topicsParam = searchParams.get('topics')
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

    const conceptsParam = searchParams.get('concepts')
    const yearParam = searchParams.get('year')
    const sessionParam = searchParams.get('session')
    return {
      exam: searchParams.get('exam') ?? undefined,
      topics: topicsParam ? topicsParam.split(',') : undefined,
      concepts: conceptsParam ? conceptsParam.split(',') : undefined,
      difficulty: (searchParams.get('difficulty') as Difficulty | null) ?? undefined,
      mode,
      count: countParam ? Number(countParam) : undefined,
      ids,
      concept: searchParams.get('concept') ?? undefined,
      year: yearParam ? Number(yearParam) : undefined,
      session: sessionParam ?? undefined,
    }
  }, [searchParams])  // eslint-disable-line react-hooks/exhaustive-deps

  const { questions, loading, error } = useQuestions(filters)

  const {
    questions: storeQuestions,
    currentIndex,
    responses,
    flaggedIds,
    status,
    manualGrades,
    startQuiz,
    answerQuestion,
    clearAnswer,
    nextQuestion,
    goToPreviousQuestion,
    goToQuestion,
    toggleFlag,
    setManualGrade,
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
      const exam = questions[0]?.exam ?? 'Unknown'
      trackQuizStarted({ mode, exam, question_count: questions.length })
      trackFirstQuiz({ mode, exam })
    }
  }, [loading, questions, status, mode, startQuiz])

  const { enabled: soundEnabled, toggle: toggleSound, play: playSound } = useSoundEffects()


  const [showQuitDialog, setShowQuitDialog] = useState(false)
  const [showIncompletePartsDialog, setShowIncompletePartsDialog] = useState(false)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [submitError, setSubmitError] = useState<string | null>(null)
  // Local pre-confirmation selection — not committed to store until "Confirm Answer"
  const [pendingAnswer, setPendingAnswer] = useState<string | null>(null)

  // Self-grading screen for reveal='end' (mock exam) with written questions
  const [showSelfGradeScreen, setShowSelfGradeScreen] = useState(false)
  // keyed by `${questionId}__${partLabel}`
  const [essaySelfGrades, setEssaySelfGrades] = useState<Record<string, SelfGrade>>({})
  const [showShortcutsHelp, setShowShortcutsHelp] = useState(false)

  const essayQuestions = useMemo(
    () => storeQuestions.filter(q =>
      q.type === 'multi-part' && (q.parts ?? []).some(p => p.answer === '')
    ),
    [storeQuestions],
  )

  // Tracks whether the user clicked "Change Answer" on the current question
  const [isChangingAnswer, setIsChangingAnswer] = useState(false)

  // ── Pre-quiz collection gate ─────────────────────────────────────────────
  // Concepts must be collected (comprehension check passed) before a correct
  // answer can advance them from New → Level 1. Surface the collect prompt up
  // front so today's quiz can actually level up its concepts. Only applies to
  // ordinary quizzes (never mock exams) and only for concepts currently at New.
  const [collectGateDismissed, setCollectGateDismissed] = useState(false)
  const collectedCards = useCollectedCards(s => s.cards)

  const newQuizConcepts = useMemo(() => {
    if (mode !== 'quiz') return []
    const lookup = new Map<string, ConceptMasteryRecord>()
    for (const r of masteryRecords) lookup.set(r.concept_slug.toLowerCase(), r)
    const now = new Date()
    const seen = new Set<string>()
    const result: string[] = []
    for (const q of storeQuestions) {
      for (const link of q.wiki_link) {
        const slug = slugForLink(link)
        if (!slug) continue
        const key = slug.toLowerCase()
        if (seen.has(key)) continue
        seen.add(key)
        const rec = lookup.get(key)
        const state = rec ? decayIfStale(rec, now).state : 'new'
        if (state === 'new') result.push(slug)
      }
    }
    return result
  }, [storeQuestions, masteryRecords, mode])

  const hasUncollectedNewConcept = newQuizConcepts.some(
    name => !collectedCards.some(c => c.name.toLowerCase() === name.toLowerCase()),
  )

  // Show the gate only at the very start of the session (before any answer) so
  // it never interrupts a quiz already in progress, and only once mastery has
  // loaded so the New/collected classification is accurate.
  const showCollectGate =
    mode === 'quiz' &&
    !collectGateDismissed &&
    !masteryLoading &&
    status === 'active' &&
    Object.keys(responses).length === 0 &&
    hasUncollectedNewConcept

  // Clear pending selection and scroll to top whenever the question changes
  useEffect(() => {
    setPendingAnswer(null)
    setIsChangingAnswer(false)
    window.scrollTo({ top: 0, behavior: 'instant' })
  }, [currentIndex])

  const currentQuestion = storeQuestions[currentIndex]
  const committedAnswer = currentQuestion ? (responses[currentQuestion.id]?.chosen ?? null) : null
  const isLocked = status === 'reviewing'
  // What to visually highlight: committed answer (locked) or pending selection
  const displayAnswer = isLocked ? committedAnswer : pendingAnswer
  const isLastQuestion = currentIndex + 1 >= storeQuestions.length
  // Multi-part questions show the Confirm button immediately (no need to wait
  // for a pending selection) — incomplete submissions are caught with a confirm dialog
  const showConfirmButton = !isLocked && (pendingAnswer !== null || currentQuestion?.type === 'multi-part')

  const anyDialogOpen = showQuitDialog || showIncompletePartsDialog || showSelfGradeScreen || showShortcutsHelp

  // Select an MC answer by its 0-based index in the options array
  function selectAnswerByIndex(i: number) {
    if (!currentQuestion || isLocked) return
    if (currentQuestion.type === 'multi-part' || !currentQuestion.options?.length) return
    const option = currentQuestion.options[i]
    if (option) handleSelectAnswer(option.key)
  }

  usePageKeyboard({
    '1': () => selectAnswerByIndex(0),
    '2': () => selectAnswerByIndex(1),
    '3': () => selectAnswerByIndex(2),
    '4': () => selectAnswerByIndex(3),
    'Enter': () => {
      if (isLocked) handleNextFromAnswer()
      else if (pendingAnswer !== null) handleConfirmAnswer()
    },
    'ArrowRight': () => { if (isLocked) handleNextFromAnswer() },
    'ArrowLeft': () => { if (currentIndex > 0) goToPreviousQuestion() },
    'f': () => { if (currentQuestion) toggleFlag(currentQuestion.id) },
    'm': () => toggleSound(),
    '?': () => setShowShortcutsHelp(v => !v),
  }, !anyDialogOpen && status !== 'idle' && status !== 'complete')

  function handleQuit() {
    try { sessionStorage.removeItem('actuarial_selected_ids') } catch { /* ignore */ }
    resetQuiz()
    const from = searchParams.get('from')
    if (from === 'search') navigate('/search')
    else if (from === 'dashboard') navigate('/dashboard')
    else navigate('/')
  }

  function handleSelectAnswer(key: string) {
    if (key === pendingAnswer) {
      // Second tap on already-selected answer confirms it
      handleConfirmAnswer()
    } else {
      setPendingAnswer(key)
    }
  }

  function handleNextFromAnswer() {
    if (isLastQuestion) {
      handleFinish()
    } else {
      nextQuestion()
    }
  }

  function handleConfirmAnswer() {
    if (!currentQuestion) return

    if (currentQuestion.type === 'multi-part') {
      const answer = pendingAnswer ?? '{}'
      if (!isMultiPartAnswerComplete(currentQuestion, answer)) {
        setShowIncompletePartsDialog(true)
        return
      }
      commitAnswer(answer)
      return
    }

    if (pendingAnswer) commitAnswer(pendingAnswer)
  }

  function commitAnswer(answer: string) {
    if (!currentQuestion) return
    const correct = isAnswerCorrect(currentQuestion, answer)
    if (!isChangingAnswer) {
      playSound(correct ? 'correct' : 'wrong')
    }
    answerQuestion(currentQuestion.id, answer)
    setIsChangingAnswer(false)
    trackQuestionAnswered({ question_id: currentQuestion.id, is_correct: correct, exam: currentQuestion.exam, mode })
    if (correct) trackFirstCorrect({ mode, exam: currentQuestion.exam })
  }

  function handleChangeAnswer() {
    if (!currentQuestion) return
    const previous = committedAnswer
    clearAnswer(currentQuestion.id)
    setPendingAnswer(previous)
    setIsChangingAnswer(true)
  }

  // Show explanation inline only in quiz mode when user chose to reveal during
  const showExplanation = isLocked && mode === 'quiz' && reveal === 'during'

  async function submitQuiz() {
    if (isSubmitting) return
    setIsSubmitting(true)
    setSubmitError(null)
    try {
      const correctCount = storeQuestions.filter(q => {
        const r = responses[q.id]
        return r && isAnswerCorrect(q, r.chosen)
      }).length
      trackQuizCompleted({ mode, exam: storeQuestions[0]?.exam ?? 'Unknown', question_count: storeQuestions.length, correct_count: correctCount })
      playSound('complete')
      // Persist essay self-grades collected on the reveal='end' self-grade screen
      // into the store (keyed `${id}__${label}`) so they're saved with the session
      // and shown on the /review end screen — otherwise they'd be lost.
      for (const [key, grade] of Object.entries(essaySelfGrades)) {
        setManualGrade(key, grade)
      }
      await completeQuiz(user?.id ?? null, masteryRecords)
      navigate(`/review?${searchParams.toString()}`)
    } catch (err) {
      setSubmitError(err instanceof Error ? err.message : 'Failed to save quiz. Please try again.')
      setIsSubmitting(false)
    }
  }

  function handleFinish() {
    if (reveal === 'end' && essayQuestions.length > 0) {
      setShowSelfGradeScreen(true)
    } else {
      submitQuiz()
    }
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

  // ── Pre-quiz collection gate ─────────────────────────────────────────────
  if (showCollectGate) {
    return (
      <PreQuizCollectGate
        concepts={newQuizConcepts}
        onStart={() => setCollectGateDismissed(true)}
        onQuit={handleQuit}
      />
    )
  }

  const isFlagged = flaggedIds.includes(currentQuestion.id)

  // ── Self-grading screen (reveal='end' with written questions) ────────────
  if (showSelfGradeScreen) {
    const totalEssayParts = essayQuestions.reduce(
      (n, q) => n + (q.parts ?? []).filter(p => p.answer === '').length,
      0,
    )
    const gradedCount = Object.keys(essaySelfGrades).length

    return (
      <div className="container max-w-4xl mx-auto px-4 sm:px-6 py-8 space-y-6">
        <div className="flex items-center justify-between gap-3">
          <div>
            <h2 className="text-lg font-semibold">Self-Grade Written Responses</h2>
            <p className="text-sm text-muted-foreground mt-0.5">
              Review each written response and grade yourself before seeing your results.
            </p>
          </div>
          <span className="text-sm text-muted-foreground shrink-0">
            {gradedCount}/{totalEssayParts} graded
          </span>
        </div>

        <div className="space-y-8">
          {essayQuestions.map(q => {
            const qGrades: Record<string, SelfGrade> = {}
            for (const [key, grade] of Object.entries(essaySelfGrades)) {
              const sep = key.indexOf('__')
              if (sep >= 0 && key.slice(0, sep) === q.id) {
                qGrades[key.slice(sep + 2)] = grade
              }
            }
            return (
              <QuestionCard
                key={q.id}
                question={q}
                selectedAnswer={responses[q.id]?.chosen ?? null}
                onAnswer={() => {}}
                showExplanation={true}
                isLocked={true}
                showMeta={true}
                essaySelfGrades={qGrades}
                onEssaySelfGrade={(partLabel, grade) =>
                  setEssaySelfGrades(prev => ({ ...prev, [`${q.id}__${partLabel}`]: grade }))
                }
              />
            )
          })}
        </div>

        {submitError && (
          <div className="flex items-center gap-2 text-sm text-destructive bg-destructive/10 rounded-lg px-4 py-3">
            <AlertCircle className="h-4 w-4 shrink-0" />
            {submitError}
          </div>
        )}

        <div className="flex justify-between items-center pt-2">
          <Button variant="outline" size="lg" onClick={() => setShowSelfGradeScreen(false)}>
            <ChevronLeft className="h-4 w-4 mr-1" />
            Back to Quiz
          </Button>
          <Button
            onClick={submitQuiz}
            size="lg"
            disabled={isSubmitting}
            className="bg-foreground text-background hover:bg-foreground/90"
          >
            {isSubmitting ? <Loader2 className="h-4 w-4 mr-2 animate-spin" /> : null}
            {mode === 'mock-exam' ? 'Submit Exam' : 'Finish Quiz'}
          </Button>
        </div>
      </div>
    )
  }

  // Per-part self-grades for the current multi-part question, read back from the
  // store keyed by part label (the store keys them as `${id}__${label}`).
  const partGradeMap: Record<string, SelfGrade> = Object.fromEntries(
    Object.entries(manualGrades)
      .filter(([k]) => k.startsWith(`${currentQuestion.id}__`))
      .map(([k, v]) => [k.slice(currentQuestion.id.length + 2), v]),
  )
  const setPartGrade = (partLabel: string, grade: SelfGrade) =>
    setManualGrade(`${currentQuestion.id}__${partLabel}`, grade)

  return (
    <div className="container max-w-4xl mx-auto px-4 sm:px-6 py-8 space-y-6">
      <div className="flex items-center justify-between gap-3">
        <Button
          variant="ghost"
          size="sm"
          data-tour="quit-quiz"
          onClick={() => setShowQuitDialog(true)}
          className="text-muted-foreground hover:text-foreground"
        >
          <X className="h-4 w-4 mr-1" />
          Quit {mode === 'mock-exam' ? 'exam' : 'quiz'}
        </Button>

        <div className="flex items-center gap-2">
          <span
            className={
              'inline-flex items-center text-[11px] font-medium px-2 py-0.5 rounded-full border ' +
              (mode === 'mock-exam'
                ? 'bg-primary/10 text-primary border-primary/30'
                : 'bg-muted text-muted-foreground border-border')
            }
          >
            {mode === 'mock-exam' ? 'Mock Exam' : 'Quiz'}
          </span>
          <Button
            variant="ghost"
            size="sm"
            onClick={toggleSound}
            aria-label={soundEnabled ? 'Mute sounds' : 'Unmute sounds'}
            className="text-muted-foreground hover:text-foreground"
          >
            {soundEnabled ? <Volume2 className="h-4 w-4" /> : <VolumeX className="h-4 w-4" />}
          </Button>
          <Button
            variant="ghost"
            size="sm"
            onClick={() => setShowShortcutsHelp(true)}
            aria-label="Keyboard shortcuts"
            title="Keyboard shortcuts (?)"
            className="text-muted-foreground hover:text-foreground hidden sm:flex"
          >
            <Keyboard className="h-4 w-4" />
          </Button>
        </div>
      </div>

      <div className="pb-2">
        <ProgressBar
          current={currentIndex + 1}
          total={storeQuestions.length}
          onNavigate={goToQuestion}
          flaggedIds={flaggedIds}
          questionIds={storeQuestions.map(q => q.id)}
          isFlagged={isFlagged}
          onFlag={() => toggleFlag(currentQuestion.id)}
        />
      </div>

      {showQuitDialog && (
        <QuitQuizDialog
          mode={mode}
          onCancel={() => setShowQuitDialog(false)}
          onConfirm={handleQuit}
          onFinish={Object.keys(responses).length > 0 ? submitQuiz : undefined}
        />
      )}

      {showIncompletePartsDialog && (
        <IncompletePartsDialog
          onCancel={() => setShowIncompletePartsDialog(false)}
          onConfirm={() => {
            setShowIncompletePartsDialog(false)
            commitAnswer(pendingAnswer ?? '{}')
          }}
        />
      )}

      {showShortcutsHelp && (
        <KeyboardShortcutsHelp
          context="quiz"
          onClose={() => setShowShortcutsHelp(false)}
        />
      )}

      <div className="mt-4">
        <QuestionCard
          question={currentQuestion}
          selectedAnswer={displayAnswer}
          onAnswer={handleSelectAnswer}
          showExplanation={showExplanation}
          isLocked={isLocked}
          onNext={isLocked ? handleNextFromAnswer : undefined}
          selfGrade={currentQuestion.type === 'free-entry' ? manualGrades[currentQuestion.id] : undefined}
          onSelfGrade={currentQuestion.type === 'free-entry' ? (grade) => setManualGrade(currentQuestion.id, grade) : undefined}
          // Multi-part grades (both graded free-entry parts and answerless essay
          // parts) are persisted to the store under `${id}__${label}` so they
          // survive navigation and show identically on the /review end screen.
          // Essay parts route through essaySelfGrades in the card, so wire both.
          partManualGrades={currentQuestion.type === 'multi-part' ? partGradeMap : undefined}
          onPartManualGrade={currentQuestion.type === 'multi-part' ? setPartGrade : undefined}
          essaySelfGrades={currentQuestion.type === 'multi-part' ? partGradeMap : undefined}
          onEssaySelfGrade={currentQuestion.type === 'multi-part' ? setPartGrade : undefined}
        />
      </div>

      {submitError && (
        <div className="flex items-center gap-2 text-sm text-destructive bg-destructive/10 rounded-lg px-4 py-3">
          <AlertCircle className="h-4 w-4 flex-shrink-0" />
          {submitError}
        </div>
      )}

      {(currentIndex > 0 || status === 'reviewing' || showConfirmButton) && (
        <div className="flex flex-wrap justify-between items-center gap-2">
          <div>
            {currentIndex > 0 && (
              <Button variant="outline" size="lg" onClick={goToPreviousQuestion}>
                <ChevronLeft className="h-4 w-4 mr-1" />
                Back
              </Button>
            )}
          </div>

          <div className="flex items-center gap-2 flex-wrap">
            {showConfirmButton && (
              <Button
                onClick={handleConfirmAnswer}
                size="lg"
                className="bg-foreground text-background hover:bg-foreground/90"
              >
                Confirm Answer
              </Button>
            )}

            {isLocked && (
              <>
                <Button
                  variant="outline"
                  size="lg"
                  onClick={handleChangeAnswer}
                >
                  Change Answer
                </Button>
                {isLastQuestion ? (
                  <Button
                    onClick={handleFinish}
                    size="lg"
                    disabled={isSubmitting}
                    className="bg-foreground text-background hover:bg-foreground/90"
                  >
                    {isSubmitting ? <Loader2 className="h-4 w-4 mr-2 animate-spin" /> : null}
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
                )}
              </>
            )}
          </div>
        </div>
      )}
    </div>
  )
}
