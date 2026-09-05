import fm from 'front-matter'

/**
 * The read side of VERIFY — the content-validation layer that records what has
 * been checked, against what source, by whom, and when. **Fact Check** is what
 * that layer is called on screen; the vault's own schema keeps the older
 * `verification:` spelling, so this module reads one and speaks the other.
 *
 * The vault is the source of truth. Every content file carries a `verification:`
 * block in its frontmatter (written and policed by `scripts/verify_check.py`);
 * this module parses that block, and the append-only sidecar log that backs it,
 * for the Fact Check surfaces that show a student what has been checked.
 *
 * Two things worth keeping straight:
 *
 *  - The block is *bound to the bytes of the file*, not to its name. A file
 *    edited after being verified is downgraded to `stale` by tooling, so a green
 *    badge always describes the text actually on screen.
 *  - Sidecar logs are deliberately **not** bundled at build time. They grow
 *    without bound and only matter when a reader opens the log panel, so
 *    `fetchVerificationLog` pulls one on demand. Everything the badge needs —
 *    status, date, open-finding count — is in the block itself.
 */

export type VerificationStatus =
  | 'unverified'
  | 'in_review'
  | 'verified'
  | 'disputed'
  | 'stale'

export type VerificationConfidence = 'high' | 'medium' | 'low'

export interface Verification {
  status: VerificationStatus
  confidence: VerificationConfidence | null
  /** ISO `YYYY-MM-DD`, or null when the page has never been checked. */
  lastChecked: string | null
  /** `agent:validate-v1` or `human:jordan`, or null when never checked. */
  lastCheckedBy: string | null
  contentHash: string
  sources: string[]
  openFindings: number
  /**
   * How many of those are `critical`. Carried in the block rather than derived
   * from the log because sidecar logs are not bundled at build time, and the
   * quiz needs severity to decide what to exclude from a session.
   */
  openCritical: number
  /** Repo-relative path of the sidecar log, e.g. `.verify/Concepts/Convexity.md`. */
  log: string
}

const STATUSES: VerificationStatus[] = [
  'unverified', 'in_review', 'verified', 'disputed', 'stale',
]
const CONFIDENCES: VerificationConfidence[] = ['high', 'medium', 'low']

/** The block every page falls back to: nothing claimed, nothing checked. */
export const UNVERIFIED: Verification = {
  status: 'unverified',
  confidence: null,
  lastChecked: null,
  lastCheckedBy: null,
  contentHash: '',
  sources: [],
  openFindings: 0,
  openCritical: 0,
  log: '',
}

function asString(value: unknown): string | null {
  if (value == null) return null
  // js-yaml turns an unquoted `2026-08-23` into a Date; normalise back to ISO.
  if (value instanceof Date) return isNaN(value.getTime()) ? null : value.toISOString().slice(0, 10)
  const text = String(value).trim()
  return text === '' ? null : text
}

/**
 * Read the `verification:` block out of already-parsed frontmatter attributes.
 * Unknown or malformed values degrade to the `unverified` default rather than
 * throwing — a page must still render when its block is wrong; CI is what fails
 * on a malformed block, not the reader.
 */
export function verificationFromAttributes(attrs: unknown): Verification | null {
  if (attrs == null || typeof attrs !== 'object') return null
  const raw = (attrs as Record<string, unknown>).verification
  if (raw == null || typeof raw !== 'object') return null
  const block = raw as Record<string, unknown>

  const status = asString(block.status)
  const confidence = asString(block.confidence)
  const openFindings = Number(block.open_findings)
  const openCritical = Number(block.open_critical)

  return {
    status: STATUSES.includes(status as VerificationStatus)
      ? (status as VerificationStatus)
      : 'unverified',
    confidence: CONFIDENCES.includes(confidence as VerificationConfidence)
      ? (confidence as VerificationConfidence)
      : null,
    lastChecked: asString(block.last_checked),
    lastCheckedBy: asString(block.last_checked_by),
    contentHash: asString(block.content_hash) ?? '',
    sources: Array.isArray(block.sources)
      ? block.sources.map((s) => String(s).trim()).filter(Boolean)
      : [],
    openFindings: Number.isFinite(openFindings) && openFindings > 0 ? Math.floor(openFindings) : 0,
    openCritical: Number.isFinite(openCritical) && openCritical > 0 ? Math.floor(openCritical) : 0,
    log: asString(block.log) ?? '',
  }
}

