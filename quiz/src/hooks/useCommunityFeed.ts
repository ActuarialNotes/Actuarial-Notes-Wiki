import { useEffect, useState } from 'react'
import { FEED_ENDPOINT, parseFeed, type CommunityFeed } from '@/lib/community/feed'

export type FeedStatus = 'loading' | 'ready' | 'unavailable'

/**
 * The discussion feed (`/api/community-feed`). Fetched once per page view —
 * the endpoint's CDN entry is a quarter hour old at most, so there is nothing
 * to gain from a client cache — and `unavailable` when the archive couldn't be
 * read, which the page says plainly rather than showing an empty feed as if
 * nobody had posted.
 */
export function useCommunityFeed(): CommunityFeed & { status: FeedStatus } {
  const [state, setState] = useState<CommunityFeed & { status: FeedStatus }>({ posts: [], asOf: null, status: 'loading' })
  useEffect(() => {
    const controller = new AbortController()
    fetch(FEED_ENDPOINT, { signal: controller.signal })
      .then(r => (r.ok ? r.json() : null))
      .then(json => {
        const feed = parseFeed(json)
        setState({ ...feed, status: feed.posts.length ? 'ready' : 'unavailable' })
      })
      .catch(() => {
        if (!controller.signal.aborted) setState({ posts: [], asOf: null, status: 'unavailable' })
      })
    return () => controller.abort()
  }, [])
  return state
}
