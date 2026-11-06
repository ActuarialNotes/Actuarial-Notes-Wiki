---
verification:
  status: verified
  confidence: high
  last_checked: 2026-11-04
  last_checked_by: agent:validate-v1
  content_hash: sha256:5e25f5252bbe4acbd45c5bc3eebf99f2d64808ac5e4d8b25b4115e2df8ee578c
  sources:
    - "SOA Probability Exam (Exam P) syllabus, November 2026, introduction: an understanding of calculus, including series, differentiation, and integration is assumed (PDF p.1), sha256:bed27462961aa988fc66c90fefa34af47ea324e2ab9109889c4e4f8f78d97397 — https://www.soa.org/globalassets/assets/files/edu/2026/fall/syllabi/2026-11-exam-p-syllabus.pdf"
    - "Grinstead & Snell, Introduction to Probability (2nd rev. ed., 2006 GNU FDL version), Def. 2.1 density P(a<=X<=b) = int_a^b f (p.59, PDF p.67); Thm 2.1 d/dx F(x) = f(x) via the Fundamental Theorem of Calculus (p.61, PDF p.69); eq. 5.2 Poisson distribution, values must sum to 1 (p.189, PDF p.197); Thm 5.1 and Cor. 5.1 f_Y(y) = f_X(phi^-1(y)) d/dy phi^-1(y) (p.210, PDF p.218); Def. 6.4 E(X) = int x f(x) dx (p.268, PDF p.276), sha256:763eab9894983ddfd6cd7f84685548d1515a9326a2d9fd015474534460551a5e — https://math.dartmouth.edu/~prob/prob/prob.pdf"
    - "OpenStax, Calculus Volume 2, §5.2 Infinite Series (web), Definition, eq. 5.7: sum_{n>=1} a r^(n-1) = a/(1-r) for |r|<1, and S_k = a(1-r^k)/(1-r), sha256:23f52fc4e749f10aea27cd134eaf650430594beb5356f1af81fb5a82c7f5735c — https://openstax.org/books/calculus-volume-2/pages/5-2-infinite-series"
    - "OpenStax, Calculus Volume 3, §5.2 Double Integrals over General Regions (web), Type I region D = {a<=x<=b, g1(x)<=y<=g2(x)}: inner limits are functions of the outer variable, sha256:c715085bda7da7011462c865ca0bc0867b5edb0bbbe87ce69d9c3f7b280ab25b — https://openstax.org/books/calculus-volume-3/pages/5-2-double-integrals-over-general-regions"
    - "Grinstead & Snell, Introduction to Probability (2nd rev. ed., 2006 GNU FDL version), §2.2 continuous density: as dx -> 0 the probability P({x}) of a single point is 0 (p.60, PDF p.68), sha256:763eab9894983ddfd6cd7f84685548d1515a9326a2d9fd015474534460551a5e — https://math.dartmouth.edu/~prob/prob/prob.pdf"
    - "OpenStax, Calculus Volume 2, §6.3 Taylor and Maclaurin Series (web), Definition: if a = 0 the Taylor series for f at a is known as the Maclaurin series; the Taylor series for f at 0 is the Maclaurin series, sha256:d31b601074d1b8cc7241191e2d4ec581e3524ae4ec5907a6c500f2ad4683f9dd — https://openstax.org/books/calculus-volume-2/pages/6-3-taylor-and-maclaurin-series"
  open_findings: 0
  open_critical: 0
  log: .verify/Concepts/Calculus.md
---

**Calculus** is the mathematical study of continuous change. Calculus is a core prerequisite for actuarial mathematics, and its differentiation, integration and series underpin [[Probability Theory]], financial mathematics and life contingencies.

> $$\int_a^b f(x)\,dx = F(b) - F(a)$$

