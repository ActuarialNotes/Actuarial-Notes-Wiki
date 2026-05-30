import { useState, useEffect, useMemo, useRef } from 'react'
import { Link, useNavigate, useSearchParams } from 'react-router-dom'
import { X, Check, Search as SearchIcon, BookMarked, FileText, GraduationCap, ChevronDown, CalendarCheck, Lock } from 'lucide-react'
import { fetchAllQuestions } from '@/lib/github'
import { parseAllQuestions, filterQuestions } from '@/lib/parser'
import type { Question, Difficulty } from '@/lib/parser'
import { hrefToEntryRef, pathToEntryRef, wikiRoute } from '@/lib/wikiRoutes'
import { buildWikiIndex, type WikiIndexItem } from '@/lib/wikiIndex'
import { useTopics } from '@/hooks/useTopics'
import { useAuth } from '@/hooks/useAuth'
import { useWikiSyllabus } from '@/hooks/useWikiSyllabus'
import type { WikiExamSyllabus } from '@/lib/wikiParser'
import { useStudyPlan } from '@/hooks/useStudyPlan'
import { useSubscription } from '@/hooks/useSubscription'
import { useConceptMastery } from '@/hooks/useConceptMastery'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { LatexText } from '@/components/LatexText'
import { ExplanationPanel } from '@/components/ExplanationPanel'

type SearchType = 'concepts' | 'questions' | 'resources'

function linkMatchesConcept(link: string, conceptName: string): boolean {
  const lower = conceptName.toLowerCase()
  const ref = hrefToEntryRef(link)
  if (ref?.name.toLowerCase() === lower) return true
  const lastSegment = link.split('/').filter(Boolean).pop()
  return !!lastSegment && lastSegment.replace(/-/g, ' ').toLowerCase() === lower
}

const EXAMS = [
  { value: '', label: 'All Exams' },
  { value: 'Probability', label: 'Exam P' },
  { value: 'Financial Mathematics', label: 'Exam FM' },
]

const DIFFICULTIES: { value: Difficulty | ''; label: string }[] = [
  { value: '', label: 'All' },
  { value: 'easy', label: 'Easy' },
  { value: 'medium', label: 'Medium' },
  { value: 'hard', label: 'Hard' },
]

const SEARCH_TYPES: { value: SearchType; label: string }[] = [
  { value: 'concepts', label: 'Concepts' },
  { value: 'questions', label: 'Questions' },
  { value: 'resources', label: 'Resources' },
]

const SEARCH_STATE_KEY = 'actuarial_search_state'

interface QuestionRowProps {
  question: Question
  selected: boolean
  onToggleSelect: (id: string) => void
  activeDifficulty: Difficulty | ''
  activeTopic: string
  activeSubtopics: string[]
}

