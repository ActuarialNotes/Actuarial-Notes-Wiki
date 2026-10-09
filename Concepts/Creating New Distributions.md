---
aliases:
  - New Distribution
verification:
  status: unverified
  confidence: null
  last_checked: null
  last_checked_by: null
  content_hash: sha256:76500df8333932e165e1dabfa1be3cdce6c5e6805da67326d013268f782adf3e
  sources: []
  open_findings: 0
  open_critical: 0
  log: .verify/Concepts/Creating New Distributions.md
---

**Creating New Distributions** means building a new severity model from a known one by five operations that Loss Models describes: multiplication by a constant, raising to a power, exponentiation, [[Mixture Distribution|mixing]] and [[Spliced Distribution|splicing]]. Each of the first three applies a function to a random variable $X$ with a known distribution, and the CDF of the new variable $Y$ follows by a [[Transformations of Random Variables|change of variable]]. Most of the named distributions in the exam tables arise in one of these ways.

> $$Y = \theta X: \quad F_Y(y) = F_X\!\left(\frac{y}{\theta}\right)$$

> $$Y = X^{1/\tau}: \quad F_Y(y) = \begin{cases} F_X(y^{\tau}), & \tau > 0 \\ 1 - F_X(y^{\tau}), & \tau < 0 \end{cases}$$

> $$Y = e^{X}: \quad F_Y(y) = F_X(\ln y)$$

> $$f_Y(y) = \int f_{Y \mid \Lambda}(y \mid \lambda)\,f_\Lambda(\lambda)\,d\lambda$$

- **Multiplication by a constant:** Multiplying by $\theta > 0$ changes the units or applies uniform inflation, and the density becomes $f_Y(y) = f_X(y/\theta)/\theta$. A family that is closed under this operation is a scale family, and $\theta$ is its [[Scale and Shape Parameters|scale parameter]].
- **Raising to a power:** Loss Models calls $Y = X^{1/\tau}$ *transformed* when $\tau > 0$, *inverse* when $\tau = -1$, and *inverse transformed* for any other $\tau < 0$. The [[Weibull Distribution|Weibull]] is a transformed exponential, and the inverse exponential has $F(y) = e^{-\theta/y}$. A negative power reverses the order of the values, so the small values of $X$ become the large values of $Y$, and an inverse distribution usually has a heavy right tail with only some of its moments finite.
- **Exponentiation:** If $X$ is [[Normal Distribution|normal]] with parameters $\mu$ and $\sigma$, then $Y = e^X$ is [[Lognormal Distribution|lognormal]] with the same parameters. Exponentiation stretches the right tail a great deal, because each unit step in $X$ multiplies $Y$ by $e$. The moments of $Y$ are values of the moment generating function of $X$, since $E[Y^k] = E[e^{kX}]$.
- **Mixing and splicing:** The last block mixes a conditional density over a random parameter $\Lambda$, as when a gamma-distributed rate turns an exponential into a [[Pareto Distribution|Pareto]] (see [[Mixing Distribution]]). Splicing joins different densities on different intervals, such as a light-tailed body for small losses and a heavy tail for large ones.

> [!example]- Weibull and Inverse Exponential From an Exponential {Example}
> $X$ is exponential with mean 1. Let $Y = 1{,}000\,X^{1/2}$ and $Z = 1{,}000/X$. Find the CDF of each, the probability that each exceeds 1,500, and the mean of each.
>
> > [!answer]-
> > Both CDFs follow from $F_X(x) = 1 - e^{-x}$. The power $1/2$ is positive, so the inequality keeps its direction for $Y$, while dividing into 1,000 reverses it for $Z$.
> > $$
> > \begin{align*}
> > F_Y(y) &= \Pr\big[X \le (y/1{,}000)^2\big] \\
> > &= 1 - e^{-(y/1{,}000)^2} \\
> > F_Z(z) &= \Pr\big[X \ge 1{,}000/z\big] \\
> > &= e^{-1{,}000/z}
> > \end{align*}
> > $$
> > $Y$ is Weibull with $\tau = 2$ and $\theta = 1{,}000$, and $Z$ is inverse exponential with $\theta = 1{,}000$. Then $\Pr(Y > 1{,}500) = e^{-2.25} = 0.1054$ and $\Pr(Z > 1{,}500) = 1 - e^{-2/3} = 0.4866$. The mean of $Y$ is $1{,}000\,\Gamma(1.5) = 886.23$. The mean of $Z$ is $1{,}000\,E[1/X] = \int_0^\infty (1{,}000/x)\,e^{-x}\,dx$, which diverges near $x = 0$, so $Z$ has no mean. The same exponential gives a light-tailed Weibull or a severity too heavy-tailed to have a mean, depending on the sign of the power.

> [!example]- A Lognormal Severity and Its Inflation {Example}
> The logarithm of a claim amount is normal with $\mu = 7$ and $\sigma = 1.2$. Find the probability that a claim exceeds 5,000 and the mean claim. Then repeat both after 8% inflation.
>
> > [!answer]-
> > The claim $Y = e^X$ is lognormal, so $\Pr(Y > 5{,}000) = \Pr(X > \ln 5{,}000)$.
> > $$
> > \begin{align*}
> > z &= \frac{\ln 5{,}000 - 7}{1.2} \\
> > &= \frac{8.5172 - 7}{1.2} \\
> > &= 1.2643 \\
> > \Pr(Y > 5{,}000) &= 1 - \Phi(1.2643) \\
> > &= 0.1031 \\
> > E[Y] &= e^{7 + 1.2^2/2} \\
> > &= 2{,}252.96
> > \end{align*}
> > $$
> > Inflation multiplies $Y$ by 1.08, which adds $\ln 1.08 = 0.0770$ to $X$, so $\mu$ becomes 7.0770 and $\sigma$ stays at 1.2. Then $z = (8.5172 - 7.0770)/1.2 = 1.2002$, so $\Pr(1.08\,Y > 5{,}000) = 0.1150$, and the mean becomes $1.08 \times 2{,}252.96 = 2{,}433.20$. The mean rises by exactly 8%, but the chance of a claim above the fixed threshold of 5,000 rises by about 12%.

> [!tip]- How it appears on the exam
> - **ASTAM** asks candidates to create new distributions by multiplication by a constant, raising to a power, exponentiation, mixing and splicing. A question names an operation and a starting distribution and asks for the new CDF or density, a probability, a moment or a percentile.
> - **FAM** asks candidates to recognize classes of distributions and their relationships. Knowing that the Weibull is a transformed exponential, or that the lognormal is an exponentiated normal, places a distribution in its family, which tells which of its moments exist and how heavy its tail is.
> - **Moments without integrating:** For a power or an exponential of $X$, the moments of the new variable come straight from the moments of $X$, through $E[Y^k] = E[X^{k/\tau}]$ or $E[Y^k] = M_X(k)$.

> [!warning]- Exam traps
> - **Negative powers:** For $\tau < 0$, $F_Y(y) = 1 - F_X(y^{\tau})$, because the transformation is decreasing. Using $F_X(y^{\tau})$ gives a "CDF" that falls as $y$ rises.
> - **Missing moments:** An inverse distribution has finite moments only below some order. The inverse exponential has no mean at all, so a premium or comparison based on it has to use a limited expected value or a percentile.
> - **Inflating a lognormal:** Multiplying a lognormal claim by $c$ adds $\ln c$ to $\mu$ and leaves $\sigma$ alone. Multiplying $\mu$ by $c$ is wrong.
> - **Mixing is not adding:** A mixture averages densities. The distribution of the sum of two claims is a [[Convolution|convolution]], which is a different object with a different variance.
