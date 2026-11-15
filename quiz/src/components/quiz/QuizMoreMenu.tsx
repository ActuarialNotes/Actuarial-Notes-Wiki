import { useEffect, useLayoutEffect, useRef, useState } from 'react'
import { MoreHorizontal, type LucideIcon } from 'lucide-react'
import { OverlayPortal } from '@/components/ui/OverlayPortal'
import { INK_MENU, inkMenuItem } from '@/components/ui/ink'
import { placeMenu, type MenuPlacement } from '@/lib/menuPlacement'
import { cn } from '@/lib/utils'

export interface QuizMoreItem {
  key: string
  label: string
  icon: LucideIcon
  onSelect: () => void
  /** The key that does the same thing, shown where there is a keyboard. */
  shortcut?: string
  /** Offered only where there is a keyboard (the shortcuts list). */
  keyboardOnly?: boolean
}

const MENU_WIDTH = 248

/**
 * The quiz header's **More** menu (design review F8): everything about the
 * question and the quiz that isn't answering it — flag, info, sound, the
 * settings the quiz was started with — as labelled rows behind one button, so
 * while a question is being answered the screen is the question.
 */
export function QuizMoreMenu({ items }: { items: QuizMoreItem[] }) {
  const [open, setOpen] = useState(false)
  const [place, setPlace] = useState<MenuPlacement | null>(null)
  const button = useRef<HTMLButtonElement>(null)
  const menu = useRef<HTMLDivElement>(null)

  useLayoutEffect(() => {
    if (!open || !button.current) return
    // A DOMRect's sides are getters, so they are copied by name, not spread.
    const { right, top, bottom } = button.current.getBoundingClientRect()
    setPlace(placeMenu(
      // Right-aligned under the button, which sits at the row's right edge.
      { left: right - MENU_WIDTH, right, top, bottom },
      { width: document.documentElement.clientWidth, height: window.innerHeight },
      { width: MENU_WIDTH, maxHeight: 360 },
    ))
  }, [open])

  useEffect(() => {
    if (!open) return
    const away = (e: MouseEvent) => {
      if (!menu.current?.contains(e.target as Node) && !button.current?.contains(e.target as Node)) setOpen(false)
    }
    const esc = (e: KeyboardEvent) => {
      if (e.key !== 'Escape') return
      setOpen(false)
      button.current?.focus()
    }
    document.addEventListener('mousedown', away)
    document.addEventListener('keydown', esc)
    return () => {
      document.removeEventListener('mousedown', away)
      document.removeEventListener('keydown', esc)
    }
  }, [open])

  return (
    <>
      <button
        ref={button}
        type="button"
        data-testid="quiz-more"
        aria-label="More"
        title="More"
        aria-haspopup="menu"
        aria-expanded={open}
        onClick={() => setOpen(o => !o)}
        className={cn(
          '-mr-2 flex h-11 w-11 shrink-0 items-center justify-center rounded-lg transition-colors hover:bg-accent hover:text-foreground',
          'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring',
          open ? 'bg-accent text-foreground' : 'text-muted-foreground',
        )}
      >
        <MoreHorizontal className="h-5 w-5" aria-hidden />
      </button>
      {open && place && (
        <OverlayPortal>
          <div
            ref={menu}
            role="menu"
            aria-label="More"
            style={{ position: 'fixed', left: place.left, top: place.top ?? undefined, bottom: place.bottom ?? undefined, width: MENU_WIDTH, maxHeight: place.maxHeight }}
            className={cn('paper-drop z-[70] overflow-y-auto', INK_MENU)}
          >
            {items.map(item => (
              <button
                key={item.key}
                type="button"
                role="menuitem"
                // The row's own action makes its sound where it has one.
                data-sound="none"
                onClick={() => { setOpen(false); item.onSelect() }}
                className={inkMenuItem(false, cn('text-foreground', item.keyboardOnly && 'hidden sm:flex'))}
              >
                <item.icon className="h-4 w-4 shrink-0 text-muted-foreground" aria-hidden />
                <span className="min-w-0 flex-1 truncate">{item.label}</span>
                {item.shortcut && (
                  <kbd className="hidden shrink-0 text-xs text-muted-foreground sm:inline" aria-hidden>{item.shortcut}</kbd>
                )}
              </button>
            ))}
          </div>
        </OverlayPortal>
      )}
    </>
  )
}
