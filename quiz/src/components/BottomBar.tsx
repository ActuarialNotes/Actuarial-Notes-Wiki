import { useEffect, useRef, useState } from 'react'
import { Link, useLocation, useNavigate } from 'react-router-dom'
import { BookOpen, CalendarCheck, Play, Wrench } from 'lucide-react'
import { useAuth } from '@/hooks/useAuth'
import { useCollectGlow } from '@/hooks/useCollectGlow'
import { useTodayQuizCounts } from '@/hooks/useTodayQuizCount'
import { useWorkflowsAccess } from '@/hooks/useWorkflowsAccess'
import { TodayQuizCornerBadge } from '@/components/TodayQuizBadge'
import { INK_MENU } from '@/components/ui/ink'
import { GAMES_ENABLED, RESEARCH_TAB_ENABLED, TOOLS_ENABLED, TOOLS_STORE_NAV_ENABLED } from '@/lib/featureFlags'
import { hidesBottomBar, pageOf, placeOf, placePages, PLACES, type PlaceId, type PlacePage } from '@/lib/places'
import { cn } from '@/lib/utils'

const ICONS: Record<PlaceId, typeof Play> = {
  today: CalendarCheck,
  learn: BookOpen,
  practice: Play,
  apply: Wrench,
}

/** Where Learn was left this visit (the key `Sidebar.tsx` reads too), else the fallback. */
function lastWikiPath(fallback: string): string {
  try { return sessionStorage.getItem('wiki:last-path') || fallback } catch { return fallback }
}

/**
 * The four places as a bar at the bottom of the screen, below `lg`
 * (docs/design-review.md §5.2): Today, Learn, Practice, Apply, in the order of
 * the path, each one tap away under the thumb, the one the reader is in
 * marked. On a wide screen the sidebar lists them and this isn't drawn.
 *
 * A place with several pages (Practice: Quiz, Flashcards, Games) opens on its
 * first; a tap on the place the reader is already in lists its pages. The
 * rest of the app (the exam switcher, the Store, Settings) is behind the
 * avatar in the top corner (`MobileNavButton`).
 *
 * It is put away where the screen is the work (`hidesBottomBar`), and every
 * overlay is drawn over it: the concept popup, the PDF reader, focus mode and
 * each dialog. While it shows, `--bottom-nav-height` on the body is its
 * height (index.css), which the page's bottom padding and everything parked
 * on the bottom edge read.
 */
