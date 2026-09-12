// The sources a concept page is fact checked *against*.
//
// A page's `verification:` block records what a pass actually cited, and the
// Fact Check panel leads with those. But most of the vault has never been
// checked, and "Not fact checked" on its own tells a reader nothing about what
// checking would even mean here. What it would mean is concrete and already
// authored: a concept is taught by an exam, and that exam's study guide names
// the syllabus readings it is taught *from* (`## Source Material`). Those
// readings are the material a fact check draws on — rank 2 of the
// source-of-truth hierarchy in `docs/verification.md` — so the panel shows
// them, as the same resource cards the shelf and the resource page show.
//
// Pure and testable: the syllabi come from `hooks/useWikiSyllabus` (the
// build-time `virtual:exam-pages` bundle), so nothing here fetches.

import { findSyllabiForConcept } from '@/lib/conceptMatch'
import { compareExamLabels } from '@/lib/resourceExams'
import { examDisplayName, pathToEntryRef, entryRefToRepoPath } from '@/lib/wikiRoutes'
import type { WikiExamSyllabus } from '@/lib/wikiParser'

export interface FactCheckSource {
  /** Resource page name, as the syllabus links it. */
  name: string
  /** The raw `[[target]]`, for the route the card links to. */
  target: string
  /** Repo-relative path of the resource page, e.g. `Resources/Books/…md`. */
  path: string
  /** Exam labels whose syllabus lists it ("Exam P-1"), in ladder order. */
  exams: string[]
}

/**
 * The concept a content path names, or null for anything else. Only concept
 * pages have syllabus sources: a resource page *is* one, a question cites the
 * paper it was sat on, and an exam page is an outline with no claims of its own.
 */
export function conceptNameFromPath(contentPath: string | null | undefined): string | null {
  if (!contentPath) return null
  const ref = pathToEntryRef(contentPath)
  return ref?.kind === 'concept' && ref.name ? ref.name : null
}

/**
 * Where a source-material link's page lives. A bare `[[Basic Ratemaking …]]`
 * is a `Resources/Books` page — that is where every syllabus reading is
 * authored — while a link written as a path says so itself.
 */
export function resourcePagePath(target: string, name: string): string {
  if (target.includes('/')) {
    const ref = pathToEntryRef(target.endsWith('.md') ? target : `${target}.md`)
    if (ref) return entryRefToRepoPath(ref)
  }
  return `Resources/Books/${name}.md`
}

/** The label an exam is known by elsewhere in the app ("Exam P-1", "Exam 5"). */
function syllabusLabel(syllabus: WikiExamSyllabus): string {
  return examDisplayName(syllabus.fileName ?? syllabus.examLabel)
}

/**
 * The syllabus readings behind a concept — the union of the source material of
 * every exam that teaches it, in syllabus order, deduplicated by page name. A
 * concept taught by two exams (Expected Value is on both P and MAS-I) keeps one
 * card per source, carrying both exam labels.
 *
 * A concept no exam page links to yields nothing rather than every book in the
 * vault: there is no honest answer, and a list of unrelated sources would read
 * as one.
 */
export function factCheckSourcesForConcept(
  syllabi: WikiExamSyllabus[],
  conceptName: string,
): FactCheckSource[] {
  const sources: FactCheckSource[] = []
  const byName = new Map<string, FactCheckSource>()

  for (const syllabus of findSyllabiForConcept(syllabi, conceptName)) {
    const label = syllabusLabel(syllabus)
    for (const resource of syllabus.resources) {
      const name = resource.name.trim()
      if (!name) continue
      const key = name.toLowerCase()
      const existing = byName.get(key)
      if (existing) {
        if (label && !existing.exams.includes(label)) existing.exams.push(label)
        continue
      }
      const source: FactCheckSource = {
        name,
        target: resource.target || name,
        path: resourcePagePath(resource.target || name, name),
        exams: label ? [label] : [],
      }
      byName.set(key, source)
      sources.push(source)
    }
  }

  for (const source of sources) source.exams.sort(compareExamLabels)
  return sources
}

/** Every exam represented in a source list, in ladder order — for the heading. */
export function examsForSources(sources: FactCheckSource[]): string[] {
  const labels = new Set<string>()
  for (const source of sources) for (const exam of source.exams) labels.add(exam)
  return [...labels].sort(compareExamLabels)
}
