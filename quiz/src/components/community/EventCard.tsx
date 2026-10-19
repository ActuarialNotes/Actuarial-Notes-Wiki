import { ExternalLink, MapPin, Video } from 'lucide-react'
import { cityLabel, countdownLabel, distanceText, eventDateLabel, eventTile, isHappening, type CommunityEvent } from '@/lib/community/places'
import { cn } from '@/lib/utils'

/**
 * One event: a calendar tile, its title and host, when and where as the
 * organiser states it, how far away and how soon. The card is the link to the
 * organiser's own page — registration, the programme and the fine print all
 * live there, and nothing is restated here that the page didn't say.
 */
export function EventCard({
  event,
  hostName,
  today,
  km,
}: {
  event: CommunityEvent
  hostName: string
  today: string
  /** Distance from home, when there is one. */
  km?: number
}) {
  const tile = eventTile(event.start)
  const live = isHappening(event, today)
  const where = event.virtual
    ? 'Online'
    : [event.venue, event.location ? cityLabel(event.location) : null].filter(Boolean).join(' · ')
  return (
    <a
      href={event.url}
      target="_blank"
      rel="noopener noreferrer"
      className="group flex gap-3 rounded-xl bg-card p-3 text-card-foreground shadow-[var(--shadow-card)] transition-colors hover:bg-accent/40 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
      data-testid="community-event"
    >
      <span
        className={cn(
          'flex h-14 w-12 shrink-0 flex-col items-center justify-center rounded-lg border tabular-nums',
          live ? 'border-primary bg-primary text-primary-foreground' : 'bg-background',
        )}
        aria-hidden
      >
        <span className={cn('text-[10px] font-bold tracking-wider', live ? '' : 'text-primary')}>{tile.month}</span>
        <span className="text-xl font-bold leading-none">{tile.day}</span>
      </span>
      <span className="min-w-0 flex-1">
        <span className="flex items-start gap-2">
          <span className="min-w-0 flex-1 text-[15px] font-semibold leading-snug group-hover:underline group-hover:underline-offset-2">{event.title}</span>
          <ExternalLink className="mt-0.5 h-3.5 w-3.5 shrink-0 text-muted-foreground" aria-hidden />
        </span>
        <span className="block truncate text-sm text-muted-foreground">{hostName}</span>
        <span className="mt-1 flex flex-wrap items-center gap-x-2 gap-y-1 text-xs text-muted-foreground">
          <span className="font-medium text-foreground/80">{eventDateLabel(event.start, event.end)}</span>
          <span className={cn('rounded-full px-2 py-0.5 font-semibold', live ? 'bg-primary/15 text-primary' : 'bg-muted')}>{countdownLabel(event, today)}</span>
        </span>
        <span className="mt-1 flex flex-wrap items-center gap-x-2 gap-y-1 text-xs text-muted-foreground">
          {event.virtual ? <Video className="h-3 w-3" aria-hidden /> : <MapPin className="h-3 w-3" aria-hidden />}
          <span className="min-w-0">{where || 'Location on the event page'}</span>
          {event.hybrid && !event.virtual && <span className="rounded-full border px-2 py-0.5 text-[11px]">Also online</span>}
          {km !== undefined && !event.virtual && <span className="tabular-nums">· {distanceText(km)}</span>}
        </span>
      </span>
    </a>
  )
}
