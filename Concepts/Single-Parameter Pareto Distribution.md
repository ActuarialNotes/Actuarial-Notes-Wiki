---
verification:
  status: stale
  confidence: null
  last_checked: 2026-10-05
  last_checked_by: agent:validate-v1
  content_hash: sha256:961037bc866d6dc6c655e7f03a4d05a56ad42b06c6a6d2a2952196ba6e4127e3
  sources:
    - "CAS Exam MAS-I Tables, Appendix A.4.1.4 Single-parameter Pareto (alpha, theta): f(x) = alpha theta^alpha/x^(alpha+1), x > theta; F(x) = 1 - (theta/x)^alpha; E[X^k] = alpha theta^k/(alpha-k), k < alpha; E[(X^x)^k] = alpha theta^k/(alpha-k) - k theta^alpha/((alpha-k) x^(alpha-k)); mode theta; note 'only alpha is a true parameter. The value of theta must be set in advance', PDF p.14; and A.2.4.1 Pareto F(x) = 1 - (theta/(x+theta))^alpha, PDF p.10, sha256:cb5674138a67f7a498b8cc90357144fd121cbcbbc7487f214557b105611a69b4 — https://www.casact.org/sites/default/files/2021-03/masi_tables.pdf"
    - "Siegrist, Probability, Mathematical Statistics, and Stochastic Processes (Random), §4 Special Distributions, 'Pareto' page: basic Pareto: if Z has the basic Pareto distribution with shape a then T = ln Z is exponential with rate a; pdf a b^a/x^(a+1) on [b, inf) for the scale-b family, sha256:2a199f9981591509d4e19a3350cf139c0dcfd448adbb65bcce0058b7c25a4d8b — https://www.randomservices.org/random/special/Pareto.html"
    - "Siegrist, Random, §7 Point Estimation, 'Maximum Likelihood' page, Pareto distribution with known scale b: MLE of a = n / sum(ln X_i - ln b), log-likelihood n ln a + n a ln b - (a+1) sum ln x_i, sha256:f8c94e3de84f7a025fd32395169938f37e7fd7958d5a8be9d56b54ed307d6ffd — https://www.randomservices.org/random/point/Likelihood.html"
  open_findings: 0
  open_critical: 0
  log: .verify/Concepts/Single-Parameter Pareto Distribution.md
---
The **Single-Parameter Pareto Distribution** is a continuous distribution on $(\theta, \infty)$ with shape $\alpha > 0$ and a known lower bound $\theta > 0$, used for losses observed only above a fixed threshold. Only $\alpha$ is a parameter to estimate, because $\theta$ is set in advance. Its density, in the parameterization of the CAS MAS-I tables, is

> $$f(x) = \frac{\alpha\,\theta^{\alpha}}{x^{\alpha + 1}}$$

- $x > \theta$.

Its cdf is

> $$F(x) = 1 - \left(\frac{\theta}{x}\right)^{\alpha}$$

So the survival function is $S(x) = (\theta/x)^{\alpha}$ for $x > \theta$. Solving $F(x) = p$ gives the $p$th percentile, $\theta(1 - p)^{-1/\alpha}$.

> [!example]- Losses above 1,000 are single-parameter Pareto with $\alpha = 2$ and $\theta = 1{,}000$. What is the probability that a loss exceeds 3,000, and what is the median loss? {Example}
> - $S(3{,}000) = (1{,}000/3{,}000)^2 = 1/9 = 0.1111$.
> - The median is the 50th percentile, $1{,}000(1 - 0.5)^{-1/2} = 1{,}000\sqrt{2} = 1{,}414.21$.

## Moments

The $k$th moment is

> $$E[X^k] = \frac{\alpha\,\theta^k}{\alpha - k}$$

- $k < \alpha$. Higher moments do not exist, so the tail is heavy.

So the mean is $E[X] = \frac{\alpha\theta}{\alpha - 1}$ for $\alpha > 1$. The variance is $E[X^2] - E[X]^2$, which for $\alpha > 2$ is

> $$\text{Var}(X) = \frac{\alpha\,\theta^2}{(\alpha - 1)^2(\alpha - 2)}$$

> [!example]- Losses are single-parameter Pareto with $\alpha = 3$ and $\theta = 500$. What are the mean and variance? {Example}
> - $E[X] = \frac{3(500)}{3 - 1} = 750$.
> - $E[X^2] = \frac{3(500)^2}{3 - 2} = 750{,}000$.
> - $\text{Var}(X) = 750{,}000 - 750^2 = 187{,}500$.

## Limited expected value

The [[Limited Expected Value|limited expected value]] at a cap $u \ge \theta$ is

> $$E[X \wedge u] = \frac{\alpha\,\theta}{\alpha - 1} - \frac{\theta^{\alpha}}{(\alpha - 1)\,u^{\alpha - 1}}$$

> [!example]- Losses are single-parameter Pareto with $\alpha = 3$ and $\theta = 500$, and each payment is capped at 2,000. What is the expected payment? {Example}
> - $E[X] = 750$.
> - $E[X \wedge 2{,}000] = 750 - \frac{500^3}{2(2{,}000)^2} = 750 - 15.625 = 734.375$.
> - The cap removes $15.625$ per loss, although only $(500/2{,}000)^3 = 1.56\%$ of losses exceed it.

## Maximum likelihood estimate of $\alpha$

For a sample $x_1, \ldots, x_n$ with $\theta$ known, the log-likelihood is

> $$l(\alpha) = n\ln\alpha + n\alpha\ln\theta - (\alpha + 1)\sum \ln x_i$$

Setting $l'(\alpha) = n/\alpha - \sum \ln(x_i/\theta) = 0$ gives the [[Maximum Likelihood Estimation|maximum likelihood estimate]]

> $$\hat{\alpha} = \frac{n}{\sum \ln(x_i/\theta)}$$

This works because $\ln(X/\theta)$ has the [[Exponential Distribution|exponential]] distribution with rate $\alpha$ (mean $1/\alpha$).

> [!example]- What is the maximum likelihood estimate of $\alpha$ for these losses, and the fitted probability that a loss exceeds 3,000? {Example}
> An insurer records only losses above 1,000 and models them as single-parameter Pareto with $\theta = 1{,}000$. Five recorded losses are 1,200, 1,500, 2,500, 1,100 and 4,000.
>
> > [!answer]-
> > - $\sum \ln(x_i/1{,}000) = \ln 1.2 + \ln 1.5 + \ln 2.5 + \ln 1.1 + \ln 4 = 2.9857$.
> > - $\hat{\alpha} = 5/2.9857 = 1.6747$.
> > - The fitted probability is $(1{,}000/3{,}000)^{1.6747} = 0.1588$.
> > - With $\hat{\alpha} < 2$ the fitted distribution has an infinite variance.

## Relation to the two-parameter Pareto

$X - \theta$ has the two-parameter [[Pareto Distribution|Pareto distribution]] with shape $\alpha$ and scale $\theta$. So a two-parameter Pareto density with $\theta$ known, $\alpha\theta^{\alpha}/(\theta + x)^{\alpha + 1}$, has the maximum likelihood estimate $\hat{\alpha} = n/\sum \ln\big((\theta + x_i)/\theta\big)$.

> [!trap] Starting the support at 0
> The single-parameter Pareto's support starts at $\theta$, the two-parameter Pareto's at 0. With $\alpha = 2$ and $\theta = 1{,}000$, $P(X > 3{,}000)$ is $(1{,}000/3{,}000)^2 = 0.111$ here, but $(1{,}000/4{,}000)^2 = 0.0625$ for the two-parameter Pareto.
