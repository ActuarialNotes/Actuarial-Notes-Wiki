---
aliases:
  - Rebalancing
verification:
  status: unverified
  confidence: null
  last_checked: null
  last_checked_by: null
  content_hash: sha256:635c5536f7b0630b281e6d3695dd0cc967895f89dd61d32402c5a9a20d4cf83b
  sources: []
  open_findings: 0
  open_critical: 0
  log: .verify/Concepts/Portfolio Rebalancing.md
---
**Portfolio rebalancing** is the trading that brings a [[Portfolio|portfolio's]] asset-class weights back to their target allocation after market movements have pushed them away. It keeps the portfolio's risk at the level the strategic asset allocation chose, at the cost of transaction costs and, for a taxable investor, taxes. The policy for when and how far to rebalance is part of the investment policy.

> $$w_{i,1} = \frac{w_{i,0}(1 + R_i)}{1 + R_p}$$

> $$R_p = \sum_j w_{j,0}R_j$$

> $$\text{Trade}_i = \left(w_i^* - w_{i,1}\right)V_1$$

- **Symbols:** $w_{i,0}$ is the weight of asset class $i$ after the last rebalancing, $R_i$ is its return since then and $R_p$ is the portfolio's return. $w_{i,1}$ is the drifted weight, $w_i^*$ is the target weight and $V_1$ is the portfolio's value now, so a positive trade is a purchase.
- **Calendar and range rebalancing:** Calendar rebalancing trades back to the targets at fixed intervals, such as each quarter, however far the weights have drifted. Percentage-range (corridor) rebalancing trades only when a weight leaves a band around its target, such as $60\% \pm 5$ percentage points, so trading follows the drift rather than the calendar, at the cost of monitoring the portfolio. A breach can be corrected all the way to the target or only back to the edge of the band.
- **Corridor width and the trade-off:** Trading costs money, and not trading leaves the portfolio away from the allocation it was designed to hold, which shows up as tracking error against the target-weight portfolio. A corridor is therefore set wider when transaction costs are higher, when the investor tolerates more risk, or when the asset class moves closely with the rest of the portfolio, and narrower when the asset class or the rest of the portfolio is more volatile.
- **Two meanings of rebalancing:** INV-101 uses the word in this sense, for restoring asset-class weights. The rebalancing in [[Delta Hedging|delta hedging]] (FAM, ALTAM) resets a hedge's holding of the underlying as an option's delta changes, so that the hedge stays neutral to small price moves; its cost is the hedging error between rebalancing dates, not drift from a target allocation.

> [!example]- Rebalancing a 60/40 Portfolio After an Equity Rally {Example}
> A pension fund holds \$100 million with a target of $60\%$ equities and $40\%$ bonds, and it rebalances when the equity weight leaves the range $55\%$ to $65\%$. Over a year, equities return $+25\%$ and bonds $-3\%$. Find the new equity weight, and the trade needed (a) to restore the target and (b) to return only to the edge of the range. Transaction costs are $0.10\%$ of the amount traded on each side of a trade.
>
> > [!answer]-
> > Equities grow to $75.00$ and bonds fall to $38.80$, so the portfolio is worth $113.80$ million.
> > $$
> > \begin{align*}
> > R_p &= 0.6(0.25) + 0.4(-0.03) \\
> > &= 0.138 \\
> > w_{E,1} &= \frac{0.6(1.25)}{1.138} \\
> > &= 0.65905
> > \end{align*}
> > $$
> > The equity weight of $65.9\%$ is outside the range, so the fund rebalances.
> >
> > **(a)** The target holding is $0.60(113.80) = 68.28$, so the fund sells $75.00 - 68.28 = 6.72$ million of equities and buys $6.72$ million of bonds, at a cost of $2(6.72)(0.001) = 0.01344$ million, or \$13,440.
> >
> > **(b)** The edge of the range is $0.65(113.80) = 73.97$, so the fund sells $1.03$ million of equities and buys the same amount of bonds, at a cost of \$2,060.
> >
> > Returning to the edge costs less than a sixth as much, but it leaves the portfolio at $65\%$ equities, more risk than the policy targets, and a little more equity growth would breach the range again.

> [!example]- Rebalancing When Returns Reverse and When They Trend {Example}
> A \$100 portfolio starts at $60\%$ equities and $40\%$ cash, which earns nothing. Compare buying and holding with rebalancing to $60/40$ after the first period, when equities return (a) $+25\%$ and then $-20\%$, and (b) $+25\%$ in both periods.
>
> > [!answer]-
> > After the first period both portfolios hold $75$ in equities and $40$ in cash, a total of $115$. Rebalancing moves them to $69$ in equities and $46$ in cash.
> >
> > **(a)** Buying and holding ends with $75(0.80) + 40 = 100.00$. Rebalancing ends with $69(0.80) + 46 = 101.20$.
> >
> > **(b)** Buying and holding ends with $75(1.25) + 40 = 133.75$. Rebalancing ends with $69(1.25) + 46 = 132.25$.
> >
> > Rebalancing sells what has risen and buys what has fallen. It gains when returns reverse and gives up return when they trend, so its value is the control of risk rather than a reliable gain in return.

> [!tip]- How it appears on the exam
> - **INV-101** asks candidates to "demonstrate an understanding of portfolio construction approaches and techniques for asset allocation, passive/active management and rebalancing". A calculation gives target weights, a corridor and a period's returns, and asks for the drifted weights, whether the corridor is breached and the trades that restore the allocation.
> - **Explaining the policy:** Questions also ask candidates to recommend calendar or range rebalancing for a given investor, and to say whether a corridor should be wider or narrower given the investor's costs, risk tolerance and the asset class's volatility and correlation.

> [!warning]- Exam traps
> - **Percentage points or percent of target:** A corridor of $\pm 5$ percentage points around $60\%$ is $55\%$ to $65\%$, while $\pm 10\%$ of the target is $54\%$ to $66\%$. Reading one as the other moves the trigger and can reverse the decision to trade.
> - **The drifted weight:** The new weight divides the grown holding by the grown portfolio, $1 + R_p$. Adding the asset's return to its old weight, $60\% + 25\%$, is meaningless.
> - **To the target or to the edge:** The trade size depends on which the policy says. Sizing a trade to the target when the policy rebalances to the edge overstates the trade and its cost.
> - **Hedge rebalancing is different:** Rebalancing a delta hedge after a price move trades the underlying to restore a hedge ratio, not an asset mix, and its cost is driven by gamma and volatility rather than by drift.
