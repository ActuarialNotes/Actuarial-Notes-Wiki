import { useCallback, useEffect, useRef, useState } from 'react'
import { Link } from 'react-router-dom'
import { ChevronDown, ChevronLeft, ChevronRight, GripHorizontal, Lock, Maximize2, Minimize2 } from 'lucide-react'
import { type WikiEntryRef } from '@/lib/wikiRoutes'
import { useConceptPopup } from '@/hooks/useConceptPopup'
import { useSplitHeight } from '@/hooks/useSplitHeight'
import { ConceptPagePanel } from '@/components/wiki/ConceptPagePanel'
import { PageStackBar } from '@/components/wiki/PageStackBar'
import { samePage } from '@/lib/pageStack'
import { clearPageScrollMemory } from '@/lib/pageScrollMemory'
import { useAuth } from '@/hooks/useAuth'
import { useSoundEffects, useSoundOnToggle } from '@/hooks/useSoundEffects'
import { useSubscription } from '@/hooks/useSubscription'
import { NavProgressBar } from '@/components/NavProgressBar'

function pageKey(ref: WikiEntryRef): string {
  return `${ref.kind}:${ref.name.toLowerCase()}`
}

/**
 * The split pane that reads a wiki page beside whatever surface opened it.
 *
 * This component owns the *shell*: the resize handle, the page stack, the
 * Previous / Next footer and focus mode. The open page renders as a
 * `ConceptPagePanel` — following a link there stacks the target on top rather
 * than replacing what you were reading, and the page behind it folds up into a
 * title bar above it (see `lib/pageStack.ts`). The stack runs down the pane:
 * the trail above the open page, anything stepped back past below it.
 *
 * The footer walks the *source page's* concepts, which is a different
 * sequence from the stack: stepping to another concept starts a new trail.
 */
