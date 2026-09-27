import { useCallback, useEffect, useLayoutEffect, useRef, useState, type KeyboardEvent as ReactKeyboardEvent } from 'react'
import { ChevronDown, ExternalLink } from 'lucide-react'
import { cn } from '@/lib/utils'
import { placeMenu, type MenuPlacement } from '@/lib/menuPlacement'
import { OverlayPortal } from '@/components/ui/OverlayPortal'
import { LogoTile } from '@/components/LogoTile'
import type { CopySource } from '@/lib/resourceMeta'
import {
  AMAZON_ASSOCIATE_DISCLOSURE,
  AMAZON_CONTENT_DISCLAIMER,
  AMAZON_PRICE_DISCLAIMER,
  fetchAmazonPrice,
  priceStamp,
  type AmazonPrice,
} from '@/lib/amazonPrice'

/**
 * The resource card's "Get a copy" button for a book the vault has no link
 * for: one control that opens the places to look for it (a library, a shop, a
 * shadow library), each a search on the book's ISBN, led by the place's own
 * logo.
 *
 * The Amazon row also carries Amazon's price, read when the menu opens
 * (`lib/amazonPrice.ts`). When there is one the row links to the detail page
 * Amazon vended, and the menu ends with the time it was read and the
 * statements Amazon's licence requires beside its prices. When there is none —
 * no Associates credentials on the deployment, or a book Amazon has no new
 * offer for — the row is the plain ISBN search it always was.
 *
 * The menu portals to the body and is placed by `placeMenu`, for the same
 * reason the concept action menu is — the card sits inside the concept popup,
 * whose stacking context and viewport edge would otherwise clip it.
 */

interface GetCopyMenuProps {
  sources: CopySource[]
  /** The book's ISBN, which the Amazon price is looked up on. */
  isbn?: string
  /** The resource's title, for the button's accessible name. */
  title?: string
  className?: string
}

const MENU_WIDTH_PX = 240
const MENU_MAX_HEIGHT_PX = 400

