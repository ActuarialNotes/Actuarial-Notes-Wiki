---
verification:
  status: stale
  confidence: null
  last_checked: 2026-10-05
  last_checked_by: agent:validate-v1
  content_hash: sha256:45d9ae43c0f0b12e09284baefef7fc634639b6abed9ebde7bab435bc5634dc0c
  sources:
    - "James, Witten, Hastie & Tibshirani, An Introduction to Statistical Learning with Applications in R, 2nd ed. (Springer 2021, CAS-hosted copy), §2.1 eq. 2.1 and §2.1.1 eq. 2.2 (PDF p.28), §2.1.2 non-parametric data needs (PDF p.34), §2.1.4-2.1.5 supervised/unsupervised, regression/classification (PDF pp.37-40), §2.2.1 training vs test MSE and overfitting (PDF p.43), §2.2.3 K=1 training error 0 (PDF p.52), §3.5 KNN non-parametric (PDF p.115), §4.4.2 confusion matrix and ROC (PDF pp.158, 160), §4.4.3-4.4.4 QDA and naive Bayes (PDF pp.162-163), Ch 5 cross-validation (PDF pp.206-215), §8.2 bagging/random forests/boosting (bookmarks), sha256:f708349f34d2b345a40766f7b4830d22c1bcbf90b4194ae603dcd1245b4e975f — https://www.casact.org/sites/default/files/2022-12/James-G.-et-al.-2nd-edition-Springer-2021.pdf"
    - "CAS Exam MAS-I Content Outline 2026 (MASI_CO_2026_F v06), Domain C task 2 (PDF p.5) and James reading list Ch 1-7 with §4.4 LDA portion not tested (PDF p.6), sha256:245892366dea073ff44e89b3ac2ae1401517b127d36d51c8a1198b3185faa2ed — https://www.casact.org/sites/default/files/2026-06/MASI_ContentOutline_2026.pdf"
    - "CAS Exam MAS-II Content Outline 2026 (MASII_CO_S_2026 v06), Domain C tasks 1-4, 9-10 (PDF p.3), James reading list (PDF p.4), sha256:babf0548b7d674e02d2cffdaee11e5063f8e8c03b3461b8ba2bdfdbc0f90ea1b — https://www.casact.org/sites/default/files/2026-01/MASII_Content_Outlines_2026.pdf"
  open_findings: 0
  open_critical: 0
  log: .verify/Concepts/Supervised Learning.md
---

![[Media/Figures/Supervised_Learning.svg|340]]

**Supervised Learning** is the fitting of a model that predicts a response $Y$ from predictors $X = (X_1, X_2, \ldots, X_p)$, using training data in which the response of every observation is recorded. The model of the relationship between the response and the predictors is

> $$Y = f(X) + \varepsilon$$

- $f$ is a fixed but unknown function of the predictors.
- $\varepsilon$ is a random error term, independent of $X$, with mean 0.

The prediction of the response is

> $$\hat{Y} = \hat{f}(X)$$

- $\hat{f}$ is the estimate of $f$ fitted to the training data.

In [[Unsupervised Learning|unsupervised learning]] the data have no response, and the method looks for structure among the predictors, such as the groups found by [[Clustering|clustering]] or the directions found by [[Principal Components Analysis|principal components analysis]]. A method is supervised when its training data contain a known response. Whether the cases it will later predict have known outcomes does not matter, because every predictive model is used on cases whose outcome is not yet known. The regression methods of the syllabus are supervised, from [[Linear Regression|linear regression]] and [[Logistic Regression|logistic regression]] to ridge regression and the lasso ([[Regularization|regularization]]).

> [!example]- Which of these are supervised learning: predicting each policy's claim count next year from past policy years, flagging likely fraudulent claims from past investigated claims, and grouping territories into rating regions by their loss characteristics? {Example}
> - The claim count model is supervised, because the past policy years record each policy's claim count.
> - The fraud model is supervised, because each investigated claim is recorded as fraudulent or not.
> - Grouping territories is unsupervised, because no territory has a recorded region to fit against.

## Regression and classification

A supervised learning problem is a regression problem when the response is quantitative, such as a claim amount, and a classification problem when the response is qualitative, such as fraudulent or not. A regression model is judged by its mean squared error and a classification model by its error rate, both measured on [[Test Error|test observations]] that were not used to fit it.
