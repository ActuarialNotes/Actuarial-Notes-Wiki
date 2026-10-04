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
