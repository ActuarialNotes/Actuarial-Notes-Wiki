// Builds and downloads a branded PDF "progress report" of the user's performance
// data. Used by the "Export performance data" control in Settings, alongside the
// CSV export in exportData.ts.
//
// Where the CSV is a raw, question-level dump for spreadsheets, the PDF is a
// human-readable summary: headline stats (questions answered, accuracy, average
// time) plus per-exam and per-topic accuracy breakdowns, laid out on a clean,
// Actuarial-Notes-branded page. Both are driven from the same ExportedResponse
// rows fetched by fetchExportResponses, so the two exports always agree.
//
// The aggregation (buildProgressReport) is pure and unit-tested; the rendering
// (generateProgressReportPdf) draws with jsPDF and is exercised in the browser.

import type { jsPDF } from 'jspdf'
import type { ExportedResponse } from '@/lib/exportData'

/** One row of a per-exam or per-topic accuracy breakdown. */
export interface BreakdownRow {
  label: string
  answered: number
  correct: number
  /** Fraction in [0, 1]; 0 when nothing has been answered. */
  accuracy: number
}

/** The aggregated shape the PDF renders. Pure summary of the answered rows. */
export interface ProgressReport {
  answered: number
  correct: number
  incorrect: number
  /** Fraction in [0, 1]. */
  accuracy: number
  /** Mean answer time over rows that recorded one, in seconds; null if none did. */
  avgTimeSeconds: number | null
  /** Number of distinct calendar days (UTC) the user answered on. */
  daysStudied: number
  /** ISO date of the earliest / latest answer, or null when there are no rows. */
  firstAnsweredAt: string | null
  lastAnsweredAt: string | null
  byExam: BreakdownRow[]
  byTopic: BreakdownRow[]
}

function accuracyOf(correct: number, answered: number): number {
  return answered > 0 ? correct / answered : 0
}

/**
 * Groups rows by a key (exam or topic), tallying answered/correct/accuracy, and
 * returns the groups sorted by volume (most-answered first). Blank/absent keys
 * fold into a single "Uncategorized" bucket so nothing is silently dropped.
 */
function groupBy(rows: ExportedResponse[], key: 'exam' | 'topic'): BreakdownRow[] {
  const buckets = new Map<string, { answered: number; correct: number }>()
  for (const row of rows) {
    const raw = row[key]
    const label = raw && raw.trim() ? raw.trim() : 'Uncategorized'
    const bucket = buckets.get(label) ?? { answered: 0, correct: 0 }
    bucket.answered += 1
    if (row.is_correct) bucket.correct += 1
    buckets.set(label, bucket)
  }
  return [...buckets.entries()]
    .map(([label, { answered, correct }]) => ({ label, answered, correct, accuracy: accuracyOf(correct, answered) }))
    .sort((a, b) => b.answered - a.answered || a.label.localeCompare(b.label))
}

/** Aggregates answered-question rows into the summary the PDF renders. Pure. */
export function buildProgressReport(rows: ExportedResponse[]): ProgressReport {
  const answered = rows.length
  const correct = rows.reduce((n, r) => n + (r.is_correct ? 1 : 0), 0)

  const timed = rows.filter(r => typeof r.time_spent_seconds === 'number') as (ExportedResponse & { time_spent_seconds: number })[]
  const avgTimeSeconds = timed.length > 0
    ? timed.reduce((sum, r) => sum + r.time_spent_seconds, 0) / timed.length
    : null

  const days = new Set<string>()
  let first: string | null = null
  let last: string | null = null
  for (const r of rows) {
    if (!r.answered_at) continue
    days.add(r.answered_at.slice(0, 10))
    if (first === null || r.answered_at < first) first = r.answered_at
    if (last === null || r.answered_at > last) last = r.answered_at
  }

  return {
    answered,
    correct,
    incorrect: answered - correct,
    accuracy: accuracyOf(correct, answered),
    avgTimeSeconds,
    daysStudied: days.size,
    firstAnsweredAt: first,
    lastAnsweredAt: last,
    byExam: groupBy(rows, 'exam'),
    byTopic: groupBy(rows, 'topic'),
  }
}

/** Builds a descriptive, filesystem-safe filename for the PDF export. */
export function buildPdfFilename(scopeSlug: string, date = new Date()): string {
  const day = date.toISOString().slice(0, 10)
  return `actuarial-notes-progress-report-${scopeSlug}-${day}.pdf`
}

