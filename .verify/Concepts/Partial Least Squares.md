---
target: Concepts/Partial Least Squares.md
created: 2026-10-05
---

## [C-001] Validation pass — verified
- entry_type: comment
- author: agent:validate-v1
- run_id: 2026-10-04T20:47Z/8861
- date: 2026-10-05
- status_set: verified
- confidence: high
- checks_run: Checked against ISLR2 §6.3.2 text read this session: supervised dimension reduction, first direction phi_j1 = simple-regression coefficient of Y on Xj (formula matches eq 3.4, rendered as an image), proportional to correlation, later directions from residuals after regressing each variable on Z1, M by CV, standardise predictors and response, chemometrics, often no better than ridge/PCR, bias/variance 'a wash'. The bullet 'first PLS direction fits the predictors less closely than PC1 but explains the response better' is ISLR's statement about Fig 6.21, stated generally on the page. It holds in general: PC1 is by definition the closest line, and in-sample R^2 of PLS1 >= PC1 (rank-5 proof), so no finding. Worked example recomputed in python before reading the answer: predictors standardised (mean 0, mean square 1), phi = (1.0, 2.2), z = (-4.08, -0.56, 0.56, 4.08), theta1 = 23.36/33.92 = 0.6887, theta0 = 5, fhat_4 = 7.81; r = 0.98 vs 0.45 (ratio 2.2), predictor correlation 0.6, PC1 = (0.707, 0.707). All match. True/false example: I only, matches ISLR. 9 links resolve; LaTeX balanced.
- sources_checked: James, Witten, Hastie & Tibshirani, An Introduction to Statistical Learning with Applications in R (2nd ed., Springer 2021), §6.3.2 'Partial Least Squares', printed pp.259-261 (PDF pp.267-269), and §6.3.1 for the PCR comparison, printed pp.256-259 (PDF pp.264-267); eq (3.4) simple-regression slope, printed p.62 (PDF p.72), sha256:f708349f34d2b345a40766f7b4830d22c1bcbf90b4194ae603dcd1245b4e975f — https://www.casact.org/sites/default/files/2022-12/James-G.-et-al.-2nd-edition-Springer-2021.pdf; CAS Exam MAS-I Content Outline 2026 (MASI_CO_2026_F v06), reading list p.6 (James et al. Chapters 5, 6 and 7 assigned to tasks C1-C9), sha256:245892366dea073ff44e89b3ac2ae1401517b127d36d51c8a1198b3185faa2ed — https://www.casact.org/sites/default/files/2026-06/MASI_ContentOutline_2026.pdf
- note: Clean pass against the syllabus reading.
