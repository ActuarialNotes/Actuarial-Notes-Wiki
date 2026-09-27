import { useCallback, useEffect, useLayoutEffect, useRef, useState, type ReactNode } from 'react'
import {
  ChevronDown,
  ChevronsDownUp,
  ChevronsUpDown,
  Crosshair,
  Database,
  Download,
  ExternalLink,
  FileText,
  FolderOpen,
  Send,
  ShieldCheck,
  Users,
  type LucideIcon,
} from 'lucide-react'
import { Card } from '@/components/ui/card'
import { MarkdownText } from '@/components/MarkdownText'
import {
  APPENDIX_LIMIT,
  ATTESTATION,
  CONTENT_OUTLINE_URL,
  FINAL_CHECKLIST,
  WORD_LIMIT,
  type ProjectCase,
} from '@/data/pcpaProjects'
import { programmeOf } from '@/data/projects'
import { usePcpaWorkspace } from '@/hooks/usePcpaWorkspace'
import { examAccentStyle } from '@/lib/examColors'
import type { ProjectAttempt } from '@/lib/pcpaAttempt'
import { activeSectionIndex } from '@/lib/scrollSpy'
import { downloadWorkspaceFile } from './projectFiles'
import { cn } from '@/lib/utils'

/**
 * The project materials, as the CAS project portal hands them out at the
 * start of the window: "a statement of the business problem, one or two data
 * sets, scope parameters for the project, and guidelines as to what should be
 * submitted" (Content Outline).
 *
 * A candidate comes back to the brief many times, each time for one part of
 * it — the scope, a column of the dictionary — so it is laid out for finding
 * rather than for reading straight through:
 *
 * - **Every section starts folded**, as a card that names it and says in a
 *   line what is inside (whom the memo is from, how many notes, which files).
 *   Opening one is a click on the card; the rest stay out of the way.
 * - **An outline** beside the brief (a row of chips above it on a phone) lists
 *   the sections and marks the one being read, following the scroll
 *   (`lib/scrollSpy.ts`). Choosing one opens it and brings it into view.
 *
 * Which sections are open is remembered per attempt for the session, so going
 * to the workspace and back leaves the brief as it was.
 */

type SectionId = 'problem' | 'stakeholders' | 'scope' | 'data' | 'submit' | 'attestation'

interface SectionSpec {
  id: SectionId
  title: string
  /** The outline's name for it. */
  short: string
  icon: LucideIcon
  /** One line of what the folded card holds. */
  summary: string
  /** A count the outline shows beside the name. */
  count?: number
}

function sectionsFor(projectCase: ProjectCase): SectionSpec[] {
  const { memo, stakeholders, scope, dictionary } = projectCase
  const plural = (n: number, one: string, many: string) => `${n} ${n === 1 ? one : many}`
  return [
    { id: 'problem', title: 'Statement of the business problem', short: 'Business problem', icon: FileText, summary: `${memo.subject} — from ${memo.from.split(',')[0]}` },
    { id: 'stakeholders', title: 'Information from stakeholders', short: 'Stakeholders', icon: Users, summary: `${plural(stakeholders.length, 'note', 'notes')} from colleagues, to weigh for relevance`, count: stakeholders.length },
    { id: 'scope', title: 'Scope parameters', short: 'Scope', icon: Crosshair, summary: `${plural(scope.length, 'parameter', 'parameters')} the analysis must keep to`, count: scope.length },
    { id: 'data', title: 'Data sets', short: 'Data sets', icon: Database, summary: dictionary.map(d => d.file).join(' · '), count: dictionary.length },
    { id: 'submit', title: 'What to submit', short: 'What to submit', icon: Send, summary: `A technical report of at most ${WORD_LIMIT.toLocaleString('en-US')} words and ${APPENDIX_LIMIT} appendices, with your code` },
    { id: 'attestation', title: 'Candidate attestation and AI use', short: 'Attestation', icon: ShieldCheck, summary: `${plural(ATTESTATION.length, 'affirmation', 'affirmations')} you make at submission` },
  ]
}

/** Open sections per attempt, for the session: switching views keeps the brief as it was. */
const openByAttempt = new Map<string, Set<SectionId>>()

