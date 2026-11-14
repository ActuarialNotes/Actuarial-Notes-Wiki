---
verification:
  status: unverified
  confidence: null
  last_checked: null
  last_checked_by: null
  content_hash: sha256:0120de87c3884194c7c5d8e5983b71b024b860c42b701dffbc7e5b0e045df52c
  sources: []
  open_findings: 0
  open_critical: 0
  log: .verify/Concepts/Cash Flow Statement.md
---
A **Cash Flow Statement** is the financial statement that reports the cash an insurer received and paid during the period, sorted into operations, investments and financing. The statutory version, page 5 of the [[NAIC Annual Statement]], uses the direct method (premiums collected, losses paid) and counts cash equivalents and short-term investments as cash.

The change in cash over the period is

> $$\Delta\text{Cash} = \text{CF}_{\text{ops}} + \text{CF}_{\text{inv}} + \text{CF}_{\text{fin}}$$

- $\text{CF}_{\text{ops}}$ is the cash from operations: premiums collected net of reinsurance, net investment income and miscellaneous income received, less benefit and loss-related payments, commissions and expenses paid, policyholder dividends paid, and federal income taxes paid.
- $\text{CF}_{\text{inv}}$ is the cash from investments: proceeds from investments sold, matured or repaid, less the cost of investments acquired.
- $\text{CF}_{\text{fin}}$ is the cash from financing and miscellaneous sources: surplus notes and capital notes, capital paid in, borrowed funds, net deposits on deposit-type contracts, dividends to stockholders, and other cash provided or applied.

> [!example]- What are this insurer's net income and net cash from operations for the year? {Example}
> An insurer's statutory data for the year, in millions:
>
> | Item | Amount |
> | :--- | ---: |
> | Written premium | 500 |
> | Increase in premiums receivable | 10 |
> | Increase in unearned premium | 40 |
> | Losses and LAE incurred | 320 |
> | Increase in loss and LAE reserves | 70 |
> | Underwriting expenses, incurred and paid | 140 |
> | Net investment income received | 30 |
> | Federal income tax, incurred and paid | 6 |
>
> > [!answer]-
> > - Earned premium is written premium less the increase in unearned premium, $500 - 40 = 460$.
> > - Net income is $460 - 320 - 140 + 30 - 6 = 24$.
> > - Premiums collected are written premium less the increase in receivables, $500 - 10 = 490$.
> > - Losses and LAE paid are those incurred less the increase in reserves, $320 - 70 = 250$.
> > - Net cash from operations is $490 + 30 - 250 - 140 - 6 = 124$.
> > - The book breaks even on underwriting ($460 - 320 - 140 = 0$) yet produces $\$124$M of operating cash, about five times net income.

## Operating cash flow of an insurer

Premium is collected before losses are paid, so a growing book generates operating cash even at a break-even combined ratio. This float builds the investment portfolio. The cash is not profit: in the example above it funds the $\$70$M reserve increase and the $\$40$M of unearned premium, and it is invested (a matching outflow under cash from investments) until the claims are paid.

A shrinking or running-off insurer can report positive income while its operating cash turns negative and it must sell assets to pay claims. The cash flow statement is the liquidity view that accrual accounting hides, which is why it matters in assessing [[Financial Health|financial health]].

## Direct and indirect methods

[[GAAP]] and [[IFRS]] (IAS 7) allow either the direct method or the indirect method, which starts from net income and adjusts for non-cash items and changes in working balances. Most companies use the indirect method. The totals are the same, and only the presentation of operations differs.

> [!example]- How does an indirect-method statement reconcile the $\$24$M of net income above to the $\$124$M of operating cash? {Example}
> - Reserves charged to income but unpaid add back the $\$70$M reserve increase.
> - Premium collected but unearned adds back the $\$40$M increase in unearned premium.
> - Premium earned but uncollected subtracts the $\$10$M increase in receivables.
> - Operating cash is $24 + 70 + 40 - 10 = 124$.
> - In run-off the signs reverse. As reserves and unearned premium fall, operating cash falls below income.

> [!trap] Reading operating cash as profit
> A growing book's operating cash can be several times its net income, as in the example's $\$124$M against $\$24$M. The difference funds reserves and unearned premium for claims not yet paid.
