---
verification:
  status: verified
  confidence: high
  last_checked: 2026-11-28
  last_checked_by: agent:validate-v1
  content_hash: sha256:b6bd47adab15e7311fd3a16ee437c17ad3a242e71c24d3c2e10785d9a28d1874
  sources:
    - "Siegrist, Probability, Mathematical Statistics, and Stochastic Processes (randomservices.org), 4.1 Change of Variables Theorem, E(X+Y)=E(X)+E(Y), sha256:3228c869ff2a03804690236fc072d1cf7bd9b040855c67156791b50e7d3cfba9 — https://www.randomservices.org/random/expect/Properties.html"
    - "Siegrist, Probability, Mathematical Statistics, and Stochastic Processes (randomservices.org), Covariance and correlation: cov = E(XY)-E(X)E(Y); independent implies uncorrelated, converse fails, sha256:23ef4758146296b9865ca3f82f0e849934a667dcc8643afaa28147ad146feef7 — https://www.randomservices.org/random/expect/Covariance.html"
    - "Pishro-Nik, Introduction to Probability, Statistics, and Random Processes, §5.1.5, E[g(X)h(Y)]=E[g(X)]E[h(Y)] for independent; E[XY]=EXEY converse fails, sha256:fc5ec59a1da550d977f71e199458a61deffeb22a1b8cd95f8a8757a19118e03f — https://www.probabilitycourse.com/chapter5/5_1_5_conditional_expectation.php"
  open_findings: 0
  open_critical: 0
  log: .verify/Concepts/Moments for Joint Distributions.md
---

![[Media/Figures/Moments_for_Joint_Distributions.svg|340]]

**Moments for Joint Distributions** are the expected values of functions of two or more [[Random Variable|random variables]], calculated from their [[Joint Probability Function|joint probability function]]. For discrete random variables $X$ and $Y$ with joint probability function $p(x, y)$, the expected value of a function $g(X, Y)$ is

> $$E[g(X, Y)] = \sum_x \sum_y g(x, y)\,p(x, y)$$

- The sum runs over every pair $(x, y)$ with $p(x, y) > 0$.

> [!example]- A policyholder's numbers of auto claims $X$ and home claims $Y$ in a year have the joint probabilities below. What is $E[XY]$? {Example}
> | $X$ \ $Y$ | 0 | 1 | 2 |
> | --- | --- | --- | --- |
> | 0 | 0.36 | 0.18 | 0.06 |
> | 1 | 0.10 | 0.20 | 0.10 |
>
> - The product $xy$ is 0 in every cell with $x = 0$ or $y = 0$, so only the cells $(1, 1)$ and $(1, 2)$ contribute.
> - $E[XY]$ is $0.20 + 2(0.10) = 0.40$.

## Continuous random variables

For continuous random variables with joint density $f(x, y)$, the sum becomes a double integral over the region where $f(x, y) > 0$:

> $$E[g(X, Y)] = \iint g(x, y)\,f(x, y)\,dx\,dy$$

> [!example]- The times $X$ and $Y$ of a policy's first and second claims, in years, have joint density $f(x, y) = 2$ on $0 < x < y < 1$. What is $E[XY]$? {Example}
> - For each $y$, the region runs from $x = 0$ to $x = y$, so those are the inner limits.
> - Integrating $x$ first, then $y$:
>
> > $$
> > \begin{aligned}
> > E[XY] &= \int_0^1 \int_0^y 2xy\,dx\,dy \\
> > &= \int_0^1 y^3\,dy \\
> > &= \frac{1}{4}
> > \end{aligned}
> > $$

## Expected value of a sum

The expected value of a sum of random variables is

> $$E[X + Y] = E[X] + E[Y]$$

This holds whether or not $X$ and $Y$ are independent.

> [!example]- For the auto and home claims in the table above, what is the expected total number of claims? {Example}
> - The row totals 0.60 and 0.40 give $E[X] = 0.40$.
> - The column totals 0.46, 0.38 and 0.16 give $E[Y]$ as $0.38 + 2(0.16) = 0.70$.
> - $E[X + Y]$ is $0.40 + 0.70 = 1.1$, even though the two counts are dependent.

## Expected value of a product

For [[Independent Random Variables|independent random variables]] $X$ and $Y$, the expected value of a product of a function of each is

> $$E[g(X)\,h(Y)] = E[g(X)]\,E[h(Y)]$$

Without independence, $E[XY]$ must be calculated from the joint distribution. Its excess over $E[X]\,E[Y]$ is the [[Covariance|covariance]].

> [!example]- Independent random variables have $E[X] = 2$, $E[X^2] = 5$, $E[Y] = 3$ and $E[Y^2] = 10$. What is $\text{Var}(XY)$? {Example}
> - By independence, $E[XY] = (2)(3) = 6$.
> - Taking $g(x) = x^2$ and $h(y) = y^2$, $E[X^2 Y^2] = (5)(10) = 50$.
> - $\text{Var}(XY) = 50 - 6^2 = 14$.

> [!trap] Taking the function of the means
> Only sums split. For the auto and home claims, $E[\max(X, Y)] = 0.8$, but $\max(E[X], E[Y]) = 0.70$. In the same way, $E[Y/X]$ is not $E[Y]/E[X]$. A function that is not a sum is weighted cell by cell.
