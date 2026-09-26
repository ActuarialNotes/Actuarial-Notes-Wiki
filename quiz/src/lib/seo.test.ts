import { describe, it, expect } from 'vitest'
import { readdirSync, readFileSync } from 'fs'
import path from 'path'
import { fileURLToPath } from 'url'
import {
  DEFAULT_DESCRIPTION,
  DEFAULT_TITLE,
  DESCRIPTION_MAX,
  SITE_NAME,
  buildSeoPages,
  clampText,
  composeTitle,
  conceptSeo,
  countQuestionsByExam,
  examSeo,
  fallbackHead,
  headTagsHtml,
  inlineMarkdownToText,
  isStubPage,
  jsonForScript,
  latexToText,
  leadParagraph,
  pageHead,
  resourceSeo,
  sitemapXml,
  type SeoPage,
} from './seo'

const QUIZ_ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '../..')
const REPO_ROOT = path.resolve(QUIZ_ROOT, '..')

const FM = (body: string, attrs = 'verification:\n  status: unverified') => `---\n${attrs}\n---\n${body}`
const EXAM_5 = { name: 'Exam 5', path: '/wiki/exam/Exam+5+(CAS)' }
const EXAM_P = { name: 'Exam P-1', path: '/wiki/exam/Exam+P-1+(SOA)' }

describe('latexToText', () => {
  it('reads the math the vault writes inline', () => {
    expect(latexToText('E[X^2]')).toBe('E[X²]')
    expect(latexToText('\\mu')).toBe('μ')
    expect(latexToText('\\text{Var}(X)')).toBe('Var(X)')
    expect(latexToText('x_{i}')).toBe('xᵢ')
    expect(latexToText('\\bar{X}')).toBe('X̄')
    expect(latexToText('P(A \\mid B)')).toBe('P(A | B)')
  })

  it('writes fractions on one line, bracketing a compound part', () => {
    expect(latexToText('\\frac{a}{b}')).toBe('a/b')
    expect(latexToText('\\frac{a+b}{c}')).toBe('(a+b)/c')
  })

  it('keeps a word subscript readable rather than bracketed', () => {
    expect(latexToText('D_{\\text{Mod}}')).toBe('D_Mod')
  })

  it('drops a command it does not know, keeping its argument', () => {
    expect(latexToText('\\weirdmacro{x} + 1')).toBe('x + 1')
  })
})

describe('inlineMarkdownToText', () => {
  it('reads wiki links as their label and drops the markup', () => {
    expect(inlineMarkdownToText('**Chain Ladder** uses a [[Cumulative Development Factor|CDF]] and [[Tail Factor]].'))
      .toBe('Chain Ladder uses a CDF and Tail Factor.')
  })

  it('reads inline math and keeps an escaped dollar as currency', () => {
    expect(inlineMarkdownToText('The mean $\\mu$ is \\$130 per claim.')).toBe('The mean μ is $130 per claim.')
  })

  it('drops footnotes, embeds, comments and a bare source link', () => {
    expect(inlineMarkdownToText('A risk.^[[Agent | Wikipedia](https://x.org)] ![[fig.svg]] %%note%% ([Wikidata](https://w.org))'))
      .toBe('A risk.')
  })

  it('strips Obsidian highlights and the quote marks around a quoted definition', () => {
    expect(inlineMarkdownToText('"==Catastrophes== are rare. "')).toBe('Catastrophes are rare.')
  })
})

describe('leadParagraph', () => {
  it("takes a concept page's opening definition, past its formula box", () => {
    const md = FM('**Expected Value** is the mean.\n\n> $$E[X] = \\sum x f(x)$$\n\nMore prose later.')
    expect(leadParagraph(md)).toBe('**Expected Value** is the mean.')
  })

  it('passes over a heading an older page opens on, and its breadcrumb', () => {
    const md = FM('\n[[Actuarial Notes Wiki|Wiki]] / [[Glossary]] / **Actuary**\n\n## Actuary\nAn **Actuary** is a business professional who deals with the financial impact of risk.\n\n## More')
    expect(leadParagraph(md)).toBe('An **Actuary** is a business professional who deals with the financial impact of risk.')
  })

  it('finds no lead in a chapter outline rather than a paragraph from its middle', () => {
    const md = FM('![[Cover.svg]]\n\n## 1 Counting\n- 1.1 Introduction\n\n## 2 Axioms\n\nA stray paragraph deep in the page that is long enough to count.')
    expect(leadParagraph(md)).toBe('')
  })

  it('takes a quoted definition, but never a callout', () => {
    expect(leadParagraph(FM('> [!example]- Worked example\n> A callout body that is long enough to be a lead paragraph.\n\n> An **agent** is an entity that acts or exerts power to produce an effect.')))
      .toBe('An **agent** is an entity that acts or exerts power to produce an effect.')
  })

  it('skips a short caption for the first substantial paragraph', () => {
    expect(leadParagraph(FM('**Figure 1**\n\nThe paragraph that actually defines the thing, long enough to be the lead.')))
      .toBe('The paragraph that actually defines the thing, long enough to be the lead.')
  })
})

