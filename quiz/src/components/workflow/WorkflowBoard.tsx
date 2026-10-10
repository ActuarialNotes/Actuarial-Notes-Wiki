import { forwardRef, useCallback, useEffect, useImperativeHandle, useLayoutEffect, useRef, useState } from 'react'
import { BookOpen, Calculator, Database, type LucideIcon } from 'lucide-react'
import { fitView, toScreen, toWorld, zoomAt, type Insets, type Point, type View } from '@/lib/craftLayout'
import { GRID, NODE, boxes, cellAt, cellCentre, edgeGeometry, type Cell } from '@/lib/workflowGrid'
import {
  KIND_LABEL,
  edgeKey,
  edgeKind,
  edgeLabel,
  landingCell,
  stepName,
  type EdgeKind,
  type StepKind,
  type StepRun,
  type Workflow,
  type WorkflowEdge,
} from '@/lib/workflow'
import { formatValue } from '@/lib/tools'
import { flashcardFoilClass } from '@/lib/flashcardFoil'
import type { ConceptLevels } from '@/hooks/useConceptLevels'
import { cn } from '@/lib/utils'

/**
 * **The Workflow Builder's board** (docs/workflow-builder.md) — Concept
 * Craft's canvas, with the physics taken out: every step is a card that stays
 * where it is put, snapped to a fine grid (`lib/workflowGrid.ts`), and every
 * connection an arrow from one card's right edge into the next one's left.
 * Only a concept's connection carries a word; values moving between steps are
 * the line itself.
 *
 * What it does with the reader's hands:
 * - drag a card → it moves anywhere, snapped to the grid; dropped on another
 *   card, it lands in the nearest place clear of it (a dashed outline shows
 *   where, as it is dragged);
 * - drag from a card's **port** (the dot on its right edge) onto another card
 *   → `onConnect`, a connection from the first to the second; tap the port and
 *   then a card for the same thing without dragging;
 * - tap a card → `onSelect`; tap a connection (its line, or a concept's
 *   label) → `onSelectEdge`;
 * - drag the empty board to pan, pinch or wheel to zoom — the same camera as
 *   Concept Craft's (`lib/craftLayout.ts`).
 */

export interface WorkflowBoardCommands {
  fit: () => void
  zoom: (factor: number) => void
  /** Bring a step into view if it is out of it. */
  reveal: (id: string) => void
}

export interface WorkflowBoardProps {
  workflow: Workflow
  runs: Map<string, StepRun>
  levels: ConceptLevels
  /** The step whose panel is open. */
  selected: string | null
  /** The connection whose panel is open (`edgeKey`). */
  selectedEdge: string | null
  /** A step whose port was tapped: the next card tapped is connected from it. */
  linking: string | null
  /**
   * Upstream steps whose value the open step is linked to, and which of their
   * headline figures it is (`carriedTile`, -1 for none in particular): drawn on
   * the primary colour, as the linked field is on the open step's card.
   */
  marked: ReadonlyMap<string, number>
  insets: Insets
  onSelect: (id: string) => void
  onSelectEdge: (edge: WorkflowEdge) => void
  onMove: (id: string, to: Cell) => void
  onConnect: (from: string, to: string) => void
  onLink: (id: string | null) => void
  onBackground: () => void
}

const DRAG_SLOP = 5
const VIEW_MS = 380
/** Below this zoom a concept connection's label is too small to read: a dot is drawn instead. */
const LABEL_ZOOM = 0.6
/** How wide a line is to the touch, in world px. */
const LINE_HIT = 14

const KIND_ICON: Record<StepKind, LucideIcon> = { data: Database, tool: Calculator, concept: BookOpen }
/** Each kind's stripe down the card's left edge. */
const KIND_TINT: Record<StepKind, string> = {
  data: 'hsl(199 89% 56%)',
  tool: 'hsl(var(--primary))',
  concept: 'hsl(38 92% 56%)',
}
const ACCENT = 'hsl(var(--primary))'

type Gesture =
  | { kind: 'node'; id: string; start: Point; moved: boolean; at: Point }
  | { kind: 'link'; id: string; start: Point; moved: boolean; at: Point }
  | { kind: 'pan'; start: Point; startView: View; moved: boolean }
  | { kind: 'pinch'; startDist: number; startMid: Point; startView: View }

