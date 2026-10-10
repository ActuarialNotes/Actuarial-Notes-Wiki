---
target: questions/exam-mas-i/masi-an-072.md
created: 2026-10-10
---

## [C-001] Validation pass — in_review
- entry_type: comment
- author: agent:validate-v1
- run_id: 2026-10-10T19:00Z/masa
- date: 2026-10-10
- status_set: in_review
- checks_run: blind recomputation from the stem before reading answer/explanation; key compared with the blind answer; every distractor's arithmetic and rationale recomputed; option distinctness; explanation arithmetic line by line; wiki_link tags against what the question tests (all resolve; validate_content.py clean); learning_objective against the Exam MAS-I domain titles and the 2026 outline tasks; stated facts against the cited sources
- note: Blind: a D, b C, c A, d B; key matches all four. Sourced this session: Pareto mean excess linear, exponential constant, lognormal ~u/ln u (Ghosh & Resnick, arXiv:0907.5236, pp.1-2, 19, sha256:5ae739d6…); Weibull ln(-ln S) slope tau and failure rate k t^(k-1) (Siegrist Weibull page; CAS MAS-I tables A.3.2.3). NOT sourced: part d's key rests on a gamma with shape > 1 having an increasing hazard that tends to 1/theta and a mean excess falling to theta. No open text I could read states this (NIST's gamma hazard pages give it only as a plot; Tse 2.4 and Loss Models are commercial). Needed: Tse 2.4 (Tail properties of claim severity) or Loss Models' tail-behaviour section. Nothing found wrong.

## [C-002] Comment
- entry_type: comment
- author: agent:validate-v1
- run_id: 2026-10-10T19:00Z/masa
- date: 2026-10-10
- note: Second attempt (same run) to source part d (gamma with shape > 1: hazard increasing toward 1/theta, mean excess decreasing toward theta). Checked: Siegrist, "The Gamma Distribution" (randomservices.org/random/special/Gamma.html, sha256:24d8bfbac0c1cdc05848961605509fb8cc7f4182127be1ff73bf9be78fedfeb6) - no failure-rate discussion in its text; Loss Data Analytics ch.3 (sha256:263021bf…) and ch.4 (sha256:c5fe1ff2…) - hazard discussed only for the Pareto and Weibull, none for the gamma; NIST e-Handbook 1.3.6.6.11 (eda366b.htm, sha256:ea3fc3dc…) gives the gamma hazard formula and a plot only, and 8.1.6.5 (apr165.htm, sha256:849ef3ac…) plots failure-rate shapes without stating the limit; a web search for a lecture note deriving the limit found none readable. Still needed: Tse 2.4 or Loss Models (tail behaviour). Status stays in_review; the key is unchanged and nothing on the page was found wrong.

## [F-001] Part d explanation states gamma tail limits no source supports
- entry_type: finding
- author: agent:validate-v1
- run_id: 2026-10-10T19:00Z/masa
- date: 2026-10-10
- severity: minor
- status: open
- locus: Part d explanation, first and last sentences
- claim: "A gamma with shape alpha > 1 has an increasing hazard rate that approaches theta^-1 from below, so its tail behaves ever more like an exponential with mean theta; its mean excess loss accordingly falls toward theta." and "C, D and E have hazards that eventually fall."
- evidence: Brunner, STA312 F23 gamma-hazard notes p.12 (sha256:af161497…) states only that for alpha > 1 the hazard is increasing and bounded above by lambda = 1/theta; the limit itself is shown only as a plot (p.15). An increasing failure rate implies a decreasing mean residual life (arXiv:1705.10238 p.5), but no source read gives the limit theta. For E, Ghosh & Resnick (arXiv:0907.5236 p.19) give the lognormal mean excess as u/ln u, rising; no source read states the lognormal hazard eventually falls. The key B still follows by elimination from sourced facts: A has a constant hazard, C (Weibull, shape < 1) and D (Pareto) have decreasing hazards (Siegrist; Loss Data Analytics 3.2.2), and E has a rising mean excess, so only B has a hazard that rises and levels off.
- source_rank: 3
- proposed_action: Say only what the sources support: increasing hazard bounded above by theta^-1, an increasing hazard makes the mean excess decrease; C and D have falling hazards and E's mean excess keeps rising. Key and stem unchanged.
- applied: true
- fingerprint: 79b7a0623bfe

