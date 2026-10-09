# Concept gaps plan

The concept pages the study guides link to that don't exist yet: found, ranked, and cut into
batches to write. **Status: Phase A (batches 1–7) done — 44 pages written, 7 targets aliased to
existing pages, study guides re-rendered. Phase B reviewed and planned (§8) with one example
page written; plan and example approved 2026-10-09. Phase B done (§9): 80 pages, 147 aliases,
13 noise targets. Phase C plan and example approved 2026-10-09; Phase C done (§11): 69 pages, 160 aliases, 5 namesakes, 12 noise targets, `Total Risk` left. Next: Phase D (Tier 3), awaiting go-ahead.**

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

<!-- gaps:begin -->

_Generated by `python3 scripts/find_concept_gaps.py --update-plan`. Do not edit between the markers._

### Summary — where every link on the study guides goes

| Bucket | Distinct targets | Links |
|---|---|---|
| Resolve exactly (Obsidian and the app) | | 3,383 |
| Resolve only case-insensitively (Obsidian yes, app no) | | 0 |
| Resolve through a frontmatter `aliases:` | | 5 |
| **Concepts to write** (tiered and batched below) | **472** | 507 |
| Variant spelling of an existing page — link fix | 13 | 21 |
| Cut short — the link plus its next words names an existing page | 41 | 82 |
| Link noise — names no concept (`Cannot`, `Differ Compared`) | 261 | 625 |
| One-word target, not a term of art — triage | 175 | 410 |
| Ambiguous — needs your decision | 68 | 132 |
| Missing reading — `Resources/Books/`, Source Material only | 632 | 670 |
| **Total** | | **5,835** |

Within the concepts to write: 2 duplicate spellings merged (+1 acronyms, +13 fragments). Tier 1 / 2 / 3: **0 / 1 / 471**, in **100 batches** (48 done). Existing concept pages that are stubs: **22**.

### Missing concepts by exam

A concept linked from several exams counts once under each.

| Exam | Stage | Tier 1 | Tier 2 | Tier 3 | Total |
|---|---|---|---|---|---|
| INV-201 (SOA) | development | 0 | 0 | 49 | 49 |
| RET-101 (SOA) | development | 0 | 0 | 41 | 41 |
| GH-301 (SOA) | development | 0 | 0 | 27 | 27 |
| GI-201 (SOA) | development | 0 | 0 | 25 | 25 |
| ILA-101 (SOA) | development | 0 | 0 | 25 | 25 |
| GI-101 (SOA) | development | 0 | 0 | 24 | 24 |
| INV-101 (SOA) | development | 0 | 0 | 24 | 24 |
| CP-321 (SOA) | development | 0 | 0 | 22 | 22 |
| DISC-IA (CAS) | development | 0 | 0 | 21 | 21 |
| CFE-101 (SOA) | development | 0 | 0 | 20 | 20 |
| CP-341 (SOA) | development | 0 | 0 | 20 | 20 |
| CP-311 (SOA) | development | 0 | 0 | 19 | 19 |
| GI-302 (SOA) | development | 0 | 0 | 18 | 18 |
| CFE-201 (SOA) | development | 0 | 0 | 16 | 16 |
| CP-351 (SOA) | development | 0 | 0 | 15 | 15 |
| DISC-RM (CAS) | development | 0 | 0 | 15 | 15 |
| GH-101 (SOA) | development | 0 | 1 | 12 | 13 |
| RET-201 (SOA) | development | 0 | 0 | 13 | 13 |
| RET-301 (SOA) | development | 0 | 0 | 12 | 12 |
| DISC-DA (CAS) | development | 0 | 0 | 11 | 11 |
| CP-312 (SOA) | development | 0 | 0 | 10 | 10 |
| GI-301 (SOA) | development | 0 | 0 | 9 | 9 |
| GH-201U (SOA) | development | 0 | 0 | 8 | 8 |
| GH-201C (SOA) | development | 0 | 0 | 6 | 6 |
| ILA-201I (SOA) | development | 0 | 0 | 6 | 6 |
| ILA-201U (SOA) | development | 0 | 0 | 3 | 3 |

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
- **Batch 50** (Tier 3, to do) · Short-term insurance (P&C, general) (DISC-IA (CAS) › 12. Specialty Coverages Part 1; DISC-IA (CAS) › 13. Specialty Coverages Part 2) · 10 concepts: `Professional Liability Insurance` ✓, `Directors and Officers Liability Insurance`, `Employment Practices Liability Insurance`, `Environmental Insurance`, `Fiduciary Liability Insurance`, `International Insurance`, `Aircraft Insurance`, `Cyber Insurance`, `Terrorism Risk Insurance Program`, `Intentional Tort`
- **Batch 51** (Tier 3, to do) · Short-term insurance (P&C, general) (DISC-IA (CAS) › 3. Common Policy Concepts; DISC-IA (CAS) › 14. Insurance Law Part 1) · 10 concepts: `Negligence`, `Premises Liability`, `Products Liability`, `Strict Liability`, `Insurable Risk`, `Compensatory Damages`, `Loss Settlement Provisions`, `Actual Cash Value`, `Medical Payments Coverage`, `Health Insurance Plans`
- **Batch 52** (Tier 3, to do) · Short-term insurance (P&C, general) (DISC-RM (CAS) › 10. Underwriting Business Income and Commercial Liability Coverage; DISC-IA (CAS) › 9. Commercial Property Insurance Part 2) · 10 concepts: `Term Life Insurance` ✓, `Blanket Insurance`, `Common Policy Conditions`, `Period of Restoration`, `Commercial Crime Insurance`, `Premises and Operations Liability`, `Products and Completed Operations Liability`, `Business Auto Coverage`, `SWOT Analysis`, `Business Continuity Management`
- **Batch 53** (Tier 3, to do) · Short-term insurance (P&C, general) (DISC-RM (CAS) › 6. Overview of Insurance Operations; DISC-RM (CAS) › 7. Insurance Marketing and Distribution) · 10 concepts: `Organizational Resilience`, `Insurer Goals and Constraints`, `Insurtech`, `Types of Insurers`, `Insurance Distribution Systems`, `Insurance Marketing`, `Underwriting Policy`, `Underwriting Authority`, `Conduct Investigative Testing`, `Funding Requirement`
- **Batch 54** (Tier 3, to do) · Short-term insurance (P&C, general) (GI-101 (SOA) › Introduction and Key Considerations; GI-101 (SOA) › Preparing Claims and Exposure Data for Actuarial Work) · 10 concepts: `Real-Life Scenario`, `Self-Insurer`, `Professional Judgment`, `Actuary's Responsibility`, `Professionalism Requirement`, `Qualitative Information Required`, `Earnings Pattern`, `Ultimate Premium`, `Claim Transaction Data`, `Influencing Average Premium Level`
- **Batch 55** (Tier 3, to do) · Short-term insurance (P&C, general) (GI-101 (SOA) › Projecting Ultimate Claims; GI-101 (SOA) › Ratemaking) · 10 concepts: `Data Triangle`, `Required Data`, `Case Estimate`, `Development-Based Frequency-Severity`, `Generalized Cape Cod`, `Projected Ultimate Value`, `Varying Circumstance`, `Contingency Margin`, `Expenses Required`, `Expense Trending`
- **Batch 56** (Tier 3, to do) · Short-term insurance (P&C, general) (GI-201 (SOA) › General Insurance Company Operations; GI-201 (SOA) › Financial Economics) · 10 concepts: `Fundamental Ratemaking`, `Inflation-Sensitive Exposure`, `Behavioral Finance`, `Asset Liability Management Strategy` ✓, `Underwriting Profit Margin` ✓, `EU Solvency II Capital Requirement`, `Claim Handling Process`, `Insurer Risk`, `International Business`, `Peril`
- **Batch 57** (Tier 3, to do) · Short-term insurance (P&C, general) (GI-201 (SOA) › Legal Environment; GI-201 (SOA) › General Insurance Company Operations) · 10 concepts: `Pricing General Insurance Policy`, `Risk Mitigation Instrument`, `Insurance Law`, `Social Inflation`, `International Legal Environment`, `Legal Cases-issues Included`, `Mass Torts-class Action Suit`, `Syllabus Resource`, `Tort Law Environment`, `Tort Trend`
- **Batch 58** (Tier 3, to do) · Short-term insurance (P&C, general) (GI-201 (SOA) › Regulatory Environment; GI-201 (SOA) › Responsibilities of the Actuary) · 10 concepts: `Transnational Tort Litigation`, `Collective Insurance Industry Organization`, `Insolvency Regulation`, `Insurance Programs Controlled`, `Telematics`, `Insurance Actuarial Opinion`, `International Actuarial Association`, `Professionalism Principle`, `Professionalism Required`, `Catastrophe Modeling Output`
- **Batch 59** (Tier 3, to do) · Short-term insurance (P&C, general) (GI-301 (SOA) › Stochastic Reserving; GI-301 (SOA) › Reinsurance) · 10 concepts: `Property Catastrophe Risk Load` ✓, `Insurance Premium Liability` ✓, `Pricing Property Catastrophe Cover`, `Risk Transfer Testing`, `Claims-Made Contract`, `Increased Limit Option`, `Chain Ladder Estimator`, `Parametric Estimator`, `Reserve Variability`, `Stochastic Loss Development`
- **Batch 60** (Tier 3, to do) · Short-term insurance (P&C, general) (GI-302 (SOA) › U.S. General Insurance Products and Coverages; GI-302 (SOA) › Responsibilities of a U.S. Signing General Insurance Actuary) · 10 concepts: `Applicable Standard` ✓, `Signing Actuary`, `Signing General Insurance Actuary`, `NAIC Annual Statement Pages-schedule`, `NAIC RBC`, `Statutory Financial Statement`, `Cyber Risk`, `Premium Basis`, `Commercial Auto Insurance`, `Employers Liability Insurance`
- **Batch 61** (Tier 3, to do) · Short-term insurance (P&C, general) (GI-302 (SOA) › U.S. General Insurance Products and Coverages; GI-302 (SOA) › U.S. General Insurance Regulation) · 13 concepts: `Excess Liability` ✓, `ISO Commercial Automobile Policy`, `ISO Commercial Property` ✓, `ISO Homeowner` ✓, `ISO Personal Auto Policy` ✓, `ISO WC`, `Specialty Insurance Coverage`, `Surety`, `Insurance Department`, `Insurance Commissioners' Duty`, `Insurance Personnel`, `Licensing Requirement`, `Regulatory Body`
- **Batch 62** (Tier 3, to do) · Financial economics and investments (CP-351 (SOA) › Measuring Risks from Assets and Liabilities; CP-351 (SOA) › Objectives of Asset Liability Management) · 10 concepts: `Long-Tail Liability`, `Portfolio's Exposure`, `Regulatory Capital Adequacy`, `Risk Identification Tool`, `ALM Failure`, `Insurance Contracts Generate Embedded Option`, `Lessons Learned`, `ALM Risk`, `ALM Context`, `Asset Allocation Strategy`
- **Batch 63** (Tier 3, to do) · Financial economics and investments (CP-351 (SOA) › Tools and Strategies to Manage ALM Risks; INV-101 (SOA) › Asset Classes) · 10 concepts: `Extreme ALM Event`, `Interest Rate Derivative`, `Liability Profile`, `Long-Tail Insurance Liability`, `Transferring Risk`, `Asset Class`, `Corporate Bond`, `Hedge Fund`, `Mortgage-backed Security`, `Distinguishing Investment`
- **Batch 64** (Tier 3, to do) · Financial economics and investments (INV-101 (SOA) › Asset Classes; INV-101 (SOA) › Credit Risk Management) · 10 concepts: `Leveraged Loan`, `Private Debt`, `Public Equity`, `Residential Mortgage`, `Structured Credit Product`, `Individual Security`, `Credit Risk Modeling`, `Portfolio Level`, `Passive Strategy`, `Institutional Investor`
- **Batch 65** (Tier 3, to do) · Financial economics and investments (INV-101 (SOA) › Portfolio Construction, Management, and Assessment) · 10 concepts: `Fixed Income Investment`, `Asset Benchmark`, `Enhance Yield`, `Fixed Income Portfolio`, `Investment Governance Structure`, `Investment Policy Statement` ✓, `Liquidity`, `Optimal Portfolio Allocation`, `Performance Attribution Metrics`, `Portfolio Management Process`
- **Batch 66** (Tier 3, to do) · Financial economics and investments (INV-201 (SOA) › Applications and Risks of Derivatives) · 10 concepts: `Operational Failure`, `Cross Greek`, `Dynamic Hedging`, `Fund Performance`, `Guarantee Cost`, `Hedge Strategy`, `Implied Volatility`, `Indexed Annuity`, `Partially Hedged`, `Structured Product`
- **Batch 67** (Tier 3, to do) · Financial economics and investments (INV-201 (SOA) › Key Types of Derivatives; INV-201 (SOA) › Applications and Risks of Derivatives) · 10 concepts: `Target Volatility Fund`, `Variable Annuity Guarantee Rider`, `Asian Option`, `Butterfly Spread`, `Call Spread`, `Central Clearing`, `Collar`, `Daily Margin Variation`, `Daily Settle`, `Derivative Instrument`
- **Batch 68** (Tier 3, to do) · Financial economics and investments (INV-201 (SOA) › Key Types of Derivatives; INV-201 (SOA) › Valuation of Derivatives) · 10 concepts: `Derivatives Strategy`, `Derivatives Trading`, `Exchange Traded`, `Exotic Option`, `Floor`, `Put Spread`, `Straddle`, `Strangle`, `Swaption`, `Arrow-Debreau Security`
- **Batch 69** (Tier 3, to do) · Financial economics and investments (INV-201 (SOA) › Valuation of Derivatives) · 10 concepts: `Black-Scholes-Merton` ✓, `Euler-Maruyama Discretization`, `Girsanov's Theorem`, `Incomplete Market`, `Isometry`, `Jump-Diffusion`, `Local- Volatility`, `Martingale`, `Modeling Smile`, `No-Arbitrage`
- **Batch 70** (Tier 3, to do) · Financial economics and investments (INV-201 (SOA) › Valuation of Derivatives) · 10 concepts: `Numeraire`, `Numerical Discretization`, `Observed Price`, `Pricing Derivative`, `Stochastic Calculus Theory`, `Stochastic Differential Equation`, `Stochastic Volatility`, `Traded Security`, `Transition Density`, `Volatility Smile`
- **Batch 71** (Tier 3, to do) · ERM and corporate finance (CFE-101 (SOA) › Embedding ERM into Decision-Making) · 10 concepts: `Capital Assessment`, `Marginal Capital`, `Non-Financial Risk`, `Return Trade-Off`, `Gauge Performance`, `Organization's Risk Profile`, `Organizational Process`, `Risk Capital Once Aggregated`, `Risk Once Aggregated`, `Risk Strategy`
- **Batch 72** (Tier 3, to do) · ERM and corporate finance (CFE-101 (SOA) › Risk Analysis and Evaluation; CFE-101 (SOA) › Enterprise Risk Management Foundations) · 10 concepts: `Risk-capital Strategy`, `External Environment`, `Market Conduct Compliance Activity`, `Emerging Risk`, `Risk Accumulation`, `Compounding Risk`, `Contagion-Related Risk`, `Easily Quantifiable`, `Monitoring Mechanism`, `Risk Aggregation`
- **Batch 73** (Tier 3, to do) · ERM and corporate finance (CFE-201 (SOA) › Corporate Finance; CFE-201 (SOA) › Financial Statement Analysis) · 10 concepts: `Optimal Capital Structure`, `Capital Budgeting`, `Competitive Environment`, `Corporate Finance`, `Divestiture`, `Organization Optimiz`, `Evolving Quantitative`, `Foreign Exchange Rate`, `Financial Metrics`, `Organization's Performance`
- **Batch 74** (Tier 3, to do) · ERM and corporate finance (CFE-201 (SOA) › Managerial Accounting and Operational Excellence; CP-311 (SOA) › Introduction to Strategic Management) · 10 concepts: `Reported Financial Statement`, `Business Process`, `Distort Perceived Performance`, `Drive Decision Making`, `Operational Excellence`, `Operational Process`, `Uncertain Condition`, `Business Environment`, `Business-Level Strategy`, `Competitive Dynamics`
- **Batch 75** (Tier 3, to do) · ERM and corporate finance (CP-311 (SOA) › Introduction to Strategic Management; CP-311 (SOA) › Organizational Behavior) · 10 concepts: `Corporate-Level Strategy`, `External-inorganic Growth Strategy`, `Market Opportunity`, `Organization's Business Strategy`, `Cognitive Biase`, `Making Suboptimal Individual`, `Organizational Behavior Plays`, `Organizational Decision-Making`, `Sustainable Growth`, `Effective Strategic Budgeting`
- **Batch 76** (Tier 3, to do) · ERM and corporate finance (CP-311 (SOA) › Strategic Budgeting, Forecasting, and Value Measures) · 5 concepts: `Financial Budgeting`, `Forecasting Decision Making Process`, `Organization's Initiative`, `Organization's Strategic`, `Tracking Progress`
- **Batch 77** (Tier 3, to do) · Health (CP-321 (SOA) › Manual Rates; CP-321 (SOA) › Asset Adequacy) · 10 concepts: `Asset Adequacy Standard`, `Asset Matching`, `Cash Flow Projection`, `Mismatched Asset`, `IFRS 17, US GAAP`, `Data Credibility`, `Base Rate Development`, `Commission`, `Guaranty Association`, `Long Term Care Rate Increase`
- **Batch 78** (Tier 3, to do) · Health (CP-321 (SOA) › Reserving; CP-321 (SOA) › Plan and Product Provisions) · 10 concepts: `Properly Modelling`, `Critical Illness`, `Medicare Supplement`, `Social Security Disability Income Benefit`, `Policy Reserve`, `Appliable Best Practice` ✓, `Non-Claim Reserves Held`, `Premium Deficiency Reserve`, `Employers Offer Retiree Group Benefit`, `Life Plan Design`
- **Batch 79** (Tier 3, to do) · Health (GH-101 (SOA) › Plan and Product Provisions; CP-321 (SOA) › Retiree Group Benefits) · 10 concepts: `Post-Employment Benefit Plan`, `Retiree Health Valuation`, `Service Cost`, `Employee Benefit Plan`, `Employee Benefit Strategy`, `Medical Cost Trend Experience`, `Plan Provision`, `Prescription Drug`, `Product Development Process`, `Short Duration Contract`
- **Batch 80** (Tier 3, to do) · Health (GH-101 (SOA) › Underwriting and Funding; GH-201C (SOA) › Financial Statements) · 10 concepts: `Case-Specific Pricing`, `Claim Credibility`, `Pooling`, `Risk Assessment Mechanism`, `Underwriting Situation`, `Health Insurance Company`, `Taxable Income`, `Insurer Financial Statement`, `International Financial Reporting Standard`, `Canadian Health Care System`
- **Batch 81** (Tier 3, to do) · Health (GH-201U (SOA) › Government Programs; GH-201C (SOA) › Government Programs) · 10 concepts: `Private Group Insurance Plan`, `Capital Strain`, `Canadian Healthcare System`, `Affordable Care Act`, `Filing Requirement`, `Government Programs Providing Health Benefit`, `Medicaid Program Structure`, `Medicare Benefit`, `Short Duration Group`, `Actuarially Adjusted`
- **Batch 82** (Tier 3, to do) · Health (GH-301 (SOA) › Disease Management; GH-301 (SOA) › Healthcare Risk Adjustment1) · 10 concepts: `Healthcare Intervention`, `Non-Chronic Trend`, `Reflects Patient Risk`, `Utilization Rate`, `ACA Product`, `Care Management Situation`, `Normalize Population Claims Experience`, `Multiple Data`, `Coding Set`, `Clinical Policy Bulletin`
- **Batch 83** (Tier 3, to do) · Health (GH-301 (SOA) › Medical Data; GH-301 (SOA) › Predictive Analytics) · 10 concepts: `Coding Structure`, `Medical Coding`, `Private Data`, `Revenue Code`, `Healthcare Data`, `Healthcare Claim`, `Risk Score`, `Provider Reimbursement` ✓, `Accountable Care Organization`, `Provider Payment`
- **Batch 84** (Tier 3, to do) · Health (GH-301 (SOA) › Social Determinants of Health; GH-301 (SOA) › Provider Contracting and Reimbursement) · 7 concepts: `Quality Perspective`, `Quality Viewpoint`, `Standard Contracting`, `Health Care Cost`, `Social Determinant`, `SDOH Derived Statistics`, `Traditional Actuarial Practice`
- **Batch 85** (Tier 3, to do) · Retirement (RET-101 (SOA) › Benefit Plan Design Recommendation) · 10 concepts: `Plan Design Feature`, `Retirement Risk`, `Sponsor's Plan`, `Employee Perspective`, `Introducing Option`, `Investment Risk Applicable`, `Labor Force Demographics`, `Plan Sponsor's Particular`, `Promote Employee Behavior Consistent`, `Retirement Plan Design`
- **Batch 86** (Tier 3, to do) · Retirement (RET-101 (SOA) › Benefit Plan Structure, Features and Investments; RET-101 (SOA) › Benefit Plan Design Recommendation) · 10 concepts: `Tax Incentive`, `Taxpayers' Perspective`, `Investment Vehicle`, `Payment Option`, `Providing Retirement Benefit`, `Retirement Fund Asset`, `Ancillary Benefit`, `Benefit Eligibility Requirement`, `Benefit Subsidy`, `Contribution Formula`
- **Batch 87** (Tier 3, to do) · Retirement (RET-101 (SOA) › Benefit Plan Structure, Features and Investments) · 10 concepts: `Executive Retirement Plan`, `Hybrid Plan`, `Late Retirement Option`, `Optional Employee Contribution`, `Participant Investment Option`, `Plan Eligibility Requirement`, `Retirement Plan Asset`, `Shared Risk Plan`, `Target Benefit Plan`, `Vesting`
- **Batch 88** (Tier 3, to do) · Retirement (RET-101 (SOA) › Participant Risks; RET-101 (SOA) › Sponsor Risks) · 10 concepts: `Benefit Adequacy`, `Public Sector Employer`, `Replacement Income`, `Retirement Plans Sponsored`, `Single Employer Sponsored Retirement Plan`, `Social Insurance Plan`, `Early Retirement`, `Decumulation Feature`, `Optional Form`, `Portability Option`
- **Batch 89** (Tier 3, to do) · Retirement (RET-201 (SOA) › Methods; RET-201 (SOA) › Accounting Standards) · 10 concepts: `Postponed Retirement`, `Termination-windup` ✓, `Plan Curtailment`, `Pension Valuation`, `Cost Recognition`, `Cost Stability`, `Pension Benefit`, `Periodic Valuation`, `Cash Flow Requirement`, `Plan Sponsor Risk`
- **Batch 90** (Tier 3, to do) · Retirement (RET-201 (SOA) › Valuations for the Purpose of Funding; RET-301 (SOA) › Methods) · 10 concepts: `Funding Policy`, `Government-sponsored Plan`, `Multi-employer Plan` ✓, `Plan Asset Composition`, `Principles Applicable` ✓, `Single-employer Plan`, `Stakeholders' Interest`, `Asset Transfer`, `Going Concern Funding` ✓, `Government Regulation`
- **Batch 91** (Tier 3, to do) · Retirement (RET-301 (SOA) › Regulations: Evaluation and Application; RET-301 (SOA) › Regulations: Plan Funding) · 11 concepts: `Individual Savings Plan`, `Members' Right`, `Plan Amendment`, `Plan Establishment`, `Plan Termination-wind-Up` ✓, `Registered Retirement Plan`, `Reporting Requirement`, `Tax Regulation Pertaining`, `Funding Restrictions Imposed`, `Pension Plan Funding`, `Retirement Funding Alternative`
- **Batch 92** (Tier 3, to do) · Long-term insurance (life, annuities) (CP-312 (SOA) › Cash Flow Models for Long-Term Insurance Business; CP-312 (SOA) › Model Governance) · 10 concepts: `Complex Component`, `Dynamic Policyholder`, `Equity-Linked Guarantee`, `Index-Linked Credit`, `Long-Term Insurance Business`, `Governance Best Practice`, `Governance Documentation`, `Organizational Structure`, `Economic Scenario Generator`, `Financial Business`
- **Batch 93** (Tier 3, to do) · Long-term insurance (life, annuities) (CP-341 (SOA) › Key Accounting and Regulatory Considerations; CP-341 (SOA) › Reinsurance Administration and Management) · 10 concepts: `OSFI Requirement`, `Reinsurance Requirement`, `Canadian Regulatory`, `Global Jurisdiction`, `International Reinsurance Regulatory Framework`, `Private Equity Backed Reinsurer`, `US Stat Requirement`, `Reinsurance Administration`, `Reinsurance Counterparty Credit Risk`, `Captive Reinsurance Transaction`
- **Batch 94** (Tier 3, to do) · Long-term insurance (life, annuities) (CP-341 (SOA) › Types of Reinsurance Arrangements and Methods; CP-341 (SOA) › Transferring Risk) · 10 concepts: `Reinsurance Agreement Provision`, `Inforce Reinsurance`, `Offshore Reinsurance`, `Advanced Reinsurance Transaction`, `Annuity Coinsurance`, `Global Reinsurance Market`, `Life Insurance Yearly Renewable Term`, `Non-Proportional Reinsurance Transaction`, `PRTs-longevity Swap`, `Private Equity Involvement`
- **Batch 95** (Tier 3, to do) · Long-term insurance (life, annuities) (ILA-101 (SOA) › Individual Life and Annuity Product Design and Pricing; ILA-101 (SOA) › Assumption Development and Experience Studies) · 10 concepts: `Experience Study` ✓, `Modern Mortality Table`, `Premium Persistency`, `Term Conversion`, `Annuity Product Design`, `Common Profit Metrics`, `Nonforfeiture`, `Pricing Insurance Product`, `Pricing Practice`, `Annuity Context`
- **Batch 96** (Tier 3, to do) · Long-term insurance (life, annuities) (ILA-101 (SOA) › Introduction to Assets and Risk Management; ILA-101 (SOA) › Introduction to Life and Annuity Valuation Concepts) · 10 concepts: `Annuity Liability`, `Common Insurance Guarantees Generate Embedded Option`, `Duration-convexity Matching`, `Integrating ALM`, `Life Insurance Reinsurance Arrangement`, `Segmentation`, `Deferred Acquisition Cost`, `International Regulatory Framework`, `Life Insurance Reserve`, `Term Insurance Reserve`
- **Batch 97** (Tier 3, to do) · Long-term insurance (life, annuities) (ILA-101 (SOA) › Product Management; ILA-201I (SOA) › Advanced Product Management) · 10 concepts: `Rising Interest Rate Environment`, `Annuity Distribution`, `Annuity Insurance Product`, `Canadian Tax Regulation`, `Challenges Insurers Face`, `Corporate Taxation`, `Investment Income Tax`, `Policyholder Taxation`, `International Capital Requirement`, `International Framework`
- **Batch 98** (Tier 3, to do) · Long-term insurance (life, annuities) (ILA-201I (SOA) › International Financial Reporting Requirements; ILA-201U (SOA) › Advanced Product Management) · 4 concepts: `International Life Insurance Company`, `US Company Tax Rule`, `Crediting Rating Agency Framework`, `Formulaic Reserve`
- **Batch 99** (Tier 3, to do) · Statistics and predictive analytics (DISC-DA (CAS) › 3. Preparing Data for Analysis; DISC-DA (CAS) › 1. Planning an Insurer Data Modeling Project) · 11 concepts: `Data Documentation`, `Data Ethics`, `Statistical Plan`, `Data Mart`, `Data Validation`, `Database Index`, `Table Join`, `User-Defined Function`, `Web Scraping`, `Structured Data`, `Data Preparation`
- **Batch 100** (Tier 3, to do) · Long-term insurance (life, annuities) (ILA-101 (SOA) › Introduction to Life and Annuity Valuation Concepts) · 1 concepts: `Common Valuation`

### Tier 2 — frequently linked, exam-relevant (1)

| # | Concept (canonical filename) | Aliases | Links (guides) | Qs tagged / mentioned | Weight | Exam(s) | Linked from | Depends on | Score |
|---|---|---|---|---|---|---|---|---|---|
| 1 | `Concepts/Total Risk.md` | — | 1 (1) | 0 / 8 | 15% | GH-101 (SOA) | GH-101 (SOA) › Underwriting and Funding | — | 6.05 |

### Tier 3 — niche or single-link (471)

<details><summary>Show the table</summary>

