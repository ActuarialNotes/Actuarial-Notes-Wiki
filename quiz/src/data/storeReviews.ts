// The Store's reviews — what candidates and sellers have said about the
// products on the shelves, gathered from three places:
//
//   • **reddit** — r/actuary, read through the Arctic Shift archive of it,
//     which keeps each comment's text exactly as posted;
//   • **actuarial-outpost** — the Actuarial Outpost forum;
//   • **publisher** — the reviews and testimonials a seller prints itself.
//
// Every quote is **transcribed, never constructed** (docs/store.md): copied
// from the page it links to, cut only at an ellipsis, never reworded, with its
// author's name as shown there and its date. The selection follows what was
// found rather than picking the praise — where the threads complain, so do the
// quotes. `storeReviews.test.ts` holds every entry to a known product, a source
// on its own domain, a well-formed date and a quote of quotable length.

import type { PublisherRating, ReviewSource, StoreReview } from '@/lib/store'

/** How each source is named and drawn. Actuarial Outpost serves no icon of its own, so it gets a monogram. */
export const REVIEW_SOURCES: Record<ReviewSource, { name: string; short: string; logo?: string; hosts: readonly string[] }> = {
  reddit: { name: 'Reddit · r/actuary', short: 'r/', logo: '/review-sources/reddit.png', hosts: ['www.reddit.com'] },
  'actuarial-outpost': { name: 'Actuarial Outpost', short: 'AO', hosts: ['www.actuarialoutpost.com', 'actuarialoutpost.com'] },
  publisher: { name: 'The seller', short: '', hosts: [] },
}

/** When the reviews below were gathered. */
export const REVIEWS_CHECKED = '2026-10-03'

export const STORE_REVIEWS: readonly StoreReview[] = []

export const PUBLISHER_RATINGS: readonly PublisherRating[] = []
