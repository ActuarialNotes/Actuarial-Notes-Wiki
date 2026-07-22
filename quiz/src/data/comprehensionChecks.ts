// Authored "quick comprehension check" questions gating flashcard collection.
//
// The questions themselves now live as markdown, one file per concept, under
// comprehension-checks/<exam-id>/<Concept Name>.md at the repo root — edited like
// the question bank (questions/<exam-id>/*.md) rather than as a TS object. Vite
// bundles them at build time via the `virtual:comprehension-checks` module (see
// vite.config.ts) and lib/comprehensionCheckParser.ts parses them here into the
// concept-keyed lookup the collect modal reads.
//
// This module keeps the original public API (COMPREHENSION_CHECKS +
// ComprehensionCheck) so consumers don't change. Each key is a concept's display
// name — its Concepts/*.md filename without the extension — so it lines up with
// `concept.name` from useWikiSyllabus and `allConceptNames` in
// CollectConceptModal.tsx.
//
// Design rule (see .claude/skills/flashcard-comprehension-check): the correct
// answer is never the concept's own name or a paraphrase of its definition. Each
// file's `<!-- rationale -->` comment names the misconception every wrong choice
// targets; it is authoring documentation, not runtime data.

import rawChecks from 'virtual:comprehension-checks'
import {
  parseAllComprehensionChecks,
  type ComprehensionCheck,
} from '@/lib/comprehensionCheckParser'

export type { ComprehensionCheck }

export const COMPREHENSION_CHECKS: Record<string, ComprehensionCheck> =
  parseAllComprehensionChecks(rawChecks)
