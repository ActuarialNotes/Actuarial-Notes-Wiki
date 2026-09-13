// The sources a page was fact checked *against*.
//
// A `verification:` block records each source as one line of citation prose
// written for an auditor: the work, the pages the claim was checked on, a
// sha256 of the file that was read, and usually a URL. `summarizeSource`
// (lib/verification.ts) cuts that line into its parts; this module does the
// other half — finding the vault's own page for the work, so the panel can show
// a cited source as the same resource card a resource page leads with (cover,
// title, author, the bibliographic chips, a way to go and read it) instead of a
// line of citation text.
//
// The candidate pages are the syllabus readings: every entry of every exam
// page's `## Source Material` callout, from the build-time `virtual:exam-pages`
// bundle via `hooks/useWikiSyllabus`. Those are the books a check is run
// against in the first place (`docs/verification.md`, rank 2), so a citation
// that names one finds its page, and one that names something else — a content
// outline, a paper, a standard with no page in the vault — is drawn from the
// citation alone rather than matched to a book it isn't.
//
// Pure and testable: nothing here fetches.

import { summarizeSource } from '@/lib/verification'
import { pathToEntryRef, entryRefToRepoPath } from '@/lib/wikiRoutes'
import type { WikiExamSyllabus } from '@/lib/wikiParser'

export interface SourcePage {
  /** The page's name, as a syllabus links it: `Basic Ratemaking (Werner - 2016)`. */
  name: string
  /** Repo-relative path of the page, e.g. `Resources/Books/….md`. */
  path: string
}

export interface CitedSource {
  /** The citation exactly as authored — kept for the card's `title`. */
  raw: string
  /** The work's name, which is what the card is titled when nothing matches. */
  label: string
  /** The chapters, sections and pages the claim was checked on. */
  locator: string | null
  /** Where the citation says the source can be read. */
  url: string | null
  /** The vault's page for the work, when one matches. */
  page: SourcePage | null
}

/**
 * Where a source-material link's page lives. A bare `[[Basic Ratemaking …]]`
 * is a `Resources/Books` page — that is where every syllabus reading is
 * authored — while a link written as a path says so itself.
 */
export function resourcePagePath(target: string, name: string): string {
  if (target.includes('/')) {
    const ref = pathToEntryRef(target.endsWith('.md') ? target : `${target}.md`)
    if (ref) return entryRefToRepoPath(ref)
  }
  return `Resources/Books/${name}.md`
}

/** Every reading named by every exam page, once each, in syllabus order. */
export function syllabusSourcePages(syllabi: WikiExamSyllabus[]): SourcePage[] {
  const pages: SourcePage[] = []
  const seen = new Set<string>()
  for (const syllabus of syllabi) {
    for (const resource of syllabus.resources) {
      const name = resource.name.trim()
      if (!name) continue
      const key = name.toLowerCase()
      if (seen.has(key)) continue
      seen.add(key)
      pages.push({ name, path: resourcePagePath(resource.target || name, name) })
    }
  }
  return pages
}

/** Words that carry no identity, so requiring them would only cause misses. */
const STOP_WORDS = new Set([
  'a', 'an', 'and', 'the', 'of', 'for', 'in', 'on', 'to', 'with', 'using', 'its',
  'et', 'al', 'ed', 'eds', 'vol', 'no',
])

function words(text: string): string[] {
  return text.toLowerCase().replace(/[^a-z0-9]+/g, ' ').trim().split(' ').filter(Boolean)
}

/** A page name minus its `(Author - Year)` tail — the work itself. */
function workName(pageName: string): string {
  return pageName.replace(/\s*\([^()]*\)\s*$/, '').trim() || pageName
}

/**
 * The vault page a citation names, or null.
 *
 * Matched on words rather than on the string, because the two are authored
 * independently and never agree character for character: the vault files
 * *Basic Ratemaking (Werner - 2016)* and *ASOP 43 - Property Casualty Unpaid
 * Claim Estimates (ASB - 2007)*, while an auditor writes "Werner & Modlin,
 * Basic Ratemaking (CAS, 5th ed. May 2016)" and "ASOP No. 43,
 * Property/Casualty Unpaid Claim Estimates (ASB, June 2007)".
 *
 * The test is one-directional and strict: *every* word of the page's title has
 * to appear in the citation. A citation may say more than the title does (the
 * authors, the edition, the pages) but it cannot say less, so a near-neighbour
 * on the shelf can't answer for a book that was never cited. Where several
 * pages qualify, the most specific title wins, and the author and year of the
 * page name break the tie.
 */
export function matchSourcePage(pages: SourcePage[], label: string): SourcePage | null {
  const cited = new Set(words(label))
  let best: SourcePage | null = null
  let bestScore = 0

  for (const page of pages) {
    const required = words(workName(page.name)).filter(w => !STOP_WORDS.has(w))
    if (required.length === 0) continue
    // A one-word title only identifies anything if the word is distinctive —
    // "Dutil" or "Davidson", not an acronym that could be part of a sentence.
    if (required.length === 1 && required[0].length < 5) continue
    if (!required.every(w => cited.has(w))) continue

    const corroborating = words(page.name).filter(w => !STOP_WORDS.has(w) && cited.has(w)).length
    const score = required.length * 100 + corroborating
    if (score > bestScore) {
      bestScore = score
      best = page
    }
  }
  return best
}

/** Each cited source, cut into its parts and matched to its page. */
export function citedSources(raws: string[], pages: SourcePage[]): CitedSource[] {
  return raws
    .map(raw => (raw ?? '').trim())
    .filter(Boolean)
    .map(raw => {
      const { label, url, locator } = summarizeSource(raw)
      return { raw, label, url, locator, page: matchSourcePage(pages, label) }
    })
}
