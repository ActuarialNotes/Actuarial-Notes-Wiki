import { create } from 'zustand'
import { fileKind, isTextKind, normalizePath } from '@/lib/pcpaAttempt'
import { deleteFiles, isPersistent, listFiles, putFiles, type StoredFile } from '@/lib/project/fileStore'
import { fetchRemoteFiles, planFileSync, queueFilePush, READ_ONLY_MARKER } from '@/lib/project/projectSync'

/**
 * The open PCPA attempt's files (`docs/pcpa-project.md`): what the file tree
 * lists, the editors edit and the runtimes are synced with.
 *
 * Every change lands here synchronously and reaches IndexedDB a moment later —
 * a keystroke in a script is a state update, not a database write — so the
 * editor stays responsive and `flush()` is there for the moments that must not
 * lose one (leaving the page, submitting).
 *
 * For an attempt kept with an account, each change is also queued for the
 * account (`lib/project/projectSync.ts`), and opening the attempt first takes
 * in whatever another device wrote since this browser last had it open.
 */

/** A file an attempt starts with. `updatedAt` is when it was first written. */
export interface SeedFile {
  path: string
  text: string
  readOnly: boolean
  updatedAt: number
}

export interface WorkspaceFile {
  path: string
  text?: string
  bytes?: Uint8Array
  size: number
  updatedAt: number
  /** The CAS's data sets: never edited, never overwritten by a run. */
  readOnly: boolean
}

interface WorkspaceState {
  attemptId: string | null
  files: Record<string, WorkspaceFile>
  status: 'idle' | 'loading' | 'ready'
  /** False when IndexedDB is unavailable and files last only for this tab. */
  persistent: boolean
  open: (attemptId: string, seedFiles?: () => SeedFile[]) => Promise<void>
  close: () => void
  write: (path: string, content: string | Uint8Array, opts?: { readOnly?: boolean }) => WorkspaceFile | null
  remove: (path: string) => void
  rename: (from: string, to: string) => boolean
  flush: () => Promise<void>
}

const encoder = new TextEncoder()
const decoder = new TextDecoder()

export function fileBytes(file: WorkspaceFile): Uint8Array {
  return file.bytes ?? encoder.encode(file.text ?? '')
}

export function fileText(file: WorkspaceFile): string {
  return file.text ?? (file.bytes ? decoder.decode(file.bytes) : '')
}

const READ_ONLY_PREFIX = 'data/'

function toWorkspace(stored: StoredFile, readOnlyPaths: Set<string>): WorkspaceFile {
  return {
    path: stored.path,
    text: stored.text,
    bytes: stored.bytes,
    size: stored.size,
    updatedAt: stored.updatedAt,
    readOnly: readOnlyPaths.has(stored.path),
  }
}

// Pending writes, per path — debounced so typing doesn't write on every key.
const pending = new Map<string, WorkspaceFile | null>()
let timer: ReturnType<typeof setTimeout> | null = null
let pendingAttempt: string | null = null

async function flushPending() {
  if (timer) { clearTimeout(timer); timer = null }
  const attemptId = pendingAttempt
  if (!attemptId || pending.size === 0) return
  const writes: StoredFile[] = []
  const deletes: string[] = []
  for (const [path, file] of pending) {
    if (file) writes.push({ attemptId, path, text: file.text, bytes: file.bytes, size: file.size, updatedAt: file.updatedAt })
    else deletes.push(path)
  }
  pending.clear()
  await putFiles(writes)
  await deleteFiles(attemptId, deletes)
}

function schedule(attemptId: string, path: string, file: WorkspaceFile | null) {
  if (pendingAttempt && pendingAttempt !== attemptId) void flushPending()
  pendingAttempt = attemptId
  pending.set(path, file)
  if (timer) clearTimeout(timer)
  timer = setTimeout(() => { void flushPending() }, 600)
  queueFilePush(attemptId, file
    ? { path, text: file.text, bytes: file.bytes, size: file.size, updatedAt: file.updatedAt, readOnly: file.readOnly }
    : { path, size: 0, updatedAt: Date.now(), readOnly: false, deleted: true })
}

// The read-only paths are recorded as a marker file (`READ_ONLY_MARKER`), so a
// reload knows them.
function markerRecord(attemptId: string, readOnly: Iterable<string>): StoredFile {
  const text = [...readOnly].sort().join('\n')
  return { attemptId, path: READ_ONLY_MARKER, text, size: 0, updatedAt: Date.now() }
}

