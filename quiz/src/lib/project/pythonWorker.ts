/// <reference lib="webworker" />
/**
 * Python for the PCPA workspace: Pyodide, in a worker so a model fit never
 * freezes the page (`docs/pcpa-project.md`).
 *
 * Pyodide is CPython compiled to WebAssembly with the scientific stack built
 * for it — numpy, pandas, statsmodels, scipy, scikit-learn, matplotlib — so a
 * candidate writes the same Python they would on their own machine. It is
 * loaded from the Pyodide project's CDN at a pinned version. Packages load on
 * first import; one Pyodide doesn't ship (seaborn, say) is fetched from PyPI
 * with micropip.
 *
 * Messages in: `{ id, type, ...args }`. Messages out: `{ id, type: 'result' |
 * 'error', ... }` for each request, plus `{ id, type: 'output', line }` and
 * `{ type: 'progress', message }` while one runs.
 */

import { PYODIDE_VERSION } from './runtimeVersions'

const INDEX_URL = `https://cdn.jsdelivr.net/pyodide/v${PYODIDE_VERSION}/full/`
const ROOT = '/project'

interface PyProxy {
  toJs(): unknown
  destroy(): void
}

interface PyodideFS {
  mkdirTree(path: string): void
  writeFile(path: string, data: Uint8Array | string): void
  readFile(path: string): Uint8Array
  unlink(path: string): void
  readdir(path: string): string[]
  stat(path: string): { mode: number; size: number; mtime: Date | number }
  isDir(mode: number): boolean
  analyzePath(path: string): { exists: boolean }
}

interface Pyodide {
  FS: PyodideFS
  globals: { get(name: string): unknown }
  loadPackage(names: string[], options?: { messageCallback?: (m: string) => void }): Promise<unknown>
  loadPackagesFromImports(code: string, options?: { messageCallback?: (m: string) => void }): Promise<unknown>
  runPythonAsync(code: string, options?: { globals?: unknown; filename?: string }): Promise<unknown>
  runPython(code: string): unknown
  setStdout(options: { batched: (text: string) => void }): void
  setStderr(options: { batched: (text: string) => void }): void
}

declare const self: DedicatedWorkerGlobalScope

let pyodide: Pyodide | null = null
let activeRun: number | null = null

const PRELUDE = `
import os, io, json, sys, types
os.makedirs('${ROOT}/output', exist_ok=True)
os.chdir('${ROOT}')
import matplotlib
matplotlib.use('AGG')
import matplotlib.pyplot as plt
plt.rcParams['figure.figsize'] = (7.5, 4.8)
plt.rcParams['figure.dpi'] = 100
_pcpa_plot_count = [0]
_pcpa_repr = repr

def _pcpa_flush_figures():
    for num in plt.get_fignums():
        fig = plt.figure(num)
        _pcpa_plot_count[0] += 1
        fig.savefig('/tmp/_pcpa_plot_%d.png' % _pcpa_plot_count[0], format='png', dpi=150, bbox_inches='tight', facecolor='white')
    plt.close('all')

# Inline display, as a notebook does: show() captures the figure for the Plots pane.
plt.show = lambda *args, **kwargs: _pcpa_flush_figures()

import pandas as _pd
_pd.set_option('display.width', 110)
_pd.set_option('display.max_columns', 30)

def _pcpa_variables():
    out = []
    for name, value in list(globals().items()):
        if name.startswith('_') or isinstance(value, types.ModuleType) or isinstance(value, type):
            continue
        if callable(value) and not hasattr(value, 'shape'):
            continue
        kind = type(value).__name__
        if hasattr(value, 'shape') and isinstance(getattr(value, 'shape'), tuple):
            summary = ' × '.join(str(d) for d in value.shape)
        elif isinstance(value, (bool, int, float, complex, str)):
            summary = repr(value)[:80]
        elif hasattr(value, '__len__'):
            try:
                summary = 'length %d' % len(value)
            except Exception:
                summary = ''
        else:
            summary = ''
        out.append({'name': name, 'type': kind, 'summary': summary})
    return json.dumps(out)

def _pcpa_list_files():
    out = []
    for base, dirs, files in os.walk('${ROOT}'):
        dirs[:] = [d for d in dirs if not d.startswith('.') and d != '__pycache__']
        for f in files:
            full = os.path.join(base, f)
            st = os.stat(full)
            out.append({'path': os.path.relpath(full, '${ROOT}'), 'size': st.st_size, 'mtime': st.st_mtime * 1000})
    return json.dumps(out)

def _pcpa_missing_imports(code):
    import importlib.util
    from pyodide.code import find_imports
    missing = []
    for name in find_imports(code):
        top = name.split('.')[0]
        if top in sys.modules:
            continue
        try:
            if importlib.util.find_spec(top) is None:
                missing.append(top)
        except Exception:
            missing.append(top)
    return json.dumps(sorted(set(missing)))
`

