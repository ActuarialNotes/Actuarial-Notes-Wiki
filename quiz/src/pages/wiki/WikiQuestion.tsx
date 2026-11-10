import { useEffect, useMemo, useRef, useState } from 'react'
import { Link, useLocation, useParams } from 'react-router-dom'
import { ChevronLeft, ChevronRight, Loader2 } from 'lucide-react'
import { fetchAllQuestions } from '@/lib/github'
import { isAnswerCorrect, isMultiPartAnswerComplete, parseAllQuestions, type Question, type SelfGrade } from '@/lib/parser'
import { pendingAnswerFor, tagPendingAnswer, type PendingAnswer } from '@/lib/pendingAnswer'
import { examDisplayName, wikiRoute } from '@/lib/wikiRoutes'
import { bankLabelFor } from '@/lib/examIds'
import { NOT_FOUND_HEAD, pageHead, type SeoCrumb } from '@/lib/seo'
import {
  buildQuestionSeoPages,
  questionConcepts,
  questionNeighbours,
  questionRoute,
  questionRuns,
  conceptQuizUrl,
} from '@/lib/seoQuestions'
import { useWikiSyllabus } from '@/hooks/useWikiSyllabus'
import { useWikiPage } from '@/hooks/useWikiPage'
import { usePageHead } from '@/hooks/usePageHead'
import { backLabel, useBack, usePageLabel } from '@/hooks/useBack'
import { RESTORE_SCROLL } from '@/lib/routeScrollMemory'
import { MarkdownText, READING_MD_CLASS } from '@/components/MarkdownText'
import { QuestionCard } from '@/components/QuestionCard'
import { ExaminerReportCard, SampleAnswerCards } from '@/components/AnswerReference'
import { Button } from '@/components/ui/button'
import { buttonVariants } from '@/components/ui/buttonVariants'
import { recordReviewAnswers, type QuizResponse } from '@/stores/quizStore'
import { useAuth } from '@/hooks/useAuth'
import { useConceptMastery } from '@/hooks/useConceptMastery'
import { useSoundEffects } from '@/hooks/useSoundEffects'

/**
 * One practice question as a page — what a search for "CAS Exam 5 Fall 2013
 * question 4" lands on — answered right here, the way a quiz answers it: pick,
 * confirm, and the solution opens in place. No setup screen and no pre-quiz
 * concept list stand between a reader from a search and the question they
 * searched for. The static file carries the question and never its answer;
 * the solution is the app's, after an answer (or a "Show solution", which
 * banks nothing). The record (name, head, neighbours) is `lib/seoQuestions.ts`,
 * the same one the build writes the page's static file from. See docs/seo.md.
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

          {question.off_syllabus && (
            <p className="text-sm text-muted-foreground">No current syllabus covers this question. It's kept for the record.</p>
          )}

          <QuestionPractice key={question.id} question={question} next={next} nextName={next ? nameOf(next) : undefined} concept={concepts[0]} />

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

/**
 * The question, answerable in place — the quiz's own QuestionCard on local
 * state, so answering here never touches a quiz the reader has open elsewhere
 * (`quizStore`) or puts up its Return pill. Pick an answer and confirm it (a
 * second tap on the picked option confirms too, as in a quiz), and the
 * solution opens under it; a written part is graded against the sample answer.
 *
 * The answer is banked once, when the reader leaves the question — another
 * page, the next question, or the tab closing — through recordReviewAnswers,
 * the writes a finished quiz performs: mastery, the attempt history, the day's
 * stats. Leaving is what lets a written part's self-grade, given after the
 * answer, count with it. "Show solution" without an answer banks nothing: a
 * skip is not a miss.
 */
