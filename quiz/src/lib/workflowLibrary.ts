/**
 * **The Workflows library** (`/workflows`, docs/workflows.md): what its grid
 * of cards shows. Every workflow the reader has built is in it — there is no
 * separate Save, since a workflow saves itself as it changes — newest edit
 * first, each card a small drawing of its board, its title, its size and when
 * it was last changed. Pure and tested; `pages/WorkflowLibrary.tsx` draws it.
 */

import { cellCentre, NODE } from './workflowGrid'
import type { StepKind, Workflow } from './workflow'

/** The workflows a library lists: every one with a step in it, most recently edited first. */
export function libraryWorkflows(workflows: readonly Workflow[], query = ''): Workflow[] {
  const words = query.trim().toLowerCase().split(/\s+/).filter(Boolean)
  return workflows
    .filter(w => w.nodes.length > 0)
    .filter(w => {
      if (!words.length) return true
      const text = `${w.title} ${w.goal}`.toLowerCase()
      return words.every(word => text.includes(word))
    })
    .sort((a, b) => b.updatedAt - a.updatedAt)
}

/** The workflows another one may use as a sub-workflow: the library, less the one being built. */
export function subWorkflowChoices(workflows: readonly Workflow[], hostId: string): { id: string; title: string; steps: number }[] {
  return libraryWorkflows(workflows)
    .filter(w => w.id !== hostId)
    .map(w => ({ id: w.id, title: w.title, steps: w.nodes.length }))
}

/** A copy of a workflow under a new id, titled as a copy, edited now. */
export function duplicateWorkflow(wf: Workflow, id: string, now: number): Workflow {
  const copy: Workflow = {
    ...wf,
    id,
    title: `${wf.title} (copy)`,
    nodes: wf.nodes.map(n => ({ ...n })),
    edges: wf.edges.map(e => ({ ...e })),
    updatedAt: now,
  }
  delete copy.saved
  return copy
}

export interface ThumbnailCard {
  id: string
  kind: StepKind
  x: number
  y: number
  w: number
  h: number
}

export interface ThumbnailLine {
  x1: number
  y1: number
  x2: number
  y2: number
}

export interface Thumbnail {
  width: number
  height: number
  cards: ThumbnailCard[]
  lines: ThumbnailLine[]
}

/**
 * A workflow's board drawn small: each step a block where it sits, each
 * connection a line from one block's right edge to the next one's left, the
 * whole scaled (never up) and centred in a `width` × `height` box with `pad`
 * around it. Read off the saved layout, the way the board draws it, so the
 * picture is the board's shape and not a screenshot of it.
 */
export function workflowThumbnail(wf: Workflow, width = 240, height = 135, pad = 12): Thumbnail {
  if (!wf.nodes.length) return { width, height, cards: [], lines: [] }
  const centres = new Map(wf.nodes.map(n => [n.id, cellCentre(n)] as const))
  const xs = [...centres.values()].map(p => p.x)
  const ys = [...centres.values()].map(p => p.y)
  const minX = Math.min(...xs) - NODE.w / 2
  const maxX = Math.max(...xs) + NODE.w / 2
  const minY = Math.min(...ys) - NODE.h / 2
  const maxY = Math.max(...ys) + NODE.h / 2
  const scale = Math.min(1, (width - 2 * pad) / (maxX - minX), (height - 2 * pad) / (maxY - minY))
  const offX = (width - (maxX - minX) * scale) / 2
  const offY = (height - (maxY - minY) * scale) / 2
  const at = (p: { x: number; y: number }) => ({ x: offX + (p.x - minX) * scale, y: offY + (p.y - minY) * scale })
  const w = NODE.w * scale
  const h = NODE.h * scale
  const round = (v: number) => Math.round(v * 10) / 10
  const cards = wf.nodes.map(n => {
    const c = at(centres.get(n.id)!)
    return { id: n.id, kind: n.kind, x: round(c.x - w / 2), y: round(c.y - h / 2), w: round(w), h: round(h) }
  })
  const lines = wf.edges.flatMap(e => {
    const a = centres.get(e.from)
    const b = centres.get(e.to)
    if (!a || !b) return []
    const from = at(a)
    const to = at(b)
    return [{ x1: round(from.x + w / 2), y1: round(from.y), x2: round(to.x - w / 2), y2: round(to.y) }]
  })
  return { width, height, cards, lines }
}

const MINUTE = 60_000
const HOUR = 60 * MINUTE
const DAY = 24 * HOUR

/** When a workflow was last changed, as its card says it: "Edited 5 minutes ago", "Edited Mar 3". */
export function editedLabel(updatedAt: number, now: number): string {
  const ago = Math.max(0, now - updatedAt)
  if (ago < MINUTE) return 'Edited just now'
  if (ago < HOUR) {
    const m = Math.floor(ago / MINUTE)
    return `Edited ${m} minute${m === 1 ? '' : 's'} ago`
  }
  if (ago < DAY) {
    const h = Math.floor(ago / HOUR)
    return `Edited ${h} hour${h === 1 ? '' : 's'} ago`
  }
  const days = Math.floor(ago / DAY)
  if (days < 7) return `Edited ${days} day${days === 1 ? '' : 's'} ago`
  const date = new Date(updatedAt)
  const sameYear = date.getFullYear() === new Date(now).getFullYear()
  return `Edited ${date.toLocaleDateString('en-US', { month: 'short', day: 'numeric', ...(sameYear ? {} : { year: 'numeric' }) })}`
}
