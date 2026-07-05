# Development Roadmap — Actuarial Notes Wiki

_Last updated: 2026-07-05_

This roadmap turns the current product into a best-in-class **gamified learning app for
actuarial students**. It is grounded in a detailed review of the codebase as it stands
today, and it is ordered so that foundational safety nets come before big feature bets.

> Read `CLAUDE.md` first for the map of the repo. This document assumes that context and
> focuses on _where we're going_, not _what exists_.

---

## 1. Where we are today

The product is already substantial and, in several areas, genuinely sophisticated.

**Strengths worth protecting**

- **A real learning engine.** The 5-state mastery ladder with Ebbinghaus-style decay
  (`lib/mastery.ts`, `docs/concept-learning-progression.md`), backward-scheduled study
  plans (`lib/studyPlan.ts`), and syllabus-weighted readiness scoring (`lib/readiness.ts`)
  are the true moat. Most competitors have gamification _or_ a learning model — this has
  both.
- **A large, structured content vault.** ~900+ questions across `exam-p`, `exam-fm`,
  `exam-mas-i`, and `exam-5`, plus concept and exam wiki pages with a canonical
  topic→concept→objective ontology (`scripts/ontology_map.py`).
- **Working monetization + sync plumbing.** Supabase auth/sync, Stripe checkout/portal/
  webhook edge functions, a gems economy, cosmetics, characters/avatars, designation
  banners, and a Store.
- **A mostly-pure, testable `lib/` layer.** 293 tests across 17 files concentrate on the
  trickiest logic (mastery, study plan, parsing, ontology).
- **A large finished-but-parked feature.** The Research tab (Canadian P&C corpus + AI
  "Ask") is fully built behind two feature flags — optionality, not dead weight.

**Gaps that block "best-in-class" (each addressed below)**

| # | Gap | Evidence |
|---|-----|----------|
| G1 | **No CI for the app.** The only workflow deploys Supabase functions. Lint, typecheck, build, and 293 tests never gate a PR. | `.github/workflows/deploy-functions.yml` is the only workflow. |
| G2 | **No error monitoring or funnel analytics.** Only raw `gtag` events; crashes and drop-off are invisible. | `lib/analytics.ts`, `hooks/usePageTracking.ts` are the only instrumentation. |
| G3 | **The core retention loop is missing.** No daily **streak**, no **XP**, no **daily goal**, no **leaderboards**, no **reminders**. The only "streak" in code is `incorrect_streak` inside mastery. | grep for `streak\|leaderboard\|xp\|reminder` finds nothing user-facing. |
| G4 | **Thin gem economy.** Gems are awarded on quiz completion and spent in the Store; there are no quests, chests, combos, or daily goals to create a spend/earn loop. | `hooks/useGems.ts`, `lib/dailyProgressStore.ts`. |
| G5 | **God components.** `Flashcards.tsx` (2,841 lines), `ReadinessCard.tsx` (1,664), `Settings.tsx` (1,292), `Landing.tsx` (1,070) concentrate risk and slow iteration. | `wc -l` on `src/pages` / `src/components`. |
| G6 | **No E2E tests** despite Playwright being available in the environment. Critical flows (auth → quiz → level-up → collect → store purchase) are unguarded. | No `*.spec.ts` / Playwright config in `quiz/`. |
| G7 | **Weak comprehension-check gate.** The flashcard-collection gate question is derived from the concept's own definition, so it's guessable. | Documented TODO in `docs/flashcard-collection.md`. |
| G8 | **Content pipeline is manual.** Bulk content lives behind one-off Python scripts with no validation/CI, so drift (bad frontmatter, orphan concepts) is caught late. | `scripts/*.py`, no schema check in CI. |

---

## 2. Guiding principles

1. **Protect the learning engine.** Every gamification feature must reinforce spaced
   repetition, not fight it. Rewards should fire for _behaviour that improves retention_
   (revisiting a decaying concept, clearing a hard question), not raw volume.
2. **Foundations before features.** Ship CI, monitoring, and E2E coverage _before_ the big
   engagement bets, so we can move fast without breaking the streak/economy math.
3. **Small, pure, tested modules.** Keep new logic in `lib/` as pure functions with vitest
   coverage; keep React thin. Split god components as we touch them.
4. **Flag-gate every risky launch.** Follow the established `featureFlags.ts` pattern so new
   surfaces can ship dark and roll out gradually.
5. **Measure everything that matters.** No engagement feature ships without an event that
   tells us whether it worked (D1/D7 retention, streak length, quiz completion).

---

## 3. Phased roadmap

Phases are ordered by dependency, not calendar. Each lists **exit criteria** so "done" is
unambiguous.

### Phase 0 — Foundations & safety nets (do first)

_Goal: make the codebase safe to iterate on quickly._

- **P0.1 — App CI pipeline.** Add `.github/workflows/ci.yml` running `npm ci`,
  `npm run lint`, `npm run build` (tsc), and `npm test` on every PR touching `quiz/**`.
  Make it required. This is the single highest-leverage change in the whole roadmap.
