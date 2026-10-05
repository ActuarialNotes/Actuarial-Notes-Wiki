import { describe, expect, it } from 'vitest'
import {
  ALPHA_MIN,
  MAX_ZOOM,
  MIN_ZOOM,
  anyOverlap,
  bodyAt,
  cardSize,
  cool,
  edgeToBox,
  fitView,
  makeBody,
  seedPositions,
  separate,
  spawnPoint,
  step,
  tagSize,
  toScreen,
  toWorld,
  zoomAt,
  type Body,
  type Spring,
} from './craftLayout'

function settle(bodies: Record<string, Body>, springs: Spring[], ticks = 400): void {
  let alpha = 1
  for (let i = 0; i < ticks && alpha > 0; i++) {
    step(bodies, springs, alpha)
    alpha = cool(alpha)
  }
}

describe('sizes', () => {
  it('grows a card with its name and wraps a long one to two lines', () => {
    expect(cardSize('IBNR').w).toBeLessThan(cardSize('Loss Ratio Method').w)
    expect(cardSize('IBNR').h).toBe(38)
    expect(cardSize('Bornhuetter-Ferguson Method').h).toBe(52)
    expect(cardSize('Bornhuetter-Ferguson Method').w).toBeLessThanOrEqual(176)
  })

  it('sizes a relation tag to its label', () => {
    expect(tagSize('Credibility-weighted with').w).toBeGreaterThan(tagSize('Less').w)
  })
})

describe('step', () => {
  it('pushes stacked cards apart until none overlap', () => {
    const bodies: Record<string, Body> = {}
    for (let i = 0; i < 12; i++) bodies[`n${i}`] = makeBody({ x: 0, y: 0 }, cardSize('Some Concept'))
    settle(bodies, [])
    expect(anyOverlap(Object.values(bodies))).toBe(false)
  })

  it('draws a recipe’s three cards in around their tag', () => {
    const bodies: Record<string, Body> = {
      a: makeBody({ x: -600, y: 0 }, cardSize('Paid Losses')),
      b: makeBody({ x: 600, y: 0 }, cardSize('Case Reserves')),
      j: makeBody({ x: 0, y: 0 }, tagSize('Added to')),
      c: makeBody({ x: 0, y: 500 }, cardSize('Incurred Losses')),
    }
    const springs: Spring[] = [
      { a: 'a', b: 'j', length: 110 },
      { a: 'b', b: 'j', length: 110 },
      { a: 'j', b: 'c', length: 90 },
    ]
    settle(bodies, springs)
    const d = (p: string) => Math.hypot(bodies[p].x - bodies.j.x, bodies[p].y - bodies.j.y)
    expect(d('a')).toBeLessThan(260)
    expect(d('b')).toBeLessThan(260)
    expect(d('c')).toBeLessThan(260)
    expect(anyOverlap(Object.values(bodies))).toBe(false)
  })

  it('hangs a result below the tag that made it', () => {
    const bodies: Record<string, Body> = {
      j: { ...makeBody({ x: 0, y: 0 }, tagSize('Added to')), pinned: true },
      c: makeBody({ x: 300, y: -200 }, cardSize('Incurred Losses')),
    }
    settle(bodies, [{ a: 'j', b: 'c', length: 90, below: true }])
    expect(Math.abs(bodies.c.x)).toBeLessThan(20)
    expect(bodies.c.y).toBeGreaterThan(60)
  })

  it('holds a body with a row to that row, and sorts a board into rows', () => {
    const bodies: Record<string, Body> = {}
    for (let i = 0; i < 6; i++) bodies[`n${i}`] = { ...makeBody({ x: i * 10, y: 400 - i * 50 }, cardSize('Some Concept')), row: (i % 3) * 150 }
    settle(bodies, [])
    for (let i = 0; i < 6; i++) expect(Math.abs(bodies[`n${i}`].y - (i % 3) * 150)).toBeLessThan(25)
    expect(anyOverlap(Object.values(bodies))).toBe(false)
  })

  it('never moves a pinned body', () => {
    const bodies: Record<string, Body> = {
      held: { ...makeBody({ x: 10, y: 20 }, cardSize('Held')), pinned: true },
      other: makeBody({ x: 12, y: 22 }, cardSize('Other')),
    }
    settle(bodies, [{ a: 'held', b: 'other', length: 300 }])
    expect(bodies.held).toMatchObject({ x: 10, y: 20 })
    expect(anyOverlap(Object.values(bodies))).toBe(false)
  })

  it('is deterministic', () => {
    const make = () => {
      const bodies: Record<string, Body> = {}
      seedPositions(5).forEach((p, i) => { bodies[`n${i}`] = makeBody(p, cardSize(`Concept ${i}`)) })
      settle(bodies, [{ a: 'n0', b: 'n1', length: 120 }])
      return Object.values(bodies).map(b => [Math.round(b.x), Math.round(b.y)])
    }
    expect(make()).toEqual(make())
  })
})

describe('a ghost', () => {
  it('passes over the others without pushing them or being pulled', () => {
    const ghost = { ...makeBody({ x: 0, y: 0 }, { w: 100, h: 40 }), pinned: true, ghost: true }
    const under = makeBody({ x: 5, y: 0 }, { w: 100, h: 40 })
    const bodies = { ghost, under }
    step(bodies, [{ a: 'ghost', b: 'under', length: 400 }], 1)
    // Gravity alone moves the card under it — toward the origin, not away from the ghost.
    expect(Math.abs(under.x)).toBeLessThan(5)
  })
})

