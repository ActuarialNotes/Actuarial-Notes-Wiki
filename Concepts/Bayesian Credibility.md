---
verification:
  status: unverified
  confidence: null
  last_checked: null
  last_checked_by: null
  content_hash: sha256:7032d4a6b7c184355a8ab175443cecc9e0e1d85d8d7dae8903484384bcee0af1
  sources: []
  open_findings: 0
  open_critical: 0
  log: .verify/Concepts/Bayesian Credibility.md
---

**Bayesian Credibility** applies [[Bayes Theorem|Bayesian inference]] to credibility: the prior distribution of the risk parameter $\theta$ is updated with observed data to produce a posterior distribution, and the credibility estimate is the **posterior mean** $E[\theta \mid \mathbf{X}]$.

> $$\text{Credibility Estimate} = E[\theta \mid X_1, \ldots, X_n]$$

> $$\pi(\theta \mid \mathbf{X}) \propto L(\mathbf{X} \mid \theta) \cdot \pi(\theta)$$

- When the prior and likelihood form a **conjugate pair**, the posterior mean is a linear credibility formula of the form $Z\bar{X} + (1-Z)\mu_0$
- In this case, **Bayesian credibility = [[Bühlmann Credibility]]** (Bayesian is optimal; Bühlmann is the best linear approximation, and they agree for conjugate priors)

**Common conjugate pairs:**

| Likelihood | Prior | Posterior |
| :--- | :--- | :--- |
| Poisson$(\theta)$ | Gamma$(\alpha, \beta)$ | Gamma$(\alpha + \sum x_i,\, \beta + n)$ |
| Binomial$(m, \theta)$ | Beta$(\alpha, \beta)$ | Beta$(\alpha + \sum x_i,\, \beta + mn - \sum x_i)$ |
| Normal$(\theta, \sigma^2)$ | Normal$(\mu_0, \tau^2)$ | Normal (linear combination) |

![[Media/Figures/Bayesian_Credibility.svg|340]]

> [!example]- Bayesian Update for Poisson Claim Frequency {Example}
> A policyholder's annual claim count $N \sim \text{Poi}(\theta)$. The prior for $\theta$ is Gamma$(2, 0.5)$ (mean $= 2 \times 0.5 = 1$). In 3 years, the policyholder had 0, 2, and 1 claims. Find the posterior mean.
>
> > [!answer]-
> > $\sum x_i = 3$, $n = 3$. The prior's $0.5$ is a scale, so its rate is $\beta = 1/0.5 = 2$. The Poisson–gamma update adds the claim count to the shape and the years to the rate: the posterior is Gamma with shape $2 + 3 = 5$ and rate $2 + 3 = 5$ (scale $0.2$).
> > Posterior mean $= 5/5 = 1$ claim per year.
> > This is the credibility-weighted blend: posterior mean $= Z \cdot \bar{X} + (1-Z)\mu_0$ with $Z = n/(n + \beta) = 3/(3 + 2) = 0.6$, giving $0.6(1) + 0.4(1) = 1$. Here the sample mean equals the prior mean, so the data confirm the prior rather than move it.
