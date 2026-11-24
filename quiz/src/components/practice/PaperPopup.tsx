import { AnswerDot } from '@/components/AnswerDot'
import { PdfLinkButton } from '@/components/PdfLinkButton'
import { ANSWER_FILL, ANSWER_LABEL, ANSWER_STATES } from '@/lib/answerState'
import { paperResultLabel, type PaperResult } from '@/lib/paperResults'
import { PRACTICE_EXAM_LABEL } from '@/lib/pastExams'
import { questionsWord } from '@/lib/quizSetup'
import type { RevealMode } from '@/lib/revealMode'
import { cn } from '@/lib/utils'
import { SittingSwitches, StartPopup } from './SetupSheet'

/** A paper's last result as a bar in the answer colours (style guide §13.9). */
export function PaperResultBar({ result, className }: { result: PaperResult; className?: string }) {
  return (
    <span role="img" aria-label={paperResultLabel(result)} className={cn('flex h-2 gap-0.5', className)}>
      {ANSWER_STATES.filter(s => result[s] > 0).map(s => (
        <span key={s} style={{ flex: `${result[s]} 1 0` }} className={cn('rounded-full', ANSWER_FILL[s])} />
      ))}
    </span>
  )
}

export interface SittingSettings {
  reveal: RevealMode
  onRevealChange: (next: RevealMode) => void
  timed: boolean
  onTimedChange: (next: boolean) => void
  conceptLinks: boolean
  onConceptLinksChange: (next: boolean) => void
}

/**
 * What a past paper opens to (decided with the maintainer, 2026-11-23; the
 * canvas draws no screen for it): its size and time, the pass rate where one
 * is published, the reader's last result, the paper's documents read in the
 * app, how it is sat, and Start Practice Exam. A paper not added yet opens
 * the same popup with its facts and documents and no Start. A Practice Exam
 * drawn from the whole bank is the same popup with no paper's facts.
 */
export function PaperPopup({
  title,
  questionCount,
  duration,
  passRate,
  result,
  documents,
  documentSubtitle,
  note,
  settings,
  timedPace,
  canStart,
  onStart,
  onClose,
}: {
  title: string
  questionCount: number
  /** "3 h", or null for an exam with no pace on file. */
  duration: string | null
  /** The published ratio with its own label: "Pass rate" or "Effective pass rate". */
  passRate?: { label: string; value: string } | null
  result?: PaperResult | null
  documents?: readonly { url: string; label: string }[]
  /** Names the paper in the PDF reader's header: "Exam 5 · Spring 2019". */
  documentSubtitle?: string
  /** One sentence under the facts: where a drawn exam's questions come from. */
  note?: string
  settings: SittingSettings
  timedPace?: string
  canStart: boolean
  onStart: () => void
  onClose: () => void
}) {
  return (
    <StartPopup
      title={title}
      onClose={onClose}
      startLabel={canStart ? `Start ${PRACTICE_EXAM_LABEL}` : undefined}
      onStart={onStart}
    >
      {questionCount > 0 ? (
        <div className="flex items-baseline gap-2">
          <span className="text-[44px] font-bold leading-none tracking-[-0.03em] tabular-nums">{questionCount}</span>
          <span className="text-lg font-medium">
            {questionsWord(questionCount)}{duration ? ` · ${duration}` : ''}
          </span>
        </div>
      ) : (
        <p className="text-[17px] font-semibold">Not added yet</p>
      )}
      {note && <p className="text-[15px] leading-normal">{note}</p>}

      {(passRate || result) && (
        <dl className="flex flex-col border-t border-border">
          {passRate && (
            <div className="flex min-h-[52px] items-center gap-3 border-b border-border">
              <dt className="flex-1 text-base font-medium">{passRate.label}</dt>
              <dd className="text-[17px] font-bold tabular-nums">{passRate.value}</dd>
            </div>
          )}
          {result && (
            <div className="flex flex-col gap-2.5 border-b border-border py-3.5">
              <div className="flex items-center gap-3">
                <dt className="flex-1 text-base font-medium">Last sat</dt>
                <dd className="w-32"><PaperResultBar result={result} /></dd>
              </div>
              <ul aria-hidden="true" className="flex flex-wrap gap-x-4 gap-y-1 text-sm">
                {ANSWER_STATES.filter(s => result[s] > 0).map(s => (
                  <li key={s} className="flex items-center gap-1.5 tabular-nums">
                    <AnswerDot state={s} decorative />
                    {result[s]} {ANSWER_LABEL[s].toLowerCase()}
                  </li>
                ))}
              </ul>
            </div>
          )}
        </dl>
      )}

      {documents && documents.length > 0 && (
        <div className={cn('flex flex-col', !(passRate || result) && 'border-t border-border')}>
          {documents.map(doc => (
            <PdfLinkButton
              key={doc.url}
              url={doc.url}
              label={doc.label}
              subtitle={documentSubtitle}
              chip={false}
              className="flex min-h-[52px] w-full justify-start rounded-none border-0 border-b border-border bg-transparent px-0 py-0 text-base font-medium shadow-none hover:bg-transparent hover:text-foreground hover:underline"
            />
          ))}
        </div>
      )}

      {canStart && (
        <SittingSwitches
          {...settings}
          timedPace={timedPace}
          rule={!(passRate || result || (documents && documents.length > 0))}
        />
      )}
    </StartPopup>
  )
}
