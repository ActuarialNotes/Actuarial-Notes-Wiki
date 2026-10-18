import { describe, it, expect } from 'vitest'
import { existsSync, readdirSync, readFileSync } from 'fs'
import path from 'path'
import { fileURLToPath } from 'url'
import {
  cleanReadingDetail,
  documentPathsByName,
  extractSourceMaterial,
  filterSourcesByObjectives,
  objectiveFilterOptions,
  parseSyllabusObjectives,
  readingObjectives,
  sourceEntryRef,
  SOURCE_MATERIAL_MARKER,
  type SourceMaterialEntry,
} from './sourceMaterial'

const REPO_ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '../../..')

describe('extractSourceMaterial', () => {
  const examPage = [
    '## Learning Objectives',
    '> [!example]- General Probability {23-30%}',
    '> 1. Define [[Bayes Theorem]].',
    '',
    '## Source Material',
    '> [!answer]- Source Material',
    '>',
    '> - [[A First Course in Probability (Ross - 2019)]]',
    '>      - Chapters 1-8, Excluding 4.8.4, 5.6.2',
    '> - [[Probability (Leemis - 2018)]]',
    '>      - Chapters 1-8',
    '',
    '## Exam Details',
  ].join('\n')

  it('lifts each source and its reading assignment out of the callout', () => {
    const { entries } = extractSourceMaterial(examPage)
    expect(entries).toEqual([
      {
        name: 'A First Course in Probability (Ross - 2019)',
        target: 'A First Course in Probability (Ross - 2019)',
        label: 'A First Course in Probability (Ross - 2019)',
        detail: 'Chapters 1-8, Excluding 4.8.4, 5.6.2',
      },
      {
        name: 'Probability (Leemis - 2018)',
        target: 'Probability (Leemis - 2018)',
        label: 'Probability (Leemis - 2018)',
        detail: 'Chapters 1-8',
      },
    ])
  })

  it('replaces the callout with the marker and leaves the rest of the page alone', () => {
    const { markdown } = extractSourceMaterial(examPage)
    expect(markdown).toContain(SOURCE_MATERIAL_MARKER)
    expect(markdown).not.toContain('[!answer]')
    expect(markdown).not.toContain('[[Probability (Leemis - 2018)]]')
    expect(markdown).toContain('## Source Material')
    expect(markdown).toContain('> [!example]- General Probability {23-30%}')
    expect(markdown).toContain('## Exam Details')
  })

  it('reads a header with a count tag and no space after the quote marker', () => {
    const md = [
      '>[!answer]- Source Material {6 Sources}',
      '> ',
      '> - [[Basic Ratemaking (Werner - 2016)]]',
      '>      - A1–A15, A17',
    ].join('\n')
    const { entries } = extractSourceMaterial(md)
    expect(entries).toHaveLength(1)
    expect(entries[0].name).toBe('Basic Ratemaking (Werner - 2016)')
    expect(entries[0].detail).toBe('A1–A15, A17')
  })

  it('accepts a bullet with no space before the link', () => {
    const md = [
      '> [!answer]- Source Material',
      '> -[[An Introduction to Generalized Linear Models (Dobson - 2018)]]',
      '>      - C1–C9',
    ].join('\n')
    const { entries } = extractSourceMaterial(md)
    expect(entries).toHaveLength(1)
    expect(entries[0].detail).toBe('C1–C9')
  })

  it('keeps an alias as the label but the page name as the target', () => {
    const md = [
      '> [!answer]- Source Material',
      '> - [[Resources/Books/Probability (Leemis - 2018)|Leemis]]',
    ].join('\n')
    const { entries } = extractSourceMaterial(md)
    expect(entries[0]).toMatchObject({
      name: 'Probability (Leemis - 2018)',
      target: 'Resources/Books/Probability (Leemis - 2018)',
      label: 'Leemis',
    })
  })

  it('stops at the next callout instead of swallowing it', () => {
    const md = [
      '> [!answer]- Source Material',
      '> - [[Probability (Leemis - 2018)]]',
      '> [!info]- Exam day',
      '> Bring a calculator.',
    ].join('\n')
    const { markdown, entries } = extractSourceMaterial(md)
    expect(entries).toHaveLength(1)
    expect(markdown).toContain('> [!info]- Exam day')
    expect(markdown).toContain('> Bring a calculator.')
  })

  it('joins several reading bullets under one source', () => {
    const md = [
      '> [!answer]- Source Material',
      '> - [[Basic Ratemaking (Werner - 2016)]]',
      '>      - A1–A15',
      '>      - A17',
    ].join('\n')
    expect(extractSourceMaterial(md).entries[0].detail).toBe('A1–A15; A17')
  })

  it('does not hand a skipped duplicate its readings to the entry above', () => {
    const md = [
      '> [!answer]- Source Material',
      '> - [[Probability (Leemis - 2018)]]',
      '>      - Chapters 1-8',
      '> - [[Probability (Leemis - 2018)]]',
      '>      - Chapters 9-10',
    ].join('\n')
    const { entries } = extractSourceMaterial(md)
    expect(entries).toHaveLength(1)
    expect(entries[0].detail).toBe('Chapters 1-8')
  })

  it('leaves a page with no source-material callout untouched', () => {
    const md = '## Learning Objectives\n> [!example]- A {10%}\n> 1. Do the thing.'
    expect(extractSourceMaterial(md)).toEqual({ markdown: md, entries: [], objectiveFilter: true })
  })

  it('ignores an [!answer] callout that is not the source-material list', () => {
    const md = '> [!answer]- Solution\n> - [[Bayes Theorem]]'
    expect(extractSourceMaterial(md).entries).toEqual([])
  })
})

