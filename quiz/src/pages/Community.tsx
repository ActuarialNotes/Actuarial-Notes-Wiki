import { useMemo, useState, type MouseEvent, type ReactNode } from 'react'
import { Link, Navigate, useParams, useSearchParams } from 'react-router-dom'
import {
  ArrowLeft,
  CalendarDays,
  ChevronRight,
  Compass,
  LayoutGrid,
  MapPinned,
  MessagesSquare,
  Search,
  Sparkles,
  Users,
  X,
  type LucideIcon,
} from 'lucide-react'
import { SegmentedControl } from '@/components/ui/SegmentedControl'
import { EventCard, FeaturedEvent } from '@/components/community/EventCard'
import { HomePicker } from '@/components/community/HomePicker'
import { PlaceCard, PlaceMark } from '@/components/community/PlaceCard'
import { PostRow } from '@/components/community/PostRow'
import { FollowButton, TopicLink, TopicPicker } from '@/components/community/TopicChips'
import { topicIcon } from '@/components/community/topicIcons'
import { COMMUNITY_EVENTS } from '@/data/communityEvents'
import { COMMUNITY_PLACES } from '@/data/communityPlaces'
import { useCommunity } from '@/hooks/useCommunity'
import { useCommunityFeed } from '@/hooks/useCommunityFeed'
import { useBack, backLabel, usePageLabel } from '@/hooks/useBack'
import { usePageHead } from '@/hooks/usePageHead'
import {
  FEED_SOURCES,
  agoLabel,
  postsForYou,
  postsInLastDay,
  postsInTopic,
  searchPosts,
  sortPosts,
  type CommunityPost,
  type PostSort,
} from '@/lib/community/feed'
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
import { hueStyle, topicAccentStyle, topicHue } from '@/lib/community/topicColors'
import type { PageHead } from '@/lib/seo'
import { cn } from '@/lib/utils'

// The Community tab (docs/community.md): where actuaries gather — what they
// are saying in public forums, what is coming up near the reader, and the
// places to join — browsed by topic, and followed. Preview, one account
// (lib/community/access.ts).
//
// The look: every topic wears a hue (lib/community/topicColors.ts) and the
// page is drawn in them — the hero's drifting colour field, a topic page's
// wash, an event's date tile, a post's tags — so the page reads as many
// conversations rather than one list. Cards rise in on arrival; the live dot
// breathes. Both stop under reduced motion (index.css, "Community").

type View = 'overview' | 'discussions' | 'events' | 'places'
type Scope = 'all' | 'following'

