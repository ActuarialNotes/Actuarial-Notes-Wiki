# Concept gaps plan

> **The plan now lives in `docs/content-plan.md`** (§3.3 holds what is left of this one, and its
> decisions are in §6). This file stays as the record of phases A–D and as the generated gap
> worklist below the `gaps:begin` marker, which `find_concept_gaps.py --update-plan` rewrites.

The concept pages the study guides link to that don't exist yet: found, ranked, and cut into
batches to write. **Status: Phase A (batches 1–7) done — 44 pages written, 7 targets aliased to
existing pages, study guides re-rendered. Phase B reviewed and planned (§8) with one example
page written; plan and example approved 2026-10-09. Phase B done (§9): 80 pages, 147 aliases,
13 noise targets. Phase C plan and example approved 2026-10-09; Phase C done (§11): 69 pages, 160 aliases, 5 namesakes, 12 noise targets, `Total Risk` left. Phase D done 2026-10-10 (§12–13): 170 pages, 310 aliases, 5 namesakes, 22 noise targets; every concept target resolves except `Total Risk`.**

- Rerun the analysis: `python3 scripts/find_concept_gaps.py` (summary) ·
  `--update-plan` (refresh the generated half of this file) · `--json out.json` (everything) ·
  `--check` (exit 1 while any concept in a pinned batch is still missing).
- Batch membership is pinned in `scripts/concept_gaps_batches.json`, so batch numbers stay put
  across reruns. Re-pin (`--pin`) only to re-cut the plan.
- Everything below the `gaps:begin` marker is generated; everything above it is written by hand
  and survives a rerun.

## 1. What I found (read this first)

1. **The ready and beta exams have no concept gaps.** Exam P, FM, MAS-I, MAS-II, 5, 6C, 7, 8, 9
   and PCPA link only pages that exist — CI already gates this
   (`validate_links.py --studiable`). The question banks (P, FM, MAS-I/II, 5, 6C, 7, 8, 9) have no
   unresolved `wiki_link:` entry either (10,299 checked).
2. **Every gap is on an in-development study guide**: the SOA ASA prelims (FAM, SRM, PA, ALTAM,
   ASTAM, ATPA), the 23 FSA modules (CFE, CP, GH, GI, ILA, INV, RET), the CAS DISCs and Exam 6U.
   These pages are *generated* by `scripts/syllabus_write.py`, which by design links every noun
   phrase of an objective to "the page that should exist" — so the gaps are that pipeline's
   worklist (docs/syllabus-pipeline.md, "Pipeline B").
3. **About 40% of the missing links aren't concepts.** The noun-phrase linker cuts terms short
   (`[[Ordinary|ordinary]] least [[Square|squares]]`, `[[Generalized Linear|generalized linear]] models`),
   links verbs and filler (`[[Cannot]]`, `[[Differ Compared]]`, `[[Common|common]] methods`), and
   singularises names it shouldn't (`[[Black-Schole]]`, `[[Joint Live]]`, `[[Cognitive Biase]]`).
   Writing pages for those would be wasted effort, so the script sorts every link into a bucket
   (table below) and only **954 targets** are concepts to write.
4. **No question bank backs these exams**, so "question bank usage" can't rank them: no question
   is tagged with any missing concept. The script counts mentions in question prose as a weak
   signal instead, and leans on inbound links, section weight, exam stage and prerequisites.
5. **Frontmatter `aliases:` don't make links work in the app.** The app fetches
   `Concepts/<exact link target>.md` (`fetchWikiFile`); only Obsidian and the AI connector read
   `aliases:`. A variant spelling resolves in the app only if a file has that exact name, or the
   guide links the real name. See decision D2.
6. Stubs: 21 existing concept pages are stubs (secondary list at the end). Eight have no body at
   all (`Credit`, `Pension`, `Canadian Institute of Actuaries (CIA)`, `Alignment`, …); `Capital`
   (27 words, 6 inbound guide links) is the most-linked.

## 2. How the ranking works

Per concept: **score** = 2·ln(1+guides) + 1·ln(1+links) + 3·ln(1+questions tagged)
+ 1·ln(1+questions mentioning it) + 6·(section weight × exam stage) + 2·(exam stage)
+ 1.5·ln(1+missing concepts built on it). Section weight is the midpoint of the objective
callout's `{lo–hi%}`. Exam stage: ready/beta 1.0, ASA prelim 0.8, FSA module / DISC / 6U 0.45 —
the ASA prelims are the next exams likely to become studiable and are sat by far more candidates.

- **Tier 1 — high-traffic foundations**: tagged by a question, or linked from 4+ guides, or the
  base of 3+ other missing concepts, or linked from 2+ guides at ASA-prelim stage.
- **Tier 2 — frequently linked / exam-relevant**: 2+ guides, 3+ links, a prerequisite of
  something, 3+ question mentions, or on an ASA prelim.
- **Tier 3 — niche or single-link**: everything else (mostly one FSA module, one link).
- A prerequisite is pulled up to the tier of whatever is built on it, and into the batch before
  it. "Prerequisite" means its name sits inside the other's (`Delta` → `Delta Hedging`); bare
  generic words (`Insurance`) don't count.
- Batches are cut within a subject domain (life, short-term, statistics, investments,
  retirement, health, ERM), then by exam and section, ~10 each.

## 3. Decisions I need from you

**D1 — Scope.** 954 pages is a large programme. I recommend approving in phases:

| Phase | Batches | Concepts | What it covers |
|---|---|---|---|
| A | 1–7 (Tier 1) | 51 | The foundations several guides lean on |
| B | The 21 Tier 2 batches that are mostly ASA-prelim: 8–10, 13, 19–26, 28, 29, 33, 44–49 | 211 | FAM, ALTAM, ASTAM, SRM, PA, ATPA — the next exams to make studiable |
| C | The other 21 Tier 2 batches | 203 | FSA modules, DISCs |
| D | Tier 3, batches 50–99 | 491 | Single-link, one-module concepts — or leave them as each exam's worklist |

**D2 — How a variant link reaches the page.** Some targets aren't good titles
(`Black-Schole`, `Delta` meaning *delta method*, `Accrued Liability` meaning *actuarial accrued
liability*). I recommend: write the page under its proper title; put the linked spelling in the
page's frontmatter `aliases:` (Obsidian) **and** in `scripts/concept_aliases.json` (the
generator's alias table); then, once per phase and as its own commit, re-render the affected
development guides with `python3 scripts/syllabus_write.py <ids>` so their links point at the
real title in the app too. The re-render changes only link targets (the pages are in sync with
the generator today — `--check` exits 0), but it does touch study guides, so it needs your
go-ahead. Where the linked name *is* a good title (most of them), the page simply takes that
filename and nothing else is needed.

**D3 — Noise and cut-short links** (240 + 38 targets) are a generator problem, not a content gap.
Out of scope here; the fix is in `syllabus_write.py`'s noun-phrase linker. Listed below for the
record.

**D4 — Ambiguous targets** (76, table in the generated half). My recommendations, from the
guide context:

| Target | Context | Recommendation |
|---|---|---|
| `DB`, `DC` | ALTAM pension objectives | *Defined Benefit Plan*, *Defined Contribution Plan* — new pages (the script's *Disability Benefit* guess is wrong) |
| `ALM` | CFE, CP-351 | *Asset-Liability Management* — new page (not *Aggregate Loss Model*) |
| `VaR`, `TVaR` | CFE-101 | *Value at Risk*, *Tail Value at Risk* — new pages; worth pulling into Phase B |
| `ERM`, `RBC`, `LRT` | | Link the existing *Enterprise Risk Management*, *Risk-Based Capital*, *Likelihood Ratio Test* |
| `FAS`, `CAE`, `CARE`, `PUC`, `TUC`, `SBC`, `IAA`, `ESG`, `ACO`, `PAP`, `CGL`, `DAC`, `IPS`, `CCRC` | | The spelled-out planned page each names (ESG = *Economic Scenario Generator* in CP-312) — fold into that page's batch |
| `WC`, `HO`, `CP` | GI-101 lines of business | *Workers Compensation Insurance* (exists), *Homeowners Insurance*, *Commercial Property Insurance* (planned) |
| `IRR`, `ROE`, `EVA` | ILA-101, CFE | *Internal Rate of Return*, *Return on Equity*, *Economic Value Added* — new pages (none exists) |
| `OTC`, `PDE`, `GMxB`, `SEC`, `US`, `SQL`, `ETL`, `COPE`, `SDOH`, `CPT`, `DRG`, `TRA`, `ICOS`, `PVANYD` | | Low value as pages; leave unwritten (Tier 3) unless you want them |
| One-word targets with one candidate page | | Several of the script's guesses are wrong in context — `Force` is *force of mortality*, not *Force of Interest*; `Class`, `Test`, `Cap`, `Asset`, `Loading`, `Tax` likewise. Right ones: `Confidence` → *Confidence Interval*, `Coefficient`, `Autocorrelation`, `Written` → *Written Premium*, `Maximum` → *Maximum Likelihood Estimation*. I'd fix the right ones through D2's alias table and write none of the rest |

**D5 — Review.** These pages will be AI-drafted. Per the README, nothing ships 100% AI-written
without human review: every page lands with `verification: unverified` (via
`verify_check.py --sync`), and I'll list each batch's pages for your review in its commit.

## 4. The house template (Phase 1 notes — what every writer follows)

From `.claude/skills/actuarial-concept-definitions/SKILL.md` and the best existing pages
(`Poisson Distribution`, `Present Value`, `Chain Ladder Method`, `Credibility`):

- **File**: `Concepts/<Title Case Name>.md` — spaces, not hyphens or underscores; keep hyphens that
  belong to the term (`Put-Call Parity`); singular; `.md` mandatory. The filename *is* the link
  target, character for character.
- **Frontmatter**: none hand-written. `python3 scripts/verify_check.py --sync "Concepts/<page>.md"`
  adds the `verification:` block (status `unverified`). Only add `aliases:` (as a YAML list, above
  where `verification:` will go) when a variant spelling links the page.
- **Body, in this order**: `**Term** ($symbol$) is …` — one or two precise sentences with
  `[[wiki-links]]` to existing pages → the defining formula as `> $$…$$` (one expression per block,
  stacked, phone-narrow) → 2–4 bullets defining symbols, key properties and relationships → 1–3
  `> [!example]- <Actuarial title> {Example}` callouts each with a nested `> > [!answer]-`, multi-step
  work in `align*` with `$$` on their own lines and one `&=` per line → two collapsed callouts,
  `> [!tip]- How it appears on the exam` then `> [!warning]- Exam traps` (the skill's sections 6–7).
  Money inside the math: `$\$1{,}000$`.
- **Length**: median existing page ≈ 680 words (p25 450, p75 820). Qualitative concepts
  (governance, regulation) carry a defining relationship or framework in place of an equation.
- **Notation**: match the guide's reading — AMLCR (Dickson, Hardy & Waters) for ALTAM/FAM long-term
  (`A_x`, `\ddot{a}_x`, `{}_tV`, `{}_tp_x`); Loss Models (Klugman) for ASTAM/FAM short-term;
  ISLR for SRM/PA/ATPA; Hull/McDonald for INV and FAM option pricing; Friedland/Werner–Modlin
  vocabulary for GI.
- **Links**: prefer existing pages; a link to another planned concept is fine. Watch the
  namesake table (`Deductible` vs `Deductible Rating`) in `scripts/concept_aliases.json`.
- **LaTeX**: `\$` for money, no Unicode fractions or smart quotes; worked numbers recomputed in
  Python before commit.
- **Sentences** (from Phase B): a bullet, tip or trap may open with a short bold label ending in a colon
  (`**Sum at risk:**`, `**Annual premiums:**`, or an exam name in the tips), and everything after the label is
  written in full sentences. Don't leave stub sentences that drop the reason or the verb (`Closed forms are rare.` on its own,
  `Start where the value is known.`); say the point and why in one or two plain sentences. Concise, not verbose.

## 5. Link problems noted in the guides (not fixed — guides are out of scope)

- Singularised targets that aren't usable titles: `Black-Schole` (Black-Scholes), `Joint Live`,
  `Single Live`, `Individual Live` (… lives), `Cognitive Biase`, `Porter's Five Force`,
  `Career Average Earning`, `Career Average Revalued Earning` (… earnings). Proposed titles:
  *Black-Scholes Formula*, *Joint Life Status*, *Cognitive Bias*, *Porter's Five Forces*,
  *Career Average Earnings Plan*.
- Variant spellings and cut-short links of existing pages: tables in the generated half
  ("Link fixes", "Cut-short links").
- Source Material shelves list 641 readings with no `Resources/Books/` page — a separate,
  larger job (`docs/resource-pages.md`), not part of this plan.

## 6. Progress log

| Date | Batch | Pages | Commit | Notes |
|---|---|---|---|---|
| 2026-10-07 | — | — | `167f9b9` | Plan written; approved for Phase A |
| 2026-10-07 | skill | — | `7ff95a7` | Template gains the two collapsed exam callouts; alias workflow documented |
| 2026-10-07 | 6 | 5 | `958885e` | Retirement plans |
| 2026-10-07 | 7 | 4 | `1e4cf3c` | Predictive analytics |
| 2026-10-07 | 5 | 5 | `50eccad` | Group health and funding |
| 2026-10-07 | 4 | 7 | `6afcae4` | Options, hedging, mortality, pensions |
| 2026-10-07 | 3 | 6 | `7e89c92` | Life premiums, reserves, valuation |
| 2026-10-07 | 1 | 7 | `12d1ae1` | Short-term insurance, estimation; Insurance Company dropped for Insurer |
| 2026-10-07 | 2 | 10 | `0edaae1` | Life products, pensions, Black-Scholes |
| 2026-10-07 | aliases | — | `b11d7db` | 30 aliases + the `governance` namesake in `scripts/concept_aliases.json` |
| 2026-10-07 | re-render | — | `1c25ccc` | 21 development guides; text identical, 72 link targets moved |
| 2026-10-07 | fix | 6 | `96b96f4` | Money written inside the math; 1,980 formulas render in KaTeX |
| 2026-10-09 | B review | 1 | `3cfec33` | Phase B triaged (§8): 80 pages, 147 aliases, 13 skips; example `Thiele's Differential Equation` |
| 2026-10-09 | B style | — | `f86e3df` | Plan approved; example rewritten in full sentences, rule added to §4 |
| 2026-10-09 | B style | — | `a587f62` | Bold labels restored in the example, full sentences after each; rule in §4 updated |
| 2026-10-09 | B style | — | `b32a6b2` | Labels end in a colon; example approved, writers restarted |
| 2026-10-09 | noise | — | `885f4d9` | 13 reviewed non-concept targets classified as link noise |
| 2026-10-09 | G8 | 7 | `d326cef` | Statistical learning and data exploration |
| 2026-10-09 | G2 | 8 | `88046fc` | Coverage, pricing and estimation |
| 2026-10-09 | G6 | 6 | `1de060d` | Pensions |
| 2026-10-09 | G3 | 9 | `6016203` | Survival models and long-term coverages |
| 2026-10-09 | G5 | 8 | `2d5bc86` | Profit testing and universal life |
| 2026-10-09 | G1 | 10 | `a7bb833` | Severity and aggregate models |
| 2026-10-09 | G4 | 9 | `3d4cd58` | Policy values and multiple state models (with the example, 10) |
| 2026-10-09 | G9 | 12 | `2808411` | Explainability and working with data |
| 2026-10-09 | G7 | 10 | `50b0051` | Options and equity-linked insurance |
| 2026-10-09 | aliases | — | `453c79e` | 147 entries in `scripts/concept_aliases.json` |
| 2026-10-09 | re-render | — | `e367434` | 14 development guides; text identical, 116 link targets moved |
| 2026-10-09 | C review | 1 | `9c62e79` | Phase C triaged (§10): 69 pages, 144 aliases, 12 skips, 1 left; example `Commercial General Liability` |
| 2026-10-09 | C approved | — | — | Plan and example approved; recommendations taken on the four open points |
| 2026-10-09 | noise | — | `6a4417f` | 12 reviewed non-concept targets classified as link noise |
| 2026-10-09 | G2b | 6 | `4aa9a9a` | Insurer operations and strategy |
| 2026-10-09 | G6b | 6 | `c72ca5b` | Health systems and provider economics |
| 2026-10-09 | G2a | 6 | `32e99c5` | Risk management |
| 2026-10-09 | G5 | 7 | `343d3d6` | Investments |
| 2026-10-09 | G1a | 7 | `29fba3a` | Personal lines and policy structure |
| 2026-10-09 | G4 | 8 | `3ffeadb` | Life products, valuation and reinsurance |
| 2026-10-09 | G1b | 7 | `81e59f6` | Commercial coverages (with the example, G1 is 15) |
| 2026-10-09 | G7 | 7 | `83fd59b` | Retirement |
| 2026-10-09 | G6a | 7 | `fcfe2b6` | Group and long-duration health |
| 2026-10-09 | G3 | 7 | `6a35489` | General insurance finance, capital and ERM |
| 2026-10-09 | aliases | — | `fc0ce1e` | 159 entries and 5 namesakes in `scripts/concept_aliases.json` |
| 2026-10-09 | re-render | — | `0104db6` | 23 development guides; text identical, 279 link targets moved; one more alias |
| 2026-10-10 | D triage | — | — | Phase D triaged (§12): 449 targets, 170 pages, 254 aliases, 22 skips, 1 left |
| 2026-10-10 | noise | — | `4765856` | 22 reviewed non-concept targets classified as link noise |
| 2026-10-10 | W01–W25 | 170 | `7fea6bf`…`4e479e2` | 25 groups, one commit each (DISC, ERM, GI, health, investments, life, retirement) |
| 2026-10-10 | aliases | — | `54c20c6` | 305 entries and 5 namesakes in `scripts/concept_aliases.json` |
| 2026-10-10 | re-render | — | `2c83a17` | 26 development guides; words identical, 322 link targets moved, 3 newly linked; re-recorded verified |
| 2026-10-10 | aliases | — | `9284549` | 5 slash-phrase keys; four guides re-rendered and re-recorded |

## 7. Phase A record (2026-10-07)

**Outcome.** All 51 Phase A targets resolve (`--check` exits 0); links resolving on the study
guides rose from 2,466 to 2,713. Every page passed a template check, the full app suite (197 files,
3,377 tests), `npm run build`, `syllabus_lint.py` (0 errors), `validate_links.py --studiable`,
`verify_check.py` and a KaTeX render of every formula. Each writer recomputed its worked numbers in
Python; I recomputed a sample independently (Black-Scholes and GMMB puts, delta-hedge, binomial,
SULT ${}_{10}p_{60}$, completion factors, DB salary projection, Gini splits, convolution) — all
agree. All 44 pages are `unverified` and need human review before they count as checked.

**Title and alias decisions** (filename ← the target the guides link):

| Page | Linked as |
|---|---|
| Black-Scholes Model | `Black-Schole`, `Black-Scholes`, `Black-Scholes-Merton` |
| Delta Method | `Delta` (ASTAM: "use the delta method") |
| Actuarial Accrued Liability | `Accrued Liability` |
| Model Validation | `Validation` |
| Fractional Age Assumption | `Fractional Age` |
| Risk-Neutral Valuation | `Risk Neutral`, `Risk-Neutral` |
| Defined Benefit Plan / Defined Contribution Plan | `Benefit Plan` (cut from "defined benefit plans"), `DB` / `DC` |
| Short-Term Insurance Coverage | `Short-Term Insurance` |
| Liability Insurance | `Liability Coverage` |
| Best Practice | `Applicable Best Practice`, `Appliable Best Practice` (a typo in the CP-321 syllabus text) |
| Model Governance | `Governance` on CP-312 and ATPA only — a namesake; elsewhere it means Corporate Governance |
| *(existing)* Unpaid Claims, Exposure Base, On-Leveling, Overall Rate Level Indication, Regularization, Predictive Analytics, Insurer | `Outstanding Claim`, `Exposure`, `Rate Level`, `Average Rate`, `Regularized Regression`, `Predictive Modeling`, `Insurance Company` — no new page; the existing one is the concept |

Also aliased from D4: `ERM`, `RBC`, `LRT`, `Confidence`, `Autocorrelation`, plus `Delta Hedge` and
`Hedge`. **Two D4 recommendations were wrong and were not applied:** `[[Maximum]]` means *maximum
covered loss* (not Maximum Likelihood Estimation) and `[[Coefficient]]` means *model coefficients*
(not Coefficient of Variation).

**Points for the reviewer** — facts the writers stated from memory and flagged:
- AMLCR conventions: the salary-rate trap ($s_{x-1/2}$, Defined Benefit Plan), mortality-improvement
  notation $q(x,t)=q(x,t-1)(1-\phi(x,t))$ (Mortality), the GMMB-as-put framing (Delta Hedging,
  Black-Scholes Model). No AMLCR `Resources/Books/` page exists to check against.
- Regulatory figures: US RBC action levels (200/150/100/70%), LICAT targets (100%/90% total,
  70%/55% core), VM-20's max-of-three reserve, LDTI's catch-up (Life Insurance Company, Valuation
  Principle); ASOP 5 / 45 section numbers (Best Practice).
- Reinsurance: the modco-adjustment sign convention (Reinsurance Transaction).
- The Institutes' six-step underwriting process and business-auto considerations (Underwriting,
  Liability Insurance); McGill's funding equation attribution (Retirement Plan).
- Model Governance follows OSFI E-23 (2027 revision) — check it is the CP-312 version.

**Guide issues noticed** (not edited — guides are regenerated, not hand-edited): DISC-DA links
`Decision Tree` where its objective says classification trees; the gap script does not catch a
concept an existing page names only in its opening parenthesis (Insurer "(insurance company …)").


## 8. Phase B plan (approved 2026-10-09)

Phase B is the 21 pinned batches 8–10, 13, 19–26, 28, 29, 33 and 44–49: 211 targets, almost all
on FAM, ALTAM, ASTAM, SRM, PA and ATPA. I read each one in its objective sentence and checked it
against the 991 existing concept pages. Only 80 of them need a page of their own:

| Outcome | Targets | Pages |
|---|---|---|
| A new page under the target's own name | 50 | 50 new |
| A new page under a better title; the target becomes its alias (D2) | 76 | 30 new |
| An existing page already covers it; alias only | 71 | — |
| Not a concept; skip (D3) | 13 | — |
| Already done in Phase A (`Delta Hedge`) | 1 | — |
| **Total** | **211** | **80 new** |

**Example page for review:** `Concepts/Thiele's Differential Equation.md` (group G4), written to §4's template.
It has the single-life and multiple state forms, a term-insurance Euler example and a
disability-income example. Its numbers were recomputed in Python, and all 108 formulas render in KaTeX.
It links three G4 pages that don't exist yet (`Policy Value`, `Multiple State Model`, `Transition Intensity`).

### 8.1 Judgment calls

Approved as recommended on 2026-10-09, with one change to the example page: bullets, tips and traps
keep their bold labels, each ending in a colon, and the text after each label is written in full
sentences (§4, "Sentences"). The three pages in item 4 are written short and
flagged for review, and the optional extras in item 7 are left out.

1. **`Policy Value` gets its own page** (FAM/ALTAM: prospective and retrospective values, the recursion, gross
   vs net). It does not alias to `Reserve`, which stays the cross-practice hub (P&C claim reserves, IFRS 17,
   pensions). FAM's "gross premium, net premium and modified net premium policy values" is cut into three links.
   `Gross Premium` and `Net Premium` alias to `Policy Value`, and `Modified Net Premium Policy Value` (FPT) is its own page.
2. **Guarantees: a hub plus four pages.** `Equity-Linked Insurance` takes the topic-level targets (*options
   embedded*, *equity-linked guarantees / cash flows*). GMDB, GMMB (= GMAB), GMIB and GMWB each get a page,
   because ALTAM lists them separately. `Payoff` (Phase A) keeps the payoff algebra.
3. **Folded into pages that already cover them**, to avoid near-duplicates:
   - ridge and lasso → `Regularization`
   - k-fold, LOOCV and resampling → `Cross-Validation`
   - FAS, CAE and CARE → `Defined Benefit Plan`
   - UL account value → `Universal Life Insurance`
   - long-term health insurance → `Health Insurance`
   - joint-life targets → `Joint Life`
   - BIC and SBC → `BIC`
   - imputation → `Missing Data`
4. **Two pages rest on sources I can't read.** `Table Importability` (ATPA) comes from the SOA's paywalled
   e-learning modules. `Data Analytics` and `External Data` (DISC-DA) come from The Institutes' course text.
   I'd write them short and flag them for review, or drop them. Your call.
5. **Skip 13 targets that name no concept** (list below). Each is part of a sentence the noun-phrase linker
   cut out, such as `Effective Manner While` or `Single Non-Dividend Paying Asset`. I'd add them to a short
   hand-reviewed noise set in `scripts/find_concept_gaps.py`, so `--check` can pass for Phase B.
   `Jurisdiction` is on the script's terms-of-art list, but on CP-351 and ILA-101 it only means "various
   jurisdictions".
6. **Re-render 14 generated guides** (D2) after the alias table grows. These are ALTAM, ASTAM, FAM, ATPA, SRM and PA,
   plus one or two links each on CP-312, CP-321, GI-201, GI-302, INV-101, INV-201, RET-101 and RET-301.
   Link targets change; the text does not. The four DISC targets are new pages named exactly as the
   hand-written DISC guides link them, so no DISC guide is edited.
7. **Optional extras:** `Value at Risk` and `Tail Value at Risk` (D4 suggested pulling them into Phase B; today
   `Tail Risk` and `Desirable Property` alias to `Risk Measure`, an Exam 9 page), and `Actual Cash Value`
   (batch 51), which `Replacement Cost` will define anyway.

### 8.2 How it would run

