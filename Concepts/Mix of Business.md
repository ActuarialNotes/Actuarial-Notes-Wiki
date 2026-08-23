---
verification:
  status: unverified
  confidence: null
  last_checked: null
  last_checked_by: null
  content_hash: sha256:4f98512c00c49c0c253c50b02c2a7d9cfabe3f9a5c41ccb71dbba6663432995e
  sources: []
  open_findings: 0
  open_critical: 0
  log: .verify/Concepts/Mix of Business.md
---

**Mix of Business** is the distribution of a book across segments — territory, class, limit, deductible, coverage, distribution channel. A shift in the mix changes aggregate results even when nothing about any individual segment has changed, and it is one of the standard explanations an actuary must rule out before concluding that costs or adequacy have moved.

> $$\overline{\text{LR}} = \sum_i w_i \times \text{LR}_i$$

- The aggregate is a **weighted average**, so it moves with the weights $w_i$ as well as with the segment results $\text{LR}_i$. Diagnosing which has moved requires segment-level data; the aggregate alone cannot distinguish them.
- In **ratemaking**, a mix shift shows up as premium trend (average premium moving without a rate change), as apparent loss trend, and as a change in the overall loss ratio. The response is at the relativity level, not the overall rate level — raising everyone's rate because the mix moved over-corrects the segments that did not change.
- In **reserving**, a mix shift breaks the [[Homogeneity|homogeneity]] assumption behind the [[Development Triangle|triangle]]. If the segments have different emergence patterns, the blended development factors drift as the weights drift — and the triangle gives no signal that this is what is happening.
- Mix shifts are frequently **endogenous to pricing**: a large [[Rate Change|rate increase]] drives away the risks with the most alternatives, which are usually the better ones. The indication that caused the shift does not anticipate it, so the following year's experience deteriorates for reasons the analysis attributed to the market.
- Other common causes: a new distribution channel, entering or exiting a territory, a change in the [[Deductible Rating|deductible]] or limit profile, a growth push in one segment, and [[Underwriting Changes|underwriting]] tightening.

![[Media/Figures/Mix_of_Business.svg|340]]

> [!example]- A Mix Shift That Looks Like Rate Inadequacy {Example}
> An insurer writes two territories, each with a stable loss ratio:
>
> | Territory | Loss ratio | Year 1 weight | Year 2 weight |
> |---|---|---|---|
> | Urban | $80\%$ | $40\%$ | $70\%$ |
> | Rural | $55\%$ | $60\%$ | $30\%$ |
>
> What happens to the overall loss ratio, and what is the correct response?
>
> > [!answer]-
> > $$\begin{align*}
> > \text{Year 1} &= 0.40(80\%) + 0.60(55\%) = 65.0\% \\
> > \text{Year 2} &= 0.70(80\%) + 0.30(55\%) = 72.5\%
> > \end{align*}$$
> >
> > The overall loss ratio rose $7.5$ points and **neither territory's rates became inadequate**. The whole movement is the shift toward urban business.
> >
> > An across-the-board increase would be the wrong response twice over: it over-charges rural policyholders whose rates were already adequate, and it under-diagnoses the urban territory, whose $80\%$ loss ratio may itself be a problem the relativity structure is failing to price. The correct action is at the [[Territory Ratemaking|territory relativity]] level.
> >
> > Note also that the mix shift is probably not random — a book that grew $75\%$ in its urban territory in one year was pushing there, and someone should ask why.

> [!example]- A Mix Shift Hiding Inside a Triangle {Example}
> An insurer's commercial package book is reserved on one combined triangle. Its composition by premium:
>
> | Coverage | $12$–$24$ factor | $2020$ weight | $2024$ weight |
> |---|---|---|---|
> | Property | $1.05$ | $70\%$ | $45\%$ |
> | Liability | $1.60$ | $30\%$ | $55\%$ |
>
> What does the combined triangle show, and what does it miss?
>
> > [!answer]-
> > The true blended factor in each year:
> >
> > $$\begin{align*}
> > 2020: \; 0.70(1.05) + 0.30(1.60) &= 1.215 \\
> > 2024: \; 0.45(1.05) + 0.55(1.60) &= 1.353
> > \end{align*}$$
> >
> > A combined triangle selecting an all-year average would land near $1.28$ — too high for the older years and **too low for the current one**, which is the year the factor is actually applied to.
> >
> > What makes this dangerous is that the triangle looks fine. There is no diagonal effect, no jump in average case outstanding, no change in disposal rates. The factors simply drift upward year by year, and an actuary watching for the usual distortions sees nothing wrong — the drift reads as a slow change in development pattern rather than as a change in what is being averaged.
> >
> > The only fix is structural: **split the triangle** by coverage ([[Reserving Data Organization]]). The blended answer then falls out of the sum, computed at the current mix, instead of being baked into factors estimated at an old one.
