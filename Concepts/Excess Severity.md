---
verification:
  status: unverified
  confidence: null
  last_checked: null
  last_checked_by: null
  content_hash: sha256:b7f096b212832009a169acdef940c3093b6428a3a840a5469a5b7f1f714869cd
  sources: []
  open_findings: 0
  open_critical: 0
  log: .verify/Concepts/Excess Severity.md
---

**Excess Severity** $e_X(a)$ is the average amount by which claims exceed a retention $a$, counting only the claims that exceed it. It is the mean of the **excess claim-size variable** $X_a$: the ground-up claim size $X$ truncated from below and shifted by $a$. It is also called the mean excess claim size, or the mean residual life.

> $$X_a = X - a, \quad a < X < \infty$$

> $$e_X(a) = E[X_a] = \frac{E[X] - E[X;a]}{1 - F_X(a)}$$

> $$F_{X_a}(x) = \frac{F_X(x+a) - F_X(a)}{1 - F_X(a)}, \quad x \geq 0$$

- $E[X;a] = E[\min(X, a)]$ is the [[Limited Expected Value|limited expected value]] and $1 - F_X(a)$ the probability that a claim exceeds $a$. The density of $X_a$ is $f_X(x+a)/(1 - F_X(a))$. The retention can be a [[Deductible|deductible]] or the limit of an underlying primary policy.
- **Per excess claim, not per ground-up claim.** The payment on every ground-up claim, $Y = \max(X - a,\ 0)$, has mean $E[X] - E[X;a] = (1 - F_X(a))\,e_X(a)$. $X_a$ leaves out the zero payments on claims an excess insurer never sees. Capping $X_a$ at a width $l$ gives the [[Layer of Insurance|layer]] severity $\left(E[X;a+l] - E[X;a]\right)/(1 - F_X(a))$.
- **Shape by family.** For the [[Exponential Distribution|exponential]], $e_X(a) = \beta$ at every $a$, because $X_a$ has the same distribution as $X$. A Pareto $(\alpha, \beta)$ gives a Pareto $(\alpha,\ a + \beta)$ excess variable, so $e_X(a) = (a + \beta)/(\alpha - 1)$ rises linearly. The [[Lognormal Distribution|lognormal]] $e_X$ rises without bound, and the [[Gamma|gamma]] $e_X$ falls toward a horizontal asymptote. The shape of the sample function $e_n(x)$ therefore suggests a family, provided the data hold enough large claims.
- **Excess claim counts.** Each ground-up claim exceeds $a$ with probability $p = 1 - F_X(a)$, so the excess count $N_a$ has $E[N_a] = p\,E[N]$ and $\text{Var}[N_a] = p^2\,\text{Var}[N] + p(1-p)\,E[N]$. A Poisson $(\lambda)$ count thins to Poisson $(p\lambda)$ ([[Poisson Thinning]]); a [[Negative Binomial Distribution|negative binomial]] $(\alpha, \nu)$, with mean $\nu$ and variance $\nu + \nu^2/\alpha$, thins to $(\alpha,\ p\nu)$. The expected excess [[Aggregate Loss Model|aggregate loss]] is $E[N_a]\,e_X(a) = E[N]\left(E[X] - E[X;a]\right)$.
- **Inflation.** A uniform trend factor $\tau > 1$ turns the excess severity into $\tau\,e_X(a/\tau)$, which rises by less than $\tau$ where $e_X$ is increasing, as for the Pareto. But the excess count rises by $(1 - F_X(a/\tau))/(1 - F_X(a)) \geq 1$, and the aggregate excess loss by at least $\tau$. A fixed retention leverages the trend ([[Inflation]]).

