---
verification:
  status: unverified
  confidence: null
  last_checked: null
  last_checked_by: null
  content_hash: sha256:44a05ae107e1fefdf31cefa5695d4971f42a35bbcac22652ee908f81e8bb399b
  sources: []
  open_findings: 0
  open_critical: 0
  log: .verify/Concepts/Stochastic Volatility.md
---
**Stochastic Volatility** is a model in which the variance of an asset's return follows its own random, mean-reverting process instead of being the constant $\sigma^2$ of the [[Black-Scholes Model|Black-Scholes]] model. In the Heston model the variance $v_t$ is driven by a second Brownian motion correlated with the asset's, and a negative correlation produces the downward equity skew in the [[Volatility Smile|volatility smile]].

Under the [[Risk-Neutral Valuation|risk-neutral]] measure, the dynamics of the asset price $S_t$ in the Heston model are

> $$dS_t = (r - q)S_t\,dt + \sqrt{v_t}\,S_t\,dW_t^{(1)}$$

- $r$ is the risk-free rate and $q$ the dividend yield.
- $\sqrt{v_t}$ is the instantaneous [[Volatility|volatility]].

The dynamics of its variance are

> $$dv_t = \kappa(\theta - v_t)\,dt + \xi\sqrt{v_t}\,dW_t^{(2)}$$

- $\theta$ is the long-run level of the variance, and $\kappa$ the speed at which it reverts there.
- $\xi$ is the volatility of variance.

The two Brownian motions are correlated, with

> $$dW_t^{(1)}\,dW_t^{(2)} = \rho\,dt$$

- $\rho$ is the [[Correlation|correlation]] between them.

Both $v_t$ and $\theta$ are variances: a long-run level of $\theta = 0.04$ is a volatility of $20\%$.

## Where the skew comes from

With $\rho < 0$, falls in the index come with rises in variance, so paths that fall keep falling at a higher volatility while paths that rise calm down. The risk-neutral distribution gets a fatter left tail and a thinner right tail. Out-of-the-money puts become dearer and out-of-the-money calls cheaper, so the implied volatility falls with strike. With $\rho = 0$ the model produces a symmetric smile, and $\xi$ sets its curvature.

## Simulating the model

Path-dependent payoffs such as variable annuity guarantees are priced by Monte Carlo with an [[Euler-Maruyama Discretization|Euler-Maruyama]] scheme, stepping $\ln S$ and $v$ together. The variance's draw $Z_2$ is built from the index's draw $Z_1$ and an independent draw $Z_\perp$, and is

> $$Z_2 = \rho Z_1 + \sqrt{1 - \rho^2}\,Z_\perp$$

When $2\kappa\theta \geq \xi^2$ (the **Feller condition**) the variance stays strictly positive. When it fails the variance can reach zero, and an Euler step can make it negative, so the scheme truncates it, for example by using $\max(v, 0)$ in the drift and the diffusion.

> [!example]- What does a negative correlation do to one Euler step of this index after a fall? {Example}
> An index follows the Heston model under the risk-neutral measure with $S_0 = 100$, $r = 0.03$, $q = 0$, $v_0 = 0.04$, $\kappa = 1.5$, $\theta = 0.05$ and $\xi = 0.4$. One Euler step of $\Delta t = \tfrac{1}{12}$, stepping $\ln S$, uses the independent draws $Z_1 = -1.5$ and $Z_\perp = 0.3$. Compare $\rho = -0.7$ with $\rho = 0$, and say what the difference does to the price of a 3-month put struck at 85.
>
> > [!answer]-
> > - $\sqrt{v_0\Delta t} = 0.057735$, and the index step is the same under either correlation.
> > - $\ln(S_1/S_0) = (0.03 - 0.02)\tfrac{1}{12} + 0.057735(-1.5) = -0.085769$, so $S_1 = 91.78$.
> > - The variance's drift is $1.5(0.05 - 0.04)/12 = 0.00125$, and its diffusion is $0.4(0.057735) = 0.023094$ per unit draw.
> > - With $\rho = -0.7$, $Z_2 = -0.7(-1.5) + 0.714143(0.3) = 1.264243$, so $v_1 = 0.04 + 0.00125 + 0.023094(1.264243) = 0.07045$, a volatility of $26.5\%$.
> > - With $\rho = 0$, $Z_2 = 0.3$, so $v_1 = 0.04 + 0.00125 + 0.006928 = 0.04818$, a volatility of $21.9\%$.
> > - Had the index risen on $Z_1 = +1.5$, the negative correlation would have cut volatility to $14.8\%$.
> > - Paths heading toward the 85 strike spread out faster with $\rho = -0.7$. That puts more risk-neutral probability below the strike, so the put is dearer than in the uncorrelated model.

## Term structure of volatility

Mean reversion pulls expected variance toward $\theta$, so the expected average variance over $[0, T]$, which sets the level of option prices of that maturity, is

> $$E\left[\frac{1}{T}\int_0^T v_t\,dt\right] = \theta + (v_0 - \theta)\,\frac{1 - e^{-\kappa T}}{\kappa T}$$

When current volatility is high the implied volatility term structure slopes down, and when it is low the term structure slopes up. Over long maturities the smile flattens, because averaging over many independent variance shocks makes the return closer to normal. When $\rho = 0$, Hull and White showed that the option price is the Black-Scholes price averaged over the distribution of the average variance, so the expected average variance gives a first approximation.

> [!example]- After a market fall, what volatility sets the level of 1-year option prices on this index? {Example}
> The index's current variance is $v_0 = 0.09$, a volatility of $30\%$. The Heston parameters are $\kappa = 2$ and $\theta = 0.04$, a long-run volatility of $20\%$.
>
> > [!answer]-
> > - The expected average variance is $0.04 + (0.09 - 0.04)(1 - e^{-2})/2 = 0.04 + 0.05(0.432332) = 0.061617$.
> > - Its square root is $0.2482$.
> > - The 1-year volatility is about $24.8\%$, between today's $30\%$ and the long-run $20\%$, because variance is expected to revert during the year.
> > - Shorter options see more of the spike and longer ones less, so the term structure slopes down.

## Incompleteness and hedging

The variance is not a traded asset, so with two sources of risk and one traded underlying the market is incomplete. A delta hedge in the index leaves the volatility risk open. The risk-neutral drift of $v$ includes a market price of volatility risk that the model cannot infer from the index alone, so the parameters are found by [[Model Calibration|calibration]] to option prices. A volatility exposure is hedged with other options, through vega. Heston has a semi-closed form for European options through its characteristic function.

## Compared with local volatility

Local volatility fits today's whole surface exactly but predicts forward smiles that flatten too fast. Stochastic volatility gives more realistic smile dynamics and long-dated skews, but it struggles to fit very steep short-dated skews, which is why jumps are often added.

> [!trap] Using variance as volatility
> $v_t$ and $\theta$ are variances. Using $\theta = 0.04$ as the volatility in the price step, rather than $\sqrt{0.04} = 20\%$, understates the volatility fivefold.
