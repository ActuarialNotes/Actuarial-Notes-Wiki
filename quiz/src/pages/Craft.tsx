import { useCallback, useEffect, useMemo, useRef, useState, type ReactNode } from 'react'
import { Navigate, useNavigate, useParams } from 'react-router-dom'
import {
  Check,
  ChevronLeft,
  Maximize,
  MoreHorizontal,
  RotateCcw,
  Wand2,
  ZoomIn,
  ZoomOut,
} from 'lucide-react'
import wikiBundle from 'virtual:wiki-content'
import { CraftBoard, type BoardCommands, type DropVerdict } from '@/components/craft/CraftBoard'
import { CraftConnection } from '@/components/craft/CraftConnection'
import { CraftDeck } from '@/components/craft/CraftDeck'
import { CraftLogo } from '@/components/craft/CraftLogo'
import { ConceptTileStatic } from '@/components/ConceptTile'
import { ConceptPopup } from '@/components/wiki/ConceptPopup'
import { CheckMark } from '@/components/CheckMark'
import { ExamLogo } from '@/components/ExamLogo'
import { MobileNavButton } from '@/components/MobileNavButton'
import { ListPanel, ListRow } from '@/components/ui/ListPanel'
import { useAllQuestions } from '@/hooks/useAllQuestions'
import { boardFor, progressOf, useConceptCraft, type StrengthFilter } from '@/hooks/useConceptCraft'
import { useConceptLevels } from '@/hooks/useConceptLevels'
import { useConceptPopup } from '@/hooks/useConceptPopup'
import { useIsMobile } from '@/hooks/useIsMobile'
import { usePageHead } from '@/hooks/usePageHead'
import { useSoundEffects } from '@/hooks/useSoundEffects'
import {
  boardState,
  combine,
  craftTopics,
  practiceQuestions,
  seedConcepts,
  topicGraph,
  topicTally,
  withConnection,
  type CraftProgress,
  type CraftTopic,
  type TopicTally,
} from '@/lib/conceptCraft'
import { STRENGTH_TIERS, type ConceptGraph, type Connection, type GraphQuestion } from '@/lib/conceptGraph'
import { examAccentStyle } from '@/lib/examColors'
import { setWikiContentLookup } from '@/lib/github'
import { filterQuestions } from '@/lib/parser'
import { setWikiIndexBundle } from '@/lib/wikiIndex'
import { examDisplayName } from '@/lib/wikiRoutes'
import { trackCraftCombined, trackCraftTopicCompleted } from '@/lib/analytics'
import { cn } from '@/lib/utils'

// The board reads concept pages — the graph is built from them, and the reader
// it opens shows them — and must not depend on the network to do it: install
// the wiki bundle's lookup, as Cowork does (lib/coworkContent.ts) for the same
// reason. Idempotent.
setWikiContentLookup((path: string) => wikiBundle.files[path])
setWikiIndexBundle(wikiBundle.index)

// ─── The vault, as the game reads it ─────────────────────────────────────────

const CONCEPT_PAGES = new Map(
  wikiBundle.index.filter(item => item.category === 'concept').map(item => [item.name.toLowerCase(), item] as const),
)
const conceptPageName = (name: string) => CONCEPT_PAGES.get(name.toLowerCase())?.name
const conceptMarkdown = (name: string) => {
  const item = CONCEPT_PAGES.get(name.toLowerCase())
  return item ? wikiBundle.files[item.path] : undefined
}

let topicsRead: CraftTopic[] | null = null
/** Every topic the vault makes a board of, read once from the bundled exam pages. */
function allTopics(): CraftTopic[] {
  if (!topicsRead) {
    const examPages = Object.fromEntries(Object.entries(wikiBundle.files).filter(([path]) => /^Exam\b[^/]*\.md$/i.test(path)))
    topicsRead = craftTopics(examPages, conceptPageName)
  }
  return topicsRead
}

/**
 * A topic's graph and seeds, built once a visit: both are read off the bundled
 * vault and the quiz pool, neither of which changes while the app is open, and
 * the largest topic takes a tenth of a second or so to read.
 */
