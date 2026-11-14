---
verification:
  status: unverified
  confidence: null
  last_checked: null
  last_checked_by: null
  content_hash: sha256:7ef075d668e4f163f826ccdf4f0c79a6136d3eaf81dbb5380e3d958ecf1916c5
  sources: []
  open_findings: 0
  open_critical: 0
  log: .verify/Concepts/Replicating Portfolio.md
---

A **Replicating Portfolio** is a holding of the underlying asset and risk-free bonds whose value matches a derivative's [[Payoff|payoff]] in every state of the world. Holding $\Delta$ units of an asset priced at $S$ and $B$ in bonds, its value is

> $$V = \Delta S + B$$

Two positions with the same payoffs must have the same price when there is no arbitrage, so the derivative's price $V$ is the cost of its replicating portfolio. An insurer that has written an embedded guarantee holds the guarantee's replicating portfolio as its [[Hedging|hedge]], built and maintained by [[Delta Hedging|delta hedging]].

## The one-period binomial model

In the [[Binomial Option Pricing Model|binomial model]], two equations in $\Delta$ and $B$ match the portfolio to the payoff after an up move and after a down move. Their solution is

> $$\Delta = \frac{V_u - V_d}{S_u - S_d}$$

> $$B = e^{-rh}\,\frac{u\,V_d - d\,V_u}{u - d}$$

- $V_u$ and $V_d$ are the derivative's payoffs after an up move and a down move.
- $S_u = uS$ and $S_d = dS$ are the asset prices after an up move and a down move.
- $r$ is the continuously compounded risk-free rate, and $h$ is the length of the period.

The cost $\Delta S + B$ is the price.

> [!example]- What is the put's replicating portfolio, and how does this quote give an arbitrage? {Example}
> A non-dividend-paying stock is priced at $40$, and in one year it will be worth $52$ or $32$. With $r = 0.03$, a dealer quotes a 1-year European put with strike $40$ at $4.60$.
>
> > [!answer]-
> > - The put pays $0$ if the stock rises to $52$ and $8$ if it falls to $32$, so $u = 1.3$ and $d = 0.8$.
> > - The share holding is $\Delta = (0 - 8)/(52 - 32) = -0.4$.
> > - The bond holding is $B = e^{-0.03}(20.8) = 20.1853$, where $20.8 = (1.3 \times 8 - 0.8 \times 0)/0.5$.
> > - The put's value is $V = -0.4(40) + 20.1853 = 4.1853$, so it is replicated by shorting $0.4$ shares and lending $20.1853$.
> > - The quote of $4.60$ is too high, so sell the put and buy the replicating portfolio, which leaves $4.60 - 4.1853 = 0.4147$ in hand today.
> > - In a year the loan repays $20.80$. If the stock is at $52$, the short shares cost $20.80$ and the put pays nothing.
> > - If the stock is at $32$, the short shares cost $12.80$, which leaves exactly the $8$ owed on the put.
> > - Either way the position closes at zero, so the $0.41$ is a riskless profit.

## The Black-Scholes replicating portfolio

In the [[Black-Scholes Model|Black-Scholes model]], the replicating portfolio of a European put holds

> $$\Delta_P = -e^{-\delta T}N(-d_1)$$

> $$B_P = Ke^{-rT}N(-d_2)$$

- $\delta$ is the asset's continuous dividend yield, $K$ is the strike and $T$ is the time to expiry.
- $d_1$ and $d_2$ are as in the Black-Scholes model.

The holdings change with $S$ and $t$, so the portfolio replicates the option only if it is rebalanced continuously. It is then self-financing, which means that no money is added or taken out after the start, and its value at $T$ equals the payoff.

## Hedging an embedded guarantee

An insurer that has written a [[Guaranteed Minimum Maturity Benefit|GMMB]] is short a put, so it holds the put's replicating portfolio: a short position in the equity index and a holding of zero-coupon bonds maturing at $n$, each scaled by the survival probability. Per policy issued, the hedge at time $t$ is

