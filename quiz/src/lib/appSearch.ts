/**
 * The matching rules behind the **app search bar** — the bar the Dashboard and
 * Flashcards pin to the top of the viewport in place of the app header.
 *
 * The chrome those bars are built from is `components/FloatingSearchBar.tsx`;
 * what a query *means* is each place's own business (the Dashboard asks it of
 * concepts, resources and questions, Flashcards of the deck and of every
 * concept that could join it). What the two share is the ranking, which is the
 * part a surface should never re-decide: a row whose *name* starts with the
 * query outranks one that merely contains it, which outranks one that only
 * matches word by word, and a hit on a later field (an author, a question's
 * prose) never outranks a hit on the name.
 *
 * Pure and tested — nothing here touches React, the network or storage.
 */

import type { WikiIndexCategory } from '@/lib/wikiIndex'

/** Which shelf of the wiki index a scope pill is asking about. */
export type WikiSearchScope = 'concepts' | 'resources'

/** Lower-cased, trimmed, with curly apostrophes folded onto straight ones. */
export function normalizeQuery(text: string): string {
  return text.toLowerCase().replace(/[‘’]/g, "'").replace(/\s+/g, ' ').trim()
}

/**
 * `normalizeQuery`, and then everything a reader types differently from the
 * vault without meaning anything by it: accents dropped ("Bühlmann"),
 * apostrophes dropped ("Bayes' Theorem" is the page *Bayes Theorem*), and
 * hyphens, dashes, slashes and underscores read as spaces ("chain-ladder").
 * Both sides of every match go through it.
 */