/** Parse the block straight out of a markdown file's raw text. */
export function parseVerification(markdown: string): Verification | null {
  try {
    return verificationFromAttributes(fm<Record<string, unknown>>(markdown).attributes)
  } catch {
    return null
  }
}

/** Where a content file's sidecar log lives. Mirrors `verify_lib.log_path_for`. */
export function verificationLogPath(contentPath: string): string {
  return `.verify/${contentPath.replace(/^\/+/, '')}`
}

/**
 * Recover a page's own vault path from its block.
 *
 * Questions reach the app as raw markdown with no filename attached — the build
 * collects file *contents*, and a question's `id` doesn't map to its filename
 * (`cas5-2013f-q1` lives in `cas5-2013f-001.md`). But `log:` is that path with
 * `.verify/` on the front, and CI enforces that it is correct, so the block
 * carries the answer already.
 */
export function contentPathFromVerification(v: Verification | null | undefined): string | null {
  if (!v?.log?.startsWith('.verify/')) return null
  const path = v.log.slice('.verify/'.length)
  return path || null
}

// ─── Badge presentation ──────────────────────────────────────────────────────

export type FactCheckTone = 'green' | 'amber' | 'grey' | 'red'

export interface FactCheckBadge {
  label: string
  /** The same verdict in one or two words, for a dense row or a menu pill. */
  short: string
  tone: FactCheckTone
  /** One sentence explaining what the badge actually promises. */
  detail: string
}

const MONTHS = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec']

/** `2026-08-12` → `12 Aug 2026`. Parsed by hand: `new Date('2026-08-12')` is UTC. */
export function formatCheckedDate(iso: string | null): string | null {
  if (!iso) return null
  const m = /^(\d{4})-(\d{2})-(\d{2})$/.exec(iso.trim())
  if (!m) return null
  const month = MONTHS[Number(m[2]) - 1]
  if (!month) return null
  return `${Number(m[3])} ${month} ${m[1]}`
}

/**
 * What to show a student — the verdict the **Fact Check** surfaces read out.
 * Deliberately conservative: only a page whose status is `verified` *and* whose
 * hash still matches gets the green badge, and a page carrying an open finding
 * says so even when it was verified, because an open finding is exactly the
 * thing a reader needs to know about.
 */
export function factCheckBadge(v: Verification | null | undefined): FactCheckBadge {
  if (v && v.openCritical > 0 && v.status !== 'disputed') {
    // A critical finding outranks every other state: it is the one thing a
    // reader has to know before they trust the page.
    return {
      label: 'Known issue',
      short: 'Issue',
      tone: 'red',
      detail: `${v.openCritical} unresolved critical finding${v.openCritical === 1 ? '' : 's'} on this page.`,
    }
  }
  if (!v || v.status === 'unverified') {
    return {
      label: 'Not fact checked',
      short: 'Unchecked',
      tone: 'grey',
      detail: 'Not yet checked against a source.',
    }
  }
  if (v.status === 'disputed') {
    return {
      label: 'Disputed',
      short: 'Disputed',
      tone: 'red',
      detail: 'Sources disagree, or something critical is unresolved.',
    }
  }
  if (v.status === 'stale') {
    return {
      label: 'Re-check needed',
      short: 'Re-check',
      tone: 'amber',
      detail: 'Edited since it was last checked.',
    }
  }
  if (v.status === 'in_review') {
    return {
      label: 'Under review',
      short: 'Review',
      tone: 'amber',
      detail: 'A fact check is in progress.',
    }
  }
  const date = formatCheckedDate(v.lastChecked)
  if (v.openCritical > 0) {
    return {
      label: 'Known issue',
      short: 'Issue',
      tone: 'red',
      detail: `${v.openCritical} unresolved critical finding${v.openCritical === 1 ? '' : 's'} on this page.`,
    }
  }
  if (v.openFindings > 0) {
    return {
      label: date ? `Fact checked · ${date}` : 'Fact checked',
      short: 'Checked',
      tone: 'amber',
      detail: `Checked against ${v.sources.length} source${v.sources.length === 1 ? '' : 's'}, with ${v.openFindings} open finding${v.openFindings === 1 ? '' : 's'}.`,
    }
  }
  return {
    label: date ? `Fact checked · ${date}` : 'Fact checked',
    short: 'Checked',
    tone: 'green',
    detail: `Checked against ${v.sources.length} source${v.sources.length === 1 ? '' : 's'}.`,
  }
}

