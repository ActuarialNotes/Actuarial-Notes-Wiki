import { describe, expect, it } from 'vitest'
import { readdirSync } from 'fs'
import path from 'path'
import { fileURLToPath } from 'url'
import { EXAM_SITTINGS } from './examSittings'
import { SITTING_DETAILS, examAbout, sittingDetailsFor } from './examSittingDetails'
import { wikiExamIdToProgressKey } from '../lib/wikiParser'
import { examIdFromFile } from '../lib/wikiRoutes'

const VAULT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '../../..')
const ISO = /^\d{4}-\d{2}-\d{2}$/
const PUBLISHERS = /^https:\/\/www\.(casact|soa)\.org\//

/** Every study guide the vault has: its exam key and its wiki exam id. */
function studyGuides(): { exam: string; guide: string }[] {
  return readdirSync(VAULT)
    .filter(f => /^Exam .+\.md$/.test(f))
    .map(f => ({
      exam: wikiExamIdToProgressKey(f.replace(/^Exam\s+/, '').replace(/\s*\([^)]*\)\.md$/, '').trim()),
      guide: examIdFromFile(f),
    }))
}

function isRealDate(iso: string): boolean {
  const d = new Date(iso + 'T00:00:00Z')
  return ISO.test(iso) && !Number.isNaN(d.getTime()) && d.toISOString().slice(0, 10) === iso
}

describe('the sitting details table', () => {
  it('details only sittings the sittings table has', () => {
    for (const d of SITTING_DETAILS) {
      for (const examId of d.examIds) {
        const row = EXAM_SITTINGS.find(s =>
          s.examId === examId && s.startDate === d.startDate && (!d.format || s.format === d.format))
        expect(row, `${examId} ${d.startDate} has no sittings row`).toBeDefined()
      }
    }
  })

  it('names one entry per sitting', () => {
    for (const s of EXAM_SITTINGS) {
      const matches = SITTING_DETAILS.filter(d =>
        d.examIds.includes(s.examId) && d.startDate === s.startDate && (!d.format || d.format === s.format))
      expect(matches.length, `${s.examId} ${s.startDate} ${s.format}`).toBeLessThanOrEqual(1)
    }
  })

  it('writes every date as a real ISO day, and every span forwards', () => {
    for (const d of SITTING_DETAILS) {
      for (const m of d.milestones) {
        expect(isRealDate(m.date), `${d.examIds} ${m.label} ${m.date}`).toBe(true)
        if (m.endDate) {
          expect(isRealDate(m.endDate), `${d.examIds} ${m.label} ${m.endDate}`).toBe(true)
          expect(m.endDate >= m.date).toBe(true)
        }
      }
    }
  })

  it("agrees with the sittings row about the window and the registration deadline", () => {
    for (const s of EXAM_SITTINGS) {
      const d = sittingDetailsFor(s.examId, s)
      if (!d) continue
      const window = d.milestones.find(m => m.kind === 'window')
      if (window) {
        expect(window.date, `${s.examId} ${s.startDate}`).toBe(s.startDate)
        expect(window.endDate ?? null, `${s.examId} ${s.startDate}`).toBe(s.endDate)
      }
      const deadline = d.milestones.find(m => m.kind === 'registration-deadline')
      if (deadline && s.registrationDeadline) {
        expect(deadline.date, `${s.examId} ${s.startDate}`).toBe(s.registrationDeadline)
      }
    }
  })

  it('puts nothing after the results but the results', () => {
    // Registration and the window come before results; a date out of that
    // order is a transcription slip, not a calendar.
    for (const d of SITTING_DETAILS) {
      const results = d.milestones.filter(m => m.kind === 'results')
      for (const r of results) {
        for (const m of d.milestones) {
          if (m.kind === 'results') continue
          expect((m.endDate ?? m.date) <= r.date, `${d.examIds} ${m.label} after ${r.label}`).toBe(true)
        }
      }
    }
  })

  it('cites the publisher for every entry', () => {
    for (const d of SITTING_DETAILS) {
      expect(d.sources.length, `${d.examIds} ${d.startDate}`).toBeGreaterThan(0)
      for (const s of d.sources) expect(s.url).toMatch(PUBLISHERS)
    }
  })
})

describe('the exam facts table', () => {
  it('gives every study guide somewhere to go on the publisher’s site', () => {
    for (const { exam, guide } of studyGuides()) {
      const about = examAbout(exam, guide)
      expect(about, guide).not.toBeNull()
      expect(about!.source.url).toMatch(PUBLISHERS)
    }
    // Exam 6's two guides share an exam key, not a page.
    expect(examAbout('CAS-6', '6c-1')!.source.url).not.toBe(examAbout('CAS-6', '6u-1')!.source.url)
  })
})
