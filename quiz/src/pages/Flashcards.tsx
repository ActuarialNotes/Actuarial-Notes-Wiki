import { createContext, forwardRef, useCallback, useContext, useEffect, useId, useImperativeHandle, useMemo, useRef, useState, type ReactNode } from 'react'
import { Link, useSearchParams } from 'react-router-dom'
import { useSubscription } from '@/hooks/useSubscription'
import {
  ChevronLeft,
  ChevronRight,
  Loader2,
  MoreHorizontal,
  Plus,
  Repeat,
  RotateCcw,
  Search,
  X,
} from 'lucide-react'
import { CheckMark } from '@/components/CheckMark'
import { CONCEPT_TILE_GRID, ConceptTile } from '@/components/ConceptTile'
import type { DragEndEvent } from '@dnd-kit/core'
import { arrayMove } from '@dnd-kit/sortable'
import { useFlashcards, type FlashCard } from '@/hooks/useFlashcards'
import { useCollectedCards } from '@/hooks/useCollectedCards'
import { showAddedToDeck } from '@/hooks/useToast'
import { useWikiSyllabus } from '@/hooks/useWikiSyllabus'
import { useConceptMastery } from '@/hooks/useConceptMastery'
import { useConceptPopup } from '@/hooks/useConceptPopup'
import { useStudyPlan } from '@/hooks/useStudyPlan'
import { useTodayCompletions } from '@/hooks/useTodayCompletions'
import { useExamProgress } from '@/contexts/examProgress'
import { fetchWikiFile } from '@/lib/github'
import { entryRefToRepoPath, examDisplayName } from '@/lib/wikiRoutes'
import type { WikiEntryRef } from '@/lib/wikiRoutes'
import { latestMasteryStates, type ConceptMasteryRecord, type MasteryState } from '@/lib/mastery'
import {
  nextIncompleteIndex,
  resolveActiveIndex,
  shouldLockPageScroll,
  shuffled,
  summarizeSession,
  type StudyRating,
} from '@/lib/flashcardStudy'
import { deckCountLabel, opensDeck, toggleBackPart, type CardBackPart } from '@/lib/flashcardDeck'
import { buildCollectedList } from '@/lib/collectedList'
import { wikiExamIdToProgressKey, type WikiExamSyllabus } from '@/lib/wikiParser'
import { completedTodayConcepts, deckExamLabels, flashcardShelfExams } from '@/lib/flashcardShelf'
import { resourceStripExams } from '@/lib/resourceFilters'
import { defaultBody, loadBody, saveBody, type ExamBody } from '@/lib/bodyFilter'
import { ExamStrip } from '@/components/ExamStrip'
import { SegmentedControl } from '@/components/ui/SegmentedControl'
import { Button } from '@/components/ui/button'
import { GROUND } from '@/components/ui/OutlineCard'
import { Popup, PopupTitle } from '@/components/ui/Popup'
import { WikiArticle } from '@/components/wiki/WikiArticle'
import { extractMathBlockquotes, extractImages, splitDefinition } from '@/lib/wikiMarkdown'
import { ConceptPopup } from '@/components/wiki/ConceptPopup'
import { DeckPopup } from '@/components/flashcards/DeckPopup'
import { FlashcardsMoreMenu } from '@/components/flashcards/FlashcardsMoreMenu'
import { PracticeButton } from '@/components/learn/PracticeButton'
import { PRACTICE_HEADER_BUTTON, PracticeHeader } from '@/components/practice/PracticeHeader'
import { LevelSquare } from '@/components/LevelSquare'
import { useConceptQuestionCount } from '@/hooks/usePractice'
import { conceptPracticeUrl } from '@/lib/practiceLaunch'
import { trackFlashcardReviewed } from '@/lib/analytics'
import { playSound, resetSoundCombo } from '@/lib/soundEngine'
import { usePageKeyboard } from '@/hooks/useKeyboard'
import { KeyboardShortcutsHelp } from '@/components/KeyboardShortcutsHelp'
import { NavProgressBar } from '@/components/NavProgressBar'
import { MASTERY_LABEL } from '@/lib/masteryBadge'
import { useTheme } from '@/hooks/useTheme'
import { themedFigureSrc } from '@/lib/figureTheme'
import { useActionBarHeight } from '@/hooks/useActionBarHeight'
import { cn } from '@/lib/utils'

// How the deck is ordered: by exam and syllabus, as the reader dragged it, or shuffled.
type GroupBy = 'exam' | 'custom' | 'shuffle'

// How long one card's "clear" animation (border ring → green flood + checkmark
// → the card collapsing into its own centre and puffing out a ring of little
// lines; see .flashcard-clearing and friends in index.css) runs.
const CLEAR_CARD_MS = 1050

// Gap between one card starting its clear and the next one starting. Shorter
// than the animation itself on purpose: several cards are mid-clear at once, so
// a finished deck reads as one wave rolling down it rather than a queue.
const CLEAR_STAGGER_MS = 230

// …but a twenty-card deck at that cadence outstays its welcome, so the stagger
// tightens as the deck grows: the starts always fit inside this budget.
const CLEAR_SWEEP_BUDGET_MS = 3000

/**
 * How far apart `count` cards should start their clear animations. Never
 * tighter than 90ms: past that the cards stop reading as separate events, and
 * the `fileAway` cue's own throttle would start swallowing them anyway.
 */
function clearStaggerFor(count: number): number {
  if (count <= 1) return CLEAR_STAGGER_MS
  return Math.max(90, Math.min(CLEAR_STAGGER_MS, Math.round(CLEAR_SWEEP_BUDGET_MS / count)))
}

function extractFirstParagraph(markdown: string): string {
  return splitDefinition(markdown).paragraph
}

// ─── The add-flashcards shelves ──────────────────────────────────────────────

// The pack shelf's "Collected" pill, selected alongside the exam ids in the
// same strip.
const COLLECTED_FILTER_ID = '__collected__'

