/**
 * **Concept Craft** — the rules of the game, as data and pure functions
 * (docs/concept-craft.md).
 *
 * A module is a recipe book over one part of a syllabus: a few **primitive**
 * concepts the reader starts with, and **recipes** — two concepts that,
 * combined, make a third, joined by a named **relation** ("multiplied by",
 * "credibility-weighted with"). Crafting is non-destructive: the two
 * ingredients stay on the board, an edge joins them carrying the relation, and
 * the result hangs off that edge. Every node is a vault concept page, so the
 * inspector, the action menu and the reader are the ones the rest of the app
 * uses.
 *
 * A reader's progress in a module is the list of recipes they have found —
 * nothing else. Which concepts they hold follows from it (`availableNodes`):
 * the primitives, any ingredient a milestone has introduced, and the result of
 * every recipe found. Keeping the record that small is what makes it safe to
 * store as ids and re-derive against a recipe book that has since grown.
 *
 * Nothing here touches the DOM, storage or the clock: the date and the random
 * source are passed in, so the daily challenge and the quiz's option order are
 * reproducible in a test.
 */

import { leadParagraph, pageBody } from './seo'
import { cleanWikiLinks } from './wikiParser'

/** How two concepts combine — the tag on the edge between them. */
export type CraftRelationId =
  | 'times'
  | 'over'
  | 'plus'
  | 'minus'
  | 'weighted'
  | 'compared'
  | 'estimatedFrom'
  | 'restricted'
  | 'constrained'
  | 'partitioning'
  | 'unaffected'
  | 'compounded'
  | 'summed'
  | 'limit'
  | 'distributed'
  | 'marked'
  | 'drawnFrom'
  | 'varying'
  | 'differentiated'
  | 'scaled'
  | 'combined'
  | 'equivalent'
  | 'organized'
  | 'adjusted'

export interface CraftRelation {
  id: CraftRelationId
  /** The edge's tag, read as "A ‹label› B". */
  label: string
  /** One line saying what the tag means, for the Mastery prompt. */
  gloss: string
}

/**
 * The relation vocabulary. Closed on purpose: the Mastery prompt asks the
 * reader to *name* the relation, and a choice between four free-text phrases
 * would be a reading test rather than a recall one. A recipe that needs a
 * relation not here is a reason to add one, with its gloss.
 */
export const CRAFT_RELATIONS: Record<CraftRelationId, CraftRelation> = {
  times: { id: 'times', label: 'Multiplied by', gloss: 'The result is the product of the two.' },
  over: { id: 'over', label: 'Divided by', gloss: 'The result is a ratio — the first over the second.' },
  plus: { id: 'plus', label: 'Added to', gloss: 'The result is the sum of the two.' },
  minus: { id: 'minus', label: 'Less', gloss: 'The result is the first with the second taken away.' },
  weighted: { id: 'weighted', label: 'Credibility-weighted with', gloss: 'A blend: weight Z on the first, 1 − Z on the second.' },
  compared: { id: 'compared', label: 'Compared with', gloss: 'The first is measured against the second as a benchmark.' },
  estimatedFrom: { id: 'estimatedFrom', label: 'A priori estimated from', gloss: 'The first, with its prior expectation derived from the second.' },
  restricted: { id: 'restricted', label: 'Restricted to', gloss: 'The first, re-measured inside a smaller part of the second.' },
  constrained: { id: 'constrained', label: 'Constrained by', gloss: 'The first, required to satisfy the rules of the second.' },
  partitioning: { id: 'partitioning', label: 'Partitioning', gloss: 'The first splits the second into disjoint pieces that cover it.' },
  unaffected: { id: 'unaffected', label: 'Unaffected by', gloss: 'Learning the second leaves the first unchanged.' },
  compounded: { id: 'compounded', label: 'Compounded over', gloss: 'The first is applied once per period, across the second.' },
  summed: { id: 'summed', label: 'Summed over', gloss: 'The first is added up across every period of the second.' },
  limit: { id: 'limit', label: 'Taken to the limit of', gloss: 'The first as the second grows without bound.' },
  distributed: { id: 'distributed', label: 'Distributed as', gloss: 'The first’s counts or waiting times follow the second.' },
  marked: { id: 'marked', label: 'Marked with', gloss: 'Each event of the first carries a random amount from the second.' },
  drawnFrom: { id: 'drawnFrom', label: 'Rate drawn from', gloss: 'The first’s rate is itself random, drawn from the second.' },
  varying: { id: 'varying', label: 'Rate varying by', gloss: 'The first, with a rate that changes over time as the second says.' },
  differentiated: { id: 'differentiated', label: 'Differentiated by', gloss: 'The first’s rate of change with respect to the second.' },
  scaled: { id: 'scaled', label: 'Scaled by', gloss: 'The first rescaled by a factor built from the second.' },
  combined: { id: 'combined', label: 'Combined with', gloss: 'Both conditions hold at once.' },
  equivalent: { id: 'equivalent', label: 'Equivalent to', gloss: 'Two routes to the same answer.' },
  organized: { id: 'organized', label: 'Organized by', gloss: 'The first, arranged along the second.' },
  adjusted: { id: 'adjusted', label: 'Adjusted for', gloss: 'The first, restated to remove the effect of the second.' },
}

