# Roadmap: Actuarial Notes

_Last reviewed: **2026-10-17** against `main` @ `1a47980` · Next review due: **2026-10-31**_

This is the **one roadmap** for everything in this repository: Study Mode, the content vault,
Fact Check, the AI connector, Actuarial Tools, Cowork, and the experiments around them. It
says what exists, what is next and in what order, who decides, and where the detail lives.
The detail itself stays in the **subplans** (§8). This document holds their status and their
priority relative to each other.

> Read `CLAUDE.md` first for the map of the repo. This document is about *where we are going
> and in what order*, not about how a module works.

---

## 0. How this document governs the work

### 0.1 Who decides what

| Role | Who | Decides |
|---|---|---|
| **Maintainer** | Jordan | What is in **Now**; every decision in §6; anything that changes an account, a secret, a repo setting, money, or who can see a product; promoting an exam's status. |
| **Contributors** | Claude Code sessions, and any human contributor | How to build an item; proposing items; moving an item they finished to ✅; keeping this file and the subplans in step with the code. |

A contributor may **propose** a new item or a priority change, by adding it to §3.4
*Proposed* in a PR. A contributor may not promote an item into Now, or settle a decision
listed in §6. When a session hits one of those decisions, it builds with the default listed
there, or it stops and asks.

### 0.2 Status and priority vocabulary

**Status:**

| Mark | Meaning |
|---|---|
| ✅ | Shipped and working. |
| 🟢 | Shipped, but needs an operating step only the maintainer can take (a secret, a deploy, a setting). |
| 🟡 | Partially shipped. |
| ⬜ | Not started. |
| 🅿️ | Parked. Built or designed, but deliberately off. Don't build on it, and don't delete it. |
| 🗑 | Retired. Superseded or removed; kept here so nobody re-plans it. |

**Priority tiers:**
- **Now** is being worked on, or is the very next thing in its lane. Keep it to about **five
  items per lane**.
- **Next** is queued in order, and is the next to pull when a Now item closes.
- **Later** is wanted but not sequenced yet.
- **Parked** waits for a decision or a precondition, which the item names.

### 0.3 How an item is ranked

Score a candidate by asking these questions **in order**. The first question that gets a
"yes" decides its tier.

1. **Is a promise to the reader unbacked?** This covers a badge with no pipeline behind it, a
   feature that is switched on but not actually operating, or a gate that has gone red.
   → **Now.** Trust comes before features. *(Example: a red CI that every PR merges over.)*
2. **Does it unblock two or more other items?** → **Now** or the top of **Next**. *(Example:
   the retention event that every A/B test waits on.)*
3. **Does it move a learner's exam readiness?** Weigh it by how many candidates sit that
   exam. → **Next**, ordered by learner impact divided by cost.
4. **Is it a new surface or a new product line?** → **Later**, until rules 1–3 are clear
   for the lane it lives in.

There are two standing tie-breakers:
- **Finish before you start.** A 🟡 item outranks a ⬜ item of the same value.
- **Operate before you extend.** A shipped system that isn't running outranks a new
  feature for that system.

### 0.4 Definition of done

An item is ✅ only when all of the following are true:

- It is merged with **CI green**.
- It is behind a flag in `lib/featureFlags.ts` if it is a risky or new surface.
- Its logic is in **pure, tested `lib/` modules**.
- It sends the **analytics events** that tell us whether it worked. *(This is the half of
  the template that slipped in August and September; see E-L1.)*
- Its **doc** under `docs/` is written or updated, and `CLAUDE.md` names it.
- Its **line in this roadmap is updated in the same PR.**

### 0.5 Keeping this file true

- **In every PR:** when a PR changes an item's status, it updates that item's line here.
  When a PR starts something that isn't on this roadmap, it adds the item, normally under
  §3.4 *Proposed*.
- **Every two weeks, in a review pass:**
  - Re-measure §2 with the commands in Appendix A.
  - Move items between tiers.
  - Append an entry to Appendix B.
  - Update the "Last reviewed" date at the top.
- **Subplans keep their own detail.** When a subplan's status changes, update the subplan
  first, then its one-line summary here. If this file and a subplan disagree about
  *status*, the code wins and both get fixed. If they disagree about *how* to build
  something, the subplan wins.
- **Don't track work in GitHub issues.** The repo uses none. Planning happens here, in
  the subplans, and in PR titles.

---

## 1. The products at a glance

| Product | Who it's for | State | Gate | Subplan |
|---|---|---|---|---|
| **Study Mode** (quiz, flashcards, study plan, readiness, gamification) | Exam candidates | ✅ live | — | §4.2; `concept-learning-progression.md`, `study-plan-generation.md`, `exam-readiness.md` |
| **Content vault**: 43 exam pages (12 CAS, 31 SOA), 1,389 concepts, 748 resources, 3,341 questions | Candidates and practitioners | ✅ live. 7 exams ready, 6 beta, 30 in development | `examStatus.ts` | §4.3; `cas-publication-plan.md`, `CONCEPT_GAPS_PLAN.md` |
| **Fact Check / VERIFY** | Every reader | 🟢 operating by hand. 48.6% of files verified; the weekly sweep has never run the agent | `FACT_CHECK_UI_ENABLED` | §4.4; `verification.md`, `verification-plan.md` |
| **AI connector** (MCP server + Agent Skill) | Claude and ChatGPT users | ✅ live, read-only, no sign-in | — | §4.5; `ai-connector.md` |
| **Actuarial Tools**: 32 calculators + 3 data sources | People and agents | ✅ live at `/tools` and over MCP | `TOOLS_ENABLED` | §4.5; `actuarial-tools.md` |
| **Cowork**: Sources and Workflows | Practitioners | 🟡 Preview, one approved account | `COWORK_ENABLED` + `PREVIEW_APPROVED_EMAILS` | §4.5; `cowork.md`, `workflows.md`, `cowork-source-inventory.md` |
| **Projects**: the PCPA simulator | PCPA candidates | ✅ live, 3 briefs | — | `pcpa-project.md` |
| **Quiz Battle** | Candidates | ✅ live | — | `quiz-battle.md` |
| **Concept Craft** | Candidates | ✅ live. Its relation labels are AI-written and not yet reviewed | — | `concept-craft.md` |
| **Store** and Gem Shop | Candidates | ✅ live. Sells nothing; links to sellers | — | `store.md` |
| **Actuaria Online** (game layer) | Candidates | 🟡 phases 0–3 built, one approved account | `ACTUARIA_ENABLED` + `ACTUARIA_APPROVED_EMAILS` | `actuaria-online.md` |
| **Listen recordings** | Candidates | 🟡 2 recordings built locally, none uploaded | — | `listen-recordings.md` |
| **Simulated learner** | Us, for content QA | 🟡 offline pipeline built; no live run has succeeded | — | `simulated-learner.md` |
| **Research tab** (Canadian P&C corpus + AI Ask) | Upper-exam candidates | 🅿️ parked | `RESEARCH_TAB_ENABLED` / `RESEARCH_AI_ENABLED` = false | `research-ai-disabled.md`, `research-corpus-plan.md` |
| **Actuarial Agent** (an in-app agent) | Practitioners | 🅿️ Phase A shipped *as the connector*; the in-app part waits on decision D2 | — | `actuarial-agent-product-plan.md` |

