---
verification:
  status: in_review
  confidence: null
  last_checked: 2026-11-28
  last_checked_by: agent:validate-v1
  content_hash: sha256:ffc72273613a2eccf10af065b4fca01dbda847389831224c149674f0d012a976
  sources:
    - "https://www.casact.org/sites/default/files/2021-03/masi_tables.pdf, Appendix A.3.2.1 gamma, A.3.3.1 exponential (PDF pp.11-12); Appendix B.2.1.1-B.2.1.4 Poisson, geometric, binomial, negative binomial (PDF p.15), sha256:cb5674138a67f7a498b8cc90357144fd121cbcbbc7487f214557b105611a69b4 — https://www.casact.org/sites/default/files/2021-03/masi_tables.pdf"
    - "CAS_Study_Note_GLM_06_26_2016 VRP_ml_07_06_2016, Exponential Family Formulas and table (PDF p.3); Canonical Link Function (PDF p.2), sha256:5c4ed4e8eacf72624f38c5313eb6903f57d627b6ac81ce52e0a5a69404af90bd — https://www.casact.org/sites/default/files/2021-03/MAS-I_Larsen.pdf"
    - "Casualty Actuarial Society | Exam S Text References, Def. & Prop. 1.20, 1.21, Ex. 1.22 Poisson-gamma mixture r=alpha, beta=theta (pp.11-12); Fact 1.26 (p.13), sha256:e345451e9daae82b400aed77f2da0c96c361ed4fbdfd22456b8f711ca0d50888 — https://www.casact.org/sites/default/files/2021-03/MAS-I_Daniel_1.pdf"
    - "NONLIFE ACTUARIAL MODELS: Theory, Methods and Evaluation, §1.3.1 eqs (1.17)-(1.19) (PDF p.25), sha256:f6d009afdd1776907db090b41b72dd5a76d0b5ba3f0ee42e8b07279d5763b404 — https://api.pageplace.de/preview/DT0400.9780511630231_A24404031/preview-9780511630231_A24404031.pdf"
    - "https://math.dartmouth.edu/~prob/prob/prob.pdf, §5.1 Poisson as binomial limit (PDF p.197); §5.2 normal density, CLT (PDF p.220); Example 6.25 (PDF p.280), sha256:763eab9894983ddfd6cd7f84685548d1515a9326a2d9fd015474534460551a5e — https://math.dartmouth.edu/~prob/prob/prob.pdf"
    - "The Poisson Distribution, Normal Approximation; binomial normal approximation np and n(1-p) large, sha256:cf3d0aacfdb40291bb729d32f6f7692b39e4c4a13a1e09f86ef8826bef61f688 — https://www.randomservices.org/random/poisson/Poisson.html"
  open_findings: 2
  open_critical: 0
  log: .verify/Concepts/Probability Distributions.md
---

![[Media/Figures/Probability_Distributions.svg|340]]

A **Probability Distribution** is the assignment of probabilities to the values of a [[Random Variable|random variable]]. A discrete random variable has a [[Probability Mass Function (PMF)|probability mass function]] $p(x) = P(X = x)$, and a continuous random variable has a [[Probability Density Function (PDF)|probability density function]] $f(x)$. Either way the distribution function is $F(x) = P(X \le x)$.

## Discrete distributions

The named discrete distributions, the [[Binomial Distribution|binomial]], [[Poisson Distribution|Poisson]], [[Negative Binomial Distribution|negative binomial]] and [[Geometric Distribution|geometric]], count events:

| Distribution | $P(X = k)$ | $E[X]$ | $\text{Var}(X)$ |
| --- | --- | --- | --- |
| Binomial | $\binom{n}{k}p^k(1-p)^{n-k}$, $k = 0, \ldots, n$ | $np$ | $np(1-p)$ |
| Poisson | $\frac{e^{-\lambda}\lambda^k}{k!}$, $k = 0, 1, \ldots$ | $\lambda$ | $\lambda$ |
| Negative binomial | $\binom{k+r-1}{k}\left(\frac{1}{1+\beta}\right)^r\left(\frac{\beta}{1+\beta}\right)^k$ | $r\beta$ | $r\beta(1+\beta)$ |
| Geometric | $\frac{\beta^k}{(1+\beta)^{k+1}}$, $k = 0, 1, \ldots$ | $\beta$ | $\beta(1+\beta)$ |

