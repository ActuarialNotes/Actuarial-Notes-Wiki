---
verification:
  status: stale
  confidence: null
  last_checked: 2026-10-05
  last_checked_by: agent:validate-v1
  content_hash: sha256:a58313f43c8144bb5ab94bf8fa6c6a59ccb140b34caf476fc39744f36293837f
  sources:
    - "James, Witten, Hastie & Tibshirani, An Introduction to Statistical Learning, 2nd ed. (Springer 2021; MAS-I reading), sha256:f708349f34d2b345a40766f7b4830d22c1bcbf90b4194ae603dcd1245b4e975f — https://www.casact.org/sites/default/files/2022-12/James-G.-et-al.-2nd-edition-Springer-2021.pdf, sec.4.4.3 Quadratic Discriminant Analysis, eq.4.28, p(p+1)/2 and Kp(p+1)/2 parameter counts, LDA-vs-QDA bias-variance (printed pp.152-153, PDF pp.162-163); sec.4.4.4 diagonal-covariance remark (printed p.155, PDF p.165)"
    - "CAS Exam MAS-I Content Outline 2026 (MASI_CO_2026_F v06), readings table (PDF p.6), sha256:245892366dea073ff44e89b3ac2ae1401517b127d36d51c8a1198b3185faa2ed — https://www.casact.org/sites/default/files/2026-06/MASI_ContentOutline_2026.pdf: James et al. Ch.4 'Sections 4.1 through 4.4; the Linear Discrimination Analysis portion of Section 4.4 will not be tested'"
  open_findings: 0
  open_critical: 0
  log: .verify/Concepts/Quadratic Discriminant Analysis.md
---

**Quadratic Discriminant Analysis** (QDA) is a method of classification that assumes the $p$ predictors in each class $k$ have a multivariate [[Normal Distribution|normal distribution]] with their own mean vector $\boldsymbol\mu_k$ and their own covariance matrix $\boldsymbol\Sigma_k$. It assigns an observation $\mathbf{x}$, by [[Bayes Theorem#Bayes' theorem for a partition|Bayes' theorem]], to the class whose discriminant function is largest. The discriminant function of class $k$ is

> $$\begin{aligned} \delta_k(\mathbf{x}) = &-\tfrac{1}{2}(\mathbf{x} - \boldsymbol\mu_k)^T \boldsymbol\Sigma_k^{-1} (\mathbf{x} - \boldsymbol\mu_k) \\ &- \tfrac{1}{2}\ln|\boldsymbol\Sigma_k| + \ln \pi_k \end{aligned}$$

- $\pi_k$ is the prior probability of class $k$.
- $|\boldsymbol\Sigma_k|$ is the determinant of the covariance matrix of class $k$.

In practice $\boldsymbol\mu_k$, $\boldsymbol\Sigma_k$ and $\pi_k$ are replaced by their estimates from the training data. The discriminant function is the logarithm of $\pi_k f_k(\mathbf{x})$ less a constant common to all classes, so the probability that the observation belongs to class $k$ is

> $$P(Y = k \mid X = \mathbf{x}) = \frac{e^{\delta_k(\mathbf{x})}}{\sum_{l=1}^{K} e^{\delta_l(\mathbf{x})}}$$

- $K$ is the number of classes.

## One predictor

With one predictor, class $k$ has mean $\mu_k$ and variance $\sigma_k^2$, and the discriminant function is

> $$\delta_k(x) = -\frac{(x - \mu_k)^2}{2\sigma_k^2} - \ln\sigma_k + \ln\pi_k$$

> [!example]- Attritional claims have log-severity $N(8, 0.5^2)$ and make up $90\%$ of claims. Complex claims have log-severity $N(9, 1.5^2)$ and make up $10\%$. What is the probability that a claim with log-severity 6.0 is complex? {Example}
> - For attritional claims, $(6 - 8)^2/(2 \times 0.25) = 8$, so $\delta_{\text{A}}(6) = -8 + 0.693 - 0.105 = -7.412$.
> - For complex claims, $(6 - 9)^2/(2 \times 2.25) = 2$, so $\delta_{\text{C}}(6) = -2 - 0.405 - 2.303 = -4.708$.
> - The difference is $\delta_{\text{C}}(6) - \delta_{\text{A}}(6) = 2.704$.
> - The probability that the claim is complex is $\frac{1}{1 + e^{-2.704}} = 0.937$, so it is classified as complex.

## The decision boundary

The boundary between classes $k$ and $l$ is the set of points where their discriminant functions are equal:

> $$\delta_k(\mathbf{x}) = \delta_l(\mathbf{x})$$

Because $\mathbf{x}$ enters $\delta_k$ quadratically, the boundary is a quadratic curve or surface, which gives the method its name. With one predictor, the boundary can be two points, so a class with a larger variance can take both tails. A model with one covariance matrix shared by all classes, linear discriminant analysis, has a linear boundary instead, because the quadratic terms cancel.

> [!example]- In the claims example, for which log-severities is a claim classified as attritional? {Example}
> - Setting $\delta_{\text{A}}(x) = \delta_{\text{C}}(x)$ gives a quadratic equation in $x$.
> - Its roots are $x = 6.46$ and $x = 9.29$.
> - A claim is classified as attritional between 6.46 and 9.29, and as complex below 6.46 or above 9.29, because the wider complex distribution has more density in both tails.

## Number of parameters

A covariance matrix for $p$ predictors has $p(p+1)/2$ distinct variances and covariances. QDA estimates one for each class, so the number of covariance parameters is

> $$K\, \frac{p(p+1)}{2}$$

QDA also estimates $p$ means for each class. Its flexibility lowers bias but raises variance, so it is preferred when the training set is large or the classes clearly differ in spread. With few observations in a class relative to $p$, a more restricted model usually has a lower test error ([[Bias-Variance Tradeoff|bias-variance tradeoff]]). [[Naive Bayes|Naive Bayes]] with normal densities is QDA with each $\boldsymbol\Sigma_k$ diagonal, so it estimates only $p$ variances for each class.

> [!example]- A model classifies policies into 3 classes using 10 predictors. How many covariance parameters does QDA estimate, compared with a model that shares one covariance matrix across the classes? {Example}
> - One covariance matrix has $\frac{10 \times 11}{2} = 55$ parameters.
> - QDA estimates one for each class, $3 \times 55 = 165$ parameters.
> - QDA estimates 110 more covariance parameters than the shared-matrix model.

> [!trap] Dropping the $\ln\sigma_k$ term
> When the classes have different variances, the term $-\ln\sigma_k$ does not cancel between them. For a claim with log-severity 8.5 in the example, the probability that it is complex is $0.055$. Leaving out $-\ln\sigma_k$ gives $0.148$.
