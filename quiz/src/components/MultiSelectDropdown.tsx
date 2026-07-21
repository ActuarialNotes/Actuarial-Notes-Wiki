import { useEffect, useRef, useState } from 'react'
import { ChevronDown } from 'lucide-react'

interface MultiSelectOption {
  value: string
  label: string
}

interface MultiSelectDropdownProps {
  label: string
  options: MultiSelectOption[]
  selected: Set<string>
  onToggle: (value: string) => void
  getCount?: (value: string) => number
}

/** A pill-style button that opens a checkbox list for multi-selecting options.
 *  Shared by the concept-questions modal and the quiz search bar so both expose
 *  the same "Concepts" filter affordance. */
export function MultiSelectDropdown({
  label,
  options,
  selected,
  onToggle,
  getCount,
}: MultiSelectDropdownProps) {
  const [open, setOpen] = useState(false)
  const ref = useRef<HTMLDivElement>(null)

  useEffect(() => {
    function handler(e: MouseEvent) {
      if (ref.current && !ref.current.contains(e.target as Node)) setOpen(false)
    }
    document.addEventListener('mousedown', handler)
    return () => document.removeEventListener('mousedown', handler)
  }, [])

  const displayLabel =
    selected.size === 0
      ? label
      : selected.size === options.length
        ? `${label}: All`
        : `${label} (${selected.size})`

  return (
    <div ref={ref} className="relative">
      <button
        type="button"
        onClick={() => setOpen(v => !v)}
        className={`flex items-center gap-2 px-4 py-2.5 rounded-lg text-sm font-medium transition-colors whitespace-nowrap ${
          selected.size > 0
            ? 'bg-primary/10 text-primary'
            : 'bg-background hover:bg-accent'
        }`}
      >
        <span>{displayLabel}</span>
        <ChevronDown className={`h-4 w-4 transition-transform shrink-0 ${open ? 'rotate-180' : ''}`} />
      </button>
      {open && (
        <div className="absolute top-full left-0 mt-1 z-20 bg-card rounded-lg shadow-lg min-w-[200px] py-1.5 max-h-72 overflow-y-auto">
          {options.map(opt => {
            const count = getCount?.(opt.value)
            return (
              <button
                key={opt.value}
                type="button"
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
