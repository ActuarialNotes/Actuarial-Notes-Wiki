import type { FactCheckTone } from '@/lib/verification'

/**
 * The **answerability** record of one question, for the Fact Check panel.
 *
 * `simulations/check-answerable` (docs/simulated-learner.md, *Answerability*)
 * lists what each served question's official solution uses and quotes where
 * the vault teaches each item; every run is merged into one committed record
 * per bank, `simulations/answerability/<bank>.json`, which
 * `scripts/answerability_lib.py` reads as the publication gate G8. A re-run
 * replaces a question's entry, and `resolve` / `not-required` stamp a
 * requirement with what closed it — so a question's history is its check and
 * the resolutions written on it since, which is what this module lays out.
 *
 * The record keeps what the check found, as of the check; the gate reads it
 * against the vault as it is *now*. So the panel shows both: the history as
 * recorded, and each requirement's state today (`requirementNow`) — what a
 * resolution closed, and what has come into reach since without one: a page
 * the question has been tagged with, or a page the exam's own learning
 * objectives link (D30). Whether a quote is still on its page, and a page
 * brought one link closer, stay G8's to check in CI against the vault.
 * The records are not bundled (they run to half a megabyte a bank); the panel
 * fetches one when it opens. Pure and tested.
 */

/** Where a requirement is taught, nearest first — `TIERS` in answerability_lib.py. */
export type AnswerabilityTier = 'tagged' | 'linked' | 'syllabus' | 'prerequisite' | 'elsewhere' | 'missing'

export interface AnswerabilityPlace {
  page: string
  quote: string
}

export interface AnswerabilityResolution {
  kind: 'taught' | 'not-required'
  note: string
  date: string
  page?: string
  quote?: string
}

export interface AnswerabilityRequirement {
  id: string
  kind: string
  statement: string
  concept: string
  status: AnswerabilityTier | string
  places: AnswerabilityPlace[]
  resolution?: AnswerabilityResolution
}

export interface AnswerabilityEntry {
  id: string
  path: string | null
  run: string
  verdict: string
  requirements: AnswerabilityRequirement[]
}

export interface AnswerabilityRecord {
  exam: string
  bank: string
  questions: Record<string, AnswerabilityEntry>
}

const QUESTION_PATH = /^questions\/([^/]+)\/([^/]+)\.md$/

/** The bank's record for a question file, or null for anything that isn't one. */
export function answerabilityRecordPath(contentPath: string): string | null {
  const m = QUESTION_PATH.exec(contentPath.replace(/^\/+/, ''))
  return m ? `simulations/answerability/${m[1]}.json` : null
}

function str(v: unknown): string {
  return typeof v === 'string' ? v : ''
}

function parsePlaces(v: unknown): AnswerabilityPlace[] {
  if (!Array.isArray(v)) return []
  return v
    .map((p) => ({ page: str(p?.page), quote: str(p?.quote) }))
    .filter((p) => p.page && p.quote)
}

function parseResolution(v: unknown): AnswerabilityResolution | undefined {
  if (!v || typeof v !== 'object') return undefined
  const r = v as Record<string, unknown>
  if (r.kind !== 'taught' && r.kind !== 'not-required') return undefined
  return {
    kind: r.kind,
    note: str(r.note),
    date: str(r.date),
    ...(r.kind === 'taught' ? { page: str(r.page), quote: str(r.quote) } : {}),
  }
}

/** The record as the panel reads it; null when the file isn't one. */
export function parseAnswerabilityRecord(raw: string): AnswerabilityRecord | null {
  let data: unknown
  try { data = JSON.parse(raw) } catch { return null }
  if (!data || typeof data !== 'object') return null
  const d = data as Record<string, unknown>
  if (!d.questions || typeof d.questions !== 'object') return null
  const questions: Record<string, AnswerabilityEntry> = {}
  for (const [id, value] of Object.entries(d.questions as Record<string, unknown>)) {
    if (!value || typeof value !== 'object') continue
    const q = value as Record<string, unknown>
    questions[id] = {
      id,
      path: str(q.path) || null,
      run: str(q.run),
      verdict: str(q.verdict),
      requirements: (Array.isArray(q.requirements) ? q.requirements : [])
        .filter((r): r is Record<string, unknown> => Boolean(r) && typeof r === 'object')
        .map((r) => ({
          id: str(r.id),
          kind: str(r.kind),
          statement: str(r.statement),
          concept: str(r.concept),
          status: str(r.status),
          places: parsePlaces(r.places),
          resolution: parseResolution(r.resolution),
        }))
        .filter((r) => r.statement),
    }
  }
  return { exam: str(d.exam), bank: str(d.bank), questions }
}

