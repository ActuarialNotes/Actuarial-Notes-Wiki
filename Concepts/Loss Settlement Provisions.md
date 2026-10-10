---
verification:
  status: unverified
  confidence: null
  last_checked: null
  last_checked_by: null
  content_hash: sha256:03506140e4282824e7a3264233d63b5f7240380be8c3a4d3d3fce07cf78a7e73
  sources: []
  open_findings: 0
  open_critical: 0
  log: .verify/Concepts/Loss Settlement Provisions.md
---

**Loss Settlement Provisions** are the policy terms that say how damaged or destroyed property is valued when a claim is paid. Most property policies use [[Actual Cash Value|actual cash value]] or [[Replacement Cost|replacement cost]], and the other bases, agreed value, functional replacement cost, stated amount, market value and book value, fit property those two value badly. Pair-or-set and loss-to-a-part provisions then settle a loss to one piece of something whose value lies in the whole.

> $$\text{Payment} = \min\big(V_b(\text{loss}),\ C\big) - D$$

> $$\text{BV} = \text{Cost} \times \left(1 - \frac{t}{N}\right)$$

> $$\text{Pair loss} = V_{\text{set}} - V_{\text{remaining}}$$

- **Symbols:** $V_b(\text{loss})$ is the loss valued on the policy's basis $b$, $C$ is the limit and $D$ the deductible. In the second block, Cost is the price the insured paid, $t$ is the years since purchase and $N$ the accounting life over which the insured's books write the property off, with straight-line depreciation and no salvage value. In the third, $V_{\text{set}}$ is the value of the complete pair or set before the loss and $V_{\text{remaining}}$ the value of what is left.
- **Agreed value:** The insurer and the insured agree on the property's value when the policy is written, usually after an appraisal, and that amount is paid for a total loss without argument about depreciation. It suits fine art, antiques and collectibles, whose value cannot be rebuilt from a replacement cost. In the commercial property forms, the agreed value optional coverage instead suspends the coinsurance condition ([[Insurance to Value]]).
- **Functional replacement cost:** This pays the cost to replace damaged property with property that performs the same function at less cost, such as drywall in place of hand-plastered walls in an old house. It lets an owner insure an old building whose like-kind replacement cost is far above its market value without buying a limit it would never need.
- **Stated amount:** Common on vehicles, a stated amount caps the payment rather than fixing it. The insurer pays the least of the stated amount, the ACV and the cost to repair or replace, so an insured who states too high a value pays premium for coverage it can never collect.
- **Market value:** Some property is valued at what it would fetch on the market at the time of the loss. Securities under crime coverage are valued at their market price on the day the loss is discovered, and merchandise sold but not yet delivered is valued at its selling price less discounts and unincurred expenses.
- **Book value:** This is the property's value on the insured's accounting records, its cost less accumulated accounting depreciation. Accounting depreciation follows tax or reporting schedules, not wear, so book value is usually well below ACV for property that is still useful. Policies rarely settle on it, but an adjuster may meet it in an insured's records and must not confuse it with ACV.
- **Pair or set:** When one item of a pair or set is lost, the homeowners form lets the insurer either repair or replace a part to restore the set to its value before the loss, or pay the difference between the ACV of the property before and after the loss. That difference is usually more than the lost item's proportional share, because a broken set is worth less than its parts.
- **Loss to a part:** When an item made of several parts is damaged in one part, the insurer pays only to repair or replace that part, not the value of the whole. The provision stops a claim for a whole machine, vehicle or collection when only a component was lost.

> [!example]- One Machine Settled on Six Bases {Example}
> A machine shop bought a lathe five years ago for \$50,000, and its books write it off straight-line over seven years. A lathe of like kind and quality costs \$64,000 today, and its physical useful life is 12 years. A newer, simpler model that does the same work costs \$45,000, and used lathes like it sell for \$30,000. A fire destroys the lathe. With a \$2,500 deductible on each basis and no limit binding, what does the insurer pay at replacement cost, functional replacement cost, ACV, market value, an agreed value of \$40,000 and book value? What would a stated amount of \$40,000 pay?
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
> > Less the \$2,500 deductible, the payments are \$61,500 at replacement cost, \$42,500 at functional replacement cost, \$37,500 at agreed value, \$34,833.33 at ACV, \$27,500 at market value and \$11,785.71 at book value. A stated amount of \$40,000 is only a cap, so the insurer pays the lesser of \$40,000 and the ACV, which is the same \$34,833.33 as the ACV basis. The book value payment would leave the shop about \$23,000 short of the ACV payment for a lathe it still used every day, which is why book value is an accounting measure and not an indemnity.

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
> > Half the pair's value is \$6,000, which would leave the homeowner holding a vase worth \$3,000 and \$3,000 short of the value lost. The condition does not pay the full \$12,000 either, because the remaining vase still has value. Under some fine arts forms the insurer pays the full value of the set and takes the remaining item instead.

> [!tip]- How it appears on the exam
> - **DISC-IA:** The objectives are to describe the other valuation or loss settlement provisions and to apply book value to a property damage claim. Questions give a loss and its replacement cost, depreciation, market price or accounting records, and ask for the payment on a named basis.
> - **Choosing a basis:** A question can describe property, such as a painting, an old building, a fleet vehicle or a stock portfolio, and ask which settlement basis suits it and why.
> - **Linked objectives:** The calculation of ACV and replacement cost is on [[Actual Cash Value]] and [[Replacement Cost]], and the coinsurance consequence of each basis is on [[Insurance to Value]].

> [!warning]- Exam traps
> - **Stated amount versus agreed value:** An agreed value is paid in full for a total loss. A stated amount is a maximum, and the insurer pays the lesser of it, the ACV and the repair cost.
> - **Book value is not ACV:** Book value starts from the purchase price and depreciates over an accounting life. ACV starts from today's replacement cost and depreciates for real wear and obsolescence, so the two rarely agree.
> - **Not half the pair:** The pair-or-set provision pays the drop in value of the whole set, not the lost item's proportional share.
> - **Two meanings of agreed value:** On a scheduled item, agreed value fixes the amount paid. In the BPP, the agreed value option only suspends coinsurance, and the loss is still valued at ACV or replacement cost.
