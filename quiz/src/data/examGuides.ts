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
import type { WikiEntryRef } from '@/lib/wikiRoutes'
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


/**
 * A guide that belongs to no single exam — an orientation to the course of
 * study itself, read before there is an exam to study for.
 *
 * These live at the *top level* of `Guides/`, beside the per-exam folders, so
 * the per-exam collector (which only walks the folders) never mistakes one for
 * a tip. They are read in the same viewer as a tip page, so the ref carries its
 * explicit path. The Study Guides home page (`pages/wiki/WikiHome.tsx`) is what
 * lists them.
 */
export interface GeneralGuide {
  title: string
  /** One line under the title on the card — what the guide answers. */
  description: string
  ref: WikiEntryRef
}

export const GENERAL_GUIDES: GeneralGuide[] = [
  {
    title: 'How to Study for Actuarial Exams',
    description: 'How the course of study works: the two societies, the ladder of exams, how candidates get hired partway through, and how to prepare for a sitting.',
    ref: {
      kind: 'guide',
      name: 'How to Study for Actuarial Exams',
      path: 'Guides/How to Study for Actuarial Exams.md',
    },
  },
]