- Nine writing groups, one commit each, grouped by topic rather than by pinned batch so each group shares one notation:
  AMLCR for G3–G6, Loss Models for G1–G2, McDonald/AMLCR for G7, ISLR/Frees for G8.
  Order: G3, G1 and G2 first, since later groups link them; then G4, G6 and G7; then G5, G8 and G9.
- Every page follows §4: worked numbers recomputed in Python, `verify_check.py --sync` (status `unverified`),
  and a frontmatter `aliases:` list where a target is folded in. Existing pages get no frontmatter edit, so no
  verified page goes stale; their aliases go in `scripts/concept_aliases.json` only.
- Then one commit for the alias table and noise set, and one for the guide re-render.
- Each commit is gated by the template check, a KaTeX render of every formula, `validate_links.py --studiable`,
  `syllabus_lint.py`, `verify_check.py`, and `npm test` + `npm run build` in `quiz/`. The finish line is
  `find_concept_gaps.py --check <the 211 targets>` exiting 0.
- Each group's commit lists its pages and any facts stated from memory, for your review (D5).

### 8.3 New pages by writing group (80)

A name in *italics* after a page is a target that becomes its alias.

**G1 — Severity and aggregate models** (ASTAM, FAM) · 10 pages

- `Severity Discretization` ← *Discretized Version*, *Local Moment Matching*, *Discrete Severity Distribution*
- `Panjer Recursion` ← *Recursive Formulas*
- `Frequency Distribution`
- `Creating New Distributions` ← *New Distribution*
- `Spliced Distribution` ← *Splicing*
- `Scale and Shape Parameters` ← *Shape Parameter*
- `Mean Excess Loss` ← *Mean Excess*
- `Generalized Extreme Value Distribution` ← *Generalized Extreme*, *Extreme Value Distribution*
- `Generalized Pareto Distribution`
- `Individual Risk Model` ← *Individual Risk*

**G2 — Coverage, pricing and estimation** (ASTAM, FAM, DISC-IA, DISC-RM) · 8 pages

- `Policy Limit`
- `Stop-Loss Reinsurance` ← *Stop Loss Reinsurance*
- `Balancing Back`
- `Bayesian Estimation`
- `Approximate Confidence Interval` ← *Non-Normal Confidence Interval*
- `Grouped Data` ← *Individual Data*
- `Insurance to Value`
- `Replacement Cost`

**G3 — Survival models and long-term coverages** (FAM) · 9 pages

- `Future Lifetime Random Variable` ← *Future Lifetime*, *Complete Future Lifetime Random Variable*, *Future Lifetime Distribution*, *Mortality Probability*, *Individual Live*, *Single Life*, *Single Live*
- `Parametric Survival Model` ← *Parametric Survival*
- `Extra Risk` ← *Modelling Extra Risk*, *Age Rating*, *Constant Addition*, *Constant Multiple*
- `Long-Term Insurance Coverage` ← *Long-Term Insurance Benefit*
- `Term Life Insurance` ← *Term Life*
- `Pure Endowment` ← *Endowment*
- `Endowment Insurance`
- `Future Loss Random Variable`
- `Portfolio Percentile Principle`

**G4 — Policy values and multiple state models** (FAM, ALTAM) · 10 pages

- `Policy Value` ← *Policy Value Calculation Process*, *Gross Premium*, *Net Premium*
- `Modified Net Premium Policy Value`
- `Thiele's Differential Equation` — ✓ written (the example)
- `Woolhouse's Formula` ← *Three-Term Woolhouse Approximation*
- `Multiple State Model` ← *Markov Multiple*, *Continuous Time Markov*, *Continuous Time Markov Multiple*, *State-Dependent Probability*, *Mortality-morbidity*
- `State-Dependent Insurance` ← *State-Dependent Life Insurance*, *State-Dependent Cash Flow*, *State-Contingent Life*
- `Transition Intensity` ← *Piecewise Constant Transition Intensity*
- `Kolmogorov's Forward Equation`
- `Multiple Decrement Model` ← *Multiple Decrement*, *Deconstruct Multiple Decrement Table*, *Single Decrement*
- `Continuing Care Retirement Community`

**G5 — Profit testing and universal life** (ALTAM, ILA-101) · 8 pages

- `Profit Testing` ← *Deterministic Profit Testing*
- `Profit Vector` ← *Emerging Surplus*
- `Profit Signature`
- `Profit Margin`
- `Internal Rate of Return` ← *Internal Rate*
- `Discounted Payback Period`
- `No-Lapse Guarantee`
- `Lapse`

**G6 — Pensions** (ALTAM) · 6 pages

- `Accrued Benefit` ← *Early Exit*
- `Projected Unit Credit Method` ← *Projected Unit Credit*
- `Traditional Unit Credit Method` ← *Traditional Unit Credit*
- `Replacement Ratio` ← *Target Replacement*
- `Salary Scale`
- `Service Table` ← *Age Retirement*

**G7 — Options and equity-linked insurance** (FAM, ALTAM, INV-101, CP-312, CP-351) · 10 pages

- `European Option` ← *Simple European-style Derivative*, *Simple Option*
- `Binomial Option Pricing Model` ← *Binomial Option Pricing*
- `Replicating Portfolio`
- `Equity-Linked Insurance` ← *Options Embedded*, *Equity-Linked Life Insurance Guarantee*, *Equity-Linked Life Insurance Cash Flow*
- `Guaranteed Minimum Death Benefit`
- `Guaranteed Minimum Maturity Benefit` ← *Guaranteed Minimum Accumulation-maturity Benefit*
- `Guaranteed Minimum Income Benefit`
- `Guaranteed Minimum Withdrawal Benefit`
- `Portfolio Rebalancing` ← *Rebalancing*
- `Market Risk`

**G8 — Statistical learning and data exploration** (SRM, PA) · 7 pages

- `Overfitting`
- `Regression Tree`
- `ARCH Model` ← *Autoregressive Conditionally Heteroskedastic*
- `Train-Test Split` ← *Train-test-validate Set*, *Training Data*
- `Feature Engineering` ← *Existing Data*
- `Data Design` ← *Effective Data*, *Granularity*
- `Bivariate Data Exploration`

**G9 — Explainability and working with data** (ATPA, DISC-DA) · 12 pages

- `Explainability`
- `Interpretability` ← *Decomposability*, *Algorithmic Transparency*, *Post-Hoc Interpretability*
- `Shapley Value`
- `Partial Dependence Plot` ← *Dependence Plot*, *Individual Conditional Expectation Plot*
- `Stacking`
- `Proxy Discrimination`
- `Table Importability`
- `Data Pipeline` ← *Preparing Data*, *Data Set*, *File Structure*
- `Data Warehouse` ← *Data Lake*
- `Relational Database`
- `Data Analytics`
- `External Data`

### 8.4 Targets an existing page already covers (71)

<details><summary>Alias table entries — target → existing page</summary>

| Target | Existing page |
|---|---|
| `Continuous Distribution` | Continuous Random Variable |
| `Claims Distribution` | Aggregate Loss Model |
| `Bayesian Information Criterion` | BIC |
| `Schwarz Bayesian Criterion` | BIC |
| `Loss Reinsurance` | Excess of Loss |
| `Bühlmann` | Bühlmann Credibility |
| `Greatest Accuracy` | Bühlmann Credibility |
| `Empirical Bayesian Estimation` | Empirical Bayes Credibility |
| `Projected Loss` | Loss Trend |
| `Outstanding Claims Reserve` | Unpaid Claims |
| `Overdispersed Poisson` | Over-Dispersed Poisson Model |
| `Risk Classification Differential` | Classification Ratemaking |
| `Tail Risk` | Risk Measure |
| `Desirable Property` | Risk Measure |
| `Censored Data` | Censoring |
| `Adjusting Premium` | On-Leveling |
| `Contingencies Loading` | Profit and Contingency Provision |
| `Ratemaking Data` | Ratemaking |
| `Discrete-Time Rebalancing` | Delta Hedging |
| `Joint-Life Mortality` | Joint Life |
| `Joint Live` | Joint Life |
| `Individual-joint Life Mortality` | Joint Life |
| `Time-To-Status-Failure Random Variable` | Joint Life |
| `Retirement Benefit` | Pension Plan |
| `Pension Plan Valuation` | Pension Plan |
| `DB Plan` | Defined Benefit Plan |
| `Career Average Earning` | Defined Benefit Plan |
| `Career Average Revalued Earning` | Defined Benefit Plan |
| `Final Average Salary` | Defined Benefit Plan |
| `DC Plan Participant` | Defined Contribution Plan |
| `Required Contribution Rate` | Defined Contribution Plan |
| `Plan Participant` | Retirement Plan |
| `Required Contribution` | Funding |
| `Long-Term Health Insurance` | Health Insurance |
| `Long-Term Health Insurance Benefit` | Health Insurance |
| `Long-Term Life` | Life Insurance |
| `Heterogeneity` | Mortality |
| `Mortality Curve` | Mortality |
| `Non-Parametric Mortality` | Life Table |
| `Discrete Time Transition Probability` | Transition Probability Matrix |
| `Asymptotic Property` | Maximum Likelihood Estimation |
| `Account Value` | Universal Life Insurance |
| `Universal Life Contract` | Universal Life Insurance |
| `Universal Life Policy` | Universal Life Insurance |
| `Cashflow` | Cash Flow |
| `Insurance Product` | Insurance Policy |
| `Black-Scholes Formula` | Black-Scholes Model |
| `Option Pricing` | Risk-Neutral Valuation |
| `Investment Portfolio` | Portfolio |
| `Too Many Variable` | Variable Selection |
| `Gain Chart` | Lift |
| `Variable Importance Plot` | Variable Importance |
| `Handle Missing Data` | Missing Data |
| `Imputation` | Missing Data |
| `Internal Consistency` | Data Quality |
| `Data Collection Practice` | Data Quality |
| `Data Structure` | Tidy Data |
| `Common Visualization` | Data Visualization |
| `Exploring Data` | Exploratory Data Analysis |
| `Univariate Data Exploration` | Univariate Plot |
| `Bias-Variance Trade-Off` | Bias-Variance Tradeoff |
| `K-Fold Cross-Validation` | Cross-Validation |
| `Leave-one-out Cross-Validation` | Cross-Validation |
| `Resampling` | Cross-Validation |
| `Predicted Value` | Fitted Values |
| `Diagnostic Test` | Model Diagnostics |
| `Ridge Regression` | Regularization |
| `Lasso` | Regularization |
| `Corresponding Link` | Link Function |
| `Regression-Based Time Series` | Time Series |
| `Stochastic Time Series Process` | Time Series |

</details>

### 8.5 Skipped — not concepts (13)

`Benefits Payable`, `Jurisdiction`, `Single Non-Dividend Paying Asset`, `Analytical Effort`, `Computational Efficiency`, `Common Language`, `Effective Manner While`, `Recommended Analytics`, `Straightforward Manner`, `Final Product`, `Biases Introduced`, `Otherwise Modify Data`, `Vague Question`.


## 9. Phase B record (2026-10-09)

**Outcome.** All 211 Phase B targets resolve (`find_concept_gaps.py --check <the 211>` exits 0): 80 new
pages, 147 alias-table entries and 13 targets reclassified as link noise. Links resolving on the study
guides rose from 2,723 to 2,968, and missing concepts fell from 901 to 690. The 14 re-rendered guides
keep their text word for word (116 link targets moved). Every page passed the template and
full-sentence check, a KaTeX render of every formula, `verify_check.py` and the link check; the full app
suite (197 files, 3,472 tests), `npm run build`, `syllabus_lint.py` (0 errors; warnings 3,038 → 2,868),
`syllabus_write.py --all --check` and `validate_links.py --studiable` all pass. Each writer recomputed its
worked numbers in Python, and shared examples run across a group so its pages agree (one service table
for the pensions, one profit test for G5, one Black-Scholes contract for the guarantees). I recomputed a
sample independently: the Overfitting MSEs, the coinsurance penalty and warehouse loss ratios, the DC
contribution rate (19.77%) and SULT annuity factors, the G5 profit test (NPV 93.00, IRR 23.72%, margin
4.49%, payback 4 years), the Panjer example, the three-term Woolhouse value, the Shapley values and the
GMMB (10,282.79) — all agree. All 80 pages are `unverified` and need human review.

**Style.** The example went through two revisions before approval: every bullet, tip and trap opens with
a short bold label ending in a colon, followed by full sentences (§4, "Sentences"). Pages run about
870–1,390 words counting the LaTeX, the same as the approved example (1,322).

**Points for the reviewer** — facts the writers stated from memory (each group's commit lists its own):
- Textbook conventions and chapter numbers: AMLCR (3rd edition numbering is unconfirmed; no AMLCR
  `Resources/Books/` page exists to check against — the G5 and G7 pages cite no chapter numbers for that
  reason), *Loss Models*, ISLR §2.2.1/5.1.1/8.1.1, Frees's ARCH naming.
- Checked against a source: G1's GEV/GPD material against the SOA ASTAM-22-23 study note (Hardy &
  Saunders, ch. 5) and the (a,b,0)/(a,b,1) facts against the SOA FAM tables.
- Product and practice facts: CCRC contract types A/B/C, GMAB resets, GMIB and guaranteed annuity options,
  GMWB vs GLWB, the ISO coinsurance and business-income details, homeowners replacement cost, the
  no-lapse guarantee valuation approach, lapse practice (not from the ILA-101 readings), INV-101 rebalancing
  corridor factors.
- Sources that could not be read: `Table Importability` (ATPA e-learning modules), `Data Analytics` and
  `External Data` (The Institutes' DISC-DA text) are short and written from general knowledge;
  `Balancing Back` attributes the term to Brown & Lennox for ASTAM, which the writer was not fully sure of.

**Overlaps found** (kept, linked both ways or noted): `Train-Test Split` / `Holdout Sample`; `Multiple State
Model` (continuous time, ALTAM) / the verified `Multi-State Model` (discrete time, MAS-I); `Replicating
Portfolio` / `Delta Hedging`; `Policy Limit` / `Benefit Limit`; `Internal Rate of Return` / FM's `Rate of
Return`; `Extra Risk` / the three methods summarised on `Mortality`.

**Follow-ups the writers suggested** (not done — outside Phase B's targets):
- A `frequency` namesake so ASTAM's and FAM's `[[Frequency]]` reach `Frequency Distribution` rather than
  Exam 5's claims-per-exposure page.
- Aliases for one-word and other-batch targets the new pages cover: `Scale`, `Rounding`, `Mixing`,
  `Collective`, `Net` (present value), `Suitability`, `Blending`, `ETL`, `Table Join`, `Data Mart`,
  `Stop-Loss Insurance` (batch 14); `Database` needs a namesake (data warehouse vs relational database).
- `Health Insurance` links `[[Multi-State Model]]` for ALTAM material; `Multiple State Model` fits better.
- `Valuation` projects a \$100,000 "current salary" with $(1.03)^{10}$; check the salary-scale ages.
- `Actual Cash Value` (batch 51) is defined on `Replacement Cost`, but DISC-IA is hand-written, so it needs a
  page or a guide edit rather than an alias.

## 10. Phase C plan (approved 2026-10-09)

Phase C is the 21 pinned batches left in Tier 2: 11, 12, 14–18, 27, 30–32 and 34–43. That is 203 targets, on the FSA modules (GI, GH, ILA,
INV, RET, CP, CFE), the two CAS DISCs and a few FAM leftovers. I read each one in its objective sentence and
checked it against the 1,071 existing concept pages. Only 69 need a page of their own:

| Outcome | Targets | Pages |
|---|---|---|
| A new page under the target's own name | 46 | 46 new |
| A new page under a better title, or a second spelling of a new page; the target becomes its alias (D2) | 52 | 23 new |
| An existing page already covers it; alias only | 92 | — |
| Not a concept; skip (D3) | 12 | — |
| Can't identify the concept from a source I can read; leave unresolved | 1 | — |
| **Total** | **203** | **69 new** |

**Example page for review:** `Concepts/Commercial General Liability.md` (group G1), written to §4's template.
It is Phase C's most-linked target (14 links, all of DISC-IA §10–11 and DISC-RM §10.5–10.6), and a third of
Phase C is coverage and operations pages like it, so it shows how a qualitative page carries a formula and
worked numbers: the limits recursion (each occurrence, general and products aggregates) with a four-claim
policy year, and a premium-base example with its audit. Its numbers were recomputed in Python, and all 14
formulas render in KaTeX. It is ~1,550 words counting the LaTeX, longer than the Phase B example (1,322),
because the guides spread it over eleven sub-objectives. It links three G1 pages that don't exist yet
(`Endorsement`, `Coverage Analysis`, `Umbrella Liability Insurance`).

### 10.1 Judgment calls

1. **The DISC guides are hand-written, so their 23 targets become pages under the exact names they link.**
   `syllabus_write.py` doesn't generate DISC-IA or DISC-RM, so an alias can't move their links, and the app
   only finds `Concepts/<exact target>.md`. That is why `Policy Provisions` and `Endorsement` are pages rather
   than sections of `Insurance Policy`, and why `Loss Exposure` (GI-302), `Property Loss Exposure` and
   `Liability Loss Exposure` are three pages. No DISC guide is edited.
2. **Most of Phase C rests on sources I can't read in full.** The DISCs come from The Institutes' course
   texts, GH from Skwire's *Group Insurance* and SOA study notes, ILA and RET from paywalled study notes and
   textbooks. The coverage pages (G1) can be written from the ISO specimen forms (PAP, HO-3, BPP, Causes of
   Loss, CGL), which are widely reproduced; the rest from public sources (NAIC model laws and VM-20, CMS for
   Medicare and Medicaid, CAPSA and the federal PBSA, D'Arcy & Dyer and Mango's 1998 paper, which GI-201 and
   GI-301 assign). Every group's commit will list the facts written from memory, as in Phase B.
3. **`Total Risk` (GH-101: "Apply Total Risk Analysis (TRA) strategies to case-specific pricing") is left
   unresolved.** I couldn't find what the reading means by TRA, and D4 already listed `TRA` as one to leave.
   I'd drop it from Phase C's finish line, so `--check` runs over the other 202 targets. Or I write a short
   page and flag it, if you know the source.
4. **Folded into pages that already cover them**, to avoid near-duplicates:
   - YRT, coinsurance, modified coinsurance and funds withheld → `Reinsurance Transaction`
   - ultimate claims and ultimate values → `Ultimate Loss`
   - claims-made policies → `Claims Made Coverage`
   - the retro premium asset → `Retrospective Premium Reserve`
   - long-duration contracts → `Long-Term Insurance Coverage` (and long-duration *health* contracts → `Health Insurance`)
   - U.S. GAAP, U.S. statutory and ORSA → `GAAP`, `Statutory Accounting Principles`, `ORSA`
   - variable annuities → `Equity-Linked Insurance`
   - the claims acceleration approximation → `Fractional Age Assumption`
   - investigative testing → `Data Diagnostic Analysis`
5. **Three aliases land on a P&C-flavoured page for a life or health objective:** `Life Insurance Risk` →
   `Insurance Risk`, `Critical Metrics` → `Actual vs Expected Analysis` and `Economic Value Creation` →
   `Economic Value`. Each page defines the concept, but its examples are P&C. I'd accept that over three more
   near-duplicates.
6. **Five aliases need a namesake** (a different page on one exam), because the same words mean something else
   there: `Indexing` (passive investing, but inflation indexation on RET-101 → `Plan Design`), `Utilization`
   (health care services, but policyholder option use on ILA-101 → `Experience Study`), `Forecasting`
   (`Time Series Forecast`, but `Strategic Budgeting` on CP-311), `Performance Measurement` (investment
   portfolios, but an insurer's results on GI-201 → `Key Financial Measures`) and `Policy Making Process`
   (`Insurance Regulation`, but `State and Federal Insurance Regulation` on GH-201U).
7. **Skip 12 targets that name no concept** (list below). Each is part of a sentence the noun-phrase linker cut
   out, such as `Physicians Play`, `Organization's Ability` or `United State`. They join Phase B's
   hand-reviewed noise set in `scripts/find_concept_gaps.py`.
8. **Re-render 23 generated guides** (D2) after the alias table grows: GI-101, GI-201, GI-301, GI-302, FAM,
   CP-311, CP-321, CP-341, CP-351, ILA-101, ILA-201I, ILA-201U, INV-101, INV-201, GH-101, GH-201C, GH-201U,
   GH-301, CFE-101, CFE-201, RET-101, RET-201 and RET-301, about 260 links. Link targets change; the text does not.
9. **Optional extras** (aliases only, no new pages): Tier 3 targets the new pages will define anyway —
   `ISO Personal Auto Policy`, `ISO Homeowner`, `ISO Commercial Property` and `Excess Liability` (batch 61),
   `Property Catastrophe Risk Load` (59), `Underwriting Profit Margin` (56) — and D4's acronyms `PAP`, `HO`,
   `CGL`, `ALM`, `IPS` and `WC`. I'd include them. `Premises and Operations Liability` and `Products and
   Completed Operations Liability` (batch 52) are linked only from hand-written DISC-RM, so they need pages of
   their own; I'd leave them to Phase D.

### 10.2 How it would run

- Seven writing groups, one commit each, grouped by topic so each group shares one vocabulary: ISO forms and
  The Institutes' terms for G1–G2, the CIA/NAIC/ILA vocabulary for G3–G4, Fabozzi and the CFA Institute's *Portfolio Management in Practice* for G5, Skwire for
  G6 and McGill/Morneau Shepell for G7. Order: G1 and G2 first, since later pages link them; then G3 and G4;
  then G5, G6 and G7.
- Every page follows §4 (as Phase B did): worked numbers recomputed in Python, `verify_check.py --sync`
  (status `unverified`), and a frontmatter `aliases:` list where a target is folded in. Existing pages get no
  frontmatter edit, so no verified page goes stale; their aliases go in `scripts/concept_aliases.json` only.
- Then one commit for the alias table, namesakes and noise set, and one for the guide re-render.
- Each commit is gated by the template and full-sentence check, a KaTeX render of every formula,
  `validate_links.py --studiable`, `syllabus_lint.py`, `verify_check.py`, and `npm test` + `npm run build`
  in `quiz/`. The finish line is `find_concept_gaps.py --check` over the 202 targets other than `Total Risk` exiting 0.
- Each group's commit lists its pages and any facts stated from memory, for your review (D5).

### 10.3 New pages by writing group (69)

A name in *italics* after a page is a target that becomes its alias.

**G1 — Personal and commercial lines coverages (DISC-IA, DISC-RM, GI-302)** · 15 pages

- `Personal Auto Policy` ← *Automobile Insurance*
- `Auto Physical Damage Coverage`
- `Homeowners Policy`
- `Property Insurance` ← *Loss Payment*
- `Causes of Loss`
- `Commercial Property Insurance`
- `Building and Personal Property Coverage Form`
- `Business Income Coverage`
- `Commercial General Liability` — ✓ written (the example)
- `Umbrella Liability Insurance` ← *Umbrella Liability*
- `Professional Liability Insurance` ← *Professional Liability*
- `Terrorism Insurance` ← *Terrorism*
- `Policy Provisions`
- `Endorsement`
- `Coverage Analysis`

**G2 — Risk management and insurer operations (DISC-RM, CP-311)** · 12 pages

- `Loss Exposure`
- `Property Loss Exposure`
- `Liability Loss Exposure`
- `Risk Identification`
- `Risk Assessment`
- `Risk Control`
- `Insurance Operations`
- `Insurance Producer`
- `Claims Handling`
- `Underwriting Cycle`
- `Porter's Five Forces` ← *Porter's Five Force*
- `Strategic Budgeting` ← *Forecasting*

**G3 — General insurance finance, capital and ERM (GI-201, GI-301, ILA-201, CFE-101, CP-321, CP-351, RET-201)** · 7 pages

- `Premium Liability`
- `Catastrophe Risk Load`
- `Financial Economics`
- `Regulatory Capital` ← *Required Capital*, *Capital Requirement*, *Capital Need*, *Financial Capital*
- `Economic Capital`
- `Risk Diversification`
- `Asset-Liability Management` ← *Asset Liability*

**G4 — Life products, valuation and reinsurance (FAM, ILA-101, ILA-201, CP-341)** · 8 pages

- `Standard Actuarial Notation`
- `Experience Study` ← *Past Experience*
- `Embedded Value` ← *New Business*, *Insurance Enterprise*
- `In-Force Management` ← *Inforce*, *Active In-Force*, *Fundamental Strategy*
- `Policyholder Dividend`
- `Longevity Risk` ← *Longevity*
- `Principles-Based Reserving` ← *Principles-Based Reserve*
- `Credit for Reinsurance` ← *Regulatory Framework*

**G5 — Investments (INV-101, INV-201, RET-101)** · 7 pages

- `Real Estate`
- `Private Equity`
- `Asset Allocation`
- `Passive Management` ← *Indexing*
- `Active Management` ← *Active Strategy*
- `Performance Measurement`
- `Embedded Option`

**G6 — Health (GH-101, GH-201C/U, GH-301, CP-321)** · 13 pages

- `Group Health Insurance` ← *Health Insurance Contract*
- `Group Life Insurance` ← *Group Life*
- `Disability Income Insurance` ← *Disability Income*
- `Long-Term Care Insurance` ← *Long Term Care*
- `Manual Rate` ← *Base Rate*, *Rating Manual*
- `Retiree Group Benefits` ← *Retiree Group Benefit*, *Retiree Health*, *Post-Retirement*, *Post-Employment Benefit*, *Employer Liability*
- `Asset Adequacy Analysis` ← *Asset Adequacy*, *Liability Cash Flow*
- `Investment Income`
- `Health Care System` ← *Funds Flow*, *Market Power*
- `Medicare`
- `Medicaid`
- `Utilization`
- `Provider Reimbursement` ← *Reimbursement*

**G7 — Retirement (RET-101, RET-201, RET-301)** · 7 pages

- `Investment Policy Statement` ← *Investment Policy*, *Plan Investment*, *Retirement Plan Investment*
- `Plan Merger and Spin-Off` ← *Plan Merger*, *Spin-Off*
- `Multi-Employer Plan` ← *Multi-Employer*, *Single Employer*
- `Canadian Pension Legislation` ← *Regulatory Policy*, *Tax Legislation*
- `Plan Termination` ← *Wind-Up*, *Termination-wind-up*
- `Asset Valuation Method` ← *Asset Valuation*
- `Going-Concern Valuation` ← *Ongoing Plan*
### 10.4 Targets an existing page already covers (92)

<details><summary>Alias table entries — target → existing page</summary>

| Target | Existing page |
|---|---|
| `Log-Normal` | Lognormal Distribution |
| `Stop-Loss Insurance` | Stop-Loss Reinsurance |
| `Reinsurance Coverage` | Reinsurance |
| `Reinsurer` | Reinsurance |
| `Unpaid Unallocated Loss Adjustment Expense` | Unallocated Loss Adjustment Expenses ULAE |
| `Exposure Data` | Exposure Base |
| `Ultimate Claim` | Ultimate Loss |
| `Ultimate Value` | Ultimate Loss |
| `Large Claim` | Large Loss |
| `Claim Settlement` | Settlement Rate |
| `Investigative Testing` | Data Diagnostic Analysis |
| `Berquist-Sherman Data` | Berquist-Sherman Method |
| `Claim Frequency` | Frequency |
| `Trend Rate` | Trend |
| `Trending` | Trend |
| `Credit Rating Agency` | Rating Agency |
| `Claim Liability` | Unpaid Claims |
| `Insurance Liability` | Insurance Contract Liabilities |
| `Financial Instrument` | Financial Asset Classification |
| `Reporting Standard` | Financial Reporting |
| `Financial Reporting Standard` | Financial Reporting |
| `Insurance-reinsurance` | Reinsurance Accounting |
| `Credit Score` | Credit-Based Insurance Scoring |
| `Regulatory Environment` | Insurance Regulation |
| `Development Pattern` | Loss Development |
| `Excess Limit` | Excess Loss Development Factor |
| `Layer` | Layer of Insurance |
| `Reinsurance Contract` | Reinsurance |
| `Reinstatement Premium` | Reinstatements |
| `Retrospectively Rated Policy` | Retrospective Rating |
| `Claims-Made Policy` | Claims Made Coverage |
| `Deductible Option` | Deductible Rating |
| `Premium Asset` | Retrospective Premium Reserve |
| `Insurer Financial Health` | Financial Health |
| `Annual Statement` | NAIC Annual Statement |
| `US Regulatory` | State and Federal Insurance Regulation |
| `Reinsurance Arrangement` | Reinsurance Transaction |
| `Reinsurance Treaty` | Treaty Reinsurance |
| `Insolvency` | Solvency |
| `Yearly Renewable Term` | Reinsurance Transaction |
| `Funds Withheld Arrangement` | Reinsurance Transaction |
| `Modified Coinsurance` | Reinsurance Transaction |
| `Contribution Pension Plan` | Defined Contribution Plan |
| `Retirement Financial Security` | Retirement Plan |
| `Whole Life Annuity` | Life Annuity |
| `Annuity Payment` | Life Annuity |
| `Claims Acceleration Approximation` | Fractional Age Assumption |
| `Individual Life` | Life Insurance |
| `Economic Value Creation` | Economic Value |
| `Valuation Standard` | Valuation Principle |
| `Life Insurance Risk` | Insurance Risk |
| `Own Risk Solvency Assessment` | ORSA |
| `US GAAP` | GAAP |
| `Annuity Product` | Annuity Contract |
| `Individual Life Insurance` | Life Insurance |
| `US Statutory` | Statutory Accounting Principles |
| `Default Risk` | Credit Risk |
| `Target Return` | Immunization |
| `Asset Portfolio` | Portfolio |
| `Counterparty` | Credit Risk |
| `Variable Annuity` | Equity-Linked Insurance |
| `Asset Pricing` | Risk-Neutral Valuation |
| `Unearned Premium Reserve` | Unearned Premium |
| `Claim Reserves Held` | Claim Reserve |
| `Long Duration Health Contract` | Health Insurance |
| `Long Duration Contract` | Long-Term Insurance Coverage |
| `Data Source` | Data Quality |
| `Critical Metrics` | Actual vs Expected Analysis |
| `Eligibility Requirement` | Underwriting |
| `Funding Mechanism` | Funding |
| `Funding Case-Specific Risk` | Funding |
| `Health Insurer` | Insurer |
| `Disability Benefit` | Social Insurance |
| `Government Programs Providing Health` | Social Insurance |
| `Insurance Company Financial Statement` | Financial Statements |
| `GAAP Statement` | GAAP |
| `Filing` | Rate Regulation |
| `Policy Making Process` | Insurance Regulation |
| `Data Resource` | Data Quality |
| `Traditional Valuation` | Claim Reserve |
| `Decision-Making Process` | Decision-Making |
| `Risk Limit` | Risk Appetite |
| `Legal Risk` | Operational Risk |
| `Financial Performance` | Key Financial Measures |
| `Savings Plan` | Defined Contribution Plan |
| `Plan Feature` | Plan Design |
| `Retirement Income` | Replacement Ratio |
| `Sponsored Plan` | Retirement Plan |
| `Investment Option` | Defined Contribution Plan |
| `Sponsor Risk` | Plan Sponsor |
| `Retirement Income Plan` | Retirement Plan |
| `Investment Risk` | Market Risk |

</details>

### 10.5 Skipped — not concepts (12)

`Claim Amounts Paid`, `Future Cost`, `Continuous Payment Frequency`, `Claim Data`, `Contracts Described`, `Project Financial`, `Physicians Play`, `Provider Systems Compete`, `United State`, `Applicable Law`, `Third Party`, `Organization's Ability`.


## 11. Phase C record (2026-10-09)

**Outcome.** All 202 Phase C targets other than `Total Risk` resolve (`find_concept_gaps.py --check` over them
exits 0): 69 new pages, 160 alias-table entries and 5 namesakes, and 12 targets reclassified as link noise.
`Total Risk` (GH-101's "Total Risk Analysis") is left unresolved, as agreed. Links resolving on the study guides
rose from 2,968 to 3,383, and missing concepts fell from 690 to 472 (Tier 2: 1, `Total Risk`). The 23
re-rendered guides keep their text word for word (279 link targets moved). Every page passed the template and
full-sentence check, a KaTeX render of every formula (1,409 on the 68 group pages), `verify_check.py` and the
link check; the full app suite (197 files, 3,566 tests), `npm run build`, `syllabus_lint.py` (0 errors;
warnings 2,868 → 2,463), `syllabus_write.py --all --check` and `validate_links.py --studiable` all pass. Each
writer recomputed its worked numbers in Python, and I recomputed a sample (the sprinkler cost-benefit NPV and
break-even). All 69 pages are `unverified` and need human review.

**After merging main (2026-10-10).** Main had regenerated and fact-checked the same 23 guides (single words with
no page are no longer linked; the guides were re-recorded as verified). The merge takes main's guides and
re-renders them through the Phase C alias table: the words are byte-identical to the verified versions, 238 links
are retargeted and 39 newly linked, and each guide's pass is re-recorded as verified against its cited syllabus
PDF (run 2026-10-10T00:02Z/6b32). Phase C's 202 targets still resolve. Main's new phrase cutting creates a few new
gaps that are follow-ups, not Phase C: `Defined Benefit` and `Defined Contribution` (Tier 1),
`Defined Contribution Pension Plan`, `Rated Policy` (from "retrospectively rated policies"), `Provider System`,
`Actual Profit` and `Prescriptive Analytics` (Tier 2). Most want an alias to an existing page.

**How it ran.** Seven writing groups, with G1, G2 and G6 split in half, so ten writers worked in parallel. A
usage limit stopped the first run after eight drafts; the second run re-checked those drafts and wrote the rest.
Each half-group was committed as it passed. Pages run about 1,045–1,526 words counting the LaTeX, against the
approved example's 1,549.

**Points for the reviewer** — facts the writers stated from memory (each group's commit lists its own):
- ISO form details on the G1 pages (PAP definitions and other-insurance rules, HO-3's 10% and 50% defaults and
  16 named perils, the causes-of-loss forms, BPP debris removal and vacancy rules, business income's 72-hour
  wait and 120-day maximum period of indemnity) and TRIA's figures (20% deductible, 80% share, \$200M trigger,
  \$100B cap, authorization through 2027). The DISC readings themselves could not be read.
- The Institutes' lists on the G2 pages (elements and types of loss exposure, identification methods, assessment
  tools, risk control goals and services, claims-process steps) and Koller's value driver formula.
- Regulatory figures: U.S. life RBC formula and action levels, LICAT's scalar, VM-20's reserve and exclusion
  tests, the NAIC credit-for-reinsurance categories and covered agreements, OSFI's unregistered-reinsurance rules.
- Health program parameters: Medicare Parts A-D, MA benchmarks and the 5.9% coding adjustment, the FMAP formula
  and expansion and CHIP matches, RBRVS and ACO rules, the LTC 2-of-6 ADL trigger.
- Pension law: IRC 414(l), MPPAA withdrawal liability, PBSA scope, Ontario's PfAD and 85% solvency threshold,
  PA = 9 x BE - 600.
- Sources read: the CIA Educational Note on premium liabilities (2016), Mango (1998) and D'Arcy & Dyer (1997)
  for G3. Not read: INV101-104-25 (the "hidden dangers of passive" bullet is general knowledge) and GI-301's
  Friedland Ch. 25.

**Overlaps and choices worth a look:**
- `Retiree Group Benefits` leads with IAS 19 rather than ASC 715-60, because CP-321's retiree readings are Canadian.
- `Premium Liability` overlaps the 6C pages `Premium Deficiency` and `Deferred Policy Acquisition Expenses` and agrees
  with them; `Asset-Liability Management` links the FM immunization pages; `Standard Actuarial Notation` overlaps the
  FAM life-contingency pages.
- Two links to `Inflation` were removed from G5 pages: that page is about loss inflation, not price inflation.
- `Decision-Making` (120 words, no formula or example) now appears on the stub list, because the alias
  `Decision-Making Process` sends two guides to it.

**Follow-ups noticed** (not done — outside Phase C's targets):
- Hand-written DISC guides link pages that still don't exist and that no alias can reach: `SWOT Analysis`,
  `Insurtech`, `Period of Restoration`, `Directors and Officers Liability Insurance`, `Terrorism Risk Insurance
  Program`, `Premises and Operations Liability`, `Products and Completed Operations Liability`, `Medical Payments
  Coverage`, `Actual Cash Value`, `Loss Settlement Provisions`, `COPE`, `Business Auto Coverage`. Each needs a
  page or a guide edit (Phase D).
- `Canadian Institute of Actuaries (CIA)` is close to empty (25 words); several RET pages link it.
- The existing `Shapley Value` page is written for SHAP; `Catastrophe Risk Load` links it for the game-theory definition.

## 12. Phase D plan (2026-10-10)

Phase D is Tier 3: the 441 single-link targets in pinned batches 50–109, plus the 8 Tier 1 and Tier 2 targets that
main's phrase cutting created after Phase C (`Defined Benefit`, `Defined Contribution`, `Rated Policy`, `Total Risk`,
`Actual Profit`, `Provider System`, `Prescriptive Analytics`, `Defined Contribution Pension Plan`). That is 449
targets. Eight triage agents, one per domain, read each target in its objective sentence and checked it against the
1,140 existing concept pages; I merged their results across domains. Approved by the request to implement Phase D
with D2's alias rule (the linked spelling goes in the page's `aliases:` and in `scripts/concept_aliases.json`, then the
development guides are re-rendered in their own commit).

