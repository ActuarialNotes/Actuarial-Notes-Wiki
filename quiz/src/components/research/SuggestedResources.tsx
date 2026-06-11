import { useState } from 'react'
import { Sparkles, X, Plus, Check, Loader2 } from 'lucide-react'
import { DocumentCard } from '@/components/research/DocumentCard'
import { useSuggestedResources } from '@/hooks/useSuggestedResources'
import type { ResearchProject } from '@/hooks/useResearchProjects'

interface SuggestedResourcesProps {
  project: ResearchProject | undefined
  // Documents already in the project — excluded from suggestions.
  existingIds: string[]
  onAdd: (documentId: string) => Promise<void>
}

// Dismissible "Suggested resources" panel for a project: surfaces corpus
// documents matching the project's jurisdiction + line of business so a new
// project starts with a relevant shortlist the user can one-tap add (or dismiss
// if it's not relevant).
export function SuggestedResources({ project, existingIds, onAdd }: SuggestedResourcesProps) {
  const [dismissed, setDismissed] = useState(false)
  const [addingId, setAddingId] = useState<string | null>(null)
  const [addedIds, setAddedIds] = useState<Set<string>>(new Set())
  const { suggestions, loading } = useSuggestedResources(project, existingIds)

  if (dismissed) return null
  if (!loading && suggestions.length === 0) return null

  async function handleAdd(id: string) {
    setAddingId(id)
    await onAdd(id)
    setAddedIds(prev => new Set(prev).add(id))
    setAddingId(null)
  }

  return (
    <div className="rounded-lg border border-dashed bg-card/40 p-3">
      <div className="mb-2 flex items-center gap-2">
        <Sparkles className="h-4 w-4 text-primary" aria-hidden />
        <span className="text-sm font-medium">Suggested resources</span>
        <span className="text-xs text-muted-foreground">based on this project's scope</span>
        <button
          type="button"
          onClick={() => setDismissed(true)}
          className="ml-auto inline-flex items-center gap-1 rounded-md px-1.5 py-0.5 text-xs text-muted-foreground hover:bg-accent hover:text-foreground"
          aria-label="Dismiss suggestions"
        >
          <X className="h-3.5 w-3.5" /> Dismiss
        </button>
      </div>

      {loading ? (
        <div className="flex items-center gap-2 py-4 text-sm text-muted-foreground">
          <Loader2 className="h-4 w-4 animate-spin" /> Finding relevant sources…
        </div>
      ) : (
        <div className="space-y-2">
          {suggestions.map(doc => {
            const added = addedIds.has(doc.id)
            return (
              <DocumentCard
                key={doc.id}
                document={doc}
                action={
                  <button
                    type="button"
                    onClick={() => handleAdd(doc.id)}
                    disabled={added || addingId === doc.id}
                    className="flex items-center gap-1 rounded-md border border-input px-2 py-1 text-xs text-muted-foreground transition-colors hover:bg-accent/60 hover:text-foreground disabled:opacity-60"
                  >
                    {addingId === doc.id ? (
                      <Loader2 className="h-3.5 w-3.5 animate-spin" />
                    ) : added ? (
                      <Check className="h-3.5 w-3.5 text-primary" />
                    ) : (
                      <Plus className="h-3.5 w-3.5" />
                    )}
                    {added ? 'Added' : 'Add'}
                  </button>
                }
              />
            )
          })}
        </div>
      )}
    </div>
  )
}
