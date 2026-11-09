// The credential path, drawn as a route down the page: one stop per stage —
// the start, associateship, fellowship, and the continuing education that
// keeps the letters current — joined by a line, the last joined by a dashed
// one because it never ends.
//
// It stands in for a `%%credential-path%%` line (see `data/credentialPaths.ts`,
// which holds the stages and keeps them in step with `data/tracks.ts`). On a
// designation page the line names the page — `%%credential-path ACAS%%` — and
// the route opens at that stop, marked as the page you're on; the bare line
// (the general guide) opens at the reader's first stage with work left. Any
// stop opens and folds; a folded stop lists its requirements in one line.
//
// The route is also the reader's own: each requirement shows what the app
// already knows about it — done, being studied (with the exam's readiness
// score), or nothing yet — and the head of the route counts what's done up to
// the page's stage. The rules are `lib/credentialProgress.ts`; nothing is
// shown for a reader with nothing on the path, so signed out it is a plain
// route. Outside the app's providers (a test rendering an article) there is
// no progress to read and it draws the plain route too.
//
// Exams lead their row with the same logo tile the Study Guides list uses, so
// the colours climb the same ladder; the courses, modules and credentials get
// a neutral tile with a glyph. A requirement with a vault page opens it the
// way any link in the article does — through `onOpen`, the article's own link
// handler — except the stop the page is about, which is where you already are.

import { useContext, useMemo, useState, type MouseEvent, type ReactNode } from 'react'
import { ChevronDown, RefreshCw } from 'lucide-react'
import { SegmentedControl } from '@/components/ui/SegmentedControl'
import { ExamLogo } from '@/components/ExamLogo'
import { LogoTile } from '@/components/LogoTile'
import { CheckMark } from '@/components/CheckMark'
import { ExamProgressContext } from '@/contexts/examProgress'
import { useConceptMastery } from '@/hooks/useConceptMastery'
import { useWikiSyllabus } from '@/hooks/useWikiSyllabus'
import { matchesSelectedVariant } from '@/data/examSittings'
import { computeExamReadiness } from '@/lib/readiness'
import { examStatus } from '@/lib/examStatus'
import { wikiExamIdToProgressKey } from '@/lib/wikiParser'
import { loadGuideBody, type GuideBody } from '@/lib/bodyFilter'
import { wikiRoute, type WikiEntryRef } from '@/lib/wikiRoutes'
import {
  firstOpenStage,
  itemProgress,
  pathTally,
  stageProgress,
  type ItemProgress,
  type ProgressMap,
} from '@/lib/credentialProgress'
import { cn } from '@/lib/utils'
import {
  CREDENTIAL_PATHS,
  type PathItem,
  type PathPosition,
  type PathStage,
} from '@/data/credentialPaths'

type OpenRef = (ref: WikiEntryRef, e: MouseEvent<HTMLAnchorElement>) => void

const BODY_OPTIONS = [
  { value: 'SOA' as const, label: 'SOA' },
  { value: 'CAS' as const, label: 'CAS' },
  { value: 'CIA' as const, label: 'CIA' },
]

const NO_PROGRESS: ProgressMap = {}

