---
verification:
  status: stale
  confidence: null
  last_checked: 2026-10-30
  last_checked_by: agent:validate-v1
  content_hash: sha256:c3e816d16aa1da2626a545c290c57bb7e2f49e8ae4b7fafe7f67d99ebac14542
  sources:
    - "OpenStax, Calculus Volume 1 (Strang, Herman et al., 2016), Thm 2.5 p.161 (PDF p.169); continuity def. p.180 (PDF p.188); derivative def. eqs. 3.5-3.6 p.220 (PDF p.228); Thm 3.3 p.249, Thm 3.5 p.253, Thm 3.6 p.255 (PDF pp.257-263); chain rule eq. 3.17 p.288 (PDF p.296); Thms 3.15-3.16 pp.324-327 (PDF pp.332-335); Thms 4.12-4.13 pp.455, 457 (PDF pp.463, 465); antiderivative ln|x| + C p.486 (PDF p.494); Thm 4.15 p.488 (PDF p.496); Thm 5.5 p.555 (PDF p.563); Thm 5.7 p.584 (PDF p.592), sha256:202c86537285adf7e5abeb64057c39ee7333ad8c8473b6dd6a9ddf3e72443286 — https://assets.openstax.org/oscms-prodcms/media/documents/CalculusVolume1-OP.pdf"
    - "OpenStax, Calculus Volume 2 (Strang, Herman et al., web PDF), Thm 3.1 p.232 (PDF p.240, page image); §3.4 partial fractions, strategy step 2 p.267 (PDF p.275); §3.7 Def. eq. 3.16 p.288 (PDF p.296, page image); §5.2 geometric series Def. eq. 5.7 p.401 (PDF p.409, page image); §6.3 Taylor/Maclaurin Def. eq. 6.5 p.498 (PDF p.506), sha256:f6ac06038088711766e5b664a8114c8fcb0b7b88cfb38e92bbaf56ba2df43f4a — https://assets.openstax.org/oscms-prodcms/media/documents/calculus-volume-2_-_WEB.pdf"
    - "OpenStax, Calculus Volume 3 (Strang, Herman et al., 2016), §4.3 partial derivatives, eq. 4.12 and the fix-one-variable argument, PDF pp.377-379, sha256:63d36af23d6f9a163b5e627aaa714b63e4196d8159b9d5fa3ea93bdbdd284ca9 — https://assets.openstax.org/oscms-prodcms/media/documents/CalculusVolume3-OP.pdf"
    - "NIST Digital Library of Mathematical Functions, §4.6 Power Series, eqs. 4.6.1 and 4.6.7 (HTML fetched 2026-09-27), sha256:dda80a4ebca6bab85fc738f032fe4fe06100a976a0728f2a8651715903addec6 — https://dlmf.nist.gov/4.6"
    - "NIST Digital Library of Mathematical Functions, §4.2 eq. 4.2.19 exp series (HTML fetched 2026-09-27), sha256:7b3a39ea2b1dc72440b0469070ef5d9e857ad09673e010036c06580d450bd50c — https://dlmf.nist.gov/4.2"
    - "Grinstead & Snell, Introduction to Probability (2nd rev. ed., 2006 GNU FDL version), §4.2 Def. 4.6 joint cumulative distribution (p.165, PDF p.173), sha256:763eab9894983ddfd6cd7f84685548d1515a9326a2d9fd015474534460551a5e — https://math.dartmouth.edu/~prob/prob/prob.pdf"
    - "OpenStax, Calculus Volume 1 (Strang, Herman et al., 2016), §4.3 Problem-Solving Strategy: Locating Absolute Extrema over a Closed Interval p.372 (PDF p.380); Thm 4.11 Second Derivative Test p.400 (PDF p.408); §4.7 Problem-Solving Strategy: Solving Optimization Problems, steps 4-5 (use the constraint to write the quantity as a function of one variable; identify the domain of consideration) p.441 (PDF p.449); §5.2 eq. 5.14 p.538 (PDF p.546), sha256:202c86537285adf7e5abeb64057c39ee7333ad8c8473b6dd6a9ddf3e72443286 — https://assets.openstax.org/oscms-prodcms/media/documents/CalculusVolume1-OP.pdf"
    - "OpenStax, Calculus Volume 2 (Strang, Herman et al., web PDF), §5.2 Geometric Series, S_k=a(1-r^k)/(1-r) for r != 1 and S_k -> a/(1-r) for |r|<1, p.401 (PDF p.409, page image read), sha256:f6ac06038088711766e5b664a8114c8fcb0b7b88cfb38e92bbaf56ba2df43f4a — https://assets.openstax.org/oscms-prodcms/media/documents/calculus-volume-2_-_WEB.pdf"
    - "Grinstead & Snell, Introduction to Probability (2nd rev. ed., 2006 GNU FDL version), Theorem 1.1 (P(E)>=0, P(Omega)=1, monotonicity), p.22 (PDF p.30), sha256:763eab9894983ddfd6cd7f84685548d1515a9326a2d9fd015474534460551a5e — https://math.dartmouth.edu/~prob/prob/prob.pdf"
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
