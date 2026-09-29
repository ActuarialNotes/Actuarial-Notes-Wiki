// Plays the Quiz Battle score (`battleMusic.ts`) on the app's own audio graph.
//
// One player for the whole app, driven by one number: the intensity the battle
// on screen wants, or null for none (`setBattleMusic`). It schedules a beat at a
// time a third of a second ahead of the audio clock — the standard Web Audio
// look-ahead — so a busy main thread never makes it stumble, and it reads the
// intensity fresh on every beat, so the music leans in within a beat of the game
// changing. It stops for the app's mute, for its own switch, and while the tab is
// hidden: nobody wants a soundtrack coming from a tab they can't see.
//
// It sits well under the cues — around 9 dB below a right answer at the same
// volume — because the music is the room the game happens in, not something
// competing with it.

import {
  SECONDS_PER_BEAT,
  composeBeat,
  isMusicOn,
  nextBeat,
  subscribeMusic,
  type BeatState,
  type MusicIntensity,
  type MusicNote,
} from './battleMusic'
import { soundGraph, subscribeSound, type SoundGraph } from './soundEngine'

/** The music bus's level: well under every cue in the catalogue. */
const MUSIC_LEVEL = 0.13
/** How much of the music goes to the room. */
const MUSIC_SPACE = 0.22
/** Scheduled this far ahead of the audio clock, in seconds. */
const LOOKAHEAD = 0.35
const TICK_MS = 90
const FADE_IN = 2.5
const FADE_OUT = 0.9
/**
 * How long a release waits before it stops the music: one battle screen hands
 * over to the next (the lobby to the match, the match to the reveal) without
 * the music dropping out between them.
 */
const RELEASE_MS = 500

interface Running {
  graph: SoundGraph
  bus: GainNode
  timer: ReturnType<typeof setInterval>
  state: BeatState
  nextAt: number
}

let running: Running | null = null
let wanted: MusicIntensity | null = null
let releaseTimer: ReturnType<typeof setTimeout> | null = null
let wired = false

/**
 * What the battle on screen wants from the music: an intensity, or null for
 * none. Safe to call at any time — without audio, with sound off, in a tab in
 * the background — it just doesn't play.
 */
export function setBattleMusic(intensity: MusicIntensity | null): void {
  wire()
  if (intensity === null) {
    if (releaseTimer === null && wanted !== null) {
      releaseTimer = setTimeout(() => {
        releaseTimer = null
        wanted = null
        sync()
      }, RELEASE_MS)
    }
    return
  }
  if (releaseTimer !== null) {
    clearTimeout(releaseTimer)
    releaseTimer = null
  }
  wanted = intensity
  sync()
}

/** The intensity the music is playing at — null when it's silent. For the page's tests and tools. */
export function battleMusicPlaying(): MusicIntensity | null {
  return running ? wanted : null
}

function wire() {
  if (wired) return
  wired = true
  subscribeSound(sync)
  subscribeMusic(sync)
  if (typeof document !== 'undefined') document.addEventListener('visibilitychange', sync)
}

function sync() {
  const hidden = typeof document !== 'undefined' && document.hidden
  if (wanted !== null && isMusicOn() && !hidden) start()
  else stop()
}

function start() {
  if (running) return
  const graph = soundGraph()
  if (!graph) return
  const { audio } = graph
  try {
    const bus = audio.createGain()
    bus.gain.value = 0
    const lowpass = audio.createBiquadFilter()
    lowpass.type = 'lowpass'
    lowpass.frequency.value = 2200
    lowpass.Q.value = 0.6
    bus.connect(lowpass)
    lowpass.connect(graph.out)
    if (graph.room) {
      const send = audio.createGain()
      send.gain.value = MUSIC_SPACE
      lowpass.connect(send)
      send.connect(graph.room)
    }
    const now = audio.currentTime
    bus.gain.setValueAtTime(0, now)
    bus.gain.linearRampToValueAtTime(MUSIC_LEVEL, now + FADE_IN)
    running = {
      graph,
      bus,
      timer: setInterval(schedule, TICK_MS),
      state: { bar: 0, beat: 0, lineIndex: 2 },
      nextAt: now + 0.1,
    }
    schedule()
  } catch {
    running = null
  }
}

function stop() {
  if (!running) return
  const { graph, bus, timer } = running
  running = null
  clearInterval(timer)
  try {
    const now = graph.audio.currentTime
    bus.gain.cancelScheduledValues(now)
    bus.gain.setValueAtTime(bus.gain.value, now)
    bus.gain.linearRampToValueAtTime(0, now + FADE_OUT)
  } catch { /* ignore */ }
  // Long enough for the fade and the pads' tails under it.
  setTimeout(() => {
    try { bus.disconnect() } catch { /* ignore */ }
  }, (FADE_OUT + 4) * 1000)
}

