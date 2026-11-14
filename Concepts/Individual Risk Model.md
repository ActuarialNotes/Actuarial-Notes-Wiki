---
aliases:
  - Individual Risk
verification:
  status: stale
  confidence: null
  last_checked: 2026-10-31
  last_checked_by: agent:validate-v1
  content_hash: sha256:aad4ebefea818a96200eb5a02308c952afba7a6968cf02214cb2a497d4fdb958
  sources:
    - "Frees et al., Loss Data Analytics (open text, openacttexts.github.io), ch.5, 5.1 individual vs collective (n fixed, mass at zero); 5.2 X_i=I_iB_i, E(S)=sum q_i mu_i, Var(S)=sum(q_i sigma_i^2+q_i(1-q_i)mu_i^2), fixed benefit term life sigma^2=0; 5.3.1 compound Poisson variance; 5.4 normal approximation, sha256:09489050a45e6eb2ee0d96804458eb22c936a61716227e08ad0398b9cba870d4 — https://openacttexts.github.io/Loss-Data-Analytics/ChapAggLossModels.html"
    - "SOA Tables for Exam FAM (Loss Models Appendices A and B excerpts), A.5.1.1 lognormal E[X^k]=exp(k mu + k^2 sigma^2/2), p.10, sha256:430c8babdb38ff53ae7ce7d5d1d3bd55c2890eeb9ae96db5015121d1c2f11e17 — https://www.soa.org/globalassets/assets/files/edu/2024/fall/2024-10-exam-fam-tables.pdf"
    - "SOA Exam FAM Syllabus, February 2027, Topic 2 outcomes i-j (collective and individual risk models; log-normal or normal approximation), p.3, sha256:da98474b74b0a9e9153b8ce198f30195dfbe394b3e300e785e58f12663b447e4 — https://www.soa.org/globalassets/assets/files/edu/2027/spring/syllabi/2027-2-fam-syllabus.pdf"
    - "Wiley, Loss Models 5th ed. — Table of Contents excerpt (PDF), 9.8 The Individual Risk Model: 9.8.1, 9.8.2 Parametric Approximation, 9.8.3 Compound Poisson Approximation, p.vii, sha256:814f18cfefff53b09b2f477c3d6fd8eb84d77ef1aea69a8a27beefc620f2afe3 — https://media.wiley.com/product_data/excerpt/88/11195237/1119523788-8.pdf"
  open_findings: 0
  open_critical: 0
  log: .verify/Concepts/Individual Risk Model.md
---

The **Individual Risk Model** represents the aggregate losses of a portfolio as the sum of the losses on a fixed number $n$ of independent policies, most of which have no claim. It is unrelated to [[Individual Risk Rating]], an Exam 8 pricing topic. The aggregate loss is

> $$S = X_1 + X_2 + \cdots + X_n, \quad X_j = I_j B_j$$

- $I_j$ is an indicator that is 1 if policy $j$ has a claim and 0 otherwise, with $q_j = \Pr(I_j = 1)$.
- $B_j$ is the claim amount if policy $j$ has a claim.

The policies are independent but not identically distributed, so each can have its own claim probability and benefit. The number of claims, $\sum I_j$, is random, and $n$ is the fixed number of policies.

## Mean and variance

The mean and variance of the aggregate loss are

> $$E[S] = \sum_{j=1}^{n} q_j\,\mu_j$$

> $$\text{Var}(S) = \sum_{j=1}^{n} \left[q_j\,\sigma_j^2 + q_j(1 - q_j)\,\mu_j^2\right]$$

- $\mu_j$ and $\sigma_j^2$ are the mean and variance of the claim amount $B_j$.

Conditioning on the indicator, the [[Variance for Conditional and Marginal Distributions|law of total variance]] gives $E[\text{Var}(X_j \mid I_j)] = q_j\sigma_j^2$ and $\text{Var}(E[X_j \mid I_j]) = q_j(1 - q_j)\mu_j^2$. Independence then lets the means and the variances add across policies.

With a fixed benefit $b_j$, as in [[Term Life Insurance|group term life]], $\sigma_j^2 = 0$, and $X_j$ is $b_j$ times a Bernoulli variable. Its variance is still $q_j(1 - q_j)b_j^2$, because the policy pays either nothing or the full benefit.

