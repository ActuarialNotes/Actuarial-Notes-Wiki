---
verification:
  status: stale
  confidence: null
  last_checked: 2026-10-04
  last_checked_by: agent:validate-v1
  content_hash: sha256:994101268c6c5e495e64bd39f08c36795654ecdc25955d7e47827c1f8b2d3878
  sources:
    - "Daniel, \"Poisson processes (and mixture distributions)\", CAS Study Note (June 2008) — MAS-I syllabus reading, Def. 1.8 pp.6-7 (S(t) = Σ X_j, X_j iid and independent of N), Fact 1.11 p.7 (E[S] = E[N]E[X]; Var[S] = E[N]Var[X] + Var[N]E[X]² = E[N]E[X²]), Example 1.12 p.8 (normal approximation when E[N(t)] is large), §1.4.2 p.14 (sum of compound Poisson processes: rate λ1 + λ2, severity the rate-weighted mixture), Fact 1.13 p.9 (thinning), sha256:e345451e9daae82b400aed77f2da0c96c361ed4fbdfd22456b8f711ca0d50888 — https://www.casact.org/sites/default/files/2021-03/MAS-I_Daniel_1.pdf"
    - "Siegrist, Random (randomservices.org, HTML fetched 2026-10-04), ch.13 The Poisson Process, 'Compound Poisson Processes' (definition; mean μrt, variance (μ² + σ²)rt; MGF exp(rt[G(s) − 1]); thinning as a compound process), sha256:6c5a27a1dc417fbb651a6271f8bb72c6e6f9790ae3c59c781f8f51c29961afd6 — https://www.randomservices.org/random/poisson/Compound.html"
    - "Siegrist, Random (randomservices.org, HTML fetched 2026-10-04), ch.13 The Poisson Process, 'The Exponential Distribution' (memoryless property: the excess over a deductible is again exponential), sha256:db0eebaa01377dfc5e07ca838f9ae6c3b06b9653e6d10032de301cb07c4aad63 — https://www.randomservices.org/random/poisson/Exponential.html"
    - "Huang, STAT 253/317 (U. Chicago, 2021) Lecture 11 slides, following Ross, Introduction to Probability Models ch.5, slides pp.13-16 (compound Poisson process, mean, variance λtE[Y²], CLT), sha256:a0e1f0472675b35264cff54d6a4223c90ad34df1381d76f2150b537b7b5b9e74 — https://www.stat.uchicago.edu/~yibi/teaching/stat317/2021/Lectures/Lecture11.pdf"
    - "Shevchenko, 'Calculation of aggregate loss distributions', J. Operational Risk 5(2) 2010 preprint (arXiv:1008.1108), Prop. 2.2 and §9.1.2 eq. (66) (compound Poisson skewness λE[X³]/(λE[X²])^{3/2} → 0 as λ grows), PDF pp.6, 29, sha256:65a87b5691014ce2feee6825e17e3f7af7e75b436e078c649e18518dcf638bd1 — https://arxiv.org/pdf/1008.1108"
    - "CAS Exam MAS-I Content Outline 2026 (MASI_CO_2026_F v06, 2026-06-29), Domain A tasks 1-2 and text references (Daniel A1-5; Ross 5.2.1-5.2.4, 5.3, 5.4.1, 5.4.2), PDF pp.3, 6, sha256:245892366dea073ff44e89b3ac2ae1401517b127d36d51c8a1198b3185faa2ed — https://www.casact.org/sites/default/files/2026-06/MASI_ContentOutline_2026.pdf"
  open_findings: 0
  open_critical: 0
  log: .verify/Concepts/Compound Poisson Process.md
---

![[Media/Figures/Compound_Poisson_Process.svg|340]]

A **Compound Poisson Process** is a [[Stochastic Processes|stochastic process]] $\{S(t), t \ge 0\}$ that adds a random amount for each event of a [[Poisson Process|Poisson process]]. If claims occur as a Poisson process $N(t)$ with rate $\lambda$ and the $i$th claim has size $X_i$, then the aggregate loss by time $t$ is

> $$S(t) = \sum_{i=1}^{N(t)} X_i$$

- The claim sizes $X_1, X_2, \ldots$ are independent and identically distributed, and they are independent of $N(t)$.
- $S(t) = 0$ when $N(t) = 0$.