describe('separate', () => {
  it('moves only the free body when one is pinned', () => {
    const pinned = { ...makeBody({ x: 0, y: 0 }, { w: 100, h: 40 }), pinned: true }
    const free = makeBody({ x: 10, y: 0 }, { w: 100, h: 40 })
    separate([pinned, free])
    expect(pinned.x).toBe(0)
    expect(Math.abs(free.y) > 0 || Math.abs(free.x) > 10).toBe(true)
  })
})

describe('seedPositions', () => {
  it('lays the primitives along the top row, centred', () => {
    const seeds = seedPositions(3)
    expect(seeds.map(p => p.y)).toEqual([0, 0, 0])
    expect(seeds[0].x + seeds[2].x).toBe(0)
    expect(seeds[1].x).toBe(0)
  })
})

describe('cool', () => {
  it('decays and then stops', () => {
    expect(cool(1)).toBeLessThan(1)
    expect(cool(ALPHA_MIN)).toBe(0)
  })
})

describe('spawnPoint', () => {
  it('lands off the pair’s midpoint, below it', () => {
    const p = spawnPoint({ x: -100, y: 0 }, { x: 100, y: 0 })
    expect(p.x).toBeCloseTo(0)
    expect(p.y).toBeGreaterThan(50)
    // The order of the ingredients doesn't flip it above.
    expect(spawnPoint({ x: 100, y: 0 }, { x: -100, y: 0 }).y).toBeGreaterThan(50)
  })

  it('still lands somewhere when the ingredients share a spot', () => {
    expect(spawnPoint({ x: 5, y: 5 }, { x: 5, y: 5 })).toEqual({ x: 5, y: 101 })
  })
})

describe('bodyAt', () => {
  const bodies: Record<string, Body> = {
    a: makeBody({ x: 0, y: 0 }, { w: 100, h: 40 }),
    b: makeBody({ x: 300, y: 0 }, { w: 100, h: 40 }),
  }

  it('finds the card under a point, with a little slop, and skips the one being dragged', () => {
    expect(bodyAt(bodies, ['a', 'b'], { x: 55, y: 0 })).toBe('a')
    expect(bodyAt(bodies, ['a', 'b'], { x: 150, y: 0 })).toBeNull()
    expect(bodyAt(bodies, ['a', 'b'], { x: 0, y: 0 }, 'a')).toBeNull()
  })

  it('only looks at the candidates it is given — a tag is never a drop target', () => {
    expect(bodyAt(bodies, ['b'], { x: 0, y: 0 })).toBeNull()
  })
})

describe('the camera', () => {
  it('round-trips between screen and world', () => {
    const view = { x: 40, y: -20, k: 1.5 }
    const w = toWorld(view, { x: 100, y: 100 })
    expect(toScreen(view, w)).toEqual({ x: 100, y: 100 })
  })

  it('zooms about the pointer and clamps', () => {
    const view = { x: 0, y: 0, k: 1 }
    const at = { x: 200, y: 100 }
    const zoomed = zoomAt(view, at, 1.5)
    expect(toWorld(zoomed, at)).toEqual(toWorld(view, at))
    expect(zoomAt(view, at, 100).k).toBe(MAX_ZOOM)
    expect(zoomAt(view, at, 0.001).k).toBe(MIN_ZOOM)
  })

  it('fits the board in the viewport, never closer than 1:1', () => {
    const bodies = [makeBody({ x: -1000, y: 0 }, { w: 100, h: 40 }), makeBody({ x: 1000, y: 0 }, { w: 100, h: 40 })]
    const view = fitView(bodies, 800, 600)
    expect(view.k).toBeLessThan(1)
    const left = toScreen(view, { x: -1050, y: 0 })
    const right = toScreen(view, { x: 1050, y: 0 })
    expect(left.x).toBeGreaterThanOrEqual(0)
    expect(right.x).toBeLessThanOrEqual(800)
    expect(fitView([makeBody({ x: 0, y: 0 }, { w: 10, h: 10 })], 800, 600).k).toBe(1)
  })

  it('fits inside the room a panel leaves', () => {
    const bodies = [makeBody({ x: 0, y: 0 }, { w: 100, h: 40 })]
    const view = fitView(bodies, 800, 600, 48, { top: 0, right: 0, bottom: 0, left: 300 })
    // Centred in the 500px to the right of the panel, not in the whole 800.
    expect(toScreen(view, { x: 0, y: 0 }).x).toBe(550)
  })
})

describe('edgeToBox', () => {
  it('stops an edge at the edge of the card it points to', () => {
    const box = { x: 0, y: 0, w: 100, h: 40 }
    expect(edgeToBox({ x: -300, y: 0 }, box, 0)).toEqual({ x: -50, y: 0 })
    expect(edgeToBox({ x: 0, y: 200 }, box, 0)).toEqual({ x: 0, y: 20 })
    expect(edgeToBox({ x: 10, y: 5 }, box)).toEqual({ x: 0, y: 0 })
  })
})
