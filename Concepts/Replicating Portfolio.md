---
verification:
  status: unverified
  confidence: null
  last_checked: null
  last_checked_by: null
  content_hash: sha256:4ea1b88e559761a00ff6737fed019dad10cb90d35b73613b2f8041faaa0bc447
  sources: []
  open_findings: 0
  open_critical: 0
  log: .verify/Concepts/Replicating Portfolio.md
---

A **replicating portfolio** is a holding of the underlying asset and risk-free bonds, $\Delta$ units of the asset and $B$ in bonds, whose value matches a derivative's [[Payoff|payoff]] in every state of the world. Two positions with the same payoffs must have the same price when there is no arbitrage, so the derivative's price is the cost of its replicating portfolio. An insurer that has written an embedded guarantee holds the guarantee's replicating portfolio as its [[Hedging|hedge]], built and maintained by [[Delta Hedging|delta hedging]].

> $$V = \Delta S + B$$

> $$\Delta_P = -e^{-\delta T}N(-d_1)$$

> $$B_P = Ke^{-rT}N(-d_2)$$

> $$\begin{aligned} H(t) = {}_np_x\big[ & Ge^{-r(n-t)}N(-d_2) \\ & - F_t(1-m)^{n-t}N(-d_1)\big] \end{aligned}$$

> $$\text{Cost at } t = H(t) - \left(\Delta_{t-h}S_t + B_{t-h}e^{rh}\right)$$

- **Symbols:** $V$ is the derivative's value, $S$ the asset price and $r$ the continuously compounded risk-free rate. The second and third blocks are the [[Black-Scholes Model|Black-Scholes]] replicating portfolio of a European put, with $d_1$ and $d_2$ as in that model. In the fourth, $H(t)$ is the hedge for a [[Guaranteed Minimum Maturity Benefit|GMMB]] per policy issued, $G$ is the guarantee, $F_t$ is the fund at time $t$ before that year's management charge $m$, and $d_1$ and $d_2$ use $F_t(1-m)^{n-t}$, $G$ and the remaining term $n - t$.
- **One period:** In the [[Binomial Option Pricing Model|binomial model]], two equations in $\Delta$ and $B$ match the portfolio to the payoff after an up move and after a down move. Their solution gives the binomial $\Delta$ and $B$, and the cost $\Delta S + B$ is the price.
- **Continuous rebalancing:** In the Black-Scholes model the holdings change with $S$ and $t$, so the portfolio replicates the option only if it is rebalanced continuously. It is then self-financing, which means that no money is added or taken out after the start, and its value at $T$ equals the payoff.
- **Embedded guarantees:** The insurer is short the GMMB's put, so it holds the put's replicating portfolio, which is a short position in the equity index and a holding of zero-coupon bonds maturing at $n$, each scaled by the survival probability. Rebalanced only at discrete times, the portfolio brought forward from the last step is not exactly the new portfolio required, and the difference in the last block is the rebalancing cost, which can be positive or negative.

> [!example]- Replicating a Put and Exploiting a Mispriced Quote {Example}
> A non-dividend-paying stock is priced at $40$, and in one year it will be worth $52$ or $32$. With $r = 0.03$, a dealer quotes a 1-year European put with strike $40$ at $4.60$. Find the put's replicating portfolio, and show the arbitrage.
>
> > [!answer]-
> > The put pays $0$ if the stock rises to $52$ and $8$ if it falls to $32$.
> > $$
> > \begin{align*}
> > \Delta &= \frac{0 - 8}{52 - 32} \\
> > &= -0.4 \\
> > B &= e^{-0.03}\,\frac{1.3(8) - 0.8(0)}{1.3 - 0.8} \\
> > &= 0.970446(20.8) \\
> > &= 20.1853 \\
> > V &= -0.4(40) + 20.1853 \\
> > &= 4.1853
> > \end{align*}
> > $$
> > The put is replicated by shorting $0.4$ shares and lending $20.1853$. The quote of $4.60$ is too high, so sell the put and buy the replicating portfolio, which leaves $4.60 - 4.1853 = 0.4147$ in hand today. In a year the loan repays $20.80$. If the stock is at $52$, the short shares cost $20.80$ and the put pays nothing. If it is at $32$, the short shares cost $12.80$, which leaves exactly the $8$ owed on the put. Either way the position closes at zero, so the $0.41$ is a riskless profit.

