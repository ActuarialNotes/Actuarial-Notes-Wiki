import { useEffect, useLayoutEffect, useRef, useState } from 'react'
import { ChevronDown } from 'lucide-react'
import { placeMenu } from '@/lib/menuPlacement'
import { CheckMark } from '@/components/CheckMark'
import { INK_MENU, INK_MENU_HEADING, inkChevron, inkMenuItem, inkTrigger } from '@/components/ui/ink'

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
  /** `pill` draws the trigger a size smaller, the height of the chips it
   *  sits in a row with (the Store's Free). */
  shape?: 'tile' | 'pill'
  /** One choice at a time — a radio mark, and picking closes the menu. The
   *  Resources shelf's Vintage: an edition of the syllabus, never two. */
  single?: boolean
  /** Everything ticked is this control's resting state (Difficulty opens with
   *  all three levels on), so the pill stays unhighlighted until it narrows. */
  allByDefault?: boolean
}

/** An Ink dropdown (style guide §7.0) — a bold label and a chevron that opens a
 *  list for multi-selecting options (or, with `single`, picking one). Picked
 *  rows go solid in the pick, and so does the trigger while it is open or
 *  while the filter narrows the list.
 *  The Concepts, Source, Exam and Sitting filters of every question list
 *  (`QuestionFilterBar`) and the Exam, Publisher, Year and Vintage filters of the
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
  shape = 'tile',
  single: singleChoice = false,
  allByDefault = false,
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
  const highlighted = selected.size > 0 && !(allByDefault && selected.size === options.length)

  return (
    <div ref={ref} className="relative">
      <button
        ref={buttonRef}
        type="button"
        onClick={() => setOpen(v => !v)}
        disabled={empty}
        title={empty ? emptyTitle : undefined}
        aria-label={single !== null ? `${label}: ${displayLabel}` : undefined}
        aria-expanded={open}
        className={inkTrigger(open || highlighted, shape === 'pill' ? 'h-9 rounded-full px-3 text-sm' : undefined)}
      >
        <span className="max-w-[14rem] truncate">{displayLabel}</span>
        <ChevronDown className={inkChevron(open, shape === 'pill' ? 'h-3.5 w-3.5' : undefined)} />
      </button>
      {open && !empty && (
        <div
          ref={menuRef}
          style={{ left: menuShift }}
          className={`absolute top-full mt-1.5 z-20 w-max min-w-[200px] max-w-[18rem] max-h-72 overflow-y-auto ${INK_MENU}`}>
          {options.map((opt, i) => {
            const count = getCount?.(opt.value)
            const heading = opt.group && opt.group !== options[i - 1]?.group ? opt.group : null
            return (
              <div key={opt.value}>
                {heading && (
                  <p className={INK_MENU_HEADING}>{heading}</p>
                )}
                <button
                  type="button"
                  data-sound="tick"
                  role={singleChoice ? 'menuitemradio' : undefined}
                  aria-checked={singleChoice ? selected.has(opt.value) : undefined}
                  onClick={() => {
                    onToggle(opt.value)
                    if (singleChoice) setOpen(false)
                  }}
                  aria-pressed={singleChoice ? undefined : selected.has(opt.value)}
                  className={inkMenuItem(selected.has(opt.value))}
                >
                  {opt.hint ? (
                    <span className="flex-1 min-w-0">
                      <span className="capitalize">{opt.label}</span>
                      <span className="block text-xs font-normal opacity-75 leading-snug">{opt.hint}</span>
                    </span>
                  ) : (
                    <span className="capitalize flex-1">{opt.label}</span>
                  )}
                  {count !== undefined && (
                    <span className="ml-2 text-xs font-medium tabular-nums opacity-75 min-w-[1.5rem] text-right">
                      {count}
                    </span>
                  )}
                  {/* The pick is solid; its check is the app's one checkmark, in the pick's text colour. */}
                  {selected.has(opt.value)
                    ? <CheckMark className="h-4 w-4 text-current" />
                    : <span className="h-4 w-4 shrink-0" aria-hidden />}
                </button>
              </div>
            )
          })}
        </div>
      )}
    </div>
  )
}
