import { useRef, useState } from 'react'
import { cn } from '@/lib/utils'
import { scrubKeyTarget, scrubPositionAt } from '@/lib/navScrub'

/**
 * The thin green bar that sits directly above a Previous / Next footer, showing
 * how far through the sequence the current item is. Used by every surface that
 * has that footer shape (concept popup, flashcard study view, concept detail
 * modal, math-focus overlay, mistakes review, the exam-PDF reader) so the
 * progress read is identical everywhere.
 *
 * Given `onScrub` it also becomes the *control* for that sequence rather than
 * only its readout: press anywhere on it to jump there, drag to run through,
 * exactly as a video timeline works. That is the difference between stepping to
 * page 300 of an examiner's report and pressing Next 299 times.
 *
 * Scrubbing is opt-in per surface for a reason. Plenty of bars in the app
 * measure something a reader has *earned* — mastery, XP, exam readiness, quest
 * progress — and those must stay readouts: there is nowhere to drag to. Only a
 * bar whose fill is a *position in a sequence* gets a handler.
 */
export interface NavProgressBarProps {
  /** 1-indexed position of the current item. */
  current: number
  /** Total number of items in the sequence. */
  total: number
  /** Extra classes for the bar's own row (e.g. `border-t`, `mt-auto`). */
  className?: string
  /** Accessible label — defaults to a generic "Progress". */
  label?: string
  /**
   * Extra classes for the track, for a bar that isn't the default hairline —
   * colour, rounding, or a different height. These land after the component's
   * own height classes, so a caller changing the height should give the hover
   * and focus states too, or the bar will shrink when it's reached for.
   */
  trackClassName?: string
  /**
   * Extra classes for the filled part, for a bar that isn't the green one. Give
   * the `dark:` variant as well when overriding the colour — the default sets
   * one, and a bare `bg-*` doesn't displace it.
   */
  fillClassName?: string
  /**
   * Makes the bar scrubbable. Called with the 1-indexed position the pointer or
   * key landed on, live during a drag — so the surface moves under the finger
   * rather than only on release. A surface whose item is expensive to show
   * (the PDF reader's page render) is expected to lag that work behind the
   * position itself, not to make the bar wait.
   *
   * Never called with the position the bar is already on.
   */
  onScrub?: (position: number) => void
  /**
   * What the drag bubble reads, e.g. `n => \`${n} / ${total}\``. Defaults to the
   * bare position — worth passing whenever the total isn't visible next to the
   * bar, since "212" alone doesn't say how far in that is.
   */
  formatValue?: (position: number) => string
}

/** Percentage filled for a 1-indexed position, clamped to 0–100. */
export function navProgressPercent(current: number, total: number): number {
  if (!Number.isFinite(current) || !Number.isFinite(total) || total <= 0) return 0
  return Math.min(100, Math.max(0, (current / total) * 100))
}

/** The fill itself, shared by the readout and the scrubber. */
function Fill({ percentage, fillClassName }: { percentage: number; fillClassName?: string }) {
  return (
    <div
      className={cn(
        'h-full bg-green-500 dark:bg-green-400 transition-[width] duration-300 ease-out',
        fillClassName,
      )}
      style={{ width: `${percentage}%` }}
    />
  )
}

