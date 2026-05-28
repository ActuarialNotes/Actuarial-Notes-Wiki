import { useEffect, useMemo, useRef, useState } from 'react'
import { Link, useNavigate, useSearchParams } from 'react-router-dom'
import {
  BookOpen,
  CalendarDays,
  Check,
  ChevronLeft,
  ChevronRight,
  ChevronsUpDown,
  Images,
  LayoutGrid,
  Loader2,
  Play,
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
import { useWikiSyllabus } from '@/hooks/useWikiSyllabus'
import { useConceptMastery } from '@/hooks/useConceptMastery'
import { useConceptPopup } from '@/hooks/useConceptPopup'
import { useStudyPlan } from '@/hooks/useStudyPlan'
import { useExamProgress } from '@/contexts/ExamProgressContext'
import { fetchWikiFile } from '@/lib/github'
import { entryRefToRepoPath, wikiRoute } from '@/lib/wikiRoutes'
import type { WikiEntryRef } from '@/lib/wikiRoutes'
import { decayIfStale, type MasteryState } from '@/lib/mastery'
import { wikiExamIdToProgressKey } from '@/lib/wikiParser'
import { WikiArticle, stripFrontmatter, extractMathBlockquotes, extractImages } from '@/components/wiki/WikiArticle'
import { ConceptPopup } from '@/components/wiki/ConceptPopup'
import { ConceptQuestionsModal } from '@/components/wiki/ConceptQuestionsModal'
import { LearningProgressModal } from '@/components/wiki/LearningProgressModal'

type GroupBy = 'exam' | 'date' | 'alpha' | 'custom'
type ReverseCardSection = 'definition' | 'math' | 'images'

const GROUP_LABELS: { key: GroupBy; label: string }[] = [
  { key: 'exam',   label: 'Exam' },
  { key: 'date',   label: 'Date' },
  { key: 'alpha',  label: 'A–Z' },
  { key: 'custom', label: 'Custom' },
]

const MASTERY_CONFIG: Record<MasteryState, { label: string; className: string; dotClass: string }> = {
  new:       { label: 'New',       className: 'bg-muted text-muted-foreground',                     dotClass: 'bg-muted-foreground/40' },
  level1:    { label: '1',         className: 'bg-amber-500/20 text-amber-600 dark:text-amber-400', dotClass: 'bg-amber-500' },
  level2:    { label: '2',         className: 'bg-blue-500/20 text-blue-600 dark:text-blue-400',    dotClass: 'bg-blue-500' },
  level3:    { label: '3',         className: 'bg-green-500/20 text-green-600 dark:text-green-400', dotClass: 'bg-green-500' },
  forgotten: { label: 'Forgotten', className: 'bg-rose-500/20 text-rose-600 dark:text-rose-400',   dotClass: 'bg-rose-500' },
}

function MasteryPill({ state }: { state: MasteryState }) {
  const { label, className } = MASTERY_CONFIG[state]
  return (
    <span className={`inline-flex items-center px-2 py-0.5 rounded-full text-[11px] font-semibold ${className}`}>
      {label}
    </span>
  )
}

const BREADCRUMB_RE = /^\[\[[^\]|]*(?:\|[^\]]+)?\]\][^\n]* \/ [^\n]*\n?/

function extractFirstParagraph(markdown: string): string {
  const cleaned = stripFrontmatter(markdown).replace(BREADCRUMB_RE, '')
  const lines = cleaned.split('\n')
  const paragraphLines: string[] = []
  let started = false
  for (const line of lines) {
    const trimmed = line.trim()
    if (!started) {
      if (trimmed && !trimmed.startsWith('#') && !/^[*+-] /.test(trimmed) && !/^\d+\. /.test(trimmed) && !trimmed.startsWith('>')) {
        started = true
        paragraphLines.push(trimmed)
      }
    } else {
      if (trimmed === '') break
      paragraphLines.push(trimmed)
    }
  }
  return paragraphLines.join('\n')
}

// ─── Today's Study Plan ───────────────────────────────────────────────────────

