import { describe, it, expect } from 'vitest'
import { readFileSync } from 'fs'
import path from 'path'
import { fileURLToPath } from 'url'
import { GRID, GRID_MD_MAX, SINGLE, SPIN_MS, gridCardSize, gridTimeline } from './levelUpCeremony'

const SRC = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..')

describe('gridTimeline', () => {
  it('is empty for no cards', () => {
    expect(gridTimeline(0)).toEqual({ staggerMs: 0, appearAt: [], landAt: [], doneAt: 0 })
  })

  it('lands each card one spin after it pops in', () => {
    const t = gridTimeline(5)
    t.appearAt.forEach((at, i) => expect(t.landAt[i]).toBe(at + SPIN_MS))
  })

  it('pops the first card in at once and the rest in order', () => {
    const t = gridTimeline(6)
    expect(t.appearAt[0]).toBe(0)
    for (let i = 1; i < t.appearAt.length; i++) {
      expect(t.appearAt[i]).toBeGreaterThan(t.appearAt[i - 1])
    }
  })

  it('never spaces a short run wider than the ripple allows', () => {
    const t = gridTimeline(2)
    expect(t.staggerMs).toBe(GRID.maxStaggerMs)
    expect(t.appearAt).toEqual([0, GRID.maxStaggerMs])
  })

  it('squeezes a long run into the same cascade', () => {
    for (const n of [9, 20, 60]) {
      const t = gridTimeline(n)
      expect(t.appearAt[n - 1]).toBeLessThanOrEqual(GRID.cascadeMs)
      expect(t.doneAt).toBeLessThanOrEqual(GRID.cascadeMs + SPIN_MS + GRID.holdMs)
    }
  })

  it('holds the finished grid before handing over to the summary', () => {
    const t = gridTimeline(4)
    expect(t.doneAt).toBe(t.landAt[3] + GRID.holdMs)
  })

  it('celebrates many concepts far faster than one card at a time', () => {
    // The ceremony this replaced gave every card its own spin and flash in turn.
    const oneAtATime = (n: number) => n * (SPIN_MS + SINGLE.absorbMs)
    expect(gridTimeline(10).doneAt).toBeLessThan(oneAtATime(10) / 3)
  })
})

describe('gridCardSize', () => {
  it('draws a short run at md and a long one at sm', () => {
    expect(gridCardSize(2)).toBe('md')
    expect(gridCardSize(GRID_MD_MAX)).toBe('md')
    expect(gridCardSize(GRID_MD_MAX + 1)).toBe('sm')
  })
})

// The ceremony's timers wait on CSS animations; the two have to agree or a card
// unmounts mid-dissolve, or lands before its snake has stopped.
describe('index.css keyframes', () => {
  const css = readFileSync(path.join(SRC, 'index.css'), 'utf-8')
  const duration = (anim: string) => {
    const m = css.match(new RegExp(`animation:\\s*${anim}\\s+(\\d+)ms`))
    return m ? Number(m[1]) : NaN
  }

  it('spins the snake for SPIN_MS', () => {
    expect(duration('collect-card-snake-spin')).toBe(SPIN_MS)
  })

  it('dissolves the lone card in SINGLE.absorbMs', () => {
    expect(duration('collect-card-absorb')).toBe(SINGLE.absorbMs)
  })
})
