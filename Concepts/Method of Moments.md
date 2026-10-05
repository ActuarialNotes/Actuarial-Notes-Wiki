---
verification:
  status: verified
  confidence: medium
  last_checked: 2026-10-05
  last_checked_by: agent:validate-v1
  content_hash: sha256:d2be49c7c98a2d3dc8430237601f3dfcc398e7e4b0c09fc19dd0c858b2be0f63
  sources:
    - "CAS Exam MAS-I Content Outline 2026 (MASI_CO_2026_F v06, 2026-06-29), Domain B tasks 1 (estimate mean and variance), 2 (sufficient statistic), 4 (critical values from a sampling distribution), 7 (order statistics), 8 (MLE; consistency, unbiasedness, sufficiency, efficiency, minimum variance, MSE; censoring and truncation), 9 (PDF p.4); Hogg Domain B §§4.1, 5.1, 6.1–6.5, 7.1–7.6 and Tse §§12.1, 12.3 (PDF p.6), sha256:245892366dea073ff44e89b3ac2ae1401517b127d36d51c8a1198b3185faa2ed — https://www.casact.org/sites/default/files/2026-06/MASI_ContentOutline_2026.pdf"
    - "Siegrist, Random, §6.2 Method of Moments (matching sample and distribution moments; mean/variance matching; T² bias −σ²/n and 'no simple, general relationship between mse(T²) and mse(S²)', T² smaller MSE for normal samples; negative binomial U = M²/(T² − M); uniform MoM 2M), sha256:43755b5bee6179fca8d7c1c964e7c6a9bb1a9de6f3916130100c69e666a3194e — https://www.randomservices.org/random/point/Moments.html"
    - "Siegrist, Random, §6.3 Maximum Likelihood (likelihood = pdf with roles reversed; log-likelihood; interior vs boundary maxima; invariance; Bernoulli/Poisson/normal/gamma MLEs; Uniform[0,h]: MLE X_(n), mse 2h²/((n+1)(n+2)), (n+1)X_(n)/n unbiased with var h²/(n(n+2)); Uniform[a,a+1]: MLE not unique), sha256:f8c94e3de84f7a025fd32395169938f37e7fd7958d5a8be9d56b54ed307d6ffd — https://www.randomservices.org/random/point/Likelihood.html"
    - "Siegrist, Random, §6.6 Sufficient, Complete and Ancillary Statistics (definition via the conditional distribution; Fisher–Neyman factorization; MLE vs sufficient statistic; Rao–Blackwell; Lehmann–Scheffé; Bernoulli, Poisson (UMVUE ((n−1)/n)^Y of e^{−θ}), normal, gamma, uniform; exponential family natural statistic minimally sufficient and complete), sha256:4d7402f2a960ea2b4232e57e4ee5992ac29801b9269f300f17f8e83074d5a0e4 — https://www.randomservices.org/random/point/Sufficient.html"
    - "Stanford STATS 200 (Autumn 2016), Lecture 15, Theorem 15.4 (Var[T] ≥ 1/(nI(θ)) for unbiased T, 'certain mild regularity assumptions'; Var of the sample score = nI(θ)) and p.15-4 (efficient = attains the bound; MLE asymptotically efficient; MoM expected to have higher MSE than the MLE for large n; biased estimators can beat the bound at special θ), sha256:7e9d32d62f5b6fe7374924822c86b27c81b36ee2b25ea596ca774f7678287247 — https://web.stanford.edu/class/archive/stats/stats200/stats200.1172/Lecture15.pdf"
    - "Frees et al., Loss Data Analytics, §4.1.3 Starting Values: MLE preferred as it uses data more efficiently; MoM and percentile matching supply starting values for the iterative MLE, sha256:c5fe1ff26cec4dee6f8bcc285b75c840202c947246f7b5d5598f9b837ccad021 — https://openacttexts.github.io/Loss-Data-Analytics/ChapModelSelection.html"
    - "Tse, Nonlife Actuarial Models (2009) — publisher preview, §1.5.1 Compound distribution: the pf needs convolutions ('in general tedious'), Theorem 1.6 gives E(S) and Var(S) from the moments of N and X 'without computing its pf' (printed pp.21–28, PDF pp.39–46), sha256:f6d009afdd1776907db090b41b72dd5a76d0b5ba3f0ee42e8b07279d5763b404 — https://api.pageplace.de/preview/DT0400.9780511630231_A24404031/preview-9780511630231_A24404031.pdf"
  open_findings: 0
  open_critical: 0
  log: .verify/Concepts/Method of Moments.md
