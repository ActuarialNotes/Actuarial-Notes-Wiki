import { Card, CardContent, CardHeader } from '@/components/ui/card'
import { AnswerOption } from '@/components/AnswerOption'
import { ExplanationPanel } from '@/components/ExplanationPanel'
import { TopicBadge } from '@/components/TopicBadge'
import type { Question } from '@/lib/parser'

interface QuestionCardProps {
  question: Question
  selectedAnswer: string | null
  onAnswer: (key: string) => void
  showExplanation: boolean  // true when status === 'reviewing'
}

export function QuestionCard({
  question,
  selectedAnswer,
  onAnswer,
  showExplanation,
}: QuestionCardProps) {
  return (
    <Card className="w-full">
      <CardHeader className="pb-3">
        <div className="flex flex-wrap gap-2 mb-3">
          <TopicBadge label={question.topic} variant="topic" />
          <TopicBadge label={question.subtopic} variant="tag" />
          <TopicBadge label={question.difficulty} variant="difficulty" />
        </div>
        <p className="text-base leading-relaxed">{question.stem}</p>
      </CardHeader>

      <CardContent className="space-y-2">
        {question.options.map(option => (
          <AnswerOption
            key={option.key}
            optionKey={option.key}
            text={option.text}
            isSelected={selectedAnswer === option.key}
            isCorrect={question.answer === option.key}
            isDisabled={showExplanation}
            onClick={onAnswer}
          />
        ))}

        {showExplanation && selectedAnswer !== null && (
          <ExplanationPanel
            explanation={question.explanation}
            wikiLink={question.wiki_link}
            isCorrect={selectedAnswer === question.answer}
          />
        )}
      </CardContent>
    </Card>
  )
}
