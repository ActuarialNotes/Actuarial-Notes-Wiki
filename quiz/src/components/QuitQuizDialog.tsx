import { useId } from 'react'
import { Button } from '@/components/ui/button'
import { Popup, PopupTitle } from '@/components/ui/Popup'
import { PRACTICE_EXAM_LABEL } from '@/lib/pastExams'
import { useSoundOnMount } from '@/hooks/useSoundEffects'

interface QuitQuizDialogProps {
  mode: 'quiz' | 'mock-exam'
  onCancel: () => void
  /** Quit: the answers are discarded. */
  onConfirm: () => void
  /** Finish now and see the results; absent before anything is answered. */
  onFinish?: () => void
  /**
   * Leave with the quiz kept open, to come back to from the Return to quiz
   * pill. The session screen has no navigation of its own, so this is the way
   * out that doesn't end it.
   */
  onLater?: () => void
}

/** What the session's leave cross opens: stay, come back later, finish now, or quit. */
export function QuitQuizDialog({ mode, onCancel, onConfirm, onFinish, onLater }: QuitQuizDialogProps) {
  // Paper: the panel sliding in.
  useSoundOnMount('open')
  const titleId = useId()
  const label = mode === 'mock-exam' ? PRACTICE_EXAM_LABEL.toLowerCase() : 'quiz'

  return (
    <Popup onClose={onCancel} labelledBy={titleId}>
      <PopupTitle id={titleId}>Leave this {label}?</PopupTitle>
      <p className="text-base">Quitting discards your answers.</p>
      <div className="flex flex-col gap-2.5">
        <Button size="main" className="w-full" onClick={onCancel}>
          Keep going
        </Button>
        {onLater && (
          <Button variant="edge" size="lg" className="h-[52px] w-full text-base" onClick={onLater}>
            Come back later
          </Button>
        )}
        {onFinish && (
          <Button variant="edge" size="lg" className="h-[52px] w-full text-base" data-tour="dialog-finish" onClick={onFinish}>
            Finish {label}
          </Button>
        )}
        <button
          type="button"
          onClick={onConfirm}
          className="min-h-[48px] rounded-full text-base font-semibold text-answer-incorrect focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
        >
          Quit {label}
        </button>
      </div>
    </Popup>
  )
}
