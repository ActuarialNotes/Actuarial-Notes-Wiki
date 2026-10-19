import { useMemo, useState, type ReactNode } from 'react'
import { Link, Navigate, useParams, useSearchParams } from 'react-router-dom'
import { ArrowLeft, ChevronRight, Search, Sparkles, X } from 'lucide-react'
import { SegmentedControl } from '@/components/ui/SegmentedControl'
import { EventCard } from '@/components/community/EventCard'
import { HomePicker } from '@/components/community/HomePicker'
import { PlaceCard } from '@/components/community/PlaceCard'
import { PostRow } from '@/components/community/PostRow'
import { FollowButton, TopicLink, TopicPicker } from '@/components/community/TopicChips'
import { topicIcon } from '@/components/community/topicIcons'
import { COMMUNITY_EVENTS } from '@/data/communityEvents'
import { COMMUNITY_PLACES } from '@/data/communityPlaces'
import { useCommunity } from '@/hooks/useCommunity'
import { useCommunityFeed } from '@/hooks/useCommunityFeed'
import { useBack, backLabel, usePageLabel } from '@/hooks/useBack'
import { usePageHead } from '@/hooks/usePageHead'
import { FEED_SOURCES, postsForYou, postsInTopic, searchPosts, agoLabel, type CommunityPost } from '@/lib/community/feed'
import {
  eventTopics,
  eventWhere,
  eventsByMonth,
  homeCities,
  localDay,
  placeTopics,
  placeWhere,
  searchEvents,
  searchPlaces,
  servingHome,
  splitByDistance,
  upcomingEvents,
  type CommunityEvent,
  type CommunityPlace,
} from '@/lib/community/places'
import { ROOT_TOPICS, childTopics, inAnyTopic, inTopic, isTopicId, topicById, type TopicId } from '@/lib/community/topics'
import type { PageHead } from '@/lib/seo'
import { cn } from '@/lib/utils'

// The Community tab (docs/community.md): where actuaries gather — what they
// are saying in public forums, what is coming up near the reader, and the
// places to join — browsed by topic, and followed. Preview, one account
// (lib/community/access.ts).

type View = 'overview' | 'discussions' | 'events' | 'places'
type Scope = 'all' | 'following'

const VIEWS: { value: View; label: string }[] = [
  { value: 'overview', label: 'Overview' },
  { value: 'discussions', label: 'Discussions' },
  { value: 'events', label: 'Events' },
  { value: 'places', label: 'Places' },
]

const HEAD: PageHead = {
  title: 'Community | Actuarial Notes',
  description: 'What actuaries are saying online, the meetings coming up near you, and the forums, societies and clubs where the profession gathers.',
  noindex: true,
}

const PLACE_BY_ID = new Map(COMMUNITY_PLACES.map(p => [p.id, p]))
const hostName = (e: CommunityEvent) => PLACE_BY_ID.get(e.host)?.name ?? e.host

function parseView(raw: string | null): View {
  return VIEWS.some(v => v.value === raw) ? (raw as View) : 'overview'
}

