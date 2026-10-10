---
verification:
  status: unverified
  confidence: null
  last_checked: null
  last_checked_by: null
  content_hash: sha256:13f93b69fd6478f8123fb00a472598e3f25d432edc5b63b40a18ee287cb684e1
  sources: []
  open_findings: 0
  open_critical: 0
  log: .verify/Concepts/Derivative Instrument.md
---

A **derivative instrument** is a contract whose value is derived from the value of an underlying variable, such as a stock or index price, a commodity price, an interest rate, an exchange rate or a credit event. The four basic types are forwards, futures, swaps and options; each is defined by its [[Payoff|payoff]], and each is priced so that no [[Risk-Neutral Valuation|arbitrage]] is possible between it and the underlying.

> $$\text{Long forward: } S_T - K$$

> $$F_0 = S_0\,e^{(r-q)T}$$

> $$\text{Long call: } \max(S_T - K,\ 0)$$

> $$\text{Pay-fixed swap, period } i\text{: } L\,\tau\,(R_i - s_K)$$

- **Symbols:** Following Hull, $S_0$ and $S_T$ are the underlying's price now and at the delivery or expiry date $T$, $K$ is the delivery price or strike, $r$ is the continuously compounded risk-free rate, $q$ is the underlying's dividend or income yield, and $F_0$ is the forward price. In the swap, $L$ is the notional principal, $\tau$ is the accrual fraction of the period, $R_i$ is the floating rate for period $i$ and $s_K$ is the fixed rate.
- **Forward:** A forward is an agreement to buy or sell the underlying at time $T$ for the price $K$ fixed today. The long party gains $S_T - K$ and the short party gains $K - S_T$, and nothing is paid at the start. When the contract is written, $K$ is set equal to the forward price $F_0$, so the contract is worth zero on day one.
- **Futures:** A futures contract is a forward that is standardized and traded on an exchange. The exchange fixes the quantity, quality, delivery dates and places, and a clearing house stands between the two parties. Gains and losses are paid every day through [[Daily Settlement|daily settlement]], so the total gain of $F_T - F_0$ arrives in daily pieces rather than all at $T$.
- **Swap:** A swap exchanges two streams of cash flows on a notional. In a plain interest rate swap one party pays a fixed rate and the other pays a floating rate, and only the net amount changes hands. A currency swap exchanges principal and interest in two currencies. A swap is a portfolio of forward contracts, one for each payment date.
- **Option:** A call gives the holder the right to buy at $K$ and a put the right to sell at $K$, so the holder pays a premium up front and the payoff is never negative. A [[European Option|European option]] is exercised only at $T$ and an American option at any time up to $T$. Caps, floors and [[Swaption|swaptions]] are options on interest rates, and a credit default swap pays the loss on a reference entity's default in return for a periodic fee.
- **Exchange-traded vs OTC:** Exchange-traded contracts are standardized, quoted publicly and cleared through a central counterparty. Over-the-counter (OTC) contracts are negotiated directly between two parties, usually a dealer and a client, so they can be tailored to the exact amount and date being hedged. Since 2008, standard OTC swaps have had to go through [[Central Clearing|central clearing]] as well.
- **Forwards vs futures:** A forward is private, tailored, settled once at the end and carries the [[Credit Risk|credit risk]] of the other party. A futures contract is standardized, settled daily, usually closed out before delivery, and its credit risk is managed by the clearing house through margin. When interest rates are known in advance, the forward and futures prices for the same date are equal.
- **Uses:** Hedgers use derivatives to reduce a risk they already have, speculators use them to take a leveraged view, and arbitrageurs lock in a riskless profit when a derivative and its underlying are mispriced against each other. An insurer meets them on both sides: it [[Hedging|hedges]] with them, and it writes them inside its products as [[Embedded Option|embedded options]].

