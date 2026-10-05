/**
 * **What a connection makes** — Concept Craft's recipes, read off the pages of
 * the concepts they make (docs/concept-craft.md).
 *
 * Finding a connection on a board makes the concepts built *from* its two
 * ends: cause and effect, the way frequency and severity make the pure premium
 * (`Pure Premium = Frequency × Severity`). The vault already says what a
 * concept is built from, where it defines it — a concept page opens on its
 * definition, the formula that defines it and the points under them — so a
 * recipe is read off the page of the concept it makes, never authored:
 *
 * - **Where a name sits.** A concept named in the definition sentence, or on
 *   the right of a formula with the page's own concept on the left, is an
 *   ingredient first; named in the rest of the lead paragraph, second; in the
 *   points under it, last. A clause about what the concept is *for* ("used
 *   to …", "the basis for …"), what it is set *against* ("rather than …",
 *   "unlike …") or what its *instances* are ("such as …") names no ingredient.
 *   A sentence listing half the topic names each concept on it faintly, and a
 *   name the topic's pages write everywhere (*insurer*, *risk*) counts for
 *   less, as it does in the graph.
 * - **Which way it runs.** Nothing is made from its own effects: a concept
 *   whose own definition is built on the page's concept is not one of its
 *   ingredients. And a foundation of the topic — a concept more of its
 *   definitions build on than on either ingredient — is made only by a recipe
 *   its page states plainly (`RECIPES.foundation`), never from parts it
 *   mentions in passing.
 * - **A recipe** is two ingredients the graph connects, at least one of them
 *   named in the definition, the lead or the formula — or both in one short
 *   sentence of the opening. Each concept keeps its best two; a connection
 *   makes at most three concepts, the best explained first and none explained
 *   much worse.
 *
 * A recipe that reads wrong is a page that says the wrong thing about what its
 * concept is made of — fix the page, not the rules.
 *
 * Pure: the pages are passed in.
 */

import { nameForms, pageMentions, pairKey, sentenceAround, type ConceptGraph } from './conceptGraph'
import { leadParagraph, pageBody } from './seo'

export const RECIPES = {
  /** The recipes kept for each concept, best first. */
  perConcept: 2,
  /** The most concepts one connection makes… */
  perPair: 3,
  /** …each explained at least this well, against the best of them — a pair makes what it explains, not what it touches. */
  nearBest: 0.6,
  /** A sentence naming more of the topic's concepts than this is a list, and ties each one loosely. */
  shortSentence: 3,
  /** What an ingredient the page links to, rather than names, adds. */
  link: 0.25,
  /**
   * The score a recipe needs to make a foundation of the topic — a concept more
   * of its definitions build on than on either of the two. That takes both in
   * its definition, or one there and both together in one short sentence.
   */
  foundation: 5,
} as const

/** Where a page names an ingredient — its definition (or defining formula), the rest of its lead, or the points under them. */
export const PLACE = { definition: 3, lead: 2, opening: 1 } as const

export interface Recipe {
  /** The two concepts that make it, in name order (as their `Connection` has them). */
  a: string
  b: string
  /** What they make. */
  makes: string
  /** How well the page of what they make explains it by the two — higher is better. */
  score: number
  /** That page's own words: the sentence or formula naming both, or else the one naming either first. */
  text: string
}

// ─── Reading a page ──────────────────────────────────────────────────────────

/**
 * A clause that names something a concept is *not* made of: what it is used
 * for, what it is set against, its instances, or a pointer elsewhere.
 */
