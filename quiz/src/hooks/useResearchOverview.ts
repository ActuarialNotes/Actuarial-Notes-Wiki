import { useEffect, useState } from 'react'
import { supabase } from '@/lib/supabase'
import { allAgents } from '@/lib/researchOntology'

export interface CorpusOverview {
  documentCount: number
  agentCount: number
  metricCount: number
  lastUpdated: string | null
}

// Corpus-level summary for the scorecard strip. Intentionally NOT scoped to the
// filter store — it reflects the whole tracked corpus, so it doesn't refetch on
// every chip toggle. Counts use head:true queries (count header only, no rows).
export function useResearchOverview(): { overview: CorpusOverview | null; loading: boolean } {
  const [overview, setOverview] = useState<CorpusOverview | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    let cancelled = false
    setLoading(true)

    Promise.all([
      supabase.from('research_documents').select('*', { count: 'exact', head: true }),
      supabase.from('research_metrics').select('*', { count: 'exact', head: true }),
      supabase
        .from('research_documents')
        .select('published_at')
        .order('published_at', { ascending: false })
        .limit(1),
    ]).then(([docs, metrics, latest]) => {
      if (cancelled) return
      const latestRow = (latest.data as { published_at: string }[] | null)?.[0]
      setOverview({
        documentCount: docs.count ?? 0,
        agentCount: allAgents().length,
        metricCount: metrics.count ?? 0,
        lastUpdated: latestRow?.published_at ?? null,
      })
      setLoading(false)
    })

    return () => { cancelled = true }
  }, [])

  return { overview, loading }
}
