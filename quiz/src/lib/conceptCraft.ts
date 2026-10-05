/**
 * **Concept Craft** — the rules of the game, as data and pure functions
 * (docs/concept-craft.md).
 *
 * A **topic** is one learning objective of an exam page — one of its
 * `[!example]` callouts — and the concept pages it names. Any two of them may be
 * connected, and how strongly is the concept graph's business
 * (`lib/conceptGraph.ts`): read off the pages, the questions and the syllabus,
 * never authored. The game is finding those connections: put concepts on the
 * board, drop one on another, and where the vault ties them together a line is
 * drawn between them carrying its strength.
 *
 * A reader's progress in a topic is two lists — the concepts put on the board,
 * and the connections found — as names and pair keys, re-read against the graph
 * every time. A vault edit that removes a connection takes it off the board
 * rather than breaking it.
 *
 * Nothing here touches the DOM, storage or the clock: the date is passed in,
 * so the daily challenge is reproducible in a test.
 */

import {
  buildConceptGraph,
  linkTargetName,
  flattenLine,
  pairKey,
  type ConceptGraph,
  type Connection,
  type GraphQuestion,
  type SyllabusLine,
} from './conceptGraph'
import { examHue } from './examColors'
import { examPageIdFromFile } from './examMenu'
import { examStatus } from './examStatus'
import { hashString } from './quests'
import { wikiExamIdToProgressKey } from './wikiParser'

export { pairKey }

// ─── Topics ──────────────────────────────────────────────────────────────────

export interface CraftTopic {
  /** URL-safe id: `/craft/<id>`. */
  id: string
  /** The exam_progress key — the accent colour and the logo (`P`, `MAS-I`, `CAS-5`). */
  exam: string
  /** The study guide page the topic is cut from, e.g. `Exam 5 (CAS)`. */
  examPage: string
  /** The learning objective as the page names it, e.g. `A. Ratemaking`. */
  objective: string
  /** The objective without its letter: `Ratemaking`. */
  title: string
  /** The objective's weight on the exam, as the page writes it (`45–55%`). */
  weight?: string
  /** The concept pages the objective names, in the order it names them. */
  concepts: string[]
  /** The objective's lines that name a concept, links flattened. */
  lines: SyllabusLine[]
}

/** A topic needs this many concept pages to be worth a board. */
export const MIN_TOPIC_CONCEPTS = 6

export interface ObjectiveBlock {
  name: string
  weight?: string
  lines: SyllabusLine[]
}

// The callout header `parseExamSyllabus` reads: `> [!example]- A. Ratemaking {45–55%}`.
const CALLOUT = /^>\s*\[!(\w+)\]-?\s*([^{}\n]*?)(?:\s*\{([^}]+)\})?\s*$/

/**
 * An exam page's learning objectives, line by line: every `[!example]`
 * callout, and each of its lines that links a concept — with the concepts it
 * links, by page name, and the line as it reads. Read the way
 * `parseExamSyllabus` reads the page, so a topic holds the concepts the study
 * guide lists under that objective.
 */
export function objectiveBlocks(markdown: string): ObjectiveBlock[] {
  const out: ObjectiveBlock[] = []
  let current: ObjectiveBlock | null = null
  for (const raw of markdown.split('\n')) {
    const header = CALLOUT.exec(raw)
    if (header) {
      current = header[1].toLowerCase() === 'example' ? { name: header[2].trim(), weight: header[3]?.trim(), lines: [] } : null
      if (current) out.push(current)
      continue
    }
    if (!current || !raw.startsWith('>')) continue
    const flat = flattenLine(raw.replace(/^>\s?/, ''))
    const concepts = [...new Set(flat.links.map(l => linkTargetName(l.target)).filter(Boolean))]
    if (concepts.length > 0) current.lines.push({ text: flat.text.trim(), concepts })
  }
  return out
}

function slug(text: string): string {
  return text
    .toLowerCase()
    .normalize('NFKD')
    .replace(/[̀-ͯ]/g, '')
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '')
}

/** "A. Ratemaking" → "Ratemaking"; an objective with no letter is left as it is. */
export function objectiveTitle(objective: string): string {
  return objective.replace(/^[A-Z]\.\s+/, '').trim()
}

/**
 * Every topic the vault can make a board of: each learning objective of each
 * exam that can be studied (not one still in development — `examStatus`) with
 * at least `MIN_TOPIC_CONCEPTS` concept pages, in ladder order.
 *
 * `pageName` says whether a concept has a page, and what it is called — a link
 * on an exam page may differ in case from the page it points at.
 */
