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

## [C-002] Validation pass — verified
- entry_type: comment
- author: agent:validate-v1
- run_id: 2026-10-04T21:11Z/3707
- date: 2026-10-05
- status_set: verified
- confidence: medium
- checks_run: edited ML/REML bullet re-read against SAS (Inference and Test Statistics) and lme4 sec.5; model equation, u ~ N(0,G) vs UCLA; marginal covariance vs SAS text (formula an image) and recomputed Cov(Zu + e) = ZGZ' + R with u independent of e; BLUP-credibility vs Brazauskas & Dornheim; random-intercept example vs Rodriguez c8 sec.2.2; links resolve
- sources_checked: SAS/STAT 9.3 User's Guide, PROC MIXED 'Mixed Models Theory' (mixed model, 'The variance of y is, therefore, V = ZGZ' + R'; ML and REML; LRTs for covariance vs fixed-effects models; BLUP), sha256:00898035ad108f69d9ec64c3803312516f8413b9ed5e4970fa25d816fbe40edd — https://support.sas.com/documentation/cdl/en/statug/63962/HTML/default/statug_mixed_sect025.htm; Bates, Maechler, Bolker & Walker, 'Fitting Linear Mixed-Effects Models Using lme4' (JSS 2015 vignette), secs.3.4 and 5 (PDF pp.16-17, 35), sha256:60474d07bdb3a511f804a6cd2e73494fd8eb5713f532e2382f69c5dea2e8782e — https://cran.r-project.org/web/packages/lme4/vignettes/lmer.pdf; UCLA OARC, 'Introduction to Linear Mixed Models' (y = X beta + Z u + e, u ~ N(0,G), G the covariance of the random effects, R), sha256:21bdef6434fa5b9d63320bab41d4b03d6b8214f67989dffb6dde19237997956f — https://stats.oarc.ucla.edu/other/mult-pkg/introduction-to-linear-mixed-models/; Brazauskas & Dornheim, 'Credibility and Regression-Type Modeling', in Frees, Derrig & Meyers (eds.), Predictive Modeling Applications in Actuarial Science Vol. 1 (2014), secs.1.2-2.2 (PDF pp.3-6: GLS and BLUP 'correspond to the well-known pricing formulas of credibility theory'; Buhlmann-Straub as an LMM), sha256:0c13db291312096f4d1bb87f11944d85f436d16447e2e5d3520d064d2c45591d — https://bpb-us-w2.wpmucdn.com/sites.uwm.edu/dist/2/109/files/2016/04/2014_PMbook_final-1dnzm4q.pdf; Rodriguez, GLM lecture notes (Princeton), Models for Longitudinal and Clustered Data, secs.2.2-2.3 (PDF pp.3-5), sha256:59a9530438fb4812feeabbb9abdc8eb89551e1f8d457cd8e18faf77601e40ce3 — https://grodri.github.io/glms/notes/c8.pdf; CAS Exam MAS-II Content Outline 2026, Domain B Linear Mixed Models (PDF pp.4-5), sha256:babf0548b7d674e02d2cffdaee11e5063f8e8c03b3461b8ba2bdfdbc0f90ea1b — https://www.casact.org/sites/default/files/2026-01/MASII_Content_Outlines_2026.pdf
- note: Resolve run: F-001 (minor) resolved; the unsourced 'prefer REML for variance components' clause deleted. Medium: West (the MAS-II reading) is not freely available, so rank-3 references carry the page.

## [F-002] Exact t/F condition narrower than the source
- entry_type: finding
- author: agent:checker-west-lmm
- run_id: 2026-10-31T05:03Z/b549
- date: 2026-10-31
- severity: minor
- status: open
- locus: bullet 'These t and F statistics follow exact ...', Estimating and testing the fixed effects
- claim: These t and F statistics follow exact t and F distributions only for certain balanced designs
- evidence: SAS/STAT 13.1 User's Guide, Ch.63 The MIXED Procedure, sha256:bbde853def15e236149d167e1b35f191c5b2d002efd59792b75f5d22449a72a1 — https://support.sas.com/documentation/onlinedoc/stat/131/mixed.pdf, printed p.5323: 't has an exact t distribution only for data exhibiting certain types of balance and for some special unbalanced cases. In general, t is only approximately t-distributed, and its degrees of freedom must be estimated.' The page dropped the special unbalanced cases.
- source_rank: 3
- proposed_action: Restate to the source: 'only for data with certain types of balance and some special unbalanced cases'.
- applied: true
- fingerprint: cea8a46822d7

## [F-002/R] Correction applied
- entry_type: resolution
- author: agent:checker-west-lmm
- run_id: 2026-10-31T05:03Z/b549
- date: 2026-10-31
- resolves: F-002
- status: resolved
- note: Restated in this run to SAS 13.1 p.5323: 'follow exact t and F distributions only for data with certain types of balance and some special unbalanced cases'.