| Outcome | Targets | Pages |
|---|---|---|
| A new page under the target's own name | 121 | 121 new |
| A new page under a better title; the target becomes its alias (D2) | 51 | 49 new |
| Folded into another Phase D page; alias only | 60 | — |
| An existing page already covers it; alias only | 194 | — |
| Not a concept; skip (D3) | 22 | — |
| Can't identify the concept; leave unresolved (`Total Risk`, as agreed in Phase C) | 1 | — |
| **Total** | **449** | **170 new** |

### 12.1 Judgment calls

1. **The hand-written DISC guides get pages under their exact names** (47 targets: 21 DISC-IA, 15 DISC-RM, 11
   DISC-DA), as in Phase C §10.1. Five of them overlap an existing page: `Actual Cash Value` (`Replacement Cost`),
   `Terrorism Risk Insurance Program` (`Terrorism Insurance`), `Table Join` (`Relational Database`), `Period of
   Restoration` (`Business Income Coverage`) and `SWOT Analysis` (`Porter's Five Forces`). Each was written to keep to
   its own concept and to link the existing page rather than repeat it, since editing a verified hand-written guide
   was out of scope.
2. **Cross-domain merges.** `Indexed Annuity` serves INV-201 and ILA-101 (alias *Index-Linked Credit*). One
   `Life Insurance Company Taxation` page serves ILA-201U, ILA-201I and GH-201C (*Taxable Income*, *Corporate
   Taxation*, *US Company Tax Rule*). Four GI-302 and GI-201 targets point at DISC pages, whose briefs were widened to
   serve them: *Cyber Risk* → `Cyber Insurance`, *Commercial Auto Insurance* and *ISO Commercial Automobile Policy* →
   `Business Auto Coverage`, *International Business* → `International Insurance`.
3. **Five namesakes** keep generic words exam-specific: `funding requirement` (GI-101 → `Self-Insurance Funding`,
   elsewhere `Funding`), `life insurance reserve` (ILA-101 → `Commissioners Reserve Valuation Method`, elsewhere
   `Policy Value`), `government regulation` and `reporting requirement` (RET-301 → `Canadian Pension Legislation`)
   and `cap` (INV-201 → `Payoff`, elsewhere `Cap on Non-Pecuniary Damages`).
4. **A few bare words from the ambiguous table are aliased** where the context is clear: `IAA`, `OTC` → `Derivative
   Instrument`, `Lemma` → `Itō Calculus`, `Put` and `Floor` → `Payoff`, `Collar` → `Option Trading Strategy`. After the
   re-render they land only on INV-201, plus FAM's "puts and calls", which means put options.
5. **Aliases onto a page from another jurisdiction or line**, the trade-off Phases B and C accepted: *Signing
   Actuary* → `Appointed Actuary Responsibilities`, *Premium Deficiency Reserve* → `Premium Deficiency`,
   *Guaranty Association* → `Guaranty Funds`, *Reinsurance Counterparty Credit Risk* → `Reinsurance Credit Risk`,
   *Market Conduct Compliance Activity* → `Market Conduct Regulation`, *Organizational Decision-Making* →
   `Decision-Making` (a stub).
6. **Skip 22 targets that name no concept** (list below); they join the hand-reviewed noise set.
7. **Re-render 26 generated guides** after the alias table grows. Phase B/C precedent: words unchanged, each guide's
   pass re-recorded as verified against its syllabus PDF.

### 12.2 How it ran

- 25 writing groups (W01–W25) of 6–9 pages, each sharing one reading's vocabulary, written by parallel agents to the
  §4 template and the writer brief: worked numbers recomputed in Python, `verify_check.py --sync` (status
  `unverified`), a template check (§4 shape, bold labels with colons, links that resolve) and a KaTeX render of
  every formula through the app's own `normalizeVaultMath` + remark-math pipeline. One commit per group, listing the
  facts its writer stated from memory.
- Then one commit for the noise set, one for the alias table, one for the re-render, and a follow-up for slash
  phrases.

### 12.3 New pages by writing group (170)

A name in *italics* after a page is a target (or a second spelling) that becomes its alias.

**W01 — Specialty liability and commercial coverages** (DISC-IA, GI-201, GI-302) · 8 pages

- `Directors and Officers Liability Insurance`
- `Employment Practices Liability Insurance`
- `Fiduciary Liability Insurance`
- `Environmental Insurance`
- `Aircraft Insurance`
- `Cyber Insurance` ← *Cyber Risk*
- `International Insurance` ← *International Business*
- `Terrorism Risk Insurance Program`

**W02 — Tort law for insurance professionals** (DISC-IA) · 6 pages

- `Negligence`
- `Premises Liability`
- `Intentional Tort`
- `Strict Liability`
- `Products Liability`
- `Compensatory Damages`

**W03 — Policy concepts and personal-lines coverages** (DISC-IA) · 7 pages

- `Insurable Risk`
- `Actual Cash Value`
- `Loss Settlement Provisions`
- `Medical Payments Coverage`
- `Health Insurance Plans`
- `Common Policy Conditions`
- `Blanket Insurance`

**W04 — Commercial underwriting** (DISC-RM, GI-302) · 7 pages

- `Underwriting Authority`
- `Underwriting Policy`
- `Period of Restoration`
- `Premises and Operations Liability`
- `Products and Completed Operations Liability`
- `Commercial Crime Insurance`
- `Business Auto Coverage` ← *Commercial Auto Insurance*, *ISO Commercial Automobile Policy*

**W05 — Insurer operations, distribution and strategy** (DISC-RM) · 7 pages

- `Organizational Resilience`
- `Business Continuity Management`
- `Insurer Goals and Constraints`
- `Types of Insurers`
- `Insurance Marketing`
- `Insurance Distribution Systems`
- `SWOT Analysis`

**W06 — Data management and SQL** (DISC-DA) · 6 pages

- `Table Join`
- `Database Index`
- `User-Defined Function`
- `Data Mart`
- `Structured Data`
- `Data Preparation`

**W07 — Data governance, ethics and digitization** (DISC-DA, DISC-RM) · 6 pages

- `Data Documentation`
- `Statistical Plan`
- `Data Validation`
- `Web Scraping`
- `Data Ethics`
- `Insurtech`

**W08 — ERM risk identification and non-financial risk (CFE-101)** (CFE01) · 6 pages

- `Emerging Risk`
- `Key Risk Indicator` ← *Monitoring Mechanism*
- `Compounding Risk`
- `Contagion Risk` ← *Contagion-Related Risk*
- `Non-Financial Risk`
- `Internal Control` ← *Organizational Process*

**W09 — Strategic management and decision-making (CP-311, CFE-101)** (CFE01, CP-311) · 6 pages

- `External Environment` ← *Business Environment*, *Market Opportunity*
- `Business-Level Strategy`
- `Competitive Dynamics`
- `Corporate-Level Strategy`
- `Cognitive Bias` ← *Cognitive Biase*
- `Decision Analysis` ← *Uncertain Condition*

**W10 — Corporate finance, accounting and operations (CFE-201, CP-311)** (CFE-201, CP-311) · 6 pages

- `Corporate Finance`
- `Capital Budgeting`
- `Mergers and Acquisitions` ← *External-inorganic Growth Strategy*
- `Foreign Currency Translation` ← *Foreign Exchange Rate*
- `Managerial Accounting` ← *Distort Perceived Performance*, *Drive Decision Making*
- `Operational Excellence` ← *Business Process*, *Operational Process*

**W11 — GI actuarial practice, reserving and reinsurance** (GI-201, GI-301, GI01) · 7 pages

- `Generalized Cape Cod Method` ← *Generalized Cape Cod*
- `Self-Insurance Funding` ← *Funding Requirement*
- `Risk Transfer Testing`
- `Catastrophe Model Output` ← *Catastrophe Modeling Output*
- `Professional Judgment`
- `International Actuarial Association` ← *Professionalism Principle*
- `Behavioral Finance`

**W12 — GI legal environment and U.S. coverages** (GI-201, GI-302) · 6 pages

- `Insurance Law`
- `Social Inflation` ← *Tort Trend*
- `International Legal Environment`
- `Transnational Tort Litigation` ← *Tort Law Environment*
- `Employers Liability Insurance` ← *ISO WC*
- `Specialty Insurance Coverage`

**W13 — Health benefits products and pricing (GH-101, CP-321, GH-201C)** (CP-321, GH01) · 8 pages

- `Medical Cost Trend` ← *Medical Cost Trend Experience*
- `Pharmacy Benefit` ← *Prescription Drug*
- `Product Development Process`
- `Employee Benefit Plan` ← *Employee Benefit Strategy*
- `Critical Illness Insurance` ← *Critical Illness*
- `Medicare Supplement Insurance` ← *Medicare Supplement*
- `Social Security Disability Insurance` ← *Social Security Disability Income Benefit*
- `Long-Term Care Rate Increase` ← *Long Term Care Rate Increase*

**W14 — Health analytics (GH-301, GH-201U)** (GH-201U, GH-301, GH01) · 8 pages

- `Health Risk Adjustment` ← *Risk Score*, *Normalize Population Claims Experience*, *Reflects Patient Risk*, *Risk Assessment Mechanism*
- `Care Management Program` ← *Healthcare Intervention*, *Care Management Situation*, *Non-Chronic Trend*
- `Medical Coding` ← *Coding Set*, *Coding Structure*, *Revenue Code*
- `Clinical Policy Bulletin`
- `Healthcare Data` ← *Healthcare Claim*, *Private Data*, *Multiple Data*, *Common Healthcare Data*
- `Accountable Care Organization`
- `Social Determinants of Health` ← *Social Determinant*, *SDOH Derived Statistics*
- `Affordable Care Act` ← *ACA Product*

**W15 — Derivative instruments and strategies** (INV-201) · 7 pages

- `Derivative Instrument`
- `Central Clearing` ← *Derivatives Trading*
- `Daily Settlement` ← *Daily Settle*, *Daily Margin Variation*
- `Option Trading Strategy` ← *Derivatives Strategy*, *Call Spread*, *Put Spread*, *Butterfly Spread*, *Collar*, *Strangle*
- `Exotic Option` ← *Asian Option*
- `Swaption`
- `Option Greeks` ← *Cross Greek*

**W16 — Stochastic calculus and valuation theory** (INV-201) · 6 pages

- `Itō Calculus` ← *Stochastic Calculus Theory*, *Isometry*
- `Stochastic Differential Equation`
- `Martingale`
- `Girsanov's Theorem`
- `Numeraire`
- `Arrow-Debreu Security` ← *Arrow-Debreau Security*, *Incomplete Market*

**W17 — Volatility, numerical methods and index-linked products** (CP-312, INV-201) · 7 pages

- `Euler-Maruyama Discretization` ← *Numerical Discretization*, *Transition Density*
- `Model Calibration` ← *Observed Price*, *Traded Security*
- `Volatility Smile` ← *Modeling Smile*, *Local Volatility*
- `Stochastic Volatility`
- `Indexed Annuity` ← *Index-Linked Credit*
- `Structured Product`
- `Target Volatility Fund` ← *Fund Performance*

**W18 — Fixed income and credit (INV-101)** (INV01) · 7 pages

- `Corporate Bond`
- `Leveraged Loan`
- `Mortgage Loan` ← *Residential Mortgage*
- `Mortgage-Backed Security` ← *Mortgage-backed Security*
- `Private Debt`
- `Fixed Income Portfolio` ← *Fixed Income Investment*, *Enhance Yield*
- `Credit Risk Modeling`

**W19 — Portfolio management and ALM (INV-101, CP-351)** (CP-351, INV01) · 9 pages

- `Asset Class`
- `Public Equity`
- `Hedge Fund`
- `Portfolio Management Process` ← *Investment Governance Structure*
- `Institutional Investor`
- `Interest Rate Derivative`
- `ALM Risk`
- `ALM Failure`
- `Long-Tail Liability` ← *Long-Tail Insurance Liability*

**W20 — Life reinsurance** (CP-341, ILA01) · 7 pages

- `Inforce Reinsurance`
- `Offshore Reinsurance` ← *International Reinsurance Regulatory Framework*
- `Private Equity-Backed Insurer` ← *Private Equity Backed Reinsurer*, *Private Equity Involvement*
- `Captive Reinsurance` ← *Captive Reinsurance Transaction*
- `Pension Risk Transfer` ← *PRTs-longevity Swap*
- `Reinsurance Administration`
- `Life Reinsurance Treaty` ← *Reinsurance Agreement Provision*

**W21 — Life valuation, accounting and taxation** (GH-201C, ILA-201I, ILA-201U, ILA01) · 7 pages

- `Commissioners Reserve Valuation Method` ← *Formulaic Reserve*, *Life Insurance Reserve*
- `Liability for Future Policy Benefits` ← *Term Insurance Reserve*
- `Deferred Acquisition Cost`
- `Nonforfeiture Benefit` ← *Nonforfeiture*
- `Policyholder Taxation` ← *Canadian Tax Regulation*
- `Life Insurance Company Taxation` ← *Corporate Taxation*, *Taxable Income*, *US Company Tax Rule*
- `Investment Income Tax`

**W22 — Life assumptions, products and profit analysis** (ALTAM, CP-312, ILA01) · 7 pages

- `Mortality Table Construction` ← *Modern Mortality Table*
- `Premium Persistency`
- `Term Conversion`
- `Dynamic Policyholder Behavior` ← *Dynamic Policyholder*
- `Economic Scenario Generator`
- `Life Insurance Distribution` ← *Annuity Distribution*
- `Analysis of Surplus` ← *Actual Profit*

**W23 — Retirement plan types and participant risk** (RET-201, RET-301, RET01) · 7 pages

- `Hybrid Plan`
- `Target Benefit Plan` ← *Shared Risk Plan*
- `Executive Retirement Plan` ← *Retirement Funding Alternative*
- `Public Sector Pension Plan` ← *Public Sector Employer*, *Government-sponsored Plan*
- `Retirement Risk`
- `Decumulation` ← *Decumulation Feature*
- `Investment Vehicle`

