// Practice's home, as data (docs/redesign-spec.md §7a): which exam the page
// opens on, what the quiz card's four setting pills say, each topic's question
// count for the setup sheet, and the past papers as the rows the Papers screen
// draws. What a quiz holds and where it launches is still lib/quizBuilder.ts.

import type { Difficulty } from './parser'
import { difficultySummary, questionsWord } from './quizSetup'
import { linkedConcept } from './quizBuilder'
import type { PastExamRow } from './pastExams'

// ── The exam the page opens on ───────────────────────────────────────────────

/** Where the exam a visitor last practised is kept (a reader's is Today's). */
export const PRACTICE_EXAM_KEY = 'actuarial_practice_exam'

/**
 * The exam Practice shows, as a bank label ('' = the exam list).
 *
 * The address wins: `?topic=` is one exam's screen and `?exams=1` the list.
 * With neither, the page opens on the exam in focus — the one Today shows for
 * a reader studying an exam with a question bank, else the one last practised
 * in this browser — and on the list when there is none.
 */
export function practiceTopic(input: {
  urlTopic: string
  showList: boolean
  /** Today's exam, as a bank label; '' when the reader studies none with a bank. */
  focus: string
  /** The exam last opened here, from `PRACTICE_EXAM_KEY`. */
  remembered: string
  /** Whether a label is an exam the builder offers. */
  offered: (label: string) => boolean
}): string {
  const { urlTopic, showList, focus, remembered, offered } = input
  if (urlTopic) return urlTopic
  if (showList) return ''
  if (focus && offered(focus)) return focus
  if (remembered && offered(remembered)) return remembered
  return ''
}

// ── The quiz card's pills ────────────────────────────────────────────────────

/** A setting pill's section of the setup sheet. */
export type PillSection = 'topics' | 'difficulty' | 'sitting'

export interface SettingPill {
  id: 'topics' | 'levels' | 'timed' | 'reveal'
  /** What the pill says: the setting's current value. */
  value: string
  /** The setting's name, for a screen reader: "Topics: All topics". */
  name: string
  section: PillSection
}

/**
 * The card's four pills, each the current value of one setting (R16): the
 * topics, the difficulty levels, the timer and when the answers show.
 */
export function settingPills(input: {
  /** `topicPills`' labels and overflow, or one concept's name. */
  topics: { labels: readonly string[]; more: number }
  levels: readonly Difficulty[]
  timed: boolean
  revealDuring: boolean
}): SettingPill[] {
  const { topics, levels, timed, revealDuring } = input
  const picked = topics.labels.length + topics.more
  const topicValue = picked === 1 ? topics.labels[0] : `${picked} topics`
  return [
    { id: 'topics', value: topicValue, name: `Topics: ${topicValue}`, section: 'topics' },
    { id: 'levels', value: difficultySummary(levels), name: `Difficulty: ${difficultySummary(levels)}`, section: 'difficulty' },
    { id: 'timed', value: timed ? 'Timed' : 'Untimed', name: timed ? 'Timed' : 'Untimed', section: 'sitting' },
    {
      id: 'reveal',
      value: revealDuring ? 'As you go' : 'At the end',
      name: revealDuring ? 'Answers shown as you go' : 'Answers shown at the end',
      section: 'sitting',
    },
  ]
}

/** A time as a row prints it: "3 h", "45 min", "1 h 15 min". No "~": the paper's own length. */
export function rowDuration(seconds: number): string {
  const minutes = Math.max(1, Math.round(seconds / 60))
  if (minutes < 60) return `${minutes} min`
  const hours = Math.floor(minutes / 60)
  const rest = minutes % 60
  return rest === 0 ? `${hours} h` : `${hours} h ${rest} min`
}

/** The Practice Exam row's facts: "30 questions · 3 h". */
export function practiceExamDetail(count: number, seconds: number | null): string {
  const size = `${count} ${questionsWord(count)}`
  return seconds === null ? size : `${size} · ${rowDuration(seconds)}`
}

// ── The setup sheet's topics ─────────────────────────────────────────────────

/**
 * How many of `pool`'s questions each topic holds: a question counts once in
 * every topic one of its concepts sits under.
 */
