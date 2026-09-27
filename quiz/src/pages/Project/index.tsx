import { useParams } from 'react-router-dom'
import ProjectsHome from './ProjectsHome'
import ProjectAttemptPage from './ProjectAttempt'

/**
 * The Projects tab (`docs/pcpa-project.md`): the briefs and attempts at
 * `/project`, one attempt at `/project/pcpa/:attemptId`. One lazy chunk for
 * both, since a candidate who opens one goes to the other.
 */
export default function Project() {
  const { attemptId } = useParams()
  return attemptId ? <ProjectAttemptPage /> : <ProjectsHome />
}
