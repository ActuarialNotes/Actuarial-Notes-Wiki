import { useEffect, useRef, useState } from 'react'
import { supabase } from '@/lib/supabase'
import { useResearchStore } from '@/stores/researchStore'

export interface ResearchMetricSummary {
  metric_name: string
  value: number
  unit: string
  period: string
}

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
  research_metrics: ResearchMetricSummary[] | null
}

export const PAGE_SIZE = 25

interface FeedState {
  documents: ResearchDocumentRow[]
  loading: boolean
  loadingMore: boolean
  error: string | null
  hasMore: boolean
  total: number | null
}

export interface FeedResult extends FeedState {
  loadMore: () => void
}

// Structured-filter feed over research_documents — the "Monitor" tab's data
// source. Mirrors the Stage 1 query in api/research.js so the feed and the
// Ask assistant are scoped by the same filter shape.
//
// Supports offset-based pagination: `loadMore` fetches the next page and
// appends. Resets automatically when filters change (even if already on page 0).
export function useResearchFeed(): FeedResult {
  const filters = useResearchStore(s => s.filters)

  // filtersVersion bumps whenever filters reference changes, so the fetch
  // effect always re-runs on filter changes even when page is already 0.
  const [filtersVersion, setFiltersVersion] = useState(0)
  const [page, setPage] = useState(0)
  const prevFiltersRef = useRef(filters)

  const [documents, setDocuments] = useState<ResearchDocumentRow[]>([])
  const [loading, setLoading] = useState(true)
  const [loadingMore, setLoadingMore] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [hasMore, setHasMore] = useState(false)
  const [total, setTotal] = useState<number | null>(null)

  useEffect(() => {
    if (prevFiltersRef.current !== filters) {
      prevFiltersRef.current = filters
      setFiltersVersion(v => v + 1)
      setPage(0)
    }
  }, [filters])

  useEffect(() => {
    let cancelled = false
    const offset = page * PAGE_SIZE

    if (page === 0) {
      setLoading(true)
      setLoadingMore(false)
      setError(null)
      setDocuments([])
      setHasMore(false)
      setTotal(null)
    } else {
      setLoadingMore(true)
    }

    let query = supabase
      .from('research_documents')
      .select(
        'id, agent_id, type, title, published_at, url, pdf_url, summary, ' +
          'jurisdiction_provinces, exam_tags, ' +
          'research_metrics(metric_name, value, unit, period)',
        { count: 'exact' },
      )
      .order('published_at', { ascending: false })
      .range(offset, offset + PAGE_SIZE - 1)

    if (filters.agentIds.length > 0) query = query.in('agent_id', filters.agentIds)
    if (filters.docTypes.length > 0) query = query.in('type', filters.docTypes)
    if (filters.provinces.length > 0) query = query.overlaps('jurisdiction_provinces', filters.provinces)
    if (filters.linesOfBusiness.length > 0) query = query.overlaps('line_of_business', filters.linesOfBusiness)
    if (filters.dateFrom) query = query.gte('published_at', filters.dateFrom)
    if (filters.dateTo) query = query.lte('published_at', filters.dateTo)

    query.then(
      ({
        data,
        error: qError,
        count,
      }: {
        data: ResearchDocumentRow[] | null
        error: { message: string } | null
        count: number | null
      }) => {
        if (cancelled) return
        if (qError) {
          setError(qError.message)
          setLoading(false)
          setLoadingMore(false)
        } else {
          const rows = data ?? []
          const totalCount = count ?? 0
          setDocuments(prev => (page === 0 ? rows : [...prev, ...rows]))
          setTotal(totalCount)
          setHasMore(offset + rows.length < totalCount)
          setLoading(false)
          setLoadingMore(false)
        }
      },
    )

    return () => {
      cancelled = true
    }
  }, [filtersVersion, page]) // eslint-disable-line react-hooks/exhaustive-deps

  const loadMore = () => setPage(p => p + 1)

  return { documents, loading, loadingMore, error, hasMore, total, loadMore }
}
