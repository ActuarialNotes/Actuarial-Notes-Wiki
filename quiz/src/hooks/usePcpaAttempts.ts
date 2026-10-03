import { create } from 'zustand'
import { newAttempt, normalizeAttempt, visibleTo, type AttemptMode, type Language, type ProjectAttempt } from '@/lib/pcpaAttempt'
import type { CaseId } from '@/lib/pcpaData'
import { deleteAttemptFiles } from '@/lib/project/fileStore'
import { queueAttemptDelete, queueAttemptPush, registerOwnerLookup } from '@/lib/project/projectSync'
import { trackProjectStarted } from '@/lib/analytics'

/**
 * The candidate's PCPA project attempts (`docs/pcpa-project.md`).
 *
 * The record is small — the report, the answers, the ratings — and sits in
 * localStorage, written synchronously on every change; the workspace's files
 * (megabytes of data and plots) live in IndexedDB under the attempt's id
 * (`lib/project/fileStore.ts`). An attempt with an `owner` is also kept with
 * that account: every change is queued for it (`lib/project/projectSync.ts`),
 * and `hooks/useProjectSync.ts` folds the account's attempts back in.
 */

const STORAGE_KEY = 'pcpa.attempts'

function load(): ProjectAttempt[] {
  try {
    const raw = localStorage.getItem(STORAGE_KEY)
    if (!raw) return []
    const parsed = JSON.parse(raw) as unknown
    if (!Array.isArray(parsed)) return []
    return parsed.map(normalizeAttempt).filter((a): a is ProjectAttempt => a !== null)
  } catch {
    return []
  }
}

function persist(attempts: ProjectAttempt[]) {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(attempts))
  } catch { /* ignore quota errors */ }
}

function newId(): string {
  return `p-${Date.now().toString(36)}-${Math.random().toString(36).slice(2, 8)}`
}

interface PcpaAttemptsState {
  attempts: ProjectAttempt[]
  /**
   * `seed` reuses an earlier attempt's data; a fresh one is drawn without it.
   * `owner` is the signed-in account, which the attempt is saved to.
   */
  create: (opts: { caseId: CaseId; mode: AttemptMode; language: Language; seed?: number; owner?: string }) => ProjectAttempt
  update: (id: string, patch: Partial<ProjectAttempt> | ((a: ProjectAttempt) => Partial<ProjectAttempt>)) => void
  remove: (id: string) => Promise<void>
  /** Replace the list with one reconciled against the account. Queues nothing. */
  hydrate: (attempts: ProjectAttempt[]) => void
}

export const usePcpaAttempts = create<PcpaAttemptsState>((set, get) => {
  const commit = (attempts: ProjectAttempt[]) => {
    persist(attempts)
    set({ attempts })
  }
  return {
    attempts: load(),
    create: ({ caseId, mode, language, seed, owner }) => {
      const attempt = newAttempt({
        id: newId(),
        caseId,
        // Any 32-bit seed; the attempt's data is a function of it.
        seed: seed ?? Math.floor(Math.random() * 0xffffffff) >>> 0,
        mode,
        language,
        now: Date.now(),
        owner,
      })
      commit([attempt, ...get().attempts])
      queueAttemptPush(attempt)
      trackProjectStarted({ project: caseId, mode, language })
      return attempt
    },
    update: (id, patch) => {
      let changed: ProjectAttempt | undefined
      commit(get().attempts.map(a => {
        if (a.id !== id) return a
        changed = { ...a, ...(typeof patch === 'function' ? patch(a) : patch), updatedAt: Date.now() }
        return changed
      }))
      if (changed) queueAttemptPush(changed)
    },
    remove: async id => {
      const gone = get().attempts.find(a => a.id === id)
      commit(get().attempts.filter(a => a.id !== id))
      queueAttemptDelete(id, gone?.owner)
      await deleteAttemptFiles(id)
    },
    hydrate: attempts => commit(attempts),
  }
})

registerOwnerLookup(id => usePcpaAttempts.getState().attempts.find(a => a.id === id)?.owner)

/** The attempt `id`, if the reader signed in as `userId` (null signed out) can see it. */
export function useAttempt(id: string | undefined, userId: string | null): ProjectAttempt | undefined {
  return usePcpaAttempts(s => s.attempts.find(a => a.id === id && visibleTo(a, userId)))
}
