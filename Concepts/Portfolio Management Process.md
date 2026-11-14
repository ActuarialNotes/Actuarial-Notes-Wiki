---
aliases:
  - Investment Governance Structure
verification:
  status: unverified
  confidence: null
  last_checked: null
  last_checked_by: null
  content_hash: sha256:4f4275b8f74e51dabd19ec53483fbecbf3805677346c3bdfee173c82898ab559
  sources: []
  open_findings: 0
  open_critical: 0
  log: .verify/Concepts/Portfolio Management Process.md
---

The **Portfolio Management Process** is the continuing cycle of planning, execution and feedback by which an investor's [[Portfolio|portfolio]] is set up, built and kept in line with its objectives. The **investment governance structure** that runs it assigns each decision in the cycle, from approving the policy to choosing securities, to the body best placed to make it: the board or trustees, an investment committee, the investment staff, consultants or external managers.

The cycle has three stages:

1. **Planning.** The investor's objectives and constraints are written into an [[Investment Policy Statement|investment policy statement]] (IPS). Capital market expectations, the expected returns, volatilities and correlations of the asset classes, are formed next. The two are combined into the strategic [[Asset Allocation|asset allocation]], the long-term target weights with their ranges.
2. **Execution.** The allocation is put into practice by choosing between [[Passive Management|passive]] and [[Active Management|active]] management in each class, selecting the managers or securities, constructing the portfolio and trading it at low cost. Execution decisions should follow the IPS, not change it.
3. **Feedback.** The portfolio is monitored against the IPS, the market and the investor's circumstances. [[Portfolio Rebalancing|Rebalancing]] brings drifting weights back within their ranges, and [[Performance Measurement|performance evaluation]] measures the return, attributes it to allocation and selection, and appraises it against the risk taken.

A change in the investor's circumstances or in the capital market expectations sends the cycle back to planning, where the IPS or the allocation is revised. A rise in the funded ratio, a plan freeze or a new spending need does this even when every weight is within its range.

## Rebalancing within ranges

If $w_j$ is the actual weight of asset class $j$, $w_j^{*}$ its target weight in the strategic asset allocation and $\delta_j$ the permitted range around it, the rebalancing rule is

> $$\left|\,w_j - w_j^{*}\right| > \delta_j \;\Rightarrow\; \text{rebalance}$$

> [!example]- Which of this pension plan's monitoring triggers fire, and where in the cycle does each send the plan? {Example}
> A defined benefit [[Pension Plan|pension plan]]'s IPS sets a strategic asset allocation of 60% equity and 40% bonds, each with a range of $\pm 5\%$, and lets the staff rebalance within the ranges. When the funded ratio, assets divided by liabilities, reaches 100%, the investment committee must review the allocation along the plan's glide path toward more liability hedging.
>
> | At the start of the quarter | Amount ($ million) | Modified duration |
> | :--- | ---: | ---: |
> | Equity | 540 | |
> | Bonds | 360 | 8 |
> | Liabilities | 1,000 | 13 |
>
> During the quarter equities return 5% and interest rates rise by 1%. Contributions and benefit payments are ignored.
>
> > [!answer]-
> > - To first order, the bonds and the liabilities each fall by their duration times the rise in rates.
> > - Equity grows to $540 \times 1.05 = 567.0$, and bonds fall to $360 \times (1 - 0.08) = 331.2$.
> > - Assets are $567.0 + 331.2 = 898.2$, and liabilities fall to $1{,}000 \times (1 - 0.13) = 870.0$.
> > - The equity weight is $567.0 / 898.2 = 63.1\%$, within the 55% to 65% range, so the rebalancing trigger does not fire and the staff need do nothing.
> > - The funded ratio rises from 90% to $898.2 / 870.0 = 103.2\%$, mostly because the long-duration liabilities fell further than the bonds, so the funded status trigger fires.
> > - That is a change in the plan's circumstances, so the cycle goes back to planning. The committee reviews the strategic allocation, probably moving toward long bonds to lock in the gain, and the board ratifies the change before the staff implement it.

> [!trap] Treating a change of target weights as rebalancing
> Bringing weights back within their ranges carries out the existing policy, so the staff can do it. Changing the target weights or the ranges is a policy decision for the committee and the board.

## Performance attribution

If $R_P$ is the portfolio's return and $R_B$ the policy benchmark's return, the portfolio's excess return, split into the allocation effect of departing from the target weights and the selection effect of the managers within each class, is

> $$R_P - R_B = \text{Allocation} + \text{Selection}$$

The allocation effect is

> $$\text{Allocation} = \sum_j \left(w_j - w_j^{*}\right)\left(R_{B_j} - R_B\right)$$

- $R_{B_j}$ is the benchmark return for class $j$, so $R_B = \sum_j w_j^{*} R_{B_j}$.

The selection effect is

> $$\text{Selection} = \sum_j w_j\left(R_j - R_{B_j}\right)$$

- $R_j$ is the portfolio's own return in class $j$.

The allocation effect uses the class benchmark's return relative to the total benchmark, $R_{B_j} - R_B$, not the class return alone. Overweighting a class that rose, but by less than the total benchmark, still subtracts value.

## Investment governance structure

The CFA Institute's asset allocation reading lists the elements of effective investment governance:

1. Long-term and short-term objectives.
2. Decision rights and responsibilities allocated to units with the knowledge and capacity to carry them out.
3. Processes for developing and approving the IPS and the strategic asset allocation.
4. Reporting to monitor progress.
5. A periodic review of the whole structure, for example through a governance audit.

The longer-term and more consequential a decision, the higher it sits. The board or committee approves the IPS and the allocation, because these fix most of the portfolio's risk. Day-to-day decisions, such as rebalancing within ranges and trading, belong to the staff or managers, because they need speed and expertise. A small fund with no staff of its own relies more on consultants or an outsourced chief investment officer, but the committee keeps responsibility for the policy.

| Decision | Board or trustees | Investment committee | Investment staff | Consultant | External managers |
|---|---|---|---|---|---|
| Governance structure, committee charter | Approve | Recommend | | | |
| IPS and return objective | Approve | Recommend | Draft | Advise | |
| Strategic asset allocation and ranges | Ratify | Approve | Recommend | Model | |
| Manager hiring and firing | | Approve | Recommend | Search, due diligence | |
| Rebalancing within ranges | | | Execute | | |
| Security selection and trading | | | | | Execute |
| Monitoring and reporting | Receive | Review | Prepare | Independent review | Report |

Assigning security selection to the board, or approval of the IPS to an external manager, puts a decision where the knowledge or the accountability is missing. The board delegates execution but keeps responsibility for the policy.

Those who make decisions for a pension plan or endowment act as fiduciaries for its beneficiaries. Clear decision rights, documented reasons, independent monitoring and fee transparency limit the conflicts between the beneficiaries and the people acting for them.
