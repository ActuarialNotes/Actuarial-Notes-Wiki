import { useEffect } from 'react'
import { Headphones, Pause } from 'lucide-react'
import { usePodcastEpisode } from '@/hooks/usePodcastEpisode'
import { usePodcast } from '@/stores/podcastStore'
import { episodeMinutesLabel } from '@/lib/podcast'
import { PODCAST_ENABLED } from '@/lib/featureFlags'
import type { StudyPlan } from '@/lib/studyPlan'
import { OUTLINE_TILE, OUTLINE_TILE_PRESSABLE } from '@/components/ui/OutlineCard'
import { cn } from '@/lib/utils'

/**
 * Today's Study Plan's way into the daily podcast (docs/daily-podcast.md):
 * "Listen to today's plan · 11 min". It renders nothing until there is an
 * episode to play — none of today's concepts recorded yet is no button, not a
 * disabled one. It is only ever drawn for a Pro reader, as the plan is Pro:
 * an outlined row under the Today card, in the card's own type.
 */
export function PodcastButton({ plan, examKey, examLabel, className }: { plan: StudyPlan | null; examKey: string; examLabel: string; className?: string }) {
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
      className={cn(
        OUTLINE_TILE, OUTLINE_TILE_PRESSABLE,
        'flex min-h-[64px] w-full items-center gap-3.5 px-5 py-3 text-left lg:rounded-[22px] lg:px-7',
        className,
      )}
    >
      {nowPlaying
        ? <Pause className="h-[22px] w-[22px] shrink-0 fill-current" aria-hidden />
        : <Headphones className="h-[22px] w-[22px] shrink-0" aria-hidden />}
      <span className="flex min-w-0 flex-1 flex-col">
        <span className="text-[17px] font-medium">{nowPlaying ? 'Playing today\'s plan' : 'Listen to today\'s plan'}</span>
        <span className="text-sm tabular-nums">
          {episode.concepts === 1 ? '1 concept' : `${episode.concepts} concepts`} · {episodeMinutesLabel(episode.seconds)}
        </span>
      </span>
    </button>
  )
}
