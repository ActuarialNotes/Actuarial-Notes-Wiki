---
verification:
  status: verified
  confidence: high
  last_checked: 2026-11-06
  last_checked_by: agent:validate-v1
  content_hash: sha256:b2ee0ea1dcd9d3e7e2eca8a9c6fc00310f8a0e3d9a3e1f503eb508cff395a75d
  sources:
    - "MIT OCW 18.05 (Orloff & Bloom, Spring 2022), Reading 5b, Definition of a continuous random variable by a pdf (PDF p.2), sha256:3b4e14112eca532d9d03de273fdc40d27e6cf241681aabf012a49837640c2e5b — https://ocw.mit.edu/courses/18-05-introduction-to-probability-and-statistics-spring-2022/mit18_05_s22_class05-prep-b.pdf"
    - "Pishro-Nik, Introduction to Probability, Statistics, and Random Processes (probabilitycourse.com, fetched 2026-11-06), §4.1.0: continuous CDF has no jumps; P(X=x)=0; < and <= agree, sha256:c2345faca7920d0c2971d4cc039c129b803ecb6d3f121ea89683da5cab5ece5b — https://www.probabilitycourse.com/chapter4/4_1_0_continuous_random_vars_distributions.php"
    - "Pishro-Nik, Introduction to Probability, Statistics, and Random Processes (probabilitycourse.com, fetched 2026-11-06), §4.1.1 PDF: f=F' where differentiable; probability per unit length; P(x<X<=x+d)~f(x)d; F=int f; int f=1, sha256:02e4d8947edff66799161896805adc05409f35f8774c1c912f5c5102b47cb3fd — https://www.probabilitycourse.com/chapter4/4_1_1_pdf.php"
    - "Grinstead & Snell, Introduction to Probability (2nd rev. ed., GNU FDL version), §2.2 p.60 (PDF p.68): f(x) is not the probability of x; f(3/4)=3/2 > 1 cannot be a probability, sha256:763eab9894983ddfd6cd7f84685548d1515a9326a2d9fd015474534460551a5e — https://math.dartmouth.edu/~prob/prob/prob.pdf"
    - "Siegrist, Probability, Mathematical Statistics, and Stochastic Processes (randomservices.org, fetched 2026-11-06), 4.1 Expected value: definitions (discrete, continuous, mixed), may not exist, change of variables, increasing property P(X<=Y)=1, symmetry -> E(X)=a, independence E(XY)=E(X)E(Y), E(X|A) via conditional density, sha256:3228c869ff2a03804690236fc072d1cf7bd9b040855c67156791b50e7d3cfba9 — https://www.randomservices.org/random/expect/Properties.html"
    - "Siegrist, Probability, Mathematical Statistics, and Stochastic Processes (randomservices.org, fetched 2026-11-06), 4.9 Expected value as an integral: E(X)=int_0^inf P(X>x)dx for X>=0; E(X)=sum_{k>=1} P(X>=k) on N; E(X;A)=E(X 1_A), sha256:13db7b0f6f791843abcef65cf16e1214b8e745e3f9eeac74e01cc96fa3a032bc — https://www.randomservices.org/random/expect/Integral.html"
    - "Pishro-Nik, Introduction to Probability, Statistics, and Random Processes (probabilitycourse.com, fetched 2026-11-06), §4.3.1 Mixed random variables: neither discrete nor continuous; jump = P(Y=y); int c + sum P(Y=y_k)=1; EY = int y c(y) dy + sum y_k P(Y=y_k), sha256:2abab6d01f448078588fa3991835c49223be0e6c433904a165147ddf6a2dd0d7 — https://www.probabilitycourse.com/chapter4/4_3_1_mixed.php"
    - "Siegrist, Probability, Mathematical Statistics, and Stochastic Processes (randomservices.org, fetched 2026-11-06), 4.6 Generating functions: M^(n)(0)=E(X^n) when M finite on an open interval about 0; Pareto E(X^n)=inf for n>=a, M(t)=inf for t>0; lognormal has all moments but infinite MGF; odd standard normal moments 0; sum of independent normals normal, sha256:40fa48baaa2d9caa1ce28569da70af31c2cf65cd86f0fe091974481ad6a2b625 — https://www.randomservices.org/random/expect/Generating.html"
    - "SOA, Exam P syllabus, November 2026, Topic 3 Multivariate Random Variables, LOs a)-i), incl. g) linear combinations of independent discrete and of normal random variables (PDF p.4), sha256:bed27462961aa988fc66c90fefa34af47ea324e2ab9109889c4e4f8f78d97397 — https://www.soa.org/globalassets/assets/files/edu/2026/fall/syllabi/2026-11-exam-p-syllabus.pdf"
  open_findings: 0
  open_critical: 0
  log: .verify/Concepts/Continuous Random Variable.md
---

A **Continuous Random Variable** $X$ is a [[Random Variable]] whose [[Cumulative Distribution Function (CDF)|CDF]] $F(x)$ is the integral of a [[Probability Density Function (PDF)|density]] $f(x)$, so that probability is area under $f$ and every single value has probability zero.

> $$F(x) = P(X \le x) = \int_{-\infty}^{x} f(t)\,dt$$

> $$f(x) = F'(x)$$

