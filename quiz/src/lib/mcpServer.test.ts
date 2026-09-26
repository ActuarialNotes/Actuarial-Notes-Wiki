import { describe, it, expect } from 'vitest'
import { readdir, readFile } from 'fs/promises'
import path from 'path'
import { fileURLToPath } from 'url'
// The connector's tools, resources and prompts (quiz/api/_mcp/server.js) over
// a knowledge base built by the real exporter (./knowledgeBase.ts) — which is
// what pins the export's shape to what the endpoint reads.
import { TOOLS, DEFAULT_SITE_URL, createActuarialNotesServer, normalizeAnswerText as mcpNormalizeAnswer, optionLetter } from '../../api/_mcp/server.js'
import { indexKnowledgeBase, normalizeTerm as mcpNormalizeTerm, objectiveKey as mcpObjectiveKey, examLookupKey } from '../../api/_mcp/knowledgeBase.js'
import { KNOWLEDGE_BASE_PATH } from '../../api/_mcp/load.js'
import { ErrorCode } from '../../api/_mcp/protocol.js'
import { KNOWLEDGE_BASE_ASSET, buildKnowledgeBase, normalizeTerm, readKnowledgeBaseSources, type KnowledgeBaseSources } from './knowledgeBase'
import { PUBLIC_SITE_URL } from './aiConnector'
import { normalizeAnswerText, objectiveKey } from './parser'
import { KEYSTONE_EXAMS } from '../data/keystoneConcepts'

const SITE = { url: 'https://quiz.actuarialnotes.com', repo: 'ActuarialNotes/Actuarial-Notes-Wiki', branch: 'main', commit: null, builtAt: '2026-09-26T00:00:00.000Z' }
const verification = (critical = 0, status = 'unverified') =>
  `verification:\n  status: ${status}\n  last_checked: 2026-09-01\n  sources:\n    - "Ross, A First Course in Probability (Pearson, 2019) — https://example.com/ross, Ch. 3"\n  open_findings: ${critical}\n  open_critical: ${critical}\n`
const page = (body: string, status = 'unverified') => `---\n${verification(0, status)}---\n${body}`

const mc = (id: string, concept: string, answer: string, extra = '', critical = 0) =>
  `---\nid: "${id}"\nexam: "Probability"\ntopic: "Bayes"\nlearning_objective: "General Probability"\ndifficulty: medium\ntype: multiple-choice\nwiki_link:\n  - Concepts/${concept.replace(/ /g, '+')}\nanswer: "${answer}"\npoints: 1\n${extra}${verification(critical)}---\n\nA test is 95% accurate. What is P(disease | positive)?\n\n- A) 0.16\n- B) 0.20\n- C) 0.46\n- D) 0.50\n- E) 0.66\n\n## Explanation\n\nApply Bayes: $0.46$.`

