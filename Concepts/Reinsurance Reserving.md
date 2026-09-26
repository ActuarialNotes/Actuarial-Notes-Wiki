---
verification:
  status: unverified
  confidence: null
  last_checked: null
  last_checked_by: null
  content_hash: sha256:4e78d37e430a010df772373238c7433f3a88eb003de94d36f35c8de513e137cf
  sources: []
  open_findings: 0
  open_critical: 0
  log: .verify/Concepts/Reinsurance Reserving.md
---

**Reinsurance reserving** is the estimation of unpaid claims on reinsurance: a reinsurer's assumed liabilities, and the ceded liabilities of a cedant. It uses the same basic techniques as primary reserving (development, expected claims, BF, Cape Cod). Their data and assumptions have to be adapted to longer reporting lags, manuscript contracts, thinner and less detailed data, treaty-year aggregation, and the leverage an attachment point exerts on development and trend.

> $$\text{ELR} = \frac{\sum_k C_k}{\sum_k \text{EP}_k \times \text{lag}_k}$$

> $$\text{IBNR}_k = \text{ELR} \times \text{EP}_k \times (1 - \text{lag}_k)$$

- This is the [[Cape Cod Method|Cape Cod]] (Stanard-Bühlmann) method with a reinsurance report lag. $C_k$ is reported loss for treaty year $k$, $\text{EP}_k$ its on-level earned premium, and $\text{lag}_k = 1/\text{CDF}_k$ the expected share reported. It suits long-tail casualty excess business, where a thin, late diagonal makes the chain ladder unreliable and pricing ELRs are hard to put on level.
- **Why primary methods need adjusting** (Friedland, drawing on Patrik):
  - Claims reach the reinsurer only after the cedant has reported and assessed them. Excess claims arrive later still, once they approach the retention or a reporting threshold.
  - As a result, early development factors and tails are higher than primary, especially for non-proportional covers, and trend is leveraged in excess layers.
  - Rate-change data for on-leveling is weaker because contract terms change from year to year.
- **Data realities.** The data is usually summary bordereaux without claim detail, so claim counts are seldom usable. Reported losses include the reinsurer's **additional case reserves** (ACRs) on top of cedant case reserves. Several currencies must be restated at a common exchange rate, or the development factors absorb exchange movements. Catastrophe losses are estimated event by event and removed from the triangles. Discontinued business is often excluded, and asbestos, environmental and abuse exposures are not suited to triangle methods at all.
- **Segmentation.** Friedland quotes Patrik's priority list:
  - line of business;
  - contract type (treaty, facultative, finite);
  - cover type (quota share, surplus share, per-risk or per-occurrence excess, aggregate, catastrophe);
  - the primary line and attachment point for casualty;
  - contract terms;
  - the type of cedant;
  - the intermediary.

  Credibility limits how far it can be taken.
- **Experience period.** Reinsurers often analyse by **treaty (underwriting) year**. Immature treaty years must have their ultimates reduced for premium not yet earned, and results are allocated to accident year through earning patterns. Losses-occurring-during and risks-attaching contracts cover different claims, so the actuary must know which applies.
- **Outputs are wider.** The spread of indicated IBNR across methods is larger than primary; see [[Range of Indications]]. External patterns such as RAA data help but mix unlike contracts. The cedant's side is [[Ceded Loss Reserve]], and cover types are in [[Types of Reinsurance]].

> [!example]- Cape Cod IBNR for Casualty Excess Treaties {Example}
> A reinsurer's casualty excess treaties ($000s):
>
> | Treaty year | Earned premium | Reported | Lag |
> |---|---|---|---|
> | 2022 | $4{,}000$ | $1{,}800$ | $60\%$ |
> | 2023 | $5{,}000$ | $1{,}100$ | $35\%$ |
> | 2024 | $6{,}000$ | $360$ | $12\%$ |
>
> Premiums are on-level. Compute Cape Cod IBNR and compare with the chain ladder.
>
> > [!answer]-
> > $$
> > \begin{align*}
> > \text{Used-up premium} &= 2{,}400 + 1{,}750 + 720 \\
> > &= 4{,}870 \\
> > \text{ELR} &= 3{,}260 / 4{,}870 \\
> > &= 66.9\%
> > \end{align*}
> > $$
> >
> > $$
> > \begin{align*}
> > \text{IBNR}_{2022} &= 0.669 \times 4{,}000 \times 0.40 \\
> > &= 1{,}071 \\
> > \text{IBNR}_{2023} &= 0.669 \times 5{,}000 \times 0.65 \\
> > &= 2{,}176 \\
> > \text{IBNR}_{2024} &= 0.669 \times 6{,}000 \times 0.88 \\
> > &= 3{,}534
> > \end{align*}
> > $$
> >
> > The Cape Cod total is $6{,}781$. The chain ladder ($C/\text{lag} - C$) gives $1{,}200$, $2{,}043$ and $2{,}640$, a total of $5{,}883$.
> >
> > The gap is almost all 2024. With only $12\%$ reported, the chain ladder rests on $360$ of losses multiplied by $8.3$. Cape Cod instead applies the book's own loss ratio to the $88\%$ still to come. At this lag Cape Cod is the more defensible answer, but its ELR is only as good as the on-level adjustment to premium. Reinsurance rate changes are hard to measure, so that adjustment is where to look first.

> [!example]- Trend Leverage in an Excess Layer {Example}
> A cedant's large claims develop by a further $5\%$ in severity. Claim values are $\$480$K, $\$900$K and $\$950$K, and the treaty is $\$500$K excess of $\$500$K.
>
> How much does the reinsurer's share develop?
>
> > [!answer]-
> > $$
> > \begin{align*}
> > \text{Layer before} &= 0 + 400 + 450 \\
> > &= 850 \\
> > \text{Layer after} &= 4 + 445 + 497.5 \\
> > &= 946.5 \\
> > \text{Change} &= 946.5 / 850 - 1 \\
> > &= 11.4\%
> > \end{align*}
> > $$
> >
> > Ground-up losses rose $5\%$ but the layer rose $11.4\%$. A new claim pierced the attachment, and the others grew entirely within the layer. The same leverage makes excess development factors larger and longer than the cedant's own. Primary patterns applied to reinsurance data therefore understate IBNR, which is why industry reinsurance lags or the reinsurer's own data are needed.
