---
target: Concepts/Nested and Crossed Factors.md
created: 2026-10-18
---

## [C-001] Validation pass — verified
- entry_type: comment
- author: agent:validate-v1
- run_id: 2026-10-18T16:03Z/765d
- date: 2026-10-18
- status_set: verified
- confidence: medium
- checks_run: concept checked claim by claim against open texts; every worked example recomputed before reading its answer; wiki-links resolved
- sources_checked: Bates, Maechler, Bolker & Walker, Fitting Linear Mixed-Effects Models Using lme4, J. Stat. Softw. 67(1), 2015 (CC BY), Sections 1.1, 2.2 (Table 2), 3.4 (eqs. 30-41), 5.2 (anova refit with ML), pp.2-8, 16-17, 24-25, 34, sha256:a9ae8934fbe46ac4c3a6d333a75c2c815f9d2ed7725d7613ddce1d5a5244bbff — https://www.jstatsoft.org/index.php/jss/article/view/v067i01/946; Bolker et al., GLMM FAQ (author-hosted), Nested or crossed?; Testing hypotheses (boundary-conservative LRT), sha256:53ab8a0c586ae5893841de85a84585e1cb46e79852c7c349c9e5bedb5c63d231 — https://bbolker.github.io/mixedmodels-misc/glmmFAQ.html; SAS/STAT 13.1 User's Guide, Chapter 63: The MIXED Procedure (SAS Institute), Notation for the Mixed Model p.5236; Mixed Models Theory pp.5315-5322 (CS vs random intercept, ML/REML log-likelihoods, mixed model equations, BLUP/EBLUP, boundary mixture of chi-squares); Table 63.17 p.5303-5304, sha256:bbde853def15e236149d167e1b35f191c5b2d002efd59792b75f5d22449a72a1 — https://support.sas.com/documentation/onlinedoc/stat/131/mixed.pdf
- note: (1|g1/g2) = (1|g1)+(1|g1:g2) and crossed (1|g1)+(1|g2) match lme4 Table 2 and p.7; the recycled-inner-ID error and unique-coding advice match the GLMM FAQ 'Nested or crossed?'. Examples recomputed: 0.40, 0.25, 0.10 (and 0.10 vs 0.25 is a 60% understatement, 'more than half'); 0.040, 0.30, 0.20; all match. Confidence capped at medium (decision D7): the assigned reading, West, Welch & Galecki 3rd ed., is commercial and was not read; the page was checked against open texts covering the same ground and West's own author-hosted shrinkage note. Notation: the page writes the random effects b (Laird-Ware/lme4); SAS writes gamma and G for D; West's Chapter 2 notation could not be checked.