The compound Poisson process is the process form of the [[Aggregate Loss Model|aggregate loss model]], with a Poisson number of claims. Let $X$ be a random variable with the common distribution of the claim sizes. The mean of the aggregate loss is

> $$E[S(t)] = \lambda t\, E[X]$$

The variance of an aggregate loss with $N(t)$ independent of the claim sizes is

> $$\text{Var}(S(t)) = E[N(t)]\,\text{Var}(X) + \text{Var}(N(t))\,(E[X])^2$$

Because $E[N(t)] = \text{Var}(N(t)) = \lambda t$, the variance of a compound Poisson process simplifies to

> $$\text{Var}(S(t)) = \lambda t\, E[X^2]$$

- $E[X^2]$ is the second moment of the claim size, which equals $\text{Var}(X) + (E[X])^2$.

> [!example]- Claims arrive as a Poisson process at a rate of 50 per year. Claim sizes are exponential with mean 2,000. What are the mean and the standard deviation of the aggregate loss in one year? {Example}
> - For an [[Exponential Distribution|exponential distribution]] with mean $\theta = 2{,}000$, $E[X] = 2{,}000$ and $E[X^2] = 2\theta^2 = 8{,}000{,}000$.
> - The mean of the aggregate loss is $E[S(1)] = 50 \times 2{,}000 = 100{,}000$.
> - The variance of the aggregate loss is $\text{Var}(S(1)) = 50 \times 8{,}000{,}000 = 400{,}000{,}000$.
> - The standard deviation of the aggregate loss is $\sqrt{400{,}000{,}000} = 20{,}000$.

## Aggregate payments with a deductible

With an ordinary [[Deductible|deductible]] $d$, only the claims with $X > d$ produce a payment. By [[Poisson Thinning|thinning]], these claims form a Poisson process with rate

> $$\lambda\, P(X > d)$$

The payment on each such claim is $X - d$, given $X > d$. The aggregate payments therefore form a compound Poisson process with this rate, and its mean and variance follow from the formulas above with the payment in place of $X$.

> [!example]- Claims arrive as a Poisson process at a rate of 50 per year, and claim sizes are exponential with mean 2,000. Each claim is subject to a deductible of 1,000. What are the mean and the variance of the aggregate payments in one year? {Example}
> - The rate of claims above the deductible is $50\,P(X > 1{,}000) = 50\,e^{-1{,}000/2{,}000} = 30.33$ per year.
> - Because the exponential distribution is memoryless, the payment $X - 1{,}000$ given $X > 1{,}000$ is exponential with mean 2,000.
> - The mean of the aggregate payments is $30.33 \times 2{,}000 = 60{,}653$.
> - The second moment of a payment is $2 \times 2{,}000^2 = 8{,}000{,}000$, so the variance of the aggregate payments is $30.33 \times 8{,}000{,}000 = 242{,}612{,}264$.

## Sum of independent compound Poisson processes

If $S_1(t)$ and $S_2(t)$ are independent compound Poisson processes with rates $\lambda_1$ and $\lambda_2$, then their sum is a compound Poisson process with rate

> $$\lambda = \lambda_1 + \lambda_2$$

A claim of the combined process has the claim size distribution of the first process with probability $\lambda_1 / \lambda$ and that of the second process with probability $\lambda_2 / \lambda$.

> [!example]- Physical damage claims arrive at a rate of 30 per year with mean size 1,000. Liability claims arrive at a rate of 10 per year with mean size 5,000. The two are independent compound Poisson processes. What is the mean claim size of the combined process, and what is the mean aggregate loss in one year? {Example}
> - The combined process has rate $\lambda = 30 + 10 = 40$ per year.
> - A claim is a physical damage claim with probability $30/40 = 0.75$ and a liability claim with probability $10/40 = 0.25$.
> - The mean claim size is $0.75 \times 1{,}000 + 0.25 \times 5{,}000 = 2{,}000$.
> - The mean aggregate loss in one year is $40 \times 2{,}000 = 80{,}000$.

> [!trap] Using the variance of the claim size instead of its second moment
> The variance of a compound Poisson process is the expected number of claims multiplied by $E[X^2]$, not by $\text{Var}(X)$. With 50 claims a year and exponential claim sizes with mean 2,000, $\lambda\,\text{Var}(X)$ gives $200{,}000{,}000$, but the correct variance is $\lambda\,E[X^2] = 400{,}000{,}000$.