function TodayStudyPlanSection() {
  const { syllabi } = useWikiSyllabus()
  const { records: masteryRecords, loading: masteryLoading } = useConceptMastery()
  const { progress: examProgress, targetDates } = useExamProgress()
  const { addCard, hasCard } = useFlashcards()
  const [collapsed, setCollapsed] = useState(true)
  const [selectedPlan, setSelectedPlan] = useState<Set<string>>(new Set())

  const inProgressSyllabi = useMemo(
    () => syllabi.filter(s => examProgress[wikiExamIdToProgressKey(s.examId)] === 'in_progress'),
    [syllabi, examProgress],
  )

  const primarySyllabus = inProgressSyllabi[0] ?? null
  const primaryProgressKey = primarySyllabus ? wikiExamIdToProgressKey(primarySyllabus.examId) : null
  const primaryTargetDate = primaryProgressKey ? (targetDates[primaryProgressKey] ?? null) : null

  const { plan: studyPlan, loading: planLoading } = useStudyPlan(
    primarySyllabus,
    masteryRecords,
    primaryTargetDate,
    masteryLoading,
  )

  const displayConcepts = useMemo(() => {
    if (!studyPlan) return []
    return studyPlan.status === 'review_mode' ? studyPlan.reviewConcepts : studyPlan.todaysConcepts
  }, [studyPlan])

  const notYetAdded = displayConcepts.filter(name => !hasCard(name))
  const allAdded = displayConcepts.length > 0 && notYetAdded.length === 0

  function togglePlanSelect(name: string) {
    setSelectedPlan(prev => {
      const next = new Set(prev)
      if (next.has(name)) next.delete(name); else next.add(name)
      return next
    })
  }

  function handleAddSelected() {
    const toAdd = selectedPlan.size > 0
      ? displayConcepts.filter(n => selectedPlan.has(n) && !hasCard(n))
      : notYetAdded
    for (const name of toAdd) addCard({ kind: 'concept', name })
    setSelectedPlan(new Set())
  }

  const todayLabel = new Date().toLocaleDateString(undefined, {
    weekday: 'long', month: 'long', day: 'numeric',
  })

  const isLoading = planLoading || masteryLoading

  return (
    <div className="rounded-xl border bg-card text-card-foreground">
      <div className="flex items-center justify-between px-4 py-3 border-b">
        <div className="flex items-center gap-2">
          <CalendarDays className="h-4 w-4 text-primary shrink-0" />
          <div>
            <span className="font-semibold text-sm">Today's Study Plan</span>
            {!isLoading && primarySyllabus && (
              <span className="text-xs text-muted-foreground ml-2">{primarySyllabus.examLabel} · {todayLabel}</span>
            )}
          </div>
        </div>
        <div className="flex items-center gap-1">
          {/* Add all / done indicator — visible even when collapsed */}
          {!isLoading && displayConcepts.length > 0 && (
            allAdded ? (
              <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-lg text-xs font-medium text-green-600 dark:text-green-400">
                <Check className="h-3.5 w-3.5" /> Done
              </span>
            ) : (
              <button
                type="button"
                onClick={handleAddSelected}
                className="inline-flex items-center gap-1 px-2.5 py-1 rounded-lg bg-primary text-primary-foreground text-xs font-medium hover:bg-primary/90 transition-colors"
              >
                Add all
              </button>
            )
          )}
          <button
            type="button"
            onClick={() => setCollapsed(v => !v)}
            className="text-muted-foreground hover:text-foreground p-1 transition-colors"
            aria-label={collapsed ? 'Expand study plan' : 'Collapse study plan'}
          >
            <ChevronsUpDown className="h-4 w-4" />
          </button>
        </div>
      </div>

      {!collapsed && (
        <div className="px-4 py-3 space-y-3">
          {isLoading && (
            <div className="flex items-center gap-2 text-sm text-muted-foreground py-2">
              <Loader2 className="h-4 w-4 animate-spin" /> Loading study plan…
            </div>
          )}
          {!isLoading && !primarySyllabus && (
            <p className="text-sm text-muted-foreground py-2">
              Add an exam in progress from the{' '}
              <Link to="/dashboard" className="text-primary hover:underline">Dashboard</Link>{' '}
              to see today's study plan here.
            </p>
          )}
          {!isLoading && primarySyllabus && !studyPlan?.config?.targetReadyDate && (
            <p className="text-sm text-muted-foreground py-2">
              Set up your study plan on the{' '}
              <Link to="/dashboard" className="text-primary hover:underline">Dashboard</Link>{' '}
              to see today's concepts here.
            </p>
          )}
          {!isLoading && displayConcepts.length > 0 && (
            <>
              <ul className="space-y-1">
                {displayConcepts.map(name => {
                  const added = hasCard(name)
                  const checked = selectedPlan.has(name)
                  return (
                    <li key={name} className="flex items-center gap-2.5 py-1">
                      <button
                        type="button"
                        onClick={() => !added && togglePlanSelect(name)}
                        disabled={added}
                        aria-label={added ? `${name} already in flashcards` : checked ? `Deselect ${name}` : `Select ${name}`}
                        className={`w-5 h-5 rounded-full border-2 flex items-center justify-center shrink-0 transition-colors ${
                          added
                            ? 'bg-green-500/20 border-green-500 cursor-default'
                            : checked
                              ? 'bg-primary border-primary'
                              : 'border-muted-foreground/40 hover:border-muted-foreground/70'
                        }`}
                      >
                        {(added || checked) && (
                          <svg className={`w-3 h-3 ${added ? 'text-green-600 dark:text-green-400' : 'text-primary-foreground'}`} viewBox="0 0 10 10" fill="none">
                            <path d="M1.5 5L4 7.5L8.5 2.5" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                          </svg>
                        )}
                      </button>
                      <span className={`text-sm flex-1 min-w-0 truncate ${added ? 'text-muted-foreground' : ''}`}>{name}</span>
                      {added && (
                        <span className="text-xs text-green-600 dark:text-green-400 shrink-0 flex items-center gap-1">
                          <Check className="h-3 w-3" /> In gallery
                        </span>
                      )}
                    </li>
                  )
                })}
              </ul>
              {!allAdded && (
                <button
                  type="button"
                  onClick={handleAddSelected}
                  className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-primary text-primary-foreground text-xs font-medium hover:bg-primary/90 transition-colors"
                >
                  {selectedPlan.size > 0
                    ? `Add ${selectedPlan.size} to Flashcards`
                    : `Add All ${notYetAdded.length} to Flashcards`}
                </button>
              )}
              {allAdded && (
                <p className="text-xs text-green-600 dark:text-green-400 flex items-center gap-1">
                  <Check className="h-3.5 w-3.5" /> All today's concepts are in your flashcard gallery
                </p>
              )}
            </>
          )}
        </div>
      )}
    </div>
  )
}