**W24 — Plan features and member options** (RET01) · 6 pages

- `Vesting` ← *Benefit Eligibility Requirement*
- `Ancillary Benefit`
- `Optional Form of Payment` ← *Payment Option*, *Optional Form*
- `Early Retirement` ← *Benefit Subsidy*
- `Postponed Retirement` ← *Late Retirement Option*
- `Employee Contribution` ← *Optional Employee Contribution*

**W25 — Pension valuation, accounting, funding and Canadian tax** (RET-201, RET-301, RET01) · 6 pages

- `Actuarial Cost Method` ← *Cost Recognition*
- `Plan Curtailment`
- `Funding Policy` ← *Stakeholders' Interest*
- `Commuted Value` ← *Portability Option*
- `Tax Treatment of Retirement Plans` ← *Tax Incentive*, *Taxpayers' Perspective*
- `Registered Retirement Savings Plan` ← *Individual Savings Plan*
### 12.4 Targets an existing page already covers (194)

<details><summary>Alias table entries — target → existing page</summary>

| Target | Existing page |
|---|---|
| `Prescriptive Analytics` | Data Analytics |
| `Capital Assessment` | Economic Capital |
| `Marginal Capital` | Risk Capital |
| `Return Trade-Off` | Business Strategy |
| `Gauge Performance` | Risk-Adjusted Performance |
| `Organization's Risk Profile` | Risk Appetite |
| `Risk Strategy` | Risk Mitigation |
| `Risk-capital Strategy` | Risk Capital |
| `Market Conduct Compliance Activity` | Market Conduct Regulation |
| `Risk Accumulation` | Concentration Risk |
| `Risk Aggregation` | Risk Diversification |
| `Optimal Capital Structure` | Capital Structure |
| `Competitive Environment` | Porter's Five Forces |
| `Financial Metrics` | Key Financial Measures |
| `Organization's Performance` | Key Financial Measures |
| `Reported Financial Statement` | Financial Statements |
| `Organization's Business Strategy` | Business Strategy |
| `Organizational Decision-Making` | Decision-Making |
| `Sustainable Growth` | Strategic Budgeting |
| `Effective Strategic Budgeting` | Strategic Budgeting |
| `Financial Budgeting` | Strategic Budgeting |
| `Forecasting Decision Making Process` | Strategic Budgeting |
| `Organization's Initiative` | Strategic Budgeting |
| `Tracking Progress` | Strategic Budgeting |
| `Conduct Investigative Testing` | Data Diagnostic Analysis |
| `Actuary's Responsibility` | Actuarial Communication |
| `Professionalism Requirement` | Professional Responsibilities of the Actuary |
| `Earnings Pattern` | Earned Premium |
| `Ultimate Premium` | Premium Audit |
| `Claim Transaction Data` | Development Triangle |
| `Influencing Average Premium Level` | Premium Trend |
| `Data Triangle` | Development Triangle |
| `Required Data` | Reserving Data Organization |
| `Case Estimate` | Case Reserves |
| `Development-Based Frequency-Severity` | Frequency-Severity Method |
| `Projected Ultimate Value` | Ultimate Loss |
| `Contingency Margin` | Profit and Contingency Provision |
| `Expense Trending` | Expense Provisions |
| `Fundamental Ratemaking` | Ratemaking |
| `Inflation-Sensitive Exposure` | Exposure Trend |
| `EU Solvency II Capital Requirement` | Solvency II |
| `Claim Handling Process` | Claims Handling |
| `Insurer Risk` | Risk Control |
| `Pricing General Insurance Policy` | Ratemaking |
| `Risk Mitigation Instrument` | Insurance-Linked Securities |
| `Mass Torts-class Action Suit` | Mass Tort |
| `Collective Insurance Industry Organization` | Government and Industry Insurance Programs |
| `Insolvency Regulation` | Solvency Regulation |
| `Insurance Actuarial Opinion` | Statement of Actuarial Opinion |
| `Pricing Property Catastrophe Cover` | Reinsurance Pricing |
| `Claims-Made Contract` | Claims Made Coverage |
| `Increased Limit Option` | Increased Limits |
| `Chain Ladder Estimator` | Mack Chain Ladder Model |
| `Parametric Estimator` | Growth Curve |
| `Reserve Variability` | Unpaid Claim Distribution |
| `Stochastic Loss Development` | Stochastic Reserving |
| `Signing Actuary` | Appointed Actuary Responsibilities |
| `Signing General Insurance Actuary` | Appointed Actuary Responsibilities |
| `NAIC Annual Statement Pages-schedule` | Annual Statement Schedules |
| `NAIC RBC` | Risk-Based Capital |
| `Statutory Financial Statement` | NAIC Annual Statement |
| `Premium Basis` | Workers Compensation Classification |
| `Insurance Department` | Insurance Regulator |
| `Insurance Commissioners' Duty` | Insurance Regulator |
| `Insurance Personnel` | Insurance Producer |
| `Licensing Requirement` | Insurance Regulator |
| `Regulatory Body` | State and Federal Insurance Regulation |
| `Rated Policy` | Retrospective Rating |
| `Legal Cases-issue` | Court Case |
| `Asset Adequacy Standard` | Asset Adequacy Analysis |
| `Asset Matching` | Asset-Liability Management |
| `Cash Flow Projection` | Asset Adequacy Analysis |
| `Mismatched Asset` | Asset-Liability Management |
| `IFRS 17, US GAAP` | Accounting Standards |
| `Data Credibility` | Credibility |
| `Base Rate Development` | Manual Rate |
| `Guaranty Association` | Guaranty Funds |
| `Policy Reserve` | Policy Value |
| `Non-Claim Reserves Held` | Reserve |
| `Premium Deficiency Reserve` | Premium Deficiency |
| `Employers Offer Retiree Group Benefit` | Retiree Group Benefits |
| `Life Plan Design` | Retiree Group Benefits |
| `Post-Employment Benefit Plan` | Retiree Group Benefits |
| `Retiree Health Valuation` | Retiree Group Benefits |
| `Service Cost` | Retiree Group Benefits |
| `Plan Provision` | Group Health Insurance |
| `Short Duration Contract` | Short-Term Insurance Coverage |
| `Case-Specific Pricing` | Experience Rating |
| `Claim Credibility` | Credibility |
| `Underwriting Situation` | Underwriting |
| `Health Insurance Company` | Life Insurance Company |
| `Insurer Financial Statement` | Financial Statements |
| `International Financial Reporting Standard` | IFRS |
| `Canadian Health Care System` | Health Care Insurance |
| `Private Group Insurance Plan` | Group Health Insurance |
| `Capital Strain` | Regulatory Capital |
| `Canadian Healthcare System` | Health Care Insurance |
| `Filing Requirement` | Rate Regulation |
| `Medicaid Program Structure` | Medicaid |
| `Medicare Benefit` | Medicare |
| `Short Duration Group` | Short-Term Insurance Coverage |
| `Utilization Rate` | Utilization |
| `Provider Payment` | Provider Reimbursement |
| `Standard Contracting` | Provider Reimbursement |
| `Health Care Cost` | Health Care System |
| `Provider System` | Health Care System |
| `Health Benefit` | Health Care System |
| `Operational Failure` | Operational Risk |
| `Dynamic Hedging` | Hedging |
| `Guarantee Cost` | Equity-Linked Insurance |
| `Hedge Strategy` | Hedging |
| `Implied Volatility` | Volatility |
| `Variable Annuity Guarantee Rider` | Equity-Linked Insurance |
| `Floor` | Payoff |
| `Pricing Derivative` | Risk-Neutral Valuation |
| `Regulatory Capital Adequacy` | Regulatory Capital |
| `Risk Identification Tool` | Risk Identification |
| `Insurance Contracts Generate Embedded Option` | Embedded Option |
| `ALM Context` | Asset-Liability Management |
| `Asset Allocation Strategy` | Asset Allocation |
| `Extreme ALM Event` | Stress Testing |
| `Liability Profile` | Asset-Liability Management |
| `Transferring Risk` | Risk Transfer |
| `Structured Credit Product` | Structured Finance |
| `Passive Strategy` | Passive Management |
| `Asset Benchmark` | Performance Measurement |
| `Optimal Portfolio Allocation` | Asset Allocation |
| `Performance Attribution Metrics` | Performance Measurement |
| `Equity-Linked Guarantee` | Equity-Linked Insurance |
| `Long-Term Insurance Business` | Long-Term Insurance Coverage |
| `Governance Best Practice` | Model Governance |
| `Governance Documentation` | Model Governance |
| `Organizational Structure` | Model Governance |
| `OSFI Requirement` | Credit for Reinsurance |
| `Reinsurance Requirement` | Credit for Reinsurance |
| `US Stat Requirement` | Statutory Accounting Principles |
| `Reinsurance Counterparty Credit Risk` | Reinsurance Credit Risk |
| `Advanced Reinsurance Transaction` | Reinsurance Transaction |
| `Annuity Coinsurance` | Reinsurance Transaction |
| `Life Insurance Yearly Renewable Term` | Reinsurance Transaction |
| `Non-Proportional Reinsurance Transaction` | Types of Reinsurance |
| `Annuity Product Design` | Annuity Contract |
| `Common Profit Metrics` | Profit Testing |
| `Pricing Insurance Product` | Profit Testing |
| `Pricing Practice` | Profit Testing |
| `Annuity Context` | Annuity Contract |
| `Annuity Liability` | Annuity Contract |
| `Common Insurance Guarantees Generate Embedded Option` | Embedded Option |
| `Duration-convexity Matching` | Redington Immunization |
| `Integrating ALM` | Asset-Liability Management |
| `Life Insurance Reinsurance Arrangement` | Reinsurance Transaction |
| `International Regulatory Framework` | Regulatory Capital |
| `Rising Interest Rate Environment` | Interest Rate Risk |
| `Annuity Insurance Product` | Annuity Contract |
| `Common Life` | Life Insurance |
| `Common Valuation` | Valuation Principle |
| `International Capital Requirement` | Regulatory Capital |
| `International Framework` | Regulatory Capital |
| `International Life Insurance Company` | Life Insurance Company |
| `Crediting Rating Agency Framework` | Rating Agency |
| `Defined Benefit` | Defined Benefit Plan |
| `Defined Contribution Pension Plan` | Defined Contribution Plan |
| `Plan Design Feature` | Plan Design |
| `Sponsor's Plan` | Plan Design |
| `Retirement Plan Design` | Plan Design |
| `Retirement Fund Asset` | Investment Policy Statement |
| `Contribution Formula` | Plan Design |
| `Participant Investment Option` | Defined Contribution Plan |
| `Plan Eligibility Requirement` | Plan Design |
| `Retirement Plan Asset` | Investment Policy Statement |
| `Benefit Adequacy` | Replacement Ratio |
| `Replacement Income` | Replacement Ratio |
| `Single Employer Sponsored Retirement Plan` | Multi-Employer Plan |
| `Social Insurance Plan` | Social Insurance |
| `Pension Valuation` | Pension Plan |
| `Cost Stability` | Asset Valuation Method |
| `Pension Benefit` | Pension Plan |
| `Periodic Valuation` | Going-Concern Valuation |
| `Cash Flow Requirement` | Investment Policy Statement |
| `Plan Sponsor Risk` | Plan Sponsor |
| `Plan Asset Composition` | Asset Allocation |
| `Single-employer Plan` | Multi-Employer Plan |
| `Asset Transfer` | Plan Merger and Spin-Off |
| `Government Regulation` | Canadian Pension Legislation |
| `Members' Right` | Canadian Pension Legislation |
| `Plan Amendment` | Canadian Pension Legislation |
| `Plan Establishment` | Canadian Pension Legislation |
| `Registered Retirement Plan` | Canadian Pension Legislation |
| `Reporting Requirement` | Canadian Pension Legislation |
| `Tax Regulation Pertaining` | Canadian Pension Legislation |
| `Pension Plan Funding` | Funding |
| `Defined Contribution` | Defined Contribution Plan |
| `Traditional Defined Benefit Plan` | Defined Benefit Plan |
| `Funding Restriction` | Canadian Pension Legislation |

</details>

### 12.5 Skipped — not concepts (22)

`Organization Optimiz`, `Evolving Quantitative`, `Making Suboptimal Individual`, `Organizational Behavior Plays`, `Real-Life Scenario`, `Syllabus Resource`, `Quality Perspective`, `Quality Viewpoint`, `Traditional Actuarial Practice`, `Portfolio's Exposure`, `Individual Security`, `Portfolio Level`, `Complex Component`, `Financial Business`, `Global Jurisdiction`, `Global Reinsurance Market`, `Common Asset`, `Challenges Insurer`, `Employee Perspective`, `Introducing Option`, `Labor Force Demographics`, `Promote Employee Behavior Consistent`.

## 13. Phase D record (2026-10-10)

**Outcome.** All 448 Phase D targets other than `Total Risk` resolve (`find_concept_gaps.py --check` over them exits
0): 170 new pages, 310 alias-table entries and 5 namesakes, and 22 targets reclassified as link noise. Links resolving
on the study guides rose from 3,390 to 3,858, and missing concepts fell from 449 to 1 (`Total Risk`). The 26
re-rendered guides keep their words exactly (327 link targets moved, 3 phrases newly linked: `IAA`, `vesting`,
`puts`), and each guide's pass is re-recorded as verified against its cited syllabus PDF (runs
2026-10-10T08:57Z/4697 and a second for the four guides the slash-phrase fix touched). Every page passed the template
check and a KaTeX render (3,910 formulas on the 170 pages, 0 problems); `verify_check.py` (0 errors, 0 warnings), the
full app suite (202 files, 3,811 tests), `npm run build`, the scripts' unit tests, `syllabus_lint.py` (0 errors;
warnings 1,402 → 946), `syllabus_write.py --all --check` and `validate_links.py --studiable` all pass. Each writer
recomputed its worked numbers in Python, and I recomputed a sample (the control-test upper bound of 12.4% for 3
exceptions in 60, and 4.9% for none). All 170 pages are `unverified` and need human review. Pages run 1,036–1,757
words counting the LaTeX (median 1,306).

**How it ran.** Eight triage agents, then 25 writers in waves of about ten. A usage limit stopped the last five groups
(W21–W25) partway; after the reset a second writer for each reviewed every draft the first had left, recomputed its
numbers and finished the group. That review found and fixed real errors on four W24 drafts (two worked values, an
inverted inequality in a trap, an interest-only factor), so the drafts were not trusted as they stood.

**Checked against a source** (the rest is AI-drafted from general knowledge; each group's commit lists what its
writer stated from memory):
- Ruhm & Brehm (2007, *Variance*) for `Risk Transfer Testing`; the IAA's "Professional Standards" Risk Book (2023)
  for `International Actuarial Association`; Ritter's behavioral finance paper (sections 1–3) for `Behavioral Finance`.