> [!trap] Leaving out the claim-or-no-claim term
> The variance of $X_j$ is $q_j\sigma_j^2 + q_j(1 - q_j)\mu_j^2$. Using $q_j\sigma_j^2$ alone ignores the uncertainty over whether a claim happens, and using $q_j E[B_j^2]$ gives the larger compound Poisson variance.

## The normal and lognormal approximations

The exact distribution of $S$ needs a [[Convolution|convolution]] of $n$ different distributions, so for a large portfolio $S$ is approximated by a [[Normal Approximation|normal]] or a [[Lognormal Distribution|lognormal]] distribution with the same mean and variance. The lognormal's parameters are

> $$\sigma^2 = \ln\left(1 + \frac{\text{Var}(S)}{E[S]^2}\right)$$

> $$\mu = \ln E[S] - \frac{\sigma^2}{2}$$

> [!example]- What are the mean and variance of total claims, and the premium covering claims with probability 0.95 under the normal approximation? {Example}
> A group life policy covers two classes of employees, whose deaths are independent:
>
> | Employees | Death probability | Benefit ($) |
> | ---: | ---: | ---: |
> | 400 | 0.002 | 100,000 |
> | 200 | 0.005 | 50,000 |
>
> > [!answer]-
> > - The benefits are fixed, so each variance term is $q_j(1 - q_j)\,b_j^2$.
> > - $E[S] = 400(0.002)(100{,}000) + 200(0.005)(50{,}000) = 80{,}000 + 50{,}000 = 130{,}000$.
> > - The first class adds $400(0.002)(0.998)(100{,}000)^2 = 7.984 \times 10^{9}$ to the variance.
> > - The second adds $200(0.005)(0.995)(50{,}000)^2 = 2.4875 \times 10^{9}$.
> > - $\text{Var}(S) = 1.04715 \times 10^{10}$, and the standard deviation is $102{,}330$.
> > - The premium is $130{,}000 + 1.645(102{,}330) = \$298{,}333$.
> > - The premium is more than twice the expected claims, because a single death in the first class costs $\$100{,}000$ against a mean of $\$130{,}000$. With so few expected deaths, the distribution of $S$ is very skewed and the normal approximation is rough.

## The individual and collective models

In the collective model, a random claim count $N$ is independent of identically distributed claim amounts ([[Aggregate Loss Model|aggregate loss model]]). Modelling the same book collectively, with $N$ Poisson with mean $\sum q_j$ and a severity that mixes the $B_j$ with weights proportional to $q_j$, keeps the mean but adds $\sum q_j^2\mu_j^2$ to the variance, because a Poisson count lets a policy claim more than once. A question that lists policies that can each claim at most once is set in the individual model, while one that gives a distribution for the number of claims is set in the collective model.

> [!example]- How does the variance of $S$ in the individual model compare with a collective model with a Poisson number of claims of the same mean? {Example}
> Each of 1,000 independent health policies has a probability of 0.1 of a claim in the year. Given a claim, the amount has mean 2,000 and standard deviation 1,500.
>
> > [!answer]-
> > - Each policy has the same $q$, $\mu$ and $\sigma$, so the sums are 1,000 times one policy's values.
> > - $E[S] = 1{,}000(0.1)(2{,}000) = 200{,}000$.
> > - $\text{Var}(X_j) = 0.1(1{,}500)^2 + 0.1(0.9)(2{,}000)^2 = 225{,}000 + 360{,}000 = 585{,}000$.
> > - In the individual model, $\text{Var}(S) = 1{,}000(585{,}000) = 5.85 \times 10^{8}$.
> > - The collective model has $\lambda = 100$, and its variance is $\lambda\,E[B^2] = 100(1{,}500^2 + 2{,}000^2) = 6.25 \times 10^{8}$.
> > - The difference, $4 \times 10^{7}$, is exactly $\sum q_j^2\mu_j^2 = 1{,}000(0.01)(4{,}000{,}000)$.
> > - The standard deviations are 24,187 and 25,000, so the collective model is slightly conservative.