/** The Mastery prompt's always-present answer: the two don't combine. */
export const NO_LINK = 'none' as const
export const NO_LINK_LABEL = 'No direct link'

export interface CraftRecipe {
  /** The ingredients, in the order the relation reads: "a ‹relation› b". */
  a: string
  b: string
  relation: CraftRelationId
  result: string
  /** Why the two make the result — one or two sentences, LaTeX allowed. */
  why: string
}

export interface CraftModule {
  /** URL-safe id: `/craft/<id>`. */
  id: string
  /** The exam_progress key — the accent colour and the logo (`P`, `FM`, `MAS-I`, `CAS-5`). */
  exam: string
  /** The study guide page the module is cut from, e.g. `Exam 5 (CAS)`. */
  examPage: string
  /**
   * The learning objectives on that page it covers, named exactly as the page's
   * `[!example]` callouts name them (the data test holds them to the page).
   */
  objectives: string[]
  title: string
  /** One line for the topic picker. */
  blurb: string
  /** What the reader starts with: three to five anchor concepts. */
  primitives: string[]
  /**
   * Ingredients that join the deck at a milestone rather than at the start —
   * scaffolding, so a module can grow past a handful of anchors without
   * opening on all of them.
   */
  introduces?: { after: string; nodes: string[] }[]
  recipes: CraftRecipe[]
}

/** A reader's place in one module: the recipes found, in the order found. */
export interface CraftProgress {
  recipes: string[]
}

export const EMPTY_PROGRESS: CraftProgress = { recipes: [] }

function norm(name: string): string {
  return name.trim().toLowerCase()
}

/** The order-free key for a pair of concepts — `a + b` and `b + a` are one pair. */
export function pairKey(a: string, b: string): string {
  const [x, y] = [norm(a), norm(b)].sort()
  return `${x}|${y}`
}

/** A recipe's id: its pair. Within a module a pair makes one thing at most. */
export function recipeId(recipe: Pick<CraftRecipe, 'a' | 'b'>): string {
  return pairKey(recipe.a, recipe.b)
}

export function findRecipe(module: CraftModule, a: string, b: string): CraftRecipe | null {
  const key = pairKey(a, b)
  return module.recipes.find(r => recipeId(r) === key) ?? null
}

/** Every concept the module names, in a stable order: primitives, introduced, then results as authored. */
export function moduleNodes(module: CraftModule): string[] {
  const seen = new Set<string>()
  const out: string[] = []
  const add = (n: string) => {
    if (seen.has(norm(n))) return
    seen.add(norm(n))
    out.push(n)
  }
  module.primitives.forEach(add)
  module.introduces?.forEach(step => step.nodes.forEach(add))
  module.recipes.forEach(r => {
    add(r.a)
    add(r.b)
    add(r.result)
  })
  return out
}

