---
aliases:
  - Investment Governance Structure
verification:
  status: unverified
  confidence: null
  last_checked: null
  last_checked_by: null
  content_hash: sha256:59c92206897acd70a1e2e5e96506c88a4e45f3293f794261a48c3344f5fd3c60
  sources: []
  open_findings: 0
  open_critical: 0
  log: .verify/Concepts/Portfolio Management Process.md
---
The **portfolio management process** is the continuing cycle of planning, execution and feedback by which an investor's [[Portfolio|portfolio]] is set up, built and kept in line with its objectives. The **investment governance structure** that runs it assigns each decision in the cycle, from approving the policy to choosing securities, to the body best placed to make it: the board or trustees, an investment committee, the investment staff, consultants or external managers.

> $$\left|\,w_j - w_j^{*}\right| > \delta_j \;\Rightarrow\; \text{rebalance}$$

> $$\begin{aligned} R_P - R_B = {} & \sum_j \left(w_j - w_j^{*}\right)\left(R_{B_j} - R_B\right) \\ & + \sum_j w_j\left(R_j - R_{B_j}\right) \end{aligned}$$

- **Symbols:** $w_j$ is the actual weight of asset class $j$, $w_j^{*}$ its target weight in the strategic asset allocation and $\delta_j$ the permitted range around it. In the second line, $R_P$ is the portfolio's return, $R_B = \sum_j w_j^{*} R_{B_j}$ the policy benchmark's return, $R_{B_j}$ the benchmark return for class $j$ and $R_j$ the portfolio's own return in that class. The first sum is the allocation effect of departing from the target weights, and the second is the selection effect of the managers within each class.
- **Planning:** The investor's objectives and constraints are written into an [[Investment Policy Statement|investment policy statement]] (IPS). Capital market expectations, the expected returns, volatilities and correlations of the asset classes, are formed next, and the two are combined into the strategic [[Asset Allocation|asset allocation]], the long-term target weights with their ranges.
- **Execution:** The allocation is put into practice by choosing between [[Passive Management|passive]] and [[Active Management|active]] management in each class, selecting the managers or securities, constructing the portfolio and trading it at low cost. Execution decisions should follow the IPS, not change it.
- **Feedback:** The portfolio is monitored against the IPS, the market and the investor's circumstances. [[Portfolio Rebalancing|Rebalancing]] brings drifting weights back within their ranges, and [[Performance Measurement|performance evaluation]] measures the return, attributes it to allocation and selection, and appraises it against the risk taken. A change in the investor's circumstances or in the capital market expectations sends the cycle back to planning, where the IPS or the allocation is revised.
- **What good governance does:** The CFA Institute's asset allocation reading lists the elements of effective investment governance. It sets long-term and short-term objectives, allocates decision rights and responsibilities to units with the knowledge and capacity to carry them out, sets processes for developing and approving the IPS and the strategic asset allocation, establishes reporting to monitor progress, and reviews the whole structure periodically, for example through a governance audit.
- **Matching decisions to skill:** The rule of thumb is that the longer-term and more consequential a decision, the higher it sits. The board or committee approves the IPS and the allocation, because these fix most of the portfolio's risk. Day-to-day decisions, such as rebalancing within ranges and trading, belong to the staff or managers, because they need speed and expertise. A small fund with no staff of its own relies more on consultants or an outsourced chief investment officer, but the committee keeps responsibility for the policy.
- **Fiduciary and agency issues:** Those who make decisions for a pension plan or endowment act as fiduciaries for its beneficiaries. Clear decision rights, documented reasons, independent monitoring and fee transparency limit the conflicts between the beneficiaries and the people acting for them.

| Decision | Board or trustees | Investment committee | Investment staff | Consultant | External managers |
|---|---|---|---|---|---|
| Governance structure, committee charter | Approve | Recommend | | | |
| IPS and return objective | Approve | Recommend | Draft | Advise | |
| Strategic asset allocation and ranges | Ratify | Approve | Recommend | Model | |
| Manager hiring and firing | | Approve | Recommend | Search, due diligence | |
| Rebalancing within ranges | | | Execute | | |
| Security selection and trading | | | | | Execute |
| Monitoring and reporting | Receive | Review | Prepare | Independent review | Report |

> [!example]- A Pension Fund's Monitoring Triggers {Example}
> A defined benefit [[Pension Plan|pension plan]] uses the governance structure in the table. Its IPS sets a strategic asset allocation of 60% equity and 40% bonds, each with a range of $\pm 5\%$, and gives the staff authority to rebalance within the ranges. The IPS also says that when the funded ratio, assets divided by liabilities, reaches 100%, the investment committee must review the allocation along the plan's glide path toward more liability hedging. At the start of a quarter the plan has assets of \$900 million (equity \$540 million and bonds \$360 million with modified duration 8) and liabilities of \$1,000 million with modified duration 13. During the quarter equities return 5% and interest rates rise by 1%. Ignoring contributions and benefit payments, which triggers fire, and where in the cycle does each one send the plan?
>
> > [!answer]-
> > To first order, the bonds and the liabilities each fall by their duration times the rise in rates.
> > $$
> > \begin{align*}
> > \text{Equity} &= 540(1.05) \\
> > &= 567.0 \\
> > \text{Bonds} &= 360(1 - 0.08) \\
> > &= 331.2 \\
> > A &= 567.0 + 331.2 \\
> > &= 898.2 \\
> > L &= 1{,}000(1 - 0.13) \\
> > &= 870.0 \\
> > \text{FR} &= \frac{898.2}{870.0} \\
> > &= 103.2\%
> > \end{align*}
> > $$
> > The equity weight is $567.0 / 898.2 = 63.1\%$, which is within the 55% to 65% range, so the rebalancing trigger does not fire and the staff need do nothing. The funded ratio has risen from 90% to 103.2%, mostly because the long-duration liabilities fell further than the bonds, so the funded status trigger fires. That is a change in the plan's circumstances, so the cycle goes back to planning: the committee reviews the strategic allocation, probably moving toward long bonds to lock in the gain, and the board ratifies the change before the staff implement it.

> [!tip]- How it appears on the exam
> - **INV-101, learning objective 2a:** Candidates describe the portfolio management process and recommend an investment governance structure. Expect a written answer that lays out the planning, execution and feedback steps, or that assigns a list of decisions to the board, committee, staff, consultants and managers for a stated investor.
> - **Critiquing a structure:** Questions often describe a fund whose governance has gone wrong, such as a board choosing individual managers, or staff changing the strategic allocation without approval, and ask what is wrong and how to fix it.
> - **Links to other objectives:** The process frames the rest of the second section of the syllabus, the IPS, asset allocation, rebalancing, performance measurement and attribution. A short calculation, such as a rebalancing check or an attribution, can support the written answer.

> [!warning]- Exam traps
> - **Rebalancing is execution, not planning:** Bringing weights back within their ranges carries out the existing policy, so the staff can do it. Changing the target weights or the ranges is a policy decision for the committee and board.
> - **Not every trigger is a weight:** A change in the investor's circumstances, such as a rise in the funded ratio, a plan freeze or a new spending need, sends the cycle back to planning even when every weight is within its range. Answering only with a rebalancing check misses it.
> - **Governance follows expertise and accountability:** Assigning security selection to the board, or the approval of the IPS to an external manager, puts a decision where the knowledge or the accountability is missing. The board delegates execution but keeps responsibility for the policy.
> - **Attribution signs:** The allocation effect uses the class benchmark's return relative to the total benchmark, $R_{B_j} - R_B$, not the class return alone. Overweighting a class that rose, but by less than the total benchmark, still subtracts value.