describe('cleanReadingDetail', () => {
  it('flattens an Obsidian inline footnote into parentheses', () => {
    expect(cleanReadingDetail('Chapters 1–7^[excluding 1.2.1, 1.8]'))
      .toBe('Chapters 1–7 (excluding 1.2.1, 1.8)')
  })

  it('drops the stray trailing pipe the vault carries', () => {
    expect(cleanReadingDetail('Chapters 1–6^[excluding 2.6]|'))
      .toBe('Chapters 1–6 (excluding 2.6)')
  })

  it('leaves a plain reading range alone', () => {
    expect(cleanReadingDetail('Chapters 1-11')).toBe('Chapters 1-11')
  })

  it('cuts a wiki link in a note down to the text it shows', () => {
    expect(cleanReadingDetail('A1 — replaced by [[CFAI]] for Fall 2026'))
      .toBe('A1 — replaced by CFAI for Fall 2026')
    expect(cleanReadingDetail('A1 — see [[Resources/Books/CIA Bias|the CIA paper]]'))
      .toBe('A1 — see the CIA paper')
  })
})

describe('readingObjectives', () => {
  it('expands a run within a section and keeps syllabus order', () => {
    expect(readingObjectives('C1-C5, A1')).toEqual(['A1', 'C1', 'C2', 'C3', 'C4', 'C5'])
    expect(readingObjectives('A1–A3, A6, A11 — CAS Study Note, March 1993'))
      .toEqual(['A1', 'A2', 'A3', 'A6', 'A11'])
  })

  it('reads each joined reading and stops at the note', () => {
    expect(readingObjectives('A1–A2; A17')).toEqual(['A1', 'A2', 'A17'])
    expect(readingObjectives('A1 — replaced by CFAI for Fall 2026')).toEqual(['A1'])
    expect(readingObjectives('B1–B2 (Chapter 7)')).toEqual(['B1', 'B2'])
  })

  it('reads chapters and bare numbers as no objective', () => {
    expect(readingObjectives('Chapters 1–7 (excluding 1.2.1)')).toEqual([])
    expect(readingObjectives('1–10')).toEqual([])
    expect(readingObjectives(undefined)).toEqual([])
  })

  it('keeps only the two ends of a run across sections', () => {
    expect(readingObjectives('B8–C2')).toEqual(['B8', 'C2'])
  })
})

describe('parseSyllabusObjectives', () => {
  const page = [
    '## Learning Objectives',
    '',
    '> [!example]- A. Regulation of Insurance {20–25%}',
    '> Understand the role of the [[Insurance Industry|insurance business]].',
    '> 1. Discuss the current state of [[Insurance Regulation]] in Canada — the [[OSFI]] …',
    '> 2. Discuss [[Court Case]] decisions (e.g., the [[Duty to Defend]]).',
    '>',
    '> **Readings:** Baer and Rendall',
    '',
    '> [!example]- B. Government Programs {10–15%}',
    '> 1. Describe the origin of [[Agricultural Insurance|agricultural programs]]; and more.',
    '',
    'Some prose.',
    '> 3. Not an objective.',
  ].join('\n')

  it('codes each item by its section letter and its own number', () => {
    expect(parseSyllabusObjectives(page)).toEqual([
      {
        code: 'A1',
        section: 'A',
        sectionTitle: 'A. Regulation of Insurance',
        summary: 'Discuss the current state of Insurance Regulation in Canada',
      },
      {
        code: 'A2',
        section: 'A',
        sectionTitle: 'A. Regulation of Insurance',
        summary: 'Discuss Court Case decisions',
      },
      {
        code: 'B1',
        section: 'B',
        sectionTitle: 'B. Government Programs',
        summary: 'Describe the origin of agricultural programs',
      },
    ])
  })

  it('keeps a numbering that runs straight through the sections', () => {
    const md = [
      '> [!example]- A. Ratemaking {45–55%}',
      '> 17. Understand rates.',
      '> [!example]- B. Reserving {45–55%}',
      '> 18. Organize reserving data.',
    ].join('\n')
    expect(parseSyllabusObjectives(md).map(o => o.code)).toEqual(['A17', 'B18'])
  })

  it('numbers nothing in a callout with no section letter', () => {
    expect(parseSyllabusObjectives('> [!example]- General Probability {23-30%}\n> 1. Define it.')).toEqual([])
  })
})

