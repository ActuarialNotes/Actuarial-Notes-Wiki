import { useCallback, useEffect, useMemo, useRef, useState, type ReactNode } from 'react'
import { Navigate, useNavigate, useParams } from 'react-router-dom'
import {
  Check,
  ChevronLeft,
  Lightbulb,
  Maximize,
  MoreHorizontal,
  RotateCcw,
  Shuffle,
  Target,
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
  bridgePlan,
  challengeOrder,
  combine,
  craftTopics,
  dailyChallenge,
  isBridged,
  isPlaced,
  topicGraph,
  topicTally,
  withConnection,
  type CraftProgress,
  type CraftTopic,
  type TopicTally,
} from '@/lib/conceptCraft'
import { STRENGTH_TIERS, type ConceptGraph, type Connection } from '@/lib/conceptGraph'
import { examAccentStyle } from '@/lib/examColors'
import { setWikiContentLookup } from '@/lib/github'
import { filterQuestions, type Question } from '@/lib/parser'
import { setWikiIndexBundle } from '@/lib/wikiIndex'
import { examDisplayName } from '@/lib/wikiRoutes'
import { todayISO } from '@/lib/studyPlan'
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

const MIN_STRENGTH_SHOWN: Record<StrengthFilter, number> = {
  all: 0,
  moderate: STRENGTH_TIERS.moderate,
  strong: STRENGTH_TIERS.strong,
}

