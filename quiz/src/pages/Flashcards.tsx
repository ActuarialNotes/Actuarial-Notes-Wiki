import { createContext, forwardRef, useCallback, useContext, useEffect, useImperativeHandle, useMemo, useRef, useState, type ReactNode } from 'react'
import { Link, useNavigate, useSearchParams } from 'react-router-dom'
import {
  BookOpen,
  Check,
  CheckCircle2,
  ChevronDown,
  ChevronLeft,
  ChevronRight,
  ChevronUp,
  Eye,
  Headphones,
  Images,
  Keyboard,
  LayoutGrid,
  Layers,
  Loader2,
  Lock,
  Maximize2,
  Minus,
  Play,
  Plus,
  RotateCcw,
  Search,
  Sigma,
  Trash2,
  TrendingUp,
  X,
} from 'lucide-react'
import {
  DndContext,
  closestCenter,
  MouseSensor,
  TouchSensor,
  useSensor,
  useSensors,
  type DragEndEvent,
} from '@dnd-kit/core'
import {
  arrayMove,
  SortableContext,
  useSortable,
  rectSortingStrategy,
} from '@dnd-kit/sortable'
import { CSS } from '@dnd-kit/utilities'
import { useFlashcards, type FlashCard } from '@/hooks/useFlashcards'
import { useCollectedCards } from '@/hooks/useCollectedCards'
import { useCollect } from '@/hooks/useCollect'
import { showAddedToDeck } from '@/hooks/useToast'
import { useWikiSyllabus } from '@/hooks/useWikiSyllabus'
import { useConceptMastery } from '@/hooks/useConceptMastery'
import { useConceptPopup } from '@/hooks/useConceptPopup'
import { useStudyPlan } from '@/hooks/useStudyPlan'
import { useExamProgress } from '@/contexts/ExamProgressContext'
import { fetchWikiFile } from '@/lib/github'
import { entryRefToRepoPath, wikiRoute } from '@/lib/wikiRoutes'
import type { WikiEntryRef } from '@/lib/wikiRoutes'
import { decayIfStale, type ConceptMasteryRecord, type MasteryState } from '@/lib/mastery'
import { isKeystone } from '@/lib/keystone'
import {
  needsReviewOrder,
  nextIncompleteIndex,
  resolveActiveIndex,
  shouldLockPageScroll,
  shuffled,
  summarizeSession,
  type StudyRating,
} from '@/lib/flashcardStudy'
import { buildCollectedList } from '@/lib/collectedList'
import { wikiExamIdToProgressKey, type WikiExamSyllabus } from '@/lib/wikiParser'
import { matchesSelectedVariant } from '@/data/examSittings'
import { Button } from '@/components/ui/button'
import { WikiArticle, stripFrontmatter, extractMathBlockquotes, extractImages } from '@/components/wiki/WikiArticle'
import { ConceptPopup } from '@/components/wiki/ConceptPopup'
import { ConceptQuestionsModal } from '@/components/wiki/ConceptQuestionsModal'
import { LearningProgressModal } from '@/components/wiki/LearningProgressModal'
import { trackFlashcardReviewed } from '@/lib/analytics'
import { playSound, resetSoundCombo } from '@/lib/soundEngine'
import { usePageKeyboard } from '@/hooks/useKeyboard'
import { KeyboardShortcutsHelp } from '@/components/KeyboardShortcutsHelp'
import { NavProgressBar } from '@/components/NavProgressBar'
import { flashcardFoilClass, FOIL_LEVEL_CLASS } from '@/lib/flashcardFoil'
import { MASTERY_LABEL } from '@/lib/masteryBadge'

type GroupBy = 'exam' | 'date' | 'alpha' | 'custom' | 'mastery' | 'shuffle'
type ReverseCardSection = 'definition' | 'math' | 'images'

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

// The layers of a card's clear animation — the line racing round the border,
// the disc of green flooding out from the middle, the halo the filled card
// glows with, and the checkmark stroked over the top. Identical on both faces
// of the card; the shared timeline lives in index.css. Each is its own element
// so that every one of them can animate a transform or an opacity and nothing
// has to repaint mid-sweep.
//
// The four are gathered under one `.flashcard-clear-body` because that wrapper
// is what implodes at the end — a single transform collapses the finished card
// to a point. The burst of little "gone" lines is deliberately *outside* it, so
// it is still full size when the thing it came from has shrunk away to nothing.
const CLEAR_OVERLAY = (
  <>
    <span className="flashcard-clear-body" aria-hidden="true">
      <svg className="flashcard-clear-ring" width="100%" height="100%" aria-hidden="true">
        <rect width="100%" height="100%" rx="11" pathLength="100" />
      </svg>
      <span className="flashcard-clear-glow" />
      <span className="flashcard-clear-wash"><span /></span>
      <svg className="flashcard-clear-check" viewBox="0 0 24 24">
        <path d="M4 12.5 L9.5 18 L20 6.5" />
      </svg>
    </span>
    {/* Eight strokes flicking outward from where the card was. One element, one
        transform: the whole puff is a single scale+fade of this SVG. */}
    <svg className="flashcard-clear-burst" viewBox="0 0 48 48" aria-hidden="true">
      {/* Four long spokes on the axes, four shorter and thinner on the
          diagonals — an even ring reads as a wheel, an uneven one as a puff. */}
      <path d="M34 24 H44 M14 24 H4 M24 14 V4 M24 34 V44" />
      <path
        className="flashcard-clear-burst-short"
        d="M30.4 17.6 L34.6 13.4 M17.6 17.6 L13.4 13.4 M30.4 30.4 L34.6 34.6 M17.6 30.4 L13.4 34.6"
      />
    </svg>
  </>
)


const BREADCRUMB_RE = /^\[\[[^\]|]*(?:\|[^\]]+)?\]\][^\n]* \/ [^\n]*\n?/

// Splits a wiki page's leading paragraph (the "definition") from the rest of
// the body, so the two can be shown separately without duplicating it — e.g.
// the flashcard back shows the definition, and the "expand" section below it
// shows only what follows.
function splitFirstParagraph(markdown: string): { paragraph: string; rest: string } {
  const cleaned = stripFrontmatter(markdown).replace(BREADCRUMB_RE, '')
  const lines = cleaned.split('\n')
  const paragraphLines: string[] = []
  let started = false
  let restStart = lines.length
  for (let i = 0; i < lines.length; i++) {
    const trimmed = lines[i].trim()
    if (!started) {
      if (trimmed && !trimmed.startsWith('#') && !/^[*+-] /.test(trimmed) && !/^\d+\. /.test(trimmed) && !trimmed.startsWith('>')) {
        started = true
        paragraphLines.push(trimmed)
      }
    } else {
      if (trimmed === '' || /^[*+-] /.test(trimmed) || /^\d+\. /.test(trimmed) || trimmed.startsWith('>') || trimmed.startsWith('#')) {
        restStart = i
        break
      }
      paragraphLines.push(trimmed)
    }
  }
  return { paragraph: paragraphLines.join('\n'), rest: lines.slice(restStart).join('\n') }
}

function extractFirstParagraph(markdown: string): string {
  return splitFirstParagraph(markdown).paragraph
}

