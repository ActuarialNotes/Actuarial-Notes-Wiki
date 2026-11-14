---
verification:
  status: unverified
  confidence: null
  last_checked: null
  last_checked_by: null
  content_hash: sha256:9bf0c2d13480dde905088baf94e0f9626d76c8c9e7b21022026660f45f416642
  sources: []
  open_findings: 0
  open_critical: 0
  log: .verify/Concepts/Compulsory Auto Insurance.md
---

**Compulsory Auto Insurance** is the legal requirement, in every Canadian province and territory, that a vehicle owner carry a legislated minimum package of automobile coverage before the vehicle may be registered or driven. The resulting compulsory auto product is defined by statute and regulation rather than by the insurer: the province sets what it covers, the benefit amounts and who may sue.

The compulsory product contains:

1. Third-party liability to a statutory minimum limit, $\$200{,}000$ in most provinces.
2. In the private-market provinces, [[Statutory Accident Benefits]] payable regardless of fault.
3. Depending on the province, [[Uninsured Automobile Coverage]] and [[Direct Compensation Property Damage]] (DCPD).

Collision and comprehensive coverage stay optional. Who sells the compulsory cover depends on the province:

| Province | Compulsory cover sold by |
| :--- | :--- |
| British Columbia, Saskatchewan, Manitoba | A government insurer ([[Public Auto Insurance]]) for the basic cover |
| Quebec | The public SAAQ scheme for bodily injury, and private insurers for the compulsory $\$50{,}000$ civil liability cover |
| The other provinces | Private insurers |

> [!example]- Which coverages respond to this Ontario collision, and what changes if the at-fault driver had no insurance? {Example}
> Driver A is stopped at a light when Driver B rear-ends her. Under the [[Fault Determination Rules]] B is $100\%$ at fault. A's car needs $\$8{,}000$ of repairs, and A has a soft-tissue neck injury. A's policy includes DCPD.
>
> > [!answer]-
> > - A's own insurer pays for the car under DCPD, to the extent A was not at fault, here in full. A does not claim against B's insurer, which is what DCPD replaced.
> > - A's own insurer pays medical and rehabilitation benefits under the accident benefits, regardless of fault. A soft-tissue injury falls within the [[Minor Injury Guideline]], so treatment follows its protocol and cap.
> > - A may sue B for pain and suffering only if the injury meets the [[Tort Threshold and Deductible|tort threshold]], and any award is reduced by the statutory deductible. A soft-tissue injury rarely qualifies.
> > - If B is uninsured, DCPD does not respond, because it applies only where the other vehicle is insured. The car is paid under the uninsured automobile coverage, or A's collision coverage if bought.
> > - The accident benefits are unaffected, because they never depended on B.
> > - The compulsory product routes nearly every small claim to the victim's own insurer, and tort survives only for serious injury.

## Changes to the product in Ontario and Alberta

Under Ontario's [[Automobile Insurance Reform|reforms]], since January 2024 a driver may opt out of DCPD. From July 1, 2026 only the medical, rehabilitation and attendant care accident benefits remain mandatory in Ontario. Income replacement, non-earner, caregiver, housekeeping, death and funeral benefits became optional. Alberta's *Automobile Insurance Act* (2025) moves the province to a [[No-Fault Insurance|no-fault]] "Care-First" injury system, still sold by private insurers, from January 1, 2027.

## Compulsory insurance and the regulatory structure

A requirement to buy works only if someone must sell, at a price the public will accept. So the province imposes the [[Take-All-Comers Rule]], controls price through [[Rate Regulation|prior approval of rates]] and [[Risk Classification Restrictions]], and needs a [[Residual Market]] for the risks that price will not support: the [[Facility Association]] and [[Risk Sharing Pool|risk sharing pools]], or Quebec's [[Plan de Répartition des Risques]].

## Product design as cost control

Because the product's contents are statutory, the province controls cost by redesigning the product: a [[Tort Threshold and Deductible|threshold and deductible]] on tort, the [[Minor Injury Guideline]], the [[Catastrophic Impairment]] definition and the [[Fault Determination Rules]]. Each change is a pricing and reserving event, because it applies to accidents after its effective date, while claims already incurred keep the old benefits.

## The statutory minimum limit

A minimum limit fixed in dollars loses value as claim costs trend upward. Serious claims then pierce it, and a victim of a driver who bought only the minimum relies on that driver's personal assets. Most owners buy far higher limits, priced with [[Increased Limits|increased limits factors]].

> [!example]- What is this minimum limit worth in the claim costs of the year it was set? {Example}
> A province's compulsory liability minimum of $\$200{,}000$ has not changed in $25$ years, while bodily injury severity has trended at $5\%$ a year.
>
> > [!answer]-
> > - The trend factor over $25$ years is $1.05^{25} = 3.386$.
> > - The limit's value in the claim costs of the year it was set is $\$200{,}000 / 3.386 = \$59{,}061$.
> > - The minimum now buys less than a third of the protection it bought when it was set.

> [!trap] Applying an unlimited loss trend to basic-limits losses
> A fixed dollar limit caps severity, so basic-limits losses trend more slowly than total-limits losses. Applying an unlimited [[Loss Trend|loss trend]] to basic-limits data overstates the indication.
