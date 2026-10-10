---
aliases:
  - Arrow-Debreau Security
  - Incomplete Market
verification:
  status: unverified
  confidence: null
  last_checked: null
  last_checked_by: null
  content_hash: sha256:0fd3f97a4df51d2c8b632e70926d91715afe4df43baf378143a3708794c0120f
  sources: []
  open_findings: 0
  open_critical: 0
  log: .verify/Concepts/Arrow-Debreu Security.md
---
An **Arrow-Debreu security** (a pure security or state-contingent claim) pays 1 at time $T$ if one particular state of the world $\omega$ occurs and nothing otherwise. Its price $\psi_\omega$ is the **state price** of that state. Any payoff is a bundle of these securities, so state prices price every claim, and scaled up by the risk-free growth factor they are the [[Risk-Neutral Valuation|risk-neutral probabilities]]. A market is **complete** when its traded assets can replicate every Arrow-Debreu security, and **incomplete** when they cannot.

> $$V_0 = \sum_{\omega} \psi_\omega\,X_\omega$$

> $$\sum_{\omega} \psi_\omega = e^{-rT}$$

> $$q_\omega = e^{rT}\,\psi_\omega$$

> $$\psi(K) = e^{-rT}\,\frac{\partial^2 C}{\partial K^2}$$

- **Symbols:** $X_\omega$ is the payoff of a claim in state $\omega$, and $\psi_\omega > 0$ is the price today of 1 paid in that state. The riskless bond pays 1 in every state, so it is the sum of all the Arrow-Debreu securities, which gives the second block. Dividing each state price by that sum gives probabilities $q_\omega$ that are positive and sum to 1, and under them $V_0 = e^{-rT}E^{\mathbb{Q}}[X]$.
- **Finding state prices:** With $n$ states and traded assets of known prices and payoffs, the state prices solve the linear system that prices each traded asset, $\sum_\omega \psi_\omega X^{(j)}_\omega = V^{(j)}_0$. A [[Replicating Portfolio|replicating portfolio]] for a single Arrow-Debreu security is the same calculation viewed from the other side.
- **Fundamental theorem of asset pricing:** There is no arbitrage if and only if strictly positive state prices exist, which is the same as the existence of an equivalent [[Martingale|martingale]] measure. The market is complete if and only if those state prices, and hence $\mathbb{Q}$, are unique.
- **Complete markets:** In a one-period market with $n$ states, completeness requires $n$ traded assets with linearly independent payoffs. In the [[Binomial Option Pricing Model|binomial model]] a stock and a bond span the two states at each node, and in the [[Black-Scholes Model|Black-Scholes-Merton]] model continuous trading in the stock and bond spans every payoff, so every option has one price.
- **Incomplete markets:** When there are more sources of risk than traded assets, many sets of state prices fit the traded prices, so a claim has a range of no-arbitrage prices rather than one. Jumps in the asset price, [[Stochastic Volatility|stochastic volatility]], untraded variables such as weather, and [[Insurance Risk|insurance risks]] such as mortality, lapse and policyholder behaviour all cause incompleteness. Pricing there requires a choice of measure, such as a market price for the unhedgeable risk, a utility function or a cost-of-capital margin.
- **Continuous states:** When the state is the terminal stock price, the state-price density is the second derivative of the call price with respect to strike (fourth block), the Breeden-Litzenberger result. This is how a [[Volatility Smile|volatility smile]] is read as a risk-neutral distribution of $S_T$.

