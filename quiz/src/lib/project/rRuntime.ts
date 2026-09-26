/**
 * R for the PCPA workspace: webR, R compiled to WebAssembly by the R
 * Consortium's webR project (`docs/pcpa-project.md`). webR runs R in its own
 * worker already, so this module is only the client: it loads webR from its CDN
 * at a pinned version, keeps the project at `/project` as R's working
 * directory, and runs code the way RStudio's *Source with Echo* does —
 * `source(file, echo = TRUE)` — so the console shows each expression beside
 * its output.
 *
 * Base R's `glm()` covers every family the project needs; `library(x)` for a
 * package not yet installed fetches its WebAssembly build from the webR
 * repository before the code runs.
 */

import type { ConsoleLine, Runtime, RunOptions, RunResult, RuntimeFileEntry, VariableInfo } from './runtimeTypes'
import { WEBR_VERSION } from './runtimeVersions'

const BASE_URL = `https://webr.r-wasm.org/v${WEBR_VERSION}/`
const ROOT = '/project'
const RUN_FILE = '/tmp/pcpa-run.R'

// The slice of webR's API this module uses, typed here rather than pulling the
// npm package in for its declarations.
interface RObjectHandle {
  get(name: string): Promise<RObjectHandle>
  toString(): Promise<string>
}

interface WebRShelter {
  captureR(code: string, options?: Record<string, unknown>): Promise<{
    output: { type: string; data: unknown }[]
    images: ImageBitmap[]
  }>
  purge(): Promise<void>
}

interface WebRInstance {
  init(): Promise<unknown>
  close(): void
  installPackages(packages: string[], options?: { quiet?: boolean }): Promise<void>
  evalRVoid(code: string): Promise<void>
  evalRString(code: string): Promise<string>
  evalRRaw(code: string, type: 'string[]'): Promise<string[]>
  Shelter: new () => Promise<WebRShelter>
  FS: {
    mkdir(path: string): Promise<unknown>
    writeFile(path: string, data: ArrayBufferView): Promise<void>
    readFile(path: string): Promise<Uint8Array>
    unlink(path: string): Promise<void>
    analyzePath(path: string): Promise<{ exists: boolean }>
  }
}