function prefersReducedMotion(): boolean {
  return typeof window !== 'undefined' && !!window.matchMedia?.('(prefers-reduced-motion: reduce)').matches
}

const easeOut = (t: number) => 1 - Math.pow(1 - t, 3)

function edgeStroke(kind: EdgeKind, lit: boolean): { width: number; color: string; dash?: string } {
  if (lit) return { width: 3, color: ACCENT }
  switch (kind) {
    case 'handoff':
      return { width: 2.5, color: 'hsl(var(--foreground) / 0.8)' }
    case 'feeds':
      return { width: 1.75, color: 'hsl(var(--foreground) / 0.5)' }
    default:
      return { width: 1.5, color: KIND_TINT.concept, dash: '4 5' }
  }
}

export const WorkflowBoard = forwardRef<WorkflowBoardCommands, WorkflowBoardProps>(function WorkflowBoard(
  {
    workflow,
    runs,
    levels,
    selected,
    selectedEdge,
    linking,
    marked,
    insets,
    onSelect,
    onSelectEdge,
    onMove,
    onConnect,
    onLink,
    onBackground,
  },
  ref,
) {
  const rootRef = useRef<HTMLDivElement>(null)
  const view = useRef<View>({ x: 0, y: 0, k: 1 })
  const size = useRef({ w: 0, h: 0 })
  const gesture = useRef<Gesture | null>(null)
  const pointers = useRef(new Map<number, Point>())
  const viewTween = useRef<{ from: View; to: View; start: number } | null>(null)
  const raf = useRef(0)
  const fitted = useRef(false)
  const [, setFrame] = useState(0)
  const redraw = useCallback(() => setFrame(f => (f + 1) % 1_000_000), [])

  const latest = useRef({ workflow, insets })
  latest.current = { workflow, insets }

  const nodeAtWorld = useCallback((p: Point): string | null => {
    const hit = latest.current.workflow.nodes.find(n => {
      const c = cellCentre(n)
      return Math.abs(p.x - c.x) <= NODE.w / 2 + 6 && Math.abs(p.y - c.y) <= NODE.h / 2 + 6
    })
    return hit?.id ?? null
  }, [])

  const local = useCallback((clientX: number, clientY: number): Point => {
    const rect = rootRef.current?.getBoundingClientRect()
    return { x: clientX - (rect?.left ?? 0), y: clientY - (rect?.top ?? 0) }
  }, [])

  // ── The camera ────────────────────────────────────────────────────────────
  const tick = useCallback(() => {
    raf.current = 0
    const vt = viewTween.current
    if (!vt) return
    const t = Math.min(1, (performance.now() - vt.start) / VIEW_MS)
    const e = easeOut(t)
    view.current = {
      x: vt.from.x + (vt.to.x - vt.from.x) * e,
      y: vt.from.y + (vt.to.y - vt.from.y) * e,
      k: vt.from.k + (vt.to.k - vt.from.k) * e,
    }
    if (t >= 1) viewTween.current = null
    else raf.current = requestAnimationFrame(tick)
    redraw()
  }, [redraw])

  useEffect(() => () => {
    if (raf.current) cancelAnimationFrame(raf.current)
    raf.current = 0
  }, [])

  const moveView = useCallback((to: View) => {
    if (prefersReducedMotion()) {
      view.current = to
      viewTween.current = null
      redraw()
      return
    }
    viewTween.current = { from: view.current, to, start: performance.now() }
    if (!raf.current) raf.current = requestAnimationFrame(tick)
  }, [redraw, tick])

  const fitTo = useCallback((animate: boolean) => {
    const list = boxes(latest.current.workflow.nodes)
    const to = fitView(list, size.current.w, size.current.h, Math.min(48, size.current.w * 0.05), latest.current.insets)
    if (animate) moveView(to)
    else {
      view.current = to
      redraw()
    }
  }, [moveView, redraw])

  useLayoutEffect(() => {
    const el = rootRef.current
    if (!el) return
    const measure = () => {
      const rect = el.getBoundingClientRect()
      size.current = { w: rect.width, h: rect.height }
      if (!fitted.current && rect.width > 0) {
        fitTo(false)
        fitted.current = true
      }
      redraw()
    }
    measure()
    const ro = new ResizeObserver(measure)
    ro.observe(el)
    return () => ro.disconnect()
  }, [fitTo, redraw])

  // A different workflow opened: frame it afresh.
  const shown = useRef(workflow.id)
  useEffect(() => {
    if (shown.current === workflow.id) return
    shown.current = workflow.id
    fitTo(false)
  }, [workflow.id, fitTo])

  useEffect(() => {
    const el = rootRef.current
    if (!el) return
    const onWheel = (e: WheelEvent) => {
      e.preventDefault()
      const rect = el.getBoundingClientRect()
      const factor = Math.exp(-e.deltaY * (e.ctrlKey ? 0.01 : 0.0015))
      viewTween.current = null
      view.current = zoomAt(view.current, { x: e.clientX - rect.left, y: e.clientY - rect.top }, factor)
      redraw()
    }
    el.addEventListener('wheel', onWheel, { passive: false })
    return () => el.removeEventListener('wheel', onWheel)
  }, [redraw])

  const reveal = useCallback((id: string) => {
    const node = latest.current.workflow.nodes.find(n => n.id === id)
    if (!node) return
    const c = cellCentre(node)
    const { w, h } = size.current
    const inset = latest.current.insets
    const p = toScreen(view.current, c)
    const k = view.current.k
    const margin = 24
    const inside = p.x - (NODE.w / 2) * k >= inset.left + margin
      && p.x + (NODE.w / 2) * k <= w - inset.right - margin
      && p.y - (NODE.h / 2) * k >= inset.top + margin
      && p.y + (NODE.h / 2) * k <= h - inset.bottom - margin
    if (inside) return
    const nk = Math.max(k, 0.8)
    const cx = inset.left + (w - inset.left - inset.right) / 2
    const cy = inset.top + (h - inset.top - inset.bottom) / 2
    moveView({ k: nk, x: cx - c.x * nk, y: cy - c.y * nk })
  }, [moveView])

  useImperativeHandle(ref, () => ({
    fit: () => fitTo(true),
    zoom: factor => moveView(zoomAt(view.current, { x: size.current.w / 2, y: size.current.h / 2 }, factor)),
    reveal,
  }), [fitTo, moveView, reveal])

  // ── Gestures ──────────────────────────────────────────────────────────────
  const capture = (e: React.PointerEvent) => {
    pointers.current.set(e.pointerId, { x: e.clientX, y: e.clientY })
    rootRef.current?.setPointerCapture(e.pointerId)
  }

  const startOn = (e: React.PointerEvent, kind: 'node' | 'link', id: string) => {
    if (e.button !== 0 && e.pointerType === 'mouse') return
    e.stopPropagation()
    capture(e)
    viewTween.current = null
    const start = { x: e.clientX, y: e.clientY }
    gesture.current = { kind, id, start, moved: false, at: start }
  }

  const onPointerDown = (e: React.PointerEvent) => {
    if (e.button !== 0 && e.pointerType === 'mouse') return
    capture(e)
    if (pointers.current.size === 2) {
      const [p, q] = [...pointers.current.values()]
      gesture.current = {
        kind: 'pinch',
        startDist: Math.hypot(p.x - q.x, p.y - q.y),
        startMid: local((p.x + q.x) / 2, (p.y + q.y) / 2),
        startView: view.current,
      }
      return
    }
    viewTween.current = null
    gesture.current = { kind: 'pan', start: { x: e.clientX, y: e.clientY }, startView: view.current, moved: false }
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
      const zoomed = zoomAt(g.startView, g.startMid, Math.hypot(p.x - q.x, p.y - q.y) / Math.max(1, g.startDist))
      view.current = { ...zoomed, x: zoomed.x + mid.x - g.startMid.x, y: zoomed.y + mid.y - g.startMid.y }
      redraw()
      return
    }
    const dx = e.clientX - g.start.x
    const dy = e.clientY - g.start.y
    if (!g.moved && Math.hypot(dx, dy) < DRAG_SLOP) return
    g.moved = true
    if (g.kind === 'pan') view.current = { ...g.startView, x: g.startView.x + dx, y: g.startView.y + dy }
    else g.at = { x: e.clientX, y: e.clientY }
    redraw()
  }

  const endGesture = (e: React.PointerEvent, cancelled: boolean) => {
    pointers.current.delete(e.pointerId)
    const g = gesture.current
    if (!g) return
    if (g.kind === 'pinch') {
      if (pointers.current.size === 0) gesture.current = null
      return
    }
    gesture.current = null
    if (cancelled) {
      redraw()
      return
    }
    if (g.kind === 'pan') {
      if (!g.moved) onBackground()
      return
    }
    const world = toWorld(view.current, local(g.at.x, g.at.y))
    if (g.kind === 'node') {
      if (!g.moved) {
        if (linking && linking !== g.id) onConnect(linking, g.id)
        else onSelect(g.id)
      } else {
        // The card's centre lands where the pointer moved it to.
        const node = workflow.nodes.find(n => n.id === g.id)
        if (node) {
          const c = cellCentre(node)
          const k = view.current.k
          onMove(g.id, cellAt({ x: c.x + (g.at.x - g.start.x) / k, y: c.y + (g.at.y - g.start.y) / k }))
        }
      }
      redraw()
      return
    }
    // A link: tapped, the port arms; dragged, it connects to the card it lands on.
    if (!g.moved) onLink(linking === g.id ? null : g.id)
    else {
      const target = nodeAtWorld(world)
      if (target && target !== g.id) onConnect(g.id, target)
      else redraw()
    }
  }

  // ── Drawing ───────────────────────────────────────────────────────────────
  const v = view.current
  const g = gesture.current
  const k = v.k
  const dragging = g?.kind === 'node' && g.moved ? g : null
  const drawingLink = g?.kind === 'link' && g.moved ? g : null
  const byId = new Map(workflow.nodes.map(n => [n.id, n]))
  // Where a dragged card will land: under the pointer, or the nearest place clear of the others.
  let dropCell: Cell | null = null
  if (dragging) {
    const node = byId.get(dragging.id)
    if (node) {
      const c = cellCentre(node)
      dropCell = landingCell(workflow, node.id, cellAt({ x: c.x + (dragging.at.x - dragging.start.x) / k, y: c.y + (dragging.at.y - dragging.start.y) / k }))
    }
  }
  const linkTarget = drawingLink ? nodeAtWorld(toWorld(v, local(drawingLink.at.x, drawingLink.at.y))) : null
  const focus = selected ?? linking
  const isLitEdge = (e: WorkflowEdge) => edgeKey(e) === selectedEdge || (!!focus && (e.from === focus || e.to === focus))
  const anyLit = !!focus || !!selectedEdge

  return (
    <div
      ref={rootRef}
      className="craft-floor relative h-full w-full touch-none select-none overflow-hidden"
      style={{
        // The floor's dots are the grid a card snaps to: the board's texture is its lattice.
        backgroundSize: `${GRID * k}px ${GRID * k}px`,
        backgroundImage: 'radial-gradient(hsl(var(--muted-foreground) / 0.3) 1px, transparent 1px)',
        backgroundPosition: `${v.x - 1}px ${v.y - 1}px`,
        cursor: g?.kind === 'pan' && g.moved ? 'grabbing' : linking ? 'crosshair' : undefined,
      }}
      onPointerDown={onPointerDown}
      onPointerMove={onPointerMove}
      onPointerUp={e => endGesture(e, false)}
      onPointerCancel={e => endGesture(e, true)}
      data-testid="workflow-board"
    >
      <div className="absolute left-0 top-0 origin-top-left" style={{ transform: `translate(${v.x}px, ${v.y}px) scale(${k})` }}>
        {/* Where a dragged card would land. */}
        {dropCell && (
          <div
            className="absolute left-0 top-0 rounded-xl border-2 border-dashed border-primary bg-primary/10"
            style={{
              width: NODE.w,
              height: NODE.h,
              transform: `translate(${cellCentre(dropCell).x - NODE.w / 2}px, ${cellCentre(dropCell).y - NODE.h / 2}px)`,
            }}
            aria-hidden
            data-testid="workflow-drop-target"
          />
        )}

        <svg className="pointer-events-none absolute left-0 top-0 overflow-visible" width={1} height={1} aria-hidden="true">
          {workflow.edges.map(e => {
            const from = byId.get(e.from)
            const to = byId.get(e.to)
            if (!from || !to) return null
            const kind = edgeKind(workflow, e)
            const lit = isLitEdge(e)
            const { width, color, dash } = edgeStroke(kind, lit)
            const { d, end } = edgeGeometry(from, to)
            return (
              <g key={edgeKey(e)} opacity={anyLit && !lit ? 0.35 : 1} data-testid="workflow-edge" data-kind={kind}>
                {/* The line is its own way in: a wide, unseen stroke to tap. */}
                <path
                  d={d}
                  fill="none"
                  stroke="transparent"
                  strokeWidth={LINE_HIT / Math.min(1, k)}
                  style={{ pointerEvents: 'stroke', cursor: 'pointer' }}
                  onPointerDown={ev => ev.stopPropagation()}
                  onClick={() => onSelectEdge(e)}
                  data-testid="workflow-edge-hit"
                >
                  <title>{`${stepName(from)} to ${stepName(to)}`}</title>
                </path>
                <path d={d} fill="none" stroke={color} strokeWidth={width} strokeDasharray={dash} strokeLinecap="round" />
                <path d={`M${end.x - 9} ${end.y - 5.5} L${end.x} ${end.y} L${end.x - 9} ${end.y + 5.5} Z`} fill={color} />
              </g>
            )
          })}
          {drawingLink && (() => {
            const from = byId.get(drawingLink.id)
            if (!from) return null
            const c = cellCentre(from)
            const start = { x: c.x + NODE.w / 2, y: c.y }
            const end = toWorld(v, local(drawingLink.at.x, drawingLink.at.y))
            const reach = Math.max(30, Math.abs(end.x - start.x) / 2)
            return (
              <path
                d={`M${start.x} ${start.y} C${start.x + reach} ${start.y} ${end.x - reach} ${end.y} ${end.x} ${end.y}`}
                fill="none"
                stroke={ACCENT}
                strokeWidth={2.5}
                strokeDasharray="6 5"
                strokeLinecap="round"
              />
            )
          })()}
        </svg>

        {/* Each connection's label, halfway along it — the way into its panel. */}
        {workflow.edges.map(e => {
          const from = byId.get(e.from)
          const to = byId.get(e.to)
          if (!from || !to) return null
          const kind = edgeKind(workflow, e)
          const word = edgeLabel(kind)
          if (!word) return null
          const lit = isLitEdge(e)
          const { mid } = edgeGeometry(from, to)
          const small = k < LABEL_ZOOM && !lit
          const name = `${stepName(from)} to ${stepName(to)}: ${word}`
          return (
            <button
              key={edgeKey(e)}
              type="button"
              data-sound="none"
              onPointerDown={ev => ev.stopPropagation()}
              onClick={() => onSelectEdge(e)}
              aria-label={name}
              title={e.note ? `${name} — ${e.note}` : name}
              data-testid="workflow-edge-label"
              className={cn(
                'absolute z-[5] whitespace-nowrap rounded-full font-medium leading-none transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring',
                small ? 'h-3 w-3 p-0' : 'px-2 py-1 text-[10px]',
                lit ? 'bg-primary text-primary-foreground' : 'bg-card text-muted-foreground ring-1 ring-border hover:text-foreground',
              )}
              style={{ left: mid.x, top: mid.y, transform: `translate(-50%, -50%) scale(${small ? 1 / Math.max(k, 0.4) : 1})` }}
            >
              {small ? null : e.note ? `${word} ·` : word}
              {!small && e.note && <span className="ml-1 inline-block max-w-[9rem] truncate align-bottom">{e.note}</span>}
            </button>
          )
        })}

        {workflow.nodes.map(node => {
          const c = cellCentre(node)
          const isDragging = dragging?.id === node.id
          const offset = isDragging ? { x: (dragging.at.x - dragging.start.x) / k, y: (dragging.at.y - dragging.start.y) / k } : { x: 0, y: 0 }
          const isSelected = selected === node.id
          const isLinking = linking === node.id
          const isTarget = linkTarget === node.id && linkTarget !== drawingLink?.id
          const Icon = KIND_ICON[node.kind]
          const run = runs.get(node.id)
          // A step the open one is linked to shows the figure it carries, on the link's colour.
          const markedTile = marked.get(node.id)
          const isMarked = markedTile !== undefined
          const tile = run?.result?.tiles[markedTile !== undefined && markedTile >= 0 ? markedTile : 0]
          const name = stepName(node)
          const concept = node.kind === 'concept'
          return (
            <div
              key={node.id}
              className={cn('absolute left-0 top-0', isDragging ? 'z-30' : 'z-10')}
              style={{
                width: NODE.w,
                height: NODE.h,
                transform: `translate(${c.x - NODE.w / 2 + offset.x}px, ${c.y - NODE.h / 2 + offset.y}px)`,
              }}
            >
              <button
                type="button"
                data-sound="none"
                data-workflow-step={node.id}
                data-kind={node.kind}
                onPointerDown={e => startOn(e, 'node', node.id)}
                // Pointer taps resolve in the board's pointerup; this is the keyboard's way in.
                onClick={e => {
                  if (e.detail !== 0) return
                  if (linking && linking !== node.id) onConnect(linking, node.id)
                  else onSelect(node.id)
                }}
                aria-current={isSelected ? 'true' : undefined}
                aria-label={`${KIND_LABEL[node.kind]}: ${name}${tile ? `, ${tile.label} ${formatValue(tile.value, tile.unit)}` : ''}`}
                className={cn(
                  'relative flex h-full w-full cursor-grab flex-col justify-between overflow-hidden rounded-xl py-2 pl-3.5 pr-4 text-left shadow-[var(--shadow-card)] transition-[transform,box-shadow] duration-150',
                  'bg-card text-card-foreground focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ring',
                  concept && flashcardFoilClass(levels.isCollected(node.ref), levels.levelOf(node.ref), { tile: true }),
                  (isSelected || isTarget || isLinking) && 'outline outline-2 outline-offset-2 outline-primary',
                  isLinking && 'outline-dashed',
                  isTarget && 'scale-105',
                  isDragging && 'cursor-grabbing opacity-90 shadow-xl',
                )}
              >
                <span className="absolute inset-y-0 left-0 w-1" style={{ background: KIND_TINT[node.kind] }} aria-hidden />
                <span className="flex items-center gap-1.5 text-[10px] font-semibold uppercase tracking-wider text-muted-foreground">
                  <Icon className="h-3 w-3 shrink-0" style={{ color: KIND_TINT[node.kind] }} aria-hidden />
                  {KIND_LABEL[node.kind]}
                </span>
                <span className="line-clamp-2 text-[13px] font-semibold leading-tight">{name}</span>
                {run?.error ? (
                  <span className="truncate text-[11px] text-amber-500">Needs input</span>
                ) : tile ? (
                  <span className="truncate text-[11px] tabular-nums text-muted-foreground" data-testid="workflow-step-value">
                    {tile.symbol} ={' '}
                    <span
                      className={cn('font-semibold text-foreground', isMarked && 'rounded bg-primary px-1 py-px text-primary-foreground')}
                      data-testid={isMarked ? 'workflow-step-linked' : undefined}
                    >
                      {formatValue(tile.value, tile.unit)}
                    </span>
                  </span>
                ) : node.note ? (
                  <span className="truncate text-[11px] text-muted-foreground">{node.note}</span>
                ) : (
                  <span className="h-[14px]" aria-hidden />
                )}
              </button>
              {/* The port: a connection starts here. */}
              <button
                type="button"
                data-sound="none"
                onPointerDown={e => startOn(e, 'link', node.id)}
                onClick={e => {
                  if (e.detail !== 0) return
                  onLink(linking === node.id ? null : node.id)
                }}
                aria-label={`Connect ${name} to another step`}
                aria-pressed={isLinking}
                title="Drag to another step to connect it"
                data-testid="workflow-port"
                className={cn(
                  'absolute -right-[11px] top-1/2 flex h-[22px] w-[22px] -translate-y-1/2 cursor-crosshair items-center justify-center rounded-full focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring',
                )}
              >
                <span
                  className={cn(
                    'block h-3 w-3 rounded-full border-2 transition-transform',
                    isLinking ? 'scale-125 border-primary bg-primary' : 'border-muted-foreground bg-background hover:scale-125 hover:border-primary',
                  )}
                />
              </button>
              {/* Where a connection arrives. */}
              <span className="pointer-events-none absolute -left-[5px] top-1/2 h-2.5 w-2.5 -translate-y-1/2 rounded-full border-2 border-muted-foreground/60 bg-background" aria-hidden />
            </div>
          )
        })}
      </div>
    </div>
  )
})