const sources: KnowledgeBaseSources = {
  pages: {
    'Exam P-1 (SOA).md': page(`<div class="exam-nav" data-current="P-1|Probability"></div>\n\n# Exam P-1\nA 3 hour probability exam.\n\n> [!example]- General Probability {23–30%}\n> [[Bayes Theorem]], [[Conditional Probability]] and [[Credit]].\n\n> [!example]- Univariate Random Variables {44–50%}\n> [[Probability Density Function (PDF)|densities]] and [[Annuity|annuities]].\n\n## Source Material\n> [!answer]- Source Material\n> - [[A First Course in Probability (Ross - 2019)]]\n>      - Chapters 1-8\n> - [[Missing Book (Nobody - 2000)]]\n`),
    'Exam 5 (CAS).md': page(`<div class="exam-nav" data-current="5|Basic Techniques"></div>\n\n# Exam 5\nRatemaking and reserving.\n\n> [!example]- A. Ratemaking {45–55%}\n> [[Exposure Base]].\n`),
    'Concepts/Bayes Theorem.md': page(`**Bayes' Theorem** reverses a conditional.\n\n> $$P(H \\mid E) = \\frac{P(E \\mid H)P(H)}{P(E)}$$\n\nSee [[Conditional Probability]].`),
    'Concepts/Conditional Probability.md': page('The probability of $A$ given $B$.', 'verified'),
    'Concepts/Probability Density Function (PDF).md': page('The density of a continuous random variable.'),
    'Concepts/Annuity.md': page('A series of payments.'),
    'Concepts/Bühlmann Credibility.md': page('Greatest accuracy credibility.'),
    'Concepts/Exposure Base.md': page('The unit premium is charged on.'),
    'Concepts/Credit.md': page(''),
    'Resources/Books/A First Course in Probability (Ross - 2019).md': page('The Exam P text.'),
    'Guides/Exam P-1 (SOA)/Format and pacing.md': '---\nexam: Exam P-1 (SOA)\norder: 1\n---\nThirty questions in three hours.',
  },
  questions: {
    'questions/exam-p/p-001.md': mc('p-001', 'Bayes Theorem', 'C'),
    'questions/exam-p/p-002.md': mc('p-002', 'Bayes Theorem', 'A'),
    'questions/exam-p/p-003.md': mc('p-003', 'Conditional Probability', 'B'),
    'questions/exam-p/p-004.md': mc('p-004', 'Bayes Theorem', 'D', 'off_syllabus: true\n'),
    'questions/exam-p/p-005.md': mc('p-005', 'Bayes Theorem', 'E', '', 1),
    'questions/exam-p/p-006.md': `---\nid: "p-006"\nexam: "Probability"\ntopic: "Premium"\nlearning_objective: "Univariate Random Variables"\ndifficulty: easy\ntype: free-entry\nwiki_link:\n  - Concepts/Annuity\nanswer: "3400"\npoints: 1\n${verification()}---\n\nWhat is the premium?\n\n## Explanation\n\nIt is 3,400.`,
    'questions/exam-5/cas5-2013f-001.md': `---\nid: "cas5-2013f-q1"\nexam: "Exam 5"\ntopic: "Exposure Base"\nlearning_objective: "Ratemaking"\ndifficulty: medium\ntype: multi-part\nyear: 2013\nsession: Fall\nwiki_link:\n  - Concepts/Exposure+Base\npoints: 2\n${verification()}---\n\nAn insurer uses payroll.\n\n## Part a (1 point)\nCalculate the ratio.\n\n### Answer\n1.25\n\n### Explanation\nDivide.\n\n## Part b (0.5 points)\nWhich base is best?\n\n- A) Payroll\n- B) Hours\n\n### Answer\nA\n\n### Explanation\nPayroll tracks wages.\n\n## Part c (0.5 points)\nDiscuss one criterion.\n\n### Explanation\nProportional to losses.\n\n### Examiner Report\nMost candidates named one.`,
  },
  catalog: [
    { page: 'Exam P-1 (SOA).md', exam_id: 'P-1', wiki_id: 'p-1', progress_key: 'P', body: 'SOA', bank: 'exam-p', status: 'ready' },
    { page: 'Exam 5 (CAS).md', exam_id: '5', wiki_id: '5-1', progress_key: 'CAS-5', body: 'CAS', bank: 'exam-5', status: 'beta' },
  ],
  aliases: { mle: 'Maximum Likelihood Estimation', 'bayes rule': 'Bayes Theorem' },
  keystones: [{ id: 'P', concepts: [{ name: 'Bayes Theorem', why: 'Flips a conditional.' }] }],
  site: SITE,
}

const ix = indexKnowledgeBase(buildKnowledgeBase(sources))
const server = createActuarialNotesServer({ loadIndex: async () => ix })
const ctx = { era: 'modern' }

type ToolResult = { content: { type: string; text: string }[]; isError?: boolean }
async function tool(name: string, args: Record<string, unknown>): Promise<ToolResult & { text: string }> {
  const out = (await server.methods['tools/call']({ name, arguments: args }, ctx)) as ToolResult
  return { ...out, text: out.content[0].text }
}
const call = async (method: string, params: Record<string, unknown>) =>
  (await (server.methods as Record<string, (p: unknown, c: unknown) => unknown>)[method](params, ctx)) as Record<string, unknown>

