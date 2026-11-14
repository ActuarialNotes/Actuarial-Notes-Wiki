---
aliases:
  - Numerical Discretization
  - Transition Density
verification:
  status: unverified
  confidence: null
  last_checked: null
  last_checked_by: null
  content_hash: sha256:513a3c00723f304de7681c7d8da76de7ab6c647d5c5f8e1783cdfa9b2f6d91f3
  sources: []
  open_findings: 0
  open_critical: 0
  log: .verify/Concepts/Euler-Maruyama Discretization.md
---

**Euler-Maruyama Discretization** approximates the solution of a [[Stochastic Differential Equation|stochastic differential equation]] by stepping it forward on a time grid, replacing $dt$ with a step $\Delta t$ and the Brownian increment $dW$ with $\sqrt{\Delta t}$ times a standard [[Normal Distribution|normal]] draw. Repeated over many simulated paths under the [[Risk-Neutral Valuation|risk-neutral]] measure, it turns an SDE into a Monte Carlo price for an option that has no closed form.

The SDE for a process $X_t$ is

> $$dX_t = a(t, X_t)\,dt + b(t, X_t)\,dW_t$$

- $a$ is the drift.
- $b$ is the diffusion coefficient.
- $W_t$ is a standard Brownian motion.

On the grid $t_k = k\,\Delta t$, $k = 0, 1, \dots, m$, with $m\,\Delta t = T$, the Euler-Maruyama step is

> $$X_{k+1} = X_k + a(t_k, X_k)\,\Delta t + b(t_k, X_k)\sqrt{\Delta t}\,Z_{k+1}$$

- $Z_1, Z_2, \dots$ are independent standard normal draws.

To price, the drift is the risk-neutral one, $r$ or $r - q$ with a dividend yield. The real-world drift $\mu$ is for projection only, and an option price simulated with it is not an arbitrage-free price. When a question supplies draws for several steps, they are used in the order given, one per step. For two correlated factors, the second draw is built as $\rho Z_1 + \sqrt{1 - \rho^2}\,Z_2$.

## The Monte Carlo price and its errors

With $N$ simulated paths, the price of an option with [[Payoff|payoff]] $h$ is estimated as

> $$\hat V_0 = e^{-rT}\,\frac{1}{N}\sum_{n=1}^{N} h\!\left(X_T^{(n)}\right)$$

- $X_T^{(n)}$ is the end of simulated path $n$.

The average payoff is discounted once at the risk-free rate over the whole term. With a stochastic short rate, each path's payoff is discounted along its own path, by $\exp(-\sum_k r_k\Delta t)$, before averaging.

The estimate has two errors. The **discretization bias** comes from the step size and shrinks only as $\Delta t$ shrinks. The **sampling error** comes from the finite number of paths, and its standard error $s_h/\sqrt{N}$ halves only when $N$ is quadrupled, as the [[Central Limit Theorem|central limit theorem]] says. Together they give the root mean squared error

> $$\text{RMSE}^2 = \text{bias}^2 + \frac{s_h^2}{N}$$

- $s_h$ is the sample [[Standard Deviation|standard deviation]] of the discounted payoffs.

More paths do nothing for the bias, and finer steps do nothing for the sampling error. Euler-Maruyama has strong order $\tfrac12$, so the error on an individual path falls like $\sqrt{\Delta t}$. It has weak order 1, so the error in an expectation such as an option price falls like $\Delta t$. A European price needs only weak convergence. Payoffs that monitor a barrier or a running maximum are more sensitive to the step, because the path can cross the level between grid points.

## Transition density methods

When the model's **transition density**, the distribution of $X_{t+\Delta t}$ given $X_t$, is known, the path can be simulated exactly and the discretization error disappears. A model with a known transition density should be stepped with it.

### Geometric Brownian motion

Under [[Black-Scholes Model|Black-Scholes]], $\ln S$ has normal increments, so the [[Lognormal Distribution|lognormal distribution]] is the transition density and the exact step for any $\Delta t$ is

> $$S_{t+\Delta t} = S_t\,e^{(r - \frac12\sigma^2)\Delta t + \sigma\sqrt{\Delta t}\,Z}$$

A European option then needs a single step to $T$. The Euler step multiplies by $1 + r\Delta t + \sigma\sqrt{\Delta t}\,Z$ instead. Putting $-\tfrac12\sigma^2$ in the Euler factor, or leaving it out of the exponent, biases the drift.

