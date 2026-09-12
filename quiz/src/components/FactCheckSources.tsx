import { useEffect, useMemo, useState } from 'react'
import { fetchWikiFile } from '@/lib/github'
import { parseResourceMeta, type ResourceMeta } from '@/lib/resourceMeta'
import { useWikiSyllabus } from '@/hooks/useWikiSyllabus'
import {
  conceptNameFromPath,
  examsForSources,
  factCheckSourcesForConcept,
  type FactCheckSource,
} from '@/lib/factCheckSources'
import { ResourceMetaCard } from '@/components/wiki/ResourceMetaCard'

/**
 * **What this concept is checked against** — the syllabus readings behind a
 * concept page, in the Fact Check panel.
 *
 * The panel's other source list is what a pass actually *cited*, and most of
 * the vault has never had one: a reader who opens the record on an unchecked
 * page sees "Not fact checked" and nothing else, which says what has not
 * happened without saying what would. This says it. A concept is taught by an
 * exam, that exam's study guide names the readings it is taught from, and those
 * are the books a check is run against (`docs/verification.md` P2, rank 2).
 *
 * It shows them as the *same card the resource page leads with* — cover, title,
 * author, the bibliographic chips, and the link to go and read it — rather than
 * a list of titles, because the reader's next move is usually to open the book
 * and check the claim for themselves. Inside a dialog that means the link, not
 * the in-app reader: `linkOnly` (the reader is an aside below the overlay
 * layer, so a document opened from here would slide in behind this sheet).
 *
 * Nothing is invented. A concept no exam page teaches has no syllabus sources,
 * and this renders nothing rather than a shelf of unrelated books.
 */

interface FactCheckSourcesProps {
  /** Repo-relative path of the page the panel is open on. */
  contentPath: string
}

export function FactCheckSources({ contentPath }: FactCheckSourcesProps) {
  const { syllabi } = useWikiSyllabus()
  const concept = conceptNameFromPath(contentPath)

  const sources = useMemo(
    () => (concept ? factCheckSourcesForConcept(syllabi, concept) : []),
    [syllabi, concept],
  )

  if (sources.length === 0) return null
  return <SourceShelf sources={sources} />
}

/**
 * Mounted only when there is something to show, so the metadata fetch belongs
 * to a shelf that will actually be drawn.
 */
function SourceShelf({ sources }: { sources: FactCheckSource[] }) {
  const [metas, setMetas] = useState<ResourceMeta[] | null>(null)

  // A resource page's front matter is where the card's facts live. The pages
  // are bundled on the wiki routes and fetched elsewhere; either way a page
  // that can't be read falls back to the name the syllabus links it by, so the
  // source is still named rather than silently dropped.
  useEffect(() => {
    let cancelled = false
    Promise.all(
      sources.map(source =>
        fetchWikiFile(source.path)
          .then(parseResourceMeta)
          .catch((): ResourceMeta => ({})),
      ),
    ).then(loaded => { if (!cancelled) setMetas(loaded) })
    return () => { cancelled = true }
  }, [sources])

  const exams = examsForSources(sources)

  return (
    <section>
      {/* The same heading shape as the panel's other sections. */}
      <h3 className="mb-2 text-xs font-semibold uppercase tracking-wide text-muted-foreground">
        Syllabus sources{exams.length > 0 && ` · ${exams.join(', ')}`}
      </h3>
      <ul className="space-y-2">
        {sources.map((source, i) => {
          const meta = metas?.[i]
          return (
            <li key={source.path}>
              <ResourceMetaCard
                meta={{ ...meta, title: meta?.title || source.name }}
                compact
                linkOnly
                className="mb-0 w-full"
              />
            </li>
          )
        })}
      </ul>
    </section>
  )
}
