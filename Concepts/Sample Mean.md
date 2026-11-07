---
verification:
  status: stale
  confidence: null
  last_checked: 2026-10-05
  last_checked_by: agent:validate-v1
  content_hash: sha256:6bc2d2e514b05f5cb09a9cbee8c81d23e4bbeccf6ff8ded4a556c926c501724e
  sources:
    - "CAS Exam MAS-I Content Outline 2026 (MASI_CO_2026_F v06, 2026-06-29), Domain B tasks 1 (estimate mean and variance), 2 (sufficient statistic), 4 (critical values from a sampling distribution), 7 (order statistics), 8 (MLE; consistency, unbiasedness, sufficiency, efficiency, minimum variance, MSE; censoring and truncation), 9 (PDF p.4); Hogg Domain B §§4.1, 5.1, 6.1–6.5, 7.1–7.6 and Tse §§12.1, 12.3 (PDF p.6), sha256:245892366dea073ff44e89b3ac2ae1401517b127d36d51c8a1198b3185faa2ed — https://www.casact.org/sites/default/files/2026-06/MASI_ContentOutline_2026.pdf"
    - "Siegrist, Random, §5.2 The Sample Mean (definition; outlier exercise: dropping one score of 10 moves the mean 64 → 66.25), sha256:e21a3da7773a6f7f925b4cb0c583d5331abb1656fe01ed952c8d42b26f238cab — https://www.randomservices.org/random/sample/Mean.html"
    - "Siegrist, Random, §5.4 The Central Limit Theorem (M_n approximately normal with mean μ and variance σ²/n for large n), sha256:ee6dc9f8e9feb14f19f96a0206c3289a4aedfc014f5e3dabf79422e1dc29f9e3 — https://www.randomservices.org/random/sample/CLT.html"
    - "Siegrist, Random, §5.8 Special Properties of Normal Samples (M ~ normal(μ, σ²/n); M and S² independent; (n−1)S²/σ² chi-square n−1; var(S²) = 2σ⁴/(n−1); T ~ t_{n−1}; two independent normal samples: variance ratio ~ F_{m−1,n−1}), sha256:d9a62017ae3a8488aedac3eceedb15d8b68243ae60894104ab88564ace25ff79 — https://www.randomservices.org/random/sample/Normal.html"
    - "Siegrist, Random, §6.1 Estimators (bias, mse = var + bias², mean-square consistency ⇒ consistency, E(M) = μ, var(M) = σ²/n), sha256:10914ffca9034209da0111918cfb534d60982bde0bba142a11d61d43114c6e2a — https://www.randomservices.org/random/point/Estimators.html"
    - "Siegrist, Random, §6.3 Maximum Likelihood (likelihood = pdf with roles reversed; log-likelihood; interior vs boundary maxima; invariance; Bernoulli/Poisson/normal/gamma MLEs; Uniform[0,h]: MLE X_(n), mse 2h²/((n+1)(n+2)), (n+1)X_(n)/n unbiased with var h²/(n(n+2)); Uniform[a,a+1]: MLE not unique), sha256:f8c94e3de84f7a025fd32395169938f37e7fd7958d5a8be9d56b54ed307d6ffd — https://www.randomservices.org/random/point/Likelihood.html"
    - "Siegrist, Random, §6.5 Best Unbiased Estimators (UMVUE; Cramér–Rao bound under the interchange assumption, support not depending on θ; (dλ/dθ)²/(n E[l²]) and the second-derivative form; equality iff h(X) = λ(θ) + u(θ)L1; Bernoulli, Poisson (θ/n), normal (M attains σ²/n), gamma; Uniform[0,a]: assumption fails, theorem does not apply), sha256:0d9765c5c7b5b8a54b29fc45c3a435d20e2a9200e027609658345087dedcd531 — https://www.randomservices.org/random/point/Unbiased.html"
    - "Siegrist, Random, §6.6 Sufficient, Complete and Ancillary Statistics (definition via the conditional distribution; Fisher–Neyman factorization; MLE vs sufficient statistic; Rao–Blackwell; Lehmann–Scheffé; Bernoulli, Poisson (UMVUE ((n−1)/n)^Y of e^{−θ}), normal, gamma, uniform; exponential family natural statistic minimally sufficient and complete), sha256:4d7402f2a960ea2b4232e57e4ee5992ac29801b9269f300f17f8e83074d5a0e4 — https://www.randomservices.org/random/point/Sufficient.html"
    - "Goldburd, Khare, Tevet & Guller, Generalized Linear Models for Insurance Rating, CAS Monograph 5 (2nd ed.), §2.5 Weights (a row that averages several risks gets weight w, variance φV(μ)/w) and §2.6 Exposure Offsets (log-exposure offset in a count model is equivalent to a frequency model weighted by exposure), PDF pp.26–28, sha256:89b203ea55208911c4d8f6ef1ede4dd6c0206d47999b5e8aff96fe233c0ff757 — https://www.casact.org/sites/default/files/2021-01/05-Goldburd-Khare-Tevet.pdf"
    - "Siegrist, Random, §5.6 Order Statistics (boxplot drawn from the five-number summary: minimum, q1, median, q3, maximum; 'quantiles can be relatively insensitive to changes in the data'), sha256:19ff485c600d4294e888c1b3d05ff7eb9196449f958d3325fd72b416aca56d63 — https://www.randomservices.org/random/sample/OrderStatistics.html"
  open_findings: 0
  open_critical: 0
  log: .verify/Concepts/Sample Mean.md
