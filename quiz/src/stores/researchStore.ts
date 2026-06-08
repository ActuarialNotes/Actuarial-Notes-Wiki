import { create } from 'zustand'

export type ResearchTab = 'monitor' | 'ask' | 'benchmarks'

export interface ResearchFilters {
  agentIds: string[]
  docTypes: string[]
  provinces: string[]
  dateFrom: string | null
  dateTo: string | null
}

const EMPTY_FILTERS: ResearchFilters = {
  agentIds: [],
  docTypes: [],
  provinces: [],
  dateFrom: null,
  dateTo: null,
}

function toggle(list: string[], value: string): string[] {
  return list.includes(value) ? list.filter(v => v !== value) : [...list, value]
}

interface ResearchState {
  tab: ResearchTab
  filters: ResearchFilters
  setTab: (tab: ResearchTab) => void
  toggleAgent: (agentId: string) => void
  toggleDocType: (docType: string) => void
  toggleProvince: (province: string) => void
  setDateRange: (from: string | null, to: string | null) => void
  resetFilters: () => void
}

// Shared filter/tab state for the /research feature — Monitor, Ask, and
// Benchmarks views all read from (and narrow) the same agent/province/date
// selection so switching tabs doesn't lose the user's scoping.
export const useResearchStore = create<ResearchState>((set) => ({
  tab: 'monitor',
  filters: EMPTY_FILTERS,
  setTab: (tab) => set({ tab }),
  toggleAgent: (agentId) => set(state => ({
    filters: { ...state.filters, agentIds: toggle(state.filters.agentIds, agentId) },
  })),
  toggleDocType: (docType) => set(state => ({
    filters: { ...state.filters, docTypes: toggle(state.filters.docTypes, docType) },
  })),
  toggleProvince: (province) => set(state => ({
    filters: { ...state.filters, provinces: toggle(state.filters.provinces, province) },
  })),
  setDateRange: (dateFrom, dateTo) => set(state => ({
    filters: { ...state.filters, dateFrom, dateTo },
  })),
  resetFilters: () => set({ filters: EMPTY_FILTERS }),
}))