export const usePcpaWorkspace = create<WorkspaceState>((set, get) => ({
  attemptId: null,
  files: {},
  status: 'idle',
  persistent: true,

  open: async (attemptId, seedFiles) => {
    if (get().attemptId === attemptId && get().status !== 'idle') return
    await flushPending()
    set({ attemptId, files: {}, status: 'loading' })
    const persistent = await isPersistent()
    let stored = await listFiles(attemptId)
    const marker = stored.find(f => f.path === READ_ONLY_MARKER)
    const readOnlyPaths = new Set((marker?.text ?? '').split('\n').filter(Boolean))
    const markerBefore = markerRecord(attemptId, readOnlyPaths).text

    // What another device wrote since this browser last had the attempt open.
    const remote = await fetchRemoteFiles(attemptId)
    if (get().attemptId !== attemptId) return
    if (remote) {
      const plan = planFileSync(stored, remote, readOnlyPaths)
      await putFiles(plan.write.map(f => ({ attemptId, path: f.path, text: f.text, bytes: f.bytes, size: f.size, updatedAt: f.updatedAt })))
      await deleteFiles(attemptId, plan.remove)
      for (const f of plan.write) {
        if (f.readOnly) readOnlyPaths.add(f.path)
        else readOnlyPaths.delete(f.path)
      }
      for (const path of plan.remove) readOnlyPaths.delete(path)
      for (const f of plan.push) queueFilePush(attemptId, f)
      if (plan.write.length > 0 || plan.remove.length > 0) stored = await listFiles(attemptId)
    }

    // The data sets are drawn whenever they are missing — on a new device they
    // come from the seed again rather than the account. The starter script only
    // goes into a workspace that has never held a file, here or in the account.
    if (seedFiles) {
      const have = new Set(stored.map(f => f.path))
      const untouched = !stored.some(f => f.path !== READ_ONLY_MARKER) && !(remote && remote.length > 0)
      const seeds = seedFiles().filter(f => !have.has(f.path) && (f.readOnly || untouched))
      if (seeds.length > 0) {
        const records: StoredFile[] = seeds.map(f => ({ attemptId, path: f.path, text: f.text, size: f.text.length, updatedAt: f.updatedAt }))
        await putFiles(records)
        for (const f of seeds) {
          if (f.readOnly) readOnlyPaths.add(f.path)
          else queueFilePush(attemptId, { path: f.path, text: f.text, size: f.text.length, updatedAt: f.updatedAt, readOnly: false })
        }
        stored = [...stored.filter(f => !seeds.some(s => s.path === f.path)), ...records]
      }
    }

    const nextMarker = markerRecord(attemptId, readOnlyPaths)
    if (!marker || nextMarker.text !== markerBefore) await putFiles([nextMarker])
    if (get().attemptId !== attemptId) return
    const files: Record<string, WorkspaceFile> = {}
    for (const f of stored) if (f.path !== READ_ONLY_MARKER) files[f.path] = toWorkspace(f, readOnlyPaths)
    set({ files, status: 'ready', persistent })
  },

  close: () => {
    void flushPending()
    set({ attemptId: null, files: {}, status: 'idle' })
  },

  write: (rawPath, content, opts) => {
    const { attemptId, files } = get()
    const path = normalizePath(rawPath)
    if (!attemptId || !path) return null
    const existing = files[path]
    if (existing?.readOnly && !opts?.readOnly) return null
    const text = typeof content === 'string'
      ? content
      : isTextKind(fileKind(path)) && content.length < 20_000_000 ? decoder.decode(content) : undefined
    const bytes = typeof content === 'string' || text !== undefined ? undefined : content
    const file: WorkspaceFile = {
      path,
      text,
      bytes,
      size: text !== undefined ? text.length : bytes!.length,
      updatedAt: Date.now(),
      readOnly: opts?.readOnly ?? existing?.readOnly ?? false,
    }
    set({ files: { ...files, [path]: file } })
    schedule(attemptId, path, file)
    if (opts?.readOnly && !existing?.readOnly) {
      const readOnly = Object.values(get().files).filter(f => f.readOnly).map(f => f.path)
      schedule(attemptId, READ_ONLY_MARKER, { path: READ_ONLY_MARKER, text: readOnly.join('\n'), size: 0, updatedAt: Date.now(), readOnly: true })
    }
    return file
  },

  remove: path => {
    const { attemptId, files } = get()
    if (!attemptId || !files[path] || files[path].readOnly) return
    const next = { ...files }
    delete next[path]
    set({ files: next })
    schedule(attemptId, path, null)
  },

  rename: (from, rawTo) => {
    const { attemptId, files } = get()
    const to = normalizePath(rawTo)
    const file = files[from]
    if (!attemptId || !file || file.readOnly || !to || files[to] || to.startsWith(READ_ONLY_PREFIX)) return false
    const next = { ...files }
    delete next[from]
    next[to] = { ...file, path: to, updatedAt: Date.now() }
    set({ files: next })
    schedule(attemptId, from, null)
    schedule(attemptId, to, next[to])
    return true
  },

  flush: flushPending,
}))

if (typeof window !== 'undefined') {
  window.addEventListener('pagehide', () => { void flushPending() })
}
