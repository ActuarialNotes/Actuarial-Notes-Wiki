---
verification:
  status: verified
  confidence: high
  last_checked: 2026-09-27
  last_checked_by: agent:validate-v1
  content_hash: sha256:026219c9c407ec4dd8a18e978ee2d0d0f84dff171af19521e3dfd3ba590c584e
  sources:
    - "Grinstead & Snell, Introduction to Probability (2nd rev. ed., 2006 GNU FDL version), Definition 2.1 density: P(a <= X <= b) = integral of f from a to b for all a, b (PDF p.67), sha256:763eab9894983ddfd6cd7f84685548d1515a9326a2d9fd015474534460551a5e — https://math.dartmouth.edu/~prob/prob/prob.pdf"
    - "MIT OCW 18.05 (Orloff & Bloom, Spring 2022), Reading 5b: Continuous Random Variables, definition of a continuous random variable (PDF p.2), pdf values greater than 1 (PDF p.4), sha256:3b4e14112eca532d9d03de273fdc40d27e6cf241681aabf012a49837640c2e5b — https://ocw.mit.edu/courses/18-05-introduction-to-probability-and-statistics-spring-2022/mit18_05_s22_class05-prep-b.pdf"
    - "Pishro-Nik, Introduction to Probability, Statistics, and Random Processes (probabilitycourse.com, HTML fetched 2026-09-27), §4.1.1 Probability Density Function (f_X >= 0; integral over the line = 1), sha256:77567b0ea0bf96cec488fc7ecd8efb3256cfe1bd35dc9d9e8178f6eaeaf80803 — https://www.probabilitycourse.com/chapter4/4_1_1_pdf.php"
    - "SOA Probability Exam syllabus, November 2026, Topic 2 learning outcomes a, e, f and Topic 3 learning outcomes a-e, g (PDF p.3), sha256:bed27462961aa988fc66c90fefa34af47ea324e2ab9109889c4e4f8f78d97397 — https://www.soa.org/globalassets/assets/files/edu/2026/fall/syllabi/2026-11-exam-p-syllabus.pdf"
  open_findings: 0
  open_critical: 0
  log: .verify/Concepts/Probability Density Function (PDF).md
---

A **Probability Density Function (PDF)** $f(x)$ describes how the probability of a [[Continuous Random Variable|continuous random variable]] $X$ is spread along the line. The probability that $X$ falls in an interval $[a, b]$ is the area under $f$ over that interval.

> $$P(a \leq X \leq b) = \int_a^b f(x)\, dx$$

- The PDF must satisfy $f(x) \geq 0$ and $\int_{-\infty}^{\infty} f(x)\, dx = 1$
- $P(X = x) = 0$ for any single point, so including or excluding an endpoint changes nothing.
- The PDF is the derivative of the [[Cumulative Distribution Function (CDF)|CDF]], $f(x) = F'(x)$.
- Compared with a [[Probability Mass Function (PMF)|PMF]]: a PMF value is a probability, but a PDF value is a probability per unit of $x$.

> [!idea] The idea
> A density is like the thickness of a layer of sand spread along the line. The amount of sand over an interval is the probability, so you measure it by area, not by height. A tall, narrow pile and a low, wide one can hold the same amount.

![[Media/Figures/Probability_Density_Function_PDF.svg|340]]

## Finding the constant

A claim size $X$, in thousands, has density $f(x) = c\,x(3 - x)$ for $0 < x < 3$. The shape is fixed, but the height is set by $c$. Which $c$ makes this a density?

The total area must be 1.

> $$
> \begin{align*}
> 1 &= \int_0^3 c\,x(3 - x)\,dx \\
>   &= c\left[\tfrac{3x^2}{2} - \tfrac{x^3}{3}\right]_0^3 \\
>   &= 4.5c
> \end{align*}
> $$

So $c = 2/9$, and $f(x) = \tfrac{2}{9}x(3 - x)$.

## Probability is area, not height

How likely is a claim of at most 1? That is the area under $f$ from 0 to 1.

> $$P(X \le 1) = \int_0^1 \tfrac{2}{9}x(3 - x)\,dx = \tfrac{7}{27} \approx 0.259$$

| $x$ | 0.5 | 1 | 1.5 | 2 | 2.5 |
|---|---|---|---|---|---|
| $f(x)$ | 0.278 | 0.444 | 0.5 | 0.444 | 0.278 |