// ─── Gallery Strip ────────────────────────────────────────────────────────────

function GalleryStrip({
  cards,
  activeIndex,
  onSelect,
  onExpand,
  conceptMasteryMap,
}: {
  cards: FlashCard[]
  activeIndex: number
  onSelect: (index: number) => void
  onExpand: () => void
  conceptMasteryMap: Map<string, MasteryState>
}) {
  const activeChipRef = useRef<HTMLButtonElement>(null)

  useEffect(() => {
    activeChipRef.current?.scrollIntoView({ behavior: 'smooth', block: 'nearest', inline: 'center' })
  }, [activeIndex])

  return (
    <div className="relative flex items-center">
      {/* Scrollable chips */}
      <div
        className="flex items-center gap-1.5 overflow-x-auto py-2.5 pr-10 flex-1"
        style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
      >
        {cards.map((card, i) => {
          const masteryState = conceptMasteryMap.get(card.name.toLowerCase()) ?? 'new'
          const { dotClass } = MASTERY_CONFIG[masteryState]
          const isActive = i === activeIndex
          return (
            <button
              key={card.name}
              ref={isActive ? activeChipRef : undefined}
              type="button"
              onClick={() => onSelect(i)}
              className={`flex items-center gap-1.5 shrink-0 px-3 py-1.5 rounded-full border text-xs font-medium transition-colors ${
                isActive
                  ? 'bg-primary text-primary-foreground border-primary'
                  : 'bg-card text-card-foreground border-border hover:bg-accent'
              }`}
            >
              <span className={`w-1.5 h-1.5 rounded-full shrink-0 ${isActive ? 'bg-primary-foreground/70' : dotClass}`} />
              <span className="max-w-[120px] truncate">{card.name}</span>
            </button>
          )
        })}
      </div>

      {/* Fade + expand button */}
      <div className="absolute right-0 top-0 bottom-0 flex items-center pl-8 bg-gradient-to-l from-background from-60% to-transparent pointer-events-none">
        <button
          type="button"
          onClick={onExpand}
          className="pointer-events-auto flex items-center gap-1 px-2 py-1.5 rounded-lg text-muted-foreground hover:text-foreground hover:bg-accent transition-colors"
          aria-label="Expand gallery"
          title="Expand gallery"
        >
          <LayoutGrid className="h-4 w-4" />
        </button>
      </div>
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
}: {
  card: FlashCard
  masteryState: MasteryState
  onSelect: () => void
  onRemove: (name: string) => void
  isFlashing: boolean
  isActive: boolean
}) {
  const { attributes, listeners, setNodeRef, transform, transition, isDragging } = useSortable({ id: card.name })

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
    opacity: isDragging ? 0.4 : 1,
    zIndex: isDragging ? 50 : undefined,
  }

  return (
    <div
      ref={setNodeRef}
      style={style}
      data-card-name={card.name}
      {...listeners}
      {...attributes}
      className={`group relative rounded-xl border flex flex-col min-h-[120px] cursor-grab active:cursor-grabbing transition-shadow select-none ${
        isActive
          ? 'bg-primary/10 border-primary shadow-sm'
          : 'bg-card text-card-foreground hover:shadow-md'
      }${isFlashing ? ' flashcard-highlight' : ''}`}
    >
      {/* Delete button */}
      <div className="flex items-center justify-end px-2 pt-2">
        <button
          type="button"
          onPointerDown={e => e.stopPropagation()}
          onClick={e => { e.stopPropagation(); onRemove(card.name) }}
          aria-label={`Remove ${card.name}`}
          className="text-muted-foreground hover:text-destructive transition-colors opacity-0 group-hover:opacity-100 focus:opacity-100"
        >
          <Trash2 className="h-3 w-3" />
        </button>
      </div>

      {/* Name — click to select & study */}
      <button
        type="button"
        onPointerDown={e => e.stopPropagation()}
        onClick={e => { e.stopPropagation(); onSelect() }}
        className={`flex-1 flex items-center justify-center px-3 py-2 text-center transition-colors ${
          isActive ? 'text-primary' : 'hover:text-primary'
        }`}
      >
        <span className="font-semibold text-xs leading-snug">{card.name}</span>
      </button>

      {/* Mastery pill */}
      <div className="flex justify-center pb-2.5">
        <MasteryPill state={masteryState} />
      </div>
    </div>
  )
}

