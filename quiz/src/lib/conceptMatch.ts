// Shared concept ↔ mastery matching.
//
// Mastery rows are written with `concept_slug` set to the concept's file/base
// name, resolved from a question's wiki_link (see conceptsForQuestion in
// quizStore.ts — which delegates to slugForLink below). The exam syllabus,
// however, may display an *alias* for that concept: a link like
// `[[Bond Price|Price]]` parses to `{ name: "Price", target: "Bond Price" }`,
// so the stored slug ("Bond Price") matches the concept's `target`, not its
// display `name`.
//
// Every read-side lookup must therefore try the display name first and fall
// back to the raw target. Centralising that here keeps the study plan,
// readiness scoring, the topic list, and the dashboard in agreement.

import { hrefToEntryRef } from '@/lib/wikiRoutes'
import { decayIfStale, type ConceptMasteryRecord, type MasteryState } from '@/lib/mastery'
import type { WikiExamSyllabus } from '@/lib/wikiParser'

/** A syllabus concept identity: its display name and (optional) raw target/base name. */
export interface ConceptIdentity {
  name: string
  target?: string | null
}

/**
 * Resolve a question wiki_link to the canonical concept slug used as the
 * concept_mastery / daily_completions key. This MUST stay in sync with how
 * mastery rows are written (conceptsForQuestion in quizStore.ts delegates here),
 * so storage and read-back always agree.
 */
export function slugForLink(link: string): string | null {
  const ref = hrefToEntryRef(link)
  if (ref?.kind === 'concept' && ref.name) return ref.name
  // Fall back to the slug's last segment (matches ConceptQuestionsModal).
  const last = link.split('/').filter(Boolean).pop()
  return last ? last.replace(/-/g, ' ') : null
}

/** Build a lookup of mastery records keyed by lowercased concept_slug. */
export function buildMasteryLookup(
  records: ConceptMasteryRecord[],
): Map<string, ConceptMasteryRecord> {
  const map = new Map<string, ConceptMasteryRecord>()
  for (const r of records) map.set(r.concept_slug.toLowerCase(), r)
  return map
}

/**
 * Find the mastery record for a syllabus concept. Tries the display name first
 * and falls back to the raw target so aliased concepts resolve correctly.
 */
export function lookupConceptRecord(
  lookup: Map<string, ConceptMasteryRecord>,
  concept: ConceptIdentity,
): ConceptMasteryRecord | undefined {
  return (
    lookup.get(concept.name.toLowerCase()) ??
    (concept.target ? lookup.get(concept.target.toLowerCase()) : undefined)
  )
}

/** Resolve a syllabus concept's current (decay-adjusted) mastery state. */
export function resolveConceptState(
  lookup: Map<string, ConceptMasteryRecord>,
  concept: ConceptIdentity,
  now: Date,
): MasteryState {
  const rec = lookupConceptRecord(lookup, concept)
  return rec ? decayIfStale(rec, now).state : 'new'
}

/**
 * All syllabi whose topic lists reference a concept, matched by display name
 * or by the raw `[[target]]` basename (handles `[[Bond Price|Price]]` aliases).
 * A concept taught in more than one exam's study guide yields multiple results —
 * callers must not silently pick the first one; ask the user which to open.
 */
export function findSyllabiForConcept(
  syllabi: WikiExamSyllabus[],
  conceptName: string,
): WikiExamSyllabus[] {
  const needle = conceptName.toLowerCase()
  return syllabi.filter(s => s.topics.some(t => t.concepts.some(c => {
    if (c.name.toLowerCase() === needle) return true
    const targetBase = c.target.split('/').pop()?.replace(/\.md$/i, '').toLowerCase()
    return targetBase === needle
  })))
}

/**
 * Re-key mastery records from their stored (file/base name) slug to the
 * syllabus display name, so name-keyed consumers like aggregateForTopic find
 * aliased concepts. Records whose slug isn't an aliased target pass through
 * unchanged.
 */
export function normalizeMasteryToDisplayNames(
  records: ConceptMasteryRecord[],
  syllabus: WikiExamSyllabus,
): ConceptMasteryRecord[] {
  const targetToDisplayName = new Map<string, string>()
  for (const topic of syllabus.topics) {
    for (const c of topic.concepts) {
      const tLow = c.target?.toLowerCase() ?? ''
      if (tLow && tLow !== c.name.toLowerCase()) targetToDisplayName.set(tLow, c.name)
    }
  }
  return records.map(r => {
    const display = targetToDisplayName.get(r.concept_slug.toLowerCase())
    return display ? { ...r, concept_slug: display } : r
  })
}
