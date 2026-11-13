import { describe, expect, it } from 'vitest'
// @ts-expect-error — a plain .mjs script with no types
import { planPrune } from '../../scripts/podcast-segments.mjs'

const HOUR = 3_600_000
const now = Date.parse('2026-11-13T12:00:00Z')

describe('planPrune', () => {
  const live = new Set(['brief/a-1-af-heart.mp3'])

  it('never touches a clip the index names', () => {
    const out = planPrune(['brief/a-1-af-heart.mp3'], live, { 'brief/a-1-af-heart.mp3': '2020-01-01T00:00:00Z' }, now, 24 * HOUR)
    expect(out).toEqual({ remove: [], retired: {} })
  })

  it('marks an unlisted clip the first time it is seen, without deleting it', () => {
    const out = planPrune(['brief/a-0-af-heart.mp3'], live, null, now, 24 * HOUR)
    expect(out.remove).toEqual([])
    expect(out.retired).toEqual({ 'brief/a-0-af-heart.mp3': new Date(now).toISOString() })
  })

  it('deletes a marked clip only once the grace period has passed', () => {
    const files = ['brief/old-af-heart.mp3', 'brief/recent-af-heart.mp3']
    const retired = {
      'brief/old-af-heart.mp3': new Date(now - 25 * HOUR).toISOString(),
      'brief/recent-af-heart.mp3': new Date(now - 2 * HOUR).toISOString(),
    }
    const out = planPrune(files, live, retired, now, 24 * HOUR)
    expect(out.remove).toEqual(['brief/old-af-heart.mp3'])
    expect(out.retired).toEqual({ 'brief/recent-af-heart.mp3': retired['brief/recent-af-heart.mp3'] })
  })

  it('drops marks for files that are gone', () => {
    const out = planPrune([], live, { 'brief/gone-af-heart.mp3': new Date(now).toISOString() }, now, 24 * HOUR)
    expect(out).toEqual({ remove: [], retired: {} })
  })
})
