import { useEffect, useRef, useState, type CSSProperties } from 'react'
import { useNow } from '@/hooks/useBattle'
import { COUNTDOWN_MS, otherSeat, type BattleState, type Seat } from '@/lib/battle'
import { playerAccentStyle } from '@/lib/battleDisplay'
import { cardLevelTag } from '@/lib/battleDeck'
import { COIN_MS, cardLevel, roundCards, shortTopic, type BattleDraft } from '@/lib/battleDraft'
import { playSound } from '@/lib/soundEngine'
import { cn } from '@/lib/utils'

// **The coin flip** (docs/quiz-battle-redesign.md §3.10): a round whose pair
// no question covers starts with a coin tossed between its two cards. The host
// tossed it (lib/battleSession.ts `settleCoin`); both screens play the same
// toss to the round's clock — it starts `COIN_MS` before the count-in — land
// on the same face, lift the winning card and dim the other, and count the
// question in. It is short, so it can't be skipped.

/** Where the toss lands: the coin turns this far, so the winner's face is up. */
const LANDS_ON = { mine: 1800, theirs: 1980 } as const
/** When, into the toss, the coin hits the table. */
const LAND_MS = 1300

export function DeckCoinFlip({ battle, draft, index, me, opensAt }: {
  battle: BattleState
  draft: BattleDraft
  index: number
  me: Seat
  /** When the question opens, on this device's clock. */
  opensAt: number
}) {
  const now = useNow(true, 100)
  const opp = otherSeat(me)
  const at = roundCards(draft, index)
  const tossAt = opensAt - COUNTDOWN_MS - COIN_MS
  const [offset] = useState(() => Math.max(0, Date.now() - tossAt))

  // The toss and the landing, each heard once, and only if this screen saw it happen.
  const heard = useRef({ toss: false, land: false })
  useEffect(() => {
    const t = now - tossAt
    if (!heard.current.toss && t >= 0) {
      heard.current.toss = true
      if (t < 400) playSound('coinToss')
    }
    if (!heard.current.land && t >= LAND_MS) {
      heard.current.land = true
      if (t < LAND_MS + 400) playSound('coinLand')
    }
  }, [now, tossAt])
  const count = now >= opensAt - COUNTDOWN_MS ? Math.max(1, Math.ceil((opensAt - now) / 1000)) : null
  const lastCount = useRef<number | null>(null)
  useEffect(() => {
    if (count === null || lastCount.current === count) return
    lastCount.current = count
    playSound('countIn')
  }, [count])

  if (!at) return null
  const { cards, round } = at
  const winner = round.coin ?? 0
  const topic = round.topic ?? 'Any topic'
  const sides: { seat: Seat; tilt: number; out: number }[] = [
    { seat: me, tilt: -8, out: -14 },
    { seat: opp, tilt: 8, out: 14 },
  ]
  const style = {
    '--coin-offset': `-${offset}ms`,
    '--coin-end': `${winner === me ? LANDS_ON.mine : LANDS_ON.theirs}deg`,
  } as CSSProperties
  const names = [battle.players[0].name, battle.players[1].name]

  return (
    <div className="relative flex min-h-[60vh] flex-col items-center gap-3 pt-6 text-center" style={style} data-testid="battle-coin" data-winner={winner}>
      <h2 className="deck-display text-[30px] leading-tight">Coin flip</h2>
      <p className="max-w-[310px] text-sm leading-[1.4] text-[var(--deck-soft)]">
        No question covers both of these, so a coin decides which one this round is on.
      </p>

      <div className="relative mt-6 flex w-full items-start justify-between px-1.5">
        {sides.map(({ seat, tilt, out }) => (
          <div
            key={seat}
            style={{ ...playerAccentStyle(seat), '--tilt': `${tilt}deg`, '--tilt-out': `${out}deg` } as CSSProperties}
            className={cn(
              'deck-display flex h-[164px] w-[118px] flex-col justify-between rounded-[14px] border-2 border-[var(--player)] bg-[var(--player-vivid)] p-2.5 text-left text-base leading-[1.1]',
              seat === winner ? 'coin-win' : 'coin-lose',
            )}
            data-testid={`battle-coin-card-${seat}`}
          >
            <span className="font-sans text-[11px] font-bold">
              {seat === me ? 'Yours' : `${names[seat]}’s`} · {cardLevelTag(cardLevel(draft, seat, cards[seat]))}
            </span>
            <span className="line-clamp-4">{cards[seat]}</span>
          </div>
        ))}
      </div>

      <div className="relative -mt-14 h-[120px] w-[90px]" aria-hidden>
        <div className="absolute inset-x-0 top-0 h-[90px] [perspective:600px]">
          <div className="coin-spin absolute inset-0">
            {sides.map(({ seat }, i) => (
              <span
                key={seat}
                style={{ ...playerAccentStyle(seat), transform: i === 0 ? undefined : 'rotateY(180deg)' }}
                className="coin-face deck-display absolute inset-0 flex items-center justify-center rounded-full border-4 border-[color-mix(in_srgb,var(--player)_45%,white)] bg-[var(--player-vivid)] p-1.5 text-[13px] leading-[1.05] [hyphens:auto]"
              >
                <span className="line-clamp-3">{shortTopic(cards[seat])}</span>
              </span>
            ))}
          </div>
        </div>
        <span className="coin-shadow absolute bottom-0 left-[10px] h-3.5 w-[70px] rounded-[50%] bg-black" />
      </div>

      <div className="coin-say flex flex-col items-center gap-1.5" aria-live="polite" data-testid="battle-coin-result">
        <span style={playerAccentStyle(winner)} className="text-[13px] font-bold uppercase tracking-[.08em] text-[color-mix(in_srgb,var(--player)_55%,white)]">
          Round {index + 1} is on
        </span>
        <span className="deck-display text-[26px] leading-tight">{topic}</span>
      </div>

      {count !== null && (
        <p className="mt-auto flex h-[58px] w-full items-center justify-center gap-2.5 rounded-[18px] border border-[var(--deck-card-edge)] bg-[var(--deck-card)]" aria-live="assertive" data-testid="battle-countdown">
          <span className="text-[15px] font-semibold text-[var(--deck-soft)]">Question in</span>
          <span key={count} className="battle-count-pop deck-display text-[26px] tabular-nums">{count}</span>
        </p>
      )}
      <span className="sr-only">{`The coin landed on ${cards[winner]}, ${winner === me ? 'your card' : `${names[winner]}’s card`}.`}</span>
    </div>
  )
}

