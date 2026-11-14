---
verification:
  status: unverified
  confidence: null
  last_checked: null
  last_checked_by: null
  content_hash: sha256:fd8ae3280c7b8b35f6247c523050812db8a83acf6b93ec86d5c5fb7e5a110475
  sources: []
  open_findings: 0
  open_critical: 0
  log: .verify/Concepts/NAIC Annual Statement.md
---
The **NAIC Annual Statement** is the standardised statutory financial report every U.S. property/casualty insurer files with its domiciliary state insurance department and the NAIC, due on or before **March 1** for the preceding calendar year. It is prepared on [[Statutory Accounting Principles]] for each legal entity, and regulators, rating agencies and the Appointed Actuary rely on it to judge solvency.

The statement's measure of solvency is surplus. The surplus as regards policyholders is

> $$\text{Surplus} = \text{Admitted assets} - \text{Liabilities}$$

From one year end to the next, the surplus $S_t$ is

> $$S_t = S_{t-1} + I_t + D_t$$

- $I_t$ is the net income for year $t$.
- $D_t$ is the total of the direct charges and credits to surplus in year $t$.

**Direct surplus items** bypass net income. They are the change in net unrealized capital gains, the change in nonadmitted assets, the change in the provision for reinsurance, the change in net deferred income tax, capital paid in and dividends to stockholders. Reading the Capital and Surplus Account is how an analyst sees surplus moving for reasons the income statement does not show.

> [!example]- What is this insurer's year-end surplus, and where would each item be investigated? {Example}
> An insurer's surplus as regards policyholders was $\$500.0$M at the prior year end. This year it had:
>
> | Item | Amount |
> | :--- | ---: |
> | Net income | $+\$40.0$M |
> | Change in net unrealized capital losses | $-\$12.0$M |
> | Increase in nonadmitted assets | $\$3.0$M |
> | Increase in the provision for reinsurance | $\$2.0$M |
> | Dividends to its parent | $\$15.0$M |
>
> > [!answer]-
> > - An increase in nonadmitted assets, in the provision for reinsurance and in dividends each reduces surplus.
> > - The year-end surplus is $500.0 + 40.0 - 12.0 - 3.0 - 2.0 - 15.0 = \$508.0$M.
> > - Net income was $\$40$M, yet surplus grew only $\$8$M.
> > - Net income is investigated in the Statement of Income and the Underwriting and Investment Exhibit, and by line in the Insurance Expense Exhibit.
> > - The unrealized losses are in the Exhibit of Capital Gains (Losses) and the investment schedules (D for stocks and bonds, BA for other long-term assets).
> > - The nonadmitted assets are in the Exhibit of Nonadmitted Assets, for example premiums more than 90 days overdue.
> > - The provision for reinsurance is in Schedule F Part 3, which shows the reinsurers that are unsecured, overdue or slow-paying.
> > - The dividends are in the Capital and Surplus Account, with affiliate transactions in Schedule Y.
> > - Four of the five items never touched net income, so solvency analysis starts from the surplus account rather than the income statement.

## The primary statements

The primary statements are:

1. Assets (page 2), which shows admitted assets only.
2. Liabilities, Surplus and Other Funds (page 3).
3. The Statement of Income, with its **Capital and Surplus Account** (page 4).
4. Cash Flow (page 5).

[[Balance Sheet]], [[Income Statement]], [[Capital and Surplus]] and [[Cash Flow Statement]] cover each in turn.

## Exhibits and schedules

The exhibits are the Underwriting and Investment Exhibit (premiums earned, written and recapitulated, losses paid and incurred, unpaid losses and LAE, and expenses), the exhibits of net investment income, capital gains and nonadmitted assets, the [[Notes to Financial Statements]], the General Interrogatories, the Five-Year Historical Data, and the state page of premiums and losses.

The [[Annual Statement Schedules|schedules]] itemise the balances. They include the investment schedules, [[Schedule F]] for reinsurance, [[Schedule P]] for ten years of loss and LAE history, Schedule T for premiums by state, and Schedule Y for affiliates.

> [!example]- Which part of the Annual Statement would an analyst open first for each of these five questions? {Example}
> 1. Are the prior accident years developing adversely?
> 2. Are reinsurers paying on time?
> 3. How concentrated is premium in one state?
> 4. What share of bonds is below investment grade?
> 5. Did LAE rise because of defence costs or adjusting costs?
>
> > [!answer]-
> > - (1) Schedule P Part 2 shows incurred net losses and DCC at each year end, with one-year and two-year development columns.
> > - (2) Schedule F Part 3 shows the ageing of recoverables on paid losses and the amounts in dispute.
> > - (3) Schedule T shows direct premiums written by state.
> > - (4) Schedule D Part 1A shows bonds by NAIC designation, and designations $3$ to $6$ are below investment grade.
> > - (5) Schedule P Part 1 shows LAE paid and unpaid, split into DCC and AO by line.

## Supplements and filing deadlines

| Filing | Due |
| :--- | :--- |
| Annual Statement and the Statement of Actuarial Opinion | March 1 |
| [[Actuarial Opinion Summary]], to the domiciliary state | March 15 |
| [[Insurance Expense Exhibit]] and the management's discussion and analysis | April 1 |
| Actuarial report available | May 1 |
| Quarterly statements | 45 days after each quarter |

## Uses of the Annual Statement

[[Risk-Based Capital]] and the [[IRIS Ratios]] are computed from the Annual Statement. State financial analysts and examiners work from it in [[Solvency Monitoring|solvency monitoring]], and the Appointed Actuary reconciles the opinion's data to Schedule P Part 1 ([[Appointed Actuary Responsibilities|appointed actuary responsibilities]]).

It differs from a [[GAAP]] report in three ways. Its basis is statutory, it reports the legal entity rather than the consolidated group, and its audience is regulators rather than investors.
