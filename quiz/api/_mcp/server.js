// Actuarial Notes as an MCP server — the tools, resources and prompts Claude
// and ChatGPT see when a reader adds the connector (docs/ai-connector.md).
//
//   tools      search / fetch        ChatGPT's connector contract (deep research
//                                     and company knowledge call exactly these)
//              list_exams / get_exam the syllabi: objectives, weights, readings
//              get_concept           a concept page, with where it is examined
//              get_practice_questions / check_answer
//                                     a practice loop that never shows the answer
//                                     before the student has given theirs
//   resources  the exam catalogue and each syllabus, plus templates for any
//              concept, source, guide or question
//   prompts    the skills: a study session, explaining a concept, a practice
//              quiz, a study plan
//
// Everything is read-only and drawn from the knowledge-base export, so every
// answer can carry the page it came from and that page's fact-check verdict.
// The protocol itself — both MCP eras — is protocol.js.

import { ErrorCode, McpError, ResourceNotFoundError } from './protocol.js'
import { normalizeTerm } from './knowledgeBase.js'

export const SERVER_VERSION = '1.0.0'

/** Mirrors PUBLIC_SITE_URL in src/lib/aiConnector.ts (pinned by mcpServer.test.ts). */
export const DEFAULT_SITE_URL = 'https://quiz.actuarialnotes.com'

/** How long a client may treat a list or a read as fresh: the export only changes on deploy. */
const CACHE_TTL_MS = 60 * 60 * 1000

/** A fetched document is cut here; the rest is a link away. */
const MAX_TEXT = 40000

export const INSTRUCTIONS = `Actuarial Notes is a study wiki for the SOA and CAS actuarial exams (P, FM, MAS-I, MAS-II, 5, 6C, 6U, 7, 8, 9, PCPA): each exam's syllabus with learning-objective weights and assigned readings, concept pages (definition, formulas in LaTeX, worked examples), source and regulation pages, exam-strategy guides, and a bank of past and sample exam questions with worked solutions.

- Ground answers about exam material in the notes: search (or get_concept / get_exam) before answering, and cite the page URL you relied on.
- Report what the notes say. Objectives, weights and readings come from get_exam; if something is not there, say so rather than filling it in.
- Every result carries a fact-check status. Most pages are "Not fact checked" — community-written and not yet checked against the source text — so when an exact figure, formula or rule matters, say that and point to the official reading. A "Known issue" or "Disputed" page has an unresolved problem: say so before relying on it.
- To quiz someone, get_practice_questions returns questions without their answers. Ask one at a time, wait for the student's answer, then call check_answer to mark it and show the official solution. Never reveal or hint at an answer first.
- An exam marked "in development" has a syllabus outline, few written concept pages and little or no question bank.
- This is study material, not professional actuarial advice.`

const STATUS_WORDS = {
  ready: 'complete — full syllabus and question bank',
  beta: 'beta — usable, still being filled out',
  development: 'in development — syllabus outline only',
}

const isObject = value => value !== null && typeof value === 'object' && !Array.isArray(value)

// ── Input checking ───────────────────────────────────────────────────────────

/** A bad argument: answered as a tool error the model can read and correct. */
class ToolInputError extends Error {}

function text(args, name, { required = false, max = 500 } = {}) {
  const value = args[name]
  if (value == null || value === '') {
    if (required) throw new ToolInputError(`"${name}" is required.`)
    return undefined
  }
  if (typeof value !== 'string') throw new ToolInputError(`"${name}" must be a string.`)
  const trimmed = value.trim()
  if (required && !trimmed) throw new ToolInputError(`"${name}" is required.`)
  if (trimmed.length > max) throw new ToolInputError(`"${name}" is longer than ${max} characters.`)
  return trimmed || undefined
}

function integer(args, name, { min, max, fallback }) {
  const value = args[name]
  if (value == null || value === '') return fallback
  const n = typeof value === 'string' ? Number(value) : value
  if (!Number.isInteger(n) || n < min || n > max) throw new ToolInputError(`"${name}" must be a whole number from ${min} to ${max}.`)
  return n
}

function choice(args, name, values) {
  const value = text(args, name, { max: 40 })
  if (value === undefined) return undefined
  const lower = value.toLowerCase()
  if (!values.includes(lower)) throw new ToolInputError(`"${name}" must be one of: ${values.join(', ')}.`)
  return lower
}

function stringList(args, name, max = 200) {
  const value = args[name]
  if (value == null) return []
  const list = Array.isArray(value) ? value : typeof value === 'string' ? value.split(',') : null
  if (!list) throw new ToolInputError(`"${name}" must be a list of question ids.`)
  return list.map(v => String(v).trim()).filter(Boolean).slice(0, max)
}

function examArg(ix, args, name = 'exam', { required = false } = {}) {
  const value = text(args, name, { required, max: 120 })
  if (value === undefined) return undefined
  const exam = ix.exam(value)
  if (!exam) throw new ToolInputError(`No exam called "${value}". Exams: ${ix.exams.map(e => e.key).join(', ')}.`)
  return exam
}

// ── Formatting ───────────────────────────────────────────────────────────────

const result = body => ({ content: [{ type: 'text', text: body }] })
const errorResult = body => ({ content: [{ type: 'text', text: body }], isError: true })

function factCheckLines(fc) {
  const lines = [`Fact check: ${fc.label} — ${fc.detail}`]
  // A source is only "checked against" once a check has happened.
  for (const s of fc.status === 'unverified' ? [] : fc.sources ?? []) {
    lines.push(`- Checked against ${s.label}${s.locator ? ` (${s.locator})` : ''}${s.url ? ` — ${s.url}` : ''}`)
  }
  return lines
}

function clip(body, url) {
  if (body.length <= MAX_TEXT) return body
  return `${body.slice(0, MAX_TEXT)}\n\n… (${body.length - MAX_TEXT} more characters — read the rest at ${url})`
}

function difficultySpread(questions) {
  const n = { easy: 0, medium: 0, hard: 0 }
  for (const q of questions) n[q.difficulty] = (n[q.difficulty] ?? 0) + 1
  return `easy ${n.easy} · medium ${n.medium} · hard ${n.hard}`
}

