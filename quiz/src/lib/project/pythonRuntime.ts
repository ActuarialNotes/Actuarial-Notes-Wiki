/**
 * The page's side of the Python runtime: a request/response client over the
 * Pyodide worker (`pythonWorker.ts`). Stopping a stuck run means terminating
 * the worker — Pyodide can only be interrupted with a SharedArrayBuffer, which
 * needs cross-origin isolation the app doesn't have — so `dispose` is the stop
 * button, and the workspace starts a fresh runtime behind it.
 */

import type { ConsoleLine, Runtime, RunOptions, RunResult, RuntimeFileEntry, VariableInfo } from './runtimeTypes'

type Pending = {
  resolve: (value: unknown) => void
  reject: (error: Error) => void
  onOutput?: (line: ConsoleLine) => void
}

export class PythonRuntime implements Runtime {
  readonly language = 'python' as const
  private worker: Worker
  private nextId = 1
  private pending = new Map<number, Pending>()
  private progress: ((message: string) => void) | null = null

  constructor() {
    this.worker = new Worker(new URL('./pythonWorker.ts', import.meta.url), { type: 'module' })
    this.worker.onmessage = (event: MessageEvent) => this.receive(event.data)
    this.worker.onerror = (event: ErrorEvent) => {
      const error = new Error(event.message || 'The Python worker failed to start.')
      for (const p of this.pending.values()) p.reject(error)
      this.pending.clear()
    }
  }

  private receive(msg: { id?: number; type: string; value?: unknown; message?: string; line?: ConsoleLine }) {
    if (msg.type === 'progress') {
      this.progress?.(msg.message ?? '')
      return
    }
    const pending = msg.id !== undefined ? this.pending.get(msg.id) : undefined
    if (!pending) return
    if (msg.type === 'output' && msg.line) {
      pending.onOutput?.(msg.line)
    } else if (msg.type === 'result') {
      this.pending.delete(msg.id!)
      pending.resolve(msg.value)
    } else if (msg.type === 'error') {
      this.pending.delete(msg.id!)
      pending.reject(new Error(msg.message ?? 'Python request failed'))
    }
  }

  private request<T>(type: string, args: Record<string, unknown> = {}, onOutput?: (line: ConsoleLine) => void, transfer: Transferable[] = []): Promise<T> {
    const id = this.nextId++
    return new Promise<T>((resolve, reject) => {
      this.pending.set(id, { resolve: resolve as (v: unknown) => void, reject, onOutput })
      this.worker.postMessage({ id, type, ...args }, transfer)
    })
  }

  async init(onProgress: (message: string) => void): Promise<void> {
    this.progress = onProgress
    await this.request('init')
  }

  async run(code: string, options: RunOptions): Promise<RunResult> {
    if (options.onProgress) this.progress = options.onProgress
    return this.request<RunResult>('run', { code, mode: options.mode, filename: options.filename }, options.onOutput)
  }

  async writeFiles(files: { path: string; data: Uint8Array }[]): Promise<void> {
    // Copies, so the workspace keeps its own bytes after the transfer.
    const copies = files.map(f => ({ path: f.path, data: f.data.slice() }))
    await this.request('writeFiles', { files: copies }, undefined, copies.map(c => c.data.buffer as ArrayBuffer))
  }

  async deleteFiles(paths: string[]): Promise<void> {
    await this.request('deleteFiles', { paths })
  }

  listFiles(): Promise<RuntimeFileEntry[]> {
    return this.request<RuntimeFileEntry[]>('listFiles')
  }

  readFile(path: string): Promise<Uint8Array> {
    return this.request<Uint8Array>('readFile', { path })
  }

  variables(): Promise<VariableInfo[]> {
    return this.request<VariableInfo[]>('variables')
  }

  dispose(): void {
    this.worker.terminate()
    const error = new Error('Python was stopped.')
    for (const p of this.pending.values()) p.reject(error)
    this.pending.clear()
  }
}
