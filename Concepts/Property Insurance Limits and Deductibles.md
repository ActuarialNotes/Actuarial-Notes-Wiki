**Property Insurance Limits and Deductibles** are the provisions that cap what a property policy pays and set the part of each loss the insured keeps. A limit can be **specific** to one item, **blanket** over several items or locations, **scheduled** item by item, or a **sublimit** inside a larger limit. A deductible can be a **flat** dollar amount, a **percentage** of the insured value, applied **per occurrence** or capped in the **aggregate**, or, in time element coverage, a **waiting period**. The loss-model mathematics of these modifications is on [[Coverage Modifications]], [[Policy Limit]] and [[Deductible]]; this page is how the policy forms apply them.

> $$\text{Payment} = \min\big(\max(R \times L - D,\ 0),\ C\big)$$

> $$D = p \times \text{Insured value}$$

> $$\text{Retained}_k = \min\Big(L_k,\ d,\ A - \textstyle\sum_{j<k} \text{Retained}_j\Big)$$

- **Symbols:** In the first block, the order of the ISO Building and Personal Property Coverage Form (CP 00 10 10 12), $L$ is the loss in one occurrence on the policy's valuation basis, $R$ is the coinsurance ratio ($R = 1$ when the limit meets the coinsurance requirement, see [[Coinsurance]]), $D$ is the deductible and $C$ the limit of insurance. In the second, $p$ is a percentage deductible such as 2%. In the third, $d$ is a per-occurrence deductible, $A$ an annual aggregate deductible and $L_k$ the $k$-th loss of the year.
- **Per-occurrence limits:** Under the BPP the most the insurer pays for loss in any one occurrence is the applicable limit of insurance shown in the declarations. Some additional coverages carry their own amounts, separate from that limit: the fire department service charge, pollutant clean-up and removal, increased cost of construction and electronic data. Paying to preserve property, by contrast, does not increase the limit.
- **Specific, scheduled and blanket limits:** A specific limit applies to one type of property at one location, and a schedule lists the insured's locations or items, each with its own amount. A blanket limit is a single limit over more than one location, more than one category of property, or both, so a large loss at one location can draw on the whole amount ([[Blanket Insurance]]). When one limit applies to several items, the BPP's coinsurance condition applies to the total value of all the property it covers. A nonstandard margin clause caps recovery at a location to a percentage of the values reported for it, such as 110% or 125%, which in effect turns a blanket limit back into per-location limits.
- **Sublimits:** A sublimit caps the amount available for a specific type of loss and is part of, not in addition to, the limit that would otherwise apply. A commercial property policy with a \$2 million limit might, for example, carry a \$100,000 sublimit for flood. The BPP's own example is outdoor signs, covered for no more than \$2,500 per sign in any one occurrence.
- **Limits that move:** The BPP's inflation guard option raises the limit automatically by an annual percentage, pro rata by the days since the policy year began, so the limit keeps up with rising values during the year.
- **Flat per-occurrence deductibles:** The BPP first reduces the loss for any coinsurance penalty, then subtracts the deductible, and pays the result or the limit, whichever is less. When one occurrence damages several items with separate limits, the losses are not combined to apply the deductible, but the deductible is applied only once per occurrence. The ISO homeowners form (HO 00 03 05 11) pays only the part of the total loss that exceeds the deductible, and if two or more deductibles apply to a loss, only the highest is used.
- **Percentage deductibles:** In hurricane-exposed states, insurers sell homeowners policies with a deductible for hurricane or windstorm damage set as a percentage of the home's insured value, typically 1% to 5%, in place of the dollar deductible used for perils such as fire and theft. A hurricane deductible applies only when its trigger, defined by the state and the insurer, is met, such as the National Weather Service naming a storm. The deductible and its trigger are on the declarations page.
- **Aggregate, franchise and disappearing deductibles:** An aggregate deductible is the most the insured pays in deductibles over a period, typically a year, which protects an insured with many losses. A franchise deductible is a minimum loss that must be reached, after which the whole loss is paid, subject to the limit. A disappearing deductible shrinks as the loss grows and vanishes at a set amount; such deductibles were once common in property policies.
- **Waiting periods:** Time element coverage applies a deductible in time rather than dollars. Under ISO's business income form (CP 00 30 04 02), the period of restoration begins 72 hours after the direct physical loss for business income, but immediately for extra expense, so income lost in the first 72 hours is not paid ([[Business Income Coverage]]).

