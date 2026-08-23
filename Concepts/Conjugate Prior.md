---
verification:
  status: unverified
  confidence: null
  last_checked: null
  last_checked_by: null
  content_hash: sha256:270d6551f81d965d7e87d356c8fa541d05e2e8fbab905a585a9dd4707e07e189
  sources: []
  open_findings: 0
  log: .verify/Concepts/Conjugate Prior.md
---

A **conjugate prior** is a prior distribution for a risk parameter that, combined with a given likelihood, produces a posterior in the *same* family. Updating then reduces to arithmetic on the parameters — the reason [[Bayesian Credibility]] is computable by hand on an exam.

> $$\pi(\theta) \in \mathcal{F} \;\text{and}\; f(x \mid \theta) \;\Longrightarrow\; \pi(\theta \mid \mathbf{x}) \in \mathcal{F}$$

**The conjugate pairs on the syllabus:**

| Likelihood | Prior | Posterior | Posterior mean |
| :--- | :--- | :--- | :--- |
| Poisson$(\lambda)$ | Gamma$(\alpha, \theta)$ | Gamma$\left(\alpha + \sum x_i,\; \frac{\theta}{1 + n\theta}\right)$ | $Z\bar{x} + (1-Z)\alpha\theta$, $Z = \frac{n}{n + 1/\theta}$ |
| Bernoulli / Binomial | Beta$(a, b)$ | Beta$\left(a + \sum x_i,\; b + n - \sum x_i\right)$ | $Z\bar{x} + (1-Z)\frac{a}{a+b}$, $Z = \frac{n}{n + a + b}$ |
| Normal$(\theta, \sigma^2)$ | Normal$(\mu, \tau^2)$ | Normal, precision-weighted | $Z\bar{x} + (1-Z)\mu$, $Z = \frac{n}{n + \sigma^2/\tau^2}$ |
| Exponential$(\theta)$ | Inverse Gamma | Inverse Gamma | credibility-weighted |

- Every posterior mean above is **linear in $\bar{x}$**, which is exactly the form [[Bühlmann Credibility]] assumes — so for a conjugate pair the Bühlmann and Bayesian estimates are **identical**, not merely close
- The prior parameters act like pseudo-observations: a Gamma$(\alpha, \theta)$ prior behaves like having already seen $1/\theta$ exposures with $\alpha$ claims
- Outside a conjugate pair the posterior generally has no closed form and Bühlmann is a linear approximation to it

![[Media/Figures/Conjugate_Prior.svg|340]]

> [!example]- Gamma-Poisson Update {Example}
> A driver's annual claim count is Poisson$(\Lambda)$ with prior $\Lambda \sim$ Gamma$(\alpha = 2, \theta = 0.10)$. Over 3 years the driver reports 1 claim. Find the posterior and the Bayesian estimate of next year's frequency.
>
> > [!answer]-
> > Posterior: Gamma with $\alpha^* = \alpha + \sum x_i = 2 + 1 = 3$ and $\theta^* = \dfrac{\theta}{1 + n\theta} = \dfrac{0.10}{1 + 0.3} = 0.0769$.
> > $$E[\Lambda \mid \mathbf{x}] = \alpha^*\theta^* = 3(0.0769) = 0.2308$$
> > Check against Bühlmann: $k = 1/\theta = 10$, $Z = 3/13 = 0.2308$, $\bar{x} = 1/3$, $\mu = \alpha\theta = 0.20$:
> > $$0.2308\left(\tfrac{1}{3}\right) + 0.7692(0.20) = 0.0769 + 0.1538 = 0.2308 \;\checkmark$$
