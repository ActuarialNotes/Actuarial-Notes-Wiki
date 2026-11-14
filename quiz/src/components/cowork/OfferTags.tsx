import { Link } from 'react-router-dom'
import { resourceOffers, type ResourceOffers, type SourceResource } from '@/lib/coworkSources'
import { assumptionSetPath, resourceTablePath } from '@/lib/dataSources'
import { cn } from '@/lib/utils'

/**
 * What a document gives beyond its text, as tags: **Data** (a table the app
 * reads) and **Assumptions** (figures in the Assumptions Bank). Every list of
 * sources and documents on Data Sources carries them, so a reader knows what
 * is inside before opening anything.
 *
 * On a document each tag is a way in: Data opens the table, Assumptions the
 * figures read from it. On a source, which only sums its documents up, they
 * are plain tags.
 */

const TAG = 'inline-flex items-center rounded-full px-2 py-0.5 text-[11px] font-semibold leading-tight'
const DATA = 'bg-sky-500/15 text-sky-700 dark:text-sky-300'
const ASSUMPTIONS = 'bg-violet-500/15 text-violet-700 dark:text-violet-300'
const LINKED = 'pointer-events-auto underline-offset-2 transition-colors hover:underline focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring'

/** A source's tags: what any of its documents gives. */
export function OfferTags({ offers, className }: { offers: ResourceOffers; className?: string }) {
  if (!offers.data && !offers.assumptions) return null
  return (
    <span className={cn('inline-flex flex-wrap gap-1', className)}>
      {offers.data && <span className={cn(TAG, DATA)}>Data</span>}
      {offers.assumptions && <span className={cn(TAG, ASSUMPTIONS)}>Assumptions</span>}
    </span>
  )
}

/** A document's tags, each opening what it names. */
export function ResourceOfferTags({ resource }: { resource: SourceResource }) {
  const offers = resourceOffers(resource)
  const setId = resource.assumptions?.find(a => a.bankId)?.bankId?.split('#')[0]
  if (!offers.data && !offers.assumptions) return null
  return (
    <>
      {resource.tool && (
        <Link
          to={resourceTablePath(resource.tool)}
          className={cn(TAG, DATA, LINKED)}
          aria-label={`Open the table: ${resource.title}`}
          data-testid="offer-data"
        >
          Data
        </Link>
      )}
      {setId && (
        <Link
          to={assumptionSetPath(setId)}
          className={cn(TAG, ASSUMPTIONS, LINKED)}
          aria-label={`The figures read from ${resource.title}`}
          data-testid="offer-assumptions"
        >
          Assumptions
        </Link>
      )}
    </>
  )
}
