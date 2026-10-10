---
aliases:
  - Asian Option
verification:
  status: unverified
  confidence: null
  last_checked: null
  last_checked_by: null
  content_hash: sha256:116fc2d5e893857279fc791af53387036bb8093045aaf88ee1a3d9628593896d
  sources: []
  open_findings: 0
  open_critical: 0
  log: .verify/Concepts/Exotic Option.md
---
An **exotic option** is any option whose terms differ from those of a plain [[European Option|European]] or American call or put: its payoff may depend on the path of the underlying price and not only its final value, on more than one exercise decision, or on a fixed cash amount. Exotics are mostly traded over the counter, written to fit a client's exposure, and many of them sit inside insurance and [[Structured Product|structured products]].

> $$c_{\text{in}} + c_{\text{out}} = c$$

> $$\text{Asian call: } \left(\bar{S} - K\right)^+$$

> $$\bar{S} = \frac{1}{n}\sum_{i=1}^{n} S_{t_i}$$

> $$\text{Cash-or-nothing call} = Q\,e^{-rT}N(d_2)$$

> $$\text{Variance swap: } L_{\text{var}}\left(\bar{\sigma}^2 - V_K\right)$$

- **Symbols:** Following Hull chapter 26, $c$ is a regular European call and $c_{\text{in}}$ and $c_{\text{out}}$ are knock-in and knock-out calls with the same strike $K$, expiry $T$ and barrier. $S_{t_i}$ are the prices on the $n$ averaging dates, $Q$ is the fixed cash amount of a binary option, $d_2$ is as in the [[Black-Scholes Model|Black-Scholes model]], $\bar{\sigma}^2$ is the variance realized over the swap's life, $V_K$ is the agreed variance and $L_{\text{var}}$ is the variance notional.
- **European, American and Bermudan:** A European option can be exercised only at $T$, an American option at any time up to $T$, and a Bermudan option only on a set of dates, such as each coupon date of a callable bond. More exercise rights are worth more, so a Bermudan option is worth at least the European and at most the American.
- **Chooser:** The holder of a chooser decides at a time $t_1 < T$ whether the option is a call or a put. By [[Put-Call Parity|put-call parity]], the value at $t_1$ is the call plus a put on the shortfall, so a chooser is a package of a call expiring at $T$ and a put expiring at $t_1$.
- **Barrier:** A knock-out option dies if the price reaches a barrier $H$, and a knock-in option comes alive only if it does. Barriers are "up" or "down" according to where $H$ lies relative to the starting price. Holding both the knock-in and the knock-out is the same as holding the regular option, which gives the parity above, so a barrier option is cheaper than the regular option.
- **Binary:** A cash-or-nothing call pays $Q$ if $S_T > K$ and nothing otherwise, and an asset-or-nothing call pays $S_T$ if $S_T > K$, with value $S_0e^{-qT}N(d_1)$. A regular call is an asset-or-nothing call less $K$ cash-or-nothing calls paying \$1 each.
- **Lookback:** A floating-strike lookback call pays $S_T - S_{\min}$, buying at the lowest price over the life, and a floating-strike lookback put pays $S_{\max} - S_T$. A fixed-strike lookback call pays $(S_{\max} - K)^+$. Hindsight is expensive, so lookbacks cost more than the regular options.
- **Asian:** An average-price option pays on the average of the prices over the averaging period, arithmetic or geometric. An average-strike call pays $(S_T - \bar{S})^+$. Averaging smooths the price path, so the average is less volatile than the final price and an Asian option is cheaper than the European. The geometric average of lognormal prices is lognormal, which gives a closed form, while the arithmetic average needs an approximation or simulation.
- **Variance and volatility swaps:** A variance swap pays the difference between the realized variance and a fixed variance on a notional. A volatility swap does the same with the volatility. Neither is an option, but both give a direct position in [[Volatility|volatility]], and a variance swap can be replicated by a static portfolio of calls and puts across strikes.

> [!example]- Pricing a Knock-In Call from In-Out Parity {Example}
> A stock trades at \$100. A one-year European call with $K = 100$ is worth \$11.84, with $r = 4\%$, $\sigma = 25\%$ and no dividends. A down-and-out call with the same terms and a barrier of $H = 85$ is worth \$10.58. Find the value of the down-and-in call with barrier 85, and explain why the two barrier prices differ so much.
>
> > [!answer]-
> > The two barrier calls together pay exactly what the regular call pays. If the price touches 85, the knock-out dies and the knock-in comes alive, and if it does not, the reverse happens.
> > $$
> > \begin{align*}
> > c_{\text{di}} &= c - c_{\text{do}} \\
> > &= 11.84 - 10.58 \\
> > &= 1.26
> > \end{align*}
> > $$
> > The down-and-in call is worth about \$1.26, which matches the closed-form value of \$1.25 to rounding. It is cheap for two reasons: the price must first fall 15% to activate it, and it must then recover above \$100 by expiry to pay anything. A buyer who believes a fall would be temporary gets the call at about a tenth of the regular price.

> [!example]- An Asian Call Against a European Call on a Short Path {Example}
> A one-year average-price call on an index has $K = 100$ and averages the quarterly closing prices. The prices at the four quarter-ends turn out to be 104, 110, 97 and 115. Find the payoff with an arithmetic average and with a geometric average, and compare it with a European call and with an average-strike call.
>
> > [!answer]-
> > $$
> > \begin{align*}
> > \bar{S}_{\text{arith}} &= \frac{104 + 110 + 97 + 115}{4} \\
> > &= 106.50 \\
> > \bar{S}_{\text{geo}} &= \left(104 \times 110 \times 97 \times 115\right)^{1/4} \\
> > &= 106.29
> > \end{align*}
> > $$
> > The arithmetic Asian call pays $106.50 - 100 = 6.50$ and the geometric one pays $6.29$. The geometric average is never above the arithmetic one, so a geometric Asian call is worth a little less. A European call pays $115 - 100 = 15$, because the index ended at its high, and an average-strike call pays $115 - 106.50 = 8.50$. A buyer who needs the average price, such as an insurer crediting an annuity on the average of an index, does not need to pay for the European call's exposure to the last day.

> [!tip]- How it appears on the exam
> - **INV-201 objective 1c:** Questions ask how European, American, Bermudan and Asian options differ, and how an exotic's payoff and price compare with those of the regular option. A typical answer ranks the prices and explains the ranking.
> - **Calculation:** A question may give a price path and ask for the payoff of an Asian, lookback, barrier or binary option, or use in-out parity or the binary decomposition to price one option from others.
> - **Written:** Questions ask why a client would prefer an exotic, such as an Asian option for a buyer who pays an average price or a barrier option for a cheaper view, and what makes it harder to hedge.
> - **Objective 3b:** The static replication of exotics and variance swaps with a portfolio of regular options returns under the Greeks and hedging, alongside [[Option Greeks|option Greeks]].

> [!warning]- Exam traps
> - **In-out parity terms:** The parity holds only when the knock-in and knock-out have the same barrier, strike, expiry and monitoring. It also assumes no rebate is paid when a knock-out dies.
> - **Averaging dates:** The average uses only the stated observation dates, not every price on the path. Including the starting price $S_0$ when the contract does not changes the payoff.
> - **Average price vs average strike:** An average-price call compares the average with $K$, while an average-strike call compares $S_T$ with the average. Using one formula for the other gives 6.50 where 8.50 was asked, as in the second example.
> - **Cheaper is not always true:** A barrier option and an Asian option are cheaper than the regular option, but a lookback is dearer and a chooser is dearer than either a call or a put alone. Rank each by what the holder gains or gives up.
