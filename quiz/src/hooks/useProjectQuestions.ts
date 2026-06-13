import { useCallback, useEffect, useState } from 'react'
import { supabase } from '@/lib/supabase'
import type { ResearchCitation } from './useResearchQuery'

export interface ProjectQuestionAgentAnswer {
  departmentId: string
  departmentLabel: string
  answer: string
}

export interface ProjectQuestion {
  id: string
  projectId: string
  question: string
  departmentIds: string[]
  agentAnswers: ProjectQuestionAgentAnswer[]
  synthesis: string
  citations: ResearchCitation[]
  addedDocumentIds: string[]
  tokensUsed: number
  createdAt: string
}

interface QuestionRow {
  id: string
  project_id: string
  question: string
  department_ids: string[] | null
  agent_answers: ProjectQuestionAgentAnswer[] | null
  synthesis: string | null
  citations: ResearchCitation[] | null
  added_document_ids: string[] | null
  tokens_used: number | null
  created_at: string
}

const QUESTION_COLUMNS =
  'id, project_id, question, department_ids, agent_answers, synthesis, citations, added_document_ids, tokens_used, created_at'

function mapRow(r: QuestionRow): ProjectQuestion {
  return {
    id: r.id,
    projectId: r.project_id,
    question: r.question,
    departmentIds: r.department_ids ?? [],
    agentAnswers: r.agent_answers ?? [],
    synthesis: r.synthesis ?? '',
    citations: r.citations ?? [],
    addedDocumentIds: r.added_document_ids ?? [],
    tokensUsed: r.tokens_used ?? 0,
    createdAt: r.created_at,
  }
}

// A project's "Ask" FAQ: every question asked, its per-department answers,
// synthesis, and citations — newest first. Rows are written by
// api/research-ask.js (see useAskProjectQuestion below).
export function useProjectQuestions(projectId: string | null, refreshKey = 0) {
  const [questions, setQuestions] = useState<ProjectQuestion[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    if (!projectId) {
      setQuestions([])
      setLoading(false)
      setError(null)
      return
    }
    let cancelled = false
    setLoading(true)
    setError(null)

    supabase
      .from('research_project_questions')
      .select(QUESTION_COLUMNS)
      .eq('project_id', projectId)
      .order('created_at', { ascending: false })
      .then(({ data, error }: { data: QuestionRow[] | null; error: { message: string } | null }) => {
        if (cancelled) return
        if (error) {
          setQuestions([])
          setError(error.message)
          setLoading(false)
          return
        }
        setQuestions((data ?? []).map(mapRow))
        setLoading(false)
      })

    return () => { cancelled = true }
  }, [projectId, refreshKey])

  return { questions, loading, error }
}

interface AskState {
  loading: boolean
  error: string | null
}

const IDLE: AskState = { loading: false, error: null }

// Asks one question of a project's chosen department "agents" via
// api/research-ask.js: retrieves relevant corpus documents (auto-adding any
// that are new to the project), answers from each department's perspective,
// and synthesizes a combined result.
export function useAskProjectQuestion() {
  const [state, setState] = useState<AskState>(IDLE)

  const ask = useCallback(async (
    projectId: string,
    question: string,
    departmentIds: string[],
  ): Promise<ProjectQuestion | null> => {
    setState({ loading: true, error: null })

    const { data: { session } } = await supabase.auth.getSession()
    if (!session) {
      setState({ loading: false, error: 'Sign in to ask the research assistant.' })
      return null
    }

    try {
      const res = await fetch('/api/research-ask', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${session.access_token}`,
        },
        body: JSON.stringify({ projectId, question: question.trim(), departmentIds }),
      })

      const text = await res.text()
      let data: { error?: string } | null = null
      if (text) {
        try { data = JSON.parse(text) } catch { /* non-JSON response body */ }
      }
      if (!res.ok) {
        setState({ loading: false, error: data?.error || `Failed to get an answer (status ${res.status}).` })
        return null
      }
      if (!data) {
        setState({ loading: false, error: 'Empty response from server. Please try again.' })
        return null
      }
      setState(IDLE)
      return data as ProjectQuestion
    } catch (err) {
      const message = err instanceof Error ? err.message : 'Network error. Please try again.'
      setState({ loading: false, error: message })
      return null
    }
  }, [])

  const reset = useCallback(() => setState(IDLE), [])

  return { ...state, ask, reset }
}
