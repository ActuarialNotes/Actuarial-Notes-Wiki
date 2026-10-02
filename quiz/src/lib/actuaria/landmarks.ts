// **Landmarks** — a sector's concepts, as its screens list them
// (docs/actuaria-online.md §6.3–6.5).
//
// A sector's regions are its exam's learning objectives, in the syllabus's own
// order and with their own weights, and a region's landmarks are the concepts
// its callout names. Each landmark carries its Credibility (the mastery state,
// decay applied at read time through `resolveConceptState` — never a second
// clock) and the next step of orbital decay projected from the same record.

import { landmarkName } from '@/data/actuariaLandmarks'
import { buildMasteryLookup, lookupConceptRecord, resolveConceptState } from '@/lib/conceptMatch'
import { isSyllabusConcept } from '@/lib/syllabusChapters'
import type { ConceptMasteryRecord, MasteryState } from '@/lib/mastery'
import type { WikiConcept, WikiExamSyllabus } from '@/lib/wikiParser'
import { describeDecayStep, landmarkZ, nextDecayStep, type DecayStep } from './credibility'

export interface Landmark {
  concept: WikiConcept
  /** The in-world name, or null when the concept is its own name. */
  inWorldName: string | null
  state: MasteryState
  z: number
  decay: DecayStep | null
}

export interface Region {
  name: string
  /** "23-30%", as the syllabus writes it. */
  weight?: string
  landmarks: Landmark[]
}

/** Within this many days a decay step is "soon" — the Daily Transmission's horizon. */
export const DECAY_SOON_DAYS = 7

/**
 * The sector's regions and their landmarks. `records` are the player's mastery
 * rows for this exam (filtered by `exam_id`, the way every readiness surface
 * filters them).
 */
export function sectorRegions(
  syllabus: WikiExamSyllabus,
  records: readonly ConceptMasteryRecord[],
  now: Date,
): Region[] {
  const lookup = buildMasteryLookup([...records])

  return syllabus.topics.map(topic => {
    const seen = new Set<string>()
    const landmarks: Landmark[] = []
    for (const concept of topic.concepts) {
      const id = concept.name.toLowerCase()
      // A reading named inside an objective is a source, not a place.
      if (seen.has(id) || !isLandmark(concept)) continue
      seen.add(id)
      const state = resolveConceptState(lookup, concept, now)
      landmarks.push({
        concept,
        inWorldName: landmarkName(concept),
        state,
        z: landmarkZ(state),
        decay: nextDecayStep(lookupConceptRecord(lookup, concept), now),
      })
    }
    return { name: topic.name, weight: topic.weight, landmarks }
  })
}

/** A syllabus link that is a concept — not a reading linked from the same callout. */
export function isLandmark(concept: WikiConcept): boolean {
  if (/^Resources\//i.test(concept.target ?? '')) return false
  return isSyllabusConcept({ kind: 'concept', name: concept.name })
}

/** Every landmark once, in syllabus order (a concept named by two regions counts once). */
export function uniqueLandmarks(regions: readonly Region[]): Landmark[] {
  const seen = new Set<string>()
  const out: Landmark[] = []
  for (const region of regions) {
    for (const l of region.landmarks) {
      const id = l.concept.name.toLowerCase()
      if (seen.has(id)) continue
      seen.add(id)
      out.push(l)
    }
  }
  return out
}

const LEVEL_RANK: Record<MasteryState, number> = { forgotten: 0, new: 1, level1: 2, level2: 3, level3: 4 }

/** A landmark is at risk: decayed to Forgotten, or a step down within `DECAY_SOON_DAYS`. */
export function isDecaying(l: Pick<Landmark, 'state' | 'decay'>): boolean {
  return l.state === 'forgotten' || (!!l.decay && l.decay.inDays <= DECAY_SOON_DAYS)
}

function urgency(l: Landmark): number {
  if (l.decay) return l.decay.at.getTime()
  // Already decayed is more urgent than anything still to come; untouched is least.
  return l.state === 'forgotten' ? Number.NEGATIVE_INFINITY : Number.POSITIVE_INFINITY
}

/**
 * The landmarks the star map's sector panel lists: the concepts most at risk —
 * decayed to Forgotten first, then the ones nearest to decaying.
 */
export function panelLandmarks(landmarks: readonly Landmark[], limit = 6): Landmark[] {
  const byRisk = (a: Landmark, b: Landmark) =>
    urgency(a) - urgency(b) || LEVEL_RANK[a.state] - LEVEL_RANK[b.state] || a.concept.name.localeCompare(b.concept.name)
  return landmarks.filter(l => l.state === 'forgotten' || l.decay).sort(byRisk).slice(0, limit)
}

/**
 * The landmarks with the soonest projected decay step — the sector screen's
 * *Decaying now* list (§6.5). Only concepts with a step still to come: one
 * already Forgotten has nothing left to drop.
 */
export function decayingNow(landmarks: readonly Landmark[], limit = 3): Landmark[] {
  return landmarks
    .filter(l => l.decay)
    .sort((a, b) => a.decay!.at.getTime() - b.decay!.at.getTime() || LEVEL_RANK[b.state] - LEVEL_RANK[a.state])
    .slice(0, limit)
}

export interface LandmarkChip {
  variant: 'cleared' | 'decaying'
  label: string
}

/**
 * The chip a landmark row carries, when it has something to say: that it has
 * decayed, that it is about to (within the transmission's horizon), or that it
 * is cleared — Level 3 and holding. A concept part-way up the ladder and in no
 * danger says nothing beyond its Z.
 */
export function landmarkChip(l: Pick<Landmark, 'state' | 'decay'>): LandmarkChip | null {
  if (l.state === 'forgotten') return { variant: 'decaying', label: 'Decayed' }
  if (l.decay && l.decay.inDays <= DECAY_SOON_DAYS) return { variant: 'decaying', label: describeDecayStep(l.decay) }
  if (l.state === 'level3') return { variant: 'cleared', label: 'Cleared' }
  return null
}
