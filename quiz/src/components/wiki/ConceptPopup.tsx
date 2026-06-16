import { useEffect, useLayoutEffect, useMemo, useRef, useState } from 'react'
import { Link, useLocation, useNavigate } from 'react-router-dom'
import { BookOpen, ChevronDown, ChevronLeft, ChevronRight, GripHorizontal, Headphones, Images, Lightbulb, Loader2, Lock, Maximize2, Minimize2, Play, Sigma, TrendingUp, X } from 'lucide-react'
import { fetchWikiFile, fetchAllQuestions } from '@/lib/github'
import { entryRefToRepoPath, wikiRoute, type WikiEntryRef } from '@/lib/wikiRoutes'
import { parseAllQuestions, filterQuestions } from '@/lib/parser'
import { useConceptPopup } from '@/hooks/useConceptPopup'
import { useFlashcards } from '@/hooks/useFlashcards'
import { useSplitHeight } from '@/hooks/useSplitHeight'
import { WikiArticle, extractImages, extractMathBlockquotes } from '@/components/wiki/WikiArticle'
import { ResourceMetaCard } from '@/components/wiki/ResourceMetaCard'
import { parseResourceMeta, preprocessResourceMarkdown } from '@/lib/resourceMeta'
import { ListenView } from '@/components/wiki/ListenView'
import { MnemonicBubble } from '@/components/wiki/MnemonicBubble'
import { MathViewContext } from '@/contexts/MathViewContext'
import { LearningProgressModal } from '@/components/wiki/LearningProgressModal'
import { ImageGalleryModal } from '@/components/wiki/ImageGalleryModal'
import { ConceptQuestionsModal } from '@/components/wiki/ConceptQuestionsModal'
import { AddToProjectMenuItem } from '@/components/wiki/AddToProjectMenuItem'
import { useAuth } from '@/hooks/useAuth'
import { useSubscription } from '@/hooks/useSubscription'
import { useConceptMastery } from '@/hooks/useConceptMastery'
import { decayIfStale, type MasteryState } from '@/lib/mastery'
import { parseAvatarUrl, type AnimalType } from '@/components/AvatarDisplay'

const MASTERY_PILL: Partial<Record<MasteryState, { label: string; className: string }>> = {
  level1:   { label: '1', className: 'bg-green-100 text-green-700 dark:bg-green-950/40 dark:text-green-300' },
  level2:   { label: '2', className: 'bg-green-200 text-green-800 dark:bg-green-900/60 dark:text-green-200' },
  level3:   { label: '3', className: 'bg-green-400 text-green-950 dark:bg-green-800 dark:text-green-100' },
  forgotten: { label: 'F', className: 'bg-red-100 text-red-700 dark:bg-red-950/60 dark:text-red-300' },
}

