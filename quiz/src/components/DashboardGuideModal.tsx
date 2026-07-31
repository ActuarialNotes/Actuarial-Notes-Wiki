import { useMemo, useState, type ComponentType } from 'react'
import {
  X,
  ChevronLeft,
  ChevronRight,
  Repeat,
  TrendingUp,
} from 'lucide-react'
import { SpacedRepetitionSlide } from '@/components/StudyPlanInfoPanel'
import { ReadinessProjectionSlide } from '@/components/HeatmapInfoPanel'
import type { ConceptMasteryRecord } from '@/lib/mastery'
import type { StudyPlan } from '@/lib/studyPlan'
import type { WikiExamSyllabus } from '@/lib/wikiParser'
import { useSoundOnToggle } from '@/hooks/useSoundEffects'

// The single place the Dashboard explains itself. The per-card info buttons
// that used to open their own panels are gone — everything instructional now
// lives here, behind the "?" icon in the Dashboard header: how spaced
// repetition paces the plan, and where the plan projects your readiness to
// land (last, since it's the data-driven payoff of the first).

interface Props {
  open: boolean
  onClose: () => void
  /** Active exam data — enables the data-driven readiness-projection slide. */
  syllabus?: WikiExamSyllabus | null
  masteryRecords?: ConceptMasteryRecord[]
  examDate?: string | null
  plan?: StudyPlan | null
}

interface GuideSlide {
  Icon: ComponentType<{ className?: string }>
  title: string
  Content: ComponentType
}

export function DashboardGuideModal({ open, onClose, syllabus, masteryRecords, examDate, plan }: Props) {
  // Paper: the panel sliding in.
  useSoundOnToggle(open, 'open', 'close')
  const [slide, setSlide] = useState(0)
  const [touchStart, setTouchStart] = useState(0)

  // The readiness projection needs an active exam to compute against, so it's
  // appended only when there is one.
  const slides = useMemo<GuideSlide[]>(() => {
    const list: GuideSlide[] = [
      { Icon: Repeat, title: 'Spaced repetition', Content: SpacedRepetitionSlide },
    ]
    if (syllabus) {
      list.push({
        Icon: TrendingUp,
        title: 'Projected readiness',
        Content: () => (
          <ReadinessProjectionSlide
            syllabus={syllabus}
            masteryRecords={masteryRecords ?? []}
            examDate={examDate ?? null}
            plan={plan ?? null}
          />
        ),
      })
    }
    return list
  }, [syllabus, masteryRecords, examDate, plan])

  if (!open) return null

  const total = slides.length
  const safe = Math.min(slide, total - 1)
  const { Icon, title, Content } = slides[safe]
  const prev = () => setSlide(s => Math.max(0, s - 1))
  const next = () => setSlide(s => Math.min(total - 1, s + 1))

  return (
    <div
      className="fixed inset-0 z-[70] flex items-start justify-center bg-background/80 backdrop-blur-sm p-4 overflow-y-auto"
      role="dialog"
      aria-modal="true"
      aria-label="Dashboard help"
      onClick={e => { if (e.target === e.currentTarget) onClose() }}
    >
      <div className="w-full max-w-lg bg-card rounded-xl shadow-2xl flex flex-col my-12">
        {/* Header */}
        <div className="flex items-center gap-2 px-4 h-12 shrink-0">
          <Icon className="h-4 w-4 text-primary shrink-0" />
          <span className="flex-1 font-semibold text-sm">{title}</span>
          <button
            type="button"
            onClick={onClose}
            className="text-muted-foreground hover:text-foreground p-2 transition-colors rounded-md hover:bg-muted/50"
            aria-label="Close"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        {/* Slide content — the active slide only (slides are heterogeneous, so
            unlike the single-topic panels we don't stack them). */}
        <div
          className="p-5 text-sm leading-relaxed"
          onTouchStart={e => setTouchStart(e.touches[0].clientX)}
          onTouchEnd={e => {
            const diff = touchStart - e.changedTouches[0].clientX
            if (Math.abs(diff) > 40) { diff > 0 ? next() : prev() }
          }}
        >
          <Content />
        </div>

        {/* Footer: prev / dots / next-or-got-it */}
        <div className="px-5 pb-5 flex items-center justify-between">
          <button
            type="button"
            onClick={prev}
            disabled={safe === 0}
            className="p-2.5 rounded-full bg-muted/40 text-foreground hover:bg-muted disabled:opacity-30 disabled:hover:bg-muted/40 transition-colors shadow-sm"
            aria-label="Previous"
          >
            <ChevronLeft className="h-5 w-5" />
          </button>
          <div className="flex gap-1.5 items-center">
            {Array.from({ length: total }).map((_, i) => (
              <button
                key={i}
                type="button"
                onClick={() => setSlide(i)}
                aria-label={`Go to slide ${i + 1}`}
                className={`rounded-full transition-all duration-200 ${i === safe ? 'w-4 h-1.5 bg-primary' : 'w-1.5 h-1.5 bg-muted-foreground/30 hover:bg-muted-foreground/60'}`}
              />
            ))}
          </div>
          {safe < total - 1 ? (
            <button
              type="button"
              onClick={next}
              className="p-2.5 rounded-full bg-muted/40 text-foreground hover:bg-muted transition-colors shadow-sm"
              aria-label="Next"
            >
              <ChevronRight className="h-5 w-5" />
            </button>
          ) : (
            <button
              type="button"
              onClick={onClose}
              className="rounded-md px-3 py-1.5 text-sm font-medium bg-primary text-primary-foreground hover:bg-primary/90 transition-colors"
            >
              Got it
            </button>
          )}
        </div>
      </div>
    </div>
  )
}
