---
verification:
  status: unverified
  confidence: null
  last_checked: null
  last_checked_by: null
  content_hash: sha256:732b36d5b052a89f58f0f70dcf28cbbcfa47ca004ab979d8bec99c7ca5fb4203
  sources: []
  open_findings: 0
  open_critical: 0
  log: .verify/Concepts/Posterior Distribution.md
---

**The posterior distribution** $\pi(\theta \mid \mathbf{x})$ is the distribution of an unknown risk parameter $\theta$ after a risk's experience $\mathbf{x} = (x_1, \ldots, x_n)$ has been taken into account — the prior $\pi(\theta)$ updated by the likelihood of the data through [[Bayes Theorem]]. In [[Bayesian Credibility]] it is the distribution every forecast for that risk is averaged over.

> $$\pi(\theta \mid \mathbf{x}) = \frac{f(\mathbf{x} \mid \theta)\,\pi(\theta)}{\int f(\mathbf{x} \mid \theta)\,\pi(\theta)\,d\theta}$$
>
> $$\pi(\theta \mid \mathbf{x}) \propto \pi(\theta)\prod_{i=1}^{n} f(x_i \mid \theta)$$

- **The pieces.** The prior $\pi(\theta)$ describes how $\theta$ varies across the portfolio before this risk's own experience is seen. The likelihood $f(\mathbf{x} \mid \theta) = \prod f(x_i \mid \theta)$ treats the $x_i$ as independent *given* $\theta$. The denominator is the marginal probability of the data; it only normalises. With a discrete prior (risk classes) the integral is a sum.
- **Work with the kernel.** Drop every factor that does not involve $\theta$, multiply prior by likelihood, and recognise the family from what is left. For a [[Conjugate Prior|conjugate prior]] this is the whole technique: Poisson–gamma, binomial–beta, normal–normal and exponential–inverse gamma each return a posterior in the prior's family with updated parameters.
- **What it is used for.** The Bayesian premium is the posterior mean of the hypothetical mean, $E[\mu(\Theta) \mid \mathbf{x}]$, the estimator that minimises expected squared error. The [[Predictive Distribution|predictive distribution]] of the next observation integrates $f(x_{n+1} \mid \theta)$ against the posterior.
- **Prior versus data.** With little data the posterior stays near the prior. As $n$ grows, the likelihood dominates and the posterior concentrates near the [[Maximum Likelihood Estimation|MLE]]. That movement *is* credibility. When the posterior mean is linear in $\bar{x}$ it equals the [[Bühlmann Credibility|Bühlmann]] estimate exactly — see [[Exact Credibility]].
- Updating is **sequential**: this year's posterior is next year's prior, and processing the years one at a time gives the same result as processing them together.

> [!example]- Updating a Two-Class Driver Prior {Example}
> A portfolio is $75\%$ good drivers, whose annual claim counts are Poisson with mean $0.2$, and $25\%$ bad drivers, Poisson with mean $0.6$. A driver chosen at random has $1$ claim in a year. Find the posterior class probabilities and the expected number of claims next year.
>
> > [!answer]-
> > $$
> > \begin{align*}
> > P(N = 1 \mid \text{good}) &= 0.2e^{-0.2} \\
> > &= 0.16375 \\
> > P(N = 1 \mid \text{bad}) &= 0.6e^{-0.6} \\
> > &= 0.32929 \\
> > P(N = 1) &= 0.75(0.16375) + 0.25(0.32929) \\
> > &= 0.12281 + 0.08232 \\
> > &= 0.20513
> > \end{align*}
> > $$
> > The posterior probabilities are $0.12281/0.20513 = 0.5987$ (good) and $0.08232/0.20513 = 0.4013$ (bad).
> > $$
> > \begin{align*}
> > E[N_2 \mid N_1 = 1] &= 0.5987(0.2) + 0.4013(0.6) \\
> > &= 0.1197 + 0.2408 \\
> > &= 0.3605
> > \end{align*}
> > $$
> > One claim moves the chance that this is a bad driver from $25\%$ to $40\%$, and the forecast from the prior mean $0.30$ to $0.3605$.

> [!example]- Beta Posterior for a Group Claim Probability {Example}
> A group disability policy covers $50$ employees. Each independently has probability $q$ of a claim in the year, and the prior for $q$ is Beta$(a = 2, b = 18)$, with mean $0.10$. This year $9$ employees claim. Find the posterior of $q$, its mean and its standard deviation.
>
> > [!answer]-
> > Keep only the factors that involve $q$:
> > $$
> > \begin{align*}
> > \pi(q \mid x) &\propto q^{2-1}(1-q)^{18-1} \cdot q^{9}(1-q)^{41} \\
> > &= q^{10}(1-q)^{58}
> > \end{align*}
> > $$
> > This is the kernel of a Beta$(11, 59)$ distribution.
> > $$
> > \begin{align*}
> > E[q \mid x] &= \frac{11}{11 + 59} \\
> > &= 0.1571 \\
> > \mathrm{Var}(q \mid x) &= \frac{(11)(59)}{(70)^{2}(71)} \\
> > &= 0.001865
> > \end{align*}
> > $$
> > The posterior SD is $\sqrt{0.001865} = 0.0432$, against a prior SD of $0.0655$. The observed $18\%$ pulls the estimate from $10\%$ to $15.7\%$, and the year's data cut the uncertainty about $q$ by about a third.
