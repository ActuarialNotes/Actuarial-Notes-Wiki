---
verification:
  status: stale
  confidence: null
  last_checked: 2026-10-05
  last_checked_by: agent:validate-v1
  content_hash: sha256:9073f080516dfe0514e926e86200573771d8bc7d6678711bd28150676aaaa738
  sources:
    - "CAS Exam MAS-I Content Outline 2026 (MASI_CO_2026_F v06, 2026-06-29), Domain B tasks 1 (estimate mean and variance), 2 (sufficient statistic), 4 (critical values from a sampling distribution), 7 (order statistics), 8 (MLE; consistency, unbiasedness, sufficiency, efficiency, minimum variance, MSE; censoring and truncation), 9 (PDF p.4); Hogg Domain B §§4.1, 5.1, 6.1–6.5, 7.1–7.6 and Tse §§12.1, 12.3 (PDF p.6), sha256:245892366dea073ff44e89b3ac2ae1401517b127d36d51c8a1198b3185faa2ed — https://www.casact.org/sites/default/files/2026-06/MASI_ContentOutline_2026.pdf"
    - "Siegrist, Random, §6.3 Maximum Likelihood (likelihood = pdf with roles reversed; log-likelihood; interior vs boundary maxima; invariance; Bernoulli/Poisson/normal/gamma MLEs; Uniform[0,h]: MLE X_(n), mse 2h²/((n+1)(n+2)), (n+1)X_(n)/n unbiased with var h²/(n(n+2)); Uniform[a,a+1]: MLE not unique), sha256:f8c94e3de84f7a025fd32395169938f37e7fd7958d5a8be9d56b54ed307d6ffd — https://www.randomservices.org/random/point/Likelihood.html"
    - "Siegrist, Random, §6.5 Best Unbiased Estimators (UMVUE; Cramér–Rao bound under the interchange assumption, support not depending on θ; (dλ/dθ)²/(n E[l²]) and the second-derivative form; equality iff h(X) = λ(θ) + u(θ)L1; Bernoulli, Poisson (θ/n), normal (M attains σ²/n), gamma; Uniform[0,a]: assumption fails, theorem does not apply), sha256:0d9765c5c7b5b8a54b29fc45c3a435d20e2a9200e027609658345087dedcd531 — https://www.randomservices.org/random/point/Unbiased.html"
    - "Siegrist, Random, §6.6 Sufficient, Complete and Ancillary Statistics (definition via the conditional distribution; Fisher–Neyman factorization; MLE vs sufficient statistic; Rao–Blackwell; Lehmann–Scheffé; Bernoulli, Poisson (UMVUE ((n−1)/n)^Y of e^{−θ}), normal, gamma, uniform; exponential family natural statistic minimally sufficient and complete), sha256:4d7402f2a960ea2b4232e57e4ee5992ac29801b9269f300f17f8e83074d5a0e4 — https://www.randomservices.org/random/point/Sufficient.html"
    - "Stanford STATS 200 (Autumn 2016), Lecture 14, Theorem 14.1 and its regularity conditions (common support, interior θ0, differentiable log-likelihood, unique score root); I(θ) per observation = Var[z] = −E[z′], pp.14-1–14-2, sha256:bca5236cb18dfe151c931cf0087de47939ab0795ef1a232ed782929f7fa34d7d — https://web.stanford.edu/class/archive/stats/stats200/stats200.1172/Lecture14.pdf"
    - "Stanford STATS 200 (Autumn 2016), Lecture 15, Theorem 15.4 (Var[T] ≥ 1/(nI(θ)) for unbiased T, 'certain mild regularity assumptions'; Var of the sample score = nI(θ)) and p.15-4 (efficient = attains the bound; MLE asymptotically efficient; MoM expected to have higher MSE than the MLE for large n; biased estimators can beat the bound at special θ), sha256:7e9d32d62f5b6fe7374924822c86b27c81b36ee2b25ea596ca774f7678287247 — https://web.stanford.edu/class/archive/stats/stats200/stats200.1172/Lecture15.pdf"
    - "Wikipedia, 'Efficiency (statistics)' (fetched 2026-10-05): e(T) = (1/I(θ))/var(T) for an unbiased estimator T, I the sample Fisher information; an efficient estimator is the MVUE, sha256:f3baa00ac8a8d31a872a6f9d3a44610eca510d677fd167845ebf24948621e97f — https://en.wikipedia.org/wiki/Efficiency_(statistics)"
  open_findings: 0
  open_critical: 0
  log: ".verify/Concepts/Cramér-Rao Lower Bound.md"
