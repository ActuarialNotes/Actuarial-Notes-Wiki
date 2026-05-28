import { useEffect, useMemo, useRef, useState } from 'react'
import { Link, useSearchParams } from 'react-router-dom'
import ReactMarkdown from 'react-markdown'
import remarkGfm from 'remark-gfm'
import remarkMath from 'remark-math'
import rehypeKatex from 'rehype-katex'
import {
  BookOpen,
  CalendarDays,
  Check,
  ChevronLeft,
  ChevronRight,
  ChevronsUpDown,
  Loader2,
  Trash2,
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
import { entryRefToRepoPath } from '@/lib/wikiRoutes'
import type { WikiEntryRef } from '@/lib/wikiRoutes'
import { decayIfStale, type MasteryState } from '@/lib/mastery'
import { wikiExamIdToProgressKey } from '@/lib/wikiParser'
import { WikiArticle, stripFrontmatter, extractMathBlockquotes } from '@/components/wiki/WikiArticle'
import { ConceptPopup } from '@/components/wiki/ConceptPopup'

type GroupBy = 'exam' | 'date' | 'alpha' | 'custom'

const MASTERY_CONFIG: Record<MasteryState, { label: string; className: string }> = {
  new:      { label: 'New',      className: 'bg-muted text-muted-foreground' },
  level1:   { label: '1',        className: 'bg-amber-500/20 text-amber-600 dark:text-amber-400' },
  level2:   { label: '2',        className: 'bg-blue-500/20 text-blue-600 dark:text-blue-400' },
  level3:   { label: '3',        className: 'bg-green-500/20 text-green-600 dark:text-green-400' },
  forgotten: { label: 'Forgotten', className: 'bg-rose-500/20 text-rose-600 dark:text-rose-400' },
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
      if (trimmed && !trimmed.startsWith('#') && !trimmed.startsWith('-') && !trimmed.startsWith('*') && !trimmed.startsWith('>')) {
        started = true
        paragraphLines.push(trimmed)
      }
    } else {
      if (trimmed === '') break
      paragraphLines.push(trimmed)
    }
  }
  return paragraphLines.join(' ')
}

