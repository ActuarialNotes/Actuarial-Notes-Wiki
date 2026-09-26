---
verification:
  status: unverified
  confidence: null
  last_checked: null
  last_checked_by: null
  content_hash: sha256:0495752510eb4e7d9ef19e4b03426530a5c454a7fc07a18b0c1a188ae069ef7c
  sources: []
  open_findings: 0
  open_critical: 0
  log: .verify/Concepts/Mode.md
---

The **Mode** of a [[Random Variable]] $X$ is the value at which its [[Probability Mass Function (PMF)|PMF]] or [[Probability Density Function (PDF)|PDF]] $f(x)$ is largest — the single most likely value of a [[Discrete Random Variable|discrete]] variable, or the peak of a [[Continuous Random Variable|continuous]] density.

> $$\text{mode} = \arg\max_{x}\, f(x)$$

- **Interior peak (continuous):** solve $f'(x) = 0$ and confirm it is a maximum. Maximising $\ln f(x)$ gives the same point and is usually easier for gamma- or lognormal-type densities, where the product becomes a sum.
- **Endpoint peak:** a density that only decreases, such as the [[Exponential Distribution|exponential]], has its mode at the left end of the support. Calculus finds no critical point there, so always check the endpoints.
- **Discrete:** compare neighbouring probabilities. For the [[Poisson Distribution|Poisson]], $p(k)/p(k-1) = \lambda/k$, so probabilities rise while $k \le \lambda$ and the mode is $\lfloor \lambda \rfloor$ (both $\lambda - 1$ and $\lambda$ when $\lambda$ is an integer). For the [[Binomial Distribution|binomial]] the same argument gives $\lfloor (n+1)p \rfloor$ (and $(n+1)p - 1$ as well when $(n+1)p$ is an integer).
- A mode need not be unique. A uniform distribution has every point of its support as a mode, and a mixture of two claim populations can be bimodal.
- Standard results: [[Normal Distribution|normal]] $\mu$; [[Gamma]] $(\alpha - 1)\theta$ for $\alpha \ge 1$; [[Lognormal Distribution|lognormal]] $e^{\mu - \sigma^2}$. For a right-skewed severity, mode < [[Median|median]] < [[Expected Value|mean]] is typical, and the lognormal always obeys it: $e^{\mu - \sigma^2} < e^{\mu} < e^{\mu + \sigma^2/2}$.
- The mode ignores the tail entirely. It describes the most common claim, not the cost of claims — pricing is done on the mean.

> [!example]- Most Likely Claim Size under a Gamma Severity {Example}
> Claim sizes have density $f(x) = \dfrac{x\,e^{-x/2{,}000}}{2{,}000^2}$ for $x > 0$ (a gamma with $\alpha = 2$, $\theta = 2{,}000$). Find the mode and compare it with the mean.
>
> > [!answer]-
> > Maximise the log-density:
> > $$
> > \begin{align*}
> > \ln f(x) &= \ln x - \frac{x}{2{,}000} - 2\ln 2{,}000 \\
> > \frac{d}{dx}\ln f(x) &= \frac{1}{x} - \frac{1}{2{,}000} \\
> > 0 &= \frac{1}{x} - \frac{1}{2{,}000} \\
> > x &= 2{,}000
> > \end{align*}
> > $$
> > The second derivative $-1/x^2$ is negative, so this is a maximum: the mode is \$2,000, matching $(\alpha - 1)\theta$. The mean is $\alpha\theta = \$4{,}000$, and the median, found numerically from $F(m) = 0.5$, is about \$3,357. The most common claim is half the average one — a premium set at the mode would collect half the expected cost.

> [!example]- Most Likely Claim Count for a Fleet {Example}
> A fleet's annual claim count is Poisson with $\lambda = 2.6$. Find the mode and its probability.
>
> > [!answer]-
> > The ratio $p(k)/p(k-1) = 2.6/k$ is $2.6$ at $k = 1$ and $1.3$ at $k = 2$, both above 1, then $0.87$ at $k = 3$. Probabilities rise up to $k = 2$ and fall after, so the mode is $\lfloor 2.6 \rfloor = 2$.
> > $$
> > \begin{align*}
> > p(2) &= \frac{e^{-2.6}\,(2.6)^2}{2} \\
> >      &= 0.07427 \times 3.38 \\
> >      &= 0.2510
> > \end{align*}
> > $$
> > Its neighbours are $p(1) = 0.1931$ and $p(3) = 0.2176$. Two claims is the single likeliest outcome, yet it happens only a quarter of the time, and the mean of $2.6$ is not itself a possible count.
