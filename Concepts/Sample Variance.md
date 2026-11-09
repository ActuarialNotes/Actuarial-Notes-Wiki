---
verification:
  status: stale
  confidence: null
  last_checked: 2026-10-05
  last_checked_by: agent:validate-v1
  content_hash: sha256:e22042d69cfaa7f22ddc2bfa2ab45176b722214fae7729a2ea4bd6fe623638d0
  sources:
    - "CAS Exam MAS-I Content Outline 2026 (MASI_CO_2026_F v06, 2026-06-29), Domain B tasks 1 (estimate mean and variance), 2 (sufficient statistic), 4 (critical values from a sampling distribution), 7 (order statistics), 8 (MLE; consistency, unbiasedness, sufficiency, efficiency, minimum variance, MSE; censoring and truncation), 9 (PDF p.4); Hogg Domain B §§4.1, 5.1, 6.1–6.5, 7.1–7.6 and Tse §§12.1, 12.3 (PDF p.6), sha256:245892366dea073ff44e89b3ac2ae1401517b127d36d51c8a1198b3185faa2ed — https://www.casact.org/sites/default/files/2026-06/MASI_ContentOutline_2026.pdf"
    - "Siegrist, Random, §5.5 The Sample Variance (divisor n − 1, n − 1 free deviations, computing formula, E(S²) = σ², var(S²) = (σ4 − (n−3)σ⁴/(n−1))/n; outlier exercise: s 16 → 11.62 when one score is dropped), sha256:452e2841007fad173229a9bb069a4acdda8e0d0bc6c1632f7239ef585248b0c6 — https://www.randomservices.org/random/sample/Variance.html"
    - "Siegrist, Random, §5.8 Special Properties of Normal Samples (M ~ normal(μ, σ²/n); M and S² independent; (n−1)S²/σ² chi-square n−1; var(S²) = 2σ⁴/(n−1); T ~ t_{n−1}; two independent normal samples: variance ratio ~ F_{m−1,n−1}), sha256:d9a62017ae3a8488aedac3eceedb15d8b68243ae60894104ab88564ace25ff79 — https://www.randomservices.org/random/sample/Normal.html"
    - "Siegrist, Random, §6.2 Method of Moments (matching sample and distribution moments; mean/variance matching; T² bias −σ²/n and 'no simple, general relationship between mse(T²) and mse(S²)', T² smaller MSE for normal samples; negative binomial U = M²/(T² − M); uniform MoM 2M), sha256:43755b5bee6179fca8d7c1c964e7c6a9bb1a9de6f3916130100c69e666a3194e — https://www.randomservices.org/random/point/Moments.html"
    - "Siegrist, Random, §6.3 Maximum Likelihood (likelihood = pdf with roles reversed; log-likelihood; interior vs boundary maxima; invariance; Bernoulli/Poisson/normal/gamma MLEs; Uniform[0,h]: MLE X_(n), mse 2h²/((n+1)(n+2)), (n+1)X_(n)/n unbiased with var h²/(n(n+2)); Uniform[a,a+1]: MLE not unique), sha256:f8c94e3de84f7a025fd32395169938f37e7fd7958d5a8be9d56b54ed307d6ffd — https://www.randomservices.org/random/point/Likelihood.html"
    - "Penn State STAT 415, Lesson 2 Estimation (Part I): Ex 2.7 divisor-n variance estimator biased, E = (n−1)σ²/n; Ex 2.8 S² unbiased, sha256:6f5a6c01ae2d4c7cb46a18ad68a9e26b8177b5035860946e83d31b6236a6534d — https://online.stat.psu.edu/stat415/Lesson02.html"
    - "Penn State STAT 415, Lesson 7 §7.1 Properties of MLEs: consistency, equivariance, asymptotic normality 'subject to some regularity conditions'; Ex 7.1 normal MLEs x̄ and divisor-n variance (I(θ) written for the whole sample there), sha256:0c6afc848ae41251fc702348e0e8c603c5725f1f03c20b4731d789a61babbe0b — https://online.stat.psu.edu/stat415/Lesson07.html"
    - "CAS Exam MAS-I Tables, 'Lower-tail areas for Chi-square distributions', df 24, 0.950 column = 36.42 (PDF p.20), sha256:cb5674138a67f7a498b8cc90357144fd121cbcbbc7487f214557b105611a69b4 — https://www.casact.org/sites/default/files/2021-03/masi_tables.pdf"
  open_findings: 0
  open_critical: 0
  log: .verify/Concepts/Sample Variance.md
