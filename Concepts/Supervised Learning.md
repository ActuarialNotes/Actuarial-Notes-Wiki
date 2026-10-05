---
verification:
  status: verified
  confidence: high
  last_checked: 2026-10-05
  last_checked_by: agent:validate-v1
  content_hash: sha256:e794674c8cc41c13ebab26174d68d30ade6e13a0084f8b30cfd75a975a9ec06e
  sources:
    - "James, Witten, Hastie & Tibshirani, An Introduction to Statistical Learning with Applications in R, 2nd ed. (Springer 2021, CAS-hosted copy), §2.1 eq. 2.1 and §2.1.1 eq. 2.2 (PDF p.28), §2.1.2 non-parametric data needs (PDF p.34), §2.1.4-2.1.5 supervised/unsupervised, regression/classification (PDF pp.37-40), §2.2.1 training vs test MSE and overfitting (PDF p.43), §2.2.3 K=1 training error 0 (PDF p.52), §3.5 KNN non-parametric (PDF p.115), §4.4.2 confusion matrix and ROC (PDF pp.158, 160), §4.4.3-4.4.4 QDA and naive Bayes (PDF pp.162-163), Ch 5 cross-validation (PDF pp.206-215), §8.2 bagging/random forests/boosting (bookmarks), sha256:f708349f34d2b345a40766f7b4830d22c1bcbf90b4194ae603dcd1245b4e975f — https://www.casact.org/sites/default/files/2022-12/James-G.-et-al.-2nd-edition-Springer-2021.pdf"
    - "CAS Exam MAS-I Content Outline 2026 (MASI_CO_2026_F v06), Domain C task 2 (PDF p.5) and James reading list Ch 1-7 with §4.4 LDA portion not tested (PDF p.6), sha256:245892366dea073ff44e89b3ac2ae1401517b127d36d51c8a1198b3185faa2ed — https://www.casact.org/sites/default/files/2026-06/MASI_ContentOutline_2026.pdf"
    - "CAS Exam MAS-II Content Outline 2026 (MASII_CO_S_2026 v06), Domain C tasks 1-4, 9-10 (PDF p.3), James reading list (PDF p.4), sha256:babf0548b7d674e02d2cffdaee11e5063f8e8c03b3461b8ba2bdfdbc0f90ea1b — https://www.casact.org/sites/default/files/2026-01/MASII_Content_Outlines_2026.pdf"
  open_findings: 0
  open_critical: 0
  log: .verify/Concepts/Supervised Learning.md
---

**Supervised learning** fits a model to predict a labelled response $Y$ from predictors $X$. Every observation in the training data carries the answer, so the fit can be scored against it — the defining contrast with [[Unsupervised Learning]].

> $$Y = f(X) + \varepsilon$$
>
> $$\hat{Y} = \hat{f}(X)$$

- **Regression** predicts a numeric $Y$ (pure premium, severity) and is scored by [[Residual Sum of Squares|squared error]]; **classification** predicts a class (fraud / not) and is scored by error rate, [[AUROC]] or the [[Confusion Matrix]]
- Syllabus methods (CAS 2026 outlines): **MAS-I** — [[Linear Regression]], [[Logistic Regression]], [[Quadratic Discriminant Analysis]], [[Naive Bayes]] and the [[Generalized Linear Model]]; subset selection ([[Variable Selection]]), ridge and lasso ([[Regularization]]), [[Principal Components Regression]] and [[Partial Least Squares]]; [[Polynomial Regression]], [[Step Function]]s, [[Regression Spline]]s, [[Smoothing Spline]]s, [[Local Regression]] and [[Generalized Additive Model]]s. **MAS-II** — [[K-Nearest Neighbors]], [[Decision Tree]]s, [[Tree Ensemble]]s ([[Bagging]], [[Random Forest]], [[Boosting]]) and [[Neural Network]]s
- The goal is **test** error, not training error — flexible methods drive training error to zero and generalize badly ([[Bias-Variance Tradeoff]])
- Test error is estimated by a held-out set or by [[Cross-Validation]]
- **Parametric** methods assume a form for $f$ and estimate a few coefficients; **non-parametric** ones (KNN, for example) let the data set the shape, needing far more of it

![[Media/Figures/Supervised_Learning.svg|340]]

> [!example]- Which Task Is This? {Example}
> Classify each: (a) predicting a policy's expected claim count next year; (b) flagging claims likely to be fraudulent, given past investigated claims; (c) grouping 68 territories into five rating regions from their loss characteristics.
>
> > [!answer]-
> > **(a)** Supervised **regression** — the response is a count and history supplies it.
> > **(b)** Supervised **classification** — the investigated claims carry a fraud/no-fraud label.
> > **(c)** **Unsupervised** — there is no "correct region" label to fit against; this is [[Clustering]].