| # | Concept (canonical filename) | Aliases | Links (guides) | Qs tagged / mentioned | Weight | Exam(s) | Linked from | Depends on | Score |
|---|---|---|---|---|---|---|---|---|---|
| 1 | `Concepts/Data Triangle.md` | — | 1 (1) | 0 / 2 | 22% | GI-101 (SOA) | GI-101 (SOA) › Projecting Ultimate Claims | — | 5.4 |
| 2 | `Concepts/Passive Strategy.md` | — | 1 (1) | 0 / 2 | 19% | INV-101 (SOA) | INV-101 (SOA) › Portfolio Construction, Management, and Assessment | — | 5.23 |
| 3 | `Concepts/Sustainable Growth.md` | — | 2 (1) | 0 / 1 | 17% | CP-311 (SOA) | CP-311 (SOA) › Strategic Budgeting, Forecasting, and Value Measures | — | 5.09 |
| 4 | `Concepts/Capital Assessment.md` | — | 2 (1) | 0 / 1 | 17% | CFE-101 (SOA) | CFE-101 (SOA) › Embedding ERM into Decision-Making | — | 5.08 |
| 5 | `Concepts/Marginal Capital.md` | — | 1 (1) | 0 / 2 | 17% | CFE-101 (SOA) | CFE-101 (SOA) › Embedding ERM into Decision-Making | — | 5.08 |
| 6 | `Concepts/Required Data.md` | — | 1 (1) | 0 / 1 | 22% | GI-101 (SOA) | GI-101 (SOA) › Projecting Ultimate Claims | — | 5.0 |
| 7 | `Concepts/Asset Class.md` | — | 1 (1) | 0 / 2 | 15% | INV-101 (SOA) | INV-101 (SOA) › Asset Classes | — | 4.96 |
| 8 | `Concepts/Corporate Bond.md` | — | 1 (1) | 0 / 2 | 15% | INV-101 (SOA) | INV-101 (SOA) › Asset Classes | — | 4.96 |
| 9 | `Concepts/Emerging Risk.md` | — | 2 (1) | 0 / 1 | 14% | CFE-101 (SOA) | CFE-101 (SOA) › Risk Analysis and Evaluation | — | 4.92 |
| 10 | `Concepts/Capital Strain.md` | — | 1 (1) | 0 / 2 | 14% | GH-201U (SOA) | GH-201U (SOA) › Financial Statements | — | 4.89 |
| 11 | `Concepts/Foreign Exchange Rate.md` | — | 1 (1) | 0 / 2 | 13% | CFE-201 (SOA) | CFE-201 (SOA) › Financial Statement Analysis | — | 4.83 |
| 12 | `Concepts/Health Insurance Company.md` | — | 2 (1) | 0 / 1 | 12% | GH-201C (SOA) | GH-201C (SOA) › Financial Statements | — | 4.82 |
| 13 | `Concepts/Institutional Investor.md` | — | 1 (1) | 0 / 1 | 19% | INV-101 (SOA) | INV-101 (SOA) › Portfolio Construction, Management, and Assessment | — | 4.82 |
| 14 | `Concepts/Investment Vehicle.md` | — | 1 (1) | 0 / 1 | 18% | RET-101 (SOA) | RET-101 (SOA) › Benefit Plan Structure, Features and Investments | — | 4.75 |
| 15 | `Concepts/Operational Failure.md` | — | 1 (1) | 0 / 1 | 18% | INV-201 (SOA) | INV-201 (SOA) › Applications and Risks of Derivatives | — | 4.75 |
| 16 | `Concepts/Payment Option.md` | — | 1 (1) | 0 / 1 | 18% | RET-101 (SOA) | RET-101 (SOA) › Benefit Plan Structure, Features and Investments | — | 4.75 |
| 17 | `Concepts/ALM Risk.md` | — | 2 (1) | 0 / 0 | 22% | CP-351 (SOA) | CP-351 (SOA) › Objectives of Asset Liability Management; CP-351 (SOA) › Tools and Strategies to Manage ALM Risks | — | 4.73 |
| 18 | `Concepts/Economic Scenario Generator.md` | — | 1 (1) | 0 / 1 | 17% | CP-312 (SOA) | CP-312 (SOA) › Other types of Models for Financial Business | — | 4.69 |
| 19 | `Concepts/Non-Financial Risk.md` | — | 1 (1) | 0 / 1 | 17% | CFE-101 (SOA) | CFE-101 (SOA) › Embedding ERM into Decision-Making | — | 4.67 |
| 20 | `Concepts/Insurance Law.md` | — | 2 (1) | 0 / 1 | 9% | GI-201 (SOA) | GI-201 (SOA) › Legal Environment | — | 4.62 |
| 21 | `Concepts/Social Inflation.md` | — | 1 (1) | 0 / 2 | 9% | GI-201 (SOA) | GI-201 (SOA) › Legal Environment | — | 4.62 |
| 22 | `Concepts/International Life Insurance Company.md` | — | 2 (1) | 0 / 0 | 20% | ILA-201I (SOA) | ILA-201I (SOA) › Capital Management; ILA-201I (SOA) › International Financial Reporting Requirements | — | 4.6 |
| 23 | `Concepts/Hedge Fund.md` | — | 1 (1) | 0 / 1 | 15% | INV-101 (SOA) | INV-101 (SOA) › Asset Classes | — | 4.55 |
| 24 | `Concepts/Mortgage-backed Security.md` | — | 1 (1) | 0 / 1 | 15% | INV-101 (SOA) | INV-101 (SOA) › Asset Classes | — | 4.55 |
| 25 | `Concepts/OSFI Requirement.md` | — | 1 (1) | 0 / 1 | 15% | CP-341 (SOA) | CP-341 (SOA) › Key Accounting and Regulatory Considerations | — | 4.55 |
| 26 | `Concepts/Fixed Income Investment.md` | — | 2 (1) | 0 / 0 | 19% | INV-101 (SOA) | INV-101 (SOA) › Asset Classes; INV-101 (SOA) › Portfolio Construction, Management, and Assessment | — | 4.53 |
| 27 | `Concepts/Risk Accumulation.md` | — | 1 (1) | 0 / 1 | 14% | CFE-101 (SOA) | CFE-101 (SOA) › Risk Analysis and Evaluation | — | 4.51 |
| 28 | `Concepts/Compensatory Damages.md` | — | 2 (1) | 0 / 2 | — | DISC-IA (CAS) | DISC-IA (CAS) › 15. Insurance Law Part 2; DISC-IA (CAS) › 3. Common Policy Concepts | — | 4.48 |
| 29 | `Concepts/Data Credibility.md` | — | 1 (1) | 0 / 1 | 14% | CP-321 (SOA) | CP-321 (SOA) › Manual Rates | — | 4.48 |
| 30 | `Concepts/Plan Provision.md` | — | 1 (1) | 0 / 2 | 7% | GH-101 (SOA) | GH-101 (SOA) › Plan and Product Provisions | — | 4.48 |
| 31 | `Concepts/Formulaic Reserve.md` | — | 1 (1) | 0 / 0 | 25% | ILA-201U (SOA) | ILA-201U (SOA) › U.S. Financial Reporting Requirements | — | 4.46 |
| 32 | `Concepts/Providing Retirement Benefit.md` | — | 2 (1) | 0 / 0 | 18% | RET-101 (SOA) | RET-101 (SOA) › Benefit Plan Design Recommendation; RET-101 (SOA) › Benefit Plan Structure, Features and Investments | — | 4.46 |
| 33 | `Concepts/Retirement Fund Asset.md` | — | 2 (1) | 0 / 0 | 18% | RET-101 (SOA) | RET-101 (SOA) › Benefit Plan Design Recommendation; RET-101 (SOA) › Benefit Plan Structure, Features and Investments | — | 4.46 |
| 34 | `Concepts/Earnings Pattern.md` | — | 1 (1) | 0 / 2 | 6% | GI-101 (SOA) | GI-101 (SOA) › Preparing Claims and Exposure Data for Actuarial Work | — | 4.43 |
| 35 | `Concepts/Financial Metrics.md` | — | 1 (1) | 0 / 1 | 13% | CFE-201 (SOA) | CFE-201 (SOA) › Financial Statement Analysis | — | 4.43 |
| 36 | `Concepts/Ultimate Premium.md` | — | 1 (1) | 0 / 2 | 6% | GI-101 (SOA) | GI-101 (SOA) › Preparing Claims and Exposure Data for Actuarial Work | — | 4.43 |
| 37 | `Concepts/Individual Security.md` | — | 1 (1) | 0 / 1 | 12% | INV-101 (SOA) | INV-101 (SOA) › Credit Risk Management | — | 4.42 |
| 38 | `Concepts/Insurance Department.md` | — | 1 (1) | 0 / 2 | 6% | GI-302 (SOA) | GI-302 (SOA) › U.S. General Insurance Regulation | — | 4.42 |
| 39 | `Concepts/Taxable Income.md` | — | 1 (1) | 0 / 1 | 12% | GH-201C (SOA) | GH-201C (SOA) › Financial Statements | — | 4.42 |
| 40 | `Concepts/Inflation-Sensitive Exposure.md` | — | 1 (1) | 0 / 2 | 5% | GI-101 (SOA) | GI-101 (SOA) › Trending | — | 4.38 |
| 41 | `Concepts/Return Trade-Off.md` | — | 2 (1) | 0 / 0 | 17% | CFE-101 (SOA) | CFE-101 (SOA) › Embedding ERM into Decision-Making | — | 4.38 |
| 42 | `Concepts/Health Care Cost.md` | — | 1 (1) | 0 / 2 | 5% | GH-301 (SOA) | GH-301 (SOA) › Social Determinants of Health | — | 4.35 |
| 43 | `Concepts/ALM Context.md` | — | 1 (1) | 0 / 0 | 22% | CP-351 (SOA) | CP-351 (SOA) › Tools and Strategies to Manage ALM Risks | — | 4.33 |
| 44 | `Concepts/Arrow-Debreau Security.md` | — | 1 (1) | 0 / 0 | 22% | INV-201 (SOA) | INV-201 (SOA) › Valuation of Derivatives | — | 4.33 |
| 45 | `Concepts/Asset Allocation Strategy.md` | — | 1 (1) | 0 / 0 | 22% | CP-351 (SOA) | CP-351 (SOA) › Tools and Strategies to Manage ALM Risks | — | 4.33 |
| 46 | `Concepts/Euler-Maruyama Discretization.md` | — | 1 (1) | 0 / 0 | 22% | INV-201 (SOA) | INV-201 (SOA) › Valuation of Derivatives | — | 4.33 |
| 47 | `Concepts/Extreme ALM Event.md` | — | 1 (1) | 0 / 0 | 22% | CP-351 (SOA) | CP-351 (SOA) › Tools and Strategies to Manage ALM Risks | — | 4.33 |
| 48 | `Concepts/Girsanov's Theorem.md` | — | 1 (1) | 0 / 0 | 22% | INV-201 (SOA) | INV-201 (SOA) › Valuation of Derivatives | — | 4.33 |
| 49 | `Concepts/Incomplete Market.md` | — | 1 (1) | 0 / 0 | 22% | INV-201 (SOA) | INV-201 (SOA) › Valuation of Derivatives | — | 4.33 |
| 50 | `Concepts/Inforce Reinsurance.md` | — | 2 (1) | 0 / 0 | 16% | CP-341 (SOA) | CP-341 (SOA) › Types of Reinsurance Arrangements and Methods | — | 4.33 |
| 51 | `Concepts/Interest Rate Derivative.md` | — | 1 (1) | 0 / 0 | 22% | CP-351 (SOA) | CP-351 (SOA) › Tools and Strategies to Manage ALM Risks | — | 4.33 |
| 52 | `Concepts/Isometry.md` | — | 1 (1) | 0 / 0 | 22% | INV-201 (SOA) | INV-201 (SOA) › Valuation of Derivatives | — | 4.33 |
| 53 | `Concepts/Jump-Diffusion.md` | — | 1 (1) | 0 / 0 | 22% | INV-201 (SOA) | INV-201 (SOA) › Valuation of Derivatives | — | 4.33 |
| 54 | `Concepts/Liability Profile.md` | — | 1 (1) | 0 / 0 | 22% | CP-351 (SOA) | CP-351 (SOA) › Tools and Strategies to Manage ALM Risks | — | 4.33 |
| 55 | `Concepts/Local- Volatility.md` | — | 1 (1) | 0 / 0 | 22% | INV-201 (SOA) | INV-201 (SOA) › Valuation of Derivatives | — | 4.33 |
| 56 | `Concepts/Long-Tail Insurance Liability.md` | — | 1 (1) | 0 / 0 | 22% | CP-351 (SOA) | CP-351 (SOA) › Tools and Strategies to Manage ALM Risks | — | 4.33 |
| 57 | `Concepts/Martingale.md` | — | 1 (1) | 0 / 0 | 22% | INV-201 (SOA) | INV-201 (SOA) › Valuation of Derivatives | — | 4.33 |
| 58 | `Concepts/Modeling Smile.md` | — | 1 (1) | 0 / 0 | 22% | INV-201 (SOA) | INV-201 (SOA) › Valuation of Derivatives | — | 4.33 |
| 59 | `Concepts/No-Arbitrage.md` | — | 1 (1) | 0 / 0 | 22% | INV-201 (SOA) | INV-201 (SOA) › Valuation of Derivatives | — | 4.33 |
| 60 | `Concepts/Numeraire.md` | — | 1 (1) | 0 / 0 | 22% | INV-201 (SOA) | INV-201 (SOA) › Valuation of Derivatives | — | 4.33 |
| 61 | `Concepts/Numerical Discretization.md` | — | 1 (1) | 0 / 0 | 22% | INV-201 (SOA) | INV-201 (SOA) › Valuation of Derivatives | — | 4.33 |
| 62 | `Concepts/Observed Price.md` | — | 1 (1) | 0 / 0 | 22% | INV-201 (SOA) | INV-201 (SOA) › Valuation of Derivatives | — | 4.33 |
| 63 | `Concepts/Offshore Reinsurance.md` | — | 2 (1) | 0 / 0 | 16% | CP-341 (SOA) | CP-341 (SOA) › Key Accounting and Regulatory Considerations; CP-341 (SOA) › Types of Reinsurance Arrangements and Methods | — | 4.33 |
| 64 | `Concepts/Pricing Derivative.md` | — | 1 (1) | 0 / 0 | 22% | INV-201 (SOA) | INV-201 (SOA) › Valuation of Derivatives | — | 4.33 |
| 65 | `Concepts/Stochastic Calculus Theory.md` | — | 1 (1) | 0 / 0 | 22% | INV-201 (SOA) | INV-201 (SOA) › Valuation of Derivatives | — | 4.33 |
| 66 | `Concepts/Stochastic Differential Equation.md` | — | 1 (1) | 0 / 0 | 22% | INV-201 (SOA) | INV-201 (SOA) › Valuation of Derivatives | — | 4.33 |
| 67 | `Concepts/Stochastic Volatility.md` | — | 1 (1) | 0 / 0 | 22% | INV-201 (SOA) | INV-201 (SOA) › Valuation of Derivatives | — | 4.33 |
| 68 | `Concepts/Traded Security.md` | — | 1 (1) | 0 / 0 | 22% | INV-201 (SOA) | INV-201 (SOA) › Valuation of Derivatives | — | 4.33 |
| 69 | `Concepts/Transferring Risk.md` | — | 1 (1) | 0 / 0 | 22% | CP-351 (SOA) | CP-351 (SOA) › Tools and Strategies to Manage ALM Risks | — | 4.33 |
| 70 | `Concepts/Transition Density.md` | — | 1 (1) | 0 / 0 | 22% | INV-201 (SOA) | INV-201 (SOA) › Valuation of Derivatives | — | 4.33 |
| 71 | `Concepts/Volatility Smile.md` | — | 1 (1) | 0 / 0 | 22% | INV-201 (SOA) | INV-201 (SOA) › Valuation of Derivatives | — | 4.33 |
| 72 | `Concepts/Case Estimate.md` | — | 1 (1) | 0 / 0 | 22% | GI-101 (SOA) | GI-101 (SOA) › Projecting Ultimate Claims | — | 4.3 |
| 73 | `Concepts/Development-Based Frequency-Severity.md` | — | 1 (1) | 0 / 0 | 22% | GI-101 (SOA) | GI-101 (SOA) › Projecting Ultimate Claims | — | 4.3 |
| 74 | `Concepts/Generalized Cape Cod.md` | — | 1 (1) | 0 / 0 | 22% | GI-101 (SOA) | GI-101 (SOA) › Projecting Ultimate Claims | — | 4.3 |
| 75 | `Concepts/Projected Ultimate Value.md` | — | 1 (1) | 0 / 0 | 22% | GI-101 (SOA) | GI-101 (SOA) › Projecting Ultimate Claims | — | 4.3 |
| 76 | `Concepts/Varying Circumstance.md` | — | 1 (1) | 0 / 0 | 22% | GI-101 (SOA) | GI-101 (SOA) › Projecting Ultimate Claims | — | 4.3 |
| 77 | `Concepts/Cyber Risk.md` | — | 1 (1) | 0 / 2 | 3% | GI-302 (SOA) | GI-302 (SOA) › U.S. General Insurance Products and Coverages | — | 4.28 |
| 78 | `Concepts/Premium Basis.md` | — | 1 (1) | 0 / 2 | 3% | GI-302 (SOA) | GI-302 (SOA) › U.S. General Insurance Products and Coverages | — | 4.28 |
| 79 | `Concepts/Optimal Capital Structure.md` | — | 1 (1) | 0 / 1 | 10% | CFE-201 (SOA) | CFE-201 (SOA) › Corporate Finance | — | 4.27 |
| 80 | `Concepts/Reinsurance Requirement.md` | — | 2 (1) | 0 / 0 | 15% | CP-341 (SOA) | CP-341 (SOA) › Key Accounting and Regulatory Considerations | — | 4.26 |
| 81 | `Concepts/Behavioral Finance.md` | — | 1 (1) | 0 / 2 | 3% | GI-201 (SOA) | GI-201 (SOA) › Financial Economics | — | 4.25 |
| 82 | `Concepts/Deferred Acquisition Cost.md` | — | 1 (1) | 0 / 1 | 9% | ILA-101 (SOA) | ILA-101 (SOA) › Introduction to Life and Annuity Valuation Concepts | — | 4.21 |
| 83 | `Concepts/Early Retirement.md` | — | 1 (1) | 0 / 1 | 9% | RET-101 (SOA) | RET-101 (SOA) › Sponsor Risks | — | 4.21 |
| 84 | `Concepts/Employee Benefit Plan.md` | — | 1 (1) | 0 / 1 | 9% | GH-101 (SOA) | GH-101 (SOA) › Employee Benefits | — | 4.21 |
| 85 | `Concepts/Healthcare Data.md` | Common Healthcare Data | 2 (1) | 0 / 1 | 2% | GH-301 (SOA) | GH-301 (SOA) › Predictive Analytics | — | 4.21 |
| 86 | `Concepts/Policy Reserve.md` | — | 1 (1) | 0 / 1 | 9% | CP-321 (SOA) | CP-321 (SOA) › Reserving | — | 4.21 |
| 87 | `Concepts/Rising Interest Rate Environment.md` | — | 1 (1) | 0 / 1 | 9% | ILA-101 (SOA) | ILA-101 (SOA) › Product Management | — | 4.21 |
| 88 | `Concepts/Professional Judgment.md` | — | 1 (1) | 0 / 2 | 1% | GI-101 (SOA) | GI-101 (SOA) › Introduction and Key Considerations | — | 4.16 |
| 89 | `Concepts/Organization's Performance.md` | — | 2 (1) | 0 / 0 | 13% | CFE-201 (SOA) | CFE-201 (SOA) › Financial Statement Analysis; CFE-201 (SOA) › Managerial Accounting and Operational Excellence | — | 4.14 |
| 90 | `Concepts/Asset Benchmark.md` | — | 1 (1) | 0 / 0 | 19% | INV-101 (SOA) | INV-101 (SOA) › Portfolio Construction, Management, and Assessment | — | 4.13 |
| 91 | `Concepts/Complex Component.md` | — | 1 (1) | 0 / 0 | 19% | CP-312 (SOA) | CP-312 (SOA) › Cash Flow Models for Long-Term Insurance Business | — | 4.13 |
| 92 | `Concepts/Dynamic Policyholder.md` | — | 1 (1) | 0 / 0 | 19% | CP-312 (SOA) | CP-312 (SOA) › Cash Flow Models for Long-Term Insurance Business | — | 4.13 |
| 93 | `Concepts/Enhance Yield.md` | — | 1 (1) | 0 / 0 | 19% | INV-101 (SOA) | INV-101 (SOA) › Portfolio Construction, Management, and Assessment | — | 4.13 |
| 94 | `Concepts/Equity-Linked Guarantee.md` | — | 1 (1) | 0 / 0 | 19% | CP-312 (SOA) | CP-312 (SOA) › Cash Flow Models for Long-Term Insurance Business | — | 4.13 |
| 95 | `Concepts/Fixed Income Portfolio.md` | — | 1 (1) | 0 / 0 | 19% | INV-101 (SOA) | INV-101 (SOA) › Portfolio Construction, Management, and Assessment | — | 4.13 |
| 96 | `Concepts/Index-Linked Credit.md` | — | 1 (1) | 0 / 0 | 19% | CP-312 (SOA) | CP-312 (SOA) › Cash Flow Models for Long-Term Insurance Business | — | 4.13 |
| 97 | `Concepts/Investment Governance Structure.md` | — | 1 (1) | 0 / 0 | 19% | INV-101 (SOA) | INV-101 (SOA) › Portfolio Construction, Management, and Assessment | — | 4.13 |
| 98 | `Concepts/Liquidity.md` | — | 1 (1) | 0 / 0 | 19% | INV-101 (SOA) | INV-101 (SOA) › Portfolio Construction, Management, and Assessment | — | 4.13 |
| 99 | `Concepts/Long-Term Insurance Business.md` | — | 1 (1) | 0 / 0 | 19% | CP-312 (SOA) | CP-312 (SOA) › Cash Flow Models for Long-Term Insurance Business | — | 4.13 |
| 100 | `Concepts/NAIC Annual Statement Pages-schedule.md` | — | 1 (1) | 0 / 0 | 19% | GI-302 (SOA) | GI-302 (SOA) › U.S. GI Financial Reporting and Financial Health Measurement | — | 4.13 |
| 101 | `Concepts/NAIC RBC.md` | — | 1 (1) | 0 / 0 | 19% | GI-302 (SOA) | GI-302 (SOA) › U.S. GI Financial Reporting and Financial Health Measurement | — | 4.13 |
| 102 | `Concepts/Optimal Portfolio Allocation.md` | — | 1 (1) | 0 / 0 | 19% | INV-101 (SOA) | INV-101 (SOA) › Portfolio Construction, Management, and Assessment | — | 4.13 |
| 103 | `Concepts/Performance Attribution Metrics.md` | — | 1 (1) | 0 / 0 | 19% | INV-101 (SOA) | INV-101 (SOA) › Portfolio Construction, Management, and Assessment | — | 4.13 |
| 104 | `Concepts/Portfolio Management Process.md` | — | 1 (1) | 0 / 0 | 19% | INV-101 (SOA) | INV-101 (SOA) › Portfolio Construction, Management, and Assessment | — | 4.13 |
| 105 | `Concepts/Statutory Financial Statement.md` | — | 1 (1) | 0 / 0 | 19% | GI-302 (SOA) | GI-302 (SOA) › U.S. GI Financial Reporting and Financial Health Measurement | — | 4.13 |
| 106 | `Concepts/Contingency Margin.md` | — | 1 (1) | 0 / 1 | 7% | GI-101 (SOA) | GI-101 (SOA) › Ratemaking | — | 4.1 |
| 107 | `Concepts/Expenses Required.md` | — | 1 (1) | 0 / 1 | 7% | GI-101 (SOA) | GI-101 (SOA) › Ratemaking | — | 4.1 |
| 108 | `Concepts/Affordable Care Act.md` | — | 1 (1) | 0 / 1 | 7% | GH-201U (SOA) | GH-201U (SOA) › Government Programs | — | 4.08 |
| 109 | `Concepts/Intentional Tort.md` | — | 2 (1) | 0 / 1 | — | DISC-IA (CAS) | DISC-IA (CAS) › 14. Insurance Law Part 1 | — | 4.08 |
| 110 | `Concepts/Multiple Data.md` | — | 1 (1) | 0 / 1 | 7% | GH-301 (SOA) | GH-301 (SOA) › Medical Data | — | 4.08 |
| 111 | `Concepts/Products Liability.md` | — | 1 (1) | 0 / 2 | — | DISC-IA (CAS) | DISC-IA (CAS) › 15. Insurance Law Part 2 | — | 4.08 |
| 112 | `Concepts/Underwriting Policy.md` | — | 2 (1) | 0 / 1 | — | DISC-RM (CAS) | DISC-RM (CAS) › 8. The Underwriting Function | — | 4.08 |
| 113 | `Concepts/Ancillary Benefit.md` | — | 1 (1) | 0 / 0 | 18% | RET-101 (SOA) | RET-101 (SOA) › Benefit Plan Structure, Features and Investments | — | 4.06 |
| 114 | `Concepts/Benefit Eligibility Requirement.md` | — | 1 (1) | 0 / 0 | 18% | RET-101 (SOA) | RET-101 (SOA) › Benefit Plan Structure, Features and Investments | — | 4.06 |
| 115 | `Concepts/Benefit Subsidy.md` | — | 1 (1) | 0 / 0 | 18% | RET-101 (SOA) | RET-101 (SOA) › Benefit Plan Structure, Features and Investments | — | 4.06 |
| 116 | `Concepts/Contribution Formula.md` | — | 1 (1) | 0 / 0 | 18% | RET-101 (SOA) | RET-101 (SOA) › Benefit Plan Structure, Features and Investments | — | 4.06 |
| 117 | `Concepts/Cross Greek.md` | — | 1 (1) | 0 / 0 | 18% | INV-201 (SOA) | INV-201 (SOA) › Applications and Risks of Derivatives | — | 4.06 |
| 118 | `Concepts/Dynamic Hedging.md` | — | 1 (1) | 0 / 0 | 18% | INV-201 (SOA) | INV-201 (SOA) › Applications and Risks of Derivatives | — | 4.06 |
| 119 | `Concepts/Executive Retirement Plan.md` | — | 1 (1) | 0 / 0 | 18% | RET-101 (SOA) | RET-101 (SOA) › Benefit Plan Structure, Features and Investments | — | 4.06 |
| 120 | `Concepts/Fund Performance.md` | — | 1 (1) | 0 / 0 | 18% | INV-201 (SOA) | INV-201 (SOA) › Applications and Risks of Derivatives | — | 4.06 |
| 121 | `Concepts/Guarantee Cost.md` | — | 1 (1) | 0 / 0 | 18% | INV-201 (SOA) | INV-201 (SOA) › Applications and Risks of Derivatives | — | 4.06 |
| 122 | `Concepts/Hedge Strategy.md` | — | 1 (1) | 0 / 0 | 18% | INV-201 (SOA) | INV-201 (SOA) › Applications and Risks of Derivatives | — | 4.06 |
| 123 | `Concepts/Hybrid Plan.md` | — | 1 (1) | 0 / 0 | 18% | RET-101 (SOA) | RET-101 (SOA) › Benefit Plan Structure, Features and Investments | — | 4.06 |
| 124 | `Concepts/Implied Volatility.md` | — | 1 (1) | 0 / 0 | 18% | INV-201 (SOA) | INV-201 (SOA) › Applications and Risks of Derivatives | — | 4.06 |
| 125 | `Concepts/Indexed Annuity.md` | — | 1 (1) | 0 / 0 | 18% | INV-201 (SOA) | INV-201 (SOA) › Applications and Risks of Derivatives | — | 4.06 |
| 126 | `Concepts/Late Retirement Option.md` | — | 1 (1) | 0 / 0 | 18% | RET-101 (SOA) | RET-101 (SOA) › Benefit Plan Structure, Features and Investments | — | 4.06 |
| 127 | `Concepts/Optional Employee Contribution.md` | — | 1 (1) | 0 / 0 | 18% | RET-101 (SOA) | RET-101 (SOA) › Benefit Plan Structure, Features and Investments | — | 4.06 |
| 128 | `Concepts/Partially Hedged.md` | — | 1 (1) | 0 / 0 | 18% | INV-201 (SOA) | INV-201 (SOA) › Applications and Risks of Derivatives | — | 4.06 |
| 129 | `Concepts/Participant Investment Option.md` | — | 1 (1) | 0 / 0 | 18% | RET-101 (SOA) | RET-101 (SOA) › Benefit Plan Structure, Features and Investments | — | 4.06 |
| 130 | `Concepts/Plan Curtailment.md` | — | 1 (1) | 0 / 0 | 18% | RET-201 (SOA) | RET-201 (SOA) › Accounting Standards | — | 4.06 |
| 131 | `Concepts/Plan Eligibility Requirement.md` | — | 1 (1) | 0 / 0 | 18% | RET-101 (SOA) | RET-101 (SOA) › Benefit Plan Structure, Features and Investments | — | 4.06 |
| 132 | `Concepts/Retirement Plan Asset.md` | — | 1 (1) | 0 / 0 | 18% | RET-101 (SOA) | RET-101 (SOA) › Benefit Plan Structure, Features and Investments | — | 4.06 |
| 133 | `Concepts/Shared Risk Plan.md` | — | 1 (1) | 0 / 0 | 18% | RET-101 (SOA) | RET-101 (SOA) › Benefit Plan Structure, Features and Investments | — | 4.06 |
| 134 | `Concepts/Structured Product.md` | — | 1 (1) | 0 / 0 | 18% | INV-201 (SOA) | INV-201 (SOA) › Applications and Risks of Derivatives | — | 4.06 |
| 135 | `Concepts/Target Benefit Plan.md` | — | 1 (1) | 0 / 0 | 18% | RET-101 (SOA) | RET-101 (SOA) › Benefit Plan Structure, Features and Investments | — | 4.06 |
| 136 | `Concepts/Target Volatility Fund.md` | — | 1 (1) | 0 / 0 | 18% | INV-201 (SOA) | INV-201 (SOA) › Applications and Risks of Derivatives | — | 4.06 |
| 137 | `Concepts/Variable Annuity Guarantee Rider.md` | — | 1 (1) | 0 / 0 | 18% | INV-201 (SOA) | INV-201 (SOA) › Applications and Risks of Derivatives | — | 4.06 |
| 138 | `Concepts/Vesting.md` | — | 1 (1) | 0 / 0 | 18% | RET-101 (SOA) | RET-101 (SOA) › Benefit Plan Structure, Features and Investments | — | 4.06 |
| 139 | `Concepts/Effective Strategic Budgeting.md` | — | 1 (1) | 0 / 0 | 17% | CP-311 (SOA) | CP-311 (SOA) › Strategic Budgeting, Forecasting, and Value Measures | — | 3.99 |
| 140 | `Concepts/Financial Budgeting.md` | — | 1 (1) | 0 / 0 | 17% | CP-311 (SOA) | CP-311 (SOA) › Strategic Budgeting, Forecasting, and Value Measures | — | 3.99 |
| 141 | `Concepts/Financial Business.md` | — | 1 (1) | 0 / 0 | 17% | CP-312 (SOA) | CP-312 (SOA) › Other types of Models for Financial Business | — | 3.99 |
| 142 | `Concepts/Forecasting Decision Making Process.md` | — | 1 (1) | 0 / 0 | 17% | CP-311 (SOA) | CP-311 (SOA) › Strategic Budgeting, Forecasting, and Value Measures | — | 3.99 |
| 143 | `Concepts/Organization's Initiative.md` | — | 1 (1) | 0 / 0 | 17% | CP-311 (SOA) | CP-311 (SOA) › Strategic Budgeting, Forecasting, and Value Measures | — | 3.99 |
| 144 | `Concepts/Organization's Strategic.md` | — | 1 (1) | 0 / 0 | 17% | CP-311 (SOA) | CP-311 (SOA) › Strategic Budgeting, Forecasting, and Value Measures | — | 3.99 |
| 145 | `Concepts/Signing Actuary.md` | — | 1 (1) | 0 / 0 | 17% | GI-302 (SOA) | GI-302 (SOA) › Responsibilities of a U.S. Signing General Insurance Actuary | — | 3.99 |
| 146 | `Concepts/Signing General Insurance Actuary.md` | — | 1 (1) | 0 / 0 | 17% | GI-302 (SOA) | GI-302 (SOA) › Responsibilities of a U.S. Signing General Insurance Actuary | — | 3.99 |
| 147 | `Concepts/Tracking Progress.md` | — | 1 (1) | 0 / 0 | 17% | CP-311 (SOA) | CP-311 (SOA) › Strategic Budgeting, Forecasting, and Value Measures | — | 3.99 |
| 148 | `Concepts/Gauge Performance.md` | — | 1 (1) | 0 / 0 | 17% | CFE-101 (SOA) | CFE-101 (SOA) › Embedding ERM into Decision-Making | — | 3.98 |
| 149 | `Concepts/Organization's Risk Profile.md` | — | 1 (1) | 0 / 0 | 17% | CFE-101 (SOA) | CFE-101 (SOA) › Embedding ERM into Decision-Making | — | 3.98 |
| 150 | `Concepts/Organizational Process.md` | — | 1 (1) | 0 / 0 | 17% | CFE-101 (SOA) | CFE-101 (SOA) › Embedding ERM into Decision-Making | — | 3.98 |
| 151 | `Concepts/Risk Capital Once Aggregated.md` | — | 1 (1) | 0 / 0 | 17% | CFE-101 (SOA) | CFE-101 (SOA) › Embedding ERM into Decision-Making | — | 3.98 |
| 152 | `Concepts/Risk Once Aggregated.md` | — | 1 (1) | 0 / 0 | 17% | CFE-101 (SOA) | CFE-101 (SOA) › Embedding ERM into Decision-Making | — | 3.98 |
| 153 | `Concepts/Risk Strategy.md` | — | 1 (1) | 0 / 0 | 17% | CFE-101 (SOA) | CFE-101 (SOA) › Embedding ERM into Decision-Making | — | 3.98 |
| 154 | `Concepts/Risk-capital Strategy.md` | — | 1 (1) | 0 / 0 | 17% | CFE-101 (SOA) | CFE-101 (SOA) › Embedding ERM into Decision-Making | — | 3.98 |
| 155 | `Concepts/Advanced Reinsurance Transaction.md` | — | 1 (1) | 0 / 0 | 16% | CP-341 (SOA) | CP-341 (SOA) › Types of Reinsurance Arrangements and Methods | — | 3.92 |
| 156 | `Concepts/Annuity Coinsurance.md` | — | 1 (1) | 0 / 0 | 16% | CP-341 (SOA) | CP-341 (SOA) › Types of Reinsurance Arrangements and Methods | — | 3.92 |
| 157 | `Concepts/Chain Ladder Estimator.md` | Chain Ladder Estimation | 2 (1) | 0 / 0 | 9% | GI-301 (SOA) | GI-301 (SOA) › Stochastic Reserving | — | 3.92 |
| 158 | `Concepts/Employee Benefit Strategy.md` | — | 2 (1) | 0 / 0 | 9% | GH-101 (SOA) | GH-101 (SOA) › Employee Benefits | — | 3.92 |
| 159 | `Concepts/Evolving Quantitative.md` | — | 1 (1) | 0 / 0 | 16% | CFE-201 (SOA) | CFE-201 (SOA) › Evolving Quantitative Methods and Technologies | — | 3.92 |
| 160 | `Concepts/Global Reinsurance Market.md` | — | 1 (1) | 0 / 0 | 16% | CP-341 (SOA) | CP-341 (SOA) › Types of Reinsurance Arrangements and Methods | — | 3.92 |
| 161 | `Concepts/Life Insurance Yearly Renewable Term.md` | — | 1 (1) | 0 / 0 | 16% | CP-341 (SOA) | CP-341 (SOA) › Types of Reinsurance Arrangements and Methods | — | 3.92 |
| 162 | `Concepts/Long-Tail Liability.md` | — | 1 (1) | 0 / 0 | 16% | CP-351 (SOA) | CP-351 (SOA) › Measuring Risks from Assets and Liabilities | — | 3.92 |
| 163 | `Concepts/Non-Proportional Reinsurance Transaction.md` | — | 1 (1) | 0 / 0 | 16% | CP-341 (SOA) | CP-341 (SOA) › Types of Reinsurance Arrangements and Methods | — | 3.92 |
| 164 | `Concepts/PRTs-longevity Swap.md` | — | 1 (1) | 0 / 0 | 16% | CP-341 (SOA) | CP-341 (SOA) › Types of Reinsurance Arrangements and Methods | — | 3.92 |
| 165 | `Concepts/Plan Design Feature.md` | — | 2 (1) | 0 / 0 | 9% | RET-101 (SOA) | RET-101 (SOA) › Benefit Plan Design Recommendation | — | 3.92 |
| 166 | `Concepts/Portfolio's Exposure.md` | — | 1 (1) | 0 / 0 | 16% | CP-351 (SOA) | CP-351 (SOA) › Measuring Risks from Assets and Liabilities | — | 3.92 |
| 167 | `Concepts/Private Equity Involvement.md` | — | 1 (1) | 0 / 0 | 16% | CP-341 (SOA) | CP-341 (SOA) › Types of Reinsurance Arrangements and Methods | — | 3.92 |
| 168 | `Concepts/Regulatory Capital Adequacy.md` | — | 1 (1) | 0 / 0 | 16% | CP-351 (SOA) | CP-351 (SOA) › Measuring Risks from Assets and Liabilities | — | 3.92 |
| 169 | `Concepts/Retirement Risk.md` | — | 2 (1) | 0 / 0 | 9% | RET-101 (SOA) | RET-101 (SOA) › Benefit Plan Design Recommendation | — | 3.92 |
| 170 | `Concepts/Risk Identification Tool.md` | — | 1 (1) | 0 / 0 | 16% | CP-351 (SOA) | CP-351 (SOA) › Measuring Risks from Assets and Liabilities | — | 3.92 |
| 171 | `Concepts/Short Duration Group.md` | — | 1 (1) | 0 / 0 | 16% | GH-201U (SOA) | GH-201U (SOA) › Reserving | — | 3.92 |
| 172 | `Concepts/Sponsor's Plan.md` | — | 2 (1) | 0 / 0 | 9% | RET-101 (SOA) | RET-101 (SOA) › Benefit Plan Design Recommendation | — | 3.92 |
| 173 | `Concepts/Business Environment.md` | — | 1 (1) | 0 / 0 | 16% | CP-311 (SOA) | CP-311 (SOA) › Introduction to Strategic Management | — | 3.91 |
| 174 | `Concepts/Business-Level Strategy.md` | — | 1 (1) | 0 / 0 | 16% | CP-311 (SOA) | CP-311 (SOA) › Introduction to Strategic Management | — | 3.91 |
| 175 | `Concepts/Competitive Dynamics.md` | — | 1 (1) | 0 / 0 | 16% | CP-311 (SOA) | CP-311 (SOA) › Introduction to Strategic Management | — | 3.91 |
| 176 | `Concepts/Corporate-Level Strategy.md` | — | 1 (1) | 0 / 0 | 16% | CP-311 (SOA) | CP-311 (SOA) › Introduction to Strategic Management | — | 3.91 |
| 177 | `Concepts/External-inorganic Growth Strategy.md` | — | 1 (1) | 0 / 0 | 16% | CP-311 (SOA) | CP-311 (SOA) › Introduction to Strategic Management | — | 3.91 |
| 178 | `Concepts/Market Opportunity.md` | — | 1 (1) | 0 / 0 | 16% | CP-311 (SOA) | CP-311 (SOA) › Introduction to Strategic Management | — | 3.91 |
| 179 | `Concepts/Organization's Business Strategy.md` | — | 1 (1) | 0 / 0 | 16% | CP-311 (SOA) | CP-311 (SOA) › Introduction to Strategic Management | — | 3.91 |
| 180 | `Concepts/Claim Handling Process.md` | — | 1 (1) | 0 / 1 | 3% | GI-201 (SOA) | GI-201 (SOA) › General Insurance Company Operations | — | 3.88 |
| 181 | `Concepts/Insurer Risk.md` | — | 1 (1) | 0 / 1 | 3% | GI-201 (SOA) | GI-201 (SOA) › General Insurance Company Operations | — | 3.88 |
| 182 | `Concepts/Canadian Regulatory.md` | — | 1 (1) | 0 / 0 | 15% | CP-341 (SOA) | CP-341 (SOA) › Key Accounting and Regulatory Considerations | — | 3.86 |
| 183 | `Concepts/Case-Specific Pricing.md` | — | 1 (1) | 0 / 0 | 15% | GH-101 (SOA) | GH-101 (SOA) › Underwriting and Funding | — | 3.86 |
| 184 | `Concepts/Claim Credibility.md` | — | 1 (1) | 0 / 0 | 15% | GH-101 (SOA) | GH-101 (SOA) › Underwriting and Funding | — | 3.86 |
| 185 | `Concepts/Distinguishing Investment.md` | — | 1 (1) | 0 / 0 | 15% | INV-101 (SOA) | INV-101 (SOA) › Asset Classes | — | 3.86 |
| 186 | `Concepts/Global Jurisdiction.md` | — | 1 (1) | 0 / 0 | 15% | CP-341 (SOA) | CP-341 (SOA) › Key Accounting and Regulatory Considerations | — | 3.86 |
| 187 | `Concepts/International Reinsurance Regulatory Framework.md` | — | 1 (1) | 0 / 0 | 15% | CP-341 (SOA) | CP-341 (SOA) › Key Accounting and Regulatory Considerations | — | 3.86 |
| 188 | `Concepts/Leveraged Loan.md` | — | 1 (1) | 0 / 0 | 15% | INV-101 (SOA) | INV-101 (SOA) › Asset Classes | — | 3.86 |
| 189 | `Concepts/Medical Cost Trend Experience.md` | — | 1 (1) | 0 / 0 | 15% | GH-101 (SOA) | GH-101 (SOA) › Manual Rates | — | 3.86 |
| 190 | `Concepts/Pooling.md` | — | 1 (1) | 0 / 0 | 15% | GH-101 (SOA) | GH-101 (SOA) › Underwriting and Funding | — | 3.86 |
| 191 | `Concepts/Private Debt.md` | — | 1 (1) | 0 / 0 | 15% | INV-101 (SOA) | INV-101 (SOA) › Asset Classes | — | 3.86 |
| 192 | `Concepts/Private Equity Backed Reinsurer.md` | — | 1 (1) | 0 / 0 | 15% | CP-341 (SOA) | CP-341 (SOA) › Key Accounting and Regulatory Considerations | — | 3.86 |
| 193 | `Concepts/Public Equity.md` | — | 1 (1) | 0 / 0 | 15% | INV-101 (SOA) | INV-101 (SOA) › Asset Classes | — | 3.86 |
| 194 | `Concepts/Residential Mortgage.md` | — | 1 (1) | 0 / 0 | 15% | INV-101 (SOA) | INV-101 (SOA) › Asset Classes | — | 3.86 |
| 195 | `Concepts/Risk Assessment Mechanism.md` | — | 1 (1) | 0 / 0 | 15% | GH-101 (SOA) | GH-101 (SOA) › Underwriting and Funding | — | 3.86 |
| 196 | `Concepts/Structured Credit Product.md` | — | 1 (1) | 0 / 0 | 15% | INV-101 (SOA) | INV-101 (SOA) › Asset Classes | — | 3.86 |
| 197 | `Concepts/US Stat Requirement.md` | — | 1 (1) | 0 / 0 | 15% | CP-341 (SOA) | CP-341 (SOA) › Key Accounting and Regulatory Considerations | — | 3.86 |
| 198 | `Concepts/Underwriting Situation.md` | — | 1 (1) | 0 / 0 | 15% | GH-101 (SOA) | GH-101 (SOA) › Underwriting and Funding | — | 3.86 |
| 199 | `Concepts/External Environment.md` | — | 1 (1) | 0 / 0 | 14% | CFE-101 (SOA) | CFE-101 (SOA) › Enterprise Risk Management Foundations | — | 3.84 |
| 200 | `Concepts/Market Conduct Compliance Activity.md` | — | 1 (1) | 0 / 0 | 14% | CFE-101 (SOA) | CFE-101 (SOA) › Enterprise Risk Management Foundations | — | 3.84 |
| 201 | `Concepts/Compounding Risk.md` | — | 1 (1) | 0 / 0 | 14% | CFE-101 (SOA) | CFE-101 (SOA) › Risk Analysis and Evaluation | — | 3.82 |
| 202 | `Concepts/Contagion-Related Risk.md` | — | 1 (1) | 0 / 0 | 14% | CFE-101 (SOA) | CFE-101 (SOA) › Risk Analysis and Evaluation | — | 3.82 |
| 203 | `Concepts/Easily Quantifiable.md` | — | 1 (1) | 0 / 0 | 14% | CFE-101 (SOA) | CFE-101 (SOA) › Risk Analysis and Evaluation | — | 3.82 |
| 204 | `Concepts/Monitoring Mechanism.md` | — | 1 (1) | 0 / 0 | 14% | CFE-101 (SOA) | CFE-101 (SOA) › Risk Analysis and Evaluation | — | 3.82 |
| 205 | `Concepts/Risk Aggregation.md` | — | 1 (1) | 0 / 0 | 14% | CFE-101 (SOA) | CFE-101 (SOA) › Risk Analysis and Evaluation | — | 3.82 |
| 206 | `Concepts/Base Rate Development.md` | — | 1 (1) | 0 / 0 | 14% | CP-321 (SOA) | CP-321 (SOA) › Manual Rates | — | 3.79 |
| 207 | `Concepts/Claims-Made Contract.md` | — | 1 (1) | 0 / 0 | 14% | GI-301 (SOA) | GI-301 (SOA) › Specialized Ratemaking Topics | — | 3.79 |
| 208 | `Concepts/Coding Set.md` | — | 2 (1) | 0 / 0 | 7% | GH-301 (SOA) | GH-301 (SOA) › Medical Data | — | 3.79 |
| 209 | `Concepts/Commission.md` | — | 1 (1) | 0 / 0 | 14% | CP-321 (SOA) | CP-321 (SOA) › Manual Rates | — | 3.79 |
| 210 | `Concepts/Filing Requirement.md` | — | 2 (1) | 0 / 0 | 7% | GH-201U (SOA) | GH-201U (SOA) › Government Programs | — | 3.79 |
| 211 | `Concepts/Guaranty Association.md` | — | 1 (1) | 0 / 0 | 14% | CP-321 (SOA) | CP-321 (SOA) › Manual Rates | — | 3.79 |
| 212 | `Concepts/Increased Limit Option.md` | — | 1 (1) | 0 / 0 | 14% | GI-301 (SOA) | GI-301 (SOA) › Specialized Ratemaking Topics | — | 3.79 |
| 213 | `Concepts/Long Term Care Rate Increase.md` | — | 1 (1) | 0 / 0 | 14% | CP-321 (SOA) | CP-321 (SOA) › Manual Rates | — | 3.79 |
| 214 | `Concepts/Properly Modelling.md` | — | 1 (1) | 0 / 0 | 14% | CP-321 (SOA) | CP-321 (SOA) › Manual Rates | — | 3.79 |
| 215 | `Concepts/Reported Financial Statement.md` | — | 1 (1) | 0 / 0 | 13% | CFE-201 (SOA) | CFE-201 (SOA) › Financial Statement Analysis | — | 3.74 |
| 216 | `Concepts/Captive Reinsurance Transaction.md` | — | 1 (1) | 0 / 0 | 12% | CP-341 (SOA) | CP-341 (SOA) › Transferring Risk | — | 3.72 |
| 217 | `Concepts/Credit Risk Modeling.md` | — | 1 (1) | 0 / 0 | 12% | INV-101 (SOA) | INV-101 (SOA) › Credit Risk Management | — | 3.72 |
| 218 | `Concepts/Insurer Financial Statement.md` | — | 1 (1) | 0 / 0 | 12% | GH-201C (SOA) | GH-201C (SOA) › Financial Statements | — | 3.72 |
| 219 | `Concepts/International Financial Reporting Standard.md` | — | 1 (1) | 0 / 0 | 12% | GH-201C (SOA) | GH-201C (SOA) › Financial Statements | — | 3.72 |
| 220 | `Concepts/Portfolio Level.md` | — | 1 (1) | 0 / 0 | 12% | INV-101 (SOA) | INV-101 (SOA) › Credit Risk Management | — | 3.72 |
| 221 | `Concepts/Reinsurance Agreement Provision.md` | — | 1 (1) | 0 / 0 | 12% | CP-341 (SOA) | CP-341 (SOA) › Transferring Risk | — | 3.72 |
| 222 | `Concepts/Collective Insurance Industry Organization.md` | — | 1 (1) | 0 / 0 | 12% | GI-201 (SOA) | GI-201 (SOA) › Regulatory Environment | — | 3.68 |
| 223 | `Concepts/Insolvency Regulation.md` | — | 1 (1) | 0 / 0 | 12% | GI-201 (SOA) | GI-201 (SOA) › Regulatory Environment | — | 3.68 |
| 224 | `Concepts/Insurance Programs Controlled.md` | — | 1 (1) | 0 / 0 | 12% | GI-201 (SOA) | GI-201 (SOA) › Regulatory Environment | — | 3.68 |
| 225 | `Concepts/Telematics.md` | — | 1 (1) | 0 / 0 | 12% | GI-201 (SOA) | GI-201 (SOA) › Regulatory Environment | — | 3.68 |
| 226 | `Concepts/International Insurance.md` | — | 1 (1) | 0 / 1 | — | DISC-IA (CAS) | DISC-IA (CAS) › 13. Specialty Coverages Part 2 | — | 3.67 |
| 227 | `Concepts/Accountable Care Organization.md` | — | 1 (1) | 0 / 0 | 11% | GH-301 (SOA) | GH-301 (SOA) › Provider Contracting and Reimbursement | — | 3.65 |
| 228 | `Concepts/Actuarially Adjusted.md` | — | 1 (1) | 0 / 0 | 11% | GH-301 (SOA) | GH-301 (SOA) › Disease Management | — | 3.65 |
| 229 | `Concepts/Asset Transfer.md` | — | 1 (1) | 0 / 0 | 11% | RET-301 (SOA) | RET-301 (SOA) › Methods | — | 3.65 |
| 230 | `Concepts/Corporate Taxation.md` | — | 1 (1) | 0 / 0 | 11% | ILA-201I (SOA) | ILA-201I (SOA) › Advanced Product Management | — | 3.65 |
| 231 | `Concepts/Employers Offer Retiree Group Benefit.md` | — | 1 (1) | 0 / 0 | 11% | CP-321 (SOA) | CP-321 (SOA) › Retiree Group Benefits | — | 3.65 |
| 232 | `Concepts/Funding Policy.md` | — | 2 (1) | 0 / 0 | 5% | RET-201 (SOA) | RET-201 (SOA) › Valuations for the Purpose of Funding | — | 3.65 |
| 233 | `Concepts/Funding Restrictions Imposed.md` | — | 1 (1) | 0 / 0 | 11% | RET-301 (SOA) | RET-301 (SOA) › Regulations: Plan Funding | — | 3.65 |
| 234 | `Concepts/Government Regulation.md` | — | 1 (1) | 0 / 0 | 11% | RET-301 (SOA) | RET-301 (SOA) › Regulations: Evaluation and Application | — | 3.65 |
| 235 | `Concepts/Healthcare Intervention.md` | — | 1 (1) | 0 / 0 | 11% | GH-301 (SOA) | GH-301 (SOA) › Disease Management | — | 3.65 |
| 236 | `Concepts/Individual Savings Plan.md` | — | 1 (1) | 0 / 0 | 11% | RET-301 (SOA) | RET-301 (SOA) › Regulations: Evaluation and Application | — | 3.65 |
| 237 | `Concepts/International Capital Requirement.md` | — | 1 (1) | 0 / 0 | 11% | ILA-201I (SOA) | ILA-201I (SOA) › Capital Management | — | 3.65 |
| 238 | `Concepts/International Framework.md` | — | 1 (1) | 0 / 0 | 11% | ILA-201I (SOA) | ILA-201I (SOA) › Capital Management | — | 3.65 |
| 239 | `Concepts/Investment Income Tax.md` | — | 1 (1) | 0 / 0 | 11% | ILA-201I (SOA) | ILA-201I (SOA) › Advanced Product Management | — | 3.65 |
| 240 | `Concepts/Life Plan Design.md` | — | 1 (1) | 0 / 0 | 11% | CP-321 (SOA) | CP-321 (SOA) › Retiree Group Benefits | — | 3.65 |
| 241 | `Concepts/Members' Right.md` | — | 1 (1) | 0 / 0 | 11% | RET-301 (SOA) | RET-301 (SOA) › Regulations: Evaluation and Application | — | 3.65 |
| 242 | `Concepts/Non-Chronic Trend.md` | — | 1 (1) | 0 / 0 | 11% | GH-301 (SOA) | GH-301 (SOA) › Disease Management | — | 3.65 |
| 243 | `Concepts/Pension Plan Funding.md` | — | 1 (1) | 0 / 0 | 11% | RET-301 (SOA) | RET-301 (SOA) › Regulations: Plan Funding | — | 3.65 |
| 244 | `Concepts/Plan Amendment.md` | — | 1 (1) | 0 / 0 | 11% | RET-301 (SOA) | RET-301 (SOA) › Regulations: Evaluation and Application | — | 3.65 |
| 245 | `Concepts/Plan Establishment.md` | — | 1 (1) | 0 / 0 | 11% | RET-301 (SOA) | RET-301 (SOA) › Regulations: Evaluation and Application | — | 3.65 |
| 246 | `Concepts/Policyholder Taxation.md` | — | 1 (1) | 0 / 0 | 11% | ILA-201I (SOA) | ILA-201I (SOA) › Advanced Product Management | — | 3.65 |
| 247 | `Concepts/Post-Employment Benefit Plan.md` | — | 1 (1) | 0 / 0 | 11% | CP-321 (SOA) | CP-321 (SOA) › Retiree Group Benefits | — | 3.65 |
| 248 | `Concepts/Private Group Insurance Plan.md` | — | 1 (1) | 0 / 0 | 11% | GH-201C (SOA) | GH-201C (SOA) › Government Programs | — | 3.65 |
| 249 | `Concepts/Provider Payment.md` | — | 1 (1) | 0 / 0 | 11% | GH-301 (SOA) | GH-301 (SOA) › Provider Contracting and Reimbursement | — | 3.65 |
| 250 | `Concepts/Quality Perspective.md` | — | 1 (1) | 0 / 0 | 11% | GH-301 (SOA) | GH-301 (SOA) › Provider Contracting and Reimbursement | — | 3.65 |
| 251 | `Concepts/Quality Viewpoint.md` | — | 1 (1) | 0 / 0 | 11% | GH-301 (SOA) | GH-301 (SOA) › Provider Contracting and Reimbursement | — | 3.65 |
| 252 | `Concepts/Reflects Patient Risk.md` | — | 1 (1) | 0 / 0 | 11% | GH-301 (SOA) | GH-301 (SOA) › Disease Management | — | 3.65 |
| 253 | `Concepts/Registered Retirement Plan.md` | — | 1 (1) | 0 / 0 | 11% | RET-301 (SOA) | RET-301 (SOA) › Regulations: Evaluation and Application | — | 3.65 |
| 254 | `Concepts/Reporting Requirement.md` | — | 1 (1) | 0 / 0 | 11% | RET-301 (SOA) | RET-301 (SOA) › Regulations: Evaluation and Application | — | 3.65 |
| 255 | `Concepts/Retiree Health Valuation.md` | — | 1 (1) | 0 / 0 | 11% | CP-321 (SOA) | CP-321 (SOA) › Retiree Group Benefits | — | 3.65 |
| 256 | `Concepts/Retirement Funding Alternative.md` | — | 1 (1) | 0 / 0 | 11% | RET-301 (SOA) | RET-301 (SOA) › Regulations: Plan Funding | — | 3.65 |
| 257 | `Concepts/Service Cost.md` | — | 1 (1) | 0 / 0 | 11% | CP-321 (SOA) | CP-321 (SOA) › Retiree Group Benefits | — | 3.65 |
| 258 | `Concepts/Social Determinant.md` | — | 2 (1) | 0 / 0 | 5% | GH-301 (SOA) | GH-301 (SOA) › Social Determinants of Health | — | 3.65 |
| 259 | `Concepts/Standard Contracting.md` | — | 1 (1) | 0 / 0 | 11% | GH-301 (SOA) | GH-301 (SOA) › Provider Contracting and Reimbursement | — | 3.65 |
| 260 | `Concepts/Tax Regulation Pertaining.md` | — | 1 (1) | 0 / 0 | 11% | RET-301 (SOA) | RET-301 (SOA) › Regulations: Evaluation and Application | — | 3.65 |
| 261 | `Concepts/Utilization Rate.md` | — | 1 (1) | 0 / 0 | 11% | GH-301 (SOA) | GH-301 (SOA) › Disease Management | — | 3.65 |
| 262 | `Concepts/Capital Budgeting.md` | — | 1 (1) | 0 / 0 | 10% | CFE-201 (SOA) | CFE-201 (SOA) › Corporate Finance | — | 3.57 |
| 263 | `Concepts/Competitive Environment.md` | — | 1 (1) | 0 / 0 | 10% | CFE-201 (SOA) | CFE-201 (SOA) › Corporate Finance | — | 3.57 |
| 264 | `Concepts/Corporate Finance.md` | — | 1 (1) | 0 / 0 | 10% | CFE-201 (SOA) | CFE-201 (SOA) › Corporate Finance | — | 3.57 |
| 265 | `Concepts/Divestiture.md` | — | 1 (1) | 0 / 0 | 10% | CFE-201 (SOA) | CFE-201 (SOA) › Corporate Finance | — | 3.57 |
| 266 | `Concepts/Organization Optimiz.md` | — | 1 (1) | 0 / 0 | 10% | CFE-201 (SOA) | CFE-201 (SOA) › Corporate Finance | — | 3.57 |
| 267 | `Concepts/ACA Product.md` | — | 1 (1) | 0 / 0 | 9% | GH-301 (SOA) | GH-301 (SOA) › Healthcare Risk Adjustment1 | — | 3.52 |
| 268 | `Concepts/Annuity Context.md` | — | 1 (1) | 0 / 0 | 9% | ILA-101 (SOA) | ILA-101 (SOA) › Introduction to Assets and Risk Management | — | 3.52 |
| 269 | `Concepts/Annuity Distribution.md` | — | 1 (1) | 0 / 0 | 9% | ILA-101 (SOA) | ILA-101 (SOA) › Product Management | — | 3.52 |
| 270 | `Concepts/Annuity Insurance Product.md` | — | 1 (1) | 0 / 0 | 9% | ILA-101 (SOA) | ILA-101 (SOA) › Product Management | — | 3.52 |
| 271 | `Concepts/Annuity Liability.md` | — | 1 (1) | 0 / 0 | 9% | ILA-101 (SOA) | ILA-101 (SOA) › Introduction to Assets and Risk Management | — | 3.52 |
| 272 | `Concepts/Annuity Product Design.md` | — | 1 (1) | 0 / 0 | 9% | ILA-101 (SOA) | ILA-101 (SOA) › Individual Life and Annuity Product Design and Pricing | — | 3.52 |
| 273 | `Concepts/Benefit Adequacy.md` | — | 1 (1) | 0 / 0 | 9% | RET-101 (SOA) | RET-101 (SOA) › Participant Risks | — | 3.52 |
| 274 | `Concepts/Canadian Tax Regulation.md` | — | 1 (1) | 0 / 0 | 9% | ILA-101 (SOA) | ILA-101 (SOA) › Product Management | — | 3.52 |
| 275 | `Concepts/Care Management Situation.md` | — | 1 (1) | 0 / 0 | 9% | GH-301 (SOA) | GH-301 (SOA) › Healthcare Risk Adjustment1 | — | 3.52 |
| 276 | `Concepts/Challenges Insurers Face.md` | — | 1 (1) | 0 / 0 | 9% | ILA-101 (SOA) | ILA-101 (SOA) › Product Management | — | 3.52 |
| 277 | `Concepts/Common Insurance Guarantees Generate Embedded Option.md` | — | 1 (1) | 0 / 0 | 9% | ILA-101 (SOA) | ILA-101 (SOA) › Introduction to Assets and Risk Management | — | 3.52 |
| 278 | `Concepts/Common Profit Metrics.md` | — | 1 (1) | 0 / 0 | 9% | ILA-101 (SOA) | ILA-101 (SOA) › Individual Life and Annuity Product Design and Pricing | — | 3.52 |
| 279 | `Concepts/Common Valuation.md` | — | 1 (1) | 0 / 0 | 9% | ILA-101 (SOA) | ILA-101 (SOA) › Introduction to Life and Annuity Valuation Concepts | — | 3.52 |
| 280 | `Concepts/Decumulation Feature.md` | — | 1 (1) | 0 / 0 | 9% | RET-101 (SOA) | RET-101 (SOA) › Sponsor Risks | — | 3.52 |
| 281 | `Concepts/Duration-convexity Matching.md` | — | 1 (1) | 0 / 0 | 9% | ILA-101 (SOA) | ILA-101 (SOA) › Introduction to Assets and Risk Management | — | 3.52 |
| 282 | `Concepts/Employee Perspective.md` | — | 1 (1) | 0 / 0 | 9% | RET-101 (SOA) | RET-101 (SOA) › Benefit Plan Design Recommendation | — | 3.52 |
| 283 | `Concepts/Governance Best Practice.md` | — | 1 (1) | 0 / 0 | 9% | CP-312 (SOA) | CP-312 (SOA) › Model Governance | — | 3.52 |
| 284 | `Concepts/Governance Documentation.md` | — | 1 (1) | 0 / 0 | 9% | CP-312 (SOA) | CP-312 (SOA) › Model Governance | — | 3.52 |
| 285 | `Concepts/Integrating ALM.md` | — | 1 (1) | 0 / 0 | 9% | ILA-101 (SOA) | ILA-101 (SOA) › Introduction to Assets and Risk Management | — | 3.52 |
| 286 | `Concepts/International Legal Environment.md` | — | 1 (1) | 0 / 0 | 9% | GI-201 (SOA) | GI-201 (SOA) › Legal Environment | — | 3.52 |
| 287 | `Concepts/International Regulatory Framework.md` | — | 1 (1) | 0 / 0 | 9% | ILA-101 (SOA) | ILA-101 (SOA) › Introduction to Life and Annuity Valuation Concepts | — | 3.52 |
| 288 | `Concepts/Introducing Option.md` | — | 1 (1) | 0 / 0 | 9% | RET-101 (SOA) | RET-101 (SOA) › Benefit Plan Design Recommendation | — | 3.52 |
| 289 | `Concepts/Investment Risk Applicable.md` | — | 1 (1) | 0 / 0 | 9% | RET-101 (SOA) | RET-101 (SOA) › Benefit Plan Design Recommendation | — | 3.52 |
| 290 | `Concepts/Labor Force Demographics.md` | — | 1 (1) | 0 / 0 | 9% | RET-101 (SOA) | RET-101 (SOA) › Benefit Plan Design Recommendation | — | 3.52 |
| 291 | `Concepts/Legal Cases-issues Included.md` | — | 1 (1) | 0 / 0 | 9% | GI-201 (SOA) | GI-201 (SOA) › Legal Environment | — | 3.52 |
| 292 | `Concepts/Life Insurance Reinsurance Arrangement.md` | — | 1 (1) | 0 / 0 | 9% | ILA-101 (SOA) | ILA-101 (SOA) › Introduction to Assets and Risk Management | — | 3.52 |
| 293 | `Concepts/Life Insurance Reserve.md` | — | 1 (1) | 0 / 0 | 9% | ILA-101 (SOA) | ILA-101 (SOA) › Introduction to Life and Annuity Valuation Concepts | — | 3.52 |
| 294 | `Concepts/Mass Torts-class Action Suit.md` | — | 1 (1) | 0 / 0 | 9% | GI-201 (SOA) | GI-201 (SOA) › Legal Environment | — | 3.52 |
| 295 | `Concepts/Modern Mortality Table.md` | — | 1 (1) | 0 / 0 | 9% | ILA-101 (SOA) | ILA-101 (SOA) › Assumption Development and Experience Studies | — | 3.52 |
| 296 | `Concepts/Non-Claim Reserves Held.md` | — | 1 (1) | 0 / 0 | 9% | CP-321 (SOA) | CP-321 (SOA) › Reserving | — | 3.52 |
| 297 | `Concepts/Nonforfeiture.md` | — | 1 (1) | 0 / 0 | 9% | ILA-101 (SOA) | ILA-101 (SOA) › Individual Life and Annuity Product Design and Pricing | — | 3.52 |
| 298 | `Concepts/Normalize Population Claims Experience.md` | — | 1 (1) | 0 / 0 | 9% | GH-301 (SOA) | GH-301 (SOA) › Healthcare Risk Adjustment1 | — | 3.52 |
| 299 | `Concepts/Optional Form.md` | — | 1 (1) | 0 / 0 | 9% | RET-101 (SOA) | RET-101 (SOA) › Sponsor Risks | — | 3.52 |
| 300 | `Concepts/Organizational Structure.md` | — | 1 (1) | 0 / 0 | 9% | CP-312 (SOA) | CP-312 (SOA) › Model Governance | — | 3.52 |
| 301 | `Concepts/Parametric Estimator.md` | — | 1 (1) | 0 / 0 | 9% | GI-301 (SOA) | GI-301 (SOA) › Stochastic Reserving | — | 3.52 |
| 302 | `Concepts/Pension Valuation.md` | — | 1 (1) | 0 / 0 | 9% | RET-201 (SOA) | RET-201 (SOA) › Actuarial Assumptions | — | 3.52 |
| 303 | `Concepts/Plan Sponsor's Particular.md` | — | 1 (1) | 0 / 0 | 9% | RET-101 (SOA) | RET-101 (SOA) › Benefit Plan Design Recommendation | — | 3.52 |
| 304 | `Concepts/Portability Option.md` | — | 1 (1) | 0 / 0 | 9% | RET-101 (SOA) | RET-101 (SOA) › Sponsor Risks | — | 3.52 |
| 305 | `Concepts/Postponed Retirement.md` | — | 1 (1) | 0 / 0 | 9% | RET-101 (SOA) | RET-101 (SOA) › Sponsor Risks | — | 3.52 |
| 306 | `Concepts/Premium Deficiency Reserve.md` | — | 1 (1) | 0 / 0 | 9% | CP-321 (SOA) | CP-321 (SOA) › Reserving | — | 3.52 |
| 307 | `Concepts/Premium Persistency.md` | — | 1 (1) | 0 / 0 | 9% | ILA-101 (SOA) | ILA-101 (SOA) › Assumption Development and Experience Studies | — | 3.52 |
| 308 | `Concepts/Pricing Insurance Product.md` | — | 1 (1) | 0 / 0 | 9% | ILA-101 (SOA) | ILA-101 (SOA) › Individual Life and Annuity Product Design and Pricing | — | 3.52 |
| 309 | `Concepts/Pricing Practice.md` | — | 1 (1) | 0 / 0 | 9% | ILA-101 (SOA) | ILA-101 (SOA) › Individual Life and Annuity Product Design and Pricing | — | 3.52 |
| 310 | `Concepts/Promote Employee Behavior Consistent.md` | — | 1 (1) | 0 / 0 | 9% | RET-101 (SOA) | RET-101 (SOA) › Benefit Plan Design Recommendation | — | 3.52 |
| 311 | `Concepts/Public Sector Employer.md` | — | 1 (1) | 0 / 0 | 9% | RET-101 (SOA) | RET-101 (SOA) › Participant Risks | — | 3.52 |
| 312 | `Concepts/Replacement Income.md` | — | 1 (1) | 0 / 0 | 9% | RET-101 (SOA) | RET-101 (SOA) › Participant Risks | — | 3.52 |
| 313 | `Concepts/Reserve Variability.md` | — | 1 (1) | 0 / 0 | 9% | GI-301 (SOA) | GI-301 (SOA) › Stochastic Reserving | — | 3.52 |
| 314 | `Concepts/Retirement Plan Design.md` | — | 1 (1) | 0 / 0 | 9% | RET-101 (SOA) | RET-101 (SOA) › Benefit Plan Design Recommendation | — | 3.52 |
| 315 | `Concepts/Retirement Plans Sponsored.md` | — | 1 (1) | 0 / 0 | 9% | RET-101 (SOA) | RET-101 (SOA) › Participant Risks | — | 3.52 |
| 316 | `Concepts/Segmentation.md` | — | 1 (1) | 0 / 0 | 9% | ILA-101 (SOA) | ILA-101 (SOA) › Introduction to Assets and Risk Management | — | 3.52 |
| 317 | `Concepts/Single Employer Sponsored Retirement Plan.md` | — | 1 (1) | 0 / 0 | 9% | RET-101 (SOA) | RET-101 (SOA) › Participant Risks | — | 3.52 |
| 318 | `Concepts/Social Insurance Plan.md` | — | 1 (1) | 0 / 0 | 9% | RET-101 (SOA) | RET-101 (SOA) › Participant Risks | — | 3.52 |
| 319 | `Concepts/Stochastic Loss Development.md` | — | 1 (1) | 0 / 0 | 9% | GI-301 (SOA) | GI-301 (SOA) › Stochastic Reserving | — | 3.52 |
| 320 | `Concepts/Syllabus Resource.md` | — | 1 (1) | 0 / 0 | 9% | GI-201 (SOA) | GI-201 (SOA) › Legal Environment | — | 3.52 |
| 321 | `Concepts/Tax Incentive.md` | — | 1 (1) | 0 / 0 | 9% | RET-101 (SOA) | RET-101 (SOA) › Benefit Plan Design Recommendation | — | 3.52 |
| 322 | `Concepts/Taxpayers' Perspective.md` | — | 1 (1) | 0 / 0 | 9% | RET-101 (SOA) | RET-101 (SOA) › Benefit Plan Design Recommendation | — | 3.52 |
| 323 | `Concepts/Term Conversion.md` | — | 1 (1) | 0 / 0 | 9% | ILA-101 (SOA) | ILA-101 (SOA) › Assumption Development and Experience Studies | — | 3.52 |
| 324 | `Concepts/Term Insurance Reserve.md` | — | 1 (1) | 0 / 0 | 9% | ILA-101 (SOA) | ILA-101 (SOA) › Introduction to Life and Annuity Valuation Concepts | — | 3.52 |
| 325 | `Concepts/Tort Law Environment.md` | — | 1 (1) | 0 / 0 | 9% | GI-201 (SOA) | GI-201 (SOA) › Legal Environment | — | 3.52 |
| 326 | `Concepts/Tort Trend.md` | — | 1 (1) | 0 / 0 | 9% | GI-201 (SOA) | GI-201 (SOA) › Legal Environment | — | 3.52 |
| 327 | `Concepts/Transnational Tort Litigation.md` | — | 1 (1) | 0 / 0 | 9% | GI-201 (SOA) | GI-201 (SOA) › Legal Environment | — | 3.52 |
| 328 | `Concepts/US Company Tax Rule.md` | — | 1 (1) | 0 / 0 | 9% | ILA-201U (SOA) | ILA-201U (SOA) › Advanced Product Management | — | 3.52 |
| 329 | `Concepts/EU Solvency II Capital Requirement.md` | — | 1 (1) | 0 / 0 | 8% | GI-201 (SOA) | GI-201 (SOA) › Financial Health Measurement | — | 3.45 |
| 330 | `Concepts/Pricing Property Catastrophe Cover.md` | — | 1 (1) | 0 / 0 | 8% | GI-301 (SOA) | GI-301 (SOA) › Reinsurance | — | 3.45 |
| 331 | `Concepts/Risk Transfer Testing.md` | — | 1 (1) | 0 / 0 | 8% | GI-301 (SOA) | GI-301 (SOA) › Reinsurance | — | 3.45 |
| 332 | `Concepts/Uncertain Condition.md` | — | 1 (1) | 0 / 0 | 8% | CP-311 (SOA) | CP-311 (SOA) › Decision Modeling and Optimization | — | 3.45 |
| 333 | `Concepts/Expense Trending.md` | — | 1 (1) | 0 / 0 | 7% | GI-101 (SOA) | GI-101 (SOA) › Ratemaking | — | 3.41 |
| 334 | `Concepts/Fundamental Ratemaking.md` | — | 1 (1) | 0 / 0 | 7% | GI-101 (SOA) | GI-101 (SOA) › Ratemaking | — | 3.41 |
| 335 | `Concepts/Business Auto Coverage.md` | — | 2 (1) | 0 / 0 | — | DISC-RM (CAS) | DISC-RM (CAS) › 11. Underwriting Other Types of Coverage | — | 3.38 |
| 336 | `Concepts/Business Continuity Management.md` | — | 2 (1) | 0 / 0 | — | DISC-RM (CAS) | DISC-RM (CAS) › 3. Managing Business Continuity Risk | — | 3.38 |
| 337 | `Concepts/Cash Flow Requirement.md` | — | 1 (1) | 0 / 0 | 7% | RET-201 (SOA) | RET-201 (SOA) › Retirement Plan Investment and Risk Management | — | 3.38 |
| 338 | `Concepts/Clinical Policy Bulletin.md` | — | 1 (1) | 0 / 0 | 7% | GH-301 (SOA) | GH-301 (SOA) › Medical Data | — | 3.38 |
| 339 | `Concepts/Coding Structure.md` | — | 1 (1) | 0 / 0 | 7% | GH-301 (SOA) | GH-301 (SOA) › Medical Data | — | 3.38 |
| 340 | `Concepts/Cost Recognition.md` | — | 1 (1) | 0 / 0 | 7% | RET-201 (SOA) | RET-201 (SOA) › Methods | — | 3.38 |
| 341 | `Concepts/Cost Stability.md` | — | 1 (1) | 0 / 0 | 7% | RET-201 (SOA) | RET-201 (SOA) › Methods | — | 3.38 |
| 342 | `Concepts/Data Ethics.md` | — | 2 (1) | 0 / 0 | — | DISC-DA (CAS) | DISC-DA (CAS) › 10. Ethical and Societal Considerations of Data Analytics | — | 3.38 |
| 343 | `Concepts/Government Programs Providing Health Benefit.md` | — | 1 (1) | 0 / 0 | 7% | GH-201U (SOA) | GH-201U (SOA) › Government Programs | — | 3.38 |
| 344 | `Concepts/Insurance Distribution Systems.md` | — | 2 (1) | 0 / 0 | — | DISC-RM (CAS) | DISC-RM (CAS) › 7. Insurance Marketing and Distribution | — | 3.38 |
| 345 | `Concepts/Loss Settlement Provisions.md` | — | 2 (1) | 0 / 0 | — | DISC-IA (CAS) | DISC-IA (CAS) › 3. Common Policy Concepts | — | 3.38 |
| 346 | `Concepts/Medicaid Program Structure.md` | — | 1 (1) | 0 / 0 | 7% | GH-201U (SOA) | GH-201U (SOA) › Government Programs | — | 3.38 |
| 347 | `Concepts/Medical Coding.md` | — | 1 (1) | 0 / 0 | 7% | GH-301 (SOA) | GH-301 (SOA) › Medical Data | — | 3.38 |
| 348 | `Concepts/Medicare Benefit.md` | — | 1 (1) | 0 / 0 | 7% | GH-201U (SOA) | GH-201U (SOA) › Government Programs | — | 3.38 |
| 349 | `Concepts/Negligence.md` | — | 2 (1) | 0 / 0 | — | DISC-IA (CAS) | DISC-IA (CAS) › 14. Insurance Law Part 1 | — | 3.38 |
| 350 | `Concepts/Pension Benefit.md` | — | 1 (1) | 0 / 0 | 7% | RET-201 (SOA) | RET-201 (SOA) › Methods | — | 3.38 |
| 351 | `Concepts/Period of Restoration.md` | — | 2 (1) | 0 / 0 | — | DISC-RM (CAS) | DISC-RM (CAS) › 10. Underwriting Business Income and Commercial Liability Coverage | — | 3.38 |
| 352 | `Concepts/Periodic Valuation.md` | — | 1 (1) | 0 / 0 | 7% | RET-201 (SOA) | RET-201 (SOA) › Methods | — | 3.38 |
| 353 | `Concepts/Plan Sponsor Risk.md` | — | 1 (1) | 0 / 0 | 7% | RET-201 (SOA) | RET-201 (SOA) › Retirement Plan Investment and Risk Management | — | 3.38 |
| 354 | `Concepts/Prescription Drug.md` | — | 1 (1) | 0 / 0 | 7% | GH-101 (SOA) | GH-101 (SOA) › Plan and Product Provisions | — | 3.38 |
| 355 | `Concepts/Private Data.md` | — | 1 (1) | 0 / 0 | 7% | GH-301 (SOA) | GH-301 (SOA) › Medical Data | — | 3.38 |
| 356 | `Concepts/Product Development Process.md` | — | 1 (1) | 0 / 0 | 7% | GH-101 (SOA) | GH-101 (SOA) › Plan and Product Provisions | — | 3.38 |
| 357 | `Concepts/Revenue Code.md` | — | 1 (1) | 0 / 0 | 7% | GH-301 (SOA) | GH-301 (SOA) › Medical Data | — | 3.38 |
| 358 | `Concepts/Short Duration Contract.md` | — | 1 (1) | 0 / 0 | 7% | GH-101 (SOA) | GH-101 (SOA) › Plan and Product Provisions | — | 3.38 |
| 359 | `Concepts/Business Process.md` | — | 1 (1) | 0 / 0 | 7% | CFE-201 (SOA) | CFE-201 (SOA) › Managerial Accounting and Operational Excellence | — | 3.37 |
| 360 | `Concepts/Distort Perceived Performance.md` | — | 1 (1) | 0 / 0 | 7% | CFE-201 (SOA) | CFE-201 (SOA) › Managerial Accounting and Operational Excellence | — | 3.37 |
| 361 | `Concepts/Drive Decision Making.md` | — | 1 (1) | 0 / 0 | 7% | CFE-201 (SOA) | CFE-201 (SOA) › Managerial Accounting and Operational Excellence | — | 3.37 |
| 362 | `Concepts/Operational Excellence.md` | — | 1 (1) | 0 / 0 | 7% | CFE-201 (SOA) | CFE-201 (SOA) › Managerial Accounting and Operational Excellence | — | 3.37 |
| 363 | `Concepts/Operational Process.md` | — | 1 (1) | 0 / 0 | 7% | CFE-201 (SOA) | CFE-201 (SOA) › Managerial Accounting and Operational Excellence | — | 3.37 |
| 364 | `Concepts/Claim Transaction Data.md` | — | 1 (1) | 0 / 0 | 6% | GI-101 (SOA) | GI-101 (SOA) › Preparing Claims and Exposure Data for Actuarial Work | — | 3.33 |
| 365 | `Concepts/Influencing Average Premium Level.md` | — | 1 (1) | 0 / 0 | 6% | GI-101 (SOA) | GI-101 (SOA) › Preparing Claims and Exposure Data for Actuarial Work | — | 3.33 |
| 366 | `Concepts/ALM Failure.md` | — | 1 (1) | 0 / 0 | 6% | CP-351 (SOA) | CP-351 (SOA) › Objectives of Asset Liability Management | — | 3.32 |
| 367 | `Concepts/Crediting Rating Agency Framework.md` | — | 1 (1) | 0 / 0 | 6% | ILA-201U (SOA) | ILA-201U (SOA) › Management and Evaluation of Life Insurance Risks | — | 3.32 |
| 368 | `Concepts/Insurance Commissioners' Duty.md` | — | 1 (1) | 0 / 0 | 6% | GI-302 (SOA) | GI-302 (SOA) › U.S. General Insurance Regulation | — | 3.32 |
| 369 | `Concepts/Insurance Contracts Generate Embedded Option.md` | — | 1 (1) | 0 / 0 | 6% | CP-351 (SOA) | CP-351 (SOA) › Objectives of Asset Liability Management | — | 3.32 |
| 370 | `Concepts/Insurance Personnel.md` | — | 1 (1) | 0 / 0 | 6% | GI-302 (SOA) | GI-302 (SOA) › U.S. General Insurance Regulation | — | 3.32 |
| 371 | `Concepts/Lessons Learned.md` | — | 1 (1) | 0 / 0 | 6% | CP-351 (SOA) | CP-351 (SOA) › Objectives of Asset Liability Management | — | 3.32 |
| 372 | `Concepts/Licensing Requirement.md` | — | 1 (1) | 0 / 0 | 6% | GI-302 (SOA) | GI-302 (SOA) › U.S. General Insurance Regulation | — | 3.32 |
| 373 | `Concepts/Regulatory Body.md` | — | 1 (1) | 0 / 0 | 6% | GI-302 (SOA) | GI-302 (SOA) › U.S. General Insurance Regulation | — | 3.32 |
| 374 | `Concepts/Cognitive Biase.md` | — | 1 (1) | 0 / 0 | 5% | CP-311 (SOA) | CP-311 (SOA) › Organizational Behavior | — | 3.26 |
| 375 | `Concepts/Making Suboptimal Individual.md` | — | 1 (1) | 0 / 0 | 5% | CP-311 (SOA) | CP-311 (SOA) › Organizational Behavior | — | 3.26 |
| 376 | `Concepts/Organizational Behavior Plays.md` | — | 1 (1) | 0 / 0 | 5% | CP-311 (SOA) | CP-311 (SOA) › Organizational Behavior | — | 3.26 |
| 377 | `Concepts/Organizational Decision-Making.md` | — | 1 (1) | 0 / 0 | 5% | CP-311 (SOA) | CP-311 (SOA) › Organizational Behavior | — | 3.26 |
| 378 | `Concepts/Asian Option.md` | — | 1 (1) | 0 / 0 | 5% | INV-201 (SOA) | INV-201 (SOA) › Key Types of Derivatives | — | 3.25 |
| 379 | `Concepts/Butterfly Spread.md` | — | 1 (1) | 0 / 0 | 5% | INV-201 (SOA) | INV-201 (SOA) › Key Types of Derivatives | — | 3.25 |
| 380 | `Concepts/Call Spread.md` | — | 1 (1) | 0 / 0 | 5% | INV-201 (SOA) | INV-201 (SOA) › Key Types of Derivatives | — | 3.25 |
| 381 | `Concepts/Canadian Health Care System.md` | — | 1 (1) | 0 / 0 | 5% | GH-201C (SOA) | GH-201C (SOA) › Flow of Funds | — | 3.25 |
| 382 | `Concepts/Canadian Healthcare System.md` | — | 1 (1) | 0 / 0 | 5% | GH-201U (SOA) | GH-201U (SOA) › Flow of Funds | — | 3.25 |
| 383 | `Concepts/Central Clearing.md` | — | 1 (1) | 0 / 0 | 5% | INV-201 (SOA) | INV-201 (SOA) › Key Types of Derivatives | — | 3.25 |
| 384 | `Concepts/Collar.md` | — | 1 (1) | 0 / 0 | 5% | INV-201 (SOA) | INV-201 (SOA) › Key Types of Derivatives | — | 3.25 |
| 385 | `Concepts/Critical Illness.md` | — | 1 (1) | 0 / 0 | 5% | CP-321 (SOA) | CP-321 (SOA) › Plan and Product Provisions | — | 3.25 |
| 386 | `Concepts/Daily Margin Variation.md` | — | 1 (1) | 0 / 0 | 5% | INV-201 (SOA) | INV-201 (SOA) › Key Types of Derivatives | — | 3.25 |
| 387 | `Concepts/Daily Settle.md` | — | 1 (1) | 0 / 0 | 5% | INV-201 (SOA) | INV-201 (SOA) › Key Types of Derivatives | — | 3.25 |
| 388 | `Concepts/Derivative Instrument.md` | — | 1 (1) | 0 / 0 | 5% | INV-201 (SOA) | INV-201 (SOA) › Key Types of Derivatives | — | 3.25 |
| 389 | `Concepts/Derivatives Strategy.md` | — | 1 (1) | 0 / 0 | 5% | INV-201 (SOA) | INV-201 (SOA) › Key Types of Derivatives | — | 3.25 |
| 390 | `Concepts/Derivatives Trading.md` | — | 1 (1) | 0 / 0 | 5% | INV-201 (SOA) | INV-201 (SOA) › Key Types of Derivatives | — | 3.25 |
| 391 | `Concepts/Exchange Traded.md` | — | 1 (1) | 0 / 0 | 5% | INV-201 (SOA) | INV-201 (SOA) › Key Types of Derivatives | — | 3.25 |
| 392 | `Concepts/Exotic Option.md` | — | 1 (1) | 0 / 0 | 5% | INV-201 (SOA) | INV-201 (SOA) › Key Types of Derivatives | — | 3.25 |
| 393 | `Concepts/Floor.md` | — | 1 (1) | 0 / 0 | 5% | INV-201 (SOA) | INV-201 (SOA) › Key Types of Derivatives | — | 3.25 |
| 394 | `Concepts/Government-sponsored Plan.md` | — | 1 (1) | 0 / 0 | 5% | RET-201 (SOA) | RET-201 (SOA) › Valuations for the Purpose of Funding | — | 3.25 |
| 395 | `Concepts/IFRS 17, US GAAP.md` | — | 1 (1) | 0 / 0 | 5% | CP-321 (SOA) | CP-321 (SOA) › Insurer Financial Statements | — | 3.25 |
| 396 | `Concepts/Medicare Supplement.md` | — | 1 (1) | 0 / 0 | 5% | CP-321 (SOA) | CP-321 (SOA) › Plan and Product Provisions | — | 3.25 |
| 397 | `Concepts/Plan Asset Composition.md` | — | 1 (1) | 0 / 0 | 5% | RET-201 (SOA) | RET-201 (SOA) › Valuations for the Purpose of Funding | — | 3.25 |
| 398 | `Concepts/Put Spread.md` | — | 1 (1) | 0 / 0 | 5% | INV-201 (SOA) | INV-201 (SOA) › Key Types of Derivatives | — | 3.25 |
| 399 | `Concepts/SDOH Derived Statistics.md` | — | 1 (1) | 0 / 0 | 5% | GH-301 (SOA) | GH-301 (SOA) › Social Determinants of Health | — | 3.25 |
| 400 | `Concepts/Single-employer Plan.md` | — | 1 (1) | 0 / 0 | 5% | RET-201 (SOA) | RET-201 (SOA) › Valuations for the Purpose of Funding | — | 3.25 |
| 401 | `Concepts/Social Security Disability Income Benefit.md` | — | 1 (1) | 0 / 0 | 5% | CP-321 (SOA) | CP-321 (SOA) › Plan and Product Provisions | — | 3.25 |
| 402 | `Concepts/Stakeholders' Interest.md` | — | 1 (1) | 0 / 0 | 5% | RET-201 (SOA) | RET-201 (SOA) › Valuations for the Purpose of Funding | — | 3.25 |
| 403 | `Concepts/Straddle.md` | — | 1 (1) | 0 / 0 | 5% | INV-201 (SOA) | INV-201 (SOA) › Key Types of Derivatives | — | 3.25 |
| 404 | `Concepts/Strangle.md` | — | 1 (1) | 0 / 0 | 5% | INV-201 (SOA) | INV-201 (SOA) › Key Types of Derivatives | — | 3.25 |
| 405 | `Concepts/Swaption.md` | — | 1 (1) | 0 / 0 | 5% | INV-201 (SOA) | INV-201 (SOA) › Key Types of Derivatives | — | 3.25 |
| 406 | `Concepts/Traditional Actuarial Practice.md` | — | 1 (1) | 0 / 0 | 5% | GH-301 (SOA) | GH-301 (SOA) › Social Determinants of Health | — | 3.25 |
| 407 | `Concepts/Catastrophe Modeling Output.md` | — | 1 (1) | 0 / 0 | 3% | GI-301 (SOA) | GI-301 (SOA) › Catastrophe Models and Risk Loads | — | 3.18 |
| 408 | `Concepts/Commercial Auto Insurance.md` | — | 1 (1) | 0 / 0 | 3% | GI-302 (SOA) | GI-302 (SOA) › U.S. General Insurance Products and Coverages | — | 3.18 |
| 409 | `Concepts/Employers Liability Insurance.md` | — | 1 (1) | 0 / 0 | 3% | GI-302 (SOA) | GI-302 (SOA) › U.S. General Insurance Products and Coverages | — | 3.18 |
| 410 | `Concepts/ISO Commercial Automobile Policy.md` | — | 1 (1) | 0 / 0 | 3% | GI-302 (SOA) | GI-302 (SOA) › U.S. General Insurance Products and Coverages | — | 3.18 |
| 411 | `Concepts/ISO WC.md` | — | 1 (1) | 0 / 0 | 3% | GI-302 (SOA) | GI-302 (SOA) › U.S. General Insurance Products and Coverages | — | 3.18 |
| 412 | `Concepts/Insurance Actuarial Opinion.md` | — | 1 (1) | 0 / 0 | 3% | GI-201 (SOA) | GI-201 (SOA) › Responsibilities of the Actuary | — | 3.18 |
| 413 | `Concepts/International Actuarial Association.md` | — | 1 (1) | 0 / 0 | 3% | GI-201 (SOA) | GI-201 (SOA) › Responsibilities of the Actuary | — | 3.18 |
| 414 | `Concepts/International Business.md` | — | 1 (1) | 0 / 0 | 3% | GI-201 (SOA) | GI-201 (SOA) › General Insurance Company Operations | — | 3.18 |
| 415 | `Concepts/Peril.md` | — | 1 (1) | 0 / 0 | 3% | GI-201 (SOA) | GI-201 (SOA) › General Insurance Company Operations | — | 3.18 |
| 416 | `Concepts/Pricing General Insurance Policy.md` | — | 1 (1) | 0 / 0 | 3% | GI-201 (SOA) | GI-201 (SOA) › General Insurance Company Operations | — | 3.18 |
| 417 | `Concepts/Professionalism Principle.md` | — | 1 (1) | 0 / 0 | 3% | GI-201 (SOA) | GI-201 (SOA) › Responsibilities of the Actuary | — | 3.18 |
| 418 | `Concepts/Professionalism Required.md` | — | 1 (1) | 0 / 0 | 3% | GI-201 (SOA) | GI-201 (SOA) › Responsibilities of the Actuary | — | 3.18 |
| 419 | `Concepts/Risk Mitigation Instrument.md` | — | 1 (1) | 0 / 0 | 3% | GI-201 (SOA) | GI-201 (SOA) › General Insurance Company Operations | — | 3.18 |
| 420 | `Concepts/Specialty Insurance Coverage.md` | — | 1 (1) | 0 / 0 | 3% | GI-302 (SOA) | GI-302 (SOA) › U.S. General Insurance Products and Coverages | — | 3.18 |
| 421 | `Concepts/Surety.md` | — | 1 (1) | 0 / 0 | 3% | GI-302 (SOA) | GI-302 (SOA) › U.S. General Insurance Products and Coverages | — | 3.18 |
| 422 | `Concepts/Asset Adequacy Standard.md` | — | 1 (1) | 0 / 0 | 2% | CP-321 (SOA) | CP-321 (SOA) › Asset Adequacy | — | 3.11 |
| 423 | `Concepts/Asset Matching.md` | — | 1 (1) | 0 / 0 | 2% | CP-321 (SOA) | CP-321 (SOA) › Asset Adequacy | — | 3.11 |
| 424 | `Concepts/Cash Flow Projection.md` | — | 1 (1) | 0 / 0 | 2% | CP-321 (SOA) | CP-321 (SOA) › Asset Adequacy | — | 3.11 |
| 425 | `Concepts/Healthcare Claim.md` | — | 1 (1) | 0 / 0 | 2% | GH-301 (SOA) | GH-301 (SOA) › Predictive Analytics | — | 3.11 |
| 426 | `Concepts/Mismatched Asset.md` | — | 1 (1) | 0 / 0 | 2% | CP-321 (SOA) | CP-321 (SOA) › Asset Adequacy | — | 3.11 |
| 427 | `Concepts/Reinsurance Administration.md` | — | 1 (1) | 0 / 0 | 2% | CP-341 (SOA) | CP-341 (SOA) › Reinsurance Administration and Management | — | 3.11 |
| 428 | `Concepts/Reinsurance Counterparty Credit Risk.md` | — | 1 (1) | 0 / 0 | 2% | CP-341 (SOA) | CP-341 (SOA) › Reinsurance Administration and Management | — | 3.11 |
| 429 | `Concepts/Risk Score.md` | — | 1 (1) | 0 / 0 | 2% | GH-301 (SOA) | GH-301 (SOA) › Predictive Analytics | — | 3.11 |
| 430 | `Concepts/Actuary's Responsibility.md` | — | 1 (1) | 0 / 0 | 1% | GI-101 (SOA) | GI-101 (SOA) › Introduction and Key Considerations | — | 3.06 |
| 431 | `Concepts/Professionalism Requirement.md` | — | 1 (1) | 0 / 0 | 1% | GI-101 (SOA) | GI-101 (SOA) › Introduction and Key Considerations | — | 3.06 |
| 432 | `Concepts/Qualitative Information Required.md` | — | 1 (1) | 0 / 0 | 1% | GI-101 (SOA) | GI-101 (SOA) › Introduction and Key Considerations | — | 3.06 |
| 433 | `Concepts/Actual Cash Value.md` | — | 1 (1) | 0 / 0 | — | DISC-IA (CAS) | DISC-IA (CAS) › 3. Common Policy Concepts | — | 2.98 |
| 434 | `Concepts/Aircraft Insurance.md` | — | 1 (1) | 0 / 0 | — | DISC-IA (CAS) | DISC-IA (CAS) › 13. Specialty Coverages Part 2 | — | 2.98 |
| 435 | `Concepts/Blanket Insurance.md` | — | 1 (1) | 0 / 0 | — | DISC-IA (CAS) | DISC-IA (CAS) › 9. Commercial Property Insurance Part 2 | — | 2.98 |
| 436 | `Concepts/Commercial Crime Insurance.md` | — | 1 (1) | 0 / 0 | — | DISC-RM (CAS) | DISC-RM (CAS) › 10. Underwriting Business Income and Commercial Liability Coverage | — | 2.98 |
| 437 | `Concepts/Common Policy Conditions.md` | — | 1 (1) | 0 / 0 | — | DISC-IA (CAS) | DISC-IA (CAS) › 9. Commercial Property Insurance Part 2 | — | 2.98 |
| 438 | `Concepts/Conduct Investigative Testing.md` | — | 1 (1) | 0 / 0 | — | GI-101 (SOA) | GI-101 (SOA) › Analyze and Evaluate Real-Life Scenarios (Included in Topics 2, 3, 5 & 6) | — | 2.98 |
| 439 | `Concepts/Cyber Insurance.md` | — | 1 (1) | 0 / 0 | — | DISC-IA (CAS) | DISC-IA (CAS) › 13. Specialty Coverages Part 2 | — | 2.98 |
| 440 | `Concepts/Data Documentation.md` | — | 1 (1) | 0 / 0 | — | DISC-DA (CAS) | DISC-DA (CAS) › 1. Planning an Insurer Data Modeling Project | — | 2.98 |
| 441 | `Concepts/Data Mart.md` | — | 1 (1) | 0 / 0 | — | DISC-DA (CAS) | DISC-DA (CAS) › 3. Preparing Data for Analysis | — | 2.98 |
| 442 | `Concepts/Data Preparation.md` | — | 1 (1) | 0 / 0 | — | DISC-DA (CAS) | DISC-DA (CAS) › 9. Preparing Data for Insurance Applications | — | 2.98 |
| 443 | `Concepts/Data Validation.md` | — | 1 (1) | 0 / 0 | — | DISC-DA (CAS) | DISC-DA (CAS) › 3. Preparing Data for Analysis | — | 2.98 |
| 444 | `Concepts/Database Index.md` | — | 1 (1) | 0 / 0 | — | DISC-DA (CAS) | DISC-DA (CAS) › 3. Preparing Data for Analysis | — | 2.98 |
| 445 | `Concepts/Directors and Officers Liability Insurance.md` | — | 1 (1) | 0 / 0 | — | DISC-IA (CAS) | DISC-IA (CAS) › 12. Specialty Coverages Part 1 | — | 2.98 |
| 446 | `Concepts/Employment Practices Liability Insurance.md` | — | 1 (1) | 0 / 0 | — | DISC-IA (CAS) | DISC-IA (CAS) › 12. Specialty Coverages Part 1 | — | 2.98 |
| 447 | `Concepts/Environmental Insurance.md` | — | 1 (1) | 0 / 0 | — | DISC-IA (CAS) | DISC-IA (CAS) › 12. Specialty Coverages Part 1 | — | 2.98 |
| 448 | `Concepts/Fiduciary Liability Insurance.md` | — | 1 (1) | 0 / 0 | — | DISC-IA (CAS) | DISC-IA (CAS) › 12. Specialty Coverages Part 1 | — | 2.98 |
| 449 | `Concepts/Funding Requirement.md` | — | 1 (1) | 0 / 0 | — | GI-101 (SOA) | GI-101 (SOA) › Analyze and Evaluate Real-Life Scenarios (Included in Topics 2, 3, 5 & 6) | — | 2.98 |
| 450 | `Concepts/Health Insurance Plans.md` | — | 1 (1) | 0 / 0 | — | DISC-IA (CAS) | DISC-IA (CAS) › 7. Life and Health Insurance | — | 2.98 |
| 451 | `Concepts/Insurable Risk.md` | — | 1 (1) | 0 / 0 | — | DISC-IA (CAS) | DISC-IA (CAS) › 2. Insurance Policy Analysis | — | 2.98 |
| 452 | `Concepts/Insurance Marketing.md` | — | 1 (1) | 0 / 0 | — | DISC-RM (CAS) | DISC-RM (CAS) › 7. Insurance Marketing and Distribution | — | 2.98 |
| 453 | `Concepts/Insurer Goals and Constraints.md` | — | 1 (1) | 0 / 0 | — | DISC-RM (CAS) | DISC-RM (CAS) › 6. Overview of Insurance Operations | — | 2.98 |
| 454 | `Concepts/Insurtech.md` | — | 1 (1) | 0 / 0 | — | DISC-RM (CAS) | DISC-RM (CAS) › 6. Overview of Insurance Operations | — | 2.98 |
| 455 | `Concepts/Medical Payments Coverage.md` | — | 1 (1) | 0 / 0 | — | DISC-IA (CAS) | DISC-IA (CAS) › 4. Personal Auto Policy | — | 2.98 |
| 456 | `Concepts/Organizational Resilience.md` | — | 1 (1) | 0 / 0 | — | DISC-RM (CAS) | DISC-RM (CAS) › 3. Managing Business Continuity Risk | — | 2.98 |
| 457 | `Concepts/Premises Liability.md` | — | 1 (1) | 0 / 0 | — | DISC-IA (CAS) | DISC-IA (CAS) › 14. Insurance Law Part 1 | — | 2.98 |
| 458 | `Concepts/Premises and Operations Liability.md` | — | 1 (1) | 0 / 0 | — | DISC-RM (CAS) | DISC-RM (CAS) › 10. Underwriting Business Income and Commercial Liability Coverage | — | 2.98 |
| 459 | `Concepts/Products and Completed Operations Liability.md` | — | 1 (1) | 0 / 0 | — | DISC-RM (CAS) | DISC-RM (CAS) › 10. Underwriting Business Income and Commercial Liability Coverage | — | 2.98 |
| 460 | `Concepts/Real-Life Scenario.md` | — | 1 (1) | 0 / 0 | — | GI-101 (SOA) | GI-101 (SOA) › Analyze and Evaluate Real-Life Scenarios (Included in Topics 2, 3, 5 & 6) | — | 2.98 |
| 461 | `Concepts/SWOT Analysis.md` | — | 1 (1) | 0 / 0 | — | DISC-RM (CAS) | DISC-RM (CAS) › 15. Insurer Strategic Management | — | 2.98 |
| 462 | `Concepts/Self-Insurer.md` | — | 1 (1) | 0 / 0 | — | GI-101 (SOA) | GI-101 (SOA) › Analyze and Evaluate Real-Life Scenarios (Included in Topics 2, 3, 5 & 6) | — | 2.98 |
| 463 | `Concepts/Statistical Plan.md` | — | 1 (1) | 0 / 0 | — | DISC-DA (CAS) | DISC-DA (CAS) › 2. Collecting Data for Insurer Models | — | 2.98 |
| 464 | `Concepts/Strict Liability.md` | — | 1 (1) | 0 / 0 | — | DISC-IA (CAS) | DISC-IA (CAS) › 15. Insurance Law Part 2 | — | 2.98 |
| 465 | `Concepts/Structured Data.md` | — | 1 (1) | 0 / 0 | — | DISC-DA (CAS) | DISC-DA (CAS) › 4. Working With Different Types of Data | — | 2.98 |
| 466 | `Concepts/Table Join.md` | — | 1 (1) | 0 / 0 | — | DISC-DA (CAS) | DISC-DA (CAS) › 3. Preparing Data for Analysis | — | 2.98 |
| 467 | `Concepts/Terrorism Risk Insurance Program.md` | — | 1 (1) | 0 / 0 | — | DISC-IA (CAS) | DISC-IA (CAS) › 13. Specialty Coverages Part 2 | — | 2.98 |
| 468 | `Concepts/Types of Insurers.md` | — | 1 (1) | 0 / 0 | — | DISC-RM (CAS) | DISC-RM (CAS) › 6. Overview of Insurance Operations | — | 2.98 |
| 469 | `Concepts/Underwriting Authority.md` | — | 1 (1) | 0 / 0 | — | DISC-RM (CAS) | DISC-RM (CAS) › 8. The Underwriting Function | — | 2.98 |
| 470 | `Concepts/User-Defined Function.md` | — | 1 (1) | 0 / 0 | — | DISC-DA (CAS) | DISC-DA (CAS) › 3. Preparing Data for Analysis | — | 2.98 |
| 471 | `Concepts/Web Scraping.md` | — | 1 (1) | 0 / 0 | — | DISC-DA (CAS) | DISC-DA (CAS) › 3. Preparing Data for Analysis | — | 2.98 |

