---
verification:
  status: stale
  confidence: null
  last_checked: 2026-10-30
  last_checked_by: agent:validate-v1
  content_hash: sha256:9a857c2105c2e5e6e1d9a865776d897099c75b69be7929304ad0db23acc14868
  sources:
    - "CAS Exam MAS-I Content Outline 2026 (MASI_CO_2026_F v06, 2026-06-29), Domain B tasks 1 (estimate mean and variance), 2 (sufficient statistic), 4 (critical values from a sampling distribution), 7 (order statistics), 8 (MLE; consistency, unbiasedness, sufficiency, efficiency, minimum variance, MSE; censoring and truncation), 9 (PDF p.4); Hogg Domain B §§4.1, 5.1, 6.1–6.5, 7.1–7.6 and Tse §§12.1, 12.3 (PDF p.6), sha256:245892366dea073ff44e89b3ac2ae1401517b127d36d51c8a1198b3185faa2ed — https://www.casact.org/sites/default/files/2026-06/MASI_ContentOutline_2026.pdf"
    - "Siegrist, Random, §6.2 Method of Moments (matching sample and distribution moments; mean/variance matching; T² bias −σ²/n and 'no simple, general relationship between mse(T²) and mse(S²)', T² smaller MSE for normal samples; negative binomial U = M²/(T² − M); uniform MoM 2M), sha256:43755b5bee6179fca8d7c1c964e7c6a9bb1a9de6f3916130100c69e666a3194e — https://www.randomservices.org/random/point/Moments.html"
    - "Siegrist, Random, §6.3 Maximum Likelihood (likelihood = pdf with roles reversed; log-likelihood; interior vs boundary maxima; invariance; Bernoulli/Poisson/normal/gamma MLEs; Uniform[0,h]: MLE X_(n), mse 2h²/((n+1)(n+2)), (n+1)X_(n)/n unbiased with var h²/(n(n+2)); Uniform[a,a+1]: MLE not unique), sha256:f8c94e3de84f7a025fd32395169938f37e7fd7958d5a8be9d56b54ed307d6ffd — https://www.randomservices.org/random/point/Likelihood.html"
    - "Siegrist, Random, §6.6 Sufficient, Complete and Ancillary Statistics (definition via the conditional distribution; Fisher–Neyman factorization; MLE vs sufficient statistic; Rao–Blackwell; Lehmann–Scheffé; Bernoulli, Poisson (UMVUE ((n−1)/n)^Y of e^{−θ}), normal, gamma, uniform; exponential family natural statistic minimally sufficient and complete), sha256:4d7402f2a960ea2b4232e57e4ee5992ac29801b9269f300f17f8e83074d5a0e4 — https://www.randomservices.org/random/point/Sufficient.html"
    - "Stanford STATS 200 (Autumn 2016), Lecture 15, Theorem 15.4 (Var[T] ≥ 1/(nI(θ)) for unbiased T, 'certain mild regularity assumptions'; Var of the sample score = nI(θ)) and p.15-4 (efficient = attains the bound; MLE asymptotically efficient; MoM expected to have higher MSE than the MLE for large n; biased estimators can beat the bound at special θ), sha256:7e9d32d62f5b6fe7374924822c86b27c81b36ee2b25ea596ca774f7678287247 — https://web.stanford.edu/class/archive/stats/stats200/stats200.1172/Lecture15.pdf"
    - "Frees et al., Loss Data Analytics, §4.1.3 Starting Values: MLE preferred as it uses data more efficiently; MoM and percentile matching supply starting values for the iterative MLE, sha256:c5fe1ff26cec4dee6f8bcc285b75c840202c947246f7b5d5598f9b837ccad021 — https://openacttexts.github.io/Loss-Data-Analytics/ChapModelSelection.html"
    - "Tse, Nonlife Actuarial Models (2009) — publisher preview, §1.5.1 Compound distribution: the pf needs convolutions ('in general tedious'), Theorem 1.6 gives E(S) and Var(S) from the moments of N and X 'without computing its pf' (printed pp.21–28, PDF pp.39–46), sha256:f6d009afdd1776907db090b41b72dd5a76d0b5ba3f0ee42e8b07279d5763b404 — https://api.pageplace.de/preview/DT0400.9780511630231_A24404031/preview-9780511630231_A24404031.pdf"
    - "Siegrist, Random, §5.2 The Sample Mean, Approximating the Mean: grouped data, approximate sample mean (1/n) sum n_j t_j with class marks t_j (midpoints), \"based on the hope that the mean of the data values in each class is close to the midpoint of that class\" — https://www.randomservices.org/random/sample/Mean.html"
  open_findings: 0
  open_critical: 0
  log: .verify/Concepts/Method of Moments.md
