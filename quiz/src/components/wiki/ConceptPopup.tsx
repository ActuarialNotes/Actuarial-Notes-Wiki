import { useCallback, useEffect, useMemo, useRef, useState } from 'react'
import { createPortal } from 'react-dom'
import { Link, useLocation, useNavigate } from 'react-router-dom'
import { BookOpen, ChevronDown, ChevronLeft, ChevronRight, GripHorizontal, Headphones, Loader2, Lock, Maximize2, Minimize2, Play, Sigma, TrendingUp, X } from 'lucide-react'
import { fetchWikiFile, fetchAllQuestions } from '@/lib/github'
import { entryRefToRepoPath, wikiRoute, type WikiEntryRef } from '@/lib/wikiRoutes'
import { parseAllQuestions, filterQuestions } from '@/lib/parser'
import { useConceptPopup } from '@/hooks/useConceptPopup'
import { useFlashcards } from '@/hooks/useFlashcards'
import { useCollect } from '@/hooks/useCollect'
import { showAddedToDeck } from '@/hooks/useToast'
import { useCollectedCards } from '@/hooks/useCollectedCards'
import { useSplitHeight } from '@/hooks/useSplitHeight'
import { WikiArticle, extractImages, extractMathBlockquotes } from '@/components/wiki/WikiArticle'
import { ResourceMetaCard } from '@/components/wiki/ResourceMetaCard'
import { isNumberedOutline, OUTLINE_ARTICLE_CLASS, parseResourceMeta, preprocessResourceMarkdown } from '@/lib/resourceMeta'
import { ListenView } from '@/components/wiki/ListenView'
import { ImageGalleryModal } from '@/components/wiki/ImageGalleryModal'
import { ConceptImageBanner } from '@/components/wiki/ConceptImageBanner'
import { ConceptQuestionsModal } from '@/components/wiki/ConceptQuestionsModal'
import { LearningProgressModal } from '@/components/wiki/LearningProgressModal'
import { AddToProjectMenuItem } from '@/components/wiki/AddToProjectMenuItem'
import { RESEARCH_TAB_ENABLED } from '@/lib/featureFlags'
import { useAuth } from '@/hooks/useAuth'
import { useSoundEffects, useSoundOnToggle } from '@/hooks/useSoundEffects'
import { useSubscription } from '@/hooks/useSubscription'
import { useConceptMastery } from '@/hooks/useConceptMastery'
import { decayIfStale, type MasteryState } from '@/lib/mastery'
import { NavProgressBar } from '@/components/NavProgressBar'
import { KeystoneName } from '@/components/KeystoneName'
import { buildMasteryLookup } from '@/lib/conceptMatch'
import { findKeystone, keystoneProgress } from '@/lib/keystone'

const MASTERY_PILL: Record<MasteryState, { label: string; className: string }> = {
  new:      { label: 'New', className: 'bg-muted text-muted-foreground' },
  level1:   { label: '1', className: 'bg-green-100 text-green-700 dark:bg-green-950/40 dark:text-green-300' },
  level2:   { label: '2', className: 'bg-green-200 text-green-800 dark:bg-green-900/60 dark:text-green-200' },
  level3:   { label: '3', className: 'bg-green-400 text-green-950 dark:bg-green-800 dark:text-green-100' },
  forgotten: { label: 'F', className: 'bg-red-100 text-red-700 dark:bg-red-950/60 dark:text-red-300' },
}

