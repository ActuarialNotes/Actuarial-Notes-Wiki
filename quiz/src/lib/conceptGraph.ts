/**
 * **The concept graph** — how strongly any two concepts of a syllabus topic are
 * connected, read off the vault rather than authored (docs/concept-craft.md).
 *
 * Three kinds of evidence, each one something the vault already says:
 *
 * - **The pages.** A concept page that links to another, or names it in its
 *   text. The sentence it does so in is kept, transcribed with its links
 *   flattened, because it is the page's own account of how the two relate
 *   ("Where no reliable external ELR exists, the Cape Cod technique derives one
 *   from the data instead"). A link is the author's deliberate cross-reference
 *   and counts for more than a name in passing.
 * - **The questions.** Practice questions tagged with both concepts. A question
 *   tagged with two concepts is strong evidence they belong together; one
 *   tagged with eight says less about any one pair, so each question counts
 *   `1 / (tags − 1)` toward a pair.
 * - **The syllabus.** Two concepts named on the same line of an exam page's
 *   learning objectives. A short line ties its concepts together; a laundry
 *   list of twenty ties them loosely, so the weight falls with length.
 *
 * They combine as independent pieces of evidence (a noisy-OR): each lifts the
 * strength toward 100 without any one of them reaching it alone, so a pair the
 * pages link both ways, the questions test together and the syllabus lists
 * together reads in the 80s and 90s, and a pair resting on one name in passing
 * stays faint. `connectionStrength` is the whole formula; `STRENGTH_WEIGHTS`
 * are its weights.
 *
 * Pure: the pages, the questions and the syllabus lines are passed in, so the
 * same function serves the board and its tests.
 */

import { pageBody } from './seo'

/** The order-free key for a pair of concepts — `a + b` and `b + a` are one pair. */
export function pairKey(a: string, b: string): string {
  const [x, y] = [a.trim().toLowerCase(), b.trim().toLowerCase()].sort()
  return `${x}|${y}`
}

// ─── Mentions ────────────────────────────────────────────────────────────────

export interface Mention {
  /** The page the sentence is on. */
  from: string
  /** The concept it mentions. */
  to: string
  /** The sentence, links flattened to their text. Markdown and math are kept. */
  text: string
  /** A `[[link]]`, rather than the concept's name in the page's text. */
  linked: boolean
  /** Running prose — not a callout, a worked example or a table row. */
  prose: boolean
}

/** A link target as a concept name: its last path segment, without `.md` or a `#heading`. */
export function linkTargetName(target: string): string {
  const last = target.split('#')[0].trim().split('/').filter(Boolean).pop() ?? ''
  return last.replace(/\.md$/i, '').trim()
}

interface FlatLine {
  /** The line with its links flattened to their text. */
  text: string
  /** Per character of `text`: plain prose a concept's name can be read in (not a link, math or code). */
  open: boolean[]
  links: { at: number; target: string }[]
}

/**
 * A line of markdown as it reads: `[[target|alias]]` becomes `alias`, an image
 * embed disappears. The links are noted where they land, and every character
 * is marked with whether it is plain text — a concept named inside a link (it
 * is already counted as one), a formula or code is not a mention in passing.
 */
export function flattenLine(line: string): FlatLine {
  let text = ''
  const open: boolean[] = []
  const links: FlatLine['links'] = []
  const push = (s: string, isOpen: boolean) => {
    text += s
    for (let k = 0; k < s.length; k++) open.push(isOpen)
  }
  let i = 0
  while (i < line.length) {
    const embed = line.startsWith('![[', i)
    if (embed || line.startsWith('[[', i)) {
      const start = i + (embed ? 3 : 2)
      const end = line.indexOf(']]', start)
      if (end < 0) {
        push(line.slice(i), true)
        break
      }
      i = end + 2
      if (embed) continue
      const inner = line.slice(start, end)
      const bar = inner.indexOf('|')
      const target = bar >= 0 ? inner.slice(0, bar) : inner
      const shown = bar >= 0 ? inner.slice(bar + 1) : linkTargetName(target)
      links.push({ at: text.length, target })
      push(shown, false)
      continue
    }
    const ch = line[i]
    if (ch === '\\' && i + 1 < line.length) {
      push(line.slice(i, i + 2), true)
      i += 2
      continue
    }
    if (ch === '$' || ch === '`') {
      const fence = ch === '$' && line[i + 1] === '$' ? '$$' : ch
      let end = i + fence.length
      while (end < line.length && !(line.startsWith(fence, end) && line[end - 1] !== '\\')) end++
      const close = Math.min(line.length, end + fence.length)
      push(line.slice(i, close), false)
      i = close
      continue
    }
    push(ch, true)
    i++
  }
  return { text, open, links }
}

