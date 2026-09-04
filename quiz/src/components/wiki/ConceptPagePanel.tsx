import { useEffect, useMemo, useRef, useState } from 'react'
import { createPortal } from 'react-dom'
import { Link, useLocation, useNavigate } from 'react-router-dom'
import { BookOpen, CheckCheck, Headphones, Loader2, Lock, Play, Sigma, TrendingUp, X } from 'lucide-react'
import { fetchWikiFile, fetchAllQuestions } from '@/lib/github'
import { entryRefToRepoPath, wikiRoute, type WikiEntryRef } from '@/lib/wikiRoutes'
import { parseAllQuestions, filterQuestions } from '@/lib/parser'
import { useFlashcards } from '@/hooks/useFlashcards'
import { useCollect } from '@/hooks/useCollect'
import { showAddedToDeck } from '@/hooks/useToast'
import { useCollectedCards } from '@/hooks/useCollectedCards'
import { useConceptPopup } from '@/hooks/useConceptPopup'
import { recallPageScroll, rememberPageScroll } from '@/lib/pageScrollMemory'
import { WikiArticle, extractImages, extractMathBlockquotes } from '@/components/wiki/WikiArticle'
import { ResourceMetaCard } from '@/components/wiki/ResourceMetaCard'
import { isNumberedOutline, OUTLINE_ARTICLE_CLASS, parseResourceMeta, preprocessResourceMarkdown } from '@/lib/resourceMeta'
import { ListenView } from '@/components/wiki/ListenView'
import { ImageGalleryModal } from '@/components/wiki/ImageGalleryModal'
import { ConceptImageBanner } from '@/components/wiki/ConceptImageBanner'
import { ConceptQuestionsModal } from '@/components/wiki/ConceptQuestionsModal'
import { LearningProgressModal } from '@/components/wiki/LearningProgressModal'
import { AddToProjectMenuItem } from '@/components/wiki/AddToProjectMenuItem'
import { FACT_CHECK_UI_ENABLED, RESEARCH_TAB_ENABLED } from '@/lib/featureFlags'
import { useAuth } from '@/hooks/useAuth'
import { useSoundEffects } from '@/hooks/useSoundEffects'
import { useConceptMastery } from '@/hooks/useConceptMastery'
import { decayIfStale, type MasteryState } from '@/lib/mastery'
import { KeystoneName } from '@/components/KeystoneName'
import { buildMasteryLookup } from '@/lib/conceptMatch'
import { findKeystone, keystoneProgress } from '@/lib/keystone'
import { MasteryBadge } from '@/components/MasteryBadge'
import { MASTERY_LABEL, MASTERY_SHORT_LABEL, MASTERY_TINT } from '@/lib/masteryBadge'
import { FactCheckDialog, FACT_CHECK_TONE_CLASSES } from '@/components/FactCheckBadge'
import { factCheckBadge, parseVerification } from '@/lib/verification'

/**
 * The open page of the concept popup's stack: its header (title, mastery, the
 * action menu behind the collect gate, Listen) and its body (the article, Math
 * View or Listen view), with the gallery and modals it opens.
 *
 * Mounted per page, keyed by the ref, so opening another page of the stack is a
 * remount rather than a reset of a dozen pieces of state. What a reader would
 * expect to survive that — how far down the page they had read — is kept in
 * `lib/pageScrollMemory.ts` and restored when the page comes back, which is
 * what makes a folded page's title bar a way *back* to it rather than a way to
 * load it again.
 *
 * The chrome shared by the whole popup — the resize handle, the Previous/Next
 * footer, focus mode — stays in `ConceptPopup`.
 */
