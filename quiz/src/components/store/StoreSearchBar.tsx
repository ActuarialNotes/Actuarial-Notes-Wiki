import { useRef, useState } from 'react'
import { FloatingSearchBar, FloatingSearchInput } from '@/components/FloatingSearchBar'

/**
 * The **Shop's top bar** — the floating search bar every tab carries, built
 * from the shared parts so a search here feels the same as anywhere else. The
 * shelf *is* the result list: the query rides the URL (`?q=`) and narrows every
 * aisle at once, the way a refinement does (`itemMatchesQuery` in
 * `lib/store.ts`). It is the route's only row of top chrome below `lg`
 * (`lib/mobileNavHost.ts`), so it carries the hamburger.
 */
export function StoreSearchBar({ query, onQuery }: { query: string; onQuery: (q: string) => void }) {
  const inputRef = useRef<HTMLInputElement>(null)
  const [focused, setFocused] = useState(false)
  return (
    <FloatingSearchBar width="lg">
      <FloatingSearchInput
        inputRef={inputRef}
        value={query}
        onChange={onQuery}
        onFocus={() => setFocused(true)}
        onClear={() => {
          onQuery('')
          inputRef.current?.blur()
          setFocused(false)
        }}
        placeholder="Search the Shop"
        ariaLabel="Search the Shop"
        navCollapsed={focused && query.length > 0}
      />
    </FloatingSearchBar>
  )
}
