/**
 * Which section of a long page the reader is in — the outline's "you are
 * here" (the project brief, `components/project/BriefView.tsx`).
 *
 * A section is the one being read once its top has passed a line a little way
 * down the viewport (`anchor`), and until the next one's has. The last section
 * may be too short ever to reach that line, so a page scrolled to its end is
 * in its last section — but only a page that scrolls at all: one that fits on
 * screen is at its end from the start, and that says nothing about where the
 * reader is.
 *
 * Pure and tested; the component measures, this decides.
 */

export interface ScrollSpyInput {
  /** Each section's top, relative to the scroll container's visible top, in document order. */
  tops: readonly number[]
  /** How far below the container's top a section's top must pass to become current. */
  anchor: number
  scrollTop: number
  clientHeight: number
  scrollHeight: number
}

/** The index of the current section, or -1 for a page with none. */
export function activeSectionIndex({ tops, anchor, scrollTop, clientHeight, scrollHeight }: ScrollSpyInput): number {
  if (tops.length === 0) return -1
  const scrolls = scrollHeight > clientHeight + 1
  if (scrolls && scrollTop > 0 && scrollTop + clientHeight >= scrollHeight - 2) return tops.length - 1
  let active = 0
  for (let i = 0; i < tops.length; i++) if (tops[i] <= anchor) active = i
  return active
}
