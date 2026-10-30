/**
 * The tool card's draft — what a reader has typed, before the engine reads it
 * (docs/actuarial-tools.md §6.3). Pure and tested; `components/tools/` draws it.
 */

import { defaultInput, readNumber, type SourceRef, type ToolField, type ToolSpec } from '@/lib/tools'

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

/** A source's vault page name cut to its author and year: "… (Friedland - 2010)" → "Friedland (2010)". */
export function shortSource(resource: string): string {
  const m = /\(([^()]+?) - (\d{4})\)\s*$/.exec(resource)
  return m ? `${m[1]} (${m[2]})` : resource
}

/** One line of the card's "Tested against": a document (read in the app's reader) or a set of exam questions. */
export type SourceLink =
  | { kind: 'document'; url: string; title: string; label: string; subtitle: string; page?: number }
  | { kind: 'questions'; url: string; label: string }

/**
 * A tool's sources, one line per document — "Werner (2016), pp. 219, A-8, B-5,
 * C-7" rather than four buttons — and every exam question in one line that
 * opens them together in the quiz — one line per paper or sample set.
 */
export function groupSources(sources: SourceRef[]): SourceLink[] {
  const docs = new Map<string, SourceRef[]>()
  const questions: SourceRef[] = []
  for (const s of sources) {
    if (s.question) questions.push(s)
    else docs.set(s.url, [...(docs.get(s.url) ?? []), s])
  }
  const out: SourceLink[] = [...docs.values()].map(refs => {
    const first = refs[0]
    const short = shortSource(first.resource ?? first.title)
    const label = refs.length === 1
      ? `${short}, ${first.locator.replace('Chapter ', 'Ch. ')}, p. ${first.page}`
      : `${short}, pp. ${refs.map(r => r.page).join(', ')}`
    return { kind: 'document', url: first.url, title: first.title, label, page: first.pdfPage, subtitle: refs.map(r => `${r.locator}, p. ${r.page}`).join('; ') }
  })
  // One line per set of questions — "SOA Exam FM sample questions 26, 71",
  // "CAS Exam MAS-I, Fall 2019, questions 1, 23" — each opening them together in the quiz.
  const sets = new Map<string, SourceRef[]>()
  for (const q of questions) {
    const stem = q.title.replace(/\s*\d+$/, '')
    sets.set(stem, [...(sets.get(stem) ?? []), q])
  }
  for (const [stem, qs] of sets) {
    const numbers = qs.map(q => q.title.slice(stem.length).trim())
    out.push({
      kind: 'questions',
      url: `/quiz?ids=${qs.map(q => q.question).join(',')}`,
      label: qs.length > 1 ? `${stem.replace(/question$/, 'questions')} ${numbers.join(', ')}` : qs[0].title,
    })
  }
  return out
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

/**
 * A pasted block read as a whole triangle. With a header row (a blank or
 * worded corner over the ages) the first column is taken as the origins and
 * the first row as the ages, the way a triangle is laid out in Excel; without
 * one the block is values alone, and the triangle's own labels are kept where
 * there are enough of them (`fallback`), extended where there aren't.
 */
export function pastedTriangle(
  block: string[][],
  fallback: { origins: unknown[]; ages: unknown[] },
): { origins: string[]; ages: number[]; values: string[][] } | null {
  const rows = block.filter(r => r.some(c => c !== ''))
  if (!rows.length) return null
  const header = labelledTriangle(rows)
  let origins: string[]
  let ages: number[]
  let values: string[][]
  if (header) {
    ages = rows[0].slice(1).map(c => readNumber(c, false) ?? NaN)
    const data = rows.slice(1)
    origins = data.map(r => r[0])
    values = data.map(r => r.slice(1))
  } else {
    values = rows
    const width = Math.max(...rows.map(r => r.length))
    origins = rows.map((_, i) => String(fallback.origins[i] ?? nextLabel(fallback.origins, i)))
    ages = Array.from({ length: width }, (_, j) => Number(fallback.ages[j] ?? (Number(fallback.ages[fallback.ages.length - 1]) || 0) + 12 * (j - fallback.ages.length + 1)))
  }
  if (ages.some(a => !Number.isFinite(a))) return null
  const width = ages.length
  return { origins, ages, values: values.map(r => Array.from({ length: width }, (_, j) => r[j] ?? '')) }
}

/** Whether a block leads with a header row of ages under a blank or worded corner (and so has origins down its side). */
export function labelledTriangle(block: string[][]): boolean {
  const isNum = (c: string | undefined) => !!c && readNumber(c, false) !== null
  return block.length > 1 && !isNum(block[0][0]) && block[0].slice(1).some(isNum)
}

/** The label after a run of origins: the year after the last, or the next count. */
function nextLabel(origins: unknown[], i: number): string {
  const last = Number(origins[origins.length - 1])
  return Number.isFinite(last) ? String(last + (i - origins.length + 1)) : String(i + 1)
}

/** A pasted block's rows, less a header row of column names (no number in it) when one leads it. */
export function withoutHeader(block: string[][]): string[][] {
  if (block.length > 1 && block[0].every(c => c === '' || readNumber(c, false) === null) && block.slice(1).some(r => r.some(c => readNumber(c, false) !== null))) {
    return block.slice(1)
  }
  return block
}

/**
 * The tool page keeps the reader's inputs between visits (localStorage, on
 * this device only — R7): what's stored for a draft, or null when it is the
 * tool's own starting draft and there is nothing to keep.
 */
export function draftToStore(spec: ToolSpec, draft: Draft): string | null {
  const text = JSON.stringify(draft)
  return text === JSON.stringify(initialDraft(spec)) ? null : text
}

/** A stored draft read back over the tool's starting draft, or null for nothing usable. */
export function draftFromStore(spec: ToolSpec, stored: string | null): Draft | null {
  if (!stored) return null
  try {
    const parsed: unknown = JSON.parse(stored)
    if (!parsed || typeof parsed !== 'object' || Array.isArray(parsed)) return null
    // Judgments stay out unless the reader chose them, as `initialDraft` keeps them.
    return initialDraft(spec, parsed)
  } catch {
    return null
  }
}
