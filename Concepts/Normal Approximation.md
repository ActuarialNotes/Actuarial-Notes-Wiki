---
verification:
  status: unverified
  confidence: null
  last_checked: null
  last_checked_by: null
  content_hash: sha256:126a2f70959eb9f11d4c2caac2de8d38bdf76f1a40c261264448fd6540f3eb52
  sources: []
  open_findings: 0
  open_critical: 0
  log: .verify/Concepts/Normal Approximation.md
---

The **Normal Approximation** replaces the distribution of a sum or average of many [[Independent and Identically Distributed|independent and identically distributed]] random variables by a [[Normal Distribution|normal]] distribution with the same mean and variance, as the [[Central Limit Theorem]] justifies; probabilities are then read from the standard normal CDF $\Phi$.

> $$P(S_n \le s) \approx \Phi\!\left(\frac{s - n\mu}{\sigma\sqrt{n}}\right)$$

> $$P(\bar{X} \le x) \approx \Phi\!\left(\frac{x - \mu}{\sigma/\sqrt{n}}\right)$$

- $S_n = X_1 + \cdots + X_n$ and $\bar{X} = S_n/n$ is the [[Sample Mean|sample mean]]; $\mu$ and $\sigma^2$ are the mean and variance of **one** $X_i$. The recipe: identify $n$, compute $E[S_n] = n\mu$ and $\text{Var}(S_n) = n\sigma^2$ ([[Moments for Linear Combinations]]), standardise, look up $\Phi$.
- **Continuity correction.** When $S_n$ is integer-valued — a claim count, a [[Binomial Distribution|binomial]], a [[Poisson Distribution|Poisson]] — widen the event by half a unit first: $P(S_n \le k) \approx \Phi\!\left(\frac{k + 0.5 - n\mu}{\sigma\sqrt{n}}\right)$ and $P(S_n \ge k) \approx 1 - \Phi\!\left(\frac{k - 0.5 - n\mu}{\sigma\sqrt{n}}\right)$. Never apply it to a continuous sum.
- A binomial$(n, p)$ is approximately $N\big(np,\ np(1-p)\big)$ and a Poisson$(\lambda)$ approximately $N(\lambda, \lambda)$ for large $n$ or $\lambda$ — each is a sum of i.i.d. pieces.
- If the summands are themselves normal, nothing is approximate: the sum is exactly normal ([[Probabilities for Linear Combinations]]).
- The approximation is weakest in the tails and for small $n$ with skewed summands. Claim severities are right-skewed, so the normal tends to **understate** the chance of a very large aggregate loss.
- Inverted, it sets a fund: the total exceeded with probability $\alpha$ is about $n\mu + z_{1-\alpha}\,\sigma\sqrt{n}$, where $z_{1-\alpha}$ is the standard normal [[Percentile|percentile]].

> [!example]- Sizing a Claim Fund at the 95th Percentile {Example}
> A plan covers 400 independent members. Each member's annual claim has mean \$250 and standard deviation \$1,000. How large must the fund be for a 95% chance of covering total claims?
>
> > [!answer]-
> > $$
> > \begin{align*}
> > E[S] &= 400(250) \\
> >      &= 100{,}000 \\
> > \text{SD}(S) &= 1{,}000\sqrt{400} \\
> >              &= 20{,}000 \\
> > \text{Fund} &= 100{,}000 + 1.645(20{,}000) \\
> >             &= 132{,}900
> > \end{align*}
> > $$
> > The fund is \$132,900, or \$332.25 per member: a loading of \$82.25 (33%) over the expected claim, bought by the uncertainty in a 400-member pool.

> [!example]- Claim Count with a Continuity Correction {Example}
> Each of 1,000 independent policies has a claim with probability 0.05. Approximate the probability of at least 60 claims.
>
> > [!answer]-
> > $N$ is binomial with $E[N] = 50$ and $\text{Var}(N) = 1{,}000(0.05)(0.95) = 47.5$, so $\text{SD}(N) = 6.892$. $N$ is integer-valued, so $P(N \ge 60)$ becomes $P(N > 59.5)$:
> > $$
> > \begin{align*}
> > P(N \ge 60) &\approx 1 - \Phi\!\left(\frac{59.5 - 50}{6.892}\right) \\
> >             &= 1 - \Phi(1.38) \\
> >             &= 1 - 0.9162 \\
> >             &= 0.0838
> > \end{align*}
> > $$
> > The exact binomial answer is $0.0867$. Standardising 60 without the correction gives $1 - \Phi(1.45) = 0.0735$, noticeably further off.

> [!example]- How Many Policies for a Stable Loss Ratio {Example}
> Each policy's loss has coefficient of variation $\sigma/\mu = 2$. How many i.i.d. policies are needed so that total losses exceed 110% of expected with probability at most 5%?
>
> > [!answer]-
> > $$
> > \begin{align*}
> > P(S_n > 1.1n\mu) &\approx P\!\left(Z > \frac{0.1n\mu}{\sigma\sqrt{n}}\right) \\
> >                  &= P\!\left(Z > \frac{0.1\sqrt{n}}{2}\right)
> > \end{align*}
> > $$
> > This is at most $0.05$ when $0.05\sqrt{n} \ge 1.645$:
> > $$
> > \begin{align*}
> > \sqrt{n} &\ge 32.9 \\
> > n &\ge 1{,}082.4
> > \end{align*}
> > $$
> > At least $1{,}083$ policies. The answer scales with $\text{CV}^2$: a line with twice the CV needs four times the book.
