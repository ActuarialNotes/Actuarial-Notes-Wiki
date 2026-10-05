---
target: Concepts/Dispersion Parameter.md
created: 2026-10-05
---

## [C-001] Validation pass — verified
- entry_type: comment
- author: agent:validate-v1
- run_id: 2026-10-04T20:47Z/8861
- date: 2026-10-05
- status_set: verified
- confidence: medium
- checks_run: Var = phi V(mu)/w vs Rodriguez B.1.1; Pearson estimator and its df vs Rodriguez c4a; phi for Normal/Poisson/binomial/Gamma vs Rodriguez B.1.1, B.4.1 and Monograph (gamma: phi = 1/alpha = CV^2 from eqs 5-6); phi leaves beta unchanged and scales SEs by sqrt(phi) vs Rodriguez B.2 and c4a; scaled deviance and the F test vs Rodriguez B.3.2; weights vs Monograph sec.2.6; both examples recomputed (2.50, 0.237, Wald 2.67 -> 1.69; CV 0.80, alpha 1.5625); figure read; links resolve
- sources_checked: Rodriguez, GLM lecture notes (Princeton), App. B, secs.B.1.1 (a_i(phi) = phi/p_i; var = phi b/p_i), B.2 (phi cancels in the IRLS estimate), B.3.1-B.3.2 (scaled deviance, F test with estimated phi) (PDF pp.2-7), sha256:92bc67a6a2fc52a0ffa2babfd7a13e175b2babb52dd28f778d5e307cc65aa286 — https://grodri.github.io/glms/notes/a2.pdf; Rodriguez, GLM lecture notes (Princeton), Models for Count Data With Overdispersion, sec.1 (Pearson estimate phihat = chi2_p/(n-p), SEs times sqrt(phihat), beta unchanged) (PDF pp.1-2), sha256:956c3ad4849787d3a60c6d0f42b8c7e60d23e80be1da988417f9e9a42c73121e — https://grodri.github.io/glms/notes/c4a.pdf; Goldburd, Khare, Tevet & Guller, Generalized Linear Models for Insurance Rating, CAS Monograph 5, 2nd ed. (2025 revision; PCPA reading, rank 3 for MAS-I), sha256:89b203ea55208911c4d8f6ef1ede4dd6c0206d47999b5e8aff96fe233c0ff757 — https://www.casact.org/sites/default/files/2021-01/05-Goldburd-Khare-Tevet.pdf, sec.2.6 (exposure as a weight reduces variance, PDF p.28); sec.2.7.1 (gamma variance), sec.2.7.2 (ODP, overdispersion from unexplained risk variation, PDF p.31), sec.2.7.3 eq.6 (gamma CV = 1/sqrt(alpha), PDF p.33); Larsen, 'Generalized Linear Models', CAS Study Note (Dec 2015, rev. June 2016; MAS-I reading), sha256:5c4ed4e8eacf72624f38c5313eb6903f57d627b6ac81ce52e0a5a69404af90bd — https://www.casact.org/sites/default/files/2021-03/MAS-I_Larsen.pdf, p.1 (quasi-likelihood constant of proportionality between mean and variance)
- note: No findings. 'Correlated observations' as a cause of overdispersion (line 22) was not located in the sources read; the other two causes are Monograph sec.2.7.2. 'Pearson version generally preferred' matches Rodriguez c4a ('The standard approach relies on Pearson's chi^2'). Linked by the MAS-I exam page only.

## [F-001] Deviance bullets use D as the unscaled deviance without saying so; the Deviance page defined D as the scaled one
- entry_type: finding
- author: agent:validate-v1
- run_id: 2026-10-04T21:11Z/3707
- date: 2026-10-05
- severity: minor
- status: open
- locus: bullets 'Two estimators...' and 'The scaled deviance D* = D/phi...', lines 27-28
- claim: 'the residual Deviance over degrees of freedom' and 'The scaled deviance D* = D/phi is what is compared against chi^2; ... F statistic (Delta D/r)/phihat' — D unnamed, r undefined.
- evidence: Cross-page inconsistency flagged by the phase-1 Deviance check (Concepts/Deviance.md F-001): the linked Deviance page defined D = -2[l(fitted) - l(sat)], which is the scaled deviance in the Monograph's and Rodriguez's terms, so a reader following the [[Deviance]] link read D/phi as dividing by phi twice. This page is right only if D is the unscaled deviance: Monograph 5 sec.6.1.2 (PDF p.73: unscaled = scaled x phihat) and sec.6.2.1 eq.17 (PDF p.75: F = (D_S - D_B)/(# added x phihat_B), 'D refers to the unscaled deviance', denominator df n - p_B), Goldburd, Khare, Tevet & Guller, Generalized Linear Models for Insurance Rating, CAS Monograph 5, 2nd ed. (2025 revision; rank 3 for MAS-I), sha256:89b203ea55208911c4d8f6ef1ede4dd6c0206d47999b5e8aff96fe233c0ff757 — https://www.casact.org/sites/default/files/2021-01/05-Goldburd-Khare-Tevet.pdf; Rodriguez App. B sec.B.3.2 eqs.B.11-B.13 (PDF pp.6-7), Rodriguez, GLM notes App. B, sha256:92bc67a6a2fc52a0ffa2babfd7a13e175b2babb52dd28f778d5e307cc65aa286 — https://grodri.github.io/glms/notes/a2.pdf. The Deviance page is now fixed to the same convention in this run.
- source_rank: 3
- proposed_action: Name D as the unscaled deviance in both bullets, define r and say phihat comes from the larger model.
- applied: true
- fingerprint: 737bfe97fd4b

## [F-002] 'Correlated observations' given as a cause of overdispersion without a source
- entry_type: finding
- author: agent:validate-v1
- run_id: 2026-10-04T21:11Z/3707
- date: 2026-10-05
- severity: minor
- status: open
- locus: bullet 'phihat > 1 ... overdispersion', line 26
- claim: overdispersion is 'usually from unmodelled heterogeneity, correlated observations, or a missing predictor'
- evidence: Phase-1 pass noted 'correlated observations' was not located in any source read; not found this session either (Rodriguez c4a sec.1; Monograph 5). Monograph 5 sec.2.7.2 (PDF p.31): 'Overdispersion arises mainly because ... there is another source of variance: the variation in risk level among the policyholders themselves ... there will always be some variation in risk level among policyholders not explained by our model's predictors', Goldburd, Khare, Tevet & Guller, Generalized Linear Models for Insurance Rating, CAS Monograph 5, 2nd ed. (2025 revision; rank 3 for MAS-I), sha256:89b203ea55208911c4d8f6ef1ede4dd6c0206d47999b5e8aff96fe233c0ff757 — https://www.casact.org/sites/default/files/2021-01/05-Goldburd-Khare-Tevet.pdf.
- source_rank: 3
- proposed_action: Replace the list with the Monograph's cause.
- applied: true
- fingerprint: 0ba54382a584

## [F-001/R] Correction applied
- entry_type: resolution
- author: agent:validate-v1
- run_id: 2026-10-04T21:11Z/3707
- date: 2026-10-05
- resolves: F-001
- status: resolved
- note: Estimator bullet now 'the unscaled residual Deviance over degrees of freedom, D/(n-p)' and 'The Pearson version is the standard approach' (Rodriguez c4a sec.1 wording); test bullet now 'With D the unscaled deviance, the scaled deviance D* = D/phi is compared against chi^2; ... nested models that differ by r parameters use (Delta D/r)/phihat, with phihat from the larger model'. Consistent with Concepts/Deviance.md as fixed in this run (D unscaled, D* = D/phi). Sources: Monograph 5 sec.6.1.2 (PDF p.73) and eq.17 (PDF p.75), sha256:89b203ea55208911c4d8f6ef1ede4dd6c0206d47999b5e8aff96fe233c0ff757 — https://www.casact.org/sites/default/files/2021-01/05-Goldburd-Khare-Tevet.pdf; Rodriguez App. B sec.B.3.2 (PDF pp.6-7), sha256:92bc67a6a2fc52a0ffa2babfd7a13e175b2babb52dd28f778d5e307cc65aa286 — https://grodri.github.io/glms/notes/a2.pdf; deviance/df and Pearson/df as the two estimators, Pearson the default: statsmodels GLM.fit docs, 'X2 is Pearson's chi-square divided by df_resid ... dev is the deviance divided by df_resid', sha256:decbc81735f2541367b2d5a57dd8eca35a5e7fca79d4485150e84498f2be3f41 — https://www.statsmodels.org/stable/generated/statsmodels.genmod.generalized_linear_model.GLM.fit.html.

## [F-002/R] Correction applied
- entry_type: resolution
- author: agent:validate-v1
- run_id: 2026-10-04T21:11Z/3707
- date: 2026-10-05
- resolves: F-002
- status: resolved
- note: Cause list replaced by the Monograph's: 'usually from variation in risk level among policyholders that the model's predictors do not explain' ('correlated observations' deleted as unsourced). Source: Monograph 5 sec.2.7.2 (PDF p.31), sha256:89b203ea55208911c4d8f6ef1ede4dd6c0206d47999b5e8aff96fe233c0ff757 — https://www.casact.org/sites/default/files/2021-01/05-Goldburd-Khare-Tevet.pdf.

## [C-002] Validation pass — verified
- entry_type: comment
- author: agent:validate-v1
- run_id: 2026-10-04T21:11Z/3707
- date: 2026-10-05
- status_set: verified
- confidence: medium
- checks_run: every edit re-read against its source (unscaled/scaled deviance and the F test vs Monograph sec.6.1.2/eq.17 and Rodriguez B.3.2; two estimators vs statsmodels and Rodriguez c4a; overdispersion cause vs Monograph sec.2.7.2); cross-checked against Concepts/Deviance.md as fixed in this run (same convention); Pearson estimator and SE scaling vs Rodriguez c4a; both examples recomputed (2.50, 0.237, Wald 2.67 -> 1.69; CV 0.80, alpha 1.5625); links resolve
- sources_checked: Rodriguez, GLM lecture notes (Princeton), App. B secs.B.1.1, B.2, B.3.1-B.3.2 (PDF pp.2-7), sha256:92bc67a6a2fc52a0ffa2babfd7a13e175b2babb52dd28f778d5e307cc65aa286 — https://grodri.github.io/glms/notes/a2.pdf; Rodriguez, GLM lecture notes, Models for Count Data With Overdispersion, sec.1 (Pearson phihat = chi2_p/(n-p); SEs x sqrt(phihat); beta unchanged) (PDF pp.1-2), sha256:956c3ad4849787d3a60c6d0f42b8c7e60d23e80be1da988417f9e9a42c73121e — https://grodri.github.io/glms/notes/c4a.pdf; Goldburd, Khare, Tevet & Guller, Generalized Linear Models for Insurance Rating, CAS Monograph 5, 2nd ed. (2025 revision; rank 3 for MAS-I), sec.2.7.2 (PDF p.31), sec.6.1.2 (PDF p.73), sec.6.2.1 eq.17 (PDF p.75), sha256:89b203ea55208911c4d8f6ef1ede4dd6c0206d47999b5e8aff96fe233c0ff757 — https://www.casact.org/sites/default/files/2021-01/05-Goldburd-Khare-Tevet.pdf; statsmodels documentation, GLM.fit, 'scale' argument (X2 = Pearson chi-square / df_resid, default; dev = deviance / df_resid), sha256:decbc81735f2541367b2d5a57dd8eca35a5e7fca79d4485150e84498f2be3f41 — https://www.statsmodels.org/stable/generated/statsmodels.genmod.generalized_linear_model.GLM.fit.html
- note: Resolve run: two applied minors (F-001 deviance convention made explicit to match the Deviance page; F-002 unsourced cause replaced) resolved.
