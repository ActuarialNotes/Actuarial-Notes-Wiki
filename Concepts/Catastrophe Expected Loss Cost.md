---
verification:
  status: unverified
  confidence: null
  last_checked: null
  last_checked_by: null
  content_hash: sha256:f6b349fd6e527f333da9d864d5c7734fef17d463830fb6abbe148fd9aaa70db6
  sources: []
  open_findings: 0
  open_critical: 0
  log: .verify/Concepts/Catastrophe Expected Loss Cost.md
---

The **Catastrophe Expected Loss Cost** is the long-run expected annual catastrophe loss per unit of exposure. In modern practice it is the **average annual loss** (AAL) from a [[Catastrophe Modelling|catastrophe model]], divided by the exposure base, and it becomes the catastrophe provision in a rate in place of whatever catastrophe losses happened to occur in the experience period.

> $$\text{AAL} = \sum_{i} \lambda_i\, \bar{L}_i$$
>
> $$\text{Cat loss cost} = \frac{\text{AAL}}{\text{Exposure units}}$$

- $\lambda_i$ is the annual rate of event $i$ in the model's event loss table and $\bar{L}_i$ the mean loss it causes to the book after policy terms (deductibles, limits, coinsurance). Summed over the stochastic event set, this is the area under the aggregate exceedance probability curve — see [[Catastrophe Risk]].
- **Why a model.** For hurricane and earthquake the return periods far exceed any usable history, and the insurer's exposure has moved since the historical events. A model runs a simulated event catalogue against the *current* book through its hazard, inventory (exposure), vulnerability and loss modules, so the loss cost does not depend on which storms happened to occur. The Exam 5 mechanics of removing observed catastrophes and loading the expectation are on [[Catastrophe Loss]].
- **Rating detail.** Because the AAL is computed location by location, it can vary with construction, occupancy, age, mitigation features and deductible, which supports catastrophe rating territories, mitigation credits and deductible credits.
- **Risk load.** The AAL is only the expectation. Catastrophe business also consumes a great deal of capital, so a separate [[Risk Loads|risk load]] is added — commonly tied to the modelled volatility or to the capital (the [[Probable Maximum Loss|PML]] or tail measure) the exposure draws on.
- **Adjustments and uncertainty.** Demand surge, loss adjustment expense, coverages or perils the model omits (fire following earthquake, business interruption) and secondary uncertainty may need explicit treatment. Vendor models disagree, so results are tested against each other or blended ([[Model Risk]]), and poor exposure data corrupts everything ([[Data Quality]]). Regulators review models used in rate filings: Florida's Commission on Hurricane Loss Projection Methodology reviews the hurricane models insurers may use in residential rate filings.
- **Historical alternatives** remain for frequent perils (a long-run ratio of catastrophe to non-catastrophe losses) and as reasonability checks. Reinsurers once loaded by *payback* — a 1-in-20-year event as a $5\%$ loading of its amount — before models displaced it ([[Reinsurance Pricing]]).

> [!example]- From an Event Loss Table to a Homeowners Rate {Example}
> A homeowners book in one territory insures \$2.0 billion of total insured value (TIV), average \$300,000 a home. The model's event loss table, in \$ millions: severe convective storm at rate $0.40$ a year, mean loss $2$; category 1 hurricane, $0.10$, $8$; category 3 hurricane, $0.03$, $60$; category 5 hurricane, $0.005$, $300$. The non-catastrophe pure premium is \$900, fixed expense \$60 a policy, variable expense $20\%$ and profit $5\%$. Find the catastrophe loss cost and the indicated rate.
>
> > [!answer]-
> > $$
> > \begin{align*}
> > \text{AAL} &= 0.40(2) + 0.10(8) + 0.03(60) + 0.005(300) \\
> > &= 0.8 + 0.8 + 1.8 + 1.5 \\
> > &= \$4.9\text{M} \\
> > \text{Per \$1{,}000 TIV} &= \frac{\$4{,}900{,}000}{2{,}000{,}000} \\
> > &= \$2.45 \\
> > \text{Per home} &= 2.45 \times 300 \\
> > &= \$735
> > \end{align*}
> > $$
> >
> > $$
> > \begin{align*}
> > \text{Rate} &= \frac{\$900 + \$735 + \$60}{1 - 0.20 - 0.05} \\
> > &= \$2{,}260
> > \end{align*}
> > $$
> >
> > The catastrophe provision accounts for $735/0.75 = \$980$, or $43\%$ of the rate, and $31\%$ of the AAL comes from an event expected once in $200$ years ($1.5$ of $4.9$) that the experience period almost certainly never saw. No capital-based risk load is included here; in practice one would be added.

> [!example]- A Catastrophe Layer: Payback Versus Model {Example}
> The insurer buys \$50M xs \$50M per occurrence on the same book. Using the event loss table above, find the layer's modelled expected loss, and compare it with a premium set on a 25-year payback.
>
> > [!answer]-
> > Only the category 3 ($60 - 50 = 10$) and category 5 (full limit, $50$) events reach the layer:
> >
> > $$
> > \begin{align*}
> > \text{Layer AAL} &= 0.03(10) + 0.005(50) \\
> > &= \$0.55\text{M} \\
> > \text{Payback premium} &= \frac{\$50\text{M}}{25} \\
> > &= \$2.0\text{M}
> > \end{align*}
> > $$
> >
> > The modelled loss on line is $0.55/50 = 1.1\%$ against a payback rate on line of $4\%$, a $27.5\%$ loss ratio. Payback says nothing about how likely the layer is to be hit; the model does, and the gap between $0.55$ and $2.0$ is what the reinsurer charges for expenses and for the capital the layer ties up. (The calculation assumes reinstatements are available and uses mean event losses only.)
