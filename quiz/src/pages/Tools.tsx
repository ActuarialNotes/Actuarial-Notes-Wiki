// The Tools tab (`/tools`, docs/actuarial-tools.md): actuarial calculators
// that each do one thing, for people here and for AI agents through the MCP
// connector — the same engine either way (`lib/tools`).
//
//   /tools          the Tools screen: a tab for the exam in focus and one for
//                   every tool, grouped by practice area, a row per tool
//   /tools/:slug    one tool's card, alone; `#input=…` opens a given run (a
//                   share link, a Send to…, an agent's app_url)
//
// The Data Sources tools (area `data`, the published tables) and the
// Assumptions Bank are not here: they are on the Data Sources page
// (`pages/DataSources`, `/data-sources`), which draws a table with this
// file's `ToolPage`. An old `/tools/<table>` or `/tools/assumptions` link is
// sent there with its run kept.

import { useCallback, useEffect, useMemo, useRef, useState, type ReactNode } from 'react'
import { Link, Navigate, useLocation, useParams, useSearchParams } from 'react-router-dom'
import { ChevronLeft } from 'lucide-react'
import { AREAS, decodeRunInput, toolBySlug, toolPath, toolSlug, type PracticeArea, type ToolSpec } from '@/lib/tools'
import { searchTools } from '@/lib/toolSearch'
import { CATALOGUE_AREAS, CATALOGUE_TOOLS } from '@/lib/toolCatalogue'
import { resolveToolsTab } from '@/lib/apply'
import { highlightMatch } from '@/components/SearchHighlight'
import { ToolsSearchBar, type Crumb } from '@/components/tools/ToolsSearchBar'
import { ApplyRow, Chevron } from '@/components/apply/ApplyParts'
import { LevelSquare } from '@/components/LevelSquare'
import { PracticeButton } from '@/components/learn/PracticeButton'
import { GROUND, OUTLINE_ROW_RULE, OUTLINE_TILE } from '@/components/ui/OutlineCard'
import { backLabel, useBack, usePageLabel, type Back } from '@/hooks/useBack'
import { useActionBarHeight } from '@/hooks/useActionBarHeight'
import { useConceptLevels } from '@/hooks/useConceptLevels'
import { practiceSettings, useConceptQuestionCount } from '@/hooks/usePractice'
import { useExamInFocus } from '@/hooks/useExamInFocus'
import { ToolTemplate, type PinnedAnswer } from '@/components/tools/ToolTemplate'
import { FROM_PARAM } from '@/lib/toolTemplate'
import { examForConcepts, toolConcept, toolsForExam } from '@/lib/toolExam'
import { useWikiSyllabus } from '@/hooks/useWikiSyllabus'
import type { MasteryState } from '@/lib/mastery'
import { conceptPracticeUrl, questionCountLabel } from '@/lib/practiceLaunch'
import { RESTORE_SCROLL } from '@/lib/routeScrollMemory'
import { cn } from '@/lib/utils'
import { ConceptPopup } from '@/components/wiki/ConceptPopup'
import { useConceptPopup } from '@/hooks/useConceptPopup'
import { usePageHead } from '@/hooks/usePageHead'
import { installWikiBundle } from '@/lib/wikiBundle'
import { TOOLS_HEAD, toolHead } from '@/lib/seo'

/**
 * Open a tool's method — its concept pages — in the concept popup. The wiki
 * bundle is fetched on the first tap rather than with the page: a calculator
 * shouldn't wait on megabytes of notes it may never be asked to show.
 */
async function openMethod(concepts: string[]) {
  const { default: bundle } = await import('virtual:wiki-content')
  installWikiBundle(bundle)
  const refs = concepts.filter(name => bundle.files[`Concepts/${name}.md`] !== undefined).map(name => ({ kind: 'concept' as const, name }))
  if (refs.length) useConceptPopup.getState().openAt(refs, 0, null, null, null, { walk: 'corpus' })
}