// ─── Gallery Panel (expanded overlay) ────────────────────────────────────────

function GalleryPanel({
  cards,
  orderedCards,
  groupBy,
  onGroupByChange,
  examGroups,
  flashingCard,
  activeIndex,
  onSelect,
  onRemove,
  onDragEnd,
  sensors,
  onClose,
  conceptMasteryMap,
}: {
  cards: FlashCard[]
  orderedCards: FlashCard[]
  groupBy: GroupBy
  onGroupByChange: (g: GroupBy) => void
  examGroups: { label: string; cards: FlashCard[] }[]
  flashingCard: string | null
  activeIndex: number
  onSelect: (index: number) => void
  onRemove: (name: string) => void
  onDragEnd: (e: DragEndEvent) => void
  sensors: ReturnType<typeof useSensors>
  onClose: () => void
  conceptMasteryMap: Map<string, MasteryState>
}) {
  function handleCardSelect(card: FlashCard) {
    const idx = orderedCards.findIndex(c => c.name === card.name)
    onSelect(idx >= 0 ? idx : 0)
    onClose()
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
      />
    )
  }

  return (
    <div className="fixed inset-0 z-40 flex flex-col bg-background" style={{ top: '3.5rem' }}>
      {/* Panel header */}
      <div className="sticky top-0 z-10 bg-background border-b">
        <div className="flex items-center justify-between gap-2 px-4 py-3">
          <span className="font-semibold text-sm shrink-0">{cards.length} card{cards.length === 1 ? '' : 's'}</span>

          {/* Sort tabs */}
          <div className="flex items-center gap-0.5 p-1 rounded-lg bg-muted/60 border flex-1 justify-center max-w-xs">
            {GROUP_LABELS.map(({ key, label }) => (
              <button
                key={key}
                type="button"
                onClick={() => onGroupByChange(key)}
                className={`flex-1 px-2 py-1 rounded-md text-xs font-medium transition-colors ${
                  groupBy === key
                    ? 'bg-background text-foreground shadow-sm'
                    : 'text-muted-foreground hover:text-foreground'
                }`}
              >
                {label}
              </button>
            ))}
          </div>

          <button
            type="button"
            onClick={onClose}
            className="p-1.5 rounded-lg text-muted-foreground hover:text-foreground hover:bg-accent transition-colors shrink-0"
            aria-label="Close gallery"
          >
            <X className="h-4 w-4" />
          </button>
        </div>
      </div>

      {/* Scrollable content */}
      <div className="flex-1 overflow-y-auto px-4 py-4 space-y-6">
        <TodayStudyPlanSection />

        <DndContext sensors={sensors} collisionDetection={closestCenter} onDragEnd={onDragEnd}>
          <SortableContext items={orderedCards.map(c => c.name)} strategy={rectSortingStrategy}>
            {groupBy === 'exam' ? (
              <div className="space-y-6">
                {examGroups.length === 0 ? (
                  <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3">
                    {orderedCards.map(renderCard)}
                  </div>
                ) : (
                  examGroups.map(({ label, cards: groupCards }) => (
                    <div key={label} className="space-y-2">
                      <h2 className="text-xs font-semibold text-muted-foreground uppercase tracking-wider">{label}</h2>
                      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3">
                        {groupCards.map(renderCard)}
                      </div>
                    </div>
                  ))
                )}
              </div>
            ) : (
              <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3">
                {orderedCards.map(renderCard)}
              </div>
            )}
          </SortableContext>
        </DndContext>
      </div>
    </div>
  )
}