function examCatalogue(ix) {
  const rows = ix.exams.map(e => {
    const concepts = new Set(e.objectives.flatMap(o => o.concepts)).size
    return `| ${e.key} | ${e.name} — ${e.subject} | ${e.body} | ${STATUS_WORDS[e.status].split(' — ')[0]} | ${e.objectives.length} | ${concepts} | ${e.questionCount} |`
  })
  return [
    '# Exams covered by Actuarial Notes',
    '',
    '| Key | Exam | Body | Material | Objectives | Concepts | Practice questions |',
    '|---|---|---|---|---|---|---|',
    ...rows,
    '',
    'Material: complete = full syllabus and question bank; beta = usable, still being filled out; in development = syllabus outline only.',
    'Pass a key to get_exam for the syllabus, or to get_practice_questions for questions.',
  ].join('\n')
}

function examSyllabus(ix, exam) {
  const doc = ix.doc(exam.docId)
  const keystones = new Map(exam.keystones.map(k => [k.name.toLowerCase(), k]))
  const pool = ix.practicePool({ exam: exam.key })
  const lines = [
    `# ${exam.name} — ${exam.subject} (${exam.body})`,
    `Key: ${exam.key} · Material: ${STATUS_WORDS[exam.status]} · Syllabus page: ${exam.url}`,
    ...(doc ? factCheckLines(doc.factCheck) : []),
    '',
    exam.summary,
    '',
    '## Learning objectives',
  ]
  exam.objectives.forEach((o, i) => {
    const byObjective = pool.filter(q => objectiveMatches(q.objective, o.title))
    lines.push(
      '',
      `### ${i + 1}. ${o.title}${o.weight ? ` — ${o.weight} of the exam` : ''}`,
      `Concepts: ${o.concepts.map(c => (keystones.has(c.toLowerCase()) ? `${c} ★` : c)).join(', ') || '—'}`,
    )
    if (byObjective.length) lines.push(`Practice questions: ${byObjective.length} (${difficultySpread(byObjective)})`)
  })
  if (exam.keystones.length) {
    lines.push('', '## Keystone concepts (★) — the ones the rest of the syllabus leans on; learn these first')
    for (const k of exam.keystones) lines.push(`- **${k.name}** — ${k.why}`)
  }
  if (exam.readings.length) {
    lines.push('', '## Readings')
    for (const r of exam.readings) {
      lines.push(`- ${r.title}${r.detail ? ` — ${r.detail}` : ''}${r.docId ? ` (id: ${r.docId})` : ''}`)
    }
  }
  if (exam.guides.length) {
    lines.push('', '## Exam guides — format, scoring and how to study (read with fetch)')
    for (const g of exam.guides) lines.push(`- ${g.title} (id: ${g.id})`)
  }
  lines.push('', '## Practice question bank')
  lines.push(pool.length
    ? `${pool.length} questions (${difficultySpread(pool)}). Draw a set with get_practice_questions {"exam": "${exam.key}"}.`
    : 'No practice questions yet for this exam.')
  return lines.join('\n')
}

function objectiveMatches(questionObjective, title) {
  const strip = s => String(s ?? '').trim().replace(/^[A-Z]\.\s+/, '').replace(/\s+/g, ' ').toLowerCase()
  const a = strip(questionObjective)
  const b = strip(title)
  return a !== '' && (a === b || b.includes(a) || a.includes(b))
}

function conceptSummary(ix, doc) {
  const examLines = []
  for (const exam of ix.exams) {
    const objectives = exam.objectives.filter(o => o.concepts.some(c => c.toLowerCase() === doc.title.toLowerCase()))
    if (!objectives.length) continue
    const keystone = exam.keystones.find(k => k.name.toLowerCase() === doc.title.toLowerCase())
    examLines.push(`- ${exam.name} (${exam.key}) → ${objectives.map(o => `${o.title}${o.weight ? ` (${o.weight})` : ''}`).join('; ')}${keystone ? ` · keystone ★ — ${keystone.why}` : ''}`)
  }
  const counts = [...ix.conceptQuestionCounts(doc.title)].map(([exam, n]) => `${n} on Exam ${exam}`)
  const aliases = doc.aliases.filter(a => normalizeTerm(a) !== normalizeTerm(doc.title)).slice(0, 6)
  const lines = [
    `# ${doc.title}`,
    `Concept page: ${doc.url} (id: ${doc.id})`,
    ...(aliases.length ? [`Also written: ${aliases.join(', ')}`] : []),
    ...(examLines.length ? ['On the syllabus of:', ...examLines] : ['Not on any exam syllabus in the notes (a supporting concept).']),
    counts.length
      ? `Practice questions: ${counts.join(', ')} — get_practice_questions {"concept": "${doc.title}"}`
      : 'Practice questions: none tagged with this concept.',
    ...factCheckLines(doc.factCheck),
    '',
    '---',
    '',
    doc.text
      ? clip(doc.text, doc.url)
      : '_This page has no content yet — the concept is named on the syllabus but not written up. Answer from the syllabus reading and say that the notes have no page for it._',
  ]
  if (doc.links.length) lines.push('', '---', `Linked pages: ${doc.links.join(', ')}`)
  return lines.join('\n')
}

function docFull(ix, doc) {
  if (doc.kind === 'exam') {
    const exam = ix.exams.find(e => e.docId === doc.id)
    if (exam) return examSyllabus(ix, exam)
  }
  if (doc.kind === 'concept') return conceptSummary(ix, doc)
  const meta = Object.entries(doc.meta ?? {})
    .filter(([k]) => !['aliases', 'tags', 'impacted_agents', 'order', 'section', 'exam', 'id'].includes(k))
    .map(([k, v]) => `${k}: ${Array.isArray(v) ? v.join(', ') : v}`)
  return [
    `# ${doc.title}`,
    `${doc.kind === 'guide' ? 'Guide' : 'Source'}: ${doc.url} (id: ${doc.id})`,
    ...(doc.exams.length ? [`Exams: ${doc.exams.join(', ')}`] : []),
    ...(meta.length ? [meta.join(' · ')] : []),
    ...factCheckLines(doc.factCheck),
    '',
    '---',
    '',
    doc.text ? clip(doc.text, doc.url) : '_This page has no content yet._',
  ].join('\n')
}

