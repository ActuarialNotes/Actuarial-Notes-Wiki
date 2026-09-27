// The name and description every public page is found by.
//
// A search result is two lines — a title and a snippet — and until this module
// every URL on the site served the same two: "Actuarial Notes" and "Practice
// questions for SOA Exam P and Exam FM". This is where each exam, concept and
// resource page gets its own, derived from the vault so a thousand pages stay
// described without a thousand hand-written blurbs:
//
//   - a concept is described by its opening sentence — the definition every
//     concept page leads with;
//   - an exam by what its study guide holds (objectives, concepts, questions),
//     then its own introduction;
//   - a resource by its lead paragraph, or — for a textbook whose page is only
//     a chapter outline — by its bibliographic facts and its chapters.
//
// An authored `description:` in a page's front matter overrides the derived one.
//
// It is pure and runs twice. `vite.config.ts` runs it at build time to write a
// static <head> (and a crawlable body) into every page's own HTML file, and the
// sitemap; the app runs the same records through `lib/documentHead.ts`, so the
// head a crawler renders agrees with the head it fetched. Imports are relative —
// the vite config pulls this module into its own Node graph. See docs/seo.md.

import fm from 'front-matter'
import { examDisplayName, fromSlug, wikiRoute } from './wikiRoutes'
import { findSyllabiForConcept, parseExamMetadata, parseExamSyllabus, wikiExamIdToProgressKey, type WikiExamSyllabus } from './wikiParser'
import { EXAM_ID_TO_LABEL } from './examIds'
import { buildResourceExamMap, compareExamLabels, examsForResource } from './resourceExams'

export const SITE_ORIGIN = 'https://quiz.actuarialnotes.com'
export const SITE_NAME = 'Actuarial Notes'
export const SITE_LOGO = `${SITE_ORIGIN}/actuarialnotes-logo-black-512.png`

/** The site's own name and pitch — the home page, and every route with nothing better. */
export const DEFAULT_TITLE = 'Actuarial Notes — Study Guides & Practice Questions for Actuarial Exams'
export const DEFAULT_DESCRIPTION =
  'Study guides, concept pages and practice questions for SOA and CAS actuarial exams — Exam P, FM, MAS-I, MAS-II, Exam 5 and beyond.'

/** Where a search result's snippet is cut. Google shows roughly this much. */
export const DESCRIPTION_MAX = 160
/** Above this a title drops its qualifier ("— Exam 5") rather than be cut off. */
const TITLE_BUDGET = 65
/** A paragraph shorter than this is a label or a caption, not a lead. */
const MIN_LEAD = 60
/** The shortest lead still worth quoting — "An event E is any subset of S." */
const MIN_DEFINITION = 30
/** A page with fewer words than this is a stub — kept out of the index until written. */
export const THIN_PAGE_WORDS = 20

const HUB_PATH = '/wiki'

/** The app's own public routes, listed in the sitemap beside the vault's pages. */
export const SITEMAP_APP_PATHS = ['/', '/quiz', '/flashcards', '/upgrade', '/store']
const HUB_NAME = 'Study Guides'

export type SeoPageKind = 'hub' | 'exam' | 'concept' | 'resource'

export interface SeoCrumb {
  name: string
  path: string
}

/** A resource's bibliographic facts, as its front matter records them. */
export interface SeoWork {
  author?: string
  publisher?: string
  year?: string
  edition?: string
  isbn?: string
  type?: string
  /** A standard's or guideline's own number — "ASOP No. 12", "Guideline E-15". */
  code?: string
}

/** One public page, described. The build writes one of these per page. */
export interface SeoPage {
  kind: SeoPageKind
  /** The canonical path — the same one `wikiRoute` builds for a link. */
  path: string
  /** The page's own name, as its heading shows it. */
  name: string
  title: string
  description: string
  /** The study guide it sits under — the middle breadcrumb. */
  parent?: SeoCrumb
  /** Every study guide that lists it, when more than the parent. */
  guides?: SeoCrumb[]
  /** Its vault file. Build-time only; not shipped to the app. */
  source?: string
  /** An unwritten stub: served, but kept out of the index and the sitemap. */
  noindex?: boolean
  work?: SeoWork
}

/** Everything the document head says about a page. */
export interface PageHead {
  title: string
  description: string
  /** Absolute. Absent on a route that has no one URL (the SPA fallback). */
  canonical?: string
  noindex?: boolean
  ogType?: 'website' | 'article'
  jsonLd?: object[]
}

// ── Text ─────────────────────────────────────────────────────────────────────

const GREEK: Record<string, string> = {
  alpha: 'α', beta: 'β', gamma: 'γ', delta: 'δ', epsilon: 'ε', varepsilon: 'ε', zeta: 'ζ',
  eta: 'η', theta: 'θ', vartheta: 'θ', iota: 'ι', kappa: 'κ', lambda: 'λ', mu: 'μ', nu: 'ν',
  xi: 'ξ', pi: 'π', rho: 'ρ', sigma: 'σ', tau: 'τ', upsilon: 'υ', phi: 'φ', varphi: 'φ',
  chi: 'χ', psi: 'ψ', omega: 'ω', Gamma: 'Γ', Delta: 'Δ', Theta: 'Θ', Lambda: 'Λ', Xi: 'Ξ',
  Pi: 'Π', Sigma: 'Σ', Phi: 'Φ', Psi: 'Ψ', Omega: 'Ω',
}

