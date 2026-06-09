import { useEffect, useRef, useState } from 'react'
import { supabase } from '@/lib/supabase'
import { useResearchStore } from '@/stores/researchStore'
import type { ResearchDocumentRow } from '@/hooks/useResearchFeed'

// A keyword search result: the same row shape the feed renders, plus the
// ts_rank score and a highlighted <mark>…</mark> headline snippet. Metrics are
// not fetched here (search is keyword-first; chips would need a follow-up join).
export interface ResearchSearchRow extends ResearchDocumentRow {
  rank: number
  headline: string | null
}

const PAGE_SIZE = 25

interface SearchState {
  results: ResearchSearchRow[]
  loading: boolean
  loadingMore: boolean
  error: string | null
  hasMore: boolean
}

export interface SearchResult extends SearchState {
  loadMore: () => void
}

// Full-text keyword search over research_documents via the
// search_research_documents RPC. Driven by the shared `searchQuery` in
// researchStore and scoped by the same agent/province/LOB/date filters as the
// feed. When `documentIds` is provided (project view) results are restricted to
// that set. Returns nothing (empty, not loading) when the query is blank — the
// caller falls back to the date-grouped feed in that case.
export function useResearchSearch(documentIds?: string[] | null): SearchResult {
  const query = useResearchStore(s => s.searchQuery).trim()
  const filters = useResearchStore(s => s.filters)

  const [version, setVersion] = useState(0)
  const [page, setPage] = useState(0)
  const prevKeyRef = useRef('')

  const [results, setResults] = useState<ResearchSearchRow[]>([])
  const [loading, setLoading] = useState(false)
  const [loadingMore, setLoadingMore] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [hasMore, setHasMore] = useState(false)

  // Reset to page 0 whenever the query, filters, or scope change.
  const scopeKey = `${query}|${JSON.stringify(filters)}|${documentIds?.join(',') ?? ''}`
  useEffect(() => {
    if (prevKeyRef.current !== scopeKey) {
      prevKeyRef.current = scopeKey
      setVersion(v => v + 1)
      setPage(0)
    }
  }, [scopeKey])

  useEffect(() => {
    if (!query) {
      setResults([])
      setLoading(false)
      setLoadingMore(false)
      setError(null)
      setHasMore(false)
      return
    }

    let cancelled = false
    const offset = page * PAGE_SIZE
    if (page === 0) {
      setLoading(true)
      setError(null)
    } else {
      setLoadingMore(true)
    }

    supabase
      .rpc('search_research_documents', {
        query_text: query,
        filter_agent_ids: filters.agentIds.length > 0 ? filters.agentIds : null,
        filter_doc_types: filters.docTypes.length > 0 ? filters.docTypes : null,
        filter_provinces: filters.provinces.length > 0 ? filters.provinces : null,
        filter_lobs: filters.linesOfBusiness.length > 0 ? filters.linesOfBusiness : null,
        date_from: filters.dateFrom,
        date_to: filters.dateTo,
        match_limit: PAGE_SIZE,
        match_offset: offset,
        filter_document_ids: documentIds && documentIds.length > 0 ? documentIds : null,
      })
      .then(({ data, error: rpcError }: { data: ResearchSearchRow[] | null; error: { message: string } | null }) => {
        if (cancelled) return
        if (rpcError) {
          setError(rpcError.message)
        } else {
          const rows = (data ?? []).map(r => ({ ...r, research_metrics: null }))
          setResults(prev => (page === 0 ? rows : [...prev, ...rows]))
          setHasMore(rows.length === PAGE_SIZE)
        }
        setLoading(false)
        setLoadingMore(false)
      })

    return () => { cancelled = true }
  }, [version, page]) // eslint-disable-line react-hooks/exhaustive-deps

  const loadMore = () => setPage(p => p + 1)

  return { results, loading, loadingMore, error, hasMore, loadMore }
}
