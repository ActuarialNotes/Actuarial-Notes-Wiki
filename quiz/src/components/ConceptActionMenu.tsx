import { useEffect, useLayoutEffect, useMemo, useState, type ReactNode, type RefObject } from 'react'
import { createPortal } from 'react-dom'
import { Link, useLocation, useNavigate } from 'react-router-dom'
import { BookOpen, CheckCheck, Play, Sparkles, TrendingUp } from 'lucide-react'
import { fetchAllQuestions, fetchWikiFile } from '@/lib/github'
import { entryRefToRepoPath, wikiRoute, type WikiEntryRef } from '@/lib/wikiRoutes'
import { filterQuestions, parseAllQuestions } from '@/lib/parser'
import { useFlashcards } from '@/hooks/useFlashcards'
import { useCollect } from '@/hooks/useCollect'
import { useCollectedCards } from '@/hooks/useCollectedCards'
import { useConceptMastery } from '@/hooks/useConceptMastery'
import { useConceptPopup } from '@/hooks/useConceptPopup'
import { useAuth } from '@/hooks/useAuth'
import { showAddedToDeck } from '@/hooks/useToast'
import { playSound } from '@/lib/soundEngine'
import { decayIfStale, type MasteryState } from '@/lib/mastery'
import { buildMasteryLookup } from '@/lib/conceptMatch'
import { findKeystone, keystoneProgress } from '@/lib/keystone'
import { KeystoneSummary } from '@/components/KeystoneName'
import { MasteryBadge } from '@/components/MasteryBadge'
import { FactCheckDialog } from '@/components/FactCheckBadge'
import { FACT_CHECK_TONE_CLASSES } from '@/lib/factCheckTone'
import { factCheckBadge, parseVerification } from '@/lib/verification'
import { AddToProjectMenuItem } from '@/components/wiki/AddToProjectMenuItem'
import { ConceptQuestionsModal } from '@/components/wiki/ConceptQuestionsModal'
import { LearningProgressModal } from '@/components/wiki/LearningProgressModal'
import { FACT_CHECK_UI_ENABLED, RESEARCH_TAB_ENABLED } from '@/lib/featureFlags'

/**
 * The concept action menu — the one menu a concept's actions live on, wherever
 * the concept is being read: the popup's stacked page and every flashcard
 * surface (the deck's tiles, front and back, and the study card) open *this*
 * component, so the rows, their order and their wording can't drift apart.
 *
 * What it holds is what can be done with a concept: quiz it, read it in the
 * study guide, keep it as a card, collect it, look at how it's being learned,
 * and see what has been fact-checked about it. Viewing modes are deliberately
 * not here — Listen is the popup header's own toggle and the flashcard view
 * modes are the deck's dropdown, so the menu stays a list of actions.
 *
 * Everything it needs it reads for itself (mastery, collection, question
 * count, the page's `verification:` block), so a host only has to say where
 * the menu hangs and whether it is open. Rows that belong to one surface only
 * — Study and Remove, which are about a *card* rather than a concept — are
 * passed in as `leading` / `trailing`.
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
   * `portal` renders into <body> with fixed positioning, for a host inside a
   * stacking context the menu has to escape. `anchored` renders absolutely
   * under the trigger, so the menu travels with a host that scrolls or drags;
   * that host must be `relative`.
   */
  placement?: 'portal' | 'anchored'
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
}

