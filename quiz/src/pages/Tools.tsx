// The Tools tab (`/tools`, docs/actuarial-tools.md): actuarial calculators
// that each do one thing, for people here and for AI agents through the MCP
// connector — the same engine either way (`lib/tools`).
//
//   /tools          the catalogue: practice areas, a row per tool, each row
//                   naming the one question its tool answers
//   /tools/:slug    one tool's card, alone; `#input=…` opens a given run (a
//                   share link, a Send to…, an agent's app_url)
//   /tools/assumptions
//                   the Assumptions Bank's shelf (docs/assumptions-bank.md):
//                   published figures, each linking into the tools that take it

import { useCallback, useEffect, useMemo, useState } from 'react'
import { Navigate, useLocation, useParams, useSearchParams } from 'react-router-dom'
import type { Back } from '@/hooks/useBack'
import { Link } from 'react-router-dom'
import { BookMarked } from 'lucide-react'
import { AssumptionsShelf } from '@/components/assumptions/AssumptionsShelf'
import { AREAS, TOOLS, decodeRunInput, toolBySlug, toolSlug, type PracticeArea, type ToolSpec } from '@/lib/tools'
import { searchTools } from '@/lib/toolSearch'
import { highlightMatch } from '@/components/SearchHighlight'
import { ToolsSearchBar, type Crumb } from '@/components/tools/ToolsSearchBar'
import { useBack, usePageLabel } from '@/hooks/useBack'
import { ListPanel, ListRow } from '@/components/ui/ListPanel'
import { LogoTile } from '@/components/LogoTile'
import { ToolTemplate, type PinnedAnswer } from '@/components/tools/ToolTemplate'
import { FROM_PARAM } from '@/lib/toolTemplate'
import { examForConcepts } from '@/lib/toolExam'
import { examAccentStyle } from '@/lib/examColors'
import { useWikiSyllabus } from '@/hooks/useWikiSyllabus'
import type { WikiExamSyllabus } from '@/lib/wikiParser'
import { readRecent, type RecentTool } from '@/lib/toolRecent'
import { inkChip } from '@/components/ui/ink'
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

/** Open the resource page a set of published figures was read from, in the popup. */
async function openResource(name: string) {
  const { default: bundle } = await import('virtual:wiki-content')
  installWikiBundle(bundle)
  useConceptPopup.getState().openAt([{ kind: 'resource', name }], 0, null, null, null, { walk: 'corpus' })
}

/** The route segment of the Assumptions Bank's shelf — never a tool's slug. */
const ASSUMPTIONS_SLUG = 'assumptions'

export default function Tools() {
  const { slug } = useParams()
  useEffect(() => () => useConceptPopup.getState().close(), [])
  // One root, as every page has: the popup beside the page in a fragment
  // would be a second child of the app's content row.
  return (
    <div className="min-w-0">
      {slug === ASSUMPTIONS_SLUG ? <AssumptionsPage /> : slug ? <ToolPage slug={slug} /> : <Catalogue />}
      <ConceptPopup />
    </div>
  )
}

