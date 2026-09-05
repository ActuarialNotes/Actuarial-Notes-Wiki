---
verification:
  status: unverified
  confidence: null
  last_checked: null
  last_checked_by: null
  content_hash: sha256:28a94940692802173e6489358e7a8a832baf7f9aafcdc23267e0851aa37c88a9
  sources: []
  open_findings: 0
  open_critical: 0
  log: .verify/Concepts/Insurance Service Expenses.md
---

**Insurance Service Expenses** are the [[IFRS 17]] costs of providing insurance coverage in the period: claims and other expenses incurred, amortisation of [[Insurance Acquisition Cash Flows|acquisition cash flows]], losses on [[Onerous Contract|onerous]] groups and reversals of them, and changes to the [[Liability for Incurred Claims|LIC]] relating to **past service**. They sit directly beneath [[Insurance Revenue]] and together produce the [[Insurance Service Result]].

- **What is in:** incurred claims and [[Allocated Loss Adjustment Expense|ALAE]], directly attributable claims-handling costs, amortised acquisition cash flows, the loss recognised on onerous groups, and **adverse or favourable development** on claims already incurred.
- **What is deliberately out:** the **unwinding of discount** and the effect of **changes in discount rates**, which are [[Insurance Finance Income or Expenses]]. This separation is the design feature that makes the insurance service result a clean measure of underwriting performance, undisturbed by interest rate movements.
- **Also out:** general overhead not directly attributable to fulfilling contracts, which is expensed as an operating cost outside the insurance service result entirely.
- **Past service versus future service** is the routing rule to memorise. A change in the estimate of claims **already incurred** goes here, in profit or loss now. A change in the estimate of claims **not yet incurred** adjusts the [[Contractual Service Margin|CSM]] under the GMM, or triggers an [[Onerous Contract|onerous]] assessment under the PAA.
- **The [[Loss Component]] offsets.** For an onerous group, incurred claims are reduced by the loss component released, so the expense reported is less than the claims incurred — because the difference was charged at inception.
- Reinsurance recoveries do **not** reduce insurance service expenses; they appear in the separate net expense from [[Reinsurance Contracts Held|reinsurance held]].

> [!example]- Routing Each Change {Example}
> For each item, state where it appears in the IFRS 17 income statement.
>
> 1. Claims incurred on accidents occurring this year: $\$210$ million.
> 2. Adverse development of $\$18$ million on claims incurred in prior years.
> 3. Unwinding of discount on the LIC: $\$9$ million.
> 4. A fall in the discount rate increasing the LIC by $\$14$ million.
> 5. A revised estimate of claims on the *unexpired* portion of a GMM group: $+\$7$ million.
> 6. Amortisation of acquisition cash flows: $\$46$ million.
>
> > [!answer]-
> > - **1. Insurance service expenses**, $\$210$M. Current-period claims.
> > - **2. Insurance service expenses**, $\$18$M. Adverse development relates to **past service** and is recognised immediately — it does not touch the CSM.
> > - **3. Insurance finance expenses**, $\$9$M. Time value of money, not underwriting.
> > - **4. Insurance finance expenses**, $\$14$M — or **OCI**, if the insurer has elected the [[Other Comprehensive Income Option|OCI option]] for that portfolio.
> > - **5. Adjusts the CSM**, not profit or loss, because it relates to **future service**. If the CSM is insufficient to absorb it, the excess becomes a loss and a [[Loss Component]].
> > - **6. Insurance service expenses**, $\$46$M — unless the insurer elected the PAA expedient to expense acquisition cash flows as incurred, in which case they were charged when paid.
> >
> > **Insurance service expenses total $\$274$ million**; $\$23$ million goes to finance expenses (or OCI); $\$7$ million goes nowhere on the income statement this period.
> >
> > The discipline being tested is a single question asked of every item: **does this relate to service already provided, service not yet provided, or the time value of money?** Those three destinations account for everything.
