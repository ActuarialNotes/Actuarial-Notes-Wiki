import { useCallback, useEffect, useLayoutEffect, useRef, useState } from 'react'
import { CheckCircle2, Circle, SlidersHorizontal } from 'lucide-react'
import { OverlayPortal } from '@/components/ui/OverlayPortal'
import { SegmentedControl, type SegmentedOption } from '@/components/ui/SegmentedControl'
import { placeMenu, type MenuPlacement } from '@/lib/menuPlacement'
import type { RevealMode } from '@/lib/revealMode'
import { cn } from '@/lib/utils'

/**
 * The quiz setup screen's settings menu — the button beside the deck card, and
 * the menu it opens.
 *
 * What it holds is how the quiz is *run* rather than what it draws from: how
 * many questions it pulls, and whether each answer is marked as it is confirmed
 * or held back for the review screen. Both used to be full-width rows stacked
 * under the deck in the action bar, which on a phone pushed Start Quiz to the
 * edge of the fold — the two settings a learner sets once and rarely revisits
 * were taking more of the bar than the button the page exists for.
 *
 * The count is the *only* thing on here that is mode-specific: a practice exam
 * is sat whole, so `countOptions` is omitted for it and the menu opens on the
 * reveal choice alone.
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
  reveal: RevealMode
  onRevealChange: (next: RevealMode) => void
  className?: string
}

export function QuizSettingsMenu({
  countOptions,
  countValue,
  onCountChange,
  reveal,
  onRevealChange,
  className,
}: QuizSettingsMenuProps) {
  const [open, setOpen] = useState(false)
  const [box, setBox] = useState<MenuPlacement | null>(null)
  const triggerRef = useRef<HTMLButtonElement>(null)

  const showCount = countOptions !== undefined && countValue !== undefined && onCountChange !== undefined

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

      {/* ── When the answers show ───────────────────────────────────────
          Ticked, each answer is marked and explained as soon as it's
          confirmed; unticked, nothing is given away until the review screen.
          Offered for both modes — a practice exam run for feedback is as
          reasonable as a quiz run as a dry run. */}
      <button
        type="button"
        role="checkbox"
        aria-checked={reveal === 'during'}
        data-sound="tick"
        onClick={() => onRevealChange(reveal === 'during' ? 'end' : 'during')}
        className={cn(
          'flex w-full items-center gap-2.5 px-3 py-3 text-left text-sm transition-colors hover:bg-accent',
          'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-ring',
          showCount && 'border-t border-border',
        )}
      >
        {reveal === 'during' ? (
          <CheckCircle2 className="h-4 w-4 shrink-0 text-primary" />
        ) : (
          <Circle className="h-4 w-4 shrink-0 text-muted-foreground/50" />
        )}
        <span className="min-w-0 flex-1 font-medium leading-snug">
          Show answers after each question
        </span>
      </button>
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

/** The menu's width — as a class, and in pixels for the placement maths. */
const MENU_WIDTH_CLASS = 'w-72'
const MENU_WIDTH_PX = 288

/** How tall it grows given the room; past this it scrolls. */
const MENU_MAX_HEIGHT_PX = 320

function samePlacement(a: MenuPlacement, b: MenuPlacement): boolean {
  return a.left === b.left
    && a.top === b.top
    && a.bottom === b.bottom
    && a.maxHeight === b.maxHeight
    && a.above === b.above
}
