import { useEffect, useMemo, useRef, useState } from 'react'
import { Link, useNavigate, useSearchParams } from 'react-router-dom'
import {
  BookOpen,
  CalendarDays,
  Check,
  ChevronLeft,
  ChevronRight,
  ChevronsUpDown,
  GraduationCap,
  Images,
  LayoutGrid,
  Layers,
  Loader2,
  Play,
  Sigma,
  Target,
  Trash2,
  TrendingUp,
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

// Color palette for exam packs — one entry per exam in rotation
const PACK_COLOR_PALETTE = [
  // Blue
  {
    card: 'bg-blue-500/10 border-blue-400/40 hover:bg-blue-500/15',
    cardText: 'text-blue-700 dark:text-blue-300',
    cardSub: 'text-blue-600/70 dark:text-blue-400/60',
    cardIcon: 'text-blue-500',
    selCard: 'bg-blue-600 border-blue-600',
    selText: 'text-white',
    selSub: 'text-blue-100/80',
    selIcon: 'text-blue-200',
    loCard: 'bg-blue-500/5 border-blue-400/25 hover:bg-blue-500/10',
    loCardText: 'text-blue-700/80 dark:text-blue-400/80',
    loCardSub: 'text-blue-600/60 dark:text-blue-400/50',
    loCardIcon: 'text-blue-400',
    loSelCard: 'bg-blue-500 border-blue-500',
  },
  // Emerald
  {
    card: 'bg-emerald-500/10 border-emerald-400/40 hover:bg-emerald-500/15',
    cardText: 'text-emerald-700 dark:text-emerald-300',
    cardSub: 'text-emerald-600/70 dark:text-emerald-400/60',
    cardIcon: 'text-emerald-500',
    selCard: 'bg-emerald-600 border-emerald-600',
    selText: 'text-white',
    selSub: 'text-emerald-100/80',
    selIcon: 'text-emerald-200',
    loCard: 'bg-emerald-500/5 border-emerald-400/25 hover:bg-emerald-500/10',
    loCardText: 'text-emerald-700/80 dark:text-emerald-400/80',
    loCardSub: 'text-emerald-600/60 dark:text-emerald-400/50',
    loCardIcon: 'text-emerald-400',
    loSelCard: 'bg-emerald-500 border-emerald-500',
  },
  // Violet
  {
    card: 'bg-violet-500/10 border-violet-400/40 hover:bg-violet-500/15',
    cardText: 'text-violet-700 dark:text-violet-300',
    cardSub: 'text-violet-600/70 dark:text-violet-400/60',
    cardIcon: 'text-violet-500',
    selCard: 'bg-violet-600 border-violet-600',
    selText: 'text-white',
    selSub: 'text-violet-100/80',
    selIcon: 'text-violet-200',
    loCard: 'bg-violet-500/5 border-violet-400/25 hover:bg-violet-500/10',
    loCardText: 'text-violet-700/80 dark:text-violet-400/80',
    loCardSub: 'text-violet-600/60 dark:text-violet-400/50',
    loCardIcon: 'text-violet-400',
    loSelCard: 'bg-violet-500 border-violet-500',
  },
  // Orange
  {
    card: 'bg-orange-500/10 border-orange-400/40 hover:bg-orange-500/15',
    cardText: 'text-orange-700 dark:text-orange-300',
    cardSub: 'text-orange-600/70 dark:text-orange-400/60',
    cardIcon: 'text-orange-500',
    selCard: 'bg-orange-600 border-orange-600',
    selText: 'text-white',
    selSub: 'text-orange-100/80',
    selIcon: 'text-orange-200',
    loCard: 'bg-orange-500/5 border-orange-400/25 hover:bg-orange-500/10',
    loCardText: 'text-orange-700/80 dark:text-orange-400/80',
    loCardSub: 'text-orange-600/60 dark:text-orange-400/50',
    loCardIcon: 'text-orange-400',
    loSelCard: 'bg-orange-500 border-orange-500',
  },
  // Rose
  {
    card: 'bg-rose-500/10 border-rose-400/40 hover:bg-rose-500/15',
    cardText: 'text-rose-700 dark:text-rose-300',
    cardSub: 'text-rose-600/70 dark:text-rose-400/60',
    cardIcon: 'text-rose-500',
    selCard: 'bg-rose-600 border-rose-600',
    selText: 'text-white',
    selSub: 'text-rose-100/80',
    selIcon: 'text-rose-200',
    loCard: 'bg-rose-500/5 border-rose-400/25 hover:bg-rose-500/10',
    loCardText: 'text-rose-700/80 dark:text-rose-400/80',
    loCardSub: 'text-rose-600/60 dark:text-rose-400/50',
    loCardIcon: 'text-rose-400',
    loSelCard: 'bg-rose-500 border-rose-500',
  },
  // Cyan
  {
    card: 'bg-cyan-500/10 border-cyan-400/40 hover:bg-cyan-500/15',
    cardText: 'text-cyan-700 dark:text-cyan-300',
    cardSub: 'text-cyan-600/70 dark:text-cyan-400/60',
    cardIcon: 'text-cyan-500',
    selCard: 'bg-cyan-600 border-cyan-600',
    selText: 'text-white',
    selSub: 'text-cyan-100/80',
    selIcon: 'text-cyan-200',
    loCard: 'bg-cyan-500/5 border-cyan-400/25 hover:bg-cyan-500/10',
    loCardText: 'text-cyan-700/80 dark:text-cyan-400/80',
    loCardSub: 'text-cyan-600/60 dark:text-cyan-400/50',
    loCardIcon: 'text-cyan-400',
    loSelCard: 'bg-cyan-500 border-cyan-500',
  },
] as const

const STUDY_PLAN_COLOR = {
  card: 'bg-amber-500/10 border-amber-400/40 hover:bg-amber-500/15',
  cardText: 'text-amber-700 dark:text-amber-300',
  cardSub: 'text-amber-600/70 dark:text-amber-400/60',
  cardIcon: 'text-amber-500',
  selCard: 'bg-amber-600 border-amber-600',
  selText: 'text-white',
  selSub: 'text-amber-100/80',
  selIcon: 'text-amber-200',
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
      if (trimmed === '') break
      paragraphLines.push(trimmed)
    }
  }
  return paragraphLines.join('\n')
}

