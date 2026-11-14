---
verification:
  status: unverified
  confidence: null
  last_checked: null
  last_checked_by: null
  content_hash: sha256:28e82fa4e66133e8b5faf379345ff18786991698d6876368e3a79b62934788ba
  sources: []
  open_findings: 0
  open_critical: 0
  log: .verify/Concepts/Fulfilment Cash Flows.md
---

![[Media/Figures/Fulfilment_Cash_Flows.svg|340]]

**Fulfilment Cash Flows** are the [[IFRS 17]] measure of what it will cost the insurer to discharge its obligations: an explicit, unbiased, probability-weighted estimate of the future cash flows, discounted to present value, plus a [[Risk Adjustment for Non-Financial Risk|risk adjustment]] for the uncertainty in their amount and timing. The fulfilment cash flows, $\text{FCF}$, are

> $$\text{FCF} = \text{PV}\bigl(E[\text{cash flows}]\bigr) + \text{RA}$$

- $E[\text{cash flows}]$ is the probability-weighted mean of the future cash flows.
- $\text{PV}$ is the adjustment for the time value of money and financial risk.
- $\text{RA}$ is the risk adjustment for non-financial risk.

These are the standard's three building blocks. Under the [[General Measurement Model|GMM]] a fourth block, the [[Contractual Service Margin]], sits on top of them. The [[Liability for Incurred Claims|LIC]] has no CSM.

## An unbiased, current estimate

The estimate is the mean of the outcome distribution, using all reasonable and supportable information available without undue cost or effort. A prudent estimate, a modal estimate or a management-preferred estimate all fail the definition. Conservatism belongs in the risk adjustment, where it is visible and disclosed.

The measurement is current. Assumptions are re-estimated every reporting period at current market-consistent rates and current expectations, so the liability moves with conditions rather than being locked in at inception. Fulfilment cash flows are the insurer's own view of the cost of fulfilment, not an exit price: IFRS 17 does not use a transfer or fair value notion for the ongoing measurement.

The split between the discount effect and everything else drives the income statement. Changes in cash flow estimates go to [[Insurance Service Expenses|insurance service expenses]], while the effect of discount rate changes and the unwind of the discount go to [[Insurance Finance Income or Expenses|insurance finance income or expenses]].

## Cash flows included

Only cash flows within the [[Contract Boundary|contract boundary]] are included, and only those directly attributable to fulfilling the portfolio:

| Included | Excluded |
| :--- | :--- |
| Claims and [[Allocated Loss Adjustment Expense|ALAE]] | General overhead |
| Directly attributable claims-handling costs | Product development |
| Policy administration and maintenance | Training |
| Premium taxes | The cost of underwriting business not yet written |
| Directly attributable [[Insurance Acquisition Cash Flows|acquisition costs]] | |

> [!example]- Which of these items are inside the fulfilment cash flows of a group of P&C contracts? {Example}
> 1. Expected claim payments and defence costs.
> 2. Salaries of the claims staff handling those claims.
> 3. The chief executive's salary and the head office lease.
> 4. Commission payable on the policies in the group.
> 5. Expected salvage and subrogation recoveries.
> 6. Advertising to attract next year's policyholders.
> 7. Premium taxes on the group's premiums.
>
> > [!answer]-
> > - Item 1 is inside: claims and ALAE are the core obligation.
> > - Item 2 is inside: directly attributable claims-handling cost (ULAE), allocated on a systematic and rational basis.
> > - Item 3 is outside: general overhead is not directly attributable to any particular portfolio, and is expensed as incurred.
> > - Item 4 is inside: commission is a directly attributable acquisition cash flow.
> > - Item 5 is inside, as a negative cash flow that reduces the liability, because the recoveries are on claims within the contracts.
> > - Item 6 is outside: the cost of acquiring future contracts falls outside the boundary of the existing group.
> > - Item 7 is inside: premium taxes are directly attributable to the contracts.

> [!trap] Loading general overhead into unpaid claims
> Under previous practice many insurers allocated a share of general overhead into unpaid claims. IFRS 17 does not permit it, which reduces the liability and moves that cost to the period in which it is incurred. Ask of each cost whether it is directly attributable to fulfilling contracts in this portfolio.
