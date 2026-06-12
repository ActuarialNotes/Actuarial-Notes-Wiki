import { useEffect, useState } from 'react'
import { Loader2, X, Sparkles } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { FIELD, Field, chipClass } from './ProjectScopeFields'
import { DEPARTMENTS } from '@/lib/researchProjectMeta'

interface AskDialogProps {
  defaultDepartments: string[]
  loading: boolean
  error: string | null
  onClose: () => void
  onAsk: (question: string, departmentIds: string[]) => void
}

const MAX_DEPARTMENTS = 4

// "Ask" step of the project FAQ loop: a question plus the department "agents"
// to answer it from. Submitting calls api/research-ask.js, which researches
// sources, answers from each agent's perspective, and synthesizes a result.
export function AskDialog({ defaultDepartments, loading, error, onClose, onAsk }: AskDialogProps) {
  const [question, setQuestion] = useState('')
  const [departments, setDepartments] = useState<string[]>(
    defaultDepartments.length > 0 ? defaultDepartments.slice(0, MAX_DEPARTMENTS) : ['actuarial'],
  )

  useEffect(() => {
    function onKey(e: KeyboardEvent) { if (e.key === 'Escape' && !loading) onClose() }
    document.addEventListener('keydown', onKey)
    const prev = document.body.style.overflow
    document.body.style.overflow = 'hidden'
    return () => {
      document.removeEventListener('keydown', onKey)
      document.body.style.overflow = prev
    }
  }, [onClose, loading])

  function toggleDept(slug: string) {
    setDepartments(prev => {
      if (prev.includes(slug)) return prev.filter(d => d !== slug)
      if (prev.length >= MAX_DEPARTMENTS) return prev
      return [...prev, slug]
    })
  }

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    if (!question.trim() || departments.length === 0 || loading) return
    onAsk(question.trim(), departments)
  }

  return (
    <div
      className="fixed inset-0 z-50 flex items-end justify-center bg-black/50 p-0 sm:items-center sm:p-4"
      role="dialog"
      aria-modal="true"
      aria-label="Ask a question"
      onMouseDown={e => { if (e.target === e.currentTarget && !loading) onClose() }}
    >
      <div className="flex max-h-[92vh] w-full max-w-lg flex-col overflow-hidden rounded-t-2xl border bg-card shadow-xl sm:rounded-2xl">
        <div className="flex items-center justify-between border-b px-5 py-3.5">
          <h2 className="flex items-center gap-1.5 text-lg font-semibold">
            <Sparkles className="h-4 w-4 text-primary" aria-hidden /> Ask
          </h2>
          <button
            type="button"
            onClick={onClose}
            disabled={loading}
            className="rounded-md p-1 text-muted-foreground hover:bg-accent hover:text-foreground disabled:opacity-50"
            aria-label="Close"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="flex min-h-0 flex-1 flex-col">
          <div className="min-h-0 flex-1 space-y-5 overflow-y-auto px-5 py-4">
            <Field title="Your question">
              <textarea
                value={question}
                onChange={e => setQuestion(e.target.value)}
                placeholder="e.g. How would FSRA likely respond to an 8% Ontario auto rate increase?"
                rows={3}
                maxLength={500}
                autoFocus
                disabled={loading}
                className={`${FIELD} resize-none`}
              />
            </Field>
            <Field
              title="Agents"
              hint={`Pick up to ${MAX_DEPARTMENTS} departments to answer from. Their research is added to this project's sources.`}
            >
              <div className="flex flex-wrap gap-1.5">
                {DEPARTMENTS.map(d => {
                  const active = departments.includes(d.slug)
                  return (
                    <button
                      key={d.slug}
                      type="button"
                      onClick={() => toggleDept(d.slug)}
                      disabled={loading || (!active && departments.length >= MAX_DEPARTMENTS)}
                      className={`${chipClass(active)} disabled:opacity-40`}
                    >
                      {d.label}
                    </button>
                  )
                })}
              </div>
            </Field>
            {error && <p className="text-sm text-destructive">{error}</p>}
          </div>

          <div className="flex items-center justify-end gap-2 border-t px-5 py-3.5">
            <Button type="button" variant="ghost" onClick={onClose} disabled={loading}>Cancel</Button>
            <Button type="submit" disabled={!question.trim() || departments.length === 0 || loading} className="gap-1.5">
              {loading ? <Loader2 className="h-4 w-4 animate-spin" aria-hidden /> : <Sparkles className="h-4 w-4" aria-hidden />}
              {loading ? 'Researching…' : 'Ask'}
            </Button>
          </div>
        </form>
      </div>
    </div>
  )
}