## [F-001/R] Correction applied
- entry_type: resolution
- author: agent:validate-v1
- run_id: 2026-10-10T19:00Z/masa
- date: 2026-10-10
- resolves: F-001
- status: resolved
- note: Applied at the lead's direction: part d's explanation now reads "has an increasing hazard rate, bounded above by $\theta^{-1}$, and an increasing hazard rate makes the mean excess loss decrease" and "**C** and **D** have falling hazards, and **E**'s mean excess keeps rising." Key, stem and other parts unchanged.

## [C-003] Validation pass — verified
- entry_type: comment
- author: agent:validate-v1
- run_id: 2026-10-10T19:00Z/masa
- date: 2026-10-10
- status_set: verified
- confidence: medium
- checks_run: blind recomputation (earlier in this run: a D, b C, c A, d B; key matches); option rationales checked against sources; part d explanation reworded to the sourced claims (F-001) and re-read; tags and learning_objective (Domain B) as in this run's earlier check
- sources_checked: Brunner, "Exploring the hazard function of the gamma distribution", STA312 F23 lecture notes (U. Toronto, CC BY-SA), p.1 (alpha=1: exponential, hazard constant at lambda); p.12 (alpha > 1: h(t) increasing and bounded above by lambda; alpha < 1: decreasing), rate lambda = 1/theta, sha256:af161497b7e389ccd381754c64741ddf7ef2209e9702094ce9c08906a6572428 — https://utstat.utoronto.ca/~brunner/oldclass/312f23/lectures/312f23Hazardplots.pdf; "Some Ageing Properties of Dynamic Additive Mean Residual Life Model" (arXiv:1705.10238), p.5 proof: "since X is IFR, it is also DMRL, so that m_X(t) is decreasing in t" (increasing failure rate implies decreasing mean residual life), sha256:8bd0d6953690e43efe9ac7b128dd543bb801ff3c0e8ae036aec408dffdf04205 — https://arxiv.org/pdf/1705.10238; Ghosh & Resnick, "A Discussion on Mean Excess Plots" (arXiv:0907.5236v2), pp.1-2 (Pareto/GPD mean excess linear; exponential constant), p.19 (lognormal mean excess ~ u/ln u, rising), sha256:5ae739d69bff50980752dc2c83c3c5d952464e245d3f0ee9bbe097306cbbfbed — https://arxiv.org/pdf/0907.5236; Siegrist, randomservices.org, ch.5 The Weibull Distribution, failure rate r(t) = k t^(k-1): decreasing for k < 1, increasing without bound for k > 1; ln(-ln S) linear in ln t, sha256:d673ebeb4242d5daa56d213fd6245374f7ead872173ad01ad58e5e74ee4bc57f — https://www.randomservices.org/random/special/Weibull.html; Frees et al., Loss Data Analytics (open text), ch.3 Modeling Loss Severity, 3.2.2 Pareto hazard function decreasing (heavy tail), sha256:263021bf543b04b2881284b38b7dcbd0586b78daec371b88a1eefcd362dff732 — https://openacttexts.github.io/Loss-Data-Analytics/ChapSeverity.html; CAS Exam MAS-I Tables, A.3.2.3 Weibull F(x) = 1 - exp(-(x/theta)^tau), PDF p.12, sha256:cb5674138a67f7a498b8cc90357144fd121cbcbbc7487f214557b105611a69b4 — https://www.casact.org/sites/default/files/2021-03/masi_tables.pdf; CAS Exam MAS-I Content Outline 2026, Domain B tasks and readings (Tse 2.2-2.5), PDF pp.4, 6, sha256:245892366dea073ff44e89b3ac2ae1401517b127d36d51c8a1198b3185faa2ed — https://www.casact.org/sites/default/files/2026-06/MASI_ContentOutline_2026.pdf
- note: Verified after F-001. Part d: B is the only family with a hazard that rises and levels off (Brunner p.12: alpha > 1 increasing, bounded above by 1/theta); an increasing hazard gives a decreasing mean excess (arXiv:1705.10238 p.5); A constant, C and D decreasing hazards, E rising mean excess, so B by elimination too. Parts a-c as before (Ghosh & Resnick; Siegrist Weibull; CAS tables). Medium: Tse 2.4 (the reading) is commercial; all support is rank 3 or the rank-1 tables.
