---
verification:
  status: verified
  confidence: medium
  last_checked: 2026-11-06
  last_checked_by: agent:validate-v1
  content_hash: sha256:ceac404a789762305b6d7c2c60bfc5eda2d418a8fd630d96d014606d4df457c0
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

The **Coefficient of Variation** $CV$ is the ratio of the standard deviation to the mean, measuring dispersion as a proportion of the mean.

> $$CV = \frac{\sigma}{\mu}$$

> $$= \frac{\sqrt{\text{Var}(X)}}{E[X]}$$

- $\sigma$ is the [[Standard Deviation|standard deviation]] and $\mu$ is the [[Expected Value|mean]] of $X$.
- $CV$ is dimensionless, so it can compare the relative variability of distributions with different units or scales.
- A larger $CV$ indicates greater dispersion relative to the mean.
- It requires $E[X] \neq 0$. It is used to compare the variability of positive distributions, such as losses, with different expected values.

> [!idea] The idea
> A standard deviation of \$1,000 is large for a \$500 claim and small for a \$1 million building. The coefficient of variation divides the spread by the size, so it asks how wide the spread is *for a risk of this size*. Rescaling a risk, by inflation or a change of currency, then leaves it unchanged.

![[Media/Figures/Coefficient_of_Variation.svg|340]]

## Spread relative to size

A claim $X$ costs 0, 100 or 500 with probabilities 0.5, 0.3 and 0.2. Its mean is 130 and its standard deviation is 190.

> $$CV = \frac{190}{130} \approx 1.46$$

The standard deviation is almost one and a half times the mean. That is a very variable claim, because half the time nothing is paid and sometimes 500 is.

## What changes the CV?

| Change to every claim | Mean | Std dev | $CV$ |
|---|---|---|---|
| None | 130 | 190 | 1.46 |
| 10% inflation | 143 | 209 | 1.46 |
| Flat fee of 20 | 150 | 190 | 1.27 |

- Scaling by $a > 0$ multiplies the mean and the standard deviation by $a$, so the $CV$ is unchanged.
- Adding a constant raises the mean but not the spread, so the $CV$ falls.

## Pooling lowers the CV

An insurer writes 100 independent claims like $X$. The total has mean $100 \times 130 = 13{,}000$ and standard deviation $190\sqrt{100} = 1{,}900$.

> $$CV_{\text{total}} = \frac{1{,}900}{13{,}000} \approx 0.146$$

For $n$ independent, identical risks, the mean grows like $n$ but the standard deviation only like $\sqrt{n}$.

> $$CV_{\text{total}} = \frac{CV}{\sqrt{n}}$$

- Quadrupling the pool halves the $CV$. This is why a large insurer's results are relatively more predictable than a small one's.
- Risk management texts call this ratio for the number of claims *objective risk*. It is the [[Law of Large Numbers]] at work.

> [!trap] The total's standard deviation still grows
> Pooling lowers the $CV$, not the standard deviation. The total's standard deviation rises with $\sqrt{n}$. Only the spread *relative to the expected total* shrinks.

## CVs of named distributions

Several distributions have a $CV$ that depends on one parameter alone: the [[Exponential Distribution|exponential]], the [[Gamma|gamma]], the [[Poisson Distribution|Poisson]] and the [[Lognormal Distribution|lognormal]].

| Distribution | $CV$ |
|---|---|
| Exponential | 1 |
| Gamma with shape $\alpha$ | $1/\sqrt{\alpha}$ |
| Poisson with mean $\lambda$ | $1/\sqrt{\lambda}$ |
| Lognormal | $\sqrt{e^{\sigma^2} - 1}$ |

The lognormal row works in reverse too. Given a mean and a $CV$, it gives $\sigma^2 = \ln(1 + CV^2)$. See [[Moment]] for that fit.

## On other exams

- **MAS-II** sets limited-fluctuation credibility standards in terms of the severity's $CV$. With a Poisson claim count, full credibility for severity needs $n_0\,CV^2$ claims, and for the pure premium $n_0(1 + CV^2)$, where $n_0 = (z/k)^2$. For 90% probability within 5%, $n_0 = 1{,}082.41$. The claim above, with $CV^2 = 2.136$, would need about 2,312 claims for severity. See [[Limited Fluctuation Credibility]].
- **Exam 7** reports the variability of an [[Unpaid Claim Distribution|unpaid claim estimate]] as its standard error divided by its mean. The total across accident years usually has a lower $CV$ than each year, for the same pooling reason as above.
- **The DISCs** use the $CV$ to compare the riskiness of exposures of different sizes.

## Try it

> [!example]- Comparing Variability of Two Loss Distributions {Example}
> Distribution A has mean \$500 and standard deviation \$100. Distribution B has mean \$2{,}000 and standard deviation \$300. Which has greater relative variability?
>
> > [!answer]-
> > **Plan:** divide each standard deviation by its mean and compare.
> >
> > $CV_A = 100/500 = 0.20$ and $CV_B = 300/2{,}000 = 0.15$.
> >
> > Distribution A has greater relative variability, even though its absolute standard deviation is smaller.

> [!example]- The CV of an average {Example}
> Independent losses $X$ and $Y$ have the same mean. Their coefficients of variation are 1 and 2. Find the $CV$ of $\frac{1}{2}(X + Y)$.
>
> > [!answer]-
> > **Plan:** write both standard deviations in terms of the common mean $\mu$, add variances, then divide by the mean of the average.
> >
> > $\sigma_X = \mu$ and $\sigma_Y = 2\mu$. The average has mean $\mu$.
> > $$
> > \begin{align*}
> > \text{Var}\left(\tfrac{1}{2}(X + Y)\right) &= \tfrac{1}{4}\left(\mu^2 + 4\mu^2\right) \\
> >                                            &= 1.25\,\mu^2 \\
> > CV &= \frac{\sqrt{1.25}\,\mu}{\mu} \\
> >    &\approx 1.118
> > \end{align*}
> > $$
> > Why below 2 but above 1? Averaging cancels part of the spread, but the riskier loss still dominates.

> [!example]- Objective risk of two pools {Example}
> Insurer A covers 900 homes and insurer B covers 3,600. Each home independently has a fire claim in a year with probability 0.02. Compare the $CV$ of the number of claims at the two insurers.
>
> > [!answer]-
> > **Plan:** the claim count is binomial, so find its mean and standard deviation for each pool.
> > $$
> > \begin{align*}
> > CV_A &= \frac{\sqrt{900(0.02)(0.98)}}{900(0.02)} \\
> >      &= \frac{4.2}{18} \\
> >      &\approx 0.233 \\
> > CV_B &= \frac{\sqrt{3600(0.02)(0.98)}}{3600(0.02)} \\
> >      &= \frac{8.4}{72} \\
> >      &\approx 0.117
> > \end{align*}
> > $$
> > Four times the homes gives half the $CV$, as $1/\sqrt{4}$ predicts.

> [!warning]- Exam traps
> - **Variance over mean.** The $CV$ uses the standard deviation, $\sigma/\mu$, not $\sigma^2/\mu$.
> - **Pooling and the standard deviation.** Adding independent risks lowers the $CV$ but raises the total's standard deviation.
> - **A constant changes the CV.** A flat amount added to every loss lowers the $CV$. Only scaling leaves it alone.
> - **Adding CVs.** The $CV$ of a sum comes from the sum's own standard deviation and mean, never from adding or averaging the pieces' CVs.
