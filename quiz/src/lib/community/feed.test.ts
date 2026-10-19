import { describe, expect, it } from 'vitest'
import { agoLabel, parseFeed, parsePost, postsForYou, postsInTopic, searchPosts } from './feed'

const wire = (over: Record<string, unknown> = {}) => ({
  id: 'abc123',
  source: 'reddit',
  title: 'Passed Exam FM!',
  author: 'someone',
  createdAt: '2026-10-18T12:00:00.000Z',
  url: 'https://www.reddit.com/r/actuary/comments/abc123/passed_exam_fm/',
  comments: 12,
  score: 40,
  flair: 'Exams',
  excerpt: 'Took it twice.',
  ...over,
})

describe('parsePost', () => {
  it('reads a post and tags it', () => {
    const post = parsePost(wire())!
    expect(post.title).toBe('Passed Exam FM!')
    expect(post.createdAt.toISOString()).toBe('2026-10-18T12:00:00.000Z')
    expect(post.topics).toEqual(expect.arrayContaining(['exams', 'exam-fm']))
  })

  it('refuses a link off r/actuary, a missing title or a bad date', () => {
    expect(parsePost(wire({ url: 'https://evil.example/r/actuary/comments/x' }))).toBeNull()
    expect(parsePost(wire({ url: 'https://www.reddit.com/r/other/comments/x' }))).toBeNull()
    expect(parsePost(wire({ url: 'http://www.reddit.com/r/actuary/comments/x' }))).toBeNull()
    expect(parsePost(wire({ title: '  ' }))).toBeNull()
    expect(parsePost(wire({ createdAt: 'yesterday' }))).toBeNull()
    expect(parsePost(wire({ source: 'twitter' }))).toBeNull()
    expect(parsePost(null)).toBeNull()
  })

  it('floors bad counts at zero', () => {
    const post = parsePost(wire({ comments: -3, score: 'lots' }))!
    expect(post.comments).toBe(0)
    expect(post.score).toBe(0)
  })
})

describe('parseFeed', () => {
  it('dedupes and sorts newest first', () => {
    const feed = parseFeed({
      posts: [wire({ id: 'a', createdAt: '2026-10-01T00:00:00Z' }), wire({ id: 'b' }), wire({ id: 'a' }), 'junk'],
      asOf: '2026-10-19T00:00:00Z',
    })
    expect(feed.posts.map(p => p.id)).toEqual(['b', 'a'])
    expect(feed.asOf?.toISOString()).toBe('2026-10-19T00:00:00.000Z')
  })

  it('is empty for anything else', () => {
    expect(parseFeed(null)).toEqual({ posts: [], asOf: null })
    expect(parseFeed({ posts: 'x' }).posts).toEqual([])
  })
})

describe('filters', () => {
  const posts = parseFeed({
    posts: [
      wire({ id: 'a', title: 'Exam P tips', flair: null, excerpt: null }),
      wire({ id: 'b', title: 'Entry level salary', flair: null, excerpt: null }),
      wire({ id: 'c', title: 'Hello', flair: null, excerpt: null }),
    ],
  }).posts

  it('narrows to a topic, parents included', () => {
    expect(postsInTopic(posts, 'exams').map(p => p.id)).toEqual(['a'])
    expect(postsInTopic(posts, null)).toHaveLength(3)
  })

  it('builds For You from the follows, and nothing from none', () => {
    expect(postsForYou(posts, ['careers']).map(p => p.id)).toEqual(['b'])
    expect(postsForYou(posts, [])).toEqual([])
  })

  it('searches every word', () => {
    expect(searchPosts(posts, 'exam tips').map(p => p.id)).toEqual(['a'])
    expect(searchPosts(posts, '  ')).toHaveLength(3)
  })
})

describe('agoLabel', () => {
  const now = new Date('2026-10-19T12:00:00Z')
  it('says how long ago', () => {
    expect(agoLabel(new Date('2026-10-19T11:59:30Z'), now)).toBe('now')
    expect(agoLabel(new Date('2026-10-19T11:15:00Z'), now)).toBe('45m')
    expect(agoLabel(new Date('2026-10-19T02:00:00Z'), now)).toBe('10h')
    expect(agoLabel(new Date('2026-10-16T12:00:00Z'), now)).toBe('3d')
    expect(agoLabel(new Date('2026-10-01T12:00:00Z'), now)).toBe('Oct 1')
  })
})
