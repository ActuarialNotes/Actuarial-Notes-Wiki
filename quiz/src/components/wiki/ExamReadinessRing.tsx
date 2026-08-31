import { useEffect, useId, useMemo, useState, type ReactNode } from 'react'
import { createPortal } from 'react-dom'
import { Link } from 'react-router-dom'
import { ChevronDown, Gauge, X } from 'lucide-react'
import { useConceptMastery } from '@/hooks/useConceptMastery'
import { useAuth } from '@/hooks/useAuth'
import {
  computeExamReadiness,
  type ExamReadinessAssessment,
  type ReadinessCriterion,
} from '@/lib/readiness'
import { LEVEL3_TEXT } from '@/lib/masteryFill'
import { ReadinessRing } from '@/components/ReadinessRing'
import { buildRingSegments } from '@/lib/readinessRing'
import { playSound } from '@/lib/soundEngine'
import type { WikiExamSyllabus } from '@/lib/wikiParser'
import type { MasteryState } from '@/lib/mastery'

/**
 * The exam page's readiness ring, and the assessment popup it opens.
 *
 * It sits beside the exam's title as a badge — the Dashboard's Study Guide
 * radial at ~64px (`components/ReadinessRing.tsx`), drawn from the same
 * `lib/readinessRing.ts` maths, so the syllabus a reader is looking at and the
 * ring summarising it are the same object. It used to be a card in the
 * orientation-card row; the row is one wide card now, and a score belongs with
 * the thing it scores.
 *
 * The ring is one number plus the shape of the syllabus behind it. Every
 * breakdown is a tap away, in the popup — which is two criterion bars, one per
 * scoring criterion, each expanding to the evidence behind its number:
 * syllabus coverage to the per-learning-objective bars, keystone concepts
 * (docs/keystone-concepts.md) to the concepts themselves. Both start collapsed,
 * so the popup opens as the dial plus two bars and goes no deeper until asked.
 *
 * It carries no prose at all: the numbers, the bars and the keystone chips are
 * the content. Nothing on screen says "60% of score" or restates the tally
 * under a bar — a criterion's weight is drawn as the thickness of its bar, its
 * evidence is the panel it opens onto, and the explanation of *how* the score
 * works lives in docs/exam-readiness.md. Resist adding a grey caption back:
 * each one reads as noise stacked under a number that already said it.
 *
 * Scoring lives in `lib/readiness.ts` — this file only draws it.
 */

// Level dot colours track the mastery ladder (docs/concept-learning-progression.md).
const DOT: Record<MasteryState, string> = {
  new: 'bg-muted-foreground/30',
  level1: 'bg-green-300 dark:bg-green-900',
  level2: 'bg-green-400 dark:bg-green-700',
  level3: 'bg-green-500 dark:bg-green-500',
  forgotten: 'bg-amber-400 dark:bg-amber-500',
}

/**
 * A percentage dial. Green throughout the range — the arc length carries the
 * score, so the hue doesn't have to, and a readiness dial that turns red would
 * fight the mastery ladder's use of red for decay.
 */
function ReadinessDial({ pct, size, className }: { pct: number; size: number; className?: string }) {
  const value = Math.max(0, Math.min(100, pct))
  const stroke = Math.max(4, Math.round(size * 0.1))
  const r = (size - stroke) / 2
  const c = 2 * Math.PI * r
  const cx = size / 2
  const cy = size / 2
  return (
    <svg
      width={size}
      height={size}
      viewBox={`0 0 ${size} ${size}`}
      className={`block shrink-0 ${className ?? ''}`}
      aria-hidden="true"
    >
      <circle cx={cx} cy={cy} r={r} fill="none" stroke="hsl(var(--muted-foreground))" strokeOpacity={0.2} strokeWidth={stroke} />
      <circle
        cx={cx} cy={cy} r={r} fill="none"
        stroke={LEVEL3_TEXT}
        strokeWidth={stroke}
        strokeLinecap="round"
        strokeDasharray={c}
        strokeDashoffset={c * (1 - value / 100)}
        transform={`rotate(-90 ${cx} ${cy})`}
        style={{ transition: 'stroke-dashoffset 500ms ease-out' }}
      />
      <text
        x={cx} y={cy}
        textAnchor="middle"
        dominantBaseline="central"
        fontSize={size * 0.3}
        fontWeight={700}
        fill="hsl(var(--foreground))"
        className="tabular-nums"
      >
        {Math.round(value)}
      </text>
    </svg>
  )
}

/**
 * A slim green criterion bar, matching the dials.
 *
 * `weight` (0–1, optional) thickens the bar in proportion to the share of the
 * headline score the criterion carries: the heavier criterion is visibly the
 * heavier line. That is the whole reason the rows no longer print "60% of
 * score" — the weight is drawn, not narrated. Bars with no weight (the
 * per-section breakdown) all take the base thickness.
 */
