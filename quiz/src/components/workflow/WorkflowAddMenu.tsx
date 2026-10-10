import { useEffect, useMemo, useRef, useState, type ReactNode } from 'react'
import { BookOpen, Calculator, ChevronLeft, ChevronRight, Database, FileSpreadsheet, FileText, Library, PenLine, Plus, Search, Table2, Workflow as WorkflowIcon } from 'lucide-react'
import { CheckMark } from '@/components/CheckMark'
import { ExamLogo } from '@/components/ExamLogo'
import { EntityLogo } from '@/components/cowork/EntityLogo'
import { COWORK_ENTITIES, COWORK_RESOURCES } from '@/data/coworkSources'
import { useCoworkLibrary } from '@/hooks/useCoworkLibrary'
import { searchSources, type SourceEntity, type SourceResource } from '@/lib/coworkSources'
import { AREAS, TOOLS, type PracticeArea, type ToolSpec } from '@/lib/tools'
import { CUSTOM_DATA, TEMPLATES, TEMPLATE_PREFIX, kindOfTool, sourceStep, type NewStep } from '@/lib/workflow'
import { examAccentStyle } from '@/lib/examColors'
import { rankMatch } from '@/lib/appSearch'
import { cn } from '@/lib/utils'

/** One exam's concepts, section by section — the concept pages the **+** offers. */
export interface ConceptShelf {
  exam: string
  name: string
  sections: { id: string; title: string; concepts: string[] }[]
}

type Page =
  | { id: 'root' }
  | { id: 'sources' }
  | { id: 'publisher'; entity: SourceEntity }
  | { id: 'data' }
  | { id: 'calc' }
  | { id: 'area'; area: PracticeArea }
  | { id: 'concepts' }
  | { id: 'exam'; shelf: ConceptShelf }
  | { id: 'workflows' }

/** A workflow the + offers as a sub-workflow: one in the reader's library. */
export interface LibraryEntry {
  id: string
  title: string
  steps: number
}

/**
 * **The workflow board's +** — Concept Craft's starter-pack menu, turned
 * into a few pages (docs/workflows.md): the first asks what kind of
 * step to add — a source, data, a calculation or a concept — and each answer
 * opens the next page down, the way a phone's settings do, with a back arrow
 * at the top. A source is a document from Cowork's Sources: the reader's
 * library first, then every publisher's catalogue, or searched for by title.
 * Data is the Data Sources tools, the reader's own data, or a CSV they
 * upload; a calculation is one of the Actuarial Tools, by practice area; a
 * concept is a vault page, by exam and section, or searched for by name; a
 * workflow is one from the reader's library, or a template, as a single step.
 */
