import { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { useAuth } from '@/hooks/useAuth'
import { useProgress } from '@/hooks/useProgress'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Loader2 } from 'lucide-react'
import { TopicProgressSection } from '@/components/TopicProgressSection'
import { ActiveExamCard } from '@/components/ActiveExamCard'
import { SessionHeatmap } from '@/components/SessionHeatmap'
import { useWikiSyllabus } from '@/hooks/useWikiSyllabus'
import { useExamProgress } from '@/hooks/useExamProgress'
import { useConceptMastery } from '@/hooks/useConceptMastery'
import { wikiExamIdToProgressKey } from '@/lib/wikiParser'

export default function Dashboard() {
  const navigate = useNavigate()
  const { user, loading: authLoading, signOut } = useAuth()
  const { sessions, loading: sessionsLoading } = useProgress()
  const { syllabi, loading: syllabusLoading } = useWikiSyllabus()
  const examProgress = useExamProgress()
  const { records: masteryRecords, loading: masteryLoading } = useConceptMastery()

  useEffect(() => {
    if (!authLoading && !user) {
      navigate('/auth', { state: { from: '/dashboard' }, replace: true })
    }
  }, [user, authLoading, navigate])

  if (authLoading) {
    return (
      <div className="flex items-center justify-center min-h-[60vh]">
        <Loader2 className="h-8 w-8 animate-spin text-primary" />
      </div>
    )
  }

  if (!user) return null

  const mostRecentSession = sessions[0] ?? null

  return (
    <div className="container max-w-3xl mx-auto px-4 py-8 space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold">Dashboard</h1>
          <p className="text-sm text-muted-foreground">{user.email}</p>
        </div>
        <Button variant="ghost" size="sm" onClick={signOut}>
          Sign out
        </Button>
      </div>

      <ActiveExamCard />

      {/* Topics progress — only for exams the user has marked in_progress */}
      {syllabusLoading || masteryLoading ? (
        <div className="flex items-center justify-center py-4">
          <Loader2 className="h-5 w-5 animate-spin text-muted-foreground" />
        </div>
      ) : (() => {
        const inProgressSyllabi = syllabi.filter(
          s => examProgress[wikiExamIdToProgressKey(s.examId)] === 'in_progress'
        )
        if (inProgressSyllabi.length === 0) {
          return (
            <p className="text-sm text-muted-foreground text-center py-2">
              No exams in progress — mark an exam as in progress to track topics here.
            </p>
          )
        }
        return inProgressSyllabi.map(syllabus => (
          <TopicProgressSection
            key={syllabus.examTopic}
            syllabus={syllabus}
            masteryRecords={masteryRecords}
          />
        ))
      })()}

      {/* Session heatmap */}
      <Card>
        <CardHeader>
          <CardTitle>Recent Sessions</CardTitle>
          <CardDescription>
            {sessions.length === 0
              ? 'No quiz sessions yet'
              : mostRecentSession
                ? `Last session: ${new Date(mostRecentSession.completed_at).toLocaleDateString(undefined, { month: 'short', day: 'numeric', year: 'numeric' })}`
                : 'Activity over time'}
          </CardDescription>
        </CardHeader>
        <CardContent>
          {sessionsLoading ? (
            <div className="flex items-center justify-center py-8">
              <Loader2 className="h-5 w-5 animate-spin text-muted-foreground" />
            </div>
          ) : sessions.length === 0 ? (
            <div className="text-center py-8 space-y-3">
              <p className="text-muted-foreground">No sessions yet</p>
              <Button onClick={() => navigate('/')}>Start Your First Quiz</Button>
            </div>
          ) : (
            <SessionHeatmap sessions={sessions} />
          )}
        </CardContent>
      </Card>
    </div>
  )
}
