import { Loader2 } from 'lucide-react'
import { useResearchFeed } from '@/hooks/useResearchFeed'
import { DocumentCard } from '@/components/research/DocumentCard'

export default function MonitorView() {
  const { documents, loading, error } = useResearchFeed()

  if (loading) {
    return (
      <div className="flex items-center justify-center gap-2 py-16 text-sm text-muted-foreground">
        <Loader2 className="h-4 w-4 animate-spin" /> Loading documents…
      </div>
    )
  }

  if (error) {
    return <p className="py-16 text-center text-sm text-destructive">{error}</p>
  }

  if (documents.length === 0) {
    return (
      <p className="py-16 text-center text-sm text-muted-foreground max-w-md mx-auto">
        No documents match the current filters yet. The corpus is populated by scheduled
        ingestion — check back soon, or clear your filters to see everything available.
      </p>
    )
  }

  return (
    <div className="space-y-3">
      {documents.map(document => (
        <DocumentCard key={document.id} document={document} />
      ))}
    </div>
  )
}
