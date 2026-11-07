---
verification:
  status: stale
  confidence: null
  last_checked: 2026-10-31
  last_checked_by: agent:validate-v1
  content_hash: sha256:27108cd0a4d8b22980a17546ec286e80ce918f6dde417709141276a45ab935dc
  sources:
    - "Tse, Nonlife Actuarial Models: Theory, Methods and Evaluation (Cambridge UP, 2009), publisher preview: §1.1 aggregate claim = frequency x severity (PDF p.22), §1.5.1 compound distribution - \"A compound Poisson distribution is a compound distribution where the primary distribution is Poisson, for any secondary distribution\" (PDF p.39), Theorem 1.4 M_S(t) = M_N[log M_X(t)] (PDF p.41), Theorem 1.6 E(S) = mu_N mu_X, Var(S) = mu_N sigma_X^2 + sigma_N^2 mu_X^2 and eq. 1.79 Var(S) = lambda E(X^2), \"holds ... whether X is discrete or continuous\" (PDF p.45-46), contents §3.1 / §3.3 collective risk model and §3.3.3 its approximations (PDF p.10), sha256:f6d009afdd1776907db090b41b72dd5a76d0b5ba3f0ee42e8b07279d5763b404 — https://api.pageplace.de/preview/DT0400.9780511630231_A24404031/preview-9780511630231_A24404031.pdf"
    - "Daniel, \"Poisson processes (and mixture distributions)\", CAS Study Note (June 2008), §1.2 Definition 1.8 and Examples 1.9-1.10 (PDF p.6-7), Fact 1.11 and the normal approximation when E[N] is large (PDF p.7-8), sha256:e345451e9daae82b400aed77f2da0c96c361ed4fbdfd22456b8f711ca0d50888 — https://www.casact.org/sites/default/files/2021-03/MAS-I_Daniel_1.pdf"
    - "Frees & Johnson (eds.), Loss Data Analytics, Version 1.1 (Aug 2020, open textbook), Ch.5 §5.1 collective risk model, §5.3.1 moments and mgf incl. the Poisson case, sha256:09489050a45e6eb2ee0d96804458eb22c936a61716227e08ad0398b9cba870d4 — https://openacttexts.github.io/Loss-Data-Analytics/ChapAggLossModels.html"
    - "CAS Exam MAS-I Content Outline 2026 (MASI_CO_2026_F v06, 2026-06-29), Domain B task 6 (PDF p.4), Tse §1.1 assigned (PDF p.6), sha256:245892366dea073ff44e89b3ac2ae1401517b127d36d51c8a1198b3185faa2ed — https://www.casact.org/sites/default/files/2026-06/MASI_ContentOutline_2026.pdf"
    - "Fisher, McTaggart, Petker & Pettingell, Individual Risk Rating (CAS Study Note, v3 Oct 2019), Ch.3 §2.2 insurance charge phi(r) as a ratio to expected loss, PDF p.57; Table M by entry ratio PDF pp.57-58, sha256:3182cd5d8ebccc92be67a246e61a527acda5b304b823448d99f8a2546ca07b81 — https://www.casact.org/sites/default/files/2021-03/8_Fisher_et_al.pdf"
  open_findings: 0
  open_critical: 0
  log: .verify/Concepts/Aggregate Loss Model.md
---

![[Media/Figures/Aggregate_Loss_Model.svg|340]]

An **Aggregate Loss Model** is a model of the total loss $S$ of a group of risks over a period as the sum of a random number of claim amounts. The aggregate loss is

> $$S = X_1 + X_2 + \cdots + X_N$$

- $N$ is the number of claims, the [[Frequency|frequency]] random variable.
- $X_1, X_2, \ldots$ are the claim amounts, the [[Severity|severity]] random variables. They are independent and identically distributed, and independent of $N$.
- $S = 0$ when $N = 0$.

This model is also called the collective risk model. Let $X$ be a random variable with the common distribution of the claim amounts. The mean of the aggregate loss is

