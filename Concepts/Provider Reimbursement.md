---
aliases:
  - Reimbursement
verification:
  status: unverified
  confidence: null
  last_checked: null
  last_checked_by: null
  content_hash: sha256:aa4171643a8b1464a38b9b92243bb7e855a690b2b67c50e812142eb9c212cbc6
  sources: []
  open_findings: 0
  open_critical: 0
  log: .verify/Concepts/Provider Reimbursement.md
---
**Provider Reimbursement** is the method and the amount by which a payer, such as an insurer, a health plan or a government program, pays physicians, hospitals and other providers for the care its members receive. The method sets the unit the payer pays for, from a single service up to a member's total care for a year, and with it how the financial risk of [[Utilization|utilization]] and cost is shared between payer and provider.

| Method | Unit paid for | Risk the provider bears |
| --- | --- | --- |
| Fee-for-service | Each service | Little |
| Per diem | Each inpatient day | Cost of a day |
| Case rate or DRG | Each admission | Length of stay |
| Bundled payment | Each episode of care | Cost of the episode |
| Capitation | Each member month | Utilization of the covered services |

> [!idea] The idea
> Each step down the table moves more of the cost risk from payer to provider, which reduces the incentive to over-treat and increases the incentive to under-treat, so methods are evaluated on cost and quality together.

## Fee-for-service

The payer pays for each service, either as billed charges, as a percent of charges (a discount off the provider's own list prices), or from a fee schedule. More services mean more revenue for the provider. The resource-based relative value scale (RBRVS) that Medicare uses for physicians ranks every service in relative value units, and many commercial contracts pay a negotiated percentage of the Medicare fee schedule. Under the RBRVS a service's fee is

> $$\text{Fee} = \left(\sum_{k} \text{RVU}_k \times \text{GPCI}_k\right) \times \text{CF}$$

- $\text{RVU}_k$ is the service's relative value units for component $k$: physician work, practice expense and malpractice.
- $\text{GPCI}_k$ is the geographic practice cost index for that component.
- $\text{CF}$ is the conversion factor in dollars per unit.

> [!example]- What is the fee for this service? {Example}
> Under illustrative figures, the service has 1.50 work, 1.20 practice expense and 0.10 malpractice RVUs. The GPCIs are 1.02, 1.10 and 0.90, and the conversion factor is $\$33$.
>
> > [!answer]-
> > - The geographically adjusted units are $1.50(1.02) + 1.20(1.10) + 0.10(0.90) = 2.94$.
> > - The fee is $2.94 \times 33 = \$97.02$.

## Per diem

A hospital is paid a fixed amount for each day of an inpatient stay, often by type of care. The payer knows the price of a day but still bears the risk of the number of admissions and the length of stay.

## Case rates and DRGs

A diagnosis related group (DRG) system pays one amount per admission, whatever the length of stay. The payment for an admission in DRG $d$ is

> $$\text{Pay}_{\text{DRG}} = W_d \times B$$

- $W_d$ is the relative weight of the DRG.
- $B$ is the hospital's base rate.

The hospital now bears the cost of a long stay. That rewards shorter stays but can reward discharging too early or readmitting. Outlier provisions pay extra for cases far above the DRG's normal cost.

> [!example]- What does the hospital receive for this stay under each contract, and for an 8-day stay instead? {Example}
> An admission falls in a DRG with an illustrative weight of 1.40. The hospital's billed charges are $\$40{,}000$ for a 5-day stay. Its contracts pay either 55% of charges, a per diem of $\$3{,}200$, or a DRG base rate of $\$11{,}500$. A complicated 8-day stay in the same DRG would have charges of $\$60{,}000$ and not reach the outlier threshold.
>
> > [!answer]-
> > - Billed charges pay $\$40{,}000$, and 55% of charges pays $0.55 \times 40{,}000 = \$22{,}000$.
> > - The per diem pays $3{,}200 \times 5 = \$16{,}000$.
> > - The DRG pays $1.40 \times 11{,}500 = \$16{,}100$.
> > - For the 8-day stay, 55% of charges pays $\$33{,}000$ and the per diem pays $3{,}200 \times 8 = \$25{,}600$.
> > - The DRG payment stays at $\$16{,}100$. Under percent of charges and per diem the payer pays for the longer stay, and under the DRG the hospital absorbs it.

A contract at a percent of charges pays more when the hospital raises its list prices, so it is not a fixed price.

## Bundled payments

A single price covers all the services in an episode of care, such as a joint replacement from admission through 90 days after discharge, across the hospital, surgeon and post-acute providers. It sits between a case rate and capitation, putting the providers at risk for the cost of the episode but not for how many episodes occur.

## Capitation

The provider receives a fixed amount per member per month (PMPM) for a defined set of services, whatever the members use. For $\text{MM}$ member months, the capitation paid is

> $$\text{Cap} = \text{PMPM} \times \text{MM}$$

The provider bears the utilization risk for those services. That needs enough members to be stable and can encourage under-treatment, so capitation is paired with quality measures and sometimes with stop-loss protection. The rate covers only the services listed in the contract. Services carved out, such as drugs or out-of-network care, stay with the payer and are priced separately.

> [!example]- A primary care group is capitated at $\$30$ PMPM for 2,000 members. What does it receive in a year? {Example}
> - The group has $2{,}000 \times 12 = 24{,}000$ member months.
> - Its capitation is $30 \times 24{,}000 = \$720{,}000$, however many visits the members make.

## Value-based payment

Value-based arrangements add incentives for cost and quality on top of a base payment, through pay-for-performance bonuses, withholds or shared savings. An [[Accountable Care Organization|accountable care organization]] (ACO) is measured against a risk-adjusted benchmark for its attributed population's total cost. It earns [[Accountable Care Organization#Shared savings|shared savings]] only if they exceed a minimum savings rate, so that random variation isn't rewarded, and in two-sided models it also repays part of any losses. Because the benchmark is risk-adjusted, comparing an ACO's cost with the prior year's unadjusted cost rewards an ACO whose population became healthier and penalizes one whose population became sicker.

> [!trap] Treating a DRG payment as a per diem
> A DRG payment does not change with the length of stay, but a per diem does. Multiplying the $\$16{,}100$ DRG payment by 8 days, or paying a per diem as one amount per admission, gets both the payment and the risk transfer wrong.
