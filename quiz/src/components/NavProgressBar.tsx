import { useMemo, useRef, useState } from 'react'
import { cn } from '@/lib/utils'
import { playSound } from '@/lib/soundEngine'
import {
  navSegments,
  scrubKeyTarget,
  scrubPositionAt,
  segmentAt,
  segmentFillPercent,
  segmentKeyTarget,
  type NavSegment,
  type NavSegmentMark,
} from '@/lib/navScrub'

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
 *
 * Given `segments` it is cut into chapters, the way a video's timeline is: one
 * piece of track per named stretch, a hairline gap between them, and the
 * chapter's name above the position in the drag bubble. A bar that is one solid
 * strip says how far through you are and nothing about what is around you; a
 * segmented one shows the shape of the document — where each question of an
 * examiner's report starts, how long it runs — before you have read any of it.
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
  /**
   * Where the sequence's named stretches begin — a PDF's bookmarks, a paper's
   * questions. Only the starts are given: each runs to the item before the next
   * one, and anything before the first is an unnamed stretch of its own.
   *
   * Pass what the source actually says, in any order; `navSegments` settles the
   * rest and leaves the bar plain when the marks say nothing useful. Never
   * invent a chapter list to fill the bar — a document with no outline has no
   * chapters, and evenly spaced fictions would read as its real structure.
   */
  segments?: NavSegmentMark[]
  /**
   * What a key press moves by. `'item'` (the default) steps one item, which is
   * what a bar of pages or cards wants. `'segment'` steps chapter to chapter,
   * for a bar whose single item is too fine to be worth reaching on its own —
   * the syllabus bar, where a position is a thousandth of an exam. Ignored
   * without `segments`.
   */
  keyStep?: 'item' | 'segment'
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

/**
 * The track: one strip, or one strip per chapter.
 *
 * The segmented pieces are laid out by `flex-grow` rather than by percentage
 * widths, so the gaps between them are taken out of the chapters' own width
 * instead of pushing the last one off the end of the bar — and a one-page
 * chapter of a 400-page report still gets a sliver rather than nothing.
 */
function Track({
  segments,
  percentage,
  current,
  highlight,
  trackClassName,
  fillClassName,
}: {
  segments: NavSegment[]
  percentage: number
  current: number
  /** The chapter under the pointer, which lifts out of the track while it's there. */
  highlight?: NavSegment | null
  trackClassName?: string
  fillClassName?: string
}) {
  if (segments.length === 0) {
    return (
      <div className={cn('h-full w-full overflow-hidden bg-muted', trackClassName)}>
        <Fill percentage={percentage} fillClassName={fillClassName} />
      </div>
    )
  }

  return (
    // The row itself is transparent: whatever `bg-muted` a caller wanted belongs
    // to the pieces, or it would paint the gaps back in.
    <div className={cn('flex h-full w-full gap-[2px] bg-transparent', trackClassName)}>
      {segments.map(segment => (
        <div
          key={segment.start}
          style={{ flexGrow: segment.end - segment.start + 1, flexBasis: 0 }}
          className={cn(
            'h-full min-w-px overflow-hidden rounded-[1px] transition-colors duration-150',
            highlight && highlight.start === segment.start ? 'bg-muted-foreground/30' : 'bg-muted',
          )}
        >
          <Fill percentage={segmentFillPercent(segment, current)} fillClassName={fillClassName} />
        </div>
      ))}
    </div>
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
  segments,
  keyStep = 'item',
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

  const chapters = useMemo(() => (segments ? navSegments(segments, total) : []), [segments, total])

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
        className={cn('h-1 w-full shrink-0 overflow-hidden', chapters.length === 0 && 'bg-muted', className)}
      >
        <Track
          segments={chapters}
          percentage={percentage}
          current={current}
          trackClassName={trackClassName}
          fillClassName={fillClassName}
        />
      </div>
    )
  }

  const position = Math.min(total, Math.max(1, Math.round(current) || 1))

  /**
   * Move to the position under the pointer, and ruffle if that moved us.
   *
   * The cue is deliberately on the *stop crossed*, not on the press or the
   * release: a drag through forty pages should sound like forty pages going
   * past, the way thumbing a stack does, rather than like one press at each
   * end. `ruffle` is written for exactly this — the quietest cue in the
   * catalogue, with a throttle that thins a fast drag down to a riffle instead
   * of a burst per pointermove (see docs/sound-design.md).
   */
  function moveTo(next: number) {
    if (next === position) return
    playSound('ruffle')
    onScrub!(next)
  }

  function seek(clientX: number) {
    const rect = trackRef.current?.getBoundingClientRect()
    if (!rect) return
    moveTo(scrubPositionAt(clientX, rect.left, rect.width, total))
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
    const target = keyStep === 'segment' && chapters.length > 0
      ? segmentKeyTarget(e.key, position, chapters, total)
      : scrubKeyTarget(e.key, position, total)
    if (target === null) return
    // These keys scroll the surface behind the bar otherwise.
    e.preventDefault()
    moveTo(target)
  }

  // While dragging, the bubble follows the position itself so it can't drift
  // from the fill; before that it follows the mouse.
  const preview = scrubbing ? position : hover
  const previewChapter = preview === null ? null : segmentAt(chapters, preview)
  const previewText = preview === null
    ? ''
    : (formatValue ? formatValue(preview) : `${preview} of ${total}`)
  const currentChapter = segmentAt(chapters, position)
  // A screen reader gets the chapter the same way the bubble shows it — "page
  // 212 of 423, Question 14" — since that is what says where the drag has got to.
  // A surface whose position has no reading of its own — the syllabus bar, where
  // the number is a share of an exam — returns an empty string from
  // `formatValue`, and then the chapter is the whole readout.
  const positionText = formatValue ? formatValue(position) : `${position} of ${total}`
  const valueText = [positionText, currentChapter?.label].filter(Boolean).join(', ')
    || `${position} of ${total}`

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
      // The delegated listener stays out of this anyway (a div isn't a control
      // it recognises), and it must: the bar sounds its own `ruffle` per stop
      // crossed (see `moveTo`), and a press cue on top of it would double up on
      // the first stop of every drag.
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
      {/* Which item the press would land on, and which chapter that is. On a
          long document the fill alone doesn't answer either — 62% of 423 pages
          is not a page number, and a page number is not a section. */}
      {preview !== null && (previewText || previewChapter?.label) && (
        <span
          aria-hidden
          className="pointer-events-none absolute bottom-full z-10 mb-1 -translate-x-1/2 whitespace-nowrap rounded bg-popover px-1.5 py-0.5 text-[11px] font-medium tabular-nums text-popover-foreground shadow-md"
          // Clamped away from both edges so the bubble can't hang off the panel
          // at either end of the drag.
          style={{ left: `clamp(2rem, ${navProgressPercent(preview, total)}%, calc(100% - 2rem))` }}
        >
          {previewChapter?.label && (
            // The chapter leads, the page follows: on a segmented bar the name
            // is what you are aiming at and the number is how to get back.
            <span className="block max-w-[14rem] truncate text-center">{previewChapter.label}</span>
          )}
          {previewText && (
            <span className={cn('block text-center', previewChapter?.label && 'font-normal text-popover-foreground/70')}>
              {previewText}
            </span>
          )}
        </span>
      )}

      <div
        className={cn(
          'w-full transition-[height] duration-150 ease-out',
          scrubbing ? 'h-2' : 'h-1 group-hover:h-1.5 group-focus-visible:h-1.5',
        )}
      >
        <Track
          segments={chapters}
          percentage={percentage}
          current={position}
          highlight={previewChapter}
          trackClassName={trackClassName}
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
