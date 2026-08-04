import { describe, it, expect } from 'vitest'
import { rewriteGuideLinks } from '@/components/wiki/ExamGuideCards'
import { markExamGuides, EXAM_GUIDES_MARKER } from '@/components/wiki/WikiArticle'
import { EXAM_GUIDES, guidesForExam } from '@/data/examGuides'

// The exam-page orientation cards. Two things are worth pinning: the marker
// handshake between the vault markdown and the renderer (silently losing it
// would just make the cards vanish), and that every authored page is complete.

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
    expect(guidesForExam('fm-2')).toEqual([])
  })

  it('gives every guide a title, a blurb and at least two pages', () => {
    for (const guide of guides) {
      expect(guide.title.length).toBeGreaterThan(0)
      expect(guide.blurb.length).toBeGreaterThan(0)
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
