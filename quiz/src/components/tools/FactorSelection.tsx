import { useMemo } from 'react'
import { formatValue, type ToolInput } from '@/lib/tools'
import { averageRows, type Selection } from '@/lib/toolColumns'
import { cn } from '@/lib/utils'

/**
 * The selection exhibit every reserving workpaper has (docs/actuarial-tools.md
 * §6.6), under Age-to-Age Factors' factor triangle: each average as a row, each
 * interval as a column, every value the engine's own run. Tapping a value
 * selects it for that interval; tapping an average's name selects it at every
 * interval. The **Selected** row says what each pick is and where it came from
 * — until the reader taps, it is the card's own average, marked as the default
 * (R3) — and it is what Send to… carries to Development to Ultimate.
 */
export function FactorSelection({
  input,
  intervals,
  averages,
  selections,
  onSelect,
}: {
  input: ToolInput
  intervals: string[]
  /** The card's own average at each interval: the selection until one is picked. */
  averages: (number | null)[]
  selections: (Selection | null)[]
  onSelect: (selections: (Selection | null)[]) => void
}) {
  const rows = useMemo(() => averageRows(input), [input])
  if (!rows.length || !intervals.length) return null

  const pick = (j: number, s: Selection) => onSelect(intervals.map((_, k) => (k === j ? s : selections[k] ?? null)))
  const pickRow = (label: string, values: (number | null)[]) =>
    onSelect(intervals.map((_, k) => (values[k] == null ? selections[k] ?? null : { value: values[k]!, from: label })))
  const isPicked = (j: number, label: string, v: number | null) => {
    const s = selections[j]
    return s != null && v != null && s.from === label && Math.abs(s.value - v) < 1e-12
  }

  return (
    <section className="space-y-1" aria-label="Selection">
      <h3 className="text-sm text-muted-foreground">Select</h3>
      <div className="overflow-x-auto rounded-lg border border-border">
        <table className="w-full border-collapse text-sm" data-testid="factor-selection">
          <thead>
            <tr className="border-b border-border text-xs text-muted-foreground">
              <th scope="col" className="sticky left-0 z-[1] bg-card px-2 py-1.5 text-left font-medium">Average</th>
              {intervals.map(label => (
                <th key={label} scope="col" className="px-2 py-1.5 text-right font-medium">{label}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {rows.map(row => (
              <tr key={row.label} className="border-b border-border/60">
                <th scope="row" className="sticky left-0 z-[1] bg-card p-0.5 text-left font-normal">
                  <button
                    type="button"
                    onClick={() => pickRow(row.label, row.values)}
                    aria-label={`Select ${row.label} at every age`}
                    className="whitespace-nowrap rounded px-1.5 py-1 text-xs text-muted-foreground hover:bg-accent hover:text-foreground"
                  >
                    {row.label}
                  </button>
                </th>
                {intervals.map((label, j) => {
                  const v = row.values[j]
                  const on = isPicked(j, row.label, v)
                  return (
                    <td key={label} className="p-0.5 text-right">
                      {v != null && (
                        <button
                          type="button"
                          onClick={() => pick(j, { value: v, from: row.label })}
                          aria-pressed={on}
                          aria-label={`${row.label}, ${label}: ${formatValue(v, 'factor')}`}
                          className={cn(
                            'w-full rounded px-1.5 py-1 text-right tabular-nums transition-colors',
                            on ? 'bg-primary text-primary-foreground' : 'hover:bg-accent',
                          )}
                        >
                          {formatValue(v, 'factor')}
                        </button>
                      )}
                    </td>
                  )
                })}
              </tr>
            ))}
          </tbody>
          <tfoot>
            <tr className="border-t border-border font-semibold">
              <th scope="row" className="sticky left-0 z-[1] bg-card px-2 py-1.5 text-left">Selected</th>
              {intervals.map((label, j) => {
                const s = selections[j]
                const v = s?.value ?? averages[j]
                return (
                  <td key={label} className="px-2 py-1.5 text-right tabular-nums" data-testid="selected-factor">
                    <span className="block">{v == null ? '' : formatValue(v, 'factor')}</span>
                    <span className="block text-[11px] font-normal text-muted-foreground">{s ? s.from : 'default'}</span>
                  </td>
                )
              })}
            </tr>
          </tfoot>
        </table>
      </div>
    </section>
  )
}