function withoutFirstParagraph(markdown: string): string {
  return splitFirstParagraph(markdown).rest
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
// collected these" to "put them in my deck". Today's study plan is the first
// section of the selected exam's shelf (see TodayStudyPlanSection).
function PacksContent({ onCardsAdded }: { onCardsAdded?: () => void } = {}) {
  const { syllabi, loading: syllabiLoading } = useWikiSyllabus()
  const { records: masteryRecords, loading: masteryLoading } = useConceptMastery()
  const { progress: examProgress, examVariants } = useExamProgress()
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
  const packMasteryMap = useMemo(() => {
    const map = new Map<string, MasteryState>()
    const now = new Date()
    const best = new Map<string, typeof masteryRecords[number]>()
    for (const r of masteryRecords) {
      const slug = r.concept_slug.toLowerCase()
      const existing = best.get(slug)
      if (!existing || (r.last_attempted_at ?? '') > (existing.last_attempted_at ?? '')) {
        best.set(slug, r)
      }
    }
    for (const [slug, r] of best) {
      map.set(slug, decayIfStale(r, now).state)
    }
    return map
  }, [masteryRecords])
  const masteryOf = useCallback(
    (name: string) => packMasteryMap.get(name.toLowerCase()) ?? 'new',
    [packMasteryMap],
  )

  const inProgressSyllabi = useMemo(
    () => syllabi.filter(s => {
      const key = wikiExamIdToProgressKey(s.examId)
      return examProgress[key] === 'in_progress' && matchesSelectedVariant(key, s.examId, examVariants[key])
    }),
    [syllabi, examProgress, examVariants],
  )

  // One group per exam (fallbacks to P and FM when nothing is in progress),
  // each with the whole-exam concept list plus its learning-objective packs.
  const examGroups = useMemo(() => {
    const source: typeof inProgressSyllabi = inProgressSyllabi.length === 0
      ? (['P-1', 'FM-2']
          .map(id => syllabi.find(s => s.examId === id))
          .filter((s): s is typeof syllabi[number] => !!s)
          .filter(s => examProgress[wikiExamIdToProgressKey(s.examId)] !== 'completed'))
      : inProgressSyllabi
    return source.map(syllabus => ({
      examId: syllabus.examId,
      examLabel: syllabus.examLabel,
      syllabus,
      allConcepts: syllabus.topics.flatMap(t => t.concepts.map(c => c.name)),
      learningObjectives: syllabus.topics
        .filter(t => t.concepts.length > 0)
        .map(t => ({ name: t.name, concepts: t.concepts.map(c => c.name) })),
    }))
  }, [inProgressSyllabi, syllabi, examProgress])

  // The "Collected" filter's shelf: only what the learner has unlocked, newest
  // first, as individual cards rather than packs.
  const collectedConcepts = useMemo(
    () => buildCollectedList(syllabi, collectedCards),
    [syllabi, collectedCards],
  )
  const hasCollected = collectedConcepts.length > 0

  // Which filter's packs are on screen. Kept as an id (not an index) so it
  // survives the groups being rebuilt, and clamped back to the first group
  // whenever the selection disappears (e.g. the exam was marked completed, or
  // the last collected card was removed).
  const [selectedId, setSelectedId] = useState<string | null>(null)
  const activeId =
    (selectedId === COLLECTED_FILTER_ID && hasCollected ? COLLECTED_FILTER_ID : null)
    ?? examGroups.find(g => g.examId === selectedId)?.examId
    ?? examGroups[0]?.examId
    ?? (hasCollected ? COLLECTED_FILTER_ID : null)
  const showCollected = activeId === COLLECTED_FILTER_ID
  const activeGroup = showCollected ? null : examGroups.find(g => g.examId === activeId) ?? null

  const isLoading = masteryLoading || syllabiLoading
  const hasContent = examGroups.length > 0 || hasCollected

  return (
    <div className="space-y-4">
      {/* Exam filter — the Dashboard's exam header, same pill strip and same
          active/inactive treatment, so switching exams feels identical in both
          places. Sticky to the top of the sheet's scroll area; the negative
          margins let the background span the container's padding. */}
      {(examGroups.length > 0 || hasCollected) && (
        <div className="sticky top-0 z-10 -mx-4 sm:-mx-6 -mt-4 px-4 sm:px-6 pt-4 pb-1.5 bg-background/95 backdrop-blur-sm">
          <div className="exam-tab-strip flex min-w-0 gap-1.5 overflow-x-auto">
            {examGroups.map(group => (
              <button
                key={group.examId}
                type="button"
                onClick={() => setSelectedId(group.examId)}
                className={`shrink-0 h-10 px-4 rounded-full text-base font-semibold transition-colors ${
                  group.examId === activeId
                    ? 'bg-primary text-primary-foreground'
                    : 'bg-transparent text-muted-foreground hover:text-foreground'
                }`}
              >
                {group.examLabel}
              </button>
            ))}
            {/* Cross-exam, so it trails the exams rather than joining them. */}
            {hasCollected && (
              <button
                type="button"
                onClick={() => setSelectedId(COLLECTED_FILTER_ID)}
                className={`shrink-0 h-10 px-4 rounded-full text-base font-semibold transition-colors inline-flex items-center gap-1.5 ${
                  showCollected
                    ? 'bg-primary text-primary-foreground'
                    : 'bg-transparent text-muted-foreground hover:text-foreground'
                }`}
              >
                Collected
                <span className={`text-xs tabular-nums ${showCollected ? 'opacity-80' : 'opacity-70'}`}>
                  {collectedConcepts.length}
                </span>
              </button>
            )}
          </div>
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
          No cards available yet. Mark an exam as in progress on the{' '}
          <Link to="/dashboard" className="text-primary hover:underline">Dashboard</Link>.
        </p>
      )}
    </div>
  )
}

// ─── Card shelves ────────────────────────────────────────────────────────────

// The foil material a collected tile wears, keyed to its mastery — the same
// ladder the deck gallery's cards use (`SortableCard`), one step per state, so
// the border alone says what level a card is at (`lib/flashcardFoil.ts`). An
// uncollected card is still behind the gate and has earned no material at all.
// `.flashcard-tile` in index.css tunes the ring for the smaller surface and
// lifts it over the tile's own content.
function tileFoilClass(collected: boolean, state: MasteryState): string {
  return flashcardFoilClass(collected, state, { tile: true })
}

// The unit both shelves below are built from: one concept as a small static
// tile. Four across on the narrowest phone, so a screenful is ~20 cards and a
// whole learning objective can be taken in at a glance — and deliberately
// static: this is a picker, not a study surface, so a tile never flips. Tapping
// one puts the card in the deck, tapping it again takes it back out.
//
// Colour is state only: the green wash and tick are "already in your deck", and
// the padlock is "not collected yet".
//
// Mastery is the **foil** edge alone — the same rainbow border the card wears in
// the deck gallery, scaled by level (see `tileFoilClass` above) — so one card
// looks like the same card wherever it is shown, and the level is read off one
// material rather than off a second, competing colour.
function ConceptCardGrid({
  concepts,
  masteryOf,
  isCollected,
  onCardsAdded,
}: {
  concepts: string[]
  masteryOf: (name: string) => MasteryState
  isCollected: (name: string) => boolean
  onCardsAdded?: () => void
}) {
  const { addCard, removeCard, hasCard } = useFlashcards()

  function toggle(name: string) {
    if (hasCard(name)) { removeCard(name); return }
    playSound('addToDeck')
    addCard({ kind: 'concept', name })
    showAddedToDeck(1)
    onCardsAdded?.()
  }

  return (
    <div className="grid grid-cols-4 sm:grid-cols-6 lg:grid-cols-8 gap-2">
      {concepts.map(name => {
        const added = hasCard(name)
        const collected = isCollected(name)
        // "In deck" is the green wash and the tick; the green ring only appears
        // on a card wearing no foil, since one border carries one material
        // (docs/style-guide.md §4.3 — the edge belongs to foil).
        const deckClass = added
          ? `bg-green-500/15${collected ? '' : ' ring-1 ring-inset ring-green-600/50 dark:ring-green-500/50'}`
          : 'bg-card hover:bg-accent'
        return (
          <button
            key={name}
            type="button"
            data-sound="none"
            onClick={() => toggle(name)}
            aria-pressed={added}
            title={`${name}${collected ? '' : ' — not collected yet'} — ${added ? 'in your deck (tap to remove)' : 'tap to add to your deck'}`}
            aria-label={added ? `Remove ${name} from your deck` : `Add ${name} to your deck`}
            className={`relative flex aspect-[4/5] items-center justify-center overflow-hidden rounded-md p-1.5 text-center transition-colors ${tileFoilClass(collected, masteryOf(name))} ${deckClass}`}
          >
            <span
              className={`text-[10px] font-medium leading-[1.2] break-words line-clamp-5 ${
                collected ? '' : 'text-muted-foreground'
              } ${isKeystone(name) ? 'keystone-underline' : ''}`}
            >
              {name}
            </span>
            {added && (
              <Check className="absolute top-1 right-1 h-3 w-3 text-green-600 dark:text-green-400" aria-hidden="true" />
            )}
            {!collected && (
              <Lock className="absolute top-1 left-1 h-2.5 w-2.5 text-muted-foreground/70" aria-hidden="true" />
            )}
          </button>
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
}: {
  concepts: string[]
  isCollected: (name: string) => boolean
  onCardsAdded?: () => void
}) {
  const { addCard, hasCard } = useFlashcards()

  const total = concepts.length
  const collected = concepts.filter(n => isCollected(n)).length
  const notAdded = concepts.filter(n => !hasCard(n))
  const inDeck = total - notAdded.length

  function addAll() {
    for (const name of notAdded) addCard({ kind: 'concept', name })
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
}) {
  const { addCard, hasCard } = useFlashcards()

  const missing = concepts.filter(n => !hasCard(n))
  const collected = concepts.filter(n => isCollected(n)).length
  const showCounts = !loading && concepts.length > 0

  function addMissing() {
    for (const name of missing) addCard({ kind: 'concept', name })
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
// it always describes the shelf below it. A hairline separates it from the
// syllabus proper.
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

  const concepts = useMemo(() => {
    if (!plan) return []
    return plan.status === 'review_mode' ? plan.reviewConcepts : plan.todaysConcepts
  }, [plan])

  return (
    <ShelfSection
      title="Today's Study Plan"
      concepts={concepts}
      loading={planLoading || masteryLoading}
      masteryOf={masteryOf}
      isCollected={isCollected}
      onCardsAdded={onCardsAdded}
      className="pb-5 border-b border-border"
      emptyHint={
        <p className="text-xs text-muted-foreground py-1">
          {plan?.config?.targetReadyDate ? (
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
  allConcepts: string[]
  learningObjectives: { name: string; concepts: string[] }[]
}

// An exam's shelf. The same tiles as the Collected shelf, grouped under today's
// study plan and then the exam's learning objectives — the syllabus structure
// the pack cards carried survives the switch from packs to cards, and each
// section keeps its own "add what's missing" action.
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
  return (
    <div className="space-y-5">
      <ShelfSummary concepts={group.allConcepts} isCollected={isCollected} onCardsAdded={onCardsAdded} />
      <TodayStudyPlanSection
        syllabus={group.syllabus}
        masteryRecords={masteryRecords}
        masteryLoading={masteryLoading}
        masteryOf={masteryOf}
        isCollected={isCollected}
        onCardsAdded={onCardsAdded}
      />
      {group.learningObjectives.map(lo => (
        <ShelfSection
          key={lo.name}
          title={lo.name}
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
// file), not by the button that opens it: the button lives in the controls
// footer, and that footer is torn down and rebuilt the moment the deck stops
// being empty. Holding the open state down there meant adding your *first*
// card slammed the sheet shut mid-browse; hoisting it above that switch keeps
// the sheet — and its search text, exam pill and scroll position — exactly
// where it was.
const AddFlashcardsSheetContext = createContext<{ openSheet: () => void }>({ openSheet: () => {} })

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
                        ? <Check className="h-3.5 w-3.5 shrink-0 text-green-500" />
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

// The round primary "+" that opens the add-flashcards sheet. Lives at the
// right-hand end of the controls footer, in every flashcards view. Only the
// button is here — the sheet itself is mounted by the page, above the
// empty-deck/deck switch this footer sits below.
function AddFlashcardsButton() {
  const { openSheet } = useContext(AddFlashcardsSheetContext)
  return (
    <button
      type="button"
      data-tour="add-flashcards-btn"
      onClick={openSheet}
      title="Add flashcards"
      aria-label="Add flashcards"
      className="inline-flex items-center justify-center h-11 w-11 shrink-0 rounded-full bg-primary text-primary-foreground shadow-sm hover:bg-primary/90 active:scale-95 transition-all"
    >
      <Plus className="h-5 w-5" />
    </button>
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

  const ctx = useMemo(() => ({ openSheet }), [openSheet])

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

// Study ⇄ Gallery toggle. Lives in the bottom controls footer (shared between
// both views), alongside Flip / Back content / focus. `galleryOpen` picks the
// direction: true → "Study" (return to the single-card view), false →
// "Gallery" (open the overlay). `count` is the deck size, shown as the orange
// badge the rest of the app uses for "how much is waiting for you" (see
// TodayQuizBadge / StreakBadge).
function StudyGalleryToggle({
  galleryOpen,
  onToggle,
  count,
  className = '',
}: {
  galleryOpen: boolean
  onToggle: () => void
  count?: number
  className?: string
}) {
  return (
    <button
      type="button"
      onClick={onToggle}
      title={galleryOpen ? 'Back to study' : 'Open gallery'}
      aria-pressed={galleryOpen}
      // Two different actions behind one button: going back to the cards is a
      // study session opening (`study`), spreading them out is a panel (`open`).
      data-sound={galleryOpen ? 'study' : 'open'}
      className={`inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-xl text-base sm:text-lg font-medium transition-colors ${
        galleryOpen
          ? 'bg-primary text-primary-foreground'
          : 'bg-muted text-muted-foreground hover:text-foreground hover:bg-accent'
      } ${className}`}
    >
      {galleryOpen
        ? <span className="inline-flex gap-0.5"><Eye className="h-5 w-5" /><Eye className="h-5 w-5" /></span>
        : <LayoutGrid className="h-5 w-5" />
      }
      <span>{galleryOpen ? 'Study' : 'Gallery'}</span>
      {count !== undefined && count > 0 && (
        <span
          className="inline-flex items-center rounded-full bg-orange-500 px-1.5 py-0.5 text-[11px] font-bold leading-none text-white tabular-nums"
          aria-label={`${count} card${count === 1 ? '' : 's'} in your deck`}
        >
          {count}
        </span>
      )}
    </button>
  )
}

// Focus-mode toggle, sized/shaped to match StudyGalleryToggle so the two read
// as a pair. Sits above the Prev/Next nav alongside the Gallery button.
function FocusModeToggle({
  focusMode,
  onToggle,
  className = '',
}: {
  focusMode: boolean
  onToggle: () => void
  className?: string
}) {
  return (
    <button
      type="button"
      onClick={onToggle}
      title={focusMode ? 'Exit focus mode' : 'Focus mode'}
      aria-pressed={focusMode}
      className={`inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-xl text-base sm:text-lg font-medium transition-colors ${
        focusMode
          ? 'bg-primary text-primary-foreground'
          : 'bg-muted text-muted-foreground hover:text-foreground hover:bg-accent'
      } ${className}`}
    >
      <Maximize2 className="h-5 w-5" />
      <span>Focus</span>
    </button>
  )
}

// ─── Controls Footer (shared between study and gallery views) ─────────────────

function ViewModeDropdown({
  reverseCardModes,
  onToggleMode,
}: {
  reverseCardModes: Set<ReverseCardSection>
  onToggleMode: (mode: ReverseCardSection) => void
}) {
  const [open, setOpen] = useState(false)
  const ref = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (!open) return
    function handleOutside(e: MouseEvent) {
      if (ref.current && !ref.current.contains(e.target as Node)) setOpen(false)
    }
    document.addEventListener('mousedown', handleOutside)
    return () => document.removeEventListener('mousedown', handleOutside)
  }, [open])

  const hasActive = reverseCardModes.size > 0

  return (
    <div className="relative shrink-0" ref={ref}>
      <button
        type="button"
        data-tour="card-content"
        onClick={() => setOpen(v => !v)}
        title="Back content"
        className={`inline-flex items-center gap-1 px-3 h-11 rounded-md transition-colors ${
          hasActive
            ? 'bg-primary text-primary-foreground'
            : 'bg-muted text-muted-foreground hover:text-foreground hover:bg-accent'
        }`}
      >
        {hasActive ? (
          <span className="inline-flex items-center gap-0.5">
            {reverseCardModes.has('definition') && (
              <span className="font-serif italic font-bold text-sm leading-none">D</span>
            )}
            {reverseCardModes.has('math') && <Sigma className="h-3.5 w-3.5" />}
            {reverseCardModes.has('images') && <Images className="h-3.5 w-3.5" />}
          </span>
        ) : (
          <span className="text-xs font-medium">Back</span>
        )}
        <ChevronDown className={`h-3 w-3 opacity-60 transition-transform ${open ? 'rotate-180' : ''}`} />
      </button>

      {open && (
        <div className="absolute bottom-full mb-2 left-1/2 -translate-x-1/2 bg-background rounded-xl shadow-lg p-1.5 flex flex-col gap-0.5 min-w-[148px] z-50">
          {(
            [
              { mode: 'definition', label: 'Definition', icon: <span className="font-serif italic font-bold text-sm w-4 text-center leading-none">D</span> },
              { mode: 'math', label: 'Math', icon: <Sigma className="h-4 w-4" /> },
              { mode: 'images', label: 'Images', icon: <Images className="h-4 w-4" /> },
            ] as const
          ).map(({ mode, label, icon }) => {
            const active = reverseCardModes.has(mode)
            return (
              <button
                key={mode}
                type="button"
                data-tour={mode === 'math' ? 'card-math' : undefined}
                onClick={() => onToggleMode(mode)}
                aria-pressed={active}
                className={`inline-flex items-center gap-2.5 px-3 py-2 rounded-lg text-sm transition-colors ${
                  active
                    ? 'bg-primary text-primary-foreground'
                    : 'text-muted-foreground hover:text-foreground hover:bg-accent'
                }`}
              >
                {icon}
                <span>{label}</span>
                {active && <Check className="h-3.5 w-3.5 ml-auto" />}
              </button>
            )
          })}
        </div>
      )}
    </div>
  )
}

// The controls footer. Besides the card-display controls (Flip / Back content)
// it carries the manage-deck bin and the round + that opens the add-flashcards
// sheet, pinned to the right-hand end. Every control in the bar is one 44px
// (h-11) tap target, so the row reads as a single row of equally weighted
// controls rather than small ones orbiting the +.
function FlashcardControlsBar({
  reverseCardModes,
  onToggleMode,
  flip,
  onFlipToggle,
  onShortcutsHelp,
  cardCount = 0,
  onManage,
}: {
  reverseCardModes: Set<ReverseCardSection>
  onToggleMode: (mode: ReverseCardSection) => void
  flip: boolean
  onFlipToggle: () => void
  onShortcutsHelp: () => void
  // Deck controls — only rendered once there's a deck to manage.
  cardCount?: number
  onManage?: () => void
}) {
  const hasDeck = cardCount > 0
  return (
    <div className="flex items-center gap-2 sm:gap-4 px-3 sm:px-4 py-3 sm:py-4 bg-background shadow-[0_-1px_4px_rgba(0,0,0,0.06)]">
      <div className="flex h-11 items-center gap-2 shrink-0 rounded-md bg-muted px-2.5">
        <span className="text-xs sm:text-sm text-muted-foreground">Flip</span>
        <button
          type="button"
          role="switch"
          aria-checked={flip}
          onClick={onFlipToggle}
          title={flip ? 'Show fronts by default' : 'Show backs by default'}
          className={`relative inline-flex h-6 w-12 shrink-0 cursor-pointer items-center rounded-full border-2 border-transparent transition-colors ${
            flip ? 'bg-primary' : 'bg-muted-foreground/30'
          }`}
        >
          <span className={`pointer-events-none block h-5 w-5 rounded-full bg-background shadow-lg ring-0 transition-transform ${
            flip ? 'translate-x-6' : 'translate-x-0'
          }`} />
        </button>
      </div>

      <ViewModeDropdown reverseCardModes={reverseCardModes} onToggleMode={onToggleMode} />

      <button
        type="button"
        onClick={onShortcutsHelp}
        title="Keyboard shortcuts (?)"
        aria-label="Keyboard shortcuts"
        className="hidden sm:inline-flex items-center justify-center h-11 w-11 rounded-md text-muted-foreground hover:text-foreground hover:bg-accent transition-colors"
      ><Keyboard className="h-5 w-5" /></button>

      <div className="flex-1 min-w-0" />

      {hasDeck && onManage && (
        <button
          type="button"
          onClick={onManage}
          title="Manage cards"
          aria-label="Manage cards"
          className="inline-flex items-center justify-center h-11 w-11 shrink-0 rounded-md text-muted-foreground hover:text-destructive hover:bg-accent transition-colors"
        ><Trash2 className="h-5 w-5" /></button>
      )}

      <AddFlashcardsButton />
    </div>
  )
}

// ─── Sortable Card (used in expanded gallery) ─────────────────────────────────

function SortableCard({
  card,
  masteryState,
  onSelect,
  onRemove,
  isFlashing,
  isActive,
  reverseCardModes,
  globalFlip,
  collected = false,
  animateCollected,
  disableSort = false,
  onCardsAdded,
  focusMode = false,
  isCompleted = false,
  showDeckToggle = true,
  isClearing = false,
}: {
  card: FlashCard
  masteryState: MasteryState
  onSelect: () => void
  onRemove: (name: string) => void
  isFlashing: boolean
  isActive: boolean
  reverseCardModes: Set<ReverseCardSection>
  globalFlip: boolean
  collected?: boolean
  // Whether collected cards get the holographic sheen animation. Defaults to
  // `collected`; the deck passes false so the ongoing animation doesn't
  // distract while reading.
  animateCollected?: boolean
  disableSort?: boolean
  onCardsAdded?: () => void
  focusMode?: boolean
  // Completed cards keep their green edge in the gallery, but completion is
  // only ever *toggled* from the study view — a gallery tile has no control
  // for it, so a stray tap can't silently finish a card.
  isCompleted?: boolean
  // Whether the quiet add/remove-from-deck control shows in the corner. The
  // deck gallery hides it — every tile there is already in the deck, and the
  // actions menu takes one out — so it's left for any other surface that
  // reuses this tile to pull a card in.
  showDeckToggle?: boolean
  // True while the card is animating out during a "Clear Completed Flashcards"
  // sweep — shrinks and fades the card away just before it leaves the deck.
  isClearing?: boolean
}) {
  const [flipped, setFlipped] = useState(globalFlip)
  const [markdown, setMarkdown] = useState<string | null>(null)
  const [loadStatus, setLoadStatus] = useState<'idle' | 'loading' | 'error'>('idle')
  const [showPlayMenu, setShowPlayMenu] = useState(false)
  const [menuAlignRight, setMenuAlignRight] = useState(false)
  const [showQuestionsModal, setShowQuestionsModal] = useState(false)
  const [showLearningProgress, setShowLearningProgress] = useState(false)
  const { openAt } = useConceptPopup()
  const { addCard, hasCard, cards } = useFlashcards()
  const openCollect = useCollect(s => s.open)
  const routerNavigate = useNavigate()
  const playMenuRef = useRef<HTMLDivElement>(null)
  const playBtnRef = useRef<HTMLButtonElement>(null)

  const { attributes, listeners, setNodeRef, transform, transition, isDragging } = useSortable({ id: card.name, disabled: disableSort })

  const inDeck = hasCard(card.name)
  function toggleDeck(e: React.MouseEvent) {
    e.stopPropagation()
    if (inDeck) {
      onRemove(card.name)
    } else {
      playSound('addToDeck')
      addCard(card)
      showAddedToDeck(1)
      onCardsAdded?.()
    }
  }

  // Quiet, always-available add/remove-from-deck control. Transparent so it
  // doesn't compete with the card content — only the front face shows it.
  const deckToggleButton = (
    <button
      type="button"
      data-sound="none"
      onPointerDown={e => e.stopPropagation()}
      onClick={toggleDeck}
      aria-label={inDeck ? `Remove ${card.name} from deck` : `Add ${card.name} to deck`}
      title={inDeck ? 'Remove from deck' : 'Add to deck'}
      className="inline-flex items-center justify-center h-7 w-7 rounded-full bg-transparent text-muted-foreground hover:text-foreground transition-colors"
    >
      {inDeck ? <Minus className="h-4 w-4" /> : <Plus className="h-4 w-4" />}
    </button>
  )

  // The collect gate's padlock. It takes the actions menu's corner slot until
  // the card is collected — the two are never both there, so the corner reads
  // as one control that unlocks. Plain, like every other corner button: the
  // foil is the collected card's edge and must not also ring the lock.
  const lockButton = (
    <button
      type="button"
      data-sound="actions"
      onPointerDown={e => e.stopPropagation()}
      onClick={e => { e.stopPropagation(); openCollect(card) }}
      title="Locked — collect this flashcard"
      aria-label={`Collect ${card.name}`}
      className="inline-flex items-center justify-center h-7 w-7 rounded-lg shrink-0 text-muted-foreground hover:text-foreground transition-colors"
    >
      <Lock className="h-4 w-4" />
    </button>
  )

  useEffect(() => {
    if (!showPlayMenu) return
    function handleClickOutside(e: MouseEvent) {
      if (playMenuRef.current && !playMenuRef.current.contains(e.target as Node)) {
        setShowPlayMenu(false)
      }
    }
    document.addEventListener('mousedown', handleClickOutside)
    return () => document.removeEventListener('mousedown', handleClickOutside)
  }, [showPlayMenu])

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
    opacity: isDragging ? 0.4 : 1,
    zIndex: isDragging ? 50 : undefined,
  }

  // Sync to global flip/unflip action
  useEffect(() => {
    setFlipped(globalFlip)
    if (globalFlip && markdown === null && loadStatus === 'idle') {
      setLoadStatus('loading')
      fetchWikiFile(entryRefToRepoPath(card))
        .then(raw => { setMarkdown(raw); setLoadStatus('idle') })
        .catch(() => setLoadStatus('error'))
    }
  }, [globalFlip]) // eslint-disable-line react-hooks/exhaustive-deps

  function handleFlipOpen() {
    setFlipped(true)
    if (markdown === null && loadStatus === 'idle') {
      setLoadStatus('loading')
      fetchWikiFile(entryRefToRepoPath(card))
        .then(raw => { setMarkdown(raw); setLoadStatus('idle') })
        .catch(() => setLoadStatus('error'))
    }
  }

  const definition = markdown ? extractFirstParagraph(markdown) : null
  const allEquations = markdown ? extractMathBlockquotes(markdown) : []
  const cardImages = markdown ? extractImages(markdown) : []

  // Focus mode drops the "shiny"/holographic treatment for collected cards so
  // every card reads the same and the title is the only thing that stands out.
  // Everywhere else the foil edge is the card's level readout — the card prints
  // no mastery label — so it steps once per state: a bare glint at New, a faint
  // hairline at L1, a static holographic edge at L2, the travelling border at
  // L3, and amber once a card has decayed (`lib/flashcardFoil.ts`).
  const sheenLevelClass = FOIL_LEVEL_CLASS[masteryState] ? ` ${FOIL_LEVEL_CLASS[masteryState]}` : ''
  const showSheen = (animateCollected ?? collected) && collected
  // The collect gate's padlock, which stands in for the actions menu in the
  // card's corner until the card has been collected — a locked card has no
  // actions to offer. Focus mode shows the title and nothing else.
  const showLock = !collected && !focusMode
  const baseClass = `group relative rounded-xl flex flex-col transition-shadow min-h-[150px]${showSheen && !focusMode ? ` flashcard-collected${sheenLevelClass}` : ''}${isFlashing ? ' flashcard-highlight' : ''}${isCompleted ? ' ring-1 ring-green-500/50' : ''}${isClearing ? ' flashcard-clearing' : ''}`
  const colorClass = isActive
    ? 'bg-primary/10 shadow-sm'
    : 'bg-card text-card-foreground'

  if (flipped) {
    return (
      <div
        ref={setNodeRef}
        style={style}
        data-card-name={card.name}
        {...listeners}
        {...attributes}
        onClick={(e) => {
          // NB: the card itself carries role="button" from dnd-kit's drag
          // attributes, so we must not include [role="button"] here or the
          // guard would always match the card and never flip back.
          const target = e.target as HTMLElement
          if (!target.closest('a, button, input, select, textarea')) {
            setFlipped(false)
          }
        }}
        className={`${baseClass} ${colorClass} cursor-grab active:cursor-grabbing select-none`}
      >
        {isClearing && CLEAR_OVERLAY}
        {/* Header: name + play button (the padlock until the card is
            collected) — hidden in focus mode */}
        {!focusMode && (
        <div className="flex items-center justify-between gap-1 px-3 py-2">
          <span className="text-sm font-medium text-muted-foreground truncate min-w-0">{card.name}</span>
          {showLock ? lockButton : (
          <div className="relative shrink-0" ref={playMenuRef}>
            <button
              ref={playBtnRef}
              type="button"
              data-sound="actions"
              onPointerDown={e => e.stopPropagation()}
              onClick={e => {
                e.stopPropagation()
                if (!showPlayMenu && playBtnRef.current) {
                  const rect = playBtnRef.current.getBoundingClientRect()
                  setMenuAlignRight(window.innerWidth - rect.right < 210)
                }
                setShowPlayMenu(v => !v)
              }}
              aria-label={`Actions for ${card.name}`}
              className="text-muted-foreground hover:text-primary h-7 w-7 flex items-center justify-center transition-colors"
            >
              <Play className="h-4 w-4" />
            </button>
            {showPlayMenu && (
              <div className={`absolute top-full mt-1 w-52 rounded-md bg-popover text-popover-foreground shadow-md z-50 py-1 ${menuAlignRight ? 'right-0' : 'left-0'}`}>
                <button
                  type="button"
                  onPointerDown={e => e.stopPropagation()}
                  onClick={e => { e.stopPropagation(); onSelect(); setShowPlayMenu(false) }}
                  data-sound="study"
                  className="w-full flex items-center gap-2 px-3 py-2 text-sm hover:bg-accent transition-colors"
                >
                  <span className="inline-flex shrink-0 gap-0.5"><Eye className="h-3.5 w-3.5" /><Eye className="h-3.5 w-3.5" /></span>
                  Study
                </button>
                <button
                  type="button"
                  onPointerDown={e => e.stopPropagation()}
                  onClick={e => { e.stopPropagation(); setShowQuestionsModal(true); setShowPlayMenu(false) }}
                  className="w-full flex items-center gap-2 px-3 py-2 text-sm hover:bg-accent transition-colors"
                >
                  <Play className="h-3.5 w-3.5 shrink-0" />
                  Start Quiz
                </button>
                {card.kind === 'concept' && (
                  <button
                    type="button"
                    onPointerDown={e => e.stopPropagation()}
                    onClick={e => { e.stopPropagation(); routerNavigate(wikiRoute(card)); setShowPlayMenu(false) }}
                    className="w-full flex items-center gap-2 px-3 py-2 text-sm hover:bg-accent transition-colors"
                  >
                    <BookOpen className="h-3.5 w-3.5 shrink-0" />
                    Open in Study Guide
                  </button>
                )}
                <div className="flex items-center hover:bg-accent transition-colors">
                  <button
                    type="button"
                    data-sound="none"
                    onPointerDown={e => e.stopPropagation()}
                    onClick={e => {
                      e.stopPropagation()
                      if (!hasCard(card.name)) { playSound('addToDeck'); showAddedToDeck(1) }
                      addCard(card)
                    }}
                    className="flex-1 flex items-center gap-2 px-3 py-2 text-sm text-left"
                  >
                    <span className="h-3.5 w-3.5 shrink-0 flex items-center justify-center text-xs">
                      {hasCard(card.name) ? '✓' : '+'}
                    </span>
                    <span className="flex-1">{hasCard(card.name) ? 'Added to Flashcards' : 'Add to Flashcards'}</span>
                    {hasCard(card.name) && cards.length > 0 && (
                      <span className="shrink-0 text-[10px] font-semibold px-1.5 py-0.5 rounded-full bg-muted text-muted-foreground tabular-nums">
                        {cards.length}
                      </span>
                    )}
                  </button>
                  {hasCard(card.name) && (
                    <Link
                      to={`/flashcards?highlight=${encodeURIComponent(card.name)}`}
                      onPointerDown={e => e.stopPropagation()}
                      onClick={() => setShowPlayMenu(false)}
                      className="text-xs text-primary hover:underline pr-3 shrink-0"
                    >
                      view
                    </Link>
                  )}
                </div>
                <button
                  type="button"
                  onPointerDown={e => e.stopPropagation()}
                  onClick={e => { e.stopPropagation(); openAt([card], 0); setShowPlayMenu(false) }}
                  className="w-full flex items-center gap-2 px-3 py-2 text-sm hover:bg-accent transition-colors"
                >
                  <Sigma className="h-3.5 w-3.5 shrink-0" />
                  Math View
                </button>
                <button
                  type="button"
                  onPointerDown={e => e.stopPropagation()}
                  onClick={e => { e.stopPropagation(); openAt([card], 0); setShowPlayMenu(false) }}
                  className="w-full flex items-center gap-2 px-3 py-2 text-sm hover:bg-accent transition-colors"
                >
                  <Headphones className="h-3.5 w-3.5 shrink-0" />
                  Listen
                </button>
                <button
                  type="button"
                  onPointerDown={e => e.stopPropagation()}
                  onClick={e => { e.stopPropagation(); setShowLearningProgress(true); setShowPlayMenu(false) }}
                  className="w-full flex items-center gap-2 px-3 py-2 text-sm hover:bg-accent transition-colors"
                >
                  <TrendingUp className="h-3.5 w-3.5 shrink-0" />
                  Learning Progress
                </button>
                <div className="my-1" />
                <button
                  type="button"
                  onPointerDown={e => e.stopPropagation()}
                  onClick={e => { e.stopPropagation(); onRemove(card.name); setShowPlayMenu(false) }}
                  className="w-full flex items-center gap-2 px-3 py-2 text-sm text-destructive hover:bg-accent transition-colors"
                >
                  <Trash2 className="h-3.5 w-3.5 shrink-0" />
                  Remove
                </button>
              </div>
            )}
          </div>
          )}
        </div>
        )}
        {showQuestionsModal && (
          <ConceptQuestionsModal conceptName={card.name} onClose={() => setShowQuestionsModal(false)} />
        )}
        {showLearningProgress && (
          <LearningProgressModal conceptName={card.name} onClose={() => setShowLearningProgress(false)} />
        )}

        {/* Back content — grows to fit, no scrollbar. data-math-scope: the whole
            face is one math-focus set, so Previous/Next steps through the
            definition's equations and the Math View list alike. */}
        <div className="px-3 py-2" data-math-scope="">
          {loadStatus === 'loading' && (
            <div className="flex items-center gap-1 text-xs text-muted-foreground py-2">
              <Loader2 className="h-3 w-3 animate-spin" /> Loading…
            </div>
          )}
          {loadStatus === 'error' && (
            <p className="text-xs text-destructive py-1">Couldn't load content.</p>
          )}
          {reverseCardModes.has('definition') && definition && (
            <WikiArticle
              markdown={definition}
              onWikiLink={ref => {
                const { open, jumpTo } = useConceptPopup.getState()
                if (open) jumpTo(ref); else openAt([ref], 0)
                return true
              }}
            />
          )}
          {reverseCardModes.has('math') && allEquations.length > 0 && (
            <div className="space-y-2">
              {allEquations.map((eq, i) => (
                <WikiArticle key={i} markdown={eq} onWikiLink={ref => {
                  const { open, jumpTo } = useConceptPopup.getState()
                  if (open) jumpTo(ref); else openAt([ref], 0)
                  return true
                }} />
              ))}
            </div>
          )}
          {reverseCardModes.has('images') && cardImages.length > 0 && (
            <div className="space-y-2">
              {cardImages.map((img, i) => (
                <figure key={i} className="flex flex-col items-center gap-1">
                  {/* Match the study card: fill the tile's width rather than
                      rendering at the SVG's (small) intrinsic size. */}
                  <img src={img.src} alt={img.alt} className="w-full max-h-[50vh] object-contain rounded" onError={e => { (e.currentTarget as HTMLImageElement).style.display = 'none' }} />
                  {img.caption && (
                    <figcaption className="text-xs text-muted-foreground text-center">{img.caption}</figcaption>
                  )}
                </figure>
              ))}
            </div>
          )}
        </div>
      </div>
    )
  }

  return (
    <div
      ref={setNodeRef}
      style={style}
      data-card-name={card.name}
      {...listeners}
      {...attributes}
      onClick={(e) => {
        // See note on the back face: exclude [role="button"] so dnd-kit's own
        // role on the card doesn't swallow the flip.
        const target = e.target as HTMLElement
        if (!target.closest('a, button, input, select, textarea')) {
          handleFlipOpen()
        }
      }}
      className={`${baseClass} ${colorClass} cursor-pointer active:cursor-grabbing hover:shadow-md select-none`}
    >
      {isClearing && CLEAR_OVERLAY}
      {/* Corner controls: deck toggle + actions menu — hidden in focus mode.
          They float over the tile rather than sitting in a row above it, so
          the name below reads dead-centre in the card. */}
      {!focusMode && (
      <div className="absolute top-2 right-2 z-20 flex items-center gap-1.5">
        {showDeckToggle && deckToggleButton}
        {showLock ? lockButton : (
        <div className="relative" ref={playMenuRef}>
          <button
            ref={playBtnRef}
            type="button"
            data-sound="actions"
            onPointerDown={e => e.stopPropagation()}
            onClick={e => {
              e.stopPropagation()
              if (!showPlayMenu && playBtnRef.current) {
                const rect = playBtnRef.current.getBoundingClientRect()
                setMenuAlignRight(window.innerWidth - rect.right < 210)
              }
              setShowPlayMenu(v => !v)
            }}
            aria-label={`Actions for ${card.name}`}
            className="text-muted-foreground hover:text-primary h-7 w-7 flex items-center justify-center transition-colors opacity-0 group-hover:opacity-100 focus:opacity-100"
          >
            <Play className="h-4 w-4" />
          </button>
          {showPlayMenu && (
            <div className={`absolute top-full mt-1 w-52 rounded-md bg-popover text-popover-foreground shadow-md z-50 py-1 ${menuAlignRight ? 'right-0' : 'left-0'}`}>
              <button
                type="button"
                onPointerDown={e => e.stopPropagation()}
                onClick={e => { e.stopPropagation(); onSelect(); setShowPlayMenu(false) }}
                data-sound="study"
                className="w-full flex items-center gap-2 px-3 py-2 text-sm hover:bg-accent transition-colors"
              >
                <span className="inline-flex shrink-0 gap-0.5"><Eye className="h-3.5 w-3.5" /><Eye className="h-3.5 w-3.5" /></span>
                Study
              </button>
              <button
                type="button"
                onPointerDown={e => e.stopPropagation()}
                onClick={e => { e.stopPropagation(); setShowQuestionsModal(true); setShowPlayMenu(false) }}
                className="w-full flex items-center gap-2 px-3 py-2 text-sm hover:bg-accent transition-colors"
              >
                <Play className="h-3.5 w-3.5 shrink-0" />
                Start Quiz
              </button>
              {card.kind === 'concept' && (
                <button
                  type="button"
                  onPointerDown={e => e.stopPropagation()}
                  onClick={e => { e.stopPropagation(); routerNavigate(wikiRoute(card)); setShowPlayMenu(false) }}
                  className="w-full flex items-center gap-2 px-3 py-2 text-sm hover:bg-accent transition-colors"
                >
                  <BookOpen className="h-3.5 w-3.5 shrink-0" />
                  Open in Study Guide
                </button>
              )}
              <div className="flex items-center hover:bg-accent transition-colors">
                <button
                  type="button"
                  data-sound="none"
                  onPointerDown={e => e.stopPropagation()}
                  onClick={e => {
                    e.stopPropagation()
                    if (!hasCard(card.name)) { playSound('addToDeck'); showAddedToDeck(1) }
                    addCard(card)
                  }}
                  className="flex-1 flex items-center gap-2 px-3 py-2 text-sm text-left"
                >
                  <span className="h-3.5 w-3.5 shrink-0 flex items-center justify-center text-xs">
                    {hasCard(card.name) ? '✓' : '+'}
                  </span>
                  <span className="flex-1">{hasCard(card.name) ? 'Added to Flashcards' : 'Add to Flashcards'}</span>
                  {hasCard(card.name) && cards.length > 0 && (
                    <span className="shrink-0 text-[10px] font-semibold px-1.5 py-0.5 rounded-full bg-muted text-muted-foreground tabular-nums">
                      {cards.length}
                    </span>
                  )}
                </button>
                {hasCard(card.name) && (
                  <Link
                    to={`/flashcards?highlight=${encodeURIComponent(card.name)}`}
                    onPointerDown={e => e.stopPropagation()}
                    onClick={() => setShowPlayMenu(false)}
                    className="text-xs text-primary hover:underline pr-3 shrink-0"
                  >
                    view
                  </Link>
                )}
              </div>
              <button
                type="button"
                onPointerDown={e => e.stopPropagation()}
                onClick={e => { e.stopPropagation(); openAt([card], 0); setShowPlayMenu(false) }}
                className="w-full flex items-center gap-2 px-3 py-2 text-sm hover:bg-accent transition-colors"
              >
                <Sigma className="h-3.5 w-3.5 shrink-0" />
                Math View
              </button>
              <button
                type="button"
                onPointerDown={e => e.stopPropagation()}
                onClick={e => { e.stopPropagation(); openAt([card], 0); setShowPlayMenu(false) }}
                className="w-full flex items-center gap-2 px-3 py-2 text-sm hover:bg-accent transition-colors"
              >
                <Headphones className="h-3.5 w-3.5 shrink-0" />
                Listen
              </button>
              <button
                type="button"
                onPointerDown={e => e.stopPropagation()}
                onClick={e => { e.stopPropagation(); setShowLearningProgress(true); setShowPlayMenu(false) }}
                className="w-full flex items-center gap-2 px-3 py-2 text-sm hover:bg-accent transition-colors"
              >
                <TrendingUp className="h-3.5 w-3.5 shrink-0" />
                Learning Progress
              </button>
              <div className="my-1" />
              <button
                type="button"
                onPointerDown={e => e.stopPropagation()}
                onClick={e => { e.stopPropagation(); onRemove(card.name); setShowPlayMenu(false) }}
                className="w-full flex items-center gap-2 px-3 py-2 text-sm text-destructive hover:bg-accent transition-colors"
              >
                <Trash2 className="h-3.5 w-3.5 shrink-0" />
                Remove
              </button>
            </div>
          )}
        </div>
        )}
      </div>
      )}
      {showQuestionsModal && (
        <ConceptQuestionsModal conceptName={card.name} onClose={() => setShowQuestionsModal(false)} />
      )}
      {showLearningProgress && (
        <LearningProgressModal conceptName={card.name} onClose={() => setShowLearningProgress(false)} />
      )}

      {/* Name — click to flip. The collect gate is the padlock in the top-right
          corner, in the actions menu's slot: the card's one control is locked
          until it's collected, then it becomes the actions menu. So the name
          sits alone on the card's centre. */}
      <div className={`flex-1 flex items-center justify-center gap-1.5 px-3 min-w-0 ${focusMode ? 'py-4' : 'py-9'}`}>
        <button
          type="button"
          onPointerDown={e => e.stopPropagation()}
          onClick={e => { e.stopPropagation(); handleFlipOpen() }}
          // The level used to be printed under the name; now that the foil edge
          // carries it, hovering the name is how you put a word to the border.
          title={!focusMode && collected ? `${card.name} — ${MASTERY_LABEL[masteryState]}` : undefined}
          className={`min-w-0 text-center transition-colors ${
            isActive ? 'text-primary' : 'hover:text-primary'
          }`}
        >
          {/* Keystone marker: the gold underline on the name, same as
              everywhere else. Never a ring — a collected card already wears the
              rainbow foil edge, and the two materials must not fight for the
              same border. */}
          <span className={`font-semibold text-base leading-snug ${card.kind === 'concept' && isKeystone(card.name) ? 'keystone-underline' : ''}`}>
            {card.name}
          </span>
        </button>
      </div>

      {/* Mastery is the foil border and nothing else — no pill, so the name sits
          alone on the card's centre. The border can't be read out, so the level
          is named here for screen readers (and as the card's tooltip above).
          Absent while the card is still behind the collect gate: the lock says
          everything, and there is no level yet to name. */}
      {!focusMode && collected && (
        <span className="sr-only">{MASTERY_LABEL[masteryState]}</span>
      )}
    </div>
  )
}

// ─── Remove All Dialog ───────────────────────────────────────────────────────

function FlashcardsManageDialog({
  cardCount,
  onCancel,
  onRemoveAll,
}: {
  cardCount: number
  onCancel: () => void
  onRemoveAll: () => void
}) {
  useEffect(() => {
    function onKey(e: KeyboardEvent) { if (e.key === 'Escape') onCancel() }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [onCancel])

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-background/80 backdrop-blur-sm p-4"
      onClick={onCancel}
      role="dialog"
      aria-modal="true"
    >
      <div
        className="w-full max-w-sm rounded-lg bg-card text-card-foreground shadow-lg p-5 space-y-4"
        onClick={e => e.stopPropagation()}
      >
        <div className="space-y-1">
          <h2 className="text-base font-semibold">{cardCount} card{cardCount === 1 ? '' : 's'}</h2>
          <p className="text-sm text-muted-foreground">
            {cardCount === 0 ? 'Your flashcard deck is empty.' : 'Manage your current flashcard deck.'}
          </p>
        </div>

        <div className="flex justify-end gap-2">
          <Button variant="outline" size="sm" onClick={onCancel}>
            Cancel
          </Button>
          {cardCount > 0 && (
            <Button variant="destructive" size="sm" onClick={onRemoveAll}>
              Remove all
            </Button>
          )}
        </div>
      </div>
    </div>
  )
}

// ─── Study Session Summary ───────────────────────────────────────────────────

// Shown when every card in the deck has been marked complete via the
// Again / Got it loop. Recaps the session (with the cards that needed extra
// passes) and offers the two natural next steps: sweep the finished cards into
// a dated pack, or reset the deck and run it again.
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

  useEffect(() => {
    function onKey(e: KeyboardEvent) { if (e.key === 'Escape') onClose() }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [onClose])

  return (
    <div
      className="fixed inset-0 z-[70] flex items-center justify-center bg-background/80 backdrop-blur-sm p-4"
      onClick={onClose}
      role="dialog"
      aria-modal="true"
      aria-label="Deck complete"
    >
      <div
        className="w-full max-w-sm rounded-xl bg-card text-card-foreground shadow-2xl p-6 space-y-4"
        onClick={e => e.stopPropagation()}
      >
        <div className="text-center space-y-2">
          <span className="inline-flex items-center justify-center h-12 w-12 rounded-full bg-green-500/15 text-green-500">
            <CheckCircle2 className="h-7 w-7" />
          </span>
          <h2 className="text-lg font-bold">Deck complete!</h2>
          <p className="text-sm text-muted-foreground">
            {summary.total} card{summary.total === 1 ? '' : 's'} studied
            {summary.struggled.length > 0
              ? `, ${summary.firstTry} on the first try.`
              : ' — all on the first try.'}
          </p>
        </div>

        {summary.struggled.length > 0 && (
          <div className="rounded-lg bg-muted/40 p-3 space-y-1.5">
            <p className="text-xs font-semibold text-muted-foreground uppercase tracking-wider">
              Worth another look
            </p>
            <ul className="space-y-1">
              {summary.struggled.slice(0, 5).map(({ name, againCount }) => (
                <li key={name} className="flex items-center gap-2 text-sm">
                  <span className="flex-1 min-w-0 truncate">{name}</span>
                  <span className="shrink-0 text-[11px] font-semibold px-1.5 py-0.5 rounded-full bg-rose-500/15 text-rose-600 dark:text-rose-400 tabular-nums">
                    {againCount}× again
                  </span>
                </li>
              ))}
              {summary.struggled.length > 5 && (
                <li className="text-xs text-muted-foreground">
                  +{summary.struggled.length - 5} more
                </li>
              )}
            </ul>
          </div>
        )}

        <div className="flex flex-col gap-2">
          <button
            type="button"
            onClick={onClearCompleted}
            title="Move completed cards into a dated pack and clear them from your deck"
            className="w-full flex items-center justify-center gap-2 px-4 py-2.5 rounded-lg bg-green-600 text-white text-sm font-semibold hover:bg-green-700 active:scale-[0.98] transition-all"
          >
            <CheckCircle2 className="h-4 w-4" /> Clear Completed Flashcards
          </button>
          <button
            type="button"
            onClick={onStudyAgain}
            data-sound="study"
            className="w-full flex items-center justify-center gap-2 px-4 py-2.5 rounded-lg bg-muted text-foreground text-sm font-semibold hover:bg-accent active:scale-[0.98] transition-all"
          >
            <RotateCcw className="h-4 w-4" /> Study again
          </button>
          <button
            type="button"
            onClick={onClose}
            className="w-full px-4 py-2 text-sm text-muted-foreground hover:text-foreground transition-colors"
          >
            Keep browsing
          </button>
        </div>
      </div>
    </div>
  )
}

// ─── Gallery Panel (expanded overlay) ────────────────────────────────────────

function GalleryPanel({
  cards,
  orderedCards,
  groupBy,
  examGroups,
  flashingCard,
  activeIndex,
  onSelect,
  onRemove,
  onDragEnd,
  sensors,
  onClose,
  conceptMasteryMap,
  reverseCardModes,
  globalFlip,
  inline = false,
  onCardsAdded,
  focusMode = false,
  clearingNames,
  onClearCompleted,
}: {
  cards: FlashCard[]
  orderedCards: FlashCard[]
  groupBy: GroupBy
  examGroups: { label: string; cards: FlashCard[] }[]
  flashingCard: string | null
  activeIndex: number
  onSelect: (index: number) => void
  onRemove: (name: string) => void
  onDragEnd: (e: DragEndEvent) => void
  sensors: ReturnType<typeof useSensors>
  onClose?: () => void
  conceptMasteryMap: Map<string, MasteryState>
  reverseCardModes: Set<ReverseCardSection>
  globalFlip: boolean
  inline?: boolean
  onCardsAdded?: () => void
  focusMode?: boolean
  // Lowercased names of completed cards currently animating out (during a
  // "Clear Completed Flashcards" sweep). Optional — undefined when nothing is
  // being cleared.
  clearingNames?: Set<string>
  // Runs the animated "Clear Completed Flashcards" sweep. Falls back to the
  // store's plain clearCompleted when not provided (e.g. inline empty deck).
  onClearCompleted?: () => void
}) {
  const { clearCompleted } = useFlashcards()
  const collectedCards = useCollectedCards(s => s.cards)
  const completedCount = useMemo(() => cards.filter(c => c.completedAt).length, [cards])
  const collectedSet = useMemo(
    () => new Set(collectedCards.map(c => c.name.toLowerCase())),
    [collectedCards],
  )
  const scrollContainerRef = useRef<HTMLDivElement>(null)

  // Center the active deck card when the gallery opens.
  useEffect(() => {
    const activeCard = orderedCards[activeIndex]
    if (!activeCard || !scrollContainerRef.current) return
    const all = scrollContainerRef.current.querySelectorAll<HTMLElement>('[data-card-name]')
    for (const el of all) {
      if (el.dataset.cardName === activeCard.name) {
        el.scrollIntoView({ block: 'center', behavior: 'instant' })
        break
      }
    }
  }, []) // eslint-disable-line react-hooks/exhaustive-deps

  // Follow the "Clear Completed Flashcards" sweep down the deck (the most
  // recently started card — Sets preserve insertion order). The cards clear in
  // an overlapping cascade, so chasing every one in turn would mean a new
  // smooth scroll every couple of hundred milliseconds, each one interrupting
  // the last; only cards that have actually drifted out of view are chased.
  const currentClearingName = clearingNames && clearingNames.size > 0
    ? [...clearingNames].at(-1)
    : undefined
  useEffect(() => {
    const container = scrollContainerRef.current
    if (!currentClearingName || !container) return
    const all = container.querySelectorAll<HTMLElement>('[data-card-name]')
    for (const el of all) {
      if (el.dataset.cardName?.toLowerCase() !== currentClearingName) continue
      const card = el.getBoundingClientRect()
      const view = container.getBoundingClientRect()
      if (card.top < view.top || card.bottom > view.bottom) {
        el.scrollIntoView({ block: 'center', behavior: 'smooth' })
      }
      break
    }
  }, [currentClearingName])

  function handleCardSelect(card: FlashCard) {
    const idx = orderedCards.findIndex(c => c.name === card.name)
    onSelect(idx >= 0 ? idx : 0)
    onClose?.()
  }

  function renderCard(card: FlashCard) {
    const overallIdx = orderedCards.findIndex(c => c.name === card.name)
    return (
      <SortableCard
        key={card.name}
        card={card}
        masteryState={conceptMasteryMap.get(card.name.toLowerCase()) ?? 'new'}
        onSelect={() => handleCardSelect(card)}
        onRemove={onRemove}
        isFlashing={flashingCard?.toLowerCase() === card.name.toLowerCase()}
        isActive={overallIdx === activeIndex}
        reverseCardModes={reverseCardModes}
        globalFlip={globalFlip}
        collected={collectedSet.has(card.name.toLowerCase())}
        animateCollected={false}
        onCardsAdded={onCardsAdded}
        focusMode={focusMode}
        isCompleted={!!card.completedAt}
        showDeckToggle={false}
        isClearing={clearingNames?.has(card.name.toLowerCase()) ?? false}
      />
    )
  }

  // In focus mode the panel covers the full viewport (including the sidebar) and
  // sits above the focus backdrop, so the cards are the only thing on screen.
  const containerClass = inline
    ? 'flex flex-col'
    : focusMode
      ? 'fixed inset-0 z-[56] flex flex-col bg-background'
      : 'gallery-panel fixed inset-0 z-40 flex flex-col bg-background'

  return (
    <div className={containerClass}>
      {/* Scrollable content */}
      <div
        ref={scrollContainerRef}
        className={inline
          ? 'space-y-4'
          : 'flex-1 overflow-y-auto overscroll-contain px-4 py-4 space-y-4 pb-32 md:pb-28'}
      >
        <div className="space-y-4">
          {/* Clear-completed — the only thing left in this row now that the
              deck's count, sort and add controls live in the footer bar. In
              the overlay panel it sticks to the top of the scroll area so it
              stays reachable while scrolling a long deck. Sticky offsets are
              measured from the scroll container's content box, so
              -top-4/-mt-4 cancel its py-4 padding (the row
              pins flush to the panel edge with no sliver of card showing
              above it) while pt-4 keeps the row sitting where it did;
              -mx-4/px-4 stretch the opaque background across the px-4 gutters
              so cards scroll cleanly underneath. */}
          {!focusMode && completedCount > 0 && (
          <div
            className={`flex items-center justify-end ${
              inline ? '' : 'sticky -top-4 z-20 -mx-4 -mt-4 px-4 pt-4 pb-2 bg-background'
            }`}
          >
            <button
              type="button"
              onClick={onClearCompleted ?? clearCompleted}
              title="Clear the completed cards out of your deck"
              className="inline-flex items-center gap-1.5 px-3 h-9 rounded-md bg-green-600 text-white text-xs sm:text-sm font-semibold shadow-sm hover:bg-green-700 active:scale-[0.98] transition-all shrink-0"
            >
              <CheckCircle2 className="h-4 w-4 shrink-0" />
              <span>Clear Completed Flashcards</span>
              <span className="text-[10px] font-bold px-1.5 py-0.5 rounded-full bg-white/25 tabular-nums">
                {completedCount}
              </span>
            </button>
          </div>
          )}

          {/* Today's study plan is no longer pinned here — it's the first
              section of the exam's shelf in the add-flashcards sheet, where
              cards are added (see TodayStudyPlanSection). */}

          {cards.length === 0 ? (
            <div className="rounded-xl bg-card text-card-foreground p-10 text-center space-y-2">
              <Layers className="h-9 w-9 mx-auto text-muted-foreground/50" />
              <p className="text-sm text-muted-foreground">Your deck is empty.</p>
              <p className="text-xs text-muted-foreground">
                Tap the <span className="font-medium">+</span> button below to search for
                flashcards or add a whole pack.
              </p>
            </div>
          ) : (
            <DndContext sensors={sensors} collisionDetection={closestCenter} onDragEnd={onDragEnd}>
              <SortableContext items={orderedCards.map(c => c.name)} strategy={rectSortingStrategy}>
                {groupBy === 'exam' ? (
                  <div className="space-y-6">
                    {examGroups.length === 0 ? (
                      <div className="grid grid-cols-1 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4">
                        {orderedCards.map(renderCard)}
                      </div>
                    ) : (
                      examGroups.map(({ label, cards: groupCards }) => (
                        <div key={label} className="space-y-2">
                          <h2 className="text-xs font-semibold text-muted-foreground uppercase tracking-wider">{label}</h2>
                          <div className="grid grid-cols-1 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4">
                            {groupCards.map(renderCard)}
                          </div>
                        </div>
                      ))
                    )}
                  </div>
                ) : (
                  <div className="grid grid-cols-1 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4">
                    {orderedCards.map(renderCard)}
                  </div>
                )}
              </SortableContext>
            </DndContext>
          )}
        </div>
      </div>
    </div>
  )
}

// ─── Study Area ───────────────────────────────────────────────────────────────

interface FlashcardStudyAreaHandle {
  flip: () => void
  isFlipped: () => boolean
}

const SWIPE_THRESHOLD = 80
const SWIPE_FLY_DISTANCE = 500

const FlashcardStudyArea = forwardRef<FlashcardStudyAreaHandle, {
  cards: WikiEntryRef[]
  index: number
  isFlashing?: boolean
  reverseCardModes: Set<ReverseCardSection>
  onSetModes: (modes: Set<ReverseCardSection>) => void
  defaultFlipped: boolean
  onNext: () => void
  onPrev: () => void
  hasNext: boolean
  hasPrev: boolean
  focusMode?: boolean
  // Again / Got it self-assessment loop. `onRate` advances to the next
  // unfinished card (Got it also marks the current one complete).
  onRate: (rating: StudyRating) => void
  isCompleted: boolean
}>(function FlashcardStudyArea({
  cards,
  index,
  isFlashing,
  reverseCardModes,
  onSetModes,
  defaultFlipped,
  onNext,
  onPrev,
  hasNext,
  hasPrev,
  focusMode = false,
  onRate,
  isCompleted,
}, ref) {
  const [flipped, setFlipped] = useState(defaultFlipped)
  const [expanded, setExpanded] = useState(false)
  const [markdown, setMarkdown] = useState<string | null>(null)
  const [loadStatus, setLoadStatus] = useState<'idle' | 'loading' | 'error'>('idle')
  const { addCard, hasCard } = useFlashcards()
  const routerNavigate = useNavigate()
  const [showPlayMenu, setShowPlayMenu] = useState(false)
  const [menuAlignRight, setMenuAlignRight] = useState(false)
  const [showQuestions, setShowQuestions] = useState(false)
  const [showLearningProgress, setShowLearningProgress] = useState(false)
  const playMenuRef = useRef<HTMLDivElement>(null)
  const playBtnRef = useRef<HTMLButtonElement>(null)

  // Swipe-to-navigate (mobile touch only — desktop keeps click-to-flip + Prev/Next buttons)
  const [dragX, setDragX] = useState(0)
  const [swiping, setSwiping] = useState(false)
  const [settling, setSettling] = useState(false)
  const touchStartRef = useRef<{ x: number; y: number } | null>(null)
  const horizontalLockRef = useRef(false)
  const dragXRef = useRef(0)

  const current = cards[index]

  useEffect(() => {
    if (focusMode) setExpanded(false)
  }, [focusMode])

  useEffect(() => {
    setFlipped(defaultFlipped)
    setExpanded(false)
    setMarkdown(null)
    setShowPlayMenu(false)
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

  useEffect(() => {
    function handleOutside(e: MouseEvent) {
      if (playMenuRef.current && !playMenuRef.current.contains(e.target as Node)) {
        setShowPlayMenu(false)
      }
    }
    if (showPlayMenu) document.addEventListener('mousedown', handleOutside)
    return () => document.removeEventListener('mousedown', handleOutside)
  }, [showPlayMenu])

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
      setExpanded(false)
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
      // The card flies off — same flick as the Prev/Next buttons.
      playSound('page')
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
  const remainder = markdown ? withoutFirstParagraph(markdown) : null
  const allEquations = markdown ? extractMathBlockquotes(markdown) : []
  const cardImages = markdown ? extractImages(markdown) : []

  return (
    <div className="flex flex-col items-center gap-5 px-4 py-6">
      {/* Flip card */}
      <div
        data-tour="flip-card"
        data-sound="none"
        className={`relative w-full max-w-xl min-h-56 rounded-2xl bg-card text-card-foreground shadow-xl flex flex-col cursor-pointer${flipped ? '' : ' select-none'}${isFlashing ? ' flashcard-highlight' : ''}`}
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
        aria-label={flipped ? undefined : 'Click to reveal'}
        onKeyDown={e => { if (!flipped && (e.key === 'Enter' || e.key === ' ')) { e.preventDefault(); handleFlip() } }}
      >
        {swiping && Math.abs(dragX) > 20 && (
          <div
            className={`pointer-events-none absolute inset-y-0 flex items-center z-10 ${dragX < 0 ? 'right-3' : 'left-3'}`}
            style={{ opacity: Math.min(Math.abs(dragX) / SWIPE_THRESHOLD, 1) }}
          >
            <div className="rounded-full bg-foreground/10 p-2">
              {dragX < 0
                ? (hasNext ? <ChevronRight className="h-6 w-6" /> : null)
                : (hasPrev ? <ChevronLeft className="h-6 w-6" /> : null)}
            </div>
          </div>
        )}
        {isCompleted && (
          <span
            className="absolute top-3 right-3 z-10 text-green-500 pointer-events-none"
            title="Completed"
            aria-label="Completed"
          >
            <CheckCircle2 className="h-5 w-5" />
          </span>
        )}
        {!flipped ? (
          <div className="flex-1 flex flex-col items-center justify-center p-8 gap-3">
            <span className="text-3xl font-bold text-center leading-tight">{current.name}</span>
          </div>
        ) : (
          // data-math-scope: the revealed face is one math-focus set (see
          // lib/mathFocus.ts) — Math View renders each equation as its own
          // article, and Previous/Next should run through all of them.
          <div className="flex-1 flex flex-col p-6 gap-4" data-math-scope="">
            {!focusMode && (
            <div className="flex items-center gap-2">
              <p className="text-sm font-medium text-muted-foreground">{current.name}</p>
              {/* Play menu — left-aligned right after the name */}
              <div className="relative shrink-0" ref={playMenuRef} onClick={e => e.stopPropagation()}>
                <button
                  ref={playBtnRef}
                  type="button"
                  data-sound="actions"
                  onPointerDown={e => e.stopPropagation()}
                  onClick={(e) => {
                    e.stopPropagation()
                    if (!showPlayMenu && playBtnRef.current) {
                      const rect = playBtnRef.current.getBoundingClientRect()
                      setMenuAlignRight(window.innerWidth - rect.right < 200)
                    }
                    setShowPlayMenu(v => !v)
                  }}
                  className="inline-flex items-center justify-center h-7 w-7 rounded-md bg-background hover:bg-accent text-foreground shrink-0"
                  title="Quiz, Study Guide, and more"
                  aria-label="Quiz, Study Guide, and more"
                >
                  <Play className="h-3.5 w-3.5" />
                </button>
                {showPlayMenu && (
                  <div className={`absolute top-full mt-1 w-52 rounded-md bg-popover text-popover-foreground shadow-md z-50 py-1 ${menuAlignRight ? 'right-0' : 'left-0'}`}>
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
                        onClick={() => { routerNavigate(wikiRoute(current)); setShowPlayMenu(false) }}
                        className="w-full flex items-center gap-2 px-3 py-2 text-sm hover:bg-accent transition-colors"
                      >
                        <BookOpen className="h-3.5 w-3.5 shrink-0" />
                        Open in Study Guide
                      </button>
                    )}
                    <div className="flex items-center hover:bg-accent transition-colors">
                      <button
                        type="button"
                        data-sound="none"
                        onClick={() => {
                          if (!hasCard(current.name)) { playSound('addToDeck'); showAddedToDeck(1) }
                          addCard(current)
                        }}
                        className="flex-1 flex items-center gap-2 px-3 py-2 text-sm"
                      >
                        <span className="h-3.5 w-3.5 shrink-0 flex items-center justify-center text-xs">
                          {hasCard(current.name) ? '✓' : '+'}
                        </span>
                        {hasCard(current.name) ? 'Added to Flashcards' : 'Add to Flashcards'}
                      </button>
                    </div>
                    <button
                      type="button"
                      onClick={() => { onSetModes(new Set(['math'])); setShowPlayMenu(false) }}
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
                      Learning Progress
                    </button>
                  </div>
                )}
              </div>
            </div>
            )}
            {loadStatus === 'loading' && (
              <div className="flex items-center gap-2 text-sm text-muted-foreground py-4">
                <Loader2 className="h-4 w-4 animate-spin" /> Loading…
              </div>
            )}
            {loadStatus === 'error' && (
              <p className="text-sm text-destructive">Couldn't load content.</p>
            )}
            {reverseCardModes.has('definition') && definition && (
              <div>
                <WikiArticle
                  markdown={definition}
                  onWikiLink={ref => { const { open, jumpTo, openAt } = useConceptPopup.getState(); if (open) jumpTo(ref); else openAt([ref], 0); return true }}
                />
              </div>
            )}
            {reverseCardModes.has('math') && allEquations.length > 0 && (
              <div className="space-y-3">
                {allEquations.map((eq, i) => (
                  <WikiArticle key={i} markdown={eq} onWikiLink={ref => { const { open, jumpTo, openAt } = useConceptPopup.getState(); if (open) jumpTo(ref); else openAt([ref], 0); return true }} />
                ))}
              </div>
            )}
            {reverseCardModes.has('images') && cardImages.length > 0 && (
              <div className="space-y-3">
                {cardImages.map((img, i) => (
                  <figure key={i} className="flex flex-col items-center gap-1">
                    {/* Figures are the point of the card, not a thumbnail: fill the
                        card's width and only clamp on height so a tall one still fits
                        above the Again / Got it buttons. */}
                    <img src={img.src} alt={img.alt} className="w-full max-h-[60vh] object-contain rounded" onError={e => { (e.currentTarget as HTMLImageElement).style.display = 'none' }} />
                    {img.caption && (
                      <figcaption className="text-xs text-muted-foreground text-center">{img.caption}</figcaption>
                    )}
                  </figure>
                ))}
              </div>
            )}
            {expanded && remainder && (
              <div className="pt-4 overflow-y-auto max-h-96">
                <WikiArticle
                  markdown={remainder}
                  sourcePath={entryRefToRepoPath(current)}
                  onWikiLink={ref => { const { open, jumpTo, openAt } = useConceptPopup.getState(); if (open) jumpTo(ref); else openAt([ref], 0); return true }}
                />
              </div>
            )}
            {markdown && !focusMode && (
              <button
                type="button"
                onClick={e => { e.stopPropagation(); setExpanded(v => !v) }}
                className="flex items-center justify-center w-full mt-auto pt-2 pb-1 text-muted-foreground hover:text-foreground transition-colors"
                aria-label={expanded ? 'Collapse' : 'Expand'}
              >
                {expanded
                  ? <ChevronUp className="h-8 w-8" />
                  : <ChevronDown className="h-8 w-8" />
                }
              </button>
            )}
          </div>
        )}
      </div>

      {/* Again / Got it — the self-assessment loop, revealed once the card is
          flipped. "Got it" marks the card complete and jumps to the next
          unfinished card; "Again" keeps it cycling until it sticks. */}
      {flipped && (
        <div className="flex items-stretch gap-3 w-full max-w-xl">
          <button
            type="button"
            onClick={() => onRate('again')}
            title="Keep this card in rotation (1)"
            className="flex-1 flex items-center justify-center gap-2 px-4 py-3 rounded-xl bg-rose-500/10 text-rose-600 dark:text-rose-400 text-sm font-semibold hover:bg-rose-500/20 active:scale-[0.98] transition-all"
          >
            <RotateCcw className="h-4 w-4" /> Again
          </button>
          <button
            type="button"
            data-sound="none"
            onClick={() => onRate('got')}
            title="Mark complete and continue (2)"
            className="flex-1 flex items-center justify-center gap-2 px-4 py-3 rounded-xl bg-green-500/15 text-green-600 dark:text-green-400 text-sm font-semibold hover:bg-green-500/25 active:scale-[0.98] transition-all"
          >
            <CheckCircle2 className="h-4 w-4" /> Got it
          </button>
        </div>
      )}

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
    </div>
  )
})

// ─── Main Page ────────────────────────────────────────────────────────────────

// The page proper is `FlashcardsDeck` below; this shell exists only so the
// add-flashcards sheet outlives it. `FlashcardsDeck` returns two completely
// different trees either side of "is the deck empty?", so everything it renders
// — the controls footer, the "+", and until now the sheet hanging off it — is
// torn down the instant the first card lands. Owning the sheet (and the
// gallery-expanded flag it flips) up here keeps it open across that switch, so
// adding your first card leaves you where you were, free to add a second.
export default function Flashcards() {
  const [galleryExpanded, setGalleryExpanded] = useState(false)

  return (
    <AddFlashcardsSheetHost onCardsAdded={() => setGalleryExpanded(true)}>
      <FlashcardsDeck
        galleryExpanded={galleryExpanded}
        setGalleryExpanded={setGalleryExpanded}
      />
    </AddFlashcardsSheetHost>
  )
}

function FlashcardsDeck({
  galleryExpanded,
  setGalleryExpanded,
}: {
  galleryExpanded: boolean
  setGalleryExpanded: (open: boolean) => void
}) {
  const {
    cards, removeCard, clearCards, customOrder, setCustomOrder,
    toggleCompleted, clearCompleted, resetCompleted,
  } = useFlashcards()
  const { syllabi } = useWikiSyllabus()
  const { records: masteryRecords } = useConceptMastery()
  const popupOpen = useConceptPopup(s => s.open)
  // "Got it" gates on collection (see docs/flashcard-collection.md): rating an
  // uncollected card "Got it" opens the collect comprehension check instead of
  // completing the card outright — Introduce → Flashcard → Collect → Quiz.
  // `pendingGotNameRef` remembers which card triggered the gate so the study
  // loop can pick up where it left off once the check is passed (or dropped,
  // if the player backs out without collecting).
  const collectedCards = useCollectedCards(s => s.cards)
  const collectedSet = useMemo(
    () => new Set(collectedCards.map(c => c.name.toLowerCase())),
    [collectedCards],
  )
  const openCollect = useCollect(s => s.open)
  const collectOpenRef = useCollect(s => s.ref)
  const pendingGotNameRef = useRef<string | null>(null)
  const popupCurrentName = useConceptPopup(s => s.open ? (s.list[s.index]?.name ?? null) : null)
  const [searchParams, setSearchParams] = useSearchParams()
  const highlightName = searchParams.get('highlight')
  const viewParam = searchParams.get('view')

  const [flashingCard, setFlashingCard] = useState<string | null>(null)
  const flashTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null)
  // Names (lowercased) of completed cards currently animating out of the deck
  // before "Clear Completed Flashcards" sweeps them out of the deck.
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

  // `galleryExpanded` is owned by the page shell above, so the add-flashcards
  // sheet can expand the gallery behind itself without this component holding
  // the flag it would drop on the empty-deck switch.
  // Manage-deck dialog (rename/save/clear) — opened from the bin in the
  // controls footer, which is where the gallery's old header row moved to.
  const [showManageDialog, setShowManageDialog] = useState(false)
  const [focusMode, setFocusMode] = useState(false)
  // The study-view controls toolbar (Gallery / Flip / Back content / shuffle /
  // focus) starts collapsed; a chevron under the card count expands it.
  const [controlsExpanded, setControlsExpanded] = useState(false)
  const [showShortcutsHelp, setShowShortcutsHelp] = useState(false)
  const [groupBy, setGroupBy] = useState<GroupBy>('exam')
  // The shuffled deck order (card names) while groupBy === 'shuffle'. Freshly
  // drawn each time shuffle is chosen; newly added cards append at the end.
  const [shuffleOrder, setShuffleOrder] = useState<string[]>([])
  // Per-card "Again" tallies for the current study session (feeds the summary).
  const [againCounts, setAgainCounts] = useState<Record<string, number>>({})
  const [showSessionSummary, setShowSessionSummary] = useState(false)
  const [reverseCardModes, setReverseCardModes] = useState<Set<ReverseCardSection>>(
    new Set<ReverseCardSection>(['definition']),
  )
  const [globalFlip, setGlobalFlip] = useState(false)

  // Lock the page behind the viewport-covering views — but only while one of
  // them is actually on screen. Both unmount when the deck empties (the
  // empty-deck branch below renders its own scrolling layout instead), so a
  // clear/remove that takes the last card has to release the lock too.
  const lockPageScroll = shouldLockPageScroll({
    deckSize: cards.length,
    galleryExpanded,
    focusMode,
  })
  useEffect(() => {
    if (lockPageScroll) {
      document.body.style.overflow = 'hidden'
    } else {
      document.body.style.overflow = ''
    }
    return () => { document.body.style.overflow = '' }
  }, [lockPageScroll])

  // …and drop the overlay state itself, so re-adding a card doesn't drop the
  // user straight back into a gallery or focus mode they never reopened.
  useEffect(() => {
    if (cards.length === 0) {
      setGalleryExpanded(false)
      setFocusMode(false)
    }
  }, [cards.length, setGalleryExpanded])

  useEffect(() => {
    function handleKeyDown(e: KeyboardEvent) {
      if (e.key === 'Escape' && focusMode) setFocusMode(false)
    }
    document.addEventListener('keydown', handleKeyDown)
    return () => document.removeEventListener('keydown', handleKeyDown)
  }, [focusMode])

  // Keyboard navigation for study mode (disabled when gallery overlay or popups are open)
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
  }, !galleryExpanded && !popupOpen && !collectOpenRef && !showShortcutsHelp && !showSessionSummary && cards.length > 0)

  function toggleReverseMode(mode: ReverseCardSection) {
    setReverseCardModes(prev => {
      const next = new Set(prev)
      if (next.has(mode)) next.delete(mode); else next.add(mode)
      return next
    })
  }

  const sensors = useSensors(
    useSensor(MouseSensor, { activationConstraint: { distance: 5 } }),
    useSensor(TouchSensor, { activationConstraint: { delay: 250, tolerance: 5 } }),
  )

  // Reset tracked popup name when popup closes
  useEffect(() => {
    if (!popupOpen) prevPopupNameRef.current = null
  }, [popupOpen])

  // Cancel any in-flight "Clear Completed" animation timer on unmount.
  useEffect(() => () => { clearTimersRef.current.forEach(clearTimeout) }, [])

  // Flash and navigate the gallery strip when popup navigates to a new concept
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

  // concept name → exam label
  const conceptToExam = useMemo(() => {
    const map = new Map<string, string>()
    for (const s of syllabi) {
      for (const topic of s.topics) {
        for (const c of topic.concepts) {
          map.set(c.name.toLowerCase(), s.examLabel)
        }
      }
    }
    return map
  }, [syllabi])

  // concept name → syllabus position { topicIndex, conceptIndex } for ordering
  const conceptSyllabusPosition = useMemo(() => {
    const map = new Map<string, { topicIndex: number; conceptIndex: number }>()
    for (const s of syllabi) {
      s.topics.forEach((topic, topicIndex) => {
        topic.concepts.forEach((c, conceptIndex) => {
          map.set(c.name.toLowerCase(), { topicIndex, conceptIndex })
        })
      })
    }
    return map
  }, [syllabi])

  // concept name → best mastery state
  const conceptMasteryMap = useMemo(() => {
    const map = new Map<string, MasteryState>()
    const now = new Date()
    const best = new Map<string, typeof masteryRecords[number]>()
    for (const r of masteryRecords) {
      const slug = r.concept_slug.toLowerCase()
      const existing = best.get(slug)
      if (!existing || (r.last_attempted_at ?? '') > (existing.last_attempted_at ?? '')) {
        best.set(slug, r)
      }
    }
    for (const [slug, r] of best) {
      map.set(slug, decayIfStale(r, now).state)
    }
    return map
  }, [masteryRecords])

  // Sync customOrder when new cards are added
  useEffect(() => {
    const inOrder = new Set(customOrder.map(n => n.toLowerCase()))
    const missing = cards.filter(c => !inOrder.has(c.name.toLowerCase())).map(c => c.name)
    if (missing.length > 0) setCustomOrder([...customOrder, ...missing])
  }, [cards, customOrder, setCustomOrder])

  // Ordered flat list
  const orderedCards = useMemo((): FlashCard[] => {
    if (groupBy === 'date') return [...cards].sort((a, b) => b.addedAt - a.addedAt)
    if (groupBy === 'alpha') return [...cards].sort((a, b) => a.name.localeCompare(b.name))
    if (groupBy === 'mastery') {
      return needsReviewOrder(cards, c => conceptMasteryMap.get(c.name.toLowerCase()) ?? 'new')
    }
    if (groupBy === 'shuffle') {
      const nameToCard = new Map(cards.map(c => [c.name.toLowerCase(), c]))
      const ordered: FlashCard[] = []
      for (const name of shuffleOrder) {
        const card = nameToCard.get(name.toLowerCase())
        if (card) ordered.push(card)
      }
      for (const card of cards) {
        if (!ordered.some(c => c.name.toLowerCase() === card.name.toLowerCase())) ordered.push(card)
      }
      return ordered
    }
    if (groupBy === 'custom') {
      const nameToCard = new Map(cards.map(c => [c.name.toLowerCase(), c]))
      const ordered: FlashCard[] = []
      for (const name of customOrder) {
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
      const pa = conceptSyllabusPosition.get(a.name.toLowerCase())
      const pb = conceptSyllabusPosition.get(b.name.toLowerCase())
      if (pa && pb) {
        if (pa.topicIndex !== pb.topicIndex) return pa.topicIndex - pb.topicIndex
        return pa.conceptIndex - pb.conceptIndex
      }
      return a.name.localeCompare(b.name)
    })
  }, [cards, customOrder, groupBy, conceptToExam, conceptSyllabusPosition, conceptMasteryMap, shuffleOrder])

  orderedCardsRef.current = orderedCards

  // Derived, not stored: re-point at the named active card on every re-sort so
  // the deck can be reordered under the reader without swapping their card.
  const activeIndex = resolveActiveIndex(
    orderedCards.map(c => c.name),
    activeName,
    lastIndexRef.current,
  )
  lastIndexRef.current = activeIndex

  const completedCount = useMemo(() => cards.filter(c => c.completedAt).length, [cards])

  function handleShuffle() {
    playSound('shuffle')
    setShuffleOrder(shuffled(cards.map(c => c.name)))
    setGroupBy('shuffle')
    resetActiveIndex()
  }

  // Rate a card and advance to the next unfinished one, wrapping around the
  // deck. "Got it" marks it complete; "Again" tallies a lapse (and
  // un-completes a previously finished card that has slipped). Once nothing is
  // left unfinished, the session summary takes over. Split out from
  // `handleRate` so the deferred "got it" path below (after the collect gate)
  // can apply the same logic against whichever index the card ends up at.
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

  // A concept must be collected before its mastery can pass New (see
  // docs/flashcard-collection.md), so "Got it" on an uncollected card opens
  // the collect comprehension check — Introduce → Flashcard → Collect → Quiz
  // — instead of completing the card outright. The card only completes once
  // the check is passed (picked up by the effect below); backing out of the
  // modal without collecting leaves the card exactly as it was.
  function handleRate(rating: StudyRating) {
    const card = orderedCards[activeIndex]
    if (!card) return
    if (rating === 'got' && !collectedSet.has(card.name.toLowerCase())) {
      pendingGotNameRef.current = card.name
      openCollect({ kind: 'concept', name: card.name }, { onSkip: () => skipCollectCheck(card.name) })
      return
    }
    applyRating(rating, card, activeIndex)
  }

  // "Skip for now" in the collect check: the reader can't answer it yet, so the
  // card is left exactly as it was — uncollected, unrated, still in rotation —
  // and the session moves on to the next unfinished card rather than stalling
  // on a gate. The card is found by name because the deck's order can be
  // rebuilt while the modal is open (see resolveActiveIndex).
  function skipCollectCheck(name: string) {
    pendingGotNameRef.current = null
    const list = orderedCardsRef.current
    const index = list.findIndex(c => c.name.toLowerCase() === name.toLowerCase())
    if (index === -1) return
    const next = nextIncompleteIndex(list.map(c => !!c.completedAt), index)
    // -1: nothing left unfinished. next === index: this is the only card still
    // going, so there is nowhere to move — leave it on screen.
    if (next === -1 || next === index) return
    setActiveIndex(next)
  }

  // Fires once the collect modal closes. If the card that triggered it is now
  // collected, complete the "Got it" rating that was deferred; if the player
  // closed the modal without passing the check, do nothing — the card stays
  // in rotation.
  useEffect(() => {
    if (collectOpenRef) return
    const pending = pendingGotNameRef.current
    if (!pending) return
    pendingGotNameRef.current = null
    if (!collectedSet.has(pending.toLowerCase())) return
    const idx = orderedCards.findIndex(c => c.name.toLowerCase() === pending.toLowerCase())
    if (idx === -1) return
    applyRating('got', orderedCards[idx], idx)
  }, [collectOpenRef, collectedSet]) // eslint-disable-line react-hooks/exhaustive-deps

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
  // opens the gallery so the cards just added are what you land on.
  // The param is consumed immediately so a later Back/refresh doesn't reopen it.
  useEffect(() => {
    if (viewParam !== 'deck') return
    // With an empty deck the gallery is already inline on the page; expanding
    // the overlay on top of it would just cover it with the same panel.
    if (cards.length > 0) setGalleryExpanded(true)
    setSearchParams(prev => {
      const next = new URLSearchParams(prev)
      next.delete('view')
      return next
    }, { replace: true })
  }, [viewParam, cards.length, setSearchParams, setGalleryExpanded])

  // Exam groups derived from orderedCards
  const examGroups = useMemo(() => {
    if (groupBy !== 'exam') return []
    const groups: { label: string; cards: FlashCard[] }[] = []
    const seen = new Map<string, number>()
    for (const card of orderedCards) {
      const label = conceptToExam.get(card.name.toLowerCase()) ?? 'Other'
      if (!seen.has(label)) { seen.set(label, groups.length); groups.push({ label, cards: [] }) }
      groups[seen.get(label)!].cards.push(card)
    }
    return groups
  }, [groupBy, orderedCards, conceptToExam])

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

  // Empty state — no cards in the deck yet. Show the tabbed gallery inline so
  // the user can browse Packs / Collected and add cards to start studying. The
  // layout fills the viewport (rather than contracting to its content) and
  // keeps the controls toolbar pinned to the bottom, matching the study view.
  if (cards.length === 0) {
    return (
      <>
        <div className="container mx-auto px-4 sm:px-6 py-6 min-h-[calc(100vh-9rem)] pb-40 md:pb-32 space-y-6">
          <GalleryPanel
            inline
            onCardsAdded={() => setGalleryExpanded(true)}
            cards={cards}
            orderedCards={orderedCards}
            groupBy={groupBy}
            examGroups={examGroups}
            flashingCard={flashingCard}
            activeIndex={activeIndex}
            onSelect={setActiveIndex}
            onRemove={removeCard}
            onDragEnd={handleDragEnd}
            sensors={sensors}
            conceptMasteryMap={conceptMasteryMap}
            reverseCardModes={reverseCardModes}
            globalFlip={globalFlip}
          />
        </div>
        <ConceptPopup />

        {showShortcutsHelp && (
          <KeyboardShortcutsHelp
            context="flashcards"
            onClose={() => setShowShortcutsHelp(false)}
          />
        )}

        {/* Controls toolbar — kept visible so the empty deck doesn't lose it,
            and so the + (the only way in with an empty deck) stays reachable.
            Flip / Back content act on the gallery cards; the deck controls
            (sort, manage) stay hidden until there's a deck. */}
        <div className="fixed bottom-14 md:bottom-0 left-0 lg:left-[var(--sidebar-width)] right-0 z-[46]">
          <FlashcardControlsBar
            reverseCardModes={reverseCardModes}
            onToggleMode={toggleReverseMode}
            flip={globalFlip}
            onFlipToggle={() => setGlobalFlip(v => !v)}
            onShortcutsHelp={() => setShowShortcutsHelp(true)}
            cardCount={0}
          />
        </div>
      </>
    )
  }

  // Focus mode works in both study and gallery views — toggling it must not
  // kick the user out of the gallery. In gallery view it strips the chrome
  // (sidebar, panel header, per-card actions) so the cards themselves are the
  // only thing on screen.
  function handleFocusToggle() {
    setFocusMode(v => !v)
  }

  // Opening the gallery flashes the card being studied so you can see where
  // the active card sits among the rest; the
  // GalleryPanel scrolls it into view on mount. Closing just dismisses.
  function handleGalleryToggle() {
    if (galleryExpanded) {
      setGalleryExpanded(false)
      return
    }
    const activeCard = orderedCards[activeIndex]
    setGalleryExpanded(true)
    if (activeCard) {
      setFlashingCard(activeCard.name)
      if (flashTimerRef.current) clearTimeout(flashTimerRef.current)
      flashTimerRef.current = setTimeout(() => setFlashingCard(null), 1700)
    }
  }

  // "Clear Completed Flashcards" — take the user to the deck and play a brief
  // disappear animation on the finished cards, then sweep them into a dated
  // pack. Shared by the end-of-session summary dialog and the in-deck toolbar
  // button so the clear always reads as a deliberate, visible action.
  function handleClearCompleted() {
    // Visual order (not insertion order) so the sweep reads top-to-bottom the
    // same way the deck is laid out on screen.
    const names = orderedCards.filter(c => c.completedAt).map(c => c.name.toLowerCase())
    if (names.length === 0) return
    setShowSessionSummary(false)
    setGalleryExpanded(true)
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

  const studyFocus = focusMode && !galleryExpanded

  return (
    <>
      {/* Focus mode backdrop — clicking it closes focus mode */}
      {focusMode && (
        <div
          className="fixed inset-0 z-[55] bg-black"
          onClick={() => setFocusMode(false)}
        />
      )}

      {/* Focus mode close button */}
      {focusMode && (
        <button
          type="button"
          onClick={() => setFocusMode(false)}
          className="fixed top-3 right-4 z-[60] flex items-center justify-center w-10 h-10 rounded-full bg-white/10 hover:bg-white/20 active:bg-white/30 text-white transition-colors"
          title="Exit focus mode (Esc)"
        >
          <X className="h-5 w-5" />
        </button>
      )}

      {/* Expanded gallery overlay */}
      {galleryExpanded && (
        <GalleryPanel
          cards={cards}
          orderedCards={orderedCards}
          groupBy={groupBy}
          examGroups={examGroups}
          flashingCard={flashingCard}
          activeIndex={activeIndex}
          onSelect={idx => { setActiveIndex(idx) }}
          onRemove={removeCard}
          onDragEnd={handleDragEnd}
          sensors={sensors}
          onClose={() => setGalleryExpanded(false)}
          conceptMasteryMap={conceptMasteryMap}
          reverseCardModes={reverseCardModes}
          globalFlip={globalFlip}
          focusMode={focusMode}
          clearingNames={clearingNames}
          onClearCompleted={handleClearCompleted}
        />
      )}

      <div
        className={`container max-w-4xl mx-auto pb-44 md:pb-36${studyFocus ? ' relative z-[56] pointer-events-none' : ''}`}
        style={popupOpen ? { paddingBottom: 'calc(var(--concept-split-height, 50vh) + 1.5rem)' } : undefined}
      >
        {/* Study area — no page title here; the nav already says "Flashcards"
            and the deck should get the full height. */}
        <div className={studyFocus ? 'pointer-events-auto' : undefined}>
          <FlashcardStudyArea
            ref={studyAreaRef}
            cards={orderedCards}
            index={activeIndex}
            isFlashing={flashingCard?.toLowerCase() === orderedCards[activeIndex]?.name.toLowerCase()}
            reverseCardModes={reverseCardModes}
            onSetModes={setReverseCardModes}
            defaultFlipped={globalFlip}
            onNext={() => setActiveIndex(i => Math.min(i + 1, orderedCards.length - 1))}
            onPrev={() => setActiveIndex(i => Math.max(i - 1, 0))}
            hasNext={activeIndex < orderedCards.length - 1}
            hasPrev={activeIndex > 0}
            focusMode={focusMode}
            onRate={handleRate}
            isCompleted={!!orderedCards[activeIndex]?.completedAt}
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
          onStudyAgain={() => {
            resetCompleted()
            if (groupBy === 'shuffle') setShuffleOrder(shuffled(cards.map(c => c.name)))
            setAgainCounts({})
            setShowSessionSummary(false)
            resetActiveIndex()
          }}
          onClose={() => setShowSessionSummary(false)}
        />
      )}

      {/* Fixed controls footer — always at bottom, above mobile nav */}
      <div
        className={`fixed bottom-14 md:bottom-0 left-0 lg:left-[var(--sidebar-width)] right-0 transition-opacity duration-300 ${
          focusMode ? 'z-[57] opacity-30 hover:opacity-100 focus-within:opacity-100' : 'z-[46]'
        }`}
      >
        {/* Gallery + Focus buttons — standalone pills above the nav. Shown in
            both study and gallery views so the Gallery toggle can return to
            study when the gallery overlay is open. Hidden in focus mode, which
            pares the footer down to just the Prev/Next nav. */}
        {!focusMode && (
          <div className="flex items-center justify-between gap-3 bg-background px-4 py-2">
            <StudyGalleryToggle
              galleryOpen={galleryExpanded}
              onToggle={handleGalleryToggle}
              count={cards.length}
              className="flex-1"
            />
            <FocusModeToggle focusMode={focusMode} onToggle={handleFocusToggle} className="flex-1" />
          </div>
        )}
        {/* Prev / Next nav footer — only in study mode */}
        {!galleryExpanded && (
          <>
          <NavProgressBar
            current={activeIndex + 1}
            total={orderedCards.length}
            label={`Card ${activeIndex + 1} of ${orderedCards.length}`}
            onScrub={next => setActiveIndex(next - 1)}
            formatValue={n => orderedCards[n - 1]?.name ?? `${n} of ${orderedCards.length}`}
          />
          <div className="flex items-stretch h-16 shrink-0 bg-background">
            <button
              type="button"
              disabled={activeIndex === 0}
              data-sound="page"
              onClick={() => setActiveIndex(activeIndex - 1)}
              className="flex-1 flex items-center justify-center gap-2 px-4 text-base sm:text-sm font-medium hover:bg-accent/60 active:bg-accent disabled:opacity-40 disabled:cursor-not-allowed transition-colors"
            >
              <ChevronLeft className="h-6 w-6 sm:h-5 sm:w-5" />
              <span>Previous</span>
            </button>
            {/* The position is already read off the bar above (and off the card
                itself while scrubbing), so the middle column is the controls
                handle — sized as the target it is, not as a footnote. */}
            <div className="self-center px-2 shrink-0 flex flex-col items-center">
              {completedCount > 0 && (
                <span className="flex items-center gap-0.5 text-[10px] font-semibold text-green-600 dark:text-green-400 tabular-nums">
                  <CheckCircle2 className="h-3 w-3" /> {completedCount} done
                </span>
              )}
              <button
                type="button"
                data-tour="flashcard-controls-toggle"
                onClick={() => setControlsExpanded(v => !v)}
                aria-expanded={controlsExpanded}
                aria-label={controlsExpanded ? 'Hide controls' : 'Show controls'}
                title={controlsExpanded ? 'Hide controls' : 'Show controls'}
                className="inline-flex items-center justify-center h-12 w-16 rounded-md text-muted-foreground hover:text-foreground hover:bg-accent transition-colors"
              >
                <ChevronUp className={`h-8 w-8 transition-transform ${controlsExpanded ? '' : 'rotate-180'}`} />
              </button>
            </div>
            <button
              type="button"
              disabled={activeIndex === orderedCards.length - 1}
              data-sound="page"
              onClick={() => setActiveIndex(activeIndex + 1)}
              className="flex-1 flex items-center justify-center gap-2 px-4 text-base sm:text-sm font-medium hover:bg-accent/60 active:bg-accent disabled:opacity-40 disabled:cursor-not-allowed transition-colors"
            >
              <span>Next</span>
              <ChevronRight className="h-6 w-6 sm:h-5 sm:w-5" />
            </button>
          </div>
          </>
        )}
        {(galleryExpanded || controlsExpanded) && (
          <FlashcardControlsBar
            reverseCardModes={reverseCardModes}
            onToggleMode={toggleReverseMode}
            flip={globalFlip}
            onFlipToggle={() => setGlobalFlip(v => !v)}
            onShortcutsHelp={() => setShowShortcutsHelp(true)}
            cardCount={cards.length}
            onManage={() => setShowManageDialog(true)}
          />
        )}
      </div>

      {showManageDialog && (
        <FlashcardsManageDialog
          cardCount={cards.length}
          onCancel={() => setShowManageDialog(false)}
          onRemoveAll={() => { clearCards(); setGalleryExpanded(false); setShowManageDialog(false) }}
        />
      )}
    </>
  )
}
