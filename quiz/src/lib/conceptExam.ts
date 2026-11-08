// Which exam a concept's colour is — the exam accent its page icon is drawn in.
//
// A concept page belongs to whichever exams' syllabi list it, so its icon takes
// an exam's accent (`examColors.ts`) rather than one fixed colour. Where a
// surface knows which exam it is about (a quiz, a question), that exam wins if
// the concept is on it. Otherwise the context is ambiguous and the concept
// takes the *earliest* exam it is on — earliest on the ladder, which is what
// the hue measures (blue at Exam P, round to red at Exam 9): a concept on both
// Exam P and MAS-I is Exam P's blue.
//
// Pure and tested; `components/ConceptPageIcon.tsx` draws it.

import { examHue } from './examColors'
import { wikiExamIdToProgressKey, type WikiExamSyllabus } from './wikiParser'

/** Lower-cased concept name → the progress keys of the exams that list it. */
type ConceptExamIndex = Map<string, Set<string>>

const indexes = new WeakMap<readonly WikiExamSyllabus[], ConceptExamIndex>()

function conceptKeys(name: string, target: string): string[] {
  const base = target.split('/').pop()?.replace(/\.md$/i, '').replace(/\+/g, ' ').toLowerCase()
  const lower = name.toLowerCase()
  return base && base !== lower ? [lower, base] : [lower]
}

function indexFor(syllabi: readonly WikiExamSyllabus[]): ConceptExamIndex {
  const cached = indexes.get(syllabi)
  if (cached) return cached
  const index: ConceptExamIndex = new Map()
  for (const s of syllabi) {
    const exam = wikiExamIdToProgressKey(s.examId)
    for (const topic of s.topics) {
      for (const c of topic.concepts) {
        for (const key of conceptKeys(c.name, c.target)) {
          let set = index.get(key)
          if (!set) index.set(key, set = new Set())
          set.add(exam)
        }
      }
    }
  }
  indexes.set(syllabi, index)
  return index
}

/** A concept name as a lookup key: a link's path or `+`-spaced form cut to its name. */
function lookupKey(concept: string): string {
  return (concept.split('/').pop() ?? concept).replace(/\.md$/i, '').replace(/\+/g, ' ').toLowerCase()
}

/**
 * The exams (progress keys) whose syllabus lists the concept and that have an
 * accent, earliest on the ladder first.
 */
export function conceptExams(syllabi: readonly WikiExamSyllabus[], concept: string): string[] {
  const exams = indexFor(syllabi).get(lookupKey(concept))
  if (!exams) return []
  return [...exams]
    .filter(key => examHue(key) !== undefined)
    .sort((a, b) => examHue(a)! - examHue(b)! || a.localeCompare(b))
}

/**
 * The exam whose accent the concept is drawn in: the context exam when the
 * concept is on it, else the earliest exam it is on, else undefined (a concept
 * on no exam's syllabus, or only on requirements without a hue).
 */
export function conceptAccentExam(
  syllabi: readonly WikiExamSyllabus[],
  concept: string,
  context?: string | null,
): string | undefined {
  const exams = conceptExams(syllabi, concept)
  if (context && exams.includes(context)) return context
  return exams[0]
}
