// The exam switcher (docs/redesign-spec.md §6; canvas `Switcher`): the
// reader's exams, each with its logo, the days left and its syllabus bar, the
// one in focus checked. Tapping one puts it in focus everywhere and closes the
// sheet. Edit holds change date, mark as passed and remove (R10). Add an exam
// and the date question are screens of their own (AddExamFlow.tsx).

import { useId, useMemo, useState } from 'react'
import { Plus } from 'lucide-react'
import { CheckMark } from '@/components/CheckMark'
import { ExamLogo } from '@/components/ExamLogo'
import { AddExamFlow, ExamDateStep, examChoiceFor, examRowName, type ExamChoice } from '@/components/switcher/AddExamFlow'
import { SyllabusBar } from '@/components/today/TodayTiles'
import { Popup, PopupTitle } from '@/components/ui/Popup'
import { useExamProgress } from '@/contexts/examProgress'
import { useConceptMastery } from '@/hooks/useConceptMastery'
import { useExamInFocus } from '@/hooks/useExamInFocus'
import { daysLeftLabel, switcherRows, type SwitcherRow } from '@/lib/examFocus'
import { isExamInDevelopment } from '@/lib/examStatus'
import { computeExamReadiness } from '@/lib/readiness'
import { cn } from '@/lib/utils'
import { wikiExamIdToProgressKey } from '@/lib/wikiParser'
import { useExamSwitcher } from '@/stores/examSwitcher'

const FOCUS_RING = 'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-ground'
const DASHED_ROW = cn(
  'flex min-h-[60px] w-full items-center gap-3.5 rounded-[18px] border-[1.5px] border-dashed border-foreground px-4 text-left text-[17px] font-semibold',
  FOCUS_RING,
)
const EDIT_ACTION = cn(
  'flex min-h-[44px] items-center justify-center rounded-full border-[1.5px] border-foreground px-3 text-center text-sm font-semibold hover:bg-foreground/10',
  FOCUS_RING,
)

function RowFacts({ row }: { row: SwitcherRow }) {
  return (
    <span className="flex min-w-0 flex-col gap-2">
      <span className="flex items-baseline justify-between gap-3">
        <span className="truncate text-[17px] font-bold">{row.label}</span>
        <span className="shrink-0 text-[15px] tabular-nums">{row.daysLeft === null ? 'No date' : daysLeftLabel(row.daysLeft)}</span>
      </span>
      <SyllabusBar pct={row.pct} className="h-1.5" />
    </span>
  )
}

function rowLabel(row: SwitcherRow): string {
  const days = row.daysLeft === null ? 'no date set' : row.daysLeft === 0 ? 'exam today' : `${daysLeftLabel(row.daysLeft)} left`
  return `${row.label}, ${days}, ${row.pct}% of the syllabus covered`
}