---

## 2. Where we are: measured 2026-10-17

These numbers were re-derived from the code, not copied from older documents. The commands
are in Appendix A.

**Engineering health**

| Measure | Value | Trend since 2026-08-31 |
|---|---|---|
| Unit tests | 214 files, **4,178 tests, all passing** | ↑ from 1,392 |
| Lint | 0 errors, 45 warnings | ↓ from 53 warnings |
| E2E | 23 specs, 94 tests. **11 failing in CI**: cowork ×4, exam-pdf ×2, tour ×3, reveal, wiki. Store is flaky | ↓ from 3 failing |
| CI on `main` | **Red since 2026-08-23.** The last green run was #596 on 2026-08-21. PRs merge over red | ⚠️ about 8 weeks |
| Entry chunk | **14,196 kB raw / 3,667 kB gzip**. `virtual:questions-content` is still imported eagerly in `main.tsx` | ⚠️ 3.2× larger |
| `_virtual_wiki-content` chunk | 13,359 kB raw / 4,158 kB gzip (lazy) | ↑ |
| Bundle-size check in CI | none | — |
| Components over 600 / over 1,000 lines | 25 / 5 `.tsx` files. The largest: `Flashcards` 3,181, `ReadinessCard` 1,722, `Landing` 1,720 (still growing), `Settings` 1,131, `Search` 1,079 | `Landing` +287 |
| `prefers-reduced-motion` | used in 12 files | ↑ from 5 |
| `npm audit --omit=dev` | **15 vulnerabilities**: 2 high (`js-yaml`, `ws`), 9 moderate (including `dompurify`, `react-router`), 4 low. No Dependabot | ↑ from 6 |
| Supabase | 48 migrations, 10 edge functions | — |
| Merged PRs | about 128 since 2026-08-31 (#1374 → #1630) | — |

**Content and Fact Check**

| Bank | Questions | Concepts covered in its own bank | Exam status |
|---|---:|---|---|
| Exam P | 716 | 65 / 72 | ready |
| Exam FM | 461 | 91 / 91 | ready |
| MAS-I | 281 | 178 / 178 | ready |
| DISC-DA / RM / IA | 70 / 146 / 221 | 100% each | ready |
| Exam 7 | 144 | 26 / 29 | ready (2026-10-16) |
| MAS-II | 146 | 79 / 109 | beta |
| Exam 5 | 349 | 129 / 138 | beta |
| Exam 6C | 394 (73 off-syllabus) | 137 / 159 | beta |
| Exam 8 | 139 | 32 / 38 | beta |
| Exam 9 | 270 (149 off-syllabus) | 56 / 66 | beta |
| PCPA, 6U | none | 0 / 30, 0 / 80 | beta, development |
| SOA past FM (29 exams) | none | — | development |

Fact Check status by file type:

| | Verified | In review | Disputed | Stale | Unverified | Total |
|---|---:|---:|---:|---:|---:|---:|
| Concepts | 608 | 9 | 2 | 0 | 770 | 1,389 |
| Exam pages | 21 | 3 | 0 | **19** | 0 | 43 |
| Questions | 2,012 | 1 | 0 | 2 | 1,326 | 3,341 |
| Resources | 40 | 0 | 0 | 0 | 708 | 748 |
| **All** | **2,681 (48.6%)** | 13 | 2 | 21 | 2,804 | 5,521 |

There are **2 open critical findings**, both on Exam 6C: *MCT* and *Capital Required*. The
percentage verified fell from 49.9% because about 1,560 new pages were added unverified,
not because anything regressed.

**Built, but not operating.** These are the "promise unbacked" items, and they rank first:

- **CI is red,** so the gate isn't stopping anything.
- **The weekly Validate Sweep has never run the agent.** Its runs skip the agent step,
  so `ANTHROPIC_API_KEY` is evidently not set, and the 2026-10-05 run failed at "Check the record". Every one of the 24 `_runs` summaries
  is from a hand-run session.
- **Reader reports aren't syncing.** The sync step has no Supabase credentials, so readers'
  reports never reach the `.verify` logs.
- **The daily study-plan email may not be sending.** It was found undeployed on 2026-09-28
  and then wired into `deploy-functions.yml`, but no record shows the Resend setup or a
  successful smoke test.
- **Listen recordings play nowhere.** Two have been built; none has been uploaded.
- **Errors aren't collected.** `VITE_ERROR_ENDPOINT` is unset, so production errors reach
  only GA4 `exception` events.

---

## 3. Priorities

Each lane runs in parallel; within a lane, items are worked in the order listed. IDs refer
to §4. Where an item has a former roadmap ID (P0–P4), §4 gives it.

### 3.1 Now

**Lane 1, engineering health (fix the gate first):**
1. **E1: get CI green, then enforce it.** Fix the 11 e2e failures. Gate `tour.spec.ts` on
   `TOUR_ENABLED` rather than deleting it. Then **D14**: make the CI checks required on
   `main`. Until this is done, every other "✅ with tests" in this file is weaker than it
   looks.
2. **E3: move the question bank out of the entry chunk, and add a size budget to CI.**
   This is a contained change to `vite.config.ts` and `main.tsx`. It unblocks E12 (the PWA)
   and stops every question added from slowing the first paint for every reader.
3. **E4: dependency hygiene.** Run `npm audit fix`, add `.github/dependabot.yml`, and
   either document or lift the exact pin on `@supabase/supabase-js@2.39.0`.
4. **E10: small cruft.**
   - Move or delete the 4 stranded question files.
   - Resolve the stray `comprehension-checks/exam-9/` file.
   - Document the `+` space encoding in `wiki_link` in `CLAUDE.md`.
   - Fix the stale `README.md` exam table and counts (G7).

**Lane 2, operations (maintainer actions; no code needed):**
1. **V1: give the Validate Sweep its secrets** (`ANTHROPIC_API_KEY`, the Supabase service
   role), or decide not to run it on a schedule (D19). Then re-run it, and fix the
   "Check the record" failure.
2. **V2: get reader reports syncing**, using the same Supabase credentials.
3. **G1: confirm the daily email is live.** Complete the Resend domain, edge secrets and
   vault secrets, then run the smoke test (`daily-plan-email.md`), and record the result
   in that doc.

**Lane 3, content and Fact Check:**
1. **C0: refresh the generated reports.**
   - Regenerate `Validation Status.md` and `Concepts Without Review Questions.md`; both
     fail `--check`.
   - Refresh CONCEPT_GAPS' generated half, which still lists 633 missing resource pages
     where there are now 0.
   - Drop Exam 8's `"source_pages": "partial"` from `exam_catalog.json`.
2. **V3: delta re-verify the 19 stale exam pages** (6U and 18 FSA pages). Only their links
   were retargeted, in #1629, so the re-check is cheap.
3. **V4 (Wave 3a): verify FM Q351–Q462**, 112 questions. This is the cheapest packet in the
   vault, and it completes a ready exam.
4. **C1: take Exam 8 to ready** (CAS publication plan step 4):
   - fix the *Rating Class* catch-all;
   - write questions for 6 concepts;
   - verify 23 concepts, 12 readings and 132 questions.

### 3.2 Next

These are in order within each lane.

**Engineering health:**
- **E5: split the god components.** `Landing.tsx` first, because it is the one still
  growing; then `Flashcards.tsx`.
- **E6:** golden-vector tests binding `lib/leagues.ts` to its SQL, and `lib/dailyEmail.ts`
  to its edge function.
- **E7:** an error collector (an endpoint or Sentry).

**Learning engine:**
- **L1: instrument learning.** Add `concept_retention`, `reminder_opened` /
  `reminder_session` and `mistake_reviewed`. Every A/B test in this lane waits on L1.
- **L2:** confidence and calibration.
- **L3:** a spaced mistakes deck. It consumes L2.
- **L4:** finish the Practice Exam: syllabus-weighted assembly, a post-exam readiness
  delta, and a hand-off to what to review next.

**Content:**
- **C2:** Exam 9.
- **C3:** Exam 5.
- **C4:** MAS-II.
- **C5:** 6C. It is blocked on decisions D8 and V6.
- **C9: write the SOA ASA-prelim publication plan.** None exists today.
- **C13:** fix the converter dropping the opening paragraph of each examiner's report.
- **C11:** the concept-gap leftovers (*Total Risk*, the 9 ambiguous targets, 21 stubs, 11
  link fixes).

**Experiences:**
- **X2:** a human review of Concept Craft's 5,587 AI-written relation labels. README's rule
  is that nothing is published 100% AI-written without review.
- **X8:** the visual-noise backlog, §3.3–§3.8, plus the edits it calls for in the style
  guide.

**AI and practitioner:**
- **A2:** the rest of Tools §15 items 0–1: the Search page's Tools pill, grid undo, Tail
  Factor, and Annuity solving for any unknown.
- **A3:** replace Cowork's 24 sample entries with real documents.

**Growth:**
- **G2:** a path-preserving redirect from `wiki.actuarialnotes.com`, and Search Console.
- **G3:** confirm the GA4 admin checklist is done.

### 3.3 Later and parked

**Later:**
- E8 the accessibility pass
- E9 codifying `components/ui/` against the style guide
- E11 running the Supabase SQL tests in CI
- E12 PWA and offline
- L5 interleaving
- L6 tunable spacing
- L7 web push
- C6 a PCPA bank
- C7 6U
- C10 the FSA modules
- C12 the rest of the syllabus pipeline
- C14 concept figures for the upper exams
- C15 more distribution simulators
- C16 resource-page leftovers
- A1 personal progress over the connector (OAuth)
- A2 Tools Phase 2 and later
- G4 monetization packaging
- G6 the leagues deferrals
- X3 opening Actuaria to a cohort
- X4 Listen at scale
- X5 a simulated-learner live run
- X6 more Projects briefs

**Parked:**

| Item | What would bring it back |
|---|---|
| R1 the Research tab | A decision to re-launch it, with E1, E3 and the upper-exam content (C2–C5) done first |
| R2 comprehension checks | Decision D11 |
| R3 the onboarding tour | A simpler rebuild |
| A5 the in-app agent | Decision D2 |
| G5 referrals | The economy metrics actually being read |
| X3b Actuaria Phase 4 | Decision D16 |

### 3.4 Proposed (not yet ranked)

_Contributors add items here in a PR. The maintainer ranks them at the next review._

- None yet.

---

## 4. Tracks

Each track lists every open item, with its status, its tier and a link to the subplan that
holds the detail. Shipped work is summarised once, at the head of its track, so this file
doesn't repeat `CLAUDE.md`.

### 4.1 E: Engineering health

Shipped: app CI (`ci.yml`), content-validation CI, VERIFY CI (`verify-check.yml`), error
capture (`lib/errorMonitoring.ts`), typed analytics (`lib/analytics.ts`, 31 events),
23 e2e specs, route-level lazy loading (15 `lazyRoute` routes), and the style guide.

| ID | Item | Status | Tier | Notes and subplan |
|---|---|---|---|---|
| E1 | CI green on `main` | ⬜ red since 2026-08-23 | **Now** | 11 failing e2e tests. Gate `tour.spec.ts` on `TOUR_ENABLED`. Was P0.1 / P0.5. |
| E2 | Required status checks on `main` | ⬜ | **Now** | Maintainer action (D14). Without it, E1 decays again. |
| E3 | Question bank out of the entry chunk; CI size budget | ⬜ regressed (3.67 MB gzip entry) | **Now** | Make `virtual:questions-content` per exam and loaded with a dynamic import. Was P3.3. |
| E4 | Dependency vulnerabilities and Dependabot | ⬜ | **Now** | 15 production vulnerabilities, 2 of them high. `uuid` via `@fortune-sheet` has no fix available. |
| E5 | Split the god components | ⬜ | Next | `Landing` 1,720 (growing), `Flashcards` 3,181, `ReadinessCard` 1,722, `Settings` 1,131, `Search` 1,079. Rule: split whatever file you touch. Was P3.1. |
| E6 | Golden vectors for the duplication contracts | ⬜ | Next | `leagues.ts` ↔ the leagues SQL; `dailyEmail.ts` ↔ the edge function. The pattern to copy is `passRates`. |
| E7 | An error collector | ⬜ | Next | `VITE_ERROR_ENDPOINT` or Sentry, through `registerErrorSink` (`analytics-and-monitoring.md`). |
| E8 | Accessibility pass | 🟡 reduced motion in 12 files; no audit | Later | Add axe to e2e. Was P3.4. |
| E9 | Codify `components/ui/` against the style guide | 🟡 | Later | The style guide *is* the design system; the primitives aren't codified against it. Was P3.2. |
| E10 | Cruft | ⬜ | **Now** | The 4 stranded question files; the stray `comprehension-checks/exam-9/` file; the `+` encoding written into `CLAUDE.md`; 45 lint warnings. |
| E11 | `supabase/tests/run.sh` in CI | ⬜ | Later | Today it is run by hand after touching the Actuaria migrations. |
| E12 | PWA and offline | ⬜ | Later | Blocked on E3. Was P1.6. |

### 4.2 L: The learning engine (Study Mode)

Shipped:
- the mastery ladder with decay;
- the study plan (syllabus or heaviest-first order);
- the readiness score, its ring and its delta arrow;
- streaks, XP and the daily goal, quests and leagues;
- the daily study-plan email (built; see G1);
- the recent-mistakes card;
- **timed quizzes** (`quizTiming.ts`, 2026-09-25) and the **reveal mode** choice;
- the Practice Exam format and the past-paper shelf, the PDF reader, and live pass rates;
- quiz resume, question filters, the difficulty filter, and tappable concept mentions;
- flashcards collected at Level 1, with the level-up ceremony;
- flashcard sync across devices.

| ID | Item | Status | Tier | Notes and subplan |
|---|---|---|---|---|
| L1 | Learning instrumentation | ⬜ | **Next, first** | Add `concept_retention` (a decayed concept answered correctly on revisit), `reminder_opened` / `reminder_session` and `mistake_reviewed`. Without them, §7's Learning and Re-engagement rows can't be measured. |
| L2 | Confidence and calibration | ⬜ | Next | One tap (sure / unsure / guessing) before the reveal; a calibration view; high-confidence errors feed L3. Was P2.7. |
| L3 | Spaced mistakes deck | 🟡 the card has shipped | Next | Re-ask a missed question after a delay (2–3 days), mixed into normal sessions, prioritised by L2. Was P2.8. |
| L4 | Finish the Practice Exam | 🟡 timer and reveal ✅ | Next | Still to do: sitting-shaped, syllabus-weighted assembly; a post-exam readiness delta; a "review next" hand-off. `mock-exam-browser.md`. Was P2.2. |
| L5 | Interleaving in quiz assembly | ⬜ | Later | The study plan doesn't interleave either since keystone concepts were removed. A/B it once L1 exists. Was P2.6. |
| L6 | Tunable spaced-repetition intervals | ⬜ | Later | `DECAY_DAYS_*` are constants in `mastery.ts`. Needs L1. Was P2.1. |
| L7 | Web push reminders | ⬜ | Later | Blocked on E12. Same rules as the email: opt-in, quiet days, framed as an invitation. Was half of P1.3. |
| — | Comprehension checks | 🗑 | — | Retired 2026-09-25. Collection happens at Level 1. Was P1.5; see R2. |
| — | "Fading concepts" card | 🗑 | — | Removed. `lib/masteryAnalytics.ts` stays for the heatmap. Was P2.5. |
| — | In-app "report this question" | ✅ | — | Built as part of VERIFY. What's left is operating it (V2). Was P2.3. |

### 4.3 C: Content and publication

Subplans:
- `cas-publication-plan.md`: the seven gates, the CAS order of work, and its decisions.
- `CONCEPT_GAPS_PLAN.md`: phases A–D are done.
- `syllabus-pipeline.md` and `syllabus-pipeline-review.md`.
- `pdf-question-pipeline.md`.
- `resource-pages.md`.
- `concept-figures.md`.
- `distribution-simulators.md`.
- The `question-writer` skill.

The **rule** for this track: an exam changes status only through
`python3 scripts/publication_readiness.py --check <exam>`.

| ID | Item | Status | Tier | Notes |
|---|---|---|---|---|
| C0 | Refresh the generated reports | ⬜ stale | **Now** | `Validation Status.md` and `Concepts Without Review Questions.md` both fail `--check`. CONCEPT_GAPS still says 633 missing resources (there are 0). Exam 8's `source_pages: partial` should go. |
| C1 | Exam 8 → ready | 🟡 2 of 7 gates | **Now** | CAS plan step 4. The *Rating Class* catch-all; 23 concepts; 12 readings (pages exist, none verified); 6 concepts with no question; 0 of 132 questions verified. |
| C2 | Exam 9 → ready | 🟡 3 of 7 | Next | Step 5. 50 concepts, 9 readings, 10 concepts with no question, 57 questions. |
| C3 | Exam 5 → ready | 🟡 1 of 7 | Next | Step 6. Settle the findings against the v02 outline (D8); 2 catch-alls; 7 concepts with no question; 0 of 349 questions verified; the Spring 2018 booklet still has to be found. |
| C4 | MAS-II → ready | 🟡 1 of 7 | Next | Step 7. The papers are scanned. 28 concepts have no question; the *Bühlmann Credibility* catch-all. |
| C5 | Exam 6C → ready | 🟡 2 of 7 | Next | Step 8. Blocked on D8 (F-001) and the two critical findings (V6). 142 concepts and 67 readings to verify. |
| C6 | A PCPA bank | ⬜ | Later | Step 9. The bank would be vault-written, because the CAS releases no PCPA questions. 29 concepts. |
| C7 | Exam 6U | ⬜ development, 3 of 7 | Later | Step 10. All 45 reading pages exist, none verified. Its objective codes don't match its numbering. |
| C8 | Close P and FM's own gaps | 🟡 each 5 of 7 | **Now** (via V4) | FM: Q351–Q462 unverified; the *Term of Annuity* catch-all. P: *Insurer* is in review; 6 generic concepts have no question. |
| C9 | **An SOA ASA-prelim publication plan** | ⬜ no plan exists | Next | FAM, SRM, ALTAM, ASTAM, PA and ATPA. The SOA publishes sample questions for some of them (`soa-exam-converter`). Their commercial textbooks make D7 relevant. |
| C10 | The 23 FSA modules | ⬜ | Later | They have syllabus pages and concept pages, but no banks. |
| C11 | Concept-gap leftovers | 🟡 | Next | *Total Risk* (GH-101); 9 ambiguous targets (D15); 21 stubs; 11 link-variant aliases; linker noise (D3 in that plan). |
| C12 | Syllabus pipeline packages 4–6 and 8 | 🟡 | Later | Provenance `syllabus:` blocks for the 14 hand-made pages; a concept-page lint. `syllabus-pipeline-review.md` §5. |
| C13 | The converter drops the opening paragraph of each examiner's report | ⬜ | Next | `pdf_extract.py`, found during the Exam 7 campaign. |
| C14 | Concept figures for 6U, 7, 8, 9, PCPA and the DISCs | ⬜ | Later | Builders exist only for P, FM, MAS-I, MAS-II, 5 and 6C. |
| C15 | More distribution simulators | ⬜ | Later | Pareto (both forms), Generalized Pareto, Weibull, Uniform, t, χ², F, GEV. All 10 static SVG embeds are already replaced. |
| C16 | Resource-page leftovers | ⬜ | Later | 3 texts whose contents aren't available; Baer/Rendall (`resource-pages.md` §5). |

### 4.4 V: Fact Check (VERIFY)

Subplans: `verification.md` (the rules), `verification-plan.md` (the waves) and
`validation-agent.md`.

Waves 0 and 1 are done. Wave 2 is mostly done.

| ID | Item | Status | Tier | Notes |
|---|---|---|---|---|
| V1 | The scheduled sweep actually runs | ⬜ never has | **Now** | Maintainer: set the secrets (D19). The 2026-10-05 run failed at "Check the record". |
| V2 | Reader reports sync into the logs | ⬜ | **Now** | Same credentials as V1. Only 2 `human:` comments have ever reached the logs. |
| V3 | Delta re-check of the 19 stale exam pages | ⬜ | **Now** | 6U and 18 FSA pages, made stale by link retargeting in #1629. |
| V4 | Wave 3a: FM Q351–Q462 | ⬜ | **Now** | 112 questions in one cached packet. |
| V5 | Waves 3b–5 | 🟡 Exam 7 and the DISCs done | rides C1–C7 | Each exam's campaign carries its own packets. |
| V6 | The 2 open critical findings | ⬜ | Next | 6C's *MCT* and *Capital Required* (×1.5 vs ÷1.5). |
| V7 | Run summaries for the Exam 7 and DISC-RM runs | ⬜ | Next | The 2026-10-11 runs have no `_runs` summary. Housekeeping. |
| V8 | Verify the 363 concept-gap pages | ⬜ | rides V5 | Written in phases A–D; human review required (that plan's D5). |

### 4.5 A: AI and practitioner products

Subplans:
- `ai-connector.md`
- `actuarial-tools.md` (§15 next, §16 built)
- `cowork.md`, `workflows.md`, `cowork-source-inventory.md`
- `actuarial-agent-product-plan.md`

Shipped:
- **The MCP connector:** search, fetch, syllabi, concepts, practice and marking, prompts,
  and the Agent Skill. It speaks both protocol eras.
- **Actuarial Tools:** 35 tools, each reproducing published work in CI, and run over MCP.
- **Cowork Sources:** 22 publishers, 50 documents, 26 of them real.
- **Workflows:** the library, sub-workflows, CSV data, source tables, and *Run in Claude*.

A standing rule: **the app calls no model and holds no key** (see the decision log, §6.2).

| ID | Item | Status | Tier | Notes |
|---|---|---|---|---|
| A1 | Connector: personal progress (OAuth) and directory listings | ⬜ | Later | `ai-connector.md`, "Not yet". The listings happen outside the repo. |
| A2 | Tools: the rest of V2, then Phase 1 | 🟡 | Next | The Search page's Tools pill; grid undo; "From a saved run"; Tail Factor; Annuity solving for whichever of PV, payment, *n* or *i* is unknown; yield-to-worst. After that: the MCP prompts, the `%%tool%%` marker, saved runs, HTTP/OpenAPI, and analytics (§8.6). Phase 2 tools and later are **Later**. Blocked datasets wait on D3. |
| A3 | Cowork: fill the corpus | 🟡 P1 inventory done | Next | Replace the 24 samples with real documents. 703 `Resources/Books/` pages aren't listed in Cowork (the inventory's §4 count is stale). The P2 rows are open (IFRS 17 needs its vault page first). |
| A4 | Cowork: who can see it | 🅿️ one account | — | Waits on D1. After Preview, Cowork is planned to be Pro-only (D13). |
| A5 | An in-app Actuarial Agent | 🅿️ | Parked | Phase A was delivered *outside* the app, by the connector. Phases B–D (the ontology layer, an eval harness, task assistants) wait on D2. |
| A6 | Doc hygiene in the AI plans | 🟡 | Next | §16's "not built … all of V2" line is fixed (2026-10-17). Still to fix: §11 says "tools mode". The datasets are bundled into `engine.js`, not under `ai/datasets/`. Workflows overtook Phase 4's "Analyses". |

### 4.6 G: Growth, engagement and money

Subplans: `daily-plan-email.md`, `leagues.md`, `seo.md`, `analytics-and-monitoring.md`,
`store.md`.

| ID | Item | Status | Tier | Notes |
|---|---|---|---|---|
| G1 | Confirm the daily email sends | 🟢 built; live state unknown | **Now** | Maintainer: Resend, the secrets, the smoke test. Record the outcome in the doc. |
| G2 | SEO outside the repo | ⬜ | Next | A path-preserving `wiki.actuarialnotes.com` redirect (today it sends every path to the home page); submitting the sitemap. |
| G3 | The GA4 admin checklist | ⬜ unverified | Next | 8 manual steps in `analytics-and-monitoring.md`. |
| G4 | Monetization packaging | 🟡 "Pro" rename; Today's Study Plan is Pro-only | Later | Stripe hasn't changed since July. Waits on D13. Rule: never paywall the core retrieval loop. Was P4.3. |
| G5 | Referrals | 🅿️ | Parked | Was P4.2. Comes back once the gem economy's metrics (§7) are actually read. |
| G6 | Leagues' deliberate deferrals | ⬜ | Later | Realtime boards, study-group leagues (Actuaria's cohorts are the model to copy), league history. |
| G7 | README is stale | ⬜ | **Now** (with E10) | Its exam table shows MAS-I, the DISCs and 7 as Beta / In development, and its counts are old (about 900 concepts, 2,000+ questions, about 140 sources). |

