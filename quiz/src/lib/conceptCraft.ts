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
 * with the **seeds** — what nothing in the topic is made from, and no more
 * besides (`seedConcepts`) — and drops one concept on another. Where the vault
 * connects the two, a line is drawn between them carrying its strength, and
 * the connection **makes** what is built from the pair, cause and effect: the
 * concepts whose own pages define them by the two (`madeBy`, the recipes read
 * off the pages in `lib/conceptRecipes.ts`). Play on with what was made, and
 * the whole topic follows.
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
  readPair,
  tagName,
  type ConceptGraph,
  type Connection,
  type GraphQuestion,
  type SyllabusLine,
} from './conceptGraph'
import { buildRecipes, recipesByPair, type Recipe } from './conceptRecipes'
import { examHue } from './examColors'
import { examPageIdFromFile } from './examMenu'
import { examStatus } from './examStatus'
import { wikiExamIdToProgressKey } from './wikiParser'

export { pairKey }
export type { Recipe }

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

/** A topic's graph: how every pair of its concepts is connected, and what each connection makes. */
export function topicGraph(
  topic: Pick<CraftTopic, 'concepts' | 'lines'>,
  page: (name: string) => string | undefined,
  questions: readonly GraphQuestion[],
): CraftGraph {
  return craftGraph(buildConceptGraph({ concepts: topic.concepts, page, questions, lines: topic.lines }), page, questions)
}

// ─── Making concepts ─────────────────────────────────────────────────────────

/** A topic's graph, with what each of its connections makes. */
export interface CraftGraph extends ConceptGraph {
  /** What each connection makes, keyed by `pairKey`, the best explained first (`recipesByPair`). */
  makes: Map<string, Recipe[]>
  /**
   * Where a pair outside `connections` is read from (`connectionFor`) — the
   * pages and the quiz pool. Without it such a pair still connects, on what
   * the graph says about its neighbours alone.
   */
  source?: {
    page: (name: string) => string | undefined
    questions: readonly GraphQuestion[]
  }
}

/** A graph made playable: the recipes its pages give (`lib/conceptRecipes.ts`). */
export function craftGraph(graph: ConceptGraph, page: (name: string) => string | undefined, questions: readonly GraphQuestion[] = []): CraftGraph {
  return { ...graph, makes: recipesByPair(buildRecipes(graph, page)), source: { page, questions } }
}

const norm = (name: string) => name.trim().toLowerCase()
const otherEnd = (c: Connection, name: string) => (norm(c.a) === name ? norm(c.b) : norm(c.a))

// ─── Any pair ────────────────────────────────────────────────────────────────

/**
 * How much a path through one other concept counts toward a pair the notes
 * don't tie directly: the strongest `a — c — b`, its two strengths multiplied
 * (as fractions of 100) and scaled by this. Two strong connections through a
 * shared concept make a faint one; two faint ones make next to nothing.
 */
export const PATH_WEIGHT = 0.5

/** The faintest a connection can be: any two concepts of a syllabus are related somehow. */
export const FLOOR_STRENGTH = 1

const inferredCache = new WeakMap<CraftGraph, Map<string, Connection>>()

/**
 * **The connection between any two concepts on a board.** Every pair connects:
 * the graph's own connection where it has one (`graph.byKey`); otherwise the
 * pair read on its own (`readPair` — the pages and the questions, as the graph
 * reads a topic, with no cut-off), lifted by the strongest path through a
 * concept tied to both (`PATH_WEIGHT`), and never below `FLOOR_STRENGTH`. Such
 * a connection is `inferred`: drawn and scored like any other, it makes
 * nothing. Null for a concept paired with itself or one not on the board.
 * Read once per graph and pair.
 */
