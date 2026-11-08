// A concept page's icon, in the colour of the exam it is tested on
// (`lib/conceptExam.ts`): the surface's own exam when the concept is on it,
// otherwise the earliest exam it is on. A concept on no exam's syllabus keeps
// the neutral muted icon rather than borrowing an exam's colour.

import { FileText } from 'lucide-react'
import { useWikiSyllabus } from '@/hooks/useWikiSyllabus'
import { conceptAccentExam } from '@/lib/conceptExam'
import { examAccent } from '@/lib/examColors'
import { cn } from '@/lib/utils'

interface Props {
  /** The concept's name, or its vault link (`Concepts/Bayes+Theorem`). */
  concept: string
  /** The exam (progress key, `P`, `CAS-5`) the surface is about, if it knows one. */
  exam?: string | null
  className?: string
}

export function ConceptPageIcon({ concept, exam, className }: Props) {
  const { syllabi } = useWikiSyllabus()
  const key = conceptAccentExam(syllabi, concept, exam)
  const color = key ? examAccent(key) : undefined
  return (
    <FileText
      className={cn('h-4 w-4 shrink-0', !color && 'text-muted-foreground', className)}
      style={color ? { color } : undefined}
      aria-hidden
    />
  )
}
