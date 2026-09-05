---
verification:
  status: unverified
  confidence: null
  last_checked: null
  last_checked_by: null
  content_hash: sha256:a8964ce4d16ce7b79956670ad1b9a1f3d8068c31e5482d67e275d6a74fdecb69
  sources: []
  open_findings: 0
  open_critical: 0
  log: .verify/Concepts/Agricultural Insurance.md
---

**Agricultural Insurance** in Canada is a suite of cost-shared federal-provincial programs protecting farm income against production and market risk: **AgriInsurance** (production/crop insurance), **AgriStability** (margin decline), **AgriInvest** (matched savings) and **AgriRecovery** (disaster response). Premiums are heavily subsidised, and the programs are delivered by provincial crown agencies rather than by private insurers.

- **AgriInsurance** is the closest to conventional insurance: it indemnifies yield or production loss from insured perils (drought, flood, hail, frost, disease) against a coverage level set as a percentage of the producer's probable yield. Governments pay a large share of the premium and the full administrative cost, and the federal government reinsures.
- **AgriStability** is a **whole-farm margin** program, not a peril-based one: it pays when a producer's program margin falls below a reference margin derived from their own history, so it responds to price collapse as well as production loss. This makes it a business-risk program rather than an insurance contract.
- **AgriInvest** is a savings-matching account for small income declines — self-insurance with a government match — and **AgriRecovery** is an ad hoc framework for disasters the other programs do not address.
- **Why the private market does not serve this risk.** Crop losses are **highly correlated** across a region (one drought hits every farm at once), so the law of large numbers fails; [[Moral Hazard]] and [[Adverse Selection]] are severe because the producer controls inputs and knows their own land; and the data required for pricing is expensive relative to farm-level premiums. Private hail insurance exists — hail is localised and therefore diversifiable — which is the exception that proves the rule.
- **Actuarial features:** yield distributions are skewed and spatially correlated; area-yield and weather-index designs reduce moral hazard at the cost of **basis risk** (the index moves but the individual farm does not); and the programs' liability is catastrophe-like, requiring reinsurance or government backstop rather than ordinary reserving.
- **Evaluation.** The programs achieve broad participation and stabilise farm income, but subsidised premiums distort planting decisions toward risky crops and marginal land, and cost-sharing formulas are a standing federal-provincial dispute.

> [!example]- Individual Yield Versus Area Yield {Example}
> A producer's probable yield is $50$ bushels per acre and coverage is $80\%$. The area's probable yield is also $50$. In a drought year the producer harvests $30$ and the area averages $35$. Price is $\$8$ per bushel.
>
> Compare an individual-yield policy with an area-yield policy.
>
> > [!answer]-
> > **Individual yield.** The guarantee is $0.80 \times 50 = 40$ bushels; the producer harvested $30$:
> >
> > $$\begin{align*}
> > \text{Indemnity} &= (40 - 30) \times \$8 \\
> > &= \$80 \text{ per acre}
> > \end{align*}$$
> >
> > **Area yield.** The trigger is $0.80 \times 50 = 40$ area bushels; the area averaged $35$:
> >
> > $$\begin{align*}
> > \text{Indemnity} &= (40 - 35) \times \$8 \\
> > &= \$40 \text{ per acre}
> > \end{align*}$$
> >
> > The producer suffered a $20$-bushel loss and is paid for $10$ under the individual policy and $5$ under the area policy — the $\$40$ gap is **basis risk**, the cost of a design that does not look at the individual farm.
> >
> > **The trade-off.** The area policy cannot be manipulated: the producer cannot increase their indemnity by farming poorly, under-reporting, or abandoning a crop, because the payout depends on the neighbours. It is also far cheaper to administer — no farm-level inspection or yield audit. The individual policy compensates accurately but requires verification of every claim and carries real [[Moral Hazard]].
> >
> > This is the same trade-off found in every index-based product, including parametric catastrophe covers: **accuracy of indemnity against immunity from manipulation**, and one cannot have both.