export function PageLink({
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

export function ItemTile({ item }: { item: PathItem }) {
  if (item.exam) return <ExamLogo examKey={item.exam} size="sm" />
  const Icon = item.icon
  return (
    <LogoTile size="sm" className="bg-muted text-muted-foreground">
      {Icon && <Icon className="h-3.5 w-3.5" />}
    </LogoTile>
  )
}

/** What the row says about the reader's own progress on it. Quiet for "nothing yet". */
function ItemStatus({ progress }: { progress: ItemProgress | null }) {
  if (!progress || progress.state === 'todo') return null
  if (progress.state === 'done') return <CheckMark className="mt-0.5 h-4 w-4" label="Done" />
  return (
    <span className="shrink-0 pt-0.5 text-xs tabular-nums text-muted-foreground">
      {progress.readyPct !== undefined ? `${Math.round(progress.readyPct)}% ready` : 'Studying'}
    </span>
  )
}

export function ItemRow({ item, progress, onOpen }: { item: PathItem; progress: ItemProgress | null; onOpen: OpenRef }) {
  return (
    <li className="flex items-start gap-3 py-2">
      <ItemTile item={item} />
      <div className="min-w-0 flex-1 leading-snug">
        <p className="text-sm font-medium text-foreground">
          {item.ref ? <PageLink refTo={item.ref} onOpen={onOpen}>{item.name}</PageLink> : item.name}
        </p>
        {item.note && <p className="mt-0.5 text-sm text-muted-foreground">{item.note}</p>}
        {progress?.readyPct !== undefined && (
          <div className="mt-1.5 h-1 overflow-hidden rounded-full bg-muted" aria-hidden="true">
            <div className="h-full rounded-full bg-primary" style={{ width: `${Math.min(100, progress.readyPct)}%` }} />
          </div>
        )}
      </div>
      <ItemStatus progress={progress} />
    </li>
  )
}

interface Readiness {
  progress: ProgressMap
  readiness: Record<string, number>
}

/** One stop on the route. */
function Stop({
  stage,
  index,
  last,
  open,
  here,
  data,
  onToggle,
  onOpen,
  panelId,
}: {
  stage: PathStage
  index: number
  last: boolean
  open: boolean
  here: boolean
  data: Readiness
  onToggle: () => void
  onOpen: OpenRef
  panelId: string
}) {
  const { complete } = stageProgress(stage, data.progress)
  const nextIsOngoing = !last && stage.kind === 'fellow'
  return (
    <li className="relative pb-4 pl-8 last:pb-0" data-stage={index}>
      {!last && (
        <span
          aria-hidden="true"
          className={cn(
            'absolute bottom-0 left-[9px] top-6 border-l-2',
            nextIsOngoing ? 'border-dashed border-muted-foreground/40' : complete ? 'border-green-500' : 'border-border',
          )}
        />
      )}
      <span
        aria-hidden="true"
        className={cn(
          'absolute left-0 top-0.5 flex h-5 w-5 items-center justify-center rounded-full border-2 bg-background',
          complete ? 'border-transparent' : here ? 'border-foreground ring-4 ring-foreground/15' : 'border-border',
        )}
      >
        {complete && <CheckMark className="h-5 w-5" />}
      </span>

      <button
        type="button"
        onClick={onToggle}
        aria-expanded={open}
        aria-controls={panelId}
        className="group flex w-full items-start gap-2 rounded-md text-left focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
      >
        <span className="min-w-0 flex-1">
          <span className="flex items-center gap-1.5 text-base font-semibold leading-6 text-foreground">
            {stage.kind === 'ongoing' && <RefreshCw className="h-3.5 w-3.5" aria-hidden="true" />}
            {stage.short}
            {here && (
              <span className="ml-1 rounded-full bg-foreground px-2 py-0.5 text-[11px] font-semibold leading-none text-background">
                This page
              </span>
            )}
          </span>
          {!open && (
            <span className="mt-0.5 block text-sm text-muted-foreground">
              {stage.items.map(i => i.name).join(' · ')}
            </span>
          )}
        </span>
        <ChevronDown
          aria-hidden="true"
          className={cn('mt-1 h-4 w-4 shrink-0 text-muted-foreground transition-transform', open && 'rotate-180')}
        />
      </button>

      {open && (
        <div id={panelId} className="mt-1">
          {stage.ref && !here && (
            <p className="text-sm font-medium">
              <PageLink refTo={stage.ref} onOpen={onOpen}>{stage.title}</PageLink>
            </p>
          )}
          <p className="mt-0.5 text-sm leading-relaxed text-muted-foreground">{stage.blurb}</p>
          <ul className="mt-1">
            {stage.items.map(item => (
              <ItemRow key={item.name} item={item} progress={itemProgress(item, data.progress, data.readiness)} onOpen={onOpen} />
            ))}
          </ul>
          {stage.optional && (
            <div className="mt-2 border-t border-border/60 pt-2">
              <p className="text-xs font-medium uppercase tracking-wide text-muted-foreground">{stage.optional.heading}</p>
              <ul className="mt-1">
                {stage.optional.items.map(item => (
                  <ItemRow key={item.name} item={item} progress={null} onOpen={onOpen} />
                ))}
              </ul>
            </div>
          )}
        </div>
      )}
    </li>
  )
}

function Route({ onOpen, start, data }: { onOpen: OpenRef; start?: PathPosition; data: Readiness }) {
  // Open on the page's own society if it names one; otherwise on the society
  // the reader last picked on the Quiz or Study Guides tab. Choosing one here
  // doesn't change that choice — this is a path to compare on, not a setting.
  const [body, setBody] = useState<GuideBody>(() => start?.body ?? loadGuideBody() ?? 'SOA')
  const path = CREDENTIAL_PATHS[body]
  const onPage = start?.body === body
  // The stop the route is anchored at: the page's own, or the reader's next.
  const anchor = start ? start.stage : firstOpenStage(path, data.progress)
  // Open stops, by society — switching society opens the same stage on the other.
  const [opened, setOpened] = useState<Record<string, number[]>>({})
  const open = opened[body] ?? [anchor]
  const tally = pathTally(path, anchor, data.progress)

  function toggle(i: number) {
    setOpened(prev => {
      const current = prev[body] ?? [anchor]
      return { ...prev, [body]: current.includes(i) ? current.filter(x => x !== i) : [...current, i] }
    })
  }

  return (
    <section
      data-credential-path=""
      aria-label={`${path.name} track`}
      className="not-prose my-6 first:mt-0 rounded-xl border border-border/70 p-4 sm:p-5"
    >
      <div className="mb-4 flex items-center justify-between gap-3">
        <p className="min-w-0 text-sm font-medium text-foreground">
          {tally ? (
            <>
              Your path <span className="text-muted-foreground">· {tally.done} of {tally.total} done</span>
            </>
          ) : (
            path.name
          )}
        </p>
        <SegmentedControl
          value={body}
          onChange={setBody}
          options={BODY_OPTIONS}
          label="Society"
          size="sm"
          pill
          className="w-40 shrink-0"
        />
      </div>
      <ol aria-label={`${body} track stages`}>
        {path.stages.map((stage, i) => (
          <Stop
            key={`${body}-${stage.kind}`}
            stage={stage}
            index={i}
            last={i === path.stages.length - 1}
            open={open.includes(i)}
            here={onPage && start?.stage === i}
            data={data}
            onToggle={() => toggle(i)}
            onOpen={onOpen}
            panelId={`credential-path-${body}-${stage.kind}`}
          />
        ))}
      </ol>
    </section>
  )
}

/** The reader's statuses and readiness, for the route. Mounted only inside the app's providers. */
function RouteWithProgress(props: { onOpen: OpenRef; start?: PathPosition; progress: ProgressMap; variants: Record<string, string | null> }) {
  const { syllabi } = useWikiSyllabus()
  const { records } = useConceptMastery()
  const { progress, variants } = props
  const readiness = useMemo(() => {
    const now = new Date()
    const out: Record<string, number> = {}
    for (const [key, status] of Object.entries(progress)) {
      if (status !== 'in_progress') continue
      const matches = syllabi.filter(s => wikiExamIdToProgressKey(s.examId) === key)
      const syllabus = matches.find(s => matchesSelectedVariant(key, s.examId, variants[key])) ?? matches[0]
      if (!syllabus || examStatus(key, syllabus.examId) === 'development') continue
      const r = computeExamReadiness(syllabus, records.filter(rec => rec.exam_id === key), now)
      if (r.counts.total > 0) out[key] = r.overallPct
    }
    return out
  }, [progress, variants, syllabi, records])
  return <Route onOpen={props.onOpen} start={props.start} data={{ progress, readiness }} />
}

export function CredentialPath({ onOpen, start }: { onOpen: OpenRef; start?: PathPosition }) {
  const ctx = useContext(ExamProgressContext)
  if (!ctx) return <Route onOpen={onOpen} start={start} data={{ progress: NO_PROGRESS, readiness: {} }} />
  return <RouteWithProgress onOpen={onOpen} start={start} progress={ctx.progress} variants={ctx.examVariants} />
}
