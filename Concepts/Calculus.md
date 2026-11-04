---
verification:
  status: verified
  confidence: high
  last_checked: 2026-11-04
  last_checked_by: agent:validate-v1
  content_hash: sha256:c3e816d16aa1da2626a545c290c57bb7e2f49e8ae4b7fafe7f67d99ebac14542
  sources:
    - "SOA Probability Exam (Exam P) syllabus, November 2026, introduction: an understanding of calculus, including series, differentiation, and integration is assumed (PDF p.1), sha256:bed27462961aa988fc66c90fefa34af47ea324e2ab9109889c4e4f8f78d97397 — https://www.soa.org/globalassets/assets/files/edu/2026/fall/syllabi/2026-11-exam-p-syllabus.pdf"
    - "Grinstead & Snell, Introduction to Probability (2nd rev. ed., 2006 GNU FDL version), Def. 2.1 density P(a<=X<=b) = int_a^b f (p.59, PDF p.67); Thm 2.1 d/dx F(x) = f(x) via the Fundamental Theorem of Calculus (p.61, PDF p.69); eq. 5.2 Poisson distribution, values must sum to 1 (p.189, PDF p.197); Thm 5.1 and Cor. 5.1 f_Y(y) = f_X(phi^-1(y)) d/dy phi^-1(y) (p.210, PDF p.218); Def. 6.4 E(X) = int x f(x) dx (p.268, PDF p.276), sha256:763eab9894983ddfd6cd7f84685548d1515a9326a2d9fd015474534460551a5e — https://math.dartmouth.edu/~prob/prob/prob.pdf"
    - "OpenStax, Calculus Volume 2, §5.2 Infinite Series (web), Definition, eq. 5.7: sum_{n>=1} a r^(n-1) = a/(1-r) for |r|<1, and S_k = a(1-r^k)/(1-r), sha256:23f52fc4e749f10aea27cd134eaf650430594beb5356f1af81fb5a82c7f5735c — https://openstax.org/books/calculus-volume-2/pages/5-2-infinite-series"
    - "OpenStax, Calculus Volume 3, §5.2 Double Integrals over General Regions (web), Type I region D = {a<=x<=b, g1(x)<=y<=g2(x)}: inner limits are functions of the outer variable, sha256:c715085bda7da7011462c865ca0bc0867b5edb0bbbe87ce69d9c3f7b280ab25b — https://openstax.org/books/calculus-volume-3/pages/5-2-double-integrals-over-general-regions"
  open_findings: 0
  open_critical: 0
  log: .verify/Concepts/Calculus.md
---

**Calculus** is the mathematical study of continuous change. It is a core prerequisite for actuarial mathematics, underpinning [[Probability Theory]], financial mathematics, and life contingencies through differentiation, integration, and series analysis.

- **Differentiation** gives rates of change: a density is the derivative of its [[Cumulative Distribution Function (CDF)|CDF]], $f(x) = F'(x)$, and setting a derivative to zero locates a maximum or minimum.
- **Integration** turns a density into probabilities and moments: $P(a < X \leq b) = \int_a^b f(x)\,dx$ and $E[X] = \int x f(x)\,dx$.
- **Series** do the same work for discrete distributions, where a sum replaces the integral: the geometric series sums geometric probabilities, and the series for $e^x$ shows that Poisson probabilities total 1.

> [!idea] The idea
> Probability on a continuous scale is area under a density, so integrating answers "how likely" and "on average how much", and differentiating the CDF undoes it — the Fundamental Theorem of Calculus is that two-way street. Most calculus on the exam is this one move, plus splitting an integral wherever the integrand changes formula (at a deductible, a limit, or the edge of the support).

### Limits and Continuity
A **limit** describes the value a function approaches as its input approaches a point.

> $$\lim_{x \to a} f(x) = L$$

A function $f$ is **continuous** at $a$ if $\lim_{x \to a} f(x) = f(a)$.

If $\lim_{x \to a} f(x) = L$ and $\lim_{x \to a} g(x) = M$, where $L$ and $M$ are real numbers:

| Rule | Formula |
| ---- | ------- |
| Sum | $\lim_{x \to a}[f(x) + g(x)] = L + M$ |
| Product | $\lim_{x \to a}[f(x) \cdot g(x)] = L \cdot M$ |

**L'Hôpital's Rule** — if $f$ and $g$ are differentiable on an open interval containing $a$ (except possibly at $a$) and $\lim_{x \to a} \frac{f(x)}{g(x)}$ has the form $\frac{0}{0}$ or $\frac{\infty}{\infty}$, then $\lim_{x \to a} \frac{f(x)}{g(x)} = \lim_{x \to a} \frac{f'(x)}{g'(x)}$, provided the limit on the right exists or is $\pm\infty$.

