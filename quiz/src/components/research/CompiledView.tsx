import { documentTypeMeta } from '@/lib/researchProjectMeta'
import { agentMeta } from '@/lib/researchOntology'
import type { ResearchProject } from '@/hooks/useResearchProjects'
import type { ProjectQuestion } from '@/hooks/useProjectQuestions'
import type { ResearchCitation } from '@/hooks/useResearchQuery'

interface CompiledViewProps {
  project: ResearchProject
  questions: ProjectQuestion[]
  type: 'research_report' | 'actuarial_justification'
}

const INTROS: Record<CompiledViewProps['type'], string> = {
  research_report: 'A grounded summary of regulation, market data, and benchmarks compiled from this project\'s questions.',
  actuarial_justification: 'A defensible memo citing filings, guidance, and statistics compiled from this project\'s questions.',
}

// Compiles a project's FAQ into a single document-style view — a "Research
// Report" (synthesis per question) or "Actuarial Justification" (per-agent
// findings plus the synthesized conclusion), with a collated references list.
export function CompiledView({ project, questions, type }: CompiledViewProps) {
  const meta = documentTypeMeta(type)
  const answered = questions.filter(q => q.synthesis).slice().reverse()

  if (answered.length === 0) {
    return (
      <div className="rounded-lg border border-dashed p-6 text-center text-sm text-muted-foreground">
        Ask a few questions to start building this {meta?.label ?? 'document'}.
      </div>
    )
  }

  const allCitations = new Map<string, ResearchCitation>()
  for (const q of answered) {
    for (const c of q.citations) {
      allCitations.set(`${c.documentId}-${c.page}`, c)
    }
  }

  return (
    <article className="space-y-5 rounded-lg border bg-card p-5">
      <header className="space-y-1 border-b pb-3">
        <p className="text-xs font-semibold uppercase tracking-wide text-primary">{meta?.label ?? type}</p>
        <h3 className="text-lg font-semibold">{project.name}</h3>
        <p className="text-sm text-muted-foreground">{INTROS[type]}</p>
      </header>

      <div className="space-y-4">
        {answered.map((q, i) => (
          <section key={q.id} className="space-y-1.5">
            <h4 className="text-sm font-semibold">{i + 1}. {q.question}</h4>
            {type === 'actuarial_justification' ? (
              <div className="space-y-1.5 text-sm leading-relaxed">
                {q.agentAnswers.filter(a => a.answer).map(a => (
                  <p key={a.departmentId}><span className="font-medium">{a.departmentLabel}: </span>{a.answer}</p>
                ))}
                <p className="font-medium">{q.synthesis}</p>
              </div>
            ) : (
              <p className="whitespace-pre-wrap text-sm leading-relaxed">{q.synthesis}</p>
            )}
          </section>
        ))}
      </div>

      {allCitations.size > 0 && (
        <div className="space-y-1.5 border-t pt-3">
          <p className="text-xs font-medium text-muted-foreground">References</p>
          <ul className="space-y-1">
            {[...allCitations.values()].map((c, i) => (
              <li key={`${c.documentId}-${c.page}-${i}`} className="text-xs leading-relaxed">
                <a href={c.url} target="_blank" rel="noreferrer" className="text-primary hover:underline">
                  {c.title}
                </a>
                <span className="text-muted-foreground"> — {agentMeta(c.agentId)?.shortName ?? c.agentId}, {c.date}, p.{c.page}</span>
              </li>
            ))}
          </ul>
        </div>
      )}
    </article>
  )
}
