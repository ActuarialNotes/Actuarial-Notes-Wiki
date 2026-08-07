// Collected-card packs — the "Collected" pill in the add-flashcards pack shelf
// (pages/Flashcards.tsx). Where the exam pills show a whole syllabus, this view
// shows only what the learner has already unlocked, grouped the same way an
// exam is: one all-concepts pack plus a pack per learning objective. Pure and
// deterministic, mirroring lib/flashcardStudy.ts; the UI owns the state.

import type { WikiExamSyllabus } from './wikiParser'

/** A collected card, as stored by hooks/useCollectedCards. */
export interface CollectedEntry {
  name: string
  collectedAt: number
}

export interface CollectedPack {
  /** Stable key for react + the accordion (topic names repeat across exams). */
  key: string
  label: string
  /** Which exam the learning objective belongs to. */
  sublabel?: string
  concepts: string[]
}

export interface CollectedPacks {
  /** Every collected concept, most recently collected first. */
  allConcepts: string[]
  /** One pack per learning objective holding at least one collected concept. */
  packs: CollectedPack[]
}

/** Key for the leftover pack — collected concepts no syllabus claims. */
export const OTHER_PACK_KEY = 'other'

/**
 * Groups the learner's collected cards into packs.
 *
 * Concepts are named by their syllabus spelling wherever a syllabus knows them,
 * so a card collected as "bayes theorem" still reads "Bayes' Theorem" here.
 * Within a pack, and in `allConcepts`, cards stay in collection order (newest
 * first) — the same order the Collected tab uses. A concept sitting on two
 * syllabi lands in both their packs; `allConcepts` de-duplicates it.
 */
export function buildCollectedPacks(
  syllabi: readonly WikiExamSyllabus[],
  collected: readonly CollectedEntry[],
): CollectedPacks {
  // Newest first, one entry per concept.
  const ordered = [...collected].sort((a, b) => b.collectedAt - a.collectedAt)
  const rank = new Map<string, number>()
  for (const c of ordered) {
    const slug = c.name.toLowerCase()
    if (!rank.has(slug)) rank.set(slug, rank.size)
  }

  // Prefer the syllabus spelling of a concept over whatever case it was
  // collected under.
  const display = new Map<string, string>()
  for (const s of syllabi) {
    for (const t of s.topics) {
      for (const c of t.concepts) {
        const slug = c.name.toLowerCase()
        if (rank.has(slug) && !display.has(slug)) display.set(slug, c.name)
      }
    }
  }
  for (const c of ordered) {
    const slug = c.name.toLowerCase()
    if (!display.has(slug)) display.set(slug, c.name)
  }

  const nameOf = (slug: string) => display.get(slug) ?? slug
  const byRank = (a: string, b: string) => (rank.get(a) ?? 0) - (rank.get(b) ?? 0)

  const packs: CollectedPack[] = []
  const claimed = new Set<string>()
  for (const s of syllabi) {
    for (const t of s.topics) {
      const hits = new Set<string>()
      for (const c of t.concepts) {
        const slug = c.name.toLowerCase()
        if (rank.has(slug)) hits.add(slug)
      }
      if (hits.size === 0) continue
      for (const slug of hits) claimed.add(slug)
      packs.push({
        key: `${s.examId}::${t.name}`,
        label: t.name,
        sublabel: s.examLabel,
        concepts: [...hits].sort(byRank).map(nameOf),
      })
    }
  }

  // …plus whatever no syllabus claims. Skipped when there are no other packs,
  // where it would only restate the all-concepts pack above it.
  const leftovers = [...rank.keys()].filter(slug => !claimed.has(slug))
  if (leftovers.length > 0 && packs.length > 0) {
    packs.push({
      key: OTHER_PACK_KEY,
      label: 'Other concepts',
      concepts: leftovers.sort(byRank).map(nameOf),
    })
  }

  return { allConcepts: [...rank.keys()].sort(byRank).map(nameOf), packs }
}
