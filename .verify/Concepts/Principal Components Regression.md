---
target: Concepts/Principal Components Regression.md
created: 2026-10-05
---

## [C-001] Validation pass — verified
- entry_type: comment
- author: agent:validate-v1
- run_id: 2026-10-04T20:47Z/8861
- date: 2026-10-05
- status_set: verified
- confidence: high
- checks_run: Every definition and formula checked against ISLR2 §6.3/6.3.1 text read this session: (6.16) Zm, (6.17) the theta-fit, (6.18) beta_j = sum theta_m phi_jm, the loadings and scores, unit-norm max-variance PC1, later PCs uncorrelated = perpendicular, M+1 vs p+1 coefficients, M = p with independent Zm = least squares, PCR assumption, not feature selection, closer to ridge, 'continuous version of PCR' quote, M by CV, U-shaped test MSE, standardise unless same units, when PCR does well. Both worked examples recomputed in python before reading the answers (z1 = 1.5, yhat = 15.75, beta = (2.0, 1.5); 7 coefficients, all 40 predictors, M = 40 = least squares): all match. 7 wiki links resolve to Concepts/; no embeds; LaTeX delimiters balanced. No exam page links this page yet.
- sources_checked: James, Witten, Hastie & Tibshirani, An Introduction to Statistical Learning with Applications in R (2nd ed., Springer 2021), §6.3 intro and §6.3.1 'Principal Components Regression', eqs (6.16)-(6.20), printed pp.251-259 (PDF pp.259-267); §6.2.2 'the lasso performs variable selection', printed p.242 (PDF p.250), sha256:f708349f34d2b345a40766f7b4830d22c1bcbf90b4194ae603dcd1245b4e975f — https://www.casact.org/sites/default/files/2022-12/James-G.-et-al.-2nd-edition-Springer-2021.pdf; CAS Exam MAS-I Content Outline 2026 (MASI_CO_2026_F v06), reading list p.6 (James et al. Chapters 5, 6 and 7 assigned to tasks C1-C9), sha256:245892366dea073ff44e89b3ac2ae1401517b127d36d51c8a1198b3185faa2ed — https://www.casact.org/sites/default/files/2026-06/MASI_ContentOutline_2026.pdf
- note: Clean pass against the syllabus reading. The page is on MAS-I via James Ch 6 (2026 outline).
