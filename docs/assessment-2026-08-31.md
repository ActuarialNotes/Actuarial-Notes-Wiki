# Codebase & roadmap assessment — 2026-08-31

**Roadmap used:** `docs/roadmap.md` (last updated 2026-07-24). It is the only roadmap for
this product; `docs/actuarial-agent-product-plan.md` is a plan for a *different* product
line and is deliberately out of scope here. There is no `ROADMAP.md`, `PLAN.md`, `TODO.md`,
and no GitHub issues in use — planning happens in `docs/` and in PR titles.

**Method:** read the roadmap, then mapped the repo independently and re-derived every
number it cites. Ran `npm test`, `npm run lint`, `npm run build`, the Playwright suite,
`python3 -m unittest discover -s scripts`, `scripts/validate_content.py`,
`scripts/verify_check.py`, `scripts/list_missing_checks.py`, and read the last 30 CI runs
via the GitHub API. Where the code and the roadmap disagree, the code wins and I say so.

**Headline:** the app is in better shape than the roadmap thinks on content, and worse
shape than it thinks on its safety net. **CI has been failing on every run since
2026-08-23** — eight days and roughly seventeen PRs merged over a red gate — and nobody
noticed, which is a worse problem than the failure itself. Meanwhile Phase 2's content
work advanced far past the numbers the roadmap quotes, and a large new subsystem (VERIFY /
Fact Check) shipped that the roadmap does not mention at all and that has produced zero
output so far.

---

## 1. Orientation — what actually exists

### Entry points and build

- **App:** `quiz/` — React 18 + Vite 7 + TS strict, SPA. Entry `quiz/src/main.tsx` →
  `quiz/src/App.tsx` (react-router, 6 lazy routes).
- **Content:** the repo root *is* the database. `quiz/vite.config.ts` bundles it at build
  time through five virtual modules — `virtual:wiki-content`, `virtual:questions-content`,
  `virtual:comprehension-checks`, `virtual:keystone-links`, `virtual:resource-timeline`.
- **Serverless:** `api/` (root — `chat.js`, `pass-rates.js`, `research*.js`) and
  `quiz/api/exam-pdf.js`. Two `vercel.json` files, two Vercel projects.
- **Backend:** Supabase — 41 dated migrations in `supabase/migrations/`, 10 edge functions
  in `supabase/functions/`.
- **CI:** five workflows — `ci.yml` (lint/test/build + e2e), `content-validation.yml`,
  `verify-check.yml`, `validate-sweep.yml` (Monday VERIFY sweep), `deploy-functions.yml`.

### Size, measured today

| Thing | Count |
|---|---|
| `quiz/src` non-test TS/TSX | 71,621 lines |
| `quiz/src/lib/*.ts` | 167 files |
| Test files / tests (vitest) | 96 / 1,392 — **all passing** |
| Playwright specs | 10 files, 709 lines — **3 tests failing** |
| Python scripts | 27, 63 unittests — all passing |
| Question files | 1,036 (`exam-p` 390, `exam-fm` 350, `exam-5` 123, `exam-mas-ii` 105, `exam-mas-i` 67) |
| Concept pages | 476 |
| Comprehension checks | 357 across 6 exam folders |
| Content files carrying a `verification:` block | 1,565 |
| Files over 600 lines in `quiz/src` | 21 |

### Half-finished or parked

- **Research tab** (`pages/Research/`, `components/research/`, `stores/researchStore.ts`,
  `api/research*.js`, `research_*` tables) — ~5,780 lines, fully built, two flags off.
  Deliberate, documented in `docs/research-ai-disabled.md`. Not dead weight, but it is 8%
  of the app's source that nobody exercises.
- **Onboarding tour** (`components/OnboardingTour.tsx` 850 lines, `hooks/useOnboardingTour.ts`,
  13 files carrying `data-tour` markers) — `TOUR_ENABLED = false` since 2026-08-23,
  "parked pending a simpler rebuild". Its Playwright spec was *not* parked with it. See §5.1.
- **VERIFY / Fact Check** (`scripts/verify_*.py`, `.verify/`, `.claude/agents/validate.md`,
  `content_reports` table, `components/FactCheck*.tsx`) — shipped 2026-08-23, complete
  machinery, **0 of 1,565 files verified, 0 sidecar logs written**. Built but never run.