---

![[Media/Figures/Sample_Variance.svg|340]]

A **Sample Variance** is the sum of the squared deviations of a [[Random Sample|random sample]] from its [[Sample Mean|sample mean]] $\bar{X}$, divided by one less than the number of observations. It is the usual [[Estimator|estimator]] of the variance $\sigma^2$ of the distribution. The sample variance $S^2$ of a random sample $X_1, \ldots, X_n$ is

> $$S^2 = \frac{1}{n-1}\sum_{i=1}^{n} \left(X_i - \bar{X}\right)^2$$

- $n - 1$ is the degrees of freedom of $S^2$, the number of observations less the one used in estimating $\mu$ by $\bar{X}$.

The sample standard deviation $S$ is the square root of $S^2$. Applied to the differences $d_1, \ldots, d_n$ of paired observations, the same formula gives the sample variance of the differences, $s_d^2$.

The sum of squared deviations equals the sum of squares less $n\bar{X}^2$, so the sample variance is also

> $$S^2 = \frac{1}{n-1}\left(\sum_{i=1}^{n} X_i^2 - n\bar{X}^2\right)$$

> [!example]- Five claim amounts, in thousands, are 4, 6, 9, 11 and 20. What is the sample variance? {Example}
> - The sample mean is $\bar{x} = 50/5 = 10$.
> - The sum of squares is $16 + 36 + 81 + 121 + 400 = 654$.
> - The sample variance is $s^2 = (654 - 5 \times 10^2)/4 = 154/4 = 38.5$.

## Unbiasedness of the sample variance

The expected sum of squared deviations from the sample mean is $(n-1)\sigma^2$. Dividing it by $n - 1$ makes the sample variance an [[Unbiasedness|unbiased]] estimator of $\sigma^2$:

> $$E[S^2] = \sigma^2$$

For a random sample from a [[Normal Distribution|normal distribution]], $S^2$ is the minimum variance unbiased estimator of $\sigma^2$.

The estimator that divides by $n$ is $\hat{\sigma}^2 = \frac{n-1}{n}S^2$, the [[Maximum Likelihood Estimation|maximum likelihood estimator]] of $\sigma^2$ for a normal sample. Its expected value is

> $$E[\hat{\sigma}^2] = \frac{n-1}{n}\sigma^2$$

The estimator $\hat{\sigma}^2$ underestimates $\sigma^2$ by $\sigma^2/n$ on average, and this [[Bias|bias]] goes to 0 as $n$ grows. For a normal sample, $\hat{\sigma}^2$ has a smaller [[Mean Square Error|mean square error]] than $S^2$, because its smaller variance outweighs its squared bias.

> [!example]- A random sample of 10 observations is drawn from a normal distribution with variance 50. What are the bias and the mean square error of $S^2$ and of $\hat{\sigma}^2$? {Example}
> - $S^2$ is unbiased. For a normal sample $\text{Var}(S^2) = 2\sigma^4/(n-1) = 2 \times 2{,}500/9 = 555.6$, which is its mean square error.
> - $E[\hat{\sigma}^2] = 0.9 \times 50 = 45$, so the bias of $\hat{\sigma}^2$ is $-5$.
> - $\text{Var}(\hat{\sigma}^2) = 0.9^2 \times 555.6 = 450$, so the mean square error of $\hat{\sigma}^2$ is $450 + (-5)^2 = 475$.
> - The biased estimator $\hat{\sigma}^2$ has the smaller mean square error.

## Sample variance of a normal sample

For a random sample from a normal distribution, the sample variance is independent of the sample mean, and

> $$\frac{(n-1)S^2}{\sigma^2} \sim \chi^2(n-1)$$

- $\chi^2(n-1)$ is the [[Chi-Squared Distribution|chi-squared distribution]] with $n - 1$ degrees of freedom.

> [!example]- A random sample of 10 observations is drawn from a normal distribution with variance 4. What value does the sample variance exceed with probability 0.05? {Example}
> - $9S^2/4$ has a chi-squared distribution with 9 degrees of freedom.
> - The value that $\chi^2(9)$ exceeds with probability 0.05 is 16.92.
> - The sample variance exceeds $16.92 \times 4/9 = 7.52$ with probability 0.05.

> [!trap] Dividing by $n$ for an unbiased estimate
> Dividing the sum of squared deviations by $n$ gives $\hat{\sigma}^2$, which underestimates $\sigma^2$ on average. For the five claims above it gives $154/5 = 30.8$, not the unbiased estimate 38.5.
