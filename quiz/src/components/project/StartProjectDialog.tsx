import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { PenLine, Timer } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { SegmentedControl } from '@/components/ui/SegmentedControl'
import { WINDOW_DAYS, type ProjectCase } from '@/data/pcpaProjects'
import { usePcpaAttempts } from '@/hooks/usePcpaAttempts'
import { attemptRoute, type AttemptMode, type Language, type ProjectAttempt } from '@/lib/pcpaAttempt'
import { BriefTile } from './BriefTile'
import { ChoiceCards, ProjectDialog } from './shared'

/**
 * Starting a brief. The brief is already chosen — it is the card that opened
 * this — so the sheet asks only what changes the attempt:
 *
 * - **How to work it.** A rehearsal is the real conditions (the window, and
 *   feedback held back until submission); practice has no deadline and checks
 *   the report as it is written. The window follows from this rather than
 *   being asked on its own: nobody wants a deadline for its own sake.
 * - **The language**, which writes the starter script.
 * - **The data**, only for a brief attempted before: a fresh draw, or the same
 *   sample again to redo the analysis and compare.
 */

type DataChoice = 'fresh' | 'same'

export function StartProjectDialog({
  projectCase,
  previous,
  defaultLanguage,
  onClose,
}: {
  projectCase: ProjectCase
  /** The latest earlier attempt at this brief, whose data can be drawn again. */
  previous?: ProjectAttempt
  defaultLanguage: Language
  onClose: () => void
}) {
  const create = usePcpaAttempts(s => s.create)
  const navigate = useNavigate()
  const [mode, setMode] = useState<AttemptMode>('rehearsal')
  const [language, setLanguage] = useState<Language>(defaultLanguage)
  const [data, setData] = useState<DataChoice>('fresh')

  function start() {
    const attempt = create({
      caseId: projectCase.id,
      mode,
      language,
      seed: previous && data === 'same' ? previous.seed : undefined,
    })
    onClose()
    navigate(attemptRoute(attempt.id))
  }

  return (
    <ProjectDialog
      title={projectCase.title}
      wide
      onClose={onClose}
      footer={<>
        <Button variant="outline" size="sm" onClick={onClose}>Cancel</Button>
        <Button size="sm" onClick={start}>Start project</Button>
      </>}
    >
      <div className="-mt-2 flex items-center gap-3">
        <BriefTile caseId={projectCase.id} size="md" />
        <p className="min-w-0 text-sm text-muted-foreground">{projectCase.company} · {projectCase.line}</p>
      </div>

      <ChoiceCards<AttemptMode>
        label="How to work it"
        value={mode}
        onChange={setMode}
        choices={[
          { value: 'rehearsal', label: 'Rehearsal', icon: <Timer className="h-4 w-4" />, detail: `The real conditions: ${WINDOW_DAYS} days from now, and feedback once you submit.` },
          { value: 'practice', label: 'Practice', icon: <PenLine className="h-4 w-4" />, detail: 'No deadline, and your report is checked as you write it.' },
        ]}
      />

      <div className="space-y-3">
        <div className="flex items-center gap-3">
          <p className="flex-1 text-sm font-medium">Language</p>
          <SegmentedControl<Language>
            size="sm"
            label="Language"
            value={language}
            onChange={setLanguage}
            options={[{ value: 'r', label: 'R' }, { value: 'python', label: 'Python' }]}
            className="w-44"
          />
        </div>
        {previous && (
          <div className="flex items-center gap-3">
            <p className="flex-1 text-sm font-medium">Data</p>
            <SegmentedControl<DataChoice>
              size="sm"
              label="Data"
              value={data}
              onChange={setData}
              options={[
                { value: 'fresh', label: 'New draw' },
                { value: 'same', label: 'Same as last', ariaLabel: `Same data as your attempt of ${new Date(previous.startedAt).toLocaleDateString()}` },
              ]}
              className="w-56"
            />
          </div>
        )}
      </div>
    </ProjectDialog>
  )
}
