import { useMemo, useState } from 'react'
import { ChevronDown } from 'lucide-react'
import { MarkdownText, READING_MD_CLASS } from '@/components/MarkdownText'
import { splitSampleAnswers } from '@/lib/writtenAnswer'
import { SampleChecklist } from '@/components/SampleChecklist'
import type { ChecklistTicks, PartChecklist, SampleChecklist as SampleChecklistData } from '@/lib/essayChecklist'
import { askedPhrase } from '@/lib/gradeWords'
import { cn } from '@/lib/utils'

// The reference a written part reveals once it is answered: the examiners'
// sample answer, then their report (docs/redesign-spec.md §5.2). Two different
// things, what full credit looked like and what candidates got wrong: the
// sample is on the page as the checklist the reader ticks, the report is
// folded in a row below it.

const HEADING = 'text-sm font-bold text-foreground'

/**
 * A written part's sample answer. When the examiners printed several accepted
 * answers ("Alternatively: …", lib/writtenAnswer.ts), each is an outlined card
 * of its own, numbered, under the one "Sample answer" heading; a single sample
 * sits on the page.
 */
export function SampleAnswerCards({ markdown, checklist }: {
  markdown: string
  /**
   * The part's checklist (lib/essayChecklist.ts): when given, each sample's
   * points carry a box the reader ticks for what their answer makes, unless
   * the examiner's report has a rubric, which carries the boxes instead.
   */
  checklist?: {
    list: PartChecklist
    ticks: ChecklistTicks
    onToggle: (sample: number, point: number) => void
  }
}) {
  const { intro, samples } = useMemo(() => splitSampleAnswers(markdown), [markdown])
  if (samples.length === 0) return null
  if (checklist?.list.rubric) checklist = undefined
  const asked = checklist ? askedPhrase(checklist.list.asked) : null

  const body = (i: number) => {
    const sample = checklist?.list.samples[i]
    if (!checklist || !sample || sample.boxes === 0) {
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
  const heading = (
    <h4 className={HEADING}>
      Sample answer{asked && <> · {asked}</>}
    </h4>
  )

  if (samples.length === 1) {
    return (
      <section aria-label="Sample answer" className="space-y-2">
        {heading}
        {body(0)}
      </section>
    )
  }

  return (
    <section aria-label="Sample answer" className="space-y-2">
      {heading}
      {intro && <MarkdownText className={READING_MD_CLASS}>{intro}</MarkdownText>}
      <ol className="space-y-2">
        {samples.map((_, i) => (
          <li
            key={i}
            aria-label={`Sample ${i + 1} of ${samples.length}`}
            className="rounded-[14px] border border-border px-4 py-3.5"
          >
            <p className={cn(HEADING, 'mb-1.5')}>Sample {i + 1}</p>
            {body(i)}
          </li>
        ))}
      </ol>
    </section>
  )
}

/**
 * The examiner's report on a part: how candidates did and where they lost
 * credit. A row that unfolds, so the sample answer leads. A report that is
 * itself the checklist (its rubric) starts open: its boxes are what the reader
 * ticks.
 */
export function ExaminerReportCard({ markdown, rubric, defaultOpen = false }: {
  markdown: string
  /**
   * The report's rubric (lib/essayChecklist.ts `reportRubric`): what full
   * credit needed, each with a box the reader ticks for what their answer did.
   */
  rubric?: {
    list: SampleChecklistData
    ticked: readonly number[]
    onToggle: (point: number) => void
  }
  defaultOpen?: boolean
}) {
  // The rubric arrives a moment after the report (the checks are a lazy
  // chunk), so "open" follows it until the reader folds or unfolds the row.
  const [toggled, setToggled] = useState<boolean | null>(null)
  const open = toggled ?? (defaultOpen || !!rubric)
  return (
    <section aria-label="Examiner's report" className="rounded-2xl border border-border">
      <button
        type="button"
        aria-expanded={open}
        onClick={() => setToggled(!open)}
        className="flex min-h-[56px] w-full items-center gap-3.5 rounded-2xl px-4 text-left text-base font-semibold text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
      >
        <span className="flex-1">Examiner&apos;s report</span>
        <ChevronDown aria-hidden="true" strokeWidth={2.5} className={cn('h-4 w-4 shrink-0 transition-transform', open && 'rotate-180')} />
      </button>
      {open && (
        <div className="px-4 pb-4">
          {rubric
            ? <SampleChecklist sample={rubric.list} ticked={rubric.ticked} onToggle={rubric.onToggle} />
            : <MarkdownText className={READING_MD_CLASS}>{markdown}</MarkdownText>}
        </div>
      )}
    </section>
  )
}
