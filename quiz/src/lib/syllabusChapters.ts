// The study guide's chapters: an exam page's **main learning objectives**, laid
// out along the bar that sits under the sticky header
// (`components/wiki/SyllabusChapterBar.tsx`).
//
// The same idea as the exam-PDF reader's chapters (`lib/pdfChapters.ts`), on the
// other kind of long document this app asks people to read. A syllabus page is
// three to six objectives and a bibliography; which one you are in, and how much
// of the exam it is worth, is the thing you actually navigate by — "70% of the
// way down the page" is not.
//
// Two things make this bar different from the PDF's, and both come from the
// content:
//
//  1. **The segments are sized by exam weight, not by how much page they take
//     up.** An objective worth 44–50% of the exam is half the bar, even when its
//     callout is collapsed to a 48px strip like every other one. That is the
//     shape of the syllabus, which is what a candidate is orienting against; it
//     is also the idiom the objective callouts themselves already use, filling
//     their own row to their share of the exam.
//  2. **The bar's units are those weights**, so its position is "how much of the
//     exam's material is behind you". Scrolling maps into the current
//     objective's span, so the fill still moves smoothly as you read, and a
//     scrub maps back out to a scroll offset.
//
// Weights are read off the page (`{23-30%}`, parsed by `lib/examWeight.ts`) and
// never invented: a page whose objectives carry no weights gets even segments,
// which claims nothing.
//
// Pure. The measuring — where each objective's callout sits in the document —
// is the component's half.

import { parseExamWeight } from './examWeight'

/**
 * The bar's resolution. Positions are thousandths of the exam's material, which
 * is fine enough that a 2%-weighted objective still gets ~20 positions to scroll
 * through and coarse enough to stay well inside integer arithmetic.
 */
export const SYLLABUS_BAR_UNITS = 1000

/** One objective's callout, as the page renders it. */
export interface MeasuredObjective {
  /** The objective's name, from the callout title (weight tag already split off). */
  title: string
  /** The weight tag verbatim — "23-30%", "45–55%" — or '' when it carries none. */
  weight: string
  /** Document y of the callout's first pixel. */
  top: number
  /** Document y just past its last. */
  bottom: number
}

/** An objective once it knows its stretch of the bar and of the page. */
export interface SyllabusChapter extends MeasuredObjective {
  /** 1-indexed first position of its stretch of the bar. */
  start: number
  /** 1-indexed last position, inclusive. */
  end: number
}

/**
 * Each objective's share of the bar, summing to 1.
 *
 * Proportional to the weights only when *every* objective has one: a page with
 * some weights missing can't be laid out by weight without inventing the rest,
 * so it falls back to even shares, which say nothing about the exam either way.
 */
export function objectiveShares(weights: (string | null | undefined)[]): number[] {
  const count = weights.length
  if (count === 0) return []
  const parsed = weights.map(w => parseExamWeight(w))
  const total = parsed.reduce<number>((sum, w) => sum + (w ?? 0), 0)
  if (parsed.some(w => w === null || !(w > 0)) || !(total > 0)) {
    return new Array<number>(count).fill(1 / count)
  }
  return parsed.map(w => (w as number) / total)
}

/**
 * The chapters, from the objectives as measured on the page.
 *
 * Objectives are put in page order and given two spans: their stretch of the
 * bar (by weight) and their stretch of the page — which runs to wherever the
 * next objective starts, so the gap between two callouts belongs to the one
 * above it. The last objective keeps its own bottom edge, because what follows
 * it is the source-material shelf rather than more syllabus.
 *
 * Returns `[]` for fewer than two objectives: one chapter covering a page is
 * not a chapter list, and a page with no objectives at all is not a syllabus.
 */
export function buildSyllabusChapters(
  objectives: MeasuredObjective[],
  total: number = SYLLABUS_BAR_UNITS,
): SyllabusChapter[] {
  if (!Number.isFinite(total) || total < 2) return []

  const usable = objectives
    .filter(o =>
      !!o &&
      o.title.trim() !== '' &&
      Number.isFinite(o.top) &&
      Number.isFinite(o.bottom) &&
      o.bottom > o.top)
    .sort((a, b) => a.top - b.top)
  if (usable.length < 2) return []
  // More objectives than the bar has positions to give each one is not a case
  // any syllabus reaches, but the arithmetic below would hand out zero-width
  // stretches if it did.
  if (usable.length > total) return []

  const shares = objectiveShares(usable.map(o => o.weight))

  const chapters: SyllabusChapter[] = []
  let cumulative = 0
  let start = 1
  for (let i = 0; i < usable.length; i++) {
    cumulative += shares[i]
    // Each boundary is rounded off the *cumulative* share rather than by adding
    // up rounded widths, so the rounding can't drift and the last stretch
    // always ends exactly on `total`. Every stretch keeps at least one
    // position, and enough room is left for the ones still to come.
    const remaining = usable.length - 1 - i
    const end = i === usable.length - 1
      ? total
      : Math.min(total - remaining, Math.max(start, Math.round(cumulative * total)))
    const objective = usable[i]
    const next = usable[i + 1]
    chapters.push({
      ...objective,
      bottom: next ? Math.max(objective.bottom, next.top) : objective.bottom,
      start,
      end,
    })
    start = end + 1
  }
  return chapters
}

/** The chapter a bar position falls in, or null when it falls outside them all. */
export function chapterAtPosition(chapters: SyllabusChapter[], position: number): SyllabusChapter | null {
  if (!Number.isFinite(position)) return null
  const at = Math.round(position)
  return chapters.find(c => at >= c.start && at <= c.end) ?? null
}

/**
 * Where the bar sits for a given reading line — the document y just under the
 * sticky header, which is what the reader is actually looking at.
 *
 * Above the first objective the bar is at the start (a syllabus's lead-in is
 * before the material, not part of it); below the last it is full. Inside one,
 * it is proportionally along that objective's own stretch, so the fill keeps
 * moving as you read a long section instead of jumping between chapters.
 */
export function chapterPositionForScroll(chapters: SyllabusChapter[], viewTop: number): number {
  if (chapters.length === 0 || !Number.isFinite(viewTop)) return 1
  const first = chapters[0]
  const last = chapters[chapters.length - 1]
  if (viewTop <= first.top) return first.start
  if (viewTop >= last.bottom) return last.end

  for (const chapter of chapters) {
    if (viewTop >= chapter.bottom) continue
    const height = chapter.bottom - chapter.top
    const fraction = height > 0 ? (viewTop - chapter.top) / height : 0
    const span = chapter.end - chapter.start
    return chapter.start + Math.round(Math.min(1, Math.max(0, fraction)) * span)
  }
  return last.end
}

/**
 * The inverse: the document y a bar position means, for a press or a drag.
 *
 * The exact inverse of `chapterPositionForScroll`, so letting go of the bar
 * leaves it where the finger was rather than a nudge off it.
 */
export function scrollForChapterPosition(chapters: SyllabusChapter[], position: number): number {
  if (chapters.length === 0 || !Number.isFinite(position)) return 0
  const chapter = chapterAtPosition(chapters, position) ?? (
    position < chapters[0].start ? chapters[0] : chapters[chapters.length - 1]
  )
  const span = chapter.end - chapter.start
  const fraction = span > 0
    ? Math.min(1, Math.max(0, (Math.round(position) - chapter.start) / span))
    : 0
  return chapter.top + fraction * (chapter.bottom - chapter.top)
}
