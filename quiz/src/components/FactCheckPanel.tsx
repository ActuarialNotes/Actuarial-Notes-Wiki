import { useEffect, useState } from 'react'
import {
  AlertCircle,
  ChevronDown,
  CircleSlash,
  ExternalLink,
  Flag,
  History,
  Loader2,
  MessageSquare,
  Wrench,
} from 'lucide-react'
import { fetchWikiFile, githubBlobUrl } from '@/lib/github'
import { pdfFileName, pdfSourceHost } from '@/lib/examPdf'
import { Button } from '@/components/ui/button'
import { CheckMark } from '@/components/CheckMark'
import { PdfLinkButton } from '@/components/PdfLinkButton'
import { ReportIssueModal } from '@/components/ReportIssueModal'
import { FactCheckSection } from '@/components/FactCheckSection'
import { FactCheckSources } from '@/components/FactCheckSources'
import { cn } from '@/lib/utils'
import {
  FACT_CHECK_DIFF,
  FACT_CHECK_TONE_CLASSES,
  FACT_CHECK_ICONS,
  SEVERITY_TONE,
} from '@/lib/factCheckTone'
import {
  parseVerificationLog,
  checkerName,
  factCheckBadge,
  factCheckOverview,
  findingOutcome,
  formatCheckedDate,
  logField,
  summarizeEvidence,
  summarizeLog,
  verificationLogPath,
  type FactCheckTone,
  type FindingOutcome,
  type LogEntry,
  type LogEntryGroup,
  type LogEntrySeverity,
  type LogSummary,
  type Verification,
  type VerificationLog,
} from '@/lib/verification'

/**
 * The read-only **Fact Check** record for one page.
 *
 * A reader opens this with three questions, and the panel answers them in the
 * order they are asked:
 *
 *  1. **Can I trust it?** — the verdict and one sentence under it
 *     (`factCheckOverview`): whether the page was checked, when, against how
 *     many sources, and whether anything is still open. Always on screen, and
 *     never contradicted by what is below it: the counts come from the page's
 *     own `verification:` block, which needs no fetch.
 *  2. **What's wrong with it?** — **Open issues**, the one section that starts
 *     unfolded, each finding a row that opens into a diff.
 *  3. **How do they know?** — **Checked against** (the sources, as the resource
 *     card a resource page leads with) and **Check history** (each pass, newest
 *     first: its date, the status it set and what it concluded, with what it
 *     actually compared one tap further). **Fixed** and **Notes** follow.
 *
 * Every section is a card of one shape (`components/FactCheckSection.tsx`)
 * that names what it holds and how many, so the folded stack is itself the
 * summary. Everything the record carries beyond that — content hashes, run
 * ids, fingerprints, the page locator a finding was written against — is
 * auditor's material. It stays in the vault, where `verify_check.py` can
 * enforce it, and the footer's **Full record** link goes to it.
 *
 * Sidecar logs are not bundled at build time — they grow without bound and
 * only matter when someone opens this panel — so the log is fetched when the
 * panel mounts. A page with nothing recorded has no log file at all, the
 * normal state for most of the vault; a page whose block says it *was* checked
 * but whose log can't be read says that, rather than "nothing recorded".
 */

/** Worst first — the order the open section's breakdown and tile read in. */
const SEVERITIES: LogEntrySeverity[] = ['critical', 'major', 'minor', 'nit']

const ROW_FOCUS = 'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring'

interface FactCheckPanelProps {
  verification: Verification | null | undefined
  contentPath: string
  contentName?: string
}

type LogState =
  | { kind: 'loading' }
  | { kind: 'loaded'; log: VerificationLog | null }
  | { kind: 'failed' }