// The card shelf, rendered inside the add-flashcards sheet (it used to be its
// own gallery tab). The exams are pill filters at the top (same strip as the
// Dashboard's exam header) rather than stacked headings: picking one lays the
// exam's concepts out as individual tiles under their learning objectives (see
// ExamCardShelf), and the trailing "Collected" pill swaps in the same tiles for
// what the learner has already unlocked — the fastest route from "I've
// collected these" to "put them in my deck". Today's study plan and what was
// completed today are the first sections of the selected exam's shelf (see
// ExamCardShelf).
function PacksContent({ onCardsAdded }: { onCardsAdded?: () => void } = {}) {
  const { syllabi, loading: syllabiLoading } = useWikiSyllabus()
  const { records: masteryRecords, loading: masteryLoading } = useConceptMastery()
  const { progress: examProgress, examVariants, selectedTrack } = useExamProgress()
  const collectedCards = useCollectedCards(s => s.cards)

  const collectedSet = useMemo(
    () => new Set(collectedCards.map(c => c.name.toLowerCase())),
    [collectedCards],
  )
  const isCollected = useCallback(
    (name: string) => collectedSet.has(name.toLowerCase()),
    [collectedSet],
  )

  // concept name → mastery state (same best-record + decay logic as the main
  // deck view) so every tile can carry its mastery stripe.
  const packMasteryMap = useMemo(() => latestMasteryStates(masteryRecords, new Date()), [masteryRecords])
  const masteryOf = useCallback(
    (name: string) => packMasteryMap.get(name.toLowerCase()) ?? 'new',
    [packMasteryMap],
  )

  // Every exam with material to study, the ones in progress first — see
  // lib/flashcardShelf.ts. Each carries the whole-exam concept list plus its
  // learning-objective packs.
  const examGroups = useMemo(() => {
    const source = flashcardShelfExams(syllabi, examProgress, examVariants)
    return source.map(syllabus => ({
      examId: syllabus.examId,
      examLabel: syllabus.examLabel,
      syllabus,
      studying: examProgress[wikiExamIdToProgressKey(syllabus.examId)] === 'in_progress',
      allConcepts: syllabus.topics.flatMap(t => t.concepts.map(c => c.name)),
      learningObjectives: syllabus.topics
        .filter(t => t.concepts.length > 0)
        .map(t => ({ name: t.name, concepts: t.concepts.map(c => c.name) })),
    }))
  }, [syllabi, examProgress, examVariants])

  // The "Collected" filter's shelf: only what the learner has unlocked, newest
  // first, as individual cards rather than packs.
  const collectedConcepts = useMemo(
    () => buildCollectedList(syllabi, collectedCards),
    [syllabi, collectedCards],
  )
  const hasCollected = collectedConcepts.length > 0

  // The exams as the Study Guides tab shows them: the SOA/CAS picker (the same
  // stored choice, lib/bodyFilter.ts) over that body's ladder of exam logos.
  const strips = useMemo(() => {
    // A strip exam is labelled by its page's display name; key it back to the shelf's id.
    const idByLabel = new Map<string, string>()
    const names = examGroups.map(g => {
      const name = g.syllabus.fileName ?? g.examLabel
      idByLabel.set(examDisplayName(name), g.examId)
      return name
    })
    const strip = (body: ExamBody) => resourceStripExams(names, body).flatMap(e => {
      const examId = idByLabel.get(e.label)
      return examId ? [{ examId, label: e.label, key: e.key }] : []
    })
    return { SOA: strip('SOA'), CAS: strip('CAS') }
  }, [examGroups])
  const studyingIds = useMemo(
    () => new Set(examGroups.filter(g => g.studying).map(g => g.examId)),
    [examGroups],
  )

  // Which filter's packs are on screen. Kept as an id (not an index) so it
  // survives the groups being rebuilt. With no choice (or one that has gone),
  // the shelf opens on the first exam being studied in the picked body's
  // ladder, else that ladder's first exam.
  const [selectedId, setSelectedId] = useState<string | null>(null)
  const [bodyOverride, setBodyOverride] = useState<ExamBody | null>(loadBody)
  const pickedBody = bodyOverride ?? defaultBody(selectedTrack)
  const selectedBody = (['SOA', 'CAS'] as const).find(b => strips[b].some(e => e.examId === selectedId))
  const body: ExamBody = selectedBody && !strips[pickedBody].some(e => e.examId === selectedId) ? selectedBody : pickedBody
  const strip = strips[body]
  const activeId =
    (selectedId === COLLECTED_FILTER_ID && hasCollected ? COLLECTED_FILTER_ID : null)
    ?? strip.find(e => e.examId === selectedId)?.examId
    ?? strip.find(e => studyingIds.has(e.examId))?.examId
    ?? strip[0]?.examId
    ?? (hasCollected ? COLLECTED_FILTER_ID : null)
  const showCollected = activeId === COLLECTED_FILTER_ID
  const activeGroup = showCollected ? null : examGroups.find(g => g.examId === activeId) ?? null

  function chooseBody(next: ExamBody) {
    saveBody(next)
    setBodyOverride(next)
    if (selectedId !== COLLECTED_FILTER_ID) setSelectedId(null)
  }

  const isLoading = masteryLoading || syllabiLoading
  const hasContent = examGroups.length > 0 || hasCollected

  return (
    <div className="space-y-4">
      {/* Exam filter — the Study Guides tab's: the SOA/CAS picker and the
          body's ladder of exam logos, so an exam is picked the same way here.
          "Collected" is cross-exam, so it sits beside the picker rather than in
          the ladder. Sticky to the top of the sheet's scroll area; the negative
          margins let the background span the container's padding. */}
      {(examGroups.length > 0 || hasCollected) && (
        <div className="sticky top-0 z-10 -mx-4 sm:-mx-6 -mt-4 space-y-3 px-4 sm:px-6 pt-4 pb-1.5 bg-background/95 backdrop-blur-sm">
          <div className="flex items-center gap-2">
            <div className="min-w-0 flex-1">
              {hasCollected && (
                <button
                  type="button"
                  onClick={() => setSelectedId(showCollected ? null : COLLECTED_FILTER_ID)}
                  aria-pressed={showCollected}
                  className={`h-10 px-4 rounded-full text-base font-semibold transition-colors inline-flex items-center gap-1.5 ${
                    showCollected
                      ? 'bg-primary text-primary-foreground'
                      : 'bg-muted text-muted-foreground hover:text-foreground'
                  }`}
                >
                  Collected
                  <span className={`text-xs tabular-nums ${showCollected ? 'opacity-80' : 'opacity-70'}`}>
                    {collectedConcepts.length}
                  </span>
                </button>
              )}
            </div>
            <SegmentedControl
              label="Examining body"
              size="lg"
              pill
              value={body}
              onChange={chooseBody}
              options={[
                { value: 'SOA', label: 'SOA' },
                { value: 'CAS', label: 'CAS' },
              ]}
              className="shrink-0"
            />
          </div>
          {strip.length > 0 && (
            <ExamStrip
              exams={strip.map(e => ({ value: e.examId, name: e.label, logoKey: e.key }))}
              value={showCollected ? null : activeId}
              studying={studyingIds}
              showAll={false}
              onChange={id => { if (id) setSelectedId(id) }}
              className="sm:-mx-6 sm:px-6"
            />
          )}
        </div>
      )}

      {/* The selected exam — its concepts as cards, under their learning
          objectives. */}
      {activeGroup && (
        <ExamCardShelf
          group={activeGroup}
          masteryOf={masteryOf}
          isCollected={isCollected}
          masteryRecords={masteryRecords}
          masteryLoading={masteryLoading}
          onCardsAdded={onCardsAdded}
        />
      )}

      {/* The Collected filter — the same tiles, filtered to what the learner
          has already unlocked. */}
      {showCollected && (
        <div className="space-y-3">
          <ShelfSummary
            concepts={collectedConcepts}
            isCollected={isCollected}
            onCardsAdded={onCardsAdded}
          />
          <ConceptCardGrid
            concepts={collectedConcepts}
            masteryOf={masteryOf}
            isCollected={isCollected}
            onCardsAdded={onCardsAdded}
          />
        </div>
      )}

      {isLoading && !hasContent && (
        <div className="flex items-center gap-2 text-xs text-muted-foreground py-2">
          <Loader2 className="h-4 w-4 animate-spin" /> Loading cards…
        </div>
      )}
      {!isLoading && !hasContent && (
        <p className="text-sm text-muted-foreground py-6 text-center">
          No cards available yet.
        </p>
      )}
    </div>
  )
}

// ─── Card shelves ────────────────────────────────────────────────────────────

// The unit both shelves below are built from: one concept as a small static
// tile (`components/ConceptTile.tsx`, which Quiz Battle's topic picker draws
// too). Tapping one puts the card in the deck, tapping it again takes it back
// out — the tile's green wash and tick say it's in. Its foil edge is its level
// (`lib/flashcardFoil.ts`), the same ladder the deck gallery's cards wear.
function ConceptCardGrid({
  concepts,
  masteryOf,
  isCollected,
  onCardsAdded,
  exam,
}: {
  concepts: string[]
  masteryOf: (name: string) => MasteryState
  isCollected: (name: string) => boolean
  onCardsAdded?: () => void
  /** The exam shelf these tiles are on — the deck files the cards under it. */
  exam?: string
}) {
  const { addCard, removeCard, hasCard } = useFlashcards()

  function toggle(name: string) {
    if (hasCard(name)) { removeCard(name); return }
    playSound('addToDeck')
    addCard({ kind: 'concept', name }, exam)
    showAddedToDeck(1)
    onCardsAdded?.()
  }

  return (
    <div className={CONCEPT_TILE_GRID}>
      {concepts.map(name => {
        const added = hasCard(name)
        const collected = isCollected(name)
        return (
          <ConceptTile
            key={name}
            name={name}
            state={masteryOf(name)}
            collected={collected}
            selected={added}
            data-sound="none"
            onClick={() => toggle(name)}
            aria-pressed={added}
            title={`${name}${collected ? '' : ' (not collected yet)'}${added ? ', in your deck' : ''}`}
            aria-label={added ? `Remove ${name} from your deck` : `Add ${name} to your deck`}
          />
        )
      })}
    </div>
  )
}

// The line above a shelf: how much of it is collected and how much is already
// in the deck, plus the bulk action the pack cards used to carry.
function ShelfSummary({
  concepts,
  isCollected,
  onCardsAdded,
  exam,
}: {
  concepts: string[]
  isCollected: (name: string) => boolean
  onCardsAdded?: () => void
  exam?: string
}) {
  const { addCard, hasCard } = useFlashcards()

  const total = concepts.length
  const collected = concepts.filter(n => isCollected(n)).length
  const notAdded = concepts.filter(n => !hasCard(n))
  const inDeck = total - notAdded.length

  function addAll() {
    for (const name of notAdded) addCard({ kind: 'concept', name }, exam)
    if (notAdded.length > 0) { playSound('addToDeck'); showAddedToDeck(notAdded.length); onCardsAdded?.() }
  }

  return (
    <div className="flex items-center justify-between gap-2">
      <span className="text-xs text-muted-foreground tabular-nums">
        <span className="font-medium text-foreground">{collected}</span>
        {collected === total ? ' collected' : <> / {total} collected</>}
        {inDeck > 0 && <> · <span className="font-medium text-foreground">{inDeck}</span> in deck</>}
      </span>
      {notAdded.length > 0 && (
        <Button size="sm" data-sound="none" onClick={addAll}>
          Add all {notAdded.length} to deck
        </Button>
      )}
    </div>
  )
}

// One labelled block of a shelf: the heading with its collected count, the "add
// what's missing" action, and the grid of tiles under it. Both the syllabus'
// learning objectives and today's study plan render through this, so the plan
// reads as the exam's first section rather than a different kind of thing.
function ShelfSection({
  title,
  concepts,
  masteryOf,
  isCollected,
  onCardsAdded,
  loading = false,
  emptyHint,
  className = '',
  exam,
}: {
  title: string
  concepts: string[]
  masteryOf: (name: string) => MasteryState
  isCollected: (name: string) => boolean
  onCardsAdded?: () => void
  /** Shows a spinner in place of the tiles (the study plan is still building). */
  loading?: boolean
  /** Stands in for the grid when the section has no concepts. */
  emptyHint?: ReactNode
  className?: string
  /** The exam shelf this section is on — the deck files its cards under it. */
  exam?: string
}) {
  const { addCard, hasCard } = useFlashcards()

  const missing = concepts.filter(n => !hasCard(n))
  const collected = concepts.filter(n => isCollected(n)).length
  const showCounts = !loading && concepts.length > 0

  function addMissing() {
    for (const name of missing) addCard({ kind: 'concept', name }, exam)
    if (missing.length > 0) { playSound('addToDeck'); showAddedToDeck(missing.length); onCardsAdded?.() }
  }

  return (
    <section className={`space-y-2 ${className}`}>
      <div className="flex items-end justify-between gap-2">
        <div className="min-w-0">
          <h3 className="text-sm font-semibold leading-tight">{title}</h3>
          {showCounts && (
            <span className="text-xs text-muted-foreground tabular-nums">
              {collected} / {concepts.length} collected
            </span>
          )}
        </div>
        {showCounts && (missing.length > 0 ? (
          <Button
            variant="secondary"
            size="sm"
            data-sound="none"
            onClick={addMissing}
            className="shrink-0"
          >
            Add {missing.length}
          </Button>
        ) : (
          <span className="shrink-0 text-xs text-muted-foreground">All in deck</span>
        ))}
      </div>
      {loading ? (
        <div className="flex items-center gap-2 text-xs text-muted-foreground py-1">
          <Loader2 className="h-4 w-4 animate-spin" /> Loading…
        </div>
      ) : concepts.length === 0 ? (
        emptyHint
      ) : (
        <ConceptCardGrid
          concepts={concepts}
          masteryOf={masteryOf}
          isCollected={isCollected}
          onCardsAdded={onCardsAdded}
          exam={exam}
        />
      )}
    </section>
  )
}

