import { useEffect, useMemo, useRef, useState } from 'react'
import { BookOpen } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { MarkdownText, READING_MD_CLASS } from '@/components/MarkdownText'
import { ExaminerReportCard, SampleAnswerCards } from '@/components/AnswerReference'
import { SelfGradeButtons } from '@/components/SelfGradeButtons'
import { useSoundEffects } from '@/hooks/useSoundEffects'
import type { SelfGrade } from '@/lib/parser'
import type { Confidence } from '@/lib/tutor/memory'
import { PART_KIND_LABEL, type TutorItem } from '@/lib/tutor/items'
import { conceptNotes } from '@/lib/tutor/examinerNotes'
import { REASON_LABEL, REASON_LINE, formatMinutes } from '@/lib/tutor/copy'
import type { StepReason } from '@/lib/tutor/scheduler'

// The practice card (docs/tutor.md §5.3): the quiz's own furniture, so a part
// looks the same wherever it is answered. Write it, say how sure you are —
// before the reveal, because a judgement made after seeing the answer measures
// nothing — reveal the examiners' answer and report, mark it, and on a miss
// see where candidates lose points on the concept. The mark can be changed
// until Next: it is recorded then (or if the card is closed half-way), so a
// slip of the finger doesn't stand in the record.

const CONFIDENCE: { value: Confidence; label: string }[] = [
  { value: 'sure', label: 'Sure' },
  { value: 'unsure', label: 'Unsure' },
  { value: 'guess', label: 'Guessing' },
]

interface Props {
  item: TutorItem
  concept: string
  reason: StepReason
  /** Every item on the concept — where its examiners' notes come from. */
  conceptItems: readonly TutorItem[]
  onGraded: (grade: SelfGrade, confidence: Confidence | null, answer: string, seconds: number) => void
  onNext: () => void
  onRead: (concept: string) => void
}