/** `library(x)`, `require(x)`, `requireNamespace("x")` and `x::f` — the packages a script asks for. */
export function requestedRPackages(code: string): string[] {
  const names = new Set<string>()
  const stripped = code.replace(/#.*$/gm, '')
  for (const m of stripped.matchAll(/\b(?:library|require|requireNamespace)\(\s*["']?([A-Za-z][A-Za-z0-9.]*)["']?/g)) names.add(m[1])
  for (const m of stripped.matchAll(/\b([A-Za-z][A-Za-z0-9.]*):::?[A-Za-z._]/g)) names.add(m[1])
  return [...names]
}

async function bitmapToPng(bitmap: ImageBitmap): Promise<Uint8Array> {
  const canvas = document.createElement('canvas')
  canvas.width = bitmap.width
  canvas.height = bitmap.height
  const ctx = canvas.getContext('2d')
  if (!ctx) return new Uint8Array()
  ctx.fillStyle = '#ffffff'
  ctx.fillRect(0, 0, canvas.width, canvas.height)
  ctx.drawImage(bitmap, 0, 0)
  bitmap.close()
  const blob = await new Promise<Blob | null>(resolve => canvas.toBlob(resolve, 'image/png'))
  return blob ? new Uint8Array(await blob.arrayBuffer()) : new Uint8Array()
}

function rString(value: string): string {
  return JSON.stringify(value)
}

export class RRuntime implements Runtime {
  readonly language = 'r' as const
  private webR: WebRInstance | null = null
  private shelter: WebRShelter | null = null
  private installed: Set<string> | null = null

  async init(onProgress: (message: string) => void): Promise<void> {
    onProgress('Downloading R (webR)…')
    const mod = await import(/* @vite-ignore */ `${BASE_URL}webr.mjs`) as { WebR: new (o: Record<string, unknown>) => WebRInstance }
    const webR = new mod.WebR({ baseUrl: BASE_URL, interactive: false })
    await webR.init()
    onProgress('Starting R…')
    const exists = await webR.FS.analyzePath(ROOT)
    if (!exists.exists) await webR.FS.mkdir(ROOT)
    await webR.evalRVoid(`dir.create("${ROOT}/output", showWarnings = FALSE); setwd("${ROOT}"); options(width = 100, digits = 5, scipen = 2)`)
    this.shelter = await new webR.Shelter()
    this.webR = webR
  }

  private need(): { webR: WebRInstance; shelter: WebRShelter } {
    if (!this.webR || !this.shelter) throw new Error('R is not loaded.')
    return { webR: this.webR, shelter: this.shelter }
  }

  private async installMissing(code: string, onProgress?: (m: string) => void, onOutput?: (line: ConsoleLine) => void) {
    const { webR } = this.need()
    const wanted = requestedRPackages(code)
    if (wanted.length === 0) return
    if (!this.installed) this.installed = new Set(await webR.evalRRaw('rownames(installed.packages())', 'string[]'))
    const missing = wanted.filter(p => !this.installed!.has(p))
    for (const pkg of missing) {
      onProgress?.(`Installing ${pkg}…`)
      onOutput?.({ kind: 'info', text: `Installing package '${pkg}' from the webR repository…` })
      try {
        await webR.installPackages([pkg], { quiet: true })
      } catch {
        // library() will say it isn't there, in R's own words.
      }
    }
    if (missing.length) this.installed = new Set(await webR.evalRRaw('rownames(installed.packages())', 'string[]'))
  }

  async run(code: string, options: RunOptions): Promise<RunResult> {
    const { webR, shelter } = this.need()
    await this.installMissing(code, options.onProgress, options.onOutput)
    await webR.FS.writeFile(RUN_FILE, new TextEncoder().encode(code.endsWith('\n') ? code : `${code}\n`))
    const result = await shelter.captureR(
      `source(${rString(RUN_FILE)}, echo = TRUE, max.deparse.length = Inf, spaced = FALSE, print.eval = TRUE, keep.source = TRUE)`,
      { captureGraphics: { width: 720, height: 460 }, captureStreams: true, captureConditions: true, withAutoprint: false, throwJsException: false },
    )
    let ok = true
    for (const out of result.output) {
      if (out.type === 'stdout' || out.type === 'stderr') {
        options.onOutput({ kind: out.type, text: String(out.data) })
        continue
      }
      if (out.type !== 'message' && out.type !== 'warning' && out.type !== 'error') continue
      let message = ''
      try {
        message = await (await (out.data as RObjectHandle).get('message')).toString()
      } catch {
        message = String(out.type)
      }
      message = message.replace(/\n$/, '')
      if (out.type === 'message') options.onOutput({ kind: 'message', text: message })
      if (out.type === 'warning') options.onOutput({ kind: 'warning', text: `Warning message:\n${message}` })
      if (out.type === 'error') {
        ok = false
        options.onOutput({ kind: 'error', text: `Error: ${message}` })
      }
    }
    const plots = await Promise.all(result.images.map(bitmapToPng))
    await shelter.purge()
    return { ok, plots: plots.filter(p => p.length > 0) }
  }

  async writeFiles(files: { path: string; data: Uint8Array }[]): Promise<void> {
    const { webR } = this.need()
    const dirs = new Set<string>()
    for (const f of files) {
      const parts = f.path.split('/').slice(0, -1)
      for (let i = 1; i <= parts.length; i++) dirs.add(parts.slice(0, i).join('/'))
    }
    for (const dir of [...dirs].sort()) {
      const full = `${ROOT}/${dir}`
      if (!(await webR.FS.analyzePath(full)).exists) await webR.FS.mkdir(full)
    }
    for (const f of files) await webR.FS.writeFile(`${ROOT}/${f.path}`, f.data)
  }

  async deleteFiles(paths: string[]): Promise<void> {
    const { webR } = this.need()
    for (const p of paths) {
      const full = `${ROOT}/${p}`
      if ((await webR.FS.analyzePath(full)).exists) await webR.FS.unlink(full)
    }
  }

  async listFiles(): Promise<RuntimeFileEntry[]> {
    const { webR } = this.need()
    const text = await webR.evalRString(
      `local({ f <- list.files("${ROOT}", recursive = TRUE); if (!length(f)) return(""); i <- file.info(file.path("${ROOT}", f)); paste(f, i$size, sprintf("%.0f", as.numeric(i$mtime) * 1000), sep = "\\t", collapse = "\\n") })`,
    )
    if (!text) return []
    return text.split('\n').map(line => {
      const [path, size, mtime] = line.split('\t')
      return { path, size: Number(size), mtime: Number(mtime) }
    })
  }

  readFile(path: string): Promise<Uint8Array> {
    return this.need().webR.FS.readFile(`${ROOT}/${path}`)
  }

  async variables(): Promise<VariableInfo[]> {
    const rows = await this.need().webR.evalRRaw(
      `local({ e <- globalenv(); n <- ls(e); if (!length(n)) return(character(0)); vapply(n, function(x) { v <- get(x, envir = e); d <- dim(v); s <- if (!is.null(d)) paste(d, collapse = " × ") else if (is.atomic(v) && length(v) == 1) format(v, digits = 5) else paste("length", length(v)); paste(x, class(v)[1], s, sep = "\\t") }, "") })`,
      'string[]',
    )
    return rows.map(row => {
      const [name, type, summary] = row.split('\t')
      return { name, type, summary: summary ?? '' }
    })
  }

  dispose(): void {
    this.webR?.close()
    this.webR = null
    this.shelter = null
  }
}