> [!example]- State Prices in a Two-State Market and the Price of a Call {Example}
> A non-dividend stock at 100 will be worth 120 or 90 in one year, and $r = 0.05$ continuously compounded. Find the two state prices and the risk-neutral probabilities, then price a one-year European call with strike 105.
>
> > [!answer]-
> > The bond and the stock give two equations in $\psi_u$ and $\psi_d$.
> > $$
> > \begin{align*}
> > \psi_u + \psi_d &= e^{-0.05} = 0.951229 \\
> > 120\,\psi_u + 90\,\psi_d &= 100 \\
> > 30\,\psi_u &= 100 - 90(0.951229) \\
> > \psi_u &= 0.479645 \\
> > \psi_d &= 0.951229 - 0.479645 \\
> > &= 0.471584
> > \end{align*}
> > $$
> > The risk-neutral probabilities are $q_u = e^{0.05}(0.479645) = 0.50424$ and $q_d = 0.49576$. The call pays 15 in the up state only.
> > $$
> > \begin{align*}
> > C &= 15\,\psi_u + 0\,\psi_d \\
> > &= 15(0.479645) \\
> > &= 7.19
> > \end{align*}
> > $$
> > The call is worth 7.19, the same as the binomial risk-neutral price, because state prices are the risk-neutral probabilities discounted at $r$.

> [!example]- An Incomplete Market Gives a Range of Prices {Example}
> A stock at 100 will be worth 125, 105 or 85 in one year, and a zero-coupon bond paying 1 in every state costs 0.95. Only the stock and the bond trade. Find all positive state prices consistent with these prices, and the range of no-arbitrage prices for a call with strike 105.
>
> > [!answer]-
> > Two equations constrain three state prices, so one is free. Write the others in terms of $\psi_1$, the price of the top state.
> > $$
> > \begin{align*}
> > \psi_1 + \psi_2 + \psi_3 &= 0.95 \\
> > 125\,\psi_1 + 105\,\psi_2 + 85\,\psi_3 &= 100 \\
> > \psi_2 &= 0.9625 - 2\psi_1 \\
> > \psi_3 &= \psi_1 - 0.0125
> > \end{align*}
> > $$
> > Positivity needs $\psi_3 > 0$ and $\psi_2 > 0$, so $0.0125 < \psi_1 < 0.48125$. The call pays 20 in the top state only, so its price is $20\psi_1$.
> > $$
> > \begin{align*}
> > 20(0.0125) &< C < 20(0.48125) \\
> > 0.25 &< C < 9.625
> > \end{align*}
> > $$
> > Any price in that interval is free of arbitrage, and the market alone cannot choose one. If the call itself traded at, say, 4.00, it would fix $\psi_1 = 0.20$, then $\psi_2 = 0.5625$ and $\psi_3 = 0.1875$, and the market would become complete.

> [!tip]- How it appears on the exam
> - **INV-201:** The syllabus asks candidates to understand Arrow-Debreu securities and the distinction between complete and incomplete markets, next to the objective on no-arbitrage and replication. The readings are Campolieti's chapter 5 and Hull's chapters on forward pricing and binomial trees.
> - **State-price calculations:** A question gives a one-period market with two or three states and asks for the state prices, the risk-neutral probabilities, or the price of a call, put or digital payoff built from them. It may also ask candidates to show an arbitrage when a state price would be negative.
> - **Completeness:** A question asks whether a given set of assets spans all the states, or for the range of no-arbitrage prices of a claim that they do not span.
> - **Written answers:** Candidates may be asked why insurance liabilities, jump risk or stochastic volatility make a market incomplete, and what that means for pricing and hedging a guarantee.

> [!warning]- Exam traps
> - **State prices are not probabilities:** State prices sum to the discount factor $e^{-rT}$, not to 1. Treating them as probabilities and discounting again counts the discounting twice.
> - **A negative state price means arbitrage:** If the system gives a negative $\psi_\omega$, the market is not arbitrage-free. Report the arbitrage rather than pricing with a negative weight.
> - **Counting assets, not states:** Three assets do not make a three-state market complete if their payoffs are linearly dependent. A call that is a combination of the stock and the bond adds nothing.
> - **Incomplete does not mean any price:** In an incomplete market the price of an unspanned claim is still bounded by the cheapest super-replicating and the dearest sub-replicating portfolios. A price outside those bounds is an arbitrage.
