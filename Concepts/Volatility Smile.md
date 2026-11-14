---
aliases:
  - Modeling Smile
  - Local Volatility
verification:
  status: unverified
  confidence: null
  last_checked: null
  last_checked_by: null
  content_hash: sha256:33b85f62f85fa3f73971d33427e7bbfd62d61a3b69f58c75178d860c42ea28ca
  sources: []
  open_findings: 0
  open_critical: 0
  log: .verify/Concepts/Volatility Smile.md
---
A **Volatility Smile** is the pattern of [[Volatility|implied volatilities]] $\sigma_{\text{imp}}(K, T)$ across the strikes $K$ of options on the same underlying with the same expiry $T$. Laid out across both strike and maturity, it is the **volatility surface**.

The implied volatility of a strike is the volatility at which the [[Black-Scholes Model|Black-Scholes]] price matches the market price, so it solves

> $$C_{BS}\big(S_0, K, r, q, \sigma_{\text{imp}}(K, T), T\big) = C_{\text{market}}(K, T)$$

- $S_0$ is the underlying's price, $r$ the risk-free rate and $q$ the dividend yield.

Under the Black-Scholes lognormal model every option would show the same implied volatility. The smile is the market's way of pricing a [[Risk-Neutral Valuation|risk-neutral]] distribution with a fatter left tail, a thinner right tail or fatter tails on both sides than the lognormal allows. It is a property of option prices, not of the index's historical returns, so a flat realized volatility does not mean the options should be priced at one implied volatility.

## Smile and skew

Equity index options have shown a downward-sloping **skew** since the 1987 crash. Out-of-the-money puts trade at higher implied volatilities than at-the-money options, and out-of-the-money calls at lower ones. Hull explains the equity skew by leverage, since a fall in the stock raises the firm's debt-to-equity ratio and so its volatility, and by "crashophobia", the premium traders put on crash protection.

Currency options show a more symmetric smile, high at both wings, because large moves in either direction are more likely than the lognormal says.

> [!example]- What do these three put quotes say about the index's implied volatility? {Example}
> An equity index is at $S_0 = 100$, with $r = 0.03$ and no dividends. Six-month European puts trade at:
>
> | Strike | Market price | Implied volatility | Price at a flat $20\%$ |
> | ---: | ---: | ---: | ---: |
> | 80 | 0.55 | $24\%$ | 0.24 |
> | 90 | 1.84 | $22\%$ | 1.46 |
> | 100 | 4.88 | ? | 4.88 |
>
> > [!answer]-
> > - At $K = 100$ and $\sigma = 0.20$, $\sigma\sqrt{T} = 0.141421$.
> > - $d_1 = (\ln 1 + (0.03 + 0.02)(0.5))/0.141421 = 0.17678$, and $d_2 = 0.03536$.
> > - $P = 100e^{-0.015}N(-0.03536) - 100N(-0.17678) = 98.5112(0.485898) - 100(0.429842) = 4.8822$, which matches the quote, so $\sigma_{\text{imp}}(100) = 20\%$.
> > - The 90 put trades $26\%$ above its flat-volatility price, and the 80 put at more than double.
> > - Implied volatility rises by about $0.2$ points for each point the strike falls, a downward skew.
> > - The market prices a 20% fall as far more likely than a lognormal distribution with the at-the-money volatility would. That is the left tail an insurer selling guarantees is exposed to.

## Stylized facts

Derman and Miller list the regularities a smile model has to explain. For equity indexes the skew is steeper at short expiries and flatter at long ones, at-the-money implied volatility tends to rise when the index falls, and implied volatility usually sits above the volatility later realized. The surface also moves when the index moves, and how it moves, by strike or by moneyness, decides an option's hedge ratio.

## The risk-neutral distribution implied by the smile

The risk-neutral probability $Q$ that the underlying ends below a strike is read off the slope of market put prices $P$ in the strike, which is

> $$Q(S_T < K) = e^{rT}\,\frac{\partial P}{\partial K}$$

A put's price depends on the strike directly and through the strike's implied volatility, so in Black-Scholes terms the probability is

> $$Q(S_T < K) = N(-d_2) + e^{rT}\,\text{Vega}\cdot\frac{\partial \sigma_{\text{imp}}}{\partial K}$$

- $d_2$ and Vega are evaluated at the strike's own implied volatility.

> [!example]- Under the skew of the put quotes above, what is the risk-neutral probability that the index ends below 80? {Example}
> The implied volatility is $24\%$ at $K = 80$, with a slope of $\partial\sigma_{\text{imp}}/\partial K = -0.002$ per point of strike. At $24\%$, $d_2 = 1.3184$ and the put's vega is $9.3222$. At a flat $20\%$, $d_2 = 1.6132$.
>
> > [!answer]-
> > - $Q(S_T < 80) = N(-1.3184) + e^{0.015}(9.3222)(-0.002) = 0.093681 - 0.018926 = 0.0748$.
> > - At a flat $20\%$, $Q(S_T < 80) = N(-1.6132) = 0.0533$.
> > - The skew raises the risk-neutral probability of a 20% fall in six months from about $5.3\%$ to $7.5\%$, roughly $40\%$ more.
> > - Reading $N(-d_2)$ at the strike's own volatility, $9.4\%$, would overstate it, because the slope of the skew pulls part of that probability back.

## Local volatility

In a local volatility model, volatility is a deterministic function $\sigma_{\text{loc}}(S, t)$ of the index level and time, fitted to the whole surface. **Dupire's formula** gives the local volatility that reproduces every quoted call price $C(K, T)$, which is

> $$\sigma_{\text{loc}}^2(K, T) = \frac{\dfrac{\partial C}{\partial T} + (r - q)K\dfrac{\partial C}{\partial K} + qC}{\tfrac12K^2\,\dfrac{\partial^2 C}{\partial K^2}}$$

The market stays complete and is hedged with the underlying alone. Derman's rule of thumb is that implied volatility at strike $K$ is roughly the average of local volatility between $S$ and $K$. So local volatility varies with the index level about twice as fast as implied volatility varies with strike, and the two cannot be swapped. Local volatility's forward smiles flatten too quickly, which misprices forward-starting and cliquet options.

## Stochastic volatility

In the [[Stochastic Volatility|stochastic volatility]] approach, variance follows its own mean-reverting process, and a negative correlation between the index and its variance produces the equity skew. It gives realistic smile dynamics and long-dated skews, but it fits short-dated skews poorly and leaves the market incomplete.

## Jump-diffusion

Merton's jump-diffusion model adds jumps in the price to the diffusion, with a [[Poisson Process|Poisson process]] for their timing and lognormal jump sizes. Negative mean jumps produce the steep short-dated skew that diffusions cannot. Because jumps cannot be hedged continuously with the underlying, the hedge is imperfect.

> [!trap] Pricing every strike at the at-the-money volatility
> Price each option at its own strike's implied volatility. Pricing a 20% out-of-the-money put at the at-the-money volatility undervalues crash protection, and the guarantees that contain it.
