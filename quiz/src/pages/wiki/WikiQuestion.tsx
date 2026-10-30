import { useEffect, useMemo, useState } from 'react'
import { Link, useParams } from 'react-router-dom'
import { ChevronLeft, ChevronRight, Loader2 } from 'lucide-react'
import { fetchAllQuestions } from '@/lib/github'
import { parseAllQuestions, type AnswerOption, type Question } from '@/lib/parser'
import { examDisplayName, wikiRoute } from '@/lib/wikiRoutes'
import { bankLabelFor } from '@/lib/examIds'
import { NOT_FOUND_HEAD, pageHead, type SeoCrumb } from '@/lib/seo'
import {
  buildQuestionSeoPages,
  questionConcepts,
  questionNeighbours,
  questionQuizUrl,
  questionRoute,
  questionRuns,
} from '@/lib/seoQuestions'
import { useWikiSyllabus } from '@/hooks/useWikiSyllabus'
import { useWikiPage } from '@/hooks/useWikiPage'
import { usePageHead } from '@/hooks/usePageHead'
import { backLabel, useBack, usePageLabel } from '@/hooks/useBack'
import { RESTORE_SCROLL } from '@/lib/routeScrollMemory'
import { MarkdownText, QUESTION_MD_CLASS } from '@/components/MarkdownText'
import { buttonVariants } from '@/components/ui/buttonVariants'

/**
 * One practice question as a page — what a search for "CAS Exam 5 Fall 2013
 * question 4" lands on. The question, never its answer: the solution is behind
 * the one button, a one-question quiz that marks the reader's answer and then
 * shows it. The record (name, head, neighbours) is `lib/seoQuestions.ts`, the
 * same one the build writes the page's static file from. See docs/seo.md.
 */