const prepared = new Map<string, { graph: ConceptGraph; seeds: string[] }>()
function prepare(topic: CraftTopic, pool: readonly GraphQuestion[]) {
  let entry = prepared.get(topic.id)
  if (!entry) {
    const graph = topicGraph(topic, conceptMarkdown, pool)
    entry = { graph, seeds: seedConcepts(graph) }
    prepared.set(topic.id, entry)
  }
  return entry
}

const MIN_STRENGTH_SHOWN: Record<StrengthFilter, number> = {
  all: 0,
  moderate: STRENGTH_TIERS.moderate,
  strong: STRENGTH_TIERS.strong,
}

/**
 * **Concept Craft** (docs/concept-craft.md) — `/craft` is the topic picker,
 * `/craft/:topicId` one topic's board. Opened from the Quiz tab, beside Quiz
 * Battle: a way of studying a syllabus by crafting it out of a few of its
 * concepts, finding how they connect.
 */
export default function Craft() {
  const { topicId } = useParams()
  if (!topicId) return <CraftPicker />
  const topic = allTopics().find(t => t.id === topicId)
  if (!topic) return <Navigate to="/craft" replace />
  return <CraftScreen key={topic.id} topic={topic} />
}

/** "Exam P", "Exam MAS-I", "Exam 5" — a topic's exam, as the ladder names it. */
function examName(topic: CraftTopic): string {
  return examDisplayName(topic.examPage).replace(/-\d+$/, '')
}

function PageTitle({ onBack, children }: { onBack: () => void; children: ReactNode }) {
  return (
    <div className="flex items-center gap-2">
      <button
        type="button"
        onClick={onBack}
        aria-label="Back to the Quiz tab"
        title="Quiz"
        className="-ml-1.5 shrink-0 rounded-md p-1.5 text-muted-foreground transition-colors hover:bg-accent hover:text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
      >
        <ChevronLeft className="h-4 w-4" />
      </button>
      <h1 className="min-w-0 flex-1 truncate text-2xl font-bold tracking-tight">{children}</h1>
    </div>
  )
}

// ─── The topic picker ────────────────────────────────────────────────────────

function CraftPicker() {
  const navigate = useNavigate()
  const boards = useConceptCraft(s => s.boards)

  // Topics come in ladder order; group them by exam, keeping it.
  const groups = useMemo(() => {
    const out: { exam: string; name: string; topics: CraftTopic[] }[] = []
    for (const t of allTopics()) {
      const last = out[out.length - 1]
      if (last && last.name === examName(t)) last.topics.push(t)
      else out.push({ exam: t.exam, name: examName(t), topics: [t] })
    }
    return out
  }, [])

  return (
    <div className="mx-auto w-full max-w-4xl space-y-6 px-4 py-8 sm:px-6">
      <PageTitle onBack={() => navigate('/')}>Concept Craft</PageTitle>
      <div className="flex items-center gap-3 rounded-xl bg-card p-5">
        <CraftLogo size="lg" />
        <p className="text-sm text-muted-foreground">
          <span className="font-medium text-foreground">Craft a topic out of a few of its concepts.</span>{' '}
          Drop one concept on another: where the notes connect them, a line joins them with its strength, and
          what lies between them appears.
        </p>
      </div>
      {groups.map(group => (
        <section key={group.name} className="space-y-2">
          <p className="px-1 text-xs font-semibold uppercase tracking-wider text-muted-foreground">{group.name}</p>
          <ListPanel>
            {group.topics.map(t => {
              const board = boardFor(boards, t.id)
              const found = board.found.length
              return (
                <ListRow
                  key={t.id}
                  to={`/craft/${t.id}`}
                  leading={<ExamLogo examKey={t.exam} size="lg" />}
                  title={t.title}
                  subtitle={t.weight ? `${t.weight} of the exam` : undefined}
                  meta={
                    <>
                      <span>{t.concepts.length} concepts</span>
                      {found > 0 && (
                        <>
                          <span aria-hidden>·</span>
                          <span>{found} {found === 1 ? 'connection' : 'connections'} found</span>
                        </>
                      )}
                    </>
                  }
                  data-testid="craft-topic"
                />
              )
            })}
          </ListPanel>
        </section>
      ))}
    </div>
  )
}