</details>

### Link fixes — the target is a variant of a page that exists

Writing a page would duplicate one. Each of these wants its guide link changed to the page (not done here: the task leaves the study guides alone). Top 60 by link count.

| Link target | Existing page | Links | Guides |
|---|---|---|---|
| `Annuity` | `Annuities` | 3 | 3 |
| `Decision Making` | `Decision-Making` | 3 | 2 |
| `Financial Statement` | `Financial Statements` | 3 | 3 |
| `Maximum Likelihood Estimator` | `Maximum Likelihood Estimation` | 2 | 2 |
| `Termination-windup` | `Plan Termination` | 2 | 1 |
| `Individual-joint Life Mortality` | `Joint Life` | 1 | 1 |
| `Maximum Likelihood Estimate` | `Maximum Likelihood Estimation` | 1 | 1 |
| `Hypothesis Test` | `Hypothesis Testing` | 1 | 1 |
| `Financial Report` | `Financial Reporting` | 1 | 1 |
| `Expense` | `Expenses` | 1 | 1 |
| `Long Term Insurance Coverage` | `Long-Term Insurance Coverage` | 1 | 1 |
| `Insurance-reinsurance` | `Reinsurance Accounting` | 1 | 1 |
| `Plan Termination-wind-Up` | `Plan Termination` | 1 | 1 |

