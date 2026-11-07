---
verification:
  status: stale
  confidence: null
  last_checked: 2026-11-06
  last_checked_by: agent:validate-v1
  content_hash: sha256:671fb99042c0498483986e9fdb0e6afddc6f9eab164ced1b2209a4ec81db2e94
  sources:
    - "Siegrist, Probability, Mathematical Statistics, and Stochastic Processes (randomservices.org, fetched 2026-11-06), 4.3 Variance: var>=0, =0 iff constant; var(a+bX)=b^2 var(X), sd(a+bX)=|b|sd(X); standard score; cv(X)=sd(X)/E(X), E(X)!=0, compares variability across different means, sha256:f0c1c5b0b4846e96d07f956599d1a428069c9402f2481a9e9ab3d6ca123f02bf — https://www.randomservices.org/random/expect/Variance.html"
    - "Grinstead & Snell, Introduction to Probability (2nd rev. ed., GNU FDL version), Def. 6.1 p.226 (PDF p.234, absolute convergence; no expected value otherwise); Thm 6.2 linearity, expectations add whether or not independent; Def. 6.3 variance and standard deviation p.257; Thms 6.6 Var=E(X^2)-mu^2, 6.7 V(cX)=c^2V(X), V(X+c)=V(X), 6.8 V(X+Y)=V(X)+V(Y) independent, 6.9 sigma(S_n)=sigma sqrt(n) (pp.258-260, PDF pp.265-268), sha256:763eab9894983ddfd6cd7f84685548d1515a9326a2d9fd015474534460551a5e — https://math.dartmouth.edu/~prob/prob/prob.pdf"
    - "Baranoff, Brockett & Kahane, Risk Management for Enterprises and Individuals v1.0 (Saylor Academy, 2012), §6.2 Measures of risk: standard deviation; coefficient of variation = SD/mean, a relative value of risk when means differ, sha256:2cd18f66c1d1d9bc8162fb93bce73ddf75b766f3363ac06e3ec20e165d473773 — https://saylordotorg.github.io/text_risk-management-for-enterprises-and-individuals/s06-02-measures-of-risk-putting-it-to.html"
    - "Baranoff, Brockett & Kahane, Risk Management for Enterprises and Individuals v1.0 (Saylor Academy, 2012), §6.5 Appendix: More Exposures, Less Risk: quadrupling the sample doubles the SD; CV as relative measure of risk, 9.5/100 vs 19/400, sha256:0fb4dd0d04812eb4f4ceaf8bc2e059ae323809659ce7945309682a998ee487fd — https://saylordotorg.github.io/text_risk-management-for-enterprises-and-individuals/s10-05-appendix-more-exposures-less-r.html"
    - "thismatter.com, Risk (rank 3), Objective risk (degree of risk): inversely proportional to the square root of the sample size, sha256:659df83373126ab2bcbc77f5c62f32ad63dc672422c9d5e5ddf8fc6cdf26343d — https://thismatter.com/money/insurance/risk.htm"
    - "SOA Exam C tables (Loss Models 3rd ed. Appendix A excerpts), A.2.3.1 Pareto (E[X^k] for -1<k<alpha, no M(t)) PDF p.8; A.3.2.1 Gamma (M(t)=(1-theta t)^-alpha, t<1/theta; E[X^k]) PDF p.9; A.3.3.1 Exponential (M(t), E[X^k]=theta^k k!, E[X^x]=theta(1-e^{-x/theta})) and A.5.1.1 Lognormal (E[X^k]=exp(k mu + k^2 sigma^2/2), no M(t)) PDF p.11, sha256:cefc3286baa0150b6520455e76104589f1187622212efe05a600926d0bf14e0f — https://www.soa.org/globalassets/assets/files/edu/edu-2009-fall-exam-c-table.pdf"
    - "Siegrist, Probability, Mathematical Statistics, and Stochastic Processes (randomservices.org, fetched 2026-11-06), 14.4 Poisson distribution: M+N Poisson with parameter a+b for independent Poisson M, N, sha256:cf3d0aacfdb40291bb729d32f6f7692b39e4c4a13a1e09f86ef8826bef61f688 — https://www.randomservices.org/random/poisson/Poisson.html"
    - "Frees et al., Loss Data Analytics (open text), Ch. 9 Credibility: §9.2 full credibility standards, n_X = lambda_kp (sigma_X/mu_X)^2 (eq. 9.6), n_PP = lambda_kp[sigma_N^2/mu_N + (sigma_X/mu_X)^2], lambda_kp=(y_p/k)^2; §9.3 Bühlmann EPV and VHM, sha256:35a840449990c8fda61687ebde4646508b6296ffac3daba18f0181eb2511fa36 — https://openacttexts.github.io/Loss-Data-Analytics/ChapCredibility.html"
    - "CAS, Exam MAS-II Content Outlines (2026), Domain A Introduction to Credibility, tasks 1-2: classical (limited fluctuation), Bühlmann, Bühlmann-Straub and Bayesian credibility; reading Tse (p.2), sha256:babf0548b7d674e02d2cffdaee11e5063f8e8c03b3461b8ba2bdfdbc0f90ea1b — https://www.casact.org/sites/default/files/2026-01/MASII_Content_Outlines_2026.pdf"
    - "Shapland, Using the ODP Bootstrap Model: A Practitioner's Guide (CAS Monograph 4, 2016), §5.5.1 Estimated-Unpaid Results, pp.41-42 (PDF pp.49-50): coefficient of variation = standard error divided by the mean; CoV for all years combined should be less than for any individual year, sha256:51b072243c0fe839cd776d9dc77532c544e2d52e025a29610e1aaea2cff07abf — https://www.casact.org/sites/default/files/2021-03/7_Shapland.pdf"
    - "CAS, Exam 7 Content Outline, Fall 2026, Complete text references: Mack (1994) and Shapland (2016) on the syllabus (pp.4-5), sha256:be1833c4f35a9344e33b1c48336dca9724d6556890997b3d8715f9de709ca5ed — https://www.casact.org/sites/default/files/2026-03/Exam_7_CO_2026_Fall.pdf"
    - "The Institutes / CAS, DISC RM syllabus, Course syllabus (pp.2-4): 1c Basic Risk Measures; no named measure, sha256:34fbee38024d3433de5d84c09138114c56edfb0336468dfefefdc78e23f67eac — https://www.casact.org/sites/default/files/2022-12/DISC_RM.pdf"
  open_findings: 1
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
