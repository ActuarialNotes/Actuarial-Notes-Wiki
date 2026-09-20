import { FileText, ListChecks } from 'lucide-react'
import type { Assumption, KeyDetail } from '@/lib/coworkDeliverables'

/**
 * The two tables a populated deliverable carries: what it **assumes**, and the
 * **key details** about the deliverable itself.
 *
 * Every row shows its basis, and that is the whole design. An assumption with a
 * value states it; an assumption without one shows where in the source the
 * number is read from, and stays visibly blank. Both are honest and only one of
 * them is a number Cowork made up — which is none of them. The greyed "read
 * from" line is doing work the style guide would normally object to
 * (`docs/visual-noise-review.md`): it is the difference between a filled table
 * and a fabricated one, so it earns its place.
 */

export function AssumptionsTable({ assumptions }: { assumptions: Assumption[] }) {
  if (!assumptions.length) {
    return (
      <p className="rounded-lg border border-dashed px-4 py-6 text-center text-sm text-muted-foreground">
        Nothing to assume yet. Answer the scoping questions and attach sources — each one adds the rows it supports.
      </p>
    )
  }

  return (
    <ul className="divide-y rounded-xl border bg-card">
      {assumptions.map((row, i) => (
        <li key={`${row.label}-${i}`} className="flex items-start gap-3 px-4 py-3">
          <span className="mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center text-muted-foreground">
            {row.origin === 'source' ? (
              <FileText className="h-4 w-4" aria-hidden />
            ) : (
              <ListChecks className="h-4 w-4" aria-hidden />
            )}
          </span>
          <div className="min-w-0 flex-1">
            <div className="flex flex-wrap items-baseline justify-between gap-x-3 gap-y-0.5">
              <span className="text-sm font-medium text-foreground">{row.label}</span>
              {row.value ? (
                <span className="text-sm font-semibold tabular-nums text-foreground">{row.value}</span>
              ) : (
                <span className="text-xs italic text-muted-foreground">to be read from the source</span>
              )}
            </div>
            <p className="mt-0.5 text-xs leading-snug text-muted-foreground">
              {row.basis}
              {row.locator && <span className="text-muted-foreground/80"> · {row.locator}</span>}
            </p>
          </div>
        </li>
      ))}
    </ul>
  )
}

export function KeyDetailsTable({ details }: { details: KeyDetail[] }) {
  return (
    <dl className="divide-y rounded-xl border bg-card">
      {details.map((detail, i) => (
        <div key={`${detail.label}-${i}`} className="px-4 py-3">
          <div className="flex flex-wrap items-baseline justify-between gap-x-3 gap-y-0.5">
            <dt className="text-sm font-medium text-foreground">{detail.label}</dt>
            <dd className="text-sm text-foreground">{detail.value}</dd>
          </div>
          <p className="mt-0.5 text-xs leading-snug text-muted-foreground">{detail.basis}</p>
        </div>
      ))}
    </dl>
  )
}