> [!example]- Excess Severity and Excess Claim Counts over a Primary Limit {Example}
> An umbrella policy attaches above a \$50,000 primary limit. Ground-up claim sizes are Pareto with $(\alpha, \beta) = (3;\ 20{,}000)$, so that $1 - F_X(x) = \left(\frac{\beta}{x + \beta}\right)^{\alpha}$ and $E[X;x] = \frac{\beta}{\alpha - 1}\left[1 - \left(\frac{\beta}{x + \beta}\right)^{\alpha - 1}\right]$. The ground-up claim count is negative binomial with mean $40$ and variance $240$.
>
> (a) Calculate the excess severity at \$50,000, and check it against the Pareto form of $X_a$.
>
> (b) Calculate the mean and variance of the number of claims that reach the umbrella.
>
> (c) Calculate the umbrella's expected aggregate loss two ways.
>
> > [!answer]-
> > (a)
> >
> > $$
> > \begin{align*}
> > 1 - F_X(50{,}000) &= \left(\tfrac{20{,}000}{70{,}000}\right)^3 \\
> > &= 0.0233236 \\
> > E[X] &= \tfrac{20{,}000}{2} \\
> > &= 10{,}000 \\
> > E[X;50{,}000] &= 10{,}000\left[1 - \left(\tfrac{2}{7}\right)^2\right] \\
> > &= 9{,}183.67 \\
> > e_X(50{,}000) &= \frac{10{,}000 - 9{,}183.67}{0.0233236} \\
> > &= 35{,}000
> > \end{align*}
> > $$
> >
> > Directly, $X_{50{,}000}$ is Pareto $(3;\ 70{,}000)$, with mean $70{,}000/2 = 35{,}000$. The average claim reaching the umbrella exceeds the attachment by 3.5 times the ground-up mean. An exponential with the same \$10,000 mean would give \$10,000 at every attachment.
> >
> > (b)
> >
> > $$
> > \begin{align*}
> > E[N_a] &= 0.0233236 \times 40 \\
> > &= 0.932945 \\
> > \text{Var}[N_a] &= (0.0233236)^2(240) \\
> > &\quad + (0.0233236)(0.9766764)(40) \\
> > &= 0.130558 + 0.911185 \\
> > &= 1.041743
> > \end{align*}
> > $$
> >
> > The ground-up count is negative binomial with $\alpha = 40^2/(240 - 40) = 8$, so $N_a$ is negative binomial $(8;\ 0.932945)$. Its variance, $0.932945 + 0.932945^2/8 = 1.041743$, agrees. The variance-to-mean ratio falls from $6$ to $1.117$: thinning leaves an excess count much closer to Poisson.
> >
> > (c)
> >
> > $$
> > \begin{align*}
> > E[S] &= E[N_a]\,e_X(50{,}000) \\
> > &= 0.932945 \times 35{,}000 \\
> > &= 32{,}653 \\
> > E[S] &= E[N]\left(E[X] - E[X;50{,}000]\right) \\
> > &= 40 \times 816.33 \\
> > &= 32{,}653
> > \end{align*}
> > $$
> >
> > The umbrella expects less than one claim a year, at \$35,000 each.

