---
verification:
  status: stale
  confidence: null
  last_checked: 2026-10-10
  last_checked_by: agent:validate-v1
  content_hash: sha256:4b1dcde64119507ddb0328fcbdadce0008b1ae5bf1cf948233db76b5d48e7d61
  sources:
    - "IRMI glossary, 'margin clause' (rank 3), per location limitation of liability provision (delta re-check), sha256:6c64d369833da5734c72797b5e5e8d857bc193011e708edd4d85da3cd98a806d — https://www.irmi.com/term/insurance-definitions/margin-clause"
    - "ISO CP 00 10 10 12 Building and Personal Property Coverage Form (specimen), §F.1.b Example 3, A.4.e(6), G.1, sha256:b46b0929e7effc6cfcfde0493f5a363dc32053b3afd56632776432f596a1e106 — https://www.propertyinsurancecoveragelaw.com/wp-content/uploads/2017/05/CP00101012-1.pdf"
    - "ISO CP 16 15 07 88 Statement of Values (specimen, Big I), pp.1–3, Notes 5–8, sha256:e6597a69a240b732ec8575524a4c640d76d15af8e2fb0e72fc1e2d1401dc31e2 — https://www.independentagent.com/wp-content/uploads/2024/04/CP16150788.pdf"
    - "IRMI glossary, 'blanket limit' (rank 3), definition, sha256:10e936de05e54dee3eff832fb3c8d6582234245f2d79ea9e0b96eabbb227d04d — https://www.irmi.com/term/insurance-definitions/blanket-limit"
    - "IRMI glossary, 'margin clause' (rank 3), definition, sha256:6c64d369833da5734c72797b5e5e8d857bc193011e708edd4d85da3cd98a806d — https://www.irmi.com/term/insurance-definitions/margin-clause"
    - "Big \"I\" Virtual University, Mike Edwards, 'Margin Clauses and Blanket Insurance' (2013; rank 3), Response, sha256:5a05d40fb33c46a533c031bf0ad1af312a83ab3b5a47beb50bad1b2632cb91ad — https://www.independentagent.com/vu_resource/margin-clauses-and-blanket-insurance/"
  open_findings: 0
  open_critical: 0
  log: .verify/Concepts/Blanket Insurance.md
---

**Blanket Insurance** is property insurance in which one limit covers several locations, several classes of property, or both, such as all the buildings and business personal property at four stores under one $\$10{,}000{,}000$ limit. Specific insurance is the alternative: each building, location or class of property has its own limit, and a loss at one location can draw only on that location's limit.

Blanket coverage lets one loss use the whole limit, so it protects an insured whose values shift between locations or are hard to allocate in advance. It suits an insured that moves inventory among warehouses, whose values swing by season, or whose property at many small sites would each need a separate limit. A specific limit can be too low at the moment of loss even if the total insurance is adequate.

The blanket limit is the most paid in any one occurrence across all the locations it covers. An event that damages several locations at once, such as a windstorm, shares that one limit among them rather than drawing a full limit at each.

## Coinsurance on a blanket limit

The coinsurance condition compares the blanket limit with the coinsurance percentage times the total value of all the property the limit covers, not with the value at the location of the loss. The coinsurance factor is

> $$R = \min\left(\frac{C_B}{p \sum_k V_k},\ 1\right)$$

- $C_B$ is the blanket limit.
- $p$ is the coinsurance percentage.
- $V_k$ is the value of the property at location $k$ at the time of the loss.

and the payment for a loss at location $j$ is

> $$\text{Pay}_j = \min\big(R\,L_j - D,\ C_B,\ m\,S_j\big)$$

- $L_j$ is the loss at location $j$, and $D$ is the deductible.
- $S_j$ is the value the insured reported for location $j$ on its statement of values.
- $m$ is the margin clause percentage, such as 110%. Without a margin clause the third term is dropped.

Because one location can use the whole limit, insurers usually require a higher coinsurance percentage for blanket coverage, commonly 90% or more, which is an [[Insurance to Value|insurance to value]] safeguard. A blanket limit does not remove the coinsurance condition. The [[BPP Optional Coverages|agreed value optional coverage]] suspends the coinsurance condition for the property it applies to until its expiration date, and pays no more than the proportion the limit bears to the agreed value shown in the declarations.

The coinsurance condition in ISO CP 00 10 10 12 states that when one limit applies to two or more separate items, the condition applies to the total of all the property the limit covers. The form's own example tests a single $\$180{,}000$ limit on two buildings and their contents against 90% of their combined $\$250{,}000$ value.

