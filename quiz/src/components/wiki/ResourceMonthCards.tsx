import { Link } from 'react-router-dom'
import { X } from 'lucide-react'
import type { TimelineEntry, TimelineKind } from '@/lib/resourceTimeline'
import { wikiRoute } from '@/lib/wikiRoutes'
import { Card } from '@/components/ui/card'

const MONTH_LONG = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December']

const KIND_LABEL: Record<TimelineKind, string> = {
  book: 'Resource',
  event: 'Event',
  regulation: 'Regulation',
  benchmark: 'Benchmark',
}

const KIND_BADGE: Record<TimelineKind, string> = {
  book: 'bg-blue-500/10 text-blue-600 dark:text-blue-400',
  event: 'bg-amber-500/10 text-amber-600 dark:text-amber-400',
  regulation: 'bg-violet-500/10 text-violet-600 dark:text-violet-400',
  benchmark: 'bg-emerald-500/10 text-emerald-600 dark:text-emerald-400',
}

function formatEntryDate(e: TimelineEntry): string {
  if (e.month === null) return String(e.year)
  if (e.date.length >= 10) {
    const d = new Date(e.date + 'T00:00:00')
    if (!isNaN(d.getTime())) {
      return d.toLocaleDateString(undefined, { year: 'numeric', month: 'long', day: 'numeric' })
    }
  }
  return `${MONTH_LONG[e.month]} ${e.year}`
}

function MetaPill({ children }: { children: React.ReactNode }) {
  return (
    <span className="rounded-full bg-muted px-2 py-0.5 text-[10px] text-muted-foreground">
      {children}
    </span>
  )
}

function EntryCard({ entry }: { entry: TimelineEntry }) {
  const inner = (
    <Card className="h-full transition-all duration-150 hover:bg-accent/40 overflow-hidden flex flex-row items-stretch">
      {entry.coverImage && (
        <div className="flex-shrink-0 p-2 flex items-center">
          <img
            src={entry.coverImage}
            alt={entry.title}
            className="w-14 sm:w-16 rounded-md object-contain max-h-24 bg-muted/20"
            loading="lazy"
            onError={(e) => {
              const p = e.currentTarget.parentElement
              if (p) p.style.display = 'none'
            }}
          />
        </div>
      )}
      <div className="p-3 flex flex-col gap-1.5 flex-1 min-w-0">
        <div className="flex items-center gap-2">
          <span className={`rounded-full px-2 py-0.5 text-[10px] font-medium ${KIND_BADGE[entry.kind]}`}>
            {KIND_LABEL[entry.kind]}
          </span>
          <span className="text-[11px] text-muted-foreground">{formatEntryDate(entry)}</span>
        </div>
        <p className="text-sm font-semibold leading-snug">{entry.title}</p>
        {entry.summary && (
          <p className="text-xs text-muted-foreground leading-relaxed line-clamp-3">{entry.summary}</p>
        )}
        <div className="flex flex-wrap gap-1 mt-0.5">
          {entry.author && <MetaPill>{entry.author}</MetaPill>}
          {entry.edition && <MetaPill>{entry.edition} ed.</MetaPill>}
          {entry.publisher && <MetaPill>{entry.publisher}</MetaPill>}
          {entry.jurisdiction && <MetaPill>{entry.jurisdiction}</MetaPill>}
          {entry.issuingBody && <MetaPill>{entry.issuingBody}</MetaPill>}
          {entry.impactLevel && <MetaPill>{entry.impactLevel} impact</MetaPill>}
          {entry.status && entry.status !== 'effective' && <MetaPill>{entry.status}</MetaPill>}
        </div>
      </div>
    </Card>
  )

  // Books have a dedicated wiki page; events/regulation render in place.
  return entry.kind === 'book'
    ? <Link to={wikiRoute({ kind: 'resource', name: entry.name })}>{inner}</Link>
    : inner
}

interface Props {
  entries: TimelineEntry[]
  year: number
  month: number
  onClear: () => void
}

export function ResourceMonthCards({ entries, year, month, onClear }: Props) {
  return (
    <div className="space-y-3">
      <div className="flex items-center justify-between">
        <h3 className="text-sm font-semibold">
          {MONTH_LONG[month]} {year}
          <span className="ml-2 font-normal text-muted-foreground">
            {entries.length} item{entries.length === 1 ? '' : 's'}
          </span>
        </h3>
        <button
          type="button"
          onClick={onClear}
          className="inline-flex items-center gap-1 text-xs text-muted-foreground hover:text-foreground transition-colors"
        >
          <X className="h-3.5 w-3.5" /> Clear
        </button>
      </div>
      {entries.length === 0 ? (
        <p className="text-sm text-muted-foreground">Nothing recorded this month.</p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          {entries.map(entry => (
            <EntryCard key={`${entry.kind}:${entry.path}`} entry={entry} />
          ))}
        </div>
      )}
    </div>
  )
}
