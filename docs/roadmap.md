# Development Roadmap — Actuarial Notes Wiki

_Last updated: 2026-07-11_

This roadmap turns the current product into a best-in-class **gamified learning app for
actuarial students**. It is grounded in a detailed review of the codebase as it stands
today, and it is ordered so that foundational safety nets come before big feature bets.

> Read `CLAUDE.md` first for the map of the repo. This document assumes that context and
> focuses on _where we're going_, not _what exists_.

**What changed in this revision (2026-07-11).** The first two phases have largely
shipped: CI + content validation + error monitoring + typed analytics + E2E smoke
(all of Phase 0), and the core engagement loop — streaks, XP/daily goals, quests —
plus mastery analytics (P2.5) and weekly leagues (P4.1). With the loop built, the
roadmap's center of gravity shifts from _engagement mechanics_ to _learning quality_:
the remaining work is re-framed around learning-science best practices (see the new
§2.2), and Phase 2 gains three pedagogy-driven items (interleaving, confidence
calibration, an error-review loop). Phase 3's maintainability debt is now the oldest
unaddressed risk and is called out as such.

---

## 1. Where we are today

The product is already substantial and, in several areas, genuinely sophisticated.

**Strengths worth protecting**

- **A real learning engine.** The 5-state mastery ladder with Ebbinghaus-style decay
  (`lib/mastery.ts`, `docs/concept-learning-progression.md`), backward-scheduled study
  plans (`lib/studyPlan.ts`), and syllabus-weighted readiness scoring (`lib/readiness.ts`)
  are the true moat. Most competitors have gamification _or_ a learning model — this has
  both.
- **A complete, learning-aligned engagement loop** (new since the last revision).
  Daily streaks with freeze/repair mechanics (`lib/streak.ts`), XP weighted toward hard
  and decaying concepts with configurable daily goals (`lib/xp.ts`), a personalized
  daily-quest board that pays the gem economy (`lib/quests.ts` + `data/quests.ts`), and
  opt-in weekly XP leagues (`lib/leagues.ts`, `docs/leagues.md`) — every reward fires for
  behaviour the mastery model says improves retention, not raw volume.
- **A large, structured content vault.** ~915 questions across `exam-p` (376), `exam-fm`
  (350), `exam-mas-i` (90), and `exam-5` (99), plus concept and exam wiki pages with a
  canonical topic→concept→objective ontology (`scripts/ontology_map.py`), now gated by
  content-validation CI.
- **Working monetization + sync plumbing.** Supabase auth/sync, Stripe checkout/portal/
  webhook edge functions, a gems economy, cosmetics, characters/avatars, designation
  banners, and a Store.
- **A mostly-pure, testable `lib/` layer.** ~435 tests across 25 files concentrate on the
  trickiest logic (mastery, study plan, parsing, ontology, and now all four gamification
  engines), with a 6-spec Playwright smoke suite covering the signed-out critical paths.
- **A large finished-but-parked feature.** The Research tab (Canadian P&C corpus + AI
  "Ask") is fully built behind two feature flags — optionality, not dead weight.

### 1.1 Gap scorecard

The original review identified eight gaps. Most are closed; the table is kept as the
scorecard of record.

