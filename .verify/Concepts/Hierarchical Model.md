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