function examName(ix, key) {
  return ix.exam(key)?.name ?? `Exam ${key}`
}

function questionHeading(ix, q) {
  return [
    examName(ix, q.exam),
    q.objective,
    q.topic,
    q.difficulty,
    `${q.points} point${q.points === 1 ? '' : 's'}`,
    ...(q.sitting ? [`${q.originallyExam ?? examName(ix, q.exam)} ${q.sitting} paper`] : []),
  ].filter(Boolean).join(' · ')
}

function optionLines(options) {
  return options.map(o => `- ${o.key}) ${o.text}`)
}

/** The question as a student sees it: no answer, no solution. */
function questionPrompt(ix, q) {
  const lines = [questionHeading(ix, q), '', q.stem]
  if (q.options.length) lines.push('', ...optionLines(q.options))
  for (const part of q.parts ?? []) {
    // A question with no lettered parts is parsed as one implicit part with no
    // stem of its own: its points are already in the heading.
    const implicit = q.parts.length === 1 && !part.stem
    if (!implicit) lines.push('', `**(${part.label})** ${part.points ? `[${part.points} point${part.points === 1 ? '' : 's'}] ` : ''}${part.stem}`.trim())
    if (part.options.length) lines.push('', ...optionLines(part.options))
  }
  if (q.factCheck.status !== 'unverified' || q.factCheck.openFindings > 0) lines.push('', `Fact check: ${q.factCheck.label} — ${q.factCheck.detail}`)
  return lines.join('\n')
}

function solutionLines(q) {
  const lines = []
  if (q.parts?.length) {
    for (const part of q.parts) {
      const label = q.parts.length === 1 ? '' : ` (${part.label})`
      if (part.answer) lines.push('', `### Answer${label}: ${answerText(part.answer, part.options)}`)
      if (part.explanation) lines.push('', `### ${part.answer ? 'Solution' : 'Model answer'}${label}`, part.explanation)
      if (part.examinerReport) lines.push('', `### Examiner's report${label}`, part.examinerReport)
    }
  } else {
    lines.push('', `### Answer: ${answerText(q.answer, q.options)}`)
    if (q.explanation) lines.push('', '### Solution', q.explanation)
    if (q.examinerReport) lines.push('', "### Examiner's report", q.examinerReport)
  }
  return lines
}

function answerText(answer, options) {
  const option = options?.find(o => o.key === answer)
  return option ? `${option.key}) ${option.text}` : answer
}

function questionFull(ix, q) {
  return [
    `# Practice question ${q.id}`,
    `Open in the app: ${q.url}`,
    '',
    questionPrompt(ix, q),
    ...solutionLines(q),
    '',
    `Concepts: ${q.concepts.join(', ') || '—'}`,
    `Fact check: ${q.factCheck.label} — ${q.factCheck.detail}`,
  ].join('\n')
}

// ── Marking ──────────────────────────────────────────────────────────────────

/** Mirrors `normalizeAnswerText` in src/lib/parser.ts: "$3,400" and "3400" are one answer. */
export function normalizeAnswerText(value) {
  const trimmed = String(value ?? '').trim()
  const stripped = trimmed.replace(/[$€£,]/g, '')
  const num = Number(stripped)
  if (stripped !== '' && !isNaN(num)) return String(Math.round(num * 10000) / 10000)
  return trimmed.toLowerCase()
}

/** The option a student means — "C", "(c)", "C) 20", "answer: C", or the option's own text — or null. */
export function optionLetter(raw, options) {
  const s = String(raw ?? '').trim()
  const keys = new Set(options.map(o => o.key))
  const bare = /^\(?\s*([A-Ea-e])\s*\)?\s*[.:]?\s*$/.exec(s) ?? /^\(?([A-Ea-e])[).:\]]\s*\S/.exec(s)
    ?? /^(?:the\s+)?(?:answer|option|choice)\s*(?:is\s*)?:?\s*\(?([A-Ea-e])\b/i.exec(s)
  if (bare && keys.has(bare[1].toUpperCase())) return bare[1].toUpperCase()
  const wanted = normalizeAnswerText(s)
  const byText = options.find(o => normalizeAnswerText(o.text.replace(/\$/g, '')) === wanted || normalizeAnswerText(o.text) === wanted)
  return byText ? byText.key : null
}

function numeric(value) {
  const n = Number(String(value ?? '').trim().replace(/[$€£,\s]/g, ''))
  return Number.isFinite(n) ? n : null
}

/** 'correct' | 'close' | 'incorrect' for an entered number or phrase against the key. */
function markFreeEntry(given, key) {
  if (normalizeAnswerText(given) === normalizeAnswerText(key)) return 'correct'
  const a = numeric(given)
  const b = numeric(key)
  if (a !== null && b !== null && b !== 0 && Math.abs(a - b) / Math.abs(b) <= 0.01) return 'close'
  return 'incorrect'
}

const VERDICT = { correct: '✅ Correct', close: '≈ Close — check rounding against the key', incorrect: '❌ Incorrect' }

// ── Tools ────────────────────────────────────────────────────────────────────

const READ_ONLY = { readOnlyHint: true, destructiveHint: false, idempotentHint: true, openWorldHint: false }

function invoking(busy, done) {
  // ChatGPT shows these while a tool runs; other clients ignore them.
  return { 'openai/toolInvocation/invoking': busy, 'openai/toolInvocation/invoked': done }
}

const DOC_TYPES = ['concept', 'exam', 'resource', 'guide', 'question']
const EXAM_ARG = {
  type: 'string',
  description: 'Exam key or name: "P", "FM", "MAS-I", "MAS-II", "5", "6C", "6U", "7", "8", "9", "PCPA" (also accepts "Exam P", "Probability", "MAS 1"…).',
}

