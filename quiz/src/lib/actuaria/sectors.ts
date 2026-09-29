// **Sectors** — the exams, as places on Actuaria's star map
// (docs/actuaria-online.md §3, §6.3).
//
// A sector is an exam the vault has a syllabus page for and that has a rung on
// the exam ladder (`lib/examColors.ts` — the DISCs and VEE are requirements, not
// rungs, so they are not places). A sector is **charted** when the player is
// studying it or has passed it (`exam_progress`), and **uncharted** otherwise;
// the map shows the player's track, and every exam they have charted whether or
// not it is on that track. Charting is the existing exam-progress flow — the
// same write the exams panel's Add makes — and uncharted is presentation only:
// an uncharted sector's study guide, questions and battles are all still open
// (G9).
//
// The star map's geometry is here too, pure: concentric ellipses (ry ≈ 0.42 rx)
// round a central star, Monte Carlo Station on the first, charted sectors on the
// second and uncharted ones on the third, each spaced by equal *arc length* so
// no two planets crowd at the flat ends of an orbit.

import type { ItemStatus, Track } from '@/data/tracks'
import { matchesSelectedVariant } from '@/data/examSittings'
import { EXAM_HUES } from '@/lib/examColors'
import { bankLabelFor } from '@/lib/examIds'
import { examStatus } from '@/lib/examStatus'
import { wikiExamIdToProgressKey, type WikiExamSyllabus } from '@/lib/wikiParser'

export interface Sector {
  /** The exam_progress key — `P`, `FM`, `MAS-I`, `CAS-5`. */
  key: string
  syllabus: WikiExamSyllabus
  /** "Probability", "Basic Ratemaking…" — the exam's subject. */
  title: string
  /** "Exam P-1". */
  label: string
  status: ItemStatus
  /** Being studied or passed. */
  charted: boolean
  /** Passed. */
  cleared: boolean
  /** On the player's selected track. */
  onTrack: boolean
  /** The question bank's label for this exam, when it has one (`Probability`). */
  bankLabel: string | undefined
}

/** Where a sector sits on the ladder — its hue, which climbs from Exam P to Exam 9. */
export function ladderRank(key: string): number {
  return EXAM_HUES[key] ?? Number.POSITIVE_INFINITY
}

export function buildSectors(input: {
  syllabi: readonly WikiExamSyllabus[]
  track: Track | null | undefined
  /** exam_progress status by key. */
  progress: Readonly<Record<string, string | undefined>>
  /** The regional variant picked per key (Exam 6's 6C / 6U). */
  variants?: Readonly<Record<string, string | null | undefined>>
}): Sector[] {
  const onTrack = new Set((input.track?.sections ?? []).flatMap(s => s.items.map(i => i.id)))
  const byKey = new Map<string, WikiExamSyllabus[]>()
  for (const s of input.syllabi) {
    const key = wikiExamIdToProgressKey(s.examId)
    if (EXAM_HUES[key] === undefined) continue
    byKey.set(key, [...(byKey.get(key) ?? []), s])
  }

  const sectors: Sector[] = []
  for (const [key, candidates] of byKey) {
    const variant = input.variants?.[key]
    const matching = candidates.filter(s => matchesSelectedVariant(key, s.examId, variant))
    const pool = matching.length > 0 ? matching : candidates
    // With no variant chosen, the syllabus a question bank is bound to wins
    // (Exam 6C over 6U), then the one a page says is not in development.
    const syllabus =
      pool.find(s => bankLabelFor(s) && examStatus(key, s.examId) !== 'development') ??
      pool.find(s => examStatus(key, s.examId) !== 'development') ??
      pool[0]
    const raw = input.progress[key]
    const status: ItemStatus = raw === 'in_progress' || raw === 'completed' ? raw : 'not_started'
    const charted = status !== 'not_started'
    if (!charted && !onTrack.has(key)) continue
    sectors.push({
      key,
      syllabus,
      title: syllabus.examTopic,
      label: syllabus.examLabel,
      status,
      charted,
      cleared: status === 'completed',
      onTrack: onTrack.has(key),
      bankLabel: bankLabelFor(syllabus),
    })
  }
  return sectors.sort((a, b) => ladderRank(a.key) - ladderRank(b.key))
}

/** A sector by its key, or undefined. Keys are matched as written (`CAS-5`). */
export function sectorByKey(sectors: readonly Sector[], key: string | undefined): Sector | undefined {
  if (!key) return undefined
  return sectors.find(s => s.key === key) ?? sectors.find(s => s.key.toLowerCase() === key.toLowerCase())
}

