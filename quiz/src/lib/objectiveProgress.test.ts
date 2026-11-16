import { describe, it, expect } from 'vitest'
import type { MasteryState } from './mastery'
import { objectiveBar, objectiveProgress, objectiveProgressByTitle } from './objectiveProgress'

const section = (title: string, concepts: string[]) => ({ title, weight: '', concepts })
const states = new Map<string, MasteryState>([
  ['frequency', 'level3'], ['severity', 'level1'], ['pure premium', 'forgotten'],
])

describe('objective progress', () => {
  it('counts each concept once, and learned as Level 1 or higher', () => {
    const p = objectiveProgress(section('Ratemaking', ['Frequency', 'Severity', 'frequency', 'Pure Premium', 'Loss Ratio']), states)
    expect(p.concepts).toEqual(['Frequency', 'Severity', 'Pure Premium', 'Loss Ratio'])
    expect(p.total).toBe(4)
    expect(p.learned).toBe(2)
    expect(p.byState).toEqual({ new: 1, level1: 1, level2: 0, level3: 1, forgotten: 1 })
  })

  it('draws the bar most learned first, to 100%', () => {
    const bar = objectiveBar(objectiveProgress(section('R', ['Frequency', 'Severity', 'Pure Premium', 'Loss Ratio']), states))
    expect(bar.map(s => s.state)).toEqual(['level3', 'level1', 'forgotten', 'new'])
    expect(bar.reduce((sum, s) => sum + s.percent, 0)).toBeCloseTo(100)
  })

  it('reads a reader with no record as all New', () => {
    const p = objectiveProgress(section('R', ['Frequency', 'Severity']), new Map())
    expect(p.learned).toBe(0)
    expect(objectiveBar(p)).toEqual([{ state: 'new', percent: 100 }])
  })

  it('keys by title, leaves out an objective with no concepts, and keeps the first of a repeated title', () => {
    const byTitle = objectiveProgressByTitle(
      [section('A', ['Frequency']), section('Empty', []), section('A', ['Severity', 'Loss Ratio'])],
      states,
    )
    expect([...byTitle.keys()]).toEqual(['A'])
    expect(byTitle.get('A')!.total).toBe(1)
  })
})
