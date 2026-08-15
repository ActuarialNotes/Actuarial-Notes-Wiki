// Case studies — the supplemental booklet handed out alongside a question paper.
//
// The studies live as markdown, one file per study, under
// case-studies/<exam-id>/<id>.md at the repo root, edited like the question bank
// (questions/<exam-id>/*.md). Vite bundles them at build time via the
// `virtual:case-studies` module (see vite.config.ts) and lib/caseStudies.ts
// parses them here into the id-keyed lookup the viewer reads.
//
// A question opts in with `case_study: "<id>"` in its frontmatter; `getCaseStudy`
// is the single read side, so every surface that renders a question can offer the
// study without knowing where it came from.

import rawStudies from 'virtual:case-studies'
import { parseAllCaseStudies, type CaseStudy } from '@/lib/caseStudies'

export type { CaseStudy }

export const CASE_STUDIES: Record<string, CaseStudy> = parseAllCaseStudies(rawStudies)

/** The study a question references, or null when the id is unset or unknown. */
export function getCaseStudy(id: string | undefined): CaseStudy | null {
  if (!id) return null
  return CASE_STUDIES[id] ?? null
}
