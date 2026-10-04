---
verification:
  status: verified
  confidence: medium
  last_checked: 2026-10-04
  last_checked_by: agent:validate-v1
  content_hash: sha256:af7eb987f3727c2e147415a0ec4423f65e75c85129a07ce4c535f32407840612
  sources:
    - "Daniel, \"Poisson processes (and mixture distributions)\", CAS Study Note (June 2008) — MAS-I syllabus reading, Def. 1.8 pp.6-7 (S(t) = Σ X_j, X_j iid and independent of N), Fact 1.11 p.7 (E[S] = E[N]E[X]; Var[S] = E[N]Var[X] + Var[N]E[X]² = E[N]E[X²]), Example 1.12 p.8 (normal approximation when E[N(t)] is large), §1.4.2 p.14 (sum of compound Poisson processes: rate λ1 + λ2, severity the rate-weighted mixture), Fact 1.13 p.9 (thinning), sha256:e345451e9daae82b400aed77f2da0c96c361ed4fbdfd22456b8f711ca0d50888 — https://www.casact.org/sites/default/files/2021-03/MAS-I_Daniel_1.pdf"
    - "Siegrist, Random (randomservices.org, HTML fetched 2026-10-04), ch.13 The Poisson Process, 'Compound Poisson Processes' (definition; mean μrt, variance (μ² + σ²)rt; MGF exp(rt[G(s) − 1]); thinning as a compound process), sha256:6c5a27a1dc417fbb651a6271f8bb72c6e6f9790ae3c59c781f8f51c29961afd6 — https://www.randomservices.org/random/poisson/Compound.html"
    - "Siegrist, Random (randomservices.org, HTML fetched 2026-10-04), ch.13 The Poisson Process, 'The Exponential Distribution' (memoryless property: the excess over a deductible is again exponential), sha256:db0eebaa01377dfc5e07ca838f9ae6c3b06b9653e6d10032de301cb07c4aad63 — https://www.randomservices.org/random/poisson/Exponential.html"
    - "Huang, STAT 253/317 (U. Chicago, 2021) Lecture 11 slides, following Ross, Introduction to Probability Models ch.5, slides pp.13-16 (compound Poisson process, mean, variance λtE[Y²], CLT), sha256:a0e1f0472675b35264cff54d6a4223c90ad34df1381d76f2150b537b7b5b9e74 — https://www.stat.uchicago.edu/~yibi/teaching/stat317/2021/Lectures/Lecture11.pdf"
    - "Shevchenko, 'Calculation of aggregate loss distributions', J. Operational Risk 5(2) 2010 preprint (arXiv:1008.1108), Prop. 2.2 and §9.1.2 eq. (66) (compound Poisson skewness λE[X³]/(λE[X²])^{3/2} → 0 as λ grows), PDF pp.6, 29, sha256:65a87b5691014ce2feee6825e17e3f7af7e75b436e078c649e18518dcf638bd1 — https://arxiv.org/pdf/1008.1108"
    - "CAS Exam MAS-I Content Outline 2026 (MASI_CO_2026_F v06, 2026-06-29), Domain A tasks 1-2 and text references (Daniel A1-5; Ross 5.2.1-5.2.4, 5.3, 5.4.1, 5.4.2), PDF pp.3, 6, sha256:245892366dea073ff44e89b3ac2ae1401517b127d36d51c8a1198b3185faa2ed — https://www.casact.org/sites/default/files/2026-06/MASI_ContentOutline_2026.pdf"
  open_findings: 1
  open_critical: 0
  log: .verify/Concepts/Compound Poisson Process.md
---

A **Compound Poisson Process** adds a random amount to each event of a [[Poisson Process]]: if claims arrive at rate $\lambda$ and the $i$-th claim costs $X_i$, the aggregate loss by time $t$ is the random sum $S(t) = \sum_{i=1}^{N(t)} X_i$. It is the standard model for total claims on a portfolio and the process form of the [[Aggregate Loss Model]].

> $$S(t) = \sum_{i=1}^{N(t)} X_i, \qquad N(t) \sim \text{Poi}(\lambda t)$$

> $$E[S(t)] = \lambda t\, E[X], \qquad \text{Var}(S(t)) = \lambda t\, E[X^2]$$

- The severities $X_1, X_2, \ldots$ are i.i.d., independent of the counting process $N(t)$
- The variance uses the **second moment** $E[X^2]$, not the variance of $X$ — this falls out of the compound-variance formula $\text{Var}(S) = E[N]\text{Var}(X) + \text{Var}(N)E[X]^2$ with $E[N] = \text{Var}(N) = \lambda t$
- The sum of independent compound Poisson processes is compound Poisson with rate $\lambda = \sum \lambda_j$ and severity distribution the $\lambda$-weighted mixture of the $F_j$
- **Thinning** carries over: claims of a given type (e.g. those exceeding a [[Deductible]]) form their own compound Poisson process, with rate $\lambda P(X > d)$ and severity distributed as the conditional excess
- The moment generating function is $M_{S(t)}(r) = \exp\{\lambda t\,[M_X(r) - 1]\}$, which is how higher moments and approximations are derived
- $S(t)$ is not Poisson and is usually right-skewed; for large $\lambda t$ a Normal approximation is workable, but the skewness $\lambda t E[X^3] / (\lambda t E[X^2])^{3/2}$ vanishes only slowly

![[Media/Figures/Compound_Poisson_Process.svg|340]]

> [!example]- Mean and Variance of Annual Aggregate Losses {Example}
> Claims arrive at $\lambda = 50$ per year. Severity is [[Exponential Distribution|exponential]] with mean $2{,}000$. Find the mean and standard deviation of aggregate losses in one year.
>
> > [!answer]-
> > For an exponential with mean $\theta = 2{,}000$: $E[X] = 2{,}000$ and $E[X^2] = 2\theta^2 = 8 \times 10^6$.
> > $$E[S(1)] = 50 \times 2{,}000 = 100{,}000$$
> > $$\text{Var}(S(1)) = 50 \times 8 \times 10^6 = 4 \times 10^8$$
> > $$\text{SD}(S(1)) = \sqrt{4 \times 10^8} = 20{,}000$$

> [!example]- Aggregate Losses Above a Deductible {Example}
> With $\lambda = 50$ and exponential severity of mean $2{,}000$, a $1{,}000$ [[Deductible]] is applied to every claim. Find the mean aggregate payment.
>
> > [!answer]-
> > Claims that pierce the deductible are a thinned Poisson process with rate
> > $$\lambda' = 50 \times P(X > 1{,}000) = 50\,e^{-1000/2000} = 50\,e^{-0.5} \approx 30.33$$
> > By the memoryless property, each such payment is again exponential with mean $2{,}000$, so
> > $$E[S'] = 30.33 \times 2{,}000 \approx 60{,}650$$
