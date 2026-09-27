import { describe, it, expect } from 'vitest'
import { readdir, readFile } from 'fs/promises'
import path from 'path'
import { fileURLToPath } from 'url'
import {
  buildKnowledgeBase,
  buildLlmsTxt,
  cleanVaultMarkdown,
  examKeyFromExamId,
  extractLinkTitles,
  normalizeTerm,
  readKnowledgeBaseSources,
  summarize,
  type KnowledgeBaseSources,
} from './knowledgeBase'
import { parseQuestion } from './parser'
import { KEYSTONE_EXAMS } from '../data/keystoneConcepts'

const REPO = 'ActuarialNotes/Actuarial-Notes-Wiki'
const SITE = { url: 'https://quiz.actuarialnotes.com', repo: REPO, branch: 'main', commit: 'abc123', builtAt: '2026-09-26T00:00:00.000Z' }

const block = (fields: string) => `---\n${fields}verification:\n  status: unverified\n  open_findings: 0\n  open_critical: 0\n---\n`

describe('cleanVaultMarkdown', () => {
  const clean = (md: string) => cleanVaultMarkdown(md, REPO, 'main')

  it('drops the frontmatter, HTML chrome and Obsidian comments', () => {
    const md = `${block('')}<div class="exam-nav"\n     data-current="P-1|Probability">\n</div>\n\n# Exam P-1\nText. %%hidden%%\n%%credential-path%%`
    expect(clean(md)).toBe('# Exam P-1\nText.')
  })

  it('turns links into their display text and figures into a link to the image', () => {
    expect(clean('See [[Conditional Probability|conditional probabilities]] and [[Resources/Books/Risk and Insurance (SOA)]].'))
      .toBe('See conditional probabilities and Risk and Insurance (SOA).')
    expect(clean('![[Media/Figures/Bayes_Theorem.svg|340]]'))
      .toBe(`[Figure: Bayes Theorem](https://raw.githubusercontent.com/${REPO}/main/Media/Figures/Bayes_Theorem.svg)`)
  })

  it('percent-encodes parentheses so a figure link survives a file name that has them', () => {
    const out = clean('![[Basic Ratemaking (Werner - 2016) - Cover.svg]]')
    const url = /\]\((.*)\)$/.exec(out)?.[1]
    expect(url).toBe(`https://raw.githubusercontent.com/${REPO}/main/Media/Attachments/Basic%20Ratemaking%20%28Werner%20-%202016%29%20-%20Cover.svg`)
    expect(summarize(out)).toBe('')
  })

  it('reads a link whose pipe is escaped for a table', () => {
    expect(clean('| [[Loss Ratio\\|LR]] |')).toBe('| LR |')
  })

  it('writes callout headers as bold lines, keeping a weight and a tag', () => {
    expect(clean('> [!example]- General Probability {23–30%}\n> Body')).toBe('> **General Probability (23–30%)**\n> Body')
    expect(clean('> [!example]- A Claim {Example}\n>\n> > [!answer]-\n> > 0.5'))
      .toBe('> **Example: A Claim**\n>\n> > **Answer**\n> > 0.5')
    expect(clean('> [!question]- Why study?')).toBe('> **Q: Why study?**')
  })

  it('leaves LaTeX exactly as authored', () => {
    const math = '$$P(H \\mid E) = \\frac{P(E \\mid H)\\,P(H)}{P(E)}$$'
    expect(clean(math)).toBe(math)
  })
})

describe('extractLinkTitles', () => {
  it('lists linked page names in order, once each, without embeds', () => {
    expect(extractLinkTitles('[[B]] ![[fig.svg]] [[Concepts/A|a]] [[b]] [[C#Heading|c]]')).toEqual(['B', 'A', 'C'])
  })
})

