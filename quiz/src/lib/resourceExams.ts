// Which exam(s) a resource is a syllabus reading for.
//
// A `Resources/Books` page carries no `exam:` field — the relationship is
// authored the other way round, in each exam study guide's `Source Material`
// callout (see `lib/sourceMaterial.ts`). This module inverts those callouts
// into a resource-page-name → exam-labels map, which the wiki index hangs on
// its `document` items so a resource card can be tagged with the exam it
// belongs to without the shelf re-reading every exam page.
//
// Imports here are relative rather than `@/`-aliased: `vite.config.ts` pulls
// this module into its own Node graph to build the map at bundle time, and the
// alias only exists inside the app's build.

import { extractSourceMaterial } from './sourceMaterial'
import { examDisplayName } from './wikiRoutes'

export interface ExamPageSource {
  /** Exam page name, without the extension ("Exam P-1 (SOA)"). */
  name: string
  /** The page's raw markdown. */
  markdown: string
}

/** Resource page name (lowercased) → exam labels, in syllabus order. */
export type ResourceExamMap = Record<string, string[]>

// Preliminary exams, then the CAS upper exams in sitting order. A label that
// isn't listed (a new exam page) sorts after these, alphabetically, rather than
// being dropped.
const EXAM_ORDER = [
  'Exam P-1',
  'Exam FM-2',
  'Exam MAS-I',
  'Exam MAS-II',
  'Exam 5',
  'Exam 6C',
  'Exam 6U',
  'Exam 7',
  'Exam 8',
  'Exam 9',
]

/** The label a pill shows — the same name the exam grid and `TRACKS` use. */
export function examPillLabel(pageName: string): string {
  return examDisplayName(pageName)
}

export function compareExamLabels(a: string, b: string): number {
  const ra = EXAM_ORDER.indexOf(a)
  const rb = EXAM_ORDER.indexOf(b)
  if (ra !== rb) return (ra === -1 ? EXAM_ORDER.length : ra) - (rb === -1 ? EXAM_ORDER.length : rb)
  return a.localeCompare(b)
}

/**
 * Build the resource → exams map from the exam study guides. Pages with no
 * `Source Material` callout contribute nothing; a resource listed by two exams
 * gets both labels.
 */
export function buildResourceExamMap(pages: ExamPageSource[]): ResourceExamMap {
  const map: ResourceExamMap = {}
  for (const page of pages) {
    const label = examPillLabel(page.name)
    if (!label) continue
    for (const entry of extractSourceMaterial(page.markdown).entries) {
      const key = entry.name.trim().toLowerCase()
      if (!key) continue
      const labels = map[key] ?? (map[key] = [])
      if (!labels.includes(label)) labels.push(label)
    }
  }
  for (const labels of Object.values(map)) labels.sort(compareExamLabels)
  return map
}

/** The exams a resource page belongs to, or `[]` when it isn't a syllabus reading. */
export function examsForResource(map: ResourceExamMap | undefined, pageName: string): string[] {
  if (!map) return []
  return map[pageName.trim().toLowerCase()] ?? []
}
