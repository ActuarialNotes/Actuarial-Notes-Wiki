/**
 * **What a connection says** — the relationship between any two concepts in
 * one to five words, read so the line between their cards is a sentence:
 * *Frequency* **multiplies with** *Severity*; *Tail Factor* **completes** the
 * *Cumulative Development Factor* (docs/concept-craft.md, "Relations").
 *
 * Every pair gets one, by the first of these that says something:
 *
 * 1. **Written** — a label written for the pair (`data/craftRelations.json`,
 *    the graph's own connections, written for the board and to be reviewed
 *    like any other vault content).
 * 2. **A recipe** — the pair makes a third concept (`together make …`), or one
 *    is an ingredient of the other (`is a building block of`).
 * 3. **The page's own words** — a sentence of either page naming both, read
 *    for the verb phrase between the two names ("severity is **multiplied
 *    by** frequency", "**a special case of**").
 * 4. **The names** — one name inside the other (*Expected Loss Ratio* **is a
 *    kind of** *Loss Ratio*), or two names with one head (**both are rates**).
 * 5. **What they share** — the recipe both build into, or both are built from.
 * 6. **The evidence** — pages pointing at each other, questions testing both,
 *    a syllabus line naming both.
 * 7. **A path** — the concept tied most strongly to both (`linked through …`).
 * 8. **Where they sit** — the same syllabus section, the same exam, or two.
 *
 * So nothing is left unlabelled, and nothing is invented: every label is
 * either written for the pair or read off what the vault says about it, and
 * `source` says which.
 *
 * Pure: the graph, the written labels and where each concept sits are passed in.
 */

import { nameForms, pairKey, type Connection, type ConceptGraph } from './conceptGraph'
import type { Recipe } from './conceptRecipes'

export type RelationSource =
  | 'written'
  | 'recipe'
  | 'ingredient'
  | 'page'
  | 'name'
  | 'shared'
  | 'evidence'
  | 'path'
  | 'place'

export interface Relation {
  /** The sentence's subject… */
  from: string
  /** …its object. */
  to: string
  /** The verb phrase between them, 1–5 words (a concept named in it counts as one). */
  label: string
  /**
   * Reads the same either way round — `from` and `to` are only an order to
   * print in, and the label is said of both: "Frequency and Severity
   * **together make Pure Premium**".
   */
  symmetric: boolean
  source: RelationSource
}

/** The graph a relation is read against — a topic's or a board's, with what its connections make. */
export interface RelationGraph extends Pick<ConceptGraph, 'concepts' | 'byKey' | 'neighbours'> {
  makes: ReadonlyMap<string, readonly Recipe[]>
}

/**
 * Written labels, keyed by `pairKey`. The value is the label with the
 * direction first: `>` reads from the key's first name to its second, `<` the
 * other way, `=` either way.
 */
export type WrittenRelations = Readonly<Record<string, string>>

/** Where a concept sits on the syllabus: the sections and exams that name it. */
export interface Placement {
  topics: readonly string[]
  exams: readonly string[]
}

export interface RelationOptions {
  written?: WrittenRelations
  placement?: (name: string) => Placement | undefined
}

const norm = (s: string) => s.trim().toLowerCase()

// ─── 1. Written ──────────────────────────────────────────────────────────────

/** A written label for a pair, as a relation between the names the board spells. */
export function writtenRelation(written: WrittenRelations | undefined, a: string, b: string): Relation | null {
  const raw = written?.[pairKey(a, b)]
  if (!raw || raw.length < 2) return null
  const dir = raw[0]
  const label = raw.slice(1).trim()
  if (!label || !'<>='.includes(dir)) return null
  const [first, second] = norm(a) < norm(b) ? [a, b] : [b, a]
  const forward = dir !== '<'
  return { from: forward ? first : second, to: forward ? second : first, label, symmetric: dir === '=', source: 'written' }
}

// ─── 2. Recipes ──────────────────────────────────────────────────────────────

interface RecipeIndex {
  /** Lower-cased concept → the concepts that go into making it. */
  ingredients: Map<string, Set<string>>
  /** Lower-cased concept → what it goes into. */
  uses: Map<string, Set<string>>
}

const recipeIndexes = new WeakMap<object, RecipeIndex>()