describe('clampText', () => {
  it('leaves a short description alone', () => {
    expect(clampText('A short one.')).toBe('A short one.')
  })

  it('prefers a whole sentence when one fills half the budget', () => {
    const first = 'A'.repeat(90) + ' ends here.'
    expect(clampText(`${first} ${'B'.repeat(100)}.`)).toBe(first)
  })

  it('otherwise cuts at a word, with an ellipsis', () => {
    const out = clampText(`${'word '.repeat(60)}end`)
    expect(out.length).toBeLessThanOrEqual(DESCRIPTION_MAX)
    expect(out.endsWith('word…')).toBe(true)
  })

  it('does not end a sentence at an abbreviation', () => {
    const text = `${'x'.repeat(60)} e.g. Something that runs on for a long while ${'y '.repeat(60)}`
    expect(clampText(text).endsWith('e.g.')).toBe(false)
  })

  it('ends a lead that introduces a formula with a full stop, not a colon', () => {
    expect(clampText('Its present value is:')).toBe('Its present value is.')
  })
})

describe('titles', () => {
  it('adds a qualifier only while the whole fits', () => {
    expect(composeTitle('Chain Ladder Method', 'Exam 5')).toBe(`Chain Ladder Method — Exam 5 | ${SITE_NAME}`)
    expect(composeTitle('A Very Long Concept Name That Goes On and On', 'Exam MAS-II')).toBe(`A Very Long Concept Name That Goes On and On | ${SITE_NAME}`)
  })
})

describe('conceptSeo', () => {
  const md = FM('**Chain Ladder Method** projects each cohort to ultimate with a [[Cumulative Development Factor|development factor]].\n\n- It assumes each cohort develops like the ones before it, at the same pace.')

  it('names the one study guide a concept is on, and describes it by its definition', () => {
    const page = conceptSeo({ name: 'Chain Ladder Method', markdown: md, exams: [EXAM_5] })
    expect(page.path).toBe('/wiki/concept/Chain+Ladder+Method')
    expect(page.title).toBe(`Chain Ladder Method — Exam 5 | ${SITE_NAME}`)
    expect(page.description).toBe('Chain Ladder Method projects each cohort to ultimate with a development factor. On the Exam 5 syllabus.')
    expect(page.parent).toEqual(EXAM_5)
    expect(page.noindex).toBeUndefined()
  })

  it('names no exam in the title when it is on several', () => {
    const page = conceptSeo({ name: 'Chain Ladder Method', markdown: md, exams: [EXAM_5, EXAM_P] })
    expect(page.title).toBe(`Chain Ladder Method | ${SITE_NAME}`)
    expect(page.guides).toEqual([EXAM_5, EXAM_P])
  })

  it('takes an authored description over the derived one', () => {
    const page = conceptSeo({ name: 'X', markdown: FM('Body text.', 'description: "Written by hand."'), exams: [] })
    expect(page.description).toBe('Written by hand.')
  })

  it('keeps an unwritten stub out of the index', () => {
    expect(conceptSeo({ name: 'Credit', markdown: FM(''), exams: [] }).noindex).toBe(true)
    expect(isStubPage(FM(`- **Annuities** — concept summary to be written.\n${'filler words '.repeat(20)}`))).toBe(true)
  })
})

describe('examSeo', () => {
  const md = FM('<div class="exam-nav"\n     data-current="P-1|Probability">\n</div>\n\n# Exam P-1\nThe Probability exam.\n\n## Learning Objectives\n\n> [!example]- General Probability {23–30%}\n> Define [[Set Function]] and [[Event]].\n\n> [!example]- Univariate {44–50%}\n> Use [[Event]] and [[Variance]].\n')

  it('says what the study guide holds', () => {
    const page = examSeo({ fileName: 'Exam P-1 (SOA)', markdown: md, questions: 716 })
    expect(page.path).toBe('/wiki/exam/Exam+P-1+(SOA)')
    expect(page.title).toBe(`Exam P-1 (SOA) Study Guide & Syllabus | ${SITE_NAME}`)
    expect(page.description).toBe('SOA Exam P-1 study guide for Probability: 3 concept pages and 716 practice questions, organized by learning objective. The Probability exam.')
  })

  it('leaves out a question count it does not have', () => {
    expect(examSeo({ fileName: 'Exam P-1 (SOA)', markdown: md, questions: 0 }).description).not.toMatch(/questions/)
  })
})