### 4.7 X: Experiences and experiments

| ID | Item | Status | Tier | Notes and subplan |
|---|---|---|---|---|
| X1 | Quiz Battle | ✅ | — | `quiz-battle.md` "Next": its ideas (more players, written papers, a rating) are deliberately out. |
| X2 | Concept Craft: review the relation labels | ⬜ | Next | 5,587 AI-written labels in `data/craftRelations.json`. The doc's "two analytics events" should say three. Server-synced saves are Later. |
| X3 | Actuaria: from one account to a cohort | 🟡 phases 0–3 built | Later | With one account, no cohort reaches `CREW_MIN`, so the risk pool and raids lie dormant. Waits on D1. Phase 4 (ranked play) is parked (D16). |
| X4 | Listen recordings at scale | 🟡 | Later | Upload the first two; split long scripts; fix the numbers stall; choose the voice and the access tier (D12). |
| X5 | Simulated learner: a first live run | ⬜ refused by the model's safeguards | Later | `simulations/runs/` is empty. Rework the persona prompt, then run it. |
| X6 | Projects: more briefs and exams | ✅ 3 PCPA briefs | Later | Another exam's project is one entry in `data/projects.ts`. |
| X7 | Store: Amazon prices | 🟢 | Later | Needs the `AMAZON_CREATORS_*` environment variables, or stays `price: null`. |
| X8 | The visual-noise backlog | 🟡 §3.1, §3.2 and §3.9 done | Next | §3.3–§3.8 are open (the line references in the doc are stale), plus the style-guide edits in §6. The "Hover the graph" hint is false on touch screens. |