const VIEW_ICON: Record<View, LucideIcon> = {
  overview: LayoutGrid,
  discussions: MessagesSquare,
  events: CalendarDays,
  places: MapPinned,
}
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
  const sort: PostSort = params.get('sort') === 'discussed' ? 'discussed' : 'new'
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
  const placeCard = (p: CommunityPlace, i: number, km?: number) => (
    <PlaceCard
      key={p.id}
      index={i}
      place={p}
      km={follows.home ? km : undefined}
      following={follows.places.includes(p.id)}
      onToggleFollow={() => follows.togglePlace(p.id)}
      upcoming={upcomingByHost.get(p.id) ?? 0}
    />
  )
  const eventCard = (e: CommunityEvent, i: number, km?: number, className?: string) => (
    <EventCard key={e.id} index={i} event={e} hostName={hostName(e)} today={today} km={follows.home ? km : undefined} className={className} />
  )

  if (topicId && !topic) return <Navigate to="/community" replace />

  const stats = { today: postsInLastDay(feed.posts, now), events: upcomingEvents(COMMUNITY_EVENTS, today).length, places: COMMUNITY_PLACES.length }
  const overviewPlaces = [...serving.slice(0, 1), ...placeSplit.near.slice(0, 2).map(n => n.item), ...placeSplit.online].slice(0, 4)

  return (
    <div className="container mx-auto max-w-5xl space-y-6 px-4 py-6 sm:px-6 sm:py-8">
      {topic ? (
        <TopicHero
          topicId={topic.id}
          back={<BackLink to={back.to} onClick={back.onLinkClick} label={backLabel(back)} />}
          following={follows.topics.includes(topic.id)}
          onToggle={() => follows.toggleTopic(topic.id)}
          counts={{ posts: posts.length, events: events.length, places: places.length, loading: feed.status === 'loading' }}
          followedIds={follows.topics}
        />
      ) : (
        <>
          <Hero stats={stats} feedLive={feed.status === 'ready'} />
          <nav aria-label="Topics" className="-mx-4 flex gap-2 overflow-x-auto px-4 pb-1 [scrollbar-width:none] sm:mx-0 sm:flex-wrap sm:px-0">
            <button
              type="button"
              aria-pressed={scope === 'following'}
              onClick={() => set({ scope: scope === 'following' ? null : 'following' })}
              disabled={follows.topics.length === 0}
              title={follows.topics.length === 0 ? 'Follow a topic first' : undefined}
              className={cn(
                'inline-flex shrink-0 items-center gap-2 rounded-full border py-1 pl-1 pr-3 text-sm font-semibold transition-colors disabled:opacity-50',
                'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring',
                scope === 'following' ? 'border-transparent bg-foreground text-background' : 'border-border bg-card hover:bg-accent',
              )}
            >
              <span
                className={cn(
                  'flex h-6 w-6 items-center justify-center rounded-full',
                  scope === 'following' ? 'bg-background/20' : 'bg-gradient-to-br from-amber-400 via-pink-500 to-violet-500 text-white',
                )}
              >
                <Sparkles className="h-3.5 w-3.5" aria-hidden />
              </span>
              For you
            </button>
            {ROOT_TOPICS.map(t => (
              <TopicLink key={t.id} id={t.id} followed={follows.topics.includes(t.id) || childTopics(t.id).some(c => follows.topics.includes(c.id))} />
            ))}
          </nav>
        </>
      )}

      <div className="sticky top-14 z-10 -mx-4 lg:top-0 flex flex-col gap-2 bg-background/85 px-4 py-2 backdrop-blur-md sm:mx-0 sm:flex-row sm:items-center sm:px-0">
        <SegmentedControl
          label="Show"
          size="md"
          pill
          value={view}
          onChange={v => set({ view: v === 'overview' ? null : v })}
          options={VIEWS.map(v => {
            const Icon = VIEW_ICON[v.value]
            return {
              value: v.value,
              ariaLabel: v.label,
              label: (
                <>
                  <Icon className="hidden h-4 w-4 sm:block" aria-hidden />
                  <span className="text-xs sm:text-sm">{v.label}</span>
                </>
              ),
            }
          })}
          className="sm:w-auto"
        />
        <label className="relative flex min-w-0 flex-1 items-center">
          <Search className="pointer-events-none absolute left-3 h-4 w-4 text-muted-foreground" aria-hidden />
          <span className="sr-only">Search the community</span>
          <input
            type="search"
            value={query}
            onChange={e => set({ q: e.target.value })}
            placeholder={topic ? `Search ${topic.label}` : 'Search posts, events and places'}
            className="h-10 w-full rounded-full border bg-card pl-9 pr-9 text-sm shadow-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
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
            <Section icon={Sparkles} hue={48} title="Make it yours" subtitle="Follow a few topics and For you gathers their posts, events and places.">
              <TopicPicker topics={ROOT_TOPICS} followed={follows.topics} onToggle={follows.toggleTopic} />
            </Section>
          )}

          <Section
            icon={CalendarDays}
            hue={topicHue('events')}
            title={follows.home ? `Coming up near ${follows.home.label}` : 'Coming up'}
            action={<SeeAll onClick={() => set({ view: 'events' })} label="All events" />}
          >
            {homePicker}
            <EventPreview
              split={eventSplit}
              hasHome={!!follows.home}
              emptyAction={topic || scope === 'following' ? { label: 'See every event', to: '/community?view=events' } : undefined}
              feature={(e, km) => <FeaturedEvent key={e.id} event={e} hostName={hostName(e)} today={today} km={follows.home ? km : undefined} />}
              card={(e, i, km) => eventCard(e, i, km, 'w-[85%] shrink-0 snap-start sm:w-[340px]')}
            />
          </Section>

          <Section
            icon={MessagesSquare}
            hue={topicHue('careers')}
            title="What actuaries are saying"
            subtitle={feed.status === 'ready' ? 'The most talked-about threads on r/actuary right now.' : undefined}
            live={feed.status === 'ready'}
            action={<SeeAll onClick={() => set({ view: 'discussions' })} label="All discussions" />}
          >
            <PostList posts={sortPosts(posts, 'discussed').slice(0, 5)} status={feed.status} now={now} scoped={!!scopeTopics || !!query} />
          </Section>

          <Section icon={Users} hue={150} title="Places to gather" action={<SeeAll onClick={() => set({ view: 'places' })} label="All places" />}>
            <div className="grid grid-cols-1 gap-3 md:grid-cols-2">
              {overviewPlaces.map((p, i) => placeCard(p, i, placeSplit.near.find(n => n.item === p)?.km))}
            </div>
            {places.length === 0 && (
              <Empty action={topic ? { label: 'Browse every place', to: '/community?view=places' } : undefined}>
                {topic ? `No community here is only about ${topic.label}.` : 'No places match.'}
              </Empty>
            )}
          </Section>
        </div>
      )}

      {view === 'discussions' && (
        <Section
          icon={MessagesSquare}
          hue={topicHue('careers')}
          title="What actuaries are saying"
          subtitle={feedSourceLine(feed.asOf, now)}
          live={feed.status === 'ready'}
          action={
            <SegmentedControl
              label="Sort"
              size="sm"
              pill
              value={sort}
              onChange={v => set({ sort: v === 'new' ? null : v })}
              options={[
                { value: 'new', label: <span className="text-xs">Newest</span>, ariaLabel: 'Newest' },
                { value: 'discussed', label: <span className="whitespace-nowrap text-xs">Most discussed</span>, ariaLabel: 'Most discussed' },
              ]}
            />
          }
        >
          <PostList posts={sortPosts(posts, sort)} status={feed.status} now={now} scoped={!!scopeTopics || !!query} />
        </Section>
      )}

      {view === 'events' && (
        <div className="space-y-8">
          {homePicker}
          {follows.home && (
            <EventMonths title={`Near ${follows.home.label}`} icon={MapPinned} items={eventSplit.near} card={eventCard} empty="Nothing in person within reach — widen the distance, or look online below." />
          )}
          <EventMonths title="Online" icon={Compass} items={eventSplit.online.map(item => ({ item }))} card={eventCard} empty="No online events coming up." />
          <EventMonths
            title={follows.home ? 'Farther away' : 'In person'}
            icon={CalendarDays}
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
        <div className="space-y-10">
          {follows.places.length > 0 && (
            <Section icon={Sparkles} hue={48} title="Following">
              <div className="grid grid-cols-1 gap-3 md:grid-cols-2">
                {places.filter(p => follows.places.includes(p.id)).map((p, i) => placeCard(p, i))}
              </div>
            </Section>
          )}
          <Section icon={Compass} hue={204} title="Online" subtitle="Forums, chats and the societies’ own communities.">
            <div className="grid grid-cols-1 gap-3 md:grid-cols-2">{placeSplit.online.map((p, i) => placeCard(p, i))}</div>
            {placeSplit.online.length === 0 && <Empty>No online places match.</Empty>}
          </Section>
          <Section icon={MapPinned} hue={150} title={follows.home ? `Near ${follows.home.label}` : 'In real life'} subtitle="Local actuaries’ clubs and student associations.">
            {homePicker}
            <div className="grid grid-cols-1 gap-3 md:grid-cols-2">
              {(follows.home ? placeSplit.near : placeSplit.farther).map((n, i) => placeCard(n.item, i, n.km))}
            </div>
            {(follows.home ? placeSplit.near : placeSplit.farther).length === 0 && <Empty>Nothing within reach — widen the distance.</Empty>}
          </Section>
          <Section
            icon={Users}
            hue={topicHue('pc')}
            title={serving.length ? `Serving ${follows.home?.label}` : 'Regional affiliates'}
            subtitle={
              serving.length
                ? 'The CAS regional affiliates whose territory includes your province or state.'
                : 'CAS regional affiliates serve a territory rather than a city — each lists the states or provinces it covers.'
            }
          >
            <div className="grid grid-cols-1 gap-3 md:grid-cols-2">
              {(serving.length ? serving : placeSplit.elsewhere).map((p, i) => placeCard(p, i))}
            </div>
            {serving.length > 0 && placeSplit.elsewhere.length > serving.length && (
              <details className="group">
                <summary className="inline-flex cursor-pointer list-none items-center gap-1 text-sm font-semibold topic-ink">
                  <ChevronRight className="h-4 w-4 transition-transform group-open:rotate-90" aria-hidden />
                  Every other affiliate
                </summary>
                <div className="mt-3 grid grid-cols-1 gap-3 md:grid-cols-2">
                  {placeSplit.elsewhere.filter(p => !serving.includes(p)).map((p, i) => placeCard(p, i))}
                </div>
              </details>
            )}
          </Section>
          {follows.home && placeSplit.farther.length > 0 && (
            <Section icon={MapPinned} hue={220} title="Farther away">
              <div className="grid grid-cols-1 gap-3 md:grid-cols-2">{placeSplit.farther.map((n, i) => placeCard(n.item, i, n.km))}</div>
            </Section>
          )}
        </div>
      )}
    </div>
  )
}

