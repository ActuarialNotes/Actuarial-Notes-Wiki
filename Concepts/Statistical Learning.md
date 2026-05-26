**Statistical Learning** is a framework of methods for modeling the relationship between inputs (predictors $\mathbf{X}$) and an output (response $Y$) from data, with the goal of **prediction** or **inference**.

> $$Y = f(\mathbf{X}) + \varepsilon$$
>
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

> [!example]- Bias-Variance Trade-off for KNN {Example}
> A KNN model is fitted with $K=1$ and separately with $K=100$ for a classification problem. Which has higher bias? Higher variance?
>
> > [!answer]-
> > **$K=1$**: very flexible — low bias, high variance (each prediction depends only on the single nearest neighbor, so it overfits noise).
> > **$K=100$**: very rigid — high bias, low variance (predictions are averaged over many neighbors, smoothing out local patterns but potentially missing fine structure).