const SYMBOLS: Record<string, string> = {
  times: '×', cdot: '·', div: '÷', pm: '±', mp: '∓', le: '≤', leq: '≤', ge: '≥', geq: '≥',
  ne: '≠', neq: '≠', approx: '≈', sim: '~', simeq: '≃', equiv: '≡', propto: '∝', infty: '∞',
  sum: 'Σ', prod: 'Π', int: '∫', partial: '∂', nabla: '∇', to: '→', rightarrow: '→',
  leftarrow: '←', Rightarrow: '⇒', Leftarrow: '⇐', Leftrightarrow: '⇔', iff: '⇔',
  implies: '⇒', mapsto: '↦', in: '∈', notin: '∉', ni: '∋', subset: '⊂', subseteq: '⊆',
  supset: '⊃', cup: '∪', cap: '∩', setminus: '∖', emptyset: '∅', varnothing: '∅',
  forall: '∀', exists: '∃', neg: '¬', lnot: '¬', land: '∧', lor: '∨', ell: 'ℓ', ldots: '…',
  dots: '…', cdots: '⋯', mid: '|', vert: '|', lvert: '|', rvert: '|', Vert: '‖', lVert: '‖',
  rVert: '‖', langle: '⟨', rangle: '⟩', lfloor: '⌊', rfloor: '⌋', lceil: '⌈', rceil: '⌉',
  circ: '∘', ast: '*', star: '⋆', prime: '′', perp: '⊥', parallel: '∥', angle: '∠',
  max: 'max', min: 'min', log: 'log', ln: 'ln', exp: 'exp', lim: 'lim', sup: 'sup',
  inf: 'inf', det: 'det', sin: 'sin', cos: 'cos', tan: 'tan', Pr: 'Pr', arg: 'arg',
  quad: ' ', qquad: ' ',
}

/** Commands that only restyle their argument — the argument is the text. */
const UNWRAP = new Set([
  'text', 'textrm', 'textbf', 'textit', 'textsf', 'texttt', 'textnormal', 'mathrm', 'mathbf',
  'mathit', 'mathsf', 'mathtt', 'mathcal', 'mathscr', 'mathfrak', 'operatorname', 'boldsymbol',
  'bm', 'emph', 'mbox', 'hbox', 'underline', 'underbrace', 'overbrace', 'boxed', 'color',
])

/** Commands that are pure layout and say nothing. */
const DROP = new Set([
  'left', 'right', 'big', 'Big', 'bigg', 'Bigg', 'bigl', 'bigr', 'Bigl', 'Bigr', 'biggl',
  'biggr', 'displaystyle', 'textstyle', 'scriptstyle', 'limits', 'nolimits', 'nonumber',
  'notag', 'begin', 'end', 'hline', 'label', 'tag', 'phantom', 'vphantom', 'hphantom',
])

const BLACKBOARD: Record<string, string> = { R: 'ℝ', N: 'ℕ', Z: 'ℤ', Q: 'ℚ', C: 'ℂ', E: '𝔼', P: 'ℙ' }

const ACCENTS: Record<string, string> = {
  bar: '̄', overline: '̅', hat: '̂', widehat: '̂', tilde: '̃',
  widetilde: '̃', dot: '̇', ddot: '̈', vec: '⃗', check: '̌',
}

const SUPERSCRIPT: Record<string, string> = {
  '0': '⁰', '1': '¹', '2': '²', '3': '³', '4': '⁴', '5': '⁵', '6': '⁶', '7': '⁷', '8': '⁸',
  '9': '⁹', '+': '⁺', '-': '⁻', '=': '⁼', '(': '⁽', ')': '⁾', n: 'ⁿ', i: 'ⁱ', T: 'ᵀ',
  k: 'ᵏ', x: 'ˣ', y: 'ʸ', t: 'ᵗ', '′': '′',
}

const SUBSCRIPT: Record<string, string> = {
  '0': '₀', '1': '₁', '2': '₂', '3': '₃', '4': '₄', '5': '₅', '6': '₆', '7': '₇', '8': '₈',
  '9': '₉', '+': '₊', '-': '₋', '=': '₌', '(': '₍', ')': '₎', a: 'ₐ', e: 'ₑ', h: 'ₕ',
  i: 'ᵢ', j: 'ⱼ', k: 'ₖ', l: 'ₗ', m: 'ₘ', n: 'ₙ', o: 'ₒ', p: 'ₚ', r: 'ᵣ', s: 'ₛ', t: 'ₜ',
  u: 'ᵤ', v: 'ᵥ', x: 'ₓ',
}

function script(body: string, table: Record<string, string>, marker: string): string {
  const chars = [...body.replace(/\s+/g, '')]
  if (chars.length > 0 && chars.every(c => c in table)) return chars.map(c => table[c]).join('')
  const plain = body.trim()
  return /^[\p{L}\p{N}.′]+$/u.test(plain) ? marker + plain : `${marker}(${plain})`
}

/**
 * Read a TeX fragment as plain text — `$E[X^2]$` as "E[X²]", `$\frac{a}{b}$` as
 * "a/b", `$\mu$` as "μ" — for the places math has to be *read* rather than
 * typeset: a meta description, a snippet. It covers what the vault's inline
 * math actually uses and drops, rather than prints, whatever it doesn't know.
 */