export function foldText(text: string): string {
  return normalizeQuery(text)
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .replace(/'/g, '')
    .replace(/[-\u2010-\u2015/_]+/g, ' ')
    .replace(/\s+/g, ' ')
    .trim()
}

// Ranks, best first. The gaps are meaningless; only the order is.
const RANK_PREFIX = 0
const RANK_WORD_START = 1
const RANK_CONTAINS = 2
const RANK_INITIALS = 3
const RANK_ALL_WORDS = 4
/** A name found only by allowing for a typing slip — below every true match. */
const RANK_NEAR = 5

/** The first letter of each word: "bornhuetter ferguson method" → "bfm". */
function initials(folded: string): string {
  return folded.split(' ').map(w => w[0] ?? '').join('')
}

/** How far down the field list a hit was found — see `searchBy`. */
const FIELD_PENALTY = 10

/**
 * How well `text` answers `query`, or `null` when it doesn't answer it at all.
 * Lower is better.
 *
 * The last rank is what makes a half-remembered name findable: every word of
 * the query appearing somewhere counts, so "value expected" still finds
 * *Expected Value*. It ranks below every contiguous match so an exact hit is
 * never pushed down the list by one.
 */
export function rankMatch(text: string, query: string): number | null {
  const hay = foldText(text)
  const q = foldText(query)
  if (!hay || !q) return null

  if (hay.startsWith(q)) return RANK_PREFIX
  const idx = hay.indexOf(q)
  if (idx >= 0) return isWordStart(hay, idx) ? RANK_WORD_START : RANK_CONTAINS

  // A name's initials: "bf" finds Bornhuetter-Ferguson Method, "glm" the
  // Generalized Linear Model. Letters only, and short, so a word is never one.
  if (/^[a-z]{2,6}$/.test(q) && hay.includes(' ') && initials(hay).startsWith(q)) return RANK_INITIALS

  const words = q.split(' ')
  if (words.length > 1 && words.every(w => hay.includes(w))) return RANK_ALL_WORDS
  return null
}

/** How many slips a word of this length may hold and still be the word meant. */
function slipsAllowed(word: string): number {
  if (word.length < 4) return 0
  return word.length < 8 ? 1 : 2
}

/**
 * The edit distance between two words (a letter added, dropped, changed, or
 * two neighbours swapped), or `max + 1` as soon as it is known to be past `max`.
 */
export function editDistance(a: string, b: string, max: number): number {
  if (Math.abs(a.length - b.length) > max) return max + 1
  let prev2: number[] = []
  let prev = Array.from({ length: b.length + 1 }, (_, j) => j)
  for (let i = 1; i <= a.length; i++) {
    const row = [i]
    let best = i
    for (let j = 1; j <= b.length; j++) {
      const cost = a[i - 1] === b[j - 1] ? 0 : 1
      let d = Math.min(prev[j]! + 1, row[j - 1]! + 1, prev[j - 1]! + cost)
      if (i > 1 && j > 1 && a[i - 1] === b[j - 2] && a[i - 2] === b[j - 1]) d = Math.min(d, prev2[j - 2]! + 1)
      row.push(d)
      if (d < best) best = d
    }
    if (best > max) return max + 1
    prev2 = prev
    prev = row
  }
  return prev[b.length]!
}

/**
 * Whether `text` is what a mistyped `query` meant: every word of the query is
 * within a slip or two of some word of the text ("poison" for *Poisson*,
 * "varience" for *Variance*). Short words must be exact. Only asked when
 * nothing matched properly, so a typo never outranks a true match.
 */
export function nearMatch(text: string, query: string): boolean {
  const hay = foldText(text).split(' ').filter(Boolean)
  const words = foldText(query).split(' ').filter(Boolean)
  if (hay.length === 0 || words.length === 0) return false
  return words.every(w => {
    const max = slipsAllowed(w)
    return hay.some(h => (max === 0 ? h.startsWith(w) : editDistance(w, h, max) <= max))
  })
}

function isWordStart(text: string, idx: number): boolean {
  if (idx === 0) return true
  return !/[a-z0-9]/.test(text[idx - 1] ?? '')
}

/**
 * The matching items, best first.
 *
 * `fields` hands back what an item can be matched on, most identifying first:
 * its name, then whatever else it carries. A hit on the first field always
 * wins, so a resource whose *author* is "Werner" sorts below the page actually
 * called that. Ties break alphabetically on the first field, so a list never
 * reshuffles itself between two equally good answers.
 */
export function searchBy<T>(
  items: readonly T[],
  query: string,
  fields: (item: T) => (string | undefined | null)[],
  limit = 20,
  /** `near`: when nothing matches, the items whose name is a typing slip away. */
  options: { near?: boolean } = {},
): T[] {
  const q = foldText(query)
  if (!q) return []

  const scored: { item: T; score: number; label: string }[] = []
  for (const item of items) {
    const parts = fields(item)
    let best: number | null = null
    for (let i = 0; i < parts.length; i++) {
      const part = parts[i]
      if (!part) continue
      const rank = rankMatch(part, q)
      if (rank === null) continue
      const score = rank + i * FIELD_PENALTY
      if (best === null || score < best) best = score
    }
    if (best !== null) scored.push({ item, score: best, label: parts[0] ?? '' })
  }

  if (scored.length === 0 && options.near) {
    for (const item of items) {
      const name = fields(item)[0]
      // The shortest name first: "varience" is Variance before Bias-Variance Tradeoff.
      if (name && nearMatch(name, q)) scored.push({ item, score: RANK_NEAR + name.length / 1000, label: name })
    }
  }

  scored.sort((a, b) => a.score - b.score || a.label.localeCompare(b.label))
  return scored.slice(0, limit).map(s => s.item)
}

/**
 * Whether an index entry belongs to the scope a pill is asking about.
 *
 * An exam page sits with the concepts rather than in a scope of its own: a
 * reader typing "MAS" wants the study guide, and it is the same kind of answer
 * — something to read — as the concept below it. Resources are the other kind:
 * a book, a study note, a regulation.
 */
export function inWikiScope(category: WikiIndexCategory, scope: WikiSearchScope): boolean {
  return scope === 'resources' ? category === 'document' : category !== 'document'
}

/** One searchable page of the study material. */
export interface StudyIndexEntry {
  kind: 'exam' | 'concept' | 'resource'
  /** The page's own name — what a route and a concept lookup are built from. */
  name: string
  /** The `[[target]]` the syllabus linked it by, when that isn't just the name. */
  target?: string
  /** The exams whose syllabus carries it, in the order they were read. */
  exams: string[]
}

/**
 * Everything the Dashboard's bar can find, built from the exam pages alone.
 *
 * Deliberately *not* `buildWikiIndex`: which pages exist is a build-time fact
 * (`virtual:exam-pages` → `useWikiSyllabus`), and the index's own path falls
 * back to GitHub's Contents API, which is rate-limited to 60 requests an hour
 * per IP. The Dashboard is the first screen of the app and its search has to
 * work on the flight home, so it asks the bundle. A concept that no syllabus
 * mentions is the cost, and the Search page — one tap away at the foot of the
 * results — is where the whole index is searched.
 */
export function buildStudyIndex(
  syllabi: readonly {
    examLabel: string
    fileName?: string
    topics: readonly { concepts: readonly { name: string; target: string }[] }[]
    resources: readonly { name: string; target: string }[]
  }[],
): StudyIndexEntry[] {
  const byKey = new Map<string, StudyIndexEntry>()

  function add(kind: StudyIndexEntry['kind'], name: string, target: string | undefined, exam: string) {
    const clean = name.trim()
    if (!clean) return
    const key = `${kind}:${clean.toLowerCase()}`
    const existing = byKey.get(key)
    if (existing) {
      if (exam && !existing.exams.includes(exam)) existing.exams.push(exam)
      return
    }
    byKey.set(key, { kind, name: clean, target, exams: exam ? [exam] : [] })
  }

  for (const s of syllabi) {
    // The exam page is itself a destination — "MAS" should find the study guide.
    add('exam', s.fileName ?? s.examLabel, undefined, '')
    for (const topic of s.topics) {
      for (const concept of topic.concepts) add('concept', concept.name, concept.target, s.examLabel)
    }
    for (const resource of s.resources) add('resource', resource.name, resource.target, s.examLabel)
  }

  return [...byKey.values()].sort((a, b) => a.name.localeCompare(b.name))
}
