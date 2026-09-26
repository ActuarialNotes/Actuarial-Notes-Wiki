import { useEffect, useRef, useState } from 'react'
import { ChevronLeft, ChevronRight, Download, Eraser, Loader2, Play, RotateCcw, Save, Square, Trash2 } from 'lucide-react'
import { useProjectRuntime, type ConsoleEntry, type RuntimeStatus } from '@/hooks/useProjectRuntime'
import { usePcpaWorkspace } from '@/hooks/usePcpaWorkspace'
import { downloadBlob } from '@/lib/xlsx'
import { LANGUAGE_LABEL, type RuntimeLanguage } from '@/lib/project/runtimeTypes'
import { cn } from '@/lib/utils'

const STATUS_DOT: Record<RuntimeStatus, string> = {
  off: 'bg-muted-foreground/40',
  loading: 'bg-amber-500 animate-pulse',
  ready: 'bg-green-500',
  busy: 'bg-amber-500 animate-pulse',
  error: 'bg-red-500',
}

export function StatusDot({ status }: { status: RuntimeStatus }) {
  return <span aria-hidden className={cn('inline-block h-2 w-2 shrink-0 rounded-full', STATUS_DOT[status])} />
}

const LINE_CLASS: Record<ConsoleEntry['kind'], string> = {
  input: 'text-sky-700 dark:text-sky-300',
  stdout: '',
  stderr: 'text-red-700 dark:text-red-300',
  message: 'text-muted-foreground',
  warning: 'text-amber-700 dark:text-amber-300',
  error: 'text-red-700 dark:text-red-300 font-medium',
  info: 'text-muted-foreground italic',
}

/**
 * The console for one language: everything a run printed, in order, and a
 * prompt to type at — Enter runs the line, ↑/↓ walk the history, as at any R
 * or Python prompt.
 */
export function ConsolePanel({ language }: { language: RuntimeLanguage }) {
  const state = useProjectRuntime(s => s[language])
  const run = useProjectRuntime(s => s.run)
  const restart = useProjectRuntime(s => s.restart)
  const start = useProjectRuntime(s => s.start)
  const clear = useProjectRuntime(s => s.clearConsole)
  const [input, setInput] = useState('')
  const history = useRef<string[]>([])
  const cursor = useRef(-1)
  const end = useRef<HTMLDivElement>(null)

  useEffect(() => {
    end.current?.scrollIntoView({ block: 'end' })
  }, [state.console.length])

  const busy = state.status === 'busy' || state.status === 'loading'

  function submit() {
    const code = input
    if (!code.trim() || busy) return
    history.current = [code, ...history.current.filter(h => h !== code)].slice(0, 100)
    cursor.current = -1
    setInput('')
    void run(language, code, 'selection', 'console')
  }

  return (
    <div className="flex h-full min-h-0 flex-col">
      <div className="flex shrink-0 items-center gap-1 border-b border-border px-2 py-1 text-xs">
        <StatusDot status={state.status} />
        <span className="min-w-0 flex-1 truncate text-muted-foreground" aria-live="polite">
          {state.progress || (state.status === 'off' ? `${LANGUAGE_LABEL[language]} is not running` : state.status === 'busy' ? 'Running…' : state.status === 'error' ? 'Failed to start' : 'Ready')}
        </span>
        {state.status === 'off' || state.status === 'error' ? (
          <button type="button" onClick={() => void start(language)} className="flex h-7 items-center gap-1 rounded-md px-2 font-medium hover:bg-accent">
            <Play className="h-3.5 w-3.5" /> Start {LANGUAGE_LABEL[language]}
          </button>
        ) : state.status === 'busy' ? (
          <button type="button" onClick={() => void restart(language)} className="flex h-7 items-center gap-1 rounded-md px-2 font-medium text-red-700 hover:bg-accent dark:text-red-300" title="Stop the run. The session restarts: variables are lost, files are kept.">
            <Square className="h-3.5 w-3.5" /> Stop
          </button>
        ) : (
          <button type="button" onClick={() => void restart(language)} className="flex h-7 items-center gap-1 rounded-md px-2 text-muted-foreground hover:bg-accent hover:text-foreground" title={`Restart ${LANGUAGE_LABEL[language]} with a clean session`}>
            <RotateCcw className="h-3.5 w-3.5" /> <span className="hidden sm:inline">Restart</span>
          </button>
        )}
        <button type="button" onClick={() => clear(language)} aria-label="Clear console" className="flex h-7 w-7 items-center justify-center rounded-md text-muted-foreground hover:bg-accent hover:text-foreground">
          <Eraser className="h-3.5 w-3.5" />
        </button>
      </div>
      <div className="min-h-0 flex-1 overflow-auto px-3 py-2 font-mono text-xs leading-relaxed" role="log" aria-label={`${LANGUAGE_LABEL[language]} console`}>
        {state.console.map(line => (
          <pre key={line.id} className={cn('whitespace-pre-wrap break-words', LINE_CLASS[line.kind])}>{line.text}</pre>
        ))}
        <div ref={end} />
      </div>
      <form
        onSubmit={e => { e.preventDefault(); submit() }}
        className="flex shrink-0 items-center gap-2 border-t border-border px-3 py-1.5 font-mono text-xs"
      >
        <span className="text-sky-700 dark:text-sky-300" aria-hidden>{language === 'r' ? '>' : '>>>'}</span>
        <input
          value={input}
          onChange={e => setInput(e.target.value)}
          onKeyDown={e => {
            if (e.key === 'ArrowUp' && history.current.length) {
              e.preventDefault()
              cursor.current = Math.min(history.current.length - 1, cursor.current + 1)
              setInput(history.current[cursor.current])
            } else if (e.key === 'ArrowDown') {
              e.preventDefault()
              cursor.current = Math.max(-1, cursor.current - 1)
              setInput(cursor.current < 0 ? '' : history.current[cursor.current])
            }
          }}
          placeholder={busy ? 'Running…' : `Type ${LANGUAGE_LABEL[language]} and press Enter`}
          aria-label={`${LANGUAGE_LABEL[language]} prompt`}
          spellCheck={false}
          autoCapitalize="off"
          autoCorrect="off"
          className="min-w-0 flex-1 bg-transparent outline-none placeholder:text-muted-foreground"
        />
        {busy && <Loader2 className="h-3.5 w-3.5 animate-spin text-muted-foreground" aria-hidden />}
      </form>
    </div>
  )
}