export default function Tools() {
  const { slug } = useParams()
  const location = useLocation()
  useEffect(() => () => useConceptPopup.getState().close(), [])
  // The Assumptions Bank and the published tables moved to Data Sources; an
  // old link (a share, an agent's app_url) lands there with its run.
  if (slug === 'assumptions') return <Navigate to={`/data-sources${location.search}`} replace />
  const spec = slug ? toolBySlug(slug) : undefined
  if (spec && spec.area === 'data') return <Navigate to={`${toolPath(spec)}${location.search}${location.hash}`} replace />
  // One root, as every page has: the popup beside the page in a fragment
  // would be a second child of the app's content row.
  return (
    <div className="min-w-0">
      {slug ? <ToolPage slug={slug} /> : <Catalogue />}
      <ConceptPopup />
    </div>
  )
}

/**
 * The Tools screen (docs/redesign-spec.md §7c.2): a search row, a tab for the
 * exam in focus and one for every tool, and the tools grouped by practice
 * area, each row led by the reader's level on the tool's concept.
 */
function Catalogue() {
  usePageHead(TOOLS_HEAD)
  // The query, the area and the tab ride the URL, so Back from a tool returns
  // to the same list (docs/actuarial-tools.md §6.2). A change of any is the
  // same page, so it replaces rather than pushes.
  const [params, setParams] = useSearchParams()
  const query = params.get('q') ?? ''
  const areaParam = params.get('area')
  const area = CATALOGUE_AREAS.some(a => a.id === areaParam) ? (areaParam as PracticeArea) : null
  const setParam = (key: string, value: string | null) => {
    const next = new URLSearchParams(params)
    if (value) next.set(key, value)
    else next.delete(key)
    if (key === 'q' && !value) next.delete('area')
    setParams(next, { replace: true })
  }
  const results = useMemo(() => searchTools(query, area), [query, area])
  const searching = query.trim().length > 0
  const back = useBack({ to: '/apply', label: 'Apply' })

  // The exam in focus, and the tools its syllabus covers (`lib/toolExam.ts`).
  const { active } = useExamInFocus()
  const examTools = useMemo(() => (active ? toolsForExam(CATALOGUE_TOOLS, active) : []), [active])
  const tab = resolveToolsTab(params.get('tab'), examTools.length)
  // An area on its own (a breadcrumb's "Ratemaking") is that area of every tool.
  const listed = area ? CATALOGUE_TOOLS.filter(t => t.area === area) : tab === 'exam' ? examTools : CATALOGUE_TOOLS
  const { levelOf } = useConceptLevels()
  const row = (t: ToolSpec, q = '') => <ToolRow key={t.id} spec={t} query={q} level={levelOf(toolConcept(t) ?? '')} />

  return (
    <div className={cn(GROUND, 'min-h-dvh')}>
      <ToolsSearchBar
        kind="catalogue"
        query={query}
        area={area}
        onQuery={q => setParam('q', q)}
        onArea={a => setParam('area', a)}
        placeholder={`Search ${CATALOGUE_TOOLS.length} tools`}
      />
      <div className="mx-auto max-w-xl px-5 pb-24 pt-2 sm:px-6">
        <header className="-ml-3 flex items-center gap-1">
          <Link
            to={back.to}
            state={RESTORE_SCROLL}
            onClick={back.onLinkClick}
            aria-label={backLabel(back)}
            title={backLabel(back)}
            className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
            data-testid="tools-back"
          >
            <ChevronLeft className="h-[22px] w-[22px]" strokeWidth={2.5} aria-hidden />
          </Link>
          <h1 className="text-[22px] font-bold">Tools</h1>
        </header>

        {searching ? (
          <div className="pt-5">
            {results.length ? (
              <ToolList>{results.map(t => row(t, query))}</ToolList>
            ) : (
              <p className="text-base" data-testid="tool-no-results">No tools match “{query.trim()}”.</p>
            )}
          </div>
        ) : (
          <div className="flex flex-col gap-[22px] pt-5">
            {active && examTools.length > 0 && !area && (
              <div role="tablist" aria-label="Show" className="flex gap-2" data-testid="tool-tabs">
                <TabChip selected={tab === 'exam'} onSelect={() => setParam('tab', null)} label={active.examLabel} count={examTools.length} />
                <TabChip selected={tab === 'all'} onSelect={() => setParam('tab', 'all')} label="All" count={CATALOGUE_TOOLS.length} />
              </div>
            )}
            {CATALOGUE_AREAS.map(a => {
              const tools = listed.filter(t => t.area === a.id)
              if (!tools.length) return null
              return (
                <section key={a.id} aria-labelledby={`area-${a.id}`} data-testid="tool-area">
                  <h2 id={`area-${a.id}`} className="pb-1.5 text-[15px] font-bold">{a.label}</h2>
                  <ToolList>{tools.map(t => row(t))}</ToolList>
                </section>
              )
            })}
            {/* The published tables and figures a calculator reads from are a page of their own. */}
            {!area && <ApplyRow to="/data-sources" label="Data Sources" testId="data-sources-row" />}
          </div>
        )}
      </div>
    </div>
  )
}

