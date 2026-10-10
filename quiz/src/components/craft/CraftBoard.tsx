import {
  forwardRef,
  useCallback,
  useEffect,
  useImperativeHandle,
  useLayoutEffect,
  useMemo,
  useRef,
  useState,
} from 'react'
import type { BoardState } from '@/lib/conceptCraft'
import type { Relation } from '@/lib/conceptRelations'
import { MIN_STRENGTH, strengthTier, type Connection } from '@/lib/conceptGraph'
import {
  ALPHA_MIN,
  bodyAt,
  cardSize,
  connectionSpring,
  cool,
  fitView,
  lineLabelPoint,
  lineWidth,
  makeBody,
  seedPositions,
  spawnBeside,
  spawnNear,
  step,
  toScreen,
  toWorld,
  zoomAt,
  type Body,
  type Insets,
  type Point,
  type Spring,
  type View,
} from '@/lib/craftLayout'
import { flashcardFoilClass } from '@/lib/flashcardFoil'
import { hashString } from '@/lib/quests'
import type { ConceptLevels } from '@/hooks/useConceptLevels'
import { cn } from '@/lib/utils'

/**
 * **The Concept Craft board** — an infinite, zoomable canvas with every
 * concept the reader holds as a card, every connection they have found as a
 * line between two cards carrying its strength, and a small force simulation
 * (`lib/craftLayout.ts`) keeping the lot apart — the stronger a connection, the
 * shorter and stiffer its spring, so the map's shape says what its numbers
 * say. What a connection made lands off the middle of its line, and a card no
 * connection found has touched yet wears the exam's colour.
 *
 * What it does with the reader's hands:
 * - drag a card onto another → `onCombine`, which answers whether the card
 *   should **bounce** back to where it was lifted from (nothing connects them)
 *   or **stay**;
 * - tap a card → `onOpen` (the app's concept popup), or, with a deck card
 *   held, `onCombine` with that;
 * - tap a connection's strength → `onConnection`, the card that says why;
 * - drag the empty board to pan, pinch or wheel to zoom.
 *
 * Positions live in a ref and the frame is re-rendered from it while the
 * simulation is warm; the page is told where everything settled (`onSettle`)
 * so the layout outlives the visit. The page drives the rest through
 * `BoardCommands`.
 */

export interface BoardCommands {
  fit: () => void
  tidy: () => void
  zoom: (factor: number) => void
  /** Bring a card into view if it is out of it. */
  reveal: (name: string) => void
  /** The concept under a screen point, if any. */
  conceptAt: (clientX: number, clientY: number) => string | null
  /** Whether a screen point is over the board at all. */
  contains: (clientX: number, clientY: number) => boolean
  /** Move a card to a screen point — a deck card dropped on empty board. */
  placeAt: (name: string, clientX: number, clientY: number) => void
}

export type DropVerdict = 'bounce' | 'stay'

export interface CraftBoardProps {
  /** What the reader holds and has found (`boardState`). */
  state: BoardState
  /** Where the concepts were left last time, by lower-cased name. */
  saved: Record<string, [number, number]>
  levels: ConceptLevels
  /** The concept being read in the popup — lit, with its connections. */
  selected: string | null
  /** A deck card picked up by a tap, waiting for a second concept. */
  held: string | null
  /** The concept a card dragged in from the deck is over. */
  hover: string | null
  /** Room the page's panels cover at the board's edges — what "fit" frames around. */
  insets: Insets
  /** Connections weaker than this are not drawn. */
  minStrength: number
  /** What was just made, and the connection just found — the pops and the line drawing in. */
  justMade: readonly string[]
  freshConnection: string | null
  /** A connection to light up — a pair dropped together again. */
  flashConnection: string | null
  /** The connection whose card is open. */
  openConnection: string | null
  /** What a connection says, in 1–5 words — written under a lit line's strength. */
  relationOf?: (connection: Connection) => Relation
  onOpen: (name: string) => void
  onCombine: (a: string, b: string) => DropVerdict
  onConnection: (connection: Connection) => void
  onSettle: (positions: Record<string, [number, number]>) => void
}

const conceptKey = (name: string) => `c:${name.toLowerCase()}`
const DRAG_SLOP = 5
const BOUNCE_MS = 320
const VIEW_MS = 380
/** Below this zoom a strength is too small to read, and only the lines are drawn. */
const BADGE_ZOOM = 0.5
const BADGE = { w: 28, h: 18 }