describe('resourceSeo', () => {
  const outline = '![[Cover.svg]]\n\n## 1 Combinatorial Analysis\n- 1.1 Intro\n\n## 2 Axioms of Probability\n- 2.1 Intro\n'

  it('describes a chapter-outline textbook by its bibliographic facts', () => {
    const md = FM(outline, 'Title: A First Course in Probability\nAuthor: Sheldon Ross\nYear: "2019"\nEdition: 10e\nPublisher: Pearson\nISBN: 978-0134753119')
    const page = resourceSeo({ name: 'A First Course in Probability (Ross - 2019)', markdown: md, exams: [EXAM_P] })
    expect(page.title).toBe(`A First Course in Probability (Ross, 2019) | ${SITE_NAME}`)
    expect(page.description).toBe('A First Course in Probability (10th edition) by Sheldon Ross (Pearson, 2019). A syllabus reading for Exam P-1.')
    expect(page.work).toMatchObject({ author: 'Sheldon Ross', isbn: '978-0134753119', edition: '10e' })
  })

  it('names its chapters when there is room for at least two', () => {
    const page = resourceSeo({ name: 'Probability', markdown: FM(outline, 'Title: Probability\nAuthor: Ross'), exams: [EXAM_P] })
    expect(page.description).toBe('Probability by Ross. A syllabus reading for Exam P-1. Chapters include Combinatorial Analysis and Axioms of Probability.')
  })

  it("describes a paper by its own lead, and names it by its main title when it's long", () => {
    const md = FM(
      '![[Davidson - Cover.svg]]\n\nA paper on the Canadian **cap on non-pecuniary general damages** and its effect on litigation.\n\n## The subject\n',
      'Title: "The Cap on Non-Pecuniary General Damages: Where is it Going and How Does it Affect Litigation?"',
    )
    const page = resourceSeo({ name: 'Davidson', markdown: md, exams: [] })
    expect(page.title).toBe(`The Cap on Non-Pecuniary General Damages | ${SITE_NAME}`)
    expect(page.description).toBe('A paper on the Canadian cap on non-pecuniary general damages and its effect on litigation.')
  })
})

describe('pageHead', () => {
  it('gives a page its canonical URL and breadcrumb trail', () => {
    const head = pageHead(conceptSeo({ name: 'Chain Ladder Method', markdown: FM('**Chain Ladder Method** projects each cohort to ultimate.'), exams: [EXAM_5] }))
    expect(head.canonical).toBe('https://quiz.actuarialnotes.com/wiki/concept/Chain+Ladder+Method')
    const crumbs = head.jsonLd?.find(d => (d as { '@type': string })['@type'] === 'BreadcrumbList') as { itemListElement: { name: string; item: string }[] }
    expect(crumbs.itemListElement.map(c => c.name)).toEqual(['Study Guides', 'Exam 5', 'Chain Ladder Method'])
    expect(crumbs.itemListElement[1]!.item).toBe('https://quiz.actuarialnotes.com/wiki/exam/Exam+5+(CAS)')
  })
})

describe('fallbackHead', () => {
  it("gives a wiki route its canonical URL in the app's own spelling", () => {
    const head = fallbackHead('/wiki/exam/Exam+P-1+%28SOA%29')
    expect(head.canonical).toBe('https://quiz.actuarialnotes.com/wiki/exam/Exam+P-1+(SOA)')
    expect(head.title).toBe(`Exam P-1 Study Guide & Syllabus | ${SITE_NAME}`)
  })

  it('keeps a reader\'s own routes out of the index', () => {
    expect(fallbackHead('/settings')).toMatchObject({ noindex: true, canonical: undefined })
  })

  it('claims no canonical URL for a route it does not know', () => {
    expect(fallbackHead('/somewhere/else')).toEqual({ title: SITE_NAME, description: DEFAULT_DESCRIPTION })
  })
})

