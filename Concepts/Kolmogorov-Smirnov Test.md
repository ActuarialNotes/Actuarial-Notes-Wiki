---
verification:
  status: unverified
  confidence: null
  last_checked: null
  last_checked_by: null
  content_hash: sha256:1bad27d9acee75d5347b8ea8ed0a3f1a3d38d57a701e022f924d0f909bb03e62
  sources: []
  open_findings: 0
  open_critical: 0
  log: .verify/Concepts/Kolmogorov-Smirnov Test.md
---

The **Kolmogorov-Smirnov Test** (K–S) checks whether individual data came from a hypothesized continuous distribution $F^*$ by measuring the largest vertical gap $D$ between $F^*$ and the [[Empirical Distribution|empirical distribution function]] $F_n$. A large gap is evidence against the model, so $H_0$ is rejected when $D$ exceeds its [[Critical Value|critical value]].

> $$D = \max_{x}\,\big|F_n(x) - F^*(x)\big|$$

> $$D = \max_{1 \le i \le n}\left\{F^*(x_{(i)}) - \frac{i-1}{n},\ \ \frac{i}{n} - F^*(x_{(i)})\right\}$$

- $x_{(1)} \le \cdots \le x_{(n)}$ are the [[Order Statistics|ordered]] observations. $F_n$ jumps at each data point, so the gap must be checked on **both sides** of every jump: against the step's height before it, $(i-1)/n$, and after it, $i/n$. With tied values, compare $F^*(x)$ with $F_n(x^-)$ and $F_n(x)$.
- **Critical values.** The distribution of $D$ does not depend on $F^*$ when $F^*$ is fully specified, so one table serves every model. The SOA's published Exam C solutions use $1.22/\sqrt{n}$, $1.36/\sqrt{n}$, $1.48/\sqrt{n}$ and $1.63/\sqrt{n}$ at the 10%, 5%, 2.5% and 1% levels (for $n = 5$: $0.546, 0.608, 0.662, 0.729$). The CAS MAS-I tables do not include them.
- **Limitations.** It applies only to continuous distributions and is most sensitive near the centre of the distribution, less so in the tails. If parameters are estimated from the same data, the tabled critical values are no longer valid (they must be found by simulation). For grouped data or a discrete model, use the [[Chi-Square Goodness-of-Fit Test]].
- **Anderson–Darling test.** A refinement that weights squared differences by $1/[F^*(1-F^*)]$, so it puts more emphasis on the **tails** — where large losses live. With $u_i = F^*(x_{(i)})$:

> $$A^2 = -n - \frac{1}{n}\sum_{i=1}^{n}(2i-1)\left[\ln u_i + \ln\big(1 - u_{n+1-i}\big)\right]$$

- Unlike $D$, the critical values of $A^2$ depend on which distribution is being tested, so they are tabulated separately for the normal, lognormal, exponential, Weibull and a few others.

> [!example]- K–S Test of an Exponential Severity Model {Example}
> Eight claims are observed: $45, 110, 180, 260, 390, 520, 800, 1{,}350$. Test at the 5% level whether they come from an exponential distribution with mean $400$.
>
> > [!answer]-
> > With $F^*(x) = 1 - e^{-x/400}$, compare $F^*$ with the empirical step just below and just at each point:
> >
> > | $x_{(i)}$ | $F^*(x_{(i)})$ | $\frac{i-1}{8}$ | $\frac{i}{8}$ | larger gap |
> > | :---: | :---: | :---: | :---: | :---: |
> > | 45 | 0.1064 | 0.000 | 0.125 | 0.1064 |
> > | 110 | 0.2404 | 0.125 | 0.250 | 0.1154 |
> > | 180 | 0.3624 | 0.250 | 0.375 | 0.1124 |
> > | 260 | 0.4780 | 0.375 | 0.500 | 0.1030 |
> > | 390 | 0.6228 | 0.500 | 0.625 | 0.1228 |
> > | 520 | 0.7275 | 0.625 | 0.750 | 0.1025 |
> > | 800 | 0.8647 | 0.750 | 0.875 | 0.1147 |
> > | 1,350 | 0.9658 | 0.875 | 1.000 | 0.0908 |
> >
> > So $D = 0.1228$, at $x = 390$. The 5% critical value is $1.36/\sqrt{8} = 0.481$; since $0.123 < 0.481$, **do not reject** the exponential model.

> [!example]- Anderson–Darling Statistic for a Small Sample {Example}
> Four losses, $20, 70, 130, 260$, are tested against an exponential distribution with mean $100$. Compute $A^2$.
>
> > [!answer]-
> > The fitted CDF values are $u = (0.1813,\ 0.5034,\ 0.7275,\ 0.9257)$, so $\ln u_i = (-1.7078, -0.6863, -0.3182, -0.0772)$ and $\ln(1 - u_{5-i}) = (-2.6, -1.3, -0.7, -0.2)$, i.e. $-x_{(5-i)}/100$. The weighted terms $(2i-1)[\ln u_i + \ln(1 - u_{5-i})]$ are $-4.3078, -5.9590, -5.0909, -1.9402$, which sum to $-17.2979$:
> >
> > $$
> > \begin{align*}
> > A^2 &= -4 - \frac{1}{4}(-17.2979) \\
> >   &= -4 + 4.3245 \\
> >   &= 0.3245
> > \end{align*}
> > $$
> >
> > A small $A^2$ means the fitted CDF tracks the data closely, including at the extremes.
