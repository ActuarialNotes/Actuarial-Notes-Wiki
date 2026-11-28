// **When the Tutor speaks unasked** (docs/tutor.md §4). One moment is worth an
// interruption: a syllabus page read and now out of sight. Everything else
// waits until the character is tapped (lib/tutor/says.ts). The quiet rules are as much the
// feature as the moments are: a companion that interrupts is switched off.

import { dayKey } from './memory'
import type { OfferKind, TutorModel } from './log'
import { conceptModel } from './log'

/** Seconds a concept page has to be open to count as read (M1). */
export const READ_DWELL_SECONDS = 40
/** Minutes between bubbles. */
export const POST_READ_GAP_MINUTES = 3
/** A concept checked this recently isn't offered again after reading — that would be massing. */
export const RECHECK_HOURS = 24
/** Declines of one kind in a row before it stops being offered for the day. */
export const MAX_DECLINES = 2
/** How long a bubble stays up before it folds into the dot. */
export const BUBBLE_SECONDS = 12

export interface MomentInput {
  now: Date
  model: TutorModel
  /** The candidate has switched bubbles off, or folded the Tutor away. */
  quiet: boolean
  /** A quiz, a battle, a document, a field with focus, a page in focus mode. */
  blocked: boolean
  /** The panel is open, or a bubble is already up. */
  busy: boolean
  /** A syllabus concept page just left, and how long it was open. */
  leftPage?: { concept: string; seconds: number } | null
  /** Whether a concept has items the Tutor can serve. */
  servable: (concept: string) => boolean
}

export interface Offer {
  kind: OfferKind
  /** The concept it is about, if any. */
  concept?: string
}

function minutesSince(iso: string | null | undefined, now: Date): number {
  if (!iso) return Infinity
  return (now.getTime() - new Date(iso).getTime()) / 60_000
}

/** Whether a kind has been declined too often today to offer again. */
export function isSuppressed(model: TutorModel, kind: OfferKind, now: Date): boolean {
  const o = model.offers[kind]
  return !!o && o.day === dayKey(now) && o.declinesToday >= MAX_DECLINES
}

/** M1: a syllabus concept read, the page now out of sight. */
function postRead(input: MomentInput): Offer | null {
  const left = input.leftPage
  if (!left || left.seconds < READ_DWELL_SECONDS) return null
  if (!input.servable(left.concept)) return null
  const c = conceptModel(input.model, left.concept)
  if (c?.lastAnswerAt && minutesSince(c.lastAnswerAt, input.now) < RECHECK_HOURS * 60) return null
  return { kind: 'post-read', concept: left.concept }
}

/**
 * The offer to make now, or null. None is made
 * while the candidate is busy, blocked or has asked for quiet, and bubbles are
 * kept apart.
 */
export function nextOffer(input: MomentInput): Offer | null {
  if (input.quiet || input.blocked || input.busy) return null
  const sinceLast = minutesSince(input.model.lastOfferShownAt, input.now)
  const candidates: Array<{ offer: Offer | null; gap: number }> = [
    { offer: postRead(input), gap: POST_READ_GAP_MINUTES },
  ]
  for (const { offer, gap } of candidates) {
    if (!offer) continue
    if (sinceLast < gap) continue
    if (isSuppressed(input.model, offer.kind, input.now)) continue
    return offer
  }
  return null
}
