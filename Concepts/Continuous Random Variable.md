---
verification:
  status: stale
  confidence: null
  last_checked: 2026-11-06
  last_checked_by: agent:validate-v1
  content_hash: sha256:10dd4e77092326377ae0685cf0d55bd535187c99684edd62104d786b3134ea9e
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

A **Continuous Random Variable** is a [[Random Variable|random variable]] whose probabilities are areas under a density function. The probability that a continuous random variable $X$ lies between $a$ and $b$ is

> $$P(a \le X \le b) = \int_a^b f(x)\,dx$$

- $f(x)$ is the [[Probability Density Function (PDF)|probability density function]] of $X$, with $f(x) \ge 0$ and $\int_{-\infty}^{\infty} f(x)\,dx = 1$.

A single value has probability 0, so $P(a < X < b) = P(a \le X \le b)$.

> [!example]- A claim size $X$, in thousands, has density $f(x) = c(10 - x)$ for $0 < x < 10$. What are $c$ and $P(X > 4)$? {Example}
> - The density must integrate to 1: $\int_0^{10} c(10 - x)\,dx = 50c = 1$, so $c = 0.02$.
> - The probability that the claim exceeds 4 is
>
> $$
> \begin{aligned}
> P(X > 4) &= \int_4^{10} 0.02(10 - x)\,dx \\
> &= 0.02(50 - 32) \\
> &= 0.36
> \end{aligned}
> $$

## The cumulative distribution function

The [[Cumulative Distribution Function (CDF)|cumulative distribution function]] of $X$ is the area to the left of $x$:

> $$F(x) = P(X \le x) = \int_{-\infty}^{x} f(t)\,dt$$

The density is the derivative of the CDF:

> $$f(x) = F'(x)$$

The probability of an interval is then a difference, $P(a < X \le b) = F(b) - F(a)$.

> [!example]- $X$ has CDF $F(x) = \frac{x^2}{16}$ for $0 \le x \le 4$. What are its density and $P(1 < X < 3)$? {Example}
> - The density is $f(x) = F'(x) = \frac{x}{8}$ for $0 < x < 4$.
> - $P(1 < X < 3) = F(3) - F(1)$, which is $\frac{9}{16} - \frac{1}{16} = 0.5$.

## Expected value of a function

The [[Expected Value|expected value]] of a function $g(X)$ weights $g(x)$ by the density:

> $$E[g(X)] = \int_{-\infty}^{\infty} g(x)\,f(x)\,dx$$

For $X \ge 0$, the mean is also the integral of the survival function:

> $$E[X] = \int_0^{\infty} \big(1 - F(x)\big)\,dx$$

> [!example]- For the claim size $X$ with density $0.02(10 - x)$ on $(0, 10)$, what is $E[X]$? {Example}
> - Integrating $x$ against the density gives the mean:
>
> $$
> \begin{aligned}
> E[X] &= \int_0^{10} 0.02\,x(10 - x)\,dx \\
> &= 0.02\left(500 - \tfrac{1000}{3}\right) \\
> &= 3.333
> \end{aligned}
> $$
>
> - The CDF is $F(x) = 0.2x - 0.01x^2$, so the survival integral gives the same mean:
>
> $$
> \begin{aligned}
> E[X] &= \int_0^{10} \big(1 - F(x)\big)\,dx \\
> &= 10 - 10 + 3.333 \\
> &= 3.333
> \end{aligned}
> $$

## Payments under a deductible

A payment on a continuous loss need not be continuous. Under a [[Deductible|deductible]] $d$, the payment $Y = \max(X - d, 0)$ is 0 whenever $X \le d$. That point mass, $P(X \le d)$, makes $Y$ a [[Random Variable#Mixed random variables|mixed]] random variable. Its mean integrates only over losses above $d$:

> $$E[Y] = \int_d^{\infty} (x - d)\,f(x)\,dx$$

> [!example]- A loss $X$ is uniform on $(0, 1{,}000)$ and the policy pays $Y = \max(X - 200, 0)$. What are $P(Y = 0)$ and $E[Y]$? {Example}
> - $P(Y = 0) = P(X \le 200) = 0.2$.
> - Only losses above 200 pay:
>
> $$
> \begin{aligned}
> E[Y] &= \int_{200}^{1000} \frac{x - 200}{1{,}000}\,dx \\
> &= \frac{800^2 / 2}{1{,}000} \\
> &= 320
> \end{aligned}
> $$

> [!trap] Reading a density as a probability
> A density is a rate, not a probability, and it can exceed 1. The uniform density on $(0, 0.5)$ is 2. Only an area under the density is a probability.
