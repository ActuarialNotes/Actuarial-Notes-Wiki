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

/**
 * Learner mastery analytics (roadmap P2.5) — turns signals the learning engine
 * already computes into an actionable study surface. When ON, a collapsible
 * "Mastery insights" card appears on the Dashboard with three sections
 * (lib/masteryAnalytics.ts): concepts about to decay, a predicted
 * exam-readiness-by-date curve, and a weakest-topics ranking whose rows
 * deep-link into a targeted quiz. It reads only data the Dashboard already
 * loads (mastery records + syllabus) — no new fetch. The pure analytics engine
 * and its tests stay compiled either way; the `: boolean` annotation keeps both
 * branches of every gate type-checked (see the flags above). Gate it off to
 * dark-launch or roll back independently of the other engagement surfaces.
 */
export const MASTERY_ANALYTICS_ENABLED: boolean = true

/**
 * Weekly XP leagues (roadmap P4.1) — opt-in, privacy-first light social. When
 * ON, a collapsible "League" card appears on the Dashboard (signed-in only)
 * and a matching opt-in/out section appears in Settings. Joining places the
 * student in a cohort of up to 30 at their tier for the current UTC week,
 * ranked by weekly XP; at week end the top of the cohort promotes a tier and
 * the bottom relegates (Duolingo-style — pure math in lib/leagues.ts, the
 * server-authoritative ranking/rollover in supabase/migrations/20260710_leagues.sql,
 * design in docs/leagues.md).
 *
 * Privacy: nothing is shared until the student explicitly joins; joining
 * snapshots only their display name, avatar, and weekly XP for cohort-mates to
 * see (never user ids or emails — board reads are RPC-only), and leaving
 * deletes the shared copies. The engine and its tests stay compiled either
 * way; the `: boolean` annotation keeps both branches of every gate
 * type-checked (see the flags above). Gate it off to dark-launch or roll back
 * independently of the other engagement surfaces.
 */
export const LEAGUES_ENABLED: boolean = true

/**
 * Daily study-plan email — an opt-in morning email listing what the study plan
 * has scheduled for today. When ON, an "Email" card appears in Settings
 * (signed-in only) with the opt-in toggle and a local send-time picker,
 * persisted to the user_email_prefs table. The email itself is sent
 * server-side by the daily-plan-email edge function on an hourly pg_cron
 * schedule (see docs/daily-plan-email.md) — the cron keeps running either
 * way, but with no way to opt in nobody has a row to send to, so gating the
 * card effectively gates the feature. The pure derivation core
 * (lib/dailyEmail.ts) and its tests stay compiled either way; the `: boolean`
 * annotation keeps both branches of every gate type-checked (see the flags
 * above).
 */
export const DAILY_PLAN_EMAIL_ENABLED: boolean = true

/**
 * Fix-mistakes card — surfaces the questions a learner most recently got wrong
 * and, for each, ranks the concept(s) most likely to blame (weighted by the
 * learner's miss-rate on that concept plus its current mastery level — see
 * lib/recentMistakes.ts). When ON, a compact card appears on the Dashboard
 * (signed-in only) naming the concept behind the latest miss, with an orange
 * count of what's still outstanding and how many misses have since been
 * corrected; tapping it opens MistakesReviewModal — the missed questions
 * themselves, one at a time, answered in place (the quiz's own QuestionCard)
 * and paged with Previous/Next, in the concept popup's resizable bottom panel. Answers are banked on close through
 * recordReviewAnswers, so a question corrected there drops off the list. It
 * reads only data the Dashboard already loads
 * plus the learner's question-response history — no new heavy fetch. The pure engine and its tests
 * stay compiled either way; the `: boolean` annotation keeps both branches of
 * every gate type-checked (see the flags above). Gate it off to dark-launch or
 * roll back independently of the other surfaces.
 */
export const MISTAKES_REVIEW_ENABLED: boolean = true

/**
 * Guided onboarding tour — currently OFF.
 *
 * The 17-step walkthrough (components/OnboardingTour.tsx, driven by the
 * zustand store in hooks/useOnboardingTour.ts) spotlights controls across the
 * study guide, concept popup, flashcards and quiz. Its cross-page step
 * choreography is fragile enough to misfire — spotlighting the wrong element,
 * or stranding a step whose target never appears — so the tour is gated off
 * pending a simpler rebuild.
 *
 * When OFF, two things disappear: the `<OnboardingTour />` mount in App.tsx
 * (so nothing auto-launches for a first-time visitor and the collapsed
 * bottom-right launcher never appears) and the "Take the tour" replay row in
 * the Settings → Support card.
 *
 * Everything behind the flag is intentionally left intact — the component, the
 * store, its localStorage keys, and the `data-tour` target attributes sprinkled
 * across the app (they're inert markers and cost nothing while the tour is
 * off). Re-enabling is a one-line change: set this to `true`. The `: boolean`
 * annotation keeps both branches of every gate type-checked (see the flags
 * above).
 */
export const TOUR_ENABLED: boolean = false

/**
 * VERIFY — the fact-check layer's student-facing surfaces. ON.
 *
 * "Fact Check" is what this is called on screen; VERIFY is the vault-side
 * toolchain that feeds it. When ON, three things appear: the fact-check badge
 * on questions and wiki pages (`components/FactCheckBadge.tsx`), the "Fact
 * Check" item in a concept or resource page's action menu, and the "Report an
 * issue" affordance that files into `content_reports`.
 *
 * Note what the badge says on a freshly backfilled vault: **Not fact checked**,
 * on almost every page. That is the honest state and the reason to ship it on —
 * a trust signal that only ever appears once something is green is not a trust
 * signal, it is marketing. Showing the work includes showing how much of it is
 * still to do.
 *
 * The quiz-side exclusion of questions with an open critical finding is *not*
 * behind this flag — it is a correctness guard, not a surface, and it stays on
 * with its own Settings toggle (`hooks/useShowFlaggedQuestions.ts`).
 *
 * See docs/verification.md.
 */
export const FACT_CHECK_UI_ENABLED: boolean = true