/**
 * A question's entry: the one recorded at its path, else under its file name
 * — the record is keyed by question id, which is the file name for every bank.
 */
export function answerabilityEntry(
  record: AnswerabilityRecord,
  contentPath: string,
): AnswerabilityEntry | null {
  const path = contentPath.replace(/^\/+/, '')
  const byPath = Object.values(record.questions).find((q) => q.path === path)
  if (byPath) return byPath
  const id = QUESTION_PATH.exec(path)?.[2]
  return (id && record.questions[id]) || null
}

/** `answerability-20261025-p` → `2026-10-25`; null for a run named any other way. */
export function runDate(run: string): string | null {
  const m = /(?:^|-)(\d{4})(\d{2})(\d{2})(?:-|$)/.exec(run)
  return m ? `${m[1]}-${m[2]}-${m[3]}` : null
}

export interface Label {
  label: string
  tone: FactCheckTone
}

/** A question's verdict — answerable, out of reach (`untagged`) or a gap. */
export const VERDICT_LABEL: Record<string, Label> = {
  answerable: { label: 'Answerable', tone: 'green' },
  untagged: { label: 'Out of reach', tone: 'amber' },
  gap: { label: 'Gap', tone: 'red' },
  'no requirements': { label: 'Nothing required', tone: 'grey' },
  error: { label: 'Check failed', tone: 'grey' },
}

export function verdictLabel(verdict: string): Label {
  return VERDICT_LABEL[verdict] ?? { label: verdict || 'Unknown', tone: 'grey' }
}

/** Where one requirement is taught, as the reader is told it. */
export const TIER_LABEL: Record<AnswerabilityTier, Label> = {
  tagged: { label: 'Tagged page', tone: 'green' },
  linked: { label: 'One link away', tone: 'green' },
  syllabus: { label: 'On the syllabus', tone: 'green' },
  prerequisite: { label: 'Prerequisite', tone: 'green' },
  elsewhere: { label: 'Out of reach', tone: 'amber' },
  missing: { label: 'Not taught', tone: 'red' },
}

/** A requirement's standing: what closed it if anything did, else where the check found it. */
export function requirementLabel(req: AnswerabilityRequirement): Label {
  if (req.resolution?.kind === 'not-required') return { label: 'Not required', tone: 'grey' }
  if (req.resolution?.kind === 'taught') return { label: 'Resolved', tone: 'green' }
  return TIER_LABEL[req.status as AnswerabilityTier] ?? { label: req.status || 'Unknown', tone: 'grey' }
}

const IN_REACH = new Set(['tagged', 'linked', 'syllabus', 'prerequisite'])

/**
 * One sentence on what the check found: how much the solution uses, and how
 * much of it a reader of this question's pages would meet.
 */
export function checkSentence(entry: AnswerabilityEntry): string {
  const reqs = entry.requirements
  if (reqs.length === 0) {
    return entry.verdict === 'error'
      ? 'The check couldn’t read this question.'
      : 'The check found nothing the solution needs from the notes.'
  }
  const count = (s: string) => reqs.filter((r) => r.status === s).length
  const reach = reqs.filter((r) => IN_REACH.has(r.status)).length
  const parts = [
    reach && `${reach} ${reach === 1 ? 'is' : 'are'} taught within its reach`,
    count('elsewhere') && `${count('elsewhere')} elsewhere in the notes`,
    count('missing') && `${count('missing')} on no page`,
  ].filter(Boolean) as string[]
  const things = `${reqs.length} ${reqs.length === 1 ? 'thing' : 'things'}`
  if (parts.length === 1 && reach === reqs.length) {
    return `The official solution uses ${things}, and every one is taught within its reach.`
  }
  const list = parts.length > 1
    ? `${parts.slice(0, -1).join(', ')} and ${parts[parts.length - 1]}`
    : parts[0]
  return `The official solution uses ${things}: ${list}.`
}

export type AnswerabilityEvent =
  | { kind: 'check'; key: string; date: string | null; entry: AnswerabilityEntry }
  | { kind: 'resolution'; key: string; date: string; requirement: AnswerabilityRequirement; resolution: AnswerabilityResolution }

/**
 * The question's history, newest first: its check, then each requirement a
 * reviewer closed since — by quoting a passage, or recording it isn't needed.
 */
