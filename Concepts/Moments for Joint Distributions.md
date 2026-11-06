---
verification:
  status: verified
  confidence: high
  last_checked: 2026-11-06
  last_checked_by: agent:validate-v1
  content_hash: sha256:e9b5eeb680bf7a0958fa277de7a12c218c0d99e454d6e4890e4d574d1e01cb4c
  sources:
    - "Siegrist, Probability, Mathematical Statistics, and Stochastic Processes (randomservices.org), 4.1 Change of Variables Theorem (discrete and continuous, X with values in a general set S), E(X+Y)=E(X)+E(Y), sha256:3228c869ff2a03804690236fc072d1cf7bd9b040855c67156791b50e7d3cfba9 — https://www.randomservices.org/random/expect/Properties.html"
    - "Pishro-Nik, Introduction to Probability, Statistics, and Random Processes, §5.1.5 law of iterated expectations (5.7), E[g(X)h(Y)] = E[g(X)]E[h(Y)] for independent, conditional variance, law of total variance (5.10), Var(X) >= E[Var(X|Y)] (5.11), random-sum example (5.12), sha256:1bda829553c761a1ee71ba3210a6510e4780b5bcba0513325b5180b3d4100d82 — https://www.probabilitycourse.com/chapter5/5_1_5_conditional_expectation.php"
    - "Pishro-Nik, Introduction to Probability, Statistics, and Random Processes, §5.3.1 Lemma 5.3 covariance properties incl. bilinearity; eq. 5.21 Var(aX+bY); correlation definition, -1<=rho<=1, rho=+-1 linear, rho(-X,Y)=-rho(X,Y), rho(aX+b,cY+d)=rho(X,Y) for a,c>0; independent implies uncorrelated, converse fails; pairwise uncorrelated sums, sha256:10ac40b763d78b0fa19a116594da71769bf417b59a1714be707c7c410991a7fb — https://www.probabilitycourse.com/chapter5/5_3_1_covariance_correlation.php"
    - "Siegrist, Probability, Mathematical Statistics, and Stochastic Processes (randomservices.org), 4.5 Covariance and Correlation: Events (cov and cor of indicators), var(X+Y), var(X-Y), cor = +-1 iff linear with that slope sign, uniform X and Y = X^2 uncorrelated, sha256:23ef4758146296b9865ca3f82f0e849934a667dcc8643afaa28147ad146feef7 — https://www.randomservices.org/random/expect/Covariance.html"
    - "Grinstead & Snell, Introduction to Probability (2nd rev. ed., GNU FDL), Ex. 6.3.17(a)-(c) and 6.3.18(a)-(c) printed p.281 (PDF p.289); Def. 7.1 p.286 (PDF p.294); Thm 7.1 and sum of two exponentials (PDF pp.299-301); Examples 7.5-7.6 (PDF p.302); Thms 9.4 and 9.6 (PDF pp.351, 365); continuity correction (PDF p.340), sha256:763eab9894983ddfd6cd7f84685548d1515a9326a2d9fd015474534460551a5e — https://math.dartmouth.edu/~prob/prob/prob.pdf"
    - "SOA, Probability Exam (Exam P) Syllabus, November 2026, Topic 3 Multivariate Random Variables, learning outcomes a)-i), PDF p.4, sha256:bed27462961aa988fc66c90fefa34af47ea324e2ab9109889c4e4f8f78d97397 — https://www.soa.org/globalassets/assets/files/edu/2026/fall/syllabi/2026-11-exam-p-syllabus.pdf"
  open_findings: 0
  open_critical: 0
  log: .verify/Concepts/Moments for Joint Distributions.md
---

**Moments for joint distributions** are expected values of functions of two or more random variables, computed from their [[Joint Probability Function|joint probability function]] or [[Joint Probability Density Function|joint density]]. They extend [[Expected Value]] from one variable to a pair, and they produce the [[Covariance]].

> $$E[g(X, Y)] = \sum_x \sum_y g(x, y)\,p(x, y)$$

> $$E[g(X, Y)] = \iint g(x, y)\,f(x, y)\,dx\,dy$$

