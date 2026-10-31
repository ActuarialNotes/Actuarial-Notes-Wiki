---
target: Concepts/Hierarchical Model.md
created: 2026-10-18
---

## [F-001] 'Nested model' given as a synonym for a hierarchical model
- entry_type: finding
- author: agent:validate-v1
- run_id: 2026-10-18T16:03Z/765d
- date: 2026-10-18
- severity: minor
- status: open
- locus: lead sentence
- claim: A Hierarchical Model (also called a multilevel model or nested model)
- evidence: UCLA OARC introduction: 'Linear mixed models (also called multilevel models)' and 'multilevel/hierarchical'; lme4 p.7 says 'nested (or hierarchical) structure'. None calls the model a 'nested model', a term the MAS-II material uses for one model being a special case of another in a likelihood ratio test (SAS p.5322).
- source_rank: 3
- proposed_action: Delete 'or nested model'.
- applied: true
- fingerprint: dad8c0b16a95

## [F-001/R] Correction applied
- entry_type: resolution
- author: agent:validate-v1
- run_id: 2026-10-18T16:03Z/765d
- date: 2026-10-18
- resolves: F-001
- status: resolved
- note: Deleted 'or **nested model**' in this run.

## [C-001] Validation pass — verified
- entry_type: comment
- author: agent:validate-v1
- run_id: 2026-10-18T16:03Z/765d
- date: 2026-10-18
- status_set: verified
- confidence: medium
- checks_run: concept checked claim by claim against open texts; every worked example recomputed before reading its answer; wiki-links resolved
- sources_checked: UCLA OARC, Introduction to Linear Mixed Models, introduction; G and R matrices, sha256:5ec104acf92fbd13cb9affc0a67a509ea1b6f2d6bab6c7c3bf1aa57f8cf4df55 — https://stats.oarc.ucla.edu/other/mult-pkg/introduction-to-linear-mixed-models/; Bates, Maechler, Bolker & Walker, Fitting Linear Mixed-Effects Models Using lme4, J. Stat. Softw. 67(1), 2015 (CC BY), Sections 1.1, 2.2 (Table 2), 3.4 (eqs. 30-41), 5.2 (anova refit with ML), pp.2-8, 16-17, 24-25, 34, sha256:a9ae8934fbe46ac4c3a6d333a75c2c815f9d2ed7725d7613ddce1d5a5244bbff — https://www.jstatsoft.org/index.php/jss/article/view/v067i01/946; SAS/STAT 13.1 User's Guide, Chapter 63: The MIXED Procedure (SAS Institute), Notation for the Mixed Model p.5236; Mixed Models Theory pp.5315-5322 (CS vs random intercept, ML/REML log-likelihoods, mixed model equations, BLUP/EBLUP, boundary mixture of chi-squares); Table 63.17 p.5303-5304, sha256:bbde853def15e236149d167e1b35f191c5b2d002efd59792b75f5d22449a72a1 — https://support.sas.com/documentation/onlinedoc/stat/131/mixed.pdf
- note: Two-level random-intercept model and ICC = su2/(su2+se2) match SAS p.5315 (common correlation s1^2/(s1^2+s^2)) and p.5369 ICC example; random slopes per lme4 Table 2. Example recomputed: 0.04/0.20 = 0.20; matches. F-001 fixed. Confidence capped at medium (decision D7): the assigned reading, West, Welch & Galecki 3rd ed., is commercial and was not read; the page was checked against open texts covering the same ground and West's own author-hosted shrinkage note. Notation: the page writes the random effects b (Laird-Ware/lme4); SAS writes gamma and G for D; West's Chapter 2 notation could not be checked.

## [F-002] Unsourced closing sentence in the substitution bullet
- entry_type: finding
- author: agent:validate-v1
- run_id: 2026-10-31T05:07Z/9044
- date: 2026-10-31
- severity: minor
- status: open
- locus: bullets, 'Converting to one equation', last sentence
- claim: Each random effect, and the residual, appears exactly once.
- evidence: Not stated in any source read (Adolph slides 75-78, SAS Example 63.5, Rodriguez c8); the writer's hand-off marks it as the writer's own reading of the substitution. As a general rule it is not sourced.
- source_rank: 5
- proposed_action: Delete the sentence.
- applied: true
- fingerprint: 4800878c776d