// Today's study plan, as the first section of the selected exam's shelf: the
// concepts the plan schedules for today, sitting above the syllabus' own
// objectives so the deck the plan is asking for is the one that's easiest to
// build. It used to be a card pinned to the top of the deck; it belongs here,
// where cards are added. Follows the exam pill rather than the primary exam, so
// it always describes the shelf below it.
function TodayStudyPlanSection({
  syllabus,
  masteryRecords,
  masteryLoading,
  masteryOf,
  isCollected,
  onCardsAdded,
}: {
  syllabus: WikiExamSyllabus
  masteryRecords: ConceptMasteryRecord[]
  masteryLoading: boolean
  masteryOf: (name: string) => MasteryState
  isCollected: (name: string) => boolean
  onCardsAdded?: () => void
}) {
  const { targetDates } = useExamProgress()
  const targetDate = targetDates[wikiExamIdToProgressKey(syllabus.examId)] ?? null
  const { plan, loading: planLoading } = useStudyPlan(syllabus, masteryRecords, targetDate, masteryLoading)
  const { isPro } = useSubscription()

  const concepts = useMemo(() => {
    if (!plan) return []
    return plan.status === 'review_mode' ? plan.reviewConcepts : plan.todaysConcepts
  }, [plan])

  return (
    <ShelfSection
      title="Today's Study Plan"
      exam={syllabus.examId}
      concepts={concepts}
      loading={planLoading || masteryLoading}
      masteryOf={masteryOf}
      isCollected={isCollected}
      onCardsAdded={onCardsAdded}
      emptyHint={
        <p className="text-xs text-muted-foreground py-1">
          {!isPro ? (
            <>
              Today&apos;s Study Plan is part of{' '}
              <Link to="/upgrade" className="text-primary hover:underline">Pro</Link>.
            </>
          ) : plan?.config?.targetReadyDate ? (
            'Nothing scheduled for today.'
          ) : (
            <>
              Set up your study plan on the{' '}
              <Link to="/dashboard" className="text-primary hover:underline">Dashboard</Link>{' '}
              to see today's concepts.
            </>
          )}
        </p>
      }
    />
  )
}

interface ExamShelfGroup {
  examId: string
  examLabel: string
  syllabus: WikiExamSyllabus
  /** In progress — the only exams a study plan is scheduling today. */
  studying: boolean
  allConcepts: string[]
  learningObjectives: { name: string; concepts: string[] }[]
}

// An exam's shelf. The same tiles as the Collected shelf, grouped under today's
// study plan (for an exam in progress — one being browsed has no plan to show),
// then the exam's concepts completed today (its level-ups, the same ones the
// Dashboard's Today card lists — shown whenever there are any, plan or no plan,
// since a quiz can level up an exam that isn't being studied), and then the
// exam's learning objectives — the syllabus structure the pack cards carried
// survives the switch from packs to cards, and each section keeps its own "add
// what's missing" action. A hairline closes off the day's sections from the
// syllabus proper.
function ExamCardShelf({
  group,
  masteryOf,
  isCollected,
  masteryRecords,
  masteryLoading,
  onCardsAdded,
}: {
  group: ExamShelfGroup
  masteryOf: (name: string) => MasteryState
  isCollected: (name: string) => boolean
  masteryRecords: ConceptMasteryRecord[]
  masteryLoading: boolean
  onCardsAdded?: () => void
}) {
  const levelUps = useTodayCompletions(wikiExamIdToProgressKey(group.examId))
  const completedToday = useMemo(
    () => completedTodayConcepts(levelUps, group.allConcepts),
    [levelUps, group.allConcepts],
  )
  const showToday = group.studying || completedToday.length > 0

  return (
    <div className="space-y-5">
      <ShelfSummary concepts={group.allConcepts} isCollected={isCollected} onCardsAdded={onCardsAdded} exam={group.examId} />
      {showToday && (
        <div className="space-y-5 pb-5 border-b border-border">
          {group.studying && (
            <TodayStudyPlanSection
              syllabus={group.syllabus}
              masteryRecords={masteryRecords}
              masteryLoading={masteryLoading}
              masteryOf={masteryOf}
              isCollected={isCollected}
              onCardsAdded={onCardsAdded}
            />
          )}
          {completedToday.length > 0 && (
            <ShelfSection
              title="Completed Today"
              exam={group.examId}
              concepts={completedToday}
              masteryOf={masteryOf}
              isCollected={isCollected}
              onCardsAdded={onCardsAdded}
            />
          )}
        </div>
      )}
      {group.learningObjectives.map(lo => (
        <ShelfSection
          key={lo.name}
          title={lo.name}
          exam={group.examId}
          concepts={lo.concepts}
          masteryOf={masteryOf}
          isCollected={isCollected}
          onCardsAdded={onCardsAdded}
        />
      ))}
    </div>
  )
}

// How long the add-flashcards sheet's slide-out runs before it unmounts —
// keep in step with the `.add-flashcards-sheet[data-closing]` animation in
// index.css.
const SHEET_EXIT_MS = 200

// How the "+" reaches the sheet. The sheet is owned by the page
// (`AddFlashcardsSheetHost`, mounted by `Flashcards` at the bottom of this
// file), not by the button that opens it: the button is in the deck's top row
// (or the empty deck's middle), and that tree is torn down and rebuilt the
// moment the deck stops being empty. Holding the open state down there meant
// adding your *first* card slammed the sheet shut mid-browse; hoisting it
// above that switch keeps the sheet — and its search text, exam pill and
// scroll position — exactly where it was.
const AddFlashcardsSheetContext = createContext<{
  openSheet: () => void
  onCardsAdded: () => void
}>({ openSheet: () => {}, onCardsAdded: () => {} })

// The "add flashcards" sheet — one full-screen view that covers both ways into
// the deck: a free-form concept search pinned to the top, and, whenever the
// search box is empty, every available pack below it (Packs used to be its own
// gallery tab). Matches against every concept in the syllabi plus anything
// collected.
function AddFlashcardsSheet({
  onClose,
  onCardsAdded,
  closing = false,
}: {
  onClose: () => void
  onCardsAdded?: () => void
  /** True while the slide-out is playing, just before the sheet unmounts. */
  closing?: boolean
}) {
  const { syllabi } = useWikiSyllabus()
  const collectedCards = useCollectedCards(s => s.cards)
  const { addCard, hasCard } = useFlashcards()
  const [query, setQuery] = useState('')
  const inputRef = useRef<HTMLInputElement>(null)

  const allConcepts = useMemo(() => {
    const set = new Set<string>()
    for (const s of syllabi) for (const t of s.topics) for (const c of t.concepts) set.add(c.name)
    for (const c of collectedCards) set.add(c.name)
    return [...set].sort((a, b) => a.localeCompare(b))
  }, [syllabi, collectedCards])

  const results = useMemo(() => {
    const q = query.trim().toLowerCase()
    if (!q) return []
    return allConcepts.filter(n => n.toLowerCase().includes(q)).slice(0, 24)
  }, [query, allConcepts])

  // Deliberately no autofocus: opening the sheet should show the packs, not
  // shove a keyboard over them on mobile. The search box only takes focus when
  // the user taps it.
  useEffect(() => {
    function onKey(e: KeyboardEvent) {
      if (e.key === 'Escape') onClose()
    }
    document.addEventListener('keydown', onKey)
    return () => document.removeEventListener('keydown', onKey)
  }, [onClose])

  return (
    <div
      className="add-flashcards-sheet fixed inset-0 z-[64] flex flex-col bg-background"
      data-closing={closing || undefined}
    >
      {/* Search header */}
      <div className="shrink-0 border-b bg-background/95 backdrop-blur-md">
        <div className="max-w-4xl mx-auto px-4 sm:px-6">
          <div className="flex items-center gap-2 h-14">
            {/* Tapping anywhere in the search area (icon included) is what opens
                the keyboard — the sheet itself never steals focus. */}
            <div
              className="flex-1 min-w-0 flex items-center gap-2 self-stretch cursor-text"
              onClick={() => inputRef.current?.focus()}
            >
              <Search className="h-4 w-4 text-muted-foreground shrink-0" />
              <input
                ref={inputRef}
                type="text"
                value={query}
                onChange={e => setQuery(e.target.value)}
                placeholder="Add a flashcard…"
                className="flex-1 min-w-0 bg-transparent border-0 focus:outline-none text-[16px] sm:text-sm text-foreground placeholder:text-muted-foreground"
                aria-label="Add a flashcard"
                autoComplete="off"
                spellCheck={false}
              />
            </div>
            <button
              type="button"
              onClick={onClose}
              aria-label="Close"
              className="text-muted-foreground hover:text-foreground transition-colors shrink-0"
            >
              <X className="h-5 w-5" />
            </button>
          </div>
        </div>
      </div>

      {/* Search results while typing, the pack shelf otherwise */}
      <div className="flex-1 overflow-y-auto overscroll-contain">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 py-4">
          {query.trim() ? (
            <ul className="space-y-0.5">
              {results.length === 0 ? (
                <li className="text-xs text-muted-foreground px-2 py-2">No matches</li>
              ) : results.map(name => {
                const added = hasCard(name)
                return (
                  <li key={name}>
                    <button
                      type="button"
                      data-sound="none"
                      disabled={added}
                      onClick={() => { playSound('addToDeck'); addCard({ kind: 'concept', name }); showAddedToDeck(1); onCardsAdded?.() }}
                      className={`w-full flex items-center gap-2 rounded-md px-2 py-2 text-sm text-left transition-colors ${
                        added ? 'text-muted-foreground cursor-default' : 'hover:bg-accent'
                      }`}
                    >
                      {added
                        ? <CheckMark className="h-3.5 w-3.5" />
                        : <Plus className="h-3.5 w-3.5 shrink-0 text-primary" />}
                      <span className="flex-1 min-w-0 truncate">{name}</span>
                      {added && <span className="text-[10px] shrink-0">In deck</span>}
                    </button>
                  </li>
                )
              })}
            </ul>
          ) : (
            <PacksContent onCardsAdded={onCardsAdded} />
          )}
        </div>
      </div>
    </div>
  )
}

