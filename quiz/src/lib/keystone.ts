// Keystone concepts — lookup and progress helpers.
//
// The catalogue itself is authored in `data/keystoneConcepts.ts`; this module
// is the read side every surface goes through, so "is this concept a keystone?"
// gets the same answer in the popup, the flashcard gallery, the wiki article
// and the search panel.
//
// Matching is deliberately forgiving about *shape* but never about *identity*:
// a concept arrives as a display name ("Bayes Theorem"), a wiki-link target
// ("Concepts/Bayes+Theorem"), or an aliased syllabus link (`[[Bond Price|Price]]`
// → name "Price", target "Bond Price"). All of those normalise to the same key,
// but nothing fuzzy-matches — a near-miss must miss, or the gold treatment
// would leak onto concepts nobody marked.

import { KEYSTONE_EXAMS, type KeystoneConcept } from '@/data/keystoneConcepts'
import type { ConceptIdentity } from '@/lib/conceptMatch'
import { lookupConceptRecord } from '@/lib/conceptMatch'
import { decayIfStale, type ConceptMasteryRecord, type MasteryState } from '@/lib/mastery'

export type { KeystoneConcept } from '@/data/keystoneConcepts'

/** A keystone hit: the authored entry plus the exam it is a keystone *for*. */
export interface KeystoneMatch {
  concept: KeystoneConcept
  examId: string
  examLabel: string
}

/**
 * Normalise a concept reference to a comparison key. Handles the three shapes
 * concept names arrive in: a plain display name, a `Concepts/Foo+Bar` wiki-link
 * path, and a `.md` file name.
 */
export function keystoneKey(raw: string): string {
  const last = raw.split('/').filter(Boolean).pop() ?? raw
  return last
    .replace(/\.md$/i, '')
    .replace(/\+/g, ' ')
    .replace(/\s+/g, ' ')
    .trim()
    .toLowerCase()
}

const INDEX: Map<string, KeystoneMatch> = (() => {
  const map = new Map<string, KeystoneMatch>()
  for (const exam of KEYSTONE_EXAMS) {
    for (const concept of exam.concepts) {
      map.set(keystoneKey(concept.name), { concept, examId: exam.id, examLabel: exam.label })
    }
  }
  return map
})()

/**
 * Resolve a concept to its keystone entry, or null. Accepts a bare name or a
 * `ConceptIdentity` — for an aliased syllabus link the display name is tried
 * first and the raw `[[target]]` second, matching `lookupConceptRecord`.
 */
export function findKeystone(concept: string | ConceptIdentity | null | undefined): KeystoneMatch | null {
  if (!concept) return null
  if (typeof concept === 'string') return INDEX.get(keystoneKey(concept)) ?? null
  return (
    INDEX.get(keystoneKey(concept.name)) ??
    (concept.target ? INDEX.get(keystoneKey(concept.target)) ?? null : null)
  )
}

/** Convenience predicate for surfaces that only need the yes/no. */
export function isKeystone(concept: string | ConceptIdentity | null | undefined): boolean {
  return findKeystone(concept) !== null
}

/** The keystones of one exam, in authored (teaching) order. */
export function keystonesForExam(examId: string): KeystoneConcept[] {
  return KEYSTONE_EXAMS.find(e => e.id === examId)?.concepts ?? []
}

/** Every keystone across every exam — used by the vault-integrity test. */
export function allKeystones(): KeystoneMatch[] {
  return [...INDEX.values()]
}

export interface KeystoneProgress {
  total: number
  /** Keystones at Level 3 — the ladder top. */
  mastered: number
  /** Keystones with any progress at all (past New, not Forgotten). */
  started: number
  /** Keystones that have decayed back to Forgotten — the ones to fix first. */
  forgotten: number
  entries: Array<{ concept: KeystoneConcept; state: MasteryState }>
}

/**
 * Mastery roll-up for one exam's keystones. `lookup` is the shared lowercased
 * `concept_slug` map from `buildMasteryLookup`; records are decayed at read
 * time, the same as everywhere else in the app.
 */
export function keystoneProgress(
  examId: string,
  lookup: Map<string, ConceptMasteryRecord>,
  now: Date,
): KeystoneProgress {
  const concepts = keystonesForExam(examId)
  const entries = concepts.map(concept => {
    const record = lookupConceptRecord(lookup, { name: concept.name })
    const state: MasteryState = record ? decayIfStale(record, now).state : 'new'
    return { concept, state }
  })
  return {
    total: entries.length,
    mastered: entries.filter(e => e.state === 'level3').length,
    started: entries.filter(e => e.state === 'level1' || e.state === 'level2' || e.state === 'level3').length,
    forgotten: entries.filter(e => e.state === 'forgotten').length,
    entries,
  }
}
