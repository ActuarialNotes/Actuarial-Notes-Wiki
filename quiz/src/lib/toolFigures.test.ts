import { describe, expect, it } from 'vitest'
import { TOOLS, runTool, toolById } from '@/lib/tools'
import { figureFor, hasFigure, labelRows, linesExtent, range, scale, sweep, type FigureSpec } from './toolFigures'

/** Every number a figure would draw. */
function numbers(f: FigureSpec): number[] {
  switch (f.kind) {
    case 'bars': return [...f.stacks.flatMap(s => s.values), ...(f.outline?.values ?? []), ...(f.line?.values ?? [])]
    case 'lines': return [...f.series.flatMap(s => s.points.flatMap(p => [p.x, p.y])), ...(f.dots ?? []).flatMap(d => [d.x, d.y]), ...(f.point ? [f.point.x, f.point.y] : [])]
    case 'heat': return f.rows.flat().filter((v): v is number => v != null)
    case 'flows': return f.items.flatMap(i => [i.t, i.amount, i.pv])
    case 'split': return f.bars.flatMap(b => b.parts.map(p => p.value))
    case 'axis': return f.ticks.map(t => t.value)
    case 'span': return [f.years]
  }
}

describe('a figure on every tool (R11)', () => {
  it.each(TOOLS.map(t => [t.id] as const))('%s draws its default run', id => {
    expect(hasFigure(id)).toBe(true)
    const fig = figureFor(runTool(toolById(id)!, {}))
    expect(fig).not.toBeNull()
    const ns = numbers(fig!)
    expect(ns.length).toBeGreaterThan(0)
    expect(ns.every(Number.isFinite)).toBe(true)
  })

  it('stacks a reserve on the latest diagonal to the ultimate the tool computed', () => {
    for (const id of ['reserving.chain_ladder', 'reserving.bornhuetter_ferguson', 'reserving.benktander', 'reserving.cape_cod']) {
      const r = runTool(toolById(id)!, {})
      const fig = figureFor(r)!
      if (fig.kind !== 'bars') throw new Error(id)
      const tops = fig.labels.map((_, k) => fig.stacks.reduce((s, st) => s + st.values[k], 0))
      tops.forEach((t, k) => expect(t).toBeCloseTo((r.values.ultimate as number[])[k], 6))
    }
  })

  it('puts the run\'s own point on the curve the engine sweeps', () => {
    for (const id of ['credibility.partial_credibility', 'credibility.buhlmann_credibility', 'finance.bond_price', 'distributions.limited_expected_value', 'finance.duration_convexity']) {
      const r = runTool(toolById(id)!, {})
      const fig = figureFor(r)!
      if (fig.kind !== 'lines' || !fig.point) throw new Error(id)
      // The swept curve, near the point's own x, passes through the point.
      const ys = fig.series[0].points
      const nearest = ys.reduce((a, p) => (Math.abs(p.x - fig.point!.x) < Math.abs(a.x - fig.point!.x) ? p : a))
      const span = Math.max(...ys.map(p => p.y)) - Math.min(...ys.map(p => p.y)) || 1
      expect(Math.abs(nearest.y - fig.point.y) / span).toBeLessThan(0.15)
    }
  })

  it('draws the selected average through each origin\'s factors', () => {
    const r = runTool(toolById('reserving.age_to_age_factors')!, {})
    const fig = figureFor(r)!
    if (fig.kind !== 'lines') throw new Error('lines')
    expect(fig.series[0].points.map(p => p.y)).toEqual((r.values.averages as number[]).filter(v => v != null))
    expect(fig.dots).toHaveLength(6)
  })
})

describe('sweep', () => {
  it('runs the engine at each value and skips what it refuses', () => {
    const pts = sweep('credibility.partial_credibility', { standard: 1082 }, 'claims', [0, 1082, -5], r => Number(r.values.z))
    expect(pts).toEqual([{ x: 0, y: 0 }, { x: 1082, y: 1 }])
  })
})

describe('geometry', () => {
  it('maps ranges and spaces values evenly', () => {
    expect(scale(0, 10, 0, 100)(5)).toBe(50)
    expect(scale(3, 3, 0, 100)(3)).toBe(50)
    expect(range(0, 1, 5)).toEqual([0, 0.25, 0.5, 0.75, 1])
  })
  it('includes zero and the level in a lines figure\'s extent', () => {
    const e = linesExtent({ kind: 'lines', series: [{ name: 's', points: [{ x: 1, y: 5 }, { x: 2, y: 6 }], role: 'base' }], level: { y: 8, name: 'l' }, zero: true, xUnit: 'plain', yUnit: 'plain' })
    expect(e.y[0]).toBe(0)
    expect(e.y[1]).toBeGreaterThan(8)
    expect(e.x).toEqual([1, 2])
  })
})

describe('labelRows', () => {
  it('moves a label to the next row only when it would overlap', () => {
    expect(labelRows([0, 100, 200], 30)).toEqual([0, 0, 0])
    expect(labelRows([0, 10, 20, 200], 30)).toEqual([0, 1, 2, 0])
    expect(labelRows([20, 0], 30)).toEqual([1, 0])
  })
})
