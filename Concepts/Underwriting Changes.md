---
verification:
  status: verified
  confidence: medium
  last_checked: 2026-10-31
  last_checked_by: agent:validate-v1
  content_hash: sha256:c99843625e0fec87368606525d4a6f55c3a790c65f72cfed0a362386aca07171
  sources:
    - "Friedland, Estimating Unpaid Claims Using Basic Techniques (CAS, 2010), Ch. 4 p. 47 (underwriting executive questions); Ch. 7 pp. 103-105 (product mix); Ch. 8 p. 137 (adjust a priori for pricing/underwriting changes); Ch. 13 pp. 283-284, sha256:5e9830823346d2001d9bdcebecd0d0d399cac32a9a63d5cf021a6c7f03d50464 — https://www.casact.org/sites/default/files/2021-03/5_Friedland.pdf"
    - "Werner & Modlin, Basic Ratemaking (CAS, 5th ed. May 2016), Ch. 5 p. 82 (distributional changes, average premium); Ch. 6 p. 110 (distributional changes in loss trend), sha256:6b214d4db52674df2e83343920c06781e491254bd77f27e32ba312faaff3782c — https://www.casact.org/sites/default/files/2021-03/5_Werner_Modlin.pdf"
  open_findings: 1
  open_critical: 0
  log: .verify/Concepts/Underwriting Changes.md
---

**Underwriting Changes** are shifts in risk selection — eligibility rules, hazard appetite, minimum premium thresholds, tier placement, agency appointments and terminations — that change the **mix and average quality** of the risks in the book, and so change both loss levels and development patterns.

> $$\overline{\text{LR}} = \sum_i w_i \times \text{LR}_i$$

- An underwriting change alters the **weights** $w_i$, so aggregate results move even when no segment's own experience has changed. It is a [[Mix of Business|mix]] change with a deliberate cause.
- Unlike a rate change or a [[Policy Provision Changes|provision change]], an underwriting change has **no clean effective date** in the data. It phases in as policies renew, it is applied with judgment case by case, and it is often not documented at all — which makes it the hardest of the operational changes to detect and quantify.
- The evidence to look for: average premium per exposure moving without a rate change, shifts in the distribution across tiers or classes, changing new-business-to-renewal mix, loss ratios by segment holding while the aggregate moves, and the agency mix.
- Tightening usually **lowers** severity and may accelerate closing, so historical development factors — built on a riskier book — overstate ultimate for the post-change years. Loosening does the reverse, and is the more dangerous direction because the deterioration arrives later than the growth.
- [[Berquist-Sherman Method|Berquist-Sherman]] does not address this. It corrects for changes in *claims* practice, not in the composition of the exposure. The responses here are to weight recent years more heavily, to segment the data so the changing mix is visible, or to lean on a priori methods whose ELR can be set for the new book.
- The pricing counterpart matters too: a book whose underwriting has tightened needs its historical loss experience adjusted before it is used in an indication, or the rate will be set for risks the insurer no longer writes.

![[Media/Figures/Underwriting_Changes.svg|340]]

> [!example]- Underwriting Tightening {Example}
> An insurer stops writing contractors with more than three prior losses, effective $7/1/2022$. High-hazard contractors fall from $30\%$ of premium to $5\%$.
>
> What happens to the analysis?
>
> > [!answer]-
> > Post-change accident years contain a materially better book. Two effects follow:
> >
> > - **Loss ratios fall** in recent diagonals, for reasons unrelated to rate adequacy.
> > - **Development factors from the blended history overstate** ultimate for the post-change years, since they were estimated on a book containing six times as much high-hazard business — which reports later and settles slower.
> >
> > The response is to give **less weight to pre-change accident years** when selecting factors, and to segment the data by hazard grade so the two populations can be seen separately. If the segments have enough volume, reserving them separately removes the problem entirely.
> >
> > In **ratemaking**, the historical experience must be restated to the current mix before it supports an indication — otherwise the rate is set for the book of $2021$, and the insurer will be over-priced against competitors on the risks it now wants.

> [!example]- Growth That Is an Underwriting Change {Example}
> A commercial auto book's figures:
>
> | AY | Earned premium | Avg premium per unit | New business share | Ultimate LR |
> |---|---|---|---|---|
> | $2021$ | $\$18{,}000$K | $\$1{,}450$ | $18\%$ | $64\%$ |
> | $2022$ | $\$19{,}000$K | $\$1{,}470$ | $20\%$ | $65\%$ |
> | $2023$ | $\$26{,}000$K | $\$1{,}280$ | $46\%$ | $73\%$ |
> | $2024$ | $\$33{,}000$K | $\$1{,}190$ | $52\%$ | $81\%$ |
>
> There were no rate changes. Diagnose.
>
> > [!answer]-
> > Premium grew $74\%$ in two years while **average premium per unit fell $19\%$** — so the growth is in unit count, and the new units are cheaper ones. With no rate change, a falling average premium means the mix has moved toward smaller or lower-rated risks.
> >
> > New business share more than doubled, and the loss ratio deteriorated $17$ points in step. Two well-known effects are compounding:
> >
> > - **New business penalty.** New business runs worse than renewal business in most lines — the risks are less known, and some of them are shopping because their current carrier does not want them.
> > - **Appetite loosening.** A book cannot grow $74\%$ in two years at unchanged eligibility standards. Something was relaxed, formally or informally.
> >
> > For **reserving**: development factors from $2021$–$2022$ describe a different book. AY $2023$–$2024$ need factors weighted to the recent years, or an a priori method with an ELR set for the new mix — and the $73\%$/$81\%$ ultimates should be treated as provisional, since a deteriorating new-business-heavy book typically develops adversely.
> >
> > For **pricing**: this is the finding that matters most. The indication built on $2021$–$2022$ experience is describing a book that no longer exists, and the rates it produces are inadequate for what is actually being written.
