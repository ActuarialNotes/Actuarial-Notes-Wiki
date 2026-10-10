---
target: Concepts/Summary Statistics.md
created: 2026-10-10
---

## [C-001] Validation pass — verified
- entry_type: comment
- author: agent:validate-v1
- run_id: 2026-10-10T21:00Z/dv02
- date: 2026-10-10
- status_set: verified
- confidence: medium
- checks_run: table vs graph; one-way tables confounded; LRT with ML or REML, ML refit for fixed effects; AIC/BIC formulas; boundary p-value roughly twice too large; both examples recomputed (frequency 0.0585, severity 5,287, PP 309.30, relativities 1.404/2.160; AIC 2,435.6/2,428.2, BIC 2,444.0/2,445.1, ln 500 = 6.21); links resolve
- sources_checked: Few, 'Effectively Communicating Numbers' (Perceptual Edge 2005), PDF p.6 (tables for look-up, graphs for shape), sha256:4de4c11e00faec2ea5fb3f4f31e240908e8356808a0253938d268359144f3a4e — https://www.perceptualedge.com/articles/Whitepapers/Communicating_Numbers.pdf; Werner & Modlin, Basic Ratemaking (CAS, 5th ed. 2016), Ch.10 PDF p.187 (univariate results distorted), sha256:6b214d4db52674df2e83343920c06781e491254bd77f27e32ba312faaff3782c — https://www.casact.org/sites/default/files/old/studynotes_werner_modlin_ratemaking.pdf; SAS/STAT 9.3 User's Guide, PROC MIXED 'Mixed Models Theory', Model Selection: LRT with ML or REML; boundary mixture (Self and Liang), sha256:00898035ad108f69d9ec64c3803312516f8413b9ed5e4970fa25d816fbe40edd — https://support.sas.com/documentation/cdl/en/statug/63962/HTML/default/statug_mixed_sect025.htm; Bates, Maechler, Bolker & Walker, Fitting Linear Mixed-Effects Models Using lme4 (vignette), PDF p.35 (refit with ML for models differing in fixed effects), sha256:60474d07bdb3a511f804a6cd2e73494fd8eb5713f532e2382f69c5dea2e8782e — https://cran.r-project.org/web/packages/lme4/vignettes/lmer.pdf; R documentation AIC {stats}, Description and Details (-2 logLik + k npar, k = log(n) for BIC), sha256:f55c97cef5d53ab762953509b4e5c4da1e8891b8263ce021ef04dcb27c81b8df — https://stat.ethz.ch/R-manual/R-devel/library/stats/html/AIC.html; Bolker et al., GLMM FAQ, LRT on the boundary: p-value approx. twice as large in the single-variance case (Pinheiro and Bates 2000), sha256:53ab8a0c586ae5893841de85a84585e1cb46e79852c7c349c9e5bedb5c63d231 — https://bbolker.github.io/mixedmodels-misc/glmmFAQ.html
- note: Medium: the descriptive-statistics definitions are standard and were not traced to one text, and the boundary-halving rule rests on the GLMM FAQ (rank 3) citing Pinheiro and Bates.
