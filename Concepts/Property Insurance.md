---
aliases:
  - Loss Payment
verification:
  status: unverified
  confidence: null
  last_checked: null
  last_checked_by: null
  content_hash: sha256:cda47dcbbc19caa7590af07a3cf64418674952601da633f0b217149f63d067bb
  sources: []
  open_findings: 0
  open_critical: 0
  log: .verify/Concepts/Property Insurance.md
---
**Property Insurance** is first-party insurance that pays the insured for direct physical loss to property in which the insured has a financial interest, and, under time element coverages, for the income lost or the extra expense incurred because of that damage. It includes the [[Homeowners Policy|homeowners policy]] and [[Commercial Property Insurance|commercial property insurance]]. The amount of a loss payment follows from a chain of policy provisions: the insured's [[Insurable Interest|insurable interest]], the valuation basis, [[Insurance to Value|insurance to value]], the deductible, the limit and any other insurance.

> $$X = s \times L_V$$

> $$R = \min\left(\frac{C}{p \times V},\ 1\right)$$

> $$\text{Payment} = \min\big(R \times X - D,\ C\big)$$

> $$\text{Share}_j = \frac{C_j}{\sum_i C_i}$$

- **Symbols:** $L_V$ is the loss measured on the policy's valuation basis, and $s$ is the insured's share of the property, so $X$ is the loss to the insured's interest. $V$ is the property's value at the time of loss on the same basis, $p$ the coinsurance percentage, $C$ the limit, $R$ the coinsurance ratio and $D$ the deductible. When several policies cover the same property pro rata, policy $j$ pays $\text{Share}_j$ of the loss, where $C_j$ is its limit.
- **Insurable interest:** A policy pays only for the insured's own financial loss, so an owner of part of a building, a mortgagee or a tenant who made improvements recovers to the extent of that interest. Paying more would let the insured profit from the loss and create [[Moral Hazard|moral hazard]].
- **Valuation:** Actual cash value is usually [[Replacement Cost|replacement cost]] less depreciation, though some courts use [[Market Value|market value]] or the broad evidence rule. Replacement cost pays to rebuild with like kind and quality at current prices. Agreed value fixes the value of an item when the policy is written, which suits fine art and collectibles. Functional replacement cost pays to replace property with something that does the same job at lower cost, such as modern materials in place of ornate plaster.
- **Insurance to value:** Under a coinsurance clause, an insured who carries less than the required percentage of value recovers only the share $R$ of each partial loss. The test uses the value at the time of loss on the policy's own valuation basis, and agreed value suspends it.
- **Deductibles and limits:** A deductible removes small losses and gives the insured a stake in preventing them. It may be a flat amount or, for windstorm and earthquake, a percentage of the insured value. Under the standard commercial form the coinsurance ratio applies to the whole loss and the deductible is subtracted afterwards. The limit caps the payment, per item, per location or blanket over several, and sublimits cap particular kinds of property.
- **Other insurance:** When two policies cover the same loss, the other insurance provision decides how they share it. Under pro rata by limits each insurer pays in proportion to its limit. Under contribution by equal shares each pays equally until the smaller limit is exhausted, and under primary and excess one pays first and the other only above it.
- **Other conditions:** Appraisal settles disputes over the amount of loss without a lawsuit, the mortgage clause pays the lender as its interest appears, and the insurer may take damaged property as salvage. These shape who is paid and when, rather than how much.
- **Why it matters for pricing:** Property rates are charged per \$100 of insurance, so every provision that cuts the payment relative to the limit, from coinsurance to deductibles, also decides whether one rate is adequate across insureds ([[Coinsurance Rating]], [[Deductible]]).

> [!example]- Changing the Valuation Basis Without Changing the Limit {Example}
> A building has an actual cash value of \$1,500,000 and a replacement cost of \$2,000,000 at the time of a fire. It is insured for \$1,200,000 with an 80% coinsurance clause and a \$10,000 deductible. The fire damage costs \$400,000 to repair, and depreciation on the damaged part is 30%. Find the payment if the policy is written on an actual cash value basis, and if it is written on a replacement cost basis.
>
> > [!answer]-
> > On the ACV basis, the loss is $0.70 \times 400{,}000 = 280{,}000$ and the requirement is $0.80 \times 1{,}500{,}000 = 1{,}200{,}000$, which the limit meets.
> > $$
> > \begin{align*}
> > \text{Payment}_{\text{ACV}} &= 280{,}000 - 10{,}000 \\
> > &= 270{,}000
> > \end{align*}
> > $$
> > On the replacement cost basis, value and loss are both measured at replacement cost, and the requirement rises to \$1,600,000.
> > $$
> > \begin{align*}
> > R &= \frac{1{,}200{,}000}{0.80 \times 2{,}000{,}000} \\
> > &= 0.75 \\
> > \text{Payment}_{\text{RC}} &= 0.75(400{,}000) - 10{,}000 \\
> > &= 290{,}000
> > \end{align*}
> > $$
> > Switching to replacement cost raises the payment by only \$20,000, because the limit that met the ACV requirement falls short of the replacement cost one. With a limit of \$1,600,000 the insurer would have paid \$390,000.

> [!example]- Two Policies on One Warehouse {Example}
> A warehouse is insured by two policies with limits of \$600,000 from insurer A and \$400,000 from insurer B. Ignoring deductibles and coinsurance, a fire causes a \$250,000 loss. How much does each insurer pay under pro rata by limits, under contribution by equal shares, and if A's policy is primary and B's is excess?
>
> > [!answer]-
> > $$
> > \begin{align*}
> > \text{Share}_A &= \frac{600{,}000}{1{,}000{,}000} \\
> > &= 0.60 \\
> > \text{Pro rata: } A &= 0.60(250{,}000) \\
> > &= 150{,}000
> > \end{align*}
> > $$
> > Under pro rata by limits, B pays the other \$100,000. Under contribution by equal shares each pays \$125,000, since neither limit is reached. Under primary and excess, A pays the whole \$250,000 and B pays nothing. In every case the insured recovers \$250,000 and no more, because other insurance provisions share a loss and never let it be paid twice.

> [!tip]- How it appears on the exam
> - **GI-302:** Candidates explain how insurable interest, the policy provisions for valuing losses, and insurance to value affect the loss payment under a property policy. The calculation version gives a property's value on one or two bases, the limit, the coinsurance percentage, the deductible and a loss, and asks for the amount the insurer pays. A described version asks which provision reduces the payment and why it exists.
> - **Related objectives:** The same chain of provisions underlies the homeowners loss settlement condition and the commercial property loss conditions, which DISC-IA and DISC-RM test through the [[Homeowners Policy]] and [[Insurance to Value]].

> [!warning]- Exam traps
> - **One basis throughout:** The coinsurance test compares the limit with the value on the policy's own valuation basis. Testing a replacement cost policy against actual cash value misses the penalty, as the first example shows.
> - **Deductible order:** Under the standard commercial form the coinsurance ratio applies to the full loss before the deductible is subtracted. Taking the deductible first gives a slightly larger payment than the form allows.
> - **Interest before limit:** The insured's interest caps the loss before the limit applies. A part owner with a large limit still recovers only the loss to that part.
> - **Other insurance shares, it doesn't add:** Two policies never pay more than the loss in total. Adding their limits and paying each in full overstates the recovery.
