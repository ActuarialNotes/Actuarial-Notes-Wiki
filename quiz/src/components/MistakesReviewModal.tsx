import { useEffect, useMemo, useRef, useState } from 'react'
import { ChevronLeft, ChevronRight, X } from 'lucide-react'
import { QuestionCard } from '@/components/QuestionCard'
import { NavProgressBar } from '@/components/NavProgressBar'
import { Button } from '@/components/ui/button'
import { isAnswerCorrect, isMultiPartAnswerComplete } from '@/lib/parser'
import type { SelfGrade } from '@/lib/parser'
import type { RecentMistake } from '@/lib/recentMistakes'
import type { ConceptMasteryRecord } from '@/lib/mastery'
import { recordReviewAnswers, type QuizResponse } from '@/stores/quizStore'
import { useAuth } from '@/hooks/useAuth'
import { useSoundEffects } from '@/hooks/useSoundEffects'

interface Props {
  /** The missed questions to work through, most recent first. */
  mistakes: RecentMistake[]
  /** Mastery records for the active exam — the starting state for the upsert. */
  masteryRecords: ConceptMasteryRecord[]
  onClose: () => void
}

/**
 * Fix-mistakes reviewer: the questions you got wrong, one at a time, answerable
 * in place.
 *
 * Deliberately thin. There is no filtering, no selection, no tabs and no quiz to
 * launch — every question here is one you already missed, so the only thing left
 * to do is answer it. Pick an option and it grades immediately with the same
 * card the quiz uses; Previous / Next walk the list and you can answer as few or
 * as many as you like, in any order.
 *
 * Answers are banked once, on close, through recordReviewAnswers — the same
 * writes a finished quiz performs. A question answered correctly here therefore
 * drops off the mistakes list exactly as it would have from a quiz.
 */
