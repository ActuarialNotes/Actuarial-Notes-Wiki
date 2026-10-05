import type { WikiIndexItem } from './wikiIndex'
import type { SyllabusEdition } from '../data/syllabusVintages'
import { compareExamLabels } from './resourceExams'

// The Resources page's **Vintage** filter: which edition of an exam's syllabus
// the shelf shows, and — the reason it exists — what changed between that
// edition and the one before it, highlighted on the cards (`added` in green,
// `dropped` in red and kept on the shelf so it can be seen at all).
//
// The editions are `data/syllabusVintages.ts`, transcribed from the examining
// body's documents. The newest edition's reading list is the exam page's own
// Source Material (the `exams` the wiki index hangs on each resource); every
// earlier list is walked back from it through each edition's diff. Pure and
// tested; `pages/wiki/WikiResources.tsx` draws it.
//
// A vintage means one exam's syllabus, so the filter only applies when the
// Exam filter holds exactly one exam that has an edition on file — the rule
// `lib/questionFilters.ts` keeps for a sitting, which means one exam's paper.

export type VintageChange = 'added' | 'dropped'

export const VINTAGE_CHANGES: readonly VintageChange[] = ['added', 'dropped']

const key = (name: string) => name.trim().toLowerCase()

/**
 * The readings on each edition, newest first, as lower-cased page names.
 * `current` is the exam page's Source Material; the newest edition's
 * `dropped` comes off it (a page may keep a retired reading for the record)
 * and its `added` goes on (a page that hasn't caught up still shows the
 * edition the document prints).
 */
export function editionReadings(current: Iterable<string>, editions: readonly SyllabusEdition[]): Set<string>[] {
  if (editions.length === 0) return []
  let on = new Set([...current].map(key))
  for (const name of editions[0].dropped ?? []) on.delete(key(name))
  for (const name of editions[0].added ?? []) on.add(key(name))
  const lists: Set<string>[] = []
  editions.forEach((edition, i) => {
    lists.push(on)
    if (i === editions.length - 1) return
    const older = new Set(on)
    for (const name of edition.added ?? []) older.delete(key(name))
    for (const name of edition.dropped ?? []) older.add(key(name))
    on = older
  })
  return lists
}

/**
 * The exam labels each resource is a reading for *now*: the index's `exams`
 * less any exam whose newest edition dropped it. Exam 6C's page keeps three
 * retired readings for the record; their cards shouldn't still be tagged and
 * counted as Exam 6C readings.
 */
export function withCurrentExams(
  books: readonly WikiIndexItem[],
  editionsFor: (exam: string) => readonly SyllabusEdition[],
): WikiIndexItem[] {
  return books.map(book => {
    if (!book.exams?.length) return book
    const exams = book.exams.filter(exam => {
      const newest = editionsFor(exam)[0]
      return !newest?.dropped?.some(name => key(name) === key(book.name))
    })
    return exams.length === book.exams.length ? book : { ...book, exams }
  })
}

export interface VintageView {
  exam: string
  editions: readonly SyllabusEdition[]
  /** The edition on screen. */
  edition: SyllabusEdition
  /** The edition it is compared with — the next-older one — or null for the oldest on file. */
  previous: SyllabusEdition | null
  /** Readings on `edition` (lower-cased page names). */
  readings: ReadonlySet<string>
  /** Readings per edition, in `editions` order — the dropdown's counts. */
  counts: readonly number[]
  /** What `edition` added and dropped against `previous`, as the data prints the names. */
  added: readonly string[]
  dropped: readonly string[]
}

/**
 * The vintage the shelf is showing, or null when no vintage applies: the Exam
 * filter doesn't hold exactly one exam, or that exam has no edition on file.
 * An unknown or absent `label` is the newest edition — a vintage is always
 * chosen once it applies, so the current syllabus is what the shelf shows by
 * default, retired readings and all taken off it.
 */
