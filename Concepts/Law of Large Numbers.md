The **Law of Large Numbers (LLN)** states that the sample mean $\bar{X}_n$ of $n$ independent and identically distributed [[Random Variable]]s with finite mean $\mu$ converges to $\mu$ as the sample size grows. It is the formal reason risk pooling works: the average loss per policy becomes predictable as an insurer writes more independent policies.

> $$\bar{X}_n = \frac{1}{n}\sum_{i=1}^{n} X_i \;\xrightarrow[n\to\infty]{}\; \mu = E[X_i]$$

- **Weak LLN:** for any tolerance $\epsilon > 0$, $\ P\!\left(\,|\bar{X}_n - \mu| > \epsilon\,\right) \to 0$ as $n \to \infty$ — the sample mean is increasingly likely to land near $\mu$.
- It requires the $X_i$ to be i.i.d. with finite mean $\mu$; the standard proof also assumes finite variance $\sigma^2$ and applies Chebyshev's inequality to $\bar{X}_n$, which has $\text{Var}(\bar{X}_n) = \sigma^2/n$.
- Distinguish it from the [[Central Limit Theorem]]: the LLN says *where* the sample mean settles (at $\mu$), while the CLT describes the *shape* of its fluctuations around $\mu$ at scale $1/\sqrt{n}$.
- It underpins [[Credibility Theory]] and the [[Expected Value]] premium principle — charging $\mu$ per risk is sustainable only because averages stabilize over a large book of business.

> [!example]- Stability of Average Loss Across a Portfolio {Example}
> Each policy's annual loss is i.i.d. with mean $\mu = 500$ and standard deviation $\sigma = 2{,}000$. For a book of $n = 10{,}000$ policies, bound the probability that the average loss per policy differs from \$500 by more than \$100.
>
> > [!answer]-
> > The sample mean has variance $\text{Var}(\bar{X}_n) = \sigma^2/n$. Apply Chebyshev's inequality:
> > $$
> > \begin{align*}
> > \text{Var}(\bar{X}_n) &= \frac{2{,}000^2}{10{,}000} \\
> >                       &= 400 \\
> > P\!\left(|\bar{X}_n - 500| > 100\right) &\leq \frac{\text{Var}(\bar{X}_n)}{100^2} \\
> >                       &= \frac{400}{10{,}000} \\
> >                       &= 0.04
> > \end{align*}
> > $$
> > So there is at least a 96% chance the average loss per policy lands within \$100 of \$500 — the per-policy average is far more predictable than any single loss.

> [!example]- Sample Size Needed for a Target Precision {Example}
> Using the same per-policy loss ($\mu = 500$, $\sigma = 2{,}000$), how many policies are needed so that the average loss is within \$50 of $\mu$ with at least 95% probability (via Chebyshev)?
>
> > [!answer]-
> > Require the Chebyshev bound on the miss probability to be at most $0.05$:
> > $$
> > \begin{align*}
> > \frac{\sigma^2 / n}{50^2} &\leq 0.05 \\
> > n &\geq \frac{\sigma^2}{0.05 \cdot 50^2} \\
> >   &= \frac{2{,}000^2}{0.05 \cdot 2{,}500} \\
> >   &= \frac{4{,}000{,}000}{125} \\
> >   &= 32{,}000
> > \end{align*}
> > $$
> > A book of at least 32,000 independent policies guarantees the target precision under the (conservative) Chebyshev bound.
