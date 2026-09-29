import type { ReactNode } from 'react'
import {
  ArrowDown,
  BookOpen,
  Cog,
  Github,
  Landmark,
  RotateCcw,
  ShieldCheck,
  Sparkles,
  Users,
  type LucideIcon,
} from 'lucide-react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { buttonVariants } from '@/components/ui/button'
import { Separator } from '@/components/ui/separator'
import { cn } from '@/lib/utils'
import { VAULT_REPO_URL } from '@/lib/github'
import { FACT_CHECK_TONE_CLASSES, FACT_CHECK_TONE_ICONS } from '@/lib/factCheckTone'
import {
  ABOUT_ACTOR_LABEL,
  ABOUT_LOOP,
  ABOUT_PHASES,
  ABOUT_SOURCE,
  ABOUT_VERDICTS,
  type AboutActor,
  type AboutNode,
  type AboutPhase,
} from '@/lib/aboutWorkflow'

/**
 * Settings → About: how the notes are written and checked, as a flow diagram
 * (the steps are `lib/aboutWorkflow.ts`). Boxes are what the flow passes
 * through, numbered stops are what is done to it, and each stop names who does
 * it. Everything hangs off one rail, 28px in — the centre of a box's icon tile
 * and of a stop's circle — so the arrows line up down the whole card.
 */

const ACTOR_ICON: Record<AboutActor, LucideIcon> = {
  ai: Sparkles,
  community: Users,
  automated: Cog,
}

const OUTCOME_ICON: Record<AboutPhase['id'], LucideIcon> = {
  write: BookOpen,
  check: ShieldCheck,
}

/** Steps are numbered straight through, so each phase starts where the last left off. */
const PHASE_START = ABOUT_PHASES.map((_, i) =>
  ABOUT_PHASES.slice(0, i).reduce((n, p) => n + p.steps.length, 1),
)

function FlowNode({ icon: Icon, node, children }: { icon: LucideIcon; node: AboutNode; children?: ReactNode }) {
  return (
    <div className="flex items-start gap-3 rounded-lg bg-muted px-3 py-3">
      <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-md bg-background">
        <Icon className="h-4 w-4" aria-hidden />
      </span>
      <div className="min-w-0 flex-1 pt-0.5">
        <p className="text-sm font-medium">{node.title}</p>
        <p className="text-xs text-muted-foreground">{node.detail}</p>
        {children}
      </div>
    </div>
  )
}

/** The rail between two parts of the flow, carrying the name of the phase it leads into. */
function FlowArrow({ label }: { label?: string }) {
  return (
    <div className="flex h-9 items-center gap-3 pl-3">
      <span className="flex w-8 shrink-0 justify-center text-muted-foreground">
        <ArrowDown className="h-4 w-4" aria-hidden />
      </span>
      {label && (
        <p className="text-xs font-semibold uppercase tracking-wide text-muted-foreground">{label}</p>
      )}
    </div>
  )
}

function ActorChip({ actor }: { actor: AboutActor }) {
  const Icon = ACTOR_ICON[actor]
  return (
    <span className="inline-flex items-center gap-1 rounded-full bg-muted px-2 py-0.5 text-xs font-medium text-muted-foreground">
      <Icon className="h-3 w-3" aria-hidden />
      {ABOUT_ACTOR_LABEL[actor]}
    </span>
  )
}

function FlowStep({
  marker,
  node,
  actors = [],
  last,
}: {
  marker: ReactNode
  node: AboutNode
  actors?: AboutActor[]
  last?: boolean
}) {
  return (
    <li className="relative flex gap-3 pl-3">
      {!last && (
        <span aria-hidden className="absolute bottom-0 left-7 top-8 w-px -translate-x-1/2 bg-border" />
      )}
      <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-muted text-xs font-semibold tabular-nums">
        {marker}
      </span>
      <div className={cn('min-w-0 flex-1 pt-1.5', !last && 'pb-4')}>
        <div className="flex flex-wrap items-center gap-x-2 gap-y-1">
          <p className="text-sm font-medium">{node.title}</p>
          {actors.map(actor => <ActorChip key={actor} actor={actor} />)}
        </div>
        <p className="mt-0.5 text-xs text-muted-foreground">{node.detail}</p>
      </div>
    </li>
  )
}

function Verdicts() {
  return (
    <ul className="mt-2 flex flex-wrap gap-1.5" aria-label="Fact Check verdicts">
      {ABOUT_VERDICTS.map(verdict => {
        const Icon = FACT_CHECK_TONE_ICONS[verdict.tone]
        return (
          <li
            key={verdict.tone}
            title={verdict.detail}
            className={cn(
              'inline-flex items-center gap-1.5 rounded-full px-2.5 py-0.5 text-xs font-semibold',
              FACT_CHECK_TONE_CLASSES[verdict.tone],
              // The grey tone's surface is `bg-muted` — the box these sit in — so
              // it takes the icon tile's surface instead or it has no edge at all.
              verdict.tone === 'grey' && 'bg-background',
            )}
          >
            <Icon className="h-3.5 w-3.5 shrink-0" aria-hidden />
            {verdict.label}
          </li>
        )
      })}
    </ul>
  )
}

export function AboutCard() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>About</CardTitle>
        <CardDescription>
          How Actuarial Notes is written and checked, by AI and by the people who study from it.
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <div aria-label="How Actuarial Notes works" role="group">
          <FlowNode icon={Landmark} node={ABOUT_SOURCE} />
          {ABOUT_PHASES.map((phase, p) => (
            <section key={phase.id} aria-label={phase.title}>
              <FlowArrow label={phase.title} />
              <ol>
                {phase.steps.map((step, i) => (
                  <FlowStep
                    key={step.title}
                    marker={PHASE_START[p] + i}
                    node={step}
                    actors={step.actors}
                    last={i === phase.steps.length - 1}
                  />
                ))}
              </ol>
              <FlowArrow />
              <FlowNode icon={OUTCOME_ICON[phase.id]} node={phase.outcome}>
                {phase.id === 'check' && <Verdicts />}
              </FlowNode>
            </section>
          ))}
          <FlowArrow />
          <ol>
            <FlowStep marker={<RotateCcw className="h-4 w-4" aria-hidden />} node={ABOUT_LOOP} last />
          </ol>
        </div>

        <Separator />

        <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
          <p className="text-xs text-muted-foreground">
            Study material, not professional actuarial advice. The official syllabus and its readings always
            have the final say.
          </p>
          <a
            href={VAULT_REPO_URL}
            target="_blank"
            rel="noreferrer"
            className={cn(buttonVariants({ variant: 'outline' }), 'shrink-0')}
          >
            <Github className="mr-2 h-4 w-4" aria-hidden />
            View on GitHub
          </a>
        </div>
      </CardContent>
    </Card>
  )
}
