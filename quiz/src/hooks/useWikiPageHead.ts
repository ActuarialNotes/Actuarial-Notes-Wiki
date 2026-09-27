import { useMemo } from 'react'
import { usePageHead } from '@/hooks/usePageHead'
import { NOT_FOUND_HEAD, pageHead } from '@/lib/seo'
import { seoPageFor } from '@/lib/seoPages'
import { wikiRoute, type WikiEntryKind } from '@/lib/wikiRoutes'

/**
 * A wiki page's head: the title, description, canonical URL and JSON-LD the
 * build wrote for it — the same record its static file carries. `missing` says
 * the page couldn't be loaded, which makes it a 404 that answers 200: it is
 * marked `noindex` so it never becomes a search result. A page the build didn't
 * describe (one fetched live that postdates the bundle) keeps the route's
 * fallback head.
 */
export function useWikiPageHead(kind: Extract<WikiEntryKind, 'exam' | 'concept' | 'resource'> | 'hub', name: string, missing = false): void {
  const head = useMemo(() => {
    if (missing) return NOT_FOUND_HEAD
    const page = seoPageFor(kind === 'hub' ? '/wiki' : wikiRoute({ kind, name }))
    return page ? pageHead(page) : null
  }, [kind, name, missing])
  usePageHead(head)
}