/**
 * The tab's front page: a field of the topics' colours drifting slowly behind
 * the title, three live facts — posts today, meetings ahead, places to join —
 * and the places themselves stacked like faces in a crowd.
 */
function Hero({ stats, feedLive }: { stats: { today: number; events: number; places: number }; feedLive: boolean }) {
  const faces = COMMUNITY_PLACES.filter(p => p.online || p.kind === 'local-club').slice(0, 6)
  const blob = (topic: TopicId, l = 55) => ({ background: `hsl(${topicHue(topic)} 85% ${l}%)` })
  return (
    <header className="relative isolate overflow-hidden rounded-3xl border bg-card p-5 shadow-[var(--shadow-card)] sm:p-8">
      <div aria-hidden className="community-drift pointer-events-none absolute inset-0 -z-10">
        <span className="absolute -left-16 -top-24 h-72 w-72 rounded-full opacity-30 blur-3xl" style={blob('exams')} />
        <span className="absolute -right-10 -top-16 h-64 w-64 rounded-full opacity-25 blur-3xl" style={blob('life-health', 58)} />
        <span className="absolute -bottom-28 left-1/3 h-72 w-72 rounded-full opacity-25 blur-3xl" style={blob('careers', 50)} />
        <span className="absolute -bottom-20 -right-10 h-56 w-56 rounded-full opacity-20 blur-3xl" style={blob('reforms')} />
      </div>
      <div className="flex flex-col gap-5 sm:flex-row sm:items-end sm:justify-between">
        <div className="space-y-2">
          <span className="inline-flex items-center rounded-full bg-amber-500/15 px-2 py-0.5 text-[11px] font-semibold text-amber-700 dark:text-amber-300">Preview</span>
          <h1 className="text-3xl font-bold tracking-tight sm:text-4xl">Community</h1>
          <p className="max-w-md text-[15px] text-muted-foreground">
            Where actuaries gather — what they’re talking about, where they’re meeting, and how to join in.
          </p>
        </div>
        <div className="flex items-center" aria-hidden>
          {faces.map((p, i) => (
            <PlaceMark key={p.id} place={p} size="sm" className={cn('ring-2 ring-card', i > 0 && '-ml-2.5')} />
          ))}
          <span className="-ml-2.5 flex h-8 min-w-8 items-center justify-center rounded-full bg-muted px-2 text-[11px] font-bold ring-2 ring-card">
            +{Math.max(0, stats.places - faces.length)}
          </span>
        </div>
      </div>
      <div className="mt-5 flex flex-wrap gap-2 text-sm">
        <Stat>
          <span className={cn('h-2 w-2 rounded-full', feedLive ? 'community-live bg-emerald-500' : 'bg-muted-foreground/40')} aria-hidden />
          {feedLive ? (
            <span>
              <b className="tabular-nums">{stats.today}</b> new on r/actuary today
            </span>
          ) : (
            'Live from r/actuary'
          )}
        </Stat>
        <Stat>
          <CalendarDays className="h-4 w-4 text-muted-foreground" aria-hidden />
          <span>
            <b className="tabular-nums">{stats.events}</b> meetings ahead
          </span>
        </Stat>
        <Stat>
          <Users className="h-4 w-4 text-muted-foreground" aria-hidden />
          <span>
            <b className="tabular-nums">{stats.places}</b> places to join
          </span>
        </Stat>
      </div>
    </header>
  )
}

