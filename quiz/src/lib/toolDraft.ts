/**
 * The tool card's draft — what a reader has typed, before the engine reads it
 * (docs/actuarial-tools.md §6.3). Pure and tested; `components/tools/` draws it.
 */

import { defaultInput, readNumber, type ToolField, type ToolSpec } from '@/lib/tools'

export type Draft = Record<string, unknown>

/**
 * The starting draft: every field's default except the judgments, which stay
 * out until the reader chooses them — so the engine reports them as defaults
 * (R3) rather than as choices nobody made. A run link's input is laid over it.
 */
export function initialDraft(spec: ToolSpec, given?: unknown): Draft {
  const defaults = defaultInput(spec) as Draft
  const draft: Draft = {}
  for (const f of spec.fields) if (!f.judgment) draft[f.key] = defaults[f.key]
  if (given && typeof given === 'object' && !Array.isArray(given)) {
    for (const f of spec.fields) {
      const v = (given as Draft)[f.key]
      if (v !== undefined && v !== null) draft[f.key] = v
    }
  }
  return draft
}

/** Whether a field is drawn: one with `showWhen` only while its controlling field holds one of its values. */
export function fieldVisible(spec: ToolSpec, f: ToolField, draft: Draft): boolean {
  if (!f.showWhen) return true
  const control = spec.fields.find(x => x.key === f.showWhen!.field) as { default?: unknown } | undefined
  return f.showWhen.in.includes(String(draft[f.showWhen.field] ?? control?.default ?? ''))
}

/** A clipboard block as rows of cells, or null for a single value (left to the browser to paste). */
export function parseClipboardBlock(text: string): string[][] | null {
  const lines = text.replace(/\r/g, '').split('\n')
  while (lines.length && lines[lines.length - 1].trim() === '') lines.pop()
  if (lines.length <= 1 && !lines[0]?.includes('\t')) return null
  return lines.map(line => line.split('\t').map(cell => cell.trim()))
}

export type TriangleMode = 'cumulative' | 'incremental'

const tidy = (n: number) => Math.round(n * 1e9) / 1e9

/** Cumulative rows → the mode's rows. A cell that isn't a number is passed through as typed. */
export function toMode(values: unknown[][], mode: TriangleMode): unknown[][] {
  if (mode === 'cumulative') return values.map(r => [...r])
  return values.map(row => {
    let prev: number | null = 0
    return row.map(cell => {
      const n = cell == null || cell === '' ? null : readNumber(cell, false)
      if (n === null || prev === null) {
        prev = null
        return cell
      }
      const inc = tidy(n - prev)
      prev = n
      return inc
    })
  })
}

/** The mode's rows → cumulative rows, the only shape the engine takes. */
export function fromMode(values: unknown[][], mode: TriangleMode): unknown[][] {
  if (mode === 'cumulative') return values.map(r => [...r])
  return values.map(row => {
    let sum: number | null = 0
    return row.map(cell => {
      if (cell == null || cell === '') return null
      const n = readNumber(cell, false)
      if (n === null || sum === null) {
        sum = null
        return cell
      }
      sum = tidy(sum + n)
      return sum
    })
  })
}
