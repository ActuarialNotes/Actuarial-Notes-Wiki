**Calculus** is the mathematical study of continuous change. It is a core prerequisite for actuarial mathematics, underpinning [[Probability Theory]], financial mathematics, and life contingencies through differentiation, integration, and series analysis.

### Limits and Continuity
A **limit** describes the value a function approaches as its input approaches a point.

> $$\lim_{x \to a} f(x) = L$$

A function $f$ is **continuous** at $a$ if $\lim_{x \to a} f(x) = f(a)$.

| Rule | Formula |
| ---- | ------- |
| Sum | $\lim[f + g] = L + M$ |
| Product | $\lim[f \cdot g] = L \cdot M$ |
| L'Hôpital's Rule | $\lim \frac{f}{g} = \lim \frac{f'}{g'}$ when form is $\frac{0}{0}$ or $\frac{\infty}{\infty}$ |

### Differentiation
The **derivative** of $f$ at $x$ measures the instantaneous rate of change:

> $$f'(x) = \lim_{h \to 0} \frac{f(x+h) - f(x)}{h}$$

| Rule | Formula |
| ---- | ------- |
| Power | $(x^n)' = nx^{n-1}$ |
| Product | $(fg)' = f'g + fg'$ |
| Quotient | $\left(\dfrac{f}{g}\right)' = \dfrac{f'g - fg'}{g^2}$ |
| Chain | $[f(g(x))]' = f'(g(x))\cdot g'(x)$ |
| Exponential | $(e^x)' = e^x$, \quad $(a^x)' = a^x \ln a$ |
| Logarithm | $(\ln x)' = \dfrac{1}{x}$ |

**Partial derivatives** treat all variables except one as constants. They appear when working with joint distributions in [[Probability Theory]]:

$$\frac{\partial f}{\partial x}(x,y) \quad \text{holds } y \text{ fixed}$$

> [!example]- Finding the Force of Mortality {Example}
> The survival function is $S(t) = e^{-\lambda t}$. Find the [[Hazard Rate|force of mortality]] $\mu(t) = -\dfrac{S'(t)}{S(t)}$.
>
> > [!answer]-
> > $$S'(t) = -\lambda e^{-\lambda t}$$
> > $$\mu(t) = -\frac{-\lambda e^{-\lambda t}}{e^{-\lambda t}} = \lambda$$

### Integration
The **definite integral** gives the net signed area under $f$ from $a$ to $b$:

> $$\int_a^b f(x)\,dx = F(b) - F(a)$$
>
> $$\text{where } F'(x) = f(x)$$

This result is the **Fundamental Theorem of Calculus**.

| Technique | When to Use | Key Formula |
| --------- | ----------- | ----------- |
| Power Rule | Polynomial terms | $\int x^n\,dx = \dfrac{x^{n+1}}{n+1} + C$ |
| Substitution | Composite functions | Let $u = g(x)$, then $du = g'(x)\,dx$ |
| Integration by Parts | Product of functions | $\int u\,dv = uv - \int v\,du$ |
| Partial Fractions | Rational functions | Decompose denominator into linear factors |

**Improper integrals** over $[0,\infty)$ are essential for continuous distributions on an unbounded support:

$$\int_0^\infty f(x)\,dx = \lim_{b\to\infty}\int_0^b f(x)\,dx$$

**Double integrals** appear in [[Multivariate Distribution|joint distribution]] calculations:

$$P(X \leq a,\, Y \leq b) = \int_{-\infty}^a \int_{-\infty}^b f(x,y)\,dy\,dx$$

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

**Taylor / Maclaurin Series** — approximates a function as an infinite polynomial near $a = 0$:

> $$f(x) = \sum_{n=0}^{\infty} \frac{f^{(n)}(0)}{n!}\,x^n$$

| Function | Maclaurin Series |
| -------- | ---------------- |
| $e^x$ | $\displaystyle\sum_{n=0}^{\infty} \frac{x^n}{n!}$ |
| $\ln(1+x)$ | $\displaystyle\sum_{n=1}^{\infty} \frac{(-1)^{n+1}x^n}{n}$, \quad $|x| \leq 1$ |
| $(1+x)^k$ | $\displaystyle\sum_{n=0}^{\infty} \binom{k}{n} x^n$, \quad $|x| < 1$ |

> [!example]- Geometric Series: Present Value of a Perpetuity {Example}
> An annuity pays \$$1$ at the end of each year forever at effective annual rate $i$. Find the present value.
>
> > [!answer]-
> > Let $v = \dfrac{1}{1+i}$. The present value is:
> > $$PV = v + v^2 + v^3 + \cdots = \sum_{k=1}^{\infty} v^k = \frac{v}{1-v} = \frac{1}{i}$$
