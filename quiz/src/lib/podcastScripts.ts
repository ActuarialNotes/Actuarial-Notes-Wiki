// The daily podcast's scripts (docs/daily-podcast.md): what a voice is given
// for each concept, read off its page through the Listen pipeline
// (listenTokens → mathSpeech). Nothing is written or summarised by a model —
// it is the page's own definition, formulas, bullets, *The idea* and first
// exam trap, with fixed sentences around them.
//
// Imports are relative and nothing here reads Vite's env: the vite config
// builds the script hashes with this module (`virtual:podcast-scripts`), and
// the recorder (scripts/podcast-segments.mjs) bundles it.

import { buildListenContent, toSegments } from './listenTokens'
import { podcastSlug, scriptHash, type PodcastScriptHashes } from './podcast'


/** Spoken words in a brief's opening beyond its definition and formulas (bullets, later paragraphs). */
export const BRIEF_EXTRA_WORDS = 110
/** At most this many of the opening's bullets and later paragraphs are read. */
export const BRIEF_MAX_EXTRAS = 3
/** At most this many formula boxes are read — the defining ones come first. */
export const BRIEF_MAX_FORMULAS = 2

/** Markdown → what a voice is given: the Listen pipeline, one block per line. */
export function spokenText(markdown: string): string {
  return toSegments(buildListenContent(markdown).blocks).map(s => s.text).join('\n')
}

function wordCount(text: string): number {
  return text.split(/\s+/).filter(Boolean).length
}

/** Obsidian's inline footnotes, `^[…]` (brackets balanced, or to the end of the line), and `[^1]` refs. */
export function stripFootnotes(line: string): string {
  let out = ''
  for (let i = 0; i < line.length; i++) {
    if (line[i] === '^' && line[i + 1] === '[') {
      let depth = 0
      let j = i + 1
      for (; j < line.length; j++) {
        if (line[j] === '[') depth++
        else if (line[j] === ']' && --depth === 0) break
      }
      i = j
      continue
    }
    out += line[i]
  }
  return out.replace(/\[\^[^\]]+\]/g, '')
}

/** The page body: no frontmatter, no Obsidian comments, no footnotes. */
function pageBody(markdown: string): string[] {
  return markdown
    .replace(/^---\n[\s\S]*?\n---\n?/, '')
    .replace(/%%[\s\S]*?%%/g, '')
    .split('\n')
    .map(stripFootnotes)
}

interface OpeningUnit {
  kind: 'paragraph' | 'formula' | 'bullet'
  markdown: string
}

/**
 * The opening of a concept page, cut into units: the definition paragraph(s),
 * the formula boxes (`> $$…$$`) and the top-level bullets, up to the first
 * heading, callout, figure or block of HTML. That is the part a concept page
 * keeps for "what it is" (the actuarial-concept-definitions skill).
 */
export function openingUnits(markdown: string): OpeningUnit[] {
  const lines = pageBody(markdown)
  const units: OpeningUnit[] = []
  let i = 0
  // Skip a leading breadcrumb (`[[Exam]] / …`), a leading figure (`![[Media/Figures/…]]`,
  // which a concept page opens with — conceptRecipes' `pageOpening` skips it too) and blank lines.
  while (i < lines.length && (lines[i].trim() === '' || /^\[\[[^\]]*\]\][^\n]* \/ /.test(lines[i]) || /^\s*!\[\[[^\]]*\]\]\s*$/.test(lines[i]))) i++
  for (; i < lines.length; i++) {
    const line = lines[i]
    // A line that is all bold (`**Read More**`) is a heading by another name.
    if (/^#{1,6}\s/.test(line) || /^\*\*[^*]+\*\*:?\s*$/.test(line) || /^\s*>\s*\[!/.test(line) || /^\s*!\[/.test(line) || /^\s*<\w/.test(line) || /^\s*```/.test(line)) break
    if (line.trim() === '' || /^\s*(---|\*\*\*|___)\s*$/.test(line)) continue
    if (/^>/.test(line)) {
      const quoted: string[] = []
      while (i < lines.length && /^>/.test(lines[i])) quoted.push(lines[i++])
      i--
      units.push({ kind: 'formula', markdown: quoted.join('\n') })
      continue
    }
    const bullet = line.match(/^([-*+]|\d+[.)])\s+/)
    if (bullet) {
      // A top-level bullet; its indented sub-bullets and continuation lines are dropped.
      units.push({ kind: 'bullet', markdown: line })
      while (i + 1 < lines.length && /^\s+\S/.test(lines[i + 1])) i++
      continue
    }
    if (/^\s+[-*+]\s/.test(line)) continue
    const para: string[] = [line]
    while (i + 1 < lines.length && lines[i + 1].trim() !== '' && !/^([-*+]|\d+[.)])\s|^>|^#|^\s*!\[/.test(lines[i + 1])) para.push(lines[++i])
    units.push({ kind: 'paragraph', markdown: para.join('\n') })
  }
  return units
}