| # | Gap | Status |
|---|-----|--------|
| G1 | No CI for the app | ✅ **Closed.** `.github/workflows/ci.yml` gates every `quiz/**` PR on lint, ~435 unit tests, `tsc` + production build, and the Playwright E2E smoke suite. |
| G2 | No error monitoring or funnel analytics | ✅ **Closed.** `lib/errorMonitoring.ts` (dependency-free capture → pluggable sinks, source maps on) + `lib/analytics.ts` (typed event catalogue) + `lib/funnel.ts` (activation funnel: `signup → first_quiz → first_correct → concept_collected → day2_return`). |
| G3 | Core retention loop missing (streak/XP/goal/leaderboards/reminders) | 🟡 **Mostly closed.** Streaks (P1.1), XP + daily goal (P1.2), quests (P1.4), and leagues (P4.1) are live behind flags. **Reminders (P1.3) remain open** — the loop still relies on the user remembering to show up. |
| G4 | Thin gem economy | ✅ **Closed.** Daily quests are the earn loop (user-claimed, never auto-paid); the Store is the sink; earn/spend events are instrumented so the balance can be watched. |
| G5 | God components | ❌ **Open — and growing.** `Flashcards.tsx` 2,836 lines, `ReadinessCard.tsx` **grew to 1,824**, `Settings.tsx` 1,323, `Landing.tsx` 1,162. The E2E safety net P3.1 was waiting on now exists; this is the oldest unaddressed risk. |
| G6 | No E2E tests | ✅ **Closed.** `quiz/e2e/` — auth, quiz, collect, store, wiki, home specs — runs in CI against a built preview with inert Supabase placeholders. |
| G7 | Weak comprehension-check gate | 🟡 **Half closed.** `comprehension-checks/<exam-id>/*.md` holds 183 authored misconception-fork questions (Exam P/FM/MAS-I, one file per concept) and the collect-then-quiz flow shipped (`PreQuizCollectGate`). Concepts without an authored check still fall back to the guessable masked-definition question — the Exam 5 batch remains (P1.5). |
| G8 | Manual content pipeline | ✅ **Closed.** `content-validation.yml` + `scripts/validate_content.py` fail the PR on bad frontmatter, duplicate ids, or answer-key drift. |

---

## 2. Guiding principles

### 2.1 Engineering principles (unchanged, proven out)

1. **Protect the learning engine.** Every gamification feature must reinforce spaced
   repetition, not fight it. Rewards should fire for _behaviour that improves retention_
   (revisiting a decaying concept, clearing a hard question), not raw volume.
2. **Foundations before features.** Ship CI, monitoring, and E2E coverage _before_ the big
   engagement bets. _(Done — and it worked: the four gamification engines shipped in quick
   succession on top of that safety net, each as a pure tested module behind a flag.)_
3. **Small, pure, tested modules.** Keep new logic in `lib/` as pure functions with vitest
   coverage; keep React thin. Split god components as we touch them.
4. **Flag-gate every risky launch.** Follow the established `featureFlags.ts` pattern so new
   surfaces can ship dark and roll out gradually.
5. **Measure everything that matters.** No engagement feature ships without an event that
   tells us whether it worked (D1/D7 retention, streak length, quiz completion).

### 2.2 Learning-science principles (new — the lens for everything that remains)

With the engagement loop built, the differentiator is no longer _that_ students come back
daily but _what the daily session does to their exam readiness_. The remaining roadmap is
designed against the strongest findings in learning science and gamified-learning
research:

1. **Retrieval practice beats re-reading (the testing effect).** Already the product's
   spine — quizzes and flashcards are retrieval, not review. Protect it: never add a
   passive surface (video, summary reading) that awards the same XP as retrieval.
2. **Spacing and desirable difficulty.** The decay model already forces spaced revisits,
   and XP already pays more for hard + decaying concepts. The open gap is **interleaving**
   (P2.6): sessions currently block by concept/topic, but mixing related topics within a
   session measurably improves discrimination between similar concepts — exactly the skill
   actuarial exams test (which distribution? which reserving method?).
3. **Metacognitive calibration.** Exam readiness is as much about _knowing what you know_
   as knowing it. Students are systematically overconfident; a confidence prompt before
   revealing the answer, plus a calibration view (confidence vs. correctness), turns every
   question into calibration training (P2.7). This also sharpens the readiness score.
4. **Errors are the highest-value learning events.** A missed question is worth more than
   ten correct ones — _if_ it gets elaborative feedback and a delayed re-test. The
   comprehension-check bank already annotates which misconception each distractor targets;
   the question bank should close the same loop with an error-review queue (P2.8).
5. **Scaffold novices, fade for experts (the expertise-reversal effect).** A student's
   first contact with a concept should be a worked example / the concept card (the collect
   gate is this), not a cold retrieval attempt. The collect-then-quiz flow shipped;
   finishing the authored comprehension checks (P1.5) completes the scaffold.