/** One of the screen's two tabs: its name and how many tools it lists, solid when chosen. */
function TabChip({ selected, onSelect, label, count }: { selected: boolean; onSelect: () => void; label: string; count: number }) {
  return (
    <button
      type="button"
      role="tab"
      aria-selected={selected}
      onClick={onSelect}
      className={cn(
        'inline-flex h-[38px] shrink-0 items-center gap-2 rounded-full border-[1.5px] border-foreground px-3.5 text-sm font-bold transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-ground',
        selected ? 'bg-foreground text-ground' : 'text-foreground hover:bg-foreground/10',
      )}
    >
      {label}
      <span className="font-medium tabular-nums">{count}</span>
    </button>
  )
}

/** A practice area's tools as one outlined tile, a hairline between rows. */
function ToolList({ children }: { children: ReactNode }) {
  return <div className={cn(OUTLINE_TILE, 'flex flex-col px-4')}>{children}</div>
}

/**
 * One tool: the reader's level on its concept, its name and a chevron. A
 * search result also says the question the tool answers, where the match may be.
 */
function ToolRow({ spec, query = '', level }: { spec: ToolSpec; query?: string; level: MasteryState }) {
  return (
    <Link
      to={toolPath(spec)}
      className={cn(OUTLINE_ROW_RULE, 'flex min-h-[54px] items-center gap-3 py-2 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring')}
      data-testid="tool-row"
    >
      <LevelSquare state={level} size="sm" className="h-4 w-4 rounded-[4px]" />
      <span className="min-w-0 flex-1">
        <span className="block truncate text-[17px] font-medium">{highlightMatch(spec.name, query)}</span>
        {query && <span className="line-clamp-2 text-sm">{highlightMatch(spec.answers, query)}</span>}
      </span>
      <Chevron />
    </Link>
  )
}

/** A table's first breadcrumb step: Back when the page left was Data Sources, else a link to it. */
function dataSourcesCrumb(back: Back): Crumb {
  return back.fromTrail && /^\/data-sources\/?(\?|$)/.test(back.to) ? { label: 'Data Sources', back } : { label: 'Data Sources', to: '/data-sources' }
}

/** The breadcrumb's first step: Back when the page left was the catalogue, else a link to it. */
function toolsCrumb(back: Back): Crumb {
  return back.fromTrail && /^\/tools\/?(\?|$)/.test(back.to) ? { label: 'Tools', back } : { label: 'Tools', to: '/tools' }
}

/**
 * One tool's page. Drawn here for a calculator (`/tools/<slug>`) and by the
 * Data Sources page for a published table (`/data-sources/<slug>`), whose way
 * back and breadcrumb lead to Data Sources instead.
 */