> [!example]- Forward, Futures and Call on the Same Gold Position {Example}
> A jeweller needs 100 ounces of gold in six months. It can buy a forward at \$2,000 an ounce, buy one futures contract on 100 ounces at a futures price of \$2,000, or buy a six-month call with a strike of \$2,000 for a premium of \$60 an ounce. Find the payoff of each position, and the profit of the call, if the gold price in six months is \$1,800, \$2,000 or \$2,200. Ignore interest.
>
> > [!answer]-
> > The forward pays $100(S_T - 2{,}000)$ at delivery. At expiry the futures price converges to the spot price, so the futures position gains the same total, $100(F_T - F_0)$, but receives it day by day through the margin account. The call pays $100\max(S_T - 2{,}000,\ 0)$ and costs $100 \times 60 = \$6{,}000$ up front.
> >
> > | $S_T$ | Forward | Futures | Call payoff | Call profit |
> > |---|---|---|---|---|
> > | 1,800 | -20,000 | -20,000 | 0 | -6,000 |
> > | 2,000 | 0 | 0 | 0 | -6,000 |
> > | 2,200 | 20,000 | 20,000 | 20,000 | 14,000 |
> >
> > The forward and the futures lock in a cost of \$2,000 an ounce whichever way the price moves. The call caps the cost at \$2,000 plus the \$60 premium but lets the jeweller benefit if gold falls, which is what the premium buys.

> [!example]- Net Payments on a Pay-Fixed Interest Rate Swap {Example}
> An insurer with floating-rate assets wants a fixed income. It enters a three-year swap on a notional of \$50 million, annual payments, in which it receives a fixed rate of 4.0% and pays the floating rate. The floating rates for the three years turn out to be 3.5%, 4.2% and 4.8%. Find the insurer's net payment each year.
>
> > [!answer]-
> > The insurer receives $L(s_K - R_i)$ each year, with $\tau = 1$.
> > $$
> > \begin{align*}
> > \text{Year 1} &= 50{,}000{,}000(0.040 - 0.035) \\
> > &= 250{,}000 \\
> > \text{Year 2} &= 50{,}000{,}000(0.040 - 0.042) \\
> > &= -100{,}000 \\
> > \text{Year 3} &= 50{,}000{,}000(0.040 - 0.048) \\
> > &= -400{,}000
> > \end{align*}
> > $$
> > The insurer receives \$250,000 in year 1 and pays \$100,000 and \$400,000 in years 2 and 3. Added to the floating income from its assets, these payments turn the income into a fixed 4.0% on \$50 million each year, which is the hedge. The notional itself is never exchanged.

> [!tip]- How it appears on the exam
> - **INV-201 objective 1a:** Questions give a position in a forward, futures contract, swap, call, put, cap, floor or swaption and ask for its payoff at stated values of the underlying, often as a table or diagram, and sometimes ask for the profit once the premium is included.
> - **Objective 1b:** Written questions ask for the differences between forwards and futures. A full answer covers standardization, the exchange and clearing house, daily settlement, closing out before delivery, and who bears the credit risk.
> - **Objective 1d:** Questions ask how exchange-traded and OTC markets differ and how each manages counterparty risk, which leads into [[Central Clearing|central clearing]] and margin.
> - **Later objectives:** The payoffs here are the inputs to the pricing questions in the second objective, [[Put-Call Parity|put-call parity]], the [[Binomial Option Pricing Model|binomial model]] and the [[Black-Scholes Model|Black-Scholes model]], and to the hedging questions in the third.

> [!warning]- Exam traps
> - **Payoff vs profit:** A forward or futures contract costs nothing to enter, so its profit equals its payoff. An option's profit is its payoff less the premium, so a call that expires out of the money has a payoff of zero but a negative profit.
> - **Delivery price vs forward price:** $K$ is fixed for the life of a contract, while the forward price $F_t$ changes every day. A forward written today has $K = F_0$ and is worth zero, but it is not worth zero later, when its value is $(F_t - K)e^{-r(T-t)}$ for the long party.
> - **Direction of a swap:** "Pay fixed" means receive floating. A pay-fixed swap gains when rates rise, so mixing up the two sides reverses the sign of every payment.
> - **Futures are not riskless:** Daily settlement removes most counterparty risk, but it adds the need to fund margin calls. A hedger who is right at expiry can still be forced out of a futures hedge by a run of losses before then.
