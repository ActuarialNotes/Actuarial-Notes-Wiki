---
verification:
  status: verified
  confidence: high
  last_checked: 2026-10-10
  last_checked_by: agent:validate-v1
  content_hash: sha256:8ad16689febf773ab0c6ec668cd217f811b83e5bfdf01194e1dc5e30948c3041
  sources:
    - "James, Witten, Hastie & Tibshirani, An Introduction to Statistical Learning, 2nd ed. (Springer 2021, CAS-hosted copy), §2.1.4-2.1.5 PDF pp.37-40 (delta: regression vs classification, logistic regression, KNN and boosting); prior-pass sections §2.1-2.2.3, §4.4.3-4.4.4, §5.1-5.2, §7.5, §7.7.2, §12.4, sha256:f708349f34d2b345a40766f7b4830d22c1bcbf90b4194ae603dcd1245b4e975f — https://www.casact.org/sites/default/files/2022-12/James-G.-et-al.-2nd-edition-Springer-2021.pdf"
    - "CAS Exam MAS-I Content Outline 2026 (MASI_CO_2026_F v06), James reading list PDF p.6, sha256:245892366dea073ff44e89b3ac2ae1401517b127d36d51c8a1198b3185faa2ed — https://www.casact.org/sites/default/files/2026-06/MASI_ContentOutline_2026.pdf"
    - "CAS Exam MAS-II Content Outline 2026, Domain C and James reading list PDF pp.3-4, sha256:babf0548b7d674e02d2cffdaee11e5063f8e8c03b3461b8ba2bdfdbc0f90ea1b — https://www.casact.org/sites/default/files/2026-01/MASII_Content_Outlines_2026.pdf"
  open_findings: 0
  open_critical: 0
  log: .verify/Concepts/Statistical Learning.md
---

**Statistical Learning** is a framework of methods for modeling the relationship between inputs (predictors $\mathbf{X}$) and an output (response $Y$) from data, with the goal of **prediction** or **inference**.

> $$Y = f(\mathbf{X}) + \varepsilon$$

> $$\text{Expected prediction error} = \text{Bias}^2(\hat{f}) + \text{Var}(\hat{f}) + \sigma_\varepsilon^2$$

**Supervised vs. Unsupervised:**
- **Supervised learning**: a labeled response $Y$ is available (e.g., regression, classification)
- **Unsupervised learning**: no labeled response; the goal is to find structure in $\mathbf{X}$ (e.g., [[Clustering]], [[Principal Components Analysis]])

**Regression vs. Classification** (James et al., §2.1.5):
- A problem with a **quantitative** response (claim severity, pure premium) is a **regression** problem; one with a **qualitative** response taking one of $K$ classes (fraud or not, renew or lapse) is a **classification** problem
- The line is not crisp: [[Logistic Regression]] classifies a binary response but estimates class probabilities, and [[K-Nearest Neighbors]] and boosting handle either kind of response

**Prediction vs. Inference:**
- **Prediction**: minimize test error; interpretability may be sacrificed
- **Inference**: understand which predictors affect $Y$ and how; interpretability is essential

**Bias–Variance Trade-off:**
- **High bias** (underfitting): model too simple, misses true pattern
- **High variance** (overfitting): model too flexible, fits noise
- Optimal model complexity minimizes total expected prediction error

**Methods by exam** (CAS 2026 content outlines; both exams read James et al., *An Introduction to Statistical Learning*):

*MAS-I* — James Ch 1, 2 (excluding §2.2.3), 3 (§§3.1–3.3), 4 (§§4.1–4.4), 5, 6 and 7:

| Method | James chapter | Task |
| :--- | :--- | :--- |
| [[Linear Regression]] | 3 Linear Regression | Regression |
| [[Logistic Regression]], [[Quadratic Discriminant Analysis]], [[Naive Bayes]] | 4 Classification | Classification |
| [[Cross-Validation]], [[Bootstrap]] | 5 Resampling Methods | Estimating test error and standard errors |
| [[Variable Selection]] (subset selection), [[Regularization]] (ridge, lasso), [[Principal Components Regression]], [[Partial Least Squares]], [[High-Dimensional Data]] | 6 Linear Model Selection and Regularization | Regression |
| [[Polynomial Regression]], [[Step Function]], [[Regression Spline]], [[Smoothing Spline]], [[Local Regression]], [[Generalized Additive Model]] | 7 Moving Beyond Linearity | Regression (GAMs also classification) |

*MAS-II* — James Ch 1, §2.2, §4.4.2 (confusion matrix), Ch 8, 10 and 12:

| Method | Type | Task |
| :--- | :--- | :--- |
| [[K-Nearest Neighbors]] | Nonparametric | Classification/Regression |
| [[Decision Tree]] | Tree-based | Classification/Regression |
| [[Tree Ensemble]] | Ensemble | Classification/Regression |
| [[Principal Components Analysis]] | Dimensionality reduction | Unsupervised |
| [[Clustering]] | K-means / hierarchical | Unsupervised |
| [[Neural Network]] | Deep learning | Classification/Regression |

![[Media/Figures/Statistical_Learning.svg|340]]

> [!example]- Bias-Variance Trade-off for a Smoothing Spline (MAS-I) {Example}
> A smoothing spline is fitted to the same data once with tuning parameter $\lambda = 0$ and once with $\lambda \to \infty$. Which fit has higher bias? Higher variance?
>
> > [!answer]-
> > **$\lambda = 0$**: the roughness penalty has no effect, so the curve is very jumpy and interpolates every training observation — very flexible, low bias, high variance.
> > **$\lambda \to \infty$**: the curve is forced to be perfectly smooth, which makes it the least squares straight line — rigid, high bias, low variance. In between, $\lambda$ sets the trade-off and is chosen by [[Cross-Validation]].

> [!example]- Bias-Variance Trade-off for KNN (MAS-II) {Example}
> A KNN model is fitted with $K=1$ and separately with $K=100$ for a classification problem. Which has higher bias? Higher variance?
>
> > [!answer]-
> > **$K=1$**: very flexible — low bias, high variance (each prediction depends only on the single nearest neighbor, so it overfits noise).
> > **$K=100$**: very rigid — high bias, low variance (predictions are averaged over many neighbors, smoothing out local patterns but potentially missing fine structure).

> [!tip]- How it appears on the exam
> - **DISC-DA:** Section 7.1 covers basic data modeling techniques. Questions describe an insurance problem and ask whether it is supervised or unsupervised, a regression or a classification problem, or a prediction or an inference task, and which kind of technique fits, such as a [[Classification Tree|classification tree]] for a yes/no outcome or [[Clustering|clustering]] for segments with no target.
> - **MAS-II and SRM:** Questions compare methods on flexibility and interpretability and apply the bias-variance trade-off, as in the examples above.

> [!warning]- Exam traps
> - **"Logistic regression" is a classifier:** Its name says regression, but it is used for a qualitative response.
> - **Unsupervised has no target:** If the data include the outcome to be predicted, the task is supervised, even if clustering is used along the way.
> - **Flexibility is not accuracy:** A more flexible method has lower bias but higher variance; on new data it can predict worse than a simpler one.