6. **Self-Determination Theory as the gamification rubric.** Sustainable motivation needs
   **competence** (mastery ladder, XP levels, readiness score), **autonomy** (configurable
   daily goals, user-claimed quest rewards, opt-in leagues), and **relatedness** (leagues).
   The shipped mechanics already respect all three — keep it that way. Specifically:
   - **Guard against the overjustification effect.** Extrinsic rewards layered on an
     intrinsically motivated activity can crowd out the intrinsic motivation. Gems/XP must
     stay _informational_ (signalling learning progress) rather than _controlling_
     (the reason to study). Watch the quest-completion vs. study-plan-adherence ratio: if
     users start optimizing quests instead of their plan, the quest catalogue needs
     rebalancing, not richer rewards.
   - **Loss-aversion mechanics need compassion.** Streak freezes and same-day repair are
     already built. Reminders (P1.3) must follow the same rule: opt-in, quiet hours, and
     framed as an invitation ("your Level-2 concepts are about to decay") rather than a
     threat ("you'll lose your streak!").
   - **Leaderboards demotivate the bottom half if naively framed.** The shipped leagues
     mitigate this correctly (opt-in, 30-person cohorts, weekly reset, promotion for the
     top rather than shaming the bottom). Any future social surface must clear the same
     bar.
7. **Implementation intentions beat willpower.** "I will study at 7am on the train" works;
   "I'll study more" doesn't. The reminder system (P1.3) should let users pick a study
   time and anchor the nudge to it — that single design choice is what makes reminders a
   pedagogy feature rather than a growth hack.

---

## 3. Phased roadmap

Phases are ordered by dependency, not calendar. Each lists **exit criteria** so "done" is
unambiguous. Status markers: ✅ shipped · 🟡 partial · ⬜ not started.

### Phase 0 — Foundations & safety nets ✅ COMPLETE

_Goal: make the codebase safe to iterate on quickly._

- ✅ **P0.1 — App CI pipeline.** _Shipped:_ `.github/workflows/ci.yml` runs lint,
  ~435 unit tests, `tsc` + production build, and the E2E suite on every PR touching
  `quiz/**`, with concurrency-cancellation and path filtering.
- ✅ **P0.2 — Content-validation CI.** _Shipped:_ `content-validation.yml` +
  `scripts/validate_content.py` reproduce the app parser's contract (frontmatter keys,
  duplicate ids, answer keys) so content drift fails the PR instead of silently dropping
  questions in-app.
- ✅ **P0.3 — Error monitoring.** _Shipped, adapted:_ instead of a Sentry SDK, a
  dependency-free capture layer (`lib/errorMonitoring.ts`) normalizes errors and fans out
  to pluggable sinks (dev console, GA4 `exception`, optional `VITE_ERROR_ENDPOINT`
  beacon), wired into the ErrorBoundary and global handlers; Vite emits source maps.
  Upgrading to a full SDK later is a one-line `registerErrorSink`.
- ✅ **P0.4 — Structured product analytics.** _Shipped:_ `lib/analytics.ts` is a typed
  event catalogue (wrong/missing params are compile errors) covering engagement,
  reliability, and the activation funnel; `lib/funnel.ts` gates funnel events to
  fire-once-per-device. Every gamification engine shipped with its events
  (`streak_extended`, `xp_earned`, `daily_goal_met`, `quest_claimed`, `league_joined`, …).
- ✅ **P0.5 — E2E smoke suite.** _Shipped:_ 6 Playwright specs (auth, quiz, collect,
  store, wiki, home) run in CI against a built preview with inert Supabase placeholders —
  no secrets needed, every asserted flow works signed-out.

**Exit criteria — met:** every PR is gated by lint + typecheck + unit + E2E smoke +
content validation; crashes and the activation funnel are instrumented.

### Phase 1 — The core engagement loop 🟡 MOSTLY SHIPPED

_Goal: give students a reason to come back **every day**._

The loop exists: a returning user sees a streak, a daily-goal ring, and a quest board on
open. What remains is (a) the channel that brings lapsing users back (P1.3 + P1.6) and
(b) finishing the comprehension-check content so the collect scaffold is genuine
everywhere (P1.5).

- ✅ **P1.1 — Daily streak system.** _Shipped:_ pure engine in `lib/streak.ts`
  (timezone-correct day boundaries, Duolingo-style auto-consumed freeze tokens, same-day
  gem repair), persisted via `user_streaks`/localStorage, surfaced in
  Sidebar/BottomNav/Dashboard. Gated by `STREAK_ENABLED`.
