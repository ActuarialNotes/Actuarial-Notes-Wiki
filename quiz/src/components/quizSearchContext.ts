import { createContext, useContext } from 'react'

/**
 * Opens the quiz builder's question search panel (QuizFloatingSearch) from
 * something drawn inside its bar — the exam strip's info sheet offers the
 * panel as **Browse questions**. Null outside the bar, where there is no panel
 * to open, so a surface hides its way in.
 */
export const QuizSearchOpenContext = createContext<(() => void) | null>(null)

export function useOpenQuizSearch(): (() => void) | null {
  return useContext(QuizSearchOpenContext)
}
