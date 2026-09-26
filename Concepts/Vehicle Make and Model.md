---
verification:
  status: unverified
  confidence: null
  last_checked: null
  last_checked_by: null
  content_hash: sha256:ce8418861c4a0aed18287629b0810d8deee6dc5c14540c9394fc23c79a60fbd1
  sources: []
  open_findings: 0
  open_critical: 0
  log: .verify/Concepts/Vehicle Make and Model.md
---

**Vehicle Make and Model**, as a rating variable, is the identity of the insured vehicle: manufacturer, model, series or trim, and model year, usually decoded from the VIN. It drives physical damage cost (price, repair cost, theft) and, less directly, injury cost (mass, size, safety systems). With tens of thousands of combinations and new ones every model year, it is the textbook [[High Dimensional Variables|high dimensional variable]] of personal auto.

> $$\ln E[Y \mid v] = \mathbf{x}_v^{\top}\boldsymbol{\beta} + \gamma_v + \text{offset}$$

- $\mathbf{x}_v$ holds vehicle $v$'s characteristics decoded from the VIN: price new, weight, body style, engine power, safety features. Their fixed coefficients $\boldsymbol{\beta}$ can rate even a model with no loss history.
- $\gamma_v$ is the make/model's own residual effect, a [[Random Effects|random effect]] shrunk toward zero. It moves the rate away from the characteristics-based prediction only as far as the vehicle's own experience supports ([[Credibility]]).
- The **offset** carries the driver, territory and use effects, so the vehicle factor measures the vehicle rather than who drives it and where.
- **By coverage.** Collision and comprehensive costs follow price, repair cost and theft. Injury costs follow how the vehicle behaves in a crash. Vehicle relativities are therefore estimated separately for each coverage.
- **Industry systems.**
  - In the U.S., Verisk's ISO symbols start physical damage symbols from the vehicle's price new (MSRP). Liability and PIP/medical payments symbols combine the vehicle series' own loss experience with a prediction from characteristics such as curb weight and chassis type.
  - In Canada, IBC's CLEAR system rates each make, model and model year separately for collision, [[Direct Compensation Property Damage|DCPD]], comprehensive and accident benefits. It uses data adjusted to remove territory, driving record and use, supplements thin data on newer models with credibility, groups vehicles into rate groups, and caps the change from year to year.
- **Confounding with the driver.** Sports cars attract young drivers and minivans attract families. A one-way vehicle relativity absorbs the driver effect and double-counts with the driver factors, which is the core problem of [[Classification Ratemaking|classification ratemaking]].

> [!example]- Rating a New Model as Its Experience Arrives {Example}
> A redesigned SUV's characteristics predict a collision relativity of $1.15$. After its first year it has $800$ car-years, and its experience (net of driver and territory) indicates $0.95$. The credibility constant is $K = 2{,}400$ car-years. Find the rated relativity now, and after $4{,}000$ car-years if the indication holds at $0.95$.
>
> > [!answer]-
> > $$
> > \begin{align*}
> > Z &= \frac{800}{800 + 2{,}400} \\
> > &= 0.25 \\[4pt]
> > \hat{R} &= 0.25(0.95) + 0.75(1.15) \\
> > &= 1.100
> > \end{align*}
> > $$
> >
> > $$
> > \begin{align*}
> > Z &= \frac{4{,}000}{4{,}000 + 2{,}400} \\
> > &= 0.625 \\[4pt]
> > \hat{R} &= 0.625(0.95) + 0.375(1.15) \\
> > &= 1.025
> > \end{align*}
> > $$
> >
> > The rate starts close to what the vehicle's design predicts and moves toward its own record as the record becomes credible. That is how a car with no history can be rated on day one without letting one noisy year set its price.

> [!example]- A Vehicle Factor That Is Really a Driver Factor {Example}
> A sports coupe's one-way collision relativity is $1.60$. Its drivers are young and have worse records than average, and under the plan's driver factors their average driver relativity is $1.25$. What should the vehicle relativity be, and what goes wrong if $1.60$ is used?
>
> > [!answer]-
> > Removing the driver mix from the one-way figure (the offset in the model above) leaves the vehicle's own effect:
> >
> > $$
> > \begin{align*}
> > R_{\text{vehicle}} &= \frac{1.60}{1.25} \\
> > &= 1.28
> > \end{align*}
> > $$
> >
> > Using $1.60$ alongside the driver factors charges the young driver twice, once through the age factor and again through the car's inflated relativity. Every coupe would be overpriced by $1.60/1.28 - 1 = 25\%$. A competitor that separates the two effects would take the adult coupe drivers, who are the most overcharged relative to their cost.