- ✅ **P1.2 — Daily goal + XP.** _Shipped:_ `lib/xp.ts` — per-answer XP weighted toward
  hard and decaying concepts (the reward aligns with the learning model), a level curve,
  configurable `DAILY_GOALS` presets; level ring + XP popup on the Dashboard, goal picker
  in Settings. Gated by `XP_ENABLED`.
- ⬜ **P1.3 — Streak-aware reminders.** _Not started; now the highest-value open item in
  this phase._ Web push (needs the P1.6 service worker) and optional email nudges.
  Design per §2.2(6–7): **opt-in only**, quiet hours, user-picked study time
  (implementation intention), and invitation framing driven by real learning state —
  "3 concepts hit their decay window today" — with the streak deadline as secondary
  context, not the headline threat. Instrument reminder→session conversion so we can
  prove it brings users back rather than trains them to ignore notifications.
- ✅ **P1.4 — Quests / daily challenges.** _Shipped:_ personalized 3-quest daily board
  (`lib/quests.ts` + authored catalogue in `data/quests.ts`) — one always-achievable core
  quest, a revive quest only when concepts have actually decayed, a focus quest from
  today's study plan; rewards are **claimed by the user, never auto-paid** (autonomy,
  §2.2.6). Gated by `QUESTS_ENABLED`.
- 🟡 **P1.5 — Fix the collection gate (G7).** _Half shipped:_ the collect-then-quiz flow
  is done (`PreQuizCollectGate` soft-prompts New concepts before a quiz), and
  `comprehension-checks/<exam-id>/*.md` holds 183 authored questions covering the
  **Exam P, FM, and MAS-I** syllabi (one markdown file per concept), each built around a
  misconception fork (the correct answer is never the concept's name or definition — see
  the `flashcard-comprehension-check` skill). **Remaining:** author the Exam 5 batch;
  until then those concepts fall back to the guessable masked-definition question, which
  undermines the scaffold (§2.2.5) exactly where novices need it.
- ⬜ **P1.6 — PWA / installability & offline.** _Not started._ Service worker + manifest;
  make the existing `localMasteryStore` / `dailyProgressStore` offline fallbacks
  first-class so a session on the subway still counts toward the streak. Also the
  prerequisite for P1.3 web push. Pedagogy angle: commute-time micro-sessions are the
  natural spaced-repetition cadence for working actuarial students.

**Exit criteria:** D1 and D7 retention measurably improve _(instrumented, needs
observation window)_; a returning user sees streak + daily goal + at least one quest on
open ✅; reminders demonstrably bring users back ⬜; every collectible concept has an
authored comprehension check ⬜.

### Phase 2 — Learning depth & content quality ← **CURRENT FOCUS**

_Goal: make the studying itself better, which is the real reason students stay. With the
engagement loop live, this phase is now the product's competitive frontier — and every
item here is a direct application of §2.2._

- ⬜ **P2.1 — Adjustable spaced-repetition tuning.** Expose decay/interval parameters
  (currently constants in `mastery.ts`) as a tunable, per-exam config; A/B the intervals
  against the per-concept retention metric now that P0.4 events exist. Upper CAS exams
  (essay/calculation-heavy) plausibly need different decay curves than P/FM
  multiple-choice recall.
- 🟡 **P2.2 — Exam simulation mode.** _Partially shipped:_ a `mock-exam` quiz mode exists
  (answers revealed at the end, self-grading flow for written questions) — the right
  **summative** assessment skeleton, distinct from the immediate-feedback formative quiz
  mode. **Remaining:** real sitting structure — timed sessions, syllabus-weighted question
  assembly mirroring `data/examSittings.ts`, a post-exam readiness delta, and a "what to
  review next" hand-off into the study plan. Time pressure is itself a skill actuarial
  candidates must train; no other feature can substitute for it.
- ⬜ **P2.3 — Question quality loop.** In-app "report this question" + an
  explanation-quality signal, feeding a review queue. Close the loop the README already
  promises (human review of AI content). Prerequisite for scaling the bank toward upper
  exams (P2.4) without eroding trust.
