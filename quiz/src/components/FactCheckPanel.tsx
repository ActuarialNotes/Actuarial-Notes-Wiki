import { useEffect, useState } from 'react'
import { AlertTriangle, Flag, Loader2, MessageSquare, CheckCircle2, ExternalLink } from 'lucide-react'
import { fetchWikiFile, githubBlobUrl } from '@/lib/github'
import { Button } from '@/components/ui/button'
import { ReportIssueModal } from '@/components/ReportIssueModal'
import { cn } from '@/lib/utils'
import {
  parseVerificationLog,
  openFindings,
  factCheckBadge,
  formatCheckedDate,
  verificationLogPath,
  type LogEntry,
  type Verification,
  type VerificationLog,
} from '@/lib/verification'

/**
 * The read-only **Fact Check** record for one page: what has been checked about
 * it, against which source, and everything anyone has since said about it.
 *
 * Sidecar logs are deliberately not bundled at build time — they grow without
 * bound and only matter when someone opens this panel — so the log is fetched
 * on demand. Everything above the fold (status, date, sources) comes from the
 * page's own `verification:` block and needs no fetch.
 *
 * Showing the work is the point. A reader who can see that a page was checked
 * against the official CAS PDF on a named date, or that someone has already
 * flagged the exact thing they were about to flag, has a reason to trust the
 * rest of the vault that no badge alone can give them.
 */

const ENTRY_ICONS: Record<string, typeof Flag> = {
  finding: Flag,
  resolution: CheckCircle2,
  correction: CheckCircle2,
  comment: MessageSquare,
  question: MessageSquare,
}

const SEVERITY_CLASSES: Record<string, string> = {
  critical: 'bg-red-50 text-red-900 dark:bg-red-950 dark:text-red-100',
  major: 'bg-amber-50 text-amber-900 dark:bg-amber-950 dark:text-amber-100',
  minor: 'bg-muted text-muted-foreground',
  nit: 'bg-muted text-muted-foreground',
}

/** Fields already shown in the entry header; not repeated in the body list. */
const HEADER_FIELDS = new Set(['entry_type', 'author', 'date', 'severity', 'status'])

interface FactCheckPanelProps {
  verification: Verification | null | undefined
  contentPath: string
  contentName?: string
}