> $$\begin{aligned} H(t) = {}_np_x\big[ & Ge^{-r(n-t)}N(-d_2) \\ & - F_t(1-m)^{n-t}N(-d_1)\big] \end{aligned}$$

- $G$ is the guarantee, payable at $n$ to a policyholder alive then.
- $F_t$ is the fund at time $t$ before that year's management charge $m$.
- $d_1$ and $d_2$ use $F_t(1-m)^{n-t}$, $G$ and the remaining term $n - t$.

The put is written on the fund after all future charges, $F_t(1-m)^{n-t}$, not on $F_t$. Per policy still in force at time $t$, the hedge is ${}_{n-t}p_{x+t}$ times the option's portfolio instead of ${}_np_x$ times it, and the two bases are not mixed.

Rebalanced only at discrete times, the portfolio brought forward from the last step is not exactly the new portfolio required. The difference is the rebalancing cost at $t$, which can be positive or negative:

> $$\text{Cost at } t = H(t) - \left(\Delta_{t-h}S_t + B_{t-h}e^{rh}\right)$$

- $\Delta_{t-h}$ and $B_{t-h}$ are the index and bond holdings set at the last rebalancing, $h$ years earlier.

The cost compares the new hedge with the old holdings revalued at the new index level and with a period's interest on the bonds, not with the old hedge's value when it was set.

> [!example]- What is the GMMB's replicating portfolio at issue, and what does rebalancing cost after a 25% fall? {Example}
> A single premium of $\$100{,}000$ from a life aged 60 is invested in an equity index fund, and a management charge of $1.5\%$ of the fund is deducted at the start of each year. The contract guarantees $G = 100{,}000$ at the end of 10 years to a policyholder who is alive then. Use $r = 0.04$, $\sigma = 0.20$ and the Standard Ultimate Life Table, for which ${}_{10}p_{60} = 0.942549$. In the first year the index falls $25\%$ and deaths are as expected. The hedge is set per policy issued and rebalanced annually.
>
> > [!answer]-
> > - At time 0 the put is written on $100{,}000(0.985)^{10} = 85{,}973.04$, with $d_1 = 0.70972$ and $d_2 = 0.07726$.
> > - Its two parts are $Ge^{-0.4}N(-d_2) = 31{,}451.97$ and $85{,}973.04\,N(-d_1) = 20{,}542.42$.
> > - Scaling by ${}_{10}p_{60}$, the hedge is a short index position of $0.942549(20{,}542.42) = \$19{,}362.24$ and bonds of $0.942549(31{,}451.97) = \$29{,}645.02$, so $H(0) = \$10{,}282.79$.
> > - After a year the short index position is worth $-19{,}362.24(0.75) = -14{,}521.68$, and the bonds have grown to $29{,}645.02e^{0.04} = 30{,}854.86$. The hedge brought forward is worth $\$16{,}333.18$.
> > - The fund is now $F_1 = 100{,}000(0.985)(0.75) = 73{,}875$, and the put is written on $73{,}875(0.985)^9 = 64{,}479.78$ with 9 years to run, with $d_1 = 0.16864$ and $d_2 = -0.43136$. It is worth $18{,}605.48$.
> > - The new hedge is $H(1) = 0.942549(18{,}605.48) = \$17{,}536.58$, a short index position of $\$26{,}318.25$ and bonds of $\$43{,}854.83$.
> > - The rebalancing cost is $17{,}536.58 - 16{,}333.18 = \$1{,}203.40$ per policy issued, which the insurer must add.
> > - The fall of $25\%$ is larger than the one-standard-deviation move of $20\%$, so the annual hedge lost money. A fall of $10\%$ would instead have left a surplus of $\$425.98$.

> [!trap] Holding versus writing the replicating portfolio
> The writer of an option hedges by holding its replicating portfolio, and a buyer would hedge by shorting it. An insurer that shorts the index and holds bonds against a GMMB is hedged, while one that buys the index has doubled its exposure.
