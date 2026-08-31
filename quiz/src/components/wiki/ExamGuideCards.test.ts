import { describe, it, expect } from 'vitest'
import { rewriteGuideLinks } from '@/components/wiki/ExamGuideCards'
import { markExamGuides, EXAM_GUIDES_MARKER } from '@/components/wiki/WikiArticle'
import { EXAM_GUIDES, guideForExam, guidesForExam } from '@/data/examGuides'
import { examIdFromFile } from '@/lib/wikiRoutes'

// The exam-page orientation card. Three things are worth pinning: the marker
// handshake between the vault markdown and the renderer (silently losing it
// would just make the card vanish), that every authored page is complete, and
// that the merge into one paged guide keeps all of both halves.

describe('markExamGuides', () => {
  it('replaces the marker div with the paragraph marker', () => {
    const md = '## Prerequisite knowledge\n\n<div class="exam-guides"></div>\n\n## Learning Objectives'
    const out = markExamGuides(md)
    expect(out).not.toContain('<div class="exam-guides">')
    expect(out).toContain(EXAM_GUIDES_MARKER)
    // The marker has to end up on its own line, or remark folds it into a
    // neighbouring paragraph and the renderer never sees a lone text node.
    expect(out.split('\n')).toContain(EXAM_GUIDES_MARKER)
  })

  it('leaves other layout divs for stripHtmlBlocks to remove', () => {
    const md = '<div class="exam-nav"\n     data-current="P-1|Probability"\n</div>\n\n# Exam P-1'
    expect(markExamGuides(md)).toBe(md)
  })
})

describe('rewriteGuideLinks', () => {
  it('turns wikilinks into in-app routes', () => {
    expect(rewriteGuideLinks('Get [[Bayes Theorem]] automatic.')).toBe(
      'Get [Bayes Theorem](/wiki/concept/Bayes+Theorem) automatic.',
    )
  })

  it('keeps the display text of an aliased link', () => {
    expect(rewriteGuideLinks('a [[Transformations of Random Variables|transformed]] loss')).toBe(
      'a [transformed](/wiki/concept/Transformations+of+Random+Variables) loss',
    )
  })

  it('leaves plain markdown alone', () => {
    const body = 'Scaled **0–10**, with 6 to pass.'
    expect(rewriteGuideLinks(body)).toBe(body)
  })
})

describe('EXAM_GUIDES', () => {
  const guides = Object.values(EXAM_GUIDES).flat()

  it('is keyed by lowercase wiki exam ids', () => {
    for (const key of Object.keys(EXAM_GUIDES)) expect(key).toBe(key.toLowerCase())
    expect(guidesForExam('P-1')).toHaveLength(2)
    expect(guidesForExam('FM-2')).toHaveLength(2)
    expect(guidesForExam('MAS-I')).toHaveLength(2)
    expect(guidesForExam('MAS-II')).toHaveLength(2)
    // "Exam 5 (CAS)" has no dash, so the id picks up the -1 suffix.
    expect(guidesForExam(examIdFromFile('Exam 5 (CAS).md'))).toHaveLength(2)
    expect(guidesForExam('6u-1')).toEqual([])
  })

  it('gives every guide a title, a cover and at least two pages', () => {
    for (const guide of guides) {
      expect(guide.title.length).toBeGreaterThan(0)
      // The card face is its own square mark, not the first page's wide graphic.
      expect(typeof guide.Cover).toBe('function')
      // One page would not need the paging chrome.
      expect(guide.pages.length).toBeGreaterThanOrEqual(2)
    }
  })

  it('gives every page a title, a graphic and a body', () => {
    for (const guide of guides) {
      for (const page of guide.pages) {
        expect(page.title.length).toBeGreaterThan(0)
        expect(typeof page.Graphic).toBe('function')
        expect(page.body.trim().length).toBeGreaterThan(0)
      }
    }
  })

  it('leaves no unrewritten wikilinks in a rendered body', () => {
    for (const guide of guides) {
      for (const page of guide.pages) {
        expect(rewriteGuideLinks(page.body)).not.toMatch(/\[\[/)
      }
    }
  })
})

describe('guideForExam', () => {
  it('merges both authored guides into one run of pages', () => {
    const halves = guidesForExam('mas-ii')
    const merged = guideForExam('mas-ii')!
    expect(merged.pages).toHaveLength(halves.reduce((n, g) => n + g.pages.length, 0))
    expect(merged.sections.map(s => s.id).sort()).toEqual(['exam-day', 'how-to-study'])
  })

  it('puts how-to-study before exam day', () => {
    for (const examId of Object.keys(EXAM_GUIDES)) {
      const merged = guideForExam(examId)!
      expect(merged.sections[0].id).toBe('how-to-study')
      expect(merged.pages[0].section.id).toBe('how-to-study')
      expect(merged.pages[merged.pages.length - 1].section.id).toBe('exam-day')
    }
  })

  it('tags every page with the half it came from, in contiguous runs', () => {
    const merged = guideForExam('p-1')!
    const runs = merged.pages.reduce<string[]>((acc, p) => (
      acc[acc.length - 1] === p.section.id ? acc : [...acc, p.section.id]
    ), [])
    expect(runs).toEqual(['how-to-study', 'exam-day'])
    // Each section's own count has to match what it contributed, or the
    // grouped paging dots split in the wrong place.
    for (const section of merged.sections) {
      expect(merged.pages.filter(p => p.section.id === section.id)).toHaveLength(section.pageCount)
    }
  })

  it('gives the merged guide a title that names both halves', () => {
    const merged = guideForExam('fm-2')!
    expect(merged.title).toMatch(/study/i)
    expect(merged.title).toMatch(/exam day/i)
  })

  it('is null for an exam with nothing authored', () => {
    expect(guideForExam('6u-1')).toBeNull()
  })
})
