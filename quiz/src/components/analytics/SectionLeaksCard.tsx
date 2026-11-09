import { Link } from 'react-router-dom'
import { accuracyPercent } from '@/lib/accuracyTrend'
import type { SectionLeak } from '@/lib/performanceAnalytics'
import { formatMarks as marks, sectionQuizHref as quizHref } from '@/lib/analyticsSummary'
import { Group } from '@/components/ui/GroupedList'
import { GROUP_ACTION_ROW, RowChevron } from '@/components/ui/infoRows'

/** Judged sections listed before the rest fold away. */
const SHOWN = 5
/** Unjudged sections listed — the biggest unknowns. */
const SHOWN_UNJUDGED = 3

/**
 * **Where you're losing marks**: each syllabus section's accuracy weighed by
 * its share of the paper (`sectionLeaks`), so a weak heavy section outranks a
 * weak light one. A section with too few answers to judge is listed after, by
 * its share — the next biggest unknown. Every row starts a quiz on the section.
 * The rows of `SectionLeaksDialog`, as grouped lists.
 */
export function SectionLeaksList({ leaks, examLabel }: { leaks: SectionLeak[]; examLabel: string }) {
  const judged = leaks.filter(l => l.marksLost !== null)
  const unjudged = leaks.filter(l => l.marksLost === null)

  return (
    <>
      {judged.length === 0 ? (
        <p className="px-1.5 text-sm text-muted-foreground">
          Answer 3 questions in a section to see the marks it loses you.
        </p>
      ) : (
        <Group>
          {judged.slice(0, SHOWN).map(l => (
            <Link key={l.name} to={quizHref(examLabel, l)} className={GROUP_ACTION_ROW}>
              <span className="min-w-0 flex-1">
                <span className="block truncate" title={l.name}>{l.name}</span>
                <span className="block text-xs tabular-nums text-muted-foreground">
                  {accuracyPercent(l)}% right of {l.answered} · {Math.round(l.share)}% of the exam
                </span>
              </span>
              <span className="shrink-0 font-semibold tabular-nums">−{marks(l.marksLost!)}</span>
              <RowChevron />
              <span className="sr-only">marks of 100. Practise {l.name}</span>
            </Link>
          ))}
        </Group>
      )}
      {unjudged.length > 0 && (
        <Group label="Too few answers to judge">
          {unjudged.slice(0, SHOWN_UNJUDGED).map(l => (
            <Link key={l.name} to={quizHref(examLabel, l)} className={GROUP_ACTION_ROW}>
              <span className="min-w-0 flex-1 truncate" title={l.name}>{l.name}</span>
              <span className="shrink-0 text-xs tabular-nums text-muted-foreground">
                {l.answered > 0 ? `${l.answered} answered · ` : ''}{Math.round(l.share)}%
              </span>
              <RowChevron />
              <span className="sr-only">Practise {l.name}</span>
            </Link>
          ))}
        </Group>
      )}
    </>
  )
}
