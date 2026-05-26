import { createContext, useContext } from 'react'

interface MathViewContextType {
  active: boolean
  enter: () => void
}

export const MathViewContext = createContext<MathViewContextType | null>(null)

export function useMathView() {
  return useContext(MathViewContext)
}
