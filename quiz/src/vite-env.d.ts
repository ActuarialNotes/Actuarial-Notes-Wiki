/// <reference types="vite/client" />

interface ImportMetaEnv {
  /**
   * Optional error-monitoring collector endpoint. When set, captured errors are
   * beacon-POSTed here (a Sentry tunnel or any custom collector). See
   * lib/errorMonitoring.ts. Left unset, errors go to console + the GA4
   * `exception` event only.
   */
  readonly VITE_ERROR_ENDPOINT?: string
}

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

declare module 'virtual:exam-guides' {
  import type { ExamGuideFile } from '@/lib/examGuides'
  /** Every `Guides/<exam page>/<tip>.md`, one entry per tip page. */
  const guides: ExamGuideFile[]
  export default guides
}

declare module 'virtual:comprehension-checks' {
  const checks: string[]
  export default checks
}

declare module 'virtual:keystone-links' {
  /** Keystone concept page name → the concept pages it links to, in page order. */
  const links: Record<string, string[]>
  export default links
}

declare module 'virtual:resource-timeline' {
  import type { TimelineRawEntry } from '@/lib/resourceTimeline'
  const timeline: TimelineRawEntry[]
  export default timeline
}
