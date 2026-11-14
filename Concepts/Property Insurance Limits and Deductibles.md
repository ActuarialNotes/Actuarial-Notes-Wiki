---
verification:
  status: stale
  confidence: null
  last_checked: 2026-10-10
  last_checked_by: agent:validate-v1
  content_hash: sha256:4e01a7eb72319850d58ab76c132741fedb81b83188d9250c0312d928d50bf4d7
  sources:
    - "ISO CP 00 10 10 12, Building and Personal Property Coverage Form, C, D with Examples 1-2, F.1.b with Example 3, G.2 (pp.9-10, 14-15), sha256:b46b0929e7effc6cfcfde0493f5a363dc32053b3afd56632776432f596a1e106 — https://www.propertyinsurancecoveragelaw.com/wp-content/uploads/2017/05/CP00101012-1.pdf"
    - "ISO HO 00 03 05 11, Homeowners 3 – Special Form (Maine Bureau of Insurance copy), Section I Condition B (p.13), sha256:ac539e500a5767946452d1e6ad4c4b7dcc395c6c65c48fc3a8ac92a7c330a1d4 — https://www.maine.gov/pfr/insurance/sites/maine.gov.pfr.insurance/files/inline-files/ho00-03-05-11-homeowners3-special-form.pdf"
    - "ISO CP 00 30 04 02, Business Income (and Extra Expense) Coverage Form, Section F 'period of restoration' 3.a, sha256:d59821e8f40529ea18efd2ba10a26de2d12cc6c4fb49c68aefb4ef027ae2adfa — https://www.propertyinsurancecoveragelaw.com/wp-content/uploads/2023/12/CP-00-30-04-02-Business-Income-And-Extra-Expense-Coverage-Form.pdf"
    - "Insurance Information Institute, 'Background on: Hurricane and windstorm deductibles' (fetched 2026-10-10), sha256:ecec57ab215f3b39db8e058e8d5b1ad756bc8122ca381fa5191ac89655245b7c — https://www.iii.org/article/background-on-hurricane-and-windstorm-deductibles"
    - "IRMI Insurance Glossary, 'blanket limit' (fetched 2026-10-10), sha256:10e936de05e54dee3eff832fb3c8d6582234245f2d79ea9e0b96eabbb227d04d — https://www.irmi.com/term/insurance-definitions/blanket-limit"
    - "IRMI Insurance Glossary, 'schedule' (fetched 2026-10-10), sha256:1476b885c04ea1dd47c2c94e7d336e6255dcb183f602280bf70ac907e691b57c — https://www.irmi.com/term/insurance-definitions/schedule"
    - "IRMI Insurance Glossary, 'sublimit' (fetched 2026-10-10), sha256:2ace12ec3200b909032cea6e33b019720321e96bc15899d9a1e63b6e3c4d1a4c — https://www.irmi.com/term/insurance-definitions/sublimit"
    - "IRMI Insurance Glossary, 'margin clause' (fetched 2026-10-10), sha256:6c64d369833da5734c72797b5e5e8d857bc193011e708edd4d85da3cd98a806d — https://www.irmi.com/term/insurance-definitions/margin-clause"
    - "IRMI Insurance Glossary, 'aggregate deductible' (fetched 2026-10-10), sha256:c4f3577bed73877f73ac0a44887f24e297649abb4e379b3052bc0c30ebf0dd36 — https://www.irmi.com/term/insurance-definitions/aggregate-deductible"
    - "IRMI Insurance Glossary, 'franchise deductible' (fetched 2026-10-10), sha256:05a29aef8daf770696dd123bc6dbb5bc1622db43d10b995383537136da47bd57 — https://www.irmi.com/term/insurance-definitions/franchise-deductible"
    - "IRMI Insurance Glossary, 'disappearing deductible' (fetched 2026-10-10), sha256:d318c5b3c31c516b27d9d86847c722c6209638fab9b271c0dfbb81dccdbd384d — https://www.irmi.com/term/insurance-definitions/disappearing-deductible"
  open_findings: 0
  open_critical: 0
  log: .verify/Concepts/Property Insurance Limits and Deductibles.md
