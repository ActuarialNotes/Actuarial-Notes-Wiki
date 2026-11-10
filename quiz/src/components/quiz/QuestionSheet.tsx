import { useCallback, useEffect, useMemo, useRef, useState, type PointerEvent as ReactPointerEvent } from 'react'
import { Workbook, type WorkbookInstance } from '@fortune-sheet/react'
import '@fortune-sheet/react/dist/index.css'
import { AlertTriangle, Calculator, ChevronDown, Download, ExternalLink, PanelRight, RotateCcw, Sheet as SheetIcon, X } from 'lucide-react'
import { cn } from '@/lib/utils'
import { INK_MENU, INK_MENU_HEADING, inkMenuItem } from '@/components/ui/ink'
import { useIsMobile } from '@/hooks/useIsMobile'
import { useContainTouches, useSheetTouchScroll } from '@/hooks/useSheetTouchScroll'
import { useQuestionSheetStore } from '@/stores/questionSheetStore'
import { fromFortune, parseSheetFile, toFortune, toXlsxSheets, type FortuneSheet, type SheetFile } from '@/lib/project/sheetFile'
import { downloadWorkbook } from '@/lib/xlsx'
import { cellSelection } from '@/lib/sheetSelection'
import {
  cellAddress, clampDockHeight, columnWidths, clampDockWidth, clampWindowRect, defaultDockWidth, defaultWindowRect,
  offListCells, offListFunctions, questionMarkdown, questionWorkbook, shownValue, type WindowRect,
} from '@/lib/questionSheet'
import {
  SHEET_RULES, SHEET_RULES_LABEL, isBlockedFunctionKey, loadSheetRules, saveSheetRules, type SheetRules,
} from '@/lib/sheetRules'
import type { SpreadsheetProfile } from '@/data/examSpreadsheets'
import type { Question, QuizMode } from '@/lib/parser'
import pearsonVue from '@/data/pearsonVueFunctions.json'
import {
  KEYPAD_FUNCTIONS, backspace, cellContent, closeBrackets, editEntry, isPointing, pointAt, readyEntry, typeFunction, typeInto,
  valueAsFormula, type Entry, type KeypadKey,
} from '@/lib/sheetKeypad'
import SheetKeypad from './SheetKeypad'

/**
 * **Open in Spreadsheet** — the question's spreadsheet, beside it
 * (docs/question-spreadsheet.md).
 *
 * It opens **docked**: on the right of a wide screen, the question still
 * readable beside it, or as a sheet up from the bottom of a narrow one. **Pop
 * out** lifts it into a window of its own, moved by its title bar and sized by
 * its corner, which is how the test driver's tools sit over the question.
 *
 * The sheet starts with the question's own tables (`questionWorkbook`) and is
 * kept per question with the quiz session. The exam day's rules — Off, Warn,
 * Enforce — check formulas against the test driver's published function list.
 * The cell selected here is what the answer boxes' **Insert** button drops in
 * (`stores/questionSheetStore.ts`).
 *
 * Lazy: Fortune-sheet is the heaviest thing in the quiz, and most questions
 * never open it.
 */

const FUNCTION_LISTS: Record<SpreadsheetProfile['id'], ReadonlySet<string>> = {
  'pearson-vue': new Set(pearsonVue.functions),
}

const DESCRIPTIONS: Record<SheetRules, string> = {
  off: 'The full spreadsheet. Nothing is checked.',
  warn: 'Everything works. A function you won’t have on exam day is pointed out.',
  enforce: 'Only what the exam-day spreadsheet allows. Other functions are refused, and function keys do nothing.',
}

const DOCK_WIDTH_KEY = 'question-sheet-width'
const DOCK_HEIGHT_KEY = 'question-sheet-height'
const WINDOW_KEY = 'question-sheet-window'

function readNumber(key: string): number | null {
  try {
    const n = Number(localStorage.getItem(key))
    return Number.isFinite(n) && n > 0 ? n : null
  } catch {
    return null
  }
}

function readRect(): WindowRect | null {
  try {
    const raw = JSON.parse(localStorage.getItem(WINDOW_KEY) ?? 'null') as WindowRect | null
    return raw && [raw.x, raw.y, raw.width, raw.height].every(Number.isFinite) ? raw : null
  } catch {
    return null
  }
}

