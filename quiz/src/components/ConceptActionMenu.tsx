import { useCallback, useEffect, useLayoutEffect, useMemo, useState, type ReactNode, type RefObject } from 'react'
import { Link, useLocation, useNavigate } from 'react-router-dom'
import { BookOpen, CalendarCheck, CalendarDays, CheckCheck, Lock, Play, TrendingUp } from 'lucide-react'
import { fetchAllQuestions, fetchWikiFile } from '@/lib/github'
import { entryRefToRepoPath, examDisplayName, wikiRoute, type WikiEntryRef } from '@/lib/wikiRoutes'
import { filterQuestions, parseAllQuestions } from '@/lib/parser'
import { useFlashcards } from '@/hooks/useFlashcards'
import { useConceptMastery } from '@/hooks/useConceptMastery'
import { useConceptPopup } from '@/hooks/useConceptPopup'
import { useAuth } from '@/hooks/useAuth'
import { useSubscription } from '@/hooks/useSubscription'
import { useWikiSyllabus } from '@/hooks/useWikiSyllabus'
import { useExamsPopout } from '@/hooks/useExamsPopout'
import { useExamProgress } from '@/contexts/ExamProgressContext'
import { showAddedToDeck } from '@/hooks/useToast'
import { playSound } from '@/lib/soundEngine'
import { decayIfStale, type ConceptMasteryRecord, type MasteryState } from '@/lib/mastery'
import { buildMasteryLookup } from '@/lib/conceptMatch'
import { findKeystone, keystoneProgress } from '@/lib/keystone'
import { KeystoneSummary } from '@/components/KeystoneName'
import { MasteryBadge } from '@/components/MasteryBadge'
import { ProBadge } from '@/components/ProBadge'
import { ReadinessBar } from '@/components/ReadinessBar'
import { FactCheckDialog } from '@/components/FactCheckBadge'
import { FACT_CHECK_TONE_CLASSES } from '@/lib/factCheckTone'
import { factCheckBadge, parseVerification } from '@/lib/verification'
import { placeMenu, type MenuPlacement } from '@/lib/menuPlacement'
import { OverlayPortal } from '@/components/ui/OverlayPortal'
import { AddToProjectMenuItem } from '@/components/wiki/AddToProjectMenuItem'
import { ConceptQuestionsModal } from '@/components/wiki/ConceptQuestionsModal'
import { LearningProgressModal } from '@/components/wiki/LearningProgressModal'
import { FACT_CHECK_UI_ENABLED, RESEARCH_TAB_ENABLED } from '@/lib/featureFlags'
import { computeExamReadiness } from '@/lib/readiness'
import { todayISO } from '@/lib/studyPlan'
import { getSittingsForExam } from '@/data/examSittings'
import { isExamInDevelopment } from '@/lib/examStatus'
import {
  examCountdown,
  examPageIdFromFile,
  examProgressKeyFromFile,
  todaysPlanConcepts,
  todaysPlanRowState,
} from '@/lib/examMenu'

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
 * An **exam** gets its own menu (the study guide's title opens it). An exam
 * isn't a concept — nothing about it is quizzed, kept as a card or levelled up —
 * so those rows give way to where the reader stands on it: the readiness bar
 * and how long is left before it is sat (`ExamMenuSummary`), and today's study
 * plan for it, locked for a reader who isn't Pro (`TodaysPlanRow`). Fact Check
 * is the one row the two menus share. The facts are `lib/examMenu.ts`.
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
   * Exam entries only: open today's plan where the reader already is — the
   * exam page passes its own walk of the plan, so the concepts open in the
   * study guide's popup. Without it the row goes to the Dashboard, which builds
   * today's plan and opens it there.
   */
  onOpenStudyPlan?: () => void
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
  onOpenStudyPlan,
}: ConceptActionMenuProps) {
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

  const isOnWiki = location.pathname.startsWith('/wiki/')
  const isExam = entry.kind === 'exam'
  const markdown = content ?? fetchedContent
  // The exam menu leads with a readiness bar and a countdown, so it is given a
  // little more width than the concept menu's list of short rows.
  const menuWidthPx = isExam ? EXAM_MENU_WIDTH_PX : MENU_WIDTH_PX

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

  const menuClass = `fixed ${isExam ? EXAM_MENU_WIDTH_CLASS : MENU_WIDTH_CLASS} rounded-md bg-popover text-popover-foreground shadow-md z-[70] py-1 overflow-y-auto`

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
      {/* What this concept *is*, before what can be done with it — or, for an
          exam, where the reader stands on it. */}
      {isExam ? (
        <ExamMenuSummary entry={entry} masteryRecords={masteryRecords} />
      ) : keystoneMatch && (
        <div className="px-3 pt-1.5 pb-2.5 mb-1 border-b border-border">
          <KeystoneSummary examLabel={keystoneMatch.examLabel} progress={keystoneStats} compact />
        </div>
      )}
      {leading}
      {isExam ? (
        <TodaysPlanRow entry={entry} onOpenStudyPlan={onOpenStudyPlan} onClose={onClose} />
      ) : (
        <>
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
        </>
      )}
      {/* Fact Check — what has been checked about this page, against which
          source, and everything anyone has since said about it. An exam page
          has one too: its syllabus is transcribed from the examining body's,
          and the record says what it was checked against. */}
      {FACT_CHECK_UI_ENABLED && markdown !== null && (
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
        // An exam is named the way its page titles it — "Exam P-1", not the
        // file's "Exam P-1 (SOA)".
        contentName={isExam ? examDisplayName(entry.name) : entry.name}
      />
    </>
  )
}

/** The menu's width — as a class, and in pixels for the placement maths. */
const MENU_WIDTH_CLASS = 'w-56'
const MENU_WIDTH_PX = 224
const EXAM_MENU_WIDTH_CLASS = 'w-64'
const EXAM_MENU_WIDTH_PX = 256

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
export const ACTION_MENU_ROW_CLASS =
  'w-full flex items-center gap-2 px-3 py-2 text-sm hover:bg-accent transition-colors'

/**
 * The exam menu's head: the readiness bar — `computeExamReadiness`, the one
 * readiness number, the same score the Study Guides list prints beside an exam
 * in progress — and
 * under it how long is left before the exam is sat. The countdown runs to the
 * reader's own exam date, or without one to the next published sitting (the
 * one the study guide's version button names); with neither there is none.
 */
function ExamMenuSummary({
  entry,
  masteryRecords,
}: {
  entry: WikiEntryRef
  masteryRecords: ConceptMasteryRecord[]
}) {
  const { user } = useAuth()
  const { progress, targetDates } = useExamProgress()
  const { syllabi } = useWikiSyllabus()
  const progressKey = useMemo(() => examProgressKeyFromFile(entry.name), [entry.name])
  const tracked = !!user && progress[progressKey] === 'in_progress'
  const examDate = tracked ? targetDates[progressKey] : null

  const readiness = useMemo(() => {
    const syllabus = syllabi.find(s => s.fileName === entry.name)
    if (!syllabus) return null
    const records = masteryRecords.filter(r => r.exam_id === progressKey)
    return computeExamReadiness(syllabus, records, new Date(), progressKey)
  }, [syllabi, entry.name, masteryRecords, progressKey])

  const countdown = useMemo(
    () => examCountdown(examDate, getSittingsForExam(progressKey), todayISO()),
    [examDate, progressKey],
  )

  if (!readiness && !countdown) return null
  const whose = countdown?.source === 'exam-date' ? 'Your exam date' : 'Next sitting'
  return (
    <div className="px-3 pt-2 pb-2.5 mb-1 space-y-2.5 border-b border-border">
      {readiness && <ReadinessBar readiness={readiness} />}
      {countdown && (
        <div
          className="flex items-center gap-1.5 text-xs text-muted-foreground"
          title={`${whose}: ${countdown.dateLabel}`}
          aria-label={`${whose}, ${countdown.dateLabel} — ${countdown.label}`}
        >
          <CalendarDays className="h-3.5 w-3.5 shrink-0" aria-hidden="true" />
          <span className="min-w-0 flex-1 truncate">{countdown.dateLabel}</span>
          <span className={`shrink-0 font-medium tabular-nums ${countdown.days < 0 && countdown.source === 'exam-date' ? '' : 'text-foreground'}`}>
            {countdown.label}
          </span>
        </div>
      )}
    </div>
  )
}

/**
 * The exam menu's **Today's Study Plan** row. What pressing it does is
 * `todaysPlanRowState`: open today's plan, have the Dashboard build it, add the
 * exam first, or — for a reader who isn't Pro — the lock and the Pro badge, to
 * Upgrade. On an exam still in development there is nothing to plan, so the row
 * stays in its place, disabled, rather than changing the menu's shape.
 */
function TodaysPlanRow({
  entry,
  onOpenStudyPlan,
  onClose,
}: {
  entry: WikiEntryRef
  onOpenStudyPlan?: () => void
  onClose: () => void
}) {
  const navigate = useNavigate()
  const { user } = useAuth()
  const { isPro, loading: subscriptionLoading } = useSubscription()
  const { progress, examRows } = useExamProgress()
  const openExams = useExamsPopout(s => s.openExams)
  const closePopup = useConceptPopup(s => s.close)
  const progressKey = useMemo(() => examProgressKeyFromFile(entry.name), [entry.name])

  const planConcepts = todaysPlanConcepts(
    examRows.find(r => r.exam_id === progressKey)?.study_plan_cache,
    todayISO(),
  )
  const state = todaysPlanRowState({
    signedIn: !!user,
    isPro,
    subscriptionLoading,
    inDevelopment: isExamInDevelopment(progressKey, examPageIdFromFile(entry.name)),
    tracked: !!user && progress[progressKey] === 'in_progress',
    hasPlanToday: planConcepts !== null,
  })

  // Leaving the wiki takes the popup's stack with it, as the deck's "view" does.
  function leaveFor(to: string, state?: unknown) {
    onClose()
    closePopup()
    navigate(to, state ? { state } : undefined)
  }

  function onPress() {
    switch (state) {
      case 'locked':
        leaveFor(user ? '/upgrade' : '/auth')
        return
      case 'untracked':
        onClose()
        openExams()
        return
      case 'open':
        if (onOpenStudyPlan) {
          onClose()
          onOpenStudyPlan()
          return
        }
        leaveFor('/dashboard', { openConceptsFor: progressKey })
        return
      case 'build':
        // The Dashboard builds today's plan for the exam and opens it.
        leaveFor('/dashboard', { openConceptsFor: progressKey })
        return
      default:
        return
    }
  }

  const disabled = state === 'unavailable' || state === 'loading'
  return (
    <button
      type="button"
      onClick={onPress}
      disabled={disabled}
      title={state === 'unavailable' ? 'No study plan while this exam is in development' : undefined}
      className={`${ACTION_MENU_ROW_CLASS} disabled:opacity-40 disabled:cursor-not-allowed disabled:hover:bg-transparent`}
    >
      {state === 'locked'
        ? <Lock className="h-3.5 w-3.5 shrink-0" aria-hidden="true" />
        : <CalendarCheck className="h-3.5 w-3.5 shrink-0" aria-hidden="true" />}
      <span className="flex-1 text-left whitespace-nowrap">Today's Study Plan</span>
      {state === 'locked' && <ProBadge />}
      {state === 'open' && planConcepts && (
        <span className="shrink-0 text-[10px] font-semibold px-1.5 py-0.5 rounded-full bg-primary/10 text-primary tabular-nums">
          {planConcepts.length}
        </span>
      )}
      {state === 'untracked' && (
        <span className="shrink-0 whitespace-nowrap text-[10px] font-semibold px-1.5 py-0.5 rounded-full bg-muted text-muted-foreground">
          Add exam
        </span>
      )}
    </button>
  )
}