// ─── Sidecar logs ────────────────────────────────────────────────────────────

export type LogEntryType = 'finding' | 'correction' | 'comment' | 'question' | 'resolution'
export type LogEntrySeverity = 'critical' | 'major' | 'minor' | 'nit'
export type LogEntryStatus = 'open' | 'resolved' | 'wontfix' | 'superseded'

export interface LogEntry {
  id: string
  title: string
  entryType: LogEntryType | ''
  author: string
  date: string
  severity: LogEntrySeverity | ''
  status: LogEntryStatus | ''
  resolves: string
  /**
   * Whether the correction this finding proposed has already been made to the
   * page. Independent of `status`: a fix can land before a human signs the
   * finding off, and the Fact Check panel marks such a row so a reader can see
   * that the text in front of them has already been changed.
   */
  applied: boolean
  /** Every `- key: value` field, in source order, for display. */
  fields: Array<{ key: string; value: string }>
}

export interface VerificationLog {
  target: string
  created: string
  entries: LogEntry[]
}

const ENTRY_HEADING = /^##\s+\[([^\]]+)\]\s*(.*)$/
const ENTRY_FIELD = /^-\s+([A-Za-z_][A-Za-z0-9_]*):\s?(.*)$/

/** Statuses that close the finding an entry `resolves:`. Mirrors verify_lib. */
const CLOSING: LogEntryStatus[] = ['resolved', 'wontfix', 'superseded']

/**
 * Parse a sidecar log. Tolerant on purpose — a human can open one of these in
 * Obsidian and append a comment by hand, and their entry has to survive the
 * round trip into the next agent sweep verbatim.
 */
export function parseVerificationLog(raw: string): VerificationLog {
  let attrs: Record<string, unknown> = {}
  let body = raw
  try {
    const parsed = fm<Record<string, unknown>>(raw)
    attrs = (parsed.attributes ?? {}) as Record<string, unknown>
    body = parsed.body
  } catch {
    body = raw.replace(/^---\n[\s\S]*?\n---\n?/, '')
  }

  const entries: LogEntry[] = []
  let current: LogEntry | null = null
  let lastField: string | null = null

  const setField = (key: string, value: string) => {
    if (!current) return
    const existing = current.fields.find((f) => f.key === key)
    if (existing) existing.value = value
    else current.fields.push({ key, value })
  }

  for (const line of body.split('\n')) {
    const heading = ENTRY_HEADING.exec(line)
    if (heading) {
      current = {
        id: heading[1].trim(),
        title: heading[2].trim(),
        entryType: '', author: '', date: '', severity: '', status: '', resolves: '',
        applied: false,
        fields: [],
      }
      entries.push(current)
      lastField = null
      continue
    }
    if (!current) continue
    const field = ENTRY_FIELD.exec(line)
    if (field) {
      lastField = field[1]
      setField(lastField, field[2].trim())
      continue
    }
    if (lastField && /^[ \t]/.test(line) && line.trim()) {
      // A wrapped value: `evidence:` prose routinely runs to several lines.
      const existing = current.fields.find((f) => f.key === lastField)
      if (existing) existing.value = `${existing.value} ${line.trim()}`.trim()
      continue
    }
    if (!line.trim()) lastField = null
  }

  for (const entry of entries) {
    const get = (key: string) => entry.fields.find((f) => f.key === key)?.value ?? ''
    entry.entryType = get('entry_type').toLowerCase() as LogEntryType | ''
    entry.author = get('author')
    entry.date = get('date')
    entry.severity = get('severity').toLowerCase() as LogEntrySeverity | ''
    entry.status = get('status').toLowerCase() as LogEntryStatus | ''
    entry.resolves = get('resolves')
    entry.applied = get('applied').toLowerCase() === 'true'
  }

  return {
    target: attrs.target == null ? '' : String(attrs.target),
    created: attrs.created instanceof Date
      ? attrs.created.toISOString().slice(0, 10)
      : String(attrs.created ?? ''),
    entries,
  }
}

/** Every entry id that something later in the log has closed. */
function closedEntryIds(log: VerificationLog): Set<string> {
  const closed = new Set<string>()
  for (const entry of log.entries) {
    const closes = CLOSING.includes(entry.status as LogEntryStatus)
    if (entry.resolves && closes) closed.add(entry.resolves)
    if (closes) closed.add(entry.id)
  }
  return closed
}

