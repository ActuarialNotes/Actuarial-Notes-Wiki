import { describe, expect, it } from 'vitest'
import { ABOUT_LOOP, ABOUT_PHASES, ABOUT_VERDICTS } from './aboutWorkflow'

describe('ABOUT_PHASES', () => {
  it('writes first, then checks', () => {
    expect(ABOUT_PHASES.map(p => p.id)).toEqual(['write', 'check'])
  })

  // The section's claim is that both halves are AI *and* community work; a phase
  // that lost one of them would make the page say something the flow doesn't show.
  it.each(ABOUT_PHASES.map(p => [p.id, p] as const))('%s has an AI step and a community step', (_id, phase) => {
    const actors = new Set(phase.steps.flatMap(s => s.actors))
    expect(actors.has('ai')).toBe(true)
    expect(actors.has('community')).toBe(true)
  })

  it('gives every step an actor, a title and one line of detail', () => {
    for (const step of ABOUT_PHASES.flatMap(p => p.steps)) {
      expect(step.actors.length).toBeGreaterThan(0)
      expect(step.title).not.toBe('')
      expect(step.detail).not.toMatch(/\n/)
    }
  })
})

describe('ABOUT_VERDICTS', () => {
  it('shows each fact-check tone once', () => {
    expect(ABOUT_VERDICTS.map(v => v.tone).sort()).toEqual(['amber', 'green', 'grey', 'red'])
  })

  it('uses the labels the badge prints, undated', () => {
    expect(ABOUT_VERDICTS.map(v => v.label)).toEqual([
      'Not fact checked',
      'Fact checked',
      'Re-check needed',
      'Known issue',
    ])
  })
})

describe('ABOUT_LOOP', () => {
  it('names the verdict an edited page falls back to', () => {
    const recheck = ABOUT_VERDICTS.find(v => v.tone === 'amber')
    expect(ABOUT_LOOP.detail).toContain(recheck?.label)
  })
})
