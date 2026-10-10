import { ToolInputError, type ToolSpec } from '../types'
import { formatValue } from '../format'
import { LIFE_TABLES, provenance } from './datasets'

/** A table's name in the picker: where and when, and who published it. */
const tableLabel = (id: string) => {
  const ds = LIFE_TABLES.find(d => d.id === id)!
  return id.startsWith('nchs') ? `United States, ${ds.edition} (NCHS)` : `Canada, ${ds.edition} (Statistics Canada)`
}

export const lifeTable: ToolSpec = {
  id: 'data.life_table',
  version: '1.0.0',
  name: 'Life Table',
  area: 'data',
  answers: 'What does this published life table give at each age?',
  aka: ['mortality table', 'qx', 'life expectancy', 'survival probability', 'NCHS', 'Statistics Canada'],
  fields: [
    {
      kind: 'choice', key: 'table', label: 'Table',
      description: `Which published life table to read: ${LIFE_TABLES.map(d => `${d.id} (${d.title}, ${d.publisher})`).join('; ')}. Each is the publisher's own figures, extracted from its file.`,
      options: LIFE_TABLES.map(d => ({ value: d.id, label: tableLabel(d.id) })),
      default: LIFE_TABLES[0].id,
    },
    {
      kind: 'choice', key: 'sex', label: 'Population',
      description: 'The table for the whole population, or for males or females.',
      options: [{ value: 'total', label: 'All' }, { value: 'male', label: 'Male' }, { value: 'female', label: 'Female' }],
      default: 'total',
    },
    { kind: 'number', key: 'x', label: 'Age', symbol: 'x', unit: 'count', integer: true, min: 0, max: 110, sliderMax: 100, step: 1, default: 40, description: 'The age x, in years.' },
    { kind: 'number', key: 't', label: 'Years ahead', symbol: 't', unit: 'count', integer: true, min: 0, max: 110, sliderMax: 60, step: 1, default: 25, description: 'How many years ahead to look: the table is read from age x to x + t.' },
  ],
  notation: input => `ₜpₓ = l(x+t) / l(x), x = ${input.x}, t = ${input.t}`,
  view: 'table',
  compute: input => {
    const ds = LIFE_TABLES.find(d => d.id === input.table)
    if (!ds) throw new ToolInputError('table', `Unknown table "${input.table}".`)
    const col = ds.series[String(input.sex)]
    const x = Number(input.x)
    const t = Number(input.t)
    const last = ds.ages[ds.ages.length - 1]
    if (x > last) throw new ToolInputError('x', `This table stops at age ${last}${ds.last_age_open ? ' (and over)' : ''}.`)
    if (x + t > last) throw new ToolInputError('t', `x + t is ${x + t}, past the table's last age, ${last}${ds.last_age_open ? ' and over' : ''}.`)
    const k = ds.ages.indexOf(x)
    const rows = ds.ages.slice(k, k + t + 1).map((age, j) => ({ age, qx: col.qx[k + j], lx: col.lx[k + j], ex: col.ex[k + j] }))
    const survival = col.lx[k + t] / col.lx[k]
    return {
      tiles: [
        { symbol: `e${x}`, label: 'Life expectancy', value: col.ex[k], unit: 'years' },
        { symbol: `q${x}`, label: 'Dies within a year', value: col.qx[k], unit: 'plain' },
        { symbol: `${t}p${x}`, label: `Survives ${t} years`, value: survival, unit: 'plain' },
      ],
      table: {
        columns: [
          { key: 'age', label: 'Age x', kind: 'number', unit: 'count' },
          { key: 'qx', label: 'qₓ', kind: 'number', unit: 'plain', computed: true },
          { key: 'lx', label: 'lₓ', kind: 'number', unit: 'count', computed: true },
          { key: 'ex', label: 'eₓ', kind: 'number', unit: 'years', computed: true },
        ],
        rows,
      },
      trace: [
        { label: `l${x}, read from the table`, formula: provenance(ds), result: col.lx[k], unit: 'count' },
        { label: `l${x + t}, read from the table`, formula: provenance(ds), result: col.lx[k + t], unit: 'count' },
        { label: `${t}p${x}`, formula: `${formatValue(col.lx[k + t], 'count')} / ${formatValue(col.lx[k], 'count')}`, result: survival, unit: 'plain' },
      ],
      warnings: [],
      values: {
        table: ds.id,
        edition: ds.edition,
        ages: rows.map(r => r.age),
        qx: rows.map(r => r.qx),
        lx: rows.map(r => r.lx),
        ex: rows.map(r => r.ex),
        all_ages: ds.ages,
        all_qx: col.qx,
        survival,
        source: provenance(ds),
      },
      summary: `${tableLabel(ds.id)}, ${String(input.sex)}: e${x} ${formatValue(col.ex[k], 'years')} years, q${x} ${formatValue(col.qx[k], 'plain')}, ${t}p${x} ${formatValue(survival, 'plain')}. Source: ${provenance(ds)}`,
    }
  },
  method: {
    concepts: ['Life Table', 'Mortality'],
    readings: [],
  },
}