// ─── One topic's board ───────────────────────────────────────────────────────

function CraftScreen({ topic }: { topic: CraftTopic }) {
  const { questions, loading } = useAllQuestions()

  // The quiz pool: what a quiz can serve, which is also what the graph counts
  // and what a connection's Practice draws from.
  const pool = useMemo(
    () => (loading ? null : filterQuestions(questions, {}).map(q => ({ id: q.id, links: q.wiki_link }))),
    [questions, loading],
  )
  const ready = useMemo(() => (pool ? prepare(topic, pool) : null), [topic, pool])

  const head = useMemo(() => ({
    title: `${topic.title} — Concept Craft | Actuarial Notes`,
    description: `${examName(topic)}: craft ${topic.title.toLowerCase()} out of a few of its concepts.`,
    noindex: true,
  }), [topic])
  usePageHead(head)

  // The reader this board opens is the app's one popup; leaving the board
  // leaves it closed.
  useEffect(() => () => useConceptPopup.getState().close(), [])

  return (
    // Always dark: the board is a canvas the concepts are laid out on
    // (docs/concept-craft.md). Scoped to the route like Actuaria's (style guide
    // §2.6) — the sidebar and anything portalled to the body keep the reader's
    // own theme. It wears the exam's colour (`examAccentStyle`) for what is new
    // and what is being looked at, and gives up the bottom of the screen to the
    // concept popup while that is open, so the board is never under it.
    <div
      className="dark relative flex flex-col overflow-hidden bg-background text-foreground"
      style={{ ...examAccentStyle(topic.exam), colorScheme: 'dark', height: 'calc(100dvh - var(--concept-split-height, 0px))' }}
    >
      {ready && pool ? (
        <CraftPlay topic={topic} graph={ready.graph} seeds={ready.seeds} pool={pool} />
      ) : (
        <>
          <BoardHeader topic={topic} tally={null} onMenu={null} />
          <div className="craft-floor flex min-h-0 flex-1 items-center justify-center" style={{ backgroundSize: '22px 22px' }}>
            <p className="rounded-full bg-card px-4 py-2 text-sm text-muted-foreground" role="status">Reading the notes…</p>
          </div>
        </>
      )}
      <ConceptPopup />
    </div>
  )
}

interface Ghost {
  name: string
  x: number
  y: number
  over: string | null
}

