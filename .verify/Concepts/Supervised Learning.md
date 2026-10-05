---
target: Concepts/Supervised Learning.md
created: 2026-10-05
---

## [F-001] Training-loss argmin shown with no model class
- entry_type: finding
- author: agent:validate-v1
- run_id: 2026-10-04T20:47Z/8861
- date: 2026-10-05
- severity: minor
- status: open
- locus: formula block
- claim: Y = f(X) + e, f-hat = argmin_f sum_i L(y_i, f(x_i))
- evidence: James, Witten, Hastie & Tibshirani, An Introduction to Statistical Learning with Applications in R, 2nd ed. (Springer 2021, CAS-hosted copy) §2.1.2 (PDF pp.32-35), sha256:f708349f34d2b345a40766f7b4830d22c1bcbf90b4194ae603dcd1245b4e975f — https://www.casact.org/sites/default/files/2022-12/James-G.-et-al.-2nd-edition-Springer-2021.pdf, estimates f either by assuming a parametric form and fitting it (e.g. least squares) or non-parametrically under a smoothness requirement; §2.2.1 (PDF p.43) warns that 'the training MSE declines monotonically as flexibility increases' and that the goal is test MSE. The displayed argmin is over all f with no model class or penalty; read literally it interpolates the training data, contradicting the page's own third bullet. No source read states this formula. Y = f(X) + e itself is ISLR eq. 2.1.
- source_rank: 2
- proposed_action: Restrict the argmin to f in a chosen model class (or add a penalty), or drop it and keep Y = f(X) + e. Not applied.
- applied: false
- fingerprint: 7baf654660eb

