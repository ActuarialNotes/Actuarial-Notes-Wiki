---
verification:
  status: unverified
  confidence: null
  last_checked: null
  last_checked_by: null
  content_hash: sha256:0bf07e08c39ef11a2ae40333e14e54d47e5ca9956e55c8285adb8c3d1d2ac0db
  sources: []
  open_findings: 0
  open_critical: 0
  log: ".verify/Concepts/Girsanov's Theorem.md"
---
**Girsanov's Theorem** says that reweighting the probabilities of Brownian paths by a positive density turns a Brownian motion under one measure into a Brownian motion with a shifted drift under another, while leaving the volatility unchanged. In pricing it is the step from the real-world measure $\mathbb{P}$ to the [[Risk-Neutral Valuation|risk-neutral measure]] $\mathbb{Q}$. If $W^{\mathbb{P}}_t$ is a Brownian motion under $\mathbb{P}$, the process that is a standard Brownian motion under $\mathbb{Q}$ is

> $$W^{\mathbb{Q}}_t = W^{\mathbb{P}}_t + \int_0^t \lambda_s\,ds$$

- $\lambda_t$ is the size of the shift, the **market price of risk**, an adapted process.

The measure $\mathbb{Q}$ is defined by its density with respect to $\mathbb{P}$, the Radon-Nikodym derivative, which is

> $$Z_T = \exp\!\left(-\int_0^T \lambda_s\,dW^{\mathbb{P}}_s - \tfrac12\int_0^T \lambda_s^2\,ds\right)$$

- $E^{\mathbb{Q}}[X] = E^{\mathbb{P}}[Z_T X]$ for any payoff $X$ known at $T$.
- $\lambda_t$ satisfies a condition such as Novikov's, $E^{\mathbb{P}}\left[e^{\frac12\int_0^T\lambda^2\,ds}\right] < \infty$, which makes $Z_t$ a [[Martingale|martingale]] with $E^{\mathbb{P}}[Z_T] = 1$.

Substituting $dW^{\mathbb{P}} = dW^{\mathbb{Q}} - \lambda\,dt$ into any [[Stochastic Differential Equation|SDE]] lowers its drift by $\lambda\sigma$ and leaves its volatility $\sigma$ untouched.

## Market price of risk

For a stock with $dS = \alpha S\,dt + \sigma S\,dW^{\mathbb{P}}$, where $\alpha$ is its expected return, the shift that makes it earn the risk-free rate $r$ is

> $$\lambda = \frac{\alpha - r}{\sigma}$$

and under $\mathbb{Q}$ the stock follows

> $$dS_t = rS_t\,dt + \sigma S_t\,dW^{\mathbb{Q}}_t$$

$\lambda$ is the excess return earned per unit of volatility. In a one-factor model every traded asset driven by the same $W$ must share the same $\lambda$, or there would be an arbitrage. Hull writes the expected return of any such security as $\mu = r + \lambda\sigma$. For a stock with dividend yield $\delta$, the $\mathbb{Q}$-drift of the price is $r - \delta$, and $\lambda = (\alpha - r)/\sigma$ when $\alpha$ is the total expected return, including dividends.

> [!example]- What is this digital payout worth, and what price does the real-world probability give? {Example}
> A structured product pays $\$1{,}000$ in one year if a non-dividend index, now at 100, ends above 110. Under $\mathbb{P}$ the index follows geometric Brownian motion with $\alpha = 0.10$ and $\sigma = 0.20$, and $r = 0.03$.
>
> > [!answer]-
> > - The market price of risk is $\lambda = (0.10 - 0.03)/0.20 = 0.35$.
> > - Under $\mathbb{Q}$ the drift is $r$, so the probability of paying is $N(d_2)$, with $d_2 = \left[\ln(100/110) + (0.03 - 0.02)\right]/0.20 = -0.42655$.
> > - The price is $1{,}000\,e^{-0.03}N(-0.42655) = 1{,}000(0.970446)(0.334853) = \$324.96$.
> > - Under $\mathbb{P}$ the index ends above 110 when $W^{\mathbb{P}}_1 > w^* = \left[\ln 1.1 - (0.10 - 0.02)\right]/0.20 = 0.07655$.
> > - Weighting by $Z_1 = e^{-0.35W_1 - 0.06125}$ shifts the normal density by $\lambda$, so $E^{\mathbb{P}}\left[Z_1 \mathbf{1}_{\{W_1 > w^*\}}\right] = 1 - N(0.07655 + 0.35) = 0.334853$, the same price.
> > - The real-world probability of paying is $N(-0.07655) = 0.46949$. Discounting it at $r$ gives $\$455.61$, which overprices the note by about $\$131$.

## Equivalent measures

$\mathbb{P}$ and $\mathbb{Q}$ agree on which events are impossible. They disagree only on how likely the possible ones are. That is why a hedge that works almost surely under $\mathbb{P}$ also works under $\mathbb{Q}$, and why volatility, which can be read off a single path, cannot change. In a discrete model the density is the ratio of the two probabilities, state by state.

> [!example]- A stock at 100 moves to 120 or 90, with up probabilities $p = 0.68390$ and $p^* = 0.50424$. What is $Z$ in each state? {Example}
> - The real-world $p$ gives an expected return of 10%, and the risk-neutral $p^*$ goes with $r = 5\%$.
> - In the up state, $Z_u = p^*/p = 0.50424/0.68390 = 0.7373$.
> - In the down state, $Z_d = (1 - p^*)/(1 - p) = 0.49576/0.31610 = 1.5684$.
> - The check is $E^{\mathbb{P}}[Z] = 0.68390(0.7373) + 0.31610(1.5684) = 1.0000$.
> - $\mathbb{Q}$ puts less weight on the good state and more on the bad one, which lowers the expected return from 10% to 5%.

## Real-world and risk-neutral scenario generators

An [[Economic Scenario Generator|economic scenario generator]] can be run under $\mathbb{P}$ for capital and risk projections or under $\mathbb{Q}$ for market-consistent valuation. Girsanov's theorem links the two. They are the same model with the same volatilities, and their drifts differ by the market price of risk. The SOA's 2022 paper on the connection between real-world and risk-neutral generators builds on that link.

The same theorem moves between the measures that go with other [[Numeraire|numeraires]], such as the $T$-forward measure. There the drift shift is set by the volatility of the numeraire rather than by $\lambda$.

> [!trap] Changing the volatility along with the drift
> Girsanov's theorem shifts the drift only. An answer that moves $\sigma$ along with $\alpha$, or rescales the Brownian motion, has misapplied it. Under $\mathbb{Q}$ the stock's drift is $r$ and its volatility is still $\sigma$.
