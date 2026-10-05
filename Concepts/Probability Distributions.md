---
verification:
  status: verified
  confidence: medium
  last_checked: 2026-10-05
  last_checked_by: agent:validate-v1
  content_hash: sha256:998bfacb5ec2b9373f228db85d89ea463f94411dbf8f5345a128b3a81dfeda2d
  sources:
    - "CAS Exam MAS-I Tables (version 01/15/2018; handed out with the exam), Loss Models appendix excerpts: A.3.3.1 Exponential f(x) = e^{-x/θ}/θ, F(x) = 1 - e^{-x/θ}, E[X^k] = θ^k k! (PDF p.12); B.2.1.1 Poisson p_k = e^{-λ}λ^k/k!, E = Var = λ and B.2.1.3 Binomial p_k = C(m,k) q^k (1-q)^{m-k}, E = mq, Var = mq(1-q) (PDF p.15), sha256:cb5674138a67f7a498b8cc90357144fd121cbcbbc7487f214557b105611a69b4 — https://www.casact.org/sites/default/files/2021-03/masi_tables.pdf"
    - "Daniel, \"Poisson processes (and mixture distributions)\", CAS Study Note (June 2008) — MAS-I syllabus reading, Def. & Prop. 1.1 p.4 (Poisson pf, E = Var = Λ), Ex. 1.16 pp.9-10 (a die roll is uniform on 1..6), Def. & Prop. 1.20 p.11 (gamma: α = 1 is exponential with mean θ; integer α is a sum of α independent exponentials), Fact 1.26 p.13 (interevent times exponential with mean 1/λ; T_n gamma with α = n, θ = 1/λ), sha256:e345451e9daae82b400aed77f2da0c96c361ed4fbdfd22456b8f711ca0d50888 — https://www.casact.org/sites/default/files/2021-03/MAS-I_Daniel_1.pdf"
    - "Larsen, \"Generalized Linear Models\", CAS Study Note (Dec 2015, rev. June 2016) — MAS-I syllabus reading, Exponential Family Formulas f(y; θ) = exp[a(y)b(θ) + c(θ) + d(y)] and the table rows for the normal, Poisson and exponential (PDF p.3), sha256:5c4ed4e8eacf72624f38c5313eb6903f57d627b6ac81ce52e0a5a69404af90bd — https://www.casact.org/sites/default/files/2021-03/MAS-I_Larsen.pdf"
    - "Tse, Nonlife Actuarial Models (Cambridge UP, 2009), publisher preview, §1.3.1 eqs. (1.17)-(1.19): BN(n, θ) pf, mean nθ, variance nθ(1 - θ), x successes in n independent trials; approximately normal when n is large (PDF p.25), sha256:f6d009afdd1776907db090b41b72dd5a76d0b5ba3f0ee42e8b07279d5763b404 — https://api.pageplace.de/preview/DT0400.9780511630231_A24404031/preview-9780511630231_A24404031.pdf"
    - "Grinstead & Snell, Introduction to Probability (2nd rev. ed., GNU FDL version), Def. 3.5 and Ex. 3.7 Bernoulli trials (a coin tossed ten times), b(n, p, j), PDF pp.104-105; §5.1 Poisson as the binomial limit with np = λ, n large and p small, p.189 (PDF p.197); §5.2 normal density with parameters μ and σ, binomial as a sum of n independent 0-1 variables, CLT, p.212 (PDF p.220), sha256:763eab9894983ddfd6cd7f84685548d1515a9326a2d9fd015474534460551a5e — https://math.dartmouth.edu/~prob/prob/prob.pdf"
    - "Siegrist, Random (randomservices.org, HTML fetched 2026-10-05), ch.13 'The Poisson Distribution': binomial with n p_n → a converges to Poisson; Normal Approximation as the parameter grows; binomial normal approximation when np and n(1 - p) are large (both >= 5), sha256:cf3d0aacfdb40291bb729d32f6f7692b39e4c4a13a1e09f86ef8826bef61f688 — https://www.randomservices.org/random/poisson/Poisson.html"
    - "ProbOnto home page (sites.google.com/site/probonto, HTML fetched 2026-10-05): ProbOnto v2.5, the Ontology and Knowledge Base of Probability Distributions (150 distributions, 228 relationships and re-parameterisation formulas), sha256:ed52d75d7a5c627a29f572d32dc7663de1c9f479fe417def97287cd90531d0b9 — https://sites.google.com/site/probonto/"
    - "Probability Management, 'SIPmath 3.0 Standard' page (HTML fetched 2026-10-05): an open standard that wraps the Metalog parameters and HDR seeds encoding a stream of trials of a probability distribution in a JSON object, sha256:a24e2d392925e624be4e85bfa19d16c3b423140ccd0bb544800c4a5fd4d42c0a — https://www.probabilitymanagement.org/30-standard"
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
