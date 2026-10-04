---
target: Concepts/Model Selection.md
created: 2026-10-04
---

## [F-001] Linear mixed models filed under the MAS-I bullet; they are MAS-II on the 2026 outlines
- entry_type: finding
- author: agent:validate-v1
- run_id: 2026-10-04T20:47Z/8861
- date: 2026-10-04
- severity: minor
- status: open
- locus: body, bullet 'Choosing the family (MAS-I)' (line 19)
- claim: The bullet headed 'Choosing the family (MAS-I)' says repeated or grouped observations call for a [[Linear Mixed Model]] whose random effects carry the within-group correlation.
- evidence: CAS Exam MAS-I Content Outline 2026, reading list (PDF p.6, sha256:245892366dea073ff44e89b3ac2ae1401517b127d36d51c8a1198b3185faa2ed — https://www.casact.org/sites/default/files/2026-06/MASI_ContentOutline_2026.pdf) assigns Domain C to Dobson & Barnett Ch 1-9 only (excl. 6.3.3, 6.7, 6.8, 7.9), James et al. Ch 1-7 and Larsen; none covers linear mixed models. Dobson & Barnett's correlated-data material is Ch 11 'Clustered and Longitudinal Data' (incl. 11.5 Multilevel models; contents, PDF p.12 of the publisher preview) - §1.2 Scope, printed p.3, PDF p.20: independence 'is dropped in Chapter 11, which is about correlated data' (sha256:40ed0b2549113ee0bea29e41786886ce992ffa29251ad26fb1037385bb51611a — https://api.pageplace.de/preview/DT0400.9781351726221_A37406780/preview-9781351726221_A37406780.pdf). The CAS Exam MAS-II Content Outline 2026 (PDF p.2, sha256:babf0548b7d674e02d2cffdaee11e5063f8e8c03b3461b8ba2bdfdbc0f90ea1b — https://www.casact.org/sites/default/files/2026-01/MASII_Content_Outlines_2026.pdf) has 'B. Linear Mixed Models' (reading: West). The modelling advice is sound; only the exam attribution is wrong. The vault's MAS-I exam page (task 10, line 107) carries the same LMM wording, which the 2026 outline's Task C1 ('Select the appropriate model for an extended linear model') does not.
- source_rank: 1
- proposed_action: Move the LMM sentence out of the '(MAS-I)' bullet into the page's existing 'Mixed models (MAS-II)' bullet, or relabel the bullet. Authoring - not applied.
- applied: false
- fingerprint: d8d4972f995c

## [F-002] 'Understate every standard error' is false for the within-agency year trend
- entry_type: finding
- author: agent:validate-v1
- run_id: 2026-10-04T20:47Z/8861
- date: 2026-10-04
- severity: minor
- status: open
- locus: example 'Matching the Model to the Data', answer 2 (line 33)
- claim: For 360 agency-year observations (60 agencies x 6 years), an ordinary regression would treat them as independent and understate every standard error.
- evidence: Rank-5 recomputation (falsifies only). In the balanced design described, the year regressor takes the same six values in every agency, so the agency effects cancel from the OLS slope: Var(b_year) = sigma_e^2/(60*S_tt). OLS estimates its residual variance as about sigma_u^2 + sigma_e^2, so it OVERSTATES the slope's SE. Exact computation with sigma_u^2 = sigma_e^2 = 1 (E[s^2] = tr(MV)/(N-2) = 1.989): intercept SE true 0.1764 vs OLS-reported 0.1695 (understated); year-slope SE true 0.0309 vs OLS-reported 0.0435 (overstated ~41%). Ignoring the clustering understates the SE of between-agency quantities and overstates it for the within-agency trend, so 'every' is wrong. The other claims in the answer check out (and ML-vs-REML elsewhere on the page matches the nlme anova.lme Note, sha256:508e9e3f590825aa2248bbb4fde038face9289698f57248738401421bd9a00e0 — https://stat.ethz.ch/R-manual/R-devel/library/nlme/html/anova.lme.html).
- source_rank: 5
- proposed_action: Replace 'understate every standard error' with: the standard errors are wrong - typically too small for agency-level effects such as the intercept, too large for the within-agency year trend. Authoring - not applied.
- applied: false
- fingerprint: f8913c0d1155

## [C-001] Validation pass — verified
- entry_type: comment
- author: agent:validate-v1
- run_id: 2026-10-04T20:47Z/8861
- date: 2026-10-04
- status_set: verified
- confidence: low
- checks_run: formula -2*l + k*p checked against R AIC doc (k = 2 AIC, k = ln n BIC); 'heavier once n >= 8' vs ISLR p.234 (log n > 2 for n > 7); nested -> LRT/deviance, non-nested -> AIC/BIC/CV vs ISLR §6.1.3 and Monograph 5; ML vs REML vs nlme anova.lme Note; boundary chi2_0/chi2_1 halving vs GLMM FAQ; copula tail claims vs Embrechts et al.; all three examples recomputed (LRT 8.6, p = 0.0136; AIC 1232.8/1228.2; BIC 1245.99/1247.99; ln 200 = 5.298); LMM SE claim recomputed analytically (falsified, F-002); exam scope vs 2026 outlines (F-001); links resolve; no figure
- sources_checked: CAS Exam MAS-I Content Outline 2026 (MASI_CO_2026_F v06), Domain C tasks 1-3, 7 and reading list, PDF pp.5-6, sha256:245892366dea073ff44e89b3ac2ae1401517b127d36d51c8a1198b3185faa2ed — https://www.casact.org/sites/default/files/2026-06/MASI_ContentOutline_2026.pdf; CAS Exam MAS-II Content Outline 2026, Domain B, PDF p.2, sha256:babf0548b7d674e02d2cffdaee11e5063f8e8c03b3461b8ba2bdfdbc0f90ea1b — https://www.casact.org/sites/default/files/2026-01/MASII_Content_Outlines_2026.pdf; James, Witten, Hastie & Tibshirani, An Introduction to Statistical Learning with Applications in R, 2nd ed. (Springer 2021), §2.2.1-2.2.2 (printed pp.29-36, PDF pp.40-47); §6.1.3 (printed pp.232-235, PDF pp.240-243), sha256:f708349f34d2b345a40766f7b4830d22c1bcbf90b4194ae603dcd1245b4e975f — https://www.casact.org/sites/default/files/2022-12/James-G.-et-al.-2nd-edition-Springer-2021.pdf; R Core Team, R documentation 'AIC {stats}' (R-devel manual), Description and Details, sha256:f55c97cef5d53ab762953509b4e5c4da1e8891b8263ce021ef04dcb27c81b8df — https://stat.ethz.ch/R-manual/R-devel/library/stats/html/AIC.html; Pinheiro & Bates, nlme documentation 'anova.lme' (R-devel manual), Note, sha256:508e9e3f590825aa2248bbb4fde038face9289698f57248738401421bd9a00e0 — https://stat.ethz.ch/R-manual/R-devel/library/nlme/html/anova.lme.html; Bolker et al., GLMM FAQ, 'Testing significance of random effects' (boundary: p-value about twice as large as it should be for a single variance), sha256:53ab8a0c586ae5893841de85a84585e1cb46e79852c7c349c9e5bedb5c63d231 — https://bbolker.github.io/mixedmodels-misc/glmmFAQ.html; Embrechts, McNeil & Straumann, 'Correlation and Dependency in Risk Management: Properties and Pitfalls' (ETH preprint), §4.4 and PDF p.22 (Gaussian copula asymptotically independent for rho < 1; Gumbel asymptotically dependent), sha256:2705fc20f5bad0de8bf45ab6325cee27fe86f119b9919438a455c3393e6653cd — https://people.math.ethz.ch/~embrecht/ftp/pitfalls.pdf; Larsen, 'Generalized Linear Models', CAS Study Note (rev. June 2016), PDF p.2 (Tweedie/variance powers: gamma p = 2), sha256:5c4ed4e8eacf72624f38c5313eb6903f57d627b6ac81ce52e0a5a69404af90bd — https://www.casact.org/sites/default/files/2021-03/MAS-I_Larsen.pdf; Goldburd, Khare, Tevet & Guller, Generalized Linear Models for Insurance Rating, CAS Monograph 5, 2nd ed. (2025 revision), §2.6 offsets PDF pp.27-28; §2.7 overdispersion/negative binomial PDF pp.31-32, sha256:89b203ea55208911c4d8f6ef1ede4dd6c0206d47999b5e8aff96fe233c0ff757 — https://www.casact.org/sites/default/files/2021-01/05-Goldburd-Khare-Tevet.pdf
- note: Verified with LOW confidence because one claim set could not be checked: the 'ERM (Exam 9)' bullet's list of sub-models (underwriting incl. catastrophe, reserve, asset, credit) and its statement that parameter/model risk must be measured rest on Brehm et al., Enterprise Risk Analysis for Property & Liability Insurance Companies (the Exam 9 reading), which is not freely available; the copula example under it was checked against Embrechts et al. The MAS-II mixed-model bullet was checked only against rank-3 references (nlme docs, GLMM FAQ), not West et al. Two minor findings open (F-001 exam attribution, F-002 SE claim).
