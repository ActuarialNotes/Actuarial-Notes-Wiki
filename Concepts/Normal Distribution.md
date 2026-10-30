---
verification:
  status: verified
  confidence: medium
  last_checked: 2026-09-28
  last_checked_by: agent:validate-v1
  content_hash: sha256:97cbab822bcd960ad07cb3378b51bd81d77ef479370eacece2996abc44014005
  sources:
    - "SOA, Exam P normal distribution table (rev. 4/29/21), standard normal table and selected-percentile row, PDF p.2, sha256:5dbd8a242813fe585c3eb085d32617ff14bcaa0517ca547b263e7b03541a8bcb — https://www.soa.org/globalassets/assets/files/edu/2021/p-1-table-rev-4-29-21.pdf"
    - "Grinstead & Snell, Introduction to Probability (2nd rev. ed., 2006 GNU FDL version), 5.2 p.213 (PDF p.221), 7.2 Example 7.5 p.294 (PDF p.302), 9.1 p.332 (PDF p.340), sha256:763eab9894983ddfd6cd7f84685548d1515a9326a2d9fd015474534460551a5e — https://math.dartmouth.edu/~prob/prob/prob.pdf"
    - "SOA, Exam P Sample Solutions (Aug 2026 revision), Q71 (PDF p.23), sha256:efade84ea0ba886e00f07be817c94eae33d3b2ec5ca378e6cad4b74d77136135 — https://www.soa.org/globalassets/assets/files/edu/2026/spring/questions-solutions/2026-05-exam-p-sample-solutions.pdf"
  open_findings: 0
  open_critical: 0
  log: .verify/Concepts/Normal Distribution.md
---

The **Normal Distribution** $X \sim N(\mu, \sigma^2)$ is a symmetric, bell-shaped continuous distribution on $(-\infty, \infty)$ fully characterized by its mean $\mu$ and variance $\sigma^2$.

> $$f(x) = \frac{1}{\sigma\sqrt{2\pi}}\,\exp\!\left(-\frac{(x-\mu)^2}{2\sigma^2}\right)$$
>
> $$x \in \mathbb{R}$$
>
> $$\text{where } \mu = \text{mean},\quad \sigma^2 = \text{variance}$$

- Its CDF has no closed form and is evaluated via the standard normal $Z = (X - \mu)/\sigma \sim N(0,1)$ using $\Phi$ tables
- By the [[Central Limit Theorem]], sums of many independent random variables are approximately normal, making it foundational for aggregate loss models
- Symmetry gives $\Phi(-z) = 1 - \Phi(z)$ — the identity needed for every negative $z$, since standard tables only list $z \geq 0$
- Any **linear combination of independent normals is exactly normal**: if $X_i \sim N(\mu_i, \sigma_i^2)$ independently, then $\sum c_i X_i \sim N\!\left(\sum c_i\mu_i,\ \sum c_i^2\sigma_i^2\right)$. No approximation and no CLT required — see [[Probabilities for Linear Combinations]]
- Useful percentiles: $z_{0.90} = 1.282$, $z_{0.95} = 1.645$, $z_{0.975} = 1.960$, $z_{0.99} = 2.326$
- When approximating a **discrete** variable (a [[Binomial Distribution|binomial]] or [[Poisson Distribution|Poisson]] count) by a normal, apply the continuity correction: $P(X \leq k) \approx \Phi\!\left(\frac{k + 0.5 - \mu}{\sigma}\right)$
- **Solving for a parameter.** Read the standard normal table in reverse: if $P(X \leq x) = p$, then $(x - \mu)/\sigma = z_p$, where $z_p = \Phi^{-1}(p)$, so

> $$x = \mu + z_p\,\sigma$$