// Holds the add-flashcards sheet for the whole page: the "+" opens it through
// the context, and it stays mounted — with its search, exam pill and scroll
// intact — until it is closed, however the deck below it changes shape.
function AddFlashcardsSheetHost({
  onCardsAdded,
  children,
}: {
  onCardsAdded?: () => void
  children: ReactNode
}) {
  const [open, setOpen] = useState(false)
  // The sheet stays mounted for the length of its slide-out so closing it
  // animates too; SHEET_EXIT_MS matches the `.add-flashcards-sheet` exit
  // animation in index.css.
  const [closing, setClosing] = useState(false)
  const closeTimer = useRef<ReturnType<typeof setTimeout>>()
  const closingRef = useRef(false)

  useEffect(() => () => clearTimeout(closeTimer.current), [])

  const requestClose = useCallback(() => {
    if (closingRef.current) return
    closingRef.current = true
    setClosing(true)
    closeTimer.current = setTimeout(() => {
      closingRef.current = false
      setOpen(false)
      setClosing(false)
    }, SHEET_EXIT_MS)
  }, [])

  const openSheet = useCallback(() => {
    clearTimeout(closeTimer.current)
    closingRef.current = false
    setClosing(false)
    setOpen(true)
  }, [])

  const notifyCardsAdded = useCallback(() => { onCardsAdded?.() }, [onCardsAdded])
  const ctx = useMemo(
    () => ({ openSheet, onCardsAdded: notifyCardsAdded }),
    [openSheet, notifyCardsAdded],
  )

  return (
    <AddFlashcardsSheetContext.Provider value={ctx}>
      {children}
      {open && (
        <AddFlashcardsSheet
          onClose={requestClose}
          onCardsAdded={onCardsAdded}
          closing={closing}
        />
      )}
    </AddFlashcardsSheetContext.Provider>
  )
}

// ─── Study Session Summary ───────────────────────────────────────────────────

// Shown when every card in the deck has been marked complete via the
// Again / Got it loop. Recaps the session (with the cards that needed extra
// passes) and offers the two natural next steps: clear the finished cards out
// of the deck, or reset the deck and run it again.
function StudySessionSummaryDialog({
  cardNames,
  againCounts,
  onClearCompleted,
  onStudyAgain,
  onClose,
}: {
  cardNames: string[]
  againCounts: Record<string, number>
  onClearCompleted: () => void
  onStudyAgain: () => void
  onClose: () => void
}) {
  const summary = useMemo(() => summarizeSession(cardNames, againCounts), [cardNames, againCounts])
  const titleId = useId()

  return (
    <Popup onClose={onClose} labelledBy={titleId}>
      <PopupTitle id={titleId}>Deck complete</PopupTitle>
      <p className="text-[17px] leading-normal">
        {deckCountLabel(summary.total)} studied
        {summary.struggled.length > 0
          ? `, ${summary.firstTry} on the first try.`
          : ', all on the first try.'}
      </p>

      {summary.struggled.length > 0 && (
        <div>
          <h3 className="text-[15px] font-bold">Marked Again</h3>
          <ul>
            {summary.struggled.slice(0, 5).map(({ name, againCount }) => (
              <li key={name} className="flex min-h-11 items-center gap-3 border-b border-border text-base last:border-b-0">
                <span className="min-w-0 flex-1 truncate">{name}</span>
                <span className="shrink-0 font-semibold tabular-nums">{againCount}×</span>
              </li>
            ))}
          </ul>
          {summary.struggled.length > 5 && (
            <p className="pt-2 text-[15px]">and {summary.struggled.length - 5} more</p>
          )}
        </div>
      )}

      <div className="flex flex-col gap-2.5">
        <Button size="main" data-sound="study" onClick={onStudyAgain}>
          Study again
        </Button>
        <Button variant="edge" className="h-12 text-base" onClick={onClearCompleted}>
          Clear completed cards
        </Button>
        <button
          type="button"
          onClick={onClose}
          className="min-h-11 rounded-md text-base font-semibold focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
        >
          Keep browsing
        </button>
      </div>
    </Popup>
  )
}

// ─── Study Area ───────────────────────────────────────────────────────────────

interface FlashcardStudyAreaHandle {
  flip: () => void
  isFlipped: () => boolean
}

const SWIPE_THRESHOLD = 80
const SWIPE_FLY_DISTANCE = 500

// A link on the back of a card opens in the concept reader.
function openInReader(ref: WikiEntryRef): boolean {
  const { open, jumpTo, openAt } = useConceptPopup.getState()
  if (open) jumpTo(ref); else openAt([ref], 0)
  return true
}

// The back of a card is the concept page's own words, set as the redesign sets
// reading text: 17px in the one text colour, each formula in a box outlined in
// the line colour that scrolls sideways.
const BACK_ARTICLE =
  'text-[17px] text-foreground prose-p:leading-normal prose-p:text-foreground prose-strong:text-foreground ' +
  '[&_blockquote[data-math-block]]:my-0 [&_blockquote[data-math-block]]:overflow-x-auto ' +
  '[&_blockquote[data-math-block]]:rounded-[14px] [&_blockquote[data-math-block]]:border ' +
  '[&_blockquote[data-math-block]]:border-border [&_blockquote[data-math-block]]:bg-ground ' +
  '[&_blockquote[data-math-block]]:px-4'

/**
 * One card (docs/redesign-spec.md §7a.3): an outline on the ground holding the
 * concept's name and its level square, and, once flipped, the definition, the
 * formulas and the figures the More menu has switched on. A tap anywhere on it
 * flips it; under a flipped card sit Again and Got it.
 */
