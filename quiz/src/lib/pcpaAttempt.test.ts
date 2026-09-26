import { describe, expect, it } from 'vitest'
import { attemptPhase, drawCase, fileKind, newAttempt, nextRealWindow, normalizePath, starterScript, timeLeft, windowDeadline } from './pcpaAttempt'
import { PROJECT_CASES, WINDOW_DAYS } from '@/data/pcpaProjects'

describe('the window', () => {
  it('closes at the end of its sixteenth day', () => {
    const start = new Date(2026, 8, 15, 9, 30).getTime()
    const end = new Date(windowDeadline(start))
    expect(end.getDate()).toBe(15 + WINDOW_DAYS - 1)
    expect(end.getHours()).toBe(23)
  })

  it('moves an attempt from open to closed, unless it was submitted', () => {
    const a = newAttempt({ id: 'a', caseId: 'bop-frequency', seed: 1, timing: 'window', language: 'r', now: 0 })
    expect(attemptPhase(a, 1)).toBe('open')
    expect(attemptPhase(a, a.deadline! + 1)).toBe('closed')
    expect(attemptPhase({ ...a, submittedAt: 5 }, a.deadline! + 1)).toBe('submitted')
    const untimed = newAttempt({ id: 'b', caseId: 'bop-frequency', seed: 1, timing: 'untimed', language: 'r', now: 0 })
    expect(untimed.deadline).toBeNull()
    expect(attemptPhase(untimed, 10 ** 13)).toBe('open')
  })

  it('counts down in days, then hours, then minutes', () => {
    const day = 86_400_000
    expect(timeLeft(5 * day + 3_600_000, 0)).toMatchObject({ label: '5d 1h left', urgency: 'calm' })
    expect(timeLeft(2 * day, 0).urgency).toBe('soon')
    expect(timeLeft(90 * 60_000, 0)).toMatchObject({ label: '1h 30m left', urgency: 'final' })
    expect(timeLeft(0, 1).label).toBe('Window closed')
  })

  it('finds the next real window from the published calendar', () => {
    const w = nextRealWindow(new Date(2026, 8, 26))
    expect(w.opens.getMonth()).toBe(8)
    expect(w.closes.getDate()).toBe(30)
    const after = nextRealWindow(new Date(2026, 9, 1))
    expect(after.opens.getMonth()).toBe(11)
    expect(after.opens.getDate()).toBe(16)
  })
})

describe('drawCase', () => {
  it('prefers a case the candidate has not attempted', () => {
    const all = PROJECT_CASES.map(c => c.id)
    expect(drawCase(all.slice(0, 2), 0.99)).toBe(all[2])
    expect(all).toContain(drawCase([], 0.5))
  })
})

describe('workspace paths', () => {
  it('classifies files by extension', () => {
    expect(fileKind('code/analysis.R')).toBe('r')
    expect(fileKind('code/model.py')).toBe('python')
    expect(fileKind('sheets/Book1.sheet')).toBe('sheet')
    expect(fileKind('output/lift.PNG')).toBe('image')
  })

  it('refuses paths that climb out of the project', () => {
    expect(normalizePath('/output//a.png')).toBe('output/a.png')
    expect(normalizePath('../etc/passwd')).toBeNull()
  })

  it('writes a starter script that reads every data set and nothing more', () => {
    for (const c of PROJECT_CASES) {
      const r = starterScript('r', c)
      const py = starterScript('python', c)
      for (const d of c.dictionary) {
        expect(r.text).toContain(`data/${d.file}`)
        expect(py.text).toContain(`data/${d.file}`)
      }
      expect(r.text).not.toMatch(/glm\(/)
    }
  })
})
