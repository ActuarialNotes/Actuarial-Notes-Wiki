import { useEffect, useState } from 'react'
import { Check, ChevronDown, ExternalLink, FileText, Flag, Loader2 } from 'lucide-react'
import { fetchWikiFile, githubBlobUrl } from '@/lib/github'
import { Button } from '@/components/ui/button'
import { ReportIssueModal } from '@/components/ReportIssueModal'
import { cn } from '@/lib/utils'
import {
  FACT_CHECK_TONE_CLASSES,
  FACT_CHECK_TONE_ICONS,
  SEVERITY_TONE,
} from '@/lib/factCheckTone'
import {
  parseVerificationLog,
  factCheckBadge,
  formatCheckedDate,
  summarizeLog,
  summarizeSource,
  verificationLogPath,
  type LogEntry,
  type LogEntryGroup,
  type Verification,
  type VerificationLog,
} from '@/lib/verification'

/**
 * The read-only **Fact Check** record for one page.
 *
 * A reader opens this with two questions, and the panel is laid out as their
 * answers: *what was this checked against?* and *what has been changed since?*
 * Everything else the record carries — content hashes, run ids, fingerprints,
 * the page locator a finding was written against — is auditor's material. It
 * stays in the vault, where `verify_check.py` can enforce it, and reaches the
 * screen only through a link's accessible name. Showing the work is the point;
 * showing the paperwork is not.
 *
 * Three shapes carry it, each already established elsewhere in the app:
 *
 *  - the **verdict tile** — the tinted mark from `lib/factCheckTone.ts` on the
 *    `rounded-xl bg-muted/50` block the question-info sheet leads with;
 *  - a **source** as a document row, the same bordered `bg-card` affordance the
 *    quiz and a resource page use for "open this paper";
 *  - a **finding** as one row of a list card, with its severity as a chip on the
 *    same four tones, expanding in place to the evidence behind it. The evidence
 *    runs to a paragraph of citations, which is right in the log and unreadable
 *    as a wall — so it stays folded until asked for.
 *
 * Sidecar logs are deliberately not bundled at build time — they grow without
 * bound and only matter when someone opens this panel — so the log is fetched on
 * demand. The verdict and the sources come from the page's own `verification:`
 * block and need no fetch.
 */

/**
 * Statuses whose verdict doesn't say what to do about it. `unverified` is not
 * one of them: "Not fact checked" is the whole story, and "Not yet checked
 * against a source" underneath it is the same sentence twice.
 */
const NEEDS_DETAIL = new Set(['in_review', 'stale', 'disputed'])

/** The fields that carry the finding itself, in reading order. */
const DETAIL_FIELDS: Array<[string, string]> = [
  ['claim', 'Page said'],
  ['evidence', 'Source says'],
  ['proposed_action', 'Fix'],
  ['note', 'Note'],
]

