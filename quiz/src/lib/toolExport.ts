/**
 * A tool run as a workbook (docs/actuarial-tools.md §6.3): the result table,
 * the inputs, the working, and what the run was — tool, version, input hash,
 * judgments with whether each was left at its default, warnings and the
 * method's pages — so the export can be filed as a workpaper and re-performed.
 * Numbers go in unrounded; rounding is the spreadsheet's business.
 */

import type { ResultTable, ToolResult, ToolSpec, Triangle, TableRow } from '@/lib/tools'
import type { CellValue, Sheet } from '@/lib/xlsx'

const cell = (v: unknown): CellValue => (typeof v === 'number' || typeof v === 'string' || typeof v === 'boolean' ? v : v == null ? null : JSON.stringify(v))

function tableSheet(name: string, table: ResultTable): Sheet {
  const keys = table.columns.map(c => c.key)
  const rows = table.rows.map(r => keys.map(k => cell(r[k])))
  if (table.footer) rows.push(keys.map(k => cell(table.footer![k])))
  return { name, columns: table.columns.map(c => c.label || c.key), rows }
}

export function toolResultSheets(spec: ToolSpec, result: ToolResult): Sheet[] {
  const sheets: Sheet[] = []
  if (result.table) sheets.push(tableSheet('Result', result.table))
  if (result.tiles.length) {
    sheets.push({ name: 'Headline', columns: ['Result', 'Value'], rows: result.tiles.map(t => [`${t.symbol} ${t.label}`, t.value]) })
  }

  const inputs: CellValue[][] = []
  for (const f of spec.fields) {
    const v = result.input[f.key]
    if (f.kind === 'table') {
      const rows = v as TableRow[]
      sheets.push({ name: f.label, columns: f.columns.map(c => c.label), rows: rows.map(r => f.columns.map(c => cell(r[c.key]))) })
    } else if (f.kind === 'triangle') {
      const t = v as Triangle
      sheets.push({ name: f.label, columns: ['Origin', ...t.ages.map(String)], rows: t.values.map((row, i) => [t.origins[i], ...row]) })
    } else {
      inputs.push([f.label, cell(v)])
    }
  }
  if (inputs.length) sheets.splice(result.table ? 1 : 0, 0, { name: 'Inputs', columns: ['Input', 'Value'], rows: inputs })

  sheets.push({
    name: 'Working',
    columns: ['Step', 'Formula', 'Result'],
    rows: result.trace.map(s => [s.label, s.formula, s.result]),
  })

  sheets.push({
    name: 'About this run',
    columns: ['', ''],
    rows: [
      ['Tool', `${spec.name} (${result.tool})`],
      ['Answers', spec.answers],
      ['Tool version', result.version],
      ['Engine version', result.engine],
      ['Input hash', result.inputHash],
      ['Summary', result.summary],
      ...result.judgments.map(j => [`Judgment: ${j.label}`, `${cell(j.value)}${j.default ? ' (default — not chosen)' : ''}`] as CellValue[]),
      ...result.warnings.map(w => ['Warning', w] as CellValue[]),
      ...result.method.concepts.map(c => ['Method', c] as CellValue[]),
      ...result.method.readings.map(r => ['Reading', `${r.resource}, ${r.locator}`] as CellValue[]),
      ['Note', 'A calculation for review, not an actuarial opinion. Every judgment above is the user\'s to make.'],
    ],
  })
  return sheets
}

/** The `run_tool` call an agent would make for this input — the card's "Copy for AI". */
export function runToolCall(spec: ToolSpec, input: Record<string, unknown>): string {
  return JSON.stringify({ tool: spec.id, input }, null, 2)
}
