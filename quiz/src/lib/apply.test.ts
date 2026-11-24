import { describe, expect, it } from 'vitest'
import { openAttempts, projectsCount, recentTools, resolveToolsTab, stepsLabel, toolsCount, workflowsCount } from './apply'

describe('the Projects card', () => {
  it('lists the attempts still open, the one worked on last first', () => {
    const attempts = [
      { id: 'a', submittedAt: null, updatedAt: 1 },
      { id: 'b', submittedAt: 9, updatedAt: 9 },
      { id: 'c', submittedAt: null, updatedAt: 5 },
    ]
    expect(openAttempts(attempts).map(a => a.id)).toEqual(['c', 'a'])
  })
  it('counts what is in progress, or the briefs when nothing is', () => {
    expect(projectsCount(1, 3)).toBe('1 in progress')
    expect(projectsCount(2, 3)).toBe('2 in progress')
    expect(projectsCount(0, 3)).toBe('3 briefs')
    expect(projectsCount(0, 1)).toBe('1 brief')
  })
})

describe('the Tools card', () => {
  it('counts the exam\'s tools, or every tool when the exam has none', () => {
    expect(toolsCount(20, 37, 'Exam 5')).toBe('20 for Exam 5')
    expect(toolsCount(0, 37, 'Exam 9')).toBe('37 tools')
    expect(toolsCount(0, 37, null)).toBe('37 tools')
    expect(toolsCount(5, 37, null)).toBe('37 tools')
  })
  it('shows three recent tools, skipping one no longer in the catalogue', () => {
    const recent = ['a', 'gone', 'b', 'c', 'd'].map((slug, i) => ({ slug, value: '1', at: 10 - i }))
    const find = (slug: string) => (slug === 'gone' ? undefined : slug.toUpperCase())
    expect(recentTools(recent, find)).toEqual(['A', 'B', 'C'])
    expect(recentTools([], find)).toEqual([])
  })
})

describe('the Tools screen\'s tabs', () => {
  it('opens on the exam and keeps All when asked', () => {
    expect(resolveToolsTab(null, 20)).toBe('exam')
    expect(resolveToolsTab('all', 20)).toBe('all')
    expect(resolveToolsTab('nonsense', 20)).toBe('exam')
  })
  it('is the whole catalogue when the exam covers no tool', () => {
    expect(resolveToolsTab(null, 0)).toBe('all')
    expect(resolveToolsTab('exam', 0)).toBe('all')
  })
})

describe('the Workflows card', () => {
  it('counts the saved, and says nothing with none', () => {
    expect(workflowsCount(2)).toBe('2 saved')
    expect(workflowsCount(0)).toBe('')
    expect(stepsLabel(1)).toBe('1 step')
    expect(stepsLabel(5)).toBe('5 steps')
  })
})
