// How many practice questions a concept has, without the question bank.
//
// The bank is megabytes and is fetched only when something asks for a
// question. A concept page's **Practice** button says how many questions there
// are before anyone asks, so the build counts them once
// (`virtual:concept-question-counts`, a small chunk of its own).
//
// The count is what a quiz on the concept can serve: `filterQuestions`' own
// rules (nothing with an open critical finding, nothing kept off the syllabus),
// matched on the concept's name the way its `concept` filter matches.
//
// Pure. Relative imports: the vite config runs this.

import { filterQuestions, type Question } from './parser'

/** Served questions by lowercased concept name: across every bank, and per bank. */
export interface ConceptQuestionCounts {
  /** Every bank together — what a concept's own **Practice** draws from. */
  all: Record<string, number>
  /** One exam's bank, by the label its questions carry ("Exam 5"). */
  byExam: Record<string, Record<string, number>>
}

/** A question's concepts by lowercased name, each once. */
function conceptsOf(q: Question): Set<string> {
  const names = new Set<string>()
  for (const link of q.wiki_link) {
    const clean = link.replace(/\+/g, ' ').replace(/\.md$/i, '')
    const name = (clean.split('/').filter(Boolean).pop() ?? '').toLowerCase()
    if (name) names.add(name)
  }
  return names
}

/** Count the served questions of each concept. A concept with none is absent. */
export function countQuestionsByConcept(questions: Question[]): ConceptQuestionCounts {
  const counts: ConceptQuestionCounts = { all: {}, byExam: {} }
  for (const q of filterQuestions(questions, {})) {
    const bank = (counts.byExam[q.exam] ??= {})
    for (const name of conceptsOf(q)) {
      counts.all[name] = (counts.all[name] ?? 0) + 1
      bank[name] = (bank[name] ?? 0) + 1
    }
  }
  return counts
}

/** The count for one concept; 0 when no served question is tagged with it. */
export function questionCountFor(counts: Record<string, number> | undefined, concept: string): number {
  return counts?.[concept.trim().toLowerCase()] ?? 0
}

/**
 * Whether a quiz on any of these concepts, in one exam's bank, has a question
 * to serve, and at most how many (a question tagged with two of them is counted
 * twice, so this is a ceiling, good for sizing a draw and not for printing).
 */
export function questionCeiling(counts: ConceptQuestionCounts, exam: string, concepts: readonly string[]): number {
  const bank = counts.byExam[exam]
  return concepts.reduce((sum, c) => sum + questionCountFor(bank, c), 0)
}