// ── The star map ────────────────────────────────────────────────────────────

export interface Orbit {
  rx: number
  ry: number
}

export interface PlacedSector {
  key: string
  x: number
  y: number
  r: number
  charted: boolean
}

export interface StarMapLayout {
  width: number
  height: number
  cx: number
  cy: number
  /** Station, charted, uncharted — innermost first. */
  orbits: [Orbit, Orbit, Orbit]
  station: { x: number; y: number; r: number }
  sectors: PlacedSector[]
  /** The central star's radius. */
  star: number
}

/** The orbits' flattening — the canvas's ry ≈ 0.42 rx. */
export const ORBIT_FLATTENING = 0.42

export type StarMapSize = 'wide' | 'compact'

const SIZES: Record<StarMapSize, { width: number; height: number; orbitRx: [number, number, number]; planet: [number, number]; star: number }> = {
  // A desktop canvas: room for ten sectors on the outer orbit with space to spare.
  wide: { width: 1000, height: 560, orbitRx: [150, 300, 450], planet: [30, 25], star: 34 },
  // A phone: the same map, narrower, with planets still big enough to tap.
  compact: { width: 460, height: 360, orbitRx: [70, 140, 205], planet: [22, 18], star: 16 },
}

/**
 * `n` points round an ellipse at equal arc length, the first at parametric
 * angle `start`, going the way SVG's angles go (clockwise on screen).
 */
export function pointsAlongEllipse(
  rx: number,
  ry: number,
  n: number,
  start: number,
): { x: number; y: number }[] {
  if (n <= 0) return []
  const samples = 720
  const lengths: number[] = [0]
  let prev = { x: rx * Math.cos(start), y: ry * Math.sin(start) }
  for (let i = 1; i <= samples; i++) {
    const t = start + (2 * Math.PI * i) / samples
    const p = { x: rx * Math.cos(t), y: ry * Math.sin(t) }
    lengths.push(lengths[i - 1] + Math.hypot(p.x - prev.x, p.y - prev.y))
    prev = p
  }
  const perimeter = lengths[samples]
  const out: { x: number; y: number }[] = []
  let j = 0
  for (let k = 0; k < n; k++) {
    const target = (perimeter * k) / n
    while (j < samples && lengths[j + 1] < target) j++
    const span = lengths[j + 1] - lengths[j] || 1
    const frac = (target - lengths[j]) / span
    const t = start + (2 * Math.PI * (j + frac)) / samples
    out.push({ x: rx * Math.cos(t), y: ry * Math.sin(t) })
  }
  return out
}

/**
 * Where everything on the map goes. Sectors keep the order they are given —
 * ladder order — starting at the left of their orbit and running over the top,
 * so the hue ramp reads round the map the way it reads down the exam grid.
 */
export function starMapLayout(
  sectors: readonly Pick<Sector, 'key' | 'charted'>[],
  size: StarMapSize = 'wide',
): StarMapLayout {
  const spec = SIZES[size]
  const cx = spec.width / 2
  const cy = spec.height / 2
  const orbits = spec.orbitRx.map(rx => ({ rx, ry: rx * ORBIT_FLATTENING })) as [Orbit, Orbit, Orbit]

  const place = (list: readonly Pick<Sector, 'key' | 'charted'>[], orbit: Orbit, r: number, start: number) =>
    pointsAlongEllipse(orbit.rx, orbit.ry, list.length, start).map((p, i) => ({
      key: list[i].key,
      x: cx + p.x,
      y: cy + p.y,
      r,
      charted: list[i].charted,
    }))

  const charted = sectors.filter(s => s.charted)
  const uncharted = sectors.filter(s => !s.charted)
  // Start at the left end of each orbit; the outer one half a step round, so a
  // charted planet and an uncharted one are never stacked on one ray.
  const outerOffset = uncharted.length > 0 ? Math.PI / Math.max(uncharted.length, 1) / 2 : 0
  const station = pointsAlongEllipse(orbits[0].rx, orbits[0].ry, 1, Math.PI * 0.3)[0]

  return {
    width: spec.width,
    height: spec.height,
    cx,
    cy,
    orbits,
    station: { x: cx + station.x, y: cy + station.y, r: spec.planet[1] * 0.8 },
    sectors: [
      ...place(charted, orbits[1], spec.planet[0], Math.PI),
      ...place(uncharted, orbits[2], spec.planet[1], Math.PI + outerOffset),
    ],
    star: spec.star,
  }
}