const FlashcardStudyArea = forwardRef<FlashcardStudyAreaHandle, {
  cards: FlashCard[]
  index: number
  level: MasteryState
  isFlashing?: boolean
  reverseCardModes: ReadonlySet<CardBackPart>
  defaultFlipped: boolean
  onNext: () => void
  onPrev: () => void
  hasNext: boolean
  hasPrev: boolean
  // Again / Got it self-assessment loop. `onRate` advances to the next
  // unfinished card (Got it also marks the current one complete).
  onRate: (rating: StudyRating) => void
  isCompleted: boolean
}>(function FlashcardStudyArea({
  cards,
  index,
  level,
  isFlashing,
  reverseCardModes,
  defaultFlipped,
  onNext,
  onPrev,
  hasNext,
  hasPrev,
  onRate,
  isCompleted,
}, ref) {
  const [flipped, setFlipped] = useState(defaultFlipped)
  const { theme } = useTheme()
  const [markdown, setMarkdown] = useState<string | null>(null)
  const [loadStatus, setLoadStatus] = useState<'idle' | 'loading' | 'error'>('idle')

  // Swipe-to-navigate (mobile touch only — desktop keeps click-to-flip + Prev/Next buttons)
  const [dragX, setDragX] = useState(0)
  const [swiping, setSwiping] = useState(false)
  const [settling, setSettling] = useState(false)
  const touchStartRef = useRef<{ x: number; y: number } | null>(null)
  const horizontalLockRef = useRef(false)
  const dragXRef = useRef(0)

  const current = cards[index]

  useEffect(() => {
    setFlipped(defaultFlipped)
    setMarkdown(null)
    if (defaultFlipped) {
      setLoadStatus('loading')
      fetchWikiFile(entryRefToRepoPath(cards[index]))
        .then(raw => { setMarkdown(raw); setLoadStatus('idle') })
        .catch(() => setLoadStatus('error'))
    } else {
      setLoadStatus('idle')
    }
  }, [index, defaultFlipped]) // eslint-disable-line react-hooks/exhaustive-deps

  // Reset any in-flight swipe state when the displayed card changes
  useEffect(() => {
    touchStartRef.current = null
    horizontalLockRef.current = false
    dragXRef.current = 0
    setDragX(0)
    setSwiping(false)
    setSettling(false)
  }, [index])

  useImperativeHandle(ref, () => ({ flip: handleFlip, isFlipped: () => flipped }))

  function handleFlip() {
    // Turning a card over is the paper flick, not a button press — the card
    // itself carries data-sound="none" so this is the only cue.
    playSound('page')
    if (!flipped) {
      setFlipped(true)
      trackFlashcardReviewed({ concept: current.name, kind: current.kind })
      if (markdown === null && loadStatus === 'idle') {
        setLoadStatus('loading')
        fetchWikiFile(entryRefToRepoPath(current))
          .then(raw => { setMarkdown(raw); setLoadStatus('idle') })
          .catch(() => setLoadStatus('error'))
      }
    } else {
      setFlipped(false)
    }
  }

  function handleTouchStart(e: React.TouchEvent) {
    if (settling) return
    // Only the flipped (back) face has nested interactive elements (links,
    // buttons) — mirrors the onClick guard below so taps on those don't
    // also start a swipe.
    if (flipped) {
      const target = e.target as HTMLElement
      if (target.closest('a, button, [role="button"], input, select, textarea')) {
        touchStartRef.current = null
        return
      }
    }
    const t = e.touches[0]
    touchStartRef.current = { x: t.clientX, y: t.clientY }
    horizontalLockRef.current = false
  }

  function handleTouchMove(e: React.TouchEvent) {
    const start = touchStartRef.current
    if (!start || settling) return
    const t = e.touches[0]
    const dx = t.clientX - start.x
    const dy = t.clientY - start.y
    if (!horizontalLockRef.current) {
      if (Math.abs(dx) < 10 && Math.abs(dy) < 10) return
      if (Math.abs(dx) <= Math.abs(dy)) {
        // Vertical intent — let the page scroll, abandon swipe tracking
        touchStartRef.current = null
        return
      }
      horizontalLockRef.current = true
      setSwiping(true)
    }
    e.preventDefault()
    dragXRef.current = dx
    setDragX(dx)
  }

  function handleTouchEnd(e: React.TouchEvent) {
    if (!horizontalLockRef.current) {
      touchStartRef.current = null
      return
    }
    e.preventDefault()
    touchStartRef.current = null
    horizontalLockRef.current = false
    setSwiping(false)

    const dx = dragXRef.current
    if ((dx <= -SWIPE_THRESHOLD && hasNext) || (dx >= SWIPE_THRESHOLD && hasPrev)) {
      // The card flies off — same cue as the Prev/Next buttons.
      playSound('ruffle')
    }
    if (dx <= -SWIPE_THRESHOLD && hasNext) {
      setSettling(true)
      dragXRef.current = -SWIPE_FLY_DISTANCE
      setDragX(-SWIPE_FLY_DISTANCE)
      setTimeout(() => { onNext(); }, 200)
    } else if (dx >= SWIPE_THRESHOLD && hasPrev) {
      setSettling(true)
      dragXRef.current = SWIPE_FLY_DISTANCE
      setDragX(SWIPE_FLY_DISTANCE)
      setTimeout(() => { onPrev(); }, 200)
    } else {
      setSettling(true)
      dragXRef.current = 0
      setDragX(0)
      setTimeout(() => setSettling(false), 200)
    }
  }

  const definition = markdown ? extractFirstParagraph(markdown) : null
  const allEquations = markdown ? extractMathBlockquotes(markdown) : []
  const cardImages = markdown ? extractImages(markdown) : []

  return (
    <div className="flex flex-col gap-4">
      {/* Flip card */}
      <div
        data-tour="flip-card"
        data-testid="flashcard"
        data-face={flipped ? 'back' : 'front'}
        data-sound="none"
        className={cn(
          'relative flex min-h-[min(50dvh,28rem)] w-full cursor-pointer flex-col gap-[18px] rounded-[26px] border-[1.5px] border-foreground bg-ground p-6 text-foreground',
          'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-ground',
          !flipped && 'select-none',
          isFlashing && 'flashcard-highlight',
        )}
        style={{
          transform: `translateX(${dragX}px) rotate(${dragX / 20}deg)`,
          opacity: 1 - Math.min(Math.abs(dragX) / SWIPE_FLY_DISTANCE, 1),
          transition: settling ? 'transform 200ms ease, opacity 200ms ease' : 'none',
          touchAction: 'pan-y',
        }}
        onClick={(e) => {
          if (!flipped) { handleFlip(); return }
          // When showing back: flip only if click wasn't on an interactive element
          const target = e.target as HTMLElement
          if (!target.closest('a, button, [role="button"], input, select, textarea')) {
            handleFlip()
          }
        }}
        onTouchStart={handleTouchStart}
        onTouchMove={handleTouchMove}
        onTouchEnd={handleTouchEnd}
        onTouchCancel={handleTouchEnd}
        role={flipped ? undefined : 'button'}
        tabIndex={flipped ? undefined : 0}
        aria-label={flipped ? undefined : `${current.name}, ${MASTERY_LABEL[level]}. Showing the front. Flip`}
        onKeyDown={e => { if (!flipped && (e.key === 'Enter' || e.key === ' ')) { e.preventDefault(); handleFlip() } }}
      >
        {swiping && Math.abs(dragX) > 20 && (
          <div
            className={`pointer-events-none absolute inset-y-0 z-10 flex items-center ${dragX < 0 ? 'right-3' : 'left-3'}`}
            style={{ opacity: Math.min(Math.abs(dragX) / SWIPE_THRESHOLD, 1) }}
          >
            <div className="rounded-full border-[1.5px] border-foreground bg-ground p-2">
              {dragX < 0
                ? (hasNext ? <ChevronRight className="h-6 w-6" /> : null)
                : (hasPrev ? <ChevronLeft className="h-6 w-6" /> : null)}
            </div>
          </div>
        )}

        {/* The same row on both faces, so the card doesn't jump as it turns. */}
        <div className="flex items-center gap-2.5">
          <span className="min-w-0 flex-1 break-words text-2xl font-bold leading-tight">{current.name}</span>
          {isCompleted && <CheckMark className="h-6 w-6 shrink-0 text-foreground" label="Completed" />}
          <LevelSquare state={level} size="md" />
        </div>

        {flipped && (
          // data-math-scope: the revealed face is one math-focus set (see
          // lib/mathFocus.ts) — each equation is its own article, and
          // Previous/Next should run through all of them.
          <div className="flex flex-col gap-[18px]" data-math-scope="">
            {loadStatus === 'loading' && (
              <div className="flex items-center gap-2 text-base">
                <Loader2 className="h-4 w-4 animate-spin" aria-hidden="true" /> Loading…
              </div>
            )}
            {loadStatus === 'error' && (
              <p className="text-base">This card's page didn't load. Check your connection and flip it again.</p>
            )}
            {reverseCardModes.has('definition') && definition && (
              <WikiArticle markdown={definition} onWikiLink={openInReader} className={BACK_ARTICLE} />
            )}
            {reverseCardModes.has('math') && allEquations.map((eq, i) => (
              <WikiArticle key={i} markdown={eq} onWikiLink={openInReader} className={BACK_ARTICLE} />
            ))}
            {reverseCardModes.has('images') && cardImages.map((img, i) => (
              <figure key={i} className="flex flex-col items-center gap-1.5">
                {/* Figures are the point of the card, not a thumbnail: fill the
                    card's width and only clamp on height so a tall one still fits
                    above the Again / Got it buttons. */}
                <img src={themedFigureSrc(img.src, theme)} alt={img.alt} className="max-h-[60vh] w-full rounded object-contain" onError={e => { (e.currentTarget as HTMLImageElement).style.display = 'none' }} />
                {img.caption && <figcaption className="text-center text-[13px]">{img.caption}</figcaption>}
              </figure>
            ))}
          </div>
        )}

        <Repeat className="mt-auto h-[26px] w-[26px] shrink-0 self-center" aria-hidden="true" />
      </div>

      {/* Again / Got it — the self-assessment loop, revealed once the card is
          flipped. "Got it" marks the card complete and jumps to the next
          unfinished card; "Again" keeps it cycling until it sticks. Both are
          outlined: the screen's filled button is Practice this. */}
      {flipped && (
        <div className="flex items-stretch gap-2.5">
          <Button
            variant="edge"
            className="h-[52px] flex-1 gap-2 text-base"
            onClick={() => onRate('again')}
            title="Keep this card in rotation (1)"
          >
            <RotateCcw className="h-[18px] w-[18px]" aria-hidden="true" /> Again
          </Button>
          <Button
            variant="edge"
            className="h-[52px] flex-1 gap-2 text-base"
            data-sound="none"
            onClick={() => onRate('got')}
            title="Mark complete and continue (2)"
          >
            <CheckMark className="h-[18px] w-[18px] text-foreground" /> Got it
          </Button>
        </div>
      )}
    </div>
  )
})

// ─── Main Page ────────────────────────────────────────────────────────────────

// Flashcards, a screen under Practice (docs/redesign-spec.md §7a.3, R17): one
// card at a time between a top row (back, Deck, +, More) and a foot of
// Previous, Practice this and Next.
//
// The page proper is `FlashcardsDeck` below; this shell exists only so the
// add-cards sheet outlives it. `FlashcardsDeck` returns two different trees
// either side of "is the deck empty?", so everything it renders is torn down
// the instant the first card lands. Owning the sheet up here keeps it open
// across that switch, so adding your first card leaves you where you were,
// free to add a second.
export default function Flashcards() {
  return (
    <AddFlashcardsSheetHost>
      <FlashcardsDeck />
    </AddFlashcardsSheetHost>
  )
}

