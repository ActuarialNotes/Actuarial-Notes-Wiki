/**
 * A PCPA project attempt: the window it runs in, the case it drew, the files it
 * starts with (`docs/pcpa-project.md`).
 *
 * The real project opens on a fixed date, runs sixteen days and closes; a
 * submission after the deadline is no submission. An attempt here does the
 * same from the moment the candidate starts it — or, for someone practising a
 * piece at a time, runs untimed. Which case an attempt gets is drawn, not
 * chosen, as the CAS assigns "a specific project selected from a pool".
 *
 * Pure and tested; the stores that persist attempts and their files are
 * `hooks/usePcpaAttempts.ts` and `lib/project/fileStore.ts`.
 */

import { PROJECT_CASES, PROJECT_WINDOWS, WINDOW_DAYS, type ProjectCase } from '@/data/pcpaProjects'
import type { CaseId } from './pcpaData'
import type { Appendix } from './pcpaReport'
import type { AssessmentScore, Rating } from './pcpaAssessment'

export type Timing = 'window' | 'untimed'
export type Language = 'r' | 'python'

export interface ProjectAttempt {
  id: string
  caseId: CaseId
  seed: number
  timing: Timing
  language: Language
  startedAt: number
  /** Epoch ms the window closes; null for an untimed attempt. */
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
}

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

/**
 * Draws the case for a new attempt: one this candidate hasn't attempted yet
 * where possible, the least-attempted otherwise.
 */
export function drawCase(previous: CaseId[], random: number): CaseId {
  const counts = new Map<CaseId, number>(PROJECT_CASES.map(c => [c.id, 0]))
  for (const id of previous) counts.set(id, (counts.get(id) ?? 0) + 1)
  const fewest = Math.min(...counts.values())
  const pool = PROJECT_CASES.map(c => c.id).filter(id => counts.get(id) === fewest)
  return pool[Math.min(pool.length - 1, Math.floor(random * pool.length))]
}

export function newAttempt(opts: {
  id: string
  caseId: CaseId
  seed: number
  timing: Timing
  language: Language
  now: number
}): ProjectAttempt {
  return {
    id: opts.id,
    caseId: opts.caseId,
    seed: opts.seed,
    timing: opts.timing,
    language: opts.language,
    startedAt: opts.now,
    deadline: opts.timing === 'window' ? windowDeadline(opts.now) : null,
    submittedAt: null,
    report: { body: '', appendices: [] },
    answers: {},
    attested: false,
    submittedCode: [],
    ratings: {},
    assessment: null,
    activeMs: 0,
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
