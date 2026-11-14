import { useEffect, useState, type ButtonHTMLAttributes, type CSSProperties, type ReactNode } from 'react'
import { ChevronLeft, X } from 'lucide-react'
import { OverlayPortal } from '@/components/ui/OverlayPortal'
import { battleExamKey, battleExamName, playerAccentStyle, playerInitials } from '@/lib/battleDisplay'
import { examAccentStyle } from '@/lib/examColors'
import { examMonogram } from '@/lib/examLogo'
import type { BattlePlayer, Seat } from '@/lib/battle'
import { cn } from '@/lib/utils'

// **The Deck's parts** (docs/quiz-battle-redesign.md §2): the scope that
// draws the table, its controls — a solid white primary, an outlined
// secondary, square icon buttons — and the cards the whole flow is built from:
// a player's card in their colour, an exam as a deck, and the step header
// every screen before the first question carries.

const FONT_LINK_ID = 'battle-deck-font'
const FONT_HREF = 'https://fonts.googleapis.com/css2?family=Bricolage+Grotesque:opsz,wght@12..96,800&family=Inter:wght@400;500;600;700&display=swap'

/**
 * The Deck's fonts, loaded from Google Fonts the first time a reader opens
 * Quiz Battle — a `<link>` from this lazy chunk, so the rest of the app never
 * pays for them.
 */
function useDeckFont() {
  useEffect(() => {
    if (typeof document === 'undefined' || document.getElementById(FONT_LINK_ID)) return
    const link = document.createElement('link')
    link.id = FONT_LINK_ID
    link.rel = 'stylesheet'
    link.href = FONT_HREF
    document.head.appendChild(link)
  }, [])
}

/**
 * The table: the dark ground and the Deck's tokens, under `dark` so the app's
 * own components drawn on it (a concept tile, a solution) turn dark with it.
 * A column a phone wide, centred on a wider screen.
 */
export function DeckScope({ children, className }: { children: ReactNode; className?: string }) {
  useDeckFont()
  return (
    <div
      className={cn('battle-deck dark min-h-[calc(100dvh-3.5rem)] lg:min-h-screen', className)}
      data-testid="battle-deck"
    >
      <div className="mx-auto w-full max-w-md">{children}</div>
    </div>
  )
}

export function DeckIconButton({
  label,
  children,
  className,
  ...button
}: { label: string; children: ReactNode } & ButtonHTMLAttributes<HTMLButtonElement>) {
  return (
    <button
      type="button"
      aria-label={label}
      title={label}
      {...button}
      className={cn(
        'flex h-11 w-11 shrink-0 items-center justify-center rounded-[14px] bg-[var(--deck-icon)] text-white transition-colors',
        'hover:bg-[var(--deck-raised)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/60',
        className,
      )}
    >
      {children}
    </button>
  )
}

export function DeckBackButton({ onClick, label = 'Back', ...rest }: { onClick: () => void; label?: string } & ButtonHTMLAttributes<HTMLButtonElement>) {
  return (
    <DeckIconButton label={label} onClick={onClick} {...rest}>
      <ChevronLeft className="h-5 w-5" strokeWidth={2.2} aria-hidden />
    </DeckIconButton>
  )
}

/** The committing action: solid white, 58 px tall. */
export function DeckPrimaryButton({ className, children, ...button }: ButtonHTMLAttributes<HTMLButtonElement>) {
  return (
    <button
      type="button"
      {...button}
      className={cn(
        'flex h-[58px] w-full items-center justify-center gap-2.5 rounded-[18px] bg-white px-4 text-[17px] font-bold text-[var(--deck-ground)] transition-[transform,background-color]',
        'hover:bg-white/90 active:scale-[0.99] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/60 focus-visible:ring-offset-2 focus-visible:ring-offset-[var(--deck-ground)]',
        'disabled:cursor-not-allowed disabled:bg-[#2A2533] disabled:text-[var(--deck-dim)] disabled:active:scale-100',
        className,
      )}
    >
      {children}
    </button>
  )
}

/** A second way on: outlined, 50 px tall. */
export function DeckSecondaryButton({ className, children, ...button }: ButtonHTMLAttributes<HTMLButtonElement>) {
  return (
    <button
      type="button"
      {...button}
      className={cn(
        'flex h-[50px] w-full items-center justify-center gap-2 rounded-2xl border border-[var(--deck-raised-edge)] bg-transparent px-3 text-[15px] font-semibold text-white transition-colors',
        'hover:bg-[var(--deck-card)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/60 disabled:opacity-50',
        className,
      )}
    >
      {children}
    </button>
  )
}

