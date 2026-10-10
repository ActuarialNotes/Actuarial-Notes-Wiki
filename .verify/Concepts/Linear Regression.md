---
target: Concepts/Linear Regression.md
created: 2026-10-04
---

## [F-001] Gauss–Markov condition omits uncorrelated errors
- entry_type: finding
- author: agent:validate-v1
- run_id: 2026-10-04T20:47Z/8861
- date: 2026-10-04
- severity: major
- status: open
- locus: bullet 4 (OLS is the MLE ... Gauss–Markov)
- claim: By Gauss–Markov OLS is the minimum-variance linear unbiased estimator 'whenever the errors have constant variance'.
- evidence: Rodríguez GLM notes Ch.2 §2.2.2 (c2.pdf PDF pp.7-8, sha256:b9fae913696a54bb97a9a0f60cdddd8a5c72c9e9cf0451e503a0043d888edf1f): OLS is the best linear unbiased estimator when 'the observations are uncorrelated and have constant variance σ²' (and E(Y)=Xβ) — constant variance alone is not sufficient. ISLR 2nd ed. §3.3.3 'Correlation of Error Terms' (printed p.94, PDF p.104) shows correlated errors break the standard OLS results. The vault's own Ordinary Least Squares page states the condition correctly ('With uncorrelated, constant-variance errors it is the best linear unbiased estimator'). As written a reader would apply Gauss–Markov to, e.g., autocorrelated time-series errors.
- source_rank: 3
- proposed_action: State the condition as errors with mean zero that are uncorrelated and have constant variance (wording for a human to settle).
- applied: false
- fingerprint: 589ea44e849c

## [F-002] Figure's 'least-squares line' is not the least-squares fit of its points
- entry_type: finding
- author: agent:validate-v1
- run_id: 2026-10-04T20:47Z/8861
- date: 2026-10-04
- severity: minor
- status: open
- locus: figure (Media/Figures/Linear_Regression.svg; builder linear_regression() in scripts/figures_exam_mas_i.py)
- claim: Alt text: 'A fitted least-squares line through ten points, with the residuals it minimizes'; the builder draws y = 25.8 + 1.6*1.35*x = 25.8 + 2.16x.
- evidence: Recomputed the OLS fit of the ten plotted points (0.8,33) (1.9,27) (2.9,36) (3.8,30) (4.7,41) (5.6,38) (6.6,49) (7.5,43) (8.4,53) (9.2,48): b0 = 26.22, b1 = 2.643 (ISLR 2nd ed. eq. 3.4, printed p.62). The drawn line's residuals sum to +28.98 and its RSS is 263.9 against 163.3 at the least-squares line, so it is not the line that minimizes the residuals; with an intercept the OLS residuals sum to zero (normal equations, Rodríguez Ch.2 §2.2.1). The picture contradicts the property the alt text and the OLS page state.
- source_rank: 2
- proposed_action: In the figure builder, compute the line by least squares from pts instead of reusing the worked example's coefficients, then regenerate (scripts/generate_concept_figures.py). Do not hand-edit the SVG.
- applied: false
- fingerprint: da7a3c549ae0