export function MistakesReviewModal({ mistakes, masteryRecords, onClose }: Props) {
  const { user } = useAuth()
  const { play, resetCombo } = useSoundEffects()

  // Snapshot on open: useRecentMistakes re-queries on every quiz save, and the
  // list shifting under a half-answered reviewer would move questions around.
  const [items] = useState(() => mistakes)
  const questions = useMemo(() => items.map(m => m.question), [items])

  const [index, setIndex] = useState(0)
  const [responses, setResponses] = useState<Record<string, QuizResponse>>({})
  const [manualGrades, setManualGrades] = useState<Record<string, SelfGrade>>({})
  // Multi-part answers accumulate per part, so they need an explicit commit.
  const [pending, setPending] = useState<string | null>(null)

  const current = items[index]
  const question = current?.question
  const response = question ? responses[question.id] : undefined
  const locked = response !== undefined
  const shownAt = useRef(Date.now())

  useEffect(() => {
    shownAt.current = Date.now()
    setPending(null)
  }, [index])

  useEffect(() => {
    function onKey(e: KeyboardEvent) {
      if (e.key === 'Escape') {
        onClose()
        return
      }
      // Arrows page between questions — unless the learner is typing a
      // free-entry answer, where they belong to the caret.
      const el = e.target as HTMLElement | null
      if (el && (el.tagName === 'INPUT' || el.tagName === 'TEXTAREA' || el.isContentEditable)) return
      if (e.key === 'ArrowLeft') setIndex(i => Math.max(0, i - 1))
      else if (e.key === 'ArrowRight') setIndex(i => Math.min(items.length - 1, i + 1))
    }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [onClose, items.length])

  // Bank the answers on the way out. Held in a ref and fired from an unmount
  // cleanup so every exit path — the close button, the backdrop, Esc, or the
  // parent unmounting us — saves exactly once.
  const saveRef = useRef<() => void>(() => {})
  const savedRef = useRef(false)
  saveRef.current = () => {
    if (savedRef.current) return
    if (Object.keys(responses).length === 0) return
    savedRef.current = true
    void recordReviewAnswers(user?.id ?? null, questions, responses, masteryRecords, manualGrades)
  }
  useEffect(() => () => saveRef.current(), [])

  if (!question) return null

  function commit(answer: string) {
    if (!question || responses[question.id]) return
    // Right answers get the arpeggio; wrong ones stay silent and end the run —
    // same contract as the quiz (docs/sound-design.md).
    if (isAnswerCorrect(question, answer)) play('correct')
    else resetCombo('correct')
    setResponses(prev => ({
      ...prev,
      [question.id]: { chosen: answer, timeSpent: Math.round((Date.now() - shownAt.current) / 1000) },
    }))
    setPending(null)
  }

  function handleAnswer(answer: string) {
    // Multi-part fires on every part edit — hold it until "Check answers".
    if (question?.type === 'multi-part') setPending(answer)
    else commit(answer)
  }

  function setPartGrade(key: string, grade: SelfGrade) {
    setManualGrades(prev => ({ ...prev, [key]: grade }))
  }

  const answeredCount = Object.keys(responses).length
  const fixedCount = questions.filter(q => {
    const r = responses[q.id]
    if (r === undefined) return false
    // A self-graded free-entry answer counts as the learner graded it.
    const override = q.type === 'free-entry' ? manualGrades[q.id] : undefined
    return override !== undefined ? override === 'correct' : isAnswerCorrect(q, r.chosen)
  }).length
  const isMultiPart = question.type === 'multi-part'
  const canCheck = pending !== null && isMultiPartAnswerComplete(question, pending)
  const topConcept = current?.problemConcepts[0]?.name

  return (
    <div
      className="fixed inset-0 z-50 flex items-start justify-center overflow-y-auto bg-black/50 p-4 backdrop-blur-sm"
      role="dialog"
      aria-modal="true"
      aria-label="Fix mistakes"
      onClick={e => { if (e.target === e.currentTarget) onClose() }}
    >
      <div className="my-8 flex w-full max-w-2xl flex-col rounded-2xl bg-card shadow-2xl">
        {/* Header */}
        <div className="flex items-center gap-3 px-6 pt-5 pb-1">
          <div className="min-w-0 flex-1">
            <h2 className="text-base font-semibold">Fix Mistakes</h2>
            <p className="truncate text-xs text-muted-foreground">
              {topConcept ? topConcept : 'Questions you got wrong'}
              {answeredCount > 0 && ` · ${fixedCount} of ${answeredCount} fixed`}
            </p>
          </div>
          <button
            type="button"
            onClick={onClose}
            aria-label="Dismiss"
            className="shrink-0 p-1 text-muted-foreground transition-colors hover:text-foreground"
          >
            <X className="h-4 w-4" />
          </button>
        </div>

        {/* The question itself — the same card the quiz renders. Its own
            surface is flattened: inside the modal panel it's the content, not a
            second card, and it already carries the p-6 inset. */}
        <div className="[&>div]:bg-transparent [&>div]:shadow-none">
          <QuestionCard
            key={question.id}
            question={question}
            selectedAnswer={response?.chosen ?? pending}
            onAnswer={handleAnswer}
            showExplanation={locked}
            isLocked={locked}
            showMeta
            selfGrade={question.type === 'free-entry' ? manualGrades[question.id] : undefined}
            onSelfGrade={question.type === 'free-entry' ? grade => setPartGrade(question.id, grade) : undefined}
            partManualGrades={isMultiPart ? manualGrades : undefined}
            onPartManualGrade={isMultiPart ? (label, grade) => setPartGrade(`${question.id}__${label}`, grade) : undefined}
            essaySelfGrades={isMultiPart ? manualGrades : undefined}
            onEssaySelfGrade={isMultiPart ? (label, grade) => setPartGrade(`${question.id}__${label}`, grade) : undefined}
          />

          {isMultiPart && !locked && (
            <div className="px-6 pb-6">
              <Button
                className="w-full"
                disabled={!canCheck}
                onClick={() => canCheck && commit(pending!)}
              >
                Check answers
              </Button>
            </div>
          )}
        </div>

        {/* Previous / Next */}
        {items.length > 1 && (
          <>
            <NavProgressBar
              current={index + 1}
              total={items.length}
              label={`Question ${index + 1} of ${items.length}`}
            />
            <div className="flex h-11 items-stretch overflow-hidden rounded-b-2xl bg-muted/10">
              <button
                type="button"
                disabled={index === 0}
                onClick={() => setIndex(i => i - 1)}
                className="flex items-center justify-center gap-1.5 px-4 text-xs font-medium transition-colors hover:bg-accent/60 active:bg-accent disabled:cursor-not-allowed disabled:opacity-40"
              >
                <ChevronLeft className="h-3.5 w-3.5" />
                <span>Previous</span>
              </button>
              <span className="flex flex-1 items-center justify-center text-xs tabular-nums text-muted-foreground">
                {index + 1} of {items.length}
              </span>
              <button
                type="button"
                disabled={index === items.length - 1}
                onClick={() => setIndex(i => i + 1)}
                className="flex items-center justify-center gap-1.5 px-4 text-xs font-medium transition-colors hover:bg-accent/60 active:bg-accent disabled:cursor-not-allowed disabled:opacity-40"
              >
                <span>Next</span>
                <ChevronRight className="h-3.5 w-3.5" />
              </button>
            </div>
          </>
        )}
      </div>
    </div>
  )
}
