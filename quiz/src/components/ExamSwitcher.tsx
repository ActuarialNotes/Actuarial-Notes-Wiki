import { useEffect, useRef, useState } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import { ChevronsUpDown, GraduationCap, List } from 'lucide-react'
import { CheckMark } from '@/components/CheckMark'
import { ExamLogo } from '@/components/ExamLogo'
import { useExamFocus } from '@/hooks/useExamFocus'
import { useExamProgress } from '@/contexts/examProgress'
import { defaultBody, loadBody } from '@/lib/bodyFilter'
import { focusedPath, guidePath, switcherBody, switcherGroups, type FocusExam } from '@/lib/examFocus'
import { INK_MENU, INK_MENU_HEADING } from '@/components/ui/ink'
import { cn } from '@/lib/utils'

/** Where the Study Guides row returns to (`Sidebar.tsx`); a new focus starts it on the new exam. */
const LAST_WIKI_PATH_KEY = 'wiki:last-path'

/**
 * The exam switcher, at the head of the navigation (docs/design-review.md
 * §5.3): the exam in focus by its logo and name, and a menu to change it —
 * the reader's exams, then the other ready and beta exams of their body, then
 * **All exams** for the whole ladder. Picking one moves the page the reader is
 * on to the same place for that exam (`focusedPath`); every tab opens on it
 * from then on.
 */
export function ExamSwitcher({ collapsed, onNavigate }: { collapsed: boolean; onNavigate: () => void }) {
  const navigate = useNavigate()
  const location = useLocation()
  const { focus, exams, studied, setFocus } = useExamFocus()
  const { selectedTrack } = useExamProgress()
  const [open, setOpen] = useState(false)
  const rootRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (!open) return
    const away = (e: PointerEvent) => { if (!rootRef.current?.contains(e.target as Node)) setOpen(false) }
    const esc = (e: KeyboardEvent) => { if (e.key === 'Escape') setOpen(false) }
    document.addEventListener('pointerdown', away)
    document.addEventListener('keydown', esc)
    return () => {
      document.removeEventListener('pointerdown', away)
      document.removeEventListener('keydown', esc)
    }
  }, [open])

  if (exams.length === 0) return null
  // With no exam yet, both bodies' exams are the ones to pick from.
  const body = focus ? switcherBody(focus, loadBody() ?? defaultBody(selectedTrack)) : loadBody()
  const { yours, others } = open ? switcherGroups(exams, studied, focus, body) : { yours: [], others: [] }

  function choose(exam: FocusExam) {
    setOpen(false)
    setFocus(exam.file)
    try { sessionStorage.removeItem(LAST_WIKI_PATH_KEY) } catch { /* private mode */ }
    const to = focusedPath(location.pathname, location.search, exam)
    if (to && to !== `${location.pathname}${location.search}`) navigate(to)
    onNavigate()
  }

  function allExams() {
    setOpen(false)
    try { sessionStorage.removeItem(LAST_WIKI_PATH_KEY) } catch { /* private mode */ }
    navigate(guidePath(null))
    onNavigate()
  }

  const row = (exam: FocusExam) => (
    <button
      key={exam.file}
      type="button"
      role="menuitemradio"
      aria-checked={exam.file === focus?.file}
      onClick={() => choose(exam)}
      className="flex w-full items-center gap-2.5 px-3 py-2 text-left text-sm transition-colors hover:bg-accent/60"
    >
      <ExamLogo examKey={exam.progressKey} size="sm" />
      <span className="min-w-0 flex-1">
        <span className="block truncate font-medium">{exam.name}</span>
        <span className="block truncate text-xs text-muted-foreground">{exam.topic}</span>
      </span>
      {exam.file === focus?.file && <CheckMark className="h-4 w-4 shrink-0" />}
    </button>
  )

  return (
    <div ref={rootRef} className="relative border-b px-3 py-2 lg:px-2">
      <button
        type="button"
        onClick={() => setOpen(v => !v)}
        aria-haspopup="menu"
        aria-expanded={open}
        aria-label={focus ? `Exam: ${focus.name}. Change exam` : 'Choose an exam'}
        title={collapsed ? (focus?.name ?? 'Choose an exam') : undefined}
        data-testid="exam-switcher"
        className={cn(
          'flex w-full items-center gap-3 rounded-lg px-3 py-2 text-left transition-colors hover:bg-accent/60 lg:rounded-md lg:py-1.5',
          collapsed && 'lg:justify-center lg:px-0',
        )}
      >
        {focus
          ? <ExamLogo examKey={focus.progressKey} size="sm" />
          : (
            <span className="flex h-6 w-6 shrink-0 items-center justify-center text-muted-foreground lg:h-5 lg:w-5">
              <GraduationCap className="h-5 w-5 lg:h-4 lg:w-4" />
            </span>
          )}
        <span className={cn('min-w-0 flex-1 truncate text-base font-semibold lg:text-sm', collapsed && 'lg:hidden')}>
          {focus?.name ?? 'Choose an exam'}
        </span>
        <ChevronsUpDown className={cn('h-4 w-4 shrink-0 text-muted-foreground', collapsed && 'lg:hidden')} aria-hidden />
      </button>

      {open && (
        <div
          role="menu"
          aria-label="Exam"
          className={cn(INK_MENU, 'absolute left-3 right-3 top-full z-50 -mt-1 max-h-[70vh] overflow-y-auto py-1 lg:left-2 lg:right-auto lg:w-60')}
        >
          {yours.length > 0 && <p className={INK_MENU_HEADING}>Your exams</p>}
          {yours.map(row)}
          {others.length > 0 && <p className={INK_MENU_HEADING}>{yours.length > 0 ? 'Other exams' : 'Which exam are you studying?'}</p>}
          {others.map(row)}
          <button
            type="button"
            role="menuitem"
            onClick={allExams}
            className="mt-1 flex w-full items-center gap-2.5 border-t px-3 py-2.5 text-left text-sm font-medium transition-colors hover:bg-accent/60"
          >
            <span className="flex h-6 w-6 shrink-0 items-center justify-center text-muted-foreground">
              <List className="h-4 w-4" aria-hidden />
            </span>
            All exams
          </button>
        </div>
      )}
    </div>
  )
}
