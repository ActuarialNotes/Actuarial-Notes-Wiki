// The Tools tab (`/tools`, docs/actuarial-tools.md): actuarial calculators
// that each do one thing, for people here and for AI agents through the MCP
// connector — the same engine either way (`lib/tools`).
//
//   /tools          the catalogue: practice areas, a row per tool, each row
//                   naming the one question its tool answers
//   /tools/:slug    one tool's card, alone; `#input=…` opens a given run (a
//                   share link, a Send to…, an agent's app_url)

import { useCallback, useEffect, useMemo } from 'react'
import { Navigate, useLocation, useParams, useSearchParams } from 'react-router-dom'
import { Calculator, Database, Sigma, Landmark, Scale, TrendingUp, type LucideIcon } from 'lucide-react'
import { AREAS, TOOLS, checksFor, decodeRunInput, toolBySlug, toolSlug, type PracticeArea, type ToolSpec } from '@/lib/tools'
import { searchTools } from '@/lib/toolSearch'
import { highlightMatch } from '@/components/SearchHighlight'
import { ToolsSearchBar } from '@/components/tools/ToolsSearchBar'
import { ToolFigure } from '@/components/tools/ToolFigure'
import { figureFor, type FigureSpec } from '@/lib/toolFigures'
import { runTool } from '@/lib/tools'
import { useBack, usePageLabel } from '@/hooks/useBack'
import { CheckMark } from '@/components/CheckMark'
import { ListPanel, ListRow } from '@/components/ui/ListPanel'
import { LogoTile } from '@/components/LogoTile'
import { ToolCard } from '@/components/tools/ToolCard'
import { ConceptPopup } from '@/components/wiki/ConceptPopup'
import { useConceptPopup } from '@/hooks/useConceptPopup'
import { usePageHead } from '@/hooks/usePageHead'
import { setWikiContentLookup } from '@/lib/github'
import { setWikiIndexBundle } from '@/lib/wikiIndex'
import { TOOLS_HEAD, toolHead } from '@/lib/seo'

const AREA_ICON: Record<PracticeArea, LucideIcon> = {
  data: Database,
  reserving: Landmark,
  ratemaking: TrendingUp,
  distributions: Sigma,
  credibility: Scale,
  finance: Calculator,
}

/**
 * Open a tool's method — its concept pages — in the concept popup. The wiki
 * bundle is fetched on the first tap rather than with the page: a calculator
 * shouldn't wait on megabytes of notes it may never be asked to show.
 */
async function openMethod(concepts: string[]) {
  const { default: bundle } = await import('virtual:wiki-content')
  setWikiContentLookup((path: string) => bundle.files[path])
  setWikiIndexBundle(bundle.index)
  const refs = concepts.filter(name => bundle.files[`Concepts/${name}.md`] !== undefined).map(name => ({ kind: 'concept' as const, name }))
  if (refs.length) useConceptPopup.getState().openAt(refs, 0, null, null, null, { walk: 'corpus' })
}

export default function Tools() {
  const { slug } = useParams()
  useEffect(() => () => useConceptPopup.getState().close(), [])
  // One root, as every page has: the popup beside the page in a fragment
  // would be a second child of the app's content row.
  return (
    <div className="min-w-0">
      {slug ? <ToolPage slug={slug} /> : <Catalogue />}
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
  const searching = query.trim().length > 0

  return (
    <>
      <ToolsSearchBar kind="catalogue" query={query} area={area} onQuery={q => setParam('q', q)} onArea={a => setParam('area', a)} />
      <div className="container mx-auto max-w-3xl space-y-6 px-4 py-6">
        <header>
          <h1 className="text-2xl font-bold tracking-tight">Tools</h1>
        </header>
        {searching ? (
          results.length ? (
            <ListPanel>
              {results.map(t => <ToolRow key={t.id} spec={t} query={query} />)}
            </ListPanel>
          ) : (
            <p className="px-1 text-sm text-muted-foreground" data-testid="tool-no-results">No tools match “{query.trim()}”.</p>
          )
        ) : (
          AREAS.map(a => {
            const tools = TOOLS.filter(t => t.area === a.id)
            if (!tools.length) return null
            return (
              <section key={a.id} className="space-y-2" aria-labelledby={`area-${a.id}`}>
                <h2 id={`area-${a.id}`} className="px-1 text-sm font-semibold text-muted-foreground">{a.label}</h2>
                <ListPanel>
                  {tools.map(t => <ToolRow key={t.id} spec={t} />)}
                </ListPanel>
              </section>
            )
          })
        )}
      </div>
    </>
  )
}

/**
 * A tool's figure in miniature, drawn from its own first example (§6.7): the
 * catalogue's tiles tell eight reserving tools apart by what they draw rather
 * than by eight copies of one icon. Computed once per tool per visit.
 */
const MINIATURES = new Map<string, FigureSpec | null>()
function miniature(spec: ToolSpec): FigureSpec | null {
  if (!MINIATURES.has(spec.id)) {
    let fig: FigureSpec | null = null
    try { fig = figureFor(runTool(spec, {})) } catch { fig = null }
    MINIATURES.set(spec.id, fig)
  }
  return MINIATURES.get(spec.id) ?? null
}

/** One tool in the catalogue: its figure, name and the question it answers, with the tested mark. */
function ToolRow({ spec, query = '' }: { spec: ToolSpec; query?: string }) {
  const Icon = AREA_ICON[spec.area]
  const fig = miniature(spec)
  return (
    <ListRow
      to={`/tools/${toolSlug(spec)}`}
      leading={
        <LogoTile size="lg" className="bg-muted text-foreground">
          {fig ? <ToolFigure figure={fig} compact className="h-12 w-12" /> : <Icon className="h-6 w-6" aria-hidden />}
        </LogoTile>
      }
      title={highlightMatch(spec.name, query)}
      subtitle={highlightMatch(spec.answers, query)}
      subtitleLines={2}
      trailing={checksFor(spec.id).length > 0 ? <CheckMark className="h-4 w-4" label="Tested against a published worked example" /> : undefined}
      data-testid="tool-row"
    />
  )
}

function ToolPage({ slug }: { slug: string }) {
  const location = useLocation()
  const spec = toolBySlug(slug)
  usePageHead(spec ? toolHead(spec.name, spec.answers, toolSlug(spec)) : TOOLS_HEAD)
  usePageLabel(spec?.name)
  const back = useBack({ to: '/tools', label: 'All tools' })
  const open = useCallback(() => { if (spec) void openMethod(spec.method.concepts) }, [spec])
  if (!spec) return <Navigate to="/tools" replace />
  return (
    <>
      <ToolsSearchBar kind="tool" title={spec.name} back={back} />
      <div className="container mx-auto max-w-2xl space-y-3 px-4 py-4">
        {/* Keyed by the run, so a Send to… or a pasted link starts the card afresh. */}
        <ToolCard key={`${slug}${location.hash}`} spec={spec} initialInput={decodeRunInput(location.hash) ?? undefined} onOpenMethod={open} />
      </div>
    </>
  )
}
