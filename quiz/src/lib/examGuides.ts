import type { WikiEntryRef } from '@/lib/wikiRoutes'

/**
 * The exam-page orientation guide: the list of tip pages behind an exam's
 * "How to Study" card.
 *
 * The tips are vault content — one markdown page each, under
 * `Guides/<exam page>/<tip>.md` — so they are written, linked and read exactly
 * like a concept page, and open in the same concept viewer. This module is the
 * pure half: it turns the flat list the build-time collector emits
 * (`virtual:exam-guides`, see `vite.config.ts`) into one guide per exam, in
 * reading order. `data/examGuides.ts` applies it to the bundle; the card and
 * its list live in `components/wiki/ExamGuideCards.tsx`.
 *
 * Reading order is authored, not inferred: each page carries an `order:` in its
 * frontmatter, which is what puts the exam-day format page — how many
 * questions, how long you get for each — ahead of the advice about what to
 * study. A page with no `order:` sorts last, alphabetically, rather than
 * silently landing in the middle of the run.
 */

/** One tip page, as the build-time collector emits it. */
export interface ExamGuideFile {
  /** Wiki exam id (`p-1`, `mas-i`, `5-1`) — `examIdFromFile` of the folder. */
  examId: string
  /** The exam page the folder belongs to, e.g. `Exam MAS-I (CAS).md`. */
  examPage: string
  /** How the exam is named on the card, e.g. `Exam MAS-I`. */
  examLabel: string
  /** The tip's title — its file name. */
  title: string
  /** Repo path of the tip page. */
  path: string
  /** Position in the guide, from the page's `order:` frontmatter. */
  order: number | null
}

export interface ExamGuidePage {
  title: string
  /** What the concept viewer opens — always carries an explicit `path`. */
  ref: WikiEntryRef
}

export interface ExamGuide {
  examId: string
  /** Repo path of the exam page these tips belong to. */
  examPage: string
  /** The exam, as named on the card: `Exam MAS-I`. */
  examLabel: string
  pages: ExamGuidePage[]
}

/**
 * What the card calls itself. The exam it is for is the line under it, not part
 * of this string, so the two cards of the orientation row stay the same shape.
 */
export const GUIDE_TITLE = 'How to Study'

/** The card's full name, for a screen reader and the popup's label. */
export function guideLabel(guide: ExamGuide): string {
  return `${GUIDE_TITLE} for ${guide.examLabel}`
}

function comparePages(a: ExamGuideFile, b: ExamGuideFile): number {
  // An unordered page sorts after every ordered one, then by title — so a tip
  // added without frontmatter joins the end of the guide instead of jumping it.
  if (a.order !== b.order) {
    if (a.order == null) return 1
    if (b.order == null) return -1
    return a.order - b.order
  }
  return a.title.localeCompare(b.title)
}

/** Group the collected tip pages into one guide per exam, in reading order. */
export function buildExamGuides(files: ExamGuideFile[]): Record<string, ExamGuide> {
  const byExam = new Map<string, ExamGuideFile[]>()
  for (const file of files) {
    const key = file.examId.toLowerCase()
    const list = byExam.get(key)
    if (list) list.push(file)
    else byExam.set(key, [file])
  }

  const guides: Record<string, ExamGuide> = {}
  for (const [examId, list] of byExam) {
    if (list.length === 0) continue
    const sorted = [...list].sort(comparePages)
    guides[examId] = {
      examId,
      examPage: sorted[0].examPage,
      examLabel: sorted[0].examLabel,
      pages: sorted.map(file => ({
        title: file.title,
        // The path is carried explicitly: a tip's name is unique only within
        // its exam's folder ("Scoring" exists five times over), so the folder
        // is the only thing that says which page to fetch.
        ref: { kind: 'guide', name: file.title, path: file.path },
      })),
    }
  }
  return guides
}