/**
 * The plots every run drew, newest last — RStudio's Plots pane. A plot lives
 * only in the session until it is saved to `output/`, where it becomes a
 * project file that can be attached to the report.
 */
export function PlotsPanel() {
  const plots = useProjectRuntime(s => s.plots)
  const removePlot = useProjectRuntime(s => s.removePlot)
  const write = usePcpaWorkspace(s => s.write)
  const files = usePcpaWorkspace(s => s.files)
  const [index, setIndex] = useState(plots.length - 1)
  const [saved, setSaved] = useState<Record<number, string>>({})

  // A new plot takes the pane, as it does in RStudio.
  useEffect(() => { setIndex(plots.length - 1) }, [plots.length])

  if (plots.length === 0) {
    return (
      <div className="flex h-full items-center justify-center p-6">
        <p className="max-w-xs text-center text-xs text-muted-foreground">
          Plots from R (<code className="font-mono">plot()</code>, ggplot2) and Python (matplotlib) appear here.
        </p>
      </div>
    )
  }
  const i = Math.max(0, Math.min(index, plots.length - 1))
  const plot = plots[i]

  function saveToOutput() {
    let n = 1
    while (files[`output/plot-${n}.png`]) n++
    const path = `output/plot-${n}.png`
    write(path, plot.bytes)
    setSaved(s => ({ ...s, [plot.id]: path }))
  }

  return (
    <div className="flex h-full min-h-0 flex-col">
      <div className="flex shrink-0 items-center gap-1 border-b border-border px-2 py-1 text-xs">
        <button type="button" aria-label="Previous plot" disabled={i === 0} onClick={() => setIndex(i - 1)} className="flex h-7 w-7 items-center justify-center rounded-md hover:bg-accent disabled:opacity-40">
          <ChevronLeft className="h-4 w-4" />
        </button>
        <span className="tabular-nums text-muted-foreground">{i + 1} / {plots.length}</span>
        <button type="button" aria-label="Next plot" disabled={i === plots.length - 1} onClick={() => setIndex(i + 1)} className="flex h-7 w-7 items-center justify-center rounded-md hover:bg-accent disabled:opacity-40">
          <ChevronRight className="h-4 w-4" />
        </button>
        <span className="min-w-0 flex-1 truncate text-muted-foreground">{LANGUAGE_LABEL[plot.language]} · {plot.source}</span>
        {saved[plot.id] ? (
          <span className="px-2 text-muted-foreground">Saved as {saved[plot.id]}</span>
        ) : (
          <button type="button" onClick={saveToOutput} className="flex h-7 items-center gap-1 rounded-md px-2 font-medium hover:bg-accent" title="Save this plot to output/ so it can be attached to the report">
            <Save className="h-3.5 w-3.5" /> Save
          </button>
        )}
        <button type="button" aria-label="Download plot" onClick={() => downloadBlob(`plot-${plot.id}.png`, new Blob([plot.bytes.slice().buffer as ArrayBuffer], { type: 'image/png' }))} className="flex h-7 w-7 items-center justify-center rounded-md text-muted-foreground hover:bg-accent hover:text-foreground">
          <Download className="h-3.5 w-3.5" />
        </button>
        <button type="button" aria-label="Remove plot" onClick={() => removePlot(plot.id)} className="flex h-7 w-7 items-center justify-center rounded-md text-muted-foreground hover:bg-accent hover:text-foreground">
          <Trash2 className="h-3.5 w-3.5" />
        </button>
      </div>
      <div className="flex min-h-0 flex-1 items-center justify-center overflow-auto bg-white p-2">
        <img src={plot.url} alt={`Plot ${i + 1} from ${plot.source}`} className="max-h-full max-w-full object-contain" data-zoomable="" />
      </div>
    </div>
  )
}

/** The session's variables — RStudio's Environment pane. */
export function VariablesPanel({ language }: { language: RuntimeLanguage }) {
  const variables = useProjectRuntime(s => s[language].variables)
  const status = useProjectRuntime(s => s[language].status)
  if (variables.length === 0) {
    return (
      <div className="flex h-full items-center justify-center p-6 text-center text-xs text-muted-foreground">
        {status === 'off' ? `Start ${LANGUAGE_LABEL[language]} to see its variables.` : 'No variables yet.'}
      </div>
    )
  }
  return (
    <div className="h-full min-h-0 overflow-auto">
      <table className="w-full text-xs">
        <thead className="sticky top-0 bg-muted text-left">
          <tr>
            <th className="px-3 py-1.5 font-semibold">Name</th>
            <th className="px-3 py-1.5 font-semibold">Type</th>
            <th className="px-3 py-1.5 font-semibold">Value</th>
          </tr>
        </thead>
        <tbody className="font-mono">
          {variables.map(v => (
            <tr key={v.name} className="border-t border-border/60">
              <td className="px-3 py-1 font-medium">{v.name}</td>
              <td className="px-3 py-1 text-muted-foreground">{v.type}</td>
              <td className="max-w-[12rem] truncate px-3 py-1" title={v.summary}>{v.summary}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}
