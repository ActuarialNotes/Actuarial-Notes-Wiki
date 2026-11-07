---
verification:
  status: stale
  confidence: null
  last_checked: 2026-10-31
  last_checked_by: agent:validate-v1
  content_hash: sha256:6f3bd2b756e6d7860406fdaeb5d11961ad043a00f11387cf66fb0521982aa44c
  sources:
    - "Fisher, McTaggart, Petker & Pettingell, Individual Risk Rating (CAS Study Note, v3 Oct 2019), Ch.2 p.21 (PDF p.26); Ch.3 §5.2 p.84-85 (PDF pp.89-90); Ch.4 p.95 (PDF p.100), sha256:3182cd5d8ebccc92be67a246e61a527acda5b304b823448d99f8a2546ca07b81 — https://www.casact.org/sites/default/files/2021-03/8_Fisher_et_al.pdf"
  open_findings: 0
  open_critical: 0
  log: .verify/Concepts/Retrospective Rating.md
---

![[Media/Figures/Retrospective_Rating.svg|340]]

**Retrospective Rating** adjusts a policy's premium *after* the period, based on the insured's own losses during that period, within a guaranteed minimum and maximum. Unlike [[Experience Rating|experience rating]], which uses past years to price the coming one, a retrospective plan charges the insured for its own current-year experience. Before the minimum and maximum, the retrospective premium is

> $$R = \left(\text{BP} + L \times \text{LCF}\right) \times \text{TM}$$

- $\text{BP}$ is the **basic premium**. It is expressed as a basic premium factor times standard premium.
- $L$ is the insured's reported losses, limited by any per-accident limit.
- $\text{LCF}$ is the **loss conversion factor**, which loads them for the ALAE not already in the losses plus ULAE.
- $\text{TM}$ is the **tax multiplier**, for premium taxes and related assessments.

$L \times \text{LCF}$ are the converted losses. The final retrospective premium is held between a minimum and a maximum:

> $$\text{Retro Premium} = \min\!\left(\max(R,\, R_{\min}),\, R_{\max}\right)$$

- $R_{\min}$ and $R_{\max}$ are the minimum and maximum retrospective premiums, each a negotiated ratio times standard premium.

The basic premium covers the insurer's non-LAE expenses, profit, and the **net insurance charge**, the cost of the maximum and minimum guarantees. The net insurance charge is the insurance charge for the maximum less the insurance savings for the minimum. The charge and savings come from a table of values, expressed as a percentage of expected unlimited losses. When the plan limits individual losses (a per-accident loss limitation), the insured pays for that limit too. Its cost is either built into the table of insurance charges or, in some plans, computed as a separate additional charge.

> [!example]- A workers compensation policy has a standard premium of $\$500{,}000$, a basic premium of $\$100{,}000$, a loss conversion factor of 1.10 and a tax multiplier of 1.03. The minimum retrospective premium is $\$300{,}000$ and the maximum $\$800{,}000$. Limited losses are $\$350{,}000$. What is the retrospective premium? {Example}
> - The converted losses are $350{,}000 \times 1.10 = \$385{,}000$.
> - Before the minimum and maximum, the premium is $(100{,}000 + 385{,}000) \times 1.03 = \$499{,}550$.
> - That lies between $\$300{,}000$ and $\$800{,}000$, so **the retrospective premium is $\$499{,}550$**.

## Risk transfer in a retrospective plan

The **maximum** protects the insured against a bad year, and the **minimum** protects the insurer against a good one. Together they define how much risk is actually transferred. A plan with a tight band is close to guaranteed cost, and a wide one close to self-insurance. Retrospective plans suit **large accounts** with credible volume, and they align incentives directly: every dollar of loss inside the band costs the insured $\text{LCF} \times \text{TM}$ dollars of premium. Conceptually a retrospective plan is close to self-insurance, except that its loss limits and its maximum and minimum leave some risk with the insurer.

> [!example]- On the same plan, what is the retrospective premium at limited losses of $\$100{,}000$ and $\$900{,}000$, and over what range of losses does the insured pay for its own losses? {Example}
> - At $\$100{,}000$, $R = (100{,}000 + 110{,}000) \times 1.03 = \$216{,}300$, which is raised to the $\$300{,}000$ minimum.
> - At $\$900{,}000$, $R = (100{,}000 + 990{,}000) \times 1.03 = \$1{,}122{,}700$, which is capped at the $\$800{,}000$ maximum, so the insurer absorbs $\$322{,}700$.
> - The premium reaches the minimum at losses of $(300{,}000/1.03 - 100{,}000)/1.10 = \$173{,}875$, and the maximum at $(800{,}000/1.03 - 100{,}000)/1.10 = \$615{,}181$.
> - Between those losses, each extra dollar of loss costs the insured $1.10 \times 1.03 = \$1.133$ of premium.
> - **Outside the band, an extra dollar of loss costs it nothing**: the insurer bears the losses above the maximum, and the insured gives up the benefit of results below the minimum.

