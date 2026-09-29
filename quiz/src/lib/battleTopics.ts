// **Quiz Battle topics** — what an online battle is played on.
//
// Before the first question each player picks up to `MAX_TOPICS` topics from
// the exam — the concepts its battle questions test — in `TOPIC_PICK_MS` or
// until both have locked in. Neither sees the other's picks until then. Then
// both picks are laid out and the battle's questions are drawn from them, one
// at a time, the two players' topics taking turns, before the count-in to the
// first question as usual.
//
// This module is that as data: the topics an exam's pool offers (grouped the
// way the flashcard picker lays an exam out — under the syllabus's learning
// objectives), the rules a pick is held to, the draw, and the one clock both
// devices draw the reveal to. The draft travels in the room (lib/battleRoom.ts)
// and the host runs it (lib/battleSession.ts). Pure and tested.

import { slugForLink } from './conceptMatch'
import { objectiveKey, type Question } from './parser'
import { drawByDifficulty, type DifficultyTarget } from './quizDifficulty'
import { otherSeat, type Seat } from './battle'

// ── The rules, as numbers ───────────────────────────────────────────────────

/** The most topics a player may pick. */
export const MAX_TOPICS = 3
/** How long the players have to pick. */
export const TOPIC_PICK_MS = 30_000
/** Both players' picks on screen before the first question is drawn. */
export const TOPIC_REVEAL_MS = 1800
/** From one question drawn to the next. */
export const DRAW_STEP_MS = 650
/** The whole draw on screen before the count-in to the first question. */
export const DRAW_HOLD_MS = 1500

/** How long the reveal and the draw of `count` questions take, start to finish. */
export function drawDurationMs(count: number): number {
  return TOPIC_REVEAL_MS + Math.max(0, count) * DRAW_STEP_MS + DRAW_HOLD_MS
}

/** How many of `count` drawn questions are on the table `elapsedMs` into the draw. */
export function drawnSoFar(count: number, elapsedMs: number): number {
  if (elapsedMs < TOPIC_REVEAL_MS) return 0
  return Math.min(count, Math.floor((elapsedMs - TOPIC_REVEAL_MS) / DRAW_STEP_MS) + 1)
}

// ── The topics an exam offers ───────────────────────────────────────────────

export interface BattleTopic {
  /** The concept's name — the key its mastery and its flashcard are filed under. */
  name: string
  /** How many battle questions test it. */
  questions: number
}

export interface TopicGroup {
  /** The learning objective the topics sit under. */
  title: string
  topics: BattleTopic[]
}

/**
 * The concepts a question tests, by the name its mastery is kept under
 * (`slugForLink`, the same resolution a quiz records answers with), each once.
 */
export function questionTopics(q: Pick<Question, 'wiki_link'>): string[] {
  const seen = new Map<string, string>()
  for (const link of q.wiki_link) {
    const name = slugForLink(link)?.trim()
    if (name && !seen.has(name.toLowerCase())) seen.set(name.toLowerCase(), name)
  }
  return [...seen.values()]
}

/** The part of an exam page the catalogue is ordered by. */
export interface TopicSyllabus {
  topics: readonly { name: string; concepts: readonly { name: string }[] }[]
}

/**
 * Every topic a battle on this pool can be played on, grouped under the
 * learning objectives. With the exam's syllabus, the groups and the topics in
 * them follow the syllabus's order, as they do in the flashcard picker; a
 * topic the syllabus doesn't list goes under the objective most of its
 * questions name, after the listed ones, the best-stocked first.
 */