function Stat({ children }: { children: ReactNode }) {
  return <span className="inline-flex items-center gap-2 rounded-full border bg-background/70 px-3 py-1.5 backdrop-blur-sm">{children}</span>
}

/** A topic's page: washed in the topic's colour, with its numbers and its follow button. */
function TopicHero({
  topicId,
  back,
  following,
  onToggle,
  counts,
  followedIds,
}: {
  topicId: TopicId
  back: ReactNode
  following: boolean
  onToggle: () => void
  counts: { posts: number; events: number; places: number; loading: boolean }
  followedIds: readonly TopicId[]
}) {
  const topic = topicById(topicId)!
  const Icon = topicIcon(topicId)
  const family = topic.parent ?? topic.id
  const children = childTopics(family)
  return (
    <header className="space-y-4" style={topicAccentStyle(topicId)}>
      {back}
      <div className="relative isolate overflow-hidden rounded-3xl border border-[var(--topic-muted)] bg-card p-5 shadow-[var(--shadow-card)] sm:p-7">
        <div aria-hidden className="pointer-events-none absolute inset-0 -z-10 bg-gradient-to-br from-[var(--topic-soft)] via-transparent to-transparent" />
        <div aria-hidden className="community-drift pointer-events-none absolute -right-20 -top-24 -z-10 h-72 w-72 rounded-full bg-[var(--topic-accent)] opacity-25 blur-3xl" />
        <div className="flex items-start gap-4">
          <span className="flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl bg-[var(--topic-vivid)] text-white shadow-md" aria-hidden>
            <Icon className="h-7 w-7" />
          </span>
          <div className="min-w-0 flex-1">
            <h1 className="text-2xl font-bold tracking-tight sm:text-3xl">{topic.label}</h1>
            <p className="mt-0.5 text-sm text-muted-foreground">{topic.blurb}</p>
          </div>
          <span className="hidden sm:block">
            <FollowButton tone="topic" following={following} onToggle={onToggle} label={topic.label} />
          </span>
        </div>
        <div className="mt-4 flex flex-wrap items-center gap-2 text-sm">
          <Stat>
            <MessagesSquare className="h-4 w-4 topic-ink" aria-hidden />
            <span>
              <b className="tabular-nums">{counts.loading ? '…' : counts.posts}</b> recent posts
            </span>
          </Stat>
          <Stat>
            <CalendarDays className="h-4 w-4 topic-ink" aria-hidden />
            <span>
              <b className="tabular-nums">{counts.events}</b> events
            </span>
          </Stat>
          <Stat>
            <Users className="h-4 w-4 topic-ink" aria-hidden />
            <span>
              <b className="tabular-nums">{counts.places}</b> places
            </span>
          </Stat>
          <span className="ml-auto sm:hidden">
            <FollowButton tone="topic" following={following} onToggle={onToggle} label={topic.label} />
          </span>
        </div>
      </div>
      {children.length > 0 && (
        <nav aria-label={`Inside ${topicById(family)?.label}`} className="-mx-4 flex gap-2 overflow-x-auto px-4 pb-1 [scrollbar-width:none] sm:mx-0 sm:flex-wrap sm:px-0">
          <TopicLink id={family} followed={followedIds.includes(family)} active={family === topicId} />
          {children.map(c => (
            <TopicLink key={c.id} id={c.id} followed={followedIds.includes(c.id)} active={c.id === topicId} />
          ))}
        </nav>
      )}
    </header>
  )
}

