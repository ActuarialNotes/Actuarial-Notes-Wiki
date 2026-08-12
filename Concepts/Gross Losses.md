**Gross Losses** are losses before any cessions or recoveries are removed — the full amount of claim cost arising on the business the insurer wrote. Gross is the base from which [[Ceded Losses|ceded]], recovery and [[Net Losses|net]] figures are derived.

> $$\text{Gross} = \text{Net} + \text{Ceded} + \text{Other Recoveries}$$

> $$\text{Gross Ultimate} = \text{Gross Reported} \times \text{CDF}^{\text{gross}}$$

- **"Gross" needs a qualifier.** It most often means gross of reinsurance, but a figure can also be gross or net of [[Salvage and Subrogation|salvage and subrogation]], of [[Deductible Recovery|deductible recoveries]], and of ULAE. Every comparison must confirm which recoveries the gross figure excludes; the syllabus and the Annual Statement use the term in different senses.
- Reserve analysis is normally run on **gross data first**: it is the largest and most homogeneous dataset, it is unaffected by changes in reinsurance structure, and the ceded and net figures follow from it.
- Gross and ceded develop on **different patterns** — excess cessions attach only to large, slow claims — so ceded cannot be scaled from gross except under quota share. This is why net is derived as gross minus ceded rather than developed directly.
- Gross data is also what survives a **change of programme**. When the treaty changes, the ceded and net histories break; the gross history does not, and it can be re-ceded under the new terms.
- For ratemaking, whether to work gross or net depends on how the reinsurance cost is provided for — see [[Net of Reinsurance]].

> [!example]- Reconciling Gross, Ceded and Net {Example}
> AY 2024: net retained losses $\$800{,}000$; excess-of-loss reinsurance recoverable $\$300{,}000$; salvage and subrogation recovered $\$50{,}000$.
>
> What are gross losses?
>
> > [!answer]-
> > $$\begin{align*}
> > \text{Gross} &= \$800{,}000 + \$300{,}000 + \$50{,}000 \\
> > &= \$1{,}150{,}000
> > \end{align*}$$
> >
> > The insurer's policyholders were paid $\$1{,}150{,}000$; the insurer itself bore $\$800{,}000$ of it. Note that this figure is gross of *both* reinsurance and S&S — a "gross of reinsurance, net of S&S" figure would be $\$1{,}100{,}000$, and the two are quoted interchangeably often enough that the basis must be stated.

> [!example]- Why the Gross Triangle Survives a Treaty Change {Example}
> An insurer raised its per-occurrence retention from $\$250{,}000$ to $\$1{,}000{,}000$ effective $1/1/2022$. Its analyst proposes developing the net triangle, on the grounds that net is what the company retains.
>
> Evaluate.
>
> > [!answer]-
> > The net triangle contains two incompatible regimes: through AY 2021 it is net of a $\$250$K retention, from AY 2022 net of $\$1$M. Net losses jump upward at the break for a reason that has nothing to do with claim cost, and no development factor selected across that boundary describes either regime.
> >
> > The **gross** triangle is unaffected — gross losses are what they are regardless of who ultimately pays them — so it can be developed with a consistent history and the full ten years of data.
> >
> > The sound procedure is therefore:
> >
> > 1. Develop **gross** to ultimate on the unbroken history.
> > 2. Estimate **ceded** separately by applying the *current* treaty terms to the projected gross large-claim distribution ([[Reinsurance Recovery]]).
> > 3. Derive **net** as the difference.
> >
> > This is the general reason the gross basis is the analytical starting point: it is the only one of the three that is invariant to the insurer's own risk-transfer decisions.
