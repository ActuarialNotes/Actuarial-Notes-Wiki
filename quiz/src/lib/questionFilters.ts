import { isFromAnotherExamsPaper, type Question, type QuestionFilter } from './parser'
import { questionSittingLabel, sittingLabel, sittingLabels } from './pastExams'
import { EXAM_LABEL_TO_ID } from './examIds'
import { PUBLISHER_ORDER, questionPublisher } from './questionPublisher'

// The filters every list of questions offers — Difficulty, Concepts, Source,
// Exam and Sitting — as one definition. The quiz builder's search panel, the
// concept question browser and the concept detail modal each used to own a
// copy, and the copies drifted: one hid Exam whenever the pool held a single
// exam, another never offered Exam or Sitting at all.
// `components/QuestionFilterBar` draws these; this module decides what they
// mean.
//
// Each facet is OR within itself (nothing chosen matches everything) and the
// facets are AND'd together. Values are the strings a question is matched
// back against: a difficulty, a concept label, a publisher (`"SOA"`, `"CAS"`,
// `"Actuarial Notes"` — `lib/questionPublisher.ts`), the bank's `exam:` label
// and a sitting's display label (`"Spring 2019"`).

export type QuestionFacet = 'difficulty' | 'concept' | 'source' | 'exam' | 'sitting'

/** Source before Exam before Sitting: each narrows the one after it. */
export const QUESTION_FACETS: readonly QuestionFacet[] = ['difficulty', 'concept', 'source', 'exam', 'sitting']

export type FacetSelection = Readonly<Record<QuestionFacet, ReadonlySet<string>>>

export interface FacetOption {
  value: string
  label: string
  /** Questions choosing this option would leave, the other facets applied. */
  count: number
}

const DIFFICULTY_ORDER = ['easy', 'medium', 'hard']

/** The bank's exams in ladder order — Exam P first, Exam 9 last. */
const EXAM_ORDER = Object.keys(EXAM_LABEL_TO_ID)

export function emptyFacets(): FacetSelection {
  return { difficulty: new Set(), concept: new Set(), source: new Set(), exam: new Set(), sitting: new Set() }
}

/** The selection with `value` flipped in or out of `facet`. */
export function toggleFacet(selection: FacetSelection, facet: QuestionFacet, value: string): FacetSelection {
  const next = new Set(selection[facet])
  if (next.has(value)) next.delete(value)
  else next.add(value)
  return { ...selection, [facet]: next }
}

export function hasFacetFilters(selection: FacetSelection): boolean {
  return QUESTION_FACETS.some(facet => selection[facet].size > 0)
}

/**
 * A raw `wiki_link` ("Concepts/Geometric+Distribution", "/probability/set-theory")
 * as the label a question row's concept chip shows. Words are capitalised on
 * Unicode letters — a `\b\w` rule reads the `ü` in "Bühlmann" as a word break
 * and prints "BüHlmann".
 */