// ─── Flashcard Packs ──────────────────────────────────────────────────────────

interface FlashcardPack {
  id: string
  label: string
  sublabel?: string
  type: 'study_plan' | 'exam' | 'learning_objective'
  concepts: string[]
  colorIndex?: number
}

function FlashcardPacksSection({ onCardsAdded }: { onCardsAdded?: () => void } = {}) {
  const { syllabi } = useWikiSyllabus()
  const { records: masteryRecords, loading: masteryLoading } = useConceptMastery()
  const { progress: examProgress, targetDates } = useExamProgress()
  const { addCard, hasCard } = useFlashcards()

  const [collapsed, setCollapsed] = useState(false)
  const [selectedPackId, setSelectedPackId] = useState<string | null>(null)
  const [conceptsExpanded, setConceptsExpanded] = useState(false)
  const [selectedConcepts, setSelectedConcepts] = useState<Set<string>>(new Set())

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

  const packs = useMemo((): FlashcardPack[] => {
    const result: FlashcardPack[] = []
    if (primarySyllabus) {
      result.push({ id: 'study_plan', label: "Today's Study Plan", type: 'study_plan', concepts: [] })
    }
    for (const [i, syllabus] of inProgressSyllabi.entries()) {
      const colorIdx = i % PACK_COLOR_PALETTE.length
      const allConcepts = syllabus.topics.flatMap(t => t.concepts.map(c => c.name))
      result.push({ id: `exam_${syllabus.examId}`, label: syllabus.examLabel, type: 'exam', concepts: allConcepts, colorIndex: colorIdx })
      for (const topic of syllabus.topics) {
        if (topic.concepts.length > 0) {
          result.push({
            id: `lo_${syllabus.examId}_${topic.name}`,
            label: topic.name,
            sublabel: syllabus.examLabel,
            type: 'learning_objective',
            concepts: topic.concepts.map(c => c.name),
            colorIndex: colorIdx,
          })
        }
      }
    }
    return result
  }, [inProgressSyllabi, primarySyllabus])

  // Reset concept state when switching packs
  useEffect(() => {
    setSelectedConcepts(new Set())
    setConceptsExpanded(false)
  }, [selectedPackId])

  const selectedPack = packs.find(p => p.id === selectedPackId) ?? null

  const studyPlanConcepts = useMemo(() => {
    if (!studyPlan) return []
    return studyPlan.status === 'review_mode' ? studyPlan.reviewConcepts : studyPlan.todaysConcepts
  }, [studyPlan])

  const displayConcepts = useMemo(() => {
    if (!selectedPack) return []
    return selectedPack.type === 'study_plan' ? studyPlanConcepts : selectedPack.concepts
  }, [selectedPack, studyPlanConcepts])

  const notYetAdded = displayConcepts.filter(name => !hasCard(name))
  const allAdded = displayConcepts.length > 0 && notYetAdded.length === 0

  function toggleConceptSelect(name: string) {
    setSelectedConcepts(prev => {
      const next = new Set(prev)
      if (next.has(name)) next.delete(name); else next.add(name)
      return next
    })
  }

  function handleAddSelected() {
    const toAdd = selectedConcepts.size > 0
      ? displayConcepts.filter(n => selectedConcepts.has(n) && !hasCard(n))
      : notYetAdded
    for (const name of toAdd) addCard({ kind: 'concept', name })
    setSelectedConcepts(new Set())
    if (toAdd.length > 0) onCardsAdded?.()
  }

  function packCounts(pack: FlashcardPack): { inGallery: number; total: number } {
    const concepts = pack.type === 'study_plan' ? studyPlanConcepts : pack.concepts
    return { inGallery: concepts.filter(n => hasCard(n)).length, total: concepts.length }
  }

  const isLoading = planLoading || masteryLoading

  if (!isLoading && packs.length === 0) return null

  return (
    <div className="rounded-lg border bg-card text-card-foreground">
      {/* Section header */}
      <div
        role="button"
        tabIndex={0}
        onClick={() => setCollapsed(v => !v)}
        onKeyDown={e => { if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); setCollapsed(v => !v) } }}
        className="flex items-center justify-between px-3 py-2 cursor-pointer hover:bg-accent/40 transition-colors rounded-lg"
        aria-expanded={!collapsed}
      >
        <div className="flex items-center gap-2">
          <Layers className="h-3.5 w-3.5 text-primary shrink-0" />
          <span className="font-medium text-xs">Flashcard Packs</span>
          {packs.length > 0 && (
            <span className="text-xs text-muted-foreground">{packs.length} pack{packs.length === 1 ? '' : 's'}</span>
          )}
        </div>
        <ChevronsUpDown className="h-3.5 w-3.5 text-muted-foreground" />
      </div>

      {!collapsed && (
        <div className="px-3 pb-3 space-y-3">
          {/* Horizontal scrollable pack chips */}
          {isLoading && packs.length === 0 ? (
            <div className="flex items-center gap-2 text-xs text-muted-foreground py-1">
              <Loader2 className="h-3.5 w-3.5 animate-spin" /> Loading packs…
            </div>
          ) : (
            <div
              className="flex items-stretch gap-2 overflow-x-auto pb-1"
              style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
            >
              {packs.map(pack => {
                const { inGallery, total } = packCounts(pack)
                const isSelected = pack.id === selectedPackId
                const isLO = pack.type === 'learning_objective'
                const isStudyPlan = pack.type === 'study_plan'
                const palette = !isStudyPlan ? PACK_COLOR_PALETTE[pack.colorIndex ?? 0] : null
                const cardCls = isStudyPlan
                  ? (isSelected ? `${STUDY_PLAN_COLOR.selCard} ${STUDY_PLAN_COLOR.selText}` : `${STUDY_PLAN_COLOR.card} ${STUDY_PLAN_COLOR.cardText}`)
                  : isLO
                    ? (isSelected ? `${palette!.loSelCard} text-white` : `${palette!.loCard} ${palette!.loCardText}`)
                    : (isSelected ? `${palette!.selCard} ${palette!.selText}` : `${palette!.card} ${palette!.cardText}`)
                const iconCls = isStudyPlan
                  ? (isSelected ? STUDY_PLAN_COLOR.selIcon : STUDY_PLAN_COLOR.cardIcon)
                  : isLO
                    ? (isSelected ? palette!.selIcon : palette!.loCardIcon)
                    : (isSelected ? palette!.selIcon : palette!.cardIcon)
                const subCls = isStudyPlan
                  ? (isSelected ? STUDY_PLAN_COLOR.selSub : STUDY_PLAN_COLOR.cardSub)
                  : isLO
                    ? (isSelected ? palette!.selSub : palette!.loCardSub)
                    : (isSelected ? palette!.selSub : palette!.cardSub)
                return (
                  <button
                    key={pack.id}
                    type="button"
                    onClick={() => setSelectedPackId(prev => prev === pack.id ? null : pack.id)}
                    className={`shrink-0 flex flex-col items-start gap-0.5 px-3 py-2 rounded-lg border text-left transition-colors min-w-[110px] max-w-[160px] ${cardCls}`}
                  >
                    <div className="flex items-center gap-1.5 w-full">
                      {pack.type === 'study_plan' && (
                        <CalendarDays className={`h-3 w-3 shrink-0 ${iconCls}`} />
                      )}
                      {pack.type === 'exam' && (
                        <GraduationCap className={`h-3 w-3 shrink-0 ${iconCls}`} />
                      )}
                      {pack.type === 'learning_objective' && (
                        <Target className={`h-3 w-3 shrink-0 ${iconCls}`} />
                      )}
                      <span className="text-xs font-medium truncate flex-1 min-w-0">{pack.label}</span>
                    </div>
                    {pack.sublabel && (
                      <span className={`text-[10px] truncate w-full ${subCls}`}>
                        {pack.sublabel}
                      </span>
                    )}
                    {(total > 0 || pack.type !== 'study_plan') && (
                      <span className={`text-[10px] tabular-nums ${subCls}`}>
                        {isLoading && pack.type === 'study_plan' ? '…' : `${inGallery}/${total} added`}
                      </span>
                    )}
                  </button>
                )
              })}
            </div>
          )}

          {/* Selected pack concept list */}
          {selectedPack && (
            <div className="border-t pt-2 space-y-2">
              {/* Concept list header — acts as collapse toggle */}
              <div
                role="button"
                tabIndex={0}
                onClick={() => setConceptsExpanded(v => !v)}
                onKeyDown={e => { if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); setConceptsExpanded(v => !v) } }}
                className="flex items-center justify-between gap-2 cursor-pointer hover:bg-accent/40 rounded px-1 py-1 transition-colors"
                aria-expanded={conceptsExpanded}
              >
                <span className="text-xs font-medium text-muted-foreground truncate">
                  {selectedPack.label}
                  {!isLoading && displayConcepts.length > 0 && (
                    <span className="ml-1 font-normal">· {displayConcepts.length}</span>
                  )}
                </span>
                <div className="flex items-center gap-1 shrink-0">
                  {!isLoading && allAdded && (
                    <span className="inline-flex items-center gap-0.5 text-[10px] font-medium text-green-600 dark:text-green-400">
                      <Check className="h-2.5 w-2.5" /> All added
                    </span>
                  )}
                  <ChevronsUpDown className="h-3 w-3 text-muted-foreground" />
                </div>
              </div>

              {/* Add all button — visible even when concept list is collapsed */}
              {!isLoading && !allAdded && displayConcepts.length > 0 && (
                <button
                  type="button"
                  onClick={handleAddSelected}
                  className="w-full flex items-center justify-center gap-2 px-4 py-3 rounded-lg bg-primary text-primary-foreground text-sm font-semibold hover:bg-primary/90 active:scale-[0.98] transition-all"
                >
                  {selectedConcepts.size > 0 ? `Add ${selectedConcepts.size}` : `Add all ${notYetAdded.length}`}
                </button>
              )}

              {conceptsExpanded && (
                <div className="space-y-2">
                  {isLoading && selectedPack.type === 'study_plan' && (
                    <div className="flex items-center gap-2 text-xs text-muted-foreground py-1">
                      <Loader2 className="h-3.5 w-3.5 animate-spin" /> Loading study plan…
                    </div>
                  )}

                  {!isLoading && selectedPack.type === 'study_plan' && !primarySyllabus && (
                    <p className="text-xs text-muted-foreground py-1">
                      Add an exam in progress from the{' '}
                      <Link to="/dashboard" className="text-primary hover:underline">Dashboard</Link>{' '}
                      to see today's study plan.
                    </p>
                  )}

                  {!isLoading && selectedPack.type === 'study_plan' && primarySyllabus && !studyPlan?.config?.targetReadyDate && (
                    <p className="text-xs text-muted-foreground py-1">
                      Set up your study plan on the{' '}
                      <Link to="/dashboard" className="text-primary hover:underline">Dashboard</Link>{' '}
                      to see today's concepts.
                    </p>
                  )}

                  {!isLoading && displayConcepts.length > 0 && (
                    <ul
                      className="overflow-y-auto"
                      style={{ maxHeight: '18rem' }}
                    >
                      {displayConcepts.map(name => {
                        const added = hasCard(name)
                        const checked = selectedConcepts.has(name)
                        return (
                          <li key={name} className="flex items-center gap-3 py-1.5">
                            <button
                              type="button"
                              onClick={() => !added && toggleConceptSelect(name)}
                              disabled={added}
                              aria-label={added ? `${name} already in gallery` : checked ? `Deselect ${name}` : `Select ${name}`}
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
                            <span className={`text-xs flex-1 min-w-0 truncate ${added ? 'text-muted-foreground' : ''}`}>{name}</span>
                            {added && (
                              <span className="text-[10px] text-green-600 dark:text-green-400 shrink-0">In gallery</span>
                            )}
                          </li>
                        )
                      })}
                    </ul>
                  )}
                </div>
              )}
            </div>
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
  reverseCardModes,
  globalFlip,
}: {
  card: FlashCard
  masteryState: MasteryState
  onSelect: () => void
  onRemove: (name: string) => void
  isFlashing: boolean
  isActive: boolean
  reverseCardModes: Set<ReverseCardSection>
  globalFlip: boolean
}) {
  const [flipped, setFlipped] = useState(globalFlip)
  const [markdown, setMarkdown] = useState<string | null>(null)
  const [loadStatus, setLoadStatus] = useState<'idle' | 'loading' | 'error'>('idle')
  const { openAt } = useConceptPopup()

  const { attributes, listeners, setNodeRef, transform, transition, isDragging } = useSortable({ id: card.name })

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

  const baseClass = `group relative rounded-xl border flex flex-col select-none transition-shadow${isFlashing ? ' flashcard-highlight' : ''}`
  const colorClass = isActive
    ? 'bg-primary/10 border-primary shadow-sm'
    : 'bg-card text-card-foreground'

  if (flipped) {
    return (
      <div
        ref={setNodeRef}
        style={style}
        data-card-name={card.name}
        onClick={() => setFlipped(false)}
        className={`${baseClass} ${colorClass} cursor-pointer`}
      >
        {/* Header: name + play + study shortcut + delete */}
        <div className="flex items-center gap-1 px-2.5 pt-2 pb-1.5 border-b">
          <span className="text-xs font-medium text-muted-foreground truncate flex-1 min-w-0">{card.name}</span>
          <button
            type="button"
            onPointerDown={e => e.stopPropagation()}
            onClick={e => { e.stopPropagation(); openAt([card], 0) }}
            aria-label={`Open ${card.name}`}
            className="text-muted-foreground hover:text-primary h-5 w-5 flex items-center justify-center transition-colors shrink-0"
          ><Play className="h-3 w-3" /></button>
          <button
            type="button"
            onPointerDown={e => e.stopPropagation()}
            onClick={e => { e.stopPropagation(); onSelect() }}
            className="text-[10px] text-primary hover:underline shrink-0"
          >
            study →
          </button>
          <button
            type="button"
            onPointerDown={e => e.stopPropagation()}
            onClick={e => { e.stopPropagation(); onRemove(card.name) }}
            aria-label={`Remove ${card.name}`}
            className="text-muted-foreground hover:text-destructive h-6 w-6 flex items-center justify-center opacity-0 group-hover:opacity-100 focus:opacity-100 transition-colors"
          ><Trash2 className="h-3 w-3" /></button>
        </div>

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
                  <img src={img.src} alt={img.alt} className="max-w-full object-contain rounded" />
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
      className={`${baseClass} ${colorClass} cursor-grab active:cursor-grabbing hover:shadow-md`}
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

      {/* Name — click to flip */}
      <button
        type="button"
        onPointerDown={e => e.stopPropagation()}
        onClick={e => { e.stopPropagation(); handleFlipOpen() }}
        className={`flex-1 flex flex-col items-center justify-center px-3 py-2 text-center gap-1 transition-colors ${
          isActive ? 'text-primary' : 'hover:text-primary'
        }`}
      >
        <span className="font-semibold text-sm leading-snug">{card.name}</span>
        <span className="text-[10px] text-muted-foreground">tap to flip</span>
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
  onRemoveAll,
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
  onRemoveAll: () => void
  onDragEnd: (e: DragEndEvent) => void
  sensors: ReturnType<typeof useSensors>
  onClose: () => void
  conceptMasteryMap: Map<string, MasteryState>
}) {
  const [reverseCardModes, setReverseCardModes] = useState<Set<ReverseCardSection>>(
    new Set<ReverseCardSection>(['definition']),
  )
  const [globalFlip, setGlobalFlip] = useState(false)
  const [confirmRemoveAll, setConfirmRemoveAll] = useState(false)

  function toggleMode(mode: ReverseCardSection) {
    setReverseCardModes(prev => {
      const next = new Set(prev)
      if (next.has(mode)) next.delete(mode); else next.add(mode)
      return next
    })
  }

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
        reverseCardModes={reverseCardModes}
        globalFlip={globalFlip}
      />
    )
  }

  return (
    <div className="gallery-panel fixed inset-0 z-40 flex flex-col bg-background" style={{ top: '3.5rem' }}>
      {/* Panel header — single row */}
      <div className="sticky top-0 z-10 bg-background border-b">
        <div className="flex items-center gap-2 px-4 py-2">
          {/* Card count + remove-all */}
          <div className="flex items-center gap-1 shrink-0">
            <span className="text-xs text-muted-foreground">{cards.length} card{cards.length === 1 ? '' : 's'}</span>
            {confirmRemoveAll ? (
              <div className="flex items-center gap-1">
                <span className="text-xs text-muted-foreground whitespace-nowrap">Remove all?</span>
                <button
                  type="button"
                  onClick={() => { onRemoveAll(); onClose(); setConfirmRemoveAll(false) }}
                  className="px-1.5 py-0.5 rounded text-xs font-medium bg-destructive text-destructive-foreground hover:bg-destructive/90 transition-colors"
                >Yes</button>
                <button
                  type="button"
                  onClick={() => setConfirmRemoveAll(false)}
                  className="px-1.5 py-0.5 rounded text-xs font-medium border hover:bg-accent transition-colors"
                >No</button>
              </div>
            ) : (
              <button
                type="button"
                onClick={() => setConfirmRemoveAll(true)}
                title="Remove all cards"
                className="inline-flex items-center justify-center h-5 w-5 rounded text-muted-foreground hover:text-destructive hover:bg-accent transition-colors"
              >
                <Trash2 className="h-3 w-3" />
              </button>
            )}
          </div>

          {/* Sort dropdown */}
          <select
            value={groupBy}
            onChange={e => onGroupByChange(e.target.value as GroupBy)}
            className="h-7 rounded-md border bg-muted/60 px-2 text-xs font-medium text-foreground focus:outline-none focus:ring-1 focus:ring-ring shrink-0"
          >
            {GROUP_LABELS.map(({ key, label }) => (
              <option key={key} value={key}>{label}</option>
            ))}
          </select>

          <div className="flex-1" />

          {/* Flip all toggle */}
          <div className="flex items-center gap-1.5 shrink-0">
            <span className="text-xs text-muted-foreground">Flip</span>
            <button
              type="button"
              role="switch"
              aria-checked={globalFlip}
              onClick={() => setGlobalFlip(v => !v)}
              title={globalFlip ? 'Show all fronts' : 'Flip all to back'}
              className={`relative inline-flex h-5 w-9 shrink-0 cursor-pointer items-center rounded-full border-2 border-transparent transition-colors ${
                globalFlip ? 'bg-primary' : 'bg-muted-foreground/30'
              }`}
            >
              <span className={`pointer-events-none block h-4 w-4 rounded-full bg-background shadow-lg ring-0 transition-transform ${
                globalFlip ? 'translate-x-4' : 'translate-x-0'
              }`} />
            </button>
          </div>

          {/* Back-side mode toggles */}
          <div className="flex items-center gap-0.5 shrink-0">
            <button
              type="button"
              onClick={() => toggleMode('definition')}
              title="Show definition"
              aria-pressed={reverseCardModes.has('definition')}
              className={`inline-flex items-center justify-center h-7 w-7 rounded-md border text-xs font-serif italic font-bold transition-colors ${
                reverseCardModes.has('definition')
                  ? 'bg-primary text-primary-foreground border-primary'
                  : 'text-muted-foreground hover:text-foreground hover:bg-accent'
              }`}
            >D</button>
            <button
              type="button"
              onClick={() => toggleMode('math')}
              title="Show math equations"
              aria-pressed={reverseCardModes.has('math')}
              className={`inline-flex items-center justify-center h-7 w-7 rounded-md border transition-colors ${
                reverseCardModes.has('math')
                  ? 'bg-primary text-primary-foreground border-primary'
                  : 'text-muted-foreground hover:text-foreground hover:bg-accent'
              }`}
            ><Sigma className="h-3.5 w-3.5" /></button>
            <button
              type="button"
              onClick={() => toggleMode('images')}
              title="Show images"
              aria-pressed={reverseCardModes.has('images')}
              className={`inline-flex items-center justify-center h-7 w-7 rounded-md border transition-colors ${
                reverseCardModes.has('images')
                  ? 'bg-primary text-primary-foreground border-primary'
                  : 'text-muted-foreground hover:text-foreground hover:bg-accent'
              }`}
            ><Images className="h-3.5 w-3.5" /></button>
          </div>
        </div>
      </div>

      {/* Scrollable content */}
      <div className="flex-1 overflow-y-auto px-4 py-4 space-y-6">
        <FlashcardPacksSection />

        <DndContext sensors={sensors} collisionDetection={closestCenter} onDragEnd={onDragEnd}>
          <SortableContext items={orderedCards.map(c => c.name)} strategy={rectSortingStrategy}>
            {groupBy === 'exam' ? (
              <div className="space-y-6">
                {examGroups.length === 0 ? (
                  <div className="grid grid-cols-1 sm:grid-cols-3 lg:grid-cols-4 gap-3">
                    {orderedCards.map(renderCard)}
                  </div>
                ) : (
                  examGroups.map(({ label, cards: groupCards }) => (
                    <div key={label} className="space-y-2">
                      <h2 className="text-xs font-semibold text-muted-foreground uppercase tracking-wider">{label}</h2>
                      <div className="grid grid-cols-1 sm:grid-cols-3 lg:grid-cols-4 gap-3">
                        {groupCards.map(renderCard)}
                      </div>
                    </div>
                  ))
                )}
              </div>
            ) : (
              <div className="grid grid-cols-1 sm:grid-cols-3 lg:grid-cols-4 gap-3">
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
  const { cards, removeCard, clearCards, customOrder, setCustomOrder } = useFlashcards()
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
        <div className="container max-w-4xl mx-auto px-4 sm:px-6 py-8 space-y-6">
          <h1 className="text-2xl font-bold tracking-tight">Flashcards</h1>
          <FlashcardPacksSection onCardsAdded={() => setGalleryExpanded(true)} />
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
          onRemoveAll={clearCards}
          onDragEnd={handleDragEnd}
          sensors={sensors}
          onClose={() => setGalleryExpanded(false)}
          conceptMasteryMap={conceptMasteryMap}
        />
      )}

      <div
        className="container max-w-4xl mx-auto"
        style={popupOpen ? { paddingBottom: 'calc(var(--concept-split-height, 50vh) + 1.5rem)' } : undefined}
      >
        {/* Sticky header: title + gallery strip */}
        <div className="sticky top-0 md:top-14 lg:top-0 z-10 bg-background border-b px-4 sm:px-6 pt-3">
          <div className="flex items-center justify-between mb-1">
            <h1 className="text-2xl font-bold tracking-tight">Flashcards</h1>
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
