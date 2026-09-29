import { memo, useRef, useState } from 'react'
import { ChevronDown } from 'lucide-react'
import { Card, CardContent, CardHeader } from '@/components/ui/card'
import { MarkdownText, MARKDOWN_LIST_CLASS, QUESTION_MD_CLASS } from '@/components/MarkdownText'
import { PlayerTile } from '@/components/battle/PlayerTile'
import { playerAccentStyle } from '@/lib/battleDisplay'
import type { BattlePlayer, Seat } from '@/lib/battle'
import type { Question } from '@/lib/parser'
import { cn } from '@/lib/utils'

// The stem and the options are memoised on their text: a battle's page
// redraws on every change of state (and, online, on every heartbeat), and
// re-typesetting a page of KaTeX that many times is what makes a phone lag.
const Stem = memo(function Stem({ text }: { text: string }) {
  return (
    <MarkdownText className={`text-base leading-relaxed [&_p]:my-2 [&_p:first-child]:mt-0 [&_p:last-child]:mb-0 [&_table]:text-sm [&_th]:text-left [&_td]:pr-4 ${MARKDOWN_LIST_CLASS}`}>
      {text}
    </MarkdownText>
  )
})

const OptionText = memo(function OptionText({ text }: { text: string }) {
  return (
    <MarkdownText inline className="flex-1 [&_p]:my-0 [&_table]:text-xs [&_th]:text-left [&_td]:pr-3">
      {text}
    </MarkdownText>
  )
})

const Solution = memo(function Solution({ text }: { text: string }) {
  return <MarkdownText className={QUESTION_MD_CLASS}>{text}</MarkdownText>
})

export interface OptionPick {
  seat: Seat
  choice: string | null
  correct: boolean
}