export function conceptLabel(link: string): string {
  const clean = link.replace(/\.md$/i, '').replace(/\+/g, ' ')
  const segment = clean.split('/').filter(Boolean).pop() ?? link
  return segment
    .replace(/-/g, ' ')
    .replace(/(^|[^\p{L}\p{N}'’])(\p{L})/gu, (_match, before: string, letter: string) => before + letter.toUpperCase())
}

/**
 * How an exam is named in the Exam filter. The bank files the two SOA exams
 * by subject ("Probability", "Financial Mathematics"), which reads as a topic
 * rather than an exam in a list of them, so those are named by their key.
 */
export function examFilterLabel(exam: string): string {
  if (/^exam\b/i.test(exam.trim())) return exam
  const id = EXAM_LABEL_TO_ID[exam]
  return id ? `Exam ${id}` : exam
}

/**
 * The sitting a question counts under. Narrowed to an exam, a sitting means
 * *that exam's* paper, so a question carried over from another exam's paper
 * (`originally_exam`) is on none of its sittings — the rule `filterQuestions`
 * keeps for a year/session filter. Across every exam it is simply the date
 * the question was sat.
 */
function sittingOf(q: Question, examNarrowed: boolean): string | null {
  if (examNarrowed && isFromAnotherExamsPaper(q, q.exam)) return null
  return questionSittingLabel(q)
}

/** The values a question has for a facet — several concepts, at most one of the rest. */
export function questionFacetValues(q: Question, facet: QuestionFacet, examNarrowed = false): string[] {
  switch (facet) {
    case 'difficulty': return [q.difficulty]
    case 'concept': return [...new Set(q.wiki_link.map(conceptLabel))]
    case 'source': {
      const publisher = questionPublisher(q)
      return publisher ? [publisher] : []
    }
    case 'exam': return [q.exam]
    case 'sitting': {
      const sitting = sittingOf(q, examNarrowed)
      return sitting ? [sitting] : []
    }
  }
}

/**
 * Whether a question passes every facet but `except`. Leaving a facet out is
 * how an option's count is taken — and leaving out Exam means counting as if
 * an exam were about to be chosen, so the sitting rule above applies.
 */
export function matchesFacets(q: Question, selection: FacetSelection, except?: QuestionFacet): boolean {
  const examNarrowed = selection.exam.size > 0 || except === 'exam'
  return QUESTION_FACETS.every(facet => {
    if (facet === except) return true
    const chosen = selection[facet]
    if (chosen.size === 0) return true
    return questionFacetValues(q, facet, examNarrowed).some(value => chosen.has(value))
  })
}

/**
 * The options a facet's control offers over `pool`: every value the pool
 * holds once the *other* facets are applied, each with the count choosing it
 * would leave, plus whatever is already chosen (so it can be un-chosen even
 * when nothing is left under it). Difficulty always offers all three levels.
 *
 * Ordered for reading: difficulty easy → hard, concepts A → Z, publishers and
 * exams up the ladder, sittings newest first.
 */
export function facetOptions(pool: Question[], facet: QuestionFacet, selection: FacetSelection): FacetOption[] {
  const examNarrowed = selection.exam.size > 0
  const counted = pool.filter(q => matchesFacets(q, selection, facet))
  const counts = new Map<string, number>()
  for (const q of counted) {
    for (const value of questionFacetValues(q, facet, examNarrowed)) {
      counts.set(value, (counts.get(value) ?? 0) + 1)
    }
  }

  let values: string[]
  switch (facet) {
    case 'difficulty':
      values = [...DIFFICULTY_ORDER, ...[...counts.keys()].filter(v => !DIFFICULTY_ORDER.includes(v))]
      break
    case 'concept':
      values = [...counts.keys()].sort((a, b) => a.localeCompare(b))
      break
    case 'source':
      values = PUBLISHER_ORDER.filter(publisher => counts.has(publisher))
      break
    case 'exam': {
      const rank = (exam: string) => {
        const i = EXAM_ORDER.indexOf(exam)
        return i === -1 ? EXAM_ORDER.length : i
      }
      values = [...counts.keys()].sort((a, b) => rank(a) - rank(b) || a.localeCompare(b))
      break
    }
    case 'sitting':
      values = sittingLabels(counted.filter(q => sittingOf(q, examNarrowed) !== null))
      break
  }
  for (const value of selection[facet]) {
    if (!values.includes(value)) values.push(value)
  }

  return values.map(value => ({
    value,
    label: facet === 'exam' ? examFilterLabel(value)
      : facet === 'difficulty' ? value.charAt(0).toUpperCase() + value.slice(1)
      : value,
    count: counts.get(value) ?? 0,
  }))
}

/**
 * Splits a surface's incoming filter into the pool it scopes and the facet
 * choices it starts on. The quiz builder hands its search panel the exam (and,
 * on the past-paper shelf, the sitting) it has picked; those used to narrow the
 * pool itself, which left the panel's Exam and Sitting filters with one option
 * and hid them — the panel filtered by an exam it no longer showed. As starting
 * choices they are on screen, ticked, and can be widened from the panel.
 */
export function splitSearchFilter(filter: QuestionFilter): { scope: QuestionFilter; initial: FacetSelection } {
  const { exam, year, session, ...scope } = filter
  return {
    scope,
    initial: {
      ...emptyFacets(),
      exam: new Set(exam ? [exam] : []),
      sitting: new Set(year ? [sittingLabel(year, session)] : []),
    },
  }
}