// The most cards the bar draws as a segment each; past it, one plain bar.
const MAX_CARD_SEGMENTS = 24

const FOOT_ARROW =
  'flex h-[58px] w-[58px] shrink-0 items-center justify-center rounded-full border-[1.5px] border-foreground text-foreground ' +
  'transition-colors hover:bg-foreground/10 disabled:opacity-40 disabled:hover:bg-transparent ' +
  'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-ground'

function FlashcardsDeck() {
  const {
    cards, removeCard, clearCards, customOrder, setCustomOrder,
    toggleCompleted, clearCompleted, resetCompleted,
  } = useFlashcards()
  const { openSheet } = useContext(AddFlashcardsSheetContext)
  const { syllabi } = useWikiSyllabus()
  const { progress: examProgress, examVariants } = useExamProgress()
  const { records: masteryRecords } = useConceptMastery()
  const popupOpen = useConceptPopup(s => s.open)
  const popupCurrentName = useConceptPopup(s => s.open ? (s.list[s.index]?.name ?? null) : null)
  const [searchParams, setSearchParams] = useSearchParams()
  const highlightName = searchParams.get('highlight')
  const viewParam = searchParams.get('view')

  const [flashingCard, setFlashingCard] = useState<string | null>(null)
  const flashTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null)
  // Names (lowercased) of completed cards currently animating out of the deck
  // before "Clear completed" sweeps them out of the deck.
  const [clearingNames, setClearingNames] = useState<Set<string>>(() => new Set())
  const clearTimersRef = useRef<ReturnType<typeof setTimeout>[]>([])
  const orderedCardsRef = useRef<FlashCard[]>([])
  const prevPopupNameRef = useRef<string | null>(null)
  const studyAreaRef = useRef<FlashcardStudyAreaHandle>(null)

  // The active card is tracked by *name*, never by position. `orderedCards` is
  // rebuilt every time the async data it sorts by lands (syllabus positions,
  // mastery records), and a stored index would quietly follow the slot rather
  // than the card — how "collect Calculus, open the deck" used to leave you
  // looking at Discrete Mathematics. `activeIndex` is derived below, once
  // `orderedCards` exists; `lastIndexRef` keeps the position for the one case
  // the name can't answer (the active card left the deck).
  const [activeName, setActiveName] = useState<string | null>(null)
  const lastIndexRef = useRef(0)

  // Index-shaped setter kept for every caller that thinks in positions ("next
  // card", "the card you tapped"): it resolves against the current order and
  // stores the card's name.
  const setActiveIndex = useCallback((value: number | ((prev: number) => number)) => {
    const list = orderedCardsRef.current
    setActiveName(prev => {
      const names = list.map(c => c.name)
      const prevIndex = resolveActiveIndex(names, prev, lastIndexRef.current)
      const raw = typeof value === 'function' ? value(prevIndex) : value
      const next = Math.min(Math.max(0, raw), Math.max(0, names.length - 1))
      return list[next]?.name ?? prev
    })
  }, [])

  // "Start at the top of whatever the order is now" — shuffling or clearing
  // completed cards rebuilds the deck, so pinning a name would be wrong.
  const resetActiveIndex = useCallback(() => {
    lastIndexRef.current = 0
    setActiveName(null)
  }, [])

  // The Deck popup and the More menu, both opened from the top row.
  const [deckOpen, setDeckOpen] = useState(false)
  const [moreOpen, setMoreOpen] = useState(false)
  const [focusMode, setFocusMode] = useState(false)
  const [showShortcutsHelp, setShowShortcutsHelp] = useState(false)
  const [groupBy, setGroupBy] = useState<GroupBy>('exam')
  // The order to go back to when Shuffle is switched off.
  const beforeShuffleRef = useRef<GroupBy>('exam')
  // The shuffled deck order (card names) while groupBy === 'shuffle'. Freshly
  // drawn each time shuffle is chosen; newly added cards append at the end.
  const [shuffleOrder, setShuffleOrder] = useState<string[]>([])
  // Per-card "Again" tallies for the current study session (feeds the summary).
  const [againCounts, setAgainCounts] = useState<Record<string, number>>({})
  const [showSessionSummary, setShowSessionSummary] = useState(false)
  // The back of a card shows the definition *and* its formulas out of the box —
  // a concept's equations are half of what a card is for, and a learner who
  // never opens the More menu should still see them. Figures stay opt-in: many
  // concepts carry none, and a figure is the one section that can push the
  // definition off a phone screen.
  const [reverseCardModes, setReverseCardModes] = useState<Set<CardBackPart>>(
    new Set<CardBackPart>(['definition', 'math']),
  )
  const [globalFlip, setGlobalFlip] = useState(false)

  // Lock the page behind focus mode — but only while it is on screen. It
  // unmounts when the deck empties, so a clear/remove that takes the last card
  // has to release the lock too. (The popups lock the page themselves.)
  const lockPageScroll = shouldLockPageScroll({
    deckSize: cards.length,
    galleryExpanded: false,
    focusMode,
  })
  useEffect(() => {
    if (!lockPageScroll) return
    const before = document.body.style.overflow
    document.body.style.overflow = 'hidden'
    return () => { document.body.style.overflow = before }
  }, [lockPageScroll])

  // …and drop the overlay state itself, so re-adding a card doesn't drop the
  // reader straight back into a popup or focus mode they never reopened.
  useEffect(() => {
    if (cards.length === 0) {
      setDeckOpen(false)
      setMoreOpen(false)
      setFocusMode(false)
    }
  }, [cards.length])

  useEffect(() => {
    function handleKeyDown(e: KeyboardEvent) {
      if (e.key === 'Escape' && focusMode) setFocusMode(false)
    }
    document.addEventListener('keydown', handleKeyDown)
    return () => document.removeEventListener('keydown', handleKeyDown)
  }, [focusMode])

  // Keyboard navigation for the card (off while a popup is open)
  usePageKeyboard({
    ' ': () => { studyAreaRef.current?.flip() },
    'ArrowRight': () => {
      setActiveIndex(i => Math.min(i + 1, orderedCardsRef.current.length - 1))
    },
    'ArrowLeft': () => {
      setActiveIndex(i => Math.max(i - 1, 0))
    },
    '1': () => { if (studyAreaRef.current?.isFlipped()) handleRate('again') },
    '2': () => { if (studyAreaRef.current?.isFlipped()) handleRate('got') },
    's': () => { handleShuffle() },
    'f': () => { setFocusMode(v => !v) },
    '?': () => setShowShortcutsHelp(v => !v),
  }, !deckOpen && !moreOpen && !popupOpen && !showShortcutsHelp && !showSessionSummary && cards.length > 0)

  // Reset tracked popup name when popup closes
  useEffect(() => {
    if (!popupOpen) prevPopupNameRef.current = null
  }, [popupOpen])

  // Cancel any in-flight "Clear completed" animation timer on unmount.
  useEffect(() => () => { clearTimersRef.current.forEach(clearTimeout) }, [])

  // Follow the concept reader: when it moves to a concept in the deck, the
  // card behind it moves too.
  useEffect(() => {
    if (!popupCurrentName || popupCurrentName === prevPopupNameRef.current) return
    prevPopupNameRef.current = popupCurrentName
    const latest = orderedCardsRef.current
    const idx = latest.findIndex(c => c.name.toLowerCase() === popupCurrentName.toLowerCase())
    if (idx >= 0) setActiveIndex(idx)
    setFlashingCard(popupCurrentName)
    const clearId = setTimeout(() => setFlashingCard(null), 1700)
    return () => clearTimeout(clearId)
  }, [popupCurrentName, setActiveIndex])

  // concept name → exam label: the exam a card was added from, else the first
  // syllabus listing it — the exams on the add-sheet's shelf (being studied
  // first, then up the ladder) ahead of the rest. See deckExamLabels.
  const conceptToExam = useMemo(() => {
    const shelf = flashcardShelfExams(syllabi, examProgress, examVariants)
    const onShelf = new Set(shelf)
    return deckExamLabels(cards, [...shelf, ...syllabi.filter(s => !onShelf.has(s))])
  }, [cards, syllabi, examProgress, examVariants])

  // exam label → concept name → syllabus position { topicIndex, conceptIndex },
  // for ordering a card within the exam it is filed under.
  const conceptSyllabusPosition = useMemo(() => {
    const byExam = new Map<string, Map<string, { topicIndex: number; conceptIndex: number }>>()
    for (const s of syllabi) {
      if (byExam.has(s.examLabel)) continue
      const map = new Map<string, { topicIndex: number; conceptIndex: number }>()
      s.topics.forEach((topic, topicIndex) => {
        topic.concepts.forEach((c, conceptIndex) => {
          const key = c.name.toLowerCase()
          if (!map.has(key)) map.set(key, { topicIndex, conceptIndex })
        })
      })
      byExam.set(s.examLabel, map)
    }
    return byExam
  }, [syllabi])

  // concept name → best mastery state
  const conceptMasteryMap = useMemo(() => latestMasteryStates(masteryRecords, new Date()), [masteryRecords])

  // Sync customOrder when new cards are added
  useEffect(() => {
    const inOrder = new Set(customOrder.map(n => n.toLowerCase()))
    const missing = cards.filter(c => !inOrder.has(c.name.toLowerCase())).map(c => c.name)
    if (missing.length > 0) setCustomOrder([...customOrder, ...missing])
  }, [cards, customOrder, setCustomOrder])

  // Ordered flat list
  const orderedCards = useMemo((): FlashCard[] => {
    if (groupBy === 'shuffle' || groupBy === 'custom') {
      const order = groupBy === 'shuffle' ? shuffleOrder : customOrder
      const nameToCard = new Map(cards.map(c => [c.name.toLowerCase(), c]))
      const ordered: FlashCard[] = []
      for (const name of order) {
        const card = nameToCard.get(name.toLowerCase())
        if (card) ordered.push(card)
      }
      for (const card of cards) {
        if (!ordered.some(c => c.name.toLowerCase() === card.name.toLowerCase())) ordered.push(card)
      }
      return ordered
    }
    // 'exam': sort by exam label (Other last), then by syllabus order within group
    return [...cards].sort((a, b) => {
      const ea = conceptToExam.get(a.name.toLowerCase()) ?? 'Other'
      const eb = conceptToExam.get(b.name.toLowerCase()) ?? 'Other'
      if (ea === 'Other' && eb !== 'Other') return 1
      if (ea !== 'Other' && eb === 'Other') return -1
      if (ea !== eb) return ea.localeCompare(eb)
      const positions = conceptSyllabusPosition.get(ea)
      const pa = positions?.get(a.name.toLowerCase())
      const pb = positions?.get(b.name.toLowerCase())
      if (pa && pb) {
        if (pa.topicIndex !== pb.topicIndex) return pa.topicIndex - pb.topicIndex
        return pa.conceptIndex - pb.conceptIndex
      }
      return a.name.localeCompare(b.name)
    })
  }, [cards, customOrder, groupBy, conceptToExam, conceptSyllabusPosition, shuffleOrder])

  orderedCardsRef.current = orderedCards

  // Derived, not stored: re-point at the named active card on every re-sort so
  // the deck can be reordered under the reader without swapping their card.
  const activeIndex = resolveActiveIndex(
    orderedCards.map(c => c.name),
    activeName,
    lastIndexRef.current,
  )
  lastIndexRef.current = activeIndex
  const activeCard: FlashCard | undefined = orderedCards[activeIndex]

  // Focus mode's scroller outlives the card on it, so a new card would open
  // wherever the last one was left — start each one at its top.
  const focusScrollRef = useRef<HTMLDivElement>(null)
  const activeCardName = activeCard?.name
  useEffect(() => {
    focusScrollRef.current?.scrollTo({ top: 0 })
  }, [activeCardName])

  const completedCount = useMemo(() => cards.filter(c => c.completedAt).length, [cards])

  // "Practice this": a quiz on the card's concept, when the bank has questions
  // on it — the concept reader's own button and count.
  const practiceConcept = activeCard?.kind === 'concept' ? activeCard.name : null
  const practiceCount = useConceptQuestionCount(practiceConcept)

  // Shuffle is a switch: on draws a fresh order, off goes back to the order
  // the deck was in.
  function handleShuffle() {
    if (groupBy === 'shuffle') {
      setGroupBy(beforeShuffleRef.current)
      resetActiveIndex()
      return
    }
    beforeShuffleRef.current = groupBy
    playSound('shuffle')
    setShuffleOrder(shuffled(cards.map(c => c.name)))
    setGroupBy('shuffle')
    resetActiveIndex()
  }

  // Rate a card and advance to the next unfinished one, wrapping around the
  // deck. "Got it" marks it complete; "Again" tallies a lapse (and
  // un-completes a previously finished card that has slipped). Once nothing is
  // left unfinished, the session summary takes over.
  function applyRating(rating: StudyRating, card: FlashCard, index: number) {
    // "Got it" is a right answer like any other — and a run of them climbs in
    // pitch. "Again" is not a mistake, so it keeps the plain press cue the
    // delegated listener already gives it, but it does end the run.
    if (rating === 'got') playSound('correct')
    if (rating === 'again') {
      resetSoundCombo('correct')
      setAgainCounts(m => ({ ...m, [card.name]: (m[card.name] ?? 0) + 1 }))
      if (card.completedAt) toggleCompleted(card.name)
    } else if (!card.completedAt) {
      toggleCompleted(card.name)
    }
    const completedFlags = orderedCards.map((c, i) =>
      i === index ? rating === 'got' : !!c.completedAt)
    const next = nextIncompleteIndex(completedFlags, index)
    if (next === -1) {
      setShowSessionSummary(true)
      // Let the arpeggio for this last card ring before the session fanfare.
      window.setTimeout(() => playSound('complete'), 380)
    } else if (next === index) {
      // Sole unfinished card: the index can't change, so flip it back over for
      // another pass instead.
      studyAreaRef.current?.flip()
    } else {
      setActiveIndex(next)
    }
  }

  function handleRate(rating: StudyRating) {
    const card = orderedCards[activeIndex]
    if (!card) return
    applyRating(rating, card, activeIndex)
  }

  // Navigate to and flash a card when arriving via the ?highlight= URL param.
  // Must be after orderedCards so the dep array re-fires when sort order changes
  // (e.g. conceptToExam populates after syllabi load, reordering cards by exam).
  useEffect(() => {
    if (!highlightName) return
    const idx = orderedCards.findIndex(c => c.name.toLowerCase() === highlightName.toLowerCase())
    if (idx < 0) return
    setActiveIndex(idx)
    const timerId = setTimeout(() => {
      setFlashingCard(highlightName)
      if (flashTimerRef.current) clearTimeout(flashTimerRef.current)
      flashTimerRef.current = setTimeout(() => {
        setFlashingCard(null)
        setSearchParams(prev => {
          const next = new URLSearchParams(prev)
          next.delete('highlight')
          return next
        }, { replace: true })
      }, 1700)
    }, 100)
    return () => clearTimeout(timerId)
  }, [highlightName, orderedCards, setSearchParams, setActiveIndex])

  // Arriving with ?view=deck — from tapping the "Added to Deck" confirmation —
  // opens the Deck popup so the cards just added are what you land on. The
  // param is consumed immediately so a later Back/refresh doesn't reopen it.
  useEffect(() => {
    if (!opensDeck(viewParam)) return
    if (cards.length > 0) setDeckOpen(true)
    setSearchParams(prev => {
      const next = new URLSearchParams(prev)
      next.delete('view')
      return next
    }, { replace: true })
  }, [viewParam, cards.length, setSearchParams])

  function handleDragEnd(event: DragEndEvent) {
    const { active, over } = event
    if (!over || active.id === over.id) return
    const oldIdx = orderedCards.findIndex(c => c.name === active.id)
    const newIdx = orderedCards.findIndex(c => c.name === over.id)
    if (oldIdx === -1 || newIdx === -1) return
    const reordered = arrayMove(orderedCards, oldIdx, newIdx)
    setCustomOrder(reordered.map(c => c.name))
    setGroupBy('custom')
    // No index fix-up needed: the active card is tracked by name, so it follows
    // itself into its new slot.
  }

  // Go to a card by name — how the Deck popup reaches one. The deck is
  // addressed by name everywhere else too (the `?highlight=` param, the active
  // card), because a position follows the slot and not the card.
  function goToCardByName(name: string) {
    const idx = orderedCards.findIndex(c => c.name.toLowerCase() === name.toLowerCase())
    if (idx < 0) return
    setActiveIndex(idx)
    setFlashingCard(name)
    if (flashTimerRef.current) clearTimeout(flashTimerRef.current)
    flashTimerRef.current = setTimeout(() => setFlashingCard(null), 1700)
  }

  // The foot, measured for whatever else is parked on the bottom edge — the
  // "Return to quiz" pill rides above it (style guide §5.1).
  const footerRef = useRef<HTMLDivElement>(null)
  useActionBarHeight(footerRef, cards.length > 0)

  // No cards yet: the same top row, one sentence and the way to add some.
  if (cards.length === 0 || !activeCard) {
    return (
      <>
        <div className={cn(GROUND, 'min-h-dvh')}>
          <div className="mx-auto w-full max-w-xl px-5 pb-16 pt-3">
            <PracticeHeader title="Flashcards" />
            <div className="flex flex-col items-center gap-6 pt-24 text-center">
              <p className="text-[17px]">Your deck is empty.</p>
              <Button size="main" data-tour="add-flashcards-btn" onClick={openSheet}>
                <Plus className="h-5 w-5" strokeWidth={2.5} aria-hidden="true" />
                Add cards
              </Button>
            </div>
          </div>
        </div>
        <ConceptPopup />
      </>
    )
  }

  // "Clear completed" — open the deck and play a brief disappear animation on
  // the finished cards, then take them out. Shared by the end-of-session
  // summary, the More menu and the Deck popup's own button so the clear always
  // reads as a deliberate, visible action.
  function handleClearCompleted() {
    // Visual order (not insertion order) so the sweep reads top-to-bottom the
    // same way the deck is laid out on screen.
    const names = orderedCards.filter(c => c.completedAt).map(c => c.name.toLowerCase())
    if (names.length === 0) return
    setShowSessionSummary(false)
    setDeckOpen(true)
    clearTimersRef.current.forEach(clearTimeout)
    clearTimersRef.current = []
    // Each sweep starts its own climb, so the first card off a deck of two
    // sounds the same as the first card off a deck of twenty.
    resetSoundCombo('fileAway')
    // Start the cards in turn — faster than they finish, so their animations
    // overlap into a cascade. Each name is added (never removed) so a card
    // that's finished its own animation stays gone (`.flashcard-clearing` and
    // friends are all fill-mode `both`) while the wave rolls on behind it.
    const stagger = clearStaggerFor(names.length)
    names.forEach((name, i) => {
      const timer = setTimeout(() => {
        playSound('fileAway')
        setClearingNames(prev => new Set(prev).add(name))
      }, i * stagger)
      clearTimersRef.current.push(timer)
    })
    const finalTimer = setTimeout(() => {
      clearCompleted()
      setClearingNames(new Set())
      setAgainCounts({})
      resetActiveIndex()
    }, (names.length - 1) * stagger + CLEAR_CARD_MS)
    clearTimersRef.current.push(finalTimer)
  }

  function handleStudyAgain() {
    resetCompleted()
    if (groupBy === 'shuffle') setShuffleOrder(shuffled(cards.map(c => c.name)))
    setAgainCounts({})
    setShowSessionSummary(false)
    resetActiveIndex()
  }

  function closeFocusFromBackdrop(e: React.MouseEvent) {
    if (e.target === e.currentTarget) setFocusMode(false)
  }

  const position = `${activeIndex + 1} of ${orderedCards.length}`
  const cardSegments = orderedCards.length <= MAX_CARD_SEGMENTS
    ? orderedCards.map((c, i) => ({ start: i + 1, label: c.name }))
    : undefined

  return (
    <div className={cn(GROUND, 'min-h-dvh')}>
      {/* The top row and the bar under it. Focus mode covers both. */}
      {!focusMode && (
        <div className="mx-auto w-full max-w-xl px-5 pt-3">
          <PracticeHeader title="Flashcards">
            <div className="flex shrink-0 items-center gap-2">
              <button
                type="button"
                data-testid="flashcards-deck"
                data-sound="open"
                aria-haspopup="dialog"
                aria-label={`Deck, ${deckCountLabel(orderedCards.length)}`}
                onClick={() => setDeckOpen(true)}
                className={cn(PRACTICE_HEADER_BUTTON, 'w-auto px-4 text-[15px] font-semibold')}
              >
                Deck
              </button>
              <button
                type="button"
                data-tour="add-flashcards-btn"
                aria-label="Add cards"
                title="Add cards"
                onClick={openSheet}
                className={PRACTICE_HEADER_BUTTON}
              >
                <Plus className="h-5 w-5" strokeWidth={2.5} aria-hidden="true" />
              </button>
              <button
                type="button"
                aria-label="More"
                title="More"
                aria-haspopup="dialog"
                onClick={() => setMoreOpen(true)}
                className={PRACTICE_HEADER_BUTTON}
              >
                <MoreHorizontal className="h-5 w-5" strokeWidth={2.5} aria-hidden="true" />
              </button>
            </div>
          </PracticeHeader>
          <NavProgressBar
            className="mt-[18px]"
            current={activeIndex + 1}
            total={orderedCards.length}
            label={`Card ${position}`}
            onScrub={next => setActiveIndex(next - 1)}
            formatValue={n => orderedCards[n - 1]?.name ?? `${n} of ${orderedCards.length}`}
            segments={cardSegments}
            trackClassName="rounded-full bg-border"
            fillClassName="rounded-full bg-foreground dark:bg-foreground"
            segmentClassName="rounded-full bg-border"
          />
        </div>
      )}

      {/* Focus mode: the card alone on the ground. Clicking the ground leaves it. */}
      {focusMode && (
        <div
          className="fixed inset-0 z-[55] bg-ground"
          onClick={() => setFocusMode(false)}
        />
      )}
      {focusMode && (
        <button
          type="button"
          onClick={() => setFocusMode(false)}
          className={cn(PRACTICE_HEADER_BUTTON, 'fixed right-4 top-3 z-[60] bg-ground')}
          title="Exit focus mode (Esc)"
          aria-label="Exit focus mode"
        >
          <X className="h-5 w-5" aria-hidden="true" />
        </button>
      )}

      {/* Focus mode locks the page (the backdrop covers it), so the card brings
          its own scroller: a revealed card is often taller than a phone
          screen, and in normal flow under a locked body it could never be
          scrolled to its end. A tap on the scroller's empty space — not on
          the card, and not on anything the card portals out — still closes
          focus mode, as the backdrop beneath it does. */}
      <div
        ref={focusScrollRef}
        className={focusMode ? 'fixed inset-0 z-[56] overflow-y-auto overscroll-contain' : undefined}
        onClick={focusMode ? closeFocusFromBackdrop : undefined}
      >
        <div
          className={cn('mx-auto w-full max-w-xl px-5 pb-40', focusMode ? 'pt-[68px]' : 'pt-[18px]')}
          style={popupOpen ? { paddingBottom: 'calc(var(--concept-split-height, 50vh) + 1.5rem)' } : undefined}
          onClick={focusMode ? closeFocusFromBackdrop : undefined}
        >
          <FlashcardStudyArea
            ref={studyAreaRef}
            cards={orderedCards}
            index={activeIndex}
            level={conceptMasteryMap.get(activeCard.name.toLowerCase()) ?? 'new'}
            isFlashing={flashingCard?.toLowerCase() === activeCard.name.toLowerCase()}
            reverseCardModes={reverseCardModes}
            defaultFlipped={globalFlip}
            onNext={() => setActiveIndex(i => Math.min(i + 1, orderedCards.length - 1))}
            onPrev={() => setActiveIndex(i => Math.max(i - 1, 0))}
            hasNext={activeIndex < orderedCards.length - 1}
            hasPrev={activeIndex > 0}
            onRate={handleRate}
            isCompleted={!!activeCard.completedAt}
          />
        </div>
      </div>

      <ConceptPopup />

      {showShortcutsHelp && (
        <KeyboardShortcutsHelp
          context="flashcards"
          onClose={() => setShowShortcutsHelp(false)}
        />
      )}

      {showSessionSummary && (
        <StudySessionSummaryDialog
          cardNames={orderedCards.map(c => c.name)}
          againCounts={againCounts}
          onClearCompleted={handleClearCompleted}
          onStudyAgain={handleStudyAgain}
          onClose={() => setShowSessionSummary(false)}
        />
      )}

      {/* The foot is the concept reader's: Previous, Practice this, Next. A
          card whose concept has no questions shows its place in the deck where
          the button would be. Focus mode dims it until it is reached for. */}
      <div
        ref={footerRef}
        data-testid="flashcards-foot"
        className={cn(
          'fixed bottom-0 left-0 right-0 bg-ground lg:left-[var(--sidebar-width)]',
          focusMode ? 'z-[57] opacity-30 transition-opacity duration-300 focus-within:opacity-100 hover:opacity-100' : 'z-[46]',
        )}
      >
        <div className="mx-auto flex w-full max-w-xl items-center gap-2.5 px-5 pb-[max(1.5rem,env(safe-area-inset-bottom))] pt-3">
          <button
            type="button"
            disabled={activeIndex === 0}
            data-sound="ruffle"
            aria-label="Previous card"
            title="Previous card"
            onClick={() => setActiveIndex(activeIndex - 1)}
            className={FOOT_ARROW}
          >
            <ChevronLeft className="h-[22px] w-[22px]" strokeWidth={2.5} aria-hidden="true" />
          </button>
          {practiceConcept && practiceCount ? (
            <PracticeButton
              to={conceptPracticeUrl(practiceConcept)}
              concept={practiceConcept}
              className="flex-1"
            >
              Practice
            </PracticeButton>
          ) : (
            <span className="flex-1 text-center text-base font-semibold tabular-nums" data-testid="flashcards-position">
              {position}
            </span>
          )}
          <button
            type="button"
            disabled={activeIndex === orderedCards.length - 1}
            data-sound="ruffle"
            aria-label="Next card"
            title="Next card"
            onClick={() => setActiveIndex(activeIndex + 1)}
            className={FOOT_ARROW}
          >
            <ChevronRight className="h-[22px] w-[22px]" strokeWidth={2.5} aria-hidden="true" />
          </button>
        </div>
      </div>

      {deckOpen && (
        <DeckPopup
          cards={orderedCards}
          activeName={activeCard.name}
          levels={conceptMasteryMap}
          clearingNames={clearingNames}
          onSelect={goToCardByName}
          onRemove={removeCard}
          onDragEnd={handleDragEnd}
          onClearCompleted={handleClearCompleted}
          onRemoveAll={() => { clearCards(); setDeckOpen(false) }}
          onClose={() => setDeckOpen(false)}
        />
      )}

      {moreOpen && (
        <FlashcardsMoreMenu
          onClose={() => setMoreOpen(false)}
          conceptName={activeCard.name}
          onRead={() => useConceptPopup.getState().openAt(orderedCards, activeIndex)}
          shuffled={groupBy === 'shuffle'}
          onShuffle={handleShuffle}
          backFirst={globalFlip}
          onBackFirst={() => setGlobalFlip(v => !v)}
          backParts={reverseCardModes}
          onBackPart={part => setReverseCardModes(prev => toggleBackPart(prev, part))}
          onFocus={() => setFocusMode(true)}
          completedCount={completedCount}
          onClearCompleted={handleClearCompleted}
          onStudyAgain={handleStudyAgain}
          onRemove={() => removeCard(activeCard.name)}
          onShortcuts={() => setShowShortcutsHelp(true)}
        />
      )}
    </div>
  )
}
