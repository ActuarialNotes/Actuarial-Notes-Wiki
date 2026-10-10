---
aliases:
  - Derivatives Strategy
  - Call Spread
  - Put Spread
  - Butterfly Spread
  - Collar
  - Strangle
verification:
  status: unverified
  confidence: null
  last_checked: null
  last_checked_by: null
  content_hash: sha256:d197c0322c97bb7c6e40a225beee7332be7956092b35b9665121b762bdc24383
  sources: []
  open_findings: 0
  open_critical: 0
  log: .verify/Concepts/Option Trading Strategy.md
---
An **option trading strategy** combines options on the same underlying, with different strikes or with the underlying itself, so that the total [[Payoff|payoff]] has a chosen shape: protection below a level, gains capped above one, a bet on a large move or on no move. Each strategy's payoff is the sum of its legs' payoffs, and each one expresses a view on the direction or the [[Volatility|volatility]] of the underlying.

> $$\text{Bull call spread: } (S_T - K_1)^+ - (S_T - K_2)^+$$

> $$\text{Butterfly: } (S_T - K_1)^+ - 2(S_T - K_2)^+ + (S_T - K_3)^+$$

> $$\text{Strangle: } (K_1 - S_T)^+ + (S_T - K_2)^+$$

> $$\text{Collar: } \min\!\big(\max(S_T,\ K_1),\ K_2\big)$$

> $$\text{Profit} = \text{Payoff} - \text{Net premium}$$

- **Symbols:** Following Hull chapter 12, $S_T$ is the underlying's price at the common expiry $T$, the strikes are $K_1 < K_2 < K_3$, and $x^+ = \max(x, 0)$. All options are [[European Option|European]], and profits ignore interest on the premiums.
- **Option and underlying:** A covered call is long the stock and short a call, with payoff $\min(S_T, K)$. It earns the premium but gives up any gain above $K$, so it suits a holder who expects little movement. A protective put is long the stock and long a put, with payoff $\max(S_T, K)$, which is insurance against a fall. By [[Put-Call Parity|put-call parity]], a covered call has the same payoff as a short put plus a bond paying $K$.
- **Bull and bear spreads:** A bull spread buys the lower strike and sells the higher one, using calls or puts, and gains from a moderate rise with both the gain and the loss capped. A bear spread does the reverse and gains from a fall. A bull call spread costs money up front, while a bull put spread brings in a premium.
- **Butterfly spread:** A butterfly is long one call at $K_1$, short two at $K_2$ and long one at $K_3$, with $K_2$ halfway between the others. Its payoff is a tent that peaks at $K_3 - K_2$ when $S_T = K_2$ and is zero outside $[K_1, K_3]$, so it is a cheap bet that the price stays near $K_2$, which is a bet on low volatility. The same payoff can be built from puts.
- **Straddle and strangle:** A straddle is a call and a put at the same strike, with payoff $|S_T - K|$, which gains from a large move in either direction. A strangle uses a put at $K_1$ and a call at $K_2$. It is cheaper than a straddle, but the price has to move further before it pays anything. Both are bets on high volatility, and selling them is a bet on calm markets with unlimited loss.
- **Collar:** A collar holds the stock, buys a put at $K_1$ and sells a call at $K_2$. The value at $T$ is kept between $K_1$ and $K_2$. In a zero-cost collar, $K_2$ is chosen so the call premium pays for the put, and the holder pays for the protection by giving up the gains above $K_2$.
- **Building blocks:** Every strategy here is a [[Replicating Portfolio|portfolio]] of calls, puts, stock and bonds, so its value today is the sum of the values of the legs. An insurer's guarantees often hide the same shapes, as when an [[Indexed Annuity|indexed annuity]] with a floor and a cap gives the policyholder a call spread on the index.