function QuestionRow({ question, selected, onToggleSelect, activeDifficulty, activeTopic, activeSubtopics }: QuestionRowProps) {
  const [expanded, setExpanded] = useState(false)
  const [showAnswer, setShowAnswer] = useState(false)

  return (
    <div
      className={`border rounded-lg p-4 space-y-2 transition-colors ${
        selected ? 'border-primary bg-primary/5' : 'hover:bg-accent/30'
      }`}
    >
      <div className="flex items-start justify-between gap-3">
        <div className="flex items-center flex-wrap gap-2 min-w-0">
          <button
            type="button"
            onClick={() => onToggleSelect(question.id)}
            aria-label={`Select question ${question.id}`}
            className={`h-6 w-6 shrink-0 rounded-full border-2 flex items-center justify-center transition-colors cursor-pointer ${
              selected
                ? 'bg-primary border-primary text-primary-foreground'
                : 'border-input hover:border-primary'
            }`}
          >
            {selected && <Check className="h-3.5 w-3.5" />}
          </button>
          <span className={`text-xs px-2 py-0.5 rounded-full border shrink-0 transition-colors ${
            activeTopic && question.exam === activeTopic
              ? 'bg-foreground text-background border-foreground'
              : 'border-input text-muted-foreground bg-background'
          }`}>
            {question.exam}
          </span>
          <span className={`text-xs px-2 py-0.5 rounded-full border shrink-0 transition-colors ${
            activeSubtopics.length > 0 && activeSubtopics.includes(question.topic)
              ? 'bg-foreground text-background border-foreground'
              : 'border-input text-muted-foreground bg-background'
          }`}>
            {question.topic}
          </span>
          <span className={`text-xs px-2 py-0.5 rounded-full border shrink-0 capitalize transition-colors ${
            activeDifficulty && question.difficulty === activeDifficulty
              ? 'bg-foreground text-background border-foreground'
              : 'border-input text-muted-foreground bg-background'
          }`}>
            {question.difficulty}
          </span>
          {question.author && (
            <span className="text-xs text-muted-foreground shrink-0">by {question.author}</span>
          )}
          {question.year && (
            <span className="text-xs text-muted-foreground shrink-0">{question.year}</span>
          )}
        </div>
        <button
          type="button"
          onClick={() => setExpanded(v => !v)}
          className="text-xs text-muted-foreground hover:text-foreground transition-colors shrink-0"
        >
          {expanded ? 'Collapse' : 'Expand'}
        </button>
      </div>

      <div className="text-sm text-muted-foreground leading-relaxed">
        {expanded ? (
          <LatexText>{question.stem}</LatexText>
        ) : (
          <LatexText>
            {(() => { const w = question.stem.trim().split(/\s+/); return w.length <= 6 ? question.stem : w.slice(0, 6).join(' ') + '…' })()}
          </LatexText>
        )}
      </div>

      {expanded && (
        <div className="pt-2 space-y-1">
          {question.options.map(opt => {
            const isCorrect = showAnswer && opt.key === question.answer
            return (
              <div
                key={opt.key}
                className={`flex gap-2 text-sm rounded px-2 py-1 ${
                  isCorrect ? 'bg-green-100 dark:bg-green-950 text-green-900 dark:text-green-200' : ''
                }`}
              >
                <span className="font-medium text-muted-foreground shrink-0">{opt.key})</span>
                <span><LatexText>{opt.text}</LatexText></span>
              </div>
            )
          })}

          <div className="pt-2">
            {!showAnswer ? (
              <button
                type="button"
                onClick={() => setShowAnswer(true)}
                className="text-xs px-3 py-1 rounded-md border border-input hover:bg-accent transition-colors"
              >
                Show answer
              </button>
            ) : (
              <button
                type="button"
                onClick={() => setShowAnswer(false)}
                className="text-xs px-3 py-1 rounded-md border border-input hover:bg-accent transition-colors"
              >
                Hide answer
              </button>
            )}
          </div>

          {showAnswer && (
            <ExplanationPanel
              explanation={question.explanation}
              wikiLinks={question.wiki_link}
              isCorrect
            />
          )}
        </div>
      )}
    </div>
  )
}

function highlight(text: string, query: string) {
  const q = query.trim()
  if (!q) return text
  const idx = text.toLowerCase().indexOf(q.toLowerCase())
  if (idx < 0) return text
  return (
    <>
      {text.slice(0, idx)}
      <mark className="bg-primary/20 text-foreground rounded px-0.5">
        {text.slice(idx, idx + q.length)}
      </mark>
      {text.slice(idx + q.length)}
    </>
  )
}

function ConceptResultRow({ item, query, syllabi }: { item: WikiIndexItem; query: string; syllabi: WikiExamSyllabus[] }) {
  const ref = pathToEntryRef(item.path) ?? { kind: 'concept' as const, name: item.name }

  let route = wikiRoute(ref)
  if (item.category === 'concept' && syllabi.length > 0) {
    const needle = item.name.toLowerCase()
    const examSyllabus = syllabi.find(s =>
      s.topics.some(t => t.concepts.some(c => c.name.toLowerCase() === needle))
    )
    if (examSyllabus) {
      const examRoute = wikiRoute({ kind: 'exam', name: examSyllabus.fileName ?? examSyllabus.examLabel })
      route = `${examRoute}?concept=${encodeURIComponent(item.name)}`
    }
  }

  const Icon =
    item.category === 'exam' ? GraduationCap :
    item.category === 'concept' ? FileText :
    BookMarked
  const iconColor =
    item.category === 'exam' ? 'text-teal-500' :
    item.category === 'concept' ? 'text-violet-500' :
    'text-muted-foreground'
  const display = item.title ?? item.name

  return (
    <Link
      to={route}
      className="flex items-start gap-3 px-4 py-3 hover:bg-accent/60 transition-colors"
    >
      <Icon className={`h-4 w-4 shrink-0 mt-0.5 ${iconColor}`} />
      <div className="min-w-0 flex-1">
        <div className="text-sm truncate">{highlight(display, query)}</div>
        {(item.author || item.year) && (
          <div className="text-[11px] text-muted-foreground truncate mt-0.5">
            {[item.author, item.year].filter(Boolean).join(' · ')}
          </div>
        )}
      </div>
      {item.questionCount ? (
        <span className="shrink-0 text-[11px] text-muted-foreground self-center tabular-nums">
          {item.questionCount} {item.questionCount === 1 ? 'question' : 'questions'}
        </span>
      ) : null}
    </Link>
  )
}

