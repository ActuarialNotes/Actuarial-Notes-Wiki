import { lazy, Suspense, useCallback, useEffect, useMemo, useRef, useState } from 'react'
import { Download, FileSpreadsheet, Loader2, Play, PlayCircle, Sheet, X } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { SegmentedControl } from '@/components/ui/SegmentedControl'
import { CodeEditor, type EditorLanguage } from './CodeEditor'
import { editorSelection } from './editorSelection'
import { DataGrid } from './DataGrid'
import { FileTree, type NewFileKind } from './FileTree'
import { ConsolePanel, PlotsPanel, StatusDot, VariablesPanel } from './RuntimePanels'
import { ProjectDialog } from './shared'
import { downloadWorkspaceFile, useFileUrl } from './projectFiles'
import { loadTabs, saveTabs } from './workspaceTabs'
import { fileText, usePcpaWorkspace, type WorkspaceFile } from '@/hooks/usePcpaWorkspace'
import { useProjectRuntime } from '@/hooks/useProjectRuntime'
import { useIsMobile } from '@/hooks/useIsMobile'
import { fileKind, isDataPath, normalizePath, type ProjectAttempt } from '@/lib/pcpaAttempt'
import { emptySheetFile, fromCsv, parseSheetFile, sheetToCsv, SHEET_ROW_LIMIT, toXlsxSheets } from '@/lib/project/sheetFile'
import { downloadWorkbook } from '@/lib/xlsx'
import { LANGUAGE_LABEL, type RuntimeLanguage } from '@/lib/project/runtimeTypes'
import { cn } from '@/lib/utils'

const SpreadsheetEditor = lazy(() => import('./SpreadsheetEditor'))

/**
 * The workspace — an IDE in the shape R and Python users already work in:
 * files on the left, the editor over the console in the middle, plots and
 * variables on the right (RStudio's four panes). Below `lg` it is one pane at a
 * time, switched from a row above it.
 *
 * Every file kind opens in the editor that suits it: scripts in a code editor
 * with run keys, CSVs in a data viewer, `.sheet` files in the spreadsheet,
 * images as images.
 */

type BottomTab = 'console' | 'plots' | 'variables'
type MobilePane = 'files' | 'editor' | 'console' | 'plots'

const NEW_FILE: Record<NewFileKind, { folder: string; base: string; ext: string; label: string }> = {
  r: { folder: 'code', base: 'untitled', ext: 'R', label: 'New R script' },
  python: { folder: 'code', base: 'untitled', ext: 'py', label: 'New Python script' },
  sheet: { folder: 'sheets', base: 'Book', ext: 'sheet', label: 'New spreadsheet' },
  markdown: { folder: 'code', base: 'notes', ext: 'md', label: 'New Markdown note' },
}

function editorLanguage(path: string): EditorLanguage {
  const kind = fileKind(path)
  return kind === 'r' ? 'r' : kind === 'python' ? 'python' : kind === 'markdown' ? 'markdown' : 'text'
}

const SPLIT_KEY = 'pcpa.split'

function loadSplit(): number {
  const n = Number(localStorage.getItem(SPLIT_KEY))
  return Number.isFinite(n) && n > 0.2 && n < 0.85 ? n : 0.6
}