export function latexToText(tex: string): string {
  let i = 0

  function group(): string {
    // At a `{`: return its balanced contents and step past the `}`.
    let depth = 0
    const start = i + 1
    for (; i < tex.length; i++) {
      if (tex[i] === '\\') { i++; continue }
      if (tex[i] === '{') depth++
      else if (tex[i] === '}' && --depth === 0) break
    }
    const body = tex.slice(start, i)
    i++
    return body
  }

  function arg(): string {
    while (tex[i] === ' ') i++
    if (tex[i] === '{') return group()
    if (tex[i] === '\\') {
      const m = /^\\([A-Za-z]+|.)/.exec(tex.slice(i))
      if (m) { i += m[0].length; return m[0] }
    }
    return tex[i++] ?? ''
  }

  function optional(): void {
    while (tex[i] === ' ') i++
    if (tex[i] !== '[') return
    const close = tex.indexOf(']', i)
    i = close === -1 ? tex.length : close + 1
  }

  function wrap(s: string): string {
    const t = s.trim()
    return /[\s+\-−×·/]/.test(t) && t.length > 1 ? `(${t})` : t
  }

  function run(): string {
    let out = ''
    while (i < tex.length) {
      const ch = tex[i]!
      if (ch === '\\') {
        const m = /^\\([A-Za-z]+|.)/.exec(tex.slice(i))
        if (!m) { i++; continue }
        i += m[0].length
        const name = m[1]!
        if (name.length === 1 && !/[A-Za-z]/.test(name)) {
          // `\,` `\;` `\!` `\ ` are spacing; `\%` `\$` `\{` … are the character.
          out += /[,;:! ]/.test(name) ? ' ' : name === '\\' ? ' ' : name
        } else if (GREEK[name]) out += GREEK[name]
        else if (SYMBOLS[name]) out += (/^[a-z]{2,}$/i.test(SYMBOLS[name]!) ? SYMBOLS[name] : ` ${SYMBOLS[name]} `)
        else if (name === 'frac' || name === 'dfrac' || name === 'tfrac' || name === 'cfrac') {
          const num = sub(arg())
          const den = sub(arg())
          out += `${wrap(num)}/${wrap(den)}`
        } else if (name === 'sqrt') {
          optional()
          out += `√${wrap(sub(arg()))}`
        } else if (name === 'binom' || name === 'dbinom' || name === 'tbinom') {
          const n = sub(arg())
          const k = sub(arg())
          out += `C(${n.trim()}, ${k.trim()})`
        } else if (name === 'mathbb') {
          const a = arg().trim()
          out += BLACKBOARD[a] ?? a
        } else if (ACCENTS[name]) {
          const a = sub(arg()).trim()
          out += [...a].length === 1 ? a + ACCENTS[name] : a
        } else if (name === 'color' || name === 'textcolor') {
          arg()
          if (name === 'textcolor') out += sub(arg())
        } else if (UNWRAP.has(name)) out += sub(arg())
        else if (DROP.has(name)) {
          if (name === 'begin' || name === 'end' || name === 'label' || name === 'tag') arg()
        }
        // Anything else is a command this reader doesn't know: say nothing.
      } else if (ch === '^' || ch === '_') {
        i++
        const a = arg()
        out += script(sub(a), ch === '^' ? SUPERSCRIPT : SUBSCRIPT, ch)
      } else if (ch === '{') {
        out += sub(group())
      } else if (ch === '}') {
        i++
      } else if (ch === '~' || ch === '&') {
        out += ' '
        i++
      } else {
        out += ch
        i++
      }
    }
    return out
  }

  function sub(fragment: string): string {
    return latexToText(fragment)
  }

  return run()
    .replace(/\s+/g, ' ')
    .replace(/\(\s+/g, '(')
    .replace(/\s+([),.;:])/g, '$1')
    .trim()
}

const PLACEHOLDER = '\u0001'
const ESCAPED_DOLLAR = '\u0002'

/**
 * One paragraph of vault markdown, read as plain text: wiki links as their
 * label, emphasis and code unmarked, inline math read out by `latexToText`,
 * embeds, footnotes, comments and HTML dropped.
 */
export function inlineMarkdownToText(md: string): string {
  const math: string[] = []
  const stash = (text: string) => `${PLACEHOLDER}${math.push(text) - 1}${PLACEHOLDER}`

  let s = md
    .replace(/%%[\s\S]*?%%/g, '')
    .replace(/\\\$/g, ESCAPED_DOLLAR)
  // Math first, so nothing below mistakes a `_` or `*` inside it for emphasis.
  s = s
    .replace(/\$\$([\s\S]+?)\$\$/g, (_m, tex: string) => stash(latexToText(tex)))
    .replace(/\$([^$\n]+?)\$/g, (_m, tex: string) => stash(latexToText(tex)))
  s = s
    .replace(/\s*\^\[(?:[^[\]]|\[[^\]]*\])*\]/g, '')
    // A source link standing alone in parentheses — "([Wikidata](…))" — is a citation, not prose.
    .replace(/\s*\(\s*\[[^\]]+\]\([^)\s]*\)\s*\)/g, '')
    .replace(/!\[\[[^\]]*\]\]/g, '')
    .replace(/!\[[^\]]*\]\([^)]*\)/g, '')
    .replace(/\[\[([^\]|]+)(?:\|([^\]]+))?\]\]/g, (_m, target: string, label?: string) =>
      label?.trim() || (target.includes('/') ? target.split('/').pop()! : target).trim())
    .replace(/\[([^\]]+)\]\((?:[^()\s]|\([^)]*\))*(?:\s+"[^"]*")?\)/g, '$1')
    .replace(/<[^>]+>/g, '')
    .replace(/`([^`]+)`/g, '$1')
    .replace(/(\*\*|__)(?=\S)([\s\S]*?\S)\1/g, '$2')
    .replace(/(^|[^\w*])\*(?=\S)([^*]*?\S)\*(?!\w)/g, '$1$2')
    .replace(/(^|[^\w])_(?=\S)([^_]*?\S)_(?!\w)/g, '$1$2')
    .replace(/~~(?=\S)([\s\S]*?\S)~~/g, '$1')
    .replace(/==(?=\S)([\s\S]*?\S)==/g, '$1')
    .replace(/\\([\\`*_{}[\]()#+\-.!|~<>])/g, '$1')
    .replace(/&nbsp;/g, ' ')
    .replace(/&amp;/g, '&')
  s = s.replace(new RegExp(`${PLACEHOLDER}(\\d+)${PLACEHOLDER}`, 'g'), (_m, n: string) => math[Number(n)] ?? '')
  return s
    .replace(new RegExp(ESCAPED_DOLLAR, 'g'), '$')
    .replace(/\s+/g, ' ')
    .replace(/^["“]\s*([^"“”]+?)\s*["”]$/, '$1')
    .replace(/\s+([,.;:!?)])/g, '$1')
    .replace(/\(\s+/g, '(')
    .trim()
}

