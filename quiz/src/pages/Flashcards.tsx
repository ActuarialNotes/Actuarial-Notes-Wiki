import { forwardRef, useCallback, useEffect, useImperativeHandle, useMemo, useRef, useState, type ReactNode } from 'react'
import { Link, useNavigate, useSearchParams } from 'react-router-dom'
import {
  BookOpen,
  Check,
  CheckCircle2,
  ChevronDown,
  ChevronLeft,
  ChevronRight,
  ChevronUp,
  Circle,
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
  Shuffle,
  Sigma,
  Sparkles,
  Trash2,
  TrendingUp,
  Unlock,
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
import { useAuth } from '@/hooks/useAuth'
import { useWikiSyllabus } from '@/hooks/useWikiSyllabus'
import { useConceptMastery } from '@/hooks/useConceptMastery'
import { useConceptPopup } from '@/hooks/useConceptPopup'
import { useStudyPlan } from '@/hooks/useStudyPlan'
import { useExamProgress } from '@/contexts/ExamProgressContext'
import { fetchWikiFile } from '@/lib/github'
import { entryRefToRepoPath, wikiRoute } from '@/lib/wikiRoutes'
import type { WikiEntryRef } from '@/lib/wikiRoutes'
import { decayIfStale, type MasteryState } from '@/lib/mastery'
import {
  needsReviewOrder,
  nextIncompleteIndex,
  shuffled,
  summarizeSession,
  type StudyRating,
} from '@/lib/flashcardStudy'
import { wikiExamIdToProgressKey } from '@/lib/wikiParser'
import { matchesSelectedVariant } from '@/data/examSittings'
import { Button } from '@/components/ui/button'
import { WikiArticle, stripFrontmatter, extractMathBlockquotes, extractImages } from '@/components/wiki/WikiArticle'
import { ConceptPopup } from '@/components/wiki/ConceptPopup'
import { ConceptQuestionsModal } from '@/components/wiki/ConceptQuestionsModal'
import { LearningProgressModal } from '@/components/wiki/LearningProgressModal'
import { trackFlashcardReviewed } from '@/lib/analytics'
import { usePageKeyboard } from '@/hooks/useKeyboard'
import { KeyboardShortcutsHelp } from '@/components/KeyboardShortcutsHelp'

type GroupBy = 'exam' | 'date' | 'alpha' | 'custom' | 'mastery' | 'shuffle'
type GalleryTab = 'deck' | 'collected' | 'packs'
type ReverseCardSection = 'definition' | 'math' | 'images'

const GROUP_LABELS: { key: GroupBy; label: string }[] = [
  { key: 'exam',    label: 'Exam' },
  { key: 'date',    label: 'Date' },
  { key: 'alpha',   label: 'A–Z' },
  { key: 'mastery', label: 'Needs review' },
  { key: 'shuffle', label: 'Shuffle' },
  { key: 'custom',  label: 'Custom' },
]

const MASTERY_CONFIG: Record<MasteryState, { label: string; className: string; dotClass: string }> = {
  new:       { label: 'New',       className: 'bg-muted text-muted-foreground',                     dotClass: 'bg-muted-foreground/40' },
  level1:    { label: '1',         className: 'bg-amber-500/20 text-amber-600 dark:text-amber-400', dotClass: 'bg-amber-500' },
  level2:    { label: '2',         className: 'bg-blue-500/20 text-blue-600 dark:text-blue-400',    dotClass: 'bg-blue-500' },
  level3:    { label: '3',         className: 'bg-green-500/20 text-green-600 dark:text-green-400', dotClass: 'bg-green-500' },
  forgotten: { label: 'Forgotten', className: 'bg-rose-500/20 text-rose-600 dark:text-rose-400',   dotClass: 'bg-rose-500' },
}

// Color palette for exam packs — one entry per exam in rotation. Whole-exam
// ("hero") packs get the gradient treatment; learning-objective packs get the
// quieter lo* variant so each exam reads as one color family.
const PACK_COLOR_PALETTE = [
  // Blue
  {
    card: 'bg-gradient-to-br from-blue-500/25 via-blue-500/10 to-transparent border border-blue-500/30 hover:border-blue-500/50',
    cardText: 'text-blue-700 dark:text-blue-300',
    cardSub: 'text-blue-600/70 dark:text-blue-400/60',
    cardIcon: 'text-blue-500',
    barTrack: 'bg-blue-500/15',
    loCard: 'bg-blue-500/5 border border-blue-500/15 hover:border-blue-500/35 hover:bg-blue-500/10',
    loCardText: 'text-blue-700/80 dark:text-blue-400/80',
    loCardSub: 'text-blue-600/60 dark:text-blue-400/50',
    loCardIcon: 'text-blue-400',
    loBarTrack: 'bg-blue-500/10',
  },
  // Emerald
  {
    card: 'bg-gradient-to-br from-emerald-500/25 via-emerald-500/10 to-transparent border border-emerald-500/30 hover:border-emerald-500/50',
    cardText: 'text-emerald-700 dark:text-emerald-300',
    cardSub: 'text-emerald-600/70 dark:text-emerald-400/60',
    cardIcon: 'text-emerald-500',
    barTrack: 'bg-emerald-500/15',
    loCard: 'bg-emerald-500/5 border border-emerald-500/15 hover:border-emerald-500/35 hover:bg-emerald-500/10',
    loCardText: 'text-emerald-700/80 dark:text-emerald-400/80',
    loCardSub: 'text-emerald-600/60 dark:text-emerald-400/50',
    loCardIcon: 'text-emerald-400',
    loBarTrack: 'bg-emerald-500/10',
  },
  // Violet
  {
    card: 'bg-gradient-to-br from-violet-500/25 via-violet-500/10 to-transparent border border-violet-500/30 hover:border-violet-500/50',
    cardText: 'text-violet-700 dark:text-violet-300',
    cardSub: 'text-violet-600/70 dark:text-violet-400/60',
    cardIcon: 'text-violet-500',
    barTrack: 'bg-violet-500/15',
    loCard: 'bg-violet-500/5 border border-violet-500/15 hover:border-violet-500/35 hover:bg-violet-500/10',
    loCardText: 'text-violet-700/80 dark:text-violet-400/80',
    loCardSub: 'text-violet-600/60 dark:text-violet-400/50',
    loCardIcon: 'text-violet-400',
    loBarTrack: 'bg-violet-500/10',
  },
  // Orange
  {
    card: 'bg-gradient-to-br from-orange-500/25 via-orange-500/10 to-transparent border border-orange-500/30 hover:border-orange-500/50',
    cardText: 'text-orange-700 dark:text-orange-300',
    cardSub: 'text-orange-600/70 dark:text-orange-400/60',
    cardIcon: 'text-orange-500',
    barTrack: 'bg-orange-500/15',
    loCard: 'bg-orange-500/5 border border-orange-500/15 hover:border-orange-500/35 hover:bg-orange-500/10',
    loCardText: 'text-orange-700/80 dark:text-orange-400/80',
    loCardSub: 'text-orange-600/60 dark:text-orange-400/50',
    loCardIcon: 'text-orange-400',
    loBarTrack: 'bg-orange-500/10',
  },
  // Rose
  {
    card: 'bg-gradient-to-br from-rose-500/25 via-rose-500/10 to-transparent border border-rose-500/30 hover:border-rose-500/50',
    cardText: 'text-rose-700 dark:text-rose-300',
    cardSub: 'text-rose-600/70 dark:text-rose-400/60',
    cardIcon: 'text-rose-500',
    barTrack: 'bg-rose-500/15',
    loCard: 'bg-rose-500/5 border border-rose-500/15 hover:border-rose-500/35 hover:bg-rose-500/10',
    loCardText: 'text-rose-700/80 dark:text-rose-400/80',
    loCardSub: 'text-rose-600/60 dark:text-rose-400/50',
    loCardIcon: 'text-rose-400',
    loBarTrack: 'bg-rose-500/10',
  },
  // Cyan
  {
    card: 'bg-gradient-to-br from-cyan-500/25 via-cyan-500/10 to-transparent border border-cyan-500/30 hover:border-cyan-500/50',
    cardText: 'text-cyan-700 dark:text-cyan-300',
    cardSub: 'text-cyan-600/70 dark:text-cyan-400/60',
    cardIcon: 'text-cyan-500',
    barTrack: 'bg-cyan-500/15',
    loCard: 'bg-cyan-500/5 border border-cyan-500/15 hover:border-cyan-500/35 hover:bg-cyan-500/10',
    loCardText: 'text-cyan-700/80 dark:text-cyan-400/80',
    loCardSub: 'text-cyan-600/60 dark:text-cyan-400/50',
    loCardIcon: 'text-cyan-400',
    loBarTrack: 'bg-cyan-500/10',
  },
] as const

const STUDY_PLAN_COLOR = {
  card: 'bg-gradient-to-br from-amber-500/25 via-amber-500/10 to-transparent border border-amber-500/30 hover:border-amber-500/50',
  cardText: 'text-amber-700 dark:text-amber-300',
  cardSub: 'text-amber-600/70 dark:text-amber-400/60',
  cardIcon: 'text-amber-500',
  barTrack: 'bg-amber-500/15',
} as const

const SAVED_PACK_COLOR = {
  card: 'bg-gradient-to-br from-purple-500/25 via-purple-500/10 to-transparent border border-purple-500/30 hover:border-purple-500/50',
  cardText: 'text-purple-700 dark:text-purple-300',
  cardSub: 'text-purple-600/70 dark:text-purple-400/60',
  cardIcon: 'text-purple-500',
  barTrack: 'bg-purple-500/15',
} as const

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
      if (trimmed === '' || /^[*+-] /.test(trimmed) || /^\d+\. /.test(trimmed) || trimmed.startsWith('>') || trimmed.startsWith('#')) break
      paragraphLines.push(trimmed)
    }
  }
  return paragraphLines.join('\n')
}

