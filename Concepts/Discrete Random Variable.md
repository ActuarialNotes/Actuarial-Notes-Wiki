---
verification:
  status: unverified
  confidence: null
  last_checked: null
  last_checked_by: null
  content_hash: sha256:a54a9a0a603673cf9419a8581b1788d24b567245a8322ae185f772a179817d91
  sources: []
  open_findings: 0
  open_critical: 0
  log: .verify/Concepts/Discrete Random Variable.md
---

A **Discrete Random Variable** $X$ is a [[Random Variable]] whose possible values form a finite or countably infinite set — typically a count, such as the number of claims — so its distribution is given by a [[Probability Mass Function (PMF)|probability mass function]] $p(x) = P(X = x)$.

> $$p(x) = P(X = x)$$

> $$F(x) = \sum_{k \le x} p(k)$$

- A valid PMF has $p(x) \ge 0$ and $\sum_x p(x) = 1$. The [[Cumulative Distribution Function (CDF)|CDF]] is a step function that jumps by $p(x)$ at each possible value. The named families are in [[Discrete Univariate Distributions]].
- **Endpoints matter.** $P(X \le 3)$ and $P(X < 3)$ differ by $p(3)$ — the most common slip when moving from a [[Continuous Random Variable|continuous]] problem to a discrete one. Expectations are sums: $E[g(X)] = \sum_x g(x)\,p(x)$.
- With two variables, the [[Joint Probability Function]] $p(x,y)$ is a table. [[Marginal Probability Function|Marginals]] are its row and column totals; a [[Conditional Probability Function|conditional]] PMF is one row divided by its total, $p(y \mid x) = p(x,y)/p_X(x)$.
- [[Moments for Joint Distributions|Joint moments]], [[Variance for Conditional and Marginal Distributions|conditional and marginal variances]], [[Covariance]] and the [[Correlation Coefficient]] are all sums over the cells of that table.
- The PMF of a sum of independent discrete variables is a **convolution**, $P(X + Y = s) = \sum_x p_X(x)\,p_Y(s - x)$. Some families are closed under it — independent Poissons sum to a Poisson with mean $\lambda_1 + \lambda_2$. See [[Probabilities for Linear Combinations]].

The first two examples use one table. A policyholder's annual auto claims $X$ and home claims $Y$ have joint PMF $p(0,0) = 0.40$, $p(0,1) = 0.10$, $p(1,0) = 0.20$, $p(1,1) = 0.15$, $p(2,0) = 0.05$, $p(2,1) = 0.10$.

> [!example]- Auto Claims Given a Home Claim {Example}
> Using the joint PMF above, find the conditional PMF of $X$ given $Y = 1$, then $E[X \mid Y = 1]$ and $\text{Var}(X \mid Y = 1)$.
>
> > [!answer]-
> > The marginal is $p_Y(1) = 0.10 + 0.15 + 0.10 = 0.35$. Dividing each $Y = 1$ cell by it gives $p(x \mid 1) = \tfrac{2}{7}, \tfrac{3}{7}, \tfrac{2}{7}$ for $x = 0, 1, 2$.
> > $$
> > \begin{align*}
> > E[X \mid Y = 1] &= 0\left(\tfrac{2}{7}\right) + 1\left(\tfrac{3}{7}\right) + 2\left(\tfrac{2}{7}\right) \\
> >                 &= 1 \\
> > E[X^2 \mid Y = 1] &= 1\left(\tfrac{3}{7}\right) + 4\left(\tfrac{2}{7}\right) \\
> >                   &= 11/7 \\
> > \text{Var}(X \mid Y = 1) &= 11/7 - 1^2 \\
> >                          &= 4/7 \approx 0.571
> > \end{align*}
> > $$
> > Unconditionally $E[X] = 0.65$; a home claim raises the expected auto count to $1$, so the two lines move together.

> [!example]- Covariance and Correlation of Two Lines {Example}
> Using the same joint PMF, find $\text{Cov}(X, Y)$ and the correlation coefficient $\rho$.
>
> > [!answer]-
> > The marginals are $p_X = (0.50, 0.35, 0.15)$ on $\{0,1,2\}$ and $p_Y = (0.65, 0.35)$ on $\{0,1\}$.
> > $$
> > \begin{align*}
> > E[X] &= 0.35 + 2(0.15) \\
> >      &= 0.65 \\
> > \text{Var}(X) &= 0.35 + 4(0.15) - 0.65^2 \\
> >               &= 0.5275
> > \end{align*}
> > $$
> > $Y$ is Bernoulli, so $E[Y] = 0.35$ and $\text{Var}(Y) = 0.35(0.65) = 0.2275$. The only nonzero products $xy$ sit in cells $(1,1)$ and $(2,1)$:
> > $$
> > \begin{align*}
> > E[XY] &= (1)(1)(0.15) + (2)(1)(0.10) \\
> >       &= 0.35 \\
> > \text{Cov}(X,Y) &= 0.35 - (0.65)(0.35) \\
> >                 &= 0.1225 \\
> > \rho &= \frac{0.1225}{\sqrt{0.5275 \times 0.2275}} \\
> >      &= \frac{0.1225}{0.3464} \\
> >      &= 0.354
> > \end{align*}
> > $$
> > A moderate positive correlation — worth knowing before pricing a bundled auto-and-home discount.

> [!example]- Total Claims from Two Independent Policies {Example}
> Policy A has claim count $X$ with $P(X = 0, 1, 2) = 0.7, 0.2, 0.1$. Policy B, independent, has $Y$ with $P(Y = 0, 1) = 0.6, 0.4$. Find the PMF of $S = X + Y$ and $P(S \ge 2)$.
>
> > [!answer]-
> > Convolve, summing over the ways each total can occur:
> >
> > - $P(S = 0)$: $(0.7)(0.6) = 0.42$
> > - $P(S = 1)$: $(0.7)(0.4) + (0.2)(0.6) = 0.40$
> > - $P(S = 2)$: $(0.2)(0.4) + (0.1)(0.6) = 0.14$
> > - $P(S = 3)$: $(0.1)(0.4) = 0.04$
> >
> > The four probabilities sum to 1, and $P(S \ge 2) = 0.14 + 0.04 = 0.18$: an 18% chance the pair produces two or more claims in the year.
