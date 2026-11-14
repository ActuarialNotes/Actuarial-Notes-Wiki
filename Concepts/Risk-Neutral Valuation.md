---
aliases:
  - Risk Neutral
  - Risk-Neutral
verification:
  status: unverified
  confidence: null
  last_checked: null
  last_checked_by: null
  content_hash: sha256:3834c0d237724cfdcbf2d0c3a0e23f7255800a071bbf4ef806274413dc86a7bf
  sources: []
  open_findings: 0
  open_critical: 0
  log: .verify/Concepts/Risk-Neutral Valuation.md
---

**Risk-Neutral Valuation** prices a derivative as its [[Expected Value|expected]] payoff under the risk-neutral measure $\mathbb{Q}$, discounted at the risk-free rate $r$. The risk-neutral measure is the set of artificial probabilities under which every asset's expected total return is $r$, so every traded asset's discounted price is a martingale. The price today of a payoff $V_T$ at time $T$ is

> $$V_0 = e^{-rT}\, E^{\mathbb{Q}}\!\left[V_T\right]$$

- $E^{\mathbb{Q}}$ is the expectation under $\mathbb{Q}$.

The price reproduces the cost of the replicating portfolio, so it is the unique no-arbitrage price. The real-world expected return $\alpha$ never enters the price, and neither does the real-world probability of an up move. Real-world probabilities are paired with a risk-adjusted discount rate, and risk-neutral ones with $r$.

> [!example]- What is the 1-year European call with strike $105$ worth? {Example}
> A stock that pays no dividends is at $100$ and in one year moves to $120$ or $90$. The risk-free rate is $r = 0.05$, and the stock's real-world expected return is $\alpha = 0.10$.
>
> > [!answer]-
> > - The risk-neutral probability of an up move is $p^* = (e^{0.05} - 0.9)/(1.2 - 0.9) = 0.50424$.
> > - The call pays $15$ after an up move and $0$ after a down move.
> > - The call is worth $C = e^{-0.05}\left[0.50424(15) + 0.49576(0)\right] = 7.19$.
> > - The real-world probability $p = (e^{0.10} - 0.9)/0.3 = 0.68390$ discounted at $r$ would give $e^{-0.05}(0.68390)(15) = 9.76$, a price open to arbitrage.

## The binomial model

In a binomial model with steps of length $h$, the stock price is multiplied by $u$ or $d$ at each step. On a stock with continuous dividend yield $\delta$, the risk-neutral probability of an up move is

> $$p^* = \frac{e^{(r-\delta)h} - d}{u - d}$$

- $u$ and $d$ are the up and down factors.
- $d < e^{(r-\delta)h} < u$, which is exactly $0 < p^* < 1$ and is what no-arbitrage requires.

For a stock with no dividends, $\delta = 0$. Each step discounts by $e^{-rh}$, so a one-step price is $e^{-rh}\left[p^* V_u + (1 - p^*) V_d\right]$. The tree recombines: after $n$ steps with $k$ up moves the price is $S_0 u^k d^{n-k}$, whatever the order of the moves. A European option depends only on these terminal prices, so its price over $n$ steps is

> $$V_0 = e^{-rT} \sum_{k=0}^{n} \binom{n}{k} (p^*)^k (1-p^*)^{n-k}\, V\!\left(S_0 u^k d^{n-k}\right)$$

- $V(S)$ is the option's payoff when the stock price at expiry is $S$.

An American option needs node-by-node backward induction with an early-exercise check at each node.

> [!example]- What is the 1-year European put with strike $54$ worth? {Example}
> A stock at $50$ pays dividends continuously at $\delta = 0.02$, and $r = 0.06$. A two-period binomial tree with $h = 0.5$ uses $u = 1.15$ and $d = 0.90$.
>
> > [!answer]-
> > - The risk-neutral probability is $p^* = (e^{0.04(0.5)} - 0.90)/(1.15 - 0.90) = 0.48081$.
> > - The terminal prices are $S_{uu} = 66.125$, $S_{ud} = 51.75$ and $S_{dd} = 40.50$, with put payoffs $0$, $2.25$ and $13.50$.
> > - Two paths lead to $S_{ud}$, so its probability is $2p^*(1-p^*)$.
> > - The put is worth $P = e^{-0.06}\left[2p^*(1-p^*)(2.25) + (1-p^*)^2(13.50)\right] = e^{-0.06}(4.76244) = 4.49$.

## The Black-Scholes model

In the [[Black-Scholes Model|Black-Scholes model]], under $\mathbb{Q}$ the stock price follows

> $$\frac{dS_t}{S_t} = (r - \delta)\,dt + \sigma\, dW^{\mathbb{Q}}_t$$

- $\sigma$ is the stock's [[Volatility|volatility]].
- $W^{\mathbb{Q}}_t$ is a standard Brownian motion under $\mathbb{Q}$.

The price drifts at $r - \delta$ and the dividends make up the rest of the return $r$. Under $\mathbb{Q}$, $E^{\mathbb{Q}}[S_T] = S_0 e^{(r-\delta)T}$, the forward price, and $\Pr^{\mathbb{Q}}(S_T > K) = N(d_2)$, which is why $N(d_2)$ appears in the call formula.

> [!example]- What is this note worth? {Example}
> A structured note pays $1{,}000$ in one year if an index, now at $100$, is above $110$. The index pays no dividends, $\sigma = 0.20$, $r = 0.04$ and its real-world expected return is $\alpha = 0.10$.
>
> > [!answer]-
> > - Under $\mathbb{Q}$ the drift is $r$, so $d_2 = \left[\ln(100/110) + (0.04 - 0.02)(1)\right]/0.20 = -0.37655$.
> > - The risk-neutral probability of paying is $N(-0.37655) = 0.35325$.
> > - The note is worth $V_0 = 1{,}000\, e^{-0.04} (0.35325) = 339.40$.
> > - With $\alpha$ in place of $r$, the real-world probability of paying is $N(-0.07655) = 0.46949$, which would give $451.08$. The difference is the investor's reward for risk, not part of the price.

## The market price of risk

The real-world drift survives only in the market price of risk, the drift shift that Girsanov's theorem uses to move from the real-world measure to $\mathbb{Q}$. It is

> $$\lambda = \frac{\alpha - r}{\sigma}$$

For the note above, $\lambda = (0.10 - 0.04)/0.20 = 0.30$.

Changing the numeraire gives other pricing measures. Discounting by a zero-coupon bond maturing at $T$ instead of the money-market account gives the $T$-forward measure, under which forward prices are martingales. It is the standard device for interest-rate derivatives.

> [!trap] Using real-world probabilities with $r$
> A question that gives $\alpha$ is usually offering a distractor for the price. The expected return matters only for real-world questions, such as the probability of exercise or the expected payoff.