/** The nearest ancestor that scrolls — the attempt page's view pane. */
function scrollParent(el: HTMLElement | null): HTMLElement | null {
  for (let node = el?.parentElement ?? null; node; node = node.parentElement) {
    const { overflowY } = getComputedStyle(node)
    if (overflowY === 'auto' || overflowY === 'scroll') return node
  }
  return null
}

function formatDeadline(ms: number): string {
  return new Date(ms).toLocaleString('en-US', { weekday: 'long', month: 'long', day: 'numeric', year: 'numeric', hour: 'numeric', minute: '2-digit' })
}

function BriefSection({
  spec,
  open,
  onToggle,
  sectionRef,
  children,
}: {
  spec: SectionSpec
  open: boolean
  onToggle: () => void
  sectionRef: (el: HTMLElement | null) => void
  children: ReactNode
}) {
  const Icon = spec.icon
  const bodyId = `brief-${spec.id}-body`
  return (
    <section ref={sectionRef} id={`brief-${spec.id}`} className="scroll-mt-16 lg:scroll-mt-6">
      <Card className="overflow-hidden">
        <h2>
          <button
            type="button"
            onClick={onToggle}
            aria-expanded={open}
            aria-controls={bodyId}
            className="group flex w-full items-center gap-3 p-4 text-left transition-colors hover:bg-accent/40 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-ring"
          >
            <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-[var(--exam-accent-soft,hsl(var(--muted)))] text-[var(--exam-accent,hsl(var(--foreground)))]">
              <Icon className="h-4 w-4" aria-hidden />
            </span>
            <span className="min-w-0 flex-1">
              <span className="block text-base font-semibold tracking-tight">{spec.title}</span>
              {!open && <span className="mt-0.5 block truncate text-xs font-normal text-muted-foreground">{spec.summary}</span>}
            </span>
            <ChevronDown className={cn('h-4 w-4 shrink-0 text-muted-foreground transition-transform duration-200', open && 'rotate-180')} aria-hidden />
          </button>
        </h2>
        {open && (
          <div id={bodyId} className="space-y-3 border-t border-border p-4 sm:p-5">
            {children}
          </div>
        )}
      </Card>
    </section>
  )
}

