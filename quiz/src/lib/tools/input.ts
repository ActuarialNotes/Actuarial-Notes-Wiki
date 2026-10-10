/**
 * Lenient in, strict out (docs/actuarial-tools.md §5): whatever shape a person
 * pastes or an agent sends is normalised to the one canonical input before a
 * tool computes, and anything that can't be read is an error naming the field.
 */

import {
  ToolInputError,
  type ChoiceField,
  type FieldValue,
  type NumberField,
  type TableField,
  type TableRow,
  type ToolField,
  type ToolInput,
  type ToolSpec,
  type Triangle,
  type TriangleField,
} from './types'

export interface NormalizedInput {
  input: ToolInput
  /** Fields the caller didn't supply, filled from their defaults. */
  defaulted: string[]
  /** What was coerced or ignored on the way in. */
  notes: string[]
}

const isObject = (v: unknown): v is Record<string, unknown> => v !== null && typeof v === 'object' && !Array.isArray(v)

/** Read a number from 1200, "1,200", "$1,200" or "5%" (which, for a percent field, is 0.05). */
export function readNumber(raw: unknown, percent: boolean): number | null {
  if (typeof raw === 'number') return Number.isFinite(raw) ? raw : null
  if (typeof raw !== 'string') return null
  const text = raw.trim().replace(/[$€£,\s]/g, '')
  if (!text) return null
  const isPct = text.endsWith('%')
  const n = Number(isPct ? text.slice(0, -1) : text)
  if (!Number.isFinite(n)) return null
  return isPct && percent ? n / 100 : n
}

function numberField(f: NumberField, raw: unknown): number {
  const n = readNumber(raw, f.unit === 'percent')
  if (n === null) throw new ToolInputError(f.key, `"${f.key}" must be a number${f.unit === 'percent' ? ' (a decimal such as 0.05, or "5%")' : ''}.`)
  if (f.integer && !Number.isInteger(n)) throw new ToolInputError(f.key, `"${f.key}" must be a whole number.`)
  if (n < f.min || n > f.max) {
    const hint = f.unit === 'percent' && n / 100 >= f.min && n / 100 <= f.max ? ` Rates are decimals: write ${n / 100} or "${n}%".` : ''
    throw new ToolInputError(f.key, `"${f.key}" must be between ${f.min} and ${f.max}; got ${n}.${hint}`)
  }
  return n
}

function choiceField(f: ChoiceField, raw: unknown): string {
  const text = String(raw ?? '').trim().toLowerCase()
  const hit = f.options.find(o => o.value.toLowerCase() === text || o.label.toLowerCase() === text)
  if (!hit) throw new ToolInputError(f.key, `"${f.key}" must be one of: ${f.options.map(o => o.value).join(', ')}.`)
  return hit.value
}

function tableField(f: TableField, raw: unknown): TableRow[] {
  if (!Array.isArray(raw)) throw new ToolInputError(f.key, `"${f.key}" must be an array of rows, each with ${f.columns.map(c => c.key).join(', ')}.`)
  if (raw.length < f.minRows || raw.length > f.maxRows) {
    throw new ToolInputError(f.key, `"${f.key}" needs between ${f.minRows} and ${f.maxRows} rows; got ${raw.length}.`)
  }
  return raw.map((row, i) => {
    // A row may be an object keyed by column, or an array in column order.
    const cells = Array.isArray(row) ? Object.fromEntries(f.columns.map((c, j) => [c.key, row[j]])) : row
    if (!isObject(cells)) throw new ToolInputError(f.key, `Row ${i + 1} of "${f.key}" must be an object with ${f.columns.map(c => c.key).join(', ')}.`)
    const out: TableRow = {}
    for (const c of f.columns) {
      const value = cells[c.key]
      if (c.kind === 'text') {
        out[c.key] = value == null ? '' : String(value).trim()
        continue
      }
      if (value == null || value === '') {
        if (c.optional) {
          out[c.key] = null
          continue
        }
        throw new ToolInputError(f.key, `Row ${i + 1} of "${f.key}" is missing "${c.key}".`)
      }
      const n = readNumber(value, c.unit === 'percent')
      if (n === null) throw new ToolInputError(f.key, `Row ${i + 1} of "${f.key}": "${c.key}" must be a number; got ${JSON.stringify(value)}.`)
      out[c.key] = n
    }
    return out
  })
}

