/**
 * Which routes carry the nav button in their own top bar.
 *
 * Below `lg` every page needs a way into the sidebar drawer, and there are two
 * ways to give it one. A page that already pins a bar to the top of the
 * viewport — a floating search bar — puts the hamburger in that bar, on the
 * same line as the search input, so the phone spends one 3.5rem row on chrome
 * instead of two. Every other page gets the app header (`Sidebar.tsx`), which
 * is that row plus the wordmark.
 *
 * This is the one place that says which is which: `App.tsx` reads it to decide
 * whether the content reserves room for a header, and `Sidebar.tsx` reads it to
 * decide whether to render one. Add a route here only when its page renders a
 * bar that hosts `MobileNavButton` — the two have to move together or the page
 * ends up with two hamburgers, or none.
 */
export function pageHostsNavButton(pathname: string): boolean {
  // The quiz builder (QuizFloatingSearch) — `/` exactly, nothing below it.
  if (pathname === '/') return true
  // Today (its own top row, beside the exam) and Flashcards (FlashcardsSearchBar) —
  // both exactly, nothing below them.
  if (pathname === '/dashboard') return true
  // Practice's own screens draw their top row themselves: the way back to
  // Practice, which is where the navigation button is.
  if (pathname === '/flashcards' || pathname === '/papers' || pathname === '/search') return true
  // A project attempt (ProjectTopBar) — every page *under* the Projects tab.
  // The tab's own list of briefs is a plain page under the app header.
  if (pathname.startsWith('/project/')) return true
  // The Concept Craft board (its own top bar), and the topic links that open it.
  if (isUnder(pathname, '/craft')) return true
  // The Shop (StoreSearchBar) — `/store` exactly; the Gem Shop under it is a
  // plain page under the app header.
  if (pathname === '/store') return true
  // The Tools tab (ToolsSearchBar) — the catalogue and every tool under it.
  if (isUnder(pathname, '/tools')) return true
  // Workflows — the library's bar and a board's header (WorkflowBuilder).
  if (isUnder(pathname, '/workflows')) return true
  // Data Sources (CoworkTopBar, or a table's ToolsSearchBar) — every page under it.
  if (isUnder(pathname, '/data-sources')) return true
  // The wiki (WikiFloatingSearch) and the flag-gated research tab
  // (ResearchTopSearch) — each of which bars every page under them.
  return isUnder(pathname, '/wiki') || isUnder(pathname, '/research')
}

/**
 * The session (docs/redesign-spec.md §5): a quiz and its results. The app
 * header and the sidebar are hidden for the whole of it, on every width; the
 * question screen's own top row has the way out.
 */
export function isSessionRoute(pathname: string): boolean {
  return pathname === '/quiz' || pathname === '/review'
}

function isUnder(pathname: string, route: string): boolean {
  return pathname === route || pathname.startsWith(`${route}/`)
}
