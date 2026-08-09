/**
 * The one mastery ladder palette.
 *
 * Every surface that prints a concept's mastery state — the quiz builder's
 * topic rows, the Dashboard's Today card and readiness breakdown, the topic
 * coverage chart, the concept popup and detail modal, the flashcard gallery,
 * the learning-progress modal — used to carry its own copy of this table. Nine
 * copies had drifted into five different palettes, and one of them (the Today
 * card) had drifted into a different *hue mapping* entirely: Level 1 amber,
 * Level 2 blue, Level 3 green. The same concept at Level 1 was amber on the
 * Dashboard and green in the quiz builder.
 *
 * This module is the single source. The ladder is the canonical one from
 * `docs/style-guide.md` §4.2: intensity climbs with level through one green
 * family, and Forgotten leaves the ladder for amber.
 *
 * ## Why Forgotten is amber here and red in `masteryFill.ts`
 *
 * Style guide §4.1 reserves red for *incorrect / error / destructive* and gives
 * amber to *warning / caution / at risk* — which names decaying concepts
 * explicitly. A forgotten concept is at risk, not an error, so the badge ladder
 * uses amber.
 *
 * The Study Guide radial (`lib/masteryFill.ts`) deliberately keeps Forgotten
 * red, and that exception stands: the radial draws keystone concepts on a
 * parallel *gold* ladder (§4.4), so an amber "forgotten" spoke would be
 * indistinguishable from a healthy keystone one. No badge surface has that
 * collision, so no badge surface needs the exception.
 */

import type { MasteryState } from '@/lib/mastery'

/** Full label, for anywhere with room for words. */
export const MASTERY_LABEL: Record<MasteryState, string> = {
  new: 'New',
  level1: 'Level 1',
  level2: 'Level 2',
  level3: 'Level 3',
  forgotten: 'Forgotten',
}

/**
 * Compact label for tight rows: the level number alone. `new` keeps its word
 * because "0" would read as a score rather than a state, and `forgotten` gets
 * an F for the same reason. Compact badges always carry the full label as their
 * accessible name — see `MasteryBadge`.
 */
export const MASTERY_SHORT_LABEL: Record<MasteryState, string> = {
  new: 'New',
  level1: '1',
  level2: '2',
  level3: '3',
  forgotten: 'F',
}

/** Tinted badge surface — background + text, light and dark. */
export const MASTERY_TINT: Record<MasteryState, string> = {
  new:       'bg-muted text-muted-foreground',
  level1:    'bg-green-100 text-green-800 dark:bg-green-950/40 dark:text-green-300',
  level2:    'bg-green-200 text-green-800 dark:bg-green-900/60 dark:text-green-200',
  level3:    'bg-green-400 text-green-950 dark:bg-green-800 dark:text-green-100',
  forgotten: 'bg-amber-100 text-amber-900 dark:bg-amber-950/60 dark:text-amber-300',
}

/**
 * Text-only form, for a state named in a row that already has a surface of its
 * own. Mid shades, per style guide §4.2.
 */
export const MASTERY_TEXT: Record<MasteryState, string> = {
  new:       'text-muted-foreground',
  level1:    'text-green-600 dark:text-green-500',
  level2:    'text-green-700 dark:text-green-400',
  level3:    'text-green-800 dark:text-green-300',
  forgotten: 'text-amber-600 dark:text-amber-400',
}

/** Solid fill, for progress-bar segments and legend dots. */
export const MASTERY_FILL: Record<MasteryState, string> = {
  new:       'bg-muted-foreground/40',
  level1:    'bg-green-500/35',
  level2:    'bg-green-500/65',
  level3:    'bg-green-600 dark:bg-green-500',
  forgotten: 'bg-amber-500/70',
}

export type MasteryBadgeSize = 'xs' | 'sm' | 'md'

/**
 * `xs` is the list-row badge (topic rows, plan checklists, coverage charts);
 * `sm` sits inline with a small modal title; `md` is the standalone
 * learning-progress modal's header pill.
 */
export const MASTERY_BADGE_SIZE: Record<MasteryBadgeSize, string> = {
  xs: 'px-2 py-0.5 text-[10px]',
  sm: 'px-2.5 py-0.5 text-xs',
  md: 'px-5 py-2 text-base',
}
