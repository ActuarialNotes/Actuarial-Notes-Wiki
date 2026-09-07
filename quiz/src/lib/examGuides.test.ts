import { describe, it, expect } from 'vitest'
import { buildExamGuides, guideLabel, type ExamGuideFile } from '@/lib/examGuides'
import { EXAM_GUIDES, guideForExam } from '@/data/examGuides'
import { entryRefToRepoPath, examIdFromFile, pathToEntryRef } from '@/lib/wikiRoutes'

// The exam guides and the tip pages behind them. No surface renders them since
// the exam-page orientation row was removed, but the bundle is still built:
// worth pinning the reading order the guide is authored in, and that every tip
// resolves to a page the viewer can fetch.

function file(over: Partial<ExamGuideFile> & { title: string }): ExamGuideFile {
  return {
    examId: 'p-1',
    examPage: 'Exam P-1 (SOA).md',
    examLabel: 'Exam P-1',
    path: `Guides/Exam P-1 (SOA)/${over.title}.md`,
    order: null,
    ...over,
  }
}

describe('buildExamGuides', () => {
  it('orders a guide by the order in each page\'s frontmatter', () => {
    const guides = buildExamGuides([
      file({ title: 'Scoring', order: 3 }),
      file({ title: 'Format and pacing', order: 1 }),
      file({ title: 'Study the big section first', order: 2 }),
    ])
    expect(guides['p-1'].pages.map(p => p.title)).toEqual([
      'Format and pacing',
      'Study the big section first',
      'Scoring',
    ])
  })

  it('puts an unordered page last rather than in the middle of the run', () => {
    const guides = buildExamGuides([
      file({ title: 'Added without frontmatter' }),
      file({ title: 'Scoring', order: 2 }),
      file({ title: 'Format and pacing', order: 1 }),
    ])
    expect(guides['p-1'].pages.map(p => p.title)).toEqual([
      'Format and pacing',
      'Scoring',
      'Added without frontmatter',
    ])
  })

  it('keys guides by exam and keeps each page pointing at its own file', () => {
    const guides = buildExamGuides([
      file({ title: 'Scoring', order: 1 }),
      file({
        title: 'Scoring',
        order: 1,
        examId: 'mas-i',
        examPage: 'Exam MAS-I (CAS).md',
        examLabel: 'Exam MAS-I',
        path: 'Guides/Exam MAS-I (CAS)/Scoring.md',
      }),
    ])
    expect(Object.keys(guides).sort()).toEqual(['mas-i', 'p-1'])
    // Same title under two exams: only the path can tell them apart, so it
    // travels with the ref.
    expect(guides['p-1'].pages[0].ref.path).toBe('Guides/Exam P-1 (SOA)/Scoring.md')
    expect(guides['mas-i'].pages[0].ref.path).toBe('Guides/Exam MAS-I (CAS)/Scoring.md')
  })
})

describe('EXAM_GUIDES', () => {
  it('is keyed by lowercase wiki exam ids', () => {
    for (const key of Object.keys(EXAM_GUIDES)) expect(key).toBe(key.toLowerCase())
    expect(guideForExam('P-1')).not.toBeNull()
    expect(guideForExam('FM-2')).not.toBeNull()
    expect(guideForExam('MAS-I')).not.toBeNull()
    expect(guideForExam('MAS-II')).not.toBeNull()
    // "Exam 5 (CAS)" has no dash, so the id picks up the -1 suffix.
    expect(guideForExam(examIdFromFile('Exam 5 (CAS).md'))).not.toBeNull()
  })

  it('is null for an exam with no Guides folder', () => {
    expect(guideForExam('6u-1')).toBeNull()
  })

  it('names the exam on the card and points back at its page', () => {
    const guide = guideForExam('mas-i')!
    expect(guide.examLabel).toBe('Exam MAS-I')
    expect(guideLabel(guide)).toBe('How to Study for Exam MAS-I')
    // The popup reports the exam page as its source, like every other way in.
    expect(guide.examPage).toBe('Exam MAS-I (CAS).md')
  })

  it('opens on the page that says how long the paper is', () => {
    for (const examId of Object.keys(EXAM_GUIDES)) {
      const guide = guideForExam(examId)!
      expect(guide.pages[0].title).toBe('Format and pacing')
      // A one-page guide would not need a list to open onto.
      expect(guide.pages.length).toBeGreaterThanOrEqual(2)
    }
  })

  it('gives every tip a page the viewer can fetch', () => {
    for (const guide of Object.values(EXAM_GUIDES)) {
      const seen = new Set<string>()
      for (const page of guide.pages) {
        expect(page.title.length).toBeGreaterThan(0)
        expect(page.ref.kind).toBe('guide')
        const path = entryRefToRepoPath(page.ref)
        expect(path).toBe(`Guides/${guide.examPage.replace(/\.md$/, '')}/${page.title}.md`)
        // Round-trips: a link to the file resolves back to the same page.
        expect(pathToEntryRef(path)).toEqual(page.ref)
        expect(seen.has(path)).toBe(false)
        seen.add(path)
      }
    }
  })
})