export default function Community() {
  const { topicId } = useParams()
  const [params, setParams] = useSearchParams()
  const topic = topicId && isTopicId(topicId) ? topicById(topicId)! : null
  const view = parseView(params.get('view'))
  const scope: Scope = !topic && params.get('scope') === 'following' ? 'following' : 'all'
  const query = params.get('q') ?? ''

  const follows = useCommunity()
  const feed = useCommunityFeed()
  const back = useBack({ to: '/community', label: 'Community' })
  usePageHead(topic ? { ...HEAD, title: `${topic.label} · Community | Actuarial Notes` } : HEAD)
  usePageLabel(topic ? `${topic.label} · Community` : 'Community')

  // "Now" is read once per mount: a countdown that ticks while the page is
  // open would re-sort the lists under the reader's finger.
  const [now] = useState(() => new Date())
  const today = localDay(now)

  const set = (patch: Record<string, string | null>) => {
    const next = new URLSearchParams(params)
    for (const [k, v] of Object.entries(patch)) {
      if (v === null || v === '') next.delete(k)
      else next.set(k, v)
    }
    setParams(next, { replace: true })
  }

  // What the page is scoped to: one topic, the followed topics, or everything.
  const scopeTopics: TopicId[] | null = topic ? [topic.id] : scope === 'following' ? follows.topics : null
  const matches = (tags: TopicId[]) => (scopeTopics ? (topic ? inTopic(tags, topic.id) : inAnyTopic(tags, scopeTopics)) : true)

  const posts = useMemo(() => {
    const scoped = topic ? postsInTopic(feed.posts, topic.id) : scope === 'following' ? postsForYou(feed.posts, follows.topics) : feed.posts
    return searchPosts(scoped, query)
  }, [feed.posts, topic, scope, follows.topics, query])

  const events = useMemo(
    () => searchEvents(upcomingEvents(COMMUNITY_EVENTS, today), query).filter(e => matches(eventTopics(e))),
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [today, query, topic, scope, follows.topics],
  )
  const places = useMemo(
    () => searchPlaces(COMMUNITY_PLACES, query).filter(p => matches(placeTopics(p))),
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [query, topic, scope, follows.topics],
  )

  const cities = useMemo(() => homeCities(COMMUNITY_PLACES, COMMUNITY_EVENTS), [])
  const eventSplit = useMemo(() => splitByDistance(events, eventWhere, follows.home, follows.radiusKm), [events, follows.home, follows.radiusKm])
  const placeSplit = useMemo(() => splitByDistance(places, placeWhere, follows.home, follows.radiusKm), [places, follows.home, follows.radiusKm])
  const serving = useMemo(() => servingHome(places, follows.home), [places, follows.home])
  const upcomingByHost = useMemo(() => {
    const counts = new Map<string, number>()
    for (const e of upcomingEvents(COMMUNITY_EVENTS, today)) counts.set(e.host, (counts.get(e.host) ?? 0) + 1)
    return counts
  }, [today])

  const homePicker = (
    <HomePicker cities={cities} home={follows.home} radiusKm={follows.radiusKm} onHome={follows.setHome} onRadius={follows.setRadius} />
  )
  const placeCard = (p: CommunityPlace, km?: number) => (
    <PlaceCard
      key={p.id}
      place={p}
      km={follows.home ? km : undefined}
      following={follows.places.includes(p.id)}
      onToggleFollow={() => follows.togglePlace(p.id)}
      upcoming={upcomingByHost.get(p.id) ?? 0}
    />
  )
  const eventCard = (e: CommunityEvent, km?: number) => (
    <EventCard key={e.id} event={e} hostName={hostName(e)} today={today} km={follows.home ? km : undefined} />
  )

  if (topicId && !topic) return <Navigate to="/community" replace />

  const children = topic ? childTopics(topic.parent ?? topic.id) : []
  const followingTopic = topic ? follows.topics.includes(topic.id) : false
  const TopicIcon = topic ? topicIcon(topic.id) : null

  return (
    <div className="container mx-auto max-w-5xl space-y-6 px-4 py-8 sm:px-6">
      {topic ? (
        <header className="space-y-3">
          <Link to={back.to} onClick={back.onLinkClick} className="inline-flex items-center gap-1 text-sm font-medium text-muted-foreground hover:text-foreground">
            <ArrowLeft className="h-4 w-4" aria-hidden />
            {backLabel(back)}
          </Link>
          <div className="flex items-start gap-3">
            {TopicIcon && (
              <span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-primary/10 text-primary" aria-hidden>
                <TopicIcon className="h-6 w-6" />
              </span>
            )}
            <div className="min-w-0 flex-1">
              <h1 className="text-2xl font-bold tracking-tight">{topic.label}</h1>
              <p className="text-sm text-muted-foreground">{topic.blurb}</p>
            </div>
            <FollowButton following={followingTopic} onToggle={() => follows.toggleTopic(topic.id)} label={topic.label} />
          </div>
          {children.length > 0 && (
            <nav aria-label={`Inside ${topicById(topic.parent ?? topic.id)?.label}`} className="-mx-4 flex gap-2 overflow-x-auto px-4 pb-1 sm:mx-0 sm:flex-wrap sm:px-0">
              {topic.parent && <TopicLink id={topic.parent} followed={follows.topics.includes(topic.parent)} />}
              {children.map(c => (
                <TopicLink key={c.id} id={c.id} followed={follows.topics.includes(c.id)} active={c.id === topic.id} />
              ))}
            </nav>
          )}
        </header>
      ) : (
        <header className="space-y-3">
          <div className="flex items-center gap-2">
            <h1 className="min-w-0 flex-1 truncate text-2xl font-bold tracking-tight">Community</h1>
            <span className="rounded-full bg-amber-500/15 px-2 py-0.5 text-[11px] font-semibold text-amber-700 dark:text-amber-300">Preview</span>
          </div>
          <nav aria-label="Topics" className="-mx-4 flex gap-2 overflow-x-auto px-4 pb-1 sm:mx-0 sm:flex-wrap sm:px-0">
            <button
              type="button"
              aria-pressed={scope === 'following'}
              onClick={() => set({ scope: scope === 'following' ? null : 'following' })}
              disabled={follows.topics.length === 0}
              title={follows.topics.length === 0 ? 'Follow a topic first' : undefined}
              className={cn(
                'inline-flex shrink-0 items-center gap-1.5 rounded-full border px-3 py-1.5 text-sm font-medium transition-colors disabled:opacity-50',
                'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring',
                scope === 'following' ? 'border-primary bg-primary text-primary-foreground' : 'bg-card hover:bg-accent',
              )}
            >
              <Sparkles className="h-3.5 w-3.5" aria-hidden />
              For you
            </button>
            {ROOT_TOPICS.map(t => (
              <TopicLink key={t.id} id={t.id} followed={follows.topics.includes(t.id) || childTopics(t.id).some(c => follows.topics.includes(c.id))} />
            ))}
          </nav>
        </header>
      )}

      <div className="flex flex-col gap-3 sm:flex-row sm:items-center">
        <SegmentedControl label="Show" size="md" pill value={view} onChange={v => set({ view: v === 'overview' ? null : v })} options={VIEWS} className="sm:w-auto" />
        <label className="relative flex min-w-0 flex-1 items-center">
          <Search className="pointer-events-none absolute left-3 h-4 w-4 text-muted-foreground" aria-hidden />
          <span className="sr-only">Search the community</span>
          <input
            type="search"
            value={query}
            onChange={e => set({ q: e.target.value })}
            placeholder={topic ? `Search ${topic.label}` : 'Search posts, events and places'}
            className="h-10 w-full rounded-full border bg-card pl-9 pr-9 text-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
          />
          {query && (
            <button type="button" onClick={() => set({ q: null })} aria-label="Clear search" className="absolute right-2 rounded-full p-1 text-muted-foreground hover:text-foreground">
              <X className="h-4 w-4" />
            </button>
          )}
        </label>
      </div>

      {view === 'overview' && (
        <div className="space-y-10">
          {!topic && follows.topics.length === 0 && !query && (
            <Section title="Follow what you care about" subtitle="Pick a few topics and For you gathers their posts, events and places.">
              <TopicPicker topics={ROOT_TOPICS} followed={follows.topics} onToggle={follows.toggleTopic} />
            </Section>
          )}

          <Section
            title={follows.home ? `Coming up near ${follows.home.label}` : 'Coming up'}
            action={<SeeAll onClick={() => set({ view: 'events' })} label="All events" />}
          >
            {homePicker}
            <EventPreview split={eventSplit} hasHome={!!follows.home} card={eventCard} />
          </Section>

          <Section
            title="What actuaries are saying"
            action={<SeeAll onClick={() => set({ view: 'discussions' })} label="All discussions" />}
          >
            <PostList posts={posts.slice(0, 6)} status={feed.status} now={now} scoped={!!scopeTopics || !!query} />
          </Section>

          <Section title="Places to gather" action={<SeeAll onClick={() => set({ view: 'places' })} label="All places" />}>
            <div className="grid grid-cols-1 gap-3 md:grid-cols-2">
              {[
                ...serving.slice(0, 1).map(p => placeCard(p)),
                ...placeSplit.near.slice(0, 2).map(n => placeCard(n.item, n.km)),
                ...placeSplit.online.map(p => placeCard(p)),
              ].slice(0, 4)}
            </div>
            {places.length === 0 && <Empty>No places match.</Empty>}
          </Section>
        </div>
      )}

      {view === 'discussions' && (
        <Section title="What actuaries are saying" subtitle={feedSourceLine(feed.asOf, now)}>
          <PostList posts={posts} status={feed.status} now={now} scoped={!!scopeTopics || !!query} />
        </Section>
      )}

      {view === 'events' && (
        <div className="space-y-8">
          {homePicker}
          {follows.home && (
            <EventMonths title={`Near ${follows.home.label}`} items={eventSplit.near} card={eventCard} empty="Nothing in person within reach — widen the distance, or look online below." />
          )}
          <EventMonths title="Online" items={eventSplit.online.map(item => ({ item }))} card={eventCard} empty="No online events coming up." />
          <EventMonths
            title={follows.home ? 'Farther away' : 'In person'}
            items={eventSplit.farther}
            card={eventCard}
            empty={follows.home ? 'Nothing farther away.' : 'No in-person events coming up.'}
          />
          <p className="text-xs text-muted-foreground">
            Every event is transcribed from its organiser’s own page, which the card opens — check the dates there before you go.
          </p>
        </div>
      )}

      {view === 'places' && (
        <div className="space-y-8">
          {follows.places.length > 0 && (
            <Section title="Following">
              <div className="grid grid-cols-1 gap-3 md:grid-cols-2">
                {places.filter(p => follows.places.includes(p.id)).map(p => placeCard(p))}
              </div>
            </Section>
          )}
          <Section title="Online">
            <div className="grid grid-cols-1 gap-3 md:grid-cols-2">{placeSplit.online.map(p => placeCard(p))}</div>
            {placeSplit.online.length === 0 && <Empty>No online places match.</Empty>}
          </Section>
          <Section title={follows.home ? `Near ${follows.home.label}` : 'In real life'}>
            {homePicker}
            <div className="grid grid-cols-1 gap-3 md:grid-cols-2">
              {(follows.home ? placeSplit.near : placeSplit.farther).map(n => placeCard(n.item, n.km))}
            </div>
            {(follows.home ? placeSplit.near : placeSplit.farther).length === 0 && <Empty>Nothing within reach — widen the distance.</Empty>}
          </Section>
          <Section
            title={serving.length ? `Serving ${follows.home?.label}` : 'Regional affiliates'}
            subtitle={serving.length ? 'The CAS regional affiliates whose territory includes your province or state.' : 'CAS regional affiliates serve a territory rather than a city — each lists the states or provinces it covers.'}
          >
            <div className="grid grid-cols-1 gap-3 md:grid-cols-2">
              {(serving.length ? serving : placeSplit.elsewhere).map(p => placeCard(p))}
            </div>
            {serving.length > 0 && placeSplit.elsewhere.length > serving.length && (
              <details className="group">
                <summary className="cursor-pointer text-sm font-medium text-primary">Every other affiliate</summary>
                <div className="mt-3 grid grid-cols-1 gap-3 md:grid-cols-2">
                  {placeSplit.elsewhere.filter(p => !serving.includes(p)).map(p => placeCard(p))}
                </div>
              </details>
            )}
          </Section>
          {follows.home && placeSplit.farther.length > 0 && (
            <Section title="Farther away">
              <div className="grid grid-cols-1 gap-3 md:grid-cols-2">{placeSplit.farther.map(n => placeCard(n.item, n.km))}</div>
            </Section>
          )}
        </div>
      )}
    </div>
  )
}

