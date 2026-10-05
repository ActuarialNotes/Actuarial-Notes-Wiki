---
verification:
  status: unverified
  confidence: null
  last_checked: null
  last_checked_by: null
  content_hash: sha256:4012041a8ffaa137950bdabcecb850673024b7c2697b19e1e0e30a3a6f1a078d
  sources: []
  open_findings: 0
  open_critical: 0
  log: .verify/Concepts/Mixture Distribution.md
---

A **Mixture Distribution** describes a variable $X$ drawn from a population made of subpopulations with different distributions: first a subpopulation is chosen at random, then $X$ is drawn from it. Its density (and its [[Cumulative Distribution Function (CDF)|CDF]]) is the weighted average of the component densities, with the weights given by a [[Mixing Distribution|mixing distribution]] — discrete for a finite mixture, continuous for a continuous mixture.

> $$f_X(x) = \sum_{i=1}^{k} a_i\, f_{X_i}(x), \quad a_i \ge 0,\ \sum_i a_i = 1$$

> $$f_X(x) = \int f_{X \mid \Theta}(x \mid \theta)\, g_\Theta(\theta)\, d\theta$$

> $$E[X^m] = \sum_{i=1}^{k} a_i\, E[X_i^m] = E\big[E[X^m \mid \Theta]\big]$$

- $a_i$ is the proportion of the population in subpopulation $i$; in the continuous case $\Theta$ indexes the subpopulations and $g_\Theta$ is its density. The CDF, survival function, raw moments and moment generating function mix with the same weights.
- **The mixing method.** Any quantity that is *linear* in the density — a probability, a mean, a second moment — can be found by computing it within each subpopulation and averaging. The **variance is not linear**: compute $E[X^2] - (E[X])^2$ from the mixed moments, or use the law of total variance ([[Variance for Conditional and Marginal Distributions]]):

> $$\text{Var}(X) = E\big[\text{Var}(X \mid \Theta)\big] + \text{Var}\big(E[X \mid \Theta]\big)$$

- Averaging the component variances misses the second term, the spread *between* subpopulation means, and so understates the variance.
- **Standard results.** A [[Poisson Distribution|Poisson]] whose mean is [[Gamma|gamma]] with parameters $\alpha$ and $\theta$ is [[Negative Binomial Distribution|negative binomial]] with $r = \alpha$, $\beta = \theta$ — the basis of the [[Mixed Poisson Process]]. An [[Exponential Distribution|exponential]] whose rate is gamma is [[Pareto Distribution|Pareto]].
- **Mixed (discrete–continuous) type.** A mixture of a point mass and a continuous distribution gives a CDF with a jump, such as an annual loss that is $0$ with positive probability and continuous otherwise. Its moments combine a sum over the mass points with an integral over the continuous part.

> [!example]- Small and Large Claims in One Book {Example}
> 70% of a portfolio's claims are exponential with mean 1,000 and 30% are Pareto with $\alpha = 3$, $\theta = 4{,}000$. Find $P(X > 5{,}000)$, $E[X]$ and $\text{Var}(X)$ for a randomly chosen claim.
>
> > [!answer]-
> > Mix the survival probabilities and the first two moments. For the Pareto, $E[X] = \theta/(\alpha - 1) = 2{,}000$ and $E[X^2] = 2\theta^2/[(\alpha-1)(\alpha-2)] = 16{,}000{,}000$; for the exponential, $E[X] = 1{,}000$ and $E[X^2] = 2{,}000{,}000$:
> >
> > $$
> > \begin{align*}
> > P(X > 5{,}000) &= 0.7\,e^{-5} + 0.3\left(\tfrac{4{,}000}{9{,}000}\right)^{3} \\
> >   &= 0.00472 + 0.02634 \\
> >   &= 0.0311 \\
> > E[X] &= 0.7(1{,}000) + 0.3(2{,}000) \\
> >   &= 1{,}300 \\
> > E[X^2] &= 0.7(2{,}000{,}000) + 0.3(16{,}000{,}000) \\
> >   &= 6{,}200{,}000 \\
> > \text{Var}(X) &= 6{,}200{,}000 - 1{,}300^2 \\
> >   &= 4{,}510{,}000
> > \end{align*}
> > $$
> >
> > Averaging the component variances, $0.7(1{,}000{,}000) + 0.3(12{,}000{,}000) = 4{,}300{,}000$, falls short by exactly the variance of the means, $0.7 \times 0.3 \times (2{,}000 - 1{,}000)^2 = 210{,}000$.

> [!example]- Gamma-Mixed Exponential Severity {Example}
> Each insured's claim size is exponential with rate $\Lambda$ (mean $1/\Lambda$), and $\Lambda$ varies across insureds as a gamma distribution with $\alpha = 3$ and $\theta = 0.001$. Find the unconditional survival function and $P(X > 1{,}000)$.
>
> > [!answer]-
> > Mix the conditional survival function $e^{-\Lambda x}$ over $\Lambda$; the expectation is the gamma moment generating function $(1 - \theta t)^{-\alpha}$ at $t = -x$:
> >
> > $$
> > \begin{align*}
> > S(x) &= E\big[e^{-\Lambda x}\big] \\
> >   &= (1 + 0.001x)^{-3} \\
> >   &= \left(\frac{1{,}000}{x + 1{,}000}\right)^{3}
> > \end{align*}
> > $$
> >
> > This is a Pareto with $\alpha = 3$ and $\theta = 1{,}000$, so $P(X > 1{,}000) = (1/2)^3 = 0.125$ and $E[X] = 1{,}000/2 = 500$. Mixing exponentials with different means produces a heavier tail than any single exponential.

> [!example]- A Loss With a Mass at Zero {Example}
> A policy has no loss with probability 0.6; otherwise the loss is exponential with mean 500. Find $F(0)$, $F(200)$ and $E[X]$.
>
> > [!answer]-
> > $X$ mixes a point mass at 0 (weight 0.6) with an exponential (weight 0.4):
> >
> > $$
> > \begin{align*}
> > F(0) &= 0.6 \\
> > F(200) &= 0.6 + 0.4\left(1 - e^{-200/500}\right) \\
> >   &= 0.6 + 0.4(0.3297) \\
> >   &= 0.7319 \\
> > E[X] &= 0.6(0) + 0.4(500) \\
> >   &= 200
> > \end{align*}
> > $$
> >
> > The CDF jumps by 0.6 at zero and rises continuously after it — neither a discrete nor a continuous distribution.