function BackLink({ to, onClick, label }: { to: string; onClick: (e: MouseEvent) => void; label: string }) {
  return (
    <Link to={to} onClick={onClick} className="inline-flex items-center gap-1 text-sm font-medium text-muted-foreground hover:text-foreground">
      <ArrowLeft className="h-4 w-4" aria-hidden />
      {label}
    </Link>
  )
}

function Section({
  title,
  subtitle,
  action,
  icon: Icon,
  hue,
  live,
  children,
}: {
  title: string
  subtitle?: string
  action?: ReactNode
  icon?: LucideIcon
  hue?: number
  live?: boolean
  children: ReactNode
}) {
  return (
    <section className="space-y-3" style={hue !== undefined ? hueStyle(hue) : undefined}>
      <div className="space-y-1">
        <div className="flex items-center gap-3">
          {Icon && (
            <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-[var(--topic-soft)] topic-ink" aria-hidden>
              <Icon className="h-[18px] w-[18px]" />
            </span>
          )}
          <h2 className="flex min-w-0 flex-1 flex-wrap items-center gap-x-2 gap-y-1 text-lg font-semibold leading-tight tracking-tight">
            {title}
            {live && (
              <span className="inline-flex items-center gap-1.5 rounded-full bg-emerald-500/15 px-2 py-0.5 text-[11px] font-bold uppercase tracking-wider text-emerald-600 dark:text-emerald-400">
                <span className="community-live h-1.5 w-1.5 rounded-full bg-emerald-500" aria-hidden />
                Live
              </span>
            )}
          </h2>
          {action}
        </div>
        {subtitle && <p className={cn('text-sm text-muted-foreground', Icon && 'sm:pl-12')}>{subtitle}</p>}
      </div>
      {children}
    </section>
  )
}

