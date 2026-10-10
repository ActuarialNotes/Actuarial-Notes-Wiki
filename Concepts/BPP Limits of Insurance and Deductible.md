---
verification:
  status: unverified
  confidence: null
  last_checked: null
  last_checked_by: null
  content_hash: sha256:adac2e6a0e0dab8031a3a224454b421dea37799afc9f8d3353af57651695054d
  sources: []
  open_findings: 0
  open_critical: 0
  log: .verify/Concepts/BPP Limits of Insurance and Deductible.md
---

**The limits of insurance and deductible** of the [[Building and Personal Property Coverage Form|BPP]] set the most the insurer pays and the part of each loss the insured keeps. The limit shown in the declarations is the most paid for loss in any one occurrence, with a separate cap on outdoor signs and four additional coverages paid outside it. The deductible is applied once per occurrence, after any coinsurance or agreed value reduction, by subtracting it from the loss and then paying the lesser of the result and the limit. The provisions below are sections C and D of ISO CP 00 10 10 12.

> $$L^{*} = R \times L$$

> $$\text{Paid} = \begin{cases} 0 & L^{*} \leq D \\ \min\big(L^{*} - D,\ C\big) & L^{*} > D \end{cases}$$

- **Symbols:** $L$ is the amount of loss to an item of covered property in one occurrence, valued under the valuation condition. $R$ is the reduction factor from the coinsurance condition or the agreed value optional coverage, equal to 1 when neither reduces the loss. $D$ is the deductible and $C$ is the item's limit of insurance.
- **Per occurrence:** The limit applies to each occurrence; the BPP has no annual aggregate. Each item with its own limit, such as Building and Your Business Personal Property, or each of several buildings, is capped by its own limit.
- **Outdoor signs:** The most paid for loss to outdoor signs, whether or not attached to a building, is \$2,500 per sign in any one occurrence.
- **Coverages outside the limit:** The amounts of the fire department service charge, pollutant clean-up and removal, increased cost of construction and electronic data additional coverages are separate from the limits of insurance. Preservation of property payments do not increase the limit, and debris removal is within the limit plus an additional \$25,000 per location ([[BPP Additional Coverages and Coverage Extensions]]).
- **The order of the deductible:** The form first reduces the loss for coinsurance or agreed value, then compares the adjusted loss with the deductible. If the adjusted loss is no more than the deductible, nothing is paid. Otherwise the deductible is subtracted and the insurer pays that amount or the limit, whichever is less. Because the deductible comes off the loss and not the limit, a loss that exceeds the limit by at least the deductible is paid at the full limit.
- **Several items, one deductible:** When one occurrence damages several items with separate limits, the losses are not combined to apply the deductible, but the deductible is applied only once per occurrence. The form's examples apply it to the item where it reduces the payment and pay the other item at its limit.
- **Glass:** The BPP's glass rules sit elsewhere in the form. Glass is valued at the cost of replacement with safety-glazing material where the law requires it ([[BPP Loss Conditions and Additional Conditions|valuation condition]]), building glass breakage is not paid once a building has been vacant for more than 60 days, and the [[Causes of Loss Special Form|special form]] pays to board up openings while glass repair is delayed.

> [!example]- One Deductible Across Two Buildings {Example}
> A fire damages two buildings insured under one BPP with separate limits: \$100,000 on Building 1 and \$150,000 on Building 2, and a \$1,000 deductible. There is no coinsurance penalty. The loss to Building 1 is \$100,600 and the loss to Building 2 is \$165,000. Find the amount payable.
>
> > [!answer]-
> > Building 1's loss is less than its limit plus the deductible, \$101,000, so subtracting the deductible reduces the payment there.
> > $$
> > \begin{align*}
> > \text{Paid}_1 &= \min(100{,}600 - 1{,}000,\ 100{,}000) \\
> > &= 99{,}600
> > \end{align*}
> > $$
> > The deductible applies only once per occurrence, so it is not subtracted again for Building 2, whose loss exceeds its limit plus the deductible in any case. Building 2 is paid its \$150,000 limit, and the total is \$249,600. Combining the two losses into \$265,600 and testing them against a combined \$250,000 is not what the form does: each building is held to its own limit.

> [!example]- When the Deductible Swallows a Coinsured Loss {Example}
> A building worth \$300,000 at the time of loss is insured for \$150,000 with an 80% coinsurance percentage and a \$1,000 deductible. A vandal causes \$1,500 of damage. What does the insurer pay? What would it pay if the limit met the coinsurance requirement?
>
> > [!answer]-
> > The loss is first reduced for coinsurance, then compared with the deductible.
> > $$
> > \begin{align*}
> > R &= \frac{150{,}000}{0.80 \times 300{,}000} \\
> > &= 0.625 \\
> > L^{*} &= 0.625 \times 1{,}500 \\
> > &= 937.50
> > \end{align*}
> > $$
> > The adjusted loss of \$937.50 is less than the \$1,000 deductible, so the insurer pays nothing. With adequate insurance, $R = 1$ and the insurer would pay $1{,}500 - 1{,}000 = 500$.

> [!example]- A Total Loss With Coverages Outside the Limit {Example}
> A building insured for \$500,000 with a \$2,500 deductible and no coinsurance penalty is destroyed by fire. The building loss is \$650,000, debris removal costs \$60,000, cleaning fuel oil from the soil costs \$14,000, and the town charges \$1,500 for the fire department under its ordinance. The replacement cost optional coverage does not apply. What does the insurer pay in all?
>
> > [!answer]-
> > The building loss less the deductible exceeds the limit, so the building is paid \$500,000, and no room is left under the limit for debris removal. The additional \$25,000 applies because the debris expense plus the loss payment exceed the limit. Pollutant clean-up is capped at \$10,000 and the fire department service charge at \$1,000, both outside the limit.
> > $$
> > \begin{align*}
> > \text{Paid} &= 500{,}000 + 25{,}000 + 10{,}000 + 1{,}000 \\
> > &= 536{,}000
> > \end{align*}
> > $$
> > Increased cost of construction pays nothing here, because it applies only to buildings under the replacement cost optional coverage.

> [!tip]- How it appears on the exam
> - **DISC-IA:** The objective is the BPP's limits of insurance and deductible. Questions give a loss, a limit and a deductible and ask for the payment, often with two items or buildings in one occurrence, a coinsurance reduction, an outdoor sign or an additional coverage that is paid outside the limit.
> - **Linked pages:** The coinsurance reduction that comes before the deductible is on [[BPP Loss Conditions and Additional Conditions]], and agreed value on [[BPP Optional Coverages]].

> [!warning]- Exam traps
> - **Deductible from the loss, not the limit:** A \$604,000 loss on a \$600,000 limit with a \$5,000 deductible pays \$599,000, not \$595,000.
> - **Coinsurance first:** The coinsurance reduction is applied to the loss before the deductible. Subtracting the deductible first and then applying the ratio gives a different, wrong answer.
> - **Once per occurrence:** The deductible is not subtracted from each damaged item, even though the items' losses are not added together to apply it.
> - **Outdoor signs:** A sign is capped at \$2,500 per sign per occurrence even if the building limit has plenty of room.
> - **Not every additional coverage adds to the limit:** Fire department service charge, pollutant clean-up, increased cost of construction and electronic data are separate from the limit; preservation of property and the basic debris removal amount are not.
