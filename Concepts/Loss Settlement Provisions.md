---
verification:
  status: verified
  confidence: medium
  last_checked: 2026-10-10
  last_checked_by: agent:validate-v1
  content_hash: sha256:8f66e8f464264702cd27baf1702f636eb675cd5d401724689b448f2e45414d8e
  sources:
    - "ISO CP 00 10 10 12, Building and Personal Property Coverage Form, E.7.c, G.1 (pp.13-15), sha256:b46b0929e7effc6cfcfde0493f5a363dc32053b3afd56632776432f596a1e106 — https://www.propertyinsurancecoveragelaw.com/wp-content/uploads/2017/05/CP00101012-1.pdf"
    - "ISO HO 00 03 05 11, Homeowners 3 – Special Form (Maine Bureau of Insurance copy), Section I Condition E (p.15), sha256:ac539e500a5767946452d1e6ad4c4b7dcc395c6c65c48fc3a8ac92a7c330a1d4 — https://www.maine.gov/pfr/insurance/sites/maine.gov.pfr.insurance/files/inline-files/ho00-03-05-11-homeowners3-special-form.pdf"
    - "IRMI Insurance Glossary, 'functional replacement cost' (fetched 2026-10-10), sha256:70469cded69b4322209026dd5af195bbe8ca95463f05dff062fad72e57a93e55 — https://www.irmi.com/term/insurance-definitions/functional-replacement-cost"
    - "IRMI Insurance Glossary, 'pair or set clause' (fetched 2026-10-10), sha256:c1324d6e8a72839b73a5191202c6aa4ef2210a0cd3430f3733da6e982bf5b81e — https://www.irmi.com/term/insurance-definitions/pair-or-set-clause"
    - "IRMI Insurance Glossary, 'book value' (fetched 2026-10-10), sha256:999cbf0ed845b3971668eaae1867ff6c90fd4249a091042c256f9f2d13fccd3a — https://www.irmi.com/term/insurance-definitions/book-value"
    - "IRMI Insurance Glossary, 'actual cash value (ACV)' (fetched 2026-10-10), sha256:5f284ad72439afe65429eed3341df2aa74bdea4fe89c9f1835b801646fc5053a — https://www.irmi.com/term/insurance-definitions/actual-cash-value"
  open_findings: 0
  open_critical: 0
  log: .verify/Concepts/Loss Settlement Provisions.md
---

**Loss Settlement Provisions** are the policy terms that say how damaged or destroyed property is valued when a claim is paid. Most property policies use [[Actual Cash Value|actual cash value]] or [[Replacement Cost|replacement cost]]; other bases include functional replacement cost, selling price and book value, and the commercial property form's agreed value option changes how the limit applies. A pair-or-set provision settles a loss to one item of a pair or set.

> $$\text{Payment} = \min\big(V_b(\text{loss}),\ C\big) - D$$

> $$\text{BV} = \text{Cost} \times \left(1 - \frac{t}{N}\right)$$

> $$\text{Pair loss} = V_{\text{set}} - V_{\text{remaining}}$$

- **Symbols:** $V_b(\text{loss})$ is the loss valued on the policy's basis $b$, $C$ is the limit and $D$ the deductible. In the second block, Cost is the price the insured paid, $t$ is the years since purchase and $N$ the accounting life over which the insured's books write the property off, with straight-line depreciation and no salvage value. In the third, $V_{\text{set}}$ is the value of the complete pair or set before the loss and $V_{\text{remaining}}$ the value of what is left.
- **Agreed value:** In the ISO Building and Personal Property Coverage Form (CP 00 10 10 12), the agreed value optional coverage suspends the coinsurance condition for the property it applies to, and the insurer pays no more for a loss than the proportion that the limit of insurance bears to the agreed value shown in the declarations ([[Insurance to Value]]).
- **Functional replacement cost:** This is the cost of acquiring another item of property that will perform the same function with equal efficiency, even if it is not identical to the property being replaced.
- **Selling price:** The BPP values "stock" the insured has sold but not delivered at the selling price less discounts and expenses the insured otherwise would have had.
- **Book value:** This is the property's value on the insured's accounting records, its cost less accumulated accounting depreciation. Accounting depreciation follows tax or reporting schedules, not wear, so book value is usually well below ACV for property that is still useful. Because it rests on the original purchase price and a depreciation schedule calculated mathematically, which may not relate to the property's actual condition, book value should never be relied on to establish insurable values.
- **Pair or set:** When one item of a pair or set is lost, the homeowners form lets the insurer either repair or replace a part to restore the set to its value before the loss, or pay the difference between the ACV of the property before and after the loss.

> [!example]- One Machine Settled on Four Bases {Example}
> A machine shop bought a lathe five years ago for \$50,000, and its books write it off straight-line over seven years. A lathe of like kind and quality costs \$64,000 today, and its physical useful life is 12 years. A newer, simpler model that does the same work costs \$45,000. A fire destroys the lathe. With a \$2,500 deductible on each basis and no limit binding, what does the insurer pay at replacement cost, functional replacement cost, ACV and book value?
>
> > [!answer]-
> > ACV is today's replacement cost less depreciation over the physical life, and book value is the purchase price less depreciation over the accounting life.
> > $$
> > \begin{align*}
> > \text{ACV} &= 64{,}000\left(1 - \frac{5}{12}\right) \\
> > &= 37{,}333.33 \\
> > \text{BV} &= 50{,}000\left(1 - \frac{5}{7}\right) \\
> > &= 14{,}285.71
> > \end{align*}
> > $$
> > Less the \$2,500 deductible, the payments are \$61,500 at replacement cost, \$42,500 at functional replacement cost \$34,833.33 at ACV and \$11,785.71 at book value. The book value payment would leave the shop about \$23,000 short of the ACV payment for a lathe it still used every day, which is why book value is an accounting measure and not an indemnity.

> [!example]- A Broken Pair of Vases {Example}
> A homeowner's matched pair of antique vases is worth \$12,000 as a pair. A guest breaks one, and a single vase on its own is worth \$3,000. No matching vase can be found. What does the pair-or-set condition pay, ignoring the deductible, and how does it compare with half the pair's value?
>
> > [!answer]-
> > The insurer cannot restore the pair, so it pays the difference in value before and after the loss.
> > $$
> > \begin{align*}
> > \text{Pair loss} &= 12{,}000 - 3{,}000 \\
> > &= 9{,}000
> > \end{align*}
> > $$
> > Half the pair's value is \$6,000, which would leave the homeowner holding a vase worth \$3,000 and \$3,000 short of the value lost. The condition does not pay the full \$12,000 either, because the remaining vase still has value.

> [!tip]- How it appears on the exam
> - **DISC-IA:** The objectives are to describe the other valuation or loss settlement provisions and to apply book value to a property damage claim. Questions give a loss and its replacement cost, depreciation, market price or accounting records, and ask for the payment on a named basis.
> - **Linked objectives:** The calculation of ACV and replacement cost is on [[Actual Cash Value]] and [[Replacement Cost]], and the coinsurance consequence of each basis is on [[Insurance to Value]].

> [!warning]- Exam traps
> - **Book value is not ACV:** Book value starts from the purchase price and depreciates over an accounting life. ACV starts from today's replacement cost and depreciates for real wear and obsolescence, so the two rarely agree.
> - **Not half the pair:** The pair-or-set provision pays the drop in value of the whole set, not the lost item's proportional share.
> - **Agreed value in the BPP:** The agreed value option suspends coinsurance, and the insurer pays no more for a loss than the proportion that the limit bears to the agreed value; the loss itself is still valued under the form's valuation condition.