export function answerabilityHistory(entry: AnswerabilityEntry): AnswerabilityEvent[] {
  const check: AnswerabilityEvent = { kind: 'check', key: `check:${entry.run}`, date: runDate(entry.run), entry }
  const resolutions: AnswerabilityEvent[] = entry.requirements
    .filter((r) => r.resolution)
    .map((r) => ({
      kind: 'resolution' as const,
      key: `resolution:${r.id}`,
      date: r.resolution!.date,
      requirement: r,
      resolution: r.resolution!,
    }))
  // Newest first; a resolution is never older than the check it closes an
  // item of, so a tie keeps the resolution on top.
  return [...resolutions, check].sort((a, b) => (b.date ?? '').localeCompare(a.date ?? ''))
}

/** A quote as prose: `[[Page|text]]` → text, `[[Page]]` → Page. Math is left for KaTeX. */
export function quoteText(quote: string): string {
  return quote.replace(/\[\[([^\]|]+)(?:\|([^\]]+))?\]\]/g, (_, page: string, text?: string) => text ?? page)
}

// ── Where each requirement stands now ──────────────────────────────────────

/**
 * What a question can reach today, beyond what the check recorded: the pages
 * it is tagged with (its `wiki_link`, read off the question as it is now), the
 * pages its exam's learning objectives link (D30), and the pages its exam
 * assumes (`prerequisitePages`). Page titles, compared without case — a
 * `[[link]]` opens its page by exact or case-folded title.
 */
export interface ReachNow {
  tagged: ReadonlySet<string>
  syllabus: ReadonlySet<string>
  prerequisite: ReadonlySet<string>
}

export function reachNow(tags: Iterable<string>, syllabus: Iterable<string>, prerequisite: Iterable<string> = []): ReachNow {
  const fold = (xs: Iterable<string>) => new Set([...xs].map((x) => x.trim().toLowerCase()).filter(Boolean))
  return { tagged: fold(tags), syllabus: fold(syllabus), prerequisite: fold(prerequisite) }
}

/**
 * Every page an exam assumes, as `prerequisite_pages` in answerability_lib.py
 * reads it: what the exam page's *Prerequisite knowledge* callout links — a
 * concept page as itself, an exam page as that exam's learning-objective
 * concepts — and, through each exam it names, what that exam assumes in turn.
 * `examPages` is the `Exam *.md` pages by file name; `objectivePages` gives an
 * exam's learning-objective concepts from its file name. Read off the pages,
 * never inferred: an exam page with no such callout assumes nothing.
 */
export function prerequisitePages(
  examFile: string,
  examPages: Readonly<Record<string, string>>,
  objectivePages: (examFile: string) => string[],
): string[] {
  const byTitle = new Map(Object.keys(examPages).map((f) => [f.replace(/\.md$/i, '').toLowerCase(), f]))
  const out = new Set<string>()
  const seen = new Set<string>()
  const todo = [examFile.endsWith('.md') ? examFile : `${examFile}.md`]
  while (todo.length) {
    const exam = todo.pop()!
    if (seen.has(exam) || !(exam in examPages)) continue
    seen.add(exam)
    for (const link of prerequisiteCalloutLinks(examPages[exam])) {
      const target = link.split('/').pop()!.trim()
      const examHit = byTitle.get(target.toLowerCase())
      if (examHit) {
        objectivePages(examHit).forEach((p) => out.add(p))
        todo.push(examHit)
      } else if (target) {
        out.add(target)
      }
    }
  }
  return [...out]
}