## [C-003] Validation pass — verified
- entry_type: comment
- author: agent:checker-west-lmm
- run_id: 2026-10-31T05:03Z/b549
- date: 2026-10-31
- status_set: verified
- confidence: medium
- checks_run: Whole page re-read. New block 'Estimating and testing the fixed effects' (6 bullets) checked sentence by sentence: GLS formula and V = ZGZ'+R vs SAS p.5320 and pbkrtest eq.13; BLUE vs SAS p.5321; plug-in variance and its understatement under any of ML/REML/MIVQUE0 vs SAS pp.5320-5321, REML's correction of variance-component bias vs SAS Ex.63.1 p.5357; t/F/Type 1/Type 3 vs SAS pp.5322-5323, 5340; omnibus Wald chi-square vs SAS p.5341; Kenward-Roger vs SAS pp.5276-5277, 5321, KR97 abstract, pbkrtest sec.4, lme4 p.34; Wald Z and boundary LRT vs SAS p.5322. One minor restated (F-002). Earlier content: model, G/R, marginal covariance, ML-vs-REML for fixed-effects LRTs (SAS 13.1 p.5323), hierarchical models (Rodriguez c8 sec.2.3), BLUP-credibility (Brazauskas & Dornheim), random-intercept example (c8 sec.2.2), figure (random intercepts around a population line). Rule 10: no served question's numbers or keyed answer on the page; the fixed-effects block states general facts of the SAS documentation. Page is generic: holds for MAS-II, ACIA-CAPSTONE and ATPA alike.
- sources_checked: SAS/STAT 13.1 User's Guide, Ch.63 The MIXED Procedure, Mixed Models Theory and ODS Table Names, printed pp.5276-5277 (DDFM=KENWARDROGER: inflates the estimated variance-covariance matrix, then Satterthwaite-type df), 5318-5319 (GLS; ML and REML), 5320 (beta-hat = (X'V-hat^-1 X)^- X'V-hat^-1 y), 5321 (BLUE if G and R known; C-hat11 the estimated GLS formula; C-hat underestimates, no account made for the uncertainty in estimating G and R; inflation factors small for fairly well balanced data), 5322-5323 (Wald Z unreliable for small samples and variance components; LRT, mixture of chi-squares on the boundary; ML not REML for fixed-effects LRTs; t for single-row L, exact only for certain balance; F for rank L > 1), 5340-5341 (Type 1/Type 3 tests; CHISQ Wald chi-square tests, more liberal, infinite denominator df), 5357 (Example 63.1: REML corrects the downward bias of ML variance-component estimates), sha256:bbde853def15e236149d167e1b35f191c5b2d002efd59792b75f5d22449a72a1 — https://support.sas.com/documentation/onlinedoc/stat/131/mixed.pdf; Kenward & Roger (1997), 'Small sample inference for fixed effects from restricted maximum likelihood', Biometrics 53:983-997, abstract (REML for mixed linear models; asymptotic inference inadequate for small samples; scaled Wald statistic with F approximation; adjusted covariance estimator with reduced small-sample bias) — https://pubmed.ncbi.nlm.nih.gov/9333350/; Halekoh & Hojsgaard (2014), 'A Kenward-Roger Approximation and Parametric Bootstrap Methods for Tests in Linear Mixed Models — The R Package pbkrtest', JSS 59(9), sec.4.1-4.2 (PDF pp.10-11: beta-hat = Phi(gamma-hat) X' Sigma(gamma-hat)^-1 Y; usual Wald F asymptotically chi2_d/d, the limit of F_{d,m} as m -> infinity; Phi underestimates Var(beta-hat); KR adjusted covariance and moment-matched denominator df), sha256:3d706a5b84b213b6b473b1ffa6455fdda230342b3b5195e127e098239b895b82 — https://www.jstatsoft.org/article/view/v059i09; Bates, Maechler, Bolker & Walker (2015), 'Fitting Linear Mixed-Effects Models Using lme4', JSS 67(1), sec.5 (PDF p.34: refit with ML when fixed effects differ; null distributions asymptotically normal, not t/F in finite samples; Satterthwaite / Kenward-Roger df), sha256:a9ae8934fbe46ac4c3a6d333a75c2c815f9d2ed7725d7613ddce1d5a5244bbff — https://www.jstatsoft.org/index.php/jss/article/view/v067i01/946; Rodriguez, GLM lecture notes (Princeton), Models for Longitudinal and Clustered Data, secs.2.2-2.3 (PDF pp.3-5: random intercepts, between/within variance, more than two levels, random slopes), sha256:59a9530438fb4812feeabbb9abdc8eb89551e1f8d457cd8e18faf77601e40ce3 — https://grodri.github.io/glms/notes/c8.pdf; Brazauskas & Dornheim, 'Credibility and Regression-Type Modeling', in Frees, Derrig & Meyers (eds.), Predictive Modeling Applications in Actuarial Science Vol. 1 (2014), secs.1.2-2.2 (GLS and BLUP 'correspond to the well-known pricing formulas of credibility theory'), sha256:0c13db291312096f4d1bb87f11944d85f436d16447e2e5d3520d064d2c45591d — https://bpb-us-w2.wpmucdn.com/sites.uwm.edu/dist/2/109/files/2016/04/2014_PMbook_final-1dnzm4q.pdf
- note: Medium: West et al. (the MAS-II reading) is commercial and was not read; open rank-3 texts carry the page (D7). 2019f-q12:r4's 'KR df converge to the naive ones' is not stated on the page or in any source read; the page says only that KR matters most in small samples.
