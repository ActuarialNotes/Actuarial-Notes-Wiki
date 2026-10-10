---
aliases:
  - Daily Settle
  - Daily Margin Variation
verification:
  status: unverified
  confidence: null
  last_checked: null
  last_checked_by: null
  content_hash: sha256:b058b80a75338a36a933452c701fb26a4b19cf6f6b196d76eb3327e1b8d10b5b
  sources: []
  open_findings: 0
  open_critical: 0
  log: .verify/Concepts/Daily Settlement.md
---
**Daily settlement** is the marking to market of a futures position at the end of every trading day: the change in the settlement price since the day before is paid in cash between the two sides through their margin accounts, so the gain or loss on the contract is realized each day rather than at delivery. It is the mechanism that lets a clearing house guarantee futures trades, and the same daily variation margin is now charged on every centrally cleared OTC trade.

> $$G_t = n\,m\,(F_t - F_{t-1})$$

> $$M_t = M_{t-1} + G_t + D_t$$

> $$D_t = \begin{cases} I - (M_{t-1} + G_t) & \text{if } M_{t-1} + G_t < M_{\min} \\ 0 & \text{otherwise} \end{cases}$$

> $$\sum_{t=1}^{T} G_t = n\,m\,(F_T - F_0)$$

- **Symbols:** $F_t$ is the settlement price at the end of day $t$, $F_0$ is the price at which the position was opened, $n$ is the number of contracts (negative for a short position), and $m$ is the contract size, such as 100 ounces of gold. $G_t$ is the day's gain, $M_t$ is the margin balance, $I$ is the initial margin, $M_{\min}$ is the maintenance margin and $D_t$ is the deposit made in answer to a margin call.
- **Initial margin:** A trader opening a position deposits the initial margin with a broker, who passes it on through a clearing member to the clearing house. It is set to cover what the position could lose in a day or two of large moves, and it is returned when the position is closed.
- **Maintenance margin and margin calls:** The maintenance margin is a floor below the initial margin. When the balance falls below it, the trader gets a margin call and must deposit enough to bring the balance back up to the initial margin, not just to the maintenance level. A trader who does not pay has the position closed out by the broker.
- **Variation margin:** The deposit made after a margin call is variation margin. A balance above the initial margin may be withdrawn, so gains are available in cash the next day.
- **Settlement price:** The settlement price is usually the price of the trades just before the close of trading. Using it to reset every position each day means the contract is, in effect, closed out and rewritten each day at the new price.
- **Total gain:** The daily gains add up to $n\,m\,(F_T - F_0)$, the same total as a [[Derivative Instrument|forward contract]] at the same price. The difference is timing: the futures gain arrives day by day and earns or costs interest along the way.
- **Futures vs forward prices:** When interest rates are known in advance, the two prices are equal. When the futures price tends to rise with interest rates, as for a bond or stock index, daily gains are reinvested at higher rates and losses are financed at lower ones, so a long futures position is worth a little more and its price is a little above the forward price.
- **Convergence:** As the delivery period approaches, the futures price converges to the spot price. A position held into the delivery month has therefore been paid the whole change from $F_0$ to the spot price at delivery.

> [!example]- A Gold Futures Margin Account with a Margin Call {Example}
> A trader buys two gold futures contracts, each on 100 ounces, at \$2,000 an ounce. The initial margin is \$8,000 a contract and the maintenance margin is \$6,000 a contract. The settlement prices over the next five days are \$1,990, \$1,985, \$1,972, \$1,980 and \$1,995, and the trader closes out at the last one. Track the margin account and find the total gain or loss.
>
> > [!answer]-
> > With $n\,m = 200$ ounces, each \$1 move is worth \$200. The account opens at $I = \$16{,}000$, and the maintenance margin is $M_{\min} = \$12{,}000$.
> > $$
> > \begin{align*}
> > M_1 &= 16{,}000 + 200(1{,}990 - 2{,}000) \\
> > &= 14{,}000 \\
> > M_2 &= 14{,}000 + 200(1{,}985 - 1{,}990) \\
> > &= 13{,}000 \\
> > M_3 &= 13{,}000 + 200(1{,}972 - 1{,}985) \\
> > &= 10{,}400
> > \end{align*}
> > $$
> > The balance is below \$12,000, so the trader receives a margin call and must deposit $D_3 = 16{,}000 - 10{,}400 = \$5{,}600$ to restore the initial margin.
> > $$
> > \begin{align*}
> > M_4 &= 16{,}000 + 200(1{,}980 - 1{,}972) \\
> > &= 17{,}600 \\
> > M_5 &= 17{,}600 + 200(1{,}995 - 1{,}980) \\
> > &= 20{,}600
> > \end{align*}
> > $$
> > The trader deposited \$16,000 and then \$5,600, a total of \$21,600, and withdraws \$20,600 on closing out. The loss is \$1,000, which equals $200(1{,}995 - 2{,}000)$, the change in the futures price over the whole period.

> [!example]- The Price That Triggers a Margin Call on a Short Hedge {Example}
> An oil producer sells 10 crude oil futures contracts, each on 1,000 barrels, at \$80.00 a barrel to hedge its production. The initial margin is \$6,000 a contract and the maintenance margin is \$4,500 a contract. Above what futures price does the producer receive its first margin call?
>
> > [!answer]-
> > A short position loses when the price rises. The account can lose the gap between the initial and maintenance margins before a call is made.
> > $$
> > \begin{align*}
> > \text{Loss allowed} &= 10(6{,}000 - 4{,}500) \\
> > &= 15{,}000 \\
> > \text{Price rise} &= \frac{15{,}000}{10 \times 1{,}000} \\
> > &= 1.50
> > \end{align*}
> > $$
> > A margin call follows any settlement price above \$81.50. The rise in the oil price also raises the value of the producer's unsold oil, so the hedge is working, but the margin call has to be paid in cash today while the gain on the oil arrives only when it is sold. This funding strain is the liquidity risk of a futures hedge.

> [!tip]- How it appears on the exam
> - **INV-201 objective 1d:** Questions give a futures position, the initial and maintenance margins and a run of settlement prices, and ask for the balance each day, when margin calls occur and how much is deposited, as in the gold example.
> - **Objective 1b:** Written questions ask how daily settlement makes a futures contract different from a forward, in timing of cash flows, credit risk and liquidity needs, and why the two prices can differ when interest rates are random.
> - **Linked topics:** Questions on [[Central Clearing|central clearing]] ask how variation margin protects a CCP, and questions on hedging failures ask how margin calls on a sound hedge can force a firm to close it.

> [!warning]- Exam traps
> - **Topping up to the wrong level:** After a margin call the trader restores the balance to the initial margin, not to the maintenance margin. Depositing \$1,600 instead of \$5,600 in the gold example is the usual error.
> - **Sign of a short position:** A short position gains when the price falls and loses when it rises. Applying the long formula to a short hedge reverses every daily gain.
> - **Contract size:** The price is quoted per unit, while each contract covers many units. A gold move of \$10 an ounce on two 100-ounce contracts is \$2,000, not \$20.
> - **Counting the call twice:** The total gain over the period is $n\,m\,(F_T - F_0)$ whatever margin calls were made. The deposit is the trader's own money moving into the account, not a loss, so it must not be subtracted again.
