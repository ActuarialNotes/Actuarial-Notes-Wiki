// The orientation guide an exam page shows above its learning objectives: the
// "How to Study" card and the list of tips it opens.
//
// The tips themselves are vault content — one markdown page each, under
// `Guides/<exam page>/<tip>.md` at the repo root — written and linked like a
// concept page and read in the same concept viewer, rather than authored here
// as TS objects with their own paged popup. Vite bundles them at build time via
// the `virtual:exam-guides` module (see vite.config.ts, which also puts their
// markdown into `virtual:wiki-content` so the viewer never has to fetch one),
// and `lib/examGuides.ts` groups them into one guide per exam.
//
// Ordering is authored in each page's `order:` frontmatter. Where a guide card
// goes on the page is still marked by the vault's bare
// `<div class="exam-guides"></div>`, which `WikiArticle` swaps for
// `components/wiki/ExamGuideCards.tsx`.

import rawGuideFiles from 'virtual:exam-guides'
import {
  buildExamGuides,
  type ExamGuide,
  type ExamGuidePage,
} from '@/lib/examGuides'

export type { ExamGuide, ExamGuidePage }
export { GUIDE_TITLE, guideLabel } from '@/lib/examGuides'

/** Keyed by the wiki exam id (`lib/wikiRoutes.examIdFromFile`). */
export const EXAM_GUIDES: Record<string, ExamGuide> = buildExamGuides(rawGuideFiles)

/** The guide for one exam, or null for an exam with no `Guides/` folder. */
export function guideForExam(examId: string): ExamGuide | null {
  return EXAM_GUIDES[examId.toLowerCase()] ?? null
}
