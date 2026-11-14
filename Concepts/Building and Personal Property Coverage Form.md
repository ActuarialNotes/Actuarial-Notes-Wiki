---
verification:
  status: unverified
  confidence: null
  last_checked: null
  last_checked_by: null
  content_hash: sha256:f9eb555258fde7210c1456e11c10f76b7876e4a686c15f536282b6c109f8e21e
  sources: []
  open_findings: 0
  open_critical: 0
  log: .verify/Concepts/Building and Personal Property Coverage Form.md
---

The **Building and Personal Property Coverage Form** (BPP) is the ISO coverage form at the centre of [[Commercial Property Insurance|commercial property insurance]]. It covers direct physical loss to the insured's buildings, its business personal property and personal property of others in its care, at the premises described in the declarations, from the perils of the attached [[Causes of Loss|causes-of-loss]] form.

It sets out what property is covered, the additional coverages and extensions, the limits and [[Deductible|deductible]], the loss conditions, the additional conditions and the optional coverages. The form is read in that order:

1. Covered property, and property not covered.
2. Additional coverages and coverage extensions.
3. Limits of insurance and deductible.
4. Loss conditions.
5. Additional conditions.
6. Optional coverages.

The perils are in the separate [[Causes of Loss Basic and Broad Forms|basic and broad]] and [[Causes of Loss Special Form|special]] causes-of-loss forms, and the [[Commercial Property Conditions]] apply to the whole coverage part. The full walk from covered property to amount paid is a [[Coverage Analysis|coverage analysis]].

## Covered property

The form's [[BPP Covered Property|covered property]] falls into three categories:

1. **Building.** Building coverage includes the building, completed additions, fixtures, permanently installed machinery and equipment, and personal property used to maintain or service the building.
2. **Business personal property.** Business personal property is property the insured owns and uses in its business, in or on the building or in the open within 100 feet, including furniture, machinery, stock and the insured's improvements and betterments as a tenant.
3. **Personal property of others.** Personal property of others in the insured's care, custody or control is a third category, insured for the owner's account.

The form lists property it does not cover, mostly because another policy insures it better. Examples are money and securities, which go to crime insurance, land and growing crops, vehicles, property while airborne or waterborne, foundations below the lowest basement floor, underground pipes, and property more specifically insured elsewhere.

## Additional coverages and coverage extensions

The [[BPP Additional Coverages and Coverage Extensions|additional coverages]] pay costs that follow a covered loss, including debris removal, preservation of property moved to protect it, fire department service charges, pollutant cleanup on the premises, the increased cost of construction to meet building codes, and restoring electronic data. Some are paid within the limit and others in addition to it, each with its own sublimit. The most the debris removal additional coverage pays out of the limit is

> $$\text{Debris}_{\max} = 0.25\,(\text{Paid} + D)$$

- $\text{Paid}$ is the payment for the direct loss.
- $D$ is the deductible.

When the coinsurance percentage is at least 80%, or a value reporting period is shown, the insured can extend coverage to newly acquired or constructed property, personal effects and property of others, valuable papers, property temporarily off the premises, outdoor property such as fences and trees, non-owned detached trailers, and business personal property in portable storage units. A policy written with no coinsurance or a lower percentage has none of these extensions. Each extension has a small limit of its own, paid in addition to the main limit, except the portable storage unit extension, whose \$10,000 is part of the business personal property limit.

## Limits of insurance and deductible

The most the insurer pays for one occurrence is the limit shown for each item ([[BPP Limits of Insurance and Deductible]]). The deductible is subtracted from the loss, not from the limit, and it applies once per occurrence even when several items are damaged. The payment for one item is

> $$\text{Paid} = \min\big((L - D)^+,\ C\big)$$

- $L$ is the covered loss to the item, valued under the policy's valuation condition.
- $D$ is the deductible per occurrence.
- $C$ is the item's limit of insurance.

> [!example]- What does the insurer pay for this fire, and what if the building had been vacant for 75 days? {Example}
> A building is insured for \$600,000 under the BPP with a \$5,000 deductible, and the coinsurance requirement is met. A fire causes \$604,000 of covered damage.
>
> > [!answer]-
> > - The deductible comes off the loss, and the result is then capped at the limit.
> > - $\text{Paid} = \min(604{,}000 - 5{,}000,\ 600{,}000) = \$599{,}000$.
> > - Without a deductible the payment would have been capped at \$600,000, so the deductible costs the insured only \$1,000. Subtracting the deductible from the limit would have given \$595,000.
> > - After 75 days of vacancy, fire is not one of the perils the vacancy condition excludes, so the payment is reduced by 15%.
> > - $\text{Paid}_{\text{vacant}} = 0.85 \times 599{,}000 = \$509{,}150$.

## Loss conditions and additional conditions

The [[BPP Loss Conditions and Additional Conditions|loss conditions]] set the insured's duties after a loss, an appraisal process for disputes over the amount, the insurer's options to pay, repair or take the property, and the valuation rule, which is actual cash value unless the replacement cost option applies. Under the vacancy condition, once the building has been vacant for more than 60 consecutive days the insurer pays nothing for vandalism, sprinkler leakage, glass breakage, water damage or theft, and reduces payment for other losses by 15%.

The additional conditions include coinsurance and mortgageholders. The coinsurance condition reduces payment when the limit is below the coinsurance percentage of the property's value at the time of loss, as [[Insurance to Value]] calculates. The mortgageholders condition pays a mortgage lender as its interest appears, and protects the lender's recovery even when the owner's claim is denied for the owner's own acts.

## Optional coverages

Of the [[BPP Optional Coverages|optional coverages]], agreed value suspends coinsurance for the agreed period. [[Replacement Cost|Replacement cost]] replaces actual cash value as the valuation basis, but pays more than actual cash value only once the property has been repaired or replaced. Inflation guard raises the building limit by a fixed annual percentage, pro rata through the year. The limit $t$ days into the policy year is

> $$C_t = C_0\left(1 + g \times \frac{t}{365}\right)$$

- $C_0$ is the limit at the start of the policy year.
- $g$ is the annual percentage increase shown in the declarations.

> [!example]- What is the limit on the date of loss, and what does the insurer pay before and after the building is rebuilt? {Example}
> A building is insured for \$1,200,000 with an 80% coinsurance clause, the replacement cost option, a 5% inflation guard and a \$10,000 deductible. A fire destroys it 219 days into the policy year. Its replacement cost is then \$1,260,000, and depreciation is 30%.
>
> > [!answer]-
> > - The limit on the date of loss is $C_{219} = 1{,}200{,}000(1 + 0.05 \times 219/365) = \$1{,}236{,}000$.
> > - The coinsurance requirement is $0.80 \times 1{,}260{,}000 = \$1{,}008{,}000$, which the limit exceeds, so there is no penalty.
> > - Until the building is rebuilt the insurer pays on an actual cash value basis. The actual cash value is $0.70 \times 1{,}260{,}000 = \$882{,}000$, so it pays $882{,}000 - 10{,}000 = \$872{,}000$.
> > - Once it is rebuilt the total is $\min(1{,}260{,}000 - 10{,}000,\ 1{,}236{,}000) = \$1{,}236{,}000$, so the holdback of \$364,000 is paid then.
> > - Without the inflation guard the total would have stopped at \$1,200,000, and the insured would have borne \$60,000 rather than \$24,000 of the cost to rebuild.

> [!trap] Subtracting the deductible from the limit
> The deductible is subtracted from the loss before the limit is applied. When the loss exceeds the limit by more than the deductible, the deductible has no effect, and subtracting it from the limit understates the payment.
