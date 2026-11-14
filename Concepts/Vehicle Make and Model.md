---
verification:
  status: stale
  confidence: null
  last_checked: 2026-10-17
  last_checked_by: agent:validate-v1
  content_hash: sha256:e01eea47e481afbe84e36eef460ab168d4b368536045e8d290899ad62da30478
  sources:
    - "Chalk et al., From GLMs to Comprehensive Insurance Pricing: Techniques and Challenges, CAS Monograph 16, 1st ed., §6.4.3-6.5, §6.7.3, PDF pp.93-96, 104, sha256:0b293634c3d6320eac9aca5d2f8ba4ca7954f20db8a462b24771c60b5e046d74 — https://www.casact.org/sites/default/files/2026-02/CAS_Monograph-16_From_GLMs.pdf"
    - "Goldburd, Khare, Tevet & Guller, Generalized Linear Models for Insurance Rating, CAS Monograph 5, 2nd ed. (2025 revision), §10.1, PDF pp.103-106, sha256:89b203ea55208911c4d8f6ef1ede4dd6c0206d47999b5e8aff96fe233c0ff757 — https://www.casact.org/sites/default/files/2021-01/05-Goldburd-Khare-Tevet.pdf"
    - "Insurance Bureau of Canada, CLEAR (Canadian Loss Experience Automobile Rating) web page, read 2026-10-17, The CLEAR methodology, steps 1-5, sha256:a3c67c8df97fafea3a2a0ae1190285f102e46902fae350ef58ecf4cf01f4ca33 — https://www.ibc.ca/pe/auto/buying-auto-insurance/how-auto-insurance-premiums/clear"
  open_findings: 2
  open_critical: 0
  log: .verify/Concepts/Vehicle Make and Model.md
---

**Vehicle Make and Model** is the rating variable that identifies the insured vehicle by manufacturer, model, series or trim, and model year, usually decoded from the VIN. With tens of thousands of combinations and new ones every model year, it is the textbook [[High Dimensional Variables|high dimensional variable]] of personal auto.

It drives physical damage cost through price, repair cost and theft, and, less directly, injury cost through mass, size and safety systems. In a log-link model with a random effect, the expected loss cost of vehicle $v$ is

> $$\ln E[Y \mid v] = \mathbf{x}_v^{\top}\boldsymbol{\beta} + \gamma_v + \text{offset}$$

- $\mathbf{x}_v$ holds the vehicle's characteristics decoded from the VIN, such as price new, weight, body style, engine power and safety features. Their fixed coefficients $\boldsymbol{\beta}$ can rate even a model with no loss history.
- $\gamma_v$ is the make and model's own residual effect, a [[Random Effects|random effect]] shrunk toward zero. It moves the rate away from the characteristics-based prediction only as far as the vehicle's own experience supports ([[Credibility]]).
- The offset carries the driver, territory and use effects, so the vehicle factor measures the vehicle rather than who drives it and where.

Collision and comprehensive costs follow price, repair cost and theft, while injury costs follow how the vehicle behaves in a crash. Vehicle relativities are therefore estimated separately for each coverage.

> [!example]- What collision relativity should this redesigned SUV get now, and after $4{,}000$ car-years? {Example}
> The SUV's characteristics predict a collision relativity of $1.15$. After its first year it has $800$ car-years, and its experience, net of driver and territory, indicates $0.95$. The credibility is $Z = E/(E + K)$ with $K = 2{,}400$ car-years, and the indication holds at $0.95$.
>
> > [!answer]-
> > - Now, $Z = 800/(800 + 2{,}400) = 0.25$.
> > - The rated relativity is $0.25(0.95) + 0.75(1.15) = 1.100$.
> > - At $4{,}000$ car-years, $Z = 4{,}000/(4{,}000 + 2{,}400) = 0.625$.
> > - The rated relativity is then $0.625(0.95) + 0.375(1.15) = 1.025$.
> > - The rate starts close to what the vehicle's design predicts and moves toward its own record as the record becomes credible.

## Confounding with the driver

Sports cars attract young drivers and minivans attract families. A one-way vehicle relativity absorbs the driver effect and double-counts with the driver factors, which is the core problem of [[Classification Ratemaking|classification ratemaking]].

> [!example]- What should this sports coupe's vehicle relativity be, and what goes wrong if $1.60$ is used? {Example}
> The coupe's one-way collision relativity is $1.60$. Its drivers are young and have worse records than average, and under the plan's driver factors their average driver relativity is $1.25$.
>
> > [!answer]-
> > - Removing the driver mix from the one-way figure, as the offset does in the model above, leaves the vehicle's own effect.
> > - $R_{\text{vehicle}} = 1.60/1.25 = 1.28$.
> > - Using $1.60$ alongside the driver factors charges the young driver twice, once through the age factor and again through the car's inflated relativity.
> > - Every coupe would be overpriced by $1.60/1.28 - 1 = 25\%$.
> > - A competitor that separates the two effects would take the adult coupe drivers, who are the most overcharged relative to their cost.

## Canada's CLEAR system

In Canada, IBC's CLEAR system rates each make, model and model year separately for collision, [[Direct Compensation Property Damage|DCPD]], comprehensive and accident benefits. It uses data adjusted to remove territory, driving record and use, supplements thin data on newer models with credibility, groups vehicles into rate groups, and caps the change from year to year.
