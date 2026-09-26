// The credential path on the "How to Study for Actuarial Exams" guide: pick a
// society, then walk its four stages — the shared start, associateship,
// fellowship, and the continuing education that keeps the letters current.
//
// It stands in for the guide's `%%credential-path%%` line (see
// `data/credentialPaths.ts`, which holds the stages and keeps them in step
// with `data/tracks.ts`). The stages are a tab list: one row of pills joined by
// a line, the last joined by a dashed one because it never ends, and the open
// stage's requirements underneath. Exams lead their row with the same logo
// tile the Study Guides grid uses, so the colours climb the same ladder; the
// courses, modules and credentials get a neutral tile with a glyph.
//
// A requirement with a vault page opens it the way any link in the article
// does — through `onOpen`, which is the article's own link handler.

import { useRef, useState, type KeyboardEvent, type MouseEvent, type ReactNode } from 'react'
import { RefreshCw } from 'lucide-react'
import { SegmentedControl } from '@/components/ui/SegmentedControl'
import { ExamLogo } from '@/components/ExamLogo'
import { LogoTile } from '@/components/LogoTile'
import { loadBody, type ExamBody } from '@/lib/bodyFilter'
import { wikiRoute, type WikiEntryRef } from '@/lib/wikiRoutes'
import { cn } from '@/lib/utils'
import {
  CREDENTIAL_PATHS,
  type PathItem,
  type PathStage,
} from '@/data/credentialPaths'

type OpenRef = (ref: WikiEntryRef, e: MouseEvent<HTMLAnchorElement>) => void

const BODY_OPTIONS = [
  { value: 'SOA' as const, label: 'SOA' },
  { value: 'CAS' as const, label: 'CAS' },
]

function PageLink({
  refTo,
  onOpen,
  className,
  children,
}: {
  refTo: WikiEntryRef
  onOpen: OpenRef
  className?: string
  children: ReactNode
}) {
  return (
    <a
      href={wikiRoute(refTo)}
      className={cn('underline decoration-muted-foreground/50 underline-offset-2 hover:decoration-foreground', className)}
      onClick={e => {
        if (e.metaKey || e.ctrlKey || e.shiftKey || e.button !== 0) return
        onOpen(refTo, e)
      }}
    >
      {children}
    </a>
  )
}

function ItemTile({ item }: { item: PathItem }) {
  if (item.exam) return <ExamLogo examKey={item.exam} size="sm" />
  const Icon = item.icon
  return (
    <LogoTile size="sm" className="bg-muted text-muted-foreground">
      {Icon && <Icon className="h-3.5 w-3.5" />}
    </LogoTile>
  )
}

function ItemRow({ item, onOpen }: { item: PathItem; onOpen: OpenRef }) {
  return (
    <li className="flex items-start gap-3 py-2">
      <ItemTile item={item} />
      <div className="min-w-0 flex-1 leading-snug">
        <p className="text-sm font-medium text-foreground">
          {item.ref ? <PageLink refTo={item.ref} onOpen={onOpen}>{item.name}</PageLink> : item.name}
        </p>
        {item.note && <p className="mt-0.5 text-sm text-muted-foreground">{item.note}</p>}
      </div>
    </li>
  )
}

function StageDetail({ stage, onOpen }: { stage: PathStage; onOpen: OpenRef }) {
  return (
    <>
      <h3 className="text-base font-semibold text-foreground">
        {stage.ref ? <PageLink refTo={stage.ref} onOpen={onOpen}>{stage.title}</PageLink> : stage.title}
      </h3>
      <p className="mt-1 text-sm text-muted-foreground leading-relaxed">{stage.blurb}</p>
      <ul className="mt-2">
        {stage.items.map(item => <ItemRow key={item.name} item={item} onOpen={onOpen} />)}
      </ul>
      {stage.optional && (
        <div className="mt-3 border-t border-border/60 pt-3">
          <p className="text-xs font-medium uppercase tracking-wide text-muted-foreground">
            {stage.optional.heading}
          </p>
          <ul className="mt-1">
            {stage.optional.items.map(item => <ItemRow key={item.name} item={item} onOpen={onOpen} />)}
          </ul>
        </div>
      )}
    </>
  )
}

