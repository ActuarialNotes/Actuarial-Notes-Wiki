import { useEffect, useMemo, useState, type ReactNode } from 'react'
import { createPortal } from 'react-dom'
import { Gauge, X } from 'lucide-react'
import { useConceptMastery } from '@/hooks/useConceptMastery'
import { useAuth } from '@/hooks/useAuth'
import {
  computeExamReadiness,
  type ExamReadinessAssessment,
  type ReadinessCriterion,
} from '@/lib/readiness'
import { LEVEL3_TEXT } from '@/lib/masteryFill'
import { playSound } from '@/lib/soundEngine'
import type { WikiExamSyllabus } from '@/lib/wikiParser'
import type { MasteryState } from '@/lib/mastery'

/**
 * The exam page's readiness card, and the assessment popup it opens.
 *
 * It rides in the orientation-card row (`ExamGuideCards`) as one card among
 * three, borrowing their shell exactly — the same surface, the same
 * click-to-open-a-popup interaction, the dial standing in for a cover graphic.
 *
 * The card is one number: the overall dial and the band it falls in. Every
 * breakdown is a tap away, in the popup — each criterion's score and tally, how
 * the keystone concepts (docs/keystone-concepts.md) are sitting, and the
 * per-section bars. Keystones are listed there rather than in a strip of their
 * own: they are a readiness criterion, so that is where they belong.
 *
 * It stays deliberately short of prose: the numbers, the bars and the keystone
 * chips are the content, and the explanation of *how* the score works lives in
 * docs/exam-readiness.md rather than under every bar.
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

/** A slim green criterion bar, matching the dials. */
function CriterionBar({ pct }: { pct: number }) {
  return (
    <div className="h-1.5 w-full overflow-hidden rounded-full bg-muted" role="presentation">
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

function CriterionRow({ criterion, children }: { criterion: ReadinessCriterion; children?: ReactNode }) {
  return (
    <li className="space-y-1.5">
      <div className="flex items-baseline gap-2">
        <span className="text-sm font-medium">{criterion.label}</span>
        <span className="text-xs text-muted-foreground">{Math.round(criterion.weight * 100)}% of score</span>
        <span className="ml-auto text-sm font-semibold tabular-nums">{Math.round(criterion.pct)}%</span>
      </div>
      <CriterionBar pct={criterion.pct} />
      <p className="text-xs text-muted-foreground">{criterion.detail}</p>
      {children}
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

          {!signedIn && (
            <p className="rounded-md bg-muted/50 px-3 py-2 text-xs text-muted-foreground">
              Sign in to track progress — the score is built from the concepts you've answered questions on.
            </p>
          )}

          {/* What the score is made of. The keystone criterion carries the
              keystone list itself — the concepts are the evidence for its
              number, so they belong under it rather than in a section of their
              own. This list is the only place the exam names its keystones. */}
          <section>
            <h3 className="mb-2 text-sm font-semibold">How it's scored</h3>
            <ul className="space-y-3.5">
              {criteria.map(c => (
                <CriterionRow key={c.id} criterion={c}>
                  {c.id === 'keystone' && keystone && (
                    <ul className="flex flex-wrap gap-1.5 pt-1">
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
                  )}
                </CriterionRow>
              ))}
            </ul>
          </section>

          {/* Section breakdown */}
          {sections.length > 0 && (
            <section>
              <h3 className="text-sm font-semibold">Syllabus sections</h3>
              <ul className="mt-2 space-y-2">
                {sections.map(section => (
                  <li key={section.name} className="space-y-1">
                    <div className="flex items-baseline gap-2">
                      <span className="min-w-0 truncate text-sm">{section.name}</span>
                      <span className="ml-auto shrink-0 text-xs tabular-nums text-muted-foreground">
                        {section.level3Count}/{section.total} · {Math.round(section.readinessPct)}%
                      </span>
                    </div>
                    <CriterionBar pct={section.readinessPct} />
                  </li>
                ))}
              </ul>
            </section>
          )}
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

export interface ExamReadinessCardProps {
  /** Exam progress key (`P`, `FM`, `MAS-I`, `5`) — the keystone catalogue key. */
  examId: string
  /** Exam display name, e.g. "Exam P-1 (SOA)". */
  examLabel: string
  /** Parsed syllabus for this exam, or null while the page is still loading it. */
  syllabus: WikiExamSyllabus | null
  /** Open a concept in the concept popup. */
  onSelectConcept: (conceptName: string) => void
}

export function ExamReadinessCard({ examId, examLabel, syllabus, onSelectConcept }: ExamReadinessCardProps) {
  const { user } = useAuth()
  const { records } = useConceptMastery()
  const [open, setOpen] = useState(false)

  const assessment = useMemo(() => {
    if (!syllabus) return null
    const examRecords = records.filter(r => r.exam_id === examId)
    return computeExamReadiness(syllabus, examRecords, new Date(), examId)
  }, [syllabus, records, examId])

  // Nothing to score: no syllabus concepts parsed *and* no keystones authored.
  if (!assessment || (assessment.counts.total === 0 && !assessment.keystone)) return null

  return (
    <>
      <button
        type="button"
        onClick={() => setOpen(true)}
        aria-haspopup="dialog"
        className="group flex h-full flex-col rounded-lg bg-card p-3 text-left text-card-foreground shadow-[var(--shadow-card)] transition-colors hover:bg-accent/40 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 sm:p-4"
      >
        {/* One number. The dial stands where the guide cards put their cover
            graphic — and, like the covers, it follows the card width (the
            viewBox scales) so a third of a phone doesn't overflow it. The
            breakdown waits in the popup. */}
        <div className="mb-3 flex flex-1 items-center justify-center">
          <ReadinessDial pct={assessment.overallPct} size={88} className="h-auto w-full max-w-[88px]" />
        </div>
        <div className="flex items-start gap-2">
          <Gauge className="mt-0.5 hidden h-5 w-5 shrink-0 text-primary sm:block" />
          <div className="min-w-0">
            <h3 className="text-sm font-semibold leading-snug tracking-tight sm:text-base">Exam Readiness</h3>
            <p className="text-xs text-muted-foreground">{assessment.band.label}</p>
          </div>
        </div>
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
