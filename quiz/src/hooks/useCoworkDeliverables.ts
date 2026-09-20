import { create } from 'zustand'
import { answerStep, type Deliverable, type DeliverableType, type WizardStep } from '@/lib/coworkDeliverables'

/**
 * The reader's **deliverables** — the analyses, reports and documentation they
 * have scoped.
 *
 * localStorage only, for the same reason as the library
 * (`hooks/useCoworkLibrary.ts`): the scoping flows are seed data that will
 * change, and a stored answer is only meaningful against the flow that asked
 * the question. For the same reason as the library it holds no catalogue
 * either — the flow an answer is pruned against is passed in, so the sidebar
 * importing this store does not pull Cowork's scoping flows into the main
 * bundle. A deliverable's *derived* state — its facets, its assumptions,
 * its status — is never stored; it is recomputed from the answers every time,
 * so a deliverable can never carry a conclusion its own scoping contradicts.
 */

const STORAGE_KEY = 'cowork.deliverables'

function load(): Deliverable[] {
  try {
    const raw = localStorage.getItem(STORAGE_KEY)
    if (!raw) return []
    const parsed = JSON.parse(raw) as Deliverable[]
    if (!Array.isArray(parsed)) return []
    return parsed.filter(
      d => d && typeof d.id === 'string' && typeof d.title === 'string' && typeof d.type === 'string',
    ).map(d => ({
      ...d,
      answers: d.answers && typeof d.answers === 'object' ? d.answers : {},
      resourceIds: Array.isArray(d.resourceIds) ? d.resourceIds : [],
    }))
  } catch {
    return []
  }
}

function persist(deliverables: Deliverable[]) {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(deliverables))
  } catch { /* ignore quota errors */ }
}

function newId(): string {
  // Not security-sensitive — it only has to be unique within one library.
  return `d-${Date.now().toString(36)}-${Math.random().toString(36).slice(2, 8)}`
}

interface CoworkDeliverablesState {
  deliverables: Deliverable[]
  create: (type: DeliverableType, title?: string) => Deliverable
  rename: (id: string, title: string) => void
  answer: (id: string, steps: WizardStep[], stepId: string, optionId: string) => void
  /** Un-answer one step, so the flow can be walked backwards. */
  unanswer: (id: string, steps: WizardStep[], stepId: string) => void
  attach: (id: string, resourceId: string) => void
  detach: (id: string, resourceId: string) => void
  remove: (id: string) => void
  get: (id: string) => Deliverable | undefined
}

export const useCoworkDeliverables = create<CoworkDeliverablesState>((set, get) => {
  const commit = (deliverables: Deliverable[]) => {
    persist(deliverables)
    set({ deliverables })
  }

  const update = (id: string, fn: (d: Deliverable) => Deliverable) => {
    commit(get().deliverables.map(d => (d.id === id ? { ...fn(d), updatedAt: Date.now() } : d)))
  }

  return {
    deliverables: load(),
    create: (type, title) => {
      const now = Date.now()
      const deliverable: Deliverable = {
        id: newId(),
        title: title ?? '',
        type,
        answers: {},
        resourceIds: [],
        createdAt: now,
        updatedAt: now,
      }
      // Newest first: a deliverable just created is the one being worked on.
      commit([deliverable, ...get().deliverables])
      return deliverable
    },
    rename: (id, title) => update(id, d => ({ ...d, title })),
    answer: (id, steps, stepId, optionId) =>
      update(id, d => ({ ...d, answers: answerStep(steps, d.answers, stepId, optionId) })),
    unanswer: (id, steps, stepId) =>
      update(id, d => {
        const { [stepId]: _dropped, ...rest } = d.answers
        const keys = Object.keys(rest)
        let answers = rest
        if (keys.length) {
          // `answerStep` prunes as a side effect of recording, so re-applying an
          // answer that is already there drops anything the removed one had
          // unlocked — without changing any answer the reader kept.
          answers = answerStep(steps, rest, keys[0], rest[keys[0]])
        }
        return { ...d, answers }
      }),
    attach: (id, resourceId) =>
      update(id, d =>
        d.resourceIds.includes(resourceId) ? d : { ...d, resourceIds: [...d.resourceIds, resourceId] },
      ),
    detach: (id, resourceId) =>
      update(id, d => ({ ...d, resourceIds: d.resourceIds.filter(r => r !== resourceId) })),
    remove: id => commit(get().deliverables.filter(d => d.id !== id)),
    get: id => get().deliverables.find(d => d.id === id),
  }
})
