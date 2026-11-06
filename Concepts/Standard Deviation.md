---
verification:
  status: stale
  confidence: null
  last_checked: 2026-09-28
  last_checked_by: agent:validate-v1
  content_hash: sha256:d78def4190a05ca281f46762bbd7e94b181c32bc2e8988c59012771b576f9083
  sources:
    - "Grinstead & Snell, Introduction to Probability (2nd rev. ed., 2006 GNU FDL version), sec. 6.2 definition of D(X), Thm 6.6 and Thm 6.7, sha256:763eab9894983ddfd6cd7f84685548d1515a9326a2d9fd015474534460551a5e — https://math.dartmouth.edu/~prob/prob/prob.pdf"
    - "Pishro-Nik, Introduction to Probability, Statistics, and Random Processes, sec. 3.2.4 Variance (fetched 2026-09-27), sha256:90ca917f6141a0c49d353bdae1e824585656afd7d76c80823c31247f0c522008 — https://www.probabilitycourse.com/chapter3/3_2_4_variance.php"
    - "SOA Probability Exam syllabus, November 2026, univariate random variables learning objectives c) (expected values incl. moments, mode, median, percentiles) and d) (variance, standard deviation, coefficient of variation), sha256:bed27462961aa988fc66c90fefa34af47ea324e2ab9109889c4e4f8f78d97397 — https://www.soa.org/globalassets/assets/files/edu/2026/fall/syllabi/2026-11-exam-p-syllabus.pdf"
  open_findings: 0
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
