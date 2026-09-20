import type { ReactNode } from 'react'
import { Search, X } from 'lucide-react'
import { MobileNavButton } from '@/components/MobileNavButton'

/**
 * Cowork's top bar — the search input, the page strip, and (below `lg`) the way
 * into the sidebar drawer.
 *
 * It is the same shape as the wiki's and the quiz builder's floating search
 * bars, and for the same reason: a page that pins a bar to the top of the
 * viewport carries the hamburger in that bar, on the same line as the search
 * input, so the phone spends one row on chrome instead of two. The route is
 * registered in `lib/mobileNavHost.ts`, which is what tells `App.tsx` not to
 * reserve room for a header above it — the two have to move together.
 *
 * There are **no tabs here**. Sources and Deliverables are the mode's two
 * places and the sidebar is where a place is chosen, the same as every route in
 * Study mode; a second row of tabs restating the nav cost a phone a row of
 * chrome to say what the drawer already says.
 *
 * The strip below the search line is the wiki's: on a page *about* something —
 * a source — it carries that thing's logo where the exam page carries the
 * exam's, with a way back to the shelf. The name rides along for a screen
 * reader, since the page under the strip opens with it in display type.
 */

export interface CoworkTopBarProps {
  query: string
  onQueryChange: (value: string) => void
  placeholder: string
  /** The strip's subject, when the page has one. */
  pageTitle?: string | null
  /** Stands in for the strip's title text — a logo tile. */
  pageIcon?: ReactNode
  /** The way back out of a page, at the head of the strip. */
  backLink?: ReactNode
}

export function CoworkTopBar({
  query,
  onQueryChange,
  placeholder,
  pageTitle,
  pageIcon,
  backLink,
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

        {pageTitle && (
          <div className="flex h-[calc(3.5rem-1px)] items-center gap-2.5">
            {backLink}
            {pageIcon ? (
              <span className="flex min-w-0 flex-1 items-center">
                {pageIcon}
                <span className="sr-only">{pageTitle}</span>
              </span>
            ) : (
              <span className="min-w-0 flex-1 truncate text-sm font-semibold">{pageTitle}</span>
            )}
          </div>
        )}
      </div>
    </div>
  )
}
