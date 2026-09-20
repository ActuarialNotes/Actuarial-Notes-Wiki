import { Link } from 'react-router-dom'
import { Check, Plus } from 'lucide-react'
import { Card } from '@/components/ui/card'
import { MetaPill } from '@/components/wiki/ResourcePills'
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
 * the card and not a word inside it; **Follow** sits above it and is the one
 * thing that does not navigate. It sits at the card's right edge rather than
 * along its bottom, so the card is one line of card and the eye finds the
 * control in the same place on every row.
 *
 * What the card says about a publisher is **facts, as pills**: where their writ
 * runs, how long they have been running it, and how much of theirs Cowork
 * carries. The paragraph that used to sit here was three lines of grey text on
 * every card in a grid of them — the account of who a publisher is belongs on
 * the publisher's own page, which is one tap away (`docs/visual-noise-review.md`).
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
  const noun = total === 1 ? 'document' : 'documents'

  return (
    <Card className="relative overflow-hidden transition-colors duration-150 focus-within:ring-2 focus-within:ring-ring hover:bg-accent/40">
      <Link
        to={href}
        aria-label={entity.name}
        data-sound="open"
        className="absolute inset-0 z-0 rounded-lg focus:outline-none"
      />

      {/* The content does not swallow the click that should reach the link
          behind it; the control inside it takes its own back. */}
      <div className="pointer-events-none relative z-10 flex items-center gap-3 p-4">
        <EntityLogo entity={entity} size="lg" />

        <div className="min-w-0 flex-1">
          <p className="text-sm font-semibold leading-snug">{entity.name}</p>
          <div className="mt-1.5 flex flex-wrap items-center gap-1">
            <MetaPill>{entity.jurisdiction}</MetaPill>
            {entity.established && <MetaPill>Est. {entity.established}</MetaPill>}
            <MetaPill>{hidden > 0 ? `${resources.length} of ${total} ${noun}` : `${total} ${noun}`}</MetaPill>
          </div>
        </div>

        <button
          type="button"
          onClick={() => onToggleFollow(entity.id)}
          aria-pressed={followed}
          aria-label={followed ? `Unfollow ${entity.name}` : `Follow ${entity.name}`}
          data-sound="press"
          className={cn(
            'pointer-events-auto inline-flex h-7 shrink-0 items-center gap-1 rounded-full px-2.5 text-xs font-medium transition-colors',
            followed
              ? 'bg-emerald-500/15 text-emerald-700 hover:bg-emerald-500/25 dark:text-emerald-300'
              : 'border text-muted-foreground hover:bg-accent hover:text-foreground',
          )}
        >
          {followed ? <Check className="h-3.5 w-3.5" aria-hidden /> : <Plus className="h-3.5 w-3.5" aria-hidden />}
          {followed ? 'Following' : 'Follow'}
        </button>
      </div>
    </Card>
  )
}
