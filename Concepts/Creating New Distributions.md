---
aliases:
  - New Distribution
verification:
  status: unverified
  confidence: null
  last_checked: null
  last_checked_by: null
  content_hash: sha256:05dbabb74df1065e49a1ab47820bc1862cc793bc37449246294297211d9e7e92
  sources: []
  open_findings: 0
  open_critical: 0
  log: .verify/Concepts/Creating New Distributions.md
---

**Creating New Distributions** is building a new severity model from a known one by five operations that Loss Models describes: multiplication by a constant, raising to a power, exponentiation, [[Mixture Distribution|mixing]] and [[Spliced Distribution|splicing]]. Each of the first three applies a function to a random variable $X$ with a known distribution, and the distribution function of the new variable $Y$ follows by a [[Transformations of Random Variables|change of variable]]. Most of the named distributions in the exam tables arise in one of these ways.

If $Y = \theta X$ with $\theta > 0$, the distribution function of $Y$ is

> $$F_Y(y) = F_X\!\left(\frac{y}{\theta}\right)$$

The density becomes $f_Y(y) = f_X(y/\theta)/\theta$. Multiplying by $\theta$ changes the units or applies uniform inflation. A family that is closed under this operation is a scale family, and $\theta$ is its [[Scale and Shape Parameters|scale parameter]].

## Raising to a power

If $Y = X^{1/\tau}$, the distribution function of $Y$ is

> $$F_Y(y) = \begin{cases} F_X(y^{\tau}), & \tau > 0 \\ 1 - F_X(y^{\tau}), & \tau < 0 \end{cases}$$

Loss Models calls $Y$ *transformed* when $\tau > 0$, *inverse* when $\tau = -1$, and *inverse transformed* for any other $\tau < 0$. The [[Weibull Distribution|Weibull]] is a transformed exponential, and the inverse exponential has $F(y) = e^{-\theta/y}$. A negative power reverses the order of the values, so the small values of $X$ become the large values of $Y$. An inverse distribution usually has a heavy right tail and finite moments only below some order. The moments of $Y$ come from those of $X$, since $E[Y^k] = E[X^{k/\tau}]$.

> [!example]- What are the distribution functions of $Y$ and $Z$, the probability that each exceeds 1,500, and the mean of each? {Example}
> $X$ is exponential with mean 1. Let $Y = 1{,}000\,X^{1/2}$ and $Z = 1{,}000/X$.
>
> > [!answer]-
> > - Both follow from $F_X(x) = 1 - e^{-x}$.
> > - The power $1/2$ is positive, so the inequality keeps its direction: $F_Y(y) = P\big[X \le (y/1{,}000)^2\big] = 1 - e^{-(y/1{,}000)^2}$.
> > - Dividing into 1,000 reverses it: $F_Z(z) = P\big[X \ge 1{,}000/z\big] = e^{-1{,}000/z}$.
> > - $Y$ is Weibull with $\tau = 2$ and $\theta = 1{,}000$, and $Z$ is inverse exponential with $\theta = 1{,}000$.
> > - $P(Y > 1{,}500) = e^{-2.25} = 0.1054$ and $P(Z > 1{,}500) = 1 - e^{-2/3} = 0.4866$.
> > - The mean of $Y$ is $1{,}000\,\Gamma(1.5) = 886.23$.
> > - The mean of $Z$ is $\int_0^\infty (1{,}000/x)\,e^{-x}\,dx$, which diverges near $x = 0$, so $Z$ has no mean.

## Exponentiation

If $Y = e^X$, the distribution function of $Y$ is

> $$F_Y(y) = F_X(\ln y)$$

If $X$ is [[Normal Distribution|normal]] with parameters $\mu$ and $\sigma$, then $Y = e^X$ is [[Lognormal Distribution|lognormal]] with the same parameters. Exponentiation stretches the right tail a great deal, because each unit step in $X$ multiplies $Y$ by $e$. The moments of $Y$ are values of the moment generating function of $X$, since $E[Y^k] = E[e^{kX}] = M_X(k)$. Multiplying a lognormal $Y$ by $c$ adds $\ln c$ to $\mu$ and leaves $\sigma$ unchanged.

> [!example]- What are the probability that a claim exceeds 5,000 and the mean claim, before and after 8% inflation? {Example}
> The logarithm of a claim amount is normal with $\mu = 7$ and $\sigma = 1.2$.
>
> > [!answer]-
> > - The claim $Y = e^X$ is lognormal, so $P(Y > 5{,}000) = P(X > \ln 5{,}000)$.
> > - $z = (\ln 5{,}000 - 7)/1.2 = (8.5172 - 7)/1.2 = 1.2643$, so $P(Y > 5{,}000) = 1 - \Phi(1.2643) = 0.1031$.
> > - The mean claim is $E[Y] = e^{7 + 1.2^2/2} = 2{,}252.96$.
> > - Inflation multiplies $Y$ by 1.08, which adds $\ln 1.08 = 0.0770$ to $X$, so $\mu$ becomes 7.0770 and $\sigma$ stays at 1.2.
> > - Then $z = (8.5172 - 7.0770)/1.2 = 1.2002$, so $P(1.08\,Y > 5{,}000) = 0.1150$.
> > - The mean becomes $1.08 \times 2{,}252.96 = 2{,}433.20$.
> > - The mean rises by exactly 8%, but the probability of a claim above the fixed threshold of 5,000 rises by about 12%.

## Mixing

A mixture averages a conditional density over a random parameter $\Lambda$:

> $$f_Y(y) = \int f_{Y \mid \Lambda}(y \mid \lambda)\,f_\Lambda(\lambda)\,d\lambda$$

A gamma-distributed rate turns an exponential into a [[Pareto Distribution|Pareto]], as on the [[Mixing Distribution|mixing distribution]] page. A mixture averages densities. The distribution of the sum of two claims is a [[Convolution|convolution]], which is a different object with a different variance.

## Splicing

A spliced distribution joins different densities on different intervals, such as a light-tailed body for small losses and a heavy tail for large ones.

> [!trap] Using $F_X(y^{\tau})$ for a negative power
> For $\tau < 0$ the transformation is decreasing, so $F_Y(y) = 1 - F_X(y^{\tau})$. Using $F_X(y^{\tau})$ gives a function that falls as $y$ rises, which cannot be a distribution function.
