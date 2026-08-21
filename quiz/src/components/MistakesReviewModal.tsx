import { useCallback, useEffect, useMemo, useRef, useState } from 'react'
import { createPortal } from 'react-dom'
import { ChevronLeft, ChevronRight, GripHorizontal, Maximize2, Minimize2, X } from 'lucide-react'
import { QuestionCard } from '@/components/QuestionCard'
import { NavProgressBar } from '@/components/NavProgressBar'
import { Button } from '@/components/ui/button'
import { isAnswerCorrect, isMultiPartAnswerComplete } from '@/lib/parser'
import type { Question, SelfGrade } from '@/lib/parser'
import { pendingAnswerFor, tagPendingAnswer } from '@/lib/pendingAnswer'
import type { PendingAnswer } from '@/lib/pendingAnswer'
import type { RecentMistake } from '@/lib/recentMistakes'
import type { ConceptMasteryRecord } from '@/lib/mastery'
import { recordReviewAnswers, type QuizResponse } from '@/stores/quizStore'
import { useAuth } from '@/hooks/useAuth'
import { useSplitHeight } from '@/hooks/useSplitHeight'
import { useSoundEffects, useSoundOnMount } from '@/hooks/useSoundEffects'

interface Props {
  /** The missed questions to work through, most recent first. */
  mistakes: RecentMistake[]
  /** Mastery records for the active exam — the starting state for the upsert. */
  masteryRecords: ConceptMasteryRecord[]
  /**
   * Ids of the questions answered correctly so far, reported as they're graded.
   * Answers are still only *banked* on close; this is purely so the outstanding
   * count behind the panel can tick down live instead of waiting for the save.
   */
  onFixedChange?: (fixedIds: string[]) => void
  onClose: () => void
}

/**
 * A question's display name — its topic, the one human-readable label a
 * question file carries (ids are `p-004`-style and mean nothing to a learner).
 * Falls back to the syllabus learning objective, then the exam.
 */
function questionName(question: Question): string {
  return question.topic || question.learning_objective || question.exam
}

/** Did the learner get this one right? Null while it's still unanswered. */
function verdictFor(
  question: Question,
  responses: Record<string, QuizResponse>,
  manualGrades: Record<string, SelfGrade>,
): boolean | null {
  const r = responses[question.id]
  if (r === undefined) return null
  // A self-graded free-entry answer counts as the learner graded it.
  const override = question.type === 'free-entry' ? manualGrades[question.id] : undefined
  return override !== undefined ? override === 'correct' : isAnswerCorrect(question, r.chosen)
}

/**
 * Fix-mistakes reviewer: the questions you got wrong, one at a time, answerable
 * in place.
 *
 * It wears the concept popup's shell — the same resizable bottom panel, the same
 * header (name, focus toggle, close), the same green progress bar over the same
 * Previous / position / Next footer — so paging through missed questions feels
 * like paging through concepts. Inside that shell the body is the *quiz's* own
 * QuestionCard, rendered exactly as the quiz renders it (no meta badges), just
 * flattened so the panel is its surface instead of a second card.
 *
 * Deliberately thin beyond that. There is no filtering, no selection, no tabs
 * and no quiz to launch — every question here is one you already missed, so the
 * only thing left to do is answer it. Pick an option and it grades immediately;
 * Previous / Next walk the list and you can answer as few or as many as you
 * like, in any order.
 *
 * Answers are banked once, on close, through recordReviewAnswers — the same
 * writes a finished quiz performs. A question answered correctly here therefore
 * drops off the mistakes list exactly as it would have from a quiz.
 */