- where $p(x, y)$ is the joint probability function, $f(x, y)$ the joint density, and $g$ any function of the pair: $x$, $xy$, $x + y$, $\max(x, y)$ or a payment.
- Sums always split: $E[X + Y] = E[X] + E[Y]$, with or without independence.
- Products split only for [[Independent Random Variables]]: then $E[XY] = E[X]\,E[Y]$.
- $\text{Cov}(X, Y) = E[XY] - E[X]\,E[Y]$.

> [!idea] The idea
> A function of the pair attaches one number to each cell of the joint table. Its expected value weights those numbers by the cell probabilities, exactly as $E[X]$ weights the values of one variable. Nothing new is needed beyond writing $g(x, y)$ next to $p(x, y)$.

![[Media/Figures/Moments_for_Joint_Distributions.svg|340]]

## Weight each cell by its probability

A policyholder holds an auto policy and a home policy. Let $X$ be the number of auto claims in a year and $Y$ the number of home claims.

| $X$ \ $Y$ | 0 | 1 | 2 | Total |
|---|---|---|---|---|
| 0 | 0.36 | 0.18 | 0.06 | 0.60 |
| 1 | 0.10 | 0.20 | 0.10 | 0.40 |
| Total | 0.46 | 0.38 | 0.16 | 1 |

What is the expected total number of claims, $X + Y$? The expected product $XY$? The expected larger of the two counts? Each is one more column next to the probabilities.

| Cell | $p$ | $x + y$ | $xy$ | $\max$ |
|---|---|---|---|---|
| (0, 0) | 0.36 | 0 | 0 | 0 |
| (0, 1) | 0.18 | 1 | 0 | 1 |
| (0, 2) | 0.06 | 2 | 0 | 2 |
| (1, 0) | 0.10 | 1 | 0 | 1 |
| (1, 1) | 0.20 | 2 | 1 | 1 |
| (1, 2) | 0.10 | 3 | 2 | 2 |

Weighting each column by $p$ gives $E[X + Y] = 1.1$, $E[XY] = 0.40$ and $E[\max(X, Y)] = 0.8$.

## Marginal moments come for free

The row totals give $E[X] = 0.40$, and the column totals give $E[Y] = 0.38 + 2(0.16) = 0.70$. Summing $x\,p(x, y)$ over the whole table gives the same $E[X]$, because the row totals *are* those sums.

- $E[X + Y] = 0.40 + 0.70 = 1.1$ matches the table. A sum splits whatever the dependence.
- $E[\max(X, Y)] = 0.8$ is not $\max(0.40, 0.70)$. A nonlinear function has to be weighted cell by cell.

## Products and independence

If the two policies were independent, the expected product would be $E[X]\,E[Y] = 0.28$. The table gives 0.40. The difference is the covariance.

> $$\text{Cov}(X, Y) = 0.40 - 0.28 = 0.12$$

For independent variables, any product of separate functions splits.

> $$E[g(X)\,h(Y)] = E[g(X)]\,E[h(Y)]$$

This gives the variance of a product of independent variables, using $g(x) = x^2$ and $h(y) = y^2$.

> $$\text{Var}(XY) = E[X^2]\,E[Y^2] - \big(E[X]\,E[Y]\big)^2$$

With independent policies and the same marginals, $E[X^2] = 0.40$ and $E[Y^2] = 0.38 + 4(0.16) = 1.02$. Then $\text{Var}(XY) = (0.40)(1.02) - 0.28^2 = 0.3296$.

> [!trap] Splitting a product without independence
> $E[XY] = E[X]\,E[Y]$ needs independence. On the dependent table it gives 0.28 instead of 0.40, and a covariance of 0.

## Second moments give the variances

The same weighting gives $E[X^2] = 0.40$ and $E[Y^2] = 1.02$, so $\text{Var}(X) = 0.40 - 0.16 = 0.24$ and $\text{Var}(Y) = 1.02 - 0.49 = 0.53$. The variance of the total also comes from the table.

> $$\text{Var}(X + Y) = E[(X + Y)^2] - (1.1)^2 = 1.01$$

That equals $0.24 + 0.53 + 2(0.12)$. See [[Moments for Linear Combinations]].

## Moments within one row

A question may fix one variable first. Given one auto claim, how many home claims are expected? Keep the $X = 1$ row and rescale it by its total, as the [[Conditional Probability Function]] does.

> $$E[Y \mid X = 1] = \frac{0(0.10) + 1(0.20) + 2(0.10)}{0.40} = 1.0$$

