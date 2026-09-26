import { create } from 'zustand'
import { fileBytes, usePcpaWorkspace } from '@/hooks/usePcpaWorkspace'
import { isRuntimeNoise, type ConsoleKind, type Runtime, type RunMode, type RuntimeLanguage, type VariableInfo } from '@/lib/project/runtimeTypes'

/**
 * The PCPA workspace's R and Python sessions (`docs/pcpa-project.md`): starting
 * them, running code in them, and keeping their file systems and the
 * workspace's files the same.
 *
 * The sync is what makes the two feel like one project folder. Before a run,
 * every workspace file the runtime hasn't seen at its current version is
 * written into it; after a run, every file the runtime created or changed is
 * read back into the workspace — so a plot saved with `png("output/lift.png")`
 * or `plt.savefig(...)` appears in the file tree, persists, and can become an
 * appendix. The CAS's data sets are the exception: a run can't overwrite them,
 * and the originals are put back.
 *
 * The runtimes themselves are module-level (a worker and a webR instance are not
 * state); the store holds what the UI draws.
 */

export type RuntimeStatus = 'off' | 'loading' | 'ready' | 'busy' | 'error'

export interface ConsoleEntry {
  id: number
  kind: ConsoleKind
  text: string
}

export interface Plot {
  id: number
  language: RuntimeLanguage
  url: string
  bytes: Uint8Array
  source: string
  createdAt: number
}

interface LanguageState {
  status: RuntimeStatus
  progress: string
  console: ConsoleEntry[]
  variables: VariableInfo[]
}

interface RuntimeStore {
  r: LanguageState
  python: LanguageState
  plots: Plot[]
  start: (language: RuntimeLanguage) => Promise<boolean>
  run: (language: RuntimeLanguage, code: string, mode: RunMode, filename: string) => Promise<boolean>
  restart: (language: RuntimeLanguage) => Promise<void>
  clearConsole: (language: RuntimeLanguage) => void
  /** A line of the workspace's own, in a console — not output of the language. */
  note: (language: RuntimeLanguage, text: string) => void
  removePlot: (id: number) => void
  /** Stops both runtimes and forgets the session — leaving an attempt. */
  shutdown: () => void
}

const MAX_CONSOLE = 4_000
/** Files larger than this written by a run stay in the runtime only. */
const MAX_SYNC_BYTES = 25 * 1024 * 1024

const runtimes: Partial<Record<RuntimeLanguage, Runtime>> = {}
const starting: Partial<Record<RuntimeLanguage, Promise<boolean>>> = {}
/** Per runtime: the workspace version of each file it holds. */
const pushed: Record<RuntimeLanguage, Map<string, number>> = { r: new Map(), python: new Map() }
/** Per runtime: each file's mtime when last compared. */
const seen: Record<RuntimeLanguage, Map<string, number>> = { r: new Map(), python: new Map() }
let nextId = 1

const emptyLanguage = (): LanguageState => ({ status: 'off', progress: '', console: [], variables: [] })

async function createRuntime(language: RuntimeLanguage): Promise<Runtime> {
  if (language === 'r') {
    const { RRuntime } = await import('@/lib/project/rRuntime')
    return new RRuntime()
  }
  const { PythonRuntime } = await import('@/lib/project/pythonRuntime')
  return new PythonRuntime()
}

function sameBytes(a: Uint8Array, b: Uint8Array): boolean {
  if (a.length !== b.length) return false
  for (let i = 0; i < a.length; i++) if (a[i] !== b[i]) return false
  return true
}