describe('summarize', () => {
  it('skips headings and a figure-only paragraph, and flattens the first paragraph', () => {
    const text = '# Title\n\n[Figure: x](https://e.com/a%28b%29.svg)\n\n**Bold** start of [a link](https://e.com).\n- next line'
    expect(summarize(text)).toBe('Bold start of a link. next line')
  })

  it('reads the paragraph that shares a block with its heading', () => {
    expect(summarize('# Exam P-1\nThe Probability exam.')).toBe('The Probability exam.')
  })

  it('cuts a long paragraph at a word', () => {
    const out = summarize('word '.repeat(200), 50)
    expect(out.length).toBeLessThanOrEqual(50)
    expect(out.endsWith('word…')).toBe(true)
  })
})

describe('normalizeTerm / examKeyFromExamId', () => {
  it('folds case, accents, apostrophes and hyphens', () => {
    expect(normalizeTerm('Bühlmann-Straub  Credibility')).toBe('buhlmann straub credibility')
    expect(normalizeTerm("Bayes' Theorem")).toBe('bayes theorem')
  })

  it('drops the SOA attempt suffix and nothing else', () => {
    expect(examKeyFromExamId('P-1')).toBe('P')
    expect(examKeyFromExamId('FM-2')).toBe('FM')
    expect(examKeyFromExamId('MAS-I')).toBe('MAS-I')
    expect(examKeyFromExamId('5')).toBe('5')
    expect(examKeyFromExamId('6C')).toBe('6C')
  })
})