export default function WikiQuestion() {
  const { id = '' } = useParams()
  const { setPageRefs, setExamId } = useWikiPage()
  const { syllabi } = useWikiSyllabus()
  const [questions, setQuestions] = useState<Question[] | null>(null)
  const [failed, setFailed] = useState(false)

  useEffect(() => {
    let cancelled = false
    fetchAllQuestions()
      .then(raw => { if (!cancelled) setQuestions(parseAllQuestions(raw)) })
      .catch(() => { if (!cancelled) setFailed(true) })
    return () => { cancelled = true }
  }, [])

  // The study guide of the exam whose bank a question is in.
  const guideByBank = useMemo(() => {
    const map = new Map<string, SeoCrumb>()
    for (const s of syllabi) {
      const label = bankLabelFor(s)
      if (!label || map.has(label) || !s.fileName) continue
      map.set(label, { name: examDisplayName(s.fileName), path: wikiRoute({ kind: 'exam', name: s.fileName }) })
    }
    return map
  }, [syllabi])

  const pages = useMemo(
    () => (questions ? buildQuestionSeoPages(questions, q => guideByBank.get(q.exam)) : []),
    [questions, guideByBank],
  )
  const runs = useMemo(() => questionRuns(questions ?? []), [questions])
  const entry = pages.find(p => p.question.id === id)
  const question = entry?.question
  const page = entry?.page
  const missing = failed || (questions !== null && !entry)

  usePageHead(useMemo(() => (missing ? NOT_FOUND_HEAD : page ? pageHead(page) : null), [missing, page]))

  usePageLabel(page?.name)
  const back = useBack({ to: page?.parent?.path ?? '/wiki', label: page?.parent?.name ?? 'Study Guides' })
  const concepts = useMemo(() => (question ? questionConcepts(question) : []), [question])
  const { previous, next } = question ? questionNeighbours(runs, question) : {}
  const nameOf = (q: Question) => pages.find(p => p.question.id === q.id)?.page.name ?? q.id

  useEffect(() => {
    setExamId(null)
    setPageRefs(concepts.map(name => ({ kind: 'concept' as const, name })))
  }, [concepts, setExamId, setPageRefs])

  return (
    <div className="space-y-5 max-w-3xl">
      <Link to={back.to} state={RESTORE_SCROLL} onClick={back.onLinkClick} aria-label={backLabel(back)} className="inline-flex items-center gap-1 text-xs text-muted-foreground hover:text-foreground">
        <ChevronLeft className="h-4 w-4" /> {back.label}
      </Link>

      {!questions && !failed && (
        <div className="flex items-center gap-2 text-sm text-muted-foreground">
          <Loader2 className="h-4 w-4 animate-spin" /> Loading question…
        </div>
      )}
      {missing && <p className="text-sm text-muted-foreground">There's no question {id}.</p>}

      {question && page && (
        <>
          <header className="space-y-1">
            <h1 className="text-2xl font-bold tracking-tight">{page.name}</h1>
            {question.topic && <p className="text-sm text-muted-foreground">{question.topic}</p>}
          </header>

          <section className="space-y-4">
            {question.stem.trim() && <MarkdownText className={QUESTION_MD_CLASS}>{question.stem}</MarkdownText>}
            <Options options={question.options} />
            {question.parts?.map(part => (
              <div key={part.label} className="space-y-2">
                <h2 className="text-sm font-semibold">
                  Part {part.label}
                  {part.points ? <span className="font-normal text-muted-foreground"> · {part.points} point{part.points === 1 ? '' : 's'}</span> : null}
                </h2>
                {part.stem.trim() && <MarkdownText className={QUESTION_MD_CLASS}>{part.stem}</MarkdownText>}
                <Options options={part.options} />
              </div>
            ))}
            {question.off_syllabus && (
              <p className="text-sm text-muted-foreground">No current syllabus covers this question. It's kept for the record.</p>
            )}
          </section>

          <Link to={questionQuizUrl(question.id)} className={buttonVariants({ size: 'lg' })}>
            Answer this question
          </Link>

          {concepts.length > 0 && (
            <section className="space-y-2">
              <h2 className="text-sm font-semibold">Concepts tested</h2>
              <nav aria-label="Concepts tested" className="flex flex-wrap gap-1.5">
                {concepts.map(name => (
                  <Link
                    key={name}
                    to={wikiRoute({ kind: 'concept', name })}
                    className="inline-flex items-center rounded-full bg-primary/10 px-2.5 py-1 text-xs font-semibold text-primary transition-colors hover:bg-primary/15"
                  >
                    {name}
                  </Link>
                ))}
              </nav>
            </section>
          )}

          {(previous || next) && (
            <nav aria-label="More questions from this set" className="flex items-center justify-between gap-3 border-t border-border pt-4 text-sm">
              {previous ? (
                <Link to={questionRoute(previous.id)} className="inline-flex min-w-0 items-center gap-1 text-muted-foreground hover:text-foreground">
                  <ChevronLeft className="h-4 w-4 shrink-0" /> <span className="truncate">{nameOf(previous)}</span>
                </Link>
              ) : <span />}
              {next && (
                <Link to={questionRoute(next.id)} className="inline-flex min-w-0 items-center gap-1 text-right text-muted-foreground hover:text-foreground">
                  <span className="truncate">{nameOf(next)}</span> <ChevronRight className="h-4 w-4 shrink-0" />
                </Link>
              )}
            </nav>
          )}
        </>
      )}
    </div>
  )
}

/** A question's choices, to read — nothing here is pressed; answering is the quiz's. */
function Options({ options }: { options: AnswerOption[] }) {
  if (!options.length) return null
  return (
    <ol className="space-y-2">
      {options.map(o => (
        <li key={o.key} className="flex gap-3 rounded-lg bg-muted/40 px-3 py-2.5">
          <span className="shrink-0 text-sm font-semibold text-muted-foreground">{o.key}</span>
          <MarkdownText className={QUESTION_MD_CLASS}>{o.text}</MarkdownText>
        </li>
      ))}
    </ol>
  )
}
