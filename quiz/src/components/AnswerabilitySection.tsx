import { useEffect, useState } from 'react'
import { ChevronDown, ListChecks } from 'lucide-react'
import { fetchAllQuestions, fetchWikiFile } from '@/lib/github'
import { useWikiSyllabus } from '@/hooks/useWikiSyllabus'
import examPages from 'virtual:exam-pages'
import { formatCheckedDate } from '@/lib/verification'
import { FACT_CHECK_TONE_CLASSES } from '@/lib/factCheckTone'
import { FactCheckSection } from '@/components/FactCheckSection'
import { MarkdownText } from '@/components/MarkdownText'
import { cn } from '@/lib/utils'
import {
  answerabilityEntry,
  answerabilityHistory,
  answerabilityRecordPath,
  checkSentence,
  nowSentence,
  parseAnswerabilityRecord,
  questionTagTitles,
  quoteText,
  prerequisitePages,
  reachNow,
  requirementLabel,
  requirementNow,
  stateLabel,
  verdictLabel,
  verdictNow,
  TIER_LABEL,
  type AnswerabilityEntry,
  type AnswerabilityEvent,
  type AnswerabilityRecord,
  type AnswerabilityRequirement,
  type AnswerabilityTier,
  type Label,
  type ReachNow,
} from '@/lib/answerability'

/**
 * A question's **answerability** history in the Fact Check panel: whether the
 * notes teach what its official solution uses, and where (`lib/answerability.ts`).
 *
 * The fact check asks whether the question is *right*; this asks whether a
 * reader of the notes could *answer* it — the check behind publication gate G8.
 * It is one more folding card under the record, in the same shape as *Check
 * history*: each pass a row, its date and verdict folded, and opened, what the
 * solution needs, one item at a time, with the passage that teaches it.
 *
 * The card leads with where the question stands **now** — its verdict in the
 * header, and each requirement with its state today (`requirementNow`): closed
 * by a resolution, or brought into reach since by a retag or by the exam's own
 * syllabus pages (D30) — because the check's own rows stay as the check found
 * them, and an item the gate has long since closed would otherwise still read
 * "Out of reach" under a "Gap".
 *
 * A question whose bank has no record, or that the check hasn't reached,
 * draws nothing — the same as a page with no log.
 */

const ROW_FOCUS = 'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring'

/** A bank's record, parsed once per session — it is the same file for every question in it. */
const records = new Map<string, Promise<AnswerabilityRecord | null>>()

function loadRecord(path: string): Promise<AnswerabilityRecord | null> {
  let pending = records.get(path)
  if (!pending) {
    pending = fetchWikiFile(path).then(parseAnswerabilityRecord, () => null)
    records.set(path, pending)
    // A failed fetch isn't remembered: the next panel tries again.
    pending.then((r) => { if (!r) records.delete(path) })
  }
  return pending
}

/** A question's tags as they are now, read off its file in the bundled bank. */
async function loadTags(id: string): Promise<string[]> {
  const idLine = new RegExp(`^id:\\s*["']?${id.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')}["']?\\s*$`, 'm')
  const raw = (await fetchAllQuestions()).find((q) => idLine.test(q))
  return raw ? questionTagTitles(raw) : []
}

export function AnswerabilitySection({ contentPath }: { contentPath: string }) {
  const recordPath = answerabilityRecordPath(contentPath)
  const { syllabi } = useWikiSyllabus()
  const [found, setFound] = useState<{ entry: AnswerabilityEntry; exam: string; tags: string[] } | null>(null)

  useEffect(() => {
    let cancelled = false
    setFound(null)
    if (!recordPath) return
    loadRecord(recordPath).then(async (record) => {
      const entry = record ? answerabilityEntry(record, contentPath) : null
      if (!entry || cancelled) return
      // Without its tags the card still draws, from the record and the syllabus.
      const tags = await loadTags(entry.id).catch(() => [])
      if (!cancelled) setFound({ entry, exam: record!.exam, tags })
    })
    return () => { cancelled = true }
  }, [recordPath, contentPath])

  if (!found) return null
  // The exam's syllabus pages: what its learning objectives link (D30), and the
  // pages it assumes through its Prerequisite knowledge callout.
  const objectivePages = (file: string) =>
    syllabi.find((s) => s.fileName === file.replace(/\.md$/i, ''))?.topics.flatMap((t) => t.concepts.map((c) => c.name)) ?? []
  const reach = reachNow(found.tags, objectivePages(found.exam), prerequisitePages(found.exam, examPages, objectivePages))
  return <AnswerabilityHistory entry={found.entry} reach={reach} />
}

/** The card itself, given the question's entry and what it reaches now. Exported for its test. */
export function AnswerabilityHistory({ entry, reach }: { entry: AnswerabilityEntry; reach?: ReachNow }) {
  const history = answerabilityHistory(entry)
  const verdict = verdictLabel(verdictNow(entry, reach))
  const latest = formatCheckedDate(history[0]?.date ?? null)
  return (
    <FactCheckSection
      title="Answerability"
      count={history.length}
      detail={[verdict.label, latest && `Latest ${latest}`].filter(Boolean).join(' · ')}
      tone={verdict.tone}
      icon={<ListChecks className="h-4 w-4" aria-hidden />}
    >
      {entry.requirements.length > 0 && (
        <div className="space-y-3 border-b border-border px-3 py-3">
          <p className="break-words text-sm leading-relaxed">{nowSentence(entry, reach)}</p>
          <ol className="space-y-2">
            {entry.requirements.map((req) => <RequirementRow key={req.id} req={req} reach={reach} />)}
          </ol>
        </div>
      )}
      <ul className="divide-y divide-border">
        {history.map((event) => <EventRow key={event.key} event={event} />)}
      </ul>
    </FactCheckSection>
  )
}

