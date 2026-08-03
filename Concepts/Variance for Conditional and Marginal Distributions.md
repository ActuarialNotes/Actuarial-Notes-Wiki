The **Variance for Conditional and Marginal Distributions** measures spread at two different levels: the marginal variance $\text{Var}(X)$ describes the spread of $X$ across the whole population, while the conditional variance $\text{Var}(X \mid Y=y)$ measures the spread of $X$ within the subpopulation where $Y=y$. The two are tied together by the **law of total variance**.

> $$\text{Var}(X \mid Y=y) = E[X^2 \mid Y=y] - \bigl(E[X \mid Y=y]\bigr)^2$$

> $$E[X] = E\bigl[E[X \mid Y]\bigr]$$

> $$\text{Var}(X) = E\bigl[\text{Var}(X \mid Y)\bigr] + \text{Var}\bigl(E[X \mid Y]\bigr)$$

- The second identity is the **law of total expectation** (double expectation); the third is the **law of total variance**. Both are the fastest route to a marginal moment when the problem hands you a conditional distribution and a distribution for its parameter.
- Watch the notation carefully: $E[X \mid Y=y]$ is a **number**, but $E[X \mid Y]$ is a **random variable** — a function of $Y$. The outer $E[\cdot]$ and $\text{Var}(\cdot)$ in the identities average over $Y$'s distribution.
- Read the decomposition as *(average within-group variance) + (variance of the group means)*. Both terms are non-negative, so conditioning can never raise the average spread: $E[\text{Var}(X \mid Y)] \leq \text{Var}(X)$.
- A common slip is to compute $\text{Var}(E[X\mid Y])$ and stop — that is only the between-group piece, never the whole marginal variance.
- Conditional distributions come from the [[Conditional Probability Function]] (discrete) or the [[Joint Probability Density Function]] (continuous). See also [[Moments for Joint Distributions]].

> [!example]- Variance of Claims Given Policy Type {Example}
> Joint PMF: $p(0,1)=0.3$, $p(1,1)=0.2$, $p(0,2)=0.1$, $p(1,2)=0.4$ where $X$ = claims and $Y$ = policy type. Find $\text{Var}(X \mid Y=2)$.
>
> > [!answer]-
> > Since $p_Y(2)=0.5$: $p_{X|Y}(0\mid 2)=0.2$ and $p_{X|Y}(1\mid 2)=0.8$. Then $E[X \mid Y=2] = 0(0.2)+1(0.8) = 0.8$ and $E[X^2 \mid Y=2] = 0.8$. So:
> > $$\text{Var}(X \mid Y=2) = 0.8 - (0.8)^2 = 0.16$$

> [!example]- Marginal Variance via the Law of Total Variance {Example}
> A driver's annual claim count is $N \mid \Lambda = \lambda \sim \text{Poisson}(\lambda)$, and the risk parameter $\Lambda$ varies across the portfolio with $E[\Lambda] = 0.2$ and $\text{Var}(\Lambda) = 0.05$. Find $E[N]$ and $\text{Var}(N)$.
>
> > [!answer]-
> > For a [[Poisson Distribution|Poisson]], $E[N \mid \Lambda] = \Lambda$ and $\text{Var}(N \mid \Lambda) = \Lambda$. By double expectation:
> > $$
> > \begin{align*}
> > E[N] &= E\bigl[E[N \mid \Lambda]\bigr] \\
> >      &= E[\Lambda] \\
> >      &= 0.2
> > \end{align*}
> > $$
> > By the law of total variance:
> > $$
> > \begin{align*}
> > \text{Var}(N) &= E\bigl[\text{Var}(N \mid \Lambda)\bigr] + \text{Var}\bigl(E[N \mid \Lambda]\bigr) \\
> >               &= E[\Lambda] + \text{Var}(\Lambda) \\
> >               &= 0.2 + 0.05 \\
> >               &= 0.25
> > \end{align*}
> > $$
> > $\text{Var}(N) > E[N]$: heterogeneous risk parameters make the portfolio's claim counts **overdispersed** relative to a single Poisson, which is why insurers do not price every driver at the portfolio mean.

> [!example]- Both Terms Matter {Example}
> A loss $X$ is uniform on $(0, Y)$, where $Y$ takes the values 10 and 20 with equal probability. Find $\text{Var}(X)$.
>
> > [!answer]-
> > For $X \mid Y = y \sim \text{Uniform}(0,y)$: $E[X \mid Y] = Y/2$ and $\text{Var}(X \mid Y) = Y^2/12$. With $Y \in \{10, 20\}$ equally likely, $E[Y] = 15$, $E[Y^2] = \tfrac{100 + 400}{2} = 250$.
> >
> > Within-group piece:
> > $$
> > \begin{align*}
> > E\bigl[\text{Var}(X \mid Y)\bigr] &= \frac{E[Y^2]}{12} \\
> >                                   &= \frac{250}{12} \approx 20.83
> > \end{align*}
> > $$
> > Between-group piece:
> > $$
> > \begin{align*}
> > \text{Var}\bigl(E[X \mid Y]\bigr) &= \text{Var}\!\left(\frac{Y}{2}\right) \\
> >                                   &= \frac{1}{4}\left(250 - 15^2\right) \\
> >                                   &= \frac{25}{4} = 6.25
> > \end{align*}
> > $$
> > $$\text{Var}(X) = 20.83 + 6.25 \approx 27.08$$
> > Reporting only 6.25 (the between-group term) would understate the spread by a factor of four.
