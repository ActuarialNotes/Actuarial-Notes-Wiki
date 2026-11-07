import { describe, expect, it } from 'vitest'
import { readFileSync, readdirSync } from 'node:fs'
import { resolve } from 'node:path'
import {
  PODCAST_BRIDGES,
  chapterIndexAt,
  clipAudioFile,
  clockLabel,
  episodeChapters,
  episodeFacts,
  episodeMinutesLabel,
  isCurrentClip,
  joinClips,
  parsePodcastIndex,
  planEpisode,
  podcastBaseUrl,
  podcastClipKey,
  podcastIndexFile,
  PODCAST_AUDIO_FORMAT,
  podcastSlug,
  scriptHash,
  type PodcastClip,
} from './podcast'
import {
  briefScript,
  buildScriptHashes,
  firstTrapMarkdown,
  ideaMarkdown,
  openingUnits,
  refresherScript,
  stripFootnotes,
} from './podcastScripts'
import { EPISODE_CLIPS } from './podcast.fixtures'

const PAGE = `---
verification:
  status: unverified
---

**Pure Premium** is the expected loss per exposure unit, $L / E$.

> $$\\text{Pure Premium} = \\frac{\\text{Losses}}{\\text{Exposures}}$$

> $$= \\text{Frequency} \\times \\text{Severity}$$

> $$\\text{Third} = 3$$

- It excludes expenses and profit.
- See also [[Loss Ratio]]

![[Media/Figures/Pure_Premium.svg|340]]

> [!idea] The idea
> Losses are counted, then averaged.
>
> > [!example]- Nested
> > Not read.

## Details

More text.

> [!warning]- Exam traps
> - **Exposure base:** Divide by exposures, not policies.
> - Second trap.
`

describe('the concept scripts', () => {
  it('cuts the opening at the first figure, heading or callout', () => {
    const units = openingUnits(PAGE)
    expect(units.map(u => u.kind)).toEqual(['paragraph', 'formula', 'formula', 'formula', 'bullet', 'bullet'])
  })

  it('reads the definition, two formulas, The idea and the first trap — nothing after a formula left out', () => {
    const script = briefScript('Pure Premium', PAGE)!
    const lines = script.split('\n')
    expect(lines[0]).toBe('Pure Premium.')
    expect(lines[1]).toMatch(/^Pure Premium is the expected loss per exposure unit, L over E/)
    expect(script).toContain('Frequency times Severity')
    expect(script).not.toContain('Third')
    // The bullets come after the third formula, which was left out.
    expect(script).not.toContain('excludes expenses')
    expect(script).toContain('The idea.\nLosses are counted, then averaged.')
    expect(script).not.toContain('Not read')
    expect(script).toContain('One exam trap.\nExposure base: Divide by exposures, not policies.')
    expect(script).not.toContain('Second trap')
  })

  it('reads opening bullets, skipping a "See also" pointer', () => {
    const page = PAGE.replace('> $$\\text{Third} = 3$$\n\n', '')
    const script = briefScript('Pure Premium', page)!
    expect(script).toContain('It excludes expenses and profit.')
    expect(script).not.toMatch(/see also/i)
  })

  it('a refresher is the name and the definition paragraph alone', () => {
    expect(refresherScript('Pure Premium', PAGE)).toBe(
      'Pure Premium.\nPure Premium is the expected loss per exposure unit, L over E .',
    )
  })

  it('drops Obsidian footnotes', () => {
    expect(stripFootnotes('A claim.^[ [Source](https://x.org/a_(b))] More.')).toBe('A claim. More.')
    expect(stripFootnotes('Cut.^[[Unclosed](https://x')).toBe('Cut.')
    expect(stripFootnotes('Ref[^1] here.')).toBe('Ref here.')
  })

  it('finds The idea and the first trap, or nothing', () => {
    expect(ideaMarkdown(PAGE)).toBe('Losses are counted, then averaged.')
    expect(firstTrapMarkdown(PAGE)).toBe('**Exposure base:** Divide by exposures, not policies.')
    expect(ideaMarkdown('Just text.')).toBeNull()
    expect(firstTrapMarkdown('> [!trap] Mix read as trend\n> A fall that is mix.')).toBe('**Mix read as trend:** A fall that is mix.')
  })

  it('a page with no opening has no script', () => {
    expect(briefScript('X', '## Heading\n\nText')).toBeNull()
    expect(refresherScript('X', '> [!note] Only a callout')).toBeNull()
  })

  it('hashes every page by slug, and a changed page changes its hash', () => {
    const before = buildScriptHashes([{ name: 'Pure Premium', markdown: PAGE }])
    const after = buildScriptHashes([{ name: 'Pure Premium', markdown: PAGE.replace('expected loss', 'expected losses') }])
    expect(Object.keys(before)).toEqual(['pure-premium'])
    expect(before['pure-premium'][0]).not.toBe(after['pure-premium'][0])
    // The verification block isn't read, so a re-check alone doesn't re-record.
    const rechecked = buildScriptHashes([{ name: 'Pure Premium', markdown: PAGE.replace('unverified', 'verified') }])
    expect(rechecked).toEqual(before)
  })
})