## [C-001] Validation pass — verified
- entry_type: comment
- author: agent:validate-v1
- run_id: 2026-10-04T20:47Z/8861
- date: 2026-10-04
- status_set: verified
- confidence: medium
- checks_run: worked example recomputed before reading the answer (b1 = 1.6, b0 = 25.8, yhat(15) = 49.8 - agrees); model, OLS estimator, assumptions/diagnostics, coefficient interpretation, R² and sigma-hat² = RSS/(n-p-1) (df checked), MLE/Gauss-Markov conditions, Poisson-GLM remedy checked against ISLR, Rodríguez, PSU; figure builder recomputed; links and embed resolve; exam usage (MAS-I C, MAS-II, DISC-DA) consistent
- sources_checked: James, Witten, Hastie & Tibshirani, An Introduction to Statistical Learning (2nd ed., Springer 2021), §3.1.1-3.1.3 and §3.2.1-3.2.2, eqs (3.4), (3.17), (3.19), (3.23), (3.25), printed pp.61-80 (PDF pp.71-90); §3.3.3 'Potential Problems' printed pp.92-96 (PDF pp.102-106), sha256:f708349f34d2b345a40766f7b4830d22c1bcbf90b4194ae603dcd1245b4e975f — https://www.casact.org/sites/default/files/2022-12/James-G.-et-al.-2nd-edition-Springer-2021.pdf; Rodríguez, G., Lecture Notes on Generalized Linear Models (Princeton WWS 509), Ch.2 'Linear Models for Continuous Data', §2.2.1-2.2.3 normal equations, (X'X)^-1 X'y, BLUE conditions, normality only for small-sample inference, PDF pp.6-9, sha256:b9fae913696a54bb97a9a0f60cdddd8a5c72c9e9cf0451e503a0043d888edf1f — https://grodri.github.io/glms/notes/c2.pdf; Rodríguez, G., Lecture Notes on Generalized Linear Models (Princeton WWS 509), App. B 'Generalized Linear Model Theory', §B.1 normal errors with identity link as a GLM, PDF pp.1-3, sha256:92bc67a6a2fc52a0ffa2babfd7a13e175b2babb52dd28f778d5e307cc65aa286 — https://grodri.github.io/glms/notes/a2.pdf; Rodríguez, G., Lecture Notes on Generalized Linear Models (Princeton WWS 509), Ch.4 'Poisson Models for Count Data', §4.2 log link, §4.3.2 offset = log exposure, PDF pp.5-7, 10, sha256:1caaa05c152c35d73ab90400c526e871016283aade13ee812c40032f6dfa8fbe — https://grodri.github.io/glms/notes/c4.pdf; Penn State STAT 501 Regression Methods (online course notes), Lesson 4 §4.2-4.6 residuals vs fits, residuals vs order, normal probability plot of residuals, sha256:af097ae3a85c7cacb40f3a05735bfda4f6a46a26ad26bed95556e7457ac58b6c — https://online.stat.psu.edu/stat501/Lesson04.html; Penn State STAT 501 Regression Methods (online course notes), Lesson 12 §12.3 'The bottom line' (holding correlated predictors fixed), sha256:f67694d5ded5e449996b5fde9068686e916b9c1c5cd9245c02badb257c72bc8e — https://online.stat.psu.edu/stat501/Lesson12.html; CAS Exam MAS-I Content Outline 2026 (MASI_CO_2026_F v06), Domain C tasks 4 and 7, p.5, sha256:245892366dea073ff44e89b3ac2ae1401517b127d36d51c8a1198b3185faa2ed — https://www.casact.org/sites/default/files/2026-06/MASI_ContentOutline_2026.pdf
- note: Content matches ISLR/Rodríguez except the Gauss–Markov condition (F-001, major: 'uncorrelated' missing) and the figure's line (F-002, minor). Matrix form checked against rank-3 notes, hence medium.

