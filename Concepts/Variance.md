---
verification:
  status: verified
  confidence: high
  last_checked: 2026-11-06
  last_checked_by: agent:validate-v1
  content_hash: sha256:3477615badd7614cd1e8e10b363c40c81ab752d22f264a2ced31a8167dd3530d
  sources:
    - "Grinstead & Snell, Introduction to Probability (2nd rev. ed., GNU FDL version), Def. 6.1 p.226 (PDF p.234, absolute convergence; no expected value otherwise); Thm 6.2 linearity, expectations add whether or not independent; Def. 6.3 variance and standard deviation p.257; Thms 6.6 Var=E(X^2)-mu^2, 6.7 V(cX)=c^2V(X), V(X+c)=V(X), 6.8 V(X+Y)=V(X)+V(Y) independent, 6.9 sigma(S_n)=sigma sqrt(n) (pp.258-260, PDF pp.265-268), sha256:763eab9894983ddfd6cd7f84685548d1515a9326a2d9fd015474534460551a5e — https://math.dartmouth.edu/~prob/prob/prob.pdf"
    - "Siegrist, Probability, Mathematical Statistics, and Stochastic Processes (randomservices.org, fetched 2026-11-06), 4.3 Variance: var>=0, =0 iff constant; var(a+bX)=b^2 var(X), sd(a+bX)=|b|sd(X); standard score; cv(X)=sd(X)/E(X), E(X)!=0, compares variability across different means, sha256:f0c1c5b0b4846e96d07f956599d1a428069c9402f2481a9e9ab3d6ca123f02bf — https://www.randomservices.org/random/expect/Variance.html"
    - "Siegrist, Probability, Mathematical Statistics, and Stochastic Processes (randomservices.org, fetched 2026-11-06), 4.5 Covariance and correlation: cov=E(XY)-E(X)E(Y); cor=cov/(sd sd); var(X+Y)=var(X)+var(Y)+2cov(X,Y), sha256:23ef4758146296b9865ca3f82f0e849934a667dcc8643afaa28147ad146feef7 — https://www.randomservices.org/random/expect/Covariance.html"
    - "Siegrist, Probability, Mathematical Statistics, and Stochastic Processes (randomservices.org, fetched 2026-11-06), 4.7 Conditional expected value: var(Y)=E[var(Y|X)]+var[E(Y|X)], sha256:23e328f9ee55e32522905aba62841f2920eef0d32fb68d7fbb1f4e0b0eaf62f6 — https://www.randomservices.org/random/expect/Conditional.html"
    - "CAS, Exam MAS-II Content Outlines (2026), Domain A Introduction to Credibility, tasks 1-2: classical (limited fluctuation), Bühlmann, Bühlmann-Straub and Bayesian credibility; reading Tse (p.2), sha256:babf0548b7d674e02d2cffdaee11e5063f8e8c03b3461b8ba2bdfdbc0f90ea1b — https://www.casact.org/sites/default/files/2026-01/MASII_Content_Outlines_2026.pdf"
    - "Frees et al., Loss Data Analytics (open text), Ch. 9 Credibility: §9.2 full credibility standards, n_X = lambda_kp (sigma_X/mu_X)^2 (eq. 9.6), n_PP = lambda_kp[sigma_N^2/mu_N + (sigma_X/mu_X)^2], lambda_kp=(y_p/k)^2; §9.3 Bühlmann EPV and VHM, sha256:35a840449990c8fda61687ebde4646508b6296ffac3daba18f0181eb2511fa36 — https://openacttexts.github.io/Loss-Data-Analytics/ChapCredibility.html"
    - "CAS, Exam MAS-I Content Outline (2026), Domain A tasks 1-3 (Poisson processes; expected values, variances; limited expected value) p.3; Domain B tasks 1, 5, 6, 9 (sample mean and variance; frequency and severity; aggregate; censoring and truncation) p.4, sha256:245892366dea073ff44e89b3ac2ae1401517b127d36d51c8a1198b3185faa2ed — https://www.casact.org/sites/default/files/2026-06/MASI_ContentOutline_2026.pdf"
    - "SOA, Exam FAM syllabus, February 2027, Topic 1 coverage modifications (p.2); Topic 2 severity moments, existence of moments, aggregate mean and variance (p.3); Topic 9 present value random variables, means and variances, notation for their expected values (p.7); Topic 10 future loss random variable, sha256:da98474b74b0a9e9153b8ce198f30195dfbe394b3e300e785e58f12663b447e4 — https://www.soa.org/globalassets/assets/files/edu/2027/spring/syllabi/2027-2-fam-syllabus.pdf"
  open_findings: 0
  open_critical: 0
  log: .verify/Concepts/Variance.md
