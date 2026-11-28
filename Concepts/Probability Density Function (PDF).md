---
verification:
  status: verified
  confidence: high
  last_checked: 2026-11-28
  last_checked_by: agent:validate-v1
  content_hash: sha256:6aa0e779710590b8436f96f633631ab0e5c3c06e0b28123be18cc571e9e7f258
  sources:
    - "https://math.dartmouth.edu/~prob/prob/prob.pdf, Ex. 2.12 (PDF p.68): P([a,b]) = integral of f over [a,b]; f(x) is not a probability, sha256:763eab9894983ddfd6cd7f84685548d1515a9326a2d9fd015474534460551a5e"
    - "https://ocw.mit.edu/courses/18-05-introduction-to-probability-and-statistics-spring-2022/mit18_05_s22_class05-prep-b.pdf, Reading 5b, definition of a continuous random variable and pdf properties (PDF p.2), sha256:3b4e14112eca532d9d03de273fdc40d27e6cf241681aabf012a49837640c2e5b"
    - "https://www.probabilitycourse.com/chapter4/4_1_1_pdf.php, 4.1.1 PDF: definition as F'(x); P(a<X<=b)=integral; f>=0; integral=1; P(x<X<=x+d) approx f(x) d, sha256:ca7a69b5758983d339d4c2f5cc12f4046ae40be69410512baa75663c329131fa"
    - "https://www.probabilitycourse.com/chapter4/4_1_0_continuous_random_vars_distributions.php, 4.1.0: P(X=x)=0 for continuous; CDF has no jumps, sha256:de17b3d54581cbed5640f776590c1b7a328c09298b6f9c9b745f66eec958857d"
    - "https://www.soa.org/globalassets/assets/files/edu/2026/fall/syllabi/2026-11-exam-p-syllabus.pdf, Topic 2 learning outcomes a)-f) (PDF p.3), sha256:bed27462961aa988fc66c90fefa34af47ea324e2ab9109889c4e4f8f78d97397"
  open_findings: 0
  open_critical: 0
  log: .verify/Concepts/Probability Density Function (PDF).md
---

![[Media/Figures/Probability_Density_Function_PDF.svg|340]]

A **Probability Density Function (PDF)** is a function $f(x)$ that describes how the [[Probability|probability]] of a [[Continuous Random Variable|continuous random variable]] $X$ is spread along the real line. The probability that $X$ falls between $a$ and $b$ is the area under $f$ over that interval:

> $$P(a \leq X \leq b) = \int_a^b f(x)\,dx$$

A single value has probability $P(X = x) = 0$, so including or excluding an endpoint changes nothing.

> [!example]- A loss ratio $X$ has density $f(x) = 3x^2$ for $0 \leq x \leq 1$. What is $P(X > 0.5)$? {Example}
> - The density is 0 above 1, so the area runs from 0.5 to the end of the support, 1.
> - The probability is the integral of the density over that interval:
>
> $$
> \begin{aligned}
> P(X > 0.5) &= \int_{0.5}^{1} 3x^2\,dx \\
> &= 1 - 0.125 \\
> &= 0.875
> \end{aligned}
> $$

## Requirements of a density

A function $f$ is a density when $f(x) \geq 0$ for every $x$ and the total area under it is

> $$\int_{-\infty}^{\infty} f(x)\,dx = 1$$

- $f(x) = 0$ outside the support of $X$, the set of values $X$ can take, so the integral runs over the support only.

A density given up to a constant, $f(x) = c\,g(x)$, is completed by solving this equation for $c$.

> [!example]- A claim size $X$, in thousands, has density $f(x) = c\,x(3 - x)$ for $0 < x < 3$. What is $c$, and what is $P(X \leq 1)$? {Example}
> - The total area must be 1:
>
> $$
> \begin{aligned}
> 1 &= \int_0^3 c\,x(3 - x)\,dx \\
> &= c\left[\frac{3x^2}{2} - \frac{x^3}{3}\right]_0^3 \\
> &= 4.5c
> \end{aligned}
> $$
>
> - So $c = \frac{2}{9}$.
> - The probability is the area from 0 to 1:
>
> $$
> \begin{aligned}
> P(X \leq 1) &= \int_0^1 \tfrac{2}{9}x(3 - x)\,dx \\
> &= \tfrac{2}{9}\left(\tfrac{3}{2} - \tfrac{1}{3}\right) \\
> &= \tfrac{7}{27} \approx 0.259
> \end{aligned}
> $$

## Densities defined in pieces

When a density is defined by one formula $f_1$ below a break $c$ and another $f_2$ above it, the probability of an interval that crosses the break is

> $$P(a \leq X \leq b) = \int_a^c f_1(x)\,dx + \int_c^b f_2(x)\,dx$$

- $a < c < b$.

> [!example]- The time $X$ to settle a claim, in years, has density $f(x) = \frac{2}{3}x$ for $0 < x \leq 1$ and $f(x) = \frac{2}{3}$ for $1 < x \leq 2$. What is $P(0.5 < X < 1.5)$? {Example}
> - The interval crosses the break at 1, so it takes an area from each piece.
> - Below the break, the area is $\frac{1}{3}(1 - 0.25) = 0.25$, from $\int_{0.5}^{1} \frac{2}{3}x\,dx$.
> - Above the break, $\int_{1}^{1.5} \frac{2}{3}\,dx = \frac{1}{3}$.
> - The probability is $0.25 + \frac{1}{3} = \frac{7}{12} \approx 0.583$.

## The density and the CDF

The density is the slope of the [[Cumulative Distribution Function (CDF)|cumulative distribution function]] $F(x)$:

> $$f(x) = F'(x)$$

When a question gives the CDF, differentiate it to get the density.

> [!example]- A loss $X$ has CDF $F(x) = 1 - (1 + x)e^{-x}$ for $x \geq 0$. What is its density? {Example}
> - Differentiating with the product rule gives $f(x) = -e^{-x} + (1 + x)e^{-x}$.
> - The density is $f(x) = x\,e^{-x}$ for $x \geq 0$.

> [!trap] Reading the height as a probability
> A density is a probability per unit of $x$, so it can exceed 1: a uniform density on $(0, 0.5)$ is 2. Over a short interval of length $h$, $P(x < X < x + h) \approx f(x)\,h$. Only an area under $f$ is a probability.