function FlashcardStudy({ cards, onDone }: { cards: WikiEntryRef[]; onDone: () => void }) {
  const [index, setIndex] = useState(0)
  const [flipped, setFlipped] = useState(false)
  const [expanded, setExpanded] = useState(false)
  const [markdown, setMarkdown] = useState<string | null>(null)
  const [loadStatus, setLoadStatus] = useState<'idle' | 'loading' | 'error'>('idle')

  const current = cards[index]

  useEffect(() => {
    setFlipped(false); setExpanded(false); setMarkdown(null); setLoadStatus('idle')
  }, [index])

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
      setFlipped(false); setExpanded(false)
    }
  }

  const definition = markdown ? extractFirstParagraph(markdown) : null
  const firstEquation = markdown ? (extractMathBlockquotes(markdown)[0] ?? null) : null

  return (
    <div className="flex flex-col items-center min-h-screen bg-background px-4 py-8">
      <div className="w-full max-w-xl flex items-center justify-between mb-8">
        <span className="text-sm text-muted-foreground">{index + 1} / {cards.length}</span>
        <button type="button" onClick={onDone} className="inline-flex items-center gap-1.5 text-sm text-muted-foreground hover:text-foreground transition-colors">
          <X className="h-4 w-4" /> Done
        </button>
      </div>

      <div
        className="w-full max-w-xl min-h-56 rounded-2xl border bg-card text-card-foreground shadow-xl flex flex-col cursor-pointer select-none transition-all"
        onClick={handleFlip}
        role="button" tabIndex={0}
        aria-label={flipped ? 'Click to flip back' : 'Click to reveal definition'}
        onKeyDown={e => { if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); handleFlip() } }}
      >
        {!flipped ? (
          <div className="flex-1 flex flex-col items-center justify-center p-8 gap-3">
            <span className="text-3xl font-bold text-center leading-tight">{current.name}</span>
            <span className="text-xs text-muted-foreground mt-2">click to flip</span>
          </div>
        ) : (
          <div className="flex-1 flex flex-col p-6 gap-4" onClick={e => e.stopPropagation()}>
            <p className="text-sm font-medium text-muted-foreground">{current.name}</p>
            {loadStatus === 'loading' && (
              <div className="flex items-center gap-2 text-sm text-muted-foreground py-4">
                <Loader2 className="h-4 w-4 animate-spin" /> Loading…
              </div>
            )}
            {loadStatus === 'error' && <p className="text-sm text-destructive">Couldn't load content.</p>}
            {definition && (
              <div className="text-base leading-relaxed prose dark:prose-invert prose-sm max-w-none">
                <ReactMarkdown remarkPlugins={[remarkGfm, remarkMath]} rehypePlugins={[rehypeKatex]}>
                  {definition}
                </ReactMarkdown>
              </div>
            )}
            {firstEquation && (
              <div className="prose dark:prose-invert prose-sm max-w-none">
                <ReactMarkdown remarkPlugins={[remarkGfm, remarkMath]} rehypePlugins={[rehypeKatex]}>
                  {firstEquation}
                </ReactMarkdown>
              </div>
            )}
            {!expanded && markdown && (
              <button type="button" onClick={() => setExpanded(true)} className="self-start text-xs text-primary hover:underline mt-1">
                Expand
              </button>
            )}
            {expanded && markdown && (
              <div className="border-t pt-4 overflow-y-auto max-h-96">
                <WikiArticle markdown={markdown} sourcePath={entryRefToRepoPath(current)} />
              </div>
            )}
          </div>
        )}
      </div>

      <div className="flex items-center gap-6 mt-8">
        <button type="button" disabled={index === 0} onClick={() => setIndex(i => i - 1)}
          className="inline-flex items-center gap-1.5 px-4 py-2 rounded-lg border text-sm font-medium hover:bg-accent disabled:opacity-40 disabled:cursor-not-allowed transition-colors">
          <ChevronLeft className="h-4 w-4" /> Previous
        </button>
        <button type="button" disabled={index === cards.length - 1} onClick={() => setIndex(i => i + 1)}
          className="inline-flex items-center gap-1.5 px-4 py-2 rounded-lg border text-sm font-medium hover:bg-accent disabled:opacity-40 disabled:cursor-not-allowed transition-colors">
          Next <ChevronRight className="h-4 w-4" />
        </button>
      </div>
    </div>
  )
}

function SortableCard({
  card,
  isSelected,
  masteryState,
  onToggleSelect,
  onOpen,
  onRemove,
  isFlashing,
}: {
  card: FlashCard
  isSelected: boolean
  masteryState: MasteryState
  onToggleSelect: (name: string) => void
  onOpen: () => void
  onRemove: (name: string) => void
  isFlashing: boolean
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
      className={`group relative rounded-xl border bg-card text-card-foreground flex flex-col min-h-[148px] cursor-grab active:cursor-grabbing hover:shadow-md transition-shadow select-none${isFlashing ? ' flashcard-highlight' : ''}`}
    >
      {/* Top row: checkbox + delete */}
      <div className="flex items-center justify-between px-3 pt-3">
        <button
          type="button"
          aria-label={isSelected ? `Deselect ${card.name}` : `Select ${card.name}`}
          onPointerDown={e => e.stopPropagation()}
          onClick={e => { e.stopPropagation(); onToggleSelect(card.name) }}
          className="flex items-center justify-center text-muted-foreground hover:text-foreground transition-colors"
        >
          <div className={`w-6 h-6 rounded-full border-2 flex items-center justify-center transition-colors ${
            isSelected ? 'bg-primary border-primary' : 'border-muted-foreground/40 group-hover:border-muted-foreground/70'
          }`}>
            {isSelected && (
              <svg className="w-3.5 h-3.5 text-primary-foreground" viewBox="0 0 10 10" fill="none">
                <path d="M1.5 5L4 7.5L8.5 2.5" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            )}
          </div>
        </button>
        <button
          type="button"
          onPointerDown={e => e.stopPropagation()}
          onClick={e => { e.stopPropagation(); onRemove(card.name) }}
          aria-label={`Remove ${card.name}`}
          className="text-muted-foreground hover:text-destructive transition-colors opacity-0 group-hover:opacity-100 focus:opacity-100"
        >
          <Trash2 className="h-3.5 w-3.5" />
        </button>
      </div>

      {/* Name — click to open popup */}
      <button
        type="button"
        onPointerDown={e => e.stopPropagation()}
        onClick={e => { e.stopPropagation(); onOpen() }}
        className="flex-1 flex items-center justify-center px-3 py-2 text-center hover:text-primary transition-colors"
      >
        <span className="font-semibold text-sm leading-snug">{card.name}</span>
      </button>

      {/* Mastery pill */}
      <div className="flex justify-center pb-3">
        <MasteryPill state={masteryState} />
      </div>
    </div>
  )
}

