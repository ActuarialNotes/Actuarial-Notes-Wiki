import { useEffect, useRef, useState } from 'react'
import { Link, useLocation, useNavigate } from 'react-router-dom'
import { BookOpen, ChevronDown, ChevronLeft, ChevronRight, GripHorizontal, Images, Loader2, Maximize2, Minimize2, Play, TrendingUp, X } from 'lucide-react'
import { fetchWikiFile } from '@/lib/github'
import { entryRefToRepoPath, wikiRoute, type WikiEntryRef } from '@/lib/wikiRoutes'
import { useConceptPopup } from '@/hooks/useConceptPopup'
import { useFlashcards } from '@/hooks/useFlashcards'
import { useSplitHeight } from '@/hooks/useSplitHeight'
import { WikiArticle, extractImages } from '@/components/wiki/WikiArticle'
import { ConceptQuestionsModal } from '@/components/wiki/ConceptQuestionsModal'
import { LearningProgressModal } from '@/components/wiki/LearningProgressModal'
import { ImageGalleryModal } from '@/components/wiki/ImageGalleryModal'

export function ConceptPopup() {
  const { open, list, index, navigate, jumpTo, close, dashboardContext, setDashboardFilter } = useConceptPopup()
  const { addCard, hasCard } = useFlashcards()
  const location = useLocation()
  const routerNavigate = useNavigate()
  const isOnWiki = location.pathname.startsWith('/wiki/')
  const current: WikiEntryRef | undefined = list[index]
  const [content, setContent] = useState<string | null>(null)
  const [status, setStatus] = useState<'idle' | 'loading' | 'error'>('idle')
  const { height, beginDrag } = useSplitHeight()
  const [maximized, setMaximized] = useState(false)
  const [showQuestions, setShowQuestions] = useState(false)
  const [showLearningProgress, setShowLearningProgress] = useState(false)
  const [showPlayMenu, setShowPlayMenu] = useState(false)
  const [menuAlignRight, setMenuAlignRight] = useState(false)
  const [images, setImages] = useState<Array<{ src: string; alt: string; caption: string }>>([])
  const [showGallery, setShowGallery] = useState(false)
  const [galleryIndex, setGalleryIndex] = useState(0)
  const playMenuRef = useRef<HTMLDivElement>(null)
  const playBtnRef = useRef<HTMLButtonElement>(null)
  const bodyRef = useRef<HTMLDivElement>(null)

  // Scroll the body back to top whenever the viewed concept changes.
  useEffect(() => {
    if (bodyRef.current) bodyRef.current.scrollTop = 0
  }, [current?.name])

  // Fetch markdown whenever the active ref changes.
  useEffect(() => {
    if (!open || !current) return
    let cancelled = false
    setStatus('loading')
    setContent(null)
    setImages([])
    fetchWikiFile(entryRefToRepoPath(current))
      .then(raw => {
        if (cancelled) return
        setContent(raw)
        setImages(extractImages(raw))
        setShowGallery(false)
        setStatus('idle')
      })
      .catch(() => {
        if (cancelled) return
        setStatus('error')
      })
    return () => {
      cancelled = true
    }
  }, [open, current?.kind, current?.name])

  // Keyboard: Esc closes, arrows navigate. Scoped to the popup so typing in
  // the sidebar search input still works.
  useEffect(() => {
    if (!open) return
    function onKey(e: KeyboardEvent) {
      const target = e.target as HTMLElement | null
      if (target && (target.tagName === 'INPUT' || target.tagName === 'TEXTAREA' || target.isContentEditable)) return
      if (e.key === 'Escape') close()
      else if (e.key === 'ArrowLeft') navigate(-1)
      else if (e.key === 'ArrowRight') navigate(1)
    }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [open, close, navigate])

  // Close play menu when clicking outside of it.
  useEffect(() => {
    if (!showPlayMenu) return
    function onPointerDown(e: PointerEvent) {
      if (playMenuRef.current && !playMenuRef.current.contains(e.target as Node)) {
        setShowPlayMenu(false)
      }
    }
    document.addEventListener('pointerdown', onPointerDown)
    return () => document.removeEventListener('pointerdown', onPointerDown)
  }, [showPlayMenu])

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

  if (!open || !current) return null

  const canPrev = index > 0
  const canNext = index < list.length - 1
  const position = `${index + 1} of ${list.length}`
  const sourcePath = current ? entryRefToRepoPath(current) : undefined

  return (
    <>
    <aside
      className="concept-popup-aside fixed left-0 right-0 bottom-0 z-40 border-t bg-card text-card-foreground shadow-2xl flex flex-col"
      data-maximized={maximized}
      style={{ height: maximized ? undefined : `min(${height}px, 100vh)` }}
      role="complementary"
      aria-label={`Concept: ${current.name}`}
    >
      {/* Viewing filter — only shown when opened from the dashboard */}
      {dashboardContext && (
        <div className="flex items-center gap-2 px-3 py-1.5 border-b shrink-0">
          <span className="text-xs text-muted-foreground shrink-0">Viewing:</span>
          <div className="relative">
            <select
              value={dashboardContext.studyPlanList ? dashboardContext.filter : 'entire-syllabus'}
              onChange={e => dashboardContext.studyPlanList && setDashboardFilter(e.target.value as 'study-plan' | 'entire-syllabus')}
              disabled={!dashboardContext.studyPlanList}
              className="appearance-none text-xs border rounded-md pl-2.5 pr-6 py-1 bg-background hover:bg-accent transition-colors cursor-pointer focus:outline-none focus:ring-1 focus:ring-primary disabled:cursor-default disabled:opacity-80"
            >
              {dashboardContext.studyPlanList && (
                <option value="study-plan">
                  Study Plan — {new Date().toLocaleDateString(undefined, { month: 'long', day: 'numeric' })}
                </option>
              )}
              <option value="entire-syllabus">Entire Syllabus</option>
            </select>
            <ChevronDown className="pointer-events-none absolute right-1.5 top-1/2 -translate-y-1/2 h-3 w-3 text-muted-foreground" />
          </div>
          <span className="text-xs text-muted-foreground ml-auto tabular-nums shrink-0">
            {list.length} concepts
          </span>
        </div>
      )}

      {/* Drag handle — hidden on mobile where the pane goes full-width */}
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
        className="hidden sm:flex h-3 items-center justify-center cursor-row-resize hover:bg-accent/60 transition-colors select-none"
      >
        <GripHorizontal className="h-3 w-6 text-muted-foreground/60" />
      </div>

      {/* Header */}
      <div className="flex items-center gap-2 px-3 h-14 border-b shrink-0">
        <div className="flex items-center gap-1.5 flex-1 min-w-0">
          <span className="truncate font-semibold text-sm min-w-0">{current.name}</span>
          {/* Play button + mini menu — immediately right of the concept name */}
          <div className="relative shrink-0" ref={playMenuRef}>
          <button
            ref={playBtnRef}
            type="button"
            onClick={() => {
              if (!showPlayMenu && playBtnRef.current) {
                const rect = playBtnRef.current.getBoundingClientRect()
                setMenuAlignRight(window.innerWidth - rect.right < 200)
              }
              setShowPlayMenu(v => !v)
            }}
            className="inline-flex items-center justify-center h-8 w-8 rounded-md border bg-background hover:bg-accent text-foreground shrink-0"
            title="Start Quiz or Add to Flashcards"
            aria-label="Start Quiz or Add to Flashcards"
          >
            <Play className="h-4 w-4" />
          </button>
          {showPlayMenu && (
            <div className={`absolute top-full mt-1 w-52 rounded-md border bg-popover text-popover-foreground shadow-md z-50 py-1 ${menuAlignRight ? 'right-0' : 'left-0'}`}>
              <button
                type="button"
                onClick={() => { setShowQuestions(true); setShowPlayMenu(false) }}
                className="w-full flex items-center gap-2 px-3 py-2 text-sm hover:bg-accent transition-colors"
              >
                <Play className="h-3.5 w-3.5 shrink-0" />
                Start Quiz
              </button>
              {current.kind === 'concept' && (
                <button
                  type="button"
                  disabled={isOnWiki}
                  onClick={() => { routerNavigate(wikiRoute(current)); setShowPlayMenu(false) }}
                  className={`w-full flex items-center gap-2 px-3 py-2 text-sm transition-colors ${isOnWiki ? 'opacity-40 cursor-not-allowed' : 'hover:bg-accent'}`}
                >
                  <BookOpen className="h-3.5 w-3.5 shrink-0" />
                  Open in Study Guide
                </button>
              )}
              <div className="flex items-center hover:bg-accent transition-colors">
                <button
                  type="button"
                  onClick={() => { addCard(current) }}
                  className="flex-1 flex items-center gap-2 px-3 py-2 text-sm"
                >
                  <span className="h-3.5 w-3.5 shrink-0 flex items-center justify-center text-xs">
                    {hasCard(current.name) ? '✓' : '+'}
                  </span>
                  {hasCard(current.name) ? 'Added to Flashcards' : 'Add to Flashcards'}
                </button>
                {hasCard(current.name) && (
                  <Link
                    to={`/flashcards?highlight=${encodeURIComponent(current.name)}`}
                    onClick={() => { setShowPlayMenu(false); close() }}
                    className="text-xs text-primary hover:underline pr-3 shrink-0"
                  >
                    view
                  </Link>
                )}
              </div>
              <button
                type="button"
                onClick={() => { setShowLearningProgress(true); setShowPlayMenu(false) }}
                className="w-full flex items-center gap-2 px-3 py-2 text-sm hover:bg-accent transition-colors"
              >
                <TrendingUp className="h-3.5 w-3.5 shrink-0" />
                Learning Progress
              </button>
            </div>
          )}
          </div>
          {images.length > 0 && (
            <button
              type="button"
              onClick={() => { setGalleryIndex(0); setShowGallery(true) }}
              className="inline-flex items-center justify-center h-8 w-8 rounded-md shrink-0"
              style={{ background: 'linear-gradient(to right, #3b82f6, #a855f7, #ef4444)' }}
              title={`View ${images.length} image${images.length !== 1 ? 's' : ''}`}
              aria-label="Open image gallery"
            >
              <Images className="h-4 w-4 text-white" />
            </button>
          )}
        </div>
        <button
          type="button"
          onClick={() => setMaximized(v => !v)}
          className="text-muted-foreground hover:text-foreground p-1"
          title={maximized ? 'Restore size' : 'Maximize'}
          aria-label={maximized ? 'Restore size' : 'Maximize'}
        >
          {maximized ? <Minimize2 className="h-4 w-4" /> : <Maximize2 className="h-4 w-4" />}
        </button>
        <button
          type="button"
          onClick={close}
          className="text-muted-foreground hover:text-foreground p-1"
          title="Close"
          aria-label="Close"
        >
          <X className="h-4 w-4" />
        </button>
      </div>

      {/* Body — only this scrolls; wheel events don't propagate to the page
          behind because the pane isn't transparent and covers the bottom. */}
      <div
        ref={bodyRef}
        className="flex-1 min-h-0 overflow-y-auto overscroll-contain px-4 sm:px-6 py-4"
      >
        {status === 'loading' && (
          <div className="flex items-center gap-2 text-sm text-muted-foreground">
            <Loader2 className="h-4 w-4 animate-spin" /> Loading…
          </div>
        )}
        {status === 'error' && (
          <div className="text-sm text-muted-foreground">
            Couldn't load <span className="font-medium">{current.name}</span>.
          </div>
        )}
        {content !== null && (
          <WikiArticle
            markdown={content}
            sourcePath={sourcePath}
            hideImages
            onWikiLink={ref => {
              // Stay inside the popup: swap the body instead of navigating.
              jumpTo(ref)
              return true
            }}
          />
        )}
      </div>

      {/* Footer nav */}
      <div className="flex items-stretch border-t h-16 shrink-0 bg-background/60">
        <button
          type="button"
          disabled={!canPrev}
          onClick={() => navigate(-1)}
          className="flex-1 flex items-center justify-center gap-2 px-4 text-base sm:text-sm font-medium hover:bg-accent/60 active:bg-accent disabled:opacity-40 disabled:cursor-not-allowed transition-colors"
        >
          <ChevronLeft className="h-6 w-6 sm:h-5 sm:w-5" />
          <span>Previous</span>
        </button>
        <span className="self-center px-3 text-sm sm:text-xs text-muted-foreground tabular-nums shrink-0">
          {position}
        </span>
        <button
          type="button"
          disabled={!canNext}
          onClick={() => navigate(1)}
          className="flex-1 flex items-center justify-center gap-2 px-4 text-base sm:text-sm font-medium hover:bg-accent/60 active:bg-accent disabled:opacity-40 disabled:cursor-not-allowed transition-colors"
        >
          <span>Next</span>
          <ChevronRight className="h-6 w-6 sm:h-5 sm:w-5" />
        </button>
      </div>
    </aside>

    {showQuestions && (
      <ConceptQuestionsModal
        conceptName={current.name}
        onClose={() => setShowQuestions(false)}
      />
    )}
    {showLearningProgress && (
      <LearningProgressModal
        conceptName={current.name}
        onClose={() => setShowLearningProgress(false)}
      />
    )}
    {showGallery && (
      <ImageGalleryModal
        images={images}
        initialIndex={galleryIndex}
        onClose={() => setShowGallery(false)}
      />
    )}
    </>
  )
}
