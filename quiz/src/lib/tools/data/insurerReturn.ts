import { ToolInputError, type ChoiceField, type TableRow, type ToolSpec } from '../types'
import {
  MCT_LINES,
  NOT_LOADED,
  filedRefOf,
  filedValue,
  filersIn,
  filingLine,
  filingPeriods,
  filingsInstalled,
  institutionName,
  isBranch,
  isRatioLine,
  periodLabel,
} from '../filings'

/**
 * Insurer Return (docs/osfi-tools-design.md, design C): what one insurer filed
 * with OSFI on one line of PC4 page 10.00, the Minimum Capital Test's summary,
 * for one quarter. It computes nothing (docs/actuarial-tools.md §4.11): the
 * value is the filing's, labelled by OSFI, and it hands its lines on as filed
 * references, so the next tool records which filing each came from.
 *
 * Its choices are read off the installed filings (`../filings.ts`), so they are
 * getters: the insurers and quarters on file, whatever edition is installed.
 */

/** "140 · Ratio (Line 10 or line 25 as a % of line 130)". */
const lineLabel = (address: string) => {
  const l = filingLine(address)
  return l ? `${l.line} · ${l.en}` : address
}

const insurer: ChoiceField = {
  kind: 'choice',
  key: 'insurer',
  label: 'Insurer',
  description: "The insurer, by OSFI's institution id (or its name as OSFI files it). Every federally regulated P&C insurer that filed PC4 in a quarter on file is an option.",
  get options() {
    const file = filingsInstalled()
    if (!file) return []
    return Object.entries(file.institutions)
      .map(([id, i]) => ({ value: id, label: i.en }))
      .sort((a, b) => a.label.localeCompare(b.label))
  },
  // A neutral first pick: the first insurer by name in the newest quarter (no ranking — docs/osfi-pc-data.md §2 rule 7).
  get default() {
    return filersIn(filingPeriods()[0] ?? '')[0] ?? ''
  },
}

const quarter: ChoiceField = {
  kind: 'choice',
  key: 'quarter',
  label: 'Quarter',
  description: 'The quarter filed, as YYYYQn (2026Q2). The IFRS 17 quarters from 2023Q1 are on file.',
  get options() {
    return filingPeriods().map(p => ({ value: p, label: periodLabel(p) }))
  },
  get default() {
    return filingPeriods()[0] ?? ''
  },
}

const line: ChoiceField = {
  kind: 'choice',
  key: 'line',
  label: 'Line',
  description: "The line of PC4 page 10.00, by its address (P100014001 is line 140, the ratio). OSFI's own labels name each.",
  get options() {
    return (filingsInstalled()?.lines ?? []).map(l => ({ value: l.address, label: lineLabel(l.address) }))
  },
  default: MCT_LINES.ratio,
}

export const insurerReturn: ToolSpec = {
  id: 'data.insurer_return',
  version: '1.0.0',
  name: 'Insurer Return',
  area: 'data',
  answers: 'What did this insurer file with OSFI?',
  aka: ['OSFI', 'PC4', 'regulatory return', 'filed MCT', 'BAAT', 'Minimum Capital Test', 'insurer filing', 'capital available'],
  fields: [insurer, quarter, line],
  notation: () => 'OSFI PC4, page 10.00: the line as filed',
  view: 'table',
  compute: input => {
    const file = filingsInstalled()
    if (!file) throw new ToolInputError('insurer', NOT_LOADED)
    const id = String(input.insurer)
    const period = String(input.quarter)
    const address = String(input.line)
    const name = institutionName(id) ?? id
    if (filedValue(period, id, MCT_LINES.ratio) === null && filedValue(period, id, MCT_LINES.minimum) === null) {
      const filed = filingPeriods().filter(p => filedValue(p, id, MCT_LINES.minimum) !== null)
      throw new ToolInputError('quarter', filed.length
        ? `${name} filed no PC4 for ${periodLabel(period)}. It filed for ${filed.map(periodLabel).reverse().join(', ')}.`
        : `${name} filed no PC4 in the quarters on file.`)
    }
    const read = (a: string) => filedValue(period, id, a) ?? 0
    const branch = isBranch(id)
    const test = branch ? 'BAAT' : 'MCT'
    const asTile = (a: string) => (isRatioLine(a) ? read(a) / 100 : read(a))
    const l = filingLine(address)
    if (!l) throw new ToolInputError('line', `${address} isn't a line of PC4 page ${file.page}.`)
    const filedRow = file.periods.find(p => p.period === period)?.values[id] ?? []
    const blank = filedRow[file.lines.indexOf(l)] == null
    const rows: TableRow[] = file.lines
      .filter(x => filedValue(period, id, x.address) !== 0)
      .map(x => ({ line: x.line, label: x.en, value: read(x.address), unit: isRatioLine(x.address) ? '%' : '$000' }))
    // The same line in every quarter this insurer filed: the figure's history, read, never joined across a gap.
    const history = filingPeriods().slice().reverse()
      .map(p => ({ period: p, value: filedValue(p, id, address) }))
      .filter((p): p is { period: string; value: number } => p.value !== null)
    const tiles = [
      { symbol: l.line, label: l.en, value: asTile(address), unit: isRatioLine(address) ? 'percent' as const : 'money' as const },
      ...(address !== MCT_LINES.ratio ? [{ symbol: test, label: `${test} ratio`, value: asTile(MCT_LINES.ratio), unit: 'percent' as const }] : []),
    ]
    const ref = (a: string) => ({ filed: filedRefOf(period, id, a) })
    const shown = isRatioLine(address) ? `${read(address)}%` : `$${read(address).toLocaleString('en-US')}k`
    return {
      tiles,
      table: {
        columns: [
          { key: 'line', label: 'Line', kind: 'text' },
          { key: 'label', label: "OSFI's label", kind: 'text' },
          { key: 'value', label: 'As filed', kind: 'number', unit: 'plain', computed: true },
          { key: 'unit', label: 'Unit', kind: 'text' },
        ],
        rows,
      },
      trace: [
        { label: `Read off: ${file.return_title}, page ${l.page}, line ${l.line} (${address})`, formula: `${name}, ${periodLabel(period)}: "${l.en}"`, result: read(address), unit: 'plain' },
      ],
      warnings: blank ? [`${name} published nothing on line ${l.line} for ${periodLabel(period)}; OSFI publishes only non-zero cells, so it reads as zero.`] : [],
      values: {
        value: read(address),
        filed: filedRefOf(period, id, address),
        institution: id,
        name,
        period,
        address,
        line: l.line,
        label: l.en,
        label_fr: l.fr,
        test,
        history_periods: history.map(h => h.period),
        history: history.map(h => h.value),
        handoff: {
          test: branch ? 'baat' : 'mct',
          capital: ref(branch ? MCT_LINES.netAssets : MCT_LINES.capital),
          insurance: ref(MCT_LINES.insurance),
          market: ref(MCT_LINES.market),
          credit: ref(MCT_LINES.credit),
          operational: ref(MCT_LINES.operational),
        },
      },
      summary: `${name} filed ${shown} on ${file.return} page ${l.page} line ${l.line} ("${l.en}") for ${periodLabel(period)}, as filed with OSFI. ${file.licence.attribution}`,
    }
  },
  method: {
    concepts: ['MCT', 'Capital Available'],
    readings: [{ resource: 'OSFI MCT', locator: 'Ch. 1' }],
  },
  next: [
    {
      tool: 'capital.mct_ratio',
      label: 'MCT Ratio',
      build: (_input, output) => (output.values.handoff ?? {}) as Record<string, never>,
    },
  ],
}