describe('buildKnowledgeBase', () => {
  const question = (id: string, extra = '', critical = 0) =>
    `---\nid: "${id}"\nexam: "Probability"\ntopic: "Bayes"\nlearning_objective: "General Probability"\ndifficulty: easy\ntype: multiple-choice\nwiki_link:\n  - Concepts/Bayes+Theorem\nanswer: "B"\npoints: 1\n${extra}verification:\n  status: unverified\n  open_findings: ${critical}\n  open_critical: ${critical}\n---\n\nWhat is it?\n\n- A) 1\n- B) 2\n\n## Explanation\n\nBecause.`

  const sources: KnowledgeBaseSources = {
    pages: {
      'Exam P-1 (SOA).md': `${block('')}<div class="exam-nav" data-current="P-1|Probability"></div>\n\n# Exam P-1\nA probability exam.\n\n> [!example]- General Probability {23–30%}\n> Use [[Bayes Theorem]] and [[Conditional Probability|conditioning]].\n\n## Source Material\n> [!answer]- Source Material\n> - [[A First Course in Probability (Ross - 2019)]]\n>      - Chapters 1-8\n`,
      'Concepts/Bayes Theorem.md': `${block('')}**Bayes' Theorem** reverses [[Conditional Probability|conditional probabilities]].\n\nLinks to [[Uniform Discrete|Uniform]].`,
      'Concepts/Conditional Probability.md': `${block('')}The probability of A given B. See [[Uniform Continuous Distribution|Uniform]].`,
      'Concepts/Uniform Discrete.md': `${block('')}Equal mass.`,
      'Concepts/Uniform Continuous Distribution.md': `${block('')}Equal density.`,
      'Resources/Books/A First Course in Probability (Ross - 2019).md': `---\nTitle: A First Course in Probability\nAuthors: Sheldon Ross\nYear: "2019"\nAvailable from: "[pearson.com](https://www.pearson.com/ross)"\nverification:\n  status: verified\n  last_checked: 2026-09-01\n  sources:\n    - "Ross, A First Course in Probability (Pearson, 2019) — https://www.pearson.com/ross, Ch. 3"\n  open_findings: 0\n  open_critical: 0\n---\n![[A First Course in Probability (Ross - 2019) - Cover.svg]]\n\nThe Exam P text.`,
      'Guides/Exam P-1 (SOA)/Scoring.md': `---\nexam: Exam P-1 (SOA)\nsection: exam-day\norder: 2\n---\nPass marks are scaled.`,
      'Guides/Exam P-1 (SOA)/Format and pacing.md': `---\nexam: Exam P-1 (SOA)\nsection: exam-day\norder: 1\n---\nThirty questions in three hours.`,
      'Guides/How to Study for Actuarial Exams.md': 'Start with the syllabus.',
    },
    questions: {
      'questions/exam-p/p-001.md': question('p-001'),
      'questions/exam-p/p-002.md': question('p-002', 'off_syllabus: true\n'),
      'questions/exam-p/p-003.md': question('p-003', '', 1),
      'questions/exam-p/p-004.md': 'not a question',
    },
    catalog: [
      { page: 'Exam P-1 (SOA).md', exam_id: 'P-1', wiki_id: 'p-1', progress_key: 'P', body: 'SOA', bank: 'exam-p', status: 'ready' },
      { page: 'Exam 9 (CAS).md', exam_id: '9', wiki_id: '9-1', progress_key: 'CAS-9', body: 'CAS', bank: null, status: 'development' },
    ],
    aliases: { "bayes' rule": 'Bayes Theorem', 'no such': 'Missing Page' },
    keystones: [{ id: 'P', concepts: [{ name: 'Bayes Theorem', why: 'Reverses conditioning.' }] }],
    site: SITE,
  }
  const kb = buildKnowledgeBase(sources)
  const doc = (id: string) => kb.docs.find(d => d.id === id)!

  it('reads an exam page into objectives, readings, keystones, guides and a question count', () => {
    expect(kb.exams).toHaveLength(1) // a catalog row with no page is skipped
    const [exam] = kb.exams
    expect(exam).toMatchObject({
      key: 'P',
      examId: 'P-1',
      name: 'Exam P-1',
      subject: 'Probability',
      status: 'ready',
      docId: 'exam/P',
      url: 'https://quiz.actuarialnotes.com/wiki/exam/Exam+P-1+%28SOA%29',
      summary: 'A probability exam.',
      objectives: [{ title: 'General Probability', weight: '23–30%', concepts: ['Bayes Theorem', 'Conditional Probability'] }],
      readings: [{ title: 'A First Course in Probability (Ross - 2019)', detail: 'Chapters 1-8', docId: 'resource/A First Course in Probability (Ross - 2019)' }],
      keystones: [{ name: 'Bayes Theorem', why: 'Reverses conditioning.' }],
      bank: 'exam-p',
    })
    // In their authored order, not alphabetical.
    expect(exam.guides.map(g => g.title)).toEqual(['Format and pacing', 'Scoring'])
    // p-002 is off-syllabus and p-003 withheld: only p-001 can be drawn.
    expect(exam.questionCount).toBe(1)
  })

  it('files each page with its kind, url, exams and fact check', () => {
    expect(doc('concept/Bayes Theorem')).toMatchObject({
      kind: 'concept',
      url: 'https://quiz.actuarialnotes.com/wiki/concept/Bayes+Theorem',
      exams: ['P'],
      links: ['Conditional Probability', 'Uniform Discrete'],
      factCheck: { status: 'unverified', label: 'Not fact checked' },
    })
    const book = doc('resource/A First Course in Probability (Ross - 2019)')
    expect(book).toMatchObject({
      exams: ['P'],
      summary: 'The Exam P text.',
      aliases: ['A First Course in Probability'],
      meta: { category: 'book', Authors: 'Sheldon Ross', 'Available from': 'https://www.pearson.com/ross' },
      factCheck: { status: 'verified', checked: '2026-09-01' },
    })
    expect(book.factCheck.sources[0]).toMatchObject({ url: 'https://www.pearson.com/ross', locator: 'Ch. 3' })
    expect(doc('guide/Exam P-1 (SOA)/Scoring')).toMatchObject({ kind: 'guide', title: 'Exam P-1: Scoring', exams: ['P'] })
    expect(doc('guide/How to Study for Actuarial Exams').exams).toEqual([])
  })

  it('withholds a critically flagged question and drops what the app cannot parse', () => {
    expect(kb.questions.map(q => q.id)).toEqual(['p-001', 'p-002'])
    expect(kb.withheld).toEqual([{ id: 'p-003', exam: 'P', reason: expect.stringMatching(/critical/) }])
    expect(kb.questions[0]).toMatchObject({
      exam: 'P',
      bank: 'exam-p',
      url: 'https://quiz.actuarialnotes.com/quiz?ids=p-001',
      concepts: ['Bayes Theorem'],
      answer: 'B',
      options: [{ key: 'A', text: '1' }, { key: 'B', text: '2' }],
      explanation: 'Because.',
      offSyllabus: false,
    })
    expect(kb.questions[1].offSyllabus).toBe(true)
  })

  it('learns aliases from the curated table and from unambiguous link text', () => {
    expect(kb.aliases['bayes rule']).toBe('Bayes Theorem')
    expect(kb.aliases['conditioning']).toBe('Conditional Probability')
    expect(kb.aliases['conditional probabilities']).toBe('Conditional Probability')
    // "Uniform" names two different pages, so it names neither.
    expect(kb.aliases['uniform']).toBeUndefined()
    // A variant for a page the vault doesn't have is dropped.
    expect(kb.aliases['no such']).toBeUndefined()
    expect(doc('concept/Bayes Theorem').aliases).toContain('bayes rule')
  })

  it('stamps the build', () => {
    expect(kb).toMatchObject({ version: 1, commit: 'abc123', site: SITE.url, counts: { exams: 1, concepts: 4, resources: 1, guides: 3, questions: 2, withheld: 1 } })
  })

  it('writes an llms.txt that points at the connector', () => {
    const txt = buildLlmsTxt(kb, 'https://quiz.actuarialnotes.com/api/mcp', 'https://quiz.actuarialnotes.com/ai/skill.zip')
    expect(txt).toMatch(/^# Actuarial Notes\n/)
    expect(txt).toContain('- [Exam P-1 — Probability](https://quiz.actuarialnotes.com/wiki/exam/Exam+P-1+%28SOA%29): SOA · complete, 1 practice questions')
    expect(txt).toContain('[How to Study for Actuarial Exams]')
    expect(txt).toContain('(https://quiz.actuarialnotes.com/api/mcp)')
  })
})

// ── The real vault ───────────────────────────────────────────────────────────
// The export is what an assistant reads, so the vault itself is the fixture:
// every exam in the catalogue, every question the app parses, and every URL an
// assistant will cite.

const REPO_ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '../../..')

