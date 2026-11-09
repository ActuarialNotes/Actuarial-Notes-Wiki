---
verification:
  status: stale
  confidence: null
  last_checked: 2026-10-31
  last_checked_by: agent:validate-v1
  content_hash: sha256:709c07216c7cc3821692288e6da0afcc433d6a246c50ce34a6942b6aa8fe192b
  sources:
    - "Werner & Modlin, Basic Ratemaking (CAS, 5th ed. May 2016), Ch.11 printed p.189 (PDF 201), sha256:6b214d4db52674df2e83343920c06781e491254bd77f27e32ba312faaff3782c — https://www.casact.org/sites/default/files/2021-03/5_Werner_Modlin.pdf"
    - "Werner & Modlin, Basic Ratemaking (CAS, 5th ed. May 2016), Ch. 11 pp.188-191 (PDF pp.200-203), sha256:6b214d4db52674df2e83343920c06781e491254bd77f27e32ba312faaff3782c — https://www.casact.org/sites/default/files/old/studynotes_werner_modlin_ratemaking.pdf"
  open_findings: 0
  open_critical: 0
  log: .verify/Concepts/Territory Ratemaking.md
---

![[Media/Figures/Territory_Ratemaking.svg|340]]

**Territory Ratemaking** is the derivation of geographic rate differentials. It is [[Classification Ratemaking|classification ratemaking]] with two challenges of its own: location is heavily correlated with other rating variables, and the data in each small geographic unit is sparse. Under the [[Pure Premium|pure premium]] approach, the indicated relativity of territory $i$ is

> $$\text{Territory Relativity}_i = \frac{\text{Pure Premium}_i}{\text{Pure Premium}_{\text{base}}}$$

- $\text{Pure Premium}_{\text{base}}$ is the pure premium of the base territory.

The rate in territory $i$ is then

> $$\text{Rate}_i = \text{Base Rate} \times \text{Territory Relativity}_i$$

> [!example]- The base territory has 10,000 exposures and $\$2{,}000{,}000$ of losses. An urban territory has 4,000 exposures and $\$1{,}200{,}000$ of losses. The base rate is $\$400$. What are the urban relativity and rate? {Example}
> - The base pure premium is $2{,}000{,}000/10{,}000 = \$200$.
> - The urban pure premium is $1{,}200{,}000/4{,}000 = \$300$.
> - The urban relativity is $300/200 = 1.50$.
> - The urban rate is $400 \times 1.50 = \$600$.

## Establishing territorial boundaries

Territories are defined at some granularity (postal code, county, census block) and then **grouped** into rating territories. Too fine and no cell is [[Credibility|credible]], and too coarse and real cost differences are averaged away. This is the [[Homogeneity|homogeneity/credibility]] trade-off in its sharpest form. The actuary:

1. **Chooses the basic geographic unit.** The unit should be refined enough to be relatively homogeneous with respect to geographic differences while still having some observations in most units. Zip codes have the advantage of being the most readily available, but they change over time. Counties are static and readily available, but most are large and so contain very heterogeneous risks. Census blocks are relatively static over time, but require a process to map insurance policies to them.
2. **Estimates the geographic risk of each unit.** Actual experience is signal plus noise, and the signal has non-geographic elements (age, amount of insurance) and geographic ones (density, weather indices, crime rates). A univariate pure premium or loss ratio by unit is too volatile to separate signal from noise, and biased by the correlation of location with other variables. A multivariate model such as a [[Generalized Linear Model|GLM]], with geo-demographic and geo-physical variables, isolates the geographic signal.
3. **Smooths the estimates spatially.** Because loss cost varies continuously across space, a cell's estimate can borrow strength from its neighbours. Distance-based smoothing weights nearby units by their distance and suits weather-related perils. Adjacency-based smoothing weights rings of adjacent units, handles urban and rural differences and natural boundaries better, and suits perils driven by socio-demographic characteristics, such as theft.
4. **Clusters the units into territories.** The goal is to minimize the heterogeneity within groups and maximize it between groups. Quantile methods create clusters of equal numbers of units or equal exposure. Similarity methods (average linkage, centroid, Ward's) cluster units whose estimators are close. These routines do not produce contiguous territories unless a contiguity constraint is added.

Too much smoothing masks real spatial variation, and too little leaves noise in the estimator. The actuary selects the number of clusters that minimizes noise without creating significant jumps between adjacent territories.

> [!example]- Five adjacent coastal postal codes have indicated relativities of 1.42 on 2,400 exposures, 0.95 on 310, 1.48 on 2,900, 2.10 on 180 and 1.51 on 2,600. How should they be treated? {Example}
> - The three large codes agree that coastal loss costs run about 1.45 to 1.50.
> - The two small codes swing to 0.95 and 2.10 on a few hundred exposures, which is noise rather than geography.
> - Spatial smoothing pulls the two small codes' estimates toward the level of their neighbours.
> - **Grouping all five into one territory** at a relativity near 1.47 gives a cell of 8,390 exposures, contiguous and sharing the same cost drivers.

## Calculating territorial relativities

Once the boundaries are set, the relativities are calculated with the classification techniques. Territory must be estimated **alongside** other rating variables, not before them. Urban territories carry different vehicle mixes, limit selections and driver populations, and a one-way territorial relativity absorbs all of it. The new territories are therefore modeled with the other explanatory variables in a GLM.

New territorial relativities change the book's average relativity, so the base rate is offset to keep the overall change at the indicated level ([[Balancing Back]]). [[Catastrophe Loss|Catastrophe]] exposure is handled separately, because coastal relativities computed on experience that includes hurricane losses swing on whether a storm made landfall during the period.

> [!trap] Reading a one-way relativity as the territory's effect
> A univariate territorial relativity carries every other variable correlated with location. An urban territory with younger drivers shows a high relativity partly for its drivers, and charging it on top of a driver-age relativity double-counts.
