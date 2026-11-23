import type { StudyPlan } from '@/lib/studyPlan'
import { wikiExamIdToProgressKey, type WikiExamSyllabus } from '@/lib/wikiParser'
import { bankLabelFor } from '@/lib/examIds'
import { compareExamLabels } from '@/lib/resourceExams'
import { examDisplayName } from '@/lib/wikiRoutes'

// Facts about an exam page that more than one surface reads: its ids, the bank
// its Practice buttons draw from, the study guides a reading belongs to, and
// today's cached plan. Pure and tested.

/**
 * An exam page's own exam id, from its vault file name — "Exam 6U (CAS)" →
 * `6U`, "Exam P-1 (SOA)" → `P-1`. The id the syllabus parser gives the page,
 * which tells apart the variants that share a progress key.
 */
export function examPageIdFromFile(fileName: string): string {
  return fileName
    .replace(/\.md$/i, '')
    .replace(/^Exam\s+/i, '')
    .replace(/\s*\([^)]*\)\s*$/, '')
    .trim()
}

/**
 * The exam_progress key (`P`, `MAS-I`, `CAS-9`) of an exam page, from its vault
 * file name — "Exam 9 (CAS)" → `CAS-9`, "Exam P-1 (SOA)" → `P`.
 */
export function examProgressKeyFromFile(fileName: string): string {
  return wikiExamIdToProgressKey(examPageIdFromFile(fileName))
}

/**
 * The question bank an exam page's **Start Quiz** row draws from — the `exam:`
 * label its questions carry and the quiz builder's `topic` ("Exam P-1 (SOA)" →
 * `Probability`, "Exam 6C (CAS)" → `Exam 6C`) — or undefined for an exam with
 * no bank (6U, PCPA), whose row is greyed out. Read through
 * `bankLabelFor`, so 6U doesn't borrow 6C's questions through their shared key.
 */
export function examQuizTopic(fileName: string): string | undefined {
  return bankLabelFor({ examId: examPageIdFromFile(fileName) })
}

/**
 * The study guide a quiz bank answers to — the exam page whose **Start Quiz**
 * draws from `topic` — as its vault file name, or undefined when no page does.
 * The inverse of `examQuizTopic`, so the quiz builder's **Study Guide** button
 * and the study guide's **Start Quiz** button are one round trip.
 */
export function examStudyGuideFor(syllabi: WikiExamSyllabus[], topic: string): string | undefined {
  if (!topic) return undefined
  return syllabi.find(s => s.fileName && examQuizTopic(s.fileName) === topic)?.fileName
}

/**
 * The study guides a resource is a reading for — the exam pages whose `Source
 * Material` callout links it — in ladder order (Exam P before Exam 7). Empty
 * when no exam lists it, which is what greys out a resource's **Open in Study
 * Guide** row. Matched on the page name, case-insensitively, the way the
 * syllabus links it.
 */
export function studyGuidesForResource(
  syllabi: WikiExamSyllabus[],
  resourceName: string,
): WikiExamSyllabus[] {
  const needle = resourceName.trim().toLowerCase()
  if (!needle) return []
  return syllabi
    .filter(s => s.fileName && s.resources.some(r => r.name.trim().toLowerCase() === needle))
    .sort((a, b) => compareExamLabels(examDisplayName(a.fileName!), examDisplayName(b.fileName!)))
}


/**
 * Today's concepts from an exam's cached plan, or null when there is no plan
 * for today — none generated, generated on an earlier day (the Dashboard
 * regenerates it), or an empty day.
 */
export function todaysPlanConcepts(
  cache: Pick<StudyPlan, 'generatedDate' | 'todaysConcepts'> | null | undefined,
  today: string,
): string[] | null {
  if (!cache || cache.generatedDate !== today || !cache.todaysConcepts?.length) return null
  return cache.todaysConcepts
}

