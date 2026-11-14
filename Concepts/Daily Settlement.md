---
aliases:
  - Daily Settle
  - Daily Margin Variation
verification:
  status: unverified
  confidence: null
  last_checked: null
  last_checked_by: null
  content_hash: sha256:6cdd55d0de9fe7e8689083c053cee50b555d3cd344a5bef4d72e6f1a830bd2b0
  sources: []
  open_findings: 0
  open_critical: 0
  log: .verify/Concepts/Daily Settlement.md
---

**Daily Settlement** is the marking to market of a futures position at the end of every trading day. The change in the settlement price since the day before is paid in cash between the two sides through their margin accounts, so the gain or loss on the contract is realized each day rather than at delivery. It is the mechanism that lets a clearing house guarantee futures trades, and the same daily variation margin is now charged on every [[Central Clearing|centrally cleared]] OTC trade.

If $F_t$ is the settlement price at the end of day $t$, the day's gain on a position of $n$ contracts is

> $$G_t = n\,m\,(F_t - F_{t-1})$$

- $n$ is negative for a short position.
- $m$ is the contract size, such as 100 ounces of gold.

The settlement price is usually the price of the trades just before the close of trading. Using it to reset every position each day means the contract is, in effect, closed out and rewritten each day at the new price.

## The margin account

A trader opening a position deposits the **initial margin** with a broker, who passes it on through a clearing member to the clearing house. It is set to cover what the position could lose in a day or two of large moves, and it is returned when the position is closed. The **maintenance margin** is a floor below the initial margin. When the balance falls below it, the trader gets a margin call and must deposit enough to bring the balance back up to the initial margin. A trader who does not pay has the position closed out by the broker.

The margin balance at the end of day $t$ is

> $$M_t = M_{t-1} + G_t + D_t$$

- $D_t$ is the deposit made in answer to a margin call that day.

and the deposit is

> $$D_t = \begin{cases} I - (M_{t-1} + G_t) & \text{if } M_{t-1} + G_t < M_{\min} \\ 0 & \text{otherwise} \end{cases}$$

- $I$ is the initial margin.
- $M_{\min}$ is the maintenance margin.

The deposit made after a margin call is variation margin. A balance above the initial margin may be withdrawn, so gains are available in cash the next day.

> [!example]- What happens in this gold futures margin account, and what is the total gain or loss? {Example}
> A trader buys two gold futures contracts, each on 100 ounces, at $\$2{,}000$ an ounce. The initial margin is $\$8{,}000$ a contract and the maintenance margin is $\$6{,}000$ a contract. The trader closes out at the fifth day's settlement price.
>
> | Day | Settlement price ($) |
> | :--- | ---: |
> | 1 | 1,990 |
> | 2 | 1,985 |
> | 3 | 1,972 |
> | 4 | 1,980 |
> | 5 | 1,995 |
>
> > [!answer]-
> > - With $n\,m = 200$ ounces, each $\$1$ move is worth $\$200$. The account opens at $I = \$16{,}000$, and $M_{\min} = \$12{,}000$.
> > - Day 1 loses $200 \times 10 = \$2{,}000$, so $M_1 = \$14{,}000$.
> > - Day 2 loses $\$1{,}000$, so $M_2 = \$13{,}000$.
> > - Day 3 loses $\$2{,}600$, leaving $\$10{,}400$, below the maintenance margin.
> > - The margin call requires $D_3 = 16{,}000 - 10{,}400 = \$5{,}600$, restoring $M_3 = \$16{,}000$.
> > - Day 4 gains $\$1{,}600$, so $M_4 = \$17{,}600$, and day 5 gains $\$3{,}000$, so $M_5 = \$20{,}600$.
> > - The trader deposited $\$16{,}000 + \$5{,}600 = \$21{,}600$ and withdraws $\$20{,}600$, a loss of $\$1{,}000$.
> > - This equals $200(1{,}995 - 2{,}000)$, the change in the futures price over the whole period.

> [!example]- Above what futures price does this producer receive its first margin call? {Example}
> An oil producer sells 10 crude oil futures contracts, each on 1,000 barrels, at $\$80.00$ a barrel to hedge its production. The initial margin is $\$6{,}000$ a contract and the maintenance margin is $\$4{,}500$ a contract.
>
> > [!answer]-
> > - A short position loses when the price rises.
> > - The account can lose $10(6{,}000 - 4{,}500) = \$15{,}000$ before a call is made.
> > - That is a rise of $15{,}000 / (10 \times 1{,}000) = \$1.50$ a barrel, so a margin call follows any settlement price above $\$81.50$.
> > - The rise also raises the value of the producer's unsold oil, so the hedge is working. But the margin call has to be paid in cash today, while the gain on the oil arrives only when it is sold. This funding strain is the liquidity risk of a futures hedge.

## Total gain and the forward contract

The daily gains add up to

> $$\sum_{t=1}^{T} G_t = n\,m\,(F_T - F_0)$$

- $F_0$ is the price at which the position was opened.

This is the same total as a [[Derivative Instrument|forward contract]] at the same price, whatever margin calls were made. The deposit is the trader's own money moving into the account, not a loss, so it is not subtracted again. The difference from a forward is timing: the futures gain arrives day by day and earns or costs interest along the way.

When interest rates are known in advance, the futures and forward prices are equal. When the futures price tends to rise with interest rates, as for a bond or stock index, daily gains are reinvested at higher rates and losses are financed at lower ones. A long futures position is then worth a little more, and its price is a little above the forward price.

As the delivery period approaches, the futures price converges to the spot price. A position held into the delivery month has therefore been paid the whole change from $F_0$ to the spot price at delivery.

> [!trap] Topping up to the maintenance margin
> After a margin call the trader restores the balance to the initial margin, not to the maintenance margin. In the gold example the deposit is $\$5{,}600$, not the $\$1{,}600$ that would only reach $\$12{,}000$.
