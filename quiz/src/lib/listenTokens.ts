// Turn a concept's markdown into an ordered token model that drives the Listen
// view. Each token carries both how it is *displayed* (a word, or rendered
// KaTeX) and how it is *spoken*. Both speech engines (browser Web Speech and the
// premium cloud TTS) consume the same tokens so the word-highlighting logic is
// engine-agnostic.

import { stripFrontmatter, BREADCRUMB_RE } from '@/components/wiki/WikiArticle'
import { cleanWikiLinks } from '@/lib/wikiParser'
import { latexToSpeech } from '@/lib/mathSpeech'

export interface WordToken {
  type: 'word'
  index: number
  /** Word as shown on screen (original casing/punctuation). */
  text: string
  /** What is sent to the speech engine. */
  speech: string
}

export interface MathToken {
  type: 'math'
  index: number
  /** Raw LaTeX (no `$` delimiters) for KaTeX rendering. */
  latex: string
  /** True for `$$…$$` display math, false for inline `$…$`. */
  display: boolean
  speech: string
}

export type InlineToken = WordToken | MathToken

export type BlockKind = 'h1' | 'h2' | 'h3' | 'p' | 'li' | 'math'

export interface ListenBlock {
  kind: BlockKind
  tokens: InlineToken[]
  /** List nesting depth (0-based), only for `li`. */
  depth?: number
  ordered?: boolean
}

export interface ListenContent {
  blocks: ListenBlock[]
  /** Flat, in-order list of every token (same objects referenced by blocks). */
  tokens: InlineToken[]
}

// $$…$$ (display) or $…$ (inline, non-empty, no surrounding whitespace).
const MATH_SPLIT_RE = /(\$\$[\s\S]*?\$\$|\$(?!\s)(?:\\\$|[^$\n])*?(?<!\s)\$)/g

function stripInlineMarkup(text: string): string {
  return text
    .replace(/`([^`]*)`/g, '$1')   // inline code
    .replace(/[*~]/g, '')          // bold / italic / strikethrough markers
    .replace(/<[^>]+>/g, '')       // stray inline HTML
    .replace(/\$/g, '')            // leftover lone dollar signs (currency)
    .replace(/\s+/g, ' ')
}

// Parse one line of inline text (already de-listed / de-headed) into tokens,
// appending to `out` and assigning sequential indices via the counter.
function parseInline(text: string, out: InlineToken[], next: () => number): InlineToken[] {
  const tokens: InlineToken[] = []
  const parts = text.split(MATH_SPLIT_RE)
  for (const part of parts) {
    if (!part) continue
    const isDisplay = part.startsWith('$$') && part.endsWith('$$') && part.length > 4
    const isInline = !isDisplay && part.startsWith('$') && part.endsWith('$') && part.length > 2
    if (isDisplay || isInline) {
      const latex = isDisplay ? part.slice(2, -2).trim() : part.slice(1, -1).trim()
      const speech = latexToSpeech(latex)
      const token: MathToken = { type: 'math', index: next(), latex, display: isDisplay, speech }
      tokens.push(token)
      out.push(token)
    } else {
      const cleaned = stripInlineMarkup(part)
      for (const word of cleaned.split(' ')) {
        if (!word) continue
        const token: WordToken = { type: 'word', index: next(), text: word, speech: word }
        tokens.push(token)
        out.push(token)
      }
    }
  }
  return tokens
}

const HEADING_RE = /^(#{1,6})\s+(.*)$/
const LIST_RE = /^(\s*)([-*+]|\d+[.)])\s+(.*)$/
const CALLOUT_RE = /^\[!(\w+)\][-+]?\s*(.*)$/
const FENCE_RE = /^\s*```/

function capitalize(s: string): string {
  return s.charAt(0).toUpperCase() + s.slice(1)
}

