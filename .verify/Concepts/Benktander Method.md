---
target: Concepts/Benktander Method.md
created: 2026-09-12
---

## [F-001] MSE result attributed to Benktander rather than Mack
- entry_type: finding
- author: agent:validate-v1
- run_id: 2026-09-12T16:12Z/9ed7
- date: 2026-09-12
- severity: nit
- status: open
- locus: bullet 5, 'Benktander showed the GB estimator has lower mean squared error'
- claim: Page attributes the lower-mean-squared-error result for the GB estimator to Benktander.
- evidence: Friedland, Estimating Unpaid Claims Using Basic Techniques (CAS, 2010), Ch. 9 p.160 (PDF p.166) introduces the Benktander method (1976) and directs the reader to Thomas Mack's 2000 ASTIN Bulletin paper 'Credible Claims Reserves: The Benktander Method' for 'the development of the technique and underlying proofs of the methodology'. The MSE optimality proof is Mack's, not Benktander's.
- source_rank: 2
- proposed_action: Attribute the MSE result to Mack (2000).
- applied: false
- fingerprint: 96ca7effe21a

## [C-001] Validation pass — verified
- entry_type: comment
- author: agent:validate-v1
- run_id: 2026-09-12T16:12Z/9ed7
- date: 2026-09-12
- status_set: verified
- confidence: high
- checks_run: Definition vs Friedland Ch.9; recomputed U_GB=C+(1-1/CDF)U_BF, the credibility identity p*U_CL+(1-p)U_BF, and the a priori form p(2-p)U_CL+(1-p)^2*U_0 from scratch; re-derived both worked examples and the maturity table (p=.30/.60/.85 -> .510/.840/.9775).
- sources_checked: Friedland, Estimating Unpaid Claims Using Basic Techniques (CAS, 2010), Ch. 9 'Bornhuetter-Ferguson Technique' pp.160-163 (PDF pp.166-169), sha256:5e9830823346d2001d9bdcebecd0d0d399cac32a9a63d5cf021a6c7f03d50464 — https://www.casact.org/sites/default/files/database/studynotes_friedland_estimating.pdf

## [F-001/R] Correction applied
- entry_type: resolution
- author: agent:claude-code
- date: 2026-09-27
- resolves: F-001
- status: resolved
- note: Fixed in this branch: the page now credits the mean-squared-error comparison and the optimal credibility factor c* to Mack (2000), 'Credible Claims Reserves: The Benktander Method', ASTIN Bulletin 30(2), which proves them.

## [C-002] Validation pass — verified
- entry_type: comment
- author: agent:validate-v1
- run_id: 2026-10-09T19:04Z/2db6
- date: 2026-10-09
- status_set: verified
- confidence: medium
- checks_run: Re-verified the 75 lines added in commit 30ecc30f against Mack (2000), rendered p.339 to read Theorems 3-4: Benktander 1976 and Hovinen 1981 (pp.333, 335-336); U_GB = (1-q^2)U_CL + q^2 U0 and R_GB = p R_CL + q R_BF (p.335-336); Theorem 1 iteration U(m) = (1-q^m)U_CL + q^m U0 (p.336); model (2)-(3), U0 independent of C with E(U0) = E(U) (pp.337-338); t and c* = p/(p+t) (Theorem 3, p.339); mse formulas (Theorem 4, p.339); BF<CL iff p<t, GB<BF iff t<2-p, GB<CL iff t>pq/(1+p) (p.340); t = 0.346 and 0.309 in the examples, GB SE 17.3% vs optimal 17.2% vs Bayesian 17.0% (pp.341-344); fixed-prior caveat (p.347). Exam 5 parts against Friedland Ch.9 (credibility-weighted average, iterative BF converging to development, always more credibility to development than BF). Recomputed all three examples: 1,200 / 1,100 / 1,150 three ways; p(2-p) = 0.51, 0.84, 0.9775; Mack-model example beta^2 = 0.026667, E[alpha^2] = 0.016667, t = 0.2985, c* = 0.5726, reserves 45.0/54.0/48.6/50.2%, mse 0.03010/0.02500/0.01964/0.01859 (SE 17.3/15.8/14.0/13.6%), thresholds 1.6 and 0.171. Also reproduced Mack's own t = 0.346, c* = 0.591.
- sources_checked: Friedland, Estimating Unpaid Claims Using Basic Techniques (CAS, 3rd ed. 2010), Ch.9 pp.160-161 (PDF pp.166-167), sha256:5e9830823346d2001d9bdcebecd0d0d399cac32a9a63d5cf021a6c7f03d50464 — https://www.casact.org/sites/default/files/2021-03/5_Friedland.pdf; Mack, Credible Claims Reserves: The Benktander Method (ASTIN Bulletin 30(2), 2000), §§1-4 and 7, pp.333-342, 346-347 (PDF pp.1-10, 14-15): Theorems 1, 3, 4; numerical examples, sha256:8e9e86f6dd4ed6a402d5380dd446ebeba5e2c3d921f90828ad485a8cfb508086 — https://www.casact.org/sites/default/files/2021-03/7_Mack_2000.pdf
- note: Stale page re-verified with no new findings. Medium: vault-authored worked examples.