export function BattleQuestionCard({
  question,
  players,
  picker,
  onPick,
  locked,
  picks,
  revealed,
  pickSound = 'select',
  struck = null,
}: {
  question: Question
  players: readonly [BattlePlayer, BattlePlayer]
  /** Who may pick an option now — their colour rings the options. Null: nobody. */
  picker: Seat | null
  onPick: (choice: string) => void
  /** This device's own answer: in, and not yet revealed. */
  locked?: { seat: Seat; choice: string } | null
  /**
   * Answers already public — every one at the reveal, and on one screen a
   * missed buzz as soon as it misses (it was said out loud, so to speak).
   */
  picks: OptionPick[]
  revealed: boolean
  /** The press cue; `none` when the handler plays its own (a lock-in). */
  pickSound?: 'select' | 'none'
  /** Bayesian Update: the wrong option struck from this player's screen. */
  struck?: string | null
}) {
  const [showSolution, setShowSolution] = useState(false)
  // A pointer that moves more than a few pixels between down and click was
  // scrolling the question, not picking an option — same guard as the quiz's.
  const pointerStart = useRef<number | null>(null)
  const scrolled = useRef(false)

  return (
    <Card className="w-full" data-testid="battle-question" data-question-id={question.id}>
      <CardHeader className="pb-3">
        <Stem text={question.stem} />
      </CardHeader>
      <CardContent className="space-y-2">
        <div
          role="group"
          aria-label="Answer options"
          style={picker !== null ? playerAccentStyle(picker) : undefined}
          className="space-y-2"
        >
          {question.options.map((option, idx) => {
            const isAnswer = option.key === question.answer
            const pickedBy = picks.filter(p => p.choice === option.key)
            const missed = pickedBy.some(p => !p.correct)
            // Struck by this player's Bayesian Update: ruled out on this screen, not a verdict.
            const struckOut = !revealed && !missed && struck === option.key
            const isLocked = locked?.choice === option.key
            const pickable = picker !== null && !revealed && !missed && !struckOut && !locked
            return (
              <div
                key={option.key}
                role="button"
                tabIndex={pickable ? 0 : -1}
                aria-disabled={!pickable}
                aria-label={`Option ${option.key}`}
                data-sound={pickable ? pickSound : 'none'}
                data-math-magnify="none"
                data-testid={`battle-option-${option.key}`}
                data-struck={struckOut || undefined}
                onPointerDown={e => { pointerStart.current = e.clientY; scrolled.current = false }}
                onPointerMove={e => {
                  if (pointerStart.current !== null && Math.abs(e.clientY - pointerStart.current) > 8) scrolled.current = true
                }}
                onClick={() => { if (pickable && !scrolled.current) onPick(option.key) }}
                onKeyDown={e => {
                  if ((e.key === 'Enter' || e.key === ' ') && pickable) {
                    e.preventDefault()
                    onPick(option.key)
                  }
                }}
                className={cn(
                  'flex w-full items-start gap-3 rounded-lg px-4 py-3 text-left text-sm font-medium transition-colors',
                  'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring',
                  revealed && isAnswer && 'bg-green-50 text-green-900 dark:bg-green-950 dark:text-green-100',
                  (revealed || missed) && !isAnswer && missed && 'bg-red-50 text-red-900 dark:bg-red-950 dark:text-red-100',
                  revealed && !isAnswer && !missed && 'bg-muted/40 text-muted-foreground opacity-60',
                  struckOut && 'bg-muted/40 text-muted-foreground opacity-50',
                  !revealed && !missed && isLocked && 'bg-[var(--player-soft)] ring-2 ring-[var(--player)]',
                  !revealed && !missed && !isLocked && pickable && 'cursor-pointer bg-muted/40 hover:bg-[var(--player-soft)] hover:ring-1 hover:ring-[var(--player-muted)]',
                  !revealed && !missed && !isLocked && !pickable && 'cursor-default bg-muted/40',
                  !revealed && locked && !isLocked && 'opacity-60',
                )}
                style={isLocked && locked ? playerAccentStyle(locked.seat) : undefined}
              >
                <span
                  aria-hidden
                  className="mt-0.5 flex h-6 w-6 shrink-0 items-center justify-center rounded-full border-2 border-current text-xs font-bold"
                >
                  {option.key}
                </span>
                <span className={cn('min-w-0 flex-1', (missed || struckOut) && !revealed && 'line-through decoration-2 opacity-70')}>
                  <OptionText text={option.text} />
                </span>
                {pickedBy.length > 0 && (
                  <span className="flex shrink-0 items-center gap-1 self-center">
                    {pickedBy.map(p => (
                      <PlayerTile key={p.seat} seat={p.seat} player={players[p.seat]} size={20} className="ring-offset-1" />
                    ))}
                  </span>
                )}
                {isLocked && !revealed && (
                  <span className="shrink-0 self-center text-xs font-semibold text-[var(--player)]">Locked in</span>
                )}
                {pickable && (
                  <kbd
                    aria-hidden
                    className="mt-0.5 hidden h-5 min-w-[1.25rem] shrink-0 items-center justify-center self-start rounded border border-border bg-muted/70 px-1 font-mono text-[10px] font-semibold text-muted-foreground/70 sm:flex"
                  >
                    {idx + 1}
                  </kbd>
                )}
              </div>
            )
          })}
        </div>

        {revealed && question.explanation && (
          <div className="pt-2">
            <button
              type="button"
              onClick={() => setShowSolution(v => !v)}
              aria-expanded={showSolution}
              className="flex items-center gap-1.5 rounded-md text-sm font-medium text-muted-foreground transition-colors hover:text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
            >
              <ChevronDown className={cn('h-4 w-4 transition-transform', !showSolution && '-rotate-90')} aria-hidden />
              {showSolution ? 'Hide solution' : 'Show solution'}
            </button>
            {showSolution && (
              <div className="mt-3 rounded-lg bg-muted/40 p-4">
                <Solution text={question.explanation} />
              </div>
            )}
          </div>
        )}
      </CardContent>
    </Card>
  )
}
