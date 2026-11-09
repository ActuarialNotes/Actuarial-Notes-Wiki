---
verification:
  status: stale
  confidence: null
  last_checked: 2026-10-05
  last_checked_by: agent:validate-v1
  content_hash: sha256:0d1636bd3ed448e44d61760fa6fed82510cf4456d8d0eeebf3e2d775dd749bca
  sources:
    - "James, Witten, Hastie & Tibshirani, An Introduction to Statistical Learning, 2nd ed. (Springer 2021; MAS-I reading), §4.4.4 Naive Bayes — eq (4.29) within-class independence, eq (4.30) posterior, options for f_kj (normal / histogram / kernel density / class proportions), 'n not large enough relative to p', QDA with a diagonal class-specific covariance matrix, printed pp.154-156 (PDF pp.164-166); §4.4 priors as training proportions (PDF p.151); §4.4.2 threshold trade-off (printed p.150, PDF p.160), sha256:f708349f34d2b345a40766f7b4830d22c1bcbf90b4194ae603dcd1245b4e975f — https://www.casact.org/sites/default/files/2022-12/James-G.-et-al.-2nd-edition-Springer-2021.pdf"
    - "CAS Exam MAS-I Content Outline 2026 (MASI_CO_2026_F v06), reading list (James et al. Chapter 4, §§4.1-4.4, assigned to Section C), sha256:245892366dea073ff44e89b3ac2ae1401517b127d36d51c8a1198b3185faa2ed — https://www.casact.org/sites/default/files/2026-06/MASI_ContentOutline_2026.pdf"
  open_findings: 0
  open_critical: 0
  log: .verify/Concepts/Naive Bayes.md
---

**Naive Bayes** is a method of classification that estimates the probability that an observation belongs to each of $K$ classes by [[Bayes Theorem#Bayes' theorem for a partition|Bayes' theorem]], assuming that its $p$ predictors are independent within each class. Under that assumption, the density of the predictors $\mathbf{x} = (x_1, \ldots, x_p)$ in class $k$ is the product

> $$f_k(\mathbf{x}) = f_{k1}(x_1)\, f_{k2}(x_2) \cdots f_{kp}(x_p)$$

- $f_{kj}$ is the density, or probability function, of predictor $j$ in class $k$.

The probability that an observation with predictors $\mathbf{x}$ belongs to class $k$ is

> $$P(Y = k \mid X = \mathbf{x}) = \frac{\pi_k\, f_k(\mathbf{x})}{\sum_{l=1}^{K} \pi_l\, f_l(\mathbf{x})}$$

- $\pi_k$ is the prior probability of class $k$, estimated as the proportion of training observations in class $k$.

The observation is assigned to the class with the largest probability, or flagged when the probability of a class passes a chosen threshold.

> [!example]- In training data, $4\%$ of claims are fraudulent. A claim was reported late and is soft-tissue only, and no attorney was retained before first notice. What is the naive Bayes probability that the claim is fraudulent? {Example}
> The rates of the three flags within each class are:
>
> | Flag | Fraud | Legitimate |
> | :--- | ---: | ---: |
> | Reported more than 30 days late | 0.45 | 0.10 |
> | Soft-tissue injury only | 0.60 | 0.25 |
> | Attorney retained before first notice | 0.30 | 0.05 |
>
> - The attorney flag is absent, so its probability in each class is the complement: $1 - 0.30 = 0.70$ for fraud and $1 - 0.05 = 0.95$ for legitimate claims.
> - For fraud, the prior times the flag probabilities is $0.04 \times 0.45 \times 0.60 \times 0.70 = 0.00756$.
> - For legitimate claims it is $0.96 \times 0.10 \times 0.25 \times 0.95 = 0.02280$.
> - The probability of fraud is $\frac{0.00756}{0.00756 + 0.02280} = 0.249$.

## Estimating the densities within each class

For a qualitative predictor, $f_{kj}$ is estimated by the proportion of class-$k$ training observations at each level of predictor $j$. For a quantitative predictor, $f_{kj}$ may be estimated by a [[Histogram|histogram]] or a [[Kernel Density Estimation|kernel density estimate]], or by assuming a normal distribution within each class:

> $$f_{kj}(x_j) = \frac{1}{\sigma_{kj}\sqrt{2\pi}}\, e^{-(x_j - \mu_{kj})^2/(2\sigma_{kj}^2)}$$

- $\mu_{kj}$ and $\sigma_{kj}^2$ are the mean and the variance of predictor $j$ in class $k$.

A density, not a probability, enters the product for a quantitative predictor.

> [!example]- A second fraud model uses two predictors, the report lag and the soft-tissue flag. The report lag in days is normal with mean 40 and standard deviation 15 for fraud, and mean 10 and standard deviation 8 for legitimate claims. Soft-tissue rates are 0.60 and 0.25, and the prior is $4\%$. What is the probability that a soft-tissue claim reported after 25 days is fraudulent? {Example}
> - For fraud, 25 days is $(25 - 40)/15 = -1$ standard deviation from the mean, so the density is $\frac{e^{-0.5}}{15\sqrt{2\pi}} = 0.01613$.
> - For legitimate claims, 25 days is $(25 - 10)/8 = 1.875$ standard deviations from the mean, so the density is $\frac{e^{-1.758}}{8\sqrt{2\pi}} = 0.00860$.
> - For fraud, $0.04 \times 0.01613 \times 0.60 = 0.000387$.
> - For legitimate claims, $0.96 \times 0.00860 \times 0.25 = 0.002064$.
> - The probability of fraud is $\frac{0.000387}{0.000387 + 0.002064} = 0.158$.

## Generative and discriminative classifiers

Naive Bayes and [[Quadratic Discriminant Analysis|quadratic discriminant analysis]] are generative classifiers. They model the distribution of the predictors within each class and the priors $\pi_k$, then obtain the probability of each class by Bayes' theorem. [[Logistic Regression|Logistic regression]] is discriminative, because it models the probability of each class directly.

| Classifier | What it models | Covariance of the predictors within a class |
| :--- | :--- | :--- |
| Logistic regression | $P(Y = k \mid X = \mathbf{x})$ | Not modelled |
| Quadratic discriminant analysis | $\pi_k$ and a multivariate normal $f_k$ | A full matrix for each class |
| Naive Bayes with normal $f_{kj}$ | $\pi_k$ and a product of normal $f_{kj}$ | A diagonal matrix for each class |

Naive Bayes with normal densities is quadratic discriminant analysis with each class's covariance matrix diagonal. Assuming the predictors independent introduces some bias but removes every covariance parameter, which reduces the variance of the fit ([[Bias-Variance Tradeoff|bias-variance tradeoff]]). Naive Bayes therefore often does well when $n$ is not large relative to $p$.

> [!trap] Leaving out the prior probabilities
> The posterior multiplies each class's density by its prior. In the first fraud example, dropping the priors compares $0.189$ with $0.02375$ and gives a fraud probability of $0.888$ instead of $0.249$.