---

![[Media/Figures/Sample_Mean.svg|340]]

A **Sample Mean** is the average of the observations in a [[Random Sample|random sample]], and it is the usual [[Estimator|estimator]] of the mean $\mu$ of the distribution. The sample mean $\bar{X}$ of a random sample $X_1, \ldots, X_n$ is

> $$\bar{X} = \frac{1}{n}\sum_{i=1}^{n} X_i$$

The sample mean is not resistant to extreme observations. One large claim can move it by any amount, so for heavy-tailed claim data the sample mean and the other sample moments are erratic.

> [!example]- Five claims, in thousands, are 4, 6, 7, 9 and 9. What is the sample mean? {Example}
> - The sum of the observations is $4 + 6 + 7 + 9 + 9 = 35$.
> - The sample mean is $\bar{x} = 35/5 = 7$, or 7,000.

## Mean and variance of the sample mean

If each observation has mean $\mu$ and variance $\sigma^2$, the mean of the sample mean is

> $$E[\bar{X}] = \mu$$

and its variance is

> $$\text{Var}(\bar{X}) = \frac{\sigma^2}{n}$$

These hold whatever the shape of the distribution. The standard deviation of the sample mean, $\sigma/\sqrt{n}$, is its **standard error**. When $\sigma$ is unknown, the standard error is estimated by $S/\sqrt{n}$, where $S$ is the sample standard deviation from the [[Sample Variance|sample variance]]. Halving the standard error requires four times the number of observations.

> [!example]- Claim counts $X_1, \ldots, X_{50}$ are a random sample from a Poisson distribution with mean $\lambda = 0.3$. What is the variance of the estimator $\frac{2}{50}\sum_{i=1}^{50} X_i$ of $2\lambda$? {Example}
> - The estimator is $2\bar{X}$, twice the sample mean.
> - A Poisson distribution has variance $\lambda = 0.3$, so $\text{Var}(\bar{X}) = 0.3/50 = 0.006$.
> - Multiplying by 2 multiplies the variance by 4, so the variance of the estimator is $4 \times 0.006 = 0.024$.

## Distribution of the sample mean

For a random sample from a [[Normal Distribution|normal distribution]], the sample mean is exactly normal with mean $\mu$ and variance $\sigma^2/n$, and it is independent of the sample variance $S^2$. For a random sample from any distribution with finite variance, the [[Central Limit Theorem#The sample mean|central limit theorem]] makes the sample mean approximately normal for large $n$. In either case, the standardized sample mean is

> $$Z = \frac{\bar{X} - \mu}{\sigma/\sqrt{n}}$$

- $Z$ is standard normal for a normal sample, and approximately standard normal for a large sample from any distribution.

> [!example]- A random sample of 100 claims is drawn from a distribution with mean 5,000 and standard deviation 1,500. What is the approximate probability that the sample mean exceeds 5,300? {Example}
> - The standard error is $1{,}500/\sqrt{100} = 150$.
> - The standardized value is $z = (5{,}300 - 5{,}000)/150 = 2.00$.
> - The probability is approximately $P(Z > 2.00) = 1 - 0.9772 = 0.0228$.

> [!example]- Claim sizes have standard deviation 1,500. What is the smallest number of claims for which the sample mean is within 100 of $\mu$ with probability at least 0.95? {Example}
> - The sample mean is within 100 of $\mu$ when $|Z| \le 100\sqrt{n}/1{,}500$.
> - This has probability at least 0.95 when $100\sqrt{n}/1{,}500 \ge 1.96$, that is, when $n \ge (1.96 \times 15)^2 = 864.36$.
> - The number of claims is a whole number, so the smallest is $n = 865$.

> [!trap] Dividing the standard deviation by $n$
> The standard error of the sample mean is $\sigma/\sqrt{n}$, not $\sigma/n$. With $\sigma = 1{,}500$ and $n = 100$ it is 150. Dividing by $n$ gives 15 and a probability far too small.
