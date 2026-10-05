---
target: Concepts/Statistical Learning.md
created: 2026-10-05
---

## [F-001] Clustering labelled 'Density-based'
- entry_type: finding
- author: agent:validate-v1
- run_id: 2026-10-04T20:47Z/8861
- date: 2026-10-05
- severity: minor
- status: open
- locus: table 'Key methods covered in MAS-II', Clustering row, Type column
- claim: Clustering | Density-based | Unsupervised
- evidence: James, Witten, Hastie & Tibshirani, An Introduction to Statistical Learning with Applications in R, 2nd ed. (Springer 2021, CAS-hosted copy) §12.4 (PDF pp.522-523), sha256:f708349f34d2b345a40766f7b4830d22c1bcbf90b4194ae603dcd1245b4e975f — https://www.casact.org/sites/default/files/2022-12/James-G.-et-al.-2nd-edition-Springer-2021.pdf, covers K-means (partition into K prespecified clusters) and hierarchical clustering; 'density' does not occur in Ch 12 (full-text hits are survival-chapter densities only). CAS Exam MAS-II Content Outline 2026 Domain C task 7 (PDF p.3, sha256:babf0548b7d674e02d2cffdaee11e5063f8e8c03b3461b8ba2bdfdbc0f90ea1b — https://www.casact.org/sites/default/files/2026-01/MASII_Content_Outlines_2026.pdf): 'clustering procedures (e.g., K-means, hierarchical)'. Neither method is density-based (that family - e.g. DBSCAN - is not on the syllabus); the vault's own Clustering page calls them partition-based and hierarchical.
- source_rank: 1
- proposed_action: Change the Type cell to 'K-means / hierarchical' (the outline's words). Not applied.
- applied: false
- fingerprint: d80209b731e4

## [F-002] Page covers only the MAS-II sense, but 17 MAS-I questions link it
- entry_type: finding
- author: agent:validate-v1
- run_id: 2026-10-04T20:47Z/8861
- date: 2026-10-05
- severity: minor
- status: open
- locus: table heading 'Key methods covered in MAS-II' and the KNN example
- claim: Key methods covered in MAS-II: KNN, Decision Tree, Tree Ensemble, PCA, Clustering, Neural Network; example: bias-variance for KNN with K=1 vs K=100.
- evidence: CAS Exam MAS-I Content Outline 2026 (MASI_CO_2026_F v06) (PDF p.6, sha256:245892366dea073ff44e89b3ac2ae1401517b127d36d51c8a1198b3185faa2ed — https://www.casact.org/sites/default/files/2026-06/MASI_ContentOutline_2026.pdf) assigns James Ch 1, 2 (excluding §2.2.3), 3 (§§3.1-3.3), 4 (§§4.1-4.4), 5, 6, 7; CAS Exam MAS-II Content Outline 2026 (PDF p.4, sha256:babf0548b7d674e02d2cffdaee11e5063f8e8c03b3461b8ba2bdfdbc0f90ea1b — https://www.casact.org/sites/default/files/2026-01/MASII_Content_Outlines_2026.pdf) assigns Ch 1, 2.2, 4.4.2, 8, 10, 12. Seventeen MAS-I questions (masi-2018f-033/036/037/039/040, masi-2018s-030/031/034/035/036/038, masi-2019f-028/038, masi-2019s-028/038/040, masi-sample-004) link this page, many on splines/GAMs and the bias-variance trade-off (ISLR Ch 7, §2.2.2), yet the page names none of MAS-I's methods (linear and logistic regression, CV/bootstrap, subset selection, ridge/lasso, PCR/PLS, polynomial/step/spline/local regression, GAMs), and its only example is from §2.2.3 (ISLR PDF pp.50-52, Fig. 2.16), which MAS-I excludes. The MAS-II table itself matches the 2026 MAS-II tasks (PDF p.3) apart from the Clustering type. No spline/GAM concept page exists to take those links. Flagged, not reconciled.
- source_rank: 1
- proposed_action: Add a MAS-I section (James Ch 2-7 methods) with an example on the MAS-I side, or create spline/GAM pages and re-point those questions. Authoring - not applied.
- applied: false
- fingerprint: 37aa6846338c

## [C-001] Validation pass — verified
- entry_type: comment
- author: agent:validate-v1
- run_id: 2026-10-04T20:47Z/8861
- date: 2026-10-05
- status_set: verified
- confidence: medium
- checks_run: page read in full, no prior log; exam pages linking it: MAS-II (framework), DISC-DA (data modeling techniques) - and 17 MAS-I questions; Y = f(X)+e against eq. 2.1; decomposition against eq. 2.7 (page writes it unconditionally, ISLR at x0 - notation); supervised/unsupervised, prediction/inference, under/overfitting against §2.1-2.2; MAS-II method table against the 2026 MAS-II tasks; KNN example against Fig. 2.16; links (8) and figure embed resolve
- sources_checked: James, Witten, Hastie & Tibshirani, An Introduction to Statistical Learning with Applications in R, 2nd ed. (Springer 2021, CAS-hosted copy), §2.1 eq. 2.1, §2.1.1 prediction vs inference (PDF p.28), §2.1.2 parametric vs non-parametric (PDF p.34), §2.1.4 (PDF p.37), §2.2.2 eq. 2.7 (PDF p.45), §2.2.3 KNN K=1 vs K=100 (PDF pp.50-52), §12.4 (PDF pp.522-523), sha256:f708349f34d2b345a40766f7b4830d22c1bcbf90b4194ae603dcd1245b4e975f — https://www.casact.org/sites/default/files/2022-12/James-G.-et-al.-2nd-edition-Springer-2021.pdf; CAS Exam MAS-I Content Outline 2026 (MASI_CO_2026_F v06), James reading list (PDF p.6), sha256:245892366dea073ff44e89b3ac2ae1401517b127d36d51c8a1198b3185faa2ed — https://www.casact.org/sites/default/files/2026-06/MASI_ContentOutline_2026.pdf; CAS Exam MAS-II Content Outline 2026, Domain C tasks (PDF p.3) and James reading list (PDF p.4), sha256:babf0548b7d674e02d2cffdaee11e5063f8e8c03b3461b8ba2bdfdbc0f90ea1b — https://www.casact.org/sites/default/files/2026-01/MASII_Content_Outlines_2026.pdf
- note: Correct in the MAS-II sense apart from the Clustering 'Density-based' label. DISC-DA sense not checked (The Institutes' course text is not published). Two minor findings open.
