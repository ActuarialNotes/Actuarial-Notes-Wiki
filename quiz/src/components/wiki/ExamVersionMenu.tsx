import { useCallback, useEffect, useLayoutEffect, useRef, useState } from 'react'
import { ChevronDown } from 'lucide-react'
import { CheckMark } from '@/components/CheckMark'
import { OverlayPortal } from '@/components/ui/OverlayPortal'
import { useExamVersion } from '@/hooks/useExamVersion'
import {
  formatSittingDate,
  sittingKey,
  sittingVersionLabel,
  type ExamSitting,
} from '@/data/examSittings'
import { placeMenu, type MenuPlacement } from '@/lib/menuPlacement'
import { INK_MENU, INK_MENU_HEADING, inkChevron, inkMenuItem, inkTrigger } from '@/components/ui/ink'
import { examAccentStyle } from '@/lib/examColors'

/**
 * The study guide's **version**: which sitting of the exam the page is being
 * read for, in the sticky header beside the syllabus button.
 *
 * The trigger names the sitting ("Nov 2026"); the menu lists the upcoming
 * sittings from `data/examSittings.ts`. For a signed-in reader who is sitting
 * the exam, the version *is* their exam date — picking one writes it, so the
 * study plan paces to the sitting the header names. Anyone else can still
 * switch it, for this visit only; it changes no one's record. The selection
 * itself is `hooks/useExamVersion.ts`, which the info button beside this menu
 * (`ExamSittingInfoButton`) reads too.
 *
 * An exam with no upcoming sitting on file renders nothing: a version the
 * sittings table doesn't list would be invented.
 *
 * Like `QuizSettingsMenu`, the menu portals to <body> and is placed by
 * `placeMenu` — the trigger lives in the sticky header's stacking context.
 */
export function ExamVersionMenu({ progressKey }: { progressKey: string }) {
  const { sittings, selected, choose: chooseVersion } = useExamVersion(progressKey)

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
    chooseVersion(s)
  }

  const label = sittingVersionLabel(selected)

  const menu = box && (
    <div
      data-exam-version-menu
      role="listbox"
      aria-label="Exam version"
      className={`fixed w-64 z-[70] overflow-y-auto ${INK_MENU}`}
      style={{
        // Portalled out of the strip, so it brings the exam's pick with it.
        ...examAccentStyle(progressKey),
        left: box.left,
        ...(box.top !== null ? { top: box.top } : { bottom: box.bottom ?? 0 }),
        maxHeight: box.maxHeight,
      }}
    >
      <p className={INK_MENU_HEADING}>Sitting</p>
      {sittings.map(s => {
        const active = s === selected
        return (
          <button
            key={sittingKey(s)}
            type="button"
            role="option"
            aria-selected={active}
            data-sound="tick"
            onClick={() => choose(s)}
            className={inkMenuItem(active)}
          >
            <span className="min-w-0 flex-1">{formatSittingDate(s)}</span>
            <span className={`shrink-0 text-xs font-medium ${active ? 'opacity-75' : 'text-muted-foreground'}`}>{s.format}</span>
            {/* The pick is solid; its check is the app's one checkmark, in the pick's text colour. */}
            {active ? <CheckMark className="h-4 w-4 text-current" /> : <span className="h-4 w-4 shrink-0" aria-hidden />}
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
        className={inkTrigger(open)}
      >
        {label}
        <ChevronDown className={inkChevron(open)} aria-hidden />
      </button>
      {open && menu && <OverlayPortal>{menu}</OverlayPortal>}
    </>
  )
}

const MENU_WIDTH_PX = 256
const MENU_MAX_HEIGHT_PX = 360
