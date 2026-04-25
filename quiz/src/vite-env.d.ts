/// <reference types="vite/client" />

declare module 'virtual:wiki-content' {
  import type { WikiIndexItem } from '@/lib/wikiIndex'
  const content: { files: Record<string, string>; index: WikiIndexItem[] }
  export default content
}
