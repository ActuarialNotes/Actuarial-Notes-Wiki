---
verification:
  status: verified
  confidence: low
  last_checked: 2026-10-05
  last_checked_by: agent:validate-v1
  content_hash: sha256:0a3e2c8a1a22b0041661473e89df57b08fa28028b7852bc8464117688a941d1e
  sources:
    - "CAS Exam MAS-I Content Outline 2026 (MASI_CO_2026_F v06, 2026-06-29), Domain B tasks 1 (estimate mean and variance), 2 (sufficient statistic), 4 (critical values from a sampling distribution), 7 (order statistics), 8 (MLE; consistency, unbiasedness, sufficiency, efficiency, minimum variance, MSE; censoring and truncation), 9 (PDF p.4); Hogg Domain B §§4.1, 5.1, 6.1–6.5, 7.1–7.6 and Tse §§12.1, 12.3 (PDF p.6), sha256:245892366dea073ff44e89b3ac2ae1401517b127d36d51c8a1198b3185faa2ed — https://www.casact.org/sites/default/files/2026-06/MASI_ContentOutline_2026.pdf"
    - "Siegrist, Random, §6.3 Maximum Likelihood (likelihood = pdf with roles reversed; log-likelihood; interior vs boundary maxima; invariance; Bernoulli/Poisson/normal/gamma MLEs; Uniform[0,h]: MLE X_(n), mse 2h²/((n+1)(n+2)), (n+1)X_(n)/n unbiased with var h²/(n(n+2)); Uniform[a,a+1]: MLE not unique), sha256:f8c94e3de84f7a025fd32395169938f37e7fd7958d5a8be9d56b54ed307d6ffd — https://www.randomservices.org/random/point/Likelihood.html"
    - "Siegrist, Random, §6.6 Sufficient, Complete and Ancillary Statistics (definition via the conditional distribution; Fisher–Neyman factorization; MLE vs sufficient statistic; Rao–Blackwell; Lehmann–Scheffé; Bernoulli, Poisson (UMVUE ((n−1)/n)^Y of e^{−θ}), normal, gamma, uniform; exponential family natural statistic minimally sufficient and complete), sha256:4d7402f2a960ea2b4232e57e4ee5992ac29801b9269f300f17f8e83074d5a0e4 — https://www.randomservices.org/random/point/Sufficient.html"
  open_findings: 1
  open_critical: 0
  log: .verify/Concepts/Sufficiency.md
---

**Sufficiency** is the property that a statistic $T(X_1, \ldots, X_n)$ captures all of a sample's information about a parameter $\theta$: once the [[Sufficient Statistic]] $T$ is known, the conditional distribution of the data no longer depends on $\theta$. It is a key criterion when judging an estimator built from $T$.

> $$f(x_1, \ldots, x_n \mid T = t,\, \theta) = f(x_1, \ldots, x_n \mid T = t)$$

- The right side is free of $\theta$, so $T$ leaves no extra information in the raw data
- Equivalently, by the **Fisher–Neyman factorization theorem**, $T$ is sufficient when the joint density factors as:

> $$f(x_1, \ldots, x_n \mid \theta) = g\big(T(x_1,\ldots,x_n),\, \theta\big) \cdot h(x_1, \ldots, x_n)$$

- An estimator should be a function of a sufficient statistic; by **Rao–Blackwell**, conditioning any [[Unbiasedness|unbiased]] estimator on $T$ never increases its variance, pushing toward [[Minimum Variance]]
- If a [[Maximum Likelihood Estimation|MLE]] exists, one can always be chosen that is a function of the sufficient statistic, and a **unique** MLE always is one — so it satisfies the sufficiency criterion. Without uniqueness only that choice is guaranteed: for $\text{Uniform}[a, a+1]$, any statistic in $[X_{(n)} - 1,\ X_{(1)}]$ is an MLE of $a$
- An unbiased function of a **complete** sufficient statistic is the UMVUE (Lehmann–Scheffé)

![[Media/Figures/Sufficiency.svg|340]]

> [!example]- Sufficiency via the Conditional Distribution {Example}
> Let $X_1, \ldots, X_n \stackrel{\text{iid}}{\sim} \text{Bernoulli}(p)$ (e.g., whether each policy filed a claim). Show that $T = \sum X_i$ is sufficient for $p$.
>
> > [!answer]-
> > Given $T = t$, every arrangement of $t$ ones among $n$ trials is equally likely:
> > $$
> > \begin{align*}
> > P\!\left(\mathbf{X} = \mathbf{x} \mid T = t\right) &= \frac{p^{t}(1-p)^{n-t}}{\binom{n}{t} p^{t}(1-p)^{n-t}} \\
> >   &= \frac{1}{\binom{n}{t}}
> > \end{align*}
> > $$
> > The result is free of $p$, so knowing the total $T$ alone preserves all information about $p$ — $T$ is sufficient.

> [!example]- MLE Depends Only on the Sufficient Statistic {Example}
> Claim counts $X_1, \ldots, X_n \stackrel{\text{iid}}{\sim} \text{Poi}(\lambda)$ have sufficient statistic $T = \sum X_i$. Confirm the MLE of $\lambda$ uses the data only through $T$.
>
> > [!answer]-
> > Maximizing the log-likelihood $\ell(\lambda) = -n\lambda + T\ln\lambda - \sum\ln(x_i!)$ gives:
> > $$\hat{\lambda} = \frac{1}{n}\sum_{i=1}^n X_i = \frac{T}{n}$$
> > The estimator is a function of $T$ alone, so the [[Maximum Likelihood Estimation|MLE]] satisfies sufficiency.
