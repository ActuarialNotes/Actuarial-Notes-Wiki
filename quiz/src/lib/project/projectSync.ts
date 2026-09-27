/**
 * Keeping a signed-in candidate's project attempts with their account
 * (`docs/pcpa-project.md`, "Where an attempt is kept").
 *
 * The stores stay what they were — the attempt's record in localStorage
 * (`hooks/usePcpaAttempts.ts`), its files in IndexedDB (`fileStore.ts`) — and
 * are always written first, so the workspace never waits on the network. This
 * module is the other half: the pure merges that reconcile a browser's copy
 * with the account's, and the Supabase reads and writes behind them
 * (`user_project_attempts`, `user_project_files`). The stores call the
 * `queue*` helpers on every change; `hooks/useProjectSync.ts` pulls the
 * account's attempts in, and the workspace pulls an attempt's files when it
 * opens one.
 *
 * ── Last writer wins, deletions included ─────────────────────────────────────
 * An attempt and each of its files is one row, and the row with the later
 * `updatedAt` wins, whichever side it is on. A deletion is a row too (a
 * *tombstone*: `deleted`, no content), so a file removed on the laptop is
 * removed from the desktop the next time it opens the attempt, rather than
 * being put back by the desktop's older copy.
 *
 * ── What never leaves the browser ────────────────────────────────────────────
 * The data sets. They are a function of the attempt's seed — any device draws
 * the same rows again — and they are the CAS's, which the brief says may not
 * be shared. The same goes for the assessment data, also under `data/`.
 */

import { supabase } from '@/lib/supabase'
import { isDataPath, normalizeAttempt, type ProjectAttempt } from '@/lib/pcpaAttempt'
import type { StoredFile } from './fileStore'

/** The file that records which workspace paths are read-only. Local bookkeeping. */
export const READ_ONLY_MARKER = '.readonly'

/**
 * The most a synced file may hold, in characters of its stored form (text as
 * is, anything else as base64). A plot is a few hundred KB; a file past this is
 * kept in the browser that made it rather than refused.
 */
export const MAX_SYNCED_CHARS = 2_000_000

/** Whether a workspace path is kept with the account. */
export function isSyncedPath(path: string): boolean {
  return path !== READ_ONLY_MARKER && !isDataPath(path)
}

// ── Pure merges ───────────────────────────────────────────────────────────────

/** An attempt as the account holds it: its record, or a tombstone. */
export interface RemoteAttempt {
  id: string
  record: ProjectAttempt | null
  deleted: boolean
  updatedAt: number
}

export interface AttemptPlan {
  /** This browser's attempts once the account's are folded in, newest first. */
  attempts: ProjectAttempt[]
  /** Attempts this browser has newer than the account — to be written back. */
  push: ProjectAttempt[]
  /** Attempts deleted on another device: their files go from this browser too. */
  removed: string[]
  /** Attempts started signed out that signing in has just taken into the account. */
  adopted: string[]
  /** False when the account had nothing this browser didn't already show. */
  changed: boolean
}

/**
 * Fold the account's attempts into this browser's for `userId`.
 *
 * Only the attempts the reader sees are reconciled: theirs, and any started
 * signed out, which become theirs. Another account's attempts left in this
 * browser are carried through untouched — they belong to that account, and
 * reappear when it signs back in.
 */
export function planAttemptSync(local: readonly ProjectAttempt[], remote: readonly RemoteAttempt[], userId: string): AttemptPlan {
  const out = new Map<string, ProjectAttempt>()
  const push: ProjectAttempt[] = []
  const removed: string[] = []
  const adopted: string[] = []
  let changed = false

  const remoteById = new Map(remote.map(r => [r.id, r]))
  for (const a of local) {
    if (a.owner !== undefined && a.owner !== userId) { out.set(a.id, a); continue }
    const r = remoteById.get(a.id)
    const mine = a.owner === userId ? a : { ...a, owner: userId }
    if (a.owner === undefined) { adopted.push(a.id); changed = true }
    if (!r || a.updatedAt > r.updatedAt) {
      out.set(a.id, mine)
      push.push(mine)
    } else if (r.updatedAt > a.updatedAt) {
      changed = true
      if (r.deleted || !r.record) removed.push(a.id)
      else out.set(a.id, { ...r.record, owner: userId })
    } else {
      out.set(a.id, mine)
    }
  }
  for (const r of remote) {
    if (out.has(r.id) || removed.includes(r.id) || r.deleted || !r.record) continue
    if (local.some(a => a.id === r.id)) continue
    out.set(r.id, { ...r.record, owner: userId })
    changed = true
  }

  const attempts = [...out.values()].sort((a, b) => b.startedAt - a.startedAt)
  return { attempts, push, removed, adopted, changed }
}

