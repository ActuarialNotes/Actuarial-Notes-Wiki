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
  content_hash: sha256:3bbf8feed7b75542eeaab2bd8f8e56747a1f808864c012d4ad9b54752606b539
  sources: []
  open_findings: 0
  open_critical: 0
  log: .verify/Concepts/Option Trading Strategy.md
---
An **Option Trading Strategy** combines options on the same underlying, with different strikes or with the underlying itself, so that the total [[Payoff|payoff]] has a chosen shape: protection below a level, gains capped above one, a bet on a large move or on no move. Each strategy expresses a view on the direction or the [[Volatility|volatility]] of the underlying.

A strategy's payoff at expiry is the sum of its legs' payoffs, and its profit is

> $$\text{Profit} = \text{Payoff} - \text{Net premium}$$

- $\text{Net premium}$ is the premiums paid for the options bought less the premiums received for the options written.

The buyer of an option pays the premium at the start and the writer receives it. Profits here ignore interest on the premiums. Every strategy is a [[Replicating Portfolio|portfolio]] of calls, puts, stock and bonds, so its value today is the sum of the values of its legs. All options are [[European Option|European]] with a common expiry $T$, $S_T$ is the underlying's price at $T$, the strikes are $K_1 < K_2 < K_3$, and $x^+ = \max(x, 0)$.

## Option and underlying

A covered call is long the stock and short a call, with payoff $\min(S_T, K)$. It earns the premium but gives up any gain above $K$, so it suits a holder who expects little movement. By [[Put-Call Parity|put-call parity]], a covered call has the same payoff as a short put plus a bond paying $K$. A protective put is long the stock and long a put, with payoff $\max(S_T, K)$, which is insurance against a fall.

## Bull and bear spreads

A bull spread buys the lower strike and sells the higher one, using calls or puts. Built from calls, its payoff is

> $$(S_T - K_1)^+ - (S_T - K_2)^+$$

A bull spread gains from a moderate rise, with both the gain and the loss capped. A bear spread buys the higher strike and sells the lower one, and gains from a fall. A bull call spread costs money up front, while a bull put spread brings in a premium. An [[Indexed Annuity|indexed annuity]] with a floor and a cap gives the policyholder a call spread on the index.

## Butterfly spread

A butterfly is long one call at $K_1$, short two at $K_2$ and long one at $K_3$, with $K_2$ halfway between the others. Its payoff is

> $$(S_T - K_1)^+ - 2(S_T - K_2)^+ + (S_T - K_3)^+$$

The payoff is a tent that peaks at $K_3 - K_2$ when $S_T = K_2$ and is zero outside $[K_1, K_3]$. A butterfly is a cheap bet that the price stays near $K_2$, which is a bet on low volatility. The same payoff can be built from puts.

> [!example]- What are the net premium, the profit at each price and the break-even prices of this butterfly? {Example}
> A stock trades at $\$100$. An investor buys a call with $K = 90$ for $\$14.20$, sells two calls with $K = 100$ for $\$8.10$ each and buys a call with $K = 110$ for $\$4.00$, all expiring together in three months. The prices at expiry considered are $85$, $95$, $100$, $105$ and $115$.
>
> > [!answer]-
> > - The net premium is $14.20 - 2(8.10) + 4.00 = 2.00$.
> > - The payoff at each price is the sum of the three legs, and the profit subtracts $2.00$:
> >
> > | $S_T$ | Long 90 call | Short two 100 calls | Long 110 call | Payoff | Profit |
> > | ---: | ---: | ---: | ---: | ---: | ---: |
> > | 85 | 0 | 0 | 0 | 0 | -2.00 |
> > | 95 | 5 | 0 | 0 | 5 | 3.00 |
> > | 100 | 10 | 0 | 0 | 10 | 8.00 |
> > | 105 | 15 | -10 | 0 | 5 | 3.00 |
> > | 115 | 25 | -30 | 5 | 0 | -2.00 |
> >
> > - The profit is zero where the payoff equals $2.00$, at $S_T = 92$ and $S_T = 108$.
> > - The investor risks at most $\$2.00$ to gain up to $\$8.00$, if the price ends between $\$92$ and $\$108$.

## Straddle and strangle

A straddle is a call and a put at the same strike, with payoff $|S_T - K|$, which gains from a large move in either direction. A strangle uses a put at $K_1$ and a call at $K_2$, with payoff

> $$(K_1 - S_T)^+ + (S_T - K_2)^+$$

A strangle is cheaper than a straddle, but the price has to move further before it pays anything. Both are bets on high volatility, and selling them is a bet on calm markets with unlimited loss.

## Collar

A collar holds the stock, buys a put at $K_1$ and sells a call at $K_2$. Its value at $T$ is

> $$\min\!\big(\max(S_T,\ K_1),\ K_2\big)$$

In a zero-cost collar, $K_2$ is chosen so the call premium pays for the put, and the holder pays for the protection by giving up the gains above $K_2$.

> [!example]- Which listed call strike gives this fund the highest cap that still pays for the put, and what range of values does the collar give? {Example}
> A pension fund holds a share worth $\$100$ and wants to lock in at least $\$90$ in one year. A one-year put with $K_1 = 90$ costs $\$4.02$. One-year calls are quoted at:
>
> | Strike | 115 | 120 | 125 | 130 |
> | :--- | ---: | ---: | ---: | ---: |
> | Call premium ($) | 6.04 | 4.74 | 3.69 | 2.85 |
>
> > [!answer]-
> > - Selling a call must bring in at least \$4.02.
> > - The 120 call brings in $\$4.74$, while the 125 call brings in only $\$3.69$, so 120 is the highest listed strike that pays for the put.
> > - The net premium is $4.02 - 4.74 = -0.72$, so the fund receives $\$0.72$ per share.
> > - Its value at the end of the year is $\min(\max(S_T, 90), 120)$, which lies between $\$90$ and $\$120$.

> [!trap] Payoff versus profit
> The payoff ignores the premiums, and the profit subtracts the net premium. A bull put spread has a payoff of zero or less, but a positive profit when the price rises, because it was entered for a credit.