const ABBREVIATIONS = new Set(['e.g', 'i.e', 'vs', 'etc', 'cf', 'approx', 'fig', 'no', 'st', 'eq', 'ch', 'sec', 'al'])

/**
 * The sentence of `line` around position `at`: cut at a full stop, question or
 * exclamation mark that ends a sentence — outside `$…$` math, not after an
 * abbreviation, and followed by something that starts one.
 */
export function sentenceAround(line: string, at: number): string {
  const bounds: number[] = []
  let inMath = false
  for (let i = 0; i < line.length; i++) {
    const ch = line[i]
    if (ch === '\\') {
      i++
      continue
    }
    if (ch === '$') {
      inMath = !inMath
      continue
    }
    if (inMath || (ch !== '.' && ch !== '!' && ch !== '?')) continue
    if (!/^\s+[A-Z[*($]/.test(line.slice(i + 1))) continue
    const word = /([A-Za-z.]+)$/.exec(line.slice(0, i))?.[1]?.toLowerCase() ?? ''
    if (ABBREVIATIONS.has(word)) continue
    bounds.push(i + 1)
  }
  const start = [...bounds].reverse().find(b => b <= at) ?? 0
  const end = bounds.find(b => b > at) ?? line.length
  return line.slice(start, end).trim()
}

const MAX_MENTION = 320

function cleanMention(sentence: string): string {
  const flat = sentence.replace(/\s+/g, ' ').trim()
  if (flat.length <= MAX_MENTION) return flat
  // Cut on a word, outside math: an unclosed `$` would render the rest as a formula.
  let cut = flat.slice(0, MAX_MENTION)
  cut = cut.slice(0, Math.max(cut.lastIndexOf(' '), MAX_MENTION / 2))
  if ((cut.replace(/\\\$/g, '').match(/\$/g)?.length ?? 0) % 2 === 1) cut = cut.slice(0, cut.lastIndexOf('$'))
  return `${cut.trim()} …`
}

const WORD = /[\p{L}\p{N}]/u
const PLURAL = /^(es|s)(?![\p{L}\p{N}])/u
const nameKey = (name: string) => name.toLowerCase().replace(/-/g, ' ')

/**
 * The ways a name is written in running text, longest first: itself, the
 * singular of a name in the plural ("Bonds", "Annuities", "Fixed Expenses" —
 * a sentence about one of them says "bond"), and the plural of one ending in
 * a consonant and `y` ("severities"). An `s` or `es` ending is allowed on any
 * form where it is read.
 */
export function nameForms(name: string): string[] {
  const key = nameKey(name)
  if (/ies$/.test(key)) return [key, key.replace(/ies$/, 'y')]
  if (/[^aeiou]y$/.test(key)) return [key.replace(/y$/, 'ies'), key]
  if (/[^s]s$/.test(key)) return [key, key.slice(0, -1)]
  return [key]
}

/**
 * Where `name` is written in `text` as a word of its own — any case, a hyphen
 * for a space, a plural ending allowed — in plain text no longer name has
 * already `taken`. Marks what it finds as taken.
 */
function findName(text: string, lower: string, open: readonly boolean[], taken: boolean[], name: string): number[] {
  const out: number[] = []
  for (const key of nameForms(name)) {
    let from = 0
    while (from <= lower.length - key.length) {
      const at = lower.indexOf(key, from)
      if (at < 0) break
      from = at + 1
      const end = at + key.length + (PLURAL.exec(text.slice(at + key.length, at + key.length + 3))?.[1].length ?? 0)
      if ((at > 0 && WORD.test(text[at - 1])) || (end < text.length && WORD.test(text[end]))) continue
      let free = true
      for (let k = at; k < end && free; k++) free = open[k] && !taken[k]
      if (!free) continue
      for (let k = at; k < end; k++) taken[k] = true
      out.push(at)
      from = end
    }
  }
  return out.sort((x, y) => x - y)
}

/**
 * What a page says about other concepts — every concept it links to, and
 * every one of `names` it writes out in its text — with the sentence each sits
 * in, in page order. Front matter, comments, headings and formula boxes are
 * passed over.
 *
 * Names are read longest first, so "Loss Ratio Method" on a page isn't also a
 * mention of "Loss Ratio"; and the page's own name is never a mention.
 */
export function pageMentions(page: string, markdown: string, names: readonly string[] = []): Mention[] {
  const out: Mention[] = []
  const body = pageBody(markdown)
    .replace(/<!--[\s\S]*?-->/g, '')
    .replace(/%%[\s\S]*?%%/g, '')
  const whole = nameKey(body)
  // Only the names the page writes somewhere are looked for line by line — and
  // its own, so its title can't be read as a shorter concept's name.
  const wanted = [page, ...names.filter(n => n.toLowerCase() !== page.toLowerCase() && nameForms(n).some(f => whole.includes(f)))]
    .sort((x, y) => y.length - x.length)

  for (const raw of body.split('\n')) {
    const quoted = /^\s*>/.test(raw)
    let line = raw.replace(/^(\s*>)+\s?/, '').trim()
    if (!line || /^#{1,6}\s/.test(line) || /^\[!\w+\]/.test(line) || /^\$\$.*\$\$$/.test(line)) continue
    const table = line.startsWith('|')
    line = table ? line.replace(/\|/g, ' ') : line.replace(/^([-*+]|\d+[.)])\s+/, '')
    const flat = flattenLine(line)
    const found: { at: number; to: string; linked: boolean }[] = []
    for (const link of flat.links) {
      const to = linkTargetName(link.target)
      if (to && to.toLowerCase() !== page.toLowerCase()) found.push({ at: link.at, to, linked: true })
    }
    if (wanted.length > 1) {
      const lower = nameKey(flat.text)
      const taken: boolean[] = new Array(flat.text.length).fill(false)
      for (const name of wanted) {
        for (const at of findName(flat.text, lower, flat.open, taken, name)) {
          if (name !== page) found.push({ at, to: name, linked: false })
        }
      }
    }
    found.sort((x, y) => x.at - y.at)
    for (const f of found) {
      out.push({
        from: page,
        to: f.to,
        text: cleanMention(table ? flat.text : sentenceAround(flat.text, f.at)),
        linked: f.linked,
        prose: !quoted && !table,
      })
    }
  }
  return out
}

// ─── Strength ────────────────────────────────────────────────────────────────

export const STRENGTH_WEIGHTS = {
  /** One page linking to the other once… */
  link: 0.4,
  /** …or more than once. */
  links: 0.5,
  /** One page naming the other in its text, without a link — scaled down the more common the name. */
  text: 0.25,
  /** The most the questions can contribute, approached as they pile up… */
  questions: 0.7,
  /** …with this many (weighted) questions getting about two-thirds of the way. */
  questionScale: 3,
  /** Two concepts on one short line of the syllabus. */
  line: 0.35,
  /** A line naming more concepts than this ties each pair on it proportionally less. */
  shortLine: 5,
} as const

/** Below this a pair doesn't count as connected — one question among many tags is noise. */
export const MIN_STRENGTH = 15

/** Where "moderate" and "strong" start, for the board's filter and the card's word. */
export const STRENGTH_TIERS = { moderate: 40, strong: 70 } as const

export type StrengthTier = 'weak' | 'moderate' | 'strong'

export function strengthTier(strength: number): StrengthTier {
  if (strength >= STRENGTH_TIERS.strong) return 'strong'
  if (strength >= STRENGTH_TIERS.moderate) return 'moderate'
  return 'weak'
}

/** What one page says about the other. */
export interface PageEvidence {
  links: number
  /** Times the page names the other without linking it. */
  texts: number
  /**
   * The share of the topic's other pages that name the other concept in their
   * text, 0–1. A name most of them write — *Insurer* across a solvency
   * syllabus, *Variance* through a chapter on regression — is a word of the
   * topic rather than a pointer to the concept, so a mention in passing counts
   * for less the more common the name.
   */
  share: number
}

export interface StrengthEvidence {
  /** The first concept's page about the second… */
  ab: PageEvidence
  /** …and the second's about the first. */
  ba: PageEvidence
  /** Questions tagged with both, each weighted `1 / (tags − 1)`. */
  questionWeight: number
  /** Concepts on the shortest syllabus line naming both — 0 when no line names both. */
  lineSize: number
}

function pageWeight({ links, texts, share }: PageEvidence): number {
  const W = STRENGTH_WEIGHTS
  if (links >= 2) return W.links
  if (links === 1) return W.link
  return texts > 0 ? W.text * (1 - Math.min(1, Math.max(0, share))) : 0
}

/** The measure of a connection, 0–100. */
export function connectionStrength({ ab, ba, questionWeight, lineSize }: StrengthEvidence): number {
  const W = STRENGTH_WEIGHTS
  const questions = questionWeight > 0 ? W.questions * (1 - Math.exp(-questionWeight / W.questionScale)) : 0
  const line = lineSize >= 2 ? W.line * Math.min(1, (W.shortLine - 1) / (lineSize - 1)) : 0
  const apart = (1 - pageWeight(ab)) * (1 - pageWeight(ba)) * (1 - questions) * (1 - line)
  return Math.round(100 * (1 - apart))
}

// ─── The graph ───────────────────────────────────────────────────────────────

export interface Connection {
  key: string
  /** The two concepts, in name order. */
  a: string
  b: string
  /** 0–100. */
  strength: number
  evidence: StrengthEvidence
  /** What each page says about the other, best first: prose before callouts, links before names. */
  mentions: Mention[]
  /** Ids of the practice questions tagged with both. */
  questions: string[]
  /** Syllabus lines naming both, as written. */
  lines: string[]
}

export interface GraphQuestion {
  id: string
  /** The question's raw `wiki_link` tags. */
  links: readonly string[]
}

export interface SyllabusLine {
  text: string
  /** The concepts linked on the line, as their names. */
  concepts: readonly string[]
}

export interface GraphInput {
  /** The concepts in play, in the order the syllabus lists them. */
  concepts: readonly string[]
  /** A concept's page markdown, or undefined when there is none. */
  page: (name: string) => string | undefined
  questions: readonly GraphQuestion[]
  lines: readonly SyllabusLine[]
}

export interface ConceptGraph {
  concepts: string[]
  /** Every connected pair, strongest first. */
  connections: Connection[]
  byKey: Map<string, Connection>
  /** Each concept's connections, strongest first, keyed by lower-cased name. */
  neighbours: Map<string, Connection[]>
}

/**
 * A question tag (`Concepts/Bornhuetter-Ferguson+Method`) as the lower-cased
 * concept name it means — the same reading `filterQuestions` gives it, so a
 * question counted here is one the concept's own question list shows.
 */
export function tagName(link: string): string {
  return linkTargetName(link.replace(/\+/g, ' ')).toLowerCase()
}

const MAX_MENTIONS_KEPT = 3

function mentionRank(m: Mention): number {
  return (m.prose ? 0 : 2) + (m.linked ? 0 : 1)
}

export function buildConceptGraph({ concepts, page, questions, lines }: GraphInput): ConceptGraph {
  const canonical = new Map<string, string>()
  for (const c of concepts) if (!canonical.has(c.toLowerCase())) canonical.set(c.toLowerCase(), c)
  const names = [...canonical.values()]

  interface Acc {
    a: string
    b: string
    ab: PageEvidence
    ba: PageEvidence
    mentions: Mention[]
    questions: string[]
    questionWeight: number
    lineSize: number
    lines: string[]
  }
  const acc = new Map<string, Acc>()
  const entry = (x: string, y: string): Acc | null => {
    if (x.toLowerCase() === y.toLowerCase()) return null
    const key = pairKey(x, y)
    let e = acc.get(key)
    if (!e) {
      const [a, b] = x.toLowerCase() < y.toLowerCase() ? [x, y] : [y, x]
      e = { a, b, ab: { links: 0, texts: 0, share: 0 }, ba: { links: 0, texts: 0, share: 0 }, mentions: [], questions: [], questionWeight: 0, lineSize: 0, lines: [] }
      acc.set(key, e)
    }
    return e
  }

  // What every page says, and how many pages name each concept in passing.
  const said: [string, Mention[]][] = []
  const namedBy = new Map<string, number>()
  for (const from of names) {
    const markdown = page(from)
    if (!markdown) continue
    const mentions = pageMentions(from, markdown, names)
    said.push([from, mentions])
    for (const to of new Set(mentions.filter(m => !m.linked).map(m => m.to.toLowerCase()))) {
      namedBy.set(to, (namedBy.get(to) ?? 0) + 1)
    }
  }
  const share = (name: string) => (said.length > 1 ? (namedBy.get(name.toLowerCase()) ?? 0) / (said.length - 1) : 0)

  for (const [from, mentions] of said) {
    for (const m of mentions) {
      const to = canonical.get(m.to.toLowerCase())
      if (!to) continue
      const e = entry(from, to)
      if (!e) continue
      const side = e.a === from ? e.ab : e.ba
      if (m.linked) side.links++
      else side.texts++
      side.share = share(to)
      e.mentions.push({ ...m, to })
    }
  }

  for (const q of questions) {
    const tags = new Set<string>()
    const all = new Set<string>()
    for (const link of q.links) {
      const name = tagName(link)
      if (!name) continue
      all.add(name)
      const hit = canonical.get(name)
      if (hit) tags.add(hit)
    }
    if (tags.size < 2) continue
    const weight = 1 / (all.size - 1)
    const list = [...tags]
    for (let i = 0; i < list.length; i++) {
      for (let j = i + 1; j < list.length; j++) {
        const e = entry(list[i], list[j])
        if (!e) continue
        e.questions.push(q.id)
        e.questionWeight += weight
      }
    }
  }

  for (const line of lines) {
    const on = [...new Set(line.concepts.map(c => canonical.get(c.toLowerCase())).filter((c): c is string => !!c))]
    if (on.length < 2) continue
    for (let i = 0; i < on.length; i++) {
      for (let j = i + 1; j < on.length; j++) {
        const e = entry(on[i], on[j])
        if (!e) continue
        if (e.lineSize === 0 || on.length < e.lineSize) e.lineSize = on.length
        if (!e.lines.includes(line.text)) e.lines.push(line.text)
      }
    }
  }

  const connections: Connection[] = []
  for (const [key, e] of acc) {
    const evidence: StrengthEvidence = { ab: e.ab, ba: e.ba, questionWeight: e.questionWeight, lineSize: e.lineSize }
    const strength = connectionStrength(evidence)
    if (strength < MIN_STRENGTH) continue
    // The pages' own words, best first, and each page's best sentence before
    // a second from either.
    const ranked = [...e.mentions].sort((x, y) => mentionRank(x) - mentionRank(y))
    const kept = new Set<Mention>()
    const texts = new Set<string>()
    const keep = (m: Mention) => {
      if (kept.size >= MAX_MENTIONS_KEPT || texts.has(m.text)) return
      kept.add(m)
      texts.add(m.text)
    }
    for (const from of [e.a, e.b]) {
      const best = ranked.find(m => m.from === from)
      if (best) keep(best)
    }
    ranked.forEach(keep)
    connections.push({
      key,
      a: e.a,
      b: e.b,
      strength,
      evidence,
      mentions: ranked.filter(m => kept.has(m)),
      questions: [...new Set(e.questions)],
      lines: e.lines,
    })
  }
  connections.sort((x, y) => y.strength - x.strength || x.key.localeCompare(y.key))

  const byKey = new Map(connections.map(c => [c.key, c]))
  const neighbours = new Map<string, Connection[]>()
  for (const c of connections) {
    for (const n of [c.a, c.b]) {
      const list = neighbours.get(n.toLowerCase()) ?? []
      list.push(c)
      neighbours.set(n.toLowerCase(), list)
    }
  }
  return { concepts: names, connections, byKey, neighbours }
}

/** The other end of a connection. */
export function otherEnd(connection: Pick<Connection, 'a' | 'b'>, name: string): string {
  return connection.a.toLowerCase() === name.toLowerCase() ? connection.b : connection.a
}
