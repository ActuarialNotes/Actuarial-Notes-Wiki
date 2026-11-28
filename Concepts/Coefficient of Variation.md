---
verification:
  status: in_review
  confidence: null
  last_checked: 2026-11-28
  last_checked_by: agent:validate-v1
  content_hash: sha256:671fb99042c0498483986e9fdb0e6afddc6f9eab164ced1b2209a4ec81db2e94
  sources:
    - "Variance, section 4.3 Variance, sha256:f0c1c5b0b4846e96d07f956599d1a428069c9402f2481a9e9ab3d6ca123f02bf — https://www.randomservices.org/random/expect/Variance.html"
    - "https://math.dartmouth.edu/~prob/prob/prob.pdf, Theorem 6.9, PDF p.268, sha256:763eab9894983ddfd6cd7f84685548d1515a9326a2d9fd015474534460551a5e — https://math.dartmouth.edu/~prob/prob/prob.pdf"
    - "Appendix: More Exposures, Less Risk, section 6.5 Appendix, sha256:0fb4dd0d04812eb4f4ceaf8bc2e059ae323809659ce7945309682a998ee487fd — https://saylordotorg.github.io/text_risk-management-for-enterprises-and-individuals/s10-05-appendix-more-exposures-less-r.html"
    - "https://www.soa.org/globalassets/assets/files/edu/edu-2009-fall-exam-c-table.pdf, A.3.2.1, A.3.3.1, PDF pp.9, 11, sha256:cefc3286baa0150b6520455e76104589f1187622212efe05a600926d0bf14e0f — https://www.soa.org/globalassets/assets/files/edu/edu-2009-fall-exam-c-table.pdf"
    - "The Poisson Distribution, section Moments, mean and variance of N, sha256:cf3d0aacfdb40291bb729d32f6f7692b39e4c4a13a1e09f86ef8826bef61f688 — https://www.randomservices.org/random/poisson/Poisson.html"
  open_findings: 2
  open_critical: 0
  log: .verify/Concepts/Coefficient of Variation.md
---

![[Media/Figures/Coefficient_of_Variation.svg|340]]

A **Coefficient of Variation** is the [[Standard Deviation|standard deviation]] of a [[Random Variable|random variable]] divided by its [[Expected Value|mean]]. The coefficient of variation of a random variable $X$ is

> $$CV = \frac{\sigma}{\mu}$$

- $\sigma$ is the standard deviation of $X$.
- $\mu = E[X]$ is the mean of $X$, with $\mu \neq 0$.

The coefficient of variation has no units, so it compares the spread of distributions with different means or scales.

> [!idea] The idea
> A standard deviation of \$1,000 is large for a \$500 claim and small for a \$1 million building.

> [!example]- Distribution A has mean 500 and standard deviation 100. Distribution B has mean 2,000 and standard deviation 300. Which has the greater relative variability? {Example}
> - $CV_A = \frac{100}{500} = 0.20$.
> - $CV_B = \frac{300}{2{,}000} = 0.15$.
> - Distribution A has the greater relative variability, even though its standard deviation is smaller.

## Coefficient of variation of $aX + b$

For a constant $a > 0$, scaling multiplies the mean and the standard deviation by $a$, so the coefficient of variation of $aX$ is

> $$CV(aX) = CV(X)$$

Adding a constant $b > 0$ raises the mean but not the standard deviation, so it lowers the coefficient of variation.

> [!example]- A claim has mean 130 and standard deviation 190. What is its coefficient of variation after 10% inflation, and what is it if a flat fee of 20 is added instead? {Example}
> - Before either change, $CV = \frac{190}{130} \approx 1.46$.
> - Inflation multiplies both by 1.1, so $CV = \frac{209}{143}$, still about 1.46.
> - The fee makes the mean 150 and leaves the standard deviation at 190, so $CV = \frac{190}{150} \approx 1.27$.

## Coefficient of variation of a pool of independent risks

For the total of $n$ [[Independent and Identically Distributed|independent, identically distributed]] risks, each with coefficient of variation $CV$, the coefficient of variation of the total is

> $$CV_{\text{total}} = \frac{CV}{\sqrt{n}}$$

The mean of the total grows like $n$ but its standard deviation only like $\sqrt{n}$. So a larger pool is relatively more predictable, as the [[Law of Large Numbers|law of large numbers]] says.

> [!example]- Insurer A covers 900 homes and insurer B covers 3,600. Each home independently has a fire claim in a year with probability 0.02. What is the coefficient of variation of the number of claims at each insurer? {Example}
> - The number of claims is [[Binomial Distribution|binomial]], with mean $np$ and standard deviation $\sqrt{np(1-p)}$.
> - Insurer A expects $900(0.02) = 18$ claims, with standard deviation 4.2, so $CV_A = \frac{4.2}{18} \approx 0.233$.
> - Insurer B expects $3{,}600(0.02) = 72$ claims, with standard deviation 8.4, so $CV_B = \frac{8.4}{72} \approx 0.117$.
> - Four times the homes gives half the coefficient of variation, as $\frac{1}{\sqrt{4}}$ predicts.

> [!trap] Expecting pooling to lower the standard deviation
> Pooling lowers the coefficient of variation, not the standard deviation. The total's standard deviation still grows, by $\sqrt{n}$. Only the spread relative to the expected total shrinks.

## Coefficients of variation of named distributions

Several distributions have a coefficient of variation that depends on one parameter alone:

| Distribution | $CV$ |
| --- | --- |
| [[Exponential Distribution]] | 1 |
| [[Gamma]] with shape $\alpha$ | $\frac{1}{\sqrt{\alpha}}$ |
| [[Poisson Distribution]] with mean $\lambda$ | $\frac{1}{\sqrt{\lambda}}$ |
