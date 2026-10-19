import type { CSSProperties } from 'react'
import { ArrowUpRight, MapPin, Radio, Video } from 'lucide-react'
import {
  cityLabel,
  countdownLabel,
  daysUntil,
  distanceText,
  eventDateLabel,
  eventTile,
  eventTopics,
  isHappening,
  type CommunityEvent,
} from '@/lib/community/places'
import { leadTopic, topicAccentStyle } from '@/lib/community/topicColors'
import { cn } from '@/lib/utils'

/** Within this many days an event's countdown is lit. */
const SOON_DAYS = 14

function eventStyle(event: CommunityEvent, delay: number): CSSProperties {
  const lead = leadTopic(eventTopics(event)) ?? 'events'
  return { ...topicAccentStyle(lead), '--rise-delay': `${delay}ms` } as CSSProperties
}

function whereText(event: CommunityEvent): string {
  if (event.virtual) return 'Online'
  return [event.venue, event.location ? cityLabel(event.location) : null].filter(Boolean).join(' · ') || 'Location on the event page'
}

/**
 * One event: a calendar tile in the colour of what it is about (a CAS meeting
 * wears Property & Casualty's, an SOA one Life & Health's), its title and
 * host, when and where as the organiser states it, how far and how soon. The
 * card is the link to the organiser's own page — registration, the programme
 * and the fine print all live there, and nothing is restated here that the
 * page didn't say.
 */
export function EventCard({
  event,
  hostName,
  today,
  km,
  index = 0,
  className,
}: {
  event: CommunityEvent
  hostName: string
  today: string
  /** Distance from home, when there is one. */
  km?: number
  index?: number
  className?: string
}) {
  const tile = eventTile(event.start)
  const live = isHappening(event, today)
  const soon = !live && daysUntil(event.start, today) <= SOON_DAYS
  return (
    <a
      href={event.url}
      target="_blank"
      rel="noopener noreferrer"
      style={eventStyle(event, Math.min(index, 8) * 45)}
      className={cn(
        'community-rise group relative flex gap-3 overflow-hidden rounded-2xl bg-card p-3 text-card-foreground shadow-[var(--shadow-card)]',
        'ring-1 ring-transparent transition-[box-shadow,transform] duration-200 ease-out',
        'hover:shadow-lg hover:ring-[var(--topic-muted)] motion-safe:hover:-translate-y-0.5',
        'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring',
        className,
      )}
      data-testid="community-event"
    >
      {/* A wash of the event's colour, drawn from the date tile across the card. */}
      <span aria-hidden className="pointer-events-none absolute inset-y-0 left-0 w-2/3 bg-gradient-to-r from-[var(--topic-soft)] to-transparent opacity-70" />
      <span
        aria-hidden
        className="relative flex h-16 w-14 shrink-0 flex-col items-center justify-center rounded-xl bg-[var(--topic-vivid)] text-white shadow-sm tabular-nums transition-transform duration-200 motion-safe:group-hover:-rotate-3"
      >
        <span className="text-[10px] font-bold tracking-[0.14em] opacity-90">{tile.month}</span>
        <span className="text-2xl font-bold leading-none">{tile.day}</span>
      </span>
      <span className="relative min-w-0 flex-1">
        <span className="flex items-start gap-2">
          <span className="min-w-0 flex-1 text-[15px] font-semibold leading-snug">{event.title}</span>
          <ArrowUpRight className="mt-0.5 h-4 w-4 shrink-0 text-muted-foreground transition-transform duration-200 motion-safe:group-hover:-translate-y-0.5 motion-safe:group-hover:translate-x-0.5 group-hover:topic-ink" aria-hidden />
        </span>
        <span className="block truncate text-sm text-muted-foreground">{hostName}</span>
        <span className="mt-1.5 flex flex-wrap items-center gap-x-2 gap-y-1 text-xs">
          <span className="font-semibold text-foreground/85">{eventDateLabel(event.start, event.end)}</span>
          <Countdown event={event} today={today} live={live} soon={soon} />
        </span>
        <span className="mt-1 flex min-w-0 items-center gap-1.5 text-xs text-muted-foreground">
          {event.virtual ? <Video className="h-3 w-3 shrink-0" aria-hidden /> : <MapPin className="h-3 w-3 shrink-0" aria-hidden />}
          <span className="truncate">{whereText(event)}</span>
          {km !== undefined && !event.virtual && <span className="shrink-0 tabular-nums">· {distanceText(km)}</span>}
        </span>
        {event.hybrid && !event.virtual && (
          <span className="mt-1.5 inline-flex items-center gap-1 rounded-full border border-[var(--topic-muted)] px-2 py-0.5 text-[11px] font-medium topic-ink">
            <Radio className="h-3 w-3" aria-hidden />
            Also online
          </span>
        )}
      </span>
    </a>
  )
}