export function ToolPage({ slug }: { slug: string }) {
  const location = useLocation()
  const [params] = useSearchParams()
  const spec = toolBySlug(slug)
  // The tool that sent this run (Gives to): its values arrive linked, and it joins the breadcrumb.
  const sender = toolBySlug(params.get(FROM_PARAM) ?? '')
  const table = spec?.area === 'data'
  usePageHead(spec ? toolHead(spec.name, spec.answers, toolPath(spec)) : TOOLS_HEAD)
  usePageLabel(spec?.name)
  const back = useBack(table ? { to: '/data-sources', label: 'Data Sources' } : { to: '/tools', label: 'Tools' })
  const open = useCallback(() => { if (spec) void openMethod(spec.method.concepts) }, [spec])
  const { syllabi } = useWikiSyllabus()
  // The exam that first teaches the method: the colour its sheets and marks take (§19).
  const examKey = useMemo(() => (spec ? examForConcepts(spec.method.concepts, syllabi) : null), [spec, syllabi])
  const [pinned, setPinned] = useState<PinnedAnswer | null>(null)
  // The tool's concept: the reader's level on it, and the questions "Practice this" starts.
  const concept = spec ? toolConcept(spec) : null
  const { levelOf } = useConceptLevels()
  const questionCount = useConceptQuestionCount(concept)
  const footRef = useRef<HTMLDivElement>(null)
  const hasFoot = !!concept && !!questionCount
  useActionBarHeight(footRef, hasFoot)
  if (!spec) return <Navigate to={table === false ? '/tools' : '/data-sources'} replace />
  const areaLabel = AREAS.find(a => a.id === spec.area)?.label ?? spec.area
  const senderPath = sender ? toolPath(sender) : null
  const crumbs: Crumb[] = [
    ...(table
      ? [dataSourcesCrumb(back)]
      : [toolsCrumb(back), { label: areaLabel, to: `/tools?area=${spec.area}` }]),
    ...(sender && senderPath
      ? [back.fromTrail && back.to.split(/[?#]/)[0] === senderPath ? { label: sender.name, back } : { label: sender.name, to: senderPath }]
      : []),
    { label: spec.name },
  ]
  return (
    <>
      <ToolsSearchBar
        kind="tool"
        title={spec.name}
        back={back}
        crumbs={crumbs}
        pinned={pinned ? <PinnedPill answer={pinned} /> : null}
      />
      <div className="container mx-auto max-w-2xl space-y-3 px-4 py-4">
        {/* Keyed by the run, so a Send to… or a pasted link starts the card afresh. */}
        <ToolTemplate
            key={`${slug}${location.search}${location.hash}`}
            spec={spec}
            initialInput={decodeRunInput(location.hash) ?? undefined}
            sender={sender ? toolSlug(sender) : null}
            onOpenMethod={open}
            persist
            examKey={examKey}
            methodLevel={concept ? levelOf(concept) : undefined}
            onPinAnswer={setPinned}
          />
      </div>
      {/* The page's one filled button (docs/redesign-spec.md §7c.3): a quiz on the
          tool's concept. Not drawn for a concept no question is tagged with. */}
      {hasFoot && (
        <div
          ref={footRef}
          className="sticky bottom-[var(--place-bar-height,0px)] z-30 border-t border-border bg-background px-4 pb-[max(0.75rem,env(safe-area-inset-bottom))] pt-3"
        >
          <div className="mx-auto max-w-2xl">
            <PracticeButton to={conceptPracticeUrl(concept, questionCount, practiceSettings())} aside={questionCountLabel(questionCount)}>
              Practice this
            </PracticeButton>
          </div>
        </div>
      )}
    </>
  )
}

/** The answer in the title strip, outlined as its card is, while the card is scrolled away. */
function PinnedPill({ answer }: { answer: PinnedAnswer }) {
  return (
    <span
      className="inline-flex shrink-0 items-baseline gap-1.5 rounded-full border-[1.5px] border-foreground px-3 py-1 text-sm"
      data-testid="tool-pinned-answer"
    >
      <span className="text-xs">{answer.symbol}</span>
      <span className="font-bold tabular-nums">{answer.value}</span>
    </span>
  )
}
