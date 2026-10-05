---
target: Concepts/Linear Mixed Model.md
created: 2026-10-04
---

## [F-001] REML/ML bullet omits that comparisons of fixed effects need ML fits
- entry_type: finding
- author: agent:validate-v1
- run_id: 2026-10-04T20:47Z/8861
- date: 2026-10-04
- severity: minor
- status: open
- locus: bullet 'Parameters are estimated by REML ... or ML', line 35
- claim: Parameters are estimated by REML (Restricted Maximum Likelihood) or ML, preferring REML for variance component estimates.
- evidence: SAS/STAT 9.3 User's Guide, PROC MIXED 'Mixed Models Theory', Inference and Test Statistics: a likelihood ratio test comparing two fixed-effects models 'is computed just as when comparing different covariance models, although you should use ML and not REML here because the penalty term associated with restricted likelihoods depends upon the fixed-effects specification', sha256:00898035ad108f69d9ec64c3803312516f8413b9ed5e4970fa25d816fbe40edd — https://support.sas.com/documentation/cdl/en/statug/63962/HTML/default/statug_mixed_sect025.htm; Bates, Maechler, Bolker & Walker, lme4 vignette (JSS 2015) sec.5 (PDF p.35): anova() refits REML models with ML, 'which is necessary in order to get sensible answers when comparing models that differ in their fixed effects', sha256:60474d07bdb3a511f804a6cd2e73494fd8eb5713f532e2382f69c5dea2e8782e — https://cran.r-project.org/web/packages/lme4/vignettes/lmer.pdf. The bullet is not wrong, but a reader told only to prefer REML would compare REML fits with different fixed effects. The vault's MAS-II exam page (objective 4) asks the candidate to know which of the two a comparison requires. The 'prefer REML for variance components' half was not located in the sources read (West, the MAS-II reading, is not free).
- source_rank: 3
- proposed_action: Add that likelihood-ratio tests between models with different fixed effects must use ML fits; REML-based tests compare covariance structures with the same fixed effects.
- applied: false
- fingerprint: 945a87dd5090

## [C-001] Validation pass — verified
- entry_type: comment
- author: agent:validate-v1
- run_id: 2026-10-04T20:47Z/8861
- date: 2026-10-05
- status_set: verified
- confidence: medium
- checks_run: model equation, G and R, independence vs UCLA and SAS; marginal covariance ZGZ' + R vs SAS; ML/REML vs SAS (F-001 confirmed: SAS and the lme4 vignette require ML for fixed-effects comparisons); hierarchical models as nested random effects vs Rodriguez c8 sec.2.3 and UCLA; BLUP-credibility correspondence vs Brazauskas & Dornheim and West's shrinkage notes; example (sigma_u^2 as between-group variance) vs Rodriguez c8 sec.2.2; figure read; links resolve
- sources_checked: CAS Exam MAS-II Content Outline 2026, Domain B Linear Mixed Models (tasks 1-4; West et al. 3rd ed. + 'Additional Notes on Shrinkage Means'), PDF pp.4-5, sha256:babf0548b7d674e02d2cffdaee11e5063f8e8c03b3461b8ba2bdfdbc0f90ea1b — https://www.casact.org/sites/default/files/2026-01/MASII_Content_Outlines_2026.pdf; West, 'Additional Notes on Shrinkage Means' (MAS-II reading; BLUP mean as a weighted combination of the fixed-effects mean and the level's own mean), sha256:a843104b0090e1e7c305be0b4a83064c2fe5620f7570937eac321e425aba57f9 — http://www-personal.umich.edu/~bwest/shrinkage.doc; UCLA OARC, 'Introduction to Linear Mixed Models' (y = X beta + Z u + e, u ~ N(0,G), R, two-level form), sha256:21bdef6434fa5b9d63320bab41d4b03d6b8214f67989dffb6dde19237997956f — https://stats.oarc.ucla.edu/other/mult-pkg/introduction-to-linear-mixed-models/; SAS/STAT 9.3 User's Guide, PROC MIXED 'Mixed Models Theory' (E and Var of gamma and e; V = ZGZ' + R; BLUP; ML and REML), sha256:00898035ad108f69d9ec64c3803312516f8413b9ed5e4970fa25d816fbe40edd — https://support.sas.com/documentation/cdl/en/statug/63962/HTML/default/statug_mixed_sect025.htm; Brazauskas & Dornheim, 'Credibility and Regression-Type Modeling', in Frees, Derrig & Meyers (eds.), Predictive Modeling Applications in Actuarial Science Vol. 1 (2014), secs.1.2-2.2 (PDF pp.3-7: GLS and BLUP 'correspond to the well-known pricing formulas of credibility theory'; Buhlmann and Buhlmann-Straub as LMMs), sha256:0c13db291312096f4d1bb87f11944d85f436d16447e2e5d3520d064d2c45591d — https://bpb-us-w2.wpmucdn.com/sites.uwm.edu/dist/2/109/files/2016/04/2014_PMbook_final-1dnzm4q.pdf; Rodriguez, GLM lecture notes (Princeton), Models for Longitudinal and Clustered Data (2008, rev. 2012), secs.2.2-2.3 (random intercepts, between/within variance, more than two levels, random slopes) (PDF pp.3-5), sha256:59a9530438fb4812feeabbb9abdc8eb89551e1f8d457cd8e18faf77601e40ce3 — https://grodri.github.io/glms/notes/c8.pdf
- note: F-001 (minor) confirmed and left open; 'prefer REML for variance components' still not located. West (the MAS-II reading) is not free beyond the shrinkage notes, so rank-3 references carry the formulas. Scope: the 2026 outlines put linear mixed models on MAS-II (West) and Dobson's Ch.11 is outside MAS-I's Ch.1-9, yet the MAS-I exam page lists this page under Model Families — an exam-page issue, reported to the coordinator.

## [F-001/R] Correction applied
- entry_type: resolution
- author: agent:validate-v1
- run_id: 2026-10-04T21:11Z/3707
- date: 2026-10-05
- resolves: F-001
- status: resolved
- note: Bullet rewritten: 'Parameters are estimated by ML or REML. Two covariance structures with the same fixed effects can be compared by a likelihood ratio test on either fit, but models that differ in their fixed effects must be compared with ML fits — the REML likelihood depends on the fixed-effects specification.' The unsourced 'preferring REML for variance component estimates' (not located by phase 1 nor this session in SAS, lme4, UCLA or Rodriguez c8) deleted. Sources: SAS/STAT 9.3 User's Guide, PROC MIXED 'Mixed Models Theory' (ML and REML; Inference and Test Statistics: LRT for covariance models with either ML or REML; for fixed effects 'use ML and not REML here because the penalty term associated with restricted likelihoods depends upon the fixed-effects specification'; V = ZGZ' + R; BLUP), sha256:00898035ad108f69d9ec64c3803312516f8413b9ed5e4970fa25d816fbe40edd — https://support.sas.com/documentation/cdl/en/statug/63962/HTML/default/statug_mixed_sect025.htm; Bates, Maechler, Bolker & Walker, 'Fitting Linear Mixed-Effects Models Using lme4' (JSS 2015 vignette), sec.5 (PDF p.35: anova() refits REML models with ML, 'necessary in order to get sensible answers when comparing models that differ in their fixed effects'), sha256:60474d07bdb3a511f804a6cd2e73494fd8eb5713f532e2382f69c5dea2e8782e — https://cran.r-project.org/web/packages/lme4/vignettes/lmer.pdf.