### Differentiation
The **derivative** of $f$ at $x$ measures the instantaneous rate of change:

> $$f'(x) = \lim_{h \to 0} \frac{f(x+h) - f(x)}{h}$$

| Rule | Formula |
| ---- | ------- |
| Power | $(x^n)' = nx^{n-1}$ |
| Product | $(fg)' = f'g + fg'$ |
| Quotient | $\left(\dfrac{f}{g}\right)' = \dfrac{f'g - fg'}{g^2}$ |
| Chain | $[f(g(x))]' = f'(g(x))\cdot g'(x)$ |
| Exponential | $(e^x)' = e^x, \quad (a^x)' = a^x \ln a$ |
| Logarithm | $(\ln x)' = \dfrac{1}{x}$ |

**Partial derivatives** treat all variables except one as constants. They appear when working with joint distributions in [[Probability Theory]]:

$$\frac{\partial f}{\partial x}(x,y) \quad \text{holds } y \text{ fixed}$$

![[Media/Figures/Calculus.svg|340]]

> [!example]- Finding the Force of Mortality {Example}
> The survival function is $S(t) = e^{-\lambda t}$. Find the [[Hazard Rate|force of mortality]] $\mu(t) = -\dfrac{S'(t)}{S(t)}$.
>
> > [!answer]-
> > $$S'(t) = -\lambda e^{-\lambda t}$$
> > $$\mu(t) = -\frac{-\lambda e^{-\lambda t}}{e^{-\lambda t}} = \lambda$$

### Optimization
To maximize or minimize a differentiable function $g(a)$ on its feasible interval, solve $g'(a) = 0$, confirm the type with the second derivative, and compare with the endpoints.

- A positive second derivative at a critical point confirms a minimum, and a negative one a maximum: $g''(a) > 0$ is a minimum, $g''(a) < 0$ a maximum. An upward-opening quadratic $g(a) = pa^2 + qa + r$ with $p > 0$ is minimized at its vertex $a = -q/(2p)$
- Over a closed interval the extremes occur at critical points or at the endpoints, so a function monotone on the interval (such as an increasing linear one) has its minimum and maximum at the endpoints
- When the parameter is a probability, the feasible interval is where every probability in the model stays in $[0, 1]$
- With a constraint (a budget or a fixed total), substitute it first, so the objective is a function of one variable, then differentiate. For instance, to maximize $xy$ with $x + y = 12$, maximize $g(x) = x(12 - x)$: $g'(x) = 12 - 2x = 0$ gives $x = 6$, and $g''(x) = -2 < 0$ confirms a maximum of 36

### Integration
The **definite integral** gives the net signed area under $f$ from $a$ to $b$. If $f$ is continuous on $[a, b]$ and $F$ is any antiderivative of $f$:

> $$\int_a^b f(x)\,dx = F(b) - F(a)$$

- where $F'(x) = f(x)$

This result is the **Fundamental Theorem of Calculus**.

| Technique | When to Use | Key Formula |
| --------- | ----------- | ----------- |
| Power Rule | Polynomial terms | $\int x^n\,dx = \dfrac{x^{n+1}}{n+1} + C$, $n \neq -1$ (for $n = -1$: $\ln\lvert x \rvert + C$) |
| Substitution | Composite functions | Let $u = g(x)$, then $du = g'(x)\,dx$ |
| Integration by Parts | Product of functions | $\int u\,dv = uv - \int v\,du$ |
| Partial Fractions | Rational functions | Decompose denominator into linear and irreducible quadratic factors |

**Improper integrals** over $[0,\infty)$ are essential for continuous distributions on an unbounded support:

$$\int_0^\infty f(x)\,dx = \lim_{b\to\infty}\int_0^b f(x)\,dx$$

**Double integrals** appear in [[Multivariate Distribution|joint distribution]] calculations:

$$P(X \leq a,\, Y \leq b) = \int_{-\infty}^a \int_{-\infty}^b f(x,y)\,dy\,dx$$

**Splitting an integral.** Integrals are additive over intervals: the integral from $a$ to $b$ equals the integral from $a$ to $c$ plus the integral from $c$ to $b$.

> $$\int_a^b f(x)\,dx = \int_a^c f(x)\,dx + \int_c^b f(x)\,dx$$

To integrate a piecewise integrand, such as one containing $\lvert x \rvert$ or $\max(x, c)$, split at each breakpoint and use the formula that holds on each piece: $\lvert x \rvert = -x$ for $x < 0$ and $\lvert x \rvert = x$ for $x \geq 0$. For instance, $\int_{-1}^{2} \lvert x \rvert\,dx = \int_{-1}^{0} (-x)\,dx + \int_{0}^{2} x\,dx = \tfrac{1}{2} + 2 = \tfrac{5}{2}$.

> [!example]- Expected Value of the Exponential Distribution {Example}
> Let $X \sim \text{Exp}(\lambda)$ with $f(x) = \lambda e^{-\lambda x}$, $x > 0$. Find $E[X]$.
>
> > [!answer]-
> > Using integration by parts with $u = x$ and $dv = \lambda e^{-\lambda x}\,dx$:
> > $$E[X] = \int_0^\infty x\lambda e^{-\lambda x}\,dx = \left[-xe^{-\lambda x}\right]_0^\infty + \int_0^\infty e^{-\lambda x}\,dx = 0 + \frac{1}{\lambda} = \frac{1}{\lambda}$$

### Series
A **series** is the sum of the terms of a sequence. Two families appear constantly in actuarial work.

**Geometric Series** — forms the basis of present-value annuity formulas:

> $$\sum_{k=0}^{\infty} r^k = \frac{1}{1-r}, \quad |r| < 1$$

A **finite** geometric series with first term $a$ and ratio $r$ sums in closed form; letting $N \to \infty$ with $|r| < 1$ recovers $a/(1 - r)$:

> $$a + ar + ar^2 + \cdots + ar^{N-1} = \frac{a\,(1 - r^N)}{1 - r}, \quad r \neq 1$$

**Taylor / Maclaurin Series** — approximates a function as an infinite polynomial near $a = 0$:

> $$f(x) = \sum_{n=0}^{\infty} \frac{f^{(n)}(0)}{n!}\,x^n$$

| Function | Maclaurin Series |
| -------- | ---------------- |
| $e^x$ | $\displaystyle\sum_{n=0}^{\infty} \frac{x^n}{n!}$ |
| $\ln(1+x)$ | $\displaystyle\sum_{n=1}^{\infty} \frac{(-1)^{n+1}x^n}{n}, \quad -1 < x \leq 1$ |
| $(1+x)^k$ | $\displaystyle\sum_{n=0}^{\infty} \binom{k}{n} x^n, \quad \lvert x \rvert < 1$ |

> [!example]- Geometric Series: Present Value of a Perpetuity {Example}
> An annuity pays \$$1$ at the end of each year forever at effective annual rate $i$. Find the present value.
>
> > [!answer]-
> > Let $v = \dfrac{1}{1+i}$. The present value is:
> > $$PV = v + v^2 + v^3 + \cdots = \sum_{k=1}^{\infty} v^k = \frac{v}{1-v} = \frac{1}{i}$$

> [!tip]- How it appears on the exam
> - **Exam P** lists calculus as prerequisite knowledge, not as a learning objective, and the bank tags no question to this page; it is tested inside the probability questions instead.
> - Integrating a density: a probability over an interval, a mean or variance (integration by parts for $x e^{-\lambda x}$ and its relatives), or a double integral over a region for a joint density.
> - Splitting at a breakpoint: payments with a [[Deductible|deductible]] or [[Benefit Limit|benefit limit]] integrate to the breakpoint and beyond it separately.
> - Differentiating a CDF to get a density, or finding the parameter value that maximizes or minimizes a variance or an expected cost (the optimization steps above).
> - Summing a series: geometric sums for the geometric distribution, the exponential series for Poisson probabilities and moments.

> [!warning]- Exam traps
> - **The geometric series starts at the wrong term.** $\sum_{k=0}^{\infty} r^k = 1/(1-r)$ starts at $k = 0$; a sum starting at $k = 1$ is $r/(1-r)$. In the perpetuity example, using $1/(1-v)$ gives $(1+i)/i$, the value of payments at the *start* of each year, instead of $1/i$.
> - **Inner limits held fixed on a triangular region.** For a region such as $0 < x < y$, the inner integral's limits depend on the outer variable ($\int_0^\infty \int_0^y \ldots\,dx\,dy$). Writing constant limits on both integrals integrates over a rectangle, adding area outside the region.
> - **The chain rule dropped.** Differentiating $F(g(y))$ gives $f(g(y))\,g'(y)$. Leaving out $g'(y)$ when finding the density of a transformed variable gives a "density" that generally doesn't integrate to 1.
