---
verification:
  status: stale
  confidence: null
  last_checked: 2026-10-04
  last_checked_by: agent:validate-v1
  content_hash: sha256:998bfacb5ec2b9373f228db85d89ea463f94411dbf8f5345a128b3a81dfeda2d
  sources:
    - "Grinstead & Snell, Introduction to Probability (2nd rev. ed., GNU FDL version), §5.1 Poisson distribution as the binomial limit with np = lambda, n large and p small, p.188-189 (PDF p.196-197); §9.1 Central Limit Theorem for Bernoulli trials, S_n binomial, p.325-326 (PDF p.333-334), sha256:763eab9894983ddfd6cd7f84685548d1515a9326a2d9fd015474534460551a5e — https://math.dartmouth.edu/~prob/prob/prob.pdf"
    - "Siegrist, Probability, Mathematical Statistics, and Stochastic Processes (Random), \"The Poisson Distribution\": binomial with n p_n -> a converges to Poisson; Normal Approximation as the parameter grows; binomial normal approximation when np and n(1-p) are large (both >= 5), sha256:cf3d0aacfdb40291bb729d32f6f7692b39e4c4a13a1e09f86ef8826bef61f688 — https://www.randomservices.org/random/poisson/Poisson.html"
    - "Tse, Nonlife Actuarial Models (Cambridge UP, 2009), publisher preview, §1.3.1 BN(n, theta) = x successes in n trials, \"When n is large, X is approximately normally distributed\" (PDF p.25), sha256:f6d009afdd1776907db090b41b72dd5a76d0b5ba3f0ee42e8b07279d5763b404 — https://api.pageplace.de/preview/DT0400.9780511630231_A24404031/preview-9780511630231_A24404031.pdf"
    - "Larsen, \"Generalized Linear Models\", CAS Study Note (Dec 2015, rev. June 2016), Exponential Family Formulas f(y; theta) = exp[a(y)b(theta) + c(theta) + d(y)] (PDF p.3), sha256:5c4ed4e8eacf72624f38c5313eb6903f57d627b6ac81ce52e0a5a69404af90bd — https://www.casact.org/sites/default/files/2021-03/MAS-I_Larsen.pdf"
  open_findings: 0
  open_critical: 0
  log: .verify/Concepts/Probability Distributions.md
---

**External Resources**
1. [ProbOnto](https://sites.google.com/site/probonto/) (Probability Distribution Ontology) for data about distributions and their relationships.
2. [SIPmath 3.0 Standard](https://www.probabilitymanagement.org/30-standard) for data structures for probability distributions.

---

## Probability Distributions

- **[[Uniform Discrete|Uniform]]** (a die roll)
- **Bernoulli** (a coin flip)
- **[[Binomial Distribution|Binomial]]** (the number of heads in $n$ coin flips)
- **[[Poisson Distribution|Poisson]]** (the number of heads in many flips of a coin that rarely lands heads)
- **[[Normal Distribution|Normal]]** (the number of heads in many coin flips, approximately)
	- **[[Student's t-Distribution|t-Distribution]]**
- **[[Exponential Distribution|Exponential]]** (the waiting time between events of a [[Poisson Process]])
- **[[Gamma]]** (the waiting time to the $n$-th event of a [[Poisson Process]])

Relationships

- **Binomial → Poisson**: As $n \to \infty, p \to 0, np = \lambda$.
- **Binomial → Normal**: As $n \to \infty, np \text{ and } n(1-p)$ are large.
- **Poisson → Normal**: As $\lambda$ becomes large.

**[[Exponential Family]]**

> $$f(x \mid \theta) = h(x)\exp\big(\eta(\theta)\,T(x) - A(\theta)\big)$$

- This is the form $f(y; \theta) = \exp[a(y)b(\theta) + c(\theta) + d(y)]$ in Larsen's study note (which supplements Dobson & Barnett §3.2), with $h = e^{d}$, $T = a$, $\eta = b$ and $A = -c$.

### Binomial
Tossing a coin $n$ times, how likely to get $k$ heads? If each toss lands heads with probability $p$, independently of the others:

> $$P(X = k) = \binom{n}{k} p^k (1-p)^{n-k}$$

- $k = 0, 1, \ldots, n$, with $E[X] = np$ and $\text{Var}(X) = np(1-p)$

### Poisson

> $$P(N = k) = \frac{e^{-\lambda}\lambda^k}{k!}$$

- $k = 0, 1, 2, \ldots$, with $E[N] = \text{Var}(N) = \lambda$

### Normal

> $$f(x) = \frac{1}{\sigma\sqrt{2\pi}}\, e^{-(x-\mu)^2/(2\sigma^2)}$$

- $-\infty < x < \infty$; $\mu$ is the mean and $\sigma$ the standard deviation

### Exponential

> $$f(x) = \frac{1}{\theta}\, e^{-x/\theta}$$

- $x > 0$, with $F(x) = 1 - e^{-x/\theta}$ and $E[X] = \theta$
- It is the gamma distribution with $\alpha = 1$, and the sum of $n$ independent exponentials with mean $\theta$ is gamma with $\alpha = n$ and the same $\theta$

---

## Central Concepts

- **[[Central Limit Theorem]]**

![[Media/Figures/Probability_Distributions.svg|340]]
