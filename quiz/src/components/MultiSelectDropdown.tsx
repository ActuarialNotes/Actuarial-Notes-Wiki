import { useEffect, useLayoutEffect, useRef, useState } from 'react'
import { ChevronDown } from 'lucide-react'
import { placeMenu } from '@/lib/menuPlacement'

interface MultiSelectOption {
  value: string
  label: string
}

interface MultiSelectDropdownProps {
  label: string
  options: MultiSelectOption[]
  selected: ReadonlySet<string>
  onToggle: (value: string) => void
  getCount?: (value: string) => number
  /** Why there is nothing to pick, shown as the tooltip of the disabled pill.
   *  A dropdown with no options stays on screen, disabled, so a filter the
   *  surface always offers doesn't come and go with the pool. */
  emptyTitle?: string
  /** The pill's resting fill while nothing is chosen. `background` suits a
   *  row on a card or panel; on the page itself it would leave the pill
   *  without a shape, so a page's own filter row (the Resources shelf) takes
   *  `card`. */
  surface?: 'background' | 'card'
}

/** A pill-style button that opens a checkbox list for multi-selecting options.
 *  The Concepts, Exam and Sitting filters of every question list
 *  (`QuestionFilterBar`) and the Exam, Publisher and Year filters of the
 *  Resources shelf (`pages/wiki/WikiResources.tsx`) are drawn with it. */
export function MultiSelectDropdown({
  label,
  options,
  selected,
  onToggle,
  getCount,
  emptyTitle,
  surface = 'background',
}: MultiSelectDropdownProps) {
  const [open, setOpen] = useState(false)
  const ref = useRef<HTMLDivElement>(null)
  const menuRef = useRef<HTMLDivElement>(null)
  // How far the menu sits from its trigger's left edge. It prefers to line up
  // with the trigger, but a filter at the end of a row on a phone would push it
  // past the screen's right edge — `placeMenu` slides it back inside, the rule
  // every menu in the app keeps. Measured before paint, so it never flashes.
  const [shift, setShift] = useState(0)

  useLayoutEffect(() => {
    if (!open) return
    const trigger = ref.current
    const menu = menuRef.current
    if (!trigger || !menu) return
    const anchor = trigger.getBoundingClientRect()
    const { left } = placeMenu(
      anchor,
      { width: document.documentElement.clientWidth, height: window.innerHeight },
      { width: menu.offsetWidth, maxHeight: menu.offsetHeight },
    )
    setShift(left - anchor.left)
  }, [open])

  useEffect(() => {
    function handler(e: MouseEvent) {
      if (ref.current && !ref.current.contains(e.target as Node)) setOpen(false)
    }
    document.addEventListener('mousedown', handler)
    return () => document.removeEventListener('mousedown', handler)
  }, [])

  // One choice is named outright — "Exam MAS-II", "Spring 2019" — so the pill
  // says what the list is filtered to without being opened.
  const single = selected.size === 1 ? [...selected][0] : null
  const displayLabel =
    selected.size === 0
      ? label
      : single !== null
        ? (options.find(o => o.value === single)?.label ?? single)
        : selected.size === options.length
          ? `${label}: All`
          : `${label} (${selected.size})`
  const empty = options.length === 0

  return (
    <div ref={ref} className="relative">
      <button
        type="button"
        onClick={() => setOpen(v => !v)}
        disabled={empty}
        title={empty ? emptyTitle : undefined}
        aria-label={single !== null ? `${label}: ${displayLabel}` : undefined}
        className={`flex items-center gap-2 px-4 py-2.5 rounded-lg text-sm font-medium transition-colors whitespace-nowrap disabled:opacity-40 disabled:cursor-not-allowed ${
          selected.size > 0
            ? 'bg-primary/10 text-primary'
            : `${surface === 'card' ? 'bg-card' : 'bg-background'} enabled:hover:bg-accent`
        }`}
      >
        <span className="max-w-[14rem] truncate">{displayLabel}</span>
        <ChevronDown className={`h-4 w-4 transition-transform shrink-0 ${open ? 'rotate-180' : ''}`} />
      </button>
      {open && !empty && (
        <div
          ref={menuRef}
          style={{ left: shift }}
          className="absolute top-full mt-1 z-20 bg-card rounded-lg shadow-lg w-max min-w-[200px] max-w-[18rem] py-1.5 max-h-72 overflow-y-auto"
        >
          {options.map(opt => {
            const count = getCount?.(opt.value)
            return (
              <button
                key={opt.value}
                type="button"
                data-sound="tick"
                onClick={() => onToggle(opt.value)}
                className="flex items-center gap-3 w-full px-4 py-3 text-sm hover:bg-accent transition-colors text-left"
              >
                <div
                  className={`h-4 w-4 rounded border flex items-center justify-center shrink-0 ${
                    selected.has(opt.value) ? 'bg-primary border-primary' : 'border-input bg-background'
                  }`}
                >
                  {selected.has(opt.value) && (
                    <svg className="h-2.5 w-2.5 text-primary-foreground" fill="none" viewBox="0 0 10 10">
                      <path d="M2 5L4 7L8 3" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                  )}
                </div>
                <span className="capitalize flex-1">{opt.label}</span>
                {count !== undefined && (
                  <span className="ml-2 text-xs bg-muted text-muted-foreground rounded-full px-2 py-0.5 min-w-[1.5rem] text-center font-medium">
                    {count}
                  </span>
                )}
              </button>
            )
          })}
        </div>
      )}
    </div>
  )
}