function SeeAll({ onClick, label }: { onClick: () => void; label: string }) {
  return (
    <button
      type="button"
      onClick={onClick}
      className="group inline-flex shrink-0 items-center gap-0.5 rounded-full px-2 py-1 text-sm font-semibold topic-ink transition-colors hover:bg-[var(--topic-soft)]"
    >
      {label}
      <ChevronRight className="h-4 w-4 transition-transform motion-safe:group-hover:translate-x-0.5" aria-hidden />
    </button>
  )
}

function Empty({ children, action }: { children: ReactNode; action?: { label: string; to: string } }) {
  return (
    <div className="flex flex-col items-center gap-3 rounded-2xl border border-dashed bg-[var(--topic-soft,transparent)] p-6 text-center text-sm text-muted-foreground">
      <p>{children}</p>
      {action && (
        <Link to={action.to} className="inline-flex items-center gap-1 rounded-full bg-card px-3 py-1.5 text-sm font-semibold text-foreground shadow-sm transition-colors hover:bg-accent">
          {action.label}
          <ChevronRight className="h-4 w-4" aria-hidden />
        </Link>
      )}
    </div>
  )
}

function feedSourceLine(asOf: Date | null, now: Date): string {
  const read = asOf ? ` · read ${agoLabel(asOf, now) === 'now' ? 'just now' : `${agoLabel(asOf, now)} ago`}` : ''
  return `The newest posts on ${FEED_SOURCES.reddit.name}, as posted${read}.`
}

