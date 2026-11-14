import { Link } from 'react-router-dom'
import bank from 'virtual:assumption-bank'
import { setsForResource } from '@/lib/assumptionBank'
import { AssumptionSetCard } from '@/components/assumptions/AssumptionSetCard'
import { cn } from '@/lib/utils'

/**
 * The figures the Assumptions Bank reads off this document
 * (docs/assumptions-bank.md §4.5), under the resource page's citation block:
 * a reader of OSFI's MCT guideline sees the ratios it supplies, each with its
 * locator, and a way to take them into a tool. Nothing when the bank holds no
 * set for the page.
 */
export function ResourceAssumptionsCard({ resource, compact = false, className }: { resource: string; compact?: boolean; className?: string }) {
  const sets = setsForResource(bank, resource)
  if (!sets.length) return null
  return (
    <section aria-label="Assumptions" className={cn('not-prose space-y-2', className)} data-testid="resource-assumptions">
      <div className="flex items-baseline justify-between gap-3 px-1">
        <h2 className="text-[11px] font-semibold uppercase tracking-wider text-muted-foreground">Assumptions</h2>
        <Link to="/data-sources/assumptions" className="text-xs font-medium underline underline-offset-2 hover:no-underline">
          Use them in a tool
        </Link>
      </div>
      {sets.map(set => <AssumptionSetCard key={set.id} set={set} compact={compact} />)}
    </section>
  )
}
