**Territory Ratemaking** is the derivation of geographic rate differentials. It is [[Classification Ratemaking|classification ratemaking]] with one distinctive property: geography is *spatially correlated*, so neighbouring territories inform one another and boundaries are themselves a decision.

> $$\text{Territory Relativity}_i = \frac{\text{Pure Premium}_i}{\text{Pure Premium}_{\text{base}}}$$

> $$\text{Rate}_i = \text{Base Rate} \times \text{Territory Relativity}_i$$

- Geographic cost drivers: population and traffic density, crime, weather and catastrophe exposure, repair and medical costs, litigation propensity and local court behaviour, and — for property — building codes and fire protection class.
- Territories are defined at some granularity (postal code, county, census tract) and then **grouped** into rating territories. Too fine and no cell is [[Credibility|credible]]; too coarse and real cost differences are averaged away — the [[Homogeneity|homogeneity/credibility]] trade-off in its sharpest form.
- **Spatial smoothing** is what makes fine granularity workable: because loss cost varies continuously across space, a cell's estimate can borrow strength from its neighbours. Werner describes distance-based and adjacency-based smoothing, applied *before* territories are grouped.
- Territory must be estimated **alongside** other rating variables, not before them. Urban territories carry different vehicle mixes, limit selections and driver populations, and a one-way territorial relativity absorbs all of it — see the univariate problem under [[Classification Ratemaking]].
- **Catastrophe** exposure must be handled separately. Coastal territories' relativities computed on experience including hurricane losses swing on whether a storm happened to make landfall during the period; the modelled [[Catastrophe Loss|catastrophe load]] belongs in the territory rate as its own component.
- Territorial rating attracts the most **social and regulatory** scrutiny of any variable, because geography correlates with income and demographics. Some jurisdictions restrict or prohibit territory in certain lines.

> [!example]- Territory Relativities and Rates {Example}
> Base territory: $10{,}000$ exposures, $\$2{,}000{,}000$ losses. Urban territory: $4{,}000$ exposures, $\$1{,}200{,}000$ losses. The base rate is $\$400$.
>
> Compute the urban relativity and rate.
>
> > [!answer]-
> > $$\begin{align*}
> > \text{PP}_{\text{base}} &= \frac{\$2{,}000{,}000}{10{,}000} = \$200 \\[4pt]
> > \text{PP}_{\text{urban}} &= \frac{\$1{,}200{,}000}{4{,}000} = \$300 \\[6pt]
> > \text{Relativity} &= \frac{300}{200} = 1.50 \\[4pt]
> > \text{Urban rate} &= \$400 \times 1.50 = \$600
> > \end{align*}$$
> >
> > With $4{,}000$ exposures the urban indication is reasonably credible; a territory with $400$ would need weighting toward the statewide average or a spatially smoothed neighbour estimate.

> [!example]- Smoothing and Grouping Territories {Example}
> A state is divided into $60$ postal-code territories. Indicated relativities for five adjacent coastal codes, with their exposure volumes:
>
> | Code | Exposures | Indicated relativity |
> |---|---|---|
> | $101$ | $2{,}400$ | $1.42$ |
> | $102$ | $310$ | $0.95$ |
> | $103$ | $2{,}900$ | $1.48$ |
> | $104$ | $180$ | $2.10$ |
> | $105$ | $2{,}600$ | $1.51$ |
>
> How should these be treated?
>
> > [!answer]-
> > The three large codes ($101$, $103$, $105$) tell a consistent story: coastal loss costs run about $1.45$–$1.50$. The two small codes swing wildly in opposite directions — $0.95$ and $2.10$ — on $310$ and $180$ exposures respectively.
> >
> > Those swings are **noise**, not geography. Loss cost does not fall by a third and then triple across three miles of the same coastline.
> >
> > Two mechanisms, applied in order:
> >
> > 1. **Spatial smoothing.** Estimate each cell partly from its neighbours. Codes $102$ and $104$ have little data of their own, so their smoothed estimates are pulled toward the $\approx 1.47$ level of the surrounding codes.
> > 2. **Grouping.** Combine all five into one rating territory at a credibility-weighted relativity near $1.47$. The combined cell has $8{,}390$ exposures — comfortably credible — and the grouping is defensible because the codes are contiguous and share the same cost drivers.
> >
> > Taking the raw indications instead would charge one small coastal community half what its neighbours pay and another double, on the strength of a few hundred exposures — indefensible actuarially and unsustainable competitively.