// Recursively parse a block of markdown lines into Listen blocks. Blockquotes
// (including callouts and nested quotes) are de-quoted and parsed one level
// deeper so equations, prose and lists inside them are all read.
function parseBlocks(lines: string[], out: InlineToken[], next: () => number, depthBase = 0): ListenBlock[] {
  const blocks: ListenBlock[] = []
  let paragraph: string[] = []

  const flushParagraph = () => {
    if (paragraph.length === 0) return
    const text = paragraph.join(' ')
    const tokens = parseInline(text, out, next)
    if (tokens.length > 0) {
      // A paragraph that is only a single display equation reads better as its
      // own centered math block.
      if (tokens.length === 1 && tokens[0].type === 'math' && tokens[0].display) {
        blocks.push({ kind: 'math', tokens })
      } else {
        blocks.push({ kind: 'p', tokens })
      }
    }
    paragraph = []
  }

  for (let i = 0; i < lines.length; i++) {
    const line = lines[i]

    if (FENCE_RE.test(line)) {
      flushParagraph()
      // Skip the fenced code block entirely — reading code aloud is noise.
      i++
      while (i < lines.length && !FENCE_RE.test(lines[i])) i++
      continue
    }

    if (line.trim() === '') { flushParagraph(); continue }
    if (/^\s*(---|\*\*\*|___)\s*$/.test(line)) { flushParagraph(); continue }

    // Blockquote run (callouts, nested quotes, display math) — collect and recurse.
    if (/^\s*>/.test(line)) {
      flushParagraph()
      const quoted: string[] = []
      while (i < lines.length && /^\s*>/.test(lines[i])) {
        quoted.push(lines[i].replace(/^\s*>\s?/, ''))
        i++
      }
      i--
      // Turn a callout header into readable prose: "Example: Title".
      const dequoted = quoted.map(l => {
        const m = l.match(CALLOUT_RE)
        if (!m) return l
        const title = m[2].replace(/\{[^}]*\}/g, '').trim()
        return title ? `${capitalize(m[1])}: ${title}` : `${capitalize(m[1])}.`
      })
      blocks.push(...parseBlocks(dequoted, out, next, depthBase))
      continue
    }

    const heading = line.match(HEADING_RE)
    if (heading) {
      flushParagraph()
      const level = heading[1].length
      const kind: BlockKind = level === 1 ? 'h1' : level === 2 ? 'h2' : 'h3'
      const tokens = parseInline(heading[2], out, next)
      if (tokens.length > 0) blocks.push({ kind, tokens })
      continue
    }

    const list = line.match(LIST_RE)
    if (list) {
      flushParagraph()
      const depth = depthBase + Math.floor(list[1].replace(/\t/g, '  ').length / 2)
      const ordered = /\d/.test(list[2])
      const tokens = parseInline(list[3], out, next)
      if (tokens.length > 0) blocks.push({ kind: 'li', tokens, depth, ordered })
      continue
    }

    paragraph.push(line)
  }

  flushParagraph()
  return blocks
}

/** Build the renderable + speakable token model from concept markdown. */
export function buildListenContent(markdown: string): ListenContent {
  const cleaned = cleanWikiLinks(
    stripFrontmatter(markdown)
      .replace(BREADCRUMB_RE, '')
      .replace(/!\[\[[^\]]*\]\]/g, '')                 // image / note embeds
      .replace(/!\[[^\]]*\]\([^)]*\)/g, '')            // markdown images
      .replace(/\[([^\]]+)\]\([^)]*\)/g, '$1')         // markdown links → text
      .replace(/^<div\b[\s\S]*?<\/div>\s*$/gm, ''),    // block-level HTML
  )
  const out: InlineToken[] = []
  let counter = 0
  const next = () => counter++
  const blocks = parseBlocks(cleaned.split('\n'), out, next)
  return { blocks, tokens: out }
}

export interface SpeechSegment {
  /** Concatenated speech text for a single utterance / TTS request. */
  text: string
  /** Per-token character ranges within `text`, for boundary → token mapping. */
  ranges: Array<{ index: number; start: number; end: number }>
}

/**
 * Group tokens into utterance-sized segments (one per block) so speech has
 * natural prosody and each segment exposes the char offsets needed to map a
 * speech boundary event back to the token being spoken.
 */
export function toSegments(blocks: ListenBlock[]): SpeechSegment[] {
  const segments: SpeechSegment[] = []
  for (const block of blocks) {
    const ranges: SpeechSegment['ranges'] = []
    let text = ''
    for (const token of block.tokens) {
      const speech = token.speech.trim()
      if (!speech) continue
      if (text) text += ' '
      const start = text.length
      text += speech
      ranges.push({ index: token.index, start, end: text.length })
    }
    if (ranges.length > 0) segments.push({ text, ranges })
  }
  return segments
}

// XML-escape for SSML payloads.
function xmlEscape(s: string): string {
  return s
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
}

/**
 * Build SSML for the premium cloud path: a `<mark>` is emitted before each
 * token so the API's returned timepoints can be mapped back to token indices.
 */
export function segmentsToSsml(segments: SpeechSegment[]): string {
  const parts: string[] = []
  for (const seg of segments) {
    for (const r of seg.ranges) {
      const speech = seg.text.slice(r.start, r.end)
      parts.push(`<mark name="t${r.index}"/>${xmlEscape(speech)}`)
    }
    parts.push('<break time="350ms"/>')
  }
  return `<speak>${parts.join(' ')}</speak>`
}
