// Add an exam, and "When is your exam?" (docs/redesign-spec.md §6; canvas
// `AddExam`, `ExamDate`). The exam switcher shows these as its own screens,
// and Today and the Quiz tab show them as the page for a reader with no exams.
// What each lists is lib/examFocus.ts.

import { useId, useMemo, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { Calendar, ChevronDown, ChevronLeft, ChevronRight } from 'lucide-react'
import { CheckMark } from '@/components/CheckMark'
import { ExamLogo } from '@/components/ExamLogo'
import { Button } from '@/components/ui/button'
import { useExamProgress } from '@/contexts/examProgress'
import { TRACKS } from '@/data/tracks'
import { useWikiSyllabus } from '@/hooks/useWikiSyllabus'
import { loadGuideBody, saveBody, type GuideBody } from '@/lib/bodyFilter'
import {
  addExamBody, addExamSections, daysAwayLabel, isUsableExamDate, offeredSittings, variantForPage,
  type AddExamRow, type AddExamSection, type ExamPage,
} from '@/lib/examFocus'
import { loadStudyPlanConfig, saveStudyPlanConfig } from '@/lib/studyPlan'
import { cn } from '@/lib/utils'
import { wikiExamIdToProgressKey } from '@/lib/wikiParser'
import { requirementDisplayName, wikiRoute } from '@/lib/wikiRoutes'

const FOCUS_RING = 'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-ground'
const BODIES: readonly GuideBody[] = ['SOA', 'CAS', 'CIA']

/** An exam page's name as a row shows it: "Exam P-1", "DISC-DA". */
export function examRowName(page: ExamPage): string {
  // "Exam P-1" is "Exam P" wherever the app names it; every other page keeps
  // its own name ("Exam GH-101", "DISC-DA", "ACIA Module 1").
  if (/^[A-Z]+-\d$/.test(page.examId) || !page.fileName) return page.examLabel
  return requirementDisplayName(page.fileName)
}

/** The exam a flow is adding, or whose date it is changing. */
export interface ExamChoice {
  examId: string
  key: string
  name: string
}

/** Adds an exam to the reader's, with its date, and puts it in focus. */
export function useAddExam() {
  const { saveExamRows, updateStudyPlanConfig, setFocusId } = useExamProgress()
  return async (exam: ExamChoice, date: string | null): Promise<boolean> => {
    if (!await saveExamRows([{ exam_id: exam.key, status: 'in_progress', target_date: date }])) return false
    // An exam sat under a syllabus per region: the page picked says which.
    const variant = variantForPage(exam.key, exam.examId)
    if (variant) {
      const config = { ...loadStudyPlanConfig(exam.key), examVariant: variant }
      saveStudyPlanConfig(exam.key, config)
      await updateStudyPlanConfig(exam.key, config)
    }
    setFocusId(exam.examId)
    return true
  }
}

// ── When is your exam? ───────────────────────────────────────────────────────

type DateChoice = { kind: 'sitting'; id: string } | { kind: 'other' } | { kind: 'unsure' }

const OPTION = cn(
  'flex w-full items-center gap-3.5 rounded-[18px] px-[18px] text-left',
  FOCUS_RING,
)

export function ExamDateStep({
  exam, current, mode, onBack, onConfirm, error,
}: {
  exam: ExamChoice
  /** The reader's date so far, when changing it. */
  current?: string | null
  mode: 'add' | 'edit'
  onBack?: () => void
  onConfirm: (date: string | null) => void | Promise<void>
  error?: string | null
}) {
  const titleId = useId()
  const today = useMemo(() => new Date(), [])
  const sittings = useMemo(() => offeredSittings(exam.key, today), [exam.key, today])
  const [choice, setChoice] = useState<DateChoice>(() => {
    if (mode === 'edit') {
      if (!current) return { kind: 'unsure' }
      const match = sittings.find(s => s.date === current)
      return match ? { kind: 'sitting', id: match.id } : { kind: 'other' }
    }
    return sittings[0] ? { kind: 'sitting', id: sittings[0].id } : { kind: 'unsure' }
  })
  const [other, setOther] = useState(() => (mode === 'edit' && current && !sittings.some(s => s.date === current) ? current : ''))
  const [saving, setSaving] = useState(false)

  const date = choice.kind === 'sitting'
    ? sittings.find(s => s.id === choice.id)?.date ?? null
    : choice.kind === 'other' ? other : null
  const ready = choice.kind !== 'other' || isUsableExamDate(other, today)

  async function confirm() {
    if (!ready || saving) return
    setSaving(true)
    try { await onConfirm(date || null) } finally { setSaving(false) }
  }

  const row = (on: boolean) => (on ? 'border-2 border-foreground' : 'border-[1.5px] border-border hover:border-foreground')

  return (
    <div className="flex min-h-0 flex-1 flex-col gap-[22px]" data-testid="exam-date">
      <div className="flex items-center gap-3">
        {onBack && (
          <button
            type="button"
            onClick={onBack}
            aria-label="Back"
            className={cn('-ml-3 flex h-11 w-11 items-center justify-center rounded-full', FOCUS_RING)}
          >
            <ChevronLeft className="h-[22px] w-[22px]" strokeWidth={2.5} aria-hidden="true" />
          </button>
        )}
        <ExamLogo examKey={exam.key} size="md" />
        <span className="truncate text-[17px] font-semibold">{exam.name}</span>
      </div>

      <h2 id={titleId} className="text-[28px] font-bold leading-tight tracking-tight">When is your exam?</h2>

      <div role="radiogroup" aria-labelledby={titleId} className="flex flex-col gap-2.5">
        {sittings.map(s => {
          const on = choice.kind === 'sitting' && choice.id === s.id
          return (
            <button
              key={s.id}
              type="button"
              role="radio"
              aria-checked={on}
              onClick={() => setChoice({ kind: 'sitting', id: s.id })}
              className={cn(OPTION, 'min-h-[68px] py-2.5', row(on))}
            >
              <span className="flex min-w-0 flex-1 flex-col gap-0.5">
                <span className="text-lg font-bold">{s.label}</span>
                <span className="text-sm">{daysAwayLabel(s.daysAway)}</span>
              </span>
              {on && <CheckMark className="h-7 w-7 text-foreground" />}
            </button>
          )
        })}
        <button
          type="button"
          role="radio"
          aria-checked={choice.kind === 'other'}
          onClick={() => setChoice({ kind: 'other' })}
          className={cn(OPTION, 'min-h-[60px] text-[17px] font-semibold', row(choice.kind === 'other'))}
        >
          <Calendar className="h-5 w-5 shrink-0" aria-hidden="true" />
          <span className="flex-1">Another date</span>
          {choice.kind === 'other' && <CheckMark className="h-7 w-7 text-foreground" />}
        </button>
        {choice.kind === 'other' && (
          <label className="flex min-h-[52px] items-center gap-3 px-[18px] text-base">
            <span className="shrink-0">Exam date</span>
            <input
              type="date"
              value={other}
              min={new Date(today.getTime() - today.getTimezoneOffset() * 60000).toISOString().slice(0, 10)}
              onChange={e => setOther(e.target.value)}
              autoFocus
              className={cn('h-11 min-w-0 flex-1 rounded-xl border-[1.5px] border-border bg-ground px-3 text-base text-foreground [color-scheme:light] dark:[color-scheme:dark]', FOCUS_RING)}
            />
          </label>
        )}
        <button
          type="button"
          role="radio"
          aria-checked={choice.kind === 'unsure'}
          onClick={() => setChoice({ kind: 'unsure' })}
          className={cn(OPTION, 'min-h-[60px] text-[17px] font-semibold', row(choice.kind === 'unsure'))}
        >
          <span className="flex-1">Not sure yet</span>
          {choice.kind === 'unsure' && <CheckMark className="h-7 w-7 text-foreground" />}
        </button>
      </div>

      {error && <p role="alert" className="text-[15px] font-semibold">{error}</p>}

      <Button size="main" className="mt-auto w-full shrink-0" disabled={!ready || saving} onClick={confirm}>
        {mode === 'add' ? `Add ${exam.name}` : 'Save date'}
      </Button>
    </div>
  )
}

// ── Add an exam ──────────────────────────────────────────────────────────────

function ExamListRow({ row, onPick }: { row: AddExamRow; onPick: (row: AddExamRow) => void }) {
  const text = (
    <span className="flex min-w-0 flex-1 flex-col">
      <span className="flex items-center gap-2 text-[17px] font-semibold">
        <span className="truncate">{row.name}</span>
        {row.status === 'beta' && (
          <span className="shrink-0 rounded-lg border-[1.5px] border-foreground px-[7px] py-px text-xs font-bold">Beta</span>
        )}
      </span>
      <span className="truncate text-sm">{row.passed ? `Passed · ${row.topic}` : row.topic}</span>
    </span>
  )
  if (row.added) {
    return (
      <li className="flex min-h-[64px] items-center gap-3.5 border-b border-border py-2">
        <ExamLogo examKey={row.key} size="md" />
        {text}
        <CheckMark className="h-7 w-7 text-foreground" label="Added" />
      </li>
    )
  }
  return (
    <li className="border-b border-border">
      <button
        type="button"
        onClick={() => onPick(row)}
        className={cn('flex min-h-[64px] w-full items-center gap-3.5 py-2 text-left', FOCUS_RING)}
      >
        <ExamLogo examKey={row.key} size="md" />
        {text}
        <ChevronRight className="h-4 w-4 shrink-0" strokeWidth={2.5} aria-hidden="true" />
      </button>
    </li>
  )
}

/** A credential's in-development exams, folded under one row; each opens its study guide. */
function DevelopmentFold({ section, alone, onLeave }: { section: AddExamSection; alone: boolean; onLeave?: () => void }) {
  const [open, setOpen] = useState(false)
  const listId = useId()
  return (
    <>
      <button
        type="button"
        aria-expanded={open}
        aria-controls={listId}
        onClick={() => setOpen(v => !v)}
        className={cn('flex min-h-[56px] w-full items-center gap-3.5 text-left text-base', alone && 'border-t border-border', FOCUS_RING)}
      >
        {alone
          ? <><span className="flex-1 text-[15px] font-semibold">{section.track}</span><span>In development</span></>
          : <span className="flex-1">In development</span>}
        <span className="font-bold tabular-nums">{section.development.length}</span>
        <ChevronDown className={cn('h-4 w-4 shrink-0 transition-transform', open && 'rotate-180')} strokeWidth={2.5} aria-hidden="true" />
      </button>
      {open && (
        <ul id={listId} className="flex flex-col">
          {section.development.map(row => (
            <li key={row.examId} className="border-b border-border">
              <Link
                to={wikiRoute({ kind: 'exam', name: row.fileName })}
                onClick={onLeave}
                className={cn('flex min-h-[56px] items-center gap-3.5 py-2', FOCUS_RING)}
              >
                <ExamLogo examKey={row.key} size="md" muted />
                <span className="flex min-w-0 flex-1 flex-col">
                  <span className="truncate text-base font-semibold">{row.name}</span>
                  <span className="truncate text-sm">{row.topic}</span>
                </span>
                <ChevronRight className="h-4 w-4 shrink-0" strokeWidth={2.5} aria-hidden="true" />
              </Link>
            </li>
          ))}
        </ul>
      )}
    </>
  )
}

export function AddExamList({
  onPick, onBack, onLeave, titleId,
}: {
  onPick: (exam: ExamChoice) => void
  /** Back to the reader's exams, when the list was opened from them. */
  onBack?: () => void
  /** Called when a row leaves for a study guide, so a sheet can close. */
  onLeave?: () => void
  titleId?: string
}) {
  const { syllabi } = useWikiSyllabus()
  const { progress, examVariants, selectedTrack } = useExamProgress()
  const [body, setBody] = useState<GuideBody>(() => addExamBody(loadGuideBody(), selectedTrack))
  const sections = useMemo(
    () => addExamSections(body, TRACKS, syllabi, progress, examVariants, examRowName),
    [body, syllabi, progress, examVariants],
  )

  return (
    <div className="flex flex-col gap-[18px]" data-testid="add-exam">
      <div className="flex items-center gap-2">
        {onBack && (
          <button
            type="button"
            onClick={onBack}
            aria-label="Back to your exams"
            className={cn('-ml-3 flex h-11 w-11 items-center justify-center rounded-full', FOCUS_RING)}
          >
            <ChevronLeft className="h-[22px] w-[22px]" strokeWidth={2.5} aria-hidden="true" />
          </button>
        )}
        <h2 id={titleId} className="text-[22px] font-bold leading-tight">Add an exam</h2>
      </div>

      <div role="group" aria-label="Society" className="grid grid-cols-3 gap-1 rounded-3xl border border-border p-1">
        {BODIES.map(b => (
          <button
            key={b}
            type="button"
            aria-pressed={b === body}
            onClick={() => { setBody(b); saveBody(b) }}
            className={cn(
              'h-10 rounded-[20px] text-[15px]',
              b === body ? 'bg-foreground font-bold text-background' : 'font-semibold',
              FOCUS_RING,
            )}
          >
            {b}
          </button>
        ))}
      </div>

      <div className="flex flex-col">
        {sections.map(section => {
          const alone = section.rows.length === 0
          return (
            <section key={section.track} aria-label={section.track} className="flex flex-col">
              {!alone && <h3 className="mb-1 mt-2 text-[15px] font-semibold first:mt-0">{section.track}</h3>}
              {!alone && (
                <ul className="flex flex-col">
                  {section.rows.map(row => (
                    <ExamListRow
                      key={row.examId}
                      row={row}
                      onPick={r => onPick({ examId: r.examId, key: r.key, name: r.name })}
                    />
                  ))}
                </ul>
              )}
              {section.development.length > 0 && <DevelopmentFold section={section} alone={alone} onLeave={onLeave} />}
            </section>
          )
        })}
      </div>
    </div>
  )
}

/**
 * The whole flow: pick an exam, say when it is, and land on Today with it in
 * focus. `initial` starts on the date for an exam already chosen (the page the
 * reader is visiting). `to` is where the reader lands instead of Today:
 * Practice passes its own address, so an exam added there opens its quiz setup.
 */
export function AddExamFlow({
  initial = null, onBack, onDone, onLeave, titleId, to = '/dashboard',
}: {
  initial?: ExamChoice | null
  to?: string
  onBack?: () => void
  onDone?: () => void
  onLeave?: () => void
  titleId?: string
}) {
  const navigate = useNavigate()
  const addExam = useAddExam()
  const [picked, setPicked] = useState<ExamChoice | null>(initial)
  const [error, setError] = useState<string | null>(null)

  if (!picked) {
    return <AddExamList onPick={exam => { setError(null); setPicked(exam) }} onBack={onBack} onLeave={onLeave} titleId={titleId} />
  }
  return (
    <ExamDateStep
      exam={picked}
      mode="add"
      error={error}
      onBack={initial ? onBack : () => setPicked(null)}
      onConfirm={async date => {
        if (!await addExam(picked, date)) {
          setError(`${picked.name} wasn't added. Check your connection and try again.`)
          return
        }
        onDone?.()
        navigate(to, { replace: to === '/' })
      }}
    />
  )
}

/** Whether a page's exam is one the flow can add: studied material, not yet the reader's. */
export function examChoiceFor(page: ExamPage): ExamChoice {
  return { examId: page.examId, key: wikiExamIdToProgressKey(page.examId), name: examRowName(page) }
}