---

**Property Insurance Limits and Deductibles** are the provisions that cap what a property policy pays and set the part of each loss the insured keeps. The loss-model mathematics of these modifications is on [[Coverage Modifications]], [[Policy Limit]] and [[Deductible]]. This page is how the policy forms apply them.

The kinds of each are:

1. **Limits:** a **specific** limit on one item, a **blanket** limit over several items or locations, a **scheduled** limit item by item, or a **sublimit** inside a larger limit.
2. **Deductibles:** a **flat** dollar amount, a **percentage** of the insured value, applied **per occurrence** or capped in the **aggregate**, or, in time element coverage, a **waiting period**.

## Payment under the BPP

Under the BPP the most the insurer pays for loss in any one occurrence is the applicable limit of insurance shown in the declarations. The BPP first reduces the loss for any coinsurance penalty, then subtracts the deductible, and pays the result or the limit, whichever is less. Under the ISO Building and Personal Property Coverage Form (CP 00 10 10 12), the payment for a loss $L$ in one occurrence, on the policy's valuation basis, is

> $$\text{Payment} = \min\big(\max(R \times L - D,\ 0),\ C\big)$$

- $R$ is the coinsurance ratio ($R = 1$ when the limit meets the coinsurance requirement, see [[Coinsurance]]).
- $D$ is the deductible.
- $C$ is the limit of insurance.

When one occurrence damages several items with separate limits, the losses are not combined to apply the deductible, but the deductible is applied only once per occurrence. Each item's payment is held to its own limit. Some additional coverages carry their own amounts, separate from the limit: the fire department service charge, pollutant clean-up and removal, increased cost of construction and electronic data. Paying to preserve property, by contrast, does not increase the limit. The BPP's inflation guard option raises the limit automatically by an annual percentage, pro rata by the days since the policy year began.

The ISO homeowners form (HO 00 03 05 11) pays only the part of the total loss that exceeds the deductible, and if two or more deductibles apply to a loss, only the highest is used.

> [!example]- What does the insurer pay for this fire at two buildings? {Example}
> A BPP policy insures Building A for \$500,000 and Building B for \$200,000, with a \$5,000 deductible and no coinsurance penalty. One fire causes \$300,000 of damage to A and \$260,000 to B.
>
> > [!answer]-
> > - The deductible is applied once per occurrence, and the losses are not combined. It comes off the loss to A.
> > - The payment for A is $\min(300{,}000 - 5{,}000,\ 500{,}000) = \$295{,}000$.
> > - The payment for B is $\min(260{,}000,\ 200{,}000) = \$200{,}000$, with no second deductible.
> > - The insurer pays $295{,}000 + 200{,}000 = \$495{,}000$.
> > - The insured bears \$5,000 on A and \$60,000 above B's limit. B's separate limit cannot borrow from A's unused \$205,000, which a blanket limit would allow.

## Specific, scheduled and blanket limits

A specific limit applies to one type of property at one location, and a schedule lists the insured's locations or items, each with its own amount. A blanket limit is a single limit over more than one location, more than one category of property, or both, so a large loss at one location can draw on the whole amount ([[Blanket Insurance]]). When one limit applies to several items, the BPP's coinsurance condition applies to the total value of all the property it covers. A nonstandard margin clause caps recovery at a location to a percentage of the values reported for it, such as 110% or 125%, which in effect turns a blanket limit back into per-location limits.

> [!example]- Which pays more for this fire, the blanket limit or the specific limits? {Example}
> A business has a building at Location 1 worth \$75,000, a building at Location 2 worth \$100,000 and personal property at Location 2 worth \$75,000. It can insure them under one blanket limit of \$225,000, or under specific limits of \$67,500, \$90,000 and \$67,500. Each option meets a 90% coinsurance requirement, and the deductible is \$1,000. Fire destroys the Location 2 building.
>
> > [!answer]-
> > - Under the blanket limit, coinsurance is tested on the total value covered. 90% of \$250,000 is \$225,000, which the limit meets, so $R = 1$.
> > - The blanket payment is $\min(100{,}000 - 1{,}000,\ 225{,}000) = \$99{,}000$.
> > - The specific limit on the building is 90% of its value, enough to meet coinsurance but not to pay a total loss.
> > - The specific payment is $\min(100{,}000 - 1{,}000,\ 90{,}000) = \$90{,}000$.
> > - The blanket limit lets the whole \$225,000 respond at one location, so the insured recovers \$9,000 more.