const HEADING = 'text-xs font-semibold uppercase tracking-wide text-muted-foreground'
const ROW_FOCUS = 'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring'

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
  const [reporting, setReporting] = useState(false)

  const logPath = verification?.log || verificationLogPath(contentPath)

  useEffect(() => {
    let cancelled = false
    setLoading(true)
    fetchWikiFile(logPath)
      .then((raw) => { if (!cancelled) setLog(parseVerificationLog(raw)) })
      // A page with nothing recorded yet has no log file at all. That is the
      // normal state for most of the vault, not an error.
      .catch(() => { if (!cancelled) setLog(null) })
      .finally(() => { if (!cancelled) setLoading(false) })
    return () => { cancelled = true }
  }, [logPath])

  const badge = factCheckBadge(verification)
  const ToneIcon = FACT_CHECK_TONE_ICONS[badge.tone]
  const checked = formatCheckedDate(verification?.lastChecked ?? null)
  const sources = (verification?.sources ?? []).map((raw) => ({ raw, ...summarizeSource(raw) }))
  // One supporting line under the verdict, never two: what to do about the
  // status where the label doesn't say, otherwise the date the label lacks.
  const support = verification && NEEDS_DETAIL.has(verification.status)
    ? badge.detail
    : checked && !badge.label.endsWith(checked) ? checked : null
  const groups = log ? summarizeLog(log) : null

  return (
    <div className="space-y-5 text-sm">
      <div className="flex items-center gap-3 rounded-xl bg-muted/50 p-3">
        <span
          className={cn('flex h-9 w-9 shrink-0 items-center justify-center rounded-lg',
            FACT_CHECK_TONE_CLASSES[badge.tone])}
        >
          <ToneIcon className="h-4 w-4" aria-hidden />
        </span>
        <div className="min-w-0">
          <p className="font-medium leading-tight">{badge.label}</p>
          {support && <p className="mt-0.5 text-xs text-muted-foreground">{support}</p>}
        </div>
      </div>

      {sources.length > 0 && (
        <section>
          <h3 className={cn('mb-2', HEADING)}>Checked against</h3>
          <ul className="space-y-2">
            {sources.map((source) => (
              <li key={source.raw}>
                <SourceRow source={source} />
              </li>
            ))}
          </ul>
        </section>
      )}

      {loading ? (
        <p className="flex items-center gap-2 text-sm text-muted-foreground">
          <Loader2 className="h-4 w-4 animate-spin" aria-hidden />
          Loading
        </p>
      ) : !log || !groups || log.entries.length === 0 ? (
        verification && verification.status !== 'unverified' && (
          <p className="text-sm text-muted-foreground">Nothing recorded yet.</p>
        )
      ) : (
        <>
          <EntrySection title="Open" groups={groups.open} defaultOpen />
          <EntrySection title="Fixed" groups={groups.resolved} />
          <EntrySection title="Notes" groups={groups.notes} />
        </>
      )}

      <div className="flex items-center justify-between gap-2 border-t border-border pt-4">
        {log ? (
          <a
            href={githubBlobUrl(logPath)}
            target="_blank"
            rel="noreferrer"
            className={cn('inline-flex items-center gap-1.5 rounded-md px-1 py-0.5 text-xs text-muted-foreground transition-colors hover:text-foreground', ROW_FOCUS)}
          >
            Full record
            <ExternalLink className="h-3 w-3" aria-hidden />
          </a>
        ) : <span />}
        <Button size="sm" variant="outline" onClick={() => setReporting(true)} data-sound="tap">
          <Flag className="mr-2 h-4 w-4" />
          Report
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

/**
 * One cited source. A citation with a URL is a document you can open, and gets
 * the app's document affordance; one without is the same row, inert — the
 * shelf stays one shape either way.
 */
function SourceRow({ source }: { source: { raw: string; label: string; url: string | null } }) {
  const inner = (
    <>
      <FileText
        className={cn('mt-0.5 h-4 w-4 shrink-0', source.url ? 'text-primary' : 'text-muted-foreground')}
        aria-hidden
      />
      <span className="min-w-0 flex-1 break-words">{source.label}</span>
      {source.url && (
        <ExternalLink className="mt-0.5 h-3.5 w-3.5 shrink-0 text-muted-foreground" aria-hidden />
      )}
    </>
  )
  const shape = 'flex items-start gap-2.5 rounded-lg border border-border bg-card px-3 py-2.5 text-sm'

  if (!source.url) return <div className={shape} title={source.raw}>{inner}</div>
  return (
    <a
      href={source.url}
      target="_blank"
      rel="noreferrer"
      title={source.raw}
      data-sound="tap"
      className={cn(shape, 'transition-colors hover:bg-accent hover:text-accent-foreground', ROW_FOCUS)}
    >
      {inner}
    </a>
  )
}

function EntrySection({
  title,
  groups,
  defaultOpen = false,
}: {
  title: string
  groups: LogEntryGroup[]
  defaultOpen?: boolean
}) {
  const [open, setOpen] = useState(defaultOpen)
  if (groups.length === 0) return null

  return (
    <section>
      <h3>
        <button
          type="button"
          onClick={() => setOpen((v) => !v)}
          aria-expanded={open}
          data-sound="tap"
          className={cn('-mx-1 mb-2 flex items-center gap-1.5 rounded-md px-1 py-0.5 transition-colors hover:text-foreground',
            HEADING, ROW_FOCUS)}
        >
          {title} · {groups.length}
          <ChevronDown className={cn('h-3.5 w-3.5 transition-transform', open && 'rotate-180')} aria-hidden />
        </button>
      </h3>
      {open && (
        <ul className="divide-y divide-border overflow-hidden rounded-lg border border-border bg-card">
          {groups.map((group) => (
            <EntryRow key={group.entry.id} group={group} />
          ))}
        </ul>
      )}
    </section>
  )
}

function EntryRow({ group }: { group: LogEntryGroup }) {
  const [open, setOpen] = useState(false)
  const { entry, closedBy } = group
  // `applied` is independent of status: the page can be corrected before the
  // finding is signed off, and that a reader is looking at already-corrected
  // text is the single most useful thing this row can tell them. Under *Fixed*
  // the same mark would only repeat the heading, so it is drawn here alone.
  const isOpenFinding = entry.entryType === 'finding' && !closedBy
  const applied = isOpenFinding && entry.applied

  return (
    <li>
      <button
        type="button"
        onClick={() => setOpen((v) => !v)}
        aria-expanded={open}
        data-sound="tap"
        className={cn('flex w-full items-start gap-2.5 px-3 py-2.5 text-left transition-colors hover:bg-accent/50', ROW_FOCUS)}
      >
        {applied && (
          <Check className="mt-0.5 h-4 w-4 shrink-0 text-muted-foreground" aria-hidden />
        )}
        <span className="min-w-0 flex-1 break-words text-sm">
          {entry.title || entry.id}
          {applied && <span className="sr-only"> — already corrected on the page</span>}
        </span>
        {isOpenFinding && entry.severity && (
          <span className={cn('shrink-0 rounded-full px-2 py-0.5 text-[10px] font-semibold uppercase tracking-wide',
            FACT_CHECK_TONE_CLASSES[SEVERITY_TONE[entry.severity] ?? 'grey'])}>
            {entry.severity}
          </span>
        )}
        <ChevronDown
          className={cn('mt-0.5 h-4 w-4 shrink-0 text-muted-foreground transition-transform',
            open && 'rotate-180')}
          aria-hidden
        />
      </button>

      {open && (
        <div className="space-y-3 px-3 pb-3">
          <EntryDetail entry={entry} />
          {closedBy && <EntryDetail entry={closedBy} />}
        </div>
      )}
    </li>
  )
}

function EntryDetail({ entry }: { entry: LogEntry }) {
  const value = (key: string) => entry.fields.find((f) => f.key === key)?.value ?? ''
  return (
    <div className="rounded-lg bg-muted/50 p-3">
      <dl className="space-y-2">
        {DETAIL_FIELDS.map(([key, label]) => {
          const text = value(key)
          if (!text) return null
          return (
            <div key={key}>
              <dt className="text-xs text-muted-foreground">{label}</dt>
              <dd className="mt-0.5 break-words text-sm leading-relaxed">{text}</dd>
            </div>
          )
        })}
      </dl>
      <p className="mt-2 text-xs text-muted-foreground">
        {formatCheckedDate(entry.date) ?? entry.date}
        {entry.author && ` · ${entry.author.replace(/^(agent|human):/, '')}`}
      </p>
    </div>
  )
}