The binomial counts the successes in $n$ independent trials, each with probability $p$. Loss Models writes its parameters as $m$ and $q$, so its mean is $mq$. The negative binomial and geometric are written in the Loss Models form, with $k = 0, 1, \ldots$ failures.

> [!example]- A policy has a claim in a year with probability 0.2, independently of 9 other policies. What is the probability of exactly 2 claims among the 10 policies, and what is the expected number of claims? {Example}
> - The number of claims is binomial with $n = 10$ and $p = 0.2$.
> - $P(X = 2) = \binom{10}{2}(0.2)^2(0.8)^8 = 45 \times 0.04 \times 0.16777 = 0.3020$.
> - The expected number of claims is $np = 10 \times 0.2 = 2$.

## Continuous distributions

The named continuous distributions, the [[Uniform Continuous Distribution|uniform]], [[Normal Distribution|normal]], [[Exponential Distribution|exponential]] and [[Gamma|gamma]], measure amounts and times:

| Distribution | $f(x)$ | $E[X]$ | $\text{Var}(X)$ |
| --- | --- | --- | --- |
| Uniform on $(a, b)$ | $\frac{1}{b - a}$ | $\frac{a + b}{2}$ | $\frac{(b - a)^2}{12}$ |
| Normal | $\frac{1}{\sigma\sqrt{2\pi}}e^{-(x-\mu)^2/(2\sigma^2)}$ | $\mu$ | $\sigma^2$ |
| Exponential | $\frac{1}{\theta}e^{-x/\theta}$, $x > 0$ | $\theta$ | $\theta^2$ |
| Gamma | $\frac{x^{\alpha-1}e^{-x/\theta}}{\Gamma(\alpha)\,\theta^\alpha}$, $x > 0$ | $\alpha\theta$ | $\alpha\theta^2$ |

The claim-size distributions, including the [[Weibull Distribution|Weibull]] and [[Pareto Distribution|Pareto]], are compared on the [[Severity Distribution|severity distribution]] page.

> [!example]- Claims arrive as a Poisson process at a rate of 2 per year. What is the distribution of the time until the first claim, and what is the probability that it arrives within 4 months? {Example}
> - The time until the first claim is exponential with mean $\theta = 1/2$ year.
> - The probability that it arrives within $1/3$ year is $1 - e^{-(1/3)/(1/2)} = 1 - e^{-2/3} = 0.4866$.

## Relationships between distributions

1. The binomial with $n$ large and $p$ small is approximately Poisson with $\lambda = np$.
2. The binomial with $np$ and $n(1-p)$ large, and the Poisson with $\lambda$ large, are approximately normal, by the [[Central Limit Theorem]].
3. The exponential is the gamma with $\alpha = 1$. The sum of $n$ independent exponentials with mean $\theta$ is gamma with $\alpha = n$ and the same $\theta$. In a [[Poisson Process|Poisson process]] with rate $\lambda$, the time until the $n$th event is gamma with $\alpha = n$ and $\theta = 1/\lambda$.
4. A Poisson whose mean is gamma with parameters $\alpha$ and $\theta$ is negative binomial with $r = \alpha$ and $\beta = \theta$, a [[Mixture Distribution|mixture]].

## The exponential family

A distribution belongs to the [[Exponential Family|exponential family]] if its probability function can be written in the form

> $$f(y; \theta) = \exp\left[a(y)\,b(\theta) + c(\theta) + d(y)\right]$$

- $\theta$ is the parameter of the distribution.
- $a(y)$ and $d(y)$ are functions of $y$ alone, and $b(\theta)$ and $c(\theta)$ are functions of $\theta$ alone.

The distribution is in canonical form when $a(y) = y$, and $b(\theta)$ is then its natural parameter. The binomial, Poisson, normal, exponential and gamma distributions are all in the exponential family, which is what makes them the response distributions of a [[Generalized Linear Model|generalized linear model]].

> [!example]- How is the Poisson distribution with mean $\lambda$ written in exponential family form? {Example}
> - The probability function is $\frac{e^{-\lambda}\lambda^y}{y!} = \exp\left[y \ln\lambda - \lambda - \ln y!\right]$.
> - So $a(y) = y$, $b(\lambda) = \ln\lambda$, $c(\lambda) = -\lambda$ and $d(y) = -\ln y!$.
> - The form is canonical, and the natural parameter is $\ln\lambda$.
