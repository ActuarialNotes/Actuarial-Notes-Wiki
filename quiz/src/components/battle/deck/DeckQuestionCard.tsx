import { memo, useEffect, useRef, useState, type ReactNode } from 'react'
import { ChevronDown } from 'lucide-react'
import { MarkdownText, MARKDOWN_LIST_CLASS, QUESTION_MD_CLASS } from '@/components/MarkdownText'
import { PlayerCard } from '@/components/battle/deck/DeckParts'
import { useNow } from '@/hooks/useBattle'
import { playSound } from '@/lib/soundEngine'
import { playerAccent, playerAccentStyle } from '@/lib/battleDisplay'
import type { BattlePlayer, Seat } from '@/lib/battle'
import type { Question } from '@/lib/parser'
import { formatClock } from '@/lib/quizTiming'
import { cn } from '@/lib/utils'

// **A round, as a question card** (docs/quiz-battle-redesign.md §3.9): the
// round's name and its topic as chips in the players' colours, a fuse along
// the top for the clock, the stem, and the options as rows each led by a
// playing-card index. The same card serves both ways of playing; who may pick
// and what a pick does are the caller's.

const Stem = memo(function Stem({ text }: { text: string }) {
  return (
    <MarkdownText className={`text-[17px] font-medium leading-[1.45] [&_p]:my-2 [&_p:first-child]:mt-0 [&_p:last-child]:mb-0 [&_table]:text-sm [&_th]:text-left [&_td]:pr-4 ${MARKDOWN_LIST_CLASS}`}>
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

export interface DeckPick {
  seat: Seat
  choice: string | null
  correct: boolean
}

/** A topic chip: whose topic it was, in their colour — both colours, split, when both picked it. */
export function TopicChip({ name, pickers }: { name: string; pickers: readonly Seat[] }) {
  const both = pickers.length === 2
  const seat = pickers[0]
  return (
    <span
      style={both ? { background: `linear-gradient(135deg, ${playerAccent(0, 0.28)} 50%, ${playerAccent(1, 0.28)} 50%)` } : seat !== undefined ? playerAccentStyle(seat) : undefined}
      className={cn(
        'max-w-[14rem] truncate rounded-lg px-2 py-1 text-xs font-bold',
        both ? 'text-white'
          : seat !== undefined ? 'bg-[var(--player-soft)] text-[var(--player)]'
          : 'bg-[var(--deck-raised-edge)] text-[var(--deck-soft)]',
      )}
      data-testid="battle-round-topic"
    >
      {name}
    </span>
  )
}

/** The clock's fuse along the top of the card, and the time left at its foot. */
function useClock(opensAt: number, deadline: number, running: boolean) {
  const now = useNow(running, 200)
  const total = Math.max(1, deadline - opensAt)
  const left = Math.max(0, deadline - now)
  return { left, share: Math.min(1, left / total) }
}

export function DeckQuestionCard({
  question,
  players,
  label,
  final,
  topic,
  clock,
  picker,
  selected,
  locked,
  onPick,
  picks,
  revealed,
  struck = null,
  ruledOut = [],
  pickSound = 'select',
  footer,
}: {
  question: Question
  players: readonly [BattlePlayer, BattlePlayer]
  /** "Round 1 of 3", "Final ×2". */
  label: string
  final: boolean
  topic?: ReactNode
  /** The clock, while it runs: when the round opened and when it closes. */
  clock: { opensAt: number; deadline: number; running: boolean } | null
  /** Who may pick an option now — their colour rings it. Null: nobody. */
  picker: Seat | null
  /** An option chosen and not locked in yet. */
  selected?: string | null
  /** This device's own answer, locked in and not yet revealed. */
  locked?: { seat: Seat; choice: string } | null
  onPick: (choice: string) => void
  /** Answers already public. */
  picks: DeckPick[]
  revealed: boolean
  /** Bayesian Update's strike on this player's screen. */
  struck?: string | null
  /** Options already tried and missed (one screen). */
  ruledOut?: readonly string[]
  pickSound?: 'select' | 'none'
  footer?: ReactNode
}) {
  const [showSolution, setShowSolution] = useState(false)
  const { left, share } = useClock(clock?.opensAt ?? 0, clock?.deadline ?? 1, !!clock?.running)
  const low = !!clock && left <= 10_000
  const seconds = Math.ceil(left / 1000)

  // The last five seconds of the clock, heard — noise only, as before.
  const lastTick = useRef<number | null>(null)
  useEffect(() => {
    if (!clock?.running || seconds > 5 || seconds <= 0) { lastTick.current = null; return }
    if (lastTick.current === seconds) return
    lastTick.current = seconds
    playSound('clockTick')
  }, [clock?.running, seconds])

  const pointerStart = useRef<number | null>(null)
  const scrolled = useRef(false)

  return (
    <div
      className="relative flex flex-col gap-3.5 overflow-hidden rounded-[22px] border-2 border-[var(--deck-raised-edge)] bg-[var(--deck-raised)] p-4"
      data-testid="battle-question"
      data-question-id={question.id}
    >
      {clock && (
        <div
          aria-hidden
          className={cn('absolute left-0 top-0 h-1 transition-[width] duration-200 ease-linear', low ? 'bg-amber-400' : 'bg-white')}
          style={{ width: `${share * 100}%` }}
        />
      )}
      <div className="flex items-center justify-between gap-2 text-xs font-bold">
        <span className={cn('shrink-0 uppercase tracking-[.04em]', final ? 'text-[var(--deck-gold)]' : 'text-[var(--deck-label)]')}>{label}</span>
        {topic && <span className="flex min-w-0 items-center gap-1">{topic}</span>}
      </div>

      <Stem text={question.stem} />

      <div role="group" aria-label="Answer options" style={picker !== null ? playerAccentStyle(picker) : undefined} className="mt-1 flex flex-col gap-2">
        {question.options.map(option => {
          const isAnswer = option.key === question.answer
          const pickedBy = picks.filter(p => p.choice === option.key)
          const missed = pickedBy.some(p => !p.correct) || (!revealed && ruledOut.includes(option.key))
          const struckOut = !revealed && !missed && struck === option.key
          const isLocked = locked?.choice === option.key
          const isSelected = !locked && selected === option.key
          const pickable = picker !== null && !revealed && !missed && !struckOut && !locked
          return (
            <div
              key={option.key}
              role="button"
              tabIndex={pickable ? 0 : -1}
              aria-disabled={!pickable}
              aria-pressed={isSelected || isLocked}
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
              style={(isLocked || isSelected) && (locked?.seat ?? picker) !== null ? playerAccentStyle((locked?.seat ?? picker)!) : undefined}
              className={cn(
                'flex min-h-14 items-center gap-3 rounded-[14px] border-2 px-3 py-2.5 text-left text-sm leading-[1.35] transition-colors',
                'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/60',
                revealed && isAnswer && 'border-green-500 bg-green-950 text-green-50',
                revealed && !isAnswer && missed && 'border-red-500/70 bg-red-950 text-red-50',
                !revealed && missed && 'border-red-500/50 bg-red-950/60 text-red-100',
                revealed && !isAnswer && !missed && 'border-[var(--deck-card-edge)] bg-[var(--deck-card)] opacity-50',
                struckOut && 'border-[var(--deck-card-edge)] bg-[var(--deck-card)] opacity-40',
                !revealed && !missed && !struckOut && (isLocked || isSelected) && 'border-[var(--player)] bg-[var(--player-soft)]',
                !revealed && !missed && !struckOut && !isLocked && !isSelected && 'border-[var(--deck-card-edge)] bg-[var(--deck-card)]',
                pickable && !isSelected && 'cursor-pointer hover:border-[var(--player-muted)]',
                !revealed && locked && !isLocked && 'opacity-50',
              )}
            >
              <span
                aria-hidden
                className={cn(
                  'deck-display flex h-10 w-[30px] shrink-0 items-center justify-center rounded-md text-[17px]',
                  (isLocked || isSelected) && !revealed ? 'bg-[var(--player)] text-[var(--deck-ground)]' : 'bg-[#F5F3F8] text-[var(--deck-ground)]',
                )}
              >
                {option.key}
              </span>
              <span className={cn('min-w-0 flex-1', (missed || struckOut) && !revealed && 'line-through decoration-2 opacity-70')}>
                <OptionText text={option.text} />
              </span>
              {pickedBy.length > 0 && (
                <span className="flex shrink-0 items-center gap-1">
                  {pickedBy.map(p => <PlayerCard key={p.seat} seat={p.seat} player={players[p.seat]} size="xs" style={{ width: 20, height: 28, borderRadius: 5 }} />)}
                </span>
              )}
              {isLocked && !revealed && <span className="shrink-0 text-xs font-semibold text-[var(--player)]">Locked in</span>}
            </div>
          )
        })}
      </div>

      {revealed && question.explanation && (
        <div>
          <button
            type="button"
            onClick={() => setShowSolution(v => !v)}
            aria-expanded={showSolution}
            className="flex items-center gap-1.5 rounded-md text-sm font-semibold text-[var(--deck-soft)] hover:text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/60"
          >
            <ChevronDown className={cn('h-4 w-4 transition-transform', !showSolution && '-rotate-90')} aria-hidden />
            {showSolution ? 'Hide solution' : 'Show solution'}
          </button>
          {showSolution && (
            <div className="mt-3 rounded-xl bg-[var(--deck-card)] p-4">
              <Solution text={question.explanation} />
            </div>
          )}
        </div>
      )}

      {(clock || footer) && (
        <div className="mt-auto flex items-end justify-between gap-3">
          <div className="min-w-0 flex-1">{footer}</div>
          {clock && (
            <span className={cn('deck-display shrink-0 text-[22px] tabular-nums', low && 'text-amber-400')} role="timer" aria-label={`${seconds} seconds left`}>
              {formatClock(seconds)}
            </span>
          )}
        </div>
      )}
    </div>
  )
}

/** The 3-2-1 before a question, on the card's own table. */
export function DeckCountdown({ label, final, opensAt, topic }: {
  label: string
  final: boolean
  opensAt: number
  topic?: ReactNode
}) {
  const now = useNow(true, 100)
  const n = Math.max(1, Math.ceil((opensAt - now) / 1000))
  const last = useRef<number | null>(null)
  useEffect(() => {
    if (last.current === n) return
    last.current = n
    playSound('countIn')
  }, [n])
  return (
    <div
      className="flex min-h-[40vh] flex-col items-center justify-center gap-4 rounded-[22px] border-2 border-dashed border-[var(--deck-raised-edge)] px-4 text-center"
      data-testid="battle-countdown"
    >
      <p className={cn('deck-label', final && '!text-[var(--deck-gold)]')}>{label}</p>
      <span key={n} className="battle-count-pop deck-display text-8xl tabular-nums leading-none" aria-live="assertive">{n}</span>
      {topic}
      {final && <span className="rounded-full bg-amber-400/15 px-3 py-1 text-sm font-semibold text-[var(--deck-gold)]">Double points</span>}
    </div>
  )
}
