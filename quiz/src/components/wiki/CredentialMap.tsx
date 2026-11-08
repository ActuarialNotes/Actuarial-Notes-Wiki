// The three societies' credentials on one map — the Credential Path page's
// `%%credential-map%%` line. Probability and Financial Mathematics are one
// trunk that splits into the SOA's route (ASA, FSA) and the CAS's (ACAS,
// FCAS); the CIA's route (ACIA, FCIA) starts from an accredited degree, and
// dashed lines say an SOA or CAS credential carries credit into it, which is
// the CIA's Pathways 2 and 3 (`data/credentialPaths.ts`, the CIA's start).
//
// Each node is a button: tapping one lights its route from the start and
// opens that stage underneath — its blurb and requirements, the same rows the
// route on a designation page draws, and a link to the designation's own page.
// It opens on the reader's society's associateship, so the page is complete
// before anything is tapped. Nothing here is authored: every stage, name and
// requirement is the path data, so the map can't disagree with the routes.

import { useState, type MouseEvent } from 'react'
import { loadGuideBody, type GuideBody } from '@/lib/bodyFilter'
import type { WikiEntryRef } from '@/lib/wikiRoutes'
import { cn } from '@/lib/utils'
import { CREDENTIAL_PATHS } from '@/data/credentialPaths'
import { ItemRow, PageLink } from '@/components/wiki/CredentialPath'

type OpenRef = (ref: WikiEntryRef, e: MouseEvent<HTMLAnchorElement>) => void

interface MapNode {
  id: string
  label: string
  /** Centre, in the 320 × 220 drawing. */
  x: number
  y: number
  body: GuideBody
  stage: number
}

// Rows: SOA at the top, CAS in the middle, CIA at the bottom. The shared start
// sits between the SOA and CAS rows, since both branch off it.
const W = 320
const H = 220
const NODES: MapNode[] = [
  { id: 'P', label: 'P', x: 26, y: 70, body: 'SOA', stage: 0 },
  { id: 'FM', label: 'FM', x: 78, y: 70, body: 'SOA', stage: 0 },
  { id: 'ASA', label: CREDENTIAL_PATHS.SOA.stages[1].short, x: 168, y: 26, body: 'SOA', stage: 1 },
  { id: 'FSA', label: CREDENTIAL_PATHS.SOA.stages[2].short, x: 248, y: 26, body: 'SOA', stage: 2 },
  { id: 'ACAS', label: CREDENTIAL_PATHS.CAS.stages[1].short, x: 168, y: 114, body: 'CAS', stage: 1 },
  { id: 'FCAS', label: CREDENTIAL_PATHS.CAS.stages[2].short, x: 248, y: 114, body: 'CAS', stage: 2 },
  { id: 'DEG', label: 'Degree', x: 52, y: 194, body: 'CIA', stage: 0 },
  { id: 'ACIA', label: CREDENTIAL_PATHS.CIA.stages[1].short, x: 168, y: 194, body: 'CIA', stage: 1 },
  { id: 'FCIA', label: CREDENTIAL_PATHS.CIA.stages[2].short, x: 248, y: 194, body: 'CIA', stage: 2 },
]

interface Edge {
  from: string
  to: string
  /** Credit carried across, not the society's own route. */
  credit?: boolean
}

const EDGES: Edge[] = [
  { from: 'P', to: 'FM' },
  { from: 'FM', to: 'ASA' },
  { from: 'FM', to: 'ACAS' },
  { from: 'ASA', to: 'FSA' },
  { from: 'ACAS', to: 'FCAS' },
  { from: 'DEG', to: 'ACIA' },
  { from: 'ACIA', to: 'FCIA' },
  { from: 'ACAS', to: 'ACIA', credit: true },
  { from: 'FCAS', to: 'FCIA', credit: true },
]

const ROW_LABELS: { body: GuideBody; y: number }[] = [
  { body: 'SOA', y: 26 },
  { body: 'CAS', y: 114 },
  { body: 'CIA', y: 194 },
]

const node = (id: string) => NODES.find(n => n.id === id)!

/** The nodes on the route to a stage — what a selection lights up. */
function routeTo(body: GuideBody, stage: number): Set<string> {
  const lit = NODES.filter(n => n.body === body && n.stage <= stage && n.stage > 0).map(n => n.id)
  const start = body === 'CIA' ? ['DEG'] : ['P', 'FM']
  return new Set([...start, ...lit])
}