describe('the recordings index', () => {
  const clip = (h: string, d: number): PodcastClip => ({ h, d, b: d * 8000, a: '', voice: 'af_heart', model: 'kokoro-82m' })

  it('round-trips through the compact file, deriving each audio name', () => {
    const file = podcastIndexFile({ 'brief/pure-premium': clip('abc', 70), 'bridge/intro': clip('def', 5) })
    expect(file.voices).toEqual([['af_heart', 'kokoro-82m']])
    const parsed = parsePodcastIndex(JSON.parse(JSON.stringify(file)))!
    expect(parsed['brief/pure-premium']).toEqual({
      h: 'abc', d: 70, b: 560000, a: 'brief/pure-premium-abc-af-heart-32k.mp3', voice: 'af_heart', model: 'kokoro-82m',
    })
  })

  it('drops anything malformed rather than trusting it', () => {
    expect(parsePodcastIndex(null)).toBeNull()
    expect(parsePodcastIndex({ v: 2, format: PODCAST_AUDIO_FORMAT, voices: [], clips: {} })).toBeNull()
    // An index in another encoding names files that can't be joined with these.
    expect(parsePodcastIndex({ v: 1, voices: [['af_heart', 'kokoro-82m']], clips: { 'brief/ok': ['abc', 1, 1, 0] } })).toBeNull()
    expect(parsePodcastIndex({ v: 1, format: 'mp3-44k-64k', voices: [], clips: {} })).toBeNull()
    const parsed = parsePodcastIndex({
      v: 1,
      format: PODCAST_AUDIO_FORMAT,
      voices: [['af_heart', 'kokoro-82m']],
      clips: {
        '../etc/passwd': ['abc', 1, 1, 0],
        'brief/ok': ['abc', 1, 1, 0],
        'brief/no-length': ['abc', 0, 1, 0],
        'brief/bad-hash': ['a/b', 1, 1, 0],
        'brief/no-voice': ['abc', 1, 1, 3],
      },
    })!
    expect(Object.keys(parsed)).toEqual(['brief/ok'])
  })

  it('names audio by key, hash and voice', () => {
    expect(clipAudioFile('brief/x', 'h1', 'af_heart')).toBe('brief/x-h1-af-heart-32k.mp3')
  })

  it('a clip is current only when made from the script the vault has now', () => {
    const scripts = { 'pure-premium': ['b1', 'r1'] as [string, string] }
    expect(isCurrentClip('brief/pure-premium', 'b1', scripts)).toBe(true)
    expect(isCurrentClip('brief/pure-premium', 'old', scripts)).toBe(false)
    expect(isCurrentClip('refresher/pure-premium', 'r1', scripts)).toBe(true)
    expect(isCurrentClip('brief/unknown', 'b1', scripts)).toBe(false)
    expect(isCurrentClip('bridge/intro', scriptHash(PODCAST_BRIDGES.intro), scripts)).toBe(true)
    expect(isCurrentClip('bridge/intro', 'stale', scripts)).toBe(false)
  })
})

describe('planning an episode', () => {
  it('intro, today\'s concepts, the refreshers behind their bridge, outro', () => {
    const plan = planEpisode(['A', 'B', 'Missing'], ['D', 'E', 'A'], 'on_track', EPISODE_CLIPS)
    expect(plan.entries.map(e => e.key)).toEqual([
      'bridge/intro', 'brief/a', 'brief/b', 'bridge/refreshers', 'refresher/d', 'refresher/e', 'bridge/outro',
    ])
    expect(plan.seconds).toBe(6 + 80 + 90 + 4 + 20 + 25 + 7)
    expect(plan.concepts).toBe(4)
    expect(plan.unread).toEqual(['Missing'])
  })

  it('review mode reads only the refreshers, with no bridge before them', () => {
    const plan = planEpisode(['A'], ['D'], 'review_mode', EPISODE_CLIPS)
    expect(plan.entries.map(e => e.key)).toEqual(['bridge/intro', 'refresher/d', 'bridge/outro'])
  })

  it('nothing recorded is no episode', () => {
    expect(planEpisode(['Missing'], [], 'on_track', EPISODE_CLIPS)).toEqual({ entries: [], seconds: 0, unread: ['Missing'], concepts: 0 })
  })

  it('a stale recording is left out', () => {
    const plan = planEpisode(['A', 'B'], [], 'on_track', EPISODE_CLIPS, (key, h) => key !== 'brief/a' || h === 'new')
    expect(plan.entries.map(e => e.key)).toEqual(['bridge/intro', 'brief/b', 'bridge/outro'])
    expect(plan.unread).toEqual(['A'])
  })

  it('stops adding concepts at 15 minutes but always reads one', () => {
    const clips: Record<string, { d: number; h: string }> = { ...EPISODE_CLIPS }
    const names = Array.from({ length: 12 }, (_, i) => `Long ${i}`)
    for (const n of names) clips[podcastClipKey('brief', n)] = { d: 200, h: 'x' }
    const plan = planEpisode(names, ['D'], 'on_track', clips)
    expect(plan.seconds).toBeLessThanOrEqual(15 * 60)
    expect(plan.entries.filter(e => e.kind === 'brief')).toHaveLength(4)
    expect(plan.unread).toContain('Long 11')
    // A short refresher still fits under the 15 minutes.
    expect(plan.entries.map(e => e.key)).toContain('refresher/d')
    const one = planEpisode(['Huge'], [], 'on_track', { 'brief/huge': { d: 2000, h: 'x' } })
    expect(one.concepts).toBe(1)
  })

  it('reads at most 12 of today\'s concepts and 5 refreshers', () => {
    const clips: Record<string, { d: number; h: string }> = {}
    const today = Array.from({ length: 14 }, (_, i) => `T${i}`)
    const review = Array.from({ length: 7 }, (_, i) => `R${i}`)
    for (const n of today) clips[podcastClipKey('brief', n)] = { d: 10, h: 'x' }
    for (const n of review) clips[podcastClipKey('refresher', n)] = { d: 5, h: 'x' }
    const plan = planEpisode(today, review, 'on_track', clips)
    expect(plan.entries.filter(e => e.kind === 'brief')).toHaveLength(12)
    expect(plan.entries.filter(e => e.kind === 'refresher')).toHaveLength(5)
    expect(plan.unread).toEqual(['T12', 'T13', 'R5', 'R6'])
  })

  it('slugs and keys match Listen recordings', () => {
    expect(podcastSlug("Bayes' Theorem")).toBe('bayes-theorem')
    expect(podcastClipKey('brief', 'Loss Ratio')).toBe('brief/loss-ratio')
  })
})

