import { useRef } from 'react'
import { FloatingSearchBar, FloatingSearchInput } from '@/components/FloatingSearchBar'

/**
 * The **Shop's top bar** — the floating search bar every tab carries, built
 * from the shared parts so a search here feels the same as anywhere else. The
 * shelf *is* the result list: the query rides the URL (`?q=`) and narrows every
 * aisle at once, the way a refinement does (`itemMatchesQuery` in
 * `lib/store.ts`). It is the route's only row of top chrome below `lg`
 * (`drawsOwnTopRow` in `lib/places.ts`).
 */
export function StoreSearchBar({ query, onQuery }: { query: string; onQuery: (q: string) => void }) {
  const inputRef = useRef<HTMLInputElement>(null)
  return (
    <FloatingSearchBar width="lg">
      <FloatingSearchInput
        inputRef={inputRef}
        value={query}
        onChange={onQuery}
        onClear={() => {
          onQuery('')
          inputRef.current?.blur()
        }}
        placeholder="Search the Store"
        ariaLabel="Search the Store"
      />
    </FloatingSearchBar>
  )
}