### Cut-short links — the shown text plus its neighbours names an existing page

| Link target | Existing page | Links | In context |
|---|---|---|---|
| `Standard` | `Standards of Practice` | 11 | `comply with relevant [[Standard]] of practice` |
| `Value` | `Expected Value` | 6 | `calculate their expected [[Value]]` |
| `Return` | `Internal Rate of Return` | 5 | `internal rate of [[Return]]` |
| `Embedded` | `Embedded Value` | 5 | `options that are [[Embedded]] in life insurance` |
| `Principal Component` | `Principal Components Analysis` | 4 | `Apply [[Principal Component]] analysis to transform` |
| `Net` | `Net Present Value` | 3 | `[[Net]] present value` |
| `Claim Processing` | `Claims Processing Changes` | 3 | `[[Claim Processing]] changes` |
| `Generalized Linear` | `Generalized Linear Model` | 3 | `and validate a [[Generalized Linear]] model` |
| `Bornhuetter-Ferguson` | `Bornhuetter-Ferguson Method` | 3 | `> - [[Bornhuetter-Ferguson]]` |
| `Loss Elimination` | `Loss Elimination Ratio` | 2 | `Calculate and interpret [[Loss Elimination]] ratios` |
| `Likelihood` | `Likelihood Ratio Test` | 2 | `and [[Likelihood]] ratio` |
| `Enterprise Risk` | `Enterprise Risk Management` | 2 | `Recommend an appropriate [[Enterprise Risk]] management framework for` |
| `Ordinary` | `Ordinary Least Squares` | 2 | `model assumptions for [[Ordinary]] least squares and` |
| `Square` | `Ordinary Least Squares` | 2 | `for ordinary least [[Square]] and generalized linear` |
| `Chain-Ladder` | `Chain Ladder Method` | 2 | `> - [[Chain-Ladder]]` |
| `Multi-State` | `Multi-State Model` | 2 | `> - [[Multi-State]]` |
| `Replacement` | `Replacement Ratio` | 1 | `Calculate [[Replacement]] ratios for Defined` |
| `Linear Mixed` | `Linear Mixed Model` | 1 | `> - [[Linear Mixed]] models` |
| `Communication` | `Actuarial Communication` | 1 | `practice for actuarial [[Communication]]` |
| `Excess` | `Excess of Loss` | 1 | `of proportional and [[Excess]] of loss reinsurance` |
| `Scale` | `Scale and Shape Parameters` | 1 | `the role of [[Scale]] and shape parameters` |
| `Benktander` | `Benktander Method` | 1 | `[[Benktander]] method` |
| `Cape Cod` | `Cape Cod Method` | 1 | `[[Cape Cod]] method` |
| `Optimization` | `Price Optimization` | 1 | `regulation of price [[Optimization]]` |
| `IRIS` | `IRIS Ratios` | 1 | `NAIC RBC and [[IRIS]] Ratios` |
| `American Academy` | `American Academy of Actuaries` | 1 | `regulators and the [[American Academy]] of Actuaries` |
| `Statement` | `Statement of Actuarial Opinion` | 1 | `[[Statement]] of Actuarial Opinion` |
| `Opinion` | `Statement of Actuarial Opinion` | 1 | `Statement of Actuarial [[Opinion]] and the Actuarial` |
| `Link` | `Link Function` | 1 | `- Distributions and [[Link]] functions` |
| `Series` | `Time Series` | 1 | `Describe specific time [[Series]] models` |
| `Proportion` | `Proportion of Variance Explained` | 1 | `loading factors and [[Proportion]] of variance explained` |
| `Variance Explained` | `Proportion of Variance Explained` | 1 | `and proportion of [[Variance Explained]]` |
| `Compound Poisson` | `Compound Poisson Process` | 1 | `for sums of [[Compound Poisson]] models` |
| `Kolmogorov-Smirnov` | `Kolmogorov-Smirnov Test` | 1 | `including [[Kolmogorov-Smirnov]]` |
| `Chi-square Goodness-Of-Fit` | `Chi-Square Goodness-of-Fit Test` | 1 | `[[Chi-square Goodness-Of-Fit]]` |
| `Bühlmann-Straub` | `Bühlmann-Straub Credibility` | 1 | `Apply Bühlmann and [[Bühlmann-Straub]] models and understand` |
| `Limited Fluctuation` | `Limited Fluctuation Credibility` | 1 | `Perform calculations using [[Limited Fluctuation]]` |
| `Whole Life` | `Whole Life Insurance` | 1 | `variables associated with [[Whole Life]]` |
| `Health Care` | `Health Care Insurance` | 1 | `predictive analytics in [[Health Care]]` |
| `Workers Compensation` | `Workers Compensation Insurance` | 1 | `Describe the [[Workers Compensation]]` |
| `K-mean` | `K-Means Clustering` | 1 | `Apply [[K-mean]] and hierarchical clustering` |

