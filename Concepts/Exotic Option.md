---
aliases:
  - Asian Option
verification:
  status: unverified
  confidence: null
  last_checked: null
  last_checked_by: null
  content_hash: sha256:b4472f89c139752c177319b7487c8231ceb9b9200ea6110cdaf81cdd009a731b
  sources: []
  open_findings: 0
  open_critical: 0
  log: .verify/Concepts/Exotic Option.md
---
An **Exotic Option** is any option whose terms differ from those of a plain [[European Option|European]] or American call or put. Its payoff may depend on the path of the underlying price and not only its final value, on more than one exercise decision, or on a fixed cash amount. Exotics are mostly traded over the counter, written to fit a client's exposure, and many of them sit inside insurance and [[Structured Product|structured products]].

Each exotic is priced against the regular option by what the holder gains or gives up. A barrier option and an Asian option are cheaper than the regular option, while a lookback is dearer and a chooser is dearer than either a call or a put alone.

## Bermudan option

A European option can be exercised only at expiry $T$, an American option at any time up to $T$, and a Bermudan option only on a set of dates, such as each coupon date of a callable bond. More exercise rights are worth more, so a Bermudan option is worth at least the European and at most the American.

## Chooser option

The holder of a chooser decides at a time $t_1 < T$ whether the option is a call or a put. By [[Put-Call Parity|put-call parity]], the value at $t_1$ is the call plus a put on the shortfall, so a chooser is a package of a call expiring at $T$ and a put expiring at $t_1$.

## Barrier option

A knock-out option dies if the price reaches a barrier $H$, and a knock-in option comes alive only if it does. Barriers are "up" or "down" according to where $H$ lies relative to the starting price. Holding both the knock-in and the knock-out is the same as holding the regular option, so the in-out parity is

> $$c_{\text{in}} + c_{\text{out}} = c$$

- $c$ is a regular European call.
- $c_{\text{in}}$ and $c_{\text{out}}$ are knock-in and knock-out calls with the same strike $K$, expiry $T$ and barrier.

The parity holds only when the two barrier options have the same barrier, strike, expiry and monitoring, and no rebate is paid when the knock-out dies. Each barrier option is cheaper than the regular option.

> [!example]- What is this down-and-in call worth, and why is it so cheap? {Example}
> A stock trades at $\$100$, with $r = 4\%$, $\sigma = 25\%$ and no dividends. A one-year European call with $K = 100$ is worth $\$11.84$. A down-and-out call with the same terms and a barrier of $H = 85$ is worth $\$10.58$. The down-and-in call has the same terms and barrier.
>
> > [!answer]-
> > - If the price touches 85, the knock-out dies and the knock-in comes alive. If it does not, the reverse happens, so together they pay what the regular call pays.
> > - $c_{\text{di}} = c - c_{\text{do}} = 11.84 - 10.58 = 1.26$.
> > - The down-and-in call is worth about $\$1.26$, which matches the closed-form value of $\$1.25$ to rounding.
> > - It is cheap because the price must first fall 15% to activate it and must then recover above $\$100$ by expiry to pay anything.

## Binary option

A cash-or-nothing call pays a fixed cash amount $Q$ if $S_T > K$ and nothing otherwise. Its value is

> $$\text{Cash-or-nothing call} = Q\,e^{-rT}N(d_2)$$

- $d_2$ is as in the [[Black-Scholes Model|Black-Scholes model]].

An asset-or-nothing call pays $S_T$ if $S_T > K$, with value $S_0e^{-qT}N(d_1)$. A regular call is an asset-or-nothing call less $K$ cash-or-nothing calls paying $\$1$ each.

## Lookback option

A floating-strike lookback call pays $S_T - S_{\min}$, buying at the lowest price over the life, and a floating-strike lookback put pays $S_{\max} - S_T$. A fixed-strike lookback call pays $(S_{\max} - K)^+$. Hindsight is expensive, so lookbacks cost more than the regular options.

## Asian option

An average-price option pays on the average of the prices over the averaging period, arithmetic or geometric. An average-price call pays

> $$\left(\bar{S} - K\right)^+$$

- $\bar{S}$ is the average price.

With $S_{t_i}$ the prices on the $n$ averaging dates, the arithmetic average is

> $$\bar{S} = \frac{1}{n}\sum_{i=1}^{n} S_{t_i}$$

The average uses only the stated observation dates, so including the starting price $S_0$ when the contract does not changes the payoff. An average-strike call pays $(S_T - \bar{S})^+$. The average is less volatile than the final price, so an Asian option is cheaper than the European. The geometric average of lognormal prices is lognormal, which gives a closed form, while the arithmetic average needs an approximation or simulation.

> [!example]- What do an average-price call, an average-strike call and a European call pay on this path? {Example}
> A one-year call on an index has $K = 100$, and the average is taken over the quarterly closing prices. The prices at the four quarter-ends turn out to be 104, 110, 97 and 115.
>
> > [!answer]-
> > - The arithmetic average is $(104 + 110 + 97 + 115)/4 = 106.50$, so the arithmetic average-price call pays $106.50 - 100 = 6.50$.
> > - The geometric average is $(104 \times 110 \times 97 \times 115)^{1/4} = 106.29$, so the geometric one pays $6.29$. The geometric average is never above the arithmetic one.
> > - The average-strike call pays $115 - 106.50 = 8.50$.
> > - The European call pays $115 - 100 = 15$, because the index ended at its high.
> > - A buyer who needs the average price, such as an insurer crediting an annuity on the average of an index, does not need to pay for the European call's exposure to the last day.

## Variance and volatility swaps

A variance swap pays the difference between the realized variance and a fixed variance on a notional:

> $$L_{\text{var}}\left(\bar{\sigma}^2 - V_K\right)$$

- $L_{\text{var}}$ is the variance notional.
- $\bar{\sigma}^2$ is the variance realized over the swap's life.
- $V_K$ is the agreed variance.

A volatility swap does the same with the volatility. Neither is an option, but both give a direct position in [[Volatility|volatility]], and a variance swap can be replicated by a static portfolio of calls and puts across strikes.

> [!trap] Average price versus average strike
> An average-price call compares the average with $K$, while an average-strike call compares $S_T$ with the average. Using one formula for the other gives 6.50 where 8.50 was asked, as in the example above.
