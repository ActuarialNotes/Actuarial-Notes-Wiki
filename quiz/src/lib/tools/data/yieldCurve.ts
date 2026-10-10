import { ToolInputError, type ToolSpec } from '../types'
import { formatValue } from '../format'
import { YIELD_CURVES, provenance } from './datasets'

const CURVE = YIELD_CURVES[0]

export const yieldCurve: ToolSpec = {
  id: 'data.yield_curve',
  version: '1.0.0',
  name: 'Yield Curve',
  area: 'data',
  answers: 'What were interest rates on this date?',
  aka: ['Treasury', 'par yield', 'interest rates', 'term structure', 'risk-free rate'],
  fields: [
    {
      kind: 'choice', key: 'curve', label: 'Curve',
      description: `Which published curve: ${YIELD_CURVES.map(c => `${c.id} (${c.title}, ${c.publisher}). ${c.basis}`).join(' ')}`,
      options: YIELD_CURVES.map(c => ({ value: c.id, label: 'US Treasury par yields' })),
      default: CURVE.id,
    },
    { kind: 'date', key: 'date', label: 'As of', symbol: 'D', default: CURVE.curves[CURVE.curves.length - 1].date, description: 'The date: the curve read is the last one published on or before it (month-end, or the latest day of the month in progress).' },
    {
      kind: 'choice', key: 'term', label: 'Term',
      description: 'The term whose yield the result leads with, and Send to… carries on.',
      options: CURVE.term_labels.map(t => ({ value: t, label: t })),
      default: '10 Yr',
    },
  ],
  notation: () => 'par yield, nominal annual, convertible semiannually',
  view: 'table',
  compute: input => {
    const ds = YIELD_CURVES.find(c => c.id === input.curve)
    if (!ds) throw new ToolInputError('curve', `Unknown curve "${input.curve}".`)
    const date = String(input.date)
    const curve = [...ds.curves].reverse().find(c => c.date <= date)
    if (!curve) throw new ToolInputError('date', `This curve starts on ${ds.curves[0].date}.`)
    const k = ds.term_labels.indexOf(String(input.term))
    if (k < 0) throw new ToolInputError('term', `"${input.term}" is not one of this curve's terms: ${ds.term_labels.join(', ')}.`)
    const y = curve.yields[k]
    if (y == null) throw new ToolInputError('term', `The ${input.term} yield wasn't published on ${curve.date}.`)
    const at = (label: string) => curve.yields[ds.term_labels.indexOf(label)]
    const two = at('2 Yr')
    const ten = at('10 Yr')
    const rows = ds.terms.map((term, j) => ({ term: ds.term_labels[j], years: term, yield: curve.yields[j] })).filter(r => r.yield != null)
    return {
      tiles: [
        { symbol: `y(${input.term})`, label: curve.date, value: y, unit: 'percent' },
        ...(two != null && ten != null ? [{ symbol: '10Y − 2Y', label: 'Slope', value: ten - two, unit: 'percent' as const }] : []),
      ],
      table: {
        columns: [
          { key: 'term', label: 'Term', kind: 'text' },
          { key: 'yield', label: 'Par yield', kind: 'number', unit: 'percent', computed: true },
        ],
        rows,
      },
      trace: [{ label: `${input.term} par yield, ${curve.date}`, formula: provenance(ds), result: y, unit: 'percent' }],
      warnings: curve.date !== date ? [`The curve of ${curve.date}, the last published on or before ${date}.`] : [],
      values: {
        curve: ds.id,
        date: curve.date,
        terms: rows.map(r => r.years),
        term_labels: rows.map(r => r.term),
        yields: rows.map(r => r.yield),
        yield: y,
        term: ds.terms[k],
        basis: ds.basis,
        source: provenance(ds),
      },
      summary: `${input.term} par yield ${formatValue(y, 'percent')} on ${curve.date} (${ds.basis}) Source: ${provenance(ds)}`,
    }
  },
  method: {
    concepts: ['Yield Curve', 'Spot Rate'],
    readings: [],
  },
  next: [
    {
      tool: 'finance.interest_converter',
      label: 'Interest Converter',
      // A par yield is nominal, convertible semiannually: the converter gives its effective rate.
      build: (_input, output) => ({ form: 'nominal_interest', m: 2, rate: output.values.yield as number }),
    },
  ],
}