function recipeIndex(graph: RelationGraph): RecipeIndex {
  let index = recipeIndexes.get(graph.makes)
  if (!index) {
    index = { ingredients: new Map(), uses: new Map() }
    for (const recipes of graph.makes.values()) {
      for (const r of recipes) {
        const made = norm(r.makes)
        for (const part of [r.a, r.b]) {
          const p = norm(part)
          if (!index.ingredients.has(made)) index.ingredients.set(made, new Set())
          index.ingredients.get(made)!.add(p)
          if (!index.uses.has(p)) index.uses.set(p, new Set())
          index.uses.get(p)!.add(made)
        }
      }
    }
    recipeIndexes.set(graph.makes, index)
  }
  return index
}

// ─── 3. The page's own words ─────────────────────────────────────────────────

/**
 * Words a relation can open with — a verb, a comparison or an operation.
 * Matched on the start of the phrase between the two names.
 */
const OPENERS = /^(is|are|was|were|be|being|equals?|times|multipl|divid|over|plus|minus|less|adjust|estimat|measur|approximat|generali[sz]|extend|replac|uses?\b|used|requir|assum|depend|determin|driv|limit|caps?\b|capped|offset|reduc|increas|produc|yield|giv|impl|follow|deriv|based|built|appl|convert|discount|trend|develop|project|weight|credit|combin|unlike|versus|vs\b|rather|instead|compar|contrast|includ|exclud|contain|cover|defin|test|fit|model|describ|explain|captur|control|mitigat|transfer|ced|report|regulat|govern|supervis|fund|pay|pric|split|allocat|sum|add|subtract|transform|smooth|shrink|pool|blend|bound|exceed|match|net|accumulat|amorti[sz]|invert|inverse|complement|raise|lower|cancel|feed|enter|lead|caus|result|exten|underl|sit|hold|track|reflect)/

/** A phrase that is a whole relation on its own, one word long. */
const SINGLE = /^(times|equals|plus|minus|over|versus|vs|unlike|multiplies|divides|offsets|replaces|exceeds|estimates|adjusts|generalizes|generalises|approximates|caps|limits|includes|excludes|contains|discounts|trends|develops|measures|determines|drives|requires|underlies|complements|funds|regulates|governs|transfers|cedes)$/

/** Words a relation can end on and still lead into the other name: a preposition, or a verb. */
const CLOSERS = /^(of|to|for|in|on|by|with|from|into|than|against|over|under|as|between|behind|within|about|via|through|across|around|per|onto|toward|towards|beyond|without|like|unlike|versus|vs)$|(es|ed|ing)$/

const ARTICLES = /^(?:(?:the|a|an|its|their|each|every|this|that)\s+)+|(?:\s+(?:the|a|an|its|their|each|every))+$/g

