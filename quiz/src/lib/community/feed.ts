// The client half of the Community tab's discussion feed
// (docs/community.md): reads what `quiz/api/community-feed.js` returns,
// refuses anything malformed, and tags each post with its topics.
//
// The endpoint has already dropped removed, deleted and NSFW posts; this
// module is the second check, because a response is still someone else's
// JSON by the time it reaches the page. A post's words are kept exactly as
// they came — tagging reads them, it never rewrites them.

import { inAnyTopic, inTopic, topicsFor, type TopicId } from './topics'

export type FeedSource = 'reddit'

export interface CommunityPost {
  id: string
  source: FeedSource
  title: string
  author: string | null
  createdAt: Date
  url: string
  comments: number
  score: number
  flair: string | null
  excerpt: string | null
  topics: TopicId[]
}

export interface CommunityFeed {
  posts: CommunityPost[]
  asOf: Date | null
}

export const FEED_ENDPOINT = '/api/community-feed'

/** Where each source is, for the line under a post and the "more on" link. */
export const FEED_SOURCES: Record<FeedSource, { name: string; home: string; logo: string }> = {
  reddit: { name: 'r/actuary', home: 'https://www.reddit.com/r/actuary/', logo: '/review-sources/reddit.png' },
}

function isRedditPostUrl(raw: unknown): raw is string {
  if (typeof raw !== 'string') return false
  try {
    const url = new URL(raw)
    return url.protocol === 'https:' && url.hostname === 'www.reddit.com' && url.pathname.startsWith('/r/actuary/comments/')
  } catch {
    return false
  }
}

const count = (v: unknown) => (typeof v === 'number' && Number.isFinite(v) && v >= 0 ? Math.round(v) : 0)
const text = (v: unknown) => (typeof v === 'string' && v.trim() ? v.trim() : null)

/** One post off the wire, or null when it isn't one. */
export function parsePost(raw: unknown): CommunityPost | null {
  if (!raw || typeof raw !== 'object') return null
  const r = raw as Record<string, unknown>
  if (r.source !== 'reddit') return null
  const id = text(r.id)
  const title = text(r.title)
  if (!id || !title || !isRedditPostUrl(r.url)) return null
  const createdAt = typeof r.createdAt === 'string' ? new Date(r.createdAt) : null
  if (!createdAt || Number.isNaN(createdAt.getTime())) return null
  const excerpt = text(r.excerpt)
  return {
    id,
    source: 'reddit',
    title,
    author: text(r.author),
    createdAt,
    url: r.url,
    comments: count(r.comments),
    score: count(r.score),
    flair: text(r.flair),
    excerpt,
    topics: topicsFor(`${title}\n${text(r.flair) ?? ''}\n${excerpt ?? ''}`),
  }
}

/** The endpoint's answer as a feed, newest first, one post per id. */
export function parseFeed(payload: unknown): CommunityFeed {
  if (!payload || typeof payload !== 'object') return { posts: [], asOf: null }
  const p = payload as Record<string, unknown>
  const seen = new Set<string>()
  const posts: CommunityPost[] = []
  for (const raw of Array.isArray(p.posts) ? p.posts : []) {
    const post = parsePost(raw)
    if (!post || seen.has(post.id)) continue
    seen.add(post.id)
    posts.push(post)
  }
  posts.sort((a, b) => b.createdAt.getTime() - a.createdAt.getTime())
  const asOf = typeof p.asOf === 'string' ? new Date(p.asOf) : null
  return { posts, asOf: asOf && !Number.isNaN(asOf.getTime()) ? asOf : null }
}

/** The posts under one topic, or every post for `null`. */
export function postsInTopic(posts: readonly CommunityPost[], topic: TopicId | null): CommunityPost[] {
  return topic ? posts.filter(p => inTopic(p.topics, topic)) : [...posts]
}

/** The For You feed: posts in any followed topic. Empty when nothing is followed. */
export function postsForYou(posts: readonly CommunityPost[], followed: readonly TopicId[]): CommunityPost[] {
  return posts.filter(p => inAnyTopic(p.topics, followed))
}

/** Posts whose title, flair or excerpt carry every word of the query. */
export function searchPosts(posts: readonly CommunityPost[], query: string): CommunityPost[] {
  const words = query.toLowerCase().split(/\s+/).filter(Boolean)
  if (!words.length) return [...posts]
  return posts.filter(p => {
    const hay = `${p.title} ${p.flair ?? ''} ${p.excerpt ?? ''}`.toLowerCase()
    return words.every(w => hay.includes(w))
  })
}

/** "5m", "3h", "2d" — how long ago, the way a feed says it. Dates past a week print as "Oct 3". */
export function agoLabel(at: Date, now: Date): string {
  const seconds = Math.max(0, Math.round((now.getTime() - at.getTime()) / 1000))
  if (seconds < 60) return 'now'
  const minutes = Math.floor(seconds / 60)
  if (minutes < 60) return `${minutes}m`
  const hours = Math.floor(minutes / 60)
  if (hours < 24) return `${hours}h`
  const days = Math.floor(hours / 24)
  if (days < 7) return `${days}d`
  return at.toLocaleDateString('en-US', { month: 'short', day: 'numeric', timeZone: 'UTC' })
}