- 🟡 **P2.4 — Content coverage expansion.** _Ongoing:_ ~915 questions live, but coverage
  is lopsided — per the 2026-06-30 report, 147 of 381 concepts (38.6%) have linked
  questions: Exam FM is near-complete (80/81), Exam P strong (50/60), everything else thin
  (17/240). Priorities: (a) close the 10 remaining Exam P concept gaps, (b) grow
  `exam-mas-i` (90) and `exam-5` (99) toward parity, (c) extend toward CAS 6/7/8/9 whose
  wiki pages exist but have no banks. Content-validation CI (P0.2) and the converter
  skills (`cas-exam-converter`, `soa-exam-converter`) de-risk the bulk imports.
- ✅ **P2.5 — Richer mastery analytics for the learner.** _Shipped:_ collapsible "Mastery
  insights" Dashboard card (`lib/masteryAnalytics.ts`) with concepts-about-to-decay,
  a predicted exam-readiness-by-date curve, and a weakest-topics ranking that deep-links
  into a targeted quiz — decision support, not vanity stats. Gated by
  `MASTERY_ANALYTICS_ENABLED`. _(Shipped without the P3.1 ReadinessCard split it was
  originally sequenced behind — that debt still stands, see P3.1.)_
- ⬜ **P2.6 — Interleaved practice** _(new, §2.2.2)._ Quiz and study-plan session assembly
  currently blocks by concept/topic. Add an interleaving mode that mixes questions from
  related concepts within a session (the ontology in `scripts/ontology_map.py` +
  `lib/conceptMatch.ts` already knows what "related" means). Interleaving is one of the
  most robust effects in the literature precisely because it trains *discrimination* —
  choosing the right distribution/method — which is the dominant failure mode on actuarial
  exams. Keep the assembler pure in `lib/`, flag-gate, and A/B against blocked practice
  using per-concept retention.
