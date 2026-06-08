import { useState, type FormEvent } from 'react'
import { Loader2, Send } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { useResearchQuery } from '@/hooks/useResearchQuery'
import { CitationBlock } from '@/components/research/CitationBlock'

export default function ResearchView() {
  const [query, setQuery] = useState('')
  const { loading, error, result, ask } = useResearchQuery()

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault()
    if (!query.trim() || loading) return
    ask(query)
  }

  return (
    <div className="space-y-4">
      <form onSubmit={handleSubmit} className="flex gap-2">
        <input
          type="text"
          value={query}
          onChange={e => setQuery(e.target.value)}
          placeholder="Ask about Canadian P&C regulatory or financial filings…"
          disabled={loading}
          className="flex-1 rounded-md border border-input bg-background px-3 py-2 text-sm placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring disabled:opacity-50"
        />
        <Button type="submit" disabled={loading || !query.trim()} aria-label="Ask">
          {loading ? <Loader2 className="h-4 w-4 animate-spin" /> : <Send className="h-4 w-4" />}
        </Button>
      </form>

      <p className="text-xs text-muted-foreground">
        Answers are grounded in the document corpus and cite specific filings and pages —
        scoped by the agent and province filters above.
      </p>

      {error && <p className="text-sm text-destructive">{error}</p>}

      {loading && (
        <div className="flex items-center gap-2 py-8 text-sm text-muted-foreground">
          <Loader2 className="h-4 w-4 animate-spin" /> Searching the corpus and drafting an answer…
        </div>
      )}

      {result && !loading && (
        <div className="rounded-lg border bg-card p-4 space-y-3">
          <p className="text-sm whitespace-pre-wrap leading-relaxed">{result.answer}</p>
          <CitationBlock citations={result.citations} />
          {result.unverifiedClaims.length > 0 && (
            <p className="text-xs text-muted-foreground italic">
              {result.unverifiedClaims.length} claim{result.unverifiedClaims.length > 1 ? 's' : ''} in this
              answer could not be matched to a source in the retrieved context.
            </p>
          )}
        </div>
      )}
    </div>
  )
}