## [F-002/R] Correction applied
- entry_type: resolution
- author: agent:validate-v1
- run_id: 2026-10-31T05:07Z/9044
- date: 2026-10-31
- resolves: F-002
- status: resolved
- note: Deleted the sentence in this run (rule 2); the substitution, random slope and cross-level interaction statements stay, each sourced to Adolph slides 77-78.

## [C-002] Validation pass — verified
- entry_type: comment
- author: agent:validate-v1
- run_id: 2026-10-31T05:07Z/9044
- date: 2026-10-31
- status_set: verified
- confidence: medium
- checks_run: whole page re-checked claim by claim, including the two bullets added 2026-10-31; example recomputed; wiki-links resolved; compared with masii-2018f-015, 2019f-007, 2019f-011 for rule 10 (the page's general x_ij, z_j example carries none of their variables or answers)
- sources_checked: Adolph, Introduction to Multilevel Models, POLS/CSSS 510 slides, Univ. of Washington, slides 22, 75-78 (Level 1 / Level 2; level-two equations for the intercept and coefficient; substituting gives random intercepts and coefficients with a cross-level interaction), sha256:e0c944aba79c236b63f19c8399b52842c14fcbe3d68d380176bb874b3dafdd2f — https://faculty.washington.edu/cadolph/mle/topic7.pw.pdf; Rodriguez, Models for Longitudinal and Clustered Data (2008, rev. 2012), §2.2-2.3 (a_i and e_ij as error terms at the group and individual levels; random slopes as an individual covariate interacting with group characteristics), sha256:59a9530438fb4812feeabbb9abdc8eb89551e1f8d457cd8e18faf77601e40ce3 — https://grodri.github.io/glms/notes/c8.pdf; SAS/STAT 13.1 User's Guide, Chapter 63: The MIXED Procedure (SAS Institute), Notation p.5236; Mixed Models Theory pp.5315-5316 (RANDOM intercept constrains the correlation to be positive, REPEATED CS leaves it unconstrained; Z is 3s x s, G is s x s), p.5322; Computational Issues pp.5352-5354 (boundary estimates, drop a zero variance component, Convergence Problems: PARMS initial values and grid search, rescaling); REPEATED GROUP= option; Example 63.5, sha256:bbde853def15e236149d167e1b35f191c5b2d002efd59792b75f5d22449a72a1 — https://support.sas.com/documentation/onlinedoc/stat/131/mixed.pdf; Bates, Maechler, Bolker & Walker, Fitting Linear Mixed-Effects Models Using lme4, J. Stat. Softw. 67(1), 2015 (CC BY), Sections 1.1, 2.2-2.3 (Tables 2, 4), 3.4 (eqs. 30-41), 5.2, Appendix A.1 (unstructured 3x3 covariance of intercept and two slopes), pp.2-9, 16-17, 24-25, 34, 42, sha256:a9ae8934fbe46ac4c3a6d333a75c2c815f9d2ed7725d7613ddce1d5a5244bbff — https://www.jstatsoft.org/index.php/jss/article/view/v067i01/946
- note: Level 1 / Level 2: observation-level equation with group-specific coefficients and the residual, level-two equations with group covariates and group random effects, 'level two variables ... help determine level one relationships' (Adolph slides 22, 75-76; Rodriguez c8 §2.2: error terms at the group and individual levels). Substitution: random intercepts and coefficients plus cross-level interaction (Adolph slides 77-78; Rodriguez c8: a random slope interacts an individual covariate with group characteristics); the page's collected equation re-derived. F-002 fixed (unsourced closing sentence deleted). ICC example 0.04/0.20 = 0.20; ICC as SAS p.5315 common correlation. Confidence medium (D7): the assigned reading, West, Welch & Galecki 3rd ed., is commercial and was not read; checked against the open texts cited.
