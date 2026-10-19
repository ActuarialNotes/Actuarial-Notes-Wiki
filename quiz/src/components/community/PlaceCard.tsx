import type { CSSProperties } from 'react'
import { ArrowUpRight, CalendarDays, Globe, MapPin } from 'lucide-react'
import { cityLabel, distanceText, PLACE_KIND_LABEL, type CommunityPlace } from '@/lib/community/places'
import { placeMonogram, placeStyle } from './placeStyle'
import { FollowButton } from './TopicChips'
import { cn } from '@/lib/utils'

/** A place's tile: its own short name on a fill of its kind's colour. */
export function PlaceMark({ place, size = 'md', className }: { place: CommunityPlace; size?: 'sm' | 'md'; className?: string }) {
  const full = placeMonogram(place)
  // A face in the hero's crowd is too small for four letters.
  const mark = size === 'sm' && full.length > 2 ? full.slice(0, 2) : full
  return (
    <span
      aria-hidden
      style={placeStyle(place)}
      className={cn(
        'relative flex shrink-0 items-center justify-center overflow-hidden bg-[var(--topic-vivid)] font-bold tracking-tight text-white',
        size === 'sm' ? 'h-8 w-8 rounded-full text-[10px]' : cn('h-12 w-12 rounded-2xl', mark.length > 3 ? 'text-xs' : 'text-sm'),
        className,
      )}
    >
      <span className="absolute inset-0 bg-gradient-to-br from-white/25 to-black/20" />
      <span className="relative">{mark}</span>
    </span>
  )
}

/**
 * One community — a forum, a society, a regional affiliate, a local club.
 * Its name is the link to the community's own site; the controls that stay
 * here are Follow and, where it has one, its events page.
 */
export function PlaceCard({
  place,
  following,
  onToggleFollow,
  km,
  upcoming,
  index = 0,
}: {
  place: CommunityPlace
  following: boolean
  onToggleFollow: () => void
  km?: number
  /** How many of its events are coming up. */
  upcoming: number
  index?: number
}) {
  return (
    <div
      style={{ ...placeStyle(place), '--rise-delay': `${Math.min(index, 8) * 45}ms` } as CSSProperties}
      className={cn(
        'community-rise group relative flex flex-col gap-3 overflow-hidden rounded-2xl bg-card p-4 text-card-foreground shadow-[var(--shadow-card)]',
        'ring-1 ring-transparent transition-[box-shadow,transform] duration-200 ease-out hover:shadow-lg hover:ring-[var(--topic-muted)] motion-safe:hover:-translate-y-0.5',
        following && 'ring-[var(--topic-muted)]',
      )}
      data-testid="community-place"
    >
      <span aria-hidden className="pointer-events-none absolute -left-10 -top-10 h-28 w-28 rounded-full bg-[var(--topic-accent)] opacity-[0.12] blur-2xl" />
      <div className="relative flex items-start gap-3">
        <PlaceMark place={place} />
        <div className="min-w-0 flex-1">
          <a
            href={place.url}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-start gap-1 text-[15px] font-semibold leading-snug hover:topic-ink focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring rounded-sm"
          >
            {place.name}
            <ArrowUpRight className="mt-0.5 h-3.5 w-3.5 shrink-0 text-muted-foreground" aria-hidden />
          </a>
          <div className="mt-1 flex flex-wrap items-center gap-x-2 gap-y-1 text-xs text-muted-foreground">
            <span className="rounded-full bg-[var(--topic-soft)] px-2 py-0.5 font-semibold topic-ink">{PLACE_KIND_LABEL[place.kind]}</span>
            {place.location ? (
              <span className="inline-flex items-center gap-1">
                <MapPin className="h-3 w-3" aria-hidden />
                {cityLabel(place.location)}
                {km !== undefined && <span className="tabular-nums">· {distanceText(km)}</span>}
              </span>
            ) : place.online ? (
              <span className="inline-flex items-center gap-1">
                <Globe className="h-3 w-3" aria-hidden />
                Online
              </span>
            ) : null}
          </div>
        </div>
        <FollowButton size="sm" tone="topic" following={following} onToggle={onToggleFollow} label={place.name} />
      </div>
      <p className="relative text-sm leading-relaxed text-muted-foreground">{place.description}</p>
      {place.covers && (
        <p className="relative flex flex-wrap gap-1">
          {place.covers.split(',').map(t => (
            <span key={t} className="rounded-md border border-border/70 px-1.5 py-0.5 text-[11px] text-muted-foreground">
              {t.trim()}
            </span>
          ))}
        </p>
      )}
      {(place.eventsUrl || upcoming > 0) && (
        <div className="relative mt-auto flex flex-wrap items-center gap-2 border-t border-border/60 pt-3 text-xs">
          {upcoming > 0 && (
            <span className="inline-flex items-center gap-1 rounded-full bg-[var(--topic-soft)] px-2 py-0.5 font-semibold topic-ink">
              <CalendarDays className="h-3 w-3" aria-hidden />
              {upcoming} coming up
            </span>
          )}
          {place.eventsUrl && (
            <a href={place.eventsUrl} target="_blank" rel="noopener noreferrer" className="ml-auto inline-flex items-center gap-0.5 font-semibold topic-ink hover:underline hover:underline-offset-2">
              Their events
              <ArrowUpRight className="h-3 w-3" aria-hidden />
            </a>
          )}
        </div>
      )}
    </div>
  )
}
