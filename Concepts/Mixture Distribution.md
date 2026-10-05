---
verification:
  status: verified
  confidence: medium
  last_checked: 2026-10-05
  last_checked_by: agent:validate-v1
  content_hash: sha256:cf5c04f0ce397039f4d1f76f4aaa4f18e2c9c1c715f971fa61428efbab8b2211
  sources:
    - "Daniel, Poisson processes (and mixture distributions), CAS Study Note (June 2008; MAS-I reading), §1.3.3 Mixture distributions, PDF pp.9-12: Example 1.16 and Fact 1.17 (Mixing Method valid only for quantities linear in the probability/density function), Example 1.22 (Poisson with gamma(alpha, theta) mean is negative binomial with r = alpha, beta = theta), Example 1.23 (mixed Poisson process), sha256:e345451e9daae82b400aed77f2da0c96c361ed4fbdfd22456b8f711ca0d50888 — https://www.casact.org/sites/default/files/2021-03/MAS-I_Daniel_1.pdf"
    - "Loss Data Analytics (Frees et al., open textbook), ch.3 §3.3.5 finite mixtures (f, F, E[X^r] and M_X(t) are weighted sums) and §3.3.6 continuous mixtures (f = integral f(x|theta) g(theta) dtheta, E[X^k] = E[E[X^k|Theta]], Var(X) = E[Var(X|Theta)] + Var[E(X|Theta)]), sha256:263021bf543b04b2881284b38b7dcbd0586b78daec371b88a1eefcd362dff732 — https://openacttexts.github.io/Loss-Data-Analytics/ChapSeverity.html"
    - "Loss Data Analytics (Frees et al., open textbook), ch.10 §10.2 'Tails of Distributions': Definition 10.1 (moment method; heavier tail if smaller k*), Example 10.2.3 (Pareto moments only for k < alpha, heavy-tailed), sha256:0dcbdf4bb875807b9db33d06cff8a94770a74a940f660a89de13116ee829ed13 — https://openacttexts.github.io/Loss-Data-Analytics/ChapPortMgt.html"
    - "Siegrist, Random, ch.2 §4 Mixed Distributions: a distribution of mixed type has a countable set of mass points and is continuous elsewhere, sha256:f19d040000526541dd0d61b1e33827f8c81d7cf638ec9ff87e76af9dc8dcc566 — https://www.randomservices.org/random/dist/Mixed.html"
    - "Wikipedia, 'Lomax distribution', oldid 1333105295, section 'Gamma-exponential (scale-) mixture connection': lambda ~ Gamma(shape k, scale theta), X|lambda ~ Exponential(rate lambda) gives X ~ Lomax(shape k, scale 1/theta), sha256:ea7f08ef4e95f83f358114fed9280096a4a3cd584f0e6a4a55d89e93148dbd86 — https://en.wikipedia.org/w/index.php?title=Lomax_distribution&oldid=1333105295"
    - "CAS Exam MAS-I Content Outline 2026 (MASI_CO_2026_F v06, 2026-06-29), reading list PDF p.6: Daniel; Hogg; Tse §§1.1, 2.2-2.5, sha256:245892366dea073ff44e89b3ac2ae1401517b127d36d51c8a1198b3185faa2ed — https://www.casact.org/sites/default/files/2026-06/MASI_ContentOutline_2026.pdf"
    - "Tse, Nonlife Actuarial Models (Cambridge 2009), publisher preview, printed contents PDF pp.9-10: §1.5.2 and §2.3.2 'Mixture distribution', §2.1.2 'Mixed distribution' (contents only; body not freely available), sha256:f6d009afdd1776907db090b41b72dd5a76d0b5ba3f0ee42e8b07279d5763b404 — https://api.pageplace.de/preview/DT0400.9780511630231_A24404031/preview-9780511630231_A24404031.pdf"
    - "Hogg, McKean & Craig, Introduction to Mathematical Statistics 8th ed. (Global Ed.), publisher preview, contents PDF pp.6-7: §1.7.3 'Mixtures of Discrete and Continuous Type Distributions', §3.7 'Mixture Distributions' (p.232) (contents only), sha256:7fd80607a820477e03ff2c8f3469f5cfa57d095d766cbc29d39d723ef5a69a99 — https://api.pageplace.de/preview/DT0400.9781292264783_A39514650/preview-9781292264783_A39514650.pdf"
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
> > This is a Pareto with $\alpha = 3$ and $\theta = 1{,}000$, so $P(X > 1{,}000) = (1/2)^3 = 0.125$ and $E[X] = 1{,}000/2 = 500$. This Pareto has moments only of order below $3$, so its tail is heavier than any single exponential's, which has every moment. A finite mixture of exponentials, by contrast, still has every moment and stays light-tailed.

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
