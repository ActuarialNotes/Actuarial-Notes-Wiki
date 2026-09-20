import { facetPills, type DeliverableFacets } from '@/lib/coworkFacets'

/**
 * A deliverable's facets, as a row of chips.
 *
 * Read from `facetPills`, so the row is always in facet order rather than in
 * whatever order the scoping happened to ask its questions — two deliverables
 * scoped by different routes still read the same way. An axis that has not been
 * answered is simply absent: an unanswered facet must never show as a default.
 */
export function FacetPills({ facets, className }: { facets: DeliverableFacets; className?: string }) {
  const pills = facetPills(facets)
  if (!pills.length) return null

  return (
    <div className={className}>
      <ul className="flex flex-wrap gap-1.5">
        {pills.map(pill => (
          <li
            key={pill.key}
            title={pill.axis}
            className="rounded-full bg-muted px-2 py-0.5 text-[11px] font-medium leading-tight text-muted-foreground"
          >
            <span className="sr-only">{pill.axis}: </span>
            {pill.label}
          </li>
        ))}
      </ul>
    </div>
  )
}