export function NavProgressBar({
  current,
  total,
  className,
  label = 'Progress',
  trackClassName,
  fillClassName,
  onScrub,
  formatValue,
}: NavProgressBarProps) {
  const percentage = navProgressPercent(current, total)
  const trackRef = useRef<HTMLDivElement>(null)
  // The drag is tracked twice: a ref the handlers read, and state the styling
  // reads. Only the ref can answer "are we dragging" reliably — a pointermove
  // dispatched in the same tick as the press would still see the pre-render
  // state and be dropped, which is the difference between a flick landing where
  // it was aimed and it landing on the page it started from.
  const draggingRef = useRef(false)
  const [scrubbing, setScrubbing] = useState(false)
  // Where a mouse is hovering, as a position — what the bubble previews before
  // anything is pressed. Null on touch, which has no hover to read.
  const [hover, setHover] = useState<number | null>(null)

  // A one-item sequence has nowhere to drag to, so it stays a plain readout.
  const scrubbable = !!onScrub && total > 1

  if (!scrubbable) {
    return (
      <div
        role="progressbar"
        aria-label={label}
        aria-valuemin={0}
        aria-valuemax={100}
        aria-valuenow={Math.round(percentage)}
        className={cn('h-1 w-full shrink-0 overflow-hidden bg-muted', trackClassName, className)}
      >
        <Fill percentage={percentage} fillClassName={fillClassName} />
      </div>
    )
  }

  const position = Math.min(total, Math.max(1, Math.round(current) || 1))

  function seek(clientX: number) {
    const rect = trackRef.current?.getBoundingClientRect()
    if (!rect) return
    const next = scrubPositionAt(clientX, rect.left, rect.width, total)
    if (next !== position) onScrub!(next)
  }

  function previewAt(clientX: number) {
    const rect = trackRef.current?.getBoundingClientRect()
    if (!rect) return
    setHover(scrubPositionAt(clientX, rect.left, rect.width, total))
  }

  function handlePointerDown(e: React.PointerEvent<HTMLDivElement>) {
    if (e.button !== 0) return
    // Stops the press selecting the text around the bar, and stops a touch drag
    // being read as a scroll of whatever the bar is sitting in.
    e.preventDefault()
    e.currentTarget.setPointerCapture(e.pointerId)
    draggingRef.current = true
    setScrubbing(true)
    seek(e.clientX)
  }

  function handlePointerMove(e: React.PointerEvent<HTMLDivElement>) {
    if (draggingRef.current) seek(e.clientX)
    else if (e.pointerType !== 'touch') previewAt(e.clientX)
  }

  function handlePointerUp(e: React.PointerEvent<HTMLDivElement>) {
    if (!draggingRef.current) return
    if (e.currentTarget.hasPointerCapture(e.pointerId)) e.currentTarget.releasePointerCapture(e.pointerId)
    draggingRef.current = false
    setScrubbing(false)
    // A touch leaves no pointer behind, so the bubble it raised goes with it. A
    // mouse stays, and hands the bubble back to the hover preview — at where it
    // was released, not wherever it happened to be hovering before the drag.
    if (e.pointerType === 'touch') setHover(null)
    else previewAt(e.clientX)
  }

  function handleKeyDown(e: React.KeyboardEvent<HTMLDivElement>) {
    const target = scrubKeyTarget(e.key, position, total)
    if (target === null) return
    // These keys scroll the surface behind the bar otherwise.
    e.preventDefault()
    if (target !== position) onScrub!(target)
  }

  // While dragging, the bubble follows the position itself so it can't drift
  // from the fill; before that it follows the mouse.
  const preview = scrubbing ? position : hover
  const valueText = formatValue ? formatValue(position) : `${position} of ${total}`

  return (
    <div
      ref={trackRef}
      role="slider"
      tabIndex={0}
      aria-label={label}
      aria-orientation="horizontal"
      aria-valuemin={1}
      aria-valuemax={total}
      aria-valuenow={position}
      aria-valuetext={valueText}
      // The delegated sound listener stays out of this anyway (a div isn't a
      // control it recognises), but scrubbing is explicitly a silent gesture —
      // see docs/sound-design.md — and a drag would otherwise be a cue per step.
      data-sound="none"
      data-scrubbing={scrubbing || undefined}
      onPointerDown={handlePointerDown}
      onPointerMove={handlePointerMove}
      onPointerUp={handlePointerUp}
      onPointerCancel={handlePointerUp}
      onPointerLeave={() => { if (!draggingRef.current) setHover(null) }}
      onKeyDown={handleKeyDown}
      className={cn(
        // The visible bar is 4px, which is not a target anyone can hit — least
        // of all with a thumb. The row around it is a full 24px of grabbable
        // space, and the bar stays thin inside it.
        'group relative flex h-6 w-full shrink-0 items-center',
        'cursor-pointer touch-none select-none focus:outline-none focus-visible:outline-none',
        className,
      )}
    >
      {/* Which item the press would land on. On a long document the fill alone
          doesn't answer that — 62% of 423 pages is not a page number. */}
      {preview !== null && (
        <span
          aria-hidden
          className="pointer-events-none absolute bottom-full z-10 mb-1 -translate-x-1/2 whitespace-nowrap rounded bg-popover px-1.5 py-0.5 text-[11px] font-medium tabular-nums text-popover-foreground shadow-md"
          // Clamped away from both edges so the bubble can't hang off the panel
          // at either end of the drag.
          style={{ left: `clamp(2rem, ${navProgressPercent(preview, total)}%, calc(100% - 2rem))` }}
        >
          {formatValue ? formatValue(preview) : `${preview} of ${total}`}
        </span>
      )}

      <div
        className={cn(
          'w-full overflow-hidden bg-muted transition-[height] duration-150 ease-out',
          scrubbing ? 'h-2' : 'h-1 group-hover:h-1.5 group-focus-visible:h-1.5',
          trackClassName,
        )}
      >
        <Fill
          percentage={percentage}
          fillClassName={cn(scrubbing && 'transition-none', fillClassName)}
        />
      </div>

      {/* The handle, which only exists once you're reaching for it. */}
      <span
        aria-hidden
        className={cn(
          'pointer-events-none absolute h-3 w-3 -translate-x-1/2 rounded-full bg-green-500 shadow-sm ring-2 ring-background dark:bg-green-400',
          'transition-transform duration-150 ease-out',
          scrubbing
            ? 'scale-110'
            : 'scale-0 group-hover:scale-100 group-focus-visible:scale-100 group-focus-visible:ring-ring',
          fillClassName,
        )}
        // Held a half-thumb clear of both ends, so the handle stays a whole
        // circle on the first and last item instead of being cut in half by the
        // edge of the panel it's pinned to.
        style={{ left: `clamp(0.375rem, ${percentage}%, calc(100% - 0.375rem))` }}
      />
    </div>
  )
}
