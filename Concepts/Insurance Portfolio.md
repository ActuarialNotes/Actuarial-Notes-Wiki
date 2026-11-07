---
verification:
  status: stale
  confidence: null
  last_checked: 2026-10-05
  last_checked_by: agent:validate-v1
  content_hash: sha256:e24eea472edbcd61fe5f0634896f453e3835ac8a0111fbc20d27555ecacd7aca
  sources:
    - "American Academy of Actuaries, Extreme Events and Property Lines Committee, Uses of Catastrophe Model Output (July 2018), pp.11, 13, 20, 23, 26 (PDF pp.15, 17, 24, 27, 30: entire book of business; how a property's loss potential interacts with existing policies; AAL = expected loss per year; PML / return period loss; 1,000 homes around Florida vs coastal Miami-Dade; premiums commensurate with risk, risk selection; adding a property changes the book's PML; many claims in close geographic proximity all at once, transferred to reinsurers), sha256:66a8390a3fa24c93d203b0dec3227811a8dcd15c3cf9c8a49459bf9265260bd6 — https://www.actuary.org/sites/default/files/files/publications/Catastrophe_Modeling_Monograph_07.25.2018.pdf"
    - "Mango, 'An Application of Game Theory: Property Catastrophe Risk Load', Proceedings of the CAS LXXXV (1998), pp.157-158 and §§2, 4 (marginal methods use the change in portfolio variance / standard deviation from adding a new account; Var(L + n) = Var(L) + Var(n) + 2Cov(L, n), eq.(2.4); MV risk load λ[Var(n) + 2Cov(L, n)], eq.(4.1)), sha256:29233156c3360784643452285edd2f4037c82de544f441a07976766f01a6ddc2 — https://www.casact.org/sites/default/files/database/proceed_proceed98_980157.pdf"
    - "CAS Exam 9 Content Outline, October 2026 sitting (Exam_9_CO_2026_Fall), Domain A statement ('manage the total exposure from catastrophic events within an insurance portfolio'; catastrophe expected loss cost), PDF p.3, sha256:be1980d41470fed30dec1b9af9412f4e936d666e65d01237684acde11f3e7fc8 — https://www.casact.org/sites/default/files/2026-03/Exam_9_CO_2026_Fall.pdf"
    - "Frees et al., Loss Data Analytics (open text, arXiv:1808.06718v1, 2018), §1.2.3, PDF pp.20-21 ('the portfolio, or collection, of risks that an insurer has acquired'; insurers buy reinsurance on that portfolio), sha256:1df1831e7d67a072712a2945645b788f5974748143da267bb471b9a7bc3baf33 — https://arxiv.org/pdf/1808.06718v1"
    - "Siegrist, Random (randomservices.org, HTML fetched 2026-10-05), ch.3 §5 Covariance and Correlation, 'The Variance of a Sum' (var of a sum = sum of variances + covariance terms; uncorrelated case), sha256:23ef4758146296b9865ca3f82f0e849934a667dcc8643afaa28147ad146feef7 — https://www.randomservices.org/random/expect/Covariance.html"
    - "Daniel, \"Poisson processes (and mixture distributions)\", CAS Study Note (June 2008) — MAS-I syllabus reading, §1.3.3 pp.11-12 (Poisson-Gamma mixture is Negative Binomial; an insurer models each insured's claims as Poisson with λ varying randomly among insureds), sha256:e345451e9daae82b400aed77f2da0c96c361ed4fbdfd22456b8f711ca0d50888 — https://www.casact.org/sites/default/files/2021-03/MAS-I_Daniel_1.pdf"
    - "Mahler & Dean, 'Credibility', ch.8 of Foundations of Casualty Actuarial Science (SOA study note C-21-01), exercise 5.2.1 PDF pp.98-99 (insurance portfolio, policyholders' λ Gamma), §5.3 PDF pp.100-101 (a policyholder's observed claims update its expected frequency, Ex. 5.3.1), sha256:bccdb7968ae276e041bf7f6eb5aea3aea473f1dc7739bc64352419c8a6a0f3c5 — https://www.soa.org/globalassets/assets/files/edu/C-21-01.pdf"
  open_findings: 0
  open_critical: 0
  log: .verify/Concepts/Insurance Portfolio.md
