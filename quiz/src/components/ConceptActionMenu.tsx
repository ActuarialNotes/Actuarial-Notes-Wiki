import { useCallback, useEffect, useLayoutEffect, useMemo, useState, type ReactNode, type RefObject } from 'react'
import { Link, useLocation, useNavigate } from 'react-router-dom'
import { BookOpen, CheckCheck, Play, TrendingUp } from 'lucide-react'
import { fetchAllQuestions, fetchWikiFile } from '@/lib/github'
import { entryRefToRepoPath, wikiRoute, type WikiEntryRef } from '@/lib/wikiRoutes'
import { filterQuestions, parseAllQuestions } from '@/lib/parser'
import { useFlashcards } from '@/hooks/useFlashcards'
import { useConceptMastery } from '@/hooks/useConceptMastery'
import { useConceptPopup } from '@/hooks/useConceptPopup'
import { useAuth } from '@/hooks/useAuth'
import { useWikiSyllabus } from '@/hooks/useWikiSyllabus'
import { showAddedToDeck } from '@/hooks/useToast'
import { playSound } from '@/lib/soundEngine'
import { decayIfStale, type MasteryState } from '@/lib/mastery'
import { MasteryBadge } from '@/components/MasteryBadge'
import { LevelSquare } from '@/components/LevelSquare'
import { MASTERY_LABEL } from '@/lib/masteryBadge'
import { INK_MENU, inkMenuItem } from '@/components/ui/ink'
import { FactCheckDialog } from '@/components/FactCheckBadge'
import { FACT_CHECK_TONE_CLASSES } from '@/lib/factCheckTone'
import { factCheckBadge, parseVerification } from '@/lib/verification'
import { placeMenu, type MenuPlacement } from '@/lib/menuPlacement'
import { OverlayPortal } from '@/components/ui/OverlayPortal'
import { AddToProjectMenuItem } from '@/components/wiki/AddToProjectMenuItem'
import { ConceptQuestionsModal } from '@/components/wiki/ConceptQuestionsModal'
import { LearningProgressModal } from '@/components/wiki/LearningProgressModal'
import { FACT_CHECK_UI_ENABLED, RESEARCH_TAB_ENABLED } from '@/lib/featureFlags'
import { studyGuidesForResource } from '@/lib/examMenu'

/**
 * The concept action menu — the one menu a concept's actions live on, wherever
 * the concept is being read: the popup's stacked page and every flashcard
 * surface (the deck's tiles, front and back, and the study card) open *this*
 * component, so the rows, their order and their wording can't drift apart.
 *
 * What it holds is what can be done with a concept: quiz it, read it in the
 * study guide, keep it as a card, look at how it's being learned,
 * and see what has been fact-checked about it. Viewing modes are deliberately
 * not here — Listen is the popup header's own toggle and the flashcard view
 * modes are the deck's dropdown, so the menu stays a list of actions.
 *
 * Everything it needs it reads for itself (mastery, question
 * count, the page's `verification:` block), so a host only has to say which
 * control the menu hangs off and whether it is open. Rows that belong to one
 * surface only — Study and Remove, which are about a *card* rather than a
 * concept — are passed in as `leading` / `trailing`.
 *
 * It always renders into <body>, placed against its trigger by `placeMenu`.
 * Hosting it inside the surface that opened it is what used to hide it: a
 * flashcard tile's menu is inside the gallery's own `z-40` layer, under the
 * mobile header, and inside a scroller that clips it. From the body it answers to
 * the viewport alone — which is the one promise this menu has to keep.
 *
 * Behind a concept's "more" button (`components/learn/ConceptMoreButton.tsx`,
 * on the concept page and in the reader) it is cut to `rows="more"`: Practice
 * is those surfaces' foot and the level their own button, so the menu keeps
 * Add to Flashcards and Fact Check, with the surface's view rows above them.
 * An exam page has no menu: its title is text (docs/redesign-spec.md §7.1).
 *
 * It stays mounted while closed: the modals it opens (questions, learning
 * progress, fact check) outlive the menu that opened them.
 */
