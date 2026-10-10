import { useCallback, useEffect, useRef, useState } from 'react'
import { useSubscription } from '@/hooks/useSubscription'
import { supabase } from '@/lib/supabase'
import { segmentsToSsml, type SpeechSegment } from '@/lib/listenTokens'
import { segmentStartTime, tokenAt } from '@/lib/listenNarration'
import type { RecordedVoice } from '@/hooks/useListenRecording'

export type ListenStatus = 'idle' | 'loading' | 'playing' | 'paused' | 'ended' | 'unsupported'
export type ListenEngine = 'browser' | 'pro' | 'studio'

export interface ListenSpeech {
  status: ListenStatus
  activeIndex: number | null
  engine: ListenEngine
  play: () => void
  pause: () => void
  resume: () => void
  stop: () => void
  /** Replay from the start of the previous paragraph (rewind). */
  rewind: () => void
  /** Replay from the start of the paragraph currently being read. */
  restartCurrent: () => void
  /** Skip to the start of the next paragraph. */
  skipForward: () => void
}

const MAX_SSML_CHARS = 4000

interface CloudResponse {
  audioContent?: string
  timepoints?: Array<{ markName: string; timeSeconds: number }>
  error?: string
}

// Split segments into request-sized chunks so cloud SSML stays under the API limit.
function chunkSegments(segments: SpeechSegment[], maxChars: number): SpeechSegment[][] {
  const chunks: SpeechSegment[][] = []
  let current: SpeechSegment[] = []
  let size = 0
  for (const seg of segments) {
    if (current.length > 0 && size + seg.text.length > maxChars) {
      chunks.push(current)
      current = []
      size = 0
    }
    current.push(seg)
    size += seg.text.length
  }
  if (current.length > 0) chunks.push(current)
  return chunks
}

function pickEnglishVoice(synth: SpeechSynthesis): SpeechSynthesisVoice | null {
  const voices = synth.getVoices()
  if (voices.length === 0) return null
  return (
    voices.find(v => /^en[-_]US/i.test(v.lang) && v.localService) ??
    voices.find(v => /^en[-_]US/i.test(v.lang)) ??
    voices.find(v => /^en/i.test(v.lang)) ??
    voices[0]
  )
}

/**
 * Controller for the Listen view. Plays the given speech segments and reports
 * the token index currently being spoken. A concept with a recorded voice-over
 * (`recorded`) plays that, the highlight following the audio's clock; otherwise
 * Pro users get Google Cloud TTS (with SSML mark timepoints) and everyone else
 * (and any failure of either) uses the browser's Web Speech API with
 * word-boundary highlighting.
 */