export function ConceptPopup() {
  const { open, list, index, occurrences, occurrenceIndex, navigate, jumpTo, close, dashboardContext, setDashboardFilter } = useConceptPopup()
  const { addCard, hasCard, cards } = useFlashcards()
  const openCollect = useCollect(s => s.open)
  const collectedCards = useCollectedCards(s => s.cards)
  const [conceptQuestionCount, setConceptQuestionCount] = useState<number | null>(null)
  const location = useLocation()
  const routerNavigate = useNavigate()
  const isOnWiki = location.pathname.startsWith('/wiki/')
  const current: WikiEntryRef | undefined = list[index]
  const [content, setContent] = useState<string | null>(null)
  const [status, setStatus] = useState<'idle' | 'loading' | 'error'>('idle')
  const { height, beginDrag } = useSplitHeight()
  // Focus mode — the popup's counterpart to the Flashcards page focus mode:
  // it fills the viewport (covering the sidebar, bottom nav and search bar) and
  // strips the chrome back to the concept title, its text, and Previous/Next.
  const [focusMode, setFocusMode] = useState(false)
  const [showQuestionsModal, setShowQuestionsModal] = useState(false)
  const [showLearningProgress, setShowLearningProgress] = useState(false)
  const [showPlayMenu, setShowPlayMenu] = useState(false)
  const [menuAlignRight, setMenuAlignRight] = useState(false)
  // Viewport rect of the play button, captured when the menu opens. The menu is
  // portaled to <body> (out of the fixed aside's stacking context) so it can
  // layer above the onboarding-tour coach-mark; fixed positioning is anchored
  // from this rect. The button sits in the aside's non-scrolling header, so the
  // rect stays valid for the life of the menu.
  const [menuRect, setMenuRect] = useState<DOMRect | null>(null)
  const [images, setImages] = useState<Array<{ src: string; alt: string; caption: string }>>([])
  const [showGallery, setShowGallery] = useState(false)
  const [galleryIndex, setGalleryIndex] = useState(0)
  const [mathView, setMathView] = useState(false)
  const [listenView, setListenView] = useState(false)
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
  // Keystone roll-up for the exam this concept anchors — the popup already has
  // every mastery record loaded, so the badge's explainer can show real
  // progress without a second query. Null for ordinary concepts.
  const keystoneStats = useMemo(() => {
    const match = findKeystone(current?.name)
    if (!match) return undefined
    return keystoneProgress(match.examId, buildMasteryLookup(masteryRecords), new Date())
  }, [masteryRecords, current?.name])
  const [viewingDropdownOpen, setViewingDropdownOpen] = useState(false)
  const [showPremiumInfo, setShowPremiumInfo] = useState(false)

  // The panel's own sound — a sheet of paper sliding out, and back in on close.
  // It lives here rather than on the buttons because the popup can be opened
  // from a wiki link, the search panel, the dashboard or a keyboard shortcut.
  const { play } = useSoundEffects()
  useSoundOnToggle(open, 'open', 'close')

  // Stepping to the previous/next concept is a page flick, not a press. Shared
  // by the footer buttons and the ←/→ shortcuts so both sound the same.
  const turnPage = useCallback((direction: -1 | 1) => {
    play('page')
    navigate(direction)
  }, [play, navigate])

  // Scroll the body back to top whenever the viewed concept changes. The action
  // menu closes with it — the next concept may be uncollected, in which case its
  // header button is a lock and the menu has nothing to hang off.
  useEffect(() => {
    if (bodyRef.current) bodyRef.current.scrollTop = 0
    setShowPlayMenu(false)
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
      // Esc leaves focus mode first, then closes — same as the Flashcards page.
      if (e.key === 'Escape') focusMode ? setFocusMode(false) : close()
      else if (e.key === 'ArrowLeft') turnPage(-1)
      else if (e.key === 'ArrowRight') turnPage(1)
    }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [open, close, turnPage, focusMode])

  // Close play menu when clicking outside of it. The "Add to Project" submenu
  // is rendered in its own portal (outside playMenuRef in the DOM), so it's
  // excluded via the data-add-to-project-menu marker.
  useEffect(() => {
    if (!showPlayMenu) return
    function onPointerDown(e: PointerEvent) {
      const target = e.target as HTMLElement | null
      if (target?.closest('[data-add-to-project-menu]')) return
      // The menu itself is portaled to <body> (outside playMenuRef), so a click
      // inside it wouldn't count as "inside" without this marker check.
      if (target?.closest('[data-play-menu]')) return
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

  // Focus mode covers the whole viewport, so lock the page behind it the same
  // way the Flashcards focus mode does.
  useEffect(() => {
    if (!focusMode) return
    document.body.style.overflow = 'hidden'
    return () => { document.body.style.overflow = '' }
  }, [focusMode])

  // Reset math / listen / focus view when popup closes.
  useEffect(() => {
    if (!open) { setMathView(false); setListenView(false); setFocusMode(false) }
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
  // In occurrence mode, prev/next step through every mention (repeats included),
  // so bounds follow the occurrence list; the count shown stays the deduped
  // concept total so a repeat never changes "the number of concepts".
  const occMode = !!(occurrences && occurrences.length)
  const canPrev = isCircular || (occMode ? occurrenceIndex > 0 : index > 0)
  const canNext = isCircular || (occMode ? occurrenceIndex < occurrences!.length - 1 : index < list.length - 1)
  const position = `${index + 1} of ${list.length}`
  const sourcePath = current ? entryRefToRepoPath(current) : undefined
  const hasStudyPlan = !!(dashboardContext?.studyPlanList?.length)
  const hasSourceMaterial = !!(dashboardContext?.resourceList?.length)
  const isLoggedInPremium = !!user && isPremium
  const currentFilter = dashboardContext?.filter ?? 'entire-syllabus'

  const todayLabel = `Study Plan — ${new Date().toLocaleDateString(undefined, { month: 'long', day: 'numeric' })}`

  // The collect gate and the action menu share one header button. While a
  // concept is uncollected the button *is* the lock: it shows the foil-ringed
  // padlock and opens the collect flow, so the actions behind it (Start Quiz,
  // Add to Flashcards, Math View, Learning Progress) are unreachable
  // until the card is earned. Once collected the same slot becomes the play
  // button. Non-concept entries (resources, exam pages) have no gate at all.
  // The Listen toggle sits in the right-hand control cluster instead, and is
  // gated on the same flag so the lock still covers it.
  const isCollected = collectedCards.some(c => c.name.toLowerCase() === current.name.toLowerCase())
  // A concept past New has necessarily been collected already (grandfathered
  // users included), so treat it as unlocked even if not in the collected store.
  const actionLocked = current.kind === 'concept' && !isCollected && (masteryState === null || masteryState === 'new')

  return (
    <>
    <aside
      className="concept-popup-aside fixed left-0 right-0 bottom-14 md:bottom-0 z-40 border-t bg-card text-card-foreground shadow-2xl flex flex-col"
      data-focus={focusMode}
      style={{ height: focusMode ? undefined : `min(${height}px, 100vh)` }}
      role="complementary"
      aria-label={`Concept: ${current.name}`}
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

      {/* Header. Focus mode spans the full viewport, so the header and the body
          below share a max-width reading column to keep line lengths sane on
          desktop and stay aligned with each other. */}
      <div className={`flex items-center gap-2 h-16 shrink-0 ${focusMode ? 'w-full max-w-4xl mx-auto px-4 sm:px-6' : 'px-3'}`}>
        <div className="flex items-center gap-2 flex-1 min-w-0">
          {/* The title carries the keystone marker itself: a gold underline on
              the name, tappable to confirm this concept is load-bearing. For an
              ordinary concept `KeystoneName` renders plain text, so the header
              looks exactly as it did before. */}
          <KeystoneName
            name={current.name}
            progress={keystoneStats}
            className="truncate font-semibold text-lg sm:text-xl min-w-0"
          />
          {/* Mastery status (New/1/2/3/F), sitting just right of the concept
              name — only once the card is collected, since an uncollected
              concept is pinned at New by the gate. Opens the combined card +
              learning-progress modal, where it can level up. */}
          {!focusMode && current.kind === 'concept' && !actionLocked && (() => {
            const pill = MASTERY_PILL[masteryState ?? 'new']
            return (
              <button
                type="button"
                data-tour="collect-card"
                // Hand the modal the verdict this pill is already showing, so
                // it opens straight onto the card + learning progress instead
                // of flashing the collect check while it re-derives mastery.
                onClick={() => openCollect(current, { collected: true, mastery: masteryState ?? undefined })}
                title="View flashcard & learning progress"
                aria-label={`${current.name} — ${pill.label}. View flashcard and progress`}
                className={`shrink-0 inline-flex items-center justify-center min-w-[1.875rem] h-7 px-2 rounded-full text-xs font-bold tabular-nums cursor-pointer hover:opacity-80 transition-opacity ${pill.className}`}
              >
                {pill.label}
              </button>
            )
          })()}
          {/* The action button — or, while the concept is uncollected, the lock
              that stands in for it. Spacing is the row's `gap-2` and nothing
              else: the locked state draws a visible foil ring at the button's
              edge, so any negative margin here puts that ring straight onto the
              last letter of the name. */}
          {!focusMode && (
          <div className="relative shrink-0" ref={playMenuRef}>
          {actionLocked ? (
            <button
              type="button"
              data-tour="collect-card"
              onClick={() => openCollect(current)}
              className="lock-foil-ring inline-flex items-center justify-center h-10 w-10 rounded-lg shrink-0 text-muted-foreground hover:text-foreground hover:bg-accent transition-colors"
              title="Locked — collect this flashcard to unlock its actions"
              aria-label={`Collect ${current.name} to unlock its actions`}
            >
              <Lock className="h-5 w-5" />
            </button>
          ) : (
          <button
            ref={playBtnRef}
            type="button"
            data-tour="concept-action"
            onClick={() => {
              if (!showPlayMenu && playBtnRef.current) {
                const rect = playBtnRef.current.getBoundingClientRect()
                setMenuAlignRight(window.innerWidth - rect.right < 200)
                setMenuRect(rect)
              }
              setShowPlayMenu(v => !v)
            }}
            className="inline-flex items-center justify-center h-10 w-10 rounded-lg bg-background hover:bg-accent text-foreground shrink-0"
            title="Start Quiz or Add to Flashcards"
            aria-label="Start Quiz or Add to Flashcards"
          >
            <Play className="h-5 w-5" />
          </button>
          )}
          {showPlayMenu && menuRect && createPortal(
            <div
              data-play-menu
              className="fixed w-52 rounded-md bg-popover text-popover-foreground shadow-md z-[70] py-1 max-h-[min(18rem,80vh)] overflow-y-auto"
              style={{
                top: menuRect.bottom + 4,
                ...(menuAlignRight
                  ? { right: Math.max(8, window.innerWidth - menuRect.right) }
                  : { left: menuRect.left }),
              }}
            >
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
                  data-sound="none"
                  onClick={() => {
                    if (!hasCard(current.name)) { play('addToDeck'); showAddedToDeck(1) }
                    addCard(current)
                  }}
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
              {RESEARCH_TAB_ENABLED && user && <AddToProjectMenuItem item={current} onNavigate={() => setShowPlayMenu(false)} />}
              <button
                type="button"
                onClick={() => { setMathView(true); setListenView(false); setShowPlayMenu(false) }}
                className="w-full flex items-center gap-2 px-3 py-2 text-sm hover:bg-accent transition-colors"
              >
                <Sigma className="h-3.5 w-3.5 shrink-0" />
                Math View
              </button>
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
            </div>,
            document.body,
          )}
          </div>
          )}
          {/* Sigma icon — visible only while in Math View; clicking exits it */}
          {!focusMode && mathView && (
            <button
              type="button"
              onClick={() => setMathView(false)}
              className="inline-flex items-center justify-center h-10 w-10 rounded-lg bg-primary text-primary-foreground hover:bg-primary/90 shrink-0"
              title="Exit Math View"
              aria-label="Exit Math View"
            >
              <Sigma className="h-5 w-5" />
            </button>
          )}
        </div>
        {/* Listen toggle — sits beside the focus toggle rather than inside the
            action menu, since it's a view switch like focus mode, not an
            action. Survives focus mode for the same reason that toggle does:
            Listen is most useful with the page full-screen, so there has to be
            a way in and out of it there. Gated by the collect lock like the
            menu items are. */}
        {!actionLocked && (
          <button
            type="button"
            onClick={() => { setListenView(!listenView); if (!listenView) setMathView(false) }}
            aria-pressed={listenView}
            className={`inline-flex items-center justify-center h-10 w-10 rounded-lg shrink-0 transition-colors ${listenView ? 'bg-primary text-primary-foreground hover:bg-primary/90' : 'text-muted-foreground hover:text-foreground hover:bg-accent'}`}
            title={listenView ? 'Exit Listen' : 'Listen'}
            aria-label={listenView ? 'Exit Listen' : 'Listen'}
          >
            <Headphones className="h-5 w-5" />
          </button>
        )}
        {/* Focus mode toggle — the only control that survives focus mode, so
            there's always a way back out (Esc also works). */}
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
        {!focusMode && (
          <button
            type="button"
            onClick={close}
            data-sound="none"
            className="inline-flex items-center justify-center h-10 w-10 rounded-lg shrink-0 text-muted-foreground hover:text-foreground hover:bg-accent transition-colors"
            title="Close"
            aria-label="Close"
          >
            <X className="h-5 w-5" />
          </button>
        )}
      </div>

      {/* Body — overflow-y:scroll (not auto) keeps this a scroll container even when
          content is short, so overscroll-contain traps wheel events and the dashboard
          behind never scrolls. Scrollbar is hidden via CSS. */}
      <div
        ref={bodyRef}
        // The body, not each article inside it, is one math-focus scope — in
        // Math View every equation is its own WikiArticle, and Previous/Next
        // should still run through all of them. See lib/mathFocus.ts.
        data-math-scope=""
        className={`flex-1 min-h-0 w-full overflow-y-scroll overscroll-contain px-4 sm:px-6 pb-4 [&::-webkit-scrollbar]:hidden [scrollbar-width:none] ${focusMode ? 'max-w-4xl mx-auto' : ''} ${listenView ? 'pt-0' : 'pt-4'}`}
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
              {/* The concept's figure leads the page — see ConceptImageBanner. */}
              <ConceptImageBanner
                images={images}
                onOpen={i => { setGalleryIndex(i); setShowGallery(true) }}
              />
              {resourceMeta && <ResourceMetaCard meta={resourceMeta} compact showTitle={false} />}
              <WikiArticle
                markdown={processedContent ?? content}
                className={
                  resourceMeta && isNumberedOutline(processedContent ?? content)
                    ? OUTLINE_ARTICLE_CLASS
                    : undefined
                }
                sourcePath={sourcePath}
                hideImages
                onWikiLink={ref => {
                  // Stay inside the popup: swap the body instead of navigating.
                  play('page')
                  jumpTo(ref)
                  return true
                }}
              />
            </>
          )
        )}
      </div>

      {/* Footer nav */}
      <NavProgressBar
        current={index + 1}
        total={list.length}
        label={`Concept ${index + 1} of ${list.length}`}
      />
      <div className="flex items-stretch h-16 shrink-0 bg-background/60">
        <button
          type="button"
          disabled={!canPrev}
          data-sound="none"
          onClick={() => {
            if (showGallery) {
              setShowGallery(false)
              gallerySeekDirection.current = -1
            }
            turnPage(-1)
          }}
          className="flex-1 flex items-center justify-center gap-2 px-4 text-base sm:text-sm font-medium hover:bg-accent/60 active:bg-accent disabled:opacity-40 disabled:cursor-not-allowed transition-colors"
        >
          <ChevronLeft className="h-6 w-6 sm:h-5 sm:w-5" />
          <span>Previous</span>
        </button>
        {/* Position + syllabus-filter picker — extra information, so focus mode
            drops it and leaves the footer as just Previous / Next. */}
        {!focusMode && (
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
          onClick={() => {
            if (showGallery) {
              setShowGallery(false)
              gallerySeekDirection.current = 1
            }
            turnPage(1)
          }}
          className="flex-1 flex items-center justify-center gap-2 px-4 text-base sm:text-sm font-medium hover:bg-accent/60 active:bg-accent disabled:opacity-40 disabled:cursor-not-allowed transition-colors"
        >
          <span>Next</span>
          <ChevronRight className="h-6 w-6 sm:h-5 sm:w-5" />
        </button>
      </div>
    </aside>

    {showQuestionsModal && (
      <ConceptQuestionsModal
        conceptName={current.name}
        onClose={() => setShowQuestionsModal(false)}
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
        hostFocusMode={focusMode}
        onClose={() => setShowGallery(false)}
      />
    )}
    </>
  )
}
