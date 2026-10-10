import { describe, expect, it } from 'vitest'
import {
  ALPHA_MIN,
  MAX_ZOOM,
  MIN_ZOOM,
  anyOverlap,
  bodyAt,
  cardSize,
  connectionSpring,
  cool,
  edgeToBox,
  fitView,
  lineLabelPoint,
  lineWidth,
  makeBody,
  seedPositions,
  separate,
  spawnBeside,
  spawnNear,
  step,
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

  it('makes a strong connection’s spring shorter and stiffer than a weak one’s', () => {
    const strong = connectionSpring('a', 'b', 90)
    const weak = connectionSpring('a', 'b', 20)
    expect(strong.length).toBeLessThan(weak.length)
    expect(strong.k).toBeGreaterThan(weak.k as number)
    expect(connectionSpring('a', 'b', 500)).toEqual(connectionSpring('a', 'b', 100))
    // The cards' own widths come on top, so even the strongest leaves a gap.
    expect(connectionSpring('a', 'b', 100, 160).length).toBe(connectionSpring('a', 'b', 100).length + 160)
  })
})

describe('step', () => {
  it('pushes stacked cards apart until none overlap', () => {
    const bodies: Record<string, Body> = {}
    for (let i = 0; i < 12; i++) bodies[`n${i}`] = makeBody({ x: 0, y: 0 }, cardSize('Some Concept'))
    settle(bodies, [])
    expect(anyOverlap(Object.values(bodies))).toBe(false)
  })

  it('draws connected cards in, the strongly connected closest', () => {
    const bodies: Record<string, Body> = {
      hub: makeBody({ x: 0, y: 0 }, cardSize('Credibility')),
      near: makeBody({ x: -700, y: 0 }, cardSize('Complement of Credibility')),
      far: makeBody({ x: 700, y: 0 }, cardSize('Homogeneity')),
    }
    // As the board builds them: the cards' half-widths on top of what the strength decides.
    const reach = (x: string, y: string) => (bodies[x].w + bodies[y].w) / 2
    settle(bodies, [connectionSpring('hub', 'near', 95, reach('hub', 'near')), connectionSpring('hub', 'far', 20, reach('hub', 'far'))])
    const d = (p: string) => Math.hypot(bodies[p].x - bodies.hub.x, bodies[p].y - bodies.hub.y)
    expect(d('near')).toBeLessThan(300)
    expect(d('far')).toBeLessThan(400)
    expect(d('near')).toBeLessThan(d('far'))
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
  it('lays a few concepts side by side across the middle, centred', () => {
    const seeds = seedPositions(3)
    expect(seeds.map(p => p.y)).toEqual([0, 0, 0])
    expect(seeds[0].x + seeds[2].x).toBe(0)
    expect(seeds[1].x).toBe(0)
  })

  it('spirals a crowd out from the middle — a disc, not a line', () => {
    const seeds = seedPositions(64)
    const xs = seeds.map(p => p.x)
    const ys = seeds.map(p => p.y)
    const width = Math.max(...xs) - Math.min(...xs)
    const height = Math.max(...ys) - Math.min(...ys)
    expect(width).toBeLessThan(2400)
    expect(height).toBeGreaterThan(width / 3)
    expect(new Set(seeds.map(p => `${p.x},${p.y}`)).size).toBe(64)
  })
})

describe('cool', () => {
  it('decays and then stops', () => {
    expect(cool(1)).toBeLessThan(1)
    expect(cool(ALPHA_MIN)).toBe(0)
  })
})

describe('spawnBeside', () => {
  it('hangs what a pair made off the middle of the pair, away from the middle of the board', () => {
    const p = spawnBeside({ x: -100, y: 300 }, { x: 100, y: 300 }, { x: 0, y: 0 })
    expect(p.x).toBeCloseTo(0)
    expect(p.y).toBeCloseTo(450)
    // The other way round, or above the middle: still away from it.
    expect(spawnBeside({ x: 100, y: 300 }, { x: -100, y: 300 }, { x: 0, y: 0 }).y).toBeCloseTo(450)
    expect(spawnBeside({ x: -100, y: -300 }, { x: 100, y: -300 }, { x: 0, y: 0 }).y).toBeCloseTo(-450)
  })

  it('fans several out along the pair, and copes with a pair on one spot', () => {
    const made = [0, 1, 2].map(i => spawnBeside({ x: -100, y: 300 }, { x: 100, y: 300 }, { x: 0, y: 0 }, i, 3))
    expect(made.map(p => Math.round(p.x))).toEqual([-190, 0, 190])
    expect(spawnBeside({ x: 5, y: 5 }, { x: 5, y: 5 }, { x: 5, y: 5 })).toEqual({ x: 5, y: 155 })
  })
})

describe('spawnNear', () => {
  it('lands on the far side of its card from the middle of the board', () => {
    const p = spawnNear({ x: 200, y: 0 }, { x: 0, y: 0 })
    expect(p.x).toBeGreaterThan(200)
    expect(p.y).toBeCloseTo(0)
  })

  it('turns away from a spot another arrival took, and copes with a card in the middle', () => {
    const a = spawnNear({ x: 200, y: 0 }, { x: 0, y: 0 }, 0)
    const b = spawnNear({ x: 200, y: 0 }, { x: 0, y: 0 }, 1)
    expect(Math.hypot(a.x - b.x, a.y - b.y)).toBeGreaterThan(50)
    const middle = spawnNear({ x: 0, y: 0 }, { x: 0, y: 0 })
    expect(Math.hypot(middle.x, middle.y)).toBeCloseTo(170)
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

  it('only looks at the candidates it is given', () => {
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

describe('edgeToBox and lineLabelPoint', () => {
  it('stops a line at the edge of the card it points to', () => {
    const box = { x: 0, y: 0, w: 100, h: 40 }
    expect(edgeToBox({ x: -300, y: 0 }, box, 0)).toEqual({ x: -50, y: 0 })
    expect(edgeToBox({ x: 0, y: 200 }, box, 0)).toEqual({ x: 0, y: 20 })
    expect(edgeToBox({ x: 10, y: 5 }, box)).toEqual({ x: 0, y: 0 })
  })

  it('labels a line in the middle of the stretch between two cards', () => {
    const wide = { x: 0, y: 0, w: 200, h: 40 }
    const narrow = { x: 300, y: 0, w: 60, h: 40 }
    // The gap runs from x = 100 to x = 270, so its middle is 185, not the centres' 150.
    expect(lineLabelPoint(wide, narrow)).toEqual({ x: 185, y: 0 })
  })
})

describe('lineWidth', () => {
  it('draws a strong connection many times thicker than a faint one', () => {
    expect(lineWidth(0)).toBeCloseTo(0.6)
    expect(lineWidth(100)).toBeCloseTo(11.6)
    expect(lineWidth(90) / lineWidth(10)).toBeGreaterThan(8)
    for (let s = 0; s < 100; s += 10) expect(lineWidth(s + 10)).toBeGreaterThan(lineWidth(s))
  })

  it('stays in range', () => {
    expect(lineWidth(-5)).toBe(lineWidth(0))
    expect(lineWidth(250)).toBe(lineWidth(100))
  })
})