export function topicCatalogue(pool: readonly Question[], syllabus?: TopicSyllabus | null): TopicGroup[] {
  const topics = new Map<string, { name: string; questions: number; votes: Map<string, { title: string; n: number }> }>()
  for (const q of pool) {
    const objective = q.learning_objective.trim()
    for (const name of questionTopics(q)) {
      const key = name.toLowerCase()
      const entry = topics.get(key) ?? { name, questions: 0, votes: new Map() }
      entry.questions += 1
      if (objective) {
        const vote = entry.votes.get(objectiveKey(objective)) ?? { title: objective, n: 0 }
        vote.n += 1
        entry.votes.set(objectiveKey(objective), vote)
      }
      topics.set(key, entry)
    }
  }

  // Where the syllabus puts each objective, and each concept (its first listing).
  const groups = new Map<string, { title: string; order: number; topics: { topic: BattleTopic; rank: number }[] }>()
  const listed = new Map<string, { group: string; rank: number }>()
  syllabus?.topics.forEach((section, order) => {
    const key = objectiveKey(section.name)
    if (!groups.has(key)) groups.set(key, { title: section.name, order, topics: [] })
    section.concepts.forEach((concept, rank) => {
      const name = concept.name.toLowerCase()
      if (!listed.has(name)) listed.set(name, { group: key, rank })
    })
  })

  const unplaced = { title: 'More topics', order: Infinity, topics: [] as { topic: BattleTopic; rank: number }[] }
  for (const [key, entry] of topics) {
    const topic = { name: entry.name, questions: entry.questions }
    const place = listed.get(key)
    if (place) {
      groups.get(place.group)!.topics.push({ topic, rank: place.rank })
      continue
    }
    const vote = [...entry.votes.entries()].sort((a, b) => b[1].n - a[1].n || a[0].localeCompare(b[0]))[0]
    if (!vote) {
      unplaced.topics.push({ topic, rank: Infinity })
      continue
    }
    const [objective, { title }] = vote
    if (!groups.has(objective)) groups.set(objective, { title, order: Infinity, topics: [] })
    groups.get(objective)!.topics.push({ topic, rank: Infinity })
  }

  const total = (g: { topics: { topic: BattleTopic }[] }) => g.topics.reduce((n, t) => n + t.topic.questions, 0)
  return [...groups.values(), unplaced]
    .filter(g => g.topics.length > 0)
    .sort((a, b) => a.order - b.order || total(b) - total(a) || a.title.localeCompare(b.title))
    .map(g => ({
      title: g.title,
      topics: g.topics
        .sort((a, b) => a.rank - b.rank || b.topic.questions - a.topic.questions || a.topic.name.localeCompare(b.topic.name))
        .map(t => t.topic),
    }))
}

/** Every topic in a catalogue, once, in its order. */
export function catalogueTopics(catalogue: readonly TopicGroup[]): BattleTopic[] {
  return catalogue.flatMap(g => g.topics)
}

// ── A pick ──────────────────────────────────────────────────────────────────

/**
 * A pick as the host takes it: only topics the exam offers, in their own
 * spelling, each once, at most `MAX_TOPICS` of them, in the order chosen. What
 * arrives from the other device is whatever it sent, so nothing is assumed.
 */
export function cleanTopicPick(raw: readonly unknown[], offered: readonly string[]): string[] {
  const byKey = new Map(offered.map(name => [name.toLowerCase(), name]))
  const out: string[] = []
  for (const value of raw) {
    if (typeof value !== 'string') continue
    const name = byKey.get(value.trim().toLowerCase())
    if (name && !out.includes(name)) out.push(name)
    if (out.length === MAX_TOPICS) break
  }
  return out
}

/** A player's choice with `topic` switched on or off — never past `MAX_TOPICS`. */
export function toggleTopic(chosen: readonly string[], topic: string): string[] {
  const at = chosen.findIndex(t => t.toLowerCase() === topic.toLowerCase())
  if (at >= 0) return chosen.filter((_, i) => i !== at)
  return chosen.length >= MAX_TOPICS ? [...chosen] : [...chosen, topic]
}

/** Who picked a topic: one seat, both, or (a question drawn from the whole exam) neither. */
export function topicPickers(picks: readonly [readonly string[] | null, readonly string[] | null], topic: string | null): Seat[] {
  if (topic === null) return []
  const key = topic.toLowerCase()
  return ([0, 1] as const).filter(seat => picks[seat]?.some(t => t.toLowerCase() === key))
}

// ── The draw ────────────────────────────────────────────────────────────────

export interface DrawnQuestion<Q> {
  question: Q
  /** The topic it was drawn for — null when neither pick had a question left and it came from the whole exam. */
  topic: string | null
}

