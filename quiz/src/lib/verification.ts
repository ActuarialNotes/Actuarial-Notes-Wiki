import fm from 'front-matter'

/**
 * The read side of VERIFY — the content-validation layer that records what has
 * been checked, against what source, by whom, and when.
 *
 * The vault is the source of truth. Every content file carries a `verification:`
 * block in its frontmatter (written and policed by `scripts/verify_check.py`);
 * this module parses that block, and the append-only sidecar log that backs it,
 * for the surfaces that show a student what has been checked.
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

// ─── Badge presentation ──────────────────────────────────────────────────────

export type VerificationTone = 'green' | 'amber' | 'grey' | 'red'

export interface VerificationBadge {
  label: string
  tone: VerificationTone
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
 * What to show a student. Deliberately conservative: only a page whose status is
 * `verified` *and* whose hash still matches gets the green badge, and a page
 * carrying an open finding says so even when it was verified, because an open
 * finding is exactly the thing a reader needs to know about.
 */
export function verificationBadge(v: Verification | null | undefined): VerificationBadge {
  if (!v || v.status === 'unverified') {
    return {
      label: 'Unverified',
      tone: 'grey',
      detail: 'Not yet checked against a source.',
    }
  }
  if (v.status === 'disputed') {
    return {
      label: 'Disputed',
      tone: 'red',
      detail: 'Sources disagree, or a critical finding is unresolved. Read with care.',
    }
  }
  if (v.status === 'stale') {
    return {
      label: 'Re-check needed',
      tone: 'amber',
      detail: 'This page changed after it was last verified, so the check no longer applies.',
    }
  }
  if (v.status === 'in_review') {
    return {
      label: 'Under review',
      tone: 'amber',
      detail: 'A validation pass is in progress.',
    }
  }
  const date = formatCheckedDate(v.lastChecked)
  if (v.openFindings > 0) {
    return {
      label: date ? `Verified · ${date}` : 'Verified',
      tone: 'amber',
      detail: `Checked against ${v.sources.length} source${v.sources.length === 1 ? '' : 's'}, with ${v.openFindings} open finding${v.openFindings === 1 ? '' : 's'}.`,
    }
  }
  return {
    label: date ? `Verified · ${date}` : 'Verified',
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
  }

  return {
    target: attrs.target == null ? '' : String(attrs.target),
    created: attrs.created instanceof Date
      ? attrs.created.toISOString().slice(0, 10)
      : String(attrs.created ?? ''),
    entries,
  }
}

/**
 * Findings still open, accounting for later resolutions. Nothing in a log is
 * ever edited, so "is it still open" is always a question about what came after.
 */
export function openFindings(log: VerificationLog): LogEntry[] {
  const closed = new Set<string>()
  for (const entry of log.entries) {
    const closes = CLOSING.includes(entry.status as LogEntryStatus)
    if (entry.resolves && closes) closed.add(entry.resolves)
    if (closes) closed.add(entry.id)
  }
  return log.entries.filter((e) => e.entryType === 'finding' && !closed.has(e.id))
}

export function openCriticalFindings(log: VerificationLog): LogEntry[] {
  return openFindings(log).filter((e) => e.severity === 'critical')
}
