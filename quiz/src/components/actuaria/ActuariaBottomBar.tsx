// The **in-world tab bar** below `lg` — Map, Battle, Daily, Cohort, Hangar —
// pinned to the foot the way every bottom bar in the app is (style guide §5.1):
// fixed, clear of the sidebar, a hairline on top, and its measured height
// published as `--action-bar-height` so the page (and the Return to quiz pill)
// keeps clear of it. It stands down while a battle is on, because the battle's
// own action bar owns the foot of the screen then (§5).

import { useRef } from 'react'
import { NavLink, useLocation } from 'react-router-dom'
import { TAB_ICONS } from '@/components/actuaria/tabIcons'
import { useActionBarHeight } from '@/hooks/useActionBarHeight'
import { actuariaTabFor, visibleTabs } from '@/lib/actuaria/nav'
import { cn } from '@/lib/utils'

export function ActuariaBottomBar() {
  const { pathname } = useLocation()
  const current = actuariaTabFor(pathname)
  const ref = useRef<HTMLElement>(null)
  useActionBarHeight(ref)

  return (
    <nav
      ref={ref}
      aria-label="Actuaria"
      className="fixed bottom-0 left-0 right-0 z-30 border-t border-border bg-background/95 pb-[env(safe-area-inset-bottom)] backdrop-blur-sm lg:hidden"
    >
      <ul className="mx-auto flex max-w-lg items-stretch justify-around px-2">
        {visibleTabs().map(tab => {
          const Icon = TAB_ICONS[tab.id]
          const active = current === tab.id
          return (
            <li key={tab.id} className="flex-1">
              <NavLink
                to={tab.path}
                aria-current={active ? 'page' : undefined}
                className={cn(
                  'flex h-14 flex-col items-center justify-center gap-1 rounded-lg text-[11px] transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-ring',
                  active ? 'font-medium text-foreground' : 'text-muted-foreground hover:text-foreground',
                )}
              >
                <Icon className="h-5 w-5" aria-hidden />
                {tab.label}
              </NavLink>
            </li>
          )
        })}
      </ul>
    </nav>
  )
}
