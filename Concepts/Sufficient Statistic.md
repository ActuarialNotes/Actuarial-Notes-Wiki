---
verification:
  status: stale
  confidence: null
  last_checked: 2026-10-30
  last_checked_by: agent:validate-v1
  content_hash: sha256:ddcd50a8469f37ce5ad300c8fcd75398fe3d4f2284eeb20b2d3b086fc366c819
  sources:
    - "CAS Exam MAS-I Content Outline 2026 (MASI_CO_2026_F v06, 2026-06-29), Domain B tasks 1 (estimate mean and variance), 2 (sufficient statistic), 4 (critical values from a sampling distribution), 7 (order statistics), 8 (MLE; consistency, unbiasedness, sufficiency, efficiency, minimum variance, MSE; censoring and truncation), 9 (PDF p.4); Hogg Domain B §§4.1, 5.1, 6.1–6.5, 7.1–7.6 and Tse §§12.1, 12.3 (PDF p.6), sha256:245892366dea073ff44e89b3ac2ae1401517b127d36d51c8a1198b3185faa2ed — https://www.casact.org/sites/default/files/2026-06/MASI_ContentOutline_2026.pdf"
    - "Siegrist, Random, §6.3 Maximum Likelihood (likelihood = pdf with roles reversed; log-likelihood; interior vs boundary maxima; invariance; Bernoulli/Poisson/normal/gamma MLEs; Uniform[0,h]: MLE X_(n), mse 2h²/((n+1)(n+2)), (n+1)X_(n)/n unbiased with var h²/(n(n+2)); Uniform[a,a+1]: MLE not unique), sha256:f8c94e3de84f7a025fd32395169938f37e7fd7958d5a8be9d56b54ed307d6ffd — https://www.randomservices.org/random/point/Likelihood.html"
    - "Siegrist, Random, §6.6 Sufficient, Complete and Ancillary Statistics (definition via the conditional distribution; Fisher–Neyman factorization; MLE vs sufficient statistic; Rao–Blackwell; Lehmann–Scheffé; Bernoulli, Poisson (UMVUE ((n−1)/n)^Y of e^{−θ}), normal, gamma, uniform; exponential family natural statistic minimally sufficient and complete), sha256:4d7402f2a960ea2b4232e57e4ee5992ac29801b9269f300f17f8e83074d5a0e4 — https://www.randomservices.org/random/point/Sufficient.html"
    - "Siegrist, Random (randomservices.org), §6.6 Sufficient, Complete and Ancillary Statistics: Normal example (mu known, U = sum (X_i - mu)^2 sufficient for sigma^2) and exponential-family theorem (natural statistic minimally sufficient; \"U is complete for theta as well\") — https://www.randomservices.org/random/point/Sufficient.html"
    - "Siegrist, Random, §6.5 Best Unbiased Estimators, Normal: 2 sigma^4/n is the Cramer-Rao lower bound for sigma^2; \"If mu is known, then the special sample variance W^2 attains the lower bound\", hence UMVUE — https://www.randomservices.org/random/point/Unbiased.html"
    - "Siegrist, Random, §5.8 Special Properties of Normal Samples: (n-1)S^2/sigma^2 chi-square n-1; n W^2/sigma^2 chi-square n (mu known); T = (M-mu)/(S/sqrt n) Student t n-1 — https://www.randomservices.org/random/sample/Normal.html"
    - "Siegrist, Random, §5.5 The Sample Variance: W^2 unbiased for sigma^2; E(W) = E(sqrt(W^2)) <= sqrt(E(W^2)) = sigma by concavity of sqrt (Jensen); \"S is a negatively biased estimator that tends to underestimate sigma\" — https://www.randomservices.org/random/sample/Variance.html"
  open_findings: 0
  open_critical: 0
  log: .verify/Concepts/Sufficient Statistic.md
---

![[Media/Figures/Sufficient_Statistic.svg|340]]

A **Sufficient Statistic** for a parameter $\theta$ is a statistic $T = T(X_1, \ldots, X_n)$ that holds all the information in the sample about $\theta$. The statistic $T$ is sufficient when the conditional distribution of the sample given $T$ does not depend on $\theta$. For every value $t$ of $T$, the condition is

> $$f(x_1, \ldots, x_n \mid T = t;\, \theta) = f(x_1, \ldots, x_n \mid T = t)$$

- $f(x_1, \ldots, x_n \mid T = t)$ is the joint pmf or pdf of the sample given $T = t$, which is the same for every value of $\theta$.

