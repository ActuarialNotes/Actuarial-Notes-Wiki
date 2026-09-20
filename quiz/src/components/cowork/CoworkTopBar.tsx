import { Search, X } from 'lucide-react'
import { MobileNavButton } from '@/components/MobileNavButton'
import { cn } from '@/lib/utils'

/**
 * Cowork's top bar — the search input, the tabs, and (below `lg`) the way into
 * the sidebar drawer.
 *
 * It is the same shape as the wiki's and the quiz builder's floating search
 * bars, and for the same reason: a page that pins a bar to the top of the
 * viewport carries the hamburger on that bar's line rather than under a second
 * app header, so the phone spends one row on chrome instead of two. The route
 * is registered in `lib/mobileNavHost.ts`, which is what tells `App.tsx` not to
 * reserve room for a header above it — the two have to move together.
 */

export interface CoworkTab {
  id: string
  label: string
  count?: number
}

export interface CoworkTopBarProps {
  query: string
  onQueryChange: (value: string) => void
  placeholder: string
  tabs: CoworkTab[]
  activeTab: string
  onTabChange: (id: string) => void
}

export function CoworkTopBar({
  query,
  onQueryChange,
  placeholder,
  tabs,
  activeTab,
  onTabChange,
}: CoworkTopBarProps) {
  return (
    <div className="sticky top-0 z-50 border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/80">
      <div className="mx-auto w-full max-w-5xl px-3 sm:px-6">
        <div className="flex h-14 items-center gap-2">
          <MobileNavButton collapsed={query.length > 0} />
          <div className="relative min-w-0 flex-1">
            <Search
              className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground"
              aria-hidden
            />
            <input
              type="search"
              value={query}
              onChange={e => onQueryChange(e.target.value)}
              placeholder={placeholder}
              aria-label={placeholder}
              className="h-9 w-full rounded-lg border bg-background pl-9 pr-8 text-sm outline-none transition-colors placeholder:text-muted-foreground focus:border-ring"
            />
            {query && (
              <button
                type="button"
                onClick={() => onQueryChange('')}
                aria-label="Clear search"
                className="absolute right-2 top-1/2 flex h-5 w-5 -translate-y-1/2 items-center justify-center rounded text-muted-foreground transition-colors hover:text-foreground"
              >
                <X className="h-3.5 w-3.5" />
              </button>
            )}
          </div>
        </div>

        <div className="flex gap-1" role="tablist" aria-label="Cowork sections">
          {tabs.map(tab => (
            <button
              key={tab.id}
              type="button"
              role="tab"
              aria-selected={activeTab === tab.id}
              onClick={() => onTabChange(tab.id)}
              data-sound="select"
              className={cn(
                '-mb-px flex items-center gap-1.5 border-b-2 px-3 py-2.5 text-sm font-medium transition-colors',
                activeTab === tab.id
                  ? 'border-primary text-foreground'
                  : 'border-transparent text-muted-foreground hover:text-foreground',
              )}
            >
              {tab.label}
              {tab.count !== undefined && tab.count > 0 && (
                <span className="rounded-full bg-muted px-1.5 py-0.5 text-[10px] font-semibold leading-none tabular-nums text-muted-foreground">
                  {tab.count}
                </span>
              )}
            </button>
          ))}
        </div>
      </div>
    </div>
  )
}
