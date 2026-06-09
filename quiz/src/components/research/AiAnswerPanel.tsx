import { Loader2, Sparkles, X } from 'lucide-react'
import { CitationBlock } from '@/components/research/CitationBlock'
import type { ResearchAnswer } from '@/hooks/useResearchQuery'

interface AiAnswerPanelProps {
  loading: boolean
  error: string | null
  result: ResearchAnswer | null
  onDismiss: () => void
}

// Renders the grounded AI assistant's answer inline on the Resources surface
// (previously the standalone "Ask" tab). Every quantitative claim cites a
// document and page via CitationBlock.
export function AiAnswerPanel({ loading, error, result, onDismiss }: AiAnswerPanelProps) {
  if (!loading && !error && !result) return null

  return (
    <div className="rounded-lg border bg-card p-4">
      <div className="mb-2 flex items-center gap-2">
        <Sparkles className="h-4 w-4 text-primary" aria-hidden />
        <span className="text-sm font-medium">AI answer</span>
        <button
          type="button"
          onClick={onDismiss}
          className="ml-auto text-muted-foreground hover:text-foreground"
          aria-label="Dismiss answer"
        >
          <X className="h-4 w-4" />
        </button>
      </div>

      {loading && (
        <div className="flex items-center gap-2 py-6 text-sm text-muted-foreground">
          <Loader2 className="h-4 w-4 animate-spin" aria-hidden /> Searching the corpus and drafting an answer…
        </div>
      )}

      {error && !loading && <p className="text-sm text-destructive">{error}</p>}

      {result && !loading && (
        <div className="space-y-3">
          <p className="whitespace-pre-wrap text-sm leading-relaxed">{result.answer}</p>
          <CitationBlock citations={result.citations} />
          {result.unverifiedClaims.length > 0 && (
            <p className="text-xs italic text-muted-foreground">
              {result.unverifiedClaims.length} claim{result.unverifiedClaims.length > 1 ? 's' : ''} in this
              answer could not be matched to a source in the retrieved context.
            </p>
          )}
        </div>
      )}
    </div>
  )
}
