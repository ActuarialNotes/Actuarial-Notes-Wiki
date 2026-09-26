import { useCallback, useEffect, useLayoutEffect, useMemo, useRef, useState } from 'react'
import { ChevronDown, Circle } from 'lucide-react'
import { CheckMark } from '@/components/CheckMark'
import { OverlayPortal } from '@/components/ui/OverlayPortal'
import { useAuth } from '@/hooks/useAuth'
import { useExamProgress } from '@/contexts/ExamProgressContext'
import {
  currentSitting,
  formatSittingDate,
  getSittingsForExam,
  sittingContains,
  sittingVersionLabel,
  type ExamSitting,
} from '@/data/examSittings'
import { placeMenu, type MenuPlacement } from '@/lib/menuPlacement'
import { cn } from '@/lib/utils'

/**
 * The study guide's **version**: which sitting of the exam the page is being
 * read for, in the sticky header beside the syllabus button.
 *
 * The trigger names the sitting ("Nov 2026"); the menu lists the upcoming
 * sittings from `data/examSittings.ts`. For a signed-in reader who is sitting
 * the exam, the version *is* their exam date — picking one writes it, so the
 * study plan paces to the sitting the header names. Anyone else can still
 * switch it, for this visit only; it changes no one's record.
 *
 * An exam with no upcoming sitting on file renders nothing: a version the
 * sittings table doesn't list would be invented.
 *
 * Like `QuizSettingsMenu`, the menu portals to <body> and is placed by
 * `placeMenu` — the trigger lives in the sticky header's stacking context.
 */
export function ExamVersionMenu({ progressKey }: { progressKey: string }) {
  const { user } = useAuth()
  const { progress, targetDates, updateTargetDate } = useExamProgress()
  const sittings = useMemo(() => getSittingsForExam(progressKey), [progressKey])
  const tracked = !!user && progress[progressKey] === 'in_progress'

  // A pick not written to the reader's record (guest, or an untracked exam).
  const [localDate, setLocalDate] = useState<string | null>(null)
  useEffect(() => { setLocalDate(null) }, [progressKey])

  const selectedDate = (tracked ? targetDates[progressKey] : null) ?? localDate
  const selected = currentSitting(sittings, selectedDate)

  const [open, setOpen] = useState(false)
  const [box, setBox] = useState<MenuPlacement | null>(null)
  const triggerRef = useRef<HTMLButtonElement>(null)

  const measure = useCallback(() => {
    const el = triggerRef.current
    if (!el) return
    const next = placeMenu(
      el.getBoundingClientRect(),
      { width: window.innerWidth, height: window.innerHeight },
      { width: MENU_WIDTH_PX, maxHeight: MENU_MAX_HEIGHT_PX },
    )
    setBox(next)
  }, [])

  useLayoutEffect(() => {
    if (open) measure()
  }, [open, measure])

  useEffect(() => {
    if (!open) return
    const onViewportChange = () => measure()
    window.addEventListener('resize', onViewportChange)
    window.addEventListener('scroll', onViewportChange, true)
    return () => {
      window.removeEventListener('resize', onViewportChange)
      window.removeEventListener('scroll', onViewportChange, true)
    }
  }, [open, measure])

  useEffect(() => {
    if (!open) return
    function onPointerDown(e: PointerEvent) {
      const target = e.target as HTMLElement | null
      if (target?.closest('[data-exam-version-menu]')) return
      if (target?.closest('[data-exam-version-trigger]')) return
      setOpen(false)
    }
    function onKeyDown(e: KeyboardEvent) {
      if (e.key !== 'Escape') return
      e.stopPropagation()
      setOpen(false)
      triggerRef.current?.focus()
    }
    document.addEventListener('pointerdown', onPointerDown)
    window.addEventListener('keydown', onKeyDown)
    return () => {
      document.removeEventListener('pointerdown', onPointerDown)
      window.removeEventListener('keydown', onKeyDown)
    }
  }, [open])

  if (!selected) return null

  function choose(s: ExamSitting) {
    setOpen(false)
    // The last day of the window, the same date the study-plan settings'
    // sitting list sets — the plan paces to the end of the window.
    const date = s.endDate ?? s.startDate
    if (tracked) {
      if (!sittingContains(s, targetDates[progressKey])) void updateTargetDate(progressKey, date)
    } else {
      setLocalDate(date)
    }
  }

  const label = sittingVersionLabel(selected)

  const menu = box && (
    <div
      data-exam-version-menu
      role="listbox"
      aria-label="Exam version"
      className="fixed w-64 z-[70] overflow-y-auto rounded-lg border border-border bg-popover py-1 text-popover-foreground shadow-md"
      style={{
        left: box.left,
        ...(box.top !== null ? { top: box.top } : { bottom: box.bottom ?? 0 }),
        maxHeight: box.maxHeight,
      }}
    >
      <p className="px-3 pt-2 pb-1 text-xs font-medium text-muted-foreground">Sitting</p>
      {sittings.map(s => {
        const active = s === selected
        return (
          <button
            key={`${s.startDate}|${s.endDate ?? ''}|${s.format}`}
            type="button"
            role="option"
            aria-selected={active}
            data-sound="tick"
            onClick={() => choose(s)}
            className="flex w-full items-center gap-2.5 px-3 py-2.5 text-left text-sm transition-colors hover:bg-accent focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-ring"
          >
            {active
              ? <CheckMark className="h-4 w-4" />
              : <Circle className="h-4 w-4 shrink-0 text-muted-foreground/50" aria-hidden />}
            <span className="min-w-0 flex-1 font-medium">{formatSittingDate(s)}</span>
            <span className="shrink-0 text-xs text-muted-foreground">{s.format}</span>
          </button>
        )
      })}
    </div>
  )

  return (
    <>
      <button
        ref={triggerRef}
        type="button"
        data-exam-version-trigger
        aria-haspopup="listbox"
        aria-expanded={open}
        aria-label={`Exam version: ${label} sitting`}
        title={`${formatSittingDate(selected)} sitting`}
        onClick={() => setOpen(o => !o)}
        className={cn(
          'inline-flex h-8 shrink-0 items-center gap-1 rounded-full bg-muted px-2.5 text-xs font-medium transition-colors hover:bg-accent',
          'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring not-prose',
          open && 'bg-accent',
        )}
      >
        {label}
        <ChevronDown className={cn('h-3.5 w-3.5 text-muted-foreground transition-transform', open && 'rotate-180')} aria-hidden />
      </button>
      {open && menu && <OverlayPortal>{menu}</OverlayPortal>}
    </>
  )
}

const MENU_WIDTH_PX = 256
const MENU_MAX_HEIGHT_PX = 360
