---
verification:
  status: stale
  confidence: null
  last_checked: 2026-10-05
  last_checked_by: agent:validate-v1
  content_hash: sha256:c6081c09edcdf88258f9158375e997090b7c44afa7e4c47fd9ce089bb16118b7
  sources:
    - "CAS Exam MAS-I Content Outline 2026 (MASI_CO_2026_F v06, 2026-06-29), Domain B tasks 1 (estimate mean and variance), 2 (sufficient statistic), 4 (critical values from a sampling distribution), 7 (order statistics), 8 (MLE; consistency, unbiasedness, sufficiency, efficiency, minimum variance, MSE; censoring and truncation), 9 (PDF p.4); Hogg Domain B §§4.1, 5.1, 6.1–6.5, 7.1–7.6 and Tse §§12.1, 12.3 (PDF p.6), sha256:245892366dea073ff44e89b3ac2ae1401517b127d36d51c8a1198b3185faa2ed — https://www.casact.org/sites/default/files/2026-06/MASI_ContentOutline_2026.pdf"
    - "Siegrist, Probability, Mathematical Statistics, and Stochastic Processes (Random), §5.1 Random Samples — Introduction (random sample = iid sequence; a statistic is an observable function of the data and is a random variable with its own distribution), sha256:0af72fbf0202413525cae99e696cfa70014a803d6c5ac7a7dcafd1577742414f — https://www.randomservices.org/random/sample/Introduction.html"
    - "Siegrist, Random, §5.5 The Sample Variance (divisor n − 1, n − 1 free deviations, computing formula, E(S²) = σ², var(S²) = (σ4 − (n−3)σ⁴/(n−1))/n; outlier exercise: s 16 → 11.62 when one score is dropped), sha256:452e2841007fad173229a9bb069a4acdda8e0d0bc6c1632f7239ef585248b0c6 — https://www.randomservices.org/random/sample/Variance.html"
    - "Siegrist, Random, §5.6 Order Statistics (sample median, even-n midpoint; N_x ~ binomial(n, F(x)) gives the order-statistic CDFs; boxplot = five-number summary), sha256:19ff485c600d4294e888c1b3d05ff7eb9196449f958d3325fd72b416aca56d63 — https://www.randomservices.org/random/sample/OrderStatistics.html"
    - "Siegrist, Random, §5.8 Special Properties of Normal Samples (M ~ normal(μ, σ²/n); M and S² independent; (n−1)S²/σ² chi-square n−1; var(S²) = 2σ⁴/(n−1); T ~ t_{n−1}; two independent normal samples: variance ratio ~ F_{m−1,n−1}), sha256:d9a62017ae3a8488aedac3eceedb15d8b68243ae60894104ab88564ace25ff79 — https://www.randomservices.org/random/sample/Normal.html"
    - "Siegrist, Random, §6.1 Estimators (bias, mse = var + bias², mean-square consistency ⇒ consistency, E(M) = μ, var(M) = σ²/n), sha256:10914ffca9034209da0111918cfb534d60982bde0bba142a11d61d43114c6e2a — https://www.randomservices.org/random/point/Estimators.html"
    - "Siegrist, Random, §6.3 Maximum Likelihood (likelihood = pdf with roles reversed; log-likelihood; interior vs boundary maxima; invariance; Bernoulli/Poisson/normal/gamma MLEs; Uniform[0,h]: MLE X_(n), mse 2h²/((n+1)(n+2)), (n+1)X_(n)/n unbiased with var h²/(n(n+2)); Uniform[a,a+1]: MLE not unique), sha256:f8c94e3de84f7a025fd32395169938f37e7fd7958d5a8be9d56b54ed307d6ffd — https://www.randomservices.org/random/point/Likelihood.html"
    - "Frees et al., Loss Data Analytics (open textbook), §3.5.2 MLE using modified data: a right-censored value contributes S(u), data truncated at d contribute f(x)/S(d), both S(u)/S(d), sha256:263021bf543b04b2881284b38b7dcbd0586b78daec371b88a1eefcd362dff732 — https://openacttexts.github.io/Loss-Data-Analytics/ChapSeverity.html"
  open_findings: 0
  open_critical: 0
  log: .verify/Concepts/Random Sample.md
---

A **Random Sample** of size $n$ from a distribution is a set of $n$ [[Independent and Identically Distributed|independent and identically distributed]] random variables $X_1, \ldots, X_n$, each with that distribution. The observed values $x_1, \ldots, x_n$ are the data. If each $X_i$ has density $f(x)$, the joint density of the random sample is

> $$f(x_1, x_2, \ldots, x_n) = f(x_1) \times f(x_2) \times \cdots \times f(x_n)$$

For a discrete distribution, $f(x)$ is the probability function and the product is the joint probability function. Because the observations are independent, the probability that every observation satisfies a condition is the product of the probabilities that each one does.

> [!example]- Three claims are a random sample from an exponential distribution with mean 100. What is the probability that all three claims exceed 50? {Example}
> - For one claim, $P(X > 50) = e^{-50/100} = e^{-0.5}$.
> - The three claims are independent, so the probability that all three exceed 50 is the product of the three probabilities.
> - The probability is $\left(e^{-0.5}\right)^3 = e^{-1.5} = 0.2231$.

## The largest and smallest observations

The largest observation $X_{(n)}$ is at most $x$ exactly when every observation is at most $x$. If each observation has cdf $F(x)$, the cdf of the largest observation is

> $$P(X_{(n)} \le x) = F(x)^n$$

The smallest observation $X_{(1)}$ is greater than $x$ exactly when every observation is greater than $x$, so

> $$P(X_{(1)} > x) = \bigl(1 - F(x)\bigr)^n$$

The other [[Order Statistics|order statistics]] $X_{(k)}$ are found by counting how many observations fall at or below $x$.

> [!example]- Four losses are a random sample from a uniform distribution on $(0, 1{,}000)$. What is the probability that the largest loss is at most 900, and what is the probability that the smallest loss exceeds 200? {Example}
> - For one loss, $F(900) = 0.9$, so $P(X_{(4)} \le 900) = 0.9^4 = 0.6561$.
> - For one loss, $1 - F(200) = 0.8$, so $P(X_{(1)} > 200) = 0.8^4 = 0.4096$.

## Statistics computed from a random sample

The [[Sample Mean|sample mean]] $\bar{X}$ estimates the mean $\mu$ of the distribution, and the [[Sample Variance|sample variance]] $S^2$ estimates its variance $\sigma^2$. Each is a [[Statistics|statistic]], a random variable whose distribution is its [[Sampling Distribution|sampling distribution]].

> [!trap] Treating incomplete data as a random sample
> Claims recorded only above a deductible come from the conditional distribution of $X$ given $X > d$, so they are [[Truncation|truncated]]. Claims capped at a policy limit are [[Censoring|censored]]. Using $f(x)$ in the product for such data gives the wrong joint density.
