/**
 * One equation per formula box.
 *
 * The vault writes a formula box as a blockquote of one-line `$$…$$`
 * paragraphs (`> $$…$$`), and the app draws the whole blockquote as one box
 * (`CalloutBlockquote`). Authors often pack several equations into it — a
 * second `> $$…$$` line, or two equations on one line joined by
 * `, \qquad` — and on a phone the lot wraps into one unreadable run. This pass
 * gives every equation a box of its own.
 *
 * It runs at render time, on the markdown the app is about to parse, never on
 * the vault: a page's fact check is bound to its bytes (docs/verification.md,
 * P4), and how the app lays a formula out is not a fact about it.
 *
 * The rules, chosen so a split can only ever fall *between* equations:
 *
 * - Only a blockquote made of nothing but one-line `$$…$$` paragraphs is a
 *   formula box. A callout, or a quote with prose in it, is left alone.
 * - Inside one `$$…$$`, a split falls only at a separator at the top level —
 *   outside every brace, bracket, parenthesis, `\left…\right` and
 *   `\begin…\end` — : a comma or semicolon (with the spacing after it), a bare
 *   `\quad` / `\qquad`, or a `\\` line break.
 * - A line with an implication (`\implies`, `\Rightarrow`, …) is one
 *   statement and is never split, and an index range (`k = 1, 2, \ldots`)
 *   stays with the equation it qualifies.
 * - A piece is an equation only if it has a top-level `=` (or `\approx`,
 *   `\equiv`). A piece without one — a condition (`x > 0`), the rest of a list
 *   (`= 1, 2, 3`) — goes back on the piece before it, separator and all, so it
 *   reads exactly as written.
 * - A body whose brackets don't balance is never split.
 *
 * The separators dropped at a split are the only characters removed; no LaTeX
 * inside an equation is touched. Idempotent: a box holding one equation comes
 * back byte for byte.
 */

// An index range (`k = 1, 2, \ldots`, `i = 1, \dots, n`) qualifies the
// equation before it rather than being one of its own.
const QUALIFIER_RE = /^\\?[A-Za-z]+\s*=\s*[\w\s,+-]*\\[lc]?dots[\w\s,+-]*$/

const IMPLICATION_RE = /\\(?:implies|impliedby|iff|Longrightarrow|Rightarrow|Longleftrightarrow|Leftrightarrow)(?![a-zA-Z])/

// Spacing left at the end of a piece once its separator is cut away.
const TRAILING_SPACING_RE = /(?:\s|~|\\[ ,;:!]|\\q?quad(?![a-zA-Z]))+$/

const RELATION_RE = /^(?:=|\\approx(?![a-zA-Z])|\\equiv(?![a-zA-Z]))/

// Spacing a separator may carry after it: `\ `, `\,`, `\;`, `\:`, `\!`, `\quad`,
// `\qquad`, `~`, plain spaces.
const SPACING_RE = /^(?:\s|~|\\[ ,;:!]|\\q?quad(?![a-zA-Z]))*/

/** The separator starting at `i` of `body` (at the top level), or 0. */
function separatorLength(body: string, i: number): number {
  const rest = body.slice(i)
  let head = 0
  if (rest[0] === ',' || rest[0] === ';') head = 1
  else if (rest.startsWith('\\\\')) head = 2
  else {
    const m = /^\\q?quad(?![a-zA-Z])/.exec(rest)
    if (m) head = m[0].length
  }
  if (!head) return 0
  return head + (SPACING_RE.exec(rest.slice(head))?.[0].length ?? 0)
}

/**
 * Split one math body into equations. Returns `[body]` when there is nothing
 * to split (or it is unsafe to).
 */
export function splitEquations(body: string): string[] {
  // `A \implies B = 0, C = 1`: what follows the arrow hangs on what precedes
  // it, so the line is one statement.
  if (IMPLICATION_RE.test(body)) return [body]
  type Piece = { text: string; sep: string; relation: boolean }
  const pieces: Piece[] = []
  let depth = 0
  let env = 0
  let start = 0
  let relation = false
  let i = 0
  while (i < body.length) {
    const ch = body[i]
    if (ch === '\\') {
      const word = /^\\([a-zA-Z]+)/.exec(body.slice(i))
      if (word) {
        const name = word[1]
        if (name === 'begin') env++
        else if (name === 'end') env--
        else if (name === 'left' || name === 'langle') depth++
        else if (name === 'right' || name === 'rangle') depth--
        if (depth === 0 && env === 0 && i > start) {
          if (RELATION_RE.test(body.slice(i))) relation = true
          const len = separatorLength(body, i)
          if (len) {
            pieces.push({ text: body.slice(start, i), sep: body.slice(i, i + len), relation })
            start = i + len
            relation = false
            i += len
            continue
          }
        }
        // `\left(` is one opener, not two: step over the delimiter it names.
        if (name === 'left' || name === 'right') {
          i += word[0].length
          if (body[i] === '\\') i += 2
          else i += 1
          continue
        }
        i += word[0].length
        continue
      }
      // `\{` `\}` are brackets; any other escaped symbol (`\,`, `\\`, `\$`) is a
      // single token — but `\\` may be a separator.
      if (body[i + 1] === '{') depth++
      else if (body[i + 1] === '}') depth--
      else if (depth === 0 && env === 0 && i > start) {
        const len = separatorLength(body, i)
        if (len) {
          pieces.push({ text: body.slice(start, i), sep: body.slice(i, i + len), relation })
          start = i + len
          relation = false
          i += len
          continue
        }
      }
      i += 2
      continue
    }
    if (ch === '{' || ch === '(' || ch === '[') depth++
    else if (ch === '}' || ch === ')' || ch === ']') depth--
    else if (depth === 0 && env === 0) {
      if (ch === '=') relation = true
      else if (i > start) {
        const len = separatorLength(body, i)
        if (len) {
          pieces.push({ text: body.slice(start, i), sep: body.slice(i, i + len), relation })
          start = i + len
          relation = false
          i += len
          continue
        }
      }
    }
    if (depth < 0 || env < 0) return [body]
    i++
  }
  if (depth !== 0 || env !== 0) return [body]
  pieces.push({ text: body.slice(start), sep: '', relation })

  // Fold every piece that isn't an equation back onto the one before it (the
  // first ones onto the first equation), keeping its separator.
  const merged: Piece[] = []
  let pending = ''
  for (const p of pieces) {
    if (!p.relation) {
      if (merged.length) {
        const last = merged[merged.length - 1]
        last.text += last.sep + p.text
        last.sep = p.sep
      } else pending += p.text + p.sep
      continue
    }
    merged.push({ ...p, text: pending + p.text })
    pending = ''
  }
  if (pending && merged.length) merged[merged.length - 1].text += pending
  // An index range is a qualifier, not an equation: back onto the one before.
  for (let k = merged.length - 1; k > 0; k--) {
    if (!QUALIFIER_RE.test(merged[k].text.trim())) continue
    merged[k - 1].text += merged[k - 1].sep + merged[k].text
    merged[k - 1].sep = merged[k].sep
    merged.splice(k, 1)
  }
  if (merged.length < 2) return [body]
  return merged.map(p => p.text.replace(TRAILING_SPACING_RE, '').trim()).filter(Boolean)
}