function PostList({ posts, status, now, scoped }: { posts: CommunityPost[]; status: 'loading' | 'ready' | 'unavailable'; now: Date; scoped: boolean }) {
  if (status === 'loading') {
    return (
      <div className="overflow-hidden rounded-2xl bg-card shadow-[var(--shadow-card)]" aria-busy="true">
        {Array.from({ length: 4 }, (_, i) => (
          <div key={i} className="flex gap-3 px-4 py-4">
            <div className="h-9 w-9 animate-pulse rounded-full bg-muted" />
            <div className="flex-1 space-y-2">
              <div className="h-3 w-24 animate-pulse rounded bg-muted" />
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
    <div className="overflow-hidden rounded-2xl bg-card text-card-foreground shadow-[var(--shadow-card)]">
      {posts.map((p, i) => (
        <PostRow key={p.id} post={p} now={now} index={i} />
      ))}
    </div>
  )
}

/**
 * The overview's events: the next one as a poster, the few after it on a rail
 * to swipe along. With a home, what is near comes first, then what can be
 * joined online; without one, simply what is next, wherever it is.
 */
function EventPreview({
  split,
  hasHome,
  emptyAction,
  feature,
  card,
}: {
  split: ReturnType<typeof splitByDistance<CommunityEvent>>
  hasHome: boolean
  emptyAction?: { label: string; to: string }
  feature: (e: CommunityEvent, km?: number) => ReactNode
  card: (e: CommunityEvent, i: number, km?: number) => ReactNode
}) {
  const picked: { item: CommunityEvent; km?: number }[] = (
    hasHome
      ? [...split.near, ...split.online.map(item => ({ item }))].slice(0, 7)
      : [...split.online.map(item => ({ item })), ...split.farther].sort((a, b) => a.item.start.localeCompare(b.item.start)).slice(0, 7)
  ).sort((a, b) => a.item.start.localeCompare(b.item.start))
  if (picked.length === 0) return <Empty action={emptyAction}>Nothing on the calendar here{hasHome ? ' within reach' : ''} yet.</Empty>
  const [first, ...rest] = picked
  return (
    <div className="space-y-3">
      {feature(first.item, first.km)}
      {rest.length > 0 && (
        <div className="-mx-4 flex snap-x snap-mandatory scroll-px-4 gap-3 overflow-x-auto px-4 py-1 sm:scroll-px-0 [scrollbar-width:none] sm:mx-0 sm:px-0">
          {rest.map((p, i) => card(p.item, i + 1, p.km))}
        </div>
      )}
    </div>
  )
}

function EventMonths({
  title,
  icon,
  items,
  card,
  empty,
}: {
  title: string
  icon: LucideIcon
  items: { item: CommunityEvent; km?: number }[]
  card: (e: CommunityEvent, i: number, km?: number) => ReactNode
  empty: string
}) {
  const km = new Map(items.map(i => [i.item.id, i.km]))
  const months = eventsByMonth([...items.map(i => i.item)].sort((a, b) => a.start.localeCompare(b.start)))
  return (
    <Section title={title} icon={icon} hue={topicHue('events')}>
      {months.length === 0 ? (
        <Empty>{empty}</Empty>
      ) : (
        <div className="space-y-6">
          {months.map(m => (
            <div key={m.key} className="space-y-2.5">
              <h3 className="flex items-center gap-3 text-xs font-bold uppercase tracking-[0.14em] text-muted-foreground">
                {m.label}
                <span className="h-px flex-1 bg-border" aria-hidden />
                <span className="tabular-nums normal-case tracking-normal">{m.events.length}</span>
              </h3>
              <div className="grid grid-cols-1 gap-3 md:grid-cols-2">{m.events.map((e, i) => card(e, i, km.get(e.id)))}</div>
            </div>
          ))}
        </div>
      )}
    </Section>
  )
}
