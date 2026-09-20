import { Link } from 'react-router-dom'
import { Check, Plus } from 'lucide-react'
import { Card } from '@/components/ui/card'
import { EntityLogo } from '@/components/cowork/EntityLogo'
import type { EntityGroup } from '@/lib/coworkSources'
import { cn } from '@/lib/utils'

/**
 * A publisher, as a card on the Sources shelf.
 *
 * The card is the unit of the Sources tab because following a *publisher* is
 * what an actuary actually does — a document is taken one at a time, but a
 * source is followed. So the card's own action is **Follow**, and the documents
 * are not here at all: the card opens the publisher's **own page**, the way an
 * exam card opens the exam's study guide. A shelf of publishers with their
 * catalogues unfolded inside them was a list pretending to be a page.
 *
 * The whole card is the link (stretched behind the content), so the target is
 * the card and not a word inside it; the Follow control sits above it and is
 * the one thing that does not navigate.
 */

export interface EntityCardProps {
  group: EntityGroup
  followed: boolean
  onToggleFollow: (entityId: string) => void
  /** Where the publisher's page lives. */
  href: string
}

export function EntityCard({ group, followed, onToggleFollow, href }: EntityCardProps) {
  const { entity, resources, total } = group
  const hidden = total - resources.length

  return (
    <Card className="relative h-full overflow-hidden transition-colors duration-150 hover:bg-accent/40 focus-within:ring-2 focus-within:ring-ring">
      <Link
        to={href}
        aria-label={entity.name}
        data-sound="open"
        className="absolute inset-0 z-0 rounded-lg focus:outline-none"
      />

      {/* The content does not swallow the click that should reach the link
          behind it; the controls inside it take theirs back. */}
      <div className="pointer-events-none relative z-10 flex h-full flex-col gap-2 p-4">
        <div className="flex items-start gap-3">
          <EntityLogo entity={entity} size="lg" />
          <div className="min-w-0 flex-1">
            <p className="text-sm font-semibold leading-snug">{entity.name}</p>
            <p className="mt-1 text-[11px] font-medium text-muted-foreground">{entity.jurisdiction}</p>
          </div>
        </div>

        <p className="line-clamp-3 text-xs leading-relaxed text-muted-foreground">{entity.about}</p>

        <div className="mt-auto flex items-center justify-between gap-2 pt-1">
          <button
            type="button"
            onClick={() => onToggleFollow(entity.id)}
            aria-pressed={followed}
            data-sound="press"
            className={cn(
              'pointer-events-auto inline-flex h-7 items-center gap-1 rounded-full px-2.5 text-xs font-medium transition-colors',
              followed
                ? 'bg-emerald-500/15 text-emerald-700 hover:bg-emerald-500/25 dark:text-emerald-300'
                : 'border text-muted-foreground hover:bg-accent hover:text-foreground',
            )}
          >
            {followed ? <Check className="h-3.5 w-3.5" aria-hidden /> : <Plus className="h-3.5 w-3.5" aria-hidden />}
            {followed ? 'Following' : 'Follow'}
          </button>

          <span className="text-[11px] tabular-nums text-muted-foreground">
            {total === 1 ? '1 document' : `${total} documents`}
            {hidden > 0 && ` · ${resources.length} match`}
          </span>
        </div>
      </div>
    </Card>
  )
}
