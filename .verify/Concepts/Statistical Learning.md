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

## [F-001/R] Correction applied
- entry_type: resolution
- author: agent:validate-v1
- run_id: 2026-10-04T21:11Z/3707
- date: 2026-10-05
- resolves: F-001
- status: resolved
- note: Clustering row's Type cell changed from 'Density-based' to 'K-means / hierarchical', the outline's own words. Sources: CAS Exam MAS-II Content Outline 2026, Domain C tasks (PDF p.3) and James reading list (PDF p.4), sha256:babf0548b7d674e02d2cffdaee11e5063f8e8c03b3461b8ba2bdfdbc0f90ea1b — https://www.casact.org/sites/default/files/2026-01/MASII_Content_Outlines_2026.pdf (task 7: 'clustering procedures (e.g., K-means, hierarchical)'); James, Witten, Hastie & Tibshirani, An Introduction to Statistical Learning with Applications in R, 2nd ed. (Springer 2021, CAS-hosted copy) §12.4 (PDF pp.522-523, K-means and hierarchical clustering), sha256:f708349f34d2b345a40766f7b4830d22c1bcbf90b4194ae603dcd1245b4e975f — https://www.casact.org/sites/default/files/2022-12/James-G.-et-al.-2nd-edition-Springer-2021.pdf.

## [F-002/R] Correction applied
- entry_type: resolution
- author: agent:validate-v1
- run_id: 2026-10-04T21:11Z/3707
- date: 2026-10-05
- resolves: F-002
- status: resolved
- note: The 'Key methods covered in MAS-II' table is now a 'Methods by exam' section labelled from the 2026 outlines. New MAS-I table (James Ch 1, 2 excl. §2.2.3, 3 §§3.1-3.3, 4 §§4.1-4.4, 5, 6, 7), one row per chapter with ISLR's chapter titles: Linear Regression (Ch 3); Logistic Regression (Ch 4); Cross-Validation, Bootstrap (Ch 5 Resampling Methods); Variable Selection (subset selection), Regularization (ridge, lasso), Principal Components Regression, Partial Least Squares, High-Dimensional Data (Ch 6); Polynomial Regression, Step Function, Regression Spline, Smoothing Spline, Local Regression, Generalized Additive Model (Ch 7; GAMs also classification, §7.7.2) - each linking an existing page. The MAS-II table is kept under 'MAS-II - James Ch 1, §2.2, §4.4.2, Ch 8, 10 and 12'. The KNN example is relabelled '(MAS-II)', and a MAS-I example added: smoothing spline with lambda = 0 (interpolates, low bias/high variance) vs lambda -> infinity (least squares line, high bias/low variance), lambda chosen by cross-validation. Sources: CAS Exam MAS-I Content Outline 2026 (MASI_CO_2026_F v06), James reading list (PDF p.6), sha256:245892366dea073ff44e89b3ac2ae1401517b127d36d51c8a1198b3185faa2ed — https://www.casact.org/sites/default/files/2026-06/MASI_ContentOutline_2026.pdf; CAS Exam MAS-II Content Outline 2026, Domain C tasks (PDF p.3) and James reading list (PDF p.4), sha256:babf0548b7d674e02d2cffdaee11e5063f8e8c03b3461b8ba2bdfdbc0f90ea1b — https://www.casact.org/sites/default/files/2026-01/MASII_Content_Outlines_2026.pdf; James, Witten, Hastie & Tibshirani, An Introduction to Statistical Learning with Applications in R, 2nd ed. (Springer 2021, CAS-hosted copy) chapter titles (PDF contents and TOC), §2.2.2 (PDF pp.45-46: 'more flexible statistical methods have higher variance'; 'more flexible methods result in less bias'), §7.5.1 (PDF p.310: lambda = 0 'will exactly interpolate the training observations'; lambda -> infinity 'g will be the linear least squares line'; 'lambda controls the bias-variance trade-off'), §7.5.2 (PDF p.311: choose lambda by cross-validation), sha256:f708349f34d2b345a40766f7b4830d22c1bcbf90b4194ae603dcd1245b4e975f — https://www.casact.org/sites/default/files/2022-12/James-G.-et-al.-2nd-edition-Springer-2021.pdf.