export function FactCheckPanel({
  verification,
  contentPath,
  contentName,
}: FactCheckPanelProps) {
  const [log, setLog] = useState<VerificationLog | null>(null)
  const [loading, setLoading] = useState(true)
  const [missing, setMissing] = useState(false)
  const [reporting, setReporting] = useState(false)

  const logPath = verification?.log || verificationLogPath(contentPath)

  useEffect(() => {
    let cancelled = false
    setLoading(true)
    setMissing(false)
    fetchWikiFile(logPath)
      .then((raw) => { if (!cancelled) setLog(parseVerificationLog(raw)) })
      // A page with nothing recorded yet has no log file at all. That is the
      // normal state for most of the vault, not an error.
      .catch(() => { if (!cancelled) setMissing(true) })
      .finally(() => { if (!cancelled) setLoading(false) })
    return () => { cancelled = true }
  }, [logPath])

  const badge = factCheckBadge(verification)
  const open = log ? openFindings(log) : []

  return (
    <div className="space-y-4 text-sm">
      <section className="rounded-xl bg-muted/50 p-3">
        <p className="font-medium">{badge.label}</p>
        <p className="mt-0.5 text-xs text-muted-foreground">{badge.detail}</p>

        {verification?.lastChecked && (
          <p className="mt-2 text-xs text-muted-foreground">
            Last checked {formatCheckedDate(verification.lastChecked)}
            {verification.lastCheckedBy && ` by ${verification.lastCheckedBy}`}
          </p>
        )}

        {verification && verification.sources.length > 0 && (
          <div className="mt-3">
            <p className="text-xs font-medium text-muted-foreground">Checked against</p>
            <ul className="mt-1 space-y-1">
              {verification.sources.map((source) => (
                <li key={source} className="text-xs leading-relaxed">— {source}</li>
              ))}
            </ul>
          </div>
        )}

        {open.length > 0 && (
          <p className="mt-3 flex items-center gap-1.5 text-xs font-medium text-amber-700 dark:text-amber-300">
            <AlertTriangle className="h-3.5 w-3.5" aria-hidden />
            {open.length} open finding{open.length === 1 ? '' : 's'} on this page
          </p>
        )}
      </section>

      <section>
        <h3 className="mb-2 text-xs font-semibold uppercase tracking-wide text-muted-foreground">
          History
        </h3>
        {loading ? (
          <p className="flex items-center gap-2 py-4 text-xs text-muted-foreground">
            <Loader2 className="h-3.5 w-3.5 animate-spin" aria-hidden />
            Loading the record…
          </p>
        ) : missing || !log || log.entries.length === 0 ? (
          <p className="py-3 text-xs text-muted-foreground">
            Nothing recorded about this page yet. If something here looks wrong, saying so is the
            fastest way to get it checked.
          </p>
        ) : (
          <ol className="space-y-3">
            {log.entries.map((entry) => (
              <LogEntryRow key={entry.id} entry={entry} open={open.some((f) => f.id === entry.id)} />
            ))}
          </ol>
        )}
      </section>

      <div className="flex flex-wrap items-center justify-between gap-2 border-t pt-3">
        <a
          href={githubBlobUrl(logPath)}
          target="_blank"
          rel="noreferrer"
          className="inline-flex items-center gap-1 text-xs text-muted-foreground hover:text-foreground"
        >
          <ExternalLink className="h-3 w-3" aria-hidden />
          View on GitHub
        </a>
        <Button size="sm" variant="outline" onClick={() => setReporting(true)} data-sound="tap">
          <Flag className="mr-1.5 h-3.5 w-3.5" />
          Report an issue
        </Button>
      </div>

      <ReportIssueModal
        open={reporting}
        onClose={() => setReporting(false)}
        contentPath={contentPath}
        contentName={contentName}
      />
    </div>
  )
}

function LogEntryRow({ entry, open }: { entry: LogEntry; open: boolean }) {
  const Icon = ENTRY_ICONS[entry.entryType] ?? MessageSquare
  const isHuman = entry.author.startsWith('human:')
  const body = entry.fields.filter((f) => !HEADER_FIELDS.has(f.key) && f.value)

  return (
    <li className="rounded-xl border p-3">
      <div className="flex flex-wrap items-center gap-2">
        <Icon className="h-3.5 w-3.5 shrink-0 text-muted-foreground" aria-hidden />
        <span className="text-xs font-semibold">{entry.title || entry.id}</span>
        {entry.severity && (
          <span className={cn('rounded-full px-2 py-0.5 text-[10px] font-semibold uppercase',
            SEVERITY_CLASSES[entry.severity] ?? SEVERITY_CLASSES.minor)}>
            {entry.severity}
          </span>
        )}
        {open && (
          <span className="rounded-full bg-amber-50 px-2 py-0.5 text-[10px] font-semibold uppercase text-amber-900 dark:bg-amber-950 dark:text-amber-100">
            open
          </span>
        )}
      </div>
      <p className="mt-1 text-[11px] text-muted-foreground">
        {entry.id} · {isHuman ? entry.author.replace('human:', '') : entry.author} · {entry.date}
      </p>
      {body.length > 0 && (
        <dl className="mt-2 space-y-1">
          {body.map((field) => (
            <div key={field.key} className="text-xs leading-relaxed">
              <dt className="inline font-medium capitalize text-muted-foreground">
                {field.key.replace(/_/g, ' ')}:{' '}
              </dt>
              <dd className="inline">{field.value}</dd>
            </div>
          ))}
        </dl>
      )}
    </li>
  )
}
