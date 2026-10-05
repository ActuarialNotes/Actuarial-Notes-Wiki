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
import {
  CRAFT_RELATIONS,
  availableNodes,
  foundRecipes,
  nodeDepths,
  recipeId,
  type CraftModule,
  type CraftProgress,
  type CraftRecipe,
} from '@/lib/conceptCraft'
import {
  ALPHA_MIN,
  ROW_GAP,
  bodyAt,
  cardSize,
  cool,
  edgeToBox,
  fitView,
  makeBody,
  seedPositions,
  spawnPoint,
  step,
  tagSize,
  toWorld,
  zoomAt,
  type Body,
  type Insets,
  type Point,
  type Spring,
  type View,
} from '@/lib/craftLayout'
import { flashcardFoilClass } from '@/lib/flashcardFoil'
import type { ConceptLevels } from '@/hooks/useConceptLevels'
import { cn } from '@/lib/utils'

/**
 * **The Concept Craft board** — an infinite, zoomable canvas with every
 * concept the reader holds on it as a card, every recipe they have found as a
 * tag between its two ingredients with the result hanging off it, and a small
 * force simulation (`lib/craftLayout.ts`) keeping the lot apart.
 *
 * What it does with the reader's hands:
 * - drag a card onto another → `onCombine`, which answers whether the card
 *   should **bounce** back to where it was lifted from (no link, or a Mastery
 *   prompt to answer first) or **stay**;
 * - tap a card → `onSelect` (the inspector), or, with a deck card held,
 *   `onCombine` with that;
 * - drag the empty board to pan, pinch or wheel to zoom.
 *
 * Positions live in a ref and the frame is re-rendered from it while the
 * simulation is warm; the page is told where everything settled (`onSettle`)
 * so the layout outlives the visit. The page drives the rest through
 * `BoardCommands` — fit, tidy, focus a card, and the hit-testing a card
 * dragged in from the deck needs.
 */

export interface BoardCommands {
  fit: () => void
  tidy: () => void
  zoom: (factor: number) => void
  focus: (name: string) => void
  /** The concept under a screen point, if any. */
  conceptAt: (clientX: number, clientY: number) => string | null
  /** Whether a screen point is over the board at all. */
  contains: (clientX: number, clientY: number) => boolean
  /** Move a concept to a screen point — a deck card dropped on empty board. */
  place: (name: string, clientX: number, clientY: number) => void
}

export type DropVerdict = 'bounce' | 'stay'

export interface CraftBoardProps {
  module: CraftModule
  progress: CraftProgress
  /** Where the concepts were left last time, by lower-cased name. */
  saved: Record<string, [number, number]>
  levels: ConceptLevels
  selected: string | null
  /** A deck card picked up by a tap, waiting for a second concept. */
  held: string | null
  /** Concepts the challenge's hint is pointing at. */
  hinted: readonly string[]
  /** The concept a card dragged in from the deck is over. */
  hover: string | null
  /** Room the page's panels cover at the board's edges — what "fit" frames around. */
  insets: Insets
  /** The concept and recipe just found — the pop and the line drawing in. */
  freshNode: string | null
  freshRecipe: string | null
  /** A recipe to light up — a pair dropped again, a tag tapped. */
  flashRecipe: string | null
  onSelect: (name: string | null) => void
  onCombine: (a: string, b: string) => DropVerdict
  onTag: (recipe: CraftRecipe) => void
  onSettle: (positions: Record<string, [number, number]>) => void
}

const conceptKey = (name: string) => `c:${name.toLowerCase()}`
const junctionKey = (id: string) => `j:${id}`
const INGREDIENT_SPRING = 118
const RESULT_SPRING = 92
const DRAG_SLOP = 5
const BOUNCE_MS = 320
const VIEW_MS = 380

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