Given no auto claim, $E[Y \mid X = 0] = (0.18 + 0.12)/0.60 = 0.5$. The variance within a row is on [[Variance for Conditional and Marginal Distributions]].

## Continuous pairs: integrate over the region

For a joint density, the double sum becomes a double integral, taken over the region where the density is positive. Let the times $X$ and $Y$ of a policy's first and second claims, in years, have density $f(x, y) = 2$ on $0 < x < y < 1$. The inner limits follow the region: for each $y$, $x$ runs from 0 to $y$.

> $$E[XY] = \int_0^1 \int_0^y 2xy\,dx\,dy = \int_0^1 y^3\,dy = \frac{1}{4}$$

The same integrals give $E[X] = 1/3$ and $E[Y] = 2/3$, so $\text{Cov}(X, Y) = 1/4 - 2/9 = 1/36$.

## Try it

> [!example]- Expected product and covariance from a table {Example}
> On a policy, $X = 1$ if there is a liability claim and $Y = 1$ if there is a property claim, each 0 otherwise. The joint probabilities are $p(0, 0) = 0.3$, $p(0, 1) = 0.2$, $p(1, 0) = 0.1$ and $p(1, 1) = 0.4$. Find $\text{Cov}(X, Y)$.
>
> > [!answer]-
> > **Plan:** only the $(1, 1)$ cell contributes to $E[XY]$, and the margins give the means.
> > $$
> > \begin{align*}
> > E[XY] &= (1)(1)(0.4) \\
> > &= 0.4 \\
> > \text{Cov}(X, Y) &= 0.4 - (0.5)(0.6) \\
> > &= 0.10
> > \end{align*}
> > $$
> > Here $E[X] = 0.1 + 0.4 = 0.5$ and $E[Y] = 0.2 + 0.4 = 0.6$.

> [!example]- A product of independent losses {Example}
> Independent random variables have $E[X] = 2$, $E[X^2] = 5$, $E[Y] = 3$ and $E[Y^2] = 10$. Find $\text{Var}(XY)$.
>
> > [!answer]-
> > **Plan:** with independence, the second moment of the product splits into $E[X^2]\,E[Y^2]$.
> > $$
> > \begin{align*}
> > \text{Var}(XY) &= (5)(10) - \big((2)(3)\big)^2 \\
> > &= 50 - 36 \\
> > &= 14
> > \end{align*}
> > $$
> > Why not $\text{Var}(X)\,\text{Var}(Y) = (1)(1) = 1$? Expanding gives $\text{Var}(X)\text{Var}(Y) + \text{Var}(X)E[Y]^2 + \text{Var}(Y)E[X]^2 = 1 + 9 + 4$. The means carry most of the spread.

> [!example]- Covariance on a triangle {Example}
> Two losses have joint density $f(x, y) = 8xy$ on $0 < x < y < 1$. Find $\text{Cov}(X, Y)$.
>
> > [!answer]-
> > **Plan:** compute $E[X]$, $E[Y]$ and $E[XY]$ with $x$ running from 0 to $y$.
> > $$
> > \begin{align*}
> > E[X] &= \int_0^1 \int_0^y 8x^2 y\,dx\,dy \\
> > &= \frac{8}{15} \\
> > E[Y] &= \int_0^1 \int_0^y 8x y^2\,dx\,dy \\
> > &= \frac{4}{5} \\
> > E[XY] &= \int_0^1 \int_0^y 8x^2 y^2\,dx\,dy \\
> > &= \frac{4}{9}
> > \end{align*}
> > $$
> > So $\text{Cov}(X, Y) = 4/9 - (8/15)(4/5) = 4/225$. The covariance is positive because a larger $Y$ leaves more room for $X$.

> [!warning]- Exam traps
> - **Splitting $E[XY]$ without independence.** Only sums split freely.
> - **$\text{Var}(XY) = \text{Var}(X)\,\text{Var}(Y)$.** The variance of a product needs $E[X^2]\,E[Y^2] - (E[X]E[Y])^2$, and even that needs independence.
> - **Wrong limits on a triangular region.** The inner limit must follow the boundary, such as $x$ from 0 to $y$.
> - **Taking the function of the means.** $E[\max(X, Y)]$ is not $\max(E[X], E[Y])$.
