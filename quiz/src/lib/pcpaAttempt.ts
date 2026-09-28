/**
 * A PCPA project attempt: the brief it works, how it is being worked, the
 * files it starts with (`docs/pcpa-project.md`).
 *
 * The candidate picks the brief and one of two ways to work it (`AttemptMode`).
 * A **rehearsal** is the real conditions: the window opens the moment it
 * starts, runs sixteen days and closes, and a submission after the deadline is
 * no submission. **Practice** has no deadline, and the report is checked as it
 * is written instead of only after submission. The window is a consequence of
 * the mode, never a question of its own.
 *
 * Pure and tested; the stores that persist attempts and their files are
 * `hooks/usePcpaAttempts.ts` and `lib/project/fileStore.ts`.
 */

import { PROJECT_WINDOWS, WINDOW_DAYS, type ProjectCase } from '@/data/pcpaProjects'
import { CASE_IDS, type CaseId } from './pcpaData'
import type { Appendix } from './pcpaReport'
import type { AssessmentScore, Rating } from './pcpaAssessment'

/**
 * How an attempt is worked. `rehearsal` runs the real project's window and
 * holds feedback back until submission; `practice` has no deadline and checks
 * the report as it is written.
 */
export type AttemptMode = 'rehearsal' | 'practice'
export type Language = 'r' | 'python'

export interface ProjectAttempt {
  id: string
  caseId: CaseId
  seed: number
  mode: AttemptMode
  language: Language
  startedAt: number
  /** Epoch ms the window closes; null for a practice attempt. */
  deadline: number | null
  submittedAt: number | null
  report: { body: string; appendices: Appendix[] }
  answers: Record<string, string>
  attested: boolean
  /** Code files included with the submission, as workspace paths. */
  submittedCode: string[]
  ratings: Record<string, Rating>
  assessment: Pick<AssessmentScore, 'gini' | 'oracleGini' | 'captured' | 'balance' | 'verdict'> | null
  /** Milliseconds spent with the workspace open and in use. */
  activeMs: number
  /**
   * When the record last changed. Two devices editing one attempt settle on
   * the later of their two records (`lib/project/projectSync.ts`).
   */
  updatedAt: number
  /**
   * The account the attempt is saved to. Absent for one started signed out,
   * which stays in this browser until someone signs in and takes it with them.
   */
  owner?: string
}

/**
 * The mode of a saved attempt. Attempts saved before there were modes carry
 * `timing` instead — the window was the only choice then — and a timed one was
 * a rehearsal, an untimed one practice.
 */
export function savedMode(record: { mode?: unknown; timing?: unknown }): AttemptMode {
  if (record.mode === 'rehearsal' || record.mode === 'practice') return record.mode
  return record.timing === 'untimed' ? 'practice' : 'rehearsal'
}

/**
 * A saved attempt made whole, or null for one that can't be read. Records come
 * back from localStorage and from the account in whatever shape the version
 * that saved them wrote, so every field an older one may lack gets its default
 * here rather than at each place it is read.
 */
export function normalizeAttempt(raw: unknown): ProjectAttempt | null {
  if (!raw || typeof raw !== 'object') return null
  const a = raw as Partial<ProjectAttempt> & { timing?: unknown }
  if (typeof a.id !== 'string' || !(CASE_IDS as string[]).includes(a.caseId as string) || typeof a.seed !== 'number') return null
  const startedAt = typeof a.startedAt === 'number' ? a.startedAt : 0
  const submittedAt = typeof a.submittedAt === 'number' ? a.submittedAt : null
  return {
    ...(a as ProjectAttempt),
    startedAt,
    submittedAt,
    deadline: typeof a.deadline === 'number' ? a.deadline : null,
    language: a.language === 'python' ? 'python' : 'r',
    mode: savedMode(a),
    report: a.report && typeof a.report.body === 'string' ? { body: a.report.body, appendices: Array.isArray(a.report.appendices) ? a.report.appendices : [] } : { body: '', appendices: [] },
    answers: a.answers && typeof a.answers === 'object' ? a.answers : {},
    attested: a.attested === true,
    ratings: a.ratings && typeof a.ratings === 'object' ? a.ratings : {},
    submittedCode: Array.isArray(a.submittedCode) ? a.submittedCode : [],
    activeMs: typeof a.activeMs === 'number' ? a.activeMs : 0,
    assessment: a.assessment ?? null,
    updatedAt: typeof a.updatedAt === 'number' ? a.updatedAt : submittedAt ?? startedAt,
    owner: typeof a.owner === 'string' ? a.owner : undefined,
  }
}