/** Formats a seconds count as "1m 05s" / "45s" for the summary card. */
export function formatDuration(seconds: number | null): string {
  if (seconds === null) return '—'
  const rounded = Math.round(seconds)
  if (rounded < 60) return `${rounded}s`
  const m = Math.floor(rounded / 60)
  const s = rounded % 60
  return `${m}m ${String(s).padStart(2, '0')}s`
}

/** Formats an ISO timestamp as a short "Mon D, YYYY" date for the header line. */
function formatDate(iso: string | null): string {
  if (!iso) return '—'
  const d = new Date(iso)
  if (Number.isNaN(d.getTime())) return '—'
  return d.toLocaleDateString('en-US', { year: 'numeric', month: 'short', day: 'numeric' })
}

// ---------------------------------------------------------------------------
// Rendering
// ---------------------------------------------------------------------------

// Brand palette (matches the app's "colourful" theme: violet primary + accents).
const VIOLET: [number, number, number] = [124, 58, 237]
const VIOLET_SOFT: [number, number, number] = [237, 233, 254]
const INK: [number, number, number] = [24, 24, 27]
const MUTED: [number, number, number] = [113, 113, 122]
const BORDER: [number, number, number] = [228, 228, 231]
const ZEBRA: [number, number, number] = [250, 250, 250]
const GREEN: [number, number, number] = [22, 163, 74]
const AMBER: [number, number, number] = [217, 119, 6]
const RED: [number, number, number] = [220, 38, 38]

const LOGO_URL = '/actuarialnotes-logo-black-512.png'

/** Loads the app logo as a data URL for embedding; resolves null on any failure. */
async function loadLogoDataUrl(): Promise<string | null> {
  try {
    const res = await fetch(LOGO_URL)
    if (!res.ok) return null
    const blob = await res.blob()
    return await new Promise<string | null>(resolve => {
      const reader = new FileReader()
      reader.onloadend = () => resolve(typeof reader.result === 'string' ? reader.result : null)
      reader.onerror = () => resolve(null)
      reader.readAsDataURL(blob)
    })
  } catch {
    return null
  }
}

/** Picks an accuracy colour: green ≥ 75%, amber ≥ 50%, red below. */
function accuracyColor(accuracy: number): [number, number, number] {
  if (accuracy >= 0.75) return GREEN
  if (accuracy >= 0.5) return AMBER
  return RED
}

const pct = (fraction: number): string => `${Math.round(fraction * 100)}%`

export interface ProgressReportOptions {
  /** Human-readable scope, e.g. "All exams" or "Exam P". Shown in the header. */
  scopeLabel: string
  /** Who the report is for — display name or email. Shown in the header. */
  owner: string
}

/**
 * Renders `report` as a branded PDF and returns the jsPDF document. Logo
 * embedding is best-effort — a fetch failure degrades to a text-only header
 * rather than throwing. Separated from the download so it can be unit-tested.
 */