function Countdown({ event, today, live, soon }: { event: CommunityEvent; today: string; live: boolean; soon: boolean }) {
  return (
    <span
      className={cn(
        'inline-flex items-center gap-1.5 rounded-full px-2 py-0.5 font-semibold',
        live
          ? 'bg-emerald-500/15 text-emerald-600 dark:text-emerald-400'
          : soon
            ? 'bg-[var(--topic-soft)] topic-ink'
            : 'bg-muted text-muted-foreground',
      )}
    >
      {(live || soon) && <span className={cn('h-1.5 w-1.5 rounded-full', live ? 'community-live bg-emerald-500' : 'bg-[var(--topic-accent)]')} aria-hidden />}
      {countdownLabel(event, today)}
    </span>
  )
}

/**
 * The one event the overview leads with — the next thing on the calendar —
 * as a poster in its own colour: the dates large, the countdown larger.
 */
export function FeaturedEvent({
  event,
  hostName,
  today,
  km,
}: {
  event: CommunityEvent
  hostName: string
  today: string
  km?: number
}) {
  const live = isHappening(event, today)
  return (
    <a
      href={event.url}
      target="_blank"
      rel="noopener noreferrer"
      style={eventStyle(event, 0)}
      className={cn(
        'community-rise group relative block overflow-hidden rounded-3xl p-5 text-white shadow-lg sm:p-6',
        'bg-[linear-gradient(135deg,var(--topic-vivid),color-mix(in_oklab,var(--topic-vivid)_55%,black))] transition-transform duration-300 ease-out motion-safe:hover:-translate-y-0.5',
        'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background',
      )}
      data-testid="community-featured-event"
    >
      {/* Light and shade over the fill, and two rings like a stamp on a poster. */}
      <span aria-hidden className="pointer-events-none absolute inset-0 bg-gradient-to-br from-white/15 via-transparent to-black/25" />
      <span aria-hidden className="pointer-events-none absolute -right-16 -top-20 h-64 w-64 rounded-full border-[24px] border-white/10 transition-transform duration-700 ease-out motion-safe:group-hover:scale-110" />
      <span aria-hidden className="pointer-events-none absolute -bottom-24 right-24 h-48 w-48 rounded-full bg-white/10 blur-2xl" />

      <span className="relative flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
        <span className="min-w-0 space-y-2">
          <span className="inline-flex items-center gap-1.5 rounded-full bg-white/15 px-2.5 py-1 text-[11px] font-bold uppercase tracking-[0.12em] backdrop-blur-sm">
            <span className={cn('h-1.5 w-1.5 rounded-full bg-white', live && 'community-live')} aria-hidden />
            {live ? 'Happening now' : 'Next up'}
          </span>
          <span className="block text-2xl font-bold leading-tight tracking-tight sm:text-3xl">{event.title}</span>
          <span className="block text-sm text-white/85">{hostName}</span>
          <span className="flex flex-wrap items-center gap-x-3 gap-y-1 text-sm text-white/90">
            <span className="font-semibold">{eventDateLabel(event.start, event.end)}</span>
            <span className="inline-flex min-w-0 items-center gap-1">
              {event.virtual ? <Video className="h-3.5 w-3.5" aria-hidden /> : <MapPin className="h-3.5 w-3.5" aria-hidden />}
              <span className="truncate">{whereText(event)}</span>
            </span>
            {km !== undefined && !event.virtual && <span className="tabular-nums text-white/75">{distanceText(km)}</span>}
            {event.hybrid && !event.virtual && <span className="text-white/75">Also online</span>}
          </span>
        </span>
        <span className="flex shrink-0 items-center gap-3 sm:flex-col sm:items-end">
          <span className="text-3xl font-black tabular-nums tracking-tight sm:text-4xl">{countdownLabel(event, today)}</span>
          <span className="inline-flex items-center gap-1 rounded-full bg-white px-3 py-1.5 text-sm font-semibold text-neutral-900 transition-transform duration-200 motion-safe:group-hover:translate-x-0.5">
            Event page
            <ArrowUpRight className="h-4 w-4" aria-hidden />
          </span>
        </span>
      </span>
    </a>
  )
}
