---
aliases:
  - Delta-Hedging
verification:
  status: unverified
  confidence: null
  last_checked: null
  last_checked_by: null
  content_hash: sha256:77ab6cd7da91f90b612263dd6e9b94712e01a2b2b8063a620856c3839a125eb9
  sources: []
  open_findings: 0
  open_critical: 0
  log: .verify/Concepts/Delta Hedging.md
---
**Delta hedging** offsets a derivative position with $\Delta$ units of the underlying asset, $\Delta$ being the derivative's sensitivity to the asset price, so that the combined position does not gain or lose on a small price move; rebalanced as $\Delta$ changes, the stock-plus-bond position becomes a **replicating portfolio** for the derivative. It is the dynamic [[Hedging|hedge]] behind both an option market-maker's book and an insurer's hedge of an equity-linked guarantee.

> $$\Delta_{C} = e^{-\delta T} N(d_1)$$

> $$\Delta_{P} = -e^{-\delta T} N(-d_1)$$

> $$\Delta = e^{-\delta h}\,\frac{V_u - V_d}{S(u - d)}$$

> $$B = e^{-rh}\,\frac{u V_d - d V_u}{u - d}$$

> $$R(h) \approx \tfrac12 S^2 \Gamma \left[\sigma^2 h - (\epsilon/S)^2\right]$$

- The first two are the [[Black-Scholes Model|Black-Scholes]] deltas, with $d_1 = \dfrac{\ln(S/K) + (r - \delta + \sigma^2/2)T}{\sigma\sqrt{T}}$; the third and fourth are the binomial replicating portfolio, $\Delta$ shares plus $B$ in bonds, worth $V = \Delta S + B$
- A writer of the derivative holds $+\Delta$ shares per option sold (a call writer buys stock, a put writer shorts it); the hedged position earns the risk-free rate only in the limit of continuous rebalancing under the model's assumptions
- With discrete rebalancing the hedge is exact only to first order. The last block is the approximate profit $R(h)$ of a writer of a delta-hedged option on a non-dividend stock over a short period $h$ in which the stock moves by $\epsilon$, with $\Gamma$ the option's gamma: the writer gains when the realized move is smaller than the one-sigma move $\sigma S\sqrt{h}$ and loses when it is larger, so the hedge outcome depends on realized versus assumed [[Volatility|volatility]]
- For a guarantee on a [[Life Insurance|life insurance]] or annuity contract, each option's delta is weighted by the probability the benefit is paid, which assumes [[Mortality|mortality]] risk is diversified away

> [!example]- Setting and Rebalancing a Market-Maker's Hedge {Example}
> A market-maker writes $1{,}000$ six-month European calls on a non-dividend stock with $S_0 = 40$, $K = 42$, $r = 0.05$, $\sigma = 0.25$. Find the shares bought to delta-hedge, then the shares to buy one week later if the stock is at $41.50$.
>
> > [!answer]-
> > $$
> > \begin{align*}
> > d_1 &= \frac{\ln(40/42) + (0.05 + 0.03125)(0.5)}{0.25\sqrt{0.5}} \\
> >     &= -0.04619 \\
> > \Delta_0 &= N(-0.04619) \\
> >          &= 0.48158
> > \end{align*}
> > $$
> > The writer buys $481.58$ shares (call value $2.3954$ each, so $\$16{,}868$ is borrowed). A week later $T = 0.5 - 1/52$:
> > $$
> > \begin{align*}
> > d_1 &= \frac{\ln(41.5/42) + (0.08125)(0.48077)}{0.25\sqrt{0.48077}} \\
> >     &= 0.15626 \\
> > \Delta_1 &= 0.56209
> > \end{align*}
> > $$
> > The writer buys $1{,}000(0.56209 - 0.48158) = 80.51$ more shares for about $\$3{,}341$. Delta hedging a short call means buying after rises and selling after falls.