export function connectionFor(graph: CraftGraph, a: string, b: string): Connection | null {
  const x = norm(a)
  const y = norm(b)
  if (x === y) return null
  const key = pairKey(a, b)
  const known = graph.byKey.get(key)
  if (known) return known
  let cache = inferredCache.get(graph)
  if (!cache) inferredCache.set(graph, (cache = new Map()))
  const hit = cache.get(key)
  if (hit) return hit
  const names = new Map(graph.concepts.map(c => [norm(c), c]))
  const nameA = names.get(x)
  const nameB = names.get(y)
  if (!nameA || !nameB) return null

  const direct = graph.source
    ? readPair({ a: nameA, b: nameB, ...graph.source, share: n => graph.share.get(norm(n)) ?? 0 })
    : null
  let via: string | undefined
  let path = 0
  for (const c of graph.neighbours.get(x) ?? []) {
    const mid = otherEnd(c, x)
    const onward = graph.byKey.get(pairKey(mid, y))
    if (!onward) continue
    const through = c.strength * onward.strength / 100
    if (through > path) {
      path = through
      via = names.get(mid) ?? mid
    }
  }
  const [first, second] = x < y ? [nameA, nameB] : [nameB, nameA]
  const connection: Connection = {
    ...(direct ?? {
      evidence: { ab: { links: 0, texts: 0, share: 0 }, ba: { links: 0, texts: 0, share: 0 }, questionWeight: 0, lineSize: 0 },
      mentions: [],
      questions: [],
      lines: [],
    }),
    key,
    a: first,
    b: second,
    strength: Math.max(FLOOR_STRENGTH, direct?.strength ?? 0, Math.round(PATH_WEIGHT * path)),
    inferred: true,
    via,
  }
  cache.set(key, connection)
  return connection
}

/** What finding the connection between `a` and `b` makes — whether or not it is already in hand. */
export function madeBy(graph: CraftGraph, a: string, b: string): string[] {
  return (graph.makes.get(pairKey(a, b)) ?? []).map(r => r.makes)
}

/** What a connection makes, each with the words of the page that say why. */
export function recipesOf(graph: CraftGraph, connection: Pick<Connection, 'a' | 'b'>): Recipe[] {
  return graph.makes.get(pairKey(connection.a, connection.b)) ?? []
}

/**
 * Everything that can be made from `held`, by finding every connection
 * between concepts in hand and taking what each makes, until nothing more
 * comes — the most a reader holding `held` could ever reach. Lower-cased; grows
 * `held` in place, starting from the concepts in `from`.
 */