function write(key: string, value: unknown): void {
  try { localStorage.setItem(key, typeof value === 'string' ? value : JSON.stringify(value)) } catch { /* quota */ }
}

function viewport() {
  return { width: window.innerWidth, height: window.innerHeight }
}

/** Drag with the pointer, calling `onMove` with how far it has gone. */
function startDrag(e: ReactPointerEvent, onMove: (dx: number, dy: number) => void, onEnd?: () => void) {
  e.preventDefault()
  const x0 = e.clientX
  const y0 = e.clientY
  const move = (ev: PointerEvent) => onMove(ev.clientX - x0, ev.clientY - y0)
  const up = () => {
    window.removeEventListener('pointermove', move)
    window.removeEventListener('pointerup', up)
    document.body.style.userSelect = ''
    onEnd?.()
  }
  document.body.style.userSelect = 'none'
  window.addEventListener('pointermove', move)
  window.addEventListener('pointerup', up)
}

export interface QuestionSheetProps {
  question: Question
  mode: QuizMode
  profile: SpreadsheetProfile
  /** The question's working so far, or undefined for a sheet not yet opened. */
  workbook: string | undefined
  onWorkbookChange: (questionId: string, workbook: string | null) => void
  onClose: () => void
}

export default function QuestionSheet({ question, mode, profile, workbook, onWorkbookChange, onClose }: QuestionSheetProps) {
  const narrow = useIsMobile(1023)
  const storeView = useQuestionSheetStore(s => s.view)
  const setView = useQuestionSheetStore(s => s.setView)
  const setSelected = useQuestionSheetStore(s => s.setSelected)
  const selected = useQuestionSheetStore(s => s.selected)
  // A window over the question needs room around it; a phone only docks.
  const view = narrow ? 'docked' : storeView

  const [rules, setRules] = useState<SheetRules>(() => loadSheetRules(mode))
  const [menuOpen, setMenuOpen] = useState(false)
  const [confirmReset, setConfirmReset] = useState(false)
  const [resetCount, setResetCount] = useState(0)
  const [notice, setNotice] = useState<string | null>(null)
  // The phone's keypad (SheetKeypad): open, and whether the phone's own
  // keyboard is up in its place.
  const [keypad, setKeypad] = useState(false)
  const [typing, setTyping] = useState(false)
  const keypadOn = narrow && keypad
  const allowed = FUNCTION_LISTS[profile.id]

  // The workbook the grid opens with: the reader's working, else the question's tables.
  const opening = useMemo<SheetFile>(
    () => (workbook ? parseSheetFile(workbook) : questionWorkbook(questionMarkdown(question))),
    // Re-read only for a new question or a reset; after that the grid owns it.
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [question.id, resetCount],
  )
  const initialData = useMemo(() => {
    const sheets = toFortune(opening)
    if (sheets[0]) sheets[0].config = { columnlen: columnWidths(opening) }
    return sheets
  }, [opening])
  const [current, setCurrent] = useState<SheetFile>(opening)
  useEffect(() => { setCurrent(opening) }, [opening])

  const flagged = useMemo(() => (rules === 'off' ? [] : offListCells(current, allowed)), [current, rules, allowed])
  const [flagIndex, setFlagIndex] = useState(0)

  // ── Geometry ──────────────────────────────────────────────────────────────
  const [dockWidth, setDockWidth] = useState(() => clampDockWidth(readNumber(DOCK_WIDTH_KEY) ?? defaultDockWidth(viewport()), viewport()))
  const [dockHeight, setDockHeight] = useState(() => clampDockHeight(readNumber(DOCK_HEIGHT_KEY) ?? window.innerHeight * 0.55, viewport()))
  const [rect, setRect] = useState<WindowRect>(() => clampWindowRect(readRect() ?? defaultWindowRect(viewport()), viewport()))

  useEffect(() => {
    function onResize() {
      setDockWidth(w => clampDockWidth(w, viewport()))
      setDockHeight(h => clampDockHeight(h, viewport()))
      setRect(r => clampWindowRect(r, viewport()))
    }
    window.addEventListener('resize', onResize)
    return () => window.removeEventListener('resize', onResize)
  }, [])

  // Tell the page how much room the docked pane takes, so the question moves
  // out from under it (index.css, `.question-sheet-host`).
  useEffect(() => {
    const root = document.documentElement
    if (view === 'docked') {
      root.dataset.questionSheet = 'docked'
      root.style.setProperty('--question-sheet-width', `${dockWidth}px`)
      root.style.setProperty('--question-sheet-height', `${dockHeight}px`)
    } else {
      root.dataset.questionSheet = 'popped'
    }
    return () => {
      delete root.dataset.questionSheet
      root.style.removeProperty('--question-sheet-width')
      root.style.removeProperty('--question-sheet-height')
    }
  }, [view, dockWidth, dockHeight])

  // Fortune-sheet measures its box on a window resize only, so a pane dragged
  // wider or a window popped out would keep the old canvas. Tell it.
  const gridRef = useRef<HTMLDivElement>(null)
  useEffect(() => {
    const el = gridRef.current
    if (!el || typeof ResizeObserver === 'undefined') return
    let frame = 0
    const observer = new ResizeObserver(() => {
      cancelAnimationFrame(frame)
      frame = requestAnimationFrame(() => window.dispatchEvent(new Event('resize')))
    })
    observer.observe(el)
    return () => { observer.disconnect(); cancelAnimationFrame(frame) }
  }, [])
  // A finger on the grid scrolls the grid, and nowhere on the pane pans the
  // quiz underneath (Fortune-sheet's own touch scrolling did both badly).
  useSheetTouchScroll(gridRef, () => { tappedOn.current = focus.current })

  // ── The grid ──────────────────────────────────────────────────────────────
  const api = useRef<WorkbookInstance | null>(null)
  const rulesRef = useRef(rules)
  rulesRef.current = rules
  const saveTimer = useRef<ReturnType<typeof setTimeout> | null>(null)
  const pending = useRef<FortuneSheet[] | null>(null)
  const focus = useRef<{ row: number; column: number } | null>(null)

  const say = useCallback((text: string) => setNotice(text), [])
  useEffect(() => {
    if (!notice) return
    const t = setTimeout(() => setNotice(null), 6000)
    return () => clearTimeout(t)
  }, [notice])

  const publishSelection = useCallback((row: number, column: number, cell: { v?: unknown; m?: unknown } | null) => {
    focus.current = { row, column }
    setSelected({ questionId: question.id, address: cellAddress(row, column), value: shownValue(cell) })
  }, [question.id, setSelected])

  const hooks = useMemo(() => ({
    beforeUpdateCell: (_r: number, _c: number, value: unknown) => {
      if (rulesRef.current !== 'enforce' || typeof value !== 'string') return true
      const off = offListFunctions(value, allowed)
      if (!off.length) return true
      say(`${off.join(', ')} ${off.length === 1 ? 'isn’t' : 'aren’t'} in the ${profile.name} spreadsheet, so the formula wasn’t entered.`)
      return false
    },
    afterSelectionChange: (_sheetId: string, selection: { row: number[]; column: number[]; row_focus?: number; column_focus?: number }) => {
      const row = selection.row_focus ?? selection.row?.[0]
      const column = selection.column_focus ?? selection.column?.[0]
      if (row === undefined || column === undefined || !api.current) return
      const m = api.current.getCellValue(row, column, { type: 'm' })
      const v = api.current.getCellValue(row, column, { type: 'v' })
      if (onSelect.current(row, column) === 'pointed') return
      publishSelection(row, column, { m, v })
    },
  }), [allowed, profile.name, publishSelection, say])

  // ── The keypad ────────────────────────────────────────────────────────────
  // What the entry line holds, and the cell it belongs to. Fortune-sheet's
  // hooks read these, so they are refs as well as state.
  const [entry, setEntryState] = useState<Entry>(() => readyEntry(''))
  const entryRef = useRef(entry)
  const editCell = useRef<{ row: number; column: number } | null>(null)
  const keypadRef = useRef(keypadOn)
  keypadRef.current = keypadOn
  /** The selected cell when a tap began, to tell a tap on it from one elsewhere. */
  const tappedOn = useRef<{ row: number; column: number } | null>(null)

  const setEntry = useCallback((next: Entry) => {
    entryRef.current = next
    setEntryState(next)
  }, [])

  const contentOf = useCallback((row: number, column: number) => {
    const a = api.current
    return a ? cellContent(a.getCellValue(row, column, { type: 'f' }), a.getCellValue(row, column, { type: 'v' })) : ''
  }, [])

  /** Put what the entry line holds into its cell. */
  const enter = useCallback((e: Entry, cell: { row: number; column: number }) => {
    const a = api.current
    if (!a || e.mode !== 'edit') return
    const text = closeBrackets(e.text.trim())
    if (text === cellContent(a.getCellValue(cell.row, cell.column, { type: 'f' }), a.getCellValue(cell.row, cell.column, { type: 'v' }))) return
    if (text === '') { a.clearCell(cell.row, cell.column); return }
    if (text.startsWith('=')) { a.setCellValue(cell.row, cell.column, text); return }
    // A plain value. Fortune-sheet recalculates the formulas that use a cell
    // only when it is entered as a formula, so it goes in as one first.
    a.clearCell(cell.row, cell.column)
    a.setCellValue(cell.row, cell.column, valueAsFormula(text))
    a.clearCell(cell.row, cell.column)
    a.setCellValue(cell.row, cell.column, text)
  }, [])

  // A cell selected while the keypad is open: a formula waiting for an
  // argument takes its address; otherwise what was typed is entered and the
  // new cell is ready.
  const onSelect = useRef<(row: number, column: number) => 'pointed' | void>(() => {})
  onSelect.current = (row, column) => {
    if (!keypadRef.current) return
    const cell = editCell.current
    const e = entryRef.current
    const moved = !cell || cell.row !== row || cell.column !== column
    if (!moved) return
    if (cell && isPointing(e)) {
      setEntry(pointAt(e, cellAddress(row, column)))
      // Fortune-sheet is mid-update here; put the selection back after it.
      setTimeout(() => api.current?.setSelection(cellSelection(cell.row, cell.column)))
      return 'pointed'
    }
    if (cell && e.mode === 'edit') setTimeout(() => enter(e, cell))
    editCell.current = { row, column }
    setEntry(readyEntry(contentOf(row, column)))
  }

  /** Open the keypad on the selected cell, editing what is in it. */
  const editSelected = useCallback(() => {
    const cell = focus.current
    if (!cell) return
    editCell.current = { ...cell }
    setEntry(editEntry(contentOf(cell.row, cell.column)))
    setKeypad(true)
  }, [contentOf, setEntry])

  // A second tap on the selected cell edits it — on a phone in the keypad,
  // on a wider touch screen in the grid's own editor.
  useEffect(() => {
    const el = gridRef.current
    if (!el) return
    function onClick(e: MouseEvent) {
      const before = tappedOn.current
      tappedOn.current = null
      const now = focus.current
      if (!before || !now || before.row !== now.row || before.column !== now.column) return
      if (!(e.target as Element).closest('.fortune-cell-area')) return
      if (narrow) {
        const cell = editCell.current
        const editingHere = keypadRef.current && entryRef.current.mode === 'edit' && cell?.row === now.row && cell?.column === now.column
        if (!editingHere) editSelected()
      } else {
        e.target?.dispatchEvent(new MouseEvent('dblclick', { bubbles: true, clientX: e.clientX, clientY: e.clientY, screenX: e.screenX, screenY: e.screenY }))
      }
    }
    el.addEventListener('click', onClick)
    return () => el.removeEventListener('click', onClick)
  }, [narrow, editSelected])

  function keypadType(text: string) {
    if (!editCell.current) editCell.current = focus.current && { ...focus.current }
    if (!editCell.current) return
    setEntry(typeInto(entryRef.current, text))
  }

  function keypadFunction(name: string) {
    if (!editCell.current) editCell.current = focus.current && { ...focus.current }
    if (!editCell.current) return
    setEntry(typeFunction(entryRef.current, name))
  }

  function keypadKey(action: NonNullable<KeypadKey['action']>) {
    const cell = editCell.current ?? focus.current
    if (!cell) return
    if (action === 'backspace') {
      editCell.current = { ...cell }
      setEntry(backspace(entryRef.current))
      return
    }
    enter(entryRef.current, cell)
    // Ready before the move, so the move enters nothing twice.
    setEntry(readyEntry(''))
    const next = action === 'down' ? { row: cell.row + 1, column: cell.column } : { row: cell.row, column: cell.column + 1 }
    api.current?.setSelection(cellSelection(next.row, next.column))
  }

  function hideKeypad() {
    const cell = editCell.current
    if (cell) enter(entryRef.current, cell)
    setEntry(readyEntry(''))
    editCell.current = null
    setTyping(false)
    setKeypad(false)
  }

  // The keypad trades the grid's toolbar and formula bar for its entry line
  // (index.css — hidden, not unmounted: toggling Workbook's showToolbar or
  // showFormulaBar hangs Fortune-sheet). It re-measures only on a resize.
  useEffect(() => {
    const frame = requestAnimationFrame(() => window.dispatchEvent(new Event('resize')))
    return () => cancelAnimationFrame(frame)
  }, [keypadOn, typing])

  // With the phone's keyboard up, sit the pane on top of it rather than under it.
  const [keyboardInset, setKeyboardInset] = useState(0)
  useEffect(() => {
    const vv = window.visualViewport
    if (!keypadOn || !typing || !vv) { setKeyboardInset(0); return }
    const measure = () => setKeyboardInset(Math.max(0, window.innerHeight - vv.height - vv.offsetTop))
    measure()
    vv.addEventListener('resize', measure)
    vv.addEventListener('scroll', measure)
    return () => { vv.removeEventListener('resize', measure); vv.removeEventListener('scroll', measure) }
  }, [keypadOn, typing])

  // Flush the last edit when the question changes or the pane closes.
  useEffect(() => () => {
    if (saveTimer.current) clearTimeout(saveTimer.current)
    if (pending.current) onWorkbookChange(question.id, JSON.stringify(fromFortune(pending.current)))
  }, [question.id, onWorkbookChange])

  // A new question's grid starts with nothing selected.
  useEffect(() => {
    setSelected(null)
    focus.current = null
    editCell.current = null
    setEntry(readyEntry(''))
  }, [question.id, resetCount, setSelected, setEntry])

  function onChange(sheets: unknown) {
    pending.current = sheets as FortuneSheet[]
    // Keep the selected cell's value current as formulas recalculate.
    const f = focus.current
    const data = (sheets as FortuneSheet[])[0]?.data
    if (f && data) publishSelection(f.row, f.column, data[f.row]?.[f.column] ?? null)
    if (saveTimer.current) clearTimeout(saveTimer.current)
    saveTimer.current = setTimeout(() => {
      if (!pending.current) return
      const file = fromFortune(pending.current)
      pending.current = null
      setCurrent(file)
      onWorkbookChange(question.id, JSON.stringify(file))
    }, 400)
  }

  // Enforce: the function keys do nothing, as on exam day.
  const paneRef = useRef<HTMLDivElement>(null)
  useContainTouches(paneRef)
  useEffect(() => {
    if (rules !== 'enforce' || profile.functionKeys) return
    function onKey(e: KeyboardEvent) {
      if (!isBlockedFunctionKey(e.key)) return
      if (!paneRef.current?.contains(document.activeElement)) return
      e.preventDefault()
      e.stopPropagation()
      say('Function keys don’t work in the exam-day spreadsheet.')
    }
    window.addEventListener('keydown', onKey, true)
    return () => window.removeEventListener('keydown', onKey, true)
  }, [rules, profile.functionKeys, say])

  function chooseRules(next: SheetRules) {
    setRules(next)
    saveSheetRules(mode, next)
    setMenuOpen(false)
  }

  function showFlagged() {
    if (!flagged.length || !api.current) return
    const cell = flagged[flagIndex % flagged.length]
    api.current.setSelection(cellSelection(cell.row, cell.column))
    setFlagIndex(i => i + 1)
  }

  function reset() {
    if (saveTimer.current) clearTimeout(saveTimer.current)
    pending.current = null
    onWorkbookChange(question.id, null)
    setConfirmReset(false)
    setResetCount(n => n + 1)
  }

  function download() {
    const file = pending.current ? fromFortune(pending.current) : current
    downloadWorkbook(`${question.id}.xlsx`, toXlsxSheets(file))
  }

  // Close the rules menu on an outside press.
  const menuRef = useRef<HTMLDivElement>(null)
  useEffect(() => {
    if (!menuOpen) return
    function onDown(e: PointerEvent) {
      if (!menuRef.current?.contains(e.target as Node)) setMenuOpen(false)
    }
    document.addEventListener('pointerdown', onDown)
    return () => document.removeEventListener('pointerdown', onDown)
  }, [menuOpen])

  // ── Frame ─────────────────────────────────────────────────────────────────
  const frameStyle = view === 'popped'
    ? { left: rect.x, top: rect.y, width: rect.width, height: rect.height }
    : narrow
      ? {
          // The keypad needs room above it for the grid.
          height: keypadOn ? Math.max(dockHeight, Math.min(Math.round(window.innerHeight * 0.75), 580)) : dockHeight,
          bottom: keyboardInset || undefined,
        }
      : { width: dockWidth }

  function dragWindow(e: ReactPointerEvent) {
    if ((e.target as HTMLElement).closest('button')) return
    const start = rect
    let last = start
    startDrag(e, (dx, dy) => {
      last = clampWindowRect({ ...start, x: start.x + dx, y: start.y + dy }, viewport())
      setRect(last)
    }, () => write(WINDOW_KEY, last))
  }

  function resizeWindow(e: ReactPointerEvent) {
    const start = rect
    let last = start
    startDrag(e, (dx, dy) => {
      last = clampWindowRect({ ...start, width: start.width + dx, height: start.height + dy }, viewport())
      setRect(last)
    }, () => write(WINDOW_KEY, last))
  }

  function resizeDock(e: ReactPointerEvent) {
    if (narrow) {
      const start = dockHeight
      let last = start
      startDrag(e, (_dx, dy) => { last = clampDockHeight(start - dy, viewport()); setDockHeight(last) }, () => write(DOCK_HEIGHT_KEY, String(last)))
    } else {
      const start = dockWidth
      let last = start
      startDrag(e, dx => { last = clampDockWidth(start - dx, viewport()); setDockWidth(last) }, () => write(DOCK_WIDTH_KEY, String(last)))
    }
  }

  const dot = rules === 'off' ? 'bg-muted-foreground' : rules === 'warn' ? 'bg-amber-500' : 'bg-[var(--exam-accent-vivid,hsl(var(--foreground)))]'
  const mine = selected?.questionId === question.id ? selected : null

  return (
    <div
      ref={paneRef}
      role="dialog"
      aria-label="Spreadsheet for this question"
      data-math-magnify="none"
      data-image-zoom="none"
      data-own-keys
      className={cn(
        'fixed z-40 flex flex-col overscroll-contain bg-background text-foreground',
        view === 'popped'
          ? 'rounded-xl border border-border shadow-2xl'
          : narrow
            ? 'inset-x-0 bottom-0 rounded-t-2xl border-t border-border shadow-[0_-12px_40px_rgba(0,0,0,0.25)]'
            : 'inset-y-0 right-0 border-l border-border',
      )}
      style={frameStyle}
    >
      {/* Resize handle: the left edge docked on the right, the top edge docked below. */}
      {view === 'docked' && (
        <div
          role="separator"
          aria-orientation={narrow ? 'horizontal' : 'vertical'}
          aria-label="Resize the spreadsheet"
          onPointerDown={resizeDock}
          className={cn(
            'absolute z-10 flex items-center justify-center touch-none',
            narrow ? 'inset-x-0 -top-1 h-5 cursor-ns-resize' : 'inset-y-0 -left-1.5 w-3 cursor-ew-resize',
          )}
        >
          <span className={cn('rounded-full bg-border', narrow ? 'mt-2 h-1.5 w-10' : 'h-10 w-1.5')} />
        </div>
      )}

      <header
        onPointerDown={view === 'popped' ? dragWindow : undefined}
        className={cn(
          'flex h-12 shrink-0 items-center gap-1 border-b border-border pl-3 pr-1.5',
          narrow && view === 'docked' && 'mt-2',
          view === 'popped' && 'cursor-move rounded-t-xl bg-muted/40 touch-none',
        )}
      >
        <SheetIcon className="h-4 w-4 shrink-0 text-[var(--exam-accent,currentColor)]" aria-hidden="true" />
        <span className="mr-1 truncate text-sm font-semibold">Spreadsheet</span>

        <div ref={menuRef} className="relative">
          <button
            type="button"
            onClick={() => setMenuOpen(o => !o)}
            aria-haspopup="menu"
            aria-expanded={menuOpen}
            className={cn(
              'inline-flex h-8 items-center gap-1.5 rounded-full border border-border px-2.5 text-xs font-medium hover:bg-muted',
              menuOpen && 'bg-muted',
            )}
          >
            <span className={cn('h-2 w-2 rounded-full', dot)} aria-hidden="true" />
            <span className="hidden sm:inline">{profile.name} ·</span>
            <span className="font-semibold">{SHEET_RULES_LABEL[rules]}</span>
            <ChevronDown className={cn('h-3.5 w-3.5 transition-transform', menuOpen && 'rotate-180')} aria-hidden="true" />
          </button>
          {menuOpen && (
            <div role="menu" className={cn(INK_MENU, 'absolute left-0 top-10 z-20 w-80')}>
              <p className={INK_MENU_HEADING}>Exam-day rules · {profile.name}</p>
              {SHEET_RULES.map(r => (
                <button
                  key={r}
                  type="button"
                  role="menuitemradio"
                  aria-checked={r === rules}
                  onClick={() => chooseRules(r)}
                  className={inkMenuItem(r === rules, 'items-start')}
                >
                  <span className="flex flex-col gap-0.5">
                    <span>{SHEET_RULES_LABEL[r]}</span>
                    <span className={cn('text-xs font-normal leading-snug', r === rules ? 'opacity-80' : 'text-muted-foreground')}>{DESCRIPTIONS[r]}</span>
                  </span>
                </button>
              ))}
              <a
                href={pearsonVue.source.page}
                target="_blank"
                rel="noreferrer"
                className="mt-1 flex items-center justify-between gap-2 border-t border-border px-3 pb-1.5 pt-2.5 text-xs text-muted-foreground hover:text-foreground"
              >
                <span>{allowed.size} functions on {profile.name}’s list</span>
                <ExternalLink className="h-3.5 w-3.5" aria-hidden="true" />
              </a>
            </div>
          )}
        </div>

        <div className="flex-1" />

        {confirmReset ? (
          <span className="flex items-center gap-1 text-xs">
            <span className="hidden text-muted-foreground sm:inline">Reset to the question’s tables?</span>
            <button type="button" onClick={reset} className="h-8 rounded-md px-2 font-semibold hover:bg-muted">Reset</button>
            <button type="button" onClick={() => setConfirmReset(false)} className="h-8 rounded-md px-2 hover:bg-muted">Cancel</button>
          </span>
        ) : (
          <>
            <IconButton label="Reset sheet" onClick={() => setConfirmReset(true)}><RotateCcw className="h-4 w-4" /></IconButton>
            <IconButton label="Download as .xlsx" onClick={download}><Download className="h-4 w-4" /></IconButton>
            {!narrow && (
              view === 'docked'
                ? <IconButton label="Pop out" onClick={() => setView('popped')}><ExternalLink className="h-4 w-4" /></IconButton>
                : <IconButton label="Dock beside the question" onClick={() => setView('docked')}><PanelRight className="h-4 w-4" /></IconButton>
            )}
            <IconButton label="Close spreadsheet" onClick={onClose}><X className="h-4 w-4" /></IconButton>
          </>
        )}
      </header>

      <div
        ref={gridRef}
        className={cn('question-sheet-grid relative min-h-0 flex-1 overflow-hidden', keypadOn && 'question-sheet-keypad')}
        style={{ colorScheme: 'light' }}
      >
        <Workbook
          key={`${question.id}:${resetCount}`}
          ref={api}
          data={initialData as never}
          lang="en"
          showFormulaBar
          showSheetTabs={!profile.singleSheet}
          hooks={hooks as never}
          onChange={onChange}
        />
      </div>

      {keypadOn && notice && (
        <p className="flex shrink-0 items-center gap-1.5 border-t border-border px-3 py-1.5 text-xs" aria-live="polite">
          <AlertTriangle className="h-3.5 w-3.5 shrink-0 text-amber-500" aria-hidden="true" />
          <span className="truncate">{notice}</span>
        </p>
      )}

      {keypadOn ? (
        <SheetKeypad
          address={editCell.current ? cellAddress(editCell.current.row, editCell.current.column) : mine?.address ?? null}
          entry={entry}
          functions={KEYPAD_FUNCTIONS.filter(name => rules === 'off' || allowed.has(name))}
          typing={typing}
          onType={keypadType}
          onFunction={keypadFunction}
          onKey={keypadKey}
          onEntry={(text, caret) => {
            if (!editCell.current) editCell.current = focus.current && { ...focus.current }
            setEntry({ text, caret, mode: 'edit', pointedAt: null })
          }}
          onTyping={setTyping}
          onHide={hideKeypad}
        />
      ) : (
      <footer className={cn('flex min-h-9 shrink-0 items-center justify-between gap-3 border-t border-border px-3 text-xs', view === 'popped' && 'rounded-b-xl')}>
        <span className="truncate text-muted-foreground">
          {mine ? <><span className="font-semibold text-foreground">{mine.address}</span>{mine.value && <> · {mine.value}</>}</> : 'Select a cell to insert it into your answer'}
        </span>
        <span className="flex min-w-0 items-center gap-2" aria-live="polite">
          {notice ? (
            <span className="flex items-center gap-1.5 truncate text-foreground">
              <AlertTriangle className="h-3.5 w-3.5 shrink-0 text-amber-500" aria-hidden="true" />
              <span className="truncate">{notice}</span>
            </span>
          ) : flagged.length > 0 ? (
            <>
              <span className="flex items-center gap-1.5 truncate text-amber-700 dark:text-amber-300">
                <AlertTriangle className="h-3.5 w-3.5 shrink-0" aria-hidden="true" />
                <span className="truncate">
                  {flagged.length === 1
                    ? `${flagged[0].address} uses ${flagged[0].functions.join(', ')}, which ${profile.name} doesn’t have`
                    : `${flagged.length} cells use functions ${profile.name} doesn’t have`}
                </span>
              </span>
              <button type="button" onClick={showFlagged} className="shrink-0 font-semibold underline-offset-2 hover:underline">Show</button>
            </>
          ) : rules === 'off' ? (
            <span className="text-muted-foreground">Exam-day checks off</span>
          ) : null}
          {narrow && (
            <button
              type="button"
              onClick={() => { editCell.current = focus.current && { ...focus.current }; setEntry(readyEntry(editCell.current ? contentOf(editCell.current.row, editCell.current.column) : '')); setKeypad(true) }}
              className="-mr-1.5 flex h-9 shrink-0 items-center gap-1.5 rounded-lg px-2 font-semibold hover:bg-muted"
            >
              <Calculator className="h-4 w-4" aria-hidden="true" />
              Keypad
            </button>
          )}
        </span>
      </footer>
      )}

      {view === 'popped' && (
        <div
          role="separator"
          aria-label="Resize the window"
          onPointerDown={resizeWindow}
          className="absolute bottom-0 right-0 h-5 w-5 cursor-nwse-resize touch-none"
        >
          <svg viewBox="0 0 20 20" className="h-full w-full text-muted-foreground" aria-hidden="true">
            <path d="M18 8 8 18M18 13l-5 5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
          </svg>
        </div>
      )}
    </div>
  )
}

function IconButton({ label, onClick, children }: { label: string; onClick: () => void; children: React.ReactNode }) {
  return (
    <button
      type="button"
      onClick={onClick}
      aria-label={label}
      title={label}
      className="flex h-9 w-9 items-center justify-center rounded-lg text-muted-foreground hover:bg-muted hover:text-foreground"
    >
      {children}
    </button>
  )
}
