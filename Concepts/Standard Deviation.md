---
verification:
  status: verified
  confidence: medium
  last_checked: 2026-11-06
  last_checked_by: agent:validate-v1
  content_hash: sha256:d78def4190a05ca281f46762bbd7e94b181c32bc2e8988c59012771b576f9083
  sources:
    - "Grinstead & Snell, Introduction to Probability (2nd rev. ed., GNU FDL version), Def. 6.1 p.226 (PDF p.234, absolute convergence; no expected value otherwise); Thm 6.2 linearity, expectations add whether or not independent; Def. 6.3 variance and standard deviation p.257; Thms 6.6 Var=E(X^2)-mu^2, 6.7 V(cX)=c^2V(X), V(X+c)=V(X), 6.8 V(X+Y)=V(X)+V(Y) independent, 6.9 sigma(S_n)=sigma sqrt(n) (pp.258-260, PDF pp.265-268), sha256:763eab9894983ddfd6cd7f84685548d1515a9326a2d9fd015474534460551a5e — https://math.dartmouth.edu/~prob/prob/prob.pdf"
    - "Siegrist, Probability, Mathematical Statistics, and Stochastic Processes (randomservices.org, fetched 2026-11-06), 4.3 Variance: var>=0, =0 iff constant; var(a+bX)=b^2 var(X), sd(a+bX)=|b|sd(X); standard score; cv(X)=sd(X)/E(X), E(X)!=0, compares variability across different means, sha256:f0c1c5b0b4846e96d07f956599d1a428069c9402f2481a9e9ab3d6ca123f02bf — https://www.randomservices.org/random/expect/Variance.html"
    - "Siegrist, Probability, Mathematical Statistics, and Stochastic Processes (randomservices.org, fetched 2026-11-06), 4.5 Covariance and correlation: cov=E(XY)-E(X)E(Y); cor=cov/(sd sd); var(X+Y)=var(X)+var(Y)+2cov(X,Y), sha256:23ef4758146296b9865ca3f82f0e849934a667dcc8643afaa28147ad146feef7 — https://www.randomservices.org/random/expect/Covariance.html"
    - "Grinstead & Snell, Introduction to Probability (2nd rev. ed., GNU FDL version), Ch. 9 Central Limit Theorem, Thms 9.2-9.5 pp.330-345 (PDF pp.338-354), sha256:763eab9894983ddfd6cd7f84685548d1515a9326a2d9fd015474534460551a5e — https://math.dartmouth.edu/~prob/prob/prob.pdf"
    - "Siegrist, Probability, Mathematical Statistics, and Stochastic Processes (randomservices.org, fetched 2026-11-06), 6.5 Sample variance: s^2 = sum (x_i - m)^2/(n-1), sha256:452e2841007fad173229a9bb069a4acdda8e0d0bc6c1632f7239ef585248b0c6 — https://www.randomservices.org/random/sample/Variance.html"
    - "CAS, Exam MAS-I Content Outline (2026), Domain A tasks 1-3 (Poisson processes; expected values, variances; limited expected value) p.3; Domain B tasks 1, 5, 6, 9 (sample mean and variance; frequency and severity; aggregate; censoring and truncation) p.4, sha256:245892366dea073ff44e89b3ac2ae1401517b127d36d51c8a1198b3185faa2ed — https://www.casact.org/sites/default/files/2026-06/MASI_ContentOutline_2026.pdf"
    - "CAS, Exam 9 Content Outline, Fall 2026, Domains A-D tasks and readings (pp.3-6): no investment-return volatility or portfolio variance task, sha256:be1980d41470fed30dec1b9af9412f4e936d666e65d01237684acde11f3e7fc8 — https://www.casact.org/sites/default/files/2026-03/Exam_9_CO_2026_Fall.pdf"
    - "The Institutes / CAS, DISC RM syllabus, Course syllabus (pp.2-4): 1c Basic Risk Measures; no named measure, sha256:34fbee38024d3433de5d84c09138114c56edfb0336468dfefefdc78e23f67eac — https://www.casact.org/sites/default/files/2022-12/DISC_RM.pdf"
  open_findings: 1
  open_critical: 0
  log: .verify/Concepts/Standard Deviation.md
---

**Standard Deviation** $\sigma$ is the positive square root of [[Variance]], measuring the typical spread of a random variable $X$ around its mean in the same units as $X$.

> $$\sigma = \sqrt{\text{Var}(X)}$$

> $$= \sqrt{E[X^2] - (E[X])^2}$$

- The standard deviation is directly interpretable because it shares units with $X$, unlike variance.
- It satisfies $\sigma(aX + b) = |a|\,\sigma(X)$, so location shifts do not affect spread.
- Divided by the mean, it gives the [[Coefficient of Variation|coefficient of variation]], a spread free of units.

> [!idea] The idea
> Variance squares the deviations, so a variance of claims in dollars is measured in dollars squared, which nobody can picture. Taking the square root undoes the squaring of the units. The standard deviation is then a typical distance from the mean in dollars, the same scale as the claims themselves.

![[Media/Figures/Standard_Deviation.svg|340]]

## Back to the units of the claim

A claim $X$ costs 0, 100 or 500 with probabilities 0.5, 0.3 and 0.2. Its mean is 130 and its variance is 36,100 dollars squared.

> $$\sigma = \sqrt{36{,}100} = 190$$