describe('serialisation', () => {
  it('escapes what it writes into the head', () => {
    const html = headTagsHtml({ title: 'A & B "C"', description: '<x>', canonical: 'https://x/a?b=1&c=2' })
    expect(html).toContain('<title>A &amp; B &quot;C&quot;</title>')
    expect(html).toContain('content="&lt;x&gt;"')
    expect(html).toContain('href="https://x/a?b=1&amp;c=2"')
  })

  it('never lets a JSON-LD string close its script tag', () => {
    expect(jsonForScript({ name: '</script><script>' })).not.toContain('</script>')
  })

  it('writes a sitemap of absolute, entity-escaped URLs', () => {
    expect(sitemapXml(['/wiki/concept/Bayes\'+Theorem', '/a&b'])).toContain(
      "<loc>https://quiz.actuarialnotes.com/wiki/concept/Bayes&apos;+Theorem</loc>",
    )
  })

  it("index.html's default head is exactly what headTagsHtml writes for the site", () => {
    const html = readFileSync(path.join(QUIZ_ROOT, 'index.html'), 'utf-8')
    const block = /<!-- page-head -->\n\s*([\s\S]*?)\n\s*<!-- \/page-head -->/.exec(html)?.[1]
    expect(block).toBe(headTagsHtml({ title: DEFAULT_TITLE, description: DEFAULT_DESCRIPTION }))
  })
})

// ── The vault itself ─────────────────────────────────────────────────────────

function readVault(): Record<string, string> {
  const files: Record<string, string> = {}
  for (const name of readdirSync(REPO_ROOT)) {
    if (/^Exam\b.*\.md$/i.test(name)) files[name] = readFileSync(path.join(REPO_ROOT, name), 'utf-8')
  }
  for (const dir of ['Concepts', 'Resources/Books']) {
    for (const name of readdirSync(path.join(REPO_ROOT, dir))) {
      if (name.endsWith('.md')) files[`${dir}/${name}`] = readFileSync(path.join(REPO_ROOT, dir, name), 'utf-8')
    }
  }
  return files
}

function readQuestions(): string[] {
  const out: string[] = []
  const root = path.join(REPO_ROOT, 'questions')
  for (const dir of readdirSync(root, { withFileTypes: true })) {
    if (!dir.isDirectory()) continue
    for (const name of readdirSync(path.join(root, dir.name))) {
      if (name.endsWith('.md')) out.push(readFileSync(path.join(root, dir.name, name), 'utf-8'))
    }
  }
  return out
}

describe('every page in the vault', () => {
  const files = readVault()
  const pages: SeoPage[] = buildSeoPages(files, countQuestionsByExam(readQuestions()))
  const indexable = pages.filter(p => !p.noindex)

  it('is described: the hub, each exam, each concept and each resource', () => {
    const count = (re: RegExp) => Object.keys(files).filter(f => re.test(f)).length
    expect(pages.filter(p => p.kind === 'exam')).toHaveLength(count(/^Exam\b/))
    expect(pages.filter(p => p.kind === 'concept')).toHaveLength(count(/^Concepts\//))
    expect(pages.filter(p => p.kind === 'resource')).toHaveLength(count(/^Resources\/Books\//))
    expect(pages.filter(p => p.kind === 'hub')).toHaveLength(1)
  })

  it('has a title of its own', () => {
    const titles = new Map<string, string[]>()
    for (const p of pages) titles.set(p.title, [...(titles.get(p.title) ?? []), p.path])
    expect([...titles.entries()].filter(([, paths]) => paths.length > 1)).toEqual([])
    for (const p of pages) expect(p.title.endsWith(` | ${SITE_NAME}`), p.title).toBe(true)
  })

  it('has a description that fits a search result and is its own', () => {
    for (const p of pages) {
      expect(p.description.length, p.path).toBeGreaterThan(0)
      expect(p.description.length, p.path).toBeLessThanOrEqual(DESCRIPTION_MAX)
    }
    const seen = new Map<string, string>()
    const dupes = indexable.filter(p => {
      const other = seen.get(p.description)
      seen.set(p.description, p.path)
      return other !== undefined
    })
    expect(dupes.map(p => p.path)).toEqual([])
  })

  it('carries no markdown or TeX into a title or description', () => {
    const residue = /\[\[|\]\]|\]\(|\*\*|__|%%|==|\\[a-zA-Z]|\$\$|<\/?[a-z]/
    const bad = pages.filter(p => residue.test(p.title) || residue.test(p.description))
    expect(bad.map(p => `${p.path}: ${p.description}`)).toEqual([])
  })

  it('counts every question bank against its exam', () => {
    const withQuestions = pages.filter(p => p.kind === 'exam' && /practice questions/.test(p.description)).map(p => p.name)
    expect(withQuestions).toEqual(expect.arrayContaining(['Exam P-1', 'Exam FM-2', 'Exam MAS-I', 'Exam MAS-II', 'Exam 5']))
  })

  it('keeps stubs out of the index — and only a few of them', () => {
    // Most of the vault is written; a jump here means pages were emptied or
    // the stub test started catching real pages.
    expect(pages.length - indexable.length).toBeLessThan(pages.length * 0.05)
  })
})
