import { useEffect } from 'react'
import { Headphones, Pause } from 'lucide-react'
import { usePodcastEpisode } from '@/hooks/usePodcastEpisode'
import { usePodcast } from '@/stores/podcastStore'
import { episodeMinutesLabel } from '@/lib/podcast'
import { PODCAST_ENABLED } from '@/lib/featureFlags'
import type { StudyPlan } from '@/lib/studyPlan'

/**
 * Today's Study Plan's way into the daily podcast (docs/daily-podcast.md):
 * "Listen to today's plan · 11 min". It renders nothing until there is an
 * episode to play — none of today's concepts recorded yet is no button, not a
 * disabled one. It is only ever drawn on the Pro card, as the plan is Pro.
 */
export function PodcastButton({ plan, examKey, examLabel }: { plan: StudyPlan | null; examKey: string; examLabel: string }) {
  const episode = usePodcastEpisode(plan, examKey, examLabel, PODCAST_ENABLED)
  const play = usePodcast(s => s.play)
  const loaded = usePodcast(s => s.episode)
  const playing = usePodcast(s => s.playing)
  const toggle = usePodcast(s => s.toggle)
  const takeRequest = usePodcast(s => s.takeRequest)

  // The daily email's "Listen" link: open the episode as soon as it exists.
  useEffect(() => {
    if (episode && takeRequest(examKey)) play(episode, 'email')
  }, [episode, examKey, play, takeRequest])

  if (!episode) return null
  const isThis = loaded?.examKey === examKey && loaded.date === episode.date
  const nowPlaying = isThis && playing

  return (
    <button
      type="button"
      onClick={() => (nowPlaying ? toggle() : play(episode, 'dashboard'))}
      data-testid="podcast-play"
      className="flex w-full items-center gap-3 rounded-lg bg-muted/60 px-3 py-2.5 text-left transition-colors hover:bg-muted"
    >
      <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-primary text-primary-foreground">
        {nowPlaying ? <Pause className="h-4 w-4" aria-hidden /> : <Headphones className="h-4 w-4" aria-hidden />}
      </span>
      <span className="min-w-0 flex-1">
        <span className="block text-sm font-medium">{nowPlaying ? 'Playing today\'s plan' : 'Listen to today\'s plan'}</span>
        <span className="block text-xs text-muted-foreground">
          {episode.concepts === 1 ? '1 concept' : `${episode.concepts} concepts`} · {episodeMinutesLabel(episode.seconds)}
        </span>
      </span>
    </button>
  )
}