/**
 * An `aligned` block of separate equations — every row with a left-hand side
 * of its own (`\text{Ceded premium} &= a \cdot P \\ \text{Ceded loss} &= a
 * \cdot X`) — as its rows, the alignment `&` dropped. A block with a
 * continuation row (`&= …`, `&\quad + …`) is one derivation and stays whole;
 * so does anything else (`null`).
 */
export function splitAlignedRows(body: string): string[] | null {
  const m = /^\s*\\begin\{aligned\}([\s\S]*)\\end\{aligned\}\s*$/.exec(body)
  if (!m || /\\begin\{/.test(m[1])) return null
  const rows: string[] = []
  let depth = 0
  let start = 0
  const inner = m[1]
  for (let i = 0; i < inner.length; i++) {
    const ch = inner[i]
    if (ch === '\\') {
      if (inner[i + 1] === '\\' && depth === 0) {
        rows.push(inner.slice(start, i))
        i += 2
        const gap = /^\s*\[[^\]]*\]/.exec(inner.slice(i))
        if (gap) i += gap[0].length
        start = i
        i--
        continue
      }
      i++
      continue
    }
    if (ch === '{') depth++
    else if (ch === '}') depth--
  }
  rows.push(inner.slice(start))
  const equations = rows.filter(r => r.trim())
  if (equations.length < 2) return null
  const out: string[] = []
  for (const row of equations) {
    const parts = row.split('&')
    if (parts.length !== 2 || !parts[0].trim() || !/^\s*=/.test(parts[1])) return null
    out.push(`${parts[0].trim()} ${parts[1].trim()}`)
  }
  return out
}

const FORMULA_LINE_RE = /^(\s*>)[ \t]?\$\$(.+)\$\$[ \t]*$/
const QUOTE_BLANK_RE = /^(\s*>)[ \t]*$/
const CODE_FENCE_RE = /^\s*(?:>\s*)*(?:```|~~~)/

/**
 * Split every formula box in `markdown` into one box per equation. Lines
 * outside formula boxes are returned unchanged.
 */
export function splitFormulaBoxes(markdown: string): string {
  if (!markdown.includes('$$')) return markdown
  const lines = markdown.split('\n')
  const out: string[] = []
  let inCode = false
  let i = 0
  while (i < lines.length) {
    const line = lines[i]
    if (CODE_FENCE_RE.test(line)) inCode = !inCode
    if (inCode || !/^\s*>/.test(line)) {
      out.push(line)
      i++
      continue
    }
    // The whole blockquote: every consecutive `>` line.
    let j = i
    while (j < lines.length && /^\s*>/.test(lines[j])) j++
    const group = lines.slice(i, j)
    i = j

    const marker = FORMULA_LINE_RE.exec(group[0])?.[1]
    const isBox =
      marker !== undefined &&
      !/^\s*>\s*>/.test(group[0]) &&
      group.every(l => {
        const m = FORMULA_LINE_RE.exec(l) ?? QUOTE_BLANK_RE.exec(l)
        return m !== null && m[1] === marker
      })
    if (!isBox) {
      out.push(...group)
      continue
    }
    const equations = group.flatMap(l => {
      const m = FORMULA_LINE_RE.exec(l)
      return m ? (splitAlignedRows(m[2]) ?? splitEquations(m[2])) : []
    })
    const formulaLines = group.filter(l => FORMULA_LINE_RE.test(l)).length
    if (equations.length === 1 && formulaLines === 1) {
      out.push(...group)
      continue
    }
    equations.forEach((eq, k) => {
      if (k > 0) out.push('')
      out.push(`${marker} $$${eq}$$`)
    })
  }
  return out.join('\n')
}
