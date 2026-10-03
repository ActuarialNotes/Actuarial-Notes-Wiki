import { describe, expect, it } from 'vitest'
import books from 'virtual:store-books'
import { buildStoreBooks, linkTarget } from './storeBooks'
import { readingExamKey } from './store'
import { isbnDigits } from './resourceMeta'

const EXAM_P = {
  name: 'Exam P-1 (SOA)',
  markdown: [
    '# Exam P',
    '> [!answer]- Source Material',
    '> - [[A First Course in Probability (Ross - 2019)|Ross]]',
    '>   - Chapters 1–5',
    '> - [[Probability Monograph]]',
  ].join('\n'),
}
const EXAM_MAS = {
  name: 'Exam MAS-I (CAS)',
  markdown: ['> [!answer]- Source Material', '> - [[A First Course in Probability (Ross - 2019)]]'].join('\n'),
}

const ROSS = {
  name: 'A First Course in Probability (Ross - 2019)',
  attrs: { Title: 'A First Course in Probability', Authors: 'Sheldon Ross', Year: '2019', Edition: '10th', Type: 'Textbook', ISBN: '978-0-13-475311-9' },
  coverImage: 'https://example.org/ross.svg',
}

describe('buildStoreBooks', () => {
  it('lists a textbook with every exam that assigns it, in syllabus order, with the chapters', () => {
    const [book] = buildStoreBooks([EXAM_MAS, EXAM_P], [ROSS])
    expect(book).toMatchObject({
      name: ROSS.name,
      title: 'A First Course in Probability',
      authors: 'Sheldon Ross',
      year: 2019,
      edition: '10th',
      isbn: '978-0-13-475311-9',
      coverImage: 'https://example.org/ross.svg',
    })
    expect(book!.readings).toEqual([{ exam: 'Exam P-1', detail: 'Chapters 1–5' }, { exam: 'Exam MAS-I' }])
  })

  it('leaves out what a candidate does not buy, and what no exam assigns', () => {
    const monograph = { name: 'Probability Monograph', attrs: { Type: 'Monograph', ISBN: '978-1-7333294-3-9' } }
    const noIsbn = { name: 'A First Course in Probability (Ross - 2019)', attrs: { Type: 'Textbook' } }
    const unassigned = { name: 'Some Other Book', attrs: { Type: 'Textbook', ISBN: '978-0-13-475311-9' } }
    expect(buildStoreBooks([EXAM_P], [monograph, noIsbn, unassigned])).toEqual([])
  })

  it('names the publisher’s free copy when the page has one', () => {
    const free = { ...ROSS, attrs: { ...ROSS.attrs, 'Available from': '[statlearning.com](https://www.statlearning.com/)' } }
    expect(buildStoreBooks([EXAM_P], [free])[0]!.freeUrl).toBe('https://www.statlearning.com/')
  })
})

describe('linkTarget', () => {
  it('reads a markdown link or a bare URL, and nothing else', () => {
    expect(linkTarget('[x](https://a.org/b)')).toBe('https://a.org/b')
    expect(linkTarget('https://a.org/b')).toBe('https://a.org/b')
    expect(linkTarget('the library')).toBeUndefined()
    expect(linkTarget(undefined)).toBeUndefined()
  })
})

describe('virtual:store-books', () => {
  it('has the vault’s textbooks, each well formed', () => {
    expect(books.length).toBeGreaterThan(10)
    for (const book of books) {
      expect(isbnDigits(book.isbn), book.name).toBeDefined()
      expect(book.readings.length, book.name).toBeGreaterThan(0)
      for (const r of book.readings) expect(readingExamKey(r.exam), `${book.name}: ${r.exam}`).toBeDefined()
    }
  })
})
