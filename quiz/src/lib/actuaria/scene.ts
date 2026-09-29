// The **scenery** of Actuaria's title screen and star map: a field of stars
// and the Loss Triangle Nebula. Decorative and static — the same sky on every
// visit, because it is seeded rather than random — so it can be drawn as plain
// SVG with nothing to animate (and nothing to hold still under reduced motion).

export interface Star {
  x: number
  y: number
  r: number
  /** 0–1. */
  opacity: number
}

/** A small, fast, seeded generator (mulberry32) — the same sky for the same seed. */
export function seededRandom(seed: number): () => number {
  let a = seed >>> 0
  return () => {
    a = (a + 0x6d2b79f5) >>> 0
    let t = a
    t = Math.imul(t ^ (t >>> 15), t | 1)
    t ^= t + Math.imul(t ^ (t >>> 7), t | 61)
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296
  }
}

export function starfield(count: number, width: number, height: number, seed = 1729): Star[] {
  const random = seededRandom(seed)
  return Array.from({ length: count }, () => {
    const bright = random() < 0.12
    return {
      x: Math.round(random() * width * 10) / 10,
      y: Math.round(random() * height * 10) / 10,
      r: bright ? 1.3 + random() * 0.6 : 0.5 + random() * 0.6,
      opacity: bright ? 0.7 + random() * 0.3 : 0.2 + random() * 0.35,
    }
  })
}

/**
 * The Loss Triangle Nebula: a development triangle's cells — `rows` accident
 * years, each one development period shorter than the last — as a cloud of
 * squares with a corner at (x, y). Pure decoration (§6.3).
 */
export function lossTriangleCells(x: number, y: number, rows: number, cell: number): { x: number; y: number; opacity: number }[] {
  const random = seededRandom(rows * 31 + cell)
  const cells: { x: number; y: number; opacity: number }[] = []
  for (let row = 0; row < rows; row++) {
    for (let col = 0; col < rows - row; col++) {
      cells.push({ x: x + col * (cell + 2), y: y + row * (cell + 2), opacity: 0.08 + random() * 0.14 })
    }
  }
  return cells
}