function CraftPlay({
  topic,
  graph,
  seeds,
  pool,
}: {
  topic: CraftTopic
  graph: ConceptGraph
  seeds: readonly string[]
  pool: readonly GraphQuestion[]
}) {
  const navigate = useNavigate()
  const isPhone = useIsMobile(1023)
  const { play, resetCombo } = useSoundEffects()
  const levels = useConceptLevels()

  const board = useConceptCraft(s => boardFor(s.boards, topic.id))
  const filter = useConceptCraft(s => s.filter)
  const setFilter = useConceptCraft(s => s.setFilter)
  const addConnection = useConceptCraft(s => s.addConnection)
  const savePositions = useConceptCraft(s => s.savePositions)
  const resetBoard = useConceptCraft(s => s.resetBoard)

  // Keyed on the list, not the board: saving where the cards settled must not
  // read as a move in the game.
  const progress = useMemo<CraftProgress>(() => progressOf(board), [board.found]) // eslint-disable-line react-hooks/exhaustive-deps
  const state = useMemo(() => boardState(graph, seeds, progress), [graph, seeds, progress])
  const tally = useMemo(() => topicTally(graph, state), [graph, state])

  const boardRef = useRef<BoardCommands>(null)
  const [held, setHeld] = useState<string | null>(null)
  const [ghost, setGhost] = useState<Ghost | null>(null)
  const [notice, setNotice] = useState<string | null>(null)
  const [announce, setAnnounce] = useState('')
  const [fresh, setFresh] = useState<{ made: string[]; connection: string | null }>({ made: [], connection: null })
  const [flash, setFlash] = useState<string | null>(null)
  const [openKey, setOpenKey] = useState<string | null>(null)
  const [menuOpen, setMenuOpen] = useState(false)

  // The concept the popup is showing, while it is open — lit on the board.
  const reading = useConceptPopup(s => {
    if (!s.open) return null
    const page = s.pages[s.pageIndex]
    return page && page.kind === 'concept' ? page.name : null
  })
  const popupOpen = useConceptPopup(s => s.open)

  // ── Transient feedback ───────────────────────────────────────────────────
  useEffect(() => {
    if (!notice) return
    const t = window.setTimeout(() => setNotice(null), 2400)
    return () => window.clearTimeout(t)
  }, [notice])
  useEffect(() => {
    if (!flash) return
    const t = window.setTimeout(() => setFlash(null), 1400)
    return () => window.clearTimeout(t)
  }, [flash])
  // The pops and the line drawing in are one-off; after them the board draws
  // the cards and the connection as it draws every other.
  useEffect(() => {
    if (fresh.made.length === 0 && !fresh.connection) return
    const t = window.setTimeout(() => setFresh({ made: [], connection: null }), 1200)
    return () => window.clearTimeout(t)
  }, [fresh])
  // What a find made lands off its pair; if that is at the edge of the view,
  // bring it into sight once it has landed.
  useEffect(() => {
    const first = fresh.made[0]
    if (!first) return
    const t = window.setTimeout(() => boardRef.current?.reveal(first), 450)
    return () => window.clearTimeout(t)
  }, [fresh.made])

  // ── Finding connections ──────────────────────────────────────────────────
  const commit = useCallback((connection: Connection, made: string[]) => {
    const after = boardState(graph, seeds, withConnection(progress, connection))
    addConnection(topic.id, connection)
    setFresh({ made, connection: connection.key })
    const completed = topicTally(graph, after).complete && !tally.complete
    if (completed) {
      play('complete')
      trackCraftTopicCompleted({ exam: topic.exam, topic: topic.id })
    } else {
      // A card landing is `collect`; a line alone, a right answer.
      play(made.length > 0 ? 'collect' : 'correct')
    }
    // No card, no toast: the map is the answer. Assistive tech is told what changed.
    setAnnounce(
      `Connected ${connection.a} and ${connection.b}, strength ${connection.strength}.`
      + (made.length > 0 ? ` New: ${made.join(', ')}.` : ''),
    )
    trackCraftCombined({ exam: topic.exam, topic: topic.id, outcome: 'new', strength: connection.strength, made: made.length })
  }, [graph, seeds, progress, addConnection, topic, tally.complete, play])

  const onCombine = useCallback((a: string, b: string): DropVerdict => {
    setHeld(null)
    if (a.toLowerCase() === b.toLowerCase()) return 'bounce'
    const outcome = combine(graph, state, a, b)
    if (outcome.kind === 'known') {
      setFlash(outcome.connection.key)
      trackCraftCombined({ exam: topic.exam, topic: topic.id, outcome: 'known', strength: outcome.connection.strength })
      return 'stay'
    }
    if (outcome.kind === 'none') {
      // Mistakes are silent (docs/sound-design.md); the card going back and
      // one line of text are the whole of it.
      resetCombo('correct')
      setNotice('No connection between these two')
      trackCraftCombined({ exam: topic.exam, topic: topic.id, outcome: 'none' })
      return 'bounce'
    }
    commit(outcome.connection, outcome.made)
    return 'stay'
  }, [graph, state, topic, commit, resetCombo])

  // ── The deck's hands ─────────────────────────────────────────────────────
  const tapDeck = useCallback((name: string) => {
    if (held && held.toLowerCase() === name.toLowerCase()) {
      setHeld(null)
      return
    }
    if (held) {
      onCombine(held, name)
      return
    }
    setHeld(name)
    play('select')
    boardRef.current?.reveal(name)
  }, [held, onCombine, play])

  const dragDeck = useCallback((name: string, x: number, y: number) => {
    setGhost({ name, x, y, over: boardRef.current?.conceptAt(x, y) ?? null })
  }, [])

  const dropDeck = useCallback((name: string, x: number, y: number) => {
    setGhost(null)
    const commands = boardRef.current
    if (!commands || !commands.contains(x, y)) return
    const over = commands.conceptAt(x, y)
    // On another card: try the pair. On empty board: move the card there.
    if (over && over.toLowerCase() !== name.toLowerCase()) onCombine(name, over)
    else if (!over) commands.placeAt(name, x, y)
  }, [onCombine])

  // ── Reading ──────────────────────────────────────────────────────────────
  const read = useCallback((name: string) => {
    setHeld(null)
    setMenuOpen(false)
    // A sheet and the popup would share the bottom of a phone; the popup wins.
    if (isPhone) setOpenKey(null)
    // A walk of the cards in hand — never of a concept not yet made.
    const list = state.held.map(n => ({ kind: 'concept' as const, name: n }))
    const index = Math.max(0, state.held.findIndex(n => n.toLowerCase() === name.toLowerCase()))
    // `corpus` drops the popup's syllabus-filter picker, which has nothing to re-slice.
    useConceptPopup.getState().openAt(list, index, null, null, null, { walk: 'corpus' })
  }, [state.held, isPhone])

  const showConnection = useCallback((connection: Connection) => {
    setOpenKey(key => (key === connection.key ? null : connection.key))
    setMenuOpen(false)
    if (isPhone) useConceptPopup.getState().close()
  }, [isPhone])

  const practice = useCallback((ids: string[]) => {
    try {
      sessionStorage.setItem('actuarial_selected_ids', JSON.stringify(ids))
    } catch { /* private mode: the quiz falls back to its own draw */ }
    navigate('/quiz?selection=stored')
  }, [navigate])

  // Esc steps back one layer: a held card, then the connection's card, then
  // the menu. The popup minds its own.
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key !== 'Escape' || useConceptPopup.getState().open) return
      if (held) setHeld(null)
      else if (openKey) setOpenKey(null)
      else if (menuOpen) setMenuOpen(false)
    }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [held, openKey, menuOpen])

  const onSettle = useCallback((positions: Record<string, [number, number]>) => {
    savePositions(topic.id, positions)
  }, [topic.id, savePositions])

  const startOver = () => {
    resetBoard(topic.id)
    setHeld(null)
    setOpenKey(null)
    setMenuOpen(false)
  }

  const open = openKey ? graph.byKey.get(openKey) ?? null : null
  const practiceIds = useMemo(() => (open ? practiceQuestions(open, pool) : []), [open, pool])
  // What the board's panels cover, so "fit" frames the map in the room left:
  // the deck down the left of a wide board, the map controls (or a
  // connection's card) down the right.
  const boardInsets = useMemo(
    () => (isPhone
      ? { top: 16, right: 56, bottom: 8, left: 0 }
      : { top: 16, right: open ? 376 : 64, bottom: 8, left: 316 }),
    [isPhone, open],
  )

  const deck = (layout: 'panel' | 'strip') => (
    <CraftDeck
      concepts={state.held}
      total={tally.concepts}
      fresh={state.fresh}
      levels={levels}
      held={held}
      layout={layout}
      showHow={tally.found === 0}
      onTap={tapDeck}
      onDrag={dragDeck}
      onDrop={dropDeck}
      onCancel={() => setGhost(null)}
    />
  )

  return (
    <>
      <BoardHeader
        topic={topic}
        tally={tally}
        onMenu={
          <div className="relative shrink-0">
            <button
              type="button"
              onClick={() => setMenuOpen(v => !v)}
              aria-label="Board options"
              aria-haspopup="menu"
              aria-expanded={menuOpen}
              className="rounded-md p-2 text-muted-foreground transition-colors hover:bg-accent hover:text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
            >
              <MoreHorizontal className="h-4 w-4" />
            </button>
            {menuOpen && (
              <BoardMenu
                filter={filter}
                onFilter={f => { setFilter(f); setMenuOpen(false) }}
                onClose={() => setMenuOpen(false)}
                onTopics={() => navigate('/craft')}
                onTidy={() => { boardRef.current?.tidy(); setMenuOpen(false) }}
                onStartOver={startOver}
              />
            )}
          </div>
        }
      />

      <div className="relative min-h-0 flex-1">
        <CraftBoard
          ref={boardRef}
          state={state}
          saved={board.positions}
          levels={levels}
          selected={popupOpen ? reading : null}
          held={held}
          hover={ghost?.over ?? null}
          insets={boardInsets}
          minStrength={MIN_STRENGTH_SHOWN[filter]}
          justMade={fresh.made}
          freshConnection={fresh.connection}
          flashConnection={flash}
          openConnection={openKey}
          onOpen={read}
          onCombine={onCombine}
          onConnection={showConnection}
          onSettle={onSettle}
        />

        {tally.complete && (
          <div className="pointer-events-none absolute inset-x-0 top-3 z-20 flex justify-center px-3">
            <p className="pointer-events-auto flex items-center gap-2 rounded-full bg-card px-4 py-2 text-sm shadow-[var(--shadow-card)]">
              <CheckMark className="h-4 w-4" />
              Every connection found
            </p>
          </div>
        )}

        {!isPhone && (
          <div className="pointer-events-none absolute bottom-3 left-3 top-3 z-20 flex flex-col justify-start">
            <div className="pointer-events-auto flex max-h-full">{deck('panel')}</div>
          </div>
        )}

        {/* Zoom and fit — the map controls, bottom right. */}
        <div
          className={cn(
            'absolute bottom-3 z-20 flex flex-col overflow-hidden rounded-lg bg-card shadow-[var(--shadow-card)] transition-[right] duration-200',
            !isPhone && open ? 'right-[23.5rem]' : 'right-3',
          )}
        >
          <MapButton label="Zoom in" onClick={() => boardRef.current?.zoom(1.25)}><ZoomIn className="h-4 w-4" /></MapButton>
          <MapButton label="Zoom out" onClick={() => boardRef.current?.zoom(0.8)}><ZoomOut className="h-4 w-4" /></MapButton>
          <MapButton label="Fit the board" onClick={() => boardRef.current?.fit()}><Maximize className="h-4 w-4" /></MapButton>
        </div>

        {/* A failed drop's one line, and the first-run line, share the bottom middle. */}
        <div className="pointer-events-none absolute inset-x-0 bottom-3 z-30 flex flex-col items-center gap-2 px-16">
          {notice ? (
            <p role="status" className="toast-fade-in rounded-full bg-card px-4 py-2 text-sm text-muted-foreground shadow-lg" data-testid="craft-notice">
              {notice}
            </p>
          ) : tally.found === 0 ? (
            <p className="rounded-full bg-card/80 px-4 py-2 text-center text-sm text-muted-foreground">
              Drop one concept on another to see what they make.
            </p>
          ) : null}
        </div>
        <p className="sr-only" role="status" aria-live="polite">{announce}</p>

        {!isPhone && open && (
          <div className="absolute bottom-3 right-3 top-3 z-40">
            <CraftConnection
              key={open.key}
              connection={open}
              practice={practiceIds}
              layout="drawer"
              onClose={() => setOpenKey(null)}
              onRead={read}
              onPractice={practice}
            />
          </div>
        )}
      </div>

      {/* While a concept is being read, a phone gives the deck's room to the board. */}
      {isPhone && !popupOpen && <div className="relative z-30 shrink-0">{deck('strip')}</div>}

      {isPhone && open && (
        <div className="absolute inset-x-0 bottom-0 z-40 flex flex-col justify-end">
          <CraftConnection
            key={open.key}
            connection={open}
            practice={practiceIds}
            layout="sheet"
            onClose={() => setOpenKey(null)}
            onRead={read}
            onPractice={practice}
          />
        </div>
      )}

      {ghost && (
        <div
          className="pointer-events-none fixed z-[70] w-[68px] -translate-x-1/2 -translate-y-1/2 rotate-3 opacity-90 shadow-2xl"
          style={{ left: ghost.x, top: ghost.y }}
          aria-hidden
        >
          <ConceptTileStatic name={ghost.name} state={levels.levelOf(ghost.name)} collected={levels.isCollected(ghost.name)} showLock={false} />
        </div>
      )}
    </>
  )
}