export const CraftBoard = forwardRef<BoardCommands, CraftBoardProps>(function CraftBoard(
  {
    module,
    progress,
    saved,
    levels,
    selected,
    held,
    hinted,
    hover,
    insets,
    freshNode,
    freshRecipe,
    flashRecipe,
    onSelect,
    onCombine,
    onTag,
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
  const fitted = useRef(false)
  const [, setFrame] = useState(0)

  // Read through refs by the loop and the gestures, which outlive any one render.
  const latest = useRef({ onSettle, onCombine, onSelect, held, insets })
  latest.current = { onSettle, onCombine, onSelect, held, insets }

  const available = useMemo(() => availableNodes(module, progress), [module, progress])
  const recipes = useMemo(() => {
    // One junction per pair found; a result reached two ways hangs off both.
    return foundRecipes(module, progress)
  }, [module, progress])

  const springs = useMemo<Spring[]>(() => recipes.flatMap(r => {
    const j = junctionKey(recipeId(r))
    return [
      { a: conceptKey(r.a), b: j, length: INGREDIENT_SPRING },
      { a: conceptKey(r.b), b: j, length: INGREDIENT_SPRING },
      { a: j, b: conceptKey(r.result), length: RESULT_SPRING, below: true },
    ]
  }), [recipes])
  const springsRef = useRef(springs)
  springsRef.current = springs

  const conceptKeys = useMemo(() => available.map(conceptKey), [available])
  const conceptKeysRef = useRef(conceptKeys)
  conceptKeysRef.current = conceptKeys

  const positions = useCallback((): Record<string, [number, number]> => {
    const out: Record<string, [number, number]> = {}
    for (const name of available) {
      const b = bodies.current[conceptKey(name)]
      if (b) out[name.toLowerCase()] = [Math.round(b.x), Math.round(b.y)]
    }
    return out
  }, [available])
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
    const to = fitView(list, size.current.w, size.current.h, 40, latest.current.insets)
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
    }
    measure()
    const ro = new ResizeObserver(measure)
    ro.observe(el)
    return () => ro.disconnect()
  }, [fit])

  // ── Keep the bodies in step with what the reader holds ───────────────────
  useLayoutEffect(() => {
    const all = bodies.current
    const wanted = new Set<string>()
    let added = 0
    const seeds = seedPositions(module.primitives.length)

    available.forEach(name => {
      const key = conceptKey(name)
      wanted.add(key)
      if (all[key]) return
      const remembered = saved[name.toLowerCase()]
      let at: Point | null = remembered ? { x: remembered[0], y: remembered[1] } : null
      if (!at) {
        const made = recipes.find(r => r.result.toLowerCase() === name.toLowerCase())
        const a = made && all[conceptKey(made.a)]
        const b = made && all[conceptKey(made.b)]
        if (a && b) at = spawnPoint(a, b)
      }
      if (!at) {
        const i = module.primitives.findIndex(p => p.toLowerCase() === name.toLowerCase())
        // An ingredient a milestone introduced lands beside the node that
        // earned it, the second one beside the first.
        const step = module.introduces?.find(s => s.nodes.some(n => n.toLowerCase() === name.toLowerCase()))
        const trigger = step && all[conceptKey(step.after)]
        const nth = step ? step.nodes.findIndex(n => n.toLowerCase() === name.toLowerCase()) : 0
        at = i >= 0 ? seeds[i] : trigger ? { x: trigger.x + 190 * (nth + 1), y: trigger.y } : { x: 0, y: 0 }
      }
      all[key] = makeBody(at, cardSize(name))
      added++
    })

    recipes.forEach(r => {
      const key = junctionKey(recipeId(r))
      wanted.add(key)
      if (all[key]) return
      const a = all[conceptKey(r.a)]
      const b = all[conceptKey(r.b)]
      const at = a && b ? { x: (a.x + b.x) / 2, y: (a.y + b.y) / 2 } : { x: 0, y: 0 }
      all[key] = makeBody(at, tagSize(CRAFT_RELATIONS[r.relation].label))
      added++
    })

    for (const key of Object.keys(all)) if (!wanted.has(key)) delete all[key]

    // Every body's row, from how deep it sits in what has been built — set on
    // every change, since a shorter route found can lift a concept a row.
    const depths = nodeDepths(module, progress)
    available.forEach(name => {
      const body = all[conceptKey(name)]
      const d = depths.get(name.toLowerCase())
      if (body) body.row = d === undefined ? undefined : d * ROW_GAP
    })
    recipes.forEach(r => {
      const body = all[junctionKey(recipeId(r))]
      const a = depths.get(r.a.toLowerCase())
      const b = depths.get(r.b.toLowerCase())
      const c = depths.get(r.result.toLowerCase())
      if (body && a !== undefined && b !== undefined && c !== undefined) body.row = ((Math.max(a, b) + c) / 2) * ROW_GAP
    })

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
    }
    // `saved` is only read for concepts arriving on the board, never to move
    // one already there — the store echoing back where things settled must
    // not restart the simulation.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [available, recipes, module, progress, kick, fit])

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
    return available.find(n => conceptKey(n) === key) ?? null
  }, [available])

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
    focus: name => {
      const b = bodies.current[conceptKey(name)]
      if (!b) return
      const k = Math.max(view.current.k, 0.9)
      moveView({ k, x: size.current.w / 2 - b.x * k, y: size.current.h / 2 - b.y * k })
    },
    conceptAt: (clientX, clientY) => {
      const p = toWorld(view.current, local(clientX, clientY))
      return nameOf(bodyAt(bodies.current, conceptKeysRef.current, p))
    },
    contains: (clientX, clientY) => {
      const rect = rootRef.current?.getBoundingClientRect()
      return !!rect && clientX >= rect.left && clientX <= rect.right && clientY >= rect.top && clientY <= rect.bottom
    },
    place: (name, clientX, clientY) => {
      const b = bodies.current[conceptKey(name)]
      if (!b) return
      const p = toWorld(view.current, local(clientX, clientY))
      b.x = p.x
      b.y = p.y
      b.vx = 0
      b.vy = 0
      kick(0.35)
    },
  }), [fit, kick, moveView, local, nameOf])

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
    if (g.kind === 'pan') {
      if (!g.moved && !cancelled) latest.current.onSelect(null)
      return
    }
    const body = bodies.current[g.key]
    if (body) body.ghost = false
    const target = nameOf(dropTarget.current)
    dropTarget.current = null
    if (!g.moved) {
      if (body) body.pinned = false
      if (cancelled) return
      const holding = latest.current.held
      if (holding && holding.toLowerCase() !== g.name.toLowerCase()) latest.current.onCombine(holding, g.name)
      else latest.current.onSelect(g.name)
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
  const sel = selected?.toLowerCase() ?? null
  const hintSet = new Set(hinted.map(h => h.toLowerCase()))
  const g = gesture.current
  const dragging = g?.kind === 'node' && g.moved ? g.key : null
  const targetKey = dragging ? dropTarget.current : null

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
        <svg className="absolute left-0 top-0 overflow-visible" width={1} height={1} aria-hidden="true">
          <defs>
            <marker id="craft-arrow" viewBox="0 0 8 8" refX="7" refY="4" markerWidth="7" markerHeight="7" orient="auto-start-reverse">
              <path d="M0 0.5 L7.5 4 L0 7.5 Z" fill="hsl(var(--muted-foreground))" />
            </marker>
            <marker id="craft-arrow-lit" viewBox="0 0 8 8" refX="7" refY="4" markerWidth="7" markerHeight="7" orient="auto-start-reverse">
              <path d="M0 0.5 L7.5 4 L0 7.5 Z" fill="hsl(var(--foreground))" />
            </marker>
          </defs>
          {recipes.map(r => {
            const id = recipeId(r)
            const a = all[conceptKey(r.a)]
            const b = all[conceptKey(r.b)]
            const j = all[junctionKey(id)]
            const c = all[conceptKey(r.result)]
            if (!a || !b || !j || !c) return null
            const lit = !!sel && [r.a, r.b, r.result].some(n => n.toLowerCase() === sel)
            const flash = flashRecipe === id
            const end = edgeToBox(j, c, 4)
            const fresh = freshRecipe === id
            return (
              <g key={id} className={cn(fresh && 'craft-edge-in', flash && 'craft-edge-flash')}>
                <path
                  d={`M${a.x} ${a.y} L${j.x} ${j.y} L${b.x} ${b.y}`}
                  pathLength={fresh ? 1 : undefined}
                  fill="none"
                  stroke={lit || flash ? 'hsl(var(--foreground))' : 'hsl(var(--muted-foreground) / 0.5)'}
                  strokeWidth={lit || flash ? 2 : 1.5}
                />
                <path
                  d={`M${j.x} ${j.y} L${end.x} ${end.y}`}
                  pathLength={fresh ? 1 : undefined}
                  fill="none"
                  stroke={lit || flash ? 'hsl(var(--foreground))' : 'hsl(var(--muted-foreground) / 0.5)'}
                  strokeWidth={lit || flash ? 2 : 1.5}
                  strokeDasharray={fresh ? undefined : '5 4'}
                  markerEnd={`url(#${lit || flash ? 'craft-arrow-lit' : 'craft-arrow'})`}
                />
              </g>
            )
          })}
        </svg>

        {recipes.map(r => {
          const id = recipeId(r)
          const j = all[junctionKey(id)]
          if (!j) return null
          const lit = (!!sel && [r.a, r.b, r.result].some(n => n.toLowerCase() === sel)) || flashRecipe === id
          return (
            <button
              key={id}
              type="button"
              data-sound="none"
              onPointerDown={e => e.stopPropagation()}
              onClick={() => onTag(r)}
              className={cn(
                'absolute left-0 top-0 flex items-center justify-center whitespace-nowrap rounded-full px-2 text-[11px] font-medium leading-none transition-colors',
                'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring',
                lit ? 'bg-foreground text-background' : 'bg-muted text-muted-foreground hover:text-foreground',
              )}
              style={{ width: j.w, height: j.h, transform: `translate(${j.x - j.w / 2}px, ${j.y - j.h / 2}px)` }}
              title={`${r.a} ${CRAFT_RELATIONS[r.relation].label.toLowerCase()} ${r.b} → ${r.result}`}
              aria-label={`${r.a} ${CRAFT_RELATIONS[r.relation].label.toLowerCase()} ${r.b} makes ${r.result}`}
              data-testid="craft-tag"
            >
              {CRAFT_RELATIONS[r.relation].label}
            </button>
          )
        })}

        {available.map(name => {
          const key = conceptKey(name)
          const b = all[key]
          if (!b) return null
          const lower = name.toLowerCase()
          const isSelected = sel === lower
          const isHeld = held?.toLowerCase() === lower
          const isTarget = targetKey === key || hover?.toLowerCase() === lower
          const isDragging = dragging === key
          return (
            <div
              key={key}
              className={cn('absolute left-0 top-0', isDragging ? 'z-20' : 'z-10')}
              style={{ width: b.w, height: b.h, transform: `translate(${b.x - b.w / 2}px, ${b.y - b.h / 2}px)` }}
            >
              {hintSet.has(lower) && (
                <span aria-hidden className="tap-pulse pointer-events-none absolute -inset-2 rounded-xl border-2 border-primary" />
              )}
              <button
                type="button"
                data-sound="none"
                data-craft-node={name}
                onPointerDown={e => startNodeDrag(e, name)}
                // Pointer taps are resolved in the board's own pointerup (a tap
                // and a drag start the same way); this is the keyboard's way in.
                onClick={e => {
                  if (e.detail !== 0) return
                  const holding = latest.current.held
                  if (holding && holding.toLowerCase() !== lower) onCombine(holding, name)
                  else onSelect(name)
                }}
                aria-pressed={isSelected}
                className={cn(
                  'relative flex h-full w-full items-center justify-center overflow-hidden rounded-lg bg-card px-2.5 text-center text-card-foreground',
                  'text-[13px] font-medium leading-tight shadow-[var(--shadow-card)] transition-transform duration-150',
                  'cursor-grab focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ring',
                  flashcardFoilClass(levels.isCollected(name), levels.levelOf(name), { tile: true }),
                  isSelected && 'outline outline-2 outline-offset-2 outline-primary',
                  isHeld && 'outline-dashed outline-2 outline-offset-2 outline-primary',
                  isTarget && 'scale-105 outline outline-2 outline-offset-2 outline-primary/70',
                  isDragging && 'cursor-grabbing shadow-lg',
                  freshNode?.toLowerCase() === lower && 'craft-node-pop',
                )}
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
