import { useEffect, useState } from 'react'
import { ChevronRight, ExternalLink, FileText, Info, X } from 'lucide-react'
import { Link } from 'react-router-dom'
import { cn } from '@/lib/utils'
import { githubBlobUrl } from '@/lib/github'
import { conceptLabel } from '@/lib/questionFilters'
import { hrefToEntryRef, wikiRoute } from '@/lib/wikiRoutes'
import { questionSource } from '@/lib/questionSource'
import { useSoundOnMount } from '@/hooks/useSoundEffects'
import { OverlayPortal } from '@/components/ui/OverlayPortal'
import { FACT_CHECK_UI_ENABLED } from '@/lib/featureFlags'
import { FACT_CHECK_TONE_CLASSES, FACT_CHECK_ICONS } from '@/lib/factCheckTone'
import { factCheckBadge } from '@/lib/verification'
import { FactCheckDialog } from '@/components/FactCheckBadge'
import { PdfLinkButton } from '@/components/PdfLinkButton'
import type { Question } from '@/lib/parser'

/**
 * **Question info** — where the question on screen came from.
 *
 * Sits beside the flag in the quiz's question bar, because that is the moment
 * the question gets asked: a candidate who half-recognises a question wants to
 * know which paper it was sat on, and one who thinks the answer is wrong wants
 * the file to report or fix. Neither is on screen anywhere else mid-quiz. Every
 * list of questions carries it too, on each row (`QuestionSearchRow`), so a
 * question's source and fact check can be read before it is ever drawn.
 *
 * It is also where a question's **fact check** is read from. A concept page
 * carries that on its action menu and a resource page on its own, but a
 * question is only ever met inside a quiz — so the record of what has been
 * checked about *this* question, and anything known to be wrong with it, hangs
 * off the same button as the rest of its provenance.
 *
 * What it deliberately does *not* show while the question is unanswered is the
 * study metadata — topic, learning objective, difficulty. `QuestionCard` hides
 * those during a live quiz for the same reason (`showMeta`): "hard, Bayes
 * Theorem" narrows four options down to two. They appear once the answer is in.
 */

const TYPE_LABELS: Record<Question['type'], string> = {
  'multiple-choice': 'Multiple choice',
  'free-entry': 'Written answer',
  'multi-part': 'Multi-part',
}

interface QuestionInfoButtonProps {
  question: Question
  open: boolean
  onOpenChange: (open: boolean) => void
  /** Show topic / objective / difficulty — only once the answer is locked in. */
  showStudyMeta?: boolean
  /**
   * Open one of the question's concepts in the concept popup — `links` is
   * the question's `wiki_link` tags, `index` the one tapped. Without it, a
   * concept row goes to the concept's page.
   */
  onOpenConcept?: (links: string[], index: number) => void
  className?: string
}

export function QuestionInfoButton({
  question,
  open,
  onOpenChange,
  showStudyMeta = false,
  onOpenConcept,
  className,
}: QuestionInfoButtonProps) {
  return (
    <>
      <button
        type="button"
        onClick={() => onOpenChange(!open)}
        aria-label="Question info"
        aria-expanded={open}
        title="Where this question came from (i)"
        className={cn(
          'flex min-h-[44px] items-center gap-1.5 whitespace-nowrap rounded-lg px-2.5 py-2 text-sm font-medium transition-colors hover:bg-accent sm:px-3',
          open ? 'text-foreground' : 'text-muted-foreground hover:text-foreground',
          className,
        )}
      >
        <Info className="h-4 w-4" aria-hidden />
        Info
      </button>

      {open && (
        <QuestionInfoDialog
          question={question}
          showStudyMeta={showStudyMeta}
          onOpenConcept={onOpenConcept}
          onClose={() => onOpenChange(false)}
        />
      )}
    </>
  )
}

interface QuestionInfoDialogProps {
  question: Question
  showStudyMeta?: boolean
  onOpenConcept?: (links: string[], index: number) => void
  onClose: () => void
}

