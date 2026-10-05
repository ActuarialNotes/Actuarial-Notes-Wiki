---
target: Concepts/Step Function.md
created: 2026-10-05
---

## [C-001] Validation pass — verified
- entry_type: comment
- author: agent:validate-v1
- run_id: 2026-10-04T20:47Z/8861
- date: 2026-10-05
- status_set: verified
- confidence: high
- checks_run: Checked against ISLR2 text read this session: cutpoints c1..cK and K+1 indicators (7.4), the indicators sum to 1, C0 dropped as redundant with the intercept (footnote 2, including the three-level/two-dummy analogy, the arbitrary choice and the no-intercept alternative), (7.5) model and the interpretation of beta0 and beta_j, logistic version (7.6), 'miss the action', the first-bin wage example, biostatistics/epidemiology and 5-year age groups, basis b_j = I(c_j <= x < c_{j+1}), degree-0 piecewise polynomial, a qualitative predictor in a GAM. Both examples recomputed in python before reading the answers: 4 indicators / 3 enter; 0.18, 0.11, 0.09, 0.13; beta2 interpretation; bin means 5, 8, 12 so beta = (5, 3, 7), confirmed by lstsq. All match. 6 links resolve; LaTeX balanced.
- sources_checked: James, Witten, Hastie & Tibshirani, An Introduction to Statistical Learning with Applications in R (2nd ed., Springer 2021), §7.2 'Step Functions', eqs (7.4)-(7.6) and footnote 2, printed pp.292-294 (PDF pp.300-302); §7.3 eq (7.7), printed p.294; §7.4.1 'piecewise polynomials of degree 0', printed p.295 (PDF p.303); §7.7.1 Fig 7.11 caption (education as a step function), printed p.308 (PDF p.316), sha256:f708349f34d2b345a40766f7b4830d22c1bcbf90b4194ae603dcd1245b4e975f — https://www.casact.org/sites/default/files/2022-12/James-G.-et-al.-2nd-edition-Springer-2021.pdf; CAS Exam MAS-I Content Outline 2026 (MASI_CO_2026_F v06), reading list p.6 (James et al. Chapters 5, 6 and 7 assigned to tasks C1-C9), sha256:245892366dea073ff44e89b3ac2ae1401517b127d36d51c8a1198b3185faa2ed — https://www.casact.org/sites/default/files/2026-06/MASI_ContentOutline_2026.pdf
- note: Clean pass against the syllabus reading.
