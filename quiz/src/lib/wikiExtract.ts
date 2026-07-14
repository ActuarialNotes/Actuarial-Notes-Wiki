// Pulls [[wikilinks]] out of a raw markdown blob and classifies each one into
// a WikiEntryRef (concept / resource / exam) that the popup and search panel
// can consume directly. De-duplicates by kind+lowercased-name.

import { hrefToEntryRef, type WikiEntryRef } from '@/lib/wikiRoutes'

// Matches the Obsidian Publish breadcrumb nav line at the top of every file:
//   [[Actuarial Notes Wiki|Wiki]] / **Exam P-1 (SOA)**
//   [[Wiki]] / [[Concepts]] / **Concept Name**
// Stripping it prevents these navigation wikilinks from appearing in the popup
// concept list and causing spurious "Couldn't load" fetch errors.
const BREADCRUMB_RE = /^\[\[[^\]|]*(?:\|[^\]]+)?\]\][^\n]* \/ [^\n]*\n?/

// Ordered scan of every [[wikilink]] in a markdown blob, in document order and
// WITHOUT de-duplication — so a concept mentioned three times yields three
// entries. Used to build the occurrence-aware navigation on exam pages (the
// deduped list drives the concept count; this one drives which occurrence is
// highlighted). Frontmatter and the breadcrumb nav line are stripped first.
export function extractWikiLinkOccurrences(text: string): WikiEntryRef[] {
  const cleaned = text
    .replace(/^---\n[\s\S]*?\n---\n?/, '')
    .replace(BREADCRUMB_RE, '')

  const regex = /\[\[([^\]|]+)(?:\|([^\]]+))?\]\]/g
  const refs: WikiEntryRef[] = []
  let match: RegExpExecArray | null

  while ((match = regex.exec(cleaned)) !== null) {
    const target = match[1].trim()
    const display = match[2]?.trim()
    const ref = hrefToEntryRef(target) ?? {
      kind: 'concept' as const,
      name: display || (target.includes('/') ? target.split('/').pop()! : target),
    }
    refs.push(ref)
  }
  return refs
}

export function extractWikiLinksFromText(text: string): WikiEntryRef[] {
  const seen = new Set<string>()
  const refs: WikiEntryRef[] = []

  for (const ref of extractWikiLinkOccurrences(text)) {
    const key = `${ref.kind}:${ref.name.toLowerCase()}`
    if (!seen.has(key)) {
      seen.add(key)
      refs.push(ref)
    }
  }
  return refs
}