- A valid density has $f(x) \ge 0$ and $\int_{-\infty}^{\infty} f(x)\,dx = 1$.
- $P(X = c) = 0$ for every $c$, so $P(a < X < b) = P(a \le X \le b) = F(b) - F(a)$. Strict and weak inequalities give the same answer, unlike a [[Discrete Random Variable]].
- The named families, such as the uniform, exponential and normal, are in [[Continuous Univariate Distributions]].

> [!idea] The idea
> A loss can be any amount, so no single amount can carry a lump of probability. A continuous random variable spreads its probability thinly along the line. Probability then comes only from intervals, as the area under the density over the interval.

## Probability is area

A claim size $X$, in thousands, has density $f(x) = x/8$ for $0 < x < 4$. Larger claims are more likely than small ones, up to the maximum of 4.

The CDF adds up the area to the left of $x$.

> $$F(x) = \int_0^x \frac{t}{8}\,dt = \frac{x^2}{16}, \quad 0 \le x \le 4$$

| $x$ | 1 | 2 | 3 | 4 |
|---|---|---|---|---|
| $F(x)$ | 0.0625 | 0.25 | 0.5625 | 1 |

- The probability of a claim between 1 and 3 is $F(3) - F(1) = 0.5625 - 0.0625 = 0.5$.
- $P(1 \le X \le 3)$ is the same 0.5. The endpoints are single values, and single values carry no area.

## The density is a rate

The density is a *rate*, not a probability. It says how much probability lies near $x$ per unit of $x$.

- For a short interval of length $h$, $P(x < X < x + h) \approx f(x)\,h$. Near $x = 2$, a claim within 0.1 of it has probability about $0.25 \times 0.1 = 0.025$.
- Because it is a rate, a density can exceed 1: $\text{Uniform}(0, 0.5)$ has $f(x) = 2$.
- Going the other way, the density is the slope of the CDF. Differentiating $F(x) = x^2/16$ gives back $f(x) = x/8$.

## Means are integrals

Expectations replace sums with integrals: $E[g(X)] = \int g(x)\,f(x)\,dx$ (see [[Expected Value]] and [[Moment]]). For the claim size:

> $$
> \begin{align*}
> E[X] &= \int_0^4 x \cdot \frac{x}{8}\,dx \\
>      &= \frac{64}{24} \\
>      &\approx 2.667
> \end{align*}
> $$

For $X \ge 0$ the survival shortcut $E[X] = \int_0^\infty [1 - F(x)]\,dx$ often avoids integration by parts. Here it gives $\int_0^4 \left(1 - \frac{x^2}{16}\right) dx = 4 - \frac{4}{3} \approx 2.667$, the same mean.

## When a payment is not continuous

Insurance payments are often **mixed**. A continuous loss passed through a [[Deductible]] or a [[Benefit Limit|limit]] produces a [[Payment Random Variable|payment]] with a point mass at 0 or at the limit, which is neither purely discrete nor purely continuous.

- With a deductible of 1 on the claim above, the payment $Y = (X - 1)_+$ is 0 whenever $X \le 1$. So $P(Y = 0) = F(1) = 0.0625$.
- A single value carries probability, so $Y$ is not continuous. Its mean needs the mass and the integral together. See [[Random Variable]].

> [!trap] A density alone misses the mass
> Writing $Y$'s density as $f(x+1)$ and integrating from 0 accounts for only $1 - 0.0625$ of the probability. The rest sits at $Y = 0$. Ask for $P(Y = 0)$ separately whenever a payment has a deductible or a limit.

## Two or more continuous variables

With two or more continuous variables, the same calculations run on a [[Joint Probability Density Function]].

- Probabilities, marginals and moments become double integrals. The work is setting up the [[Region of Integration]].
- A linear combination of independent *normal* variables is exactly normal. Exam P singles this case out in [[Probabilities for Linear Combinations]].

## Try it

> [!example]- Normalising a Claim-Size Density {Example}
> A claim size $X$ (in \$000s) has density $f(x) = c(10 - x)$ for $0 < x < 10$. Find $c$, $P(X > 4)$ and $E[X]$.
>
> > [!answer]-
> > **Plan:** use the total area of 1 to find $c$, then integrate over the interval and integrate $x f(x)$.
> >
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
> > The mean claim is about \$3,333 and 36% of claims exceed \$4,000. $P(X \ge 4)$ is the same $0.36$, because the endpoint carries no probability.

> [!example]- A Deductible Creates a Point Mass {Example}
> A loss $X$ is uniform on $(0, 1{,}000)$. The policy pays $Y = \max(X - 200,\ 0)$. Find $P(Y = 0)$, $P(Y \le 300)$ and $E[Y]$, and decide whether $Y$ is continuous.
>
> > [!answer]-
> > **Plan:** translate each event about $Y$ into an event about $X$, then integrate the payment over the losses that produce one.
> >
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
> > The expected payment per loss is \$320. The mass at zero adds nothing to the mean, but it holds 20% of the probability. That is why exam questions ask for $P(Y = 0)$ separately.

> [!warning]- Exam traps
> - **Treating a density value as a probability.** $f(x)$ can exceed 1. Only an area under $f$ is a probability.
> - **Worrying about endpoints.** For a continuous variable, $<$ and $\le$ give the same answer. Carry that habit to a discrete or mixed variable and it fails.
> - **Calling a payment continuous.** A deductible or a limit puts a point mass on a continuous loss. Check $P(Y = 0)$ and $P(Y = u)$ before integrating.
> - **Forgetting the limits of the density.** Integrate only over the range where $f(x) > 0$. Integrating $x/8$ past 4 gives an area greater than 1.