export function WorkflowAddMenu({
  shelves,
  allConcepts,
  onAdd,
  onClose,
  usedTools,
  usedConcepts,
  usedSources,
  after,
  library,
  canNest,
  onUploadCsv,
}: {
  /** Every exam's concepts by section; null while the notes are read. */
  shelves: readonly ConceptShelf[] | null
  /** Every concept page's name, for search. */
  allConcepts: readonly string[]
  onAdd: (step: NewStep) => void
  onClose: () => void
  /** How many of each tool the board holds already. */
  usedTools: ReadonlyMap<string, number>
  /** Concepts already on the board (lower-cased) — each goes on once. */
  usedConcepts: ReadonlySet<string>
  /** Source documents already on the board, by resource id — each goes on once. */
  usedSources: ReadonlySet<string>
  /** The step a new one is added after, and connected from — named in the header. */
  after: string | null
  /** The reader's library, offered as sub-workflows (the open workflow left out). */
  library: readonly LibraryEntry[]
  /** Whether a workflow may go on this board — not one that holds it already. */
  canNest: (ref: string) => boolean
  /** A CSV file chosen to upload: read, and put on the board. */
  onUploadCsv: (file: File) => void
}) {
  const fileRef = useRef<HTMLInputElement>(null)
  const ref = useRef<HTMLDivElement>(null)
  const [stack, setStack] = useState<Page[]>([{ id: 'root' }])
  const [query, setQuery] = useState('')
  const page = stack[stack.length - 1]
  const go = (p: Page) => {
    setQuery('')
    setStack(s => [...s, p])
  }
  const back = () => {
    setQuery('')
    setStack(s => (s.length > 1 ? s.slice(0, -1) : s))
  }

  useEffect(() => {
    const onDown = (e: PointerEvent) => {
      const target = e.target as Element | null
      if (target?.closest('[data-workflow-add]')) return
      if (ref.current && !ref.current.contains(target)) onClose()
    }
    const onKey = (e: KeyboardEvent) => {
      if (e.key !== 'Escape') return
      if (stack.length > 1) back()
      else onClose()
    }
    document.addEventListener('pointerdown', onDown)
    window.addEventListener('keydown', onKey)
    return () => {
      document.removeEventListener('pointerdown', onDown)
      window.removeEventListener('keydown', onKey)
    }
  }, [onClose, stack.length])

  const libraryIds = useCoworkLibrary(s => s.resourceIds)
  const libraryDocs = useMemo(() => COWORK_RESOURCES.filter(r => libraryIds.includes(r.id)), [libraryIds])
  const publishers = useMemo(() => new Map(COWORK_ENTITIES.map(e => [e.id, e] as const)), [])
  const sourceMatches = useMemo(() => (query.trim() ? searchSources(COWORK_ENTITIES, COWORK_RESOURCES, query).resources : []), [query])

  const dataTools = TOOLS.filter(t => kindOfTool(t) === 'data')
  const calcAreas = AREAS.filter(a => a.id !== 'data')

  const conceptMatches = useMemo(() => {
    const q = query.trim()
    if (!q) return []
    return allConcepts
      .map(name => ({ name, rank: rankMatch(name, q) }))
      .filter((m): m is { name: string; rank: number } => m.rank !== null)
      .sort((a, b) => a.rank - b.rank || a.name.localeCompare(b.name))
      .slice(0, 60)
      .map(m => m.name)
  }, [query, allConcepts])

  const toolRow = (t: ToolSpec) => (
    <Row
      key={t.id}
      title={t.name}
      subtitle={t.answers}
      onClick={() => onAdd({ kind: kindOfTool(t), ref: t.id })}
      count={usedTools.get(t.id)}
      testId="workflow-add-tool"
      data={t.id}
    />
  )
  const conceptRow = (name: string) => {
    const added = usedConcepts.has(name.toLowerCase())
    return (
      <Row
        key={name}
        title={name}
        added={added}
        onClick={() => onAdd({ kind: 'concept', ref: name })}
        testId="workflow-add-concept"
        data={name}
      />
    )
  }

  const sourceRow = (r: SourceResource, withPublisher = true) => (
    <Row
      key={r.id}
      title={r.title}
      subtitle={[withPublisher ? publishers.get(r.entityId)?.short : null, r.table ? 'Table' : null, r.sample ? 'Sample' : null].filter(Boolean).join(' · ') || undefined}
      icon={r.table ? Table2 : FileText}
      added={usedSources.has(r.id)}
      onClick={() => onAdd(sourceStep(r))}
      testId="workflow-add-source"
      data={r.id}
    />
  )

  let title = 'Add a step'
  let body: ReactNode = null
  switch (page.id) {
    case 'root':
      body = (
        <>
          <NavRow icon={Library} title="Source" subtitle="A document from Sources, and the tables it publishes" onClick={() => go({ id: 'sources' })} testId="workflow-add-sources" />
          <NavRow icon={Database} title="Data" subtitle="Published tables, or your own" onClick={() => go({ id: 'data' })} testId="workflow-add-data" />
          <NavRow icon={Calculator} title="Calculation" subtitle={`${TOOLS.length - dataTools.length} tools in ${calcAreas.length} areas`} onClick={() => go({ id: 'calc' })} testId="workflow-add-calc" />
          <NavRow icon={BookOpen} title="Concept" subtitle="The method or idea a step rests on" onClick={() => go({ id: 'concepts' })} testId="workflow-add-concepts" />
          <NavRow icon={WorkflowIcon} title="Workflow" subtitle="One from your library, or a template, as one step" onClick={() => go({ id: 'workflows' })} testId="workflow-add-workflows" />
        </>
      )
      break
    case 'sources':
      title = 'Source'
      body = query.trim()
        ? sourceMatches.length
          ? sourceMatches.map(r => sourceRow(r))
          : <p className="px-4 py-3 text-sm text-muted-foreground">No documents match “{query.trim()}”.</p>
        : (
            <>
              {libraryDocs.length > 0 && (
                <>
                  <h3 className="px-4 pb-1.5 pt-3 text-xs font-semibold uppercase tracking-wider text-muted-foreground">Your library</h3>
                  {libraryDocs.map(r => sourceRow(r))}
                </>
              )}
              <h3 className="px-4 pb-1.5 pt-3 text-xs font-semibold uppercase tracking-wider text-muted-foreground">Publishers</h3>
              {COWORK_ENTITIES.map(e => (
                <NavRow
                  key={e.id}
                  lead={<EntityLogo entity={e} size="sm" />}
                  title={e.name}
                  subtitle={`${COWORK_RESOURCES.filter(r => r.entityId === e.id).length} documents`}
                  onClick={() => go({ id: 'publisher', entity: e })}
                  testId="workflow-add-publisher"
                />
              ))}
            </>
          )
      break
    case 'publisher':
      title = page.entity.short
      body = COWORK_RESOURCES.filter(r => r.entityId === page.entity.id).map(r => sourceRow(r, false))
      break
    case 'data':
      title = 'Data'
      body = (
        <>
          {dataTools.map(toolRow)}
          <Row
            title="Upload a CSV"
            subtitle="Dates and values to connect to the steps that use them"
            icon={FileSpreadsheet}
            onClick={() => fileRef.current?.click()}
            testId="workflow-add-csv"
          />
          <input
            ref={fileRef}
            type="file"
            accept=".csv,.tsv,.txt,text/csv,text/plain"
            className="hidden"
            onChange={e => {
              const file = e.target.files?.[0]
              e.target.value = ''
              if (file) onUploadCsv(file)
            }}
            data-testid="workflow-csv-input"
          />
          <Row
            title="Your own data"
            subtitle="Describe it, or paste the figures in"
            icon={PenLine}
            onClick={() => onAdd({ kind: 'data', ref: CUSTOM_DATA, label: 'Your data' })}
            testId="workflow-add-custom"
          />
        </>
      )
      break
    case 'workflows':
      title = 'Workflow'
      body = (
        <>
          <h3 className="px-4 pb-1.5 pt-3 text-xs font-semibold uppercase tracking-wider text-muted-foreground">Your library</h3>
          {library.length ? library.map(w => (
            <Row
              key={w.id}
              title={w.title}
              subtitle={canNest(w.id) ? `${w.steps} ${w.steps === 1 ? 'step' : 'steps'}` : 'Holds this workflow already'}
              icon={WorkflowIcon}
              blocked={!canNest(w.id)}
              onClick={() => onAdd({ kind: 'workflow', ref: w.id, label: w.title })}
              testId="workflow-add-library"
              data={w.id}
            />
          )) : (
            <p className="px-4 py-2 text-sm text-muted-foreground">Save a workflow to your library to use it here.</p>
          )}
          <h3 className="px-4 pb-1.5 pt-3 text-xs font-semibold uppercase tracking-wider text-muted-foreground">Templates</h3>
          {TEMPLATES.map(t => (
            <Row
              key={t.id}
              title={t.title}
              subtitle={`${t.steps.length} steps`}
              icon={WorkflowIcon}
              onClick={() => onAdd({ kind: 'workflow', ref: TEMPLATE_PREFIX + t.id, label: t.title })}
              testId="workflow-add-template"
              data={t.id}
            />
          ))}
        </>
      )
      break
    case 'calc':
      title = 'Calculation'
      body = calcAreas.map(a => (
        <NavRow
          key={a.id}
          title={a.label}
          subtitle={`${TOOLS.filter(t => t.area === a.id).length} tools`}
          onClick={() => go({ id: 'area', area: a.id })}
          testId="workflow-add-area"
        />
      ))
      break
    case 'area':
      title = AREAS.find(a => a.id === page.area)?.label ?? 'Calculation'
      body = TOOLS.filter(t => t.area === page.area).map(toolRow)
      break
    case 'concepts':
      title = 'Concept'
      body = query.trim()
        ? conceptMatches.length
          ? conceptMatches.map(conceptRow)
          : <p className="px-4 py-3 text-sm text-muted-foreground">No concept pages match “{query.trim()}”.</p>
        : shelves
          ? shelves.map(shelf => (
              <NavRow
                key={shelf.name}
                lead={<span style={examAccentStyle(shelf.exam)}><ExamLogo examKey={shelf.exam} size="sm" /></span>}
                title={shelf.name}
                subtitle={`${new Set(shelf.sections.flatMap(s => s.concepts)).size} concepts`}
                onClick={() => go({ id: 'exam', shelf })}
                testId="workflow-add-exam"
              />
            ))
          : <p className="px-4 py-3 text-sm text-muted-foreground" role="status">Reading the notes…</p>
      break
    case 'exam':
      title = page.shelf.name
      body = query.trim()
        ? conceptMatches.map(conceptRow)
        : page.shelf.sections.map(section => (
            <section key={section.id} aria-label={section.title}>
              <h3 className="sticky top-0 z-10 bg-popover/95 px-4 pb-1.5 pt-3 text-xs font-semibold uppercase tracking-wider text-muted-foreground backdrop-blur-sm">
                {section.title}
              </h3>
              {section.concepts.map(conceptRow)}
            </section>
          ))
      break
  }

  const searching = page.id === 'concepts' || page.id === 'exam' || page.id === 'sources'
  const searchLabel = page.id === 'sources' ? 'Search documents' : 'Search concept pages'

  return (
    <div
      ref={ref}
      role="menu"
      aria-label={title}
      data-testid="workflow-add-menu"
      className="paper-drop absolute bottom-full right-0 z-50 mb-3 flex h-[min(60dvh,34rem)] w-[min(22rem,calc(100vw-1.5rem))] flex-col overflow-hidden rounded-xl bg-popover text-popover-foreground shadow-xl ring-1 ring-border"
    >
      <div className="flex shrink-0 items-center gap-1 border-b border-border/60 px-2 py-1.5">
        {stack.length > 1 ? (
          <button
            type="button"
            onClick={back}
            aria-label="Back"
            className="rounded-md p-1.5 text-muted-foreground transition-colors hover:bg-accent hover:text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
            data-testid="workflow-add-back"
          >
            <ChevronLeft className="h-4 w-4" />
          </button>
        ) : (
          <span className="w-2" aria-hidden />
        )}
        <div className="min-w-0 flex-1 py-1">
          <p className="truncate text-sm font-semibold">{title}</p>
          {after && page.id === 'root' && <p className="truncate text-xs text-muted-foreground">After {after}</p>}
        </div>
      </div>
      {searching && (
        <label className="mx-3 mt-2 flex shrink-0 items-center gap-2 rounded-lg bg-muted px-2.5 py-1.5 text-sm">
          <Search className="h-4 w-4 shrink-0 text-muted-foreground" aria-hidden />
          <input
            value={query}
            onChange={e => setQuery(e.target.value)}
            placeholder={searchLabel}
            aria-label={searchLabel}
            className="min-w-0 flex-1 bg-transparent outline-none placeholder:text-muted-foreground"
            data-testid="workflow-add-search"
          />
        </label>
      )}
      {/* Keyed by the page, so each one opens at its top and slides in. */}
      <div key={stack.length} className="paper-drop min-h-0 flex-1 overflow-y-auto overscroll-contain py-1 [scrollbar-width:thin]">
        {body}
      </div>
    </div>
  )
}