export function ConceptPopup() {
  const { open, list, index, pages, pageIndex, occurrences, occurrenceIndex, navigate, pushPage, focusPage, closePage, close, dashboardContext, setDashboardFilter } = useConceptPopup()
  const current: WikiEntryRef | undefined = list[index]
  const activePage: WikiEntryRef | undefined = pages[pageIndex]
  const { height, beginDrag } = useSplitHeight()
  // Focus mode — the popup's counterpart to the Flashcards page focus mode:
  // it fills the viewport (covering the sidebar, bottom nav and search bar) and
  // strips the chrome back to the concept title, its text, and Previous/Next.
  const [focusMode, setFocusMode] = useState(false)
  const [viewingDropdownOpen, setViewingDropdownOpen] = useState(false)
  const [showPremiumInfo, setShowPremiumInfo] = useState(false)
  const [showGalleryInPanel, setShowGalleryInPanel] = useState(false)
  // A source document being read on the open page (`PdfViewerPanel`, opened
  // from a resource page's "Read PDF"). It lays over the popup and binds the
  // same keys, so while it is up the popup keeps its hands off them.
  const [readerInPanel, setReaderInPanel] = useState(false)
  // Set when Previous / Next is pressed with the gallery open, so the page
  // stepped onto opens its own gallery. Mirrored in a ref because it is read
  // back from a panel's load callback, not from a render.
  const [gallerySeek, setGallerySeek] = useState<0 | 1 | -1>(0)
  const gallerySeekRef = useRef<0 | 1 | -1>(0)
  const viewingRef = useRef<HTMLDivElement>(null)
  const { user } = useAuth()
  const { isPremium } = useSubscription()

  // The panel's own sound — a sheet of paper sliding out, and back in on close.
  // It lives here rather than on the buttons because the popup can be opened
  // from a wiki link, the search panel, the dashboard or a keyboard shortcut.
  const { play } = useSoundEffects()
  useSoundOnToggle(open, 'open', 'close')

  // Closing a stacked page is a sheet sliding back in. The last page is left to
  // `useSoundOnToggle` above, which sounds the whole popup closing — otherwise
  // the two would fire together.
  const closePageAt = useCallback((i: number) => {
    if (useConceptPopup.getState().pages.length > 1) play('close')
    closePage(i)
  }, [play, closePage])

  // Stepping to the previous/next concept is a page flick, not a press. Shared
  // by the footer buttons and the ←/→ shortcuts so both sound the same. The
  // trail collapses back to one page: it hung off the concept being left.
  const turnPage = useCallback((direction: -1 | 1) => {
    play('page')
    if (showGalleryInPanel) {
      gallerySeekRef.current = direction
      setGallerySeek(direction)
    }
    navigate(direction)
  }, [play, navigate, showGalleryInPanel])

  // A page stepped onto during a gallery walk reports whether it had any images.
  // One that had none is skipped over, so the walk keeps moving in the same
  // direction rather than stalling on a page with nothing to show.
  const handleGallerySeek = useCallback((hadImages: boolean) => {
    const direction = gallerySeekRef.current
    const stop = () => {
      gallerySeekRef.current = 0
      setGallerySeek(0)
    }
    if (hadImages || direction === 0) return stop()

    const state = useConceptPopup.getState()
    const occMode = !!(state.occurrences && state.occurrences.length)
    const atEnd = direction > 0
      ? occMode
        ? state.occurrenceIndex >= state.occurrences!.length - 1
        : state.index >= state.list.length - 1
      : occMode
        ? state.occurrenceIndex <= 0
        : state.index <= 0
    if (atEnd && !state.dashboardContext?.circular) return stop()
    state.navigate(direction)
  }, [])

  // Following a link from a page stacks the target on top of it. A link back to
  // a page already open just returns to it, so the two get different cues: a
  // sheet sliding out, or a flick back through the ones already there.
  const openLinkFrom = useCallback((from: number) => (ref: WikiEntryRef) => {
    const reopened = useConceptPopup.getState().pages.slice(0, from + 1).some(p => samePage(p, ref))
    play(reopened ? 'page' : 'open')
    pushPage(from, ref)
  }, [play, pushPage])

  // Keyboard: Esc steps back out, arrows navigate. Scoped to the popup so
  // typing in the sidebar search input still works.
  useEffect(() => {
    if (!open) return
    function onKey(e: KeyboardEvent) {
      const target = e.target as HTMLElement | null
      if (target && (target.tagName === 'INPUT' || target.tagName === 'TEXTAREA' || target.isContentEditable)) return
      // The gallery is the top layer while it is open and binds the same keys,
      // so it owns them: otherwise Esc closed it *and* unwound a page, and an
      // arrow stepped to the next figure *and* to the next concept at once.
      // The footer's Previous / Next still walk concepts — see `turnPage`.
      if (showGalleryInPanel) return
      // Same hand-over for a document opened on the page: Esc closes the
      // reader, arrows turn its pages, and neither reaches the concept behind.
      if (readerInPanel) return
      // Esc unwinds one layer at a time: the page just opened, then focus mode,
      // then the popup — so a link followed by mistake costs one key, not the
      // whole reading position.
      if (e.key === 'Escape') {
        const { pages: stacked, pageIndex: at, closePage: closeOne } = useConceptPopup.getState()
        if (stacked.length > 1) closeOne(at)
        else if (focusMode) setFocusMode(false)
        else close()
      }
      else if (e.key === 'ArrowLeft') turnPage(-1)
      else if (e.key === 'ArrowRight') turnPage(1)
    }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [open, close, turnPage, focusMode, showGalleryInPanel, readerInPanel])

  // Close viewing dropdown / premium info when clicking outside.
  useEffect(() => {
    if (!viewingDropdownOpen && !showPremiumInfo) return
    function onPointerDown(e: PointerEvent) {
      if (viewingRef.current && !viewingRef.current.contains(e.target as Node)) {
        setViewingDropdownOpen(false)
        setShowPremiumInfo(false)
      }
    }
    document.addEventListener('pointerdown', onPointerDown)
    return () => document.removeEventListener('pointerdown', onPointerDown)
  }, [viewingDropdownOpen, showPremiumInfo])

  // Publish the pane's height to the layout so it can reserve space below
  // the main column. Cleaned up on close.
  useEffect(() => {
    const root = document.documentElement
    if (open) {
      root.style.setProperty('--concept-split-height', `${height}px`)
      root.dataset.conceptSplitOpen = 'true'
    } else {
      root.style.removeProperty('--concept-split-height')
      delete root.dataset.conceptSplitOpen
    }
    return () => {
      root.style.removeProperty('--concept-split-height')
      delete root.dataset.conceptSplitOpen
    }
  }, [open, height])

  // Focus mode covers the whole viewport, so lock the page behind it the same
  // way the Flashcards focus mode does.
  useEffect(() => {
    if (!focusMode) return
    document.body.style.overflow = 'hidden'
    return () => { document.body.style.overflow = '' }
  }, [focusMode])

  // Reset focus view when popup closes, and forget where each page was read up
  // to — the trail is gone with it, so those offsets belong to nothing.
  useEffect(() => {
    if (!open) {
      setFocusMode(false)
      clearPageScrollMemory()
    }
  }, [open])

  if (!open || !current || !activePage) return null

  const isCircular = !!(dashboardContext?.circular)
  // In occurrence mode, prev/next step through every mention (repeats included),
  // so bounds follow the occurrence list; the count shown stays the deduped
  // concept total so a repeat never changes "the number of concepts".
  const occMode = !!(occurrences && occurrences.length)
  const canPrev = isCircular || (occMode ? occurrenceIndex > 0 : index > 0)
  // The tips behind an exam's "How to Study" card: a walk of its own, not a
  // slice of the syllabus. See components/wiki/ExamGuideCards.tsx.
  const isGuideWalk = current?.kind === 'guide'

  const canNext = isCircular || (occMode ? occurrenceIndex < occurrences!.length - 1 : index < list.length - 1)
  // The footer bar measures the sequence prev/next actually walks, which in
  // occurrence mode is the mention list rather than the deduped concepts: every
  // press moves the fill by exactly one step, and the last stop reads full.
  const navTotal = occMode ? occurrences!.length : list.length
  const navCurrent = occMode ? occurrenceIndex + 1 : index + 1
  const hasStudyPlan = !!(dashboardContext?.studyPlanList?.length)
  const hasSourceMaterial = !!(dashboardContext?.resourceList?.length)
  const isLoggedInPremium = !!user && isPremium
  const currentFilter = dashboardContext?.filter ?? 'entire-syllabus'

  const todayLabel = `Study Plan — ${new Date().toLocaleDateString(undefined, { month: 'long', day: 'numeric' })}`

  // Focus mode's toggle is the only control that survives it, so there's always
  // a way back out (Esc also works). It rides in the active page's header.
  const focusToggle = (
    <button
      type="button"
      onClick={() => setFocusMode(v => !v)}
      aria-pressed={focusMode}
      className="inline-flex items-center justify-center h-10 w-10 rounded-lg shrink-0 text-muted-foreground hover:text-foreground hover:bg-accent transition-colors"
      title={focusMode ? 'Exit focus mode (Esc)' : 'Focus mode'}
      aria-label={focusMode ? 'Exit focus mode' : 'Focus mode'}
    >
      {focusMode ? <Minimize2 className="h-5 w-5" /> : <Maximize2 className="h-5 w-5" />}
    </button>
  )

  return (
    <aside
      className="concept-popup-aside fixed left-0 right-0 bottom-14 md:bottom-0 z-40 border-t bg-card text-card-foreground shadow-2xl flex flex-col"
      data-focus={focusMode}
      style={{ height: focusMode ? undefined : `min(${height}px, 100vh)` }}
      role="complementary"
      aria-label={`Concept: ${activePage.name}`}
    >
      {/* Drag handle — hidden in focus mode, visible otherwise */}
      {!focusMode && (
        <div
          role="separator"
          aria-orientation="horizontal"
          aria-label="Resize concept panel"
          onMouseDown={e => {
            e.preventDefault()
            beginDrag(e.clientY)
          }}
          onTouchStart={e => {
            if (e.touches[0]) beginDrag(e.touches[0].clientY)
          }}
          className="flex h-4 items-center justify-center cursor-row-resize hover:bg-accent/60 active:bg-accent/80 transition-colors select-none touch-none"
        >
          <GripHorizontal className="h-3 w-6 text-muted-foreground/60" />
        </div>
      )}

      {/* The stack, running down the pane: the trail folded into title bars
          above the open page, anything stepped back past folded below it. Only
          one page is open — height is what this pane has least of, and two
          half-height pages would leave neither readable. */}
      <div className="flex flex-1 min-h-0 flex-col">
        {pages.map((page, i) =>
          i === pageIndex ? (
            <div
              key={pageKey(page)}
              role="group"
              aria-label={page.name}
              aria-current="page"
              // Only a stacked page animates in: the base page is there from
              // the moment the popup opens, and the aside's own slide-up is
              // already that page arriving.
              className={`flex flex-1 flex-col min-h-0 ${i > 0 ? 'page-panel' : ''}`}
              data-page-open="true"
            >
              <ConceptPagePanel
                entry={page}
                focusMode={focusMode}
                onOpenLink={openLinkFrom(i)}
                onClose={() => closePageAt(i)}
                trailing={focusToggle}
                gallerySeek={gallerySeek}
                onGallerySeekResolved={handleGallerySeek}
                onGalleryOpenChange={setShowGalleryInPanel}
                onReaderOpenChange={setReaderInPanel}
              />
            </div>
          ) : (
            <PageStackBar
              key={pageKey(page)}
              entry={page}
              above={i < pageIndex}
              onOpen={() => focusPage(i)}
              onClose={() => closePageAt(i)}
            />
          ),
        )}
      </div>

      {/* Footer nav. The bar is the only position readout — there is no "N of
          M" text under it — so it has to answer "where am I" on every press,
          including Previous and a wiki-link jump backwards. Its drag bubble
          names the concept, which is the more useful answer anyway. */}
      <NavProgressBar
        current={navCurrent}
        total={navTotal}
        label={`Concept ${index + 1} of ${list.length}`}
        // Dragging is the same walk Previous / Next takes, just several stops at
        // once, so it goes through `navigate` rather than setting the index
        // itself — that's what keeps occurrence mode's concept/mention pairing
        // (and the dashboard's circular list) working from the bar too.
        onScrub={next => navigate(next - navCurrent)}
        formatValue={n => (occMode ? occurrences![n - 1]?.name : list[n - 1]?.name) ?? `${n} of ${navTotal}`}
      />
      <div className="flex items-stretch h-16 shrink-0 bg-background/60">
        <button
          type="button"
          disabled={!canPrev}
          data-sound="none"
          onClick={() => turnPage(-1)}
          className="flex-1 flex items-center justify-center gap-2 px-4 text-base sm:text-sm font-medium hover:bg-accent/60 active:bg-accent disabled:opacity-40 disabled:cursor-not-allowed transition-colors"
        >
          <ChevronLeft className="h-6 w-6 sm:h-5 sm:w-5" />
          <span>Previous</span>
        </button>
        {/* The syllabus-filter picker — extra information, so focus mode drops
            it and leaves the footer as just Previous / Next. The position it
            used to sit over is read off the bar above instead, which leaves the
            picker as the one thing here and lets it be sized as a real target.
            A guide walk (an exam's How to Study tips) drops it too: those pages
            are not a view of the syllabus, so every filter it offers is either
            a no-op or a lie about what is being read. */}
        {!focusMode && !isGuideWalk && (
        <div className="self-center flex flex-col items-center px-2 shrink-0" ref={viewingRef}>
          <div className="relative">
            <button
              type="button"
              onClick={() => { setViewingDropdownOpen(v => !v); setShowPremiumInfo(false) }}
              className="appearance-none px-2 py-2 rounded-md text-xs text-muted-foreground hover:text-foreground hover:bg-accent transition-colors cursor-pointer focus:outline-none inline-flex items-center gap-1"
            >
              {currentFilter === 'study-plan' ? todayLabel : currentFilter === 'source-material' ? 'Source Material' : 'Entire Syllabus'}
              <ChevronDown className="h-6 w-6 shrink-0" />
            </button>

            {viewingDropdownOpen && (
              <div className="absolute bottom-full mb-1 left-1/2 -translate-x-1/2 z-50 w-56 rounded-md bg-popover text-popover-foreground shadow-md py-1">
                {hasStudyPlan ? (
                  <button
                    type="button"
                    onClick={() => { setDashboardFilter('study-plan'); setViewingDropdownOpen(false) }}
                    className={`w-full flex items-center px-3 py-2 text-xs hover:bg-accent transition-colors text-left ${currentFilter === 'study-plan' ? 'font-medium' : ''}`}
                  >
                    {todayLabel}
                  </button>
                ) : isLoggedInPremium ? (
                  <Link
                    to="/dashboard"
                    onClick={() => { close(); setViewingDropdownOpen(false) }}
                    className="w-full flex items-center gap-2 px-3 py-2 text-xs hover:bg-accent transition-colors"
                  >
                    Set up Study Plan →
                  </Link>
                ) : (
                  <button
                    type="button"
                    onClick={() => { setShowPremiumInfo(v => !v); setViewingDropdownOpen(false) }}
                    className="w-full flex items-center gap-1.5 px-3 py-2 text-xs opacity-50 hover:opacity-70 transition-opacity text-left"
                  >
                    <Lock className="h-3 w-3 shrink-0" />
                    {todayLabel}
                  </button>
                )}
                <button
                  type="button"
                  onClick={() => { setDashboardFilter('entire-syllabus'); setViewingDropdownOpen(false) }}
                  className={`w-full flex items-center px-3 py-2 text-xs hover:bg-accent transition-colors text-left ${currentFilter === 'entire-syllabus' ? 'font-medium' : ''}`}
                >
                  Entire Syllabus
                </button>
                {hasSourceMaterial && (
                  <button
                    type="button"
                    onClick={() => { setDashboardFilter('source-material'); setViewingDropdownOpen(false) }}
                    className={`w-full flex items-center px-3 py-2 text-xs hover:bg-accent transition-colors text-left ${currentFilter === 'source-material' ? 'font-medium' : ''}`}
                  >
                    Source Material
                  </button>
                )}
              </div>
            )}

            {showPremiumInfo && (
              <div className="absolute bottom-full mb-1 left-1/2 -translate-x-1/2 z-50 w-60 rounded-md bg-popover text-popover-foreground shadow-md p-3">
                <div className="flex items-center gap-1.5 mb-1.5 text-xs font-medium">
                  <Lock className="h-3 w-3 shrink-0" />
                  Premium feature
                </div>
                <p className="text-xs text-muted-foreground mb-2.5">
                  {user
                    ? 'Upgrade to Premium to access personalised daily Study Plans.'
                    : 'Sign in and upgrade to Premium to access personalised daily Study Plans.'
                  }
                </p>
                <Link
                  to={user ? '/upgrade' : '/auth'}
                  onClick={() => setShowPremiumInfo(false)}
                  className="text-xs text-primary hover:underline"
                >
                  {user ? 'Upgrade to Premium →' : 'Sign in →'}
                </Link>
              </div>
            )}
          </div>
        </div>
        )}
        <button
          type="button"
          disabled={!canNext}
          data-sound="none"
          onClick={() => turnPage(1)}
          className="flex-1 flex items-center justify-center gap-2 px-4 text-base sm:text-sm font-medium hover:bg-accent/60 active:bg-accent disabled:opacity-40 disabled:cursor-not-allowed transition-colors"
        >
          <span>Next</span>
          <ChevronRight className="h-6 w-6 sm:h-5 sm:w-5" />
        </button>
      </div>
    </aside>
  )
}
