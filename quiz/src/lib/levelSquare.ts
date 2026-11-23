/**
 * The level square: a concept's level as a small rounded square in neutral
 * shades (docs/redesign-spec.md §2.2, style guide §13.2).
 *
 *   New        empty, outlined in the line colour
 *   Level 1    the lighter grey
 *   Level 2    the darker grey
 *   Level 3    the text colour, solid
 *   Forgotten  empty, dashed outline in the text colour
 *
 * A concept in today's session wears a second outline in the text colour, set
 * 2px off the square.
 *
 * The shades carry no hue on purpose: on a redesigned screen green means a
 * correct answer and nothing else (`lib/answerState.ts`). `MasteryBadge` and
 * its green ladder stay for the screens not yet redesigned.
 */

import type { MasteryState } from './mastery'
import { MASTERY_LABEL } from './masteryBadge'

/** Fill and edge per state. Every class is a token, so both themes follow. */
export const LEVEL_SQUARE_LOOK: Record<MasteryState, string> = {
  new: 'border-[1.5px] border-border',
  level1: 'bg-level-1',
  level2: 'bg-level-2',
  level3: 'bg-foreground',
  forgotten: 'border-[1.5px] border-dashed border-foreground',
}

export type LevelSquareSize = 'xs' | 'sm' | 'md'

/**
 * `xs` (10px) sits inside a pill beside a concept's name, `sm` (14px) is the
 * key's and a row's, `md` (20px) is the grid an objective's concepts are drawn
 * as. The radius tracks the edge.
 */
export const LEVEL_SQUARE_SIZE: Record<LevelSquareSize, string> = {
  xs: 'h-2.5 w-2.5 rounded-[3px]',
  sm: 'h-3.5 w-3.5 rounded-[3px]',
  md: 'h-5 w-5 rounded-[5px]',
}

/** The outline a square takes while its concept is in today's session. */
export const LEVEL_SQUARE_TODAY = 'outline outline-2 outline-offset-2 outline-foreground'

/** What a square says to a screen reader: its level, and "in today's session". */
export function levelSquareLabel(state: MasteryState, today = false): string {
  return today ? `${MASTERY_LABEL[state]}, in today's session` : MASTERY_LABEL[state]
}

/** The ladder in the order the key lists it. */
export const LEVEL_SQUARE_ORDER: readonly MasteryState[] = ['new', 'level1', 'level2', 'level3', 'forgotten']

/**
 * One sentence for a row of squares ("14 concepts: 6 at Level 3, 2 at Level 2,
 * 1 forgotten, 5 new. 2 in today's session"), so a grid is one image to a
 * screen reader instead of fourteen.
 */
export function levelSquaresSummary(states: readonly MasteryState[], todayCount = 0): string {
  const n = states.length
  const count = (s: MasteryState) => states.filter(x => x === s).length
  const parts: string[] = []
  for (const s of ['level3', 'level2', 'level1'] as const) {
    if (count(s) > 0) parts.push(`${count(s)} at ${MASTERY_LABEL[s]}`)
  }
  if (count('forgotten') > 0) parts.push(`${count('forgotten')} forgotten`)
  if (count('new') > 0) parts.push(`${count('new')} new`)
  const head = `${n} ${n === 1 ? 'concept' : 'concepts'}`
  const body = parts.length > 0 ? `${head}: ${parts.join(', ')}` : head
  return todayCount > 0 ? `${body}. ${todayCount} in today's session` : body
}