> $$E[S] = E[N]\,E[X]$$

and its variance is the [[Variance for Conditional and Marginal Distributions#Variance of a random sum|variance of a random sum]]:

> $$\text{Var}(S) = E[N]\,\text{Var}(X) + \text{Var}(N)\,(E[X])^2$$

> [!example]- The number of claims in a year has mean 100 and variance 300. Claim amounts have mean 500 and variance 90,000. What are the mean and the variance of the aggregate loss? {Example}
> - The mean is $E[S] = 100 \times 500 = 50{,}000$.
> - The first term of the variance is $E[N]\,\text{Var}(X) = 100 \times 90{,}000 = 9{,}000{,}000$.
> - The second term is $\text{Var}(N)\,(E[X])^2 = 300 \times 500^2 = 75{,}000{,}000$.
> - The variance is $9{,}000{,}000 + 75{,}000{,}000 = 84{,}000{,}000$.

## Poisson number of claims

When $N$ is Poisson with mean $\lambda$, the aggregate loss has a compound Poisson distribution, the distribution of a [[Compound Poisson Process|compound Poisson process]] at a fixed time. Since $E[N] = \text{Var}(N) = \lambda$, its variance simplifies to

> $$\text{Var}(S) = \lambda\,E[X^2]$$

- $E[X^2] = \text{Var}(X) + (E[X])^2$ is the second moment of the claim amount.

> [!example]- The number of claims in a year is Poisson with mean 100. Claim amounts have mean 500 and variance 90,000. What are the mean and the variance of the aggregate loss? {Example}
> - The mean is $E[S] = 100 \times 500 = 50{,}000$.
> - The second moment of a claim amount is $E[X^2] = 90{,}000 + 500^2 = 340{,}000$.
> - The variance is $\text{Var}(S) = 100 \times 340{,}000 = 34{,}000{,}000$.

## Normal approximation

When the expected number of claims is large, the [[Central Limit Theorem (CLT)|central limit theorem]] makes the aggregate loss approximately [[Normal Distribution|normal]] with mean $E[S]$ and variance $\text{Var}(S)$. The probability that the aggregate loss exceeds an amount $s$ is then approximately

> $$P(S > s) \approx 1 - \Phi\!\left(\frac{s - E[S]}{\sqrt{\text{Var}(S)}}\right)$$

- $\Phi$ is the cdf of the standard normal distribution.

> [!example]- With the Poisson number of claims above, what is the approximate probability that the aggregate loss exceeds 55,000? {Example}
> - The standard deviation of the aggregate loss is $\sqrt{34{,}000{,}000} = 5{,}831$.
> - The standardized value is $z = \frac{55{,}000 - 50{,}000}{5{,}831} = 0.86$.
> - The probability is $1 - \Phi(0.86) = 1 - 0.8051 = 0.1949$.

## Aggregate deductibles

An aggregate deductible $A$ applies to the total loss $S$ rather than to each claim. The expected payment above it is

> $$E[(S - A)_+] = E[S] - E[S \wedge A]$$

- $(S - A)_+$ is $S - A$ when $S > A$, and 0 otherwise.
- $S \wedge A$ is the smaller of $S$ and $A$.

As a ratio to $E[S]$, tabulated by the ratio of $A$ to $E[S]$, this expected payment is the insurance charge of [[Table M]].

> [!example]- The number of claims is Poisson with mean 1, and every claim is exactly 1,000. What is the expected payment above an aggregate deductible of 1,000? {Example}
> - The aggregate loss takes the values $0, 1{,}000, 2{,}000, \ldots$, and $E[S] = 1 \times 1{,}000 = 1{,}000$.
> - $S \wedge 1{,}000$ is 0 when there are no claims and 1,000 otherwise.
> - $E[S \wedge 1{,}000] = 1{,}000\,(1 - e^{-1}) = 632.12$.
> - The expected payment above the deductible is $1{,}000 - 632.12 = 367.88$.
