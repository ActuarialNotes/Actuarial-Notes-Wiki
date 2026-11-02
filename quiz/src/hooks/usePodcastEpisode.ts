import { useEffect, useState } from 'react'
import {
  episodeChapters,
  episodeFacts,
  isCurrentClip,
  parsePodcastIndex,
  planEpisode,
  podcastBaseUrl,
  type PodcastClip,
  type PodcastScriptHashes,
} from '@/lib/podcast'
import { todayISO, type StudyPlan } from '@/lib/studyPlan'
import type { PodcastEpisode } from '@/stores/podcastStore'

// Today's plan → today's episode (docs/daily-podcast.md). Reads two things, each
// once per page load: the recordings' index from the `podcast` bucket, and the
// build's script hashes (`virtual:podcast-scripts`, a chunk of its own), which
// is what keeps a clip recorded from an older page out of the episode.

interface Sources {
  clips: Record<string, PodcastClip>
  scripts: PodcastScriptHashes
}

let sources: Promise<Sources | null> | null = null

function loadSources(): Promise<Sources | null> {
  sources ??= Promise.all([
    fetch(`${podcastBaseUrl(import.meta.env)}/index.json`)
      .then(res => (res.ok ? res.json() : null))
      .then(parsePodcastIndex)
      .catch(() => null),
    import('virtual:podcast-scripts').then(m => m.default),
  ]).then(([clips, scripts]) => (clips ? { clips, scripts } : null))
    // A failed read is tried again on the next page load, not the next render.
    .catch(() => null)
  return sources
}

/** Today's episode for one exam's plan, or null — nothing recorded, no plan, or still loading. */
export function usePodcastEpisode(
  plan: StudyPlan | null,
  examKey: string,
  examLabel: string,
  enabled: boolean,
): PodcastEpisode | null {
  const [src, setSrc] = useState<Sources | null>(null)

  useEffect(() => {
    if (!enabled) return
    let live = true
    void loadSources().then(s => { if (live) setSrc(s) })
    return () => { live = false }
  }, [enabled])

  if (!enabled || !src || !plan) return null
  const planned = planEpisode(
    plan.todaysConcepts,
    plan.reviewConcepts,
    plan.status,
    src.clips,
    (key, hash) => isCurrentClip(key, hash, src.scripts),
  )
  if (planned.concepts === 0) return null
  return {
    examKey,
    examLabel,
    date: todayISO(),
    facts: episodeFacts(plan),
    entries: planned.entries,
    chapters: episodeChapters(planned.entries),
    seconds: planned.seconds,
    unread: planned.unread,
    concepts: planned.concepts,
    clips: src.clips,
  }
}
