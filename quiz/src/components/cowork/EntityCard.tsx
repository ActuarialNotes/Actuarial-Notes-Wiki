import { useState } from 'react'
import { Check, ChevronDown, ExternalLink, Plus } from 'lucide-react'
import type { EntityGroup, SourceResource } from '@/lib/coworkSources'
import { EntityLogo } from '@/components/cowork/EntityLogo'
import { ResourceRow } from '@/components/cowork/ResourceRow'
import { cn } from '@/lib/utils'

/**
 * A publisher and what they publish.
 *
 * The card is the unit of the Sources tab because following a *publisher* is
 * the thing an actuary actually does — a document is taken one at a time, but a
 * source is followed. So the card's own action is "follow", and the documents
 * under it each carry their own.
 *
 * It opens expanded when the list has been filtered (the reader is looking for
 * a document and the card is the answer's container) and collapsed otherwise,
 * so an unfiltered catalogue reads as a shelf of publishers rather than a wall
 * of documents.
 */

export interface EntityCardProps {
  group: EntityGroup
  followed: boolean
  onToggleFollow: (entityId: string) => void
  inLibrary: (resourceId: string) => boolean
  onToggleResource: (resource: SourceResource) => void
  onOpenResource: (resource: SourceResource) => void
  /** Filtered lists open expanded — see above. */
  defaultOpen?: boolean
}

export function EntityCard({
  group,
  followed,
  onToggleFollow,
  inLibrary,
  onToggleResource,
  onOpenResource,
  defaultOpen = false,
}: EntityCardProps) {
  const [open, setOpen] = useState(defaultOpen)
  // A card already on screen when the filter changes has to follow it. `useState`
  // only reads its initial value once, so without this the reader searches for a
  // document, the card holding it survives the filter — and stays shut, which
  // reads as "the search found nothing". Adjusting state during render (rather
  // than in an effect) is React's own pattern for a prop the state must track:
  // it re-renders before anything is painted, so the card never flashes closed.
  const [lastDefault, setLastDefault] = useState(defaultOpen)
  if (defaultOpen !== lastDefault) {
    setLastDefault(defaultOpen)
    setOpen(defaultOpen)
  }

  const { entity, resources, total } = group
  const hidden = total - resources.length

  return (
    <div className="rounded-xl border bg-card">
      <div className="flex items-start gap-3 p-4">
        <EntityLogo short={entity.short} category={entity.category} size="lg" />

        <div className="min-w-0 flex-1">
          <div className="flex flex-wrap items-center gap-x-2 gap-y-1">
            <h3 className="text-sm font-semibold leading-tight text-foreground">{entity.name}</h3>
            <span className="rounded-full bg-muted px-1.5 py-0.5 text-[11px] font-medium leading-none text-muted-foreground">
              {entity.jurisdiction}
            </span>
          </div>
          <p className="mt-1 text-xs leading-relaxed text-muted-foreground">{entity.about}</p>

          <div className="mt-2.5 flex flex-wrap items-center gap-2">
            <button
              type="button"
              onClick={() => onToggleFollow(entity.id)}
              aria-pressed={followed}
              className={cn(
                'inline-flex h-7 items-center gap-1 rounded-full px-2.5 text-xs font-medium transition-colors',
                followed
                  ? 'bg-emerald-500/15 text-emerald-700 hover:bg-emerald-500/25 dark:text-emerald-300'
                  : 'border text-muted-foreground hover:bg-accent hover:text-foreground',
              )}
            >
              {followed ? <Check className="h-3.5 w-3.5" aria-hidden /> : <Plus className="h-3.5 w-3.5" aria-hidden />}
              {followed ? 'Following' : 'Follow source'}
            </button>

            <button
              type="button"
              onClick={() => setOpen(v => !v)}
              aria-expanded={open}
              data-sound="select"
              className="inline-flex h-7 items-center gap-1 rounded-full px-2.5 text-xs font-medium text-muted-foreground transition-colors hover:bg-accent hover:text-foreground"
            >
              <ChevronDown className={cn('h-3.5 w-3.5 transition-transform', open && 'rotate-180')} aria-hidden />
              {total === 1 ? '1 document' : `${total} documents`}
              {hidden > 0 && <span className="text-muted-foreground/70">· {resources.length} match</span>}
            </button>

            {entity.site && (
              <a
                href={entity.site}
                target="_blank"
                rel="noreferrer"
                className="inline-flex h-7 items-center gap-1 rounded-full px-2 text-xs text-muted-foreground transition-colors hover:bg-accent hover:text-foreground"
              >
                <ExternalLink className="h-3.5 w-3.5" aria-hidden />
                <span className="hidden sm:inline">Publisher</span>
              </a>
            )}
          </div>
        </div>
      </div>

      {open && (
        <div className="border-t px-2 py-1.5">
          {resources.length === 0 ? (
            <p className="px-2 py-3 text-xs text-muted-foreground">No documents match the current filters.</p>
          ) : (
            resources.map(resource => (
              <ResourceRow
                key={resource.id}
                resource={resource}
                inLibrary={inLibrary(resource.id)}
                onToggleLibrary={onToggleResource}
                onOpen={onOpenResource}
              />
            ))
          )}
          {hidden > 0 && (
            <p className="px-2 pb-2 pt-1 text-[11px] text-muted-foreground">
              {hidden} more {hidden === 1 ? 'document' : 'documents'} from this source, hidden by the current filters.
            </p>
          )}
        </div>
      )}
    </div>
  )
}
