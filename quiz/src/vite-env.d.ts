/// <reference types="vite/client" />

interface ImportMetaEnv {
  /**
   * Optional error-monitoring collector endpoint. When set, captured errors are
   * beacon-POSTed here (a Sentry tunnel or any custom collector). See
   * lib/errorMonitoring.ts. Left unset, errors go to console + the GA4
   * `exception` event only.
   */
  readonly VITE_ERROR_ENDPOINT?: string
  /**
   * What an online Quiz Battle plays over: unset (or `supabase`) is a Supabase
   * Realtime broadcast channel, `local` the browser's BroadcastChannel — two
   * tabs of one browser, for a dev server with no Supabase project and for the
   * e2e suite. See lib/battleTransport.ts.
   */
  readonly VITE_BATTLE_TRANSPORT?: string
  /**
   * `on` opens Actuaria Online to every viewer, signed out included, rather
   * than to the approved accounts alone — the e2e suite's build, which plays
   * the game layer signed out. See `ACTUARIA_OPEN_TO_ALL` in lib/featureFlags.ts.
   */
  readonly VITE_ACTUARIA_PREVIEW?: string
}

// Google Analytics, defined by `initAnalytics()` (lib/analytics.ts) only on a
// visit that is measured — absent everywhere else.
interface Window {
  gtag?: (...args: unknown[]) => void
  dataLayer?: unknown[]
  /** gtag.js's documented kill switch: true stops the tag sending anything. */
  [disable: `ga-disable-${string}`]: boolean
}

declare module 'virtual:wiki-content' {
  import type { WikiIndexItem } from '@/lib/wikiIndex'
  const content: { files: Record<string, string>; index: WikiIndexItem[] }
  export default content
}

declare module 'virtual:exam-pages' {
  /** Every root `Exam *.md` syllabus page, keyed by file name. */
  const examPages: Record<string, string>
  export default examPages
}

declare module 'virtual:store-books' {
  import type { StoreBook } from '@/lib/storeBooks'
  /** The textbooks a candidate buys, with the exams that assign them — see lib/storeBooks.ts. */
  const books: StoreBook[]
  export default books
}

declare module 'virtual:seo-pages' {
  import type { SeoPage } from '@/lib/seo'
  /** Every exam, concept and resource page, described — see lib/seo.ts. */
  const pages: SeoPage[]
  export default pages
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

declare module 'virtual:resource-timeline' {
  import type { TimelineRawEntry } from '@/lib/resourceTimeline'
  const timeline: TimelineRawEntry[]
  export default timeline
}