- ⬜ **P2.7 — Confidence & calibration** _(new, §2.2.3)._ An optional one-tap confidence
  prompt (sure / unsure / guessing) before the answer reveal; store it alongside
  correctness. Surface a calibration view in Mastery insights ("when you're *sure*,
  you're right 71% of the time") and feed high-confidence errors into the P2.8 queue —
  those are the most dangerous misconceptions a candidate carries into an exam. Low
  friction, high signal; also sharpens `readiness.ts`.
- ⬜ **P2.8 — Error-review loop ("mistakes deck")** _(new, §2.2.4)._ Missed questions
  currently vanish after the /review screen; the decay model re-surfaces the *concept*
  but not the *specific miss*. Queue missed questions for a spaced re-ask (e.g. 2–3 days
  later, interleaved into normal sessions), prioritized by high-confidence errors (P2.7).
  Extend the misconception-annotation pattern proven in `comprehension-checks/` to
  explanation content: name *why* the tempting wrong answer is wrong, not just why the
  right one is right — that's what elaborative feedback means.

**Exit criteria:** measurable lift in per-concept retention; every active exam has
adequate question coverage; a question-quality feedback loop is live; mock exams are
timed and sitting-shaped; interleaving and calibration are live and A/B-validated.

### Phase 3 — Maintainability & scale ❌ NOT STARTED — now the oldest unpaid debt

_Goal: keep velocity high as the surface grows. The E2E safety net this phase was
sequenced behind (P0.5) has existed for a while; meanwhile Phase 1/2 features kept
landing on top of the god components — `ReadinessCard.tsx` grew from 1,664 to 1,824
lines. Start paying this down alongside Phase 2, beginning with the file the next
feature touches._

- ⬜ **P3.1 — Decompose god components (G5).** Split `Flashcards.tsx` (2,836 lines) into
  view/logic/subcomponents with extracted hooks; then `ReadinessCard` (1,824),
  `Settings` (1,323), `Landing` (1,162). Extract pure logic into `lib/` with tests as you
  go. Do these opportunistically whenever a feature touches the file, plus one dedicated
  pass on `Flashcards.tsx`. The E2E collect/quiz specs are the regression net.
- ⬜ **P3.2 — Design-system consolidation.** Codify `components/ui/` primitives and shared
  tokens (colors already in `lib/colorThemes.ts` / `examColors.ts`); document a11y-checked
  patterns so new gamification surfaces are consistent and accessible.
- 🟡 **P3.3 — Performance budget.** Route-level lazy loading exists (6 lazy routes in
  `App.tsx`). **Remaining:** track bundle size in CI, extend lazy-loading to
  Store/Flashcards, and set an LCP/INP budget verified in the E2E run.
- ⬜ **P3.4 — Accessibility pass.** Keyboard + screen-reader audit of the core loop
  (quiz, collect modal, store). Only 2 files currently respect
  `prefers-reduced-motion` — the gamification surfaces added since (level ring, quest
  overlays, collect animation, league board) need the same treatment. Accessible design
  is also cognitive-load design (§2.2): animation that celebrates must never interrupt
  the retrieval attempt itself.

**Exit criteria:** no single component over ~600 lines on the core path; bundle and Core
Web Vitals budgets enforced in CI; core flow passes an a11y audit.

### Phase 4 — Growth, social & monetization

_Goal: turn engaged users into a growing, paying base — only after the loop (Phase 1 ✅)
and depth (Phase 2 ← in progress) are proven._

- ✅ **P4.1 — Leaderboards & light social.** _Shipped 2026-07-10:_ opt-in weekly XP
  leagues, per-exam, Duolingo-style promotion/relegation (see `docs/leagues.md`) —
  privacy-first (snapshot-on-join / delete-on-leave, RPC-only board reads, no user ids
  exposed), surfaced as the League tab in the Level popup. Study-group leaderboards
  deferred. Gated by `LEAGUES_ENABLED`. _Watch (§2.2.6): weekly league retention split by
  final rank — if bottom-quartile finishers churn, add effort-based framing before any
  further social surface._
- ⬜ **P4.2 — Referrals.** Gem/premium-day rewards for inviting a study buddy; instrument
  virality (K-factor) via the P0.4 analytics.
- ⬜ **P4.3 — Monetization depth.** Revisit the free/premium boundary now that the loop
  exists: premium study-plan features, cosmetics, streak freezes, and exam-simulation
  packs (P2.2 makes this a natural premium unit). The Stripe plumbing is already in
  place — this is packaging, not new infrastructure. One boundary per §2.2.6: never
  paywall the core retrieval loop or the decay-driven review queue — monetize
  convenience and depth, not the pedagogy.
- ⬜ **P4.4 — Re-enable the Research tab.** Follow `docs/research-ai-disabled.md`'s
  re-enable checklist to light up the parked Canadian P&C corpus + AI "Ask" as a
  differentiated offering for upper-exam candidates. Ship dark, then roll out. Sequencing
  note: most valuable after P2.4 extends question banks toward CAS 6+, when upper-exam
  candidates actually inhabit the app.

**Exit criteria:** a working referral loop with measured K-factor; a premium tier whose
value is tied to the engagement loop; a data-backed decision on Research reactivation.

---

## 4. Cross-cutting best practices (adopted — keep applying)

- **Branch/PR hygiene.** Small, focused, imperative-titled PRs on `claude/<slug>`
  branches, every one gated by CI. _(Working as intended.)_
- **Every feature ships flag-gated + instrumented + tested.** The four gamification
  engines each shipped as a pure `lib/` module + tests + feature flag + analytics events.
  This is now the proven template — every Phase 2 item follows it.
- **Migrations stay forward-only and dated** (`YYYYMMDD_description.sql`); the
  gamification tables (`user_streaks`, `user_xp`, `user_quests`, leagues) all landed with
  RLS from day one, and leagues correctly went further: cross-user reads/writes only
  through SECURITY DEFINER RPCs.
- **Keep parked code compiling.** Don't "clean up" flag-gated Research code as dead — both
  branches must typecheck (the `: boolean` annotation pattern in `featureFlags.ts`).
- **Human-in-the-loop content.** Per the README, no AI-authored concept/exam content ships
  without review; the P2.3 quality loop operationalizes this. The authored comprehension
  checks (P1.5) and their per-distractor misconception annotations are the quality bar
  for new question content.

---

## 5. Success metrics

Phase 0 instrumented these; later phases are judged on evidence, not vibes.

| Category | Metric | Why | Status |
|----------|--------|-----|--------|
| Activation | % new users completing a first quiz on day 0 | Proves onboarding works | Instrumented (`lib/funnel.ts`) |
| Retention | D1 / D7 / D30 return rate | The core health metric; Phase 1's target | Instrumented (`day2_return` + GA4) |
| Engagement | Median streak length; daily-goal completion rate | Measures the loop directly | Instrumented (`streak_extended`, `daily_goal_met`) |
| Learning | Per-concept retention (correct on revisit after decay window) | Proves the engine, not just usage | Needs a dedicated event — prerequisite for P2.1/P2.6 A/Bs |
| Calibration | Confidence-accuracy gap (P2.7) | Overconfidence is the exam-day killer | ⬜ ships with P2.7 |
| Economy | Gem earn/spend balance; quest completion rate; quest-vs-plan adherence ratio (§2.2.6) | Detects a broken/inflationary economy — or reward-chasing displacing learning | Partially instrumented (`quest_claimed`) |
| Social | League weekly retention by final rank | Detects leaderboard demotivation (§2.2.6) | ⬜ needs a rollover-retention query |
| Reliability | Crash-free session rate | Gated by P0.3 monitoring | Instrumented (`exception` events) |
| Monetization | Trial→paid conversion; premium retention | Judges Phase 4 packaging | Existing Stripe data |

---

## 6. Risk register

- **Gamification vs. learning integrity.** Volume-based rewards can encourage grinding
  easy questions. _Mitigation (live):_ XP and quests weight hard + decaying concepts;
  revive quests only appear when concepts have actually decayed. _Watch:_ per-concept
  retention (Phase 2), not just minutes.
- **Overjustification / reward dependence** _(new)._ As the economy grows, extrinsic
  rewards can crowd out intrinsic motivation to learn (§2.2.6). _Mitigation:_ keep
  rewards claim-based and informational; monitor the quest-vs-plan adherence ratio; do
  not raise reward sizes to fix engagement dips — fix the learning value instead.
- **Streak burnout / dark patterns.** Aggressive reminders erode trust. _Mitigation:_
  freezes + same-day repair are live; P1.3 reminders must ship opt-in with quiet hours
  and learning-state framing, and be judged on reminder→session conversion, not sends.
- **Leaderboard demotivation** _(new)._ Bottom-of-cohort finishes can churn exactly the
  strugglers who most need the app. _Mitigation:_ leagues are opt-in and reset weekly;
  add the rank-split retention metric before building any further social surface.
- **Refactor regressions.** Splitting `Flashcards.tsx` risks breaking the collect flow.
  _Mitigation:_ the E2E net (P0.5) now exists — but it only covers signed-out paths, so
  extend specs to the signed-in collect/mastery flow before the P3.1 dedicated pass.
- **God-component compounding** _(elevated)._ Each Phase 1/2 feature that landed inside
  `ReadinessCard`/`Flashcards` made the eventual split harder (ReadinessCard +160 lines
  since the last revision). _Mitigation:_ enforce the "split as you touch" rule from
  P3.1 starting with the next Phase 2 item.
- **Economy inflation.** Quests added a real earn loop. _Mitigation:_ the earn/spend
  balance metric exists — actually review it before adding new sources (referrals P4.2
  will add another).
- **Scope creep from Research.** It's a big surface. _Mitigation:_ keep it parked until
  Phase 4 and gate reactivation on the depth work (P2.4 upper-exam content) landing first.

---

## 7. Suggested immediate next steps

The previous revision's three next steps (CI, monitoring/analytics, streak) all shipped.
The next three, in order:

1. **P1.5 (finish) — Author the Exam FM comprehension-check batch.** Highest
   pedagogy-per-effort: FM has near-complete question coverage (80/81 concepts) but its
   collect gate still uses the guessable fallback, so the scaffold is weakest on the
   best-covered exam. The Exam P batch + the `flashcard-comprehension-check` skill make
   this a well-worn path. Then MAS-I and Exam 5.
2. **P2.2 (finish) — Timed, sitting-shaped mock exams.** The mode skeleton exists;
   adding the timer, weighted assembly from `data/examSittings.ts`, and the post-exam
   readiness delta turns it into the product's summative-assessment pillar — and the
   natural premium unit for P4.3.
3. **P2.7 — Confidence & calibration.** Small surface (one tap per question), pure-lib
   engine, big signal: it upgrades readiness scoring, seeds the P2.8 error queue, and
   trains the metacognitive skill exams actually punish.

In parallel, apply the P3.1 "split as you touch" rule to whichever god component the
next feature lands in — the debt is now growing faster than it's being paid.
