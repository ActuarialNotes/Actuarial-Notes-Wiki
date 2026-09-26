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
      return !isExamInDevelopment(key) && matchesSelectedVariant(key, s.examId, variants[key])
    })
    .sort((a, b) =>
      statusRank(a) - statusRank(b)
      || ladder(a) - ladder(b)
      || a.examLabel.localeCompare(b.examLabel),
    )
}
