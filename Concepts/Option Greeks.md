---
aliases:
  - Cross Greek
verification:
  status: unverified
  confidence: null
  last_checked: null
  last_checked_by: null
  content_hash: sha256:3311fd8b9bdb8fb46890baf35fd7d062077c7323b8c864531e128d14919a26c5
  sources: []
  open_findings: 0
  open_critical: 0
  log: .verify/Concepts/Option Greeks.md
---
The **Option Greeks** are the partial derivatives of an option's or a portfolio's value $\Pi$ with respect to the quantities that drive it: delta ($\Delta$) and gamma ($\Gamma$) for the underlying price $S$, theta ($\Theta$) for time, vega ($\mathcal{V}$) for [[Volatility|volatility]] and rho ($\rho$) for the interest rate. **Cross Greeks** are the mixed second derivatives, such as the change in delta when volatility moves.

A trader or an insurer [[Hedging|hedges]] by trading other instruments until the chosen Greeks of the whole book are zero. Delta, $\partial \Pi / \partial S$, is the change in value per unit change in the underlying price. For a European call on an asset with price $S_0$, strike $K$, time to expiry $T$, risk-free rate $r$, dividend yield $q$ and volatility $\sigma$, the delta is

> $$\Delta_c = e^{-qT}N(d_1)$$

- $d_1$ is as in the [[Black-Scholes Model|Black-Scholes model]], and $d_2 = d_1 - \sigma\sqrt{T}$.
- $N$ is the standard [[Normal Distribution|normal]] distribution function.

A European put has $\Delta_p = e^{-qT}\left[N(d_1) - 1\right]$, which is negative. On a stock with no dividends this is $N(d_1) - 1 = -N(-d_1)$.

## Gamma and vega

Gamma, $\partial^2 \Pi / \partial S^2$, is the change in delta per unit change in $S$. For a call or a put it is

