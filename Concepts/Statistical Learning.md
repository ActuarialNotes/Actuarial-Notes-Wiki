---
verification:
  status: verified
  confidence: medium
  last_checked: 2026-10-05
  last_checked_by: agent:validate-v1
  content_hash: sha256:4a0453cfac5177679ebc4a9e047ee928d9c5964f12971adbe025b7e086c90219
  sources:
    - "James, Witten, Hastie & Tibshirani, An Introduction to Statistical Learning with Applications in R, 2nd ed. (Springer 2021, CAS-hosted copy), §2.1 eq. 2.1, §2.1.1 prediction vs inference (PDF p.28), §2.1.2 parametric vs non-parametric (PDF p.34), §2.1.4 (PDF p.37), §2.2.2 eq. 2.7 (PDF p.45), §2.2.3 KNN K=1 vs K=100 (PDF pp.50-52), §12.4 (PDF pp.522-523), sha256:f708349f34d2b345a40766f7b4830d22c1bcbf90b4194ae603dcd1245b4e975f — https://www.casact.org/sites/default/files/2022-12/James-G.-et-al.-2nd-edition-Springer-2021.pdf"
    - "CAS Exam MAS-I Content Outline 2026 (MASI_CO_2026_F v06), James reading list (PDF p.6), sha256:245892366dea073ff44e89b3ac2ae1401517b127d36d51c8a1198b3185faa2ed — https://www.casact.org/sites/default/files/2026-06/MASI_ContentOutline_2026.pdf"
    - "CAS Exam MAS-II Content Outline 2026, Domain C tasks (PDF p.3) and James reading list (PDF p.4), sha256:babf0548b7d674e02d2cffdaee11e5063f8e8c03b3461b8ba2bdfdbc0f90ea1b — https://www.casact.org/sites/default/files/2026-01/MASII_Content_Outlines_2026.pdf"
  open_findings: 2
  open_critical: 0
  log: .verify/Concepts/Statistical Learning.md
---

**Statistical Learning** is a framework of methods for modeling the relationship between inputs (predictors $\mathbf{X}$) and an output (response $Y$) from data, with the goal of **prediction** or **inference**.

> $$Y = f(\mathbf{X}) + \varepsilon$$

> $$\text{Expected prediction error} = \text{Bias}^2(\hat{f}) + \text{Var}(\hat{f}) + \sigma_\varepsilon^2$$

**Supervised vs. Unsupervised:**
- **Supervised learning**: a labeled response $Y$ is available (e.g., regression, classification)
- **Unsupervised learning**: no labeled response; the goal is to find structure in $\mathbf{X}$ (e.g., [[Clustering]], [[Principal Components Analysis]])

**Prediction vs. Inference:**
- **Prediction**: minimize test error; interpretability may be sacrificed
- **Inference**: understand which predictors affect $Y$ and how; interpretability is essential

**Bias–Variance Trade-off:**
- **High bias** (underfitting): model too simple, misses true pattern
- **High variance** (overfitting): model too flexible, fits noise
- Optimal model complexity minimizes total expected prediction error

**Key methods covered in MAS-II:**

| Method | Type | Task |
| :--- | :--- | :--- |
| [[K-Nearest Neighbors]] | Nonparametric | Classification/Regression |
| [[Decision Tree]] | Tree-based | Classification/Regression |
| [[Tree Ensemble]] | Ensemble | Classification/Regression |
| [[Principal Components Analysis]] | Dimensionality reduction | Unsupervised |
| [[Clustering]] | Density-based | Unsupervised |
| [[Neural Network]] | Deep learning | Classification/Regression |

![[Media/Figures/Statistical_Learning.svg|340]]

> [!example]- Bias-Variance Trade-off for KNN {Example}
> A KNN model is fitted with $K=1$ and separately with $K=100$ for a classification problem. Which has higher bias? Higher variance?
>
> > [!answer]-
> > **$K=1$**: very flexible — low bias, high variance (each prediction depends only on the single nearest neighbor, so it overfits noise).
> > **$K=100$**: very rigid — high bias, low variance (predictions are averaged over many neighbors, smoothing out local patterns but potentially missing fine structure).