export function ConceptPopup() {
  const { open, list, index, navigate, jumpTo, close, dashboardContext, setDashboardFilter } = useConceptPopup()
  const { addCard, hasCard, cards } = useFlashcards()
  const [conceptQuestionCount, setConceptQuestionCount] = useState<number | null>(null)
  const location = useLocation()
  const routerNavigate = useNavigate()
  const isOnWiki = location.pathname.startsWith('/wiki/')
  const current: WikiEntryRef | undefined = list[index]
  const [content, setContent] = useState<string | null>(null)
  const [status, setStatus] = useState<'idle' | 'loading' | 'error'>('idle')
  const { height, beginDrag } = useSplitHeight()
  const [maximized, setMaximized] = useState(false)
  const [showLearningProgress, setShowLearningProgress] = useState(false)
  const [showQuestionsModal, setShowQuestionsModal] = useState(false)
  const [showPlayMenu, setShowPlayMenu] = useState(false)
  const [menuAlignRight, setMenuAlignRight] = useState(false)
  const [images, setImages] = useState<Array<{ src: string; alt: string; caption: string }>>([])
  const [showGallery, setShowGallery] = useState(false)
  const [galleryIndex, setGalleryIndex] = useState(0)
  const [mathView, setMathView] = useState(false)
  const [listenView, setListenView] = useState(false)
  const [mnemonicView, setMnemonicView] = useState(false)
  const playMenuRef = useRef<HTMLDivElement>(null)
  const playBtnRef = useRef<HTMLButtonElement>(null)
  const bodyRef = useRef<HTMLDivElement>(null)
  const viewingRef = useRef<HTMLDivElement>(null)
  const gallerySeekDirection = useRef<0 | 1 | -1>(0)
  const { user } = useAuth()
  const { isPremium } = useSubscription()
  const { records: masteryRecords } = useConceptMastery()
  const masteryState = useMemo<MasteryState | null>(() => {
    if (!current) return null
    const lower = current.name.toLowerCase()
    const record = masteryRecords.find(r => r.concept_slug.toLowerCase() === lower)
    if (!record) return null
    return decayIfStale(record, new Date()).state
  }, [masteryRecords, current?.name])
  const [viewingDropdownOpen, setViewingDropdownOpen] = useState(false)
  const [showPremiumInfo, setShowPremiumInfo] = useState(false)

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
        const imgs = extractImages(raw)
        setContent(raw)
        setImages(imgs)
        setStatus('idle')
        const seeking = gallerySeekDirection.current
        if (seeking !== 0) {
          if (imgs.length > 0) {
            gallerySeekDirection.current = 0
            setGalleryIndex(0)
            setShowGallery(true)
          } else {
            const nextIdx = index + seeking
            if (nextIdx >= 0 && nextIdx < list.length) {
              navigate(seeking)
            } else {
              gallerySeekDirection.current = 0
            }
          }
        } else {
          setShowGallery(false)
        }
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

  // Close play menu when clicking outside of it. The "Add to Project" submenu
  // is rendered in its own portal (outside playMenuRef in the DOM), so it's
  // excluded via the data-add-to-project-menu marker.
  useEffect(() => {
    if (!showPlayMenu) return
    function onPointerDown(e: PointerEvent) {
      const target = e.target as HTMLElement | null
      if (target?.closest('[data-add-to-project-menu]')) return
      if (playMenuRef.current && !playMenuRef.current.contains(target)) {
        setShowPlayMenu(false)
      }
    }
    document.addEventListener('pointerdown', onPointerDown)
    return () => document.removeEventListener('pointerdown', onPointerDown)
  }, [showPlayMenu])

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

  // While maximized, keep the popup's top offset in sync with the floating
  // search bar's actual rendered height. A one-time measurement on click
  // goes stale if the search bar grows/shrinks afterwards (e.g. the page
  // title strip or an In Development/Beta banner mounts asynchronously),
  // leaving the popup either hidden behind the search bar or with a gap
  // above it.
  useLayoutEffect(() => {
    if (!maximized) return
    const root = document.documentElement
    function update() {
      const topBar = document.querySelector('[data-floating-search]') as HTMLElement | null
      const offset = topBar
        ? topBar.getBoundingClientRect().bottom
        : window.innerWidth >= 1024 ? 0 : 56
      root.style.setProperty('--popup-max-top', `${Math.max(0, Math.round(offset))}px`)
    }
    update()
    const topBar = document.querySelector('[data-floating-search]')
    const observer = new ResizeObserver(update)
    if (topBar) observer.observe(topBar)
    window.addEventListener('resize', update)
    return () => {
      observer.disconnect()
      window.removeEventListener('resize', update)
      root.style.removeProperty('--popup-max-top')
    }
  }, [maximized])

  // Reset math / listen / mnemonic view when popup closes.
  useEffect(() => {
    if (!open) { setMathView(false); setListenView(false); setMnemonicView(false) }
  }, [open])

  // Fetch question count for the current concept (uses cached question list).
  useEffect(() => {
    if (!open || !current || current.kind !== 'concept') {
      setConceptQuestionCount(null)
      return
    }
    let cancelled = false
    fetchAllQuestions()
      .then(rawFiles => {
        if (cancelled) return
        const all = parseAllQuestions(rawFiles)
        const filtered = filterQuestions(all, { concept: current.name })
        setConceptQuestionCount(filtered.length)
      })
      .catch(() => {})
    return () => { cancelled = true }
  }, [open, current?.kind, current?.name])

  const mathBlocks = useMemo(() => {
    if (!content) return []
    return extractMathBlockquotes(content)
  }, [content])

  const resourceMeta = useMemo(() => {
    if (!content || current?.kind !== 'resource') return null
    return parseResourceMeta(content)
  }, [content, current?.kind])

  const processedContent = useMemo(() => {
    if (!content) return content
    if (current?.kind !== 'resource') return content
    return preprocessResourceMarkdown(content)
  }, [content, current?.kind])

  if (!open || !current) return null

  const isCircular = !!(dashboardContext?.circular)
  const canPrev = isCircular || index > 0
  const canNext = isCircular || index < list.length - 1
  const position = `${index + 1} of ${list.length}`
  const sourcePath = current ? entryRefToRepoPath(current) : undefined
  const hasStudyPlan = !!(dashboardContext?.studyPlanList?.length)
  const hasSourceMaterial = !!(dashboardContext?.resourceList?.length)
  const isLoggedInPremium = !!user && isPremium
  const currentFilter = dashboardContext?.filter ?? 'entire-syllabus'

  const userAnimal: AnimalType = (() => {
    const raw = user?.user_metadata?.avatar_url as string | undefined
    if (!raw) return 'fox'
    const parsed = parseAvatarUrl(raw)
    return parsed.type === 'animal' ? parsed.value : 'fox'
  })()
  const todayLabel = `Study Plan — ${new Date().toLocaleDateString(undefined, { month: 'long', day: 'numeric' })}`

  return (
    <>
    <aside
      className="concept-popup-aside fixed left-0 right-0 bottom-14 md:bottom-0 z-40 border-t bg-card text-card-foreground shadow-2xl flex flex-col"
      data-maximized={maximized}
      style={{ height: maximized ? undefined : `min(${height}px, 100vh)` }}
      role="complementary"
      aria-label={`Concept: ${current.name}`}
    >
      {/* Drag handle — hidden in fullscreen, visible otherwise */}
      {!maximized && (
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

      {/* Header */}
      <div className="flex items-center gap-2 px-3 h-14 border-b shrink-0">
        <div className="flex items-center gap-1.5 flex-1 min-w-0">
          <span className="truncate font-semibold text-base min-w-0">{current.name}</span>
          {masteryState && MASTERY_PILL[masteryState] && (
            <button
              type="button"
              onClick={() => setShowLearningProgress(true)}
              title="Learning Progress"
              className={`shrink-0 text-[10px] font-bold px-1.5 py-0.5 rounded-full tabular-nums cursor-pointer hover:opacity-80 transition-opacity ${MASTERY_PILL[masteryState]!.className}`}
            >
              {MASTERY_PILL[masteryState]!.label}
            </button>
          )}
          {/* Play button + mini menu — immediately right of the concept name */}
          <div className="relative shrink-0" ref={playMenuRef}>
          <button
            ref={playBtnRef}
            type="button"
            data-tour="concept-action"
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
            <div className={`absolute top-full mt-1 w-52 rounded-md border bg-popover text-popover-foreground shadow-md z-50 py-1 max-h-72 overflow-y-auto ${menuAlignRight ? 'right-0' : 'left-0'}`}>
              <button
                type="button"
                onClick={() => { setShowQuestionsModal(true); setShowPlayMenu(false) }}
                className="w-full flex items-center gap-2 px-3 py-2 text-sm hover:bg-accent transition-colors"
              >
                <Play className="h-3.5 w-3.5 shrink-0" />
                <span className="flex-1 text-left">Start Quiz</span>
                {conceptQuestionCount !== null && conceptQuestionCount > 0 && (
                  <span className="shrink-0 text-[10px] font-semibold px-1.5 py-0.5 rounded-full bg-primary/10 text-primary tabular-nums">
                    {conceptQuestionCount}
                  </span>
                )}
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
                  data-tour="add-flashcard"
                  onClick={() => { addCard(current) }}
                  className="flex-1 flex items-center gap-2 px-3 py-2 text-sm text-left"
                >
                  <span className="h-3.5 w-3.5 shrink-0 flex items-center justify-center text-xs">
                    {hasCard(current.name) ? '✓' : '+'}
                  </span>
                  <span className="flex-1">{hasCard(current.name) ? 'Added to Flashcards' : 'Add to Flashcards'}</span>
                  {hasCard(current.name) && cards.length > 0 && (
                    <span className="shrink-0 text-[10px] font-semibold px-1.5 py-0.5 rounded-full bg-muted text-muted-foreground tabular-nums">
                      {cards.length}
                    </span>
                  )}
                </button>
                {hasCard(current.name) && (
                  <Link
                    to={`/flashcards?highlight=${encodeURIComponent(current.name)}`}
                    data-tour="view-flashcards"
                    onClick={() => { setShowPlayMenu(false); close() }}
                    className="text-xs text-primary hover:underline pr-3 shrink-0"
                  >
                    view
                  </Link>
                )}
              </div>
              {user && <AddToProjectMenuItem item={current} onNavigate={() => setShowPlayMenu(false)} />}
              <button
                type="button"
                onClick={() => { setMathView(true); setListenView(false); setMnemonicView(false); setShowPlayMenu(false) }}
                className="w-full flex items-center gap-2 px-3 py-2 text-sm hover:bg-accent transition-colors"
              >
                <Sigma className="h-3.5 w-3.5 shrink-0" />
                Math View
              </button>
              <button
                type="button"
                onClick={() => { setListenView(true); setMathView(false); setMnemonicView(false); setShowPlayMenu(false) }}
                className="w-full flex items-center gap-2 px-3 py-2 text-sm hover:bg-accent transition-colors"
              >
                <Headphones className="h-3.5 w-3.5 shrink-0" />
                Listen
              </button>
              {current.kind === 'concept' && (
                <button
                  type="button"
                  onClick={() => { setMnemonicView(true); setMathView(false); setListenView(false); setShowPlayMenu(false) }}
                  className="w-full flex items-center gap-2 px-3 py-2 text-sm hover:bg-accent transition-colors"
                >
                  <Lightbulb className="h-3.5 w-3.5 shrink-0" />
                  Mnemonic
                </button>
              )}
              <button
                type="button"
                onClick={() => { setShowLearningProgress(true); setShowPlayMenu(false) }}
                className="w-full flex items-center gap-2 px-3 py-2 text-sm hover:bg-accent transition-colors"
              >
                <TrendingUp className="h-3.5 w-3.5 shrink-0" />
                <span className="flex-1 text-left">Learning Progress</span>
                {masteryState && MASTERY_PILL[masteryState] && (
                  <span className={`shrink-0 text-[10px] font-bold px-1.5 py-0.5 rounded-full tabular-nums ${MASTERY_PILL[masteryState]!.className}`}>
                    {MASTERY_PILL[masteryState]!.label}
                  </span>
                )}
              </button>
            </div>
          )}
          </div>
          {/* Sigma icon — visible only while in Math View; clicking exits it */}
          {mathView && (
            <button
              type="button"
              onClick={() => setMathView(false)}
              className="inline-flex items-center justify-center h-8 w-8 rounded-md border bg-primary text-primary-foreground hover:bg-primary/90 shrink-0"
              title="Exit Math View"
              aria-label="Exit Math View"
            >
              <Sigma className="h-4 w-4" />
            </button>
          )}
          {/* Headphones icon — visible only while in Listen view; clicking exits it */}
          {listenView && (
            <button
              type="button"
              onClick={() => setListenView(false)}
              className="inline-flex items-center justify-center h-8 w-8 rounded-md border bg-primary text-primary-foreground hover:bg-primary/90 shrink-0"
              title="Exit Listen"
              aria-label="Exit Listen"
            >
              <Headphones className="h-4 w-4" />
            </button>
          )}
          {/* Lightbulb icon — visible only while in Mnemonic view; clicking exits it */}
          {mnemonicView && (
            <button
              type="button"
              onClick={() => setMnemonicView(false)}
              className="inline-flex items-center justify-center h-8 w-8 rounded-md border bg-primary text-primary-foreground hover:bg-primary/90 shrink-0"
              title="Exit Mnemonic"
              aria-label="Exit Mnemonic"
            >
              <Lightbulb className="h-4 w-4" />
            </button>
          )}
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

      {/* Body — overflow-y:scroll (not auto) keeps this a scroll container even when
          content is short, so overscroll-contain traps wheel events and the dashboard
          behind never scrolls. Scrollbar is hidden via CSS. */}
      <MathViewContext.Provider value={{ active: mathView, enter: () => setMathView(true) }}>
        <div
          ref={bodyRef}
          className="flex-1 min-h-0 overflow-y-scroll overscroll-contain px-4 sm:px-6 py-4 [&::-webkit-scrollbar]:hidden [scrollbar-width:none]"
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
          {mnemonicView && current.kind === 'concept' && (
            <MnemonicBubble conceptName={current.name} animal={userAnimal} />
          )}
          {content !== null && !mnemonicView && (
            listenView ? (
              <ListenView markdown={content} />
            ) : mathView ? (
              mathBlocks.length > 0 ? (
                <div className="space-y-4">
                  {mathBlocks.map((block, i) => (
                    <WikiArticle key={i} markdown={block} sourcePath={sourcePath} hideImages />
                  ))}
                </div>
              ) : (
                <div className="flex flex-col items-center justify-center py-12 gap-3 text-muted-foreground">
                  <Sigma className="h-8 w-8 opacity-30" />
                  <span className="text-sm">No equations in this concept.</span>
                </div>
              )
            ) : (
              <>
                {resourceMeta && <ResourceMetaCard meta={resourceMeta} compact />}
                <WikiArticle
                  markdown={processedContent ?? content}
                  sourcePath={sourcePath}
                  hideImages
                  onWikiLink={ref => {
                    // Stay inside the popup: swap the body instead of navigating.
                    jumpTo(ref)
                    return true
                  }}
                />
              </>
            )
          )}
        </div>
      </MathViewContext.Provider>

      {/* Footer nav */}
      <div className="flex items-stretch border-t h-16 shrink-0 bg-background/60">
        <button
          type="button"
          disabled={!canPrev}
          onClick={() => {
            if (showGallery) {
              setShowGallery(false)
              gallerySeekDirection.current = -1
            }
            navigate(-1)
          }}
          className="flex-1 flex items-center justify-center gap-2 px-4 text-base sm:text-sm font-medium hover:bg-accent/60 active:bg-accent disabled:opacity-40 disabled:cursor-not-allowed transition-colors"
        >
          <ChevronLeft className="h-6 w-6 sm:h-5 sm:w-5" />
          <span>Previous</span>
        </button>
        <div className="self-center flex flex-col items-center gap-0.5 px-2 shrink-0" ref={viewingRef}>
          <span className="text-sm sm:text-xs text-muted-foreground tabular-nums">{position}</span>
          <div className="relative">
            <button
              type="button"
              onClick={() => { setViewingDropdownOpen(v => !v); setShowPremiumInfo(false) }}
              className="appearance-none text-xs text-muted-foreground hover:text-foreground transition-colors cursor-pointer focus:outline-none inline-flex items-center gap-0.5"
            >
              {currentFilter === 'study-plan' ? todayLabel : currentFilter === 'source-material' ? 'Source Material' : 'Entire Syllabus'}
              <ChevronDown className="h-2.5 w-2.5 shrink-0" />
            </button>

            {viewingDropdownOpen && (
              <div className="absolute bottom-full mb-1 left-1/2 -translate-x-1/2 z-50 w-56 rounded-md border bg-popover text-popover-foreground shadow-md py-1">
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
              <div className="absolute bottom-full mb-1 left-1/2 -translate-x-1/2 z-50 w-60 rounded-md border bg-popover text-popover-foreground shadow-md p-3">
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
        <button
          type="button"
          disabled={!canNext}
          onClick={() => {
            if (showGallery) {
              setShowGallery(false)
              gallerySeekDirection.current = 1
            }
            navigate(1)
          }}
          className="flex-1 flex items-center justify-center gap-2 px-4 text-base sm:text-sm font-medium hover:bg-accent/60 active:bg-accent disabled:opacity-40 disabled:cursor-not-allowed transition-colors"
        >
          <span>Next</span>
          <ChevronRight className="h-6 w-6 sm:h-5 sm:w-5" />
        </button>
      </div>
    </aside>

    {showLearningProgress && (
      <LearningProgressModal
        conceptName={current.name}
        onClose={() => setShowLearningProgress(false)}
      />
    )}
    {showQuestionsModal && (
      <ConceptQuestionsModal
        conceptName={current.name}
        onClose={() => setShowQuestionsModal(false)}
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
