---
aliases:
  - Numerical Discretization
  - Transition Density
verification:
  status: unverified
  confidence: null
  last_checked: null
  last_checked_by: null
  content_hash: sha256:5543c28dbbeec5837bc05639a8dcc45d8ecf39e2ada8bc2cac775c53d3dcef1b
  sources: []
  open_findings: 0
  open_critical: 0
  log: .verify/Concepts/Euler-Maruyama Discretization.md
---
**Euler-Maruyama discretization** approximates the solution of a [[Stochastic Differential Equation|stochastic differential equation]] by stepping it forward on a time grid, replacing $dt$ with a step $\Delta t$ and the Brownian increment $dW$ with $\sqrt{\Delta t}$ times a standard [[Normal Distribution|normal]] draw. Repeated over many simulated paths under the [[Risk-Neutral Valuation|risk-neutral]] measure, it turns an SDE into a Monte Carlo price for an option that has no closed form. When the model's **transition density**, the distribution of $X_{t+\Delta t}$ given $X_t$, is known, the path can instead be simulated exactly and the discretization error disappears.

> $$dX_t = a(t, X_t)\,dt + b(t, X_t)\,dW_t$$

> $$X_{k+1} = X_k + a(t_k, X_k)\,\Delta t + b(t_k, X_k)\sqrt{\Delta t}\,Z_{k+1}$$

> $$\hat V_0 = e^{-rT}\,\frac{1}{N}\sum_{n=1}^{N} h\!\left(X_T^{(n)}\right)$$

> $$\text{RMSE}^2 = \text{bias}^2 + \frac{s_h^2}{N}$$

- **Symbols:** $a$ is the drift and $b$ the diffusion coefficient of the SDE, $t_k = k\,\Delta t$ for $k = 0, 1, \dots, m$ with $m\,\Delta t = T$, and $Z_1, Z_2, \dots$ are independent standard normal draws. In the price, $h$ is the option's [[Payoff|payoff]], $X_T^{(n)}$ is the end of simulated path $n$ out of $N$, and $s_h$ is the sample [[Standard Deviation|standard deviation]] of the discounted payoffs.
- **Two errors:** The **discretization bias** comes from the step size and shrinks only as $\Delta t$ shrinks. The **sampling error** comes from the finite number of paths, and its standard error $s_h/\sqrt{N}$ halves only when $N$ is quadrupled, as the [[Central Limit Theorem|central limit theorem]] says. More paths do nothing for the bias, and finer steps do nothing for the sampling error.
- **Convergence:** Euler-Maruyama has strong order $\tfrac12$, so the error on an individual path falls like $\sqrt{\Delta t}$, and weak order 1, so the error in an expectation such as an option price falls like $\Delta t$. A European price needs only weak convergence. Path-dependent payoffs that monitor a barrier or a running maximum are more sensitive to the step, because the path can cross the level between grid points.
- **Exact simulation of GBM:** Under [[Black-Scholes Model|Black-Scholes]], $\ln S$ has normal increments, so a lognormal step is exact for any $\Delta t$: $S_{t+\Delta t} = S_t\exp\big((r - \tfrac12\sigma^2)\Delta t + \sigma\sqrt{\Delta t}\,Z\big)$, and the [[Lognormal Distribution|lognormal distribution]] is the transition density. A European option then needs a single step to $T$.
- **Exact simulation of Vasicek:** For $dr = a(b - r)\,dt + \sigma\,dz$, the transition density is normal, with mean $r_t e^{-a\Delta t} + b(1 - e^{-a\Delta t})$ and variance $\sigma^2(1 - e^{-2a\Delta t})/(2a)$.
- **Exact simulation of CIR:** For $dr = a(b - r)\,dt + \sigma\sqrt{r}\,dz$, $r_{t+\Delta t}/c$ has a [[Noncentral Chi-Squared Distribution|noncentral chi-squared distribution]] with $c = \sigma^2(1 - e^{-a\Delta t})/(4a)$, $d = 4ab/\sigma^2$ degrees of freedom and noncentrality $\lambda = r_t e^{-a\Delta t}/c$. An Euler step of CIR can make the rate negative, after which $\sqrt{r}$ is undefined. Exact sampling never can, and it stays positive when the Feller condition $2ab \geq \sigma^2$ holds.
- **When there is no transition density:** Stochastic volatility, local volatility and most models in an [[Economic Scenario Generator|economic scenario generator]] have no closed-form transition density, so Euler-Maruyama, often on the log of the price, is the default. The step size and the number of paths are then chosen together, so that neither the bias nor the standard error dominates the other.

