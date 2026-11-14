---
verification:
  status: unverified
  confidence: null
  last_checked: null
  last_checked_by: null
  content_hash: sha256:9b3047005852504415f2619b06d5f9c17fd79f355c6ffd808c5578d6d1586552
  sources: []
  open_findings: 0
  open_critical: 0
  log: .verify/Concepts/Loss Reserve Discounting.md
---

**Loss Reserve Discounting** is carrying unpaid losses and LAE at the present value of their expected payments rather than at their nominal amount. For a U.S. P&C insurer its main force is in tax: IRC §846 requires the reserves deducted in taxable income to be discounted, although the statutory balance sheet generally carries them undiscounted.

If $P_k$ is the payment expected in the $k$-th year after the valuation date, assumed made mid-year, and $r$ is the discount rate, the discounted reserve is

> $$\text{Discounted reserve} = \sum_{k=1}^{n} \frac{P_k}{(1+r)^{\,k - 1/2}}$$

- $n$ is the number of years over which the reserve is paid.

## Discounting for tax under §846

Discounting is done by line of business and accident year from three inputs:

1. the undiscounted unpaid losses and LAE on the annual statement,
2. the IRS rate for the calendar year in which the accident year ends, and
3. the IRS loss payment pattern for the line, redetermined every five years from aggregate annual statement data, with losses assumed paid mid-year.

Long-tail lines are given a longer payout. The discounted amount may never exceed the annual statement amount.

Since the TCJA the rate is based on a 60-month average of the corporate bond yield curve, where before 2018 it rested on federal mid-term rates. The payout assumed for long-tail lines was extended, and the election to use the company's own payment pattern was repealed. A higher rate and a longer payout both enlarge the discount, bringing tax forward.

## Effect on the insurer

Discounting defers the deduction but does not remove it. Over the life of the claims the deductions add up to the payments. What the insurer loses is the time value of tax paid early. It carries the prepaid tax as a deferred tax asset, admitted under statutory accounting only within limits:

> $$\text{DTA} = t \times (\text{Undiscounted} - \text{Discounted})$$

- $\text{DTA}$ is the deferred tax asset.
- $t$ is the tax rate, $21\%$.

> [!example]- How do this reserve's tax deductions compare with its statutory charge, year by year? {Example}
> At year end an insurer books a new reserve of $\$10{,}000$, expected to be paid $\$5{,}000$, $\$3{,}000$ and $\$2{,}000$ over the next three years, mid-year. The applicable §846 rate is $4\%$ and the tax rate $21\%$. The claims pay exactly as expected.
>
> > [!answer]-
> > - The discounted reserve at year 0 is $5{,}000/1.04^{0.5} + 3{,}000/1.04^{1.5} + 2{,}000/1.04^{2.5} = 9{,}544.70$.
> > - After one year it is $3{,}000/1.04^{0.5} + 2{,}000/1.04^{1.5} = 4{,}827.47$, and after two years $2{,}000/1.04^{0.5} = 1{,}961.16$.
> > - Each year's tax deduction is paid losses plus the change in discounted reserves: $9{,}544.70$ in year 0.
> > - Year 1 is $5{,}000 + 4{,}827.47 - 9{,}544.70 = 282.77$, year 2 is $3{,}000 + 1{,}961.16 - 4{,}827.47 = 133.69$, and year 3 is $2{,}000 - 1{,}961.16 = 38.84$.
> > - The deductions total $\$10{,}000$, the same as the statutory charge, but statutory income takes all $\$10{,}000$ in year 0.
> > - Taxable income is therefore $\$455.30$ higher in year 0, costing $0.21 \times 455.30 = \$95.61$ of tax, carried as a deferred tax asset.
> > - It is recovered as $\$59.38$, $\$28.07$ and $\$8.16$ over the next three years. Discounted at $4\%$ the recoveries are worth about $\$90.30$, so discounting costs the insurer roughly $\$5$ in present value.

> [!example]- What does strengthening reserves by $\$20$M do to current tax, deferred tax, statutory net income and surplus, if the §846 factor is $0.85$? {Example}
> - The tax deduction is $0.85 \times 20 = \$17.0$M, so current tax falls by $0.21 \times 17.0 = \$3.57$M.
> - The deferred tax asset rises by $0.21 \times (20 - 17.0) = \$0.63$M.
> - Statutory net income records only current tax, so it falls by $20 - 3.57 = \$16.43$M.
> - The $\$0.63$M deferred tax benefit goes directly to surplus (if admissible), so surplus falls by $\$15.80$M, the full after-tax $0.79 \times 20$.
> - On a GAAP basis net income itself falls by $\$15.80$M. The strengthening is only partly tax-shielded in the year it is booked.

## Discounting on the balance sheet

Statutory accounting prohibits discounting except tabular discounting of fixed, reasonably determinable payment streams, such as workers compensation indemnity and long-term disability. Non-tabular discounting needs a permitted practice and disclosure. GAAP is broadly the same, and [[IFRS]] 17 requires discounting. The actuarial side is governed by ASOP No. 20 on discounting claim estimates ([[Actuarial Standards of Practice]]).

> [!trap] Tax discounting is not book discounting
> §846 discounts the reserves deducted for tax, while the statutory balance sheet generally carries them undiscounted. The difference is a timing difference carried as a deferred tax asset, not a lower statutory reserve.