---

An **Insurance Portfolio**, or book of business, is the set of [[Insurance Policy|policies]] an [[Insurer|insurer]] holds, whose combined losses the insurer bears. If the portfolio has $n$ policies and $X_j$ is the loss on policy $j$ over a period, the total loss of the portfolio is

> $$S = X_1 + X_2 + \cdots + X_n$$

The [[Covariance#Variance of a sum|variance of the sum]] is

> $$\text{Var}(S) = \sum_{j=1}^{n} \text{Var}(X_j) + 2\sum_{j < k} \text{Cov}(X_j, X_k)$$

- $\text{Cov}(X_j, X_k)$ is the [[Covariance|covariance]] of the losses on policies $j$ and $k$.

When the policies are independent, every covariance is 0. Adding an independent policy then adds only its own mean to $E[S]$ and its own variance to $\text{Var}(S)$, and the [[Coefficient of Variation#Coefficient of variation of a pool of independent risks|coefficient of variation of a pool of independent risks]] falls as the number of policies grows. An insurance portfolio is a set of liabilities, and is distinct from an investment [[Portfolio|portfolio]] of assets.

> [!example]- A portfolio has 1,000 independent policies, each with an annual loss of mean 1,000 and standard deviation 10,000. What are the mean, the standard deviation and the coefficient of variation of the total loss? {Example}
> - The mean of the total loss is $1{,}000 \times 1{,}000 = 1{,}000{,}000$.
> - The variance is $1{,}000 \times 10{,}000^2 = 10^{11}$, so the standard deviation is $316{,}228$.
> - The coefficient of variation is $316{,}228/1{,}000{,}000 = 0.316$.

## Correlated policies

Policies exposed to a common event, such as a hurricane or a change in the legal environment, have correlated losses. For $n$ policies, each with mean $\mu$ and standard deviation $\sigma$, and with correlation $\rho$ between any two, the variance of the total loss is

> $$\text{Var}(S) = n\sigma^2 + n(n-1)\rho\,\sigma^2$$

and its coefficient of variation is

> $$\text{CV}(S) = \frac{\sigma}{\mu}\sqrt{\frac{1 + (n-1)\rho}{n}}$$

As $n$ grows, $\text{CV}(S)$ approaches $(\sigma/\mu)\sqrt{\rho}$ rather than 0. Adding correlated policies reduces the relative risk of the portfolio only down to this level. An insurer limits such concentrations through underwriting, pricing and [[Reinsurance|reinsurance]] ([[Catastrophe Exposure Management|catastrophe exposure management]]).

> [!example]- Each home in a coastal portfolio has an annual loss with mean $\mu$ and standard deviation $10\mu$, and any two homes' losses have correlation 0.01. What is the coefficient of variation of the total loss for 1,000 homes and for 10,000 homes, and how does it compare with independent homes? {Example}
> - With $n = 1{,}000$, $\text{CV}(S) = 10\sqrt{10.99/1{,}000} = 1.048$.
> - With $n = 10{,}000$, $\text{CV}(S) = 10\sqrt{100.99/10{,}000} = 1.005$.
> - Both are close to the limit $10\sqrt{0.01} = 1.0$.
> - Independent homes give $10\sqrt{1/1{,}000} = 0.316$ and $10\sqrt{1/10{,}000} = 0.100$.

## Differences between policies

The policies in a portfolio also differ in their expected numbers of claims. A [[Mixed Poisson Process|mixed Poisson process]] models this by treating a policy's claim rate as a draw from a [[Mixing Distribution|mixing distribution]] across the portfolio. A policy's own claims then carry information about its rate, which is the basis of [[Experience Rating|experience rating]].
