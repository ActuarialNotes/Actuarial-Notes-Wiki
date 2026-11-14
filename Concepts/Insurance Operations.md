---
verification:
  status: stale
  confidence: null
  last_checked: 2026-10-10
  last_checked_by: agent:validate-v1
  content_hash: sha256:790432ade22d6bb28963b0fdace3f0b0ae13a76a9788954520f644c6b789006f
  sources:
    - "Rejda & McNamara, Principles of Risk Management and Insurance, 12th ed. (Pearson 2014), Ch.6 pp.104-118; Ch.7 p.129, sha256:d287eea5870c8b2d7dcfd205f5c26283d5c3cb4f536965eb8c21a344c428aed0"
    - "Werner & Modlin, Basic Ratemaking, 5th ed. (CAS 2016), Ch.1; Ch.4-5 (PDF pp.63, 81) premium audits; Ch.8, sha256:6b214d4db52674df2e83343920c06781e491254bd77f27e32ba312faaff3782c — https://www.casact.org/sites/default/files/2021-03/5_Werner_Modlin.pdf"
  open_findings: 0
  open_critical: 0
  log: .verify/Concepts/Insurance Operations.md
---

**Insurance Operations** are the functions through which an [[Insurer|insurer]] finds business, decides what to accept, pays what it promised and manages the money in between. The functional view organizes an insurer by these activities rather than by its departments.

The functions are:

1. **Core functions**
   - Marketing and distribution decides which customers and markets the insurer serves and reaches them through [[Insurance Producer|producers]] or directly.
   - [[Underwriting]] selects and classifies the accounts offered so that the business written matches the assumptions in the rates.
   - [[Claims Handling|Claims]] keeps the insurer's promise by investigating and paying covered losses, and controls what the losses and loss adjustment expense cost.
2. **Supporting functions**
   - [[Risk Control|Risk control]] representatives inspect accounts and recommend loss-reducing measures, which lowers expected losses.
   - [[Premium Audit|Premium auditors]] verify exposures after the policy period on auditable lines, so that the premium collected matches the exposure actually insured.
   - Actuaries set rates and reserves, measure results and support planning, so their estimates determine both the price and the losses reported.
   - [[Reinsurance]] transfers part of the risk and frees capacity to write more business.
   - The investment function manages the assets that back reserves and surplus.
3. **Support functions**, such as information technology, accounting, legal and compliance, and human resources.

One person or department can perform several functions. A producer may handle some claims and collect premium, and a small insurer may combine risk control and premium auditing.

## Goals and conflicts between functions

The functions share the insurer's goals of earning a profit and meeting customers' needs, but they can pull in different directions. Marketing wants more accounts accepted, while underwriting wants the right ones. Claims wants fair settlements, while the insurer wants losses kept in check. Paying too little breaks the promise and exposes the insurer to regulators and courts, and paying too much erodes profit.

Loss-control specialists provide services such as advice on sprinklers, alarms and fire prevention, and they also assist underwriters with information about the accounts they inspect. Underwriting, risk control and claims all affect losses.

> [!example]- Should the underwriter accept this account, with or without the recommendations? {Example}
> A commercial property account rates to a premium of $\$60{,}000$, and the underwriter estimates expected losses of $\$45{,}000$. The [[Permissible Loss Ratio|permissible loss ratio]] is 65%. A risk control survey recommends repairs to the sprinkler system and better housekeeping, which the risk control representative estimates will cut expected losses by 20%.
>
> > [!answer]-
> > - As it stands, the expected loss ratio is $45{,}000/60{,}000 = 75\%$, above the 65% permissible loss ratio.
> > - Written as it stands, it would need a premium of $45{,}000/0.65 = \$69{,}231$.
> > - With the recommendations, expected losses fall to $45{,}000 \times 0.80 = \$36{,}000$, an expected loss ratio of $36{,}000/60{,}000 = 60\%$.
> > - With the recommendations made a condition of coverage, the account can be written at the rated premium. The producer keeps the account, and the claims department should see fewer losses from it.

## The functions in the insurer's results

Each function's results show up in the insurer's profit identity. An insurer's pre-tax operating income is

> $$\text{Pre-tax income} = \text{UW profit} + \text{Investment income}$$

- $\text{UW profit}$ is the [[Underwriting Profit|underwriting profit]], the insurance operation's own result.
- $\text{Investment income}$ is earned on the funds held between collecting premium and paying claims.

The underwriting profit is

> $$\text{UW profit} = \text{EP} - \text{Losses} - \text{LAE} - \text{UW expenses}$$

- $\text{EP}$ is [[Earned Premium|earned premium]].
- $\text{LAE}$ is loss adjustment expense.

The trade-basis [[Combined Ratio|combined ratio]] is

> $$\text{CR} = \frac{\text{Losses} + \text{LAE}}{\text{EP}} + \frac{\text{UW expenses}}{\text{WP}}$$

- $\text{WP}$ is [[Written Premium|written premium]].

Subtracting the investment income ratio from the combined ratio gives the operating ratio. A combined ratio above 100% means an underwriting loss, but investment income can still leave the insurer with an operating profit.

Underwriting's selection decisions show up most directly in the [[Loss Ratio|loss ratio]], because a book of accounts worse than the rates assume produces losses the premium can't cover. Commission, marketing's main cost, sits in the expense ratio.

> [!example]- What are this insurer's combined ratio, operating ratio and pre-tax income? {Example}
> An insurer reports for one year, in $\$$ millions:
>
> | Item | Amount |
> | :--- | ---: |
> | Earned premium | 500 |
> | Written premium | 520 |
> | Incurred losses | 300 |
> | Allocated LAE | 30 |
> | Unallocated LAE | 25 |
> | Commissions | 78 |
> | Other underwriting expenses | 62 |
> | Investment income | 45 |
>
> > [!answer]-
> > - Losses and LAE are $(300 + 30 + 25)/500 = 71.0\%$ of earned premium. The LAE is the cost of the claims function, with [[Allocated Loss Adjustment Expense|allocated LAE]] attributable to individual claims and [[Unallocated Loss Adjustment Expenses ULAE|unallocated LAE]] covering the claims department's overhead.
> > - Underwriting expenses are $(78 + 62)/520 = 26.9\%$ of written premium. Commissions, the cost of distribution, are 15% of written premium.
> > - The combined ratio is $71.0\% + 26.9\% = 97.9\%$, so the insurance operation itself made money.
> > - The operating ratio is $97.9\% - 45/500 = 88.9\%$.
> > - The underwriting profit is $500 - 355 - 140 = \$5$ million, 1% of earned premium. It is not the 2.1-point margin of the trade-basis ratio, which divides expenses by written premium.
> > - Pre-tax income is $5 + 45 = \$50$ million.

> [!trap] LAE belongs to the loss side
> Loss adjustment expense, allocated and unallocated, is part of the loss side of the combined ratio, divided by earned premium. Counting it as an underwriting expense moves it to the wrong denominator.
