// Which exams the add-flashcards sheet offers as pills (pages/Flashcards.tsx).
//
// Every exam there is material to study from — not only the ones marked in
// progress. The sheet used to list just those (falling back to P and FM), so a
// candidate who hadn't added an exam yet couldn't browse its cards at all.
// "Material to study from" is `lib/examStatus.ts`'s call: an exam still in
// development is a syllabus outline with no comprehension checks, so it stays
// off the shelf.
//
// The exams being studied lead, so the sheet still opens on one of them; the
// rest follow, passed exams last. Within each band the exams run up the ladder
// (`EXAM_HUES` is laid out in sitting order). Pure and deterministic.

import { matchesSelectedVariant } from '@/data/examSittings'
import type { DailyLevelUp } from './dailyProgressStore'
import { examHue } from './examColors'
import { isExamInDevelopment } from './examStatus'
import { wikiExamIdToProgressKey, type WikiExamSyllabus } from './wikiParser'

// Studying, then not started (or unknown), then passed.
const STATUS_RANK: Record<string, number> = {
  in_progress: 0,
  completed: 2,
}

export function flashcardShelfExams(
  syllabi: readonly WikiExamSyllabus[],
  progress: Readonly<Record<string, string | undefined>>,
  variants: Readonly<Record<string, string | null | undefined>>,
): WikiExamSyllabus[] {
  const statusRank = (s: WikiExamSyllabus) =>
    STATUS_RANK[progress[wikiExamIdToProgressKey(s.examId)] ?? ''] ?? 1
  const ladder = (s: WikiExamSyllabus) =>
    examHue(wikiExamIdToProgressKey(s.examId)) ?? Number.POSITIVE_INFINITY

  return syllabi
    .filter(s => {
      const key = wikiExamIdToProgressKey(s.examId)
      return !isExamInDevelopment(key, s.examId) && matchesSelectedVariant(key, s.examId, variants[key])
    })
    .sort((a, b) =>
      statusRank(a) - statusRank(b)
      || ladder(a) - ladder(b)
      || a.examLabel.localeCompare(b.examLabel),
    )
}

/**
 * The concepts an exam shelf's "Completed Today" section holds: today's
 * level-ups (`hooks/useTodayCompletions`) that belong to this exam's syllabus,
 * most recent first. A concept that levelled up twice today appears once, and
 * every name is spelled the way the syllabus spells it, since that is the name
 * the deck keys its cards by. A level-up for a concept this syllabus doesn't
 * list — another exam's quiz — is left off.
 */
export function completedTodayConcepts(
  levelUps: readonly DailyLevelUp[],
  syllabusConcepts: readonly string[],
): string[] {
  const byLower = new Map<string, string>()
  for (const name of syllabusConcepts) {
    const key = name.toLowerCase()
    if (!byLower.has(key)) byLower.set(key, name)
  }

  const out: string[] = []
  const seen = new Set<string>()
  const newestFirst = [...levelUps].sort((a, b) => (b.at > a.at ? 1 : b.at < a.at ? -1 : 0))
  for (const lu of newestFirst) {
    const key = lu.conceptSlug.toLowerCase()
    const name = byLower.get(key)
    if (!name || seen.has(key)) continue
    seen.add(key)
    out.push(name)
  }
  return out
}

/**
 * Which exam heading each deck card sits under when the deck is grouped by
 * exam: concept name (lowercased) → exam label.
 *
 * A card added from an exam's shelf remembers that exam (`FlashCard.exam`, the
 * shelf's `examId`), and that is where it goes — a reader who added *Convexity*
 * from Exam FM finds it under Exam FM, not under some later exam whose syllabus
 * also names it. Only when the card carries no exam (added from a search, the
 * Collected shelf, a quiz level-up, or before cards remembered one), or the
 * exam it names has gone, is it placed by syllabus — the first of `syllabi`
 * that lists it, so pass them in the shelf's order (`flashcardShelfExams`, the
 * exams being studied first, then up the ladder) ahead of the rest. A concept
 * no syllabus lists is left out; the page files it under "Other".
 */
export function deckExamLabels(
  cards: readonly { name: string; exam?: string }[],
  syllabi: readonly WikiExamSyllabus[],
): Map<string, string> {
  const labelById = new Map<string, string>()
  const firstListing = new Map<string, string>()
  for (const s of syllabi) {
    if (!labelById.has(s.examId)) labelById.set(s.examId, s.examLabel)
    for (const topic of s.topics) {
      for (const c of topic.concepts) {
        const key = c.name.toLowerCase()
        if (!firstListing.has(key)) firstListing.set(key, s.examLabel)
      }
    }
  }

  const out = new Map<string, string>()
  for (const card of cards) {
    const key = card.name.toLowerCase()
    const label = (card.exam ? labelById.get(card.exam) : undefined) ?? firstListing.get(key)
    if (label) out.set(key, label)
  }
  return out
}