function Pill({ label }: { label: Label }) {
  return (
    <span className={cn('shrink-0 rounded-full px-2 py-0.5 text-[10px] font-semibold uppercase tracking-wide',
      FACT_CHECK_TONE_CLASSES[label.tone])}>
      {label.label}
    </span>
  )
}

/** One pass: the check, or a requirement closed since. Folded, *when* and *what result*. */
function EventRow({ event }: { event: AnswerabilityEvent }) {
  const [open, setOpen] = useState(false)
  const date = formatCheckedDate(event.date) ?? event.date ?? 'Undated'
  const pill = event.kind === 'check'
    ? verdictLabel(event.entry.verdict)
    : requirementLabel(event.requirement)

  return (
    <li>
      <button
        type="button"
        onClick={() => setOpen((v) => !v)}
        aria-expanded={open}
        data-sound="tap"
        className={cn('flex w-full items-center gap-2.5 px-3 py-3 text-left transition-colors hover:bg-accent/50', ROW_FOCUS)}
      >
        <span className={cn('min-w-0 flex-1 text-sm tabular-nums', open && 'font-medium')}>
          {date}
          {event.kind === 'resolution' && <span className="text-muted-foreground"> · {event.requirement.concept || 'Requirement'}</span>}
        </span>
        <Pill label={pill} />
        <ChevronDown
          className={cn('h-4 w-4 shrink-0 text-muted-foreground transition-transform', open && 'rotate-180')}
          aria-hidden
        />
      </button>

      {open && (
        <div className="space-y-3 px-3 pb-4">
          {event.kind === 'check' ? (
            <>
              <p className="break-words text-sm leading-relaxed">{checkSentence(event.entry)}</p>
              {event.entry.requirements.length > 0 && (
                <ol className="space-y-2">
                  {event.entry.requirements.map((req) => <RequirementRow key={req.id} req={req} asChecked />)}
                </ol>
              )}
            </>
          ) : (
            <>
              <p className="break-words text-sm leading-relaxed">{event.requirement.statement}</p>
              {event.resolution.note && (
                <p className="break-words text-sm leading-relaxed text-muted-foreground">{event.resolution.note}</p>
              )}
              {event.resolution.page && event.resolution.quote && (
                <Passage page={event.resolution.page} quote={event.resolution.quote} />
              )}
            </>
          )}
        </div>
      )}
    </li>
  )
}

/**
 * One thing the solution uses. Folded, the statement and where it is taught;
 * opened, the passages the check quoted for it — the evidence, one tap away.
 */
function RequirementRow({ req, reach, asChecked = false }: {
  req: AnswerabilityRequirement
  reach?: ReachNow
  /** In the check's own row: the requirement as the check found it, before any resolution. */
  asChecked?: boolean
}) {
  const [open, setOpen] = useState(false)
  const now = requirementNow(req, reach)
  const label = asChecked
    ? TIER_LABEL[req.status as AnswerabilityTier] ?? { label: req.status || 'Unknown', tone: 'grey' as const }
    : stateLabel(now)
  const resolved = !asChecked && req.resolution?.kind === 'taught' && req.resolution.page && req.resolution.quote
    ? [{ page: req.resolution.page, quote: req.resolution.quote }]
    : []
  // The passage that puts it in reach now leads.
  const recorded = !asChecked && now.page
    ? [...req.places.filter((p) => p.page === now.page), ...req.places.filter((p) => p.page !== now.page)]
    : req.places
  const places = [...resolved, ...recorded]
  const note = asChecked ? '' : req.resolution?.note ?? ''
  const canOpen = places.length > 0 || Boolean(note)

  return (
    <li className="overflow-hidden rounded-lg border border-border">
      <button
        type="button"
        onClick={() => canOpen && setOpen((v) => !v)}
        aria-expanded={canOpen ? open : undefined}
        disabled={!canOpen}
        data-sound={canOpen ? 'tap' : 'none'}
        className={cn('block w-full px-3 py-2.5 text-left transition-colors enabled:hover:bg-accent/50', ROW_FOCUS)}
      >
        {/* The pill rides the concept's line, so the statement gets the full width. */}
        <span className="flex items-center gap-2.5">
          <span className="min-w-0 flex-1 truncate text-xs font-medium text-muted-foreground">{req.concept}</span>
          <Pill label={label} />
          {canOpen && (
            <ChevronDown
              className={cn('h-4 w-4 shrink-0 text-muted-foreground transition-transform', open && 'rotate-180')}
              aria-hidden
            />
          )}
        </span>
        <span className="mt-1 block break-words text-sm leading-relaxed">{req.statement}</span>
      </button>
      {open && (
        <div className="space-y-2 border-t border-border px-3 py-2.5">
          {note && <p className="break-words text-sm leading-relaxed text-muted-foreground">{note}</p>}
          {places.map((p, i) => <Passage key={`${p.page}:${i}`} page={p.page} quote={p.quote} />)}
        </div>
      )}
    </li>
  )
}

/** A passage the notes teach it in, under the name of its page. */
function Passage({ page, quote }: { page: string; quote: string }) {
  return (
    <figure>
      <figcaption className="text-xs font-semibold text-muted-foreground">{page}</figcaption>
      <blockquote className="mt-1 border-l-2 border-border pl-3">
        <MarkdownText className="break-words text-sm leading-relaxed [&_p]:my-0">{quoteText(quote)}</MarkdownText>
      </blockquote>
    </figure>
  )
}