/**
 * A triangle from `{origins, ages, values}` or a bare matrix of values. Blanks
 * (null, "") end each origin's row; a value after a blank is an error, since
 * a triangle has no holes.
 */
export function triangleField(f: Pick<TriangleField, 'key'>, raw: unknown): Triangle {
  const shape = Array.isArray(raw) ? { values: raw } : raw
  if (!isObject(shape) || !Array.isArray(shape.values)) {
    throw new ToolInputError(f.key, `"${f.key}" must be {origins, ages, values} with values as rows of numbers (null below the diagonal), or just the rows.`)
  }
  const rows = shape.values as unknown[]
  if (rows.length < 2) throw new ToolInputError(f.key, `"${f.key}" needs at least two origins.`)
  const width = Math.max(...rows.map(r => (Array.isArray(r) ? r.length : 0)))
  if (width < 2) throw new ToolInputError(f.key, `"${f.key}" needs at least two ages.`)
  const values = rows.map((row, i) => {
    if (!Array.isArray(row)) throw new ToolInputError(f.key, `Row ${i + 1} of "${f.key}" must be an array of numbers.`)
    const out: (number | null)[] = []
    let ended = false
    for (let j = 0; j < width; j++) {
      const cell = row[j]
      if (cell == null || cell === '') {
        ended = true
        out.push(null)
        continue
      }
      const n = readNumber(cell, false)
      if (n === null) throw new ToolInputError(f.key, `"${f.key}" row ${i + 1}, column ${j + 1}: ${JSON.stringify(cell)} is not a number.`)
      if (ended) throw new ToolInputError(f.key, `"${f.key}" row ${i + 1} has a value after a blank; a triangle's rows run without gaps.`)
      out.push(n)
    }
    if (out[0] === null) throw new ToolInputError(f.key, `"${f.key}" row ${i + 1} is empty.`)
    return out
  })
  const origins = Array.isArray(shape.origins) && shape.origins.length === values.length
    ? shape.origins.map(o => String(o))
    : values.map((_, i) => String(i + 1))
  const ages = Array.isArray(shape.ages) && shape.ages.length === width
    ? shape.ages.map((a, j) => {
        const n = readNumber(a, false)
        if (n === null) throw new ToolInputError(f.key, `"${f.key}" age ${j + 1} is not a number.`)
        return n
      })
    : Array.from({ length: width }, (_, j) => (j + 1) * 12)
  return { origins, ages, values }
}

function readField(field: ToolField, raw: unknown): FieldValue {
  switch (field.kind) {
    case 'number': return numberField(field, raw)
    case 'choice': return choiceField(field, raw)
    case 'table': return tableField(field, raw)
    case 'triangle': return triangleField(field, raw)
  }
}

export function defaultValue(field: ToolField): FieldValue {
  if (field.kind === 'table') return field.default.map(row => ({ ...row }))
  if (field.kind === 'triangle') return { ...field.default, values: field.default.values.map(r => [...r]) }
  return field.default
}

export function defaultInput(spec: ToolSpec): ToolInput {
  return Object.fromEntries(spec.fields.map(f => [f.key, defaultValue(f)]))
}

/** Normalise a caller's input against a tool's fields. Throws `ToolInputError` on the first bad field. */
export function normalizeInput(spec: ToolSpec, raw: unknown): NormalizedInput {
  const given = isObject(raw) ? raw : {}
  if (raw != null && !isObject(raw)) throw new ToolInputError('input', 'The input must be an object keyed by field name.')
  const input: ToolInput = {}
  const defaulted: string[] = []
  const notes: string[] = []
  for (const field of spec.fields) {
    if (given[field.key] === undefined || given[field.key] === null) {
      input[field.key] = defaultValue(field)
      defaulted.push(field.key)
    } else {
      input[field.key] = readField(field, given[field.key])
    }
  }
  const known = new Set(spec.fields.map(f => f.key))
  for (const key of Object.keys(given)) {
    if (!known.has(key)) notes.push(`Ignored "${key}": ${spec.id} takes ${[...known].join(', ')}.`)
  }
  return { input, defaulted, notes }
}
