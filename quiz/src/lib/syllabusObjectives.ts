// A syllabus's learning objectives with the reader's standing on each: the
// percentage, and every concept's level in the order the syllabus names them.
// Today's Syllabus panel and the exam page both draw these, from this one
// function, so the two can't print different figures (docs/redesign-spec.md §4.4).

import { buildMasteryLookup, resolveConceptState } from './conceptMatch'
import type { ConceptMasteryRecord, MasteryState } from './mastery'
import type { ExamReadinessAssessment } from './readiness'
import type { WikiExamSyllabus } from './wikiParser'

export interface SyllabusObjective {
  name: string
  /** "23–30%", as the syllabus prints it; null when it prints none. */
  weight: string | null
  pct: number
  states: MasteryState[]
  /** Indexes of the concepts in today's session. */
  today: Set<number>
}

/** One entry per objective of the syllabus, in its order, including one with no concepts. */
export function syllabusObjectives(
  syllabus: WikiExamSyllabus,
  readiness: Pick<ExamReadinessAssessment, 'sections'>,
  examRecords: readonly ConceptMasteryRecord[],
  todayKeys: ReadonlySet<string>,
  now: Date,
): SyllabusObjective[] {
  const lookup = buildMasteryLookup(examRecords as ConceptMasteryRecord[])
  return syllabus.topics.map(topic => {
    const today = new Set<number>()
    const states = topic.concepts.map((c, i) => {
      if (todayKeys.has(c.name.toLowerCase())) today.add(i)
      return resolveConceptState(lookup, c, now)
    })
    const section = readiness.sections.find(s => s.name === topic.name)
    return {
      name: topic.name,
      weight: topic.weight ? topic.weight.replace(/\s*-\s*/, '–') : null,
      pct: section ? Math.round(section.readinessPct) : 0,
      states,
      today,
    }
  })
}
