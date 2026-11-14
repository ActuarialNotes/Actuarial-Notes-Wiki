---
aliases:
  - Arrow-Debreau Security
  - Incomplete Market
verification:
  status: unverified
  confidence: null
  last_checked: null
  last_checked_by: null
  content_hash: sha256:125fc9246542c1d99e9b9f040d86b3748e2827e666ab83dfb4b45b07d3845ef2
  sources: []
  open_findings: 0
  open_critical: 0
  log: .verify/Concepts/Arrow-Debreu Security.md
---

An **Arrow-Debreu Security** (a pure security or state-contingent claim) pays 1 at time $T$ if one particular state of the world $\omega$ occurs and nothing otherwise. Its price today, $\psi_\omega$, is the **state price** of that state.

Any payoff is a bundle of these securities, so the price today of a claim that pays $X_\omega$ in state $\omega$ is

> $$V_0 = \sum_{\omega} \psi_\omega\,X_\omega$$

- $\psi_\omega > 0$ for every state.

The riskless bond pays 1 in every state, so it is the sum of all the Arrow-Debreu securities, and the state prices sum to the discount factor:

> $$\sum_{\omega} \psi_\omega = e^{-rT}$$

- $r$ is the continuously compounded risk-free rate.

Dividing each state price by that sum gives probabilities that are positive and sum to 1. These are the [[Risk-Neutral Valuation|risk-neutral probabilities]], and the risk-neutral probability of state $\omega$ is

> $$q_\omega = e^{rT}\,\psi_\omega$$

Under them, $V_0 = e^{-rT}E^{\mathbb{Q}}[X]$.

With $n$ states and traded assets of known prices and payoffs, the state prices solve the linear system that prices each traded asset $j$:

> $$\sum_\omega \psi_\omega\,X^{(j)}_\omega = V^{(j)}_0$$

- $X^{(j)}_\omega$ is the payoff of asset $j$ in state $\omega$.
- $V^{(j)}_0$ is the price today of asset $j$.

A [[Replicating Portfolio|replicating portfolio]] for a single Arrow-Debreu security is the same calculation viewed from the other side.

> [!example]- What are the state prices in this market, and what is the price of the call? {Example}
> A non-dividend-paying stock at 100 will be worth 120 or 90 in one year, and $r = 0.05$ continuously compounded. A one-year European call has strike 105.
>
> > [!answer]-
> > - The bond gives $\psi_u + \psi_d = e^{-0.05} = 0.951229$.
> > - The stock gives $120\,\psi_u + 90\,\psi_d = 100$.
> > - Substituting, $30\,\psi_u = 100 - 90(0.951229)$, so $\psi_u = 0.479645$.
> > - Then $\psi_d = 0.951229 - 0.479645 = 0.471584$.
> > - The risk-neutral probabilities are $q_u = e^{0.05}(0.479645) = 0.50424$ and $q_d = 0.49576$.
> > - The call pays 15 in the up state only, so $C = 15(0.479645) = 7.19$.
> > - This is the binomial risk-neutral price, because state prices are the risk-neutral probabilities discounted at $r$.

## The fundamental theorem of asset pricing

There is no arbitrage if and only if strictly positive state prices exist, which is the same as the existence of an equivalent [[Martingale|martingale]] measure. The market is complete if and only if those state prices, and hence $\mathbb{Q}$, are unique. If the system gives a negative $\psi_\omega$, the market is not arbitrage-free, and the arbitrage is reported rather than a price computed with a negative weight.

## Complete and incomplete markets

A market is **complete** when its traded assets can replicate every Arrow-Debreu security, and **incomplete** when they cannot. In a one-period market with $n$ states, completeness requires $n$ traded assets with linearly independent payoffs. Three assets do not make a three-state market complete if their payoffs are linearly dependent: a call that is a combination of the stock and the bond adds nothing. In the [[Binomial Option Pricing Model|binomial model]] a stock and a bond span the two states at each node. In the [[Black-Scholes Model|Black-Scholes-Merton]] model continuous trading in the stock and bond spans every payoff, so every option has one price.

When there are more sources of risk than traded assets, many sets of state prices fit the traded prices, so a claim has a range of no-arbitrage prices rather than one. The range is bounded by the cheapest super-replicating and the dearest sub-replicating portfolios, and a price outside those bounds is an arbitrage. Jumps in the asset price, [[Stochastic Volatility|stochastic volatility]], untraded variables such as weather, and [[Insurance Risk|insurance risks]] such as mortality, lapse and policyholder behaviour all cause incompleteness. Pricing there requires a choice of measure, such as a market price for the unhedgeable risk, a utility function or a cost-of-capital margin.

> [!example]- What is the range of no-arbitrage prices for this call? {Example}
> A stock at 100 will be worth 125, 105 or 85 in one year, and a zero-coupon bond paying 1 in every state costs 0.95. Only the stock and the bond trade. A one-year call has strike 105.
>
> > [!answer]-
> > - The bond gives $\psi_1 + \psi_2 + \psi_3 = 0.95$.
> > - The stock gives $125\,\psi_1 + 105\,\psi_2 + 85\,\psi_3 = 100$.
> > - Two equations constrain three state prices, so one is free. In terms of $\psi_1$, the price of the top state, $\psi_2 = 0.9625 - 2\psi_1$ and $\psi_3 = \psi_1 - 0.0125$.
> > - Positivity of $\psi_2$ and $\psi_3$ needs $0.0125 < \psi_1 < 0.48125$.
> > - The call pays 20 in the top state only, so its price is $20\,\psi_1$.
> > - Any price with $0.25 < C < 9.625$ is free of arbitrage, and the market alone cannot choose one.
> > - If the call itself traded at 4.00, it would fix $\psi_1 = 0.20$, $\psi_2 = 0.5625$ and $\psi_3 = 0.1875$, and the market would become complete.

## The state-price density

When the state is the terminal stock price, the state-price density at a terminal price $K$ is the second derivative of the call price $C$ with respect to strike, the Breeden-Litzenberger result:

> $$\psi(K) = \frac{\partial^2 C}{\partial K^2}$$

As with discrete states, the risk-neutral density of $S_T$ at $K$ is $e^{rT}\,\psi(K)$. This is how a [[Volatility Smile|volatility smile]] is read as a risk-neutral distribution of $S_T$.

> [!trap] Treating state prices as probabilities
> State prices sum to the discount factor $e^{-rT}$, not to 1. Treating them as probabilities and discounting again counts the discounting twice. Multiply by $e^{rT}$ first to get the risk-neutral probabilities.
