export type SoundEvent = 'correct' | 'wrong' | 'complete'

// To replace a built-in synthesized sound with your own audio file:
//   1. Drop the file into quiz/public/sounds/  (e.g. correct.mp3)
//   2. Set the matching path below, e.g.:  correct: '/sounds/correct.mp3'
// null = use the default Web Audio API synthesized sound.
export const SOUND_PATHS: Record<SoundEvent, string | null> = {
  correct: null,
  wrong: null,
  complete: null,
}

export const SOUND_VOLUME = 0.6
