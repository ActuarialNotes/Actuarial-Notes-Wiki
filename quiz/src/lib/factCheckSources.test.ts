import { describe, it, expect } from 'vitest'
import {
  citedSources,
  matchSourcePage,
  resourcePagePath,
  syllabusSourcePages,
  type SourcePage,
} from './factCheckSources'
import type { WikiExamSyllabus } from './wikiParser'

function syllabus(
  fileName: string,
  examId: string,
  resources: Array<{ name: string; target?: string }>,
): WikiExamSyllabus {
  return {
    examId,
    examLabel: `Exam ${examId.replace(/-\d+$/, '')}`,
    examTopic: 'Topic',
    fileName,
    topics: [] as WikiExamSyllabus['topics'],
    resources: resources.map(r => ({ name: r.name, target: r.target ?? r.name })),
  }
}

const EXAM_P = syllabus('Exam P-1 (SOA)', 'P-1', [
  { name: 'A First Course in Probability (Ross - 2019)' },
  { name: 'Probability (Leemis - 2018)' },
])

const EXAM_5 = syllabus('Exam 5 (CAS)', '5-1', [
  { name: 'Basic Ratemaking (Werner - 2016)' },
  { name: 'Estimating Unpaid Claims Using Basic Techniques (Friedland - 2010)' },
  { name: 'ASOP 43 - Property Casualty Unpaid Claim Estimates (ASB - 2007)' },
  { name: 'Probability (Leemis - 2018)' },
  { name: 'CIA Bias', target: 'Resources/Regulation/CIA Bias' },
])

const PAGES = syllabusSourcePages([EXAM_P, EXAM_5])

describe('resourcePagePath', () => {
  it('resolves a bare source-material link to its Resources/Books page', () => {
    expect(resourcePagePath('Probability (Leemis - 2018)', 'Probability (Leemis - 2018)'))
      .toBe('Resources/Books/Probability (Leemis - 2018).md')
  })

  it('keeps a link that names its own path', () => {
    expect(resourcePagePath('Resources/Regulation/CIA Bias', 'CIA Bias'))
      .toBe('Resources/Regulation/CIA Bias.md')
  })
})

describe('syllabusSourcePages', () => {
  it('collects every reading of every exam, once each, in syllabus order', () => {
    expect(PAGES.map(p => p.name)).toEqual([
      'A First Course in Probability (Ross - 2019)',
      'Probability (Leemis - 2018)',
      'Basic Ratemaking (Werner - 2016)',
      'Estimating Unpaid Claims Using Basic Techniques (Friedland - 2010)',
      'ASOP 43 - Property Casualty Unpaid Claim Estimates (ASB - 2007)',
      'CIA Bias',
    ])
    expect(PAGES[2].path).toBe('Resources/Books/Basic Ratemaking (Werner - 2016).md')
  })
})

describe('matchSourcePage', () => {
  it('matches a citation that names the book its own way', () => {
    expect(matchSourcePage(PAGES, 'Werner & Modlin, Basic Ratemaking (CAS, 5th ed. May 2016)')?.name)
      .toBe('Basic Ratemaking (Werner - 2016)')
    expect(matchSourcePage(PAGES, 'Friedland, Estimating Unpaid Claims Using Basic Techniques (CAS, 3rd ed. 2010)')?.name)
      .toBe('Estimating Unpaid Claims Using Basic Techniques (Friedland - 2010)')
  })

  it('sees through the punctuation a standard is cited with', () => {
    expect(matchSourcePage(PAGES, 'ASOP No. 43, Property/Casualty Unpaid Claim Estimates (ASB, June 2007)')?.name)
      .toBe('ASOP 43 - Property Casualty Unpaid Claim Estimates (ASB - 2007)')
  })

  it('refuses a source the vault has no page for rather than picking a neighbour', () => {
    expect(matchSourcePage(PAGES, 'CAS Exam 5 Content Outline, Fall 2026')).toBeNull()
    // "Probability" alone would be satisfied by *A First Course in Probability*
    // if the test ran the other way round; every word of the page's title has
    // to be in the citation, not the reverse.
    expect(matchSourcePage(PAGES, 'Ross, A First Course in Probability (Pearson, 10th ed. 2019)')?.name)
      .toBe('A First Course in Probability (Ross - 2019)')
  })

  it('prefers the most specific title when two could answer', () => {
    const cited = 'Ross, A First Course in Probability, with the Leemis Probability tables'
    expect(matchSourcePage(PAGES, cited)?.name).toBe('A First Course in Probability (Ross - 2019)')
  })

  it('holds a one-word page name to a distinctive word', () => {
    const thin: SourcePage[] = [{ name: 'CIA', path: 'Resources/Regulation/CIA.md' }]
    expect(matchSourcePage(thin, 'CIA Educational Note, Bias in Assumptions')).toBeNull()
  })
})

describe('citedSources', () => {
  it('cuts each citation into name, pages and link, and finds its page', () => {
    const raw =
      'Werner & Modlin, Basic Ratemaking (CAS, 5th ed. May 2016), ' +
      `Ch. 8 pp.142-148 (PDF pp.154-160), sha256:${'6'.repeat(64)} — ` +
      'https://www.casact.org/sites/default/files/old/studynotes_werner_modlin_ratemaking.pdf'
    expect(citedSources([raw], PAGES)).toEqual([
      {
        raw,
        label: 'Werner & Modlin, Basic Ratemaking (CAS, 5th ed. May 2016)',
        locator: 'Ch. 8 pp.142-148 (PDF pp.154-160)',
        url: 'https://www.casact.org/sites/default/files/old/studynotes_werner_modlin_ratemaking.pdf',
        page: { name: 'Basic Ratemaking (Werner - 2016)', path: 'Resources/Books/Basic Ratemaking (Werner - 2016).md' },
      },
    ])
  })

  it('keeps an unmatched citation, with no page behind it', () => {
    const [source] = citedSources(['CAS Exam 5 Content Outline, Fall 2026, p.6'], PAGES)
    expect(source.label).toBe('CAS Exam 5 Content Outline, Fall 2026')
    expect(source.locator).toBe('p.6')
    expect(source.page).toBeNull()
  })

  it('drops the blanks a hand-edited block leaves behind', () => {
    expect(citedSources(['', '   '], PAGES)).toEqual([])
  })
})