> [!example]- Payoff Table for a Butterfly Spread {Example}
> A stock trades at \$100. An investor who expects it to stay near \$100 for three months buys a call with $K = 90$ for \$14.20, sells two calls with $K = 100$ for \$8.10 each and buys a call with $K = 110$ for \$4.00, all expiring together. Find the net premium, the payoff and the profit at $S_T = 85$, 95, 100, 105 and 115, and the break-even prices.
>
> > [!answer]-
> > $$
> > \begin{align*}
> > \text{Net premium} &= 14.20 - 2(8.10) + 4.00 \\
> > &= 2.00
> > \end{align*}
> > $$
> > The payoff is $(S_T - 90)^+ - 2(S_T - 100)^+ + (S_T - 110)^+$.
> >
> > | $S_T$ | Long 90 call | Short two 100 calls | Long 110 call | Payoff | Profit |
> > |---|---|---|---|---|---|
> > | 85 | 0 | 0 | 0 | 0 | -2.00 |
> > | 95 | 5 | 0 | 0 | 5 | 3.00 |
> > | 100 | 10 | 0 | 0 | 10 | 8.00 |
> > | 105 | 15 | -10 | 0 | 5 | 3.00 |
> > | 115 | 25 | -30 | 5 | 0 | -2.00 |
> >
> > The profit is zero where the payoff equals the \$2.00 premium, at $S_T = 92$ and $S_T = 108$. The investor risks at most \$2.00 to gain up to \$8.00, but only if the price ends between \$92 and \$108.

> [!example]- Choosing the Call Strike for a Zero-Cost Collar {Example}
> A pension fund holds a share worth \$100 and wants to lock in at least \$90 in one year. A one-year put with $K_1 = 90$ costs \$4.02. One-year calls are quoted at \$6.04 for $K = 115$, \$4.74 for $K = 120$, \$3.69 for $K = 125$ and \$2.85 for $K = 130$. Which listed strike gives the highest cap that still pays for the put, and what range of values does the collar give?
>
> > [!answer]-
> > Selling a call must bring in at least \$4.02. The 120 call brings in \$4.74, while the 125 call brings in only \$3.69, so 120 is the highest listed strike that pays for the put.
> > $$
> > \begin{align*}
> > \text{Net premium} &= 4.02 - 4.74 \\
> > &= -0.72
> > \end{align*}
> > $$
> > The fund receives a net \$0.72 per share, and its value at the end of the year is $\min(\max(S_T, 90), 120)$, which lies between \$90 and \$120. A dealer quoting an OTC collar would set the strike between the two listed ones so the premiums match exactly. With the Black-Scholes inputs behind these prices ($r = 4\%$, $\sigma = 25\%$, no dividends), that strike is about \$123.27. A higher volatility raises both premiums, and the zero-cost cap rises with it.

> [!tip]- How it appears on the exam
> - **INV-201 objective 1e:** Questions name a strategy, such as a call or put spread, collar, covered call, butterfly, straddle or strangle, and ask for its payoff or profit at given prices, its payoff diagram, its break-even points or its maximum gain and loss.
> - **Reverse questions:** A question may give a payoff diagram or table and ask which combination of options produces it, or ask how to build the same payoff from puts instead of calls.
> - **Market view:** Written parts ask which strategy suits a stated view, such as a moderate rise, little movement, or a large move in an unknown direction, and how the premiums compare across strategies.
> - **Later objectives:** Collars and call spreads reappear in the third objective as the [[Embedded Option|embedded options]] in indexed and variable annuities.

> [!warning]- Exam traps
> - **Payoff vs profit:** The payoff ignores the premiums, and the profit subtracts the net premium. A bull put spread has a payoff of zero or less but a positive profit when the price rises, because it was entered for a credit.
> - **Butterfly weights:** The middle strike is sold twice, not once. With one short call the payoff above $K_2$ keeps rising instead of returning to zero.
> - **Which strike is which:** A bull spread buys the lower strike, and a bear spread buys the higher one. Swapping them reverses the view and the sign of the net premium.
> - **Strangle legs:** The put has the lower strike and the call the higher one. With the strikes the other way round, both options are in the money between the strikes and the position is a much more expensive guts strategy.