- **Four stranded question files** in nested subdirectories
  (`questions/exam-p/probability/p-001.md`, `p-002.md`,
  `questions/exam-p/statistics/p-s-001.md`, `questions/exam-fm/interest/fm-001.md`) — not
  collected by the build, flagged as warnings by `validate_content.py` and ignored.

---

## 2. Reconcile — roadmap item by item

Legend: ✅ done · 🟡 partial · ⬜ not started · ♻️ superseded · 🗑 no longer relevant.

### Phase 0 — Foundations

| Item | Roadmap | Reality | Evidence |
|---|---|---|---|
| P0.1 App CI | ✅ | **🟡 — exists, has been red for 8 days** | `.github/workflows/ci.yml`; runs 640–669 all `conclusion: failure`; the `build` job is green, the `e2e` job fails on 3 tour specs |
| P0.2 Content validation CI | ✅ | ✅ | `scripts/validate_content.py` passes (1,032 files, 4 warnings) |
| P0.3 Error monitoring | ✅ | ✅ | `lib/errorMonitoring.ts`, sinks wired in `main.tsx` |
| P0.4 Analytics | ✅ | **🟡** | `lib/analytics.ts` catalogue + 12 call sites; but the three most recent surfaces (daily email, mistakes review, collect lockout) ship with **no events at all** — see §2.1 |
| P0.5 E2E smoke | ✅ | **🟡 — 10 specs, 3 failing** | `quiz/e2e/`; reproduced locally |

**Trust the code:** the roadmap's "every PR is gated by lint + typecheck + unit + E2E smoke"
exit criterion is false today. The gate exists and is being ignored.

#### 2.1 The instrumentation claim doesn't hold for recent work

`docs/roadmap.md` §4 says "every feature ships flag-gated + instrumented + tested". Grepping
importers of `lib/analytics.ts` gives 12 call sites, and none of them are in
`lib/dailyEmail.ts`, `hooks/useEmailPrefs.ts`, `lib/recentMistakes.ts`,
`components/MistakesReviewModal.tsx`, or `lib/collectLockout.ts`. So the flag-and-test half
of the template held; the instrument half quietly stopped. That is exactly why the roadmap's
own "reminder → session conversion" metric is still ⬜ — it was never going to arrive on its
own.

### Phase 1 — Engagement loop

| Item | Roadmap | Reality | Evidence |
|---|---|---|---|
| P1.1 Streaks | ✅ | ✅ | `lib/streak.ts` + `streakStore.ts`, `STREAK_ENABLED = true` |
| P1.2 XP / daily goal | ✅ | ✅ | `lib/xp.ts`, `XP_ENABLED = true` |
| P1.3 Reminders | 🟡 (email half) | 🟡 — unchanged, and **not measurable** | `supabase/functions/daily-plan-email/`, `lib/dailyEmail.ts`; no send/open/session event anywhere |
| P1.4 Quests | ✅ | ✅ | `lib/quests.ts`, `data/quests.ts` |
| P1.5 Comprehension checks | 🟡 "Exam 5 remaining" | **🟡 — but the gap moved.** Exam 5 is *done* (110 checks); the gap is now MAS-II | `comprehension-checks/exam-5/` 110 files; `docs/comprehension-check-backlog.md` — **119 of 476 concepts** remain, 49 of them exam-mas-ii, 1 exam-mas-i, rest unassigned/other |
| P1.6 PWA / offline | ⬜ | ⬜ | no service worker, no manifest, `quiz/public/` holds 3 static files |

**Trust the code:** the roadmap says "author the Exam 5 batch" is what remains. It's done.
What remains is MAS-II — an exam whose question bank (105 questions) did not exist when the
roadmap was written. Re-point P1.5 at MAS-II.

Also note the one stray: `comprehension-checks/exam-9/Time Value of Money.md`, a single
file in a folder for an exam with no bank, no concepts and `development` status. Harmless
(the parser keys on concept name, not folder) but it is the only thing in that directory.

### Phase 2 — Learning depth

