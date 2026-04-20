$$E[X] = \begin{cases} \displaystyle\sum_{k} k\, f(k) & \text{(discrete)} \\[6pt] \displaystyle\int_{-\infty}^{\infty} x\, f(x)\, dx & \text{(continuous)} \end{cases}$$

Expected Value ($E[X]$, also called the mean $\mu$) is the probability-weighted average of all values a random variable $X$ can take, representing its long-run average outcome.

It is linear: $E[aX + b] = aE[X] + b$. The $n$-th moment of $X$ is $E[X^n]$, and the $n$-th central moment is $E[(X-\mu)^n]$.

> [!example]- Expected Payout on a Simple Policy {💡 Example}
> A discrete random variable $X$ (claim size) has PMF: $P(X=0)=0.5$, $P(X=100)=0.3$, $P(X=500)=0.2$. Find $E[X]$.
>
> > [!answer]- Answer
> > $$E[X] = 0(0.5) + 100(0.3) + 500(0.2) = 0 + 30 + 100 = 130$$
> > On average, the insurer expects to pay \$130 per claim.
