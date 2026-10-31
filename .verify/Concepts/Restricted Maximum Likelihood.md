---
target: Concepts/Restricted Maximum Likelihood.md
created: 2026-10-18
---

## [F-001] Unsourced claim that ML/REML bias depends on the number of groups
- entry_type: finding
- author: agent:validate-v1
- run_id: 2026-10-18T16:03Z/765d
- date: 2026-10-18
- severity: minor
- status: open
- locus: bullets, last bullet
- claim: Bias matters most with few groups; with many groups ML and REML converge
- evidence: None of the sources read states this. lme4 eqs. 33 and 40 give sigma^2 = r^2/n (ML) vs r^2/(n-p) (REML), so the stated bias is in the p fixed-effect degrees of freedom; a group-count dependence for the random-effect variance is plausible but was not found in a source read this session.
- source_rank: 5
- proposed_action: Cite a source for the group-count statement or delete it.
- applied: false
- fingerprint: 296971d733a3

## [C-001] Validation pass — verified
- entry_type: comment
- author: agent:validate-v1
- run_id: 2026-10-18T16:03Z/765d
- date: 2026-10-18
- status_set: verified
- confidence: medium
- checks_run: concept checked claim by claim against open texts; every worked example recomputed before reading its answer; wiki-links resolved
- sources_checked: SAS/STAT 13.1 User's Guide, Chapter 63: The MIXED Procedure (SAS Institute), Notation for the Mixed Model p.5236; Mixed Models Theory pp.5315-5322 (CS vs random intercept, ML/REML log-likelihoods, mixed model equations, BLUP/EBLUP, boundary mixture of chi-squares); Table 63.17 p.5303-5304, sha256:bbde853def15e236149d167e1b35f191c5b2d002efd59792b75f5d22449a72a1 — https://support.sas.com/documentation/onlinedoc/stat/131/mixed.pdf; Bates, Maechler, Bolker & Walker, Fitting Linear Mixed-Effects Models Using lme4, J. Stat. Softw. 67(1), 2015 (CC BY), Sections 1.1, 2.2 (Table 2), 3.4 (eqs. 30-41), 5.2 (anova refit with ML), pp.2-8, 16-17, 24-25, 34, sha256:a9ae8934fbe46ac4c3a6d333a75c2c815f9d2ed7725d7613ddce1d5a5244bbff — https://www.jstatsoft.org/index.php/jss/article/view/v067i01/946
- note: REML log-likelihood -1/2[log|V| + log|X'V^-1 X| + r'V^-1 r] matches SAS p.5319 (constants aside); sigma^2 = r^2/(n-p) vs r^2/n, lme4 eqs. 33, 40; ML refit required to compare fixed effects, lme4 p.34; REML default, SAS p.5235. F-001 (minor, unsourced bullet) left open for the resolve run. Confidence capped at medium (decision D7): the assigned reading, West, Welch & Galecki 3rd ed., is commercial and was not read; the page was checked against open texts covering the same ground and West's own author-hosted shrinkage note. Notation: the page writes the random effects b (Laird-Ware/lme4); SAS writes gamma and G for D; West's Chapter 2 notation could not be checked.

## [F-001/R] Correction applied
- entry_type: resolution
- author: agent:validate-v1
- run_id: 2026-10-31T05:07Z/9044
- date: 2026-10-31
- resolves: F-001
- status: resolved
- note: Sourced, no edit: Newsom (Portland State, Psy 526/626 handout, pp.2, 4): ML variance estimates are biased, 'with more substantial biases occurring with smaller samples (fewer groups)', and ML and REML give similar results, 'with closer correspondence as the number of groups increases' / 'if the number of groups is large'. The bullet says no more than that.

## [C-002] Validation pass — verified
- entry_type: comment
- author: agent:validate-v1
- run_id: 2026-10-31T05:07Z/9044
- date: 2026-10-31
- status_set: verified
- confidence: medium
- checks_run: whole page re-checked claim by claim, including the bullet added 2026-10-31; wiki-links resolved; compared with masii-2018f-009 for rule 10
- sources_checked: SAS/STAT 13.1 User's Guide, Chapter 63: The MIXED Procedure (SAS Institute), Notation p.5236; Mixed Models Theory pp.5315-5316 (RANDOM intercept constrains the correlation to be positive, REPEATED CS leaves it unconstrained; Z is 3s x s, G is s x s), p.5322; Computational Issues pp.5352-5354 (boundary estimates, drop a zero variance component, Convergence Problems: PARMS initial values and grid search, rescaling); REPEATED GROUP= option; Example 63.5, sha256:bbde853def15e236149d167e1b35f191c5b2d002efd59792b75f5d22449a72a1 — https://support.sas.com/documentation/onlinedoc/stat/131/mixed.pdf; Bates, Maechler, Bolker & Walker, Fitting Linear Mixed-Effects Models Using lme4, J. Stat. Softw. 67(1), 2015 (CC BY), Sections 1.1, 2.2-2.3 (Tables 2, 4), 3.4 (eqs. 30-41), 5.2, Appendix A.1 (unstructured 3x3 covariance of intercept and two slopes), pp.2-9, 16-17, 24-25, 34, 42, sha256:a9ae8934fbe46ac4c3a6d333a75c2c815f9d2ed7725d7613ddce1d5a5244bbff — https://www.jstatsoft.org/index.php/jss/article/view/v067i01/946; Grace-Martin, When the Hessian Matrix Goes Wacky, The Analysis Factor ('run a marginal (aka population-averaged) model instead of a mixed model ... using a Repeated statement instead of a Random statement'; rescaling; removing a random effect) — https://www.theanalysisfactor.com/wacky-hessian-matrix/; Newsom, Multilevel Regression Estimation Methods for Continuous Dependent Variables, Psy 526/626 handout, Portland State Univ., pp.2, 4 (ML variance estimates biased, more so with fewer groups; ML and REML similar when the number of groups is large), sha256:c4b4a91eb384b7690fcb2ee2671a0a7b698a3494d7b416ef705269593402dfa1 — https://web.pdx.edu/~newsomj/mlrclass/ho_estimators.pdf
- note: New bullet: Newton-Raphson can fail to converge; 'Estimated G matrix is not positive definite' note; variance component on its boundary of 0, consider dropping the random effect; PARMS initial values and grid search; rescaling so covariance parameters are on the same scale (SAS pp.5352-5354, Example output); marginal model instead of the mixed model (Analysis Factor; SAS p.5316 REPEATED vs RANDOM). REML log-likelihood (SAS p.5319), r^2/(n-p) vs r^2/n (lme4 eqs. 33, 40), ML refit for fixed-effect comparisons (lme4 p.34). F-001 closed by Newsom pp.2, 4. Confidence medium (D7): the assigned reading, West, Welch & Galecki 3rd ed., is commercial and was not read; checked against the open texts cited.
