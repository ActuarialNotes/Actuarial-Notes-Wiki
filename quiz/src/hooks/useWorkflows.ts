import { useMemo } from 'react'
import { create } from 'zustand'
import {
  EMPTY_TITLE,
  fromTemplate,
  newWorkflow,
  parseWorkflow,
  resolverFor,
  type Workflow,
  type WorkflowResolver,
  type WorkflowTemplate,
} from '@/lib/workflow'
import { duplicateWorkflow } from '@/lib/workflowLibrary'

/**
 * The reader's workflows (docs/workflows.md): every one they have built, and
 * which is open. Every workflow with a step is in the **library** — the grid
 * `/workflows` opens on, and what the + menu offers as sub-workflows
 * (`lib/workflowLibrary.ts`); there is no separate Save, since every change is
 * kept as it is made. Which is open follows the address (`/workflows/:id`).
 * The old `saved` mark is still read, and decides nothing. localStorage only, like Concept Craft's board —
 * a workflow is a plan for a calculation, not a record anyone else needs —
 * and read back field by field (`parseWorkflow`), so a page always opens.
 *
 * The edits themselves are the pure reducers in `lib/workflow.ts`; the store
 * only keeps the result and the clock.
 */

const STORAGE_KEY = 'actuarial_workflows_v1'
/**
 * Where the first Workflow Builder (as Workflows was called) kept a reader's own Anthropic API key. The
 * in-browser deploy that used it is gone (docs/workflows.md, "Running it
 * in Claude"); a key left behind is a secret no page should hold, so it is
 * deleted on the next visit.
 */
const RETIRED_KEY_STORAGE = 'actuarial_anthropic_api_key'

interface Saved {
  workflows: Workflow[]
  currentId: string | null
}

function makeId(): string {
  try {
    return `wf-${crypto.randomUUID().slice(0, 8)}`
  } catch {
    return `wf-${Date.now().toString(36)}${Math.random().toString(36).slice(2, 6)}`
  }
}

export function parseSaved(raw: string | null): Saved {
  if (!raw) return { workflows: [], currentId: null }
  try {
    const parsed = JSON.parse(raw) as { workflows?: unknown; currentId?: unknown }
    const workflows = (Array.isArray(parsed.workflows) ? parsed.workflows : [])
      .map(parseWorkflow)
      .filter((w): w is Workflow => !!w)
    const currentId = typeof parsed.currentId === 'string' && workflows.some(w => w.id === parsed.currentId)
      ? parsed.currentId
      : workflows[0]?.id ?? null
    return { workflows, currentId }
  } catch {
    return { workflows: [], currentId: null }
  }
}

function load(): Saved {
  try {
    localStorage.removeItem(RETIRED_KEY_STORAGE)
    return parseSaved(localStorage.getItem(STORAGE_KEY))
  } catch {
    return { workflows: [], currentId: null }
  }
}

function persist(saved: Saved) {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(saved))
  } catch { /* quota or private mode: the board still works for this visit */ }
}

interface WorkflowsState extends Saved {
  /** Start a workflow — empty, or from a template — and open it. */
  create: (template?: WorkflowTemplate) => string
  open: (id: string) => void
  remove: (id: string) => void
  /** Change the open workflow. `change` is one of `lib/workflow.ts`'s reducers. */
  update: (change: (wf: Workflow, now: number) => Workflow) => void
  /** Copy a workflow, without opening the copy. */
  duplicate: (id: string) => string | null
  /** Name a workflow. A blank name is taken as the default. */
  rename: (id: string, title: string) => void
  /** A template, copied into the library as a workflow of the reader's own, without opening it. */
  saveTemplate: (template: WorkflowTemplate) => string
}

export const useWorkflows = create<WorkflowsState>((set, get) => {
  const commit = (next: Saved) => {
    persist(next)
    set(next)
  }
  return {
    ...load(),
    create: template => {
      const id = makeId()
      const now = Date.now()
      const wf = template ? fromTemplate(template, id, now) : newWorkflow(id, now)
      commit({ workflows: [wf, ...get().workflows], currentId: id })
      return id
    },
    open: id => {
      if (get().workflows.some(w => w.id === id)) commit({ workflows: get().workflows, currentId: id })
    },
    remove: id => {
      const workflows = get().workflows.filter(w => w.id !== id)
      const currentId = get().currentId === id ? workflows[0]?.id ?? null : get().currentId
      commit({ workflows, currentId })
    },
    duplicate: id => {
      const original = get().workflows.find(w => w.id === id)
      if (!original) return null
      const copy = duplicateWorkflow(original, makeId(), Date.now())
      commit({ workflows: [copy, ...get().workflows], currentId: get().currentId })
      return copy.id
    },
    rename: (id, title) => {
      const { workflows, currentId } = get()
      const name = title.trim() || EMPTY_TITLE
      commit({ workflows: workflows.map(w => (w.id === id ? { ...w, title: name, updatedAt: Date.now() } : w)), currentId })
    },
    saveTemplate: template => {
      const id = makeId()
      const wf = fromTemplate(template, id, Date.now())
      commit({ workflows: [wf, ...get().workflows], currentId: get().currentId })
      return id
    },
    update: change => {
      const { workflows, currentId } = get()
      const at = workflows.findIndex(w => w.id === currentId)
      if (at < 0) return
      const next = change(workflows[at], Date.now())
      if (next === workflows[at]) return
      commit({ workflows: workflows.map((w, i) => (i === at ? next : w)), currentId })
    },
  }
})

/** Finds a sub-workflow: one of the reader's workflows, or a template. */
export function useWorkflowResolver(): WorkflowResolver {
  const workflows = useWorkflows(s => s.workflows)
  return useMemo(() => resolverFor(workflows), [workflows])
}

/** The open workflow, if any. */
export function useCurrentWorkflow(): Workflow | null {
  return useWorkflows(s => s.workflows.find(w => w.id === s.currentId) ?? null)
}
