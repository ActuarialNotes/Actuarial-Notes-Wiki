---
verification:
  status: unverified
  confidence: null
  last_checked: null
  last_checked_by: null
  content_hash: sha256:12a01fcc584e811e75627be65a5069804568bd5de31ac92dddaecbf248a443cd
  sources: []
  open_findings: 0
  open_critical: 0
  log: .verify/Concepts/Fulfilment Cash Flows.md
---

**Fulfilment Cash Flows** are the [[IFRS 17]] building block that measures what it will actually cost the insurer to discharge its obligations: an **explicit, unbiased, probability-weighted estimate** of future cash flows, **discounted** to present value, plus a **[[Risk Adjustment for Non-Financial Risk|risk adjustment]]** for the uncertainty in the amount and timing of those flows.

> $$\text{FCF} = \text{PV}\bigl(E[\text{cash flows}]\bigr) + \text{RA}$$

- **The three components** are the standard's "building blocks": (1) estimates of future cash flows, (2) an adjustment for the time value of money and financial risk, and (3) the risk adjustment for non-financial risk. Under the [[General Measurement Model|GMM]] a fourth block — the [[Contractual Service Margin]] — sits on top; the [[Liability for Incurred Claims|LIC]] has no CSM.
- **Unbiased and probability-weighted** is a real constraint. The estimate is the **mean** of the outcome distribution, using all reasonable and supportable information available without undue cost or effort. A prudent estimate, a modal estimate, or a management-preferred estimate all fail the definition; conservatism belongs in the risk adjustment where it is visible and disclosed.
- **Only cash flows within the [[Contract Boundary]]** are included, and only those **directly attributable** to fulfilling the portfolio: claims, [[Allocated Loss Adjustment Expense|ALAE]] and directly attributable claims-handling costs, policy administration and maintenance, premium taxes, and directly attributable acquisition costs. Excluded: general overhead, product development, training, and the cost of underwriting business not yet written.
- **A current measurement.** Assumptions are re-estimated every reporting period at current market-consistent rates and current expectations, so the liability moves with conditions rather than being locked in at inception.
- **The split between the discount effect and everything else** drives the income statement: changes in cash flow estimates hit [[Insurance Service Expenses]], while the effect of discount rate changes and the unwind hit [[Insurance Finance Income or Expenses]].
- Fulfilment cash flows are the insurer's **own** view of fulfilment cost, not an exit price. IFRS 17 deliberately does not use a transfer or fair value notion for the ongoing measurement.

> [!example]- What Belongs in Fulfilment Cash Flows? {Example}
> Classify each item as inside or outside fulfilment cash flows for a group of P&C contracts.
>
> 1. Expected claim payments and defence costs.
> 2. Salaries of the claims department staff handling those claims.
> 3. The chief executive's salary and the head office lease.
> 4. Commission payable on the policies in the group.
> 5. Expected salvage and subrogation recoveries.
> 6. Advertising to attract next year's policyholders.
> 7. Premium taxes on the group's premiums.
>
> > [!answer]-
> > **Inside:**
> >
> > - **1.** Claims and [[Allocated Loss Adjustment Expense|ALAE]] — the core obligation.
> > - **2.** Directly attributable claims-handling cost (ULAE), allocated on a systematic and rational basis.
> > - **4.** Commission is a directly attributable [[Insurance Acquisition Cash Flows|acquisition cash flow]].
> > - **5.** As a **negative** cash flow, reducing the liability. They are recoveries on claims within the contracts.
> > - **7.** Premium taxes are directly attributable to the contracts.
> >
> > **Outside:**
> >
> > - **3.** General overhead is not directly attributable to fulfilling any particular portfolio, and is expensed as incurred.
> > - **6.** Costs of acquiring *future* contracts fall outside the boundary of the existing group entirely.
> >
> > The dividing question is always **"directly attributable to fulfilling contracts in this portfolio?"** Item 3 is the one that changes results most: under previous practice many insurers allocated a share of general overhead into unpaid claims. IFRS 17 does not permit it, which reduces the liability and moves that cost to the period in which it is incurred.
