import { describe, it, expect } from 'vitest'
import {
  buildChapters,
  chapterAt,
  chapterOutlineLevel,
  cleanChapterTitle,
  destPageNumber,
  type PdfOutlineNode,
} from './pdfChapters'

describe('chapterOutlineLevel', () => {
  it('uses the top level of the outline', () => {
    const outline: PdfOutlineNode[] = [
      { title: 'Question 1', items: [{ title: 'Part a' }] },
      { title: 'Question 2' },
    ]
    expect(chapterOutlineLevel(outline).map(n => n.title)).toEqual(['Question 1', 'Question 2'])
  })

  it('descends past a single root bookmark wrapping the whole paper', () => {
    // One chapter covering the document is no chapters at all.
    const outline: PdfOutlineNode[] = [
      {
        title: 'Exam 5 — Spring 2019',
        items: [{ title: 'Question 1' }, { title: 'Question 2' }],
      },
    ]
    expect(chapterOutlineLevel(outline).map(n => n.title)).toEqual(['Question 1', 'Question 2'])
  })

  it('stops at a single leaf rather than losing it', () => {
    expect(chapterOutlineLevel([{ title: 'Examiners report' }]).map(n => n.title))
      .toEqual(['Examiners report'])
  })

  it('is empty for a document with no outline', () => {
    expect(chapterOutlineLevel(null)).toEqual([])
    expect(chapterOutlineLevel(undefined)).toEqual([])
    expect(chapterOutlineLevel([])).toEqual([])
  })

  it('gives up rather than spinning on a cyclic outline', () => {
    const node: PdfOutlineNode = { title: 'Loop' }
    node.items = [node]
    expect(chapterOutlineLevel([node])).toHaveLength(1)
  })
})

describe('cleanChapterTitle', () => {
  it('flattens the whitespace a bookmark was authored with', () => {
    expect(cleanChapterTitle('  Question   7\n(continued) ')).toBe('Question 7 (continued)')
  })

  it('drops the invisible characters Word leaves behind', () => {
    expect(cleanChapterTitle('﻿Question­ 12')).toBe('Question 12')
  })

  it('keeps the publisher wording as it is', () => {
    // Never rewritten: this is the document's own name for the section.
    expect(cleanChapterTitle('QUESTION 3: Trend Selection')).toBe('QUESTION 3: Trend Selection')
  })

  it('is empty for anything that is not a title', () => {
    expect(cleanChapterTitle(undefined)).toBe('')
    expect(cleanChapterTitle(42)).toBe('')
    expect(cleanChapterTitle('   ')).toBe('')
  })
})

describe('destPageNumber', () => {
  it('reads a destination that names its page index outright', () => {
    expect(destPageNumber([0, { name: 'XYZ' }])).toBe(1)
    expect(destPageNumber([11, { name: 'Fit' }])).toBe(12)
  })

  it('leaves a page reference to the document to resolve', () => {
    expect(destPageNumber([{ num: 42, gen: 0 }, { name: 'XYZ' }])).toBeNull()
  })

  it('refuses anything that is not a destination', () => {
    expect(destPageNumber(null)).toBeNull()
    expect(destPageNumber([])).toBeNull()
    expect(destPageNumber('SomeNamedDest')).toBeNull()
    expect(destPageNumber([-2])).toBeNull()
  })
})

describe('buildChapters', () => {
  it('keeps the bookmarks that resolved, in page order', () => {
    const chapters = buildChapters(
      [
        { title: 'Question 2', page: 9 },
        { title: 'Question 1', page: 4 },
        { title: 'Question 3', page: 14 },
      ],
      40,
    )
    expect(chapters).toEqual([
      { title: 'Question 1', startPage: 4 },
      { title: 'Question 2', startPage: 9 },
      { title: 'Question 3', startPage: 14 },
    ])
  })

  it('drops a bookmark that pointed nowhere rather than guessing a page', () => {
    const chapters = buildChapters(
      [{ title: 'Question 1', page: null }, { title: 'Question 2', page: 6 }],
      20,
    )
    expect(chapters).toEqual([{ title: 'Question 2', startPage: 6 }])
  })

  it('drops an untitled bookmark', () => {
    // An unnamed segment says only that something changes there.
    expect(buildChapters([{ title: '  ', page: 3 }], 20)).toEqual([])
  })

  it('collapses two bookmarks on one page to the first', () => {
    const chapters = buildChapters(
      [{ title: 'Question 4', page: 7 }, { title: 'Question 5', page: 7 }],
      20,
    )
    expect(chapters).toEqual([{ title: 'Question 4', startPage: 7 }])
  })

  it('clamps a bookmark that points past the end of the document', () => {
    expect(buildChapters([{ title: 'Appendix', page: 99 }], 12))
      .toEqual([{ title: 'Appendix', startPage: 12 }])
  })

  it('is empty for a document with no pages', () => {
    expect(buildChapters([{ title: 'Question 1', page: 1 }], 0)).toEqual([])
  })
})

describe('chapterAt', () => {
  const chapters = [
    { title: 'Question 1', startPage: 3 },
    { title: 'Question 2', startPage: 8 },
    { title: 'Question 3', startPage: 11 },
  ]

  it('finds the chapter a page is inside', () => {
    expect(chapterAt(chapters, 3)?.title).toBe('Question 1')
    expect(chapterAt(chapters, 7)?.title).toBe('Question 1')
    expect(chapterAt(chapters, 8)?.title).toBe('Question 2')
    expect(chapterAt(chapters, 40)?.title).toBe('Question 3')
  })

  it('leaves the front matter in no chapter', () => {
    expect(chapterAt(chapters, 1)).toBeNull()
    expect(chapterAt(chapters, 2)).toBeNull()
  })

  it('is null for a document with no chapters', () => {
    expect(chapterAt([], 5)).toBeNull()
    expect(chapterAt(chapters, NaN)).toBeNull()
  })
})
