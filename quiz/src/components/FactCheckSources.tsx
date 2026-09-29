import { useEffect, useMemo, useState } from 'react'
import { BookOpen } from 'lucide-react'
import { fetchWikiFile } from '@/lib/github'
import { parseResourceMeta, type ResourceMeta } from '@/lib/resourceMeta'
import { useWikiSyllabus } from '@/hooks/useWikiSyllabus'
import { citedSources, syllabusSourcePages, type CitedSource } from '@/lib/factCheckSources'
import { ResourceMetaCard } from '@/components/wiki/ResourceMetaCard'
import { FactCheckSection } from '@/components/FactCheckSection'

/**
 * **Checked against** — the sources a fact check was actually run against, in
 * the Fact Check panel.
 *
 * A `verification:` block records each one as a line of citation prose written
 * for an auditor, and this draws it as the *same card the resource page leads
 * with* — cover, title, author, the bibliographic chips, and the link to go and
 * read it — rather than a line of text, because the reader's next move is
 * usually to open the book and check the claim for themselves. What that
 * citation adds over the shelf's other cards is the part of the book that was
 * read, so the chapters and pages ride along as the card's note.
 *
 * `lib/factCheckSources.ts` does the matching: a citation that names a syllabus
 * reading is shown as that reading's page, and one that names anything else is
 * built from the citation alone. The sha256 the citation carries never reaches
 * the screen — it is what makes the check reproducible, not something a student
 * can act on.
 *
 * The card's "Read PDF" opens in the app's reader like every other PDF button,
 * over the Fact Check sheet rather than in a browser tab — the sheet stays
 * behind it, so closing the document puts the reader back on the finding that
 * sent them to it.
 *
 * It is the last of the record's cards (`FactCheckSection`), folded like the
 * others unless it is the only one — a page checked clean has no log to show,
 * and a card that has to be opened to find the one thing there is is a wasted
 * tap.
 */

interface FactCheckSourcesProps {
  /** The citations from the page's `verification:` block, as authored. */
  sources: string[]
  /** Start unfolded — when there is nothing else in the record to read. */
  defaultOpen?: boolean
}

export function FactCheckSources({ sources, defaultOpen = false }: FactCheckSourcesProps) {
  const { syllabi } = useWikiSyllabus()
  const cited = useMemo(
    () => citedSources(sources, syllabusSourcePages(syllabi)),
    [sources, syllabi],
  )

  if (cited.length === 0) return null
  return (
    <FactCheckSection
      title="Checked against"
      count={cited.length}
      tone="grey"
      icon={<BookOpen className="h-4 w-4" aria-hidden />}
      defaultOpen={defaultOpen}
    >
      <SourceShelf sources={cited} />
    </FactCheckSection>
  )
}

/**
 * Mounted only when its card is unfolded, so the metadata fetch belongs to a
 * shelf that will actually be drawn.
 */
function SourceShelf({ sources }: { sources: CitedSource[] }) {
  const [metas, setMetas] = useState<Array<ResourceMeta | null> | null>(null)

  // A resource page's front matter is where the card's facts live. The pages
  // are bundled on the wiki routes and fetched elsewhere; either way a page
  // that can't be read falls back to the citation, so the source is still named
  // rather than silently dropped.
  useEffect(() => {
    let cancelled = false
    Promise.all(
      sources.map(source =>
        source.page
          ? fetchWikiFile(source.page.path).then(parseResourceMeta).catch(() => null)
          : Promise.resolve(null),
      ),
    ).then(loaded => { if (!cancelled) setMetas(loaded) })
    return () => { cancelled = true }
  }, [sources])

  return (
    <ul className="divide-y divide-border">
      {sources.map((source, i) => {
        const meta = metas?.[i]
        return (
          <li key={source.raw}>
            <ResourceMetaCard
              meta={{
                ...meta,
                title: meta?.title || source.label,
                // The citation's own link is the fallback, never the
                // override: the resource page names where the source lives,
                // and a pass cites the copy it happened to read.
                getCopyUrl: meta?.getCopyUrl || source.url || undefined,
              }}
              note={source.locator ?? undefined}
              compact
              // A row of the card it sits in, not a card of its own: the
              // section's border already draws the edge.
              className="mb-0 w-full rounded-none border-0 bg-transparent"
            />
          </li>
        )
      })}
    </ul>
  )
}