export function ConceptActionMenu({
  entry,
  open,
  onClose,
  anchorRef,
  placement = 'portal',
  content,
  stopPropagation = false,
  leading,
  trailing,
}: ConceptActionMenuProps) {
  const [showQuestionsModal, setShowQuestionsModal] = useState(false)
  const [showLearningProgress, setShowLearningProgress] = useState(false)
  const [showFactCheck, setShowFactCheck] = useState(false)
  const [alignRight, setAlignRight] = useState(false)
  const [anchorRect, setAnchorRect] = useState<DOMRect | null>(null)
  const [questionCount, setQuestionCount] = useState<number | null>(null)
  const [fetchedContent, setFetchedContent] = useState<string | null>(null)

  const location = useLocation()
  const routerNavigate = useNavigate()
  const { user } = useAuth()
  const { addCard, hasCard, cards } = useFlashcards()
  const openCollect = useCollect(s => s.open)
  const collectedCards = useCollectedCards(s => s.cards)
  const closePopup = useConceptPopup(s => s.close)
  const { records: masteryRecords } = useConceptMastery()

  const isOnWiki = location.pathname.startsWith('/wiki/')
  const markdown = content ?? fetchedContent

  // Anchor the menu to whatever opened it, measured as it opens. The trigger
  // sits in non-scrolling chrome on every host that portals, so the rect holds
  // for the life of the menu; an `anchored` menu only needs the side to flip to.
  useLayoutEffect(() => {
    if (!open) return
    const el = anchorRef.current
    if (!el) return
    const rect = el.getBoundingClientRect()
    setAnchorRect(rect)
    setAlignRight(window.innerWidth - rect.right < MENU_WIDTH_PX)
  }, [open, anchorRef])

  // Close on a press outside. The "Add to Project" submenu and (in portal
  // placement) the menu itself live in their own portals, and the trigger
  // toggles the menu on click — all three would otherwise read as "outside".
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

  // How many questions are tagged to this concept (the Start Quiz count).
  // fetchAllQuestions is cached, so this costs one parse per concept.
  useEffect(() => {
    if (!open || entry.kind !== 'concept') return
    let cancelled = false
    fetchAllQuestions()
      .then(rawFiles => {
        if (cancelled) return
        const all = parseAllQuestions(rawFiles)
        setQuestionCount(filterQuestions(all, { concept: entry.name }).length)
      })
      .catch(() => {})
    return () => { cancelled = true }
  }, [open, entry.kind, entry.name])

  const masteryState = useMemo<MasteryState | null>(() => {
    const lower = entry.name.toLowerCase()
    const record = masteryRecords.find(r => r.concept_slug.toLowerCase() === lower)
    if (!record) return null
    return decayIfStale(record, new Date()).state
  }, [masteryRecords, entry.name])

  // Keystone roll-up for the exam this concept anchors — the explainer the
  // concept's name used to open, now the first block of the menu.
  const keystoneMatch = useMemo(() => findKeystone(entry.name), [entry.name])
  const keystoneStats = useMemo(() => {
    if (!keystoneMatch) return undefined
    return keystoneProgress(keystoneMatch.examId, buildMasteryLookup(masteryRecords), new Date())
  }, [masteryRecords, keystoneMatch])

  const verification = useMemo(() => (markdown ? parseVerification(markdown) : null), [markdown])
  const factCheck = useMemo(() => factCheckBadge(verification), [verification])

  // A concept past New has necessarily been collected already (grandfathered
  // users included), so treat it as collected even with no record in the store.
  const inCollectedStore = collectedCards.some(c => c.name.toLowerCase() === entry.name.toLowerCase())
  const collected = inCollectedStore || !(masteryState === null || masteryState === 'new')

  const menuClass = placement === 'portal'
    ? `fixed ${MENU_WIDTH_CLASS} rounded-md bg-popover text-popover-foreground shadow-md z-[70] py-1 max-h-[min(28rem,80vh)] overflow-y-auto`
    : `absolute top-full mt-1 ${MENU_WIDTH_CLASS} rounded-md bg-popover text-popover-foreground shadow-md z-50 py-1 max-h-[min(28rem,80vh)] overflow-y-auto ${alignRight ? 'right-0' : 'left-0'}`

  const menuStyle = placement === 'portal' && anchorRect
    ? {
        top: anchorRect.bottom + 4,
        ...(alignRight
          ? { right: Math.max(8, window.innerWidth - anchorRect.right) }
          : { left: anchorRect.left }),
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
      {/* What this concept *is*, before what can be done with it. */}
      {keystoneMatch && (
        <div className="px-3 pt-1.5 pb-2.5 mb-1 border-b border-border">
          <KeystoneSummary examLabel={keystoneMatch.examLabel} progress={keystoneStats} compact />
        </div>
      )}
      {leading}
      <button
        type="button"
        onClick={() => { setShowQuestionsModal(true); onClose() }}
        className="w-full flex items-center gap-2 px-3 py-2 text-sm hover:bg-accent transition-colors"
      >
        <Play className="h-3.5 w-3.5 shrink-0" />
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
            if (!hasCard(entry.name)) { playSound('addToDeck'); showAddedToDeck(1) }
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
      {/* Collect. Passing the check is what lets a concept's mastery leave New
          (`applyAnswer`'s `collected` flag), so it can't be left unreachable
          from the concept it is about. */}
      {entry.kind === 'concept' && !collected && (
        <button
          type="button"
          data-tour="collect-card"
          data-sound="actions"
          onClick={() => { openCollect(entry); onClose() }}
          className="w-full flex items-center gap-2 px-3 py-2 text-sm hover:bg-accent transition-colors"
        >
          <Sparkles className="h-3.5 w-3.5 shrink-0" />
          <span className="flex-1 text-left">Collect Flashcard</span>
        </button>
      )}
      <button
        type="button"
        onClick={() => { setShowLearningProgress(true); onClose() }}
        className="w-full flex items-center gap-2 px-3 py-2 text-sm hover:bg-accent transition-colors"
      >
        <TrendingUp className="h-3.5 w-3.5 shrink-0" />
        <span className="flex-1 text-left whitespace-nowrap">Learning Progress</span>
        {/* The concept's level reads on the row that opens the graph explaining
            how it got there. No record yet is New. */}
        {entry.kind === 'concept' && <MasteryBadge state={masteryState ?? 'new'} compact />}
      </button>
      {/* Fact Check — what has been checked about this page, against which
          source, and everything anyone has since said about it. An exam page
          carries none of its own — it is a syllabus outline. */}
      {FACT_CHECK_UI_ENABLED && markdown !== null && entry.kind !== 'exam' && (
        <button
          type="button"
          onClick={() => { setShowFactCheck(true); onClose() }}
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
      {trailing}
    </div>
  )

  return (
    <>
      {open && (placement === 'portal'
        ? (anchorRect ? createPortal(menu, document.body) : null)
        : menu)}
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

/** The menu's width — as a class, and in pixels for the flip-to-left test. */
const MENU_WIDTH_CLASS = 'w-56'
const MENU_WIDTH_PX = 224

/**
 * The row every host uses for a menu item it adds through `leading` /
 * `trailing`, so an added row can't drift from the shared ones.
 */
export const ACTION_MENU_ROW_CLASS =
  'w-full flex items-center gap-2 px-3 py-2 text-sm hover:bg-accent transition-colors'