describe('the learning-objective filter', () => {
  const objectives = parseSyllabusObjectives([
    '> [!example]- A. Regulation {20–25%}',
    '> 1. Discuss regulation.',
    '> 2. Discuss court cases.',
    '> [!example]- C. Financial Reporting {60–70%}',
    '> 1. Describe the annual return.',
    '> 2. Value liabilities.',
  ].join('\n'))
  const entries: SourceMaterialEntry[] = [
    { name: 'Marshall', target: 'Marshall', label: 'Marshall', detail: 'A1' },
    { name: 'CIA CSOP', target: 'CIA CSOP', label: 'CIA CSOP', detail: 'A1, C1-C2' },
    { name: 'Davidson', target: 'Davidson', label: 'Davidson', detail: 'A2' },
    { name: 'CIA PAA', target: 'CIA PAA', label: 'CIA PAA', detail: 'C1, C2' },
  ]

  it('offers every cited objective, named, grouped and counted', () => {
    expect(objectiveFilterOptions(entries, objectives)).toEqual([
      { value: 'A1', label: 'A1', hint: 'Discuss regulation', group: 'A. Regulation', count: 2 },
      { value: 'A2', label: 'A2', hint: 'Discuss court cases', group: 'A. Regulation', count: 1 },
      { value: 'C1', label: 'C1', hint: 'Describe the annual return', group: 'C. Financial Reporting', count: 2 },
      { value: 'C2', label: 'C2', hint: 'Value liabilities', group: 'C. Financial Reporting', count: 2 },
    ])
  })

  it('offers nothing when a reading cites a code the page does not number', () => {
    const stray = [...entries, { name: 'X', target: 'X', label: 'X', detail: 'B7' }]
    expect(objectiveFilterOptions(stray, objectives)).toEqual([])
  })

  it('offers nothing with fewer than two objectives to tell apart', () => {
    expect(objectiveFilterOptions(entries.slice(0, 1), objectives)).toEqual([])
  })

  it('keeps the sources read for any chosen objective, in page order', () => {
    expect(filterSourcesByObjectives(entries, new Set(['A2', 'C2'])).map(e => e.name))
      .toEqual(['CIA CSOP', 'Davidson', 'CIA PAA'])
    expect(filterSourcesByObjectives(entries, new Set())).toBe(entries)
  })
})

// Exam 6C's shelf is the one the filter was built for: sixty-seven readings
// over eleven objectives. Every reading has to say which objectives it is read
// for in codes the page numbers, or it drops out of every filtered view.
describe('Exam 6C (CAS).md source material', () => {
  const md = readFileSync(path.join(REPO_ROOT, 'Exam 6C (CAS).md'), 'utf-8')
  const { entries } = extractSourceMaterial(md)
  const objectives = parseSyllabusObjectives(md)

  it('numbers A1–A3, B1–B3 and C1–C5', () => {
    expect(objectives.map(o => o.code)).toEqual([
      'A1', 'A2', 'A3', 'B1', 'B2', 'B3', 'C1', 'C2', 'C3', 'C4', 'C5',
    ])
  })

  it('cites at least one objective the page numbers for every reading', () => {
    const codes = new Set(objectives.map(o => o.code))
    for (const entry of entries) {
      const cited = readingObjectives(entry.detail)
      expect(cited, entry.name).not.toEqual([])
      for (const code of cited) expect(codes.has(code), `${entry.name}: ${code}`).toBe(true)
    }
  })

  // The Fall 2026 outline renumbered domain C's tasks but its reading table
  // kept the Fall 2025 codes, so a filter would file the IFRS 17 notes under
  // reinsurance accounting. The page switches it off until the two agree.
  it('switches its objective filter off', () => {
    expect(extractSourceMaterial(md).objectiveFilter).toBe(false)
  })

  it('prints a note naming another source as text, not as a wiki link', () => {
    for (const entry of entries) expect(entry.detail ?? '', entry.name).not.toContain('[[')
  })
})

