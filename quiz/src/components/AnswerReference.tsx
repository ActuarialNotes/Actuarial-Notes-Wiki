import { useMemo } from 'react'
import { ClipboardList } from 'lucide-react'
import { MarkdownText, READING_MD_CLASS } from '@/components/MarkdownText'
import { splitSampleAnswers } from '@/lib/writtenAnswer'
import { SampleChecklist } from '@/components/SampleChecklist'
import type { ChecklistTicks, PartChecklist } from '@/lib/essayChecklist'

// The reference a written part reveals once it is answered: the examiners'
// sample answer, then their report. Two different things — what full credit
// looked like, and what candidates got wrong — so each is its own card.

/**
 * A written part's sample answer. When the examiners printed several accepted
 * answers ("Alternatively: …" — lib/writtenAnswer.ts), each is a card of its
 * own, numbered, inside the one "Sample answer" panel they all belong to; a
 * single sample is the panel alone.
 */
export function SampleAnswerCards({ markdown, checklist }: {
  markdown: string
  /**
   * The part's checklist (lib/essayChecklist.ts): when given, each sample's
   * points carry a box the reader ticks for what their answer makes.
   */
  checklist?: {
    list: PartChecklist
    ticks: ChecklistTicks
    onToggle: (sample: number, point: number) => void
  }
}) {
  const { intro, samples } = useMemo(() => splitSampleAnswers(markdown), [markdown])
  if (samples.length === 0) return null

  const body = (i: number) => {
    const sample = checklist?.list.samples[i]
    if (!checklist || !sample || sample.points === 0) {
      return <MarkdownText className={READING_MD_CLASS}>{samples[i]}</MarkdownText>
    }
    return (
      <SampleChecklist
        sample={sample}
        ticked={checklist.ticks[i] ?? []}
        onToggle={point => checklist.onToggle(i, point)}
        name={samples.length > 1 ? `Sample ${i + 1}` : undefined}
      />
    )
  }
  const instruction = checklist && (
    <p className="text-sm text-foreground">Tick each point your answer makes.</p>
  )

  if (samples.length === 1) {
    return (
      <section aria-label="Sample answer" className="space-y-2 rounded-xl bg-muted p-4">
        <h4 className="text-sm font-semibold text-foreground">Sample answer</h4>
        {instruction}
        {body(0)}
      </section>
    )
  }

  return (
    <section aria-label="Sample answer" className="space-y-2 rounded-xl bg-muted p-2 sm:p-3">
      <h4 className="px-2 pt-1 text-sm font-semibold text-foreground">Sample answer</h4>
      {instruction && <div className="px-2">{instruction}</div>}
      {intro && (
        <MarkdownText className={`${READING_MD_CLASS} px-2`}>{intro}</MarkdownText>
      )}
      <ol className="space-y-2">
        {samples.map((_, i) => (
          <li
            key={i}
            aria-label={`Sample ${i + 1} of ${samples.length}`}
            className="rounded-lg bg-card p-3 shadow-sm sm:p-4"
          >
            <p className="mb-1.5 text-xs font-semibold uppercase tracking-wide text-muted-foreground">
              Sample {i + 1}
            </p>
            {body(i)}
          </li>
        ))}
      </ol>
    </section>
  )
}

/**
 * The examiner's report on a part: how candidates did and where they lost
 * credit. Tinted as an informational note (style guide §4.1) so it reads as
 * commentary on the answer rather than more of it.
 */
export function ExaminerReportCard({ markdown }: { markdown: string }) {
  return (
    <section
      aria-label="Examiner's report"
      className="space-y-2 rounded-xl bg-blue-50 p-4 dark:bg-blue-950/50"
    >
      <h4 className="flex items-center gap-1.5 text-sm font-semibold text-blue-900 dark:text-blue-100">
        <ClipboardList aria-hidden="true" className="h-4 w-4" />
        Examiner&apos;s report
      </h4>
      <MarkdownText className={READING_MD_CLASS}>{markdown}</MarkdownText>
    </section>
  )
}
