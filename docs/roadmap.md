# Roadmap: Actuarial Notes

_Last reviewed: **2026-10-17** against `main` @ `1a47980` (and updated by the next-phase branch) · Next review due: **2026-10-31**_

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
| **Content vault**: 43 exam pages (12 CAS, 31 SOA), 1,389 concepts, 748 resources, 3,341 questions | Candidates and practitioners | ✅ live. 7 exams ready, 6 beta, 30 in development | `examStatus.ts` | §4.3; `content-plan.md` |
| **Fact Check / VERIFY** | Every reader | 🟢 operating by hand. 48.6% of files verified; the weekly sweep has never run the agent | `FACT_CHECK_UI_ENABLED` | §4.4; `verification.md`, `verification-plan.md` |
| **AI connector** (MCP server + Agent Skill) | Claude and ChatGPT users | ✅ live, read-only, no sign-in | — | §4.5; `ai-connector.md` |
| **Actuarial Tools**: 32 calculators + 3 data sources | People and agents | ✅ live at `/tools` and over MCP | `TOOLS_ENABLED` | §4.5; `actuarial-tools.md` |
| **Cowork**: Sources and Workflows | Practitioners | 🟡 Preview, one approved account | `COWORK_ENABLED` + `PREVIEW_APPROVED_EMAILS` | §4.5; `cowork.md`, `workflows.md`, `cowork-source-inventory.md` |
| **Projects**: the PCPA simulator | PCPA candidates | ✅ live, 3 briefs | — | `pcpa-project.md` |
| **Quiz Battle** | Candidates | ✅ live | — | `quiz-battle.md` |
| **Concept Craft** | Candidates | ✅ live. Its relation labels are AI-written and not yet reviewed | — | `concept-craft.md` |
| **Store** and Gem Shop | Candidates | ✅ live. Sells nothing; links to sellers | — | `store.md` |
| **Actuaria Online** (game layer) | Candidates | 🟡 phases 0–3 built, one approved account | `ACTUARIA_ENABLED` + `ACTUARIA_APPROVED_EMAILS` | `actuaria-online.md` |
| **Tutor** (a guided walk through the exam; purely algorithmic) | Exam 5 candidates | 🟡 Phase 1 built, Preview: one approved account | `TUTOR_ENABLED` + `TUTOR_STAGE` / `TUTOR_APPROVED_EMAILS` | `tutor.md` |
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
| Unit tests | 214 files, **4,181 tests, all passing** | ↑ from 1,392 |
| Lint | 0 errors, 45 warnings | ↓ from 53 warnings |
| E2E | 23 specs, 116 tests. **All passing locally** (113 passed, 3 tour tests skipped while `TOUR_ENABLED` is off), one worker, no retries, on 2026-10-17. Fixed: tour ×3 (gated on the flag), exam-pdf ×2, wiki, flashcard-focus and the flaky store test, all of them tests that had fallen behind the UI | was 11 failing |
| CI on `main` | **Red since 2026-08-23** (last green: #596, 2026-08-21), and **no runs at all since 2026-10-10** (re-checked later on 2026-10-17). PRs merge without a gate | ⚠️ about 8 weeks |
| Entry chunk | **2,626 kB raw / 730 kB gzip** (first paint, entry + CSS: 749 kB). The question bank is a lazy 11.6 MB chunk since E3; it was 14,196 kB / 3,667 kB | ↓ 5× |
| `_virtual_wiki-content` chunk | 13,359 kB raw / 4,158 kB gzip (lazy) | ↑ |
| Bundle-size check in CI | `npm run size`: first paint ≤ 900 kB gzip (E3) | new |
| Components over 600 / over 1,000 lines | 25 / 5 `.tsx` files. The largest: `Flashcards` 3,181, `ReadinessCard` 1,722, `Landing` 1,720 (still growing), `Settings` 1,131, `Search` 1,079 | `Landing` +287 |
| `prefers-reduced-motion` | used in 12 files | ↑ from 5 |
| `npm audit --omit=dev` | **14 vulnerabilities, 0 high** (10 moderate, 4 low) after `npm audit fix`. What's left needs a major upgrade (`react-router` 7, `katex`) or has no fix (`uuid` via `@fortune-sheet`). Dependabot configured | ↓ from 15 (2 high) |
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
| MAS-II | 168 | 98 / 98 | beta |
| Exam 5 | 349 | 129 / 138 | beta |
| Exam 6C | 394 (73 off-syllabus) | 137 / 159 | beta |
| Exam 8 | 139 | 32 / 38 | beta |
| Exam 9 | 270 (149 off-syllabus) | 56 / 66 | beta |
| PCPA, 6U | none | 0 / 30, 0 / 80 | beta, development |
| SOA past FM (29 exams) | none | — | development |
| Exam 6I, Exam 6T | none | — | development |
| Non-exam requirements (VEE ×3, PAF, ASF, FAP, APC, DMAC, FAC, COP) | none | — | development |

Fact Check status by file type:

| | Verified | In review | Disputed | Stale | Unverified | Total |
|---|---:|---:|---:|---:|---:|---:|
| Concepts | 608 | 9 | 2 | 0 | 770 | 1,389 |
| Exam pages | 21 | 3 | 0 | **19** | 0 | 43 |
| Questions | 2,012 | 1 | 0 | 2 | 1,326 | 3,341 |
| Resources | 40 | 0 | 0 | 0 | 708 | 748 |
| **All** | **2,681 (48.6%)** | 13 | 2 | 21 | 2,804 | 5,521 |

There are **2 open critical findings**, both on Exam 6C: *MCT* and *Capital Required*. *(Both closed 2026-10-18 by V6; the vault is now 54.8% verified with 0 disputed files — Appendix B.)* The
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
1. **E1: get CI green, then enforce it.** 🟡 2026-10-17: the e2e suite passes locally
   (`tour.spec.ts` follows `TOUR_ENABLED`; the other failures were tests behind the UI).
   **New blocker, the maintainer's:** the Actions API lists **no workflow run of any kind
   after 2026-10-10 09:07 UTC** (#1613's merge), though all five workflows are `active` and
   about 20 PRs have merged since. CI isn't red; it isn't running. Check the repository's
   Actions settings and billing/minutes. Left after that: see CI go green on `main`, then
   **D14**: make the CI checks required on `main`. Until both are done, every other "✅
   with tests" in this file is weaker than it looks.
2. ~~**E3: move the question bank out of the entry chunk, and add a size budget to CI.**~~
   ✅ 2026-10-17: `fetchAllQuestions` dynamic-imports the bank; the entry is 730 kB gzip
   (from 3,667), and `npm run size` holds first paint to 900 kB in CI. E12 is unblocked.
3. **E4: dependency hygiene.** 🟡 2026-10-17: `npm audit fix` (0 high left), and
   `.github/dependabot.yml` (weekly, grouped). The `@supabase/supabase-js@2.39.0` pin is
   documented there and kept out of Dependabot. Left: the majors (`react-router` 7,
   `katex`), and lifting the Supabase pin in a PR of its own, tested signed in.
4. **E10: small cruft.** 🟡 2026-10-17: the stray check moved to `exam-fm`, the `+`
   encoding is in `CLAUDE.md`, the README is current (G7 ✅), and **lint is at 0 warnings**
   (the 11 `exhaustive-deps` fixed; the 34 `only-export-components` exports moved out of
   their component files). Left: the 4 stranded question files, which VERIFY can't move or
   delete (V9, §3.4).
5. ~~**E6: golden vectors for the duplication contracts.**~~ ✅ 2026-10-17, pulled from Next:
   `lib/duplicationContracts.test.ts` runs the email edge function's mirrored helpers
   against the same vectors as `dailyEmail.ts`, and evaluates the newest leagues rollover
   SQL against `leagues.ts` for every rank, cohort size and tier.

**Lane 2, operations (maintainer actions; no code needed):**
1. ~~**V1: the Validate Sweep.**~~ ✅ 2026-10-17: **D19 settled — by hand, no schedule.** The
   workflow's cron is gone (`workflow_dispatch` only), and `validation-agent.md` says how a
   sweep is run. "Check the record" passes locally, PyMuPDF or not; it can't be re-checked
   in CI until Actions run again (see E1).
2. **V2: get reader reports syncing.** It needs `SUPABASE_URL` and
   `SUPABASE_SERVICE_ROLE_KEY` as repository secrets, and a hand-run of the sweep (or
   `python3 scripts/sync_reports.py --commit` locally) to move them, now that nothing runs
   it weekly.
3. **G1: confirm the daily email is live.** Complete the Resend domain, edge secrets and
   vault secrets, then run the smoke test (`daily-plan-email.md`), and record the result
   in that doc.

**Lane 3, content and Fact Check** (ordered by `content-plan.md`'s phases since 2026-10-18):
0. ~~**Content plan, Phase 1: ready means ready.**~~ ✅ 2026-10-18: every `ready` exam passes all
   seven gates (P and FM were at 5 and 6, C8); `publication_readiness.py --hold` guards them in CI;
   no open critical finding is left (V6: *MCT*, *Capital Required* and seven more pages, ÷1.5 not
   ×1.5); V10's topic tags and C18's slips done, bar four FM retags. Next is Phase 2: the
   converter (C13), then the beta exams.
0a. **Content plan, Phase 2** (in progress, 2026-10-18): C13 done (the writer fixed, 83 report
   paragraphs restored); every beta exam with a bank passes G3 and G6 (62 vault-written questions,
   60 verified); Exam 8 at 6 / 7, held only by D20; V7 done. Exam 9's first round done; MAS-II's
   first round done 18 Oct (4 / 7). D8, D22, D23 and D24 settled 18 Oct (D20's default stands),
   and applied the same day: Exam 5's and MAS-II's pages verified (G1 ✅ on both), 6C's
   re-transcribed (`in_review`, three older findings open), 29 McElreath questions
   `off_syllabus`, Exam 9's held questions settled bar `cas9-an-009` (content plan, Phase 2).
   Exam 9's open-text packets done the same day (34 of 35 concepts verified; 5 / 7, held by
   *Enterprise Risk Management* and two readings). Next: Exam 5's papers → 6C → PCPA's bank (C6).
0b. **Content plan, Phase 3: the SOA ASA prelims** (started 2026-10-18): C9's campaign table written (content plan
   §3.1a — what the SOA publishes for each prelim, the readings, the order SRM → FAM → ASTAM,
   ALTAM → PA, ATPA); the linker fixed (C17 and the noise/cut-short links), so G2 passes on all six
   prelims and G3 on all but ALTAM, every changed page re-checked against its syllabus PDF. **SRM is
   beta** (18 Oct): its bank is the SOA's 72 live sample questions, converted, plus five
   vault-written questions (verified) for the concepts the set misses; G1, G2, G3 and G6 pass.
   **FAM is beta** (19 Oct): its bank is the SOA's two sample sets, 268 live questions (FAM-S 103,
   FAM-L 165), converted, plus six vault-written questions (verified) for the concepts the sets miss;
   G1, G2, G3 and G6 pass. Next: ASTAM and ALTAM's written-answer sets, then the SRM and FAM
   fact-check campaigns (G4, G5, G7).
1. ~~**C0: refresh the generated reports.**~~ ✅ 2026-10-17: both reports regenerated and
   passing `--check`, CONCEPT_GAPS' generated half refreshed (0 missing resources), and
   Exam 8's `"source_pages": "partial"` dropped.
2. ~~**V3: delta re-verify the stale exam pages.**~~ ✅ 2026-10-17: the 18 FSA pages are
   verified again (run `ad0b`). Exam 6U is back to `in_review` (its 2026-10-09 findings are
   still open). 6C stays stale behind its critical findings (V6).
3. ~~**V4 (Wave 3a): verify FM Q351–Q462.**~~ ✅ 2026-10-17: all 112 verified (runs `48b2`,
   `63b1`); every key agrees. 12 minor findings stay open: 10 topic tags that aren't in
   `ontology_map.py`, and SOA's own day-1/day-10 wording on fm-358.
4. **C1: take Exam 8 to ready** (content plan §3.1, step 2). 🟡 2026-10-17: **5 of 7
   gates.** Done: the *Rating Class* catch-all (a new *Rate Class Validity* page); 11
   vault-written questions for the 6 untested concepts; the page, 23 of 24 concepts, 11 of 12
   readings and every on-syllabus question on the 8 papers verified (166; 34 of them Exam 9's).
   Left, and neither can be done from the repo alone:
   - **G4:** *Risk*'s ERM section has 3 minor findings. Its reading, Brehm et al., has no free
     copy, so the section needs that reading or needs cutting. The CAS sense the exam uses is
     verified.
   - **G5:** the ISO CGL rating plan is supplied only in the CAS study kit. The maintainer
     either reads a copy or accepts it as unverifiable (new decision **D20**).
   Then `publication_readiness.py --check 8`, and the promotion is the maintainer's.

### 3.2 Next

These are in order within each lane.

**Engineering health:**
- **E5: split the god components.** `Landing.tsx` is split (1,720 → 697 lines); next
  `Flashcards.tsx`.
- **E7:** an error collector (an endpoint or Sentry).

**Learning engine:**
- ~~**L1: instrument learning.**~~ ✅ 2026-10-17: `concept_retention`, `reminder_opened` /
  `reminder_session` and `mistake_reviewed` (`lib/learningSignals.ts`; how to read them is in
  `analytics-and-monitoring.md`). The email's link carries UTM parameters, so it deploys with
  the edge function. L5, L6 and §7's two rows are unblocked; they need data to accrue.
- **L2:** confidence and calibration.
- **L3:** a spaced mistakes deck. It consumes L2.
- **L4:** finish the Practice Exam: syllabus-weighted assembly, a post-exam readiness
  delta, and a hand-off to what to review next.

**Content:**
- **C2:** Exam 9.
- **C3:** Exam 5.
- **C4:** MAS-II.
- **C5:** 6C. D8 settled 2026-10-18; V6 closed in Phase 1.
- ~~**C9: write the SOA ASA-prelim publication plan.**~~ ✅ 2026-10-18, content plan §3.1a.
- **C11:** the concept-gap leftovers (*Total Risk*, the 9 ambiguous targets, 21 stubs, 11
  link fixes).

**Experiences:**
- **X2:** a human review of Concept Craft's 5,598 AI-written relation labels. README's rule
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

- **V9: a way to move or retire a content file under VERIFY.** P3 (append-only) forbids
  deleting or renaming a `.verify/` log, and `verify_check.py` fails a log whose `target:` no
  longer exists, so a fact-checked file can't be moved or deleted at all. That blocks E10's
  4 stranded question files (`exam-p/probability/`, `exam-p/statistics/`, `exam-fm/interest/`),
  all verified, which the build never collects. One shape: an appended `moved_to:` /
  `retired:` entry that the gate accepts in place of the target. It changes the VERIFY
  rules, so it is the maintainer's call. *(Proposed 2026-10-17.)*
- ~~**C17: teach the syllabus writer the link names #1629 chose.**~~ ✅ 2026-10-18 (content plan Phase 3: the writer keeps a page's chosen reading links and *Key concepts:* lines; `--all --check` clean, held by a test). `syllabus_write.py --check`
  is no longer clean on 15 of the 18 FSA pages: re-rendering for a new sitting would put
  back the old, unwritten link names, and would link CP-312's "Part 1" citation to the
  Part 2 (2020) page, because the two pages share a title. The writer needs a citation →
  page table (or to read the existing page's links) before the next sitting is rendered.
  *(Found by V3, 2026-10-17.)*
- ~~**C18: two resource-page slips found by V3.**~~ ✅ 2026-10-18 (content plan Phase 1). The Atkinson & Dallas page carries the
  Ch. 9 reading's code (ILA101-103-25) though ILA-101 also assigns its Ch. 11 under
  ILA101-104-25, so that card shows the wrong code; the COPLFR page's file name says 2024
  but its `Year` is 2025. *(2026-10-17.)*
- ~~**V10: settle the FM topic tags.**~~ 🟡 2026-10-18 (content plan Phase 1): 13 topics added to
  `ontology_map.py`, 8 findings resolved; fm-370, 379, 391 and 421 still need a retag. V4 left 10 minor findings on fm-358…406: their
  `topic` values (*Effective Rate*, *Convexity*, *Real Rate of Interest* …) aren't in
  `scripts/ontology_map.py`. Either add the nine topics there (each is a syllabus term with
  a concept page), or retag the questions, which makes them stale until re-verified.
  *(2026-10-17.)*
- **L9: a written part counts for what the reader marked it.** The quiz records a written
  part's self-grade (`manualGrades`) but `effectiveIsCorrect` skips essay parts, and a
  question with no graded part left returns **correct**: 144 of Exam 5's 278 lettered
  questions and 58 of its 72 unlettered ones are written-only, so pressing *Check answers*
  on one levels up every concept it is tagged with, whatever was written. The same holds
  for the written CAS banks (6C, 7, 8, 9). Proposed: a written part counts as its
  self-grade (full credit correct, partial and no credit not — the rule the Tutor already
  uses, `lib/tutor/bank.ts`), and an ungraded one counts for nothing. It changes how every
  CAS written exam's mastery and readiness move, so it is the maintainer's call.
  *(Found planning the Tutor, 2026-10-18.)*

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
| E1 | CI green on `main` | 🟡 green locally, 2026-10-17 | **Now** | Fixed: `tour.spec.ts` skips while `TOUR_ENABLED` is off; `exam-pdf` (zoom is keys and gestures now; Read PDF stacks in the popup), `wiki` (the exam strip replaced the Exam dropdown), `flashcard-focus` (cards got shorter) and `store` (a race on the measured column width). The cowork and reveal failures no longer reproduce. Left: a green CI run on `main`. Was P0.1 / P0.5. |
| E2 | Required status checks on `main` | ⬜ | **Now** | Maintainer action (D14). Without it, E1 decays again. |
| E3 | Question bank out of the entry chunk; CI size budget | ✅ 2026-10-17 | — | `fetchAllQuestions` dynamic-imports `virtual:questions-content` (one lazy chunk; per-exam chunks would only pay once a surface asks for one exam's questions). Entry 3,667 → 730 kB gzip. `npm run size` in `ci.yml`, budget 900 kB. Was P3.3. |
| E4 | Dependency vulnerabilities and Dependabot | 🟡 | **Now** | Done: `npm audit fix` (15 → 14, 2 high → 0); `.github/dependabot.yml`, npm and Actions weekly. Left: `react-router` 6 → 7 and `katex` (majors, moderate advisories); `uuid` via `@fortune-sheet` has no fix; lift the Supabase pin (2.39 → 2.1xx) in its own PR, tested against a real project — Dependabot ignores it until then. |
| E5 | Split the god components | 🟡 | Next | `Landing` split to 697 (2026-10-17: the builder's logic in `lib/quizBuilder.ts`, its parts in `components/landing/`, checked against the Quiz-tab e2e specs locally); `Flashcards` 3,181, `ReadinessCard` 1,722, `Settings` 1,131, `Search` 1,079. Rule: split whatever file you touch. Was P3.1. |
| E6 | Golden vectors for the duplication contracts | ✅ 2026-10-17 | — | `lib/duplicationContracts.test.ts`: the edge function's helpers are cut from its source and run on the same vectors as `dailyEmail.ts`; the newest `league_rollover_if_due()`'s constants are read and its CASE checked against `zoneForRank`. Proved by breaking each copy. |
| E7 | An error collector | ⬜ | Next | `VITE_ERROR_ENDPOINT` or Sentry, through `registerErrorSink` (`analytics-and-monitoring.md`). Where errors are kept (Sentry, a Supabase table behind a service-role endpoint, or Vercel's short-lived logs) and the secret it needs are the maintainer's; a session can build whichever is chosen. |
| E8 | Accessibility pass | 🟡 reduced motion in 12 files; no audit | Later | Add axe to e2e. Was P3.4. |
| E9 | Codify `components/ui/` against the style guide | 🟡 | Later | The style guide *is* the design system; the primitives aren't codified against it. Was P3.2. |
| E10 | Cruft | 🟡 | **Now** | Done: the stray check is in `exam-fm`; the `+` encoding and the one-level `questions/<bank>/` rule are in `CLAUDE.md`; lint at 0 warnings (2026-10-17). Left: the 4 stranded question files (blocked on V9, §3.4). |
| E11 | `supabase/tests/run.sh` in CI | ⬜ | Later | Today it is run by hand after touching the Actuaria migrations. |
| E12 | PWA and offline | ⬜ | Later | E3 is done, so nothing blocks it now. Was P1.6. |

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
| L1 | Learning instrumentation | ✅ 2026-10-17 | — | `concept_retention` (the first answer on a concept past its decay window, once per decay episode, `retained` true or false), `reminder_opened` / `reminder_session` (the email's `utm_source`, then the first quiz within 6 h), `mistake_reviewed`. Pure rules in `lib/learningSignals.ts`; GA4 custom definitions to add are in `analytics-and-monitoring.md` (G3). |
| L2 | Confidence and calibration | 🟡 in the Tutor (L8), Exam 5 | Next | One tap (sure / unsure / guessing) before the reveal; a calibration view; high-confidence errors feed L3. Built inside the Tutor (`lib/tutor/`); the quiz itself still has no tap. Was P2.7. |
| L3 | Spaced mistakes deck | 🟡 the card has shipped; successive relearning in the Tutor | Next | Re-ask a missed question after a delay (2–3 days), mixed into normal sessions, prioritised by L2. The Tutor relearns a missed part in-session, then +1 and +3 days (`log.ts`). Was P2.8. |
| L4 | Finish the Practice Exam | 🟡 timer and reveal ✅ | Next | Still to do: sitting-shaped, syllabus-weighted assembly; a post-exam readiness delta; a "review next" hand-off. `mock-exam-browser.md`. Was P2.2. |
| L5 | Interleaving in quiz assembly | 🟡 in the Tutor's sessions | Later | The study plan doesn't interleave either since keystone concepts were removed. A/B it once L1 exists. Was P2.6. |
| L6 | Tunable spaced-repetition intervals | ⬜ | Later | `DECAY_DAYS_*` are constants in `mastery.ts`. Needs L1. Was P2.1. |
| L7 | Web push reminders | ⬜ | Later | Blocked on E12. Same rules as the email: opt-in, quiet days, framed as an invitation. Was half of P1.3. |
| L8 | **The Tutor** | 🟡 Phase 1 built 2026-10-18, Preview | Next | `tutor.md`. The reader's own Gem Shop character, floating on every page, walking an Exam 5 candidate through the exam: phases from the exam date, a part served at the moment it is worth most (after reading, when due, to relearn a miss), an FSRS-4.5 scheduler capped by the days left, confidence before every reveal, self-grades banked through `recordReviewAnswers`, and a diagnosis of what is confusing (sure-and-wrong, persistent misses, confusable siblings on one syllabus line, shaky foundations, the weakest kind of part, calibration) with the examiners' reports quoted verbatim. No model. Next: Phase 2 (debrief, timed sets, a `user_tutor_events` sync table), then Beta for Pro (D25). |
| — | Comprehension checks | 🗑 | — | Retired 2026-09-25. Collection happens at Level 1. Was P1.5; see R2. |
| — | "Fading concepts" card | 🗑 | — | Removed. `lib/masteryAnalytics.ts` stays for the heatmap. Was P2.5. |
| — | In-app "report this question" | ✅ | — | Built as part of VERIFY. What's left is operating it (V2). Was P2.3. |

### 4.3 C: Content and publication

Subplan: **`content-plan.md`, the one plan for the vault's content** (2026-10-18). It absorbed
the CAS publication plan (now removed), the waves and decisions of `verification-plan.md`, and
the open items of `CONCEPT_GAPS_PLAN.md`, `syllabus-pipeline-review.md`, `resource-pages.md`,
`concept-figures.md` and `distribution-simulators.md`, and orders them in four phases: **1, ready
means ready** (every `ready` exam passes its gates; no open critical) → **2, the converter, then
the beta exams** → **3, the SOA ASA prelims** → **4, the rest**. The method docs stay where they
are: `syllabus-pipeline.md`, `pdf-question-pipeline.md`, `resource-pages.md`,
`verification-plan.md` (packets), the `question-writer` skill.

The **rule** for this track: an exam changes status only through
`python3 scripts/publication_readiness.py --check <exam>`, and a `ready` exam keeps its structural
gates through `--hold` in CI.

| ID | Item | Status | Tier | Notes |
|---|---|---|---|---|
| C0 | Refresh the generated reports | ✅ 2026-10-17 | — | Both reports regenerated; CONCEPT_GAPS' generated half refreshed (0 missing resources); Exam 8's `source_pages: partial` dropped. Re-run them at each review (Appendix A). |
| C1 | Exam 8 → ready | 🟡 6 of 7 gates (2026-10-18) | **Now** | Content plan Phase 2. *Risk* verified 18 Oct; only the ISO CGL plan is left (G5, D20). Open minor findings on the papers are mostly CAS's own printed slips the vault repeats untagged; they want an "(as printed)" note each. |
| C2 | Exam 9 → ready | 🟡 4 of 7 | Next | Phase 2. G6 closed 18 Oct. First round 18 Oct (content plan Appendix A.4): 128 of 131 on-syllabus questions, 24 of 60 concepts and 7 of 9 readings verified. Left: three questions in review (decisions for a maintainer), and 36 concepts and 2 readings that rest on texts no session could read — Brehm et al., Mildenhall & Major, Grossi & Kunreuther (study kit or sold) and the Cummins (2000, 2008) and Coval-Jurek-Stafford journal texts (**D22**). |
| C3 | Exam 5 → ready | 🟡 3 of 7 | Next | Phase 2. G3 and G6 closed 18 Oct. Apply the v02 outline (D8, settled 18 Oct: verbatim, `*Key concepts:*` lines); 60 concepts, 4 readings, 349 questions (their reports paraphrased — restore as printed in each packet); the Spring 2018 booklet still has to be found. |
| C4 | MAS-II → ready | 🟡 4 of 7 | Next | Phase 2. G3 and G6 closed 18 Oct; first campaign round 18 Oct (content plan Appendix A.5): 167 of 168 questions, 96 of 98 concepts and all 6 readings verified (G5 ✅; Salis's study note, missing from the page, added). Left: the page's F-001 — it carries more tasks than the outline's 21 (**D23**); Fall 2019 Q35's explanation; *Backward Shift Operator* and *Correlogram*, which quote Cowpertwait's own wording (commercial, unread). |
| C5 | Exam 6C → ready | 🟡 3 of 7 | Next | Phase 2. G6 closed 18 Oct (22 vault-written questions, all verified); V6's criticals closed in Phase 1. D8 settled 18 Oct (domain C re-transcribed, objective filter dropped). 137 concepts, 67 readings and 321 questions to verify. |
| C6 | A PCPA bank | ⬜ | Later | Phase 2. The bank would be vault-written, because the CAS releases no PCPA questions. 29 concepts. |
| C7 | Exam 6U | ⬜ development, 3 of 7 | Later | Phase 4. All 45 reading pages exist, none verified. Its objective codes don't match its numbering. |
| C8 | Close P and FM's own gaps | ✅ 2026-10-18 | — | Content plan Phase 1. FM: the *Term of Annuity* catch-all unlinked, page re-verified (run `7679`). P: 9 vault-written questions `p-an-001`–`009` for the six untested concepts, checked by other agents (`7432`, `488d`); *Insurer* verified (`66d2`). Both 7 / 7. |
| C9 | **An SOA ASA-prelim publication plan** | ✅ 2026-10-18 | — | Content plan §3.1a: for FAM, SRM, ALTAM, ASTAM, PA and ATPA, what the SOA publishes (found on its own pages: sample sets for all, written-answer papers for ALTAM/ASTAM, project sittings for PA, one ATPA sample; no FAM or SRM papers will be released), the readings (mostly commercial, D7), the gates and the order. Phase 3's linker step lifted all six to G2 (G3 all but ALTAM). SRM's bank converted and SRM promoted to beta, 18 Oct; FAM's two sets converted and FAM promoted to beta, 19 Oct. Next: ASTAM and ALTAM's banks. |
| C10 | The 23 FSA modules | ⬜ | Later | They have syllabus pages and concept pages, but no banks. |
| C11 | Concept-gap leftovers | 🟡 | Next | *Total Risk* (GH-101); 9 ambiguous targets (D15); 21 stubs; 11 link-variant aliases; linker noise (D3 in that plan). |
| C12 | Syllabus pipeline packages 4–6 and 8 | 🟡 | Later | Provenance `syllabus:` blocks for the 14 hand-made pages; a concept-page lint. `syllabus-pipeline-review.md` §5. |
| C13 | The converter drops the opening paragraph of each examiner's report | ✅ 2026-10-18 | — | The drop was `question_write.py`'s (it wrote the paragraph only when no part had commentary of its own); it now opens the first part's report. `report_gaps.py` re-read 47 of the 50 written-answer CAS papers and restored it verbatim on 83 unverified Exam 6C and 9 questions. Left for their papers' delta packets: 49 verified Exam 7 and 8 questions. Exam 5's bank paraphrased its reports, so it waits for its own packets. Three papers the extractor can't segment (Exam 5 2013 Spring and Fall, 6C 2014 Fall) weren't surveyed. |
| C14 | Concept figures for 6U, 7, 8, 9, PCPA and the DISCs | ⬜ | Later | Builders exist only for P, FM, MAS-I, MAS-II, 5 and 6C. |
| C15 | More distribution simulators | ⬜ | Later | Pareto (both forms), Generalized Pareto, Weibull, Uniform, t, χ², F, GEV. All 10 static SVG embeds are already replaced. |
| C16 | Resource-page leftovers | ⬜ | Later | 3 texts whose contents aren't available; Baer/Rendall (`resource-pages.md` §5). |
| C17 | Study guides for every SOA and CAS requirement | ✅ 2026-10-18 | — | Pages for Exams 6I and 6T, the three VEEs, the SOA's PAF, ASF, FAP and DMAC modules (`syllabus_extract.py`'s module reader), the APC, the FAC and the CAS's Course on Professionalism, all `development`, with a `Resources/Books/` page for each new reading. Each credential's Study Guides list files them under *Modules and Courses* and *VEE Credits* (`NON_EXAM_SECTIONS` in `data/tracks.ts`); the FSA's list puts what every pathway shares first and groups its six pathways below it. Not covered: the Joint Board's EA exams on the FSA catalogue; 6T's version menu still lists the CAS-6 windows, which the AICT's exams don't follow. |

### 4.4 V: Fact Check (VERIFY)

Subplans: `verification.md` (the rules), `verification-plan.md` (the waves) and
`validation-agent.md`.

Waves 0 and 1 are done. Wave 2 is mostly done.

| ID | Item | Status | Tier | Notes |
|---|---|---|---|---|
| V1 | The sweep | ✅ settled 2026-10-17 | — | D19: **by hand, no schedule.** `validate-sweep.yml` is `workflow_dispatch` only; `validation-agent.md` § "How a sweep is run". "Check the record" passes locally with and without PyMuPDF. |
| V2 | Reader reports sync into the logs | ⬜ | **Now** | Needs `SUPABASE_URL` + `SUPABASE_SERVICE_ROLE_KEY` as repo secrets, then a hand-run of the sweep (or `sync_reports.py --commit` locally): with no schedule, nothing moves them on its own. Only 2 `human:` comments have ever reached the logs. |
| V3 | Delta re-check of the stale exam pages | ✅ 2026-10-17 | — | 18 FSA pages verified (run `ad0b`); 6U back to `in_review` (its open findings); 6C stays stale behind V6. Noted, not filed: `syllabus_write.py --check` is no longer clean on 15 of the 18 — re-rendering would undo #1629's link names. |
| V4 | Wave 3a: FM Q351–Q462 | ✅ 2026-10-17 | — | All 112 verified (runs `48b2`, `63b1`). 12 minor findings open: 10 topics not in `ontology_map.py` (add them, or retag), and fm-358's day-1/day-10 wording, which is SOA's. `verify_paper.py` now uses a question's printed number to pick its page. |
| V5 | Waves 3b–5 | 🟡 Exam 7 and the DISCs done | rides C1–C7 | Each exam's campaign carries its own packets. |
| V6 | The 2 open critical findings | ✅ 2026-10-18 | — | Runs `1567`, `dd77`: *MCT*, *Capital Required*, *Supervisory Target Capital Ratio*, *Probable Maximum Loss* verified; the ×1.5 and LICAT's "Base Solvency Buffer" fixed on 20 more pages (now `in_review`); the 6C figure builder fixed. Left: *Registered Reinsurance* F-002 (major), for a writer. |
| V7 | Run summaries for the Exam 7 and DISC-RM runs | ✅ 2026-10-18 | — | Reconstructed from the per-file logs: `.verify/_runs/2026-10-11T02-10Z-e7.md` and `…-dv14.md`. |
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
| G7 | README is stale | ✅ 2026-10-17 | — | The exam table follows `examStatus.ts` (MAS-I, 7 and the DISCs complete; the SOA exams past FM listed as in development), and the counts are current (43 exam pages, ~1,400 concepts, ~750 sources, 3,300+ questions). |

### 4.7 X: Experiences and experiments

| ID | Item | Status | Tier | Notes and subplan |
|---|---|---|---|---|
| X1 | Quiz Battle | ✅ | — | `quiz-battle.md` "Next": its ideas (more players, written papers, a rating) are deliberately out. |
| X2 | Concept Craft: review the relation labels | ⬜ | Next | 5,598 AI-written labels in `data/craftRelations.json`. The doc's "two analytics events" should say three. Server-synced saves are Later. |
| X3 | Actuaria: from one account to a cohort | 🟡 phases 0–3 built | Later | With one account, no cohort reaches `CREW_MIN`, so the risk pool and raids lie dormant. Waits on D1. Phase 4 (ranked play) is parked (D16). |
| X4 | Listen recordings at scale | 🟡 | Later | Upload the first two; split long scripts; fix the numbers stall; choose the voice and the access tier (D12). |
| X5 | Simulated learner: a first live run | ⬜ refused by the model's safeguards | Later | `simulations/runs/` is empty. Rework the persona prompt, then run it. |
| X6 | Projects: more briefs and exams | ✅ 3 PCPA briefs | Later | Another exam's project is one entry in `data/projects.ts`. |
| X7 | Store: Amazon prices | 🟢 | Later | Needs the `AMAZON_CREATORS_*` environment variables, or stays `price: null`. |
| X8 | The visual-noise backlog | 🟡 §3.1, §3.2 and §3.9 done | Next | §3.3–§3.8 are open (the line references in the doc are stale), plus the style-guide edits in §6. The "Hover the graph" hint is false on touch screens. |

### 4.8 R: Parked

| ID | Item | Status | What would bring it back |
|---|---|---|---|
| R1 | The Research tab | 🅿️ both flags off | A maintainer decision, after E1 and E3, and after the upper-exam content (C2–C5). One doc fix is open: `research-corpus-plan.md`'s checklist hasn't been maintained (its boxes are unticked, though some of the topics now exist as `Resources/Books/` pages). (`research-ai-disabled.md` does mention `RESEARCH_TAB_ENABLED`.) Was P4.4. |
| R2 | Comprehension checks (357 files) | 🅿️ rendered nowhere | D11: delete them, or keep them parked. |
| R3 | The onboarding tour | 🅿️ `TOUR_ENABLED = false` | A simpler rebuild. Its e2e spec must follow the flag (E1). |

---

## 5. Dependencies to keep in mind

- **E1 → everything.** A refactor (E5) without a working regression net is a gamble —
  which is why E5's split was checked against the e2e specs locally.
- **E3 → E12 → L7.** E3 is done (a 730 kB entry); push still needs E12's service worker.
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
- **The approved-email lists.** The same one address is the whole of the Cowork list, the
  Actuaria list and the Tutor's. Actuaria's list is also mirrored in SQL. Opening any of them
  to more people (D1, D25) means changing each place; the Tutor's next step is one line
  (`TUTOR_STAGE = 'beta'`).

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
| D5 | Does a bank written entirely by the vault count as **ready**? The DISCs were promoted on that assumption | content plan §6 (was CAS D1) | the C track | Yes, but record it |
| D6 | Verify the **off-syllabus** questions (249 CAS)? | content plan §6 (was CAS D2) | V5 sizing | No |
| D7 | Is a **medium confidence ceiling** enough for commercial-only sources? | content plan §6 (was CAS D3) | C9, MAS-II | Yes |
| D8 | 6C's **F-001**, and Exam 5's **v02 outline** findings | content plan §6 (was CAS D4) | C3, C5 | ✅ settled 2026-10-18: transcribe CAS's words, the vault's additions on `*Key concepts:*` lines; 6C's objective filter dropped until CAS's codes agree (content plan §6) |
| D9 | The **46 orphan concepts** | content plan §6 | V5 | Leave them unverified |
| D10 | Exam 7 leftovers: questions on dropped readings (Patrik, Brehm/Goldfarb, England & Verrall); 2012 q20 filed under Exam 9 | content plan Appendix A.3 | — | Keep them as they are |
| D11 | **Delete** the retired comprehension checks (the folder, the parser, the skill), or keep them parked | `flashcard-collection.md` | R2 | Keep them parked |
| D12 | Listen: the voice; whether it is Pro-only | `listen-recordings.md` | X4 | The test voice; free |
| D13 | **The free / Pro boundary** (Cowork after Preview, Tools saved runs, practice packs) | old P4.3, `cowork.md` | G4, A4 | No change |
| D14 | **Make CI a required check on `main`** | the 2026-08-31 assessment | E2 | — (a repo setting) |
| D15 | The 9 ambiguous concept-gap targets, and the 21 stubs | CONCEPT_GAPS §13 | C11 | Link the existing pages, as proposed |
| D16 | Actuaria Phase 4: ranked play and seasons | `actuaria-online.md` §9 | X3b | Not built |
| D17 | The DISC link design | content plan §6 (was CAS D5) | — | The current design |
| D18 | The open owner decisions in `syllabus-pipeline-review.md` §4 (D2, D3: applied implicitly, never written up) | that doc | C12 | As applied |
| D20 | A syllabus reading with no public copy (the ISO CGL plan, in the CAS study kit only): read a copy and verify it, or accept it as unverifiable for G5 | C1 | Exam 8's G5 | ✅ settled 2026-10-18: the default stands — `in_review`, the gate red, until the manual is read |
| D21 | Goldburd et al.: describe the 2025 revision Exam 8 assigns on the existing 2020 page, keep 2020 with a note, or give Exam 8 its own page (F-003 on that page) | C1 run `f01e` | — | The page as it is |
| D22 | Exam 9's unread readings: Brehm et al., Mildenhall & Major and Grossi & Kunreuther (study kit or sold, chapters unread), and the Cummins (2000, 2008) and Coval, Jurek & Stafford journal texts (paywalled, or SSRN/AEA blocked to the sessions): supply a copy, or name a free author-posted one a session can reach (the 2012 archived Wharton paper for Cummins 2000; SSRN 1057401 for Cummins 2008) | C2 run `6bfb` and the campaign's other reading packets | Exam 9's G4 and G5 | ✅ settled 2026-10-18: verify on open texts at D7's medium ceiling; only what no open source covers stays `in_review` |
| D23 | MAS-II's page carries 36 tasks where the 2026 outline lists 21: restore the outline's tasks (dropping about ten concepts that are in the readings and tagged on paper questions, *Posterior Distribution* and *AIC* among them), or keep the vault's finer tasks and mark which are its own | C4 run `4700` (page F-001) | MAS-II's G1 | ✅ settled 2026-10-18: the outline's 21 tasks, the vault's concepts on `*Key concepts:*` lines |
| D24 | MAS-II's 2019 papers test McElreath's Bayesian/MCMC reading (about 35 questions: MCMC, multilevel models, HPDIs, DIC, WAIC), which the 2026 outline no longer assigns: mark them `off_syllabus`, or keep them in quiz draws | C4 runs `f8d6`, `9dbf` | MAS-II's bank | ✅ settled 2026-10-18: `off_syllabus` |
| D25 | The Tutor after Beta: Beta is the approved accounts plus **Pro** (the maintainer's call, 2026-10-18); is the open stage free or Pro, and which exam comes after Exam 5 | `tutor.md` §10 | L8 | Preview: one account. Beta = Pro, when the maintainer moves `TUTOR_STAGE` |

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
- **D19: the Validate Sweep runs by hand, not on a schedule** (2026-10-17). Restoring the
  workflow's `schedule:` trigger is the way back, once the API cost is worth it.

---

## 7. Success metrics

| Category | Metric | Status |
|---|---|---|
| Activation | % of new users finishing a first quiz on day 0 | Instrumented (`lib/funnel.ts`) |
| Retention | D1 / D7 / D30 return | Instrumented (`day2_return` + GA4) |
| Engagement | Median streak; daily-goal completion | Instrumented |
| Learning | Per-concept retention: correct on revisit after the decay window | Instrumented (`concept_retention`, L1) |
| Re-engagement | Daily email → session conversion | Instrumented (`reminder_opened` → `reminder_session`, L1); needs G1 live |
| Calibration | The gap between confidence and accuracy | ⬜ L2 |
| Economy | Gems earned vs spent; quest-vs-plan adherence | 🟡 `quest_claimed` only |
| Social | League retention by final rank | ⬜ needs a rollover query |
| Content trust | % of files verified (48.6%); open critical findings (2); stale files (21) | Measured (`Validation Status.md`) |
| Publication | Exams ready (7 of 43); gates passed per beta exam | Measured (`publication_readiness.py`) |
| Reliability | Crash-free sessions; CI green on `main` | 🟡 the `exception` events exist; **CI is red, and hasn't run since 2026-10-10** |
| Performance | Entry chunk gzip (today 730 kB, budget 900 kB for first paint); LCP / INP | 🟡 the budget is in CI; LCP / INP unmeasured |
| Monetization | Trial → paid; Pro retention | Stripe data |

---

## 8. Plan index

Every planning document in the repo, what it is for, and how healthy it is. A doc marked
**needs refresh** says something about status that the code no longer bears out; its row in
§4 gives the true status.

| Document | Role | Covers | State | Last touched |
|---|---|---|---|---|
| `docs/roadmap.md` | **This file**: governance, priorities, status | Everything | Active | 2026-10-17 |
| `docs/content-plan.md` | **Subplan: all vault content**: the gates, every exam's standing, the workstreams, the phases, the content decisions, the campaign records | C1–C18, V3–V10 | Active. Phase 1 in this PR | 2026-10-18 |
| `docs/verification-plan.md` | Method: fact-check packets, tooling, sizing | V5 | Reference. Its waves and decisions moved to the content plan | 2026-10-18 |
| `CONCEPT_GAPS_PLAN.md` | Record of phases A–D, and the generated gap worklist | C11 | Record; its open items are in the content plan §3.3 | 2026-10-18 |
| `docs/cas-publication-plan.md` | — | — | 🗑 **Folded into `content-plan.md`** 2026-10-18 | — |
| `docs/actuarial-tools.md` | Subplan: Tools | A2 | Active. **Needs refresh** (A6) | 2026-10-10 |
| `docs/cowork-source-inventory.md` | Queue: Cowork sources | A3 | Active. **§4 counts are stale** | 2026-09-20 |
| `docs/actuaria-online.md` | Build spec: Actuaria | X3 | Phases 0–3 built; Phase 4 parked | 2026-10-05 |
| `docs/tutor.md` | Plan and build spec: the Tutor | L8 | Phase 1 built; Preview | 2026-10-18 |
| `docs/visual-noise-review.md` | Backlog: UI copy | X8 | Active. Its line references are stale | 2026-10-05 |
| `docs/syllabus-pipeline-review.md` | Record: the pipeline's design review | C12 | Record; its open packages are in the content plan §3.4 | 2026-10-18 |
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
| **The bundle grows with the content** | entry chunk gzip | E3 done: the bank is lazy and `npm run size` fails CI over 900 kB. The lazy chunks (questions 2.9 MB, wiki 4.2 MB gzip) still grow with every page. |
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

- **2026-10-18, the Tutor.** L8 proposed and built to Phase 1 in Preview (`docs/tutor.md`):
  Exam 5, one approved account, no model. It carries the first working versions of L2
  (confidence), L3 (successive relearning) and L5 (interleaving), inside its own sessions.
  Planning it found L9 (§3.4): written-only questions count as correct in quizzes.

- **2026-10-18, the Content Plan.** The content subplans are consolidated into
  `docs/content-plan.md` (the CAS publication plan folded in and removed; the verification plan
  reduced to its method), in four phases. **Phase 1, ready means ready, is done:** all 7 ready
  exams pass all 7 gates, `publication_readiness.py --hold` runs in CI, no open critical finding
  remains (V6 ✅), C8 ✅, C18 ✅, V10 🟡. The vault is **54.8% verified (3,035 of 5,542)**, with 0
  disputed files.

- **2026-10-17, the next phase.** The Now lanes, worked through:
  - **Engineering:** lint at 0 (E10); E6 golden vectors ✅; E5's `Landing.tsx` split
    (1,720 → 697); E1's new blocker found: Actions have recorded no run since 2026-10-10.
  - **Operations:** D19 settled, so the sweep runs by hand (V1 ✅); V2 and G1 still need the
    maintainer's secrets.
  - **Learning:** L1 ✅, so every Learning-lane experiment can now be measured.
  - **Content and Fact Check:** V3 ✅ and V4 ✅; C1 from 2 to 5 of 7 gates. The vault is
    **54.6% verified (3,022 of 5,533)**, up from 48.6%. 3 files are stale, down from 21.
  - New decisions D20 and D21; proposed C17, C18 and V10.
- **2026-10-17, later. The first Now items.** E3, C0 and G7 are ✅. E1 is green locally,
  awaiting CI. E4 and E10 are 🟡. Proposed V9 (§3.4): VERIFY can't move or retire a file.
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
