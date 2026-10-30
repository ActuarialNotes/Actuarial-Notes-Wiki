// A practice question as a page of its own — `/wiki/question/<id>`.
//
// The bank is the vault's largest asset and, until this module, the one part of
// it no search could find: a question lived only inside a quiz. Candidates
// search for exactly these — "SOA Exam P sample question 123", "CAS Exam 5
// Fall 2013 question 4" — so every question in the bank gets a page: its stem,
// its options and its parts, the concepts it tests, and the questions either
// side of it on its paper. **Never its answer.** The solution stays behind a
// click into the quiz (`/quiz?ids=<id>`), where it is marked the way any quiz
// answer is; neither the static file nor the app's page carries the answer,
// the explanation or the examiner's report.
//
// A question the fact check holds an open critical finding against gets no
// page at all — the same rule that keeps it out of every quiz
// (`hasCriticalFinding`).
//
// Pure, and run twice like `lib/seo.ts`: the build writes each page's static
// file and sitemap entry from it, and `pages/wiki/WikiQuestion.tsx` writes the
// same head from it in the app. Question records are *not* shipped in
// `virtual:seo-pages` (there are thousands); the app derives a question's
// record from the question itself. Imports are relative, for the vite config's
// graph. See docs/seo.md.

import { hasCriticalFinding } from './verification'
import { isVaultQuestionId, questionPublisher } from './questionPublisher'
import { EXAM_LABEL_TO_ID } from './examIds'
import { questionPreview } from './questionPreview'
import { clampText, composeTitle, inlineMarkdownToText, type SeoCrumb, type SeoPage } from './seo'
import type { Question } from './parser'

export const QUESTION_ROUTE_PREFIX = '/wiki/question/'

/** A question's page. Ids are lowercase letters, digits and dashes, so they need no slug. */
export function questionRoute(id: string): string {
  return `${QUESTION_ROUTE_PREFIX}${encodeURIComponent(id)}`
}

/** Where its "Answer this question" button goes: a one-question quiz, which reveals the solution once answered. */
export function questionQuizUrl(id: string): string {
  return `/quiz?ids=${encodeURIComponent(id)}`
}

/** Whether a question may have a page — what may be served in a quiz may be shown. */
export function hasQuestionPage(q: Question): boolean {
  return Boolean(q.id) && !hasCriticalFinding(q.verification)
}

/** `Exam P` for the bank's `Probability`; a CAS label is already an exam name. */
export function questionExamName(label: string): string {
  const trimmed = label.trim()
  if (/^Exam\b/.test(trimmed)) return trimmed
  const id = EXAM_LABEL_TO_ID[trimmed]
  return id ? `Exam ${id}` : trimmed
}

function sessionName(session?: string): string | undefined {
  const s = session?.trim().toLowerCase()
  if (s === 'spring' || s === 'sp') return 'Spring'
  if (s === 'fall' || s === 'fa' || s === 'autumn') return 'Fall'
  return undefined
}

/** `Fall 2013`, or the year alone when the file names no session. */
function sittingName(q: Pick<Question, 'year' | 'session'>): string | null {
  if (!q.year) return null
  const session = sessionName(q.session)
  return session ? `${session} ${q.year}` : String(q.year)
}

/**
 * The question's number, as its id carries it: the last number on it
 * (`cas5-2013f-004` → 4, `cas7-2012-q13` → 13, `p-123` → 123), or a FAM-L
 * question's chapter and number (`faml-3-12` → 3.12), as the SOA numbers that set.
 */
export function questionNumber(id: string): string | null {
  const faml = /^faml-(\d+)-(\d+)$/.exec(id)
  if (faml) return `${Number(faml[1])}.${Number(faml[2])}`
  const last = /(\d+)$/.exec(id)
  return last ? String(Number(last[1])) : null
}

export type QuestionPageKind = 'paper' | 'sample' | 'vault'

/** Sat on a paper, published as a sample, or written for Actuarial Notes. */
export function questionPageKind(q: Question): QuestionPageKind {
  if (isVaultQuestionId(q.id)) return 'vault'
  return q.year ? 'paper' : 'sample'
}

/**
 * The page's heading — what a candidate types into a search box:
 * "CAS Exam 5 Fall 2013, Question 4", "SOA Exam P Sample Question 123",
 * "Exam MAS-I Practice Question 12". A question sat on another exam's paper
 * (`originally_exam`) is named by that paper.
 */
export function questionName(q: Question): string {
  const kind = questionPageKind(q)
  const n = questionNumber(q.id)
  if (kind === 'vault') return `${questionExamName(q.exam)} Practice Question ${n ?? q.id}`
  const body = questionPublisher(q)
  const prefix = body && body !== 'Actuarial Notes' ? `${body} ` : ''
  if (kind === 'paper') {
    const exam = questionExamName(q.originally_exam?.trim() || q.exam)
    return `${prefix}${exam} ${sittingName(q)}, Question ${n ?? q.id}`
  }
  return `${prefix}${questionExamName(q.exam)} Sample Question ${n ?? q.id}`
}

