import type { TableField, TableRow, ToolHandoff, ToolInput, ToolSpec } from '../types'

/**
 * Hand-offs that carry one column of an origin table (docs/tool-template-v3.md
 * §4): the next tool's rows are the reader's own where it has them (`into`),
 * else its example, with that one column laid over them. Nothing else in a row
 * is touched, so a CDF arriving from Development to Ultimate never replaces the
 * latest values the reader typed into Chain Ladder.
 */

/** The rows a hand-off lays a column over: the receiver's own, else its example's. */
function baseRows(spec: ToolSpec, into: Partial<ToolInput> | undefined): TableRow[] {
  const own = into?.rows
  if (Array.isArray(own) && own.length) return own as TableRow[]
  const field = spec.fields.find(f => f.key === 'rows') as TableField | undefined
  return field ? field.default : []
}

/**
 * CDFs by position, as a triangle lays them out: the latest origin (the last
 * row) takes the first age's CDF, the one before it the second, and an origin
 * older than every age takes the last CDF (the one with the tail in it).
 */
export function cdfsOnto(rows: TableRow[], cdfs: number[]): TableRow[] {
  if (!cdfs.length) return rows
  return rows.map((r, i) => ({ ...r, cdf: cdfs[Math.min(rows.length - 1 - i, cdfs.length - 1)] }))
}

/** One value per origin, matched by origin name where every row's is in the source, else by position. */
export function byOriginOnto(rows: TableRow[], key: string, origins: string[], values: number[]): TableRow[] {
  const index = new Map(origins.map((o, k) => [o, k]))
  const named = rows.every(r => index.has(String(r.origin ?? '')))
  return rows.map((r, k) => {
    const v = values[named ? index.get(String(r.origin))! : k]
    return v == null ? r : { ...r, [key]: v }
  })
}

/** Development to Ultimate's CDFs into a method's origin table. */
export function cdfHandoff(spec: ToolSpec): ToolHandoff {
  return {
    tool: spec.id,
    label: spec.name,
    build: (_input, output, into) => ({ rows: cdfsOnto(baseRows(spec, into), output.values.cdfs as number[]) }),
  }
}

/** Expected Claims' expected claims, by origin, into a method that credibility-weights them. */
export function expectedHandoff(spec: ToolSpec): ToolHandoff {
  return {
    tool: spec.id,
    label: spec.name,
    build: (input, output, into) => {
      const origins = (input.rows as TableRow[]).map(r => String(r.origin ?? ''))
      return { rows: byOriginOnto(baseRows(spec, into), 'expected', origins, output.values.expected as number[]) }
    },
  }
}