/** What a reader in this module holds — the deck. In the order they came to hold it. */
export function availableNodes(module: CraftModule, progress: CraftProgress): string[] {
  const have: string[] = []
  const holding = new Set<string>()
  const take = (n: string) => {
    if (holding.has(norm(n))) return false
    holding.add(norm(n))
    have.push(n)
    return true
  }
  module.primitives.forEach(take)
  // The milestones are re-checked after every result, so an ingredient the
  // module introduces lands in the deck right after the node that earned it.
  const introduce = () => {
    let grew = true
    while (grew) {
      grew = false
      for (const step of module.introduces ?? []) {
        if (holding.has(norm(step.after))) step.nodes.forEach(n => { if (take(n)) grew = true })
      }
    }
  }
  introduce()
  for (const id of progress.recipes) {
    const recipe = module.recipes.find(r => recipeId(r) === id)
    if (!recipe) continue
    if (take(recipe.result)) introduce()
  }
  return have
}

/** The recipes found so far that the recipe book still contains — stale ids drop out. */
export function foundRecipes(module: CraftModule, progress: CraftProgress): CraftRecipe[] {
  const byId = new Map(module.recipes.map(r => [recipeId(r), r]))
  const out: CraftRecipe[] = []
  for (const id of progress.recipes) {
    const r = byId.get(id)
    if (r) out.push(r)
  }
  return out
}

/** What happens when `a` is dropped on `b`. */
export type CombineOutcome =
  /** The two don't combine in this module. */
  | { kind: 'none' }
  /** This pair was found before: nothing new, the edge lights up. */
  | { kind: 'known'; recipe: CraftRecipe }
  /**
   * A new link. `newNode` is false when the result was already held (found by
   * another route); `introduces` lists ingredients a milestone adds to the deck.
   */
  | { kind: 'new'; recipe: CraftRecipe; newNode: boolean; introduces: string[] }

export function combine(module: CraftModule, progress: CraftProgress, a: string, b: string): CombineOutcome {
  if (norm(a) === norm(b)) return { kind: 'none' }
  const recipe = findRecipe(module, a, b)
  if (!recipe) return { kind: 'none' }
  const id = recipeId(recipe)
  if (progress.recipes.includes(id)) return { kind: 'known', recipe }
  const before = availableNodes(module, progress)
  const after = availableNodes(module, withRecipe(progress, recipe))
  const held = new Set(before.map(norm))
  const gained = after.filter(n => !held.has(norm(n)))
  return {
    kind: 'new',
    recipe,
    newNode: gained.some(n => norm(n) === norm(recipe.result)),
    introduces: gained.filter(n => norm(n) !== norm(recipe.result)),
  }
}

/** Progress with one more recipe found. Idempotent. */
export function withRecipe(progress: CraftProgress, recipe: Pick<CraftRecipe, 'a' | 'b'>): CraftProgress {
  const id = recipeId(recipe)
  if (progress.recipes.includes(id)) return progress
  return { recipes: [...progress.recipes, id] }
}

export interface ModuleTally {
  nodes: number
  totalNodes: number
  links: number
  totalLinks: number
  /** Every recipe found — the module's whole graph is on the board. */
  complete: boolean
}

export function moduleTally(module: CraftModule, progress: CraftProgress): ModuleTally {
  const links = foundRecipes(module, progress).length
  return {
    nodes: availableNodes(module, progress).length,
    totalNodes: moduleNodes(module).length,
    links,
    totalLinks: module.recipes.length,
    complete: links === module.recipes.length,
  }
}

// ─── The Mastery prompt ──────────────────────────────────────────────────────

export interface RelationChoice {
  id: CraftRelationId | typeof NO_LINK
  label: string
}

export interface RelationQuestion {
  choices: RelationChoice[]
  /** The id of the right choice — the recipe's relation, or `none`. */
  answer: CraftRelationId | typeof NO_LINK
}

