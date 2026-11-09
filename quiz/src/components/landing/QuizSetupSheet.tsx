import { useEffect, useId, useRef, useState, type CSSProperties, type ReactNode } from 'react'
import { Play, X } from 'lucide-react'
import { OverlayPortal } from '@/components/ui/OverlayPortal'
import { useIsReadingPdf } from '@/hooks/usePdfReader'
import { PICK } from '@/components/ui/ink'
import type { SegmentedOption } from '@/components/ui/SegmentedControl'
import type { Difficulty } from '@/lib/parser'
import type { RevealMode } from '@/lib/revealMode'
import { DIFFICULTY_LEVELS, toggleDifficultyLevel } from '@/lib/quizDifficulty'
import { cn } from '@/lib/utils'

/**
 * Where a choice is drawn: in the sheet (on the page's own surface, picks in
 * the exam's colour) or on the quiz card itself (white on the exam's colour,
 * the pick inverted to solid white).
 */
export type ChoiceTone = 'sheet' | 'card'

/**
 * The quiz setup screen's **sheet** — what a pill on the card, the Practice
 * exam tile and the Past papers tile open. It holds what the card only names:
 * the topics, how many questions, which difficulties and how the quiz is sat,
 * and ends in its own Start, so a reader who opened it to change one thing
 * doesn't have to close it to go.
 *
 * A bottom sheet on a phone and a centred panel from `sm` up, portalled to the
 * body (the page's sticky chrome would otherwise sit over it) and given the
 * exam's accent (`style`), since the portal leaves the page's exam scope. It
 * keeps the card's look: sections under small capitals, choices that go solid
 * in the exam's colour when picked (Ink's *pick*), switches for the on/off
 * choices, and the white Start the card ends in.
 */
