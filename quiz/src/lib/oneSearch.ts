/**
 * The one search (docs/redesign-spec.md §7a.4, R18): concepts, resources and
 * questions answered by one query, as data. The page (`pages/Search.tsx`)
 * draws what this returns.
 *
 * Results cover every exam. Within each kind the exam in focus comes first, in
 * the order the match gave, and a result from another exam is labelled with
 * that exam (decided with the maintainer, 2026-11-23).
 */

import { rankMatch, searchBy } from './appSearch'
import { filterQuestions, type Question } from './parser'
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
import { findSyllabiForConcept, type WikiExamSyllabus } from './wikiParser'

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

export interface SearchResults {
  concepts: ConceptResult[]
  resources: ResourceResult[]
  questions: QuestionResult[]
}

export interface SearchInput {
  query: string
  /** The wiki index: concepts and `document` items. Exam pages are not searched. */
  index: readonly WikiIndexItem[]
  questions: readonly Question[]
  syllabi: readonly WikiExamSyllabus[]
  focus: SearchFocus | null
  /** The question filters. They narrow the questions alone. */
  facets?: FacetSelection
}

/** `items` with those `inFocus` first, each group in the order it came. */
export function focusFirst<T>(items: readonly T[], inFocus: (item: T) => boolean): T[] {
  return [...items.filter(inFocus), ...items.filter(item => !inFocus(item))]
}

const NO_LIMIT = Number.MAX_SAFE_INTEGER

function conceptPlace(
  name: string,
  syllabi: readonly WikiExamSyllabus[],
  focus: SearchFocus | null,
): { place: ConceptResult['place']; inFocus: boolean } {
  const on = findSyllabiForConcept(syllabi as WikiExamSyllabus[], name)
  if (on.length === 0) return { place: null, inFocus: false }
  const mine = focus ? on.find(s => s.examId === focus.examId) : undefined
  const syllabus = mine ?? on[0]!
  const needle = name.toLowerCase()
  const topic = syllabus.topics.find(t => t.concepts.some(c =>
    c.name.toLowerCase() === needle ||
    c.target.split('/').pop()?.replace(/\.md$/i, '').toLowerCase() === needle,
  ))
  return { place: { exam: syllabus.examLabel, topic: topic?.name ?? '' }, inFocus: !!mine }
}

/** The names of the concepts a question is tagged with. */
function questionConcepts(q: Question): string[] {
  return q.wiki_link.map(conceptLabel)
}

/**
 * The questions a query finds: those whose stem or id holds it
 * (`filterQuestions`' own search, questions kept for the record included),
 * then those tagged with a concept whose name answers it. No query finds every
 * question.
 */
export function matchQuestions(questions: readonly Question[], query: string): Question[] {
  const q = query.trim()
  if (!q) return [...questions]
  const direct = filterQuestions(questions as Question[], { search: q, includeOffSyllabus: true })
  const seen = new Set(direct.map(d => d.id))
  const tagged = questions.filter(
    item => !seen.has(item.id) && questionConcepts(item).some(name => rankMatch(name, q) !== null),
  )
  return [...direct, ...tagged]
}

/** Everything the query finds, each kind ranked with the exam in focus first. */
export function runSearch(input: SearchInput): SearchResults {
  const { query, index, questions, syllabi, focus } = input
  const facets = input.facets ?? emptyFacets()
  const q = query.trim()

  const concepts: ConceptResult[] = searchBy(
    index.filter(it => it.category === 'concept'),
    q,
    it => [it.title ?? it.name, it.name],
    NO_LIMIT,
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

  const matched = matchQuestions(questions, q).filter(question => matchesFacets(question, facets))
  const questionResults: QuestionResult[] = matched.map(question => ({
    question,
    otherExam: focus?.bank && question.exam !== focus.bank ? question.exam : null,
  }))

  return {
    concepts: focusFirst(concepts, c => !!focus && c.place !== null && c.otherExam === null),
    resources: focusFirst(resources, r => !!focus && r.otherExam === null && (r.item.exams?.length ?? 0) > 0),
    questions: focusFirst(questionResults, r => !!focus?.bank && r.otherExam === null),
  }
}

/** The count on each tab. All is the sum of the three. */
export function tabCounts(results: SearchResults): Record<SearchTab, number> {
  const concepts = results.concepts.length
  const resources = results.resources.length
  const questions = results.questions.length
  return { all: concepts + resources + questions, concepts, resources, questions }
}

/** How many of each kind the All tab shows before its "N more" row. */
export const ALL_TAB_PREVIEW = { concepts: 3, resources: 2, questions: 2 } as const

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

/** The most questions one "Practice these" starts. */
export const PRACTICE_LIMIT = 100

/** The ids "Practice these N" starts: the results in order, up to the limit. */
export function practiceIds(results: readonly QuestionResult[]): string[] {
  return results.slice(0, PRACTICE_LIMIT).map(r => r.question.id)
}