- The NAIC Medicare supplement refund calculation form for `Medicare Supplement Insurance`.
- IRC sections 807(d) and 848, Canada's Budget 2022 measures and Income Tax Act sections 211–211.1 for `Life Insurance
  Company Taxation` and `Investment Income Tax` (which falls in effect on exempt policies; the writing brief had it the
  other way round).
- General American's 1999 put-option run (`ALM Failure`), from a web search.

**Points for the reviewer** — the facts most worth checking, by area:
- *DISC courses:* nothing could be checked against The Institutes' texts. The ISO form details (IL 00 17 conditions,
  the 2018 PAP Part B, business auto symbols, crime insuring agreements, the period of restoration), D&O/EPLI/
  fiduciary provisions, TRIP's recoupment and extension dates, the tort-law cases and Restatement sections, and the
  claim-valuation factors (a reconstruction of DISC-IA 3.7).
- *Investments:* Hull 11e chapter attributions, the change-of-numeraire drift, NAIC designations, leveraged-loan and
  mortgage conventions, Heston's and CIR's Feller conditions.
- *Health:* the CMS-HCC and HHS-HCC details, ACO and ACA program parameters, SSDI's 2026 bend points (from a web
  search), the NAIC LTC rate framework and its 2025 revision.
- *Life:* Bermuda's BSCR regime, AG48, LDTI's details, the standard nonforfeiture law's allowance, Canada's 8-pay
  exemption test.
- *Retirement:* ASC 715 and IAS 19 curtailment and settlement rules, CIA section 3500's commuted-value basis, the
  RRSP and RCA rules, New Brunswick's shared risk tests.

**Overlaps worth a look:** the five DISC pages next to existing pages (§12.1); `Social Inflation` and `Nuclear Verdicts`;
`Long-Tail Liability` (life and pension sense) and `Long Tail Lines` (P&C); `Non-Financial Risk` and IFRS 17's `Risk
Adjustment for Non-Financial Risk`; `Cognitive Bias` and `Behavioral Finance` (same prospect-theory parameters);
`Employers Liability Insurance` notes that the standard form is NCCI's, though GI-302 links it as *ISO WC*.

**Follow-ups noticed** (not done — outside Phase D's targets):
- Variant links that still go through a link fix rather than the page they mean, most of them older than Phase D:
  `Decision Making`, `Financial Statement`, `Financial Report`, `Maximum Likelihood Estimate(-or)`, `Hypothesis Test`,
  `Long Term Insurance Coverage`, `Individual-joint Life Mortality`, `Insurance-reinsurance`, `Plan Sponsor'`, `Plan
  Termination-wind-Up`. Each wants an alias keyed the way the generator looks phrases up (slash and possessive forms
  kept, as the slash-phrase commit does).
- The ambiguous table still lists `SQL` and `COPE` (hand-written DISC guides, so each needs a page), `PDE`, `Forward`,
  and single words (`Accuracy`, `Test`, `Organization`, `Stakeholder`, `Provider`, `Performance`, `Coefficient`).
- `Workers Compensation Insurance` is Canadian only, but the `wc` alias sends GI-302 (U.S.) there; it may want a
  namesake or a U.S. section.
- `Risk Transfer` has nothing on pension risk transfer; the new `Pension Risk Transfer` page could be linked from it.
- `Decision-Making` is still a stub, and now more guides lean on it.

<!-- gaps:begin -->

_Generated by `python3 scripts/find_concept_gaps.py --update-plan`. Do not edit between the markers._

### Summary — where every link on the study guides goes

| Bucket | Distinct targets | Links |
|---|---|---|
| Resolve exactly (Obsidian and the app) | | 4,860 |
| Resolve only case-insensitively (Obsidian yes, app no) | | 0 |
| Resolve through a frontmatter `aliases:` | | 6 |
| **Concepts to write** (tiered and batched below) | **217** | 280 |
| Variant spelling of an existing page — link fix | 8 | 10 |
| Cut short — the link plus its next words names an existing page | 4 | 5 |
| Link noise — names no concept (`Cannot`, `Differ Compared`) | 42 | 63 |
| One-word target, not a term of art — triage | 48 | 78 |
| Ambiguous — needs your decision | 8 | 12 |
| Missing reading — `Resources/Books/`, Source Material only | 0 | 0 |
| **Total** | | **5,314** |

Within the concepts to write: 1 duplicate spellings merged (+0 acronyms, +3 fragments). Tier 1 / 2 / 3: **1 / 32 / 184**, in **125 batches** (98 done). Existing concept pages that are stubs: **21**.

### Missing concepts by exam

A concept linked from several exams counts once under each.

| Exam | Stage | Tier 1 | Tier 2 | Tier 3 | Total |
|---|---|---|---|---|---|
| DMAC (SOA) | development | 0 | 6 | 52 | 58 |
| FAP (SOA) | development | 1 | 5 | 44 | 50 |
| PAF (SOA) | development | 1 | 2 | 27 | 30 |
| 6I (CAS) | development | 0 | 4 | 21 | 25 |
| VEE-ECON (SOA) | development | 0 | 5 | 13 | 18 |
| FAC (SOA) | development | 0 | 4 | 4 | 8 |
| VEE-AF (SOA) | development | 0 | 2 | 6 | 8 |
| ASF (SOA) | development | 0 | 1 | 7 | 8 |
| APC (SOA) | development | 0 | 3 | 1 | 4 |
| VEE-MS (SOA) | development | 0 | 0 | 4 | 4 |
| RET-201 (SOA) | development | 0 | 3 | 0 | 3 |
| COP (CAS) | development | 0 | 2 | 0 | 2 |
| GI-302 (SOA) | development | 0 | 0 | 2 | 2 |
| RET-301 (SOA) | development | 0 | 1 | 0 | 1 |
| GH-101 (SOA) | development | 0 | 1 | 0 | 1 |
| CFE-101 (SOA) | development | 0 | 0 | 1 | 1 |
| RET-101 (SOA) | development | 0 | 0 | 1 | 1 |
| 6T (CAS) | development | 0 | 0 | 1 | 1 |

### Batches

In order. Each batch is one topic (the exam and syllabus section it is most heavily linked from); a prerequisite from another topic is pulled forward into the batch that needs it.

- **Batch 1** (Tier 1, done) · Short-term insurance (P&C, general) (ASTAM (SOA) › Reserving and Pricing for Short-Term Insurance Coverages; ASTAM (SOA) › Construction and Selection of Parametric Models) · 13 concepts: `Convolution`, `Estimator`, `Delta`, `Average Rate`, `Outstanding Claim`, `Insurance Coverage`, `Short-Term Insurance`, `Short-Term Insurance Coverage`, `Liability Insurance`, `Rate Level`, `Exposure`, `Insurance Company`, `Insurable Interest`
- **Batch 2** (Tier 1, done) · Long-term insurance (life, annuities) (ALTAM (SOA) › Embedded Options in Life Insurance and Annuity Products; ALTAM (SOA) › Pension Plans and Retirement Benefits) · 10 concepts: `Black-Schole`, `Payoff`, `Accrued Liability`, `Normal Cost`, `Health Insurance`, `Life Insurance`, `Universal Life Insurance`, `Validation`, `Reinsurance Transaction`, `Annuity Contract`
- **Batch 3** (Tier 1, done) · Long-term insurance (life, annuities) (ILA-201U (SOA) › U.S. Financial Reporting Requirements; FAM (SOA) › Premium and Policy Value Calculation for Long-Term Insurance Coverages) · 6 concepts: `Equivalence Principle`, `Fractional Age`, `Reserve`, `Valuation`, `Life Insurance Company`, `Valuation Principle`
- **Batch 4** (Tier 1, done) · Financial economics and investments (INV-201 (SOA) › Applications and Risks of Derivatives; INV-201 (SOA) › Valuation of Derivatives) · 7 concepts: `Pension Plan`, `Mortality`, `Volatility`, `Hedging`, `Delta Hedging`, `Risk Neutral`, `Put-Call Parity`
- **Batch 5** (Tier 1, done) · Health (GH-101 (SOA) › Underwriting and Funding; GH-201U (SOA) › Reserving) · 5 concepts: `Retiree`, `Underwriting`, `Funding`, `Best Practice`, `Claim Reserve`
- **Batch 6** (Tier 1, done) · Retirement (RET-101 (SOA) › Benefit Plan Structure, Features and Investments; RET-201 (SOA) › Accounting Standards) · 4 concepts: `Retirement Plan`, `Benefit Plan`, `Plan Sponsor`, `Plan Design`
- **Batch 7** (Tier 1, done) · Statistics and predictive analytics (ATPA (SOA) › Model Explainability and Communication; ATPA (SOA) › Working with Data) · 6 concepts: `Governance`, `Predictive Modeling`, `Unstructured Data`, `Hyperparameter`, `Classification Tree`, `Regularized Regression`
- **Batch 8** (Tier 2, done) · Short-term insurance (P&C, general) (ASTAM (SOA) › Aggregate Models; ASTAM (SOA) › Construction and Selection of Parametric Models) · 10 concepts: `Continuous Distribution`, `Claims Distribution`, `Discrete Severity Distribution`, `Discretized Version`, `Local Moment Matching`, `Recursive Formulas`, `Bayesian Estimation`, `Bayesian Information Criterion`, `Non-Normal Confidence Interval`, `Schwarz Bayesian Criterion`
- **Batch 9** (Tier 2, done) · Short-term insurance (P&C, general) (ASTAM (SOA) › Reserving and Pricing for Short-Term Insurance Coverages; ASTAM (SOA) › Credibility) · 10 concepts: `Policy Limit`, `Loss Reinsurance`, `Stop Loss Reinsurance`, `Bühlmann`, `Empirical Bayesian Estimation`, `Greatest Accuracy`, `Projected Loss`, `Balancing Back`, `Outstanding Claims Reserve`, `Overdispersed Poisson`
- **Batch 10** (Tier 2, done) · Short-term insurance (P&C, general) (ASTAM (SOA) › Severity Models; DISC-IA (CAS) › 3. Common Policy Concepts) · 10 concepts: `Risk Classification Differential`, `Tail Risk`, `Mean Excess`, `New Distribution`, `Generalized Extreme`, `Generalized Pareto Distribution`, `Extreme Value Distribution`, `Splicing`, `Insurance to Value`, `Replacement Cost`
- **Batch 11** (Tier 2, done) · Short-term insurance (P&C, general) (DISC-IA (CAS) › 4. Personal Auto Policy; DISC-IA (CAS) › 5. Homeowners Property Coverage) · 10 concepts: `Personal Auto Policy`, `Auto Physical Damage Coverage`, `Endorsement`, `Homeowners Policy`, `Causes of Loss`, `Building and Personal Property Coverage Form`, `Coverage Analysis`, `Commercial General Liability`, `Business Income Coverage`, `Umbrella Liability`
- **Batch 12** (Tier 2, done) · Short-term insurance (P&C, general) (DISC-RM (CAS) › 5. Insurance as a Risk Management Technique; DISC-RM (CAS) › 11. Underwriting Other Types of Coverage) · 10 concepts: `Umbrella Liability Insurance`, `Risk Control`, `Claims Handling`, `Underwriting Cycle`, `Risk Identification`, `Loss Exposure`, `Liability Loss Exposure`, `Property Loss Exposure`, `Insurance Operations`, `Insurance Producer`
- **Batch 13** (Tier 2, done) · Short-term insurance (P&C, general) (FAM (SOA) › Parametric Estimation; FAM (SOA) › Pricing and Reserving for Short-Term Insurance Coverages) · 10 concepts: `Censored Data`, `Frequency Distribution`, `Individual Data`, `Grouped Data`, `Adjusting Premium`, `Contingencies Loading`, `Ratemaking Data`, `Individual Risk`, `Shape Parameter`, `Desirable Property`
- **Batch 14** (Tier 2, done) · Short-term insurance (P&C, general) (FAM (SOA) › Short-Term Insurance and Reinsurance Coverages; FAM (SOA) › Severity, Frequency, and Aggregate Models) · 10 concepts: `Log-Normal`, `Stop-Loss Insurance`, `Reinsurance Coverage`, `Reinsurer`, `Claim Amounts Paid`, `Unpaid Unallocated Loss Adjustment Expense`, `Future Cost`, `Exposure Data`, `Ultimate Claim`, `Ultimate Value`
- **Batch 15** (Tier 2, done) · Short-term insurance (P&C, general) (GI-101 (SOA) › Projecting Ultimate Claims; GI-101 (SOA) › Trending) · 10 concepts: `Large Claim`, `Claim Settlement`, `Investigative Testing`, `Berquist-Sherman Data`, `Claim Frequency`, `Trend Rate`, `Trending`, `Credit Rating Agency`, `Claim Liability`, `Insurance Liability`
- **Batch 16** (Tier 2, done) · Short-term insurance (P&C, general) (GI-201 (SOA) › Financial Reporting; GI-201 (SOA) › Regulatory Environment) · 10 concepts: `Financial Instrument`, `Reporting Standard`, `Financial Reporting Standard`, `Insurance-reinsurance`, `Automobile Insurance`, `Credit Score`, `Regulatory Environment`, `Catastrophe Risk Load`, `Development Pattern`, `Excess Limit`
- **Batch 17** (Tier 2, done) · Short-term insurance (P&C, general) (GI-301 (SOA) › Specialized Ratemaking Topics; GI-301 (SOA) › Reinsurance) · 10 concepts: `Layer`, `Premium Liability`, `Reinsurance Contract`, `Reinstatement Premium`, `Retrospectively Rated Policy`, `Claims-Made Policy`, `Deductible Option`, `Premium Asset`, `Insurer Financial Health`, `Annual Statement`
- **Batch 18** (Tier 2, done) · Short-term insurance (P&C, general) (GI-302 (SOA) › U.S. General Insurance Products and Coverages) · 6 concepts: `Property Insurance`, `Loss Payment`, `Professional Liability`, `Commercial Property Insurance`, `Policy Provisions`, `Terrorism`
- **Batch 19** (Tier 2, done) · Long-term insurance (life, annuities) (ALTAM (SOA) › Embedded Options in Life Insurance and Annuity Products; INV-101 (SOA) › Portfolio Construction, Management, and Assessment) · 10 concepts: `Guaranteed Minimum Death Benefit`, `Options Embedded`, `Rebalancing`, `Discrete-Time Rebalancing`, `Equity-Linked Life Insurance Cash Flow`, `Equity-Linked Life Insurance Guarantee`, `Guaranteed Minimum Accumulation-maturity Benefit`, `Guaranteed Minimum Income Benefit`, `Guaranteed Minimum Maturity Benefit`, `Guaranteed Minimum Withdrawal Benefit`
- **Batch 20** (Tier 2, done) · Long-term insurance (life, annuities) (ALTAM (SOA) › Pension Plans and Retirement Benefits; ALTAM (SOA) › Joint Life Insurance and Annuities) · 10 concepts: `Replicating Portfolio`, `Future Lifetime`, `Joint-Life Mortality`, `Joint Live`, `Time-To-Status-Failure Random Variable`, `Retirement Benefit`, `Benefits Payable`, `DB Plan`, `Early Exit`, `Accrued Benefit`
- **Batch 21** (Tier 2, done) · Long-term insurance (life, annuities) (ALTAM (SOA) › Pension Plans and Retirement Benefits; CP-321 (SOA) › Retiree Group Benefits) · 10 concepts: `Age Retirement`, `Career Average Earning`, `Career Average Revalued Earning`, `Plan Participant`, `DC Plan Participant`, `Final Average Salary`, `Pension Plan Valuation`, `Projected Unit Credit`, `Required Contribution`, `Required Contribution Rate`
- **Batch 22** (Tier 2, done) · Long-term insurance (life, annuities) (ALTAM (SOA) › Premium and Policy Valuation for Long-Term State-Dependent Coverages; ALTAM (SOA) › Pension Plans and Retirement Benefits) · 10 concepts: `Salary Scale`, `Service Table`, `Target Replacement`, `Traditional Unit Credit`, `Policy Value`, `Long-Term Health Insurance`, `Single Life`, `State-Dependent Insurance`, `State-Dependent Life Insurance`, `State-Dependent Cash Flow`
- **Batch 23** (Tier 2, done) · Long-term insurance (life, annuities) (ALTAM (SOA) › Profit Analysis; ALTAM (SOA) › Premium and Policy Valuation for Long-Term State-Dependent Coverages) · 10 concepts: `Thiele's Differential Equation`, `Three-Term Woolhouse Approximation`, `Profit Margin`, `Internal Rate`, `Profit Testing`, `Discounted Payback Period`, `Emerging Surplus`, `Term Life`, `Long-Term Life`, `Profit Signature`
- **Batch 24** (Tier 2, done) · Long-term insurance (life, annuities) (ALTAM (SOA) › Survival Models for Contingent Cash Flows; ALTAM (SOA) › Profit Analysis) · 10 concepts: `Profit Vector`, `Markov Multiple`, `Continuous Time Markov`, `Multiple Decrement`, `Transition Intensity`, `Approximate Confidence Interval`, `Asymptotic Property`, `Continuing Care Retirement Community`, `Continuous Time Markov Multiple`, `Deconstruct Multiple Decrement Table`
- **Batch 25** (Tier 2, done) · Long-term insurance (life, annuities) (ALTAM (SOA) › Survival Models for Contingent Cash Flows) · 10 concepts: `Discrete Time Transition Probability`, `Heterogeneity`, `Individual-joint Life Mortality`, `Kolmogorov's Forward Equation`, `Long-Term Health Insurance Benefit`, `Long-Term Insurance Benefit`, `Mortality Curve`, `Mortality-morbidity`, `Piecewise Constant Transition Intensity`, `Single Decrement`
- **Batch 26** (Tier 2, done) · Long-term insurance (life, annuities) (ALTAM (SOA) › Universal Life Insurance; ALTAM (SOA) › Survival Models for Contingent Cash Flows) · 10 concepts: `State-Contingent Life`, `State-Dependent Probability`, `Account Value`, `Deterministic Profit Testing`, `Cashflow`, `Lapse`, `No-Lapse Guarantee`, `Universal Life Contract`, `Universal Life Policy`, `Insurance Product`
- **Batch 27** (Tier 2, done) · Long-term insurance (life, annuities) (CP-341 (SOA) › Types of Reinsurance Arrangements and Methods; CP-341 (SOA) › Key Accounting and Regulatory Considerations) · 10 concepts: `Regulatory Framework`, `US Regulatory`, `Reinsurance Arrangement`, `Reinsurance Treaty`, `Insolvency`, `Yearly Renewable Term`, `Funds Withheld Arrangement`, `Modified Coinsurance`, `Contribution Pension Plan`, `Retirement Financial Security`
- **Batch 28** (Tier 2, done) · Long-term insurance (life, annuities) (FAM (SOA) › Mortality Models; FAM (SOA) › Premium and Policy Value Calculation for Long-Term Insurance Coverages) · 10 concepts: `Individual Live`, `Complete Future Lifetime Random Variable`, `Mortality Probability`, `Parametric Survival`, `Future Lifetime Distribution`, `Non-Parametric Mortality`, `Net Premium`, `Gross Premium`, `Age Rating`, `Constant Multiple`
- **Batch 29** (Tier 2, done) · Long-term insurance (life, annuities) (FAM (SOA) › Premium and Policy Value Calculation for Long-Term Insurance Coverages; FAM (SOA) › Present Value Random Variables for Long-Term Insurance Coverages) · 10 concepts: `Long-Term Insurance Coverage`, `Single Live`, `Constant Addition`, `Endowment`, `Endowment Insurance`, `Future Loss Random Variable`, `Modelling Extra Risk`, `Modified Net Premium Policy Value`, `Policy Value Calculation Process`, `Portfolio Percentile Principle`
- **Batch 30** (Tier 2, done) · Long-term insurance (life, annuities) (FAM (SOA) › Present Value Random Variables for Long-Term Insurance Coverages; ILA-201I (SOA) › Advanced Product Management) · 10 concepts: `Whole Life Annuity`, `Annuity Payment`, `Standard Actuarial Notation`, `Claims Acceleration Approximation`, `Continuous Payment Frequency`, `Past Experience`, `New Business`, `Individual Life`, `Inforce`, `Active In-Force`
- **Batch 31** (Tier 2, done) · Long-term insurance (life, annuities) (ILA-201I (SOA) › Advanced Product Management; ILA-201I (SOA) › Capital Management) · 10 concepts: `Economic Value Creation`, `Fundamental Strategy`, `Insurance Enterprise`, `Policyholder Dividend`, `Regulatory Capital`, `Financial Capital`, `Valuation Standard`, `Life Insurance Risk`, `Longevity`, `Longevity Risk`
- **Batch 32** (Tier 2, done) · Long-term insurance (life, annuities) (ILA-201U (SOA) › U.S. Financial Reporting Requirements; ILA-201I (SOA) › Management and Evaluation of Life Insurance Risks) · 6 concepts: `Own Risk Solvency Assessment`, `US GAAP`, `Annuity Product`, `Individual Life Insurance`, `Principles-Based Reserve`, `US Statutory`
- **Batch 33** (Tier 2, done) · Financial economics and investments (FAM (SOA) › Option Pricing Fundamentals; CP-351 (SOA) › Measuring Risks from Assets and Liabilities) · 10 concepts: `Jurisdiction`, `Market Risk`, `Simple European-style Derivative`, `Single Non-Dividend Paying Asset`, `Option Pricing`, `Binomial Option Pricing`, `Black-Scholes Formula`, `Delta Hedge`, `Simple Option`, `Investment Portfolio`
- **Batch 34** (Tier 2, done) · Financial economics and investments (INV-101 (SOA) › Portfolio Construction, Management, and Assessment; INV-201 (SOA) › Applications and Risks of Derivatives) · 13 concepts: `Real Estate`, `Private Equity`, `Default Risk`, `Target Return`, `Asset Portfolio`, `Performance Measurement`, `Active Strategy`, `Indexing`, `Asset Allocation`, `Embedded Option`, `Counterparty`, `Variable Annuity`, `Asset Pricing`
- **Batch 35** (Tier 2, done) · Health (CP-321 (SOA) › Reserving; CP-321 (SOA) › Asset Adequacy) · 10 concepts: `Liability Cash Flow`, `Asset Adequacy`, `Investment Income`, `Required Capital`, `Disability Income`, `Long Term Care`, `Unearned Premium Reserve`, `Claim Reserves Held`, `Long Duration Health Contract`, `Post-Employment Benefit`
- **Batch 36** (Tier 2, done) · Health (GH-101 (SOA) › Manual Rates; CP-321 (SOA) › Retiree Group Benefits) · 10 concepts: `Retiree Health`, `Employer Liability`, `Retiree Group Benefit`, `Post-Retirement`, `Base Rate`, `Manual Rate`, `Data Source`, `Rating Manual`, `Claim Data`, `Contracts Described`
- **Batch 37** (Tier 2, to do) · Health (GH-101 (SOA) › Underwriting and Funding; GH-201C (SOA) › Financial Statements) · 10 concepts: `Critical Metrics` ✓, `Group Life` ✓, `Risk Assessment` ✓, `Eligibility Requirement` ✓, `Total Risk`, `Funding Mechanism` ✓, `Funding Case-Specific Risk` ✓, `Long Duration Contract` ✓, `Health Insurer` ✓, `Disability Benefit` ✓
- **Batch 38** (Tier 2, done) · Health (GH-201U (SOA) › Flow of Funds; GH-201U (SOA) › Financial Statements) · 10 concepts: `Government Programs Providing Health`, `Project Financial`, `Capital Need`, `Insurance Company Financial Statement`, `GAAP Statement`, `Health Care System`, `Funds Flow`, `Market Power`, `Physicians Play`, `Provider Systems Compete`
- **Batch 39** (Tier 2, done) · Health (GH-201U (SOA) › Regulation; GH-201U (SOA) › Reserving) · 11 concepts: `Filing`, `United State`, `Applicable Law`, `Policy Making Process`, `Data Resource`, `Traditional Valuation`, `Health Insurance Contract`, `Medicare`, `Medicaid`, `Utilization`, `Reimbursement`
- **Batch 40** (Tier 2, done) · ERM and corporate finance (CFE-101 (SOA) › Embedding ERM into Decision-Making; CP-311 (SOA) › Strategic Budgeting, Forecasting, and Value Measures) · 12 concepts: `Capital Requirement`, `Economic Capital`, `Third Party`, `Decision-Making Process`, `Risk Limit`, `Legal Risk`, `Risk Diversification`, `Financial Performance`, `Porter's Five Force`, `Forecasting`, `Strategic Budgeting`, `Organization's Ability`
- **Batch 41** (Tier 2, done) · Retirement (RET-101 (SOA) › Benefit Plan Structure, Features and Investments; RET-101 (SOA) › Participant Risks) · 10 concepts: `Investment Policy`, `Savings Plan`, `Plan Investment`, `Retirement Plan Investment`, `Plan Feature`, `Retirement Income`, `Sponsored Plan`, `Investment Option`, `Sponsor Risk`, `Plan Merger`
- **Batch 42** (Tier 2, done) · Retirement (RET-201 (SOA) › Actuarial Assumptions; RET-301 (SOA) › Assumptions) · 10 concepts: `Spin-Off`, `Retirement Income Plan`, `Single Employer`, `Financial Economics`, `Multi-Employer`, `Asset Liability`, `Investment Risk`, `Canadian Pension Legislation`, `Regulatory Policy`, `Tax Legislation`
- **Batch 43** (Tier 2, done) · Retirement (RET-301 (SOA) › Methods) · 5 concepts: `Wind-Up`, `Asset Valuation`, `Ongoing Plan`, `Plan Termination`, `Termination-wind-up`
- **Batch 44** (Tier 2, done) · Statistics and predictive analytics (ATPA (SOA) › Advanced Predictive Analytics Models; ATPA (SOA) › Model Explainability and Communication) · 10 concepts: `Explainability`, `Analytical Effort`, `Computational Efficiency`, `Proxy Discrimination`, `Stacking`, `Table Importability`, `Too Many Variable`, `Train-test-validate Set`, `Interpretability`, `Shapley Value`
- **Batch 45** (Tier 2, done) · Statistics and predictive analytics (ATPA (SOA) › Model Explainability and Communication) · 10 concepts: `Algorithmic Transparency`, `Common Language`, `Decomposability`, `Dependence Plot`, `Effective Manner While`, `Gain Chart`, `Individual Conditional Expectation Plot`, `Post-Hoc Interpretability`, `Recommended Analytics`, `Straightforward Manner`
- **Batch 46** (Tier 2, done) · Statistics and predictive analytics (ATPA (SOA) › Working with Data; ATPA (SOA) › Model Explainability and Communication) · 10 concepts: `Variable Importance Plot`, `Data Set`, `Final Product`, `Biases Introduced`, `Data Collection Practice`, `Data Lake`, `Data Pipeline`, `Data Structure`, `Data Warehouse`, `File Structure`
- **Batch 47** (Tier 2, done) · Statistics and predictive analytics (ATPA (SOA) › Working with Data; PA (SOA) › Data Exploration and Visualization) · 10 concepts: `Handle Missing Data`, `Imputation`, `Internal Consistency`, `Otherwise Modify Data`, `Preparing Data`, `Relational Database`, `Data Analytics`, `External Data`, `Bivariate Data Exploration`, `Common Visualization`
- **Batch 48** (Tier 2, done) · Statistics and predictive analytics (PA (SOA) › Data Exploration and Visualization; SRM (SOA) › Basics of Statistical Learning) · 10 concepts: `Effective Data`, `Exploring Data`, `Granularity`, `Univariate Data Exploration`, `Existing Data`, `Bias-Variance Trade-Off`, `Vague Question`, `K-Fold Cross-Validation`, `Leave-one-out Cross-Validation`, `Resampling`
- **Batch 49** (Tier 2, done) · Statistics and predictive analytics (SRM (SOA) › Linear Models; SRM (SOA) › Decision Trees) · 11 concepts: `Training Data`, `Overfitting`, `Regression Tree`, `Predicted Value`, `Diagnostic Test`, `Ridge Regression`, `Corresponding Link`, `Lasso`, `Autoregressive Conditionally Heteroskedastic`, `Regression-Based Time Series`, `Stochastic Time Series Process`
- **Batch 50** (Tier 3, done) · Short-term insurance (P&C, general) (DISC-IA (CAS) › 12. Specialty Coverages Part 1; DISC-IA (CAS) › 13. Specialty Coverages Part 2) · 10 concepts: `Professional Liability Insurance`, `Directors and Officers Liability Insurance`, `Employment Practices Liability Insurance`, `Environmental Insurance`, `Fiduciary Liability Insurance`, `International Insurance`, `Aircraft Insurance`, `Cyber Insurance`, `Terrorism Risk Insurance Program`, `Intentional Tort`
- **Batch 51** (Tier 3, done) · Short-term insurance (P&C, general) (DISC-IA (CAS) › 3. Common Policy Concepts; DISC-IA (CAS) › 14. Insurance Law Part 1) · 10 concepts: `Negligence`, `Premises Liability`, `Products Liability`, `Strict Liability`, `Insurable Risk`, `Compensatory Damages`, `Loss Settlement Provisions`, `Actual Cash Value`, `Medical Payments Coverage`, `Health Insurance Plans`
- **Batch 52** (Tier 3, done) · Short-term insurance (P&C, general) (DISC-RM (CAS) › 10. Underwriting Business Income and Commercial Liability Coverage; DISC-IA (CAS) › 9. Commercial Property Insurance Part 2) · 10 concepts: `Term Life Insurance`, `Blanket Insurance`, `Common Policy Conditions`, `Period of Restoration`, `Commercial Crime Insurance`, `Premises and Operations Liability`, `Products and Completed Operations Liability`, `Business Auto Coverage`, `SWOT Analysis`, `Business Continuity Management`
- **Batch 53** (Tier 3, done) · Short-term insurance (P&C, general) (DISC-RM (CAS) › 6. Overview of Insurance Operations; DISC-RM (CAS) › 7. Insurance Marketing and Distribution) · 10 concepts: `Organizational Resilience`, `Insurer Goals and Constraints`, `Insurtech`, `Types of Insurers`, `Insurance Distribution Systems`, `Insurance Marketing`, `Underwriting Policy`, `Underwriting Authority`, `Conduct Investigative Testing`, `Funding Requirement`
- **Batch 54** (Tier 3, done) · Short-term insurance (P&C, general) (GI-101 (SOA) › Introduction and Key Considerations; GI-101 (SOA) › Preparing Claims and Exposure Data for Actuarial Work) · 10 concepts: `Real-Life Scenario`, `Self-Insurer`, `Professional Judgment`, `Actuary's Responsibility`, `Professionalism Requirement`, `Qualitative Information Required`, `Earnings Pattern`, `Ultimate Premium`, `Claim Transaction Data`, `Influencing Average Premium Level`
- **Batch 55** (Tier 3, done) · Short-term insurance (P&C, general) (GI-101 (SOA) › Projecting Ultimate Claims; GI-101 (SOA) › Ratemaking) · 10 concepts: `Data Triangle`, `Required Data`, `Case Estimate`, `Development-Based Frequency-Severity`, `Generalized Cape Cod`, `Projected Ultimate Value`, `Varying Circumstance`, `Contingency Margin`, `Expenses Required`, `Expense Trending`
- **Batch 56** (Tier 3, done) · Short-term insurance (P&C, general) (GI-201 (SOA) › General Insurance Company Operations; GI-201 (SOA) › Financial Economics) · 10 concepts: `Fundamental Ratemaking`, `Inflation-Sensitive Exposure`, `Behavioral Finance`, `Asset Liability Management Strategy`, `Underwriting Profit Margin`, `EU Solvency II Capital Requirement`, `Claim Handling Process`, `Insurer Risk`, `International Business`, `Peril`
- **Batch 57** (Tier 3, done) · Short-term insurance (P&C, general) (GI-201 (SOA) › Legal Environment; GI-201 (SOA) › General Insurance Company Operations) · 10 concepts: `Pricing General Insurance Policy`, `Risk Mitigation Instrument`, `Insurance Law`, `Social Inflation`, `International Legal Environment`, `Legal Cases-issues Included`, `Mass Torts-class Action Suit`, `Syllabus Resource`, `Tort Law Environment`, `Tort Trend`
- **Batch 58** (Tier 3, done) · Short-term insurance (P&C, general) (GI-201 (SOA) › Regulatory Environment; GI-201 (SOA) › Responsibilities of the Actuary) · 10 concepts: `Transnational Tort Litigation`, `Collective Insurance Industry Organization`, `Insolvency Regulation`, `Insurance Programs Controlled`, `Telematics`, `Insurance Actuarial Opinion`, `International Actuarial Association`, `Professionalism Principle`, `Professionalism Required`, `Catastrophe Modeling Output`
- **Batch 59** (Tier 3, done) · Short-term insurance (P&C, general) (GI-301 (SOA) › Stochastic Reserving; GI-301 (SOA) › Reinsurance) · 10 concepts: `Property Catastrophe Risk Load`, `Insurance Premium Liability`, `Pricing Property Catastrophe Cover`, `Risk Transfer Testing`, `Claims-Made Contract`, `Increased Limit Option`, `Chain Ladder Estimator`, `Parametric Estimator`, `Reserve Variability`, `Stochastic Loss Development`
- **Batch 60** (Tier 3, done) · Short-term insurance (P&C, general) (GI-302 (SOA) › U.S. General Insurance Products and Coverages; GI-302 (SOA) › Responsibilities of a U.S. Signing General Insurance Actuary) · 10 concepts: `Applicable Standard`, `Signing Actuary`, `Signing General Insurance Actuary`, `NAIC Annual Statement Pages-schedule`, `NAIC RBC`, `Statutory Financial Statement`, `Cyber Risk`, `Premium Basis`, `Commercial Auto Insurance`, `Employers Liability Insurance`
- **Batch 61** (Tier 3, done) · Short-term insurance (P&C, general) (GI-302 (SOA) › U.S. General Insurance Products and Coverages; GI-302 (SOA) › U.S. General Insurance Regulation) · 13 concepts: `Excess Liability`, `ISO Commercial Automobile Policy`, `ISO Commercial Property`, `ISO Homeowner`, `ISO Personal Auto Policy`, `ISO WC`, `Specialty Insurance Coverage`, `Surety`, `Insurance Department`, `Insurance Commissioners' Duty`, `Insurance Personnel`, `Licensing Requirement`, `Regulatory Body`
- **Batch 62** (Tier 3, done) · Financial economics and investments (CP-351 (SOA) › Measuring Risks from Assets and Liabilities; CP-351 (SOA) › Objectives of Asset Liability Management) · 10 concepts: `Long-Tail Liability`, `Portfolio's Exposure`, `Regulatory Capital Adequacy`, `Risk Identification Tool`, `ALM Failure`, `Insurance Contracts Generate Embedded Option`, `Lessons Learned`, `ALM Risk`, `ALM Context`, `Asset Allocation Strategy`
- **Batch 63** (Tier 3, done) · Financial economics and investments (CP-351 (SOA) › Tools and Strategies to Manage ALM Risks; INV-101 (SOA) › Asset Classes) · 10 concepts: `Extreme ALM Event`, `Interest Rate Derivative`, `Liability Profile`, `Long-Tail Insurance Liability`, `Transferring Risk`, `Asset Class`, `Corporate Bond`, `Hedge Fund`, `Mortgage-backed Security`, `Distinguishing Investment`
- **Batch 64** (Tier 3, done) · Financial economics and investments (INV-101 (SOA) › Asset Classes; INV-101 (SOA) › Credit Risk Management) · 10 concepts: `Leveraged Loan`, `Private Debt`, `Public Equity`, `Residential Mortgage`, `Structured Credit Product`, `Individual Security`, `Credit Risk Modeling`, `Portfolio Level`, `Passive Strategy`, `Institutional Investor`
- **Batch 65** (Tier 3, done) · Financial economics and investments (INV-101 (SOA) › Portfolio Construction, Management, and Assessment) · 10 concepts: `Fixed Income Investment`, `Asset Benchmark`, `Enhance Yield`, `Fixed Income Portfolio`, `Investment Governance Structure`, `Investment Policy Statement`, `Liquidity`, `Optimal Portfolio Allocation`, `Performance Attribution Metrics`, `Portfolio Management Process`
- **Batch 66** (Tier 3, done) · Financial economics and investments (INV-201 (SOA) › Applications and Risks of Derivatives) · 10 concepts: `Operational Failure`, `Cross Greek`, `Dynamic Hedging`, `Fund Performance`, `Guarantee Cost`, `Hedge Strategy`, `Implied Volatility`, `Indexed Annuity`, `Partially Hedged`, `Structured Product`
- **Batch 67** (Tier 3, done) · Financial economics and investments (INV-201 (SOA) › Key Types of Derivatives; INV-201 (SOA) › Applications and Risks of Derivatives) · 10 concepts: `Target Volatility Fund`, `Variable Annuity Guarantee Rider`, `Asian Option`, `Butterfly Spread`, `Call Spread`, `Central Clearing`, `Collar`, `Daily Margin Variation`, `Daily Settle`, `Derivative Instrument`
- **Batch 68** (Tier 3, done) · Financial economics and investments (INV-201 (SOA) › Key Types of Derivatives; INV-201 (SOA) › Valuation of Derivatives) · 10 concepts: `Derivatives Strategy`, `Derivatives Trading`, `Exchange Traded`, `Exotic Option`, `Floor`, `Put Spread`, `Straddle`, `Strangle`, `Swaption`, `Arrow-Debreau Security`
- **Batch 69** (Tier 3, done) · Financial economics and investments (INV-201 (SOA) › Valuation of Derivatives) · 10 concepts: `Black-Scholes-Merton`, `Euler-Maruyama Discretization`, `Girsanov's Theorem`, `Incomplete Market`, `Isometry`, `Jump-Diffusion`, `Local- Volatility`, `Martingale`, `Modeling Smile`, `No-Arbitrage`
- **Batch 70** (Tier 3, done) · Financial economics and investments (INV-201 (SOA) › Valuation of Derivatives) · 10 concepts: `Numeraire`, `Numerical Discretization`, `Observed Price`, `Pricing Derivative`, `Stochastic Calculus Theory`, `Stochastic Differential Equation`, `Stochastic Volatility`, `Traded Security`, `Transition Density`, `Volatility Smile`
- **Batch 71** (Tier 3, done) · ERM and corporate finance (CFE-101 (SOA) › Embedding ERM into Decision-Making) · 10 concepts: `Capital Assessment`, `Marginal Capital`, `Non-Financial Risk`, `Return Trade-Off`, `Gauge Performance`, `Organization's Risk Profile`, `Organizational Process`, `Risk Capital Once Aggregated`, `Risk Once Aggregated`, `Risk Strategy`
- **Batch 72** (Tier 3, done) · ERM and corporate finance (CFE-101 (SOA) › Risk Analysis and Evaluation; CFE-101 (SOA) › Enterprise Risk Management Foundations) · 10 concepts: `Risk-capital Strategy`, `External Environment`, `Market Conduct Compliance Activity`, `Emerging Risk`, `Risk Accumulation`, `Compounding Risk`, `Contagion-Related Risk`, `Easily Quantifiable`, `Monitoring Mechanism`, `Risk Aggregation`
- **Batch 73** (Tier 3, done) · ERM and corporate finance (CFE-201 (SOA) › Corporate Finance; CFE-201 (SOA) › Financial Statement Analysis) · 10 concepts: `Optimal Capital Structure`, `Capital Budgeting`, `Competitive Environment`, `Corporate Finance`, `Divestiture`, `Organization Optimiz`, `Evolving Quantitative`, `Foreign Exchange Rate`, `Financial Metrics`, `Organization's Performance`
- **Batch 74** (Tier 3, done) · ERM and corporate finance (CFE-201 (SOA) › Managerial Accounting and Operational Excellence; CP-311 (SOA) › Introduction to Strategic Management) · 10 concepts: `Reported Financial Statement`, `Business Process`, `Distort Perceived Performance`, `Drive Decision Making`, `Operational Excellence`, `Operational Process`, `Uncertain Condition`, `Business Environment`, `Business-Level Strategy`, `Competitive Dynamics`
- **Batch 75** (Tier 3, done) · ERM and corporate finance (CP-311 (SOA) › Introduction to Strategic Management; CP-311 (SOA) › Organizational Behavior) · 10 concepts: `Corporate-Level Strategy`, `External-inorganic Growth Strategy`, `Market Opportunity`, `Organization's Business Strategy`, `Cognitive Biase`, `Making Suboptimal Individual`, `Organizational Behavior Plays`, `Organizational Decision-Making`, `Sustainable Growth`, `Effective Strategic Budgeting`
- **Batch 76** (Tier 3, done) · ERM and corporate finance (CP-311 (SOA) › Strategic Budgeting, Forecasting, and Value Measures) · 5 concepts: `Financial Budgeting`, `Forecasting Decision Making Process`, `Organization's Initiative`, `Organization's Strategic`, `Tracking Progress`
- **Batch 77** (Tier 3, done) · Health (CP-321 (SOA) › Manual Rates; CP-321 (SOA) › Asset Adequacy) · 10 concepts: `Asset Adequacy Standard`, `Asset Matching`, `Cash Flow Projection`, `Mismatched Asset`, `IFRS 17, US GAAP`, `Data Credibility`, `Base Rate Development`, `Commission`, `Guaranty Association`, `Long Term Care Rate Increase`
- **Batch 78** (Tier 3, done) · Health (CP-321 (SOA) › Reserving; CP-321 (SOA) › Plan and Product Provisions) · 10 concepts: `Properly Modelling`, `Critical Illness`, `Medicare Supplement`, `Social Security Disability Income Benefit`, `Policy Reserve`, `Appliable Best Practice`, `Non-Claim Reserves Held`, `Premium Deficiency Reserve`, `Employers Offer Retiree Group Benefit`, `Life Plan Design`
- **Batch 79** (Tier 3, done) · Health (GH-101 (SOA) › Plan and Product Provisions; CP-321 (SOA) › Retiree Group Benefits) · 10 concepts: `Post-Employment Benefit Plan`, `Retiree Health Valuation`, `Service Cost`, `Employee Benefit Plan`, `Employee Benefit Strategy`, `Medical Cost Trend Experience`, `Plan Provision`, `Prescription Drug`, `Product Development Process`, `Short Duration Contract`
- **Batch 80** (Tier 3, done) · Health (GH-101 (SOA) › Underwriting and Funding; GH-201C (SOA) › Financial Statements) · 10 concepts: `Case-Specific Pricing`, `Claim Credibility`, `Pooling`, `Risk Assessment Mechanism`, `Underwriting Situation`, `Health Insurance Company`, `Taxable Income`, `Insurer Financial Statement`, `International Financial Reporting Standard`, `Canadian Health Care System`
- **Batch 81** (Tier 3, done) · Health (GH-201U (SOA) › Government Programs; GH-201C (SOA) › Government Programs) · 10 concepts: `Private Group Insurance Plan`, `Capital Strain`, `Canadian Healthcare System`, `Affordable Care Act`, `Filing Requirement`, `Government Programs Providing Health Benefit`, `Medicaid Program Structure`, `Medicare Benefit`, `Short Duration Group`, `Actuarially Adjusted`
- **Batch 82** (Tier 3, done) · Health (GH-301 (SOA) › Disease Management; GH-301 (SOA) › Healthcare Risk Adjustment1) · 10 concepts: `Healthcare Intervention`, `Non-Chronic Trend`, `Reflects Patient Risk`, `Utilization Rate`, `ACA Product`, `Care Management Situation`, `Normalize Population Claims Experience`, `Multiple Data`, `Coding Set`, `Clinical Policy Bulletin`
- **Batch 83** (Tier 3, done) · Health (GH-301 (SOA) › Medical Data; GH-301 (SOA) › Predictive Analytics) · 10 concepts: `Coding Structure`, `Medical Coding`, `Private Data`, `Revenue Code`, `Healthcare Data`, `Healthcare Claim`, `Risk Score`, `Provider Reimbursement`, `Accountable Care Organization`, `Provider Payment`
- **Batch 84** (Tier 3, done) · Health (GH-301 (SOA) › Social Determinants of Health; GH-301 (SOA) › Provider Contracting and Reimbursement) · 7 concepts: `Quality Perspective`, `Quality Viewpoint`, `Standard Contracting`, `Health Care Cost`, `Social Determinant`, `SDOH Derived Statistics`, `Traditional Actuarial Practice`
- **Batch 85** (Tier 3, done) · Retirement (RET-101 (SOA) › Benefit Plan Design Recommendation) · 10 concepts: `Plan Design Feature`, `Retirement Risk`, `Sponsor's Plan`, `Employee Perspective`, `Introducing Option`, `Investment Risk Applicable`, `Labor Force Demographics`, `Plan Sponsor's Particular`, `Promote Employee Behavior Consistent`, `Retirement Plan Design`
- **Batch 86** (Tier 3, done) · Retirement (RET-101 (SOA) › Benefit Plan Structure, Features and Investments; RET-101 (SOA) › Benefit Plan Design Recommendation) · 10 concepts: `Tax Incentive`, `Taxpayers' Perspective`, `Investment Vehicle`, `Payment Option`, `Providing Retirement Benefit`, `Retirement Fund Asset`, `Ancillary Benefit`, `Benefit Eligibility Requirement`, `Benefit Subsidy`, `Contribution Formula`
- **Batch 87** (Tier 3, done) · Retirement (RET-101 (SOA) › Benefit Plan Structure, Features and Investments) · 10 concepts: `Executive Retirement Plan`, `Hybrid Plan`, `Late Retirement Option`, `Optional Employee Contribution`, `Participant Investment Option`, `Plan Eligibility Requirement`, `Retirement Plan Asset`, `Shared Risk Plan`, `Target Benefit Plan`, `Vesting`
- **Batch 88** (Tier 3, done) · Retirement (RET-101 (SOA) › Participant Risks; RET-101 (SOA) › Sponsor Risks) · 10 concepts: `Benefit Adequacy`, `Public Sector Employer`, `Replacement Income`, `Retirement Plans Sponsored`, `Single Employer Sponsored Retirement Plan`, `Social Insurance Plan`, `Early Retirement`, `Decumulation Feature`, `Optional Form`, `Portability Option`
- **Batch 89** (Tier 3, done) · Retirement (RET-201 (SOA) › Methods; RET-201 (SOA) › Accounting Standards) · 10 concepts: `Postponed Retirement`, `Termination-windup`, `Plan Curtailment`, `Pension Valuation`, `Cost Recognition`, `Cost Stability`, `Pension Benefit`, `Periodic Valuation`, `Cash Flow Requirement`, `Plan Sponsor Risk`
- **Batch 90** (Tier 3, done) · Retirement (RET-201 (SOA) › Valuations for the Purpose of Funding; RET-301 (SOA) › Methods) · 10 concepts: `Funding Policy`, `Government-sponsored Plan`, `Multi-employer Plan`, `Plan Asset Composition`, `Principles Applicable`, `Single-employer Plan`, `Stakeholders' Interest`, `Asset Transfer`, `Going Concern Funding`, `Government Regulation`
- **Batch 91** (Tier 3, done) · Retirement (RET-301 (SOA) › Regulations: Evaluation and Application; RET-301 (SOA) › Regulations: Plan Funding) · 11 concepts: `Individual Savings Plan`, `Members' Right`, `Plan Amendment`, `Plan Establishment`, `Plan Termination-wind-Up`, `Registered Retirement Plan`, `Reporting Requirement`, `Tax Regulation Pertaining`, `Funding Restrictions Imposed`, `Pension Plan Funding`, `Retirement Funding Alternative`
- **Batch 92** (Tier 3, done) · Long-term insurance (life, annuities) (CP-312 (SOA) › Cash Flow Models for Long-Term Insurance Business; CP-312 (SOA) › Model Governance) · 10 concepts: `Complex Component`, `Dynamic Policyholder`, `Equity-Linked Guarantee`, `Index-Linked Credit`, `Long-Term Insurance Business`, `Governance Best Practice`, `Governance Documentation`, `Organizational Structure`, `Economic Scenario Generator`, `Financial Business`
- **Batch 93** (Tier 3, done) · Long-term insurance (life, annuities) (CP-341 (SOA) › Key Accounting and Regulatory Considerations; CP-341 (SOA) › Reinsurance Administration and Management) · 10 concepts: `OSFI Requirement`, `Reinsurance Requirement`, `Canadian Regulatory`, `Global Jurisdiction`, `International Reinsurance Regulatory Framework`, `Private Equity Backed Reinsurer`, `US Stat Requirement`, `Reinsurance Administration`, `Reinsurance Counterparty Credit Risk`, `Captive Reinsurance Transaction`
- **Batch 94** (Tier 3, done) · Long-term insurance (life, annuities) (CP-341 (SOA) › Types of Reinsurance Arrangements and Methods; CP-341 (SOA) › Transferring Risk) · 10 concepts: `Reinsurance Agreement Provision`, `Inforce Reinsurance`, `Offshore Reinsurance`, `Advanced Reinsurance Transaction`, `Annuity Coinsurance`, `Global Reinsurance Market`, `Life Insurance Yearly Renewable Term`, `Non-Proportional Reinsurance Transaction`, `PRTs-longevity Swap`, `Private Equity Involvement`
- **Batch 95** (Tier 3, done) · Long-term insurance (life, annuities) (ILA-101 (SOA) › Individual Life and Annuity Product Design and Pricing; ILA-101 (SOA) › Assumption Development and Experience Studies) · 10 concepts: `Experience Study`, `Modern Mortality Table`, `Premium Persistency`, `Term Conversion`, `Annuity Product Design`, `Common Profit Metrics`, `Nonforfeiture`, `Pricing Insurance Product`, `Pricing Practice`, `Annuity Context`
- **Batch 96** (Tier 3, done) · Long-term insurance (life, annuities) (ILA-101 (SOA) › Introduction to Assets and Risk Management; ILA-101 (SOA) › Introduction to Life and Annuity Valuation Concepts) · 10 concepts: `Annuity Liability`, `Common Insurance Guarantees Generate Embedded Option`, `Duration-convexity Matching`, `Integrating ALM`, `Life Insurance Reinsurance Arrangement`, `Segmentation`, `Deferred Acquisition Cost`, `International Regulatory Framework`, `Life Insurance Reserve`, `Term Insurance Reserve`
- **Batch 97** (Tier 3, done) · Long-term insurance (life, annuities) (ILA-101 (SOA) › Product Management; ILA-201I (SOA) › Advanced Product Management) · 10 concepts: `Rising Interest Rate Environment`, `Annuity Distribution`, `Annuity Insurance Product`, `Canadian Tax Regulation`, `Challenges Insurers Face`, `Corporate Taxation`, `Investment Income Tax`, `Policyholder Taxation`, `International Capital Requirement`, `International Framework`
- **Batch 98** (Tier 3, done) · Long-term insurance (life, annuities) (ILA-201I (SOA) › International Financial Reporting Requirements; ILA-201U (SOA) › Advanced Product Management) · 4 concepts: `International Life Insurance Company`, `US Company Tax Rule`, `Crediting Rating Agency Framework`, `Formulaic Reserve`
- **Batch 99** (Tier 3, done) · Statistics and predictive analytics (DISC-DA (CAS) › 3. Preparing Data for Analysis; DISC-DA (CAS) › 1. Planning an Insurer Data Modeling Project) · 11 concepts: `Data Documentation`, `Data Ethics`, `Statistical Plan`, `Data Mart`, `Data Validation`, `Database Index`, `Table Join`, `User-Defined Function`, `Web Scraping`, `Structured Data`, `Data Preparation`
- **Batch 100** (Tier 1, to do) · Other (PAF (SOA) › What Actuaries Do) · 1 concepts: `Financial Security System`
- **Batch 101** (Tier 2, to do) · Other (6I (CAS) › A. Regulation of Insurance; 6I (CAS) › B. Solvency) · 10 concepts: `Consumer Protection`, `Capital Adequacy`, `Solvency Assessment`, `Main Cause`, `Code of Professional Conduct`, `Case Study`, `Professional Ethics`, `External Force`, `Communication Skills`, `Integrated Decision-Making Process`
- **Batch 102** (Tier 2, to do) · Other (DMAC (SOA) › Investigate Options; DMAC (SOA) › Make Decision) · 10 concepts: `Team Dynamics`, `Options Stage`, `Preferences Contribute`, `Decision Stage`, `Shared Hope`, `Fundamental Actuarial Formula`, `Group Basis`, `Reserve Deficiency`, `YourHealth's Reserve`, `Emotional Intelligence`
- **Batch 103** (Tier 2, to do) · Other (VEE-ECON (SOA) › Microeconomics; VEE-AF (SOA) › Accounting) · 8 concepts: `Financial Insecurity`, `Annual Report`, `Financial Ratio`, `Exchange Rate`, `Financial Market`, `Pricing Strategy`, `Competitive Market`, `Supply and Demand`
- **Batch 104** (Tier 2, to do) · Retirement (RET-201 (SOA) › Retirement Plan Investment and Risk Management; RET-301 (SOA) › Assumptions) · 3 concepts: `Investment Strategy`, `Economic Environment`, `Actual Experience`
- **Batch 105** (Tier 3, to do) · Other (6I (CAS) › A. Regulation of Insurance; 6I (CAS) › B. Solvency) · 10 concepts: `Distribution Activity`, `Insurance Supervision`, `Market Discipline`, `Professional Code`, `Vital Service`, `Capital Measures`, `Solvency Standard`, `October 2026 Administration`, `Insurance Entity`, `Aligning Insurer`
- **Batch 106** (Tier 3, to do) · Other (6I (CAS) › E. Professional Responsibilities of the Actuary in Financial Reporting; 6I (CAS) › D. International Reinsurance) · 10 concepts: `Financial Statement Presentation`, `10-10 Rule`, `Expected Reinsurer Deficit`, `Actuarial Function`, `Effective Risk`, `Actuarial Professional Standards`, `Actuary's Professional Conduct`, `International Standards of Actuarial Practice`, `Principles Guide`, `Principles of Professionalism`
- **Batch 107** (Tier 3, to do) · Other (ASF (SOA) › External Forces; ASF (SOA) › How We Do Our Work) · 10 concepts: `Three Lines of Defense`, `Insurance Discipline`, `Legal Liability`, `Important Aspect`, `Changing Nature`, `Cultural-social Value`, `Governmental Influence`, `Physical Environment`, `Communications Actuary`, `Cycle Facilitate`
- **Batch 108** (Tier 3, to do) · Other (DMAC (SOA) › Build Team) · 10 concepts: `Enlist Everyone`, `Team Building`, `Team Stage`, `Completing Reading`, `Discover Shared Hope`, `ERM Case Study`, `Effective Facilitation`, `Emotional Recognition Strategy`, `Enlist Stakeholder`, `Ensure Comprehensive`
- **Batch 109** (Tier 3, to do) · Other (DMAC (SOA) › Build Team; DMAC (SOA) › Implement Decision) · 10 concepts: `Improving Interpersonal`, `Improving Workplace Communication`, `Investigating Option`, `Ongoing Development Activity`, `Probing Question`, `Problem-Solving Scenario`, `Project Plan`, `Team's Success`, `Budgetary Constraint`, `Communication Strategy`
- **Batch 110** (Tier 3, to do) · Other (DMAC (SOA) › Implement Decision; DMAC (SOA) › Integrated Decision-Making Process) · 10 concepts: `Communication Throughout`, `Diverse Background`, `Integrated Decision-Making Process Fit`, `Optimizing Resource`, `Project Management Strategy`, `Project Need`, `Suit Team Dynamics`, `Competency Framework Align`, `Processing Information Known`, `SOA Competency`
- **Batch 111** (Tier 3, to do) · Other (DMAC (SOA) › Investigate Options; DMAC (SOA) › Integrated Decision-Making Process) · 10 concepts: `Successful Decision-Making Process`, `Conflict Management Strategy`, `Diverse Perspective`, `Effective Information Gathering`, `Foster Deeper`, `Get Everything`, `Improving Team Dynamics`, `Maintaining Composure`, `Non-Emotional Response`, `Nonverbal Communication Cue`
- **Batch 112** (Tier 3, to do) · Other (DMAC (SOA) › Investigate Options; DMAC (SOA) › Make Decision) · 10 concepts: `Personal Strategy`, `Relative Success`, `Resolve Team Conflict`, `Resolving Difference`, `Unconscious Biase`, `Decision Stage Lead`, `Effective Decision`, `Gain Alignment`, `Promoting Collaboration`, `Shared Decision`
- **Batch 113** (Tier 3, to do) · Other (FAP (SOA) › Designing and Pricing an Actuarial Solution; DMAC (SOA) › Make Decision) · 10 concepts: `Synthesizing Multiple Point`, `Team's Ultimate`, `Legal Duty`, `Presentation Skills`, `Business Case`, `Oral Presentation`, `Emphasizes Pricing`, `Financial Security System's Future Capital Need`, `Financial Security System's Obligation`, `Fundamental Simplified Equation`
- **Batch 114** (Tier 3, to do) · Other (FAP (SOA) › FAP Risk in Actuarial Problems; FAP (SOA) › Designing and Pricing an Actuarial Solution) · 10 concepts: `Future Asset`, `Prescribed Basis`, `Tying Together`, `Risk Measurement`, `Answering Six Key Communication Question`, `Better Problem Definition`, `Categorize Commonality`, `Clearer Definition`, `Effective Identification`, `Effective Memo`
- **Batch 115** (Tier 3, to do) · Other (FAP (SOA) › FAP Risk in Actuarial Problems; FAP (SOA) › Model Selection and Solution Design) · 10 concepts: `Effective Presentation`, `Financial Security System Failure`, `Non-Financial Organization`, `Revolve Around Risk`, `Risks Lead`, `Model-Building Process Fit`, `Cycle Principle`, `Module Begin`, `Original Business`, `Presented Pricing`
- **Batch 116** (Tier 3, to do) · Other (FAP (SOA) › Monitoring Results; FAP (SOA) › Model Selection and Solution Design) · 10 concepts: `Three-Stage Process`, `YourHealth's Reserve Methodology`, `Experience Data`, `Experience Deviation`, `Gathering Data`, `Adverse Experience`, `Past Module`, `Previous Module`, `Six Data`, `Stage Fit`
- **Batch 117** (Tier 3, to do) · Other (FAP (SOA) › Selection of Initial Assumptions; FAP (SOA) › Monitoring Results) · 10 concepts: `Stated Quite`, `Validating Data`, `Actuary Rely`, `Future Expectation`, `Group Supervision`, `Involve Filling`, `Learned Quite`, `Ongoing Risk`, `Solvency Regime`, `Supplementary Regulation`
- **Batch 118** (Tier 3, to do) · Other (PAF (SOA) › Building Your Emotional Intelligence Skills; PAF (SOA) › Role of the Professional Actuary) · 10 concepts: `Actuaries Need High Emotional Intelligence`, `Actuary's Success`, `Better Actuary`, `Emotional Trigger`, `Leader's Success`, `Plan Simple Communication`, `Problem-Solving Process`, `Social Awareness`, `Actuary Contribute`, `Actuary's Skill Set`
- **Batch 119** (Tier 3, to do) · Other (PAF (SOA) › What Actuaries Do; PAF (SOA) › Role of the Professional Actuary) · 10 concepts: `Brief History`, `Events Influencing`, `Profession's Code`, `Today's Actuary`, `Actuaries Focus`, `Actuary's Contribution`, `Combat Financial Insecurity`, `Contingent Event`, `Disparate Need`, `Effective Communicator`
- **Batch 120** (Tier 3, to do) · Other (PAF (SOA) › What Actuaries Do; VEE-AF (SOA) › Accounting) · 10 concepts: `Financial Security Systems Interact`, `Governmental Financial Security System`, `Many Stakeholder`, `Modern Financial Security System`, `Professional Actuary`, `Services Actuary`, `Stakeholders' Need`, `Accounting Regulation`, `Taxation of Investments`, `Weighted Average Cost of Capital`
- **Batch 121** (Tier 3, to do) · Other (VEE-ECON (SOA) › Macroeconomics; VEE-AF (SOA) › Corporate Finance) · 10 concepts: `Equity Capital`, `Long-Term Debt`, `Short-Term Financing`, `Balance of Payments`, `Fiscal Policy`, `Gross Domestic Product`, `International Trade`, `Macroeconomic Policy`, `Monetary Policy`, `Public Finance`
- **Batch 122** (Tier 3, to do) · Other (VEE-ECON (SOA) › Microeconomics; VEE-MS (SOA) › Mathematical Statistics) · 10 concepts: `Savings and Consumption`, `Imperfect Competition`, `Long-Run Investment`, `Market Equilibrium`, `Production Choice`, `Utility Maximization`, `Information Criteria`, `Contingency Table`, `Properties of Estimators`, `Statistical Inference`
- **Batch 123** (Tier 3, to do) · ERM and corporate finance (CFE-101 (SOA) › Risk Analysis and Evaluation) · 1 concepts: `Organizational Need`
- **Batch 124** (Tier 3, to do) · Retirement (RET-101 (SOA) › Benefit Plan Design Recommendation) · 1 concepts: `Employee Behavior Consistent`
- **Batch 125** (Tier 3, to do) · Short-term insurance (P&C, general) (GI-302 (SOA) › U.S. General Insurance Products and Coverages) · 2 concepts: `Commercial Insurance Premium`, `WC Insurance`

