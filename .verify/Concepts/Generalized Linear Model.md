---
target: Concepts/Generalized Linear Model.md
created: 2026-09-13
---

## [C-001] Validation pass — verified
- entry_type: comment
- author: agent:validate-v1
- run_id: 2026-09-13T04:49Z/f8d9
- date: 2026-09-13
- status_set: verified
- confidence: medium
- checks_run: Werner p.177 confirms the three-component definition the page gives: GLMs remove the normality and constant-variance restrictions, a link function relates the expected response to the linear combination of predictors, the modeller specifies a distribution 'typically a member of the exponential family (e.g., normal, Poisson, gamma, binomial, inverse Gaussian)' by its mean and its variance as a function of the mean, and 'the maximum likelihood approach then maximizes the logarithm of the likelihood function' -- so exponential family, link, linear predictor and MLE-not-OLS are all sourced. Also confirmed there: the log link makes the rating variables multiplicative and GLM output is 'a series of multipliers' usable directly in a rating algorithm (p.176); modelling frequency and severity separately rather than loss ratios, with reasons (p.177); Tweedie as 'a special extension of the exponential family' (p.177 fn.33); results are 'net of' the other variables and only valid with them in the model (p.179); diagnostics -- standard errors, deviance for nested models, AIC and BIC for non-nested, consistency over time, hold-out validation (pp.179-181). Recomputed both examples independently: ln(mu) = -2.1 + 0.04(30) = -0.9, e^-0.9 = 0.4066 -> 0.407 claims/yr; e^0.1823 = 1.2000, e^0.0488 = 1.0500, product 1.2600; e^0.4055 = 1.5000, e^0.1310 = 1.1400, product 1.7100; and e^(0.4055+0.1310) = e^0.5365 = 1.7100 -- every figure on the page reproduces, including the +50%/+14% split. Medium rather than high because two page claims sit outside this source: the canonical-link table (identity/log/logit/reciprocal -- standard GLM theory, but Werner names only the log link) and the exposure offset / claim-count weights, which Werner explicitly puts 'beyond the scope of this text' (p.177). Both are correct as stated; they are simply not confirmable here. LaTeX balanced, links and embed resolve.
- sources_checked: Werner & Modlin, Basic Ratemaking (CAS, 5th ed. May 2016), Ch.10 'Multivariate Classification', printed pp.176-181 (PDF pp.188-193), sha256:6b214d4db52674df2e83343920c06781e491254bd77f27e32ba312faaff3782c — https://www.casact.org/sites/default/files/old/studynotes_werner_modlin_ratemaking.pdf