function post(message: unknown, transfer: Transferable[] = []) {
  self.postMessage(message, transfer)
}

function emit(kind: 'stdout' | 'stderr', text: string) {
  if (activeRun !== null) post({ id: activeRun, type: 'output', line: { kind, text } })
}

/** Drops the frames of Pyodide's own machinery from a traceback. */
function cleanTraceback(message: string): string {
  const lines = message.split('\n')
  const out: string[] = []
  for (let i = 0; i < lines.length; i++) {
    const line = lines[i]
    if (/^\s*File "\/lib\/python[^"]*"/.test(line) && /_pyodide|pyodide\//.test(line)) {
      // The frame's source line follows its "File" line.
      if (i + 1 < lines.length && !/^\s*File /.test(lines[i + 1])) i++
      continue
    }
    out.push(line)
  }
  return out.join('\n').trimEnd()
}

async function init() {
  if (pyodide) return
  post({ type: 'progress', message: 'Downloading Python (Pyodide)…' })
  const mod = await import(/* @vite-ignore */ `${INDEX_URL}pyodide.mjs`) as { loadPyodide: (o: { indexURL: string }) => Promise<Pyodide> }
  const py = await mod.loadPyodide({ indexURL: INDEX_URL })
  py.setStdout({ batched: text => emit('stdout', text) })
  py.setStderr({ batched: text => emit('stderr', text) })
  post({ type: 'progress', message: 'Loading numpy, pandas and matplotlib…' })
  await py.loadPackage(['numpy', 'pandas', 'matplotlib', 'micropip'], {
    messageCallback: m => { if (/^Loading /.test(m)) post({ type: 'progress', message: m }) },
  })
  py.FS.mkdirTree(`${ROOT}/output`)
  await py.runPythonAsync(PRELUDE)
  pyodide = py
}

function need(): Pyodide {
  if (!pyodide) throw new Error('Python is not loaded.')
  return pyodide
}

function reprOf(value: unknown): string | null {
  if (value === undefined || value === null) return null
  if (typeof value === 'string') return JSON.stringify(value).replace(/^"|"$/g, "'")
  if (typeof value === 'number' || typeof value === 'boolean' || typeof value === 'bigint') return String(value)
  const proxy = value as PyProxy
  try {
    const repr = need().globals.get('_pcpa_repr') as (v: unknown) => string
    return repr(proxy)
  } finally {
    proxy.destroy?.()
  }
}

