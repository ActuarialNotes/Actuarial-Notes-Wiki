import { create } from 'zustand'
import type { WikiEntryRef } from '@/lib/wikiRoutes'

// An ordered list of concept/resource refs plus the current index — drives
// the popup's prev/next footer and keyboard arrows.

type DashboardFilter = 'study-plan' | 'entire-syllabus' | 'source-material'

interface DashboardContext {
  studyPlanList: WikiEntryRef[] | null
  fullList: WikiEntryRef[]
  resourceList: WikiEntryRef[] | null
  filter: DashboardFilter
  circular: boolean
  fromRadial: boolean
}

interface ConceptPopupState {
  open: boolean
  list: WikiEntryRef[]
  index: number
  // What triggered the popup — used by "This Page" search to compute scope.
  sourcePath: string | null
  // Set when opened from the dashboard to support the Viewing filter bar.
  dashboardContext: DashboardContext | null
  openAt: (list: WikiEntryRef[], index: number, sourcePath?: string | null, studyPlanList?: WikiEntryRef[] | null, resourceList?: WikiEntryRef[] | null) => void
  // Opens the popup from the dashboard with optional study-plan/entire-syllabus filter.
  openDashboard: (
    fullList: WikiEntryRef[],
    studyPlanList: WikiEntryRef[] | null,
    filter: DashboardFilter,
    initialIndex: number,
    options?: { circular?: boolean; fromRadial?: boolean },
  ) => void
  setDashboardFilter: (filter: DashboardFilter) => void
  navigate: (delta: number) => void
  jumpTo: (ref: WikiEntryRef) => void
  close: () => void
  // Closes the popup if the user navigated away from the page that opened it —
  // called by WikiLayout on every route change to keep the split pane in sync.
  closeOnNavigation: (pathname: string) => void
}

export const useConceptPopup = create<ConceptPopupState>((set, get) => ({
  open: false,
  list: [],
  index: 0,
  sourcePath: null,
  dashboardContext: null,
  openAt: (list, index, sourcePath = null, studyPlanList, resourceList) =>
    set({
      open: true,
      list,
      index: Math.max(0, Math.min(index, list.length - 1)),
      sourcePath,
      dashboardContext: { studyPlanList: studyPlanList ?? null, fullList: list, resourceList: resourceList ?? null, filter: 'entire-syllabus', circular: false, fromRadial: false },
    }),
  openDashboard: (fullList, studyPlanList, filter, initialIndex, options = {}) => {
    const list = filter === 'study-plan' && studyPlanList ? studyPlanList : fullList
    set({
      open: true,
      list,
      index: Math.max(0, Math.min(initialIndex, list.length - 1)),
      sourcePath: null,
      dashboardContext: {
        studyPlanList,
        fullList,
        resourceList: null,
        filter,
        circular: options.circular ?? false,
        fromRadial: options.fromRadial ?? false,
      },
    })
  },
  setDashboardFilter: filter => {
    const { list, index, dashboardContext } = get()
    if (!dashboardContext) return
    const currentName = list[index]?.name.toLowerCase()
    const newList =
      filter === 'study-plan' && dashboardContext.studyPlanList
        ? dashboardContext.studyPlanList
        : filter === 'source-material' && dashboardContext.resourceList
        ? dashboardContext.resourceList
        : dashboardContext.fullList
    const newIndex = currentName
      ? Math.max(0, newList.findIndex(r => r.name.toLowerCase() === currentName))
      : 0
    set({ list: newList, index: newIndex, dashboardContext: { ...dashboardContext, filter } })
  },
  navigate: delta => {
    const { list, index, dashboardContext } = get()
    if (!list.length) return
    const next = dashboardContext?.circular
      ? ((index + delta) % list.length + list.length) % list.length
      : Math.max(0, Math.min(list.length - 1, index + delta))
    set({ index: next })
  },
  jumpTo: ref => {
    const { list } = get()
    const existingIdx = list.findIndex(
      r => r.kind === ref.kind && r.name.toLowerCase() === ref.name.toLowerCase(),
    )
    if (existingIdx >= 0) {
      set({ index: existingIdx })
    } else {
      // Append & jump — mirrors publish.js behaviour when following a link
      // from inside a concept.
      const next = [...list, ref]
      set({ list: next, index: next.length - 1 })
    }
  },
  close: () => set({ open: false, list: [], index: 0, sourcePath: null, dashboardContext: null }),
  closeOnNavigation: pathname => {
    const { open, sourcePath } = get()
    if (open && sourcePath && sourcePath !== pathname) {
      set({ open: false, list: [], index: 0, sourcePath: null, dashboardContext: null })
    }
  },
}))