// ─── Flashcard Packs & Gallery Tabs ───────────────────────────────────────────

type PackKind = 'study_plan' | 'exam' | 'learning_objective' | 'saved'

interface PackColors {
  card: string
  cardText: string
  cardSub: string
  cardIcon: string
  barTrack: string
}

function packColorsFor(kind: PackKind, colorIndex: number | undefined, isSub: boolean): PackColors {
  if (kind === 'study_plan') return { ...STUDY_PLAN_COLOR }
  if (kind === 'saved') return { ...SAVED_PACK_COLOR }
  const palette = PACK_COLOR_PALETTE[colorIndex ?? 0]
  if (isSub) {
    return {
      card: palette.loCard,
      cardText: palette.loCardText,
      cardSub: palette.loCardSub,
      cardIcon: palette.loCardIcon,
      barTrack: palette.loBarTrack,
    }
  }
  return {
    card: palette.card,
    cardText: palette.cardText,
    cardSub: palette.cardSub,
    cardIcon: palette.cardIcon,
    barTrack: palette.barTrack,
  }
}

// Popup listing every concept in a pack. Opened from the stacked-flashcard
// icon on a pack card; lets you select individual concepts, add them to the
// deck, or collect them one at a time — without cluttering the card itself.
function PackConceptsModal({
  label,
  concepts,
  onClose,
  onCardsAdded,
}: {
  label: string
  concepts: string[]
  onClose: () => void
  onCardsAdded?: () => void
}) {
  const { addCard, hasCard } = useFlashcards()
  const collectedCards = useCollectedCards(s => s.cards)
  const openCollect = useCollect(s => s.open)
  const collectedSet = useMemo(
    () => new Set(collectedCards.map(c => c.name.toLowerCase())),
    [collectedCards],
  )
  const isCollected = (name: string) => collectedSet.has(name.toLowerCase())

  const [selected, setSelected] = useState<Set<string>>(new Set())

  useEffect(() => {
    function onKey(e: KeyboardEvent) { if (e.key === 'Escape') onClose() }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [onClose])

  const notAdded = concepts.filter(n => !hasCard(n))
  const allAdded = concepts.length > 0 && notAdded.length === 0

  function toggleSelect(name: string) {
    setSelected(prev => {
      const next = new Set(prev)
      if (next.has(name)) next.delete(name); else next.add(name)
      return next
    })
  }

  function handleAdd() {
    const toAdd = selected.size > 0
      ? concepts.filter(n => selected.has(n) && !hasCard(n))
      : notAdded
    for (const name of toAdd) addCard({ kind: 'concept', name })
    setSelected(new Set())
    if (toAdd.length > 0) onCardsAdded?.()
  }

  return (
    <div
      className="fixed inset-0 z-50 flex items-start justify-center bg-background/80 backdrop-blur-sm p-4 overflow-y-auto"
      role="dialog"
      aria-modal="true"
      aria-label={`${label} concepts`}
      onClick={e => { if (e.target === e.currentTarget) onClose() }}
    >
      <div className="w-full max-w-lg bg-card rounded-xl shadow-2xl flex flex-col my-8 max-h-[85vh]">
        <div className="flex items-center gap-3 px-4 h-12 shrink-0 border-b">
          <Layers className="h-4 w-4 text-muted-foreground shrink-0" />
          <span className="flex-1 truncate font-semibold text-sm">{label}</span>
          <span className="text-xs text-muted-foreground shrink-0">{concepts.length} concepts</span>
          <button
            type="button"
            onClick={onClose}
            className="text-muted-foreground hover:text-foreground p-1 transition-colors"
            title="Close"
            aria-label="Close"
          >
            <X className="h-4 w-4" />
          </button>
        </div>

        {concepts.length > 0 && (
          <div className="px-4 pt-3 shrink-0">
            {allAdded ? (
              <span className="flex items-center justify-center gap-1.5 px-3 py-2 rounded-lg bg-green-500/15 text-green-600 dark:text-green-400 text-xs font-semibold">
                <Check className="h-3.5 w-3.5" /> All in deck
              </span>
            ) : (
              <button
                type="button"
                onClick={handleAdd}
                className="w-full flex items-center justify-center gap-1.5 px-3 py-2 rounded-lg bg-primary text-primary-foreground text-xs font-semibold hover:bg-primary/90 active:scale-[0.98] transition-all"
              >
                <Plus className="h-3.5 w-3.5" />
                {selected.size > 0 ? `Add ${selected.size} to deck` : `Add all ${notAdded.length} to deck`}
              </button>
            )}
          </div>
        )}

        <ul className="overflow-y-auto flex-1 px-4 py-3 space-y-0.5">
          {concepts.map(name => {
            const added = hasCard(name)
            const checked = selected.has(name)
            return (
              <li key={name} className="flex items-center gap-2.5 py-1.5">
                <button
                  type="button"
                  onClick={() => !added && toggleSelect(name)}
                  disabled={added}
                  aria-label={added ? `${name} already in deck` : checked ? `Deselect ${name}` : `Select ${name}`}
                  className={`w-5 h-5 rounded border flex items-center justify-center shrink-0 transition-colors ${
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
                <span className={`text-sm flex-1 min-w-0 truncate text-foreground ${added ? 'opacity-60' : ''}`}>{name}</span>
                {added && (
                  <span className="text-[10px] text-green-600 dark:text-green-400 shrink-0">In deck</span>
                )}
                <button
                  type="button"
                  onClick={() => openCollect({ kind: 'concept', name })}
                  title={isCollected(name) ? 'Collected' : 'Collect this flashcard'}
                  aria-label={isCollected(name) ? `${name} collected` : `Collect ${name}`}
                  className={`shrink-0 h-7 w-7 rounded-md flex items-center justify-center transition-colors ${
                    isCollected(name)
                      ? 'text-emerald-600 dark:text-emerald-400'
                      : 'text-muted-foreground hover:text-foreground hover:bg-accent'
                  }`}
                >
                  {isCollected(name) ? <Unlock className="h-4 w-4" /> : <Lock className="h-4 w-4" />}
                </button>
              </li>
            )
          })}
        </ul>
      </div>
    </div>
  )
}

// A single pack card. The header shows collection progress plus a segmented
// mastery bar; tapping it reveals a mastery breakdown and large action buttons
// (add everything to the deck, collect the next uncollected card, browse the
// concept list). Expansion is controlled by the parent so only one pack is
// open at a time. The stacked-flashcard icon in the top right opens a popup
// with the individual concept list. Learning-objective packs render in the
// `isSub` (smaller) variant.
function PackCard({
  label,
  sublabel,
  kind,
  concepts,
  colorIndex,
  isSub = false,
  loading = false,
  emptyHint,
  expanded,
  onToggleExpand,
  masteryOf,
  className = '',
  onDelete,
  onCardsAdded,
}: {
  label: string
  sublabel?: string
  kind: PackKind
  concepts: string[]
  colorIndex?: number
  isSub?: boolean
  loading?: boolean
  emptyHint?: ReactNode
  expanded: boolean
  onToggleExpand: () => void
  masteryOf?: (name: string) => MasteryState
  className?: string
  onDelete?: () => void
  onCardsAdded?: () => void
}) {
  const { addCard, hasCard } = useFlashcards()
  const collectedCards = useCollectedCards(s => s.cards)
  const openCollect = useCollect(s => s.open)
  const collectedSet = useMemo(
    () => new Set(collectedCards.map(c => c.name.toLowerCase())),
    [collectedCards],
  )
  const isCollected = (name: string) => collectedSet.has(name.toLowerCase())

  const [showConcepts, setShowConcepts] = useState(false)

  const total = concepts.length
  const inDeck = concepts.filter(n => hasCard(n)).length
  const collected = concepts.filter(n => isCollected(n)).length
  const notAdded = concepts.filter(n => !hasCard(n))
  const allAdded = total > 0 && notAdded.length === 0
  const fullyCollected = total > 0 && collected === total

  // Mastery breakdown — powers the segmented progress bar and the expanded
  // legend. Anything past New implies collected (the collect gate), so the
  // "collected but still new" remainder gets its own faint segment.
  const mastery = useMemo(() => {
    const counts = { level1: 0, level2: 0, level3: 0, forgotten: 0 }
    if (masteryOf) {
      for (const n of concepts) {
        const s = masteryOf(n)
        if (s !== 'new') counts[s]++
      }
    }
    return counts
  }, [concepts, masteryOf])
  const leveled = mastery.level1 + mastery.level2 + mastery.level3 + mastery.forgotten
  const collectedNew = Math.max(0, collected - leveled)
  const newCount = total - leveled

  const colors = packColorsFor(kind, colorIndex, isSub)
  const pct = (n: number) => `${(n / Math.max(total, 1)) * 100}%`

  function handleAdd() {
    for (const name of notAdded) addCard({ kind: 'concept', name })
    if (notAdded.length > 0) onCardsAdded?.()
  }

  function collectNext() {
    const next = concepts.find(n => !isCollected(n))
    if (next) openCollect({ kind: 'concept', name: next })
  }

  return (
    <div
      className={`relative overflow-hidden rounded-xl transition-all ${colors.card} ${colors.cardText} ${
        fullyCollected ? 'ring-1 ring-amber-400/50 collect-pack-complete' : ''
      } ${className}`}
    >
      {/* Watermark on hero packs for depth */}
      {!isSub && (
        <Layers aria-hidden className={`pointer-events-none absolute -right-4 -bottom-6 h-24 w-24 opacity-[0.07] ${colors.cardIcon}`} />
      )}

      {/* Header — click to reveal actions */}
      <div
        role="button"
        tabIndex={0}
        onClick={onToggleExpand}
        onKeyDown={e => { if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); onToggleExpand() } }}
        className={`cursor-pointer ${isSub ? 'px-3 pt-2.5 pb-3' : 'px-3.5 pt-3 pb-3.5'}`}
        aria-expanded={expanded}
      >
        <div className="flex items-start gap-2.5">
          <div className="flex-1 min-w-0">
            <div className="flex items-start gap-1.5">
              <span className={`font-bold leading-tight ${isSub ? 'text-sm' : 'text-base sm:text-lg'}`}>{label}</span>
              {fullyCollected && (
                <span title="Fully collected" className="shrink-0 text-amber-500 dark:text-amber-300 mt-0.5">
                  <Sparkles className="h-3.5 w-3.5" />
                </span>
              )}
            </div>
            {sublabel && <span className={`block text-[11px] truncate ${colors.cardSub}`}>{sublabel}</span>}
          </div>
          <div className="flex items-center gap-0.5 shrink-0">
            {onDelete && (
              <button
                type="button"
                onClick={e => { e.stopPropagation(); onDelete() }}
                aria-label={`Delete ${label} pack`}
                className="h-7 w-7 rounded flex items-center justify-center text-muted-foreground hover:text-destructive transition-colors"
              >
                <Trash2 className="h-3.5 w-3.5" />
              </button>
            )}
            {total > 0 && (
              <button
                type="button"
                onClick={e => { e.stopPropagation(); setShowConcepts(true) }}
                aria-label={`View ${label} concepts`}
                title="View concepts"
                className={`rounded-lg flex items-center justify-center transition-colors hover:bg-black/10 dark:hover:bg-white/10 ${colors.cardIcon} ${isSub ? 'h-8 w-8' : 'h-9 w-9'}`}
              >
                <Layers className={isSub ? 'h-5 w-5' : 'h-6 w-6'} />
              </button>
            )}
          </div>
        </div>

        {/* Stats + mastery bar */}
        <div className={`flex flex-wrap items-baseline justify-between gap-x-2 gap-y-0.5 ${isSub ? 'mt-1.5' : 'mt-2'}`}>
          <span className="flex items-baseline gap-1 whitespace-nowrap">
            <span className={`font-bold tabular-nums ${isSub ? 'text-base' : 'text-xl'}`}>
              {loading ? '…' : collected}
            </span>
            <span className={`text-[11px] font-medium ${colors.cardSub}`}>/ {total} collected</span>
          </span>
          <span className={`flex items-center gap-1 text-[11px] font-medium tabular-nums whitespace-nowrap ${colors.cardSub}`}>
            {loading ? '…' : inDeck} in deck
            <ChevronDown className={`h-3.5 w-3.5 transition-transform ${expanded ? 'rotate-180' : ''}`} />
          </span>
        </div>
        <div className={`mt-1.5 flex h-1.5 rounded-full overflow-hidden ${colors.barTrack}`} aria-hidden>
          {!loading && total > 0 && (
            <>
              {mastery.level3 > 0 && <div className="h-full bg-green-500" style={{ width: pct(mastery.level3) }} />}
              {mastery.level2 > 0 && <div className="h-full bg-blue-500" style={{ width: pct(mastery.level2) }} />}
              {mastery.level1 > 0 && <div className="h-full bg-amber-500" style={{ width: pct(mastery.level1) }} />}
              {mastery.forgotten > 0 && <div className="h-full bg-rose-500" style={{ width: pct(mastery.forgotten) }} />}
              {collectedNew > 0 && <div className="h-full bg-current opacity-30" style={{ width: pct(collectedNew) }} />}
            </>
          )}
        </div>
      </div>

      {/* Actions */}
      {expanded && (
        <div className={`pack-expand-in space-y-2.5 ${isSub ? 'px-3 pb-3' : 'px-3.5 pb-3.5'}`}>
          {emptyHint}
          {loading && (
            <div className="flex items-center gap-2 text-xs text-muted-foreground py-1">
              <Loader2 className="h-3.5 w-3.5 animate-spin" /> Loading…
            </div>
          )}
          {!loading && total > 0 && (
            <>
              {/* Mastery legend */}
              <div className="flex flex-wrap gap-x-3 gap-y-1 text-[11px] font-medium">
                {mastery.level3 > 0 && (
                  <span className="inline-flex items-center gap-1.5">
                    <span className="w-1.5 h-1.5 rounded-full bg-green-500 shrink-0" />{mastery.level3} mastered
                  </span>
                )}
                {mastery.level1 + mastery.level2 > 0 && (
                  <span className="inline-flex items-center gap-1.5">
                    <span className="w-1.5 h-1.5 rounded-full bg-blue-500 shrink-0" />{mastery.level1 + mastery.level2} learning
                  </span>
                )}
                {mastery.forgotten > 0 && (
                  <span className="inline-flex items-center gap-1.5 text-rose-600 dark:text-rose-400">
                    <span className="w-1.5 h-1.5 rounded-full bg-rose-500 shrink-0" />{mastery.forgotten} slipping — review!
                  </span>
                )}
                {newCount > 0 && (
                  <span className={`inline-flex items-center gap-1.5 ${colors.cardSub}`}>
                    <span className="w-1.5 h-1.5 rounded-full bg-current opacity-40 shrink-0" />{newCount} to learn
                  </span>
                )}
              </div>
              {collected === 0 && (
                <p className={`text-[11px] leading-snug ${colors.cardSub}`}>
                  Pass a quick comprehension check to collect your first card from this pack.
                </p>
              )}
              <div className="flex flex-col gap-2">
                {allAdded ? (
                  <span className="flex items-center justify-center gap-2 px-4 py-3 rounded-lg bg-green-500/15 text-green-600 dark:text-green-400 text-sm font-semibold">
                    <Check className="h-4 w-4" /> All in deck
                  </span>
                ) : (
                  <button
                    type="button"
                    onClick={e => { e.stopPropagation(); handleAdd() }}
                    className="flex items-center justify-center gap-2 px-4 py-3 rounded-lg bg-primary text-primary-foreground text-sm font-semibold hover:bg-primary/90 active:scale-[0.98] transition-all"
                  >
                    <Plus className="h-4 w-4" />
                    Add all {notAdded.length} to deck
                  </button>
                )}
                {!fullyCollected && (
                  <button
                    type="button"
                    onClick={e => { e.stopPropagation(); collectNext() }}
                    className="flex items-center justify-center gap-2 px-4 py-3 rounded-lg bg-background/60 text-sm font-semibold text-foreground hover:bg-accent transition-colors"
                  >
                    <Lock className="h-4 w-4" /> Collect next · {total - collected} locked
                  </button>
                )}
                <button
                  type="button"
                  onClick={e => { e.stopPropagation(); setShowConcepts(true) }}
                  className="flex items-center justify-center gap-2 px-4 py-2 rounded-lg text-xs font-semibold text-foreground/70 hover:text-foreground hover:bg-background/60 transition-colors"
                >
                  <BookOpen className="h-3.5 w-3.5" /> Browse all {total} concepts
                </button>
              </div>
            </>
          )}
        </div>
      )}

      {showConcepts && (
        <PackConceptsModal
          label={label}
          concepts={concepts}
          onClose={() => setShowConcepts(false)}
          onCardsAdded={onCardsAdded}
        />
      )}
    </div>
  )
}

interface PackDescriptor {
  key: string
  kind: PackKind
  label: string
  concepts: string[]
  colorIndex?: number
  isSub?: boolean
}

// Packs tab — every available pack. Each exam contributes a full-width
// "hero" pack followed by a two-column grid of its learning-objective packs.
// Today's study plan and any user-saved packs bookend the grid. Only one
// pack's action panel is open at a time (accordion).
function PacksContent({ onCardsAdded }: { onCardsAdded?: () => void } = {}) {
  const { syllabi, loading: syllabiLoading } = useWikiSyllabus()
  const { records: masteryRecords, loading: masteryLoading } = useConceptMastery()
  const { progress: examProgress, targetDates, examVariants } = useExamProgress()
  const { savedPacks, deleteSavedPack } = useFlashcards()

  const [expandedKey, setExpandedKey] = useState<string | null>(null)
  const toggleExpanded = (key: string) => setExpandedKey(k => (k === key ? null : key))

  // concept name → mastery state (same best-record + decay logic as the main
  // deck view) so each pack can show its mastery bar and breakdown.
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

  const primarySyllabus = inProgressSyllabi[0] ?? null
  const primaryProgressKey = primarySyllabus ? wikiExamIdToProgressKey(primarySyllabus.examId) : null
  const primaryTargetDate = primaryProgressKey ? (targetDates[primaryProgressKey] ?? null) : null

  const { plan: studyPlan, loading: planLoading } = useStudyPlan(
    primarySyllabus,
    masteryRecords,
    primaryTargetDate,
    masteryLoading,
  )

  const studyPlanConcepts = useMemo(() => {
    if (!studyPlan) return []
    return studyPlan.status === 'review_mode' ? studyPlan.reviewConcepts : studyPlan.todaysConcepts
  }, [studyPlan])

  // One group per exam (fallbacks to P and FM when nothing is in progress),
  // each with the whole-exam concept list plus its learning-objective packs.
  const examGroups = useMemo(() => {
    const source: typeof inProgressSyllabi = inProgressSyllabi.length === 0
      ? (['P-1', 'FM-2']
          .map(id => syllabi.find(s => s.examId === id))
          .filter((s): s is typeof syllabi[number] => !!s)
          .filter(s => examProgress[wikiExamIdToProgressKey(s.examId)] !== 'completed'))
      : inProgressSyllabi
    return source.map((syllabus, i) => ({
      examId: syllabus.examId,
      examLabel: syllabus.examLabel,
      colorIndex: i % PACK_COLOR_PALETTE.length,
      allConcepts: syllabus.topics.flatMap(t => t.concepts.map(c => c.name)),
      learningObjectives: syllabus.topics
        .filter(t => t.concepts.length > 0)
        .map(t => ({ name: t.name, concepts: t.concepts.map(c => c.name) })),
    }))
  }, [inProgressSyllabi, syllabi, examProgress])

  // Flatten exam groups into a single list of pack cards — the whole-exam
  // pack followed by one card per learning objective, no group headers.
  const flatPacks = useMemo(() => {
    const items: PackDescriptor[] = []
    for (const group of examGroups) {
      items.push({
        key: `${group.examId}-all`,
        kind: 'exam',
        label: `${group.examLabel} — All concepts`,
        concepts: group.allConcepts,
        colorIndex: group.colorIndex,
      })
      for (const lo of group.learningObjectives) {
        items.push({
          key: `${group.examId}-${lo.name}`,
          kind: 'learning_objective',
          label: lo.name,
          concepts: lo.concepts,
          colorIndex: group.colorIndex,
          isSub: true,
        })
      }
    }
    return items
  }, [examGroups])

  const isLoading = planLoading || masteryLoading || syllabiLoading
  const hasContent = !!primarySyllabus || examGroups.length > 0 || savedPacks.length > 0

  return (
    <div className="space-y-6">
      {/* Today's study plan */}
      {primarySyllabus && (
        <PackCard
          kind="study_plan"
          label="Today's Study Plan"
          sublabel={primarySyllabus.examLabel}
          concepts={studyPlanConcepts}
          loading={isLoading}
          expanded={expandedKey === 'study-plan'}
          onToggleExpand={() => toggleExpanded('study-plan')}
          masteryOf={masteryOf}
          onCardsAdded={onCardsAdded}
          emptyHint={
            !isLoading && !studyPlan?.config?.targetReadyDate ? (
              <p className="text-xs text-muted-foreground py-1">
                Set up your study plan on the{' '}
                <Link to="/dashboard" className="text-primary hover:underline">Dashboard</Link>{' '}
                to see today's concepts.
              </p>
            ) : undefined
          }
        />
      )}

      {/* Exam + learning-objective packs — full-width hero card per exam,
          learning objectives in a two-column grid beneath it */}
      {flatPacks.length > 0 && (
        <div className="grid grid-cols-2 gap-3">
          {flatPacks.map(p => (
            <PackCard
              key={p.key}
              kind={p.kind}
              label={p.label}
              concepts={p.concepts}
              colorIndex={p.colorIndex}
              isSub={p.isSub}
              className={p.isSub ? undefined : 'col-span-2'}
              expanded={expandedKey === p.key}
              onToggleExpand={() => toggleExpanded(p.key)}
              masteryOf={masteryOf}
              onCardsAdded={onCardsAdded}
            />
          ))}
        </div>
      )}

      {/* Saved packs */}
      {savedPacks.length > 0 && (
        <div className="space-y-2">
          <h3 className="text-xs font-semibold text-muted-foreground uppercase tracking-wider px-1">
            Saved Packs
          </h3>
          <div className="grid grid-cols-2 gap-3">
            {savedPacks.map(sp => (
              <PackCard
                key={sp.id}
                kind="saved"
                label={sp.label}
                concepts={sp.concepts}
                expanded={expandedKey === `saved-${sp.id}`}
                onToggleExpand={() => toggleExpanded(`saved-${sp.id}`)}
                masteryOf={masteryOf}
                onDelete={() => deleteSavedPack(sp.id)}
                onCardsAdded={onCardsAdded}
              />
            ))}
          </div>
        </div>
      )}

      {isLoading && !hasContent && (
        <div className="flex items-center gap-2 text-xs text-muted-foreground py-2">
          <Loader2 className="h-3.5 w-3.5 animate-spin" /> Loading packs…
        </div>
      )}
      {!isLoading && !hasContent && (
        <p className="text-sm text-muted-foreground py-6 text-center">
          No packs available yet. Mark an exam as in progress on the{' '}
          <Link to="/dashboard" className="text-primary hover:underline">Dashboard</Link>.
        </p>
      )}
    </div>
  )
}

// Collected tab — every concept the user has unlocked by passing its
// comprehension check. Cards render identically to My Deck (same flip-on-tap
// tile) so the two views feel consistent; the always-visible +/- control adds
// or removes each card from the study deck in place.
function CollectedContent({
  conceptMasteryMap,
  reverseCardModes,
  globalFlip,
  onCardsAdded,
}: {
  conceptMasteryMap: Map<string, MasteryState>
  reverseCardModes: Set<ReverseCardSection>
  globalFlip: boolean
  onCardsAdded?: () => void
}) {
  const collectedCards = useCollectedCards(s => s.cards)
  const { addCard, removeCard, hasCard } = useFlashcards()

  const sorted = useMemo(
    () => [...collectedCards].sort((a, b) => b.collectedAt - a.collectedAt),
    [collectedCards],
  )

  if (sorted.length === 0) {
    return (
      <div className="rounded-xl bg-card text-card-foreground p-10 text-center space-y-2">
        <Unlock className="h-9 w-9 mx-auto text-muted-foreground/50" />
        <p className="text-sm text-muted-foreground">You haven't collected any flashcards yet.</p>
        <p className="text-xs text-muted-foreground">
          Collect a card from the <span className="font-medium">Packs</span> tab or a concept page by
          passing its quick comprehension check.
        </p>
      </div>
    )
  }

  // Wrapped in a (drag-disabled) sortable context so the shared SortableCard
  // tile can be reused verbatim without becoming reorderable here.
  return (
    <DndContext collisionDetection={closestCenter} onDragEnd={() => {}}>
      <SortableContext items={sorted.map(c => c.name)} strategy={rectSortingStrategy}>
        <div className="grid grid-cols-1 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4">
          {sorted.map(c => {
            const card: FlashCard = { kind: 'concept', name: c.name, addedAt: c.collectedAt }
            return (
              <SortableCard
                key={c.name}
                card={card}
                masteryState={conceptMasteryMap.get(c.name.toLowerCase()) ?? 'new'}
                onSelect={() => { if (!hasCard(c.name)) { addCard(card); onCardsAdded?.() } }}
                onRemove={removeCard}
                isFlashing={false}
                isActive={false}
                reverseCardModes={reverseCardModes}
                globalFlip={globalFlip}
                collected
                disableSort
                onCardsAdded={onCardsAdded}
              />
            )
          })}
        </div>
      </SortableContext>
    </DndContext>
  )
}

// Free-form "add any flashcard to your deck" search — surfaced in the My Deck
// tab as a "+" button that expands into a full-width search bar pinned to the
// top of the screen, matching WikiFloatingSearch / QuizFloatingSearch. Matches
// against every concept in the syllabi plus anything collected.
function DeckAddSearch({ onCardsAdded }: { onCardsAdded?: () => void }) {
  const { syllabi } = useWikiSyllabus()
  const collectedCards = useCollectedCards(s => s.cards)
  const { addCard, hasCard } = useFlashcards()
  const [query, setQuery] = useState('')
  const [open, setOpen] = useState(false)
  const containerRef = useRef<HTMLDivElement>(null)
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

  function close() {
    setQuery('')
    setOpen(false)
  }

  useEffect(() => {
    if (!open) return
    inputRef.current?.focus()
    function onOutside(e: MouseEvent) {
      if (containerRef.current && !containerRef.current.contains(e.target as Node)) close()
    }
    function onKey(e: KeyboardEvent) {
      if (e.key === 'Escape') close()
    }
    document.addEventListener('mousedown', onOutside)
    document.addEventListener('keydown', onKey)
    return () => {
      document.removeEventListener('mousedown', onOutside)
      document.removeEventListener('keydown', onKey)
    }
  }, [open])

  if (!open) {
    return (
      <button
        type="button"
        onClick={() => setOpen(true)}
        title="Add a flashcard"
        aria-label="Add a flashcard"
        className="inline-flex items-center justify-center h-9 w-9 rounded-md text-muted-foreground hover:text-foreground hover:bg-accent transition-colors shrink-0"
      >
        <Plus className="h-4 w-4" />
      </button>
    )
  }

  return (
    <>
      <div
        className="fixed inset-0 z-[64] bg-background/60 backdrop-blur-sm"
        onMouseDown={e => { e.preventDefault(); close() }}
      />
      <div
        ref={containerRef}
        className="fixed top-0 left-0 right-0 z-[65] border-b bg-background/95 backdrop-blur-md shadow-lg"
      >
        <div className="max-w-4xl mx-auto px-4 sm:px-6">
          <div className="flex items-center gap-2 h-14">
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
            <button
              type="button"
              onClick={close}
              aria-label="Close search"
              className="text-muted-foreground hover:text-foreground transition-colors shrink-0"
            >
              <X className="h-4 w-4" />
            </button>
          </div>
          {query.trim() && (
            <div className="py-2">
              <ul className="space-y-0.5 max-h-[50vh] overflow-y-auto">
                {results.length === 0 ? (
                  <li className="text-xs text-muted-foreground px-2 py-2">No matches</li>
                ) : results.map(name => {
                  const added = hasCard(name)
                  return (
                    <li key={name}>
                      <button
                        type="button"
                        disabled={added}
                        onClick={() => { addCard({ kind: 'concept', name }); onCardsAdded?.() }}
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
            </div>
          )}
        </div>
      </div>
    </>
  )
}

// The three-way tab switcher at the top of the gallery.
function GalleryTabBar({
  active,
  onChange,
  deckCount,
  collectedCount,
}: {
  active: GalleryTab
  onChange: (tab: GalleryTab) => void
  deckCount: number
  collectedCount: number
}) {
  const tabs: { key: GalleryTab; label: string; icon: typeof Layers; count?: number }[] = [
    { key: 'deck', label: 'My Deck', icon: Layers, count: deckCount },
    { key: 'collected', label: 'Collected', icon: Unlock, count: collectedCount },
    { key: 'packs', label: 'Packs', icon: LayoutGrid },
  ]
  return (
    <div className="flex items-center gap-1 p-1 rounded-lg bg-muted/60">
      {tabs.map(t => {
        const isActive = t.key === active
        const Icon = t.icon
        return (
          <button
            key={t.key}
            type="button"
            onClick={() => onChange(t.key)}
            aria-pressed={isActive}
            className={`flex-1 inline-flex items-center justify-center gap-1.5 px-2 sm:px-3 py-1.5 rounded-md text-xs sm:text-sm font-medium transition-colors ${
              isActive
                ? 'bg-background text-foreground shadow-sm'
                : 'text-muted-foreground hover:text-foreground'
            }`}
          >
            <Icon className="h-4 w-4 shrink-0" />
            <span className="truncate">{t.label}</span>
            {t.count !== undefined && t.count > 0 && (
              <span className={`text-[10px] font-semibold px-1.5 py-0.5 rounded-full tabular-nums ${
                isActive ? 'bg-primary/15 text-primary' : 'bg-muted-foreground/15 text-muted-foreground'
              }`}>
                {t.count}
              </span>
            )}
          </button>
        )
      })}
    </div>
  )
}

// Study ⇄ Gallery toggle. Lives in the bottom controls footer (shared between
// both views), alongside Flip / Back content / focus. `galleryOpen` picks the
// direction: true → "Study" (return to the single-card view), false →
// "Gallery" (open the overlay).
function StudyGalleryToggle({
  galleryOpen,
  onToggle,
  className = '',
}: {
  galleryOpen: boolean
  onToggle: () => void
  className?: string
}) {
  return (
    <button
      type="button"
      onClick={onToggle}
      title={galleryOpen ? 'Back to study' : 'Open gallery'}
      aria-pressed={galleryOpen}
      className={`inline-flex items-center gap-1.5 px-4 py-2 rounded-lg text-xs sm:text-sm font-medium transition-colors ${
        galleryOpen
          ? 'bg-primary text-primary-foreground'
          : 'bg-muted text-muted-foreground hover:text-foreground hover:bg-accent'
      } ${className}`}
    >
      {galleryOpen
        ? <span className="inline-flex gap-0.5"><Eye className="h-4 w-4" /><Eye className="h-4 w-4" /></span>
        : <LayoutGrid className="h-4 w-4" />
      }
      <span>{galleryOpen ? 'Study' : 'Gallery'}</span>
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
        className={`inline-flex items-center gap-1 px-2 h-9 sm:h-10 rounded-md transition-colors ${
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

function FlashcardControlsBar({
  galleryOpen,
  onGalleryToggle,
  reverseCardModes,
  onToggleMode,
  flip,
  onFlipToggle,
  focusMode,
  onFocusToggle,
  onShortcutsHelp,
  onShuffle,
  minimal = false,
}: {
  galleryOpen?: boolean
  onGalleryToggle?: () => void
  reverseCardModes: Set<ReverseCardSection>
  onToggleMode: (mode: ReverseCardSection) => void
  flip: boolean
  onFlipToggle: () => void
  focusMode: boolean
  onFocusToggle: () => void
  onShortcutsHelp: () => void
  onShuffle?: () => void
  minimal?: boolean
}) {
  return (
    <div className="flex items-center justify-center gap-3 sm:gap-5 px-4 py-3 sm:py-4 bg-background shadow-[0_-1px_4px_rgba(0,0,0,0.06)]">
      {!minimal && onGalleryToggle && (
        <StudyGalleryToggle galleryOpen={!!galleryOpen} onToggle={onGalleryToggle} />
      )}

      <div className="flex items-center gap-2 shrink-0">
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

      {!minimal && onShuffle && (
        <button
          type="button"
          onClick={onShuffle}
          title="Shuffle deck (S)"
          aria-label="Shuffle deck"
          className="inline-flex items-center justify-center h-9 w-9 sm:h-10 sm:w-10 rounded-md text-muted-foreground hover:text-foreground hover:bg-accent transition-colors"
        ><Shuffle className="h-4 w-4 sm:h-5 sm:w-5" /></button>
      )}

      {!minimal && (
        <>
          <button
            type="button"
            onClick={onFocusToggle}
            title={focusMode ? 'Exit focus mode' : 'Focus mode'}
            aria-pressed={focusMode}
            className={`inline-flex items-center justify-center h-9 w-9 sm:h-10 sm:w-10 rounded-md transition-colors ${
              focusMode
                ? 'bg-primary text-primary-foreground'
                : 'text-muted-foreground hover:text-foreground hover:bg-accent'
            }`}
          ><Maximize2 className="h-4 w-4 sm:h-5 sm:w-5" /></button>
        </>
      )}

      <button
        type="button"
        onClick={onShortcutsHelp}
        title="Keyboard shortcuts (?)"
        aria-label="Keyboard shortcuts"
        className="hidden sm:inline-flex items-center justify-center h-9 w-9 sm:h-10 sm:w-10 rounded-md text-muted-foreground hover:text-foreground hover:bg-accent transition-colors"
      ><Keyboard className="h-4 w-4 sm:h-5 sm:w-5" /></button>
    </div>
  )
}

// ─── Gallery Strip ────────────────────────────────────────────────────────────

function GalleryStrip({
  cards,
  activeIndex,
  onSelect,
  conceptMasteryMap,
  completedNames,
}: {
  cards: FlashCard[]
  activeIndex: number
  onSelect: (index: number) => void
  conceptMasteryMap: Map<string, MasteryState>
  /** Lowercased names of cards marked complete this session. */
  completedNames: Set<string>
}) {
  const activeChipRef = useRef<HTMLButtonElement>(null)

  useEffect(() => {
    activeChipRef.current?.scrollIntoView({ behavior: 'smooth', block: 'nearest', inline: 'center' })
  }, [activeIndex])

  return (
    <div className="relative flex items-center">
      {/* Scrollable chips */}
      <div
        className="flex items-center gap-1.5 overflow-x-auto py-2.5 pr-4 flex-1"
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
              className={`flex items-center gap-1.5 shrink-0 px-3 py-1.5 rounded-full text-xs font-medium transition-colors ${
                isActive
                  ? 'bg-primary text-primary-foreground'
                  : 'bg-card text-card-foreground hover:bg-accent'
              }`}
            >
              <span className={`w-1.5 h-1.5 rounded-full shrink-0 ${isActive ? 'bg-primary-foreground/70' : dotClass}`} />
              <span className="max-w-[120px] truncate">{card.name}</span>
              {completedNames.has(card.name.toLowerCase()) && (
                <Check className={`h-3 w-3 shrink-0 ${isActive ? 'text-primary-foreground/80' : 'text-green-500'}`} />
              )}
            </button>
          )
        })}
      </div>

      {/* Fade overlay */}
      <div className="absolute right-0 top-0 bottom-0 w-6 bg-gradient-to-l from-background to-transparent pointer-events-none" />
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
  onToggleComplete,
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
  // `collected` (Collected tab keeps its shine); My Deck passes false so the
  // ongoing animation doesn't distract while reading.
  animateCollected?: boolean
  disableSort?: boolean
  onCardsAdded?: () => void
  focusMode?: boolean
  // Deck-context completion tracking. When `onToggleComplete` is provided (My
  // Deck tab) the top-left control becomes a "mark complete" circle instead of
  // the add/remove-from-deck toggle used elsewhere (e.g. the Collected tab).
  isCompleted?: boolean
  onToggleComplete?: (name: string) => void
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
      addCard(card)
      onCardsAdded?.()
    }
  }

  // Quiet, always-available add/remove-from-deck control. Transparent so it
  // doesn't compete with the card content — only the front face shows it.
  const deckToggleButton = (
    <button
      type="button"
      onPointerDown={e => e.stopPropagation()}
      onClick={toggleDeck}
      aria-label={inDeck ? `Remove ${card.name} from deck` : `Add ${card.name} to deck`}
      title={inDeck ? 'Remove from deck' : 'Add to deck'}
      className="inline-flex items-center justify-center h-7 w-7 rounded-full bg-transparent text-muted-foreground hover:text-foreground transition-colors"
    >
      {inDeck ? <Minus className="h-4 w-4" /> : <Plus className="h-4 w-4" />}
    </button>
  )

  // Deck-context "mark complete" control: an empty circle that fills with a
  // satisfying checkmark when tapped. Replaces the deck toggle in My Deck.
  const completeToggleButton = (
    <button
      type="button"
      onPointerDown={e => e.stopPropagation()}
      onClick={e => { e.stopPropagation(); onToggleComplete?.(card.name) }}
      aria-label={isCompleted ? `Mark ${card.name} not complete` : `Mark ${card.name} complete`}
      aria-pressed={isCompleted}
      title={isCompleted ? 'Completed — tap to undo' : 'Mark complete'}
      className={`inline-flex items-center justify-center h-7 w-7 rounded-full transition-colors ${
        isCompleted ? 'text-green-500' : 'text-muted-foreground/50 hover:text-green-500'
      }`}
    >
      {isCompleted
        ? <CheckCircle2 key="done" className="h-5 w-5 flashcard-complete-pop" />
        : <Circle className="h-5 w-5" />}
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
  // Sheen intensity scales with mastery: New/L1/Forgotten stay subtle, L2 is
  // the standard shine, L3 gets the dramatic pulsing treatment.
  const sheenLevelClass = masteryState === 'level3' ? ' flashcard-sheen-l3' : masteryState === 'level2' ? ' flashcard-sheen-l2' : ''
  const showSheen = (animateCollected ?? collected) && collected
  const baseClass = `group relative rounded-xl flex flex-col transition-shadow min-h-[150px]${showSheen && !focusMode ? ` flashcard-collected${sheenLevelClass}` : ''}${isFlashing ? ' flashcard-highlight' : ''}${isCompleted ? ' ring-1 ring-green-500/50' : ''}`
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
        {/* Header: name + play button — hidden in focus mode */}
        {!focusMode && (
        <div className="flex items-center justify-between gap-1 px-3 py-2">
          <span className="text-sm font-medium text-muted-foreground truncate min-w-0">{card.name}</span>
          <div className="relative shrink-0" ref={playMenuRef}>
            <button
              ref={playBtnRef}
              type="button"
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
                    onPointerDown={e => e.stopPropagation()}
                    onClick={e => { e.stopPropagation(); addCard(card) }}
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
        </div>
        )}
        {showQuestionsModal && (
          <ConceptQuestionsModal conceptName={card.name} onClose={() => setShowQuestionsModal(false)} />
        )}
        {showLearningProgress && (
          <LearningProgressModal conceptName={card.name} onClose={() => setShowLearningProgress(false)} />
        )}

        {/* Back content — grows to fit, no scrollbar */}
        <div className="px-3 py-2">
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
                  <img src={img.src} alt={img.alt} className="max-w-full object-contain rounded" onError={e => { (e.currentTarget as HTMLImageElement).style.display = 'none' }} />
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
      {/* Top bar: deck toggle + actions menu — hidden in focus mode */}
      {!focusMode && (
      <div className="flex items-center justify-between gap-1.5 px-2 pt-2">
        {onToggleComplete ? completeToggleButton : deckToggleButton}
        <div className="relative" ref={playMenuRef}>
          <button
            ref={playBtnRef}
            type="button"
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
                  onPointerDown={e => e.stopPropagation()}
                  onClick={e => { e.stopPropagation(); addCard(card) }}
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
      </div>
      )}
      {showQuestionsModal && (
        <ConceptQuestionsModal conceptName={card.name} onClose={() => setShowQuestionsModal(false)} />
      )}
      {showLearningProgress && (
        <LearningProgressModal conceptName={card.name} onClose={() => setShowLearningProgress(false)} />
      )}

      {/* Name — click to flip. In focus mode the title is the only thing shown:
          no lock icon, no mastery pill, no collect button. */}
      <button
        type="button"
        onPointerDown={e => e.stopPropagation()}
        onClick={e => { e.stopPropagation(); handleFlipOpen() }}
        className={`flex-1 flex flex-col items-center justify-center px-3 py-2 text-center gap-1 transition-colors ${
          isActive ? 'text-primary' : 'hover:text-primary'
        }`}
      >
        <span className="flex items-center justify-center gap-1.5">
          <span className="font-semibold text-base leading-snug">{card.name}</span>
          {!collected && !focusMode && <Lock className="h-4 w-4 shrink-0" />}
        </span>
      </button>

      {/* Mastery pill / collect button — hidden in focus mode */}
      {!focusMode && (
        <div className="flex justify-center pb-2.5">
          {collected ? (
            <MasteryPill state={masteryState} />
          ) : (
            <button
              type="button"
              onPointerDown={e => e.stopPropagation()}
              onClick={e => { e.stopPropagation(); openCollect(card) }}
              aria-label={`Collect ${card.name}`}
              className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[11px] font-semibold bg-primary text-primary-foreground hover:bg-primary/90 transition-colors"
            >
              <Lock className="h-3 w-3" /> Collect
            </button>
          )}
        </div>
      )}
    </div>
  )
}

// ─── Remove All / Save Pack Dialog ───────────────────────────────────────────

function FlashcardsManageDialog({
  cardCount,
  cardNames,
  canSave,
  onCancel,
  onRemoveAll,
}: {
  cardCount: number
  cardNames: string[]
  canSave: boolean
  onCancel: () => void
  onRemoveAll: () => void
}) {
  const { addSavedPack } = useFlashcards()
  const [packName, setPackName] = useState('')
  const [saved, setSaved] = useState(false)

  useEffect(() => {
    function onKey(e: KeyboardEvent) { if (e.key === 'Escape') onCancel() }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [onCancel])

  function handleSave() {
    const name = packName.trim() || `My Pack`
    addSavedPack(name, cardNames)
    setSaved(true)
  }

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

        {canSave && cardCount > 0 && (
          <div className="rounded-md bg-muted/40 p-3 space-y-2">
            <p className="text-sm font-medium">Save as pack</p>
            {saved ? (
              <p className="text-sm text-green-600 dark:text-green-400 flex items-center gap-1.5">
                <Check className="h-4 w-4" /> Saved to your packs
              </p>
            ) : (
              <div className="flex gap-2">
                <input
                  type="text"
                  value={packName}
                  onChange={e => setPackName(e.target.value)}
                  onKeyDown={e => { if (e.key === 'Enter') handleSave() }}
                  placeholder="Pack name…"
                  className="flex-1 h-8 rounded-md border bg-background px-2.5 text-[16px] sm:text-sm focus:outline-none focus:ring-1 focus:ring-ring"
                />
                <Button size="sm" onClick={handleSave}>Save</Button>
              </div>
            )}
          </div>
        )}

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
            <CheckCircle2 className="h-4 w-4" /> Clear completed to a pack
          </button>
          <button
            type="button"
            onClick={onStudyAgain}
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
  onGroupByChange,
  examGroups,
  flashingCard,
  activeIndex,
  onSelect,
  onRemove,
  onRemoveAll,
  onDragEnd,
  sensors,
  onClose,
  conceptMasteryMap,
  reverseCardModes,
  globalFlip,
  inline = false,
  tab,
  onTabChange,
  onCardsAdded,
  focusMode = false,
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
  onRemoveAll: () => void
  onDragEnd: (e: DragEndEvent) => void
  sensors: ReturnType<typeof useSensors>
  onClose?: () => void
  conceptMasteryMap: Map<string, MasteryState>
  reverseCardModes: Set<ReverseCardSection>
  globalFlip: boolean
  inline?: boolean
  tab: GalleryTab
  onTabChange: (tab: GalleryTab) => void
  onCardsAdded?: () => void
  focusMode?: boolean
}) {
  const { user } = useAuth()
  const { toggleCompleted, clearCompleted } = useFlashcards()
  const collectedCards = useCollectedCards(s => s.cards)
  const collectedCount = collectedCards.length
  const completedCount = useMemo(() => cards.filter(c => c.completedAt).length, [cards])
  const collectedSet = useMemo(
    () => new Set(collectedCards.map(c => c.name.toLowerCase())),
    [collectedCards],
  )
  const [showManageDialog, setShowManageDialog] = useState(false)
  const scrollContainerRef = useRef<HTMLDivElement>(null)

  // Center the active deck card when the deck tab becomes visible.
  useEffect(() => {
    if (tab !== 'deck') return
    const activeCard = orderedCards[activeIndex]
    if (!activeCard || !scrollContainerRef.current) return
    const all = scrollContainerRef.current.querySelectorAll<HTMLElement>('[data-card-name]')
    for (const el of all) {
      if (el.dataset.cardName === activeCard.name) {
        el.scrollIntoView({ block: 'center', behavior: 'instant' })
        break
      }
    }
  }, [tab]) // eslint-disable-line react-hooks/exhaustive-deps

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
        onToggleComplete={toggleCompleted}
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
      {/* Header — tab switcher (hidden in focus mode) */}
      {!focusMode && (
        <div className={inline ? 'pb-3' : 'sticky top-0 z-10 bg-background px-4 py-3'}>
          <div className="flex items-center gap-3">
            <div className="flex-1 min-w-0">
              <GalleryTabBar
                active={tab}
                onChange={onTabChange}
                deckCount={cards.length}
                collectedCount={collectedCount}
              />
            </div>
          </div>
        </div>
      )}

      {/* Scrollable content */}
      <div
        ref={scrollContainerRef}
        className={inline
          ? 'space-y-4'
          : 'flex-1 overflow-y-auto overscroll-contain px-4 py-4 space-y-4 pb-24 md:pb-20'}
      >
        {tab === 'deck' && (
          <div className="space-y-4">
            {/* Deck controls: count / manage / sort / add — hidden in focus mode */}
            {!focusMode && (
            <div className="flex items-center gap-3 flex-wrap">
              <div className="flex items-center gap-2 shrink-0">
                <button
                  type="button"
                  onClick={() => setShowManageDialog(true)}
                  className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors"
                >
                  {cards.length} card{cards.length === 1 ? '' : 's'}
                </button>
                <button
                  type="button"
                  onClick={() => setShowManageDialog(true)}
                  title="Manage cards"
                  className="inline-flex items-center justify-center h-8 w-8 rounded-md text-muted-foreground hover:text-destructive hover:bg-accent transition-colors"
                >
                  <Trash2 className="h-4 w-4" />
                </button>
              </div>
              {cards.length > 0 && (
                <select
                  value={groupBy}
                  onChange={e => onGroupByChange(e.target.value as GroupBy)}
                  className="h-9 rounded-md border bg-muted/60 px-3 text-sm font-medium text-foreground focus:outline-none focus:ring-1 focus:ring-ring shrink-0"
                >
                  {GROUP_LABELS.map(({ key, label }) => (
                    <option key={key} value={key}>{label}</option>
                  ))}
                </select>
              )}
              <div className="flex-1" />
              {completedCount > 0 && (
                <button
                  type="button"
                  onClick={clearCompleted}
                  title="Move completed cards into a dated pack and clear them from your deck"
                  className="inline-flex items-center gap-1.5 px-3 h-9 rounded-md bg-green-600 text-white text-xs sm:text-sm font-semibold shadow-sm hover:bg-green-700 active:scale-[0.98] transition-all shrink-0"
                >
                  <CheckCircle2 className="h-4 w-4 shrink-0" />
                  <span>Clear Completed</span>
                  <span className="text-[10px] font-bold px-1.5 py-0.5 rounded-full bg-white/25 tabular-nums">
                    {completedCount}
                  </span>
                </button>
              )}
              <DeckAddSearch onCardsAdded={onCardsAdded} />
            </div>
            )}

            {cards.length === 0 ? (
              <div className="rounded-xl bg-card text-card-foreground p-10 text-center space-y-2">
                <Layers className="h-9 w-9 mx-auto text-muted-foreground/50" />
                <p className="text-sm text-muted-foreground">Your deck is empty.</p>
                <p className="text-xs text-muted-foreground">
                  Add flashcards from the <span className="font-medium">Packs</span> or{' '}
                  <span className="font-medium">Collected</span> tabs, or search above.
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
        )}

        {tab === 'collected' && (
          <CollectedContent
            conceptMasteryMap={conceptMasteryMap}
            reverseCardModes={reverseCardModes}
            globalFlip={globalFlip}
            onCardsAdded={onCardsAdded}
          />
        )}

        {tab === 'packs' && <PacksContent onCardsAdded={onCardsAdded} />}
      </div>

      {showManageDialog && (
        <FlashcardsManageDialog
          cardCount={cards.length}
          cardNames={cards.map(c => c.name)}
          canSave={!!user}
          onCancel={() => setShowManageDialog(false)}
          onRemoveAll={() => { onRemoveAll(); onClose?.(); setShowManageDialog(false) }}
        />
      )}
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
    <div className="flex flex-col items-center gap-5 px-4 py-6">
      {/* Flip card */}
      <div
        data-tour="flip-card"
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
          <div className="flex-1 flex flex-col p-6 gap-4">
            {!focusMode && (
            <div className="flex items-center gap-2">
              <p className="text-sm font-medium text-muted-foreground">{current.name}</p>
              {/* Play menu — left-aligned right after the name */}
              <div className="relative shrink-0" ref={playMenuRef} onClick={e => e.stopPropagation()}>
                <button
                  ref={playBtnRef}
                  type="button"
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
                    <img src={img.src} alt={img.alt} className="max-w-full max-h-48 object-contain rounded" onError={e => { (e.currentTarget as HTMLImageElement).style.display = 'none' }} />
                    {img.caption && (
                      <figcaption className="text-xs text-muted-foreground text-center">{img.caption}</figcaption>
                    )}
                  </figure>
                ))}
              </div>
            )}
            {expanded && markdown && (
              <div className="pt-4 overflow-y-auto max-h-96">
                <WikiArticle
                  markdown={markdown}
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

export default function Flashcards() {
  const {
    cards, removeCard, clearCards, customOrder, setCustomOrder,
    toggleCompleted, clearCompleted, resetCompleted,
  } = useFlashcards()
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
  const studyAreaRef = useRef<FlashcardStudyAreaHandle>(null)

  const [activeIndex, setActiveIndex] = useState(0)
  const [galleryExpanded, setGalleryExpanded] = useState(false)
  // Lifted out of GalleryPanel so the selected tab (Packs/Collected/My Deck)
  // survives the empty→non-empty remount when the first card is added —
  // otherwise the inline (empty-deck) and overlay GalleryPanel instances each
  // mount their own default tab and adding a card "jumps" you to My Deck.
  const [galleryTab, setGalleryTab] = useState<GalleryTab>('packs')
  const [focusMode, setFocusMode] = useState(false)
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

  useEffect(() => {
    if (galleryExpanded || focusMode) {
      document.body.style.overflow = 'hidden'
    } else {
      document.body.style.overflow = ''
    }
    return () => { document.body.style.overflow = '' }
  }, [galleryExpanded, focusMode])

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
  }, !galleryExpanded && !popupOpen && !showShortcutsHelp && !showSessionSummary && cards.length > 0)

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

  // Keep activeIndex in bounds when cards are removed
  useEffect(() => {
    if (cards.length > 0 && activeIndex >= cards.length) {
      setActiveIndex(cards.length - 1)
    }
  }, [cards.length, activeIndex])

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

  const completedCount = useMemo(() => cards.filter(c => c.completedAt).length, [cards])
  const completedNamesLower = useMemo(
    () => new Set(cards.filter(c => c.completedAt).map(c => c.name.toLowerCase())),
    [cards],
  )

  function handleShuffle() {
    setShuffleOrder(shuffled(cards.map(c => c.name)))
    setGroupBy('shuffle')
    setActiveIndex(0)
  }

  // Selecting "Shuffle" from the sort dropdown draws a fresh order each time.
  function handleGroupByChange(g: GroupBy) {
    if (g === 'shuffle') setShuffleOrder(shuffled(cards.map(c => c.name)))
    setGroupBy(g)
  }

  // Rate the current card and advance to the next unfinished one, wrapping
  // around the deck. "Got it" marks it complete; "Again" tallies a lapse (and
  // un-completes a previously finished card that has slipped). Once nothing is
  // left unfinished, the session summary takes over.
  function handleRate(rating: StudyRating) {
    const card = orderedCards[activeIndex]
    if (!card) return
    if (rating === 'again') {
      setAgainCounts(m => ({ ...m, [card.name]: (m[card.name] ?? 0) + 1 }))
      if (card.completedAt) toggleCompleted(card.name)
    } else if (!card.completedAt) {
      toggleCompleted(card.name)
    }
    const completedFlags = orderedCards.map((c, i) =>
      i === activeIndex ? rating === 'got' : !!c.completedAt)
    const next = nextIncompleteIndex(completedFlags, activeIndex)
    if (next === -1) {
      setShowSessionSummary(true)
    } else if (next === activeIndex) {
      // Sole unfinished card: the index can't change, so flip it back over for
      // another pass instead.
      studyAreaRef.current?.flip()
    } else {
      setActiveIndex(next)
    }
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
  }, [highlightName, orderedCards, setSearchParams])

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

  // Empty state — no cards in the deck yet. Show the tabbed gallery inline so
  // the user can browse Packs / Collected and add cards to start studying. The
  // layout fills the viewport (rather than contracting to its content) and
  // keeps the controls toolbar pinned to the bottom, matching the study view.
  if (cards.length === 0) {
    return (
      <>
        <div className="container mx-auto px-4 sm:px-6 py-6 min-h-[calc(100vh-9rem)] pb-40 md:pb-32 space-y-6">
          <h1 className="text-2xl font-bold tracking-tight">Flashcards</h1>
          <GalleryPanel
            inline
            tab={galleryTab}
            onTabChange={setGalleryTab}
            onCardsAdded={() => setGalleryExpanded(true)}
            cards={cards}
            orderedCards={orderedCards}
            groupBy={groupBy}
            onGroupByChange={handleGroupByChange}
            examGroups={examGroups}
            flashingCard={flashingCard}
            activeIndex={activeIndex}
            onSelect={setActiveIndex}
            onRemove={removeCard}
            onRemoveAll={clearCards}
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

        {/* Controls toolbar — kept visible so the empty deck doesn't lose it.
            Flip / Back content act on the gallery cards; study-only controls
            (gallery toggle, focus) are hidden via `minimal`. */}
        <div className="fixed bottom-14 md:bottom-0 left-0 lg:left-[var(--sidebar-width)] right-0 z-[46]">
          <FlashcardControlsBar
            minimal
            reverseCardModes={reverseCardModes}
            onToggleMode={toggleReverseMode}
            flip={globalFlip}
            onFlipToggle={() => setGlobalFlip(v => !v)}
            focusMode={false}
            onFocusToggle={() => {}}
            onShortcutsHelp={() => setShowShortcutsHelp(true)}
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

  // Opening the gallery always lands on "My Deck" and flashes the card being
  // studied so you can see where the active card sits among the rest; the
  // GalleryPanel scrolls it into view on mount. Closing just dismisses.
  function handleGalleryToggle() {
    if (galleryExpanded) {
      setGalleryExpanded(false)
      return
    }
    const activeCard = orderedCards[activeIndex]
    setGalleryTab('deck')
    setGalleryExpanded(true)
    if (activeCard) {
      setFlashingCard(activeCard.name)
      if (flashTimerRef.current) clearTimeout(flashTimerRef.current)
      flashTimerRef.current = setTimeout(() => setFlashingCard(null), 1700)
    }
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
          onGroupByChange={handleGroupByChange}
          examGroups={examGroups}
          flashingCard={flashingCard}
          activeIndex={activeIndex}
          onSelect={idx => { setActiveIndex(idx) }}
          onRemove={removeCard}
          onRemoveAll={clearCards}
          onDragEnd={handleDragEnd}
          sensors={sensors}
          onClose={() => setGalleryExpanded(false)}
          conceptMasteryMap={conceptMasteryMap}
          reverseCardModes={reverseCardModes}
          globalFlip={globalFlip}
          focusMode={focusMode}
          tab={galleryTab}
          onTabChange={setGalleryTab}
        />
      )}

      <div
        className={`container max-w-4xl mx-auto pb-52 md:pb-44${studyFocus ? ' relative z-[56] pointer-events-none' : ''}`}
        style={popupOpen ? { paddingBottom: 'calc(var(--concept-split-height, 50vh) + 1.5rem)' } : undefined}
      >
        {/* Sticky header: page title — hidden when the gallery overlay is open */}
        {!galleryExpanded && (
          <div className={`sticky top-0 md:top-14 lg:top-0 z-10 bg-background px-4 sm:px-6 py-3${focusMode ? ' invisible' : ''}`}>
            <h1 className="text-2xl font-bold tracking-tight">Flashcards</h1>
          </div>
        )}

        {/* Study area */}
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
          onClearCompleted={() => {
            clearCompleted()
            setAgainCounts({})
            setShowSessionSummary(false)
            setActiveIndex(0)
          }}
          onStudyAgain={() => {
            resetCompleted()
            if (groupBy === 'shuffle') setShuffleOrder(shuffled(cards.map(c => c.name)))
            setAgainCounts({})
            setShowSessionSummary(false)
            setActiveIndex(0)
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
        {/* Gallery strip conveyor — only in study mode */}
        {!galleryExpanded && (
          <div className="bg-background px-4">
            <GalleryStrip
              cards={orderedCards}
              activeIndex={activeIndex}
              onSelect={setActiveIndex}
              conceptMasteryMap={conceptMasteryMap}
              completedNames={completedNamesLower}
            />
          </div>
        )}
        {/* Prev / Next nav footer — only in study mode */}
        {!galleryExpanded && (
          <div className="flex items-stretch h-16 shrink-0 bg-background">
            <button
              type="button"
              disabled={activeIndex === 0}
              onClick={() => setActiveIndex(activeIndex - 1)}
              className="flex-1 flex items-center justify-center gap-2 px-4 text-base sm:text-sm font-medium hover:bg-accent/60 active:bg-accent disabled:opacity-40 disabled:cursor-not-allowed transition-colors"
            >
              <ChevronLeft className="h-6 w-6 sm:h-5 sm:w-5" />
              <span>Previous</span>
            </button>
            <div className="self-center px-4 shrink-0 flex flex-col items-center">
              <span className="text-sm text-muted-foreground tabular-nums">
                {activeIndex + 1} / {orderedCards.length}
              </span>
              {completedCount > 0 && (
                <span className="flex items-center gap-0.5 text-[10px] font-semibold text-green-600 dark:text-green-400 tabular-nums">
                  <CheckCircle2 className="h-3 w-3" /> {completedCount} done
                </span>
              )}
            </div>
            <button
              type="button"
              disabled={activeIndex === orderedCards.length - 1}
              onClick={() => setActiveIndex(activeIndex + 1)}
              className="flex-1 flex items-center justify-center gap-2 px-4 text-base sm:text-sm font-medium hover:bg-accent/60 active:bg-accent disabled:opacity-40 disabled:cursor-not-allowed transition-colors"
            >
              <span>Next</span>
              <ChevronRight className="h-6 w-6 sm:h-5 sm:w-5" />
            </button>
          </div>
        )}
        <FlashcardControlsBar
          galleryOpen={galleryExpanded}
          onGalleryToggle={handleGalleryToggle}
          reverseCardModes={reverseCardModes}
          onToggleMode={toggleReverseMode}
          flip={globalFlip}
          onFlipToggle={() => setGlobalFlip(v => !v)}
          focusMode={focusMode}
          onFocusToggle={handleFocusToggle}
          onShortcutsHelp={() => setShowShortcutsHelp(true)}
          onShuffle={handleShuffle}
        />
      </div>
    </>
  )
}