| Item | Roadmap | Reality | Evidence |
|---|---|---|---|
| P2.1 Tunable SR parameters | ⬜ | ⬜ | constants still inline in `lib/mastery.ts` |
| P2.2 Exam simulation | 🟡 "needs timer + weighted assembly" | 🟡 — **no movement on the timer**, real movement on the shelf | `QuizMode = 'quiz' \| 'mock-exam'` (`lib/parser.ts:6`); zero occurrences of `timer`/`timeLimit`/countdown in `pages/Quiz.tsx`; `quizStore` records *elapsed* seconds only. But `data/pastExams.ts` + `lib/pastExams.ts` + `PastExamBrowser.tsx` + the in-app PDF viewer + the live pass-rate pipeline all shipped since |
| P2.3 Question quality loop | ⬜ | **♻️ largely superseded** | `ReportIssueModal.tsx` → `content_reports` table (`20260823_content_reports.sql`) → `scripts/sync_reports.py` → the VALIDATE sweep. The reader-report half is built; what's missing is that nothing has ever gone through it |
| P2.4 Content coverage | 🟡 "147 of 381 concepts (38.6%)" | **🟡 — badly understated.** Now **327 of 476 (68.7%)** | recomputed from `wiki_link` frontmatter across `questions/**` (note `+` is the space encoding); 0 broken link targets. `Concepts Without Review Questions.md` is stale — generated 2026-06-30, still says 381 concepts |
| P2.5 Mastery analytics | ✅ | ✅ | `lib/masteryAnalytics.ts`, `MASTERY_ANALYTICS_ENABLED = true` |
| P2.6 Interleaving | ⬜ | **⬜ for quizzes, ✅ for the study plan** | `lib/studyPlanOrder.ts` interleaves keystone groups; quiz/session assembly still blocks by concept |
| P2.7 Confidence & calibration | ⬜ | ⬜ | zero occurrences of confidence/calibration in app logic |
| P2.8 Error-review loop | 🟡 | 🟡 — unchanged | `lib/recentMistakes.ts`, `MistakesReviewModal.tsx`; still no delayed re-ask, no spacing |

### Phase 3 — Maintainability

| Item | Roadmap | Reality | Evidence |
|---|---|---|---|
| P3.1 God components | ⬜, "Flashcards 3,450 and growing" | ⬜ — **it stopped growing, barely** | `Flashcards.tsx` **3,325** (−125), `ReadinessCard.tsx` 1,680 (−128), `Landing.tsx` 1,433 (**+235**), `Settings.tsx` 1,239 (−110), `Search.tsx` 1,007 (new to the list). 21 files over 600 lines |
| P3.2 Design system | ⬜ | **♻️ partly superseded** | `docs/style-guide.md` and `docs/visual-noise-review.md` now exist and are being executed against (see the Exam Readiness popup work). `components/ui/` is still not codified |
| P3.3 Performance budget | 🟡 | 🟡 — **and the number is bad** | build output: entry chunk `index-*.js` **4,404 kB raw / 1,186 kB gzip**; `WikiLayout` 1,562 kB. No size check in CI. Cause identified in §3.3 |
| P3.4 Accessibility | ⬜ | ⬜ | 5 files respect `prefers-reduced-motion` (up from 2); no audit |

### Phase 4 — Growth

| Item | Roadmap | Reality |
|---|---|---|
| P4.1 Leagues | ✅ | ✅ — `lib/leagues.ts`, `20260710_leagues.sql`, `LEAGUES_ENABLED = true` |
| P4.2 Referrals | ⬜ | ⬜ |
| P4.3 Monetization depth | ⬜ | ⬜ — Stripe plumbing unchanged |
| P4.4 Re-enable Research | ⬜ | ⬜ — both flags still `false` |

### Not on the roadmap at all — shipped since 2026-07-24

This is the more interesting list, and it explains where the five weeks went:

- **VERIFY / Fact Check** — `scripts/verify_{lib,check,targets,context,record}.py`,
  `sync_reports.py`, `generate_validation_status.py`, `.verify/` append-only logs, the
  `validate` agent + Monday sweep workflow, `verify-check.yml` PR gate, a
  `verification:` block on all 1,565 content files, the in-app badge/panel/report surfaces
  and the `content_reports` table. Roughly the size of a roadmap phase. §5.2.
