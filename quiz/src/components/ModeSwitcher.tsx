import { useCallback, useEffect, useLayoutEffect, useRef, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { Check, ChevronDown, Lock } from 'lucide-react'
import {
  APP_MODES,
  canEnterMode,
  modeDestination,
  modeLockReason,
  modeSpec,
  type AppMode,
  type ModeViewer,
} from '@/lib/appMode'
import { OverlayPortal } from '@/components/ui/OverlayPortal'
import { ProBadge } from '@/components/ProBadge'
import { placeMenu, type MenuPlacement } from '@/lib/menuPlacement'
import { useAuth } from '@/hooks/useAuth'
import { useSubscription } from '@/hooks/useSubscription'
import { cn } from '@/lib/utils'

/**
 * The **mode pill** — the green `Study` / `Cowork` chip beside the wordmark,
 * and the menu it opens.
 *
 * It is the one control that says which product you are standing in. The pill
 * itself is the mode's name; pressing it lists the modes with a line each and,
 * where a mode is locked, the one sentence that says what it takes to open it
 * (`lib/appMode.ts` — the pill renders that module, it doesn't re-decide it).
 *
 * The green is a deliberate exception to the style guide's semantic palette:
 * green is "correct" everywhere else, but here it is a *place* marker rather
 * than a verdict, and it is the only green chip that ever sits on the header
 * row — nothing on that row can be answered right or wrong. Cowork's own pill
 * is violet so the two places never read as the same one at a glance.
 *
 * Like every other menu in the app it portals to the body and is placed by
 * `lib/menuPlacement.ts`, so the header's stacking context and the viewport's
 * edges can't clip it.
 */

const MENU_WIDTH_PX = 272
const MENU_MAX_HEIGHT_PX = 360

/** The pill's colour per mode — a place marker, not a verdict (see above). */
const PILL_TONE: Record<AppMode, string> = {
  study: 'bg-emerald-500/15 text-emerald-700 dark:bg-emerald-500/20 dark:text-emerald-300',
  cowork: 'bg-violet-500/15 text-violet-700 dark:bg-violet-500/20 dark:text-violet-300',
}

function samePlacement(a: MenuPlacement, b: MenuPlacement): boolean {
  return a.left === b.left && a.top === b.top && a.bottom === b.bottom && a.maxHeight === b.maxHeight
}

export interface ModeSwitcherProps {
  /** The mode the current route belongs to — `modeForPath` in the host. */
  mode: AppMode
  /** Called once a mode has been picked, so a drawer host can close itself. */
  onNavigate?: () => void
  className?: string
}

export function ModeSwitcher({ mode, onNavigate, className }: ModeSwitcherProps) {
  const [open, setOpen] = useState(false)
  const [box, setBox] = useState<MenuPlacement | null>(null)
  const triggerRef = useRef<HTMLButtonElement>(null)
  const menuRef = useRef<HTMLDivElement>(null)
  const navigate = useNavigate()
  const { user } = useAuth()
  const { isPro } = useSubscription()

  const viewer: ModeViewer = { signedIn: !!user, isPro }
  const active = modeSpec(mode)

  const measure = useCallback(() => {
    const el = triggerRef.current
    if (!el) return
    const next = placeMenu(
      el.getBoundingClientRect(),
      { width: window.innerWidth, height: window.innerHeight },
      { width: MENU_WIDTH_PX, maxHeight: MENU_MAX_HEIGHT_PX },
    )
    setBox(prev => (prev && samePlacement(prev, next) ? prev : next))
  }, [])

  useLayoutEffect(() => {
    if (open) measure()
  }, [open, measure])

  useEffect(() => {
    if (!open) return
    const onViewportChange = () => measure()
    window.addEventListener('resize', onViewportChange)
    window.addEventListener('scroll', onViewportChange, true)
    return () => {
      window.removeEventListener('resize', onViewportChange)
      window.removeEventListener('scroll', onViewportChange, true)
    }
  }, [open, measure])

  // Close on a press outside, or on Escape. The trigger toggles the menu
  // itself, so it has to count as "inside" or the two handlers cancel out.
  useEffect(() => {
    if (!open) return
    function onPointerDown(e: MouseEvent) {
      const target = e.target as Node
      if (menuRef.current?.contains(target)) return
      if (triggerRef.current?.contains(target)) return
      setOpen(false)
    }
    function onKeyDown(e: KeyboardEvent) {
      if (e.key === 'Escape') setOpen(false)
    }
    document.addEventListener('mousedown', onPointerDown)
    document.addEventListener('keydown', onKeyDown)
    return () => {
      document.removeEventListener('mousedown', onPointerDown)
      document.removeEventListener('keydown', onKeyDown)
    }
  }, [open])

  function pick(id: AppMode) {
    setOpen(false)
    navigate(modeDestination(id, viewer))
    onNavigate?.()
  }

  const menuStyle = box
    ? {
        left: box.left,
        ...(box.top !== null ? { top: box.top } : { bottom: box.bottom ?? 0 }),
        maxHeight: box.maxHeight,
        width: MENU_WIDTH_PX,
      }
    : undefined

  return (
    <>
      <button
        ref={triggerRef}
        type="button"
        onClick={() => setOpen(v => !v)}
        aria-haspopup="menu"
        aria-expanded={open}
        aria-label={`Mode: ${active.label}. Switch mode`}
        title={`${active.label} mode`}
        data-sound="select"
        className={cn(
          'inline-flex shrink-0 items-center gap-0.5 rounded-full py-0.5 pl-2 pr-1 text-[11px] font-semibold leading-none',
          'transition-colors hover:brightness-95 dark:hover:brightness-110',
          PILL_TONE[mode],
          className,
        )}
      >
        {active.label}
        <ChevronDown className={cn('h-3 w-3 transition-transform', open && 'rotate-180')} aria-hidden />
      </button>

      {open && (
        <OverlayPortal>
          <div
            ref={menuRef}
            role="menu"
            aria-label="Switch mode"
            style={menuStyle}
            className="fixed z-[70] overflow-y-auto rounded-lg border bg-popover p-1 shadow-lg"
          >
            {APP_MODES.map(spec => {
              const entitled = canEnterMode(spec.id, viewer)
              const lock = modeLockReason(spec.id, viewer)
              const current = spec.id === mode
              return (
                <button
                  key={spec.id}
                  type="button"
                  role="menuitem"
                  onClick={() => pick(spec.id)}
                  className={cn(
                    'flex w-full items-start gap-2.5 rounded-md px-2.5 py-2 text-left transition-colors',
                    'hover:bg-accent/60',
                  )}
                >
                  <span className="mt-0.5 flex h-4 w-4 shrink-0 items-center justify-center text-muted-foreground">
                    {current ? (
                      <Check className="h-3.5 w-3.5 text-foreground" aria-hidden />
                    ) : !entitled ? (
                      <Lock className="h-3.5 w-3.5" aria-hidden />
                    ) : null}
                  </span>
                  <span className="min-w-0 flex-1">
                    <span className="flex items-center gap-1.5">
                      <span className="text-sm font-medium text-foreground">{spec.label}</span>
                      {spec.preview && (
                        <span className="rounded-full bg-amber-500/15 px-1.5 py-0.5 text-[10px] font-semibold leading-none text-amber-600 dark:text-amber-400">
                          Preview
                        </span>
                      )}
                      {spec.access === 'pro' && <ProBadge />}
                    </span>
                    <span className="mt-0.5 block text-xs text-muted-foreground">
                      {lock ?? spec.tagline}
                    </span>
                  </span>
                </button>
              )
            })}
          </div>
        </OverlayPortal>
      )}
    </>
  )
}

export default ModeSwitcher
