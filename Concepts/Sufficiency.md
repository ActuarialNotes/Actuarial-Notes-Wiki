---
verification:
  status: stale
  confidence: null
  last_checked: 2026-10-05
  last_checked_by: agent:validate-v1
  content_hash: sha256:705b9c38ab9467951f12a17b25220d237f923802897ee81f1dbeaa710459b56b
  sources:
    - "CAS Exam MAS-I Content Outline 2026 (MASI_CO_2026_F v06, 2026-06-29), Domain B tasks 1 (estimate mean and variance), 2 (sufficient statistic), 4 (critical values from a sampling distribution), 7 (order statistics), 8 (MLE; consistency, unbiasedness, sufficiency, efficiency, minimum variance, MSE; censoring and truncation), 9 (PDF p.4); Hogg Domain B §§4.1, 5.1, 6.1–6.5, 7.1–7.6 and Tse §§12.1, 12.3 (PDF p.6), sha256:245892366dea073ff44e89b3ac2ae1401517b127d36d51c8a1198b3185faa2ed — https://www.casact.org/sites/default/files/2026-06/MASI_ContentOutline_2026.pdf"
    - "Siegrist, Random, §6.3 Maximum Likelihood (likelihood = pdf with roles reversed; log-likelihood; interior vs boundary maxima; invariance; Bernoulli/Poisson/normal/gamma MLEs; Uniform[0,h]: MLE X_(n), mse 2h²/((n+1)(n+2)), (n+1)X_(n)/n unbiased with var h²/(n(n+2)); Uniform[a,a+1]: MLE not unique), sha256:f8c94e3de84f7a025fd32395169938f37e7fd7958d5a8be9d56b54ed307d6ffd — https://www.randomservices.org/random/point/Likelihood.html"
    - "Siegrist, Random, §6.6 Sufficient, Complete and Ancillary Statistics (definition via the conditional distribution; Fisher–Neyman factorization; MLE vs sufficient statistic; Rao–Blackwell; Lehmann–Scheffé; Bernoulli, Poisson (UMVUE ((n−1)/n)^Y of e^{−θ}), normal, gamma, uniform; exponential family natural statistic minimally sufficient and complete), sha256:4d7402f2a960ea2b4232e57e4ee5992ac29801b9269f300f17f8e83074d5a0e4 — https://www.randomservices.org/random/point/Sufficient.html"
  open_findings: 0
  open_critical: 0
  log: .verify/Concepts/Sufficiency.md
---

![[Media/Figures/Sufficiency.svg|340]]

**Sufficiency** is the criterion that an [[Estimator|estimator]] of a parameter $\theta$ should use the sample only through a [[Sufficient Statistic|sufficient statistic]] $T$. An estimator meets the criterion when, for some function $\varphi$ that does not involve $\theta$, it is

> $$\hat{\theta} = \varphi(T)$$

Such an estimator loses none of the information that the sample holds about $\theta$.

> [!example]- Claim counts $X_1, \ldots, X_n$ are Poisson with mean $\lambda$, and $T = \sum X_i$ is sufficient for $\lambda$. Which of $\bar{X}$, $X_1$ and $(X_1 + X_2)/2$ meet the sufficiency criterion? {Example}
> - The sample mean is $\bar{X} = T/n$, a function of $T$, so it meets the criterion.
> - Two samples with the same total can have different values of $X_1$, so $X_1$ is not a function of $T$.
> - The same is true of $(X_1 + X_2)/2$, so neither of these meets the criterion.

## Sufficiency of the maximum likelihood estimator

By the [[Sufficient Statistic#The factorization theorem|factorization theorem]], the log-likelihood of the sample is

> $$l(\theta) = \ln g(T, \theta) + \ln h(x_1, \ldots, x_n)$$

- $g$ and $h$ are the factors of the joint pmf or pdf, and $h$ does not involve $\theta$.

Maximizing $l(\theta)$ depends on the sample only through $T$, so a unique [[Maximum Likelihood Estimation|maximum likelihood estimator]] is a function of $T$. When the maximum likelihood estimator is not unique, one can be chosen that is a function of $T$.

> [!example]- Five policies have claim counts 3, 1, 0, 2 and 4, Poisson with mean $\lambda$. What is the maximum likelihood estimate of $\lambda$, and does it meet the sufficiency criterion? {Example}
> - The log-likelihood is $l(\lambda) = -n\lambda + T\ln\lambda - \sum \ln x_i!$, with $T = \sum x_i$.
> - Setting its derivative $-n + T/\lambda$ to 0 gives $\hat{\lambda} = T/n$, a function of $T$ alone.
> - Here $T = 10$ and $n = 5$, so the estimate is $\hat{\lambda} = 2$.

## Sufficiency and the Rao–Blackwell theorem

An unbiased estimator $W$ that is not a function of $T$ can be improved. By the [[Rao-Blackwell Theorem|Rao–Blackwell theorem]], $E[W \mid T]$ is an unbiased estimator whose variance is no larger than $\text{Var}(W)$ for every value of $\theta$. Sufficiency is what makes $E[W \mid T]$ free of $\theta$, so that it can be computed from the sample. If $T$ is also complete, an unbiased function of $T$ is the [[Minimum Variance|minimum variance unbiased estimator]] by the [[Rao-Blackwell Theorem#The Lehmann–Scheffé theorem|Lehmann–Scheffé theorem]].
