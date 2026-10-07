import { useCallback, useEffect, useMemo, useRef, useState, type ReactNode } from 'react'
import { Navigate, useNavigate, useParams } from 'react-router-dom'
import {
  Check,
  ChevronLeft,
  Maximize,
  MoreHorizontal,
  Plus,
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
import { CraftPackMenu, type PackGroup } from '@/components/craft/CraftPackMenu'
import { ConceptTileStatic } from '@/components/ConceptTile'
import { ConceptPopup } from '@/components/wiki/ConceptPopup'
import { CheckMark } from '@/components/CheckMark'
import { MobileNavButton } from '@/components/MobileNavButton'
import { useAllQuestions } from '@/hooks/useAllQuestions'
import { progressOf, useConceptCraft, type StrengthFilter } from '@/hooks/useConceptCraft'
import { useConceptLevels } from '@/hooks/useConceptLevels'
import { useConceptPopup } from '@/hooks/useConceptPopup'
import { useIsMobile } from '@/hooks/useIsMobile'
import { usePageHead } from '@/hooks/usePageHead'
import { useSoundEffects } from '@/hooks/useSoundEffects'
import {
  boardState,
  combine,
  craftTopics,
  mergeGraphs,
  packSeeds,
  practiceQuestions,
  recipesOf,
  seedConcepts,
  topicGraph,
  topicTally,
  type CraftGraph,
  type CraftProgress,
  type CraftTopic,
  type TopicTally,
} from '@/lib/conceptCraft'
import { STRENGTH_TIERS, type Connection, type GraphQuestion } from '@/lib/conceptGraph'
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
const prepared = new Map<string, { graph: CraftGraph; seeds: string[] }>()
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
 * **Concept Craft** (docs/concept-craft.md) — `/craft` is the board, opened
 * empty: its **+** adds a starter pack, one exam section's seeds, and the
 * reader crafts from there. Opened from the Quiz tab, beside Quiz Battle: a way
 * of studying a syllabus by crafting it out of a few of its concepts, finding
 * how they connect. `/craft/:topicId` adds that topic's pack and opens the board.
 */
export default function Craft() {
  const { topicId } = useParams()
  if (topicId) return <AddPack topicId={topicId} />
  return <CraftScreen />
}

/** A link to one topic: add its pack, then show the board. */
function AddPack({ topicId }: { topicId: string }) {
  const addPack = useConceptCraft(s => s.addPack)
  const exists = allTopics().some(t => t.id === topicId)
  useEffect(() => {
    if (exists) addPack(topicId)
  }, [exists, topicId, addPack])
  return <Navigate to="/craft" replace />
}

/** "Exam P", "Exam MAS-I", "Exam 5" — a topic's exam, as the ladder names it. */
function examName(topic: CraftTopic): string {
  return examDisplayName(topic.examPage).replace(/-\d+$/, '')
}

let groupsRead: PackGroup[] | null = null
/** The starter packs, grouped by exam in ladder order — what the **+** offers. */
function packGroups(): PackGroup[] {
  if (!groupsRead) {
    const out: PackGroup[] = []
    for (const t of allTopics()) {
      const last = out[out.length - 1]
      if (last && last.name === examName(t)) last.topics.push(t)
      else out.push({ exam: t.exam, name: examName(t), topics: [t] })
    }
    groupsRead = out
  }
  return groupsRead
}

const HEAD = {
  title: 'Concept Craft | Actuarial Notes',
  description: 'Craft the syllabus out of a few of its concepts: add an exam section, drop one concept on another, and see what they make.',
  noindex: true,
}

// ─── The board ───────────────────────────────────────────────────────────────

function CraftScreen() {
  const { questions, loading } = useAllQuestions()
  const packIds = useConceptCraft(s => s.board.packs)
  usePageHead(HEAD)

  // The packs on the board, in the order added — any the vault no longer has, dropped.
  const packs = useMemo(() => {
    const byId = new Map(allTopics().map(t => [t.id, t]))
    return packIds.map(id => byId.get(id)).filter((t): t is CraftTopic => !!t)
  }, [packIds])

  // The quiz pool: what a quiz can serve, which is also what the graph counts
  // and what a connection's Practice draws from.
  const pool = useMemo(
    () => (loading ? null : filterQuestions(questions, {}).map(q => ({ id: q.id, links: q.wiki_link }))),
    [questions, loading],
  )
  const ready = useMemo(() => {
    // An empty board needs nothing read, so it opens at once.
    if (packs.length === 0) return { graph: mergeGraphs([]), seeds: [] as string[], packGraphs: [] as CraftGraph[] }
    if (!pool) return null
    const read = packs.map(t => prepare(t, pool))
    return { graph: mergeGraphs(read.map(r => r.graph)), seeds: packSeeds(read.map(r => r.seeds)), packGraphs: read.map(r => r.graph) }
  }, [packs, pool])

  // The reader this board opens is the app's one popup; leaving the board
  // leaves it closed.
  useEffect(() => () => useConceptPopup.getState().close(), [])

  // The board wears the colour of the pack added last.
  const accent = packs.length > 0 ? examAccentStyle(packs[packs.length - 1].exam) : undefined

  return (
    // Always dark: the board is a canvas the concepts are laid out on
    // (docs/concept-craft.md). Scoped to the route like Actuaria's (style guide
    // §2.6) — the sidebar and anything portalled to the body keep the reader's
    // own theme. It wears an exam's colour (`examAccentStyle`) for what is new
    // and what is being looked at, and gives up the bottom of the screen to the
    // concept popup while that is open, so the board is never under it.
    <div
      className="dark relative flex flex-col overflow-hidden bg-background text-foreground"
      style={{ ...accent, colorScheme: 'dark', height: 'calc(100dvh - var(--concept-split-height, 0px))' }}
    >
      {ready ? (
        <CraftPlay packs={packs} packGraphs={ready.packGraphs} graph={ready.graph} seeds={ready.seeds} pool={pool ?? []} />
      ) : (
        <>
          <BoardHeader tally={null} actions={null} />
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
  packs,
  packGraphs,
  graph,
  seeds,
  pool,
}: {
  /** The starter packs on the board, in the order added. */
  packs: readonly CraftTopic[]
  /** Each pack's own graph, as `packs` lists them — what says which pack a find was in. */
  packGraphs: readonly CraftGraph[]
  graph: CraftGraph
  seeds: readonly string[]
  pool: readonly GraphQuestion[]
}) {
  const navigate = useNavigate()
  const isPhone = useIsMobile(1023)
  const { play, resetCombo } = useSoundEffects()
  const levels = useConceptLevels()

  const board = useConceptCraft(s => s.board)
  const filter = useConceptCraft(s => s.filter)
  const setFilter = useConceptCraft(s => s.setFilter)
  const addPack = useConceptCraft(s => s.addPack)
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
  const [packsOpen, setPacksOpen] = useState(false)

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

  // ── Starter packs ────────────────────────────────────────────────────────
  const added = useMemo(() => new Set(packs.map(t => t.id)), [packs])
  const addStarter = useCallback((topic: CraftTopic) => {
    setPacksOpen(false)
    if (added.has(topic.id)) return
    addPack(topic.id)
    play('collect')
    setAnnounce(`Added ${topic.title} from ${examName(topic)}.`)
  }, [added, addPack, play])
  // A pack added to a board already laid out lands round its edge, and the
  // first one brings the deck in under a phone's board, shrinking it; once the
  // new cards have settled, frame the whole board again.
  const packCount = packs.length
  const lastPackCount = useRef(packCount)
  useEffect(() => {
    const grew = packCount > lastPackCount.current
    lastPackCount.current = packCount
    if (!grew) return
    const t = window.setTimeout(() => boardRef.current?.fit(), 700)
    return () => window.clearTimeout(t)
  }, [packCount])

  /** The pack a connection belongs to — the first added whose topic has it. */
  const packOf = useCallback((key: string) => {
    const i = packGraphs.findIndex(g => g.byKey.has(key))
    return packs[i] ?? packs[0]
  }, [packs, packGraphs])

  // ── Finding connections ──────────────────────────────────────────────────
  const commit = useCallback((connection: Connection, made: string[]) => {
    const before = new Set(progress.found)
    const after = new Set([...before, connection.key])
    addConnection(connection)
    setFresh({ made, connection: connection.key })
    // A pack is done once every connection in its topic is found.
    const done = (g: CraftGraph, keys: Set<string>) => g.connections.length > 0 && g.connections.every(c => keys.has(c.key))
    const completed = packs.filter((_, i) => done(packGraphs[i], after) && !done(packGraphs[i], before))
    const topic = packOf(connection.key)
    if (completed.length > 0) {
      play('complete')
      for (const t of completed) trackCraftTopicCompleted({ exam: t.exam, topic: t.id })
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
  }, [progress, addConnection, packs, packGraphs, packOf, play])

  const onCombine = useCallback((a: string, b: string): DropVerdict => {
    setHeld(null)
    if (a.toLowerCase() === b.toLowerCase()) return 'bounce'
    const outcome = combine(graph, state, a, b)
    if (outcome.kind === 'known') {
      const topic = packOf(outcome.connection.key)
      setFlash(outcome.connection.key)
      trackCraftCombined({ exam: topic.exam, topic: topic.id, outcome: 'known', strength: outcome.connection.strength })
      return 'stay'
    }
    if (outcome.kind === 'none') {
      // Mistakes are silent (docs/sound-design.md); the card going back and
      // one line of text are the whole of it.
      resetCombo('correct')
      setNotice('No connection between these two')
      const topic = packs[packs.length - 1]
      if (topic) trackCraftCombined({ exam: topic.exam, topic: topic.id, outcome: 'none' })
      return 'bounce'
    }
    commit(outcome.connection, outcome.made)
    return 'stay'
  }, [graph, state, packs, packOf, commit, resetCombo])

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
  // the menu. The popup and the starter packs mind their own.
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key !== 'Escape' || useConceptPopup.getState().open || packsOpen) return
      if (held) setHeld(null)
      else if (openKey) setOpenKey(null)
      else if (menuOpen) setMenuOpen(false)
    }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [held, openKey, menuOpen, packsOpen])

  const onSettle = useCallback((positions: Record<string, [number, number]>) => {
    savePositions(positions)
  }, [savePositions])

  const startOver = () => {
    resetBoard()
    setHeld(null)
    setOpenKey(null)
    setMenuOpen(false)
  }

  const empty = state.held.length === 0

  const open = openKey ? graph.byKey.get(openKey) ?? null : null
  const practiceIds = useMemo(() => (open ? practiceQuestions(open, pool) : []), [open, pool])
  const openMakes = useMemo(() => (open ? recipesOf(graph, open) : []), [graph, open])
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
        tally={empty ? null : tally}
        actions={
          <>
          {/* Not `relative`: the packs hang off the header's right edge, so a phone has room for them. */}
          <div className="shrink-0">
            <button
              type="button"
              data-craft-add
              onClick={() => { setPacksOpen(v => !v); setMenuOpen(false) }}
              aria-label="Add a starter pack"
              title="Add a starter pack"
              aria-haspopup="menu"
              aria-expanded={packsOpen}
              data-testid="craft-add"
              className={cn(
                'flex h-9 w-9 items-center justify-center rounded-full bg-primary text-primary-foreground shadow-sm transition-transform hover:scale-105 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background',
                packsOpen && 'rotate-45',
              )}
            >
              <Plus className="h-4 w-4" />
            </button>
            {packsOpen && (
              <CraftPackMenu groups={packGroups()} added={added} onAdd={addStarter} onClose={() => setPacksOpen(false)} />
            )}
          </div>
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
                onBack={() => navigate('/')}
                onTidy={() => { boardRef.current?.tidy(); setMenuOpen(false) }}
                onStartOver={empty ? null : startOver}
              />
            )}
          </div>
          </>
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

        {empty && (
          <div className="absolute inset-0 z-20 flex items-center justify-center p-6">
            <div className="flex max-w-sm flex-col items-center gap-4 text-center" data-testid="craft-empty">
              <CraftLogo size="lg" />
              <div className="space-y-1.5">
                <h2 className="text-lg font-semibold">Start with a starter pack</h2>
                <p className="text-sm text-muted-foreground">
                  Add any exam section and its first concepts land here. Drop one on another: where the notes connect
                  them, a line joins them, and what they make appears.
                </p>
              </div>
              <button
                type="button"
                data-craft-add
                onClick={() => setPacksOpen(true)}
                className="flex items-center gap-2 rounded-full bg-primary px-4 py-2 text-sm font-medium text-primary-foreground shadow-sm transition-colors hover:bg-primary/90 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background"
              >
                <Plus className="h-4 w-4" aria-hidden />
                Add a starter pack
              </button>
            </div>
          </div>
        )}

        {!isPhone && !empty && (
          <div className="pointer-events-none absolute bottom-3 left-3 top-3 z-20 flex flex-col justify-start">
            <div className="pointer-events-auto flex max-h-full">{deck('panel')}</div>
          </div>
        )}

        {/* Zoom and fit — the map controls, bottom right. */}
        {!empty && <div
          className={cn(
            'absolute bottom-3 z-20 flex flex-col overflow-hidden rounded-lg bg-card shadow-[var(--shadow-card)] transition-[right] duration-200',
            !isPhone && open ? 'right-[23.5rem]' : 'right-3',
          )}
        >
          <MapButton label="Zoom in" onClick={() => boardRef.current?.zoom(1.25)}><ZoomIn className="h-4 w-4" /></MapButton>
          <MapButton label="Zoom out" onClick={() => boardRef.current?.zoom(0.8)}><ZoomOut className="h-4 w-4" /></MapButton>
          <MapButton label="Fit the board" onClick={() => boardRef.current?.fit()}><Maximize className="h-4 w-4" /></MapButton>
        </div>}

        {/* A failed drop's one line, and the first-run line, share the bottom middle. */}
        <div className="pointer-events-none absolute inset-x-0 bottom-3 z-30 flex flex-col items-center gap-2 px-16">
          {notice ? (
            <p role="status" className="toast-fade-in rounded-full bg-card px-4 py-2 text-sm text-muted-foreground shadow-lg" data-testid="craft-notice">
              {notice}
            </p>
          ) : tally.found === 0 && !empty ? (
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
              makes={openMakes}
              layout="drawer"
              onClose={() => setOpenKey(null)}
              onRead={read}
              onPractice={practice}
            />
          </div>
        )}
      </div>

      {/* While a concept is being read, a phone gives the deck's room to the board. */}
      {isPhone && !popupOpen && !empty && <div className="relative z-30 shrink-0">{deck('strip')}</div>}

      {isPhone && open && (
        <div className="absolute inset-x-0 bottom-0 z-40 flex flex-col justify-end">
          <CraftConnection
            key={open.key}
            connection={open}
            practice={practiceIds}
            makes={openMakes}
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

function BoardHeader({ tally, actions }: { tally: TopicTally | null; actions: ReactNode }) {
  const navigate = useNavigate()
  return (
    <header className="relative z-30 flex h-14 shrink-0 items-center gap-2 border-b border-border px-3">
      <MobileNavButton className="lg:hidden" />
      <button
        type="button"
        onClick={() => navigate('/')}
        aria-label="Back to the Quiz tab"
        title="Quiz"
        className="hidden shrink-0 rounded-md p-1.5 text-muted-foreground transition-colors hover:bg-accent hover:text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring sm:block"
      >
        <ChevronLeft className="h-4 w-4" />
      </button>
      <CraftLogo size="sm" className="hidden sm:flex" />
      <div className="min-w-0 flex-1">
        <h1 className="truncate text-sm font-semibold leading-tight sm:text-base">Concept Craft</h1>
        {tally && (
          <p className="truncate text-xs tabular-nums text-muted-foreground" data-testid="craft-tally">
            {tally.held} of {tally.concepts} concepts
            <span className="hidden sm:inline"> · {tally.found} of {tally.connections} connections</span>
          </p>
        )}
      </div>
      {actions}
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
  onBack,
  onTidy,
  onStartOver,
}: {
  filter: StrengthFilter
  onFilter: (filter: StrengthFilter) => void
  onClose: () => void
  onBack: () => void
  onTidy: () => void
  /** Clear the board — null while there is nothing on it. */
  onStartOver: (() => void) | null
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
      <button type="button" role="menuitem" className={cn(row, 'sm:hidden')} onClick={onBack}>
        <ChevronLeft className="h-3.5 w-3.5 shrink-0" aria-hidden />
        Back to Quiz
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
      {onStartOver && (
        <button
          type="button"
          role="menuitem"
          className={cn(row, confirming && 'text-destructive')}
          onClick={() => (confirming ? onStartOver() : setConfirming(true))}
        >
          <RotateCcw className="h-3.5 w-3.5 shrink-0" aria-hidden />
          {confirming ? 'Tap again to clear the board' : 'Clear the board'}
        </button>
      )}
    </div>
  )
}
