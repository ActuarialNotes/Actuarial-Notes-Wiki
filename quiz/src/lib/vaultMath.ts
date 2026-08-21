/**
 * Normalise the vault's math delimiters into the exact shapes remark-math can
 * tokenise.
 *
 * The vault is authored in Obsidian, whose math parser is more forgiving than
 * the `remark-math` / micromark pipeline the app renders with. Two shapes are
 * written all over the concept pages, read correctly in Obsidian, and are
 * mis-tokenised here — both loudly, as red KaTeX error text on the page:
 *
 * 1. **An escaped dollar inside inline math** — `$\$400$`. Math text, like a
 *    code span, has no character escapes: the *first* `$` after the opener
 *    closes the span. `$\$400$` parses as the math `\`, the text `400`, and a
 *    fresh opener that runs on until the next `$` — swallowing the sentence
 *    after it as italic "math". Currency is everywhere in ratemaking examples,
 *    so this is the common one. Inside `$$…$$` a lone `$` is harmless (the
 *    closing fence is a run of two), so promoting the delimiters fixes the span
 *    without touching what the author wrote inside it.
 *
 * 2. **A multi-line `$$` block whose fence is not alone on its line** —
 *    `$$\begin{align*}` … `\end{align*}$$`. Flow math treats the rest of the
 *    opening line as the fence's *meta* and drops it, and only a line that is
 *    just `$$` closes the block. So the `\begin{align*}` is lost, the `\end` is
 *    not, and the block runs to the next bare `$$` or the end of the page.
 *
 * A third, rarer shape is fixed on the way past: a display-only environment
 * (`align*`, `gather*`, …) written on one line as `$$…$$`. That parses as
 * *inline* math — the vault's usual formula-box spelling — and KaTeX refuses
 * `align*` outside display mode. Giving it real fence lines makes it a display
 * block, which is what the environment needs.
 *
 * The rewrite is idempotent and only ever moves delimiters: no LaTeX body is
 * edited, and lines with no math are returned byte-for-byte.
 */

// Leading blockquote markers (`> `, `> > `, indented or not). Everything in the
// vault's examples lives inside callouts, so a fence usually carries one.
const BLOCKQUOTE_PREFIX_RE = /^(?:[ \t]*>[ \t]?)*/

const CODE_FENCE_RE = /^(?:```|~~~)/

// Environments KaTeX will only typeset in display mode.
const DISPLAY_ONLY_ENV_RE = /\\begin\{(?:align|alignat|gather|equation|multline|flalign)\*?\}/

/** Split a line into its blockquote prefix and the content after it. */
function splitPrefix(line: string): [prefix: string, body: string] {
  const prefix = BLOCKQUOTE_PREFIX_RE.exec(line)?.[0] ?? ''
  return [prefix, line.slice(prefix.length)]
}

/**
 * Promote `$…\$…$` to `$$…\$…$$`.
 *
 * Spans are read the way the author meant them — a `$` preceded by a backslash
 * is a dollar sign, not a delimiter — and only spans that actually contain an
 * escaped dollar are rewritten. Existing `$$…$$` spans are stepped over
 * untouched.
 */
export function promoteEscapedDollarMath(text: string): string {
  let out = ''
  let i = 0
  while (i < text.length) {
    if (text[i] === '\\' && text[i + 1] === '$') {
      out += text.slice(i, i + 2)
      i += 2
      continue
    }
    if (text.startsWith('$$', i)) {
      const end = fenceIndex(text, i + 2)
      if (end < 0) return out + text.slice(i)
      out += text.slice(i, end + 2)
      i = end + 2
      continue
    }
    if (text[i] === '$') {
      let j = i + 1
      while (j < text.length && !(text[j] === '$' && text[j - 1] !== '\\')) j++
      if (j >= text.length) return out + text.slice(i)
      const body = text.slice(i + 1, j)
      out += body.includes('\\$') ? `$$${body}$$` : `$${body}$`
      i = j + 1
      continue
    }
    out += text[i]
    i++
  }
  return out
}

/**
 * Index of the next `$$` fence at or after `from`, or -1.
 *
 * An escaped dollar is a dollar *sign*, so `\$$950$` is a literal `$` followed
 * by inline math — not a fence. Missing that reads a whole example paragraph as
 * the opening of a display block.
 */
function fenceIndex(body: string, from = 0): number {
  for (let i = from; i < body.length; i++) {
    if (body[i] === '\\' && body[i + 1] === '$') { i++; continue }
    if (body[i] === '$' && body[i + 1] === '$') return i
  }
  return -1
}

/** Every `$$` fence position on a line, escapes respected. */
function fencePositions(body: string): number[] {
  const found: number[] = []
  let at = fenceIndex(body)
  while (at >= 0) {
    found.push(at)
    at = fenceIndex(body, at + 2)
  }
  return found
}

export function normalizeVaultMath(markdown: string): string {
  if (!markdown.includes('$')) return markdown

  const lines = markdown.split('\n')
  const out: string[] = []
  let inCodeFence = false
  let inDisplay = false

  const push = (prefix: string, body: string) => out.push(prefix + body)

  for (const line of lines) {
    const [prefix, body] = splitPrefix(line)

    if (CODE_FENCE_RE.test(body)) {
      inCodeFence = !inCodeFence
      out.push(line)
      continue
    }
    if (inCodeFence) {
      out.push(line)
      continue
    }

    if (inDisplay) {
      const close = fenceIndex(body)
      if (close < 0) {
        out.push(line)
        continue
      }
      const before = body.slice(0, close)
      const after = body.slice(close + 2)
      if (before.trim()) push(prefix, before.trimEnd())
      push(prefix, '$$')
      inDisplay = false
      if (after.trim()) push(prefix, promoteEscapedDollarMath(after.trimStart()))
      continue
    }

    const fences = fencePositions(body)
    if (fences.length % 2 === 0) {
      const rewritten = promoteEscapedDollarMath(body)
      const single = /^\$\$([\s\S]+)\$\$$/.exec(rewritten.trim())
      // A display-only environment needs real fence lines, not the one-line
      // `$$…$$` the vault uses for its inline formula boxes.
      if (single && DISPLAY_ONLY_ENV_RE.test(single[1])) {
        push(prefix, '$$')
        push(prefix, single[1].trim())
        push(prefix, '$$')
        continue
      }
      push(prefix, rewritten)
      continue
    }

    // Odd number of fences: the last one opens a multi-line block. Anything
    // before it is ordinary text (with balanced fences of its own); anything
    // after it is the block's first line, not fence meta.
    const open = fences[fences.length - 1]
    const before = body.slice(0, open)
    const after = body.slice(open + 2)
    if (before.trim()) push(prefix, promoteEscapedDollarMath(before.trimEnd()))
    push(prefix, '$$')
    if (after.trim()) push(prefix, after.trimStart())
    inDisplay = true
  }

  return out.join('\n')
}
