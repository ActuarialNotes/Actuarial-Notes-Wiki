---
verification:
  status: unverified
  confidence: null
  last_checked: null
  last_checked_by: null
  content_hash: sha256:7d10aadc75e1e71f54a409f705bedfbd21d58abc2243668c1f39e4e5dc61e06f
  sources: []
  open_findings: 0
  open_critical: 0
  log: .verify/Concepts/Stochastic Volatility.md
---

**Stochastic volatility** models let the variance of an asset's return follow its own random, mean-reverting process instead of being the constant $\sigma^2$ of the [[Black-Scholes Model|Black-Scholes]] model. In the Heston model the variance $v_t$ is driven by a second Brownian motion correlated with the asset's, and a negative correlation produces the downward equity skew in the [[Volatility Smile|volatility smile]].

> $$dS_t = (r - q)S_t\,dt + \sqrt{v_t}\,S_t\,dW_t^{(1)}$$

> $$dv_t = \kappa(\theta - v_t)\,dt + \xi\sqrt{v_t}\,dW_t^{(2)}$$

> $$dW_t^{(1)}\,dW_t^{(2)} = \rho\,dt$$

> $$E\left[\frac{1}{T}\int_0^T v_t\,dt\right] = \theta + (v_0 - \theta)\,\frac{1 - e^{-\kappa T}}{\kappa T}$$

- **Symbols:** Under the [[Risk-Neutral Valuation|risk-neutral]] measure, $r$ is the risk-free rate and $q$ the dividend yield. $v_t$ is the instantaneous variance, so $\sqrt{v_t}$ is the instantaneous [[Volatility|volatility]], $\theta$ is its long-run level, $\kappa$ the speed at which it reverts there, $\xi$ the volatility of variance, and $\rho$ the [[Correlation|correlation]] between the two Brownian motions. The last block is the expected average variance over $[0, T]$, which sets the level of option prices of that maturity.
- **Where the skew comes from:** With $\rho < 0$, falls in the index come with rises in variance, so paths that fall keep falling at a higher volatility while paths that rise calm down. The risk-neutral distribution gets a fatter left tail and a thinner right tail, out-of-the-money puts become dearer and out-of-the-money calls cheaper, and the implied volatility falls with strike. With $\rho = 0$ the model produces a symmetric smile, and $\xi$ sets its curvature.
- **Term structure:** Mean reversion pulls expected variance toward $\theta$, so when current volatility is high the implied volatility term structure slopes down, and when it is low the term structure slopes up. Over long maturities the smile flattens, because averaging over many independent variance shocks makes the return closer to normal.
- **Incompleteness:** The variance is not a traded asset, so with two sources of risk and one traded underlying the market is incomplete. A delta hedge in the index leaves the volatility risk open, the risk-neutral drift of $v$ includes a market price of volatility risk that the model cannot infer from the index alone, and the parameters are found by [[Model Calibration|calibration]] to option prices. A volatility exposure is hedged with other options, through vega.
- **Feller condition:** When $2\kappa\theta \geq \xi^2$ the variance stays strictly positive. When it fails the variance can reach zero, and in a simulation the Euler step can make it negative, so it is truncated, for example by using $\max(v, 0)$ in the drift and the diffusion.
- **Pricing:** Heston has a semi-closed form for European options through its characteristic function. Path-dependent payoffs such as variable annuity guarantees are priced by Monte Carlo with an [[Euler-Maruyama Discretization|Euler-Maruyama]] scheme, stepping $\ln S$ and $v$ together with correlated normal draws $Z_2 = \rho Z_1 + \sqrt{1 - \rho^2}\,Z_\perp$. When $\rho = 0$, Hull and White showed that the option price is the Black-Scholes price averaged over the distribution of the average variance, so the expected average variance gives a first approximation.
- **Compared with local volatility:** Local volatility fits today's whole surface exactly but predicts forward smiles that flatten too fast. Stochastic volatility gives more realistic smile dynamics and long-dated skews, but it struggles to fit very steep short-dated skews, which is why jumps are often added.

