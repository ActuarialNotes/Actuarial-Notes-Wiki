import type { ReactNode } from 'react'

/**
 * The matched run of a search result, marked.
 *
 * One implementation, because there is one look: every list in the app that
 * shows what a query matched — the wiki's floating search, the wiki search
 * panel, the Search page, Cowork's source search — tints the same span the same
 * way. Four copies of six lines had already drifted apart in whitespace alone.
 *
 * Only the **first** occurrence is marked. A result row is a line of text a
 * reader scans for where the match is, not a passage to be read with every hit
 * picked out, and a second mark on the same line reads as two results.
 */
export function highlightMatch(text: string, query: string): ReactNode {
  const q = query.trim()
  if (!q) return text
  const idx = text.toLowerCase().indexOf(q.toLowerCase())
  if (idx < 0) return text
  return (
    <>
      {text.slice(0, idx)}
      <mark className="rounded bg-primary/20 px-0.5 text-foreground">{text.slice(idx, idx + q.length)}</mark>
      {text.slice(idx + q.length)}
    </>
  )
}
