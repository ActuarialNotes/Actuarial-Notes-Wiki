---
verification:
  status: verified
  confidence: medium
  last_checked: 2026-10-05
  last_checked_by: agent:validate-v1
  content_hash: sha256:9d2fe1627ad142db1ffd8627096e290c40b945b811cc5cb3d9efa7119f0b67ce
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

A **Random Sample** of size $n$ from a distribution with density $f(x \mid \theta)$ is a set of [[Independent and Identically Distributed|independent and identically distributed]] random variables $X_1, \ldots, X_n$, each with that distribution; the observed values $x_1, \ldots, x_n$ are the data. Functions of the sample that involve no unknown parameter — **statistics** — are what estimate the population's features.

> $$f(x_1, \ldots, x_n \mid \theta) = \prod_{i=1}^{n} f(x_i \mid \theta)$$

> $$\bar{X} = \frac{1}{n}\sum_{i=1}^{n} X_i$$

> $$S^2 = \frac{1}{n-1}\sum_{i=1}^{n} \left(X_i - \bar{X}\right)^2$$

- $\theta$ is the unknown population parameter. Read as a function of $\theta$ with the data plugged in, the product is the likelihood behind [[Maximum Likelihood Estimation]]; matching sample moments to population ones instead is the [[Method of Moments]].
- The [[Sample Mean]] and [[Sample Variance]] estimate $\mu$ and $\sigma^2$ [[Unbiasedness|without bias]]: $E[\bar{X}] = \mu$, $\text{Var}(\bar{X}) = \sigma^2/n$ and $E[S^2] = \sigma^2$. The estimated standard error of $\bar{X}$ is $S/\sqrt{n}$.
- Population quantities ($\mu$, $\sigma^2$, $\theta$) are fixed and unknown; statistics are random variables with a [[Sampling Distribution]] of their own.
- Sorting the sample gives the [[Order Statistics]] $X_{(1)} \le \cdots \le X_{(n)}$: the sample minimum, maximum, median and empirical percentiles. Their distributions come from counting how many observations fall below $x$ — a binomial$(n, F(x))$ count — so, for example, $P(X_{(n)} \le x) = F(x)^n$.
- **When data are not a random sample.** Claims from one catastrophe, or several years of one insured, are dependent ([[Clustered Data]]). Claims recorded only above a deductible come from a conditional distribution ([[Truncation]]), and claims capped at a policy limit are [[Censoring|censored]]. Each breaks the product formula and must be modelled explicitly.

> [!example]- Estimating Mean and Variance from Six Claims {Example}
> Six claims (in \$000s) are $2, 5, 6, 9, 13, 19$. Estimate the mean, the variance and the standard error of the mean, and find the sample median.
>
> > [!answer]-
> > $$
> > \begin{align*}
> > \bar{x} &= \frac{54}{6} \\
> >         &= 9 \\
> > \sum x_i^2 &= 4 + 25 + 36 + 81 + 169 + 361 \\
> >            &= 676 \\
> > s^2 &= \frac{676 - 6(9)^2}{6 - 1} \\
> >     &= \frac{190}{5} \\
> >     &= 38
> > \end{align*}
> > $$
> > So $s = 6.16$ and the standard error of $\bar{x}$ is $6.16/\sqrt{6} = 2.52$. The sample median is the average of the third and fourth order statistics, $(6 + 9)/2 = 7.5$.
> >
> > The mean claim is estimated at \$9,000, give or take about \$2,500. The median of \$7,500 sitting below the mean is the right skew typical of severity data.

> [!example]- Sample Median of Five Exponential Claims {Example}
> Five claims are a random sample from an exponential distribution with mean \$1,000. Find the probability that the sample median exceeds the population mean.
>
> > [!answer]-
> > The median is $X_{(3)}$. It exceeds 1,000 exactly when at most 2 of the 5 claims are at or below 1,000. Each claim is, independently, with probability $p = F(1{,}000) = 1 - e^{-1} = 0.6321$, so the count is binomial$(5, p)$ with $1 - p = e^{-1}$:
> > $$
> > \begin{align*}
> > P(X_{(3)} > 1{,}000) &= \sum_{j=0}^{2} \binom{5}{j} p^j (1-p)^{5-j} \\
> >                      &= 0.0067 + 0.0579 + 0.1989 \\
> >                      &= 0.2636
> > \end{align*}
> > $$
> > The sample median lands above the true mean only about 26% of the time. It estimates the population *median*, $1{,}000 \ln 2 = 693$, not the mean — a right-skewed sample's median is the wrong statistic for pricing.
