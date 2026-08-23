---
verification:
  status: unverified
  confidence: null
  last_checked: null
  last_checked_by: null
  content_hash: sha256:50f2de0f8505b889decaa9616c389d161b4d50b0cd95bd92a2f3013ffc45fa3c
  sources: []
  open_findings: 0
  open_critical: 0
  log: .verify/Concepts/Predictive Distribution.md
---

The **predictive distribution** is the distribution of the *next* observation given the ones already seen, with the unknown risk parameter integrated out against its posterior. It is what a [[Bayesian Credibility]] forecast is really a mean of.

> $$f(x_{n+1} \mid \mathbf{x}) = \int f(x_{n+1} \mid \theta)\, \pi(\theta \mid \mathbf{x})\, d\theta$$

- The **prior predictive** (or marginal) distribution uses $\pi(\theta)$ instead of the posterior — it is the denominator of [[Bayes Theorem]] and describes a risk you know nothing about
- The Bayesian credibility estimate is its mean: $E[X_{n+1} \mid \mathbf{x}] = E_\theta\!\left[\mu(\theta) \mid \mathbf{x}\right]$
- It is **wider** than the conditional distribution $f(x \mid \hat\theta)$ at a plugged-in point estimate, because it carries parameter uncertainty as well as process variance
- Gamma-Poisson gives a Negative Binomial predictive; Beta-Bernoulli gives a Beta-Binomial — mixing always produces a heavier tail than the component
- Only the mean is needed for a credibility estimate, but the full distribution is what prices a limit or a reinsurance layer

![[Media/Figures/Predictive_Distribution.svg|340]]

> [!example]- Negative Binomial from a Gamma-Poisson Mixture {Example}
> Claim counts are Poisson$(\Lambda)$ with $\Lambda \sim$ Gamma$(\alpha = 2, \theta = 0.5)$ and no experience yet. Find $E[N]$ and $\mathrm{Var}(N)$ under the prior predictive distribution.
>
> > [!answer]-
> > Mixing a Poisson over a Gamma gives a Negative Binomial with $r = \alpha = 2$, $\beta = \theta = 0.5$:
> > $$E[N] = E[\Lambda] = \alpha\theta = 1.0$$
> > $$\mathrm{Var}(N) = E[\Lambda] + \mathrm{Var}(\Lambda) = \alpha\theta + \alpha\theta^{2} = 1.0 + 0.5 = 1.5$$
> > The variance exceeds the mean — the parameter uncertainty adds $\alpha\theta^2$ on top of Poisson process variance, which is why mixed claim counts are overdispersed.
