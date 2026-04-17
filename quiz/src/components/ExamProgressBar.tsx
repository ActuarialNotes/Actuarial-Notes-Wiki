import { useState, useEffect } from 'react'
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

// Exam IDs that are persisted in Supabase exam_progress (shared with wiki)
const SUPABASE_EXAM_IDS = new Set(['P', 'FM'])

interface JourneyState {
  selectedTrack: string
  progress: Record<string, ItemStatus>
}

const STATUS_CYCLE: Record<ItemStatus, ItemStatus> = {
  not_started: 'in_progress',
  in_progress: 'completed',
  completed: 'not_started',
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

  function setSelectedTrack(key: string) {
    setState(prev => {
      const next = { ...prev, selectedTrack: key }
      saveState(next)
      return next
    })
  }

  function cycleSegment(ids: string[]) {
    if (ids.length === 0) return
    const current = state.progress[ids[0]] ?? 'not_started'
    const nextStatus = STATUS_CYCLE[current]

    setState(prev => {
      const newProgress = { ...prev.progress }
      for (const id of ids) newProgress[id] = nextStatus
      const newState = { ...prev, progress: newProgress }
      saveState(newState)
      return newState
    })

    // Persist Supabase-backed exam IDs for cross-app sync
    if (user) {
      ids
        .filter(id => SUPABASE_EXAM_IDS.has(id))
        .forEach(id => {
          supabase
            .from('exam_progress')
            .upsert(
              { user_id: user.id, exam_id: id, status: nextStatus, updated_at: new Date().toISOString() },
              { onConflict: 'user_id,exam_id' }
            )
            .then()
        })
    }
  }

  return { selectedTrack: state.selectedTrack, progress: state.progress, setSelectedTrack, cycleSegment }
}

export function ExamProgressBar() {
  const { selectedTrack, progress, setSelectedTrack, cycleSegment } = useJourneyState()

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
            <select
              value={selectedTrack}
              onChange={e => setSelectedTrack(e.target.value)}
              className="text-sm border border-input rounded-md px-2 py-1 bg-background text-foreground cursor-pointer"
            >
              {TRACKS.map(t => (
                <option key={t.key} value={t.key}>{t.name}</option>
              ))}
            </select>
          </div>
        </div>
      </CardHeader>
      <CardContent>
        {isDefault ? (
          <p className="text-sm text-muted-foreground text-center py-1">
            Select a credential track above to track your progress
          </p>
        ) : (
          <div className="flex gap-[1.5px] rounded-full overflow-hidden h-2.5">
            {segments.map((seg, i) => (
              <button
                key={i}
                title={seg.label}
                onClick={() => cycleSegment(seg.ids)}
                className={cn(
                  'flex-1 h-full transition-colors focus:outline-none focus-visible:ring-1 focus-visible:ring-ring',
                  seg.status === 'not_started' && 'bg-muted',
                  seg.status === 'completed' && 'bg-foreground',
                )}
                style={seg.status === 'in_progress' ? { backgroundColor: COLOR_HEX[seg.color] } : undefined}
              />
            ))}
          </div>
        )}
      </CardContent>
    </Card>
  )
}