export function BottomBar() {
  const { pathname } = useLocation()
  const navigate = useNavigate()
  const { user } = useAuth()
  const workflows = useWorkflowsAccess()
  const { total: quizLeft, allComplete: planDone } = useTodayQuizCounts()
  // The deck is a page of Practice, so a collected card lights Practice up.
  const collectGlow = useCollectGlow()
  const [menu, setMenu] = useState<PlaceId | null>(null)
  const rootRef = useRef<HTMLElement>(null)

  const hidden = hidesBottomBar(pathname)
  const here = placeOf(pathname)
  const page = pageOf(pathname)

  useEffect(() => {
    // On the body, not the root: the root's data attributes are the page
    // move's (`data-paper`), and are read as such.
    const body = document.body
    if (hidden) body.removeAttribute('data-bottom-bar')
    else body.setAttribute('data-bottom-bar', '')
    return () => body.removeAttribute('data-bottom-bar')
  }, [hidden])

  // A move to another page puts the menu away.
  useEffect(() => { setMenu(null) }, [pathname])

  useEffect(() => {
    if (!menu) return
    const away = (e: PointerEvent) => { if (!rootRef.current?.contains(e.target as Node)) setMenu(null) }
    const esc = (e: KeyboardEvent) => { if (e.key === 'Escape') setMenu(null) }
    document.addEventListener('pointerdown', away)
    document.addEventListener('keydown', esc)
    return () => {
      document.removeEventListener('pointerdown', away)
      document.removeEventListener('keydown', esc)
    }
  }, [menu])

  if (hidden) return null

  const access = {
    research: RESEARCH_TAB_ENABLED && !!user,
    games: GAMES_ENABLED,
    // Off the navigation for now; the pages still open by address.
    tools: TOOLS_ENABLED && TOOLS_STORE_NAV_ENABLED,
    workflows,
  }
  const pageTo = (p: PlacePage) => p.to
  const placeTo: Record<PlaceId, string> = {
    today: '/dashboard',
    learn: lastWikiPath('/wiki'),
    practice: '/',
    apply: placePages('apply', access)[0]?.to ?? '/project',
  }
  const menuPages = menu ? placePages(menu, access) : []

  return (
    <nav
      ref={rootRef}
      aria-label="Places"
      data-testid="bottom-bar"
      className="paper-chrome-tabbar fixed inset-x-0 bottom-0 z-30 border-t bg-background/95 pb-[env(safe-area-inset-bottom)] backdrop-blur-sm lg:hidden"
    >
      {menu && menuPages.length > 0 && (
        <div
          role="menu"
          aria-label={PLACES.find(p => p.id === menu)?.label}
          className={cn(INK_MENU, 'absolute bottom-full mb-2 w-48 py-1', MENU_SIDE[menu])}
        >
          {menuPages.map(p => (
            <button
              key={p.id}
              type="button"
              role="menuitemradio"
              aria-checked={p.id === page}
              onClick={() => { setMenu(null); navigate(pageTo(p)) }}
              className={cn(
                'flex w-full items-center px-4 py-3 text-left text-base transition-colors hover:bg-accent/60',
                p.id === page ? 'font-semibold text-foreground' : 'text-muted-foreground',
              )}
            >
              {p.label}
            </button>
          ))}
        </div>
      )}
      <ul className="mx-auto flex h-14 max-w-md items-stretch">
        {PLACES.map(place => {
          const Icon = ICONS[place.id]
          const active = here === place.id
          const pages = placePages(place.id, access)
          const hasMenu = active && pages.length > 1
          return (
            <li key={place.id} className="flex-1">
              <Link
                to={placeTo[place.id]}
                aria-current={active ? 'page' : undefined}
                aria-haspopup={hasMenu ? 'menu' : undefined}
                aria-expanded={hasMenu ? menu === place.id : undefined}
                onClick={e => {
                  // Already here: list the place's pages instead of reloading its first.
                  if (!hasMenu) return
                  e.preventDefault()
                  setMenu(m => (m === place.id ? null : place.id))
                }}
                className={cn(
                  'flex h-full flex-col items-center justify-center gap-0.5 text-[11px] leading-none transition-colors',
                  active ? 'font-semibold text-foreground' : 'text-muted-foreground',
                )}
              >
                <span
                  className={cn(
                    'relative flex h-7 w-14 items-center justify-center rounded-full transition-colors',
                    active && 'bg-pick text-pick-foreground',
                  )}
                >
                  <span className="relative inline-flex h-5 w-5 items-center justify-center">
                    {place.id === 'practice' && collectGlow > 0 && (
                      <span key={`ring-${collectGlow}`} className="flashcard-nav-ring" aria-hidden="true" />
                    )}
                    <Icon
                      key={place.id === 'practice' ? `icon-${collectGlow}` : undefined}
                      className={cn('h-5 w-5', place.id === 'practice' && collectGlow > 0 && 'flashcard-nav-glow')}
                      aria-hidden="true"
                    />
                  </span>
                  {place.id === 'practice' && (
                    <TodayQuizCornerBadge count={quizLeft} complete={planDone} size="sm" className="-top-1 right-1" />
                  )}
                </span>
                {place.label}
              </Link>
            </li>
          )
        })}
      </ul>
    </nav>
  )
}

// Which edge of the bar a place's menu hangs from: over its own item.
const MENU_SIDE: Record<PlaceId, string> = {
  today: 'left-2',
  learn: 'left-2',
  practice: 'right-2',
  apply: 'right-2',
}