### 4.8 R: Parked

| ID | Item | Status | What would bring it back |
|---|---|---|---|
| R1 | The Research tab | 🅿️ both flags off | A maintainer decision, after E1 and E3, and after the upper-exam content (C2–C5). Two doc fixes are needed now: `research-ai-disabled.md` doesn't mention `RESEARCH_TAB_ENABLED`, and `research-corpus-plan.md`'s checklist hasn't been maintained (its boxes are unticked, though some of the topics now exist as `Resources/Books/` pages). Was P4.4. |
| R2 | Comprehension checks (357 files) | 🅿️ rendered nowhere | D11: delete them, or keep them parked. |
| R3 | The onboarding tour | 🅿️ `TOUR_ENABLED = false` | A simpler rebuild. Its e2e spec must follow the flag (E1). |

---

## 5. Dependencies to keep in mind

- **E1 → everything.** A refactor (E5) without a working regression net is a gamble.
- **E3 → E12 → L7.** You can't build a PWA on a 3.7 MB entry, and push needs a service
  worker.
- **L1 → L5, L6, and §7's Learning and Re-engagement metrics.**
- **L2 → L3.** The mistakes deck is prioritised by confidence.
- **V1/V2 → the credibility of every Fact Check badge**, and the README's claim of review.
- **C (each exam) ↔ V (its packets).** An exam campaign is a verification campaign.
- **`lib/tools/` → `quiz/api/_tools/engine.js` (`npm run tools:bundle`) → the connector →
  Workflows' *Run in Claude*.** Tool names are public API.
