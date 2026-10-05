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
