/**
 * **The cells a formula uses, in colour** — as a desktop spreadsheet shows
 * them while a formula is being edited: each reference in the entry line takes
 * a colour, and the cells it names are outlined in the same colour on the grid
 * (components/quiz/QuestionSheet.tsx, `FormulaRefBoxes`).
 *
 * A reference is a cell (`B3`, `$B$3`) or a block (`B3:C9`), outside a quoted
 * string, not part of a longer name (`LOG10(` is a function, not cell LOG10).
 * The same cell or block written twice takes one colour.
 */

/** Mid-tone hues: legible on the dark entry line and as an outline on the white grid. */
export const REF_COLORS = ['#3b82f6', '#ef4444', '#a855f7', '#16a34a', '#f59e0b', '#ec4899', '#0d9488'] as const

export interface FormulaRef {
  /** Where the reference sits in the formula. */
  start: number
  end: number
  /** The cells it covers, zero-based and inclusive. */
  top: number
  left: number
  bottom: number
  right: number
  color: string
}

/** The last column a sheet has: XFD. */
const MAX_COLUMN = 16383

function cell(ref: string): { row: number; column: number } | null {
  const m = /^\$?([A-Za-z]{1,3})\$?(\d{1,7})$/.exec(ref)
  if (!m) return null
  let column = 0
  for (const ch of m[1].toUpperCase()) column = column * 26 + (ch.charCodeAt(0) - 64)
  const row = Number(m[2])
  if (row < 1 || column - 1 > MAX_COLUMN) return null
  return { row: row - 1, column: column - 1 }
}

const REF = /(?<![A-Za-z0-9_.$!])(\$?[A-Za-z]{1,3}\$?\d{1,7})(?::(\$?[A-Za-z]{1,3}\$?\d{1,7}))?(?![A-Za-z0-9_(.!])/g

/** Every cell reference in a formula, in order, each with its colour. */
export function formulaRefs(formula: string): FormulaRef[] {
  if (!formula.startsWith('=')) return []
  const refs: FormulaRef[] = []
  const colors = new Map<string, string>()
  // Strings are skipped: "A1" in quotes is text.
  const parts = formula.split(/("(?:[^"]|"")*"?)/)
  let offset = 0
  for (const part of parts) {
    if (!part.startsWith('"')) {
      for (const m of part.matchAll(REF)) {
        const a = cell(m[1])
        const b = m[2] ? cell(m[2]) : a
        if (!a || !b) continue
        const box = {
          top: Math.min(a.row, b.row), bottom: Math.max(a.row, b.row),
          left: Math.min(a.column, b.column), right: Math.max(a.column, b.column),
        }
        const key = `${box.top},${box.left},${box.bottom},${box.right}`
        if (!colors.has(key)) colors.set(key, REF_COLORS[colors.size % REF_COLORS.length])
        const start = offset + (m.index ?? 0)
        refs.push({ start, end: start + m[0].length, ...box, color: colors.get(key)! })
      }
    }
    offset += part.length
  }
  return refs
}

/** The formula cut into runs of plain text and coloured references, for drawing. */
export function formulaRuns(formula: string): { text: string; color?: string }[] {
  const runs: { text: string; color?: string }[] = []
  let at = 0
  for (const ref of formulaRefs(formula)) {
    if (ref.start > at) runs.push({ text: formula.slice(at, ref.start) })
    runs.push({ text: formula.slice(ref.start, ref.end), color: ref.color })
    at = ref.end
  }
  if (at < formula.length) runs.push({ text: formula.slice(at) })
  return runs
}

/**
 * Fortune-sheet hands a cell's formula back as HTML, one span per token
 * (`getCellValue(…, { type: 'f' })`), with the text inside left unescaped.
 * This is the formula again.
 */
export function formulaText(html: string): string {
  return html.replace(/<span\b[^>]*>|<\/span>/g, '')
}