- A typical claim lies about \$190 from the mean of \$130.
- The standard deviation is not the average distance from the mean. That average here is $0.5(130) + 0.3(30) + 0.2(370) = 148$. The standard deviation is larger because squaring weights the large deviation more.

## Shifts and scales

Inflation of 10% on every claim scales the standard deviation by 1.1, to 209. A flat handling fee of 20 on every claim leaves it at 190.

- $\sigma(aX + b) = |a|\,\sigma(X)$. The factor is $|a|$, not $a^2$ as for the variance.
- A negative $a$ still gives a positive standard deviation. $\sigma(-X) = \sigma(X)$.

## Standard deviations don't add

Two independent claims of this kind are added. Their variances add, so the standard deviation of the total is a square root of a sum.

> $$\sigma(X_1 + X_2) = \sqrt{36{,}100 + 36{,}100} \approx 268.7$$

- Adding the standard deviations would give 380. That is the standard deviation of one claim doubled, $2X$, not of two independent claims.
- For $n$ independent claims, the total has standard deviation $\sigma\sqrt{n}$. One hundred claims have total mean 13,000 and standard deviation $190\sqrt{100} = 1{,}900$.
- With correlation $\rho$ between two pieces, the variance of the sum gains $2\rho\,\sigma_1\sigma_2$. See [[Moments for Linear Combinations]].

> [!trap] Adding standard deviations
> $\sigma(X + Y) = \sigma(X) + \sigma(Y)$ only when $X$ and $Y$ are perfectly correlated. For independent pieces, add the variances and take the square root.

## How many standard deviations?

A standard deviation becomes a ruler for "how unusual" a total is. The [[Central Limit Theorem]] says a total of many independent claims is roughly [[Normal Distribution|normal]], so its percentiles sit a set number of standard deviations above the mean.

- The 95th percentile of the 100-claim total is about $13{,}000 + 1.645 \times 1{,}900 = 16{,}126$.
- A standardized value $z = (x - \mu)/\sigma$ counts standard deviations. A total of 16,800 is $z = 2$ standard deviations above the mean.

## On other exams

- **Exam 9** and the DISCs measure an investment's risk, or *volatility*, by the standard deviation of its return. For two assets with weights $w_1, w_2$ and correlation $\rho$, the portfolio's variance is below.

> $$\sigma_p^2 = w_1^2\sigma_1^2 + w_2^2\sigma_2^2 + 2w_1w_2\rho\,\sigma_1\sigma_2$$

- A correlation below 1 makes the portfolio's standard deviation less than the weighted average of the two. That reduction is diversification. See [[Volatility]].
- **MAS-I** works with a sample's standard deviation. The [[Sample Variance|sample variance]] divides by $n - 1$.

## Try it

> [!example]- Standard Deviation of a Claim Amount {Example}
> Claim amounts $X$ follow a distribution with $E[X] = 200$ and $E[X^2] = 50{,}000$. Find the standard deviation of $X$.
>
> > [!answer]-
> > **Plan:** find the variance from the two moments, then take its square root.
> >
> > First compute variance:
> > $$
> > \begin{align*}
> > \text{Var}(X) &= E[X^2] - (E[X])^2 \\
> >               &= 50{,}000 - 200^2 \\
> >               &= 10{,}000
> > \end{align*}
> > $$
> > Then:
> > $$\sigma = \sqrt{10{,}000} = 100$$
> > The standard deviation of the claim amount is \$100.

> [!example]- A total of independent claims {Example}
> Each of 400 independent policies has annual claims with mean 250 and standard deviation 500. Find the standard deviation of the total claims, and approximate the probability that the total exceeds 110,000.
>
> > [!answer]-
> > **Plan:** add variances across policies, then use the normal approximation.
> > $$
> > \begin{align*}
> > \sigma(S) &= 500\sqrt{400} \\
> >           &= 10{,}000 \\
> > z &= \frac{110{,}000 - 100{,}000}{10{,}000} \\
> >   &= 1
> > \end{align*}
> > $$
> > $P(S > 110{,}000) \approx P(Z > 1) = 0.1587$.
> >
> > Why not $400 \times 500$? That would treat the 400 policies as one policy scaled up, with no cancelling between them.

> [!example]- A two-asset portfolio {Example}
> Asset A has a standard deviation of return of 20% and asset B of 25%, with correlation $-0.4$. A portfolio holds 60% in A and 40% in B. Find its standard deviation.
>
> > [!answer]-
> > **Plan:** apply the two-asset variance formula, then take the square root.
> > $$
> > \begin{align*}
> > \sigma_p^2 &= 0.36(0.04) + 0.16(0.0625) \\
> >            &\quad + 2(0.6)(0.4)(-0.4)(0.2)(0.25) \\
> >            &= 0.0144 + 0.01 - 0.0096 \\
> >            &= 0.0148 \\
> > \sigma_p &\approx 12.2\%
> > \end{align*}
> > $$
> > The weighted average of the two standard deviations is 22%. The negative correlation cuts the portfolio's risk well below it.

> [!warning]- Exam traps
> - **Adding standard deviations.** For independent pieces, add variances and take the square root.
> - **$\sigma\,n$ for $\sigma\sqrt{n}$.** The total of $n$ independent claims has standard deviation $\sigma\sqrt{n}$. The average has $\sigma/\sqrt{n}$.
> - **Squaring the scale.** $\sigma(aX) = |a|\,\sigma(X)$. The square belongs to the variance.
> - **Variance where a standard deviation is asked.** A normal approximation divides by $\sigma$, not by $\sigma^2$.