export function craftTopics(examPages: Readonly<Record<string, string>>, pageName: (name: string) => string | undefined): CraftTopic[] {
  const exams = Object.keys(examPages)
    .filter(file => /^Exam\b/i.test(file))
    .map(file => {
      const examId = examPageIdFromFile(file)
      return { file, examId, exam: wikiExamIdToProgressKey(examId) }
    })
    .filter(e => examStatus(e.exam, e.examId) !== 'development' && examHue(e.exam) !== undefined)
    .sort((x, y) => (examHue(x.exam) ?? 0) - (examHue(y.exam) ?? 0) || x.file.localeCompare(y.file))

  const topics: CraftTopic[] = []
  for (const { file, examId, exam } of exams) {
    for (const block of objectiveBlocks(examPages[file])) {
      const concepts: string[] = []
      const lines: SyllabusLine[] = []
      for (const line of block.lines) {
        const named = line.concepts.map(pageName).filter((n): n is string => !!n)
        for (const n of named) if (!concepts.some(c => c.toLowerCase() === n.toLowerCase())) concepts.push(n)
        if (named.length > 0) lines.push({ text: line.text, concepts: named })
      }
      if (concepts.length < MIN_TOPIC_CONCEPTS) continue
      const title = objectiveTitle(block.name)
      topics.push({
        id: `exam-${slug(examId.replace(/-\d+$/, ''))}-${slug(title)}`,
        exam,
        examPage: file.replace(/\.md$/i, ''),
        objective: block.name,
        title,
        weight: block.weight,
        concepts,
        lines,
      })
    }
  }
  return topics
}

/** A topic's graph: how every pair of its concepts is connected. */
export function topicGraph(
  topic: Pick<CraftTopic, 'concepts' | 'lines'>,
  page: (name: string) => string | undefined,
  questions: readonly GraphQuestion[],
): ConceptGraph {
  return buildConceptGraph({ concepts: topic.concepts, page, questions, lines: topic.lines })
}

// ─── A reader's board ────────────────────────────────────────────────────────

/** A reader's place in one topic. */
export interface CraftProgress {
  /** The concepts on the board, lower-cased, in the order they were put there. */
  placed: string[]
  /** The connections found (`pairKey`), in the order found. */
  found: string[]
}

export const EMPTY_PROGRESS: CraftProgress = { placed: [], found: [] }

const norm = (name: string) => name.trim().toLowerCase()

function canonicalNames(graph: ConceptGraph): Map<string, string> {
  return new Map(graph.concepts.map(c => [norm(c), c]))
}

/** The concepts on the board, as the graph names them — any the topic no longer has drop out. */
export function placedConcepts(graph: ConceptGraph, progress: CraftProgress): string[] {
  const names = canonicalNames(graph)
  return [...new Set(progress.placed.map(norm))].map(n => names.get(n)).filter((n): n is string => !!n)
}

/** The connections found that the graph still has, in the order found. */
export function foundConnections(graph: ConceptGraph, progress: CraftProgress): Connection[] {
  return [...new Set(progress.found)].map(k => graph.byKey.get(k)).filter((c): c is Connection => !!c)
}

export function isPlaced(progress: CraftProgress, name: string): boolean {
  return progress.placed.includes(norm(name))
}

/** Progress with these concepts on the board too. Idempotent. */
export function withPlaced(progress: CraftProgress, ...names: string[]): CraftProgress {
  const add = [...new Set(names.map(norm))].filter(n => n && !progress.placed.includes(n))
  return add.length ? { ...progress, placed: [...progress.placed, ...add] } : progress
}

/** Progress with one more connection found — and both its ends on the board. Idempotent. */
export function withConnection(progress: CraftProgress, connection: Pick<Connection, 'a' | 'b'>): CraftProgress {
  const placed = withPlaced(progress, connection.a, connection.b)
  const key = pairKey(connection.a, connection.b)
  return placed.found.includes(key) ? placed : { ...placed, found: [...placed.found, key] }
}

/** What happens when `a` is dropped on `b`. */
export type CombineOutcome =
  /** Nothing in the vault ties the two together. */
  | { kind: 'none' }
  /** Found before: the line between them lights up. */
  | { kind: 'known'; connection: Connection }
  | { kind: 'new'; connection: Connection }

export function combine(graph: ConceptGraph, progress: CraftProgress, a: string, b: string): CombineOutcome {
  if (norm(a) === norm(b)) return { kind: 'none' }
  const connection = graph.byKey.get(pairKey(a, b))
  if (!connection) return { kind: 'none' }
  return progress.found.includes(connection.key) ? { kind: 'known', connection } : { kind: 'new', connection }
}

export interface TopicTally {
  placed: number
  concepts: number
  found: number
  connections: number
  /** Every connection found. */
  complete: boolean
}

export function topicTally(graph: ConceptGraph, progress: CraftProgress): TopicTally {
  const found = foundConnections(graph, progress).length
  return {
    placed: placedConcepts(graph, progress).length,
    concepts: graph.concepts.length,
    found,
    connections: graph.connections.length,
    complete: graph.connections.length > 0 && found === graph.connections.length,
  }
}

