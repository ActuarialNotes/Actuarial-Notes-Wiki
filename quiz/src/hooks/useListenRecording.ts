import { useEffect, useMemo, useState } from 'react'
import type { SpeechSegment } from '@/lib/listenTokens'
import {
  buildNarration,
  listenBaseUrl,
  readRecording,
  recordingManifestFile,
  type ListenRecording,
  type Narration,
} from '@/lib/listenNarration'

/** A concept's recorded voice-over, checked against the page as it is now. */
export interface RecordedVoice {
  recording: ListenRecording
  narration: Narration
  audioUrl: string
}

export type ListenRecordingState =
  | { status: 'checking' }
  | { status: 'none' }
  | ({ status: 'ready' } & RecordedVoice)

// One request per concept per page load; a miss is remembered too, so flipping
// Listen on and off doesn't ask the server again.
const manifests = new Map<string, Promise<unknown>>()
const BASE_URL = listenBaseUrl(import.meta.env)

function fetchManifest(slug: string): Promise<unknown> {
  let pending = manifests.get(slug)
  if (!pending) {
    pending = fetch(`${BASE_URL}/${recordingManifestFile(slug)}`)
      .then(res => (res.ok ? res.json() : null))
      .catch(() => null) // not found, or the SPA's index.html answering for a missing file
    manifests.set(slug, pending)
  }
  return pending
}

/**
 * Looks for a recorded voice-over for a concept (`public/listen/<slug>.json`,
 * made by `scripts/listen-recording.mjs`). It is used only if it was made from
 * exactly the script the page produces today; otherwise the live voices read it.
 */
export function useListenRecording(slug: string | undefined, segments: SpeechSegment[]): ListenRecordingState {
  const narration = useMemo(() => buildNarration(segments), [segments])
  const [raw, setRaw] = useState<{ slug: string; manifest: unknown } | null>(null)

  useEffect(() => {
    if (!slug || !BASE_URL) return
    let cancelled = false
    fetchManifest(slug).then(manifest => {
      if (!cancelled) setRaw({ slug, manifest })
    })
    return () => { cancelled = true }
  }, [slug])

  return useMemo<ListenRecordingState>(() => {
    if (!slug || !BASE_URL) return { status: 'none' }
    if (!raw || raw.slug !== slug) return { status: 'checking' }
    const recording = readRecording(raw.manifest, narration)
    if (!recording) return { status: 'none' }
    return { status: 'ready', recording, narration, audioUrl: `${BASE_URL}/${recording.audio}` }
  }, [slug, raw, narration])
}
