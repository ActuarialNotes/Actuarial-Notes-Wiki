/// <reference types="vite/client" />

interface Window {
  gtag: (...args: unknown[]) => void
  dataLayer: unknown[]
}

declare module 'virtual:wiki-content' {
  import type { WikiIndexItem } from '@/lib/wikiIndex'
  const content: { files: Record<string, string>; index: WikiIndexItem[] }
  export default content
}

declare module 'virtual:questions-content' {
  const questions: string[]
  export default questions
}
