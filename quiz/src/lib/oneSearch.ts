/**
 * The one search (docs/redesign-spec.md §7a.4, R18): concepts, resources and
 * questions answered by one query, as data. The page (`pages/Search.tsx`)
 * draws what this returns.
 *
 * Results cover every exam. Within each kind the exam in focus comes first, in
 * the order the match gave, and a result from another exam is labelled with
 * that exam (decided with the maintainer, 2026-11-23).
 */

import { foldText, nearMatch, rankMatch, searchBy } from './appSearch'
import type { Question } from './parser'
import {
  QUESTION_FACETS,
  conceptLabel,
  emptyFacets,
  matchesFacets,
  type FacetSelection,
  type QuestionFacet,
} from './questionFilters'
import type { AttemptCounts } from './questionAttempts'
import type { AnswerState } from './answerState'
import type { WikiIndexItem } from './wikiIndex'
import type { WikiExamSyllabus } from './wikiParser'

// ─── Tabs and the address ────────────────────────────────────────────────────

export type SearchTab = 'all' | 'concepts' | 'resources' | 'questions'

export const SEARCH_TABS: readonly { value: SearchTab; label: string }[] = [
  { value: 'all', label: 'All' },
  { value: 'concepts', label: 'Concepts' },
  { value: 'resources', label: 'Resources' },
  { value: 'questions', label: 'Questions' },
]

/** What the search's address holds: the query, the tab and the question filters. */
export interface SearchState {
  query: string
  tab: SearchTab
  facets: FacetSelection
}

function isTab(value: string | null): value is SearchTab {
  return SEARCH_TABS.some(t => t.value === value)
}

/**
 * Read `/search`'s query string. `?q=` and `?tab=` are its own; each question
 * filter is its facet's name, once per value (`?exam=Exam+P&exam=Exam+FM`).
 * The page this replaced took `?type=questions|concepts|resources` for its
 * tab and `?concept=<name>` for one concept's questions, and both still land:
 * an old `type` that names a tab picks the tab, and `concept` is the Concepts
 * filter (and opens on Questions when nothing else chose a tab).
 */
export function searchStateFromParams(params: URLSearchParams): SearchState {
  const facets = emptyFacets() as Record<QuestionFacet, Set<string>>
  let tab: SearchTab | null = isTab(params.get('tab')) ? (params.get('tab') as SearchTab) : null
  for (const facet of QUESTION_FACETS) {
    for (const value of params.getAll(facet)) {
      if (!value) continue
      // The old page's `type=concepts` is a tab, not a question type.
      if (facet === 'type' && isTab(value)) {
        tab ??= value
        continue
      }
      facets[facet].add(value)
    }
  }
  if (!tab && facets.concept.size > 0) tab = 'questions'
  return { query: params.get('q') ?? '', tab: tab ?? 'all', facets }
}

/** The query string for a state: nothing for a default, keys in a fixed order. */
export function searchParamsFromState(state: SearchState): URLSearchParams {
  const params = new URLSearchParams()
  if (state.query) params.set('q', state.query)
  if (state.tab !== 'all') params.set('tab', state.tab)
  for (const facet of QUESTION_FACETS) {
    for (const value of [...state.facets[facet]].sort()) params.append(facet, value)
  }
  return params
}

// ─── The exam in focus ───────────────────────────────────────────────────────

/** The exam whose results lead each kind. Every field is that one exam, as each index spells it. */
export interface SearchFocus {
  /** The syllabus's wiki exam id: "P-1". */
  examId: string
  /** The label the question bank carries: "Exam P". Absent for an exam with no bank. */
  bank?: string
  /** The label a resource's `exams` carries: "Exam P-1". */
  resourceLabel: string
}

// ─── Results ─────────────────────────────────────────────────────────────────

export interface ConceptResult {
  item: WikiIndexItem
  /** Where it sits on a syllabus: the exam, and the learning objective under it. */
  place: { exam: string; topic: string } | null
  /** The exam it belongs to, when that isn't the exam in focus. */
  otherExam: string | null
}

export interface ResourceResult {
  item: WikiIndexItem
  otherExam: string | null
}

export interface QuestionResult {
  question: Question
  otherExam: string | null
}

/** An exam's study guide, found by the exam's name. */
export interface ExamResult {
  item: WikiIndexItem
}

