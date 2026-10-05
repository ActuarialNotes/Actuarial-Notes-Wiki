---
target: Concepts/Hat Matrix.md
created: 2026-10-04
---

## [C-001] Validation pass — verified
- entry_type: comment
- author: agent:validate-v1
- run_id: 2026-10-04T20:47Z/8861
- date: 2026-10-04
- status_set: verified
- confidence: medium
- checks_run: both examples recomputed before comparison (xbar = 4, Sxx = 50, h = 0.38/0.28/0.22/0.20/0.92, sum 2.00, flag 2(2)/5 = 0.80; two-group H block-diagonal 0.5s, yhat = (3,3,8,8), e = (-1,1,-1,1), LOOCV errors ±2, CV = 4 vs training MSE 1) - agree; definition, projection/idempotence/trace, leverage bounds and average, flag rule (p+1 parameters convention noted against PSU's p), SLR formula, var(e_i), studentized/Cook's, LOOCV shortcut, GLM hat matrix checked; links resolve
- sources_checked: James, Witten, Hastie & Tibshirani, An Introduction to Statistical Learning (2nd ed., Springer 2021), §3.3.3 item 5 'High Leverage Points', leverage statistic eq (3.37), 1/n <= h_i <= 1, average (p+1)/n, printed pp.98-99 (PDF pp.108-109); §5.1.2 LOOCV shortcut eq (5.2) printed p.202 (PDF p.211), sha256:f708349f34d2b345a40766f7b4830d22c1bcbf90b4194ae603dcd1245b4e975f — https://www.casact.org/sites/default/files/2022-12/James-G.-et-al.-2nd-edition-Springer-2021.pdf; Penn State STAT 501 Regression Methods (online course notes), Lesson 11 §11.2 hat matrix H = X(X'X)^-1 X', yhat_i = sum_j h_ij y_j, sum of h_ii = number of parameters, 2p/n and 3p/n flags; §11.3-11.5 studentized residuals, deleted residuals, Cook's distance, sha256:6229ca1803f9d152028893131b323ac3ebdff7b49733518cc14a77a87200dbb9 — https://online.stat.psu.edu/stat501/Lesson11.html; Rodríguez, G., Lecture Notes on Generalized Linear Models (Princeton WWS 509), Ch.2 'Linear Models for Continuous Data', §2.9.1-2.9.2: yhat = Hy, r = (I-H)y, var(r_i) = (1-h_ii) sigma², 1/n <= h_ii for models with a constant, simple-regression h_ii, standardized residual, PDF pp.49-50, sha256:b9fae913696a54bb97a9a0f60cdddd8a5c72c9e9cf0451e503a0043d888edf1f — https://grodri.github.io/glms/notes/c2.pdf; Rodríguez, G., Lecture Notes on Generalized Linear Models (Princeton WWS 509), Ch.3 'Logit Models for Binary Data', §3.8 weighted hat matrix W^1/2 X(X'WX)^-1 X'W^1/2 and GLM leverages, PDF p.48, sha256:2243f2c49c0e15545740a0b4fb8d98ad8a5b3e37653c13feee545195801efedc — https://grodri.github.io/glms/notes/c3.pdf; Margalit & Rabinoff, Interactive Linear Algebra (Georgia Tech), §6.3 'Orthogonal Projection': A(A'A)^-1 A' projects onto Col(A); projection matrices satisfy B² = B and are similar to diag(1..1,0..0), sha256:5f55c3eedb52811df75c7706a17fc29be54903cda310167a12acd631835425e2 — https://textbooks.math.gatech.edu/ila/projections.html
- note: No findings. Leverage facts confirmed in ISLR 2nd ed.; matrix properties in rank-3 sources, hence medium. PSU writes p for the number of parameters; the page's p+1 is ISLR's convention, not an error.
