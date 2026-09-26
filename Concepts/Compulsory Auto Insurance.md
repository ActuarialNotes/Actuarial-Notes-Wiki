---
verification:
  status: unverified
  confidence: null
  last_checked: null
  last_checked_by: null
  content_hash: sha256:8bff00f57dab5077d6c40c0354b4b042e7a79fea7ce5f727f6576cee8dccbcab
  sources: []
  open_findings: 0
  open_critical: 0
  log: .verify/Concepts/Compulsory Auto Insurance.md
---

**Compulsory Auto Insurance** is the legal requirement, in every Canadian province and territory, that a vehicle owner carry a legislated minimum package of automobile coverage before the vehicle may be registered or driven. The resulting "compulsory auto product" is defined by statute and regulation rather than by the insurer — what it covers, the benefit amounts and who may sue are all set by the province.

> $$\text{Obligation to buy} \;\Rightarrow\; \text{Obligation to sell}$$

- **What is compulsory.** Every province requires third-party liability to a statutory minimum limit — $\$200{,}000$ in most provinces. In the private-market provinces the policy also carries [[Statutory Accident Benefits]] payable regardless of fault and, depending on the province, [[Uninsured Automobile Coverage]] and [[Direct Compensation Property Damage]]. Collision and comprehensive stay optional. British Columbia, Saskatchewan and Manitoba sell the basic compulsory cover through a government insurer ([[Public Auto Insurance]]); in Quebec bodily injury is covered by the public SAAQ scheme, leaving private insurers the compulsory $\$50{,}000$ civil liability cover.
- **The product keeps changing — Ontario and Alberta.** Since January 2024 an Ontario driver may opt out of DCPD, and from July 1, 2026 only the medical, rehabilitation and attendant care accident benefits remain mandatory; income replacement, non-earner, caregiver, housekeeping, death and funeral benefits became optional. Alberta's *Automobile Insurance Act* (2025) moves the province to a no-fault "Care-First" injury system, still sold by private insurers, from January 1, 2027. See [[Automobile Insurance Reform]] and [[No-Fault Insurance]].
- **Why compulsion drives the rest of the regulatory structure.** A mandate to buy is meaningless unless someone must sell, at a price the public will accept. So the province imposes the [[Take-All-Comers Rule]], takes control of price through [[Rate Regulation|prior approval of rates]] and [[Risk Classification Restrictions]], and needs a [[Residual Market]] — the [[Facility Association]] and [[Risk Sharing Pool|risk sharing pools]], or Quebec's [[Plan de Répartition des Risques]] — for the risks that price will not support.
- **The product is the cost lever.** Because its contents are statutory, cost control happens by redesigning the product: a [[Tort Threshold and Deductible|threshold and deductible]] on tort, the [[Minor Injury Guideline]], the [[Catastrophic Impairment]] definition, the [[Fault Determination Rules]]. Each change is a pricing and reserving event, because it applies to accidents after its effective date while the claims already incurred keep the old benefits.

> [!example]- Which Coverage Responds? {Example}
> In Ontario, Driver A is stopped at a light when Driver B rear-ends her; under the Fault Determination Rules B is $100\%$ at fault. A's car needs $\$8{,}000$ of repairs and A has a soft-tissue neck injury. A's policy includes DCPD. Which coverages respond — and what changes if B had no insurance?
>
> > [!answer]-
> > **B insured.**
> >
> > 1. *Vehicle damage* — **A's own insurer** pays under DCPD, to the extent A was not at fault (here in full). A does not claim against B's insurer; that is what DCPD replaced.
> > 2. *Injury* — **A's own insurer** pays medical and rehabilitation benefits under the SABs, regardless of fault. A soft-tissue injury falls within the Minor Injury Guideline, so treatment follows its protocol and cap.
> > 3. *Pain and suffering* — A may sue B only if the injury meets the tort threshold, and any award is reduced by the statutory deductible. A soft-tissue injury will rarely qualify, so in practice there is no tort recovery.
> >
> > **B uninsured.** DCPD responds only where the other vehicle is insured, so the car is paid under the uninsured automobile coverage (or A's collision coverage, if bought). The SABs are unaffected — they never depended on B.
> >
> > The pattern: the compulsory product routes nearly every small claim to the victim's **own** insurer, and tort survives only for serious injury.

> [!example]- A Statutory Minimum Limit That Is Never Indexed {Example}
> A province's compulsory liability minimum of $\$200{,}000$ has not changed in $25$ years, while bodily injury severity has trended at $5\%$ a year. What is the minimum worth in the claim-cost terms of the year it was set, and what follows for pricing?
>
> > [!answer]-
> > $$
> > \begin{align*}
> > \text{Trend factor} &= 1.05^{25} \\
> > &= 3.386 \\[4pt]
> > \text{Real value of limit} &= \frac{\$200{,}000}{3.386} \\
> > &= \$59{,}060
> > \end{align*}
> > $$
> >
> > The minimum now buys less than a third of the protection it bought when it was set. Three consequences follow:
> >
> > - More serious claims pierce the minimum, so a victim of a driver who bought only the minimum relies on that driver's personal assets — the gap compulsory insurance was meant to close.
> > - Most owners voluntarily buy far higher limits, which are priced with [[Increased Limits|increased limits factors]]; the compulsory layer is an ever-smaller share of what is actually sold.
> > - A fixed dollar limit caps severity, so basic-limits losses trend **more slowly** than total-limits losses. Applying an unlimited [[Loss Trend|loss trend]] to basic-limits data overstates the indication.