type Gesture =
  | { kind: 'node'; name: string; key: string; startClient: Point; startBody: Point; moved: boolean }
  | { kind: 'pan'; startClient: Point; startView: View; moved: boolean }
  | { kind: 'pinch'; startDist: number; startMid: Point; startView: View }

interface Tween {
  from: Point
  to: Point
  start: number
}

function prefersReducedMotion(): boolean {
  return typeof window !== 'undefined' && !!window.matchMedia?.('(prefers-reduced-motion: reduce)').matches
}

// The board's one easing for a card thrown back: a little overshoot, then home.
function easeOutBack(t: number): number {
  const c = 1.4
  return 1 + (c + 1) * Math.pow(t - 1, 3) + c * Math.pow(t - 1, 2)
}

function easeOut(t: number): number {
  return 1 - Math.pow(1 - t, 3)
}

/**
 * The exam's colour (`examAccentStyle`, set on the page) — what is new and what
 * is being looked at wear it — and the vivid fill for a shape carrying white
 * text. Each falls back to the app's primary off an exam.
 */
const ACCENT = 'var(--exam-accent, hsl(var(--primary)))'
const ACCENT_FILL = 'var(--exam-accent-vivid, hsl(var(--primary)))'
const ACCENT_HALO = 'var(--exam-accent-soft, hsl(var(--primary) / 0.15))'

/**
 * A line's weight and ink, from its connection's strength (`lineWidth`): a
 * hairline for a faint pair, a thick cord for a strong one. A connection under
 * `MIN_STRENGTH` — one the notes don't tie directly — is dashed as well as thin.
 */
function edgeStyle(strength: number, lit: boolean): { width: number; color: string; dash?: string } {
  const width = lineWidth(strength)
  const dash = strength < MIN_STRENGTH ? '2 5' : undefined
  if (lit) return { width: width + 1, color: ACCENT, dash }
  const tier = strengthTier(strength)
  const alpha = tier === 'strong' ? 0.85 : tier === 'moderate' ? 0.6 : strength < MIN_STRENGTH ? 0.3 : 0.4
  return { width, color: `hsl(var(--foreground) / ${alpha})`, dash }
}

