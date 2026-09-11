import { describe, it, expect } from 'vitest'
import {
  buildSyllabusChapters,
  chapterAtPosition,
  chapterPositionForScroll,
  objectiveShares,
  scrollForChapterPosition,
  SYLLABUS_BAR_UNITS,
  type MeasuredObjective,
} from './syllabusChapters'

// Exam P-1's three objectives, in the proportions the page authors them.
const examP: MeasuredObjective[] = [
  { title: 'General Probability', weight: '23-30%', top: 400, bottom: 500 },
  { title: 'Univariate Random Variables', weight: '44-50%', top: 500, bottom: 600 },
  { title: 'Multivariate Random Variables', weight: '23-30%', top: 600, bottom: 700 },
]

describe('objectiveShares', () => {
  it('splits the bar by the weights the page carries', () => {
    // Midpoints 26.5 / 47 / 26.5 — which is what the syllabus adds up to.
    const shares = objectiveShares(['23-30%', '44-50%', '23-30%'])
    expect(shares[0]).toBeCloseTo(0.265, 5)
    expect(shares[1]).toBeCloseTo(0.47, 5)
    expect(shares[2]).toBeCloseTo(0.265, 5)
    expect(shares.reduce((a, b) => a + b, 0)).toBeCloseTo(1, 10)
  })

  it('normalises weights that do not add up to 100', () => {
    const shares = objectiveShares(['10%', '30%'])
    expect(shares).toEqual([0.25, 0.75])
  })

  it('falls back to even shares rather than inventing a missing weight', () => {
    expect(objectiveShares(['45-55%', ''])).toEqual([0.5, 0.5])
    expect(objectiveShares([null, undefined, 'not a weight'])).toEqual([1 / 3, 1 / 3, 1 / 3])
  })

  it('handles an empty syllabus', () => {
    expect(objectiveShares([])).toEqual([])
  })
})

describe('buildSyllabusChapters', () => {
  it('lays the objectives out by weight, tiling the whole bar', () => {
    const chapters = buildSyllabusChapters(examP)
    expect(chapters.map(c => [c.start, c.end])).toEqual([[1, 265], [266, 735], [736, 1000]])
    // No gaps and no overlaps: every position belongs to exactly one objective.
    expect(chapters[0].start).toBe(1)
    expect(chapters[chapters.length - 1].end).toBe(SYLLABUS_BAR_UNITS)
    chapters.slice(1).forEach((c, i) => expect(c.start).toBe(chapters[i].end + 1))
  })

  it('puts them in page order, whatever order they were found in', () => {
    const chapters = buildSyllabusChapters([examP[2], examP[0], examP[1]])
    expect(chapters.map(c => c.title)).toEqual([
      'General Probability',
      'Univariate Random Variables',
      'Multivariate Random Variables',
    ])
  })

  it('runs each objective down to where the next one starts', () => {
    // The gap between two callouts belongs to the one above it, so scrolling
    // through it doesn't land the bar in neither chapter.
    const chapters = buildSyllabusChapters([
      { title: 'A', weight: '50%', top: 100, bottom: 160 },
      { title: 'B', weight: '50%', top: 200, bottom: 260 },
    ])
    expect(chapters[0].bottom).toBe(200)
    // The last keeps its own bottom edge — what follows is the reading list.
    expect(chapters[1].bottom).toBe(260)
  })

  it('is empty for a page that is not a syllabus', () => {
    expect(buildSyllabusChapters([])).toEqual([])
    expect(buildSyllabusChapters([examP[0]])).toEqual([])
  })

  it('drops an objective it cannot place', () => {
    const chapters = buildSyllabusChapters([
      { title: '', weight: '20%', top: 100, bottom: 200 },
      { title: 'A', weight: '40%', top: 200, bottom: 300 },
      { title: 'B', weight: '40%', top: 300, bottom: 400 },
      { title: 'C', weight: '40%', top: NaN, bottom: 500 },
      { title: 'D', weight: '40%', top: 600, bottom: 600 },
    ])
    expect(chapters.map(c => c.title)).toEqual(['A', 'B'])
  })

  it('gives even segments to a syllabus with no weights', () => {
    const chapters = buildSyllabusChapters([
      { title: 'A', weight: '', top: 100, bottom: 200 },
      { title: 'B', weight: '', top: 200, bottom: 300 },
    ])
    expect(chapters.map(c => [c.start, c.end])).toEqual([[1, 500], [501, 1000]])
  })
})

describe('chapterPositionForScroll', () => {
  const chapters = buildSyllabusChapters(examP)

  it('is at the start while the reader is above the first objective', () => {
    expect(chapterPositionForScroll(chapters, 0)).toBe(1)
    expect(chapterPositionForScroll(chapters, 399)).toBe(1)
  })

  it('moves through an objective as it is read', () => {
    expect(chapterPositionForScroll(chapters, 400)).toBe(1)
    expect(chapterPositionForScroll(chapters, 450)).toBe(133)
    expect(chapterPositionForScroll(chapters, 500)).toBe(266)
  })

  it('is full once the syllabus is behind the reader', () => {
    expect(chapterPositionForScroll(chapters, 700)).toBe(1000)
    // The source-material shelf below the last objective doesn't move it on.
    expect(chapterPositionForScroll(chapters, 4000)).toBe(1000)
  })

  it('names the objective the reader is in', () => {
    expect(chapterAtPosition(chapters, chapterPositionForScroll(chapters, 550))?.title)
      .toBe('Univariate Random Variables')
    expect(chapterAtPosition(chapters, chapterPositionForScroll(chapters, 650))?.title)
      .toBe('Multivariate Random Variables')
  })

  it('survives a page that has not been measured yet', () => {
    expect(chapterPositionForScroll([], 500)).toBe(1)
    expect(chapterPositionForScroll(chapters, NaN)).toBe(1)
  })
})

describe('scrollForChapterPosition', () => {
  const chapters = buildSyllabusChapters(examP)

  it('is the inverse of the scroll reading', () => {
    for (const y of [400, 437, 512, 640, 699]) {
      const position = chapterPositionForScroll(chapters, y)
      // Back within one objective-position of where the reader was — the bar
      // can't resolve finer than that, and a scrub must not drift off it.
      expect(Math.abs(scrollForChapterPosition(chapters, position) - y)).toBeLessThanOrEqual(1)
    }
  })

  it('lands a press at the top of the objective it hit', () => {
    expect(scrollForChapterPosition(chapters, 266)).toBe(500)
    expect(scrollForChapterPosition(chapters, 736)).toBe(600)
  })

  it('clamps a position off either end of the bar', () => {
    expect(scrollForChapterPosition(chapters, 0)).toBe(400)
    expect(scrollForChapterPosition(chapters, 9999)).toBe(700)
  })

  it('survives a page that has not been measured yet', () => {
    expect(scrollForChapterPosition([], 500)).toBe(0)
  })
})
