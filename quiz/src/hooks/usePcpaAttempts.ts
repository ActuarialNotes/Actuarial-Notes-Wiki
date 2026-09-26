import { create } from 'zustand'
import { newAttempt, type Language, type ProjectAttempt, type Timing } from '@/lib/pcpaAttempt'
import { CASE_IDS, type CaseId } from '@/lib/pcpaData'
import { deleteAttemptFiles } from '@/lib/project/fileStore'

/**
 * The candidate's PCPA project attempts (`docs/pcpa-project.md`).
 *
 * localStorage only, like Cowork's stores: an attempt is practice, kept on the
 * device it was made on. The record is small — the report, the answers, the
 * ratings — and the workspace's files (megabytes of data and plots) live in
 * IndexedDB under the attempt's id (`lib/project/fileStore.ts`).
 */

const STORAGE_KEY = 'pcpa.attempts'

function load(): ProjectAttempt[] {
  try {
    const raw = localStorage.getItem(STORAGE_KEY)
    if (!raw) return []
    const parsed = JSON.parse(raw) as ProjectAttempt[]
    if (!Array.isArray(parsed)) return []
    return parsed.filter(a =>
      a && typeof a.id === 'string' && (CASE_IDS as string[]).includes(a.caseId) && typeof a.seed === 'number',
    ).map(a => ({
      ...a,
      report: a.report && typeof a.report.body === 'string' ? { body: a.report.body, appendices: Array.isArray(a.report.appendices) ? a.report.appendices : [] } : { body: '', appendices: [] },
      answers: a.answers && typeof a.answers === 'object' ? a.answers : {},
      ratings: a.ratings && typeof a.ratings === 'object' ? a.ratings : {},
      submittedCode: Array.isArray(a.submittedCode) ? a.submittedCode : [],
      activeMs: typeof a.activeMs === 'number' ? a.activeMs : 0,
      assessment: a.assessment ?? null,
    }))
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
  create: (opts: { caseId: CaseId; timing: Timing; language: Language }) => ProjectAttempt
  update: (id: string, patch: Partial<ProjectAttempt> | ((a: ProjectAttempt) => Partial<ProjectAttempt>)) => void
  remove: (id: string) => Promise<void>
}

export const usePcpaAttempts = create<PcpaAttemptsState>((set, get) => {
  const commit = (attempts: ProjectAttempt[]) => {
    persist(attempts)
    set({ attempts })
  }
  return {
    attempts: load(),
    create: ({ caseId, timing, language }) => {
      const attempt = newAttempt({
        id: newId(),
        caseId,
        // Any 32-bit seed; the attempt's data is a function of it.
        seed: Math.floor(Math.random() * 0xffffffff) >>> 0,
        timing,
        language,
        now: Date.now(),
      })
      commit([attempt, ...get().attempts])
      return attempt
    },
    update: (id, patch) => {
      commit(get().attempts.map(a => (a.id === id ? { ...a, ...(typeof patch === 'function' ? patch(a) : patch) } : a)))
    },
    remove: async id => {
      commit(get().attempts.filter(a => a.id !== id))
      await deleteAttemptFiles(id)
    },
  }
})

export function useAttempt(id: string | undefined): ProjectAttempt | undefined {
  return usePcpaAttempts(s => s.attempts.find(a => a.id === id))
}