function BoardHeader({ topic, tally, onMenu }: { topic: CraftTopic; tally: TopicTally | null; onMenu: ReactNode }) {
  const navigate = useNavigate()
  return (
    <header className="relative z-30 flex h-14 shrink-0 items-center gap-2 border-b border-border px-3">
      <MobileNavButton className="lg:hidden" />
      <button
        type="button"
        onClick={() => navigate('/craft')}
        aria-label="All topics"
        title="All topics"
        className="hidden shrink-0 rounded-md p-1.5 text-muted-foreground transition-colors hover:bg-accent hover:text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring sm:block"
      >
        <ChevronLeft className="h-4 w-4" />
      </button>
      <ExamLogo examKey={topic.exam} size="sm" className="hidden sm:flex" />
      <div className="min-w-0 flex-1">
        <h1 className="truncate text-sm font-semibold leading-tight sm:text-base">{topic.title}</h1>
        {tally && (
          <p className="truncate text-xs tabular-nums text-muted-foreground" data-testid="craft-tally">
            {tally.held} of {tally.concepts} concepts
            <span className="hidden sm:inline"> · {tally.found} of {tally.connections} connections</span>
          </p>
        )}
      </div>
      {onMenu}
    </header>
  )
}

function MapButton({ label, onClick, children }: { label: string; onClick: () => void; children: ReactNode }) {
  return (
    <button
      type="button"
      onClick={onClick}
      aria-label={label}
      title={label}
      className="flex h-10 w-10 items-center justify-center text-muted-foreground transition-colors hover:bg-accent hover:text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-ring"
    >
      {children}
    </button>
  )
}

