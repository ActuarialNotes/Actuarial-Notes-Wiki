---
verification:
  status: unverified
  confidence: null
  last_checked: null
  last_checked_by: null
  content_hash: sha256:2236d4c4bb1fca406445e0f280cb2a6aed25351083777ad2a4359ddc7b5ee8f8
  sources: []
  open_findings: 0
  open_critical: 0
  log: .verify/Concepts/NAIC Annual Statement.md
---

**The NAIC Annual Statement** is the standardised statutory financial report every U.S. property/casualty insurer files with its domiciliary state insurance department and the NAIC, due on or before **March 1** for the preceding calendar year. It is prepared on [[Statutory Accounting Principles]] for each legal entity, and it is the document regulators, rating agencies and the Appointed Actuary rely on to judge solvency.

> $$\text{Surplus as regards policyholders} = \text{Admitted assets} - \text{Liabilities}$$
>
> $$\begin{aligned} \text{Surplus}_t = {} & \text{Surplus}_{t-1} + \text{Net income} \\ & + \text{Direct charges and credits to surplus} \end{aligned}$$

- **The primary statements:** Assets (page 2, admitted assets only), Liabilities, Surplus and Other Funds (page 3), the Statement of Income with its **Capital and Surplus Account** (page 4), and Cash Flow (page 5). See [[Balance Sheet]], [[Income Statement]], [[Capital and Surplus]] and [[Cash Flow Statement]].
- **Direct surplus items** bypass net income: the change in net unrealized capital gains, the change in nonadmitted assets, the change in the provision for reinsurance, the change in net deferred income tax, capital paid in and dividends to stockholders. Reading this account is how an analyst sees surplus moving for reasons the income statement does not show.
- **Exhibits:** the Underwriting and Investment Exhibit (premiums earned, written and recapitulated; losses paid and incurred; unpaid losses and LAE; expenses), the exhibits of net investment income, capital gains and nonadmitted assets, the [[Notes to Financial Statements]], General Interrogatories, Five-Year Historical Data, and the state page of premiums and losses.
- **Schedules** itemise the balances — investments, [[Schedule F]] for reinsurance, [[Schedule P]] for ten years of loss and LAE history, Schedule T for premiums by state, Schedule Y for affiliates. See [[Annual Statement Schedules]].
- **Supplements and deadlines:** the Statement of Actuarial Opinion is filed with the statement on March 1; the [[Actuarial Opinion Summary]] goes to the domiciliary state by March 15; the [[Insurance Expense Exhibit]] and the management's discussion and analysis are due April 1; the actuarial report must be available by May 1. Quarterly statements are due 45 days after each quarter.
- **Uses:** [[Risk-Based Capital]] and the [[IRIS Ratios]] are computed from it, state financial analysts and examiners work from it ([[Solvency Monitoring]]), and the Appointed Actuary reconciles the opinion's data to Schedule P Part 1 ([[Appointed Actuary Responsibilities]]). It differs from a [[GAAP]] report in basis (statutory), entity (legal entity rather than consolidated group) and audience (regulators rather than investors).

> [!example]- Rolling Surplus Forward and Tracing Each Item {Example}
> An insurer's surplus as regards policyholders was $\$500.0$M at the prior year end. This year: net income $\$40.0$M; change in net unrealized capital losses $-\$12.0$M; nonadmitted assets increased by $\$3.0$M; the provision for reinsurance increased by $\$2.0$M; dividends to its parent $\$15.0$M.
>
> Compute year-end surplus and say where in the statement each item would be investigated.
>
> > [!answer]-
> > $$
> > \begin{align*}
> > \text{Surplus}_t &= 500.0 + 40.0 - 12.0 - 3.0 - 2.0 - 15.0 \\
> > &= \$508.0\text{M}
> > \end{align*}
> > $$
> >
> > Net income was $\$40$M, yet surplus grew only $\$8$M. Where to look:
> >
> > - **Net income** — the Statement of Income and the Underwriting and Investment Exhibit; by line, the Insurance Expense Exhibit.
> > - **Unrealized losses** — the Exhibit of Capital Gains (Losses) and the investment schedules (D for stocks and bonds, BA for other long-term assets).
> > - **Nonadmitted assets** — the Exhibit of Nonadmitted Assets, for example premiums more than 90 days overdue.
> > - **Provision for reinsurance** — Schedule F Part 3: which reinsurers are unsecured, overdue or slow-paying.
> > - **Dividends to the parent** — the Capital and Surplus Account, with affiliate transactions in Schedule Y.
> >
> > Four of the five items never touched net income, which is why solvency analysis starts from the surplus account rather than the income statement.

> [!example]- Which Part of the Statement Answers the Question? {Example}
> For each question, name the part of the Annual Statement an analyst would open first: (1) Are the prior accident years developing adversely? (2) Are reinsurers paying on time? (3) How concentrated is premium in one state? (4) What share of bonds is below investment grade? (5) Did LAE rise because of defence costs or adjusting costs?
>
> > [!answer]-
> > 1. **Schedule P Part 2** — incurred net losses and DCC at each year end, with one-year and two-year development columns.
> > 2. **Schedule F Part 3** — the ageing of recoverables on paid losses and the amounts in dispute.
> > 3. **Schedule T** — direct premiums written by state.
> > 4. **Schedule D Part 1A** — bonds by NAIC designation; designations $3$ to $6$ are below investment grade.
> > 5. **Schedule P Part 1** — LAE paid and unpaid, split into DCC and AO by line.
