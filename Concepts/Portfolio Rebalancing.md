---
aliases:
  - Rebalancing
verification:
  status: unverified
  confidence: null
  last_checked: null
  last_checked_by: null
  content_hash: sha256:90259b833952725af781b5d00a6608718f234421f98961ea11487726cc4c08bb
  sources: []
  open_findings: 0
  open_critical: 0
  log: .verify/Concepts/Portfolio Rebalancing.md
---

**Portfolio Rebalancing** is the trading that brings a [[Portfolio|portfolio's]] asset-class weights back to their target allocation after market movements have pushed them away. It keeps the portfolio's risk at the level the strategic asset allocation chose, at the cost of transaction costs and, for a taxable investor, taxes.

With $w_{j,0}$ the weight of asset class $j$ after the last rebalancing and $R_j$ its return since then, the portfolio's return is

> $$R_p = \sum_j w_{j,0}R_j$$

The drifted weight of asset class $i$ divides its grown holding by the grown portfolio, so it is

> $$w_{i,1} = \frac{w_{i,0}(1 + R_i)}{1 + R_p}$$

The trade that restores the target weight $w_i^*$ is

> $$\text{Trade}_i = \left(w_i^* - w_{i,1}\right)V_1$$

- $V_1$ is the portfolio's value now.
- A positive trade is a purchase and a negative one a sale.

> [!example]- What trades does this pension fund make, to the target and to the edge of its range, and at what cost? {Example}
> A pension fund holds \$100 million with a target of $60\%$ equities and $40\%$ bonds, and it rebalances when the equity weight leaves the range $55\%$ to $65\%$. Over a year, equities return $+25\%$ and bonds $-3\%$. Transaction costs are $0.10\%$ of the amount traded on each side of a trade.
>
> > [!answer]-
> > - Equities grow to $75.00$ and bonds fall to $38.80$, so the portfolio is worth $113.80$ million.
> > - The portfolio return is $0.6(0.25) + 0.4(-0.03) = 0.138$, so the equity weight is $0.6(1.25)/1.138 = 65.9\%$, outside the range.
> > - To restore the target, the equity holding must be $0.60(113.80) = 68.28$, so the fund sells $6.72$ million of equities and buys $6.72$ million of bonds, at a cost of $2(6.72)(0.001) = 0.01344$ million, or \$13,440.
> > - To return only to the edge of the range, the equity holding must be $0.65(113.80) = 73.97$, so the fund sells $1.03$ million of equities and buys the same amount of bonds, at a cost of \$2,060.
> > - Returning to the edge costs less than a sixth as much, but it leaves the portfolio at $65\%$ equities, more risk than the policy targets, and a little more equity growth would breach the range again.

## Calendar and percentage-range rebalancing

The policy for when and how far to rebalance is part of the investment policy. Calendar rebalancing trades back to the targets at fixed intervals, such as each quarter, however far the weights have drifted. Percentage-range (corridor) rebalancing trades only when a weight leaves a band around its target, such as $60\% \pm 5$ percentage points, so trading follows the drift rather than the calendar, at the cost of monitoring the portfolio. A breach can be corrected all the way to the target or only back to the edge of the band, and the trade size depends on which the policy says.

Trading costs money, and not trading leaves the portfolio away from the allocation it was designed to hold, which shows up as tracking error against the target-weight portfolio. A corridor is therefore set wider when transaction costs are higher, when the investor tolerates more risk, or when the asset class moves closely with the rest of the portfolio. It is set narrower when the asset class or the rest of the portfolio is more volatile.

> [!trap] Percentage points or percent of target
> A corridor of $\pm 5$ percentage points around $60\%$ is $55\%$ to $65\%$, while $\pm 10\%$ of the target is $54\%$ to $66\%$. Reading one as the other moves the trigger and can reverse the decision to trade.

## Rebalancing when returns reverse or trend

Rebalancing sells what has risen and buys what has fallen. It gains when returns reverse and gives up return when they trend, so its value is the control of risk rather than a reliable gain in return.

> [!example]- How does rebalancing compare with buying and holding when equities return $+25\%$ then $-20\%$, and $+25\%$ twice? {Example}
> A \$100 portfolio starts at $60\%$ equities and $40\%$ cash, which earns nothing. One investor buys and holds, and the other rebalances to $60/40$ after the first period.
>
> > [!answer]-
> > - After the first period both portfolios hold $75$ in equities and $40$ in cash, a total of $115$.
> > - Rebalancing moves the second portfolio to $69$ in equities and $46$ in cash.
> > - When returns reverse, buying and holding ends with $75(0.80) + 40 = 100.00$ and rebalancing with $69(0.80) + 46 = 101.20$.
> > - When returns trend, buying and holding ends with $75(1.25) + 40 = 133.75$ and rebalancing with $69(1.25) + 46 = 132.25$.
> > - Rebalancing wins by $1.20$ when returns reverse and loses by $1.50$ when they trend.

## Rebalancing a delta hedge

The rebalancing in [[Delta Hedging|delta hedging]] (FAM, ALTAM) is a different thing. It resets a hedge's holding of the underlying as an option's delta changes, so that the hedge stays neutral to small price moves. Its cost is the hedging error between rebalancing dates, driven by gamma and volatility, not drift from a target allocation.
