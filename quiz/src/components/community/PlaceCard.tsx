import { CalendarDays, ExternalLink, Globe, MapPin } from 'lucide-react'
import { cityLabel, distanceText, PLACE_KIND_LABEL, type CommunityPlace } from '@/lib/community/places'
import { cn } from '@/lib/utils'

/** The tile a place leads with: its own short name, or its initials. */
function monogram(place: CommunityPlace): string {
  if (place.short && place.short.length <= 5) return place.short
  return place.name
    .replace(/^(the|r\/)\s*/i, '')
    .split(/[\s/&-]+/)
    .filter(w => /^[A-Z]/.test(w))
    .slice(0, 3)
    .map(w => w[0])
    .join('')
}

/**
 * One community — a forum, a society, a regional affiliate, a local club.
 * The card's title is the link to the community's own site; the two controls
 * that stay here are Follow and, where it has one, its events page.
 */
export function PlaceCard({
  place,
  following,
  onToggleFollow,
  km,
  upcoming,
}: {
  place: CommunityPlace
  following: boolean
  onToggleFollow: () => void
  km?: number
  /** How many of its events are coming up. */
  upcoming: number
}) {
  const mark = monogram(place)
  return (
    <div className="flex flex-col gap-3 rounded-xl bg-card p-4 text-card-foreground shadow-[var(--shadow-card)]" data-testid="community-place">
      <div className="flex items-start gap-3">
        <span
          aria-hidden
          className={cn(
            'flex h-11 w-11 shrink-0 items-center justify-center rounded-xl font-bold tracking-tight',
            mark.length > 3 ? 'text-[11px]' : 'text-sm',
            place.online ? 'bg-sky-500/15 text-sky-700 dark:text-sky-300' : 'bg-emerald-500/15 text-emerald-700 dark:text-emerald-300',
          )}
        >
          {mark}
        </span>
        <div className="min-w-0 flex-1">
          <a
            href={place.url}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-start gap-1.5 text-[15px] font-semibold leading-snug hover:underline hover:underline-offset-2"
          >
            {place.name}
            <ExternalLink className="mt-1 h-3 w-3 shrink-0 text-muted-foreground" aria-hidden />
          </a>
          <div className="mt-0.5 flex flex-wrap items-center gap-x-2 gap-y-1 text-xs text-muted-foreground">
            <span className="rounded-full bg-muted px-2 py-0.5 font-medium">{PLACE_KIND_LABEL[place.kind]}</span>
            {place.location ? (
              <span className="inline-flex items-center gap-1">
                <MapPin className="h-3 w-3" aria-hidden />
                {cityLabel(place.location)}
                {km !== undefined && <span className="tabular-nums">· {distanceText(km)}</span>}
              </span>
            ) : (
              <span className="inline-flex items-center gap-1">
                <Globe className="h-3 w-3" aria-hidden />
                Online
              </span>
            )}
          </div>
        </div>
        <button
          type="button"
          onClick={onToggleFollow}
          aria-pressed={following}
          aria-label={following ? `Unfollow ${place.name}` : `Follow ${place.name}`}
          data-sound="select"
          className={cn(
            'h-8 shrink-0 rounded-full px-3 text-xs font-semibold transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring',
            following ? 'border border-primary/40 bg-primary/10 text-primary' : 'border bg-background hover:bg-accent',
          )}
        >
          {following ? 'Following' : 'Follow'}
        </button>
      </div>
      <p className="text-sm text-muted-foreground">{place.description}</p>
      {place.covers && <p className="text-xs text-muted-foreground"><span className="font-medium text-foreground/80">Serves:</span> {place.covers}</p>}
      {(place.eventsUrl || upcoming > 0) && (
        <div className="mt-auto flex flex-wrap items-center gap-2 text-xs">
          {upcoming > 0 && (
            <span className="inline-flex items-center gap-1 rounded-full bg-primary/10 px-2 py-0.5 font-semibold text-primary">
              <CalendarDays className="h-3 w-3" aria-hidden />
              {upcoming} coming up
            </span>
          )}
          {place.eventsUrl && (
            <a href={place.eventsUrl} target="_blank" rel="noopener noreferrer" className="font-medium text-muted-foreground underline-offset-2 hover:text-foreground hover:underline">
              Their events page
            </a>
          )}
        </div>
      )}
    </div>
  )
}