function Catalogue() {
  usePageHead(TOOLS_HEAD)
  // The query and the area ride the URL, so Back from a tool returns to the
  // same results (docs/actuarial-tools.md §6.2). A change of either is the
  // same page, so it replaces rather than pushes.
  const [params, setParams] = useSearchParams()
  const query = params.get('q') ?? ''
  const areaParam = params.get('area')
  const area = AREAS.some(a => a.id === areaParam) ? (areaParam as PracticeArea) : null
  const setParam = (key: string, value: string | null) => {
    const next = new URLSearchParams(params)
    if (value) next.set(key, value)
    else next.delete(key)
    if (key === 'q' && !value) next.delete('area')
    setParams(next, { replace: true })
  }
  const results = useMemo(() => searchTools(query, area), [query, area])
  const { syllabi } = useWikiSyllabus()
  const searching = query.trim().length > 0
  // An area with no query (a breadcrumb's "Ratemaking") shows that area alone.
  const shownAreas = !searching && area ? AREAS.filter(a => a.id === area) : AREAS

  return (
    <>
      <ToolsSearchBar kind="catalogue" query={query} area={area} onQuery={q => setParam('q', q)} onArea={a => setParam('area', a)} />
      <div className="container mx-auto max-w-3xl space-y-6 px-4 py-6">
        <header className="space-y-3">
          <h1 className="text-2xl font-bold tracking-tight">Tools</h1>
          {/* The areas, always on screen: a reader jumps to Credibility without scrolling (v3 §5). */}
          {!searching && (
            <div className="-mx-4 flex gap-1.5 overflow-x-auto px-4 pb-1 [mask-image:linear-gradient(90deg,#000_85%,transparent)]" role="group" aria-label="Area" data-testid="tool-areas">
              <button type="button" onClick={() => setParam('area', null)} className={cn(inkChip(area === null), 'shrink-0')} aria-pressed={area === null}>All</button>
              {AREAS.map(a => (
                <button key={a.id} type="button" onClick={() => setParam('area', a.id)} className={cn(inkChip(area === a.id), 'shrink-0')} aria-pressed={area === a.id}>
                  {a.label}
                </button>
              ))}
            </div>
          )}
        </header>
        {!searching && !area && <RecentTools syllabi={syllabi} />}
        {searching ? (
          results.length ? (
            <ListPanel>
              {results.map(t => <ToolRow key={t.id} spec={t} query={query} syllabi={syllabi} />)}
            </ListPanel>
          ) : (
            <p className="px-1 text-sm text-muted-foreground" data-testid="tool-no-results">No tools match “{query.trim()}”.</p>
          )
        ) : (
          <>
            {shownAreas.map(a => {
              const tools = TOOLS.filter(t => t.area === a.id)
              if (!tools.length) return null
              return (
                <section key={a.id} className="space-y-2" aria-labelledby={`area-${a.id}`}>
                  <h2 id={`area-${a.id}`} className="px-1 text-sm font-semibold text-muted-foreground">{a.label}</h2>
                  <ListPanel>
                    {tools.map(t => <ToolRow key={t.id} spec={t} syllabi={syllabi} />)}
                  </ListPanel>
                  {/* Beside the published tables, the published figures (D-AB2): a shelf, not a tool, so a card of its own. */}
                  {a.id === 'data' && <ListPanel><AssumptionsRow /></ListPanel>}
                </section>
              )
            })}
          </>
        )}
      </div>
    </>
  )
}

/**
 * The tool's colour: the exam that first teaches its method (`lib/toolExam.ts`),
 * as a dot. The question it answers says what it is; the colour says where on
 * the ladder it is taught.
 */
function ExamDot({ spec, syllabi }: { spec: ToolSpec; syllabi: readonly WikiExamSyllabus[] }) {
  const exam = examForConcepts(spec.method.concepts, syllabi)
  return (
    <span
      style={exam ? examAccentStyle(exam) : undefined}
      className="ml-1 h-2.5 w-2.5 shrink-0 rounded-full bg-[var(--exam-accent-vivid,hsl(var(--muted-foreground)/0.5))]"
      aria-hidden
      data-testid="tool-exam-dot"
    />
  )
}

/** One tool in the catalogue: its exam's dot, its name and the question it answers. */
function ToolRow({ spec, query = '', syllabi }: { spec: ToolSpec; query?: string; syllabi: readonly WikiExamSyllabus[] }) {
  return (
    <ListRow
      to={`/tools/${toolSlug(spec)}`}
      leading={<ExamDot spec={spec} syllabi={syllabi} />}
      title={highlightMatch(spec.name, query)}
      subtitle={highlightMatch(spec.answers, query)}
      subtitleLines={2}
      data-testid="tool-row"
    />
  )
}

/** "Pick up where you left off": the tools used last on this device, each with the answer it showed. */
function RecentTools({ syllabi }: { syllabi: readonly WikiExamSyllabus[] }) {
  const [recent] = useState<RecentTool[]>(() => readRecent())
  const shown = recent.map(r => ({ r, spec: toolBySlug(r.slug) })).filter((x): x is { r: RecentTool; spec: ToolSpec } => !!x.spec).slice(0, 3)
  if (!shown.length) return null
  return (
    <section className="space-y-2" aria-labelledby="tools-recent">
      <h2 id="tools-recent" className="px-1 text-sm font-semibold text-muted-foreground">Pick up where you left off</h2>
      <div className="-mx-4 flex gap-2.5 overflow-x-auto px-4 pb-1">
        {shown.map(({ r, spec }) => {
          const exam = examForConcepts(spec.method.concepts, syllabi)
          return (
            <Link
              key={r.slug}
              to={`/tools/${r.slug}`}
              style={exam ? examAccentStyle(exam) : undefined}
              className="w-40 shrink-0 rounded-2xl bg-[var(--exam-accent-soft,hsl(var(--card)))] px-3.5 py-3 transition-colors hover:brightness-110"
              data-testid="tool-recent"
            >
              <span className="block truncate text-xs text-muted-foreground">{spec.name}</span>
              <span className="mt-1 block truncate text-xl font-bold tabular-nums">{r.value}</span>
            </Link>
          )
        })}
      </div>
    </section>
  )
}

