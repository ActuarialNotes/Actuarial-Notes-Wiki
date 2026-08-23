---
verification:
  status: unverified
  confidence: null
  last_checked: null
  last_checked_by: null
  content_hash: sha256:1cd6f43fe109fc7e78f309a1b5f36a07eea1b7ee3aee9da517bd0d3569142af4
  sources: []
  open_findings: 0
  log: .verify/Concepts/Maximum Likelihood Estimation.md
---

**Maximum Likelihood Estimation (MLE)** is a method of parameter estimation that chooses the parameter value $\hat{\theta}$ that **maximizes the likelihood function** — the probability of observing the given data as a function of the parameter.

> $$L(\theta) = \prod_{i=1}^n f(x_i \mid \theta)$$

> $$\hat{\theta}_{\text{MLE}} = \arg\max_\theta L(\theta) = \arg\max_\theta \ell(\theta)$$

> $$\ell(\theta) = \ln L(\theta) = \sum_{i=1}^n \ln f(x_i \mid \theta)$$

- Taking the log turns the product into a sum and simplifies maximization
- The MLE is found by solving the **score equation**: $\ell'(\hat{\theta}) = 0$
- MLEs are **consistent**, **asymptotically normal**, and **asymptotically efficient** (achieve the Cramér–Rao lower bound in large samples)
- **Invariance property**: if $\hat{\theta}$ is the MLE of $\theta$, then $g(\hat{\theta})$ is the MLE of $g(\theta)$

**Adjustments for incomplete data:**
- **[[Censoring]]**: observation is known to exceed some value $c$; contribute $P(X > c \mid \theta) = S(c \mid \theta)$ to the likelihood
- **[[Truncation]]**: only observations exceeding a threshold $d$ are recorded; condition on $X > d$, contributing $f(x \mid \theta)/S(d \mid \theta)$

![[Media/Figures/Maximum_Likelihood_Estimation.svg|340]]

> [!example]- MLE for an Exponential Distribution {Example}
> Five claim sizes (in \$$1{,}000$s) are: $2, 3, 5, 4, 6$. Assuming $X_i \sim \text{Exp}(\theta)$, find the MLE of $\theta$.
>
> > [!answer]-
> > For $\text{Exp}(\theta)$: $f(x) = \frac{1}{\theta}e^{-x/\theta}$, so $\ell(\theta) = -n\ln\theta - \frac{1}{\theta}\sum x_i$.
> > Setting $\ell'(\theta) = -\frac{n}{\theta} + \frac{\sum x_i}{\theta^2} = 0$ gives $\hat{\theta} = \bar{x} = \frac{2+3+5+4+6}{5} = 4$ (i.e., \$$4{,}000$).
