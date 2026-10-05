The **Pareto Distribution** $X \sim \text{Pareto}(\alpha, \theta)$ is a continuous distribution on $(0, \infty)$ with shape $\alpha > 0$ and scale $\theta > 0$. Its polynomial tail makes it a standard model for heavy-tailed claim severities, such as liability and large property losses.

> $$f(x) = \frac{\alpha\,\theta^{\alpha}}{(x + \theta)^{\alpha + 1}}, \quad x > 0$$

> $$F(x) = 1 - \left(\frac{\theta}{x + \theta}\right)^{\alpha}$$

> $$E[X^k] = \frac{\theta^k\,k!}{(\alpha - 1)\cdots(\alpha - k)}, \quad k < \alpha$$

> $$\text{Var}(X) = \frac{\alpha\,\theta^2}{(\alpha - 1)^2(\alpha - 2)}, \quad \alpha > 2$$

> $$E[X \wedge x] = \frac{\theta}{\alpha - 1}\left[1 - \left(\frac{\theta}{x + \theta}\right)^{\alpha - 1}\right]$$

- This is the two-parameter Pareto of the CAS MAS-I tables, for integer $k$ in the moment formula. The mean is $E[X] = \theta/(\alpha - 1)$ for $\alpha > 1$. The [[Limited Expected Value]] (last block) holds for $\alpha \neq 1$; for $\alpha = 1$ it is $-\theta \ln\!\left(\frac{\theta}{x + \theta}\right)$.
- **Heavy tail:** the $k$-th moment exists only when $\alpha > k$, so a Pareto with $\alpha \leq 2$ has infinite variance and one with $\alpha \leq 1$ an infinite mean. The [[Hazard Rate|hazard rate]] $h(x) = \alpha/(x + \theta)$ decreases in $x$.
- **Above a [[Deductible|deductible]]:** given $X > d$, the excess $X - d$ is again Pareto, with shape $\alpha$ and scale $\theta + d$, because $S(x + d)/S(d) = \left(\frac{\theta + d}{x + \theta + d}\right)^{\alpha}$. So the expected payment per payment is $E[X - d \mid X > d] = \frac{\theta + d}{\alpha - 1}$, which grows with $d$.
- **Simulation:** inverting $F$ gives $x = \theta\left[(1 - u)^{-1/\alpha} - 1\right]$ for the [[Inversion Method]].
- **Not the single-parameter version:** the [[Single-Parameter Pareto Distribution]] lives on $(\theta, \infty)$ with $F(x) = 1 - (\theta/x)^{\alpha}$. If $Y$ has that distribution, $Y - \theta$ has this one. Check which one a question means before substituting.
- On MAS-I it is one of Tse's claim-severity distributions (§2.2.4), and it reaches the exam through limited expected values, coverage modifications and estimation.

> [!example]- Moments and a Policy Limit {Example}
> Losses follow a Pareto distribution with $\alpha = 3$ and $\theta = 2{,}000$.
>
> (a) Find the mean and standard deviation of a loss, and the probability that a loss exceeds 1,000.
>
> (b) A policy pays losses up to a limit of 3,000. Find the expected payment per loss.
>
> > [!answer]-
> > (a) The mean and variance:
> >
> > $$
> > \begin{align*}
> > E[X] &= \frac{2{,}000}{3 - 1} \\
> > &= 1{,}000 \\
> > \text{Var}(X) &= \frac{3(2{,}000)^2}{(2)^2(1)} \\
> > &= 3{,}000{,}000
> > \end{align*}
> > $$
> >
> > The standard deviation is $\sqrt{3{,}000{,}000} \approx 1{,}732$. The tail probability is
> >
> > $$
> > \begin{align*}
> > P(X > 1{,}000) &= \left(\frac{2{,}000}{3{,}000}\right)^3 \\
> > &= 0.2963
> > \end{align*}
> > $$
> >
> > (b) The expected payment is the limited expected value at 3,000:
> >
> > $$
> > \begin{align*}
> > E[X \wedge 3{,}000] &= \frac{2{,}000}{2}\left[1 - \left(\frac{2{,}000}{5{,}000}\right)^{2}\right] \\
> > &= 1{,}000\,(1 - 0.16) \\
> > &= 840
> > \end{align*}
> > $$
> >
> > The limit removes 16% of the expected loss even though only $(0.4)^3 = 6.4\%$ of losses exceed it — the heavy tail at work.

> [!example]- Per-Loss and Per-Payment Costs Under a Deductible {Example}
> Losses follow a Pareto distribution with $\alpha = 3$ and $\theta = 2{,}000$. A policy has a deductible of 500. Find the expected payment per payment and the expected payment per loss.
>
> > [!answer]-
> > Above the deductible the excess is Pareto with $\alpha = 3$ and scale $2{,}000 + 500 = 2{,}500$:
> >
> > $$
> > \begin{align*}
> > E[X - 500 \mid X > 500] &= \frac{2{,}500}{3 - 1} \\
> > &= 1{,}250
> > \end{align*}
> > $$
> >
> > Per loss, multiply by the probability of a payment, $P(X > 500) = (2{,}000/2{,}500)^3 = 0.512$:
> >
> > $$
> > \begin{align*}
> > E[(X - 500)_+] &= 0.512 \times 1{,}250 \\
> > &= 640
> > \end{align*}
> > $$
> >
> > Check with the limited expected value: $E[X] - E[X \wedge 500] = 1{,}000 - 1{,}000\left[1 - (0.8)^2\right] = 1{,}000 - 360 = 640$. The average payment per payment (1,250) exceeds the ground-up mean (1,000) — for a Pareto, the claims that clear a deductible are larger on average than claims in general.
