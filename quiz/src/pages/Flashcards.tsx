import { useEffect, useMemo, useState } from 'react'
import { Link } from 'react-router-dom'
import ReactMarkdown from 'react-markdown'
import remarkGfm from 'remark-gfm'
import remarkMath from 'remark-math'
import rehypeKatex from 'rehype-katex'
import {
  BookOpen,
  ChevronLeft,
  ChevronRight,
  GripVertical,
  Loader2,
  Trash2,
  X,
} from 'lucide-react'
import {
  DndContext,
  closestCenter,
  PointerSensor,
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
import { useConceptPopup } from '@/hooks/useConceptPopup'
import { fetchWikiFile } from '@/lib/github'
import { entryRefToRepoPath } from '@/lib/wikiRoutes'
import type { WikiEntryRef } from '@/lib/wikiRoutes'
import { WikiArticle } from '@/components/wiki/WikiArticle'
import { ConceptPopup } from '@/components/wiki/ConceptPopup'

type GroupBy = 'exam' | 'date' | 'alpha' | 'custom'

function extractFirstBullet(markdown: string): string {
  const lines = markdown.split('\n')
  let result = ''
  let inBullet = false
  for (const line of lines) {
    if (!inBullet) {
      const match = line.match(/^[-*]\s+(.+)/)
      if (match) {
        result = match[1]
        inBullet = true
      }
    } else {
      if (/^[ \t]{2,}\S/.test(line)) {
        result += ' ' + line.trim()
      } else {
        break
      }
    }
  }
  if (!result) {
    result = lines.find(l => { const t = l.trim(); return t && !t.startsWith('#') })?.trim() ?? ''
  }
  return result
}

function FlashcardStudy({ cards, onDone }: { cards: WikiEntryRef[]; onDone: () => void }) {
  const [index, setIndex] = useState(0)
  const [flipped, setFlipped] = useState(false)
  const [expanded, setExpanded] = useState(false)
  const [markdown, setMarkdown] = useState<string | null>(null)
  const [loadStatus, setLoadStatus] = useState<'idle' | 'loading' | 'error'>('idle')

  const current = cards[index]

  useEffect(() => {
    setFlipped(false)
    setExpanded(false)
    setMarkdown(null)
    setLoadStatus('idle')
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
      setFlipped(false)
      setExpanded(false)
    }
  }

  const definition = markdown ? extractFirstBullet(markdown) : null

  return (
    <div className="flex flex-col items-center min-h-screen bg-background px-4 py-8">
      <div className="w-full max-w-xl flex items-center justify-between mb-8">
        <span className="text-sm text-muted-foreground">
          {index + 1} / {cards.length}
        </span>
        <button
          type="button"
          onClick={onDone}
          className="inline-flex items-center gap-1.5 text-sm text-muted-foreground hover:text-foreground transition-colors"
        >
          <X className="h-4 w-4" /> Done
        </button>
      </div>

      <div
        className="w-full max-w-xl min-h-56 rounded-2xl border bg-card text-card-foreground shadow-xl flex flex-col cursor-pointer select-none transition-all"
        onClick={handleFlip}
        role="button"
        tabIndex={0}
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
            {loadStatus === 'error' && (
              <p className="text-sm text-destructive">Couldn't load content.</p>
            )}
            {definition && (
              <div className="text-base leading-relaxed prose dark:prose-invert prose-sm max-w-none">
                <ReactMarkdown remarkPlugins={[remarkGfm, remarkMath]} rehypePlugins={[rehypeKatex]}>
                  {definition}
                </ReactMarkdown>
              </div>
            )}
            {!expanded && markdown && (
              <button
                type="button"
                onClick={() => setExpanded(true)}
                className="self-start text-xs text-primary hover:underline mt-1"
              >
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
        <button
          type="button"
          disabled={index === 0}
          onClick={() => setIndex(i => i - 1)}
          className="inline-flex items-center gap-1.5 px-4 py-2 rounded-lg border text-sm font-medium hover:bg-accent disabled:opacity-40 disabled:cursor-not-allowed transition-colors"
        >
          <ChevronLeft className="h-4 w-4" /> Previous
        </button>
        <button
          type="button"
          disabled={index === cards.length - 1}
          onClick={() => setIndex(i => i + 1)}
          className="inline-flex items-center gap-1.5 px-4 py-2 rounded-lg border text-sm font-medium hover:bg-accent disabled:opacity-40 disabled:cursor-not-allowed transition-colors"
        >
          Next <ChevronRight className="h-4 w-4" />
        </button>
      </div>
    </div>
  )
}

function SortableCard({
  card,
  index,
  isSelected,
  isDraggable,
  onToggleSelect,
  onOpen,
  onRemove,
}: {
  card: FlashCard
  index: number
  isSelected: boolean
  isDraggable: boolean
  onToggleSelect: (name: string) => void
  onOpen: (index: number) => void
  onRemove: (name: string) => void
}) {
  const { attributes, listeners, setNodeRef, transform, transition, isDragging } = useSortable({
    id: card.name,
    disabled: !isDraggable,
  })

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
    opacity: isDragging ? 0.5 : 1,
    zIndex: isDragging ? 50 : undefined,
  }

  return (
    <div
      ref={setNodeRef}
      style={style}
      className="group relative rounded-xl border bg-card text-card-foreground flex items-center gap-2 hover:shadow-md transition-shadow"
    >
      {/* Checkbox */}
      <button
        type="button"
        aria-label={isSelected ? `Deselect ${card.name}` : `Select ${card.name}`}
        onClick={e => { e.stopPropagation(); onToggleSelect(card.name) }}
        className="shrink-0 flex items-center justify-center w-10 h-full pl-3 py-5 text-muted-foreground hover:text-foreground transition-colors"
      >
        <div
          className={`w-4 h-4 rounded border-2 flex items-center justify-center transition-colors ${
            isSelected
              ? 'bg-primary border-primary'
              : 'border-muted-foreground/50 group-hover:border-muted-foreground'
          }`}
        >
          {isSelected && (
            <svg className="w-2.5 h-2.5 text-primary-foreground" viewBox="0 0 10 10" fill="none">
              <path d="M1.5 5L4 7.5L8.5 2.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          )}
        </div>
      </button>

      {/* Card name — click to open popup */}
      <button
        type="button"
        className="flex-1 min-w-0 py-5 text-left"
        onClick={() => onOpen(index)}
      >
        <span className="font-medium text-sm leading-snug truncate block">{card.name}</span>
      </button>

      {/* Drag handle (custom mode only) */}
      {isDraggable && (
        <button
          type="button"
          className="shrink-0 flex items-center justify-center px-2 py-5 text-muted-foreground/40 hover:text-muted-foreground cursor-grab active:cursor-grabbing touch-none"
          aria-label="Drag to reorder"
          {...listeners}
          {...attributes}
        >
          <GripVertical className="h-4 w-4" />
        </button>
      )}

      {/* Delete */}
      <button
        type="button"
        onClick={e => { e.stopPropagation(); onRemove(card.name) }}
        aria-label={`Remove ${card.name}`}
        className="shrink-0 flex items-center justify-center px-3 py-5 text-muted-foreground hover:text-destructive transition-colors opacity-0 group-hover:opacity-100 focus:opacity-100"
      >
        <Trash2 className="h-4 w-4" />
      </button>
    </div>
  )
}

export default function Flashcards() {
  const { cards, removeCard, customOrder, setCustomOrder } = useFlashcards()
  const { syllabi } = useWikiSyllabus()
  const openAt = useConceptPopup(s => s.openAt)
  const popupOpen = useConceptPopup(s => s.open)

  const [studying, setStudying] = useState(false)
  const [studyCards, setStudyCards] = useState<WikiEntryRef[]>([])
  const [groupBy, setGroupBy] = useState<GroupBy>('exam')
  const [selectedNames, setSelectedNames] = useState<Set<string>>(new Set())

  const sensors = useSensors(useSensor(PointerSensor, { activationConstraint: { distance: 5 } }))

  // Build concept → exam label map from syllabi
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

  // Sync customOrder when cards change (ensure all cards are present in custom order)
  useEffect(() => {
    const cardNames = cards.map(c => c.name)
    const inOrder = new Set(customOrder.map(n => n.toLowerCase()))
    const missing = cardNames.filter(n => !inOrder.has(n.toLowerCase()))
    if (missing.length > 0) {
      setCustomOrder([...customOrder, ...missing])
    }
  }, [cards, customOrder, setCustomOrder])

  // Compute ordered cards for the current groupBy
  const orderedCards = useMemo((): FlashCard[] => {
    if (groupBy === 'date') {
      return [...cards].sort((a, b) => b.addedAt - a.addedAt)
    }
    if (groupBy === 'alpha') {
      return [...cards].sort((a, b) => a.name.localeCompare(b.name))
    }
    if (groupBy === 'custom') {
      const nameToCard = new Map(cards.map(c => [c.name.toLowerCase(), c]))
      const ordered: FlashCard[] = []
      for (const name of customOrder) {
        const card = nameToCard.get(name.toLowerCase())
        if (card) ordered.push(card)
      }
      // append any not yet in customOrder
      for (const card of cards) {
        if (!ordered.some(c => c.name.toLowerCase() === card.name.toLowerCase())) {
          ordered.push(card)
        }
      }
      return ordered
    }
    // 'exam' — grouped, but we still return a flat list for single-card indexing
    return [...cards].sort((a, b) => a.name.localeCompare(b.name))
  }, [cards, customOrder, groupBy])

  // Group cards by exam for 'exam' mode
  const examGroups = useMemo((): { label: string; cards: FlashCard[] }[] => {
    if (groupBy !== 'exam') return []
    const groups = new Map<string, FlashCard[]>()
    for (const card of orderedCards) {
      const label = conceptToExam.get(card.name.toLowerCase()) ?? 'Other'
      if (!groups.has(label)) groups.set(label, [])
      groups.get(label)!.push(card)
    }
    // Sort groups: known exams first (alphabetical), then "Other"
    const sorted = [...groups.entries()].sort(([a], [b]) => {
      if (a === 'Other') return 1
      if (b === 'Other') return -1
      return a.localeCompare(b)
    })
    return sorted.map(([label, groupCards]) => ({ label, cards: groupCards }))
  }, [groupBy, orderedCards, conceptToExam])

  function toggleSelect(name: string) {
    setSelectedNames(prev => {
      const next = new Set(prev)
      if (next.has(name)) next.delete(name)
      else next.add(name)
      return next
    })
  }

  function selectAll() {
    setSelectedNames(new Set(cards.map(c => c.name)))
  }

  function deselectAll() {
    setSelectedNames(new Set())
  }

  function openCard(card: FlashCard) {
    openAt(orderedCards, orderedCards.findIndex(c => c.name === card.name))
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
    const oldIndex = orderedCards.findIndex(c => c.name === active.id)
    const newIndex = orderedCards.findIndex(c => c.name === over.id)
    if (oldIndex === -1 || newIndex === -1) return
    const reordered = arrayMove(orderedCards, oldIndex, newIndex)
    setCustomOrder(reordered.map(c => c.name))
  }

  if (studying && studyCards.length > 0) {
    return (
      <>
        <FlashcardStudy cards={studyCards} onDone={() => setStudying(false)} />
        <ConceptPopup />
      </>
    )
  }

  const groupLabels: { key: GroupBy; label: string }[] = [
    { key: 'exam', label: 'Group by Exam' },
    { key: 'date', label: 'Date Added' },
    { key: 'alpha', label: 'Alphabetical' },
    { key: 'custom', label: 'Custom' },
  ]

  const allSelected = cards.length > 0 && selectedNames.size === cards.length

  return (
    <>
      <div
        className="container max-w-3xl mx-auto px-4 py-8 space-y-6"
        style={popupOpen ? { paddingBottom: 'calc(var(--concept-split-height, 50vh) + 1.5rem)' } : undefined}
      >
        {/* Header */}
        <div className="flex items-center justify-between">
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
            className="inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-primary text-primary-foreground text-sm font-medium hover:bg-primary/90 disabled:opacity-40 disabled:cursor-not-allowed transition-colors"
          >
            {selectedNames.size > 0 ? `Study Selected (${selectedNames.size})` : 'Study'}
          </button>
        </div>

        {cards.length === 0 ? (
          <div className="rounded-xl border bg-card text-card-foreground p-12 text-center space-y-3">
            <BookOpen className="h-10 w-10 mx-auto text-muted-foreground/50" />
            <p className="text-sm text-muted-foreground">
              Open a concept in the Study Guide, click the{' '}
              <span className="font-medium">▷ Play</span> button, and choose{' '}
              <span className="font-medium">Add to Flashcards</span>.
            </p>
            <Link
              to="/wiki"
              className="inline-flex items-center gap-1.5 text-sm text-primary hover:underline"
            >
              <BookOpen className="h-4 w-4" /> Go to Study Guides
            </Link>
          </div>
        ) : (
          <>
            {/* Grouping selector + select all */}
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
                onClick={allSelected ? deselectAll : selectAll}
                className="text-xs text-muted-foreground hover:text-foreground transition-colors"
              >
                {allSelected ? 'Deselect all' : 'Select all'}
              </button>
            </div>

            {/* Custom mode hint */}
            {groupBy === 'custom' && (
              <p className="text-xs text-muted-foreground -mt-2">
                Drag the <GripVertical className="inline h-3 w-3" /> handle to reorder. Order saves automatically.
              </p>
            )}

            {/* Card list */}
            {groupBy === 'exam' ? (
              <div className="space-y-6">
                {examGroups.length === 0 && syllabi.length === 0 ? (
                  // Syllabi still loading
                  <div className="flex flex-col gap-3">
                    {orderedCards.map((card, i) => (
                      <SortableCard
                        key={card.name}
                        card={card}
                        index={i}
                        isSelected={selectedNames.has(card.name)}
                        isDraggable={false}
                        onToggleSelect={toggleSelect}
                        onOpen={() => openCard(card)}
                        onRemove={removeCard}
                      />
                    ))}
                  </div>
                ) : (
                  examGroups.map(({ label, cards: groupCards }) => (
                    <div key={label} className="space-y-2">
                      <h2 className="text-xs font-semibold text-muted-foreground uppercase tracking-wider px-1">
                        {label}
                      </h2>
                      <div className="flex flex-col gap-2">
                        {groupCards.map((card) => (
                          <SortableCard
                            key={card.name}
                            card={card}
                            index={orderedCards.findIndex(c => c.name === card.name)}
                            isSelected={selectedNames.has(card.name)}
                            isDraggable={false}
                            onToggleSelect={toggleSelect}
                            onOpen={() => openCard(card)}
                            onRemove={removeCard}
                          />
                        ))}
                      </div>
                    </div>
                  ))
                )}
              </div>
            ) : groupBy === 'custom' ? (
              <DndContext sensors={sensors} collisionDetection={closestCenter} onDragEnd={handleDragEnd}>
                <SortableContext items={orderedCards.map(c => c.name)} strategy={rectSortingStrategy}>
                  <div className="flex flex-col gap-2">
                    {orderedCards.map((card, i) => (
                      <SortableCard
                        key={card.name}
                        card={card}
                        index={i}
                        isSelected={selectedNames.has(card.name)}
                        isDraggable={true}
                        onToggleSelect={toggleSelect}
                        onOpen={() => openCard(card)}
                        onRemove={removeCard}
                      />
                    ))}
                  </div>
                </SortableContext>
              </DndContext>
            ) : (
              <div className="flex flex-col gap-2">
                {orderedCards.map((card, i) => (
                  <SortableCard
                    key={card.name}
                    card={card}
                    index={i}
                    isSelected={selectedNames.has(card.name)}
                    isDraggable={false}
                    onToggleSelect={toggleSelect}
                    onOpen={() => openCard(card)}
                    onRemove={removeCard}
                  />
                ))}
              </div>
            )}
          </>
        )}
      </div>
      <ConceptPopup />
    </>
  )
}
