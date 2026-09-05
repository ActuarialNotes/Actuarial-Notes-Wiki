import { useEffect, useState } from 'react'
import { Check, ChevronDown, ExternalLink, Flag, Loader2 } from 'lucide-react'
import { fetchWikiFile, githubBlobUrl } from '@/lib/github'
import { Button } from '@/components/ui/button'
import { ReportIssueModal } from '@/components/ReportIssueModal'
import { cn } from '@/lib/utils'
import {
  parseVerificationLog,
  factCheckBadge,
  formatCheckedDate,
  summarizeLog,
  summarizeSource,
  verificationLogPath,
  type FactCheckTone,
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
 * A finding is one line until it is asked for. The evidence behind it runs to a
 * paragraph of citations, which is exactly right in the log and unreadable as a
 * wall — so a row expands.
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

const TONE_TEXT: Record<FactCheckTone, string> = {
  green: 'text-foreground',
  amber: 'text-amber-700 dark:text-amber-300',
  red: 'text-red-700 dark:text-red-300',
  grey: 'text-muted-foreground',
}

const SEVERITY_TONE: Record<string, FactCheckTone> = {
  critical: 'red', major: 'amber', minor: 'grey', nit: 'grey',
}

/** The fields that carry the finding itself, in reading order. */
const DETAIL_FIELDS: Array<[string, string]> = [
  ['claim', 'Page said'],
  ['evidence', 'Source says'],
  ['proposed_action', 'Fix'],
  ['note', 'Note'],
]

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
  const checked = formatCheckedDate(verification?.lastChecked ?? null)
  const sources = (verification?.sources ?? []).map((raw) => ({ raw, ...summarizeSource(raw) }))
  const groups = log ? summarizeLog(log) : null

  return (
    <div className="space-y-5 text-sm">
      <div className="flex flex-wrap items-baseline justify-between gap-x-3 gap-y-1">
        <span className={cn('font-semibold', TONE_TEXT[badge.tone])}>{badge.label}</span>
        {/* The verified label already ends in the date; don't print it twice. */}
        {checked && !badge.label.endsWith(checked) && (
          <span className="text-xs text-muted-foreground">{checked}</span>
        )}
        {verification && NEEDS_DETAIL.has(verification.status) && (
          <p className="w-full text-xs text-muted-foreground">{badge.detail}</p>
        )}
      </div>

      {sources.length > 0 && (
        <Section title="Sources">
          <ul className="space-y-1.5">
            {sources.map((source) => (
              <li key={source.raw}>
                {source.url ? (
                  <a
                    href={source.url}
                    target="_blank"
                    rel="noreferrer"
                    title={source.raw}
                    className="inline-flex items-start gap-1.5 break-words hover:underline"
                  >
                    <span>{source.label}</span>
                    <ExternalLink className="mt-0.5 h-3 w-3 shrink-0 text-muted-foreground" aria-hidden />
                  </a>
                ) : (
                  <span className="break-words" title={source.raw}>{source.label}</span>
                )}
              </li>
            ))}
          </ul>
        </Section>
      )}

      {loading ? (
        <p className="flex items-center gap-2 text-xs text-muted-foreground">
          <Loader2 className="h-3.5 w-3.5 animate-spin" aria-hidden />
          Loading
        </p>
      ) : !log || !groups || log.entries.length === 0 ? (
        verification && verification.status !== 'unverified' && (
          <p className="text-xs text-muted-foreground">Nothing recorded yet.</p>
        )
      ) : (
        <>
          <EntrySection title="Open" groups={groups.open} defaultOpen />
          <EntrySection title="Fixed" groups={groups.resolved} />
          <EntrySection title="Notes" groups={groups.notes} />
        </>
      )}

      <div className="flex items-center justify-between gap-2 border-t pt-4">
        {log ? (
          <a
            href={githubBlobUrl(logPath)}
            target="_blank"
            rel="noreferrer"
            className="inline-flex items-center gap-1.5 text-xs text-muted-foreground hover:text-foreground"
          >
            Full record
            <ExternalLink className="h-3 w-3" aria-hidden />
          </a>
        ) : <span />}
        <Button size="sm" variant="outline" onClick={() => setReporting(true)} data-sound="tap">
          <Flag className="mr-1.5 h-3.5 w-3.5" />
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

const HEADING = 'text-xs font-semibold uppercase tracking-wide text-muted-foreground'

function Section({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <section>
      <h3 className={cn('mb-2', HEADING)}>{title}</h3>
      {children}
    </section>
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
          className={cn('mb-2 flex items-center gap-1.5 hover:text-foreground', HEADING)}
        >
          {title} · {groups.length}
          <ChevronDown className={cn('h-3.5 w-3.5 transition-transform', open && 'rotate-180')} aria-hidden />
        </button>
      </h3>
      {open && (
        <ul className="divide-y rounded-xl border">
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
        className="flex w-full items-start gap-2 p-3 text-left hover:bg-muted/50"
      >
        {applied && <Check className="mt-0.5 h-3.5 w-3.5 shrink-0 text-muted-foreground" aria-hidden />}
        <span className="min-w-0 flex-1 break-words text-xs font-medium">
          {entry.title || entry.id}
          {applied && <span className="sr-only"> — already corrected on the page</span>}
        </span>
        {isOpenFinding && entry.severity && (
          <span className={cn('shrink-0 text-[10px] font-semibold uppercase',
            TONE_TEXT[SEVERITY_TONE[entry.severity] ?? 'grey'])}>
            {entry.severity}
          </span>
        )}
        <ChevronDown
          className={cn('mt-0.5 h-3.5 w-3.5 shrink-0 text-muted-foreground transition-transform',
            open && 'rotate-180')}
          aria-hidden
        />
      </button>

      {open && (
        <div className="space-y-2 px-3 pb-3">
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
    <>
      {DETAIL_FIELDS.map(([key, label]) => {
        const text = value(key)
        if (!text) return null
        return (
          <p key={key} className="break-words text-xs leading-relaxed">
            <span className="font-medium text-muted-foreground">{label}. </span>
            {text}
          </p>
        )
      })}
      <p className="text-[11px] text-muted-foreground">
        {formatCheckedDate(entry.date) ?? entry.date}
        {entry.author && ` · ${entry.author.replace(/^(agent|human):/, '')}`}
      </p>
    </>
  )
}
