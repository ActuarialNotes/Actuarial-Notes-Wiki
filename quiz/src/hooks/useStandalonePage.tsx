import { useCallback, useEffect, useMemo, useRef, useState, type ReactNode } from 'react'
import type { WikiTitleAction } from '@/components/wiki/WikiArticle'
import { ConceptActionMenu } from '@/components/ConceptActionMenu'
import { useConceptPopup } from '@/hooks/useConceptPopup'
import { isSyllabusConcept } from '@/lib/syllabusChapters'
import type { WikiEntryRef } from '@/lib/wikiRoutes'

/** A link to a reading rather than a concept — a resource page, however it is named. */
function isDocumentRef(ref: WikiEntryRef): boolean {
  return ref.kind === 'resource' || ref.kind === 'event' || ref.kind === 'regulation'
    || (ref.kind === 'concept' && !isSyllabusConcept(ref))
}

function dedupe(refs: WikiEntryRef[]): WikiEntryRef[] {
  const seen = new Set<string>()
  return refs.filter(r => {
    const key = `${r.kind}:${r.name.toLowerCase()}`
    if (seen.has(key)) return false
    seen.add(key)
    return true
  })
}

/**
 * A concept or resource page read on its own — reached at its own URL rather
 * than in a study guide — behaves as it does in the popup: its title is the
 * underlined trigger of the page's action menu, and a concept or reading it
 * links opens in the concept popup over the page instead of navigating away.
 * The popup walks the page's own links: a concept's walk is every concept the
 * page links, a reading's every reading.
 */
export function useStandalonePage(
  entry: WikiEntryRef,
  content: string | null,
  pageRefs: WikiEntryRef[],
  sourcePath: string,
): {
  titleAction: WikiTitleAction
  menu: ReactNode
  onWikiLink: (ref: WikiEntryRef, e: React.MouseEvent<HTMLAnchorElement>) => boolean
} {
  const { openAt } = useConceptPopup()
  const titleRef = useRef<HTMLButtonElement>(null)
  const [menuOpen, setMenuOpen] = useState(false)
  const closeMenu = useCallback(() => setMenuOpen(false), [])
  useEffect(() => { setMenuOpen(false) }, [entry.kind, entry.name])

  const titleAction = useMemo<WikiTitleAction>(() => ({
    ref: titleRef,
    open: menuOpen,
    onToggle: () => setMenuOpen(v => !v),
    label: `${entry.name} — page actions`,
  }), [menuOpen, entry.name])

  const conceptRefs = useMemo(() => dedupe(pageRefs.filter(isSyllabusConcept)), [pageRefs])
  const documentRefs = useMemo(
    () => dedupe(pageRefs.filter(isDocumentRef).map(r => (r.kind === 'concept' ? { ...r, kind: 'resource' as const } : r))),
    [pageRefs],
  )

  const onWikiLink = useCallback((ref: WikiEntryRef, e: React.MouseEvent<HTMLAnchorElement>) => {
    const isDoc = isDocumentRef(ref)
    if (!isDoc && ref.kind !== 'concept') return false
    e.preventDefault()
    const resources = documentRefs.length > 0 ? documentRefs : null
    if (isDoc) {
      const at = documentRefs.findIndex(r => r.name.toLowerCase() === ref.name.toLowerCase())
      const target = ref.kind === 'concept' ? { ...ref, kind: 'resource' as const } : ref
      openAt(at >= 0 ? documentRefs : [target], Math.max(at, 0), sourcePath, null, resources, {
        initialFilter: 'source-material',
        fullList: conceptRefs,
      })
      return true
    }
    const idx = conceptRefs.findIndex(r => r.name.toLowerCase() === ref.name.toLowerCase())
    openAt(idx >= 0 ? conceptRefs : [ref], Math.max(idx, 0), sourcePath, null, resources)
    return true
  }, [conceptRefs, documentRefs, openAt, sourcePath])

  const menu = (
    <ConceptActionMenu
      entry={entry}
      open={menuOpen}
      onClose={closeMenu}
      anchorRef={titleRef}
      content={content}
    />
  )

  return { titleAction, menu, onWikiLink }
}
