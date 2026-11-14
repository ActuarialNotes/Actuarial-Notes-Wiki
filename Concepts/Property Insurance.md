---
aliases:
  - Loss Payment
verification:
  status: unverified
  confidence: null
  last_checked: null
  last_checked_by: null
  content_hash: sha256:0d6c80a74a3e40b469ce1d3597a20449c441c8b4e498c9862caa1f7cab30bb95
  sources: []
  open_findings: 0
  open_critical: 0
  log: .verify/Concepts/Property Insurance.md
---
**Property Insurance** is first-party insurance that pays the insured for direct physical loss to property in which the insured has a financial interest, and, under time element coverages, for the income lost or the extra expense incurred because of that damage. It includes the [[Homeowners Policy|homeowners policy]] and [[Commercial Property Insurance|commercial property insurance]]. The amount of a loss payment follows from a chain of policy provisions: the insured's [[Insurable Interest|insurable interest]], the valuation basis, [[Insurance to Value|insurance to value]], the deductible, the limit and any other insurance.

## Insurable interest

A policy pays only for the insured's own financial loss, so an owner of part of a building, a mortgagee or a tenant who made improvements recovers to the extent of that interest. Paying more would let the insured profit from the loss and create [[Moral Hazard|moral hazard]]. The loss to the insured's interest is

> $$X = s \times L_V$$

- $s$ is the insured's share of the property.
- $L_V$ is the loss measured on the policy's valuation basis.

The insured's interest caps the loss before the limit applies, so a part owner with a large limit still recovers only the loss to that part.

## Valuation

Actual cash value is usually [[Replacement Cost|replacement cost]] less depreciation, though some courts use [[Market Value|market value]] or the broad evidence rule. Replacement cost pays to rebuild with like kind and quality at current prices. Agreed value fixes the value of an item when the policy is written, which suits fine art and collectibles. Functional replacement cost pays to replace property with something that does the same job at lower cost, such as modern materials in place of ornate plaster.

## Insurance to value, deductibles and limits

Under a coinsurance clause, an insured who carries less than the required percentage of value recovers only the share $R$ of each partial loss. The coinsurance ratio is

> $$R = \min\left(\frac{C}{p \times V},\ 1\right)$$

- $C$ is the limit.
- $p$ is the coinsurance percentage.
- $V$ is the property's value at the time of loss, on the policy's own valuation basis.

Agreed value suspends the test. A deductible removes small losses and gives the insured a stake in preventing them. It may be a flat amount or, for windstorm and earthquake, a percentage of the insured value. The limit caps the payment, per item, per location or blanket over several, and sublimits cap particular kinds of property. Under the standard commercial form the coinsurance ratio applies to the whole loss and the deductible is subtracted afterwards, so the payment is

> $$\text{Payment} = \min\big(R \times X - D,\ C\big)$$

- $D$ is the deductible.

Property rates are charged per \$100 of insurance, so every provision that cuts the payment relative to the limit, from coinsurance to deductibles, also decides whether one rate is adequate across insureds ([[Coinsurance Rating]], [[Deductible]]).

> [!example]- What does this fire policy pay on an actual cash value basis, and on a replacement cost basis? {Example}
> A building has an actual cash value of $\$1{,}500{,}000$ and a replacement cost of $\$2{,}000{,}000$ at the time of a fire. It is insured for $\$1{,}200{,}000$ with an 80% coinsurance clause and a $\$10{,}000$ deductible. The fire damage costs $\$400{,}000$ to repair, and depreciation on the damaged part is 30%.
>
> > [!answer]-
> > - On the ACV basis, the loss is $0.70 \times 400{,}000 = 280{,}000$ and the requirement is $0.80 \times 1{,}500{,}000 = 1{,}200{,}000$, which the limit meets.
> > - The ACV payment is $280{,}000 - 10{,}000 = \$270{,}000$.
> > - On the replacement cost basis, value and loss are both measured at replacement cost, and the requirement rises to $\$1{,}600{,}000$.
> > - So $R = 1{,}200{,}000/1{,}600{,}000 = 0.75$, and the payment is $0.75(400{,}000) - 10{,}000 = \$290{,}000$.
> > - Switching to replacement cost raises the payment by only $\$20{,}000$, because the limit that met the ACV requirement falls short of the replacement cost one. With a limit of $\$1{,}600{,}000$ the insurer would have paid $\$390{,}000$.

## Other insurance

When two policies cover the same loss, the other insurance provision decides how they share it. Under pro rata by limits each insurer pays in proportion to its limit. When several policies cover the same property pro rata, policy $j$ pays $\text{Share}_j$ of the loss, where $C_j$ is its limit:

> $$\text{Share}_j = \frac{C_j}{\sum_i C_i}$$

Under contribution by equal shares each pays equally until the smaller limit is exhausted, and under primary and excess one pays first and the other only above it. Two policies never pay more than the loss in total.

> [!example]- How do two policies share this warehouse fire under each other insurance provision? {Example}
> A warehouse is insured by two policies, with limits of $\$600{,}000$ from insurer A and $\$400{,}000$ from insurer B. Ignoring deductibles and coinsurance, a fire causes a $\$250{,}000$ loss.
>
> > [!answer]-
> > - Under pro rata by limits, A's share is $600{,}000/1{,}000{,}000 = 0.60$, so A pays $\$150{,}000$ and B pays $\$100{,}000$.
> > - Under contribution by equal shares, each pays $\$125{,}000$, since neither limit is reached.
> > - If A is primary and B is excess, A pays the whole $\$250{,}000$ and B pays nothing.
> > - In every case the insured recovers $\$250{,}000$ and no more.

## Other conditions

Appraisal settles disputes over the amount of loss without a lawsuit, the mortgage clause pays the lender as its interest appears, and the insurer may take damaged property as salvage. These shape who is paid and when, rather than how much.

> [!trap] Testing coinsurance on the wrong valuation basis
> The coinsurance test compares the limit with the value on the policy's own valuation basis. Testing a replacement cost policy against actual cash value misses the penalty, as the first example shows.