/** The `[[link]]` targets inside an exam page's `> [!question]- Prerequisite knowledge` callout. */
export function prerequisiteCalloutLinks(markdown: string): string[] {
  const lines = markdown.split('\n')
  const out: string[] = []
  for (let i = 0; i < lines.length; i++) {
    if (!/^>\s*\[!question\][-+]?\s*.*prerequisite/i.test(lines[i])) continue
    for (let j = i + 1; j < lines.length && /^>/.test(lines[j]); j++) {
      for (const m of lines[j].matchAll(/\[\[([^\]|#]+)(?:#[^\]|]*)?(?:\|[^\]]*)?\]\]/g)) out.push(m[1].trim())
    }
  }
  return out
}

/**
 * A question file's concept tags as page titles: each `wiki_link` entry's last
 * path segment, `+` read as a space (`Concepts/Bayes+Theorem` → `Bayes Theorem`),
 * the way `question_tags` in answerability_lib.py reads them.
 */
export function questionTagTitles(raw: string): string[] {
  const fm = /^---\s*\n([\s\S]*?)\n---\s*$/m.exec(raw)?.[1]
  if (!fm) return []
  const out: string[] = []
  let inList = false
  const add = (entry: string) => {
    const title = entry.trim().replace(/^["']|["']$/g, '').split('/').pop()!.replace(/\+/g, ' ').replace(/\.md$/, '').trim()
    if (title && !out.includes(title)) out.push(title)
  }
  for (const line of fm.split('\n')) {
    if (/^wiki_link:\s*$/.test(line)) { inList = true; continue }
    const inline = /^wiki_link:\s*\[(.*)\]\s*$/.exec(line)
    if (inline) { inline[1].split(',').forEach(add); inList = false; continue }
    const item = inList ? /^\s*-\s*(.+?)\s*$/.exec(line) : null
    if (item) add(item[1])
    else inList = false
  }
  return out
}

/** A requirement's state today: what closed it, or the nearest tier it is taught in. */
export type RequirementState = AnswerabilityTier | 'resolved' | 'not-required'

export interface RequirementNow {
  state: RequirementState
  /** The page it is taught on, when the state names one. */
  page?: string
}

/**
 * Where a requirement stands now. A resolution wins (it was proved in code when
 * it was written); else a place the check recorded is in reach as recorded;
 * else a place on a page the question is now tagged with, on the exam's
 * syllabus or on a page the exam assumes, brings it into reach; else it stands as the check found it.
 */
export function requirementNow(req: AnswerabilityRequirement, reach?: ReachNow): RequirementNow {
  if (req.resolution?.kind === 'not-required') return { state: 'not-required' }
  if (req.resolution?.kind === 'taught') return { state: 'resolved', page: req.resolution.page }
  if (IN_REACH.has(req.status)) return { state: req.status as AnswerabilityTier, page: req.places[0]?.page }
  if (reach) {
    for (const tier of ['tagged', 'syllabus', 'prerequisite'] as const) {
      const pages = reach[tier]
      const hit = req.places.find((p) => pages.has(p.page.toLowerCase()))
      if (hit) return { state: tier, page: hit.page }
    }
  }
  const status = req.status === 'missing' || req.status === 'elsewhere' ? req.status : 'missing'
  return { state: status, page: status === 'elsewhere' ? req.places[0]?.page : undefined }
}

/** True when a requirement no longer keeps the question from being answerable. */
export function isClosed(now: RequirementNow): boolean {
  return now.state === 'resolved' || now.state === 'not-required' || IN_REACH.has(now.state)
}

/** The label of a requirement's state today. */
export function stateLabel(now: RequirementNow): Label {
  if (now.state === 'not-required') return { label: 'Not required', tone: 'grey' }
  if (now.state === 'resolved') return { label: 'Resolved', tone: 'green' }
  return TIER_LABEL[now.state]
}

/**
 * The question's verdict today: answerable once every requirement is closed,
 * a gap while any is taught on no page, else out of reach. A check that failed,
 * or found nothing required, keeps its own verdict.
 */
export function verdictNow(entry: AnswerabilityEntry, reach?: ReachNow): string {
  if (entry.verdict === 'error' || entry.requirements.length === 0) return entry.verdict
  const states = entry.requirements.map((r) => requirementNow(r, reach))
  if (states.every(isClosed)) return 'answerable'
  return states.some((s) => s.state === 'missing') ? 'gap' : 'untagged'
}

/** One sentence on where the question stands today. */
export function nowSentence(entry: AnswerabilityEntry, reach?: ReachNow): string {
  const reqs = entry.requirements
  if (reqs.length === 0) return checkSentence(entry)
  const states = reqs.map((r) => requirementNow(r, reach))
  const open = states.filter((s) => !isClosed(s)).length
  const notRequired = states.filter((s) => s.state === 'not-required').length
  const things = `${reqs.length} ${reqs.length === 1 ? 'thing' : 'things'}`
  if (open === 0) {
    if (notRequired === 0) return 'Everything the solution uses is taught within its reach.'
    if (notRequired === reqs.length) return 'Nothing the solution uses needs to be taught in the notes.'
    return `Everything the solution uses is taught within its reach, but for ${notRequired} ${notRequired === 1 ? 'step' : 'steps'} the notes needn’t teach.`
  }
  return `${open} of the ${things} the solution uses ${open === 1 ? 'is' : 'are'} still open.`
}