const ASIDE = new RegExp(
  [
    // What it is for.
    String.raw`\bused (?:to|for|in|as|by)\b`,
    String.raw`\bto (?:compute|calculate|estimate|price|set|test|measure|determine|model|describe|assess|analy[sz]e|quantify|predict|forecast|evaluate|monitor)\b`,
    String.raw`\bfor (?:computing|calculating|estimating|pricing|testing)\b`,
    String.raw`\bso that\b`,
    String.raw`\bwhich (?:is|are) (?:then )?used\b`,
    String.raw`\bis the (?:numerator|denominator|basis|input|building block|foundation) (?:of|for)\b`,
    String.raw`\b(?:forming|forms?) the basis\b`,
    String.raw`\bthe basis (?:for|of)\b`,
    String.raw`\b(?:feeds?|underlies|underpins|motivates?|justif(?:y|ies))\b`,
    String.raw`\bfoundational to\b`,
    String.raw`\bthe (?:principal |main )?(?:justification|reason|rationale|motivation) for\b`,
    String.raw`\b(?:supplies|provides|gives) the (?:language|framework|tools?|vocabulary|machinery) (?:of|for)\b`,
    // What it is set against.
    String.raw`\b(?:rather than|as opposed to|instead of|unlike)\b`,
    String.raw`\b(?:in|by) contrast\b`,
    String.raw`\bcompared (?:to|with)\b`,
    String.raw`\b(?:versus|vs\.?)(?=\s)`,
    String.raw`\b(?:differs? from|distinct from|not to be confused)\b`,
    String.raw`\b(?:analogue of|counterpart|alongside)\b`,
    String.raw`\b(?:closely )?related to\b`,
    // Its instances.
    String.raw`\b(?:such as|including)\b`,
    String.raw`\be\.g\.`,
    String.raw`\bfor (?:example|instance)\b`,
    String.raw`\bthe most (?:common|fundamental|important|basic|widely used)\b`,
    String.raw`\bexamples? (?:is|are|include)\b`,
    // A pointer.
    String.raw`^\W*see\b`,
    String.raw`\bsee also\b`,
  ].join('|'),
  'i',
)

/** A sentence up to its first aside — what follows names nothing the concept is made of. */
export function beforeAside(sentence: string): string {
  const hit = ASIDE.exec(sentence)
  return hit ? sentence.slice(0, hit.index) : sentence
}

/** A paragraph as its sentences, in order. */
function sentencesOf(text: string): string[] {
  const out: string[] = []
  let rest = text.trim()
  while (rest) {
    const sentence = sentenceAround(rest, 0)
    if (!sentence) break
    out.push(sentence)
    rest = rest.slice(rest.indexOf(sentence) + sentence.length).trim()
  }
  return out
}

/**
 * A page's opening — its body up to the first heading after some content, the
 * first callout or the first figure — as lines of prose and display formulas
 * (a formula box written over several lines is one formula).
 */
export function pageOpening(markdown: string): { prose: string[]; formulas: string[] } {
  const prose: string[] = []
  const formulas: string[] = []
  const body = pageBody(markdown).replace(/<!--[\s\S]*?-->/g, '').replace(/%%[\s\S]*?%%/g, '')
  let math: string[] | null = null
  let seen = false
  for (const raw of body.split('\n')) {
    const line = raw.replace(/^(\s*>)+\s?/, '').trim()
    if (math) {
      math.push(line)
      if (line.endsWith('$$')) {
        formulas.push(math.join(' '))
        math = null
      }
      continue
    }
    if (!line) continue
    if (/^\[!\w+\]/.test(line)) break
    if (/^#{1,6}\s/.test(line) || /^!\[\[/.test(line)) {
      if (seen) break
      continue
    }
    seen = true
    if (line.startsWith('$$')) {
      if (line.length > 2 && line.endsWith('$$')) formulas.push(line)
      else math = [line]
      continue
    }
    prose.push(line)
  }
  return { prose, formulas }
}

/** The abbreviation a page gives its own name in its lead: `**Present value** (PV) is …`. */
export function abbreviationOf(markdown: string): string | undefined {
  const hit = /^(?:(?:[Tt]he|[Aa]n?)\s+)?\*\*[^*]+\*\*\s*\(([A-Z][A-Za-z0-9&/-]{1,9})[,;)]/.exec(leadParagraph(markdown))
  const abbreviation = hit?.[1]
  return abbreviation && (abbreviation.match(/[A-Z]/g)?.length ?? 0) >= 2 ? abbreviation : undefined
}

const TEX_NAME = /\\(?:text|mathrm|textit|textbf|operatorname)\{([^{}]*)\}/g
const nameKey = (s: string) => s.toLowerCase().replace(/-/g, ' ').replace(/\s+/g, ' ').trim()