export function FactCheckPanel({
  verification,
  contentPath,
  contentName,
}: FactCheckPanelProps) {
  const [state, setState] = useState<LogState>({ kind: 'loading' })
  const [reporting, setReporting] = useState(false)

  const logPath = verification?.log || verificationLogPath(contentPath)
  const everChecked = Boolean(verification && verification.status !== 'unverified')

  useEffect(() => {
    let cancelled = false
    setState({ kind: 'loading' })
    fetchWikiFile(logPath)
      .then((raw) => { if (!cancelled) setState({ kind: 'loaded', log: parseVerificationLog(raw) }) })
      // No log is the normal state of a page nobody has checked. For one the
      // block says *was* checked, it means the record couldn't be reached.
      .catch(() => {
        if (!cancelled) setState(everChecked ? { kind: 'failed' } : { kind: 'loaded', log: null })
      })
    return () => { cancelled = true }
  }, [logPath, everChecked])

  const badge = factCheckBadge(verification)
  const overview = factCheckOverview(verification)
  const VerdictIcon = FACT_CHECK_ICONS[badge.kind]
  const log = state.kind === 'loaded' ? state.log : null
  const summary = log && log.entries.length > 0 ? summarizeLog(log) : null

  return (
    <div className="space-y-4 text-sm">
      <div className="flex items-start gap-3">
        <span
          className={cn('flex h-9 w-9 shrink-0 items-center justify-center rounded-lg',
            FACT_CHECK_TONE_CLASSES[badge.tone])}
        >
          <VerdictIcon className="h-4 w-4" aria-hidden />
        </span>
        <div className="min-w-0 flex-1">
          <p className="font-medium leading-tight">{overview.headline}</p>
          <p className="mt-1 text-sm text-muted-foreground">{overview.sentence}</p>
        </div>
      </div>

      <div className="space-y-2">
        {summary && summary.open.length > 0 && (
          <FactCheckSection
            title="Open issues"
            count={summary.open.length}
            detail={severityBreakdown(summary.open)}
            tone={worstTone(summary.open)}
            icon={<AlertCircle className="h-4 w-4" aria-hidden />}
            defaultOpen
          >
            <EntryList groups={summary.open} />
          </FactCheckSection>
        )}

        {/* What the page was read against. Unfolded unless there are open
            issues to read first — decided from the block, not the log, so
            the card doesn't change its mind when the log arrives. */}
        <FactCheckSources
          sources={verification?.sources ?? []}
          defaultOpen={!verification?.openFindings}
        />

        {state.kind === 'loading' && everChecked && (
          <p className="flex items-center gap-2 px-1 py-2 text-sm text-muted-foreground">
            <Loader2 className="h-4 w-4 animate-spin" aria-hidden />
            Loading the record
          </p>
        )}
        {state.kind === 'failed' && (
          <p className="px-1 py-2 text-sm text-muted-foreground">
            Couldn’t load the details of this check. The full record has them.
          </p>
        )}

        {summary && <RecordSections summary={summary} />}
      </div>

      <div className="flex items-center justify-between gap-2 border-t border-border pt-4">
        {everChecked || log ? (
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

/** "1 critical · 2 minor" — how bad what is still open is, worst first. */
function severityBreakdown(groups: LogEntryGroup[]): string | null {
  const counts = new Map<string, number>()
  for (const { entry } of groups) {
    if (entry.severity) counts.set(entry.severity, (counts.get(entry.severity) ?? 0) + 1)
  }
  const parts = SEVERITIES.filter((s) => counts.has(s)).map((s) => `${counts.get(s)} ${s}`)
  return parts.length > 0 ? parts.join(' · ') : null
}

/**
 * The open section's tile takes the worst open finding's tone — a critical one
 * is the same red as the *Known issue* verdict it produces.
 */
function worstTone(groups: LogEntryGroup[]) {
  const worst = SEVERITIES.find((s) => groups.some((g) => g.entry.severity === s))
  return worst ? SEVERITY_TONE[worst] : 'grey'
}

/** The record below the sources: the checks, then what was fixed, then notes. */
export function RecordSections({ summary }: { summary: LogSummary }) {
  const latest = summary.checks[0]
  const latestDate = latest ? formatCheckedDate(latest.entry.date) : null
  return (
    <>
      {summary.checks.length > 0 && (
        <FactCheckSection
          title="Check history"
          count={summary.checks.length}
          detail={latestDate && summary.checks.length > 1 ? `Latest ${latestDate}` : null}
          tone="grey"
          icon={<History className="h-4 w-4" aria-hidden />}
        >
          <ul className="divide-y divide-border">
            {summary.checks.map((group) => (
              <CheckRow key={group.entry.id} entry={group.entry} />
            ))}
          </ul>
        </FactCheckSection>
      )}
      {summary.resolved.length > 0 && (
        <FactCheckSection
          title="Fixed"
          count={summary.resolved.length}
          tone="green"
          icon={<CheckMark className="h-5 w-5" />}
        >
          <EntryList groups={summary.resolved} />
        </FactCheckSection>
      )}
      {summary.notes.length > 0 && (
        <FactCheckSection
          title="Notes"
          count={summary.notes.length}
          tone="grey"
          icon={<MessageSquare className="h-4 w-4" aria-hidden />}
        >
          <EntryList groups={summary.notes} />
        </FactCheckSection>
      )}
    </>
  )
}

const STATUS_LABEL: Record<string, { label: string; tone: FactCheckTone }> = {
  verified: { label: 'Verified', tone: 'green' },
  in_review: { label: 'Under review', tone: 'amber' },
  stale: { label: 'Re-check needed', tone: 'amber' },
  disputed: { label: 'Disputed', tone: 'red' },
  unverified: { label: 'Not verified', tone: 'grey' },
}

/**
 * One pass of the check history. Folded, it is *when* and *with what result*;
 * opened, what the pass concluded and who ran it, with the itemised list of
 * what it compared behind one more tap — that list is long, and it is the
 * evidence for the conclusion rather than the conclusion.
 */
function CheckRow({ entry }: { entry: LogEntry }) {
  const [open, setOpen] = useState(false)
  const [showChecks, setShowChecks] = useState(false)
  const status = STATUS_LABEL[logField(entry, 'status_set')] ?? null
  const date = formatCheckedDate(entry.date) ?? entry.date
  const confidence = logField(entry, 'confidence')
  const note = logField(entry, 'note')
  const checks = logField(entry, 'checks_run')
  const meta = [checkerName(entry.author), confidence && `${confidence} confidence`]
    .filter(Boolean).join(' · ')

  return (
    <li>
      <button
        type="button"
        onClick={() => setOpen((v) => !v)}
        aria-expanded={open}
        data-sound="tap"
        className={cn('flex w-full items-center gap-2.5 px-3 py-3 text-left transition-colors hover:bg-accent/50', ROW_FOCUS)}
      >
        <span className={cn('min-w-0 flex-1 text-sm tabular-nums', open && 'font-medium')}>{date}</span>
        {status && (
          <span className={cn('shrink-0 rounded-full px-2 py-0.5 text-[10px] font-semibold uppercase tracking-wide',
            FACT_CHECK_TONE_CLASSES[status.tone])}>
            {status.label}
          </span>
        )}
        <ChevronDown
          className={cn('h-4 w-4 shrink-0 text-muted-foreground transition-transform', open && 'rotate-180')}
          aria-hidden
        />
      </button>

      {open && (
        <div className="space-y-3 px-3 pb-4">
          {note && <p className="break-words text-sm leading-relaxed">{note}</p>}
          {checks && (
            <div>
              <button
                type="button"
                onClick={() => setShowChecks((v) => !v)}
                aria-expanded={showChecks}
                data-sound="tap"
                className={cn('inline-flex items-center gap-1 rounded-md text-xs font-medium text-muted-foreground transition-colors hover:text-foreground', ROW_FOCUS)}
              >
                What was compared
                <ChevronDown className={cn('h-3.5 w-3.5 transition-transform', showChecks && 'rotate-180')} aria-hidden />
              </button>
              {showChecks && (
                <p className="mt-1.5 break-words text-xs leading-relaxed text-muted-foreground">{checks}</p>
              )}
            </div>
          )}
          {meta && <p className="text-xs text-muted-foreground">{meta}</p>}
        </div>
      )}
    </li>
  )
}

function EntryList({ groups }: { groups: LogEntryGroup[] }) {
  return (
    <ul className="divide-y divide-border">
      {groups.map((group) => (
        <EntryRow key={group.entry.id} group={group} />
      ))}
    </ul>
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
        className={cn('flex w-full items-start gap-2.5 px-3 py-3 text-left transition-colors hover:bg-accent/50', ROW_FOCUS)}
      >
        {applied && <CheckMark className="mt-0.5 h-4 w-4" />}
        <span className={cn('min-w-0 flex-1 break-words text-sm', open && 'font-medium')}>
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
        <div className="px-3 pb-4">
          <EntryDetail group={group} />
        </div>
      )}
    </li>
  )
}

/**
 * What one entry says, in the order a reader asks it: *what was wrong* (the
 * diff), *what was done about it* (the outcome), and last, quietly, *when and
 * by whom*. Exported for its test.
 */
export function EntryDetail({ group }: { group: LogEntryGroup }) {
  const { entry, closedBy } = group
  const claim = logField(entry, 'claim')
  const evidence = summarizeEvidence(logField(entry, 'evidence'))
  const outcome = findingOutcome(group)
  const note = logField(entry, 'note')
  // A resolution folded into something other than a finding still has its say.
  const closingNote = !outcome && closedBy ? logField(closedBy, 'note') : ''
  const hasDiff = Boolean(claim || evidence.text)
  const date = formatCheckedDate(entry.date) ?? entry.date
  const author = entry.author.replace(/^(agent|human):/, '')
  const meta = [entry.entryType === 'finding' && date ? `Found ${date}` : date, author]
    .filter(Boolean).join(' · ')

  return (
    <div className="space-y-4">
      {hasDiff && (
        <div className="overflow-hidden rounded-lg border border-border">
          {claim && <DiffSide side="removed" label="Page said" text={claim} />}
          {evidence.text && (
            <DiffSide side="added" label="Source says" text={evidence.text} links={evidence.links} />
          )}
        </div>
      )}
      {outcome && <Outcome outcome={outcome} />}
      {note && <EntryNote label={hasDiff || outcome ? 'Note' : null} text={note} />}
      {closingNote && <EntryNote label="Closed" text={closingNote} />}
      {meta && <p className="text-xs text-muted-foreground">{meta}</p>}
    </div>
  )
}

/**
 * One side of the diff. The mark and its label carry the colour; the words stay
 * in the foreground colour so a long passage of evidence reads as text, not as
 * an alarm (`FACT_CHECK_DIFF`).
 */
function DiffSide({
  side,
  label,
  text,
  links = [],
}: {
  side: 'removed' | 'added'
  label: string
  text: string
  links?: string[]
}) {
  const tone = FACT_CHECK_DIFF[side]
  return (
    <div className={cn('flex gap-2 px-3 py-2.5', tone.surface)}>
      <span
        className={cn('w-3 shrink-0 select-none text-center font-mono text-sm font-bold leading-5', tone.mark)}
        aria-hidden
      >
        {side === 'removed' ? '−' : '+'}
      </span>
      <div className="min-w-0 flex-1">
        <p className={cn('text-xs font-semibold leading-5', tone.mark)}>{label}</p>
        <p className="mt-0.5 break-words text-sm leading-relaxed">{text}</p>
        {links.length > 0 && (
          <div className="mt-2.5 flex flex-wrap gap-2">
            {links.map((url) => <SourceLink key={url} url={url} />)}
          </div>
        )}
      </div>
    </div>
  )
}

/**
 * A URL the evidence cited, named by its publisher. A PDF is read in the app
 * like every other PDF the app offers (`PdfLinkButton`); anything else is a
 * link out, in the same shape so the two don't read as different kinds of thing.
 */
function SourceLink({ url }: { url: string }) {
  const host = pdfSourceHost(url) || 'Source'
  if (/\.pdf(?:$|[?#])/i.test(url)) {
    return (
      <PdfLinkButton
        url={url}
        label={host}
        title={pdfFileName(url)}
        subtitle={host}
        ariaLabel={`Read the source on ${host} (PDF)`}
        className="min-h-[32px] px-2.5 py-1"
      />
    )
  }
  return (
    <a
      href={url}
      target="_blank"
      rel="noreferrer"
      aria-label={`Open the source on ${host}`}
      className={cn('inline-flex min-h-[32px] items-center gap-2 rounded-md border border-border bg-card px-2.5 py-1 text-sm font-medium text-foreground shadow-sm transition-colors hover:bg-accent hover:text-accent-foreground', ROW_FOCUS)}
    >
      <ExternalLink className="h-4 w-4 shrink-0 text-primary" aria-hidden />
      {host}
    </a>
  )
}

const OUTCOME_LABEL: Record<FindingOutcome['kind'], string> = {
  fixed: 'Fixed',
  wontfix: 'Won’t fix',
  superseded: 'Superseded',
  applied: 'Corrected on the page',
  proposed: 'Suggested fix',
}

/** What became of a finding: the line under the diff. */
function Outcome({ outcome }: { outcome: FindingOutcome }) {
  const done = outcome.kind === 'fixed' || outcome.kind === 'applied'
  const Icon = outcome.kind === 'proposed' ? Wrench : CircleSlash
  // The date it was closed, or — for a correction already on the page — that
  // nobody has signed it off yet, which is why it is still listed as open.
  const aside = 'date' in outcome
    ? formatCheckedDate(outcome.date) ?? outcome.date
    : outcome.kind === 'applied' ? 'not yet signed off' : ''
  return (
    <div className="flex gap-2.5">
      {done
        ? <CheckMark className="mt-0.5 h-4 w-4" />
        : <Icon className="mt-0.5 h-4 w-4 shrink-0 text-muted-foreground" aria-hidden />}
      <div className="min-w-0 flex-1">
        <p className="text-sm font-medium leading-5">
          {OUTCOME_LABEL[outcome.kind]}
          {aside && <span className="font-normal text-muted-foreground"> · {aside}</span>}
        </p>
        {outcome.note && (
          <p className="mt-1 break-words text-sm leading-relaxed">{outcome.note}</p>
        )}
      </div>
    </div>
  )
}

function EntryNote({ label, text }: { label: string | null; text: string }) {
  return (
    <div>
      {label && <p className="text-xs font-semibold text-muted-foreground">{label}</p>}
      <p className={cn('break-words text-sm leading-relaxed', label && 'mt-0.5')}>{text}</p>
    </div>
  )
}