export interface ConceptActionMenuProps {
  entry: WikiEntryRef
  open: boolean
  onClose: () => void
  /** The control that toggles the menu — the menu is anchored to its box. */
  anchorRef: RefObject<HTMLElement | null>
  /**
   * The page's markdown, when the host already has it — what the Fact Check
   * row reads. Omitted, the menu fetches it itself when first opened.
   */
  content?: string | null
  /** Stops pointer/click events reaching a draggable or clickable host card. */
  stopPropagation?: boolean
  /** Rows above the shared block (the flashcard tile's Study). */
  leading?: ReactNode
  /** Rows below the shared block (the flashcard tile's Remove). */
  trailing?: ReactNode
  /**
   * `more`: the menu behind a concept's "more" button (docs/redesign-spec.md
   * §7.2). Practice is the page's foot and the level its own button, so the
   * menu keeps Add to Flashcards and Fact Check, with the host's rows around them.
   */
  rows?: 'all' | 'more'
  /**
   * In the `more` form, lead the shared rows with the reader's level, opening
   * Learning Progress — for a host whose header has no level button of its own
   * (the concept popup).
   */
  levelRow?: boolean
}

export function ConceptActionMenu({
  entry,
  open,
  onClose,
  anchorRef,
  content,
  stopPropagation = false,
  leading,
  trailing,
  rows = 'all',
  levelRow = false,
}: ConceptActionMenuProps) {
  const more = rows === 'more'
  const [showQuestionsModal, setShowQuestionsModal] = useState(false)
  const [showLearningProgress, setShowLearningProgress] = useState(false)
  const [showFactCheck, setShowFactCheck] = useState(false)
  const [box, setBox] = useState<MenuPlacement | null>(null)
  const [questionCount, setQuestionCount] = useState<number | null>(null)
  const [fetchedContent, setFetchedContent] = useState<string | null>(null)

  const location = useLocation()
  const routerNavigate = useNavigate()
  const { user } = useAuth()
  const { addCard, hasCard, cards } = useFlashcards()
  const closePopup = useConceptPopup(s => s.close)
  const { records: masteryRecords } = useConceptMastery()
  const { syllabi } = useWikiSyllabus()

  const isOnWiki = location.pathname.startsWith('/wiki/')
  // Where a resource opens in its study guide: the exams whose Source Material
  // lists it. The one already open wins, so the row never moves a reader between
  // guides; none greys the row out.
  const resourceGuide = useMemo(() => {
    if (entry.kind !== 'resource') return null
    const guides = studyGuidesForResource(syllabi, entry.name)
    const routes = guides.map(s => wikiRoute({ kind: 'exam', name: s.fileName! }))
    const open = routes.indexOf(location.pathname)
    if (routes.length === 0) return null
    // Opened at the reading, not the top of the guide (`?resource=`, WikiExam).
    return `${routes[open >= 0 ? open : 0]!}?resource=${encodeURIComponent(entry.name)}`
  }, [syllabi, entry.kind, entry.name, location.pathname])
  const markdown = content ?? fetchedContent
  // The exam menu leads with a readiness bar and a countdown, so it is given a
  // little more width than the concept menu's list of short rows.
  const menuWidthPx = MENU_WIDTH_PX

  // Anchor the menu to whatever opened it. `placeMenu` owns the one rule that
  // matters here — the menu is never off screen — so the trigger is only a
  // preference: a control near an edge gets the menu shifted back inside, and
  // one with no room below gets it opened upwards.
  const measure = useCallback(() => {
    const el = anchorRef.current
    if (!el) return
    const rect = el.getBoundingClientRect()
    const next = placeMenu(
      rect,
      { width: window.innerWidth, height: window.innerHeight },
      { width: menuWidthPx, maxHeight: MENU_MAX_HEIGHT_PX },
    )
    // A scroll fires this on every frame; re-render only when it actually moved.
    setBox(prev => (prev && samePlacement(prev, next) ? prev : next))
  }, [anchorRef, menuWidthPx])

  useLayoutEffect(() => {
    if (!open) return
    measure()
  }, [open, measure])

  // Re-place it if the trigger moves under it: a rotation, a phone keyboard,
  // or a scroll that carries the trigger up the screen. Without this the menu
  // keeps a position that was only correct at the moment it opened.
  useEffect(() => {
    if (!open) return
    const onViewportChange = () => measure()
    window.addEventListener('resize', onViewportChange)
    window.addEventListener('scroll', onViewportChange, true)
    return () => {
      window.removeEventListener('resize', onViewportChange)
      window.removeEventListener('scroll', onViewportChange, true)
    }
  }, [open, measure])

  // Close on a press outside. The menu and the "Add to Project" submenu each
  // live in their own portal, and the trigger toggles the menu on click — all
  // three would otherwise read as "outside".
  useEffect(() => {
    if (!open) return
    function onPointerDown(e: PointerEvent) {
      const target = e.target as HTMLElement | null
      if (target?.closest('[data-add-to-project-menu]')) return
      if (target?.closest('[data-play-menu]')) return
      if (target?.closest('[data-play-menu-trigger]')) return
      onClose()
    }
    document.addEventListener('pointerdown', onPointerDown)
    return () => document.removeEventListener('pointerdown', onPointerDown)
  }, [open, onClose])

  // The page's own markdown, for Fact Check — fetched only if the host has
  // none, and only once the menu has actually been opened.
  useEffect(() => {
    if (!open || content != null || fetchedContent != null) return
    let cancelled = false
    fetchWikiFile(entryRefToRepoPath(entry))
      .then(raw => { if (!cancelled) setFetchedContent(raw) })
      .catch(() => {})
    return () => { cancelled = true }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [open, content, fetchedContent, entry.kind, entry.name])

  // How many questions are tagged to this concept (the Start Quiz count). fetchAllQuestions is cached, so this costs one
  // parse per entry.
  useEffect(() => {
    if (!open || more || entry.kind !== 'concept') return
    let cancelled = false
    fetchAllQuestions()
      .then(rawFiles => {
        if (cancelled) return
        const all = parseAllQuestions(rawFiles)
        setQuestionCount(filterQuestions(all, { concept: entry.name }).length)
      })
      .catch(() => {})
    return () => { cancelled = true }
  }, [open, more, entry.kind, entry.name])

  const masteryState = useMemo<MasteryState | null>(() => {
    const lower = entry.name.toLowerCase()
    const record = masteryRecords.find(r => r.concept_slug.toLowerCase() === lower)
    if (!record) return null
    return decayIfStale(record, new Date()).state
  }, [masteryRecords, entry.name])

  const verification = useMemo(() => (markdown ? parseVerification(markdown) : null), [markdown])
  const factCheck = useMemo(() => factCheckBadge(verification), [verification])

  const menuClass = `fixed z-[70] overflow-y-auto ${MENU_WIDTH_CLASS} ${INK_MENU}`

  // The height comes from the room measured, so a long menu scrolls inside the
  // viewport instead of continuing past its edge.
  const menuStyle = box
    ? {
        left: box.left,
        ...(box.top !== null ? { top: box.top } : { bottom: box.bottom ?? 0 }),
        maxHeight: box.maxHeight,
      }
    : undefined

  const menu = (
    <div
      data-play-menu
      className={menuClass}
      style={menuStyle}
      onPointerDown={stopPropagation ? e => e.stopPropagation() : undefined}
      onClick={stopPropagation ? e => e.stopPropagation() : undefined}
    >
      {more && levelRow && entry.kind === 'concept' && (
        <button
          type="button"
          role="menuitem"
          data-testid="concept-level"
          aria-label={`${MASTERY_LABEL[masteryState ?? 'new']}. Open Learning Progress`}
          onClick={() => { setShowLearningProgress(true); onClose() }}
          className={ACTION_MENU_ROW_CLASS}
        >
          <span className="flex w-4 shrink-0 justify-center"><LevelSquare state={masteryState ?? 'new'} size="sm" decorative /></span>
          <span className="flex-1 whitespace-nowrap text-left">{MASTERY_LABEL[masteryState ?? 'new']}</span>
        </button>
      )}
      {leading}
      <>
{!more && (<>
          <button
            type="button"
            onClick={() => { setShowQuestionsModal(true); onClose() }}
            className={ACTION_MENU_ROW_CLASS}
          >
            <Play className="h-4 w-4 shrink-0" />
            <span className="flex-1 text-left">Start Quiz</span>
            {questionCount !== null && questionCount > 0 && (
              <span className="shrink-0 text-[10px] font-semibold px-1.5 py-0.5 rounded-full bg-primary/10 text-primary tabular-nums">
                {questionCount}
              </span>
            )}
          </button>
          {entry.kind === 'concept' && (
            <button
              type="button"
              disabled={isOnWiki}
              onClick={() => { routerNavigate(wikiRoute(entry)); onClose() }}
              className={`${ACTION_MENU_ROW_CLASS} disabled:opacity-40 disabled:cursor-not-allowed disabled:hover:bg-transparent`}
            >
              <BookOpen className="h-4 w-4 shrink-0" />
              Open in Study Guide
            </button>
          )}
          {entry.kind === 'resource' && (
            <button
              type="button"
              disabled={!resourceGuide}
              title={resourceGuide ? undefined : 'Not a reading in any study guide'}
              onClick={() => {
                if (!resourceGuide) return
                onClose()
                closePopup()
                routerNavigate(resourceGuide)
              }}
              className={`${ACTION_MENU_ROW_CLASS} disabled:opacity-40 disabled:cursor-not-allowed disabled:hover:bg-transparent`}
            >
              <BookOpen className="h-4 w-4 shrink-0" />
              Open in Study Guide
            </button>
          )}
</>)}
          <div className="flex items-center rounded-lg transition-colors hover:bg-muted">
            <button
              type="button"
              data-tour="add-flashcard"
              data-sound="none"
              onClick={() => {
                if (!hasCard(entry.name)) { playSound('addToDeck'); showAddedToDeck(1) }
                addCard(entry)
              }}
              className="flex min-h-10 flex-1 items-center gap-2.5 rounded-lg px-3 py-2 text-left text-[15px] text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-ring"
            >
              <span className="flex h-4 w-4 shrink-0 items-center justify-center text-sm">
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
                // Leaving the wiki takes the popup's stack with it; on a surface
                // with no popup open this is a no-op.
                onClick={() => { onClose(); closePopup() }}
                className="text-xs text-primary hover:underline pr-3 shrink-0"
              >
                view
              </Link>
            )}
          </div>
          {RESEARCH_TAB_ENABLED && user && <AddToProjectMenuItem item={entry} onNavigate={onClose} />}
{!more && (
          <button
            type="button"
            onClick={() => { setShowLearningProgress(true); onClose() }}
            className={ACTION_MENU_ROW_CLASS}
          >
            <TrendingUp className="h-4 w-4 shrink-0" />
            <span className="flex-1 text-left whitespace-nowrap">Learning Progress</span>
            {/* The concept's level reads on the row that opens the graph explaining
                how it got there. No record yet is New. */}
            {entry.kind === 'concept' && <MasteryBadge state={masteryState ?? 'new'} compact />}
          </button>
)}
      </>
      {/* Fact Check — what has been checked about this page, against which
          source, and everything anyone has since said about it. */}
      {FACT_CHECK_UI_ENABLED && markdown !== null && (
        <button
          type="button"
          onClick={() => { setShowFactCheck(true); onClose() }}
          className={ACTION_MENU_ROW_CLASS}
        >
          <CheckCheck className="h-4 w-4 shrink-0" />
          <span className="flex-1 text-left whitespace-nowrap">Fact Check</span>
          <span
            className={`shrink-0 whitespace-nowrap text-[10px] font-semibold px-1.5 py-0.5 rounded-full ${FACT_CHECK_TONE_CLASSES[factCheck.tone]}`}
          >
            {factCheck.short}
          </span>
        </button>
      )}
      {trailing}
    </div>
  )

  return (
    <>
      {open && box && <OverlayPortal>{menu}</OverlayPortal>}
      {showQuestionsModal && (
        <ConceptQuestionsModal conceptName={entry.name} onClose={() => setShowQuestionsModal(false)} />
      )}
      {showLearningProgress && (
        <LearningProgressModal conceptName={entry.name} onClose={() => setShowLearningProgress(false)} />
      )}
      <FactCheckDialog
        open={showFactCheck}
        onClose={() => setShowFactCheck(false)}
        verification={verification}
        contentPath={entryRefToRepoPath(entry)}
        contentName={entry.name}
      />
    </>
  )
}

/** The menu's width — as a class, and in pixels for the placement maths. */
const MENU_WIDTH_CLASS = 'w-56'
const MENU_WIDTH_PX = 224

/** How tall it grows given the room; past this it scrolls. */
const MENU_MAX_HEIGHT_PX = 448

function samePlacement(a: MenuPlacement, b: MenuPlacement): boolean {
  return a.left === b.left
    && a.top === b.top
    && a.bottom === b.bottom
    && a.maxHeight === b.maxHeight
    && a.above === b.above
}

/**
 * The row every host uses for a menu item it adds through `leading` /
 * `trailing`, so an added row can't drift from the shared ones.
 */
export const ACTION_MENU_ROW_CLASS = inkMenuItem(false, 'text-foreground')