export const CraftBoard = forwardRef<BoardCommands, CraftBoardProps>(function CraftBoard(
  {
    state,
    saved,
    levels,
    selected,
    held,
    hover,
    insets,
    minStrength,
    justMade,
    freshConnection,
    flashConnection,
    openConnection,
    relationOf,
    onOpen,
    onCombine,
    onConnection,
    onSettle,
  },
  ref,
) {
  const rootRef = useRef<HTMLDivElement>(null)
  const bodies = useRef<Record<string, Body>>({})
  const view = useRef<View>({ x: 0, y: 0, k: 1 })
  const size = useRef({ w: 0, h: 0 })
  const alpha = useRef(0)
  const raf = useRef(0)
  const gesture = useRef<Gesture | null>(null)
  const pointers = useRef(new Map<number, Point>())
  const dropTarget = useRef<string | null>(null)
  const tweens = useRef(new Map<string, Tween>())
  const viewTween = useRef<{ from: View; to: View; start: number } | null>(null)
  const pending = useRef(new Map<string, Point>())
  const fitted = useRef(false)
  const foundSeen = useRef('')
  const [pointing, setPointing] = useState<string | null>(null)
  const [, setFrame] = useState(0)

  // Read through refs by the loop and the gestures, which outlive any one render.
  const latest = useRef({ onSettle, onCombine, onOpen, held, insets })
  latest.current = { onSettle, onCombine, onOpen, held, insets }

  const placed = state.held
  const connections = state.found

  // Only what the notes tie together pulls on the map; an inferred pair is
  // drawn but leaves the layout alone, or every faint pair would knot it up.
  const springs = useMemo<Spring[]>(
    () => connections.filter(c => c.strength >= MIN_STRENGTH).map(c => connectionSpring(
      conceptKey(c.a),
      conceptKey(c.b),
      c.strength,
      (cardSize(c.a).w + cardSize(c.b).w) / 2,
    )),
    [connections],
  )
  const springsRef = useRef(springs)
  springsRef.current = springs

  const conceptKeys = useMemo(() => placed.map(conceptKey), [placed])
  const conceptKeysRef = useRef(conceptKeys)
  conceptKeysRef.current = conceptKeys

  const positions = useCallback((): Record<string, [number, number]> => {
    const out: Record<string, [number, number]> = {}
    for (const name of placed) {
      const b = bodies.current[conceptKey(name)]
      if (b) out[name.toLowerCase()] = [Math.round(b.x), Math.round(b.y)]
    }
    return out
  }, [placed])
  const positionsRef = useRef(positions)
  positionsRef.current = positions

  // ── The loop ──────────────────────────────────────────────────────────────
  const loop = useCallback(() => {
    raf.current = 0
    const now = performance.now()
    let busy = false

    for (const [key, tw] of tweens.current) {
      const body = bodies.current[key]
      if (!body) {
        tweens.current.delete(key)
        continue
      }
      const t = Math.min(1, (now - tw.start) / BOUNCE_MS)
      const e = easeOutBack(t)
      body.x = tw.from.x + (tw.to.x - tw.from.x) * e
      body.y = tw.from.y + (tw.to.y - tw.from.y) * e
      if (t >= 1) {
        tweens.current.delete(key)
        body.pinned = false
        body.ghost = false
      } else busy = true
    }

    const vt = viewTween.current
    if (vt) {
      const t = Math.min(1, (now - vt.start) / VIEW_MS)
      const e = easeOut(t)
      view.current = {
        x: vt.from.x + (vt.to.x - vt.from.x) * e,
        y: vt.from.y + (vt.to.y - vt.from.y) * e,
        k: vt.from.k + (vt.to.k - vt.from.k) * e,
      }
      if (t >= 1) viewTween.current = null
      else busy = true
    }

    if (alpha.current > 0) {
      step(bodies.current, springsRef.current, alpha.current)
      alpha.current = cool(alpha.current)
      busy = true
      if (alpha.current === 0 && !gesture.current) latest.current.onSettle(positionsRef.current())
    }

    setFrame(f => (f + 1) % 1_000_000)
    if (busy || gesture.current) raf.current = requestAnimationFrame(loop)
  }, [])

  const run = useCallback(() => {
    if (!raf.current) raf.current = requestAnimationFrame(loop)
  }, [loop])

  /** Warm the board up. Under reduced motion, settle it at once instead of animating. */
  const kick = useCallback((heat: number) => {
    if (prefersReducedMotion() && !gesture.current) {
      let a = Math.max(alpha.current, heat)
      for (let i = 0; i < 400 && a > 0; i++) {
        step(bodies.current, springsRef.current, a)
        a = cool(a)
      }
      alpha.current = 0
      setFrame(f => (f + 1) % 1_000_000)
      latest.current.onSettle(positionsRef.current())
      return
    }
    alpha.current = Math.max(alpha.current, heat)
    run()
  }, [run])

  // Leaving mid-flight: keep wherever things had got to.
  // (The id is cleared, not just cancelled: StrictMode mounts twice, and a
  // stale id would leave `run` believing a frame is already on its way.)
  useEffect(() => () => {
    if (raf.current) cancelAnimationFrame(raf.current)
    raf.current = 0
    if (alpha.current > 0) latest.current.onSettle(positionsRef.current())
  }, [])

  const moveView = useCallback((to: View) => {
    if (prefersReducedMotion()) {
      view.current = to
      viewTween.current = null
      setFrame(f => (f + 1) % 1_000_000)
      return
    }
    viewTween.current = { from: view.current, to, start: performance.now() }
    run()
  }, [run])

  const fit = useCallback((animate = true) => {
    const list = conceptKeysRef.current.map(k => bodies.current[k]).filter(Boolean)
    // Less margin on a narrow board: on a phone every pixel of width is zoom.
    const to = fitView(list, size.current.w, size.current.h, Math.min(40, size.current.w * 0.04), latest.current.insets)
    if (animate) moveView(to)
    else {
      view.current = to
      setFrame(f => (f + 1) % 1_000_000)
    }
  }, [moveView])

  // Track the board's size; frame the board the first time there is one.
  useLayoutEffect(() => {
    const el = rootRef.current
    if (!el) return
    const measure = () => {
      const rect = el.getBoundingClientRect()
      size.current = { w: rect.width, h: rect.height }
      if (!fitted.current && rect.width > 0 && Object.keys(bodies.current).length > 0) {
        fit(false)
        fitted.current = true
      }
      setFrame(f => (f + 1) % 1_000_000)
    }
    measure()
    const ro = new ResizeObserver(measure)
    ro.observe(el)
    return () => ro.disconnect()
  }, [fit])

  // ── Keep the bodies in step with what is on the board ────────────────────
  useLayoutEffect(() => {
    const all = bodies.current
    const wanted = new Set<string>()
    const found = connections.map(c => c.key).join(',') || ' '
    const existing = Object.values(all)
    const centre = existing.length
      ? { x: existing.reduce((s, b) => s + b.x, 0) / existing.length, y: existing.reduce((s, b) => s + b.y, 0) / existing.length }
      : { x: 0, y: 0 }
    const reach = existing.reduce((r, b) => Math.max(r, Math.hypot(b.x - centre.x, b.y - centre.y)), 0)
    // Concepts with nowhere to go yet, numbered in arrival order for the seeds.
    const loose = placed.filter(name => {
      const key = conceptKey(name)
      return !all[key] && !saved[name.toLowerCase()] && !pending.current.has(name.toLowerCase())
    }).length
    const seeds = seedPositions(loose)
    let seeded = 0
    let added = 0

    // What each connection made, in order, so the cards one pair made can be
    // fanned out along it.
    const batch = new Map<string, string[]>()
    for (const [made, from] of state.madeFrom) batch.set(from.key, [...(batch.get(from.key) ?? []), made])

    // In the order they came into hand, so each can arrive beside one before it.
    placed.forEach(name => {
      const key = conceptKey(name)
      wanted.add(key)
      if (all[key]) return
      const remembered = saved[name.toLowerCase()]
      const asked = pending.current.get(name.toLowerCase())
      pending.current.delete(name.toLowerCase())
      let at: Point | null = asked ?? (remembered ? { x: remembered[0], y: remembered[1] } : null)
      const from = state.madeFrom.get(name.toLowerCase())
      const a = from && all[conceptKey(from.a)]
      const b = from && all[conceptKey(from.b)]
      if (!at && from && a && b) {
        // Off the middle of the line between the two cards that made it.
        const siblings = batch.get(from.key) ?? [name.toLowerCase()]
        at = spawnBeside(a, b, centre, siblings.indexOf(name.toLowerCase()), siblings.length)
      }
      if (!at) {
        // Beside a card it is connected to, on the outside of the map.
        const link = connections.find(c => {
          const other = c.a.toLowerCase() === name.toLowerCase() ? c.b : c.b.toLowerCase() === name.toLowerCase() ? c.a : null
          return other && all[conceptKey(other)]
        })
        const other = link && (link.a.toLowerCase() === name.toLowerCase() ? link.b : link.a)
        const anchor = other ? all[conceptKey(other)] : undefined
        if (anchor) at = spawnNear(anchor, centre, ((hashString(name) % 628) / 100) * 0.35)
      }
      if (!at) {
        // Nothing to arrive beside: in the middle of an empty board, or
        // around the edge of a full one.
        const angle = ((hashString(name) % 360) * Math.PI) / 180
        at = existing.length === 0
          ? seeds[seeded]
          : { x: centre.x + Math.cos(angle) * (reach + 160), y: centre.y + Math.sin(angle) * (reach + 160) }
        seeded++
      }
      all[key] = makeBody(at, cardSize(name))
      added++
    })

    for (const key of Object.keys(all)) if (!wanted.has(key)) delete all[key]

    if (added > 0) {
      if (!fitted.current && size.current.w > 0) {
        // The opening board: lay it out off screen — the whole cooling, a few
        // hundred ticks over a few dozen bodies, well under a frame — so it
        // arrives settled, then frame it.
        let a = 1
        while (a > ALPHA_MIN) {
          step(all, springsRef.current, a)
          a = cool(a)
        }
        fit(false)
        fitted.current = true
        latest.current.onSettle(positionsRef.current())
      } else {
        kick(0.5)
      }
    } else if (foundSeen.current && found !== foundSeen.current) {
      // A connection found between two cards already down: draw them together.
      kick(0.3)
    }
    foundSeen.current = found
    // `saved` is only read for concepts arriving on the board, never to move
    // one already there — the store echoing back where things settled must
    // not restart the simulation.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [placed, connections, state.madeFrom, kick, fit])

  // Wheel zoom: a native listener, because React's is passive and the page
  // must not scroll under the board.
  useEffect(() => {
    const el = rootRef.current
    if (!el) return
    const onWheel = (e: WheelEvent) => {
      e.preventDefault()
      const rect = el.getBoundingClientRect()
      const at = { x: e.clientX - rect.left, y: e.clientY - rect.top }
      const factor = Math.exp(-e.deltaY * (e.ctrlKey ? 0.01 : 0.0015))
      viewTween.current = null
      view.current = zoomAt(view.current, at, factor)
      setFrame(f => (f + 1) % 1_000_000)
    }
    el.addEventListener('wheel', onWheel, { passive: false })
    return () => el.removeEventListener('wheel', onWheel)
  }, [])

  const local = useCallback((clientX: number, clientY: number): Point => {
    const rect = rootRef.current?.getBoundingClientRect()
    return { x: clientX - (rect?.left ?? 0), y: clientY - (rect?.top ?? 0) }
  }, [])

  const nameOf = useCallback((key: string | null) => {
    if (!key) return null
    return placed.find(n => conceptKey(n) === key) ?? null
  }, [placed])

  const reveal = useCallback((name: string) => {
    const b = bodies.current[conceptKey(name)]
    if (!b) return
    const { w, h } = size.current
    const inset = latest.current.insets
    const p = toScreen(view.current, b)
    const margin = 24
    const inside = p.x - (b.w / 2) * view.current.k >= inset.left + margin
      && p.x + (b.w / 2) * view.current.k <= w - inset.right - margin
      && p.y - (b.h / 2) * view.current.k >= inset.top + margin
      && p.y + (b.h / 2) * view.current.k <= h - inset.bottom - margin
    if (inside) return
    const k = Math.max(view.current.k, 0.8)
    const cx = inset.left + (w - inset.left - inset.right) / 2
    const cy = inset.top + (h - inset.top - inset.bottom) / 2
    moveView({ k, x: cx - b.x * k, y: cy - b.y * k })
  }, [moveView])

  // The concept being read: once the reader has opened over the bottom of
  // the board, make sure its card is still in sight above it.
  useEffect(() => {
    if (!selected) return
    const t = window.setTimeout(() => reveal(selected), prefersReducedMotion() ? 0 : 300)
    return () => window.clearTimeout(t)
  }, [selected, reveal])

  // ── Commands for the page ────────────────────────────────────────────────
  useImperativeHandle(ref, () => ({
    fit: () => fit(true),
    tidy: () => {
      for (const b of Object.values(bodies.current)) {
        b.pinned = false
        b.vx = 0
        b.vy = 0
      }
      // Pull everything toward the middle and let the forces lay it out again.
      for (const b of Object.values(bodies.current)) {
        b.x *= 0.35
        b.y *= 0.35
      }
      kick(1)
      window.setTimeout(() => fit(true), prefersReducedMotion() ? 0 : 900)
    },
    zoom: factor => {
      moveView(zoomAt(view.current, { x: size.current.w / 2, y: size.current.h / 2 }, factor))
    },
    reveal,
    conceptAt: (clientX, clientY) => {
      const p = toWorld(view.current, local(clientX, clientY))
      return nameOf(bodyAt(bodies.current, conceptKeysRef.current, p))
    },
    contains: (clientX, clientY) => {
      const rect = rootRef.current?.getBoundingClientRect()
      return !!rect && clientX >= rect.left && clientX <= rect.right && clientY >= rect.top && clientY <= rect.bottom
    },
    placeAt: (name, clientX, clientY) => {
      const p = toWorld(view.current, local(clientX, clientY))
      const b = bodies.current[conceptKey(name)]
      if (!b) {
        pending.current.set(name.toLowerCase(), p)
        return
      }
      b.x = p.x
      b.y = p.y
      b.vx = 0
      b.vy = 0
      kick(0.35)
    },
  }), [fit, kick, moveView, local, nameOf, reveal])

  // ── Gestures ──────────────────────────────────────────────────────────────
  const startNodeDrag = (e: React.PointerEvent, name: string) => {
    if (e.button !== 0 && e.pointerType === 'mouse') return
    e.stopPropagation()
    const key = conceptKey(name)
    const body = bodies.current[key]
    if (!body) return
    pointers.current.set(e.pointerId, { x: e.clientX, y: e.clientY })
    rootRef.current?.setPointerCapture(e.pointerId)
    tweens.current.delete(key)
    gesture.current = {
      kind: 'node',
      name,
      key,
      startClient: { x: e.clientX, y: e.clientY },
      startBody: { x: body.x, y: body.y },
      moved: false,
    }
  }

  const onPointerDown = (e: React.PointerEvent) => {
    if (e.button !== 0 && e.pointerType === 'mouse') return
    pointers.current.set(e.pointerId, { x: e.clientX, y: e.clientY })
    rootRef.current?.setPointerCapture(e.pointerId)
    if (pointers.current.size === 2) {
      // A second finger: whatever the first was doing becomes a pinch.
      const g = gesture.current
      if (g?.kind === 'node') {
        const body = bodies.current[g.key]
        if (body) {
          body.pinned = false
          body.ghost = false
        }
      }
      const [p, q] = [...pointers.current.values()]
      const mid = local((p.x + q.x) / 2, (p.y + q.y) / 2)
      gesture.current = { kind: 'pinch', startDist: Math.hypot(p.x - q.x, p.y - q.y), startMid: mid, startView: view.current }
      dropTarget.current = null
      return
    }
    viewTween.current = null
    gesture.current = { kind: 'pan', startClient: { x: e.clientX, y: e.clientY }, startView: view.current, moved: false }
  }

  const onPointerMove = (e: React.PointerEvent) => {
    if (!pointers.current.has(e.pointerId)) return
    pointers.current.set(e.pointerId, { x: e.clientX, y: e.clientY })
    const g = gesture.current
    if (!g) return
    if (g.kind === 'pinch') {
      const [p, q] = [...pointers.current.values()]
      if (!p || !q) return
      const mid = local((p.x + q.x) / 2, (p.y + q.y) / 2)
      const factor = Math.hypot(p.x - q.x, p.y - q.y) / Math.max(1, g.startDist)
      const zoomed = zoomAt(g.startView, g.startMid, factor)
      view.current = { ...zoomed, x: zoomed.x + mid.x - g.startMid.x, y: zoomed.y + mid.y - g.startMid.y }
      setFrame(f => (f + 1) % 1_000_000)
      return
    }
    const dx = e.clientX - g.startClient.x
    const dy = e.clientY - g.startClient.y
    if (!g.moved && Math.hypot(dx, dy) < DRAG_SLOP) return
    g.moved = true
    if (g.kind === 'pan') {
      view.current = { ...g.startView, x: g.startView.x + dx, y: g.startView.y + dy }
      setFrame(f => (f + 1) % 1_000_000)
      return
    }
    const body = bodies.current[g.key]
    if (!body) return
    body.pinned = true
    body.ghost = true
    body.x = g.startBody.x + dx / view.current.k
    body.y = g.startBody.y + dy / view.current.k
    dropTarget.current = bodyAt(bodies.current, conceptKeysRef.current, { x: body.x, y: body.y }, g.key, 4)
    alpha.current = Math.max(alpha.current, 0.12)
    run()
  }

  const endGesture = (e: React.PointerEvent, cancelled: boolean) => {
    pointers.current.delete(e.pointerId)
    const g = gesture.current
    if (!g) return
    if (g.kind === 'pinch') {
      // One finger lifted: nothing further until both are up.
      if (pointers.current.size === 0) gesture.current = null
      return
    }
    gesture.current = null
    if (g.kind === 'pan') return
    const body = bodies.current[g.key]
    if (body) body.ghost = false
    const target = nameOf(dropTarget.current)
    dropTarget.current = null
    if (!g.moved) {
      if (body) body.pinned = false
      if (cancelled) return
      const holding = latest.current.held
      if (holding && holding.toLowerCase() !== g.name.toLowerCase()) latest.current.onCombine(holding, g.name)
      else latest.current.onOpen(g.name)
      setFrame(f => (f + 1) % 1_000_000)
      return
    }
    if (!body) return
    const verdict = !cancelled && target ? latest.current.onCombine(g.name, target) : 'stay'
    if (verdict === 'bounce') {
      if (prefersReducedMotion()) {
        body.x = g.startBody.x
        body.y = g.startBody.y
        body.pinned = false
      } else {
        // Home through the others, not into them: a ghost until it lands.
        body.ghost = true
        tweens.current.set(g.key, { from: { x: body.x, y: body.y }, to: g.startBody, start: performance.now() })
      }
    } else {
      body.pinned = false
    }
    kick(0.3)
  }

  // ── Drawing ───────────────────────────────────────────────────────────────
  const v = view.current
  const all = bodies.current
  const g = gesture.current
  const dragging = g?.kind === 'node' && g.moved ? g.key : null
  const targetKey = dragging ? dropTarget.current : null
  const pop = new Set(justMade.map(n => n.toLowerCase()))
  // What the reader is looking at: the concept being read, the one under the
  // pointer, or one connection's card. Everything else steps back.
  const focus = (dragging ? null : pointing) ?? selected?.toLowerCase() ?? null
  const touches = (c: Connection, name: string) => c.a.toLowerCase() === name || c.b.toLowerCase() === name
  const isLit = (c: Connection) => c.key === openConnection || c.key === flashConnection || (!!focus && touches(c, focus))
  const anyLit = !!focus || !!openConnection
  const visible = connections.filter(c => c.strength >= minStrength || isLit(c))
  const zoomedIn = v.k >= BADGE_ZOOM
  // Zoomed out, only what is lit carries its strength — drawn at a size that
  // can still be read and tapped on screen.
  const badgeScale = zoomedIn ? 1 : Math.min(3, 0.8 / v.k)

  return (
    <div
      ref={rootRef}
      className="craft-floor relative h-full w-full touch-none select-none overflow-hidden"
      style={{
        backgroundSize: `${22 * v.k}px ${22 * v.k}px`,
        backgroundPosition: `${v.x}px ${v.y}px`,
        cursor: g?.kind === 'pan' && g.moved ? 'grabbing' : undefined,
      }}
      onPointerDown={onPointerDown}
      onPointerMove={onPointerMove}
      onPointerUp={e => endGesture(e, false)}
      onPointerCancel={e => endGesture(e, true)}
      data-testid="craft-board"
    >
      <div
        className="absolute left-0 top-0 origin-top-left"
        style={{ transform: `translate(${v.x}px, ${v.y}px) scale(${v.k})` }}
      >
        <svg className="pointer-events-none absolute left-0 top-0 overflow-visible" width={1} height={1} aria-hidden="true">
          {visible.map(c => {
            const a = all[conceptKey(c.a)]
            const b = all[conceptKey(c.b)]
            if (!a || !b) return null
            const lit = isLit(c)
            const { width, color, dash } = edgeStyle(c.strength, lit)
            const fresh = freshConnection === c.key
            return (
              <g
                key={c.key}
                className={cn(fresh && 'craft-edge-in', flashConnection === c.key && 'craft-edge-flash')}
                opacity={anyLit && !lit ? 0.3 : 1}
              >
                <path
                  d={`M${a.x} ${a.y} L${b.x} ${b.y}`}
                  pathLength={fresh ? 1 : undefined}
                  fill="none"
                  stroke={color}
                  strokeWidth={width}
                  strokeDasharray={fresh ? undefined : dash}
                  strokeLinecap="round"
                  data-testid="craft-line"
                  data-strength={c.strength}
                />
              </g>
            )
          })}
          {/* Cause to effect: from the line that made a card to the card —
              while it is new, or while that connection or the card is the
              one being looked at. */}
          {[...state.madeFrom].map(([made, from]) => {
            if (!state.fresh.has(made) && !isLit(from) && focus !== made) return null
            if (from.strength < minStrength && !isLit(from)) return null
            const a = all[conceptKey(from.a)]
            const b = all[conceptKey(from.b)]
            const m = all[conceptKey(made)]
            if (!a || !b || !m) return null
            const { x, y } = lineLabelPoint(a, b)
            return (
              <path
                key={`made:${made}`}
                className={cn(justMade.some(n => n.toLowerCase() === made) && 'craft-made-in')}
                d={`M${x} ${y} L${m.x} ${m.y}`}
                fill="none"
                stroke={ACCENT}
                strokeWidth={1.5}
                strokeDasharray="3 5"
                strokeLinecap="round"
                opacity={0.85}
                data-testid="craft-made-link"
              />
            )
          })}
        </svg>

        {visible.map(c => {
          const a = all[conceptKey(c.a)]
          const b = all[conceptKey(c.b)]
          if (!a || !b) return null
          const lit = isLit(c)
          const fresh = freshConnection === c.key
          // A busy board, or one zoomed out, shows only the numbers of what is being looked at.
          if ((anyLit || !zoomedIn) && !lit && !fresh) return null
          const scale = lit ? badgeScale : 1
          const w = BADGE.w * scale
          const h = BADGE.h * scale
          const { x, y } = lineLabelPoint(a, b)
          const tier = strengthTier(c.strength)
          // What the connection says, under its strength — for the line being looked at, or just found.
          const relation = (lit || fresh) && relationOf ? relationOf(c) : null
          // An arrow says which way the phrase reads, from the card it is about.
          let label: string | null = null
          if (relation) {
            const from = all[conceptKey(relation.from)]
            const to = all[conceptKey(relation.to)]
            const leftward = !!from && !!to && from.x > to.x
            label = relation.symmetric ? relation.label : leftward ? `← ${relation.label}` : `${relation.label} →`
          }
          return (
            <div key={c.key} className={cn('pointer-events-none absolute left-0 top-0', lit || fresh ? 'z-[15]' : 'z-[5]')}>
              <button
                type="button"
                data-sound="none"
                onPointerDown={e => e.stopPropagation()}
                onClick={() => onConnection(c)}
                className={cn(
                  'pointer-events-auto absolute left-0 top-0 flex items-center justify-center rounded-full text-[10px] font-semibold leading-none tabular-nums transition-colors',
                  'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring',
                  lit
                    ? 'text-white'
                    : tier === 'strong'
                      ? 'bg-foreground text-background hover:opacity-90'
                      : 'bg-muted text-muted-foreground ring-1 ring-border hover:text-foreground',
                  freshConnection === c.key && 'craft-node-pop',
                )}
                style={{
                  width: w,
                  height: h,
                  fontSize: 10 * scale,
                  transform: `translate(${x - w / 2}px, ${y - h / 2}px)`,
                  background: lit ? ACCENT_FILL : undefined,
                }}
                title={`${c.a} and ${c.b}: ${tier} connection, ${c.strength} of 100`}
                aria-label={`${c.a} and ${c.b}: ${tier} connection, strength ${c.strength}`}
                data-testid="craft-strength"
              >
                {c.strength}
              </button>
              {label && (
                <span
                  className="absolute left-0 top-0 whitespace-nowrap rounded-md bg-card/95 px-1.5 py-0.5 font-medium leading-tight text-foreground shadow-[var(--shadow-card)]"
                  style={{
                    fontSize: 11 * scale,
                    transform: `translate(${x}px, ${y + h / 2 + 3 * scale}px) translateX(-50%)`,
                  }}
                  data-testid="craft-relation"
                >
                  {label}
                </span>
              )}
            </div>
          )
        })}

        {placed.map(name => {
          const key = conceptKey(name)
          const b = all[key]
          if (!b) return null
          const lower = name.toLowerCase()
          const isSelected = selected?.toLowerCase() === lower
          const isHeld = held?.toLowerCase() === lower
          const isTarget = targetKey === key || hover?.toLowerCase() === lower
          const isDragging = dragging === key
          // Made and not yet played with: the exam's colour, until it is.
          const isNew = state.fresh.has(lower)
          return (
            <div
              key={key}
              className={cn('absolute left-0 top-0', isDragging ? 'z-20' : 'z-10')}
              style={{ width: b.w, height: b.h, transform: `translate(${b.x - b.w / 2}px, ${b.y - b.h / 2}px)` }}
            >
              <button
                type="button"
                data-sound="none"
                data-craft-node={name}
                onPointerDown={e => startNodeDrag(e, name)}
                onPointerEnter={e => { if (e.pointerType === 'mouse') setPointing(lower) }}
                onPointerLeave={() => setPointing(p => (p === lower ? null : p))}
                // Pointer taps are resolved in the board's own pointerup (a tap
                // and a drag start the same way); this is the keyboard's way in.
                onClick={e => {
                  if (e.detail !== 0) return
                  const holding = latest.current.held
                  if (holding && holding.toLowerCase() !== lower) onCombine(holding, name)
                  else onOpen(name)
                }}
                aria-current={isSelected ? 'true' : undefined}
                aria-label={isNew ? `${name}, new` : undefined}
                data-new={isNew || undefined}
                className={cn(
                  'relative flex h-full w-full items-center justify-center overflow-hidden rounded-lg px-2.5 text-center',
                  'text-[13px] font-medium leading-tight shadow-[var(--shadow-card)] transition-[transform,background-color,color] duration-200',
                  'cursor-grab focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ring',
                  isNew ? 'text-white' : 'bg-card text-card-foreground',
                  flashcardFoilClass(levels.isCollected(name), levels.levelOf(name), { tile: true }),
                  (isSelected || isTarget) && 'outline outline-2 outline-offset-2',
                  isHeld && 'outline-dashed outline-2 outline-offset-2',
                  isTarget && 'scale-105',
                  isDragging && 'cursor-grabbing shadow-lg',
                  pop.has(lower) && 'craft-node-pop',
                )}
                style={{
                  background: isNew ? ACCENT_FILL : undefined,
                  boxShadow: isNew ? `0 0 0 4px ${ACCENT_HALO}, var(--shadow-card)` : undefined,
                  outlineColor: isSelected || isHeld || isTarget ? ACCENT : undefined,
                }}
              >
                <span className="line-clamp-2">{name}</span>
              </button>
            </div>
          )
        })}
      </div>
    </div>
  )
})
