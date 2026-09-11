// Exam accent colours — one hue per exam, stepping chromatically around the
// colour wheel from **blue** at the first preliminary exam to **red** at the
// last exam of the ladder (Exam 9 on the CAS side).
//
// The point of a ramp rather than an authored palette is that the colour
// carries information: where an exam sits in the journey. Two exams next to
// each other on the ladder are next to each other on the wheel, and how far
// round the wheel a card is says how far along the course of study it is.
//
// Only *exams* get an accent. The VEE credits, the online courses (DISC), the
// projects (PCPA, FAP, ATPA) and the professionalism courses are requirements
// rather than rungs of the exam ladder, so `examHue` returns undefined for
// them and a surface falls back to its neutral treatment.
//
// ## Using it as an exam's feature colour
//
// Nothing here paints anything. `examAccentStyle` hands back the three CSS
// custom properties below, to be spread onto whatever element scopes the exam;
// everything inside it can then reference them. That is what makes the accent
// cheap to apply anywhere (a hover highlight today, a page header, a ring or a
// chart series tomorrow) without any surface re-deriving the colour:
//
//   --exam-accent         the solid hue: text, icons, rules, a ring
//   --exam-accent-soft    a translucent wash of it: a tinted surface
//   --exam-accent-muted   between the two: a hairline or a resting border
//
//   <Card style={examAccentStyle('CAS-5')}
//         className="ring-1 ring-transparent hover:ring-[var(--exam-accent)]
//                    hover:bg-[var(--exam-accent-soft)]" />
//
// Both are translucent so the accent lands on whatever surface is underneath
// and keeps working in either theme, rather than needing a light and a dark
// value per exam.

import type { CSSProperties } from 'react'

/** Blue — `COLOR_HEX.blue` (#2563eb) is hsl(221, 83%, 53%). */
const HUE_START = 221
/** Red — 360° is the same hue as `COLOR_HEX.red` (#dc2626), hsl(0, 72%, 51%). */
const HUE_END = 360

const ACCENT_SATURATION = 75
const ACCENT_LIGHTNESS = 55

/**
 * A rung of the ladder: one exam, or several that are alternatives to each
 * other (ALTAM / ASTAM) and therefore share a position and a hue.
 */
type Rung = string | readonly string[]

/**
 * The CAS exam ladder, in the order a candidate sits it. Exam 6 is one rung —
 * 6C, 6U and 6I are the same exam in different jurisdictions, and all three map
 * to the `CAS-6` progress key.
 */
const CAS_LADDER: readonly Rung[] = [
  'P', 'FM', 'MAS-I', 'MAS-II', 'CAS-5', 'CAS-6', 'CAS-7', 'CAS-8', 'CAS-9',
]

/** The SOA exam ladder. ALTAM and ASTAM are alternatives, so they share a rung. */
const SOA_LADDER: readonly Rung[] = [
  'P', 'FM', 'FAM', 'SRM', 'PA', ['ALTAM', 'ASTAM'],
]

function ladderHues(ladder: readonly Rung[]): Record<string, number> {
  const out: Record<string, number> = {}
  const last = ladder.length - 1
  ladder.forEach((rung, i) => {
    const hue = last === 0 ? HUE_START : HUE_START + ((HUE_END - HUE_START) * i) / last
    for (const key of typeof rung === 'string' ? [rung] : rung) out[key] = hue
  })
  return out
}

/**
 * Hue per exam key (the `exam_progress` key: `P`, `FM`, `MAS-I`, `CAS-5`, …).
 *
 * P and FM sit on both ladders. They take their position from the CAS one —
 * it is the longer ladder and the one the vault's material follows — so a
 * candidate on either track sees the same blue on the exams they share.
 */
export const EXAM_HUES: Readonly<Record<string, number>> = {
  ...ladderHues(SOA_LADDER),
  ...ladderHues(CAS_LADDER),
}

/** The exam's hue in degrees, or undefined for anything that isn't an exam. */
export function examHue(examKey: string): number | undefined {
  return EXAM_HUES[examKey]
}

/**
 * The exam's accent as a CSS colour, at a given alpha (1 by default).
 * Undefined for a key with no rung on either ladder.
 */
export function examAccent(examKey: string, alpha = 1): string | undefined {
  const hue = examHue(examKey)
  if (hue === undefined) return undefined
  const base = `${round(hue)} ${ACCENT_SATURATION}% ${ACCENT_LIGHTNESS}%`
  return alpha >= 1 ? `hsl(${base})` : `hsl(${base} / ${alpha})`
}

/**
 * The three accent custom properties, to be spread onto the element that
 * scopes an exam. Returns undefined for a non-exam so the caller can spread it
 * unconditionally and get no vars (and so no accent) rather than a wrong one.
 */
export function examAccentStyle(examKey: string): CSSProperties | undefined {
  const solid = examAccent(examKey)
  if (!solid) return undefined
  return {
    '--exam-accent': solid,
    '--exam-accent-muted': examAccent(examKey, 0.45),
    '--exam-accent-soft': examAccent(examKey, 0.14),
  } as CSSProperties
}

function round(n: number): number {
  return Math.round(n * 10) / 10
}
