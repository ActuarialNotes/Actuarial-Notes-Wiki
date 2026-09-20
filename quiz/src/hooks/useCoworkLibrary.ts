import { create } from 'zustand'
import {
  EMPTY_LIBRARY,
  addEntity,
  addResource,
  hasEntity,
  hasResource,
  removeEntity,
  removeResource,
  type LibraryState,
  type SourceResource,
} from '@/lib/coworkSources'

/**
 * The reader's **library** — the publishers they follow and the documents they
 * are working from.
 *
 * localStorage only, and deliberately so while Cowork is in Preview: the
 * catalogue is seed data that will be replaced, so a server table keyed to
 * today's resource ids would be a migration to write before the feature has
 * been used. The store is synchronous for the same reason every other
 * local-first store in this app is (`hooks/useCollectedCards.ts`) — a surface
 * that adds a source gets the new state in the same render.
 *
 * It holds **ids and nothing else**, and the two calls that need to know what a
 * publisher published take the catalogue as an argument rather than importing
 * it. That is not ceremony: the sidebar imports this store to badge the Cowork
 * nav, so a `data/coworkSources` import here would drag the whole catalogue out
 * of Cowork's lazy chunk and into the main bundle, for every reader in Study
 * mode. The reducers themselves are pure and tested in `lib/coworkSources.ts`.
 */

const STORAGE_KEY = 'cowork.library'

function load(): LibraryState {
  try {
    const raw = localStorage.getItem(STORAGE_KEY)
    if (!raw) return EMPTY_LIBRARY
    const parsed = JSON.parse(raw) as Partial<LibraryState>
    return {
      entityIds: Array.isArray(parsed.entityIds) ? parsed.entityIds.filter(x => typeof x === 'string') : [],
      resourceIds: Array.isArray(parsed.resourceIds) ? parsed.resourceIds.filter(x => typeof x === 'string') : [],
    }
  } catch {
    return EMPTY_LIBRARY
  }
}

function persist(state: LibraryState) {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(state))
  } catch { /* ignore quota errors */ }
}

interface CoworkLibraryState extends LibraryState {
  addEntity: (entityId: string) => void
  /** `catalogue` is what the cascade reads to drop the publisher's documents. */
  removeEntity: (entityId: string, catalogue: SourceResource[]) => void
  addResource: (resource: SourceResource) => void
  removeResource: (resourceId: string) => void
  toggleEntity: (entityId: string, catalogue: SourceResource[]) => void
  toggleResource: (resource: SourceResource) => void
  clear: () => void
}

/** The plain `LibraryState` inside the store, without its actions. */
function current(state: CoworkLibraryState): LibraryState {
  return { entityIds: state.entityIds, resourceIds: state.resourceIds }
}

export const useCoworkLibrary = create<CoworkLibraryState>((set, get) => {
  const commit = (next: LibraryState) => {
    persist(next)
    set(next)
  }
  return {
    ...load(),
    addEntity: entityId => commit(addEntity(current(get()), entityId)),
    removeEntity: (entityId, catalogue) => commit(removeEntity(current(get()), entityId, catalogue)),
    addResource: resource => commit(addResource(current(get()), resource)),
    removeResource: resourceId => commit(removeResource(current(get()), resourceId)),
    toggleEntity: (entityId, catalogue) => {
      const state = current(get())
      commit(hasEntity(state, entityId) ? removeEntity(state, entityId, catalogue) : addEntity(state, entityId))
    },
    toggleResource: resource => {
      const state = current(get())
      commit(hasResource(state, resource.id) ? removeResource(state, resource.id) : addResource(state, resource))
    },
    clear: () => commit(EMPTY_LIBRARY),
  }
})