- **Cowork's growth is resource-page growth.** A real document enters Cowork only as a
  `Resources/Books/` page.
- **Actuaria → Quiz Battle.** It uses one reducer, so Actuaria's Phase 4 would change Quiz
  Battle's "nothing saved" rule.
- **The approved-email lists.** The same one address is the whole of both the Cowork list
  and the Actuaria list. Actuaria's list is also mirrored in SQL. Opening either product to
  more people (D1) means changing each place.

---

## 6. Decisions

### 6.1 Open: the maintainer's to make

Where a default is given, sessions build with it until the decision is made.

| ID | Decision | Source | Blocks | Default meanwhile |
|---|---|---|---|---|
| D1 | Who beyond the one approved account sees **Cowork** and **Actuaria** | `appMode.ts`, `actuaria/access.ts` | A4, X3 | Approved accounts only |
| D2 | Is an **in-app agent** still wanted, given that the app calls no model? If yes: student or practitioner first, in-app or separate, and how it's priced | agent plan §12 | A5 | No in-app agent; the connector is the agent surface |
| D3 | **Dataset licence terms** for the SOA tables, the CAS triangles, and the Bank of Canada data | tools §14 #6 | A2 datasets | Leave them out |
| D4 | Tools access and pricing; HTTP API keys; open-sourcing the engine | tools §14 #2–8 | A2 HTTP | Free; no HTTP endpoint |
| D5 | Does a bank written entirely by the vault count as **ready**? The DISCs were promoted on that assumption | CAS plan §5 D1 | the C track | Yes, but record it |
| D6 | Verify the **off-syllabus** questions (249 CAS)? | CAS D2, verification §7.3 | V5 sizing | No |
| D7 | Is a **medium confidence ceiling** enough for commercial-only sources? | CAS D3, verification §7.6 | C9, MAS-II | Yes |
| D8 | 6C's **F-001**, and Exam 5's **v02 outline** findings | CAS D4, verification §7.2 | C3, C5 | — (needs a call) |
| D9 | The **46 orphan concepts** | verification §7.4 | V5 | Leave them unverified |
| D10 | Exam 7 leftovers: questions on dropped readings (Patrik, Brehm/Goldfarb, England & Verrall); 2012 q20 filed under Exam 9 | CAS §4.1 | — | Keep them as they are |
| D11 | **Delete** the retired comprehension checks (the folder, the parser, the skill), or keep them parked | `flashcard-collection.md` | R2 | Keep them parked |
| D12 | Listen: the voice; whether it is Pro-only | `listen-recordings.md` | X4 | The test voice; free |
| D13 | **The free / Pro boundary** (Cowork after Preview, Tools saved runs, practice packs) | old P4.3, `cowork.md` | G4, A4 | No change |
| D14 | **Make CI a required check on `main`** | the 2026-08-31 assessment | E2 | — (a repo setting) |
| D15 | The 9 ambiguous concept-gap targets, and the 21 stubs | CONCEPT_GAPS §13 | C11 | Link the existing pages, as proposed |
| D16 | Actuaria Phase 4: ranked play and seasons | `actuaria-online.md` §9 | X3b | Not built |
| D17 | The DISC link design | CAS D5 | — | The current design |
| D18 | The open owner decisions in `syllabus-pipeline-review.md` §4 (D2, D3: applied implicitly, never written up) | that doc | C12 | As applied |
| D19 | Run the Validate Sweep on a schedule (API cost) or by hand | `validation-agent.md` | V1 | By hand |