// ─── Study Area ───────────────────────────────────────────────────────────────

function FlashcardStudyArea({
  cards,
  index,
  onIndexChange,
  isFlashing,
}: {
  cards: WikiEntryRef[]
  index: number
  onIndexChange: (i: number) => void
  isFlashing?: boolean
}) {
  const [flipped, setFlipped] = useState(false)
  const [expanded, setExpanded] = useState(false)
  const [markdown, setMarkdown] = useState<string | null>(null)
  const [loadStatus, setLoadStatus] = useState<'idle' | 'loading' | 'error'>('idle')
  const [reverseCardModes, setReverseCardModes] = useState<Set<ReverseCardSection>>(
    new Set<ReverseCardSection>(['definition']),
  )
  const { jumpTo } = useConceptPopup()
  const { addCard, hasCard } = useFlashcards()
  const routerNavigate = useNavigate()
  const [showPlayMenu, setShowPlayMenu] = useState(false)
  const [menuAlignRight, setMenuAlignRight] = useState(false)
  const [showQuestions, setShowQuestions] = useState(false)
  const [showLearningProgress, setShowLearningProgress] = useState(false)
  const playMenuRef = useRef<HTMLDivElement>(null)
  const playBtnRef = useRef<HTMLButtonElement>(null)

  const current = cards[index]

  useEffect(() => {
    setFlipped(false)
    setExpanded(false)
    setMarkdown(null)
    setLoadStatus('idle')
    setShowPlayMenu(false)
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

  function handleFlip() {
    if (!flipped) {
      setFlipped(true)
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

  function toggleMode(mode: ReverseCardSection) {
    setReverseCardModes(prev => {
      const next = new Set(prev)
      if (next.has(mode)) next.delete(mode); else next.add(mode)
      return next
    })
  }

  const definition = markdown ? extractFirstParagraph(markdown) : null
  const allEquations = markdown ? extractMathBlockquotes(markdown) : []
  const cardImages = markdown ? extractImages(markdown) : []

  return (
    <div className="flex flex-col items-center gap-5 px-4 py-6">
      {/* Counter row + back toggles */}
      <div className="w-full max-w-xl flex items-center justify-between gap-4">
        <span className="text-sm text-muted-foreground tabular-nums">
          {index + 1} / {cards.length}
        </span>
        <div className="flex items-center gap-2">
          <span className="text-xs text-muted-foreground">Back:</span>
          <button
            type="button"
            onClick={() => toggleMode('definition')}
            className={`inline-flex items-center justify-center h-8 w-8 rounded-md border text-sm font-serif italic font-bold transition-colors ${
              reverseCardModes.has('definition')
                ? 'bg-primary text-primary-foreground border-primary'
                : 'text-muted-foreground hover:text-foreground hover:bg-accent'
            }`}
            title="Show definition"
            aria-pressed={reverseCardModes.has('definition')}
          >
            D
          </button>
          <button
            type="button"
            onClick={() => toggleMode('math')}
            className={`inline-flex items-center justify-center h-8 w-8 rounded-md border transition-colors ${
              reverseCardModes.has('math')
                ? 'bg-primary text-primary-foreground border-primary'
                : 'text-muted-foreground hover:text-foreground hover:bg-accent'
            }`}
            title="Show math equations"
            aria-pressed={reverseCardModes.has('math')}
          >
            <Sigma className="h-4 w-4" />
          </button>
          <button
            type="button"
            onClick={() => toggleMode('images')}
            className={`inline-flex items-center justify-center h-8 w-8 rounded-md border transition-colors ${
              reverseCardModes.has('images')
                ? 'bg-primary text-primary-foreground border-primary'
                : 'text-muted-foreground hover:text-foreground hover:bg-accent'
            }`}
            title="Show images"
            aria-pressed={reverseCardModes.has('images')}
          >
            <Images className="h-4 w-4" />
          </button>
        </div>
      </div>

      {/* Flip card */}
      <div
        className={`w-full max-w-xl min-h-56 rounded-2xl border bg-card text-card-foreground shadow-xl flex flex-col cursor-pointer select-none transition-all${isFlashing ? ' flashcard-highlight' : ''}`}
        onClick={handleFlip}
        role="button"
        tabIndex={0}
        aria-label={flipped ? 'Click to flip back' : 'Click to reveal'}
        onKeyDown={e => { if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); handleFlip() } }}
      >
        {!flipped ? (
          <div className="flex-1 flex flex-col items-center justify-center p-8 gap-3">
            <span className="text-3xl font-bold text-center leading-tight">{current.name}</span>
            <span className="text-xs text-muted-foreground mt-2">click to flip</span>
          </div>
        ) : (
          <div className="flex-1 flex flex-col p-6 gap-4">
            <div className="flex items-center justify-between">
              <p className="text-sm font-medium text-muted-foreground">{current.name}</p>
              {/* Play menu */}
              <div className="relative shrink-0" ref={playMenuRef} onClick={e => e.stopPropagation()}>
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
                  className="inline-flex items-center justify-center h-7 w-7 rounded-md border bg-background hover:bg-accent text-foreground shrink-0"
                  title="Quiz, Study Guide, and more"
                  aria-label="Quiz, Study Guide, and more"
                >
                  <Play className="h-3.5 w-3.5" />
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
                        onClick={() => { addCard(current) }}
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
                      onClick={() => { setReverseCardModes(new Set(['math'])); setShowPlayMenu(false) }}
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
            {loadStatus === 'loading' && (
              <div className="flex items-center gap-2 text-sm text-muted-foreground py-4">
                <Loader2 className="h-4 w-4 animate-spin" /> Loading…
              </div>
            )}
            {loadStatus === 'error' && (
              <p className="text-sm text-destructive">Couldn't load content.</p>
            )}
            {reverseCardModes.has('definition') && definition && (
              <WikiArticle
                markdown={definition}
                onWikiLink={ref => { jumpTo(ref); return true }}
              />
            )}
            {reverseCardModes.has('math') && allEquations.length > 0 && (
              <div className="space-y-3">
                {allEquations.map((eq, i) => (
                  <WikiArticle key={i} markdown={eq} />
                ))}
              </div>
            )}
            {reverseCardModes.has('images') && cardImages.length > 0 && (
              <div className="space-y-3">
                {cardImages.map((img, i) => (
                  <figure key={i} className="flex flex-col items-center gap-1">
                    <img src={img.src} alt={img.alt} className="max-w-full max-h-48 object-contain rounded" />
                    {img.caption && (
                      <figcaption className="text-xs text-muted-foreground text-center">{img.caption}</figcaption>
                    )}
                  </figure>
                ))}
              </div>
            )}
            {!expanded && markdown && (
              <button
                type="button"
                onClick={e => { e.stopPropagation(); setExpanded(true) }}
                className="self-start text-xs text-primary hover:underline mt-1"
              >
                Expand
              </button>
            )}
            {expanded && markdown && (
              <div className="border-t pt-4 overflow-y-auto max-h-96" onClick={e => e.stopPropagation()}>
                <WikiArticle
                  markdown={markdown}
                  sourcePath={entryRefToRepoPath(current)}
                  onWikiLink={ref => { jumpTo(ref); return true }}
                />
              </div>
            )}
          </div>
        )}
      </div>

      {/* Prev / Next */}
      <div className="flex items-center gap-6">
        <button
          type="button"
          disabled={index === 0}
          onClick={() => onIndexChange(index - 1)}
          className="inline-flex items-center gap-1.5 px-4 py-2 rounded-lg border text-sm font-medium hover:bg-accent disabled:opacity-40 disabled:cursor-not-allowed transition-colors"
        >
          <ChevronLeft className="h-4 w-4" /> Previous
        </button>
        <button
          type="button"
          disabled={index === cards.length - 1}
          onClick={() => onIndexChange(index + 1)}
          className="inline-flex items-center gap-1.5 px-4 py-2 rounded-lg border text-sm font-medium hover:bg-accent disabled:opacity-40 disabled:cursor-not-allowed transition-colors"
        >
          Next <ChevronRight className="h-4 w-4" />
        </button>
      </div>

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
}

// ─── Main Page ────────────────────────────────────────────────────────────────

export default function Flashcards() {
  const { cards, removeCard, customOrder, setCustomOrder } = useFlashcards()
  const { syllabi } = useWikiSyllabus()
  const { records: masteryRecords } = useConceptMastery()
  const popupOpen = useConceptPopup(s => s.open)
  const popupCurrentName = useConceptPopup(s => s.open ? (s.list[s.index]?.name ?? null) : null)
  const [searchParams, setSearchParams] = useSearchParams()
  const highlightName = searchParams.get('highlight')

  const [flashingCard, setFlashingCard] = useState<string | null>(null)
  const flashTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null)
  const orderedCardsRef = useRef<FlashCard[]>([])
  const prevPopupNameRef = useRef<string | null>(null)

  const [activeIndex, setActiveIndex] = useState(0)
  const [galleryExpanded, setGalleryExpanded] = useState(false)
  const [groupBy, setGroupBy] = useState<GroupBy>('exam')

  const sensors = useSensors(
    useSensor(MouseSensor, { activationConstraint: { distance: 5 } }),
    useSensor(TouchSensor, { activationConstraint: { delay: 250, tolerance: 5 } }),
  )

  // Keep activeIndex in bounds when cards are removed
  useEffect(() => {
    if (cards.length > 0 && activeIndex >= cards.length) {
      setActiveIndex(cards.length - 1)
    }
  }, [cards.length, activeIndex])

  // Navigate to and flash a card when arriving via the ?highlight= URL param
  useEffect(() => {
    if (!highlightName) return
    const latest = orderedCardsRef.current
    const idx = latest.findIndex(c => c.name.toLowerCase() === highlightName.toLowerCase())
    if (idx >= 0) setActiveIndex(idx)
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
  }, [highlightName])

  // Reset tracked popup name when popup closes
  useEffect(() => {
    if (!popupOpen) prevPopupNameRef.current = null
  }, [popupOpen])

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
  }, [popupCurrentName])

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
    // 'exam': sort by exam label (Other last), then name within group
    return [...cards].sort((a, b) => {
      const ea = conceptToExam.get(a.name.toLowerCase()) ?? 'Other'
      const eb = conceptToExam.get(b.name.toLowerCase()) ?? 'Other'
      if (ea === 'Other' && eb !== 'Other') return 1
      if (ea !== 'Other' && eb === 'Other') return -1
      if (ea !== eb) return ea.localeCompare(eb)
      return a.name.localeCompare(b.name)
    })
  }, [cards, customOrder, groupBy, conceptToExam])

  orderedCardsRef.current = orderedCards

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
    if (activeIndex === oldIdx) setActiveIndex(newIdx)
  }

  // Empty state
  if (cards.length === 0) {
    return (
      <>
        <div className="container max-w-5xl mx-auto px-4 py-8">
          <h1 className="text-2xl font-bold mb-6">Flashcards</h1>
          <div className="rounded-xl border bg-card text-card-foreground p-12 text-center space-y-3">
            <BookOpen className="h-10 w-10 mx-auto text-muted-foreground/50" />
            <p className="text-sm text-muted-foreground">
              Open a concept in the Study Guide, click the{' '}
              <span className="font-medium">▷ Play</span> button, and choose{' '}
              <span className="font-medium">Add to Flashcards</span>.
            </p>
            <Link to="/wiki" className="inline-flex items-center gap-1.5 text-sm text-primary hover:underline">
              <BookOpen className="h-4 w-4" /> Go to Study Guides
            </Link>
          </div>
        </div>
        <ConceptPopup />
      </>
    )
  }

  return (
    <>
      {/* Expanded gallery overlay */}
      {galleryExpanded && (
        <GalleryPanel
          cards={cards}
          orderedCards={orderedCards}
          groupBy={groupBy}
          onGroupByChange={setGroupBy}
          examGroups={examGroups}
          flashingCard={flashingCard}
          activeIndex={activeIndex}
          onSelect={idx => { setActiveIndex(idx) }}
          onRemove={removeCard}
          onDragEnd={handleDragEnd}
          sensors={sensors}
          onClose={() => setGalleryExpanded(false)}
          conceptMasteryMap={conceptMasteryMap}
        />
      )}

      <div
        className="container max-w-xl mx-auto px-0 sm:px-4"
        style={popupOpen ? { paddingBottom: 'calc(var(--concept-split-height, 50vh) + 1.5rem)' } : undefined}
      >
        {/* Sticky header: title + gallery strip */}
        <div className="sticky top-14 lg:top-0 z-10 bg-background border-b px-4 pt-3">
          <div className="flex items-center justify-between mb-1">
            <h1 className="text-lg font-bold">Flashcards</h1>
            <span className="text-xs text-muted-foreground">
              {cards.length} card{cards.length === 1 ? '' : 's'}
            </span>
          </div>
          <GalleryStrip
            cards={orderedCards}
            activeIndex={activeIndex}
            onSelect={setActiveIndex}
            onExpand={() => setGalleryExpanded(true)}
            conceptMasteryMap={conceptMasteryMap}
          />
        </div>

        {/* Study area */}
        <FlashcardStudyArea
          cards={orderedCards}
          index={activeIndex}
          onIndexChange={setActiveIndex}
          isFlashing={flashingCard?.toLowerCase() === orderedCards[activeIndex]?.name.toLowerCase()}
        />
      </div>

      <ConceptPopup />
    </>
  )
}
