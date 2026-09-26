---
verification:
  status: unverified
  confidence: null
  last_checked: null
  last_checked_by: null
  content_hash: sha256:ec4cdd810a13f7a9fab15b7a9975e4d368cb73c740bd64194e6693953151e4df
  sources: []
  open_findings: 0
  open_critical: 0
  log: .verify/Concepts/Annual Statement Schedules.md
---

**Annual Statement Schedules** are the detailed supporting exhibits of the [[NAIC Annual Statement]] that itemise what the summary pages aggregate — every bond, stock and other invested asset, every reinsurer and reinsurance balance, ten years of loss and LAE history by line, premiums by state, and dealings with affiliates. They are where an analyst tests what the balance sheet cannot show on its face: asset quality, concentration, reserve development and reinsurance collectability.

> $$\text{Page 3 losses} + \text{Page 3 LAE} = \text{Sch. P Part 1 net unpaid}$$

- The formula is one of many **tie-outs**: the schedules must agree with the primary statements, so the detail and the totals can be read together. Schedule P Part 1's net unpaid losses and LAE equal the loss and LAE reserves on the Liabilities page.
- **Investment schedules:** A (real estate), B (mortgage loans), BA (other long-term invested assets such as partnerships and joint ventures), D (bonds and stocks, with Part 1A giving the quality and maturity distribution of bonds by NAIC designation), DA (short-term investments), DB (derivatives), DL (securities-lending collateral) and E (cash, cash equivalents and special deposits). They reveal credit quality, liquidity, concentration in single issuers or affiliates, and how much surplus sits in volatile Schedule BA assets.
- **[[Schedule F]]** — reinsurance assumed and ceded: recoverables by reinsurer, collateral, overdue and disputed balances, and the provision for reinsurance.
- **[[Schedule P]]** — ten years of premiums, losses, DCC and AO by line, with incurred, paid and bulk-plus-IBNR triangles and claim counts: the basis for testing reserve adequacy.
- **Schedule T** (premiums written by state) shows geographic concentration — catastrophe exposure and dependence on one regulator; **Schedule Y** shows the holding-company structure and transactions with affiliates, including pooling, management fees and dividends; **Schedule H** covers accident and health.
- **How they combine with the ratio tests.** [[Risk-Based Capital]] charges are built from them — asset charges from the investment schedules, a credit charge on reinsurance recoverables (Schedule F Part 3 carries the factors by reinsurer), and reserve and premium charges by Schedule P line — and the [[IRIS Ratios]] reserve-development tests come from Schedule P. Together with the [[Insurance Expense Exhibit]] they turn a set of summary numbers into a view of [[Financial Health|financial health]].

> [!example]- Bond Quality Against Surplus {Example}
> Schedule D Part 1A shows bonds at book/adjusted carrying value (in $\$$M) by NAIC designation: $1$: $1{,}050$; $2$: $300$; $3$: $90$; $4$: $45$; $5$: $12$; $6$: $3$. Surplus as regards policyholders is $\$500$M.
>
> Measure the below-investment-grade exposure and its potential effect on surplus if that block lost $20\%$ of its value.
>
> > [!answer]-
> > Designations $1$ and $2$ are investment grade; $3$ to $6$ are not.
> >
> > $$
> > \begin{align*}
> > \text{Total bonds} &= 1{,}050 + 300 + 90 + 45 + 12 + 3 \\
> > &= \$1{,}500\text{M} \\[4pt]
> > \text{Below investment grade} &= 90 + 45 + 12 + 3 \\
> > &= \$150\text{M} \\[4pt]
> > \text{Share of bonds} &= \frac{150}{1{,}500} \\
> > &= 10\% \\[4pt]
> > \text{Share of surplus} &= \frac{150}{500} \\
> > &= 30\% \\[4pt]
> > \text{Loss at } 20\% &= 0.20 \times \$150\text{M} \\
> > &= \$30\text{M}
> > \end{align*}
> > $$
> >
> > A $\$30$M loss is $6\%$ of surplus. The $10\%$ share of the portfolio looks modest; measured against surplus — the cushion that actually protects policyholders — the exposure is three times as large. Schedule analysis almost always normalises to surplus for that reason.

> [!example]- Reading Three Schedules Together {Example}
> A regional insurer shows: Schedule T — $68\%$ of direct premium written in one hurricane-exposed state. Schedule F — $45\%$ of ceded recoverables due from one unauthorized offshore affiliate, secured by a letter of credit covering half the balance. Schedule BA — limited partnerships equal to $35\%$ of surplus.
>
> What does each flag mean, and why is the combination worse than its parts?
>
> > [!answer]-
> > - **Schedule T:** premium concentrated in one catastrophe-exposed state — a single event can hit most of the book, and one state's rate regulator controls most of the company's pricing.
> > - **Schedule F:** the unsecured half of the affiliate's balance must be charged to surplus through the provision for reinsurance; the protection depends on a related party whose own capital may be the group's.
> > - **Schedule BA:** a third of surplus in illiquid, volatile assets that may fall in value just when cash is needed.
> >
> > **Together:** a hurricane produces large gross claims (T), the recoverables that should offset them depend on a thinly secured affiliate (F), and the assets that must be sold to pay claims are illiquid (BA). The risks are correlated, so the surplus cushion is thinner than any single test suggests — exactly what a regulator's financial analysis is meant to catch.
