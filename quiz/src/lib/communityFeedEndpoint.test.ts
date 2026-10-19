import { afterEach, describe, expect, it, vi } from 'vitest'
// Exercises the serverless handler (quiz/api/community-feed.js) with the
// Arctic Shift archive stubbed. What matters most is the refusals: a post is
// passed through as the archive states it, or not at all.
import handler, { excerptOf, postFromRecord, postsFromArchive } from '../../api/community-feed.js'

function mockRes() {
  const res = {
    statusCode: 0,
    body: undefined as unknown,
    headers: {} as Record<string, string>,
    status(code: number) { res.statusCode = code; return res },
    json(payload: unknown) { res.body = payload; return res },
    setHeader(key: string, value: string) { res.headers[key] = value },
  }
  return res
}

const record = (over: Record<string, unknown> = {}) => ({
  id: '1x9x8fh',
  title: 'Exam P in Feb &amp; are flashcards useful?',
  author: 'someone',
  created_utc: 1792417360,
  permalink: '/r/actuary/comments/1x9x8fh/exam_p_in_feb/',
  num_comments: 4,
  score: 9,
  link_flair_text: 'Exams',
  selftext: 'Short body.',
  over_18: false,
  ...over,
})

afterEach(() => vi.unstubAllGlobals())

describe('postFromRecord', () => {
  it('passes a post through, its title decoded', () => {
    const post = postFromRecord(record())
    expect(post).toMatchObject({
      id: '1x9x8fh',
      source: 'reddit',
      title: 'Exam P in Feb & are flashcards useful?',
      url: 'https://www.reddit.com/r/actuary/comments/1x9x8fh/exam_p_in_feb/',
      comments: 4,
      flair: 'Exams',
      excerpt: 'Short body.',
    })
    expect(post.createdAt).toBe(new Date(1792417360 * 1000).toISOString())
  })

  it('drops removed, deleted, NSFW and foreign posts', () => {
    expect(postFromRecord(record({ removed_by_category: 'moderator' }))).toBeNull()
    expect(postFromRecord(record({ selftext: '[removed]' }))).toBeNull()
    expect(postFromRecord(record({ author: '[deleted]' }))).toBeNull()
    expect(postFromRecord(record({ over_18: true }))).toBeNull()
    expect(postFromRecord(record({ permalink: '/r/other/comments/x/' }))).toBeNull()
    expect(postFromRecord(record({ id: '../x' }))).toBeNull()
    expect(postFromRecord(record({ created_utc: 'soon' }))).toBeNull()
  })

  it('cuts a long body at a word', () => {
    const long = Array.from({ length: 100 }, (_, i) => `word${i}`).join(' ')
    const excerpt = excerptOf(long)!
    expect(excerpt.endsWith('…')).toBe(true)
    expect(excerpt.length).toBeLessThanOrEqual(281)
    expect(long.startsWith(excerpt.slice(0, -1))).toBe(true)
    expect(excerptOf('')).toBeNull()
  })

  it('dedupes and sorts newest first', () => {
    const posts = postsFromArchive({ data: [record({ id: 'a', created_utc: 1 }), record({ id: 'b', created_utc: 2 }), record({ id: 'a' })] })
    expect(posts.map((p: { id: string }) => p.id)).toEqual(['b', 'a'])
  })
})

describe('handler', () => {
  it('serves the archive with a CDN cache', async () => {
    vi.stubGlobal('fetch', vi.fn(async () => ({ ok: true, json: async () => ({ data: [record()] }) })))
    const res = mockRes()
    await handler({ method: 'GET', query: {} }, res)
    expect(res.statusCode).toBe(200)
    expect((res.body as { posts: unknown[] }).posts).toHaveLength(1)
    expect(res.headers['Cache-Control']).toContain('s-maxage=900')
  })

  it('answers an empty feed, briefly cached, when the archive fails', async () => {
    vi.stubGlobal('fetch', vi.fn(async () => ({ ok: false, status: 503 })))
    const res = mockRes()
    await handler({ method: 'GET', query: {} }, res)
    expect((res.body as { posts: unknown[] }).posts).toEqual([])
    expect(res.headers['Cache-Control']).toContain('s-maxage=60')
  })

  it('refuses a POST', async () => {
    const res = mockRes()
    await handler({ method: 'POST', query: {} }, res)
    expect(res.statusCode).toBe(405)
  })
})
