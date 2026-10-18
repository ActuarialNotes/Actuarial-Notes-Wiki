import { FlaskConical } from 'lucide-react'
import { HeaderLinkButton } from '@/components/HeaderLinkButton'

/**
 * The way from the PCPA study guide to its project (`docs/pcpa-project.md`), in
 * the page's sticky header beside the syllabus button and drawn the same size.
 * PCPA is two parts — an exam and a project — and the page below is a reading
 * of the exam's syllabus; this is the other half. The project itself lives on
 * the Projects tab, which is where this goes.
 *
 * Only PCPA has a project, so the exam page renders this for `CAS-PCPA` alone.
 */
export function ExamProjectButton({ iconOnlyOnPhone = false }: { iconOnlyOnPhone?: boolean }) {
  return (
    <HeaderLinkButton
      to="/project"
      icon={FlaskConical}
      label="Project"
      title="The PCPA project — build, validate and report on a GLM in a simulated project window"
      iconOnlyOnPhone={iconOnlyOnPhone}
    />
  )
}