### 6.2 Settled: don't re-open without a new reason

- **Nothing is invented.** Figures, ratios, links, chapters and prices are transcribed with
  their source, never constructed. This holds across the vault, the Store, Tools, Cowork
  and the pass rates.
- **The app calls no model and holds no key.** The in-browser API-key deploy in Workflows
  was removed as a security risk. *Run in Claude* goes through the connector instead.
- **Comprehension checks no longer gate collection.** A card is collected at Level 1
  (2026-09-25).
- **The Exam Readiness Score is the one readiness number.** Keystone concepts were removed
  (2026-10-02).
- **The Fading Concepts card was removed.** The heatmap keeps its engine.
- **The onboarding tour is parked**, pending a simpler rebuild.
- **The Research tab stays parked.** Stop re-litigating it at every review (the 2026-08-31
  assessment). See R1 for what would bring it back.
- **Referrals are parked** until the economy metrics are read.
- **Quiz Battle saves nothing.** Matchmaking pairs on the exam alone.
- **The Store sells nothing.** The Gem Shop is the only place gems are spent.
- **An exam's status changes only through `publication_readiness.py --check`.**
- **CAS D6 was settled the open-source way** (2026-10-11).
- **Actuaria D1 is resolved.** D2–D8 are built with their defaults.
- **The Actuarial Agent's Phase A ships as the MCP connector, outside the app.**

