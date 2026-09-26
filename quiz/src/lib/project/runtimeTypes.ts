/**
 * The contract every language runtime in the PCPA workspace meets
 * (`docs/pcpa-project.md`). R runs in webR and Python in Pyodide — each is the
 * language compiled to WebAssembly, loaded from its project's own CDN at a
 * pinned version, nothing of it bundled into the app — and the workspace talks
 * to both through this one shape, so the console, the plots pane, the
 * variables pane and the file sync don't know which they are driving.
 */

export type RuntimeLanguage = 'r' | 'python'

export const LANGUAGE_LABEL: Record<RuntimeLanguage, string> = { r: 'R', python: 'Python' }

export type ConsoleKind = 'input' | 'stdout' | 'stderr' | 'message' | 'warning' | 'error' | 'info'

export interface ConsoleLine {
  kind: ConsoleKind
  text: string
}

/** How code is being run: a whole file, or a line/selection sent to the console. */
export type RunMode = 'source' | 'selection'

export interface RunOptions {
  mode: RunMode
  /** The workspace path of the file the code came from, for echo and tracebacks. */
  filename: string
  onOutput: (line: ConsoleLine) => void
  onProgress?: (message: string) => void
}

export interface RunResult {
  ok: boolean
  /** Plots the run drew, as PNG bytes. */
  plots: Uint8Array[]
}

export interface RuntimeFileEntry {
  /** Relative to the project root. */
  path: string
  size: number
  /** Epoch milliseconds. */
  mtime: number
}

export interface VariableInfo {
  name: string
  type: string
  summary: string
}

export interface Runtime {
  readonly language: RuntimeLanguage
  init(onProgress: (message: string) => void): Promise<void>
  run(code: string, options: RunOptions): Promise<RunResult>
  writeFiles(files: { path: string; data: Uint8Array }[]): Promise<void>
  deleteFiles(paths: string[]): Promise<void>
  listFiles(): Promise<RuntimeFileEntry[]>
  readFile(path: string): Promise<Uint8Array>
  variables(): Promise<VariableInfo[]>
  /** Stops the runtime for good. A stuck run is stopped this way and the runtime restarted. */
  dispose(): void
}

/** Files a runtime drops into the project that are not the candidate's. */
export function isRuntimeNoise(path: string): boolean {
  return path === 'Rplots.pdf' || path.startsWith('.') || path.includes('/__pycache__/') || path.startsWith('__pycache__/')
}
