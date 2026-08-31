import { useEffect } from 'react'
import { ExternalLink, FileText, Info, X } from 'lucide-react'
import { cn } from '@/lib/utils'
import { githubBlobUrl } from '@/lib/github'
import { questionSource } from '@/lib/questionSource'
import { useSoundOnMount } from '@/hooks/useSoundEffects'
import { OverlayPortal } from '@/components/ui/OverlayPortal'
import type { Question } from '@/lib/parser'

/**
 * **Question info** — where the question on screen came from.
 *
 * Sits beside the flag in the quiz's question bar, because that is the moment
 * the question gets asked: a candidate who half-recognises a question wants to
 * know which paper it was sat on, and one who thinks the answer is wrong wants
 * the file to report or fix. Neither is on screen anywhere else mid-quiz.
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
  className?: string
}

export function QuestionInfoButton({
  question,
  open,
  onOpenChange,
  showStudyMeta = false,
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
          'flex items-center gap-1 rounded-md px-2 py-1 text-xs font-medium transition-colors hover:bg-accent',
          open ? 'text-foreground' : 'text-muted-foreground hover:text-foreground',
          className,
        )}
      >
        <Info className="h-3.5 w-3.5" aria-hidden />
        Info
      </button>

      {open && (
        <QuestionInfoDialog
          question={question}
          showStudyMeta={showStudyMeta}
          onClose={() => onOpenChange(false)}
        />
      )}
    </>
  )
}

interface QuestionInfoDialogProps {
  question: Question
  showStudyMeta?: boolean
  onClose: () => void
}

export function QuestionInfoDialog({
  question,
  showStudyMeta = false,
  onClose,
}: QuestionInfoDialogProps) {
  // Paper: the panel sliding in, same as the shortcuts sheet next to it.
  useSoundOnMount('open')
  useEffect(() => {
    function onKey(e: KeyboardEvent) {
      if (e.key === 'Escape' || e.key === 'i') {
        e.preventDefault()
        onClose()
      }
    }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [onClose])

  const source = questionSource(question)

  return (
    <OverlayPortal>
      <div
        className="fixed inset-0 z-[80] flex items-center justify-center p-4"
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
              // The publisher's own paper, in a new tab rather than the in-app
              // reader: a PDF over a half-finished quiz buries the quiz.
              <a
                href={source.document.url}
                target="_blank"
                rel="noreferrer"
                className="mt-3 inline-flex min-h-[36px] items-center gap-2 rounded-md border border-border bg-card px-3 py-1.5 text-sm font-medium shadow-sm transition-colors hover:bg-accent hover:text-accent-foreground"
              >
                <FileText className="h-4 w-4 shrink-0 text-primary" aria-hidden />
                {source.document.label}
                <span className="rounded bg-muted px-1.5 py-0.5 text-[10px] font-semibold uppercase tracking-wide text-muted-foreground">
                  PDF
                </span>
              </a>
            )}
          </section>

          <dl className="space-y-2 text-sm">
            <InfoRow label="Question ID" value={question.id} mono />
            <InfoRow
              label="Format"
              value={`${TYPE_LABELS[question.type]} · ${question.points} ${question.points === 1 ? 'point' : 'points'}`}
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
        </div>
      </div>
    </OverlayPortal>
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