## [C-002] Validation pass — verified
- entry_type: comment
- author: agent:validate-v1
- run_id: 2026-10-04T21:11Z/3707
- date: 2026-10-05
- status_set: verified
- confidence: high
- checks_run: re-pass after run-3707 resolutions of F-001/F-002: whole log read; every edit re-read: Clustering type 'K-means / hierarchical' vs MAS-II task 7; MAS-I and MAS-II chapter scopes vs both 2026 reading lists; MAS-I table's chapter titles vs ISLR bookmarks, row placement (Ch 5 CV/bootstrap, Ch 6 incl. §6.4 high dimensions, Ch 7 incl. §7.7.2 GAM classification); smoothing-spline example vs §7.5.1-7.5.2 and flexibility vs bias/variance §2.2.2; unchanged claims (eq. 2.1, eq. 2.7 decomposition, supervised/unsupervised, prediction/inference, KNN K=1 vs K=100) re-read; 21 wiki links and the figure embed resolve
- sources_checked: James, Witten, Hastie & Tibshirani, An Introduction to Statistical Learning with Applications in R, 2nd ed. (Springer 2021, CAS-hosted copy), contents/bookmarks (chapter titles 1-12, §6.4, §7.5, §7.7), §2.1 eq. 2.1, §2.1.1 (PDF p.28), §2.1.4 (PDF p.37), §2.2.2 eq. 2.7 and flexibility vs bias/variance (PDF pp.45-46), §2.2.3 KNN (PDF pp.50-52), §5.1 test error and §5.2 bootstrap standard errors (PDF pp.206-207, 218), §7.5.1 lambda = 0 interpolates / lambda -> inf least squares line / bias-variance (PDF p.310), §7.5.2 lambda by cross-validation (PDF p.311), §7.7.2 GAMs for classification (PDF p.318), §12.4 (PDF pp.522-523), sha256:f708349f34d2b345a40766f7b4830d22c1bcbf90b4194ae603dcd1245b4e975f — https://www.casact.org/sites/default/files/2022-12/James-G.-et-al.-2nd-edition-Springer-2021.pdf; CAS Exam MAS-I Content Outline 2026 (MASI_CO_2026_F v06), James reading list Ch 1, 2 excl. §2.2.3, 3 §§3.1-3.3, 4 §§4.1-4.4, 5, 6, 7 (PDF p.6), sha256:245892366dea073ff44e89b3ac2ae1401517b127d36d51c8a1198b3185faa2ed — https://www.casact.org/sites/default/files/2026-06/MASI_ContentOutline_2026.pdf; CAS Exam MAS-II Content Outline 2026 (MASII_CO_S_2026 v06), Domain C tasks 1-11 (PDF p.3) and James reading list Ch 1, 2.2, 4.4.2, 8, 10, 12 (PDF p.4), sha256:babf0548b7d674e02d2cffdaee11e5063f8e8c03b3461b8ba2bdfdbc0f90ea1b — https://www.casact.org/sites/default/files/2026-01/MASII_Content_Outlines_2026.pdf
- note: Notation only: the page writes the eq. 2.7 decomposition unconditionally, ISLR at a test point x0. The DISC-DA exam page also links this page; its course text is unpublished, so that usage is not checked.

