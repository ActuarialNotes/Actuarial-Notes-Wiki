---
verification:
  status: stale
  confidence: null
  last_checked: 2026-09-28
  last_checked_by: agent:validate-v1
  content_hash: sha256:7ee04aa4760ccee7c325560d1f3e90c3c6204cb76d7c81778d23dd67780f21f1
  sources:
    - "Grinstead & Snell, Introduction to Probability (2nd rev. ed., 2006 GNU FDL version), Theorem 5.1 and Corollary 5.1, Corollary 5.2 with the simulation paragraph before it, Ch. 5 Exercise 21, Theorems 6.2 and 6.7, sha256:763eab9894983ddfd6cd7f84685548d1515a9326a2d9fd015474534460551a5e — https://math.dartmouth.edu/~prob/prob/prob.pdf"
    - "Pishro-Nik, Introduction to Probability, Statistics, and Random Processes (probabilitycourse.com, HTML fetched 2026-09-27), §4.1.3 Functions of Continuous Random Variables (CDF method, method of transformations theorem for strictly monotonic differentiable g, Uniform(-1,1) squared example), sha256:fc521c3f2e55589d01948dd57e551aee1c34ccda1a11b52302064a9672de23bf — https://www.probabilitycourse.com/chapter4/4_1_3_functions_continuous_var.php"
    - "Pishro-Nik, Introduction to Probability, Statistics, and Random Processes (probabilitycourse.com, HTML fetched 2026-09-27), §4.1.2 Expected Value and Variance (LOTUS, E[aX+b] = aEX + b, Var(aX+b) = a^2 Var(X) (4.4)), sha256:120c9fb88296609ab0cd0c2d2e74064ec745b889842a1a93703e328dbf9266ab — https://www.probabilitycourse.com/chapter4/4_1_2_expected_val_variance.php"
    - "SOA, Tables for Exam C (Fall 2009; Loss Models 3rd ed. Appendices A-B excerpts), A.3.3.1 Exponential (PDF p.11), sha256:cefc3286baa0150b6520455e76104589f1187622212efe05a600926d0bf14e0f — https://www.soa.org/globalassets/assets/files/edu/edu-2009-fall-exam-c-table.pdf"
    - "Anderson & Brown, Risk and Insurance (SOA study note P-21-05, 2005), Deductibles, Benefit Limits and Inflation sections (PDF pp.7-9), sha256:1cb44e7f9ee240a9a0597a89dbf3a055ab70d07a8739132c75440051ee655922 — https://www.soa.org/globalassets/assets/files/edu/P-21-05.pdf"
    - "SOA Probability Exam syllabus, November 2026, Topic 2 (univariate random variables) learning outcomes c), d), e) (PDF p.3), sha256:bed27462961aa988fc66c90fefa34af47ea324e2ab9109889c4e4f8f78d97397 — https://www.soa.org/globalassets/assets/files/edu/2026/fall/syllabi/2026-11-exam-p-syllabus.pdf"
  open_findings: 0
  open_critical: 0
  log: .verify/Concepts/Transformations of Random Variables.md
---

![[Media/Figures/Transformations_of_Random_Variables.svg|340]]

A **Transformation of a Random Variable** is a new [[Random Variable|random variable]] $Y = g(X)$ defined as a function $g$ of a random variable $X$. The cdf of $Y$ is found by writing the event $Y \le y$ as an event about $X$:

> $$F_Y(y) = P\bigl(g(X) \le y\bigr)$$

- $F_Y(y)$ is the [[Cumulative Distribution Function (CDF)|cdf]] of $Y$.

The event $g(X) \le y$ is rewritten as a set of values of $X$ by inverting $g$, and its probability is found from the cdf $F_X$ of $X$. When $g$ is decreasing, inverting it reverses the inequality. The [[Probability Density Function (PDF)|density]] of $Y$ is the derivative of its cdf, $f_Y(y) = F_Y'(y)$.

> [!example]- $X$ is uniform on $(0, 1)$ and $Y = 1/X$. What is the cdf of $Y$, and what is $P(Y > 4)$? {Example}
> - The function $1/x$ is decreasing, so for $y > 1$ inverting it reverses the inequality: $F_Y(y) = P(1/X \le y) = P(X \ge 1/y)$.
> - For a uniform $X$ on $(0, 1)$, $P(X \ge 1/y) = 1 - 1/y$, so $F_Y(y) = 1 - 1/y$ for $y > 1$.
> - The probability is $P(Y > 4) = 1 - F_Y(4) = 1/4 = 0.25$.

## Events about a transformed random variable

A probability about $Y = g(X)$ is found by rewriting the event as a set of values of $X$. For a payment $Y = X - d$ on a loss above a [[Deductible|deductible]] $d$, $P(X - d > y) = P(X > y + d)$. For $Y = cX$ with $c > 0$, $P(cX > y) = P(X > y/c)$. For an inequality that is quadratic in $X$, the roots of the quadratic split the values of $X$ into intervals, and the event is the union of the intervals where the inequality holds.

> [!example]- $X$ is uniform on $(0, 4)$. What is $P(X^2 - 5X + 6 > 0)$? {Example}
> - The quadratic factors as $(X - 2)(X - 3)$, with roots 2 and 3.
> - The product is positive when $X < 2$ or $X > 3$.
> - The probability is $P(X < 2) + P(X > 3) = 2/4 + 1/4 = 0.75$.

