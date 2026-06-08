import { useEffect, useState } from 'react'
import { supabase } from '@/lib/supabase'
import { useResearchStore } from '@/stores/researchStore'

export interface ResearchDocumentRow {
  id: string
  agent_id: string
  type: string
  title: string
  published_at: string
  url: string
  pdf_url: string | null
  summary: string | null
  jurisdiction_provinces: string[] | null
  exam_tags: string[] | null
}

const PAGE_SIZE = 25

interface FeedState {
  documents: ResearchDocumentRow[]
  loading: boolean
  error: string | null
}

// Structured-filter feed over research_documents — the "Monitor" tab's data
// source. Mirrors the Stage 1 query in api/research.js so the feed and the
// Ask assistant are scoped by the same filter shape.
export function useResearchFeed(): FeedState {
  const filters = useResearchStore(s => s.filters)
  const [state, setState] = useState<FeedState>({ documents: [], loading: true, error: null })

  useEffect(() => {
    let cancelled = false
    setState(prev => ({ ...prev, loading: true, error: null }))

    let query = supabase
      .from('research_documents')
      .select('id, agent_id, type, title, published_at, url, pdf_url, summary, jurisdiction_provinces, exam_tags')
      .order('published_at', { ascending: false })
      .limit(PAGE_SIZE)

    if (filters.agentIds.length > 0) query = query.in('agent_id', filters.agentIds)
    if (filters.docTypes.length > 0) query = query.in('type', filters.docTypes)
    if (filters.provinces.length > 0) query = query.overlaps('jurisdiction_provinces', filters.provinces)
    if (filters.dateFrom) query = query.gte('published_at', filters.dateFrom)
    if (filters.dateTo) query = query.lte('published_at', filters.dateTo)

    query.then(({ data, error }: { data: ResearchDocumentRow[] | null; error: { message: string } | null }) => {
      if (cancelled) return
      if (error) {
        setState({ documents: [], loading: false, error: error.message })
      } else {
        setState({ documents: data ?? [], loading: false, error: null })
      }
    })

    return () => { cancelled = true }
  }, [filters])

  return state
}
