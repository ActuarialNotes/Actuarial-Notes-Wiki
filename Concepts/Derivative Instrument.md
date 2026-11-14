---
verification:
  status: unverified
  confidence: null
  last_checked: null
  last_checked_by: null
  content_hash: sha256:5a67cbb5115c1029013d45edb9b4dee4e89795f07ff5cb056a82eaf60bec2226
  sources: []
  open_findings: 0
  open_critical: 0
  log: .verify/Concepts/Derivative Instrument.md
---

A **Derivative Instrument** is a contract whose value is derived from the value of an underlying variable, such as a stock or index price, a commodity price, an interest rate, an exchange rate or a credit event. The four basic types are forwards, futures, swaps and options. Each is defined by its [[Payoff|payoff]], and each is priced so that no [[Risk-Neutral Valuation|arbitrage]] is possible between it and the underlying.

Following Hull, $S_0$ and $S_T$ are the underlying's price now and at the delivery or expiry date $T$, and $K$ is the delivery price or strike.

## Forward contract

A **forward** is an agreement to buy or sell the underlying at time $T$ for the price $K$ fixed today. Nothing is paid at the start. The long party's payoff at $T$ is

> $$S_T - K$$

and the short party's payoff is $K - S_T$. When the contract is written, $K$ is set equal to the forward price, so the contract is worth zero on day one. For an underlying with an income yield, the forward price is

> $$F_0 = S_0\,e^{(r-q)T}$$

- $r$ is the continuously compounded risk-free rate.
- $q$ is the underlying's dividend or income yield.

$K$ is fixed for the life of a contract, while the forward price $F_t$ changes every day. A forward written today has $K = F_0$ and is worth zero, but later its value to the long party is $(F_t - K)e^{-r(T-t)}$.

## Futures contract

A **futures** contract is a forward that is standardized and traded on an exchange. The exchange fixes the quantity, quality, delivery dates and places, and a clearing house stands between the two parties. Gains and losses are paid every day through [[Daily Settlement|daily settlement]], so the total gain of $F_T - F_0$ arrives in daily pieces rather than all at $T$. Daily settlement removes most counterparty risk, but it adds the need to fund margin calls. A hedger who is right at expiry can still be forced out of a futures hedge by a run of losses before then.

| | Forward | Futures |
| :--- | :--- | :--- |
| Terms | Private and tailored | Standardized, on an exchange |
| Settlement | Once, at the end | Daily |
| Delivery | Usually held to delivery | Usually closed out before delivery |
| Credit risk | The other party's [[Credit Risk|credit risk]] | Managed by the clearing house through margin |

When interest rates are known in advance, the forward and futures prices for the same date are equal.

## Option

A **call** gives the holder the right to buy at $K$ and a **put** the right to sell at $K$, so the holder pays a premium up front and the payoff is never negative. A long call's payoff is

> $$\max(S_T - K,\ 0)$$

A [[European Option|European option]] is exercised only at $T$ and an American option at any time up to $T$. Caps, floors and [[Swaption|swaptions]] are options on interest rates, and a credit default swap pays the loss on a reference entity's default in return for a periodic fee.

> [!example]- What do the forward, the futures and the call each pay this jeweller, and what is the call's profit? {Example}
> A jeweller needs 100 ounces of gold in six months. It can buy a forward at $\$2{,}000$ an ounce, buy one futures contract on 100 ounces at a futures price of $\$2{,}000$, or buy a six-month call with a strike of $\$2{,}000$ for a premium of $\$60$ an ounce. The gold price in six months is $\$1{,}800$, $\$2{,}000$ or $\$2{,}200$. Ignore interest.
>
> > [!answer]-
> > - The forward pays $100(S_T - 2{,}000)$ at delivery.
> > - At expiry the futures price converges to the spot price, so the futures gains the same total, but receives it day by day through the margin account.
> > - The call pays $100\max(S_T - 2{,}000,\ 0)$ and costs $100 \times 60 = \$6{,}000$ up front.
> >
> > | $S_T$ | Forward | Futures | Call payoff | Call profit |
> > | ---: | ---: | ---: | ---: | ---: |
> > | 1,800 | -20,000 | -20,000 | 0 | -6,000 |
> > | 2,000 | 0 | 0 | 0 | -6,000 |
> > | 2,200 | 20,000 | 20,000 | 20,000 | 14,000 |
> >
> > - The forward and the futures lock in a cost of $\$2{,}000$ an ounce whichever way the price moves.
> > - The call caps the cost at $\$2{,}000$ plus the $\$60$ premium but lets the jeweller benefit if gold falls, which is what the premium buys.

## Swap

A **swap** exchanges two streams of cash flows on a notional. In a plain interest rate swap one party pays a fixed rate and the other pays a floating rate, and only the net amount changes hands. A currency swap exchanges principal and interest in two currencies. A swap is a portfolio of forward contracts, one for each payment date. The pay-fixed party's net receipt for period $i$ is

> $$L\,\tau\,(R_i - s_K)$$

- $L$ is the notional principal.
- $\tau$ is the accrual fraction of the period.
- $R_i$ is the floating rate for period $i$.
- $s_K$ is the fixed rate.

"Pay fixed" means receive floating, so a pay-fixed swap gains when rates rise. The receive-fixed party's net receipt is the negative, $L\,\tau\,(s_K - R_i)$.

> [!example]- What is this insurer's net payment each year on its receive-fixed swap? {Example}
> An insurer with floating-rate assets wants a fixed income. It enters a three-year swap on a notional of $\$50$ million, annual payments, in which it receives a fixed rate of 4.0% and pays the floating rate. The floating rates for the three years turn out to be 3.5%, 4.2% and 4.8%.
>
> > [!answer]-
> > - The insurer receives $L(s_K - R_i)$ each year, with $\tau = 1$.
> > - Year 1: $50{,}000{,}000(0.040 - 0.035) = \$250{,}000$ received.
> > - Year 2: $50{,}000{,}000(0.040 - 0.042) = -\$100{,}000$, a payment.
> > - Year 3: $50{,}000{,}000(0.040 - 0.048) = -\$400{,}000$, a payment.
> > - Added to the floating income from its assets, these payments turn the income into a fixed 4.0% on $\$50$ million each year, which is the hedge. The notional itself is never exchanged.

## Exchange-traded and OTC markets

Exchange-traded contracts are standardized, quoted publicly and cleared through a central counterparty. Over-the-counter (OTC) contracts are negotiated directly between two parties, usually a dealer and a client, so they can be tailored to the exact amount and date being hedged. Since 2008, standard OTC swaps have had to go through [[Central Clearing|central clearing]] as well.

## Uses of derivatives

Hedgers use derivatives to reduce a risk they already have, speculators use them to take a leveraged view, and arbitrageurs lock in a riskless profit when a derivative and its underlying are mispriced against each other. An insurer meets them on both sides: it [[Hedging|hedges]] with them, and it writes them inside its products as [[Embedded Option|embedded options]].

> [!trap] Payoff versus profit
> A forward or futures contract costs nothing to enter, so its profit equals its payoff. An option's profit is its payoff less the premium. A call that expires out of the money has a payoff of zero but a negative profit, $-\$6{,}000$ in the jeweller example.
