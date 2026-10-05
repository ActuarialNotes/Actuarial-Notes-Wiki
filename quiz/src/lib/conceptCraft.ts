/**
 * **Concept Craft** — the rules of the game, as data and pure functions
 * (docs/concept-craft.md).
 *
 * A **topic** is one learning objective of an exam page — one of its
 * `[!example]` callouts — and the concept pages it names. Any two of them may be
 * connected, and how strongly is the concept graph's business
 * (`lib/conceptGraph.ts`): read off the pages, the questions and the syllabus,
 * never authored.
 *
 * The game is crafting the topic out of a few of its concepts. A reader starts
 * with the **seeds** — the fewest concepts from which every other can be made
 * (`seedConcepts`) — and drops one concept on another. Where the vault connects
 * the two, a line is drawn between them carrying its strength, and the
 * connection **makes** what lies between them: up to three concepts tied to both
 * (`madeBy`). Play on with what was made, and the whole topic follows.
 *
 * A reader's progress is one list — the connections found, in order — and
 * everything else is re-read from it against the graph every time: which
 * concepts are in hand, which connection made each, which are new
 * (`boardState`). A vault edit that removes a connection takes it off the board
 * rather than breaking it.
 *
 * Nothing here touches the DOM, storage or the clock.
 */

import {
  buildConceptGraph,
  linkTargetName,
  flattenLine,
  pairKey,
  tagName,
  type ConceptGraph,
  type Connection,
  type GraphQuestion,
  type SyllabusLine,
} from './conceptGraph'
import { examHue } from './examColors'
import { examPageIdFromFile } from './examMenu'
import { examStatus } from './examStatus'
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

// ─── Making concepts ─────────────────────────────────────────────────────────

/**
 * What a connection found makes: the concepts most strongly tied to *both* its
 * ends — at most `most` of them, and each tie at least `floor`, so what appears
 * is something the two concepts share rather than everything either touches.
 */
export const MAKING = { most: 3, floor: 25 } as const

const norm = (name: string) => name.trim().toLowerCase()
const otherEnd = (c: Connection, name: string) => (norm(c.a) === name ? norm(c.b) : norm(c.a))

/**
 * The concepts connected to both `a` and `b`, by name, most strongly tied first
 * (by the weaker of the two ties) — what lies between two concepts.
 */
export function commonNeighbours(graph: ConceptGraph, a: string, b: string): { concept: string; tie: number }[] {
  const x = norm(a)
  const y = norm(b)
  const fromB = new Map((graph.neighbours.get(y) ?? []).map(c => [otherEnd(c, y), c]))
  const out: { concept: string; tie: number }[] = []
  for (const c of graph.neighbours.get(x) ?? []) {
    const n = otherEnd(c, x)
    const d = fromB.get(n)
    if (!d || n === y) continue
    out.push({ concept: norm(c.a) === n ? c.a : c.b, tie: Math.min(c.strength, d.strength) })
  }
  return out.sort((p, q) => q.tie - p.tie || p.concept.localeCompare(q.concept))
}

/** What finding the connection between `a` and `b` makes — whether or not it is already in hand. */
export function madeBy(graph: ConceptGraph, a: string, b: string): string[] {
  if (!graph.byKey.has(pairKey(a, b))) return []
  return commonNeighbours(graph, a, b)
    .filter(n => n.tie >= MAKING.floor)
    .slice(0, MAKING.most)
    .map(n => n.concept)
}

/**
 * Everything that can be made from `held`, by finding every connection
 * between concepts in hand and taking what each makes, until nothing more
 * comes — the most a reader holding `held` could ever reach. Lower-cased; grows
 * `held` in place, starting from the concepts in `from`.
 */
function reach(graph: ConceptGraph, held: Set<string>, from: Iterable<string>): Set<string> {
  const queue = [...from]
  while (queue.length) {
    const y = queue.shift() as string
    for (const c of graph.neighbours.get(y) ?? []) {
      if (!held.has(otherEnd(c, y))) continue
      for (const made of madeBy(graph, c.a, c.b)) {
        const m = norm(made)
        if (held.has(m)) continue
        held.add(m)
        queue.push(m)
      }
    }
  }
  return held
}

/** How many connections, earliest in the syllabus first, are tried as the opening pair. */
const OPENING_TRIES = 150

/**
 * **The seeds** — the fewest concepts a reader needs in hand to make every
 * other concept in the topic, in the order they are dealt.
 *
 * Found greedily, which on graphs this size is the minimum or near it: first
 * the connected pair that reaches the most (`reach`), preferring the pair
 * earliest in the syllabus — the first one that reaches everything wins —
 * then, while anything is still out of reach, the concept that brings the most
 * of it within reach, again earliest first. A concept nothing can make (one
 * with no connection, or none it shares strongly enough) is always a seed.
 */
export function seedConcepts(graph: ConceptGraph): string[] {
  const order = graph.concepts
  if (order.length === 0) return []
  const index = new Map(order.map((n, i) => [norm(n), i]))
  const at = (n: string) => index.get(norm(n)) ?? order.length
  const pairs = [...graph.connections].sort((x, y) =>
    Math.max(at(x.a), at(x.b)) - Math.max(at(y.a), at(y.b)) || Math.min(at(x.a), at(x.b)) - Math.min(at(y.a), at(y.b)))

  let best: { pair: string[]; held: Set<string> } | null = null
  for (const c of pairs.slice(0, OPENING_TRIES)) {
    const pair = [c.a, c.b].sort((p, q) => at(p) - at(q))
    const held = reach(graph, new Set(pair.map(norm)), pair.map(norm))
    if (!best || held.size > best.held.size) best = { pair, held }
    if (held.size === order.length) break
  }
  // No connection at all: there is nothing to make, so every concept is a seed.
  if (!best) return [...order]

  const seeds = [...best.pair]
  let held = best.held
  while (held.size < order.length) {
    let pick: { name: string; held: Set<string> } | null = null
    for (const name of order) {
      if (held.has(norm(name))) continue
      const next = reach(graph, new Set([...held, norm(name)]), [norm(name)])
      if (!pick || next.size > pick.held.size) pick = { name, held: next }
    }
    if (!pick) break
    seeds.push(pick.name)
    held = pick.held
  }
  return seeds
}