export function QuestionInfoDialog({
  question,
  showStudyMeta = false,
  onOpenConcept,
  onClose,
}: QuestionInfoDialogProps) {
  const [showFactCheck, setShowFactCheck] = useState(false)
  // Paper: the panel sliding in, same as the shortcuts sheet next to it.
  useSoundOnMount('open')
  useEffect(() => {
    // The fact-check sheet opens on top of this one and binds Esc itself, so
    // this panel hands the keys over while it is up — otherwise one Esc closed
    // the record *and* the panel it was opened from.
    if (showFactCheck) return
    function onKey(e: KeyboardEvent) {
      if (e.key === 'Escape' || e.key === 'i') {
        e.preventDefault()
        onClose()
      }
    }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [onClose, showFactCheck])

  const source = questionSource(question)
  const factCheck = factCheckBadge(question.verification)
  const FactCheckIcon = FACT_CHECK_ICONS[factCheck.kind]
  // The record is addressed by the question's own vault path, which only the
  // `verification:` block carries (`contentPathFromVerification`). With no
  // block there is nothing to open and nothing to report against.
  const factCheckPath = question.verification ? source.path : null

  return (
    <OverlayPortal>
      <div
        // z-[130], the record sheets' layer: a question list that opens this
        // can itself be a z-[130] modal (the concept questions modal, the
        // learning-progress modal), and a later sibling at the same layer
        // paints on top.
        className="fixed inset-0 z-[130] flex items-center justify-center p-4 paper-scrim"
        role="dialog"
        aria-modal="true"
        aria-label="Question info"
      >
        <div className="absolute inset-0 bg-black/40" onClick={onClose} aria-hidden="true" />
        <div className="relative z-10 w-full max-w-sm space-y-4 rounded-xl bg-background p-5 shadow-xl">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Info className="h-4 w-4 text-muted-foreground" aria-hidden />
              <h2 className="text-sm font-semibold">Question info</h2>
            </div>
            <button
              type="button"
              onClick={onClose}
              aria-label="Close"
              className="flex h-7 w-7 items-center justify-center rounded-md text-muted-foreground transition-colors hover:bg-accent hover:text-foreground"
            >
              <X className="h-4 w-4" />
            </button>
          </div>

          {/* The answer to "where did this come from", first and in full. */}
          <section className="rounded-xl bg-muted/50 p-3">
            <p className="text-sm font-medium">{source.label}</p>
            <p className="mt-0.5 text-xs text-muted-foreground">{source.detail}</p>
            {source.document && (
              // The publisher's own paper, read in the app like every other PDF
              // — a candidate mid-quiz who wants to see what the examiners said
              // should not have to leave for a browser tab and find their way
              // back to a half-finished paper.
              //
              // This panel closes as it hands over. It is a signpost, not a
              // reading surface: once the document is up, the only thing behind
              // it worth returning to is the question, so closing the reader
              // puts the candidate back on it rather than on a dialog about it.
              <PdfLinkButton
                url={source.document.url}
                label={source.document.label}
                subtitle={source.label}
                onOpen={onClose}
                className="mt-3"
              />
            )}
          </section>

          {/* The verdict, in the same tinted mark the badge and the panel use,
              on the document row shape the source above it wears — a record to
              open, not a status to read and move past. */}
          {FACT_CHECK_UI_ENABLED && factCheckPath && (
            <button
              type="button"
              onClick={() => setShowFactCheck(true)}
              data-sound="tap"
              aria-label={`Fact check: ${factCheck.label}. ${factCheck.detail}`}
              className="flex w-full items-center gap-2.5 rounded-lg border border-border bg-card px-3 py-2.5 text-left transition-colors hover:bg-accent hover:text-accent-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
            >
              <span
                className={cn('flex h-7 w-7 shrink-0 items-center justify-center rounded-md',
                  FACT_CHECK_TONE_CLASSES[factCheck.tone])}
              >
                <FactCheckIcon className="h-4 w-4" aria-hidden />
              </span>
              <span className="min-w-0 flex-1 text-sm font-medium">{factCheck.label}</span>
              <ChevronRight className="h-4 w-4 shrink-0 text-muted-foreground" aria-hidden />
            </button>
          )}

          <QuestionConcepts
            links={question.wiki_link}
            onOpen={onClose}
            onRead={onOpenConcept && ((i: number) => { onClose(); onOpenConcept(question.wiki_link, i) })}
          />

          <dl className="space-y-2 text-sm">
            <InfoRow label="Question ID" value={question.id} mono />
            <InfoRow
              label="Format"
              value={`${TYPE_LABELS[question.type]} · ${question.points > 0
                ? `${question.points} ${question.points === 1 ? 'point' : 'points'}`
                : 'no point value printed'}`}
            />
            {question.author && <InfoRow label="Author" value={question.author} />}
            {showStudyMeta && (
              <>
                <InfoRow label="Topic" value={question.topic} />
                {question.learning_objective && (
                  <InfoRow label="Learning objective" value={question.learning_objective} />
                )}
                <InfoRow label="Difficulty" value={question.difficulty} capitalize />
              </>
            )}
            {/* Stacked rather than paired: a vault path is long enough to
                wrap on a phone, and a wrapped right-aligned value is unreadable. */}
            <InfoRow
              label="File"
              value={source.path ?? 'Not recorded in this question’s file'}
              mono={!!source.path}
              stack
            />
          </dl>

          {source.path && (
            <div className="border-t pt-3">
              <a
                href={githubBlobUrl(source.path)}
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center gap-1 text-xs text-muted-foreground transition-colors hover:text-foreground"
              >
                <ExternalLink className="h-3 w-3" aria-hidden />
                View on GitHub
              </a>
            </div>
          )}

          {factCheckPath && (
            <FactCheckDialog
              open={showFactCheck}
              onClose={() => setShowFactCheck(false)}
              verification={question.verification}
              contentPath={factCheckPath}
              contentName={source.sitting ? `${source.exam} · ${source.sitting}` : question.id}
            />
          )}
        </div>
      </div>
    </OverlayPortal>
  )
}

/**
 * The concepts the question is tagged with (`wiki_link`), folded shut. Closed
 * by default for the reason the study metadata waits for the answer: a list of
 * concepts narrows a question down. Opening it is the reader's choice. Each
 * row goes to the concept's page — the quiz outlives the page
 * (`lib/quizResume.ts`), so the Return pill brings the reader back to it.
 */
function QuestionConcepts({
  links,
  onOpen,
  onRead,
}: {
  links: string[]
  onOpen: () => void
  /** Read the concept at this index in the popup, rather than going to its page. */
  onRead?: (index: number) => void
}) {
  const [open, setOpen] = useState(false)
  if (links.length === 0) return null
  const names = links.map(conceptLabel)
  return (
    <section className="rounded-lg border border-border">
      <button
        type="button"
        onClick={() => setOpen(v => !v)}
        aria-expanded={open}
        data-sound="tap"
        className="flex w-full items-center gap-2 rounded-lg px-3 py-2.5 text-left text-sm font-medium transition-colors hover:bg-accent focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
      >
        <ChevronRight
          className={cn('h-4 w-4 shrink-0 text-muted-foreground transition-transform', open && 'rotate-90')}
          aria-hidden
        />
        <span className="flex-1">Concepts</span>
        <span className="text-xs text-muted-foreground">{links.length}</span>
      </button>
      {open && (
        <ul className="space-y-0.5 border-t px-1.5 py-1.5">
          {links.map((link, i) => {
            const name = names[i]
            const row = 'flex w-full items-center gap-2.5 rounded-md px-2 py-2.5 text-left text-sm transition-colors hover:bg-accent'
            if (onRead) {
              return (
                <li key={link}>
                  <button type="button" data-sound="tap" onClick={() => onRead(i)} className={row}>
                    <FileText className="h-4 w-4 shrink-0 text-violet-500" aria-hidden />
                    <span className="min-w-0 flex-1 truncate">{name}</span>
                    <span className="shrink-0 text-xs text-muted-foreground">Read</span>
                  </button>
                </li>
              )
            }
            return (
              <li key={link}>
                <Link
                  to={wikiRoute(hrefToEntryRef(link) ?? { kind: 'concept', name })}
                  onClick={onOpen}
                  className="flex items-center gap-2.5 rounded-md px-2 py-1.5 text-sm transition-colors hover:bg-accent"
                >
                  <FileText className="h-4 w-4 shrink-0 text-violet-500" aria-hidden />
                  <span className="min-w-0 flex-1 truncate">{name}</span>
                </Link>
              </li>
            )
          })}
        </ul>
      )}
    </section>
  )
}

function InfoRow({
  label,
  value,
  mono = false,
  capitalize = false,
  stack = false,
}: {
  label: string
  value: string
  mono?: boolean
  capitalize?: boolean
  /** Put the value on its own line under the label, for a long value. */
  stack?: boolean
}) {
  return (
    <div className={cn(!stack && 'flex items-baseline justify-between gap-4')}>
      <dt className="shrink-0 text-xs text-muted-foreground">{label}</dt>
      <dd
        className={cn(
          'min-w-0',
          stack ? 'mt-0.5 break-all' : 'break-words text-right',
          mono && 'font-mono text-xs',
          capitalize && 'capitalize',
        )}
      >
        {value}
      </dd>
    </div>
  )
}
