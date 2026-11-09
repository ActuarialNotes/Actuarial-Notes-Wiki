import type { Config } from 'tailwindcss'
import app from './tailwind.config'

// Quiz Battle's screens (src/components/battle/, the Deck under deck/, and
// pages/Battle.tsx) are styled with the app's own Tailwind theme, but their
// utilities are generated into the battle page's lazy stylesheet
// (src/components/battle/battle.css, `@config` this file) rather than into the
// first-paint CSS — the app's config leaves those files out. Only the
// utilities: the base layer (preflight, the `--tw-*` defaults) is the app's,
// already on the page.
//
// They are scoped under `.battle-css` (the element pages/Battle.tsx wraps the
// page in, and every sheet the battle portals to the body). A second
// stylesheet of utilities would otherwise re-declare, say, `.hidden` after
// index.css's `lg:flex`, and win wherever the two meet — the sidebar
// included. Scoped, they reach only the battle's own elements.
const config: Config = {
  ...app,
  content: ['./src/components/battle/**/*.{ts,tsx}', './src/pages/Battle.tsx'],
  important: '.battle-css',
}

export default config