export function useListenSpeech(segments: SpeechSegment[], rate: number, recorded: RecordedVoice | null = null): ListenSpeech {
  const { isPro } = useSubscription()
  const [status, setStatus] = useState<ListenStatus>('idle')
  const [activeIndex, setActiveIndex] = useState<number | null>(null)
  const [engine, setEngine] = useState<ListenEngine>('browser')

  // Mutable refs so async callbacks always see current values without re-binding.
  const segmentsRef = useRef(segments)
  const rateRef = useRef(rate)
  const runIdRef = useRef(0)
  const audioRef = useRef<HTMLAudioElement | null>(null)
  const isProRef = useRef(isPro)
  const activeIndexRef = useRef<number | null>(null)
  const recordedRef = useRef(recorded)
  const engineRef = useRef<ListenEngine>('browser')
  const frameRef = useRef(0)

  recordedRef.current = recorded
  segmentsRef.current = segments
  rateRef.current = rate
  isProRef.current = isPro

  const synth = typeof window !== 'undefined' ? window.speechSynthesis : undefined

  // Set highlight state and mirror it into a ref so rewind / speed-change can
  // figure out which paragraph is currently being read.
  const setActive = useCallback((idx: number | null) => {
    activeIndexRef.current = idx
    setActiveIndex(idx)
  }, [])

  // Index of the segment (paragraph) that contains the active token.
  const currentSegmentIndex = useCallback(() => {
    const idx = activeIndexRef.current
    if (idx == null) return 0
    const segs = segmentsRef.current
    for (let s = 0; s < segs.length; s++) {
      if (segs[s].ranges.some(r => r.index === idx)) return s
    }
    return 0
  }, [])

  const teardownAudio = useCallback(() => {
    cancelAnimationFrame(frameRef.current)
    const audio = audioRef.current
    if (audio) {
      audio.onended = null
      audio.ontimeupdate = null
      audio.onerror = null
      audio.onplay = null
      audio.onpause = null
      audio.pause()
      audio.src = ''
      audioRef.current = null
    }
  }, [])

  const hardStop = useCallback(() => {
    runIdRef.current++
    if (synth) synth.cancel()
    teardownAudio()
  }, [synth, teardownAudio])

  // --- Browser Web Speech path ---
  const speakSegment = useCallback((segIdx: number, runId: number) => {
    if (runId !== runIdRef.current || !synth) return
    const segs = segmentsRef.current
    if (segIdx >= segs.length) {
      setActive(null)
      setStatus('ended')
      return
    }
    const seg = segs[segIdx]
    const utter = new SpeechSynthesisUtterance(seg.text)
    utter.rate = rateRef.current
    utter.lang = 'en-US'
    const voice = pickEnglishVoice(synth)
    if (voice) utter.voice = voice
    utter.onboundary = e => {
      if (runId !== runIdRef.current) return
      const ci = e.charIndex ?? 0
      const exact = seg.ranges.find(r => ci >= r.start && ci < r.end)
      const fallback = exact ?? [...seg.ranges].reverse().find(r => r.start <= ci)
      if (fallback) setActive(fallback.index)
    }
    utter.onend = () => speakSegment(segIdx + 1, runId)
    utter.onerror = () => speakSegment(segIdx + 1, runId)
    // Highlight the segment's first token immediately so browsers that don't
    // fire boundary events still show progress at segment granularity.
    if (seg.ranges[0]) setActive(seg.ranges[0].index)
    synth.speak(utter)
  }, [synth, setActive])

  const startBrowser = useCallback((runId: number, fromSeg: number) => {
    if (!synth) { setStatus('unsupported'); return }
    engineRef.current = 'browser'
    setEngine('browser')
    setStatus('playing')
    speakSegment(fromSeg, runId)
  }, [synth, speakSegment])

  // --- Pro cloud path ---
  const playCloudChunk = useCallback(async (chunks: SpeechSegment[][], idx: number, runId: number) => {
    if (runId !== runIdRef.current) return
    if (idx >= chunks.length) {
      setActive(null)
      setStatus('ended')
      return
    }
    const ssml = segmentsToSsml(chunks[idx])
    const { data, error } = await supabase.functions.invoke<CloudResponse>('google-cloud-tts', {
      body: { ssml, rate: rateRef.current },
    })
    if (runId !== runIdRef.current) return
    if (error || !data?.audioContent) {
      throw error ?? new Error(data?.error || 'Cloud TTS returned no audio')
    }

    const audio = new Audio(`data:audio/mp3;base64,${data.audioContent}`)
    audioRef.current = audio
    const timepoints = (data.timepoints ?? [])
      .map(t => ({ index: Number(t.markName.replace(/^t/, '')), at: t.timeSeconds }))
      .filter(t => Number.isFinite(t.index))
      .sort((a, b) => a.at - b.at)

    audio.ontimeupdate = () => {
      const ct = audio.currentTime
      let current: number | null = null
      for (const tp of timepoints) {
        if (tp.at <= ct) current = tp.index
        else break
      }
      if (current != null) setActive(current)
    }
    audio.onended = () => playCloudChunk(chunks, idx + 1, runId)
    audio.onerror = () => playCloudChunk(chunks, idx + 1, runId)
    await audio.play()
    if (runId !== runIdRef.current) { teardownAudio(); return }
    setStatus('playing')
  }, [teardownAudio, setActive])

  const startCloud = useCallback(async (runId: number, fromSeg: number) => {
    engineRef.current = 'pro'
    setEngine('pro')
    setStatus('loading')
    try {
      const chunks = chunkSegments(segmentsRef.current.slice(fromSeg), MAX_SSML_CHARS)
      await playCloudChunk(chunks, 0, runId)
    } catch (err) {
      console.warn('Listen: cloud TTS failed, falling back to browser voice:', err)
      if (runId !== runIdRef.current) return
      teardownAudio()
      startBrowser(runId, fromSeg)
    }
  }, [playCloudChunk, startBrowser, teardownAudio])

  // --- Recorded voice-over path ---
  // One audio file for the whole page; the highlight is read off its clock. The
  // clock is polled every frame rather than taken from `timeupdate`, which
  // fires about four times a second — slower than a short word.
  const startRecorded = useCallback((runId: number, fromSeg: number, fallback: () => void) => {
    const voice = recordedRef.current
    if (!voice) { fallback(); return }
    engineRef.current = 'studio'
    setEngine('studio')
    setStatus('loading')

    const { marks } = voice.recording
    const audio = new Audio(voice.audioUrl)
    audioRef.current = audio
    audio.preload = 'auto'
    audio.defaultPlaybackRate = rateRef.current
    audio.playbackRate = rateRef.current
    audio.preservesPitch = true

    const follow = () => {
      if (runId !== runIdRef.current) return
      const idx = tokenAt(marks, audio.currentTime)
      if (idx != null) setActive(idx)
      frameRef.current = requestAnimationFrame(follow)
    }
    audio.onplay = () => {
      if (runId !== runIdRef.current) return
      setStatus('playing')
      cancelAnimationFrame(frameRef.current)
      frameRef.current = requestAnimationFrame(follow)
    }
    audio.onpause = () => cancelAnimationFrame(frameRef.current)
    audio.onended = () => {
      if (runId !== runIdRef.current) return
      cancelAnimationFrame(frameRef.current)
      setActive(null)
      setStatus('ended')
    }
    audio.onerror = () => {
      if (runId !== runIdRef.current) return
      console.warn('Listen: recorded voice failed to load, falling back to a live voice')
      teardownAudio()
      fallback()
    }

    const start = segmentStartTime(marks, voice.narration, fromSeg)
    const go = () => {
      if (runId !== runIdRef.current) return
      if (start > 0) audio.currentTime = start
      audio.play().catch(() => {
        // Autoplay refused (no gesture yet): leave it paused on Play, as the live voices do.
        if (runId === runIdRef.current) setStatus('paused')
      })
    }
    if (audio.readyState >= 1) go()
    else audio.addEventListener('loadedmetadata', go, { once: true })
  }, [setActive, teardownAudio])

  // --- Public controls ---
  // Stop everything and (re)start playback from a given paragraph index.
  const begin = useCallback((fromSeg: number) => {
    hardStop()
    const runId = runIdRef.current
    const segs = segmentsRef.current
    if (segs.length === 0) { setActive(null); setStatus('ended'); return }
    const clamped = Math.max(0, Math.min(fromSeg, segs.length - 1))
    setActive(segs[clamped].ranges[0]?.index ?? null)
    const live = () => (isProRef.current ? startCloud(runId, clamped) : startBrowser(runId, clamped))
    if (recordedRef.current) startRecorded(runId, clamped, live)
    else live()
  }, [hardStop, startCloud, startBrowser, startRecorded, setActive])

  const play = useCallback(() => begin(0), [begin])
  const restartCurrent = useCallback(() => {
    // A recording changes speed in place; the live voices must replay the paragraph.
    const audio = audioRef.current
    if (engineRef.current === 'studio' && audio) { audio.playbackRate = rateRef.current; return }
    begin(currentSegmentIndex())
  }, [begin, currentSegmentIndex])
  const rewind = useCallback(() => begin(currentSegmentIndex() - 1), [begin, currentSegmentIndex])
  const skipForward = useCallback(() => begin(currentSegmentIndex() + 1), [begin, currentSegmentIndex])

  const pause = useCallback(() => {
    if (engine !== 'browser') audioRef.current?.pause()
    else synth?.pause()
    setStatus('paused')
  }, [engine, synth])

  const resume = useCallback(() => {
    if (engine !== 'browser') void audioRef.current?.play()
    else synth?.resume()
    setStatus('playing')
  }, [engine, synth])

  const stop = useCallback(() => {
    hardStop()
    setActive(null)
    setStatus('idle')
  }, [hardStop, setActive])

  // Stop any audio when the hook unmounts (popup close / mode exit / navigation).
  useEffect(() => () => { hardStop() }, [hardStop])

  return { status, activeIndex, engine, play, pause, resume, stop, rewind, restartCurrent, skipForward }
}
