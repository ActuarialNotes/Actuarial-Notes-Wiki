// The order the study plan works through a syllabus.
//
// This module answers one question — *in what order should concepts be
// introduced?* — and nothing else. `studyPlan.ts` still owns the state ladder
// (forgotten before level1 before level2 before new), the spacing gaps and the
// daily load; it asks here only how to break ties *within* a state.
//
// The two strategies:
//
//   strong_all  — syllabus order. The exam page lists its concepts in the order
//                 the syllabus teaches them ("Ratemaking, Exposure Base, Line of
//                 Business, …"), so following that order means never meeting a
//                 concept before the one it is defined in terms of. This is the
//                 identity ordering: `allConcepts` is already built by walking
//                 the syllabus top to bottom.
//
//   strong_key  — keystones first, each trailed by the concepts its own page
//                 links to. A keystone (`data/keystoneConcepts.ts`) is a concept
//                 the rest of the syllabus is built on, and the concepts it
//                 links to are the ones needed to make sense of it — so the pair
//                 is a coherent day's work. Groups are interleaved rather than
//                 laid end to end, so every keystone gets introduced early
//                 instead of the last one waiting for the first fourteen groups
//                 to finish.
//
// Neither strategy is alphabetical, which is what the plan used to fall back to
// once state was tied — and with a fresh account *everything* is tied at New, so
// a new learner's first week was whatever the syllabus happened to name starting
// with "A".

import { KEYSTONE_LINKS, type ConceptLinkMap } from '@/data/keystoneLinks'
import { keystoneKey, keystonesForExam } from '@/lib/keystone'
import type { TargetStrengthLevel } from '@/lib/studyPlan'

/**
 * How many of a keystone's supporting concepts follow it before the next
 * keystone's turn. At the plan's maximum introduction rate (5 new concepts a
 * day) a keystone plus three supporters keeps at least one keystone in every
 * day's introductions while the catalogue lasts.
 */
export const SUPPORTERS_PER_ROUND = 3

/** The shape `studyPlan.ts` orders — a syllabus concept with its topic weight. */
export interface OrderableConcept {
  /** Display name, as the syllabus links it. */
  name: string
  /** Raw `[[target]]` when the syllabus link is aliased. */
  target?: string | null
  /** Parsed weight of the topic that owns it, used to order the tail. */
  numericWeight?: number
}

export interface OrderOptions {
  strategy: TargetStrengthLevel
  /** Exam-progress key (`P`, `FM`, `MAS-I`, `CAS-5`) — the keystone catalogue lookup. */
  examId: string
  /** Defaults to the build-time map; tests pass their own. */
  links?: ConceptLinkMap
}

/**
 * Order a syllabus's concepts for introduction. Returns the same objects, so a
 * caller can build a rank map by identity.
 *
 * Every input concept comes back exactly once under either strategy: concepts a
 * keystone group never claims keep syllabus order behind it, heaviest topic
 * first (which is what *Key concepts first* meant before keystones existed, and
 * still all it can mean for an exam with no catalogue entry).
 */
export function orderConceptsForPlan<T extends OrderableConcept>(
  concepts: T[],
  { strategy, examId, links = KEYSTONE_LINKS }: OrderOptions,
): T[] {
  if (strategy !== 'strong_key') return [...concepts]

  // Resolve a link target to the syllabus entry it names. Both the display name
  // and the raw target are indexed, so an aliased link ([[Bond Price|Price]])
  // is found under either. First occurrence wins.
  const byKey = new Map<string, T>()
  for (const concept of concepts) {
    for (const raw of [concept.name, concept.target]) {
      if (!raw) continue
      const key = keystoneKey(raw)
      if (!byKey.has(key)) byKey.set(key, concept)
    }
  }

  const linksByKey = new Map<string, string[]>()
  for (const [page, targets] of Object.entries(links)) linksByKey.set(keystoneKey(page), targets)

  const keystones = keystonesForExam(examId)
  // Resolve the keystones first: one that another keystone's page links to is
  // still introduced in its own right, never as a supporter.
  const entries = keystones.map(k => ({ k, entry: byKey.get(keystoneKey(k.name)) ?? null }))
  const isKeystoneEntry = new Set(entries.map(e => e.entry).filter((e): e is T => e !== null))

  const claimed = new Set<T>(isKeystoneEntry)
  const groups = entries.map(({ k, entry }) => {
    const supporters: T[] = []
    for (const target of linksByKey.get(keystoneKey(k.name)) ?? []) {
      const supporter = byKey.get(keystoneKey(target))
      // Off-syllabus links and concepts an earlier keystone already claimed are
      // skipped — a concept is introduced once, by the first keystone to need it.
      if (!supporter || claimed.has(supporter)) continue
      claimed.add(supporter)
      supporters.push(supporter)
    }
    return { keystone: entry, supporters }
  })

  const ordered: T[] = []
  const deepest = groups.reduce((max, g) => Math.max(max, g.supporters.length), 0)
  const rounds = Math.max(1, Math.ceil(deepest / SUPPORTERS_PER_ROUND))
  for (let round = 0; round < rounds; round++) {
    for (const group of groups) {
      if (round === 0 && group.keystone) ordered.push(group.keystone)
      ordered.push(
        ...group.supporters.slice(round * SUPPORTERS_PER_ROUND, (round + 1) * SUPPORTERS_PER_ROUND),
      )
    }
  }

  // Everything no keystone reached, heaviest topic first. Array.sort is stable,
  // so concepts of equal weight stay in syllabus order.
  const rest = concepts
    .filter(c => !claimed.has(c))
    .sort((a, b) => (b.numericWeight ?? 0) - (a.numericWeight ?? 0))

  return [...ordered, ...rest]
}