- **P0.2 — Content-validation CI.** A lightweight check (reuse `scripts/`) that validates
  question frontmatter (required keys, valid `difficulty`/`exam`), flags orphan wiki links,
  and regenerates `Concepts Without Review Questions.md` so drift fails the PR (addresses G8).
- **P0.3 — Error monitoring.** Wire Sentry (or equivalent) into `main.tsx` and the
  `ErrorBoundary` in `App.tsx`; capture unhandled rejections and Supabase errors. Source
  maps in the Vite build (addresses G2).
- **P0.4 — Structured product analytics.** Extend `lib/analytics.ts` into a typed event
  layer (PostHog or GA4 funnels) covering the activation funnel: `signup → first_quiz →
  first_correct → concept_collected → day2_return`. This is the instrument panel for every
  later phase (addresses G2).
- **P0.5 — E2E smoke suite.** Add Playwright with 3–5 critical-path specs (auth, run a quiz
  and answer, collect a card, buy a cosmetic, load the wiki). Run in CI (addresses G6).

**Exit criteria:** every PR is gated by lint + typecheck + unit + E2E smoke + content
validation; crashes and the activation funnel are visible in a dashboard.

### Phase 1 — The core engagement loop (the biggest bet)

_Goal: give students a reason to come back **every day**. This is what makes it a
"gamified learning app" rather than a quiz tool with cosmetics._

- **P1.1 — Daily streak system.** A `user_streaks` table + `lib/streak.ts` (pure, tested):
  current streak, longest streak, freeze/repair mechanics, timezone-correct day boundaries.
  Surface it in the Sidebar/BottomNav and Dashboard. Reuse `daily_completions` as the
  activity signal (addresses G3).
