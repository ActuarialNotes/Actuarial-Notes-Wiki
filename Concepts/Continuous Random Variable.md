---
verification:
  status: verified
  confidence: high
  last_checked: 2026-11-28
  last_checked_by: agent:validate-v1
  content_hash: sha256:10dd4e77092326377ae0685cf0d55bd535187c99684edd62104d786b3134ea9e
  sources:
    - "18.05 S22 Reading 5b: Continuous Random Variables, Sec. 4, definition of a continuous random variable and pdf properties, PDF p.2, sha256:3b4e14112eca532d9d03de273fdc40d27e6cf241681aabf012a49837640c2e5b — https://ocw.mit.edu/courses/18-05-introduction-to-probability-and-statistics-spring-2022/mit18_05_s22_class05-prep-b.pdf"
    - "Continuous Random Variables and their Distributions, §4.1.0, P(X=x)=0, < and <= agree, sha256:de17b3d54581cbed5640f776590c1b7a328c09298b6f9c9b745f66eec958857d — https://www.probabilitycourse.com/chapter4/4_1_0_continuous_random_vars_distributions.php"
    - "Probability Density Function | PDF | Distributions, §4.1.1, f=F', F=int f, P(a<X<=b)=F(b)-F(a), int f=1, f can exceed 1, uniform density 1/(b-a), sha256:ca7a69b5758983d339d4c2f5cc12f4046ae40be69410512baa75663c329131fa — https://www.probabilitycourse.com/chapter4/4_1_1_pdf.php"
    - "https://math.dartmouth.edu/~prob/prob/prob.pdf, §2.2 p.60, PDF p.68: density value not a probability, can exceed 1, sha256:763eab9894983ddfd6cd7f84685548d1515a9326a2d9fd015474534460551a5e — https://math.dartmouth.edu/~prob/prob/prob.pdf"
    - "Definitions and Basic Properties, change of variables theorem, E[g(X)] = int g f, sha256:3228c869ff2a03804690236fc072d1cf7bd9b040855c67156791b50e7d3cfba9 — https://www.randomservices.org/random/expect/Properties.html"
    - "9. Expected Value as an Integral, Special Results for Nonnegative Variables: E(X)=int_0^inf P(X>x)dx, sha256:13db7b0f6f791843abcef65cf16e1214b8e745e3f9eeac74e01cc96fa3a032bc — https://www.randomservices.org/random/expect/Integral.html"
    - "Mixed Random Variables | Examples, §4.3.1 mixed random variables, continuous and discrete part, sha256:c99c7c00238d960cdf0cc52a58f2bdd183af5f919c650e0c6933182fc9be4d6b — https://www.probabilitycourse.com/chapter4/4_3_1_mixed.php"
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
