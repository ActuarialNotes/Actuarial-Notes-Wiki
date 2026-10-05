---
target: Concepts/Ordinary Least Squares.md
created: 2026-10-04
---

## [C-001] Validation pass — verified
- entry_type: comment
- author: agent:validate-v1
- run_id: 2026-10-04T20:47Z/8861
- date: 2026-10-04
- status_set: verified
- confidence: medium
- checks_run: both examples recomputed independently before comparison (ybar = 11.2, Sxx = 10, Sxy = 6.1, b1 = 0.61, b0 = 9.37, residuals 0.02/0.01/-0.10/0.09/-0.02 sum 0, yhat6 = 13.03, RSS = 0.019; sigma² = 0.006333, SE = 0.02517, t = 24.24 vs t(0.025,3) = 3.1824 computed) - all agree; normal equations, residual orthogonality, simple-regression formulas, unbiasedness/variance/BLUE/MLE conditions, WLS/GLS/IRLS statements, outlier/leverage/collinearity sensitivity checked; links resolve
- sources_checked: James, Witten, Hastie & Tibshirani, An Introduction to Statistical Learning (2nd ed., Springer 2021), §3.1.1 eq (3.3)-(3.4) printed p.62 (PDF p.72); §3.1.2 eqs (3.8), (3.14) and footnote 3, printed pp.66-67 (PDF pp.76-77); §3.2.1 eq (3.22) printed p.72; §3.3.3 outliers/high leverage/collinearity printed pp.97-102 (PDF pp.107-112), sha256:f708349f34d2b345a40766f7b4830d22c1bcbf90b4194ae603dcd1245b4e975f — https://www.casact.org/sites/default/files/2022-12/James-G.-et-al.-2nd-edition-Springer-2021.pdf; Rodríguez, G., Lecture Notes on Generalized Linear Models (Princeton WWS 509), Ch.2 'Linear Models for Continuous Data', §2.2.1 normal equations X'X b = X'y and (2.7); §2.2.2 unbiasedness, var = (X'X)^-1 sigma², BLUE, MLE under normality; §2.2.3 RSS/(n-p); §2.3.1 t with n-p df, PDF pp.6-10, sha256:b9fae913696a54bb97a9a0f60cdddd8a5c72c9e9cf0451e503a0043d888edf1f — https://grodri.github.io/glms/notes/c2.pdf; Rodríguez, G., Lecture Notes on Generalized Linear Models (Princeton WWS 509), App. B 'Generalized Linear Model Theory', §B.2 IRLS: b = (X'WX)^-1 X'Wz, PDF pp.4-5, sha256:92bc67a6a2fc52a0ffa2babfd7a13e175b2babb52dd28f778d5e307cc65aa286 — https://grodri.github.io/glms/notes/a2.pdf; Dobson & Barnett, An Introduction to Generalized Linear Models (4th ed., CRC 2018) — publisher preview, §1.6.3 'Least squares estimation' printed pp.15-16 (PDF pp.32-33), sha256:40ed0b2549113ee0bea29e41786886ce992ffa29251ad26fb1037385bb51611a — https://api.pageplace.de/preview/DT0400.9781351726221_A37406780/preview-9781351726221_A37406780.pdf; Penn State STAT 501 Regression Methods (online course notes), Lesson 5 §5.4 matrix formulation, least squares estimates b = (X'X)^-1 X'Y, linear dependence, sha256:c7eb1ac675fffa3493ca7644a47f8a36e96fa53d301d2f8191c7ac4ca82edec6 — https://online.stat.psu.edu/stat501/Lesson05.html
- note: No findings. Every formula and condition matches ISLR 2nd ed. and Rodríguez Ch.2; the matrix results rest on rank-3 notes, hence medium.