async function installMissing(code: string) {
  const py = need()
  const missing = JSON.parse(String(py.runPython(`_pcpa_missing_imports(${JSON.stringify(code)})`))) as string[]
  if (missing.length === 0) return
  // Packages built for Pyodide first, then PyPI for anything pure-Python.
  await py.loadPackagesFromImports(code, {
    messageCallback: m => { if (/^Loading /.test(m)) post({ type: 'progress', message: m }) },
  })
  const still = JSON.parse(String(py.runPython(`_pcpa_missing_imports(${JSON.stringify(code)})`))) as string[]
  for (const name of still) {
    post({ type: 'progress', message: `Installing ${name} from PyPI…` })
    try {
      await py.runPythonAsync(`import micropip\nawait micropip.install(${JSON.stringify(name)})`)
    } catch {
      // Left for the import itself to report, with Python's own error.
    }
  }
}

async function run(id: number, code: string, mode: 'source' | 'selection', filename: string) {
  const py = need()
  activeRun = id
  let ok = true
  try {
    await installMissing(code)
    const result = await py.runPythonAsync(code, { globals: py.globals, filename })
    if (mode === 'selection') {
      const repr = reprOf(result)
      if (repr !== null) emit('stdout', repr)
    } else if (result && typeof result === 'object') {
      (result as PyProxy).destroy?.()
    }
  } catch (e) {
    ok = false
    post({ id, type: 'output', line: { kind: 'error', text: cleanTraceback(e instanceof Error ? e.message : String(e)) } })
  }
  // Figures still open at the end of a run are shown, as a notebook shows them.
  const plots: Uint8Array[] = []
  try {
    py.runPython('_pcpa_flush_figures()')
    const names = py.FS.readdir('/tmp')
      .filter(name => /^_pcpa_plot_\d+\.png$/.test(name))
      .sort((a, b) => Number(a.replace(/\D/g, '')) - Number(b.replace(/\D/g, '')))
    for (const name of names) {
      plots.push(py.FS.readFile(`/tmp/${name}`))
      py.FS.unlink(`/tmp/${name}`)
    }
  } catch {
    // A broken matplotlib state shouldn't lose the run's result.
  }
  activeRun = null
  post({ id, type: 'result', value: { ok, plots } }, plots.map(p => p.buffer as ArrayBuffer))
}

function writeFiles(files: { path: string; data: Uint8Array }[]) {
  const fs = need().FS
  for (const f of files) {
    const full = `${ROOT}/${f.path}`
    fs.mkdirTree(full.slice(0, full.lastIndexOf('/')))
    fs.writeFile(full, f.data)
  }
}

function deleteFiles(paths: string[]) {
  const fs = need().FS
  for (const p of paths) {
    const full = `${ROOT}/${p}`
    if (fs.analyzePath(full).exists) fs.unlink(full)
  }
}

self.onmessage = async (event: MessageEvent) => {
  const msg = event.data as { id: number; type: string; [k: string]: unknown }
  try {
    switch (msg.type) {
      case 'init':
        await init()
        post({ id: msg.id, type: 'result', value: null })
        break
      case 'run':
        await run(msg.id, msg.code as string, msg.mode as 'source' | 'selection', msg.filename as string)
        break
      case 'writeFiles':
        writeFiles(msg.files as { path: string; data: Uint8Array }[])
        post({ id: msg.id, type: 'result', value: null })
        break
      case 'deleteFiles':
        deleteFiles(msg.paths as string[])
        post({ id: msg.id, type: 'result', value: null })
        break
      case 'listFiles':
        post({ id: msg.id, type: 'result', value: JSON.parse(String(need().runPython('_pcpa_list_files()'))) })
        break
      case 'readFile': {
        const data = need().FS.readFile(`${ROOT}/${msg.path as string}`)
        post({ id: msg.id, type: 'result', value: data }, [data.buffer as ArrayBuffer])
        break
      }
      case 'variables':
        post({ id: msg.id, type: 'result', value: JSON.parse(String(need().runPython('_pcpa_variables()'))) })
        break
      default:
        post({ id: msg.id, type: 'error', message: `Unknown request ${msg.type}` })
    }
  } catch (e) {
    activeRun = null
    post({ id: msg.id, type: 'error', message: e instanceof Error ? e.message : String(e) })
  }
}
