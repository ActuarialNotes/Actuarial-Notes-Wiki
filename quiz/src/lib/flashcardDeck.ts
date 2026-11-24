// The Flashcards screen under Practice (docs/redesign-spec.md §7a.3): the
// words for the deck's size, and what a link's `?view=` asks the screen to open.

/** "1 card", "6 cards". */
export function deckCountLabel(n: number): string {
  return `${n.toLocaleString('en-US')} ${n === 1 ? 'card' : 'cards'}`
}

/**
 * Whether a `/flashcards?view=…` link asks for the deck. `deck` is what the
 * "Added to Deck" confirmation links with; `gallery` is the name the deck's
 * grid had before it became a popup.
 */
export function opensDeck(view: string | null): boolean {
  return view === 'deck' || view === 'gallery'
}

/** The parts of a concept page the back of a card can show. */
export type CardBackPart = 'definition' | 'math' | 'images'

export const CARD_BACK_PARTS: readonly { part: CardBackPart; label: string }[] = [
  { part: 'definition', label: 'Definition' },
  { part: 'math', label: 'Formulas' },
  { part: 'images', label: 'Figures' },
]

/** The back with one part switched; the set handed in is left as it was. */
export function toggleBackPart(parts: ReadonlySet<CardBackPart>, part: CardBackPart): Set<CardBackPart> {
  const next = new Set(parts)
  if (next.has(part)) next.delete(part)
  else next.add(part)
  return next
}
