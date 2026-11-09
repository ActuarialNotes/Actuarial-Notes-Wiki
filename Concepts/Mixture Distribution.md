---
verification:
  status: stale
  confidence: null
  last_checked: 2026-10-05
  last_checked_by: agent:validate-v1
  content_hash: sha256:6c99ff868de01087828975d54185900681f437f7e792d17c2030293d809b1042
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

A **Mixture Distribution** is the distribution of a random variable $X$ drawn by first choosing one of several component distributions at random and then drawing from it. If component $i$ is chosen with probability $a_i$, the distribution function of $X$ is

> $$F(x) = \sum_{i=1}^{n} a_i\,F_i(x)$$

- $F_i(x)$ is the distribution function of component $i$.
- $a_i \ge 0$ and $a_1 + \cdots + a_n = 1$.

The density, the survival function, the raw moments and the moment generating function mix with the same weights. A probability under a mixture is therefore the weighted average of the probabilities under the components. The variance and the median do not mix this way, and a mixture of exponential distributions is not an exponential distribution.

> [!example]- Of a portfolio's claims, 70% are exponential with mean 1,000 and 30% are Pareto with $\alpha = 3$ and $\theta = 4{,}000$. What is the probability that a randomly chosen claim exceeds 5,000? {Example}
> - Under the exponential component, $P(X > 5{,}000) = e^{-5} = 0.006738$.
> - Under the Pareto component, $P(X > 5{,}000) = (4{,}000/9{,}000)^3 = 0.08779$.
> - The mixture probability is $0.7 \times 0.006738 + 0.3 \times 0.08779 = 0.0311$.

## Moments of a mixture

The $k$th raw moment of a mixture is the weighted average of the components' raw moments:

> $$E[X^k] = \sum_{i=1}^{n} a_i\,E[X_i^k]$$

- $X_i$ is a random variable with the distribution of component $i$.

The variance is $E[X^2] - (E[X])^2$ from the mixed moments. Equivalently, if $I$ is the component chosen, the [[Variance for Conditional and Marginal Distributions|law of total variance]] gives

> $$\text{Var}(X) = E\left[\text{Var}(X \mid I)\right] + \text{Var}\left(E[X \mid I]\right)$$

The second term is the variance between the component means, so the average of the component variances understates the variance of the mixture.

> [!example]- For the portfolio above, what are the mean and the variance of a randomly chosen claim? {Example}
> - The exponential component has $E[X_1] = 1{,}000$ and $E[X_1^2] = 2{,}000{,}000$. The Pareto component has $E[X_2] = 2{,}000$ and $E[X_2^2] = 16{,}000{,}000$.
> - The mean is $E[X] = 0.7 \times 1{,}000 + 0.3 \times 2{,}000 = 1{,}300$.
> - The second moment is $E[X^2] = 0.7 \times 2{,}000{,}000 + 0.3 \times 16{,}000{,}000 = 6{,}200{,}000$.
> - The variance is $6{,}200{,}000 - 1{,}300^2 = 4{,}510{,}000$.
> - The average of the component variances is $0.7 \times 1{,}000{,}000 + 0.3 \times 12{,}000{,}000 = 4{,}300{,}000$, which falls short by the variance of the means, $0.7 \times 0.3 \times 1{,}000^2 = 210{,}000$.

## Continuous mixtures

When the component is indexed by a continuous random variable $\Lambda$ with density $g(\lambda)$, called the [[Mixing Distribution|mixing distribution]], the density of $X$ is

> $$f(x) = \int f(x \mid \lambda)\,g(\lambda)\,d\lambda$$

- $f(x \mid \lambda)$ is the density of $X$ given $\Lambda = \lambda$.

The moments follow from the law of total expectation, $E[X^k] = E\left[E[X^k \mid \Lambda]\right]$. Two mixtures give named distributions:

- A [[Poisson Distribution|Poisson]] whose mean $\Lambda$ is [[Gamma|gamma]] with parameters $\alpha$ and $\theta$ is [[Negative Binomial Distribution|negative binomial]] with $r = \alpha$ and $\beta = \theta$. This is the basis of the [[Mixed Poisson Process|mixed Poisson process]].
- An [[Exponential Distribution|exponential]] whose rate $\Lambda$ is gamma with parameters $\alpha$ and $\theta$ is [[Pareto Distribution|Pareto]] with shape $\alpha$ and scale $1/\theta$.

> [!example]- Each insured's claim size is exponential with rate $\Lambda$, and $\Lambda$ is gamma with $\alpha = 3$ and $\theta = 0.001$. What is the probability that a claim exceeds 1,000? {Example}
> - Given $\Lambda = \lambda$, $P(X > x) = e^{-\lambda x}$.
> - Averaging over the gamma distribution, $P(X > x) = E[e^{-\Lambda x}] = (1 + 0.001x)^{-3}$, the survival function of a Pareto with $\alpha = 3$ and $\theta = 1{,}000$.
> - The probability is $P(X > 1{,}000) = 2^{-3} = 0.125$.

## Mixed distributions with a point mass

A mixture of a point mass and a continuous distribution is a mixed distribution. Its distribution function jumps at the point mass, and the size of the jump is the probability there. The expected value of a function $g(X)$ adds the point masses and integrates over the continuous part:

> $$E[g(X)] = \sum_{j} g(x_j)\,P(X = x_j) + \int g(x)\,f(x)\,dx$$

- $x_j$ are the points with positive probability.
- $f(x)$ is the density of the continuous part, which integrates to $1 - \sum_j P(X = x_j)$.

An annual loss that is 0 when no claim occurs, or a claim closed without payment, is modelled this way.

> [!example]- An annual loss is 0 with probability 0.6 and otherwise exponential with mean 1,000. What are $P(X \le 500)$, $E[X]$ and $\text{Var}(X)$? {Example}
> - The distribution function jumps by 0.6 at 0, so $P(X \le 500) = 0.6 + 0.4\left(1 - e^{-0.5}\right) = 0.7574$.
> - The mean is $E[X] = 0.6 \times 0 + 0.4 \times 1{,}000 = 400$.
> - The second moment is $E[X^2] = 0.4 \times 2{,}000{,}000 = 800{,}000$, so $\text{Var}(X) = 800{,}000 - 400^2 = 640{,}000$.

> [!trap] Mixing the medians
> Only the distribution function, the density and the raw moments mix with the weights. For an equal mixture of exponentials with means 1 and 3, the average of the component medians is $\frac{0.693 + 2.079}{2} = 1.386$, but the median of the mixture solves $0.5e^{-x} + 0.5e^{-x/3} = 0.5$, which gives 1.147.
