// **Landmark names** — the in-world names a few keystone concepts carry on
// Actuaria's sector screens (docs/actuaria-online.md §6.4).
//
// Only keystones get one: they are the load-bearing concepts of an exam
// (data/keystoneConcepts.ts), so they are the landmarks worth naming. Every
// other concept is its own name. A landmark name is never shown alone — the
// concept's name always sits beneath it, so a player can find the page.
//
// `concept` must be a keystone of `exam` — `actuariaLandmarks.test.ts` pins it
// with `findKeystone`, so a renamed or retired keystone fails the build rather
// than leaving a landmark pointing at nothing.

export interface ActuariaLandmark {
  /** The exam_progress key the keystone belongs to (`P`, `FM`, `CAS-5`). */
  exam: string
  /** The keystone concept's canonical name — its `Concepts/<name>.md`. */
  concept: string
  /** The in-world name. */
  name: string
}

export const ACTUARIA_LANDMARKS: readonly ActuariaLandmark[] = [
  { exam: 'P', concept: 'Bayes Theorem', name: 'Bayes Outpost' },
  { exam: 'P', concept: 'Poisson Distribution', name: 'Poisson Drift' },
  { exam: 'P', concept: 'Normal Distribution', name: 'Normal Ridge' },
  { exam: 'P', concept: 'Central Limit Theorem', name: 'Limit Beacon' },
  { exam: 'FM', concept: 'Present Value', name: 'Present Value Harbor' },
  { exam: 'FM', concept: 'Annuity Immediate', name: 'Annuity Belt' },
  { exam: 'FM', concept: 'Immunization', name: 'Immunization Shield Array' },
]

const BY_CONCEPT = new Map(ACTUARIA_LANDMARKS.map(l => [l.concept.toLowerCase(), l]))

/** The in-world name for a concept, or null for one that is its own name. */
export function landmarkName(concept: { name: string; target?: string | null } | string): string | null {
  if (typeof concept === 'string') return BY_CONCEPT.get(concept.toLowerCase())?.name ?? null
  const byName = BY_CONCEPT.get(concept.name.toLowerCase())
  if (byName) return byName.name
  const base = concept.target?.split('/').pop()?.replace(/\.md$/i, '')
  return base ? BY_CONCEPT.get(base.toLowerCase())?.name ?? null : null
}