function schedule() {
  const r = running
  if (!r) return
  const { audio } = r.graph
  // A tab that was throttled comes back with the schedule far behind the
  // clock; pick up from now rather than firing everything it missed at once.
  if (r.nextAt < audio.currentTime - 0.5) r.nextAt = audio.currentTime + 0.05
  while (r.nextAt < audio.currentTime + LOOKAHEAD) {
    const { notes, lineIndex } = composeBeat(r.state, wanted ?? 0)
    for (const note of notes) {
      try { voice(r, note, r.nextAt + note.at * SECONDS_PER_BEAT) } catch { /* ignore */ }
    }
    r.state = nextBeat(r.state, lineIndex)
    r.nextAt += SECONDS_PER_BEAT
  }
}

// ── The voices ──────────────────────────────────────────────────────────────

function voice(r: Running, note: MusicNote, t: number) {
  const seconds = note.dur * SECONDS_PER_BEAT
  switch (note.voice) {
    case 'pad': return pad(r, note, t, seconds)
    case 'bass': return tone(r, note.freq, t, seconds, note.gain, 0.04)
    case 'arp': return struck(r, note.freq, t, seconds, note.gain)
    case 'pulse': return pulse(r, note, t, seconds)
    case 'shaker': return shaker(r, note, t, seconds)
  }
}

/** A held chord tone: two sines a few cents apart, swelling in and letting go. */
function pad(r: Running, note: MusicNote, t: number, seconds: number) {
  const { audio } = r.graph
  const gain = audio.createGain()
  const swell = Math.min(1.2, seconds * 0.35)
  gain.gain.setValueAtTime(0, t)
  gain.gain.linearRampToValueAtTime(note.gain, t + swell)
  gain.gain.setValueAtTime(note.gain, t + seconds - 1)
  gain.gain.linearRampToValueAtTime(0, t + seconds)
  gain.connect(r.bus)
  for (const cents of [-3, 3]) {
    const osc = audio.createOscillator()
    osc.type = 'sine'
    osc.frequency.value = note.freq * Math.pow(2, cents / 1200)
    osc.connect(gain)
    osc.start(t)
    osc.stop(t + seconds + 0.05)
  }
}

/** A plain sine with a soft attack and an exponential fall. */
function tone(r: Running, freq: number, t: number, seconds: number, level: number, attack: number) {
  const { audio } = r.graph
  const osc = audio.createOscillator()
  osc.type = 'sine'
  osc.frequency.value = freq
  const gain = audio.createGain()
  gain.gain.setValueAtTime(0.0001, t)
  gain.gain.linearRampToValueAtTime(level, t + attack)
  gain.gain.exponentialRampToValueAtTime(0.0001, t + seconds)
  osc.connect(gain)
  gain.connect(r.bus)
  osc.start(t)
  osc.stop(t + seconds + 0.05)
}

/** The line's marimba: the catalogue's struck note, a sine with its octave on the strike alone. */
function struck(r: Running, freq: number, t: number, seconds: number, level: number) {
  tone(r, freq, t, seconds, level, 0.008)
  tone(r, freq * 2, t, seconds * 0.2, level * 0.1, 0.006)
}

/** The heartbeat: a sine dropping an octave in a tenth of a second — felt more than heard. */
function pulse(r: Running, note: MusicNote, t: number, seconds: number) {
  const { audio } = r.graph
  const osc = audio.createOscillator()
  osc.type = 'sine'
  osc.frequency.setValueAtTime(note.freq, t)
  osc.frequency.exponentialRampToValueAtTime(note.glide ?? note.freq / 2, t + 0.1)
  const gain = audio.createGain()
  gain.gain.setValueAtTime(0.0001, t)
  gain.gain.linearRampToValueAtTime(note.gain, t + 0.006)
  gain.gain.exponentialRampToValueAtTime(0.0001, t + seconds)
  osc.connect(gain)
  gain.connect(r.bus)
  osc.start(t)
  osc.stop(t + seconds + 0.05)
}

/** A breath of the shared pink noise through a band, on the off-beat. */
function shaker(r: Running, note: MusicNote, t: number, seconds: number) {
  const { audio, noise } = r.graph
  const src = audio.createBufferSource()
  src.buffer = noise
  const filter = audio.createBiquadFilter()
  filter.type = 'bandpass'
  filter.frequency.value = note.freq
  filter.Q.value = 1.2
  const gain = audio.createGain()
  gain.gain.setValueAtTime(0.0001, t)
  gain.gain.linearRampToValueAtTime(note.gain, t + seconds * 0.3)
  gain.gain.exponentialRampToValueAtTime(0.0001, t + seconds)
  src.connect(filter)
  filter.connect(gain)
  gain.connect(r.bus)
  const offset = Math.random() * Math.max(0, noise.duration - seconds - 0.05)
  src.start(t, offset)
  src.stop(t + seconds + 0.05)
}