> [!example]- How do three Euler steps compare with the exact draw for this index? {Example}
> An equity index follows geometric Brownian motion with $S_0 = 100$, $r = 0.04$ and $\sigma = 0.20$ under the risk-neutral measure. One path to $T = 1$ uses the normal draws $Z_1 = 0.50$, $Z_2 = -1.20$ and $Z_3 = 0.80$, either as three Euler steps of $\Delta t = \tfrac13$ or as the exact lognormal path. The option is a 1-year at-the-money call.
>
> > [!answer]-
> > - Each Euler step multiplies by $1 + r\Delta t + \sigma\sqrt{\Delta t}\,Z_k$, where $r\Delta t = 0.013333$ and $\sigma\sqrt{\Delta t} = 0.115470$.
> > - $S_1 = 100(1.013333 + 0.057735) = 107.1068$.
> > - $S_2 = 107.1068(1.013333 - 0.138564) = 93.6938$.
> > - $S_3 = 93.6938(1.013333 + 0.092376) = 103.5981$.
> > - The exact path adds the log increments. The draws sum to $0.10$, so $\ln(S_T/S_0) = 0.02 + 0.115470(0.10) = 0.031547$.
> > - The exact end value is $S_T = 100\,e^{0.031547} = 103.2050$.
> > - The call pays $3.5981$ on the Euler path and $3.2050$ on the exact one, worth $e^{-0.04}(3.5981) = 3.4570$ and $3.0793$ today.
> > - One path proves nothing about bias, because each path is noisy. Averaged over many paths, the three-step scheme gives $E[S_T] = 100(1.013333)^3 = 104.0536$ against the true $100e^{0.04} = 104.0811$.
> > - With twelve steps the shortfall falls from $0.0275$ to $0.0069$, about a quarter, as weak order 1 predicts.

### The Vasicek model

The Vasicek model is a continuous-time, mean-reverting model of the short rate, which is pulled toward $b$ at speed $a$ and shocked by a Brownian motion:

> $$dr = a(b - r)\,dt + \sigma\,dz$$

Its transition density is normal, with mean $r_t e^{-a\Delta t} + b(1 - e^{-a\Delta t})$ and variance $\sigma^2(1 - e^{-2a\Delta t})/(2a)$.

> [!example]- How do the Euler and exact one-year steps of this Vasicek model differ? {Example}
> A short rate follows $dr = 0.15(0.05 - r)\,dt + 0.01\,dz$ under the risk-neutral measure, with $r_0 = 0.02$. Simulate $r_1$ with the draw $Z = -1.5$, by a single Euler step of one year and by the exact transition density.
>
> > [!answer]-
> > - The Euler step uses the drift and the volatility at $r_0$ for the whole year: $r_1 = 0.02 + 0.15(0.03) + 0.01(-1.5) = 0.0095$.
> > - The exact mean uses $e^{-0.15} = 0.860708$: $E[r_1] = 0.02(0.860708) + 0.05(0.139292) = 0.024179$.
> > - The exact standard deviation is $0.01\sqrt{(1 - e^{-0.30})/0.30} = 0.009295$.
> > - The exact draw is $r_1 = 0.024179 - 1.5(0.009295) = 0.010237$.
> > - The Euler mean, $0.0245$, overshoots because it keeps pulling toward $b$ at the full initial speed. Its standard deviation, $0.01$, ignores the mean reversion that damps shocks within the year.

### The CIR model

The CIR model multiplies the Vasicek volatility by $\sqrt{r}$:

> $$dr = a(b - r)\,dt + \sigma\sqrt{r}\,dz$$

Its transition density is a scaled one: $r_{t+\Delta t}/c$ has a [[Noncentral Chi-Squared Distribution|noncentral chi-squared distribution]] with $c = \sigma^2(1 - e^{-a\Delta t})/(4a)$, $d = 4ab/\sigma^2$ degrees of freedom and noncentrality $\lambda = r_t e^{-a\Delta t}/c$.

The volatility goes to zero as the rate approaches zero. An Euler step of CIR can make the rate negative, after which $\sqrt{r}$ is undefined. Exact sampling never can, and it stays positive when the Feller condition $2ab \geq \sigma^2$ holds.

## Models with no transition density

Stochastic volatility, local volatility and most models in an [[Economic Scenario Generator|economic scenario generator]] have no closed-form transition density, so Euler-Maruyama, often on the log of the price, is the default. The step size and the number of paths are then chosen together, so that neither the bias nor the standard error dominates the other.

> [!trap] Using $\Delta t$ for the square root of the step
> The diffusion term is $b\sqrt{\Delta t}\,Z$, not $b\,\Delta t\,Z$. Using $\Delta t$ shrinks the volatility of a monthly step by a factor of $\sqrt{12}$ and badly underprices options.