/**
 * **Concept Craft** (docs/concept-craft.md) — `/craft` is the topic picker,
 * `/craft/:topicId` one topic's board. Opened from the Quiz tab, beside Quiz
 * Battle: a way of studying a syllabus by finding how its concepts connect.
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
          <span className="font-medium text-foreground">Find how a topic’s concepts connect.</span>{' '}
          Drop one concept on another: wherever the notes tie them together, a line joins them with its strength.
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

  // The quiz pool: what a quiz can serve, which is also what the graph counts.
  const pool = useMemo(() => (loading ? null : filterQuestions(questions, {})), [questions, loading])
  const graph = useMemo(
    () => (pool ? topicGraph(topic, conceptMarkdown, pool.map(q => ({ id: q.id, links: q.wiki_link }))) : null),
    [topic, pool],
  )
  const byId = useMemo(() => (pool ? new Map(pool.map(q => [q.id, q])) : null), [pool])

  const head = useMemo(() => ({
    title: `${topic.title} — Concept Craft | Actuarial Notes`,
    description: `${examName(topic)}: how the concepts of ${topic.title.toLowerCase()} connect.`,
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
    // own theme. It gives up the bottom of the screen to the concept popup
    // while that is open, so the board is never under it.
    <div
      className="dark relative flex flex-col overflow-hidden bg-background text-foreground"
      style={{ colorScheme: 'dark', height: 'calc(100dvh - var(--concept-split-height, 0px))' }}
    >
      {graph && byId ? (
        <CraftPlay topic={topic} graph={graph} questions={byId} />
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

function CraftPlay({ topic, graph, questions }: { topic: CraftTopic; graph: ConceptGraph; questions: ReadonlyMap<string, Question> }) {
  const navigate = useNavigate()
  const isPhone = useIsMobile(1023)
  const { play, resetCombo } = useSoundEffects()
  const levels = useConceptLevels()

  const board = useConceptCraft(s => boardFor(s.boards, topic.id))
  const filter = useConceptCraft(s => s.filter)
  const setFilter = useConceptCraft(s => s.setFilter)
  const place = useConceptCraft(s => s.place)
  const addConnection = useConceptCraft(s => s.addConnection)
  const savePositions = useConceptCraft(s => s.savePositions)
  const completeChallenge = useConceptCraft(s => s.completeChallenge)
  const resetBoard = useConceptCraft(s => s.resetBoard)

  // Keyed on the two lists, not the board: saving where the cards settled
  // must not read as a move in the game.
  const progress = useMemo<CraftProgress>(() => progressOf(board), [board.placed, board.found]) // eslint-disable-line react-hooks/exhaustive-deps
  const tally = useMemo(() => topicTally(graph, progress), [graph, progress])
  const placedSet = useMemo(() => new Set(progress.placed), [progress])

  const boardRef = useRef<BoardCommands>(null)
  const [held, setHeld] = useState<string | null>(null)
  const [ghost, setGhost] = useState<Ghost | null>(null)
  const [notice, setNotice] = useState<string | null>(null)
  const [announce, setAnnounce] = useState('')
  const [fresh, setFresh] = useState<{ node: string | null; connection: string | null }>({ node: null, connection: null })
  const [flash, setFlash] = useState<string | null>(null)
  const [openKey, setOpenKey] = useState<string | null>(null)
  const [hintLevel, setHintLevel] = useState(0)
  const [skip, setSkip] = useState(0)
  const [menuOpen, setMenuOpen] = useState(false)

  // The concept the popup is showing, while it is open — lit on the board.
  const reading = useConceptPopup(s => {
    if (!s.open) return null
    const page = s.pages[s.pageIndex]
    return page && page.kind === 'concept' ? page.name : null
  })
  const popupOpen = useConceptPopup(s => s.open)

  // ── The day's challenge ──────────────────────────────────────────────────
  const today = todayISO()
  const order = useMemo(() => challengeOrder(graph, topic.id, today), [graph, topic.id, today])
  const doneToday = board.challenges.includes(today)
  // Memoized: the page re-renders on every move of a card dragged from the deck.
  const target = useMemo(() => dailyChallenge(graph, progress, order, skip), [graph, progress, order, skip])
  const canSkip = useMemo(
    () => !!target && (skip > 0 || dailyChallenge(graph, progress, order, skip + 1) !== target),
    [graph, progress, order, skip, target],
  )
  const bridge = useMemo(() => (target ? bridgePlan(graph, progress, target.a, target.b) : null), [graph, progress, target])
  const next = bridge?.missing[0] ?? null
  // The hint names what lies between the two first, then the drop to make.
  const hint = useMemo<Hint | null>(() => {
    if (!bridge || !next || hintLevel === 0) return null
    if (hintLevel === 1) return { try: bridge.concept }
    const other = next.a.toLowerCase() === bridge.concept.toLowerCase() ? next.b : next.a
    return { drop: [bridge.concept, other] }
  }, [bridge, next, hintLevel])
  const hinted = useMemo(() => (!hint ? [] : 'try' in hint ? [hint.try] : hint.drop), [hint])
  // A new target, or a connection found, takes the hint back — putting the
  // hinted card down doesn't, or the hint would vanish as it was followed.
  useEffect(() => { setHintLevel(0) }, [target?.a, target?.b, progress.found])

  // The challenge's two ends go on the board, so it is never set on concepts
  // the reader can't see.
  useEffect(() => {
    if (!target) return
    if (!isPlaced(progress, target.a) || !isPlaced(progress, target.b)) place(topic.id, [target.a, target.b])
  }, [target, progress, place, topic.id])

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
  // The pop and the line drawing in are one-off; after them the board draws
  // the connection as it draws every other.
  useEffect(() => {
    if (!fresh.node && !fresh.connection) return
    const t = window.setTimeout(() => setFresh({ node: null, connection: null }), 1200)
    return () => window.clearTimeout(t)
  }, [fresh])
  // A card that arrived where the reader can't see it — beside one at the
  // edge of the view — is brought into sight once it has landed.
  useEffect(() => {
    if (!fresh.node) return
    const name = fresh.node
    const t = window.setTimeout(() => boardRef.current?.reveal(name), 450)
    return () => window.clearTimeout(t)
  }, [fresh.node])

  // ── Finding connections ──────────────────────────────────────────────────
  const commit = useCallback((connection: Connection, arriving: string | null) => {
    const after = withConnection(progress, connection)
    addConnection(topic.id, connection)
    setFresh({ node: arriving, connection: connection.key })
    const completed = topicTally(graph, after).complete && !tally.complete
    const met = !!target && !isBridged(graph, progress, target.a, target.b) && isBridged(graph, after, target.a, target.b)
    if (completed) {
      play('complete')
      trackCraftTopicCompleted({ exam: topic.exam, topic: topic.id })
    } else if (met) {
      play('levelUp')
    } else {
      play(connection.strength >= STRENGTH_TIERS.strong ? 'collect' : 'correct')
    }
    if (met) {
      if (!doneToday) completeChallenge(topic.id, today)
      setSkip(0)
    }
    // No card, no toast: the map is the answer. Assistive tech is told what changed.
    setAnnounce(`Connected ${connection.a} and ${connection.b}, strength ${connection.strength}.${met ? ' Challenge met.' : ''}`)
    trackCraftCombined({ exam: topic.exam, topic: topic.id, outcome: 'new', strength: connection.strength })
  }, [progress, addConnection, topic, graph, tally.complete, target, play, doneToday, completeChallenge, today])

  const onCombine = useCallback((a: string, b: string): DropVerdict => {
    setHeld(null)
    if (a.toLowerCase() === b.toLowerCase()) return 'bounce'
    const outcome = combine(graph, progress, a, b)
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
    const arriving = [a, b].find(n => !isPlaced(progress, n)) ?? null
    commit(outcome.connection, arriving)
    return 'stay'
  }, [graph, progress, topic, commit, resetCombo])

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
    if (over && over.toLowerCase() !== name.toLowerCase()) {
      onCombine(name, over)
      return
    }
    // Empty board: put it down there.
    commands.placeAt(name, x, y)
    if (!isPlaced(progress, name)) {
      place(topic.id, [name])
      setFresh({ node: name, connection: null })
    }
  }, [onCombine, progress, place, topic.id])

  // ── Reading ──────────────────────────────────────────────────────────────
  const read = useCallback((name: string) => {
    setHeld(null)
    setMenuOpen(false)
    // A sheet and the popup would share the bottom of a phone; the popup wins.
    if (isPhone) setOpenKey(null)
    const list = topic.concepts.map(n => ({ kind: 'concept' as const, name: n }))
    const index = Math.max(0, topic.concepts.findIndex(n => n.toLowerCase() === name.toLowerCase()))
    // A walk of the topic's concepts, not a slice of a syllabus page: `corpus`
    // drops the popup's syllabus-filter picker, which has nothing to re-slice.
    useConceptPopup.getState().openAt(list, index, null, null, null, { walk: 'corpus' })
  }, [topic.concepts, isPhone])

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
    setSkip(0)
    setMenuOpen(false)
  }

  const open = openKey ? graph.byKey.get(openKey) ?? null : null
  // What the board's panels cover, so "fit" frames the map in the room left:
  // the challenge across the top, the deck down the left of a wide board, the
  // map controls (or a connection's card) down the right.
  const boardInsets = useMemo(
    () => (isPhone
      ? { top: 56, right: 56, bottom: 8, left: 0 }
      : { top: 56, right: open ? 376 : 64, bottom: 8, left: 316 }),
    [isPhone, open],
  )

  const deck = (layout: 'panel' | 'strip') => (
    <CraftDeck
      concepts={topic.concepts}
      placed={placedSet}
      levels={levels}
      held={held}
      hinted={hinted}
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
          graph={graph}
          progress={progress}
          saved={board.positions}
          levels={levels}
          selected={popupOpen ? reading : null}
          held={held}
          hinted={hinted}
          hover={ghost?.over ?? null}
          insets={boardInsets}
          minStrength={MIN_STRENGTH_SHOWN[filter]}
          freshNode={fresh.node}
          freshConnection={fresh.connection}
          flashConnection={flash}
          openConnection={openKey}
          onOpen={read}
          onCombine={onCombine}
          onConnection={showConnection}
          onSettle={onSettle}
        />

        {/* The challenge, over the top of the board — centred in the room
            the deck and a connection's card leave. */}
        <div
          className="pointer-events-none absolute top-3 z-20 flex justify-center px-3 transition-[right] duration-200"
          style={{ left: isPhone ? 0 : boardInsets.left, right: isPhone ? 0 : open ? boardInsets.right : 0 }}
        >
          <ChallengeBar
            none={order.length === 0}
            complete={tally.complete}
            target={target}
            steps={bridge ? bridge.missing.length : null}
            doneToday={doneToday}
            hint={hint}
            canHint={!!next && hintLevel < 2}
            canSkip={canSkip}
            onHint={() => setHintLevel(l => Math.min(2, l + 1))}
            onSkip={() => setSkip(s => s + 1)}
          />
        </div>

        {!isPhone && (
          <div className="pointer-events-none absolute bottom-3 left-3 top-16 z-20 flex flex-col justify-start">
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
              Drop one concept on another to see if they connect.
            </p>
          ) : null}
        </div>
        <p className="sr-only" role="status" aria-live="polite">{announce}</p>

        {!isPhone && open && (
          <div className="absolute bottom-3 right-3 top-3 z-40">
            <CraftConnection
              key={open.key}
              connection={open}
              questions={questions}
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
            questions={questions}
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
    <header className="relative z-30 flex h-14 shrink-0 items-center gap-2 border-b border-border px-3" style={examAccentStyle(topic.exam)}>
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
            {tally.found} of {tally.connections} connections
            <span className="hidden sm:inline"> · {tally.placed} of {tally.concepts} concepts on the board</span>
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

type Hint = { try: string } | { drop: [string, string] }

function ChallengeBar({
  none,
  complete,
  target,
  steps,
  doneToday,
  hint,
  canHint,
  canSkip,
  onHint,
  onSkip,
}: {
  /** The topic is too tightly knit to set one: every two concepts are neighbours. */
  none: boolean
  complete: boolean
  target: { a: string; b: string } | null
  steps: number | null
  doneToday: boolean
  hint: Hint | null
  canHint: boolean
  canSkip: boolean
  onHint: () => void
  onSkip: () => void
}) {
  if (none && !complete) return null
  if (complete || !target) {
    return (
      <p className="pointer-events-auto flex items-center gap-2 rounded-full bg-card px-4 py-2 text-sm shadow-[var(--shadow-card)]">
        <CheckMark className="h-4 w-4" />
        {complete ? 'Every connection found' : 'Every challenge met'}
      </p>
    )
  }
  return (
    <div className="flex max-w-full flex-col items-center gap-1.5">
      <div
        className="pointer-events-auto flex max-w-full items-center gap-1 rounded-[1.25rem] bg-card py-1 pl-3.5 pr-1 text-sm shadow-[var(--shadow-card)]"
        data-testid="craft-challenge"
      >
        {doneToday ? <CheckMark className="h-4 w-4 shrink-0" label="Today’s challenge met" /> : <Target className="h-4 w-4 shrink-0 text-muted-foreground" aria-hidden />}
        {/* Both names matter, so a narrow bar wraps rather than cutting the second off. */}
        <span className="line-clamp-3 min-w-0 py-0.5 pl-1 leading-snug">
          <span className="text-muted-foreground">{doneToday ? 'Next: what connects ' : 'What connects '}</span>
          <span className="font-medium">{target.a}</span>
          <span className="text-muted-foreground"> and </span>
          <span className="font-medium">{target.b}</span>
          <span className="text-muted-foreground">?</span>
        </span>
        {steps !== null && steps > 0 && (
          <span className="shrink-0 whitespace-nowrap pl-1.5 text-xs tabular-nums text-muted-foreground" title="Connections still to find to join them through a third concept">
            {steps} to find
          </span>
        )}
        {canHint && (
          <button
            type="button"
            onClick={onHint}
            aria-label="Hint"
            title="Hint"
            className="ml-1 rounded-full p-1.5 text-muted-foreground transition-colors hover:bg-accent hover:text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
          >
            <Lightbulb className="h-4 w-4" />
          </button>
        )}
        {canSkip && (
          <button
            type="button"
            onClick={onSkip}
            aria-label="Another challenge"
            title="Another challenge"
            className="rounded-full p-1.5 text-muted-foreground transition-colors hover:bg-accent hover:text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
          >
            <Shuffle className="h-4 w-4" />
          </button>
        )}
      </div>
      {hint && (
        <p className="pointer-events-auto max-w-full truncate rounded-full bg-card/90 px-3 py-1 text-xs shadow-[var(--shadow-card)]" data-testid="craft-hint">
          {'try' in hint ? (
            <><span className="text-muted-foreground">Try </span><span className="font-medium">{hint.try}</span></>
          ) : (
            <>
              <span className="text-muted-foreground">Drop </span><span className="font-medium">{hint.drop[0]}</span>
              <span className="text-muted-foreground"> on </span><span className="font-medium">{hint.drop[1]}</span>
            </>
          )}
        </p>
      )}
    </div>
  )
}
