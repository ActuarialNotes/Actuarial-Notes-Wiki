import { useMemo } from 'react'
import { Button } from '@/components/ui/button'
import type { TutorEngine } from '@/hooks/useTutorEngine'
import type { TutorActions } from '@/components/tutor/actions'
import { diagnose, type Finding } from '@/lib/tutor/diagnosis'
import { findingAdvice, findingLine } from '@/lib/tutor/copy'
import { PART_KIND_LABEL } from '@/lib/tutor/items'

// "What's confusing?" (docs/tutor.md §7): the patterns the Tutor finds in the
// record, most valuable first, each with the one thing to do about it.

interface Props {
  engine: TutorEngine
  actions: TutorActions
}

function FindingAction({ finding, actions }: { finding: Finding; actions: TutorActions }) {
  switch (finding.type) {
    case 'sure-wrong':
    case 'confused':
      return <Button size="sm" variant="outline" onClick={() => actions.startSession({ concepts: [finding.concept] })}>Try it again</Button>
    case 'persistent':
      return (
        <div className="flex gap-2">
          <Button size="sm" variant="outline" onClick={() => actions.read(finding.concept)}>Read it</Button>
          <Button size="sm" variant="outline" onClick={() => actions.startSession({ concepts: [finding.concept] })}>Another part</Button>
        </div>
      )
    case 'siblings':
      return (
        <div className="flex gap-2">
          <Button size="sm" variant="outline" onClick={() => actions.compare(finding.concepts[0], finding.concepts[1])}>Compare</Button>
          <Button size="sm" variant="outline" onClick={() => actions.startSession({ concepts: [...finding.concepts] })}>One of each</Button>
        </div>
      )
    case 'foundation':
      return <Button size="sm" variant="outline" onClick={() => actions.startSession({ concepts: [...finding.foundations, finding.concept] })}>Start with {finding.foundations[0]}</Button>
    case 'kind-gap':
      return (
        <Button size="sm" variant="outline" onClick={() => actions.startSession({ concepts: [], kind: finding.weak })}>
          Practise {PART_KIND_LABEL[finding.weak].toLowerCase()} parts
        </Button>
      )
    case 'calibration':
      return null
  }
}

export function TutorConfusingView({ engine, actions }: Props) {
  const findings = useMemo(
    () => diagnose({ syllabus: engine.syllabus, model: engine.model, foundations: engine.foundations, ladder: engine.ladder }),
    [engine.syllabus, engine.model, engine.foundations, engine.ladder],
  )

  if (findings.length === 0) {
    return (
      <div className="space-y-2 py-6 text-center">
        <p className="text-sm font-medium">Nothing stands out yet.</p>
        <p className="text-sm text-muted-foreground">
          As you answer, the Tutor looks for what you were sure of and got wrong, what you keep missing,
          the concepts you mix up, and the kind of part that costs you most.
        </p>
      </div>
    )
  }

  return (
    <ul className="space-y-3">
      {findings.slice(0, 12).map((f, i) => (
        <li key={`${f.type}:${i}`} className="space-y-2 rounded-xl bg-muted/60 p-3">
          <p className="text-sm font-medium leading-snug">{findingLine(f)}</p>
          <p className="text-xs text-muted-foreground">{findingAdvice(f)}</p>
          <FindingAction finding={f} actions={actions} />
        </li>
      ))}
    </ul>
  )
}