describe('the knowledge base built from the vault', async () => {
  const sources = await readKnowledgeBaseSources({
    list: async dir => (await readdir(path.join(REPO_ROOT, dir), { withFileTypes: true }).catch(() => []))
      .map(e => ({ name: e.name, isDirectory: e.isDirectory() })),
    read: file => readFile(path.join(REPO_ROOT, file), 'utf-8').catch(() => null),
  })
  const kb = buildKnowledgeBase({ ...sources, keystones: KEYSTONE_EXAMS, site: SITE })

  it('has every exam in the catalogue, each with its objectives', () => {
    expect(kb.exams.map(e => e.examId).sort()).toEqual(sources.catalog.map(r => r.exam_id).sort())
    for (const exam of kb.exams) expect(exam.objectives.length, exam.name).toBeGreaterThan(0)
  })

  it('carries every question the app parses, or says why not', () => {
    const parsed = new Set(Object.values(sources.questions).map(parseQuestion).filter(q => q !== null).map(q => q!.id))
    expect(kb.questions.length + kb.withheld.length).toBe(parsed.size)
  })

  it('gives every page and question a unique id and a citable https url', () => {
    const ids = [...kb.docs.map(d => d.id), ...kb.questions.map(q => `question/${q.id}`)]
    expect(new Set(ids).size).toBe(ids.length)
    for (const item of [...kb.docs, ...kb.questions]) {
      expect(item.url, item.id).toMatch(/^https:\/\/[^\s()]+$/)
    }
  })

  it("links each exam reading to the vault's page for it when there is one", () => {
    const resources = new Set(kb.docs.filter(d => d.kind === 'resource').map(d => d.title.toLowerCase()))
    for (const exam of kb.exams) {
      for (const reading of exam.readings) {
        expect(reading.docId !== null, `${exam.name}: ${reading.title}`).toBe(resources.has(reading.title.toLowerCase()))
      }
    }
  })

  it('points every alias at a concept page that exists', () => {
    const concepts = new Set(kb.docs.filter(d => d.kind === 'concept').map(d => d.title))
    for (const [alias, target] of Object.entries(kb.aliases)) expect(concepts.has(target), alias).toBe(true)
  })
})
