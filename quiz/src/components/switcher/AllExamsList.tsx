// All exams: every exam, by society and credential, each a row that opens it
// without adding it (ExamScope.tsx). On Learn a row opens the exam's study
// guide; on Practice its questions, so Practice lists only the exams with a
// bank. The in-development exams are folded under one row per credential, as
// on Add an exam.

import { useId, useMemo, useState } from 'react'
import { Link } from 'react-router-dom'
import { ChevronDown, ChevronRight } from 'lucide-react'
import { ExamLogo } from '@/components/ExamLogo'
import { examRowName } from '@/components/switcher/AddExamFlow'
import { useExamProgress } from '@/contexts/examProgress'
import { TRACKS } from '@/data/tracks'
import { useWikiSyllabus } from '@/hooks/useWikiSyllabus'
import { loadGuideBody, saveBody, type GuideBody } from '@/lib/bodyFilter'
import { bankLabelFor } from '@/lib/examIds'
import { addExamBody, addExamSections, type AddExamRow } from '@/lib/examFocus'
import { quizExamFor } from '@/lib/quizBuilder'
import { cn } from '@/lib/utils'
import { wikiRoute } from '@/lib/wikiRoutes'

const FOCUS_RING = 'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-ground'
const BODIES: readonly GuideBody[] = ['SOA', 'CAS', 'CIA']

/** Where a row leads: the exam's study guide, or its questions on Practice (null: it has none). */
export function allExamsLink(row: AddExamRow, target: 'guide' | 'practice'): string | null {
  if (target === 'guide') return row.fileName ? wikiRoute({ kind: 'exam', name: row.fileName }) : null
  const label = bankLabelFor({ examId: row.examId })
  return label && quizExamFor(label) ? `/?topic=${encodeURIComponent(label)}` : null
}

function ExamLink({ row, to, muted = false }: { row: AddExamRow; to: string; muted?: boolean }) {
  return (
    <li className="border-b border-border">
      <Link to={to} className={cn('flex min-h-[64px] items-center gap-3.5 py-2', FOCUS_RING)}>
        <ExamLogo examKey={row.key} size="md" muted={muted} />
        <span className="flex min-w-0 flex-1 flex-col">
          <span className="flex items-center gap-2 text-[17px] font-semibold">
            <span className="truncate">{row.name}</span>
            {row.status === 'beta' && (
              <span className="shrink-0 rounded-lg border-[1.5px] border-foreground px-[7px] py-px text-xs font-bold">Beta</span>
            )}
          </span>
          <span className="truncate text-sm">{row.topic}</span>
        </span>
        <ChevronRight className="h-4 w-4 shrink-0" strokeWidth={2.5} aria-hidden="true" />
      </Link>
    </li>
  )
}

interface LinkedRow { row: AddExamRow; to: string }

function DevelopmentFold({ track, rows, alone }: { track: string; rows: LinkedRow[]; alone: boolean }) {
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
          ? <><span className="flex-1 text-[15px] font-semibold">{track}</span><span>In development</span></>
          : <span className="flex-1">In development</span>}
        <span className="font-bold tabular-nums">{rows.length}</span>
        <ChevronDown className={cn('h-4 w-4 shrink-0 transition-transform', open && 'rotate-180')} strokeWidth={2.5} aria-hidden="true" />
      </button>
      {open && (
        <ul id={listId} className="flex flex-col">
          {rows.map(({ row, to }) => <ExamLink key={row.examId} row={row} to={to} muted />)}
        </ul>
      )}
    </>
  )
}

export default function AllExamsList({ target }: { target: 'guide' | 'practice' }) {
  const { syllabi } = useWikiSyllabus()
  const { progress, examVariants, selectedTrack } = useExamProgress()
  const [body, setBody] = useState<GuideBody>(() => addExamBody(loadGuideBody(), selectedTrack))
  const sections = useMemo(() => {
    const linked = (rows: AddExamRow[]): LinkedRow[] => rows.flatMap(row => {
      const to = allExamsLink(row, target)
      return to ? [{ row, to }] : []
    })
    return addExamSections(body, TRACKS, syllabi, progress, examVariants, examRowName)
      .map(s => ({ track: s.track, rows: linked(s.rows), development: linked(s.development) }))
      .filter(s => s.rows.length + s.development.length > 0)
  }, [body, syllabi, progress, examVariants, target])

  return (
    <div className="flex flex-col gap-[18px]" data-testid="all-exams">
      <div role="group" aria-label="Society" className="grid grid-cols-3 gap-1 rounded-3xl border border-border p-1">
        {BODIES.map(b => (
          <button
            key={b}
            type="button"
            aria-pressed={b === body}
            onClick={() => { setBody(b); saveBody(b) }}
            className={cn('h-10 rounded-[20px] text-[15px]', b === body ? 'bg-foreground font-bold text-background' : 'font-semibold', FOCUS_RING)}
          >
            {b}
          </button>
        ))}
      </div>

      <div className="flex flex-col">
        {sections.length === 0 && <p className="text-[15px]">No {body} exam has practice questions yet.</p>}
        {sections.map(section => {
          const alone = section.rows.length === 0
          return (
            <section key={section.track} aria-label={section.track} className="flex flex-col">
              {!alone && <h3 className="mb-1 mt-2 text-[15px] font-semibold first:mt-0">{section.track}</h3>}
              {!alone && (
                <ul className="flex flex-col">
                  {section.rows.map(({ row, to }) => <ExamLink key={row.examId} row={row} to={to} />)}
                </ul>
              )}
              {section.development.length > 0 && <DevelopmentFold track={section.track} rows={section.development} alone={alone} />}
            </section>
          )
        })}
      </div>
    </div>
  )
}
