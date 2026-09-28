---
verification:
  status: in_review
  confidence: null
  last_checked: 2026-09-27
  last_checked_by: agent:validate-v1
  content_hash: sha256:0721eabf03c6b8a52fb67a0e21cb29ecc5d852926317818a9a5d7302541a4ab3
  sources:
    - "OpenStax, Calculus Volume 1 (Strang, Herman et al., 2016), Thm 2.5 p.161 (PDF p.169); continuity def. p.180; derivative def. p.220; Thms 3.3, 3.5, 3.6 pp.249-255; chain rule p.288; Thms 3.15-3.16 pp.324-327; Thms 4.12-4.13 pp.455-457; Thm 4.15 p.488; Thm 5.5 p.555; Thm 5.7 p.584 (PDF = printed + 8), sha256:202c86537285adf7e5abeb64057c39ee7333ad8c8473b6dd6a9ddf3e72443286 — https://assets.openstax.org/oscms-prodcms/media/documents/CalculusVolume1-OP.pdf"
    - "OpenStax, Calculus Volume 2 (Strang, Herman et al., web PDF), Thm 3.1 p.232; §3.4 p.262; Def. eq. 3.16 p.288; p.417; §6.3 p.507-508; binomial series Def. p.514 (PDF = printed + 8), sha256:f6ac06038088711766e5b664a8114c8fcb0b7b88cfb38e92bbaf56ba2df43f4a — https://assets.openstax.org/oscms-prodcms/media/documents/calculus-volume-2_-_WEB.pdf"
    - "OpenStax, Calculus Volume 3 (Strang, Herman et al., 2016), §4.3 partial derivatives, eq. 4.12, PDF pp.377-379, sha256:63d36af23d6f9a163b5e627aaa714b63e4196d8159b9d5fa3ea93bdbdd284ca9 — https://assets.openstax.org/oscms-prodcms/media/documents/CalculusVolume3-OP.pdf"
    - "NIST Digital Library of Mathematical Functions, §4.6 Series Expansions, eqs. 4.6.1 and 4.6.7 (HTML fetched 2026-09-27), sha256:dda80a4ebca6bab85fc738f032fe4fe06100a976a0728f2a8651715903addec6 — https://dlmf.nist.gov/4.6"
    - "Grinstead & Snell, Introduction to Probability (2nd rev. ed., 2006 GNU FDL version), §4.2 Def. 4.6 joint density and cumulative distribution p.165 (PDF p.173), sha256:763eab9894983ddfd6cd7f84685548d1515a9326a2d9fd015474534460551a5e — https://math.dartmouth.edu/~prob/prob/prob.pdf"
    - "SOA, Tables for Exam C (Fall 2009), A.3.3.1 Exponential, PDF p.11, sha256:cefc3286baa0150b6520455e76104589f1187622212efe05a600926d0bf14e0f — https://www.soa.org/globalassets/assets/files/edu/edu-2009-fall-exam-c-table.pdf"
    - "SOA, Probability Exam (Exam P) syllabus, November 2026, p.1 (calculus including series, differentiation and integration is assumed), sha256:bed27462961aa988fc66c90fefa34af47ea324e2ab9109889c4e4f8f78d97397 — https://www.soa.org/globalassets/assets/files/edu/2026/fall/syllabi/2026-11-exam-p-syllabus.pdf"
  open_findings: 4
  open_critical: 0
  log: .verify/Concepts/Calculus.md
---

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
| $\ln(1+x)$ | $\displaystyle\sum_{n=1}^{\infty} \frac{(-1)^{n+1}x^n}{n}, \quad \lvert x \rvert \leq 1$ |
| $(1+x)^k$ | $\displaystyle\sum_{n=0}^{\infty} \binom{k}{n} x^n, \quad \lvert x \rvert < 1$ |

> [!example]- Geometric Series: Present Value of a Perpetuity {Example}
> An annuity pays \$$1$ at the end of each year forever at effective annual rate $i$. Find the present value.
>
> > [!answer]-
> > Let $v = \dfrac{1}{1+i}$. The present value is:
> > $$PV = v + v^2 + v^3 + \cdots = \sum_{k=1}^{\infty} v^k = \frac{v}{1-v} = \frac{1}{i}$$