/** The raised panel cards are laid out on. */
export function DeckTable({ children, className, ...rest }: { children: ReactNode; className?: string } & React.HTMLAttributes<HTMLDivElement>) {
  return (
    <div {...rest} className={cn('relative rounded-[28px] border border-[var(--deck-table-edge)] bg-[var(--deck-table)]', className)}>
      {children}
    </div>
  )
}

const CARD_SIZES = {
  xs: { w: 32, h: 44, letter: 18, radius: 7 },
  sm: { w: 78, h: 108, letter: 38, radius: 12 },
  md: { w: 96, h: 134, letter: 46, radius: 14 },
  lg: { w: 120, h: 168, letter: 64, radius: 16 },
} as const

/**
 * A player's card: their initial on a field of their colour (style guide §2.3 —
 * identity, never a verdict), with their name under it when there's room.
 */
export function PlayerCard({
  seat,
  player,
  size = 'md',
  caption,
  className,
  style,
}: {
  seat: Seat
  player: Pick<BattlePlayer, 'name'> | null
  size?: keyof typeof CARD_SIZES
  /** The name or a word under the initial — none on the smallest card. */
  caption?: ReactNode
  className?: string
  style?: CSSProperties
}) {
  const s = CARD_SIZES[size]
  return (
    <span
      aria-hidden
      style={{ ...playerAccentStyle(seat), width: s.w, height: s.h, borderRadius: s.radius, ...style }}
      className={cn(
        'inline-flex shrink-0 flex-col items-center justify-center gap-0.5 bg-[var(--player-vivid)] text-white',
        size !== 'xs' && 'border-[3px] border-[var(--player)] shadow-[0_14px_30px_var(--player-muted)]',
        className,
      )}
    >
      <span className="deck-display leading-none" style={{ fontSize: s.letter }}>
        {player ? playerInitials(player.name).slice(0, 1) : '?'}
      </span>
      {caption && size !== 'xs' && <span className="max-w-full truncate px-1 text-xs font-bold">{caption}</span>}
    </span>
  )
}

/** An exam as a deck: its monogram on a card in the exam's colour, another behind it. */
export function ExamDeckIcon({ exam, small = false }: { exam: string; small?: boolean }) {
  const key = battleExamKey(exam)
  const mono = key ? examMonogram(key) : null
  const lines = mono ? mono.lines : [battleExamName(exam).replace(/^Exam\s+/, '').slice(0, 3)]
  const style = key ? examAccentStyle(key) : undefined
  const face = lines.map((l, i) => <span key={i} className="block">{l}</span>)
  if (small) {
    return (
      <span
        aria-hidden
        style={style}
        className={cn('deck-display flex h-[30px] w-[22px] shrink-0 flex-col items-center justify-center rounded-[5px] bg-[var(--exam-accent-vivid,#6B6478)] text-center leading-none', lines.length > 1 || lines[0].length > 2 ? 'text-[8px]' : 'text-[12px]')}
      >
        {face}
      </span>
    )
  }
  return (
    <span aria-hidden style={style} className="relative block h-10 w-[30px] shrink-0">
      <span className="absolute left-1 top-0 h-9 w-[26px] rounded-[5px] bg-[var(--exam-accent-muted,#3A3445)]" />
      <span className={cn('deck-display absolute left-0 top-1 flex h-9 w-[26px] flex-col items-center justify-center rounded-[5px] bg-[var(--exam-accent-vivid,#6B6478)] text-center leading-none', lines.length > 1 || lines[0].length > 2 ? 'text-[9px]' : 'text-[15px]')}>
        {face}
      </span>
    </span>
  )
}

/**
 * The step header every screen before the first question carries. Phase 1
 * has one step, the topic pick; the draft that will add Strike and Deal is
 * phase 2. The current step is solid white, a done one grey.
 */
export function StepHeader({ steps, current, aside }: {
  steps: readonly string[]
  /** The index of the current step; `steps.length` once every step is done. */
  current: number
  /** The clock, or the exam's name, at the top right. */
  aside?: ReactNode
}) {
  return (
    <div className="flex h-11 items-center justify-between gap-3">
      <ol aria-label="Before the battle" className="flex gap-1.5">
        {steps.map((step, i) => (
          <li
            key={step}
            aria-current={i === current ? 'step' : undefined}
            className={cn(
              'flex h-7 items-center rounded-full px-3 text-xs font-bold',
              i === current ? 'bg-white text-[var(--deck-ground)]'
                : i < current ? 'bg-[var(--deck-raised-edge)] text-[var(--deck-soft)]'
                : 'border border-[var(--deck-card-edge)] text-[var(--deck-dim)]',
            )}
          >
            {step}
          </li>
        ))}
      </ol>
      {aside}
    </div>
  )
}

