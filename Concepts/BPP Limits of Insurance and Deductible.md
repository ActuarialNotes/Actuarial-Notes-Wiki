---
verification:
  status: stale
  confidence: null
  last_checked: 2026-10-10
  last_checked_by: agent:validate-v1
  content_hash: sha256:f17e920f69e6ecdf309e9f76d1b721ee306e1a8743d94b7c135803b2ee211404
  sources:
    - "ISO CP 00 10 10 12 Building and Personal Property Coverage Form (specimen), §C, D (Examples 1–2), E.6.b(1)(c), E.7.d pp.9–13, sha256:b46b0929e7effc6cfcfde0493f5a363dc32053b3afd56632776432f596a1e106 — https://www.propertyinsurancecoveragelaw.com/wp-content/uploads/2017/05/CP00101012-1.pdf"
    - "ISO CP 10 30 10 12 Causes of Loss – Special Form (specimen), §F.3, sha256:119fcd978212db836e1084ca8ca90c0fdacb60d157caf4867bbc7b4e02f498e3 — https://www.propertyinsurancecoveragelaw.com/wp-content/uploads/2018/09/CP.10.30.10.12-1-1.pdf"
  open_findings: 0
  open_critical: 0
  log: .verify/Concepts/BPP Limits of Insurance and Deductible.md
---

The **limits of insurance and deductible** of the [[Building and Personal Property Coverage Form|BPP]] are sections C and D of ISO CP 00 10 10 12, which set the most the insurer pays and the part of each loss the insured keeps. The limit shown in the declarations is the most paid for loss in any one occurrence, with a separate cap on outdoor signs and four additional coverages paid outside it.

The deductible is applied once per occurrence, after any coinsurance or agreed value reduction, by subtracting it from the loss and then paying the lesser of the result and the limit. The adjusted loss is

> $$L^{*} = R \times L$$

- $L$ is the amount of loss to an item of covered property in one occurrence, valued under the [[BPP Loss Conditions and Additional Conditions|valuation condition]].
- $R$ is the reduction factor from the coinsurance condition or the agreed value optional coverage, equal to 1 when neither reduces the loss.

and the amount paid is

> $$\text{Paid} = \begin{cases} 0 & L^{*} \leq D \\ \min\big(L^{*} - D,\ C\big) & L^{*} > D \end{cases}$$

- $D$ is the deductible.
- $C$ is the item's limit of insurance.

The form first reduces the loss for coinsurance or agreed value, then compares the adjusted loss with the deductible. If the adjusted loss is no more than the deductible, nothing is paid. Otherwise the deductible is subtracted and the insurer pays that amount or the limit, whichever is less. Because the deductible comes off the loss and not the limit, a loss that exceeds the limit by at least the deductible is paid at the full limit. With no coinsurance penalty, $R = 1$ and only the deductible and the limit reduce the payment.

> [!example]- A building worth $\$300{,}000$ is insured for $\$150{,}000$ with 80% coinsurance and a $\$1{,}000$ deductible. What does the insurer pay for $\$1{,}500$ of vandalism damage? {Example}
> - The loss is first reduced for coinsurance: $R = 150{,}000 / (0.80 \times 300{,}000) = 0.625$.
> - The adjusted loss is $L^{*} = 0.625 \times 1{,}500 = \$937.50$.
> - The adjusted loss is less than the $\$1{,}000$ deductible, so the insurer pays nothing.
> - With adequate insurance, $R = 1$ and the insurer would pay $1{,}500 - 1{,}000 = \$500$.

## Limits per occurrence and per item

The limit applies to each occurrence, and the BPP has no annual aggregate. Each item with its own limit, such as Building and Your Business Personal Property, or each of several buildings, is capped by its own limit. The most paid for loss to outdoor signs, whether or not attached to a building, is $\$2{,}500$ per sign in any one occurrence.

When one occurrence damages several items with separate limits, the losses are not combined to apply the deductible, but the deductible is applied only once per occurrence. The form's examples apply it to the item where it reduces the payment and pay the other item at its limit.

> [!example]- What does the insurer pay for this fire at two buildings? {Example}
> A fire damages two buildings insured under one BPP with a $\$1{,}000$ deductible and no coinsurance penalty:
>
> | Building | Limit ($) | Loss ($) |
> | :--- | ---: | ---: |
> | 1 | 100,000 | 100,600 |
> | 2 | 150,000 | 165,000 |
>
> > [!answer]-
> > - Building 1's loss is less than its limit plus the deductible, $\$101{,}000$, so the deductible reduces the payment there.
> > - Building 1 is paid $\min(100{,}600 - 1{,}000,\ 100{,}000) = \$99{,}600$.
> > - The deductible applies only once per occurrence, so it is not subtracted again for Building 2.
> > - Building 2's loss exceeds its limit plus the deductible in any case, so it is paid its $\$150{,}000$ limit.
> > - The insurer pays $99{,}600 + 150{,}000 = \$249{,}600$. Each building is held to its own limit, not to a combined $\$250{,}000$.

## Coverages paid outside the limit

The amounts of the fire department service charge, pollutant clean-up and removal, increased cost of construction and electronic data [[BPP Additional Coverages and Coverage Extensions|additional coverages]] are separate from the limits of insurance. Preservation of property payments do not increase the limit. Debris removal is within the limit, plus an additional $\$25{,}000$ per location.

> [!example]- What does the insurer pay in all for this total fire loss? {Example}
> A building insured for $\$500{,}000$ with a $\$2{,}500$ deductible and no coinsurance penalty is destroyed by fire. The building loss is $\$650{,}000$, debris removal costs $\$60{,}000$, cleaning fuel oil from the soil costs $\$14{,}000$, and the town charges $\$1{,}500$ for the fire department under its ordinance. The replacement cost optional coverage does not apply.
>
> > [!answer]-
> > - The building loss less the deductible exceeds the limit, so the building is paid $\$500{,}000$ and no room is left under the limit for debris removal.
> > - The debris expense plus the loss payment exceed the limit, so the additional $\$25{,}000$ for debris removal applies.
> > - Pollutant clean-up is capped at $\$10{,}000$ and the fire department service charge at $\$1{,}000$, both outside the limit.
> > - Increased cost of construction pays nothing, because it applies only to buildings under the replacement cost optional coverage.
> > - The insurer pays $500{,}000 + 25{,}000 + 10{,}000 + 1{,}000 = \$536{,}000$.

> [!trap] Subtracting the deductible from the limit
> The deductible comes off the loss. A $\$604{,}000$ loss on a $\$600{,}000$ limit with a $\$5{,}000$ deductible pays $\$599{,}000$, not $\$595{,}000$. The coinsurance reduction comes before the deductible, so subtracting the deductible first and then applying the ratio is also wrong.