/** Plain lower-case text for reading names in: markdown emphasis dropped, a hyphen read as a space. */
function plain(text: string): string {
  return text
    .replace(/\[\[([^\]|]*\|)?([^\]]*)\]\]/g, '$2')
    .replace(/[*_`]/g, '')
    .replace(/-/g, ' ')
    .replace(/\s+/g, ' ')
    .toLowerCase()
}

/** Where a name is written in `text`, as a word of its own — its first place, and where it ends. */
function findIn(text: string, name: string): { at: number; end: number } | null {
  let best: { at: number; end: number } | null = null
  for (const form of nameForms(name)) {
    const re = new RegExp(`(?<![\\p{L}\\p{N}])${form.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')}(?:es|s)?(?![\\p{L}\\p{N}])`, 'u')
    const m = re.exec(text)
    if (m && (!best || m.index < best.at)) best = { at: m.index, end: m.index + m[0].length }
  }
  return best
}

/**
 * The relation a sentence states between two names: the phrase written
 * between them, when it is short (five words or fewer, articles aside), one
 * clause (no comma, colon, bracket, formula, "and" or "or"), and opens with a
 * verb, comparison or operation — "**is a special case of**", "**multiplied
 * by**", "**unlike**". The relation reads from the name written first.
 */
export function phraseBetween(sentence: string, a: string, b: string): Omit<Relation, 'source' | 'symmetric'> | null {
  const text = plain(sentence)
  const pa = findIn(text, a)
  const pb = findIn(text, b)
  if (!pa || !pb) return null
  const [first, second, from, to] = pa.at < pb.at ? [pa, pb, a, b] : [pb, pa, b, a]
  if (second.at < first.end) return null
  let between = text.slice(first.end, second.at).trim()
  if (!between || /[,;:()[\]$=|.!?"“”—–]/.test(between)) return null
  if (/(^|\s)(and|or|which|that|when|if|while|whereas|but|so)(\s|$)/.test(between)) return null
  between = between.replace(ARTICLES, '').trim()
  const words = between.split(' ').filter(Boolean)
  if (words.length === 0 || words.length > 5) return null
  if (!OPENERS.test(between)) return null
  if (words.length === 1 && !SINGLE.test(between)) return null
  // It has to lead into the other name: "is a special case of", not "is the assumption".
  if (words.length > 1 && !CLOSERS.test(words[words.length - 1])) return null
  // A dangling copula says nothing: "is", "are being".
  if (/^(is|are|was|were|be|being)( (is|are|was|were|be|being))*$/.test(between)) return null
  return { from, to, label: between }
}

// ─── 4. The names ────────────────────────────────────────────────────────────

const GENERIC = new Set(['and', 'the', 'for', 'with', 'from', 'into', 'over', 'under', 'of', 'to', 'in', 'on', 'by', 'a', 'an', 'vs', 'non', 'per'])

function singular(word: string): string {
  if (/ies$/.test(word)) return word.replace(/ies$/, 'y')
  if (/(ss|us|is)$/.test(word)) return word
  if (/s$/.test(word) && word.length > 3) return word.slice(0, -1)
  return word
}

/** Heads that name a field or a quantity rather than a kind of thing — "both are probabilities" says nothing. */
const MASS = new Set(['credibility', 'probability', 'data', 'insurance', 'interest', 'regulation', 'theory', 'information', 'value', 'risk', 'inference', 'law', 'analysis'])

function plural(word: string): string {
  if (/is$/.test(word)) return word.replace(/is$/, 'es')
  if (/[^aeiou]y$/.test(word)) return word.replace(/y$/, 'ies')
  if (/(s|x|ch|sh)$/.test(word)) return `${word}es`
  return `${word}s`
}

const wordsOf = (name: string) => plain(name).split(/[^\p{L}\p{N}]+/u).filter(Boolean)

/** What two names say about each other: one inside the other, or a head word in common. */
export function nameRelation(a: string, b: string): Omit<Relation, 'source'> | null {
  const wa = wordsOf(a).map(singular)
  const wb = wordsOf(b).map(singular)
  if (wa.length === 0 || wb.length === 0) return null
  const [short, long, shortName, longName] = wa.length <= wb.length ? [wa, wb, a, b] : [wb, wa, b, a]
  if (short.length < long.length) {
    for (let i = 0; i + short.length <= long.length; i++) {
      if (short.every((w, k) => long[i + k] === w)) {
        // "Expected Loss Ratio" ends on "Loss Ratio": one is a kind of the other.
        const kind = i + short.length === long.length
        return { from: longName, to: shortName, label: kind ? 'is a kind of' : 'is built around', symmetric: false }
      }
    }
  }
  // A name's head is its last word — or, for "Complement of Credibility", the word before "of".
  const head = (w: string[]) => (w.indexOf('of') > 0 ? w[w.indexOf('of') - 1] : w[w.length - 1])
  const headA = head(wa)
  const headB = head(wb)
  if (headA === headB && headA.length > 2 && !GENERIC.has(headA) && !MASS.has(headA)) {
    return { from: a, to: b, label: `both are ${plural(headA)}`, symmetric: true }
  }
  return null
}

/** A word both names use (not a small word), as "both involve …". */
function sharedWord(a: string, b: string): string | null {
  const wb = new Set(wordsOf(b).map(singular))
  return wordsOf(a).map(singular).find(w => w.length > 3 && !GENERIC.has(w) && wb.has(w)) ?? null
}

// ─── The relation ────────────────────────────────────────────────────────────

/**
 * The relation between the two ends of a connection, by the first of the
 * eight readings (module comment) that says something. Names as the graph
 * spells them.
 */
export function relationOf(graph: RelationGraph, connection: Pick<Connection, 'a' | 'b' | 'key' | 'mentions' | 'evidence' | 'questions' | 'lines' | 'via'>, options: RelationOptions = {}): Relation {
  const { a, b } = connection
  const x = norm(a)
  const y = norm(b)
  const names = new Map(graph.concepts.map(c => [norm(c), c]))
  const name = (n: string) => names.get(norm(n)) ?? n

  const written = writtenRelation(options.written, a, b)
  if (written) return written

  // 2. Recipes.
  const makes = graph.makes.get(connection.key)?.[0]
  if (makes) return { from: a, to: b, label: `together make ${name(makes.makes)}`, symmetric: true, source: 'recipe' }
  const index = recipeIndex(graph)
  if (index.ingredients.get(y)?.has(x)) return { from: a, to: b, label: 'is a building block of', symmetric: false, source: 'ingredient' }
  if (index.ingredients.get(x)?.has(y)) return { from: b, to: a, label: 'is a building block of', symmetric: false, source: 'ingredient' }

  // 3. The pages' own words, best sentence first.
  for (const m of connection.mentions) {
    const said = phraseBetween(m.text, a, b)
    if (said) return { ...said, symmetric: false, source: 'page' }
  }

  // 4. The names: one inside the other.
  const named = nameRelation(a, b)
  if (named && !named.symmetric) return { ...named, source: 'name' }

  // 5. What they share in the recipes.
  const usesA = index.uses.get(x)
  const together = usesA && [...(index.uses.get(y) ?? [])].find(m => usesA.has(m))
  if (together) return { from: a, to: b, label: `both help build ${name(together)}`, symmetric: true, source: 'shared' }
  const fromA = index.ingredients.get(x)
  const common = fromA && [...(index.ingredients.get(y) ?? [])].find(m => fromA.has(m))
  if (common) return { from: a, to: b, label: `both built from ${name(common)}`, symmetric: true, source: 'shared' }

  // 4b. A head word in common.
  if (named) return { ...named, source: 'name' }

  // 6. The evidence.
  const { ab, ba } = connection.evidence
  const pointsAB = ab.links + ab.texts > 0
  const pointsBA = ba.links + ba.texts > 0
  if (ab.links > 0 && ba.links > 0) return { from: a, to: b, label: 'cross-reference each other', symmetric: true, source: 'evidence' }
  if (connection.questions.length > 1) return { from: a, to: b, label: 'are tested together', symmetric: true, source: 'evidence' }
  if (pointsAB || pointsBA) {
    const [from, to] = (ab.links > ba.links || (ab.links === ba.links && pointsAB)) ? [a, b] : [b, a]
    return { from, to, label: 'draws on', symmetric: false, source: 'evidence' }
  }
  if (connection.questions.length === 1) return { from: a, to: b, label: 'are tested together', symmetric: true, source: 'evidence' }
  if (connection.lines.length > 0) return { from: a, to: b, label: 'share a syllabus line', symmetric: true, source: 'evidence' }

  // 7. A path through a third concept.
  const via = connection.via ?? strongestBetween(graph, x, y)
  if (via) return { from: a, to: b, label: `linked through ${name(via)}`, symmetric: true, source: 'path' }

  const word = sharedWord(a, b)
  if (word) return { from: a, to: b, label: `both involve ${word}`, symmetric: true, source: 'name' }

  // 8. Where they sit.
  const pa = options.placement?.(a)
  const pb = options.placement?.(b)
  if (pa && pb) {
    if (pa.topics.some(t => pb.topics.includes(t))) return { from: a, to: b, label: 'share a syllabus section', symmetric: true, source: 'place' }
    const exam = pa.exams.find(e => pb.exams.includes(e))
    if (exam) return { from: a, to: b, label: `both on ${exam}`, symmetric: true, source: 'place' }
    if (pa.exams[0] && pb.exams[0]) return { from: a, to: b, label: `bridge ${pa.exams[0]} and ${pb.exams[0]}`, symmetric: true, source: 'place' }
  }
  return { from: a, to: b, label: 'share the actuarial syllabus', symmetric: true, source: 'place' }
}

/** The concept tied most strongly to both, by the product of its two strengths. */
function strongestBetween(graph: RelationGraph, x: string, y: string): string | null {
  let best: { name: string; score: number } | null = null
  for (const c of graph.neighbours.get(x) ?? []) {
    const mid = norm(c.a) === x ? c.b : c.a
    const onward = graph.byKey.get(pairKey(mid, y))
    if (!onward) continue
    const score = c.strength * onward.strength
    if (!best || score > best.score) best = { name: mid, score }
  }
  return best?.name ?? null
}

/**
 * A relation as a sentence: "Frequency multiplies with Severity", or for one
 * said of both, "Frequency and Severity together make Pure Premium".
 */
export function relationSentence(relation: Pick<Relation, 'from' | 'to' | 'label' | 'symmetric'>): string {
  return relation.symmetric
    ? `${relation.from} and ${relation.to} ${relation.label}`
    : `${relation.from} ${relation.label} ${relation.to}`
}