## Linear transformations

A percentage increase $r$ on a random amount $X$ multiplies it by $1 + r$, and a flat amount $c$ adds to it, so the result is the linear transformation $Y = aX + b$. Its mean is

> $$E[aX + b] = aE[X] + b$$

and its variance is

> $$\text{Var}(aX + b) = a^2\,\text{Var}(X)$$

The standard deviation is $|a|$ times the standard deviation of $X$, and the shift $b$ does not change it.

> [!example]- Claim costs $X$ have mean 1,000 and standard deviation 400. Next year costs rise by 5%, and a fixed handling cost of 50 is added to each claim. What are the mean and standard deviation of next year's claim cost? {Example}
> - Next year's cost is $Y = 1.05X + 50$.
> - The mean is $1.05 \times 1{,}000 + 50 = 1{,}100$.
> - The standard deviation is $1.05 \times 400 = 420$.

## The expected value of a function

The mean of $Y = g(X)$ does not need the distribution of $Y$. For a continuous random variable $X$ with density $f(x)$, it is

> $$E[g(X)] = \int_{-\infty}^{\infty} g(x)\,f(x)\,dx$$

When $g$ has different forms on different intervals, such as $\max(X, c)$, the integral is split at the points where the form changes. The variance of $Y$ is $E[g(X)^2] - \bigl(E[g(X)]\bigr)^2$, with $E[g(X)^2]$ found by the same integral. For $g$ that is not linear, $E[g(X)]$ is in general not $g(E[X])$.

> [!example]- $X$ is uniform on $(0, 10)$. What is $E[\max(X, 4)]$? {Example}
> - The function is 4 for $X < 4$ and $X$ for $X \ge 4$, and the density is $1/10$.
> - The integral over $(0, 4)$ is $4 \times 4/10 = 1.6$.
> - The integral over $(4, 10)$ is $\int_4^{10} x/10\,dx = (100 - 16)/20 = 4.2$.
> - The expected value is $1.6 + 4.2 = 5.8$.

## The change-of-variable formula

When $g$ is strictly increasing or strictly decreasing on the values $X$ can take, differentiating the cdf of $Y$ gives its density directly:

> $$f_Y(y) = f_X\bigl(g^{-1}(y)\bigr)\left|\frac{d}{dy}g^{-1}(y)\right|$$

- $g^{-1}$ is the inverse of $g$, so $X = g^{-1}(Y)$.
- $f_X$ is the density of $X$.

> [!example]- Losses $X$ are exponential with mean 1,000, and next year's losses are $Y = 1.1X$. What is the density of $Y$? {Example}
> - The inverse is $g^{-1}(y) = y/1.1$, with derivative $1/1.1$.
> - Substituting the inverse gives $f_X(y/1.1) = \frac{1}{1{,}000}e^{-y/1{,}100}$.
> - Multiplying by $1/1.1$ gives $f_Y(y) = \frac{1}{1{,}100}e^{-y/1{,}100}$ for $y > 0$.
> - $Y$ is exponential with mean 1,100.

## Transformations of several random variables

If $Y_1 = g_1(X_1, X_2)$ and $Y_2 = g_2(X_1, X_2)$ is a one-to-one transformation with inverse $x_1 = w_1(y_1, y_2)$ and $x_2 = w_2(y_1, y_2)$, the [[Joint Probability Density Function|joint density]] of $Y_1$ and $Y_2$ is

> $$f_{Y_1, Y_2}(y_1, y_2) = f_{X_1, X_2}\bigl(w_1(y_1, y_2), w_2(y_1, y_2)\bigr)\,|J|$$

- $J$ is the Jacobian of the inverse transformation.

The Jacobian is the determinant of the matrix of partial derivatives of $w_1$ and $w_2$ with respect to $y_1$ and $y_2$:

> $$J = \frac{\partial w_1}{\partial y_1}\frac{\partial w_2}{\partial y_2} - \frac{\partial w_1}{\partial y_2}\frac{\partial w_2}{\partial y_1}$$

The density of $Y_1$ alone is found by integrating $y_2$ out of the joint density.

> [!example]- $X_1$ and $X_2$ are independent exponential random variables with mean 1. What is the density of $Y_1 = X_1 + X_2$? {Example}
> - Take $Y_2 = X_2$, so the inverse is $x_1 = y_1 - y_2$ and $x_2 = y_2$, with $J = 1 \times 1 - (-1) \times 0 = 1$.
> - The joint density is $e^{-(y_1 - y_2)}e^{-y_2} = e^{-y_1}$ for $0 < y_2 < y_1$.
> - Integrating $y_2$ from 0 to $y_1$ gives $f_{Y_1}(y_1) = y_1 e^{-y_1}$ for $y_1 > 0$, a [[Gamma|gamma]] density with shape 2.

> [!trap] Putting the mean into the function
> For a function that is not linear, $E[g(X)]$ is not $g(E[X])$. If the radius $R$ of a circle is uniform on $(0, 2)$, the expected area is $\pi E[R^2] = 4\pi/3 = 4.19$, not $\pi(E[R])^2 = \pi = 3.14$.