> [!example]- Three Euler Steps Against the Exact Draw for GBM {Example}
> An equity index follows geometric Brownian motion with $S_0 = 100$, $r = 0.04$ and $\sigma = 0.20$ under the risk-neutral measure. Simulate one path to $T = 1$ with three Euler-Maruyama steps of $\Delta t = \tfrac13$, using the normal draws $Z_1 = 0.50$, $Z_2 = -1.20$ and $Z_3 = 0.80$. Then use the same three draws to take the exact lognormal path, and compare the discounted payoffs of a 1-year at-the-money call.
>
> > [!answer]-
> > Each Euler step multiplies by $1 + r\Delta t + \sigma\sqrt{\Delta t}\,Z_k$, where $r\Delta t = 0.013333$ and $\sigma\sqrt{\Delta t} = 0.115470$.
> > $$
> > \begin{align*}
> > S_1 &= 100(1 + 0.013333 + 0.115470 \times 0.50) \\
> > &= 107.1068 \\
> > S_2 &= 107.1068(1 + 0.013333 - 0.115470 \times 1.20) \\
> > &= 93.6938 \\
> > S_3 &= 93.6938(1 + 0.013333 + 0.115470 \times 0.80) \\
> > &= 103.5981
> > \end{align*}
> > $$
> > The exact path adds up the log increments. The draws sum to $0.10$.
> > $$
> > \begin{align*}
> > \ln\frac{S_T}{S_0} &= (0.04 - 0.02)(1) + 0.115470(0.10) \\
> > &= 0.031547 \\
> > S_T &= 100\,e^{0.031547} \\
> > &= 103.2050
> > \end{align*}
> > $$
> > The call pays $3.5981$ on the Euler path and $3.2050$ on the exact one, worth $e^{-0.04}(3.5981) = 3.4570$ and $3.0793$ today. One path proves nothing about bias, because each path is noisy. Averaged over many paths, the three-step scheme gives $E[S_T] = 100(1.013333)^3 = 104.0536$ against the true $100e^{0.04} = 104.0811$. With twelve steps the shortfall falls from $0.0275$ to $0.0069$, about a quarter, as weak order 1 predicts.

> [!example]- Exact and Euler Steps of the Vasicek Model {Example}
> A short rate follows the Vasicek model $dr = 0.15(0.05 - r)\,dt + 0.01\,dz$ under the risk-neutral measure, with $r_0 = 0.02$. Using the draw $Z = -1.5$, simulate $r_1$ with a single Euler step of one year and with the exact transition density. Explain the difference.
>
> > [!answer]-
> > The Euler step uses the drift and the volatility at $r_0$ for the whole year.
> > $$
> > \begin{align*}
> > r_1^{\text{EM}} &= 0.02 + 0.15(0.05 - 0.02)(1) + 0.01(-1.5) \\
> > &= 0.0095
> > \end{align*}
> > $$
> > The exact step uses $e^{-0.15} = 0.860708$ and the transition variance.
> > $$
> > \begin{align*}
> > E[r_1] &= 0.02(0.860708) + 0.05(0.139292) \\
> > &= 0.024179 \\
> > \text{SD}[r_1] &= 0.01\sqrt{\frac{1 - e^{-0.30}}{0.30}} \\
> > &= 0.009295 \\
> > r_1^{\text{exact}} &= 0.024179 - 1.5(0.009295) \\
> > &= 0.010237
> > \end{align*}
> > $$
> > The Euler mean, $0.0245$, overshoots because it keeps pulling toward $b$ at the full initial speed, and its standard deviation, $0.01$, ignores the mean reversion that damps shocks within the year. The exact draw is right for any step, so a model with a known transition density should be stepped with it.

> [!tip]- How it appears on the exam
> - **INV-201:** The objective asks candidates to "understand and apply numerical discretization methods to price options including Euler-Maruyama discretization and transition density methods". Expect to write the Euler scheme for a given SDE, take a few steps with given normal draws, and price an option from the simulated end values.
> - **Exact versus approximate:** Questions ask which models can be simulated exactly and how. GBM steps are lognormal, Vasicek steps are normal, and CIR steps are scaled noncentral chi-squared. The candidate then explains why an Euler step of CIR can go negative.
> - **Error analysis:** Written parts ask for the sources of error in a Monte Carlo price, how the bias and the standard error each respond to the step size and the number of paths, and why a barrier or lookback payoff needs finer steps than a European one.

> [!warning]- Exam traps
> - **The square root of the step:** The diffusion term is $b\sqrt{\Delta t}\,Z$, not $b\,\Delta t\,Z$. Using $\Delta t$ shrinks the volatility of a monthly step by a factor of $\sqrt{12}$ and badly underprices options.
> - **Which drift:** Use the risk-neutral drift $r$, or $r - q$ with a dividend yield, to price, and the real-world drift $\mu$ only to project. An option price simulated with $\mu$ is not an arbitrage-free price.
> - **Mixing the two GBM schemes:** The Euler step multiplies by $1 + r\Delta t + \sigma\sqrt{\Delta t}Z$, while the exact step multiplies by $e^{(r - \sigma^2/2)\Delta t + \sigma\sqrt{\Delta t}Z}$. Putting $-\tfrac12\sigma^2$ in the Euler factor, or leaving it out of the exponent, biases the drift.
> - **Same draws, same path:** When a question supplies draws for several steps, use them in the order given and do not reuse a draw across steps. For two correlated factors, build the second draw as $\rho Z_1 + \sqrt{1 - \rho^2}\,Z_2$.
> - **Discounting:** Discount the average payoff once at the risk-free rate over the whole term. With a stochastic short rate, each path's payoff is discounted along its own path, by $\exp(-\sum_k r_k\Delta t)$, before averaging.
