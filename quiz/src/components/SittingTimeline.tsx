import { CheckMark } from '@/components/CheckMark'
import type { ReactNode } from 'react'
import { Group, GroupRow, GroupSurface } from '@/components/ui/GroupedList'
import {
  formatStepDateShort,
  sittingHeadline,
  sittingRuler,
  type SittingRuler,
  type SittingStep,
} from '@/lib/sittingTimeline'
import { cn } from '@/lib/utils'

/**
 * A sitting, drawn: a **status banner**, outlined, with the one thing that
 * matters now and its countdown ("Exam window open · 7 days"), over a
 * **ruler** that lays every date out to scale with today ticked on it — and
 * under it the **dates** as a grouped list, a check on what has passed, a
 * filled dot on what is open and a ring on what is next. All of it is in the
 * text and line colours: the exam's colour is on its logo alone.
 *
 * Two surfaces draw a sitting with it — the study guide's info panel
 * (`components/wiki/ExamSittingInfoButton.tsx`) and the Store's registration
 * sheet — so a deadline reads the same on both. It is its own module so the
 * Store's chunk and the exam page's share only this, not the info panel. The
 * words and the geometry are `lib/sittingTimeline.ts`'s, pure and tested.
 */
export function SittingTimeline({
  steps,
  today,
  windowNote,
  listClassName,
}: {
  steps: SittingStep[]
  today: string
  windowNote?: string
  listClassName?: string
}) {
  return (
    <div className="space-y-3">
      <SittingStatus steps={steps} today={today} />
      <GroupSurface className={listClassName}>
        <SittingDateRows steps={steps} today={today} windowNote={windowNote} />
      </GroupSurface>
    </div>
  )
}

/** The banner: headline and countdown over the ruler. Nothing for a sitting with neither. */
export function SittingStatus({ steps, today }: { steps: SittingStep[]; today: string }) {
  const headline = sittingHeadline(steps, today)
  const ruler = sittingRuler(steps, today)
  if (!headline && !ruler) return null
  return (
    <div
      className="rounded-[18px] border border-border px-4 py-3.5"
      data-testid="sitting-status"
    >
      {headline && (
        <div className="flex items-center gap-3">
          <div className="min-w-0 flex-1">
            <p className="text-[15px] font-semibold">{headline.title}</p>
            <p className="text-[13px] tabular-nums">{headline.detail}</p>
          </div>
          <p className="shrink-0 text-[22px] font-bold leading-none tabular-nums">
            {headline.count}
          </p>
        </div>
      )}
      {ruler && <Ruler ruler={ruler} />}
    </div>
  )
}

/** Drawn only — every date on it is also a row of the list, in words. */
function Ruler({ ruler }: { ruler: SittingRuler }) {
  const { today } = ruler
  return (
    <div className="relative mx-1 mt-2 h-[50px]" aria-hidden>
      <span className="absolute inset-x-0 top-[21px] h-0.5 rounded-full bg-border" />
      {today !== null && (
        <span className="absolute left-0 top-[21px] h-0.5 rounded-full bg-foreground" style={{ width: `${today}%` }} />
      )}
      {ruler.marks.map(m =>
        m.to !== undefined ? (
          <span
            key={m.key}
            className={cn(
              'absolute top-4 h-3 rounded-full',
              m.state === 'now' || m.state === 'done'
                ? 'bg-foreground'
                : 'bg-ground ring-[1.5px] ring-inset ring-foreground',
            )}
            style={{ left: `${m.at}%`, width: `${Math.max(m.to - m.at, 1.5)}%` }}
          />
        ) : (
          <span
            key={m.key}
            className={cn(
              'absolute top-[17px] -ml-[5px] h-2.5 w-2.5 rounded-full border-2 border-foreground',
              m.state === 'done' ? 'bg-foreground' : 'bg-ground',
            )}
            style={{ left: `${m.at}%` }}
          />
        ),
      )}
      {today !== null && (
        <>
          <span className="absolute top-[15px] -ml-px h-[14px] w-0.5 rounded-full bg-foreground" style={{ left: `${today}%` }} />
          <span
            className={cn(
              'absolute top-0 text-[13px] font-bold leading-none',
              today < 8 ? '-translate-x-0.5' : today > 92 ? '-translate-x-full' : '-translate-x-1/2',
            )}
            style={{ left: `${today}%` }}
          >
            Today
          </span>
        </>
      )}
      {ruler.months.map(mo => (
        <span key={`${mo.label}${mo.at}`} className="absolute top-[33px] -translate-x-1/2 text-[13px] leading-none" style={{ left: `${mo.at}%` }}>
          {mo.label}
        </span>
      ))}
    </div>
  )
}

/** The dates as rows; `windowNote` sits under the window's own row. */
export function SittingDateRows({ steps, today, windowNote }: { steps: SittingStep[]; today: string; windowNote?: string }) {
  return (
    <>
      {steps.map(step => {
        const lines = [step.note, step.kind === 'window' ? windowNote : undefined].filter(Boolean)
        return (
          <GroupRow
            key={`${step.kind}|${step.date}|${step.label}`}
            marker={<StepMarker state={step.state} />}
            label={<>{step.label}<span className="sr-only">{STATE_SR[step.state]}</span></>}
            detail={lines.length > 0 ? lines.map(l => <span key={l} className="block">{l}</span>) : undefined}
            value={formatStepDateShort(step, today)}
            strong={step.state === 'now' || step.state === 'next'}
          />
        )
      })}
    </>
  )
}

/** The dates in their own labelled group, for a sheet built of groups. */
export function SittingDates({ footer, ...rows }: { steps: SittingStep[]; today: string; windowNote?: string; footer?: ReactNode }) {
  return (
    <Group label="Dates" footer={footer}>
      <SittingDateRows {...rows} />
    </Group>
  )
}

/** Drawn only — the state is read out in the step's label (`STATE_SR`). */
function StepMarker({ state }: { state: SittingStep['state'] }) {
  if (state === 'done') return <CheckMark className="h-4 w-4 text-foreground" />
  if (state === 'now') return <span className="h-3 w-3 rounded-full bg-foreground" aria-hidden />
  if (state === 'next') return <span className="h-3 w-3 rounded-full border-2 border-foreground" aria-hidden />
  return <span className="h-3 w-3 rounded-full border-[1.5px] border-border" aria-hidden />
}

const STATE_SR: Record<SittingStep['state'], string> = {
  done: ' (over)',
  now: ' (today)',
  next: ' (next)',
  later: '',
}
