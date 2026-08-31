/**
 * The geometry and segment maths behind the **readiness ring** — the spoked
 * dial that shows an exam's whole syllabus at once: one arc per concept, sized
 * by its section's exam weight, filled by that concept's mastery state.
 *
 * Two surfaces draw it: the Dashboard's Study Guide card (`StudyGuideRadial`
 * in `components/ReadinessCard.tsx`, with a legend, curved section labels and a
 * hover readout) and the exam page's title row (`ExamReadinessRing`, the same
 * ring shrunk to a badge). They differ only in chrome — the arcs come from
 * here, so the two can never disagree about what the ring is showing.
 *
 * Geometry is expressed in a fixed 280-unit viewBox; a surface picks its
 * on-screen size by scaling the SVG, not by changing these numbers.
 */

import type { WikiExamSyllabus } from '@/lib/wikiParser'
import type { ConceptMasteryRecord, MasteryState } from '@/lib/mastery'
import { decayIfStale } from '@/lib/mastery'
import { normalizeMasteryToDisplayNames } from '@/lib/conceptMatch'
import { isKeystone } from '@/lib/keystone'
import { parseSectionWeight } from '@/lib/readiness'

export const RING_VIEWBOX = 280
export const RING_CX = RING_VIEWBOX / 2
export const RING_CY = RING_VIEWBOX / 2
export const RING_OUTER_R = 126
export const RING_INNER_R = 74
/** Degrees of clear space between two neighbouring concept arcs. */
export const RING_CONCEPT_GAP = 1.5

export interface RingSegment {
  startDeg: number
  endDeg: number
  conceptName: string
  topicName: string
  state: MasteryState
  keystone: boolean
}

export interface RingTopicGroup {
  topicName: string
  startDeg: number
  endDeg: number
  midDeg: number
  /** Where to draw this section's leading divider, halfway into the gap before it. */
  boundaryDeg: number
}

/** Polar → cartesian, with 0° at 12 o'clock. */
export function ringPolar(angleDeg: number, r: number) {
  const rad = ((angleDeg - 90) * Math.PI) / 180
  return { x: RING_CX + r * Math.cos(rad), y: RING_CY + r * Math.sin(rad) }
}

/** The path for one arc segment of the annulus. */
export function ringArcPath(startDeg: number, endDeg: number, ro: number, ri: number): string {
  const s1 = ringPolar(startDeg, ro)
  const e1 = ringPolar(endDeg, ro)
  const s2 = ringPolar(endDeg, ri)
  const e2 = ringPolar(startDeg, ri)
  const lg = endDeg - startDeg > 180 ? 1 : 0
  return `M${s1.x} ${s1.y} A${ro} ${ro} 0 ${lg} 1 ${e1.x} ${e1.y} L${s2.x} ${s2.y} A${ri} ${ri} 0 ${lg} 0 ${e2.x} ${e2.y}Z`
}

/**
 * One arc per syllabus concept, laid out clockwise from 12 o'clock. A section
 * owns a slice of the circle proportional to its exam weight and splits it
 * evenly among its concepts, so a heavily-weighted section is visibly wider
 * even when it holds few concepts.
 */
export function buildRingSegments(
  syllabus: WikiExamSyllabus,
  examRecords: ConceptMasteryRecord[],
  now: Date,
): RingSegment[] {
  const normalized = normalizeMasteryToDisplayNames(examRecords, syllabus)
  const bySlug = new Map(normalized.map(r => [r.concept_slug.toLowerCase(), r]))
  const totalWeight = syllabus.topics.reduce((s, t) => s + parseSectionWeight(t.weight), 0) || 1
  const result: RingSegment[] = []
  let cursor = 0

  for (const topic of syllabus.topics) {
    const topicDeg = (parseSectionWeight(topic.weight) / totalWeight) * 360
    const n = topic.concepts.length
    if (n === 0) { cursor += topicDeg; continue }
    const slotDeg = topicDeg / n
    const gap = Math.min(RING_CONCEPT_GAP, slotDeg * 0.5)

    for (const concept of topic.concepts) {
      const rec = bySlug.get(concept.name.toLowerCase())
      const state: MasteryState = rec ? decayIfStale(rec, now).state : 'new'
      const startDeg = cursor + gap / 2
      const endDeg = cursor + slotDeg - gap / 2
      // Below half a degree an arc is thinner than its own stroke join and
      // renders as a speck; drop it rather than litter the ring.
      if (endDeg > startDeg + 0.5) {
        result.push({
          startDeg,
          endDeg,
          conceptName: concept.name,
          topicName: topic.name,
          state,
          keystone: isKeystone(concept),
        })
      }
      cursor += slotDeg
    }
  }
  return result
}

/** Collapse the segments back into the sections they came from. */
export function ringTopicGroups(segments: RingSegment[]): RingTopicGroup[] {
  if (segments.length === 0) return []
  const groups: RingTopicGroup[] = []
  let i = 0
  while (i < segments.length) {
    const name = segments[i].topicName
    let j = i
    while (j < segments.length && segments[j].topicName === name) j++
    const startDeg = segments[i].startDeg
    const endDeg = segments[j - 1].endDeg
    const lastSegEnd = segments[segments.length - 1].endDeg
    const prevEnd = i > 0 ? segments[i - 1].endDeg : lastSegEnd
    // For i=0 wrap the boundary around 360°→0° (gives ~0° = 12 o'clock).
    const boundaryDeg = i > 0
      ? (prevEnd + startDeg) / 2
      : ((lastSegEnd + startDeg + 360) / 2) % 360
    groups.push({ topicName: name, startDeg, endDeg, midDeg: (startDeg + endDeg) / 2, boundaryDeg })
    i = j
  }
  return groups
}