function CriterionBar({ pct, weight }: { pct: number; weight?: number }) {
  const height = weight == null ? 6 : 4 + Math.max(0, Math.min(1, weight)) * 6
  return (
    <div
      className="w-full overflow-hidden rounded-full bg-muted"
      style={{ height }}
      role="presentation"
    >
      <div
        className="h-full rounded-full"
        style={{
          width: `${Math.max(0, Math.min(100, pct))}%`,
          backgroundColor: LEVEL3_TEXT,
          transition: 'width 500ms ease-out',
        }}
      />
    </div>
  )
}

/**
 * One criterion: its bar, its tally, and — behind a chevron — the breakdown
 * that produced the number. The whole row is the toggle rather than the chevron
 * alone, so the bar itself is the tap target on a phone. A criterion with
 * nothing to expand (no sections parsed, no keystones) renders as a plain row
 * with no chevron, so a disclosure never opens onto an empty panel.
 */
function CriterionRow({ criterion, panel }: { criterion: ReadinessCriterion; panel: ReactNode | null }) {
  const [open, setOpen] = useState(false)
  const panelId = useId()
  const expandable = panel != null

  // The weight and the tally behind the number are carried by the bar and by
  // the panel the row opens onto, not by a grey line under it.
  const label = `${criterion.label}: ${Math.round(criterion.pct)}%, `
    + `${Math.round(criterion.weight * 100)}% of the readiness score`

  const head = (
    <>
      <div className="flex items-baseline gap-2">
        <span className="text-sm font-medium">{criterion.label}</span>
        <span className="ml-auto text-sm font-semibold tabular-nums">{Math.round(criterion.pct)}%</span>
        {expandable && (
          <ChevronDown
            className={`h-4 w-4 shrink-0 self-center text-muted-foreground transition-transform duration-200 ${open ? '' : '-rotate-90'}`}
            aria-hidden="true"
          />
        )}
      </div>
      <CriterionBar pct={criterion.pct} weight={criterion.weight} />
    </>
  )

  return (
    <li>
      {expandable ? (
        <button
          type="button"
          onClick={() => setOpen(o => !o)}
          aria-expanded={open}
          aria-controls={panelId}
          aria-label={label}
          className="-mx-1.5 w-full space-y-1.5 rounded-md px-1.5 py-2 text-left transition-colors hover:bg-muted/40 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
        >
          {head}
        </button>
      ) : (
        <div role="group" aria-label={label} className="space-y-1.5 px-1.5 py-2">{head}</div>
      )}
      {expandable && open && (
        <div id={panelId} className="px-1.5 pb-1 pt-2">
          {panel}
        </div>
      )}
    </li>
  )
}

interface ModalProps {
  assessment: ExamReadinessAssessment
  examLabel: string
  signedIn: boolean
  onSelectConcept: (conceptName: string) => void
  onClose: () => void
}