function Section({ title, subtitle, action, children }: { title: string; subtitle?: string; action?: ReactNode; children: ReactNode }) {
  return (
    <section className="space-y-3">
      <div className="flex items-end gap-2">
        <div className="min-w-0 flex-1">
          <h2 className="text-lg font-semibold tracking-tight">{title}</h2>
          {subtitle && <p className="text-sm text-muted-foreground">{subtitle}</p>}
        </div>
        {action}
      </div>
      {children}
    </section>
  )
}

function SeeAll({ onClick, label }: { onClick: () => void; label: string }) {
  return (
    <button type="button" onClick={onClick} className="inline-flex shrink-0 items-center gap-0.5 text-sm font-medium text-primary hover:underline hover:underline-offset-2">
      {label}
      <ChevronRight className="h-4 w-4" aria-hidden />
    </button>
  )
}

function Empty({ children }: { children: ReactNode }) {
  return <p className="rounded-xl border border-dashed p-6 text-center text-sm text-muted-foreground">{children}</p>
}

function feedSourceLine(asOf: Date | null, now: Date): string {
  const read = asOf ? ` · read ${agoLabel(asOf, now) === 'now' ? 'just now' : `${agoLabel(asOf, now)} ago`}` : ''
  return `The newest posts on ${FEED_SOURCES.reddit.name}, as posted${read}.`
}

