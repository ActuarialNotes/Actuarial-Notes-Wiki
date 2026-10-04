---
target: Concepts/Design Matrix.md
created: 2026-10-04
---

## [C-001] Validation pass — verified
- entry_type: comment
- author: agent:validate-v1
- run_id: 2026-10-04T20:47Z/8861
- date: 2026-10-04
- status_set: verified
- confidence: medium
- checks_run: both examples recomputed before comparison (5x4 X for the rating example, rank 4 with I_A added since I_A + I_B + I_C = intercept; X'X = [[4,2],[2,2]], inverse 1/4[[2,-2],[-2,4]], X'y = (22,16), b = (3,5) = rural mean and urban-minus-rural) - agree; dimensions, k-1 indicator rule, interaction/quadratic columns, full-rank requirement and dummy trap, var(b), H and yhat, GLM eta, LMM X and Z checked; links resolve
- sources_checked: James, Witten, Hastie & Tibshirani, An Introduction to Statistical Learning (2nd ed., Springer 2021), §3.1.2 SE(b1) shrinks as x is more spread out, printed p.66; §3.3.1 dummy variables, one fewer than the number of levels, baseline, printed pp.83-86 (PDF pp.93-96); §3.3.2 interaction and x² columns, eq (3.36), printed pp.87-92; §6.5 lab model.matrix() printed pp.272-274 (PDF pp.280-282), sha256:f708349f34d2b345a40766f7b4830d22c1bcbf90b4194ae603dcd1245b4e975f — https://www.casact.org/sites/default/files/2022-12/James-G.-et-al.-2nd-edition-Springer-2021.pdf; Penn State STAT 501 Regression Methods (online course notes), Lesson 5 §5.4 X with a column of 1's, b = (X'X)^-1 X'Y, hat matrix, linear dependence makes X'X non-invertible, sha256:c7eb1ac675fffa3493ca7644a47f8a36e96fa53d301d2f8191c7ac4ca82edec6 — https://online.stat.psu.edu/stat501/Lesson05.html; Rodríguez, G., Lecture Notes on Generalized Linear Models (Princeton WWS 509), Ch.2 'Linear Models for Continuous Data', §2.2.1 full column rank required for (X'X)^-1; (2.9) var(b) = (X'X)^-1 sigma²; §2.9.1 H = X(X'X)^-1 X', PDF pp.6-7, 49, sha256:b9fae913696a54bb97a9a0f60cdddd8a5c72c9e9cf0451e503a0043d888edf1f — https://grodri.github.io/glms/notes/c2.pdf; Rodríguez, G., Lecture Notes on Generalized Linear Models (Princeton WWS 509), App. B 'Generalized Linear Model Theory', §B.1 linear predictor eta = X beta in a GLM, PDF pp.2-3, sha256:92bc67a6a2fc52a0ffa2babfd7a13e175b2babb52dd28f778d5e307cc65aa286 — https://grodri.github.io/glms/notes/a2.pdf; Bates, Mächler, Bolker & Walker, 'Fitting Linear Mixed-Effects Models Using lme4' (lme4 vignette, J. Stat. Softw. 2015), eqs (1)-(2) pp.2-3 and predict() re.form, sha256:60474d07bdb3a511f804a6cd2e73494fd8eb5713f532e2382f69c5dea2e8782e — https://cran.r-project.org/web/packages/lme4/vignettes/lmer.pdf
- note: No findings. Matrix results from rank-3 notes; dummy coding confirmed in ISLR, hence medium.
