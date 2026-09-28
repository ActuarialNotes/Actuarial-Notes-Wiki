import { useEffect, useState } from 'react'
import {
  AlertCircle,
  ChevronDown,
  CircleSlash,
  ExternalLink,
  Flag,
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
  FACT_CHECK_TONE_ICONS,
  SEVERITY_TONE,
} from '@/lib/factCheckTone'
import {
  parseVerificationLog,
  factCheckBadge,
  findingOutcome,
  formatCheckedDate,
  logField,
  summarizeEvidence,
  summarizeLog,
  verificationLogPath,
  type FindingOutcome,
  type LogEntryGroup,
  type LogEntrySeverity,
  type LogSummary,
  type Verification,
  type VerificationLog,
} from '@/lib/verification'

/**
 * The read-only **Fact Check** record for one page.
 *
 * A reader opens this with one question — *can I trust what I just read?* — and
 * the verdict answers it in a line. Everything else is the working behind that
 * verdict, and it is a lot: findings, the notes people have left, and the books
 * the page was read against. So the verdict is all the panel shows until it is
 * asked for more; the record unfolds under it on a tap. Everything the record
 * carries beyond that — content hashes, run ids, fingerprints, the page locator
 * a finding was written against — is auditor's material. It stays in the vault,
 * where `verify_check.py` can enforce it, and reaches the screen only through a
 * link's accessible name. Showing the work is the point; showing the paperwork
 * is not.
 *
 * Unfolded, the record is a stack of cards of one shape
 * (`components/FactCheckSection.tsx`) — **Open**, **Fixed**, **Notes**, then
 * **Checked against** — each naming what it holds and how many, so the folded
 * stack is itself the summary. Only Open starts unfolded: what is still wrong
 * with the page is what a reader came for.
 *
 *  - the **verdict tile** — the tinted mark from `lib/factCheckTone.ts` on the
 *    `rounded-xl bg-muted/50` block the question-info sheet leads with, and the
 *    disclosure for everything below it;
 *  - a **finding** as one row of its section, with its severity as a chip on the
 *    same four tones. Opened, it is a **diff**: what the page said, marked `−` on
 *    a red wash, over what the source says, marked `+` on a green one — the two
 *    things that disagree, side by side in the shape everyone already reads as
 *    *before / after*. Under it, what became of it (`findingOutcome`): fixed and
 *    when, with what the fix said; corrected on the page but not signed off; or
 *    the fix still only suggested. The date and author close it, quietly. The
 *    evidence is cut free of its hashes and URLs (`summarizeEvidence`), and the
 *    URLs come back as buttons to go and read the source;
 *  - a **source** as the resource card a resource page leads with, carrying the
 *    chapters and pages the claim was checked on
 *    (`components/FactCheckSources.tsx`).
 *
 * Sidecar logs are deliberately not bundled at build time — they grow without
 * bound and only matter when someone opens this panel — so the log is fetched
 * when the record is opened, not when the panel mounts. The verdict and the
 * sources come from the page's own `verification:` block and need no fetch.
 */

/**
 * Statuses whose verdict doesn't say what to do about it. `unverified` is not
 * one of them: "Not fact checked" is the whole story, and "Not yet checked
 * against a source" underneath it is the same sentence twice.
 */
const NEEDS_DETAIL = new Set(['in_review', 'stale', 'disputed'])

/** Worst first — the order the open section's breakdown and tile read in. */
const SEVERITIES: LogEntrySeverity[] = ['critical', 'major', 'minor', 'nit']

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
  const [open, setOpen] = useState(false)
  const [log, setLog] = useState<VerificationLog | null>(null)
  const [loaded, setLoaded] = useState(false)
  const [reporting, setReporting] = useState(false)

  const logPath = verification?.log || verificationLogPath(contentPath)

  // Fetched on the first unfolding rather than on mount: a reader who only
  // wanted the verdict never pays for the log, and re-folding the record keeps
  // what was already read.
  useEffect(() => {
    if (!open || loaded) return
    let cancelled = false
    fetchWikiFile(logPath)
      .then((raw) => { if (!cancelled) setLog(parseVerificationLog(raw)) })
      // A page with nothing recorded yet has no log file at all. That is the
      // normal state for most of the vault, not an error.
      .catch(() => { if (!cancelled) setLog(null) })
      .finally(() => { if (!cancelled) setLoaded(true) })
    return () => { cancelled = true }
  }, [open, loaded, logPath])

  // A path change is a different page's record — drop what was loaded for the
  // last one rather than showing its findings under this page's verdict.
  useEffect(() => {
    setLog(null)
    setLoaded(false)
  }, [logPath])

  const badge = factCheckBadge(verification)
  const ToneIcon = FACT_CHECK_TONE_ICONS[badge.tone]
  const checked = formatCheckedDate(verification?.lastChecked ?? null)
  // One supporting line under the verdict, never two: what to do about the
  // status where the label doesn't say, otherwise the date the label lacks.
  const support = verification && NEEDS_DETAIL.has(verification.status)
    ? badge.detail
    : checked && !badge.label.endsWith(checked) ? checked : null
  const summary = log && log.entries.length > 0 ? summarizeLog(log) : null

  return (
    <div className="space-y-5 text-sm">
      <button
        type="button"
        onClick={() => setOpen((v) => !v)}
        aria-expanded={open}
        data-sound="tap"
        className={cn('flex w-full items-center gap-3 rounded-xl bg-muted/50 p-3 text-left transition-colors hover:bg-muted', ROW_FOCUS)}
      >
        <span
          className={cn('flex h-9 w-9 shrink-0 items-center justify-center rounded-lg',
            FACT_CHECK_TONE_CLASSES[badge.tone])}
        >
          <ToneIcon className="h-4 w-4" aria-hidden />
        </span>
        <div className="min-w-0 flex-1">
          <p className="font-medium leading-tight">{badge.label}</p>
          {support && <p className="mt-0.5 text-xs text-muted-foreground">{support}</p>}
        </div>
        <ChevronDown
          className={cn('h-5 w-5 shrink-0 text-muted-foreground transition-transform', open && 'rotate-180')}
          aria-hidden
        />
      </button>

      {open && (
        <div className="space-y-2">
          {!loaded ? (
            <p className="flex items-center gap-2 text-sm text-muted-foreground">
              <Loader2 className="h-4 w-4 animate-spin" aria-hidden />
              Loading
            </p>
          ) : (
            <>
              {summary ? (
                <LogSections summary={summary} />
              ) : verification && verification.status !== 'unverified' && (
                <p className="text-sm text-muted-foreground">Nothing recorded yet.</p>
              )}

              {/* What the page was actually read against, under the record: what
                  has been *found* on a page is what a reader came for, and the
                  books it was checked on are how they'd go and settle it
                  themselves. Unfolded when it is all there is to show. */}
              <FactCheckSources sources={verification?.sources ?? []} defaultOpen={!summary} />
            </>
          )}
        </div>
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

/** The log's three sections, each a card that folds (`FactCheckSection`). */
function LogSections({ summary }: { summary: LogSummary }) {
  return (
    <>
      {summary.open.length > 0 && (
        <FactCheckSection
          title="Open"
          count={summary.open.length}
          detail={severityBreakdown(summary.open)}
          tone={worstTone(summary.open)}
          icon={<AlertCircle className="h-4 w-4" aria-hidden />}
          defaultOpen
        >
          <EntryList groups={summary.open} />
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