export function vintageView(
  books: readonly WikiIndexItem[],
  exams: ReadonlySet<string>,
  label: string | null,
  editionsFor: (exam: string) => readonly SyllabusEdition[],
): VintageView | null {
  if (exams.size !== 1) return null
  const [exam] = exams
  const editions = editionsFor(exam)
  if (editions.length === 0) return null
  const current = books.filter(book => book.exams?.includes(exam)).map(book => book.name)
  const lists = editionReadings(current, editions)
  const found = label === null ? -1 : editions.findIndex(e => e.label === label)
  const index = found === -1 ? 0 : found
  const edition = editions[index]
  const previous = editions[index + 1] ?? null
  return {
    exam,
    editions,
    edition,
    previous,
    readings: lists[index],
    counts: lists.map(list => list.size),
    added: previous ? (edition.added ?? []) : [],
    dropped: previous ? (edition.dropped ?? []) : [],
  }
}

export interface VintageShelfEntry {
  item: WikiIndexItem
  /** Set only while that kind of change is being highlighted. */
  change: VintageChange | null
  /** A reading the vault has no page for — drawn, but nothing to open. */
  stub: boolean
}

/**
 * The shelf for a vintage: its readings, and — while dropped readings are
 * highlighted — the ones it dropped, which are otherwise off it. A highlighted
 * change leads the shelf (added, then dropped, each in shelf order), so the
 * difference is the first thing on screen rather than scattered down a grid
 * of sixty cards. A changed reading the vault has no page for is drawn as a
 * stub under the name the outline gives it.
 */
export function vintageShelf(
  books: readonly WikiIndexItem[],
  view: VintageView,
  highlight: ReadonlySet<VintageChange>,
): VintageShelfEntry[] {
  const added = new Set(view.added.map(key))
  const dropped = new Set(view.dropped.map(key))
  const showAdded = highlight.has('added')
  const showDropped = highlight.has('dropped')

  const entries: VintageShelfEntry[] = []
  const seen = new Set<string>()
  for (const item of books) {
    const k = key(item.name)
    const on = view.readings.has(k)
    if (!on && !(showDropped && dropped.has(k))) continue
    seen.add(k)
    const change = showAdded && added.has(k) ? 'added' : showDropped && dropped.has(k) ? 'dropped' : null
    // A reading on an older edition is that exam's reading there, even if the
    // exam has since retired it.
    const tagged = on && !item.exams?.includes(view.exam)
      ? { ...item, exams: [...(item.exams ?? []), view.exam].sort(compareExamLabels) }
      : item
    entries.push({ item: tagged, change, stub: false })
  }
  const stubs = (names: readonly string[], change: VintageChange) => {
    for (const name of names) {
      if (seen.has(key(name))) continue
      seen.add(key(name))
      const title = view.edition.titles?.[name]
      const item: WikiIndexItem = { category: 'document', name, path: '', exams: change === 'added' ? [view.exam] : [] }
      if (title) item.title = title
      entries.push({ item, change, stub: true })
    }
  }
  if (showAdded) stubs(view.added, 'added')
  if (showDropped) stubs(view.dropped, 'dropped')

  const rank = (entry: VintageShelfEntry) => (entry.change === 'added' ? 0 : entry.change === 'dropped' ? 1 : 2)
  return entries
    .map((entry, i) => ({ entry, i }))
    .sort((a, b) => rank(a.entry) - rank(b.entry) || a.i - b.i)
    .map(({ entry }) => entry)
}

/** The vintage and the highlighted changes a URL carries — `?vintage=Fall+2025&changes=added`. */
export function vintageFromParams(params: URLSearchParams): { label: string | null; highlight: Set<VintageChange> } {
  const label = params.get('vintage')?.trim() || null
  const highlight = new Set(
    params.getAll('changes').filter((v): v is VintageChange => (VINTAGE_CHANGES as readonly string[]).includes(v)),
  )
  return { label, highlight }
}

/** `params` with the vintage and highlights replaced, everything else kept. */
export function vintageToParams(
  label: string | null,
  highlight: ReadonlySet<VintageChange>,
  params = new URLSearchParams(),
): URLSearchParams {
  const next = new URLSearchParams(params)
  next.delete('vintage')
  next.delete('changes')
  if (label) next.set('vintage', label)
  for (const change of VINTAGE_CHANGES) if (highlight.has(change)) next.append('changes', change)
  return next
}
