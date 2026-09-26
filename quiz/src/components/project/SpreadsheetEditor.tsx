import { useEffect, useMemo, useRef } from 'react'
import { Workbook } from '@fortune-sheet/react'
import '@fortune-sheet/react/dist/index.css'
import { fromFortune, parseSheetFile, toFortune, type FortuneSheet } from '@/lib/project/sheetFile'

/**
 * The workspace's spreadsheet: Fortune-sheet, an open-source (MIT) Excel-style
 * grid with a formula engine of several hundred Excel functions — SUMIFS,
 * AVERAGEIFS, VLOOKUP, CORREL, LINEST — sorting, filtering, number formats and
 * freeze panes. It is here for what a spreadsheet is good at on this project:
 * looking at the data, pivot-style summaries, exhibit tables. The model itself
 * is fitted in R or Python, as the CAS requires the submitted code to be.
 *
 * Loaded on demand (the page imports this lazily), since the grid is the
 * heaviest thing in the workspace. Saves are debounced: Fortune-sheet reports
 * every keystroke, and converting a large sheet is not free.
 */

export default function SpreadsheetEditor({
  text,
  onChange,
  readOnly = false,
}: {
  text: string
  onChange: (text: string) => void
  readOnly?: boolean
}) {
  // The workbook is seeded once per mount (`key={path}` on the caller); after
  // that Fortune-sheet owns the grid and reports changes back.
  // eslint-disable-next-line react-hooks/exhaustive-deps
  const initial = useMemo(() => toFortune(parseSheetFile(text)), [])
  const timer = useRef<ReturnType<typeof setTimeout> | null>(null)
  const latest = useRef<FortuneSheet[] | null>(null)
  const save = useRef(onChange)
  save.current = onChange

  useEffect(() => () => {
    if (timer.current) clearTimeout(timer.current)
    if (latest.current) save.current(JSON.stringify(fromFortune(latest.current)))
  }, [])

  return (
    <div className="pcpa-sheet h-full min-h-0 w-full" data-math-magnify="none">
      <Workbook
        data={initial as never}
        lang="en"
        allowEdit={!readOnly}
        showFormulaBar
        onChange={sheets => {
          if (readOnly) return
          latest.current = sheets as unknown as FortuneSheet[]
          if (timer.current) clearTimeout(timer.current)
          timer.current = setTimeout(() => {
            if (latest.current) save.current(JSON.stringify(fromFortune(latest.current)))
            latest.current = null
          }, 800)
        }}
      />
    </div>
  )
}
