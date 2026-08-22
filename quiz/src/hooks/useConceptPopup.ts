import { create } from 'zustand'
import type { WikiEntryRef } from '@/lib/wikiRoutes'
import {
  closePage as closeStackPage,
  focusPage as focusStackPage,
  openStack,
  pushPage as pushStackPage,
  type PageStack,
} from '@/lib/pageStack'

// An ordered list of concept/resource refs plus the current index — drives
// the popup's prev/next footer and keyboard arrows.
//
// Layered on top of that walk is the **page stack** (`lib/pageStack.ts`): a
// link followed from inside the popup opens a new page rather than replacing
// the one being read, and the pages behind it fold up into title bars down the
// pane. The stack is a side-branch of wherever the walk currently stands, so
// every move of the walk — prev/next, a filter change, a jump from another
// surface — rebuilds it from the single page the walk landed on.

type DashboardFilter = 'study-plan' | 'entire-syllabus' | 'source-material'

// A single mention of a concept on the source page, in document order. The
// same concept mentioned N times (a primary link + N-1 dimmed repeats) yields
// N entries with occurrence 0..N-1. `occurrence` is the concept's position
// among the same-name links in the rendered article, so the highlight can
// target the exact one that was clicked / navigated to. The concept *count*
// (the deduped `list`) is unaffected — occurrences only steer highlighting and
// prev/next stops so a repeat is never skipped over.
export interface OccurrenceRef {
  name: string
  occurrence: number
}

interface DashboardContext {
  studyPlanList: WikiEntryRef[] | null
  fullList: WikiEntryRef[]
  resourceList: WikiEntryRef[] | null
  filter: DashboardFilter
  circular: boolean
  fromRadial: boolean
  // Document-ordered occurrences for the "entire syllabus" view (null elsewhere).
  occurrences: OccurrenceRef[] | null
}

interface ConceptPopupState {
  open: boolean
  list: WikiEntryRef[]
  index: number
  // The stacked pages, oldest first, and which one is open on screen (the rest
  // are folded to title bars). `pages[0]` is the walk's own entry until the
  // trail outgrows the stack and the oldest page drops off; everything after it
  // was reached by following a link. Reset to one page by every move of the walk.
  pages: WikiEntryRef[]
  pageIndex: number
  // Document-ordered occurrences for the current (entire-syllabus) view, or
  // null when occurrence-aware navigation doesn't apply (dashboard, study-plan
  // / source-material filters). Drives which mention gets highlighted.
  occurrences: OccurrenceRef[] | null
  occurrenceIndex: number
  // What triggered the popup — used by "This Page" search to compute scope.
  sourcePath: string | null
  // Set when opened from the dashboard to support the Viewing filter bar.
  dashboardContext: DashboardContext | null
  openAt: (list: WikiEntryRef[], index: number, sourcePath?: string | null, studyPlanList?: WikiEntryRef[] | null, resourceList?: WikiEntryRef[] | null, options?: { initialFilter?: DashboardFilter; fullList?: WikiEntryRef[]; occurrences?: OccurrenceRef[] | null; occurrenceIndex?: number }) => void
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
  // Follow a link found on the stacked page at `from`, opening the target on
  // top of it. Anything opened from that page is dropped first — see pushPage.
  pushPage: (from: number, ref: WikiEntryRef) => void
  // Open the stacked page at `i` (tapping its bar).
  focusPage: (i: number) => void
  // Close one stacked page; closing the last one closes the popup.
  closePage: (i: number) => void
  close: () => void
  // Closes the popup if the user navigated away from the page that opened it —
  // called by WikiLayout on every route change to keep the split pane in sync.
  closeOnNavigation: (pathname: string) => void
}

// The stack the walk resets to whenever it moves: just the entry it landed on.
// An empty list (nothing to show) yields an empty stack rather than a hole.
function stackState(list: WikiEntryRef[], index: number): { pages: WikiEntryRef[]; pageIndex: number } {
  const ref = list[index]
  const stack: PageStack = ref ? openStack(ref) : { pages: [], index: 0 }
  return { pages: stack.pages, pageIndex: stack.index }
}