export default function ExamSwitcherSheet() {
  const titleId = useId()
  const screen = useExamSwitcher(s => s.screen)
  const visiting = useExamSwitcher(s => s.visiting)
  const adding = useExamSwitcher(s => s.adding)
  const close = useExamSwitcher(s => s.close)
  const { exams, active, select, syllabi } = useExamInFocus()
  const { targetDates, saveExamRows, updateTargetDate } = useExamProgress()
  const { records } = useConceptMastery()

  /** What the sheet shows: the list, Add an exam, or a date being set. */
  const [view, setView] = useState<
    | { kind: 'list' }
    | { kind: 'add'; initial: ExamChoice | null }
    | { kind: 'date'; exam: ExamChoice }
  >(() => {
    if (screen !== 'add' && exams.length > 0) return { kind: 'list' }
    const page = adding ? syllabi.find(s => s.examId === adding) : undefined
    return { kind: 'add', initial: page ? examChoiceFor(page) : null }
  })
  const [editing, setEditing] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const rows = useMemo(() => {
    const now = new Date()
    const pct: Record<string, number> = {}
    for (const exam of exams) {
      const key = wikiExamIdToProgressKey(exam.examId)
      const readiness = computeExamReadiness(exam, records.filter(r => r.exam_id === key), now)
      pct[key] = readiness.counts.total > 0 ? readiness.overallPct : 0
    }
    return switcherRows(exams, active?.examId ?? null, targetDates, pct, now)
  }, [exams, active, targetDates, records])

  // The exam page being read, when it isn't one of the reader's and can be added.
  const visit = useMemo(() => {
    if (!visiting || exams.some(e => e.examId === visiting)) return null
    const page = syllabi.find(s => s.examId === visiting)
    if (!page || isExamInDevelopment(wikiExamIdToProgressKey(page.examId), page.examId)) return null
    return examChoiceFor(page)
  }, [visiting, exams, syllabi])

  const nameOf = (row: SwitcherRow) => {
    const page = exams.find(e => e.examId === row.examId)
    return page ? examRowName(page) : row.label
  }

  async function setStatus(row: SwitcherRow, status: 'completed' | 'not_started') {
    setError(null)
    const ok = await saveExamRows([{ exam_id: row.key, status, target_date: null }])
    if (!ok) setError(`${row.label} wasn't changed. Check your connection and try again.`)
  }

  if (view.kind === 'add') {
    return (
      <Popup onClose={close} labelledBy={titleId} full>
        <AddExamFlow
          titleId={titleId}
          initial={view.initial}
          onBack={adding ? close : exams.length > 0 ? () => setView({ kind: 'list' }) : undefined}
          onDone={close}
          onLeave={close}
        />
      </Popup>
    )
  }

  if (view.kind === 'date') {
    const exam = view.exam
    return (
      <Popup onClose={close} label={`When is your exam? ${exam.name}`} full>
        <ExamDateStep
          exam={exam}
          mode="edit"
          current={targetDates[exam.key] ?? null}
          error={error}
          onBack={() => { setError(null); setView({ kind: 'list' }) }}
          onConfirm={async date => {
            if (await updateTargetDate(exam.key, date)) setView({ kind: 'list' })
            else setError("The date wasn't saved. Check your connection and try again.")
          }}
        />
      </Popup>
    )
  }

  return (
    <Popup onClose={close} labelledBy={titleId}>
      <div className="flex items-center justify-between">
        <PopupTitle id={titleId}>Your exams</PopupTitle>
        <button
          type="button"
          onClick={() => { setError(null); setEditing(v => !v) }}
          aria-pressed={editing}
          className={cn('flex h-11 items-center rounded-lg px-1 text-base font-semibold', FOCUS_RING)}
        >
          {editing ? 'Done' : 'Edit'}
        </button>
      </div>

      {editing ? (
        <ul className="flex flex-col gap-2.5" data-testid="exam-switcher-edit">
          {rows.map(row => (
            <li key={row.examId} className="flex flex-col gap-3 rounded-[18px] border-[1.5px] border-border p-4">
              <div className="grid grid-cols-[44px_minmax(0,1fr)] items-center gap-x-3.5">
                <ExamLogo examKey={row.key} size="md" />
                <RowFacts row={row} />
              </div>
              <div role="group" aria-label={row.label} className="grid grid-cols-3 gap-2">
                <button
                  type="button"
                  className={EDIT_ACTION}
                  onClick={() => setView({ kind: 'date', exam: { examId: row.examId, key: row.key, name: nameOf(row) } })}
                >
                  Change date
                </button>
                <button type="button" className={EDIT_ACTION} onClick={() => setStatus(row, 'completed')}>
                  Mark as passed
                </button>
                <button type="button" className={EDIT_ACTION} onClick={() => setStatus(row, 'not_started')}>
                  Remove
                </button>
              </div>
            </li>
          ))}
        </ul>
      ) : (
        <div role="radiogroup" aria-label="Exam in focus" className="flex flex-col gap-2.5">
          {rows.map(row => (
            <button
              key={row.examId}
              type="button"
              role="radio"
              aria-checked={row.current}
              aria-label={rowLabel(row)}
              onClick={() => { select(row.examId); close() }}
              className={cn(
                'grid min-h-[84px] grid-cols-[44px_minmax(0,1fr)_28px] items-center gap-x-3.5 rounded-[18px] px-4 py-3 text-left',
                FOCUS_RING,
                row.current ? 'border-2 border-foreground' : 'border-[1.5px] border-border hover:border-foreground',
              )}
            >
              <ExamLogo examKey={row.key} size="md" />
              <RowFacts row={row} />
              {row.current ? <CheckMark className="h-7 w-7 text-foreground" /> : <span />}
            </button>
          ))}
        </div>
      )}

      {error && <p role="alert" className="text-[15px] font-semibold">{error}</p>}

      {!editing && visit && (
        <button type="button" className={DASHED_ROW} onClick={() => setView({ kind: 'add', initial: visit })}>
          <ExamLogo examKey={visit.key} size="md" />
          Add {visit.name}
        </button>
      )}
      {!editing && (
        <button type="button" className={DASHED_ROW} onClick={() => setView({ kind: 'add', initial: null })}>
          <span className="flex w-11 justify-center"><Plus className="h-[22px] w-[22px]" strokeWidth={2.5} aria-hidden="true" /></span>
          Add an exam
        </button>
      )}
    </Popup>
  )
}