function shuffle<T>(items: readonly T[], rng: () => number): T[] {
  const out = [...items]
  for (let i = out.length - 1; i > 0; i--) {
    const j = Math.floor(rng() * (i + 1))
    ;[out[i], out[j]] = [out[j], out[i]]
  }
  return out
}

/**
 * The Mastery prompt for dropping `a` on `b`: "how does A relate to B?"
 *
 * Asked of **every** drop in Mastery mode, related or not, and always offering
 * *No direct link* as the last choice — if only real pairs opened a prompt,
 * the prompt itself would give away which pairs are real and spam-dragging
 * would still map the graph. A real pair offers its relation and two others;
 * an unrelated pair offers three relations, all wrong. The distractors come
 * from the module's own vocabulary first, so they are relations the reader has
 * met here rather than ones that are obviously out of place.
 */
export function relationQuestion(
  module: CraftModule,
  a: string,
  b: string,
  rng: () => number = Math.random,
): RelationQuestion {
  const recipe = findRecipe(module, a, b)
  const answer: RelationQuestion['answer'] = recipe ? recipe.relation : NO_LINK
  const local = [...new Set(module.recipes.map(r => r.relation))]
  const rest = (Object.keys(CRAFT_RELATIONS) as CraftRelationId[]).filter(id => !local.includes(id))
  const pool = [...shuffle(local, rng), ...shuffle(rest, rng)].filter(id => id !== answer)
  const want = recipe ? 2 : 3
  const relations = shuffle([...(recipe ? [recipe.relation] : []), ...pool.slice(0, want)], rng)
  return {
    choices: [
      ...relations.map(id => ({ id, label: CRAFT_RELATIONS[id].label })),
      { id: NO_LINK, label: NO_LINK_LABEL },
    ],
    answer,
  }
}

// ─── Challenges and hints ────────────────────────────────────────────────────

/**
 * The cheapest way from what is held to `target`: the recipes to make, in an
 * order that can be followed (ingredients before what they make). Empty when
 * the target is already held; null when it can't be reached at all.
 *
 * A plan is the union of its ingredients' plans, so an intermediate two routes
 * share is counted once. Picking the cheapest recipe at each node is a greedy
 * choice rather than an exact minimum, which on a recipe book this size is the
 * same answer.
 */
export function craftPlan(module: CraftModule, progress: CraftProgress, target: string): CraftRecipe[] | null {
  const held = new Set(availableNodes(module, progress).map(norm))
  const introducedBy = new Map<string, string>()
  for (const step of module.introduces ?? []) step.nodes.forEach(n => introducedBy.set(norm(n), step.after))

  const plan = (node: string, path: Set<string>): CraftRecipe[] | null => {
    const key = norm(node)
    if (held.has(key)) return []
    if (path.has(key)) return null
    const next = new Set(path).add(key)
    const trigger = introducedBy.get(key)
    if (trigger) return plan(trigger, next)
    let best: CraftRecipe[] | null = null
    for (const recipe of module.recipes) {
      if (norm(recipe.result) !== key) continue
      const left = plan(recipe.a, next)
      const right = left && plan(recipe.b, next)
      if (!left || !right) continue
      const merged: CraftRecipe[] = []
      for (const r of [...left, ...right, recipe]) {
        if (!merged.some(m => recipeId(m) === recipeId(r))) merged.push(r)
      }
      if (!best || merged.length < best.length) best = merged
    }
    return best
  }
  return plan(target, new Set())
}

/** How many crafts stand between the reader and `target` — the challenge's breadcrumb. */
export function stepsToTarget(module: CraftModule, progress: CraftProgress, target: string): number | null {
  return craftPlan(module, progress, target)?.length ?? null
}

/** The next craft on the way to `target` that can be made right now, for the hint. */
export function nextCraft(module: CraftModule, progress: CraftProgress, target: string): CraftRecipe | null {
  const plan = craftPlan(module, progress, target)
  if (!plan) return null
  const held = new Set(availableNodes(module, progress).map(norm))
  return plan.find(r => held.has(norm(r.a)) && held.has(norm(r.b))) ?? null
}