### Tier 1 — high-traffic foundations (1)

| # | Concept (canonical filename) | Aliases | Links (guides) | Qs tagged / mentioned | Weight | Exam(s) | Linked from | Depends on | Score |
|---|---|---|---|---|---|---|---|---|---|
| 1 | `Concepts/Financial Security System.md` | — | 12 (2) | 0 / 0 | — | FAP (SOA), PAF (SOA) | FAP (SOA) › Designing and Pricing an Actuarial Solution; FAP (SOA) › FAP Risk in Actuarial Problems; FAP (SOA) › Selection of Initial Assumptions; +1 | — | 8.58 |

### Tier 2 — frequently linked, exam-relevant (32)

| # | Concept (canonical filename) | Aliases | Links (guides) | Qs tagged / mentioned | Weight | Exam(s) | Linked from | Depends on | Score |
|---|---|---|---|---|---|---|---|---|---|
| 1 | `Concepts/Solvency Assessment.md` | — | 3 (2) | 0 / 9 | 17% | 6I (CAS), FAP (SOA) | 6I (CAS) › B. Solvency; 6I (CAS) › C. Financial Reporting; FAP (SOA) › Selection of Initial Assumptions | — | 7.8 |
| 2 | `Concepts/Actual Experience.md` | — | 2 (2) | 0 / 17 | 11% | RET-201 (SOA), RET-301 (SOA) | RET-201 (SOA) › Actuarial Assumptions; RET-301 (SOA) › Assumptions | — | 7.76 |
| 3 | `Concepts/Case Study.md` | — | 2 (2) | 0 / 6 | — | APC (SOA), FAC (SOA) | APC (SOA) › Case Discussion; FAC (SOA) › Synchronous Meeting | — | 7.18 |
| 4 | `Concepts/Capital Adequacy.md` | — | 1 (1) | 0 / 30 | 9% | 6I (CAS) | 6I (CAS) › B. Solvency | — | 6.95 |
| 5 | `Concepts/Investment Strategy.md` | — | 1 (1) | 0 / 24 | 7% | RET-201 (SOA) | RET-201 (SOA) › Retirement Plan Investment and Risk Management | — | 6.6 |
| 6 | `Concepts/Total Risk.md` | — | 1 (1) | 0 / 10 | 15% | GH-101 (SOA) | GH-101 (SOA) › Underwriting and Funding | — | 6.25 |
| 7 | `Concepts/Integrated Decision-Making Process.md` | — | 10 (1) | 0 / 0 | — | DMAC (SOA) | DMAC (SOA) › Build Team; DMAC (SOA) › Implement Decision; DMAC (SOA) › Integrated Decision-Making Process; +2 | — | 5.72 |
| 8 | `Concepts/Code of Professional Conduct.md` | — | 5 (3) | 0 / 0 | — | APC (SOA), COP (CAS), FAC (SOA) | APC (SOA) › Case Discussion; APC (SOA) › E-Learning Module; COP (CAS) › The Course; +1 | — | 5.46 |
| 9 | `Concepts/Decision Stage.md` | — | 7 (1) | 0 / 0 | — | DMAC (SOA) | DMAC (SOA) › Implement Decision; DMAC (SOA) › Make Decision | — | 5.41 |
| 10 | `Concepts/Consumer Protection.md` | — | 1 (1) | 0 / 6 | 8% | 6I (CAS) | 6I (CAS) › A. Regulation of Insurance | — | 5.4 |
| 11 | `Concepts/Emotional Intelligence.md` | — | 5 (1) | 0 / 0 | — | PAF (SOA) | PAF (SOA) › Building Your Emotional Intelligence Skills | — | 5.12 |
| 12 | `Concepts/Economic Environment.md` | — | 1 (1) | 0 / 4 | 7% | RET-201 (SOA) | RET-201 (SOA) › Retirement Plan Investment and Risk Management | — | 4.99 |
| 13 | `Concepts/Exchange Rate.md` | — | 2 (1) | 0 / 4 | — | VEE-ECON (SOA) | VEE-ECON (SOA) › Macroeconomics | — | 4.99 |
| 14 | `Concepts/Annual Report.md` | — | 1 (1) | 0 / 5 | — | VEE-AF (SOA) | VEE-AF (SOA) › Accounting | — | 4.77 |
| 15 | `Concepts/Pricing Strategy.md` | — | 1 (1) | 0 / 5 | — | VEE-ECON (SOA) | VEE-ECON (SOA) › Microeconomics | — | 4.77 |
| 16 | `Concepts/Professional Ethics.md` | — | 4 (2) | 0 / 0 | — | APC (SOA), FAC (SOA) | APC (SOA) › Case Discussion; APC (SOA) › E-Learning Module; FAC (SOA) › E-Learning Module; +1 | — | 4.71 |
| 17 | `Concepts/Main Cause.md` | — | 1 (1) | 0 / 3 | 5% | 6I (CAS) | 6I (CAS) › D. International Reinsurance | — | 4.64 |
| 18 | `Concepts/Team Dynamics.md` | — | 1 (1) | 0 / 0 | — | DMAC (SOA) | DMAC (SOA) › Investigate Options | — | 4.63 |
| 19 | `Concepts/Competitive Market.md` | — | 1 (1) | 0 / 4 | — | VEE-ECON (SOA) | VEE-ECON (SOA) › Microeconomics | — | 4.59 |
| 20 | `Concepts/Financial Ratio.md` | — | 1 (1) | 0 / 4 | — | VEE-AF (SOA) | VEE-AF (SOA) › Accounting | — | 4.59 |
| 21 | `Concepts/Reserve Deficiency.md` | — | 1 (1) | 0 / 4 | — | FAP (SOA) | FAP (SOA) › Model Selection and Solution Design | — | 4.59 |
| 22 | `Concepts/Supply and Demand.md` | — | 1 (1) | 0 / 4 | — | VEE-ECON (SOA) | VEE-ECON (SOA) › Microeconomics | — | 4.59 |
| 23 | `Concepts/Financial Market.md` | — | 1 (1) | 0 / 3 | — | VEE-ECON (SOA) | VEE-ECON (SOA) › Macroeconomics | — | 4.37 |
| 24 | `Concepts/Communication Skills.md` | — | 2 (2) | 0 / 0 | — | COP (CAS), FAC (SOA) | COP (CAS) › Communication Skills; FAC (SOA) › E-Learning Module | — | 4.2 |
| 25 | `Concepts/Financial Insecurity.md` | — | 1 (1) | 0 / 0 | — | PAF (SOA) | PAF (SOA) › What Actuaries Do | — | 4.02 |
| 26 | `Concepts/Shared Hope.md` | — | 1 (1) | 0 / 0 | — | DMAC (SOA) | DMAC (SOA) › Make Decision | — | 4.02 |
| 27 | `Concepts/YourHealth's Reserve.md` | — | 1 (1) | 0 / 0 | — | FAP (SOA) | FAP (SOA) › Model Selection and Solution Design | — | 4.02 |
| 28 | `Concepts/External Force.md` | — | 4 (1) | 0 / 0 | — | ASF (SOA) | ASF (SOA) › External Forces | — | 3.9 |
| 29 | `Concepts/Fundamental Actuarial Formula.md` | — | 3 (1) | 0 / 0 | — | FAP (SOA) | FAP (SOA) › Designing and Pricing an Actuarial Solution; FAP (SOA) › Model Selection and Solution Design | — | 3.67 |
| 30 | `Concepts/Group Basis.md` | — | 3 (1) | 0 / 0 | — | FAP (SOA) | FAP (SOA) › Designing and Pricing an Actuarial Solution; FAP (SOA) › Model Selection and Solution Design | — | 3.67 |
| 31 | `Concepts/Options Stage.md` | — | 3 (1) | 0 / 0 | — | DMAC (SOA) | DMAC (SOA) › Investigate Options | — | 3.67 |
| 32 | `Concepts/Preferences Contribute.md` | — | 3 (1) | 0 / 0 | — | DMAC (SOA) | DMAC (SOA) › Implement Decision; DMAC (SOA) › Investigate Options; DMAC (SOA) › Make Decision | — | 3.67 |

