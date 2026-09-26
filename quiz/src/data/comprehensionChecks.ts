// Authored "quick comprehension check" questions, one per concept.
//
// **Nothing reads this today.** The checks used to gate flashcard collection —
// a card had to pass its check before its mastery could leave New — but that
// gate is gone: a card is now collected the first time its concept reaches
// Level 1 (docs/flashcard-collection.md). The content, its parser and the
// corpus test are kept, the way the unrendered `Guides/` tips are, so the
// checks stay valid if a surface for them comes back; with no importer, Vite
// leaves the `virtual:comprehension-checks` module out of the bundle.
//
// The questions live as markdown, one file per concept, under
// comprehension-checks/<exam-id>/<Concept Name>.md at the repo root, parsed by
// lib/comprehensionCheckParser.ts. Each key is a concept's display name — its
// Concepts/*.md filename without the extension.
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