- For an upper tail $P(X > x) = q$, use $z_{1-q}$. One such condition fixes one unknown, e.g. $\sigma = (x - \mu)/z_p$ when $\mu$ is known. Two conditions (two percentiles or tail probabilities, or one of them plus a moment such as $E[X^2] = \mu^2 + \sigma^2$) give two equations, solved together for both $\mu$ and $\sigma$: subtracting $x_1 = \mu + z_1\sigma$ from $x_2 = \mu + z_2\sigma$ gives $\sigma = (x_2 - x_1)/(z_2 - z_1)$
- An interval centred on the mean has probability $P(\mu - a < X < \mu + a) = 2\Phi(a/\sigma) - 1$, which falls as $\sigma$ grows with $\mu$ and $a$ fixed: a larger standard deviation spreads the distribution and leaves less probability in a fixed interval around the mean. A requirement that this probability be at least $p$ therefore holds exactly when $\sigma \leq a/z_{(1+p)/2}$, and the largest admissible $\sigma$ is that boundary value
- **Expected excess over a threshold.** For a threshold $c$, with $\phi$ the standard normal density:

> $$E\left[(X - c)_+\right] = (\mu - c)\,\Phi\!\left(\frac{\mu - c}{\sigma}\right) + \sigma\,\phi\!\left(\frac{\mu - c}{\sigma}\right)$$

- It follows by writing $X = \mu + \sigma Z$ and integrating $(\mu - c + \sigma z)\,\phi(z)$ over $z > z_0 = (c - \mu)/\sigma$, using $\phi'(z) = -z\,\phi(z)$, so that $\int_{z_0}^{\infty} z\,\phi(z)\,dz = \phi(z_0)$, and then the symmetry $1 - \Phi(z_0) = \Phi(-z_0)$ and $\phi(z_0) = \phi(-z_0)$. For instance, with $\mu = 50$, $\sigma = 10$ and $c = 40$, it is $10\,\Phi(1) + 10\,\phi(1) \approx 8.413 + 2.420 = 10.83$

![[Media/Normal_distribution_pdf.svg|500]]

![[Media/Figures/Normal_Distribution.svg|340]]

> [!example]- Probability that Aggregate Losses Exceed a Threshold {Example}
> Annual aggregate losses $S \sim N(\mu = 50{,}000,\, \sigma^2 = 40{,}000{,}000)$. Find $P(S > 55{,}000)$.
>
> > [!answer]-
> > Standardize: $\sigma = \sqrt{40{,}000{,}000} \approx 6{,}324.6$.
> > $$Z = \frac{55{,}000 - 50{,}000}{6{,}324.6} \approx 0.791$$
> > $$P(S > 55{,}000) = P(Z > 0.791) = 1 - \Phi(0.791) \approx 1 - 0.7855 = 0.2145$$
> > There is approximately a 21.5% probability that aggregate losses exceed \$55,000.

> [!example]- A Difference of Two Independent Normal Losses {Example}
> Two independent lines of business have annual losses $X \sim N(100, 400)$ and $Y \sim N(80, 225)$ (in thousands). Find $P(X < Y)$.
>
> > [!answer]-
> > Recast the comparison as a single normal variable $D = X - Y$. Means subtract; **variances add**, even for a difference:
> > $$
> > \begin{align*}
> > E[D] &= 100 - 80 = 20 \\
> > \text{Var}(D) &= 400 + 225 = 625 \\
> > \text{SD}(D) &= 25
> > \end{align*}
> > $$
> > So $D \sim N(20, 625)$ exactly, and:
> > $$
> > \begin{align*}
> > P(X < Y) &= P(D < 0) \\
> >          &= \Phi\!\left(\frac{0 - 20}{25}\right) \\
> >          &= \Phi(-0.80) \\
> >          &= 1 - \Phi(0.80) \\
> >          &= 1 - 0.7881 \\
> >          &= 0.2119
> > \end{align*}
> > $$
> > Subtracting the variances to get 175 is the standard trap — a difference is *more* variable than either component, not less.

> [!example]- Finding $\mu$ and $\sigma$ from Two Percentiles {Example}
> A normal random variable $X$ has $P(X \leq 60) = 0.8413$ and $P(X \leq 80) = 0.9772$. Find $\mu$ and $\sigma$.
>
> > [!answer]-
> > The table read in reverse gives $z = 1$ and $z = 2$, so $60 = \mu + \sigma$ and $80 = \mu + 2\sigma$. Subtracting:
> > $$
> > \begin{align*}
> > \sigma &= \frac{80 - 60}{2 - 1} \\
> >        &= 20 \\
> > \mu &= 60 - 20 \\
> >     &= 40
> > \end{align*}
> > $$