- **Mock-exam past-paper browser** — `data/pastExams.ts`, `lib/pastExams.ts`,
  `lib/passRates.ts` + `api/pass-rates.js`, `PastExamBrowser.tsx`.
- **In-app PDF viewer** — `lib/examPdf.ts`, `pdfViewer.ts`, `pdfjsSetup.ts`,
  `PdfViewerPanel.tsx` (847 lines), `quiz/api/exam-pdf.js`, pdf.js asset copying.
- **Stacked pages** in the concept popup (`lib/pageStack.ts`, `docs/stacked-pages.md`).
- **Keystone concepts** + **exam readiness rework** (`lib/keystone.ts`, `readiness.ts`,
  `readinessRing.ts`, `docs/keystone-concepts.md`, `docs/exam-readiness.md`).
- **Sound design system** (`lib/soundConfig.ts` 786 lines, `soundEngine.ts`,
  `soundInteractions.ts`, `docs/sound-design.md`).
- **Distribution simulators**, **generated concept figures**, **generated resource covers**,
  **math focus**, **image focus**, **flashcard cross-device sync**, **exam orientation
  guides**, **scrubbable nav bars**, **question info/provenance panel**.
- **`exam-mas-ii` question bank** — 105 questions, an exam the roadmap doesn't list.

The roadmap has not been updated to reflect any of it. Five weeks of substantial work is
invisible to the planning document, which is why its "immediate next steps" read as if
nothing happened.

---

## 3. Reassess from today

### 3.1 The roadmap's stated next step is still right, but it is no longer first

The roadmap's #1 is P2.7 (confidence & calibration). That reasoning holds — it is small,
pure, and P2.8 is already built to consume it. But it assumes a working CI gate and an
analytics pipeline that records the result. Neither is true right now, so shipping P2.7
today would produce a feature nobody can evaluate, merged over a red check. Fix the gate and
the instrumentation first; they are hours of work, not days.

### 3.2 Work the roadmap assumes is needed but the code already handles

- **P2.4 "close the 10 remaining Exam P concept gaps"** — coverage is 68.7%, not 38.6%.
  The Exam P and FM gaps the roadmap enumerates are largely closed. The real coverage gap
  is now MAS-II and Exam 5, and CAS 6–9 which still have no bank at all.
- **P1.5 "author the Exam 5 batch"** — done. 110 files.
- **P2.3 "in-app report this question"** — built, as part of VERIFY. Don't design it again;
  the remaining work is operating it.
- **P2.6 interleaving, for the study plan** — `lib/studyPlanOrder.ts` already interleaves
  keystone groups so every keystone lands early. The gap is narrower than the roadmap
  frames it: it is *quiz session assembly* only.
- **P3.2 design system** — `docs/style-guide.md` covers tokens, type scale, state colours,
  spacing, motion and a11y. The roadmap item should be rewritten as "codify
  `components/ui/` against the style guide", not "write a design system".

### 3.3 Coupling and blockers the roadmap didn't anticipate

**The bundle problem has a specific cause, and it is architectural.** `quiz/src/main.tsx:8`
does `import bundledQuestions from 'virtual:questions-content'` — eagerly, at module scope,
in the entry chunk. That is 4.7 MB of raw question markdown parsed into the initial bundle
before first paint, and it is why `index-*.js` is 4.4 MB / 1.19 MB gzipped. The wiki content
(2.4 MB) is at least behind the lazy `WikiLayout` chunk (1.56 MB). Every question added to
the bank makes the app's cold start slower for every user, including one who only opens the
Dashboard. This directly blocks P1.6 (a PWA that precaches a 1.2 MB entry chunk is not a
subway-friendly app) and it silently taxes P2.4 — the roadmap treats "grow the question
bank" and "performance budget" as independent items when they are the same item.

**VERIFY couples content growth to a process that isn't running.** Every content file now
carries a `verification:` block and the app renders "Not fact checked" on essentially every
page (deliberately — the flag comment argues for honesty, and I agree with that call). But
the badge is a promise: it says a fact-check pipeline exists. Right now 0/1,565 files have
been through it, no `.verify/` log has ever been written, and the Monday sweep needs
`ANTHROPIC_API_KEY` and Supabase service-role secrets that I cannot confirm are set (the
workflow no-ops without them rather than failing). Shipping more content while the verified
count stays at zero makes the badge worse, not better.

