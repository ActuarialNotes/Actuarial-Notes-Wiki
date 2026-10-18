---
target: Concepts/Random Intercept and Slope.md
created: 2026-10-18
---

## [F-001] Random slope said to make the within-group variance grow with x
- entry_type: finding
- author: agent:validate-v1
- run_id: 2026-10-18T16:03Z/765d
- date: 2026-10-18
- severity: minor
- status: open
- locus: bullets, second bullet
- claim: Random intercept and slope: fanning lines, so within-group variance grows with x and the correlation between two observations depends on their x values
- evidence: Within a group (given b) the variance is the residual sigma^2, constant in x (lme4 eq. 2; SAS p.5236 with R = sigma^2 I). It is the marginal variance z'Dz + sigma^2 = s0^2 + 2 s01 x + s1^2 x^2 + sigma^2 (V = ZGZ' + R, SAS p.5236) that depends on x, and it is quadratic, falling where s01 < 0 and x < -s01/s1^2, so it need not grow. Recomputation (rank 5) falsifies the clause; the correlation clause is right.
- source_rank: 3
- proposed_action: Delete 'within-group variance grows with x and'.
- applied: true
- fingerprint: 5fef569c57d0

## [F-001/R] Correction applied
- entry_type: resolution
- author: agent:validate-v1
- run_id: 2026-10-18T16:03Z/765d
- date: 2026-10-18
- resolves: F-001
- status: resolved
- note: Deleted the within-group-variance clause in this run; the bullet keeps the correlation clause.

## [C-001] Validation pass — verified
- entry_type: comment
- author: agent:validate-v1
- run_id: 2026-10-18T16:03Z/765d
- date: 2026-10-18
- status_set: verified
- confidence: medium
- checks_run: concept checked claim by claim against open texts; every worked example recomputed before reading its answer; wiki-links resolved
- sources_checked: Bates, Maechler, Bolker & Walker, Fitting Linear Mixed-Effects Models Using lme4, J. Stat. Softw. 67(1), 2015 (CC BY), Sections 1.1, 2.2 (Table 2), 3.4 (eqs. 30-41), 5.2 (anova refit with ML), pp.2-8, 16-17, 24-25, 34, sha256:a9ae8934fbe46ac4c3a6d333a75c2c815f9d2ed7725d7613ddce1d5a5244bbff — https://www.jstatsoft.org/index.php/jss/article/view/v067i01/946; SAS/STAT 13.1 User's Guide, Chapter 63: The MIXED Procedure (SAS Institute), Notation for the Mixed Model p.5236; Mixed Models Theory pp.5315-5322 (CS vs random intercept, ML/REML log-likelihoods, mixed model equations, BLUP/EBLUP, boundary mixture of chi-squares); Table 63.17 p.5303-5304, sha256:bbde853def15e236149d167e1b35f191c5b2d002efd59792b75f5d22449a72a1 — https://support.sas.com/documentation/onlinedoc/stat/131/mixed.pdf; Bolker et al., GLMM FAQ (author-hosted), Nested or crossed?; Testing hypotheses (boundary-conservative LRT), sha256:53ab8a0c586ae5893841de85a84585e1cb46e79852c7c349c9e5bedb5c63d231 — https://bbolker.github.io/mixedmodels-misc/glmmFAQ.html
- note: Correlated intercept-slope D and x + (x|g) match lme4 Table 2 and p.7; convergence/singular fits with complex structures on small data, lme4 p.25; LRT on a variance parameter at its boundary is a chi-square mixture (SAS p.5322) and the naive chi-square p-value is conservative (GLMM FAQ). Example recomputed: 812.4 - 803.1 = 9.3 > 5.99 on 2 df, reject; matches. F-001 fixed. Confidence capped at medium (decision D7): the assigned reading, West, Welch & Galecki 3rd ed., is commercial and was not read; the page was checked against open texts covering the same ground and West's own author-hosted shrinkage note. Notation: the page writes the random effects b (Laird-Ware/lme4); SAS writes gamma and G for D; West's Chapter 2 notation could not be checked.
