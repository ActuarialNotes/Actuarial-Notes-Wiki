import { useCallback, useEffect, useId, useLayoutEffect, useRef, useState, type ReactNode } from 'react'
import { Circle, SlidersHorizontal } from 'lucide-react'
import { CheckMark } from '@/components/CheckMark'
import { OverlayPortal } from '@/components/ui/OverlayPortal'
import { SegmentedControl, type SegmentedOption } from '@/components/ui/SegmentedControl'
import { placeMenu, type MenuPlacement } from '@/lib/menuPlacement'
import type { RevealMode } from '@/lib/revealMode'
import { difficultyLabel, type DifficultyTarget } from '@/lib/quizDifficulty'
import { cn } from '@/lib/utils'

/**
 * The quiz setup screen's settings menu — the button beside the deck card, and
 * the menu it opens.
 *
 * What it holds is how the quiz is *run* rather than what it draws from: how
 * many questions it pulls and how hard they lean, whether each answer is marked
 * as it is confirmed or held back for the review screen, and whether the quiz
 * is sat against the clock. Both used to be full-width rows stacked
 * under the deck in the action bar, which on a phone pushed Start Quiz to the
 * edge of the fold — the two settings a learner sets once and rarely revisits
 * were taking more of the bar than the button the page exists for.
 *
 * The count and the difficulty are the mode-specific ones: a practice exam is
 * sat whole, as the paper sets it, so both are omitted for it and the menu
 * opens on the reveal and timing choices alone.
 *
 * Like `ConceptActionMenu`, the menu renders into <body> and is placed by
 * `placeMenu`. It has to: its trigger lives inside the action bar, a `fixed`
 * `z-20` strip, so a menu nested in it would be pinned under the bottom nav
 * however high its own z-index — and it opens near the bottom of the viewport,
 * where the placement's "flip above the trigger" rule is what keeps it on
 * screen at all.
 */
export interface QuizSettingsMenuProps {
  /** The question-count choices. Omitted, the menu carries no count section. */
  countOptions?: SegmentedOption<string>[]
  countValue?: string
  onCountChange?: (value: string) => void
  /** Where the difficulty slider sits. Omitted, the menu carries no slider. */
  difficulty?: DifficultyTarget
  onDifficultyChange?: (next: DifficultyTarget) => void
  reveal: RevealMode
  onRevealChange: (next: RevealMode) => void
  timed: boolean
  onTimedChange: (next: boolean) => void
  /** The exam's pace, e.g. "6:00 per question" — said beside the Timed choice. */
  timedPace?: string
  className?: string
}