export interface ConceptPagePanelProps {
  entry: WikiEntryRef
  /** True while the popup fills the viewport — drops the page's extra chrome. */
  focusMode: boolean
  /** Called when a link on this page is followed, to stack the target on top. */
  onOpenLink: (ref: WikiEntryRef) => void
  /** Close this page. The popup closes when its last page does. */
  onClose: () => void
  /** Popup-level controls (the focus-mode toggle), shown on the active panel. */
  trailing?: React.ReactNode
  /**
   * Set when the footer's Previous / Next was pressed while the gallery was
   * open: this page should open its own gallery once loaded, and report back
   * so the walk can keep stepping when the page has no images at all.
   */
  gallerySeek?: 0 | 1 | -1
  onGallerySeekResolved?: (hadImages: boolean) => void
  /** Reports the gallery opening and closing, so the footer can hand it over. */
  onGalleryOpenChange?: (open: boolean) => void
  /**
   * Reports the PDF reader (a resource page's "Read PDF") opening and closing,
   * so the popup can hand it the keys it binds too. Kept apart from the gallery
   * flag above: that one also makes the footer's Previous / Next carry the
   * gallery to the next concept, which a document being read must not do.
   */
  onReaderOpenChange?: (open: boolean) => void
}

export function ConceptPagePanel({
  entry,
  focusMode,
  onOpenLink,
  onClose,
  trailing,
  gallerySeek = 0,
  onGallerySeekResolved,
  onGalleryOpenChange,
  onReaderOpenChange,
}: ConceptPagePanelProps) {
  const { addCard, hasCard, cards } = useFlashcards()
  const openCollect = useCollect(s => s.open)
  const collectedCards = useCollectedCards(s => s.cards)
  const [conceptQuestionCount, setConceptQuestionCount] = useState<number | null>(null)
  const location = useLocation()
  const routerNavigate = useNavigate()
  const isOnWiki = location.pathname.startsWith('/wiki/')
  const [content, setContent] = useState<string | null>(null)
  const [status, setStatus] = useState<'idle' | 'loading' | 'error'>('idle')
  const [showQuestionsModal, setShowQuestionsModal] = useState(false)
  const [showLearningProgress, setShowLearningProgress] = useState(false)
  const [showFactCheck, setShowFactCheck] = useState(false)
  const [showPlayMenu, setShowPlayMenu] = useState(false)
  const [menuAlignRight, setMenuAlignRight] = useState(false)
  // Viewport rect of the play button, captured when the menu opens. The menu is
  // portaled to <body> (out of the fixed aside's stacking context) so it can
  // layer above the onboarding-tour coach-mark; fixed positioning is anchored
  // from this rect. The button sits in the panel's non-scrolling header, so the
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
  const { user } = useAuth()
  const { records: masteryRecords } = useConceptMastery()
  const { play } = useSoundEffects()
  // The whole popup goes away when this page's "view flashcards" link leaves
  // the wiki behind — the stack has nothing to sit on there.
  const closePopup = useConceptPopup(s => s.close)

  const masteryState = useMemo<MasteryState | null>(() => {
    const lower = entry.name.toLowerCase()
    const record = masteryRecords.find(r => r.concept_slug.toLowerCase() === lower)
    if (!record) return null
    return decayIfStale(record, new Date()).state
  }, [masteryRecords, entry.name])

  // Keystone roll-up for the exam this concept anchors — the popup already has
  // every mastery record loaded, so the badge's explainer can show real
  // progress without a second query. Null for ordinary concepts.
  const keystoneStats = useMemo(() => {
    const match = findKeystone(entry.name)
    if (!match) return undefined
    return keystoneProgress(match.examId, buildMasteryLookup(masteryRecords), new Date())
  }, [masteryRecords, entry.name])

  // Fetch this page's markdown. The panel is keyed by its ref, so this runs
  // once per page rather than on every step of the walk.
  useEffect(() => {
    let cancelled = false
    setStatus('loading')
    fetchWikiFile(entryRefToRepoPath(entry))
      .then(raw => {
        if (cancelled) return
        // A resource page's first embed is its cover, and the cover is already
        // the jacket on the metadata card — it is not one of the page's
        // figures. Reading the images off the same cover-stripped markdown the
        // article renders keeps the banner, its pager and the gallery walk
        // agreeing with what's actually on the page (a book with nothing but a
        // jacket then has no figure banner at all, rather than a "Show figure"
        // strip that reveals the cover a second time).
        const imgs = extractImages(
          entry.kind === 'resource' ? preprocessResourceMarkdown(raw) : raw,
        )
        setContent(raw)
        setImages(imgs)
        setStatus('idle')
        // Stepping with the gallery open: reopen it here, or tell the walk this
        // page had nothing to show so it can carry on in the same direction.
        if (gallerySeek !== 0) {
          if (imgs.length > 0) {
            setGalleryIndex(0)
            setShowGallery(true)
          }
          onGallerySeekResolved?.(imgs.length > 0)
        }
      })
      .catch(() => {
        if (cancelled) return
        setStatus('error')
      })
    return () => {
      cancelled = true
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [entry.kind, entry.name])

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

  // Put the reader back where they were when this page is opened again from its
  // bar. The restore waits for the article to be laid out — before that the body
  // has nothing to scroll through. See lib/pageScrollMemory.ts.
  useEffect(() => {
    if (content === null) return
    const saved = recallPageScroll(entry)
    if (saved <= 0) return
    const frame = requestAnimationFrame(() => requestAnimationFrame(() => {
      if (bodyRef.current) bodyRef.current.scrollTop = saved
    }))
    return () => cancelAnimationFrame(frame)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [content === null])

  useEffect(() => {
    onGalleryOpenChange?.(showGallery)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [showGallery])

  // Fetch question count for this concept (uses cached question list).
  useEffect(() => {
    if (entry.kind !== 'concept') {
      setConceptQuestionCount(null)
      return
    }
    let cancelled = false
    fetchAllQuestions()
      .then(rawFiles => {
        if (cancelled) return
        const all = parseAllQuestions(rawFiles)
        setConceptQuestionCount(filterQuestions(all, { concept: entry.name }).length)
      })
      .catch(() => {})
    return () => { cancelled = true }
  }, [entry.kind, entry.name])

  const mathBlocks = useMemo(() => (content ? extractMathBlockquotes(content) : []), [content])

  // What the page's own `verification:` block says has been checked about it —
  // the Fact Check row of the action menu, and the record it opens. Parsed off
  // the raw markdown the panel already fetched, so it costs no extra request.
  const verification = useMemo(() => (content ? parseVerification(content) : null), [content])
  const factCheck = useMemo(() => factCheckBadge(verification), [verification])

  const resourceMeta = useMemo(() => {
    if (!content || entry.kind !== 'resource') return null
    return parseResourceMeta(content)
  }, [content, entry.kind])

  const processedContent = useMemo(() => {
    if (!content) return content
    if (entry.kind !== 'resource') return content
    return preprocessResourceMarkdown(content)
  }, [content, entry.kind])

  const sourcePath = entryRefToRepoPath(entry)

  // A guide page (an exam's "How to Study" tip) has no action menu at all:
  // Start Quiz, Add to Flashcards and Learning Progress are all about a concept
  // being learned, and a tip is advice about the exam. Listen stays — it is a
  // way of reading the page.
  const hasActions = entry.kind !== 'guide'

  // The collect gate and the action menu share one header button. While a
  // concept is uncollected the button *is* the lock: it shows the foil-ringed
  // padlock and opens the collect flow, so the actions behind it (Start Quiz,
  // Add to Flashcards, Math View, Learning Progress) are unreachable
  // until the card is earned. Once collected the same slot becomes the play
  // button. Non-concept entries (resources, exam pages) have no gate at all.
  // The Listen toggle is deliberately outside the gate: it reads the page
  // aloud, which is a way of *reading* the concept, not one of the actions the
  // card unlocks — so it stays available in the right-hand control cluster
  // even while the lock is up.
  const isCollected = collectedCards.some(c => c.name.toLowerCase() === entry.name.toLowerCase())
  // A concept past New has necessarily been collected already (grandfathered
  // users included), so treat it as unlocked even if not in the collected store.
  const actionLocked = entry.kind === 'concept' && !isCollected && (masteryState === null || masteryState === 'new')

  return (
    <>
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
            name={entry.name}
            progress={keystoneStats}
            className="truncate font-semibold text-lg sm:text-xl min-w-0"
          />
          {/* Mastery status (New/1/2/3/F), sitting just right of the concept
              name — only once the card is collected, since an uncollected
              concept is pinned at New by the gate. Opens the combined card +
              learning-progress modal, where it can level up. */}
          {!focusMode && entry.kind === 'concept' && !actionLocked && (() => {
            const state = masteryState ?? 'new'
            return (
              <button
                type="button"
                data-tour="collect-card"
                // Hand the modal the verdict this pill is already showing, so
                // it opens straight onto the card + learning progress instead
                // of flashing the collect check while it re-derives mastery.
                onClick={() => openCollect(entry, { collected: true, mastery: masteryState ?? undefined })}
                title="View flashcard & learning progress"
                aria-label={`${entry.name} — ${MASTERY_LABEL[state]}. View flashcard and progress`}
                className={`shrink-0 inline-flex items-center justify-center min-w-[1.875rem] h-7 px-2 rounded-full text-xs font-bold tabular-nums cursor-pointer hover:opacity-80 transition-opacity ${MASTERY_TINT[state]}`}
              >
                {MASTERY_SHORT_LABEL[state]}
              </button>
            )
          })()}
          {/* The action button — or, while the concept is uncollected, the lock
              that stands in for it. Spacing is the row's `gap-2` and nothing
              else: the locked state draws a visible foil ring at the button's
              edge, so any negative margin here puts that ring straight onto the
              last letter of the name. */}
          {!focusMode && hasActions && (
          <div className="relative shrink-0" ref={playMenuRef}>
          {actionLocked ? (
            <button
              type="button"
              data-tour="collect-card"
              onClick={() => openCollect(entry)}
              className="lock-foil-ring inline-flex items-center justify-center h-10 w-10 rounded-lg shrink-0 text-muted-foreground hover:text-foreground hover:bg-accent transition-colors"
              title="Locked — collect this flashcard to unlock its actions"
              aria-label={`Collect ${entry.name} to unlock its actions`}
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
              {entry.kind === 'concept' && (
                <button
                  type="button"
                  disabled={isOnWiki}
                  onClick={() => { routerNavigate(wikiRoute(entry)); setShowPlayMenu(false) }}
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
                    if (!hasCard(entry.name)) { play('addToDeck'); showAddedToDeck(1) }
                    addCard(entry)
                  }}
                  className="flex-1 flex items-center gap-2 px-3 py-2 text-sm text-left"
                >
                  <span className="h-3.5 w-3.5 shrink-0 flex items-center justify-center text-xs">
                    {hasCard(entry.name) ? '✓' : '+'}
                  </span>
                  <span className="flex-1">{hasCard(entry.name) ? 'Added to Flashcards' : 'Add to Flashcards'}</span>
                  {hasCard(entry.name) && cards.length > 0 && (
                    <span className="shrink-0 text-[10px] font-semibold px-1.5 py-0.5 rounded-full bg-muted text-muted-foreground tabular-nums">
                      {cards.length}
                    </span>
                  )}
                </button>
                {hasCard(entry.name) && (
                  <Link
                    to={`/flashcards?highlight=${encodeURIComponent(entry.name)}`}
                    data-tour="view-flashcards"
                    onClick={() => { setShowPlayMenu(false); closePopup() }}
                    className="text-xs text-primary hover:underline pr-3 shrink-0"
                  >
                    view
                  </Link>
                )}
              </div>
              {RESEARCH_TAB_ENABLED && user && <AddToProjectMenuItem item={entry} onNavigate={() => setShowPlayMenu(false)} />}
              {/* Listen is both here and in the header cluster: the header
                  button is the quick toggle (and the only way in and out of it
                  in focus mode), this row is where someone browsing the menu
                  discovers the mode exists. */}
              <button
                type="button"
                onClick={() => { setListenView(!listenView); if (!listenView) setMathView(false); setShowPlayMenu(false) }}
                className="w-full flex items-center gap-2 px-3 py-2 text-sm hover:bg-accent transition-colors"
              >
                <Headphones className="h-3.5 w-3.5 shrink-0" />
                {listenView ? 'Exit Listen' : 'Listen'}
              </button>
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
                {masteryState && <MasteryBadge state={masteryState} compact />}
              </button>
              {/* Fact Check — what has been checked about this page, against
                  which source, and everything anyone has since said about it.
                  It lives in the menu rather than beside the title because a
                  page's own claims are what a reader challenges, and this is
                  the row that lets them. An exam page carries none of its own —
                  it is a syllabus outline — so it has no Fact Check. */}
              {FACT_CHECK_UI_ENABLED && content !== null && entry.kind !== 'exam' && (
                <button
                  type="button"
                  onClick={() => { setShowFactCheck(true); setShowPlayMenu(false) }}
                  className="w-full flex items-center gap-2 px-3 py-2 text-sm hover:bg-accent transition-colors"
                >
                  <CheckCheck className="h-3.5 w-3.5 shrink-0" />
                  <span className="flex-1 text-left whitespace-nowrap">Fact Check</span>
                  <span
                    className={`shrink-0 whitespace-nowrap text-[10px] font-semibold px-1.5 py-0.5 rounded-full ${FACT_CHECK_TONE_CLASSES[factCheck.tone]}`}
                  >
                    {factCheck.short}
                  </span>
                </button>
              )}
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
        {/* Listen toggle — a permanent control, sitting left of the expand
            toggle rather than only inside the action menu, since it's a view
            switch like focus mode, not an action. (It's mirrored in the menu
            too, for discoverability.) Survives focus mode for the same reason
            that toggle does: Listen is most useful with the page full-screen,
            so there has to be a way in and out of it there. Deliberately *not*
            behind the collect lock — hearing the page read is a way of reading
            it, so it stays available on an uncollected concept. */}
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
        {trailing}
        {!focusMode && (
          <button
            type="button"
            onClick={onClose}
            data-sound="none"
            className="inline-flex items-center justify-center h-10 w-10 rounded-lg shrink-0 text-muted-foreground hover:text-foreground hover:bg-accent transition-colors"
            title="Close page"
            aria-label={`Close ${entry.name}`}
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
        onScroll={e => rememberPageScroll(entry, e.currentTarget.scrollTop)}
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
            Couldn't load <span className="font-medium">{entry.name}</span>.
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
              {resourceMeta && (
                <ResourceMetaCard
                  meta={resourceMeta}
                  compact
                  // The reader opens over this page, and in focus mode this
                  // page *is* the screen — so it has no chrome to keep clear of.
                  hostFullScreen={focusMode}
                  onViewerOpenChange={onReaderOpenChange}
                />
              )}
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
                  // Stay inside the popup, and keep this page: the target opens
                  // as a new panel stacked on top of it.
                  onOpenLink(ref)
                  return true
                }}
              />
            </>
          )
        )}
      </div>

      {showQuestionsModal && (
        <ConceptQuestionsModal
          conceptName={entry.name}
          onClose={() => setShowQuestionsModal(false)}
        />
      )}
      {showLearningProgress && (
        <LearningProgressModal
          conceptName={entry.name}
          onClose={() => setShowLearningProgress(false)}
        />
      )}
      <FactCheckDialog
        open={showFactCheck}
        onClose={() => setShowFactCheck(false)}
        verification={verification}
        contentPath={sourcePath}
        contentName={entry.name}
      />
      {showGallery && (
        <ImageGalleryModal
          images={images}
          initialIndex={galleryIndex}
          placement={focusMode ? 'popup-focus' : 'popup'}
          onClose={() => setShowGallery(false)}
        />
      )}
    </>
  )
}
