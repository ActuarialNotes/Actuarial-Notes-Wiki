import { useState } from 'react'
import { X, BarChart2, Calendar, ClipboardList, ChevronLeft, ChevronRight } from 'lucide-react'

interface Props {
  open: boolean
  onClose: () => void
}

function HeatmapOverviewSlide() {
  return (
    <div className="space-y-4">
      <p className="text-muted-foreground">
        Each square represents one day of study. The color reflects your quiz activity for that day:
      </p>
      <div className="space-y-2 text-xs text-muted-foreground">
        <div className="flex items-center gap-2.5">
          <span className="inline-block h-4 w-4 rounded-[2px] shrink-0" style={{ backgroundColor: 'rgba(34,197,94,0.25)' }} />
          <span>Some activity — lower average score</span>
        </div>
        <div className="flex items-center gap-2.5">
          <span className="inline-block h-4 w-4 rounded-[2px] shrink-0" style={{ backgroundColor: 'rgba(34,197,94,0.65)' }} />
          <span>Good session — solid score</span>
        </div>
        <div className="flex items-center gap-2.5">
          <span className="inline-block h-4 w-4 rounded-[2px] shrink-0" style={{ backgroundColor: 'rgba(34,197,94,1)' }} />
          <span>Excellent — high average score</span>
        </div>
        <div className="flex items-center gap-2.5">
          <span className="inline-block h-4 w-4 rounded-[2px] bg-muted/30 shrink-0" />
          <span>No activity</span>
        </div>
      </div>
      <p className="text-xs text-muted-foreground">
        Tap any past square to see your quiz sessions and concept level-ups for that day.
        When a study plan is active, colors shift to reflect plan completion rather than score.
      </p>
    </div>
  )
}

function ExamDatesSlide() {
  return (
    <div className="space-y-4">
      <div className="space-y-3">
        <div className="rounded-lg border border-primary/30 bg-primary/5 px-3 py-2.5 space-y-1.5">
          <div className="flex items-center gap-2 text-xs font-semibold">
            <span className="inline-block h-2.5 w-2.5 rounded-full bg-primary/70 shrink-0" />
            Exam Date <span className="text-muted-foreground font-normal">(blue highlight)</span>
          </div>
          <p className="text-xs text-muted-foreground">
            The actual date of your exam sitting. The heatmap grid extends around this date and
            the countdown shows days remaining. Tap the <span className="font-medium text-foreground">Exam:</span> label
            below the heatmap to set or change it.
          </p>
        </div>
        <div className="rounded-lg border border-amber-400/30 bg-amber-400/5 px-3 py-2.5 space-y-1.5">
          <div className="flex items-center gap-2 text-xs font-semibold">
            <span className="inline-block h-2.5 w-2.5 rounded-full bg-amber-400 shrink-0" />
            Target Ready Date <span className="text-muted-foreground font-normal">(amber highlight)</span>
          </div>
          <p className="text-xs text-muted-foreground">
            The date you want to feel fully prepared by — typically a few weeks before the exam
            to leave time for final review. Your study plan paces all concepts to fit before
            this date. Tap <span className="font-medium text-foreground">Target ready:</span> to set it.
          </p>
        </div>
      </div>
      <p className="text-xs text-muted-foreground">
        Setting both dates unlocks the countdown timers and lets the study plan pace itself optimally.
      </p>
    </div>
  )
}

function RegistrationSlide() {
  return (
    <div className="space-y-4">
      <p className="text-muted-foreground">
        Actuarial exams are offered at fixed sittings throughout the year through the SOA and CAS.
      </p>
      <div className="space-y-2.5 text-xs">
        <div className="rounded-lg border bg-muted/30 px-3 py-2.5 space-y-1">
          <p className="font-semibold">SOA Exams (P, FM, IFM, LTAM, STAM, SRM, PA)</p>
          <p className="text-muted-foreground">
            Register at <span className="font-medium text-foreground">soa.org</span> → Candidates → Exam Registration.
            Most exams have multiple sittings per year. Registration typically opens about 3 months before each window.
          </p>
        </div>
        <div className="rounded-lg border bg-muted/30 px-3 py-2.5 space-y-1">
          <p className="font-semibold">CAS Exams (Exams 1–9)</p>
          <p className="text-muted-foreground">
            Register at <span className="font-medium text-foreground">casact.org</span>.
            Check the CAS exam calendar for sitting dates and registration deadlines.
          </p>
        </div>
      </div>
      <p className="text-xs text-muted-foreground">
        Fees vary by exam — early registration can save money. Once registered, set your exam date
        here to unlock the countdown and study plan pacing.
      </p>
    </div>
  )
}

const SLIDES = [
  { Icon: BarChart2, title: 'Your Activity Heatmap', Content: HeatmapOverviewSlide },
  { Icon: Calendar, title: 'Exam Date vs. Target Ready Date', Content: ExamDatesSlide },
  { Icon: ClipboardList, title: 'Registering for Exams', Content: RegistrationSlide },
]

export function HeatmapInfoPanel({ open, onClose }: Props) {
  const [slide, setSlide] = useState(0)
  const [touchStart, setTouchStart] = useState(0)

  if (!open) return null

  const total = SLIDES.length
  const { Icon, title, Content } = SLIDES[slide]
  const prev = () => setSlide(s => Math.max(0, s - 1))
  const next = () => setSlide(s => Math.min(total - 1, s + 1))

  return (
    <div
      className="fixed inset-0 z-[70] flex items-start justify-center bg-background/80 backdrop-blur-sm p-4 overflow-y-auto"
      role="dialog"
      aria-modal="true"
      aria-label="Exam heatmap information"
      onClick={e => { if (e.target === e.currentTarget) onClose() }}
    >
      <div className="w-full max-w-lg bg-card border rounded-xl shadow-2xl flex flex-col my-12">
        {/* Header */}
        <div className="flex items-center gap-2 px-4 h-12 border-b shrink-0">
          <Icon className="h-4 w-4 text-primary shrink-0" />
          <span className="flex-1 font-semibold text-sm">{title}</span>
          <button
            type="button"
            onClick={onClose}
            className="text-muted-foreground hover:text-foreground p-1 transition-colors"
            aria-label="Close"
          >
            <X className="h-4 w-4" />
          </button>
        </div>

        {/* Slide content */}
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
            disabled={slide === 0}
            className="p-1.5 rounded-md text-muted-foreground hover:text-foreground disabled:opacity-30 transition-colors"
            aria-label="Previous"
          >
            <ChevronLeft className="h-4 w-4" />
          </button>
          <div className="flex gap-1.5 items-center">
            {Array.from({ length: total }).map((_, i) => (
              <button
                key={i}
                type="button"
                onClick={() => setSlide(i)}
                aria-label={`Go to slide ${i + 1}`}
                className={`rounded-full transition-all duration-200 ${i === slide ? 'w-4 h-1.5 bg-primary' : 'w-1.5 h-1.5 bg-muted-foreground/30 hover:bg-muted-foreground/60'}`}
              />
            ))}
          </div>
          {slide < total - 1 ? (
            <button
              type="button"
              onClick={next}
              className="p-1.5 rounded-md text-muted-foreground hover:text-foreground transition-colors"
              aria-label="Next"
            >
              <ChevronRight className="h-4 w-4" />
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
