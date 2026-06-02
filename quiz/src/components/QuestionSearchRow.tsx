import { useState } from 'react'
import { Check } from 'lucide-react'
import type { Question } from '@/lib/parser'
import { LatexText } from '@/components/LatexText'
import { ExplanationPanel } from '@/components/ExplanationPanel'

interface QuestionSearchRowProps {
  question: Question
  query: string
  selected: boolean
  onToggleSelect: (id: string) => void
}

function highlightStem(text: string, query: string): React.ReactNode {
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

function conceptLabel(link: string): string {
  const clean = link.replace(/\.md$/i, '').replace(/\+/g, ' ')
  const segment = clean.split('/').filter(Boolean).pop() ?? link
  return segment.replace(/-/g, ' ').replace(/\b\w/g, c => c.toUpperCase())
}

export function QuestionSearchRow({ question, query, selected, onToggleSelect }: QuestionSearchRowProps) {
  const [expanded, setExpanded] = useState(false)
  const [showAnswer, setShowAnswer] = useState(false)

  const words = question.stem.trim().split(/\s+/)
  const previewText = words.length <= 6 ? question.stem : words.slice(0, 6).join(' ') + '…'

  return (
    <div
      className={`border rounded-lg p-3 space-y-2 transition-colors cursor-pointer ${
        selected ? 'border-primary bg-primary/5' : 'hover:bg-accent/30'
      }`}
      onClick={() => onToggleSelect(question.id)}
    >
      <div className="flex items-center gap-3">
        <div className="flex items-center gap-2 overflow-x-auto flex-1 min-w-0 [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none]">
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
          <span className="text-xs px-2 py-0.5 rounded-full border border-input text-muted-foreground bg-background shrink-0 capitalize">
            {question.difficulty}
          </span>
        </div>
        <button
          type="button"
          onClick={e => { e.stopPropagation(); setExpanded(v => !v) }}
          className="text-sm px-3 py-1.5 rounded-md border border-input hover:bg-accent transition-colors shrink-0"
        >
          {expanded ? 'Collapse' : 'Expand'}
        </button>
      </div>

      <div className="text-sm text-muted-foreground leading-relaxed">
        {expanded ? (
          <LatexText>{question.stem}</LatexText>
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
                <span><LatexText>{opt.text}</LatexText></span>
              </div>
            )
          })}

          <div className="pt-1">
            <button
              type="button"
              onClick={() => setShowAnswer(v => !v)}
              className="text-sm px-4 py-2 rounded-md border border-input hover:bg-accent transition-colors"
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