> [!example]- One Fire, Two Buildings, One Deductible {Example}
> A BPP policy insures Building A for \$500,000 and Building B for \$200,000, with a \$5,000 deductible and no coinsurance penalty. One fire causes \$300,000 of damage to A and \$260,000 to B. What does the insurer pay?
>
> > [!answer]-
> > The deductible is applied once per occurrence, and the losses are not combined. It comes off the loss to A, whose loss is below its limit plus the deductible.
> > $$
> > \begin{align*}
> > \text{Pay}_A &= \min(300{,}000 - 5{,}000,\ 500{,}000) \\
> > &= 295{,}000 \\
> > \text{Pay}_B &= \min(260{,}000,\ 200{,}000) \\
> > &= 200{,}000 \\
> > \text{Total} &= 495{,}000
> > \end{align*}
> > $$
> > The deductible is not subtracted again for B, which is paid its full limit. The insured bears \$5,000 on A and \$60,000 above B's limit. B's separate limit cannot borrow from A's unused \$205,000, which a blanket limit would allow.

> [!example]- Blanket or Specific? {Example}
> A business has a building at Location 1 worth \$75,000, a building at Location 2 worth \$100,000 and personal property at Location 2 worth \$75,000. It can insure them under one blanket limit of \$225,000, or under specific limits of \$67,500, \$90,000 and \$67,500. Each option meets a 90% coinsurance requirement, and the deductible is \$1,000. Fire destroys the Location 2 building. Compare the payments.
>
> > [!answer]-
> > Under the blanket limit, coinsurance is tested on the total value covered, $0.90 \times 250{,}000 = 225{,}000$, which the limit meets, so $R = 1$.
> > $$
> > \begin{align*}
> > \text{Pay}_{\text{blanket}} &= \min(100{,}000 - 1{,}000,\ 225{,}000) \\
> > &= 99{,}000 \\
> > \text{Pay}_{\text{specific}} &= \min(100{,}000 - 1{,}000,\ 90{,}000) \\
> > &= 90{,}000
> > \end{align*}
> > $$
> > The specific limit equals 90% of the building's value, enough to meet coinsurance but not enough to pay a total loss. The blanket limit lets the whole \$225,000 respond at one location, so the insured recovers \$9,000 more. The blanket limit must itself meet coinsurance on the total value, or the penalty applies to every loss it covers.

> [!example]- A Hurricane Deductible and an Annual Aggregate {Example}
> (a) A home is insured for \$400,000, with a \$1,000 deductible for all perils and a 2% hurricane deductible. Find the payment on a \$30,000 hurricane loss and on a \$30,000 fire loss.
>
> (b) A business has a \$5,000 per-occurrence deductible with a \$12,000 annual aggregate deductible. It has three covered losses during the year, in this order: \$4,000, \$7,000 and \$12,000. What does the insurer pay on each?
>
> > [!answer]-
> > (a) The hurricane deductible is $0.02 \times 400{,}000 = 8{,}000$.
> > $$
> > \begin{align*}
> > \text{Pay}_{\text{hurricane}} &= 30{,}000 - 8{,}000 \\
> > &= 22{,}000 \\
> > \text{Pay}_{\text{fire}} &= 30{,}000 - 1{,}000 \\
> > &= 29{,}000
> > \end{align*}
> > $$
> > (b) The insured keeps up to \$5,000 of each loss until its deductibles for the year total \$12,000.
> > $$
> > \begin{align*}
> > \text{Retained}_1 &= \min(4{,}000,\ 5{,}000,\ 12{,}000) = 4{,}000 \\
> > \text{Retained}_2 &= \min(7{,}000,\ 5{,}000,\ 8{,}000) = 5{,}000 \\
> > \text{Retained}_3 &= \min(12{,}000,\ 5{,}000,\ 3{,}000) = 3{,}000
> > \end{align*}
> > $$
> > The insurer pays \$0, \$2,000 and \$9,000, a total of \$11,000. Without the aggregate the third loss would have paid \$7,000.

> [!tip]- How it appears on the exam
> - **DISC-IA:** The objective is applying property insurance limits and deductibles. Expect a loss, a limit or limits, a deductible and sometimes a coinsurance requirement, with a question asking what the insurer pays.
> - **Choosing a structure:** A question can compare blanket with specific limits, or a flat with a percentage deductible, and ask which leaves the insured with less uninsured loss for a given event.
> - **Linked objectives:** The coinsurance step is on [[Insurance to Value]] and [[Coinsurance]], and the BPP's own limits and deductible condition is on [[BPP Limits of Insurance and Deductible]].

> [!warning]- Exam traps
> - **Coinsurance before the deductible:** The BPP applies the coinsurance ratio to the full loss and then subtracts the deductible. Subtracting the deductible first gives a different payment.
> - **Once per occurrence:** One deductible applies to an occurrence that damages several separately limited items. Subtracting it from each item understates the payment.
> - **A sublimit adds nothing:** A sublimit is part of the overall limit, not extra coverage on top of it.
> - **Percentage of value, not of loss:** A 2% hurricane deductible on a \$400,000 home is \$8,000 whatever the size of the loss. Taking 2% of the loss understates it badly.
> - **Blanket limits still face coinsurance:** Under the BPP, coinsurance on a blanket limit is tested against the total value of all the property the limit covers.
