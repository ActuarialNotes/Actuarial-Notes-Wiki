---
aliases:
  - Stochastic Calculus Theory
  - Isometry
verification:
  status: unverified
  confidence: null
  last_checked: null
  last_checked_by: null
  content_hash: sha256:d316456b9eb9846e9b882c0e2643b2b379e3ec2f05a772bf99b4ddd408a69b9f
  sources: []
  open_findings: 0
  open_critical: 0
  log: ".verify/Concepts/Itō Calculus.md"
---
**Itō calculus** is the calculus of processes driven by a Brownian motion, or Wiener process, $W_t$. It defines the integral $\int H_s\,dW_s$ against a path that has no derivative, and its chain rule, **Itō's lemma**, gives the dynamics of any smooth function of such a process.

It is the toolkit behind the [[Stochastic Differential Equation|stochastic differential equations]] of asset prices and interest rates, and behind every derivative price written as a [[Martingale|martingale]] expectation under the [[Risk-Neutral Valuation|risk-neutral measure]]. A process $X_t$ with drift $\mu$ and diffusion, or volatility, $\sigma$ is an **Itō process**, whose dynamics are

> $$dX_t = \mu(X_t,t)\,dt + \sigma(X_t,t)\,dW_t$$

- $W_t$ starts at $W_0 = 0$, has continuous paths, and has independent increments with $W_t - W_s \sim N(0,\,t-s)$ for $s < t$.

The equation is shorthand for $X_t = X_0 + \int_0^t \mu\,ds + \int_0^t \sigma\,dW_s$, in which the last term is an Itō integral. Hull writes the Wiener process as $z$, with increment $\Delta z = \epsilon\sqrt{\Delta t}$ and $\epsilon \sim N(0,1)$. Its paths are continuous but nowhere differentiable, so $dW_t/dt$ does not exist and ordinary calculus cannot be applied to them.

## The Itō integral

The Itō integral of a process $H$ against $W$ is the limit of sums that evaluate $H$ at the left end of each interval of a partition $0 = t_0 < t_1 < \cdots < t_n = T$, which is

> $$\int_0^T H_s\,dW_s = \lim_{n\to\infty}\sum_{i=0}^{n-1} H_{t_i}\left(W_{t_{i+1}} - W_{t_i}\right)$$

- $H$ is non-anticipating: $H_{t_i}$ is known at time $t_i$, before the increment is drawn.

As a result, the integral has mean zero, and it is a martingale whenever $E\int_0^T H_s^2\,ds < \infty$.

## Itō isometry

The **Itō isometry** turns the second moment of a stochastic integral into an ordinary time integral, which is

> $$E\!\left[\left(\int_0^T H_s\,dW_s\right)^{2}\right] = E\!\left[\int_0^T H_s^2\,ds\right]$$

Because the mean is zero, the isometry gives the variance directly, $\operatorname{Var}\left(\int_0^T H_s\,dW_s\right) = \int_0^T E[H_s^2]\,ds$. For two integrands $H$ and $K$, $E\left[\int H\,dW \int K\,dW\right] = E\int H_s K_s\,ds$. The isometry applies to $dW$ integrals only.

> [!example]- What are the mean and variance of $I_T = \int_0^T W_s\,dW_s$, and the variance at $T = 3$? {Example}
> - The integrand $W_s$ is non-anticipating, so $E[I_T] = 0$.
> - By the isometry, $\operatorname{Var}(I_T) = E\left[\int_0^T W_s^2\,ds\right] = \int_0^T s\,ds$, because $E[W_s^2] = s$.
> - That integral is $\tfrac12 T^2$.
> - As a check, Itō's lemma on $G = W_t^2$ (with $\mu = 0$, $\sigma = 1$, $G_x = 2W$, $G_{xx} = 2$) gives $d(W_t^2) = dt + 2W_t\,dW_t$, so $I_T = \tfrac12\left(W_T^2 - T\right)$.
> - $W_T^2/T$ is chi-square with one degree of freedom, so $\operatorname{Var}(W_T^2) = 2T^2$ and $\operatorname{Var}(I_T) = \tfrac14(2T^2) = \tfrac12 T^2$ again.
> - Ordinary calculus would have given $\tfrac12 W_T^2$, whose mean is $\tfrac12 T$ rather than 0. The $-\tfrac12 T$ term is the Itō correction.
> - At $T = 3$ the variance is $4.5$.

