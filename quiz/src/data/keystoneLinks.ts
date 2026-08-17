// What each keystone concept page links to.
//
// Derived, not authored: vite reads `Concepts/<keystone>.md` at build time and
// keeps the `[[links]]` that land on another concept page, in the order the page
// makes them (see `keystoneLinksPlugin` in vite.config.ts). Editing a concept
// page therefore changes this map on the next build — there is nothing to keep
// in sync by hand.
//
// Consumed by lib/studyPlanOrder.ts: under the *Key concepts first* strategy the
// study plan introduces a keystone and then the concepts its own page leans on.
// See docs/study-plan-generation.md.

import links from 'virtual:keystone-links'

/** Concept page name → the concept pages it links to directly, in page order. */
export type ConceptLinkMap = Record<string, string[]>

export const KEYSTONE_LINKS: ConceptLinkMap = links
