---
verification:
  status: unverified
  confidence: null
  last_checked: null
  last_checked_by: null
  content_hash: sha256:e48e71b40322f731cdb220fb81e36ad35f3c2d8711554fe6b1498e7d8ac239cf
  sources: []
  open_findings: 0
  log: .verify/Concepts/Fisher Information.md
---

**Fisher Information** $I(\theta)$ measures how sharply the likelihood identifies a parameter — the expected curvature of the log-likelihood at $\theta$. It sets the **Cramér–Rao lower bound**, the smallest variance any [[Unbiasedness|unbiased]] estimator can achieve, and so defines what [[Efficiency|efficient]] means.

> $$I(\theta) = E\!\left[\left(\frac{\partial}{\partial\theta}\ln f(X\mid\theta)\right)^{2}\right] = -E\!\left[\frac{\partial^{2}}{\partial\theta^{2}}\ln f(X\mid\theta)\right]$$

> $$\text{Var}(\hat\theta) \ \ge\ \frac{1}{n\,I(\theta)} \qquad \text{(Cramér–Rao)}$$

- Information is **additive** over independent observations: a sample of $n$ carries $I_n(\theta) = n\,I(\theta)$, so the bound falls like $1/n$
- The two expressions above agree under the usual regularity conditions (the support does not depend on $\theta$) — which is why the bound does *not* apply to the $\text{Uniform}(0,\theta)$ problem
- An estimator attaining the bound is called **efficient**; the ratio $\frac{1/(nI(\theta))}{\text{Var}(\hat\theta)}$ is its efficiency
- The [[Maximum Likelihood Estimation|MLE]] is asymptotically Normal and asymptotically efficient:
  $$\hat\theta_{\text{MLE}} \ \dot\sim\ N\!\left(\theta,\ \frac{1}{n I(\theta)}\right)$$
  which is where MLE standard errors — and the ones printed in [[Parameter Estimate Tables]] — come from
- In practice the **observed information** $-\ell''(\hat\theta)$ evaluated at the estimate replaces the expectation; inverting it gives the covariance matrix in the multiparameter case
- Large $I(\theta)$ means a sharply peaked likelihood and a well-determined parameter; a flat likelihood carries little information and produces wide standard errors

![[Media/Figures/Fisher_Information.svg|340]]

> [!example]- Information for a Poisson Rate {Example}
> Claim counts are $X_1, \ldots, X_n \stackrel{\text{iid}}{\sim} \text{Poi}(\lambda)$. Find $I(\lambda)$ and the Cramér–Rao bound, and check whether $\bar{X}$ attains it.
>
> > [!answer]-
> > $$\ln f(x \mid \lambda) = -\lambda + x\ln\lambda - \ln x!$$
> > $$\frac{\partial^2}{\partial\lambda^2}\ln f = -\frac{x}{\lambda^2} \ \Longrightarrow\ I(\lambda) = -E\!\left[-\frac{X}{\lambda^2}\right] = \frac{\lambda}{\lambda^2} = \frac{1}{\lambda}$$
> > The bound is $\dfrac{1}{n I(\lambda)} = \dfrac{\lambda}{n}$. Since $\text{Var}(\bar{X}) = \lambda/n$, the [[Sample Mean]] attains the bound — it is the efficient estimator of $\lambda$.

> [!example]- Standard Error of an MLE {Example}
> A sample of $n = 200$ exponential claim sizes has MLE $\hat\theta = \bar{x} = 1{,}500$, and for the exponential $I(\theta) = 1/\theta^2$. Give an approximate $95\%$ [[Confidence Interval]] for $\theta$.
>
> > [!answer]-
> > $$\text{Var}(\hat\theta) \approx \frac{1}{n I(\theta)} = \frac{\theta^2}{n} \ \Longrightarrow\ \text{SE}(\hat\theta) \approx \frac{1{,}500}{\sqrt{200}} = 106.1$$
> > $$1{,}500 \pm 1.96(106.1) = (1{,}292,\ 1{,}708)$$
