**Tail Weight** describes how much probability a [[Severity Distribution|severity distribution]] puts on very large losses — how slowly its survival function $S(x) = 1 - F(x)$ falls to 0. A **heavy-tailed** distribution such as the [[Pareto Distribution|Pareto]] makes extreme claims far more likely than a **light-tailed** one such as the [[Gamma|gamma]], and distributions are compared by four related measures.

> $$\lim_{x \to \infty} \frac{S_X(x)}{S_Y(x)} = \lim_{x \to \infty} \frac{f_X(x)}{f_Y(x)}$$

> $$e(d) = E[X - d \mid X > d]$$

- **Limiting ratio.** If the limit is $\infty$, $X$ has the heavier right tail; if it is a positive constant, the tails are proportionally equivalent; if it is $0$, $X$ is lighter. The density form follows from L'Hôpital's rule and helps when $S$ has no closed form.
- **Existence of moments.** The fewer positive moments $E[X^k]$ are finite, the heavier the tail. Gamma and [[Weibull Distribution|Weibull]] have all moments (light); the Pareto has $E[X^k] < \infty$ only for $k < \alpha$ (heavy, heavier as $\alpha$ falls). The [[Lognormal Distribution|lognormal]] has every moment but no moment generating function, so the moment test and the MGF test can disagree.
- **[[Hazard Rate]].** A decreasing hazard rate $h(x) = f(x)/S(x)$ signals a heavy tail and an increasing one a light tail. The Pareto's hazard decreases; the Weibull's decreases for $\tau < 1$, is constant for $\tau = 1$ (the [[Exponential Distribution|exponential]]) and increases for $\tau > 1$.
- **Mean excess loss** $e(d)$, the average amount by which losses exceeding $d$ exceed it, is the benchmark from the other side: constant for the exponential, increasing for distributions with tails heavier than the exponential — linearly in $d$ for the Pareto. A rising $e(d)$ means that the larger a loss already is, the larger its expected excess. It also prices an [[Excess of Loss|excess layer]]: the expected loss above a retention $R$ is $E[(X - R)_+] = S(R)\,e(R)$.

> [!example]- Pareto Versus Exponential at the Extreme {Example}
> Losses are modelled either as exponential with mean 1,000 or as Pareto with $\alpha = 3$, $\theta = 2{,}000$ (also mean 1,000). Compare $P(X > 10{,}000)$ under each model, decide which tail is heavier, and say which moments of the Pareto exist.
>
> > [!answer]-
> >
> > $$
> > \begin{align*}
> > S_{\text{Par}}(10{,}000) &= \left(\frac{2{,}000}{12{,}000}\right)^{3} \\
> >   &= 0.00463 \\
> > S_{\text{Exp}}(10{,}000) &= e^{-10} \\
> >   &= 0.0000454
> > \end{align*}
> > $$
> >
> > With the same mean, the Pareto makes a \$10,000 loss about 100 times as likely. In the limit, $S_{\text{Par}}(x)/S_{\text{Exp}}(x) = (2{,}000)^3 e^{x/1{,}000}/(x + 2{,}000)^3 \to \infty$, because an exponential grows faster than any polynomial, so the Pareto's tail is heavier. Its moments exist only for $k < 3$: the mean and variance are finite, $E[X^3]$ is not, while the exponential has all its moments.

> [!example]- Hazard Rate and Mean Excess Loss of a Pareto {Example}
> For the Pareto with $\alpha = 3$, $\theta = 2{,}000$, find the hazard rate and the mean excess loss at $d = 0$, $1{,}000$ and $10{,}000$.
>
> > [!answer]-
> > From $f(x) = \alpha\theta^{\alpha}/(x+\theta)^{\alpha+1}$ and $S(x) = \theta^{\alpha}/(x+\theta)^{\alpha}$:
> >
> > $$
> > \begin{align*}
> > h(x) &= \frac{f(x)}{S(x)} \\
> >   &= \frac{\alpha}{x + \theta}
> > \end{align*}
> > $$
> >
> > Losses above $d$ are again Pareto, shifted to start at $d$ with scale $d + \theta$, so
> >
> > $$
> > \begin{align*}
> > e(d) &= \frac{d + \theta}{\alpha - 1} \\
> >   &= \frac{d + 2{,}000}{2}
> > \end{align*}
> > $$
> >
> > | $d$ | $h(d)$ | $e(d)$ |
> > | :---: | :---: | :---: |
> > | 0 | 0.00150 | 1,000 |
> > | 1,000 | 0.00100 | 1,500 |
> > | 10,000 | 0.00025 | 6,000 |
> >
> > The hazard falls and the mean excess climbs linearly — both signatures of a heavy tail. An exponential with mean 1,000 would have constant $h = 0.001$ and constant $e(d) = 1{,}000$.
