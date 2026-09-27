import { useEffect } from 'react'
import { applyPageHead } from '@/lib/documentHead'
import type { PageHead } from '@/lib/seo'

/**
 * Write a page's own head once the page knows it. Runs as a passive effect, so
 * it lands after `usePageTracking` has put the route's fallback head in place
 * (a layout effect) — the page's fuller record always wins. `head` should be
 * stable across renders (a constant or a memo); nothing is written while it is
 * null.
 */
export function usePageHead(head: PageHead | null | undefined): void {
  useEffect(() => {
    if (head) applyPageHead(head)
  }, [head])
}