export function WorkspaceView({ attempt }: { attempt: ProjectAttempt }) {
  const filesMap = usePcpaWorkspace(s => s.files)
  const write = usePcpaWorkspace(s => s.write)
  const remove = usePcpaWorkspace(s => s.remove)
  const rename = usePcpaWorkspace(s => s.rename)
  const run = useProjectRuntime(s => s.run)
  const note = useProjectRuntime(s => s.note)
  const rStatus = useProjectRuntime(s => s.r.status)
  const pyStatus = useProjectRuntime(s => s.python.status)
  const plotCount = useProjectRuntime(s => s.plots.length)
  const files = useMemo(() => Object.values(filesMap), [filesMap])

  const [tabs, setTabs] = useState(() => loadTabs(attempt.id))
  const [consoleLang, setConsoleLang] = useState<RuntimeLanguage>(attempt.language)
  const [bottom, setBottom] = useState<BottomTab>('console')
  const [side, setSide] = useState<'plots' | 'variables'>('plots')
  const [pane, setPane] = useState<MobilePane>('editor')
  const [split, setSplit] = useState(loadSplit)
  const [dialog, setDialog] = useState<null | { mode: 'new'; kind: NewFileKind } | { mode: 'rename' | 'delete'; path: string }>(null)
  const [name, setName] = useState('')
  const [nameError, setNameError] = useState<string | null>(null)
  const center = useRef<HTMLDivElement>(null)
  const editorHost = useRef<HTMLDivElement>(null)
  const wide = !useIsMobile(1279)
  const narrow = useIsMobile(1023)

  // Open the starter script the first time; drop tabs whose file is gone.
  useEffect(() => {
    setTabs(t => {
      const open = t.open.filter(p => filesMap[p])
      if (open.length === 0) {
        const starter = files.find(f => f.path.startsWith('code/') && ['r', 'python'].includes(fileKind(f.path)))
        return starter ? { open: [starter.path], active: starter.path } : { open: [], active: null }
      }
      return { open, active: t.active && filesMap[t.active] ? t.active : open[open.length - 1] }
    })
  }, [filesMap, files])

  useEffect(() => { saveTabs(attempt.id, tabs) }, [tabs, attempt.id])

  useEffect(() => {
    try { localStorage.setItem(SPLIT_KEY, String(split)) } catch { /* quota */ }
  }, [split])

  // At `xl` the plots and variables have their own column.
  useEffect(() => { if (wide && bottom !== 'console') setBottom('console') }, [wide, bottom])
  // A new plot is worth seeing.
  const firstPlotRender = useRef(true)
  useEffect(() => {
    if (firstPlotRender.current) { firstPlotRender.current = false; return }
    if (plotCount === 0) return
    if (wide) setSide('plots')
    else if (!narrow) setBottom('plots')
  }, [plotCount, wide, narrow])

  const open = useCallback((path: string) => {
    setTabs(t => ({ open: t.open.includes(path) ? t.open : [...t.open, path], active: path }))
    setPane('editor')
  }, [])

  const close = (path: string) => {
    setTabs(t => {
      const openList = t.open.filter(p => p !== path)
      return { open: openList, active: t.active === path ? openList[openList.length - 1] ?? null : t.active }
    })
  }

  const active = tabs.active ? filesMap[tabs.active] : undefined

  async function runCode(language: RuntimeLanguage, code: string, mode: 'source' | 'selection', path: string) {
    setConsoleLang(language)
    if (!wide) setBottom('console')
    if (narrow) setPane('console')
    await usePcpaWorkspace.getState().flush()
    await run(language, code, mode, path)
  }

  function uniquePath(folder: string, base: string, ext: string): string {
    let candidate = `${folder}/${base}.${ext}`
    for (let n = 2; filesMap[candidate]; n++) candidate = `${folder}/${base}-${n}.${ext}`
    return candidate
  }

  function openDialog(next: NonNullable<typeof dialog>) {
    setNameError(null)
    if (next.mode === 'new') {
      const spec = NEW_FILE[next.kind]
      setName(uniquePath(spec.folder, spec.base, spec.ext))
    } else if (next.mode === 'rename') {
      setName(next.path)
    }
    setDialog(next)
  }

  function confirmDialog() {
    if (!dialog) return
    if (dialog.mode === 'delete') {
      remove(dialog.path)
      close(dialog.path)
      setDialog(null)
      return
    }
    const path = normalizePath(name)
    if (!path) return setNameError('Enter a file name inside the project.')
    if (isDataPath(path)) return setNameError('data/ holds the project\'s data sets and is read-only.')
    if (filesMap[path]) return setNameError('A file with that name already exists.')
    if (dialog.mode === 'new') {
      const expected = NEW_FILE[dialog.kind].ext.toLowerCase()
      if (!path.toLowerCase().endsWith(`.${expected}`)) return setNameError(`The name should end in .${NEW_FILE[dialog.kind].ext}.`)
      const content = dialog.kind === 'sheet' ? JSON.stringify(emptySheetFile())
        : dialog.kind === 'r' ? '# R script\n\n'
          : dialog.kind === 'python' ? '# Python script\n\n'
            : ''
      write(path, content)
      open(path)
    } else if (rename(dialog.path, path)) {
      setTabs(t => ({ open: t.open.map(p => (p === dialog.path ? path : p)), active: t.active === dialog.path ? path : t.active }))
    } else {
      return setNameError('That file can\'t be renamed there.')
    }
    setDialog(null)
  }

  async function upload(list: FileList) {
    for (const f of Array.from(list)) {
      const kind = fileKind(f.name)
      const folder = kind === 'r' || kind === 'python' || f.name.toLowerCase().endsWith('.sas') ? 'code' : 'uploads'
      const path = uniquePath(folder, f.name.replace(/\.[^.]+$/, '').replace(/[^\w.-]+/g, '_'), f.name.split('.').pop() ?? 'txt')
      write(path, new Uint8Array(await f.arrayBuffer()))
    }
  }

  function openInSheet(csvPath: string) {
    const file = filesMap[csvPath]
    if (!file) return
    const base = csvPath.split('/').pop()!.replace(/\.csv$/i, '')
    const existing = `sheets/${base}.sheet`
    if (filesMap[existing]) return open(existing)
    const { file: sheet, truncated } = fromCsv(fileText(file), base)
    write(existing, JSON.stringify(sheet))
    open(existing)
    if (truncated > 0) {
      note(consoleLang, `The spreadsheet holds the first ${SHEET_ROW_LIMIT.toLocaleString('en-US')} rows of ${csvPath}; ${truncated.toLocaleString('en-US')} were left out. Use R or Python for the full data.`)
    }
  }

  function exportSheet(file: WorkspaceFile) {
    const book = parseSheetFile(fileText(file))
    const base = file.path.split('/').pop()!.replace(/\.sheet$/, '')
    for (const sheet of book.sheets) {
      const suffix = book.sheets.length > 1 ? `-${sheet.name.replace(/[^\w-]+/g, '_')}` : ''
      write(`output/${base}${suffix}.csv`, sheetToCsv(sheet))
    }
  }

  function beginDrag(e: React.PointerEvent) {
    const host = center.current
    if (!host) return
    e.preventDefault()
    const rect = host.getBoundingClientRect()
    const move = (ev: PointerEvent) => setSplit(Math.min(0.85, Math.max(0.2, (ev.clientY - rect.top) / rect.height)))
    const up = () => {
      window.removeEventListener('pointermove', move)
      window.removeEventListener('pointerup', up)
    }
    window.addEventListener('pointermove', move)
    window.addEventListener('pointerup', up)
  }

  const editor = (
    <div className="flex h-full min-h-0 flex-col bg-card">
      <div className="flex shrink-0 items-stretch overflow-x-auto border-b border-border" role="tablist" aria-label="Open files">
        {tabs.open.map(path => (
          <div
            key={path}
            className={cn(
              'group flex shrink-0 items-center gap-1 border-r border-border pl-3 pr-1 text-xs',
              tabs.active === path ? 'bg-background font-medium text-foreground' : 'text-muted-foreground hover:text-foreground',
            )}
          >
            <button type="button" role="tab" aria-selected={tabs.active === path} onClick={() => setTabs(t => ({ ...t, active: path }))} className="py-2" title={path}>
              {path.split('/').pop()}
            </button>
            <button type="button" aria-label={`Close ${path}`} onClick={() => close(path)} className="flex h-5 w-5 items-center justify-center rounded opacity-60 hover:bg-accent hover:opacity-100">
              <X className="h-3 w-3" />
            </button>
          </div>
        ))}
      </div>
      {active ? (
        <FileEditor
          key={active.path}
          file={active}
          hostRef={editorHost}
          rStatus={rStatus}
          pyStatus={pyStatus}
          onRun={(language, code, mode) => void runCode(language, code, mode, active.path)}
          onChange={text => write(active.path, text)}
          onOpenInSheet={() => openInSheet(active.path)}
          onExportSheet={() => exportSheet(active)}
        />
      ) : (
        <div className="flex flex-1 items-center justify-center p-8 text-center text-sm text-muted-foreground">
          Open a file from the list, or create one with New.
        </div>
      )}
    </div>
  )

  const consoleTabs = (
    <div className="flex shrink-0 items-center gap-0.5 border-b border-border bg-muted/40 px-1 text-xs" role="tablist" aria-label="Session panes">
      {(['r', 'python'] as const).map(lang => (
        <button
          key={lang}
          type="button"
          role="tab"
          aria-selected={bottom === 'console' && consoleLang === lang}
          onClick={() => { setBottom('console'); setConsoleLang(lang) }}
          className={cn('flex items-center gap-1.5 rounded-md px-2.5 py-1.5', bottom === 'console' && consoleLang === lang ? 'bg-background font-medium shadow-sm' : 'text-muted-foreground hover:text-foreground')}
        >
          <StatusDot status={lang === 'r' ? rStatus : pyStatus} /> {LANGUAGE_LABEL[lang]} console
        </button>
      ))}
      {!wide && (['plots', 'variables'] as const).map(tab => (
        <button
          key={tab}
          type="button"
          role="tab"
          aria-selected={bottom === tab}
          onClick={() => setBottom(tab)}
          className={cn('rounded-md px-2.5 py-1.5 capitalize', bottom === tab ? 'bg-background font-medium shadow-sm' : 'text-muted-foreground hover:text-foreground')}
        >
          {tab}{tab === 'plots' && plotCount ? ` (${plotCount})` : ''}
        </button>
      ))}
    </div>
  )

  const bottomBody = bottom === 'console' ? <ConsolePanel key={consoleLang} language={consoleLang} />
    : bottom === 'plots' ? <PlotsPanel /> : <VariablesPanel language={consoleLang} />

  const tree = (
    <FileTree
      files={files}
      activePath={tabs.active}
      onOpen={open}
      onNew={kind => openDialog({ mode: 'new', kind })}
      onUpload={list => void upload(list)}
      onRename={path => openDialog({ mode: 'rename', path })}
      onDelete={path => openDialog({ mode: 'delete', path })}
      onDownload={path => filesMap[path] && downloadWorkspaceFile(filesMap[path])}
      onOpenInSheet={openInSheet}
    />
  )

  return (
    <div className="flex h-full min-h-0 flex-col">
      {narrow && (
        <div className="shrink-0 border-b border-border px-3 py-2">
          <SegmentedControl<MobilePane>
            size="sm"
            label="Workspace pane"
            value={pane}
            onChange={setPane}
            options={[
              { value: 'files', label: 'Files' },
              { value: 'editor', label: 'Editor' },
              { value: 'console', label: 'Console' },
              { value: 'plots', label: plotCount ? `Plots (${plotCount})` : 'Plots' },
            ]}
          />
        </div>
      )}
      <div className="flex min-h-0 flex-1">
        {(!narrow || pane === 'files') && (
          <aside className={cn('flex min-h-0 flex-col border-r border-border bg-card', narrow ? 'w-full' : 'w-56 shrink-0')}>{tree}</aside>
        )}
        {narrow ? (
          pane === 'editor' ? <section className="min-h-0 min-w-0 flex-1">{editor}</section>
            : pane === 'console' ? (
              <section className="flex min-h-0 min-w-0 flex-1 flex-col bg-card">
                {consoleTabs}
                <div className="min-h-0 flex-1">{bottom === 'plots' ? <ConsolePanel language={consoleLang} /> : bottomBody}</div>
              </section>
            )
              : pane === 'plots' ? <section className="min-h-0 min-w-0 flex-1 bg-card"><PlotsPanel /></section> : null
        ) : (
          <section ref={center} className="flex min-h-0 min-w-0 flex-1 flex-col">
            <div style={{ height: `${split * 100}%` }} className="min-h-0">{editor}</div>
            <div
              role="separator"
              aria-orientation="horizontal"
              aria-label="Resize editor and console"
              onPointerDown={beginDrag}
              className="h-1.5 shrink-0 cursor-row-resize bg-border/60 hover:bg-primary/30"
            />
            <div className="flex min-h-0 flex-1 flex-col bg-card">
              {consoleTabs}
              <div className="min-h-0 flex-1">{bottomBody}</div>
            </div>
          </section>
        )}
        {wide && (
          <aside className="flex w-[24rem] shrink-0 flex-col border-l border-border bg-card">
            <div className="flex shrink-0 items-center gap-0.5 border-b border-border bg-muted/40 px-1 text-xs" role="tablist" aria-label="Session views">
              {(['plots', 'variables'] as const).map(tab => (
                <button
                  key={tab}
                  type="button"
                  role="tab"
                  aria-selected={side === tab}
                  onClick={() => setSide(tab)}
                  className={cn('rounded-md px-2.5 py-1.5 capitalize', side === tab ? 'bg-background font-medium shadow-sm' : 'text-muted-foreground hover:text-foreground')}
                >
                  {tab === 'variables' ? `${LANGUAGE_LABEL[consoleLang]} variables` : `Plots${plotCount ? ` (${plotCount})` : ''}`}
                </button>
              ))}
            </div>
            <div className="min-h-0 flex-1">{side === 'plots' ? <PlotsPanel /> : <VariablesPanel language={consoleLang} />}</div>
          </aside>
        )}
      </div>

      {dialog && (
        <ProjectDialog
          title={dialog.mode === 'new' ? NEW_FILE[dialog.kind].label : dialog.mode === 'rename' ? 'Rename file' : 'Delete file?'}
          onClose={() => setDialog(null)}
          footer={<>
            <Button variant="outline" size="sm" onClick={() => setDialog(null)}>Cancel</Button>
            <Button variant={dialog.mode === 'delete' ? 'destructive' : 'default'} size="sm" onClick={confirmDialog}>
              {dialog.mode === 'new' ? 'Create' : dialog.mode === 'rename' ? 'Rename' : 'Delete'}
            </Button>
          </>}
        >
          {dialog.mode === 'delete' ? (
            <p className="text-sm text-muted-foreground"><span className="font-mono text-foreground">{dialog.path}</span> will be removed from the project. This can't be undone.</p>
          ) : (
            <form onSubmit={e => { e.preventDefault(); confirmDialog() }} className="space-y-2">
              <Input value={name} onChange={e => { setName(e.target.value); setNameError(null) }} autoFocus aria-label="File path" className="font-mono text-sm" />
              {nameError && <p className="text-xs text-destructive">{nameError}</p>}
            </form>
          )}
        </ProjectDialog>
      )}
    </div>
  )
}