function PostList({ posts, status, now, scoped }: { posts: CommunityPost[]; status: 'loading' | 'ready' | 'unavailable'; now: Date; scoped: boolean }) {
  if (status === 'loading') {
    return (
      <div className="overflow-hidden rounded-xl bg-card shadow-[var(--shadow-card)]" aria-busy="true">
        {Array.from({ length: 4 }, (_, i) => (
          <div key={i} className="flex gap-3 px-4 py-4">
            <div className="h-8 w-10 animate-pulse rounded bg-muted" />
            <div className="flex-1 space-y-2">
              <div className="h-4 w-3/4 animate-pulse rounded bg-muted" />
              <div className="h-3 w-1/2 animate-pulse rounded bg-muted" />
            </div>
          </div>
        ))}
      </div>
    )
  }
  if (status === 'unavailable') {
    return (
      <Empty>
        The discussion feed couldn’t be read just now.{' '}
        <a href={FEED_SOURCES.reddit.home} target="_blank" rel="noopener noreferrer" className="font-medium text-primary hover:underline">
          Open {FEED_SOURCES.reddit.name}
        </a>
      </Empty>
    )
  }
  if (posts.length === 0) return <Empty>{scoped ? 'No recent posts on this.' : 'No recent posts.'}</Empty>
  return (
    <div className="overflow-hidden rounded-xl bg-card text-card-foreground shadow-[var(--shadow-card)]">
      {posts.map(p => (
        <PostRow key={p.id} post={p} now={now} />
      ))}
    </div>
  )
}

