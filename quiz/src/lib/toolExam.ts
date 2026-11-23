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

// ── Apply (docs/redesign-spec.md §7c) ────────────────────────────────────────
//
// The colour rule above gives a tool one exam, the earliest that teaches it.
// Apply's Tools card and the Tools screen's first tab ask a different
// question: which tools does *this* exam's syllabus cover? A tool belongs to
// every exam whose learning objectives name one of its concepts, so a FAM
// candidate finds Chain Ladder although Exam 5 is not theirs.

/** What these functions read of a tool: its method's concept pages. */
type WithConcepts = { method: { concepts: readonly string[] } }

/**
 * A tool's concept: the first page its method names. The level square on its
 * row, "Learn the method" and "Practice this" are all about this one page.
 */
export function toolConcept(spec: WithConcepts): string | null {
  return spec.method.concepts[0] ?? null
}

/**
 * The tools one exam's syllabus covers, in the order given. It takes the
 * exam's own page, not its progress key: Exam 6's regional papers share a key
 * and not a syllabus.
 */
export function toolsForExam<T extends WithConcepts>(tools: readonly T[], syllabus: WikiExamSyllabus): T[] {
  const named = new Set<string>()
  for (const t of syllabus.topics) for (const c of t.concepts) named.add(norm(c.name))
  if (!named.size) return []
  return tools.filter(tool => tool.method.concepts.some(c => named.has(norm(c))))
}
