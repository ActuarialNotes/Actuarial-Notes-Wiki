---
verification:
  status: unverified
  confidence: null
  last_checked: null
  last_checked_by: null
  content_hash: sha256:5f3c6c8c0ae493d1bfd42287c91f4e13b4c82ae54ec32b7b56c0cc4e6910ff17
  sources: []
  open_findings: 0
  open_critical: 0
  log: .verify/Concepts/Empirical Distribution.md
---

The **Empirical Distribution** of a sample $x_1, \ldots, x_n$ is the discrete distribution that puts probability $1/n$ on each observation. Its CDF, the **empirical distribution function** $F_n$, is the proportion of the sample at or below $x$ — the basic nonparametric estimate of an unknown [[Cumulative Distribution Function (CDF)|CDF]] $F$ from complete individual data.

> $$F_n(x) = \frac{1}{n}\sum_{i=1}^{n} \mathbf{1}\{x_i \le x\}$$

> $$= \frac{\#\{x_i \le x\}}{n}$$

- $F_n$ is a right-continuous step function that jumps by $1/n$ at each observation (by $m/n$ at a value observed $m$ times), with $F_n = 0$ below $x_{(1)}$ and $F_n = 1$ from $x_{(n)}$ on.
- At each fixed $x$, $n F_n(x)$ is [[Binomial Distribution|binomial]] with parameters $n$ and $F(x)$, so $F_n(x)$ is unbiased with $\text{Var}(F_n(x)) = F(x)\,[1 - F(x)]/n$, estimated by $F_n(x)[1 - F_n(x)]/n$. By the weak law of large numbers it is consistent: $F_n(x) \to F(x)$ [[Convergence in Probability|in probability]].
- **Empirical moments.** The empirical distribution's mean is the [[Sample Mean|sample mean]] $\bar{x}$; its variance divides by $n$, $\frac{1}{n}\sum (x_i - \bar{x})^2$, not by $n-1$ as the unbiased [[Sample Variance|sample variance]] does.
- **Plug-in estimates.** Any quantity defined from $F$ can be estimated by computing it under $F_n$: $E[g(X)] \approx \frac{1}{n}\sum g(x_i)$, such as a [[Limited Expected Value|limited expected value]] or a [[Loss Elimination Ratio|loss elimination ratio]]. Its percentiles feed [[Percentile Matching]], and it is the yardstick in the [[Kolmogorov-Smirnov Test]].
- $F_n$ needs **complete** data: with [[Censoring|censored]] or [[Truncation|truncated]] observations the proportion at or below $x$ is unknown, and product-limit (Kaplan–Meier) methods replace it. [[Kernel Density Estimation]] smooths the empirical distribution into a continuous density.

> [!example]- Empirical CDF and Moments of a Claim Sample {Example}
> Ten claims are reported: $200, 350, 350, 500, 500, 500, 800, 1{,}200, 1{,}200, 3{,}000$. Find $F_{10}(350)$, $F_{10}(499)$, $F_{10}(500)$ and $F_{10}(1{,}000)$, and the mean and variance of the empirical distribution.
>
> > [!answer]-
> > Count the claims at or below each point: $F_{10}(350) = 3/10 = 0.3$; $F_{10}(499) = 0.3$ (flat between data points); $F_{10}(500) = 6/10 = 0.6$ (a jump of $3/10$ for the three tied claims); $F_{10}(1{,}000) = 0.7$.
> >
> > $$
> > \begin{align*}
> > \bar{x} &= \frac{8{,}600}{10} \\
> >   &= 860 \\
> > \text{Var} &= \frac{1}{10}\sum_{i=1}^{10}(x_i - 860)^2 \\
> >   &= \frac{6{,}159{,}000}{10} \\
> >   &= 615{,}900
> > \end{align*}
> > $$
> >
> > The empirical standard deviation is $\sqrt{615{,}900} = 784.8$. (The unbiased sample variance would divide by $9$ instead: $684{,}333$.)

> [!example]- Plug-In Loss Elimination Ratio and a Standard Error {Example}
> Using the same ten claims, estimate the loss elimination ratio of a \$500 deductible, and the standard error of $F_{10}(500)$ as an estimate of $F(500)$.
>
> > [!answer]-
> > Under the empirical distribution, $E[X \wedge 500]$ is the average of the claims capped at 500:
> >
> > $$
> > \begin{align*}
> > \widehat{E}[X \wedge 500] &= \frac{200 + 350 + 350 + 500 \times 7}{10} \\
> >   &= 440 \\
> > \widehat{\text{LER}}(500) &= \frac{440}{860} \\
> >   &= 0.512
> > \end{align*}
> > $$
> >
> > So the deductible would eliminate about 51% of losses. For the standard error, $F_{10}(500) = 0.6$:
> >
> > $$
> > \begin{align*}
> > \widehat{\text{Var}}\big(F_{10}(500)\big) &= \frac{0.6 \times 0.4}{10} \\
> >   &= 0.024
> > \end{align*}
> > $$
> >
> > giving a standard error of $\sqrt{0.024} = 0.155$ — ten claims pin down $F(500)$ only roughly.
