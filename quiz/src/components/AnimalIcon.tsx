import { createElement, useId, type ReactNode } from 'react'
import type { AnimalPalette } from '@/lib/cosmetics'
import type { AnimalType } from '@/lib/avatar'

// The six characters, drawn in one style: a whole head in a single dark outline,
// flat fills from the skin's three colours, on a tint of its lightest one. Every
// skin in the Gem Shop is these drawings with another palette.
//
// At 32 px and under a drawing drops its smallest details (ear inners, the
// octopus's spots) and the line gets heavier, so the outline holds.

const INK = '#1C1B1B'
const GOLD = '#E0A526'
const EYE_WHITE = '#FAFAF5'

/** The outline's width in the 64-unit drawing. Half of it shows: see `Outline`. */
const LINE = 7.4
const SMALL_SIZE = 32
const SMALL_LINE_SCALE = 1.3

/** `from` moved `t` of the way to `to`, both `#rrggbb`. */
function mixHex(from: string, to: string, t: number): string {
  const channels = (hex: string) => [1, 3, 5].map(i => parseInt(hex.slice(i, i + 2), 16))
  const a = channels(from)
  const b = channels(to)
  return `rgb(${a.map((v, i) => Math.round(v + (b[i] - v) * t)).join(',')})`
}

type Shape = [tag: 'path' | 'circle' | 'ellipse' | 'polygon' | 'rect', attrs: Record<string, string | number>, fill: string]

interface Art {
  p: AnimalPalette
  /** Outline width. */
  w: number
  /** Whether the smallest details are drawn. */
  detail: boolean
}

// A silhouette made of several shapes with one line around the lot: every shape
// is stroked, then every shape is filled again on top, which leaves only the
// outer half of each stroke showing.
function Outline({ shapes, w }: { shapes: Shape[]; w: number }) {
  return (
    <>
      {shapes.map(([tag, attrs], i) =>
        createElement(tag, { key: `s${i}`, ...attrs, fill: INK, stroke: INK, strokeWidth: w, strokeLinejoin: 'round' }))}
      {shapes.map(([tag, attrs, fill], i) => createElement(tag, { key: `f${i}`, ...attrs, fill }))}
    </>
  )
}

/** The drawing's left half, repeated on the right. */
function Both({ children }: { children: ReactNode }) {
  return (
    <>
      {children}
      <g transform="matrix(-1 0 0 1 64 0)">{children}</g>
    </>
  )
}

function Stroke({ d, width, w }: { d: string; width: number; w: number }) {
  return <path d={d} fill="none" stroke={INK} strokeWidth={width * (w / 5.5)} strokeLinecap="round" strokeLinejoin="round" />
}

/** The thin line round an inner shape (an eye's ring, a beak). */
const thin = (w: number) => ({ stroke: INK, strokeWidth: 1.6 * (w / 5.5), strokeLinejoin: 'round' as const })

function Fox({ p, w, detail }: Art) {
  return (
    <>
      <Outline w={w} shapes={[['path', { d: 'M12 13 L26 23 Q32 21 38 23 L52 13 L52 32 Q52 40 44 46 L32 54 L20 46 Q12 40 12 32 Z' }, p.primary]]} />
      <path d="M12.3 35 Q24 37 32 54 Q40 37 51.7 35 Q51 41 44 46 L32 54 L20 46 Q13 41 12.3 35Z" fill={p.belly} />
      <Both>
        {detail && <polygon points="16,20 23,25 16,29" fill={p.secondary} />}
        <circle cx="24" cy="33" r="2.7" fill={INK} />
      </Both>
      <circle cx="32" cy="52" r="3.3" fill={INK} />
    </>
  )
}

function Koala({ p, w, detail }: Art) {
  return (
    <>
      <Outline
        w={w}
        shapes={[
          ['circle', { cx: 13, cy: 23, r: 9.5 }, p.secondary],
          ['circle', { cx: 51, cy: 23, r: 9.5 }, p.secondary],
          ['ellipse', { cx: 32, cy: 37, rx: 19, ry: 16.5 }, p.primary],
        ]}
      />
      <Both>
        <circle cx="12.5" cy="22.5" r="4.6" fill={p.belly} />
        <circle cx="21.5" cy="34" r="2.6" fill={INK} />
      </Both>
      <ellipse cx="32" cy="39" rx="5" ry="7" fill={INK} />
      {detail && <Stroke d="M29 50 Q32 52 35 50" width={2} w={w} />}
    </>
  )
}

