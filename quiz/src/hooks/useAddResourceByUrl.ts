import { useCallback, useState } from 'react'
import { supabase } from '@/lib/supabase'

export interface AddedResource {
  id: string
  agent_id: string
  type: string
  title: string
  published_at: string
  url: string
  summary: string | null
  jurisdiction_provinces: string[] | null
  exam_tags: string[] | null
  is_in_review: boolean
}

export interface AddResourceResult {
  status: 'created' | 'duplicate'
  document: AddedResource
}

interface AddState {
  loading: boolean
  error: string | null
}

// Wraps the research-ingest-url edge function: paste a URL to a specific
// bulletin/guidance/regulation and have it fetched, extracted, and inserted
// into the corpus on demand (optionally attached to a project). Authenticated
// with the caller's Supabase session token, same shape as useResearchQuery.
export function useAddResourceByUrl() {
  const [state, setState] = useState<AddState>({ loading: false, error: null })

  const add = useCallback(async (url: string, projectId?: string): Promise<AddResourceResult | null> => {
    const trimmed = url.trim()
    if (!trimmed) return null

    setState({ loading: true, error: null })

    const { data: { session } } = await supabase.auth.getSession()
    if (!session) {
      setState({ loading: false, error: 'Sign in to add a source.' })
      return null
    }

    try {
      const { data, error } = await supabase.functions.invoke('research-ingest-url', {
        body: { url: trimmed, projectId },
      })
      if (error) {
        // Edge function errors surface a generic message; prefer the function's
        // own JSON error body when present.
        let message = error.message || 'Failed to add the source.'
        const ctx = (error as { context?: Response }).context
        if (ctx && typeof ctx.json === 'function') {
          try {
            const body = await ctx.json()
            if (body?.error) message = body.error
          } catch { /* keep generic message */ }
        }
        setState({ loading: false, error: message })
        return null
      }
      setState({ loading: false, error: null })
      return data as AddResourceResult
    } catch (err) {
      setState({ loading: false, error: err instanceof Error ? err.message : 'Network error. Please try again.' })
      return null
    }
  }, [])

  const reset = useCallback(() => setState({ loading: false, error: null }), [])

  return { ...state, add, reset }
}
