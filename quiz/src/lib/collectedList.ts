// The collected-card list — what the "Collected" pill in the add-flashcards
// sheet shows (pages/Flashcards.tsx). Where the exam pills show a whole
// syllabus as packs, this view shows the individual cards the learner has
// already unlocked: one small tile each, newest collected first. Pure and
// deterministic, mirroring lib/flashcardStudy.ts; the UI owns the state.

import type { WikiExamSyllabus } from './wikiParser'

/** A collected card, as stored by hooks/useCollectedCards. */
export interface CollectedEntry {
  name: string
  collectedAt: number
}

/**
 * Every collected concept, most recently collected first and de-duplicated.
 *
 * Concepts are named by their syllabus spelling wherever a syllabus knows them,
 * so a card collected as "bayes theorem" still reads "Bayes' Theorem" here.
 */
export function buildCollectedList(
  syllabi: readonly WikiExamSyllabus[],
  collected: readonly CollectedEntry[],
): string[] {
  // Newest first, one entry per concept.
  const ordered = [...collected].sort((a, b) => b.collectedAt - a.collectedAt)
  const slugs: string[] = []
  const seen = new Set<string>()
  for (const c of ordered) {
    const slug = c.name.toLowerCase()
    if (seen.has(slug)) continue
    seen.add(slug)
    slugs.push(slug)
  }

  // Prefer the syllabus spelling of a concept over whatever case it was
  // collected under.
  const display = new Map<string, string>()
  for (const s of syllabi) {
    for (const t of s.topics) {
      for (const c of t.concepts) {
        const slug = c.name.toLowerCase()
        if (seen.has(slug) && !display.has(slug)) display.set(slug, c.name)
      }
    }
  }
  for (const c of ordered) {
    const slug = c.name.toLowerCase()
    if (!display.has(slug)) display.set(slug, c.name)
  }

  return slugs.map(slug => display.get(slug) ?? slug)
}