export interface SearchResults {
  exams: ExamResult[]
  concepts: ConceptResult[]
  resources: ResourceResult[]
  questions: QuestionResult[]
}

export interface SearchInput {
  query: string
  /** The wiki index: exam pages, concepts and `document` items. */
  index: readonly WikiIndexItem[]
  questions: readonly Question[]
  syllabi: readonly WikiExamSyllabus[]
  focus: SearchFocus | null
  /** The question filters. They narrow the questions alone. */
  facets?: FacetSelection
  /**
   * `matchQuestions(questions, query)`, when the caller already has it (the
   * filters count their options over the same list), so it is not found twice.
   */
  matched?: readonly Question[]
}

/** `items` with those `inFocus` first, each group in the order it came. */
export function focusFirst<T>(items: readonly T[], inFocus: (item: T) => boolean): T[] {
  return [...items.filter(inFocus), ...items.filter(item => !inFocus(item))]
}

const NO_LIMIT = Number.MAX_SAFE_INTEGER

// ─── Where a concept sits ────────────────────────────────────────────────────

interface Placement { syllabus: WikiExamSyllabus; topic: string }

/**
 * Every syllabus a concept name is on, with the first learning objective that
 * names it there, built once per set of syllabi. Asking each syllabus about
 * each matched concept (`findSyllabiForConcept`) cost a second for a
 * one-letter query; this is the same answer, looked up.
 */
const placementsBySyllabi = new WeakMap<readonly WikiExamSyllabus[], Map<string, Placement[]>>()

function placements(syllabi: readonly WikiExamSyllabus[]): Map<string, Placement[]> {
  const known = placementsBySyllabi.get(syllabi)
  if (known) return known
  const map = new Map<string, Placement[]>()
  for (const syllabus of syllabi) {
    for (const topic of syllabus.topics) {
      for (const c of topic.concepts) {
        const keys = new Set([
          c.name.toLowerCase(),
          c.target.split('/').pop()?.replace(/\.md$/i, '').toLowerCase() ?? '',
        ])
        for (const key of keys) {
          if (!key) continue
          const list = map.get(key) ?? []
          if (list.length === 0) map.set(key, list)
          if (list[list.length - 1]?.syllabus !== syllabus) list.push({ syllabus, topic: topic.name })
        }
      }
    }
  }
  placementsBySyllabi.set(syllabi, map)
  return map
}

function conceptPlace(
  name: string,
  syllabi: readonly WikiExamSyllabus[],
  focus: SearchFocus | null,
): { place: ConceptResult['place']; inFocus: boolean } {
  const on = placements(syllabi).get(name.toLowerCase()) ?? []
  if (on.length === 0) return { place: null, inFocus: false }
  const mine = focus ? on.find(p => p.syllabus.examId === focus.examId) : undefined
  const at = mine ?? on[0]!
  return { place: { exam: at.syllabus.examLabel, topic: at.topic }, inFocus: !!mine }
}

// ─── Questions ───────────────────────────────────────────────────────────────

interface QuestionText {
  /** The id, the stem and every part's prompt, folded for matching. */
  text: string
  /** `text` with a space at each end, so a word's start can be looked for. */
  padded: string
  id: string
  /** The names of the concepts it is tagged with, the first being its main one. */
  concepts: string[]
}

/** What a question is matched on, read once: a search runs on every keystroke. */
const questionTexts = new WeakMap<Question, QuestionText>()

function questionText(q: Question): QuestionText {
  const known = questionTexts.get(q)
  if (known) return known
  const parts = (q.parts ?? []).map(p => p.stem).join(' ')
  const text = foldText(`${q.id} ${q.stem} ${parts}`)
  const made: QuestionText = {
    text,
    padded: ` ${text} `,
    id: foldText(q.id),
    concepts: q.wiki_link.map(conceptLabel),
  }
  questionTexts.set(q, made)
  return made
}

/**
 * Whether the text holds `word` as a word or the start of one. A single
 * letter must be a whole word: "exam p" is not every question with a p in it.
 */
function holdsWord(padded: string, word: string): boolean {
  return padded.includes(word.length === 1 ? ` ${word} ` : ` ${word}`)
}

