// Pulls [[wikilinks]] out of a raw markdown blob and classifies each one into
// a WikiEntryRef (concept / resource / exam) that the popup and search panel
// can consume directly. De-duplicates by kind+lowercased-name.

import { hrefToEntryRef, type WikiEntryRef } from '@/lib/wikiRoutes'

export function extractWikiLinksFromText(text: string): WikiEntryRef[] {
  const regex = /\[\[([^\]|]+)(?:\|([^\]]+))?\]\]/g
  const seen = new Set<string>()
  const refs: WikiEntryRef[] = []
  let match: RegExpExecArray | null

  while ((match = regex.exec(text)) !== null) {
    const target = match[1].trim()
    const display = match[2]?.trim()
    const ref = hrefToEntryRef(target) ?? {
      kind: 'concept' as const,
      name: display || (target.includes('/') ? target.split('/').pop()! : target),
    }
    const key = `${ref.kind}:${ref.name.toLowerCase()}`
    if (!seen.has(key)) {
      seen.add(key)
      refs.push(ref)
    }
  }
  return refs
}
