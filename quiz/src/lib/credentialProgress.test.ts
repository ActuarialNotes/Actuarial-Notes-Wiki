import { describe, it, expect } from 'vitest'
import { CREDENTIAL_PATHS, type PathItem } from '@/data/credentialPaths'
import { firstOpenStage, itemProgress, pathTally, stageProgress } from './credentialProgress'

const SOA = CREDENTIAL_PATHS.SOA
const item = (name: string): PathItem => {
  const found = Object.values(CREDENTIAL_PATHS)
    .flatMap(p => p.stages.flatMap(s => s.items))
    .find(i => i.name === name)
  if (!found) throw new Error(name)
  return found
}

describe('itemProgress', () => {
  it('is null for what no track holds, or no rule can judge', () => {
    expect(itemProgress(item('CIA Professionalism Workshop'), {})).toBeNull()
    expect(itemProgress(item('Two more technical courses'), { 'FSA-CP311': 'completed' })).toBeNull()
  })

  it('needs every id by default', () => {
    const vee = item('VEE: Mathematical Statistics, Economics, Accounting and Finance')
    expect(itemProgress(vee, { 'VEE-MS': 'completed', 'VEE-ECON': 'completed' })).toEqual({ state: 'studying' })
    expect(
      itemProgress(vee, { 'VEE-MS': 'completed', 'VEE-ECON': 'completed', 'VEE-AF': 'completed' }),
    ).toEqual({ state: 'done' })
  })

  it('takes one of a choice', () => {
    expect(itemProgress(item('ALTAM or ASTAM'), { ASTAM: 'completed' })).toEqual({ state: 'done' })
    const area = item('A practice area')
    // Two 101s in different areas are not a practice area.
    expect(itemProgress(area, { 'FSA-GH101': 'completed', 'FSA-GI101': 'completed' })?.state).toBe('studying')
    expect(itemProgress(area, { 'FSA-GI101': 'completed', 'FSA-GI201': 'completed' })?.state).toBe('done')
  })

  it('counts an FCIA track done only when one whole track is', () => {
    const track = item('A specialty track')
    const fie = ['CIA-FIE-M1', 'CIA-FIE-M2', 'CIA-F1FIE', 'CIA-F2FIE']
    const done = Object.fromEntries([...fie, 'CIA-F3BNK'].map(id => [id, 'completed']))
    expect(itemProgress(track, done)?.state).toBe('done')
    const short = Object.fromEntries(fie.map(id => [id, 'completed']))
    expect(itemProgress(track, short)?.state).toBe('studying')
  })

  it('shows readiness only for an exam in progress', () => {
    const fam = item('FAM')
    expect(itemProgress(fam, { FAM: 'in_progress' }, { FAM: 42 })).toEqual({ state: 'studying', readyPct: 42 })
    expect(itemProgress(fam, { FAM: 'in_progress' })).toEqual({ state: 'studying' })
    expect(itemProgress(fam, {}, { FAM: 42 })).toEqual({ state: 'todo' })
    expect(itemProgress(fam, { FAM: 'completed' }, { FAM: 42 })).toEqual({ state: 'done' })
  })
})

describe('the route', () => {
  const twoDone = { P: 'completed', FM: 'completed', FAM: 'in_progress' }

  it('tallies the stages up to the page’s own', () => {
    // Start: P, FM, VEE. ASA: FAM, SRM, PA, ALTAM/ASTAM, modules, FAP, APC.
    expect(pathTally(SOA, 1, twoDone)).toEqual({ done: 2, total: 10 })
    expect(pathTally(SOA, 0, twoDone)).toEqual({ done: 2, total: 3 })
  })

  it('has no tally for a reader with nothing on the path', () => {
    expect(pathTally(SOA, 1, {})).toBeNull()
    expect(pathTally(SOA, 1, { 'MAS-I': 'completed' })).toBeNull()
  })

  it('reads a stage complete only when it had something to complete', () => {
    expect(stageProgress(SOA.stages[3], {})).toEqual({ done: 0, total: 0, complete: false })
    const start = { P: 'completed', FM: 'completed', 'VEE-MS': 'completed', 'VEE-ECON': 'completed', 'VEE-AF': 'completed' }
    expect(stageProgress(SOA.stages[0], start).complete).toBe(true)
  })

  it('opens the general route at the first stage with work left', () => {
    expect(firstOpenStage(SOA, {})).toBe(0)
    const start = { P: 'completed', FM: 'completed', 'VEE-MS': 'completed', 'VEE-ECON': 'completed', 'VEE-AF': 'completed' }
    expect(firstOpenStage(SOA, start)).toBe(1)
  })
})
