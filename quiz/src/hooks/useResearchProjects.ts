import { useCallback, useEffect, useState } from 'react'
import { supabase } from '@/lib/supabase'
import type { ResearchDocumentRow } from '@/hooks/useResearchFeed'

// Onboarding metadata captured when a project is created (all optional so older
// projects still load). See researchProjectMeta.ts for the value vocabularies.
export interface ProjectOnboarding {
  documentType?: string | null
  jurisdictionCountry?: string | null
  jurisdictionRegion?: string | null
  lineOfBusiness?: string | null
  departments?: string[]
}

export interface ResearchProject {
  id: string
  name: string
  description: string | null
  created_at: string
  updated_at: string
  documentCount: number
  documentType: string | null
  jurisdictionCountry: string | null
  jurisdictionRegion: string | null
  lineOfBusiness: string | null
  departments: string[]
}

interface ProjectsState {
  projects: ResearchProject[]
  loading: boolean
  error: string | null
}

interface ProjectRow {
  id: string
  name: string
  description: string | null
  created_at: string
  updated_at: string
  document_type: string | null
  jurisdiction_country: string | null
  jurisdiction_region: string | null
  line_of_business: string | null
  departments: string[] | null
  research_project_documents: { count: number }[]
}

const PROJECT_COLUMNS =
  'id, name, description, created_at, updated_at, document_type, ' +
  'jurisdiction_country, jurisdiction_region, line_of_business, departments'

function mapProjectRow(p: ProjectRow): ResearchProject {
  return {
    id: p.id,
    name: p.name,
    description: p.description,
    created_at: p.created_at,
    updated_at: p.updated_at,
    documentCount: p.research_project_documents?.[0]?.count ?? 0,
    documentType: p.document_type,
    jurisdictionCountry: p.jurisdiction_country,
    jurisdictionRegion: p.jurisdiction_region,
    lineOfBusiness: p.line_of_business,
    departments: p.departments ?? [],
  }
}

// User-owned research projects: named collections of saved corpus documents.
// All access is plain Supabase queries — RLS enforces that a user only sees and
// mutates their own projects (see 20260615_research_projects.sql).
export function useResearchProjects() {
  const [state, setState] = useState<ProjectsState>({ projects: [], loading: true, error: null })

  const refresh = useCallback(async () => {
    const { data, error } = await supabase
      .from('research_projects')
      .select(`${PROJECT_COLUMNS}, research_project_documents(count)`)
      .order('updated_at', { ascending: false })

    if (error) {
      setState({ projects: [], loading: false, error: error.message })
      return
    }
    const projects = (data as ProjectRow[] ?? []).map(mapProjectRow)
    setState({ projects, loading: false, error: null })
  }, [])

  useEffect(() => { refresh() }, [refresh])

  const createProject = useCallback(async (
    name: string,
    description?: string,
    onboarding?: ProjectOnboarding,
  ): Promise<ResearchProject | null> => {
    const { data: { user } } = await supabase.auth.getUser()
    if (!user) return null
    const { data, error } = await supabase
      .from('research_projects')
      .insert({
        user_id: user.id,
        name: name.trim(),
        description: description?.trim() || null,
        document_type: onboarding?.documentType ?? null,
        jurisdiction_country: onboarding?.jurisdictionCountry ?? null,
        jurisdiction_region: onboarding?.jurisdictionRegion ?? null,
        line_of_business: onboarding?.lineOfBusiness ?? null,
        departments: onboarding?.departments ?? [],
      })
      .select(PROJECT_COLUMNS)
      .single()
    if (error || !data) return null
    await refresh()
    return mapProjectRow({ ...(data as ProjectRow), research_project_documents: [{ count: 0 }] })
  }, [refresh])

  const renameProject = useCallback(async (id: string, name: string, description?: string) => {
    await supabase
      .from('research_projects')
      .update({ name: name.trim(), description: description?.trim() || null, updated_at: new Date().toISOString() })
      .eq('id', id)
    await refresh()
  }, [refresh])

  const deleteProject = useCallback(async (id: string) => {
    await supabase.from('research_projects').delete().eq('id', id)
    await refresh()
  }, [refresh])

  const addDocument = useCallback(async (projectId: string, documentId: string) => {
    await supabase
      .from('research_project_documents')
      .upsert({ project_id: projectId, document_id: documentId }, { onConflict: 'project_id,document_id', ignoreDuplicates: true })
    await refresh()
  }, [refresh])

  const removeDocument = useCallback(async (projectId: string, documentId: string) => {
    await supabase
      .from('research_project_documents')
      .delete()
      .eq('project_id', projectId)
      .eq('document_id', documentId)
    await refresh()
  }, [refresh])

  return { ...state, refresh, createProject, renameProject, deleteProject, addDocument, removeDocument }
}

interface ProjectDocsState {
  documents: ResearchDocumentRow[]
  documentIds: string[]
  loading: boolean
  error: string | null
}

interface ProjectDocJoinRow {
  document_id: string
  research_documents: ResearchDocumentRow | null
}

// The documents (and their ids) belonging to a single project, newest-added
// first. The id list scopes the project's Resources view (keyword search + feed
// + Ask) to just these documents.
export function useProjectDocuments(projectId: string | null, refreshKey = 0) {
  const [state, setState] = useState<ProjectDocsState>({ documents: [], documentIds: [], loading: true, error: null })

  useEffect(() => {
    if (!projectId) {
      setState({ documents: [], documentIds: [], loading: false, error: null })
      return
    }
    let cancelled = false
    setState(s => ({ ...s, loading: true, error: null }))

    supabase
      .from('research_project_documents')
      .select(
        'document_id, added_at, ' +
          'research_documents(id, agent_id, type, title, published_at, url, pdf_url, summary, ' +
          'jurisdiction_provinces, exam_tags, research_metrics(metric_name, value, unit, period))',
      )
      .eq('project_id', projectId)
      .order('added_at', { ascending: false })
      .then(({ data, error }: { data: ProjectDocJoinRow[] | null; error: { message: string } | null }) => {
        if (cancelled) return
        if (error) {
          setState({ documents: [], documentIds: [], loading: false, error: error.message })
          return
        }
        const rows = (data ?? [])
        const documents = rows.map(r => r.research_documents).filter((d): d is ResearchDocumentRow => d !== null)
        setState({ documents, documentIds: rows.map(r => r.document_id), loading: false, error: null })
      })

    return () => { cancelled = true }
  }, [projectId, refreshKey])

  return state
}