**The E2E net P3.1 depends on is red, and only covers signed-out paths.** The roadmap's own
risk register says "extend specs to the signed-in collect/mastery flow before the P3.1
dedicated pass". That is still true, and now there's a prior step: get the existing suite
green so a regression is visible at all.

### 3.4 Cheaper than it used to be

- **Splitting `Flashcards.tsx`** — the codebase has learned the extraction pattern well
  (`pageStack.ts`, `navScrub.ts`, `readinessRing.ts`, `collectLockout.ts` are all recent
  "pure lib + tested + thin component" splits). The muscle exists; it just hasn't been
  pointed at the big file. And the file finally stopped growing.
- **Question-bank expansion** — the two converter skills plus `content-validation.yml` make
  bulk imports genuinely low-risk. MAS-II went 0 → 105 questions with no drama.
- **Code-splitting the question bank** — the virtual-module plugin already exists; making
  it emit per-exam chunks behind a dynamic import is a contained change to
  `vite.config.ts` + `main.tsx`, not a rewrite.

### 3.5 More expensive than it used to be

- **P3.1** — `Landing.tsx` grew 235 lines and `Search.tsx` (1,007) joined the over-1k club.
  The debt is spreading sideways even as the worst file holds steady.
- **Any A/B test** (P2.1, P2.6) — still blocked on the per-concept-retention event the
  roadmap has flagged as missing since at least 2026-07-11 and which nobody has built.

### 3.6 Cruft worth clearing before building on top

1. `quiz/e2e/tour.spec.ts` — tests a feature that is flag-off. Red CI. (§5.1)
2. The four stranded question files — dead content the validator warns about every run.
   Either move them up or delete them; a permanently-warning validator trains people to
   ignore validators.
3. `Concepts Without Review Questions.md` — two months stale and quoting numbers the
   roadmap then repeated. Regenerate it or delete it.
4. `comprehension-checks/exam-9/` — one file, no bank, no exam.
5. `CLAUDE.md` says "83 test files / ~1250 tests"; actual is 96 / 1,392. Minor, but
   CLAUDE.md is the onboarding doc and it should not be the thing that's wrong.
6. 53 eslint warnings (0 errors), mostly `react-hooks/exhaustive-deps`. Not urgent, but
   they're at the level where a real one will hide among them.

---

## 4. Recommend

### Do next

**1. Get CI green and keep it that way.** *(1–2 hours)*
Delete or `test.skip` `quiz/e2e/tour.spec.ts` behind the same flag that gates the tour —
ideally import `TOUR_ENABLED` and wrap the describe, so re-enabling the tour re-enables its
spec. Then either turn on required status checks for `main` or accept that the gate is
decorative. Touches: `quiz/e2e/tour.spec.ts`, repo branch protection.
*Unblocks:* every other item on this list. A refactor without a working regression net is a
gamble, and P3.1 is the biggest refactor on the roadmap.

