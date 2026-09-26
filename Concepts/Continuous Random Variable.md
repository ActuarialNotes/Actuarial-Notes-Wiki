---
verification:
  status: unverified
  confidence: null
  last_checked: null
  last_checked_by: null
  content_hash: sha256:efffeca9debe227fc0c7cf0e8406f69ba5e75dc989f5b2d8579bfee833ca933e
  sources: []
  open_findings: 0
  open_critical: 0
  log: .verify/Concepts/Continuous Random Variable.md
---

A **Continuous Random Variable** $X$ is a [[Random Variable]] whose [[Cumulative Distribution Function (CDF)|CDF]] $F(x)$ is the integral of a [[Probability Density Function (PDF)|density]] $f(x)$, so that probability is area under $f$ and every single value has probability zero.

> $$F(x) = P(X \le x) = \int_{-\infty}^{x} f(t)\,dt$$

> $$f(x) = F'(x)$$

- A valid density has $f(x) \ge 0$ and $\int_{-\infty}^{\infty} f(x)\,dx = 1$. It is a *rate*, not a probability, so it can exceed 1: $\text{Uniform}(0, 0.5)$ has $f(x) = 2$. The named families are in [[Continuous Univariate Distributions]].
- $P(X = c) = 0$ for every $c$, so $P(a < X < b) = P(a \le X \le b) = F(b) - F(a)$. Strict and weak inequalities give the same answer — unlike a [[Discrete Random Variable]].
- Expectations replace sums with integrals: $E[g(X)] = \int g(x)\,f(x)\,dx$ (see [[Expected Value]] and [[Moment]]). For $X \ge 0$ the survival shortcut $E[X] = \int_0^\infty [1 - F(x)]\,dx$ often avoids integration by parts.
- With two or more continuous variables the same calculations run on a [[Joint Probability Density Function]]: probabilities, marginals and moments become double integrals, and the work is setting up the [[Region of Integration]].
- A linear combination of independent *normal* variables is exactly normal — the continuous case Exam P singles out in [[Probabilities for Linear Combinations]].
- Insurance payments are often **mixed**. A continuous loss passed through a [[Deductible]] or a [[Benefit Limit|limit]] produces a [[Payment Random Variable|payment]] with a point mass at 0 or at the limit, which is neither purely discrete nor purely continuous.

> [!example]- Normalising a Claim-Size Density {Example}
> A claim size $X$ (in \$000s) has density $f(x) = c(10 - x)$ for $0 < x < 10$. Find $c$, $P(X > 4)$ and $E[X]$.
>
> > [!answer]-
> > The density must integrate to 1:
> > $$
> > \begin{align*}
> > 1 &= \int_0^{10} c(10 - x)\,dx \\
> >   &= c\left[10x - \tfrac{x^2}{2}\right]_0^{10} \\
> >   &= 50c
> > \end{align*}
> > $$
> > so $c = 0.02$. Then
> > $$
> > \begin{align*}
> > P(X > 4) &= \int_4^{10} 0.02(10 - x)\,dx \\
> >          &= 0.02\left[10x - \tfrac{x^2}{2}\right]_4^{10} \\
> >          &= 0.02(50 - 32) \\
> >          &= 0.36
> > \end{align*}
> > $$
> > $$
> > \begin{align*}
> > E[X] &= \int_0^{10} 0.02\,x(10 - x)\,dx \\
> >      &= 0.02\left[5x^2 - \tfrac{x^3}{3}\right]_0^{10} \\
> >      &= 0.02(500 - 333.33) \\
> >      &= 3.33
> > \end{align*}
> > $$
> > The mean claim is about \$3,333 and 36% of claims exceed \$4,000. $P(X \ge 4)$ is the same $0.36$ — the endpoint carries no probability.

> [!example]- A Deductible Creates a Point Mass {Example}
> A loss $X$ is uniform on $(0, 1{,}000)$. The policy pays $Y = \max(X - 200,\ 0)$. Find $P(Y = 0)$, $P(Y \le 300)$ and $E[Y]$, and decide whether $Y$ is continuous.
>
> > [!answer]-
> > The policy pays nothing whenever the loss is below the deductible:
> > $$
> > \begin{align*}
> > P(Y = 0) &= P(X \le 200) \\
> >          &= 0.2
> > \end{align*}
> > $$
> > A single value carries probability $0.2$, so **$Y$ is not continuous**. It is mixed: a mass of $0.2$ at zero plus a density of $\tfrac{1}{1{,}000}$ on $(0, 800)$.
> > $$
> > \begin{align*}
> > P(Y \le 300) &= P(X \le 500) \\
> >              &= 0.5
> > \end{align*}
> > $$
> > $$
> > \begin{align*}
> > E[Y] &= \int_{200}^{1{,}000} (x - 200)\,\frac{1}{1{,}000}\,dx \\
> >      &= \frac{800^2/2}{1{,}000} \\
> >      &= 320
> > \end{align*}
> > $$
> > The expected payment per loss is \$320. Integrating a density alone would miss the 20% of probability sitting at zero — which is why exam questions ask for $P(Y = 0)$ separately.