export function topicQuestionCounts(
  groups: readonly { name: string; subtopics: readonly string[] }[],
  pool: readonly { wiki_link?: readonly string[] | null }[],
): Map<string, number> {
  const topicOf = new Map<string, string[]>()
  for (const g of groups) {
    for (const s of g.subtopics) {
      const key = s.toLowerCase()
      topicOf.set(key, [...(topicOf.get(key) ?? []), g.name])
    }
  }
  const counts = new Map<string, number>(groups.map(g => [g.name, 0]))
  for (const q of pool) {
    const hit = new Set<string>()
    for (const link of q.wiki_link ?? []) {
      for (const name of topicOf.get(linkedConcept(link).toLowerCase()) ?? []) hit.add(name)
    }
    for (const name of hit) counts.set(name, (counts.get(name) ?? 0) + 1)
  }
  return counts
}

/** A topic's tick: every concept picked, some, or none. Nothing picked at all means every topic is in. */
export function topicTick(
  subtopics: readonly string[],
  selected: readonly string[],
): 'all' | 'some' | 'none' {
  if (selected.length === 0) return 'all'
  const picked = subtopics.filter(s => selected.includes(s)).length
  if (picked === 0) return 'none'
  return picked === subtopics.length ? 'all' : 'some'
}

/**
 * Tick or untick a whole topic. With nothing picked every topic is in, so
 * unticking one picks all the others; a selection that comes to every topic,
 * or to none, is stored as nothing picked.
 */
export function toggleTopic(
  groups: readonly { name: string; subtopics: readonly string[] }[],
  selected: readonly string[],
  name: string,
): string[] {
  const group = groups.find(g => g.name === name)
  if (!group) return [...selected]
  const everything = [...new Set(groups.flatMap(g => g.subtopics))]
  const current = new Set(selected.length === 0 ? everything : selected)
  const on = group.subtopics.every(s => current.has(s))
  // A concept two topics share stays while the other topic is still ticked.
  const kept = new Set(
    groups.filter(g => g.name !== name && g.subtopics.every(s => current.has(s))).flatMap(g => g.subtopics),
  )
  for (const s of group.subtopics) {
    if (!on) current.add(s)
    else if (!kept.has(s)) current.delete(s)
  }
  const next = everything.filter(s => current.has(s))
  return next.length === everything.length ? [] : next
}

/**
 * Tick or untick one concept under a topic, by the same rule: out of nothing
 * picked, unticking one picks all the others.
 */
export function toggleTopicConcept(
  groups: readonly { subtopics: readonly string[] }[],
  selected: readonly string[],
  concept: string,
): string[] {
  const everything = [...new Set(groups.flatMap(g => g.subtopics))]
  const current = new Set(selected.length === 0 ? everything : selected)
  if (current.has(concept)) current.delete(concept)
  else current.add(concept)
  const next = [...everything.filter(s => current.has(s)), ...selected.filter(s => !everything.includes(s) && current.has(s))]
  return next.length >= everything.length && everything.every(s => current.has(s)) ? [] : next
}

// ── Past papers ──────────────────────────────────────────────────────────────

/** How many sittings the Papers screen lists before folding the older ones. */
export const PAPERS_SHOWN = 8

export interface PaperFold {
  /** The newest sittings, drawn as rows. */
  recent: PastExamRow[]
  /** The older ones, under one row. */
  older: PastExamRow[]
  /** The fold's name: "2011 to 2015", or the one year. */
  olderLabel: string
}

/**
 * The shelf cut for the screen: the newest sittings as rows and the rest under
 * one row named for the years it spans. A year is never split across the cut,
 * and a fold of one or two sittings isn't worth a row, so those stay listed.
 */
export function foldPapers(rows: readonly PastExamRow[], shown = PAPERS_SHOWN): PaperFold {
  if (rows.length <= shown + 2) return { recent: [...rows], older: [], olderLabel: '' }
  let cut = shown
  while (cut < rows.length && rows[cut].year === rows[cut - 1].year) cut++
  const older = rows.slice(cut)
  if (older.length <= 2) return { recent: [...rows], older: [], olderLabel: '' }
  const years = older.map(r => r.year)
  const lo = Math.min(...years)
  const hi = Math.max(...years)
  return { recent: rows.slice(0, cut), older, olderLabel: lo === hi ? String(lo) : `${lo} to ${hi}` }
}

/** The Past papers row's fact on Practice's home: "18 papers". */
export function papersCountDetail(rows: readonly PastExamRow[]): string {
  const added = rows.filter(r => r.available).length
  const n = added > 0 ? added : rows.length
  return `${n} ${n === 1 ? 'paper' : 'papers'}`
}