/** A workspace file as it is synced: its content, or a tombstone. */
export interface SyncFile {
  path: string
  text?: string
  bytes?: Uint8Array
  size: number
  updatedAt: number
  readOnly: boolean
  deleted?: boolean
}

export interface FilePlan {
  /** Files the account has newer: written into this browser. */
  write: SyncFile[]
  /** Files deleted on another device since this browser's copy. */
  remove: string[]
  /** Files this browser has newer than the account. */
  push: SyncFile[]
}

/** The characters a file takes once stored remotely. */
export function syncedLength(file: Pick<SyncFile, 'text' | 'bytes'>): number {
  if (file.text !== undefined) return file.text.length
  return Math.ceil((file.bytes?.length ?? 0) / 3) * 4
}

/**
 * Reconcile one attempt's files. `readOnly` is this browser's list of
 * read-only paths (the `.readonly` marker), which the account keeps as a flag
 * on each row.
 */
export function planFileSync(local: readonly StoredFile[], remote: readonly SyncFile[], readOnly: ReadonlySet<string>): FilePlan {
  const write: SyncFile[] = []
  const remove: string[] = []
  const push: SyncFile[] = []
  const localByPath = new Map(local.filter(f => isSyncedPath(f.path)).map(f => [f.path, f]))

  for (const r of remote) {
    if (!isSyncedPath(r.path)) continue
    const l = localByPath.get(r.path)
    localByPath.delete(r.path)
    if (!l) {
      if (!r.deleted) write.push(r)
      continue
    }
    if (r.updatedAt > l.updatedAt) {
      if (r.deleted) remove.push(r.path)
      else write.push(r)
    } else if (l.updatedAt > r.updatedAt) {
      push.push({ path: l.path, text: l.text, bytes: l.bytes, size: l.size, updatedAt: l.updatedAt, readOnly: readOnly.has(l.path) })
    }
  }
  for (const l of localByPath.values()) {
    push.push({ path: l.path, text: l.text, bytes: l.bytes, size: l.size, updatedAt: l.updatedAt, readOnly: readOnly.has(l.path) })
  }
  return { write, remove, push: push.filter(f => syncedLength(f) <= MAX_SYNCED_CHARS) }
}

// ── Encoding ──────────────────────────────────────────────────────────────────

export function bytesToBase64(bytes: Uint8Array): string {
  let binary = ''
  for (let i = 0; i < bytes.length; i += 0x8000) {
    binary += String.fromCharCode(...bytes.subarray(i, i + 0x8000))
  }
  return btoa(binary)
}

export function base64ToBytes(base64: string): Uint8Array {
  const binary = atob(base64)
  const out = new Uint8Array(binary.length)
  for (let i = 0; i < binary.length; i++) out[i] = binary.charCodeAt(i)
  return out
}

// ── Server IO ─────────────────────────────────────────────────────────────────

interface AttemptRow {
  attempt_id: string
  record: unknown
  deleted: boolean
  updated_at: string
}

interface FileRow {
  path: string
  content: string | null
  encoding: 'text' | 'base64'
  read_only: boolean
  size: number
  deleted: boolean
  updated_at: string
}

function toMillis(iso: string): number {
  const ms = Date.parse(iso)
  return Number.isNaN(ms) ? 0 : ms
}

const iso = (ms: number) => new Date(ms).toISOString()