## [F-001] Least squares = MLE stated as 'only' the classical linear model
- entry_type: finding
- author: agent:validate-v1
- run_id: 2026-10-31T12:23Z/2047
- date: 2026-10-31
- severity: minor
- status: open
- locus: maximum likelihood bullet
- claim: Minimizing squared error gives the maximum likelihood estimates only in the classical linear model, with normal errors and the identity link.
- evidence: Goldburd et al. never compare least squares with maximum likelihood (searched 'least squares': only the IRLS mention, PDF p.80). Rodriguez, GLM notes ch.2 §2.2.1 pp.6-7, calls (X'X)^-1 X'y 'the ordinary least squares (OLS) or maximum likelihood estimator' in the normal linear model, and App. B §B.1-B.2 pp.3-5 says the standard linear model is the GLM with normal errors and identity link and that all GLMs are fitted by iteratively re-weighted least squares. 'Only' overreaches: with normal errors and a non-identity link the MLE still minimizes squared error, just not linearly. Restated to what Rodriguez says.
- source_rank: 3
- proposed_action: Restate: in the classical linear model, with normal errors and the identity link, the least squares estimates are the maximum likelihood estimates; the other GLMs are fitted by iteratively reweighted least squares.
- applied: true
- fingerprint: df7c3201f14c

## [F-002] Aliasing bullet states remedies and frequencies the readings do not
- entry_type: finding
- author: agent:validate-v1
- run_id: 2026-10-31T12:23Z/2047
- date: 2026-10-31
- severity: minor
- status: open
- locus: Building the model, Aliasing bullet
- claim: Near aliasing typically comes from two indicators that overlap except for a handful of records ... To remove near aliasing, deal with those few records: remove them, or reclassify them where they are coding errors ... A common source is missing data ...
- evidence: Goldburd §2.9 p.28 (PDF 38) defines aliasing and near aliasing and says software drops one of two aliased predictors; §4.1 p.37 (PDF 47) says a field with identical or near-identical information to another need not be kept; §4.2 pp.37-38 (PDF 47-48) handles missing values with a mean/mode value plus an error flag. Holmes & Casotto App. C.2 p.106 (PDF 116) gives two indicators overlapping except for a handful of characteristics as an EXAMPLE ('Take for example'), not as the typical cause, and says lasso will likely penalize one indicator heavily. Neither reading prescribes removing or reclassifying the records, and neither says missing data is a common source. Kept as a derivation what follows from the definitions (removing the few records makes the two columns identical, an exact alias the software resolves; identical error flags are identical columns), dropped 'typically' and 'common', and added the readings' own remedies.
- source_rank: 2
- proposed_action: Restate as: for example two indicators may overlap except for a handful of records; removing or reclassifying them makes the columns identical, an exact alias the software resolves; a duplicate field need not be kept, and lasso is likely to penalize one indicator heavily; missing data can create an alias when the same records get identical error flags in two fields.
- applied: true
- fingerprint: 557fdc10c459

## [F-003] Severity-deductible footnote stated more strongly than Goldburd
- entry_type: finding
- author: agent:validate-v1
- run_id: 2026-10-31T12:23Z/2047
- date: 2026-10-31
- severity: nit
- status: open
- locus: Coverage options bullet, last two sentences
- claim: the deductible eliminates many small claims, which lowers severity's denominator (the claim count) by more than its numerator, so average claim size rises with the deductible.
- evidence: Goldburd §9.1 fn.19 p.89 (PDF 99): the deductible lowers the numerator of severity by eliminating a portion of each loss and lowers the denominator by eliminating many small claims; 'As the latter effect is usually stronger than the former, the total effect of deductible on severity is most often positive.' The page dropped 'usually' and 'most often'. Restated to the footnote.
- source_rank: 2
- proposed_action: Restate with both effects and 'usually' / 'most often'.
- applied: true
- fingerprint: 1ec7f0c6c964

## [F-004] Centered intercept called 'the prediction' rather than giving it
- entry_type: finding
- author: agent:validate-v1
- run_id: 2026-10-31T12:23Z/2047
- date: 2026-10-31
- severity: nit
- status: open
- locus: Centering bullet
- claim: after centering the intercept is the prediction for a risk at every base level.
- evidence: With a log link the intercept is the log of the prediction for a base risk at the base AOI; Goldburd Table 12 p.60 (PDF 70) gives intercept -3.7710, a frequency of e^-3.7710. The page's own example says 'the log frequency'. Reworded to 'gives the prediction'.
- source_rank: 2
- proposed_action: Reword 'is the prediction' to 'gives the prediction'.
- applied: true
- fingerprint: a675a68e9d69

## [F-001/R] Correction applied
- entry_type: resolution
- author: agent:validate-v1
- run_id: 2026-10-31T12:23Z/2047
- date: 2026-10-31
- resolves: F-001
- status: resolved
- note: Restated in this change to Rodriguez ch.2 §2.2.1 and App. B: least squares = MLE in the normal identity-link model; other GLMs fitted by IRLS.

## [F-002/R] Correction applied
- entry_type: resolution
- author: agent:validate-v1
- run_id: 2026-10-31T12:23Z/2047
- date: 2026-10-31
- resolves: F-002
- status: resolved
- note: Restated in this change: 'for example' (H&C C.2), the remove/reclassify point kept as a consequence of Goldburd's definitions, the readings' own remedies added (duplicate field need not be kept, Goldburd §4.1; lasso, H&C C.2), and 'common source' made 'can create an alias'.

## [F-003/R] Correction applied
- entry_type: resolution
- author: agent:validate-v1
- run_id: 2026-10-31T12:23Z/2047
- date: 2026-10-31
- resolves: F-003
- status: resolved
- note: Restated in this change to Goldburd fn.19: both effects, 'usually the stronger', 'most often rises'.

## [F-004/R] Correction applied
- entry_type: resolution
- author: agent:validate-v1
- run_id: 2026-10-31T12:23Z/2047
- date: 2026-10-31
- resolves: F-004
- status: resolved
- note: Reworded in this change to 'gives the prediction'.

## [C-002] Validation pass — verified
- entry_type: comment
- author: agent:validate-v1
- run_id: 2026-10-31T12:23Z/2047
- date: 2026-10-31
- status_set: verified
- confidence: medium
- checks_run: delta check of the Exam 8 additions (Building the model block, centering example, link sentences) against Goldburd et al. and Holmes & Casotto, read this session; centering example recomputed before comparing with Tables 11-12; compared with questions/exam-8/cas8-2019-q6.md and the other exam-8 GLM questions for rule 10; older content unchanged since the 2026-09-13 Werner & Modlin pass
- sources_checked: Goldburd, Khare, Tevet & Guller, Generalized Linear Models for Insurance Rating, CAS Monograph 5, 2nd ed., §2.5 pp.16-17 (PDF 26-27); §2.9 pp.27-28 (PDF 37-38); §4.1-4.2 pp.37-38 (PDF 47-48); §5.4.2-5.4.5 pp.50-55 (PDF 60-65); §5.6.2 Tables 10-12 pp.58-60 (PDF 68-70); §6.4 pp.73-74 (PDF 83-84); §9.1 incl. fn.19 pp.89-90 (PDF 99-100), sha256:89b203ea55208911c4d8f6ef1ede4dd6c0206d47999b5e8aff96fe233c0ff757 — https://www.casact.org/sites/default/files/2021-01/05-Goldburd-Khare-Tevet.pdf; Holmes & Casotto, Penalized Regression and Lasso Credibility, CAS Monograph 13 (2025 revision), App. C.2 p.106 (PDF 116, penalized regression and near aliasing), sha256:f6978accbd2bcd43284ec939dd90966430a3e36fc126aab4584241a13d7a28cd — https://www.casact.org/sites/default/files/2025-08/CAS_Monograph_13_2025_revision.pdf; Rodriguez, Lecture Notes on GLMs (Princeton WWS 509), ch.2 §2.2.1 pp.6-7 (OLS = maximum likelihood estimator in the normal linear model), sha256:b9fae913696a54bb97a9a0f60cdddd8a5c72c9e9cf0451e503a0043d888edf1f — https://grodri.github.io/glms/notes/c2.pdf; Rodriguez, Lecture Notes on GLMs, App. B §B.1-B.2 pp.3-5 (normal errors with identity link; GLMs fitted by iteratively re-weighted least squares), sha256:92bc67a6a2fc52a0ffa2babfd7a13e175b2babb52dd28f778d5e307cc65aa286 — https://grodri.github.io/glms/notes/a2.pdf
- note: Delta pass; content outside the new block is as verified 2026-09-13 against Werner & Modlin ch.10, unchanged. Weights: Goldburd §2.5 (Var = phi V(mu)/w; weight = records an aggregated row represents; 1/n variance of a mean) - the binomial renewal sentence applies that rule to a row giving the share of n renewals, the mean of n binary outcomes, and is kept as a plain application. Correlation, multicollinearity (VIF > 10), aliasing, near aliasing: Goldburd §2.9 pp.27-28 and H&C C.2; restated under F-002. Non-linear effects: Goldburd §5.4.2-5.4.5 (binning drawbacks, polynomial interpretability and edge behaviour, hinge break points chosen by the user from a partial residual plot, abrupt change of direction, natural cubic spline combines both). Centering: Goldburd §5.6.2 pp.58-60; the identity b0 + b1 ln x = (b0 + b1 ln b) + b1 ln(x/b) is plain algebra and Table 12 confirms it: ln 200,000 = 12.20607; -8.9456 + 0.4239(12.20607) = -3.77145 (Table 12: -3.7710); 0.7447 - 0.1032(12.20607) = -0.51497 (Table 12: -0.5153); e^-0.5153 = 0.5973; slope and interaction estimates and SEs (0.0078, 0.0272) identical in both tables. Stability: Goldburd §6.4 (Cook's distance, cross-validation, bootstrapping; same confidence either way, so significance does not show instability). Coverage options: Goldburd §9.1 and fn.19, restated under F-003. MLE sentence restated under F-001 (Rodriguez). Rule 10: cas8-2019-q6 is built on the monograph's Tables 11-12 with its own coefficients (intercept -8.4607, ln AOI 0.4311, sprinklered 0.7228, interaction -0.0960); none of those figures nor its answers (ratio 0.638, intercept -3.1987) is on the page. The page's example is the reading's own (Tables 11-12, base AOI 200,000 is the monograph's), so it is kept. Medium because the binomial weight and the remove-records consequence are applications of the reading rather than its words.

## [C-003] Validation pass — verified
- entry_type: comment
- author: agent:validate-v1
- run_id: 2026-10-31T12:23Z/2047
- date: 2026-10-31
- status_set: verified
- confidence: medium
- checks_run: source list restated
- sources_checked: Goldburd, Khare, Tevet & Guller, Generalized Linear Models for Insurance Rating, CAS Monograph 5, 2nd ed., §2.5 pp.16-17 (PDF 26-27); §2.9 pp.27-28 (PDF 37-38); §4.1-4.2 pp.37-38 (PDF 47-48); §5.4.2-5.4.5 pp.50-55 (PDF 60-65); §5.6.2 Tables 10-12 pp.58-60 (PDF 68-70); §6.4 pp.73-74 (PDF 83-84); §9.1 incl. fn.19 pp.89-90 (PDF 99-100), sha256:89b203ea55208911c4d8f6ef1ede4dd6c0206d47999b5e8aff96fe233c0ff757 — https://www.casact.org/sites/default/files/2021-01/05-Goldburd-Khare-Tevet.pdf; Holmes & Casotto, Penalized Regression and Lasso Credibility, CAS Monograph 13 (2025 revision), App. C.2 p.106 (PDF 116, penalized regression and near aliasing), sha256:f6978accbd2bcd43284ec939dd90966430a3e36fc126aab4584241a13d7a28cd — https://www.casact.org/sites/default/files/2025-08/CAS_Monograph_13_2025_revision.pdf; Rodriguez, Lecture Notes on GLMs (Princeton WWS 509), ch.2 §2.2.1 pp.6-7 (OLS = maximum likelihood estimator in the normal linear model), sha256:b9fae913696a54bb97a9a0f60cdddd8a5c72c9e9cf0451e503a0043d888edf1f — https://grodri.github.io/glms/notes/c2.pdf; Rodriguez, Lecture Notes on GLMs, App. B §B.1-B.2 pp.3-5 (normal errors with identity link; GLMs fitted by iteratively re-weighted least squares), sha256:92bc67a6a2fc52a0ffa2babfd7a13e175b2babb52dd28f778d5e307cc65aa286 — https://grodri.github.io/glms/notes/a2.pdf; Werner & Modlin, Basic Ratemaking (CAS, 5th ed. May 2016), Ch.10 'Multivariate Classification', printed pp.176-181 (PDF pp.188-193), sha256:6b214d4db52674df2e83343920c06781e491254bd77f27e32ba312faaff3782c — https://www.casact.org/sites/default/files/old/studynotes_werner_modlin_ratemaking.pdf
- note: Same run, same content: restates the block's sources as this run's delta sources plus the prior pass's sources, which still cover the page's unchanged content. No new checks.