/** The Assumptions Bank's row in the catalogue, under the Data Sources. */
function AssumptionsRow() {
  return (
    <ListRow
      to={`/tools/${ASSUMPTIONS_SLUG}`}
      leading={
        <LogoTile size="lg" className="bg-muted text-foreground">
          <BookMarked className="h-6 w-6" aria-hidden />
        </LogoTile>
      }
      title="Assumptions Bank"
      subtitle="Figures from published documents, each with its page"
      subtitleLines={2}
      data-testid="assumptions-row"
    />
  )
}

function AssumptionsPage() {
  usePageHead(TOOLS_HEAD)
  usePageLabel('Assumptions Bank')
  const back = useBack({ to: '/tools', label: 'All tools' })
  return (
    <>
      <ToolsSearchBar kind="tool" title="Assumptions Bank" back={back} crumbs={[toolsCrumb(back), { label: 'Assumptions Bank' }]} />
      <div className="container mx-auto max-w-2xl space-y-3 px-4 py-4">
        <AssumptionsShelf onReadSource={name => void openResource(name)} />
      </div>
    </>
  )
}

/** The breadcrumb's first step: Back when the page left was the catalogue, else a link to it. */
function toolsCrumb(back: Back): Crumb {
  return back.fromTrail && /^\/tools\/?(\?|$)/.test(back.to) ? { label: 'Tools', back } : { label: 'Tools', to: '/tools' }
}

function ToolPage({ slug }: { slug: string }) {
  const location = useLocation()
  const [params] = useSearchParams()
  const spec = toolBySlug(slug)
  // The tool that sent this run (Gives to): its values arrive linked, and it joins the breadcrumb.
  const sender = toolBySlug(params.get(FROM_PARAM) ?? '')
  usePageHead(spec ? toolHead(spec.name, spec.answers, toolSlug(spec)) : TOOLS_HEAD)
  usePageLabel(spec?.name)
  const back = useBack({ to: '/tools', label: 'All tools' })
  const open = useCallback(() => { if (spec) void openMethod(spec.method.concepts) }, [spec])
  const { syllabi } = useWikiSyllabus()
  // The exam that first teaches the method: the colour the template takes (§19).
  const examKey = useMemo(() => (spec ? examForConcepts(spec.method.concepts, syllabi) : null), [spec, syllabi])
  const [pinned, setPinned] = useState<PinnedAnswer | null>(null)
  if (!spec) return <Navigate to="/tools" replace />
  const areaLabel = AREAS.find(a => a.id === spec.area)?.label ?? spec.area
  const senderPath = sender ? `/tools/${toolSlug(sender)}` : null
  const crumbs: Crumb[] = [
    toolsCrumb(back),
    { label: areaLabel, to: `/tools?area=${spec.area}` },
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
        pinned={pinned ? <PinnedPill answer={pinned} examKey={examKey} /> : null}
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
            onPinAnswer={setPinned}
          />
      </div>
    </>
  )
}

/** The answer in the title strip, in the exam's wash, while the answer card is scrolled away. */
function PinnedPill({ answer, examKey }: { answer: PinnedAnswer; examKey: string | null }) {
  return (
    <span
      style={examKey ? examAccentStyle(examKey) : undefined}
      className="inline-flex shrink-0 items-baseline gap-1.5 rounded-full bg-[var(--exam-accent-soft,hsl(var(--foreground)/0.07))] px-3 py-1 text-sm"
      data-testid="tool-pinned-answer"
    >
      <span className="text-xs text-muted-foreground">{answer.symbol}</span>
      <span className="font-bold tabular-nums">{answer.value}</span>
    </span>
  )
}