const FILTER_ROWS: { value: StrengthFilter; label: string }[] = [
  { value: 'all', label: 'Every connection' },
  { value: 'moderate', label: `Moderate and strong (${STRENGTH_TIERS.moderate}+)` },
  { value: 'strong', label: `Strong only (${STRENGTH_TIERS.strong}+)` },
]

function BoardMenu({
  filter,
  onFilter,
  onClose,
  onTopics,
  onTidy,
  onStartOver,
}: {
  filter: StrengthFilter
  onFilter: (filter: StrengthFilter) => void
  onClose: () => void
  onTopics: () => void
  onTidy: () => void
  onStartOver: () => void
}) {
  const ref = useRef<HTMLDivElement>(null)
  const [confirming, setConfirming] = useState(false)
  useEffect(() => {
    const onDown = (e: PointerEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node)) onClose()
    }
    document.addEventListener('pointerdown', onDown)
    return () => document.removeEventListener('pointerdown', onDown)
  }, [onClose])
  const row = 'flex w-full items-center gap-2 px-3 py-2 text-left text-sm transition-colors hover:bg-accent'
  return (
    <div ref={ref} role="menu" className="absolute right-0 top-full z-50 mt-1 w-64 rounded-md bg-popover py-1 text-popover-foreground shadow-md">
      {/* The header's back arrow, which a phone's header has no room for. */}
      <button type="button" role="menuitem" className={cn(row, 'sm:hidden')} onClick={onTopics}>
        <ChevronLeft className="h-3.5 w-3.5 shrink-0" aria-hidden />
        All topics
      </button>
      <p className="px-3 pb-1 pt-2 text-[11px] font-semibold uppercase tracking-wider text-muted-foreground">Show</p>
      {FILTER_ROWS.map(f => (
        <button
          key={f.value}
          type="button"
          role="menuitemradio"
          aria-checked={filter === f.value}
          className={row}
          onClick={() => onFilter(f.value)}
        >
          <Check className={cn('h-3.5 w-3.5 shrink-0', filter !== f.value && 'invisible')} aria-hidden />
          {f.label}
        </button>
      ))}
      <div className="my-1 h-px bg-border" />
      <button type="button" role="menuitem" className={row} onClick={onTidy}>
        <Wand2 className="h-3.5 w-3.5 shrink-0" aria-hidden />
        Tidy the layout
      </button>
      <button
        type="button"
        role="menuitem"
        className={cn(row, confirming && 'text-destructive')}
        onClick={() => (confirming ? onStartOver() : setConfirming(true))}
      >
        <RotateCcw className="h-3.5 w-3.5 shrink-0" aria-hidden />
        {confirming ? 'Tap again to clear the board' : 'Start this topic over'}
      </button>
    </div>
  )
}
