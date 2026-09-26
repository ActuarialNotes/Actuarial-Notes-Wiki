/**
 * Where a PCPA project attempt's files live between visits: IndexedDB, in this
 * browser (`docs/pcpa-project.md`).
 *
 * A workspace holds megabytes — two data sets, the plots a run saves — which is
 * past what localStorage will take, so the attempt's *record* (the report,
 * answers, ratings) sits in localStorage beside the app's other stores and its
 * *files* sit here, one row per file, keyed by attempt and path. Where
 * IndexedDB is unavailable (some private windows), files are kept in memory for
 * the session and the workspace says so.
 */

export interface StoredFile {
  attemptId: string
  path: string
  /** Text files are stored as text, everything else as bytes. */
  text?: string
  bytes?: Uint8Array
  size: number
  updatedAt: number
}

const DB_NAME = 'pcpa-project'
const STORE = 'files'

let dbPromise: Promise<IDBDatabase | null> | null = null
const memory = new Map<string, StoredFile>()
const memKey = (attemptId: string, path: string) => `${attemptId}\u0000${path}`

function openDb(): Promise<IDBDatabase | null> {
  if (dbPromise) return dbPromise
  dbPromise = new Promise(resolve => {
    try {
      if (typeof indexedDB === 'undefined') return resolve(null)
      const req = indexedDB.open(DB_NAME, 1)
      req.onupgradeneeded = () => {
        const store = req.result.createObjectStore(STORE, { keyPath: ['attemptId', 'path'] })
        store.createIndex('byAttempt', 'attemptId')
      }
      req.onsuccess = () => resolve(req.result)
      req.onerror = () => resolve(null)
      req.onblocked = () => resolve(null)
    } catch {
      resolve(null)
    }
  })
  return dbPromise
}

/** True when files will outlive the tab. */
export async function isPersistent(): Promise<boolean> {
  return (await openDb()) !== null
}

function done(tx: IDBTransaction): Promise<void> {
  return new Promise((resolve, reject) => {
    tx.oncomplete = () => resolve()
    tx.onerror = () => reject(tx.error)
    tx.onabort = () => reject(tx.error)
  })
}

export async function listFiles(attemptId: string): Promise<StoredFile[]> {
  const db = await openDb()
  if (!db) return [...memory.values()].filter(f => f.attemptId === attemptId)
  return new Promise((resolve, reject) => {
    const req = db.transaction(STORE, 'readonly').objectStore(STORE).index('byAttempt').getAll(attemptId)
    req.onsuccess = () => resolve(req.result as StoredFile[])
    req.onerror = () => reject(req.error)
  })
}

export async function putFiles(files: StoredFile[]): Promise<void> {
  if (files.length === 0) return
  const db = await openDb()
  if (!db) {
    for (const f of files) memory.set(memKey(f.attemptId, f.path), f)
    return
  }
  const tx = db.transaction(STORE, 'readwrite')
  const store = tx.objectStore(STORE)
  for (const f of files) store.put(f)
  await done(tx)
}

export async function deleteFiles(attemptId: string, paths: string[]): Promise<void> {
  const db = await openDb()
  if (!db) {
    for (const p of paths) memory.delete(memKey(attemptId, p))
    return
  }
  const tx = db.transaction(STORE, 'readwrite')
  const store = tx.objectStore(STORE)
  for (const p of paths) store.delete([attemptId, p])
  await done(tx)
}

export async function deleteAttemptFiles(attemptId: string): Promise<void> {
  const files = await listFiles(attemptId)
  await deleteFiles(attemptId, files.map(f => f.path))
}
