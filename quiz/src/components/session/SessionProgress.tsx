import { useRef } from 'react'
import { ANSWER_FILL, type AnswerState } from '@/lib/answerState'
import { segmentGap, type Segment, type SegmentGroup, type SegmentState } from '@/lib/sessionProgress'
import { cn } from '@/lib/utils'

// The session's progress bar (docs/redesign-spec.md §5.1, §5.3): one segment
// per question, grouped by step in today's session, each in the colour
// `lib/sessionProgress.ts` gives it. During a quiz it is also the way to jump
// to a question: press or drag along it.

const FILL: Record<SegmentState, string> = {
  ...ANSWER_FILL,
  answered: 'bg-foreground',
  pending: 'bg-border',
}

export function SessionProgress({
  segments,
  groups,
  label,
  markCurrent = false,
  flagged,
  onJump,
  thick = false,
  className,
}: {
  segments: readonly Segment[]
  groups: readonly SegmentGroup[]
  /** What the bar says to a screen reader. */
  label: string
  /** Draw the question on screen taller: answers are held to the end, so its colour alone can't mark it. */
  markCurrent?: boolean
  /** Indexes of flagged questions, each marked with a dot under its segment. */
  flagged?: ReadonlySet<number>
  /** Makes the bar a control: called with the index pressed or dragged to. */
  onJump?: (index: number) => void
  /** The results' bar: 10px instead of 8. */
  thick?: boolean
  className?: string
}) {
  const ref = useRef<HTMLDivElement>(null)
  const dragging = useRef(false)
  const total = segments.length
  const current = Math.max(0, segments.findIndex(s => s.current))
  const gap = segmentGap(total)

  function indexAt(clientX: number): number | null {
    const els = ref.current?.querySelectorAll<HTMLElement>('[data-segment]')
    if (!els || els.length === 0) return null
    let best = 0
    let bestDistance = Infinity
    els.forEach((el, i) => {
      const r = el.getBoundingClientRect()
      const d = clientX < r.left ? r.left - clientX : clientX > r.right ? clientX - r.right : 0
      if (d < bestDistance) { best = i; bestDistance = d }
    })
    return best
  }

  function jumpTo(clientX: number) {
    const i = indexAt(clientX)
    if (i !== null && i !== current) onJump?.(i)
  }

  const interactive = onJump
    ? {
        role: 'slider' as const,
        tabIndex: 0,
        'aria-valuemin': 1,
        'aria-valuemax': total,
        'aria-valuenow': current + 1,
        'aria-valuetext': label,
        'aria-label': 'Question',
        onPointerDown: (e: React.PointerEvent) => {
          dragging.current = true
          e.currentTarget.setPointerCapture?.(e.pointerId)
          jumpTo(e.clientX)
        },
        onPointerMove: (e: React.PointerEvent) => { if (dragging.current) jumpTo(e.clientX) },
        onPointerUp: () => { dragging.current = false },
        onPointerCancel: () => { dragging.current = false },
        onKeyDown: (e: React.KeyboardEvent) => {
          // The page's own ← and → step through the quiz; Home and End are the bar's.
          if (e.key === 'Home' && current !== 0) { e.preventDefault(); onJump(0) }
          if (e.key === 'End' && current !== total - 1) { e.preventDefault(); onJump(total - 1) }
        },
      }
    : { role: 'img' as const, 'aria-label': label }

  return (
    <div
      ref={ref}
      {...interactive}
      data-sound="none"
      className={cn(
        'flex min-w-0 flex-1 items-center gap-2.5',
        // A 44px target around an 8px bar.
        onJump && 'cursor-pointer touch-none py-[18px] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring rounded-md',
        className,
      )}
    >
      {groups.map(group => (
        <span
          key={group.start}
          className="flex min-w-0 items-center"
          style={{ flex: `${group.length} 1 0`, gap }}
        >
          {segments.slice(group.start, group.start + group.length).map((segment, offset) => {
            const i = group.start + offset
            // The question on screen with no colour of its own is the text colour.
            const fill = segment.current && segment.state === 'pending' ? 'bg-foreground' : FILL[segment.state]
            const tall = markCurrent && segment.current
            return (
              <span
                key={i}
                data-segment
                data-state={segment.state}
                data-current={segment.current || undefined}
                className={cn(
                  'relative min-w-0 flex-1 rounded-full',
                  thick ? 'h-2.5' : tall ? 'h-4' : 'h-2',
                  fill,
                )}
              >
                {flagged?.has(i) && (
                  <span aria-hidden="true" className="absolute left-1/2 top-full mt-1 h-1 w-1 -translate-x-1/2 rounded-full bg-foreground" />
                )}
              </span>
            )
          })}
        </span>
      ))}
    </div>
  )
}

/** The finished bar: every question in its final colour. */
export function ResultsBar({ states, groups, label, className }: {
  states: readonly AnswerState[]
  groups: readonly SegmentGroup[]
  label: string
  className?: string
}) {
  return (
    <SessionProgress
      segments={states.map(state => ({ state, current: false }))}
      groups={groups}
      label={label}
      thick
      className={className}
    />
  )
}