---

**Variance** $\sigma^2$, written $\text{Var}(X)$, measures the spread or dispersion of a [[Random Variable]]'s distribution as the expected squared deviation from its [[Expected Value|mean]] $\mu$.

> $$\text{Var}(X) = E\left[(X - \mu)^2\right]$$

> $$= E[X^2] - \mu^2$$

- Efficient computation formula: $\text{Var}(X) = E[X^2] - \mu^2$ where $\mu = E[X]$.
- $\text{Var}(X) \geq 0$, since $(X - \mu)^2 \geq 0$. A variable that always equals its mean, such as a constant, has variance 0.
- The [[Standard Deviation|standard deviation]] $\sigma$ is its square root, back in the units of $X$.

> [!idea] The idea
> Deviations from the mean average to zero, because the ones above cancel the ones below. Squaring them first makes every deviation count as positive. Squaring also makes a large deviation count far more than a small one, so one big claim far from the mean dominates the variance.

![[Media/Figures/Variance.svg|340]]

## How far from the mean, on average?

A claim $X$ costs 0, 100 or 500 with probabilities 0.5, 0.3 and 0.2, so $\mu = 130$. How spread out are the claims around 130?

| $x$ | $x - \mu$ | $(x - \mu)^2$ | Weighted |
|---|---|---|---|
| 0 | $-130$ | 16,900 | 8,450 |
| 100 | $-30$ | 900 | 270 |
| 500 | 370 | 136,900 | 27,380 |

- Adding the last column gives $\text{Var}(X) = 36{,}100$.
- The 500 claim has probability only 0.2, yet it supplies three-quarters of the variance.

## The shortcut: $E[X^2] - \mu^2$

Squaring each deviation is slow. Expanding the square gives a quicker route that needs only two moments.

> $$
> \begin{align*}
> E[X^2] &= 0.3(100^2) + 0.2(500^2) \\
>        &= 53{,}000 \\
> \text{Var}(X) &= 53{,}000 - 130^2 \\
>               &= 36{,}100
> \end{align*}
> $$

The shortcut matches the table. It is also how a variance is found from a density, a CDF or an MGF: find $E[X]$ and $E[X^2]$, then subtract.

> [!trap] Squaring the wrong thing
> $E[X^2]$ and $(E[X])^2$ are different numbers. Here they are 53,000 and 16,900. Using $E[X^2]$ alone as the variance, or forgetting to square the mean, gives one of the wrong options.

## Shifts and scales

What happens to the variance when every claim is changed the same way?

- $\text{Var}(aX + b) = a^2 \text{Var}(X)$. Scaling changes variance, shifts do not.
- With 10% inflation, $\text{Var}(1.1X) = 1.21 \times 36{,}100 = 43{,}681$. The factor is squared.
- Adding a flat handling fee of 20 to every claim moves the mean to 150 but leaves the variance at 36,100. Every deviation from the mean is unchanged.

## Variance of a payment

The policy has a deductible of 50, so it pays $Y = (X - 50)_+$, which is 0, 50 or 450. A payment is a function of the claim, so its variance comes from its own two moments.

> $$
> \begin{align*}
> E[Y] &= 0.3(50) + 0.2(450) \\
>      &= 105 \\
> E[Y^2] &= 0.3(50^2) + 0.2(450^2) \\
>        &= 41{,}250 \\
> \text{Var}(Y) &= 41{,}250 - 105^2 \\
>               &= 30{,}225
> \end{align*}
> $$

The deductible lowers the variance as well as the mean. It is not $\text{Var}(X)$ shifted, because the deductible does not move every claim by the same amount.

## Adding claims together

Two claims $X_1$ and $X_2$ of this kind are added. The variance of a sum picks up the [[Covariance|covariance]] between the pieces.

> $$\text{Var}(X_1 + X_2) = \text{Var}(X_1) + \text{Var}(X_2) + 2\,\text{Cov}(X_1, X_2)$$

