import { useCallback, useState } from 'react'
import { SOUND_PATHS, SOUND_VOLUME, type SoundEvent } from '@/lib/soundConfig'

const STORAGE_KEY = 'actuarial-notes-sounds'

function loadEnabled(): boolean {
  try {
    return localStorage.getItem(STORAGE_KEY) !== 'false'
  } catch {
    return true
  }
}

function synthCorrect(ctx: AudioContext, vol: number) {
  // Ascending two-tone sine: D5 → A5
  const osc = ctx.createOscillator()
  const gain = ctx.createGain()
  osc.connect(gain)
  gain.connect(ctx.destination)
  osc.type = 'sine'
  osc.frequency.setValueAtTime(587.3, ctx.currentTime)
  osc.frequency.setValueAtTime(880, ctx.currentTime + 0.13)
  gain.gain.setValueAtTime(0, ctx.currentTime)
  gain.gain.linearRampToValueAtTime(vol, ctx.currentTime + 0.01)
  gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.5)
  osc.start(ctx.currentTime)
  osc.stop(ctx.currentTime + 0.5)
}

function synthWrong(ctx: AudioContext, vol: number) {
  // Descending sawtooth: 220 Hz → 110 Hz
  const osc = ctx.createOscillator()
  const gain = ctx.createGain()
  osc.connect(gain)
  gain.connect(ctx.destination)
  osc.type = 'sawtooth'
  osc.frequency.setValueAtTime(220, ctx.currentTime)
  osc.frequency.exponentialRampToValueAtTime(110, ctx.currentTime + 0.25)
  gain.gain.setValueAtTime(vol * 0.4, ctx.currentTime)
  gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.35)
  osc.start(ctx.currentTime)
  osc.stop(ctx.currentTime + 0.35)
}

function synthComplete(ctx: AudioContext, vol: number) {
  // C-major arpeggio: C5, E5, G5, C6
  const notes = [523.25, 659.25, 783.99, 1046.5]
  notes.forEach((freq, i) => {
    const osc = ctx.createOscillator()
    const gain = ctx.createGain()
    osc.connect(gain)
    gain.connect(ctx.destination)
    osc.type = 'sine'
    const t = ctx.currentTime + i * 0.12
    osc.frequency.setValueAtTime(freq, t)
    gain.gain.setValueAtTime(0, t)
    gain.gain.linearRampToValueAtTime(vol, t + 0.01)
    gain.gain.exponentialRampToValueAtTime(0.001, t + 0.4)
    osc.start(t)
    osc.stop(t + 0.4)
  })
}

const SYNTHS: Record<SoundEvent, (ctx: AudioContext, vol: number) => void> = {
  correct: synthCorrect,
  wrong: synthWrong,
  complete: synthComplete,
}

export function useSoundEffects() {
  const [enabled, setEnabled] = useState(loadEnabled)

  const toggle = useCallback(() => {
    setEnabled(prev => {
      const next = !prev
      try { localStorage.setItem(STORAGE_KEY, String(next)) } catch { /* ignore */ }
      return next
    })
  }, [])

  const play = useCallback((event: SoundEvent) => {
    if (!enabled) return
    const path = SOUND_PATHS[event]
    if (path) {
      const audio = new Audio(path)
      audio.volume = SOUND_VOLUME
      audio.play().catch(() => {})
      return
    }
    try {
      const ctx = new AudioContext()
      SYNTHS[event](ctx, SOUND_VOLUME)
      setTimeout(() => ctx.close(), 2000)
    } catch { /* ignore */ }
  }, [enabled])

  return { enabled, toggle, play }
}
