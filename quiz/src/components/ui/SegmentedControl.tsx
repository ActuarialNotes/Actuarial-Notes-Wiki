import { useRef, type ReactNode } from 'react'
import { cn } from '@/lib/utils'

/**
 * The app's segmented control: a small row of mutually exclusive choices.
 *
 * Four of these had been hand-rolled (the quiz builder's mode, count and
 * exam-body pickers, and the Study Guides body picker) in two different shapes,
 * none of them announcing themselves as a group of choices. This is the one
 * shape, with the radiogroup semantics that come with it — arrow keys move
 * between options, and `role="radio"` also earns the app's `select` cue from
 * the delegated sound listener (see docs/sound-design.md).
 *
 * The selected option is deliberately a *raised neutral* rather than a
 * `bg-primary` fill: a segmented control is a refinement, not the view's
 * primary action, and a solid primary here competes with the button that
 * actually commits (style guide §1.2).
 */

export interface SegmentedOption<T extends string> {
  value: T
  label: ReactNode
  /** Accessible name, when `label` alone doesn't read well (icons, counts). */
  ariaLabel?: string
  /** Relative width. Defaults to 1; give a wider option 2. */
  flex?: number
  disabled?: boolean
}

interface SegmentedControlProps<T extends string> {
  value: T
  onChange: (value: T) => void
  options: SegmentedOption<T>[]
  /** Accessible name for the group as a whole, e.g. "Question count". */
  label: string
  size?: 'sm' | 'md'
  className?: string
}

const SIZES = {
  sm: 'h-9',
  md: 'h-10',
} as const

export function SegmentedControl<T extends string>({
  value,
  onChange,
  options,
  label,
  size = 'md',
  className,
}: SegmentedControlProps<T>) {
  const groupRef = useRef<HTMLDivElement>(null)

  // Arrow keys move the selection, wrapping at both ends — what a radiogroup is
  // expected to do, and the reason this is a group rather than loose buttons.
  function handleKeyDown(e: React.KeyboardEvent) {
    const delta = e.key === 'ArrowRight' || e.key === 'ArrowDown' ? 1
      : e.key === 'ArrowLeft' || e.key === 'ArrowUp' ? -1
      : 0
    if (delta === 0) return
    const enabled = options.filter(o => !o.disabled)
    if (enabled.length === 0) return
    e.preventDefault()
    const at = enabled.findIndex(o => o.value === value)
    const next = enabled[(at + delta + enabled.length) % enabled.length]
    onChange(next.value)
    // Move focus with the selection so the next arrow press continues from here.
    const btn = groupRef.current?.querySelector<HTMLButtonElement>(
      `[data-segment="${CSS.escape(next.value)}"]`,
    )
    btn?.focus()
  }

  return (
    <div
      ref={groupRef}
      role="radiogroup"
      aria-label={label}
      onKeyDown={handleKeyDown}
      className={cn('flex items-center gap-0.5 rounded-lg border border-border bg-muted/50 p-0.5', className)}
    >
      {options.map(option => {
        const isActive = option.value === value
        return (
          <button
            key={option.value}
            type="button"
            role="radio"
            aria-checked={isActive}
            aria-label={option.ariaLabel}
            data-segment={option.value}
            disabled={option.disabled}
            // Only the selected option is in the tab order; arrows move within
            // the group. This is the standard radiogroup interaction.
            tabIndex={isActive ? 0 : -1}
            onClick={() => onChange(option.value)}
            style={{ flex: option.flex ?? 1 }}
            className={cn(
              'flex min-w-0 items-center justify-center gap-1.5 rounded-md px-2 text-sm font-medium transition-colors',
              'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-1 focus-visible:ring-offset-background',
              'disabled:pointer-events-none disabled:opacity-40',
              SIZES[size],
              isActive
                ? 'bg-background text-foreground shadow-sm'
                : 'text-muted-foreground hover:bg-accent/60 hover:text-foreground',
            )}
          >
            {option.label}
          </button>
        )
      })}
    </div>
  )
}
