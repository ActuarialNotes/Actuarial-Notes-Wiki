---
target: Concepts/AIC.md
created: 2026-10-04
---

## [F-001] Worked example counts predictors, not parameters
- entry_type: finding
- author: agent:validate-v1
- run_id: 2026-10-04T20:47Z/8861
- date: 2026-10-04
- severity: major
- status: open
- locus: example 'Selecting Between Two GLMs Using AIC' (lines 29-33)
- claim: A Poisson GLM with 3 predictors has AIC_1 = -2(-120) + 2(3) = 246; one with 1 predictor has AIC_2 = -2(-124) + 2(1) = 250.
- evidence: The page defines p as 'the number of parameters'. A Poisson GLM with 3 predictors and an intercept has 4 parameters, one with 1 predictor has 2, so by the page's own formula AIC_1 = 240 + 8 = 248 and AIC_2 = 248 + 4 = 252 (recomputed); 246/250 count predictors only. CAS counts the intercept: Exam MAS-I Fall 2018 Q39 (official paper PDF p.43, key B on PDF p.50, sha256:47ced888a314db1a5e29e28c0a52f989966b21a079b1c08634b73dc90e844296 — https://www.casact.org/sites/default/files/2021-02/admissions_studytools_exammasi_fmasi-18.pdf) tabulates '# of Non Intercept Parameters' separately and lists 'I' among each model's 'Parameters'; recomputing that question with AIC = -2*loglik + 2*(parameters incl. intercept) reproduces key B (0.20). CAS Monograph 5 §6.2.2 (PDF p.76, sha256:89b203ea55208911c4d8f6ef1ede4dd6c0206d47999b5e8aff96fe233c0ff757 — https://www.casact.org/sites/default/files/2021-01/05-Goldburd-Khare-Tevet.pdf): AIC = -2 x log-likelihood + 2p, 'p is the number of parameters in the model'. The ranking and the 4-point difference are unchanged, so the conclusion stands; the absolute values are off by 2.
- source_rank: 1
- proposed_action: State that the models have 3 and 1 parameters, or keep '3 predictors' / '1 predictor' and recompute with 4 and 2 parameters (AIC 248 vs 252). Not applied: two valid fixes, the author should choose.
- applied: false
- fingerprint: 67158d4ecb96