- **P1.2 — Daily goal + XP.** A configurable daily goal (e.g. "answer 10 questions" / "5
  minutes"), an XP curve, and a visible daily progress ring. XP should weight _hard_ and
  _decaying_ concepts higher so the reward aligns with the learning model (addresses G3, G4).
- **P1.3 — Streak-aware reminders.** Web push (PWA) and optional email nudges — "your
  streak resets in 3 hours". Requires the PWA work in P1.6. Respect quiet hours; make it
  opt-in in `Settings` (addresses G3).
- **P1.4 — Quests / daily challenges.** 2–3 rotating daily quests ("clear 3 hard
  questions", "revisit a Level-2 concept before it decays") that pay gems/XP. This is what
  turns the flat gem economy into a loop (addresses G4). Author quests as data (like
  `data/mnemonics.ts`), keep the evaluator pure in `lib/`.
- **P1.5 — Fix the collection gate (G7).** Author genuine comprehension-check questions per
  concept (a dedicated skill exists: `flashcard-comprehension-check`) stored alongside
  content, replacing the definition-derived question. Then implement the documented
  **collect-then-quiz** flow so New concepts unlock before their quiz questions.
- **P1.6 — PWA / installability & offline.** Service worker + manifest; make the existing
  `localMasteryStore` / `dailyProgressStore` offline fallbacks first-class so a session on
  the subway still counts toward the streak.

**Exit criteria:** D1 and D7 retention measurably improve; a returning user sees streak +
daily goal + at least one quest on open; reminders demonstrably bring users back.

### Phase 2 — Learning depth & content quality

_Goal: make the studying itself better, which is the real reason students stay._

- **P2.1 — Adjustable spaced-repetition tuning.** Expose decay/interval parameters
  (currently constants in `mastery.ts`) as a tunable, per-exam config; A/B the intervals
  against retention data now that P0.4 exists.
- **P2.2 — Exam simulation mode.** Timed, weighted mock exams that mirror real sitting
  structure (durations/weights already partly modeled in `data/examSittings.ts`), with a
  post-exam readiness delta and a "what to review next" hand-off to the study plan.
- **P2.3 — Question quality loop.** In-app "report this question" + an explanation-quality
  signal, feeding a review queue. Close the loop the README already promises (human review
  of AI content).
- **P2.4 — Content coverage expansion.** Fill gaps flagged by
  `Concepts Without Review Questions.md`; extend banks toward the CAS upper exams (6/7/8/9)
  whose wiki pages already exist but have thin/no question banks.
- **P2.5 — Richer mastery analytics for the learner.** Build on `ReadinessCard` (after
  splitting it, P3.1): "concepts about to decay", predicted exam-readiness-by-date, and a
  weakest-topics view that deep-links into a targeted quiz.

**Exit criteria:** measurable lift in per-concept retention; every active exam has adequate
question coverage; a question-quality feedback loop is live.

### Phase 3 — Maintainability & scale (continuous, front-loaded here)

_Goal: keep velocity high as the surface grows. Do the worst offenders early, then treat as
an ongoing tax._

- **P3.1 — Decompose god components (G5).** Split `Flashcards.tsx` (2,841 lines) into
  view/logic/subcomponents with extracted hooks; then `ReadinessCard`, `Settings`,
  `Landing`. Extract pure logic into `lib/` with tests as you go. Do these opportunistically
  whenever a feature touches the file, plus one dedicated pass on `Flashcards.tsx`.
- **P3.2 — Design-system consolidation.** Codify `components/ui/` primitives and shared
  tokens (colors already in `lib/colorThemes.ts` / `examColors.ts`); document a11y-checked
  patterns so new gamification surfaces are consistent and accessible.
- **P3.3 — Performance budget.** Track bundle size in CI, lazy-load heavy routes (already
  done for wiki/research — extend to Store/Flashcards), and set an LCP/INP budget verified
  in the E2E run.
- **P3.4 — Accessibility pass.** Keyboard + screen-reader audit of the core loop
  (quiz, collect modal, store); gamification animations must respect
  `prefers-reduced-motion`.

**Exit criteria:** no single component over ~600 lines on the core path; bundle and Core
Web Vitals budgets enforced in CI; core flow passes an a11y audit.

### Phase 4 — Growth, social & monetization

_Goal: turn engaged users into a growing, paying base — only after the loop (Phase 1) and
depth (Phase 2) are proven._

- **P4.1 — Leaderboards & light social.** Opt-in weekly XP leagues (Duolingo-style
  promotion/relegation) and/or study-group leaderboards. Keep it privacy-first and optional
  (addresses G3).
- **P4.2 — Referrals.** Gem/premium-day rewards for inviting a study buddy; instrument
  virality (K-factor) via the P0.4 analytics.
- **P4.3 — Monetization depth.** Revisit the free/premium boundary now that the loop exists:
  premium study-plan features, cosmetics, streak freezes, and exam-simulation packs. The
  Stripe plumbing is already in place — this is packaging, not new infrastructure.
- **P4.4 — Re-enable the Research tab.** Follow `docs/research-ai-disabled.md`'s re-enable
  checklist to light up the parked Canadian P&C corpus + AI "Ask" as a differentiated
  offering for upper-exam candidates. Ship dark, then roll out.

**Exit criteria:** a working referral loop with measured K-factor; a premium tier whose
value is tied to the engagement loop; a data-backed decision on Research reactivation.

---

## 4. Cross-cutting best practices (adopt now, apply throughout)

- **Branch/PR hygiene.** Keep the repo's existing habit: small, focused, imperative-titled
  PRs on `claude/<slug>` branches. With P0.1, every one is now gated by CI.
- **Every feature ships flag-gated + instrumented + tested.** No engagement feature merges
  without a pure `lib/` module + tests, a feature flag, and an analytics event proving it
  works.
- **Migrations stay forward-only and dated** (`YYYYMMDD_description.sql`), matching the
  existing convention; new gamification tables (`user_streaks`, `user_quests`, `user_xp`)
  follow suit with RLS from day one.
- **Keep parked code compiling.** Don't "clean up" flag-gated Research code as dead — both
  branches must typecheck (the `: boolean` annotation pattern in `featureFlags.ts`).
- **Human-in-the-loop content.** Per the README, no AI-authored concept/exam content ships
  without review; the P2.3 quality loop operationalizes this.

---

## 5. Success metrics

Instrument these in Phase 0 so later phases are judged on evidence, not vibes.

| Category | Metric | Why |
|----------|--------|-----|
| Activation | % new users completing a first quiz on day 0 | Proves onboarding works |
| Retention | D1 / D7 / D30 return rate | The core health metric; Phase 1's target |
| Engagement | Median streak length; daily-goal completion rate | Measures the loop directly |
| Learning | Per-concept retention (correct on revisit after decay window) | Proves the engine, not just usage |
| Economy | Gem earn/spend balance; quest completion rate | Detects a broken/inflationary economy |
| Reliability | Crash-free session rate | Gated by P0.3 monitoring |
| Monetization | Trial→paid conversion; premium retention | Judges Phase 4 packaging |

---

## 6. Risk register

- **Gamification vs. learning integrity.** Volume-based rewards can encourage grinding easy
  questions. _Mitigation:_ weight XP/quests toward hard + decaying concepts (P1.2/P1.4);
  watch per-concept retention (P2), not just minutes.
- **Streak burnout / dark patterns.** Aggressive reminders erode trust. _Mitigation:_
  opt-in reminders, streak freezes, quiet hours (P1.3).
- **Refactor regressions.** Splitting `Flashcards.tsx` risks breaking the collect flow.
  _Mitigation:_ land E2E coverage (P0.5) _before_ the decomposition (P3.1).
- **Economy inflation.** Adding quests/chests without modeling sinks devalues gems.
  _Mitigation:_ model earn/spend before launch; monitor the balance metric.
- **Scope creep from Research.** It's a big surface. _Mitigation:_ keep it parked until
  Phase 4 and gate reactivation on the depth work landing first.

---

## 7. Suggested immediate next steps

1. **P0.1** — App CI (`ci.yml`): lint + tsc + `vitest run` on PRs. _Highest leverage._
2. **P0.3 / P0.4** — Sentry + a typed analytics/funnel layer.
3. **P1.1** — Ship the daily **streak** as the first visible piece of the retention loop.

These three, in order, unlock everything else: CI makes fast iteration safe, monitoring +
analytics make it measurable, and the streak is the first feature that turns the app into a
daily habit.
