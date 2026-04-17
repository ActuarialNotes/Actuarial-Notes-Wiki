import { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { useAuth } from '@/hooks/useAuth'
import { useProgress } from '@/hooks/useProgress'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Separator } from '@/components/ui/separator'
import { Loader2 } from 'lucide-react'
import type { QuizSession } from '@/lib/supabase'
import { TopicProgressSection } from '@/components/TopicProgressSection'
import { useWikiSyllabus } from '@/hooks/useWikiSyllabus'

function formatDate(iso: string): string {
  return new Date(iso).toLocaleDateString(undefined, {
    month: 'short', day: 'numeric', year: 'numeric',
  })
}

function formatTime(seconds: number | null): string {
  if (seconds === null) return '—'
  const m = Math.floor(seconds / 60)
  const s = seconds % 60
  return m > 0 ? `${m}m ${s}s` : `${s}s`
}

function ScoreBar({ session }: { session: QuizSession }) {
  const pct = session.total_questions > 0
    ? Math.round((session.correct_count / session.total_questions) * 100)
    : 0
  const color = pct >= 70 ? 'bg-green-500' : pct >= 50 ? 'bg-yellow-500' : 'bg-red-500'
  return (
    <div className="flex items-center gap-2">
      <div className="flex-1 h-2 rounded-full bg-secondary overflow-hidden">
        <div className={`h-full rounded-full ${color}`} style={{ width: `${pct}%` }} />
      </div>
      <span className="text-sm font-medium w-10 text-right">{pct}%</span>
    </div>
  )
}

export default function Dashboard() {
  const navigate = useNavigate()
  const { user, loading: authLoading, signOut } = useAuth()
  const { sessions, loading: sessionsLoading } = useProgress()
  const { syllabi, loading: syllabusLoading } = useWikiSyllabus()

  // Hard redirect if not authenticated
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

  const totalSessions = sessions.length
  const avgScore = totalSessions > 0
    ? Math.round(sessions.reduce((sum, s) => sum + (s.correct_count / s.total_questions) * 100, 0) / totalSessions)
    : null
  const bestScore = totalSessions > 0
    ? Math.round(Math.max(...sessions.map(s => (s.correct_count / s.total_questions) * 100)))
    : null

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

      {/* Summary stats */}
      <div className="grid grid-cols-3 gap-4">
        <Card>
          <CardContent className="pt-6 text-center">
            <div className="text-3xl font-bold">{totalSessions}</div>
            <div className="text-xs text-muted-foreground mt-1">Sessions</div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="pt-6 text-center">
            <div className="text-3xl font-bold">{avgScore !== null ? `${avgScore}%` : '—'}</div>
            <div className="text-xs text-muted-foreground mt-1">Avg Score</div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="pt-6 text-center">
            <div className="text-3xl font-bold">{bestScore !== null ? `${bestScore}%` : '—'}</div>
            <div className="text-xs text-muted-foreground mt-1">Best Score</div>
          </CardContent>
        </Card>
      </div>

      {/* Topics progress */}
      {syllabusLoading ? (
        <div className="flex items-center justify-center py-4">
          <Loader2 className="h-5 w-5 animate-spin text-muted-foreground" />
        </div>
      ) : (
        syllabi.map(syllabus => (
          <TopicProgressSection key={syllabus.examTopic} syllabus={syllabus} sessions={sessions} />
        ))
      )}

      {/* Session history */}
      <Card>
        <CardHeader>
          <CardTitle>Recent Sessions</CardTitle>
          <CardDescription>Your last {sessions.length} quiz sessions</CardDescription>
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
            <div className="space-y-1">
              {sessions.map((session, idx) => (
                <div key={session.id}>
                  {idx > 0 && <Separator className="my-3" />}
                  <div className="space-y-2">
                    <div className="flex flex-wrap items-center justify-between gap-2">
                      <div className="flex flex-wrap items-center gap-2">
                        {session.topic && (
                          <Badge variant="outline" className="text-xs">{session.topic}</Badge>
                        )}
                        <Badge variant="secondary" className="text-xs capitalize">{session.mode}</Badge>
                      </div>
                      <div className="flex items-center gap-3 text-xs text-muted-foreground">
                        <span>{session.correct_count}/{session.total_questions} correct</span>
                        <span>{formatTime(session.time_taken_seconds)}</span>
                        <span>{formatDate(session.completed_at)}</span>
                      </div>
                    </div>
                    <ScoreBar session={session} />
                  </div>
                </div>
              ))}
            </div>
          )}
        </CardContent>
      </Card>

      <div className="text-center">
        <Button onClick={() => navigate('/')}>Start New Quiz</Button>
      </div>
    </div>
  )
}