// ─── A reader's board ────────────────────────────────────────────────────────

/** A reader's place in one topic: the connections found (`pairKey`), in the order found. */
export interface CraftProgress {
  found: string[]
}

export const EMPTY_PROGRESS: CraftProgress = { found: [] }

/** A board, as the reader's progress makes it. Names as the graph spells them. */
export interface BoardState {
  /** The concepts in hand, in the order they came: the seeds, then what each find made. */
  held: string[]
  /** The connections found that still hold, in the order found. */
  found: Connection[]
  /** The connection that made each concept that isn't a seed, by lower-cased name. */
  madeFrom: Map<string, Connection>
  /** Concepts made but not yet in any connection found — the new cards. Lower-cased. */
  fresh: Set<string>
}

/**
 * The board a reader's progress makes: start from the seeds, and take each
 * connection found in order — kept only while both its ends are in hand, as
 * they were when it was found — adding what it made.
 */
export function boardState(graph: ConceptGraph, seeds: readonly string[], progress: CraftProgress): BoardState {
  const names = new Map(graph.concepts.map(c => [norm(c), c]))
  const held: string[] = []
  const inHand = new Set<string>()
  const take = (name: string) => {
    const key = norm(name)
    const canon = names.get(key)
    if (!canon || inHand.has(key)) return false
    inHand.add(key)
    held.push(canon)
    return true
  }
  seeds.forEach(take)
  const found: Connection[] = []
  const madeFrom = new Map<string, Connection>()
  const seen = new Set<string>()
  for (const key of progress.found) {
    const c = graph.byKey.get(key)
    if (!c || seen.has(key) || !inHand.has(norm(c.a)) || !inHand.has(norm(c.b))) continue
    seen.add(key)
    found.push(c)
    for (const made of madeBy(graph, c.a, c.b)) if (take(made)) madeFrom.set(norm(made), c)
  }
  const touched = new Set(found.flatMap(c => [norm(c.a), norm(c.b)]))
  const fresh = new Set([...madeFrom.keys()].filter(n => !touched.has(n)))
  return { held, found, madeFrom, fresh }
}

/** Progress with one more connection found. Idempotent. */
export function withConnection(progress: CraftProgress, connection: Pick<Connection, 'a' | 'b'>): CraftProgress {
  const key = pairKey(connection.a, connection.b)
  return progress.found.includes(key) ? progress : { found: [...progress.found, key] }
}

/** What happens when `a` is dropped on `b`. */
export type CombineOutcome =
  /** Nothing in the vault ties the two together. */
  | { kind: 'none' }
  /** Found before: the line between them lights up. */
  | { kind: 'known'; connection: Connection }
  /** A new connection, and the concepts it makes that weren't in hand. */
  | { kind: 'new'; connection: Connection; made: string[] }

export function combine(graph: ConceptGraph, state: BoardState, a: string, b: string): CombineOutcome {
  if (norm(a) === norm(b)) return { kind: 'none' }
  const connection = graph.byKey.get(pairKey(a, b))
  if (!connection) return { kind: 'none' }
  if (state.found.some(c => c.key === connection.key)) return { kind: 'known', connection }
  const inHand = new Set(state.held.map(norm))
  return { kind: 'new', connection, made: madeBy(graph, a, b).filter(n => !inHand.has(norm(n))) }
}

export interface TopicTally {
  held: number
  concepts: number
  found: number
  connections: number
  /** Every connection found. */
  complete: boolean
}

export function topicTally(graph: ConceptGraph, state: BoardState): TopicTally {
  return {
    held: state.held.length,
    concepts: graph.concepts.length,
    found: state.found.length,
    connections: graph.connections.length,
    complete: graph.connections.length > 0 && state.found.length === graph.connections.length,
  }
}

// ─── Practice ────────────────────────────────────────────────────────────────

/** The most questions a connection's practice draws when it falls back on either concept's. */
export const PRACTICE_FALLBACK = 10

/**
 * The questions a connection's **Practice** starts a quiz on: those that test
 * the two concepts together — the connection's own — or, for a connection no
 * question tests, those on either concept, the most focused first (fewest
 * concepts tagged), up to `PRACTICE_FALLBACK`. `pool` is the quiz pool, so
 * nothing a quiz wouldn't serve is offered.
 */
export function practiceQuestions(connection: Pick<Connection, 'a' | 'b' | 'questions'>, pool: readonly GraphQuestion[]): string[] {
  if (connection.questions.length > 0) return [...connection.questions]
  const ends = new Set([norm(connection.a), norm(connection.b)])
  return pool
    .map((q, i) => ({ q, i, tags: new Set(q.links.map(tagName)) }))
    .filter(({ tags }) => [...tags].some(t => ends.has(t)))
    .sort((x, y) => x.tags.size - y.tags.size || x.i - y.i)
    .slice(0, PRACTICE_FALLBACK)
    .map(({ q }) => q.id)
}