> $$\Gamma = \frac{N'(d_1)\,e^{-qT}}{S_0\,\sigma\sqrt{T}}$$

- $N'(x) = e^{-x^2/2}/\sqrt{2\pi}$ is the standard normal density.

Vega, $\partial \Pi / \partial \sigma$, for a call or a put is

> $$\mathcal{V} = S_0\sqrt{T}\,N'(d_1)\,e^{-qT}$$

Vega is per unit change in $\sigma$, so a 1% rise in volatility changes the value by $\mathcal{V}/100$. Gamma and vega are the same for a call and a put with the same terms, because by [[Put-Call Parity|put-call parity]] the two differ only by a forward, which has no gamma or vega. A long option has positive gamma and vega, so it gains from large moves and from rising volatility.

## Theta and rho

Theta, $\partial \Pi / \partial t$, for a European call is

> $$\begin{aligned} \Theta_c = {} & -\frac{S_0 N'(d_1)\,\sigma e^{-qT}}{2\sqrt{T}} \\ & + qS_0N(d_1)e^{-qT} - rKe^{-rT}N(d_2) \end{aligned}$$

Theta is per year. Hull often quotes it per calendar day, dividing by 365, or per trading day, dividing by 252. Theta is usually negative, so the option loses value as time passes with nothing else changing. Gamma and theta are largest for an at-the-money option close to expiry.

Rho, $\partial \Pi / \partial r$, for a European call is

> $$\rho_c = K\,T\,e^{-rT}N(d_2)$$

A European put has $\rho_p = -KTe^{-rT}N(-d_2)$.

## The theta–gamma relation

Every derivative that satisfies the Black-Scholes equation satisfies

> $$\Theta + (r - q)\,S\,\Delta + \tfrac{1}{2}\sigma^2 S^2\,\Gamma = r\,\Pi$$

For a [[Delta Hedging|delta-hedged]] book, with $\Delta = 0$, it reads $\Theta + \tfrac{1}{2}\sigma^2S^2\Gamma = r\Pi$, so a book that is long gamma pays for it through negative theta.

> [!example]- What are the Greeks of this call, and does the theta–gamma relation hold? {Example}
> A stock pays no dividends and trades at $\$100$. A six-month European call has $K = 100$, $r = 5\%$ and $\sigma = 20\%$. The call is worth $\$6.889$.
>
> > [!answer]-
> > - $d_1 = \dfrac{(0.05 + 0.02)(0.5)}{0.20\sqrt{0.5}} = 0.2475$ and $d_2 = 0.2475 - 0.1414 = 0.1061$.
> > - $N(d_1) = 0.5977$, $N(d_2) = 0.5422$ and $N'(d_1) = 0.3869$.
> > - $\Delta = 0.5977$.
> > - $\Gamma = 0.3869/(100 \times 0.20 \times 0.7071) = 0.02736$.
> > - $\mathcal{V} = 100 \times 0.7071 \times 0.3869 = 27.36$, so the call gains about $\$0.27$ for each 1% rise in volatility.
> > - $\Theta = -5.472 - 0.05(100)e^{-0.025}(0.5422) = -8.116$ a year, or about $8.116/365 = 0.022$ a day.
> > - $\rho = 100(0.5)e^{-0.025}(0.5422) = 26.44$.
> > - The relation gives $-8.116 + 0.05(100)(0.5977) + 0.5(0.04)(10{,}000)(0.02736) = 0.344$.
> > - That equals $r\Pi = 0.05 \times 6.889 = 0.344$, so the relation holds.

## Greeks of a portfolio

The Greek of a portfolio is the sum of the Greeks of its positions, weighted by quantity. A long position counts positive and a short one negative, so a written call has negative delta, gamma and vega but positive theta. The underlying asset has a delta of one and no gamma or vega, so it can fix delta but not gamma or vega. Making gamma and vega zero takes two traded options, because one option fixes them only in a fixed ratio, $\mathcal{V}/\Gamma = S^2\sigma T$, that depends on its expiry. The options are traded first, and the asset is traded last to restore delta.

> [!example]- What trades make this dealer's position gamma, vega and delta neutral? {Example}
> A dealer has written 1,000 of the six-month calls in the example above, so its position has $\Delta = -597.7$, $\Gamma = -27.4$ and $\mathcal{V} = -27{,}360$. It can trade two at-the-money calls:
>
> | Call | $\Delta$ | $\Gamma$ | $\mathcal{V}$ |
> | :--- | ---: | ---: | ---: |
> | Three-month | 0.5695 | 0.0393 | 19.64 |
> | One-year | 0.6368 | 0.0188 | 37.52 |
>
> > [!answer]-
> > - Let $w_1$ and $w_2$ be the positions in the three-month and one-year calls.
> > - Gamma is cancelled when $0.0393\,w_1 + 0.0188\,w_2 = 27.4$.
> > - Vega is cancelled when $19.64\,w_1 + 37.52\,w_2 = 27{,}360$.
> > - Solving the two equations gives $w_1 = 464.7$ and $w_2 = 485.9$, so the dealer buys about 465 three-month calls and 486 one-year calls.
> > - The position's delta is now $-597.7 + 464.7(0.5695) + 485.9(0.6368) = -23.6$.
> > - The dealer buys 23.6 shares to make delta zero.

## Taylor expansion and cross Greeks

Over a short time $\delta t$, the change in value is about

> $$\delta\Pi \approx \Delta\,\delta S + \tfrac{1}{2}\Gamma\,\delta S^2 + \Theta\,\delta t + \mathcal{V}\,\delta\sigma + \rho\,\delta r$$

The expansion also has cross terms, such as $\frac{\partial^2 \Pi}{\partial S\,\partial\sigma}\,\delta S\,\delta\sigma$. Hedging only the first-order Greeks leaves these terms open. The cross Greeks are:

- **Vanna**, $\partial^2\Pi/\partial S\,\partial\sigma$, the change in delta when volatility moves. The call above has a vanna of $-N'(d_1)\,d_2/\sigma = -0.205$, so its delta falls by about 0.002 when volatility rises one point.
- **Volga**, $\partial^2\Pi/\partial\sigma^2$, the change in vega when volatility moves.
- **Cross-gamma** between equity and rates, $\partial^2\Pi/\partial S\,\partial r$, the change in delta when rates move.

A [[Guaranteed Minimum Maturity Benefit|GMMB]] or [[Guaranteed Minimum Withdrawal Benefit|GMWB]] is a long-dated put on the policyholder's fund, so its value depends on the equity level, interest rates and volatility together. When equities fall, the guarantee moves into the money, its sensitivity to rates grows, and volatility tends to rise at the same time. An insurer whose hedge matches delta, rho and vega separately still loses on these joint moves, as many did in 2008, so a hedging programme measures and limits its cross Greeks.

> [!trap] Vega per unit, not per point
> Vega is per unit change in $\sigma$, so a move from 20% to 21% is $\delta\sigma = 0.01$. Multiplying vega by 1 instead of 0.01 makes the volatility effect a hundred times too big.
