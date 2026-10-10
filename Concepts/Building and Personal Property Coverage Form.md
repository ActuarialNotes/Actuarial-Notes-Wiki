---
verification:
  status: unverified
  confidence: null
  last_checked: null
  last_checked_by: null
  content_hash: sha256:835cca9626081984bb8ad73e418fcf3fe232cf58ea76e9e5b3a7ad795b0ee3e9
  sources: []
  open_findings: 0
  open_critical: 0
  log: .verify/Concepts/Building and Personal Property Coverage Form.md
---

**The Building and Personal Property Coverage Form** (BPP) is the ISO coverage form at the centre of [[Commercial Property Insurance|commercial property insurance]]. It covers direct physical loss to the insured's buildings, its business personal property and personal property of others in its care, at the premises described in the declarations, from the perils of the attached [[Causes of Loss|causes-of-loss]] form. It sets out what property is covered, the additional coverages and extensions, the limits and [[Deductible|deductible]], the loss conditions, the additional conditions and the optional coverages.

> $$\text{Paid} = \min\big((L - D)^+,\ C\big)$$

> $$C_t = C_0\left(1 + g \times \frac{t}{365}\right)$$

> $$\text{Debris}_{\max} = 0.25\,(\text{Paid} + D)$$

- **Symbols:** $L$ is the covered loss to one item of property, valued under the policy's valuation condition, $D$ is the deductible per occurrence and $C$ is the item's limit of insurance. Under the inflation guard option, $C_0$ is the limit at the start of the policy year, $g$ is the annual percentage increase shown in the declarations and $t$ is the number of days since the start of the policy year. $\text{Debris}_{\max}$ is the most the debris removal additional coverage pays out of the limit.
- **Covered property:** Building coverage includes the building, completed additions, fixtures, permanently installed machinery and equipment, and personal property used to maintain or service the building. Business personal property is property the insured owns and uses in its business, in or on the building or in the open within 100 feet, including furniture, machinery, stock and the insured's improvements and betterments as a tenant. Personal property of others in the insured's care, custody or control is a third category, insured for the owner's account.
- **Property not covered:** The form lists property it does not cover, mostly because another policy insures it better. Examples are money and securities, which go to crime insurance, land and growing crops, vehicles, property while airborne or waterborne, foundations below the lowest basement floor, underground pipes, and property more specifically insured elsewhere.
- **Additional coverages:** These pay costs that follow a covered loss, including debris removal, preservation of property moved to protect it, fire department service charges, pollutant cleanup on the premises, the increased cost of construction to meet building codes, and restoring electronic data. Some are paid within the limit and others in addition to it, each with its own sublimit.
- **Coverage extensions:** When the coinsurance percentage is at least 80%, or a value reporting period is shown, the insured can extend coverage to newly acquired or constructed property, personal effects and property of others, valuable papers, property temporarily off the premises, outdoor property such as fences and trees, non-owned detached trailers, and business personal property in portable storage units. Each extension has a small limit of its own, paid in addition to the main limit, except the portable storage unit extension, whose \$10,000 is part of the business personal property limit.
- **Limits and deductible:** The most the insurer pays for one occurrence is the limit shown for each item. The deductible is subtracted from the loss, not from the limit, and it applies once per occurrence even when several items are damaged.
- **Loss conditions:** These set the insured's duties after a loss, an appraisal process for disputes over the amount, the insurer's options to pay, repair or take the property, and the valuation rule, which is actual cash value unless the replacement cost option applies. Under the vacancy condition, once the building has been vacant for more than 60 consecutive days the insurer pays nothing for vandalism, sprinkler leakage, glass breakage, water damage or theft, and reduces payment for other losses by 15%.
- **Additional conditions:** The coinsurance condition reduces payment when the limit is below the coinsurance percentage of the property's value at the time of loss (see [[Insurance to Value]]). The mortgageholders condition pays a mortgage lender as its interest appears, and protects the lender's recovery even when the owner's claim is denied for the owner's own acts.
- **Optional coverages:** Agreed value suspends coinsurance for the agreed period. Inflation guard raises the building limit by a fixed annual percentage, pro rata through the year. [[Replacement Cost|Replacement cost]] replaces actual cash value as the valuation basis, but pays more than actual cash value only once the property has been repaired or replaced.
- **Each part in depth:** [[BPP Covered Property]], [[BPP Additional Coverages and Coverage Extensions]], the [[Causes of Loss Basic and Broad Forms|basic and broad]] and [[Causes of Loss Special Form|special]] causes of loss forms, [[BPP Limits of Insurance and Deductible]], [[BPP Loss Conditions and Additional Conditions]], [[BPP Optional Coverages]], and the [[Commercial Property Conditions]] that apply to the whole coverage part.

