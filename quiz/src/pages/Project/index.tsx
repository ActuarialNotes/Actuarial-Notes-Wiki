import { useParams } from 'react-router-dom'
import ProjectPortal from './ProjectPortal'
import ProjectAttemptPage from './ProjectAttempt'

/**
 * The PCPA project simulator (`docs/pcpa-project.md`): the portal at
 * `/project/pcpa`, an attempt at `/project/pcpa/:attemptId`. One lazy chunk for
 * both, since a candidate who opens one goes to the other.
 */
export default function Project() {
  const { attemptId } = useParams()
  return attemptId ? <ProjectAttemptPage /> : <ProjectPortal />
}
