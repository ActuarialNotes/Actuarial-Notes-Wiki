---
verification:
  status: unverified
  confidence: null
  last_checked: null
  last_checked_by: null
  content_hash: sha256:27437334b3205acf43c9839b433001419e0e78817ace4c9b1f7f2b70f59a925a
  sources: []
  open_findings: 0
  open_critical: 0
  log: .verify/Concepts/Blanket Insurance.md
---

**Blanket Insurance** is property insurance in which one limit covers several locations, several classes of property, or both, such as all the buildings and business personal property at four stores under one \$10,000,000 limit. Specific insurance is the alternative: each building, location or class of property has its own limit, and a loss at one location can draw only on that location's limit. Blanket coverage lets one loss use the whole limit, so it protects an insured whose values shift between locations or are hard to allocate in advance.

> $$R = \min\left(\frac{C_B}{p \sum_k V_k},\ 1\right)$$

> $$\text{Pay}_j = \min\big(R\,L_j - D,\ C_B,\ m\,S_j\big)$$

> $$r_B = \frac{\sum_k r_k S_k}{\sum_k S_k}$$

- **Symbols:** $C_B$ is the blanket limit, $p$ is the coinsurance percentage, and $V_k$ is the value of the property at location $k$ at the time of the loss. $L_j$ is the loss at location $j$, $D$ is the deductible, $S_j$ is the value the insured reported for location $j$ on its statement of values, and $m$ is the margin clause percentage, such as 110%. Without a margin clause the third term is dropped. In the last block, $r_k$ is the rate per \$100 of insurance for location $k$ and $r_B$ is the blanket rate.
- **Statement of values:** The insured reports the value of the property at each location or of each class on a statement of values when the policy is written. The insurer uses it to rate the blanket limit, as a weighted average of the specific rates, and to judge whether the limit is adequate. The statement does not cap a location's recovery unless the policy adds a margin clause.
- **Coinsurance on a blanket limit:** The coinsurance condition compares the blanket limit with the coinsurance percentage times the total value of all the property the limit covers, not with the value at the location of the loss. Because one location can use the whole limit, insurers usually require a higher coinsurance percentage for blanket coverage, commonly 90% or more, which is an [[Insurance to Value|insurance to value]] safeguard.
- **Margin clause:** A margin clause limits what the insurer pays at any one location to a stated percentage of the value reported for it on the statement of values. It stops an insured from understating the values of locations it thinks safe, which would lower the premium, while still collecting the full value of whatever location burns.
- **When blanket helps:** Blanket coverage suits an insured that moves inventory among warehouses, whose values swing by season, or whose property at many small sites would each need a separate limit. A specific limit can be too low at the moment of loss even if the total insurance is adequate.
- **Agreed value:** The agreed value optional coverage suspends the coinsurance condition for the property it applies to until its expiration date, and pays no more than the proportion the limit bears to the agreed value shown in the declarations ([[BPP Optional Coverages]]).
- **What the BPP form says about one limit for several items:** The coinsurance condition in ISO CP 00 10 10 12 states that when one limit applies to two or more separate items, the condition applies to the total of all the property the limit covers; the form's own example tests a single \$180,000 limit on two buildings and their contents against 90% of their combined \$250,000 value. The increased cost of construction additional coverage is capped, for a building under a blanket limit, at the lesser of \$10,000 and 5% times the damaged building's value at the time of loss times the coinsurance percentage, rather than 5% of a limit the building does not have on its own ([[BPP Additional Coverages and Coverage Extensions]]).

