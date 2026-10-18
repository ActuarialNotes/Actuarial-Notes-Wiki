import { useEffect, useState } from 'react'
import type { Difficulty, QuizMode } from '@/lib/parser'
import { loadRevealMode, saveRevealMode, type RevealMode } from '@/lib/revealMode'
import { loadTimed, saveTimed } from '@/lib/quizTiming'
import { loadConceptLinks, saveConceptLinks } from '@/lib/quizConceptLinks'
import { loadDifficultyLevels, saveDifficultyLevels } from '@/lib/quizDifficulty'

/**
 * The quiz builder's settings menu as state: each choice read from storage,
 * and written back as the reader changes it. Three are remembered per format
 * (`mode`), so the two defaults, and the two choices, don't overwrite each
 * other when the format is switched; the difficulty choice is one for every
 * quiz.
 */
export function useQuizBuilderSettings(mode: QuizMode) {
  // When answers are shown — after each question, or all at once on the review
  // screen. Kept per mode (see lib/revealMode.ts).
  const [reveal, setReveal] = useState<RevealMode>(() => loadRevealMode(mode))
  useEffect(() => { setReveal(loadRevealMode(mode)) }, [mode])
  function onRevealChange(next: RevealMode) {
    setReveal(next)
    saveRevealMode(mode, next)
  }

  // Against the clock or not — per mode too, for the same reason.
  const [timed, setTimed] = useState<boolean>(() => loadTimed(mode))
  useEffect(() => { setTimed(loadTimed(mode)) }, [mode])
  function onTimedChange(next: boolean) {
    setTimed(next)
    saveTimed(mode, next)
  }

  // Whether the concepts a question names are tappable — per mode as well: on
  // for a quiz, off for a practice exam until the reader says otherwise.
  const [conceptLinks, setConceptLinks] = useState<boolean>(() => loadConceptLinks(mode))
  useEffect(() => { setConceptLinks(loadConceptLinks(mode)) }, [mode])
  function onConceptLinksChange(next: boolean) {
    setConceptLinks(next)
    saveConceptLinks(mode, next)
  }

  // Which difficulty levels a quiz draws from (lib/quizDifficulty.ts) — a
  // filter. One choice for every quiz; a practice exam ignores it.
  const [difficulties, setDifficulties] = useState<Difficulty[]>(loadDifficultyLevels)
  function onDifficultiesChange(next: Difficulty[]) {
    setDifficulties(next)
    saveDifficultyLevels(next)
  }

  return {
    reveal, onRevealChange,
    timed, onTimedChange,
    conceptLinks, onConceptLinksChange,
    difficulties, onDifficultiesChange,
  }
}
