// The Tools tab (`/tools`, docs/actuarial-tools.md): actuarial calculators
// that each do one thing, for people here and for AI agents through the MCP
// connector — the same engine either way (`lib/tools`).
//
//   /tools          the catalogue: practice areas, a row per tool, each row
//                   naming the one question its tool answers
//   /tools/:slug    one tool's card, alone; `#input=…` opens a given run (a
//                   share link, a Send to…, an agent's app_url)

import { useCallback, useEffect } from 'react'
import { Link, Navigate, useLocation, useParams } from 'react-router-dom'
import { ArrowLeft, Calculator, Sigma, Landmark, Scale, TrendingUp, type LucideIcon } from 'lucide-react'
import { AREAS, TOOLS, checksFor, decodeRunInput, toolBySlug, toolSlug, type PracticeArea } from '@/lib/tools'
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
import { RESTORE_SCROLL } from '@/lib/routeScrollMemory'

const AREA_ICON: Record<PracticeArea, LucideIcon> = {
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
  return (
    <div className="container mx-auto max-w-3xl space-y-6 px-4 py-8">
      <header>
        <h1 className="text-2xl font-bold tracking-tight">Tools</h1>
      </header>
      {AREAS.map(area => {
        const tools = TOOLS.filter(t => t.area === area.id)
        if (!tools.length) return null
        const Icon = AREA_ICON[area.id]
        return (
          <section key={area.id} className="space-y-2" aria-labelledby={`area-${area.id}`}>
            <h2 id={`area-${area.id}`} className="px-1 text-sm font-semibold text-muted-foreground">{area.label}</h2>
            <ListPanel>
              {tools.map(t => (
                <ListRow
                  key={t.id}
                  to={`/tools/${toolSlug(t)}`}
                  leading={
                    <LogoTile size="lg" className="bg-muted text-foreground">
                      <Icon className="h-6 w-6" aria-hidden />
                    </LogoTile>
                  }
                  title={t.name}
                  subtitle={t.answers}
                  trailing={checksFor(t.id).length > 0 ? <CheckMark className="h-4 w-4" label="Tested against a published worked example" /> : undefined}
                  data-testid="tool-row"
                />
              ))}
            </ListPanel>
          </section>
        )
      })}
    </div>
  )
}

function ToolPage({ slug }: { slug: string }) {
  const location = useLocation()
  const spec = toolBySlug(slug)
  usePageHead(spec ? toolHead(spec.name, spec.answers, toolSlug(spec)) : TOOLS_HEAD)
  const open = useCallback(() => { if (spec) void openMethod(spec.method.concepts) }, [spec])
  if (!spec) return <Navigate to="/tools" replace />
  return (
    <div className="container mx-auto max-w-2xl space-y-3 px-4 py-6">
      <Link
        to="/tools"
        state={RESTORE_SCROLL}
        className="inline-flex items-center gap-1.5 rounded-md py-1 text-sm text-muted-foreground hover:text-foreground"
      >
        <ArrowLeft className="h-4 w-4" aria-hidden /> All tools
      </Link>
      {/* Keyed by the run, so a Send to… or a pasted link starts the card afresh. */}
      <ToolCard key={`${slug}${location.hash}`} spec={spec} initialInput={decodeRunInput(location.hash) ?? undefined} onOpenMethod={open} />
    </div>
  )
}
