---
target: Concepts/Neyman-Pearson Lemma.md
created: 2026-10-05
---

## [F-001] Unsourced remark on zero-density regions
- entry_type: finding
- author: agent:validate-v1
- run_id: 2026-10-04T20:47Z/8861
- date: 2026-10-05
- severity: minor
- status: open
- locus: bullet 'The guarantee', second sentence
- claim: 'A region where f_1 = 0 never belongs in C; a region where f_0 = 0 always does.'
- evidence: Siegrist, Random ch.8 §5 (hypothesis/Likelihood.html, sha256:60b047835a3f644cd2317c8ab984b8d41ae7669f53c1d32a79705942670b9b04) states the lemma (R = {L <= l}, L = f0/f1; if P0(A) <= P0(R) then P1(A) <= P1(R)) under the explicit assumption that f0 and f1 are positive on S, so it says nothing about zero-density regions, and no other source read this pass covers them. The sentence agrees with the extended-ratio convention (f0/f1 = infinity > k where f1 = 0, = 0 <= k where f0 = 0), but that is rank-5 reasoning and cannot confirm it.
- source_rank: 3
- proposed_action: Cite a source for the remark (e.g. Hogg §8.1) or drop the sentence.
- applied: false
- fingerprint: 28ce670b332f

## [C-001] Validation pass — verified
- entry_type: comment
- author: agent:validate-v1
- run_id: 2026-10-04T20:47Z/8861
- date: 2026-10-05
- status_set: verified
- confidence: medium
- checks_run: Both examples recomputed in python before comparing: f0/f1 = 2e^{-x/200}, c = 100 ln 20 = 299.57, power e^{-1.4979} = 0.2236; normal c = 1,082.25, z = -0.355, power 0.6387 (normal table interpolation 0.639). Lemma statement, size/power guarantee, sufficient-statistic reduction, discrete-size caveat, UMP claims (one-sided only; two-sided explicitly not UMP, matching Siegrist) and the composite-LR generalisation checked against Siegrist. Zero-density remark has no source (finding). Links resolve; LaTeX balanced.
- sources_checked: Siegrist, Random, ch.8 §5 Likelihood Ratio Tests: L = f0/f1, reject iff L <= l, with discrete data only certain alpha attainable; Neyman-Pearson Lemma (P0(R) >= P0(A) implies P1(R) >= P1(A)); random-sample product form; exponential scale example (b1 > b0 gives Y = sum X_i >= gamma quantile, UMP for the one-sided test); Bernoulli p one-sided UMP; normal-model one-sided tests UMP, none of the two-sided tests UMP; composite LR = sup over Theta_0 / sup over T, sha256:60b047835a3f644cd2317c8ab984b8d41ae7669f53c1d32a79705942670b9b04 — https://www.randomservices.org/random/hypothesis/Likelihood.html; CAS Exam MAS-I Tables (version 01/15/2018), p.3 normal table: Phi(1.64) = 0.9495, Phi(1.65) = 0.9505, Phi(0.35) = 0.6368, Phi(0.36) = 0.6406, sha256:cb5674138a67f7a498b8cc90357144fd121cbcbbc7487f214557b105611a69b4 — https://www.casact.org/sites/default/files/2021-03/masi_tables.pdf; CAS Exam MAS-I Content Outline 2026 (MASI_CO_2026_F v06, 2026-06-29), reading list PDF p.6: Hogg Domain B §§8.1, 8.2, sha256:245892366dea073ff44e89b3ac2ae1401517b127d36d51c8a1198b3185faa2ed — https://www.casact.org/sites/default/files/2026-06/MASI_ContentOutline_2026.pdf; Hogg, McKean & Craig, Introduction to Mathematical Statistics 8th ed. (Global Ed.), publisher preview, contents PDF pp.6-8: §8.1 'Most Powerful Tests' (p.483), §8.2 'Uniformly Most Powerful Tests' (p.493) (contents only), sha256:7fd80607a820477e03ff2c8f3469f5cfa57d095d766cbc29d39d723ef5a69a99 — https://api.pageplace.de/preview/DT0400.9781292264783_A39514650/preview-9781292264783_A39514650.pdf
