import { GraduationCap, X } from 'lucide-react'
import type { WikiExamSyllabus } from '@/lib/wikiParser'

interface ChooseSyllabusModalProps {
  conceptName: string
  syllabi: WikiExamSyllabus[]
  onChoose: (syllabus: WikiExamSyllabus) => void
  onClose: () => void
}

// Shown whenever a concept is referenced by more than one exam's study guide —
// rather than silently jumping to the first match, let the user pick which
// syllabus they meant.
export function ChooseSyllabusModal({ conceptName, syllabi, onChoose, onClose }: ChooseSyllabusModalProps) {
  return (
    <div
      className="fixed inset-0 z-[70] flex items-center justify-center bg-background/80 backdrop-blur-sm p-4"
      role="dialog"
      aria-modal="true"
      aria-label={`Choose exam study guide for ${conceptName}`}
      onClick={e => { if (e.target === e.currentTarget) onClose() }}
    >
      <div className="w-full max-w-sm bg-card text-card-foreground rounded-xl shadow-2xl">
        <div className="flex items-center justify-between gap-2 px-4 py-3">
          <div className="min-w-0">
            <p className="text-xs text-muted-foreground">Multiple study guides reference</p>
            <p className="font-semibold truncate">{conceptName}</p>
          </div>
          <button
            type="button"
            onClick={onClose}
            className="text-muted-foreground hover:text-foreground p-1 shrink-0"
            aria-label="Close"
          >
            <X className="h-4 w-4" />
          </button>
        </div>
        <div className="p-2 space-y-1">
          <p className="px-2 py-1 text-xs text-muted-foreground">Which exam study guide would you like to open?</p>
          {syllabi.map(s => (
            <button
              key={s.examId}
              type="button"
              onClick={() => onChoose(s)}
              className="w-full flex items-center gap-2.5 rounded-lg bg-muted/40 px-3 py-2.5 text-left hover:bg-accent transition-colors"
            >
              <GraduationCap className="h-4 w-4 shrink-0 text-teal-500" />
              <span className="min-w-0 flex-1">
                <span className="block text-sm font-medium truncate">{s.examLabel}</span>
                <span className="block text-xs text-muted-foreground truncate">{s.examTopic}</span>
              </span>
            </button>
          ))}
        </div>
      </div>
    </div>
  )
}
