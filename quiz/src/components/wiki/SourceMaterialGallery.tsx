import { useEffect, useMemo, useState } from 'react'
import { Card } from '@/components/ui/card'
import { buildWikiIndex, type WikiIndexItem } from '@/lib/wikiIndex'
import { hrefToEntryRef, wikiRoute, type WikiEntryRef } from '@/lib/wikiRoutes'
import type { SourceMaterialEntry } from '@/lib/sourceMaterial'

// The exam study guides' source-material list, rendered as the same shelf of
// resource cards the study-guide home page shows (cover, title, metadata pills)
// rather than a collapsed callout of bare links. Each card carries the reading
// assignment the syllabus gives for that source.

function MetaPill({ children }: { children: React.ReactNode }) {
  return (
    <span className="rounded-full bg-muted px-2 py-0.5 text-[10px] text-muted-foreground">
      {children}
    </span>
  )
}

export interface SourceMaterialGalleryProps {
  entries: SourceMaterialEntry[]
  /** Click handler shared with the article's wikilinks — see WikiArticle. */
  onOpen: (ref: WikiEntryRef, event: React.MouseEvent<HTMLAnchorElement>) => void
}

export function SourceMaterialGallery({ entries, onOpen }: SourceMaterialGalleryProps) {
  const [index, setIndex] = useState<WikiIndexItem[]>([])

  useEffect(() => {
    let cancelled = false
    buildWikiIndex()
      .then(items => { if (!cancelled) setIndex(items) })
      .catch(() => { if (!cancelled) setIndex([]) })
    return () => { cancelled = true }
  }, [])

  // Resource pages, keyed by page name — how a [[wiki link]] addresses them.
  const documents = useMemo(() => {
    const map = new Map<string, WikiIndexItem>()
    for (const item of index) {
      if (item.category === 'document') map.set(item.name.toLowerCase(), item)
    }
    return map
  }, [index])

  if (entries.length === 0) return null

  return (
    <div className="source-material-gallery not-prose my-4 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
      {entries.map(entry => {
        const meta = documents.get(entry.name.toLowerCase())
        // Bare names resolve to kind 'concept', exactly as the same link does in
        // the article body, so the popup and the active-link highlight agree.
        const ref = hrefToEntryRef(entry.target) ?? { kind: 'concept' as const, name: entry.name }
        const title = meta?.title ?? entry.label
        return (
          <a
            key={entry.name}
            href={wikiRoute(ref)}
            data-wikiref={`${ref.kind}:${ref.name.toLowerCase()}`}
            className="source-card block no-underline text-inherit rounded-lg focus:outline-none focus-visible:ring-2 focus-visible:ring-ring"
            onClick={e => {
              if (e.metaKey || e.ctrlKey || e.shiftKey || e.button !== 0) return
              onOpen(ref, e)
            }}
          >
            <Card className="h-full transition-all duration-150 hover:bg-accent/40 overflow-hidden flex flex-row items-stretch">
              {meta?.coverImage && (
                <div className="flex-shrink-0 p-2 flex items-center">
                  <img
                    src={meta.coverImage}
                    alt={title}
                    className="w-16 sm:w-20 rounded-md object-contain max-h-28 bg-muted/20"
                    loading="lazy"
                    onError={e => {
                      const p = e.currentTarget.parentElement
                      if (p) p.style.display = 'none'
                    }}
                  />
                </div>
              )}
              <div className="p-4 flex flex-col gap-2 flex-1 min-w-0">
                <p className="text-sm font-semibold leading-snug">{title}</p>
                {(meta?.author || meta?.year || meta?.edition || meta?.publisher) && (
                  <div className="flex flex-wrap gap-1">
                    {meta.author && <MetaPill>{meta.author}</MetaPill>}
                    {meta.year && <MetaPill>{meta.year}</MetaPill>}
                    {meta.edition && <MetaPill>{meta.edition} ed.</MetaPill>}
                    {meta.publisher && <MetaPill>{meta.publisher}</MetaPill>}
                  </div>
                )}
                {entry.detail && (
                  <p
                    className="text-xs text-muted-foreground leading-relaxed line-clamp-3 mt-auto"
                    title={entry.detail}
                  >
                    {entry.detail}
                  </p>
                )}
              </div>
            </Card>
          </a>
        )
      })}
    </div>
  )
}
