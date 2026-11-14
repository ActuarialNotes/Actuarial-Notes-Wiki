---
verification:
  status: unverified
  confidence: null
  last_checked: null
  last_checked_by: null
  content_hash: sha256:bb8a1e3d6ce1a567db335693923e905f844ab5b12ab6762a6e0c62e4992f0c11
  sources: []
  open_findings: 0
  open_critical: 0
  log: .verify/Concepts/Martingale.md
---
A **Martingale** is a process $X_t$ whose best forecast of any future value, given everything known today, is today's value. It is a fair game with no drift. For times $s \le t$, a martingale satisfies

> $$E\left[X_t \mid \mathcal{F}_s\right] = X_s$$

- $\mathcal{F}_s$ is the information available at time $s$, the history of the process up to $s$.
- $E[\,\cdot \mid \mathcal{F}_s]$ is the [[Conditional Probability|conditional]] [[Expected Value|expectation]] given that information.
- $X_t$ is adapted, so its value is known at each time, and integrable, $E|X_t| < \infty$.

Taking expectations of both sides gives $E[X_t] = X_0$, so a martingale's mean never changes. The converse is false: $W_t^3$ has mean zero for every $t$, but it is not a martingale.

> [!example]- Is $M_t = W_t^2 - t$ a martingale, where $W_t$ is a standard Brownian motion? {Example}
> - For $s < t$, write $W_t = W_s + D$, where $D = W_t - W_s \sim N(0,\,t-s)$ is independent of $\mathcal{F}_s$.
> - Then $E[D \mid \mathcal{F}_s] = 0$ and $E[D^2 \mid \mathcal{F}_s] = t - s$.
> - So $E\left[W_t^2 \mid \mathcal{F}_s\right] = W_s^2 + 2W_s(0) + (t - s)$.
> - Subtracting $t$ gives $E[M_t \mid \mathcal{F}_s] = W_s^2 - s = M_s$, so $M_t$ is a martingale.
> - $W_t^2$ alone is a submartingale, since its mean $t$ grows, and subtracting $t$ removes that drift exactly.

## Submartingales and supermartingales

If $E[X_t \mid \mathcal{F}_s] \ge X_s$, the process is a submartingale and drifts up on average. If $E[X_t \mid \mathcal{F}_s] \le X_s$, it is a supermartingale and drifts down. A stock with expected return $\alpha > r$, discounted at $r$, is a submartingale under the real-world measure $\mathbb{P}$.

## Driftless Itō processes

An [[Itō Calculus|Itō process]] is a martingale when its $dt$ term is zero, provided $E\int_0^T \sigma_t^2\,dt < \infty$. Such a process is

> $$dX_t = \sigma_t\,dW_t$$

- $W_t$ is a standard Brownian motion.
- $\sigma_t$ is the process's volatility.

To test a process, apply Itō's lemma and check whether the drift vanishes, as Hull does.

> [!example]- Which of $W_t^3$, $W_t^3 - 3tW_t$ and $\exp\left(\sigma W_t - \tfrac12\sigma^2 t\right)$ are martingales? {Example}
> - Itō's lemma on $X_t = W_t^3$ gives $dX_t = 3W_t\,dt + 3W_t^2\,dW_t$. The drift $3W_t$ is not zero, so $X_t$ is not a martingale.
> - On $Y_t = W_t^3 - 3tW_t$, the drift is $3W_t - 3W_t = 0$, so $dY_t = \left(3W_t^2 - 3t\right)dW_t$ and $Y_t$ is a martingale.
> - On $Z_t = \exp\left(\sigma W_t - \tfrac12\sigma^2 t\right)$, the drift is $\left(-\tfrac12\sigma^2 + \tfrac12\sigma^2\right)Z_t = 0$, so $dZ_t = \sigma Z_t\,dW_t$ and $Z_t$ is a martingale.
> - $Z_t$ is the exponential martingale that [[Girsanov's Theorem|Girsanov's theorem]] uses as a change-of-measure density.

## Equivalent martingale measures

In derivative pricing, the price of every traded asset, measured in units of a chosen [[Numeraire|numeraire]], is a martingale under the measure that goes with that numeraire. For any traded security $f$ and any traded numeraire $g > 0$ there is a measure $\mathbb{Q}_g$ under which $f/g$ is a martingale. For $t \le T$, that is

> $$\frac{f_t}{g_t} = E^{\mathbb{Q}_g}\!\left[\frac{f_T}{g_T}\,\Big|\,\mathcal{F}_t\right]$$

With the money-market account $g_t = e^{rt}$ as numeraire, the measure is the [[Risk-Neutral Valuation|risk-neutral measure]] $\mathbb{Q}$. Then $e^{-rt}f_t$ is a $\mathbb{Q}$-martingale, so $f_0 = e^{-rT}E^{\mathbb{Q}}[f_T]$, and pricing a derivative reduces to taking an expectation. Changing the measure from $\mathbb{P}$ to $\mathbb{Q}$ is done with [[Girsanov's Theorem|Girsanov's theorem]].

A martingale price process rules out arbitrage, because no trading strategy can earn a positive expected gain in normalized units from a zero start. Conversely, the fundamental theorem of asset pricing says that no arbitrage implies such a measure exists.

> [!example]- Under which measure is this discounted stock price a martingale? {Example}
> A non-dividend stock follows $dS_t = \alpha S_t\,dt + \sigma S_t\,dW^{\mathbb{P}}_t$ with $\alpha = 0.09$, $\sigma = 0.20$ and $S_0 = 100$. The risk-free rate is $r = 0.04$. Find the dynamics of $Y_t = e^{-rt}S_t$ and $E[Y_1]$ under each measure.
>
> > [!answer]-
> > - By the product rule, $dY_t = -rY_t\,dt + e^{-rt}\,dS_t$.
> > - Under $\mathbb{P}$, $dY_t = (\alpha - r)Y_t\,dt + \sigma Y_t\,dW^{\mathbb{P}}_t$, so $E^{\mathbb{P}}[Y_1] = 100\,e^{0.05} = 105.13$.
> > - $Y_t$ is a submartingale under $\mathbb{P}$, growing at the risk premium of 5%.
> > - Under $\mathbb{Q}$ the stock drifts at $r$, so $dY_t = \sigma Y_t\,dW^{\mathbb{Q}}_t$ and $E^{\mathbb{Q}}[Y_1] = 100 = Y_0$.
> > - The discounted price is a martingale under $\mathbb{Q}$ only, which is why prices are expectations under $\mathbb{Q}$ and not under $\mathbb{P}$.

## Which prices are martingales

Only the prices of traded, self-financing assets are martingales after normalization. A dividend-paying stock's price $S_t$ is not. For a dividend yield $\delta$, $e^{-rt}S_t$ has $\mathbb{Q}$-drift $-\delta$, and the martingale is $e^{-(r-\delta)t}S_t$, the value of a fund that reinvests the dividends, discounted at $r$. An interest rate, a volatility or an index level is not a traded price, so it need not be a martingale under any pricing measure, and a mean-reverting short rate is no contradiction.

> [!trap] Discounting under the wrong measure
> "The discounted price is a martingale" is true under $\mathbb{Q}$, not under $\mathbb{P}$. A question that gives the real-world drift $\alpha$ is often testing whether the real-world expectation is discounted at $r$, which is wrong. In the stock example, it gives $105.13$ instead of $100$.