// Exam 5's page numbers its tasks as the Fall 2026 (v02) outline does — A1–A18,
// B1–B20 — so every reading's codes name an objective and the shelf filters.
describe('Exam 5 (CAS).md source material', () => {
  const md = readFileSync(path.join(REPO_ROOT, 'Exam 5 (CAS).md'), 'utf-8')
  const { entries, objectiveFilter } = extractSourceMaterial(md)
  const objectives = parseSyllabusObjectives(md)

  it('numbers A1–A18 and B1–B20', () => {
    expect(objectives.map(o => o.code)).toEqual([
      ...Array.from({ length: 18 }, (_, i) => `A${i + 1}`),
      ...Array.from({ length: 20 }, (_, i) => `B${i + 1}`),
    ])
  })

  it('offers a filter over every cited objective', () => {
    expect(objectiveFilter).toBe(true)
    expect(objectiveFilterOptions(entries, objectives).length).toBeGreaterThan(1)
  })
})

// MAS-I numbers each domain's tasks the way the CAS outline does (A1–A6,
// B1–B9, C1–C9), so its readings' task codes name objectives on the page.
describe('Exam MAS-I (CAS).md source material', () => {
  const md = readFileSync(path.join(REPO_ROOT, 'Exam MAS-I (CAS).md'), 'utf-8')
  const { entries } = extractSourceMaterial(md)
  const objectives = parseSyllabusObjectives(md)

  it('numbers A1–A6, B1–B9 and C1–C9', () => {
    expect(objectives.map(o => o.code)).toEqual([
      ...['A1', 'A2', 'A3', 'A4', 'A5', 'A6'],
      ...['B1', 'B2', 'B3', 'B4', 'B5', 'B6', 'B7', 'B8', 'B9'],
      ...['C1', 'C2', 'C3', 'C4', 'C5', 'C6', 'C7', 'C8', 'C9'],
    ])
  })

  it('cites at least one objective the page numbers for every reading', () => {
    const codes = new Set(objectives.map(o => o.code))
    for (const entry of entries) {
      const cited = readingObjectives(entry.detail)
      expect(cited, entry.name).not.toEqual([])
      for (const code of cited) expect(codes.has(code), `${entry.name}: ${code}`).toBe(true)
    }
  })
})

describe('the objective-filter switch', () => {
  const page = (extra: string) => [
    '> [!answer]- Source Material',
    extra,
    '> - [[A Book]]',
    '>      - A1',
  ].filter(Boolean).join('\n')

  it('is on unless the callout says otherwise', () => {
    expect(extractSourceMaterial(page('')).objectiveFilter).toBe(true)
    expect(extractSourceMaterial('# No shelf').objectiveFilter).toBe(true)
  })

  it('is off for a callout carrying the comment, with or without a reason', () => {
    expect(extractSourceMaterial(page('> %%objective-filter: off%%')).objectiveFilter).toBe(false)
    const off = extractSourceMaterial(page('> %%objective-filter: off — codes out of step%%'))
    expect(off.objectiveFilter).toBe(false)
    expect(off.entries.map(e => e.name)).toEqual(['A Book'])
  })
})

describe('sourceEntryRef', () => {
  const entry = (target: string): SourceMaterialEntry => {
    const name = target.split('/').pop()!
    return { name, target, label: name }
  }

  it('opens a bare-named reading as the resource page the index has for it', () => {
    expect(sourceEntryRef(entry('CIA Discount Rates'), 'Resources/Books/CIA Discount Rates.md'))
      .toEqual({ kind: 'resource', name: 'CIA Discount Rates' })
  })

  it('keeps a bare name with no resource page a concept', () => {
    expect(sourceEntryRef(entry('Actuarial Standards of Practice')))
      .toEqual({ kind: 'concept', name: 'Actuarial Standards of Practice' })
  })

  it('keeps a link that already says where it goes', () => {
    expect(sourceEntryRef(entry('Resources/Books/PACICC'), 'Resources/Books/PACICC.md'))
      .toEqual({ kind: 'resource', name: 'PACICC' })
  })

  // Every reading on every exam page opens a page that exists: the bug was
  // Exam 6C's `[[CIA Discount Rates]]` opening Concepts/CIA Discount Rates.md.
  it('sends every exam page reading to a file in the vault', () => {
    const books = readdirSync(path.join(REPO_ROOT, 'Resources/Books'))
      .filter(f => f.endsWith('.md'))
      .map(f => ({ category: 'document', name: f.slice(0, -3), path: `Resources/Books/${f}` }))
    const paths = documentPathsByName(books)
    const exams = readdirSync(REPO_ROOT).filter(f => /^Exam .*\.md$/.test(f))
    for (const exam of exams) {
      const md = readFileSync(path.join(REPO_ROOT, exam), 'utf8')
      for (const e of extractSourceMaterial(md).entries) {
        const ref = sourceEntryRef(e, paths.get(e.name.toLowerCase()))
        const file = ref.kind === 'resource' ? `Resources/Books/${ref.name}.md` : `Concepts/${ref.name}.md`
        expect(existsSync(path.join(REPO_ROOT, file)), `${exam}: ${e.target} → ${file}`).toBe(true)
      }
    }
  })
})
