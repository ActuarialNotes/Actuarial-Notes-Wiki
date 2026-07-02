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