function QuestionPractice({ question, next, nextName, concept }: {
  question: Question
  next?: Question
  nextName?: string
  /** The first concept the question is tagged with — the "Practise" quiz. */
  concept?: string
}) {
  const { user } = useAuth()
  const { records: masteryRecords } = useConceptMastery()
  const { play, resetCombo } = useSoundEffects()
  const location = useLocation()
  const [pending, setPending] = useState<PendingAnswer | null>(null)
  const [response, setResponse] = useState<QuizResponse | null>(null)
  const [manualGrades, setManualGrades] = useState<Record<string, SelfGrade>>({})
  const [revealed, setRevealed] = useState(false)
  const shownAt = useRef(Date.now())

  const pendingAnswer = pendingAnswerFor(pending, question)
  const answered = response !== null
  const done = answered || revealed
  const isMultiPart = question.type === 'multi-part'
  const canConfirm = isMultiPart
    ? pendingAnswer !== null && isMultiPartAnswerComplete(question, pendingAnswer)
    : pendingAnswer !== null

  // Bank the answer on the way out — every exit path, exactly once.
  const saveRef = useRef<() => void>(() => {})
  const savedRef = useRef(false)
  saveRef.current = () => {
    if (savedRef.current || !response) return
    savedRef.current = true
    void recordReviewAnswers(user?.id ?? null, [question], { [question.id]: response }, masteryRecords, manualGrades)
  }
  useEffect(() => {
    const onHide = () => saveRef.current()
    window.addEventListener('pagehide', onHide)
    return () => {
      window.removeEventListener('pagehide', onHide)
      saveRef.current()
    }
  }, [])

  function commit(answer: string) {
    if (answered) return
    if (isAnswerCorrect(question, answer)) play('correct')
    else resetCombo('correct')
    setResponse({ chosen: answer, timeSpent: Math.round((Date.now() - shownAt.current) / 1000) })
    setPending(null)
  }

  function handleAnswer(answer: string) {
    if (done) return
    // A multi-part answer arrives part by part; it waits for Confirm Answer.
    if (!isMultiPart && answer === pendingAnswer) commit(answer)
    else setPending(tagPendingAnswer(question, answer))
  }

  const setGrade = (key: string, grade: SelfGrade) => setManualGrades(prev => ({ ...prev, [key]: grade }))
  const partGrade = (label: string, grade: SelfGrade) => setGrade(`${question.id}__${label}`, grade)

  return (
    <div className="space-y-4">
      <div>
        <QuestionCard
          question={question}
          selectedAnswer={response?.chosen ?? pendingAnswer}
          onAnswer={handleAnswer}
          showExplanation={done}
          isLocked={done}
          selfGrade={question.type === 'free-entry' ? manualGrades[question.id] : undefined}
          onSelfGrade={question.type === 'free-entry' && answered ? grade => setGrade(question.id, grade) : undefined}
          partManualGrades={isMultiPart ? manualGrades : undefined}
          onPartManualGrade={isMultiPart && answered ? partGrade : undefined}
          essaySelfGrades={isMultiPart ? manualGrades : undefined}
          onEssaySelfGrade={isMultiPart && answered ? partGrade : undefined}
        />
      </div>

      {revealed && !answered && <SolutionPanel question={question} />}

      {!done && (
        <div className="flex flex-wrap items-center justify-between gap-3">
          <button
            type="button"
            onClick={() => setRevealed(true)}
            className="text-sm text-muted-foreground underline-offset-4 hover:text-foreground hover:underline"
          >
            Show solution
          </button>
          <Button
            size="lg"
            disabled={!canConfirm}
            onClick={() => pendingAnswer !== null && commit(pendingAnswer)}
            className="bg-foreground text-background hover:bg-foreground/90"
          >
            Confirm Answer
          </Button>
        </div>
      )}

      {done && (
        <div className="space-y-3">
          <div className="flex flex-col gap-2 sm:flex-row">
            {next && (
              <Link to={questionRoute(next.id)} className={buttonVariants({ size: 'lg', className: 'min-w-0 bg-foreground text-background hover:bg-foreground/90' })}>
                <span className="truncate">Next: {nextName ?? next.id}</span>
                <ChevronRight className="h-4 w-4 shrink-0" />
              </Link>
            )}
            {concept && (
              <Link to={conceptQuizUrl(concept)} className={buttonVariants({ variant: 'outline', size: 'lg', className: 'min-w-0' })}>
                <span className="truncate">Practise {concept}</span>
              </Link>
            )}
          </div>
          {answered && !user && (
            <p className="flex flex-wrap items-center gap-x-3 gap-y-1 text-sm text-muted-foreground">
              Your answers are only saved in this browser.
              <Link to="/auth" state={{ from: location.pathname }} className="font-semibold text-foreground underline-offset-4 hover:underline">
                Create account
              </Link>
            </p>
          )}
        </div>
      )}
    </div>
  )
}

/**
 * The solution for a reader who asked to see it without answering: the key,
 * the worked solution and the examiners' report, part by part. Neutral — there
 * is no verdict, because nothing was answered.
 */
function SolutionPanel({ question }: { question: Question }) {
  const parts = question.parts ?? []
  return (
    <section aria-label="Solution" className="min-w-0 space-y-4 overflow-x-auto rounded-lg bg-muted/40 p-4">
      {parts.length === 0 ? (
        <>
          {question.answer && <AnswerKey answer={question.answer} />}
          {question.explanation && <MarkdownText className={READING_MD_CLASS}>{question.explanation}</MarkdownText>}
          {question.examiner_report && <ExaminerReportCard markdown={question.examiner_report} />}
        </>
      ) : parts.map(part => (
        <div key={part.label} className="space-y-2">
          <h2 className="text-sm font-semibold">Part {part.label}</h2>
          {part.answer && <AnswerKey answer={part.answer} />}
          {part.explanation && (part.answer
            ? <MarkdownText className={READING_MD_CLASS}>{part.explanation}</MarkdownText>
            : <SampleAnswerCards markdown={part.explanation} />)}
          {part.examiner_report && <ExaminerReportCard markdown={part.examiner_report} />}
        </div>
      ))}
    </section>
  )
}

/**
 * A part's key: a figure or a letter on one line, or — when the bank keeps a
 * written part's sample answer in its key, as CAS parts do — the sample answer
 * in the cards the quiz shows it in.
 */
function AnswerKey({ answer }: { answer: string }) {
  if (answer.length > 40 || answer.includes('\n')) return <SampleAnswerCards markdown={answer} />
  return (
    <p className="text-sm text-muted-foreground">
      Answer: <MarkdownText inline className="font-semibold text-foreground">{answer}</MarkdownText>
    </p>
  )
}