export function GetCopyMenu({ sources, isbn, title, className }: GetCopyMenuProps) {
  const [open, setOpen] = useState(false)
  const [box, setBox] = useState<MenuPlacement | null>(null)
  const [amazon, setAmazon] = useState<AmazonPrice | null>(null)
  const [showDisclaimer, setShowDisclaimer] = useState(false)
  const triggerRef = useRef<HTMLButtonElement>(null)
  const menuRef = useRef<HTMLDivElement>(null)
  const offersAmazon = sources.some(s => s.id === 'amazon')

  // Asked again on every open rather than kept: Amazon's licence forbids a
  // client from caching its prices, and the endpoint's CDN answers a repeat.
  // The last price stays on screen while the new one is on its way.
  useEffect(() => {
    if (!open || !isbn || !offersAmazon) return
    let live = true
    fetchAmazonPrice(isbn).then(price => {
      if (live) setAmazon(price)
    })
    return () => {
      live = false
    }
  }, [open, isbn, offersAmazon])

  const close = useCallback((refocus = false) => {
    setOpen(false)
    if (refocus) triggerRef.current?.focus()
  }, [])

  const measure = useCallback(() => {
    const el = triggerRef.current
    if (!el) return
    setBox(placeMenu(
      el.getBoundingClientRect(),
      { width: window.innerWidth, height: window.innerHeight },
      { width: MENU_WIDTH_PX, maxHeight: MENU_MAX_HEIGHT_PX },
    ))
  }, [])

  useLayoutEffect(() => {
    if (open) measure()
  }, [open, measure])

  // Follow the trigger if the page scrolls or resizes under an open menu, and
  // close it on a press anywhere else or on Escape.
  useEffect(() => {
    if (!open) return
    const onPointerDown = (e: PointerEvent) => {
      const target = e.target as Node | null
      if (target && (menuRef.current?.contains(target) || triggerRef.current?.contains(target))) return
      close()
    }
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key !== 'Escape') return
      // The popup this sits in closes on Escape too — the menu takes it first.
      e.stopPropagation()
      close(true)
    }
    window.addEventListener('resize', measure)
    window.addEventListener('scroll', measure, true)
    document.addEventListener('pointerdown', onPointerDown)
    document.addEventListener('keydown', onKeyDown, true)
    return () => {
      window.removeEventListener('resize', measure)
      window.removeEventListener('scroll', measure, true)
      document.removeEventListener('pointerdown', onPointerDown)
      document.removeEventListener('keydown', onKeyDown, true)
    }
  }, [open, measure, close])

  // Opening lands focus on the first row, so the arrow keys work at once.
  useEffect(() => {
    if (open && box) menuRef.current?.querySelector<HTMLElement>('[role="menuitem"]')?.focus()
  }, [open, box])

  const onMenuKeyDown = (e: ReactKeyboardEvent) => {
    if (e.key !== 'ArrowDown' && e.key !== 'ArrowUp') return
    e.preventDefault()
    const items = Array.from(menuRef.current?.querySelectorAll<HTMLElement>('[role="menuitem"]') ?? [])
    const at = items.indexOf(document.activeElement as HTMLElement)
    const step = e.key === 'ArrowDown' ? 1 : -1
    items[(at + step + items.length) % items.length]?.focus()
  }

  return (
    <>
      <button
        ref={triggerRef}
        type="button"
        aria-haspopup="menu"
        aria-expanded={open}
        aria-label={`Get a copy of ${title ?? 'this resource'}`}
        onClick={() => setOpen(o => !o)}
        className={cn(
          'inline-flex min-h-[36px] items-center gap-2 rounded-md border border-border bg-muted px-3 py-1.5 text-sm font-medium text-foreground shadow-sm transition-colors hover:bg-accent hover:text-accent-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring',
          className,
        )}
      >
        <ExternalLink className="h-4 w-4 shrink-0 text-primary" aria-hidden />
        Get a copy
        <ChevronDown
          className={cn('h-4 w-4 shrink-0 text-muted-foreground transition-transform', open && 'rotate-180')}
          aria-hidden
        />
      </button>

      {open && box && (
        <OverlayPortal>
          <div
            ref={menuRef}
            className="fixed z-[70] w-60 overflow-y-auto rounded-md border border-border bg-popover text-popover-foreground shadow-md"
            style={{
              left: box.left,
              ...(box.top !== null ? { top: box.top } : { bottom: box.bottom ?? 0 }),
              maxHeight: box.maxHeight,
            }}
          >
            <div role="menu" aria-label="Get a copy from" onKeyDown={onMenuKeyDown} className="py-1">
              {sources.map(source => {
                const price = source.id === 'amazon' ? amazon : null
                return (
                  <a
                    key={source.id}
                    role="menuitem"
                    href={price?.url ?? source.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    onClick={() => close()}
                    className="flex w-full items-center gap-2 px-3 py-2 text-sm transition-colors hover:bg-accent hover:text-accent-foreground focus-visible:bg-accent focus-visible:outline-none"
                  >
                    {/* A white plate under the mark in both themes, as a Cowork
                        publisher's logo gets: each is drawn for a light page,
                        and the plate is what makes three different icons read
                        as one row of tiles. The name beside it says who it is,
                        so the tile is branding — `LogoTile` hides it from AT. */}
                    <LogoTile size="xs" className="overflow-hidden bg-white ring-1 ring-black/5">
                      <img src={source.logo} alt="" className="h-full w-full object-contain" />
                    </LogoTile>
                    <span className="flex-1">{source.label}</span>
                    {price && <span className="font-medium tabular-nums">{price.display}</span>}
                    <ExternalLink className="h-3.5 w-3.5 shrink-0 text-muted-foreground" aria-hidden />
                  </a>
                )
              })}
            </div>

            {/* What Amazon's licence asks for beside one of its prices: when it
                was read, the price disclaimer (here behind "Details", which the
                licence allows), and — in plain view — the content notice and
                the associate disclosure. Only while a price is on screen. */}
            {amazon && (
              <div className="space-y-1.5 border-t border-border px-3 py-2 text-[11px] leading-4 text-muted-foreground">
                <p>
                  Amazon price as of {priceStamp(amazon.asOf)}.{' '}
                  <button
                    type="button"
                    aria-expanded={showDisclaimer}
                    onClick={() => setShowDisclaimer(s => !s)}
                    className="underline underline-offset-2 hover:text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
                  >
                    Details
                  </button>
                </p>
                {showDisclaimer && <p>{AMAZON_PRICE_DISCLAIMER}</p>}
                <p>{AMAZON_ASSOCIATE_DISCLOSURE}</p>
                <p className="text-[10px] leading-[14px]">{AMAZON_CONTENT_DISCLAIMER}</p>
              </div>
            )}
          </div>
        </OverlayPortal>
      )}
    </>
  )
}
