---
verification:
  status: stale
  confidence: null
  last_checked: 2026-11-06
  last_checked_by: agent:validate-v1
  content_hash: sha256:6aa0e779710590b8436f96f633631ab0e5c3c06e0b28123be18cc571e9e7f258
  sources:
    - "MIT OCW 18.05 (Orloff & Bloom, Spring 2022), Reading 5b, Definition of a continuous random variable by a pdf (PDF p.2), sha256:3b4e14112eca532d9d03de273fdc40d27e6cf241681aabf012a49837640c2e5b — https://ocw.mit.edu/courses/18-05-introduction-to-probability-and-statistics-spring-2022/mit18_05_s22_class05-prep-b.pdf"
    - "Pishro-Nik, Introduction to Probability, Statistics, and Random Processes (probabilitycourse.com, fetched 2026-11-06), §4.1.1 PDF: f=F' where differentiable; probability per unit length; P(x<X<=x+d)~f(x)d; F=int f; int f=1, sha256:02e4d8947edff66799161896805adc05409f35f8774c1c912f5c5102b47cb3fd — https://www.probabilitycourse.com/chapter4/4_1_1_pdf.php"
    - "Pishro-Nik, Introduction to Probability, Statistics, and Random Processes (probabilitycourse.com, fetched 2026-11-06), §4.1.0: continuous CDF has no jumps; P(X=x)=0; < and <= agree, sha256:c2345faca7920d0c2971d4cc039c129b803ecb6d3f121ea89683da5cab5ece5b — https://www.probabilitycourse.com/chapter4/4_1_0_continuous_random_vars_distributions.php"
    - "Grinstead & Snell, Introduction to Probability (2nd rev. ed., GNU FDL version), §2.2 p.60 (PDF p.68): f(x) is not the probability of x; f(3/4)=3/2 > 1 cannot be a probability, sha256:763eab9894983ddfd6cd7f84685548d1515a9326a2d9fd015474534460551a5e — https://math.dartmouth.edu/~prob/prob/prob.pdf"
    - "Siegrist, Probability, Mathematical Statistics, and Stochastic Processes (randomservices.org, fetched 2026-11-06), 2.4 Continuous distributions: mode = value maximizing the density, sha256:a6b8f96ad2620d57282798c6fc697c4a604cbd64cdd2407b61e97864aeccc4df — https://www.randomservices.org/random/dist/Continuous.html"
    - "Siegrist, Probability, Mathematical Statistics, and Stochastic Processes (randomservices.org, fetched 2026-11-06), 3.7 Transformations: density of a + bX is f((y-a)/b)/|b|, sha256:827bba81a7f85933f2ba982a09155f5277f5ec19838e2ffe70ac0563a56aca69 — https://www.randomservices.org/random/dist/Transformations.html"
    - "Siegrist, Probability, Mathematical Statistics, and Stochastic Processes (randomservices.org, fetched 2026-11-06), 4.1 Expected value: definitions (discrete, continuous, mixed), may not exist, change of variables, increasing property P(X<=Y)=1, symmetry -> E(X)=a, independence E(XY)=E(X)E(Y), E(X|A) via conditional density, sha256:3228c869ff2a03804690236fc072d1cf7bd9b040855c67156791b50e7d3cfba9 — https://www.randomservices.org/random/expect/Properties.html"
    - "SOA Exam C tables (Loss Models 3rd ed. Appendix A excerpts), A.2.3.1 Pareto (E[X^k] for -1<k<alpha, no M(t)) PDF p.8; A.3.2.1 Gamma (M(t)=(1-theta t)^-alpha, t<1/theta; E[X^k]) PDF p.9; A.3.3.1 Exponential (M(t), E[X^k]=theta^k k!, E[X^x]=theta(1-e^{-x/theta})) and A.5.1.1 Lognormal (E[X^k]=exp(k mu + k^2 sigma^2/2), no M(t)) PDF p.11, sha256:cefc3286baa0150b6520455e76104589f1187622212efe05a600926d0bf14e0f — https://www.soa.org/globalassets/assets/files/edu/edu-2009-fall-exam-c-table.pdf"
    - "SOA, Exam P syllabus, November 2026, Topic 2 Univariate Random Variables, LOs a)-f) (PDF p.3), sha256:bed27462961aa988fc66c90fefa34af47ea324e2ab9109889c4e4f8f78d97397 — https://www.soa.org/globalassets/assets/files/edu/2026/fall/syllabi/2026-11-exam-p-syllabus.pdf"
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
