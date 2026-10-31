---
target: Concepts/Covariance Structure.md
created: 2026-10-18
---

## [F-001] Random intercept and compound symmetry are equivalent only up to the sign of the correlation
- entry_type: finding
- author: agent:validate-v1
- run_id: 2026-10-18T16:03Z/765d
- date: 2026-10-18
- severity: minor
- status: open
- locus: bullets, first bullet
- claim: A random intercept already implies compound symmetry — the two are the same model written differently.
- evidence: SAS/STAT PROC MIXED ch.63, Mixed Models Theory pp.5315-5316: the CS REPEATED model and the RANDOM intercept model 'fit the same model ... however, the RANDOM specifications constrain the correlation to be positive, whereas the REPEATED specification leaves the correlation unconstrained.' The page stated the equivalence without that condition.
- source_rank: 3
- proposed_action: Restate to the source: add that the random intercept constrains the common correlation to be positive while a CS residual structure leaves it unconstrained.
- applied: true
- fingerprint: bb1f958d8d3f

## [F-001/R] Correction applied
- entry_type: resolution
- author: agent:validate-v1
- run_id: 2026-10-18T16:03Z/765d
- date: 2026-10-18
- resolves: F-001
- status: resolved
- note: Restated to SAS p.5316 in this run: the bullet now carries the positive-correlation condition.

## [C-001] Validation pass — verified
- entry_type: comment
- author: agent:validate-v1
- run_id: 2026-10-18T16:03Z/765d
- date: 2026-10-18
- status_set: verified
- confidence: medium
- checks_run: concept checked claim by claim against open texts; every worked example recomputed before reading its answer; wiki-links resolved
- sources_checked: SAS/STAT 13.1 User's Guide, Chapter 63: The MIXED Procedure (SAS Institute), Notation for the Mixed Model p.5236; Mixed Models Theory pp.5315-5322 (CS vs random intercept, ML/REML log-likelihoods, mixed model equations, BLUP/EBLUP, boundary mixture of chi-squares); Table 63.17 p.5303-5304, sha256:bbde853def15e236149d167e1b35f191c5b2d002efd59792b75f5d22449a72a1 — https://support.sas.com/documentation/onlinedoc/stat/131/mixed.pdf; Bates, Maechler, Bolker & Walker, Fitting Linear Mixed-Effects Models Using lme4, J. Stat. Softw. 67(1), 2015 (CC BY), Sections 1.1, 2.2 (Table 2), 3.4 (eqs. 30-41), 5.2 (anova refit with ML), pp.2-8, 16-17, 24-25, 34, sha256:a9ae8934fbe46ac4c3a6d333a75c2c815f9d2ed7725d7613ddce1d5a5244bbff — https://www.jstatsoft.org/index.php/jss/article/view/v067i01/946
- note: Parameter counts checked against SAS Table 63.17 (CS 2, AR(1) 2, TOEP t, UN t(t+1)/2, VC one per effect); V = ZGZ' + R (SAS p.5236); LRT on covariance structures with identical fixed effects (SAS p.5322; lme4 p.34). Example recomputed: 0.62, 0.62^2 = 0.384, 0.62^3 = 0.238; matches. F-001 fixed. Confidence capped at medium (decision D7): the assigned reading, West, Welch & Galecki 3rd ed., is commercial and was not read; the page was checked against open texts covering the same ground and West's own author-hosted shrinkage note. Notation: the page writes the random effects b (Laird-Ware/lme4); SAS writes gamma and G for D; West's Chapter 2 notation could not be checked.

## [C-002] Validation pass — verified
- entry_type: comment
- author: agent:validate-v1
- run_id: 2026-10-31T05:07Z/9044
- date: 2026-10-31
- status_set: verified
- confidence: medium
- checks_run: whole page re-checked claim by claim, including the two bullets added 2026-10-31; example recomputed; wiki-links resolved; compared with masii-2018f-008/-009 and 2019f-015 for rule 10
- sources_checked: SAS/STAT 13.1 User's Guide, Chapter 63: The MIXED Procedure (SAS Institute), Notation p.5236; Mixed Models Theory pp.5315-5316 (RANDOM intercept constrains the correlation to be positive, REPEATED CS leaves it unconstrained; Z is 3s x s, G is s x s), p.5322; Computational Issues pp.5352-5354 (boundary estimates, drop a zero variance component, Convergence Problems: PARMS initial values and grid search, rescaling); REPEATED GROUP= option; Example 63.5, sha256:bbde853def15e236149d167e1b35f191c5b2d002efd59792b75f5d22449a72a1 — https://support.sas.com/documentation/onlinedoc/stat/131/mixed.pdf; Bates, Maechler, Bolker & Walker, Fitting Linear Mixed-Effects Models Using lme4, J. Stat. Softw. 67(1), 2015 (CC BY), Sections 1.1, 2.2-2.3 (Tables 2, 4), 3.4 (eqs. 30-41), 5.2, Appendix A.1 (unstructured 3x3 covariance of intercept and two slopes), pp.2-9, 16-17, 24-25, 34, 42, sha256:a9ae8934fbe46ac4c3a6d333a75c2c815f9d2ed7725d7613ddce1d5a5244bbff — https://www.jstatsoft.org/index.php/jss/article/view/v067i01/946; Grace-Martin, When the Hessian Matrix Goes Wacky, The Analysis Factor ('run a marginal (aka population-averaged) model instead of a mixed model ... using a Repeated statement instead of a Random statement'; rescaling; removing a random effect) — https://www.theanalysisfactor.com/wacky-hessian-matrix/
- note: Dimension of D: one random effect per column of Z_i, D q x q (lme4 §2.3 Table 4; Appendix A.1 'unstructured 3x3 covariance matrix ... intercept and the two slopes'; SAS p.5316 Z 3s x s, G s x s); beta, y_i, R_i sized by p and n_i, not D. Implied marginal model: REPEATED fits the same model as RANDOM, RANDOM constrains the correlation positive, REPEATED unconstrained (SAS p.5316); marginal model as an alternative to a mixed model that will not estimate (Analysis Factor). Table parameter counts per SAS Table 63.17; example 0.62, 0.384, 0.238. Confidence medium (D7): the assigned reading, West, Welch & Galecki 3rd ed., is commercial and was not read; checked against the open texts cited.
