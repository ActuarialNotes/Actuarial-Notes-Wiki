---
aliases:
  - Modeling Smile
  - Local Volatility
verification:
  status: unverified
  confidence: null
  last_checked: null
  last_checked_by: null
  content_hash: sha256:e5a9e6bcddde74f4f211ac95b4ddaaf5cfcc98fa4890f765b74ba6e95bfb1491
  sources: []
  open_findings: 0
  open_critical: 0
  log: .verify/Concepts/Volatility Smile.md
---
A **volatility smile** is the pattern of [[Volatility|implied volatilities]] $\sigma_{\text{imp}}(K, T)$ across the strikes of options on the same underlying with the same expiry; laid out across both strike and maturity it is the **volatility surface**. Under the [[Black-Scholes Model|Black-Scholes]] lognormal model every option would show the same implied volatility, so the smile is the market's way of pricing a [[Risk-Neutral Valuation|risk-neutral]] distribution with a fatter left tail, a thinner right tail or fatter tails on both sides than the lognormal allows.

> $$C_{BS}\big(S_0, K, r, q, \sigma_{\text{imp}}(K, T), T\big) = C_{\text{market}}(K, T)$$

> $$Q(S_T < K) = e^{rT}\,\frac{\partial P}{\partial K}$$

> $$Q(S_T < K) = N(-d_2) + e^{rT}\,\text{Vega}\cdot\frac{\partial \sigma_{\text{imp}}}{\partial K}$$

> $$\sigma_{\text{loc}}^2(K, T) = \frac{\dfrac{\partial C}{\partial T} + (r - q)K\dfrac{\partial C}{\partial K} + qC}{\tfrac12K^2\,\dfrac{\partial^2 C}{\partial K^2}}$$

- **Symbols:** $C$ and $P$ are market call and put prices as functions of strike $K$ and expiry $T$, $q$ is the dividend yield, $Q$ is the risk-neutral measure, and $d_2$ and Vega are evaluated at the strike's own implied volatility. The last block is **Dupire's formula** for the local volatility $\sigma_{\text{loc}}(S, t)$ that reproduces every quoted price.
- **Smile and skew:** Equity index options have shown a downward-sloping **skew** since the 1987 crash: out-of-the-money puts trade at higher implied volatilities than at-the-money options, and out-of-the-money calls at lower ones. Currency options show a more symmetric smile, high at both wings, because large moves in either direction are more likely than the lognormal says. Hull explains the equity skew by leverage, since a fall in the stock raises the firm's debt-to-equity ratio and so its volatility, and by "crashophobia", the premium traders put on crash protection.
- **Stylized facts:** Derman and Miller list the regularities a smile model has to explain. For equity indexes the skew is steeper at short expiries and flatter at long ones, at-the-money implied volatility tends to rise when the index falls, and implied volatility usually sits above the volatility later realized. The surface also moves when the index moves, and how it moves, by strike or by moneyness, decides an option's hedge ratio.
- **Local volatility:** Volatility is a deterministic function $\sigma(S, t)$ of the index level and time, fitted to the whole surface by Dupire's formula. The market stays complete and is hedged with the underlying alone. Derman's rule of thumb is that implied volatility at strike $K$ is roughly the average of local volatility between $S$ and $K$, so local volatility varies with the index level about twice as fast as implied volatility varies with strike. Its forward smiles flatten too quickly, which misprices forward-starting and cliquet options.
- **Stochastic volatility:** Variance follows its own mean-reverting process, and a negative correlation between the index and its variance produces the equity skew. This is the [[Stochastic Volatility|stochastic volatility]] approach. It gives realistic smile dynamics and long-dated skews, but it fits short-dated skews poorly and leaves the market incomplete.
- **Jump-diffusion:** Merton's model adds Poisson-timed jumps in the price to the diffusion, with a [[Poisson Process|Poisson process]] for the timing and lognormal jump sizes. Negative mean jumps produce the steep short-dated skew that diffusions cannot. Because jumps cannot be hedged continuously with the underlying, the hedge is imperfect.