- where $F$ is any antiderivative of $f$, so $F'(x) = f(x)$. This result is the **Fundamental Theorem of Calculus**.
- **Integration** turns a density into probabilities and moments: $P(a < X \leq b) = \int_a^b f(x)\,dx$ and $E[X] = \int x f(x)\,dx$.
- **Differentiation** gives rates of change. A density is the derivative of its [[Cumulative Distribution Function (CDF)|CDF]], $f(x) = F'(x)$, and setting a derivative to zero locates a maximum or minimum.
- **Series** do the same work for discrete distributions, where a sum replaces the integral.

> [!idea] The idea
> A continuous random variable takes any single value with probability 0, so its probabilities have to come from areas under the density. Calculus finds those areas. Differentiating the CDF undoes the integration and returns the density, which is what the Fundamental Theorem of Calculus says.

![[Media/Figures/Calculus.svg|340]]

## Probabilities are areas

A loss $X$ has density $f(x) = 0.002\,e^{-0.002x}$ for $x > 0$. This is the [[Exponential Distribution|exponential distribution]] with mean 500. What is the probability that the loss is between 200 and 500?

The probability is the area under $f$ from 200 to 500. An antiderivative of $f$ is $F(x) = 1 - e^{-0.002x}$, which is also the CDF.

$$P(200 < X \leq 500) = F(500) - F(200) = e^{-0.4} - e^{-1} \approx 0.302$$

The **definite integral** gives the net signed area under $f$ from $a$ to $b$. If $f$ is continuous on $[a, b]$, the theorem above evaluates it with any antiderivative. Finding the antiderivative is the work, and four techniques cover almost every density on the exam.

| Technique | When to Use | Key Formula |
| --------- | ----------- | ----------- |
| Power Rule | Polynomial terms | $\int x^n\,dx = \dfrac{x^{n+1}}{n+1} + C$, $n \neq -1$ (for $n = -1$: $\ln\lvert x \rvert + C$) |
| Substitution | Composite functions | Let $u = g(x)$, then $du = g'(x)\,dx$ |
| Integration by Parts | Product of functions | $\int u\,dv = uv - \int v\,du$ |
| Partial Fractions | Rational functions | Decompose denominator into linear and irreducible quadratic factors |

The loss has no upper limit, so the total area is an **improper integral**. Improper integrals over $[0,\infty)$ are essential for continuous distributions on an unbounded support:

> $$\int_0^\infty f(x)\,dx = \lim_{b\to\infty}\int_0^b f(x)\,dx$$

- For the loss, $\int_0^b f(x)\,dx = 1 - e^{-0.002b}$, which tends to 1. A density always integrates to 1.

## The mean, by parts

The mean is $E[X] = \int_0^\infty x f(x)\,dx$. The integrand is a product, $x$ times an exponential, so use integration by parts with $u = x$ and $dv = \lambda e^{-\lambda x}\,dx$, where $\lambda = 0.002$.

$$
\begin{align*}
E[X] &= \int_0^\infty x\lambda e^{-\lambda x}\,dx \\
&= \left[-xe^{-\lambda x}\right]_0^\infty + \int_0^\infty e^{-\lambda x}\,dx \\
&= 0 + \frac{1}{\lambda} \\
&= 500
\end{align*}
$$

- The same steps give $E[X] = 1/\lambda$ for any exponential distribution.
- Doing parts twice gives $E[X^2] = 2/\lambda^2 = 500{,}000$.
- The boundary term is 0 at $\infty$ only because $x e^{-\lambda x} \to 0$. That needs a limit.

## Limits and continuity

A **limit** describes the value a function approaches as its input approaches a point.

> $$\lim_{x \to a} f(x) = L$$

A function $f$ is **continuous** at $a$ if $\lim_{x \to a} f(x) = f(a)$. If $\lim_{x \to a} f(x) = L$ and $\lim_{x \to a} g(x) = M$, where $L$ and $M$ are real numbers:

| Rule | Formula |
| ---- | ------- |
| Sum | $\lim_{x \to a}[f(x) + g(x)] = L + M$ |
| Product | $\lim_{x \to a}[f(x) \cdot g(x)] = L \cdot M$ |

