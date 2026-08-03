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

![[Media/Normal_distribution_pdf.svg|500]]

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
