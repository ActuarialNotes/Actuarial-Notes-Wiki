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