export function QuizSetupSheet({
  title,
  style,
  onClose,
  startLabel,
  startDisabled,
  onStart,
  emptyNote,
  focus,
  children,
}: {
  title: string
  /** The exam's accent (`examAccentStyle`) — the sheet portals out of its scope. */
  style?: CSSProperties
  onClose: () => void
  startLabel: string
  startDisabled?: boolean
  onStart: () => void
  /** Said above Start when there is nothing to start. */
  emptyNote?: string
  /** The section (`SheetSection`'s `section`) to open scrolled to. */
  focus?: string
  children: ReactNode
}) {
  const titleId = useId()
  const panelRef = useRef<HTMLDivElement>(null)
  const scrollRef = useRef<HTMLDivElement>(null)

  // Opened from one thing on the card — the count, the difficulty — the sheet
  // opens at that thing's section rather than at the top.
  useEffect(() => {
    const box = scrollRef.current
    if (!focus || !box) return
    const target = box.querySelector<HTMLElement>(`[data-sheet-section="${focus}"]`)
    if (!target) return
    box.scrollTop += target.getBoundingClientRect().top - box.getBoundingClientRect().top - 8
  }, [focus])
  const lastFocus = useRef<HTMLElement | null>(null)

  // Focus the panel on open (not its first control, which a stray key would
  // then change), and hand focus back to what opened it on close.
  useEffect(() => {
    lastFocus.current = document.activeElement as HTMLElement | null
    panelRef.current?.focus()
    return () => lastFocus.current?.focus?.()
  }, [])

  // Esc closes it — unless a document opened from it (the past papers'
  // examiner's report) is being read, whose own Esc that press is.
  const readingPdf = useIsReadingPdf()
  useEffect(() => {
    if (readingPdf) return
    function onKey(e: KeyboardEvent) {
      if (e.key !== 'Escape') return
      e.stopPropagation()
      onClose()
    }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [onClose, readingPdf])

  // The page under the sheet stays where it is.
  useEffect(() => {
    const prev = document.body.style.overflow
    document.body.style.overflow = 'hidden'
    return () => { document.body.style.overflow = prev }
  }, [])

  return (
    <OverlayPortal>
      <div
        // The popup-stack band of the layer map (style guide §8.2): above the
        // page's chrome, under the PDF reader a past paper's report opens in.
        className="paper-scrim fixed inset-0 z-[60] flex items-end justify-center bg-black/60 backdrop-blur-sm sm:items-center sm:p-4"
        style={style}
        onClick={e => { if (e.target === e.currentTarget) onClose() }}
      >
        <div
          ref={panelRef}
          role="dialog"
          aria-modal="true"
          aria-labelledby={titleId}
          tabIndex={-1}
          data-quiz-setup-sheet
          className={cn(
            'flex max-h-[88dvh] w-full flex-col overflow-hidden rounded-t-3xl bg-background text-foreground shadow-2xl focus:outline-none',
            'sm:max-h-[min(88dvh,46rem)] sm:max-w-lg sm:rounded-3xl',
          )}
        >
          <div className="flex shrink-0 items-center gap-3 px-5 pb-2 pt-5">
            <h2 id={titleId} className="min-w-0 flex-1 truncate text-xl font-bold">{title}</h2>
            <button
              type="button"
              aria-label="Close"
              onClick={onClose}
              className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full text-muted-foreground transition-colors hover:bg-muted hover:text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
            >
              <X className="h-5 w-5" aria-hidden />
            </button>
          </div>

          <div ref={scrollRef} className="min-h-0 flex-1 space-y-6 overflow-y-auto overscroll-contain px-5 pb-5 pt-2">
            {children}
          </div>

          <div className="shrink-0 space-y-2 border-t border-border px-5 pb-[max(1.25rem,env(safe-area-inset-bottom))] pt-3">
            {startDisabled && emptyNote && (
              <p className="text-center text-sm text-muted-foreground">{emptyNote}</p>
            )}
            <button
              type="button"
              data-sound="begin"
              onClick={onStart}
              disabled={startDisabled}
              className={cn(
                'flex h-14 w-full items-center justify-center gap-2.5 rounded-2xl bg-primary text-base font-semibold text-primary-foreground transition-transform',
                'active:scale-[0.99] disabled:cursor-not-allowed disabled:opacity-40 motion-reduce:active:scale-100',
                'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background',
              )}
            >
              <Play className="h-5 w-5 fill-current" aria-hidden />
              {startLabel}
            </button>
          </div>
        </div>
      </div>
    </OverlayPortal>
  )
}

/** One section of the sheet: a small-capitals heading over its choices. */
export function SheetSection({
  title,
  aside,
  section,
  children,
}: {
  title: string
  /** The name a sheet's `focus` opens it at. */
  section?: string
  /** A short fact on the heading's right — "130 available". */
  aside?: ReactNode
  children: ReactNode
}) {
  const id = useId()
  return (
    <section aria-labelledby={id} data-sheet-section={section} className="space-y-2.5">
      <div className="flex items-baseline justify-between gap-3">
        <h3 id={id} className="text-[13px] font-semibold uppercase tracking-wide text-muted-foreground">{title}</h3>
        {aside && <span className="text-[13px] tabular-nums text-muted-foreground">{aside}</span>}
      </div>
      {children}
    </section>
  )
}

/**
 * How many questions: one row of numbers, the picked one solid in the exam's
 * colour, ending in a field for any other number. A number typed there is
 * held to `max` (what the pool holds) and picked as soon as it is a count; a
 * count that isn't one of the presets shows in the field, picked.
 * `tone="card"` draws it on the quiz card, where it opens in place.
 */
export function CountChoice({
  options,
  value,
  onChange,
  max,
  tone = 'sheet',
}: {
  options: SegmentedOption<string>[]
  value: string
  onChange: (value: string) => void
  /** The most the field takes; 0 while unknown, which caps nothing. */
  max?: number
  tone?: ChoiceTone
}) {
  const onCard = tone === 'card'
  const custom = !options.some(o => o.value === value)
  const [draft, setDraft] = useState(custom ? value : '')
  const typing = useRef(false)
  // A preset picked, or the count clamped by a shrinking pool, rewrites the
  // field — but not mid-typing, where "1" on the way to "12" is a preset.
  useEffect(() => { if (!typing.current) setDraft(custom ? value : '') }, [custom, value])

  function type(raw: string) {
    const digits = raw.replace(/\D/g, '').slice(0, 4)
    setDraft(digits)
    const n = Number(digits)
    if (n >= 1) onChange(String(max ? Math.min(n, max) : n))
  }

  return (
    <div role="radiogroup" aria-label="Question count" className={cn('flex gap-1 rounded-2xl p-1', onCard ? 'bg-black/15' : 'bg-card')}>
      {options.map(o => {
        const on = o.value === value
        return (
          <button
            key={o.value}
            type="button"
            role="radio"
            aria-checked={on}
            aria-label={o.ariaLabel}
            disabled={o.disabled}
            onClick={() => onChange(o.value)}
            className={cn(
              'h-11 min-w-0 flex-1 rounded-xl text-base font-semibold tabular-nums transition-colors',
              'disabled:cursor-not-allowed disabled:opacity-30',
              'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-inset',
              onCard
                ? cn('focus-visible:ring-white', on ? 'bg-white text-black' : 'text-white/80 enabled:hover:bg-white/15 enabled:hover:text-white')
                : cn('focus-visible:ring-ring', on ? PICK : 'text-muted-foreground enabled:hover:bg-muted enabled:hover:text-foreground'),
            )}
          >
            {o.label}
          </button>
        )
      })}
      <input
        type="text"
        inputMode="numeric"
        pattern="[0-9]*"
        enterKeyHint="done"
        aria-label={max ? `Other number of questions, up to ${max}` : 'Other number of questions'}
        placeholder="Other"
        value={draft}
        onChange={e => type(e.target.value)}
        onFocus={() => { typing.current = true }}
        onBlur={() => { typing.current = false; setDraft(custom ? value : '') }}
        className={cn(
          'h-11 min-w-0 flex-[1.4] rounded-xl bg-transparent text-center text-base font-semibold tabular-nums outline-none transition-colors',
          'placeholder:font-medium focus-visible:ring-2 focus-visible:ring-inset',
          onCard
            ? cn('placeholder:text-white/70 focus-visible:ring-white', custom ? 'bg-white text-black' : 'text-white ring-1 ring-inset ring-white/40')
            : cn('placeholder:text-muted-foreground focus-visible:ring-ring', custom ? PICK : 'ring-1 ring-inset ring-border'),
        )}
      />
    </div>
  )
}

const LEVEL_NAME: Record<Difficulty, string> = { easy: 'Easy', medium: 'Medium', hard: 'Hard' }

/**
 * Which difficulties: three pills, any combination, solid when in. A filter —
 * an unticked level is out of the pool — so each says how many it holds. The
 * last level in can't be taken out (lib/quizDifficulty.ts). On the quiz card
 * (`tone="card"`) the three share one well, a segmented row.
 */
export function DifficultyChoice({
  levels,
  onChange,
  counts,
  tone = 'sheet',
}: {
  levels: Difficulty[]
  onChange: (next: Difficulty[]) => void
  counts?: Record<Difficulty, number>
  tone?: ChoiceTone
}) {
  const onCard = tone === 'card'
  return (
    <div
      role="group"
      aria-label="Difficulty"
      // On the card the three sit in one well, a segmented row.
      className={onCard ? 'flex gap-1 rounded-2xl bg-black/15 p-1' : 'flex flex-wrap gap-2'}
    >
      {DIFFICULTY_LEVELS.map(level => {
        const on = levels.includes(level)
        const n = counts?.[level]
        return (
          <button
            key={level}
            type="button"
            role="checkbox"
            aria-checked={on}
            data-sound="tick"
            onClick={() => onChange(toggleDifficultyLevel(levels, level))}
            className={cn(
              'inline-flex h-10 items-center font-semibold transition-colors',
              onCard ? 'min-w-0 flex-1 justify-center gap-1 rounded-xl px-1.5 text-sm' : 'gap-1.5 rounded-full px-4 text-[15px]',
              'focus-visible:outline-none focus-visible:ring-2',
              onCard
                ? cn('focus-visible:ring-white', on ? 'bg-white text-black' : 'text-white/80 hover:bg-white/10 hover:text-white')
                : cn('focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background', on ? PICK : 'bg-card text-muted-foreground hover:text-foreground'),
            )}
          >
            {LEVEL_NAME[level]}
            {n !== undefined && <span className="font-medium tabular-nums opacity-70">{n}</span>}
          </button>
        )
      })}
    </div>
  )
}

/**
 * How the quiz is sat — the on/off choices, as switches in one card: whether
 * each answer is marked as it is confirmed or held for the review screen,
 * whether it runs against the real paper's pace, and whether the concepts a
 * question names can be tapped to read. Remembered per format
 * (`useQuizBuilderSettings`), so a quiz and a practice exam keep their own.
 */
export function SittingChoices({
  reveal,
  onRevealChange,
  timed,
  onTimedChange,
  timedPace,
  conceptLinks,
  onConceptLinksChange,
}: {
  reveal: RevealMode
  onRevealChange: (next: RevealMode) => void
  timed: boolean
  onTimedChange: (next: boolean) => void
  /** The exam's pace, e.g. "5:20 per question". */
  timedPace?: string
  conceptLinks: boolean
  onConceptLinksChange: (next: boolean) => void
}) {
  return (
    <div className="divide-y divide-border overflow-hidden rounded-2xl bg-card">
      <SwitchRow
        label="Show answers after each question"
        detail={reveal === 'during' ? 'Marked as you go' : 'All at the end, like the exam'}
        on={reveal === 'during'}
        onToggle={() => onRevealChange(reveal === 'during' ? 'end' : 'during')}
      />
      <SwitchRow
        label="Timed"
        detail={timedPace ? `Exam pace: ${timedPace}` : undefined}
        on={timed}
        onToggle={() => onTimedChange(!timed)}
      />
      <SwitchRow
        label="Tap concepts to read them"
        on={conceptLinks}
        onToggle={() => onConceptLinksChange(!conceptLinks)}
      />
    </div>
  )
}

function SwitchRow({
  label,
  detail,
  on,
  onToggle,
}: {
  label: string
  detail?: string
  on: boolean
  onToggle: () => void
}) {
  return (
    <button
      type="button"
      role="switch"
      aria-checked={on}
      aria-label={label}
      data-sound="tick"
      onClick={onToggle}
      className="flex min-h-14 w-full items-center gap-3 px-4 py-3 text-left transition-colors hover:bg-muted/60 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-ring"
    >
      <span className="min-w-0 flex-1">
        <span className="block text-[15px] font-medium leading-snug">{label}</span>
        {detail && <span className="block text-[13px] leading-snug text-muted-foreground">{detail}</span>}
      </span>
      <span
        aria-hidden
        className={cn(
          'relative h-7 w-12 shrink-0 rounded-full transition-colors',
          on ? 'bg-pick' : 'bg-muted-foreground/30',
        )}
      >
        <span
          className={cn(
            'absolute top-0.5 h-6 w-6 rounded-full bg-white shadow-sm transition-[left] duration-150',
            on ? 'left-[1.375rem]' : 'left-0.5',
          )}
        />
      </span>
    </button>
  )
}