function TodayStudyPlanSection() {
  const { syllabi } = useWikiSyllabus()
  const { records: masteryRecords, loading: masteryLoading } = useConceptMastery()
  const { progress: examProgress, targetDates } = useExamProgress()
  const { addCard, hasCard } = useFlashcards()
  const [collapsed, setCollapsed] = useState(false)
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
    for (const name of toAdd) {
      addCard({ kind: 'concept', name })
    }
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
        <button
          type="button"
          onClick={() => setCollapsed(v => !v)}
          className="text-muted-foreground hover:text-foreground p-1 transition-colors"
          aria-label={collapsed ? 'Expand study plan' : 'Collapse study plan'}
        >
          <ChevronsUpDown className="h-4 w-4" />
        </button>
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

// Scroll el to the center of the area above the concept popup (if open).
function scrollCardIntoView(el: HTMLElement, popupOpen: boolean) {
  const rect = el.getBoundingClientRect()
  const popupHeight = popupOpen
    ? (parseFloat(
        getComputedStyle(document.documentElement).getPropertyValue('--concept-split-height')
      ) || window.innerHeight * 0.5)
    : 0
  const visibleHeight = window.innerHeight - popupHeight
  // Use scrollBy (relative delta) to avoid reading window.scrollY, which can
  // be out of sync with getBoundingClientRect during an in-progress smooth scroll.
  const idealTop = visibleHeight / 2 - rect.height / 2
  window.scrollBy({ top: rect.top - idealTop, behavior: 'smooth' })
}

export default function Flashcards() {
  const { cards, removeCard, customOrder, setCustomOrder } = useFlashcards()
  const { syllabi } = useWikiSyllabus()
  const { records: masteryRecords } = useConceptMastery()
  const openAt = useConceptPopup(s => s.openAt)
  const popupOpen = useConceptPopup(s => s.open)
  const popupCurrentName = useConceptPopup(s => s.open ? (s.list[s.index]?.name ?? null) : null)
  const [searchParams, setSearchParams] = useSearchParams()
  const highlightName = searchParams.get('highlight')
  const [flashingCard, setFlashingCard] = useState<string | null>(null)
  const flashTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null)
  // Always-current snapshot of orderedCards for use inside timer closures.
  const orderedCardsRef = useRef<FlashCard[]>([])
  // Track previous popup concept so we only flash on actual navigation changes.
  const prevPopupNameRef = useRef<string | null>(null)

  const [studying, setStudying] = useState(false)
  const [studyCards, setStudyCards] = useState<WikiEntryRef[]>([])
  const [groupBy, setGroupBy] = useState<GroupBy>('exam')
  const [selectedNames, setSelectedNames] = useState<Set<string>>(new Set())

  const sensors = useSensors(
    useSensor(MouseSensor, { activationConstraint: { distance: 5 } }),
    useSensor(TouchSensor, { activationConstraint: { delay: 250, tolerance: 5 } }),
  )

  // Scroll to and flash a card when arriving via the "view" link in the popup menu,
  // then open the concept popup after the flash animation completes.
  useEffect(() => {
    if (!highlightName) return
    const timerId = setTimeout(() => {
      const all = document.querySelectorAll('[data-card-name]')
      const el = Array.from(all).find(
        el => el.getAttribute('data-card-name')?.toLowerCase() === highlightName.toLowerCase()
      ) as HTMLElement | null
      if (!el) return
      scrollCardIntoView(el, false)
      setFlashingCard(highlightName)
      if (flashTimerRef.current) clearTimeout(flashTimerRef.current)
      flashTimerRef.current = setTimeout(() => {
        setFlashingCard(null)
        setSearchParams(prev => {
          const next = new URLSearchParams(prev)
          next.delete('highlight')
          return next
        }, { replace: true })
        // Open popup after flash so it doesn't cover the animation.
        const latest = orderedCardsRef.current
        const idx = latest.findIndex(c => c.name.toLowerCase() === highlightName.toLowerCase())
        openAt(
          idx >= 0 ? latest : [{ kind: 'concept', name: highlightName }],
          idx >= 0 ? idx : 0,
        )
      }, 1700)
    }, 200)
    return () => clearTimeout(timerId)
  }, [highlightName])

  // Reset the tracked name when the popup closes so the next open always flashes.
  useEffect(() => {
    if (!popupOpen) prevPopupNameRef.current = null
  }, [popupOpen])

  // Flash and scroll the grid card whenever the popup navigates to a new concept.
  useEffect(() => {
    if (!popupCurrentName || popupCurrentName === prevPopupNameRef.current) return
    prevPopupNameRef.current = popupCurrentName
    const all = document.querySelectorAll('[data-card-name]')
    const el = Array.from(all).find(
      el => el.getAttribute('data-card-name')?.toLowerCase() === popupCurrentName.toLowerCase()
    ) as HTMLElement | null
    if (!el) return
    scrollCardIntoView(el, popupOpen)
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

  // concept name → best mastery state (most recently attempted across exams)
  const conceptMasteryMap = useMemo(() => {
    const map = new Map<string, MasteryState>()
    const now = new Date()
    // Keep the most recently attempted record per concept slug
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

  // Sync customOrder when new cards are added (append missing names)
  useEffect(() => {
    const inOrder = new Set(customOrder.map(n => n.toLowerCase()))
    const missing = cards.filter(c => !inOrder.has(c.name.toLowerCase())).map(c => c.name)
    if (missing.length > 0) setCustomOrder([...customOrder, ...missing])
  }, [cards, customOrder, setCustomOrder])

  // Compute display-ordered flat list
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

  // Keep ref in sync so timer closures always see the latest orderedCards.
  orderedCardsRef.current = orderedCards

  // Exam groups derived from orderedCards order (preserves group sort order)
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

  function toggleSelect(name: string) {
    setSelectedNames(prev => {
      const next = new Set(prev)
      if (next.has(name)) next.delete(name); else next.add(name)
      return next
    })
  }

  function handleStudy() {
    const targets = selectedNames.size > 0
      ? orderedCards.filter(c => selectedNames.has(c.name))
      : orderedCards
    setStudyCards(targets)
    setStudying(true)
  }

  function handleDragEnd(event: DragEndEvent) {
    const { active, over } = event
    if (!over || active.id === over.id) return
    const oldIdx = orderedCards.findIndex(c => c.name === active.id)
    const newIdx = orderedCards.findIndex(c => c.name === over.id)
    if (oldIdx === -1 || newIdx === -1) return
    const reordered = arrayMove(orderedCards, oldIdx, newIdx)
    setCustomOrder(reordered.map(c => c.name))
    setGroupBy('custom')
  }

  if (studying && studyCards.length > 0) {
    return (
      <>
        <FlashcardStudy cards={studyCards} onDone={() => setStudying(false)} />
        <ConceptPopup />
      </>
    )
  }

  const allSelected = cards.length > 0 && selectedNames.size === cards.length
  const groupLabels: { key: GroupBy; label: string }[] = [
    { key: 'exam', label: 'Group by Exam' },
    { key: 'date', label: 'Date Added' },
    { key: 'alpha', label: 'Alphabetical' },
    { key: 'custom', label: 'Custom' },
  ]

  function renderCard(card: FlashCard) {
    return (
      <SortableCard
        key={card.name}
        card={card}
        isSelected={selectedNames.has(card.name)}
        masteryState={conceptMasteryMap.get(card.name.toLowerCase()) ?? 'new'}
        onToggleSelect={toggleSelect}
        onOpen={() => openAt(orderedCards, orderedCards.findIndex(c => c.name === card.name))}
        onRemove={removeCard}
        isFlashing={flashingCard?.toLowerCase() === card.name.toLowerCase()}
      />
    )
  }

  return (
    <>
      <div
        className="container max-w-5xl mx-auto px-4 py-8 space-y-6"
        style={popupOpen ? { paddingBottom: 'calc(var(--concept-split-height, 50vh) + 1.5rem)' } : undefined}
      >
        {/* Sticky Header */}
        <div className="sticky top-14 lg:top-0 z-10 bg-background border-b -mx-4 px-4 py-3 flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold">Flashcards</h1>
            <p className="text-sm text-muted-foreground mt-1">
              {cards.length === 0
                ? 'No flashcards yet.'
                : `${cards.length} concept${cards.length === 1 ? '' : 's'} saved`}
            </p>
          </div>
          <button
            type="button"
            disabled={cards.length === 0}
            onClick={handleStudy}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-primary text-primary-foreground text-sm font-medium hover:bg-primary/90 disabled:opacity-40 disabled:cursor-not-allowed transition-colors shrink-0"
          >
            {selectedNames.size > 0 ? `Study Selected (${selectedNames.size})` : 'Study'}
          </button>
        </div>

        {/* Today's Study Plan — always shown */}
        <TodayStudyPlanSection />

        {cards.length === 0 ? (
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
        ) : (
          <>
            {/* Controls */}
            <div className="flex flex-wrap items-center justify-between gap-3">
              <div className="flex items-center gap-1 p-1 rounded-lg bg-muted/50 border">
                {groupLabels.map(({ key, label }) => (
                  <button
                    key={key}
                    type="button"
                    onClick={() => setGroupBy(key)}
                    className={`px-3 py-1.5 rounded-md text-xs font-medium transition-colors ${
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
                onClick={() => allSelected ? setSelectedNames(new Set()) : setSelectedNames(new Set(cards.map(c => c.name)))}
                className="text-xs text-muted-foreground hover:text-foreground transition-colors"
              >
                {allSelected ? 'Deselect all' : 'Select all'}
              </button>
            </div>

            {/* Cards — always wrapped in DnD context */}
            <DndContext sensors={sensors} collisionDetection={closestCenter} onDragEnd={handleDragEnd}>
              <SortableContext items={orderedCards.map(c => c.name)} strategy={rectSortingStrategy}>
                {groupBy === 'exam' ? (
                  <div className="space-y-8">
                    {examGroups.length === 0 ? (
                      // Syllabi loading — show flat grid
                      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
                        {orderedCards.map(renderCard)}
                      </div>
                    ) : (
                      examGroups.map(({ label, cards: groupCards }) => (
                        <div key={label} className="space-y-3">
                          <h2 className="text-xs font-semibold text-muted-foreground uppercase tracking-wider">
                            {label}
                          </h2>
                          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
                            {groupCards.map(renderCard)}
                          </div>
                        </div>
                      ))
                    )}
                  </div>
                ) : (
                  <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
                    {orderedCards.map(renderCard)}
                  </div>
                )}
              </SortableContext>
            </DndContext>
          </>
        )}
      </div>
      <ConceptPopup />
    </>
  )
}