> [!example]- Replicating a Guaranteed Minimum Maturity Benefit {Example}
> An insurer has $1{,}000$ policies issued to lives aged $60$, each with fund value $F_0 = 100$ invested in an equity index and a GMMB guaranteeing $G = 100$ to survivors at $T = 10$. The fund pays a management charge of $1\%$ a year deducted continuously, $r = 0.04$, $\sigma = 0.20$ and ${}_{10}p_{60} = 0.90$. Find the cost of the guarantee and the replicating portfolio at time $0$.
>
> > [!answer]-
> > The guarantee is a put on the fund, which behaves like a stock with dividend yield $0.01$:
> > $$
> > \begin{align*}
> > d_1 &= \frac{\ln(1) + (0.04 - 0.01 + 0.02)(10)}{0.20\sqrt{10}} \\
> >     &= 0.79057 \\
> > d_2 &= 0.15811 \\
> > P &= 100e^{-0.4}N(-0.15811) - 100e^{-0.1}N(-0.79057) \\
> >   &= 67.032(0.43718) - 90.484(0.21460) \\
> >   &= 29.305 - 19.418 \\
> >   &= 9.888
> > \end{align*}
> > $$
> > The cost is $1{,}000(0.90)(9.888) = \$8{,}899$. The replicating portfolio is a **short** position of $1{,}000(0.90)(19.418) = \$17{,}476$ in the index and $1{,}000(0.90)(29.305) = \$26{,}375$ in 10-year zero-coupon bonds, net $\$8{,}899$. The insurer, being short the put, *holds* this portfolio as its hedge.

> [!example]- Hedge Profit When the Stock Jumps {Example}
> For the calls in the first example ($\Gamma = 0.056359$ at time $0$), the stock moves by $\$1.20$ over one day ($h = 1/365$). Approximate the delta-hedged writer's profit on the $1{,}000$ calls.
>
> > [!answer]-
> > $$
> > \begin{align*}
> > R &\approx 1{,}000 \times \tfrac12 (40)^2 (0.056359)\left[\frac{0.0625}{365} - \left(\frac{1.20}{40}\right)^2\right] \\
> >   &= 45{,}087 \times (0.000171 - 0.000900) \\
> >   &= -32.86
> > \end{align*}
> > $$
> > The one-sigma daily move is $0.25(40)\sqrt{1/365} = 0.523$; a move more than twice that costs the writer about $\$32.86$, whichever direction it goes.

> [!tip]- How it appears on the exam
> - **FAM** (Black-Scholes "price and delta hedge"): compute $\Delta$ for a call or put and the number of shares to buy or sell to hedge a written position; often extended one period to the rebalancing trade.
> - **ALTAM** ("construct a replicating portfolio ... using delta-hedging"): for a GMMB or GMDB, split the guarantee's value into its stock and bond parts, weighted by survival or death probabilities, and roll it forward to find the rebalancing cost and the hedge error at the next step.
> - **INV-201** ("the interplay between hedging assumptions and hedging outcomes"): explain or compute hedge P&L under discrete rebalancing, realized versus implied volatility, jumps and transaction costs, usually as a written answer supported by the gamma approximation.

> [!warning]- Exam traps
> - **Sign of the hedge.** A *written* call is hedged by buying $N(d_1)$ shares; a written put by *shorting* $e^{-\delta T}N(-d_1)$ shares. Quoting $\Delta_P$ as $N(-d_1)$ with a plus sign reverses the trade.
> - **Dropping $e^{-\delta T}$.** With a dividend yield (or a fund management charge) the delta is $e^{-\delta T}N(d_1)$, not $N(d_1)$.
> - **Rebalancing with the old time to expiry.** Recompute $d_1$ with the remaining term; reusing $T$ gives a delta that is slightly wrong and a rebalancing trade off by a few shares.
> - **Forgetting the survival weight on an insurance guarantee.** The GMMB hedge is ${}_{T}p_x$ times the option hedge per policy; hedging every policy in full over-hedges by the expected deaths.