/** One sentence of the question itself, for the search result's snippet. */
function questionDescription(q: Question, name: string): string {
  // A display equation reads as nothing in a snippet, and a preview cut
  // mid-emphasis leaves a stray `**`: both are dropped before it is read.
  const flat = questionPreview(q, '', 400)
    .replace(/…$/, '')
    .replace(/\$\$[\s\S]*?(?:\$\$|$)/g, ' ')
    .replace(/\*\*/g, '')
  const preview = inlineMarkdownToText(flat).replace(/\*\*/g, '').replace(/\s+/g, ' ').trim()
  const lead = preview ? clampText(preview) : ''
  const context = `${name}${q.topic ? ` on ${q.topic}` : ''}, with a worked solution.`
  if (!lead) return clampText(context)
  const joined = `${lead} ${context}`
  return !lead.endsWith('…') && joined.length <= 160 ? joined : lead
}

/**
 * A question's page record. `parent` is the study guide of the exam whose bank
 * it is in — the middle breadcrumb.
 */
export function questionSeo(q: Question, parent?: SeoCrumb): SeoPage {
  const name = questionName(q)
  return {
    kind: 'question',
    path: questionRoute(q.id),
    name,
    title: composeTitle(name, q.topic || undefined),
    description: questionDescription(q, name),
    parent,
  }
}

/** Which run a question is read in: its paper, or its exam's samples, or its exam's own set. */
function runKey(q: Question): string {
  const kind = questionPageKind(q)
  if (kind === 'paper') return `paper|${q.originally_exam?.trim() || q.exam}|${q.year}|${sessionName(q.session) ?? ''}`
  return `${kind}|${q.exam}|${kind === 'sample' ? q.id.replace(/\d+$/, '') : ''}`
}

const byNumber = new Intl.Collator('en', { numeric: true })

/**
 * Every question with a page, grouped into the runs a reader steps through —
 * one paper, in the paper's order; an exam's sample set, in its numbering — so
 * each page can link to the questions either side of it.
 */
export function questionRuns(questions: readonly Question[]): Map<string, Question[]> {
  const runs = new Map<string, Question[]>()
  const seen = new Set<string>()
  for (const q of questions) {
    if (!hasQuestionPage(q) || seen.has(q.id)) continue
    seen.add(q.id)
    const key = runKey(q)
    const run = runs.get(key)
    if (run) run.push(q)
    else runs.set(key, [q])
  }
  for (const run of runs.values()) run.sort((a, b) => byNumber.compare(a.id, b.id))
  return runs
}

/** The questions before and after `q` in its run. */
export function questionNeighbours(runs: Map<string, Question[]>, q: Question): { previous?: Question; next?: Question } {
  const run = runs.get(runKey(q)) ?? []
  const i = run.findIndex(r => r.id === q.id)
  if (i < 0) return {}
  return { previous: run[i - 1], next: run[i + 1] }
}

/** The concept pages a question is tagged with — `Concepts/Bayes+Theorem` → `Bayes Theorem`. */
export function questionConcepts(q: Question): string[] {
  const names = q.wiki_link
    .map(link => link.replace(/\+/g, ' ').trim())
    .filter(link => /^Concepts\//.test(link))
    .map(link => link.slice('Concepts/'.length))
  return [...new Set(names)]
}

function optionLines(options: Question['options']): string {
  return options.map(o => `- **${o.key})** ${o.text.replace(/\n+/g, ' ')}`).join('\n')
}

/**
 * The question as the static page's article: stem, options, each part with its
 * points — and nothing that gives the answer away. Concepts are wiki links, so
 * the prerender links each to its page.
 */
export function questionMarkdown(q: Question): string {
  const blocks: string[] = []
  if (q.stem.trim()) blocks.push(q.stem.trim())
  if (q.options.length) blocks.push(optionLines(q.options))
  for (const part of q.parts ?? []) {
    const points = part.points ? ` (${part.points} point${part.points === 1 ? '' : 's'})` : ''
    blocks.push(`## Part ${part.label}${points}`)
    if (part.stem.trim()) blocks.push(part.stem.trim())
    if (part.options.length) blocks.push(optionLines(part.options))
  }
  if (q.off_syllabus) blocks.push('*No current syllabus covers this question; it is kept for the record.*')
  blocks.push(`[Answer this question and see the worked solution](${questionQuizUrl(q.id)})`)
  const concepts = questionConcepts(q)
  if (concepts.length) blocks.push(`## Concepts tested\n\n${concepts.map(c => `- [[${c}]]`).join('\n')}`)
  return blocks.join('\n\n')
}

/**
 * Every question's page record, titles made unique: two pages a search would
 * show under one title read as one page twice, so a clash takes the id.
 */
export function buildQuestionSeoPages(
  questions: readonly Question[],
  parentFor: (q: Question) => SeoCrumb | undefined,
): { question: Question; page: SeoPage }[] {
  const seen = new Set<string>()
  const pages = questions
    .filter(q => hasQuestionPage(q) && !seen.has(q.id) && seen.add(q.id))
    .map(question => ({ question, page: questionSeo(question, parentFor(question)) }))
  const counts = new Map<string, number>()
  for (const { page } of pages) counts.set(page.title, (counts.get(page.title) ?? 0) + 1)
  return pages.map(({ question, page }) => (counts.get(page.title)! > 1
    ? { question, page: { ...page, name: `${page.name} (${question.id})`, title: composeTitle(`${page.name} (${question.id})`) } }
    : { question, page }))
}