> [!example]- One Euler Step of Heston and the Effect of Correlation {Example}
> An index follows the Heston model under the risk-neutral measure with $S_0 = 100$, $r = 0.03$, $q = 0$, $v_0 = 0.04$, $\kappa = 1.5$, $\theta = 0.05$ and $\xi = 0.4$. Take one Euler step of $\Delta t = \tfrac{1}{12}$, stepping $\ln S$, with the independent draws $Z_1 = -1.5$ and $Z_\perp = 0.3$. Find $S_1$ and $v_1$ when $\rho = -0.7$ and when $\rho = 0$, and explain what the difference does to the price of a 3-month put struck at 85.
>
> > [!answer]-
> > Here $\sqrt{v_0\Delta t} = 0.057735$, so the index step is the same under either correlation.
> > $$
> > \begin{align*}
> > \ln\frac{S_1}{S_0} &= (0.03 - 0.02)\tfrac{1}{12} + 0.057735(-1.5) \\
> > &= -0.085769 \\
> > S_1 &= 91.78
> > \end{align*}
> > $$
> > The variance draw is $Z_2 = \rho Z_1 + \sqrt{1 - \rho^2}\,Z_\perp$. Its drift is $1.5(0.05 - 0.04)/12 = 0.00125$ and its diffusion is $0.4(0.057735) = 0.023094$ per unit draw.
> > $$
> > \begin{align*}
> > Z_2 &= -0.7(-1.5) + 0.714143(0.3) \\
> > &= 1.264243 \\
> > v_1 &= 0.04 + 0.00125 + 0.023094(1.264243) \\
> > &= 0.07045
> > \end{align*}
> > $$
> > With $\rho = 0$, $Z_2 = 0.3$ and $v_1 = 0.04 + 0.00125 + 0.006928 = 0.04818$. After the same 8% fall, volatility for the next step is $\sqrt{0.07045} = 26.5\%$ with $\rho = -0.7$ against $21.9\%$ with $\rho = 0$. Had the index risen on $Z_1 = +1.5$, the negative correlation would have cut volatility to $14.8\%$. Paths heading toward the 85 strike therefore spread out faster, which puts more risk-neutral probability below the strike and raises the put's price relative to the uncorrelated model, the skew in action.

> [!example]- Expected Average Variance After a Volatility Spike {Example}
> After a market fall, an index's current variance is $v_0 = 0.09$, a volatility of $30\%$. The Heston parameters are $\kappa = 2$ and $\theta = 0.04$, a long-run volatility of $20\%$. Estimate the volatility that sets the level of 1-year option prices, which a target volatility fund or guarantee hedge would face over the year.
>
> > [!answer]-
> > $$
> > \begin{align*}
> > \bar v &= 0.04 + (0.09 - 0.04)\,\frac{1 - e^{-2}}{2} \\
> > &= 0.04 + 0.05(0.432332) \\
> > &= 0.061617 \\
> > \sqrt{\bar v} &= 0.2482
> > \end{align*}
> > $$
> > The 1-year volatility is about $24.8\%$, between today's $30\%$ and the long-run $20\%$, because variance is expected to revert during the year. Shorter options see more of the spike and longer ones less, so the implied volatility term structure slopes down. With $\rho = 0$, pricing a 1-year at-the-money option at $24.8\%$ is the first approximation to the stochastic volatility price.

> [!tip]- How it appears on the exam
> - **INV-201:** Stochastic volatility is one of the smile models named in the objective "describe several approaches for modeling smiles, including stochastic volatility, local-volatility, jump-diffusions". Expect written questions on how the correlation produces the skew, why the market becomes incomplete, and how the model compares with local volatility and jump-diffusion.
> - **Simulation:** Under the numerical discretization objective, a question may ask for an Euler step of a two-factor model with correlated draws, as in the first example, or for the scheme and its treatment of negative variance.
> - **Hedging links:** The derivatives-applications section asks about realized versus implied volatility and about volatility risk in variable annuity guarantees, which stochastic volatility models are used to measure.

> [!warning]- Exam traps
> - **Variance, not volatility:** $v_t$ and $\theta$ are variances. A long-run level of $\theta = 0.04$ is a volatility of $20\%$, and using $0.04$ as the volatility in the price step understates it fivefold.
> - **Building the correlated draw:** The second draw is $\rho Z_1 + \sqrt{1 - \rho^2}\,Z_\perp$. Using $\rho Z_1 + (1 - \rho)Z_\perp$, or forgetting the second term, gives the variance shock the wrong variance.
> - **The sign of the correlation:** Negative $\rho$ makes out-of-the-money puts dearer and the skew downward. A positive $\rho$ does the reverse, and $\rho = 0$ gives a symmetric smile, not a skew.
> - **Negative variance:** An Euler step can take $v$ below zero, especially when the Feller condition fails. Taking the square root of a negative variance is an error, and the scheme must truncate or reflect it.