---

## 7. Success metrics

| Category | Metric | Status |
|---|---|---|
| Activation | % of new users finishing a first quiz on day 0 | Instrumented (`lib/funnel.ts`) |
| Retention | D1 / D7 / D30 return | Instrumented (`day2_return` + GA4) |
| Engagement | Median streak; daily-goal completion | Instrumented |
| Learning | Per-concept retention: correct on revisit after the decay window | ⬜ L1 |
| Re-engagement | Daily email → session conversion | ⬜ L1, and G1 first |
| Calibration | The gap between confidence and accuracy | ⬜ L2 |
| Economy | Gems earned vs spent; quest-vs-plan adherence | 🟡 `quest_claimed` only |
| Social | League retention by final rank | ⬜ needs a rollover query |
| Content trust | % of files verified (48.6%); open critical findings (2); stale files (21) | Measured (`Validation Status.md`) |
| Publication | Exams ready (7 of 43); gates passed per beta exam | Measured (`publication_readiness.py`) |
| Reliability | Crash-free sessions; CI green on `main` | 🟡 the `exception` events exist; **CI is red** |
| Performance | Entry chunk gzip (today 3,667 kB); LCP / INP | ⬜ E3 adds the budget |
| Monetization | Trial → paid; Pro retention | Stripe data |

---

## 8. Plan index

Every planning document in the repo, what it is for, and how healthy it is. A doc marked
**needs refresh** says something about status that the code no longer bears out; its row in
§4 gives the true status.

| Document | Role | Covers | State | Last touched |
|---|---|---|---|---|
| `docs/roadmap.md` | **This file**: governance, priorities, status | Everything | Active | 2026-10-17 |
| `docs/cas-publication-plan.md` | Subplan: CAS exams to ready | C1–C7 | Active, current | 2026-10-16 |
| `docs/verification-plan.md` | Subplan: verification waves | V1–V8 | Active. Its snapshot is from 9 Oct | 2026-10-09 |
| `CONCEPT_GAPS_PLAN.md` | Subplan: missing concept pages | C11 | Phases A–D done. **Needs refresh** (its generated half) | 2026-10-10 |
| `docs/actuarial-tools.md` | Subplan: Tools | A2 | Active. **Needs refresh** (A6) | 2026-10-10 |
| `docs/cowork-source-inventory.md` | Queue: Cowork sources | A3 | Active. **§4 counts are stale** | 2026-09-20 |
| `docs/actuaria-online.md` | Build spec: Actuaria | X3 | Phases 0–3 built; Phase 4 parked | 2026-10-05 |
| `docs/visual-noise-review.md` | Backlog: UI copy | X8 | Active. Its line references are stale | 2026-10-05 |
| `docs/syllabus-pipeline-review.md` | Review and work packages | C12 | Packages 1–3 and 9 done; 4–8 partial | 2026-10-05 |
| `docs/actuarial-agent-product-plan.md` | Plan: an in-app agent | A5 | 🅿️ Phase A shipped as the connector; the rest waits on D2 | 2026-10-09 |
| `docs/research-corpus-plan.md` | Plan: the Research corpus | R1 | 🅿️ its checklist hasn't been maintained | 2026-10-05 |
| `docs/research-ai-disabled.md` | Re-enable checklist | R1 | 🅿️ Needs to mention `RESEARCH_TAB_ENABLED` | 2026-06-14 |
| `docs/comprehension-check-backlog.md` | Backlog | R2 | 🅿️ parked | 2026-10-05 |
| `docs/assessment-2026-08-31.md` | A one-off audit | — | **Historical.** Its recommendations are folded in here | 2026-10-05 |
| `docs/validation-agent-first-run.md` | A first-run record | — | Historical; every item closed | — |
| `docs/pcpa-project.md`, `quiz-battle.md`, `concept-craft.md`, `store.md`, `workflows.md`, `cowork.md`, `ai-connector.md`, `listen-recordings.md`, `simulated-learner.md`, `daily-plan-email.md`, `leagues.md`, `seo.md`, `analytics-and-monitoring.md` | Feature design docs. Each has a short "next", "not yet" or "deferrals" list | X, A and G rows | Reference | various |
| All other `docs/*.md` | How a module works | — | Reference; no open items | various |