describe('tools/list', () => {
  it('lists seven read-only tools with object input schemas', async () => {
    const { tools } = (await call('tools/list', {})) as { tools: Record<string, unknown>[] }
    expect(tools.map(t => t.name)).toEqual(['search', 'fetch', 'list_exams', 'get_exam', 'get_concept', 'get_practice_questions', 'check_answer'])
    for (const t of tools) {
      expect(t).not.toHaveProperty('run')
      expect((t.inputSchema as { type: string }).type).toBe('object')
      expect((t.annotations as { readOnlyHint: boolean }).readOnlyHint).toBe(true)
      expect(typeof t.description).toBe('string')
    }
  })

  it('refuses a pagination cursor it never handed out', async () => {
    await expect(call('tools/list', { cursor: 'abc' })).rejects.toMatchObject({ code: ErrorCode.INVALID_PARAMS })
  })

  it('rejects an unknown tool as a protocol error', async () => {
    await expect(tool('nope', {})).rejects.toMatchObject({ code: ErrorCode.INVALID_PARAMS })
  })
})

describe('search and fetch — the ChatGPT connector contract', () => {
  it('returns {results: [{id, title, url, text}]} as JSON text', async () => {
    const out = await tool('search', { query: 'Bayes Theorem' })
    const { results } = JSON.parse(out.text)
    expect(results[0]).toMatchObject({
      id: 'concept/Bayes Theorem',
      title: 'Bayes Theorem',
      url: 'https://quiz.actuarialnotes.com/wiki/concept/Bayes+Theorem',
      type: 'concept',
      exams: ['P'],
      fact_check: 'Not fact checked',
    })
    for (const r of results) expect(Object.keys(r)).toEqual(expect.arrayContaining(['id', 'title', 'url', 'text']))
  })

  it('filters by type and exam, and never puts a solution in a snippet', async () => {
    const { results } = JSON.parse((await tool('search', { query: 'Bayes accurate positive', type: 'question', exam: 'Exam P' })).text)
    expect(results.length).toBeGreaterThan(0)
    for (const r of results) {
      expect(r.id).toMatch(/^question\//)
      expect(r.text).not.toMatch(/Apply Bayes/)
    }
    // The withheld question is not searchable at all.
    expect(results.map((r: { id: string }) => r.id)).not.toContain('question/p-005')
  })

  it('answers bad arguments with a tool error the model can act on', async () => {
    expect((await tool('search', { query: '  ' })).isError).toBe(true)
    expect((await tool('search', { query: 'x', limit: 99 })).text).toMatch(/limit/)
    expect((await tool('search', { query: 'x', type: 'video' })).text).toMatch(/one of/)
    expect((await tool('search', { query: 'x', exam: 'Exam Q' })).text).toMatch(/No exam called "Exam Q". Exams: P, 5/)
  })

  it('fetches a document as {id, title, text, url, metadata}', async () => {
    const doc = JSON.parse((await tool('fetch', { id: 'concept/Conditional Probability' })).text)
    expect(doc).toMatchObject({ id: 'concept/Conditional Probability', title: 'Conditional Probability', url: expect.stringMatching(/^https:/) })
    expect(doc.metadata).toMatchObject({ type: 'concept', exams: ['P'], source_file: 'Concepts/Conditional Probability.md' })
    expect(doc.text).toContain('The probability of $A$ given $B$.')
    expect(doc.text).toMatch(/Fact check: Fact checked · 1 Sep 2026/)
    expect(doc.text).toMatch(/Checked against Ross, A First Course in Probability \(Pearson, 2019\) \(Ch\. 3\) — https:\/\/example\.com\/ross/)
  })

  it('fetches by exam key, concept name, path or bare question id', async () => {
    expect(JSON.parse((await tool('fetch', { id: 'exam/P' })).text).text).toMatch(/^# Exam P-1 — Probability \(SOA\)/)
    expect(JSON.parse((await tool('fetch', { id: 'Bayes rule' })).text).id).toBe('concept/Bayes Theorem')
    expect(JSON.parse((await tool('fetch', { id: 'Concepts/Annuity.md' })).text).id).toBe('concept/Annuity')
    const q = JSON.parse((await tool('fetch', { id: 'p-001' })).text)
    expect(q).toMatchObject({ id: 'question/p-001', metadata: { type: 'question', exam: 'P' } })
    expect(q.text).toMatch(/### Answer: C\) 0\.46/)
  })

  it('refuses a withheld question and an unknown id', async () => {
    const withheld = await tool('fetch', { id: 'question/p-005' })
    expect(withheld.isError).toBe(true)
    expect(withheld.text).toMatch(/withheld: An unresolved critical fact-check finding/)
    expect((await tool('fetch', { id: 'concept/Nothing' })).isError).toBe(true)
  })
})

describe('list_exams and get_exam', () => {
  it('tabulates the exams', async () => {
    const out = await tool('list_exams', {})
    expect(out.text).toMatch(/\| P \| Exam P-1 — Probability \| SOA \| complete \| 2 \| 5 \| 4 \|/)
    expect(out.text).toMatch(/\| 5 \| Exam 5 — Basic Techniques \| CAS \| beta \| 1 \| 1 \| 1 \|/)
  })

  it('reads a syllabus by any name for the exam', async () => {
    for (const name of ['P', 'Exam P', 'exam p-1', 'Probability', 'SOA P']) {
      expect((await tool('get_exam', { exam: name })).text, name).toMatch(/^# Exam P-1 — Probability \(SOA\)/)
    }
    const out = (await tool('get_exam', { exam: 'P' })).text
    expect(out).toContain('### 1. General Probability — 23–30% of the exam')
    expect(out).toContain('Concepts: Bayes Theorem ★, Conditional Probability, Credit')
    expect(out).toContain('- **Bayes Theorem** — Flips a conditional.')
    expect(out).toContain('- A First Course in Probability (Ross - 2019) — Chapters 1-8 (id: resource/A First Course in Probability (Ross - 2019))')
    expect(out).toContain('- Missing Book (Nobody - 2000)')
    expect(out).toContain('- Format and pacing (id: guide/Exam P-1 (SOA)/Format and pacing)')
    expect(out).toMatch(/4 questions \(easy 1 · medium 3 · hard 0\)/)
  })

  it('says so for an exam it does not know', async () => {
    const out = await tool('get_exam', { exam: 'Exam 42' })
    expect(out.isError).toBe(true)
    expect(out.text).toMatch(/Exams: P, 5/)
  })
})

describe('get_concept', () => {
  it('resolves a title, an alias, an abbreviation, a plural and a name without accents', async () => {
    const cases: [string, string][] = [
      ['Bayes Theorem', 'Bayes Theorem'],
      ['bayes rule', 'Bayes Theorem'],
      ['PDF', 'Probability Density Function (PDF)'],
      ['probability density function', 'Probability Density Function (PDF)'],
      ['annuities', 'Annuity'],
      ['Buhlmann credibility', 'Bühlmann Credibility'],
      ['densities', 'Probability Density Function (PDF)'],
    ]
    for (const [name, title] of cases) expect((await tool('get_concept', { name })).text, name).toMatch(new RegExp(`^# ${title.replace(/[()]/g, '\\$&')}\\n`))
  })

  it('says where the concept is examined, and how much practice exists', async () => {
    const out = (await tool('get_concept', { name: 'Bayes Theorem' })).text
    expect(out).toContain('- Exam P-1 (P) → General Probability (23–30%) · keystone ★ — Flips a conditional.')
    expect(out).toContain('Practice questions: 2 on Exam P')
    expect(out).toContain('Linked pages: Conditional Probability')
    expect(out).toContain('$$P(H \\mid E)')
  })

  it("doesn't claim an unverified page was checked against anything", async () => {
    const out = (await tool('get_concept', { name: 'Bayes Theorem' })).text
    expect(out).toContain('Fact check: Not fact checked — Not yet checked against a source.')
    expect(out).not.toContain('- Checked against')
  })

  it('flags an empty page instead of returning nothing', async () => {
    expect((await tool('get_concept', { name: 'Credit' })).text).toMatch(/has no content yet/)
  })

  it('suggests close pages for a name it cannot resolve', async () => {
    const out = await tool('get_concept', { name: 'Bayes Theory' })
    expect(out.isError).toBe(true)
    expect(out.text).toMatch(/Closest pages: Bayes Theorem/)
  })
})

describe('get_practice_questions', () => {
  it('never includes an answer or a solution', async () => {
    const out = (await tool('get_practice_questions', { exam: 'P', count: 10 })).text
    expect(out).not.toMatch(/### Answer|Apply Bayes|It is 3,400/)
    expect(out).toMatch(/- C\) 0\.46/)
  })

  it('draws only practice-eligible questions: no withheld, no off-syllabus', async () => {
    const out = (await tool('get_practice_questions', { exam: 'P', count: 10 })).text
    const ids = [...out.matchAll(/id: (p-\d+)/g)].map(m => m[1]).sort()
    expect(ids).toEqual(['p-001', 'p-002', 'p-003', 'p-006'])
    expect(out).toContain('https://quiz.actuarialnotes.com/quiz?ids=')
  })

  it('filters by concept, objective, sitting and difficulty, and honours exclude', async () => {
    const bayes = (await tool('get_practice_questions', { concept: 'Bayes rule', count: 10 })).text
    expect([...bayes.matchAll(/id: (p-\d+)/g)].map(m => m[1]).sort()).toEqual(['p-001', 'p-002'])
    const rest = (await tool('get_practice_questions', { concept: 'Bayes Theorem', exclude: ['p-001'], count: 10 })).text
    expect([...rest.matchAll(/id: (p-\d+)/g)].map(m => m[1])).toEqual(['p-002'])
    expect((await tool('get_practice_questions', { exam: '5', sitting: 'fall 2013' })).text).toContain('id: cas5-2013f-q1')
    expect((await tool('get_practice_questions', { exam: 'P', objective: 'Univariate Random Variables' })).text).toContain('id: p-006')
    expect((await tool('get_practice_questions', { exam: 'P', difficulty: 'hard' })).isError).toBe(true)
  })

  it('repeats a seeded draw', async () => {
    const a = (await tool('get_practice_questions', { exam: 'P', count: 2, seed: 42 })).text
    const b = (await tool('get_practice_questions', { exam: 'P', count: 2, seed: 42 })).text
    expect(a).toBe(b)
  })

  it('shows a multi-part question part by part', async () => {
    const out = (await tool('get_practice_questions', { exam: '5' })).text
    expect(out).toContain('Exam 5 · Ratemaking · Exposure Base · medium · 2 points · Exam 5 Fall 2013 paper')
    expect(out).toContain('**(a)** [1 point] Calculate the ratio.')
    expect(out).toContain('- A) Payroll')
    expect(out).not.toMatch(/Proportional to losses|Most candidates/)
  })

  it('needs an exam or a concept', async () => {
    expect((await tool('get_practice_questions', {})).text).toMatch(/Give an exam/)
    expect((await tool('get_practice_questions', { count: 11, exam: 'P' })).isError).toBe(true)
  })
})

describe('check_answer', () => {
  it('reads an option letter however it is written', () => {
    const options = [{ key: 'A', text: '0.16' }, { key: 'B', text: '0.20' }, { key: 'C', text: '$3,400' }]
    for (const given of ['C', 'c', '(C)', 'C)', 'C. because', 'Answer: C', 'the answer is c', '3400']) {
      expect(optionLetter(given, options), given).toBe('C')
    }
    for (const given of ['A sum of squares', 'F', '', 'the second one']) expect(optionLetter(given, options), given).toBeNull()
  })

  it('marks a multiple-choice answer and then shows the solution', async () => {
    const right = (await tool('check_answer', { question_id: 'p-001', answer: 'c' })).text
    expect(right).toContain('✅ Correct — the student chose C) 0.46.')
    expect(right).toContain('Apply Bayes')
    const wrong = (await tool('check_answer', { question_id: 'P-001', answer: 'B' })).text
    expect(wrong).toContain('❌ Incorrect — the student chose B) 0.20.')
    expect(wrong).toContain('### Answer: C) 0.46')
  })

  it("doesn't reveal the answer when it can't read the student's choice", async () => {
    const out = await tool('check_answer', { question_id: 'p-001', answer: 'the second one' })
    expect(out.isError).toBe(true)
    expect(out.text).not.toMatch(/0\.46|Apply Bayes/)
  })

  it('marks a number the way the app does, and notices a rounding slip', async () => {
    expect((await tool('check_answer', { question_id: 'p-006', answer: '$3,400' })).text).toContain('✅ Correct')
    expect((await tool('check_answer', { question_id: 'p-006', answer: '3410' })).text).toContain('≈ Close')
    expect((await tool('check_answer', { question_id: 'p-006', answer: '3000' })).text).toContain('❌ Incorrect')
  })

  it('marks the parts it can and hands a written part back for grading', async () => {
    const out = (await tool('check_answer', { question_id: 'cas5-2013f-q1', parts: { a: '1.25', b: 'Hours', c: 'Losses scale with it.' } })).text
    expect(out).toContain('Part (a): ✅ Correct — student said 1.25, key 1.25')
    expect(out).toContain('Part (b): ❌ Incorrect — student said B, key A) Payroll')
    expect(out).toContain("Part (c): written answer — grade it against the model answer and examiner's report below.")
    expect(out).toContain('### Model answer (c)')
    expect(out).toContain("### Examiner's report (c)")
  })

  it('shows the solution when no answer is given, and refuses a withheld question', async () => {
    expect((await tool('check_answer', { question_id: 'p-002' })).text).toContain('No answer given — here is the solution.')
    expect((await tool('check_answer', { question_id: 'p-005', answer: 'E' })).isError).toBe(true)
    expect((await tool('check_answer', { question_id: 'zz-1', answer: 'A' })).isError).toBe(true)
  })
})

describe('resources', () => {
  it('lists the catalogue and every syllabus, with templates for the rest', async () => {
    const { resources } = (await call('resources/list', {})) as { resources: { uri: string }[] }
    expect(resources.map(r => r.uri)).toEqual(['actuarialnotes://exams', 'actuarialnotes://exam/P', 'actuarialnotes://exam/5'])
    const { resourceTemplates } = (await call('resources/templates/list', {})) as { resourceTemplates: { uriTemplate: string }[] }
    expect(resourceTemplates.map(t => t.uriTemplate)).toEqual([
      'actuarialnotes://exam/{exam}',
      'actuarialnotes://concept/{name}',
      'actuarialnotes://resource/{name}',
      'actuarialnotes://question/{id}',
    ])
  })

  it('reads each kind of URI as markdown', async () => {
    const read = async (uri: string) => ((await call('resources/read', { uri })) as { contents: { uri: string; mimeType: string; text: string }[] }).contents[0]
    expect(await read('actuarialnotes://exams')).toMatchObject({ uri: 'actuarialnotes://exams', mimeType: 'text/markdown' })
    expect((await read('actuarialnotes://exam/P')).text).toMatch(/^# Exam P-1/)
    expect((await read('actuarialnotes://concept/Bayes%20Theorem')).text).toMatch(/^# Bayes Theorem/)
    expect((await read('actuarialnotes://question/p-001')).text).toMatch(/### Answer: C\)/)
    expect((await read('actuarialnotes://resource/A%20First%20Course%20in%20Probability%20(Ross%20-%202019)')).text).toMatch(/The Exam P text/)
    expect((await read('actuarialnotes://guide/Exam%20P-1%20(SOA)/Format%20and%20pacing')).text).toMatch(/Thirty questions/)
  })

  it('reports a resource it does not have', async () => {
    for (const uri of ['actuarialnotes://concept/Nothing', 'actuarialnotes://question/p-005', 'https://example.com', 'actuarialnotes://%E0%A4%A']) {
      await expect(call('resources/read', { uri }), uri).rejects.toMatchObject({ resourceNotFound: true })
    }
  })
})

describe('prompts', () => {
  it('lists the four skills', async () => {
    const { prompts } = (await call('prompts/list', {})) as { prompts: { name: string; arguments: { name: string; required: boolean }[] }[] }
    expect(prompts.map(p => p.name)).toEqual(['study_session', 'explain_concept', 'practice_quiz', 'study_plan'])
    expect(prompts[0].arguments).toEqual([expect.objectContaining({ name: 'exam', required: true }), expect.objectContaining({ name: 'focus', required: false })])
  })

  it('attaches the syllabus or the concept page the prompt is about', async () => {
    const session = (await call('prompts/get', { name: 'study_session', arguments: { exam: 'P' } })) as { messages: { content: { type: string; resource?: { uri: string; text: string }; text?: string } }[] }
    expect(session.messages[0].content).toMatchObject({ type: 'resource', resource: { uri: 'actuarialnotes://exam/P' } })
    expect(session.messages[1].content.text).toMatch(/get_practice_questions/)
    const explain = (await call('prompts/get', { name: 'explain_concept', arguments: { concept: 'pdf' } })) as { messages: { content: { resource?: { text: string }; text?: string } }[] }
    expect(explain.messages[0].content.resource?.text).toMatch(/^# Probability Density Function \(PDF\)/)
    const unknown = (await call('prompts/get', { name: 'explain_concept', arguments: { concept: 'Zorblax' } })) as { messages: { content: { text?: string } }[] }
    expect(unknown.messages).toHaveLength(1)
    expect(unknown.messages[0].content.text).toMatch(/find it with get_concept/)
  })

  it('turns a quiz prompt into the draw it asks for', async () => {
    const quiz = (await call('prompts/get', { name: 'practice_quiz', arguments: { exam: 'P', focus: 'Bayes rule', count: '40' } })) as { messages: { content: { text: string } }[] }
    expect(quiz.messages[0].content.text).toContain('{"exam":"P","count":10,"concept":"Bayes Theorem"}')
  })

  it('rejects a missing argument, an unknown exam and an unknown prompt', async () => {
    await expect(call('prompts/get', { name: 'study_plan', arguments: {} })).rejects.toMatchObject({ code: ErrorCode.INVALID_PARAMS })
    await expect(call('prompts/get', { name: 'study_plan', arguments: { exam: 'FM' } })).rejects.toMatchObject({ code: ErrorCode.INVALID_PARAMS })
    await expect(call('prompts/get', { name: 'nope', arguments: {} })).rejects.toMatchObject({ code: ErrorCode.INVALID_PARAMS })
  })
})

describe('completion', () => {
  it('completes exam keys, concept names and question ids', async () => {
    const complete = async (ref: Record<string, unknown>, name: string, value: string) =>
      ((await call('completion/complete', { ref, argument: { name, value } })) as { completion: { values: string[] } }).completion.values
    expect(await complete({ type: 'ref/prompt', name: 'study_plan' }, 'exam', '')).toEqual(['P', '5'])
    expect(await complete({ type: 'ref/prompt', name: 'explain_concept' }, 'concept', 'prob')).toEqual(['Probability Density Function (PDF)', 'Conditional Probability'])
    expect(await complete({ type: 'ref/resource', uri: 'actuarialnotes://question/{id}' }, 'id', 'cas5')).toEqual(['cas5-2013f-q1'])
    expect(await complete({ type: 'ref/prompt', name: 'study_plan' }, 'weeks', '1')).toEqual([])
  })
})

describe('the loader failing', () => {
  it('reports the knowledge base as unavailable without failing the listings', async () => {
    const broken = createActuarialNotesServer({ loadIndex: async () => { throw new Error('404') } })
    expect(((await broken.methods['tools/list']({}, ctx)) as { tools: unknown[] }).tools).toHaveLength(7)
    await expect(broken.methods['tools/call']({ name: 'list_exams', arguments: {} }, ctx)).rejects.toMatchObject({
      code: ErrorCode.INTERNAL_ERROR,
      message: expect.stringMatching(/could not be loaded/),
    })
  })
})

describe('what the endpoint mirrors from the app', () => {
  it('normalises names exactly as the exporter does', () => {
    for (const s of ["Bayes' Theorem", 'Bühlmann-Straub  Credibility', 'loss_ratio', 'Café Crème', ' MAS-I ']) {
      expect(mcpNormalizeTerm(s), s).toBe(normalizeTerm(s))
    }
  })

  it('normalises answers and objectives exactly as parser.ts does', () => {
    for (const s of ['$3,400', '3400.00001', '3.670', ' Payroll ', '€1,000', 'abc']) expect(mcpNormalizeAnswer(s), s).toBe(normalizeAnswerText(s))
    for (const s of ['A. Ratemaking', 'ratemaking', '  B.  Estimating   Claim Liabilities ']) expect(mcpObjectiveKey(s), s).toBe(objectiveKey(s))
  })

  it('agrees with the app on where things live', () => {
    expect(DEFAULT_SITE_URL).toBe(PUBLIC_SITE_URL)
    expect(KNOWLEDGE_BASE_PATH).toBe(`/${KNOWLEDGE_BASE_ASSET}`)
    expect(TOOLS.find(t => t.name === 'search')?.inputSchema.required).toEqual(['query'])
    expect(TOOLS.find(t => t.name === 'fetch')?.inputSchema.required).toEqual(['id'])
  })

  it('folds every way a reader writes an exam to one key', () => {
    expect(examLookupKey('Exam MAS-I (CAS)')).toBe(examLookupKey('mas 1'))
    expect(examLookupKey('MAS II')).toBe(examLookupKey('mas-2'))
    expect(examLookupKey('Exam P-1 (SOA)')).toBe('p1')
  })
})

// ── The real vault ───────────────────────────────────────────────────────────
// Every exam, every page and a question from every bank, through the tools an
// assistant calls — so a vault edit that breaks the connector fails here.

const REPO_ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '../../..')

describe('the connector over the real vault', async () => {
  const real = await readKnowledgeBaseSources({
    list: async dir => (await readdir(path.join(REPO_ROOT, dir), { withFileTypes: true }).catch(() => []))
      .map(e => ({ name: e.name, isDirectory: e.isDirectory() })),
    read: file => readFile(path.join(REPO_ROOT, file), 'utf-8').catch(() => null),
  })
  const kb = buildKnowledgeBase({ ...real, keystones: KEYSTONE_EXAMS, site: SITE })
  const vaultIndex = indexKnowledgeBase(kb)
  const vault = createActuarialNotesServer({ loadIndex: async () => vaultIndex })
  const run = async (name: string, args: Record<string, unknown>) =>
    (await vault.methods['tools/call']({ name, arguments: args }, ctx)) as ToolResult

  it('reads every exam syllabus', async () => {
    for (const exam of kb.exams) {
      const out = await run('get_exam', { exam: exam.key })
      expect(out.isError, exam.key).toBeFalsy()
      expect(out.content[0].text).toMatch(new RegExp(`^# ${exam.name} — `))
    }
  })

  it('fetches every page', async () => {
    for (const doc of kb.docs) {
      const out = await run('fetch', { id: doc.id })
      expect(out.isError, doc.id).toBeFalsy()
      expect(JSON.parse(out.content[0].text).id).toBe(doc.id)
    }
  })

  it('resolves every syllabus concept that has a page', async () => {
    const pages = new Set(kb.docs.filter(d => d.kind === 'concept').map(d => d.title.toLowerCase()))
    for (const exam of kb.exams) {
      for (const name of exam.objectives.flatMap(o => o.concepts)) {
        if (!pages.has(name.toLowerCase())) continue
        const out = await run('get_concept', { name })
        expect(out.isError, `${exam.key}: ${name}`).toBeFalsy()
      }
    }
  })

  it('draws and marks a question from every bank', async () => {
    for (const exam of kb.exams.filter(e => e.questionCount > 0)) {
      const set = await run('get_practice_questions', { exam: exam.key, count: 1, seed: 1 })
      expect(set.isError, exam.key).toBeFalsy()
      const id = /id: (\S+)/.exec(set.content[0].text)?.[1]
      const marked = await run('check_answer', { question_id: id })
      expect(marked.isError, `${exam.key}: ${id}`).toBeFalsy()
      expect(marked.content[0].text).toMatch(/### (Answer|Model answer|Solution)/)
    }
  })
})
