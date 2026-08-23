---
verification:
  status: unverified
  confidence: null
  last_checked: null
  last_checked_by: null
  content_hash: sha256:5817235ddf93a829906b5d682c3532e0cf0e8f86fa4108389416df5383abde43
  sources: []
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
- For a sum, $\text{Var}(X + Y) = \text{Var}(X) + \text{Var}(Y) + 2\,\text{Cov}(X,Y)$; the [[Covariance]] term drops out only when $X$ and $Y$ are [[Independent Random Variables|independent]]. See [[Moments for Linear Combinations]].
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