function edgePath(e: Edge): string {
  const a = node(e.from)
  const b = node(e.to)
  if (a.y === b.y) return `M${a.x} ${a.y} H${b.x}`
  if (e.credit) return `M${a.x} ${a.y} V${b.y}`
  const mid = (a.x + b.x) / 2
  return `M${a.x} ${a.y} C${mid} ${a.y} ${mid} ${b.y} ${b.x} ${b.y}`
}

export function CredentialMap({ onOpen }: { onOpen: OpenRef }) {
  const [selected, setSelected] = useState<{ body: GuideBody; stage: number }>(() => ({
    body: loadGuideBody() ?? 'SOA',
    stage: 1,
  }))
  const lit = routeTo(selected.body, selected.stage)
  const path = CREDENTIAL_PATHS[selected.body]
  const stage = path.stages[selected.stage]
  const isSelected = (n: MapNode) =>
    n.body === selected.body && n.stage === selected.stage && (n.stage > 0 || n.id !== 'P')

  // The shared start belongs to both the SOA and the CAS; tapping it keeps
  // whichever of the two is selected.
  function choose(n: MapNode) {
    if (n.stage === 0 && n.body !== 'CIA') {
      setSelected(prev => ({ body: prev.body === 'CIA' ? 'SOA' : prev.body, stage: 0 }))
    } else {
      setSelected({ body: n.body, stage: n.stage })
    }
  }

  return (
    <section
      data-credential-map=""
      aria-label="Actuarial credentials, by society"
      className="not-prose my-6 first:mt-0 rounded-xl border border-border/70 p-4 sm:p-5"
    >
      <div className="relative mx-auto w-full max-w-md" style={{ aspectRatio: `${W} / ${H}` }}>
        <svg
          viewBox={`0 0 ${W} ${H}`}
          preserveAspectRatio="none"
          className="absolute inset-0 h-full w-full overflow-visible"
          aria-hidden="true"
        >
          {EDGES.map(e => {
            const on = !e.credit && lit.has(e.from) && lit.has(e.to)
            return (
              <path
                key={`${e.from}-${e.to}`}
                d={edgePath(e)}
                fill="none"
                vectorEffect="non-scaling-stroke"
                strokeWidth={on ? 2.5 : 1.5}
                strokeDasharray={e.credit ? '4 4' : undefined}
                className={on ? 'stroke-foreground' : 'stroke-border'}
              />
            )
          })}
        </svg>
        {ROW_LABELS.map(r => (
          <span
            key={r.body}
            className="absolute right-0 -translate-y-1/2 text-[11px] font-semibold uppercase tracking-wide text-muted-foreground"
            style={{ top: `${(r.y / H) * 100}%` }}
          >
            {r.body}
          </span>
        ))}
        {NODES.map(n => {
          const on = lit.has(n.id)
          const sel = isSelected(n)
          return (
            <button
              key={n.id}
              type="button"
              onClick={() => choose(n)}
              aria-pressed={sel}
              aria-label={n.stage === 0 ? `${n.label}: ${CREDENTIAL_PATHS[n.body].stages[0].title}` : n.label}
              className={cn(
                'absolute -translate-x-1/2 -translate-y-1/2 whitespace-nowrap rounded-full px-2.5 py-1 text-xs font-semibold transition-colors',
                'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-1 focus-visible:ring-offset-background',
                on ? 'bg-foreground text-background' : 'bg-muted text-muted-foreground hover:bg-accent hover:text-foreground',
                sel && 'ring-2 ring-foreground ring-offset-2 ring-offset-background',
              )}
              style={{ left: `${(n.x / W) * 100}%`, top: `${(n.y / H) * 100}%` }}
            >
              {n.label}
            </button>
          )
        })}
      </div>
      <p className="mt-3 text-xs text-muted-foreground">
        Dashed: an SOA or CAS credential carries credit into the CIA's.
      </p>

      <div className="mt-4 border-t border-border/60 pt-4" aria-live="polite">
        <p className="text-xs font-medium uppercase tracking-wide text-muted-foreground">{path.name}</p>
        <h3 className="mt-1 text-base font-semibold text-foreground">
          {stage.ref ? <PageLink refTo={stage.ref} onOpen={onOpen}>{stage.title}</PageLink> : stage.title}
        </h3>
        <p className="mt-1 text-sm leading-relaxed text-muted-foreground">{stage.blurb}</p>
        <ul className="mt-2">
          {stage.items.map(item => (
            <ItemRow key={item.name} item={item} progress={null} onOpen={onOpen} />
          ))}
        </ul>
      </div>
    </section>
  )
}