/** The body of the first top-level callout of `type` (optionally with a title matching `title`). */
function calloutBody(markdown: string, type: string, title?: RegExp): string[] | null {
  const lines = pageBody(markdown)
  const header = new RegExp(`^>\\s*\\[!${type}\\][-+]?\\s*(.*)$`, 'i')
  for (let i = 0; i < lines.length; i++) {
    const m = lines[i].match(header)
    if (!m || (title && !title.test(m[1]))) continue
    const body: string[] = []
    for (let j = i + 1; j < lines.length && /^>/.test(lines[j]); j++) body.push(lines[j].replace(/^>\s?/, ''))
    return body
  }
  return null
}

/** The page's `> [!idea] The idea` card, its own paragraphs only (no nested callouts). */
export function ideaMarkdown(markdown: string): string | null {
  const body = calloutBody(markdown, 'idea')
  if (!body) return null
  const own = body.filter(l => !/^>/.test(l))
  const text = own.join('\n').trim()
  return text || null
}

/** The first of the page's exam traps: the first bullet of `[!warning]- Exam traps`, or a `[!trap]` card. */
export function firstTrapMarkdown(markdown: string): string | null {
  const traps = calloutBody(markdown, 'warning', /exam traps/i)
  if (traps) {
    const first = traps.find(l => /^[-*+]\s+\S/.test(l))
    if (first) return first.replace(/^[-*+]\s+/, '')
  }
  const lines = pageBody(markdown)
  for (let i = 0; i < lines.length; i++) {
    const m = lines[i].match(/^>\s*\[!trap\][-+]?\s*(.*)$/i)
    if (!m) continue
    const body: string[] = []
    for (let j = i + 1; j < lines.length && /^>/.test(lines[j]); j++) {
      const l = lines[j].replace(/^>\s?/, '')
      if (!/^>/.test(l)) body.push(l)
    }
    const text = body.join(' ').replace(/\s+/g, ' ').trim()
    if (!text) continue
    return m[1].trim() ? `**${m[1].trim()}:** ${text}` : text
  }
  return null
}

/** The bullets "See also [[…]]" point elsewhere; they say nothing aloud. */
function isPointer(bullet: string): boolean {
  return /^([-*+]|\d+[.)])\s+(\*\*)?see( also)?\b/i.test(bullet.trim())
}

/**
 * A concept on today's plan, as a minute or so of audio: its name, its
 * definition, its first two formulas, a few of the opening's bullets (about
 * 110 words of them), *The idea* if the page has one, and its first exam
 * trap. Null for a page with no opening.
 */
export function briefScript(name: string, markdown: string): string | null {
  const units = openingUnits(markdown)
  const parts: string[] = []
  let definition = false
  let formulas = 0
  let extraWords = 0
  let extras = 0
  for (const unit of units) {
    if (unit.kind === 'paragraph' && !definition) {
      parts.push(spokenText(unit.markdown))
      definition = true
      continue
    }
    if (unit.kind === 'formula') {
      // Past the cap, stop: what follows a formula left out may refer to it.
      if (formulas++ >= BRIEF_MAX_FORMULAS) break
      parts.push(spokenText(unit.markdown))
      continue
    }
    if (isPointer(unit.markdown) || extras >= BRIEF_MAX_EXTRAS) continue
    const spoken = spokenText(unit.markdown)
    const words = wordCount(spoken)
    if (extras > 0 && extraWords + words > BRIEF_EXTRA_WORDS) continue
    parts.push(spoken)
    extraWords += words
    extras++
  }
  const opening = parts.filter(Boolean)
  if (opening.length === 0) return null
  const lines = [`${spokenText(name)}.`, ...opening]
  const idea = ideaMarkdown(markdown)
  if (idea) lines.push('The idea.', spokenText(idea))
  const trap = firstTrapMarkdown(markdown)
  if (trap) lines.push('One exam trap.', spokenText(trap))
  return lines.filter(Boolean).join('\n')
}

/** A concept worth a refresher: its name and its definition paragraph, nothing more. */
export function refresherScript(name: string, markdown: string): string | null {
  const definition = openingUnits(markdown).find(u => u.kind === 'paragraph')
  if (!definition) return null
  const spoken = spokenText(definition.markdown)
  return spoken ? `${spokenText(name)}.\n${spoken}` : null
}

export function buildScriptHashes(pages: Array<{ name: string; markdown: string }>): PodcastScriptHashes {
  const out: PodcastScriptHashes = {}
  for (const { name, markdown } of pages) {
    const brief = briefScript(name, markdown)
    const refresher = refresherScript(name, markdown)
    if (!brief && !refresher) continue
    out[podcastSlug(name)] = [brief ? scriptHash(brief) : null, refresher ? scriptHash(refresher) : null]
  }
  return out
}