export async function renderProgressReportPdf(
  report: ProgressReport,
  opts: ProgressReportOptions,
): Promise<jsPDF> {
  // Dynamically imported so jsPDF (and its transitive deps) is code-split out of
  // the main bundle and only fetched when a user actually exports a PDF.
  const { jsPDF } = await import('jspdf')
  const doc = new jsPDF({ unit: 'pt', format: 'letter' })
  const pageW = doc.internal.pageSize.getWidth()
  const pageH = doc.internal.pageSize.getHeight()
  const margin = 44
  const contentW = pageW - margin * 2

  const logo = await loadLogoDataUrl()

  // ---- Header band -------------------------------------------------------
  const headerH = 96
  doc.setFillColor(...VIOLET)
  doc.rect(0, 0, pageW, headerH, 'F')

  if (logo) {
    // White rounded badge so the black logo mark reads on the violet band.
    doc.setFillColor(255, 255, 255)
    doc.roundedRect(margin, 26, 44, 44, 9, 9, 'F')
    doc.addImage(logo, 'PNG', margin + 5, 31, 34, 34)
  }

  const textX = logo ? margin + 60 : margin
  doc.setTextColor(255, 255, 255)
  doc.setFont('helvetica', 'bold')
  doc.setFontSize(22)
  doc.text('Progress Report', textX, 50)
  doc.setFont('helvetica', 'normal')
  doc.setFontSize(11)
  doc.setTextColor(237, 233, 254)
  doc.text(`${opts.scopeLabel}  ·  ${opts.owner}`, textX, 70)

  // Generated date, right-aligned in the band.
  doc.setFontSize(9)
  doc.text(`Generated ${formatDate(new Date().toISOString())}`, pageW - margin, 40, { align: 'right' })
  if (report.firstAnsweredAt) {
    doc.text(
      `${formatDate(report.firstAnsweredAt)} – ${formatDate(report.lastAnsweredAt)}`,
      pageW - margin,
      56,
      { align: 'right' },
    )
  }

  let y = headerH + 30

  // ---- Empty state -------------------------------------------------------
  if (report.answered === 0) {
    doc.setTextColor(...INK)
    doc.setFont('helvetica', 'bold')
    doc.setFontSize(14)
    doc.text('No answered questions yet', margin, y + 6)
    doc.setFont('helvetica', 'normal')
    doc.setFontSize(11)
    doc.setTextColor(...MUTED)
    doc.text('Complete a quiz to start building your progress report.', margin, y + 26)
    drawFooters(doc, pageW, pageH, margin)
    return doc
  }

  // ---- Summary cards -----------------------------------------------------
  const cards: { label: string; value: string; tint?: [number, number, number] }[] = [
    { label: 'Questions answered', value: String(report.answered) },
    { label: 'Accuracy', value: pct(report.accuracy), tint: accuracyColor(report.accuracy) },
    { label: 'Correct / incorrect', value: `${report.correct} / ${report.incorrect}` },
    { label: 'Avg. time / question', value: formatDuration(report.avgTimeSeconds) },
  ]
  const gap = 12
  const cardW = (contentW - gap * (cards.length - 1)) / cards.length
  const cardH = 62
  cards.forEach((card, i) => {
    const x = margin + i * (cardW + gap)
    doc.setDrawColor(...BORDER)
    doc.setFillColor(...ZEBRA)
    doc.roundedRect(x, y, cardW, cardH, 7, 7, 'FD')
    doc.setFont('helvetica', 'normal')
    doc.setFontSize(8)
    doc.setTextColor(...MUTED)
    doc.text(card.label.toUpperCase(), x + 12, y + 20)
    doc.setFont('helvetica', 'bold')
    doc.setFontSize(20)
    doc.setTextColor(...(card.tint ?? INK))
    doc.text(card.value, x + 12, y + 46)
  })

  y += cardH + 16
  doc.setFont('helvetica', 'normal')
  doc.setFontSize(9)
  doc.setTextColor(...MUTED)
  doc.text(
    `Studied across ${report.daysStudied} ${report.daysStudied === 1 ? 'day' : 'days'}.`,
    margin,
    y,
  )
  y += 22

  // ---- Breakdown tables --------------------------------------------------
  const MAX_TOPIC_ROWS = 15
  const topicRows = report.byTopic.slice(0, MAX_TOPIC_ROWS)
  const hiddenTopics = report.byTopic.length - topicRows.length

  y = drawBreakdownTable(doc, 'Performance by exam', report.byExam, {
    firstCol: 'Exam',
    x: margin,
    y,
    width: contentW,
    pageH,
    margin,
    pageW,
  })

  y += 26
  y = drawBreakdownTable(doc, 'Performance by topic', topicRows, {
    firstCol: 'Topic',
    x: margin,
    y,
    width: contentW,
    pageH,
    margin,
    pageW,
  })
  if (hiddenTopics > 0) {
    doc.setFont('helvetica', 'italic')
    doc.setFontSize(8)
    doc.setTextColor(...MUTED)
    doc.text(
      `+ ${hiddenTopics} more ${hiddenTopics === 1 ? 'topic' : 'topics'} — see the CSV export for the full breakdown.`,
      margin,
      y + 14,
    )
  }

  drawFooters(doc, pageW, pageH, margin)
  return doc
}

/**
 * Renders `report` as a branded PDF and triggers a browser download under
 * `filename`.
 */
export async function generateProgressReportPdf(
  report: ProgressReport,
  opts: ProgressReportOptions,
  filename: string,
): Promise<void> {
  const doc = await renderProgressReportPdf(report, opts)
  doc.save(filename)
}

interface TableCtx {
  firstCol: string
  x: number
  y: number
  width: number
  pageH: number
  pageW: number
  margin: number
}