/**
 * A sheet over the table — the exam list, the settings. Portalled to the body,
 * so it carries the Deck's scope itself.
 */
export function DeckSheet({ title, onClose, children }: { title: string; onClose: () => void; children: ReactNode }) {
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => { if (e.key === 'Escape') onClose() }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [onClose])
  return (
    <OverlayPortal>
      {/* Portalled out of the page, so it carries the battle's style scope with it. */}
      <div className="battle-css" style={{ display: 'contents' }}>
      <div className="battle-deck dark fixed inset-0 z-[80] flex items-end justify-center bg-transparent sm:items-center paper-scrim" role="dialog" aria-modal="true" aria-label={title}>
        <div className="fixed inset-0 bg-black/60 backdrop-blur-sm" onClick={onClose} aria-hidden />
        <div className="relative z-10 max-h-[85dvh] w-full max-w-md overflow-y-auto rounded-t-[28px] border border-[var(--deck-table-edge)] bg-[var(--deck-table)] p-5 sm:rounded-[28px]">
          <div className="mb-4 flex items-center justify-between gap-3">
            <h2 className="deck-display text-2xl">{title}</h2>
            <DeckIconButton label="Close" onClick={onClose}>
              <X className="h-5 w-5" aria-hidden />
            </DeckIconButton>
          </div>
          {children}
        </div>
      </div>
      </div>
    </OverlayPortal>
  )
}

/** One choice in a sheet's row of choices — chosen goes solid white. */
export function DeckChoice({ selected, className, children, ...button }: { selected: boolean } & ButtonHTMLAttributes<HTMLButtonElement>) {
  return (
    <button
      type="button"
      role="radio"
      aria-checked={selected}
      {...button}
      className={cn(
        'flex min-h-11 items-center justify-center gap-2 rounded-xl px-3 text-sm font-semibold transition-colors',
        'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/60 disabled:opacity-40',
        selected ? 'bg-white text-[var(--deck-ground)]' : 'border border-[var(--deck-card-edge)] bg-[var(--deck-card)] text-[var(--deck-soft)] hover:text-white',
        className,
      )}
    >
      {children}
    </button>
  )
}

/** The exams a battle can be played on, as a sheet of decks. */
export function ExamSheet({
  exams,
  current,
  onPick,
  onClose,
  note,
}: {
  exams: readonly { exam: string; count: number }[]
  current: string
  onPick: (exam: string) => void
  onClose: () => void
  /** A word under an exam — how many are waiting for it in the lobby. */
  note?: (exam: string) => string | null
}) {
  return (
    <DeckSheet title="Change exam" onClose={onClose}>
      <div role="radiogroup" aria-label="Exam" className="flex flex-col gap-2">
        {exams.map(({ exam, count }) => {
          const extra = note?.(exam)
          return (
            <button
              key={exam}
              type="button"
              role="radio"
              aria-checked={exam === current}
              onClick={() => { onPick(exam); onClose() }}
              data-testid={`battle-exam-${exam}`}
              className={cn(
                'flex items-center gap-3 rounded-2xl border px-3 py-2.5 text-left transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/60',
                exam === current ? 'border-white bg-[var(--deck-raised)]' : 'border-[var(--deck-card-edge)] bg-[var(--deck-card)] hover:bg-[var(--deck-raised)]',
              )}
            >
              <ExamDeckIcon exam={exam} />
              <span className="min-w-0 flex-1">
                <span className="block font-bold">{battleExamName(exam)}</span>
                <span className="block text-xs text-[var(--deck-label)]">
                  {count} {count === 1 ? 'question' : 'questions'}{extra ? ` · ${extra}` : ''}
                </span>
              </span>
            </button>
          )
        })}
      </div>
    </DeckSheet>
  )
}

/** Leave, with a second tap to confirm, so a stray one doesn't throw a close game away. */
export function LeaveButton({ onLeave }: { onLeave: () => void }) {
  const [confirming, setConfirming] = useState(false)
  useEffect(() => {
    if (!confirming) return
    const id = window.setTimeout(() => setConfirming(false), 3000)
    return () => window.clearTimeout(id)
  }, [confirming])
  return confirming ? (
    <button
      type="button"
      onClick={onLeave}
      className="h-11 shrink-0 rounded-[14px] bg-red-950 px-3 text-sm font-semibold text-red-100"
      data-testid="battle-leave"
    >
      Tap again to end
    </button>
  ) : (
    <DeckBackButton onClick={() => setConfirming(true)} label="Leave" data-testid="battle-leave" />
  )
}
