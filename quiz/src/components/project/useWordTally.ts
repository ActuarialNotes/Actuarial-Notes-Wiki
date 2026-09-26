import { useMemo } from 'react'
import { fileText, usePcpaWorkspace } from '@/hooks/usePcpaWorkspace'
import { appendixWords, tallyWords } from '@/lib/pcpaReport'
import type { ProjectAttempt } from '@/lib/pcpaAttempt'

/** The report's words — body and each appendix — as the 1,250-word limit counts them. */
export function useWordTally(attempt: ProjectAttempt) {
  const files = usePcpaWorkspace(s => s.files)
  return useMemo(() => {
    const perAppendix = attempt.report.appendices.map(a => {
      const file = files[a.path]
      return appendixWords(a, a.kind === 'table' && file ? fileText(file) : undefined)
    })
    return { tally: tallyWords(attempt.report.body, perAppendix), perAppendix }
  }, [attempt.report, files])
}
