import type { WikiExamSyllabus } from '@/lib/wikiParser'
import type { ConceptMasteryRecord } from '@/lib/mastery'
import { buildMasteryLookup, resolveConceptState } from '@/lib/conceptMatch'

// Exam readiness scoring
//
// Each concept contributes partial credit based on its mastery level, so
// progress at Level 1/2 is reflected even before a concept reaches full
// mastery (Level 3). Because level3 decays naturally via the SR system
// (30-day threshold), no separate recency calculation is needed — the
// level itself already reflects current retention.
//
//   Concept credit = 0 (New/Forgotten), 1/3 (Level 1), 2/3 (Level 2), 1 (Level 3)
//   Section Readiness = Σ concept credit / topics in section
//   Overall Readiness = Σ (section readiness × section syllabus weight)
//
// Syllabus weight = midpoint of the section's exam weighting range.
//   e.g. "General Probability 23–30%" → weight = 26.5
// Sections with no weight tag receive weight = 1 (equal contribution).
// Adjust DECAY_DAYS_LEVEL3 in mastery.ts to tune how quickly level3 expires.

export function parseSectionWeight(weight?: string): number {
  if (!weight) return 1
  const range = weight.match(/(\d+)\s*[-–]\s*(\d+)%/)
  if (range) return (parseInt(range[1]) + parseInt(range[2])) / 2
  const single = weight.match(/(\d+)%/)
  return single ? parseInt(single[1]) : 1
}

export interface SectionReadiness {
  name: string
  weight: number       // syllabus midpoint weight (e.g. 26.5 for "23–30%")
  level1Count: number
  level2Count: number
  level3Count: number
  total: number
  readinessPct: number // 0–100, weighted progress credit (see above)
}

export interface ReadinessResult {
  overallPct: number           // 0–100, weighted average across sections
  sections: SectionReadiness[]
}

export function computeReadiness(
  syllabus: WikiExamSyllabus,
  records: ConceptMasteryRecord[],
  now: Date,
): ReadinessResult {
  const lookup = buildMasteryLookup(records)
  const sections: SectionReadiness[] = []
  let weightedSum = 0
  let totalWeight = 0

  for (const topic of syllabus.topics) {
    const weight = parseSectionWeight(topic.weight)
    let level1Count = 0, level2Count = 0, level3Count = 0
    const total = topic.concepts.length

    for (const concept of topic.concepts) {
      const state = resolveConceptState(lookup, concept, now)
      if (state === 'level3') level3Count++
      else if (state === 'level2') level2Count++
      else if (state === 'level1') level1Count++
    }

    const credit = level1Count * 1 + level2Count * 2 + level3Count * 3
    const readinessPct = total > 0 ? (credit / (total * 3)) * 100 : 0
    sections.push({ name: topic.name, weight, level1Count, level2Count, level3Count, total, readinessPct })
    weightedSum += readinessPct * weight
    totalWeight += weight
  }

  const overallPct = totalWeight > 0 ? weightedSum / totalWeight : 0
  return { overallPct, sections }
}