/** One concept's connections: those found, and how many it has in all. */
export function conceptConnections(graph: ConceptGraph, progress: CraftProgress, name: string): { found: Connection[]; total: number } {
  const all = graph.neighbours.get(norm(name)) ?? []
  const found = new Set(progress.found)
  return { found: all.filter(c => found.has(c.key)), total: all.length }
}

// ─── The daily challenge: what connects two concepts ─────────────────────────

const neighbourOf = (c: Connection, name: string) => (norm(c.a) === name ? norm(c.b) : norm(c.a))

/**
 * The concepts the graph connects to both `a` and `b` — what lies between two
 * concepts it doesn't connect directly — strongest pairing first.
 */
export function commonNeighbours(graph: ConceptGraph, a: string, b: string): { concept: string; via: [Connection, Connection] }[] {
  const x = norm(a)
  const y = norm(b)
  const fromB = new Map((graph.neighbours.get(y) ?? []).map(c => [neighbourOf(c, y), c]))
  const out: { concept: string; via: [Connection, Connection] }[] = []
  for (const c of graph.neighbours.get(x) ?? []) {
    const n = neighbourOf(c, x)
    const d = fromB.get(n)
    if (!d || n === y) continue
    out.push({ concept: norm(c.a) === n ? c.a : c.b, via: [c, d] })
  }
  return out.sort((p, q) => Math.min(q.via[0].strength, q.via[1].strength) - Math.min(p.via[0].strength, p.via[1].strength))
}

/** Whether the connections found already join `a` and `b` through a concept connected to both. */
export function isBridged(graph: ConceptGraph, progress: CraftProgress, a: string, b: string): boolean {
  const found = new Set(progress.found)
  return commonNeighbours(graph, a, b).some(({ via }) => found.has(via[0].key) && found.has(via[1].key))
}

/**
 * The connections still to find to join `a` and `b` through a concept
 * connected to both, in order from `a`: by way of the concept that needs the
 * fewest new finds, and among those the most strongly connected — so the hint
 * points at a bridge the pages make plainly. Empty once the two are bridged;
 * null when no concept connects to both.
 */
export function bridgePlan(graph: ConceptGraph, progress: CraftProgress, a: string, b: string): { concept: string; missing: Connection[] } | null {
  const found = new Set(progress.found)
  let best: { concept: string; missing: Connection[] } | null = null
  for (const { concept, via } of commonNeighbours(graph, a, b)) {
    const missing = via.filter(c => !found.has(c.key))
    if (!best || missing.length < best.missing.length) best = { concept, missing }
    if (missing.length === 0) break
  }
  return best
}

export interface ChallengePair {
  a: string
  b: string
}

/**
 * The pairs the day's challenges are drawn from: two concepts the vault does
 * not connect directly but does through a third — "what connects these
 * two?" Shuffled by the date and the topic, so it is the same list all day on
 * every device and a different one tomorrow.
 */
export function challengeOrder(graph: ConceptGraph, topicId: string, date: string): ChallengePair[] {
  const pairs: ChallengePair[] = []
  const names = graph.concepts
  const adjacent = (x: string, y: string) => graph.byKey.has(pairKey(x, y))
  for (let i = 0; i < names.length; i++) {
    const near = new Set((graph.neighbours.get(norm(names[i])) ?? []).map(c => neighbourOf(c, norm(names[i]))))
    if (near.size === 0) continue
    for (let j = i + 1; j < names.length; j++) {
      if (adjacent(names[i], names[j])) continue
      const theirs = graph.neighbours.get(norm(names[j])) ?? []
      if (theirs.some(c => near.has(neighbourOf(c, norm(names[j]))))) pairs.push({ a: names[i], b: names[j] })
    }
  }
  const rank = (p: ChallengePair) => hashString(`${date}|${topicId}|${pairKey(p.a, p.b)}`)
  return pairs
    .map(p => ({ p, r: rank(p) }))
    .sort((x, y) => x.r - y.r)
    .map(({ p }) => p)
}

/**
 * Today's challenge: the first pair in the day's order the reader hasn't
 * bridged yet (`skip` passes over that many more — "another challenge"). Null
 * once every pair is bridged. The order is fixed for the day and progress only
 * grows, so finding connections that don't bridge the pair never moves it.
 */
export function dailyChallenge(
  graph: ConceptGraph,
  progress: CraftProgress,
  order: readonly ChallengePair[],
  skip = 0,
): ChallengePair | null {
  let left = skip
  let last: ChallengePair | null = null
  for (const pair of order) {
    if (isBridged(graph, progress, pair.a, pair.b)) continue
    last = pair
    if (left-- <= 0) return pair
  }
  return last
}
