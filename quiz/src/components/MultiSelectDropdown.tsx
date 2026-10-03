import { useEffect, useLayoutEffect, useRef, useState } from 'react'
import { ChevronDown } from 'lucide-react'
import { placeMenu } from '@/lib/menuPlacement'

interface MultiSelectOption {
  value: string
  label: string
  /** A second line under the label, in the option's own case — the
   *  statement of a learning objective under its code. */
  hint?: string
  /** A heading the option is listed under. Consecutive options with the same
   *  group share one heading, so pass them already in order. */
  group?: string
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
  /** `pill` draws the trigger as a compact outlined pill, the shape of the
   *  toggles it sits in a row with (the Store's Free). */
  shape?: 'tile' | 'pill'
}

/** A pill-style button that opens a checkbox list for multi-selecting options.
 *  The Concepts, Source, Exam and Sitting filters of every question list
 *  (`QuestionFilterBar`) and the Exam, Publisher and Year filters of the
 *  Resources shelf (`pages/wiki/WikiResources.tsx`) are drawn with it, and so
 *  is the learning-objective filter over an exam's source material
 *  (`components/wiki/SourceMaterialGallery.tsx`). */
export function MultiSelectDropdown({
  label,
  options,
  selected,
  onToggle,
  getCount,
  emptyTitle,
  surface = 'background',
  shape = 'tile',
}: MultiSelectDropdownProps) {
  const [open, setOpen] = useState(false)
  const ref = useRef<HTMLDivElement>(null)
  const buttonRef = useRef<HTMLButtonElement>(null)
  const menuRef = useRef<HTMLDivElement>(null)
  // How far the menu sits left of the pill's own left edge. It hangs from that
  // edge when it fits, but a pill at the end of a phone-width row (Source,
  // Concepts) opened a menu whose names and counts ran off the screen —
  // `placeMenu` slides it back inside.
  const [menuShift, setMenuShift] = useState(0)

  useLayoutEffect(() => {
    if (!open) return
    const button = buttonRef.current
    const menu = menuRef.current
    if (!button || !menu) return
    const anchor = button.getBoundingClientRect()
    const { left } = placeMenu(
      anchor,
      { width: document.documentElement.clientWidth, height: window.innerHeight },
      { width: menu.offsetWidth, maxHeight: menu.offsetHeight },
    )
    setMenuShift(left - anchor.left)
  }, [open, options])

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
        ref={buttonRef}
        type="button"
        onClick={() => setOpen(v => !v)}
        disabled={empty}
        title={empty ? emptyTitle : undefined}
        aria-label={single !== null ? `${label}: ${displayLabel}` : undefined}
        className={`flex items-center text-sm font-medium transition-colors whitespace-nowrap disabled:opacity-40 disabled:cursor-not-allowed ${
          shape === 'pill' ? 'gap-1 rounded-full border px-3 py-1.5' : 'gap-2 rounded-lg px-4 py-2.5'
        } ${
          selected.size > 0
            ? `bg-primary/10 text-primary${shape === 'pill' ? ' border-primary/40' : ''}`
            : `${surface === 'card' ? 'bg-card' : 'bg-background'} enabled:hover:bg-accent`
        }`}
      >
        <span className="max-w-[14rem] truncate">{displayLabel}</span>
        <ChevronDown className={`${shape === 'pill' ? 'h-3.5 w-3.5' : 'h-4 w-4'} transition-transform shrink-0 ${open ? 'rotate-180' : ''}`} />
      </button>
      {open && !empty && (
        <div
          ref={menuRef}
          style={{ left: menuShift }}
          className="absolute top-full mt-1 z-20 bg-card rounded-lg shadow-lg w-max min-w-[200px] max-w-[18rem] py-1.5 max-h-72 overflow-y-auto">
          {options.map((opt, i) => {
            const count = getCount?.(opt.value)
            const heading = opt.group && opt.group !== options[i - 1]?.group ? opt.group : null
            return (
              <div key={opt.value}>
                {heading && (
                  <p className="px-4 pt-2.5 pb-1 text-xs font-medium text-muted-foreground">{heading}</p>
                )}
                <button
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
                  {opt.hint ? (
                    <span className="flex-1 min-w-0">
                      <span className="capitalize">{opt.label}</span>
                      <span className="block text-xs text-muted-foreground leading-snug">{opt.hint}</span>
                    </span>
                  ) : (
                    <span className="capitalize flex-1">{opt.label}</span>
                  )}
                  {count !== undefined && (
                    <span className="ml-2 text-xs bg-muted text-muted-foreground rounded-full px-2 py-0.5 min-w-[1.5rem] text-center font-medium">
                      {count}
                    </span>
                  )}
                </button>
              </div>
            )
          })}
        </div>
      )}
    </div>
  )
}