export function MistakesReviewModal({ mistakes, masteryRecords, onFixedChange, onClose }: Props) {
  const { user } = useAuth()
  const { play, resetCombo } = useSoundEffects()
  // The panel's own sound — a sheet of paper sliding out. Mounted only while
  // open, so mount is the open edge; close is played from the close paths.
  useSoundOnMount('open')
  // Same drag-to-resize handle, and the same persisted height, as the concept
  // popup: one preferred panel size for both.
  const { height, beginDrag } = useSplitHeight()
  // Focus mode fills the viewport and strips the chrome back to the question and
  // Previous/Next — driven entirely by the shared `.concept-popup-aside` CSS.
  const [focusMode, setFocusMode] = useState(false)

  // Snapshot on open: useRecentMistakes re-queries on every quiz save, and the
  // list shifting under a half-answered reviewer would move questions around.
  const [items] = useState(() => mistakes)
  const questions = useMemo(() => items.map(m => m.question), [items])

  const [index, setIndex] = useState(0)
  const [responses, setResponses] = useState<Record<string, QuizResponse>>({})
  const [manualGrades, setManualGrades] = useState<Record<string, SelfGrade>>({})
  // Multi-part answers accumulate per part, so they need an explicit commit.
  // Tagged with the question they were entered for so a half-typed answer is
  // never read back on the next question (see lib/pendingAnswer.ts).
  const [pending, setPending] = useState<PendingAnswer | null>(null)

  const current = items[index]
  const question = current?.question
  const pendingAnswer = pendingAnswerFor(pending, question)
  const response = question ? responses[question.id] : undefined
  const locked = response !== undefined
  const shownAt = useRef(Date.now())
  const bodyRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    shownAt.current = Date.now()
    if (bodyRef.current) bodyRef.current.scrollTop = 0
  }, [index])

  // Stepping between questions is a page flick, not a press — the same cue the
  // concept popup's Previous/Next makes. Shared by the buttons and the ←/→ keys.
  const turnPage = useCallback((direction: -1 | 1) => {
    const next = index + direction
    if (next < 0 || next > items.length - 1) return
    play('page')
    setIndex(next)
  }, [play, index, items.length])

  const close = useCallback(() => {
    play('close')
    onClose()
  }, [play, onClose])

  useEffect(() => {
    function onKey(e: KeyboardEvent) {
      // Esc leaves focus mode first, then closes — same as the concept popup.
      if (e.key === 'Escape') {
        if (focusMode) setFocusMode(false)
        else close()
        return
      }
      // Arrows page between questions — unless the learner is typing a
      // free-entry answer, where they belong to the caret.
      const el = e.target as HTMLElement | null
      if (el && (el.tagName === 'INPUT' || el.tagName === 'TEXTAREA' || el.isContentEditable)) return
      if (e.key === 'ArrowLeft') turnPage(-1)
      else if (e.key === 'ArrowRight') turnPage(1)
    }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [close, turnPage, focusMode])

  // Focus mode covers the whole viewport, so lock the page behind it exactly as
  // the concept popup does.
  useEffect(() => {
    if (!focusMode) return
    document.body.style.overflow = 'hidden'
    return () => { document.body.style.overflow = '' }
  }, [focusMode])

  // Bank the answers on the way out. Held in a ref and fired from an unmount
  // cleanup so every exit path — the close button, Esc, or the parent
  // unmounting us — saves exactly once.
  const saveRef = useRef<() => void>(() => {})
  const savedRef = useRef(false)
  saveRef.current = () => {
    if (savedRef.current) return
    if (Object.keys(responses).length === 0) return
    savedRef.current = true
    void recordReviewAnswers(user?.id ?? null, questions, responses, masteryRecords, manualGrades)
  }
  useEffect(() => () => saveRef.current(), [])

  // Questions fixed so far in this sitting. Reported up as they're graded so the
  // outstanding count on the button behind the panel drops in step with the
  // work, rather than standing still until the on-close save lands.
  const fixedIds = useMemo(
    () => questions.filter(q => verdictFor(q, responses, manualGrades) === true).map(q => q.id),
    [questions, responses, manualGrades],
  )
  useEffect(() => { onFixedChange?.(fixedIds) }, [fixedIds, onFixedChange])

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
    if (question?.type === 'multi-part') setPending(tagPendingAnswer(question, answer))
    else commit(answer)
  }

  function setPartGrade(key: string, grade: SelfGrade) {
    setManualGrades(prev => ({ ...prev, [key]: grade }))
  }

  const answeredCount = Object.keys(responses).length
  const fixedCount = fixedIds.length
  const currentVerdict = verdictFor(question, responses, manualGrades)
  const isMultiPart = question.type === 'multi-part'
  const canCheck = pendingAnswer !== null && isMultiPartAnswerComplete(question, pendingAnswer)
  const name = questionName(question)
  const position = `${index + 1} of ${items.length}`

  return createPortal(
    <aside
      // The concept popup's class: it carries the sidebar-width offset on
      // desktop and the whole focus-mode layer in index.css, so both panels
      // sit and expand identically.
      className="concept-popup-aside fixed left-0 right-0 bottom-14 md:bottom-0 z-50 border-t bg-card text-card-foreground shadow-2xl flex flex-col"
      data-focus={focusMode}
      style={{ height: focusMode ? undefined : `min(${height}px, 100vh)` }}
      // Non-modal, like the concept popup: the page behind stays live and
      // scrollable, so this is a complementary panel rather than a dialog.
      role="complementary"
      aria-label={`Fix mistakes: ${name}`}
    >
      {/* Drag handle — hidden in focus mode, visible otherwise */}
      {!focusMode && (
        <div
          role="separator"
          aria-orientation="horizontal"
          aria-label="Resize fix-mistakes panel"
          onMouseDown={e => {
            e.preventDefault()
            beginDrag(e.clientY)
          }}
          onTouchStart={e => {
            if (e.touches[0]) beginDrag(e.touches[0].clientY)
          }}
          className="flex h-4 items-center justify-center cursor-row-resize hover:bg-accent/60 active:bg-accent/80 transition-colors select-none touch-none"
        >
          <GripHorizontal className="h-3 w-6 text-muted-foreground/60" />
        </div>
      )}

      {/* Header. Focus mode spans the full viewport, so the header and the body
          below share a max-width reading column, as in the concept popup. */}
      <div className={`flex items-center gap-2 h-16 shrink-0 ${focusMode ? 'w-full max-w-4xl mx-auto px-4 sm:px-6' : 'px-3'}`}>
        <div className="flex items-center gap-2 flex-1 min-w-0">
          <h2 className="truncate font-semibold text-lg sm:text-xl min-w-0">{name}</h2>
          {/* Verdict pill, in the slot the concept popup gives the mastery pill.
              Nothing shows until the question is answered — this panel never
              pre-judges a question you haven't retried yet. */}
          {currentVerdict !== null && (
            <span
              className={`shrink-0 inline-flex items-center justify-center min-w-[1.875rem] h-7 px-2 rounded-full text-xs font-bold ${
                currentVerdict
                  ? 'bg-green-100 text-green-700 dark:bg-green-950/40 dark:text-green-300'
                  : 'bg-red-100 text-red-700 dark:bg-red-950/60 dark:text-red-300'
              }`}
              aria-label={currentVerdict ? 'Answered correctly' : 'Answered incorrectly'}
            >
              {currentVerdict ? '✓' : '✗'}
            </span>
          )}
        </div>
        {/* Focus mode toggle — the only control that survives focus mode, so
            there's always a way back out (Esc also works). */}
        <button
          type="button"
          onClick={() => setFocusMode(v => !v)}
          aria-pressed={focusMode}
          className="inline-flex items-center justify-center h-10 w-10 rounded-lg shrink-0 text-muted-foreground hover:text-foreground hover:bg-accent transition-colors"
          title={focusMode ? 'Exit focus mode (Esc)' : 'Focus mode'}
          aria-label={focusMode ? 'Exit focus mode' : 'Focus mode'}
        >
          {focusMode ? <Minimize2 className="h-5 w-5" /> : <Maximize2 className="h-5 w-5" />}
        </button>
        {!focusMode && (
          <button
            type="button"
            onClick={close}
            data-sound="none"
            className="inline-flex items-center justify-center h-10 w-10 rounded-lg shrink-0 text-muted-foreground hover:text-foreground hover:bg-accent transition-colors"
            title="Close"
            aria-label="Close"
          >
            <X className="h-5 w-5" />
          </button>
        )}
      </div>

      {/* Body — overflow-y:scroll (not auto) keeps this a scroll container even
          when the question is short, so overscroll-contain traps wheel events
          and the page behind never scrolls. Scrollbar hidden via CSS.

          No horizontal padding of its own: the QuestionCard already carries the
          p-6 inset, and its surface is flattened so inside the panel it reads as
          the content rather than a second card. */}
      <div
        ref={bodyRef}
        className={`flex-1 min-h-0 w-full overflow-y-scroll overscroll-contain pb-4 [&::-webkit-scrollbar]:hidden [scrollbar-width:none] ${focusMode ? 'max-w-4xl mx-auto' : ''}`}
      >
        <div className="[&>div]:bg-transparent [&>div]:shadow-none">
          <QuestionCard
            key={question.id}
            question={question}
            selectedAnswer={response?.chosen ?? pendingAnswer}
            onAnswer={handleAnswer}
            showExplanation={locked}
            isLocked={locked}
            selfGrade={question.type === 'free-entry' ? manualGrades[question.id] : undefined}
            onSelfGrade={question.type === 'free-entry' ? grade => setPartGrade(question.id, grade) : undefined}
            partManualGrades={isMultiPart ? manualGrades : undefined}
            onPartManualGrade={isMultiPart ? (label, grade) => setPartGrade(`${question.id}__${label}`, grade) : undefined}
            essaySelfGrades={isMultiPart ? manualGrades : undefined}
            onEssaySelfGrade={isMultiPart ? (label, grade) => setPartGrade(`${question.id}__${label}`, grade) : undefined}
          />

          {isMultiPart && !locked && (
            <div className="px-6 pb-2">
              <Button
                className="w-full"
                disabled={!canCheck}
                onClick={() => canCheck && commit(pendingAnswer!)}
              >
                Check answers
              </Button>
            </div>
          )}
        </div>
      </div>

      {/* Footer nav */}
      <NavProgressBar
        current={index + 1}
        total={items.length}
        label={`Question ${index + 1} of ${items.length}`}
        // Silent, unlike the Previous / Next buttons above: a drag would fire
        // the page flick once per question it crossed.
        onScrub={next => setIndex(next - 1)}
        formatValue={n => `Question ${n} of ${items.length}`}
      />
      <div className="flex items-stretch h-16 shrink-0 bg-background/60">
        <button
          type="button"
          disabled={index === 0}
          data-sound="none"
          onClick={() => turnPage(-1)}
          className="flex-1 flex items-center justify-center gap-2 px-4 text-base sm:text-sm font-medium hover:bg-accent/60 active:bg-accent disabled:opacity-40 disabled:cursor-not-allowed transition-colors"
        >
          <ChevronLeft className="h-6 w-6 sm:h-5 sm:w-5" />
          <span>Previous</span>
        </button>
        {/* Position + running tally, where the concept popup keeps its position
            and syllabus-filter label. Focus mode drops it, leaving the footer as
            just Previous / Next. */}
        {!focusMode && (
          <div className="self-center flex flex-col items-center gap-0.5 px-2 shrink-0">
            <span className="text-sm sm:text-xs text-muted-foreground tabular-nums">{position}</span>
            <span className="text-xs text-muted-foreground">
              {answeredCount > 0 ? `${fixedCount} of ${answeredCount} fixed` : 'Fix Mistakes'}
            </span>
          </div>
        )}
        <button
          type="button"
          disabled={index === items.length - 1}
          data-sound="none"
          onClick={() => turnPage(1)}
          className="flex-1 flex items-center justify-center gap-2 px-4 text-base sm:text-sm font-medium hover:bg-accent/60 active:bg-accent disabled:opacity-40 disabled:cursor-not-allowed transition-colors"
        >
          <span>Next</span>
          <ChevronRight className="h-6 w-6 sm:h-5 sm:w-5" />
        </button>
      </div>
    </aside>,
    document.body,
  )
}
