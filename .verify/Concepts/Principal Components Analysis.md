---
target: Concepts/Principal Components Analysis.md
created: 2026-10-05
---

## [F-001] PC1 score called 'the average' of the predictors
- entry_type: finding
- author: agent:validate-v1
- run_id: 2026-10-04T20:47Z/8861
- date: 2026-10-05
- severity: minor
- status: open
- locus: example 'Computing the First Principal Component', answer, last sentence
- claim: z_1i = 0.707 x_1i + 0.707 x_2i is the average of the two standardized predictors.
- evidence: James, Witten, Hastie & Tibshirani, An Introduction to Statistical Learning with Applications in R, 2nd ed. (Springer 2021, CAS-hosted copy) eqs. 12.2-12.3 (PDF p.506), sha256:f708349f34d2b345a40766f7b4830d22c1bcbf90b4194ae603dcd1245b4e975f — https://www.casact.org/sites/default/files/2022-12/James-G.-et-al.-2nd-edition-Springer-2021.pdf: scores are z_i1 = sum_j phi_j1 x_ij with sum_j phi_j1^2 = 1. Recomputed (rank 5): eigenvalues of S = [[1, 0.6],[0.6, 1]] are 1.6 and 0.4 with phi_1 = (1/sqrt2, 1/sqrt2) and PVE_1 = 0.80 - all as stated - but 0.707 x1 + 0.707 x2 = sqrt2 x (x1 + x2)/2, i.e. 1.414 times the average. The score is proportional to the average, not equal to it; a score computed as the plain average is off by sqrt2.
- source_rank: 2
- proposed_action: Say 'is proportional to (sqrt2 times) the average'. Not applied.
- applied: false
- fingerprint: 28694b35294d

## [F-002] MAS-I sense (principal components regression) absent
- entry_type: finding
- author: agent:validate-v1
- run_id: 2026-10-04T20:47Z/8861
- date: 2026-10-05
- severity: minor
- status: open
- locus: whole page (scope); bullet 'Used for dimensionality reduction before fitting models'
- claim: PCA is presented only as an unsupervised technique (ISLR Ch 12); its regression use is one unlinked bullet.
- evidence: CAS Exam MAS-I Content Outline 2026 (MASI_CO_2026_F v06) (PDF p.6, sha256:245892366dea073ff44e89b3ac2ae1401517b127d36d51c8a1198b3185faa2ed — https://www.casact.org/sites/default/files/2026-06/MASI_ContentOutline_2026.pdf) assigns James Ch 6 in full; James, Witten, Hastie & Tibshirani, An Introduction to Statistical Learning with Applications in R, 2nd ed. (Springer 2021, CAS-hosted copy) §6.3.1 (PDF p.261), sha256:f708349f34d2b345a40766f7b4830d22c1bcbf90b4194ae603dcd1245b4e975f — https://www.casact.org/sites/default/files/2022-12/James-G.-et-al.-2nd-edition-Springer-2021.pdf, uses PCA 'as a dimension reduction technique for regression' (PCR: regress on the first M score vectors, M chosen by cross-validation - ISLR p.516), with PLS (§6.3.2) as the supervised alternative. CAS Exam MAS-II Content Outline 2026 (PDF p.4, sha256:babf0548b7d674e02d2cffdaee11e5063f8e8c03b3461b8ba2bdfdbc0f90ea1b — https://www.casact.org/sites/default/files/2026-01/MASII_Content_Outlines_2026.pdf) assigns Ch 12, the page's sense. Concepts/ has no Principal Components Regression or Partial Least Squares page, and MAS-I questions masi-2019f-028 (PCR) and masi-2019s-037 (PCR/PLS) link this page. Content is correct for MAS-II; the MAS-I sense (PCR, M as a CV-chosen tuning parameter, directions chosen without Y vs PLS) is missing. Flagged, not reconciled.
- source_rank: 1
- proposed_action: Add a short PCR/PLS paragraph, or create PCR/PLS concept pages and link them. Authoring - not applied.
- applied: false
- fingerprint: 81e1de006f53

## [C-001] Validation pass — verified
- entry_type: comment
- author: agent:validate-v1
- run_id: 2026-10-04T20:47Z/8861
- date: 2026-10-05
- status_set: verified
- confidence: medium
- checks_run: page read in full, no prior log; exam pages linking it: MAS-II (tasks 8-9) - also 4 MAS-I questions; arg-max with unit norm against ISLR 12.3; PVE_m = lambda_m/sum lambda_j against eq. 12.10 + footnote 2 (variances are eigenvalues); orthogonality, scaling (PDF pp.513-514), scree/elbow (PDF p.515) against ISLR; example recomputed (eigenvalues 1.6/0.4, PVE 0.80); link and figure embed resolve
- sources_checked: James, Witten, Hastie & Tibshirani, An Introduction to Statistical Learning with Applications in R, 2nd ed. (Springer 2021, CAS-hosted copy), §6.3.1 PCR (PDF p.261), §12.2.1-12.2.4 eqs. 12.1-12.10, footnote 2, scaling, sign, scree plot/elbow (PDF pp.505-516), sha256:f708349f34d2b345a40766f7b4830d22c1bcbf90b4194ae603dcd1245b4e975f — https://www.casact.org/sites/default/files/2022-12/James-G.-et-al.-2nd-edition-Springer-2021.pdf; CAS Exam MAS-I Content Outline 2026 (MASI_CO_2026_F v06), James reading list (PDF p.6), sha256:245892366dea073ff44e89b3ac2ae1401517b127d36d51c8a1198b3185faa2ed — https://www.casact.org/sites/default/files/2026-06/MASI_ContentOutline_2026.pdf; CAS Exam MAS-II Content Outline 2026, Domain C tasks 5-6 (PDF p.3), James reading list (PDF p.4), sha256:babf0548b7d674e02d2cffdaee11e5063f8e8c03b3461b8ba2bdfdbc0f90ea1b — https://www.casact.org/sites/default/files/2026-01/MASII_Content_Outlines_2026.pdf
- note: Notation, not error: ISLR takes eigenvectors of X^T X (centred X), the page of S - same vectors; ISLR's scree plot is PVE vs m, the page's lambda_m vs m - same shape. Two minor findings open (score 'is the average'; PCR sense missing).