## Quadratic variation

Summing squared increments of $W$ over a fine partition of $[0, T]$ gives $\sum (\Delta W)^2 \to T$, not 0. This **quadratic variation** is the source of the multiplication rules

> $$(dW_t)^2 = dt$$

> $$dt\,dW_t = (dt)^2 = 0$$

So $(dX_t)^2 = \sigma^2\,dt$ for an Itō process. For two Brownian motions with correlation $\rho$, $dW^1\,dW^2 = \rho\,dt$.

## Itō's lemma

For a function $G(X_t, t)$ with continuous partial derivatives $G_t$, $G_x$ and $G_{xx}$, a second-order Taylor expansion keeps the term $\tfrac12 G_{xx}(dX)^2 = \tfrac12\sigma^2 G_{xx}\,dt$, so the dynamics of $G$ are

> $$dG = \left(G_t + \mu\,G_x + \tfrac12\sigma^2 G_{xx}\right)dt + \sigma\,G_x\,dW_t$$

The extra drift term $\tfrac12\sigma^2 G_{xx}$ is what separates Itō calculus from the ordinary chain rule. $G$ is driven by the same Brownian motion, with diffusion $\sigma G_x$. Applied to a derivative price $f(S,t)$, together with a [[Delta Hedging|delta hedge]], the lemma gives the [[Black-Scholes Model|Black-Scholes-Merton]] PDE. [[Girsanov's Theorem|Girsanov's theorem]] changes the drift of the same Brownian motion when the measure changes.

> [!example]- What are the median and mean of this stock price at time 2, and the probability that it exceeds 120? {Example}
> A stock follows geometric Brownian motion, $dS_t = \mu S_t\,dt + \sigma S_t\,dW_t$, with $S_0 = 100$, $\mu = 0.08$ and $\sigma = 0.25$.
>
> > [!answer]-
> > - Take $G = \ln S$, so $G_t = 0$, $G_S = 1/S$ and $G_{SS} = -1/S^2$.
> > - Itō's lemma gives $dG = \left(\mu - \tfrac12\sigma^2\right)dt + \sigma\,dW_t = 0.04875\,dt + 0.25\,dW_t$, a process with constant coefficients.
> > - So $\ln S_2$ is normal with mean $\ln 100 + 0.04875(2) = 4.70267$ and variance $0.25^2(2) = 0.125$, a standard deviation of $0.35355$, and $S_2$ is [[Lognormal Distribution|lognormal]].
> > - The median of $S_2$ is $e^{4.70267} = 110.24$.
> > - The mean of $S_2$ is $100\,e^{0.08(2)} = 117.35$.
> > - $\Pr(S_2 > 120) = 1 - N\left((\ln 120 - 4.70267)/0.35355\right) = 1 - N(0.2399) = 0.4052$.
> > - The log grows at $\mu - \tfrac12\sigma^2$, not $\mu$. That gap is the Itō correction, and it is why the median sits below the mean.

## Product rule

For two Itō processes $X_t$ and $Y_t$, the product rule is

> $$d(XY) = X\,dY + Y\,dX + dX\,dY$$

The cross term $dX\,dY$ is computed with the multiplication rules. The rule is the tool for discounting, as in $d(e^{-rt}S_t)$.

> [!trap] Dropping the second-order term
> Applying the ordinary chain rule to $\ln S$ gives drift $\mu$ instead of $\mu - \tfrac12\sigma^2$. Any answer whose median of $S_T$ equals $S_0e^{\mu T}$ has made this slip.