> [!example]- What does this fire at location C pay under specific limits, under the blanket limit, and under the blanket limit with a 110% margin clause? {Example}
> A distributor's statement of values shows $\$2{,}000{,}000$ at location A, $\$1{,}500{,}000$ at B and $\$500{,}000$ at C. Under specific insurance it would buy limits of 90% of each value, each with a 90% coinsurance clause. The blanket alternative is one $\$3{,}600{,}000$ limit with 90% coinsurance. On the day of a fire at C, after inventory has moved, the values are:
>
> | Location | Reported value ($) | Specific limit ($) | Value at loss ($) |
> | :--- | ---: | ---: | ---: |
> | A | 2,000,000 | 1,800,000 | 1,400,000 |
> | B | 1,500,000 | 1,350,000 | 1,500,000 |
> | C | 500,000 | 450,000 | 1,100,000 |
>
> The fire causes an $\$800{,}000$ loss at C, and the deductible is $\$10{,}000$.
>
> > [!answer]-
> > - Under specific insurance, C's limit is tested against 90% of C's value on the day of the loss: $R_C = 450{,}000 / 990{,}000 = 0.4545$.
> > - The specific payment is $0.4545 \times 800{,}000 - 10{,}000 = \$353{,}636.36$.
> > - Under the blanket limit, the test uses the total value, $\$4{,}000{,}000$. The requirement is $0.90 \times 4{,}000{,}000 = \$3{,}600{,}000$, which the limit meets, so $R = 1$.
> > - The blanket payment is $800{,}000 - 10{,}000 = \$790{,}000$.
> > - With a 110% margin clause, the payment at C cannot exceed $1.10 \times 500{,}000 = \$550{,}000$, so the insurer pays $\$550{,}000$.
> > - The blanket limit followed the inventory to C, and the margin clause held the insured to the values it reported.

## Statement of values and the blanket rate

The insured reports the value of the property at each location or of each class on a statement of values when the policy is written. The insurer uses it to judge whether the limit is adequate, and to rate the blanket limit as a weighted average of the specific rates:

> $$r_B = \frac{\sum_k r_k S_k}{\sum_k S_k}$$

- $r_k$ is the rate per $\$100$ of insurance for location $k$.
- $r_B$ is the blanket rate.

> [!example]- What is the blanket rate, and the premium for the $\$3{,}600{,}000$ limit, ignoring any credit for the coinsurance percentage? {Example}
> The distributor above reported $\$2{,}000{,}000$ at A, $\$1{,}500{,}000$ at B and $\$500{,}000$ at C. The illustrative rates per $\$100$ of insurance are 0.30 at A, 0.45 at B and 0.80 at C, because C is a frame building without sprinklers.
>
> > [!answer]-
> > - In hundreds of dollars the reported values are 20,000, 15,000 and 5,000, a total of 40,000.
> > - The weighted sum is $0.30(20{,}000) + 0.45(15{,}000) + 0.80(5{,}000) = 16{,}750$.
> > - The blanket rate is $r_B = 16{,}750 / 40{,}000 = 0.41875$.
> > - The premium is $0.41875 \times 36{,}000 = \$15{,}075$.
> > - Had the insured reported more value at C, the blanket rate would rise, because more of the value would sit at the highest-rated location.

## Margin clause

The statement of values does not cap a location's recovery unless the policy adds a nonstandard provision that does. A margin clause limits what the insurer pays at any one location to a stated percentage of the value reported for it on the statement of values. A per location limitation of liability provision caps the most collected at a location at the value reported for it. Either stops an insured from understating the values of locations it thinks safe, which would lower the premium, while still collecting the full value of whatever location burns. The cap is the percentage times the value reported for that location, not its actual value at the time of loss.

## Increased cost of construction under a blanket limit

The increased cost of construction [[BPP Additional Coverages and Coverage Extensions|additional coverage]] is capped, for a building under a blanket limit, at the lesser of $\$10{,}000$ and 5% times the damaged building's value at the time of loss times the coinsurance percentage. A building with no limit of its own cannot use 5% of its limit.

> [!trap] Testing the blanket limit against the damaged location's value
> Under blanket coverage the coinsurance requirement is the percentage times the total value of all covered property, on the day of the loss. Testing the blanket limit against the value at the damaged location alone hides a penalty or invents one.
