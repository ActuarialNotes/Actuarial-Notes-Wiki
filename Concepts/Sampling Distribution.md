---
verification:
  status: stale
  confidence: null
  last_checked: 2026-10-05
  last_checked_by: agent:validate-v1
  content_hash: sha256:a15e6436dcc5ddc3d3efed0d0dd441244297f9c5558c40538b998f800a5e7ea6
  sources:
    - "CAS Exam MAS-I Content Outline 2026 (MASI_CO_2026_F v06, 2026-06-29), Domain B tasks 1 (estimate mean and variance), 2 (sufficient statistic), 4 (critical values from a sampling distribution), 7 (order statistics), 8 (MLE; consistency, unbiasedness, sufficiency, efficiency, minimum variance, MSE; censoring and truncation), 9 (PDF p.4); Hogg Domain B §§4.1, 5.1, 6.1–6.5, 7.1–7.6 and Tse §§12.1, 12.3 (PDF p.6), sha256:245892366dea073ff44e89b3ac2ae1401517b127d36d51c8a1198b3185faa2ed — https://www.casact.org/sites/default/files/2026-06/MASI_ContentOutline_2026.pdf"
    - "Siegrist, Probability, Mathematical Statistics, and Stochastic Processes (Random), §5.1 Random Samples — Introduction (random sample = iid sequence; a statistic is an observable function of the data and is a random variable with its own distribution), sha256:0af72fbf0202413525cae99e696cfa70014a803d6c5ac7a7dcafd1577742414f — https://www.randomservices.org/random/sample/Introduction.html"
    - "Siegrist, Random, §5.4 The Central Limit Theorem (M_n approximately normal with mean μ and variance σ²/n for large n), sha256:ee6dc9f8e9feb14f19f96a0206c3289a4aedfc014f5e3dabf79422e1dc29f9e3 — https://www.randomservices.org/random/sample/CLT.html"
    - "Siegrist, Random, §5.8 Special Properties of Normal Samples (M ~ normal(μ, σ²/n); M and S² independent; (n−1)S²/σ² chi-square n−1; var(S²) = 2σ⁴/(n−1); T ~ t_{n−1}; two independent normal samples: variance ratio ~ F_{m−1,n−1}), sha256:d9a62017ae3a8488aedac3eceedb15d8b68243ae60894104ab88564ace25ff79 — https://www.randomservices.org/random/sample/Normal.html"
    - "CAS Exam MAS-I Tables, 'Lower-tail areas for Chi-square distributions', df 24, 0.950 column = 36.42 (PDF p.20), sha256:cb5674138a67f7a498b8cc90357144fd121cbcbbc7487f214557b105611a69b4 — https://www.casact.org/sites/default/files/2021-03/masi_tables.pdf"
  open_findings: 0
  open_critical: 0
  log: .verify/Concepts/Sampling Distribution.md
---

![[Media/Figures/Sampling_Distribution.svg|340]]

A **Sampling Distribution** is the probability distribution of a [[Statistics|statistic]], such as the [[Sample Mean|sample mean]] $\bar{X}$ or the [[Sample Variance|sample variance]] $S^2$, computed from a [[Random Sample|random sample]] of size $n$. The standard deviation of the sampling distribution of an [[Estimator|estimator]] is its standard error.

For a random sample from a [[Normal Distribution|normal distribution]] with mean $\mu$ and variance $\sigma^2$, the sampling distributions used to test means and variances are:

| Statistic | Sampling distribution | Used to test |
| --- | --- | --- |
| $\dfrac{\bar{X} - \mu}{\sigma/\sqrt{n}}$ | Standard normal | A mean, $\sigma$ known |
| $\dfrac{\bar{X} - \mu}{S/\sqrt{n}}$ | $t(n-1)$ | A mean, $\sigma$ unknown |
| $\dfrac{(n-1)S^2}{\sigma^2}$ | $\chi^2(n-1)$ | A variance |
| $\dfrac{S_1^2/\sigma_1^2}{S_2^2/\sigma_2^2}$ | $F(n_1 - 1, n_2 - 1)$ | Two variances |

- $S_1^2$ and $S_2^2$ are the sample variances of two independent normal samples of sizes $n_1$ and $n_2$, from distributions with variances $\sigma_1^2$ and $\sigma_2^2$.

The last three are the [[Student's t-Distribution|t-distribution]], the [[Chi-Squared Distribution|chi-squared distribution]] and the [[F-Distribution|F-distribution]].

> [!example]- A random sample of 9 claim amounts from a normal distribution has $\bar{x} = 1{,}080$ and $s = 120$. What is the observed statistic for testing $\mu = 1{,}000$, and what is its sampling distribution? {Example}
> - The standard deviation $\sigma$ is unknown, so the statistic uses the sample standard deviation.
> - The observed statistic is $(1{,}080 - 1{,}000)/(120/\sqrt{9}) = 80/40 = 2.0$.
> - If $\mu = 1{,}000$, the statistic has a $t$-distribution with $9 - 1 = 8$ degrees of freedom.

## Approximate sampling distribution of the sample mean

For a random sample from any distribution with mean $\mu$ and finite variance $\sigma^2$, the [[Central Limit Theorem#The sample mean|central limit theorem]] makes the sampling distribution of $\bar{X}$ approximately normal for large $n$, with mean $\mu$ and standard error $\sigma/\sqrt{n}$.

> [!example]- Claims have mean 2,000 and standard deviation 400. For a random sample of 64 claims, what is the approximate probability that the sample mean is between 1,900 and 2,100? {Example}
> - The standard error is $400/\sqrt{64} = 50$.
> - The bounds standardize to $(1{,}900 - 2{,}000)/50 = -2$ and $(2{,}100 - 2{,}000)/50 = 2$.
> - The probability is approximately $P(-2 < Z < 2) = 0.9545$.