---

The **Method of Moments** (MoM) estimates parameters by setting the sample moments equal to the theoretical moments and solving. With $k$ unknown parameters, the first $k$ moment equations are used. It is the simplest estimation method and often supplies the starting values for [[Maximum Likelihood Estimation]].

> $$\frac{1}{n}\sum_{i=1}^{n} X_i^{\,r} = E[X^{\,r}], \qquad r = 1, 2, \ldots, k$$

> $$\bar{X} = E[X \mid \theta], \qquad \frac{1}{n}\sum X_i^2 = E[X^2 \mid \theta]$$

- One parameter needs one equation ($\bar{X} = \mu(\theta)$); two parameters need the first two moments, usually solved as mean and variance
- MoM estimators are **[[Consistency|consistent]]** by the law of large numbers, but they are generally **not** [[Efficiency|efficient]] and not always [[Unbiasedness|unbiased]] — MLE beats them asymptotically
- They can produce **impossible values** (a negative variance, a shape parameter below zero) when the sample moments are unusual; MLE is constrained by the likelihood and cannot
- MoM is not built from the [[Sufficient Statistic]], so in some models it leaves information on the table — for the gamma (both parameters unknown), beta and Pareto, the moment estimators are not functions of the sufficient statistics. In others it lands on one anyway: $\bar{X}$ for the Bernoulli and Poisson, and $\big(\bar{X}, \tfrac{1}{n}\sum (X_i - \bar{X})^2\big)$ for the Normal, where the MoM estimators are also the MLEs
- It handles awkward likelihoods well: for a mixture or a compound distribution, the moments are simple even when the density is not
- Censored or truncated data breaks the plain method — the sample moments no longer estimate the population moments, so the theoretical moments must be recomputed under the [[Censoring]] or [[Truncation]] scheme

![[Media/Figures/Method_of_Moments.svg|340]]

> [!example]- Gamma Parameters by Moments {Example}
> A sample of claim amounts has $\bar{x} = 500$ and $s^2 = 125{,}000$ (using the $n$ divisor). Fit a [[Gamma]] distribution with shape $\alpha$ and scale $\theta$ by the method of moments.
>
> > [!answer]-
> > For a Gamma, $E[X] = \alpha\theta$ and $\text{Var}(X) = \alpha\theta^2$. Setting these to the sample values:
> > $$\alpha\theta = 500, \qquad \alpha\theta^2 = 125{,}000$$
> > Dividing the second by the first gives $\theta = 250$, and then
> > $$\alpha = \frac{500}{250} = 2$$
> > The fitted distribution is $\text{Gamma}(\alpha = 2, \theta = 250)$.

> [!example]- Method of Moments vs MLE for the Uniform {Example}
> A sample from $\text{Uniform}(0, \theta)$ has $\bar{x} = 6$ with largest observation $x_{(n)} = 14$. Compare the MoM and ML estimates of $\theta$.
>
> > [!answer]-
> > MoM: $E[X] = \theta/2$, so $\hat\theta_{\text{MoM}} = 2\bar{x} = 12$.
> > MLE: the likelihood is positive only when $\theta \ge x_{(n)}$ and decreasing in $\theta$, so $\hat\theta_{\text{MLE}} = x_{(n)} = 14$.
> > The MoM estimate is **impossible** — it is smaller than an observed value. This is the standard illustration that matching moments ignores the structure of the likelihood.