function reach(graph: CraftGraph, held: Set<string>, from: Iterable<string>): Set<string> {
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

/**
 * **The seeds** — the concepts a reader starts with: what nothing in the topic
 * is made from (its building blocks), plus, where some concepts are made only
 * from each other, the fewest that open the circle — and no seed the others
 * can make. Dealt in syllabus order, except that the connected pair with the
 * best-explained recipe comes first, so the first drop on a fresh board makes
 * something, and something it plainly makes.
 *
 * Every concept in the topic can be made from them (`reach`), which is what
 * `conceptCraftVault.test.ts` plays out on every board.
 */
export function seedConcepts(graph: CraftGraph): string[] {
  const order = graph.concepts
  if (order.length === 0) return []
  const index = new Map(order.map((n, i) => [norm(n), i]))
  const at = (n: string) => index.get(norm(n)) ?? order.length
  const reached = (from: readonly string[]) => reach(graph, new Set(from.map(norm)), from.map(norm))

  const makeable = new Set([...graph.makes.values()].flat().map(r => norm(r.makes)))
  let seeds = order.filter(n => !makeable.has(norm(n)))
  let held = reached(seeds)
  // Made only in a circle: deal the concept that brings the most within reach, earliest first.
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
  // None the others make.
  for (const seed of [...seeds].reverse()) {
    const rest = seeds.filter(s => s !== seed)
    if (reached(rest).has(norm(seed))) seeds = rest
  }

  seeds.sort((x, y) => at(x) - at(y))
  let first: { pair: [string, string]; best: number; strength: number } | null = null
  for (let i = 0; i < seeds.length; i++) {
    for (let j = i + 1; j < seeds.length; j++) {
      const c = graph.byKey.get(pairKey(seeds[i], seeds[j]))
      if (!c) continue
      const best = recipesOf(graph, c)[0]?.score ?? 0
      if (!first || best > first.best || (best === first.best && c.strength > first.strength)) {
        first = { pair: [seeds[i], seeds[j]], best, strength: c.strength }
      }
    }
  }
  if (!first) return seeds
  const [p, q] = first.pair
  return [p, q, ...seeds.filter(s => s !== p && s !== q)]
}

// ─── Starter packs ───────────────────────────────────────────────────────────

/**
 * One board's graph, out of the graphs of the **starter packs** a reader has
 * added to it — each pack a topic, its graph and seeds read on their own. The
 * graphs are laid side by side, not re-read together, so every pack keeps the
 * recipes it was dealt for and can still be made in full from its own seeds:
 * a concept two packs share is one card, a pair two packs both connect is one
 * connection (the stronger reading), and what that pair makes is what either
 * pack says it makes.
 */
export function mergeGraphs(graphs: readonly CraftGraph[]): CraftGraph {
  if (graphs.length === 1) return graphs[0]
  const concepts: string[] = []
  const names = new Set<string>()
  const byKey = new Map<string, Connection>()
  const share = new Map<string, number>()
  const makes = new Map<string, Recipe[]>()
  let source: CraftGraph['source']
  for (const g of graphs) {
    for (const c of g.concepts) {
      if (names.has(norm(c))) continue
      names.add(norm(c))
      concepts.push(c)
    }
    for (const c of g.connections) {
      const known = byKey.get(c.key)
      if (!known || c.strength > known.strength) byKey.set(c.key, c)
    }
    for (const [k, v] of g.share) if (!share.has(k)) share.set(k, v)
    source ??= g.source
    for (const [key, recipes] of g.makes) {
      const kept = makes.get(key) ?? []
      for (const r of recipes) if (!kept.some(x => norm(x.makes) === norm(r.makes))) kept.push(r)
      makes.set(key, kept.sort((x, y) => y.score - x.score))
    }
  }
  const connections = [...byKey.values()].sort((x, y) => y.strength - x.strength)
  const neighbours = new Map<string, Connection[]>()
  for (const c of connections) {
    for (const end of [norm(c.a), norm(c.b)]) {
      const list = neighbours.get(end)
      if (list) list.push(c)
      else neighbours.set(end, [c])
    }
  }
  return { concepts, connections, byKey, neighbours, share, makes, source }
}

/** The cards a board deals: each pack's seeds, pack by pack in the order added, none twice. */
export function packSeeds(packs: readonly (readonly string[])[]): string[] {
  const out: string[] = []
  const seen = new Set<string>()
  for (const seeds of packs) {
    for (const s of seeds) {
      if (seen.has(norm(s))) continue
      seen.add(norm(s))
      out.push(s)
    }
  }
  return out
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
export function boardState(graph: CraftGraph, seeds: readonly string[], progress: CraftProgress): BoardState {
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
    const bar = key.indexOf('|')
    const c = graph.byKey.get(key) ?? (bar > 0 ? connectionFor(graph, key.slice(0, bar), key.slice(bar + 1)) : null)
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
  /** A card dropped on itself, or on one not in play. */
  | { kind: 'none' }
  /** Found before: the line between them lights up. */
  | { kind: 'known'; connection: Connection }
  /** A new connection, and the concepts it makes that weren't in hand. */
  | { kind: 'new'; connection: Connection; made: string[] }

export function combine(graph: CraftGraph, state: BoardState, a: string, b: string): CombineOutcome {
  const connection = connectionFor(graph, a, b)
  if (!connection) return { kind: 'none' }
  if (state.found.some(c => c.key === connection.key)) return { kind: 'known', connection }
  const inHand = new Set(state.held.map(norm))
  return { kind: 'new', connection, made: madeBy(graph, a, b).filter(n => !inHand.has(norm(n))) }
}

export interface TopicTally {
  held: number
  concepts: number
  /** The graph's own connections found — the ones the notes tie together. */
  found: number
  connections: number
  /** Every connection found, inferred ones included. */
  links: number
  /** Every one of the graph's own connections found. */
  complete: boolean
}

export function topicTally(graph: ConceptGraph, state: BoardState): TopicTally {
  const found = state.found.filter(c => graph.byKey.has(c.key)).length
  return {
    held: state.held.length,
    concepts: graph.concepts.length,
    found,
    connections: graph.connections.length,
    links: state.found.length,
    complete: graph.connections.length > 0 && found === graph.connections.length,
  }
}

// ─── Score ───────────────────────────────────────────────────────────────────

/**
 * What finding a connection scores: its strength squared over 100, at least 1
 * — so a strong connection is worth far more than a faint one (90 scores 81,
 * 50 scores 25, 20 scores 4). Any pair connects; the score is what says which
 * connections were worth finding, and the medals (`lib/craftMedals.ts`) what
 * share of a board's score is in its best few.
 */
export function connectionPoints(strength: number): number {
  return Math.max(1, Math.round((strength * strength) / 100))
}

/** The board's score: every connection found. Practice scores nothing — it is an ordinary quiz. */
export function craftScore(state: BoardState): number {
  return state.found.reduce((sum, c) => sum + connectionPoints(c.strength), 0)
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