/** The concepts a formula names — `\text{Frequency}`, or an abbreviation a page gives its name (`\text{ELR}`). */
function formulaNames(tex: string, names: readonly string[], abbreviations: ReadonlyMap<string, string>): string[] {
  const out: string[] = []
  for (const [, inner] of tex.matchAll(TEX_NAME)) {
    const text = inner.replace(/\\[,;:!]|~/g, ' ').trim()
    const key = nameKey(text)
    const name = names.find(n => nameForms(n).includes(key)) ?? abbreviations.get(text)
    if (name && !out.includes(name)) out.push(name)
  }
  return out
}

/** A concept named on a page's opening. */
export interface Naming {
  /** As the topic spells it. */
  name: string
  /** `PLACE` — where the page names it. */
  place: number
  /** A `[[link]]`, rather than the name written out. */
  linked: boolean
  /** The sentence or formula naming it. */
  text: string
  /** How many of the topic's concepts that sentence or formula names, besides the page's own. */
  among: number
}

/**
 * Every one of `names` a page's opening names, and where — its definition
 * sentence and defining formula, the rest of its lead, the points under them —
 * each sentence read only up to its first aside (`beforeAside`).
 */
export function openingNames(page: string, markdown: string, names: readonly string[], abbreviations: ReadonlyMap<string, string> = new Map()): Naming[] {
  const own = page.toLowerCase()
  const canonical = new Map(names.map(n => [n.toLowerCase(), n]))
  const out: Naming[] = []

  const read = (sentences: readonly string[], place: number) => {
    const mentions = pageMentions(page, sentences.map(beforeAside).filter(s => s.trim()).join('\n'), names)
      .map(m => ({ ...m, to: canonical.get(m.to.toLowerCase()) }))
      .filter((m): m is typeof m & { to: string } => !!m.to && m.to.toLowerCase() !== own)
    const among = new Map<string, Set<string>>()
    for (const m of mentions) among.set(m.text, (among.get(m.text) ?? new Set()).add(m.to.toLowerCase()))
    for (const m of mentions) out.push({ name: m.to, place, linked: m.linked, text: m.text, among: among.get(m.text)!.size })
  }

  const lead = sentencesOf(leadParagraph(markdown))
  read(lead.slice(0, 1), PLACE.definition)
  read(lead.slice(1), PLACE.lead)
  const opening = pageOpening(markdown)
  read(opening.prose.flatMap(sentencesOf), PLACE.opening)

  // A formula with the page's own concept on the left defines it by what is on the right.
  for (const formula of opening.formulas) {
    const eq = formula.indexOf('=')
    if (eq < 0) continue
    const left = formulaNames(formula.slice(0, eq), [...names, page], abbreviations)
    if (!left.some(n => n.toLowerCase() === own)) continue
    const right = formulaNames(formula.slice(eq + 1), names, abbreviations).filter(n => n.toLowerCase() !== own)
    for (const name of right) out.push({ name, place: PLACE.definition, linked: false, text: formula, among: right.length })
  }
  return out
}

// ─── Recipes ─────────────────────────────────────────────────────────────────

interface Ingredient {
  name: string
  /** The most it counts for: its place, cut down for a list or a common name. */
  weight: number
  place: number
  linked: boolean
  /** Each sentence naming it: how specific the sentence is (1 for a short one), and where it sits. */
  texts: Map<string, { specific: number; place: number }>
}

/** 1 for a sentence naming a few concepts; less the longer the list it is. */
function specificity(among: number): number {
  return among <= RECIPES.shortSentence ? 1 : 2 / (among - 1)
}

/**
 * Every concept's best recipes (`RECIPES.perConcept`), read off its page — see
 * the module's comment for the rules. `page` gives a concept's markdown.
 */