### Ambiguous targets — for you to decide

| Target | Why | Links | Guides | Candidates | Proposed |
|---|---|---|---|---|---|
| `Limitation` | one word — the one existing page it begins is probably what is meant | 9 | CFE-101 (SOA), CP-312 (SOA), CP-321 (SOA), GH-101 (SOA) | Limitation Period | link `Limitation Period` |
| `Fund` | one word — the one existing page it begins is probably what is meant | 6 | GH-201C (SOA), GH-201U (SOA) | Fund Accumulation | link `Fund Accumulation` |
| `Stakeholder` | one word — the one existing page it begins is probably what is meant | 5 | CP-311 (SOA), CP-321 (SOA), GH-201C (SOA), GH-201U (SOA) | Stakeholder Reporting | link `Stakeholder Reporting` |
| `CCRC` | bare acronym — which expansion does this exam mean? | 4 | ALTAM (SOA) | Continuing Care Retirement Community | link `Continuing Care Retirement Community` |
| `Accuracy` | one word — the one existing page it begins is probably what is meant | 4 | ATPA (SOA), SRM (SOA) | Accuracy and Precision | link `Accuracy and Precision` |
| `Reserving` | one word — the one existing page it begins is probably what is meant | 4 | CP-321 (SOA), FAM (SOA), GH-201C (SOA), GH-201U (SOA) | Reserving Data Organization | link `Reserving Data Organization` |
| `US` | bare acronym — which expansion does this exam mean? | 4 | CP-341 (SOA), GH-201C (SOA), ILA-101 (SOA) | Underwriting Situation (new) | link `Underwriting Situation` (planned page) |
| `Class` | one word — the one existing page it begins is probably what is meant | 4 | FAM (SOA) | Class Action | link `Class Action` |
| `Provider` | one word — the one existing page it begins is probably what is meant | 4 | GH-201C (SOA), GH-201U (SOA), GH-301 (SOA) | Provider Reimbursement | link `Provider Reimbursement` |
| `Loading` | one word — the one existing page it begins is probably what is meant | 4 | GI-101 (SOA), SRM (SOA) | Loading Vector | link `Loading Vector` |
| `Equity` | one word — the one existing page it begins is probably what is meant | 4 | INV-101 (SOA), INV-201 (SOA) | Equity-Linked Insurance | link `Equity-Linked Insurance` |
| `Test` | one word — the one existing page it begins is probably what is meant | 3 | ASTAM (SOA), GI-301 (SOA), SRM (SOA) | Test Error | link `Test Error` |
| `Tax` | one word — the one existing page it begins is probably what is meant | 3 | CFE-201 (SOA), GI-302 (SOA), RET-101 (SOA) | Tax Treatment of Reinsurance | link `Tax Treatment of Reinsurance` |
| `Performance` | one word — the one existing page it begins is probably what is meant | 3 | CFE-201 (SOA), CP-311 (SOA), GH-301 (SOA) | Performance Measurement | link `Performance Measurement` |
| `Force` | one word — the one existing page it begins is probably what is meant | 3 | FAM (SOA) | Force of Interest | link `Force of Interest` |
| `FRE-802-19 - National Association of Insurance Commissioners (NAIC)` | sentence-length target | 3 | GI-302 (SOA) | — | — |
| `Offset` | one word — the one existing page it begins is probably what is meant | 3 | ILA-201I (SOA), ILA-201U (SOA), PA (SOA) | Offset Variable | link `Offset Variable` |
| `Forward` | one word — the one existing page it begins is probably what is meant | 3 | INV-201 (SOA) | Forward Rate | link `Forward Rate` |
| `Stress` | one word — the one existing page it begins is probably what is meant | 2 | ALTAM (SOA) | Stress Testing | link `Stress Testing` |
| `VaR` | bare acronym — which expansion does this exam mean? | 2 | CFE-101 (SOA) | — | — |
| `TVaR` | bare acronym — which expansion does this exam mean? | 2 | CFE-101 (SOA) | — | — |
| `Control` | one word — the one existing page it begins is probably what is meant | 2 | CFE-101 (SOA), CP-312 (SOA) | Control Variable | link `Control Variable` |
| `SQL` | bare acronym — which expansion does this exam mean? | 2 | DISC-DA (CAS) | — | — |
| `COPE` | bare acronym — which expansion does this exam mean? | 2 | DISC-RM (CAS) | — | — |
| `Put` | one word — the one existing page it begins is probably what is meant | 2 | FAM (SOA), INV-201 (SOA) | Put-Call Parity | link `Put-Call Parity` |
| `SDOH` | bare acronym — which expansion does this exam mean? | 2 | GH-301 (SOA) | — | — |
| `IAA` | bare acronym — which expansion does this exam mean? | 2 | GI-201 (SOA) | International Actuarial Association (new) | link `International Actuarial Association` (planned page) |
| `FAS` | bare acronym — which expansion does this exam mean? | 1 | ALTAM (SOA) | — | — |
| `CAE` | bare acronym — which expansion does this exam mean? | 1 | ALTAM (SOA) | — | — |
| `CARE` | bare acronym — which expansion does this exam mean? | 1 | ALTAM (SOA) | — | — |
| `PUC` | bare acronym — which expansion does this exam mean? | 1 | ALTAM (SOA) | — | — |
| `TUC` | bare acronym — which expansion does this exam mean? | 1 | ALTAM (SOA) | — | — |
| `Mixing` | one word — the one existing page it begins is probably what is meant | 1 | ASTAM (SOA) | Mixing Distribution | link `Mixing Distribution` |
| `Maximum` | one word — the one existing page it begins is probably what is meant | 1 | ASTAM (SOA) | Maximum Likelihood Estimation | link `Maximum Likelihood Estimation` |
| `SBC` | bare acronym — which expansion does this exam mean? | 1 | ASTAM (SOA) | — | — |
| `ETL` | bare acronym — which expansion does this exam mean? | 1 | ATPA (SOA) | — | — |
| `Univariate` | one word — the one existing page it begins is probably what is meant | 1 | ATPA (SOA) | Univariate Plot | link `Univariate Plot` |
| `Multivariate` | one word — the one existing page it begins is probably what is meant | 1 | ATPA (SOA) | Multivariate Distribution | link `Multivariate Distribution` |
| `EVA` | bare acronym — which expansion does this exam mean? | 1 | CFE-101 (SOA) | — | — |
| `Project` | one word — the one existing page it begins is probably what is meant | 1 | CFE-201 (SOA) | Projected Unit Credit Method | link `Projected Unit Credit Method` |
| `ESG` | bare acronym — which expansion does this exam mean? | 1 | CP-312 (SOA) | Economic Scenario Generator (new) | link `Economic Scenario Generator` (planned page) |
| `PVANYD` | bare acronym — which expansion does this exam mean? | 1 | CP-321 (SOA) | — | — |
| `ICOS` | bare acronym — which expansion does this exam mean? | 1 | CP-321 (SOA) | — | — |
| `Settlement` | one word — the one existing page it begins is probably what is meant | 1 | CP-321 (SOA) | Settlement Rate | link `Settlement Rate` |
| `Approximate` | one word — the one existing page it begins is probably what is meant | 1 | FAM (SOA) | Approximate Confidence Interval | link `Approximate Confidence Interval` |
| `Ultimate` | one word — the one existing page it begins is probably what is meant | 1 | FAM (SOA) | Ultimate Loss | link `Ultimate Loss` |
| `TRA` | bare acronym — which expansion does this exam mean? | 1 | GH-101 (SOA) | — | — |
| `ACO` | bare acronym — which expansion does this exam mean? | 1 | GH-301 (SOA) | Accountable Care Organization (new) | link `Accountable Care Organization` (planned page) |
| `CPT` | bare acronym — which expansion does this exam mean? | 1 | GH-301 (SOA) | — | — |
| `DRG` | bare acronym — which expansion does this exam mean? | 1 | GH-301 (SOA) | — | — |
| `Written` | one word — the one existing page it begins is probably what is meant | 1 | GI-101 (SOA) | Written Premium | link `Written Premium` |
| `CP` | bare acronym — which expansion does this exam mean? | 1 | GI-302 (SOA) | Call Premium, Call Price, Categorical Predictor, Coinsurance Percentage, Conditional Probability, Conjugate Prior, Convergence in Probability, Counting Process | — |
| `SEC` | bare acronym — which expansion does this exam mean? | 1 | GI-302 (SOA) | — | — |
| `IRR` | bare acronym — which expansion does this exam mean? | 1 | ILA-101 (SOA) | Individual Risk Rating, Interest Rate Risk, Internal Rate of Return | — |
| `ROE` | bare acronym — which expansion does this exam mean? | 1 | ILA-101 (SOA) | — | — |
| `DAC` | bare acronym — which expansion does this exam mean? | 1 | ILA-201U (SOA) | Deferred Acquisition Cost (new) | link `Deferred Acquisition Cost` (planned page) |
| `Diversification` | one word — the one existing page it begins is probably what is meant | 1 | ILA-201U (SOA) | Diversification Credit | link `Diversification Credit` |
| `Cap` | one word — the one existing page it begins is probably what is meant | 1 | INV-201 (SOA) | Cap on Non-Pecuniary Damages | link `Cap on Non-Pecuniary Damages` |
| `European` | one word — the one existing page it begins is probably what is meant | 1 | INV-201 (SOA) | European Option | link `European Option` |
| `American` | one word — the one existing page it begins is probably what is meant | 1 | INV-201 (SOA) | American Academy of Actuaries | link `American Academy of Actuaries` |
| `OTC` | bare acronym — which expansion does this exam mean? | 1 | INV-201 (SOA) | — | — |
| `PDE` | bare acronym — which expansion does this exam mean? | 1 | INV-201 (SOA) | — | — |
| `GMxB` | bare acronym — which expansion does this exam mean? | 1 | INV-201 (SOA) | — | — |
| `Sampling` | one word — the one existing page it begins is probably what is meant | 1 | PA (SOA) | Sampling Distribution | link `Sampling Distribution` |
| `Coefficient` | one word — the one existing page it begins is probably what is meant | 1 | PA (SOA) | Coefficient of Variation | link `Coefficient of Variation` |
| `Retirement` | one word — the one existing page it begins is probably what is meant | 1 | RET-101 (SOA) | Retirement Plan | link `Retirement Plan` |
| `Short-Term` | one word — the one existing page it begins is probably what is meant | 1 | RET-201 (SOA) | Short-Term Insurance Coverage | link `Short-Term Insurance Coverage` |
| `Equivalence` | one word — the one existing page it begins is probably what is meant | 1 | RET-301 (SOA) | Equivalence Principle | link `Equivalence Principle` |