## [F-002] 'Syllabus methods' lists MAS-II's methods only
- entry_type: finding
- author: agent:validate-v1
- run_id: 2026-10-04T20:47Z/8861
- date: 2026-10-05
- severity: minor
- status: open
- locus: bullet 2 ('Syllabus methods')
- claim: Syllabus methods: K-Nearest Neighbors, Decision Trees, Tree Ensembles (Bagging, Random Forest, Boosting), Neural Networks and the Generalized Linear Model.
- evidence: Matches CAS Exam MAS-II Content Outline 2026 Domain C tasks 1-4 and 9 (PDF p.3, sha256:babf0548b7d674e02d2cffdaee11e5063f8e8c03b3461b8ba2bdfdbc0f90ea1b — https://www.casact.org/sites/default/files/2026-01/MASII_Content_Outlines_2026.pdf) plus its GLM reading, but CAS Exam MAS-I Content Outline 2026 (MASI_CO_2026_F v06) (PDF p.6, sha256:245892366dea073ff44e89b3ac2ae1401517b127d36d51c8a1198b3185faa2ed — https://www.casact.org/sites/default/files/2026-06/MASI_ContentOutline_2026.pdf) assigns James Ch 3-7 - linear and logistic regression, subset selection, ridge/lasso, PCR/PLS, polynomial/spline/local regression, GAMs - none listed, and a MAS-I question (masi-2018s-035) links this page. 'Syllabus' does not say which exam. Flagged, not reconciled.
- source_rank: 1
- proposed_action: Say 'MAS-II syllabus methods', or add MAS-I's supervised methods. Not applied.
- applied: false
- fingerprint: 8bc1eba91591

## [C-001] Validation pass — verified
- entry_type: comment
- author: agent:validate-v1
- run_id: 2026-10-04T20:47Z/8861
- date: 2026-10-05
- status_set: verified
- confidence: medium
- checks_run: page read in full, no prior log; exam pages linking it: MAS-II (task 1, framework) - also 1 MAS-I and 2 MAS-II questions; regression vs classification, scoring by squared error / error rate / ROC-confusion matrix, test vs training error, CV, parametric vs non-parametric ('a very large number of observations', PDF p.34) against ISLR; example classifications (count regression, fraud classification, territory clustering) checked against §2.1.4-2.1.5; links (15) and figure embed resolve
- sources_checked: James, Witten, Hastie & Tibshirani, An Introduction to Statistical Learning with Applications in R, 2nd ed. (Springer 2021, CAS-hosted copy), §2.1 eq. 2.1, §2.1.2 (PDF pp.32-35), §2.1.4-2.1.5 (PDF pp.37-40), §2.2.1 eqs. 2.5-2.6 (PDF pp.40-43), §4.4.2 confusion matrix and ROC curve (PDF pp.158, 160), Ch 5 CV (PDF pp.206-215), sha256:f708349f34d2b345a40766f7b4830d22c1bcbf90b4194ae603dcd1245b4e975f — https://www.casact.org/sites/default/files/2022-12/James-G.-et-al.-2nd-edition-Springer-2021.pdf; CAS Exam MAS-II Content Outline 2026, Domain C tasks (PDF p.3), sha256:babf0548b7d674e02d2cffdaee11e5063f8e8c03b3461b8ba2bdfdbc0f90ea1b — https://www.casact.org/sites/default/files/2026-01/MASII_Content_Outlines_2026.pdf; CAS Exam MAS-I Content Outline 2026 (MASI_CO_2026_F v06), James reading list (PDF p.6), sha256:245892366dea073ff44e89b3ac2ae1401517b127d36d51c8a1198b3185faa2ed — https://www.casact.org/sites/default/files/2026-06/MASI_ContentOutline_2026.pdf
- note: Correct apart from the unrestricted argmin and the MAS-II-only methods list (two minor findings open).

## [F-001/R] Correction applied
- entry_type: resolution
- author: agent:validate-v1
- run_id: 2026-10-04T21:11Z/3707
- date: 2026-10-05
- resolves: F-001
- status: resolved
- note: Dropped the unrestricted training-loss argmin (no source states it, and read literally it interpolates the training data). The formula block is now ISLR's own pair, Y = f(X) + e and Y-hat = f-hat(X). Source: James, Witten, Hastie & Tibshirani, An Introduction to Statistical Learning with Applications in R, 2nd ed. (Springer 2021, CAS-hosted copy) §2.1 eq. 2.1 and §2.1.1 eq. 2.2 (PDF p.28: 'we can predict Y using Y-hat = f-hat(X)'), sha256:f708349f34d2b345a40766f7b4830d22c1bcbf90b4194ae603dcd1245b4e975f — https://www.casact.org/sites/default/files/2022-12/James-G.-et-al.-2nd-edition-Springer-2021.pdf. How f-hat is fitted stays in the parametric/non-parametric bullet (§2.1.2, PDF pp.32-35).

## [F-002/R] Correction applied
- entry_type: resolution
- author: agent:validate-v1
- run_id: 2026-10-04T21:11Z/3707
- date: 2026-10-05
- resolves: F-002
- status: resolved
- note: 'Syllabus methods' now names the exam for each method, per the 2026 outlines. MAS-I: Linear Regression, Logistic Regression and the Generalized Linear Model; subset selection (Variable Selection), ridge and lasso (Regularization), Principal Components Regression, Partial Least Squares; Polynomial Regression, Step Functions, Regression Splines, Smoothing Splines, Local Regression, Generalized Additive Models (James Ch 3-4, 6, 7 and the GLM readings). MAS-II: K-Nearest Neighbors, Decision Trees, Tree Ensembles (Bagging, Random Forest, Boosting), Neural Networks (James §2.2, Ch 8, 10). Every link resolves to an existing page. Sources: CAS Exam MAS-I Content Outline 2026 (MASI_CO_2026_F v06), Domain C task 2 (PDF p.5) and reading list (PDF p.6), sha256:245892366dea073ff44e89b3ac2ae1401517b127d36d51c8a1198b3185faa2ed — https://www.casact.org/sites/default/files/2026-06/MASI_ContentOutline_2026.pdf (task 2: 'appropriate link function and distribution for the dependent variable for GLM'; James Ch 1, 2 excl. §2.2.3, 3 §§3.1-3.3, 4 §§4.1-4.4, 5, 6, 7); CAS Exam MAS-II Content Outline 2026, Domain C tasks 1-4, 9 (PDF p.3) and James reading list (PDF p.4), sha256:babf0548b7d674e02d2cffdaee11e5063f8e8c03b3461b8ba2bdfdbc0f90ea1b — https://www.casact.org/sites/default/files/2026-01/MASII_Content_Outlines_2026.pdf; James, Witten, Hastie & Tibshirani, An Introduction to Statistical Learning with Applications in R, 2nd ed. (Springer 2021, CAS-hosted copy) contents (Ch 3, 4, 6, 7 section titles), sha256:f708349f34d2b345a40766f7b4830d22c1bcbf90b4194ae603dcd1245b4e975f — https://www.casact.org/sites/default/files/2022-12/James-G.-et-al.-2nd-edition-Springer-2021.pdf.

## [F-003] Two formulas side by side in one block
- entry_type: finding
- author: agent:validate-v1
- run_id: 2026-10-04T21:11Z/3707
- date: 2026-10-05
- severity: nit
- status: open
- locus: formula block
- claim: > $$Y = f(X) + \varepsilon, \qquad \hat{Y} = \hat{f}(X)$$ - eq. 2.1 and eq. 2.2 joined on one line with \qquad
- evidence: Formatting, not substance: both formulas are correct (James, Witten, Hastie & Tibshirani, An Introduction to Statistical Learning with Applications in R, 2nd ed. (Springer 2021, CAS-hosted copy) §2.1 eq. 2.1 and §2.1.1 eq. 2.2, PDF p.28, sha256:f708349f34d2b345a40766f7b4830d22c1bcbf90b4194ae603dcd1245b4e975f — https://www.casact.org/sites/default/files/2022-12/James-G.-et-al.-2nd-edition-Springer-2021.pdf), but the vault's concept-page rule (.claude/skills/actuarial-concept-definitions/SKILL.md, 'One expression per block; never place two formulas side by side ... with \qquad') wants them stacked for phone width. Found re-reading the run-3707 F-001 edit.
- source_rank: 2
- proposed_action: Split into two stacked > $$ blocks.
- applied: true
- fingerprint: 059f3074b968

## [F-003/R] Correction applied
- entry_type: resolution
- author: agent:validate-v1
- run_id: 2026-10-04T21:11Z/3707
- date: 2026-10-05
- resolves: F-003
- status: resolved
- note: Formula block split into two stacked blocks, Y = f(X) + e (ISLR eq. 2.1) and Y-hat = f-hat(X) (ISLR eq. 2.2); no symbol changed. Basis: James, Witten, Hastie & Tibshirani, An Introduction to Statistical Learning with Applications in R, 2nd ed. (Springer 2021, CAS-hosted copy) §2.1-2.1.1 (PDF p.28), sha256:f708349f34d2b345a40766f7b4830d22c1bcbf90b4194ae603dcd1245b4e975f — https://www.casact.org/sites/default/files/2022-12/James-G.-et-al.-2nd-edition-Springer-2021.pdf; vault layout rule in .claude/skills/actuarial-concept-definitions/SKILL.md ('The formula block').

## [F-004] MAS-I methods list omits QDA and naive Bayes
- entry_type: finding
- author: agent:validate-v1
- run_id: 2026-10-04T21:11Z/3707
- date: 2026-10-05
- severity: minor
- status: open
- locus: bullet 'Syllabus methods', MAS-I list (written by F-002/R)
- claim: MAS-I - Linear Regression, Logistic Regression and the Generalized Linear Model; ... (no classifier from ISLR §4.4)
- evidence: CAS Exam MAS-I Content Outline 2026 (MASI_CO_2026_F v06), James reading list (PDF p.6), sha256:245892366dea073ff44e89b3ac2ae1401517b127d36d51c8a1198b3185faa2ed — https://www.casact.org/sites/default/files/2026-06/MASI_ContentOutline_2026.pdf: James 'Chapters ... 4 (Sections 4.1 through 4.4; the Linear Discrimination Analysis portion of Section 4.4 will not be tested)'. James, Witten, Hastie & Tibshirani, An Introduction to Statistical Learning with Applications in R, 2nd ed. (Springer 2021, CAS-hosted copy) §4.4 'Generative Models for Classification' holds §4.4.3 Quadratic Discriminant Analysis and §4.4.4 Naive Bayes (PDF pp.162-163; bookmarks), sha256:f708349f34d2b345a40766f7b4830d22c1bcbf90b4194ae603dcd1245b4e975f — https://www.casact.org/sites/default/files/2022-12/James-G.-et-al.-2nd-edition-Springer-2021.pdf - so both classifiers are MAS-I methods, LDA excepted. The F-002 fix listed Ch 4 as logistic regression only. Concept pages Quadratic Discriminant Analysis and Naive Bayes exist. Found re-reading the run-3707 edit.
- source_rank: 1
- proposed_action: Add [[Quadratic Discriminant Analysis]] and [[Naive Bayes]] to the MAS-I list.
- applied: true
- fingerprint: ca42acc61f03

## [F-004/R] Correction applied
- entry_type: resolution
- author: agent:validate-v1
- run_id: 2026-10-04T21:11Z/3707
- date: 2026-10-05
- resolves: F-004
- status: resolved
- note: MAS-I list now reads 'Linear Regression, Logistic Regression, Quadratic Discriminant Analysis, Naive Bayes and the Generalized Linear Model; ...' (LDA left out, as the outline excludes it). Sources: CAS Exam MAS-I Content Outline 2026 (MASI_CO_2026_F v06), James reading list (PDF p.6), sha256:245892366dea073ff44e89b3ac2ae1401517b127d36d51c8a1198b3185faa2ed — https://www.casact.org/sites/default/files/2026-06/MASI_ContentOutline_2026.pdf (James Ch 4 §§4.1-4.4, LDA portion not tested); James, Witten, Hastie & Tibshirani, An Introduction to Statistical Learning with Applications in R, 2nd ed. (Springer 2021, CAS-hosted copy) §4.4.3-4.4.4 (PDF pp.162-163), sha256:f708349f34d2b345a40766f7b4830d22c1bcbf90b4194ae603dcd1245b4e975f — https://www.casact.org/sites/default/files/2022-12/James-G.-et-al.-2nd-edition-Springer-2021.pdf. Both links resolve to existing pages.

## [F-005] Trees called non-parametric with no source read
- entry_type: finding
- author: agent:validate-v1
- run_id: 2026-10-04T21:11Z/3707
- date: 2026-10-05
- severity: nit
- status: open
- locus: bullet 'Parametric ... non-parametric ones (KNN, trees)'
- claim: non-parametric ones (KNN, trees) let the data set the shape, needing far more of it
- evidence: James, Witten, Hastie & Tibshirani, An Introduction to Statistical Learning with Applications in R, 2nd ed. (Springer 2021, CAS-hosted copy) §2.1.2 (PDF p.34: non-parametric methods need 'a very large number of observations (far more than is typically needed for a parametric approach)') and §3.5 (PDF p.115: KNN regression 'one of the simplest and best-known non-parametric methods'), sha256:f708349f34d2b345a40766f7b4830d22c1bcbf90b4194ae603dcd1245b4e975f — https://www.casact.org/sites/default/files/2022-12/James-G.-et-al.-2nd-edition-Springer-2021.pdf, support the sentence and the KNN example. A full-text search of the CAS-hosted ISLR finds no passage calling decision trees parametric or non-parametric, and no other source was read for it this session. Policy: a claim no source read supports is deleted.
- source_rank: 2
- proposed_action: Keep KNN as the example; drop 'trees'.
- applied: true
- fingerprint: f31228c417d4

## [F-005/R] Correction applied
- entry_type: resolution
- author: agent:validate-v1
- run_id: 2026-10-04T21:11Z/3707
- date: 2026-10-05
- resolves: F-005
- status: resolved
- note: Bullet now reads 'non-parametric ones (KNN, for example) let the data set the shape, needing far more of it'. Basis: James, Witten, Hastie & Tibshirani, An Introduction to Statistical Learning with Applications in R, 2nd ed. (Springer 2021, CAS-hosted copy) §2.1.2 (PDF p.34) and §3.5 (PDF p.115), sha256:f708349f34d2b345a40766f7b4830d22c1bcbf90b4194ae603dcd1245b4e975f — https://www.casact.org/sites/default/files/2022-12/James-G.-et-al.-2nd-edition-Springer-2021.pdf.

## [C-002] Validation pass — verified
- entry_type: comment
- author: agent:validate-v1
- run_id: 2026-10-04T21:11Z/3707
- date: 2026-10-05
- status_set: verified
- confidence: high
- checks_run: re-pass after run-3707 resolutions of F-001/F-002: whole log read; F-001 edit (eqs. 2.1-2.2) re-read against PDF p.28 and the block split into two stacked blocks (F-003 nit); F-002 methods list re-read against both outlines' James scopes and ISLR's sections - QDA and naive Bayes (§4.4.3-4.4.4, on MAS-I) were missing and are added (F-004 minor); unchanged bullets re-read - 'trees' dropped from the non-parametric examples, no source read supports it (F-005 nit); training/test error, CV, regression/classification scoring, example classifications re-checked; 27+2 wiki links and the figure embed resolve
- sources_checked: James, Witten, Hastie & Tibshirani, An Introduction to Statistical Learning with Applications in R, 2nd ed. (Springer 2021, CAS-hosted copy), §2.1 eq. 2.1 and §2.1.1 eq. 2.2 (PDF p.28), §2.1.2 non-parametric data needs (PDF p.34), §2.1.4-2.1.5 supervised/unsupervised, regression/classification (PDF pp.37-40), §2.2.1 training vs test MSE and overfitting (PDF p.43), §2.2.3 K=1 training error 0 (PDF p.52), §3.5 KNN non-parametric (PDF p.115), §4.4.2 confusion matrix and ROC (PDF pp.158, 160), §4.4.3-4.4.4 QDA and naive Bayes (PDF pp.162-163), Ch 5 cross-validation (PDF pp.206-215), §8.2 bagging/random forests/boosting (bookmarks), sha256:f708349f34d2b345a40766f7b4830d22c1bcbf90b4194ae603dcd1245b4e975f — https://www.casact.org/sites/default/files/2022-12/James-G.-et-al.-2nd-edition-Springer-2021.pdf; CAS Exam MAS-I Content Outline 2026 (MASI_CO_2026_F v06), Domain C task 2 (PDF p.5) and James reading list Ch 1-7 with §4.4 LDA portion not tested (PDF p.6), sha256:245892366dea073ff44e89b3ac2ae1401517b127d36d51c8a1198b3185faa2ed — https://www.casact.org/sites/default/files/2026-06/MASI_ContentOutline_2026.pdf; CAS Exam MAS-II Content Outline 2026 (MASII_CO_S_2026 v06), Domain C tasks 1-4, 9-10 (PDF p.3), James reading list (PDF p.4), sha256:babf0548b7d674e02d2cffdaee11e5063f8e8c03b3461b8ba2bdfdbc0f90ea1b — https://www.casact.org/sites/default/files/2026-01/MASII_Content_Outlines_2026.pdf
- note: All three run-3707 additions (F-003..F-005) were found re-reading the earlier resolutions and are applied and resolved.
