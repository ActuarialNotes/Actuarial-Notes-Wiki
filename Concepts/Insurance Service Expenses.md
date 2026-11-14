---
verification:
  status: unverified
  confidence: null
  last_checked: null
  last_checked_by: null
  content_hash: sha256:a6fd1b60bd3f8e11dbf3e6457ac59d7d4339a7cb6b1de320401cefe2282e12e2
  sources: []
  open_findings: 0
  open_critical: 0
  log: .verify/Concepts/Insurance Service Expenses.md
---

![[Media/Figures/Insurance_Service_Expenses.svg|340]]

**Insurance Service Expenses** are the [[IFRS 17]] costs of providing insurance coverage in the period: claims and other expenses incurred, amortisation of [[Insurance Acquisition Cash Flows|acquisition cash flows]], losses on [[Onerous Contract|onerous]] groups and reversals of them, and changes to the [[Liability for Incurred Claims|LIC]] relating to past service. They sit directly beneath [[Insurance Revenue]], and the two together produce the [[Insurance Service Result]].

What is in and what is out:

| In insurance service expenses | Out of insurance service expenses |
| --- | --- |
| Incurred claims and [[Allocated Loss Adjustment Expense|ALAE]] | Unwinding of discount, in [[Insurance Finance Income or Expenses]] |
| Directly attributable claims-handling costs | Effect of changes in discount rates, in [[Insurance Finance Income or Expenses]] |
| Amortised acquisition cash flows | General overhead not directly attributable to fulfilling contracts, an operating cost outside the insurance service result |
| The loss recognised on onerous groups | Reinsurance recoveries, in the net expense from [[Reinsurance Contracts Held|reinsurance contracts held]] |
| Adverse or favourable development on claims already incurred | |

Keeping the discount effects out is what makes the insurance service result a clean measure of underwriting performance, undisturbed by interest rate movements.

## Past service and future service

A change in the estimate of claims already incurred relates to past service. It goes in insurance service expenses, in profit or loss now. A change in the estimate of claims not yet incurred relates to future service. It adjusts the [[Contractual Service Margin|CSM]] under the GMM, or triggers an [[Onerous Contract|onerous]] assessment under the PAA.

> [!example]- Where does each of these six items appear in the IFRS 17 income statement? {Example}
> The items for the year are:
>
> 1. Claims incurred on accidents occurring this year: $\$210$ million.
> 2. Adverse development of $\$18$ million on claims incurred in prior years.
> 3. Unwinding of discount on the LIC: $\$9$ million.
> 4. A fall in the discount rate increasing the LIC by $\$14$ million.
> 5. A revised estimate of claims on the unexpired portion of a GMM group: $+\$7$ million.
> 6. Amortisation of acquisition cash flows: $\$46$ million.
>
> > [!answer]-
> > - Item 1 is current-period claims, so it is an insurance service expense of $\$210$ million.
> > - Item 2 relates to past service, so it is an insurance service expense of $\$18$ million, recognised immediately without touching the CSM.
> > - Item 3 is the time value of money, so it is an insurance finance expense of $\$9$ million.
> > - Item 4 is an insurance finance expense of $\$14$ million, or goes to OCI if the insurer elected the [[Other Comprehensive Income Option|OCI option]] for that portfolio.
> > - Item 5 relates to future service, so it adjusts the CSM, not profit or loss. If the CSM is too small to absorb it, the excess becomes a loss and a [[Loss Component]].
> > - Item 6 is an insurance service expense of $\$46$ million, unless the insurer elected the PAA option to expense acquisition cash flows as incurred, in which case they were charged when paid.
> > - Insurance service expenses total $210 + 18 + 46 = \$274$ million, $\$23$ million goes to finance expenses (or OCI), and $\$7$ million appears nowhere on this period's income statement.

## Onerous groups

For an onerous group, incurred claims are reduced by the [[Loss Component|loss component]] released. The expense reported is then less than the claims incurred, because the difference was charged earlier, when the loss component was set up.

> [!trap] Routing a future-service change to profit or loss
> Ask of every item whether it relates to service already provided, service not yet provided, or the time value of money. The first goes to insurance service expenses. A revised estimate for unexpired GMM coverage adjusts the CSM.