- The density peaks at $x = 1.5$, so claims near 1.5 are the most likely. That peak is the [[Mode|mode]].
- The height 0.5 is not the probability of a claim of 1.5. That probability is 0.
- For a short interval of length $h$, $P(x < X < x + h) \approx f(x)\,h$. A claim between 1.5 and 1.6 has probability about $0.5 \times 0.1 = 0.05$.
- The density is symmetric about 1.5, so the mean is 1.5 too.

## Units change the height

Measure the same claims in tens of thousands instead, $Y = X/10$. The claims now lie on $(0, 0.3)$, and the same total area of 1 must fit on an interval one-tenth as wide.

> $$f_Y(y) = 10\,f_X(10y)$$

- The peak becomes $10 \times 0.5 = 5$. A density can exceed 1, as a uniform on $(0, 0.5)$ has density 2.
- Every probability is unchanged. $P(Y \le 0.1)$ is still $7/27$, because it is the same event as $X \le 1$.

> [!trap] Reading the height as a probability
> A density of 5 does not mean "probability 5". It means about $5h$ of probability in a short interval of length $h$. Only an area under $f$ is a probability.

## The density and the CDF

The [[Cumulative Distribution Function (CDF)|CDF]] adds up the area to the left of $x$, and the density is its slope.

> $$F(x) = \int_{-\infty}^{x} f(t)\,dt$$

- For the claim size, $F(x) = \frac{x^2}{3} - \frac{2x^3}{27}$ on $[0, 3]$. Then $F(1) = 7/27$, matching the area above, and $F(3) = 1$.
- When a question gives the CDF, differentiate it to get the density. When it gives the density, integrate it to get the CDF.
- A density can be defined in pieces. Integrate each piece over its own range and add the areas.

## Try it

> [!example]- Probability from a Polynomial PDF {Example}
> A loss ratio $X$ has density $f(x) = 3x^2$ for $0 \leq x \leq 1$. What is $P(X > 0.5)$?
>
> > [!answer]-
> > **Plan:** integrate the density over the event's interval.
> > $$
> > \begin{align*}
> > P(X > 0.5) &= \int_{0.5}^{1} 3x^2\, dx \\
> >            &= \left[ x^3 \right]_{0.5}^{1} \\
> >            &= 1 - 0.125 \\
> >            &= 0.875
> > \end{align*}
> > $$
> > Why so high? The density rises steeply, so most of its area sits near 1.

> [!example]- A density in two pieces {Example}
> The time to settle a claim, in years, has density $f(t) = c\,t$ for $0 < t \le 1$ and $f(t) = c$ for $1 < t \le 2$. Find $c$ and the probability that a claim takes more than 1.5 years.
>
> > [!answer]-
> > **Plan:** add the area of each piece to find $c$, then integrate only the piece the event touches.
> > $$
> > \begin{align*}
> > 1 &= \int_0^1 c\,t\,dt + \int_1^2 c\,dt \\
> >   &= \tfrac{c}{2} + c \\
> >   &= 1.5c
> > \end{align*}
> > $$
> > So $c = 2/3$.
> > $$
> > \begin{align*}
> > P(T > 1.5) &= \int_{1.5}^{2} \tfrac{2}{3}\,dt \\
> >            &= \tfrac{1}{3}
> > \end{align*}
> > $$

> [!example]- From a CDF to a density {Example}
> A loss $X$ has CDF $F(x) = 1 - (1 + x)e^{-x}$ for $x \ge 0$. Find its density and the most likely loss.
>
> > [!answer]-
> > **Plan:** differentiate the CDF, then find where the density peaks.
> > $$
> > \begin{align*}
> > f(x) &= -e^{-x} + (1 + x)e^{-x} \\
> >      &= x\,e^{-x}
> > \end{align*}
> > $$
> > The derivative of $x e^{-x}$ is $(1 - x)e^{-x}$, which is zero at $x = 1$. The mode is 1, where the density is $e^{-1} \approx 0.368$.
> >
> > This is the gamma density with $\alpha = 2$ and $\theta = 1$.

> [!warning]- Exam traps
> - **Height for probability.** $f(x)$ is a rate and can exceed 1. Integrate it over an interval to get a probability.
> - **Forgetting the support.** A density is zero outside its stated range. Integrating a formula past its range overstates the area.
> - **Skipping the constant.** When the density has an unknown $c$, solve for it before computing anything else. Every later answer scales with it.
> - **One piece only.** For a piecewise density, an interval that crosses a break needs both pieces' areas.
