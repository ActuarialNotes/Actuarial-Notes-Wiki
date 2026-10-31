---
verification:
  status: unverified
  confidence: null
  last_checked: null
  last_checked_by: null
  content_hash: sha256:db57ce8b3868a6ba0b33b1bb0f642b4b74a7c1b7b9c8788780a76a4b56117086
  sources: []
  open_findings: 0
  open_critical: 0
  log: .verify/Concepts/Copula.md
---

A **Copula** $C(u,v)$ is a joint distribution of two uniform random variables on $[0,1]$, used to join the marginal distributions of two random variables $X$ and $Y$ into a joint distribution. It describes their dependence separately from the marginals, which is why [[Risk Modeling|internal risk models]] use copulas to correlate lines of business.

> $$F(x,y) = C\big(F_X(x),\, F_Y(y)\big)$$

> $$C(u,v) = \Pr(U \leq u,\; V \leq v)$$

> $$R(z) = \Pr(U > z \mid V > z) = \frac{1 - 2z + C(z,z)}{1 - z}$$

- where $F_X$ and $F_Y$ are the marginal distribution functions and $U = F_X(X)$, $V = F_Y(Y)$ are the probabilities, or percentiles, of the two outcomes. Any joint distribution can be written this way, with $C(u,v) = F\big(F_X^{-1}(u), F_Y^{-1}(v)\big)$. To simulate, draw a correlated pair $(u, v)$ from the copula and invert each marginal: $x = F_X^{-1}(u)$, $y = F_Y^{-1}(v)$.
- **A copula can join marginals of any family.** Because each variable is produced by inverting its own distribution function, a lognormal line can be joined to a Pareto line, and each keeps its own distribution whatever copula is used.
- **A copula carries no information about the size of the losses.** It is a joint distribution of probabilities, not of losses, so the dependence can be described, fitted or reported on its own, without disclosing the loss distributions it joins.
- **Rank measures belong to the copula.** Kendall's $\tau = 4E[C(U,V)] - 1$ and Spearman's $\rho$ depend only on the copula, while the Pearson [[Correlation Coefficient|correlation]] also depends on the marginals ([[Rank Correlation]]).
- **Copulas let the strength of dependence vary across the distribution.** Copulas with the same $\tau$ differ mainly in *where* the association is strongest — for property and casualty work, often among the large losses, in the right tails. The **tail concentration functions** measure this: $R(z)$ above is the chance that one variable is above its $z$-th percentile given that the other is, and $L(z) = C(z,z)/z = \Pr(U < z \mid V < z)$ is its left-tail mirror. The limit $R(1)$ is the upper **tail dependence** and $L(0)$ the lower.
- **The common families**, from lightest to heaviest right tail:
  - *Frank* — symmetric and light in both tails: no tail dependence, and less tail concentration than the normal on both sides. Frank's copula does not have a heavier tail than the normal copula, so it understates how lines move together in extreme events.
  - *Normal* — its parameter is the normal correlation $a$, with $\tau = 2\arcsin(a)/\pi$. Symmetric, so its two tails behave alike; no tail dependence in the limit, though more concentration than the Frank short of it. Easy to simulate, and it extends to many variables through a correlation matrix.
  - *Gumbel* — asymmetric, with more weight in the right tail than the Frank; $\tau = 1 - 1/a$ and $R(1) = 2 - 2^{1/a}$.
  - *Heavy right tail (HRT)* — weak dependence in the left tail and strong in the right: $C(u,v) = u + v - 1 + \big[(1-u)^{-1/a} + (1-v)^{-1/a} - 1\big]^{-a}$, with $\tau = 1/(2a+1)$ and $R(1) = 2^{-a}$. It is the flipped Clayton copula. Of the copulas Venter reviews, only the normal and Kreps's partial perfect correlation copulas fully generalise to more than two variables with every pairwise correlation specified, so the HRT is a two-variable tool.

> [!idea] The idea
> A correlation coefficient is one number for the whole joint distribution; a copula says where in it the variables move together. Two property lines may be almost unrelated in ordinary years and lose together when one hurricane hits both — a copula with a heavy right tail can say exactly that, while leaving each line's own distribution untouched.