---

## 9. Principles

These hold for every item in §4. When two items tie on §0.3, the one that serves these
principles better wins.

**Engineering:**
- **Foundations before features.** A red gate, a stalled pipeline or a bloated entry chunk
  comes before a new surface.
- **Small, pure, tested modules.** Logic goes in `lib/`; React stays thin. Split a big file
  as you touch it.
- **Flag every risky launch.** Annotate the flag `: boolean`, so both branches still
  compile. Never "clean up" parked code as if it were dead.
- **Measure what matters.** No engagement or learning feature ships without the event
  that judges it.
- **Operate what you build.** A system with a badge on screen (Fact Check, the email, the
  recordings) has to be running before it is extended.

**Learning science** (the lens for Study Mode; the reasoning is in the 2026-07-24 revision
of this file, in git history):
1. **Retrieval beats re-reading.** Never pay the same XP for a passive surface.
2. **Spacing and desirable difficulty.** Decay forces revisits, and XP favours hard and
   decaying concepts. Interleaving (L5) is the open gap.
3. **Calibration.** Knowing what you know matters as much as knowing it (L2).
4. **Errors are the most valuable learning events.** A miss deserves elaborative feedback
   and a re-test after a delay (L3).
5. **Scaffold novices.** A first contact with a concept should be the concept page (the
   pre-quiz concept list), not a cold retrieval attempt.
6. **Self-determination, not coercion.** Rewards are informational and claimed by the
   learner; streak mechanics are forgiving; leagues are opt-in and reset weekly. Don't
   raise rewards to fix an engagement dip; fix the learning value instead.
7. **Implementation intentions.** A reminder fires at the time the learner chose, and
   reads as an invitation.

**Content:** nothing is invented; the vault is never 100% AI-written without human review;
a fact is verified only against a citable source (`verification.md`, P1).

---

## 10. Risks

| Risk | Signal | Mitigation |
|---|---|---|
| **The gate is decorative.** CI has been red for 8 weeks and PRs merge over it | CI on `main` | E1 + E2 now. Treat a red `main` as a stop-the-line event. |
| **Trust surfaces with nothing behind them** (Fact Check, the email, Listen) | the §2 "built, not operating" list | Operate before extending. Lane 2 of Now. |
| **The bundle grows with the content** | entry chunk gzip | E3 + a CI budget. Every new question currently slows first paint for everyone. |
| **Breadth outruns depth.** About 128 PRs since August, mostly new surfaces, while Phase 2 learning items didn't move | §4.2 rows unchanged at a review | §0.3 rule 4: new surfaces wait until their lane's rules 1–3 are clear. |
| **AI-written content without review** (Craft labels, concept-gap pages) | unverified counts | X2, V8. The README's promise of human review. |
| **Gamification drifting from learning** | quest-vs-plan ratio; per-concept retention | L1 first; keep rewards claim-based. |
| **Products gated to one account** | D1 open | Decide D1. A cohort feature can't be tested by one person. |
| **Dependency vulnerabilities** | `npm audit` | E4 + Dependabot. |
| **Copied logic drifting apart** (leagues SQL, email edge function) | none today | E6 golden vectors. |
| **God components spreading** | line counts | E5; split as you touch. |

---

## Appendix A: Re-measuring §2

Run these at every review. They are read-only, apart from `npm run build`, which writes to
`quiz/dist/`.

```bash
# Engineering
cd quiz && npm ci && npm test && npm run lint && npm run build   # build prints chunk sizes
npm audit --omit=dev
find src -name '*.tsx' -not -name '*.test.tsx' | xargs wc -l | sort -n | tail -15
grep -rl 'prefers-reduced-motion' src | wc -l
ls e2e/*.spec.ts | wc -l
# CI on main: GitHub → Actions → CI, branch main (or the GitHub MCP tool actions_list)

# Content and Fact Check (from the repo root)
python3 scripts/publication_readiness.py              # CAS gates; --body SOA, --exam <id> for detail
python3 scripts/verify_check.py                       # 0 errors expected
python3 scripts/generate_validation_status.py --check # exit 1 = Validation Status.md is stale
python3 scripts/generate_coverage_report.py --check   # exit 1 = the coverage report is stale
python3 scripts/find_concept_gaps.py                  # --check exits 1 while a pinned gap is open
for d in questions/*/; do echo "$d $(find "$d" -name '*.md' | wc -l)"; done
ls Concepts/*.md | wc -l; ls Resources/Books/*.md | wc -l
```

## Appendix B: Revision history

- **2026-10-17. Consolidation.** This file became the one roadmap for every product line,
  absorbing:
  - the 2026-07-24 learning-app roadmap (whose phases are mapped onto tracks E, L and G);
  - the 2026-08-31 assessment (now historical);
  - the status of every subplan.

  It also added the governance rules (§0), the decision register (§6) and the plan index
  (§8). What changed since 2026-07-24:
  - **Shipped:** timed quizzes and the reveal mode (P2.2 is mostly done); the report flow
    (P2.3); VERIFY at scale (49% verified); seven exams ready; banks for 5, 6C, 7, 8, 9,
    MAS-II and the DISCs (3,341 questions); the AI connector; Actuarial Tools; Cowork and
    Workflows; Quiz Battle; Concept Craft; the Store; Actuaria phases 0–3; Projects (PCPA);
    SEO prerendering; the PDF → bank and syllabus pipelines.
  - **Retired:** P1.5 (comprehension checks) and P2.5 (the fading concepts card).
  - **Regressed:** CI red since 08-23; the entry chunk 3.2× larger; production
    vulnerabilities 6 → 15.
  - **Unchanged:** P2.1, P2.6, P2.7, P2.8 (the deck), P1.6, P3.1–P3.4, P4.2–P4.4.
- **2026-07-24.** The daily study-plan email (P1.3, half) and the recent-mistakes card
  (P2.8, first surface).
- **2026-07-11 and earlier.** Phases 0 and 1 shipped: CI, monitoring, analytics, e2e,
  streaks, XP, quests, leagues.
