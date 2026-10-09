import { useCallback, useEffect, useMemo, useSyncExternalStore, type MouseEvent } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import {
  backTarget,
  emptyTrail,
  entryLabel,
  labelEntry,
  loadTrail,
  recordArrival,
  saveTrail,
  type BackOptions,
  type NavTrail,
  type TrailAction,
  type TrailEntry,
} from '@/lib/navTrail'
import { RESTORE_SCROLL } from '@/lib/routeScrollMemory'

/**
 * The React half of `lib/navTrail.ts`: the one record of where the reader has
 * been in this tab, fed by `PaperRouter` on every history move, and the hooks
 * every back control reads it through.
 */

function sessionStore(): Storage | undefined {
  try { return window.sessionStorage } catch { return undefined }
}

let trail: NavTrail = emptyTrail()
const listeners = new Set<() => void>()

function publish(next: NavTrail) {
  if (next === trail) return
  trail = next
  saveTrail(sessionStore(), trail)
  for (const listener of listeners) listener()
}

/** The history index the router stamped on the entry on screen, if any. */
export function currentHistoryIndex(): number | null {
  try {
    const idx = (window.history.state as { idx?: unknown } | null)?.idx
    return typeof idx === 'number' && Number.isInteger(idx) ? idx : null
  } catch {
    return null
  }
}

/**
 * The first entry of this document. `fresh` when the router had never stamped
 * it — the app was opened onto it — so nothing before it is the app's.
 */
export function startNavTrail(entry: TrailEntry, index: number, fresh: boolean) {
  publish(recordArrival(loadTrail(sessionStore()), index, entry, 'POP', fresh))
}

/** Every move the history makes after that — called by `PaperRouter`. */
export function recordNavigation(entry: TrailEntry, action: TrailAction) {
  const index = currentHistoryIndex()
  if (index === null) return
  publish(recordArrival(trail, index, entry, action))
}

function subscribe(listener: () => void) {
  listeners.add(listener)
  return () => { listeners.delete(listener) }
}

export function useNavTrail(): NavTrail {
  return useSyncExternalStore(subscribe, () => trail, () => trail)
}

/**
 * Name the page on screen, for the back control of whatever page the reader
 * goes on to: "Back to Exam P-1" rather than "Back to Quiz". Pass undefined to
 * fall back to the name the path says.
 */
export function usePageLabel(label: string | undefined) {
  const { key } = useLocation()
  useEffect(() => {
    publish(labelEntry(trail, key, label))
  }, [key, label])
}

export interface Back {
  /** The place the control leads to, named — "Dashboard", "Exam P-1". */
  label: string
  /** Where it leads, as a link: the page left, or the fallback. */
  to: string
  /** True when it is going Back to the page the reader came from. */
  fromTrail: boolean
  /** Go there: the browser's Back to the page left, else up to the fallback. */
  go: () => void
  /**
   * For a `<Link to={back.to}>`: turns a plain click into `go()`, leaving a
   * modified or middle click to open the place in a new tab as links do.
   */
  onLinkClick: (e: MouseEvent) => void
}

export interface BackFallback {
  /** The page's logical parent, for a reader who came in from outside the app. */
  to: string
  /** Its name — the control's label when it leads there. */
  label: string
}

/**
 * The way back from this page: to the page the reader came from when the app
 * knows it (see `lib/navTrail.ts`), and otherwise up to `fallback`. One rule
 * for every back control, so none of them can lead somewhere the reader
 * wasn't.
 */
export function useBack(fallback: BackFallback, options?: BackOptions): Back {
  const navigate = useNavigate()
  const current = useNavTrail()
  const target = backTarget(current, options)
  const delta = target?.delta ?? 0

  const go = useCallback(() => {
    if (delta < 0) navigate(delta)
    else navigate(fallback.to, { state: RESTORE_SCROLL })
  }, [delta, navigate, fallback.to])

  const onLinkClick = useCallback((e: MouseEvent) => {
    if (e.defaultPrevented || e.button !== 0 || e.metaKey || e.ctrlKey || e.shiftKey || e.altKey) return
    e.preventDefault()
    go()
  }, [go])

  const label = target ? entryLabel(target.entry) : fallback.label
  const to = target ? target.entry.path : fallback.to
  const fromTrail = target !== null
  // Stable while it says the same thing: pages hand their back control up to
  // a layout's state (the study guide's strip), which must not loop on it.
  return useMemo(
    () => ({ label, to, fromTrail, go, onLinkClick }),
    [label, to, fromTrail, go, onLinkClick],
  )
}

/**
 * The control's accessible name: "Back to Dashboard" when it returns to the
 * page left, the fallback's own name ("All exams") when it leads up.
 */
export function backLabel(back: Pick<Back, 'label' | 'fromTrail'>): string {
  return back.fromTrail ? `Back to ${back.label}` : back.label
}
