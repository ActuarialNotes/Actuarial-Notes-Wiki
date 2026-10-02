import { useLocation } from 'react-router-dom'
import { QuizResumeButton } from '@/components/QuizResumeButton'
import { BattleQueueButton } from '@/components/BattleQueueButton'
import { useBattleQueueVisible, useFollowBattleMatch, useQuizResumeVisible } from '@/hooks/useResumeDock'

/**
 * The bottom-edge dock for what the reader has left running elsewhere: a quiz
 * in progress (components/QuizResumeButton.tsx) and a place in the Quiz Battle
 * queue (components/BattleQueueButton.tsx), side by side when both are waiting.
 *
 * It rides above whatever else is parked on the bottom edge — a page's action
 * bar (`--action-bar-height`) or the concept popup's split pane
 * (`--concept-split-height`) — and floats over that pane (`z-[45]` over its
 * `z-40`, as the Cowork button does) but under every dialog and scrim
 * (`z-50`+). In a page move it is chrome, held still while the sheets slide
 * under it (`paper-chrome-resume` in index.css) — one element carries that
 * name, which is why the two pills share a dock rather than each floating.
 */
export function ResumeDock() {
  const { pathname } = useLocation()
  const quiz = useQuizResumeVisible(pathname)
  const battle = useBattleQueueVisible()
  useFollowBattleMatch()

  if (!quiz && !battle) return null

  return (
    <div
      style={{
        bottom: 'calc(max(var(--concept-split-height, 0px), var(--action-bar-height, 0px)) + 1rem)',
      }}
      className="paper-chrome-resume fixed left-0 right-0 z-[45] flex flex-wrap items-end justify-center gap-2 px-4 pointer-events-none lg:left-[var(--sidebar-width)]"
    >
      {quiz && <QuizResumeButton />}
      {battle && <BattleQueueButton />}
    </div>
  )
}
