import { useMemo, useState } from 'react'
import { ChevronDown } from 'lucide-react'
import { PlayerTile } from '@/components/battle/PlayerTile'
import { BattleQuestionCard } from '@/components/battle/BattleQuestionCard'
import { SEATS, roundTaker, type BattleState, type Seat } from '@/lib/battle'
import { answerFor, playerAccentStyle } from '@/lib/battleDisplay'
import { questionPreview } from '@/lib/questionPreview'
import { MarkdownText } from '@/components/MarkdownText'
import type { Question } from '@/lib/parser'
import { cn } from '@/lib/utils'

/** Paper confetti in the winner's colour and gold. Decorative; gone with reduced motion. */
export function Confetti({ seat }: { seat: Seat }) {
  const pieces = useMemo(
    () => Array.from({ length: 28 }, (_, i) => ({
      left: (i * 37) % 100,
      delay: (i % 7) * 90,
      drift: ((i * 53) % 60) - 30,
      spin: ((i * 97) % 540) + 180,
      gold: i % 3 === 0,
      wide: i % 2 === 0,
    })),
    [],
  )
  return (
    <div aria-hidden className="pointer-events-none absolute inset-x-0 top-0 h-0 overflow-visible" style={playerAccentStyle(seat)}>
      {pieces.map((p, i) => (
        <span
          key={i}
          className={cn('battle-confetti absolute top-0 block rounded-[1px]', p.gold ? 'bg-amber-400' : 'bg-[var(--player)]')}
          style={{
            left: `${p.left}%`,
            width: p.wide ? 8 : 5,
            height: p.wide ? 5 : 9,
            animationDelay: `${p.delay}ms`,
            ['--drift' as string]: `${p.drift}px`,
            ['--spin' as string]: `${p.spin}deg`,
          }}
        />
      ))}
    </div>
  )
}

/** One question of the battle, to look back over: who took it, and the question itself on a tap. */
export function ReviewRow({ battle, index, question }: { battle: BattleState; index: number; question: Question | undefined }) {
  const [open, setOpen] = useState(false)
  const round = battle.rounds[index]
  const taker = roundTaker(round)
  const picks = SEATS.flatMap(seat => {
    const a = answerFor(round, seat)
    return a ? [{ seat, choice: a.choice, correct: a.correct }] : []
  })
  return (
    <li className="overflow-hidden rounded-lg bg-card">
      <button
        type="button"
        onClick={() => setOpen(v => !v)}
        aria-expanded={open}
        className="flex w-full items-center gap-3 px-3 py-2.5 text-left transition-colors hover:bg-accent/40 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-ring"
      >
        <span className="w-6 shrink-0 text-center text-xs font-semibold tabular-nums text-muted-foreground">{index + 1}</span>
        {taker !== null ? (
          <PlayerTile seat={taker} player={battle.players[taker]} size={22} className="ring-offset-1" />
        ) : (
          <span className="h-[22px] w-[22px] shrink-0 rounded-full bg-muted" aria-hidden />
        )}
        <span className="min-w-0 flex-1 truncate text-sm">
          {question ? <MarkdownText inline>{questionPreview(question)}</MarkdownText> : round.questionId}
        </span>
        <ChevronDown className={cn('h-4 w-4 shrink-0 text-muted-foreground transition-transform', !open && '-rotate-90')} aria-hidden />
      </button>
      {open && question && (
        <div className="px-1 pb-1">
          <BattleQuestionCard
            question={question}
            players={battle.players}
            picker={null}
            onPick={() => {}}
            picks={picks}
            revealed
          />
        </div>
      )}
    </li>
  )
}
