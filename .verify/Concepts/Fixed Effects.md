---
target: Concepts/Fixed Effects.md
created: 2026-10-18
---

## [F-001] Territory listed as a typical fixed factor, then classed as random in the page's own example
- entry_type: finding
- author: agent:validate-v1
- run_id: 2026-10-18T16:03Z/765d
- date: 2026-10-18
- severity: minor
- status: open
- locus: bullets, first bullet
- claim: A factor belongs in the fixed part when its levels are the specific levels you care about ... — territory, vehicle class, coverage limit
- evidence: Internal consistency (rank 4): the page's own example 'Fixed or Random?' classes territory (68 levels, most thin) as random, the case lme4 p.6 and SAS p.5320 describe for random effects (shrinkage toward 0). Listing territory as the stock fixed example contradicts it.
- source_rank: 4
- proposed_action: Delete 'territory' from the list of fixed-factor examples.
- applied: true
- fingerprint: 9ed06d26be4d

## [F-001/R] Correction applied
- entry_type: resolution
- author: agent:validate-v1
- run_id: 2026-10-18T16:03Z/765d
- date: 2026-10-18
- resolves: F-001
- status: resolved
- note: Deleted 'territory,' from the fixed-factor list in this run.

## [F-002] Coefficient interpretation attributed to a GLM, where it holds only on the link scale
- entry_type: finding
- author: agent:validate-v1
- run_id: 2026-10-18T16:03Z/765d
- date: 2026-10-18
- severity: minor
- status: open
- locus: bullets, third bullet
- claim: Interpretation is the same as in a [[Generalized Linear Model]]: beta_j is the change in the mean response per unit of x_j
- evidence: In a GLM with a non-identity link, beta_j changes g(mean), not the mean (Klinker p.10: 'g(E[Y|u]) = X beta + Zu'). Klinker p.4 calls the LME 'classical linear regression ... with the addition of random effects'; lme4 p.8 builds X 'in the same way that the R lm function generates model matrices'. The stated interpretation is linear regression's.
- source_rank: 3
- proposed_action: Retarget the link to [[Linear Regression|linear regression]].
- applied: true
- fingerprint: 85e5b5280450

## [F-002/R] Correction applied
- entry_type: resolution
- author: agent:validate-v1
- run_id: 2026-10-18T16:03Z/765d
- date: 2026-10-18
- resolves: F-002
- status: resolved
- note: Link retargeted to [[Linear Regression|linear regression]] in this run.

## [C-001] Validation pass — verified
- entry_type: comment
- author: agent:validate-v1
- run_id: 2026-10-18T16:03Z/765d
- date: 2026-10-18
- status_set: verified
- confidence: medium
- checks_run: concept checked claim by claim against open texts; every worked example recomputed before reading its answer; wiki-links resolved
- sources_checked: Bates, Maechler, Bolker & Walker, Fitting Linear Mixed-Effects Models Using lme4, J. Stat. Softw. 67(1), 2015 (CC BY), Sections 1.1, 2.2 (Table 2), 3.4 (eqs. 30-41), 5.2 (anova refit with ML), pp.2-8, 16-17, 24-25, 34, sha256:a9ae8934fbe46ac4c3a6d333a75c2c815f9d2ed7725d7613ddce1d5a5244bbff — https://www.jstatsoft.org/index.php/jss/article/view/v067i01/946; SAS/STAT 13.1 User's Guide, Chapter 63: The MIXED Procedure (SAS Institute), Notation for the Mixed Model p.5236; Mixed Models Theory pp.5315-5322 (CS vs random intercept, ML/REML log-likelihoods, mixed model equations, BLUP/EBLUP, boundary mixture of chi-squares); Table 63.17 p.5303-5304, sha256:bbde853def15e236149d167e1b35f191c5b2d002efd59792b75f5d22449a72a1 — https://support.sas.com/documentation/onlinedoc/stat/131/mixed.pdf; Klinker, Generalized Linear Mixed Models for Ratemaking, CAS E-Forum Winter 2011 Vol. 2, Sections 2-3, pp.3-10, eq. (3.6), sha256:7ef820482d27ecb454bd80f9b649ed7d8d6a5f0b4bf25a910c457c3726d36b68 — https://www.casact.org/sites/default/files/database/forum_11wforumpt2_klinker.pdf
- note: Model y = X beta + Z b + e, E[y] = X beta (SAS p.5236); beta by GLS given V (SAS p.5320); fixed-effect comparisons need ML refits (lme4 p.34: anova refits with ML, 'necessary ... when comparing models that differ in their fixed effects'). F-001 and F-002 fixed. Confidence capped at medium (decision D7): the assigned reading, West, Welch & Galecki 3rd ed., is commercial and was not read; the page was checked against open texts covering the same ground and West's own author-hosted shrinkage note. Notation: the page writes the random effects b (Laird-Ware/lme4); SAS writes gamma and G for D; West's Chapter 2 notation could not be checked.
