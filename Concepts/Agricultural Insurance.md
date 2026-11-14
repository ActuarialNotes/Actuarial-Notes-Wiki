---
verification:
  status: unverified
  confidence: null
  last_checked: null
  last_checked_by: null
  content_hash: sha256:8ee21f2ea472502d5a24f65ee56de2cb2400cc6aaf0579bef43d1434575b3f46
  sources: []
  open_findings: 0
  open_critical: 0
  log: .verify/Concepts/Agricultural Insurance.md
---

![[Media/Figures/Agricultural_Insurance.svg|340]]

**Agricultural Insurance** in Canada is a suite of cost-shared federal-provincial programs protecting farm income against production and market risk. Premiums are heavily subsidised, and the programs are delivered by provincial crown agencies rather than by private insurers.

The suite has four programs:

1. **AgriInsurance** indemnifies yield or production loss from insured perils, such as drought, flood, hail, frost and disease, against a coverage level set as a percentage of the producer's probable yield. Governments pay a large share of the premium and the full administrative cost, and the federal government reinsures.
2. **AgriStability** is a whole-farm margin program. It pays when a producer's program margin falls below a reference margin derived from their own history, so it responds to a price collapse as well as to a production loss. This makes it a business-risk program rather than an insurance contract.
3. **AgriInvest** is a savings account, matched by government, for small income declines.
4. **AgriRecovery** is a framework for disasters the other programs do not address.

The programs achieve broad participation and stabilise farm income. Subsidised premiums also distort planting decisions toward risky crops and marginal land, and the cost-sharing formulas are a standing federal-provincial dispute.

## Why private insurers do not write crop risk

Crop losses are highly correlated across a region, because one drought hits every farm at once, so the law of large numbers fails. [[Moral Hazard]] and [[Adverse Selection]] are severe, because the producer controls the inputs and knows their own land. The data required for pricing is also expensive relative to farm-level premiums. Private hail insurance does exist, because hail is localised and therefore diversifiable.

Yield distributions are skewed and spatially correlated, and the programs' liability is catastrophe-like, so it needs reinsurance or a government backstop rather than ordinary reserving.

## Individual-yield and area-yield coverage

With a coverage level $c$ and a probable yield $\bar{Y}$, the indemnity per acre is

> $$\text{Indemnity} = \max(c\,\bar{Y} - Y,\ 0) \times \text{Price}$$

- $Y$ is the actual yield per acre.
- $\text{Price}$ is the price per bushel.

An individual-yield policy uses the producer's own probable and actual yields. An area-yield policy uses the area's, so its payout depends on the neighbours' harvests. The area design cannot be manipulated by farming poorly, under-reporting or abandoning a crop, and it needs no farm-level inspection or yield audit. Its cost is **basis risk**: the area's yield can stay up while the individual farm's falls.

> [!example]- How much does each policy pay this producer, and what is the basis risk? {Example}
> A producer's probable yield is $50$ bushels per acre and the area's is also $50$. Coverage is $80\%$ and the price is $\$8$ per bushel. In a drought year the producer harvests $30$ bushels per acre and the area averages $35$.
>
> > [!answer]-
> > - The guarantee under both policies is $0.80 \times 50 = 40$ bushels.
> > - The individual-yield policy pays $(40 - 30) \times \$8 = \$80$ per acre.
> > - The area-yield policy pays $(40 - 35) \times \$8 = \$40$ per acre.
> > - The producer lost $20$ bushels and is paid for $10$ under the individual policy and $5$ under the area policy.
> > - The $\$40$ per acre between the two payments is the basis risk of the area design.

> [!trap] Treating an index payout as an indemnity
> An area-yield or weather-index policy pays on the index, not on the farm's loss. A producer can suffer a loss the index does not show, as in the example, where the area policy paid $\$40$ of the producer's $\$160$ per acre loss.
