---
verification:
  status: verified
  confidence: high
  last_checked: 2026-09-28
  last_checked_by: agent:validate-v1
  content_hash: sha256:efffeca9debe227fc0c7cf0e8406f69ba5e75dc989f5b2d8579bfee833ca933e
  sources:
    - "MIT OCW 18.05 (Orloff & Bloom, Spring 2022), Reading 5b: Continuous Random Variables, definition of a continuous random variable (PDF p.2), pdf values greater than 1 (PDF p.4), sha256:3b4e14112eca532d9d03de273fdc40d27e6cf241681aabf012a49837640c2e5b — https://ocw.mit.edu/courses/18-05-introduction-to-probability-and-statistics-spring-2022/mit18_05_s22_class05-prep-b.pdf"
    - "Grinstead & Snell, Introduction to Probability (2nd rev. ed., 2006 GNU FDL version), Definition 2.1 density (PDF p.67), Definition 2.2 and Theorem 2.1 F = integral of f, F' = f (PDF p.69), continuous uniform density 1/(b-a) (PDF p.213), Theorem 6.11 E(phi(X)) (PDF p.278), Example 7.5 and §10.3 sum of independent normals is normal (PDF pp.302, 404), sha256:763eab9894983ddfd6cd7f84685548d1515a9326a2d9fd015474534460551a5e — https://math.dartmouth.edu/~prob/prob/prob.pdf"
    - "Pishro-Nik, Introduction to Probability, Statistics, and Random Processes (probabilitycourse.com, HTML fetched 2026-09-27), §4.1.4 solved problem: for positive continuous X, EX = integral from 0 to infinity of P(X >= x) dx, sha256:70210592fcfc9a64d4c73bce7631b23df5f9f8d8d918b5f8bb004c23d61e7ebf — https://www.probabilitycourse.com/chapter4/4_1_4_solved4_1.php"
    - "Pishro-Nik, Introduction to Probability, Statistics, and Random Processes (probabilitycourse.com, HTML fetched 2026-09-27), §4.3.1 Mixed Random Variables (neither discrete nor continuous), sha256:7ecb17fdb2f5962b0bb95a80845ebef502c08988f765e647d4cf08e56894b640 — https://www.probabilitycourse.com/chapter4/4_3_1_mixed.php"
    - "Anderson & Brown, Risk and Insurance (SOA study note P-21-05, 2005), Deductibles (PDF p.7), Benefit Limits (PDF p.8), Inflation (PDF p.9), sha256:1cb44e7f9ee240a9a0597a89dbf3a055ab70d07a8739132c75440051ee655922 — https://www.soa.org/globalassets/assets/files/edu/P-21-05.pdf"
    - "SOA Probability Exam syllabus, November 2026, Topic 2 learning outcomes a, e, f and Topic 3 learning outcomes a-e, g (PDF p.3), sha256:bed27462961aa988fc66c90fefa34af47ea324e2ab9109889c4e4f8f78d97397 — https://www.soa.org/globalassets/assets/files/edu/2026/fall/syllabi/2026-11-exam-p-syllabus.pdf"
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