> [!example]- Hedging a GMMB and Rebalancing After a Market Fall {Example}
> A single premium of \$100,000 from a life aged 60 is invested in an equity index fund, and a management charge of $1.5\%$ of the fund is deducted at the start of each year. The contract guarantees $G = 100{,}000$ at the end of 10 years to a policyholder who is alive then. Use $r = 0.04$, $\sigma = 0.20$ and the Standard Ultimate Life Table, for which ${}_{10}p_{60} = 0.942549$. Find the replicating portfolio per policy issued at time 0. Then, if the index falls $25\%$ in the first year and deaths are as expected, find the cost of rebalancing at time 1.
>
> > [!answer]-
> > At time 0 the put is written on $F_0(1-m)^{10} = 85{,}973.04$, and its two parts are $Ge^{-0.4}N(-d_2) = 31{,}451.97$ and $85{,}973.04\,N(-d_1) = 20{,}542.42$, with $d_1 = 0.70972$ and $d_2 = 0.07726$. Scaling by ${}_{10}p_{60}$ gives the hedge.
> > $$
> > \begin{align*}
> > \text{Index (short)} &= 0.942549(20{,}542.42) \\
> > &= 19{,}362.24 \\
> > \text{Bonds} &= 0.942549(31{,}451.97) \\
> > &= 29{,}645.03 \\
> > H(0) &= 29{,}645.03 - 19{,}362.24 \\
> > &= 10{,}282.79
> > \end{align*}
> > $$
> > After a year the short index position is worth $-19{,}362.24(0.75) = -14{,}521.68$ and the bonds have grown to $29{,}645.03e^{0.04} = 30{,}854.87$, so the hedge brought forward is worth $16{,}333.19$. The fund is now $F_1 = 100{,}000(0.985)(0.75) = 73{,}875$, and the put on $73{,}875(0.985)^9 = 64{,}479.78$ with 9 years to run is worth $18{,}605.48$, with $d_1 = 0.16864$ and $d_2 = -0.43136$.
> > $$
> > \begin{align*}
> > H(1) &= 0.942549(18{,}605.48) \\
> > &= 17{,}536.58 \\
> > \text{Cost} &= 17{,}536.58 - 16{,}333.19 \\
> > &= 1{,}203.39
> > \end{align*}
> > $$
> > The insurer must add \$1,203.39 per policy issued, and the new hedge is a short index position of \$26,318.26 and bonds of \$43,854.84. The fall of $25\%$ is larger than the one-standard-deviation move of $20\%$, so the annual hedge lost money. A fall of $10\%$ would instead have left a surplus of \$425.98.

> [!tip]- How it appears on the exam
> - **ALTAM** asks candidates to "construct a replicating portfolio" for the GMDB and GMMB "using delta-hedging", which means finding the index and bond holdings per policy at issue, their value a period later, and the new holdings.
> - **Rebalancing costs:** The next ALTAM objective asks candidates to "understand and evaluate the costs associated with discrete-time rebalancing". A question can follow the hedge for one or two steps, as in the second example, and ask why the cost arises and what more frequent rebalancing would change.
> - **FAM** asks for the "delta hedge" of a European option, which is the same portfolio seen from the option writer's side. The answer is the number of shares to hold per option written, from the Black-Scholes delta or from $\Delta$ and $B$ on a binomial tree.

> [!warning]- Exam traps
> - **Holding versus writing:** The writer of an option hedges by holding its replicating portfolio, and a buyer would hedge by shorting it. An insurer that shorts the index and holds bonds against a GMMB is hedged, while one that buys the index has doubled its exposure.
> - **Survival weighting:** Per policy issued, the GMMB hedge is ${}_np_x$ times the option's portfolio. Per policy still in force at time $t$, it is ${}_{n-t}p_{x+t}$ times the portfolio, and mixing the two bases gives a cost that is off by the expected deaths.
> - **Charges in the underlying:** The put is written on the fund after all future charges, $F_t(1-m)^{n-t}$, not on $F_t$. Leaving the charges out understates both the index short and the bond holding.
> - **The portfolio brought forward:** The cost compares the new hedge with the old holdings revalued at the new index level and with a year's interest on the bonds. Comparing it with the old hedge's value at time 0 leaves out the market move and gives the wrong sign.