The boundary term $x e^{-\lambda x}$ is "$\infty \times 0$" as $x \to \infty$, which the product rule can't settle. **L'Hôpital's Rule** can. If $f$ and $g$ are differentiable on an open interval containing $a$ (except possibly at $a$) and $\lim_{x \to a} \frac{f(x)}{g(x)}$ has the form $\frac{0}{0}$ or $\frac{\infty}{\infty}$, then $\lim_{x \to a} \frac{f(x)}{g(x)} = \lim_{x \to a} \frac{f'(x)}{g'(x)}$, provided the limit on the right exists or is $\pm\infty$.

$$\lim_{x \to \infty} \frac{x}{e^{\lambda x}} = \lim_{x \to \infty} \frac{1}{\lambda e^{\lambda x}} = 0$$

- So $\left[-xe^{-\lambda x}\right]_0^\infty = 0 - 0 = 0$, and the mean is $1/\lambda = 500$.

## Back from the CDF: differentiation

Given the CDF $F(x) = 1 - e^{-0.002x}$, how do you recover the density? Differentiate it. The **derivative** of $f$ at $x$ measures the instantaneous rate of change:

> $$f'(x) = \lim_{h \to 0} \frac{f(x+h) - f(x)}{h}$$

| Rule | Formula |
| ---- | ------- |
| Power | $(x^n)' = nx^{n-1}$ |
| Product | $(fg)' = f'g + fg'$ |
| Quotient | $\left(\dfrac{f}{g}\right)' = \dfrac{f'g - fg'}{g^2}$ |
| Chain | $[f(g(x))]' = f'(g(x))\cdot g'(x)$ |
| Exponential | $(e^x)' = e^x, \quad (a^x)' = a^x \ln a$ |
| Logarithm | $(\ln x)' = \dfrac{1}{x}$ |

- By the chain rule, $F'(x) = 0.002\,e^{-0.002x}$, the density again.
- The survival function is $S(x) = 1 - F(x) = e^{-0.002x}$. Its rate of decline relative to its size, $-S'(x)/S(x)$, is the [[Hazard Rate|hazard rate]]. Here it is the constant 0.002.
- For a transformed variable $Y = g(X)$, differentiating $F_X(g^{-1}(y))$ needs the chain rule. Leaving out the inner derivative gives a "density" that doesn't integrate to 1.

## Splitting an integral

A policy pays the loss above a deductible of 200. Below 200 the payment is 0, and above it is $x - 200$. The integrand changes formula at 200, so the integral splits there. Integrals are additive over intervals.

> $$\int_a^b f(x)\,dx = \int_a^c f(x)\,dx + \int_c^b f(x)\,dx$$

- Expected payment: $\int_{200}^\infty (x - 200) f(x)\,dx = 500\,e^{-0.4} \approx 335.16$.
- Expected amount kept below the deductible: $\int_0^{200} x f(x)\,dx + 200\,P(X > 200) \approx 164.84$.
- The two add to $E[X] = 500$, because together they cover the whole range of the loss.

To integrate any piecewise integrand, such as one containing $\lvert x \rvert$ or $\max(x, c)$, split at each breakpoint and use the formula that holds on each piece. The absolute value is $\lvert x \rvert = -x$ for $x < 0$ and $\lvert x \rvert = x$ for $x \geq 0$. So $\int_{-1}^{2} \lvert x \rvert\,dx = \int_{-1}^{0} (-x)\,dx + \int_{0}^{2} x\,dx = \tfrac{1}{2} + 2 = \tfrac{5}{2}$.

## Two variables

Two independent losses $X$ and $Y$ each have the density above. What is the probability that $X$ is smaller? Two variables need a joint density and a **double integral** over the region where the event holds.

> $$P(X \leq a,\, Y \leq b) = \int_{-\infty}^a \int_{-\infty}^b f(x,y)\,dy\,dx$$

For $P(X < Y)$ the region is $0 < x < y$. The inner integral runs from 0 to $y$, which depends on the outer variable.

$$P(X < Y) = \int_0^\infty \int_0^y \lambda^2 e^{-\lambda x - \lambda y}\,dx\,dy = \frac{1}{2}$$

- Double integrals appear in every [[Multivariate Distribution|joint distribution]] calculation.
- **Partial derivatives** treat all variables except one as constants. They appear when working with joint distributions, for example to recover a joint density from a joint CDF.

$$\frac{\partial f}{\partial x}(x,y) \quad \text{holds } y \text{ fixed}$$

> [!trap] Inner limits held fixed
> Writing $\int_0^\infty \int_0^\infty$ for the region $0 < x < y$ integrates over the whole quadrant and gives 1, not $\frac{1}{2}$. The inner limits must follow the region.

## Finding the best value

Which single number $c$ is closest to the loss on average, in the sense of the smallest $g(c) = E[(X - c)^2]$? Expand the square, so $g(c) = E[X^2] - 2c\,E[X] + c^2$. To minimize it, solve $g'(c) = 0$.

$$g'(c) = -2E[X] + 2c = 0$$

This gives $c = E[X] = 500$, and $g''(c) = 2 > 0$ confirms a minimum. The minimum value is $500{,}000 - 500^2 = 250{,}000$, the variance. To maximize or minimize a differentiable function $g(a)$ on its feasible interval, solve $g'(a) = 0$, confirm the type with the second derivative, and compare with the endpoints.

- A positive second derivative at a critical point confirms a minimum, and a negative one a maximum: $g''(a) > 0$ is a minimum, $g''(a) < 0$ a maximum.
- An upward-opening quadratic $g(a) = pa^2 + qa + r$ with $p > 0$ is minimized at its vertex $a = -q/(2p)$. Here $p = 1$ and $q = -1000$, so the vertex is 500.
- Over a closed interval the extremes occur at critical points or at the endpoints. A function monotone on the interval, such as an increasing linear one, has its minimum and maximum at the endpoints.
- When the parameter is a probability, the feasible interval is where every probability in the model stays in $[0, 1]$.
- With a constraint, such as a budget or a fixed total, substitute it first, so the objective is a function of one variable, then differentiate. To maximize $xy$ with $x + y = 12$, maximize $g(x) = x(12 - x)$. $g'(x) = 12 - 2x = 0$ gives $x = 6$, and $g''(x) = -2 < 0$ confirms a maximum of 36.

## Series

A discrete distribution puts its probability on separate values, so its totals and means are sums. A **series** is the sum of the terms of a sequence, and two families appear constantly in actuarial work.

**Geometric series.** The geometric series sums geometric probabilities and is the basis of present-value annuity formulas:

> $$\sum_{k=0}^{\infty} r^k = \frac{1}{1-r}, \quad |r| < 1$$

A **finite** geometric series with first term $a$ and ratio $r$ sums in closed form. It tends to $a/(1 - r)$ as $N \to \infty$ when $|r| < 1$.

> $$a + ar + ar^2 + \cdots + ar^{N-1} = \frac{a\,(1 - r^N)}{1 - r}, \quad r \neq 1$$

**Taylor and Maclaurin series.** The Maclaurin series is the Taylor series about $a = 0$. It writes a function as an infinite polynomial near $0$:

> $$f(x) = \sum_{n=0}^{\infty} \frac{f^{(n)}(0)}{n!}\,x^n$$

| Function | Maclaurin Series |
| -------- | ---------------- |
| $e^x$ | $\displaystyle\sum_{n=0}^{\infty} \frac{x^n}{n!}$ |
| $\ln(1+x)$ | $\displaystyle\sum_{n=1}^{\infty} \frac{(-1)^{n+1}x^n}{n}, \quad -1 < x \leq 1$ |
| $(1+x)^k$ | $\displaystyle\sum_{n=0}^{\infty} \binom{k}{n} x^n, \quad \lvert x \rvert < 1$ |

- The series for $e^x$ shows that Poisson probabilities total 1: $\sum_{k=0}^\infty e^{-\lambda} \lambda^k / k! = e^{-\lambda} e^{\lambda} = 1$.

## On other exams

- **Exam P** lists calculus as prerequisite knowledge, not as a learning objective. It is tested inside the probability questions: integrating a density, splitting at a [[Deductible|deductible]] or [[Benefit Limit|benefit limit]], differentiating a CDF, optimizing a variance or an expected cost, and summing a series.
- **Exam FM** uses the geometric series for every level annuity and perpetuity.
- **Life contingencies** use the force of mortality, the hazard rate of a future lifetime, which is a derivative of the survival function.
- **MAS-II** lists calculus and probability at a thorough level as prerequisite knowledge.

## Try it

> [!example]- Finding the force of mortality {Example}
> The survival function is $S(t) = e^{-\lambda t}$. Find the [[Hazard Rate|force of mortality]] $\mu(t) = -\dfrac{S'(t)}{S(t)}$.
>
> > [!answer]-
> > **Plan:** differentiate $S$ with the chain rule, then divide.
> > $$S'(t) = -\lambda e^{-\lambda t}$$
> > $$\mu(t) = -\frac{-\lambda e^{-\lambda t}}{e^{-\lambda t}} = \lambda$$
> > A constant force of mortality is the continuous-time version of a constant chance of death in each instant.

> [!example]- Present value of a perpetuity {Example}
> An annuity pays $\$1$ at the end of each year forever at effective annual rate $i$. Find the present value.
>
> > [!answer]-
> > **Plan:** write the present value as a geometric series in $v = \dfrac{1}{1+i}$.
> > $$
> > \begin{align*}
> > PV &= v + v^2 + v^3 + \cdots \\
> > &= \sum_{k=1}^{\infty} v^k \\
> > &= \frac{v}{1-v} \\
> > &= \frac{1}{i}
> > \end{align*}
> > $$
> > The sum starts at $k = 1$, because the first payment is a year away.

> [!example]- The density of a transformed loss {Example}
> $X$ is uniform on $(0, 1)$ and $Y = X^2$. Find the density of $Y$.
>
> > [!answer]-
> > **Plan:** find the CDF of $Y$ through $X$, then differentiate it.
> >
> > $$
> > \begin{align*}
> > F_Y(y) &= P(X^2 \leq y) \\
> > &= P(X \leq \sqrt{y}) \\
> > &= \sqrt{y} \\
> > f_Y(y) &= \frac{1}{2\sqrt{y}}, \quad 0 < y < 1
> > \end{align*}
> > $$
> >
> > The factor $\frac{1}{2\sqrt{y}}$ is the chain rule's inner derivative. Check: $\int_0^1 \frac{1}{2\sqrt{y}}\,dy = 1$.

> [!warning]- Exam traps
> - **The geometric series starts at the wrong term.** $\sum_{k=0}^{\infty} r^k = 1/(1-r)$ starts at $k = 0$. A sum starting at $k = 1$ is $r/(1-r)$. In the perpetuity example, using $1/(1-v)$ gives $(1+i)/i$, the value of payments at the *start* of each year, instead of $1/i$.
> - **Inner limits held fixed on a triangular region.** For a region such as $0 < x < y$, the inner integral's limits depend on the outer variable ($\int_0^\infty \int_0^y \ldots\,dx\,dy$). Writing constant limits on both integrals integrates over a rectangle, adding area outside the region.
> - **The chain rule dropped.** Differentiating $F(g(y))$ gives $f(g(y))\,g'(y)$. Leaving out $g'(y)$ when finding the density of a transformed variable gives a "density" that generally doesn't integrate to 1.
> - **No split at a breakpoint.** An integrand with a deductible, a limit or an absolute value changes formula at the breakpoint. Integrating one formula across it gives the wrong area.