/**
 * The questions a query finds, the most likely first:
 *
 *   0. the question whose id it is;
 *   1. tagged with a concept the query names, and using the words itself;
 *   2. tagged with such a concept;
 *   3. holding the query as written, in its stem, a part or its id;
 *   4. holding every word of the query, each as a word or the start of one;
 *   5. when no concept's name answered the query, tagged with a concept a
 *      typing slip away ("poison").
 *
 * Within a group the bank's order is kept. Questions kept for the record are
 * found too. A query that is a question's id finds that question and whatever
 * else holds it as written, not every question with its pieces. No query
 * finds every question.
 */
export function matchQuestions(questions: readonly Question[], query: string): Question[] {
  const q = foldText(query)
  if (!q) return [...questions]
  const words = q.split(' ')

  // A concept's name answers the query or it doesn't, whichever question carries it.
  const named = new Map<string, boolean>()
  const names = (name: string, near: boolean): boolean => {
    let hit = named.get(name)
    if (hit === undefined) {
      hit = near ? nearMatch(name, q) : rankMatch(name, q) !== null
      named.set(name, hit)
    }
    return hit
  }

  const groups: Question[][] = [[], [], [], [], []]
  for (const item of questions) {
    const t = questionText(item)
    if (t.id === q) { groups[0]!.push(item); continue }
    const tagged = t.concepts.some(name => names(name, false))
    const phrase = t.text.includes(q)
    const every = phrase || (words.length > 1 && words.every(w => holdsWord(t.padded, w)))
    if (tagged) groups[every ? 1 : 2]!.push(item)
    else if (phrase) groups[3]!.push(item)
    else if (every) groups[4]!.push(item)
  }
  if (groups[0]!.length > 0) return [...groups[0]!, ...groups[3]!]
  if (groups[1]!.length + groups[2]!.length > 0) return groups.flat()

  named.clear()
  const near = new Set<Question>([...groups[3]!, ...groups[4]!])
  const slips = questions.filter(item => !near.has(item) && questionText(item).concepts.some(name => names(name, true)))
  return [...groups[3]!, ...groups[4]!, ...slips]
}

/** Everything the query finds, each kind ranked with the exam in focus first. */
export function runSearch(input: SearchInput): SearchResults {
  const { query, index, questions, syllabi, focus } = input
  const facets = input.facets ?? emptyFacets()
  const q = query.trim()

  const exams: ExamResult[] = searchBy(
    index.filter(it => it.category === 'exam'),
    q,
    it => [it.title ?? it.name, it.name],
    NO_LIMIT,
  ).map(item => ({ item }))

  const concepts: ConceptResult[] = searchBy(
    index.filter(it => it.category === 'concept'),
    q,
    it => [it.title ?? it.name, it.name],
    NO_LIMIT,
    { near: true },
  ).map(item => {
    const { place, inFocus } = conceptPlace(item.name, syllabi, focus)
    return { item, place, otherExam: focus && place && !inFocus ? place.exam : null }
  })

  const resources: ResourceResult[] = searchBy(
    index.filter(it => it.category === 'document'),
    q,
    it => [it.title ?? it.name, it.name, it.author],
    NO_LIMIT,
  ).map(item => {
    const exams = item.exams ?? []
    const inFocus = !!focus && exams.includes(focus.resourceLabel)
    return { item, otherExam: focus && !inFocus && exams.length > 0 ? exams[0]! : null }
  })

  const matched = (input.matched ?? matchQuestions(questions, q)).filter(question => matchesFacets(question, facets))
  const questionResults: QuestionResult[] = matched.map(question => ({
    question,
    otherExam: focus?.bank && question.exam !== focus.bank ? question.exam : null,
  }))

  return {
    exams,
    concepts: focusFirst(concepts, c => !!focus && c.place !== null && c.otherExam === null),
    resources: focusFirst(resources, r => !!focus && r.otherExam === null && (r.item.exams?.length ?? 0) > 0),
    questions: focusFirst(questionResults, r => !!focus?.bank && r.otherExam === null),
  }
}

/** The count on each tab. All is the three and the study guides found. */
export function tabCounts(results: SearchResults): Record<SearchTab, number> {
  const concepts = results.concepts.length
  const resources = results.resources.length
  const questions = results.questions.length
  return { all: results.exams.length + concepts + resources + questions, concepts, resources, questions }
}

/** How many of each kind the All tab shows before its "N more" row. */
export const ALL_TAB_PREVIEW = { exams: 2, concepts: 3, resources: 2, questions: 2 } as const