/**
 * The battle's questions, drawn from both players' picks. The two players
 * take turns — a coin toss says who goes first — and each works through their
 * own topics in the order they picked them, so every pick is played before
 * any is played twice. A topic with nothing left hands its turn to the
 * player's next topic, then to the other player's; with nothing left in
 * either pick (or nothing picked at all), a question comes from the whole
 * exam. Within a topic the draw leans toward `difficulty`, as the rest of a
 * battle's does. Never the same question twice.
 */
export function drawFromTopics<Q extends Pick<Question, 'id' | 'wiki_link' | 'difficulty'>>(
  pool: readonly Q[],
  picks: readonly [readonly string[], readonly string[]],
  rounds: number,
  difficulty: DifficultyTarget,
  random: () => number = Math.random,
): DrawnQuestion<Q>[] {
  const used = new Set<string>()
  const topicsOf = new Map(pool.map(q => [q.id, new Set(questionTopics(q).map(t => t.toLowerCase()))]))
  const cursor: [number, number] = [0, 0]

  const pickOne = (candidates: Q[]): Q | null =>
    candidates.length === 0 ? null : drawByDifficulty(candidates, 1, difficulty, random)[0] ?? null

  const forSeat = (seat: Seat): DrawnQuestion<Q> | null => {
    const topics = picks[seat]
    for (let k = 0; k < topics.length; k++) {
      const at = (cursor[seat] + k) % topics.length
      const topic = topics[at]
      const key = topic.toLowerCase()
      const question = pickOne(pool.filter(q => !used.has(q.id) && topicsOf.get(q.id)?.has(key)))
      if (!question) continue
      cursor[seat] = (at + 1) % topics.length
      return { question, topic }
    }
    return null
  }

  const out: DrawnQuestion<Q>[] = []
  let seat: Seat = random() < 0.5 ? 0 : 1
  for (let i = 0; i < rounds; i++) {
    const drawn = forSeat(seat) ?? forSeat(otherSeat(seat)) ?? (() => {
      const question = pickOne(pool.filter(q => !used.has(q.id)))
      return question ? { question, topic: null } : null
    })()
    if (!drawn) break
    used.add(drawn.question.id)
    out.push(drawn)
    seat = otherSeat(seat)
  }
  return out
}

// ── The draft, as it travels ────────────────────────────────────────────────

export type DraftPhase = 'picking' | 'drawing'

/**
 * The topic pick and the draw, as the room carries them. The host holds the
 * true copy; each device sees it redacted (`redactDraft`) and on its own clock
 * (`shiftDraftClock`).
 */
export interface BattleDraft {
  /** Which battle in the room this is — a pick sent for an earlier one is stale. */
  game: number
  phase: DraftPhase
  /** Picking: when the picks close. Drawing: when the count-in to the first question starts. */
  deadline: number
  /** Each player's locked-in topics, null while they are still choosing. */
  picks: [string[] | null, string[] | null]
  /** Drawing: the questions drawn, in the order they'll be played, each with its topic. */
  drawn: { id: string; topic: string | null }[]
}

/**
 * The draft as `viewer` may see it: while the picks are open, the other
 * player's shows as locked in (an empty list) and no more — the picks are
 * shown to both at once, when the draw begins.
 */
export function redactDraft(draft: BattleDraft, viewer: Seat): BattleDraft {
  if (draft.phase !== 'picking') return draft
  const hidden = otherSeat(viewer)
  if (!draft.picks[hidden] || draft.picks[hidden]!.length === 0) return draft
  const picks: [string[] | null, string[] | null] = [...draft.picks]
  picks[hidden] = []
  return { ...draft, picks }
}

/** The same draft on another clock (see `shiftClock` in lib/battle.ts). */
export function shiftDraftClock(draft: BattleDraft, deltaMs: number): BattleDraft {
  return deltaMs === 0 ? draft : { ...draft, deadline: draft.deadline + deltaMs }
}

/** When the draw began, on the draft's clock. */
export function drawStartedAt(draft: BattleDraft): number {
  return draft.deadline - drawDurationMs(draft.drawn.length)
}
