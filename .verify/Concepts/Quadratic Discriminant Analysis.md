---
target: Concepts/Quadratic Discriminant Analysis.md
created: 2026-10-05
---

## [C-001] Validation pass — verified
- entry_type: comment
- author: agent:validate-v1
- run_id: 2026-10-04T20:47Z/8861
- date: 2026-10-05
- status_set: verified
- confidence: high
- checks_run: class-specific N(mu_k, Sigma_k), discriminant function against ISLR eq.4.28 (p=1 form derived from it: -1/2 ln sigma_k^2 = -ln sigma_k), quadratic-in-x naming, per-class p(p+1)/2 and total Kp(p+1)/2 covariance parameters, LDA lower variance / QDA for large training sets or untenable common covariance, naive-Bayes-as-diagonal-QDA: ISLR 4.4.3-4.4.4; exam-scope bullet against the 2026 outline wording; both examples recomputed in python before reading answers (x=8.5: 0.088 vs -2.764 attritional; x=6.0: -7.412 vs -4.708 complex; boundaries 6.463 and 9.287; 55 vs 165 covariance params, 30 means, 2 priors) - all agree; 3 links resolve; no exam page links this page
- sources_checked: James, Witten, Hastie & Tibshirani, An Introduction to Statistical Learning, 2nd ed. (Springer 2021; MAS-I reading), sha256:f708349f34d2b345a40766f7b4830d22c1bcbf90b4194ae603dcd1245b4e975f — https://www.casact.org/sites/default/files/2022-12/James-G.-et-al.-2nd-edition-Springer-2021.pdf, sec.4.4.3 Quadratic Discriminant Analysis, eq.4.28, p(p+1)/2 and Kp(p+1)/2 parameter counts, LDA-vs-QDA bias-variance (printed pp.152-153, PDF pp.162-163); sec.4.4.4 diagonal-covariance remark (printed p.155, PDF p.165); CAS Exam MAS-I Content Outline 2026 (MASI_CO_2026_F v06), readings table (PDF p.6), sha256:245892366dea073ff44e89b3ac2ae1401517b127d36d51c8a1198b3185faa2ed — https://www.casact.org/sites/default/files/2026-06/MASI_ContentOutline_2026.pdf: James et al. Ch.4 'Sections 4.1 through 4.4; the Linear Discrimination Analysis portion of Section 4.4 will not be tested'
- note: Clean pass. Formulas, counts and the scope statement match ISLR 4.4.3 (rank 2) and the 2026 MAS-I outline (rank 1).
