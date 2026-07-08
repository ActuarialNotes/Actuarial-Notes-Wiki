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
        Each square represents one day of study. When you have an active study plan, the brightness shows how much of your daily concept quota you completed that day.
      </p>
      <div className="space-y-2 text-sm text-muted-foreground">
        <div className="flex items-start gap-2.5">
          <span className="inline-block h-4 w-4 rounded-[2px] shrink-0 mt-0.5" style={{ backgroundColor: 'rgba(34,197,94,0.25)' }} />
          <span>Studied this day; daily plan quota not yet met</span>
        </div>
        <div className="flex items-start gap-2.5">
          <span className="inline-block h-4 w-4 rounded-[2px] shrink-0 mt-0.5" style={{ backgroundColor: 'rgba(34,197,94,0.65)' }} />
          <span>Good session; roughly half of the daily plan complete</span>
        </div>
        <div className="flex items-start gap-2.5">
          <span className="inline-block h-4 w-4 rounded-[2px] shrink-0 mt-0.5" style={{ backgroundColor: 'rgba(34,197,94,1)' }} />
          <span>Daily plan fully completed (or any active day if no plan is configured)</span>
        </div>
        <div className="flex items-start gap-2.5">
          <span className="inline-block h-4 w-4 rounded-[2px] bg-muted/30 shrink-0 mt-0.5" />
          <span>No activity</span>
        </div>
      </div>
    </div>
  )
}

function ExamDatesSlide() {
  return (
    <div className="space-y-3">
      <div className="rounded-lg bg-primary/5 px-3 py-2.5 space-y-1.5">
        <div className="flex items-center gap-2 text-sm font-semibold">
          <span className="inline-block h-2.5 w-2.5 rounded-full bg-primary/70 shrink-0" />
          Exam Date <span className="text-muted-foreground font-normal">(blue highlight)</span>
        </div>
        <p className="text-sm text-muted-foreground">
          The actual date of your exam sitting.
        </p>
      </div>
      <div className="rounded-lg bg-amber-400/5 px-3 py-2.5 space-y-1.5">
        <div className="flex items-center gap-2 text-sm font-semibold">
          <span className="inline-block h-2.5 w-2.5 rounded-full bg-amber-400 shrink-0" />
          Target Ready Date <span className="text-muted-foreground font-normal">(amber highlight)</span>
        </div>
        <p className="text-sm text-muted-foreground">
          The date you want to feel fully prepared by, typically a few weeks before your exam.
        </p>
      </div>
    </div>
  )
}

function RegistrationSlide() {
  return (
    <div className="space-y-4">
      <p className="text-muted-foreground">
        Actuarial exams are offered at fixed sittings throughout the year through the SOA and CAS.
      </p>
      <div className="space-y-2.5 text-sm">
        <div className="rounded-lg bg-muted/30 px-3 py-2.5 space-y-1">
          <p className="font-semibold">SOA Exams (P, FM, IFM, LTAM, STAM, SRM, PA)</p>
          <p className="text-muted-foreground">Register at soa.org. Most exams have multiple sittings per year.</p>
        </div>
        <div className="rounded-lg bg-muted/30 px-3 py-2.5 space-y-1">
          <p className="font-semibold">CAS Exams (Exams 1–9)</p>
          <p className="text-muted-foreground">Register at casact.org. Check the exam calendar for sitting dates.</p>
        </div>
      </div>
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
  const { Icon, title } = SLIDES[slide]
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

        {/* Slide content: all slides stacked in the same grid cell so the
            container always sizes to the tallest slide, keeping the footer
            buttons from shifting as the user navigates. */}
        <div
          className="grid p-5 text-sm leading-relaxed"
          onTouchStart={e => setTouchStart(e.touches[0].clientX)}
          onTouchEnd={e => {
            const diff = touchStart - e.changedTouches[0].clientX
            if (Math.abs(diff) > 40) { diff > 0 ? next() : prev() }
          }}
        >
          {SLIDES.map(({ Content: SlideContent }, i) => (
            <div
              key={i}
              className="col-start-1 row-start-1"
              style={i === slide ? undefined : { visibility: 'hidden', pointerEvents: 'none' }}
              aria-hidden={i === slide ? undefined : true}
            >
              <SlideContent />
            </div>
          ))}
        </div>

        {/* Footer: prev / dots / next-or-got-it */}
        <div className="px-5 pb-5 flex items-center justify-between">
          <button
            type="button"
            onClick={prev}
            disabled={slide === 0}
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
                className={`rounded-full transition-all duration-200 ${i === slide ? 'w-4 h-1.5 bg-primary' : 'w-1.5 h-1.5 bg-muted-foreground/30 hover:bg-muted-foreground/60'}`}
              />
            ))}
          </div>
          {slide < total - 1 ? (
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
