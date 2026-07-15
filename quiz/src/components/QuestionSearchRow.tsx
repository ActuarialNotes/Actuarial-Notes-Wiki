import { useState } from 'react'
import { Check } from 'lucide-react'
import type { Question } from '@/lib/parser'
import { LatexText } from '@/components/LatexText'
import { MarkdownText } from '@/components/MarkdownText'
import { ExplanationPanel } from '@/components/ExplanationPanel'

// Renders question markdown (GFM tables + LaTeX) with the same table styling the
// quiz uses, so data-heavy stems (development triangles, etc.) render as tables
// rather than raw pipe text.
const STEM_MD_CLASS =
  'leading-relaxed [&_p]:my-1.5 [&_p:first-child]:mt-0 [&_table]:text-xs [&_th]:text-left [&_td]:pr-4 [&_table]:border-collapse [&_td]:border [&_td]:border-border [&_th]:border [&_th]:border-border [&_th]:px-2 [&_td]:px-2 [&_th]:py-1 [&_td]:py-1'

interface QuestionSearchRowProps {
  question: Question
  query: string
  selected: boolean
  onToggleSelect: (id: string) => void
}

function highlightStem(text: string, query: string): React.ReactNode {
  const q = query.trim()
  if (!q) return <LatexText>{text}</LatexText>
  const idx = text.toLowerCase().indexOf(q.toLowerCase())
  if (idx < 0) return <LatexText>{text}</LatexText>
  return (
    <>
      <LatexText>{text.slice(0, idx)}</LatexText>
      <mark className="bg-primary/20 text-foreground rounded px-0.5">
        {text.slice(idx, idx + q.length)}
      </mark>
      <LatexText>{text.slice(idx + q.length)}</LatexText>
    </>
  )
}

function conceptLabel(link: string): string {
  const clean = link.replace(/\.md$/i, '').replace(/\+/g, ' ')
  const segment = clean.split('/').filter(Boolean).pop() ?? link
  return segment.replace(/-/g, ' ').replace(/\b\w/g, c => c.toUpperCase())
}

export function DifficultyDots({ difficulty }: { difficulty: string }) {
  const count = difficulty === 'easy' ? 1 : difficulty === 'medium' ? 2 : 3
  return (
    <span
      className="flex items-center gap-0.5 shrink-0"
      title={difficulty}
      aria-label={`${difficulty} difficulty`}
    >
      {[0, 1, 2].map(i => (
        <span
          key={i}
          className={`h-2 w-2 rounded-full ${i < count ? 'bg-red-500' : 'bg-muted-foreground/20'}`}
        />
      ))}
    </span>
  )
}

export function QuestionSearchRow({ question, query, selected, onToggleSelect }: QuestionSearchRowProps) {
  const [expanded, setExpanded] = useState(false)
  const [showAnswer, setShowAnswer] = useState(false)

  const words = question.stem.trim().split(/\s+/)
  const previewText = words.length <= 6 ? question.stem : words.slice(0, 6).join(' ') + '…'

  return (
    <div
      className={`rounded-lg p-3 space-y-2 transition-colors cursor-pointer ${
        selected ? 'bg-primary/5' : 'hover:bg-accent/30'
      }`}
      onClick={() => onToggleSelect(question.id)}
    >
      <div className="flex items-center gap-3">
        <div className="flex items-center gap-2 overflow-x-auto flex-1 min-w-0 [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none]">
          <DifficultyDots difficulty={question.difficulty} />
          <div
            role="checkbox"
            aria-checked={selected}
            aria-label={`Select question ${question.id}`}
            className={`h-5 w-5 shrink-0 rounded-full border-2 flex items-center justify-center transition-colors ${
              selected
                ? 'bg-primary border-primary text-primary-foreground'
                : 'border-input'
            }`}
          >
            {selected && <Check className="h-3 w-3" />}
          </div>
          <span className="text-xs px-2 py-0.5 rounded-full border border-input text-muted-foreground bg-background shrink-0">
            {question.exam}
          </span>
          {question.wiki_link.map(link => (
            <span
              key={link}
              className="text-xs px-2 py-0.5 rounded-full border border-input text-muted-foreground bg-background shrink-0"
            >
              {conceptLabel(link)}
            </span>
          ))}
        </div>
        <button
          type="button"
          onClick={e => { e.stopPropagation(); setExpanded(v => !v) }}
          className="text-sm px-3 py-1.5 rounded-md hover:bg-accent transition-colors shrink-0"
        >
          {expanded ? 'Collapse' : 'Expand'}
        </button>
      </div>

      <div className="text-sm text-muted-foreground leading-relaxed">
        {expanded ? (
          <MarkdownText className={STEM_MD_CLASS}>{question.stem}</MarkdownText>
        ) : (
          <span>{highlightStem(previewText, query)}</span>
        )}
      </div>

      {expanded && (
        <div className="pt-1 space-y-1" onClick={e => e.stopPropagation()}>
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
                <span><MarkdownText inline>{opt.text}</MarkdownText></span>
              </div>
            )
          })}

          <div className="pt-1">
            <button
              type="button"
              onClick={() => setShowAnswer(v => !v)}
              className="text-sm px-4 py-2 rounded-md hover:bg-accent transition-colors"
            >
              {showAnswer ? 'Hide answer' : 'Show answer'}
            </button>
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