## [F-002] Missing condition: AIC compares only models fitted to the same data and response
- entry_type: finding
- author: agent:validate-v1
- run_id: 2026-10-04T20:47Z/8861
- date: 2026-10-04
- severity: major
- status: open
- locus: body, bullet 'AIC does not require models to be nested' (line 21)
- claim: AIC does not require models to be nested, unlike likelihood ratio tests - with no condition on which models may be compared.
- evidence: R Core documentation 'AIC {stats}', Details (sha256:f55c97cef5d53ab762953509b4e5c4da1e8891b8263ce021ef04dcb27c81b8df — https://stat.ethz.ch/R-manual/R-devel/library/stats/html/AIC.html): 'When comparing models fitted by maximum likelihood to the same data, the smaller the AIC or BIC, the better the fit ... Examples of models not "fitted to the same data" are where the response is transformed ... and where contingency tables have been used to summarize data ... a comparison of a Poisson and gamma GLM being meaningless since one has a discrete response, the other continuous.' The non-nested half is right (CAS Monograph 5 §6.2.2, PDF p.76, sha256:89b203ea55208911c4d8f6ef1ede4dd6c0206d47999b5e8aff96fe233c0ff757 — https://www.casact.org/sites/default/files/2021-01/05-Goldburd-Khare-Tevet.pdf: penalized measures compare non-nested models). With no condition stated, the bullet reads as licensing an AIC comparison of a regression on ln(severity) with a Gamma GLM on severity, or of models fitted to different rows.
- source_rank: 3
- proposed_action: Add the condition: the models must be fitted by maximum likelihood to the same observations of the same, untransformed response. Authoring - not applied.
- applied: false
- fingerprint: 8296dec7d5c4

## [C-001] Validation pass — verified
- entry_type: comment
- author: agent:validate-v1
- run_id: 2026-10-04T20:47Z/8861
- date: 2026-10-04
- status_set: verified
- confidence: low
- checks_run: AIC = -2*l + 2p vs R doc, Monograph 5 eq (18), Ding eq (8); numeric check against STAT 504 SAS output: -2(-461.5881) + 2*2 = 927.1762 (matches), AICc = AIC + 2p(p+1)/(n-p-1) = 927.2468 (matches the page's AICc form with p = 2, n = 173); BIC comparison and n > 7 vs ISLR p.234; KL motivation vs Ding p.10 and Monograph 5; non-nested use vs Monograph 5 §6.2.2; same-data condition vs R doc (missing - F-002); rank-1 consistency: Fall 2019 Q32 recomputed (AIC 14.18/15.74/17.71, BIC 28.99/34.26/39.94 -> I only = A, CAS key A) and Fall 2018 Q39 recomputed (|AIC_A - AIC_B| = 0.20 -> B, CAS key B); example recomputed (F-001); links resolve; figure checked by SVG title/labels only
- sources_checked: R Core Team, R documentation 'AIC {stats}' (R-devel manual), Description and Details, sha256:f55c97cef5d53ab762953509b4e5c4da1e8891b8263ce021ef04dcb27c81b8df — https://stat.ethz.ch/R-manual/R-devel/library/stats/html/AIC.html; Goldburd, Khare, Tevet & Guller, Generalized Linear Models for Insurance Rating, CAS Monograph 5, 2nd ed. (2025 revision), §6.2.2 Penalized Measures of Fit PDF pp.76-77, sha256:89b203ea55208911c4d8f6ef1ede4dd6c0206d47999b5e8aff96fe233c0ff757 — https://www.casact.org/sites/default/files/2021-01/05-Goldburd-Khare-Tevet.pdf; Ding, Tarokh & Yang, 'Model Selection Techniques - An Overview', IEEE Signal Processing Magazine 2018 (arXiv:1810.09583v1), §II-A eqs (8)-(10) PDF pp.5-6, §II-E/§III PDF p.10, sha256:fd9744e006712c6d59f8da05f42769eeed90244d857e031cc70ec41d139446b6 — https://arxiv.org/pdf/1810.09583v1; Penn State STAT 504, Lesson 9 'Poisson Regression', SAS output for the horseshoe-crab width model (Full Log Likelihood -461.5881, AIC 927.1762, AICC 927.2468, BIC 933.4828; n = 173, 2 parameters), sha256:f8021fab7a1c8cfeb2de7ebfe3b5d1977a32671dd3acefc9ade531369c5da506 — https://online.stat.psu.edu/stat504/Lesson09; James, Witten, Hastie & Tibshirani, An Introduction to Statistical Learning with Applications in R, 2nd ed. (Springer 2021), §6.1.3 Cp, AIC, BIC and adjusted R^2 (printed pp.232-235, PDF pp.240-243), sha256:f708349f34d2b345a40766f7b4830d22c1bcbf90b4194ae603dcd1245b4e975f — https://www.casact.org/sites/default/files/2022-12/James-G.-et-al.-2nd-edition-Springer-2021.pdf; CAS Exam MAS-I Fall 2018, Q39 — official exam paper (scan), PDF p.43; Final Answer Key PDF p.50 (B), sha256:47ced888a314db1a5e29e28c0a52f989966b21a079b1c08634b73dc90e844296 — https://www.casact.org/sites/default/files/2021-02/admissions_studytools_exammasi_fmasi-18.pdf; CAS Exam MAS-I Fall 2019, Q32 — official exam paper (scan), PDF p.36; Final Answer Key PDF p.50 (A), sha256:32e26dbc1bd463e053ea0f9116473551be6d1b2f35b6d3670a716ecb86a141bd — https://www.casact.org/sites/default/files/2021-02/admissions_studytools_exammasi_fmasi-19.pdf
- note: Verified with LOW confidence: two major findings open (F-001 example's parameter count, F-002 missing same-data condition). Scaling: the page uses the likelihood form -2*l + 2p throughout and says so. ISLR §6.1.3 (the MAS-I reading) instead gives, for least squares, AIC = (1/n)(RSS + 2d*sigma-hat^2) up to constants (proportional to Cp), and STAT 462 uses n ln(SSE) - n ln n + 2(k+1); these rank the same models but are not on the same scale. Ding et al. print AICc as AIC + 2(d+1)(d+2)/(n-d-2), a parameter-counting convention (d excluding the error variance) that differs from the page's 2p(p+1)/(n-p-1); the STAT 504 SAS output matches the page's form.

## [F-001/R] Correction applied
- entry_type: resolution
- author: agent:validate-v1
- run_id: 2026-10-04T21:11Z/3707
- date: 2026-10-05
- resolves: F-001
- status: resolved
- note: Worked example kept at '3 predictors' / '1 predictor' and recomputed counting the intercept, as the page's own definition (p = number of parameters) requires: the stem now says each model has an intercept and is fitted to the same data, the answer states p1 = 4 and p2 = 2, and AIC_1 = -2(-120) + 2(4) = 248, AIC_2 = -2(-124) + 2(2) = 252 (recomputed in python; previously 246/250). Ranking and conclusion unchanged. Sources: CAS Monograph 5 §6.2.2 eq.18, PDF p.76 ('AIC = -2 x log-likelihood + 2p, where p is the number of parameters in the model'), sha256:89b203ea55208911c4d8f6ef1ede4dd6c0206d47999b5e8aff96fe233c0ff757 — https://www.casact.org/sites/default/files/2021-01/05-Goldburd-Khare-Tevet.pdf; CAS Exam MAS-I Fall 2018 Q39, PDF p.43 (the table lists 'I' among every model's Parameters and tabulates '# of Non Intercept Parameters' separately; recomputed with the intercept counted, |AIC_A - AIC_B| = |0 - 0.2| = 0.20 -> B, CAS key B on PDF p.50 - the question does not discriminate, since counting the intercept shifts every AIC by 2), sha256:47ced888a314db1a5e29e28c0a52f989966b21a079b1c08634b73dc90e844296 — https://www.casact.org/sites/default/files/2021-02/admissions_studytools_exammasi_fmasi-18.pdf; Penn State STAT 504 Lesson 9 SAS output counts the intercept (2 parameters for intercept + width: -2(-461.5881) + 2(2) = 927.1762), sha256:f8021fab7a1c8cfeb2de7ebfe3b5d1977a32671dd3acefc9ade531369c5da506.

## [F-002/R] Correction applied
- entry_type: resolution
- author: agent:validate-v1
- run_id: 2026-10-04T21:11Z/3707
- date: 2026-10-05
- resolves: F-002
- status: resolved
- note: Non-nested bullet now carries the condition: the models must be fitted by maximum likelihood to the same data - the same observations of the same, untransformed response; a model for ln Y cannot be compared with one for Y, and comparing a Poisson GLM with a Gamma GLM is meaningless since one response is discrete and the other continuous. The example stem now says the two GLMs are fitted to the same data. Source: R Core documentation 'AIC {stats}', Details ('When comparing models fitted by maximum likelihood to the same data, the smaller the AIC or BIC, the better the fit ... Examples of models not "fitted to the same data" are where the response is transformed ... a comparison of a Poisson and gamma GLM being meaningless since one has a discrete response, the other continuous'), sha256:f55c97cef5d53ab762953509b4e5c4da1e8891b8263ce021ef04dcb27c81b8df — https://stat.ethz.ch/R-manual/R-devel/library/stats/html/AIC.html; non-nested use still per CAS Monograph 5 §6.2.2, PDF p.76.

## [C-002] Validation pass — verified
- entry_type: comment
- author: agent:validate-v1
- run_id: 2026-10-04T21:11Z/3707
- date: 2026-10-05
- status_set: verified
- confidence: medium
- checks_run: every edit re-read: same-data condition vs R AIC doc Details; parameter count incl. intercept vs Monograph 5 eq.18 and the F18 Q39 table; example recomputed in python (248, 252); AIC = -2l + 2p vs Monograph 5 eq.18 and Ding eq.(8); non-nested use vs Monograph 5 §6.2.2; KL motivation vs Ding p.10; AICc = AIC + 2p(p+1)/(n-p-1) checked numerically against STAT 504 (927.1762 + 12/170 = 927.2468, matches) - Ding prints the same correction with d+1 in place of p, d counting the coefficients only; ln(n) > 2 for n > 7 vs ISLR p.234; F18 Q39 recomputed (best subset picks I,1,5 AIC 0; forward picks I,2,5 AIC 0.2; difference 0.20 -> B = CAS key); links resolve; figure not re-checked (generated, out of scope)
- sources_checked: R Core Team, R documentation 'AIC {stats}' (R-devel manual, stats 4.6.0), Description and Details, sha256:f55c97cef5d53ab762953509b4e5c4da1e8891b8263ce021ef04dcb27c81b8df — https://stat.ethz.ch/R-manual/R-devel/library/stats/html/AIC.html; Goldburd, Khare, Tevet & Guller, Generalized Linear Models for Insurance Rating, CAS Monograph 5, 2nd ed. (2025 revision), §6.2.2 Penalized Measures of Fit, eq.18, PDF pp.76-77, sha256:89b203ea55208911c4d8f6ef1ede4dd6c0206d47999b5e8aff96fe233c0ff757 — https://www.casact.org/sites/default/files/2021-01/05-Goldburd-Khare-Tevet.pdf; Ding, Tarokh & Yang, 'Model Selection Techniques - An Overview', IEEE Signal Processing Magazine 2018 (arXiv:1810.09583v1), §II-A eqs (8) and AICc, PDF p.5; §III PDF p.10 (KL motivation), sha256:fd9744e006712c6d59f8da05f42769eeed90244d857e031cc70ec41d139446b6 — https://arxiv.org/pdf/1810.09583v1; Penn State STAT 504, Lesson 9 'Poisson Regression', SAS output for the horseshoe-crab width model (Full Log Likelihood -461.5881, AIC 927.1762, AICC 927.2468, BIC 933.4828; deviance df 171, n = 173, 2 parameters), sha256:f8021fab7a1c8cfeb2de7ebfe3b5d1977a32671dd3acefc9ade531369c5da506 — https://online.stat.psu.edu/stat504/Lesson09; James, Witten, Hastie & Tibshirani, An Introduction to Statistical Learning with Applications in R, 2nd ed. (Springer 2021), §6.1.3 Cp, AIC, BIC and adjusted R^2, printed pp.232-234 (PDF pp.240-242), sha256:f708349f34d2b345a40766f7b4830d22c1bcbf90b4194ae603dcd1245b4e975f — https://www.casact.org/sites/default/files/2022-12/James-G.-et-al.-2nd-edition-Springer-2021.pdf; CAS Exam MAS-I Fall 2018, Q39 — official exam paper (scan), PDF p.43; Final Answer Key PDF p.50 (B), sha256:47ced888a314db1a5e29e28c0a52f989966b21a079b1c08634b73dc90e844296 — https://www.casact.org/sites/default/files/2021-02/admissions_studytools_exammasi_fmasi-18.pdf
- note: Resolve run: F-001 and F-002 fixed and closed. Medium: the definition, conditions and AICc rest on rank-3 references (R documentation, Monograph 5, Ding et al., STAT 504); ISLR (rank 2) gives AIC only in its least-squares sigma-hat^2 form, which ranks models the same way on a different scale.
