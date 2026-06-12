import { useState } from 'react'
import { ChevronDown, Loader2, MessageCircleQuestion, Sparkles } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { CitationBlock } from '@/components/research/CitationBlock'
import { AskDialog } from '@/components/research/AskDialog'
import { CompiledView } from '@/components/research/CompiledView'
import { useProjectQuestions, useAskProjectQuestion, type ProjectQuestion } from '@/hooks/useProjectQuestions'
import type { ResearchProject } from '@/hooks/useResearchProjects'

interface ProjectFaqProps {
  project: ResearchProject
  onDocumentsAdded: () => void
}

const VIEWS = [
  { id: 'faq', label: 'FAQ' },
  { id: 'research_report', label: 'Research Report' },
  { id: 'actuarial_justification', label: 'Actuarial Justification' },
] as const
type FaqView = typeof VIEWS[number]['id']

function QuestionCard({ q }: { q: ProjectQuestion }) {
  const [expanded, setExpanded] = useState(false)
  const answeredAgents = q.agentAnswers.filter(a => a.answer)

  return (
    <li className="rounded-lg border bg-card">
      <button
        type="button"
        onClick={() => setExpanded(v => !v)}
        className="flex w-full items-start gap-2 p-3 text-left"
        aria-expanded={expanded}
      >
        <MessageCircleQuestion className="mt-0.5 h-4 w-4 shrink-0 text-primary" aria-hidden />
        <span className="min-w-0 flex-1 text-sm font-medium">{q.question}</span>
        <ChevronDown className={`mt-0.5 h-4 w-4 shrink-0 text-muted-foreground transition-transform ${expanded ? 'rotate-180' : ''}`} aria-hidden />
      </button>
      {expanded && (
        <div className="space-y-3 border-t px-3 py-3">
          {q.synthesis && (
            <div className="rounded-md bg-primary/5 p-3">
              <p className="text-xs font-semibold uppercase tracking-wide text-primary">Synthesis</p>
              <p className="mt-1 whitespace-pre-wrap text-sm leading-relaxed">{q.synthesis}</p>
            </div>
          )}
          {answeredAgents.map(a => (
            <div key={a.departmentId}>
              <p className="text-xs font-semibold uppercase tracking-wide text-muted-foreground">{a.departmentLabel}</p>
              <p className="mt-1 whitespace-pre-wrap text-sm leading-relaxed">{a.answer}</p>
            </div>
          ))}
          <CitationBlock citations={q.citations} />
          {q.addedDocumentIds.length > 0 && (
            <p className="text-xs italic text-muted-foreground">
              Added {q.addedDocumentIds.length} new source{q.addedDocumentIds.length > 1 ? 's' : ''} to this project's Sources.
            </p>
          )}
        </div>
      )}
    </li>
  )
}

// The project's "Ask" surface: a big CTA opens AskDialog to pose a question to
// chosen department agents (api/research-ask.js), and the resulting Q&A list
// doubles as the project's FAQ — or can be compiled into a Research Report /
// Actuarial Justification via CompiledView.
export function ProjectFaq({ project, onDocumentsAdded }: ProjectFaqProps) {
  const [refreshKey, setRefreshKey] = useState(0)
  const [view, setView] = useState<FaqView>('faq')
  const [showAsk, setShowAsk] = useState(false)
  const { questions, loading } = useProjectQuestions(project.id, refreshKey)
  const { ask, loading: asking, error: askError, reset } = useAskProjectQuestion()

  async function handleAsk(question: string, departmentIds: string[]) {
    const result = await ask(project.id, question, departmentIds)
    if (result) {
      setShowAsk(false)
      reset()
      setRefreshKey(k => k + 1)
      if (result.addedDocumentIds.length > 0) onDocumentsAdded()
    }
  }

  return (
    <div className="space-y-4">
      <div className="rounded-xl border bg-gradient-to-br from-primary/5 to-transparent p-5">
        <h3 className="text-lg font-semibold">Ask a question</h3>
        <p className="mt-1 max-w-prose text-sm text-muted-foreground">
          Choose the agents whose perspective you need. They'll research relevant sources for this
          project, answer from their lens, and synthesize a result.
        </p>
        <Button onClick={() => setShowAsk(true)} size="lg" className="mt-4 gap-2">
          <Sparkles className="h-5 w-5" aria-hidden /> Ask
        </Button>
      </div>

      {questions.length > 0 && (
        <div className="flex gap-1 rounded-lg border bg-card p-1">
          {VIEWS.map(v => (
            <button
              key={v.id}
              type="button"
              onClick={() => setView(v.id)}
              className={`flex-1 rounded-md px-3 py-1.5 text-sm font-medium transition-colors ${
                view === v.id ? 'bg-primary/10 text-primary' : 'text-muted-foreground hover:text-foreground'
              }`}
            >
              {v.label}
            </button>
          ))}
        </div>
      )}

      {loading ? (
        <div className="flex items-center justify-center gap-2 py-12 text-sm text-muted-foreground">
          <Loader2 className="h-4 w-4 animate-spin" /> Loading questions…
        </div>
      ) : questions.length === 0 ? (
        <p className="mx-auto max-w-md py-8 text-center text-sm text-muted-foreground">
          No questions yet. Ask one above to start this project's FAQ.
        </p>
      ) : view === 'faq' ? (
        <ul className="space-y-2">
          {questions.map(q => <QuestionCard key={q.id} q={q} />)}
        </ul>
      ) : (
        <CompiledView project={project} questions={questions} type={view} />
      )}

      {showAsk && (
        <AskDialog
          defaultDepartments={project.departments}
          loading={asking}
          error={askError}
          onClose={() => { setShowAsk(false); reset() }}
          onAsk={handleAsk}
        />
      )}
    </div>
  )
}
