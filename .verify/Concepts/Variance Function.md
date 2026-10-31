---
target: Concepts/Variance Function.md
created: 2026-10-31
---

## [F-001] 'Standardised Pearson residuals' for residuals not adjusted for leverage
- entry_type: finding
- author: agent:validate-v1
- run_id: 2026-10-31T05:07Z/9044
- date: 2026-10-31
- severity: nit
- status: open
- locus: example 'Same Miss, Different Claims', question
- claim: Compare the claims' standard deviations and their standardised Pearson residuals.
- evidence: Rodriguez GLM notes §3.8.1-3.8.3: the Pearson residual is observed minus fitted divided by an estimate of the standard deviation, and such residuals are 'not fully standardized' (standardized/studentized residuals also allow for leverage). The example computes (y - mu)/(sqrt(phi) mu), i.e. Pearson residuals in SD units, with no leverage term.
- source_rank: 3
- proposed_action: Restate: 'their Pearson residuals, each miss divided by the claim's estimated standard deviation'.
- applied: true
- fingerprint: 8dbf05b73af9

## [F-001/R] Correction applied
- entry_type: resolution
- author: agent:validate-v1
- run_id: 2026-10-31T05:07Z/9044
- date: 2026-10-31
- resolves: F-001
- status: resolved
- note: Restated to Rodriguez's definition in this run (rule 2); the numbers are unchanged.

## [C-001] Validation pass — verified
- entry_type: comment
- author: agent:validate-v1
- run_id: 2026-10-31T05:07Z/9044
- date: 2026-10-31
- status_set: verified
- confidence: medium
- checks_run: first check of the whole page, claim by claim; all three examples recomputed; wiki-links resolved; compared with masii-2019f-001 for rule 10
- sources_checked: Goldburd, Khare, Tevet & Guller, Generalized Linear Models for Insurance Rating, CAS Monograph No. 5, 2nd ed., §2.2 eq. 3 and Table 1 (variance functions), §2.5 (weights: Var = phi V(mu)/w), §2.7.1-2.7.3 (gamma, inverse Gaussian, Tweedie p=0,1,2,3, 1<p<2 compound Poisson-gamma), pp.7-8, 16, 19-23, sha256:06f7c01d4c80af9a9c6672cb0ace7814c533499b4662b783218f23d12cc46318 — https://www.casact.org/sites/default/files/2021-03/8_GLM.pdf; Rodriguez, Generalized Linear Model Theory (GLM notes Appendix B), eqs. B.3, B.6-B.8 (var = phi b''(theta)/p_i; IRLS working variable and weights p_i/[b''(theta)(d eta/d mu)^2]), sha256:92bc67a6a2fc52a0ffa2babfd7a13e175b2babb52dd28f778d5e307cc65aa286 — https://grodri.github.io/glms/notes/a2.pdf; Rodriguez, GLM notes ch.3, §3.8.1 Pearson residuals (observed minus fitted divided by an estimate of the standard deviation), p.47, sha256:2243f2c49c0e15545740a0b4fb8d98ad8a5b3e37653c13feee545195801efedc — https://grodri.github.io/glms/notes/c3.pdf; Rodriguez, Models for Count Data With Overdispersion (GLM notes addendum), comparing variance functions by grouping on fitted values and plotting group means and variances, sha256:956c3ad4849787d3a60c6d0f42b8c7e60d23e80be1da988417f9e9a42c73121e — https://grodri.github.io/glms/notes/c4a.pdf; nlme (Pinheiro & Bates) documentation, varExp.Rd ('sigma^2(v) = exp(2 theta v)', default form ~fitted(.)), sha256:3723dae6e60e6caca06b252713a60b25dc350151de094a1aeae22339f2a3b2c5, varPower.Rd ('sigma^2(v) = |v|^(2 theta)'), sha256:41fd48607be59547248b415e127cbecb57f48da2707b2be6b74fd8da1f6c8890, varIdent.Rd, sha256:2660f855e58dfae76b497aced8c713b79bba9143b59a73c88152ab8503cce652 — https://github.com/cran/nlme/tree/master/man; SAS/STAT 13.1 User's Guide, Chapter 63: The MIXED Procedure (SAS Institute), Notation p.5236; Mixed Models Theory pp.5315-5316 (RANDOM intercept constrains the correlation to be positive, REPEATED CS leaves it unconstrained; Z is 3s x s, G is s x s), p.5322; Computational Issues pp.5352-5354 (boundary estimates, drop a zero variance component, Convergence Problems: PARMS initial values and grid search, rescaling); REPEATED GROUP= option; Example 63.5, sha256:bbde853def15e236149d167e1b35f191c5b2d002efd59792b75f5d22449a72a1 — https://support.sas.com/documentation/onlinedoc/stat/131/mixed.pdf
- note: Var = phi V(mu)/w, the V(mu) table, Tweedie 1<p<2 compound Poisson-gamma, gamma constant CV (Goldburd §2.2, §2.5, §2.7). Estimating-equation weighting w/V(mu) with a link factor: IRLS working residual (y-mu)d eta/d mu times weight p/[V (d eta/d mu)^2] (Rodriguez B.6-B.8). Pearson residual (Rodriguez §3.8.1). Grouped mean-variance plot (Rodriguez c4a); log Var = log phi + p log mu, so the log-log slope is p (arithmetic on Var = phi mu^p). LMM: default R = sigma^2 I (SAS p.5236), heterogeneous variances by group (SAS REPEATED GROUP=, nlme varIdent), varExp sigma^2 exp(2 delta v) and varPower sigma^2 |v|^(2 delta), default covariate the fitted values (nlme Rd); REML LRT on identical fixed effects (SAS p.5322, lme4 p.34). Examples: SD 3,536 / 35,355, r = 0.849 / 0.085; p = ln3/ln2 = 1.585; LRT 13.4 > 5.991. F-001 (nit) fixed. Confidence medium (D7): the assigned reading, West, Welch & Galecki 3rd ed., is commercial and was not read; checked against the open texts cited.
