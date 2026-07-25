import { useMemo } from 'react'

// A deck of flashcards laid out left-to-right and tilted in 3D, shown above the
// question-count picker on the quiz setup screen. The leading cards — the ones
// the configured quiz will actually pull — are lit in the primary colour; the
// grey cards behind them are the rest of the available pool.
//
// One lit card means one question. The deck itself is capped at MAX_CARDS
// because pools run into the hundreds and a denser stack stops reading as
// cards at all; past the cap the grey tail just means "there are more". The
// exact numbers live in the caption beneath it.

const MAX_CARDS = 16
const CARD_W = 34
const CARD_H = 48
// Resting horizontal step between cards. Each card sits in a shrinkable flex
// spacer of this width, so a deck too wide for its container simply overlaps
// more tightly instead of overflowing.
const CARD_STEP = 24

interface QuestionCardStackProps {
  /** Questions available under the current filters. */
  total: number
  /** Questions the configured quiz will actually pull. */
  selected: number
  className?: string
}

export function QuestionCardStack({ total, selected, className = '' }: QuestionCardStackProps) {
  const { cardCount, litCount, litQuestions } = useMemo(() => {
    const cardCount = Math.min(Math.max(total, 0), MAX_CARDS)
    const litQuestions = Math.max(0, Math.min(selected, total))
    return { cardCount, litCount: Math.min(litQuestions, cardCount), litQuestions }
  }, [total, selected])

  if (cardCount === 0) return null

  return (
    <div
      role="img"
      aria-label={`${litQuestions} of ${total} available question${total !== 1 ? 's' : ''} selected`}
      className={`flex items-center justify-center ${className}`}
      style={{ height: CARD_H + 10 }}
    >
      {Array.from({ length: cardCount }, (_, i) => {
        const lit = i < litCount
        return (
          <div
            key={i}
            aria-hidden
            className="relative"
            style={{ flex: `0 1 ${CARD_STEP}px`, height: CARD_H, zIndex: i }}
          >
            <div
              className={[
                'absolute inset-y-0 left-0 rounded-[5px] border transition-all duration-200 motion-reduce:transition-none',
                // The thick left border is the card's near edge catching light —
                // the depth cue that keeps overlapping cards legible as cards.
                'border-l-[3px]',
                lit
                  ? 'bg-primary border-primary border-l-primary-foreground/45'
                  : 'bg-muted-foreground/20 border-muted-foreground/30 border-l-muted-foreground/50',
              ].join(' ')}
              style={{
                width: CARD_W,
                // Per-card perspective (rather than a shared one on the parent)
                // so every card in the row is tilted identically — the deck
                // reads as one stack instead of fanning around a vanishing point.
                transform: `perspective(320px) rotateY(-26deg) translateY(${lit ? -5 : 0}px)`,
                boxShadow: lit
                  ? '-4px 4px 10px -3px hsl(var(--primary) / 0.45)'
                  : '-4px 3px 8px -4px rgb(0 0 0 / 0.45)',
              }}
            />
          </div>
        )
      })}
      {/* Trailing room so the final card isn't clipped by the container edge. */}
      <div aria-hidden className="shrink-0" style={{ width: CARD_W }} />
    </div>
  )
}