// FNV-1a: a stable, dependency-free hash for the daily order.
function hash(text: string): number {
  let h = 0x811c9dc5
  for (let i = 0; i < text.length; i++) {
    h ^= text.charCodeAt(i)
    h = Math.imul(h, 0x01000193)
  }
  return h >>> 0
}

/**
 * The craftable concepts in the order the day's challenges are drawn from —
 * shuffled by the date and the module, so it is the same list all day, on
 * every device, and a different one tomorrow. The order is fixed for the day;
 * only the reader's progress moves through it.
 */
export function challengeOrder(module: CraftModule, date: string): string[] {
  const results = [...new Set(module.recipes.map(r => r.result))]
  return results.sort((x, y) => hash(`${date}|${module.id}|${x}`) - hash(`${date}|${module.id}|${y}`))
}

/**
 * Today's challenge: the first concept in the day's order the reader doesn't
 * hold yet (`skip` passes over that many more — "another challenge"). Null
 * once every concept is held. Because the order is fixed and progress only
 * grows, crafting anything *other* than the target never moves it.
 */
export function dailyChallenge(module: CraftModule, progress: CraftProgress, date: string, skip = 0): string | null {
  const held = new Set(availableNodes(module, progress).map(norm))
  const open = challengeOrder(module, date).filter(n => !held.has(norm(n)))
  if (open.length === 0) return null
  return open[Math.min(skip, open.length - 1)] ?? null
}

// ─── The board's rows ────────────────────────────────────────────────────────

/**
 * How deep each concept the reader holds sits in what they have built: 0 for
 * a primitive, one more than the deeper of its two ingredients for a crafted
 * concept (by the shallowest route found), and an ingredient a milestone
 * introduced sits on the row of the concept that introduced it. Keyed by
 * lower-cased name. The board lays its rows out by this, so a graph reads top
 * to bottom from what the reader started with to what they made of it.
 */
export function nodeDepths(module: CraftModule, progress: CraftProgress): Map<string, number> {
  const depth = new Map<string, number>()
  module.primitives.forEach(p => depth.set(norm(p), 0))
  const recipes = foundRecipes(module, progress)
  const held = new Set(availableNodes(module, progress).map(norm))
  // Relax until nothing moves — a few passes on a book this size.
  for (let pass = 0; pass < 64; pass++) {
    let changed = false
    for (const step of module.introduces ?? []) {
      const d = depth.get(norm(step.after))
      if (d === undefined) continue
      for (const n of step.nodes) {
        if (!held.has(norm(n))) continue
        if ((depth.get(norm(n)) ?? Infinity) > d) {
          depth.set(norm(n), d)
          changed = true
        }
      }
    }
    for (const r of recipes) {
      const a = depth.get(norm(r.a))
      const b = depth.get(norm(r.b))
      if (a === undefined || b === undefined) continue
      const d = Math.max(a, b) + 1
      if ((depth.get(norm(r.result)) ?? Infinity) > d) {
        depth.set(norm(r.result), d)
        changed = true
      }
    }
    if (!changed) break
  }
  return depth
}

// ─── The inspector ───────────────────────────────────────────────────────────

export interface NodeConnections {
  /** Found recipes that made this concept. */
  madeFrom: CraftRecipe[]
  /** Found recipes this concept is an ingredient of. */
  usedIn: CraftRecipe[]
  /** Recipes touching this concept that are still to find — a count, never a spoiler. */
  undiscovered: number
}

export function nodeConnections(module: CraftModule, progress: CraftProgress, node: string): NodeConnections {
  const key = norm(node)
  const found = new Set(progress.recipes)
  const touching = module.recipes.filter(r => norm(r.a) === key || norm(r.b) === key || norm(r.result) === key)
  const known = touching.filter(r => found.has(recipeId(r)))
  return {
    madeFrom: known.filter(r => norm(r.result) === key),
    usedIn: known.filter(r => norm(r.result) !== key),
    undiscovered: touching.length - known.length,
  }
}

