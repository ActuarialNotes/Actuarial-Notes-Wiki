// Vercel serverless function — the Community tab's "what actuaries are saying"
// feed: the newest posts on r/actuary, read through the Arctic Shift archive.
//
//   GET /api/community-feed
//   → { posts: [{ id, source, title, author, createdAt, url, comments, score,
//                 flair, excerpt }], asOf }
//   → { posts: [], asOf }   when the archive can't be read
//
// Why the archive and not Reddit: Reddit answers server-side JSON requests from
// cloud hosts with a 403, and Arctic Shift keeps each post's text exactly as it
// was posted — the same source the Store's reviews are read through
// (docs/store.md). Why a function at all: neither sends CORS headers a page on
// our origin could use, and a CDN entry here means one fetch per quarter hour
// rather than one per reader.
//
// The rule the rest of the app keeps holds here too: **transcribed, never
// constructed.** A post's title, author, flair and counts are passed through as
// the archive states them; the excerpt is the start of its own text, cut only
// at a word with an ellipsis. Nothing is summarised or reworded, and a post the
// archive marks removed, deleted or NSFW is dropped rather than shown in part.
// Which *topics* a post is about is the client's business (lib/community/topics.ts).

const ARCHIVE = 'https://arctic-shift.photon-reddit.com/api/posts/search'
const SUBREDDIT = 'actuary'
const LIMIT = 100
const FETCH_TIMEOUT_MS = 8000
const EXCERPT_CHARS = 280

// A quarter hour at the edge; a failure only briefly, so a hiccup at the
// archive doesn't blank the feed for the rest of the window.
const CACHE_FOUND = 'public, max-age=0, s-maxage=900, stale-while-revalidate=3600'
const CACHE_FAILED = 'public, max-age=0, s-maxage=60'

/** The start of a post's own text, cut at a word, or null when it has none worth showing. */
export function excerptOf(selftext) {
  if (typeof selftext !== 'string') return null
  const text = selftext
    .replace(/&amp;/g, '&')
    .replace(/&lt;/g, '<')
    .replace(/&gt;/g, '>')
    .replace(/&#x200B;/gi, '')
    .replace(/\s+/g, ' ')
    .trim()
  if (!text || text === '[removed]' || text === '[deleted]') return null
  if (text.length <= EXCERPT_CHARS) return text
  const cut = text.slice(0, EXCERPT_CHARS)
  const lastSpace = cut.lastIndexOf(' ')
  return `${(lastSpace > EXCERPT_CHARS * 0.6 ? cut.slice(0, lastSpace) : cut).replace(/[\s,;:.–—-]+$/, '')}…`
}

function decodeTitle(title) {
  return title.replace(/&amp;/g, '&').replace(/&lt;/g, '<').replace(/&gt;/g, '>').trim()
}

/**
 * One archive record as a feed post, or null when it isn't one to show: no
 * title, no permalink into the subreddit, no timestamp, or removed / deleted /
 * NSFW. Field by field — the archive is someone else's JSON.
 */
export function postFromRecord(record) {
  if (!record || typeof record !== 'object') return null
  const { id, title, author, created_utc: created, permalink } = record
  if (typeof id !== 'string' || !/^[a-z0-9]+$/i.test(id)) return null
  if (typeof title !== 'string' || !title.trim()) return null
  if (typeof permalink !== 'string' || !permalink.startsWith(`/r/${SUBREDDIT}/comments/`)) return null
  if (typeof created !== 'number' || !Number.isFinite(created) || created <= 0) return null
  if (record.over_18 === true) return null
  if (record.removed_by_category) return null
  if (author === '[deleted]') return null
  if (record.selftext === '[removed]' || record.selftext === '[deleted]') return null

  const count = v => (typeof v === 'number' && Number.isFinite(v) && v >= 0 ? Math.round(v) : 0)
  return {
    id,
    source: 'reddit',
    title: decodeTitle(title),
    author: typeof author === 'string' && author ? author : null,
    createdAt: new Date(created * 1000).toISOString(),
    url: `https://www.reddit.com${permalink}`,
    comments: count(record.num_comments),
    score: count(record.score),
    flair: typeof record.link_flair_text === 'string' && record.link_flair_text.trim() ? record.link_flair_text.trim() : null,
    excerpt: excerptOf(record.selftext),
  }
}

/** The archive's answer as posts, newest first, one per id. */
export function postsFromArchive(payload) {
  const records = payload && Array.isArray(payload.data) ? payload.data : []
  const seen = new Set()
  const posts = []
  for (const record of records) {
    const post = postFromRecord(record)
    if (!post || seen.has(post.id)) continue
    seen.add(post.id)
    posts.push(post)
  }
  return posts.sort((a, b) => b.createdAt.localeCompare(a.createdAt))
}

export default async function handler(req, res) {
  if (req.method !== 'GET' && req.method !== 'HEAD') {
    res.setHeader('Allow', 'GET, HEAD')
    return res.status(405).json({ error: 'Method not allowed' })
  }
  const asOf = new Date().toISOString()
  const url = `${ARCHIVE}?subreddit=${SUBREDDIT}&limit=${LIMIT}&sort=desc`
  const controller = new AbortController()
  const timer = setTimeout(() => controller.abort(), FETCH_TIMEOUT_MS)
  try {
    const response = await fetch(url, {
      signal: controller.signal,
      headers: { Accept: 'application/json', 'User-Agent': 'ActuarialNotes-Community/1.0 (+https://quiz.actuarialnotes.com)' },
    })
    if (!response.ok) throw new Error(`archive ${response.status}`)
    const posts = postsFromArchive(await response.json())
    res.setHeader('Cache-Control', posts.length ? CACHE_FOUND : CACHE_FAILED)
    return res.status(200).json({ posts, asOf })
  } catch {
    res.setHeader('Cache-Control', CACHE_FAILED)
    return res.status(200).json({ posts: [], asOf })
  } finally {
    clearTimeout(timer)
  }
}