### Tier 3 — niche or single-link (184)

<details><summary>Show the table</summary>

| # | Concept (canonical filename) | Aliases | Links (guides) | Qs tagged / mentioned | Weight | Exam(s) | Linked from | Depends on | Score |
|---|---|---|---|---|---|---|---|---|---|
| 1 | `Concepts/Insurance Entity.md` | — | 1 (1) | 0 / 1 | 17% | 6I (CAS) | 6I (CAS) › C. Financial Reporting | — | 4.69 |
| 2 | `Concepts/Capital Measures.md` | — | 1 (1) | 0 / 2 | 9% | 6I (CAS) | 6I (CAS) › B. Solvency | — | 4.62 |
| 3 | `Concepts/Solvency Standard.md` | — | 1 (1) | 0 / 1 | 9% | 6I (CAS) | 6I (CAS) › B. Solvency | — | 4.21 |
| 4 | `Concepts/Actuarial Function.md` | — | 1 (1) | 0 / 1 | 7% | 6I (CAS) | 6I (CAS) › E. Professional Responsibilities of the Actuary in Financial Reporting | — | 4.08 |
| 5 | `Concepts/Effective Risk.md` | — | 1 (1) | 0 / 1 | 7% | 6I (CAS) | 6I (CAS) › E. Professional Responsibilities of the Actuary in Financial Reporting | — | 4.08 |
| 6 | `Concepts/Information Criteria.md` | — | 1 (1) | 0 / 2 | — | VEE-MS (SOA) | VEE-MS (SOA) › Mathematical Statistics | — | 4.08 |
| 7 | `Concepts/Legal Liability.md` | — | 2 (1) | 0 / 1 | — | APC (SOA) | APC (SOA) › Case Discussion; APC (SOA) › E-Learning Module | — | 4.08 |
| 8 | `Concepts/Risk Measurement.md` | — | 1 (1) | 0 / 2 | — | FAP (SOA) | FAP (SOA) › FAP Risk in Actuarial Problems | — | 4.08 |
| 9 | `Concepts/Aligning Insurer.md` | — | 1 (1) | 0 / 0 | 17% | 6I (CAS) | 6I (CAS) › C. Financial Reporting | — | 3.99 |
| 10 | `Concepts/Financial Statement Presentation.md` | — | 1 (1) | 0 / 0 | 17% | 6I (CAS) | 6I (CAS) › C. Financial Reporting | — | 3.99 |
| 11 | `Concepts/10-10 Rule.md` | — | 1 (1) | 0 / 1 | 5% | 6I (CAS) | 6I (CAS) › D. International Reinsurance | — | 3.94 |
| 12 | `Concepts/Expected Reinsurer Deficit.md` | — | 1 (1) | 0 / 1 | 5% | 6I (CAS) | 6I (CAS) › D. International Reinsurance | — | 3.94 |
| 13 | `Concepts/Organizational Need.md` | — | 1 (1) | 0 / 0 | 14% | CFE-101 (SOA) | CFE-101 (SOA) › Risk Analysis and Evaluation | — | 3.82 |
| 14 | `Concepts/Contingency Table.md` | — | 1 (1) | 0 / 1 | — | VEE-MS (SOA) | VEE-MS (SOA) › Mathematical Statistics | — | 3.67 |
| 15 | `Concepts/Experience Data.md` | — | 1 (1) | 0 / 1 | — | FAP (SOA) | FAP (SOA) › Monitoring Results | — | 3.67 |
| 16 | `Concepts/Weighted Average Cost of Capital.md` | — | 1 (1) | 0 / 1 | — | VEE-AF (SOA) | VEE-AF (SOA) › Corporate Finance | — | 3.67 |
| 17 | `Concepts/Employee Behavior Consistent.md` | — | 1 (1) | 0 / 0 | 9% | RET-101 (SOA) | RET-101 (SOA) › Benefit Plan Design Recommendation | — | 3.52 |
| 18 | `Concepts/October 2026 Administration.md` | — | 1 (1) | 0 / 0 | 9% | 6I (CAS) | 6I (CAS) › B. Solvency | — | 3.52 |
| 19 | `Concepts/Distribution Activity.md` | — | 1 (1) | 0 / 0 | 8% | 6I (CAS) | 6I (CAS) › A. Regulation of Insurance | — | 3.45 |
| 20 | `Concepts/Insurance Supervision.md` | — | 1 (1) | 0 / 0 | 8% | 6I (CAS) | 6I (CAS) › A. Regulation of Insurance | — | 3.45 |
| 21 | `Concepts/Market Discipline.md` | — | 1 (1) | 0 / 0 | 8% | 6I (CAS) | 6I (CAS) › A. Regulation of Insurance | — | 3.45 |
| 22 | `Concepts/Professional Code.md` | — | 1 (1) | 0 / 0 | 8% | 6I (CAS) | 6I (CAS) › A. Regulation of Insurance | — | 3.45 |
| 23 | `Concepts/Vital Service.md` | — | 1 (1) | 0 / 0 | 8% | 6I (CAS) | 6I (CAS) › A. Regulation of Insurance | — | 3.45 |
| 24 | `Concepts/Actuarial Professional Standards.md` | — | 1 (1) | 0 / 0 | 7% | 6I (CAS) | 6I (CAS) › E. Professional Responsibilities of the Actuary in Financial Reporting | — | 3.38 |
| 25 | `Concepts/Actuary's Professional Conduct.md` | — | 1 (1) | 0 / 0 | 7% | 6I (CAS) | 6I (CAS) › E. Professional Responsibilities of the Actuary in Financial Reporting | — | 3.38 |
| 26 | `Concepts/Enlist Everyone.md` | Enlisting Everyone | 2 (1) | 0 / 0 | — | DMAC (SOA) | DMAC (SOA) › Build Team | — | 3.38 |
| 27 | `Concepts/Experience Deviation.md` | — | 2 (1) | 0 / 0 | — | FAP (SOA) | FAP (SOA) › Monitoring Results | — | 3.38 |
| 28 | `Concepts/Gathering Data.md` | — | 2 (1) | 0 / 0 | — | FAP (SOA) | FAP (SOA) › Monitoring Results | — | 3.38 |
| 29 | `Concepts/International Standards of Actuarial Practice.md` | — | 1 (1) | 0 / 0 | 7% | 6I (CAS) | 6I (CAS) › E. Professional Responsibilities of the Actuary in Financial Reporting | — | 3.38 |
| 30 | `Concepts/Model-Building Process Fit.md` | — | 2 (1) | 0 / 0 | — | FAP (SOA) | FAP (SOA) › Model Selection and Solution Design | — | 3.38 |
| 31 | `Concepts/Principles Guide.md` | — | 1 (1) | 0 / 0 | 7% | 6I (CAS) | 6I (CAS) › E. Professional Responsibilities of the Actuary in Financial Reporting | — | 3.38 |
| 32 | `Concepts/Principles of Professionalism.md` | — | 1 (1) | 0 / 0 | 7% | 6I (CAS) | 6I (CAS) › E. Professional Responsibilities of the Actuary in Financial Reporting | — | 3.38 |
| 33 | `Concepts/Project Plan.md` | — | 2 (1) | 0 / 0 | — | DMAC (SOA) | DMAC (SOA) › Implement Decision | — | 3.38 |
| 34 | `Concepts/Team Building.md` | — | 2 (1) | 0 / 0 | — | DMAC (SOA) | DMAC (SOA) › Build Team; DMAC (SOA) › Implement Decision | — | 3.38 |
| 35 | `Concepts/Team Stage.md` | — | 2 (1) | 0 / 0 | — | DMAC (SOA) | DMAC (SOA) › Build Team | — | 3.38 |
| 36 | `Concepts/Team's Success.md` | — | 2 (1) | 0 / 0 | — | DMAC (SOA) | DMAC (SOA) › Implement Decision | — | 3.38 |
| 37 | `Concepts/Three Lines of Defense.md` | — | 1 (1) | 0 / 0 | 7% | 6I (CAS) | 6I (CAS) › E. Professional Responsibilities of the Actuary in Financial Reporting | — | 3.38 |
| 38 | `Concepts/Commercial Insurance Premium.md` | — | 1 (1) | 0 / 0 | 3% | GI-302 (SOA) | GI-302 (SOA) › U.S. General Insurance Products and Coverages | — | 3.18 |
| 39 | `Concepts/WC Insurance.md` | — | 1 (1) | 0 / 0 | 3% | GI-302 (SOA) | GI-302 (SOA) › U.S. General Insurance Products and Coverages | — | 3.18 |
| 40 | `Concepts/Accounting Regulation.md` | — | 1 (1) | 0 / 0 | — | VEE-AF (SOA) | VEE-AF (SOA) › Accounting | — | 2.98 |
| 41 | `Concepts/Actuaries Focus.md` | — | 1 (1) | 0 / 0 | — | PAF (SOA) | PAF (SOA) › What Actuaries Do | — | 2.98 |
| 42 | `Concepts/Actuaries Need High Emotional Intelligence.md` | — | 1 (1) | 0 / 0 | — | PAF (SOA) | PAF (SOA) › Building Your Emotional Intelligence Skills | Emotional Intelligence | 2.98 |
| 43 | `Concepts/Actuary Contribute.md` | — | 1 (1) | 0 / 0 | — | PAF (SOA) | PAF (SOA) › Role of the Professional Actuary | — | 2.98 |
| 44 | `Concepts/Actuary Rely.md` | — | 1 (1) | 0 / 0 | — | FAP (SOA) | FAP (SOA) › Selection of Initial Assumptions | — | 2.98 |
| 45 | `Concepts/Actuary's Contribution.md` | — | 1 (1) | 0 / 0 | — | PAF (SOA) | PAF (SOA) › What Actuaries Do | — | 2.98 |
| 46 | `Concepts/Actuary's Skill Set.md` | — | 1 (1) | 0 / 0 | — | PAF (SOA) | PAF (SOA) › Role of the Professional Actuary | — | 2.98 |
| 47 | `Concepts/Actuary's Success.md` | — | 1 (1) | 0 / 0 | — | PAF (SOA) | PAF (SOA) › Building Your Emotional Intelligence Skills | — | 2.98 |
| 48 | `Concepts/Adverse Experience.md` | — | 1 (1) | 0 / 0 | — | FAP (SOA) | FAP (SOA) › Monitoring Results | — | 2.98 |
| 49 | `Concepts/Answering Six Key Communication Question.md` | — | 1 (1) | 0 / 0 | — | FAP (SOA) | FAP (SOA) › FAP Risk in Actuarial Problems | — | 2.98 |
| 50 | `Concepts/Balance of Payments.md` | — | 1 (1) | 0 / 0 | — | VEE-ECON (SOA) | VEE-ECON (SOA) › Macroeconomics | — | 2.98 |
| 51 | `Concepts/Better Actuary.md` | — | 1 (1) | 0 / 0 | — | PAF (SOA) | PAF (SOA) › Building Your Emotional Intelligence Skills | — | 2.98 |
| 52 | `Concepts/Better Problem Definition.md` | — | 1 (1) | 0 / 0 | — | FAP (SOA) | FAP (SOA) › FAP Risk in Actuarial Problems | — | 2.98 |
| 53 | `Concepts/Brief History.md` | — | 1 (1) | 0 / 0 | — | PAF (SOA) | PAF (SOA) › Role of the Professional Actuary | — | 2.98 |
| 54 | `Concepts/Budgetary Constraint.md` | — | 1 (1) | 0 / 0 | — | DMAC (SOA) | DMAC (SOA) › Implement Decision | — | 2.98 |
| 55 | `Concepts/Business Case.md` | — | 1 (1) | 0 / 0 | — | FAC (SOA) | FAC (SOA) › Synchronous Meeting | — | 2.98 |
| 56 | `Concepts/Categorize Commonality.md` | — | 1 (1) | 0 / 0 | — | FAP (SOA) | FAP (SOA) › FAP Risk in Actuarial Problems | — | 2.98 |
| 57 | `Concepts/Changing Nature.md` | — | 1 (1) | 0 / 0 | — | ASF (SOA) | ASF (SOA) › External Forces | — | 2.98 |
| 58 | `Concepts/Clearer Definition.md` | — | 1 (1) | 0 / 0 | — | FAP (SOA) | FAP (SOA) › FAP Risk in Actuarial Problems | — | 2.98 |
| 59 | `Concepts/Combat Financial Insecurity.md` | — | 1 (1) | 0 / 0 | — | PAF (SOA) | PAF (SOA) › What Actuaries Do | Financial Insecurity | 2.98 |
| 60 | `Concepts/Communication Strategy.md` | — | 1 (1) | 0 / 0 | — | DMAC (SOA) | DMAC (SOA) › Implement Decision | — | 2.98 |
| 61 | `Concepts/Communication Throughout.md` | — | 1 (1) | 0 / 0 | — | DMAC (SOA) | DMAC (SOA) › Implement Decision | — | 2.98 |
| 62 | `Concepts/Communications Actuary.md` | — | 1 (1) | 0 / 0 | — | ASF (SOA) | ASF (SOA) › How We Do Our Work | — | 2.98 |
| 63 | `Concepts/Competency Framework Align.md` | — | 1 (1) | 0 / 0 | — | DMAC (SOA) | DMAC (SOA) › Integrated Decision-Making Process | — | 2.98 |
| 64 | `Concepts/Completing Reading.md` | — | 1 (1) | 0 / 0 | — | DMAC (SOA) | DMAC (SOA) › Build Team | — | 2.98 |
| 65 | `Concepts/Conflict Management Strategy.md` | — | 1 (1) | 0 / 0 | — | DMAC (SOA) | DMAC (SOA) › Investigate Options | — | 2.98 |
| 66 | `Concepts/Contingent Event.md` | — | 1 (1) | 0 / 0 | — | PAF (SOA) | PAF (SOA) › What Actuaries Do | — | 2.98 |
| 67 | `Concepts/Cultural-social Value.md` | — | 1 (1) | 0 / 0 | — | ASF (SOA) | ASF (SOA) › External Forces | — | 2.98 |
| 68 | `Concepts/Cycle Facilitate.md` | — | 1 (1) | 0 / 0 | — | ASF (SOA) | ASF (SOA) › How We Do Our Work | — | 2.98 |
| 69 | `Concepts/Cycle Principle.md` | — | 1 (1) | 0 / 0 | — | FAP (SOA) | FAP (SOA) › Model Selection and Solution Design | — | 2.98 |
| 70 | `Concepts/Decision Stage Lead.md` | — | 1 (1) | 0 / 0 | — | DMAC (SOA) | DMAC (SOA) › Make Decision | Decision Stage | 2.98 |
| 71 | `Concepts/Discover Shared Hope.md` | — | 1 (1) | 0 / 0 | — | DMAC (SOA) | DMAC (SOA) › Build Team | Shared Hope | 2.98 |
| 72 | `Concepts/Disparate Need.md` | — | 1 (1) | 0 / 0 | — | PAF (SOA) | PAF (SOA) › What Actuaries Do | — | 2.98 |
| 73 | `Concepts/Diverse Background.md` | — | 1 (1) | 0 / 0 | — | DMAC (SOA) | DMAC (SOA) › Implement Decision | — | 2.98 |
| 74 | `Concepts/Diverse Perspective.md` | — | 1 (1) | 0 / 0 | — | DMAC (SOA) | DMAC (SOA) › Investigate Options | — | 2.98 |
| 75 | `Concepts/ERM Case Study.md` | — | 1 (1) | 0 / 0 | — | DMAC (SOA) | DMAC (SOA) › Build Team | Case Study | 2.98 |
| 76 | `Concepts/Effective Communicator.md` | — | 1 (1) | 0 / 0 | — | PAF (SOA) | PAF (SOA) › What Actuaries Do | — | 2.98 |
| 77 | `Concepts/Effective Decision.md` | — | 1 (1) | 0 / 0 | — | DMAC (SOA) | DMAC (SOA) › Make Decision | — | 2.98 |
| 78 | `Concepts/Effective Facilitation.md` | — | 1 (1) | 0 / 0 | — | DMAC (SOA) | DMAC (SOA) › Build Team | — | 2.98 |
| 79 | `Concepts/Effective Identification.md` | — | 1 (1) | 0 / 0 | — | FAP (SOA) | FAP (SOA) › FAP Risk in Actuarial Problems | — | 2.98 |
| 80 | `Concepts/Effective Information Gathering.md` | — | 1 (1) | 0 / 0 | — | DMAC (SOA) | DMAC (SOA) › Investigate Options | — | 2.98 |
| 81 | `Concepts/Effective Memo.md` | — | 1 (1) | 0 / 0 | — | FAP (SOA) | FAP (SOA) › FAP Risk in Actuarial Problems | — | 2.98 |
| 82 | `Concepts/Effective Presentation.md` | — | 1 (1) | 0 / 0 | — | FAP (SOA) | FAP (SOA) › FAP Risk in Actuarial Problems | — | 2.98 |
| 83 | `Concepts/Emotional Recognition Strategy.md` | — | 1 (1) | 0 / 0 | — | DMAC (SOA) | DMAC (SOA) › Build Team | — | 2.98 |
| 84 | `Concepts/Emotional Trigger.md` | — | 1 (1) | 0 / 0 | — | PAF (SOA) | PAF (SOA) › Building Your Emotional Intelligence Skills | — | 2.98 |
| 85 | `Concepts/Emphasizes Pricing.md` | — | 1 (1) | 0 / 0 | — | FAP (SOA) | FAP (SOA) › Designing and Pricing an Actuarial Solution | — | 2.98 |
| 86 | `Concepts/Enlist Stakeholder.md` | — | 1 (1) | 0 / 0 | — | DMAC (SOA) | DMAC (SOA) › Build Team | — | 2.98 |
| 87 | `Concepts/Ensure Comprehensive.md` | — | 1 (1) | 0 / 0 | — | DMAC (SOA) | DMAC (SOA) › Build Team | — | 2.98 |
| 88 | `Concepts/Equity Capital.md` | — | 1 (1) | 0 / 0 | — | VEE-AF (SOA) | VEE-AF (SOA) › Corporate Finance | — | 2.98 |
| 89 | `Concepts/Events Influencing.md` | — | 1 (1) | 0 / 0 | — | PAF (SOA) | PAF (SOA) › Role of the Professional Actuary | — | 2.98 |
| 90 | `Concepts/Financial Security System Failure.md` | — | 1 (1) | 0 / 0 | — | FAP (SOA) | FAP (SOA) › FAP Risk in Actuarial Problems | Financial Security System | 2.98 |
| 91 | `Concepts/Financial Security System's Future Capital Need.md` | — | 1 (1) | 0 / 0 | — | FAP (SOA) | FAP (SOA) › Designing and Pricing an Actuarial Solution | Financial Security System | 2.98 |
| 92 | `Concepts/Financial Security System's Obligation.md` | — | 1 (1) | 0 / 0 | — | FAP (SOA) | FAP (SOA) › Designing and Pricing an Actuarial Solution | Financial Security System | 2.98 |
| 93 | `Concepts/Financial Security Systems Interact.md` | — | 1 (1) | 0 / 0 | — | PAF (SOA) | PAF (SOA) › What Actuaries Do | Financial Security System | 2.98 |
| 94 | `Concepts/Fiscal Policy.md` | — | 1 (1) | 0 / 0 | — | VEE-ECON (SOA) | VEE-ECON (SOA) › Macroeconomics | — | 2.98 |
| 95 | `Concepts/Foster Deeper.md` | — | 1 (1) | 0 / 0 | — | DMAC (SOA) | DMAC (SOA) › Investigate Options | — | 2.98 |
| 96 | `Concepts/Fundamental Simplified Equation.md` | — | 1 (1) | 0 / 0 | — | FAP (SOA) | FAP (SOA) › Designing and Pricing an Actuarial Solution | — | 2.98 |
| 97 | `Concepts/Future Asset.md` | — | 1 (1) | 0 / 0 | — | FAP (SOA) | FAP (SOA) › Designing and Pricing an Actuarial Solution | — | 2.98 |
| 98 | `Concepts/Future Expectation.md` | — | 1 (1) | 0 / 0 | — | FAP (SOA) | FAP (SOA) › Selection of Initial Assumptions | — | 2.98 |
| 99 | `Concepts/Gain Alignment.md` | — | 1 (1) | 0 / 0 | — | DMAC (SOA) | DMAC (SOA) › Make Decision | — | 2.98 |
| 100 | `Concepts/Get Everything.md` | — | 1 (1) | 0 / 0 | — | DMAC (SOA) | DMAC (SOA) › Investigate Options | — | 2.98 |
| 101 | `Concepts/Governmental Financial Security System.md` | — | 1 (1) | 0 / 0 | — | PAF (SOA) | PAF (SOA) › What Actuaries Do | Financial Security System | 2.98 |
| 102 | `Concepts/Governmental Influence.md` | — | 1 (1) | 0 / 0 | — | ASF (SOA) | ASF (SOA) › External Forces | — | 2.98 |
| 103 | `Concepts/Gross Domestic Product.md` | — | 1 (1) | 0 / 0 | — | VEE-ECON (SOA) | VEE-ECON (SOA) › Macroeconomics | — | 2.98 |
| 104 | `Concepts/Group Supervision.md` | — | 1 (1) | 0 / 0 | — | FAP (SOA) | FAP (SOA) › Selection of Initial Assumptions | — | 2.98 |
| 105 | `Concepts/Imperfect Competition.md` | — | 1 (1) | 0 / 0 | — | VEE-ECON (SOA) | VEE-ECON (SOA) › Microeconomics | — | 2.98 |
| 106 | `Concepts/Important Aspect.md` | — | 1 (1) | 0 / 0 | — | ASF (SOA) | ASF (SOA) › Actuarial Solutions | — | 2.98 |
| 107 | `Concepts/Improving Interpersonal.md` | — | 1 (1) | 0 / 0 | — | DMAC (SOA) | DMAC (SOA) › Build Team | — | 2.98 |
| 108 | `Concepts/Improving Team Dynamics.md` | — | 1 (1) | 0 / 0 | — | DMAC (SOA) | DMAC (SOA) › Investigate Options | Team Dynamics | 2.98 |
| 109 | `Concepts/Improving Workplace Communication.md` | — | 1 (1) | 0 / 0 | — | DMAC (SOA) | DMAC (SOA) › Build Team | — | 2.98 |
| 110 | `Concepts/Insurance Discipline.md` | — | 1 (1) | 0 / 0 | — | 6T (CAS) | 6T (CAS) › AICT Exam 6GB3 — Insurance Regulations and Discipline | — | 2.98 |
| 111 | `Concepts/Integrated Decision-Making Process Fit.md` | — | 1 (1) | 0 / 0 | — | DMAC (SOA) | DMAC (SOA) › Implement Decision | Integrated Decision-Making Process | 2.98 |
| 112 | `Concepts/International Trade.md` | — | 1 (1) | 0 / 0 | — | VEE-ECON (SOA) | VEE-ECON (SOA) › Macroeconomics | — | 2.98 |
| 113 | `Concepts/Investigating Option.md` | — | 1 (1) | 0 / 0 | — | DMAC (SOA) | DMAC (SOA) › Build Team | — | 2.98 |
| 114 | `Concepts/Involve Filling.md` | — | 1 (1) | 0 / 0 | — | FAP (SOA) | FAP (SOA) › Selection of Initial Assumptions | — | 2.98 |
| 115 | `Concepts/Leader's Success.md` | — | 1 (1) | 0 / 0 | — | PAF (SOA) | PAF (SOA) › Building Your Emotional Intelligence Skills | — | 2.98 |
| 116 | `Concepts/Learned Quite.md` | — | 1 (1) | 0 / 0 | — | FAP (SOA) | FAP (SOA) › Selection of Initial Assumptions | — | 2.98 |
| 117 | `Concepts/Legal Duty.md` | — | 1 (1) | 0 / 0 | — | FAC (SOA) | FAC (SOA) › E-Learning Module | — | 2.98 |
| 118 | `Concepts/Long-Run Investment.md` | — | 1 (1) | 0 / 0 | — | VEE-ECON (SOA) | VEE-ECON (SOA) › Microeconomics | — | 2.98 |
| 119 | `Concepts/Long-Term Debt.md` | — | 1 (1) | 0 / 0 | — | VEE-AF (SOA) | VEE-AF (SOA) › Corporate Finance | — | 2.98 |
| 120 | `Concepts/Macroeconomic Policy.md` | — | 1 (1) | 0 / 0 | — | VEE-ECON (SOA) | VEE-ECON (SOA) › Macroeconomics | — | 2.98 |
| 121 | `Concepts/Maintaining Composure.md` | — | 1 (1) | 0 / 0 | — | DMAC (SOA) | DMAC (SOA) › Investigate Options | — | 2.98 |
| 122 | `Concepts/Many Stakeholder.md` | — | 1 (1) | 0 / 0 | — | PAF (SOA) | PAF (SOA) › What Actuaries Do | — | 2.98 |
| 123 | `Concepts/Market Equilibrium.md` | — | 1 (1) | 0 / 0 | — | VEE-ECON (SOA) | VEE-ECON (SOA) › Microeconomics | — | 2.98 |
| 124 | `Concepts/Modern Financial Security System.md` | — | 1 (1) | 0 / 0 | — | PAF (SOA) | PAF (SOA) › What Actuaries Do | Financial Security System | 2.98 |
| 125 | `Concepts/Module Begin.md` | — | 1 (1) | 0 / 0 | — | FAP (SOA) | FAP (SOA) › Model Selection and Solution Design | — | 2.98 |
| 126 | `Concepts/Monetary Policy.md` | — | 1 (1) | 0 / 0 | — | VEE-ECON (SOA) | VEE-ECON (SOA) › Macroeconomics | — | 2.98 |
| 127 | `Concepts/Non-Emotional Response.md` | — | 1 (1) | 0 / 0 | — | DMAC (SOA) | DMAC (SOA) › Investigate Options | — | 2.98 |
| 128 | `Concepts/Non-Financial Organization.md` | — | 1 (1) | 0 / 0 | — | FAP (SOA) | FAP (SOA) › FAP Risk in Actuarial Problems | — | 2.98 |
| 129 | `Concepts/Nonverbal Communication Cue.md` | — | 1 (1) | 0 / 0 | — | DMAC (SOA) | DMAC (SOA) › Investigate Options | — | 2.98 |
| 130 | `Concepts/Ongoing Development Activity.md` | — | 1 (1) | 0 / 0 | — | DMAC (SOA) | DMAC (SOA) › Build Team | — | 2.98 |
| 131 | `Concepts/Ongoing Risk.md` | — | 1 (1) | 0 / 0 | — | FAP (SOA) | FAP (SOA) › Selection of Initial Assumptions | — | 2.98 |
| 132 | `Concepts/Optimizing Resource.md` | — | 1 (1) | 0 / 0 | — | DMAC (SOA) | DMAC (SOA) › Implement Decision | — | 2.98 |
| 133 | `Concepts/Oral Presentation.md` | — | 1 (1) | 0 / 0 | — | FAC (SOA) | FAC (SOA) › Synchronous Meeting | — | 2.98 |
| 134 | `Concepts/Original Business.md` | — | 1 (1) | 0 / 0 | — | FAP (SOA) | FAP (SOA) › Model Selection and Solution Design | — | 2.98 |
| 135 | `Concepts/Past Module.md` | — | 1 (1) | 0 / 0 | — | FAP (SOA) | FAP (SOA) › Monitoring Results | — | 2.98 |
| 136 | `Concepts/Personal Strategy.md` | — | 1 (1) | 0 / 0 | — | DMAC (SOA) | DMAC (SOA) › Investigate Options | — | 2.98 |
| 137 | `Concepts/Physical Environment.md` | — | 1 (1) | 0 / 0 | — | ASF (SOA) | ASF (SOA) › External Forces | — | 2.98 |
| 138 | `Concepts/Plan Simple Communication.md` | — | 1 (1) | 0 / 0 | — | PAF (SOA) | PAF (SOA) › Building Your Emotional Intelligence Skills | — | 2.98 |
| 139 | `Concepts/Prescribed Basis.md` | — | 1 (1) | 0 / 0 | — | FAP (SOA) | FAP (SOA) › Designing and Pricing an Actuarial Solution | — | 2.98 |
| 140 | `Concepts/Presentation Skills.md` | — | 1 (1) | 0 / 0 | — | FAC (SOA) | FAC (SOA) › E-Learning Module | — | 2.98 |
| 141 | `Concepts/Presented Pricing.md` | — | 1 (1) | 0 / 0 | — | FAP (SOA) | FAP (SOA) › Model Selection and Solution Design | — | 2.98 |
| 142 | `Concepts/Previous Module.md` | — | 1 (1) | 0 / 0 | — | FAP (SOA) | FAP (SOA) › Monitoring Results | — | 2.98 |
| 143 | `Concepts/Probing Question.md` | — | 1 (1) | 0 / 0 | — | DMAC (SOA) | DMAC (SOA) › Build Team | — | 2.98 |
| 144 | `Concepts/Problem-Solving Process.md` | — | 1 (1) | 0 / 0 | — | PAF (SOA) | PAF (SOA) › Building Your Emotional Intelligence Skills | — | 2.98 |
| 145 | `Concepts/Problem-Solving Scenario.md` | — | 1 (1) | 0 / 0 | — | DMAC (SOA) | DMAC (SOA) › Build Team | — | 2.98 |
| 146 | `Concepts/Processing Information Known.md` | — | 1 (1) | 0 / 0 | — | DMAC (SOA) | DMAC (SOA) › Integrated Decision-Making Process | — | 2.98 |
| 147 | `Concepts/Production Choice.md` | — | 1 (1) | 0 / 0 | — | VEE-ECON (SOA) | VEE-ECON (SOA) › Microeconomics | — | 2.98 |
| 148 | `Concepts/Profession's Code.md` | — | 1 (1) | 0 / 0 | — | PAF (SOA) | PAF (SOA) › Role of the Professional Actuary | — | 2.98 |
| 149 | `Concepts/Professional Actuary.md` | — | 1 (1) | 0 / 0 | — | PAF (SOA) | PAF (SOA) › What Actuaries Do | — | 2.98 |
| 150 | `Concepts/Project Management Strategy.md` | — | 1 (1) | 0 / 0 | — | DMAC (SOA) | DMAC (SOA) › Implement Decision | — | 2.98 |
| 151 | `Concepts/Project Need.md` | — | 1 (1) | 0 / 0 | — | DMAC (SOA) | DMAC (SOA) › Implement Decision | — | 2.98 |
| 152 | `Concepts/Promoting Collaboration.md` | — | 1 (1) | 0 / 0 | — | DMAC (SOA) | DMAC (SOA) › Make Decision | — | 2.98 |
| 153 | `Concepts/Properties of Estimators.md` | — | 1 (1) | 0 / 0 | — | VEE-MS (SOA) | VEE-MS (SOA) › Mathematical Statistics | — | 2.98 |
| 154 | `Concepts/Public Finance.md` | — | 1 (1) | 0 / 0 | — | VEE-ECON (SOA) | VEE-ECON (SOA) › Macroeconomics | — | 2.98 |
| 155 | `Concepts/Relative Success.md` | — | 1 (1) | 0 / 0 | — | DMAC (SOA) | DMAC (SOA) › Investigate Options | — | 2.98 |
| 156 | `Concepts/Resolve Team Conflict.md` | — | 1 (1) | 0 / 0 | — | DMAC (SOA) | DMAC (SOA) › Investigate Options | — | 2.98 |
| 157 | `Concepts/Resolving Difference.md` | — | 1 (1) | 0 / 0 | — | DMAC (SOA) | DMAC (SOA) › Investigate Options | — | 2.98 |
| 158 | `Concepts/Revolve Around Risk.md` | — | 1 (1) | 0 / 0 | — | FAP (SOA) | FAP (SOA) › FAP Risk in Actuarial Problems | — | 2.98 |
| 159 | `Concepts/Risks Lead.md` | — | 1 (1) | 0 / 0 | — | FAP (SOA) | FAP (SOA) › FAP Risk in Actuarial Problems | — | 2.98 |
| 160 | `Concepts/SOA Competency.md` | — | 1 (1) | 0 / 0 | — | DMAC (SOA) | DMAC (SOA) › Integrated Decision-Making Process | — | 2.98 |
| 161 | `Concepts/Savings and Consumption.md` | — | 1 (1) | 0 / 0 | — | VEE-ECON (SOA) | VEE-ECON (SOA) › Macroeconomics | — | 2.98 |
| 162 | `Concepts/Services Actuary.md` | — | 1 (1) | 0 / 0 | — | PAF (SOA) | PAF (SOA) › What Actuaries Do | — | 2.98 |
| 163 | `Concepts/Shared Decision.md` | — | 1 (1) | 0 / 0 | — | DMAC (SOA) | DMAC (SOA) › Make Decision | — | 2.98 |
| 164 | `Concepts/Short-Term Financing.md` | — | 1 (1) | 0 / 0 | — | VEE-AF (SOA) | VEE-AF (SOA) › Corporate Finance | — | 2.98 |
| 165 | `Concepts/Six Data.md` | — | 1 (1) | 0 / 0 | — | FAP (SOA) | FAP (SOA) › Monitoring Results | — | 2.98 |
| 166 | `Concepts/Social Awareness.md` | — | 1 (1) | 0 / 0 | — | PAF (SOA) | PAF (SOA) › Building Your Emotional Intelligence Skills | — | 2.98 |
| 167 | `Concepts/Solvency Regime.md` | — | 1 (1) | 0 / 0 | — | FAP (SOA) | FAP (SOA) › Selection of Initial Assumptions | — | 2.98 |
| 168 | `Concepts/Stage Fit.md` | — | 1 (1) | 0 / 0 | — | FAP (SOA) | FAP (SOA) › Monitoring Results | — | 2.98 |
| 169 | `Concepts/Stakeholders' Need.md` | — | 1 (1) | 0 / 0 | — | PAF (SOA) | PAF (SOA) › What Actuaries Do | — | 2.98 |
| 170 | `Concepts/Stated Quite.md` | — | 1 (1) | 0 / 0 | — | FAP (SOA) | FAP (SOA) › Monitoring Results | — | 2.98 |
| 171 | `Concepts/Statistical Inference.md` | — | 1 (1) | 0 / 0 | — | VEE-MS (SOA) | VEE-MS (SOA) › Mathematical Statistics | — | 2.98 |
| 172 | `Concepts/Successful Decision-Making Process.md` | — | 1 (1) | 0 / 0 | — | DMAC (SOA) | DMAC (SOA) › Integrated Decision-Making Process | — | 2.98 |
| 173 | `Concepts/Suit Team Dynamics.md` | — | 1 (1) | 0 / 0 | — | DMAC (SOA) | DMAC (SOA) › Implement Decision | Team Dynamics | 2.98 |
| 174 | `Concepts/Supplementary Regulation.md` | — | 1 (1) | 0 / 0 | — | FAP (SOA) | FAP (SOA) › Selection of Initial Assumptions | — | 2.98 |
| 175 | `Concepts/Synthesizing Multiple Point.md` | — | 1 (1) | 0 / 0 | — | DMAC (SOA) | DMAC (SOA) › Make Decision | — | 2.98 |
| 176 | `Concepts/Taxation of Investments.md` | — | 1 (1) | 0 / 0 | — | VEE-AF (SOA) | VEE-AF (SOA) › Accounting | — | 2.98 |
| 177 | `Concepts/Team's Ultimate.md` | — | 1 (1) | 0 / 0 | — | DMAC (SOA) | DMAC (SOA) › Make Decision | — | 2.98 |
| 178 | `Concepts/Three-Stage Process.md` | — | 1 (1) | 0 / 0 | — | FAP (SOA) | FAP (SOA) › Model Selection and Solution Design | — | 2.98 |
| 179 | `Concepts/Today's Actuary.md` | — | 1 (1) | 0 / 0 | — | PAF (SOA) | PAF (SOA) › Role of the Professional Actuary | — | 2.98 |
| 180 | `Concepts/Tying Together.md` | — | 1 (1) | 0 / 0 | — | FAP (SOA) | FAP (SOA) › Designing and Pricing an Actuarial Solution | — | 2.98 |
| 181 | `Concepts/Unconscious Biase.md` | — | 1 (1) | 0 / 0 | — | DMAC (SOA) | DMAC (SOA) › Investigate Options | — | 2.98 |
| 182 | `Concepts/Utility Maximization.md` | — | 1 (1) | 0 / 0 | — | VEE-ECON (SOA) | VEE-ECON (SOA) › Microeconomics | — | 2.98 |
| 183 | `Concepts/Validating Data.md` | — | 1 (1) | 0 / 0 | — | FAP (SOA) | FAP (SOA) › Monitoring Results | — | 2.98 |
| 184 | `Concepts/YourHealth's Reserve Methodology.md` | — | 1 (1) | 0 / 0 | — | FAP (SOA) | FAP (SOA) › Model Selection and Solution Design | YourHealth's Reserve | 2.98 |

