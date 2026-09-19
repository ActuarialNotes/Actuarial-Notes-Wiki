/**
 * Which routes carry the nav button in their own top bar.
 *
 * Below `lg` every page needs a way into the sidebar drawer, and there are two
 * ways to give it one. A page that already pins a bar to the top of the
 * viewport — a floating search bar — puts the hamburger in that bar, on the
 * same line as the search input, so the phone spends one 3.5rem row on chrome
 * instead of two. Every other page gets the app header (`Sidebar.tsx`), which
 * is that row plus the wordmark and the in-progress exam pills.
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
  // The wiki (WikiFloatingSearch) and the flag-gated research tab
  // (ResearchTopSearch), both of which bar every page under them.
  return isUnder(pathname, '/wiki') || isUnder(pathname, '/research')
}

function isUnder(pathname: string, route: string): boolean {
  return pathname === route || pathname.startsWith(`${route}/`)
}