export function TutorPractice({ item, concept, reason, conceptItems, onGraded, onNext, onRead }: Props) {
  const { play } = useSoundEffects()
  const shownAt = useRef(Date.now())
  const [scratch, setScratch] = useState('')
  const [choice, setChoice] = useState<string | null>(null)
  const [confidence, setConfidence] = useState<Confidence | null>(null)
  const [revealed, setRevealed] = useState(false)
  const [grade, setGrade] = useState<SelfGrade | null>(null)
  const choosing = item.options.length > 0
  const notes = useMemo(() => conceptNotes(conceptItems, 4), [conceptItems])

  // The latest answer, read by the record on Next and on the way out.
  const latest = useRef({ grade, confidence, answer: '', committed: false })
  latest.current = { ...latest.current, grade, confidence, answer: choosing ? choice ?? '' : scratch }
  const record = useRef(() => {})
  record.current = () => {
    const l = latest.current
    if (l.committed || !l.grade) return
    l.committed = true
    onGraded(l.grade, l.confidence, l.answer, Math.round((Date.now() - shownAt.current) / 1000))
  }
  useEffect(() => () => record.current(), [])

  function mark(g: SelfGrade) {
    // The right-answer chime; a miss stays silent (docs/sound-design.md).
    if (g === 'correct' && grade !== 'correct') play('correct')
    setGrade(g)
  }

  function reveal() {
    setRevealed(true)
    if (choosing && choice) mark(choice === item.answerKey ? 'correct' : 'incorrect')
  }

  function next() {
    record.current()
    onNext()
  }

  const canReveal = confidence !== null && (!choosing || choice !== null)

  return (
    <article className="space-y-4" aria-label={`Practice: ${concept}`}>
      <header className="space-y-1">
        <div className="flex flex-wrap items-center gap-1.5 text-xs">
          <span className="rounded-full bg-muted px-2 py-0.5 font-medium text-foreground">{REASON_LABEL[reason]}</span>
          <span className="text-muted-foreground">
            {PART_KIND_LABEL[item.kind]} · {item.points} {item.points === 1 ? 'point' : 'points'} · {formatMinutes(item.minutes)}
            {item.sitting ? ` · ${item.sitting}${item.partLabel ? `, part ${item.partLabel}` : ''}` : ''}
          </span>
        </div>
        <h3 className="text-base font-semibold leading-snug">{concept}</h3>
        <p className="text-xs text-muted-foreground">{REASON_LINE[reason]}</p>
      </header>

      {item.preamble && (
        <div className="rounded-xl bg-muted/60 p-3 text-sm overflow-x-auto">
          <MarkdownText className={READING_MD_CLASS}>{item.preamble}</MarkdownText>
        </div>
      )}
      <MarkdownText className={READING_MD_CLASS}>{item.prompt}</MarkdownText>

      {choosing ? (
        <div className="space-y-2" role="radiogroup" aria-label="Answer choices">
          {item.options.map(o => {
            const picked = choice === o.key
            const right = revealed && o.key === item.answerKey
            const wrong = revealed && picked && o.key !== item.answerKey
            return (
              <button
                key={o.key}
                type="button"
                role="radio"
                aria-checked={picked}
                disabled={revealed}
                onClick={() => setChoice(o.key)}
                className={[
                  'flex w-full items-start gap-2 rounded-xl px-3 py-2.5 text-left text-sm transition-colors',
                  'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring',
                  right ? 'bg-green-100 text-green-800 dark:bg-green-950/40 dark:text-green-300'
                    : wrong ? 'bg-red-100 text-red-800 dark:bg-red-950/50 dark:text-red-300'
                      : picked ? 'bg-accent ring-1 ring-primary' : 'bg-muted/60 hover:bg-accent',
                ].join(' ')}
              >
                <span className="font-semibold">{o.key}</span>
                <MarkdownText inline>{o.text}</MarkdownText>
              </button>
            )
          })}
        </div>
      ) : (
        <div className="space-y-1.5">
          <label htmlFor={`tutor-scratch-${item.id}`} className="text-xs font-medium text-muted-foreground">
            Your answer — or work it on paper. Nothing reads it but you.
          </label>
          <textarea
            id={`tutor-scratch-${item.id}`}
            value={scratch}
            onChange={e => setScratch(e.target.value)}
            disabled={revealed}
            rows={4}
            className="w-full resize-y rounded-xl border border-input bg-background px-3 py-2 text-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring disabled:opacity-70"
          />
        </div>
      )}

      {!revealed && (
        <div className="space-y-2">
          <p className="text-sm font-medium">How sure are you?</p>
          <div role="radiogroup" aria-label="How sure are you?" className="grid grid-cols-3 gap-1 rounded-lg border border-border bg-muted/50 p-0.5">
            {CONFIDENCE.map(c => (
              <button
                key={c.value}
                type="button"
                role="radio"
                aria-checked={confidence === c.value}
                onClick={() => setConfidence(c.value)}
                className={[
                  'h-10 rounded-md text-sm font-medium transition-colors',
                  'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring',
                  confidence === c.value ? 'bg-background text-foreground shadow-sm' : 'text-muted-foreground hover:text-foreground',
                ].join(' ')}
              >
                {c.label}
              </button>
            ))}
          </div>
          <Button className="w-full" disabled={!canReveal} onClick={reveal}>
            {choosing ? 'Check' : 'Reveal the answer'}
          </Button>
        </div>
      )}

      {revealed && (
        <div className="space-y-3">
          {!choosing && item.answerKey && (
            <p className="text-sm"><span className="font-semibold">Answer: </span><MarkdownText inline>{item.answerKey}</MarkdownText></p>
          )}
          {item.sampleAnswer && <SampleAnswerCards markdown={item.sampleAnswer} />}
          {item.examinerReport && <ExaminerReportCard markdown={item.examinerReport} />}

          {!choosing && (
            <SelfGradeButtons
              value={grade}
              onChange={mark}
              prompt={grade ? 'Marked — change it until you go on.' : 'Mark it against the sample answer'}
            />
          )}

          {grade && grade !== 'correct' && notes.length > 0 && (
            <section className="space-y-2 rounded-xl bg-muted/60 p-3" aria-label="Where candidates lose points">
              <h4 className="text-sm font-semibold">Where candidates lose points on {concept}</h4>
              <ul className="space-y-2">
                {notes.map(n => (
                  <li key={`${n.itemId}:${n.text.slice(0, 24)}`} className="text-sm">
                    <MarkdownText className="text-sm leading-relaxed text-foreground">{n.text}</MarkdownText>
                    {n.sitting && (
                      <span className="text-xs text-muted-foreground">
                        Examiners’ report, {n.sitting}{n.partLabel ? `, part ${n.partLabel}` : ''}
                      </span>
                    )}
                  </li>
                ))}
              </ul>
            </section>
          )}

          {grade && (
            <div className="flex gap-2">
              {grade !== 'correct' && (
                <Button variant="outline" className="flex-1" onClick={() => onRead(concept)}>
                  <BookOpen className="h-4 w-4" /> Read the page
                </Button>
              )}
              <Button className="flex-1" onClick={next}>Next</Button>
            </div>
          )}
        </div>
      )}
    </article>
  )
}