## [F-001/R] Correction applied
- entry_type: resolution
- author: agent:validate-v1
- run_id: 2026-10-04T21:11Z/3707
- date: 2026-10-05
- resolves: F-001
- status: resolved
- note: Bullet 4 rewritten: Gauss–Markov now holds 'whenever the errors have mean zero, are uncorrelated and have constant variance (E[eps] = 0, Var(eps) = sigma² I)', and normality is 'needed only for exact tests and intervals in small samples'. Source: Rodríguez GLM notes Ch.2 §2.2.2, c2.pdf PDF pp.7-8 (OLS unbiased when E(Y) = X beta; var = (X'X)^-1 sigma² and BLUE when the observations are uncorrelated with constant variance; 'All of these results depend only on ... E(Y) = X beta and var(Y) = sigma² I'; 'normality ... is required only for inference in small samples'), sha256:b9fae913696a54bb97a9a0f60cdddd8a5c72c9e9cf0451e503a0043d888edf1f — https://grodri.github.io/glms/notes/c2.pdf; theorem name and conditions also per Wikipedia 'Gauss–Markov theorem' lead, sha256:d0a00c2b0a3843ccffd22e29a13c62beeec71e4d43cfa0d9e97aef357149cd3a.

## [C-002] Validation pass — verified
- entry_type: comment
- author: agent:validate-v1
- run_id: 2026-10-04T21:11Z/3707
- date: 2026-10-05
- status_set: verified
- confidence: medium
- checks_run: edited bullet re-read against Rodríguez Ch.2 §2.2.2 and the Gauss–Markov statement; worked example recomputed in python (b1 = 400/250 = 1.6, b0 = 45 - 1.6x12 = 25.8, yhat(15) = 49.8) - agrees; sigma-hat² = RSS/(n-p-1) re-checked against ISLR (3.25); offset = log exposure re-checked in Rodríguez Ch.4; every [[link]] and the figure embed resolve
- sources_checked: James, Witten, Hastie & Tibshirani, An Introduction to Statistical Learning (2nd ed., Springer 2021), §3.1.1 RSS (3.3) and least-squares estimates (3.4) printed p.62 (PDF p.72); §3.2.2 F-statistic (3.23) printed p.76 (PDF p.86), RSE = sqrt(RSS/(n-p-1)) (3.25) printed p.80 (PDF p.90), sha256:f708349f34d2b345a40766f7b4830d22c1bcbf90b4194ae603dcd1245b4e975f — https://www.casact.org/sites/default/files/2022-12/James-G.-et-al.-2nd-edition-Springer-2021.pdf; Rodríguez, G., Lecture Notes on Generalized Linear Models (Princeton WWS 509), Ch.2 'Linear Models for Continuous Data', §2.2.1-2.2.3 (X'X)^-1 X'y, unbiasedness, BLUE under E(Y) = X beta and var(Y) = sigma² I, normality only for small-sample inference, PDF pp.6-8, sha256:b9fae913696a54bb97a9a0f60cdddd8a5c72c9e9cf0451e503a0043d888edf1f — https://grodri.github.io/glms/notes/c2.pdf; Wikipedia, 'Gauss–Markov theorem' (lead: OLS has the lowest sampling variance among linear unbiased estimators if the errors are uncorrelated, have equal variances and expectation zero; normality not required), retrieved 2026-10-05, sha256:d0a00c2b0a3843ccffd22e29a13c62beeec71e4d43cfa0d9e97aef357149cd3a — https://en.wikipedia.org/wiki/Gauss%E2%80%93Markov_theorem; Rodríguez, G., Lecture Notes on Generalized Linear Models (Princeton WWS 509), Ch.4 'Poisson Models for Count Data', §4.2 log link, §4.3 offset = log of exposure, PDF pp.5-7, 10, sha256:1caaa05c152c35d73ab90400c526e871016283aade13ee812c40032f6dfa8fbe — https://grodri.github.io/glms/notes/c4.pdf; Penn State STAT 501 Regression Methods (online course notes), Lesson 4 §4.2-4.6 residuals vs fits, residuals vs order, normal probability plot of residuals, sha256:af097ae3a85c7cacb40f3a05735bfda4f6a46a26ad26bed95556e7457ac58b6c — https://online.stat.psu.edu/stat501/Lesson04.html; Penn State STAT 501 Regression Methods (online course notes), Lesson 12 §12.3 predictions within scope unaffected, interpretation lost; §12.4 Var(b_k) = sigma²/sum_i(x_ik - xbar_k)² x 1/(1 - R_k²), Var(b_k)_min with x_k the only predictor, VIF_k = 1/(1-R_k²), sha256:f67694d5ded5e449996b5fde9068686e916b9c1c5cd9245c02badb257c72bc8e — https://online.stat.psu.edu/stat501/Lesson12.html; CAS Exam MAS-I Content Outline 2026 (MASI_CO_2026_F v06), Domain C task 4 ('Interpret the extended linear model output from statistical software, such as parameter estimate tables and ANOVA tables') and task 7, p.5, sha256:245892366dea073ff44e89b3ac2ae1401517b127d36d51c8a1198b3185faa2ed — https://www.casact.org/sites/default/files/2026-06/MASI_ContentOutline_2026.pdf
- note: F-001 resolved (Gauss–Markov conditions now complete). F-002 (generated figure's line is not the least-squares fit) stays open for the figure agent - outside this package. Medium: matrix form and Gauss–Markov rest on rank-3/4 sources.

## [F-002/R] Linear Regression figure line is now the least-squares fit of its points
- entry_type: resolution
- author: agent:validate-v1
- run_id: 2026-10-04T21:11Z/3707
- date: 2026-10-05
- resolves: F-002
- status: resolved
- note: linear_regression() in scripts/figures_exam_mas_i.py now fits the line from its own ten points by least squares (b1 = Sxy/Sxx, b0 = ybar - b1*xbar, ISLR 2nd ed. eq. 3.4) instead of the hand-set 25.8 + 2.16x; the residual segments are drawn to that line, and the 'residual' pointer was moved to the widest gap, at (3.8, 30), because at its old target (7.5, 43) the gap is now too short to see under the arrowhead. Regenerated Media/Figures/Linear_Regression.svg only. Checked: read the drawn line's endpoints back out of the SVG and mapped them through the tick positions -> 26.219 + 2.6424x against an independent OLS fit of 26.2175 + 2.6425x (residuals of the drawn line sum to -0.006, i.e. zero to the SVG's 2-decimal rounding; F-002's 26.22 + 2.643x); the ten circles read back at their stated coordinates; rendered in headless Chromium. scripts/test_figure_kit.py: 11 tests OK.

## [F-003] Does not link the related page Regression Through the Origin
- entry_type: finding
- author: agent:validate-v1
- run_id: 2026-10-04T21:11Z/3707
- date: 2026-10-05
- severity: nit
- status: open
- locus: property bullets (related concepts)
- claim: The page presents the model with an intercept beta_0 and links R-Squared, ANOVA and Parameter Estimate Tables, but does not link Regression Through the Origin (the same model fitted without beta_0), a MAS-I Domain C topic from Larsen.
- evidence: Larsen, Generalized Linear Models, CAS Study Note (rev. 6/29/2016), PDF p.1 'Regression Through the Origin' (the intercept is zero or left out of the equation; the test of significance for the intercept could show it is not significantly different from zero and the modeler could drop it; then if all explanatory variables are zero the dependent variable will be zero), sha256:5c4ed4e8eacf72624f38c5313eb6903f57d627b6ac81ce52e0a5a69404af90bd — https://www.casact.org/sites/default/files/2021-03/MAS-I_Larsen.pdf. Outline 2026 p.6 assigns Larsen to C1-C9 (sha256:245892366dea073ff44e89b3ac2ae1401517b127d36d51c8a1198b3185faa2ed). Concepts/Regression Through the Origin.md exists.
- source_rank: 2
- proposed_action: Add one short sourced bullet linking the page.
- applied: true
- fingerprint: ae05b3e7f85d

## [F-003/R] Correction applied
- entry_type: resolution
- author: agent:validate-v1
- run_id: 2026-10-04T21:11Z/3707
- date: 2026-10-05
- resolves: F-003
- status: resolved
- note: Added after the R-Squared bullet: 'Leaving out beta_0, for instance when its test shows it is not significantly different from zero, gives regression through the origin: the fitted response is then zero whenever every predictor is zero', linking [[Regression Through the Origin]]. Source: Larsen PDF p.1, 'Regression Through the Origin' (sha256:5c4ed4e8...). All 18 links and the figure embed resolve.

## [C-003] Validation pass — verified
- entry_type: comment
- author: agent:validate-v1
- run_id: 2026-10-04T21:11Z/3707
- date: 2026-10-05
- status_set: verified
- confidence: medium
- checks_run: Every claim re-read this session against the cached sources (hashes re-computed, all match): RSS (3.3), least-squares estimates (3.4) and RSE = sqrt(RSS/(n-p-1)) (3.25) in ISLR PDF pp.72, 90; F-statistic (3.23) PDF p.86; normal equations X'X beta = X'y, unbiasedness, var = (X'X)^-1 sigma^2 and BLUE for uncorrelated constant-variance observations, normality needed only for small-sample inference (Rodríguez Ch.2 §2.2, PDF pp.6-8); Gauss-Markov conditions (Wikipedia lead); log link and offset = log exposure (Rodríguez Ch.4 PDF pp.5-10); residual plots and normal probability plot (PSU 501 L4); holding predictors fixed and VIF (PSU 501 L12); new bullet (Larsen PDF p.1). Worked example recomputed in python: b1 = 400/250 = 1.6, b0 = 45 - 1.6(12) = 25.8, yhat(15) = 49.8. All [[links]] resolve exactly; figure embed exists; LaTeX balanced.
- sources_checked: James, Witten, Hastie & Tibshirani, An Introduction to Statistical Learning (2nd ed., Springer 2021), §3.1.1 RSS (3.3) and least-squares estimates (3.4) printed p.62 (PDF p.72); §3.2.2 F-statistic (3.23) printed p.76 (PDF p.86), RSE = sqrt(RSS/(n-p-1)) (3.25) printed p.80 (PDF p.90), sha256:f708349f34d2b345a40766f7b4830d22c1bcbf90b4194ae603dcd1245b4e975f — https://www.casact.org/sites/default/files/2022-12/James-G.-et-al.-2nd-edition-Springer-2021.pdf; Rodríguez, G., Lecture Notes on Generalized Linear Models (Princeton WWS 509), Ch.2 'Linear Models for Continuous Data', §2.2.1-2.2.3 normal equations, (X'X)^-1 X'y, unbiasedness, BLUE for uncorrelated constant-variance observations, normality only for small-sample inference, PDF pp.6-8, sha256:b9fae913696a54bb97a9a0f60cdddd8a5c72c9e9cf0451e503a0043d888edf1f — https://grodri.github.io/glms/notes/c2.pdf; Wikipedia, 'Gauss–Markov theorem' (lead: OLS has the lowest sampling variance among linear unbiased estimators if the errors are uncorrelated, have equal variances and expectation zero), retrieved 2026-10-05, sha256:d0a00c2b0a3843ccffd22e29a13c62beeec71e4d43cfa0d9e97aef357149cd3a — https://en.wikipedia.org/wiki/Gauss%E2%80%93Markov_theorem; Rodríguez, G., Lecture Notes on Generalized Linear Models (Princeton WWS 509), Ch.4 'Poisson Models for Count Data', §4.2 log link, §4.3.2 offset = log of exposure, PDF pp.5-10, sha256:1caaa05c152c35d73ab90400c526e871016283aade13ee812c40032f6dfa8fbe — https://grodri.github.io/glms/notes/c4.pdf; Penn State STAT 501 Regression Methods (online course notes), Lesson 4 §4.2-4.6 residuals vs fits, residuals vs order, normal probability plot of residuals, sha256:af097ae3a85c7cacb40f3a05735bfda4f6a46a26ad26bed95556e7457ac58b6c — https://online.stat.psu.edu/stat501/Lesson04.html; Penn State STAT 501 Regression Methods (online course notes), Lesson 12 §12.3-12.4 holding correlated predictors fixed; variance inflation factors, sha256:f67694d5ded5e449996b5fde9068686e916b9c1c5cd9245c02badb257c72bc8e — https://online.stat.psu.edu/stat501/Lesson12.html; Larsen, Generalized Linear Models, CAS Study Note (rev. 6/29/2016), PDF p.1 'Regression Through the Origin' (the intercept is zero or left out of the equation; the test of significance for the intercept could show it is not significantly different from zero and the modeler could drop it; then if all explanatory variables are zero the dependent variable will be zero), sha256:5c4ed4e8eacf72624f38c5313eb6903f57d627b6ac81ce52e0a5a69404af90bd — https://www.casact.org/sites/default/files/2021-03/MAS-I_Larsen.pdf; CAS Exam MAS-I Content Outline 2026 (MASI_CO_2026_F v06), Domain C tasks 4 and 7, p.5; Larsen for C1-C9, p.6, sha256:245892366dea073ff44e89b3ac2ae1401517b127d36d51c8a1198b3185faa2ed — https://www.casact.org/sites/default/files/2026-06/MASI_ContentOutline_2026.pdf
- note: Verified medium, as before: matrix form and Gauss-Markov rest on rank-3/4 sources. No open findings.

## [C-004] Validation pass — verified
- entry_type: comment
- author: agent:validate-v1
- run_id: 2026-10-04T21:11Z/3707
- date: 2026-10-05
- status_set: verified
- confidence: medium
- checks_run: Re-recorded C-003 without change: the CI sync commit 5b973880's parent merge b46c4e1b kept the CI sync's 'stale' status line (written while this run's F-003 content edit was committed but its C-003 pass was not) beside C-003's content hash and sources. The file's bytes are those C-003 verified (content_hash matches; verify_check --sync makes no change). Checks as in C-003.
- sources_checked: James, Witten, Hastie & Tibshirani, An Introduction to Statistical Learning (2nd ed., Springer 2021), §3.1.1 RSS (3.3) and least-squares estimates (3.4) printed p.62 (PDF p.72); §3.2.2 F-statistic (3.23) printed p.76 (PDF p.86), RSE = sqrt(RSS/(n-p-1)) (3.25) printed p.80 (PDF p.90), sha256:f708349f34d2b345a40766f7b4830d22c1bcbf90b4194ae603dcd1245b4e975f — https://www.casact.org/sites/default/files/2022-12/James-G.-et-al.-2nd-edition-Springer-2021.pdf; Rodríguez, G., Lecture Notes on Generalized Linear Models (Princeton WWS 509), Ch.2 'Linear Models for Continuous Data', §2.2.1-2.2.3 normal equations, (X'X)^-1 X'y, unbiasedness, BLUE for uncorrelated constant-variance observations, normality only for small-sample inference, PDF pp.6-8, sha256:b9fae913696a54bb97a9a0f60cdddd8a5c72c9e9cf0451e503a0043d888edf1f — https://grodri.github.io/glms/notes/c2.pdf; Wikipedia, 'Gauss–Markov theorem' (lead: OLS has the lowest sampling variance among linear unbiased estimators if the errors are uncorrelated, have equal variances and expectation zero), retrieved 2026-10-05, sha256:d0a00c2b0a3843ccffd22e29a13c62beeec71e4d43cfa0d9e97aef357149cd3a — https://en.wikipedia.org/wiki/Gauss%E2%80%93Markov_theorem; Rodríguez, G., Lecture Notes on Generalized Linear Models (Princeton WWS 509), Ch.4 'Poisson Models for Count Data', §4.2 log link, §4.3.2 offset = log of exposure, PDF pp.5-10, sha256:1caaa05c152c35d73ab90400c526e871016283aade13ee812c40032f6dfa8fbe — https://grodri.github.io/glms/notes/c4.pdf; Penn State STAT 501 Regression Methods (online course notes), Lesson 4 §4.2-4.6 residuals vs fits, residuals vs order, normal probability plot of residuals, sha256:af097ae3a85c7cacb40f3a05735bfda4f6a46a26ad26bed95556e7457ac58b6c — https://online.stat.psu.edu/stat501/Lesson04.html; Penn State STAT 501 Regression Methods (online course notes), Lesson 12 §12.3-12.4 holding correlated predictors fixed; variance inflation factors, sha256:f67694d5ded5e449996b5fde9068686e916b9c1c5cd9245c02badb257c72bc8e — https://online.stat.psu.edu/stat501/Lesson12.html; Larsen, Generalized Linear Models, CAS Study Note (rev. 6/29/2016), PDF p.1 'Regression Through the Origin' (the intercept is zero or left out of the equation; the test of significance for the intercept could show it is not significantly different from zero and the modeler could drop it; then if all explanatory variables are zero the dependent variable will be zero), sha256:5c4ed4e8eacf72624f38c5313eb6903f57d627b6ac81ce52e0a5a69404af90bd — https://www.casact.org/sites/default/files/2021-03/MAS-I_Larsen.pdf; CAS Exam MAS-I Content Outline 2026 (MASI_CO_2026_F v06), Domain C tasks 4 and 7, p.5; Larsen for C1-C9, p.6, sha256:245892366dea073ff44e89b3ac2ae1401517b127d36d51c8a1198b3185faa2ed — https://www.casact.org/sites/default/files/2026-06/MASI_ContentOutline_2026.pdf
- note: Status restored to what C-003 recorded; no content change since.

## [C-005] Delta re-check after the DISC-DA tip and traps
- entry_type: comment
- author: agent:validate-v1
- run_id: 2026-10-10T21:00Z/dv01
- date: 2026-10-10
- status_set: verified
- confidence: medium
- checks_run: Delta check: git diff 57d0f7f9 (last pass C-004, 2026-10-05) -> HEAD adds a tip and two traps. DISC-DA 8.c 'Analyzing Data with Linear Functions' = syllabus PDF p.3 (the page's '8.3' follows the exam page's numbering). MAS-I: least squares, F test (ISLR §3.1-3.3 is a reading), R-squared (task C7), diagnostic plots (task C8); MAS-II: candidates expected to have mastered MAS-I and a regression course, linear mixed models built on the linear model (Domain B). Trap 1 = ISLR §3.2.1 'holding all other predictors fixed', PDF p.82. Trap 2 (negative predicted counts, variance growing with the mean, GLM fix) = Rodríguez Ch.4 log link and the page's already-verified count example. Re-fetched ISLR, MAS-I outline, Larsen, Rodríguez c2/c4: hashes unchanged. Rest of page unchanged since C-004.
- sources_checked: James, Witten, Hastie & Tibshirani, An Introduction to Statistical Learning, 2nd ed. (Springer 2021), §3.2.1 'We interpret βj as the average effect on Y of a one unit increase in Xj, holding all other predictors fixed', printed p.72 (PDF p.82); §3.1.1 RSS and least squares PDF p.72; §3.2.2 F-statistic PDF p.86, sha256:f708349f34d2b345a40766f7b4830d22c1bcbf90b4194ae603dcd1245b4e975f — https://www.casact.org/sites/default/files/2022-12/James-G.-et-al.-2nd-edition-Springer-2021.pdf; The Institutes, CAS DISC DA – Introduction to Data and Analytics Course Syllabus (© 2023), Course Syllabus, PDF pp.2-3 (topics 1-10 and their lettered sections), sha256:d4d823238bd55da3339a9a1ad682029c9a7aa9d4bcb0c18b319d499a00f6ba16 — https://www.casact.org/sites/default/files/2022-12/DISC_DA.pdf; CAS Exam MAS-I Content Outline 2026 (MASI_CO_2026_F v06), Section C tasks 4, 7 (R-squared) and 8 (diagnostic plots); ISLR Ch.3 §§3.1-3.3 a reading, PDF pp.5-6, sha256:245892366dea073ff44e89b3ac2ae1401517b127d36d51c8a1198b3185faa2ed — https://www.casact.org/sites/default/files/2026-06/MASI_ContentOutline_2026.pdf; CAS Exam MAS-II Content Outline 2026, prerequisites (candidates expected to have mastered Exam MAS-I; undergraduate regression course) and Domain B Linear Mixed Models tasks 1-4, PDF pp.5-6, sha256:babf0548b7d674e02d2cffdaee11e5063f8e8c03b3461b8ba2bdfdbc0f90ea1b — https://www.casact.org/sites/default/files/2026-01/MASII_Content_Outlines_2026.pdf; Rodríguez, Lecture Notes on Generalized Linear Models (Princeton WWS 509), Ch.2 §2.2 least squares, PDF pp.6-8, sha256:b9fae913696a54bb97a9a0f60cdddd8a5c72c9e9cf0451e503a0043d888edf1f — https://grodri.github.io/glms/notes/c2.pdf; Rodríguez, Lecture Notes on Generalized Linear Models (Princeton WWS 509), Ch.4 §4.2-4.3 Poisson log link and offset, PDF pp.5-10, sha256:1caaa05c152c35d73ab90400c526e871016283aade13ee812c40032f6dfa8fbe — https://grodri.github.io/glms/notes/c4.pdf; Larsen, Generalized Linear Models, CAS Study Note (rev. 6/29/2016), pp.1-2, sha256:5c4ed4e8eacf72624f38c5313eb6903f57d627b6ac81ce52e0a5a69404af90bd — https://www.casact.org/sites/default/files/2021-03/MAS-I_Larsen.pdf
- note: Done in V1 at the lead's request (page is in V2's list). Medium as before.

## [C-006] Validation pass — verified
- entry_type: comment
- author: agent:validate-v1
- run_id: 2026-10-10T21:00Z/dv02
- date: 2026-10-10
- status_set: verified
- confidence: medium
- checks_run: delta check: diffed e20f15da7^ (run 3707 bytes) to HEAD; additions are the tip/trap callouts; the slope interpretation checked against ISLR p.82, the count-response trap against the page's own (previously verified) example; Rodriguez notes and outlines re-fetched, hashes unchanged
- sources_checked: James, Witten, Hastie & Tibshirani, An Introduction to Statistical Learning, 2nd ed. (Springer 2021, CAS-hosted copy), §3.2 PDF p.82 (delta: beta_j holding all other predictors fixed); prior-pass sections §3.1-3.3, sha256:f708349f34d2b345a40766f7b4830d22c1bcbf90b4194ae603dcd1245b4e975f — https://www.casact.org/sites/default/files/2022-12/James-G.-et-al.-2nd-edition-Springer-2021.pdf; Rodriguez, Lecture Notes on GLMs (Princeton WWS 509), ch.2, §2.2.1-2.2.3, sha256:b9fae913696a54bb97a9a0f60cdddd8a5c72c9e9cf0451e503a0043d888edf1f — https://grodri.github.io/glms/notes/c2.pdf; Rodriguez, Lecture Notes on GLMs, App. B, §B.1, sha256:92bc67a6a2fc52a0ffa2babfd7a13e175b2babb52dd28f778d5e307cc65aa286 — https://grodri.github.io/glms/notes/a2.pdf; Rodriguez, Lecture Notes on GLMs, ch.4, §4.2-4.3, sha256:1caaa05c152c35d73ab90400c526e871016283aade13ee812c40032f6dfa8fbe — https://grodri.github.io/glms/notes/c4.pdf; CAS Exam MAS-I Content Outline 2026 (MASI_CO_2026_F v06), Domain C, p.5, sha256:245892366dea073ff44e89b3ac2ae1401517b127d36d51c8a1198b3185faa2ed — https://www.casact.org/sites/default/files/2026-06/MASI_ContentOutline_2026.pdf
- note: Medium as before. Penn State STAT 501 (SSL failure from this sandbox) and the Wikipedia Gauss-Markov page (revised since) were not re-read; the content they supported is unchanged since run 3707.