/**
 * Whether the reader signed in as `userId` (null signed out) sees an attempt.
 * Signed in, it is their account's attempts, and any started signed out in
 * this browser — which signing in takes into the account. Signed out, only the
 * ones started signed out: an account's attempts stay with the account rather
 * than being left open to whoever uses the browser next.
 */
export function visibleTo(attempt: Pick<ProjectAttempt, 'owner'>, userId: string | null): boolean {
  return attempt.owner === undefined || (userId !== null && attempt.owner === userId)
}

// Where an attempt lives. Defined beside the attempt's views, which the
// sidebar reads without bringing this module (and the briefs) with it.
export { attemptRoute } from './attemptViews'

export type AttemptPhase = 'open' | 'closed' | 'submitted'

export function attemptPhase(attempt: Pick<ProjectAttempt, 'submittedAt' | 'deadline'>, now: number): AttemptPhase {
  if (attempt.submittedAt !== null) return 'submitted'
  if (attempt.deadline !== null && now > attempt.deadline) return 'closed'
  return 'open'
}

/** The deadline for a window that opens at `startedAt`: the end of its sixteenth day. */
export function windowDeadline(startedAt: number): number {
  const end = new Date(startedAt)
  end.setDate(end.getDate() + WINDOW_DAYS - 1)
  end.setHours(23, 59, 59, 999)
  return end.getTime()
}

export interface TimeLeft {
  ms: number
  label: string
  /** 'final' in the last 24 hours, 'soon' in the last 3 days. */
  urgency: 'calm' | 'soon' | 'final' | 'closed'
}

export function timeLeft(deadline: number, now: number): TimeLeft {
  const ms = deadline - now
  if (ms <= 0) return { ms: 0, label: 'Window closed', urgency: 'closed' }
  const minutes = Math.floor(ms / 60_000)
  const days = Math.floor(minutes / 1440)
  const hours = Math.floor((minutes % 1440) / 60)
  const mins = minutes % 60
  const label = days > 0 ? `${days}d ${hours}h left` : hours > 0 ? `${hours}h ${mins}m left` : `${mins}m left`
  const urgency = ms <= 86_400_000 ? 'final' : ms <= 3 * 86_400_000 ? 'soon' : 'calm'
  return { ms, label, urgency }
}

export function formatDuration(ms: number): string {
  const minutes = Math.round(ms / 60_000)
  const h = Math.floor(minutes / 60)
  const m = minutes % 60
  return h > 0 ? `${h}h ${m}m` : `${m}m`
}

export function newAttempt(opts: {
  id: string
  caseId: CaseId
  seed: number
  mode: AttemptMode
  language: Language
  now: number
  owner?: string
}): ProjectAttempt {
  return {
    id: opts.id,
    caseId: opts.caseId,
    seed: opts.seed,
    mode: opts.mode,
    language: opts.language,
    startedAt: opts.now,
    deadline: opts.mode === 'rehearsal' ? windowDeadline(opts.now) : null,
    submittedAt: null,
    report: { body: '', appendices: [] },
    answers: {},
    attested: false,
    submittedCode: [],
    ratings: {},
    assessment: null,
    activeMs: 0,
    updatedAt: opts.now,
    ...(opts.owner ? { owner: opts.owner } : {}),
  }
}

const MONTHS = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December']

function dateIn(label: string, year: number): Date {
  const [month, day] = label.split(' ')
  return new Date(year, MONTHS.indexOf(month), Number(day))
}

