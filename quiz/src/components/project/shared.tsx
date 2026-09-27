import { useEffect, useRef, useState, type KeyboardEvent as ReactKeyboardEvent, type ReactNode } from 'react'
import { X } from 'lucide-react'
import { OverlayPortal } from '@/components/ui/OverlayPortal'
import { cn } from '@/lib/utils'

/** The standard modal (style guide §8.1), portalled so no workspace pane can clip it. */
export function ProjectDialog({
  title,
  onClose,
  children,
  footer,
  wide = false,
}: {
  title: string
  onClose: () => void
  children: ReactNode
  footer?: ReactNode
  wide?: boolean
}) {
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => { if (e.key === 'Escape') onClose() }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [onClose])
  return (
    <OverlayPortal>
      <div
        className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4 backdrop-blur-sm paper-scrim"
        onClick={onClose}
        role="dialog"
        aria-modal="true"
        aria-label={title}
      >
        <div
          className={cn('relative flex max-h-[90dvh] w-full flex-col gap-4 overflow-y-auto rounded-2xl bg-card p-6 shadow-2xl', wide ? 'max-w-lg' : 'max-w-sm')}
          onClick={e => e.stopPropagation()}
        >
          <button type="button" onClick={onClose} aria-label="Dismiss" className="absolute right-4 top-4 text-muted-foreground hover:text-foreground">
            <X className="h-4 w-4" />
          </button>
          <h2 className="pr-6 text-base font-semibold">{title}</h2>
          {children}
          {footer && <div className="flex flex-wrap justify-end gap-2">{footer}</div>}
        </div>
      </div>
    </OverlayPortal>
  )
}

export interface MenuItem {
  label: string
  icon?: ReactNode
  onSelect: () => void
  destructive?: boolean
  disabled?: boolean
}

/** A small dropdown: a trigger and a list of actions. */
export function PopMenu({
  trigger,
  items,
  align = 'left',
  label,
}: {
  trigger: ReactNode
  items: MenuItem[]
  align?: 'left' | 'right'
  label: string
}) {
  const [open, setOpen] = useState(false)
  const ref = useRef<HTMLDivElement>(null)
  useEffect(() => {
    if (!open) return
    const onDown = (e: MouseEvent) => { if (ref.current && !ref.current.contains(e.target as Node)) setOpen(false) }
    const onKey = (e: KeyboardEvent) => { if (e.key === 'Escape') setOpen(false) }
    document.addEventListener('mousedown', onDown)
    window.addEventListener('keydown', onKey)
    return () => {
      document.removeEventListener('mousedown', onDown)
      window.removeEventListener('keydown', onKey)
    }
  }, [open])
  return (
    <div ref={ref} className="relative">
      <button
        type="button"
        aria-label={label}
        aria-haspopup="menu"
        aria-expanded={open}
        onClick={() => setOpen(o => !o)}
        className="flex h-8 items-center gap-1 rounded-md px-2 text-xs font-medium text-muted-foreground hover:bg-accent hover:text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
      >
        {trigger}
      </button>
      {open && (
        <div
          role="menu"
          className={cn('absolute top-full z-50 mt-1 min-w-[11rem] rounded-lg bg-popover p-1 text-popover-foreground shadow-lg', align === 'right' ? 'right-0' : 'left-0')}
        >
          {items.map(item => (
            <button
              key={item.label}
              type="button"
              role="menuitem"
              disabled={item.disabled}
              onClick={() => { setOpen(false); item.onSelect() }}
              className={cn(
                'flex w-full items-center gap-2 rounded-md px-2.5 py-1.5 text-left text-sm hover:bg-accent disabled:pointer-events-none disabled:opacity-40',
                item.destructive && 'text-destructive',
              )}
            >
              {item.icon}
              {item.label}
            </button>
          ))}
        </div>
      )}
    </div>
  )
}

export interface Choice<T extends string> {
  value: T
  label: string
  icon?: ReactNode
  /** What choosing it means — the consequence the label can't carry. */
  detail: string
}

/**
 * A choice between a few options whose *consequences* differ, each a card
 * with its label and one line of what it means. The segmented control is for
 * choices whose labels say it all; this is for the ones that can't, so the
 * line lives inside the option instead of as a caption under the control.
 * Same radiogroup behaviour: arrows move the selection.
 */
export function ChoiceCards<T extends string>({
  label,
  value,
  onChange,
  choices,
}: {
  label: string
  value: T
  onChange: (value: T) => void
  choices: Choice<T>[]
}) {
  const groupRef = useRef<HTMLDivElement>(null)
  function onKeyDown(e: ReactKeyboardEvent) {
    const delta = e.key === 'ArrowRight' || e.key === 'ArrowDown' ? 1 : e.key === 'ArrowLeft' || e.key === 'ArrowUp' ? -1 : 0
    if (!delta) return
    e.preventDefault()
    const at = choices.findIndex(c => c.value === value)
    const next = choices[(at + delta + choices.length) % choices.length]
    onChange(next.value)
    groupRef.current?.querySelector<HTMLButtonElement>(`[data-choice="${CSS.escape(next.value)}"]`)?.focus()
  }
  return (
    <div ref={groupRef} role="radiogroup" aria-label={label} onKeyDown={onKeyDown} className="grid gap-2 sm:grid-cols-2">
      {choices.map(c => {
        const active = c.value === value
        return (
          <button
            key={c.value}
            type="button"
            role="radio"
            aria-checked={active}
            data-choice={c.value}
            tabIndex={active ? 0 : -1}
            onClick={() => onChange(c.value)}
            className={cn(
              'flex flex-col items-start gap-1 rounded-xl border p-3 text-left transition-colors',
              'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-1 focus-visible:ring-offset-background',
              active ? 'border-primary bg-primary/10' : 'border-border hover:bg-accent/60',
            )}
          >
            <span className="flex items-center gap-2 text-sm font-semibold">{c.icon}{c.label}</span>
            <span className="text-xs leading-snug text-muted-foreground">{c.detail}</span>
          </button>
        )
      })}
    </div>
  )
}