**2. Decide what VERIFY is for, then run it once end-to-end.** *(a day)*
Confirm `ANTHROPIC_API_KEY` / `SUPABASE_SERVICE_ROLE_KEY` are set on the repo, dispatch
`validate-sweep.yml` manually against a 10-file batch, and merge the resulting PR. Get the
verified count off zero and the first `.verify/` logs written. If the sweep can't run (no
key, no budget), say so and turn the Fact Check badge off rather than shipping a promise
with no pipeline behind it. Touches: `.github/workflows/validate-sweep.yml`,
`.verify/`, `Validation Status.md`.
*Unblocks:* P2.3 (it's already built — this is the operating half), and the credibility
claim the README makes about human-reviewed content.

**3. Split the question bank out of the entry chunk.** *(a day)*
Make `virtual:questions-content` emit one module per exam and load them via dynamic import
from wherever questions are first needed, instead of eagerly in `main.tsx`. Add a
`size-limit`-style budget step to `ci.yml` so this can't silently regress.
Touches: `quiz/vite.config.ts`, `quiz/src/main.tsx`, whatever reads `bundledQuestions`,
`.github/workflows/ci.yml`.
*Unblocks:* P1.6 (a PWA is not sane at 1.19 MB gzip entry), P3.3 outright, and removes the
hidden tax P2.4 pays per question added.

**4. Wire the three missing analytics events.** *(2–4 hours)*
`reminder_opened` / `reminder_session` for the daily email (P1.3's own exit criterion),
`mistake_reviewed` for the mistakes card, and — the important one — a
`concept_retention` event fired when a decayed concept is answered correctly on revisit.
Touches: `lib/analytics.ts`, `lib/dailyEmail.ts` + the edge function, `stores/quizStore.ts`,
`lib/recentMistakes.ts`.
*Unblocks:* P2.1 and P2.6 A/Bs, which have been blocked on exactly this event for two
roadmap revisions, and closes the roadmap's "Learning" and "Re-engagement" metric rows.

**5. P2.7 — confidence & calibration.** *(a day)*
Now build it, with the gate green and the events in place. Pure engine in
`lib/calibration.ts`, one tap in `QuestionCard`, store alongside the response, surface in
Mastery insights, feed high-confidence errors to `recentMistakes.ts`. Flag-gated,
instrumented, tested — the template that works.
*Unblocks:* the rest of P2.8 (prioritized re-asks), sharper readiness.

**6. Author the MAS-II comprehension checks.** *(multi-day, content work)*
49 of the 119 outstanding concepts. Use the `flashcard-comprehension-check` skill; the
backlog file already lists them.
Touches: `comprehension-checks/exam-mas-ii/*.md`, `docs/comprehension-check-backlog.md`.
*Unblocks:* P1.5's exit criterion, and makes the MAS-II bank (105 questions, shipped with no
scaffold) actually usable by a novice.

### Do eventually

**7. `Flashcards.tsx` dedicated split.** *(multi-day)* Extract deck/study/gallery state into
hooks and the pure ordering logic into `lib/`. Do it *after* step 1, never before. The
recent split work (`pageStack.ts`, `navScrub.ts`) is the model.

**8. P2.2 — the mock-exam timer.** The past-paper shelf, the PDF viewer and the pass-rate
pipeline all shipped; the actual summative mechanic (a countdown, sitting-shaped weighted
assembly, a post-exam readiness delta) did not. It is the single largest gap between what
the mock-exam surface *looks* like and what it *does*.

**9. Refresh the roadmap itself.** It is five weeks and roughly one phase of work out of
date, and its stale numbers (38.6% coverage, "Exam 5 remaining", 527 tests) are now actively
misleading — this assessment exists partly because the roadmap couldn't be trusted as a
status document.

**10. Regenerate or retire the stale generated content pages** and clear the four stranded
question files.

### Stop planning this

- **P2.3 as a new build.** It's built. Re-scope it to "operate the reader-report queue".
- **P3.2 as "write a design system".** `docs/style-guide.md` is the design system. Re-scope
  to "codify `components/ui/` against it".
- **P4.4 Research re-enable.** Correctly deferred, and the reason is stronger now than when
  it was written: with CI red, zero fact-checks recorded, and a 1.19 MB entry bundle, adding
  a 5,780-line surface is the wrong move. Leave it parked and stop re-litigating it each
  revision.
- **P4.2 referrals.** Nothing has changed to make this timely, and the economy metrics that
  were supposed to gate it still aren't being read.

---

## 5. Flags — things that worry me and aren't on the roadmap

### 5.1 CI has been red for eight days and nobody noticed *(highest severity)*

`TOUR_ENABLED` was set to `false` in commit `9f19729` (PR #1357, merged 2026-08-23 15:27
UTC). `quiz/e2e/tour.spec.ts` — added five days earlier in PR #1311 — asserts the tour
launcher is visible. It isn't, because `App.tsx:219` gates the mount on the flag. Since that
merge, **every CI run has failed**: runs 640 through 669, both `pull_request` and `push`
events, the `e2e` job red with `3 failed / 17 passed` while the `build` job stays green.
Reproduced locally.

Seventeen-odd PRs have been merged over that red check, including a bug-fix PR whose whole
point was correctness (`Fix Study Schedule day keys…`). The failure itself is a two-line fix.
The problem is that the team has spent eight days learning that a red X on a PR is normal.
That is the most expensive thing in this report, because it degrades every future safety net —
the content-validation gate and the VERIFY gate are next to be tuned out.

### 5.2 A large subsystem shipped and has produced nothing

VERIFY is thorough — append-only logs, fingerprint-deduped findings, a CI gate that catches
an entry rewritten inside the PR that created it, a refusal to mark anything `verified`
without a citable source, a per-commit walk to catch an agent downgrading its own critical
finding. It is careful work. And its output is: **0 verified files, 0 logs, 0 findings, 0
reports synced**. The Monday sweep silently no-ops without `ANTHROPIC_API_KEY`
(`::notice::` then `exit 0`), so a sweep that has never run looks identical to a sweep with
nothing to do. Meanwhile the app tells every reader "Not fact checked" on every page. Either
run it or turn the badge off; the current state is a trust surface with nothing behind it.

### 5.3 Six dependency vulnerabilities in production deps, two high

`npm audit --omit=dev`: `js-yaml` (high, quadratic-complexity DoS ×3), `ws` (high,
uninitialized memory disclosure + memory-exhaustion DoS), `dompurify` (moderate, XSS via
detached subtree — and this one matters, the app renders user-adjacent markdown),
`@remix-run/router` / react-router (moderate, open redirect via protocol-relative URL).
All say "fix available via `npm audit fix`". There is no Dependabot config and no audit step
in CI. `@supabase/supabase-js` is also pinned exactly at `2.39.0` while everything else
floats on `^`, with no comment saying why.

### 5.4 Content-format inconsistencies in the question bank

- Four question files sit in nested subdirectories and are **silently not loaded by the
  build**. `validate_content.py` warns; the warning has evidently been ignored long enough
  to become furniture.
- `exam-mas-i` dropped from 90 questions (roadmap, 2026-07-24) to 67 today, while
  `exam-mas-ii` appeared at 105. Almost certainly a re-tagging during the MAS-II import
  (PR #1301), and probably correct — but nothing in the repo records that decision, and a
  bank shrinking by 25% is the kind of thing you want a note about.
- `wiki_link` encodes spaces as `+` (`Concepts/Conditional+Probability`). It works and
  resolves cleanly (0 broken targets across 1,036 files), but it is an undocumented
  convention that will trip the next person who writes a script against the bank — it caught
  me on the first pass of this assessment.

### 5.5 Two silent duplication contracts with no test binding them

`lib/leagues.ts` (116 lines) duplicates promotion/relegation math into
`20260710_leagues.sql` (409 lines), and `lib/dailyEmail.ts` (121 lines) is duplicated
verbatim into `supabase/functions/daily-plan-email/index.ts` (310 lines). Both duplications
are documented and justified — the edge function can't import from `quiz/src`. Neither has
anything that fails when the two halves drift. `api/lib/passRates.js` shows the pattern done
right (one implementation, tested from the app side); the other two should either follow it
or get a golden-vector test shared across both sides.

### 5.6 Smaller worries

- **`prefers-reduced-motion`: 5 files.** The app has since added a level ring, quest
  overlays, a collect ceremony, a streak flame overlay, rainbow foil and a card-flip
  animation. P3.4 is more overdue than its ⬜ suggests.
- **`Search.tsx` is 1,007 lines** and isn't on the roadmap's god-component list. Neither is
  `PdfViewerPanel.tsx` (847) or `ExamGuideGraphics.tsx` (895).
- **The daily-email cron is unverifiable from the repo.** `docs/daily-plan-email.md`
  describes a one-time Resend/pg_cron setup checklist; nothing in the repo records whether
  it was completed, and a silently-not-sending email looks exactly like an email nobody
  opted into.
- **`Landing.tsx` grew 235 lines** since the roadmap while every other god component
  shrank. The quiz builder is quietly becoming the next `Flashcards.tsx`.

---

## 6. Bottom line

No rewrite is warranted and none is proposed. The architecture is sound: pure tested `lib/`
modules, flag-gated surfaces, content as markdown, a real learning model underneath. The
problems are operational, not structural — a green light that has been red for a week, a
verification pipeline nobody started, a bundle that grows with the content, and a planning
document five weeks behind the code.

Fix the gate, run the pipeline once, split the question bank out of the entry chunk, wire
the retention event. That is roughly three days of work and it makes every remaining Phase 2
item measurable, which is the thing the roadmap has been assuming since July and has never
actually had.