/** The signed-in account, read when a write goes out rather than when it was queued. */
async function currentUserId(): Promise<string | null> {
  try {
    const { data } = await supabase.auth.getSession()
    return data.session?.user.id ?? null
  } catch {
    return null
  }
}

/**
 * Every attempt the account holds, tombstones included. Null when the read
 * fails — offline, or the migration isn't applied — which the caller treats
 * as "leave this browser's attempts alone", never as "the account has none".
 */
export async function fetchRemoteAttempts(userId: string): Promise<RemoteAttempt[] | null> {
  try {
    const { data, error } = await supabase
      .from('user_project_attempts')
      .select('attempt_id, record, deleted, updated_at')
      .eq('user_id', userId)
    if (error) throw new Error(error.message)
    return ((data ?? []) as AttemptRow[]).map(r => ({
      id: r.attempt_id,
      record: r.deleted ? null : normalizeAttempt(r.record),
      deleted: r.deleted,
      updatedAt: toMillis(r.updated_at),
    }))
  } catch (err) {
    console.warn('fetchRemoteAttempts failed; keeping this browser\'s attempts:', err)
    return null
  }
}

/**
 * One attempt's files as the account holds them — or null when there is no
 * account to ask, the attempt isn't the account's, or the read fails.
 */
export async function fetchRemoteFiles(attemptId: string): Promise<SyncFile[] | null> {
  const userId = await currentUserId()
  if (!userId || ownerOf(attemptId) !== userId) return null
  try {
    const { data, error } = await supabase
      .from('user_project_files')
      .select('path, content, encoding, read_only, size, deleted, updated_at')
      .eq('user_id', userId)
      .eq('attempt_id', attemptId)
    if (error) throw new Error(error.message)
    return ((data ?? []) as FileRow[]).map(r => ({
      path: r.path,
      ...(r.deleted || r.content === null
        ? {}
        : r.encoding === 'base64' ? { bytes: base64ToBytes(r.content) } : { text: r.content }),
      size: r.size,
      updatedAt: toMillis(r.updated_at),
      readOnly: r.read_only,
      deleted: r.deleted || r.content === null,
    }))
  } catch (err) {
    console.warn('fetchRemoteFiles failed; opening this browser\'s copy:', err)
    return null
  }
}

// ── Who owns an attempt ───────────────────────────────────────────────────────
// The attempts store registers a lookup here, so a queued write can check at
// send time that the attempt belongs to the account signed in — without this
// module importing the store that imports it.

let ownerLookup: (attemptId: string) => string | undefined = () => undefined

export function registerOwnerLookup(lookup: (attemptId: string) => string | undefined): void {
  ownerLookup = lookup
}

function ownerOf(attemptId: string): string | undefined {
  return ownerLookup(attemptId)
}

// ── Write queue ───────────────────────────────────────────────────────────────
// Writes are debounced and coalesced — an attempt or a file queued twice
// before the timer fires goes out once, as its latest state — so typing in a
// script is a local write per keystroke and a remote write per pause.

const WRITE_DELAY_MS = 2000
/** Rows per request, and characters per request, for the file upserts. */
const FILE_BATCH_ROWS = 25
const FILE_BATCH_CHARS = 4_000_000

type AttemptWrite = { kind: 'record'; attempt: ProjectAttempt } | { kind: 'delete'; id: string; owner: string; at: number }

const attemptQueue = new Map<string, AttemptWrite>()
const fileQueue = new Map<string, { attemptId: string; file: SyncFile }>()
let timer: ReturnType<typeof setTimeout> | null = null
let running: Promise<void> | null = null

function schedule() {
  if (timer) clearTimeout(timer)
  timer = setTimeout(() => { void flushProjectSync() }, WRITE_DELAY_MS)
}

/** Queue an attempt's record for the account it belongs to. */
export function queueAttemptPush(attempt: ProjectAttempt): void {
  if (!attempt.owner) return
  attemptQueue.set(attempt.id, { kind: 'record', attempt })
  schedule()
}