### One-word targets that aren't terms of art (175)

Not batched. Most are a phrase cut short (`Call` for *call option*); a page named after the bare word would have nothing exam-specific to say. Promote one by adding it to `TERMS_OF_ART` in the script.

<details><summary>Show the list</summary>

`Insurance` (19), `Distribution` (14), `Organization` (14), `Contract` (11), `Loss` (10), `Regulation` (10), `Modeling` (9), `Option` (8), `Parameter` (8), `Life` (8), `Regulator` (7), `Quality` (6), `Liability` (6), `Flow` (6), `Catastrophe` (6), `Profit` (5), `Responsibility` (5), `Health` (5), `Investment` (5), `Projection` (5), `Contribution` (4), `Selection` (4), `Difference` (4), `Technology` (4), `Disclosure` (4), `Investor` (4), `Asset` (4), `Government` (4), `Coverage` (4), `Tail` (3), `Database` (3), `Allocation` (3), `Practice` (3), `Opportunity` (3), `Assumption` (3), `Biase` (3), `Senior` (3), `Employer` (3), `Call` (3), `Taxation` (3), `Count-Based` (3), `Classification` (3), `Experience` (3), `Ito` (3), `Participant` (3), `Recommendation` (3), `Estimation` (2), `Dependence` (2), `Linear` (2), `Tree-Based` (2), `Documentation` (2), `Measurement` (2), `Transfer` (2), `Acquisition` (2), `Interrelationship` (2), `Evolving` (2), `Learning` (2), `Canadian` (2), `Mean` (2), `Curtate` (2), `non-IBNR` (2), `Patient` (2), `Physician` (2), `Uncertainty` (2), `Non-Guaranteed` (2), `Mitigation` (2), `Determination` (2), `Profitability` (2), `Assessment` (2), `Regression` (2), `Contradiction` (2), `Comparison` (2), `Cluster` (2), `Markov` (1), `Two-Term` (1), `Independence` (1), `Gain` (1), `Multiplication` (1), `Constant` (1), `Exponentiation` (1), `Derivation` (1), `Rounding` (1), `Score-based` (1), `Poisson` (1), `Manipulation` (1), `Load` (1), `Collection` (1), `Deletion` (1), `Circumstance` (1), `Prediction` (1), `Blending` (1), `Stability` (1), `Fairness` (1), `Connection` (1), `Ethics` (1), `Suitability` (1), `Audience` (1), `Agency` (1), `Compliance` (1), `Audit` (1), `Entity` (1), `Property` (1), `Avoidance` (1), `Acceptance` (1), `Reduction` (1), `Non-Financial` (1), `Gauge` (1), `Chain` (1), `Internal-organic` (1), `Science` (1), `Quantification` (1), `Efficacy` (1), `Human` (1), `Maintenance` (1), `Motivation` (1), `Employee` (1), `Ceding` (1), `Administering` (1), `Investing` (1), `M-Thly` (1), `Light` (1), `Fair` (1), `Payer` (1), `Cost-Effective` (1), `Program` (1), `Saving` (1), `Methodology` (1), `Disease` (1), `ICD-10` (1), `Research` (1), `Healthcare` (1), `Cycle` (1), `Count` (1), `Prior` (1), `Adequacy` (1), `Influence` (1), `Core` (1), `Marketing` (1), `Protection` (1), `Discrimination` (1), `Mechanism` (1), `Country` (1), `Reporting` (1), `Monitoring` (1), `Resource` (1), `Attribute` (1), `Passive-active` (1), `Risk-Return` (1), `Swap` (1), `Currency` (1), `Bermudan` (1), `Replication` (1), `Lemma` (1), `Normalization` (1), `Expectation` (1), `Fitting` (1), `Greek` (1), `Complexity` (1), `Graph` (1), `Integration` (1), `Non-Vested` (1), `Elderly` (1), `Temporary` (1), `Permanent` (1), `Tradeoff` (1), `Feasibility` (1), `Consistent` (1), `Restriction` (1), `Conflict` (1), `Pattern` (1), `Interpretation` (1), `Sensitivity` (1), `Shareholder` (1), `Training` (1), `Algorithm` (1)

</details>

### Link noise (261)