</details>

### Link fixes — the target is a variant of a page that exists

Writing a page would duplicate one. Each of these wants its guide link changed to the page (not done here: the task leaves the study guides alone). Top 60 by link count.

| Link target | Existing page | Links | Guides |
|---|---|---|---|
| `Financial Statement` | `Financial Statements` | 3 | 3 |
| `Individual-joint Life Mortality` | `Joint Life` | 1 | 1 |
| `Financial Report` | `Financial Reporting` | 1 | 1 |
| `Risk Classification` | `Risk Classifications` | 1 | 1 |
| `Insurance-reinsurance` | `Reinsurance Accounting` | 1 | 1 |
| `Actuary's` | `Actuary` | 1 | 1 |
| `Plan Sponsor's` | `Plan Sponsor` | 1 | 1 |
| `Plan Termination-wind-Up` | `Plan Termination` | 1 | 1 |

### Cut-short links — the shown text plus its neighbours names an existing page

| Link target | Existing page | Links | In context |
|---|---|---|---|
| `Claim Processing` | `Claims Processing Changes` | 2 | `[[Claim Processing]] changes` |
| `Health Care` | `Health Care Insurance` | 1 | `predictive analytics in [[Health Care]]` |
| `Workers Compensation` | `Workers Compensation Insurance` | 1 | `Describe the [[Workers Compensation]]` |
| `Enterprise's Risk` | `Enterprise Risk Management` | 1 | `ALM into an [[Enterprise's Risk]] and financial management` |

### Ambiguous targets — for you to decide

| Target | Why | Links | Guides | Candidates | Proposed |
|---|---|---|---|---|---|
| `Reserving` | one word — the one existing page it begins is probably what is meant | 3 | FAP (SOA) | Reserving Data Organization | link `Reserving Data Organization` |
| `Stakeholder` | one word — the one existing page it begins is probably what is meant | 2 | CP-311 (SOA), FAC (SOA) | Stakeholder Reporting | link `Stakeholder Reporting` |
| `Fund` | one word — the one existing page it begins is probably what is meant | 2 | GH-201C (SOA), GH-201U (SOA) | Fund Accumulation | link `Fund Accumulation` |
| `Organization` | one word — the one existing page it begins is probably what is meant | 1 | CP-311 (SOA) | Organizational Resilience | link `Organizational Resilience` |
| `Building` | one word — the one existing page it begins is probably what is meant | 1 | FAP (SOA) | Building and Personal Property Coverage Form | link `Building and Personal Property Coverage Form` |
| `Provider` | one word — the one existing page it begins is probably what is meant | 1 | GH-301 (SOA) | Provider Reimbursement | link `Provider Reimbursement` |
| `Performance` | one word — the one existing page it begins is probably what is meant | 1 | GH-301 (SOA) | Performance Measurement | link `Performance Measurement` |
| `Test` | one word — the one existing page it begins is probably what is meant | 1 | GI-301 (SOA) | Test Error | link `Test Error` |

### One-word targets that aren't terms of art (48)

Not batched. Most are a phrase cut short (`Call` for *call option*); a page named after the bare word would have nothing exam-specific to say. Promote one by adding it to `TERMS_OF_ART` in the script.

<details><summary>Show the list</summary>

`Assumption` (7), `Cycle` (5), `Monitoring` (4), `Contract` (3), `Decision` (3), `Stage` (3), `Scenario` (3), `Solution` (2), `Modeling` (2), `Professionalism` (2), `Technique` (2), `Interdependency` (2), `Regulation` (2), `Catastrophe` (2), `Macroeconomics` (2), `Money` (2), `Takaful` (1), `Designing` (1), `Motivation` (1), `Conversation` (1), `Existing` (1), `Defining` (1), `Acronym` (1), `Rationale` (1), `Problem` (1), `Sensitivity` (1), `Recall` (1), `Determinant` (1), `Dependent` (1), `Result` (1), `Error` (1), `Documentation` (1), `Senior` (1), `Program` (1), `Methodology` (1), `Health` (1), `Work` (1), `Interrelationship` (1), `Circumstance` (1), `Insurance` (1), `Uncertainty` (1), `Non-Guaranteed` (1), `Tomorrow's` (1), `Impulse` (1), `Tradeoff` (1), `Selection` (1), `Utility` (1), `Elasticity` (1)

</details>

### Link noise (42)

Targets that name no concept. The fix is to unlink them (in `scripts/syllabus_write.py`'s linker), not to write pages.

<details><summary>Show the list</summary>

`United State` (9), `Data` (6), `Pricing` (5), `Business` (4), `Strategy` (2), `International Viewpoint` (1), `Successful Risk` (1), `Third Party` (1), `Creation` (1), `Quantitative` (1), `Making Suboptimal Individual` (1), `Complex Component` (1), `Output` (1), `Financial Business` (1), `Global Reinsurance Market` (1), `Global Jurisdiction` (1), `Portfolio's Exposure` (1), `Establish` (1), `Fundamental` (1), `Need` (1), `Context` (1), `Output Address` (1), `Process` (1), `Product's` (1), `Claim Data` (1), `Study` (1), `Traditional Actuarial Practice` (1), `Frame` (1), `Qualitative` (1), `Future Cost` (1), `Real-Life Scenario` (1), `Captive` (1), `Syllabus Resource` (1), `Employers Liability Insurance Policy Address` (1), `Regulatory Activity` (1), `Portfolio Level` (1), `Individual Security` (1), `Future` (1), `Derivative` (1), `Labor Force Demographics` (1), `Appropriateness` (1), `Plan` (1)

</details>

### Missing resource pages (0)

Linked only from a Source Material shelf — a `Resources/Books/` reading, written to `docs/resource-pages.md` from the real document, not a concept page. Out of scope for this plan.

<details><summary>Show the list</summary>


</details>

### Secondary list — stub concept pages (21)

Nearly empty (under 40 words of prose); or under 100 words and missing a part of the definition → formula → worked example shape; or linked from a guide, under 250 words and with no worked example. Sorted by inbound guide links.

| Page | Words | Missing | Inbound guide links |
|---|---|---|---|
| `Decision-Making` | 120 | formula, example | 14 |
| `Capital` | 27 | definition, formula, example | 8 |
| `Constraint` | 26 | definition, formula, example | 7 |
| `Fellow of the Society of Actuaries (FSA)` | 236 | formula, example | 4 |
| `Catastrophe Modelling` | 160 | definition, formula, example | 3 |
| `Canadian Institute of Actuaries (CIA)` | 0 | definition, formula, example | 1 |
| `Credit` | 0 | definition, formula, example | 1 |
| `Pension` | 0 | definition, formula, example | 1 |
| `Accuracy and Precision` | 0 | definition, formula, example | 0 |
| `Alignment` | 0 | definition, formula, example | 0 |
| `Qualitative Risk Analysis` | 0 | definition, formula, example | 0 |
| `Risk Aware Culture` | 0 | definition, formula, example | 0 |
| `Risk-Informed Decision Making (RIDM)` | 0 | definition, formula, example | 0 |
| `VIN Fraud` | 0 | definition, formula, example | 0 |
| `Probability Addition Rules` | 20 | example | 0 |
| `Set Theory and Venn Diagrams` | 39 | definition, formula, example | 0 |
| `Climate Change` | 45 | definition, formula, example | 0 |
| `Poset` | 67 | definition, example | 0 |
| `Catastrophe Modelling Framework` | 69 | definition, formula, example | 0 |
| `Risk as a Commodity` | 89 | definition, formula, example | 0 |
| `Agent` | 92 | formula, example | 0 |

<!-- gaps:end -->
