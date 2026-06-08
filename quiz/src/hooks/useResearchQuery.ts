import { useCallback, useState } from 'react'
import { supabase } from '@/lib/supabase'
import { useResearchStore } from '@/stores/researchStore'

export interface ResearchCitation {
  documentId: string
  title: string
  agentId: string
  url: string
  page: number
  date: string
}

export interface ResearchUnverifiedClaim {
  text: string
  title: string
  agentId: string
  page: number
}

export interface ResearchAnswer {
  answer: string
  citations: ResearchCitation[]
  unverifiedClaims: ResearchUnverifiedClaim[]
  tokensUsed: number
}

interface QueryState {
  loading: boolean
  error: string | null
  result: ResearchAnswer | null
}

const IDLE: QueryState = { loading: false, error: null, result: null }

// Wraps the grounded-retrieval endpoint (api/research.js) for the "Ask" tab —
// same auth shape as the existing api/chat.js proxy (Supabase bearer token),
// scoped by the same agent/docType/province/date filters as the Monitor feed.
export function useResearchQuery() {
  const filters = useResearchStore(s => s.filters)
  const [state, setState] = useState<QueryState>(IDLE)

  const ask = useCallback(async (query: string) => {
    const trimmed = query.trim()
    if (!trimmed) return

    setState({ loading: true, error: null, result: null })

    const { data: { session } } = await supabase.auth.getSession()
    if (!session) {
      setState({ loading: false, error: 'Sign in to ask the research assistant.', result: null })
      return
    }

    try {
      const res = await fetch('/api/research', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${session.access_token}`,
        },
        body: JSON.stringify({
          query: trimmed,
          filters: {
            agentIds: filters.agentIds.length > 0 ? filters.agentIds : undefined,
            docTypes: filters.docTypes.length > 0 ? filters.docTypes : undefined,
            provinces: filters.provinces.length > 0 ? filters.provinces : undefined,
            dateRange: (filters.dateFrom || filters.dateTo)
              ? { from: filters.dateFrom, to: filters.dateTo }
              : undefined,
          },
        }),
      })

      const data = await res.json()
      if (!res.ok) {
        setState({ loading: false, error: data?.error || 'Failed to query the research assistant.', result: null })
        return
      }
      setState({ loading: false, error: null, result: data as ResearchAnswer })
    } catch (err) {
      setState({ loading: false, error: err instanceof Error ? err.message : 'Network error. Please try again.', result: null })
    }
  }, [filters])

  const reset = useCallback(() => setState(IDLE), [])

  return { ...state, ask, reset }
}