function ExamReadinessModal({ assessment, examLabel, signedIn, onSelectConcept, onClose }: ModalProps) {
  const { overallPct, band, criteria, sections, keystone } = assessment

  // Paper: the panel sliding in, then back out — same as the guide popup.
  useEffect(() => {
    playSound('open')
    return () => playSound('close')
  }, [])

  useEffect(() => {
    function onKey(e: KeyboardEvent) {
      if (e.key === 'Escape') onClose()
    }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [onClose])

  return createPortal(
    <div
      className="fixed inset-0 z-[70] flex items-start justify-center overflow-y-auto bg-background/80 p-4 backdrop-blur-sm"
      role="dialog"
      aria-modal="true"
      aria-label={`Exam readiness score for ${examLabel}`}
      onClick={e => { if (e.target === e.currentTarget) onClose() }}
    >
      <div className="my-12 flex w-full max-w-lg flex-col rounded-xl bg-card shadow-2xl">
        <div className="flex h-12 shrink-0 items-center gap-2 px-4">
          <Gauge className="h-4 w-4 shrink-0 text-primary" />
          <span className="flex-1 truncate text-sm font-semibold">Exam Readiness Score</span>
          <button
            type="button"
            onClick={onClose}
            className="rounded-md p-2 text-muted-foreground transition-colors hover:bg-muted/50 hover:text-foreground"
            aria-label="Close"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        <div className="space-y-5 px-5 pb-1">
          {/* The verdict — the dial and the band it lands in. No blurb: the
              band name already says where the reader stands, and the criterion
              rows below say what to do about it. */}
          <div className="flex items-center gap-4">
            <ReadinessDial pct={overallPct} size={88} />
            <h2 className="min-w-0 text-lg font-semibold tracking-tight">{band.label}</h2>
          </div>

          {/* Signed out the score can only ever read zero, so the ask is the
              control itself — no caption under it explaining what signing in
              is for. A dial reading zero next to a Sign in button says it. */}
          {!signedIn && (
            <div className="flex justify-center">
              <Link
                to="/auth"
                onClick={onClose}
                className="rounded-md bg-primary px-4 py-1.5 text-sm font-medium text-primary-foreground transition-colors hover:bg-primary/90"
              >
                Sign in
              </Link>
            </div>
          )}

          {/* The two criteria, each expanding to the evidence behind its
              number: syllabus coverage to the per-learning-objective bars,
              keystone concepts to the concepts themselves. The keystone list
              lives here rather than in a section of its own — the concepts are
              what the criterion is scored on — and this is still the only place
              the exam names its keystones. */}
          <ul>
            {criteria.map(c => (
              <CriterionRow
                key={c.id}
                criterion={c}
                panel={
                  c.id === 'syllabus'
                    ? sections.length > 0
                      ? (
                        <ul className="space-y-2">
                          {sections.map(section => (
                            <li key={section.name} className="space-y-1">
                              <div className="flex items-baseline gap-2">
                                <span className="min-w-0 truncate text-sm">{section.name}</span>
                                <span className="ml-auto shrink-0 text-xs tabular-nums text-muted-foreground">
                                  {Math.round(section.readinessPct)}%
                                </span>
                              </div>
                              <CriterionBar pct={section.readinessPct} />
                            </li>
                          ))}
                        </ul>
                      )
                      : null
                    : keystone
                      ? (
                        <ul className="flex flex-wrap gap-1.5">
                          {keystone.entries.map(({ concept, state }) => (
                            <li key={concept.name}>
                              <button
                                type="button"
                                onClick={() => { onSelectConcept(concept.name); onClose() }}
                                title={concept.why}
                                className="inline-flex items-center gap-1.5 rounded-full bg-muted/50 px-2.5 py-1 text-sm transition-colors hover:bg-accent"
                              >
                                <span className={`h-1.5 w-1.5 shrink-0 rounded-full ${DOT[state]}`} aria-hidden="true" />
                                {concept.name}
                              </button>
                            </li>
                          ))}
                        </ul>
                      )
                      : null
                }
              />
            ))}
          </ul>
        </div>

        <div className="flex justify-end px-5 pb-5 pt-4">
          <button
            type="button"
            onClick={onClose}
            className="rounded-md bg-primary px-3 py-1.5 text-sm font-medium text-primary-foreground transition-colors hover:bg-primary/90"
          >
            Got it
          </button>
        </div>
      </div>
    </div>,
    document.body,
  )
}

export interface ExamReadinessRingProps {
  /** Exam progress key (`P`, `FM`, `MAS-I`, `5`) — the keystone catalogue key. */
  examId: string
  /** Exam display name, e.g. "Exam P-1 (SOA)". */
  examLabel: string
  /** Parsed syllabus for this exam, or null while the page is still loading it. */
  syllabus: WikiExamSyllabus | null
  /** Open a concept in the concept popup. */
  onSelectConcept: (conceptName: string) => void
}

export function ExamReadinessRing({ examId, examLabel, syllabus, onSelectConcept }: ExamReadinessRingProps) {
  const { user } = useAuth()
  const { records } = useConceptMastery()
  const [open, setOpen] = useState(false)

  const assessment = useMemo(() => {
    if (!syllabus) return null
    const examRecords = records.filter(r => r.exam_id === examId)
    return computeExamReadiness(syllabus, examRecords, new Date(), examId)
  }, [syllabus, records, examId])

  const segments = useMemo(
    () => syllabus ? buildRingSegments(syllabus, records.filter(r => r.exam_id === examId), new Date()) : [],
    [syllabus, records, examId],
  )

  // Nothing to score: no syllabus concepts parsed *and* no keystones authored.
  if (!assessment || (assessment.counts.total === 0 && !assessment.keystone)) return null

  return (
    <>
      <button
        type="button"
        onClick={() => setOpen(true)}
        aria-haspopup="dialog"
        aria-label={`Exam readiness: ${Math.round(assessment.overallPct)}% — ${assessment.band.label}`}
        title={`Exam readiness — ${assessment.band.label}`}
        className="group inline-flex shrink-0 items-center rounded-full p-1 text-foreground transition-colors hover:bg-accent/40 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
      >
        {/* No label of its own: the ring is beside the exam's title, and the
            title already says which exam is being scored. The band and the
            breakdown are one tap away. */}
        <ReadinessRing segments={segments} pct={assessment.overallPct} size={64} />
      </button>

      {open && (
        <ExamReadinessModal
          assessment={assessment}
          examLabel={examLabel}
          signedIn={user != null}
          onSelectConcept={onSelectConcept}
          onClose={() => setOpen(false)}
        />
      )}
    </>
  )
}