## Retrospective development

A retrospective plan's premium is typically an initial premium at the start of the period, followed by adjustments after it as the claims experience becomes known. Incurred loss retro plans are typically first evaluated 6 months after policy expiration (18 months of development) and annually thereafter. Losses at 18 months are usually far below ultimate, so the insured typically receives a partial **refund** at the first adjustment, and then pays **additional premium** as losses develop upward. That creates [[Credit Risk|credit risk]] for the insurer.

To protect itself, the insurer can apply **loss development factors** to the losses in the retrospective formula, established when the plan is written. Under both the NCCI's and ISO's plans, the provision for IBNR is made through factors applied to standard premium and then multiplied by the loss conversion factor and the tax multiplier, for the first three adjustments (NCCI) or the first four (ISO). A development factor to ultimate $f$ takes reported limited losses $U/f$ to the ultimate limited loss $U$, so the future development it provides for is $U(1 - 1/f)$. Paid loss plans are typically not given development factors, since they are meant to mimic a large deductible's cash flows.

## The basic premium

Fisher et al. write the plan as $R = (B + cL) \times T$, with $B$ the basic premium, $c$ the loss conversion factor and $T$ the tax multiplier. As a share of guaranteed-cost premium, with $E$ the expected loss and $e$ the expense ratio underlying the guaranteed-cost premium, the basic premium is

> $$\text{BP} = e - (\text{LCF} - 1)E + \text{LCF}\,[\phi(r_{\max}) - \psi(r_{\min})]\,E$$

- $\phi(r_{\max})$ is the insurance charge at the entry ratio of the maximum, and $\psi(r_{\min})$ the insurance savings at the entry ratio of the minimum, read from [[Table M]].

The expense part of the basic premium is $e - (\text{LCF} - 1)E$, because the loss conversion factor already collects the expenses that vary with losses. The expense ratio $e$ reflects the premium discount, so in a retrospective plan the premium discount is implicit in the basic premium rather than a separate step. The basic premium also holds the expected per-occurrence excess losses when ratable losses are limited per occurrence, sometimes kept separate as an excess loss premium, as in the NCCI and ISO plans. The charges for per-occurrence and aggregate excess losses carry the loss conversion factor, because it is meant to apply to total losses.

Even with no stated minimum there is a minimum premium, because with $L = 0$ the formula gives $\text{BP} \times \text{TM}$. Then $R_{\min} = \text{BP} \times \text{TM}$, the minimum entry ratio is $r_{\min} = 0$, and $\psi(0) = 0$.

Raising the per-occurrence limit moves expected loss out of the per-occurrence excess charge and into the expected ratable losses and the aggregate excess charge, dollar for dollar in total. Capping each occurrence makes it less likely that ratable losses reach the maximum, so the two charges are not additive, and the aggregate charge is priced on limited losses ([[Table L]], Table M$_D$, or the NCCI's [[Insurance Charge Reflecting Loss Limitation (ICRLL)|ICRLL]] procedure). The areas are drawn in a [[Lee Diagram]]. Under a balanced plan the expected premium is the same whatever the retrospective policy provisions, although the actual premium still varies with actual losses.

## The balance equations

Given the maximum and minimum premiums, the entry ratios are solved from two equations, ignoring tax by dividing the premiums by $\text{TM}$. The first is

> $$r_{\max} - r_{\min} = \frac{R_{\max} - R_{\min}}{\text{LCF} \times E \times \text{TM}}$$

and the second is

> $$\phi(r_{\min}) - \phi(r_{\max}) = \frac{(e + E) - R_{\min}/\text{TM}}{\text{LCF} \times E}$$

They come from $R_{\max}/\text{TM} = \text{BP} + \text{LCF} \times r_{\max} E$ and $R_{\min}/\text{TM} = \text{BP} + \text{LCF} \times r_{\min} E$, with the basic premium above, which sets the expected premium equal to $e + E$. One searches the Table M column for the pair of entry ratios that satisfies both. With a per-occurrence limit, the expected limited loss replaces $E$ in both denominators, while $e + E$ keeps the total expected loss.

With no minimum, $r_{\min} = 0$, and the balance equation reduces to $\psi(r_{\max}) = \big(R_{\max}/\text{TM} - (e + E)\big)/(\text{LCF} \times E)$. Since $\psi(r) = \phi(r) + r - 1$, this fixes $\phi(r_{\max}) + r_{\max}$, and the entry ratio is found in the column of the risk's Expected Loss Group in the NCCI's Table M. The expected loss times the state and hazard group relativity selects the column only, and the entry ratios and charges are applied to the unadjusted $E$.

> [!trap] Pricing the maximum without the minimum
> The basic premium carries the net insurance charge, the charge for the maximum less the savings for the minimum. Leaving out the savings overcharges the insured, and leaving out the charge prices the plan as if the insurer bore nothing above the maximum.
