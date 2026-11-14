---
verification:
  status: unverified
  confidence: null
  last_checked: null
  last_checked_by: null
  content_hash: sha256:f8c97a25340b77d0607aad72e65ef45649ef5cba7c9c0e7b63626d9856268965
  sources: []
  open_findings: 0
  open_critical: 0
  log: .verify/Concepts/Annual Statement Schedules.md
---
**Annual Statement Schedules** are the detailed supporting exhibits of the [[NAIC Annual Statement]] that itemise what the summary pages aggregate: every bond, stock and other invested asset, every reinsurer and reinsurance balance, ten years of loss and LAE history by line, premiums by state, and dealings with affiliates. They are where an analyst tests what the balance sheet cannot show on its face: asset quality, concentration, reserve development and reinsurance collectability.

| Schedule | What it itemises |
| :--- | :--- |
| A, B, BA, D, DA, DB, DL, E | Invested assets, cash and deposits |
| [[Schedule F]] | Reinsurance assumed and ceded |
| [[Schedule P]] | Ten years of premiums, losses and LAE by line |
| T | Premiums written by state |
| Y | The holding-company structure and transactions with affiliates |
| H | Accident and health |

The schedules must agree with the primary statements, so the detail and the totals can be read together. One of these tie-outs is

> $$\text{Page 3 losses} + \text{Page 3 LAE} = \text{Sch. P Part 1 net unpaid}$$

- $\text{Page 3 losses}$ and $\text{Page 3 LAE}$ are the loss and LAE reserves on the Liabilities page.
- $\text{Sch. P Part 1 net unpaid}$ is Schedule P Part 1's net unpaid losses and LAE.

## Investment schedules

The investment schedules are:

| Schedule | Holds |
| :--- | :--- |
| A | Real estate |
| B | Mortgage loans |
| BA | Other long-term invested assets, such as partnerships and joint ventures |
| D | Bonds and stocks |
| DA | Short-term investments |
| DB | Derivatives |
| DL | Securities-lending collateral |
| E | Cash, cash equivalents and special deposits |

Schedule D Part 1A gives the quality and maturity distribution of bonds by NAIC designation. The investment schedules reveal credit quality, liquidity, concentration in single issuers or affiliates, and how much surplus sits in volatile Schedule BA assets. Schedule analysis almost always measures an exposure against surplus, the cushion that protects policyholders.

> [!example]- How large is this insurer's below-investment-grade bond exposure, and what would a 20% loss on it cost? {Example}
> Schedule D Part 1A shows bonds at book/adjusted carrying value, in $\$$ millions, by NAIC designation:
>
> | NAIC designation | 1 | 2 | 3 | 4 | 5 | 6 |
> | :--- | ---: | ---: | ---: | ---: | ---: | ---: |
> | Bonds | 1,050 | 300 | 90 | 45 | 12 | 3 |
>
> Surplus as regards policyholders is $\$500$ million.
>
> > [!answer]-
> > - Designations $1$ and $2$ are investment grade, and $3$ to $6$ are not.
> > - Total bonds are $1{,}050 + 300 + 90 + 45 + 12 + 3 = 1{,}500$.
> > - Below investment grade is $90 + 45 + 12 + 3 = 150$, which is $150/1{,}500 = 10\%$ of bonds.
> > - Against surplus it is $150/500 = 30\%$, three times as large.
> > - A $20\%$ loss on the block is $0.20 \times 150 = \$30$ million, which is $6\%$ of surplus.

## Reinsurance, loss history and the other schedules

[[Schedule F]] covers reinsurance assumed and ceded: recoverables by reinsurer, collateral, overdue and disputed balances, and the provision for reinsurance. [[Schedule P]] gives ten years of premiums, losses, DCC and AO by line, with incurred, paid and bulk-plus-IBNR triangles and claim counts, and is the basis for testing reserve adequacy.

Schedule T shows geographic concentration, which means catastrophe exposure and dependence on one regulator. Schedule Y shows the holding-company structure and transactions with affiliates, including pooling, management fees and dividends. Schedule H covers accident and health.

## The schedules and the ratio tests

[[Risk-Based Capital]] charges are built from the schedules. Asset charges come from the investment schedules, a credit charge on reinsurance recoverables from Schedule F (Part 3 carries the factors by reinsurer), and reserve and premium charges by Schedule P line. The [[IRIS Ratios]] reserve-development tests come from Schedule P. Together with the [[Insurance Expense Exhibit]], the schedules turn a set of summary numbers into a view of [[Financial Health|financial health]].

> [!example]- What does each of these flags mean, and why is the combination worse than its parts? {Example}
> A regional insurer's schedules show:
>
> - Schedule T: $68\%$ of direct premium written in one hurricane-exposed state.
> - Schedule F: $45\%$ of ceded recoverables due from one unauthorized offshore affiliate, secured by a letter of credit covering half the balance.
> - Schedule BA: limited partnerships equal to $35\%$ of surplus.
>
> > [!answer]-
> > - Schedule T shows premium concentrated in one catastrophe-exposed state. A single event can hit most of the book, and one state's rate regulator controls most of the company's pricing.
> > - Schedule F shows that the unsecured half of the affiliate's balance must be charged to surplus through the provision for reinsurance. The protection depends on a related party whose own capital may be the group's.
> > - Schedule BA shows a third of surplus in illiquid, volatile assets that may fall in value just when cash is needed.
> > - Together, a hurricane produces large gross claims, the recoverables that should offset them depend on a thinly secured affiliate, and the assets that must be sold to pay claims are illiquid.
> > - The risks are correlated, so the surplus cushion is thinner than any single test suggests.

> [!trap] Measuring an exposure against the portfolio instead of surplus
> A block that is $10\%$ of bonds can be $30\%$ of surplus. Surplus is what protects policyholders, so measure concentrations and risky assets against it.