> [!example]- A Deductible on a Loss Above the Limit {Example}
> A building is insured for \$600,000 under the BPP with a \$5,000 deductible, and the coinsurance requirement is met. A fire causes \$604,000 of covered damage. Find the payment. Then suppose instead the building had been vacant for 75 consecutive days at the time of the fire.
>
> > [!answer]-
> > The deductible comes off the loss, and the result is then capped at the limit.
> > $$
> > \begin{align*}
> > \text{Paid} &= \min(604{,}000 - 5{,}000,\ 600{,}000) \\
> > &= \min(599{,}000,\ 600{,}000) \\
> > &= 599{,}000
> > \end{align*}
> > $$
> > Without a deductible the payment would have been capped at \$600,000, so the deductible costs the insured only \$1,000. Subtracting the deductible from the limit would have given \$595,000. If the building had been vacant for more than 60 days, fire is not one of the perils the vacancy condition excludes, so the payment is reduced by 15%.
> > $$
> > \begin{align*}
> > \text{Paid}_{\text{vacant}} &= 0.85 \times 599{,}000 \\
> > &= 509{,}150
> > \end{align*}
> > $$

> [!example]- Inflation Guard and a Replacement Cost Holdback {Example}
> A building is insured for \$1,200,000 with an 80% coinsurance clause, the replacement cost option, a 5% inflation guard and a \$10,000 deductible. A fire destroys it 219 days into the policy year. Its replacement cost is then \$1,260,000, and depreciation is 30%. Find the limit on the date of loss, what the insurer pays before the building is rebuilt, and what it pays once it is.
>
> > [!answer]-
> > $$
> > \begin{align*}
> > C_{219} &= 1{,}200{,}000\left(1 + 0.05 \times \frac{219}{365}\right) \\
> > &= 1{,}236{,}000 \\
> > 0.80 \times 1{,}260{,}000 &= 1{,}008{,}000
> > \end{align*}
> > $$
> > The limit exceeds the coinsurance requirement, so there is no penalty. Until the building is rebuilt the insurer pays on an actual cash value basis.
> > $$
> > \begin{align*}
> > \text{ACV} &= 0.70 \times 1{,}260{,}000 \\
> > &= 882{,}000 \\
> > \text{Paid}_{\text{now}} &= 882{,}000 - 10{,}000 \\
> > &= 872{,}000 \\
> > \text{Paid}_{\text{total}} &= \min(1{,}260{,}000 - 10{,}000,\ 1{,}236{,}000) \\
> > &= 1{,}236{,}000
> > \end{align*}
> > $$
> > The holdback of \$364,000 is paid once the building has been rebuilt. Without the inflation guard the total would have stopped at \$1,200,000, and the insured would have borne \$60,000 rather than \$24,000 of the cost to rebuild.

> [!tip]- How it appears on the exam
> - **DISC-IA:** Questions give a loss and ask whether the damaged items are covered property, property not covered, or covered only under an additional coverage or extension. Applied questions then calculate the payment from the limits and deductible, and apply a loss condition (valuation, vacancy, appraisal) or an additional condition (coinsurance, mortgageholders). Optional coverage questions ask how agreed value, inflation guard or replacement cost changes the payment. The full walk from covered property to amount paid is a [[Coverage Analysis|coverage analysis]].
> - **Linked pages:** The coinsurance calculation itself is on [[Insurance to Value]], and replacement cost against actual cash value is on [[Replacement Cost]].

> [!warning]- Exam traps
> - **Deductible against the loss:** The deductible is subtracted from the loss before the limit is applied. When the loss exceeds the limit by more than the deductible, the deductible has no effect, and subtracting it from the limit understates the payment.
> - **Extensions need coinsurance:** The coverage extensions apply only when the declarations show a coinsurance percentage of at least 80% or a value reporting period. A policy written with no coinsurance or a lower percentage has none of them.
> - **Vacancy is two rules:** After more than 60 days of vacancy, a few perils are not covered at all and every other covered loss is reduced by 15%. Applying the 15% reduction to a theft loss, or denying a fire loss, mixes the two up.
> - **Replacement cost is paid on rebuilding:** The replacement cost option pays more than actual cash value only after the property is repaired or replaced. An insured who has not yet rebuilt receives the actual cash value amount first.