Targets that name no concept. The fix is to unlink them (in `scripts/syllabus_write.py`'s linker), not to write pages.

<details><summary>Show the list</summary>

`Data` (33), `Business` (18), `Benefit` (17), `Plan` (14), `Development` (14), `Principle` (13), `Strategy` (11), `Cost` (10), `Pricing` (10), `Policy` (9), `Rate` (9), `Structure` (9), `Appropriateness` (9), `United State` (9), `Sponsor'` (9), `Multiple` (7), `Feature` (7), `Variety` (7), `Common` (6), `Derivative` (6), `Financial` (6), `Product` (6), `Respect` (5), `Predictive` (5), `Regulatory` (5), `Strategic` (5), `Statutory` (5), `Process` (5), `Parametric` (4), `Statistical` (4), `Output` (4), `Report` (4), `Environmental` (4), `Economic` (4), `Creation` (4), `Managerial` (4), `Actual` (4), `Form` (4), `Tool` (4), `Complete` (4), `Provide` (4), `System` (4), `Good` (4), `Requirement` (4), `Applicable` (4), `Defend` (4), `Context` (4), `Ethical` (3), `Account` (3), `Operational` (3), `Reduce Risk` (3), `Order` (3), `Situation` (3), `Viewpoint` (3), `Project Financial` (3), `Range` (3), `Required` (3), `Challenge` (3), `Ability` (3), `Perspective` (3), `Modeled` (2), `Meet` (2), `Benefits Payable` (2), `Best` (2), `Graphical` (2), `Particular` (2), `Action` (2), `Record` (2), `Business Context` (2), `Aspect` (2), `Acceptable` (2), `Group` (2), `Organization's Ability` (2), `Framework` (2), `Fundamental` (2), `Quantitative` (2), `Contracts Described` (2), `Traditional` (2), `Jurisdiction` (2), `Single Non-Dividend Paying Asset` (2), `Survival` (2), `Annual` (2), `Medical` (2), `Applicable Law` (2), `Social` (2), `Establish` (2), `Physicians Play` (2), `Hospital` (2), `Provider Systems Compete` (2), `Manner` (2), `Public` (2), `Study` (2), `Frame` (2), `Component` (2), `Activity` (2), `Design` (2), `Future` (2), `Hedged` (2), `Member` (2), `Analyze-synthesize` (2), `Ii` (1), `Version` (1), `Source` (1), `Accrued` (1), `Funded` (1), `Deterministic` (1), `Parameters Affect` (1), `Power` (1), `Model` (1), `Sum` (1), `Normal` (1), `Nonparametric` (1), `Semiparametric` (1), `Mack'` (1), `Analytical` (1), `Extract` (1), `Transform` (1), `Skill` (1), `Subset` (1), `Otherwise Modify Data` (1), `Exploratory` (1), `Final Product` (1), `Affect Data Quality` (1), `Merge` (1), `Clean` (1), `Flag` (1), `Biases Introduced` (1), `Additive` (1), `Analytical Effort` (1), `Computational Efficiency` (1), `Effect` (1), `Repeated` (1), `Input` (1), `Lack` (1), `Recommended Analytics` (1), `Ethical Context` (1), `Clear` (1), `Straightforward Manner` (1), `Common Language` (1), `Effective Manner While` (1), `Foundation` (1), `Driver` (1), `People` (1), `Collaborate` (1), `Successful Risk` (1), `Common Risk` (1), `Meets Organizational Need` (1), `Response` (1), `Consideration` (1), `Third Party` (1), `Conceptual` (1), `Unusual` (1), `Questionable` (1), `Help` (1), `Business Situation` (1), `Incorporated` (1), `Incentive` (1), `Nested` (1), `Address Issues Common` (1), `Purpose` (1), `Amount` (1), `Yet` (1), `Course` (1), `Incurred` (1), `Reported` (1), `Demographic` (1), `Automatic` (1), `Advantage` (1), `Disadvantage` (1), `Party` (1), `Reduce` (1), `Company'` (1), `Difficulty` (1), `Year` (1), `Proportional` (1), `Claim Amounts Paid` (1), `Continuous` (1), `Characterize Distribution` (1), `Existence` (1), `Collective` (1), `Truncated` (1), `Practical` (1), `Classical` (1), `Binomial` (1), `Continuous Payment Frequency` (1), `Term` (1), `Dental` (1), `Vision` (1), `Claim Data` (1), `Short` (1), `Entry` (1), `Chronic` (1), `Question` (1), `Estimate` (1), `Segregated` (1), `Aggregated` (1), `Future Cost` (1), `Regard` (1), `Earned` (1), `Period` (1), `Captive` (1), `Apply` (1), `Depending` (1), `Fitted` (1), `Output Produced` (1), `Affect` (1), `Category` (1), `Affect Commercial Insurance Premium` (1), `Employers Liability Insurance Policy Address` (1), `Premium Adjustments Affect WC Insurance` (1), `Regulatory Activity` (1), `Maintain` (1), `Applicable Standard` (1), `Carry` (1), `Nature` (1), `Commercial` (1), `Distinction` (1), `Bound` (1), `Integral` (1), `Market` (1), `Static` (1), `Interplay` (1), `Realized` (1), `Fail` (1), `Cannot` (1), `Basis` (1), `Descriptive` (1), `Prescriptive Analytics Apply` (1), `Vague Question` (1), `Next` (1), `Structured` (1), `Variable` (1), `Add` (1), `Weight` (1), `Prune` (1), `Accrual` (1), `Vested` (1), `Early` (1), `Adversely Affect` (1), `Particular Plan Feature` (1), `Address` (1), `Pro` (1), `Con` (1), `Reduce Sponsor Risk` (1), `Apply-synthesize` (1), `Arise` (1), `Open` (1), `Closed` (1), `Economic Environments Affect Setting Investment Strategy` (1), `Provide Advice` (1), `Principles Applicable` (1), `Special` (1), `Classify` (1), `Supervised` (1), `Appropriate` (1), `Differ Compared` (1), `Autoregressive` (1), `Pruned` (1), `Predict` (1), `Relative` (1), `Number` (1)

</details>

### Acronyms merged into their spelled-out concept

`NAIC` → `FRE-802-19 - National Association of Insurance Commissioners (NAIC)`

### Missing resource pages (632)

Linked only from a Source Material shelf — a `Resources/Books/` reading, written to `docs/resource-pages.md` from the real document, not a concept page. Out of scope for this plan.

<details><summary>Show the list</summary>

- `Group Insurance (Skwire - 2021)` — CP-321 (SOA), GH-101 (SOA), GH-201C (SOA), GH-201U (SOA)
- `ASOP 41 - Actuarial Communications` — CP-321 (SOA), GH-101 (SOA), GH-201U (SOA), GH-301 (SOA)
- `Fundamentals of General Insurance Actuarial Analysis (Friedland - 2022)` — GI-101 (SOA), GI-201 (SOA), GI-301 (SOA)
- `Actuarial Mathematics for Life Contingent Risks (Dickson - 2020)` — ALTAM (SOA), FAM (SOA)
- `Loss Models - From Data to Decisions (Klugman - 2019)` — ASTAM (SOA), FAM (SOA)
- `Introduction to Ratemaking and Loss Reserving for Property and Casualty Insurance (Brown - 2022)` — ASTAM (SOA), FAM (SOA)
- `Financial Enterprise Risk Management (Sweeting - 2017)` — CFE-101 (SOA), CP-351 (SOA)
- `Quantitative Enterprise Risk Management (Hardy - 2022)` — CFE-101 (SOA), CP-351 (SOA)
- `IFRS 17 Insurance Contract Examples` — CP-321 (SOA), GH-201C (SOA)
- `Life (Health & Annuity Reinsurance - 2015)` — CP-341 (SOA), ILA-101 (SOA)
- `Pension Risk Transfer in Canada and the U.S (SOA Research Institute - 2022)` — CP-341 (SOA), ILA-101 (SOA)
- `Understanding the Connection Between Real-World and Risk-Neutral Generators (SOA Research - 2022)` — CP-351 (SOA), INV-201 (SOA)
- `Video - Valuation at the Heart of Health Insurance` — GH-201C (SOA), GH-201U (SOA)
- `Video - Health Valuation and Stakeholder Views` — GH-201C (SOA), GH-201U (SOA)
- `GH201-100-25 - Health Reserves` — GH-201C (SOA), GH-201U (SOA)
- `CIA Educational Note - IFRS 17 Coverage Units for Life and Health Insurance Contracts (2022)` — GH-201C (SOA), ILA-201I (SOA)
- `GH201-101-25 - Group and Health Reinsurance – A Primer for Actuaries` — GH-201C (SOA), GH-201U (SOA)
- `Canadian Insurance Taxation (Swales - 2015)` — GH-201C (SOA), ILA-201I (SOA)
- `GH201-102-25 - Flow of Funds in Healthcare System and the Role of Providers` — GH-201C (SOA), GH-201U (SOA)
- `GH201-103-25 - Health Economics and Financing` — GH-201C (SOA), GH-201U (SOA)
- `CIA - 2014)` — GH-201C (SOA), GH-201U (SOA)
- `Risk Transfer Practice Note (AAA - 2022)` — GI-301 (SOA), GI-302 (SOA)
- `Regulatory Capital Adequacy for Life Insurance Companies - A Comparison of Four Jurisdictions (SOA Research Institute - 2023)` — ILA-101 (SOA), ILA-201I (SOA)
- `A Multi-Stakeholder Approach to Capital Adequacy (Conning Research)` — ILA-201I (SOA), ILA-201U (SOA)
- `Economic Capital for Life Insurance Companies (SOA Research Paper - 2016)` — ILA-201I (SOA), ILA-201U (SOA)
- `ILA201-100-25 - Diversification - Consideration on Modelling Aspects & Related Fungibility and Transferability` — ILA-201I (SOA), ILA-201U (SOA)
- `Rating Agency Perspectives on Insurance Company Capital (SOA Research Institute - 2023)` — ILA-201I (SOA), ILA-201U (SOA)
- `ILA201-101-25 - Life in-force Management - Improving Consumer Value and Long-Term Profitability` — ILA-201I (SOA), ILA-201U (SOA)
- `ILA201-102-25 - Economics of Insurance - How Insurers Create Value for Shareholders` — ILA-201I (SOA), ILA-201U (SOA)
- `Mechanics of Dividends (SOA Research Institute - 2022)` — ILA-201I (SOA), ILA-201U (SOA)
- `Embedded Value - Practice and Theory (Actuarial Practice Forum - 2009)` — ILA-201I (SOA), ILA-201U (SOA)
- `Regression Modeling with Actuarial and Financial Applications (Frees - 2010)` — PA (SOA), SRM (SOA)
- `Pension Risk Transfer - Evaluating Impact and Barriers for De-Risking Strategies (SOA - 2021)` — RET-101 (SOA), RET-201 (SOA)
- `Actuarial Standard of Practice No. 20 Discounting of Property Casualty Claim Estimates (ASB - 2023)` — 6U (CAS)
- `Actuarial Standard of Practice No. 36 Statements of Actuarial Opinion on P&C Loss Reserves (ASB - 2024)` — 6U (CAS)
- `Actuarial Standard of Practice No. 41 Actuarial Communications (ASB - 2010)` — 6U (CAS)
- `Estimating the Uncollectible Reinsurance Reserve for PC Companies New GAAP Requirements (AAA - 2019)` — 6U (CAS)
- `Retained Property Casualty Insurance Related Risk Interaction of Actuarial Analysis and Accounting (AAA - 2018)` — 6U (CAS)
- `Materiality Concepts on Professionalism (AAA - 2006)` — 6U (CAS)
- `Risk of Material Adverse Deviation Study Note (Brandt & Maxwell - 2023)` — 6U (CAS)
- `Regulatory Review of Predictive Models White Paper (CASTF - 2020)` — 6U (CAS)
- `Reinsurance Accounting and Strategy for the Actuary (Cedar & Thompson - 2020)` — 6U (CAS)
- `Nuclear Verdicts Tort Liability and Legislative Responses (Cole & Marzen - 2023)` — 6U (CAS)
- `Statements of Actuarial Opinion on Property and Casualty Loss Reserves Practice Note (COPLFR - 2024)` — 6U (CAS)
- `Personal Insurance (Cook - 2013)` — 6U (CAS)
- `2024 Excess and Surplus Lines Laws Manual (Emmanuel & Lerner - 2024)` — 6U (CAS)
- `Annual Report on the Insurance Industry Dodd-Frank (FIO - 2024)` — 6U (CAS)
- `Rating Agencies (Feldblum - 2011)` — 6U (CAS)
- `Statutory Surplus Computation Pricing and Valuation (Feldblum - 2003)` — 6U (CAS)
- `Accounting Standards Codification 944 Financial Guarantee Insurance Contracts (FASB - 2011)` — 6U (CAS)
- `FHCF 2024 Annual Report (SBA Florida - 2024)` — 6U (CAS)
- `Common Pitfalls and Practical Considerations in Risk Transfer Analysis (Freihaut & Vendetti - 2009)` — 6U (CAS)
- `Private Flood Insurance and the National Flood Insurance Program (Horn & Webel - 2023)` — 6U (CAS)
- `Reinsurance Commutation (Klann - 2013)` — 6U (CAS)
- `NAIC Public Hearing on Credit-Based Insurance Scores (Kucera - 2009)` — 6U (CAS)
- `Testimony on the Impact of Credit-Based Insurance Scoring (McCarty - 2008)` — 6U (CAS)
- `2025 Annual Statement Instructions Insurance Expense Exhibit (NAIC - 2025)` — 6U (CAS)
- `The U.S. National State-Based System of Insurance Regulation and the Solvency Modernization Initiative (NAIC - 2013)` — 6U (CAS)
- `Accounting Practices and Procedures Manual Preamble (NAIC - 2025)` — 6U (CAS)
- `SSAP 5R Liabilities Contingencies and Impairment of Assets (NAIC - 2024)` — 6U (CAS)
- `SSAP 9 Subsequent Events (NAIC - 2024)` — 6U (CAS)
- `SSAP 53 Property Casualty Contracts Premiums (NAIC - 2024)` — 6U (CAS)
- `SSAP 55 Unpaid Claims Losses and Loss Adjustment Expenses (NAIC - 2024)` — 6U (CAS)
- `SSAP 62R Property and Casualty Reinsurance (NAIC - 2024)` — 6U (CAS)
- `SSAP 63 Underwriting Pools (NAIC - 2024)` — 6U (CAS)
- `SSAP 65 Property and Casualty Contracts (NAIC - 2024)` — 6U (CAS)
- `SSAP 66 Retrospectively Rated Contracts (NAIC - 2024)` — 6U (CAS)
- `NAIC Insurance Regulatory Information System IRIS Ratios Manual (NAIC - 2024)` — 6U (CAS)
- `Official 2024 NAIC Annual Statement Blanks Property and Casualty (NAIC - 2024)` — 6U (CAS)
- `NAIC Annual Statement Examples Allstate Liberty Mutual (NAIC - 2024)` — 6U (CAS)
- `Price Optimization White Paper (NAIC - 2015)` — 6U (CAS)
- `Risk Retention Groups (NAIC - 2023)` — 6U (CAS)
- `Financial Reporting Through the Lens of a Property Casualty Actuary (Odomirok et al. - 2020)` — 6U (CAS)
- `Insurance Regulation Chapters 2-8 (Porter - 2008)` — 6U (CAS)
- `Insurance Regulation Chapter 12 (Porter - 2008)` — 6U (CAS)
- `The Economic Crisis and Lessons from U.S. Insurance Regulation (Vaughn - 2009)` — 6U (CAS)
- `Terrorism Risk Insurance Overview and Issue Analysis (Webel - 2019)` — 6U (CAS)
- `ASOP 25 - Credibility Procedures (ASB - 2013)` — 8 (CAS)
- `Distributions for Actuaries (Bahnemann)` — 8 (CAS)
- `An Actuarial Note on the Credibility of Experience of a Single Private Passenger Car (Bailey and Simon - 1959)` — 8 (CAS)
- `From GLMs to Comprehensive Insurance Pricing: Techniques and Challenges (Chalk et al.)` — 8 (CAS)
- `Using Multi-Dimensional Credibility to Estimate Class Frequency Vectors (Couret and Venter - 2008)` — 8 (CAS)
- `Individual Risk Rating Study Note (Fisher et al. - 2019)` — 8 (CAS)
- `Individual Risk Rating Case Study (Fisher et al.)` — 8 (CAS)
- `Penalized Regression and Lasso Credibility (Holmes and Casotto - 2025)` — 8 (CAS)
- `CGL Experience and Schedule Rating Plan (ISO)` — 8 (CAS)
- `An Example of Credibility and Shifting Risk Parameters (Mahler - 1990)` — 8 (CAS)
- `ALTAM-21-23 - Variable Annuity Guarantees` — ALTAM (SOA)
- `ASTAM-21-26 - Outstanding Claims Reserves` — ASTAM (SOA)
- `ASTAM-22-23 - Chapter 5 of Quantitative Enterprise Risk Management` — ASTAM (SOA)
- `Advanced Topics in Predictive Analytics e-Learning Modules (SOA)` — ATPA (SOA)
- `Video - Introduction to CFE 101` — CFE-101 (SOA)
- `CFE101-100-25 - Placing a Value on Enterprise Risk` — CFE-101 (SOA)
- `CFE101-101-25 - IAA Note on ERM for Capital and Solvency Purposes in the Insurance Industry` — CFE-101 (SOA)
- `CFE101-102-25 - Leveraging COSO Across the Three Lines of Defenses` — CFE-101 (SOA)
- `CFE101-103-25 - ORSA and the Regulator` — CFE-101 (SOA)
- `CFE101-122-26 - The Changing Nature of Conduct Risk` — CFE-101 (SOA)
- `CFE101-105-25 - Agency Theory and Asymmetric Information` — CFE-101 (SOA)
- `CFE101-123-26 - The Complete Guide to Strategic Risk Management` — CFE-101 (SOA)
- `CIA Practice Resource Document - Risk Appetite (2021)` — CFE-101 (SOA)
- `CFE101-124-26 - Design` — CFE-101 (SOA)
- `Rating Agency Perspectives on Insurance Company Capital (SOA Research - 2023)` — CFE-101 (SOA)
- `Regulatory Risk and North American Insurance Organizations` — CFE-101 (SOA)
- `CFE101-108-25 - Managing Environmental` — CFE-101 (SOA)
- `CFE101-125-26 - How to Strategize in an Out-of-Control World` — CFE-101 (SOA)
- `CFE101-110-25 - IAA Paper - Importance of Climate-Related Risks for Actuaries` — CFE-101 (SOA)
- `CFE101-126-26 - Cyber Risk Management - Theories` — CFE-101 (SOA)
- `CFE101-127-26 - Artificial Intelligence Risk & Governance` — CFE-101 (SOA)
- `CFE101-111-25 - IAA Risk Book` — CFE-101 (SOA)
- `CFE101-112-25 - Internal Controls Toolkit` — CFE-101 (SOA)
- `CFE101-127-26 - Artificial Intelligence Risk and Governance` — CFE-101 (SOA)
- `CFE101-113-25 - Identifying and Evaluating Emerging Risks` — CFE-101 (SOA)
- `A New Approach for Managing Operational Risk` — CFE-101 (SOA)
- `CFE101-114-25 - Measurement and Modeling of Dependencies in Economic Capital` — CFE-101 (SOA)
- `CFE101-115-25 - How CEOs Can Mitigate Compounding Risks` — CFE-101 (SOA)
- `Reviewing Systemic Risk within the Insurance Industry (SOA - 2017)` — CFE-101 (SOA)
- `CFE101-116-25 - Western Australian Public Sector Financial Statements – Better Practice Guide - Tool 1 Example - Risk Analysis for Financial Statements` — CFE-101 (SOA)
- `CFE101-117-26 - Economic Capital Modeling-Practical Considerations` — CFE-101 (SOA)
- `Regulatory Capital Adequacy for Life Insurance Companies - A Comparison of Four Jurisdictions (SOA Research - 2025)` — CFE-101 (SOA)
- `A New Approach for Managing Operational Risk (SOA - 2010)` — CFE-101 (SOA)
- `CFE101-118-25 - What is Basis Risk Definition and Types of Basis Risk` — CFE-101 (SOA)
- `CFE101-119-25 - IAA Risk Book` — CFE-101 (SOA)
- `CFE101-120-25 - IAA Risk Book` — CFE-101 (SOA)
- `Corporate Pension Risk Management and Corporate Finance - Bridging the Gap between Theory and Practice in Pension Risk Management (2015)` — CFE-101 (SOA)
- `Embedded Value Calculation for a Life Insurance Company (Actuarial Practice Forum - 2006)` — CFE-101 (SOA)
- `Video - Introduction to CFE 201` — CFE-201 (SOA)
- `Valuation (Tim Koller - 2025)` — CFE-201 (SOA)
- `CFE201-100-23 - Hurdle Rate Definition` — CFE-201 (SOA)
- `International Reinsurance Landscape Overview for United States Life and Annuities (SOA Research Institute)` — CFE-201 (SOA)
- `CFE201-111-27 - Life & Annuity Reinsurance Sidecars - From Sidebar to Headline Topic` — CFE-201 (SOA)
- `CFE201-112-27 - Private Capital in Insurance 2.0 - Building a Flywheel` — CFE-201 (SOA)
- `CFE201-113-27 - Financial Risks in Mergers and Acquisitions - A Case Study of SolarCity's Acquisition by Tesla` — CFE-201 (SOA)
- `International Financial Statement Analysis (Robinson et al - 2020)` — CFE-201 (SOA)
- `CFE201-103-25 - Bank Profitability` — CFE-201 (SOA)
- `Accounting for Decision Making and Control (Zimmerman - 2020)` — CFE-201 (SOA)
- `CFE201-106-25 - Procurement` — CFE-201 (SOA)
- `CFE201-107-25 - Financial Institutions and Nonfinancial Risk - How Corporates Build Resilience` — CFE-201 (SOA)
- `CFE201-108-25 - When Nothing is Normal Managing in Extreme Uncertainty` — CFE-201 (SOA)
- `CFE201-114-27 - Managing Allocations Effectively in the Insurance Sector` — CFE-201 (SOA)
- `CFE201-115-27 - Reorganizing to Capture Maximum Value Quickly` — CFE-201 (SOA)
- `Fundamentals of Machine Learning for Predictive Data Analytics (Kelleher - 2020)` — CFE-201 (SOA)
- `Decentralized Finance for Actuaries (SOA Research Institute - 2022)` — CFE-201 (SOA)
- `Decentralized Insurance Alternatives - Market Landscape (Opportunities and Challenges - 2022)` — CFE-201 (SOA)
- `Peer-to-Peer Insurance - Blockchain Implications (SOA - 2021)` — CFE-201 (SOA)
- `CFE201-116-27 - A Method for Estimating the Price of Stablecoin Insurance` — CFE-201 (SOA)
- `CFE201-117-27 - AI Agents vs. Agentic AI - A Conceptual Taxonomy` — CFE-201 (SOA)
- `CFE201-118-27 - Seizing the Agentic AI Advantage` — CFE-201 (SOA)
- `CFE201-119-27 - How Insurers Can Supercharge Their Strategy with AI` — CFE-201 (SOA)
- `CFE201-120-27 - How AI Could Reshape the Economics of the Asset Management Industry` — CFE-201 (SOA)
- `Strategic Management - Concepts and Cases - Competitiveness and Globalization (Concepts - 2023)` — CP-311 (SOA)
- `Understanding Michael Porter (Harvard Business Review Press - 2012)` — CP-311 (SOA)
- `CP311-101-25 - The Hard Side of Change Management` — CP-311 (SOA)
- `CP311-107-26 - A New Operating Model for a New World` — CP-311 (SOA)
- `CP311-108-26 - Tying Short Term Decisions to Long Term Strategy` — CP-311 (SOA)
- `Handbook of Budgeting (Lalli - 2012)` — CP-311 (SOA)
- `Valuation - Measuring and Managing the Value of Companies (Koller - 2025)` — CP-311 (SOA)
- `CP311-109-26 - Advanced FP&A Practices for a Volatile Macroeconomic and Business Environment` — CP-311 (SOA)
- `Damodaran on Valuation (Damodaran - 2006)` — CP-311 (SOA)
- `CP311-110-26 - Financial Valuation – Hitchner 5th Ed` — CP-311 (SOA)
- `Data (Bertsimas - 2004)` — CP-311 (SOA)
- `CP311-111-26 - Deciding How to Decide` — CP-311 (SOA)
- `CP311-112-26 - How Behaviors Impact Your Corporate Decision-Making` — CP-311 (SOA)
- `CP311-113-26 - Bazerman & Moore` — CP-311 (SOA)
- `CP311-105-25 - Capital Bias` — CP-311 (SOA)
- `CP311-106-25 - Chapter 19 of Quantitative Enterprise Risk Management` — CP-311 (SOA)
- `Video - Model Risk (SOA - 2024)` — CP-312 (SOA)
- `CP312-100-25 - Chapter 3 of Modelling in Life Insurance - A Management Perspective` — CP-312 (SOA)
- `Long-Term Actuarial Models Part II (Cardinal - 2024)` — CP-312 (SOA)
- `CP312-101-25 - Stochastic Modeling` — CP-312 (SOA)
- `Predictive Analytics and Machine Learning - Practical Applications for Actuarial Modeling (Nested Stochastic) (SOA Research Institute - 2023)` — CP-312 (SOA)
- `Considerations Regarding Dynamic Lapses in Actuarial Modeling (American Academy of Actuaries - 2023)` — CP-312 (SOA)
- `CP312-102-25 - Heavy Models` — CP-312 (SOA)
- `Metamodeling for Variable Annuities (Valdez)` — CP-312 (SOA)
- `Economic Scenario Generators - A Practical Guide (SOA - 2016)` — CP-312 (SOA)
- `Economic Scenario Generators – three-part series (SOA:)` — CP-312 (SOA)
- `CP312-112-26 - Here it GOES Again - Reviewing the NAIC's Second Industry Field Test of the Generator of Economic Scenarios` — CP-312 (SOA)
- `CP312-103-25 - Chapter 8 of Quantitative Enterprise Risk Management` — CP-312 (SOA)
- `CP312-104-25 - Chapter 7 of Derivatives Theory and Practice` — CP-312 (SOA)
- `CP312-105-25 - Chapter 9 of Asset-Liability Management of Financial Institutions` — CP-312 (SOA)
- `CP312-106-25 - Catastrophe Modelling - Guidance for Non-Catastrophe Modelers` — CP-312 (SOA)
- `CP312-113-26 - Importance of Climate-Related Risks for Actuaries` — CP-312 (SOA)
- `A Primer on Generative AI for Actuaries (2024)` — CP-312 (SOA)
- `CP312-114-26 - Rise of the Machines - Application of Machine Learning to Mortgage Pre-Payment Modeling` — CP-312 (SOA)
- `CP312-107-25 - A Financially Justifiable and Practically Implementable Approach to Coherent Stress Testing` — CP-312 (SOA)
- `CP312-109-25 - Chapter 7 (Sec. 7.2 only) of Modelling in Life Insurance - A Management Perspective` — CP-312 (SOA)
- `CIA Educational Note - Use of Models (2017)` — CP-312 (SOA)
- `CP312-115-26 - Guideline E23 – Model Risk Management` — CP-312 (SOA)
- `SOA - 2014)` — CP-312 (SOA)
- `Adding Value with Model Validation (The Modeling Platform - 2017)` — CP-312 (SOA)
- `CP312-111-25 - Machine Decisions - Governance of AI and Big Data Analytics` — CP-312 (SOA)
- `The Importance of Centralization of Actuarial Modeling Functions (The Modeling Platform - 2019)` — CP-312 (SOA)
- `The Importance of Centralization of Actuarial Modeling Functions (The Modeling Platform - 2020)` — CP-312 (SOA)
- `Individual Health Insurance (Leida - 2026)` — CP-321 (SOA)
- `Insuring Long-Term Care (Eaton - 2024)` — CP-321 (SOA)
- `Critical Illness Turns 40! (Health Watch - 2023)` — CP-321 (SOA)
- `CP321-100-25 - Issues to Consider in Self-Funding Long-Term Disability Insurance` — CP-321 (SOA)
- `CP321-102-25 - Short Term Disability Example` — CP-321 (SOA)
- `Issues In Applying Credibility to Group Long-Term Disability Insurance (2013)` — CP-321 (SOA)
- `Group Life Waiver Study Based on 2009-2015 Canadian Group LTD Termination Experience Report (CIA Study - 2009)` — CP-321 (SOA)
- `Best Estimate Assumption for Expenses (CIA Educational Note - 2006)` — CP-321 (SOA)
- `ASOP 18 - Long-Term Care` — CP-321 (SOA)
- `CP321-103-26 - Long-Term Care Insurance Multistate Rate Review Framework` — CP-321 (SOA)
- `CP321-101-25 - Pricing Medicare Supplement Benefits` — CP-321 (SOA)
- `CP321-104-25 - Practices for Preparing Health Contract Reserves` — CP-321 (SOA)
- `CP321-105-25 - Supplemental Comments (March 2022) for CP321-104-25` — CP-321 (SOA)
- `CP321-107-25 - Health Insurance Accounting Basics for Actuaries` — CP-321 (SOA)
- `CP321-106-25 - Excerpt from AAA Application of ASU 2018-12 to the Accounting for Long-Duration Contracts under U.S. GAAP` — CP-321 (SOA)
- `CP321-108-25 - ALM for Life` — CP-321 (SOA)
- `CP321-109-25 - Chapter 3 of Modelling in Life Insurance – A Management Perspective` — CP-321 (SOA)
- `ASOP 22 - Statements of Actuarial Opinion Based on Asset Adequacy Analysis for Life Insurance` — CP-321 (SOA)
- `CP321-113-25 - IAS 19 - A Primer on Non-Pension Benefit Accounting for Valuation Actuaries` — CP-321 (SOA)
- `CP321-111-25 - IAS19` — CP-321 (SOA)
- `Health Care Trend Rate (CIA Educational Note - 2012)` — CP-321 (SOA)
- `Setting the Accounting Discount Rate Assumption for Pension and Post-Employment Benefit Plans (CIA Educational Note - 2020)` — CP-321 (SOA)
- `Practice-Specific Standards for Non-Pension Employee Future Benefit Plans (Effective February 1 (2024)` — CP-321 (SOA)
- `CP321-114-25 - New Approaches Needed to Save Retiree Benefits` — CP-321 (SOA)
- `CP321-115-25 - Mercer Quick Poll - 2022 Post-Retirement Benefit Trends - Supporting a Challenging Labour Environment` — CP-321 (SOA)
- `CP321-116-25 - Retiree Health Benefits - Going` — CP-321 (SOA)
- `CP341-100-25 - The Essential Guide to Reinsurance` — CP-341 (SOA)
- `CP341-101-25 - Capital Markets Bureau Primer - Private Equity` — CP-341 (SOA)
- `CP341-102-25 - Number of Private Equity-Owned U.S. Insurers Remains Constant` — CP-341 (SOA)
- `CP341-103-25 - The Rising Tide of Offshore Life Reinsurance Raises Yellow Caution Flag` — CP-341 (SOA)
- `CP341-104-25 - Private Equity and Life Insurers` — CP-341 (SOA)
- `Life Reinsurance Treaty Recapture Provisions (SOA - 2020)` — CP-341 (SOA)
- `Risk Transfer Practice Note (2022)` — CP-341 (SOA)
- `CP341-105-25 - Lapse Risk and Capital Management Strategies - Back in the Spotlight` — CP-341 (SOA)
- `CP341-106-25 - Life and Annuity Reinsurance Sidecars - From Sidebar to Headline Topic` — CP-341 (SOA)
- `The Impact of BEAT on US Foreign Affiliated Reinsurance (Taxing Times - 2020)` — CP-341 (SOA)
- `CP341-107-25 - NAIC Model Laws - Credit for Reinsurance Model Law` — CP-341 (SOA)
- `Impacts of AG48 (Reinsurance News - 2015)` — CP-341 (SOA)
- `CP341-109-25 - Guide to Reciprocal Jurisdiction` — CP-341 (SOA)
- `CP341-110-25 - LICAT Guideline 2025` — CP-341 (SOA)
- `CP341-111-25 - OSFI Guideline B3` — CP-341 (SOA)
- `CP341-112-25 - IFRS 17 Pocket Guide on Reinsurance Contracts Held` — CP-341 (SOA)
- `Fully Reinsured Business - Are the Financial Implications Neutralized (The Financial Reporter - 2024)` — CP-341 (SOA)
- `CP341-113-25 - Supervision and Regulation of PE Insurers in Bermuda` — CP-341 (SOA)
- `CP341-114-25 - The Bermuda Monetary Authority's Approach to Private Equity-Owned (Re)insurers` — CP-341 (SOA)
- `CP341-115-25 - Solvency II Equivalence FAQs` — CP-341 (SOA)
- `Asset-Intensive Reinsurance Ceded Offshore from U.S. Life Insurers (With Focus on Bermuda) (AAA - 2024)` — CP-341 (SOA)
- `CP341-108-25 - The Heat is on for US Asset-Intensive Reinsurance Regulations` — CP-341 (SOA)
- `CP341-116-25 - Modernizing Reinsurance Administration` — CP-341 (SOA)
- `CP341-117-25 - Collateral Structures in the Bermuda Long-term Insurance Market` — CP-341 (SOA)
- `CP341-118-25 - Management of Collateralised Reinsurance` — CP-341 (SOA)
- `CP351-100-26 - IAA Risk Book - Asset Liability Management` — CP-351 (SOA)
- `CP351-101-25 - ALM for Life` — CP-351 (SOA)
- `CP351-102-25 - Case Study on General American Life Insurance Company` — CP-351 (SOA)
- `What Can Insurers and Pension Funds Learn from Bank Failures` — CP-351 (SOA)
- `CP351-115-26 - IAA Risk Book - ERM Insights from Failures and Near Failures` — CP-351 (SOA)
- `CP351-104-25 - Life Insurance Risk` — CP-351 (SOA)
- `CP351-105-25 - Chapter 16 of Asset-Liability Management of Financial Institutions` — CP-351 (SOA)
- `CP351-106-25 - Liability Driven Investment Explained Chapters 1-2` — CP-351 (SOA)
- `CP351-107-25 - Key Rate Durations - Measures of Interest Rate Risk` — CP-351 (SOA)
- `Fixed Income Securities - Tools for Today's Markets (Tuckman - 2022)` — CP-351 (SOA)
- `CP351-108-25 - Life Insurance Risk` — CP-351 (SOA)
- `Liquidity Risk (AAA - 2024)` — CP-351 (SOA)
- `Regulatory Capital Adequacy for Life Insurance Companies (SOA Research - 2023)` — CP-351 (SOA)
- `CP351-110-25 - New Frontiers - Backing Long-term Insurance Liabilities with Non-fixed-income Assets` — CP-351 (SOA)
- `CP351-106-25 - Liability Driven Investment Explained` — CP-351 (SOA)
- `Handbook of Asset and Liability Management (Zenios - 2007)` — CP-351 (SOA)
- `CP351-112-25 - The Devil is in the Tails - Actuarial Mathematics and the Subprime Mortgage Crisis` — CP-351 (SOA)
- `CP351-113-25 - Chapter 4 of ALM for Banks and Insurance Companies` — CP-351 (SOA)
- `Fixed Income Securities (Veronesi - 2010)` — CP-351 (SOA)
- `Video - The Variety of Short-Term Health and Group Benefits` — GH-101 (SOA)
- `Video - Plan Sponsor Perspective` — GH-101 (SOA)
- `Video - Actuarial Roles in Health` — GH-101 (SOA)
- `GH101-100-26 - Chapter 5 of Individual Health Insurance` — GH-101 (SOA)
- `Closing the Analytical Loop - Technology Assessments and Actuarial Methods (SOA Research Institute - 2025)` — GH-101 (SOA)
- `ASOP 25 - Credibility Procedures` — GH-101 (SOA)
- `GH101-102-25 - Types of COB and Impact on Medical Claim Data` — GH-101 (SOA)
- `GH101-101-25 - Illustrative Examples on Experience Rating and Funding Methods` — GH-101 (SOA)
- `The Role of the Actuary in Self-Insurance (2018)` — GH-101 (SOA)
- `Level Funding - An Alternative to ACA for Small Groups (Health Watch - 2016)` — GH-101 (SOA)
- `Modeling Effects of Enrollee Choice (SOA - 2021)` — GH-101 (SOA)
- `Calculated Risk - Driving Decisions Using the 5-50 Research (SOA Research - 2025)` — GH-101 (SOA)
- `GH101-103-25 - Health Plan Payroll Contribution Strategies and Development for Employers` — GH-101 (SOA)
- `GH101-106-25 - Ch. 2 & Ch. 24 of The Handbook of Employee Benefits` — GH-101 (SOA)
- `GH101-104-25 - Recommend an Employee Benefits Strategy` — GH-101 (SOA)
- `Consumers to the Rescue A Primer on HDHPs and HSAs (Health Watch - 2019)` — GH-101 (SOA)
- `A Practical Guide to Private Exchanges (Health Watch - 2015)` — GH-101 (SOA)
- `GH101-105-25 - Ch. 7 of Canadian Handbook of Flexible Benefits` — GH-101 (SOA)
- `CIA Educational Note - Valuation of Group Life and Health Policy Liabilities (2010)` — GH-201C (SOA)
- `Canadian Institute of Actuaries Standards of Practice - Insurance (2024)` — GH-201C (SOA)
- `GH201-693-26 - OSFI Guidelines for Life Insurance Capital Adequacy Test (LICAT) Read introductions to all chapters below` — GH-201C (SOA)
- `CIA Educational Note - Financial Condition Testing (2025)` — GH-201C (SOA)
- `CIA Educational Note - Sources of Earnings Calculations – Group Life and Health (2010)` — GH-201C (SOA)
- `Comparison of IFRS 17 to Current CIA Standards of Practice (2022)` — GH-201C (SOA)
- `CIA Explanatory Report - IFRS 17 Expenses (2024)` — GH-201C (SOA)
- `GH201-644-25 - TACCESS - An Advisor's Guide to Understanding How Taxes Impact Group Insurance Benefits in Canada` — GH-201C (SOA)
- `GH201-700-25 - Ch. 12 and 13 of Canadian Handbook of Flexible Benefits` — GH-201C (SOA)
- `GH201-661-25 - Employee Life and Health Trusts & Health and Welfare Trusts` — GH-201C (SOA)
- `GH201-637-25 - Ch. 16 and 17 of Canadian Life & Health Insurance Law` — GH-201C (SOA)
- `GH201-722-25 - Navigating Group Insurance Laws in Quebec` — GH-201C (SOA)
- `GH201-631-25 - Canadian Life & Health Insurance Association - The Protection of Personal Information - Some Questions and Answers` — GH-201C (SOA)
- `GH201-621-26 - CLHIA Guideline G3 - Group Life and Group Health Insurance` — GH-201C (SOA)
- `GH201-671-26 - CLHIA Guideline G4 - Coordination of Benefits-Group Health and Dental` — GH-201C (SOA)
- `GH201-672-25 - CLHIA Guideline G17 - Coordination of Benefits for Out-of-Country-Out-of-Province-Territory Medical Expenses` — GH-201C (SOA)
- `GH201-647-25 - Protecting Canadians' Long Term Disability Benefits` — GH-201C (SOA)
- `GH201-660-25 - Self-Funded Disability Plans - Time Running Out on Federally Regulated Employers` — GH-201C (SOA)
- `GH201-659-25 - Ontario 2014 Budget Will Forbid Employers from Self-Insuring Long Term Disability Plan to Employees` — GH-201C (SOA)
- `GH201-662-25 - Firefighter Who Died of Cancer was Killed in the Line of Duty` — GH-201C (SOA)
- `GH201-663-25 - West Nile Victim Wins $130,000 Insurance Payout` — GH-201C (SOA)
- `GH201-685-25 - Campagnie D'Assurances Standard Life V. Tremblay 2010—QCCA 933 - A Hefty Price to Pay for Unwarranted Surveillance` — GH-201C (SOA)
- `GH201-709-25 - Brooks V. Canada Safeway Ltd` — GH-201C (SOA)
- `GH201-710-25 - Termination of Benefits Coverage at Age 65 Declared Unconstitutional` — GH-201C (SOA)
- `GH201-713-25 - How Will the Potential Work-from-Anywhere Boom Post-Pandemic Impact Benefit Plans` — GH-201C (SOA)
- `GH201-714-25 - How Employers are Integrating DEI into their Benefits Plans` — GH-201C (SOA)
- `GH201-705-25 - Assuris for Group Insurance in Canada` — GH-201C (SOA)
- `GH201-648-25 - Canadian Life and Health Insurance Industry Agreement to Protect Canadians' Drug Coverage` — GH-201C (SOA)
- `GH201-716-25 - Legislative Changes to EI Sickness Benefits` — GH-201C (SOA)
- `GH201-723-26 - Disability Pension under the Quebec Pension Plan` — GH-201C (SOA)
- `GH201-724-26 - Adjustment of the Retirement Pension for Disabled Persons Between Ages 60 and 65` — GH-201C (SOA)
- `GH201-725-26 - Canada Disability Benefit 2025 - How to Apply` — GH-201C (SOA)
- `GH201-694-25 - Guide to Canada Benefits Legislation` — GH-201C (SOA)
- `GH201-702-25 - OHIP+ Pharmacy Redesign Update - FAQS For Patients` — GH-201C (SOA)
- `GH201-721-25 - The Quebec Act Respecting Prescription Drug Insurance (ARPDI)` — GH-201C (SOA)
- `GH201-651-25 - The High-Stakes Battle of Medications` — GH-201C (SOA)
- `GH201-718-25 - An Update on Canada's National Strategy for Drugs for Rare Diseases` — GH-201C (SOA)
- `GH201-696-25 - Ensuring the Accessibility` — GH-201C (SOA)
- `GH201-653-25 - Telus Health Note - How Much Does that Drug Cost` — GH-201C (SOA)
- `GH201-706-25 - PMPRB-Framework Modernization` — GH-201C (SOA)
- `Pharmacare - Is There a Pill for That (CIA - 2021)` — GH-201C (SOA)
- `GH201-695-25 - A Joint Statement from the pan-Canadian Pharmaceutical Alliance and the Canadian Generic Pharmaceutical Association` — GH-201C (SOA)
- `GH201-715-25 - Ontario's New Drug Plan Will Require a Swap of Brand-Name Biologic Medications for Cheaper Versions` — GH-201C (SOA)
- `Biosimilars in Canada - Building Momentum in the Wake of Recent Switching Policies (2021)` — GH-201C (SOA)
- `GH201-726-26 - Patented Drug Pricing - The PMPRB Releases New Price-Review Guidelines` — GH-201C (SOA)
- `GH201-719-25 - Canada's New Dental Care Plan Could Impact Nearly 9 Million Canadians—Are You One of Them` — GH-201C (SOA)
- `GH201-720-25 - Seniors Spend Thousands on Dental Work` — GH-201C (SOA)
- `GH201-727-26 - Canadian Dental Care Plan` — GH-201C (SOA)
- `Premium Deficiency Reserves Discussion Paper (AAA - 2007)` — GH-201U (SOA)
- `GH201-407-26 - Supplement to PDR Paper` — GH-201U (SOA)
- `ASOP 5 - Incurred Health and Disability Claims` — GH-201U (SOA)
- `ASOP 7 - Life or Health Cash Flow Analysis` — GH-201U (SOA)
- `ASOP 42 - Health and Disability Actuarial Assets and Liabilities Other than Liabilities for Incurred Claims` — GH-201U (SOA)
- `Read. Think. Write (Health Section News - 2004)` — GH-201U (SOA)
- `GH201-400-25 - Health Insurance Accounting Basics for Actuaries` — GH-201U (SOA)
- `ASOP 21 - Responding to or Assisting Auditors or Examiners in Connection with Financial Audits` — GH-201U (SOA)
- `GH201-402-25 - RBC Calculation Examples` — GH-201U (SOA)
- `GH201-401-25 - Structured Reinsurance - Impact on Health Product Pricing` — GH-201U (SOA)
- `Pharmaceutical Patent Regulation in the United States (The Actuary - 2021)` — GH-201U (SOA)
- `Potential Abuses Within U.S. Pharmaceutical Patent Regulation (The Actuary - 2021)` — GH-201U (SOA)
- `Federal Regulation of Prescription Drugs in the United States (The Actuary - 2021)` — GH-201U (SOA)
- `State Regulation of Prescription Drugs in the United States (The Actuary - 2021)` — GH-201U (SOA)
- `GH201-408-26 - A Tale of Two Systems - How Regulatory and Market Structures Make US Gene Therapies Pricier than Europe's` — GH-201U (SOA)
- `Medicare Advantage Expanded Supplemental Benefits Over the Years (Health Watch - 2021)` — GH-201U (SOA)
- `Medicare Advantage Experience Data - Pitfalls and Concerns Beyond ASOP 23 (Health Watch - 2019)` — GH-201U (SOA)
- `GH201-404-25 - Medicare Advantage - Eight Critical Considerations for Every Organization as ESRD Eligibility Expands in 2021` — GH-201U (SOA)
- `GH201-403-25 - Medicare Part D Prescription Drug Benefits` — GH-201U (SOA)
- `GH201-406-25 - Attempting to Boil the Ocean - A High-Level Overview of Medicaid and its Risk-Based Managed Care Programs` — GH-201U (SOA)
- `ASOP 49 - Medicaid Managed Care Capitation Rate Development and Certification` — GH-201U (SOA)
- `GH201-405-25 - A Hard Pill to Swallow - Appreciating the Mathematical Dynamics of the Affordable Care Act` — GH-201U (SOA)
- `Video - Challenges of Provider Reimbursement` — GH-301 (SOA)
- `Video - Today's Provider Reimbursement Landscape` — GH-301 (SOA)
- `GH301-105-25 - Chapter 45 of Group Insurance` — GH-301 (SOA)
- `Provider Payment Arrangements (Provider Risk - 2015)` — GH-301 (SOA)
- `Value-Based Care Framework (The Actuary - 2020)` — GH-301 (SOA)
- `The Cost of Value-Based Care (The Actuary - 2020)` — GH-301 (SOA)
- `GH301-100-25 - Evaluating Bundled Payment Contracting` — GH-301 (SOA)
- `GH301-112-26 - PY2025 ACO REACH RTA Tailwind` — GH-301 (SOA)
- `GH301-113-26 - ACO REACH PY2026 Explained - What is Changing and Why it Matters` — GH-301 (SOA)
- `GH301-102-25 - Episode-Based Physician Profiling - A Guide to the Perplexing` — GH-301 (SOA)
- `GH301-103-25 - Physician Cost Profiling – Reliability and Risk of Misclassification` — GH-301 (SOA)
- `GH301-104-25 - The Application of Tiering in Healthcare` — GH-301 (SOA)
- `Surprises in the No Surprises Act - An Interview with Greg Fann (Health Watch - 2024)` — GH-301 (SOA)
- `Managing and Evaluating Healthcare Intervention Programs (Duncan - 2014)` — GH-301 (SOA)
- `GH301-106-25 - End-of-Life Outcomes with or without Early Palliative Care - A Propensity Score Matched` — GH-301 (SOA)
- `Reimagining Pharmacy Financing (SOA Research Institute - 2024)` — GH-301 (SOA)
- `Healthcare Risk Adjustment and Predictive Modeling (Duncan - 2018)` — GH-301 (SOA)
- `Risk Adjustment in State Medicaid Programs (Health Watch - 2008)` — GH-301 (SOA)
- `Creating Stability in Unstable Times – A Look at Risk Adjustment and Market Stabilization (The Actuary - 2017)` — GH-301 (SOA)
- `Changing with the Times - The Past and the Future of ACA Risk Adjustment (Health Watch - 2020)` — GH-301 (SOA)
- `GH301-107-25 - HHS-Operated Risk Adjustment Technical Paper on Possible Model Changes` — GH-301 (SOA)
- `Restoring the Indifference Ideal - If It's Not Adjusting for Risk, It's Not Risk Adjustment (Health Watch - 2022)` — GH-301 (SOA)
- `ASOP 45 - The Use of Health Status Based Risk Adjustment Methodologies` — GH-301 (SOA)
- `1 Risk Adjustment in this course refers to adjusting revenue or capitation rates as applicable to the US health insurance market. This is distinct from the IFRS concept of risk adjustment` — GH-301 (SOA)
- `eLearning Module - FSA - Terminology and Analytical Use of Data for Healthcare Actuaries` — GH-301 (SOA)
- `GH301-108-25 - Social Determinants of Health in the Work of Health Actuaries` — GH-301 (SOA)
- `GH301-109-25 - Health in Housing - Exploring the Intersection Between Housing & Health Care` — GH-301 (SOA)
- `GH301-110-25 - UMass Risk Adjustment Project for MassHealth Payment and Care Delivery Reform - Describing the 2017 Payment Model` — GH-301 (SOA)
- `GH301-111-25 - MassHealth Social Determinants of Health Risk Adjustment Model - Version 4.0` — GH-301 (SOA)
- `How Does Where You Live Impact Your Health (SOA Research Institute - 2022)` — GH-301 (SOA)
- `Social (SOA Research Institute - 2023)` — GH-301 (SOA)
- `eLearning Module - FSA - Predictive Modeling for Healthcare Actuaries` — GH-301 (SOA)
- `Actuarial Standards of Practice (Credibility Procedures - 2013)` — GI-101 (SOA)
- `General Insurance Company Operations (SOA - 2025)` — GI-201 (SOA)
- `IAA Risk Book - Non-Life Perils and Coverages (Insurance Regulation Committee - 2023)` — GI-201 (SOA)
- `IAA Risk Book - Reinsurance (Insurance Regulation Committee - 2023)` — GI-201 (SOA)
- `Excerpts from Business Law for Insurance Professionals` — GI-201 (SOA)
- `The General Insurance Regulatory Environment (SOA - 2025)` — GI-201 (SOA)
- `Insurance and the Discrimination Laws - Motor and Travel Insurance (Edmunds - 2013)` — GI-201 (SOA)
- `Usage Based Insurance and Telematics (SOA - 2025)` — GI-201 (SOA)
- `Government Provision of General Insurance (SOA - 2025)` — GI-201 (SOA)
- `Private Flood Insurance and the National Flood Insurance Program (Congressional Research Service - 2023)` — GI-201 (SOA)
- `Issues Paper - Use of Credit Scores by Insurers Canadian Council of Insurance Regulators (Insurers - 2011)` — GI-201 (SOA)
- `Price Optimization White Paper (2015)` — GI-201 (SOA)
- `Captive Insurance (SOA - 2025)` — GI-201 (SOA)
- `Tort Law – Topics for General Insurance Actuaries (SOA - 2025)` — GI-201 (SOA)
- `Government Provision of General Insurance (SOA)` — GI-201 (SOA)
- `Social Inflation - Navigating the Evolving Claims Environment (The Geneva Association - 2020)` — GI-201 (SOA)
- `Behavioral Finance (Ritter - 2003)` — GI-201 (SOA)
- `ALM Strategies for General Insurers (SOA - 2025)` — GI-201 (SOA)
- `Ratemaking - A Financial Economics Approach (D’Arcy - 1997)` — GI-201 (SOA)
- `IAA Risk Book - Liabilities for General Insurance (Insurance Regulation Committee - 2023)` — GI-201 (SOA)
- `General Insurance Financial Reporting Topics (Society of Actuaries - 2021)` — GI-201 (SOA)
- `IAA Risk Book - Own Risk Solvency Assessment (Insurance Regulation Committee - 2023)` — GI-201 (SOA)
- `NAIC Own Risk and Solvency Assessment (ORSA) Guidance Manual (NAIC - 2022)` — GI-201 (SOA)
- `Deriving Value from ORSA - Board Perspective (International Actuarial Association - 2015)` — GI-201 (SOA)
- `IAA Risk Book - Professional Standards (Insurance Regulation Committee - 2023)` — GI-201 (SOA)
- `International Standard of Actuarial Practice 1 (General Actuarial Practice - 2018)` — GI-201 (SOA)
- `International Standard of Actuarial Practice 4 (IAA - 2019)` — GI-201 (SOA)
- `IAA Risk Book - Materiality (Proportionality and Similar Terms - 2023)` — GI-201 (SOA)
- `Outstanding Claims Reserves (Version 1.3a) (SOA - 2022)` — GI-301 (SOA)
- `Considerations Regarding the Chain Ladder Model (SOA - 2025)` — GI-301 (SOA)
- `Classification Ratemaking (Minimum Bias and GLMs - 2025)` — GI-301 (SOA)
- `Actuarial Standards of Practice (2011)` — GI-301 (SOA)
- `This article may be accessed at www.casact.org through the following navigation` — GI-301 (SOA)
- `General Insurance - Considerations in Reinsurance Reserving (SOA - 2025)` — GI-301 (SOA)
- `Risk Transfer Testing of Reinsurance Contracts (Brehm - 2007)` — GI-301 (SOA)
- `Insurance Risk Transfer and Categorization of Reinsurance Contracts (Gurenko - 2012)` — GI-301 (SOA)
- `Uses of Catastrophe Model Output (AAA - 2018)` — GI-301 (SOA)
- `An Overview of Catastrophe Modeling Output (SOA - 2025)` — GI-301 (SOA)
- `An Application of Game Theory - Property Catastrophe Risk Load (Mango - 1998)` — GI-301 (SOA)
- `General Insurance - U.S. Policies and Coverages (SOA - 2025)` — GI-302 (SOA)
- `Insurance Regulation (Porter - 2008)` — GI-302 (SOA)
- `The U.S. National State-Based System of Insurance Regulation and the Solvency Modernization Initiative (NAIC White Paper - 2013)` — GI-302 (SOA)
- `The Economic Crisis and Lessons from (and for) U.S. Insurance Regulation (Journal of Insurance Regulation - 2009)` — GI-302 (SOA)
- `The Dodd-Frank Wall Street Reform and Consumer Protection Act - Insurance Provisions (Congressional Research Service - 2010)` — GI-302 (SOA)
- `General Insurance Financial Reporting Topics (SOA - 2021)` — GI-302 (SOA)
- `Casualty - 2025)` — GI-302 (SOA)
- `Materiality (Concepts on Professionalism - 2006)` — GI-302 (SOA)
- `Statements of Actuarial Opinion on Property and Casualty Loss Reserves (Practice Note - 2025)` — GI-302 (SOA)
- `ILA101-100-25 - Life Products and Features` — ILA-101 (SOA)
- `ILA101-101-25 - Annuity Products and Features` — ILA-101 (SOA)
- `Structured Settlement Annuities (SOA Research Institute - 2022)` — ILA-101 (SOA)
- `Registered Index-Linked Annuities (SOA Research Institute - 2022)` — ILA-101 (SOA)
- `Life Insurance Acceleration Riders (SOA Reinsurance News - 2013)` — ILA-101 (SOA)
- `ILA101-102-25 - Understanding Profitability in Life Insurance` — ILA-101 (SOA)
- `ILA101-103-25 - Ch. 9 of Life Insurance Products and Finance` — ILA-101 (SOA)
- `ILA101-104-25 - Ch. 11` — ILA-101 (SOA)
- `ILA101-105-25 - Life Insurance and Annuity Non-forfeiture Practices` — ILA-101 (SOA)
- `ILA101-106-25 - Experience Assumptions for Individual Life Insurance and Annuities` — ILA-101 (SOA)
- `ILA101-107-25 - Lapse Supported Insurance Analysis` — ILA-101 (SOA)
- `Educational Note Supplement - Selective Lapsation for Renewable Term Insurance Products (CIA - 2017)` — ILA-101 (SOA)
- `Report on Premium Persistency Assumptions Study of Flexible Premium Universal Life Products (2012)` — ILA-101 (SOA)
- `Variable Annuity Guaranteed Living Benefits Utilization (SOA LIMRA Research - 2018)` — ILA-101 (SOA)
- `Term Conversions - Pricing and Reserves (Product Matters - 2017)` — ILA-101 (SOA)
- `Predictive Models on Conversion Studies for the Level Premium Term Plans (SOA - 2017)` — ILA-101 (SOA)
- `Credibility Methods Applied to Life (Health - 2019)` — ILA-101 (SOA)
- `Table Development (2018)` — ILA-101 (SOA)
- `Experience Study Calculations (SOA - 2016)` — ILA-101 (SOA)
- `Life Insurance for the Digital Age - An End-to-End View (Product Matters - 2017)` — ILA-101 (SOA)
- `The Art and Science of Life Insurance Distribution (Bennett - 2014)` — ILA-101 (SOA)
- `ILA101-108-25 - Chapters 1 and 2 of Life Insurance and Modified Endowments Under IRC §7702 and §7702A` — ILA-101 (SOA)
- `ILA101-116-25 - Ch. 10` — ILA-101 (SOA)
- `Overview of Nonguaranteed Elements (NGEs) (SOA Research Institute - 2022)` — ILA-101 (SOA)
- `Market Trends and Product Designs - Considerations When Interest Rates are Rising (Product Matters - 2021)` — ILA-101 (SOA)
- `Statutory Valuation of Individual Life and Annuity Contracts (Volume I - 2018)` — ILA-101 (SOA)
- `ILA101-110-25 - Fundamentals of the Principle-Based Approach to Statutory Reserves for Life Insurance` — ILA-101 (SOA)
- `ILA101-118-26 - Chapter 1 of US GAAP for Insurers` — ILA-101 (SOA)
- `ILA101-119-26 - Chapter 5 of US GAAP for Insurers` — ILA-101 (SOA)
- `ILA101-111-25 - Insurance Contracts First Impressions - 2020 Edition IFRS 17` — ILA-101 (SOA)
- `ILA101-112-25 - Revisiting the Role of Insurance Company ALM within a Risk Management Framework` — ILA-101 (SOA)
- `ILA101-113-25 - Ch. 7 of Derivatives Markets` — ILA-101 (SOA)
- `ILA101-114-25 - Ch. 16 of ALM Management of Financial Institutions` — ILA-101 (SOA)
- `An Introduction to Computational Risk Management of Equity-Linked Insurance (Feng - 2018)` — ILA-101 (SOA)
- `ILA101-115-25 - Simulation of a Guaranteed Minimum Annuity Benefit` — ILA-101 (SOA)
- `ILA-117-25 - Ch. 10` — ILA-101 (SOA)
- `ILA201-600-25 - International Actuarial Note 100 - Application of IFRS 17` — ILA-201I (SOA)
- `CIA Educational Note - IFRS 17 Risk Adjustment for Non-Financial Risk for Life and Health Insurance Contracts (2022)` — ILA-201I (SOA)
- `ILA201-601-25 - The IFRS 17 Contractual Service Margin - A Life Insurance Perspective` — ILA-201I (SOA)
- `CIA Educational Note - IFRS 17 Estimates of Future Cash Flows for Life and Health Insurance Contracts (2022)` — ILA-201I (SOA)
- `CIA Educational Note - IFRS 17 Discount Rates for Life and Health Insurance Contracts (2022)` — ILA-201I (SOA)
- `IFRS 17 - Reinsurance Contracts Held and Loss-Recovery Component (SOA Reinsurance News - 2021)` — ILA-201I (SOA)
- `IFRS 17 Spreadsheet Model` — ILA-201I (SOA)
- `CIA Educational Note - IFRS 17 Market Consistent Valuation of Financial Guarantees for Life and Health Insurance Contracts (2022)` — ILA-201I (SOA)
- `CIA Educational Note - IFRS 17 – Fair Value of Insurance Contracts (2022)` — ILA-201I (SOA)
- `ILA201-602-25 - OSFI B-3 Sound Reinsurance Practices and Procedures` — ILA-201I (SOA)
- `ILA201-603-25 - OSFI Guideline E15 - Appointed Actuary – Legal Requirements` — ILA-201I (SOA)
- `ILA201-604-25 - OSFI Guideline – Life Insurance Capital Adequacy Test (LICAT)` — ILA-201I (SOA)
- `ILA201-605-25 - OSFI Guideline A-4 Internal Target Capital Ratio for Insurance Companies` — ILA-201I (SOA)
- `CIA Educational Note - Financial Condition Testing (2023)` — ILA-201I (SOA)
- `ILA201-606-25 - OSFI - Own Risk and Solvency Assessment (E-19)` — ILA-201I (SOA)
- `ILA201-607-25 - IFRS 17 and Navigating Financial Condition Testing` — ILA-201I (SOA)
- `ILA201-608-25 - IFRS 17 - Tax and the Contractual Service Margin` — ILA-201I (SOA)
- `ILA201-609-25 - Impact of 2017 Tax Changes on Life Insurance` — ILA-201I (SOA)
- `Statutory Valuation of Individual Life and Annuity Contracts (Volumes I and II - 2018)` — ILA-201U (SOA)
- `Interactive Principle-Based Reserves Model` — ILA-201U (SOA)
- `US GAAP for Insurers (Freedman - 2024)` — ILA-201U (SOA)
- `Implementation Considerations for VA Market Risk Benefits (The Financial Reporter - 2019)` — ILA-201U (SOA)
- `Targeted Improvements Interactive Model` — ILA-201U (SOA)
- `Statutory Valuation of Individual Life and Annuity Contracts (Volume II - 2018)` — ILA-201U (SOA)
- `ILA201-800-25 - Theory of Risk Capital in Financial Firms` — ILA-201U (SOA)
- `ILA201-801-25 - Diversification of Longevity and Mortality Risk` — ILA-201U (SOA)
- `ILA201-802-25 - NAIC Own Risk and Solvency Assessment (ORSA) Guidance Manual` — ILA-201U (SOA)
- `Evolving Strategies to Improve Inforce Post-Level Term Profitability (Product Matters - 2015)` — ILA-201U (SOA)
- `FAQ on Certain Insurance Reserves Held by Insurance Companies for the Purpose of Determining U.S. Taxable Income after the Passage of the Tax Cuts and Jobs Act of 2017 (Insurance - 2017)` — ILA-201U (SOA)
- `Handbook of Fixed Income Securities (Fabozzi - 2021)` — INV-101 (SOA)
- `Commercial Real Estate Analysis and Investments (Geltner - 2026)` — INV-101 (SOA)
- `INV101-102-25 - High-Yield Bond Primer` — INV-101 (SOA)
- `INV101-101-25 - Overview of Investing in Private Corporate Debt - Fabozzi in JPM` — INV-101 (SOA)
- `The Handbook of Traditional and Alternative Investment Vehicles (Anson - 2011)` — INV-101 (SOA)
- `INV101-106-26 - Collateralized Loan Obligations - A Primer` — INV-101 (SOA)
- `Portfolio Management in Practice Volume 1 - Investment Management (CFA Institute - 2021)` — INV-101 (SOA)
- `INV101-100-25 - Chapters 3 and 4 of Alternative Investments - A Primer for Investment Professionals` — INV-101 (SOA)
- `INV101-103-25 - Elements of an Investment Policy Statement for Institutional Investors` — INV-101 (SOA)
- `INV101-104-25 - The Hidden Dangers of Passive Investing` — INV-101 (SOA)
- `INV101-105-25 - Addressing Built-in Biases in Real Estate Investment` — INV-101 (SOA)
- `The Handbook of Credit Risk Management (Bouteille - 2022)` — INV-101 (SOA)
- `INV101-107-26 - Chapter 12 of Quantitative Enterprise Risk Management` — INV-101 (SOA)
- `INV101-108-26 - Chapters 3 and 5 of Credit Risk` — INV-101 (SOA)
- `Options (Futures - 2021)` — INV-201 (SOA)
- `INV201-100-25 - Chapter 5 of Financial Mathematics – A Comprehensive Treatment` — INV-201 (SOA)
- `INV201-101-25 - Chapter 6 of Introduction to Stochastic Finance with Market Examples by Privault` — INV-201 (SOA)
- `INV201-102-25 - How to Use the Holes in Black-Scholes` — INV-201 (SOA)
- `Calibrating Interest Rate Models (SOA Research - 2023)` — INV-201 (SOA)
- `The Volatility Smile (Derman - 2016)` — INV-201 (SOA)
- `Problems and Solutions in Mathematical Finance - Stochastic Calculus (Chin - 2014)` — INV-201 (SOA)
- `INV201-104-25 - Which Free Lunch Would You Like Today` — INV-201 (SOA)
- `INV201-105-25 - An Introduction to Computational Risk Management of Equity-Linked Insurance` — INV-201 (SOA)
- `INV201-106-25 - Variable Annuity Volatility Management - An Era of Risk-Control` — INV-201 (SOA)
- `INV201-108-25 - Mitigating Interest Rate Risk in Variable Annuities - An Analysis of Hedging Effectiveness under Model Risk` — INV-201 (SOA)
- `INV201-107-25 - It's RILA time - An introduction to registered index-linked annuities` — INV-201 (SOA)
- `INV201-109-25 - Investment Instruments with Volatility Target Mechanism` — INV-201 (SOA)
- `R for Everyone (Lander - 2017)` — PA (SOA)
- `Data Visualization - A Practical Introduction (Healy - 2018)` — PA (SOA)
- `Retirement Plans - 401(k)s (Allen et al. - 2018)` — RET-101 (SOA)
- `Fundamentals of Private Pensions (McGill et al. - 2010)` — RET-101 (SOA)
- `RET101-110-25 - Social Security Programs Throughout the World - Europe` — RET-101 (SOA)
- `RET101-102-25 - Defined Contribution Plan Success Factors` — RET-101 (SOA)
- `RET101-100-25 - Framework for Future Defined Contribution Design` — RET-101 (SOA)
- `RET101-123-26 - CAPSA Guideline No. 3 - Guidelines for Capital Accumulation Plans` — RET-101 (SOA)
- `RET101-109-25 - Designing the Future of Target-Date Funds` — RET-101 (SOA)
- `RET101-124-26 - The Future of DC Plans - Key Trends for 2025 and Beyond` — RET-101 (SOA)
- `The Next Evolution in Defined Contribution Retirement Plan Design - A Guide for DC Plan Sponsors to Implementing Retirement Income Programs (SOA - 2013)` — RET-101 (SOA)
- `RET101-104-25 - The Hybrid Handbook - Not All Hybrids are Created Equal` — RET-101 (SOA)
- `RET101-106-25 - Multi-Employer Plans` — RET-101 (SOA)
- `RET101-107-26 - Introduction and Overview of Retirement Plan Investments` — RET-101 (SOA)
- `RET101-108-25 - CAPSA` — RET-101 (SOA)
- `Report of the Task Force on Target Benefit Plans (CIA - 2015)` — RET-101 (SOA)
- `Analysis of Target Benefit Plan Design Options (SOA - 2016)` — RET-101 (SOA)
- `RET101-101-25 - Integration with Social Security` — RET-101 (SOA)
- `RET101-103-25 - Phased Retirement - An Important Part of the Evolving Retirement Scene` — RET-101 (SOA)
- `Managing Post-Retirement Risks - Strategies for a Secure Retirement (SOA - 2025)` — RET-101 (SOA)
- `RET101-114-25 - How Accurately does 70 percent Final Employment Earnings Replacement Measure Retirement Income (In)Adequacy Introducing the Living Standards Replacement Rate (LSRR)` — RET-101 (SOA)
- `RET101-111-25 - Risk Management and Public Plan Retirement Systems - Appendices B and C only` — RET-101 (SOA)
- `Primer on Retirement Income Strategy Design and Evaluation (SOA Research - 2023)` — RET-101 (SOA)
- `RET101-112-25 - Private Pensions - Alternative Approaches Could Address Retirement Risks Faced by Workers but Pose Tradeoffs` — RET-101 (SOA)
- `RET101-113-25 - The Promise of Defined Ambition Plans - Lessons for the United States` — RET-101 (SOA)
- `RET101-115-25 - An Improved Application of the Variable Annuity` — RET-101 (SOA)
- `RET101-116-25 - The Case for Collective DC` — RET-101 (SOA)
- `Educational Note - Financial Risks Inherent in Multi-Employer Pension Plans and Target Benefit Pension Plans (CIA - 2011)` — RET-101 (SOA)
- `RET101-111-25 - Risk Management and Public Plan Retirement Systems - Appendices A-C only` — RET-101 (SOA)
- `RET101-117-25 - Implementing Early Retirement Incentive Programs - A Step-by-Step Guide` — RET-101 (SOA)
- `RET101-118-25 - Pension Issues in Mergers and Acquisitions` — RET-101 (SOA)
- `Embedded Options in Pension Plans - Catalogue of Embedded Options Survey of Prevalence of Embedded Options (SOA - 2011)` — RET-101 (SOA)
- `RET101-121-25 - The Big Chill` — RET-101 (SOA)
- `RET101-120-25 - Design Matters - Plan Distribution Options` — RET-101 (SOA)
- `RET101-122-25 - Innovations in the Canadian Retirement Landscape - CAAT Pension Plan` — RET-101 (SOA)
- `RET101-119-25 - Ch. 1 (pp. 4-11) and Ch. 5 of Pension Policy - The Search for Better Solutions` — RET-101 (SOA)
- `RET201-100-25 - Chapter 15 of Canadian Pensions and Retirement Income Planning` — RET-201 (SOA)
- `ASOP 4 - Measuring Pension Obligations and Determining Pension Plan Costs or Contributions` — RET-201 (SOA)
- `Pension Mathematics for Actuaries (Anderson - 2006)` — RET-201 (SOA)
- `Asset Valuation Methods under ERISA (Pension Forum - 2002)` — RET-201 (SOA)
- `Educational Note - Guidance on Asset Valuation Methods (CIA - 2024)` — RET-201 (SOA)
- `Survey of Asset Valuation Methods for Defined Benefit Pension Plans (SOA)` — RET-201 (SOA)
- `RET201-102-25 - Pension Funding Exercises` — RET-201 (SOA)
- `RET201-101-25 - A Problem-Solving Approach to Pension Funding and Valuations` — RET-201 (SOA)
- `RET201-103-25 - Actuarial Equivalence Calculations` — RET-201 (SOA)
- `Embedded Options in Pension Plans - Valuation of Guarantees in Cash Balance Plans (SOA - 2014)` — RET-201 (SOA)
- `e-Learning Module - Pension Projection` — RET-201 (SOA)
- `Selecting and Documenting Pension Assumptions Other Than Discount Rate and Investment Return (AAA - 2025)` — RET-201 (SOA)
- `Educational Note – Second Revision - Selection of Mortality Assumptions for Pension Plan Actuarial Valuations (CIA - 2017)` — RET-201 (SOA)
- `Forecasting Investment Returns and Expected Return Assumptions for Pension Actuaries (AAA - 2019)` — RET-201 (SOA)
- `Duration and Convexity for Pension Liabilities (Pension Section News - 2013)` — RET-201 (SOA)
- `Selecting Investment Return Assumptions - Considerations When Using Arithmetic and Geometric Averages (AAA - 2019)` — RET-201 (SOA)
- `AAA - 2006)` — RET-201 (SOA)
- `RET201-104-25 - Use of Financial Economics in Pension Actuarial and Investment Practice` — RET-201 (SOA)
- `Credibility Educational Resource for Pension Actuaries (SOA - 2017)` — RET-201 (SOA)
- `RET201-105-25 - IFRS and US GAAP - Similarities and Differences` — RET-201 (SOA)
- `RET201-107-25 - Introduction (A58)` — RET-201 (SOA)
- `RET201-111-25 - FASB Accounting Standards Codification Topic 715` — RET-201 (SOA)
- `Corporate Pension Risk Management and Corporate Finance (SOA - 2015)` — RET-201 (SOA)
- `RET201-106-25 - Accounting for Buy-ins` — RET-201 (SOA)
- `Alternatives for Pension Cost Recognition—Implementation Approaches Using Bond Models (AAA - 2016)` — RET-201 (SOA)
- `RET201-108-25 - Alternative Approaches to Calculating Service and Interest Cost under FASB ASC Topic 715` — RET-201 (SOA)
- `RET201-109-25 - Plan Curtailments & Settlements Under FASB ASC Topic 715 Relating to Plan Terminations` — RET-201 (SOA)
- `RET201-110-25 - Plan Curtailments & Settlements Under FASB ASC Topic 715 Relating to Plan Terminations` — RET-201 (SOA)
- `RET201-112-25 - Accounting for Plan Splits & Plan Mergers Under U.S. GAAP` — RET-201 (SOA)
- `Fundamentals of Private Pensions (McGill - 2010)` — RET-201 (SOA)
- `RET201-113-25 - Pensions in the Public Sector` — RET-201 (SOA)
- `RET201-114-25 - Liability-Responsive Asset Allocation` — RET-201 (SOA)
- `RET201-115-25 - Charting the Course - A Framework to Evaluate Pension De-Risking Strategies` — RET-201 (SOA)
- `RET201-116-25 - Practical De-Risking Solutions - Asset Duration and Interest Rate Risk` — RET-201 (SOA)
- `RET201-117-25 - Pension Plan Immunization Strategies - How Close Can You Get` — RET-201 (SOA)
- `New Solutions to an Age-Old Problem - Innovative Strategies for Managing Pension and Longevity Risk (NAAJ - 2019)` — RET-201 (SOA)
- `RET201-121-27 - Introduction to Retirement Plan Funding` — RET-201 (SOA)
- `Pension Risk Transfer - Evaluating Impact and Barriers for De-Risking Strategies (2021)` — RET-201 (SOA)
- `RET201-119-25 - Benefit Security Pension Fund Guarantee Schemes (pp. 4-13)` — RET-201 (SOA)
- `Risk Management and Public Plan Retirement Systems (AAA)` — RET-201 (SOA)
- `RET201-118-25 - CAPSA` — RET-201 (SOA)
- `RET201-120-25 - Funding Policy for the Public Sector Pension Plans` — RET-201 (SOA)
- `RET301-101-25 - A Problem-Solving Approach to Pension Funding and Valuation` — RET-301 (SOA)
- `Selection of Mortality Assumptions for Pension Plan Actuarial Valuations (CIA Educational Note - 2026)` — RET-301 (SOA)
- `Mortality Improvements Research (CIA Report - 2024)` — RET-301 (SOA)
- `2024 Canadian Pensioner Mortality Research Project (CIA Report - 2024)` — RET-301 (SOA)
- `Mortality Improvements Research (CIA Educational Note Supplement - 2024)` — RET-301 (SOA)
- `Determination of Best Estimate Discount Rates for Going Concern Funding Valuations (CIA Educational Note - 2023)` — RET-301 (SOA)
- `Expenses in Funding Valuations for Pension Plans (CIA Revised Educational Note - 2023)` — RET-301 (SOA)
- `Reflecting Increasing Maximum Pensions Under the Income Tax Act in Solvency (CIA Revised Educational Note - 2023)` — RET-301 (SOA)
- `Assumptions for Hypothetical Wind-Up and Solvency Valuations with Effective Dates on or after June 30 (2025)` — RET-301 (SOA)
- `RET301-102-25 - CAPSA Guidance Solvency or Hypothetical Wind-up Liabilities Based on Actual Life Insurance Company Annuity Quotation` — RET-301 (SOA)
- `RET301-100-25 - Financial Services Commission of Ontario - Actuarial Guidance Note - Determination of the Solvency Liability Adjustment` — RET-301 (SOA)
- `Part 1000 of the CIA Standards of Practice - General (CIA - 2026)` — RET-301 (SOA)
- `Standards of Practice - Pensions (CIA - 2026)` — RET-301 (SOA)
- `Guidance on Events Occurring After the Calculation Date of an Actuarial Opinion for a Pension Plan (CIA Revised Educational Note - 2024)` — RET-301 (SOA)
- `Guidance on Selection and Disclosure of Plausible Adverse Scenarios (CIA Educational Note - 2023)` — RET-301 (SOA)
- `Section 3500 of the Practice-Specific Standards for Pension Plans - Pension Commuted Values (Subsection 3570) (CIA Educational Note - 2023)` — RET-301 (SOA)
- `Section 3500 of the Practice-Specific Standards for Pension Plans - Pension Commuted Values (other than Subsection 3570) (CIA Educational Note - 2023)` — RET-301 (SOA)
- `Calculation of Incremental Cost on a Hypothetical Wind-Up or Solvency Basis (CIA Educational Note - 2023)` — RET-301 (SOA)
- `Canadian Pensions and Retirement Income Planning (Willis Towers Watson - 2017)` — RET-301 (SOA)
- `RET301-103-26 - R.R.O. 1990` — RET-301 (SOA)
- `RET301-104-26 - R.S.O. 1990` — RET-301 (SOA)
- `RET301-105-26 - Regulation 310-13 Asset Transfers under Ontario Pension Benefits Act` — RET-301 (SOA)
- `RET301-106-25 - Pension Asset Transfers made easier` — RET-301 (SOA)
- `RET301-108-25 - FSRA - Limitations on Commuted Value Transfers and Annuity Purchases (DB Pension Plans)` — RET-301 (SOA)
- `RET301-109-25 - Regulation 193-18 Purchase of Pension Benefits from an Insurance Company under Ontario Pension Benefits Act` — RET-301 (SOA)
- `RET301-112-25 - FSRA Guidance - Application by Employer for Payment of Surplus on Full Wind Up of a Pension Plan` — RET-301 (SOA)
- `RET301-107-25 - CAPSA - Adoption of the 2020 Agreement Respecting Multi-Jurisdictional Pension Plans` — RET-301 (SOA)
- `RET301-113-25 - Canadian Association of Pension Supervisory Authorities (CAPSA) Communique Spring 2023` — RET-301 (SOA)
- `RET301-114-25 - FSRA - Questions and Answers on 2016 Agreement Respecting Multi-Jurisdictional Pension Plans` — RET-301 (SOA)
- `RET301-115-26 - Q&A - Answering Your Tax Questions on RRSPs` — RET-301 (SOA)
- `RET301-110-26 - OSFI – Instruction Guide - Preparation of Actuarial Reports for Defined Benefit Pension Plans` — RET-301 (SOA)
- `RET301-111-25 - Personal Tax Planning - A Fresh Look at Retirement Compensation Arrangements - A Flexible Vehicle for Retirement Planning` — RET-301 (SOA)

</details>

### Secondary list — stub concept pages (22)

Nearly empty (under 40 words of prose); or under 100 words and missing a part of the definition → formula → worked example shape; or linked from a guide, under 250 words and with no worked example. Sorted by inbound guide links.

| Page | Words | Missing | Inbound guide links |
|---|---|---|---|
| `Capital` | 27 | definition, formula, example | 6 |
| `Risk Management` | 130 | formula, example | 3 |
| `Catastrophe Modelling` | 160 | definition, formula, example | 3 |
| `Fellow of the Society of Actuaries (FSA)` | 236 | formula, example | 3 |
| `Decision-Making` | 120 | formula, example | 2 |
| `Canadian Institute of Actuaries (CIA)` | 0 | definition, formula, example | 1 |
| `Credit` | 0 | definition, formula, example | 1 |
| `Pension` | 0 | definition, formula, example | 1 |
| `Constraint` | 26 | definition, formula, example | 1 |
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
