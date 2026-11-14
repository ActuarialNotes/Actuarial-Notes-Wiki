---
verification:
  status: unverified
  confidence: null
  last_checked: null
  last_checked_by: null
  content_hash: sha256:b2ab00e0e539264c1d1276f13a1b5ee5f05fc487b9572e4252397d95b45d6c38
  sources: []
  open_findings: 0
  open_critical: 0
  log: .verify/Concepts/Liability for Incurred Claims.md
---

![[Media/Figures/Liability_for_Incurred_Claims.svg|340]]

The **Liability for Incurred Claims** (LIC) is the [[IFRS 17]] liability for claims that have already occurred but are not yet fully paid, including case reserves, IBNR, reopened claims and their adjustment expenses. It is measured from the [[Fulfilment Cash Flows|fulfilment cash flows]] for those claims and a [[Risk Adjustment for Non-Financial Risk|risk adjustment]].

The LIC is

> $$\text{LIC} = \text{PV} + \text{RA}$$

- $\text{PV}$ is the present value of the expected future cash flows for the incurred claims.
- $\text{RA}$ is the risk adjustment for non-financial risk.

The LIC has no [[Contractual Service Margin|contractual service margin]]. The service under an incurred claim has already been provided, so there is no unearned profit to defer. This is a structural difference from the [[Liability for Remaining Coverage|LRC]] under the [[General Measurement Model|GMM]].

The expected cash flows are an unbiased, probability-weighted estimate: the mean of the distribution of outcomes, not a conservative or a modal estimate. Conservatism enters only through the explicit risk adjustment.

> [!example]- What is the LIC for these unpaid claims? {Example}
> An actuary's undiscounted central estimate of unpaid claims and ALAE is $\$180$ million. It is expected to be paid over five years in the pattern $35\%$, $25\%$, $20\%$, $12\%$, $8\%$, each year's payment at mid-year. The current discount rate is $4\%$, and the risk adjustment is $6\%$ of the discounted cash flows.
>
> > [!answer]-
> > - With $v = 1.04^{-1}$, each year's payment is discounted from $t = 0.5, 1.5, \ldots, 4.5$.
> > - The discount factors are $0.98058$, $0.94287$, $0.90661$, $0.87174$ and $0.83821$.
> > - Weighted by the payment pattern, $0.35(0.98058) + 0.25(0.94287) + \cdots + 0.08(0.83821) = 0.93191$.
> > - The present value is $\$180\text{M} \times 0.93191 = \$167.7$ million.
> > - The risk adjustment is $0.06 \times \$167.7\text{M} = \$10.1$ million.
> > - The LIC is $\$167.7\text{M} + \$10.1\text{M} = \$177.8$ million.
> > - The discount takes off $\$12.3$ million and the risk adjustment adds back $\$10.1$ million. That they nearly cancel is a result of this payout pattern and these parameters. On a long-tail line the discount would dominate, and on a short-tail line the risk adjustment would.

## Cash flows in the LIC

The LIC includes only cash flows within the [[Contract Boundary|contract boundary]] that are directly attributable to fulfilling the contracts:

1. Claim payments.
2. [[Allocated Loss Adjustment Expense|ALAE]].
3. Directly attributable claims-handling overhead (ULAE).
4. Claim-related salvage and subrogation recoveries, as negative cash flows.

Reinsurance recoveries on incurred claims are not deducted. They form part of the [[Reinsurance Contracts Held|reinsurance contracts held]] asset.

## Discounting

The LIC is discounted at [[IFRS 17 Discount Rates|current rates]] consistent with the characteristics of the liability cash flows. Under the [[Premium Allocation Approach|PAA]], only claims expected to be paid within a year of being incurred may be left undiscounted.

## Changes in the LIC

Changes in the LIC are split on the income statement. Changes from claim experience and assumption revisions go to [[Insurance Service Expenses|insurance service expenses]]. The unwinding of discount and the effect of changes in discount rates go to [[Insurance Finance Income or Expenses|insurance finance income or expenses]]. The split keeps the [[Insurance Service Result|insurance service result]] a measure of underwriting performance.

> [!trap] Treating the unwind of discount as a claims cost
> In the example, the $\$167.7$ million unwinds toward $\$180$ million over the following years. That unwind is insurance finance expense, not an underwriting loss, so it stays out of insurance service expenses.