export function BriefView({
  attempt,
  projectCase,
  onOpenFile,
}: {
  attempt: ProjectAttempt
  projectCase: ProjectCase
  onOpenFile: (path: string) => void
}) {
  const files = usePcpaWorkspace(s => s.files)
  const [openDict, setOpenDict] = useState<string | null>(null)
  const sections = sectionsFor(projectCase)
  const [open, setOpen] = useState<Set<SectionId>>(() => new Set(openByAttempt.get(attempt.id) ?? []))
  const [active, setActive] = useState<SectionId>(sections[0].id)
  const { memo } = projectCase

  const rootRef = useRef<HTMLDivElement>(null)
  const chipsRef = useRef<HTMLElement>(null)
  const sectionEls = useRef(new Map<SectionId, HTMLElement>())
  /** Where to scroll once the section just opened has rendered. */
  const pendingScroll = useRef<SectionId | null>(null)
  /** Until when a chosen section holds the outline while the scroll to it plays. */
  const holdUntil = useRef(0)

  useEffect(() => { openByAttempt.set(attempt.id, open) }, [attempt.id, open])

  // Follow the scroll: the outline marks the section being read.
  useEffect(() => {
    const scroller = scrollParent(rootRef.current)
    if (!scroller) return
    let frame = 0
    const measure = () => {
      frame = 0
      if (Date.now() < holdUntil.current) return
      const top = scroller.getBoundingClientRect().top
      const ids = sections.map(s => s.id)
      const tops = ids.map(id => (sectionEls.current.get(id)?.getBoundingClientRect().top ?? Infinity) - top)
      const index = activeSectionIndex({
        tops,
        anchor: Math.min(140, scroller.clientHeight * 0.25),
        scrollTop: scroller.scrollTop,
        clientHeight: scroller.clientHeight,
        scrollHeight: scroller.scrollHeight,
      })
      if (index >= 0) setActive(ids[index])
    }
    const onScroll = () => { if (!frame) frame = requestAnimationFrame(measure) }
    scroller.addEventListener('scroll', onScroll, { passive: true })
    return () => {
      scroller.removeEventListener('scroll', onScroll)
      if (frame) cancelAnimationFrame(frame)
    }
    // The sections are fixed for a brief.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [projectCase.id])

  // Bring a section chosen from the outline into view once it has opened.
  useLayoutEffect(() => {
    const id = pendingScroll.current
    if (!id) return
    pendingScroll.current = null
    const reduce = window.matchMedia?.('(prefers-reduced-motion: reduce)').matches
    sectionEls.current.get(id)?.scrollIntoView({ behavior: reduce ? 'auto' : 'smooth', block: 'start' })
  }, [open, active])

  // Keep the phone outline's current chip in view.
  useEffect(() => {
    const row = chipsRef.current
    const chip = row?.querySelector<HTMLElement>(`[data-section="${active}"]`)
    if (!row || !chip || row.offsetParent === null) return
    row.scrollTo({ left: chip.offsetLeft - row.clientWidth / 2 + chip.clientWidth / 2, behavior: 'smooth' })
  }, [active])

  const goTo = useCallback((id: SectionId) => {
    holdUntil.current = Date.now() + 700
    pendingScroll.current = id
    setActive(id)
    setOpen(prev => (prev.has(id) ? new Set(prev) : new Set(prev).add(id)))
  }, [])

  const toggle = useCallback((id: SectionId) => {
    setOpen(prev => {
      const next = new Set(prev)
      if (next.has(id)) next.delete(id)
      else next.add(id)
      return next
    })
    setActive(id)
  }, [])

  const allOpen = open.size === sections.length
  const toggleAll = () => setOpen(allOpen ? new Set() : new Set(sections.map(s => s.id)))
  const setRef = (id: SectionId) => (el: HTMLElement | null) => {
    if (el) sectionEls.current.set(id, el)
    else sectionEls.current.delete(id)
  }
  const spec = (id: SectionId) => sections.find(s => s.id === id)!

  const accent = examAccentStyle(programmeOf(projectCase.id)?.examKey ?? '')

  return (
    <div ref={rootRef} style={accent} className="mx-auto max-w-5xl px-4 py-6 pb-24 lg:grid lg:grid-cols-[12.5rem_minmax(0,1fr)] lg:gap-10">
      <aside className="hidden lg:block">
        <nav aria-label="Brief outline" className="sticky top-6 space-y-3">
          <p className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">In this brief</p>
          <ol className="border-l border-border">
            {sections.map(s => {
              const current = s.id === active
              return (
                <li key={s.id}>
                  <button
                    type="button"
                    onClick={() => goTo(s.id)}
                    aria-current={current ? 'location' : undefined}
                    className={cn(
                      '-ml-px flex w-full items-center gap-2 border-l-2 py-1.5 pl-3 pr-1 text-left text-sm transition-colors',
                      current
                        ? 'border-[var(--exam-accent,hsl(var(--primary)))] font-medium text-foreground'
                        : 'border-transparent text-muted-foreground hover:border-border hover:text-foreground',
                    )}
                  >
                    <span className="min-w-0 flex-1 truncate">{s.short}</span>
                    {s.count !== undefined && <span className="text-xs tabular-nums text-muted-foreground">{s.count}</span>}
                  </button>
                </li>
              )
            })}
          </ol>
          <button
            type="button"
            onClick={toggleAll}
            className="inline-flex items-center gap-1.5 rounded-md px-1 text-xs font-medium text-muted-foreground hover:text-foreground"
          >
            {allOpen ? <ChevronsDownUp className="h-3.5 w-3.5" aria-hidden /> : <ChevronsUpDown className="h-3.5 w-3.5" aria-hidden />}
            {allOpen ? 'Collapse all' : 'Expand all'}
          </button>
        </nav>
      </aside>

      <div className="min-w-0 space-y-4">
        <header className="space-y-2 pb-2">
          <p className="text-xs font-medium uppercase tracking-wide text-muted-foreground">PCPA Project · {projectCase.line}</p>
          <h1 className="text-2xl font-semibold tracking-tight">{projectCase.title}</h1>
          <p className="text-sm text-muted-foreground">
            {projectCase.company}
            {attempt.deadline !== null ? <> · Submissions close {formatDeadline(attempt.deadline)}</> : ' · Practice, no deadline'}
          </p>
        </header>

        <nav
          ref={chipsRef}
          aria-label="Brief outline"
          className="sticky top-0 z-10 -mx-4 flex gap-1.5 overflow-x-auto bg-background/90 px-4 py-2 backdrop-blur [scrollbar-width:none] lg:hidden"
        >
          {sections.map(s => {
            const current = s.id === active
            return (
              <button
                key={s.id}
                type="button"
                data-section={s.id}
                onClick={() => goTo(s.id)}
                aria-current={current ? 'location' : undefined}
                className={cn(
                  'shrink-0 rounded-full px-3 py-1 text-xs font-medium transition-colors',
                  current
                    ? 'bg-[var(--exam-accent-soft,hsl(var(--muted)))] text-[var(--exam-accent,hsl(var(--foreground)))] ring-1 ring-inset ring-[var(--exam-accent-muted,hsl(var(--border)))]'
                    : 'bg-muted text-muted-foreground hover:text-foreground',
                )}
              >
                {s.short}
              </button>
            )
          })}
          <button
            type="button"
            onClick={toggleAll}
            aria-label={allOpen ? 'Collapse all sections' : 'Expand all sections'}
            className="ml-auto flex shrink-0 items-center rounded-full px-2 text-muted-foreground hover:text-foreground"
          >
            {allOpen ? <ChevronsDownUp className="h-4 w-4" aria-hidden /> : <ChevronsUpDown className="h-4 w-4" aria-hidden />}
          </button>
        </nav>

        <BriefSection spec={spec('problem')} open={open.has('problem')} onToggle={() => toggle('problem')} sectionRef={setRef('problem')}>
          <dl className="grid grid-cols-[4.5rem_1fr] gap-x-3 gap-y-1 text-sm">
            <dt className="text-muted-foreground">From</dt><dd>{memo.from}</dd>
            <dt className="text-muted-foreground">To</dt><dd>{memo.to}</dd>
            <dt className="text-muted-foreground">Subject</dt><dd className="font-medium">{memo.subject}</dd>
          </dl>
          <div className="border-t border-border pt-4">
            <MarkdownText className="prose prose-sm max-w-none dark:prose-invert">{memo.body}</MarkdownText>
          </div>
        </BriefSection>

        <BriefSection spec={spec('stakeholders')} open={open.has('stakeholders')} onToggle={() => toggle('stakeholders')} sectionRef={setRef('stakeholders')}>
          <p className="text-sm text-muted-foreground">Weigh each note for its relevance to the problem — not everything a stakeholder expects is true.</p>
          <div className="space-y-2">
            {projectCase.stakeholders.map((s, i) => (
              <div key={i} className="rounded-lg bg-muted/50 p-4">
                <p className="text-sm">{s.note}</p>
                <p className="mt-2 text-xs text-muted-foreground">— {s.from}, {s.role}</p>
              </div>
            ))}
          </div>
        </BriefSection>

        <BriefSection spec={spec('scope')} open={open.has('scope')} onToggle={() => toggle('scope')} sectionRef={setRef('scope')}>
          <ul className="list-disc space-y-1.5 pl-5 text-sm">
            {projectCase.scope.map(s => <li key={s}>{s}</li>)}
          </ul>
        </BriefSection>

        <BriefSection spec={spec('data')} open={open.has('data')} onToggle={() => toggle('data')} sectionRef={setRef('data')}>
          <p className="text-sm text-muted-foreground">
            In the workspace's <span className="font-mono">data/</span> folder, read-only. Missing values are blank fields.
            The data are the property of the CAS: they are not submitted, and may not be shared.
          </p>
          <div className="space-y-2">
            {projectCase.dictionary.map(d => {
              const path = `data/${d.file}`
              const file = files[path]
              const expanded = openDict === d.file
              return (
                <div key={d.file} className="overflow-hidden rounded-lg border border-border">
                  <div className="flex flex-wrap items-center gap-2 p-3">
                    {/* Wide enough to read; on a phone the buttons wrap below it instead. */}
                    <div className="min-w-[min(100%,14rem)] flex-1">
                      <p className="font-mono text-sm font-medium">{d.file}</p>
                      <p className="text-xs text-muted-foreground">{d.description} {d.rows} rows, {d.entries.length} columns.</p>
                    </div>
                    <button type="button" onClick={() => onOpenFile(path)} className="flex h-8 items-center gap-1.5 rounded-md px-2.5 text-xs font-medium hover:bg-accent">
                      <FolderOpen className="h-3.5 w-3.5" /> Open
                    </button>
                    {file && (
                      <button type="button" onClick={() => downloadWorkspaceFile(file)} className="flex h-8 items-center gap-1.5 rounded-md px-2.5 text-xs font-medium hover:bg-accent">
                        <Download className="h-3.5 w-3.5" /> CSV
                      </button>
                    )}
                    <button
                      type="button"
                      onClick={() => setOpenDict(expanded ? null : d.file)}
                      aria-expanded={expanded}
                      className="flex h-8 items-center gap-1 rounded-md px-2.5 text-xs font-medium hover:bg-accent"
                    >
                      Dictionary <ChevronDown className={cn('h-3.5 w-3.5 transition-transform', expanded && 'rotate-180')} />
                    </button>
                  </div>
                  {expanded && (
                    <div className="overflow-x-auto border-t border-border">
                      <table className="w-full text-sm">
                        <thead className="bg-muted/60 text-left text-xs">
                          <tr>
                            <th className="px-4 py-2 font-semibold">Column</th>
                            <th className="px-4 py-2 font-semibold">Type</th>
                            <th className="px-4 py-2 font-semibold">Description</th>
                          </tr>
                        </thead>
                        <tbody>
                          {d.entries.map(e => (
                            <tr key={e.column} className="border-t border-border/60 align-top">
                              <td className="whitespace-nowrap px-4 py-1.5 font-mono text-xs">{e.column}</td>
                              <td className="whitespace-nowrap px-4 py-1.5 text-xs text-muted-foreground">{e.type}</td>
                              <td className="px-4 py-1.5">{e.description}</td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  )}
                </div>
              )
            })}
          </div>
        </BriefSection>

        <BriefSection spec={spec('submit')} open={open.has('submit')} onToggle={() => toggle('submit')} sectionRef={setRef('submit')}>
          <p className="text-sm">
            A brief technical report that describes how you explored the data and managed its problems, how you built,
            evaluated and improved a GLM to address the business problem, and what the model means — technically, and
            for the business decision to be made.
          </p>
          <div className="rounded-lg bg-muted/50 p-4">
            <p className="mb-2 text-sm font-semibold">Final checklist</p>
            <ul className="list-disc space-y-1.5 pl-5 text-sm">
              {FINAL_CHECKLIST.map(item => <li key={item}>{item}</li>)}
            </ul>
          </div>
          <p className="text-xs text-muted-foreground">
            A report over {WORD_LIMIT.toLocaleString('en-US')} words, more than {APPENDIX_LIMIT} appendices, or files not in the required
            format is an automatic fail on the real project.
          </p>
        </BriefSection>

        <BriefSection spec={spec('attestation')} open={open.has('attestation')} onToggle={() => toggle('attestation')} sectionRef={setRef('attestation')}>
          <p className="text-sm">At submission you will affirm that:</p>
          <ul className="list-disc space-y-1.5 pl-5 text-sm">
            {ATTESTATION.map(a => <li key={a}>{a}</li>)}
          </ul>
          <a href={CONTENT_OUTLINE_URL} target="_blank" rel="noreferrer" className="inline-flex items-center gap-1 text-sm font-medium underline-offset-4 hover:underline">
            The full policy, in the CAS PCPA Content Outline <ExternalLink className="h-3.5 w-3.5" />
          </a>
        </BriefSection>
      </div>
    </div>
  )
}