- If the two claims are independent, the covariance is 0 and the variance is $2 \times 36{,}100 = 72{,}200$.
- One claim doubled, $2X$, has variance $4 \times 36{,}100 = 144{,}400$. Two independent claims vary less than one claim doubled, because their deviations partly cancel.
- More pieces and weights are in [[Moments for Linear Combinations]].

## Conditioning: the law of total variance

The claim can be seen in two stages. First, whether there is a claim at all, with probability 0.5. Then, given a claim, its size is 100 or 500 with probabilities 0.6 and 0.4. The total variance splits into the average variance within each stage plus the variance of the stage means.

> $$\text{Var}(X) = E[\text{Var}(X \mid \Theta)] + \text{Var}(E[X \mid \Theta])$$

- Given a claim, the mean is 260 and the variance is $0.6 \times 0.4 \times 400^2 = 38{,}400$. Given no claim, both are 0.
- The average variance is $0.5 \times 38{,}400 = 19{,}200$.
- The stage means are 0 and 260, each with probability 0.5. Their variance is $0.25 \times 260^2 = 16{,}900$.
- The total is $19{,}200 + 16{,}900 = 36{,}100$, matching the table. See [[Variance for Conditional and Marginal Distributions]].

## On other exams

- **MAS-II** builds credibility on the two pieces of the law of total variance: the [[Expected Value of Process Variance|expected value of the process variance]] and the [[Variance of Hypothetical Means|variance of the hypothetical means]]. See [[Bühlmann Credibility]].
- **MAS-I** and **FAM** apply the same formulas to loss distributions, payments after deductibles and limits, and aggregate losses.

## Try it

> [!example]- Variance of an Insurance Payment {Example}
> A loss $X$ has $E[X] = 500$ and $E[X^2] = 310{,}000$. Find $\text{Var}(X)$.
>
> > [!answer]-
> > **Plan:** use the computational formula, subtracting the square of the mean.
> > $$
> > \begin{align*}
> > \text{Var}(X) &= E[X^2] - (E[X])^2 \\
> >               &= 310{,}000 - 500^2 \\
> >               &= 60{,}000
> > \end{align*}
> > $$

> [!example]- Variance from a density {Example}
> A loss $X$ is uniform on $(0, 1000)$. Find $\text{Var}(X)$, and the variance of the loss after 5% inflation and a flat fee of 25.
>
> > [!answer]-
> > **Plan:** integrate for the first two moments, subtract, then apply the scaling rule.
> > $$
> > \begin{align*}
> > E[X^2] &= \int_0^{1000} \frac{x^2}{1000}\,dx \\
> >        &= 333{,}333.3 \\
> > \text{Var}(X) &= 333{,}333.3 - 500^2 \\
> >               &= 83{,}333.3 \\
> > \text{Var}(1.05X + 25) &= 1.05^2 \times 83{,}333.3 \\
> >                        &= 91{,}875
> > \end{align*}
> > $$
> > The fee shifts every loss by the same amount, so it drops out.

> [!example]- A mixture of two risk classes {Example}
> Half of a portfolio's policies are low risk, with annual claims of mean 100 and variance 2,500. The other half are high risk, with mean 300 and variance 10,000. Find the variance of the claims of a policy chosen at random.
>
> > [!answer]-
> > **Plan:** the risk class is the first stage. Average the class variances, then add the variance of the class means.
> > $$
> > \begin{align*}
> > E[\text{Var}(X \mid \Theta)] &= 0.5(2{,}500) + 0.5(10{,}000) \\
> >                              &= 6{,}250 \\
> > \text{Var}(E[X \mid \Theta]) &= 0.5(100 - 200)^2 + 0.5(300 - 200)^2 \\
> >                              &= 10{,}000 \\
> > \text{Var}(X) &= 6{,}250 + 10{,}000 \\
> >               &= 16{,}250
> > \end{align*}
> > $$
> > Why more than either class? Not knowing the class adds its own uncertainty, the spread between 100 and 300.

> [!warning]- Exam traps
> - **$E[X^2]$ as the variance.** Subtract $\mu^2$.
> - **Not squaring the scale.** $\text{Var}(aX) = a^2\,\text{Var}(X)$, not $a\,\text{Var}(X)$. A shift $b$ drops out entirely.
> - **$\text{Var}(2X)$ for $\text{Var}(X_1 + X_2)$.** One loss doubled has four times the variance. Two independent losses have twice.
> - **Averaging the variances of a mixture.** The mixture's variance adds the variance of the class means to the average class variance.