## [F-003] MAS-I table's Ch 4 row omits QDA and naive Bayes
- entry_type: finding
- author: agent:validate-v1
- run_id: 2026-10-04T21:11Z/3707
- date: 2026-10-05
- severity: minor
- status: open
- locus: 'Methods by exam' MAS-I table, row '4 Classification' (written by F-002/R)
- claim: | [[Logistic Regression]] | 4 Classification | Classification |
- evidence: CAS Exam MAS-I Content Outline 2026 (MASI_CO_2026_F v06), James reading list (PDF p.6), sha256:245892366dea073ff44e89b3ac2ae1401517b127d36d51c8a1198b3185faa2ed — https://www.casact.org/sites/default/files/2026-06/MASI_ContentOutline_2026.pdf: James 'Chapters ... 4 (Sections 4.1 through 4.4; the Linear Discrimination Analysis portion of Section 4.4 will not be tested)'. James, Witten, Hastie & Tibshirani, An Introduction to Statistical Learning with Applications in R, 2nd ed. (Springer 2021, CAS-hosted copy) §4.4.3 Quadratic Discriminant Analysis and §4.4.4 Naive Bayes (PDF pp.162-163; bookmarks), sha256:f708349f34d2b345a40766f7b4830d22c1bcbf90b4194ae603dcd1245b4e975f — https://www.casact.org/sites/default/files/2022-12/James-G.-et-al.-2nd-edition-Springer-2021.pdf, sit inside §4.4, so both classifiers are MAS-I methods; the row names logistic regression only. Same gap found on Concepts/Supervised Learning.md (its F-004). Concept pages for both exist.
- source_rank: 1
- proposed_action: Add [[Quadratic Discriminant Analysis]] and [[Naive Bayes]] to the row.
- applied: true
- fingerprint: 3163132485ab

## [F-003/R] Correction applied
- entry_type: resolution
- author: agent:validate-v1
- run_id: 2026-10-04T21:11Z/3707
- date: 2026-10-05
- resolves: F-003
- status: resolved
- note: Ch 4 row now reads '| [[Logistic Regression]], [[Quadratic Discriminant Analysis]], [[Naive Bayes]] | 4 Classification | Classification |' (LDA left out, as the outline excludes it from testing). Sources: CAS Exam MAS-I Content Outline 2026 (MASI_CO_2026_F v06), James reading list (PDF p.6), sha256:245892366dea073ff44e89b3ac2ae1401517b127d36d51c8a1198b3185faa2ed — https://www.casact.org/sites/default/files/2026-06/MASI_ContentOutline_2026.pdf; James, Witten, Hastie & Tibshirani, An Introduction to Statistical Learning with Applications in R, 2nd ed. (Springer 2021, CAS-hosted copy) §4.4.3-4.4.4 (PDF pp.162-163), sha256:f708349f34d2b345a40766f7b4830d22c1bcbf90b4194ae603dcd1245b4e975f — https://www.casact.org/sites/default/files/2022-12/James-G.-et-al.-2nd-edition-Springer-2021.pdf. Both links resolve.

## [C-003] Validation pass — verified
- entry_type: comment
- author: agent:validate-v1
- run_id: 2026-10-04T21:11Z/3707
- date: 2026-10-05
- status_set: verified
- confidence: high
- checks_run: second run-3707 pass, superseding the one above it: F-003 (QDA and naive Bayes missing from the MAS-I Ch 4 row) applied and resolved after the first re-pass; the changed row re-read against the outline and ISLR §4.4; the rest of the page unchanged since the first re-pass (all run-3707 edits re-read there); 23 wiki links and the figure embed resolve
- sources_checked: James, Witten, Hastie & Tibshirani, An Introduction to Statistical Learning with Applications in R, 2nd ed. (Springer 2021, CAS-hosted copy), contents/bookmarks (chapter titles, §4.4.3-4.4.4, §6.4, §7.5, §7.7), §2.1 eq. 2.1, §2.1.1 (PDF p.28), §2.1.4 (PDF p.37), §2.2.2 eq. 2.7 and flexibility vs bias/variance (PDF pp.45-46), §2.2.3 KNN (PDF pp.50-52), §4.4.3-4.4.4 (PDF pp.162-163), §5.1/§5.2 (PDF pp.206-207, 218), §7.5.1-7.5.2 (PDF pp.310-311), §7.7.2 (PDF p.318), §12.4 (PDF pp.522-523), sha256:f708349f34d2b345a40766f7b4830d22c1bcbf90b4194ae603dcd1245b4e975f — https://www.casact.org/sites/default/files/2022-12/James-G.-et-al.-2nd-edition-Springer-2021.pdf; CAS Exam MAS-I Content Outline 2026 (MASI_CO_2026_F v06), James reading list Ch 1, 2 excl. §2.2.3, 3 §§3.1-3.3, 4 §§4.1-4.4 (LDA not tested), 5, 6, 7 (PDF p.6), sha256:245892366dea073ff44e89b3ac2ae1401517b127d36d51c8a1198b3185faa2ed — https://www.casact.org/sites/default/files/2026-06/MASI_ContentOutline_2026.pdf; CAS Exam MAS-II Content Outline 2026 (MASII_CO_S_2026 v06), Domain C tasks 1-11 (PDF p.3) and James reading list (PDF p.4), sha256:babf0548b7d674e02d2cffdaee11e5063f8e8c03b3461b8ba2bdfdbc0f90ea1b — https://www.casact.org/sites/default/files/2026-01/MASII_Content_Outlines_2026.pdf
- note: Supersedes this run's earlier pass on the page; the only change since is the Ch 4 row.

