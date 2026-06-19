import { useCallback, useEffect, useState } from 'react'
import { supabase } from '@/lib/supabase'
import type { WikiEntryKind, WikiEntryRef } from '@/lib/wikiRoutes'

// Per-section content of a research project: the resources pinned to a section
// (or one of its subsections) and the free-text notes authored against it. Both
// are stored against the project keyed by the section's stable slug — the
// section structure itself comes from a static template
// (researchProjectMeta.ts → projectSections), so there is no sections table.
// Backed by research_project_section_resources / _notes
// (20260621_research_project_structure.sql); RLS gates everything by project
// ownership.

export interface SectionResource {
  id: string
  sectionKey: string
  subsectionKey: string | null
  ref: WikiEntryRef
}

export interface SectionNote {
  id: string
  sectionKey: string
  subsectionKey: string | null
  body: string
  updatedAt: string
}

interface ResourceRow {
  id: string
  section_key: string
  subsection_key: string | null
  kind: WikiEntryKind
  name: string
  path: string | null
}

interface NoteRow {
  id: string
  section_key: string
  subsection_key: string | null
  body: string
  updated_at: string
}

interface SectionsState {
  resources: SectionResource[]
  notes: SectionNote[]
  loading: boolean
  error: string | null
}

export function useProjectSections(projectId: string | null) {
  const [state, setState] = useState<SectionsState>({ resources: [], notes: [], loading: true, error: null })

  const refresh = useCallback(async () => {
    if (!projectId) {
      setState({ resources: [], notes: [], loading: false, error: null })
      return
    }
    const [resourcesRes, notesRes] = await Promise.all([
      supabase
        .from('research_project_section_resources')
        .select('id, section_key, subsection_key, kind, name, path')
        .eq('project_id', projectId)
        .order('added_at', { ascending: true }),
      supabase
        .from('research_project_section_notes')
        .select('id, section_key, subsection_key, body, updated_at')
        .eq('project_id', projectId)
        .order('created_at', { ascending: true }),
    ])
    const error = resourcesRes.error?.message ?? notesRes.error?.message ?? null
    if (error) {
      setState(s => ({ ...s, loading: false, error }))
      return
    }
    const resources = (resourcesRes.data as ResourceRow[] ?? []).map(r => ({
      id: r.id,
      sectionKey: r.section_key,
      subsectionKey: r.subsection_key,
      ref: { kind: r.kind, name: r.name, path: r.path ?? undefined },
    }))
    const notes = (notesRes.data as NoteRow[] ?? []).map(n => ({
      id: n.id,
      sectionKey: n.section_key,
      subsectionKey: n.subsection_key,
      body: n.body,
      updatedAt: n.updated_at,
    }))
    setState({ resources, notes, loading: false, error: null })
  }, [projectId])

  useEffect(() => { refresh() }, [refresh])

  const addResource = useCallback(async (
    sectionKey: string,
    subsectionKey: string | null,
    ref: WikiEntryRef,
  ) => {
    if (!projectId) return
    await supabase
      .from('research_project_section_resources')
      .upsert(
        {
          project_id: projectId,
          section_key: sectionKey,
          subsection_key: subsectionKey,
          kind: ref.kind,
          name: ref.name,
          path: ref.path ?? null,
        },
        { onConflict: 'project_id,section_key,subsection_key,kind,name', ignoreDuplicates: true },
      )
    await refresh()
  }, [projectId, refresh])

  const removeResource = useCallback(async (id: string) => {
    await supabase.from('research_project_section_resources').delete().eq('id', id)
    await refresh()
  }, [refresh])

  const addNote = useCallback(async (
    sectionKey: string,
    subsectionKey: string | null,
    body: string,
  ): Promise<void> => {
    if (!projectId) return
    await supabase
      .from('research_project_section_notes')
      .insert({ project_id: projectId, section_key: sectionKey, subsection_key: subsectionKey, body })
    await refresh()
  }, [projectId, refresh])

  const updateNote = useCallback(async (id: string, body: string) => {
    await supabase
      .from('research_project_section_notes')
      .update({ body, updated_at: new Date().toISOString() })
      .eq('id', id)
    await refresh()
  }, [refresh])

  const removeNote = useCallback(async (id: string) => {
    await supabase.from('research_project_section_notes').delete().eq('id', id)
    await refresh()
  }, [refresh])

  return { ...state, refresh, addResource, removeResource, addNote, updateNote, removeNote }
}
