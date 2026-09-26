---
verification:
  status: unverified
  confidence: null
  last_checked: null
  last_checked_by: null
  content_hash: sha256:a2ef828314f7692d4b8ca8cefc1b99c1d098bbfe6f11153d7161a7f4be3be2ed
  sources: []
  open_findings: 0
  open_critical: 0
  log: .verify/Concepts/Independent and Identically Distributed.md
---

Random variables $X_1, X_2, \ldots, X_n$ are **Independent and Identically Distributed** (i.i.d.) when they are mutually [[Independent Random Variables|independent]] *and* share one common distribution — the same CDF $F$, hence the same mean $\mu$ and variance $\sigma^2$. It is the standard model for a [[Random Sample]] and for a book of similar, unrelated policies.

> $$f(x_1, \ldots, x_n) = \prod_{i=1}^{n} f(x_i)$$

> $$\begin{aligned} E[S_n] &= n\mu \\ \text{Var}(S_n) &= n\sigma^2 \end{aligned}$$

- Here $f$ is the common PMF or PDF and $S_n = X_1 + \cdots + X_n$. The product form is the independence; using the same $f$ in every factor is the identical distribution. Each half can fail on its own.
- **Identically distributed is not identical.** $X_1 + X_2$ has variance $2\sigma^2$, but $2X_1$ has variance $4\sigma^2$. Fifty independent policies are far less risky than one policy fifty times the size.
- The mean of $S_n$ grows like $n$ but its standard deviation only like $\sqrt{n}$, so the [[Coefficient of Variation]] of the total falls as $1/\sqrt{n}$ — the pooling effect behind the [[Law of Large Numbers]]. For the average, $E[\bar{X}] = \mu$ and $\text{Var}(\bar{X}) = \sigma^2/n$.
- The version of the [[Central Limit Theorem]] on Exam P assumes i.i.d. summands with finite variance; it is what licenses the [[Normal Approximation]] $S_n \approx N(n\mu,\ n\sigma^2)$.
- The [[Order Statistics]] formulas rely on it too: the maximum has $P(X_{(n)} \le x) = F(x)^n$ and the minimum has $P(X_{(1)} > x) = [1 - F(x)]^n$.
- Some i.i.d. sums are known exactly: Bernoulli$(p)$ terms sum to a [[Binomial Distribution|binomial]]$(n, p)$, Poisson$(\lambda)$ terms to a Poisson$(n\lambda)$, and [[Exponential Distribution|exponentials]] with mean $\theta$ to a [[Gamma]]$(n, \theta)$.

> [!example]- Fifty Policies versus One Large Policy {Example}
> Each of 50 independent policies has an annual loss with mean \$1,000 and standard deviation \$400. Compare the total $S = X_1 + \cdots + X_{50}$ with a single risk $T = 50X_1$ that has the same expected loss.
>
> > [!answer]-
> > Both have mean $50 \times 1{,}000 = 50{,}000$. The variances differ because the i.i.d. terms add variances, while scaling one risk squares the multiplier:
> > $$
> > \begin{align*}
> > \text{Var}(S) &= 50(400^2) \\
> >               &= 8{,}000{,}000 \\
> > \text{SD}(S) &= 2{,}828 \\
> > \text{Var}(T) &= 50^2(400^2) \\
> >               &= 400{,}000{,}000 \\
> > \text{SD}(T) &= 20{,}000
> > \end{align*}
> > $$
> > The coefficient of variation is $2{,}828/50{,}000 = 0.057$ for the pooled book against $0.40$ for the single large risk. Same expected loss, but pooling cuts the standard deviation to $1/\sqrt{50} \approx 14\%$ of the concentrated risk's.

> [!example]- The Largest of Five Claims {Example}
> Five claims are i.i.d. exponential with mean \$2,000. Find the probability that the largest exceeds \$5,000.
>
> > [!answer]-
> > One claim stays at or below \$5,000 with probability $F(5{,}000) = 1 - e^{-2.5} = 0.917915$. The maximum is at or below \$5,000 only if all five claims are, and independence with a common $F$ turns that into a power:
> > $$
> > \begin{align*}
> > P(X_{(5)} > 5{,}000) &= 1 - F(5{,}000)^5 \\
> >                      &= 1 - 0.917915^5 \\
> >                      &= 1 - 0.651647 \\
> >                      &= 0.3484
> > \end{align*}
> > $$
> > A single claim exceeds \$5,000 only $8.2\%$ of the time, but with five claims there is a $34.8\%$ chance at least one does — the reason a per-claim retention is hit far more often than a single claim's tail suggests.