/**
 * The inspector's summary of a concept page: its opening definition (the same
 * paragraph the page's search description is cut from — `leadParagraph`) with
 * wiki links flattened to their text, and the formula box that follows it —
 * the first run of `> $$…$$` lines in the page's opening (before its first
 * heading or callout), up to `max` of them. A page whose formulas only appear
 * in a later section or a worked example has none here, rather than one picked
 * out of the middle of the page.
 */
export function conceptSummary(markdown: string, max = 2): { lead: string; formulas: string[] } {
  const lead = cleanWikiLinks(leadParagraph(markdown)).trim()
  const formulas: string[] = []
  let started = false
  for (const raw of pageBody(markdown).split('\n')) {
    const line = raw.trim()
    if (/^#{1,6}\s/.test(line) || /^>\s*\[!/.test(line)) break
    const box = /^>\s*\$\$(.+)\$\$\s*$/.exec(line)
    if (box) {
      started = true
      formulas.push(box[1].trim())
      if (formulas.length >= max) break
      continue
    }
    if (started && line !== '' && line !== '>') break
  }
  return { lead, formulas }
}

export function isPrimitive(module: CraftModule, node: string): boolean {
  return module.primitives.some(p => norm(p) === norm(node))
}

// ─── The recipe book's own rules ─────────────────────────────────────────────

/**
 * What is wrong with a module, as readable lines — empty when nothing is. The
 * data test runs this over every module, so a recipe book that can't be
 * finished, or that would put two different results on one pair, fails CI
 * rather than a reader.
 */
export function moduleProblems(module: CraftModule): string[] {
  const problems: string[] = []
  const id = module.id
  if (!/^[a-z0-9-]+$/.test(id)) problems.push(`${id}: the id must be url-safe`)
  if (module.primitives.length < 3 || module.primitives.length > 5) {
    problems.push(`${id}: a module starts with three to five primitives, not ${module.primitives.length}`)
  }
  const pairs = new Map<string, string>()
  for (const r of module.recipes) {
    if (norm(r.a) === norm(r.b)) problems.push(`${id}: ${r.a} is combined with itself`)
    if (norm(r.result) === norm(r.a) || norm(r.result) === norm(r.b)) {
      problems.push(`${id}: ${r.a} + ${r.b} makes one of its own ingredients`)
    }
    if (!CRAFT_RELATIONS[r.relation]) problems.push(`${id}: ${r.a} + ${r.b} has an unknown relation`)
    if (!r.why.trim()) problems.push(`${id}: ${r.a} + ${r.b} says nothing about why`)
    const key = recipeId(r)
    if (pairs.has(key)) problems.push(`${id}: ${r.a} + ${r.b} is listed twice`)
    pairs.set(key, r.result)
  }
  const results = new Set(module.recipes.map(r => norm(r.result)))
  for (const p of module.primitives) {
    if (results.has(norm(p))) problems.push(`${id}: the primitive ${p} is also a recipe's result`)
  }
  // Craft everything that can be crafted, in rounds, from the primitives up:
  // whatever is left over can never reach the board.
  let progress = EMPTY_PROGRESS
  let grew = true
  while (grew) {
    grew = false
    const held = new Set(availableNodes(module, progress).map(norm))
    for (const r of module.recipes) {
      if (progress.recipes.includes(recipeId(r))) continue
      if (held.has(norm(r.a)) && held.has(norm(r.b))) {
        progress = withRecipe(progress, r)
        grew = true
      }
    }
  }
  const held = new Set(availableNodes(module, progress).map(norm))
  for (const n of moduleNodes(module)) {
    if (!held.has(norm(n))) problems.push(`${id}: ${n} can never be reached`)
  }
  for (const r of module.recipes) {
    if (!progress.recipes.includes(recipeId(r))) problems.push(`${id}: ${r.a} + ${r.b} can never be made`)
  }
  return problems
}
