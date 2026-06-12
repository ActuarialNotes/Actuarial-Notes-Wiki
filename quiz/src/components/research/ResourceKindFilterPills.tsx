import { KIND_LABEL, TIMELINE_KINDS } from '@/lib/resourceTimeline'
import { useResearchStore } from '@/stores/researchStore'

// Each resource type gets its own shade of blue so the pills stay visually
// distinct from each other and from the Filters panel's neutral chips.
// New TimelineKind values automatically pick up a shade by cycling through
// this palette, so no further changes are needed when a new type is added.
const KIND_SHADES = [
  { active: 'border-blue-700 bg-blue-700 text-white', inactive: 'border-blue-700/30 text-blue-700 hover:bg-blue-700/10 dark:text-blue-300' },
  { active: 'border-blue-500 bg-blue-500 text-white', inactive: 'border-blue-500/30 text-blue-600 hover:bg-blue-500/10 dark:text-blue-300' },
  { active: 'border-sky-500 bg-sky-500 text-white', inactive: 'border-sky-500/30 text-sky-600 hover:bg-sky-500/10 dark:text-sky-300' },
  { active: 'border-cyan-500 bg-cyan-500 text-white', inactive: 'border-cyan-500/30 text-cyan-600 hover:bg-cyan-500/10 dark:text-cyan-300' },
  { active: 'border-indigo-500 bg-indigo-500 text-white', inactive: 'border-indigo-500/30 text-indigo-600 hover:bg-indigo-500/10 dark:text-indigo-300' },
]

/**
 * Standalone resource-type filter pills shown above the Timeline heatmap.
 * Distinct from the "Filters" panel below — toggling a pill narrows the
 * heatmap and "All resources" list to that resource type (TimelineEntry.kind).
 */
export function ResourceKindFilterPills() {
  const docTypes = useResearchStore(s => s.filters.docTypes)
  const toggleDocType = useResearchStore(s => s.toggleDocType)

  return (
    <div className="flex flex-wrap gap-1.5">
      {TIMELINE_KINDS.map((kind, i) => {
        const shade = KIND_SHADES[i % KIND_SHADES.length]
        const active = docTypes.includes(kind)
        return (
          <button
            key={kind}
            type="button"
            onClick={() => toggleDocType(kind)}
            aria-pressed={active}
            className={`rounded-full border px-2.5 py-1 text-xs font-medium transition-colors ${active ? shade.active : shade.inactive}`}
          >
            {KIND_LABEL[kind]}
          </button>
        )
      })}
    </div>
  )
}
