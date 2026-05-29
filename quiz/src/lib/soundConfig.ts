export type SoundEvent = 'correct' | 'wrong' | 'complete' | 'click' | 'start'

// To replace any sound, drop an audio file into quiz/public/sounds/ using the
// filename shown below (e.g. click.mp3). If the file is missing the built-in
// synthesized sound plays as a fallback — no code changes needed.
export const SOUND_PATHS: Record<SoundEvent, string | null> = {
  correct:  '/sounds/correct.mp3',
  wrong:    '/sounds/wrong.mp3',
  complete: '/sounds/complete.mp3',
  click:    '/sounds/click.mp3',
  start:    '/sounds/start.mp3',
}

export const SOUND_VOLUME = 0.6