> [!example]- How Inflation Leverages Excess Claims {Example}
> Keep the Pareto $(3;\ 20{,}000)$ claim sizes and the \$50,000 attachment. Claim sizes inflate uniformly by $8\%$ a year, and the ground-up claim count does not change.
>
> (a) Calculate the annual trend in the excess severity, the excess claim count and the aggregate excess loss.
>
> (b) Explain why the excess severity rises by less than $8\%$ while the aggregate excess loss rises by much more.
>
> > [!answer]-
> > (a) Inflated claims $1.08X$ are Pareto $(3;\ 21{,}600)$.
> >
> > $$
> > \begin{align*}
> > e_{1.08X}(50{,}000) &= \frac{50{,}000 + 21{,}600}{2} \\
> > &= 35{,}800 \\
> > \tilde{\tau} &= \frac{35{,}800}{35{,}000} \\
> > &= 1.0229
> > \end{align*}
> > $$
> >
> > $$
> > \begin{align*}
> > \tilde{\tau}_N &= \frac{1 - F_X(50{,}000/1.08)}{1 - F_X(50{,}000)} \\
> > &= \left(\frac{70{,}000}{66{,}296.30}\right)^3 \\
> > &= 1.1771 \\
> > \tilde{\tau}_S &= 1.1771 \times 1.0229 \\
> > &= 1.2040
> > \end{align*}
> > $$
> >
> > The excess severity rises $2.3\%$, the excess claim count $17.7\%$ and the aggregate excess loss $20.4\%$. As a check, $\tilde{\tau}_S = 1.08\,(E[X] - E[X;46{,}296.30])/(E[X] - E[X;50{,}000]) = 1.08 \times 910.08/816.33 = 1.2040$.
> >
> > (b) Inflating claims by $8\%$ against a fixed attachment works like holding claims fixed and lowering the attachment to $50{,}000/1.08 = 46{,}296$. More claims cross the lower attachment, so the excess count rises by more than $8\%$. But a Pareto's mean excess grows with the attachment, so the mean excess over the lower one is $33{,}148$, not $35{,}000$. Scaled up by $1.08$, it gives a severity only $2.3\%$ higher. The aggregate excess loss combines the two and always rises by at least the ground-up trend. An umbrella rate trended at $8\%$ would fall well short.

> [!example]- Choosing a Severity Family from the Sample Excess Severity {Example}
> A sample of $500$ ground-up claims has mean $4{,}000$. The sample distribution function and limited mean at four claim sizes are:
>
> | $x$ | $F_n(x)$ | $E_n[X;x]$ |
> |---|---|---|
> | $1{,}000$ | $0.300$ | $840$ |
> | $2{,}500$ | $0.556$ | $1{,}680$ |
> | $5{,}000$ | $0.768$ | $2{,}480$ |
> | $10{,}000$ | $0.912$ | $3{,}215$ |
>
> (a) Calculate the sample excess severity $e_n(x)$ at each size.
>
> (b) Which distribution family does its shape suggest? Estimate that family's parameters from the straight line through the first and last points.
>
> (c) Give one reason for caution about the estimate.
>
> > [!answer]-
> > (a)
> >
> > $$
> > \begin{align*}
> > e_n(1{,}000) &= \frac{4{,}000 - 840}{1 - 0.300} \\
> > &= 4{,}514 \\
> > e_n(2{,}500) &= \frac{4{,}000 - 1{,}680}{1 - 0.556} \\
> > &= 5{,}225 \\
> > e_n(5{,}000) &= \frac{4{,}000 - 2{,}480}{1 - 0.768} \\
> > &= 6{,}552 \\
> > e_n(10{,}000) &= \frac{4{,}000 - 3{,}215}{1 - 0.912} \\
> > &= 8{,}920
> > \end{align*}
> > $$
> >
> > (b) $e_n(x)$ rises steadily, by $0.47$ to $0.53$ per dollar of $x$ between successive points. A nearly straight line with positive slope points to a Pareto. A nearly constant $e_n$ would point to a gamma or exponential, and a shape between the two to a lognormal or Weibull. Match the line to $e(x) = (x + \beta)/(\alpha - 1)$:
> >
> > $$
> > \begin{align*}
> > \text{slope} &= \frac{8{,}920 - 4{,}514}{10{,}000 - 1{,}000} \\
> > &= 0.48956 \\
> > \alpha &= 1 + \frac{1}{0.48956} \\
> > &= 3.04 \\
> > \text{intercept} &= 4{,}514 - 1{,}000(0.48956) \\
> > &= 4{,}024 \\
> > \beta &= 4{,}024 \times 2.0427 \\
> > &= 8{,}220
> > \end{align*}
> > $$
> >
> > (c) The top point rests on the $500 \times 0.088 = 44$ claims above \$10,000. A family's characteristic shape shows only at large $x$, where data are sparsest, and the slope — so $\alpha$ and $\beta$ — can move a lot with a change in just a few of the largest claims.