function EventPreview({
  split,
  hasHome,
  card,
}: {
  split: ReturnType<typeof splitByDistance<CommunityEvent>>
  hasHome: boolean
  card: (e: CommunityEvent, km?: number) => ReactNode
}) {
  // With a home: near first, then what can be joined online — four in all.
  // Without one: simply the next four, wherever they are.
  const picked: { item: CommunityEvent; km?: number }[] = (
    hasHome
      ? [...split.near, ...split.online.map(item => ({ item }))].slice(0, 4)
      : [...split.online.map(item => ({ item })), ...split.farther].sort((a, b) => a.item.start.localeCompare(b.item.start)).slice(0, 4)
  ).sort((a, b) => a.item.start.localeCompare(b.item.start))
  if (picked.length === 0) return <Empty>No events coming up{hasHome ? ' within reach' : ''}.</Empty>
  return <div className="grid grid-cols-1 gap-3 md:grid-cols-2">{picked.map(p => card(p.item, p.km))}</div>
}

function EventMonths({
  title,
  items,
  card,
  empty,
}: {
  title: string
  items: { item: CommunityEvent; km?: number }[]
  card: (e: CommunityEvent, km?: number) => ReactNode
  empty: string
}) {
  const km = new Map(items.map(i => [i.item.id, i.km]))
  const months = eventsByMonth([...items.map(i => i.item)].sort((a, b) => a.start.localeCompare(b.start)))
  return (
    <Section title={title}>
      {months.length === 0 ? (
        <Empty>{empty}</Empty>
      ) : (
        <div className="space-y-5">
          {months.map(m => (
            <div key={m.key} className="space-y-2">
              <h3 className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">{m.label}</h3>
              <div className="grid grid-cols-1 gap-3 md:grid-cols-2">{m.events.map(e => card(e, km.get(e.id)))}</div>
            </div>
          ))}
        </div>
      )}
    </Section>
  )
}