Two samples with the same value of $T$ lead to the same inference about $\theta$. They give the same [[Maximum Likelihood Estimation|maximum likelihood estimate]] and the same posterior distribution. When observations are independent with a common parameter, a breakdown of the sample into subgroups adds no information once $T$ is known.

> [!example]- Five policies each have a claim with probability $p$, independently. Is the number of claims $T = \sum X_i$ sufficient for $p$? {Example}
> - Take $T = 2$. Each sample with two claims has probability $p^2(1-p)^3$.
> - $T = 2$ has probability $\binom{5}{2}p^2(1-p)^3$, since 10 samples have two claims.
> - The conditional probability of each sample given $T = 2$ is $1/10$.
> - It does not involve $p$, and the same holds for every value of $T$, so $T$ is sufficient for $p$.

## The factorization theorem

The statistic $T$ is sufficient for $\theta$ if and only if the joint pmf or pdf of the sample factors as

> $$f(x_1, \ldots, x_n;\, \theta) = g\big(T(x_1, \ldots, x_n), \theta\big)\, h(x_1, \ldots, x_n)$$

- $g$ depends on the sample only through $T$.
- $h$ does not involve $\theta$.

| Distribution | Parameter | Sufficient statistic |
| :--- | :--- | :--- |
| Bernoulli | $p$ | $\sum X_i$ |
| Poisson | $\lambda$ | $\sum X_i$ |
| Exponential | $\theta$ | $\sum X_i$ |
| Normal, $\sigma^2$ known | $\mu$ | $\sum X_i$ |
| Normal, $\mu$ known | $\sigma^2$ | $\sum (X_i - \mu)^2$ |
| Normal | $\mu$ and $\sigma^2$ | $\sum X_i$ and $\sum X_i^2$ |
| Uniform on $(0, \theta)$ | $\theta$ | $X_{(n)}$ |

> [!example]- Losses are uniform on $(0, \theta)$. Is the sample maximum $X_{(n)}$ sufficient for $\theta$? {Example}
> - Each loss has density $1/\theta$ on $(0, \theta)$, so the joint density is $\theta^{-n}$ when every loss is between 0 and $\theta$, and 0 otherwise.
> - Every loss is below $\theta$ exactly when $X_{(n)} \le \theta$.
> - The joint density is $g = \theta^{-n}\,\mathbf{1}\{x_{(n)} \le \theta\}$ times $h = \mathbf{1}\{x_{(1)} \ge 0\}$.
> - The factor $g$ depends on the sample only through $x_{(n)}$, and $h$ does not involve $\theta$, so $X_{(n)}$ is sufficient.

## Sufficient statistics of an exponential family

A distribution belongs to the regular [[Exponential Family|exponential family]] when its set of possible values does not depend on $\theta$ and the pmf or pdf of one observation can be written as

> $$f(x;\, \theta) = \exp\left[p(\theta)K(x) + H(x) + q(\theta)\right]$$

- $p(\theta)$ and $q(\theta)$ are functions of $\theta$ only.
- $K(x)$ and $H(x)$ are functions of $x$ only.

For such a distribution, $\sum K(X_i)$ is a [[Rao-Blackwell Theorem#Completeness|complete]] sufficient statistic for $\theta$. With two parameters, the exponent has two terms $p_1(\theta)K_1(x) + p_2(\theta)K_2(x)$, and the pair $\sum K_1(X_i)$ and $\sum K_2(X_i)$ is complete and sufficient. The Poisson, with $K(x) = x$, has the complete sufficient statistic $\sum X_i$.

By the [[Rao-Blackwell Theorem#The Lehmann–Scheffé theorem|Lehmann–Scheffé theorem]], an unbiased estimator that is a function of a complete sufficient statistic is the [[Minimum Variance|minimum variance unbiased estimator]] (UMVUE).

> [!example]- What is a complete sufficient statistic for a normal sample with unknown mean $\mu$ and unknown variance $\sigma^2$? {Example}
> - The log of the density is $-\frac{x^2}{2\sigma^2} + \frac{\mu x}{\sigma^2} - \frac{\mu^2}{2\sigma^2} - \ln\left(\sigma\sqrt{2\pi}\right)$.
> - The terms that involve both $x$ and the parameters are $x$ times $\mu/\sigma^2$ and $x^2$ times $-1/(2\sigma^2)$, so $K_1(x) = x$ and $K_2(x) = x^2$.
> - The pair $\sum X_i$ and $\sum X_i^2$ is a complete sufficient statistic for $\mu$ and $\sigma^2$.