export const useConceptPopup = create<ConceptPopupState>((set, get) => ({
  open: false,
  list: [],
  index: 0,
  pages: [],
  pageIndex: 0,
  occurrences: null,
  occurrenceIndex: 0,
  sourcePath: null,
  dashboardContext: null,
  openAt: (list, index, sourcePath = null, studyPlanList, resourceList, options) => {
    const filter = options?.initialFilter ?? 'entire-syllabus'
    const occurrences = options?.occurrences ?? null
    const at = Math.max(0, Math.min(index, list.length - 1))
    set({
      open: true,
      list,
      index: at,
      ...stackState(list, at),
      // Occurrence nav only applies to the entire-syllabus view.
      occurrences: filter === 'entire-syllabus' ? occurrences : null,
      occurrenceIndex: filter === 'entire-syllabus' ? Math.max(0, options?.occurrenceIndex ?? 0) : 0,
      sourcePath,
      dashboardContext: { studyPlanList: studyPlanList ?? null, fullList: options?.fullList ?? list, resourceList: resourceList ?? null, filter, circular: false, fromRadial: false, occurrences },
    })
  },
  openDashboard: (fullList, studyPlanList, filter, initialIndex, options = {}) => {
    const list = filter === 'study-plan' && studyPlanList ? studyPlanList : fullList
    const at = Math.max(0, Math.min(initialIndex, list.length - 1))
    set({
      open: true,
      list,
      index: at,
      ...stackState(list, at),
      occurrences: null,
      occurrenceIndex: 0,
      sourcePath: null,
      dashboardContext: {
        studyPlanList,
        fullList,
        resourceList: null,
        filter,
        circular: options.circular ?? false,
        fromRadial: options.fromRadial ?? false,
        occurrences: null,
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
    // Re-enable occurrence nav only for the entire-syllabus view.
    const occurrences = filter === 'entire-syllabus' ? dashboardContext.occurrences : null
    const occurrenceIndex =
      occurrences && currentName
        ? Math.max(0, occurrences.findIndex(o => o.name.toLowerCase() === currentName))
        : 0
    set({
      list: newList,
      index: newIndex,
      ...stackState(newList, newIndex),
      occurrences,
      occurrenceIndex,
      dashboardContext: { ...dashboardContext, filter },
    })
  },
  navigate: delta => {
    const { list, index, occurrences, occurrenceIndex } = get()
    // Occurrence mode: step through every mention (including dimmed repeats) in
    // document order. The concept `index` follows the occurrence's name, so the
    // count never changes but a repeat is never skipped.
    if (occurrences && occurrences.length) {
      const nextOcc = Math.max(0, Math.min(occurrences.length - 1, occurrenceIndex + delta))
      const name = occurrences[nextOcc]?.name.toLowerCase()
      const nextIndex = name ? list.findIndex(r => r.name.toLowerCase() === name) : -1
      const at = nextIndex >= 0 ? nextIndex : index
      set({ occurrenceIndex: nextOcc, index: at, ...stackState(list, at) })
      return
    }
    if (!list.length) return
    const { dashboardContext } = get()
    const next = dashboardContext?.circular
      ? ((index + delta) % list.length + list.length) % list.length
      : Math.max(0, Math.min(list.length - 1, index + delta))
    set({ index: next, ...stackState(list, next) })
  },
  jumpTo: ref => {
    const { list, occurrences, occurrenceIndex } = get()
    const name = ref.name.toLowerCase()
    // Keep occurrence highlighting in sync: jump to the concept's first mention.
    const syncOcc = occurrences ? occurrences.findIndex(o => o.name.toLowerCase() === name) : -1
    const existingIdx = list.findIndex(r => r.kind === ref.kind && r.name.toLowerCase() === name)
    if (existingIdx >= 0) {
      // A concept with no mention on the source page keeps the walk where it
      // is rather than snapping it back to the first one.
      set({
        index: existingIdx,
        ...stackState(list, existingIdx),
        occurrenceIndex: syncOcc >= 0 ? syncOcc : occurrenceIndex,
      })
      return
    }
    // Append & jump — mirrors publish.js behaviour when following a link from
    // inside a concept. The mention list grows with it, because prev/next walk
    // occurrences: leaving the jumped-to concept out of them stranded the walk
    // at the top of the page (Previous dead, Next landing on the page's second
    // concept) and left the footer progress bar reading the wrong position.
    const next = [...list, ref]
    const nextOccurrences = occurrences ? [...occurrences, { name: ref.name, occurrence: 0 }] : null
    set({
      list: next,
      index: next.length - 1,
      ...stackState(next, next.length - 1),
      occurrences: nextOccurrences,
      occurrenceIndex: nextOccurrences ? nextOccurrences.length - 1 : 0,
    })
  },
  pushPage: (from, ref) => {
    const { pages, pageIndex } = get()
    if (!pages.length) return
    const next = pushStackPage({ pages, index: pageIndex }, from, ref)
    set({ pages: next.pages, pageIndex: next.index })
  },
  focusPage: i => {
    const { pages, pageIndex } = get()
    const next = focusStackPage({ pages, index: pageIndex }, i)
    set({ pages: next.pages, pageIndex: next.index })
  },
  closePage: i => {
    const { pages, pageIndex } = get()
    const next = closeStackPage({ pages, index: pageIndex }, i)
    // Closing the only page closes the popup — there is nothing left to read.
    if (!next.pages.length) {
      get().close()
      return
    }
    set({ pages: next.pages, pageIndex: next.index })
  },
  close: () => set({ open: false, list: [], index: 0, pages: [], pageIndex: 0, occurrences: null, occurrenceIndex: 0, sourcePath: null, dashboardContext: null }),
  closeOnNavigation: pathname => {
    const { open, sourcePath } = get()
    if (open && sourcePath && sourcePath !== pathname) {
      set({ open: false, list: [], index: 0, pages: [], pageIndex: 0, occurrences: null, occurrenceIndex: 0, sourcePath: null, dashboardContext: null })
    }
  },
}))
