import { describe, expect, it } from 'vitest'
import { attemptPhase, attemptRoute, fileKind, newAttempt, nextRealWindow, normalizeAttempt, normalizePath, savedMode, starterScript, timeLeft, visibleTo, windowDeadline } from './pcpaAttempt'
import { PROJECT_CASES, WINDOW_DAYS } from '@/data/pcpaProjects'

describe('the window', () => {
  it('closes at the end of its sixteenth day', () => {
    const start = new Date(2026, 8, 15, 9, 30).getTime()
    const end = new Date(windowDeadline(start))
    expect(end.getDate()).toBe(15 + WINDOW_DAYS - 1)
    expect(end.getHours()).toBe(23)
  })

  it('opens a window for a rehearsal and closes it, unless it was submitted', () => {
    const a = newAttempt({ id: 'a', caseId: 'bop-frequency', seed: 1, mode: 'rehearsal', language: 'r', now: 0 })
    expect(a.deadline).toBe(windowDeadline(0))
    expect(attemptPhase(a, 1)).toBe('open')
    expect(attemptPhase(a, a.deadline! + 1)).toBe('closed')
    expect(attemptPhase({ ...a, submittedAt: 5 }, a.deadline! + 1)).toBe('submitted')
  })

  it('gives practice no deadline', () => {
    const practice = newAttempt({ id: 'b', caseId: 'bop-frequency', seed: 1, mode: 'practice', language: 'r', now: 0 })
    expect(practice.deadline).toBeNull()
    expect(attemptPhase(practice, 10 ** 13)).toBe('open')
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

describe('saved attempts', () => {
  it('reads the mode, or derives it from the timing an older attempt was saved with', () => {
    expect(savedMode({ mode: 'practice' })).toBe('practice')
    expect(savedMode({ mode: 'rehearsal', timing: 'untimed' })).toBe('rehearsal')
    expect(savedMode({ timing: 'untimed' })).toBe('practice')
    expect(savedMode({ timing: 'window' })).toBe('rehearsal')
    expect(savedMode({})).toBe('rehearsal')
  })

  it('lives at its own route', () => {
    expect(attemptRoute('p-1')).toBe('/project/pcpa/p-1')
    expect(attemptRoute('p-1', 'results')).toBe('/project/pcpa/p-1?view=results')
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

describe('normalizeAttempt', () => {
  it('refuses what is not an attempt', () => {
    expect(normalizeAttempt(null)).toBeNull()
    expect(normalizeAttempt({ id: 'a', caseId: 'no-such-case', seed: 1 })).toBeNull()
    expect(normalizeAttempt({ id: 'a', caseId: 'bop-frequency' })).toBeNull()
  })

  it('fills in what an older record lacks', () => {
    const a = normalizeAttempt({ id: 'a', caseId: 'bop-frequency', seed: 1, startedAt: 100, submittedAt: 400, timing: 'untimed' })!
    expect(a.mode).toBe('practice')
    expect(a.report).toEqual({ body: '', appendices: [] })
    expect(a.activeMs).toBe(0)
    // No record of when it last changed: the last thing known to have happened to it.
    expect(a.updatedAt).toBe(400)
    expect(a.owner).toBeUndefined()
  })

  it('keeps a record that is already whole as it is', () => {
    const a = newAttempt({ id: 'a', caseId: 'auto-severity', seed: 7, mode: 'rehearsal', language: 'python', now: 1000, owner: 'u1' })
    expect(normalizeAttempt(JSON.parse(JSON.stringify(a)))).toEqual(a)
  })
})

describe('visibleTo', () => {
  it("shows a reader their account's attempts and any started signed out", () => {
    expect(visibleTo({ owner: 'u1' }, 'u1')).toBe(true)
    expect(visibleTo({ owner: undefined }, 'u1')).toBe(true)
    expect(visibleTo({ owner: 'u2' }, 'u1')).toBe(false)
  })

  it("keeps an account's attempts from whoever uses the browser signed out", () => {
    expect(visibleTo({ owner: 'u1' }, null)).toBe(false)
    expect(visibleTo({ owner: undefined }, null)).toBe(true)
  })
})