> [!example]- One Loss Under Specific Limits, a Blanket Limit and a Margin Clause {Example}
> A distributor's statement of values shows \$2,000,000 at location A, \$1,500,000 at B and \$500,000 at C. Under specific insurance it would buy limits of 90% of each value: \$1,800,000, \$1,350,000 and \$450,000, each with a 90% coinsurance clause. The blanket alternative is one \$3,600,000 limit with 90% coinsurance. During the year it moves inventory, and on the day of a fire at C the values are \$1,400,000 at A, \$1,500,000 at B and \$1,100,000 at C. The fire causes an \$800,000 loss at C, and the deductible is \$10,000. Find the payment under specific limits, under the blanket limit, and under the blanket limit with a 110% margin clause.
>
> > [!answer]-
> > Under specific insurance, location C's limit is tested against 90% of C's value on the day of the loss.
> > $$
> > \begin{align*}
> > R_C &= \frac{450{,}000}{0.90(1{,}100{,}000)} \\
> > &= 0.4545 \\
> > \text{Pay}_C &= 0.4545(800{,}000) - 10{,}000 \\
> > &= 353{,}636.36
> > \end{align*}
> > $$
> > Under the blanket limit, the test uses the total value, \$4,000,000, which the limit meets.
> > $$
> > \begin{align*}
> > R &= \frac{3{,}600{,}000}{0.90(4{,}000{,}000)} \\
> > &= 1 \\
> > \text{Pay}_C &= 800{,}000 - 10{,}000 \\
> > &= 790{,}000
> > \end{align*}
> > $$
> > With a 110% margin clause, the payment at C cannot exceed $1.10 \times 500{,}000 = 550{,}000$, so the insurer pays \$550,000. The same total insurance pays \$353,636.36, \$790,000 or \$550,000 depending on how it is arranged. The blanket limit followed the inventory to C, and the margin clause held the insured to the values it reported.

> [!example]- Rating the Blanket Limit {Example}
> In the example above, the illustrative rates per \$100 of insurance are 0.30 at location A, 0.45 at B and 0.80 at C, because C is a frame building without sprinklers. Find the blanket rate from the statement of values and the premium for the \$3,600,000 blanket limit, ignoring any credit for the coinsurance percentage.
>
> > [!answer]-
> > The blanket rate is the average of the location rates weighted by the reported values, in hundreds of dollars.
> > $$
> > \begin{align*}
> > r_B &= \frac{0.30(20{,}000) + 0.45(15{,}000) + 0.80(5{,}000)}{40{,}000} \\
> > &= \frac{16{,}750}{40{,}000} \\
> > &= 0.41875 \\
> > \text{Premium} &= 0.41875 \times 36{,}000 \\
> > &= 15{,}075
> > \end{align*}
> > $$
> > The weighting is why an accurate statement of values matters. Had the insured reported \$1,100,000 at C, the blanket rate would rise, because more of the value would sit at the highest-rated location. Understating C to lower that rate is what the margin clause discourages.

> [!tip]- How it appears on the exam
> - **DISC-IA:** The objective is selecting blanket insurance. Questions ask when blanket coverage suits an insured better than specific limits, and work a loss at one location under each arrangement, with coinsurance and sometimes a margin clause.
> - **Coinsurance:** A question can give the values at every location and ask whether a blanket limit meets the coinsurance requirement, which is a test against the total value covered ([[Insurance to Value]]).
> - **Linked objectives:** The objective sits beside the BPP's loss conditions, optional coverages and limits, so expect it to be combined with the coinsurance and deductible rules of the [[Building and Personal Property Coverage Form]].

> [!warning]- Exam traps
> - **The total value, not the location's:** Under blanket coverage the coinsurance requirement is the percentage times the total value of all covered property. Testing the blanket limit against the value at the damaged location alone hides a penalty or invents one.
> - **Values at the time of loss:** Coinsurance uses the values on the day of the loss, not the statement of values. The statement matters for the rate and for a margin clause, which caps the payment at a percentage of the reported value.
> - **Margin clause on reported values:** The cap is the percentage times the value reported for that location, not its actual value at the time of loss.
> - **One limit for the occurrence:** The blanket limit is the most paid in any one occurrence across all the locations it covers. An event that damages several locations at once, such as a windstorm, shares that one limit among them rather than drawing a full limit at each.
