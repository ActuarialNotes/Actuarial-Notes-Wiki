// The card's one menu (docs/actuarial-tools.md §6.3): everything that isn't
// the answer or an input — copy, share, export, and Send to… the next tool.

import { useEffect, useLayoutEffect, useRef, useState, type ReactNode } from 'react'
import { ArrowRight, Bot, Braces, Check, Download, Link2, MoreHorizontal } from 'lucide-react'
import { OverlayPortal } from '@/components/ui/OverlayPortal'
import { placeMenu, type MenuPlacement } from '@/lib/menuPlacement'
import { cn } from '@/lib/utils'

export interface ToolMenuItem {
  key: string
  label: string
  icon: 'link' | 'ai' | 'json' | 'download' | 'next'
  /** Returns text to put on the clipboard, or nothing for an action that does its own thing. */
  run: () => string | void
  disabled?: boolean
}

const ICONS = { link: Link2, ai: Bot, json: Braces, download: Download, next: ArrowRight }
const MENU_WIDTH = 232

async function copy(text: string): Promise<boolean> {
  try {
    await navigator.clipboard.writeText(text)
    return true
  } catch {
    return false
  }
}

export function ToolMenu({ items, header }: { items: ToolMenuItem[]; header?: ReactNode }) {
  const [open, setOpen] = useState(false)
  const [copied, setCopied] = useState<string | null>(null)
  const [place, setPlace] = useState<MenuPlacement | null>(null)
  const button = useRef<HTMLButtonElement>(null)
  const menu = useRef<HTMLDivElement>(null)

  useLayoutEffect(() => {
    if (!open || !button.current) return
    // A DOMRect's sides are getters, so they are copied by name, not spread.
    const { right, top, bottom } = button.current.getBoundingClientRect()
    setPlace(placeMenu(
      // Right-aligned under the button: it sits at the card's right edge.
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
    const esc = (e: KeyboardEvent) => e.key === 'Escape' && setOpen(false)
    document.addEventListener('mousedown', away)
    document.addEventListener('keydown', esc)
    return () => {
      document.removeEventListener('mousedown', away)
      document.removeEventListener('keydown', esc)
    }
  }, [open])

  const choose = async (item: ToolMenuItem) => {
    const text = item.run()
    if (typeof text === 'string' && (await copy(text))) {
      setCopied(item.key)
      window.setTimeout(() => setCopied(null), 1400)
      return
    }
    setOpen(false)
  }

  return (
    <>
      <button
        ref={button}
        type="button"
        aria-label="More"
        aria-haspopup="menu"
        aria-expanded={open}
        onClick={() => setOpen(o => !o)}
        className="inline-flex h-10 w-10 items-center justify-center rounded-lg border border-border text-muted-foreground transition-colors hover:bg-accent hover:text-foreground"
      >
        <MoreHorizontal className="h-5 w-5" aria-hidden />
      </button>
      {open && place && (
        <OverlayPortal>
          <div
            ref={menu}
            role="menu"
            style={{ position: 'fixed', left: place.left, top: place.top ?? undefined, bottom: place.bottom ?? undefined, width: MENU_WIDTH, maxHeight: place.maxHeight }}
            className="paper-drop z-[70] overflow-y-auto rounded-xl border border-border bg-popover p-1 text-popover-foreground shadow-lg"
          >
            {header && <div className="px-2.5 py-2 text-xs text-muted-foreground">{header}</div>}
            {items.map(item => {
              const Icon = copied === item.key ? Check : ICONS[item.icon]
              return (
                <button
                  key={item.key}
                  type="button"
                  role="menuitem"
                  disabled={item.disabled}
                  onClick={() => choose(item)}
                  className={cn(
                    'flex w-full items-center gap-2.5 rounded-lg px-2.5 py-2 text-left text-sm transition-colors hover:bg-accent disabled:opacity-50',
                    copied === item.key && 'text-emerald-600 dark:text-emerald-400',
                  )}
                >
                  <Icon className="h-4 w-4 shrink-0" aria-hidden />
                  <span className="truncate">{copied === item.key ? 'Copied' : item.label}</span>
                </button>
              )
            })}
          </div>
        </OverlayPortal>
      )}
    </>
  )
}