/** The next real project window whose submission deadline hasn't passed. */
export function nextRealWindow(now: Date): { opens: Date; closes: Date; registrationDeadline: Date } {
  for (const year of [now.getFullYear(), now.getFullYear() + 1]) {
    for (const w of PROJECT_WINDOWS) {
      const closes = dateIn(w.submissionDeadline, year)
      closes.setHours(23, 59, 59, 999)
      if (closes.getTime() >= now.getTime()) {
        return { opens: dateIn(w.opens, year), closes, registrationDeadline: dateIn(w.registrationDeadline, year) }
      }
    }
  }
  const w = PROJECT_WINDOWS[0]
  return { opens: dateIn(w.opens, now.getFullYear() + 1), closes: dateIn(w.submissionDeadline, now.getFullYear() + 1), registrationDeadline: dateIn(w.registrationDeadline, now.getFullYear() + 1) }
}

// ─── Workspace files ─────────────────────────────────────────────────────────

/** Where the project lives inside both runtimes, so relative paths agree. */
export const WORKSPACE_ROOT = '/project'

export type FileKind = 'r' | 'python' | 'csv' | 'sheet' | 'image' | 'markdown' | 'text' | 'binary'

export function fileKind(path: string): FileKind {
  const ext = path.split('.').pop()?.toLowerCase() ?? ''
  if (ext === 'r') return 'r'
  if (ext === 'py') return 'python'
  if (ext === 'csv') return 'csv'
  if (ext === 'sheet') return 'sheet'
  if (['png', 'jpg', 'jpeg', 'gif', 'svg', 'webp'].includes(ext)) return 'image'
  if (ext === 'md') return 'markdown'
  if (['txt', 'log', 'json', 'tsv', 'sas', 'yml', 'yaml'].includes(ext)) return 'text'
  return 'binary'
}

/** Whether a file is stored and synced as text. */
export function isTextKind(kind: FileKind): boolean {
  return kind === 'r' || kind === 'python' || kind === 'csv' || kind === 'sheet' || kind === 'markdown' || kind === 'text'
}

/** Data sets are the CAS's: read-only in the workspace, and never submitted. */
export function isDataPath(path: string): boolean {
  return path.startsWith('data/')
}

/** A tidy, safe workspace path: forward slashes, no leading slash, no `..`. */
export function normalizePath(path: string): string | null {
  const parts = path.replace(/\\/g, '/').split('/').filter(p => p && p !== '.')
  if (parts.some(p => p === '..')) return null
  const joined = parts.join('/')
  return joined || null
}

/**
 * The first script an attempt opens with. It reads the data and stops — the
 * CAS gives candidates no code, so the simulator gives only enough to show
 * where the files are.
 */
export function starterScript(language: Language, projectCase: ProjectCase): { path: string; text: string } {
  const files = projectCase.dictionary.map(d => d.file)
  const name = (file: string) => file.replace(/\.csv$/, '').replace(/[^a-z0-9]+/gi, '_')
  if (language === 'r') {
    return {
      path: 'code/analysis.R',
      text: [
        `# ${projectCase.title} — ${projectCase.company}`,
        '# The working directory is the project folder: data/ holds the data sets,',
        '# and anything you write to output/ is saved with the project.',
        '',
        ...files.map(f => `${name(f)} <- read.csv("data/${f}")`),
        '',
        ...files.map(f => `str(${name(f)})`),
        '',
      ].join('\n'),
    }
  }
  return {
    path: 'code/analysis.py',
    text: [
      `# ${projectCase.title} — ${projectCase.company}`,
      '# The working directory is the project folder: data/ holds the data sets,',
      '# and anything you write to output/ is saved with the project.',
      '',
      'import pandas as pd',
      '',
      ...files.map(f => `${name(f)} = pd.read_csv("data/${f}")`),
      '',
      ...files.map(f => `${name(f)}.info()`),
      '',
    ].join('\n'),
  }
}