---

The **Cramér-Rao Lower Bound** is a lower bound on the variance of an [[Unbiasedness|unbiased]] estimator of a parameter. For an unbiased estimator $\hat{\theta}$ of $\theta$ from a [[Random Sample|random sample]] of size $n$, the bound is

> $$\text{Var}(\hat{\theta}) \ge \frac{1}{n\,I(\theta)}$$

- $I(\theta)$ is the [[Fisher Information|Fisher information]] of one observation.
- The support of the density $f(x \mid \theta)$ does not depend on $\theta$.

The bound does not apply to a uniform distribution on $(0, \theta)$, whose support depends on $\theta$.

> [!example]- Claim counts on 100 policies are independent and Poisson with mean $\lambda$. What is the Cramér-Rao lower bound for an unbiased estimator of $\lambda$, and does $\bar{X}$ attain it? {Example}
> - The Fisher information of a Poisson observation is $I(\lambda) = 1/\lambda$.
> - The bound is $\frac{1}{100/\lambda} = \frac{\lambda}{100}$.
> - $\bar{X}$ is unbiased, and $\text{Var}(\bar{X}) = \lambda/100$.
> - $\bar{X}$ attains the bound.

## Estimating a function of the parameter

For an unbiased estimator $T$ of a function $g(\theta)$, such as a probability or a mean, the bound is

> $$\text{Var}(T) \ge \frac{\left[g'(\theta)\right]^2}{n\,I(\theta)}$$

> [!example]- Claim counts on 100 policies are independent and Poisson with mean $\lambda = 0.2$. What is the Cramér-Rao lower bound for an unbiased estimator of the probability of no claims, $e^{-\lambda}$? {Example}
> - With $g(\lambda) = e^{-\lambda}$, the derivative is $g'(\lambda) = -e^{-\lambda}$, so $[g'(\lambda)]^2 = e^{-2\lambda}$.
> - With $I(\lambda) = 1/\lambda$, the bound is $\lambda e^{-2\lambda}/n$.
> - At $\lambda = 0.2$ and $n = 100$, the bound is $0.2\,e^{-0.4}/100 = 0.0013406$.

## Efficiency

An unbiased estimator whose variance equals the bound is [[Efficiency|efficient]], and it has the [[Minimum Variance|minimum variance]] of all unbiased estimators. The efficiency of an unbiased estimator $\hat{\theta}$ is

> $$\frac{1/[n\,I(\theta)]}{\text{Var}(\hat{\theta})}$$

Often no unbiased estimator attains the bound, and then the best one has an efficiency below 1.

> [!example]- Claim sizes follow a [[Pareto Distribution|Pareto distribution]] with known $\theta$ and unknown $\alpha$, with density $f(x) = \alpha\theta^\alpha/(x + \theta)^{\alpha + 1}$. With $G = \sum \ln\left((x_i + \theta)/\theta\right)$, the maximum likelihood estimate of $\alpha$ is $n/G$, and $(n - 1)/G$ is unbiased with variance $\alpha^2/(n - 2)$. What is the efficiency of $(n - 1)/G$ for $n = 20$ and $\alpha = 3$? {Example}
> - The log-density is $\ln\alpha + \alpha\ln\theta - (\alpha + 1)\ln(x + \theta)$, and its second derivative in $\alpha$ is $-1/\alpha^2$.
> - The Fisher information is $I(\alpha) = 1/\alpha^2$, so the bound is $\alpha^2/n = 9/20 = 0.45$.
> - The variance of the estimator is $\alpha^2/(n - 2) = 9/18 = 0.5$.
> - The efficiency is $0.45/0.5 = 0.9$.

## Biased estimators

The bound applies only to unbiased estimators. A biased estimator can have a variance below the bound, and also a smaller [[Mean Square Error|mean square error]] than every unbiased estimator. For exponential claim sizes with mean $\theta$ and $n = 20$, the bound is $\theta^2/20 = 0.05\,\theta^2$, which $\bar{X}$ attains. The biased estimator $\sum X_i/21$ has variance $20\theta^2/441 = 0.0454\,\theta^2$ and mean square error $21\theta^2/441 = 0.0476\,\theta^2$.

> [!trap] Applying the bound to a biased estimator
> A variance below the Cramér-Rao lower bound does not mean an error when the estimator is biased. Check that the estimator is unbiased before comparing its variance with the bound.
