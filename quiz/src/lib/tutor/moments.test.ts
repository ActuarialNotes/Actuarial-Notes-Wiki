import { describe, expect, it } from 'vitest'
import { foldLog, type TutorEvent } from './log'
import { nextOffer, type MomentInput } from './moments'

const now = new Date(2026, 2, 1, 12, 0, 0)
const ago = (minutes: number) => new Date(now.getTime() - minutes * 60_000).toISOString()

function input(events: TutorEvent[], extra: Partial<MomentInput> = {}): MomentInput {
  return {
    now,
    model: foldLog(events, new Map(), now),
    quiet: false,
    blocked: false,
    busy: false,
    leftPage: null,
    servable: () => true,
    ...extra,
  }
}

const read = { concept: 'Cape Cod Method', seconds: 75 }

describe('after reading (M1)', () => {
  it('offers a check on a page read long enough and now out of sight', () => {
    expect(nextOffer(input([], { leftPage: read }))).toEqual({ kind: 'post-read', concept: 'Cape Cod Method' })
  })

  it('does not for a glance, a concept with nothing to serve, or one checked today', () => {
    expect(nextOffer(input([], { leftPage: { ...read, seconds: 12 } }))).toBeNull()
    expect(nextOffer(input([], { leftPage: read, servable: () => false }))).toBeNull()
    const checked: TutorEvent = { t: 'answer', at: ago(120), item: 'q', question: 'q', concepts: ['Cape Cod Method'], kind: 'calculation', points: 1, difficulty: 'medium', grade: 'correct', confidence: 'sure', seconds: 60 }
    expect(nextOffer(input([checked], { leftPage: read }))).toBeNull()
  })
})

describe('the quiet rules', () => {
  it('make no offer while quiet, blocked or busy', () => {
    expect(nextOffer(input([], { leftPage: read, quiet: true }))).toBeNull()
    expect(nextOffer(input([], { leftPage: read, blocked: true }))).toBeNull()
    expect(nextOffer(input([], { leftPage: read, busy: true }))).toBeNull()
  })

  it('keep bubbles three minutes apart', () => {
    const shown: TutorEvent = { t: 'offer', at: ago(4), kind: 'arrival', response: 'shown' }
    expect(nextOffer(input([shown], { leftPage: read }))).toMatchObject({ kind: 'post-read' })
    const justNow: TutorEvent = { t: 'offer', at: ago(1), kind: 'arrival', response: 'shown' }
    expect(nextOffer(input([justNow], { leftPage: read }))).toBeNull()
  })

  it('stop offering a kind declined twice today', () => {
    const declined: TutorEvent[] = [
      { t: 'offer', at: ago(60), kind: 'post-read', response: 'shown' },
      { t: 'offer', at: ago(59), kind: 'post-read', response: 'declined' },
      { t: 'offer', at: ago(30), kind: 'post-read', response: 'shown' },
      { t: 'offer', at: ago(29), kind: 'post-read', response: 'declined' },
    ]
    expect(nextOffer(input(declined, { leftPage: read }))).toBeNull()
  })
})