function FileEditor({
  file,
  hostRef,
  rStatus,
  pyStatus,
  onRun,
  onChange,
  onOpenInSheet,
  onExportSheet,
}: {
  file: WorkspaceFile
  hostRef: React.RefObject<HTMLDivElement>
  rStatus: string
  pyStatus: string
  onRun: (language: RuntimeLanguage, code: string, mode: 'source' | 'selection') => void
  onChange: (text: string) => void
  onOpenInSheet: () => void
  onExportSheet: () => void
}) {
  const kind = fileKind(file.path)
  const url = useFileUrl(file)
  const language: RuntimeLanguage | null = kind === 'r' ? 'r' : kind === 'python' ? 'python' : null
  const busy = language ? (language === 'r' ? rStatus : pyStatus) === 'busy' : false
  const text = kind === 'image' || kind === 'binary' ? '' : fileText(file)

  const toolbarButton = 'flex h-8 items-center gap-1.5 rounded-md px-2.5 text-xs font-medium hover:bg-accent disabled:opacity-40'

  return (
    <div className="flex min-h-0 flex-1 flex-col">
      <div className="flex shrink-0 items-center gap-1 border-b border-border px-2 py-1">
        {language && (
          <>
            <button
              type="button"
              className={toolbarButton}
              disabled={busy}
              onClick={() => {
                const code = editorSelection(hostRef.current)
                if (code?.trim()) onRun(language, code, 'selection')
              }}
              title="Run the current line or selection (Ctrl/⌘ + Enter)"
            >
              <Play className="h-3.5 w-3.5" /> Run
            </button>
            <button
              type="button"
              className={toolbarButton}
              disabled={busy}
              onClick={() => onRun(language, text, 'source')}
              title="Run the whole file (Ctrl/⌘ + Shift + Enter)"
            >
              <PlayCircle className="h-3.5 w-3.5" /> {language === 'r' ? 'Source' : 'Run file'}
            </button>
            {busy && <Loader2 className="h-3.5 w-3.5 animate-spin text-muted-foreground" aria-label="Running" />}
          </>
        )}
        {kind === 'csv' && (
          <button type="button" className={toolbarButton} onClick={onOpenInSheet} title="Open a copy of this data set in the spreadsheet">
            <FileSpreadsheet className="h-3.5 w-3.5" /> Open in spreadsheet
          </button>
        )}
        {kind === 'sheet' && (
          <>
            <button type="button" className={toolbarButton} onClick={onExportSheet} title="Write each sheet's values to output/ as CSV, where it can be an appendix table">
              <Sheet className="h-3.5 w-3.5" /> Export to output/
            </button>
            <button type="button" className={toolbarButton} onClick={() => downloadWorkbook(`${file.path.split('/').pop()!.replace(/\.sheet$/, '')}.xlsx`, toXlsxSheets(parseSheetFile(text)))}>
              <Download className="h-3.5 w-3.5" /> .xlsx
            </button>
          </>
        )}
        <span className="min-w-0 flex-1 truncate px-2 text-right font-mono text-xs text-muted-foreground">{file.path}{file.readOnly ? ' · read-only' : ''}</span>
        <button type="button" aria-label="Download file" onClick={() => downloadWorkspaceFile(file)} className="flex h-8 w-8 items-center justify-center rounded-md text-muted-foreground hover:bg-accent hover:text-foreground">
          <Download className="h-3.5 w-3.5" />
        </button>
      </div>
      <div ref={hostRef} className="min-h-0 flex-1">
        {kind === 'csv' ? (
          <DataGrid text={text} label={file.path} />
        ) : kind === 'sheet' ? (
          <Suspense fallback={<div className="flex items-center gap-2 p-6 text-sm text-muted-foreground"><Loader2 className="h-4 w-4 animate-spin" /> Loading the spreadsheet…</div>}>
            <SpreadsheetEditor text={text} onChange={onChange} readOnly={file.readOnly} />
          </Suspense>
        ) : kind === 'image' ? (
          <div className="flex h-full items-center justify-center overflow-auto bg-white p-4">
            {url && <img src={url} alt={file.path} className="max-h-full max-w-full object-contain" data-zoomable="" />}
          </div>
        ) : kind === 'binary' ? (
          <div className="p-6 text-sm text-muted-foreground">This file can't be shown here. Download it to open it elsewhere.</div>
        ) : (
          <CodeEditor
            value={text}
            language={editorLanguage(file.path)}
            readOnly={file.readOnly}
            wrap={kind === 'markdown' || kind === 'text'}
            onChange={onChange}
            onRunSelection={language ? code => onRun(language, code, 'selection') : undefined}
            onRunFile={language ? () => onRun(language, fileText(usePcpaWorkspace.getState().files[file.path] ?? file), 'source') : undefined}
            ariaLabel={`Editor: ${file.path}`}
          />
        )}
      </div>
    </div>
  )
}