export function QuizSettingsMenu({
  countOptions,
  countValue,
  onCountChange,
  difficulty,
  onDifficultyChange,
  reveal,
  onRevealChange,
  timed,
  onTimedChange,
  timedPace,
  className,
}: QuizSettingsMenuProps) {
  const [open, setOpen] = useState(false)
  const [box, setBox] = useState<MenuPlacement | null>(null)
  const triggerRef = useRef<HTMLButtonElement>(null)

  const showCount = countOptions !== undefined && countValue !== undefined && onCountChange !== undefined
  const showDifficulty = difficulty !== undefined && onDifficultyChange !== undefined
  const difficultyLabelId = useId()

  // Anchor the menu to the button. `placeMenu` owns the rule that matters here
  // — the menu is never off screen — so the trigger is only a preference: this
  // one sits low, so the menu almost always opens upwards.
  const measure = useCallback(() => {
    const el = triggerRef.current
    if (!el) return
    const rect = el.getBoundingClientRect()
    const next = placeMenu(
      rect,
      { width: window.innerWidth, height: window.innerHeight },
      { width: MENU_WIDTH_PX, maxHeight: MENU_MAX_HEIGHT_PX },
    )
    setBox(prev => (prev && samePlacement(prev, next) ? prev : next))
  }, [])

  useLayoutEffect(() => {
    if (!open) return
    measure()
  }, [open, measure])

  // Re-place it if the trigger moves under it — a rotation, a phone keyboard,
  // or the page scrolling beneath the action bar.
  useEffect(() => {
    if (!open) return
    const onViewportChange = () => measure()
    window.addEventListener('resize', onViewportChange)
    window.addEventListener('scroll', onViewportChange, true)
    return () => {
      window.removeEventListener('resize', onViewportChange)
      window.removeEventListener('scroll', onViewportChange, true)
    }
  }, [open, measure])

  // Close on a press outside. The menu is in its own portal and the trigger
  // toggles it on click, so both would otherwise read as "outside".
  useEffect(() => {
    if (!open) return
    function onPointerDown(e: PointerEvent) {
      const target = e.target as HTMLElement | null
      if (target?.closest('[data-quiz-settings-menu]')) return
      if (target?.closest('[data-quiz-settings-trigger]')) return
      setOpen(false)
    }
    document.addEventListener('pointerdown', onPointerDown)
    return () => document.removeEventListener('pointerdown', onPointerDown)
  }, [open])

  // Esc closes it and hands focus back to the button that opened it.
  useEffect(() => {
    if (!open) return
    function onKeyDown(e: KeyboardEvent) {
      if (e.key !== 'Escape') return
      e.stopPropagation()
      setOpen(false)
      triggerRef.current?.focus()
    }
    window.addEventListener('keydown', onKeyDown)
    return () => window.removeEventListener('keydown', onKeyDown)
  }, [open])

  const menuStyle = box
    ? {
        left: box.left,
        ...(box.top !== null ? { top: box.top } : { bottom: box.bottom ?? 0 }),
        maxHeight: box.maxHeight,
      }
    : undefined

  const menu = (
    <div
      data-quiz-settings-menu
      role="dialog"
      aria-label="Quiz settings"
      className={cn(
        // Action-menu band of the layer map (style guide §8.2) — above the
        // bottom nav and the action bar the trigger sits in.
        `fixed ${MENU_WIDTH_CLASS} z-[70] overflow-y-auto rounded-lg border border-border`,
        'bg-popover text-popover-foreground shadow-md',
      )}
      style={menuStyle}
    >
      {/* ── How many questions ─────────────────────────────────────────── */}
      {showCount && (
        <div className="space-y-2 px-3 py-3">
          {/* The counts are bare numerals; without this they could be
              anything. */}
          <p className="text-xs font-medium text-muted-foreground">Number of questions</p>
          <SegmentedControl
            label="Question count"
            value={countValue}
            onChange={onCountChange}
            options={countOptions}
            size="sm"
          />
        </div>
      )}

      {/* ── How hard the draw leans ─────────────────────────────────────
          Continuous, because it blends: the bank only has three levels, and a
          position between two stops draws a mix of both (lib/quizDifficulty.ts).
          It only ever *says* the three words, though — a percentage would
          promise a precision the bank doesn't have. */}
      {showDifficulty && (
        <div className={cn('px-3 pt-3 pb-2', showCount && 'border-t border-border')}>
          <div className="flex items-baseline justify-between">
            <p id={difficultyLabelId} className="text-xs font-medium text-muted-foreground">Difficulty</p>
            <span className="text-xs font-semibold">{difficultyLabel(difficulty)}</span>
          </div>
          <input
            type="range"
            min={0}
            max={1}
            step={0.01}
            value={difficulty}
            aria-labelledby={difficultyLabelId}
            aria-valuetext={difficultyLabel(difficulty)}
            onChange={e => onDifficultyChange(Number(e.target.value))}
            className="sim-slider"
          />
          {/* The stops, under the points of the track they name. */}
          <div className="flex justify-between text-[11px] text-muted-foreground" aria-hidden>
            <span>Easy</span>
            <span>Med</span>
            <span>Hard</span>
          </div>
        </div>
      )}

      {/* ── When the answers show ───────────────────────────────────────
          Ticked, each answer is marked and explained as soon as it's
          confirmed; unticked, nothing is given away until the review screen —
          not even by the right-answer chime. Offered for both modes — a
          practice exam run for feedback is as reasonable as a quiz run as a
          dry run. */}
      <CheckRow
        checked={reveal === 'during'}
        onToggle={() => onRevealChange(reveal === 'during' ? 'end' : 'during')}
        divided={showCount || showDifficulty}
      >
        Show answers after each question
      </CheckRow>

      {/* ── Against the clock ───────────────────────────────────────────
          The budget is the real paper's pace (lib/quizTiming.ts), so the pace
          is the one thing worth saying beside it. */}
      <CheckRow checked={timed} onToggle={() => onTimedChange(!timed)} divided detail={timedPace}>
        Timed
      </CheckRow>
    </div>
  )

  return (
    <>
      <button
        ref={triggerRef}
        type="button"
        data-quiz-settings-trigger
        data-sound="actions"
        aria-haspopup="dialog"
        aria-expanded={open}
        aria-label="Quiz settings"
        onClick={() => setOpen(o => !o)}
        className={cn(
          // The deck card's material, so the pair reads as one row of the bar.
          'flex w-14 shrink-0 items-center justify-center rounded-xl bg-card text-muted-foreground shadow-sm',
          'transition-all duration-150 hover:text-foreground hover:shadow-md active:scale-[0.98] motion-reduce:active:scale-100',
          'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2',
          open && 'text-foreground ring-2 ring-ring',
          className,
        )}
      >
        <SlidersHorizontal className="h-4 w-4" aria-hidden />
      </button>
      {open && box && <OverlayPortal>{menu}</OverlayPortal>}
    </>
  )
}

/** One tickable row of the menu — a checkbox drawn with the app's check mark. */
function CheckRow({
  checked,
  onToggle,
  divided,
  detail,
  children,
}: {
  checked: boolean
  onToggle: () => void
  /** Rule it off from whatever sits above it. */
  divided: boolean
  /** A short aside, right-aligned on the row. */
  detail?: string
  children: ReactNode
}) {
  return (
    <button
      type="button"
      role="checkbox"
      aria-checked={checked}
      data-sound="tick"
      onClick={onToggle}
      className={cn(
        'flex w-full items-center gap-2.5 px-3 py-3 text-left text-sm transition-colors hover:bg-accent',
        'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-ring',
        divided && 'border-t border-border',
      )}
    >
      {checked ? (
        <CheckMark className="h-4 w-4" />
      ) : (
        <Circle className="h-4 w-4 shrink-0 text-muted-foreground/50" />
      )}
      <span className="min-w-0 flex-1 font-medium leading-snug">{children}</span>
      {detail && <span className="shrink-0 text-xs tabular-nums text-muted-foreground">{detail}</span>}
    </button>
  )
}

/** The menu's width — as a class, and in pixels for the placement maths. */
const MENU_WIDTH_CLASS = 'w-72'
const MENU_WIDTH_PX = 288

/** How tall it grows given the room; past this it scrolls. */
const MENU_MAX_HEIGHT_PX = 420

function samePlacement(a: MenuPlacement, b: MenuPlacement): boolean {
  return a.left === b.left
    && a.top === b.top
    && a.bottom === b.bottom
    && a.maxHeight === b.maxHeight
    && a.above === b.above
}