> [!example]- Implied Volatilities from Three Put Quotes {Example}
> An equity index is at $S_0 = 100$, with $r = 0.03$ and no dividends. Six-month European puts trade at $0.55$ for $K = 80$, $1.84$ for $K = 90$ and $4.88$ for $K = 100$. Show that the at-the-money put has an implied volatility of $20\%$. Given that the other two quotes solve to $22\%$ and $24\%$, compare them with the lognormal prices at a flat $20\%$, which are $0.24$ and $1.46$, and say what the pattern means.
>
> > [!answer]-
> > At $K = 100$ and $\sigma = 0.20$, $\sigma\sqrt{T} = 0.141421$.
> > $$
> > \begin{align*}
> > d_1 &= \frac{\ln 1 + (0.03 + 0.02)(0.5)}{0.141421} \\
> > &= 0.17678 \\
> > d_2 &= 0.17678 - 0.141421 \\
> > &= 0.03536 \\
> > P &= 100e^{-0.015}N(-0.03536) - 100N(-0.17678) \\
> > &= 98.5112(0.485898) - 100(0.429842) \\
> > &= 4.8822
> > \end{align*}
> > $$
> > This matches the quote, so $\sigma_{\text{imp}}(100) = 20\%$. The 90 put trades at $1.84$ against $1.46$ lognormal, $26\%$ more, and the 80 put at $0.55$ against $0.24$, more than double. Implied volatility rises by about $0.2$ points for each point the strike falls, a downward skew. The market prices a 20% fall as far more likely than a lognormal distribution with the at-the-money volatility would, which is the left tail an insurer selling guarantees is exposed to.

> [!example]- What the Skew Says About a 20% Fall {Example}
> Using the quotes in the first example, the implied volatility is $24\%$ at $K = 80$ with a slope of $\partial\sigma_{\text{imp}}/\partial K = -0.002$ per point of strike. At $24\%$, $d_2 = 1.3184$ and the put's vega is $9.3222$. Find the risk-neutral probability that the index ends below 80, and compare it with the lognormal probability at a flat $20\%$, for which $d_2 = 1.6132$.
>
> > [!answer]-
> > The put's price depends on the strike directly and through the strike's implied volatility, so both terms enter.
> > $$
> > \begin{align*}
> > Q(S_T < 80) &= N(-1.3184) + e^{0.015}(9.3222)(-0.002) \\
> > &= 0.093681 - 0.018926 \\
> > &= 0.0748 \\
> > Q_{\text{flat}}(S_T < 80) &= N(-1.6132) \\
> > &= 0.0533
> > \end{align*}
> > $$
> > The skew raises the risk-neutral chance of a 20% fall in six months from about $5.3\%$ to $7.5\%$, roughly $40\%$ more. Reading $N(-d_2)$ at the strike's own volatility, $9.4\%$, would overstate it, because the slope of the skew pulls part of that probability back. A local volatility, stochastic volatility or jump model is calibrated to reproduce this extra left-tail mass.

> [!tip]- How it appears on the exam
> - **INV-201:** The objective asks candidates to "define and explain the concept of volatility smiles and describe several approaches for modeling smiles, including stochastic volatility, local-volatility, jump-diffusions", read in Hull's chapter on volatility smiles and Derman and Miller's chapters on stylized facts and smile models.
> - **Explanations:** Expect written questions on why the equity skew exists and why currency smiles are more symmetric, on what the smile implies about the risk-neutral distribution, and on how each model family produces a smile and where it falls short.
> - **Calculations:** Calculation parts back out an implied volatility from a quote, compare quoted prices with flat-volatility prices, or turn a skew into a risk-neutral tail probability, as in the examples.

> [!warning]- Exam traps
> - **Implied is not realized:** The smile is a property of option prices, not of the index's historical returns. A flat realized volatility does not mean the options should be priced at one implied volatility.
> - **Which volatility to use:** Price each option at its own strike's implied volatility. Pricing a 20% out-of-the-money put at the at-the-money volatility undervalues crash protection, and guarantees with it.
> - **Skew versus smile:** The equity index pattern is a skew, falling with strike, while a currency pattern is a smile, rising at both ends. Describing the equity skew as symmetric gets the direction of the extra tail mass wrong.
> - **Local is not implied:** Local volatility is the instantaneous volatility at a given level and time, while implied volatility is a price-averaged number for one option. Local volatility changes about twice as fast with level as implied volatility changes with strike, so the two cannot be swapped.