export const TOOLS = [
  {
    name: 'search',
    title: 'Search Actuarial Notes',
    description:
      'Search the Actuarial Notes knowledge base for the SOA/CAS actuarial exams — concept pages (definitions, formulas, worked examples), exam syllabi, textbook and regulation pages, exam-strategy guides and practice questions. Returns ranked results as JSON: {"results": [{id, title, url, text, type, exams, fact_check}]}, where text is a short snippet. Read a result in full with fetch. Search before answering any question you mean to ground in the notes.',
    inputSchema: {
      type: 'object',
      properties: {
        query: { type: 'string', description: 'What to look for: a concept, formula, method, reading or question, e.g. "chain ladder method", "Bühlmann credibility", "present value of an annuity-immediate".' },
        type: { type: 'string', enum: DOC_TYPES, description: 'Only return this kind of document.' },
        exam: { ...EXAM_ARG, description: `Only return material for this exam. ${EXAM_ARG.description}` },
        limit: { type: 'integer', minimum: 1, maximum: 20, default: 8, description: 'How many results (default 8).' },
      },
      required: ['query'],
    },
    annotations: { title: 'Search Actuarial Notes', ...READ_ONLY },
    _meta: invoking('Searching Actuarial Notes…', 'Searched Actuarial Notes'),
    run(args, ix) {
      const query = text(args, 'query', { required: true })
      const type = choice(args, 'type', DOC_TYPES)
      const exam = examArg(ix, args)
      const limit = integer(args, 'limit', { min: 1, max: 20, fallback: 8 })
      const hits = ix.search(query, { type, exam: exam?.key, limit })
      const results = hits.map(({ type: kind, item, snippet }) => kind === 'question'
        ? {
            id: `question/${item.id}`,
            title: `${examName(ix, item.exam)} practice question ${item.id} — ${item.topic} (${item.difficulty})`,
            url: item.url,
            text: snippet,
            type: 'question',
            exams: [item.exam],
            fact_check: item.factCheck.label,
          }
        : {
            id: item.id,
            title: item.title,
            url: item.url,
            text: snippet || item.summary,
            type: kind,
            exams: item.exams,
            fact_check: item.factCheck.label,
          })
      return result(JSON.stringify({ results }))
    },
  },
  {
    name: 'fetch',
    title: 'Read an Actuarial Notes document',
    description:
      'Read one Actuarial Notes document in full by the id a search result gave you — e.g. "concept/Bayes Theorem", "exam/FM", "resource/Basic Ratemaking (Werner - 2016)", "question/p-004". Returns JSON {id, title, text, url, metadata} with the document as markdown (formulas in LaTeX). A practice question is returned with its answer and solution, so to quiz someone use get_practice_questions and check_answer instead.',
    inputSchema: {
      type: 'object',
      properties: { id: { type: 'string', description: 'The document id from a search result (a concept name or exam key also works).' } },
      required: ['id'],
    },
    annotations: { title: 'Read an Actuarial Notes document', ...READ_ONLY },
    _meta: invoking('Reading Actuarial Notes…', 'Read from Actuarial Notes'),
    run(args, ix) {
      const id = text(args, 'id', { required: true })
      const hit = ix.resolve(id)
      if (!hit) return errorResult(`No document with id "${id}". Use search to find one.`)
      if (hit.withheld) {
        return errorResult(`Question ${hit.withheld.id} is withheld: ${hit.withheld.reason} It is kept out of every quiz until it is fixed.`)
      }
      if (hit.question) {
        const q = hit.question
        return result(JSON.stringify({
          id: `question/${q.id}`,
          title: `${examName(ix, q.exam)} practice question ${q.id}`,
          text: questionFull(ix, q),
          url: q.url,
          metadata: { type: 'question', exam: q.exam, topic: q.topic, objective: q.objective, difficulty: q.difficulty, sitting: q.sitting, concepts: q.concepts, fact_check: q.factCheck.label },
        }))
      }
      const doc = hit.doc
      return result(JSON.stringify({
        id: doc.id,
        title: doc.title,
        text: docFull(ix, doc),
        url: doc.url,
        metadata: { type: doc.kind, exams: doc.exams, fact_check: doc.factCheck.label, last_checked: doc.factCheck.checked, source_file: doc.path },
      }))
    },
  },
  {
    name: 'list_exams',
    title: 'List exams',
    description:
      'List the actuarial exams Actuarial Notes covers — SOA P and FM; CAS MAS-I, MAS-II, 5, 6C, 6U, 7, 8, 9 and PCPA — with each exam\'s key, subject, how complete its material is, and how many practice questions it has.',
    inputSchema: { type: 'object', properties: {}, additionalProperties: false },
    annotations: { title: 'List exams', ...READ_ONLY },
    _meta: invoking('Listing exams…', 'Listed exams'),
    run(_args, ix) {
      return result(examCatalogue(ix))
    },
  },
  {
    name: 'get_exam',
    title: 'Get an exam syllabus',
    description:
      "An exam's syllabus from Actuarial Notes: its learning objectives with their share of the exam and the concepts under each, the assigned readings with chapters, the keystone concepts to learn first, the exam-day guides (format, scoring, calculators, strategy), and the practice-question bank by objective and difficulty. Use it to orient a study session, answer \"what's on the exam\", or build a study plan.",
    inputSchema: { type: 'object', properties: { exam: EXAM_ARG }, required: ['exam'] },
    annotations: { title: 'Get an exam syllabus', ...READ_ONLY },
    _meta: invoking('Reading the syllabus…', 'Read the syllabus'),
    run(args, ix) {
      return result(examSyllabus(ix, examArg(ix, args, 'exam', { required: true })))
    },
  },
  {
    name: 'get_concept',
    title: 'Read a concept page',
    description:
      'Read a concept page from Actuarial Notes by name — the definition, formulas (LaTeX) and worked examples — together with the exams and learning objectives it is tested under, whether it is a keystone concept, the pages it links to, how many practice questions cover it, and its fact-check status. Accepts common variants and abbreviations ("MLE", "Buhlmann credibility", "IBNR", "annuities").',
    inputSchema: {
      type: 'object',
      properties: { name: { type: 'string', description: 'The concept, e.g. "Bayes Theorem", "Chain Ladder Method", "Macaulay Duration".' } },
      required: ['name'],
    },
    annotations: { title: 'Read a concept page', ...READ_ONLY },
    _meta: invoking('Reading the concept page…', 'Read the concept page'),
    run(args, ix) {
      const name = text(args, 'name', { required: true })
      const doc = ix.concept(name)
      if (doc) return result(conceptSummary(ix, doc))
      const near = ix.suggestConcepts(name)
      return errorResult(`No concept page called "${name}".${near.length ? ` Closest pages: ${near.join('; ')}.` : ''} Try get_concept with one of those, or search.`)
    },
  },
  {
    name: 'get_practice_questions',
    title: 'Draw practice questions',
    description:
      'Draw practice questions from the Actuarial Notes question bank — past SOA/CAS exam and sample questions with official worked solutions. The answers are NOT included: present one question at a time exactly as written, let the student answer, then call check_answer. Filter by exam and optionally by concept, learning objective, topic, difficulty or past sitting. Pass the ids already asked in `exclude` to draw fresh ones.',
    inputSchema: {
      type: 'object',
      properties: {
        exam: { ...EXAM_ARG, description: `The exam to draw from (required unless a concept is given). ${EXAM_ARG.description}` },
        concept: { type: 'string', description: 'Only questions on this concept, e.g. "Conditional Probability".' },
        objective: { type: 'string', description: 'Only questions under this learning objective, as get_exam lists it, e.g. "Univariate Random Variables".' },
        topic: { type: 'string', description: 'Only questions whose topic contains this, e.g. "Deductible".' },
        difficulty: { type: 'string', enum: ['easy', 'medium', 'hard'] },
        sitting: { type: 'string', description: 'Only questions from one past paper, e.g. "Fall 2019" or "2014" (CAS papers carry a sitting).' },
        count: { type: 'integer', minimum: 1, maximum: 10, default: 3, description: 'How many questions (default 3).' },
        exclude: { type: 'array', items: { type: 'string' }, description: 'Question ids not to draw again.' },
        seed: { type: 'integer', description: 'Set to repeat the same draw.' },
      },
    },
    annotations: { title: 'Draw practice questions', readOnlyHint: true, destructiveHint: false, idempotentHint: false, openWorldHint: false },
    _meta: invoking('Drawing practice questions…', 'Drew practice questions'),
    run(args, ix) {
      const exam = examArg(ix, args)
      const conceptName = text(args, 'concept', { max: 200 })
      const objective = text(args, 'objective', { max: 200 })
      const topic = text(args, 'topic', { max: 200 })
      const difficulty = choice(args, 'difficulty', ['easy', 'medium', 'hard'])
      const sitting = text(args, 'sitting', { max: 40 })
      const count = integer(args, 'count', { min: 1, max: 10, fallback: 3 })
      const seed = integer(args, 'seed', { min: -(2 ** 31), max: 2 ** 31 - 1, fallback: undefined })
      const exclude = new Set(stringList(args, 'exclude').map(id => id.replace(/^question\//i, '').toLowerCase()))
      if (!exam && !conceptName) throw new ToolInputError('Give an exam (e.g. "P") or a concept to draw questions for.')
      let concept
      if (conceptName) {
        concept = ix.concept(conceptName)
        if (!concept) {
          const near = ix.suggestConcepts(conceptName)
          return errorResult(`No concept page called "${conceptName}".${near.length ? ` Closest pages: ${near.join('; ')}.` : ''}`)
        }
      }
      const pool = ix.practicePool({ exam: exam?.key, concept: concept?.title, objective, topic, difficulty, sitting })
        .filter(q => !exclude.has(q.id.toLowerCase()))
      const scope = [exam?.name, concept?.title, objective, topic, difficulty, sitting].filter(Boolean).join(' · ')
      if (pool.length === 0) {
        const hint = exam && exam.questionCount === 0
          ? `${exam.name} has no practice questions yet.`
          : 'Nothing matches — loosen a filter (get_exam lists the objectives and their question counts).'
        return errorResult(`No practice questions for ${scope || 'that selection'}. ${hint}`)
      }
      const drawn = sample(pool, count, seed)
      const ids = drawn.map(q => q.id)
      const lines = [
        `# Practice set — ${scope} · ${drawn.length} question${drawn.length === 1 ? '' : 's'}`,
        'Answers are hidden. Ask one question at a time, exactly as written, and wait for the student\'s answer. Then call check_answer with the question id and their answer. Don\'t reveal or hint at an answer first.',
        `Take this set in the Actuarial Notes app (progress is tracked there): ${ix.kb.site}/quiz?ids=${ids.map(encodeURIComponent).join(',')}`,
        `(${pool.length} questions matched; to draw more without repeats, pass these ids in exclude.)`,
      ]
      drawn.forEach((q, i) => lines.push('', '---', '', `## Question ${i + 1} · id: ${q.id}`, questionPrompt(ix, q)))
      return result(lines.join('\n'))
    },
  },
  {
    name: 'check_answer',
    title: 'Check an answer',
    description:
      "Mark a student's answer to a practice question and reveal the official answer and worked solution (and the examiner's report for CAS written questions). Call it only after the student has answered. Multiple-choice letters and numeric answers are marked automatically; a written answer comes back with the model solution for you to grade against. Omit the answer to just reveal the solution.",
    inputSchema: {
      type: 'object',
      properties: {
        question_id: { type: 'string', description: 'The question id, e.g. "p-004" or "cas5-2013f-q1".' },
        answer: { type: 'string', description: "The student's answer: an option letter (\"C\"), a number, or their written response." },
        parts: {
          type: 'object',
          additionalProperties: { type: 'string' },
          description: 'For a multi-part question, the student\'s answer to each part, keyed by part letter, e.g. {"a": "1.25", "b": "C"}.',
        },
      },
      required: ['question_id'],
    },
    annotations: { title: 'Check an answer', ...READ_ONLY },
    _meta: invoking('Checking the answer…', 'Checked the answer'),
    run(args, ix) {
      const id = text(args, 'question_id', { required: true, max: 120 })
      const answer = text(args, 'answer', { max: 5000 })
      const parts = isObject(args.parts) ? args.parts : null
      const withheld = ix.withheldQuestion(id)
      if (withheld) return errorResult(`Question ${withheld.id} is withheld: ${withheld.reason}`)
      const q = ix.question(id)
      if (!q) return errorResult(`No practice question with id "${id}".`)
      const marked = markQuestion(ix, q, answer, parts)
      return marked.unreadable ? errorResult(marked.text) : result(marked.text)
    },
  },
]

const TOOLS_BY_NAME = new Map(TOOLS.map(t => [t.name, t]))

/** A deterministic shuffle when seeded (mulberry32), otherwise a random one. */
function sample(pool, count, seed) {
  let state = seed === undefined ? Math.floor(Math.random() * 2 ** 32) : seed >>> 0
  const random = () => {
    state = (state + 0x6d2b79f5) >>> 0
    let t = state
    t = Math.imul(t ^ (t >>> 15), t | 1)
    t ^= t + Math.imul(t ^ (t >>> 7), t | 61)
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296
  }
  const copy = pool.slice()
  for (let i = copy.length - 1; i > 0; i--) {
    const j = Math.floor(random() * (i + 1))
    ;[copy[i], copy[j]] = [copy[j], copy[i]]
  }
  return copy.slice(0, count)
}

function markQuestion(ix, q, answer, parts) {
  const lines = [`# ${q.id} — ${questionHeading(ix, q)}`]
  // Per-part answers only mean something for a question that has parts.
  const answered = q.parts?.length ? answer !== undefined || parts !== null : answer !== undefined
  if (!answered) {
    lines.push('', 'No answer given — here is the solution.')
  } else if (q.parts?.length) {
    const given = parts ?? (q.parts.length === 1 && answer !== undefined ? { [q.parts[0].label]: answer } : null)
    if (!given && answer !== undefined) lines.push('', `Student's answer: ${answer}`)
    for (const part of q.parts) {
      const response = given?.[part.label] ?? given?.[part.label.toUpperCase()]
      const label = q.parts.length === 1 ? 'Answer' : `Part (${part.label})`
      if (response === undefined) continue
      if (!part.answer) {
        lines.push('', `${label}: written answer — grade it against the model answer and examiner's report below.`, `Student wrote: ${response}`)
      } else if (part.type === 'multiple-choice') {
        const letter = optionLetter(response, part.options)
        lines.push('', `${label}: ${letter === null ? `couldn't read an option letter from "${response}"` : VERDICT[letter === part.answer ? 'correct' : 'incorrect']} — student said ${letter ?? response}, key ${answerText(part.answer, part.options)}`)
      } else {
        lines.push('', `${label}: ${VERDICT[markFreeEntry(response, part.answer)]} — student said ${response}, key ${part.answer}`)
      }
    }
  } else {
    if (q.type === 'multiple-choice') {
      const letter = optionLetter(answer, q.options)
      if (letter === null) {
        return {
          unreadable: true,
          text: `Couldn't read an option letter from "${answer}". Ask the student which option (${q.options.map(o => o.key).join(', ')}) they choose, then call check_answer again. The answer has not been revealed.`,
        }
      }
      lines.push('', `${VERDICT[letter === q.answer ? 'correct' : 'incorrect']} — the student chose ${answerText(letter, q.options)}.`)
    } else {
      lines.push('', `${VERDICT[markFreeEntry(answer, q.answer)]} — the student answered ${answer}.`)
    }
  }
  lines.push(...solutionLines(q))
  lines.push(
    '',
    `Concepts to review: ${q.concepts.join(', ') || '—'} (read them with get_concept)`,
    `Open in the app: ${q.url}`,
    `Fact check: ${q.factCheck.label} — ${q.factCheck.detail}`,
  )
  return { text: lines.join('\n') }
}

// ── Resources ────────────────────────────────────────────────────────────────

const SCHEME = 'actuarialnotes://'

const RESOURCE_TEMPLATES = [
  { uriTemplate: `${SCHEME}exam/{exam}`, name: 'exam', title: 'Exam syllabus', description: 'An exam\'s syllabus: objectives and weights, concepts, readings, keystones, guides and question bank.', mimeType: 'text/markdown' },
  { uriTemplate: `${SCHEME}concept/{name}`, name: 'concept', title: 'Concept page', description: 'A concept page: definition, formulas and worked examples, with where it is examined.', mimeType: 'text/markdown' },
  { uriTemplate: `${SCHEME}resource/{name}`, name: 'resource', title: 'Source page', description: 'A textbook, study note, standard or regulation page.', mimeType: 'text/markdown' },
  { uriTemplate: `${SCHEME}question/{id}`, name: 'question', title: 'Practice question', description: 'A practice question with its answer and worked solution.', mimeType: 'text/markdown' },
]

function readResource(ix, uri) {
  if (typeof uri !== 'string' || !uri.startsWith(SCHEME)) throw new ResourceNotFoundError(uri)
  const rest = uri.slice(SCHEME.length)
  if (rest === 'exams') return examCatalogue(ix)
  const slash = rest.indexOf('/')
  if (slash < 0) throw new ResourceNotFoundError(uri)
  const kind = rest.slice(0, slash)
  let name = rest.slice(slash + 1)
  try {
    name = decodeURIComponent(name)
  } catch {
    throw new ResourceNotFoundError(uri)
  }
  if (kind === 'exam') {
    const exam = ix.exam(name)
    if (exam) return examSyllabus(ix, exam)
  } else if (kind === 'concept') {
    const doc = ix.concept(name)
    if (doc) return conceptSummary(ix, doc)
  } else if (kind === 'question') {
    const q = ix.question(name)
    if (q) return questionFull(ix, q)
  } else if (kind === 'resource' || kind === 'guide') {
    const doc = ix.doc(`${kind}/${name}`) ?? ix.resolve(`${kind}/${name}`)?.doc
    if (doc && doc.kind === kind) return docFull(ix, doc)
  }
  throw new ResourceNotFoundError(uri)
}

// ── Prompts (the skills) ─────────────────────────────────────────────────────

const PROMPTS = [
  {
    name: 'study_session',
    title: 'Study session',
    description: 'A focused, grounded study session on one exam: pick where to start, teach a concept at a time from the notes, and check understanding with real exam questions.',
    arguments: [
      { name: 'exam', description: 'The exam, e.g. "P", "FM", "MAS-I", "5".', required: true },
      { name: 'focus', description: 'Optional: a learning objective or concept to concentrate on.', required: false },
    ],
  },
  {
    name: 'explain_concept',
    title: 'Explain a concept',
    description: 'Explain one concept from its Actuarial Notes page: intuition, definition and formula, a worked example, and the traps exam questions set.',
    arguments: [
      { name: 'concept', description: 'The concept, e.g. "Bornhuetter-Ferguson Method".', required: true },
      { name: 'exam', description: 'Optional: the exam you are studying for.', required: false },
    ],
  },
  {
    name: 'practice_quiz',
    title: 'Practice quiz',
    description: 'A quiz from the exam question bank, one question at a time, marked against the official solutions — with a score and what to review at the end.',
    arguments: [
      { name: 'exam', description: 'The exam, e.g. "P".', required: true },
      { name: 'focus', description: 'Optional: a concept or learning objective to draw from.', required: false },
      { name: 'count', description: 'Optional: how many questions (default 5, at most 10).', required: false },
    ],
  },
  {
    name: 'study_plan',
    title: 'Study plan',
    description: 'A week-by-week study plan for an exam, weighted by the syllabus: keystone concepts first, readings scheduled, and practice and review built in.',
    arguments: [
      { name: 'exam', description: 'The exam, e.g. "FM".', required: true },
      { name: 'weeks', description: 'Optional: weeks until the exam (default 10).', required: false },
      { name: 'hours_per_week', description: 'Optional: study hours available each week.', required: false },
    ],
  },
]

const PROMPTS_BY_NAME = new Map(PROMPTS.map(p => [p.name, p]))

const userText = body => ({ role: 'user', content: { type: 'text', text: body } })
const embedded = (uri, body) => ({ role: 'user', content: { type: 'resource', resource: { uri, mimeType: 'text/markdown', text: body } } })

function promptArg(args, name, { required = false } = {}) {
  const value = isObject(args) ? args[name] : undefined
  const trimmed = typeof value === 'string' ? value.trim() : value == null ? '' : String(value).trim()
  if (required && !trimmed) throw new McpError(ErrorCode.INVALID_PARAMS, `Missing required argument: ${name}`)
  return trimmed || undefined
}

function promptExam(ix, args) {
  const value = promptArg(args, 'exam', { required: true })
  const exam = ix.exam(value)
  if (!exam) throw new McpError(ErrorCode.INVALID_PARAMS, `No exam called "${value}". Exams: ${ix.exams.map(e => e.key).join(', ')}.`)
  return exam
}

function getPrompt(ix, name, args) {
  if (name === 'study_session') {
    const exam = promptExam(ix, args)
    const focus = promptArg(args, 'focus')
    return {
      description: `Study session — ${exam.name}${focus ? `: ${focus}` : ''}`,
      messages: [
        embedded(`${SCHEME}exam/${encodeURIComponent(exam.key)}`, examSyllabus(ix, exam)),
        userText(`Run a focused study session with me for ${exam.name} (${exam.subject}) using the Actuarial Notes connector. The syllabus is attached.

1. ${focus ? `Concentrate on ${focus}.` : 'Suggest where to start — a high-weight learning objective or a keystone concept (★) — and tell me why in one sentence.'}
2. Teach one concept at a time. Read it with get_concept, then explain it: the intuition, the definition and key formula, and a short worked example. Cite the page URL.
3. After each concept, check my understanding with one question from get_practice_questions (concept filter). Wait for my answer, mark it with check_answer, and walk me through the official solution — the step I missed first.
4. Keep track of what I get wrong. When I say stop, give me a three-line summary and what to study next.

Stay grounded in the notes. If a page is marked as not fact checked or has a known issue and the detail matters, say so and point me to the official reading.`),
      ],
    }
  }
  if (name === 'explain_concept') {
    const conceptName = promptArg(args, 'concept', { required: true })
    const examValue = promptArg(args, 'exam')
    const exam = examValue ? ix.exam(examValue) : null
    const doc = ix.concept(conceptName)
    const target = doc?.title ?? conceptName
    const ask = `Explain ${target} to me${exam ? ` as it is tested on ${exam.name}` : ''}, from its Actuarial Notes page${doc ? ' (attached)' : ' — find it with get_concept or search'}:

1. The intuition, in two or three plain sentences.
2. The precise definition and the key formula(s), in LaTeX, with every symbol named.
3. A worked example, step by step — use the page's example if it has one.
4. The traps: what exam questions typically test about it, and the mistakes candidates make.
5. The related concepts I should understand first, from the page's links.

Cite the page URL and mention its fact-check status. Then offer me a practice question on it (get_practice_questions with concept "${target}").`
    return {
      description: `Explain ${target}`,
      messages: doc ? [embedded(`${SCHEME}concept/${encodeURIComponent(doc.title)}`, conceptSummary(ix, doc)), userText(ask)] : [userText(ask)],
    }
  }
  if (name === 'practice_quiz') {
    const exam = promptExam(ix, args)
    const focus = promptArg(args, 'focus')
    const requested = Number(promptArg(args, 'count') ?? 5)
    const count = Number.isInteger(requested) ? Math.min(Math.max(requested, 1), 10) : 5
    const focusConcept = focus ? ix.concept(focus) : null
    const filter = { exam: exam.key, count, ...(focusConcept ? { concept: focusConcept.title } : focus ? { objective: focus } : {}) }
    return {
      description: `Practice quiz — ${exam.name}${focus ? `: ${focus}` : ''}`,
      messages: [
        userText(`Quiz me on ${exam.name}${focus ? ` — ${focus}` : ''}. Call get_practice_questions with ${JSON.stringify(filter)}.

- Ask the questions one at a time, exactly as written, with their answer options. Don't reveal or hint at the answer.
- After each of my answers, call check_answer with the question id and my answer. Tell me if I was right, then walk through the official solution briefly — the step I missed first.
- At the end, give my score, the concepts behind the questions I missed, and the app link to retake the set.`),
      ],
    }
  }
  if (name === 'study_plan') {
    const exam = promptExam(ix, args)
    const weeksRaw = Number(promptArg(args, 'weeks') ?? 10)
    const weeks = Number.isFinite(weeksRaw) && weeksRaw > 0 ? Math.min(Math.round(weeksRaw), 52) : 10
    const hours = promptArg(args, 'hours_per_week')
    return {
      description: `Study plan — ${exam.name}, ${weeks} weeks`,
      messages: [
        embedded(`${SCHEME}exam/${encodeURIComponent(exam.key)}`, examSyllabus(ix, exam)),
        userText(`Build me a ${weeks}-week study plan for ${exam.name}${hours ? ` with about ${hours} hours a week` : ''}, from the attached syllabus.

- Give each learning objective time in proportion to its weight on the exam.
- Put the keystone concepts (★) first, and each concept after the ones it depends on.
- Schedule the assigned readings, with their chapters, alongside the objectives they cover.
- Keep the last quarter of the plan for mixed practice (get_practice_questions, including past sittings) and review of weak areas.
- Present it week by week as a table: objectives, concepts, readings, practice target.

Use only what the syllabus says; don't invent readings or weights. Mention that the Actuarial Notes app can turn this into a daily plan with spaced review.`),
      ],
    }
  }
  throw new McpError(ErrorCode.INVALID_PARAMS, `Unknown prompt: ${name}`)
}

// ── The server ───────────────────────────────────────────────────────────────

/**
 * @param {{ loadIndex: () => Promise<ReturnType<import('./knowledgeBase.js').indexKnowledgeBase>>, siteUrl?: string }} options
 */
export function createActuarialNotesServer({ loadIndex, siteUrl = DEFAULT_SITE_URL }) {
  const site = siteUrl.replace(/\/+$/, '')
  const index = async () => {
    try {
      return await loadIndex()
    } catch (err) {
      throw new McpError(ErrorCode.INTERNAL_ERROR, 'The Actuarial Notes knowledge base could not be loaded right now. Try again in a moment.', {
        reason: err instanceof Error ? err.message : String(err),
      })
    }
  }

  return {
    info: {
      name: 'actuarial-notes',
      title: 'Actuarial Notes',
      version: SERVER_VERSION,
      description: 'Study notes, syllabi and practice questions for the SOA and CAS actuarial exams.',
      websiteUrl: site,
      icons: [{ src: `${site}/actuarialnotes-logo-black-512.png`, mimeType: 'image/png', sizes: ['512x512'] }],
    },
    instructions: INSTRUCTIONS,
    capabilities: {
      tools: { listChanged: false },
      resources: { subscribe: false, listChanged: false },
      prompts: { listChanged: false },
      completions: {},
    },
    cacheTtlMs: CACHE_TTL_MS,
    methods: {
      'tools/list': params => {
        rejectCursor(params)
        return { tools: TOOLS.map(({ run: _run, ...definition }) => definition) }
      },
      'tools/call': async params => {
        const tool = TOOLS_BY_NAME.get(params.name)
        if (!tool) throw new McpError(ErrorCode.INVALID_PARAMS, `Unknown tool: ${params.name}`)
        const ix = await index()
        try {
          return await tool.run(isObject(params.arguments) ? params.arguments : {}, ix)
        } catch (err) {
          if (err instanceof ToolInputError) return errorResult(err.message)
          throw err
        }
      },
      'resources/list': async params => {
        rejectCursor(params)
        const ix = await index()
        return {
          resources: [
            { uri: `${SCHEME}exams`, name: 'exams', title: 'Exam catalogue', description: 'Every exam Actuarial Notes covers, and how complete its material is.', mimeType: 'text/markdown' },
            ...ix.exams.map(e => ({
              uri: `${SCHEME}exam/${encodeURIComponent(e.key)}`,
              name: `exam-${e.key.toLowerCase()}`,
              title: `${e.name} syllabus — ${e.subject}`,
              description: `${e.body} · ${STATUS_WORDS[e.status]}`,
              mimeType: 'text/markdown',
            })),
          ],
        }
      },
      'resources/templates/list': params => {
        rejectCursor(params)
        return { resourceTemplates: RESOURCE_TEMPLATES }
      },
      'resources/read': async params => {
        const ix = await index()
        return { contents: [{ uri: params.uri, mimeType: 'text/markdown', text: readResource(ix, params.uri) }] }
      },
      'prompts/list': params => {
        rejectCursor(params)
        return { prompts: PROMPTS }
      },
      'prompts/get': async params => {
        if (!PROMPTS_BY_NAME.has(params.name)) throw new McpError(ErrorCode.INVALID_PARAMS, `Unknown prompt: ${params.name}`)
        return getPrompt(await index(), params.name, params.arguments)
      },
      'completion/complete': async params => {
        const ref = isObject(params.ref) ? params.ref : {}
        const argument = isObject(params.argument) ? params.argument : {}
        const kind = completionKind(ref, String(argument.name ?? ''))
        const ix = await index()
        return { completion: kind ? ix.complete(kind, String(argument.value ?? '')) : { values: [], total: 0, hasMore: false } }
      },
    },
  }
}

/** Every list fits on one page, so no cursor is ever handed out — and one that arrives is not ours. */
function rejectCursor(params) {
  if (params?.cursor !== undefined && params.cursor !== null) throw new McpError(ErrorCode.INVALID_PARAMS, 'Invalid cursor')
}

function completionKind(ref, argument) {
  if (ref.type === 'ref/prompt') {
    if (argument === 'exam') return 'exam'
    if (argument === 'concept' || argument === 'focus') return 'concept'
    return null
  }
  if (ref.type === 'ref/resource') {
    const template = String(ref.uri ?? '')
    if (template.startsWith(`${SCHEME}exam/`)) return 'exam'
    if (template.startsWith(`${SCHEME}concept/`)) return 'concept'
    if (template.startsWith(`${SCHEME}question/`)) return 'question'
    if (template.startsWith(`${SCHEME}resource/`)) return 'resource'
  }
  return null
}
