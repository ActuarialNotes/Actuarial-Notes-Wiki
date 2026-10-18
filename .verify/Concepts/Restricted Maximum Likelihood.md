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