## [F-004] Tip says DISC-DA 10.2 links the page; it does not
- entry_type: finding
- author: agent:validate-v1
- run_id: 2026-10-10T21:00Z/dv02
- date: 2026-10-10
- severity: nit
- status: open
- locus: How it appears on the exam, DISC-DA bullet, last sentence
- claim: Section 10.2 links here for how regulation and professional codes bear on data modeling.
- evidence: Exam DISC-DA (CAS).md links [[Statistical Learning]] only from objectives 7.1 and 7.2; objective 10.2 links [[Predictive Analytics|Data Modeling]]. Rank 4 (vault cross-reference), consistency only; the syllabus PDF (DISC_DA.pdf, sha256:d4d823238bd55da3339a9a1ad682029c9a7aa9d4bcb0c18b319d499a00f6ba16) gives section titles only.
- source_rank: 4
- proposed_action: Delete the sentence.
- applied: true
- fingerprint: 1c0580cac10f

## [F-004/R] Correction applied
- entry_type: resolution
- author: agent:validate-v1
- run_id: 2026-10-10T21:00Z/dv02
- date: 2026-10-10
- resolves: F-004
- status: resolved
- note: Deleted the sentence in this run; the tip now cites only 7.1.

## [C-004] Validation pass — verified
- entry_type: comment
- author: agent:validate-v1
- run_id: 2026-10-10T21:00Z/dv02
- date: 2026-10-10
- status_set: verified
- confidence: high
- checks_run: delta check: diffed c6dc6efc9^ (last verified bytes, run 3707) to HEAD; additions are the 'Regression vs. Classification' block and the tip/trap callouts; each checked against ISLR §2.1.4-2.1.5 and §2.2; F-004 (wrong DISC section reference) applied; prior-pass sources re-fetched, hashes unchanged
- sources_checked: James, Witten, Hastie & Tibshirani, An Introduction to Statistical Learning, 2nd ed. (Springer 2021, CAS-hosted copy), §2.1.4-2.1.5 PDF pp.37-40 (delta: regression vs classification, logistic regression, KNN and boosting); prior-pass sections §2.1-2.2.3, §4.4.3-4.4.4, §5.1-5.2, §7.5, §7.7.2, §12.4, sha256:f708349f34d2b345a40766f7b4830d22c1bcbf90b4194ae603dcd1245b4e975f — https://www.casact.org/sites/default/files/2022-12/James-G.-et-al.-2nd-edition-Springer-2021.pdf; CAS Exam MAS-I Content Outline 2026 (MASI_CO_2026_F v06), James reading list PDF p.6, sha256:245892366dea073ff44e89b3ac2ae1401517b127d36d51c8a1198b3185faa2ed — https://www.casact.org/sites/default/files/2026-06/MASI_ContentOutline_2026.pdf; CAS Exam MAS-II Content Outline 2026, Domain C and James reading list PDF pp.3-4, sha256:babf0548b7d674e02d2cffdaee11e5063f8e8c03b3461b8ba2bdfdbc0f90ea1b — https://www.casact.org/sites/default/files/2026-01/MASII_Content_Outlines_2026.pdf
- note: Unchanged content carries run 3707's verification (same source bytes).