export const useProjectRuntime = create<RuntimeStore>((set, get) => {
  const patch = (language: RuntimeLanguage, next: Partial<LanguageState>) =>
    set(s => ({ [language]: { ...s[language], ...next } }) as Pick<RuntimeStore, RuntimeLanguage>)

  const print = (language: RuntimeLanguage, kind: ConsoleKind, text: string) => {
    set(s => {
      const lines = [...s[language].console, { id: nextId++, kind, text }]
      return { [language]: { ...s[language], console: lines.length > MAX_CONSOLE ? lines.slice(-MAX_CONSOLE) : lines } } as Pick<RuntimeStore, RuntimeLanguage>
    })
  }

  async function syncIn(language: RuntimeLanguage, rt: Runtime) {
    const files = usePcpaWorkspace.getState().files
    const versions = pushed[language]
    const writes = Object.values(files)
      .filter(f => versions.get(f.path) !== f.updatedAt)
      .map(f => ({ path: f.path, data: fileBytes(f), version: f.updatedAt }))
    const deletes = [...versions.keys()].filter(p => !files[p])
    if (writes.length) await rt.writeFiles(writes)
    if (deletes.length) await rt.deleteFiles(deletes)
    for (const w of writes) versions.set(w.path, w.version)
    for (const d of deletes) { versions.delete(d); seen[language].delete(d) }
  }

  async function syncOut(language: RuntimeLanguage, rt: Runtime, runStartedAt: number) {
    const ws = usePcpaWorkspace.getState()
    const entries = await rt.listFiles()
    for (const entry of entries) {
      if (isRuntimeNoise(entry.path)) continue
      const previous = seen[language].get(entry.path)
      // A second-granular clock can't tell two writes in one second apart, so
      // anything touched since the run began is compared by content.
      const touched = previous === undefined || entry.mtime !== previous || entry.mtime >= runStartedAt - 1_000
      if (!touched) continue
      seen[language].set(entry.path, entry.mtime)
      if (entry.size > MAX_SYNC_BYTES) {
        print(language, 'info', `${entry.path} is ${(entry.size / 1_048_576).toFixed(0)} MB — too large to keep in the project; it stays in this session only.`)
        continue
      }
      const current = usePcpaWorkspace.getState().files[entry.path]
      const bytes = await rt.readFile(entry.path)
      if (current && sameBytes(fileBytes(current), bytes)) continue
      if (current?.readOnly) {
        print(language, 'info', `${entry.path} is one of the project's data sets and can't be overwritten — the original has been restored. Write cleaned data to output/ instead.`)
        pushed[language].delete(entry.path)
        continue
      }
      const written = ws.write(entry.path, bytes)
      if (written) pushed[language].set(entry.path, written.updatedAt)
    }
  }

  async function start(language: RuntimeLanguage): Promise<boolean> {
    if (runtimes[language]) return true
    if (starting[language]) return starting[language]!
    const job = (async () => {
      patch(language, { status: 'loading', progress: 'Starting…' })
      print(language, 'info', language === 'r' ? 'Starting R…' : 'Starting Python…')
      try {
        const rt = await createRuntime(language)
        await rt.init(message => patch(language, { progress: message }))
        runtimes[language] = rt
        pushed[language] = new Map()
        seen[language] = new Map()
        patch(language, { status: 'ready', progress: '' })
        print(language, 'info', language === 'r' ? 'R is ready. The working directory is the project folder.' : 'Python is ready. The working directory is the project folder.')
        return true
      } catch (e) {
        patch(language, { status: 'error', progress: '' })
        print(language, 'error', `Could not start ${language === 'r' ? 'R' : 'Python'}: ${e instanceof Error ? e.message : String(e)}\nThe runtime is downloaded from its CDN the first time — check the connection and try again.`)
        return false
      } finally {
        delete starting[language]
      }
    })()
    starting[language] = job
    return job
  }

  return {
    r: emptyLanguage(),
    python: emptyLanguage(),
    plots: [],

    start,

    run: async (language, code, mode, filename) => {
      if (!(await start(language))) return false
      const rt = runtimes[language]!
      if (get()[language].status === 'busy') return false
      patch(language, { status: 'busy' })
      if (language === 'python') {
        if (mode === 'source') print(language, 'input', `>>> %run ${filename}`)
        else print(language, 'input', code.split('\n').map((l, i) => `${i === 0 ? '>>>' : '...'} ${l}`).join('\n'))
      }
      let ok = false
      try {
        await syncIn(language, rt)
        const startedAt = Date.now()
        const result = await rt.run(code, {
          mode,
          filename,
          onOutput: line => print(language, line.kind, line.text),
          onProgress: message => patch(language, { progress: message }),
        })
        ok = result.ok
        if (result.plots.length) {
          const plots = result.plots.map(bytes => ({
            id: nextId++,
            language,
            bytes,
            url: URL.createObjectURL(new Blob([bytes.slice().buffer as ArrayBuffer], { type: 'image/png' })),
            source: filename,
            createdAt: Date.now(),
          }))
          set(s => ({ plots: [...s.plots, ...plots] }))
        }
        await syncOut(language, rt, startedAt)
        patch(language, { variables: await rt.variables() })
      } catch (e) {
        // A run that died with its runtime (Stop) is reported by `restart`.
        if (runtimes[language] === rt) print(language, 'error', e instanceof Error ? e.message : String(e))
      } finally {
        if (runtimes[language] === rt) patch(language, { status: 'ready', progress: '' })
      }
      return ok
    },

    restart: async language => {
      const rt = runtimes[language]
      if (rt) {
        rt.dispose()
        delete runtimes[language]
        print(language, 'info', language === 'r' ? 'R session stopped. Variables are gone; files in the project are kept.' : 'Python session stopped. Variables are gone; files in the project are kept.')
      }
      patch(language, { status: 'off', variables: [] })
      await start(language)
    },

    clearConsole: language => patch(language, { console: [] }),

    note: (language, text) => print(language, 'info', text),

    removePlot: id => set(s => {
      const plot = s.plots.find(p => p.id === id)
      if (plot) URL.revokeObjectURL(plot.url)
      return { plots: s.plots.filter(p => p.id !== id) }
    }),

    shutdown: () => {
      for (const language of ['r', 'python'] as const) {
        runtimes[language]?.dispose()
        delete runtimes[language]
        pushed[language] = new Map()
        seen[language] = new Map()
      }
      for (const p of get().plots) URL.revokeObjectURL(p.url)
      set({ r: emptyLanguage(), python: emptyLanguage(), plots: [] })
    },
  }
})

/**
 * A clean-room run for the submission check: a *fresh* runtime holding only the
 * data and the submitted code, running each file in order — what a grader who
 * "runs the code submitted with the project" sees. It shares nothing with the
 * candidate's session, so an object defined only at the console can't hide a
 * script that doesn't run.
 */
export async function cleanRun(
  language: RuntimeLanguage,
  files: { path: string; data: Uint8Array }[],
  scripts: { path: string; code: string }[],
  onLine: (line: { kind: ConsoleKind; text: string }) => void,
): Promise<{ ok: boolean; outputs: string[] }> {
  const rt = await createRuntime(language)
  try {
    await rt.init(message => onLine({ kind: 'info', text: message }))
    await rt.writeFiles(files)
    let ok = true
    for (const script of scripts) {
      onLine({ kind: 'input', text: `Running ${script.path}` })
      const result = await rt.run(script.code, { mode: 'source', filename: script.path, onOutput: onLine })
      if (!result.ok) { ok = false; break }
    }
    const outputs = (await rt.listFiles()).map(e => e.path).filter(p => p.startsWith('output/'))
    return { ok, outputs }
  } finally {
    rt.dispose()
  }
}