/** A page's markdown without its YAML front matter and Obsidian Publish breadcrumb line. */
export function pageBody(markdown: string): string {
  return stripChrome(markdown)
}

function stripChrome(markdown: string): string {
  return markdown
    .replace(/^\uFEFF?---\r?\n[\s\S]*?\r?\n---\r?\n?/, '')
    .replace(/^\s+/, '')
    .replace(BREADCRUMB_RE, '')
}

// `[[Actuarial Notes Wiki|Wiki]] / [[Actuarial Glossary]] / **Actuary**`
const BREADCRUMB_RE = /^\[\[[^\]|]*(?:\|[^\]]+)?\]\][^\n]* \/ [^\n]*\n?/

// A line that opens something other than a prose paragraph.
const NON_PROSE_RE = /^(#{1,6}\s|>|[-*+]\s|\d+[.)]\s|\||!\[|<|\$\$|```|~~~|---+$|\*\*\*+$|___+$|%%)/

/**
 * The page's introduction, as markdown: the first substantial paragraph of its
 * opening — a concept page's definition, an exam page's first line. Headings
 * before it are passed over (older pages open on `## Name`), but the search
 * stops at the first heading after any other content, so a chapter outline or
 * a page that opens on a formula has no lead rather than some paragraph from
 * its middle. A quoted definition (`> An agent is …`) counts; a callout, a
 * formula box and a list never do.
 */
export function leadParagraph(markdown: string): string {
  const body = stripChrome(markdown)
    .replace(/<!--[\s\S]*?-->/g, '')
    .replace(/%%[\s\S]*?%%/g, '')
    .replace(/<(div|details|section|span|table|figure|iframe|aside)\b[\s\S]*?<\/\1>/gi, '')
  const candidates: string[] = []
  let block: string[] = []
  let quoted = false
  let inFence = false
  let inMath = false
  let inCallout = false
  let seenContent = false
  const endBlock = () => {
    if (block.length) candidates.push(block.join(' '))
    block = []
  }
  for (const raw of body.split('\n')) {
    const t = raw.trim()
    if (inFence) {
      if (/^(```|~~~)/.test(t)) inFence = false
      continue
    }
    if (inMath) {
      if (t.endsWith('$$')) inMath = false
      continue
    }
    const isQuote = t.startsWith('>')
    const inner = isQuote ? t.replace(/^>\s?/, '').trim() : t
    if (!isQuote) inCallout = false
    else if (/^\[!\w+\]/.test(inner)) inCallout = true
    if (/^#{1,6}\s/.test(t)) {
      endBlock()
      if (seenContent && !/^#\s/.test(t)) break
      continue
    }
    const prose = inner !== '' && !inCallout && !NON_PROSE_RE.test(inner) && !BREADCRUMB_RE.test(inner)
    if (!prose || isQuote !== quoted) endBlock()
    if (prose) {
      block.push(inner)
      quoted = isQuote
      seenContent = true
      continue
    }
    if (!inner) continue
    if (/^(```|~~~)/.test(inner)) inFence = true
    else if (inner.startsWith('$$') && (inner === '$$' || !inner.slice(2).includes('$$'))) inMath = true
    // A cover or figure embed opens a page without being its content.
    if (!/^!\[/.test(inner)) seenContent = true
  }
  endBlock()
  return candidates.find(c => inlineMarkdownToText(c).length >= MIN_LEAD) ?? candidates[0] ?? ''
}

/** A page the vault holds a place for but hasn't written yet. */
const PLACEHOLDER_RE = /\b(?:summary|definition|page) to be written\b/i

/** An unwritten page: too few words, or a placeholder line where its summary goes. */
export function isStubPage(markdown: string): boolean {
  return bodyWordCount(markdown) < THIN_PAGE_WORDS || PLACEHOLDER_RE.test(markdown)
}

/** Words of prose on a page, front matter and comments aside. */
export function bodyWordCount(markdown: string): number {
  const body = stripChrome(markdown).replace(/%%[\s\S]*?%%/g, '').replace(/<[^>]+>/g, ' ')
  return (body.match(/[A-Za-z0-9À-ɏ]+/g) ?? []).length
}

const ABBREVIATIONS = /(?:^|\s)(?:e\.g|i\.e|vs|etc|No|Nos|Mr|Mrs|Ms|Dr|St|cf|approx|Fig|al|Inc|Ltd|Co|Vol|ed|eds|pp|p|ch|Ch|Sec|U\.S|[A-Z])$/

/**
 * Cut a description to fit a search result. A whole sentence is preferred when
 * one fills at least half the budget; otherwise it is cut at a word, with an
 * ellipsis, so it never ends mid-word.
 */
export function clampText(text: string, max = DESCRIPTION_MAX): string {
  // A lead that introduces a formula ends on a colon; alone, it ends the sentence.
  const s = text.replace(/\s+/g, ' ').trim().replace(/\s*:$/, '.')
  if (s.length <= max) return s
  let cut = -1
  const re = /[.!?](?=\s+["“(\p{Lu}\d])/gu
  for (let m = re.exec(s); m && m.index < max; m = re.exec(s)) {
    if (!ABBREVIATIONS.test(s.slice(0, m.index))) cut = m.index + 1
  }
  if (cut >= max / 2) return s.slice(0, cut)
  const head = s.slice(0, max - 1)
  const space = head.lastIndexOf(' ')
  const words = space > max * 0.6 ? head.slice(0, space) : head
  return `${words.replace(/[\s,;:—–(-]+$/, '')}…`
}

/** "A", "A and B", "A, B and C". */
export function listJoin(items: string[]): string {
  if (items.length <= 1) return items[0] ?? ''
  return `${items.slice(0, -1).join(', ')} and ${items[items.length - 1]}`
}

function frontMatter(markdown: string): Record<string, unknown> {
  try {
    return (fm<Record<string, unknown>>(markdown).attributes ?? {}) as Record<string, unknown>
  } catch {
    return {}
  }
}

function attr(attrs: Record<string, unknown>, ...keys: string[]): string | undefined {
  for (const key of keys) {
    const v = attrs[key]
    if (v != null && String(v).trim()) return String(v).trim()
  }
  return undefined
}

/** `Name | Actuarial Notes`, with a qualifier when the whole still fits. */
export function composeTitle(name: string, qualifier?: string): string {
  const brand = ` | ${SITE_NAME}`
  if (qualifier) {
    const full = `${name} — ${qualifier}${brand}`
    if (full.length <= TITLE_BUDGET) return full
  }
  return `${name}${brand}`
}

function withContext(description: string, context: string): string {
  if (!context || description.endsWith('…')) return description
  const joined = `${description} ${context}`
  return joined.length <= DESCRIPTION_MAX ? joined : description
}

// ── Pages ────────────────────────────────────────────────────────────────────

/** What a concept page carries, for a description that has to be built. */
function conceptFeatures(markdown: string): string {
  const parts: string[] = []
  if (/\$\$/.test(markdown)) parts.push('formulas')
  if (/\[!example\][^\n]*\n>\s*(?!example to be added)\S/i.test(markdown)) parts.push('worked examples')
  return listJoin(parts)
}

export function conceptSeo(input: { name: string; markdown: string; exams: SeoCrumb[] }): SeoPage {
  const { name, markdown, exams } = input
  const examNames = exams.map(e => e.name)
  const onSyllabus = examNames.length > 0 ? `On the ${listJoin(examNames)} syllabus.` : ''
  const authored = attr(frontMatter(markdown), 'description')
  const lead = inlineMarkdownToText(leadParagraph(markdown))
  let description: string
  if (authored) description = clampText(authored)
  else if (lead.length >= MIN_DEFINITION) description = withContext(clampText(lead), onSyllabus)
  else {
    const features = conceptFeatures(markdown)
    description = clampText(
      `${name}: study notes${examNames.length ? ` for ${listJoin(examNames)}` : ''}${features ? `, with ${features}` : ''}, from ${SITE_NAME}.`,
    )
  }
  return {
    kind: 'concept',
    path: wikiRoute({ kind: 'concept', name }),
    name,
    title: composeTitle(name, exams.length === 1 ? examNames[0] : undefined),
    description,
    parent: exams[0],
    guides: exams.length > 1 ? exams : undefined,
    noindex: isStubPage(markdown) || undefined,
  }
}

export function examSeo(input: { fileName: string; markdown: string; questions: number }): SeoPage {
  const { fileName, markdown, questions } = input
  const name = examDisplayName(fileName)
  const body = /\((SOA|CAS)\)\s*$/i.exec(fileName)?.[1]?.toUpperCase()
  const meta = parseExamMetadata(markdown)
  const syllabus = meta ? parseExamSyllabus(markdown, meta.examId, meta.examLabel, meta.examTopic, fileName) : null
  const concepts = new Set(syllabus?.topics.flatMap(t => t.concepts.map(c => c.name.toLowerCase())) ?? []).size

  const holds: string[] = []
  if (concepts > 0) holds.push(`${concepts.toLocaleString('en-US')} concept pages`)
  if (questions > 0) holds.push(`${questions.toLocaleString('en-US')} practice questions`)
  const guide = `${[body, name].filter(Boolean).join(' ')} study guide`
  const topic = meta?.examTopic
  const lead = inlineMarkdownToText(leadParagraph(markdown))
  const authored = attr(frontMatter(markdown), 'description')
  // The richest phrasing that fits a result, then the exam's own introduction
  // if there is room for all of it.
  const candidates = [
    topic && holds.length ? `${guide} for ${topic}: ${listJoin(holds)}, organized by learning objective.` : '',
    topic && holds.length ? `${guide} for ${topic}: ${listJoin(holds)}.` : '',
    holds.length ? `${guide}: ${listJoin(holds)}, organized by learning objective.` : '',
    topic ? `${guide} for ${topic}, organized by learning objective.` : `${guide}, organized by learning objective.`,
  ].filter(Boolean)
  const facts = candidates.find(c => c.length <= DESCRIPTION_MAX) ?? candidates[candidates.length - 1]!

  return {
    kind: 'exam',
    path: wikiRoute({ kind: 'exam', name: fileName }),
    name,
    title: `${name}${body ? ` (${body})` : ''} Study Guide & Syllabus | ${SITE_NAME}`,
    description: authored ? clampText(authored) : withContext(clampText(facts), lead),
  }
}

const OUTLINE_SKIP_RE = /^(related|see also|notes?|references|further reading|source|about|overview|summary)\b/i

/** A resource page's chapter headings, numbering stripped. */
function chapterTitles(markdown: string): string[] {
  return stripChrome(markdown)
    .split('\n')
    .map(line => /^##\s+(.+)$/.exec(line.trim())?.[1])
    .filter((h): h is string => Boolean(h))
    .map(h => inlineMarkdownToText(h)
      .replace(/^(?:chapter|part|section|appendix)\s+[\dIVXLA-Z]+(?:\.\d+)*\s*[—–:.-]?\s*/i, '')
      .replace(/^[\dA-Z]{1,3}(?:\.\d+)*[.:)]?\s+(?=\S)/, '')
      .replace(/^[—–:-]\s*/, '')
      .trim())
    .filter(h => h.length > 1 && !OUTLINE_SKIP_RE.test(h))
}

/** A long title with a subtitle is named in a result by its main title. */
function shortTitle(name: string): string {
  if (name.length <= 60) return name
  const colon = name.indexOf(': ')
  return colon >= 15 ? name.slice(0, colon) : name
}

/** "(Ross - 2019)" on the file name → "Ross, 2019": the short citation a reader knows it by. */
function citationQualifier(fileName: string): string | undefined {
  const m = /\(([^()]+)\)\s*$/.exec(fileName)
  if (!m) return undefined
  const q = m[1]!.replace(/\s+[-–—]\s+/g, ', ').trim()
  return q.length <= 24 ? q : undefined
}

function ordinal(n: number): string {
  const tens = n % 100
  const suffix = tens >= 11 && tens <= 13 ? 'th' : ['th', 'st', 'nd', 'rd'][n % 10] ?? 'th'
  return `${n}${suffix}`
}

/** "10e", "10th" → " (10th edition)"; "First edition" as written; anything else unsaid. */
function editionPhrase(edition?: string): string {
  const e = edition?.trim()
  if (!e) return ''
  const numbered = /^(\d+)(?:e|st|nd|rd|th)?$/i.exec(e)
  if (numbered) return ` (${ordinal(Number(numbered[1]))} edition)`
  return /^[\w\s]*edition$/i.test(e) ? ` (${e.toLowerCase()})` : ''
}

export function resourceSeo(input: { name: string; markdown: string; exams: SeoCrumb[] }): SeoPage {
  const { name: fileName, markdown, exams } = input
  const attrs = frontMatter(markdown)
  const work: SeoWork = {
    author: attr(attrs, 'Authors', 'Author'),
    publisher: attr(attrs, 'Publisher'),
    year: attr(attrs, 'Year'),
    edition: attr(attrs, 'Edition'),
    isbn: attr(attrs, 'ISBN'),
    type: attr(attrs, 'Type'),
    code: attr(attrs, 'Code'),
  }
  const name = attr(attrs, 'Title') ?? fileName
  const short = shortTitle(name)
  const examNames = exams.map(e => e.name)
  const reading = examNames.length > 0 ? `A syllabus reading for ${listJoin(examNames)}.` : ''

  const authored = attr(attrs, 'description')
  const lead = inlineMarkdownToText(leadParagraph(markdown))
  let description: string
  if (authored) description = clampText(authored)
  else if (lead.length >= MIN_LEAD) description = withContext(clampText(lead), reading)
  else {
    const by = work.author ? ` by ${work.author}` : ''
    const imprint = [work.publisher !== work.author ? work.publisher : undefined, work.year].filter(Boolean).join(', ')
    const cite = `${short}${editionPhrase(work.edition)}${by}${imprint ? ` (${imprint})` : ''}.`
    const base = `${cite}${reading ? ` ${reading}` : ''}`
    // As many chapter names as the result has room for — they are what a
    // reader searching for the book's content types.
    const chapters = chapterTitles(markdown)
    let outline = ''
    for (let n = 2; n <= chapters.length; n++) {
      const next = ` Chapters include ${listJoin(chapters.slice(0, n))}.`
      if (base.length + next.length > DESCRIPTION_MAX) break
      outline = next
    }
    description = clampText(base + outline)
  }

  const qualifier = citationQualifier(fileName)
  const qualified = qualifier ? `${short} (${qualifier}) | ${SITE_NAME}` : ''
  return {
    kind: 'resource',
    path: wikiRoute({ kind: 'resource', name: fileName }),
    name,
    title: qualified && qualified.length <= 70 && !short.includes(`(${qualifier})`) ? qualified : `${short} | ${SITE_NAME}`,
    description,
    parent: exams[0],
    guides: exams.length > 1 ? exams : undefined,
    noindex: isStubPage(markdown) || undefined,
    work,
  }
}

export function hubSeo(exams: SeoCrumb[]): SeoPage {
  const names = exams.map(e => e.name)
  return {
    kind: 'hub',
    path: HUB_PATH,
    name: HUB_NAME,
    title: `SOA & CAS Actuarial Exam Study Guides | ${SITE_NAME}`,
    description: clampText(
      `Study guides for SOA and CAS actuarial ${names.length === 1 ? names[0] : `Exams ${listJoin(names.map(n => n.replace(/^Exam\s+/i, '')))}`}: concept pages, practice questions and syllabus readings.`,
    ),
  }
}

// ── The whole site ───────────────────────────────────────────────────────────

/**
 * Practice questions per bank label (`exam:` in a question's front matter), not
 * counting the ones no current syllabus covers (`off_syllabus: true`).
 */
export function countQuestionsByExam(rawQuestions: string[]): Record<string, number> {
  const counts: Record<string, number> = {}
  for (const raw of rawQuestions) {
    const head = /^---\r?\n([\s\S]*?)\r?\n---/.exec(raw)?.[1] ?? ''
    if (/^off_syllabus:\s*true\s*$/m.test(head)) continue
    const label = /^exam:\s*["']?([^"'\n]+?)["']?\s*$/m.exec(head)?.[1]
    if (label) counts[label] = (counts[label] ?? 0) + 1
  }
  return counts
}

/**
 * Every public page the vault makes, described: the study-guide hub, each exam,
 * each concept and each resource (`Resources/Books/`). `files` is the wiki
 * bundle's file map (vault path → markdown).
 */
export function buildSeoPages(files: Record<string, string>, questionCounts: Record<string, number>): SeoPage[] {
  const examFiles = Object.keys(files)
    .filter(p => !p.includes('/') && /^Exam\b.*\.md$/i.test(p))
    .map(p => p.replace(/\.md$/i, ''))
    .sort((a, b) => compareExamLabels(examDisplayName(a), examDisplayName(b)))

  const syllabi: WikiExamSyllabus[] = []
  const examCrumbs = new Map<string, SeoCrumb>()
  const exams: SeoPage[] = []
  for (const fileName of examFiles) {
    const markdown = files[`${fileName}.md`]!
    const meta = parseExamMetadata(markdown)
    if (meta) syllabi.push(parseExamSyllabus(markdown, meta.examId, meta.examLabel, meta.examTopic, fileName))
    const label = meta ? EXAM_ID_TO_LABEL[wikiExamIdToProgressKey(meta.examId)] : undefined
    const page = { ...examSeo({ fileName, markdown, questions: label ? questionCounts[label] ?? 0 : 0 }), source: `${fileName}.md` }
    exams.push(page)
    examCrumbs.set(page.name, { name: page.name, path: page.path })
  }
  const crumbFor = (s: WikiExamSyllabus): SeoCrumb | undefined =>
    s.fileName ? examCrumbs.get(examDisplayName(s.fileName)) : undefined

  const concepts: SeoPage[] = []
  const resources: SeoPage[] = []
  const resourceExams = buildResourceExamMap(examFiles.map(name => ({ name, markdown: files[`${name}.md`]! })))
  for (const [filePath, markdown] of Object.entries(files)) {
    const concept = /^Concepts\/([^/]+)\.md$/.exec(filePath)?.[1]
    if (concept) {
      const on = findSyllabiForConcept(syllabi, concept).map(crumbFor).filter((c): c is SeoCrumb => Boolean(c))
      concepts.push({ ...conceptSeo({ name: concept, markdown, exams: on }), source: filePath })
      continue
    }
    const resource = /^Resources\/Books\/([^/]+)\.md$/.exec(filePath)?.[1]
    if (resource) {
      const on = examsForResource(resourceExams, resource).map(label => examCrumbs.get(label)).filter((c): c is SeoCrumb => Boolean(c))
      resources.push({ ...resourceSeo({ name: resource, markdown, exams: on }), source: filePath })
    }
  }
  const byName = (a: SeoPage, b: SeoPage) => a.path.localeCompare(b.path)
  const pages = [hubSeo([...examCrumbs.values()]), ...exams, ...concepts.sort(byName), ...resources.sort(byName)]
  return distinctTitles(pages)
}

/**
 * Two results with one title read as one page twice — a concept and the
 * guideline named after it ("Appointed Actuary"). The resource gives way: its
 * title takes the document's code or type.
 */
function distinctTitles(pages: SeoPage[]): SeoPage[] {
  const seen = new Map<string, number>()
  for (const page of pages) seen.set(page.title, (seen.get(page.title) ?? 0) + 1)
  return pages.map(page => {
    if ((seen.get(page.title) ?? 0) < 2 || page.kind !== 'resource') return page
    const tag = page.work?.code ?? page.work?.type ?? 'reading'
    return { ...page, title: `${page.title.replace(` | ${SITE_NAME}`, '')} (${tag}) | ${SITE_NAME}` }
  })
}

// ── Head ─────────────────────────────────────────────────────────────────────

export function absoluteUrl(path: string): string {
  return `${SITE_ORIGIN}${path.startsWith('/') ? path : `/${path}`}`
}

const ORGANIZATION = {
  '@type': 'Organization',
  name: SITE_NAME,
  url: `${SITE_ORIGIN}/`,
  logo: SITE_LOGO,
}

const ORG_AUTHOR_RE = /\b(board|society|institute|association|office|agency|council|committee|bureau|commission|authority|superintendent|actuaries|government|ministry|department|federation|forum|inc|ltd|corporation|insurance|OSFI|FSRA|AMF|NAIC|CAS|SOA|CIA|IBC|ASB|CCIR|GISA)\b/i

function workJsonLd(page: SeoPage): object {
  const work = page.work ?? {}
  const isBook = Boolean(work.isbn) || /textbook|monograph|book/i.test(work.type ?? '')
  return {
    '@type': isBook ? 'Book' : 'CreativeWork',
    name: page.name,
    ...(work.author ? { author: { '@type': ORG_AUTHOR_RE.test(work.author) ? 'Organization' : 'Person', name: work.author } } : {}),
    ...(work.publisher ? { publisher: { '@type': 'Organization', name: work.publisher } } : {}),
    ...(work.year ? { datePublished: work.year } : {}),
    ...(isBook && work.isbn ? { isbn: work.isbn } : {}),
    ...(isBook && work.edition ? { bookEdition: work.edition } : {}),
    ...(!isBook && work.type ? { genre: work.type } : {}),
  }
}

function pageJsonLd(page: SeoPage, url: string): object[] {
  const context = 'https://schema.org'
  const website = { '@type': 'WebSite', name: SITE_NAME, url: `${SITE_ORIGIN}/` }
  if (page.kind === 'hub') {
    return [{ '@context': context, '@type': 'CollectionPage', name: page.title, description: page.description, url, isPartOf: website, publisher: ORGANIZATION }]
  }
  const crumbs: SeoCrumb[] = [{ name: HUB_NAME, path: HUB_PATH }, ...(page.parent ? [page.parent] : []), { name: page.name, path: page.path }]
  const breadcrumbs = {
    '@context': context,
    '@type': 'BreadcrumbList',
    itemListElement: crumbs.map((c, i) => ({ '@type': 'ListItem', position: i + 1, name: c.name, item: absoluteUrl(c.path) })),
  }
  const about =
    page.kind === 'concept' ? { '@type': 'DefinedTerm', name: page.name }
      : page.kind === 'resource' ? workJsonLd(page)
        : undefined
  const main = {
    '@context': context,
    '@type': 'LearningResource',
    name: page.kind === 'exam' ? `${page.name} study guide` : page.name,
    description: page.description,
    url,
    inLanguage: 'en',
    ...(page.kind === 'exam' ? { learningResourceType: 'Study guide', educationalUse: 'Exam preparation' } : {}),
    ...(about ? { about } : {}),
    isPartOf: website,
    publisher: ORGANIZATION,
  }
  return [main, breadcrumbs]
}

/** Everything the document head should say for one described page. */
export function pageHead(page: SeoPage): PageHead {
  const canonical = absoluteUrl(page.path)
  return {
    title: page.title,
    description: page.description,
    canonical,
    noindex: page.noindex,
    ogType: page.kind === 'hub' ? 'website' : 'article',
    jsonLd: pageJsonLd(page, canonical),
  }
}

const STATIC_TITLES: Record<string, string> = {
  '/': DEFAULT_TITLE,
  '/auth': `Sign In | ${SITE_NAME}`,
  '/auth/callback': SITE_NAME,
  '/quiz': `Practice Questions | ${SITE_NAME}`,
  '/review': `Review | ${SITE_NAME}`,
  '/dashboard': `Dashboard | ${SITE_NAME}`,
  '/search': `Search | ${SITE_NAME}`,
  '/flashcards': `Flashcards | ${SITE_NAME}`,
  '/settings': `Settings | ${SITE_NAME}`,
  '/upgrade': `Upgrade | ${SITE_NAME}`,
  '/store': `Store | ${SITE_NAME}`,
  '/wiki': `SOA & CAS Actuarial Exam Study Guides | ${SITE_NAME}`,
}

/** Routes that are one reader's own state — never a search result. */
const PRIVATE_ROUTES = new Set(['/auth/callback', '/review', '/settings'])

/**
 * The head a route gets before (or without) its page's own description: its
 * name, the site's description, and its canonical URL when it has one. A wiki
 * page's is its name read back off the URL; the page replaces it with the full
 * record once its chunk has loaded.
 */
export function fallbackHead(pathname: string): PageHead {
  const path = pathname.length > 1 ? pathname.replace(/\/+$/, '') : pathname
  const wiki = /^\/wiki\/(exam|concept|resource)\/(.+)$/.exec(path)
  if (wiki) {
    const kind = wiki[1] as 'exam' | 'concept' | 'resource'
    let name: string
    try {
      name = fromSlug(wiki[2]!)
    } catch {
      return { title: SITE_NAME, description: DEFAULT_DESCRIPTION, noindex: true }
    }
    return {
      title: kind === 'exam' ? `${examDisplayName(name)} Study Guide & Syllabus | ${SITE_NAME}` : `${name} | ${SITE_NAME}`,
      description: DEFAULT_DESCRIPTION,
      canonical: absoluteUrl(wikiRoute({ kind, name })),
      ogType: 'article',
    }
  }
  const title = STATIC_TITLES[path]
  if (!title) return { title: SITE_NAME, description: DEFAULT_DESCRIPTION }
  return {
    title,
    description: DEFAULT_DESCRIPTION,
    canonical: PRIVATE_ROUTES.has(path) ? undefined : absoluteUrl(path),
    noindex: PRIVATE_ROUTES.has(path) || undefined,
    ogType: 'website',
  }
}

/**
 * A route that names nothing — an unknown path, a wiki page that won't load.
 * The app answers those 200, so without this they would be indexed as pages.
 */
export const NOT_FOUND_HEAD: PageHead = {
  title: `Page not found | ${SITE_NAME}`,
  description: DEFAULT_DESCRIPTION,
  noindex: true,
}

export function escapeHtml(text: string): string {
  return text
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
}

/** JSON for a <script> body: `<` escaped so no string can close the tag. */
export function jsonForScript(value: unknown): string {
  return JSON.stringify(value).replace(/</g, '\\u003c')
}

/**
 * The head as HTML — what the build writes between the `page-head` markers of
 * each page's static file. `lib/documentHead.ts` writes the same tags live;
 * the two must name the same elements, or a page would carry both.
 */
export function headTagsHtml(head: PageHead): string {
  const tags = [
    `<title>${escapeHtml(head.title)}</title>`,
    `<meta name="description" content="${escapeHtml(head.description)}" />`,
    head.noindex ? '<meta name="robots" content="noindex" />' : '',
    head.canonical ? `<link rel="canonical" href="${escapeHtml(head.canonical)}" />` : '',
    `<meta property="og:site_name" content="${SITE_NAME}" />`,
    `<meta property="og:type" content="${head.ogType ?? 'website'}" />`,
    `<meta property="og:title" content="${escapeHtml(head.title)}" />`,
    `<meta property="og:description" content="${escapeHtml(head.description)}" />`,
    head.canonical ? `<meta property="og:url" content="${escapeHtml(head.canonical)}" />` : '',
    `<meta property="og:image" content="${SITE_LOGO}" />`,
    '<meta name="twitter:card" content="summary" />',
    head.jsonLd?.length ? `<script type="application/ld+json" data-page-jsonld>${jsonForScript(head.jsonLd)}</script>` : '',
  ]
  return tags.filter(Boolean).join('\n    ')
}

function xmlEscape(text: string): string {
  return text
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&apos;')
}

/** A sitemap of absolute URLs, one per path. */
export function sitemapXml(paths: string[]): string {
  const urls = paths.map(p => `  <url><loc>${xmlEscape(absoluteUrl(p))}</loc></url>`)
  return `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${urls.join('\n')}\n</urlset>\n`
}
