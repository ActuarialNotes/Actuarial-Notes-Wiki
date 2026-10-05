---
target: Concepts/Polynomial Regression.md
created: 2026-10-05
---

## [C-001] Validation pass — verified
- entry_type: comment
- author: agent:validate-v1
- run_id: 2026-10-04T20:47Z/8861
- date: 2026-10-05
- status_set: verified
- confidence: high
- checks_run: Checked against ISLR2 Ch 7 text read this session: (7.1) model, least squares on x..x^d, d > 3 or 4 unusual, strange shapes near the boundary, Var fhat(x0) = l0' C l0 (footnote 1, stated there for d = 4; the page's general-d l0 is the same construction), +/-2 SE approx. 95% band under normal errors, coefficients not of interest, logistic polynomial (7.3) for wage > 250, global structure vs step functions, basis b_j = x^j and inference tools (7.7), degree-15 polynomial vs natural cubic spline with 15 df (§7.4.5/Fig 7.7), use in GAMs. Both examples recomputed in python before reading the answers: fhat(5) = 7.2, l0'Cl0 = 0.040, SE 0.20, band (6.8, 7.6); the C matrix is positive definite; p(30) = 0.0356, p(50) = 0.0759. All match. 7 links resolve; LaTeX balanced.
- sources_checked: James, Witten, Hastie & Tibshirani, An Introduction to Statistical Learning with Applications in R (2nd ed., Springer 2021), §7.1 'Polynomial Regression', eqs (7.1)-(7.3) and footnote 1, printed pp.290-292 (PDF pp.298-300); §7.2 opening, printed p.292; §7.3 eq (7.7), printed p.294 (PDF p.302); §7.4.5 and Fig 7.7, printed pp.300-301 (PDF pp.308-309); §7.7.1 building blocks, printed p.309 (PDF p.317), sha256:f708349f34d2b345a40766f7b4830d22c1bcbf90b4194ae603dcd1245b4e975f — https://www.casact.org/sites/default/files/2022-12/James-G.-et-al.-2nd-edition-Springer-2021.pdf; CAS Exam MAS-I Content Outline 2026 (MASI_CO_2026_F v06), reading list p.6 (James et al. Chapters 5, 6 and 7 assigned to tasks C1-C9), sha256:245892366dea073ff44e89b3ac2ae1401517b127d36d51c8a1198b3185faa2ed — https://www.casact.org/sites/default/files/2026-06/MASI_ContentOutline_2026.pdf
- note: Clean pass against the syllabus reading.
