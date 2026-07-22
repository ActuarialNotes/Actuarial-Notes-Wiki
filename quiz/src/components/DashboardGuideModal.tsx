import { useMemo, useState, type ComponentType } from 'react'
import {
  X,
  ChevronLeft,
  ChevronRight,
  LayoutGrid,
  Flame,
  TrendingUp,
  Calendar,
  Repeat,
  TrendingDown,
  Sparkles,
  Trophy,
} from 'lucide-react'
import {
  SpacedRepetitionSlide,
  ForgettingCurveSlide,
  LevellingSlide,
} from '@/components/StudyPlanInfoPanel'
import { ExamDatesSlide, ReadinessProjectionSlide } from '@/components/HeatmapInfoPanel'
import { STREAK_ENABLED, XP_ENABLED, QUESTS_ENABLED } from '@/lib/featureFlags'
import type { ConceptMasteryRecord } from '@/lib/mastery'
import type { StudyPlan } from '@/lib/studyPlan'
import type { WikiExamSyllabus } from '@/lib/wikiParser'

// A single guided walkthrough of the Dashboard, stitched together from the help
// screens that already back each card's info button — the study-plan panel
// (spaced repetition / forgetting curve / concept levelling) and the heatmap
// panel (readiness projection / exam vs. target dates) — plus short intro slides
// for the streak, readiness and level/quest surfaces that only had inline
// popups. Opened from the "?" icon in the Dashboard header.

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

function WelcomeSlide() {
  return (
    <div className="space-y-4">
      <p className="text-muted-foreground">
        This is your home base. Every card here tracks a different part of your
        study loop — this quick tour walks through what each one means.
      </p>
      <p className="text-muted-foreground">
        Swipe or tap the arrows to move through the tour. You can reopen it any
        time from the <span className="font-medium text-foreground">?</span> icon
        at the top of the dashboard.
      </p>
    </div>
  )
}

function StreakSlide() {
  return (
    <div className="space-y-4">
      <p className="text-muted-foreground">
        The flame counts how many days in a row you&apos;ve studied. A day counts
        as soon as you answer <span className="font-medium text-foreground">one
        question correctly</span> — the checkmark on the card confirms today is
        already in.
      </p>
      <p className="text-muted-foreground">
        Miss a day and the streak resets, so a little practice every day keeps it
        burning.
      </p>
    </div>
  )
}

function LevelQuestsSlide() {
  return (
    <div className="space-y-4">
      <p className="text-muted-foreground">
        The ring around your avatar is your level. Every question you answer earns
        XP — weighted toward harder concepts and ones you&apos;re reviving — which
        fills the ring and works toward your daily goal.
      </p>
      <p className="text-muted-foreground">
        Tap the ring to open your daily goal, quests and league. Quests are small
        daily challenges that pay out gems and XP when you collect them.
      </p>
    </div>
  )
}

export function DashboardGuideModal({ open, onClose, syllabus, masteryRecords, examDate, plan }: Props) {
  const [slide, setSlide] = useState(0)
  const [touchStart, setTouchStart] = useState(0)

  // Assemble the slide list from the reusable help-screen components. Slides
  // that depend on data (readiness) or a feature flag are included only when
  // they'd actually render something on the dashboard.
  const slides = useMemo<GuideSlide[]>(() => {
    const list: GuideSlide[] = [
      { Icon: LayoutGrid, title: 'Your dashboard', Content: WelcomeSlide },
    ]
    if (STREAK_ENABLED) {
      list.push({ Icon: Flame, title: 'Your streak', Content: StreakSlide })
    }
    if (syllabus) {
      list.push({
        Icon: TrendingUp,
        title: 'Readiness',
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
    list.push(
      { Icon: Calendar, title: 'Exam date vs. target ready date', Content: ExamDatesSlide },
      { Icon: Repeat, title: 'Spaced repetition', Content: SpacedRepetitionSlide },
      { Icon: TrendingDown, title: 'The forgetting curve', Content: ForgettingCurveSlide },
      { Icon: Sparkles, title: 'Concept levelling', Content: LevellingSlide },
    )
    if (XP_ENABLED || QUESTS_ENABLED) {
      list.push({ Icon: Trophy, title: 'Levels & quests', Content: LevelQuestsSlide })
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
      aria-label="Dashboard guided tour"
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