/**
 * Draws a titled 3-column breakdown table (label · answered · accuracy-with-bar),
 * paginating when it runs past the bottom margin, and returns the y cursor below
 * the table.
 */
function drawBreakdownTable(doc: jsPDF, title: string, rows: BreakdownRow[], ctx: TableCtx): number {
  const { x, width, pageH, margin } = ctx
  let y = ctx.y
  const rowH = 24
  const bottomLimit = pageH - 56

  // Column geometry.
  const answeredW = 70
  const barW = 130
  const barCol = x + width - barW
  const answeredCol = barCol - answeredW
  const labelW = answeredCol - x - 10

  const ensureRoom = (needed: number) => {
    if (y + needed <= bottomLimit) return
    doc.addPage()
    y = margin
  }

  // Title.
  ensureRoom(28 + rowH)
  doc.setFont('helvetica', 'bold')
  doc.setFontSize(13)
  doc.setTextColor(...INK)
  doc.text(title, x, y)
  y += 12

  // Header row.
  const drawHeader = () => {
    doc.setFillColor(...VIOLET_SOFT)
    doc.rect(x, y, width, rowH, 'F')
    doc.setFont('helvetica', 'bold')
    doc.setFontSize(8)
    doc.setTextColor(...VIOLET)
    doc.text(ctx.firstCol.toUpperCase(), x + 8, y + 16)
    doc.text('ANSWERED', answeredCol, y + 16)
    doc.text('ACCURACY', barCol, y + 16)
    y += rowH
  }
  drawHeader()

  if (rows.length === 0) {
    doc.setFont('helvetica', 'italic')
    doc.setFontSize(9)
    doc.setTextColor(...MUTED)
    doc.text('No data for this scope.', x + 8, y + 15)
    return y + rowH
  }

  rows.forEach((row, i) => {
    if (y + rowH > bottomLimit) {
      doc.addPage()
      y = margin
      drawHeader()
    }
    if (i % 2 === 1) {
      doc.setFillColor(...ZEBRA)
      doc.rect(x, y, width, rowH, 'F')
    }

    doc.setFont('helvetica', 'normal')
    doc.setFontSize(9)
    doc.setTextColor(...INK)
    doc.text(truncate(doc, row.label, labelW), x + 8, y + 15)
    doc.setTextColor(...MUTED)
    doc.text(String(row.answered), answeredCol, y + 15)

    // Accuracy bar: gray track, colour-coded fill, percent label.
    const trackY = y + 8
    const trackH = 7
    const trackW = barW - 40
    doc.setFillColor(...BORDER)
    doc.roundedRect(barCol, trackY, trackW, trackH, 3, 3, 'F')
    const fill = accuracyColor(row.accuracy)
    const fillW = Math.max(row.accuracy > 0 ? 4 : 0, trackW * row.accuracy)
    if (fillW > 0) {
      doc.setFillColor(...fill)
      doc.roundedRect(barCol, trackY, fillW, trackH, 3, 3, 'F')
    }
    doc.setFont('helvetica', 'bold')
    doc.setFontSize(9)
    doc.setTextColor(...fill)
    doc.text(pct(row.accuracy), barCol + trackW + 8, y + 15)

    y += rowH
  })

  // Bottom border.
  doc.setDrawColor(...BORDER)
  doc.line(x, y, x + width, y)
  return y
}

/** Truncates `text` with an ellipsis so it fits within `maxWidth` points. */
function truncate(doc: jsPDF, text: string, maxWidth: number): string {
  if (doc.getTextWidth(text) <= maxWidth) return text
  let str = text
  while (str.length > 1 && doc.getTextWidth(`${str}…`) > maxWidth) {
    str = str.slice(0, -1)
  }
  return `${str}…`
}

/** Stamps a footer (brand line + page numbers) onto every page. */
function drawFooters(doc: jsPDF, pageW: number, pageH: number, margin: number): void {
  const total = doc.getNumberOfPages()
  for (let i = 1; i <= total; i++) {
    doc.setPage(i)
    doc.setDrawColor(...BORDER)
    doc.line(margin, pageH - 40, pageW - margin, pageH - 40)
    doc.setFont('helvetica', 'normal')
    doc.setFontSize(8)
    doc.setTextColor(...MUTED)
    doc.text('Actuarial Notes · Progress Report', margin, pageH - 26)
    doc.text(`Page ${i} of ${total}`, pageW - margin, pageH - 26, { align: 'right' })
  }
}