describe('playing it', () => {
  it('lays the chapters end to end and finds the one playing', () => {
    const chapters = episodeChapters([
      { kind: 'bridge', name: 'intro', key: 'bridge/intro', seconds: 5 },
      { kind: 'brief', name: 'A', key: 'brief/a', seconds: 60 },
    ])
    expect(chapters).toEqual([
      { kind: 'bridge', name: 'intro', start: 0, end: 5 },
      { kind: 'brief', name: 'A', start: 5, end: 65 },
    ])
    expect(chapterIndexAt(chapters, 0)).toBe(0)
    expect(chapterIndexAt(chapters, 5)).toBe(1)
    expect(chapterIndexAt(chapters, 999)).toBe(1)
    expect(chapterIndexAt([], 1)).toBe(-1)
  })

  it('joins clips byte for byte', () => {
    const a = new Uint8Array([1, 2]).buffer
    const b = new Uint8Array([3]).buffer
    expect(Array.from(joinClips([a, b]))).toEqual([1, 2, 3])
  })

  it('labels', () => {
    expect(episodeMinutesLabel(20)).toBe('1 min')
    expect(episodeMinutesLabel(601)).toBe('11 min')
    expect(clockLabel(187.9)).toBe('3:07')
  })

  it('serves from the bucket, or an override', () => {
    expect(podcastBaseUrl({ VITE_SUPABASE_URL: 'https://x.supabase.co/' })).toBe('https://x.supabase.co/storage/v1/object/public/podcast')
    expect(podcastBaseUrl({ VITE_PODCAST_BASE_URL: '/podcast/', VITE_SUPABASE_URL: 'https://x' })).toBe('/podcast')
    expect(podcastBaseUrl({})).toBe('/podcast')
  })

  it('the facts the audio can\'t say', () => {
    expect(episodeFacts({ dayNumber: 23, totalDays: 60, daysRemaining: 41, status: 'on_track' }))
      .toEqual(['Day 23 of 60', '41 days to go', 'On track'])
    expect(episodeFacts({ daysRemaining: 1, status: 'behind' })).toEqual(['1 day to go', 'Behind schedule'])
  })
})

describe('over the real vault', () => {
  const dir = resolve(__dirname, '../../../Concepts')
  const pages = readdirSync(dir).filter(f => f.endsWith('.md'))
    .map(f => ({ name: f.slice(0, -3), markdown: readFileSync(resolve(dir, f), 'utf8') }))

  it('nearly every concept page has a brief, and a brief is a minute or two', () => {
    const words: number[] = []
    let none = 0
    for (const { name, markdown } of pages) {
      const brief = briefScript(name, markdown)
      if (!brief) { none++; continue }
      words.push(brief.split(/\s+/).length)
    }
    expect(none / pages.length).toBeLessThan(0.03)
    words.sort((a, b) => a - b)
    const median = words[words.length >> 1]
    expect(median).toBeGreaterThan(80)
    expect(median).toBeLessThan(260)
    expect(words[words.length - 1]).toBeLessThan(600)
  })

  it('no slug is shared by two pages', () => {
    const slugs = pages.map(p => podcastSlug(p.name))
    expect(new Set(slugs).size).toBe(slugs.length)
  })

  it('no script carries markdown or LaTeX through to the voice', () => {
    for (const { name, markdown } of pages) {
      const brief = briefScript(name, markdown)
      if (!brief) continue
      expect(brief, name).not.toMatch(/\[\[|\]\]|\$|\\[a-z]+\{|\*\*/)
    }
  })
})