/** Queue an attempt's deletion: a tombstone, and its files gone from the account. */
export function queueAttemptDelete(id: string, owner: string | undefined): void {
  for (const key of fileQueue.keys()) if (fileQueue.get(key)?.attemptId === id) fileQueue.delete(key)
  if (!owner) return
  attemptQueue.set(id, { kind: 'delete', id, owner, at: Date.now() })
  schedule()
}

/** Queue a file (or its deletion) for the account. Data sets are never queued. */
export function queueFilePush(attemptId: string, file: SyncFile): void {
  if (!isSyncedPath(file.path)) return
  if (!file.deleted && syncedLength(file) > MAX_SYNCED_CHARS) return
  fileQueue.set(`${attemptId}\u0000${file.path}`, { attemptId, file })
  schedule()
}

function fileRow(userId: string, attemptId: string, f: SyncFile) {
  const deleted = f.deleted === true
  return {
    user_id: userId,
    attempt_id: attemptId,
    path: f.path,
    content: deleted ? null : f.text !== undefined ? f.text : bytesToBase64(f.bytes ?? new Uint8Array()),
    encoding: !deleted && f.text === undefined ? 'base64' : 'text',
    read_only: f.readOnly,
    size: deleted ? 0 : f.size,
    deleted,
    updated_at: iso(f.updatedAt),
  }
}

async function sendQueued(): Promise<void> {
  if (attemptQueue.size === 0 && fileQueue.size === 0) return
  const attempts = [...attemptQueue.values()]
  const files = [...fileQueue.values()]
  attemptQueue.clear()
  fileQueue.clear()

  const userId = await currentUserId()
  // Signed out: the browser's copy is the only one, and that's already written.
  if (!userId) return

  const records = attempts.filter((w): w is Extract<AttemptWrite, { kind: 'record' }> => w.kind === 'record' && w.attempt.owner === userId)
  const deletions = attempts.filter((w): w is Extract<AttemptWrite, { kind: 'delete' }> => w.kind === 'delete' && w.owner === userId)
  const rows = [
    ...records.map(w => {
      const { owner: _owner, ...record } = w.attempt
      void _owner
      return { user_id: userId, attempt_id: w.attempt.id, record, deleted: false, updated_at: iso(w.attempt.updatedAt) }
    }),
    ...deletions.map(w => ({ user_id: userId, attempt_id: w.id, record: null, deleted: true, updated_at: iso(w.at) })),
  ]
  if (rows.length > 0) {
    const { error } = await supabase.from('user_project_attempts').upsert(rows, { onConflict: 'user_id,attempt_id' })
    if (error) throw new Error(error.message)
  }
  for (const w of deletions) {
    const { error } = await supabase.from('user_project_files').delete().eq('user_id', userId).eq('attempt_id', w.id)
    if (error) throw new Error(error.message)
  }

  const fileRows = files
    .filter(({ attemptId }) => ownerOf(attemptId) === userId)
    .map(({ attemptId, file }) => fileRow(userId, attemptId, file))
  let batch: typeof fileRows = []
  let chars = 0
  const send = async () => {
    if (batch.length === 0) return
    const { error } = await supabase.from('user_project_files').upsert(batch, { onConflict: 'user_id,attempt_id,path' })
    batch = []
    chars = 0
    if (error) throw new Error(error.message)
  }
  for (const row of fileRows) {
    const length = row.content?.length ?? 0
    if (batch.length >= FILE_BATCH_ROWS || (batch.length > 0 && chars + length > FILE_BATCH_CHARS)) await send()
    batch.push(row)
    chars += length
  }
  await send()
}

/** Send everything queued now — when the tab goes away, and on sign-out. */
export async function flushProjectSync(): Promise<void> {
  if (timer) { clearTimeout(timer); timer = null }
  if (running) await running
  running = sendQueued()
    .catch(err => {
      // Never surfaced: the browser's copy is written, and the next change or
      // the next pull puts the account right.
      console.warn('project sync failed:', err)
    })
    .finally(() => { running = null })
  await running
}