/**
 * Findings still open, accounting for later resolutions. Nothing in a log is
 * ever edited, so "is it still open" is always a question about what came after.
 */
export function openFindings(log: VerificationLog): LogEntry[] {
  const closed = closedEntryIds(log)
  return log.entries.filter((e) => e.entryType === 'finding' && !closed.has(e.id))
}

export function openCriticalFindings(log: VerificationLog): LogEntry[] {
  return openFindings(log).filter((e) => e.severity === 'critical')
}

// ─── Panel presentation ──────────────────────────────────────────────────────

export interface SourceSummary {
  /** The source's name — what a reader recognises it by. */
  label: string
  /** Where it can be read, when the citation names a URL. */
  url: string | null
}

const SOURCE_URL = /https?:\/\/[^\s)>\]]+/

/**
 * Cut a cited source down to the part worth printing.
 *
 * A citation is written for an auditor, not a reader: it carries the URL, a
 * sha256 of the exact file that was read, a version string and the pages the
 * claim was checked on. All of that has to stay in the vault — it is what makes
 * the check reproducible — but on screen it buries the one thing a student
 * wants, which is *which book*. So the name is what the panel shows, the URL
 * becomes the link, and the provenance moves to the link's accessible name.
 *
 * The convention is `<name> — <where it was checked>`; with no dash, everything
 * before the URL is the name.
 */
export function summarizeSource(raw: string): SourceSummary {
  const text = (raw ?? '').trim()
  const match = SOURCE_URL.exec(text)
  const url = match ? match[0].replace(/[.,;:]+$/, '') : null

  let label = text.split(/\s+[—–]\s+/)[0]
  if (label === text && match) label = text.slice(0, match.index)
  label = label.replace(/[\s—–,:;(-]+$/, '').trim()
  if (!label) label = url ?? text
  return { label, url }
}

export interface LogEntryGroup {
  entry: LogEntry
  /** The later entry that closed it, when one exists. */
  closedBy: LogEntry | null
}

/**
 * A page's log, split into the three things a reader is actually asking:
 * what is still wrong, what has been put right, and what people have said.
 */
export interface LogSummary {
  /** Open findings, worst first. */
  open: LogEntryGroup[]
  /** Findings something later closed, plus standalone corrections. */
  resolved: LogEntryGroup[]
  /** Comments and questions — reader reports, mostly. */
  notes: LogEntryGroup[]
}

const SEVERITY_ORDER: Record<string, number> = {
  critical: 0, major: 1, minor: 2, nit: 3,
}

export function summarizeLog(log: VerificationLog): LogSummary {
  const closed = closedEntryIds(log)
  const closers = new Map<string, LogEntry>()
  for (const entry of log.entries) {
    if (entry.resolves && CLOSING.includes(entry.status as LogEntryStatus)) {
      closers.set(entry.resolves, entry)
    }
  }

  const summary: LogSummary = { open: [], resolved: [], notes: [] }
  for (const entry of log.entries) {
    // A resolution belongs to the finding it closes; listing it separately would
    // say the same thing twice, in two places, out of order.
    if (entry.resolves && closers.get(entry.resolves) === entry) continue
    const group: LogEntryGroup = { entry, closedBy: closers.get(entry.id) ?? null }
    if (entry.entryType === 'finding') {
      if (closed.has(entry.id)) summary.resolved.push(group)
      else summary.open.push(group)
    } else if (entry.entryType === 'correction' || entry.entryType === 'resolution') {
      summary.resolved.push(group)
    } else {
      summary.notes.push(group)
    }
  }

  summary.open.sort((a, b) =>
    (SEVERITY_ORDER[a.entry.severity] ?? 9) - (SEVERITY_ORDER[b.entry.severity] ?? 9))
  return summary
}


/**
 * Should this page be kept out of a quiz session by default?
 *
 * True when something critical is on file about it: an unresolved critical
 * finding, or a `disputed` status (which means either sources conflict or a
 * critical finding is unresolved). Serving a student a question that the record
 * says is wrong is the exact failure this whole layer exists to prevent — but it
 * is a *default*, not a lock, because reviewing flagged questions is how they get
 * fixed. `hooks/useShowFlaggedQuestions.ts` is the toggle.
 */
export function hasCriticalFinding(v: Verification | null | undefined): boolean {
  if (!v) return false
  return v.openCritical > 0 || v.status === 'disputed'
}