export function CredentialPath({ onOpen }: { onOpen: OpenRef }) {
  // Open on the society the reader last picked on the Quiz or Study Guides
  // tab. Choosing one here doesn't change that choice — this is a page to
  // compare the two on, not a setting.
  const [body, setBody] = useState<ExamBody>(() => loadBody() ?? 'SOA')
  // The stage is kept by position, so flipping society keeps you at the same
  // point on the path (fellowship on one, fellowship on the other).
  const [index, setIndex] = useState(0)
  const tabsRef = useRef<HTMLDivElement>(null)

  const path = CREDENTIAL_PATHS[body]
  const stages = path.stages
  const at = Math.min(index, stages.length - 1)
  const stage = stages[at]
  const panelId = `credential-path-${body}-panel`

  function select(next: number) {
    setIndex(next)
    tabsRef.current?.querySelector<HTMLButtonElement>(`[data-stage="${next}"]`)?.focus()
  }

  function handleKeyDown(e: KeyboardEvent) {
    const last = stages.length - 1
    const next = e.key === 'ArrowRight' ? (at === last ? 0 : at + 1)
      : e.key === 'ArrowLeft' ? (at === 0 ? last : at - 1)
      : e.key === 'Home' ? 0
      : e.key === 'End' ? last
      : null
    if (next === null) return
    e.preventDefault()
    select(next)
  }

  return (
    <section
      data-credential-path=""
      aria-label="Path to a credential"
      className="not-prose my-6 rounded-xl border border-border/70 p-4 sm:p-5"
    >
      <div className="flex items-center justify-between gap-3">
        <p className="text-sm font-medium text-foreground">{path.name}</p>
        <SegmentedControl
          value={body}
          onChange={setBody}
          options={BODY_OPTIONS}
          label="Society"
          size="sm"
          pill
          className="w-32 shrink-0"
        />
      </div>

      <div
        ref={tabsRef}
        role="tablist"
        aria-label={`${body} path stages`}
        onKeyDown={handleKeyDown}
        className="mt-4 flex items-center"
      >
        {stages.map((s, i) => {
          const selected = i === at
          return (
            <div key={s.kind} className={cn('flex items-center', i > 0 && 'flex-1')}>
              {i > 0 && (
                <span
                  aria-hidden="true"
                  className={cn(
                    'mx-1 flex-1 border-t',
                    s.kind === 'ongoing' ? 'border-dashed border-muted-foreground/50' : 'border-border',
                  )}
                />
              )}
              <button
                type="button"
                role="tab"
                id={`credential-path-${body}-${s.kind}`}
                data-stage={i}
                aria-selected={selected}
                aria-controls={panelId}
                tabIndex={selected ? 0 : -1}
                onClick={() => setIndex(i)}
                className={cn(
                  'inline-flex h-8 shrink-0 items-center gap-1 rounded-full px-3 text-xs font-semibold transition-colors',
                  'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-1 focus-visible:ring-offset-background',
                  selected
                    ? 'bg-foreground text-background'
                    : 'bg-muted text-muted-foreground hover:bg-accent hover:text-foreground',
                )}
              >
                {s.kind === 'ongoing' && <RefreshCw className="h-3 w-3" aria-hidden="true" />}
                {s.short}
              </button>
            </div>
          )
        })}
      </div>

      <div
        id={panelId}
        role="tabpanel"
        aria-labelledby={`credential-path-${body}-${stage.kind}`}
        className="mt-4"
      >
        <StageDetail stage={stage} onOpen={onOpen} />
      </div>
    </section>
  )
}
