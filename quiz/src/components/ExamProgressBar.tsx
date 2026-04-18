import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { cn } from '@/lib/utils'
import {
  TRACKS,
  COLOR_HEX,
  getTrackSegments,
  getTrackCounts,
  type ItemStatus,
} from '@/data/tracks'
import { useAuth } from '@/hooks/useAuth'
import { supabase } from '@/lib/supabase'

const JOURNEY_LS_KEY = 'quiz-journey'

interface JourneyState {
  selectedTrack: string
  progress: Record<string, ItemStatus>
}

function loadState(): JourneyState {
  try {
    const raw = localStorage.getItem(JOURNEY_LS_KEY)
    if (raw) {
      const parsed = JSON.parse(raw)
      return {
        selectedTrack: parsed.selectedTrack ?? 'DEFAULT',
        progress: parsed.progress ?? {},
      }
    }
  } catch { /* ignore */ }
  return { selectedTrack: 'DEFAULT', progress: {} }
}

function saveState(state: JourneyState) {
  try {
    localStorage.setItem(JOURNEY_LS_KEY, JSON.stringify(state))
  } catch { /* ignore */ }
}

function useJourneyState() {
  const { user } = useAuth()
  const [state, setState] = useState<JourneyState>(loadState)

  // On login, pull exam_progress from Supabase and merge into local state
  useEffect(() => {
    if (!user) return
    supabase
      .from('exam_progress')
      .select('exam_id, status')
      .eq('user_id', user.id)
      .then(({ data }: { data: { exam_id: string; status: string }[] | null }) => {
        if (!data?.length) return
        setState(prev => {
          const newProgress = { ...prev.progress }
          data.forEach((row: { exam_id: string; status: string }) => {
            newProgress[row.exam_id] = row.status as ItemStatus
          })
          const next = { ...prev, progress: newProgress }
          saveState(next)
          return next
        })
      })
  }, [user?.id])  // eslint-disable-line react-hooks/exhaustive-deps

  return { selectedTrack: state.selectedTrack, progress: state.progress }
}

export function ExamProgressBar() {
  const { selectedTrack, progress } = useJourneyState()

  const track = TRACKS.find(t => t.key === selectedTrack) ?? TRACKS[0]
  const isDefault = selectedTrack === 'DEFAULT'
  const segments = isDefault ? [] : getTrackSegments(track, progress)
  const counts = isDefault ? null : getTrackCounts(track, progress)

  return (
    <Card>
      <CardHeader className="pb-3">
        <div className="flex items-center justify-between gap-2">
          <CardTitle className="text-base">Credential Journey</CardTitle>
          <div className="flex items-center gap-2">
            {counts && (
              <Badge variant="outline" className="text-xs">
                {counts.done} / {counts.total}
              </Badge>
            )}
            <span className="text-sm text-muted-foreground opacity-75 px-2 py-1">
              {track.name}
            </span>
          </div>
        </div>
      </CardHeader>
      <CardContent className="space-y-2">
        {isDefault ? (
          <p className="text-sm text-muted-foreground text-center py-1">
            Select a credential track in Settings to track your progress
          </p>
        ) : (
          <div className="flex gap-[1.5px] rounded-full overflow-hidden h-2.5">
            {segments.map((seg, i) => (
              <div
                key={i}
                title={seg.label}
                className={cn(
                  'flex-1 h-full',
                  seg.status === 'not_started' && 'bg-muted',
                  seg.status === 'completed' && 'bg-foreground',
                )}
                style={seg.status === 'in_progress' ? { backgroundColor: COLOR_HEX[seg.color] } : undefined}
              />
            ))}
          </div>
        )}
        <div className="text-right">
          <Link to="/settings#exams" className="text-xs text-muted-foreground hover:text-foreground transition-colors">
            Edit in Settings →
          </Link>
        </div>
      </CardContent>
    </Card>
  )
}
