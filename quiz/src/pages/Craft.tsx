import { useCallback, useEffect, useMemo, useRef, useState, type ReactNode } from 'react'
import { Navigate, useNavigate, useParams } from 'react-router-dom'
import {
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
import { CraftDeck } from '@/components/craft/CraftDeck'
import { CraftInspector } from '@/components/craft/CraftInspector'
import { CraftLogo } from '@/components/craft/CraftLogo'
import { CraftReveal, type RevealState } from '@/components/craft/CraftReveal'
import { RelationPrompt } from '@/components/craft/RelationPrompt'
import { ConceptTileStatic } from '@/components/ConceptTile'
import { ConceptPopup } from '@/components/wiki/ConceptPopup'
import { CheckMark } from '@/components/CheckMark'
import { ExamLogo } from '@/components/ExamLogo'
import { MobileNavButton } from '@/components/MobileNavButton'
import { ListPanel, ListRow } from '@/components/ui/ListPanel'
import { SegmentedControl } from '@/components/ui/SegmentedControl'
import { CRAFT_MODULES, craftModuleById } from '@/data/conceptCraft'
import { useAllQuestions } from '@/hooks/useAllQuestions'
import { boardFor, progressOf, useConceptCraft, type CraftMode } from '@/hooks/useConceptCraft'
import { useConceptLevels } from '@/hooks/useConceptLevels'
import { useConceptPopup } from '@/hooks/useConceptPopup'
import { useIsMobile } from '@/hooks/useIsMobile'
import { usePageHead } from '@/hooks/usePageHead'
import { useSoundEffects } from '@/hooks/useSoundEffects'
import {
  availableNodes,
  combine,
  dailyChallenge,
  moduleTally,
  nextCraft,
  pairKey,
  recipeId,
  relationQuestion,
  stepsToTarget,
  type CraftModule,
  type CraftRecipe,
  type RelationQuestion,
} from '@/lib/conceptCraft'
import { examAccentStyle } from '@/lib/examColors'
import { setWikiContentLookup } from '@/lib/github'
import { setWikiIndexBundle } from '@/lib/wikiIndex'
import { examDisplayName } from '@/lib/wikiRoutes'
import { todayISO } from '@/lib/studyPlan'
import { trackCraftCombined, trackCraftModuleCompleted } from '@/lib/analytics'
import { cn } from '@/lib/utils'

// The board reads concept pages — the inspector's summary, the reader it opens
// — and must not depend on the network to do it: install the wiki bundle's
// lookup, as Cowork does (lib/coworkContent.ts) for the same reason. Idempotent.
setWikiContentLookup((path: string) => wikiBundle.files[path])
setWikiIndexBundle(wikiBundle.index)

/**
 * **Concept Craft** (docs/concept-craft.md) — `/craft` is the topic picker,
 * `/craft/:moduleId` one module's board. Opened from the Quiz tab, beside Quiz
 * Battle: a way of studying a syllabus by building it.
 */
export default function Craft() {
  const { moduleId } = useParams()
  if (!moduleId) return <CraftPicker />
  const module = craftModuleById(moduleId)
  if (!module) return <Navigate to="/craft" replace />
  return <CraftScreen key={module.id} module={module} />
}

/** "Exam P", "Exam MAS-I", "Exam 5" — a module's exam, as the ladder names it. */
function examName(module: CraftModule): string {
  return examDisplayName(module.examPage).replace(/-\d+$/, '')
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

  // Modules are authored in ladder order; group them by exam, keeping it.
  const groups = useMemo(() => {
    const out: { exam: string; name: string; modules: CraftModule[] }[] = []
    for (const m of CRAFT_MODULES) {
      const last = out[out.length - 1]
      if (last && last.exam === m.exam) last.modules.push(m)
      else out.push({ exam: m.exam, name: examName(m), modules: [m] })
    }
    return out
  }, [])

  return (
    <div className="mx-auto w-full max-w-4xl space-y-6 px-4 py-8 sm:px-6">
      <PageTitle onBack={() => navigate('/')}>Concept Craft</PageTitle>
      <div className="flex items-center gap-3 rounded-xl bg-card p-5">
        <CraftLogo size="lg" />
        <p className="text-sm text-muted-foreground">
          <span className="font-medium text-foreground">Build a syllabus out of the concepts it is made of.</span>{' '}
          Start with a few, combine them to discover what they make, and every link you find stays on your board.
        </p>
      </div>
      {groups.map(group => (
        <section key={group.exam} className="space-y-2">
          <p className="px-1 text-xs font-semibold uppercase tracking-wider text-muted-foreground">{group.name}</p>
          <ListPanel>
            {group.modules.map(m => {
              const tally = moduleTally(m, progressOf(boardFor(boards, m.id)))
              const started = tally.links > 0
              return (
                <ListRow
                  key={m.id}
                  to={`/craft/${m.id}`}
                  leading={<ExamLogo examKey={m.exam} size="lg" />}
                  title={m.title}
                  subtitle={m.blurb}
                  meta={
                    <>
                      <span>{started ? `${tally.nodes} of ${tally.totalNodes} concepts` : `${tally.totalNodes} concepts`}</span>
                      <span aria-hidden>·</span>
                      <span>{started ? `${tally.links} of ${tally.totalLinks} links` : `${m.primitives.length} to start with`}</span>
                    </>
                  }
                  trailing={tally.complete ? <CheckMark className="h-5 w-5" label="Every link found" /> : undefined}
                  data-testid="craft-module"
                />
              )
            })}
          </ListPanel>
        </section>
      ))}
    </div>
  )
}

// ─── One module's board ──────────────────────────────────────────────────────

interface PromptState {
  a: string
  b: string
  question: RelationQuestion
}

interface Ghost {
  name: string
  x: number
  y: number
  over: string | null
}

/** How long a pair answered wrongly in Mastery mode waits before it can be tried again. */
const RETRY_MS = 15_000

function CraftScreen({ module }: { module: CraftModule }) {
  const navigate = useNavigate()
  const isPhone = useIsMobile(1023)
  const { play, resetCombo } = useSoundEffects()
  const levels = useConceptLevels()
  const { questions, loading: questionsLoading } = useAllQuestions()

  const mode = useConceptCraft(s => s.mode)
  const setMode = useConceptCraft(s => s.setMode)
  const board = useConceptCraft(s => boardFor(s.boards, module.id))
  const addRecipe = useConceptCraft(s => s.addRecipe)
  const savePositions = useConceptCraft(s => s.savePositions)
  const completeChallenge = useConceptCraft(s => s.completeChallenge)
  const recordAnswer = useConceptCraft(s => s.recordAnswer)
  const resetBoard = useConceptCraft(s => s.resetBoard)

  const progress = useMemo(() => progressOf(board), [board])
  const available = useMemo(() => availableNodes(module, progress), [module, progress])
  const tally = useMemo(() => moduleTally(module, progress), [module, progress])

  const boardRef = useRef<BoardCommands>(null)
  const [selected, setSelected] = useState<string | null>(null)
  const [held, setHeld] = useState<string | null>(null)
  const [reveal, setReveal] = useState<RevealState | null>(null)
  const [notice, setNotice] = useState<string | null>(null)
  const [prompt, setPrompt] = useState<PromptState | null>(null)
  const [ghost, setGhost] = useState<Ghost | null>(null)
  const [fresh, setFresh] = useState<{ node: string | null; recipe: string | null }>({ node: null, recipe: null })
  const [flash, setFlash] = useState<string | null>(null)
  const [hintLevel, setHintLevel] = useState(0)
  const [skip, setSkip] = useState(0)
  const [menuOpen, setMenuOpen] = useState(false)
  const lockouts = useRef(new Map<string, number>())
  // The prompt's verdict, read when it closes — a right answer crafts then.
  const lastVerdict = useRef<boolean | null>(null)

  const head = useMemo(() => ({
    title: `${module.title} — Concept Craft | Actuarial Notes`,
    description: `${examName(module)}: ${module.blurb}`,
    noindex: true,
  }), [module])
  usePageHead(head)

  // The reader this board opens is the app's one popup; leaving the board
  // leaves it closed.
  useEffect(() => () => useConceptPopup.getState().close(), [])

  // ── The day's challenge ──────────────────────────────────────────────────
  const today = todayISO()
  const doneToday = board.challenges.includes(today)
  const target = dailyChallenge(module, progress, today, skip)
  const steps = target ? stepsToTarget(module, progress, target) : null
  const hint = target ? nextCraft(module, progress, target) : null
  const hinted = useMemo(
    () => (hint ? [hint.a, hint.b].slice(0, hintLevel) : []),
    [hint, hintLevel],
  )
  // A new target, or progress toward it, takes the hint back.
  useEffect(() => { setHintLevel(0) }, [target, progress])

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
  // the link as it draws every other.
  useEffect(() => {
    if (!fresh.node && !fresh.recipe) return
    const t = window.setTimeout(() => setFresh({ node: null, recipe: null }), 1200)
    return () => window.clearTimeout(t)
  }, [fresh])
  const closeReveal = useCallback(() => setReveal(null), [])

  // ── Crafting ─────────────────────────────────────────────────────────────
  const commit = useCallback((recipe: CraftRecipe, newNode: boolean, introduces: string[], answer?: 'right') => {
    const before = moduleTally(module, progress)
    addRecipe(module.id, recipe)
    const after = moduleTally(module, { recipes: [...progress.recipes, recipeId(recipe)] })
    setFresh({ node: newNode ? recipe.result : null, recipe: recipeId(recipe) })
    const hitTarget = newNode && target !== null && recipe.result.toLowerCase() === target.toLowerCase()
    let headline: string | undefined
    if (after.complete && !before.complete) {
      headline = `Every link in ${module.title.toLowerCase()} found`
      play('complete')
      trackCraftModuleCompleted({ module: module.id, mode })
    } else if (hitTarget) {
      headline = doneToday ? 'Challenge met' : 'Today’s challenge met'
      play('levelUp')
    } else {
      play(newNode ? 'collect' : 'correct')
    }
    if (hitTarget) {
      if (!doneToday) completeChallenge(module.id, today)
      setSkip(0)
    }
    setReveal({ recipe, found: true, newNode, introduces, headline })
    trackCraftCombined({ module: module.id, mode, outcome: newNode ? 'new_concept' : 'new_link', ...(answer ? { answer } : {}) })
  }, [module, progress, addRecipe, target, doneToday, completeChallenge, today, play, mode])

  const onCombine = useCallback((a: string, b: string): DropVerdict => {
    setHeld(null)
    if (a.toLowerCase() === b.toLowerCase()) return 'bounce'
    const outcome = combine(module, progress, a, b)

    if (outcome.kind === 'known') {
      setFlash(recipeId(outcome.recipe))
      setReveal({ recipe: outcome.recipe, found: false, newNode: false, introduces: [] })
      trackCraftCombined({ module: module.id, mode, outcome: 'known' })
      return 'stay'
    }

    if (mode === 'explore') {
      if (outcome.kind === 'none') {
        // Mistakes are silent (docs/sound-design.md); the card bouncing back
        // and one line of text are the whole of it.
        resetCombo('correct')
        setNotice('No direct link between these concepts')
        trackCraftCombined({ module: module.id, mode, outcome: 'none' })
        return 'bounce'
      }
      commit(outcome.recipe, outcome.newNode, outcome.introduces)
      return 'stay'
    }

    // Mastery: every pair is asked about, related or not.
    const key = pairKey(a, b)
    const until = lockouts.current.get(key) ?? 0
    if (until > Date.now()) {
      setNotice(`Give that pair a moment — try again in ${Math.ceil((until - Date.now()) / 1000)}s`)
      return 'bounce'
    }
    play('open')
    setPrompt({ a, b, question: relationQuestion(module, a, b) })
    trackCraftCombined({ module: module.id, mode, outcome: 'asked' })
    return 'bounce'
  }, [module, progress, mode, commit, play, resetCombo])

  const answerPrompt = useCallback((right: boolean) => {
    if (!prompt) return
    recordAnswer(module.id, right)
    const outcome = combine(module, progress, prompt.a, prompt.b)
    trackCraftCombined({ module: module.id, mode: 'mastery', outcome: outcome.kind === 'none' ? 'none' : 'new_link', answer: right ? 'right' : 'wrong' })
    if (!right) {
      resetCombo('correct')
      if (outcome.kind !== 'none') lockouts.current.set(pairKey(prompt.a, prompt.b), Date.now() + RETRY_MS)
      return
    }
    if (outcome.kind === 'none') play('correct')
  }, [prompt, module, progress, recordAnswer, play, resetCombo])

  const closePrompt = useCallback(() => {
    if (!prompt) return
    setPrompt(null)
    // A right answer about a real pair is what crafts — once the prompt is
    // closed, so the new card lands on a board the reader can see.
    const verdictRight = lastVerdict.current
    lastVerdict.current = null
    if (!verdictRight) return
    const outcome = combine(module, progress, prompt.a, prompt.b)
    if (outcome.kind === 'new') commit(outcome.recipe, outcome.newNode, outcome.introduces, 'right')
  }, [prompt, module, progress, commit])

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
    boardRef.current?.focus(name)
  }, [held, onCombine, play])

  const dragDeck = useCallback((name: string, x: number, y: number) => {
    setGhost({ name, x, y, over: boardRef.current?.conceptAt(x, y) ?? null })
  }, [])

  const dropDeck = useCallback((name: string, x: number, y: number) => {
    setGhost(null)
    const commands = boardRef.current
    if (!commands || !commands.contains(x, y)) return
    const target = commands.conceptAt(x, y)
    if (target && target.toLowerCase() !== name.toLowerCase()) onCombine(name, target)
    else if (!target) commands.place(name, x, y)
  }, [onCombine])

  const inspect = useCallback((name: string | null) => {
    setSelected(name)
    setHeld(null)
    setMenuOpen(false)
  }, [])

  const focusConcept = useCallback((name: string) => {
    setSelected(name)
    boardRef.current?.focus(name)
  }, [])

  const read = useCallback((name: string) => {
    const list = available.map(n => ({ kind: 'concept' as const, name: n }))
    const index = Math.max(0, available.findIndex(n => n.toLowerCase() === name.toLowerCase()))
    // A walk of the board's concepts, not a slice of a syllabus: `corpus`
    // drops the popup's syllabus-filter picker, which has nothing to re-slice.
    useConceptPopup.getState().openAt(list, index, null, null, null, { walk: 'corpus' })
    // The reader is the fuller view of what the inspector summarised.
    setSelected(null)
  }, [available])

  const showRecipe = useCallback((recipe: CraftRecipe) => {
    setFlash(recipeId(recipe))
    setReveal({ recipe, found: false, newNode: false, introduces: [] })
  }, [])

  // Esc steps back one layer: a held card, then the inspector.
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key !== 'Escape' || prompt || useConceptPopup.getState().open) return
      if (held) setHeld(null)
      else if (selected) setSelected(null)
      else if (menuOpen) setMenuOpen(false)
    }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [held, selected, menuOpen, prompt])

  const onSettle = useCallback((positions: Record<string, [number, number]>) => {
    savePositions(module.id, positions)
  }, [module.id, savePositions])

  const startOver = () => {
    resetBoard(module.id)
    setSelected(null)
    setHeld(null)
    setReveal(null)
    setSkip(0)
    setMenuOpen(false)
  }

  const openTargets = target ? (skip > 0 || dailyChallenge(module, progress, today, skip + 1) !== target) : false
  // What the board's panels cover, so "fit" frames the graph in the room left:
  // the challenge across the top, the deck down the left of a wide board, the
  // map controls (or the inspector) down the right.
  const boardInsets = useMemo(
    () => (isPhone
      ? { top: 56, right: 56, bottom: 8, left: 0 }
      : { top: 56, right: selected ? 376 : 64, bottom: 8, left: 284 }),
    [isPhone, selected],
  )
  const inspector = selected && available.some(n => n.toLowerCase() === selected.toLowerCase()) ? selected : null

  return (
    // Always dark: the board is a canvas the concepts are laid out on, and
    // the PRD's feel is a dark, quiet board (docs/concept-craft.md). Scoped
    // to the route like Actuaria's (style guide §2.6) — the sidebar and
    // anything portalled to the body keep the reader's own theme.
    <div className="dark relative flex h-dvh flex-col overflow-hidden bg-background text-foreground" style={{ colorScheme: 'dark' }}>
      <header className="relative z-30 flex h-14 shrink-0 items-center gap-2 border-b border-border px-3" style={examAccentStyle(module.exam)}>
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
        <ExamLogo examKey={module.exam} size="sm" className="hidden sm:flex" />
        <div className="min-w-0 flex-1">
          <h1 className="truncate text-sm font-semibold leading-tight sm:text-base">{module.title}</h1>
          <p className="hidden truncate text-xs tabular-nums text-muted-foreground sm:block" data-testid="craft-tally">
            {tally.nodes} of {tally.totalNodes} concepts · {tally.links} of {tally.totalLinks} links
          </p>
        </div>
        <SegmentedControl<CraftMode>
          label="How pairs are combined"
          size="sm"
          value={mode}
          onChange={setMode}
          options={[
            { value: 'explore', label: 'Explore' },
            { value: 'mastery', label: 'Mastery' },
          ]}
          className="shrink-0"
        />
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
              onClose={() => setMenuOpen(false)}
              onTopics={() => navigate('/craft')}
              onTidy={() => { boardRef.current?.tidy(); setMenuOpen(false) }}
              onStartOver={startOver}
            />
          )}
        </div>
      </header>

      <div className="relative min-h-0 flex-1">
        <CraftBoard
          ref={boardRef}
          module={module}
          progress={progress}
          saved={board.positions}
          levels={levels}
          selected={inspector}
          held={held}
          hinted={hinted}
          hover={ghost?.over ?? null}
          insets={boardInsets}
          freshNode={fresh.node}
          freshRecipe={fresh.recipe}
          flashRecipe={flash}
          onSelect={inspect}
          onCombine={onCombine}
          onTag={showRecipe}
          onSettle={onSettle}
        />

        {/* The challenge, over the top of the board. */}
        <div className="pointer-events-none absolute inset-x-0 top-3 z-20 flex justify-center px-3">
          <ChallengeBar
            complete={tally.complete}
            target={target}
            steps={steps}
            doneToday={doneToday}
            canHint={!!hint && hintLevel < 2}
            canSkip={openTargets}
            onHint={() => setHintLevel(l => Math.min(2, l + 1))}
            onSkip={() => setSkip(s => s + 1)}
          />
        </div>

        {!isPhone && (
          <div className="pointer-events-none absolute bottom-3 left-3 top-16 z-20 flex flex-col justify-start">
            <div className="pointer-events-auto flex max-h-full">
              <CraftDeck
                nodes={available}
                total={tally.totalNodes}
                levels={levels}
                held={held}
                fresh={fresh.node}
                layout="panel"
                showHow={tally.links === 0}
                onTap={tapDeck}
                onDrag={dragDeck}
                onDrop={dropDeck}
                onCancel={() => setGhost(null)}
              />
            </div>
          </div>
        )}

        {/* Zoom, fit, tidy — the map controls, bottom right. */}
        <div
          className={cn(
            'absolute bottom-3 z-20 flex flex-col overflow-hidden rounded-lg bg-card shadow-[var(--shadow-card)] transition-[right] duration-200',
            !isPhone && inspector ? 'right-[23.5rem]' : 'right-3',
          )}
        >
          <MapButton label="Zoom in" onClick={() => boardRef.current?.zoom(1.25)}><ZoomIn className="h-4 w-4" /></MapButton>
          <MapButton label="Zoom out" onClick={() => boardRef.current?.zoom(0.8)}><ZoomOut className="h-4 w-4" /></MapButton>
          <MapButton label="Fit the board" onClick={() => boardRef.current?.fit()}><Maximize className="h-4 w-4" /></MapButton>
        </div>

        {/* The reveal, the notice, and the first-run line share the bottom middle. */}
        <div className="pointer-events-none absolute inset-x-0 bottom-3 z-30 flex flex-col items-center gap-2 px-16">
          {notice && (
            <p role="status" className="toast-fade-in rounded-full bg-card px-4 py-2 text-sm text-muted-foreground shadow-lg" data-testid="craft-notice">
              {notice}
            </p>
          )}
          {reveal ? (
            <CraftReveal reveal={reveal} onClose={closeReveal} onInspect={name => { setReveal(null); focusConcept(name) }} />
          ) : tally.links === 0 && !notice ? (
            <p className="rounded-full bg-card/80 px-4 py-2 text-center text-sm text-muted-foreground">
              {mode === 'mastery'
                ? 'Drop one concept on another, then say how they relate.'
                : 'Drop one concept on another to discover what they make.'}
            </p>
          ) : null}
        </div>

        {!isPhone && inspector && (
          <div className="absolute bottom-3 right-3 top-3 z-40">
            <CraftInspector
              key={inspector}
              module={module}
              progress={progress}
              name={inspector}
              levels={levels}
              questions={questionsLoading ? null : questions}
              layout="drawer"
              onClose={() => setSelected(null)}
              onFocus={focusConcept}
              onRecipe={showRecipe}
              onRead={read}
            />
          </div>
        )}
      </div>

      {isPhone && (
        <div className="relative z-30 shrink-0">
          <CraftDeck
            nodes={available}
            total={tally.totalNodes}
            levels={levels}
            held={held}
            fresh={fresh.node}
            layout="strip"
            showHow={tally.links === 0}
            onTap={tapDeck}
            onDrag={dragDeck}
            onDrop={dropDeck}
            onCancel={() => setGhost(null)}
          />
        </div>
      )}

      {isPhone && inspector && (
        <div className="absolute inset-x-0 bottom-0 z-40 flex flex-col justify-end">
          <CraftInspector
            key={inspector}
            module={module}
            progress={progress}
            name={inspector}
            levels={levels}
            questions={questionsLoading ? null : questions}
            layout="sheet"
            onClose={() => setSelected(null)}
            onFocus={focusConcept}
            onRecipe={showRecipe}
            onRead={read}
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

      {prompt && (
        <RelationPrompt
          a={prompt.a}
          b={prompt.b}
          question={prompt.question}
          onAnswer={right => { lastVerdict.current = right; answerPrompt(right) }}
          onClose={closePrompt}
        />
      )}

      <ConceptPopup />
    </div>
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

function BoardMenu({
  onClose,
  onTopics,
  onTidy,
  onStartOver,
}: {
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
    <div ref={ref} role="menu" className="absolute right-0 top-full z-50 mt-1 w-56 rounded-md bg-popover py-1 text-popover-foreground shadow-md">
      {/* The header's back arrow, which a phone's header has no room for. */}
      <button type="button" role="menuitem" className={cn(row, 'sm:hidden')} onClick={onTopics}>
        <ChevronLeft className="h-3.5 w-3.5 shrink-0" aria-hidden />
        All topics
      </button>
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

function ChallengeBar({
  complete,
  target,
  steps,
  doneToday,
  canHint,
  canSkip,
  onHint,
  onSkip,
}: {
  complete: boolean
  target: string | null
  steps: number | null
  doneToday: boolean
  canHint: boolean
  canSkip: boolean
  onHint: () => void
  onSkip: () => void
}) {
  if (complete || !target) {
    return (
      <p className="pointer-events-auto flex items-center gap-2 rounded-full bg-card px-4 py-2 text-sm shadow-[var(--shadow-card)]">
        <CheckMark className="h-4 w-4" />
        Every link found
      </p>
    )
  }
  return (
    <div
      className="pointer-events-auto flex max-w-full items-center gap-1 rounded-full bg-card py-1 pl-3.5 pr-1 text-sm shadow-[var(--shadow-card)]"
      data-testid="craft-challenge"
    >
      {doneToday ? <CheckMark className="h-4 w-4 shrink-0" label="Today’s challenge met" /> : <Target className="h-4 w-4 shrink-0 text-muted-foreground" aria-hidden />}
      <span className="min-w-0 truncate pl-1">
        <span className="text-muted-foreground">{doneToday ? 'Next: ' : 'Craft '}</span>
        <span className="font-medium">{target}</span>
      </span>
      {steps !== null && (
        <span className="shrink-0 whitespace-nowrap pl-1.5 text-xs tabular-nums text-muted-foreground" title="Crafts still to make on the way">
          {steps} {steps === 1 ? 'step' : 'steps'}
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
  )
}
