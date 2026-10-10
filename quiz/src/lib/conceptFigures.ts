import { distributionForImage } from '@/lib/distributions'

/**
 * The embeds of a concept page that are *pictures*, as opposed to the
 * distribution illustrations the popup swaps for a live simulator card.
 *
 * Only pictures fold away behind the popup header's figures toggle — the
 * simulator card is a single row and is always shown — so the header uses this
 * to decide whether the toggle has anything to act on, and the banner uses it
 * to decide what to draw. One definition, so the two can't disagree.
 */
export function pictureImages<T extends { src: string }>(images: readonly T[]): T[] {
  return images.filter(img => distributionForImage(img.src) === null)
}

/** The figures toggle's name for a set of pictures: "figure" or "2 figures". */
export function figureLabel(count: number): string {
  return count > 1 ? `${count} figures` : 'figure'
}