/** A kind's rows under All, and how many its "N more" row stands for. */
export function previewOf<T>(items: readonly T[], size: number): { shown: T[]; more: number } {
  return { shown: items.slice(0, size), more: Math.max(0, items.length - size) }
}

// ─── A question row ──────────────────────────────────────────────────────────

/**
 * A question row's dot (docs/redesign-spec.md §7a.4): green if it was last
 * answered right, red if it was last missed, `untried` (an empty ring) when
 * there is no attempt. A tally that doesn't know the order of its attempts is
 * read by its counts instead: all right, none right, or amber for a mix.
 */
export function attemptDot(summary: AttemptCounts | null | undefined): AnswerState | 'untried' {
  const attempts = Math.max(0, Math.floor(summary?.attempt_count ?? 0))
  if (attempts === 0) return 'untried'
  if (summary?.last_correct !== undefined) return summary.last_correct ? 'correct' : 'incorrect'
  const correct = Math.min(attempts, Math.max(0, Math.floor(summary?.correct_count ?? 0)))
  if (correct === attempts) return 'correct'
  return correct === 0 ? 'incorrect' : 'partial'
}

export const ATTEMPT_DOT_LABEL: Record<AnswerState | 'untried', string> = {
  correct: 'Answered correctly',
  incorrect: 'Answered incorrectly',
  partial: 'Answered both correctly and incorrectly',
  unanswered: 'Not attempted',
  untried: 'Not attempted',
}

const DIFFICULTY_WORD: Record<string, string> = { easy: 'Easy', medium: 'Medium', hard: 'Hard' }

/** A question row's second line: its first concept, its difficulty, and its exam when that is another exam's. */
export function questionMetaLine(result: QuestionResult): string {
  const { question, otherExam } = result
  const concept = question.wiki_link.length > 0 ? conceptLabel(question.wiki_link[0]!) : question.topic
  return [concept, DIFFICULTY_WORD[question.difficulty] ?? '', otherExam ?? ''].filter(Boolean).join(' · ')
}

/** A concept row's second line: "Exam P · Univariate Random Variables". */
export function conceptPlaceLine(result: ConceptResult): string {
  if (!result.place) return ''
  return [result.place.exam, result.place.topic].filter(Boolean).join(' · ')
}

/** A resource row's second line: "Ross · 2019", and its exam when that is another exam's. */
export function resourceMetaLine(result: ResourceResult): string {
  const { item, otherExam } = result
  return [item.author ?? '', item.year ? String(item.year) : '', otherExam ?? ''].filter(Boolean).join(' · ')
}

/** The most questions one practice starts. */
export const PRACTICE_LIMIT = 100

/** How many questions the count starts at, when the results hold more. */
export const PRACTICE_DEFAULT = 10

/** The ids "Practice these N" starts: the results in order, up to the limit. */
export function practiceIds(results: readonly QuestionResult[]): string[] {
  return results.slice(0, PRACTICE_LIMIT).map(r => r.question.id)
}

/**
 * The count the Questions tab's stepper shows: the reader's choice held
 * between 1 and what the results hold (never past the limit), or the default
 * while they have made none. 0 when nothing is found.
 */
export function practiceCount(chosen: number | null, found: number): number {
  const most = Math.min(found, PRACTICE_LIMIT)
  if (most <= 0) return 0
  const n = chosen ?? PRACTICE_DEFAULT
  return Math.max(1, Math.min(most, Math.floor(n)))
}

/**
 * `count` of the results, drawn at random, for a practice of so many: each
 * question equally likely, none twice. The quiz shuffles a pinned list, so
 * the order here does not matter.
 */
export function drawIds(
  results: readonly QuestionResult[],
  count: number,
  random: () => number = Math.random,
): string[] {
  const ids = results.map(r => r.question.id)
  const n = Math.max(0, Math.min(count, ids.length, PRACTICE_LIMIT))
  // A partial Fisher-Yates: the first n places are the draw.
  for (let i = 0; i < n; i++) {
    const j = i + Math.floor(random() * (ids.length - i))
    ;[ids[i], ids[j]] = [ids[j]!, ids[i]!]
  }
  return ids.slice(0, n)
}

/** The ticked questions still among the results, in the results' order. */
export function pickedIds(results: readonly QuestionResult[], picked: ReadonlySet<string>): string[] {
  return results.filter(r => picked.has(r.question.id)).map(r => r.question.id).slice(0, PRACTICE_LIMIT)
}
