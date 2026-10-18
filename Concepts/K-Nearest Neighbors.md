---
verification:
  status: verified
  confidence: medium
  last_checked: 2026-10-18
  last_checked_by: agent:validate-v1
  content_hash: sha256:b667c6e92ce7ca4650a60eefd924eb0850e546c79e1dc86b140cdea73df117ca
  sources:
    - "James, Witten, Hastie & Tibshirani, An Introduction to Statistical Learning, 2nd ed. (Springer 2021), CAS-hosted copy, §2.2.3 'K-Nearest Neighbors', printed pp.39-42 (PDF pp.50-53); §3.5, printed pp.105-108 (PDF pp.115-118); §4.7.6, printed p.183 (PDF p.193), sha256:f708349f34d2b345a40766f7b4830d22c1bcbf90b4194ae603dcd1245b4e975f — https://www.casact.org/sites/default/files/2022-12/James-G.-et-al.-2nd-edition-Springer-2021.pdf"
  open_findings: 1
  open_critical: 0
  log: .verify/Concepts/K-Nearest Neighbors.md
---

**K-Nearest Neighbors (KNN)** is a nonparametric [[Statistical Learning]] algorithm that predicts the output for a new observation by looking at the $K$ closest training observations (by some distance metric) and aggregating their responses.

> **Regression:** $\hat{f}(x_0) = \frac{1}{K}\sum_{i \in \mathcal{N}_K(x_0)} y_i$
>
> **Classification:** $\hat{P}(Y = j \mid x_0) = \frac{1}{K}\sum_{i \in \mathcal{N}_K(x_0)} \mathbf{1}(y_i = j)$, predict class with highest probability

- $\mathcal{N}_K(x_0)$ is the **neighborhood** of the $K$ nearest training points to $x_0$
- **Distance metric**: Euclidean distance is standard; predictors should be **standardized** first since KNN is scale-sensitive
- **Choosing $K$**: small $K$ = low bias, high variance (flexible); large $K$ = high bias, low variance (smooth); optimal $K$ selected by cross-validation
- KNN is a **lazy learner** — it stores all training data and does computation at prediction time (no explicit training phase)
- **Curse of dimensionality**: KNN degrades in high dimensions as distances become uninformative

![[Media/Figures/K-Nearest_Neighbors.svg|340]]

> [!example]- KNN Classification for Fraud Detection {Example}
> Training data has 5 observations. For a new claim $x_0$, the 3 nearest neighbors have labels: Fraud, Fraud, Not Fraud. What is the KNN ($K=3$) predicted class and estimated probability of fraud?
>
> > [!answer]-
> > Two of three neighbors are Fraud, so $\hat{P}(\text{Fraud} \mid x_0) = 2/3 \approx 0.667$.
> > The predicted class is **Fraud** (majority vote).

> [!example]- Effect of K on Decision Boundary {Example}
> A KNN classifier is applied to binary insurance outcome data with $K=1$ and $K=50$. Describe the expected difference in the decision boundaries.
>
> > [!answer]-
> > $K=1$ produces a **highly irregular, jagged** decision boundary (zero training error). $K=50$ produces a **much smoother** boundary that may misclassify some training observations.