> [!trap] The copula moves the tail, not the mean
> Changing the copula never changes the expected value of the sum: each marginal is unchanged, and $E[X + Y] = E[X] + E[Y]$ needs no independence. What changes is the spread and the tail — the VaR or TVaR of $X + Y$. Don't credit a heavier-tailed copula with a higher mean.

> [!example]- Tail Concentration of the HRT Copula {Example}
> For the HRT copula with $a = 1$ (so $\tau = 1/3$), find $R(0.9)$ and $R(0.99)$, and compare with independent variables, $C(u,v) = uv$.
>
> > [!answer]-
> > Plan: put $u = v = z$ into the copula, then into $R(z)$. With $u = v = z$ the HRT copula gives $1 - 2z + C(z,z) = \big[2(1-z)^{-1/a} - 1\big]^{-a}$.
> >
> > $$
> > \begin{align*}
> > R(0.9) &= \frac{(2 \times 10 - 1)^{-1}}{0.1} \\
> > &= 0.526 \\
> > R(0.99) &= \frac{(2 \times 100 - 1)^{-1}}{0.01} \\
> > &= 0.503
> > \end{align*}
> > $$
> >
> > Independence gives $1 - 2z + z^2 = (1-z)^2$, so $R(z) = 1 - z$: $0.10$ and $0.01$.
> >
> > Under the HRT, when one variable is in its worst $1\%$, the other is there too about half the time, and that share levels off at $R(1) = 2^{-1} = 0.5$; under independence it falls to zero. That is the right-tail dependence a catastrophe exposure needs.

> [!example]- Same Marginals, Two Copulas {Example}
> Two lines each lose $10$ when their percentile exceeds $0.9$ and nothing otherwise. Compare the mean and $\text{VaR}_{0.95}$ of the total loss when the lines are joined by (a) the independence copula $C(u,v) = uv$, (b) the perfect-dependence copula $C(u,v) = \min(u,v)$.
>
> > [!answer]-
> > Each line's marginal is the same in both cases: $10$ with probability $0.1$, mean $1$.
> >
> > - **(a)** Total $20$ w.p. $0.01$, $10$ w.p. $0.18$, $0$ w.p. $0.81$. Mean $= 0.2 + 1.8 = 2$. $F(0) = 0.81$ and $F(10) = 0.99$, so $\text{VaR}_{0.95} = 10$.
> > - **(b)** Both lose together: total $20$ w.p. $0.1$, else $0$. Mean $= 2$. $F(0) = 0.90 < 0.95$, so $\text{VaR}_{0.95} = 20$.
> >
> > The mean is $2$ either way; the copula doubled the $95\%$ VaR. Perfect dependence is not always the worst case for VaR, though — for other marginals and levels a different copula can give a higher VaR of the sum.

> [!tip]- How it appears on the exam
> - **Exam 9:** Dependence between lines in an enterprise risk model. Questions ask for the benefits of copulas over a single correlation, which copula suits a portfolio exposed to catastrophes and why (HRT or Gumbel over the normal or Frank), how to read tail concentration graphs and scatter plots of simulated pairs, and what a change of copula does to the mean and the tail of the total.

> [!warning]- Exam traps
> - **Frank is not heavy-tailed:** It has less tail concentration than the normal copula. For clash and accumulation events, choose a copula with right-tail dependence.
> - **$R(1) = 0$ does not mean no tail association.** The normal copula has $R(1) = 0$ yet shows more concentration than the Frank short of the limit, and an empirical $R(z)$ near $1$ rests on very few points. Read $R(z)$ over a range below $1$, not just its limit.
> - **One curve, one tail.** $R(z)$ shows only the right tail, and it reduces a two-dimensional dependence to one curve. Pair it with $L(z)$ — Venter plots $L$ for $z < \tfrac12$ and $R$ above — and with Kendall's $\tau$ when choosing a copula.
> - **Reading a scatter plot of simulated $(u,v)$:** a symmetric copula (normal, Frank) looks the same near $(0,0)$ as near $(1,1)$; an HRT copula is asymmetric, its points scattered near $(0,0)$ and bunched along the diagonal near $(1,1)$.
