// Which exam a tool belongs to, for its colour (docs/actuarial-tools.md §19).
//
// A tool takes the colour of the **earliest exam** whose syllabus teaches its
// method — the first rung of the ladder where a candidate meets it. Earliest
// is read off the exam hues themselves (`lib/examColors.ts` steps the hue
// round the wheel up the ladder, blue at Exam P), so the order here can't
// drift from the order the colours already say. A tool no exam teaches gets
// none, and draws neutral, as a non-exam requirement does.
//
// A published figure's set takes the exam whose Source Material lists the
// document it was read from, by the same rule.
//
// Pure: the caller hands in the parsed exam pages (`useWikiSyllabus`).

import { examHue } from './examColors'
import { wikiExamIdToProgressKey, type WikiExamSyllabus } from './wikiParser'

/** The earliest of these exam keys on the ladder, or null when none has a place on it. */
export function earliestExam(keys: Iterable<string>): string | null {
  let best: { key: string; hue: number } | null = null
  for (const key of keys) {
    const hue = examHue(key)
    if (hue === undefined) continue
    if (!best || hue < best.hue || (hue === best.hue && key < best.key)) best = { key, hue }
  }
  return best?.key ?? null
}

const norm = (s: string) => s.trim().toLowerCase()

/** The earliest exam whose learning objectives name any of these concept pages. */
export function examForConcepts(concepts: readonly string[], syllabi: readonly WikiExamSyllabus[]): string | null {
  const wanted = new Set(concepts.map(norm))
  const keys = syllabi
    .filter(s => s.topics.some(t => t.concepts.some(c => wanted.has(norm(c.name)))))
    .map(s => wikiExamIdToProgressKey(s.examId))
  return earliestExam(keys)
}

/** The earliest exam whose Source Material lists this resource page. */
export function examForResource(resource: string, syllabi: readonly WikiExamSyllabus[]): string | null {
  const name = norm(resource.replace(/^\[\[|\]\]$/g, '').split('|')[0].split('/').pop() ?? '')
  const keys = syllabi
    .filter(s => s.resources.some(r => norm(r.name) === name || norm(r.target.split('|')[0].split('/').pop() ?? '') === name))
    .map(s => wikiExamIdToProgressKey(s.examId))
  return earliestExam(keys)
}