export default function Search() {
  const navigate = useNavigate()
  const [searchParams] = useSearchParams()
  const { byExam: subtopicsByTopic, loading: subtopicsLoading } = useTopics()
  const { user } = useAuth()
  const { syllabi } = useWikiSyllabus()
  const { isPremium } = useSubscription()
  const { records: masteryRecords, loading: masteryLoading } = useConceptMastery()

  const [allQuestions, setAllQuestions] = useState<Question[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [retryCount, setRetryCount] = useState(0)

  const [searchType, setSearchType] = useState<SearchType>('questions')
  const [textQuery, setTextQuery] = useState('')
  const [wikiIndex, setWikiIndex] = useState<WikiIndexItem[]>([])
  const [wikiLoading, setWikiLoading] = useState(false)
  const wikiIndexFetchedRef = useRef(false)

  const [topic, setTopic] = useState('')
  const [selectedSubtopics, setSelectedSubtopics] = useState<string[]>([])
  const [difficulty, setDifficulty] = useState<Difficulty | ''>('')
  const [selectedIds, setSelectedIds] = useState<Set<string>>(new Set())
  const [conceptFilter, setConceptFilter] = useState(() => searchParams.get('concept') ?? '')
  const [openTopicGroups, setOpenTopicGroups] = useState<Set<string>>(new Set())
  const [useTodaysPlan, setUseTodaysPlan] = useState(false)

  useEffect(() => {
    setLoading(true)
    setError(null)
    fetchAllQuestions()
      .then(raw => setAllQuestions(parseAllQuestions(raw)))
      .catch(err => setError(err instanceof Error ? err.message : 'Failed to load questions'))
      .finally(() => setLoading(false))
  }, [retryCount])

  useEffect(() => {
    if (searchType === 'questions') return
    if (wikiIndexFetchedRef.current) return
    wikiIndexFetchedRef.current = true
    setWikiLoading(true)
    buildWikiIndex()
      .then(items => setWikiIndex(items))
      .catch(() => {})
      .finally(() => setWikiLoading(false))
  }, [searchType])

  // Restore filter state saved before launching quiz
  useEffect(() => {
    try {
      const raw = sessionStorage.getItem(SEARCH_STATE_KEY)
      if (!raw) return
      sessionStorage.removeItem(SEARCH_STATE_KEY)
      const s = JSON.parse(raw) as {
        topic?: string; selectedSubtopics?: string[]
        difficulty?: Difficulty | ''; conceptFilter?: string; selectedIds?: string[]
      }
      if (s.topic)               setTopic(s.topic)
      if (s.selectedSubtopics?.length) setSelectedSubtopics(s.selectedSubtopics)
      if (s.difficulty)          setDifficulty(s.difficulty)
      if (s.conceptFilter)       setConceptFilter(s.conceptFilter)
      if (s.selectedIds?.length) setSelectedIds(new Set(s.selectedIds))
    } catch { /* ignore */ }
  }, [])

  function toggleSubtopic(subtopic: string) {
    setUseTodaysPlan(false)
    setSelectedSubtopics(prev =>
      prev.includes(subtopic) ? prev.filter(s => s !== subtopic) : [...prev, subtopic]
    )
  }

  function toggleTopicGroup(groupName: string) {
    setOpenTopicGroups(prev => {
      const next = new Set(prev)
      next.has(groupName) ? next.delete(groupName) : next.add(groupName)
      return next
    })
  }

  function selectAllInGroup(group: { subtopics: string[] }, e: React.MouseEvent) {
    e.stopPropagation()
    setUseTodaysPlan(false)
    const allSelected = group.subtopics.every(s => selectedSubtopics.includes(s))
    setSelectedSubtopics(prev =>
      allSelected
        ? prev.filter(s => !group.subtopics.includes(s))
        : [...new Set([...prev, ...group.subtopics])]
    )
  }

  function toggleSelectQuestion(id: string) {
    setSelectedIds(prev => {
      const next = new Set(prev)
      if (next.has(id)) next.delete(id)
      else next.add(id)
      return next
    })
  }

  function clearFilters() {
    setTopic('')
    setSelectedSubtopics([])
    setDifficulty('')
    setSelectedIds(new Set())
    setConceptFilter('')
    setTextQuery('')
    setUseTodaysPlan(false)
    setOpenTopicGroups(new Set())
  }

  const subtopics = topic ? (subtopicsByTopic[topic] ?? []) : []

  const syllabusForTopic = useMemo(
    () => syllabi.find(s => s.examTopic === topic) ?? null,
    [syllabi, topic],
  )

  const orderedSubtopics = useMemo(() => {
    if (!syllabusForTopic) return subtopics
    const conceptToIdx = new Map<string, number>()
    syllabusForTopic.topics.forEach((t, idx) => {
      conceptToIdx.set(t.name.toLowerCase(), idx)
      t.concepts.forEach(c => conceptToIdx.set(c.name.toLowerCase(), idx))
    })
    const getIdx = (st: string): number => {
      const exact = conceptToIdx.get(st.toLowerCase())
      if (exact !== undefined) return exact
      const stLower = st.toLowerCase()
      for (const [key, idx] of conceptToIdx) {
        if (stLower.includes(key) || key.includes(stLower)) return idx
      }
      return Number.MAX_SAFE_INTEGER
    }
    return [...subtopics].sort((a, b) => {
      const diff = getIdx(a) - getIdx(b)
      return diff !== 0 ? diff : a.localeCompare(b)
    })
  }, [subtopics, syllabusForTopic])

  const groupedSubtopics = useMemo(() => {
    if (!syllabusForTopic) {
      return [{ name: 'All Topics', weight: undefined as string | undefined, subtopics: orderedSubtopics }]
    }
    const subtopicToIdx = new Map<string, number>()
    syllabusForTopic.topics.forEach((wt, idx) => {
      for (const st of orderedSubtopics) {
        if (subtopicToIdx.has(st)) continue
        const stL = st.toLowerCase()
        if (stL === wt.name.toLowerCase()) { subtopicToIdx.set(st, idx); continue }
        for (const c of wt.concepts) {
          const cL = c.name.toLowerCase()
          if (stL === cL || stL.includes(cL) || cL.includes(stL)) {
            subtopicToIdx.set(st, idx); break
          }
        }
      }
    })
    const groups = syllabusForTopic.topics.map(t => ({
      name: t.name, weight: t.weight as string | undefined, subtopics: [] as string[]
    }))
    const ungrouped: string[] = []
    for (const st of orderedSubtopics) {
      const idx = subtopicToIdx.get(st)
      if (idx !== undefined) groups[idx].subtopics.push(st)
      else ungrouped.push(st)
    }
    const result = groups.filter(g => g.subtopics.length > 0)
    if (ungrouped.length > 0) result.push({ name: 'Other', weight: undefined, subtopics: ungrouped })
    return result
  }, [syllabusForTopic, orderedSubtopics])

  const { plan } = useStudyPlan(syllabusForTopic, masteryRecords, null, masteryLoading)

  const todaySubtopics = useMemo(() => {
    if (!plan?.todaysConcepts?.length) return new Set<string>()
    const todaySet = new Set(plan.todaysConcepts.map(c => c.toLowerCase()))
    const result = new Set<string>()
    for (const q of allQuestions) {
      if (q.exam !== topic) continue
      for (const link of q.wiki_link) {
        const ref = hrefToEntryRef(link)
        const name = ref?.name ?? (link.split('/').filter(Boolean).pop()?.replace(/-/g, ' ') ?? '')
        if (todaySet.has(name.toLowerCase())) {
          result.add(q.topic)
          break
        }
      }
    }
    return result
  }, [plan, allQuestions, topic])

  const planConceptCount = useMemo(() => {
    if (!plan) return 0
    return plan.status === 'review_mode'
      ? (plan.reviewConcepts?.length ?? 0)
      : plan.todaysConcepts.length
  }, [plan])

  const filtered = useMemo(() => {
    let result = filterQuestions(allQuestions, {
      exam: topic || undefined,
      topics: selectedSubtopics.length ? selectedSubtopics : undefined,
      difficulty: difficulty || undefined,
      search: textQuery.trim() || undefined,
    })
    if (conceptFilter) {
      result = result.filter(q =>
        q.wiki_link.some(link => linkMatchesConcept(link, conceptFilter))
      )
    }
    if (useTodaysPlan && plan) {
      const displayConcepts = plan.status === 'review_mode'
        ? (plan.reviewConcepts ?? [])
        : plan.todaysConcepts
      const todaySet = new Set(displayConcepts.map(n => n.toLowerCase()))
      result = result.filter(q => q.wiki_link.some(link => {
        const ref = hrefToEntryRef(link)
        const n = (ref?.name ?? link.split('/').filter(Boolean).pop()?.replace(/-/g, ' ') ?? '').toLowerCase()
        return todaySet.has(n)
      }))
    }
    return result
  }, [allQuestions, topic, selectedSubtopics, difficulty, conceptFilter, textQuery, useTodaysPlan, plan])

  // How many questions link to each concept, keyed by canonical concept name.
  // This is the wiki_link concept graph that drives concept search.
  const conceptQuestionCounts = useMemo(() => {
    const counts = new Map<string, number>()
    for (const question of allQuestions) {
      const seen = new Set<string>()
      for (const link of question.wiki_link) {
        const ref = hrefToEntryRef(link)
        const name = ref?.kind === 'concept' && ref.name
          ? ref.name
          : (link.split('/').filter(Boolean).pop() ?? '').replace(/-/g, ' ')
        const key = name.toLowerCase()
        if (!key || seen.has(key)) continue
        seen.add(key)
        counts.set(key, (counts.get(key) ?? 0) + 1)
      }
    }
    return counts
  }, [allQuestions])

  const wikiResults = useMemo(() => {
    if (searchType === 'questions') return []
    const q = textQuery.trim().toLowerCase()
    if (!q) return []

    if (searchType === 'resources') {
      return wikiIndex
        .filter(it => it.category === 'document')
        .filter(it => [it.title, it.name, it.author].filter(Boolean).join(' ').toLowerCase().includes(q))
        .sort((a, b) => (a.title ?? a.name).localeCompare(b.title ?? b.name))
        .slice(0, 30)
    }

    // Concepts: surface the concepts referenced by question wiki_links. Start
    // from the indexed exam/concept pages, attach a question count, then add any
    // wiki_link concept that has no page yet so it's still discoverable.
    const items: WikiIndexItem[] = wikiIndex
      .filter(it => it.category === 'exam' || it.category === 'concept')
      .map(it => it.category === 'concept'
        ? { ...it, questionCount: conceptQuestionCounts.get(it.name.toLowerCase()) ?? 0 }
        : it)

    const indexedConcepts = new Set(
      items.filter(it => it.category === 'concept').map(it => it.name.toLowerCase()),
    )
    for (const [key, count] of conceptQuestionCounts) {
      if (indexedConcepts.has(key)) continue
      const display = allQuestions
        .flatMap(qq => qq.wiki_link)
        .map(l => hrefToEntryRef(l))
        .find(r => r?.kind === 'concept' && r.name.toLowerCase() === key)?.name
      if (!display) continue
      items.push({ category: 'concept', name: display, path: `Concepts/${display}.md`, questionCount: count })
    }

    return items
      .filter(it => [it.title, it.name, it.author].filter(Boolean).join(' ').toLowerCase().includes(q))
      .sort((a, b) => {
        // Concepts that have questions rank first, by descending question count.
        const ca = a.questionCount ?? 0
        const cb = b.questionCount ?? 0
        if ((cb > 0 ? 1 : 0) !== (ca > 0 ? 1 : 0)) return (cb > 0 ? 1 : 0) - (ca > 0 ? 1 : 0)
        if (cb !== ca) return cb - ca
        return (a.title ?? a.name).localeCompare(b.title ?? b.name)
      })
      .slice(0, 30)
  }, [wikiIndex, textQuery, searchType, conceptQuestionCounts, allQuestions])

  const hasFilters = topic || selectedSubtopics.length || difficulty || conceptFilter || textQuery

  function handleStartQuiz() {
    const params = new URLSearchParams({ mode: 'quiz', reveal: 'during', from: 'search' })

    try {
      sessionStorage.setItem(SEARCH_STATE_KEY, JSON.stringify({
        topic, selectedSubtopics, difficulty, conceptFilter,
        selectedIds: [...selectedIds],
      }))
    } catch { /* ignore */ }

    if (selectedIds.size > 0) {
      const ids = [...selectedIds]
      const storageExam = allQuestions.find(q => selectedIds.has(q.id))?.exam ?? 'Probability'
      try {
        sessionStorage.setItem('actuarial_selected_ids', JSON.stringify(ids))
      } catch {
        params.set('ids', ids.join(','))
      }
      params.set('selection', 'stored')
      params.set('exam', storageExam)
      navigate(`/quiz?${params.toString()}`)
      return
    }

    if (useTodaysPlan && plan) {
      const displayConcepts = plan.status === 'review_mode'
        ? (plan.reviewConcepts ?? [])
        : plan.todaysConcepts
      if (displayConcepts.length > 0) {
        const todaySet = new Set(displayConcepts.map(n => n.toLowerCase()))
        const todayQs = allQuestions.filter(q => {
          if (q.exam !== topic) return false
          return q.wiki_link.some(link => {
            const ref = hrefToEntryRef(link)
            const n = (ref?.name ?? link.split('/').filter(Boolean).pop()?.replace(/-/g, ' ') ?? '').toLowerCase()
            return todaySet.has(n)
          })
        })
        if (todayQs.length > 0) {
          try {
            sessionStorage.setItem('actuarial_selected_ids', JSON.stringify(todayQs.map(q => q.id)))
          } catch { /* ignore */ }
          params.set('selection', 'stored')
          params.set('exam', topic)
          navigate(`/quiz?${params.toString()}`)
          return
        }
      }
    }

    if (topic) params.set('exam', topic)
    else params.set('exam', 'Probability')
    if (selectedSubtopics.length) params.set('topics', selectedSubtopics.join(','))
    if (difficulty) params.set('difficulty', difficulty)
    navigate(`/quiz?${params.toString()}`)
  }

  const searchPlaceholder =
    searchType === 'questions' ? 'Search question text…' :
    searchType === 'concepts' ? 'Search concepts and exams…' :
    'Search resources…'

  return (
    <div className="container max-w-4xl mx-auto px-4 sm:px-6 py-8 pb-28 space-y-6">
      <div className="space-y-1">
        <h1 className="text-3xl font-bold tracking-tight">Search</h1>
        <p className="text-muted-foreground">Search questions, concepts, and resources</p>
      </div>

      {/* Search type toggle */}
      <div className="flex gap-2 flex-wrap">
        {SEARCH_TYPES.map(({ value, label }) => (
          <button
            key={value}
            type="button"
            onClick={() => {
              setSearchType(value)
              setTextQuery('')
            }}
            className={`px-4 py-2 rounded-full border text-sm font-medium transition-colors ${
              searchType === value
                ? 'border-primary bg-primary text-primary-foreground'
                : 'border-input hover:bg-accent'
            }`}
          >
            {label}
          </button>
        ))}
      </div>

      <Card>
        <CardHeader className="pb-3">
          <div className="flex items-center justify-between">
            <CardTitle className="text-base">Filters</CardTitle>
            {hasFilters && (
              <button
                type="button"
                onClick={clearFilters}
                className="text-xs text-muted-foreground hover:text-foreground transition-colors"
              >
                Clear all
              </button>
            )}
          </div>
        </CardHeader>
        <CardContent className="space-y-5">
          {/* Text search input */}
          <div className="flex items-center gap-2 border border-input rounded-md px-3 py-2">
            <SearchIcon className="h-4 w-4 text-muted-foreground shrink-0" />
            <input
              type="text"
              value={textQuery}
              onChange={e => setTextQuery(e.target.value)}
              placeholder={searchPlaceholder}
              className="flex-1 min-w-0 bg-transparent border-0 focus:outline-none text-base text-foreground placeholder:text-muted-foreground"
              autoComplete="off"
              spellCheck={false}
            />
            {textQuery && (
              <button
                type="button"
                onClick={() => setTextQuery('')}
                aria-label="Clear search"
                className="text-muted-foreground hover:text-foreground transition-colors"
              >
                <X className="h-4 w-4" />
              </button>
            )}
          </div>

          {/* Question-specific filters */}
          {searchType === 'questions' && (
            <>
              {/* Active concept filter pill */}
              {conceptFilter && (
                <div className="flex items-center gap-2">
                  <span className="text-sm font-medium">Concept</span>
                  <span className="flex items-center gap-1.5 px-3 py-1 rounded-full border border-primary bg-primary/10 text-primary text-sm">
                    {conceptFilter}
                    <button
                      type="button"
                      onClick={() => setConceptFilter('')}
                      aria-label="Remove concept filter"
                      className="hover:text-foreground transition-colors"
                    >
                      <X className="h-3 w-3" />
                    </button>
                  </span>
                </div>
              )}

              {/* Exam */}
              <div className="space-y-1.5">
                <label className="text-sm font-medium">Exam</label>
                <div className="flex flex-wrap gap-2">
                  {EXAMS.map(exam => (
                    <button
                      key={exam.value}
                      type="button"
                      onClick={() => {
                        setTopic(exam.value)
                        setSelectedSubtopics([])
                        setSelectedIds(new Set())
                        setConceptFilter('')
                        setUseTodaysPlan(false)
                        setOpenTopicGroups(new Set())
                      }}
                      className={`px-3 py-1.5 rounded-full border text-sm transition-colors ${
                        topic === exam.value
                          ? 'border-primary bg-primary text-primary-foreground'
                          : 'border-input hover:bg-accent'
                      }`}
                    >
                      {exam.label}
                    </button>
                  ))}
                </div>
              </div>

              {/* Subtopics — only shown when a specific exam is selected */}
              {topic && (
                <div className="space-y-2">
                  <label className="text-sm font-medium">
                    Topics
                    <span className="ml-2 text-xs font-normal text-muted-foreground">
                      {useTodaysPlan && planConceptCount > 0
                        ? `${planConceptCount} concept${planConceptCount !== 1 ? 's' : ''} · today's plan`
                        : selectedSubtopics.length === 0
                          ? '(all)'
                          : `${selectedSubtopics.length} selected`}
                    </span>
                  </label>

                  {/* Today's Study Plan quick-select */}
                  {user && (
                    isPremium && plan && planConceptCount > 0 ? (
                      <button
                        type="button"
                        onClick={() => {
                          const next = !useTodaysPlan
                          setUseTodaysPlan(next)
                          if (next) setSelectedSubtopics([])
                        }}
                        className={`flex items-center gap-2 w-full px-3 py-2 rounded-lg border text-sm transition-colors ${
                          useTodaysPlan
                            ? 'border-primary bg-primary/5 text-primary font-medium'
                            : 'border-input hover:bg-accent text-foreground'
                        }`}
                      >
                        <CalendarCheck className="h-4 w-4 shrink-0" />
                        <span className="flex-1 text-left">Today's Study Plan</span>
                        {useTodaysPlan && <Check className="h-3.5 w-3.5 shrink-0" />}
                        <span className={`text-xs shrink-0 ${useTodaysPlan ? 'text-primary/70' : 'text-muted-foreground'}`}>
                          {planConceptCount} concept{planConceptCount !== 1 ? 's' : ''}
                        </span>
                      </button>
                    ) : !isPremium ? (
                      <Link
                        to="/upgrade"
                        className="flex items-center gap-2 w-full px-3 py-2 rounded-lg border border-dashed border-muted-foreground/30 text-sm text-muted-foreground hover:bg-muted/30 transition-colors"
                      >
                        <Lock className="h-4 w-4 shrink-0 text-muted-foreground/60" />
                        <span className="flex-1 text-left">Today's Study Plan</span>
                        <span className="text-xs text-muted-foreground/60 shrink-0">Premium</span>
                      </Link>
                    ) : null
                  )}

                  {subtopicsLoading && subtopics.length === 0 ? (
                    <p className="text-xs text-muted-foreground">Loading topics…</p>
                  ) : subtopics.length === 0 ? (
                    <p className="text-xs text-muted-foreground">No topics available.</p>
                  ) : (
                    <div className={`rounded-lg border divide-y transition-opacity ${useTodaysPlan ? 'opacity-50' : ''}`}>
                      {groupedSubtopics.map(group => {
                        const allSelected = group.subtopics.every(s => selectedSubtopics.includes(s))
                        const someSelected = group.subtopics.some(s => selectedSubtopics.includes(s))
                        const isOpen = openTopicGroups.has(group.name)
                        const hasToday = group.subtopics.some(s => todaySubtopics.has(s))
                        return (
                          <div key={group.name}>
                            <button
                              type="button"
                              onClick={() => toggleTopicGroup(group.name)}
                              className="flex items-center gap-2 w-full py-3.5 px-4 text-left hover:bg-muted/40 transition-colors"
                              aria-expanded={isOpen}
                            >
                              <ChevronDown className={`h-4 w-4 shrink-0 text-muted-foreground transition-transform duration-200 ${isOpen ? '' : '-rotate-90'}`} />
                              <span className="text-sm font-semibold flex-1 min-w-0 truncate">
                                {group.name}
                                {group.weight && <span className="ml-1.5 text-xs font-normal text-muted-foreground">{group.weight}</span>}
                              </span>
                              {hasToday && <span className="text-[10px] text-primary/70 shrink-0">today</span>}
                              <button
                                type="button"
                                onClick={e => selectAllInGroup(group, e)}
                                className={`shrink-0 ml-1 px-3 py-1.5 rounded border text-xs transition-colors ${
                                  allSelected
                                    ? 'bg-primary text-primary-foreground border-primary'
                                    : someSelected
                                      ? 'bg-primary/10 text-primary border-primary/30'
                                      : 'border-input text-muted-foreground hover:bg-accent'
                                }`}
                              >
                                {allSelected ? 'All ✓' : someSelected ? 'Some' : 'Select all'}
                              </button>
                            </button>
                            {isOpen && (
                              <div className="pb-2 px-4 pl-11 space-y-0.5 bg-muted/20">
                                {group.subtopics.map(subtopic => {
                                  const isSelected = selectedSubtopics.includes(subtopic)
                                  const isToday = todaySubtopics.has(subtopic)
                                  return (
                                    <button
                                      key={subtopic}
                                      type="button"
                                      onClick={() => toggleSubtopic(subtopic)}
                                      className="flex items-center gap-2.5 w-full py-2.5 text-left text-sm rounded hover:bg-muted/40 transition-colors"
                                    >
                                      <div className={`h-5 w-5 shrink-0 rounded border flex items-center justify-center ${
                                        isSelected ? 'bg-primary border-primary' : 'border-input bg-background'
                                      }`}>
                                        {isSelected && <Check className="h-3 w-3 text-primary-foreground" />}
                                      </div>
                                      <span className={`flex-1 truncate ${isSelected ? 'font-medium text-primary' : isToday ? 'text-primary/80' : ''}`}>
                                        {subtopic}
                                      </span>
                                      {isToday && <span className="text-xs text-primary/60 shrink-0">today</span>}
                                    </button>
                                  )
                                })}
                              </div>
                            )}
                          </div>
                        )
                      })}
                    </div>
                  )}
                </div>
              )}

              {/* Difficulty */}
              <div className="space-y-1.5">
                <label className="text-sm font-medium">Difficulty</label>
                <div className="flex flex-wrap gap-2">
                  {DIFFICULTIES.map(d => (
                    <button
                      key={d.value}
                      type="button"
                      onClick={() => setDifficulty(d.value)}
                      className={`px-3 py-1.5 rounded-full border text-sm transition-colors ${
                        difficulty === d.value
                          ? 'border-primary bg-primary text-primary-foreground'
                          : 'border-input hover:bg-accent'
                      }`}
                    >
                      {d.label}
                    </button>
                  ))}
                </div>
              </div>
            </>
          )}
        </CardContent>
      </Card>

      {/* Results */}
      <div className="space-y-3">
        {searchType === 'questions' ? (
          <>
            <p className="text-sm text-muted-foreground">
              {loading ? 'Loading questions…' : `${filtered.length} question${filtered.length !== 1 ? 's' : ''} found`}
              {selectedIds.size > 0 && (
                <span className="ml-2 text-foreground font-medium">
                  · {selectedIds.size} selected
                  <button
                    type="button"
                    onClick={() => setSelectedIds(new Set())}
                    className="ml-2 text-xs text-muted-foreground hover:text-foreground transition-colors font-normal"
                  >
                    clear
                  </button>
                </span>
              )}
            </p>

            {error && (
              <div className="rounded-lg border border-destructive/50 bg-destructive/10 px-4 py-3 text-sm text-destructive flex items-center justify-between gap-4">
                <span>{error}</span>
                <button
                  type="button"
                  onClick={() => setRetryCount(c => c + 1)}
                  className="shrink-0 text-xs font-medium underline underline-offset-2 hover:no-underline"
                >
                  Try again
                </button>
              </div>
            )}

            {loading && (
              <div className="space-y-2">
                {[1, 2, 3].map(i => (
                  <div key={i} className="border rounded-lg p-4 animate-pulse">
                    <div className="h-4 bg-muted rounded w-3/4" />
                    <div className="h-3 bg-muted rounded w-1/2 mt-2" />
                  </div>
                ))}
              </div>
            )}

            {!loading && filtered.length === 0 && !error && (
              <div className="text-center py-12 text-muted-foreground text-sm">
                No questions match your filters.
              </div>
            )}

            {!loading && filtered.length > 0 && (
              <div className="space-y-2">
                {filtered.map(q => (
                  <QuestionRow
                    key={q.id}
                    question={q}
                    selected={selectedIds.has(q.id)}
                    onToggleSelect={toggleSelectQuestion}
                    activeDifficulty={difficulty}
                    activeTopic={topic}
                    activeSubtopics={selectedSubtopics}
                  />
                ))}
              </div>
            )}
          </>
        ) : (
          <>
            {!textQuery.trim() ? (
              <p className="text-sm text-muted-foreground">Enter a search term above.</p>
            ) : wikiLoading ? (
              <div className="space-y-2">
                {[1, 2, 3].map(i => (
                  <div key={i} className="border rounded-lg p-4 animate-pulse">
                    <div className="h-4 bg-muted rounded w-3/4" />
                    <div className="h-3 bg-muted rounded w-1/2 mt-2" />
                  </div>
                ))}
              </div>
            ) : wikiResults.length === 0 ? (
              <div className="text-center py-12 text-muted-foreground text-sm">
                No matches found.
              </div>
            ) : (
              <>
                <p className="text-sm text-muted-foreground">
                  {wikiResults.length} result{wikiResults.length !== 1 ? 's' : ''} found
                </p>
                <div className="border rounded-lg divide-y overflow-hidden">
                  {wikiResults.map(item => (
                    <ConceptResultRow key={`${item.category}:${item.path}`} item={item} query={textQuery} syllabi={syllabi} />
                  ))}
                </div>
              </>
            )}
          </>
        )}
      </div>

      {/* Sticky quiz button — Questions mode only */}
      {searchType === 'questions' && !loading && filtered.length > 0 && (
        <div className="fixed bottom-16 md:bottom-0 left-0 lg:left-[var(--sidebar-width)] right-0 z-50 flex justify-center px-4 py-4 bg-background/80 backdrop-blur-sm border-t border-border">
          <button
            type="button"
            onClick={handleStartQuiz}
            className="px-6 py-2.5 rounded-full border border-primary bg-primary text-primary-foreground hover:bg-primary/90 transition-colors text-sm font-medium shadow-lg"
          >
            {selectedIds.size > 0
              ? `Start quiz with ${selectedIds.size} selected`
              : 'Start quiz with this selection'}
          </button>
        </div>
      )}
    </div>
  )
}