---

![[Media/Figures/Method_of_Moments.svg|340]]

The **Method of Moments** is a method of [[Parameter Estimation|parameter estimation]] that sets the [[Moment|moments]] of a distribution equal to the corresponding moments of the sample and solves for the parameters. For a distribution with $k$ unknown parameters and a sample $x_1, \ldots, x_n$, the $k$ equations are

> $$E[X^r] = \frac{1}{n}\sum_{i=1}^{n} x_i^r$$

- $E[X^r]$ is the $r$th raw moment of the distribution, written in terms of its parameters.
- $\frac{1}{n}\sum x_i^r$ is the $r$th raw moment of the sample.
- $r = 1, 2, \ldots, k$.

A parameter whose value is given rather than estimated needs no equation. Method of moments estimates are easy to compute, and they are used as starting values for the numerical search for a [[Maximum Likelihood Estimation|maximum likelihood estimate]].

> [!example]- Losses follow a [[Pareto Distribution|Pareto distribution]] with $\alpha = 3$ and unknown $\theta$, so $E[X] = \theta/(\alpha - 1)$. The sample mean of the losses is 500. What is the method of moments estimate of $\theta$? {Example}
> - There is one unknown parameter, so one equation is needed: $E[X] = \bar{x}$.
> - The equation is $\theta/2 = 500$.
> - The method of moments estimate is $\hat{\theta} = 1{,}000$.

## Matching the mean and the variance

For two parameters, the first two moment equations are equivalent to setting the mean of the distribution equal to $\bar{x}$ and its variance equal to

> $$\hat{\sigma}^2 = \frac{1}{n}\sum_{i=1}^{n} x_i^2 - \bar{x}^2$$

- $\hat{\sigma}^2$ divides by $n$, not by $n - 1$ as the [[Sample Variance|sample variance]] $S^2$ does.

> [!example]- A random sample of 10 values from a normal distribution has $\sum x_i = 100$ and $\sum x_i^2 = 2{,}000$. What is the method of moments estimate of the variance? {Example}
> - The first sample moment is $\bar{x} = 100/10 = 10$.
> - The second sample moment is $2{,}000/10 = 200$.
> - The estimate of the variance is $\hat{\sigma}^2 = 200 - 10^2 = 100$.

For a [[Gamma|gamma distribution]] with $E[X] = \alpha\theta$ and $\text{Var}(X) = \alpha\theta^2$, dividing the variance equation by the mean equation gives

> $$\hat{\theta} = \frac{\hat{\sigma}^2}{\bar{x}}$$

> $$\hat{\alpha} = \frac{\bar{x}}{\hat{\theta}}$$

> [!example]- Claim amounts have a sample mean of 500 and $\hat{\sigma}^2 = 125{,}000$. What are the method of moments estimates of the parameters of a gamma distribution? {Example}
> - The scale estimate is $\hat{\theta} = 125{,}000/500 = 250$.
> - The shape estimate is $\hat{\alpha} = 500/250 = 2$.

## Grouped data

For [[Grouped Data|grouped data]], only the number of observations $n_j$ in each interval $(c_{j-1}, c_j]$ is known. If the values are assumed uniform within each interval, the sample mean is

> $$\bar{x} = \frac{1}{n}\sum_j n_j\, t_j$$

- $t_j = (c_{j-1} + c_j)/2$ is the midpoint of interval $j$.

> [!example]- Of 100 losses, 60 are in $(0, 1{,}000]$, 30 are in $(1{,}000, 3{,}000]$ and 10 are in $(3{,}000, 5{,}000]$. Losses are uniform within each interval. An exponential distribution is fitted by the method of moments. What is the fitted probability that a loss exceeds 2,000? {Example}
> - The midpoints of the intervals are 500, 2,000 and 4,000.
> - The counts multiplied by the midpoints are 30,000, 60,000 and 40,000, which sum to 130,000.
> - The sample mean is $130{,}000/100 = 1{,}300$.
> - The exponential mean equals the sample mean, so $\hat{\theta} = 1{,}300$.
> - The fitted probability is $e^{-2{,}000/1{,}300} = 0.2147$.

> [!trap] An estimate below the largest observation
> The method of moments ignores which values of a parameter the data allow. For a uniform distribution on $(0, \theta)$, $E[X] = \theta/2$, so the estimate is $2\bar{x}$. A sample with $\bar{x} = 6$ and largest value 14 gives $\hat{\theta} = 12$, which is impossible because a value of 14 was observed. The [[Maximum Likelihood Estimation#Maximum at a boundary|maximum likelihood estimate]] is the largest observation, 14.
