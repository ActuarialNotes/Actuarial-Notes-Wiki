---
verification:
  status: verified
  confidence: medium
  last_checked: 2026-10-05
  last_checked_by: agent:validate-v1
  content_hash: sha256:cc1d5eb5ee27e5568b04a7ac54b6af4254bf9184ef9084603476b8cb1244b6b6
  sources:
    - "James, Witten, Hastie & Tibshirani, An Introduction to Statistical Learning with Applications in R, 2nd ed. (Springer 2021, CAS-hosted copy), §2.1 eq. 2.1, §2.1.2 (PDF pp.32-35), §2.1.4-2.1.5 (PDF pp.37-40), §2.2.1 eqs. 2.5-2.6 (PDF pp.40-43), §4.4.2 confusion matrix and ROC curve (PDF pp.158, 160), Ch 5 CV (PDF pp.206-215), sha256:f708349f34d2b345a40766f7b4830d22c1bcbf90b4194ae603dcd1245b4e975f — https://www.casact.org/sites/default/files/2022-12/James-G.-et-al.-2nd-edition-Springer-2021.pdf"
    - "CAS Exam MAS-II Content Outline 2026, Domain C tasks (PDF p.3), sha256:babf0548b7d674e02d2cffdaee11e5063f8e8c03b3461b8ba2bdfdbc0f90ea1b — https://www.casact.org/sites/default/files/2026-01/MASII_Content_Outlines_2026.pdf"
    - "CAS Exam MAS-I Content Outline 2026 (MASI_CO_2026_F v06), James reading list (PDF p.6), sha256:245892366dea073ff44e89b3ac2ae1401517b127d36d51c8a1198b3185faa2ed — https://www.casact.org/sites/default/files/2026-06/MASI_ContentOutline_2026.pdf"
  open_findings: 2
  open_critical: 0
  log: .verify/Concepts/Supervised Learning.md
---

**Supervised learning** fits a model to predict a labelled response $Y$ from predictors $X$. Every observation in the training data carries the answer, so the fit can be scored against it — the defining contrast with [[Unsupervised Learning]].

> $$Y = f(X) + \varepsilon, \qquad \hat{f} = \arg\min_{f}\ \sum_{i=1}^{n} L\!\left(y_i, f(x_i)\right)$$

- **Regression** predicts a numeric $Y$ (pure premium, severity) and is scored by [[Residual Sum of Squares|squared error]]; **classification** predicts a class (fraud / not) and is scored by error rate, [[AUROC]] or the [[Confusion Matrix]]
- Syllabus methods: [[K-Nearest Neighbors]], [[Decision Tree]]s, [[Tree Ensemble]]s ([[Bagging]], [[Random Forest]], [[Boosting]]), [[Neural Network]]s and the [[Generalized Linear Model]]
- The goal is **test** error, not training error — flexible methods drive training error to zero and generalize badly ([[Bias-Variance Tradeoff]])
- Test error is estimated by a held-out set or by [[Cross-Validation]]
- **Parametric** methods assume a form for $f$ and estimate a few coefficients; **non-parametric** ones (KNN, trees) let the data set the shape, needing far more of it

![[Media/Figures/Supervised_Learning.svg|340]]

> [!example]- Which Task Is This? {Example}
> Classify each: (a) predicting a policy's expected claim count next year; (b) flagging claims likely to be fraudulent, given past investigated claims; (c) grouping 68 territories into five rating regions from their loss characteristics.
>
> > [!answer]-
> > **(a)** Supervised **regression** — the response is a count and history supplies it.
> > **(b)** Supervised **classification** — the investigated claims carry a fraud/no-fraud label.
> > **(c)** **Unsupervised** — there is no "correct region" label to fit against; this is [[Clustering]].