function Frog({ p, w, detail }: Art) {
  return (
    <>
      <Outline
        w={w}
        shapes={[
          ['circle', { cx: 20, cy: 22, r: 9 }, p.primary],
          ['circle', { cx: 44, cy: 22, r: 9 }, p.primary],
          ['ellipse', { cx: 32, cy: 39, rx: 22, ry: 14 }, p.primary],
        ]}
      />
      {detail && <ellipse cx="32" cy="48" rx="11" ry="4.5" fill={p.belly} />}
      <Both>
        <circle cx="20" cy="22" r="5.8" fill={EYE_WHITE} />
        <circle cx="20" cy="22.4" r="2.9" fill={INK} />
      </Both>
      <Stroke d="M21 39.5 Q32 46 43 39.5" width={2.4} w={w} />
    </>
  )
}

// A barn owl's heart-shaped face, no tufts.
function Owl({ p, w, detail }: Art) {
  return (
    <>
      <Outline w={w} shapes={[['circle', { cx: 32, cy: 34, r: 20 }, p.primary]]} />
      <Both>
        <circle cx="23.5" cy="32" r="10.5" fill={p.belly} />
      </Both>
      <polygon points="14.5,37 32,52 49.5,37" fill={p.belly} />
      <Both>
        <circle cx="23.5" cy="33.5" r="3.5" fill={INK} />
      </Both>
      <polygon points="29.3,37 34.7,37 32,43.5" fill={GOLD} {...thin(w)} />
      {detail && <Stroke d="M27 21.5 L32 25 L37 21.5" width={1.8} w={w} />}
    </>
  )
}

// A pale face under a dark peak, with split cheeks.
function Wolf({ p, w, detail }: Art) {
  return (
    <>
      <Outline
        w={w}
        shapes={[[
          'path',
          { d: 'M16 10 L26 20 Q32 18 38 20 L48 10 L51 27 L57 34 L51 37 L55 44 L46 45 L32 56 L18 45 L9 44 L13 37 L7 34 L13 27 Z' },
          p.primary,
        ]]}
      />
      <path d="M16 33 Q22 27 29 33 L32 38 L35 33 Q42 27 48 33 L46 44 L32 55 L18 44 Z" fill={p.belly} />
      <Both>
        {detail && <polygon points="18,15.5 24,22 17,25" fill={p.secondary} />}
        <circle cx="23.5" cy="35.5" r="2.7" fill={INK} />
      </Both>
      <circle cx="32" cy="50" r="3.3" fill={INK} />
    </>
  )
}

function Octopus({ p, w, detail }: Art) {
  return (
    <>
      <Outline
        w={w}
        shapes={[
          ['rect', { x: 12, y: 34, width: 8, height: 17, rx: 4 }, p.primary],
          ['rect', { x: 22.7, y: 34, width: 8, height: 21, rx: 4 }, p.primary],
          ['rect', { x: 33.3, y: 34, width: 8, height: 21, rx: 4 }, p.primary],
          ['rect', { x: 44, y: 34, width: 8, height: 17, rx: 4 }, p.primary],
          ['circle', { cx: 32, cy: 27, r: 17 }, p.primary],
        ]}
      />
      {detail && (
        <>
          <circle cx="24" cy="16" r="2" fill={p.secondary} />
          <circle cx="41" cy="18" r="1.5" fill={p.secondary} />
          <circle cx="33" cy="13" r="1.2" fill={p.secondary} />
        </>
      )}
      <Both>
        <circle cx="25" cy="29" r="5.2" fill="#F5F0FF" />
        <circle cx="25.3" cy="29.4" r="2.6" fill={INK} />
      </Both>
      <Stroke d="M29 37.5 Q32 40 35 37.5" width={2} w={w} />
    </>
  )
}

const ART: Record<AnimalType, (art: Art) => JSX.Element> = {
  fox: Fox,
  koala: Koala,
  frog: Frog,
  owl: Owl,
  wolf: Wolf,
  octopus: Octopus,
}

interface AnimalIconProps {
  animal: AnimalType
  palette: AnimalPalette
  size: number
}

/** One character as a round icon, `size` px across. */
export function AnimalIcon({ animal, palette, size }: AnimalIconProps) {
  const clipId = `animal${useId().replace(/:/g, '')}`
  const small = size <= SMALL_SIZE
  const Drawing = ART[animal]
  return (
    <svg width={size} height={size} viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
      <defs>
        <clipPath id={clipId}>
          <circle cx="32" cy="32" r="32" />
        </clipPath>
      </defs>
      <g clipPath={`url(#${clipId})`}>
        <circle cx="32" cy="32" r="32" fill={mixHex(palette.belly, '#ffffff', 0.4)} />
        <Drawing p={palette} w={LINE * (small ? SMALL_LINE_SCALE : 1)} detail={!small} />
      </g>
    </svg>
  )
}
