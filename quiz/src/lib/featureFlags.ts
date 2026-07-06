// Centralized, build-time feature flags for the quiz app.
//
// These are plain module constants (not env vars) so they tree-shake cleanly
// and are trivially greppable. To flip a feature, change the value here — no
// other file needs to change. Each flag is annotated `: boolean` on purpose:
// it keeps TypeScript from narrowing the value to a literal, so both branches
// of every gate stay type-checked and neither the compiler nor the linter
// reports the disabled branch as dead/unreachable code.

/**
 * Research "Ask AI" assistant — currently OFF.
 *
 * The Research tab ships as a pure markdown/UX workflow for now: search the
 * corpus, browse the resource timeline, and collect sources into projects —
 * with no AI calls anywhere. This flag gates *every* AI surface so the tab
 * leaves no visible trace of an assistant while it's off:
 *
 *   • The "Ask AI" button in the corpus search bar
 *     (components/research/ResearchTopSearch.tsx) and the grounded-answer panel
 *     it opens (components/research/AiAnswerPanel.tsx via
 *     hooks/useResearchQuery.ts → POST /api/research).
 *   • The project-level "Ask" CTA and the FAQ / Research Report / Actuarial
 *     Justification views built from its answers
 *     (components/research/ProjectFaq.tsx, AskDialog.tsx, CompiledView.tsx via
 *     hooks/useProjectQuestions.ts → POST /api/research-ask).
 *   • The "Review agents" department picker and the agents badge, which exist
 *     only to steer those AI answers (DepartmentsField in
 *     components/research/ProjectScopeFields.tsx; the badge in
 *     pages/Research/ProjectsView.tsx).
 *
 * Everything behind the flag is intentionally left intact — the React code,
 * the hooks, the Supabase tables (research_project_questions), and the
 * serverless endpoints (api/research.js, api/research-ask.js). Re-enabling is a
 * one-line change: set this to `true` and the full assistant returns with no
 * other edits. See docs/research-ai-disabled.md for the rationale and the
 * complete re-enable checklist.
 */
export const RESEARCH_AI_ENABLED: boolean = false

/**
 * Research tab (the whole surface, not just the AI assistant) — currently OFF.
 *
 * The nav no longer shows a "Research" entry, and the `/research` route
 * redirects to the wiki. Because "Study Guides" only has one child left when
 * Research is hidden, the sidebar/bottom-nav also drop the nested
 * group/panel and render a single flat "Study Guides" link — see the
 * `RESEARCH_TAB_ENABLED` checks in components/Sidebar.tsx and
 * components/BottomNav.tsx, and the `/research` route in App.tsx.
 *
 * All the underlying code, routes, and Supabase tables are left intact.
 * Re-enabling is a one-line change: set this to `true`.
 */
export const RESEARCH_TAB_ENABLED: boolean = false

/**
 * Daily streak system (roadmap P1.1) — the first piece of the retention loop.
 *
 * When ON, a flame streak badge appears in the Sidebar, BottomNav, and Dashboard
 * and a day of study extends the streak (see lib/streak.ts / lib/streakStore.ts).
 * Gated so the surface can be dark-launched or rolled back independently; the
 * pure streak engine and its tests stay compiled either way. The `: boolean`
 * annotation keeps both branches type-checked (see the flags above).
 */
export const STREAK_ENABLED: boolean = true

/**
 * Daily goal + XP system (roadmap P1.2) — the second piece of the retention loop.
 *
 * When ON, completing a quiz awards XP (weighted toward hard and decaying
 * concepts — see lib/xp.ts), and a configurable daily-goal ring appears on the
 * Dashboard with a matching goal picker in Settings. The pure XP/goal engine and
 * its tests stay compiled either way; the `: boolean` annotation keeps both
 * branches of every gate type-checked (see the flags above). Gate it off to
 * dark-launch or roll back independently of the streak.
 */
export const XP_ENABLED: boolean = true

/**
 * Daily quests (roadmap P1.4) — the piece that turns the flat gem economy into
 * a loop. When ON, a personalized board of 3 daily quests (authored in
 * data/quests.ts, generated/evaluated by the pure lib/quests.ts engine —
 * revive quests only when concepts are actually forgotten, a focus quest from
 * today's study plan) appears on the Dashboard, advances as quizzes complete,
 * and pays gems + XP when the student collects a cleared quest
 * (lib/questStore.ts; a collect prompt also pops after the quiz that cleared
 * it). The engine and its tests stay compiled either way; the `: boolean`
 * annotation keeps both branches of every gate type-checked (see the flags
 * above). Gate it off to dark-launch or roll back independently of streaks/XP.
 */
export const QUESTS_ENABLED: boolean = true