function NavRow({
  icon: Icon,
  lead,
  title,
  subtitle,
  onClick,
  testId,
}: {
  icon?: typeof Database
  lead?: ReactNode
  title: string
  subtitle?: string
  onClick: () => void
  testId?: string
}) {
  return (
    <button
      type="button"
      role="menuitem"
      onClick={onClick}
      data-testid={testId}
      className="flex w-full items-center gap-3 px-4 py-2.5 text-left transition-colors hover:bg-accent focus-visible:bg-accent focus-visible:outline-none"
    >
      {lead ?? (Icon && (
        <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-muted text-foreground">
          <Icon className="h-4 w-4" aria-hidden />
        </span>
      ))}
      <span className="min-w-0 flex-1">
        <span className="block truncate text-sm font-medium">{title}</span>
        {subtitle && <span className="block truncate text-xs text-muted-foreground">{subtitle}</span>}
      </span>
      <ChevronRight className="h-4 w-4 shrink-0 text-muted-foreground" aria-hidden />
    </button>
  )
}

function Row({
  title,
  subtitle,
  icon: Icon,
  onClick,
  added = false,
  blocked = false,
  count,
  testId,
  data,
}: {
  title: string
  subtitle?: string
  icon?: typeof Database
  onClick: () => void
  /** On the board already, and only allowed once. */
  added?: boolean
  /** Can't go on this board; the subtitle says why. */
  blocked?: boolean
  /** On the board already this many times — a tool may be used more than once. */
  count?: number
  testId?: string
  data?: string
}) {
  return (
    <button
      type="button"
      role="menuitem"
      disabled={added || blocked}
      aria-disabled={added || blocked}
      onClick={onClick}
      data-testid={testId}
      data-ref={data}
      className={cn(
        'flex w-full items-center gap-3 px-4 py-2 text-left transition-colors focus-visible:bg-accent focus-visible:outline-none',
        added || blocked ? 'cursor-default' : 'hover:bg-accent',
        blocked && 'opacity-50',
      )}
    >
      {Icon && (
        <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-muted text-foreground">
          <Icon className="h-4 w-4" aria-hidden />
        </span>
      )}
      <span className="min-w-0 flex-1">
        <span className={cn('block truncate text-sm', added && 'text-muted-foreground')}>{title}</span>
        {subtitle && <span className="line-clamp-2 text-xs text-muted-foreground">{subtitle}</span>}
      </span>
      {added ? (
        <CheckMark className="h-4 w-4" label="On the board" />
      ) : blocked ? null : (
        <span className="flex shrink-0 items-center gap-1.5">
          {!!count && <span className="text-xs tabular-nums text-muted-foreground" title="On the board already">×{count}</span>}
          <span className="flex h-6 w-6 items-center justify-center rounded-full bg-primary text-primary-foreground" aria-hidden>
            <Plus className="h-3.5 w-3.5" />
          </span>
        </span>
      )}
    </button>
  )
}