## Sublimits

A sublimit caps the amount available for a specific type of loss and is part of, not in addition to, the limit that would otherwise apply. A commercial property policy with a \$2 million limit might, for example, carry a \$100,000 sublimit for flood. The BPP's own example is outdoor signs, covered for no more than \$2,500 per sign in any one occurrence.

## Percentage deductibles

In hurricane-exposed states, insurers sell homeowners policies with a deductible for hurricane or windstorm damage set as a percentage of the home's insured value, typically 1% to 5%, in place of the dollar deductible used for perils such as fire and theft. A hurricane deductible applies only when its trigger, defined by the state and the insurer, is met, such as the National Weather Service naming a storm. The deductible and its trigger are on the declarations page. For a percentage $p$, the deductible is

> $$D = p \times \text{Insured value}$$

The insured bears the deductible, or the whole loss if it is smaller, and the insurer pays the rest.

> [!example]- A home insured for \$400,000 has a \$1,000 all-perils deductible and a 2% hurricane deductible. What is paid on a \$30,000 hurricane loss and on a \$30,000 fire loss? {Example}
> - The hurricane deductible is 2% of the \$400,000 insured value, or \$8,000.
> - The hurricane loss pays $30{,}000 - 8{,}000 = \$22{,}000$.
> - The fire loss takes the flat deductible and pays $30{,}000 - 1{,}000 = \$29{,}000$.

## Aggregate, franchise and disappearing deductibles

An aggregate deductible is the most the insured pays in deductibles over a period, typically a year, which protects an insured with many losses. With a per-occurrence deductible $d$ and an annual aggregate deductible $A$, the insured retains of the $k$-th loss of the year, $L_k$,

> $$\text{Retained}_k = \min\Big(L_k,\ d,\ A - \textstyle\sum_{j<k} \text{Retained}_j\Big)$$

The insurer pays each loss less the amount retained on it.

> [!example]- What does the insurer pay on each of these three losses? {Example}
> A business has a \$5,000 per-occurrence deductible with a \$12,000 annual aggregate deductible. It has three covered losses during the year, in this order: \$4,000, \$7,000 and \$12,000.
>
> > [!answer]-
> > - The insured keeps up to \$5,000 of each loss until its deductibles for the year total \$12,000.
> > - On the first loss it retains $\min(4{,}000,\ 5{,}000,\ 12{,}000) = \$4{,}000$.
> > - On the second it retains $\min(7{,}000,\ 5{,}000,\ 8{,}000) = \$5{,}000$.
> > - On the third it retains $\min(12{,}000,\ 5{,}000,\ 3{,}000) = \$3{,}000$.
> > - The insurer pays \$0, \$2,000 and \$9,000, a total of \$11,000. Without the aggregate the third loss would have paid \$7,000.

A franchise deductible is a minimum loss that must be reached, after which the whole loss is paid, subject to the limit. A disappearing deductible shrinks as the loss grows and vanishes at a set amount. Such deductibles were once common in property policies.

## Waiting periods

Time element coverage applies a deductible in time rather than dollars. Under ISO's business income form (CP 00 30 04 02), the period of restoration begins 72 hours after the direct physical loss for business income, but immediately for extra expense, so income lost in the first 72 hours is not paid ([[Business Income Coverage]]).

> [!trap] Subtracting the deductible before coinsurance
> The BPP applies the coinsurance ratio to the full loss and then subtracts the deductible. With $R = 0.8$, a \$100,000 loss and a \$1,000 deductible, the payment is $80{,}000 - 1{,}000 = \$79{,}000$, not $0.8 \times 99{,}000 = \$79{,}200$.
