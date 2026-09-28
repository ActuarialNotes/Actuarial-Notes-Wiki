---
verification:
  status: verified
  confidence: high
  last_checked: 2026-09-28
  last_checked_by: agent:validate-v1
  content_hash: sha256:8ff7b2dcb60b4da7da5bf99fe723c0a63095963dd80da39cbe5343bc56c0785e
  sources:
    - "Grinstead & Snell, Introduction to Probability (2nd rev. ed., 2006 GNU FDL version), Theorems 6.6-6.8, Exercise 6.2.23, Exercise 6.3.17, sha256:763eab9894983ddfd6cd7f84685548d1515a9326a2d9fd015474534460551a5e — https://math.dartmouth.edu/~prob/prob/prob.pdf"
    - "Pishro-Nik, Introduction to Probability, Statistics, and Random Processes (probabilitycourse.com, HTML fetched 2026-09-27), §5.3.1 Covariance and Correlation (independent implies Cov = 0, converse not necessarily true; uncorrelated implies Var(X+Y) = Var(X) + Var(Y)), sha256:b6bc17d7f786f7ac8d2836f42d6524c99e8909254d473f1edef7909f1da9620e — https://www.probabilitycourse.com/chapter5/5_3_1_covariance_correlation.php"
    - "Anderson & Brown, Risk and Insurance (SOA study note P-21-05, 2005), pooling section (SD of the sum of n independent policies sqrt(n) sigma, less than n sigma; CV = SD/mean) (PDF pp.4-5), sha256:1cb44e7f9ee240a9a0597a89dbf3a055ab70d07a8739132c75440051ee655922 — https://www.soa.org/globalassets/assets/files/edu/P-21-05.pdf"
  open_findings: 0
  open_critical: 0
  log: .verify/Concepts/Variance and Standard Deviation.md
---

**Variance** $\sigma^2$ and **Standard Deviation** $\sigma$ both measure how far a [[Random Variable]] spreads around its mean. Variance is the expected squared deviation; standard deviation is its square root, restored to the original units of $X$.

> $$\sigma^2 = \text{Var}(X) = E\left[(X - \mu)^2\right]$$

> $$= E[X^2] - \mu^2$$

> $$\sigma = \text{SD}(X) = \sqrt{\text{Var}(X)}$$

- $\mu = E[X]$. The second form $E[X^2] - \mu^2$ is the one to use in practice — it needs only two moments and avoids expanding a square.
- $\text{Var}(aX + b) = a^2\,\text{Var}(X)$ and $\text{SD}(aX + b) = |a|\,\text{SD}(X)$ — a shift $b$ moves the distribution without changing its spread.
- For a sum, $\text{Var}(X + Y) = \text{Var}(X) + \text{Var}(Y) + 2\,\text{Cov}(X,Y)$; the [[Covariance]] term drops out whenever $X$ and $Y$ are uncorrelated, $\text{Cov}(X,Y) = 0$ — for example when they are [[Independent Random Variables|independent]]. Zero covariance does not imply independence. See [[Moments for Linear Combinations]].
- Standard deviations do **not** add: $\text{SD}(X+Y) \neq \text{SD}(X) + \text{SD}(Y)$. Always add variances, then take the square root at the very end.
- Dividing $\sigma$ by $\mu$ gives the unitless [[Coefficient of Variation]].

> [!example]- Variance of a Discrete Claim Count {Example}
> The number of claims $N$ on a policy has $P(N=0) = 0.6$, $P(N=1) = 0.3$, $P(N=2) = 0.1$. Find $\text{Var}(N)$ and $\text{SD}(N)$.
>
> > [!answer]-
> > First both moments:
> > $$
> > \begin{align*}
> > E[N] &= 0(0.6) + 1(0.3) + 2(0.1) \\
> >      &= 0.5 \\
> > E[N^2] &= 0^2(0.6) + 1^2(0.3) + 2^2(0.1) \\
> >        &= 0.7
> > \end{align*}
> > $$
> > Then the variance and standard deviation:
> > $$
> > \begin{align*}
> > \text{Var}(N) &= E[N^2] - (E[N])^2 \\
> >               &= 0.7 - 0.25 \\
> >               &= 0.45 \\
> > \text{SD}(N)  &= \sqrt{0.45} \\
> >               &\approx 0.67
> > \end{align*}
> > $$

> [!example]- Variance from a Continuous Density {Example}
> Losses have density $f(x) = 3x^2$ on $0 < x < 1$. Find $\text{SD}(X)$.
>
> > [!answer]-
> > $$
> > \begin{align*}
> > E[X] &= \int_0^1 x \cdot 3x^2\,dx \\
> >      &= \left[\tfrac{3}{4}x^4\right]_0^1 \\
> >      &= 0.75 \\
> > E[X^2] &= \int_0^1 x^2 \cdot 3x^2\,dx \\
> >        &= \left[\tfrac{3}{5}x^5\right]_0^1 \\
> >        &= 0.60
> > \end{align*}
> > $$
> > $$
> > \begin{align*}
> > \text{Var}(X) &= 0.60 - 0.75^2 \\
> >               &= 0.0375 \\
> > \text{SD}(X)  &\approx 0.194
> > \end{align*}
> > $$

> [!example]- Why Standard Deviations Cannot Be Added {Example}
> Two independent policies each have loss standard deviation \$300. Find the standard deviation of their combined loss.
>
> > [!answer]-
> > Add the **variances**, not the standard deviations:
> > $$
> > \begin{align*}
> > \text{Var}(X_1 + X_2) &= 300^2 + 300^2 \\
> >                       &= 180{,}000 \\
> > \text{SD}(X_1 + X_2)  &= \sqrt{180{,}000} \\
> >                       &\approx 424.26
> > \end{align*}
> > $$
> > The answer is \$424.26, not \$600. Pooling independent risks grows total standard deviation by $\sqrt{n}$, not $n$ — the mathematical basis for diversification.
