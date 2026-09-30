import { useEffect, useId, useRef, useState } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import { Play } from 'lucide-react'
import { useQuizStore } from '@/stores/quizStore'
import { Button } from '@/components/ui/button'
import { QuizTimer } from '@/components/QuizTimer'
import {
  isQuizInProgress,
  leaveConsequence,
  quizResumePath,
  sessionNoun,
  showsQuizResume,
} from '@/lib/quizResume'
import { cn } from '@/lib/utils'

/**
 * The way back into a quiz: a pill on the bottom edge of every page while a
 * quiz is in progress and the reader is somewhere else in the app.
 *
 * A quiz no longer ends when its page is left — the session lives in the quiz
 * store, so a reader can go and look something up mid-question and come back
 * to the answers they had given (lib/quizResume.ts). This is what makes that
 * visible: it says a quiz is waiting, where they had got to, and — timed —
 * how the clock stands, since it keeps running while they are away.
 *
 * Pressing it asks what to do with the quiz: **Return** to the question they
 * left, or **Leave** it, which discards the answers the way the quiz page's
 * own Quit does. One press never throws answers away.
 *
 * It is drawn in the resume dock (components/ResumeDock.tsx), beside the
 * Quiz Battle queue's pill when both are waiting.
 */
export function QuizResumeButton() {
  const { pathname } = useLocation()
  const navigate = useNavigate()
  const inProgress = useQuizStore(isQuizInProgress)
  const total = useQuizStore(s => s.questions.length)
  const position = useQuizStore(s => s.currentIndex + 1)
  const answered = useQuizStore(s => Object.keys(s.responses).length)
  const mode = useQuizStore(s => s.mode)
  const timer = useQuizStore(s => s.timer)
  const search = useQuizStore(s => s.search)
  const leaveQuiz = useQuizStore(s => s.leaveQuiz)

  const [open, setOpen] = useState(false)
  const rootRef = useRef<HTMLDivElement>(null)
  const pillRef = useRef<HTMLButtonElement>(null)
  const returnRef = useRef<HTMLButtonElement>(null)
  const panelId = useId()
  const headingId = useId()

  const visible = showsQuizResume(pathname, inProgress)

  // A page change or the quiz ending closes the choice; it's never left open
  // over a page it wasn't opened on.
  useEffect(() => { setOpen(false) }, [pathname, visible])

  useEffect(() => {
    if (!open) return
    returnRef.current?.focus()
    function onPointerDown(e: PointerEvent) {
      if (rootRef.current && !rootRef.current.contains(e.target as Node)) setOpen(false)
    }
    function onKeyDown(e: KeyboardEvent) {
      if (e.key !== 'Escape') return
      setOpen(false)
      pillRef.current?.focus()
    }
    document.addEventListener('pointerdown', onPointerDown)
    document.addEventListener('keydown', onKeyDown)
    return () => {
      document.removeEventListener('pointerdown', onPointerDown)
      document.removeEventListener('keydown', onKeyDown)
    }
  }, [open])

  if (!visible) return null

  const noun = sessionNoun(mode)
  const consequence = leaveConsequence(answered)

  function handleReturn() {
    setOpen(false)
    navigate(quizResumePath(search))
  }

  function handleLeave() {
    setOpen(false)
    leaveQuiz()
  }

  return (
    <div ref={rootRef} className="flex flex-col items-center gap-2 pointer-events-auto">
      {open && (
        <div
          id={panelId}
          role="dialog"
          aria-labelledby={headingId}
          className="w-64 rounded-lg border border-border bg-popover text-popover-foreground p-4 shadow-md space-y-3"
        >
          <div className="space-y-0.5">
            <h2 id={headingId} className="text-sm font-semibold">
              {noun === 'exam' ? 'Practice exam in progress' : 'Quiz in progress'}
            </h2>
            {consequence && <p className="text-xs text-muted-foreground">{consequence}</p>}
          </div>
          <div className="flex justify-end gap-2">
            <Button
              variant="outline"
              size="sm"
              onClick={handleLeave}
              className="text-destructive hover:text-destructive"
            >
              Leave
            </Button>
            <Button ref={returnRef} size="sm" onClick={handleReturn}>
              Return
            </Button>
          </div>
        </div>
      )}

      <button
        ref={pillRef}
        type="button"
        onClick={() => setOpen(v => !v)}
        aria-expanded={open}
        aria-haspopup="dialog"
        aria-controls={open ? panelId : undefined}
        className={cn(
          // A hairline as well as the shadow: it floats over cards of its
          // own colour, and in the dark theme a shadow alone doesn't part them.
          'inline-flex h-11 items-center gap-2 rounded-full border border-border bg-card pl-3.5 pr-2 text-sm font-medium text-foreground shadow-lg transition-colors hover:bg-accent',
          'focus:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 ring-offset-background',
          // Untimed, the count is the last thing in the pill; give it the
          // same breathing room the timer chip has.
          !timer && 'pr-3.5',
        )}
      >
        <Play className="h-4 w-4 shrink-0 text-primary" aria-hidden />
        <span>Return to {noun}</span>
        <span className="tabular-nums text-muted-foreground">
          <span className="sr-only">question </span>
          {position}
          <span aria-hidden>/</span>
          <span className="sr-only"> of </span>
          {total}
        </span>
        {timer && <QuizTimer startedAt={timer.startedAt} allowanceSeconds={timer.allowanceSeconds} />}
      </button>
    </div>
  )
}