export function buildRecipes(graph: ConceptGraph, page: (name: string) => string | undefined): Recipe[] {
  const names = graph.concepts
  const lower = (n: string) => n.toLowerCase()

  const abbreviations = new Map<string, string>()
  for (const n of names) {
    const markdown = page(n)
    const abbreviation = markdown ? abbreviationOf(markdown) : undefined
    if (abbreviation && !abbreviations.has(abbreviation)) abbreviations.set(abbreviation, n)
  }
  const read = new Map<string, Naming[]>()
  for (const n of names) {
    const markdown = page(n)
    read.set(lower(n), markdown ? openingNames(n, markdown, names, abbreviations) : [])
  }
  // What each concept is built from — what its definition, lead or formula
  // names — and how many of the topic's concepts are built from each.
  const builtFrom = new Map<string, Set<string>>()
  for (const [n, namings] of read) builtFrom.set(n, new Set(namings.filter(x => x.place >= PLACE.lead).map(x => lower(x.name))))
  const usage = new Map<string, number>()
  for (const set of builtFrom.values()) for (const x of set) usage.set(x, (usage.get(x) ?? 0) + 1)

  const out: Recipe[] = []
  for (const made of names) {
    const m = lower(made)
    const ingredients = new Map<string, Ingredient>()
    for (const x of read.get(m) ?? []) {
      const k = lower(x.name)
      // An effect of the concept is never one of its causes.
      if (builtFrom.get(k)?.has(m)) continue
      const specific = specificity(x.among)
      const common = x.linked ? 0 : Math.min(0.9, graph.share.get(k) ?? 0)
      const e = ingredients.get(k) ?? { name: x.name, weight: 0, place: 0, linked: false, texts: new Map() }
      e.weight = Math.max(e.weight, x.place * specific * (1 - common))
      e.place = Math.max(e.place, x.place)
      e.linked ||= x.linked
      const seen = e.texts.get(x.text)
      e.texts.set(x.text, { specific: Math.max(specific, seen?.specific ?? 0), place: Math.max(x.place, seen?.place ?? 0) })
      ingredients.set(k, e)
    }

    const keys = [...ingredients.keys()]
    const candidates: Recipe[] = []
    for (let i = 0; i < keys.length; i++) {
      for (let j = i + 1; j < keys.length; j++) {
        const connection = graph.byKey.get(pairKey(keys[i], keys[j]))
        if (!connection) continue
        const A = ingredients.get(keys[i]) as Ingredient
        const B = ingredients.get(keys[j]) as Ingredient
        // The sentence or formula naming both: the most specific, then the most definitional.
        let together = 0
        let togetherPlace = 0
        let both = ''
        for (const [text, at] of A.texts) {
          const other = B.texts.get(text)
          if (!other) continue
          const specific = Math.min(at.specific, other.specific)
          const place = Math.min(at.place, other.place)
          if (specific > together || (specific === together && place > togetherPlace)) {
            together = specific
            togetherPlace = place
            both = text
          }
        }
        // One of the two in the definition, lead or formula — or both in one short sentence.
        if (Math.max(A.place, B.place) < PLACE.lead && together < 1) continue
        const score = A.weight + B.weight + together + (A.linked ? RECIPES.link : 0) + (B.linked ? RECIPES.link : 0) + connection.strength / 1000
        // A foundation of the topic is made only by a recipe its page states plainly.
        const foundation = (usage.get(m) ?? 0) > Math.max(usage.get(keys[i]) ?? 0, usage.get(keys[j]) ?? 0)
        if (foundation && score < RECIPES.foundation) continue
        const text = both || bestText(A, B)
        candidates.push({ a: connection.a, b: connection.b, makes: made, score: Math.round(score * 1000) / 1000, text })
      }
    }
    candidates.sort((x, y) => y.score - x.score || x.a.localeCompare(y.a) || x.b.localeCompare(y.b))
    out.push(...candidates.slice(0, RECIPES.perConcept))
  }
  return out
}

/** The page's words for a recipe naming its two ingredients apart: its most definitional sentence naming either. */
function bestText(...ingredients: Ingredient[]): string {
  let best = ''
  let place = -1
  for (const e of ingredients) {
    for (const [text, at] of e.texts) {
      if (at.place > place) {
        best = text
        place = at.place
      }
    }
  }
  return best
}

/**
 * What each connection makes, keyed by `pairKey`, the best explained first: at
 * most `RECIPES.perPair`, and none explained much worse than the best of them
 * (`RECIPES.nearBest`).
 */
export function recipesByPair(recipes: readonly Recipe[]): Map<string, Recipe[]> {
  const by = new Map<string, Recipe[]>()
  for (const r of recipes) {
    const key = pairKey(r.a, r.b)
    by.set(key, [...(by.get(key) ?? []), r])
  }
  for (const [key, list] of by) {
    const ranked = list.sort((x, y) => y.score - x.score || x.makes.localeCompare(y.makes))
    by.set(key, ranked.filter(r => r.score >= ranked[0].score * RECIPES.nearBest).slice(0, RECIPES.perPair))
  }
  return by
}
