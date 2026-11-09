// **Quiz Battle topics** — what an online battle is played on.
//
// A topic is a concept: one the exam's battle questions test, under the name
// its mastery and its flashcard are filed under. This module is the topics an
// exam's pool offers, grouped the way the flashcard picker lays an exam out —
// under the syllabus's learning objectives. The draft played with them (draw
// four, strike one, the deal to pairs) is lib/battleDraft.ts. Pure and tested.

import { slugForLink } from './conceptMatch'
import { objectiveKey, type Question } from './parser'

/** How long the players have to draw their hands. */
export const TOPIC_PICK_MS = 30_000

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
