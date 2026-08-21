/**
 * The flashcard **foil** ladder — the rainbow border a collected card wears,
 * and the one thing that says what level that card is at.
 *
 * The deck card used to print a mastery *label* under the concept name ("New",
 * "2", "F") while the foil only had three steps (nothing at New/L1/Forgotten,
 * static at L2, travelling at L3). That put two readouts of the same fact on
 * one card, and the quieter one — the border — couldn't actually tell New from
 * Level 1 from Forgotten. The label is gone and the border carries the ladder
 * on its own, so it needs a distinct step per state:
 *
 * | State | Edge |
 * | --- | --- |
 * | New | no colour — the bare collected glint, the ladder hasn't started |
 * | Level 1 | a faint rainbow hairline |
 * | Level 2 | a static holographic border |
 * | Level 3 | a saturated, travelling foil border |
 * | Forgotten | amber, off the ladder (style guide §4.1: at risk, not an error) |
 *
 * The classes live in `index.css` next to `.flashcard-collected`; this module
 * is the mapping every surface that draws a card shares, so one concept looks
 * like the same card in the deck, in the add-flashcards picker and in the
 * collect modal. See `docs/flashcard-collection.md`.
 */

import type { MasteryState } from '@/lib/mastery'

/** The level modifier alone. `new` is the bare `.flashcard-collected` base. */
export const FOIL_LEVEL_CLASS: Record<MasteryState, string> = {
  new: '',
  level1: 'flashcard-sheen-l1',
  level2: 'flashcard-sheen-l2',
  level3: 'flashcard-sheen-l3',
  forgotten: 'flashcard-sheen-forgotten',
}

interface FoilOptions {
  /**
   * The small picker tile in the add-flashcards sheet: a lighter edge, lifted
   * over the tile's own content (`.flashcard-tile` in `index.css`).
   */
  tile?: boolean
}

/**
 * The classes a card wears for its mastery. An **uncollected** card is still
 * behind the gate and has earned no material at all, so it gets nothing —
 * that's what the padlock is for.
 */
export function flashcardFoilClass(
  collected: boolean,
  state: MasteryState,
  { tile = false }: FoilOptions = {},
): string {
  if (!collected) return ''
  return ['flashcard-collected', tile ? 'flashcard-tile' : '', FOIL_LEVEL_CLASS[state]]
    .filter(Boolean)
    .join(' ')
}
