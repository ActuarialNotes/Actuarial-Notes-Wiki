---
verification:
  status: unverified
  confidence: null
  last_checked: null
  last_checked_by: null
  content_hash: sha256:bc43882e033a4954c2be4f521cc44e5cf8da495fb7f2f2c2fb9d1c3265e16852
  sources: []
  open_findings: 0
  open_critical: 0
  log: .verify/Concepts/Cash Flow Statement.md
---

**The Cash Flow Statement** reports the cash an insurer received and paid during the period, sorted into operations, investments, and financing. The statutory version — page 5 of the [[NAIC Annual Statement]] — uses the **direct method** (premiums collected, losses paid) and counts cash equivalents and short-term investments as cash.

> $$\Delta\text{Cash} = \text{CF}_{\text{operations}} + \text{CF}_{\text{investments}} + \text{CF}_{\text{financing \& misc.}}$$

- **Cash from operations:** premiums collected net of reinsurance, net investment income and miscellaneous income received, less benefit and loss-related payments, commissions and expenses paid, policyholder dividends paid, and federal income taxes paid.
- **Cash from investments:** proceeds from investments sold, matured or repaid, less the cost of investments acquired.
- **Cash from financing and miscellaneous sources:** surplus notes and capital notes, capital paid in, borrowed funds, net deposits on deposit-type contracts, dividends to stockholders, and other cash provided or applied.
- **Why an insurer's cash flow is distinctive.** Premium is collected before losses are paid, so a growing book generates operating cash even at a break-even combined ratio — the float that builds the investment portfolio. The converse is a warning sign: a shrinking or running-off insurer can report positive income while operating cash turns negative and it must sell assets to pay claims. The cash flow statement is the liquidity view that accrual accounting hides, which is why it matters in assessing [[Financial Health|financial health]].
- **Across regimes.** [[GAAP]] and [[IFRS]] (IAS 7) allow either the direct method or the **indirect** method, which starts from net income and adjusts for non-cash items and changes in working balances; most companies use the indirect. The totals are the same — only the presentation of operations differs.

> [!example]- Operating Cash Flow, Direct Method {Example}
> An insurer's statutory data for the year: written premium $\$500$M, of which premiums receivable rose by $\$10$M; losses and LAE incurred $\$320$M, with loss and LAE reserves up $\$70$M; underwriting expenses incurred and paid $\$140$M; net investment income received $\$30$M; federal income tax incurred and paid $\$6$M. Unearned premium rose by $\$40$M.
>
> Compute net income and net cash from operations.
>
> > [!answer]-
> > $$
> > \begin{align*}
> > \text{EP} &= 500 - 40 \\
> > &= 460 \\
> > \text{Net income} &= 460 - 320 - 140 + 30 - 6 \\
> > &= 24 \\
> > \text{Premiums collected} &= 500 - 10 \\
> > &= 490 \\
> > \text{Losses and LAE paid} &= 320 - 70 \\
> > &= 250 \\
> > \text{Operating cash} &= 490 + 30 - 250 - 140 - 6 \\
> > &= 124
> > \end{align*}
> > $$
> >
> > The book breaks even on underwriting ($460 - 320 - 140 = 0$) yet produces $\$124$M of operating cash, five times net income. The cash is not profit: it funds the $\$70$M reserve increase and the $\$40$M of unearned premium, and it will be invested (a matching outflow under cash from investments) until the claims are paid.

> [!example]- The Same Year, Indirect Method {Example}
> Reconcile the $\$24$M of net income above to the $\$124$M of operating cash, as a GAAP indirect-method statement would.
>
> > [!answer]-
> > $$
> > \begin{align*}
> > \text{Operating cash} &= \text{NI} + \Delta\text{Reserves} + \Delta\text{UPR} \\
> > &\quad - \Delta\text{Receivables} \\
> > &= 24 + 70 + 40 - 10 \\
> > &= 124
> > \end{align*}
> > $$
> >
> > Each adjustment is an accrual that moved income without moving cash: reserves charged to income but unpaid, premium collected but unearned, premium earned but uncollected. Reverse the signs and the danger of run-off is plain — as reserves and unearned premium **fall**, operating cash falls below income.
